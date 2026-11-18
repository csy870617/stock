// 주식 실시간 시세 프록시 — Val.town HTTP val 버전 (Cloudflare Worker 대안, 더 간단)
//
// 배포 방법:
//   1) https://val.town 가입(무료, GitHub 로그인 가능)
//   2) 오른쪽 위 "New" → "HTTP val" (또는 New val 후 HTTP 선택)
//   3) 편집기의 기본 코드를 전부 지우고 이 파일 내용을 붙여넣기
//   4) 자동 저장·배포됨. 오른쪽/상단의 HTTP 엔드포인트 주소를 복사
//      (형식: https://<사용자명>--<id>.web.val.run)
//   5) 그 주소를 data/config.js 의 quotesApi 에 넣고 커밋·푸시
//   이미 만든 val 을 고칠 때는 그 val 을 열어 코드를 전부 이 파일로 바꾸고 저장하면 된다(주소는 그대로).
//
// 허용 주소: 아래 ALLOWED_ORIGINS 의 사이트에서 연 페이지만 시세를 받는다(그 밖은 403).
//   앱 주소가 바뀌면(사용자 도메인 등) 여기에 추가한다. 주소창에 직접 넣어 열어도 403 이 정상이다
//   (브라우저가 Origin 을 붙이지 않는다) — 확인은 앱에서 한다.
//
// 사용 예: GET https://<사용자명>-quotes.web.val.run/?symbols=005930.KS,AAPL,^KS11
// 응답 예: {"005930.KS":{"price":71900,"date":"2026-07-04","prevClose":70500,"changePct":1.99,"open":70800,"high":72100,"low":70600,"volume":15230000,"time":1783148040,"src":"naver"},…}
//   time = 그 값의 체결 시각(유닉스 초), src = 받은 곳(naver·yahoo).
//
// ── 시세 출처(2026-11-18 — 사용자 '새로고침 했을 때 실시간 데이터가 최대한 최신으로') ──
//   한국 종목·ETF(######.KS/.KQ)와 코스피·코스닥(^KS11·^KQ11)은 네이버 증권 실시간 시세를 먼저 쓴다 — 야후의 한국 시세는 20분 늦다
//   (2026-11-18 09:43 KST 실측: 야후 삼성전자·코스피 regularMarketTime 09:23, 네이버 localTradedAt 09:43). 네이버가 응답하지 않거나
//   그 종목이 없으면 야후로. 미국 종목·지수·환율·원자재는 야후 그대로.
//   지금 시세 응답은 캐시하지 않는다(Cache-Control: no-store) — 이 서버 앞단(Cloudflare)이 60초 재사용해 새로고침해도 같은 값이 나왔다.
//
// ── 과거 시계열(기술적 분석용) ──
// GET …/?symbols=005930.KS,AAPL&history=1&range=6mo
// 응답 예: {"AAPL":{"closes":[250.1, 251.3, …], "dates":["2026-01-02", …]}}   // 오래된→최신
//   기술적 분석(RSI·이동평균·골든/데드크로스)에 필요한 기간의 일봉 종가를 서버-사이드로
//   받아 CORS 로 돌려준다. range 는 Yahoo 표기(1mo·3mo·6mo·1y…), 기본 6mo.

// 이 사이트에서 연 페이지만 허용(2026-11-07 — 전엔 "*" 라 어느 사이트든 가져다 쓸 수 있었다).
//   브라우저는 다른 사이트의 주소를 부를 때 Origin 을 반드시 붙이므로 다른 웹사이트의 무단 사용은 막힌다.
//   curl 같은 프로그램은 Origin 을 꾸밀 수 있어 완전한 차단은 아니다.
const ALLOWED_ORIGINS = new Set(["https://csy870617.github.io"]);

function corsFor(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Vary": "Origin",
  };
}

const ALLOWED_RANGE = new Set(["1mo", "3mo", "6mo", "1y", "2y"]);

async function oneHistory(sym: string, range: string) {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(sym) + "?interval=1d&range=" + encodeURIComponent(range);
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
  if (!r.ok) return null;
  const j = await r.json();
  const res = j?.chart?.result?.[0];
  const ts = res?.timestamp;
  const closes = res?.indicators?.quote?.[0]?.close;
  if (!Array.isArray(ts) || !Array.isArray(closes)) return null;
  const off = (res?.meta?.gmtoffset || 0) * 1000;          // 거래소 현지시각 기준 날짜
  const outC: number[] = [], outD: string[] = [];
  for (let i = 0; i < ts.length; i++) {
    const c = closes[i];
    if (typeof c !== "number" || !isFinite(c)) continue;    // 휴장·결측 봉은 건너뜀
    outC.push(Math.round(c * 100) / 100);
    outD.push(new Date(ts[i] * 1000 + off).toISOString().slice(0, 10));
  }
  return outC.length ? { closes: outC, dates: outD } : null;
}

