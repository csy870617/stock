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

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

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

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    const url = new URL(request.url);
    const raw = (url.searchParams.get("symbols") || "").trim();
    if (!raw) return json({ error: "no symbols" }, 400);

    const symbols = raw.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 80);

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
