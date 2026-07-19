// 주식 실시간 시세 프록시 — Val.town HTTP val 버전 (Cloudflare Worker 대안, 더 간단)
//
// 배포 방법:
//   1) https://val.town 가입(무료, GitHub 로그인 가능)
//   2) 오른쪽 위 "New" → "HTTP val" (또는 New val 후 HTTP 선택)
//   3) 편집기의 기본 코드를 전부 지우고 이 파일 내용을 붙여넣기
//   4) 자동 저장·배포됨. 오른쪽/상단의 HTTP 엔드포인트 주소를 복사
//      (형식: https://<사용자명>-<val이름>.web.val.run)
//   5) 그 주소를 data/config.js 의 quotesApi 에 넣고 커밋·푸시
//
// 사용 예: GET https://<사용자명>-quotes.web.val.run/?symbols=005930.KS,AAPL,^KS11
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

async function oneQuote(sym: string) {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(sym) + "?interval=1d&range=1d";
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
  if (!r.ok) return null;
  const j = await r.json();
  const m = j?.chart?.result?.[0]?.meta;
  if (!m || typeof m.regularMarketPrice !== "number" || !isFinite(m.regularMarketPrice)) return null;
  let date: string | null = null;
  if (m.regularMarketTime) {
    const off = (m.gmtoffset || 0) * 1000;                 // 거래소 현지시각 기준 날짜
    date = new Date(m.regularMarketTime * 1000 + off).toISOString().slice(0, 10);
  }
  return { price: m.regularMarketPrice, date };
}

export default async function (req: Request): Promise<Response> {
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
    return new Response(JSON.stringify(hist), {
      headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=1800" },
    });
  }

  const out: Record<string, { price: number; date: string | null }> = {};
  await Promise.all(symbols.map(async (sym) => {
    try {
      const q = await oneQuote(sym);
      if (q) out[sym] = q;
    } catch (_e) { /* 개별 실패는 건너뜀 — 페이지가 그 종목은 스냅샷 유지 */ }
  }));

  return new Response(JSON.stringify(out), {
    headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
  });
}