// ── 네이버 실시간(한국) ── 한 번에 60개까지 받는다(없는 코드는 응답에서 빠진다). 실패하면 빈 결과 → 야후로.
const KR_RE = /^([0-9A-Z]{6})\.(KS|KQ)$/;
const KR_IDX: Record<string, string> = { "^KS11": "KOSPI", "^KQ11": "KOSDAQ" };
type Quote = { price: number; date: string | null; prevClose: number | null; changePct: number | null;
  open: number | null; high: number | null; low: number | null; volume: number | null; time: number | null; src: string };

function nnum(v: unknown): number | null {
  if (typeof v === "number") return isFinite(v) ? v : null;
  if (typeof v !== "string" || !v.trim()) return null;
  const n = Number(v.replace(/,/g, ""));
  return isFinite(n) ? n : null;
}

async function naverBatch(kind: "stock" | "index", codes: string[]): Promise<Map<string, Quote>> {
  const out = new Map<string, Quote>();
  if (!codes.length) return out;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 4000);
  try {
    const url = "https://polling.finance.naver.com/api/realtime/domestic/" + kind + "/" + codes.map(encodeURIComponent).join(",");
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json", "Referer": "https://m.stock.naver.com/" }, signal: ctrl.signal });
    if (!r.ok) return out;
    const j = await r.json();
    for (const d of (Array.isArray(j?.datas) ? j.datas : [])) {
      const price = nnum(d?.closePriceRaw ?? d?.closePrice);
      if (!d?.itemCode || price == null || price <= 0) continue;
      // 부호는 등락 구분으로 맞춘다(RISING·UPPER_LIMIT +, FALLING·LOWER_LIMIT −, UNCHANGED 0) — 숫자 칸의 부호 표기가 바뀌어도 틀리지 않게
      const dir = String(d?.compareToPreviousPrice?.name || "");
      const sg = /FALL|LOWER/.test(dir) ? -1 : /RIS|UPPER/.test(dir) ? 1 : dir === "UNCHANGED" ? 0 : null;
      const chgAbs = nnum(d?.compareToPreviousClosePriceRaw ?? d?.compareToPreviousClosePrice);
      const pctAbs = nnum(d?.fluctuationsRatioRaw ?? d?.fluctuationsRatio);
      const chg = chgAbs == null ? null : sg == null ? chgAbs : sg * Math.abs(chgAbs);
      const prev = chg != null && price - chg > 0 ? price - chg : null;
      let changePct = pctAbs == null ? null : sg == null ? pctAbs : sg * Math.abs(pctAbs);
      if (changePct == null && prev) changePct = Math.round((price / prev - 1) * 10000) / 100;
      const at = typeof d?.localTradedAt === "string" ? d.localTradedAt : "";
      const ms = Date.parse(at);
      // 정규장(09:00) 전 시각이 찍힌 값은 쓰지 않는다 — 넥스트레이드 프리마켓(08:00~08:50)·장 시작 동시호가 값이 '오늘' 날짜로 오면
      // 앱이 그것을 오늘 정규장 시세로 읽는다. 그때는 야후(전 거래일 종가·날짜)로 받는다.
      const hm = /T(\d{2}):(\d{2})/.exec(at);
      if (!hm || +hm[1] * 60 + +hm[2] < 540) continue;
      out.set(String(d.itemCode), {
        price, date: /^\d{4}-\d{2}-\d{2}/.test(at) ? at.slice(0, 10) : null,   // 거래소 현지(한국) 날짜
        prevClose: prev, changePct,
        open: nnum(d?.openPriceRaw ?? d?.openPrice), high: nnum(d?.highPriceRaw ?? d?.highPrice), low: nnum(d?.lowPriceRaw ?? d?.lowPrice),
        volume: nnum(d?.accumulatedTradingVolumeRaw),   // 한국거래소 거래량(주) — 야후 일봉과 같은 단위
        time: isFinite(ms) ? Math.floor(ms / 1000) : null, src: "naver",
      });
    }
  } catch (_e) { /* 네이버 실패 — 야후로 받는다 */ }
  finally { clearTimeout(to); }
  return out;
}

