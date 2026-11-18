// 주식 실시간 시세 프록시 — Cloudflare Worker (무료 티어로 충분)
//
// 역할: 브라우저(페이지)의 요청을 받아 Yahoo Finance 에서 시세를 서버-사이드로 받아온 뒤,
//       CORS 헤더를 붙여 JSON 으로 돌려준다. (서버→서버라 CORS·크럼 문제 없음)
//
// 배포 방법 (둘 중 하나):
//   A. 대시보드: Cloudflare → Workers & Pages → Create Worker → 이 파일 내용을 붙여넣고 Deploy.
//   B. CLI: `npm i -g wrangler` 후 `wrangler deploy worker/quotes-worker.js --name stock-quotes`.
//   배포되면 https://stock-quotes.<계정>.workers.dev 주소가 나온다 → data/config.js 의 quotesApi 에 입력.
//
// 사용 예: GET https://stock-quotes.<계정>.workers.dev/?symbols=005930.KS,AAPL,^KS11
// 응답 예: {"005930.KS":{"price":71900,"date":"2026-07-04","prevClose":70500,"changePct":1.99,…,"time":1783148040,"src":"naver"},"AAPL":{"price":250.1,"date":"2026-07-03",…}}
//   time = 그 값의 체결 시각(유닉스 초), src = 받은 곳(naver·yahoo).
//
// 시세 출처(2026-11-18): 한국 종목·ETF(######.KS/.KQ)와 코스피·코스닥(^KS11·^KQ11)은 네이버 증권 실시간 시세 먼저(야후의 한국 시세는 20분 늦다),
//   실패하거나 없으면 야후. 지금 시세는 캐시하지 않는다(새로고침하면 그때 값). 자세한 설명은 worker/valtown-quotes.ts.
//
// ── 과거 시계열(기술적 분석용) ──
// GET …/?symbols=005930.KS,AAPL&history=1&range=6mo
// 응답 예: {"AAPL":{"closes":[250.1, 251.3, …], "dates":["2026-01-02", …]}}   // 오래된→최신
//   기술적 분석(RSI·이동평균·골든/데드크로스)에 필요한 기간의 일봉 종가를 서버-사이드로
//   받아 CORS 로 돌려준다. range 는 Yahoo 표기(1mo·3mo·6mo·1y…), 기본 6mo.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

const ALLOWED_RANGE = new Set(["1mo", "3mo", "6mo", "1y", "2y"]);

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

