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
// 응답 예: {"005930.KS":{"price":71900,"date":"2026-07-04"},"AAPL":{"price":250.1,"date":"2026-07-03"}}
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

async function oneQuote(sym) {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(sym) + "?interval=1d&range=1d";
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
    cf: { cacheTtl: 30, cacheEverything: true },   // 엣지에서 30초 캐시 (야후 부하·지연 감소)
  });
  if (!r.ok) return null;
  const j = await r.json();
  const m = j && j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
  if (!m || typeof m.regularMarketPrice !== "number" || !isFinite(m.regularMarketPrice)) return null;
  let date = null;
  if (m.regularMarketTime) {
    const off = (m.gmtoffset || 0) * 1000;               // 거래소 현지시각 기준 날짜
    date = new Date(m.regularMarketTime * 1000 + off).toISOString().slice(0, 10);
  }
  return { price: m.regularMarketPrice, date };
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
      await caches.default.put(hcacheKey, new Response(hbody, { headers: { "Cache-Control": "public, max-age=1800", "Content-Type": "application/json" } }));
      return new Response(hbody, { headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=1800", "X-Cache": "MISS" } });
    }

    // 같은 symbols 조합은 60초 엣지 캐시
    const cache = caches.default;
    const cacheKey = new Request("https://quotes-cache/" + encodeURIComponent(symbols.join(",")));
    const cached = await cache.match(cacheKey);
    if (cached) {
      return new Response(await cached.text(), {
        headers: { ...CORS, "Content-Type": "application/json", "X-Cache": "HIT" },
      });
    }

    const out = {};
    await Promise.all(symbols.map(async (sym) => {
      try {
        const q = await oneQuote(sym);
        if (q) out[sym] = q;
      } catch (e) { /* 개별 실패는 건너뜀 — 페이지가 그 종목은 스냅샷 유지 */ }
    }));

    const body = JSON.stringify(out);
    // 캐시에 저장 (60초)
    await cache.put(cacheKey, new Response(body, {
      headers: { "Cache-Control": "public, max-age=60", "Content-Type": "application/json" },
    }));
    return new Response(body, {
      headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=60", "X-Cache": "MISS" },
    });
  },
};