async function oneQuote(sym: string): Promise<Quote | null> {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(sym) + "?interval=1d&range=1d";
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
  if (!r.ok) return null;
  const j = await r.json();
  const res0 = j?.chart?.result?.[0], m = res0?.meta;
  if (!m || typeof m.regularMarketPrice !== "number" || !isFinite(m.regularMarketPrice)) return null;
  let date: string | null = null;
  if (m.regularMarketTime) {
    const off = (m.gmtoffset || 0) * 1000;                 // 거래소 현지시각 기준 날짜
    date = new Date(m.regularMarketTime * 1000 + off).toISOString().slice(0, 10);
  }
  // 전일 대비 등락률 — 장중엔 장중가 기준(정규장 전일 종가 대비). 야후 meta 의 regularMarketChangePercent(없으면 chartPreviousClose 로 계산)
  const prev = typeof m.chartPreviousClose === "number" && isFinite(m.chartPreviousClose) && m.chartPreviousClose > 0 ? m.chartPreviousClose : null;
  let changePct = typeof m.regularMarketChangePercent === "number" && isFinite(m.regularMarketChangePercent) ? m.regularMarketChangePercent
    : prev ? (m.regularMarketPrice / prev - 1) * 100 : null;
  if (changePct != null) changePct = Math.round(changePct * 100) / 100;
  // 그날 시가·고가·저가·거래량 — 앱 상세 차트의 장중 봉(2026-11-06 '차트도 실시간'). 없으면 앱이 전일 종가로 근사한다
  const q = res0?.indicators?.quote?.[0] || {};
  const lastNum = (a: unknown) => { if (!Array.isArray(a)) return null; for (let i = a.length - 1; i >= 0; i--) { const v = a[i]; if (typeof v === "number" && isFinite(v)) return v; } return null; };
  const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : null);
  return { price: m.regularMarketPrice, date, prevClose: prev, changePct,
    open: lastNum(q.open), high: num(m.regularMarketDayHigh) ?? lastNum(q.high), low: num(m.regularMarketDayLow) ?? lastNum(q.low),
    volume: num(m.regularMarketVolume) ?? lastNum(q.volume),
    time: num(m.regularMarketTime), src: "yahoo" };
}

export default async function (req: Request): Promise<Response> {
  const origin = req.headers.get("Origin") || "";
  if (!ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: "forbidden origin" }),
      { status: 403, headers: { "Content-Type": "application/json", "Vary": "Origin" } });
  }
  const CORS = corsFor(origin);
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  const url = new URL(req.url);
  const raw = (url.searchParams.get("symbols") || "").trim();
  if (!raw) {
    return new Response(JSON.stringify({ error: "no symbols" }),
      { status: 400, headers: { ...CORS, "Content-Type": "application/json" } });
  }
  const symbols = raw.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 60);

  // ── 과거 시계열 모드 ── (history 파라미터가 있으면 종가 배열을 돌려준다)
  if (url.searchParams.get("history")) {
    let range = (url.searchParams.get("range") || "6mo").trim();
    if (!ALLOWED_RANGE.has(range)) range = "6mo";
    const hist: Record<string, { closes: number[]; dates: string[] }> = {};
    await Promise.all(symbols.map(async (sym) => {
      try {
        const h = await oneHistory(sym, range);
        if (h) hist[sym] = h;
      } catch (_e) { /* 개별 실패는 건너뜀 — 앱이 누적 스냅샷으로 폴백 */ }
    }));
    // 일부라도 실패한 응답은 짧게만 캐시 — 브라우저가 빈 결과를 30분간 재사용하지 않게
    const hAge = Object.keys(hist).length === symbols.length ? 1800 : 30;
    return new Response(JSON.stringify(hist), {
      headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=" + hAge },
    });
  }

  // 한국 종목·지수는 네이버 실시간을 한 번에 받고(종목·지수 각 1번), 나머지는 곧바로 야후로 — 둘을 함께 기다린다
  const krCodes = [...new Set(symbols.map((s) => KR_RE.exec(s)?.[1]).filter((c): c is string => !!c))];
  const krIdx = [...new Set(symbols.map((s) => KR_IDX[s]).filter(Boolean))];
  const nvStock = naverBatch("stock", krCodes), nvIndex = naverBatch("index", krIdx);
  const out: Record<string, Quote> = {};
  await Promise.all(symbols.map(async (sym) => {
    try {
      const m = KR_RE.exec(sym);
      let q: Quote | null = m ? (await nvStock).get(m[1]) || null : KR_IDX[sym] ? (await nvIndex).get(KR_IDX[sym]) || null : null;
      if (!q) q = await oneQuote(sym);
      if (q) out[sym] = q;
    } catch (_e) { /* 개별 실패는 건너뜀 — 페이지가 그 종목은 스냅샷 유지 */ }
  }));

  // 캐시하지 않는다 — 앞단(Cloudflare)이 60초 재사용하면 새로고침해도 1분 전 값이 나온다
  return new Response(JSON.stringify(out), {
    headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