// ── 네이버 실시간(한국) ── 한 번에 60개까지(없는 코드는 응답에서 빠진다). 실패하면 빈 결과 → 야후로.
const KR_RE = /^([0-9A-Z]{6})\.(KS|KQ)$/;
const KR_IDX = { "^KS11": "KOSPI", "^KQ11": "KOSDAQ" };
function nnum(v) {
  if (typeof v === "number") return isFinite(v) ? v : null;
  if (typeof v !== "string" || !v.trim()) return null;
  const n = Number(v.replace(/,/g, ""));
  return isFinite(n) ? n : null;
}
async function naverBatch(kind, codes) {
  const out = new Map();
  if (!codes.length) return out;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 4000);
  try {
    const url = "https://polling.finance.naver.com/api/realtime/domestic/" + kind + "/" + codes.map(encodeURIComponent).join(",");
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json", "Referer": "https://m.stock.naver.com/" }, signal: ctrl.signal });
    if (!r.ok) return out;
    const j = await r.json();
    for (const d of (j && Array.isArray(j.datas) ? j.datas : [])) {
      const price = nnum(d.closePriceRaw != null ? d.closePriceRaw : d.closePrice);
      if (!d.itemCode || price == null || price <= 0) continue;
      const dir = String((d.compareToPreviousPrice && d.compareToPreviousPrice.name) || "");
      const sg = /FALL|LOWER/.test(dir) ? -1 : /RIS|UPPER/.test(dir) ? 1 : dir === "UNCHANGED" ? 0 : null;
      const chgAbs = nnum(d.compareToPreviousClosePriceRaw != null ? d.compareToPreviousClosePriceRaw : d.compareToPreviousClosePrice);
      const pctAbs = nnum(d.fluctuationsRatioRaw != null ? d.fluctuationsRatioRaw : d.fluctuationsRatio);
      const chg = chgAbs == null ? null : sg == null ? chgAbs : sg * Math.abs(chgAbs);
      const prev = chg != null && price - chg > 0 ? price - chg : null;
      let changePct = pctAbs == null ? null : sg == null ? pctAbs : sg * Math.abs(pctAbs);
      if (changePct == null && prev) changePct = Math.round((price / prev - 1) * 10000) / 100;
      const at = typeof d.localTradedAt === "string" ? d.localTradedAt : "";
      const ms = Date.parse(at);
      // 정규장(09:00) 전 시각이 찍힌 값(넥스트레이드 프리마켓·장 시작 동시호가)은 쓰지 않고 야후(전 거래일 종가·날짜)로 받는다
      const hm = /T(\d{2}):(\d{2})/.exec(at);
      if (!hm || +hm[1] * 60 + +hm[2] < 540) continue;
      out.set(String(d.itemCode), {
        price, date: /^\d{4}-\d{2}-\d{2}/.test(at) ? at.slice(0, 10) : null, prevClose: prev, changePct,
        open: nnum(d.openPriceRaw != null ? d.openPriceRaw : d.openPrice), high: nnum(d.highPriceRaw != null ? d.highPriceRaw : d.highPrice),
        low: nnum(d.lowPriceRaw != null ? d.lowPriceRaw : d.lowPrice), volume: nnum(d.accumulatedTradingVolumeRaw),
        time: isFinite(ms) ? Math.floor(ms / 1000) : null, src: "naver",
      });
    }
  } catch (e) { /* 네이버 실패 — 야후로 받는다 */ }
  finally { clearTimeout(to); }
  return out;
}

async function oneQuote(sym) {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(sym) + "?interval=1d&range=1d";
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
  });
  if (!r.ok) return null;
  const j = await r.json();
  const res0 = j && j.chart && j.chart.result && j.chart.result[0], m = res0 && res0.meta;
  if (!m || typeof m.regularMarketPrice !== "number" || !isFinite(m.regularMarketPrice)) return null;
  let date = null;
  if (m.regularMarketTime) {
    const off = (m.gmtoffset || 0) * 1000;               // 거래소 현지시각 기준 날짜
    date = new Date(m.regularMarketTime * 1000 + off).toISOString().slice(0, 10);
  }
  // 전일 대비 등락률 — 장중엔 장중가 기준(정규장 전일 종가 대비). 야후 meta 의 regularMarketChangePercent(없으면 chartPreviousClose 로 계산)
  const prev = typeof m.chartPreviousClose === "number" && isFinite(m.chartPreviousClose) && m.chartPreviousClose > 0 ? m.chartPreviousClose : null;
  let changePct = typeof m.regularMarketChangePercent === "number" && isFinite(m.regularMarketChangePercent) ? m.regularMarketChangePercent
    : prev ? (m.regularMarketPrice / prev - 1) * 100 : null;
  if (changePct != null) changePct = Math.round(changePct * 100) / 100;
  // 그날 시가·고가·저가·거래량 — 앱 상세 차트의 장중 봉(2026-11-06 '차트도 실시간'). 없으면 앱이 전일 종가로 근사한다
  const q = (res0 && res0.indicators && res0.indicators.quote && res0.indicators.quote[0]) || {};
  const lastNum = (a) => { if (!Array.isArray(a)) return null; for (let i = a.length - 1; i >= 0; i--) { const v = a[i]; if (typeof v === "number" && isFinite(v)) return v; } return null; };
  const num = (v) => (typeof v === "number" && isFinite(v) ? v : null);
  return { price: m.regularMarketPrice, date, prevClose: prev, changePct,
    open: lastNum(q.open), high: num(m.regularMarketDayHigh) != null ? num(m.regularMarketDayHigh) : lastNum(q.high),
    low: num(m.regularMarketDayLow) != null ? num(m.regularMarketDayLow) : lastNum(q.low),
    volume: num(m.regularMarketVolume) != null ? num(m.regularMarketVolume) : lastNum(q.volume),
    time: num(m.regularMarketTime), src: "yahoo" };
}

