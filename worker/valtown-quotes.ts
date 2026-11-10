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
// 응답 예: {"005930.KS":{"price":71900,"date":"2026-07-04","prevClose":70500,"changePct":1.99,"open":70800,"high":72100,"low":70600,"volume":15230000},…}
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

async function oneQuote(sym: string) {
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
    volume: num(m.regularMarketVolume) ?? lastNum(q.volume) };
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

  const out: Record<string, Record<string, number | string | null>> = {};
  await Promise.all(symbols.map(async (sym) => {
    try {
      const q = await oneQuote(sym);
      if (q) out[sym] = q;
    } catch (_e) { /* 개별 실패는 건너뜀 — 페이지가 그 종목은 스냅샷 유지 */ }
  }));

  const qAge = Object.keys(out).length === symbols.length ? 60 : 10;
  return new Response(JSON.stringify(out), {
    headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=" + qAge },
  });
}