async function oneHistory(sym, range) {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(sym) + "?interval=1d&range=" + encodeURIComponent(range);
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
    cf: { cacheTtl: 1800, cacheEverything: true },   // 엣지에서 30분 캐시(과거 시계열은 하루 단위 변화)
  });
  if (!r.ok) return null;
  const j = await r.json();
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  const ts = res && res.timestamp;
  const closes = res && res.indicators && res.indicators.quote && res.indicators.quote[0] && res.indicators.quote[0].close;
  if (!Array.isArray(ts) || !Array.isArray(closes)) return null;
  const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000;   // 거래소 현지시각 기준 날짜
  const outC = [], outD = [];
  for (let i = 0; i < ts.length; i++) {
    const c = closes[i];
    if (typeof c !== "number" || !isFinite(c)) continue;         // 휴장·결측 봉은 건너뜀
    outC.push(Math.round(c * 100) / 100);
    outD.push(new Date(ts[i] * 1000 + off).toISOString().slice(0, 10));
  }
  return outC.length ? { closes: outC, dates: outD } : null;
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    const url = new URL(request.url);
    const raw = (url.searchParams.get("symbols") || "").trim();
    if (!raw) return json({ error: "no symbols" }, 400);

    const symbols = raw.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 60);

    // ── 과거 시계열 모드 ── (history 파라미터가 있으면 종가 배열을 돌려준다)
    if (url.searchParams.get("history")) {
      let range = (url.searchParams.get("range") || "6mo").trim();
      if (!ALLOWED_RANGE.has(range)) range = "6mo";
      const hcacheKey = new Request("https://hist-cache/" + encodeURIComponent(range + "|" + symbols.join(",")));
      const hcached = await caches.default.match(hcacheKey);
      if (hcached) return new Response(await hcached.text(), { headers: { ...CORS, "Content-Type": "application/json", "X-Cache": "HIT" } });
      const hist = {};
      await Promise.all(symbols.map(async (sym) => {
        try { const h = await oneHistory(sym, range); if (h) hist[sym] = h; }
        catch (e) { /* 개별 실패는 건너뜀 — 앱이 누적 스냅샷으로 폴백 */ }
      }));
      const hbody = JSON.stringify(hist);
      // 일부라도 실패한 응답(야후 429·장애)은 캐시하지 않는다 — 30분간 빈 결과가 굳어 앱이 재시도하지 못한다.
      const hComplete = Object.keys(hist).length === symbols.length;
      const hAge = hComplete ? 1800 : 30;
      if (hComplete) await caches.default.put(hcacheKey, new Response(hbody, { headers: { "Cache-Control": "public, max-age=1800", "Content-Type": "application/json" } }));
      return new Response(hbody, { headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=" + hAge, "X-Cache": "MISS" } });
    }

    // 지금 시세는 캐시하지 않는다(2026-11-18 — 60초 엣지 캐시 때문에 새로고침해도 1분 전 값이 나왔다).
    // 한국 종목·지수는 네이버 실시간을 한 번에 받고, 나머지는 곧바로 야후로 — 둘을 함께 기다린다.
    const krCodes = [...new Set(symbols.map((s) => { const m = KR_RE.exec(s); return m ? m[1] : null; }).filter(Boolean))];
    const krIdx = [...new Set(symbols.map((s) => KR_IDX[s]).filter(Boolean))];
    const nvStock = naverBatch("stock", krCodes), nvIndex = naverBatch("index", krIdx);
    const out = {};
    await Promise.all(symbols.map(async (sym) => {
      try {
        const m = KR_RE.exec(sym);
        let q = m ? (await nvStock).get(m[1]) || null : KR_IDX[sym] ? (await nvIndex).get(KR_IDX[sym]) || null : null;
        if (!q) q = await oneQuote(sym);
        if (q) out[sym] = q;
      } catch (e) { /* 개별 실패는 건너뜀 — 페이지가 그 종목은 스냅샷 유지 */ }
    }));
    return new Response(JSON.stringify(out), {
      headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  },
};
