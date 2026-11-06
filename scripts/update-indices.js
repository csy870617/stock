#!/usr/bin/env node
// 지수 기술적 분석 자동 갱신 — LLM 토큰 0 (순수 스크립트, refresh-quotes Action에서 실행)
//
// 역할: 나스닥 종합(^IXIC)·다우존스(^DJI)·코스피(^KS11)·코스닥(^KQ11)과 원/달러(KRW=X)·달러인덱스(DX-Y.NYB)·WTI(CL=F)·금(GC=F)의 10년치 일봉을
//       Yahoo Finance 에서 받아, 공유 scripts/lib-ta.js 로 단기(일봉)·중기(주봉)·장기(월봉)
//       기술적 분석(이동평균·RSI·추세·지지/저항·골든크로스·매매신호)을 "결정론적으로 계산"해
//       data/indices.js(window.INDEX_TA)로 저장한다.
//
//       가격도 기술적 분석도 사람의 판단(LLM)이 필요 없는 순수 수치·규칙이므로,
//       시세(quotes.js)와 똑같이 매일 저비용으로 자동 갱신된다. (거시 유동성 게이지의
//       '등급 판정'은 판단 영역이라 온디맨드로 남는다 — data/liquidity.js.)
//
// 사용법:
//   node scripts/update-indices.js                # Yahoo 조회 후 indices.js 갱신
//   node scripts/update-indices.js --date 2026-07-21   # asOf 강제 지정
//
// 조회 실패한 지수는 기존 data/indices.js 값으로 폴백하므로, 파일은 항상 4개 지수가
// 채워진 상태로 유지된다(한 지수의 일시적 조회 실패가 전체를 비우지 않는다).

const fs = require("fs");
const path = require("path");

const TA = require("./lib-ta.js");   // 공유 기술적 분석 라이브러리(단기/중기/장기)
const { settleDailyBars, fillPrevSessionClose } = require("./lib-quote");
const { writeChart } = require("./lib-chart");
const LF = require("./lib-flows");   // 코스피·코스닥 투자자별 순매수(지수 상세 '수급' — 차트 아래 막대·수급 표, data/market-flows.json)
const KR_VOL_THOUSANDS = { kospi: 1, kosdaq: 1 };   // 지수 상세 캔들 차트 data/chart/idx-<key>.json(앱 '오늘의 시장' 지수 칸을 누르면 연다)   // 일봉을 끝난 장 기준으로 정리(장중 미완성 봉 제외·빈 종가 채움)

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "indices.js");

function argVal(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--")
    ? process.argv[i + 1] : null;
}

// 대상 지수 정의 (렌더는 이 순서를 그대로 따른다)
// chartUrl 은 해당 지수의 네이버 차트 — 프로젝트의 네이버 링크 관례와 일치시킨다
// (한국 지수: finance.naver.com 국내지수, 미국 지수: m.stock.naver.com 해외지수).
const INDICES = [
  { key: "nasdaq", name: "나스닥 종합", flag: "🇺🇸", symbol: "^IXIC",
    chartUrl: "https://m.stock.naver.com/worldstock/index/.IXIC/total" },
  { key: "dow", name: "다우존스", flag: "🇺🇸", symbol: "^DJI",
    chartUrl: "https://m.stock.naver.com/worldstock/index/.DJI/total" },
  { key: "kospi", name: "코스피", flag: "🇰🇷", symbol: "^KS11",
    chartUrl: "https://m.stock.naver.com/domestic/index/KOSPI/total" },
  { key: "kosdaq", name: "코스닥", flag: "🇰🇷", symbol: "^KQ11",
    chartUrl: "https://m.stock.naver.com/domestic/index/KOSDAQ/total" }
];

// 환율·원자재(2026-10-23 사용자 요청 — 홈 '오늘의 시장'에 지수처럼) — window.INDEX_TA.macro 에 따로 둔다.
//   indices 에 섞지 않는 이유: 외환·원유는 거의 24시간 거래라 마지막 봉 날짜가 주식 지수와 하루씩 어긋난다.
//   asOf(지수 대응 게이트·기준일)는 주식 지수 4개로만 정하고, 환율·원자재는 항목마다 자기 asOf 를 갖는다.
//   이름은 네이버 증권 시장지표 표기('미국 USD' = 원/달러 환율). 시세는 야후(KRW=X 국제 시세, CL=F 근월물 연결).
//   달러인덱스(DX-Y.NYB)·국제 금(GC=F 근월물 연결)은 2026-10-23 같은 날 추가 요청. 칸 순서 = 환율 둘 → 원자재 둘.
const MACRO = [
  { key: "usdkrw", name: "미국 USD", sub: "원/달러 환율", unit: "원", symbol: "KRW=X", srDp: 0, moverCountry: "korea",
    chartUrl: "https://m.stock.naver.com/marketindex/exchange/FX_USDKRW" },
  { key: "dxy", name: "달러인덱스", sub: "주요 6개 통화 대비 달러 가치", unit: "", symbol: "DX-Y.NYB", srDp: 2, moverCountry: null,
    chartUrl: "https://m.stock.naver.com/marketindex/exchange/.DXY" },
  { key: "wti", name: "WTI", sub: "서부텍사스산 원유 · 배럴당 달러(근월물)", unit: "달러", symbol: "CL=F", srDp: 2, moverCountry: null,
    chartUrl: "https://m.stock.naver.com/marketindex/energy/CLcv1" },
  { key: "gold", name: "국제 금", sub: "금 선물 · 트로이온스당 달러(근월물)", unit: "달러", symbol: "GC=F", srDp: 0, moverCountry: null,
    chartUrl: "https://m.stock.naver.com/marketindex/metals/GCcv1" }
];


// 섹터(2026-11-06 사용자 '오늘의 시장 부분을 슬라이드로 넘겨서 섹터별로도 볼 수 있게') — 업종 ETF 일봉으로 지수와 같은 엔진·같은 차트 형식.
//   data/sectors.js(window.SECTOR_TA) 와 data/chart/idx-sec-<key>.json 에 쓴다. indices.js 에 섞지 않는 이유: 앱 첫 화면 무게를 늘리지 않게
//   (앱은 섹터 쪽을 보기 전에 따로 받는다). 한국은 KODEX·TIGER 업종 ETF, 미국은 SPDR 업종 ETF(S&P 500 11개 섹터) + 반도체(SOXX).
//   시장 대비(rs)는 한국 코스피(^KS11)·미국 S&P 500(^GSPC) 같은 기간 등락과의 차이. 같이 움직인 종목은 그 나라 편성·관심·보유 종목만.
//   naver = 네이버 증권 코드(미국은 api.stock.naver.com/stock/<코드>/basic 이 200 인 것 — XLRE.K·SOXX.O 만 접미사).
const SECTOR_BENCH = { korea: { symbol: "^KS11", name: "코스피" }, us: { symbol: "^GSPC", name: "S&P 500" } };
const SECTORS = {
  korea: [
    { key: "kr-semi", name: "반도체", etf: "KODEX 반도체", symbol: "091160.KS" },
    { key: "kr-battery", name: "2차전지", etf: "KODEX 2차전지산업", symbol: "305720.KS" },
    { key: "kr-auto", name: "자동차", etf: "KODEX 자동차", symbol: "091180.KS" },
    { key: "kr-health", name: "헬스케어", etf: "TIGER 헬스케어", symbol: "143860.KS" },
    { key: "kr-heavy", name: "조선·중공업", etf: "TIGER 200 중공업", symbol: "139230.KS" },
    { key: "kr-defense", name: "방산", etf: "PLUS K방산", symbol: "449450.KS" },
    { key: "kr-bank", name: "은행", etf: "KODEX 은행", symbol: "091170.KS" },
    { key: "kr-broker", name: "증권", etf: "KODEX 증권", symbol: "102970.KS" },
    { key: "kr-insure", name: "보험", etf: "KODEX 보험", symbol: "140700.KS" },
    { key: "kr-comm", name: "인터넷·통신", etf: "TIGER 200 커뮤니케이션서비스", symbol: "315270.KS" },
    { key: "kr-chem", name: "에너지화학", etf: "KODEX 에너지화학", symbol: "117460.KS" },
    { key: "kr-steel", name: "철강", etf: "KODEX 철강", symbol: "117680.KS" },
    { key: "kr-build", name: "건설", etf: "KODEX 건설", symbol: "117700.KS" },
    { key: "kr-staples", name: "필수소비재", etf: "TIGER 200 생활소비재", symbol: "227560.KS" }
  ],
  us: [
    { key: "us-tech", name: "기술", etf: "SPDR 기술 섹터", symbol: "XLK", naver: "XLK" },
    { key: "us-semi", name: "반도체", etf: "iShares 반도체", symbol: "SOXX", naver: "SOXX.O" },
    { key: "us-comm", name: "커뮤니케이션", etf: "SPDR 커뮤니케이션 섹터", symbol: "XLC", naver: "XLC" },
    { key: "us-disc", name: "경기소비재", etf: "SPDR 경기소비재 섹터", symbol: "XLY", naver: "XLY" },
    { key: "us-staples", name: "필수소비재", etf: "SPDR 필수소비재 섹터", symbol: "XLP", naver: "XLP" },
    { key: "us-health", name: "헬스케어", etf: "SPDR 헬스케어 섹터", symbol: "XLV", naver: "XLV" },
    { key: "us-fin", name: "금융", etf: "SPDR 금융 섹터", symbol: "XLF", naver: "XLF" },
    { key: "us-ind", name: "산업재", etf: "SPDR 산업재 섹터", symbol: "XLI", naver: "XLI" },
    { key: "us-energy", name: "에너지", etf: "SPDR 에너지 섹터", symbol: "XLE", naver: "XLE" },
    { key: "us-mat", name: "소재", etf: "SPDR 소재 섹터", symbol: "XLB", naver: "XLB" },
    { key: "us-util", name: "유틸리티", etf: "SPDR 유틸리티 섹터", symbol: "XLU", naver: "XLU" },
    { key: "us-reit", name: "부동산", etf: "SPDR 부동산 섹터", symbol: "XLRE", naver: "XLRE.K" }
  ]
};
const SECTOR_OUT = path.join(ROOT, "data", "sectors.js");

// ── Yahoo 일봉 조회 (종가·고가·저가·타임스탬프) ──
const sleepMs = (ms) => new Promise((res) => setTimeout(res, ms));

// 마지막 두 봉 사이가 이 일수를 넘으면 시리즈에 구멍이 있다고 본다.
// 금→월(3일)까지가 정상이고, 그보다 벌어지면 중간 거래일 봉이 빠진 것이다.
// (2026-08-04 실측: 08-03 봉이 누락된 응답이 와서 코스피 등락률이 07-31 대비로 계산돼
//  +1.62% 가 -3.59% 로, 코스닥은 +5.88% 가 +8.47% 로 찍혔다 — 사흘치가 하루치로.)
const MAX_GAP_DAYS = 3;

// 야후 간헐 429/5xx 대비 3회 재시도(update-stock-ta.js 와 동일한 이유).
// 응답이 오더라도 최신 구간에 구멍이 있으면 캐시 우회로 한 번 더 받아 본다 —
// 등락률은 마지막 두 봉의 차이라 구멍이 곧바로 틀린 숫자가 된다.
async function fetchSeries(symbol) {
  let best = null;
  for (let i = 0; i < 3; i++) {
    const rows = await fetchSeriesOnce(symbol, i > 0);
    if (rows) {
      if (!best || rows.lastGapDays < best.lastGapDays) best = rows;
      if (best.lastGapDays <= MAX_GAP_DAYS) return best;
      console.warn("  ⚠ " + symbol + ": 최근 봉 간격 " + rows.lastGapDays +
        "일(" + rows.prevDate + " → " + rows.lastDate + ") — 중간 거래일 누락 의심, 재조회");
    }
    if (i < 2) await sleepMs(400 * Math.pow(2, i));
  }
  return best;   // 끝내 못 메우면 가장 나은 응답을 쓰되, analyze 가 등락률을 감춘다
}

async function fetchSeriesOnce(symbol, bustCache) {
  if (typeof fetch !== "function") return null;
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(symbol) + "?interval=1d&range=10y" +
    (bustCache ? "&_=" + Date.now() : "");
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 10000);
  let j;
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
    if (!r.ok) return null;
    j = await r.json();   // 본문 수신도 타임아웃 범위 안에서 — 스톨된 body 에 워커가 무한정 매달리지 않게
  } catch (_e) { return null; }
  finally { clearTimeout(to); }
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  if (!res || !res.indicators || !res.indicators.quote || !res.indicators.quote[0]) return null;
  // 장중 실행이면 진행 중인 장의 미완성 봉은 버린다 — 지수 카드·신호는 끝난 장 종가 기준(lib-quote 참고).
  // 한국 지수의 직전 장 일봉 종가가 비어 있으면 채운다(장중 실행이 코스피·코스닥을 하루 전으로 되돌리지 않게)
  settleDailyBars(res);
  await fillPrevSessionClose(res, symbol);
  const q = res.indicators.quote[0];
  const ts = res.timestamp || [];
  const rows = [];
  for (let i = 0; i < (q.close || []).length; i++) {
    if (q.close[i] == null) continue;
    rows.push({
      t: ts[i], close: q.close[i],
      open: q.open && q.open[i] != null ? q.open[i] : null,   // 차트 캔들용(지표 계산은 쓰지 않는다)
      high: q.high && q.high[i] != null ? q.high[i] : q.close[i],
      low: q.low && q.low[i] != null ? q.low[i] : q.close[i],
      vol: q.volume && q.volume[i] != null ? q.volume[i] : null
    });
  }
  if (rows.length < TA.MIN_BARS) return null;   // lib 의 최소 봉수와 동일 게이트(불일치 시 조용한 폴백 발생)
  // 마지막 봉의 거래소 현지 날짜 = 실제 최신 거래일. 주말·휴장일에 돌려도 실행일이 아닌
  // 이 날짜가 asOf 가 돼야 INDEX_NOTES.asOf 비교에서 '구식'으로 오판되지 않는다.
  const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000;
  rows.offMs = off;
  const lastT = rows[rows.length - 1].t, prevT = rows[rows.length - 2].t;
  const day = (t) => (t ? new Date(t * 1000 + off).toISOString().slice(0, 10) : null);
  rows.lastDate = day(lastT);
  rows.prevDate = day(prevT);
  // 등락률 신뢰도 판단용 — 마지막 두 봉의 달력일 간격(정상: 1일, 주말 낀 금→월: 3일)
  rows.lastGapDays = (lastT && prevT) ? Math.round((lastT - prevT) / 86400) : 99;
  return rows;
}

// 지수 1종목 분석 — 공유 lib-ta로 단기/중기/장기 기술적 분석을 계산해 카드 필드와 합친다.
function analyze(cfg, rows, gapOkOverride) {
  const a = TA.analyzeTimeframes(rows, { dp: cfg.dp != null ? cfg.dp : 2, srDp: cfg.srDp != null ? cfg.srDp : 0 });
  if (!a) return null;
  // 시리즈에 구멍이 있으면(중간 거래일 누락) 등락률이 여러 날치를 하루로 뭉뚱그린 값이 된다.
  // 틀린 숫자를 보여주느니 감춘다 — 지표(RSI·이동평균)는 1봉 누락에 둔감해 그대로 쓴다.
  const gapOk = gapOkOverride != null ? gapOkOverride : (!rows.lastGapDays || rows.lastGapDays <= MAX_GAP_DAYS);
  if (!gapOk) {
    console.warn("  ⚠ " + cfg.key + ": 등락률 생략 — 최근 봉 간격 " + rows.lastGapDays +
      "일(" + rows.prevDate + " → " + rows.lastDate + ")");
  }
  const slim = (x) => { const o = Object.assign({}, x); delete o.sigLegacy; delete o.sigBlock; delete o.blocks; delete o.facts; return o; };   // 비교용·종목 요약용 필드 제거(페이로드)
  return {
    key: cfg.key, name: cfg.name, flag: cfg.flag, chartUrl: cfg.chartUrl,
    level: a.level, change: gapOk ? a.change : "–", changeDir: gapOk ? a.changeDir : "down",
    period: a.period, short: slim(a.short), mid: slim(a.mid), long: slim(a.long)
  };
}

// ── 환율·원자재 '관련 정보' — 사실 숫자만(예측 아님): 기간 등락·52주 위치·이동평균 거리·변동성 국면·시장/편성 종목과 같이 움직인 정도 ──
const rnd = (v, d) => (v == null || !isFinite(v) ? null : Math.round(v * Math.pow(10, d)) / Math.pow(10, d));
const isoDay = (t, off) => new Date(t * 1000 + (off || 0)).toISOString().slice(0, 10);
const sdOf = (a) => { if (a.length < 2) return null; const m = a.reduce((x, y) => x + y, 0) / a.length; return Math.sqrt(a.reduce((x, y) => x + (y - m) * (y - m), 0) / (a.length - 1)); };
function macroFacts(rows) {
  const off = rows.offMs || 0, c = rows.map((r) => r.close), n = c.length, last = c[n - 1];
  const back = (k) => (n > k && c[n - 1 - k] > 0 ? (last / c[n - 1 - k] - 1) * 100 : null);
  const yr = isoDay(rows[n - 1].t, off).slice(0, 4);
  let ytdBase = null;
  for (let i = n - 1; i >= 0; i--) if (isoDay(rows[i].t, off) < yr + "-01-01") { ytdBase = c[i]; break; }
  const win = c.slice(-252), hi = Math.max.apply(null, win), lo = Math.min.apply(null, win);
  const sma = (k) => (n >= k ? c.slice(-k).reduce((a, b) => a + b, 0) / k : null);
  const lr = [];
  for (let i = 1; i < n; i++) if (c[i] > 0 && c[i - 1] > 0) lr.push(Math.log(c[i] / c[i - 1]));
  const v60 = lr.length >= 60 ? sdOf(lr.slice(-60)) : null;
  // 지금 60일 변동성이 지난 10년(5거래일 간격 표본) 중 어디쯤인지 — 평소보다 출렁이는가
  const hist = [];
  for (let i = 60; i <= lr.length; i += 5) hist.push(sdOf(lr.slice(i - 60, i)));
  const volPct = v60 != null && hist.length >= 20 ? Math.round(hist.filter((x) => x <= v60).length / hist.length * 100) : null;
  const s50 = sma(50), s200 = sma(200);
  return {
    asOf: isoDay(rows[n - 1].t, off),
    chg: { d1: rnd(back(1), 2), w1: rnd(back(5), 1), m1: rnd(back(21), 1), m3: rnd(back(63), 1), y1: rnd(back(252), 1),
      ytd: rnd(ytdBase ? (last / ytdBase - 1) * 100 : null, 1) },
    hi52: rnd(hi, 2), lo52: rnd(lo, 2), pos52: hi > lo ? Math.round((last - lo) / (hi - lo) * 100) : null,
    ma50: rnd(s50 ? (last / s50 - 1) * 100 : null, 1), ma200: rnd(s200 ? (last / s200 - 1) * 100 : null, 1),
    vol60: rnd(v60 != null ? v60 * Math.sqrt(252) * 100 : null, 1), volPct: volPct, volYrs: Math.round(lr.length / 252)
  };
}
// 주간 종가(월요일 시작 주 → 그 주 마지막 종가) — 시간대가 다른 시장(서울·런던·뉴욕)끼리 비교할 때 하루 어긋남을 줄인다
const weekOf = (ymd) => { const d = new Date(ymd + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); };
function weeklyFromRows(rows) {
  const m = new Map(), off = rows.offMs || 0;
  rows.forEach((r) => { if (r.close > 0) m.set(weekOf(isoDay(r.t, off)), r.close); });
  return m;
}
function weeklyFromChart(w) {   // data/chart/<t>.json 의 w 행 [YYYYMMDD, 시, 고, 저, 종, 거래량]
  const m = new Map();
  (w || []).forEach((r) => { const s = String(r[0]); if (s.length === 8 && r[4] > 0) m.set(weekOf(s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8)), r[4]); });
  return m;
}
function weekRets(m, fromKey) {
  const out = new Map();
  m.forEach((v, k) => {
    if (fromKey && k < fromKey) return;
    const d = new Date(k + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() - 7);
    const p = m.get(d.toISOString().slice(0, 10));
    if (p > 0) out.set(k, v / p - 1);
  });
  return out;
}
// 같이 움직인 정도 — 주간 수익률 상관과 β(macro 1% 움직일 때 상대가 평균 몇 % — 사후 기술 통계, 예측 아님)
function corrBeta(base, other) {
  const xs = [], ys = [];
  base.forEach((x, k) => { const y = other.get(k); if (y != null && isFinite(y) && isFinite(x)) { xs.push(x); ys.push(y); } });
  const n = xs.length;
  if (n < 40) return null;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) * (xs[i] - mx); syy += (ys[i] - my) * (ys[i] - my); }
  if (!(sxx > 0 && syy > 0)) return null;
  return { corr: rnd(sxy / Math.sqrt(sxx * syy), 2), beta: rnd(sxy / sxx, 2), n: n };
}
const CORR_WEEKS = 104, MOVERS = 5, MOVER_MIN = 0.2;
const THEME_KO = { core: "우량", growth: "성장", value: "저평가", dividend: "배당", spotlight: "주목", watch: "관심", hold: "보유" };
function loadReco() {
  try { const w = {}; new Function("window", fs.readFileSync(path.join(ROOT, "data", "recommendations.js"), "utf8"))(w); return w.STOCK_DATA || null; } catch (_e) { return null; }
}
// 편성·관심·보유 종목 중 이 지표와 같이(또는 반대로) 움직인 종목 — 차트 파일(update-stock-ta.js 가 쓴 주봉)로 계산
function macroRelations(cfg, rows, idxRows) {
  const mw = weeklyFromRows(rows), keys = [...mw.keys()].sort();
  const from = keys.length > CORR_WEEKS ? keys[keys.length - CORR_WEEKS - 1] : null;
  const base = weekRets(mw, from);
  const market = {};
  [["kospi", "코스피"], ["nasdaq", "나스닥"]].forEach(([k]) => { if (idxRows[k]) { const r = corrBeta(base, weekRets(weeklyFromRows(idxRows[k]), from)); if (r) market[k] = r; } });
  const D = loadReco(), seen = new Map();
  if (D) ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (cfg.moverCountry && c !== cfg.moverCountry) return;
    const k = c + ":" + s.ticker, x = seen.get(k) || { c: c, t: s.ticker, name: s.name, th: [] };
    if (!x.th.includes(s.theme)) x.th.push(s.theme);
    seen.set(k, x);
  }));
  const res = [];
  seen.forEach((x) => {
    const f = path.join(ROOT, "data", "chart", String(x.t).replace(/[^A-Za-z0-9.\-]/g, "_") + ".json");
    if (!fs.existsSync(f)) return;
    let j; try { j = JSON.parse(fs.readFileSync(f, "utf8")); } catch (_e) { return; }
    const r = corrBeta(base, weekRets(weeklyFromChart(j.w), from));
    if (r) res.push({ c: x.c, t: x.t, name: x.name, th: x.th.map((t) => THEME_KO[t] || t).join("·"), corr: r.corr, beta: r.beta });
  });
  const pos = res.filter((x) => x.corr >= MOVER_MIN).sort((a, b) => b.corr - a.corr).slice(0, MOVERS);
  const neg = res.filter((x) => x.corr <= -MOVER_MIN).sort((a, b) => a.corr - b.corr).slice(0, MOVERS);
  return { weeks: base.size, market: market, pos: pos, neg: neg, universe: res.length };
}

// ── 섹터 — 업종 ETF(SECTORS) 일봉 → 같은 엔진 신호·관련 정보(기간 등락·시장 대비·같이 움직인 종목)·차트 파일 ──
const SECTOR_MOVER_MIN = 0.3;   // 섹터와 같이 움직인 종목 — 주간 상관이 이 값 이상인 것만(업종 안 종목은 대개 0.5 넘게 같이 움직인다)
// 그 나라 편성·관심·보유 종목의 주간 종가(차트 파일 — update-stock-ta.js 가 쓴 주봉) — 섹터마다 다시 읽지 않게 한 번만
function stockWeekly(D, country) {
  const seen = new Map();
  ((D && D[country]) || []).forEach((s) => {
    const x = seen.get(s.ticker) || { t: s.ticker, name: s.name, th: [] };
    if (!x.th.includes(s.theme)) x.th.push(s.theme);
    seen.set(s.ticker, x);
  });
  const out = [];
  seen.forEach((x) => {
    const f = path.join(ROOT, "data", "chart", String(x.t).replace(/[^A-Za-z0-9.\-]/g, "_") + ".json");
    if (!fs.existsSync(f)) return;
    try { x.w = weeklyFromChart(JSON.parse(fs.readFileSync(f, "utf8")).w); out.push(x); } catch (_e) { /* 깨진 차트 파일은 건너뛴다 */ }
  });
  return out;
}
// 시장 몫을 뺀 주간 수익률(잔차) — r − β·시장(β 는 같은 주들로 회귀). 업종끼리는 시장과 함께 움직이는 몫이 커서
//   그냥 상관을 쓰면 어느 섹터든 시장 민감한 종목이 위로 올라온다(필수소비재 ↔ 은행 같은) — 섹터 고유 움직임끼리 견준다.
function residuals(r, mkt) {
  const ks = [];
  r.forEach((v, k) => { const m = mkt.get(k); if (m != null && isFinite(m) && isFinite(v)) ks.push(k); });
  if (ks.length < 40) return null;
  const n = ks.length, mx = ks.reduce((a, k) => a + mkt.get(k), 0) / n, my = ks.reduce((a, k) => a + r.get(k), 0) / n;
  let sxy = 0, sxx = 0;
  ks.forEach((k) => { const dx = mkt.get(k) - mx; sxy += dx * (r.get(k) - my); sxx += dx * dx; });
  const b = sxx > 0 ? sxy / sxx : 0, out = new Map();
  ks.forEach((k) => out.set(k, r.get(k) - b * mkt.get(k)));
  return out;
}
// 한국 섹터의 종목 — WICS 산업(fundamentals.js ind)으로 묶는다. 코스피는 반도체 두 종목 비중이 커서 시장 몫을 빼면
//   삼성전자·SK하이닉스가 반도체에서 빠지는 등 상관만으로는 업종이 흐려진다. 미국은 나스닥 업종 분류가 GICS 와 달라(비자·마스터카드 = 경기소비재,
//   알파벳·메타 = 기술) 분류 대신 시장 몫을 뺀 상관으로 고른다.
const KR_IND_SECTOR = {
  "반도체와반도체장비": "kr-semi", "전기제품": "kr-battery",
  "자동차": "kr-auto", "자동차부품": "kr-auto",
  "제약": "kr-health", "생물공학": "kr-health", "건강관리장비와용품": "kr-health", "건강관리업체및서비스": "kr-health", "건강관리기술": "kr-health", "생명과학도구및서비스": "kr-health",
  "조선": "kr-heavy", "기계": "kr-heavy", "전기장비": "kr-heavy", "우주항공과국방": "kr-defense",
  "은행": "kr-bank", "증권": "kr-broker", "창업투자": "kr-broker", "손해보험": "kr-insure", "생명보험": "kr-insure",
  "양방향미디어와서비스": "kr-comm", "게임엔터테인먼트": "kr-comm", "다각화된통신서비스": "kr-comm", "무선통신서비스": "kr-comm", "방송과엔터테인먼트": "kr-comm", "광고": "kr-comm",
  "화학": "kr-chem", "석유와가스": "kr-chem", "에너지장비및서비스": "kr-chem", "철강": "kr-steel", "비철금속": "kr-steel",
  "건설": "kr-build", "건축자재": "kr-build", "건축제품": "kr-build",
  "담배": "kr-staples", "식품": "kr-staples", "음료": "kr-staples", "화장품": "kr-staples", "가정용품": "kr-staples", "식품과기본식료품소매": "kr-staples"
};
function loadFundInd() {
  try { const w = {}; new Function("window", fs.readFileSync(path.join(ROOT, "data", "fundamentals.js"), "utf8"))(w); const it = (w.STOCK_FUND && w.STOCK_FUND.items) || {}, m = {}; Object.keys(it).forEach((t) => { if (it[t] && it[t].ind) m[t] = it[t].ind; }); return m; } catch (_e) { return {}; }
}
function sectorRelations(cfg, rows, benchRows, weekly, indOf) {
  const mw = weeklyFromRows(rows), keys = [...mw.keys()].sort();
  const from = keys.length > CORR_WEEKS ? keys[keys.length - CORR_WEEKS - 1] : null;
  const base = weekRets(mw, from), mkt = benchRows ? weekRets(weeklyFromRows(benchRows), from) : null;
  const bench = mkt ? corrBeta(mkt, base) : null;   // β = 시장이 1% 움직인 주에 섹터가 평균 몇 % (섹터를 시장에 회귀)
  const byInd = /^kr-/.test(cfg.key);
  const baseR = !byInd && mkt ? residuals(base, mkt) : null;
  const res = [];
  weekly.forEach((x) => {
    const ind = indOf[x.t] || null, member = byInd && KR_IND_SECTOR[ind] === cfg.key;
    if (byInd && !member) return;
    const sr = weekRets(x.w, from), raw = corrBeta(base, sr);
    const own = raw && baseR ? corrBeta(baseR, residuals(sr, mkt) || new Map()) : null;   // 시장 몫을 뺀 상관
    if (!raw && !member) return;
    res.push({ t: x.t, name: x.name, tk: x.th[0], th: x.th.map((t) => THEME_KO[t] || t).join("·"), ind: ind,
      corr: own ? own.corr : raw ? raw.corr : null, raw: raw ? raw.corr : null, beta: raw ? raw.beta : null });
  });
  // 한국 = 그 업종 종목 전부(그냥 상관 큰 순, 8개까지), 미국 = 시장 몫을 뺀 상관 0.3 이상 상위 5
  const pos = byInd ? res.sort((a, b) => (b.raw == null ? -9 : b.raw) - (a.raw == null ? -9 : a.raw)).slice(0, 8)
    : res.filter((x) => x.corr != null && x.corr >= SECTOR_MOVER_MIN).sort((a, b) => b.corr - a.corr).slice(0, MOVERS);
  return { weeks: base.size, bench: bench, by: byInd ? "ind" : "own", pos: pos, universe: weekly.length, members: byInd ? res.length : undefined };
}
function loadPrevSectors() {
  try { const w = {}; new Function("window", fs.readFileSync(SECTOR_OUT, "utf8"))(w); const S = w.SECTOR_TA || {}, m = {}; ["korea", "us"].forEach((c) => (S[c] || []).forEach((x) => { m[x.key] = x; })); return m; } catch (_e) { return {}; }
}
async function poolMap(list, n, fn) {
  const out = new Array(list.length);
  let k = 0;
  await Promise.all(Array.from({ length: Math.min(n, list.length) }, async () => { while (k < list.length) { const i = k++; out[i] = await fn(list[i], i); } }));
  return out;
}
async function buildSectors(fetchedIdx) {
  const D = loadReco(), prevS = loadPrevSectors(), indOf = loadFundInd();
  const out = { korea: [], us: [] }, bench = {}, asOf = {};
  let ok = 0, fell = 0, charts = 0;
  for (const c of ["korea", "us"]) {
    const bRows = c === "korea" && fetchedIdx.kospi ? fetchedIdx.kospi : await fetchSeries(SECTOR_BENCH[c].symbol);
    const bF = bRows ? macroFacts(bRows) : null;
    bench[c] = { name: SECTOR_BENCH[c].name, symbol: SECTOR_BENCH[c].symbol, asOf: bF ? bF.asOf : null, chg: bF ? bF.chg : null };
    const weekly = stockWeekly(D, c), dp = c === "korea" ? 0 : 2;
    const rowsBy = await poolMap(SECTORS[c], 4, (cfg) => fetchSeries(cfg.symbol));
    SECTORS[c].forEach((cfg, i) => {
      const rows = rowsBy[i];
      // 연휴처럼 봉 간격이 벌어져도 시장 기준(코스피·S&P 500)과 같은 봉 날짜 쌍이면 정상 휴장 — 등락률을 감추지 않는다
      const gapOk = rows ? (!rows.lastGapDays || rows.lastGapDays <= MAX_GAP_DAYS || !!(bRows && bRows.lastDate === rows.lastDate && bRows.prevDate === rows.prevDate)) : false;
      const a = rows ? analyze(Object.assign({ dp: dp, srDp: dp }, cfg), rows, gapOk) : null;
      if (!a) {
        if (prevS[cfg.key]) { out[c].push(Object.assign({}, prevS[cfg.key], { change: "–", changeDir: "down" })); fell++; }
        console.warn("  ⚠ 섹터 " + cfg.name + "(" + cfg.symbol + ") 조회 실패" + (prevS[cfg.key] ? " — 이전 값 유지" : ""));
        return;
      }
      const f = macroFacts(rows), rs = {};
      if (bF) ["w1", "m1", "m3", "ytd", "y1"].forEach((k) => { if (f.chg[k] != null && bF.chg[k] != null) rs[k] = rnd(f.chg[k] - bF.chg[k], 1); });
      if (!gapOk) f.chg.d1 = null;
      let rel = null;
      try { rel = sectorRelations(cfg, rows, bRows, weekly, indOf); } catch (e) { console.warn("  ⚠ 섹터 " + cfg.key + " 관련 종목 계산 실패: " + e.message); }
      const sig = (x) => ({ trend: x.trend, signal: x.signal });   // 화면은 신호만 쓴다(지표 설명은 싣지 않아 파일을 가볍게)
      out[c].push({ key: cfg.key, name: cfg.name, etf: cfg.etf, symbol: cfg.symbol, naver: cfg.naver || cfg.symbol.replace(/\.K[SQ]$/, ""),
        level: a.level, change: a.change, changeDir: a.changeDir, short: sig(a.short), mid: sig(a.mid), long: sig(a.long), asOf: rows.lastDate,
        facts: Object.assign(f, { rs: rs }, rel ? { rel: rel } : {}) });
      if (writeChart("idx-sec-" + cfg.key, rows, dp)) charts++;
      ok++;
      if (!asOf[c] || rows.lastDate > asOf[c]) asOf[c] = rows.lastDate;
    });
  }
  if (!ok && !fell) { console.warn("  ⚠ 섹터: 전부 조회 실패 — data/sectors.js 그대로 둠"); return; }
  const S = {
    asOf: asOf, builtAt: new Date().toISOString().slice(0, 19) + "Z",
    note: "업종 ETF 일봉으로 지수와 같은 엔진(단기=일봉·중기=주봉·장기=월봉)을 매일 자동 계산(LLM 토큰 0). rs = 같은 기간 시장(코스피·S&P 500) 등락과의 차이(%p), rel = 최근 약 2년 주간 수익률로 본 시장 상관과 같이 움직인 편성·관심·보유 종목 — 사실 숫자이지 예측이 아니다.",
    bench: bench, korea: out.korea, us: out.us
  };
  fs.writeFileSync(SECTOR_OUT,
    "// 섹터(업종 ETF) 기술적 분석·관련 정보 — scripts/update-indices.js 가 자동 생성(LLM 토큰 0). 앱 홈 '오늘의 시장' 섹터 쪽과 섹터 상세.\n" +
    "window.SECTOR_TA = " + JSON.stringify(S) + ";\n");
  console.log("sectors.js 갱신: 한국 " + out.korea.length + " · 미국 " + out.us.length + " (" + (asOf.korea || "–") + " / " + (asOf.us || "–") + ") — 실시간 " + ok + " · 폴백 " + fell + " · 차트 " + charts);
}

function loadPrev() {
  if (!fs.existsSync(OUT)) return {};
  try {
    global.window = {};
    delete require.cache[require.resolve(OUT)];
    require(OUT);
    const T = global.window.INDEX_TA;
    const map = {};
    (T && T.indices || []).concat((T && T.macro) || []).forEach((x) => { map[x.key] = x; });
    return map;
  } catch (_e) { return {}; }
}

// 직전 asOf — 전 지수 조회 실패 시 실행일로 덮어쓰지 않기 위한 폴백
function loadPrevAsOf() {
  if (!fs.existsSync(OUT)) return null;
  try {
    global.window = {};
    delete require.cache[require.resolve(OUT)];
    require(OUT);
    return (global.window.INDEX_TA && global.window.INDEX_TA.asOf) || null;
  } catch (_e) { return null; }
}

(async () => {
  // --sectors-only: 섹터(data/sectors.js·idx-sec 차트)만 다시 만든다 — 지수·수급 파일은 건드리지 않는다
  if (process.argv.indexOf("--sectors-only") >= 0) { await buildSectors({}); return; }
  const prev = loadPrev();
  let live = 0, fellBack = 0, lastBar = null, charts = 0;

  // 전 지수를 먼저 받아 두면, 같은 나라 짝 지수와 봉 날짜를 대조해 '정상 연휴'와
  // '중간 봉 누락'을 구분할 수 있다 — 성금요일·설날·추석처럼 달력일 간격이 3일을
  // 넘는 완전한 시리즈를 봉 누락으로 오판해 정확한 등락률을 숨기던 문제(감사).
  const fetched = {};
  for (const cfg of INDICES) fetched[cfg.key] = await fetchSeries(cfg.symbol);
  const PAIR = { nasdaq: "dow", dow: "nasdaq", kospi: "kosdaq", kosdaq: "kospi" };
  function gapOkFor(key) {
    const rows = fetched[key];
    if (!rows) return null;
    if (!rows.lastGapDays || rows.lastGapDays <= MAX_GAP_DAYS) return true;
    const mate = fetched[PAIR[key]];
    // 같은 나라 두 지수가 동일한 봉 날짜 쌍을 보이면 그 간격은 휴장(연휴)이다 — 등락률 신뢰 가능
    if (mate && mate.lastDate === rows.lastDate && mate.prevDate === rows.prevDate) return true;
    return false;
  }

  // 투자자별 순매수 — 끝난 장(야후가 끝난 장으로 본 코스피 마지막 봉)까지만. 받기에 실패하면 쌓아 둔 기록을 쓴다.
  // 실패는 Action 실행 요약에 경고(::warning::)로도 남긴다 — 매일 자동 갱신이 조용히 멈추지 않게(2026-10-27).
  const flowWarn = (m) => console.warn((process.env.GITHUB_ACTIONS ? "::warning::" : "  ⚠ ") + "수급: " + m);
  let flows = null, flowState = "";
  try {
    const fr = await LF.updateFlows({ maxDate: fetched.kospi && fetched.kospi.lastDate });
    flows = fr.data;
    fr.notes.forEach(flowWarn);
    flowState = fr.notes.length ? "일부 받기 실패" : fr.changed ? "새로 받음" : "변화 없음";
  } catch (e) {
    flowWarn("갱신 실패(이전 기록 유지) — " + e.message);
    flowState = "받기 실패";
    flows = (() => { try { return JSON.parse(fs.readFileSync(LF.FILE, "utf8")); } catch (_e) { return null; } })();
  }
  const flowRows = (key) => (flows && LF.MARKETS[key] && Array.isArray(flows[key]) && flows[key].length ? flows[key] : null);

  const indices = [];
  for (const cfg of INDICES) {
    const rows = fetched[cfg.key];
    const a = rows ? analyze(cfg, rows, gapOkFor(cfg.key)) : null;
    if (a) {
      indices.push(a);
      // 야후는 코스피·코스닥 거래량을 천 주 단위로 준다(예: 298,900 = 약 3억 주) — 차트에는 주 단위로 바꿔 쓴다
      const chartRows = KR_VOL_THOUSANDS[cfg.key] ? Object.assign(rows.map((r) => Object.assign({}, r, { vol: r.vol != null ? r.vol * 1000 : r.vol })), { offMs: rows.offMs, lastDate: rows.lastDate }) : rows;
      const fr = flowRows(cfg.key);
      if (writeChart("idx-" + cfg.key, chartRows, 2, fr ? LF.flowMap(fr) : null)) charts++;
      live++;
      if (rows.lastDate && (!lastBar || rows.lastDate > lastBar)) lastBar = rows.lastDate;
    } else if (prev[cfg.key]) {
      // 이전 계산값 유지하되 등락률은 감춘다 — 파일 asOf 는 성공한 지수의 최신 거래일로
      // 올라가므로, 전일 등락률을 그대로 두면 오늘 것처럼 색까지 입혀 표시된다(감사).
      indices.push(Object.assign({}, prev[cfg.key], { change: "–", changeDir: "down" }));
      fellBack++;
    } else {
      // 최초 생성 시 조회 실패한 지수는 최소 골격만 남긴다(렌더가 깨지지 않도록).
      const skel = { trend: "횡보", signal: "중립", metrics: [["상태", "조회 실패 · 다음 갱신 대기"]], read: "데이터 조회 실패." };
      indices.push({
        key: cfg.key, name: cfg.name, flag: cfg.flag, chartUrl: cfg.chartUrl,
        level: "–", change: "–", changeDir: "down", period: "", short: skel, mid: skel, long: skel
      });
      fellBack++;
    }
  }
  // 수급 요약(최근일·5·20·60일 합·연속 일수) — 지수 조회가 실패해 이전 값으로 폴백한 날에도 수급은 새로 받은 기록으로
  indices.forEach((x) => { const fr = flowRows(x.key); if (fr) x.flows = LF.flowSummary(fr); });

  // 환율·원자재 — 지수와 같은 엔진·같은 차트 형식. asOf 는 항목마다(파일 asOf 에 섞지 않는다 — MACRO 주석)
  const macro = [];
  const idxRows = { kospi: fetched.kospi, nasdaq: fetched.nasdaq };
  for (const cfg of MACRO) {
    const rows = await fetchSeries(cfg.symbol);
    const a = rows ? analyze(cfg, rows) : null;
    if (a) {
      let rel = null;
      try { rel = macroRelations(cfg, rows, idxRows); } catch (e) { console.warn("  ⚠ " + cfg.key + " 관련 종목 계산 실패: " + e.message); }
      delete a.flag; delete a.period;   // period 는 UTC 날짜라 런던·뉴욕 자정 봉에서 하루 어긋난다 — asOf 를 쓴다
      macro.push(Object.assign(a, { sub: cfg.sub, unit: cfg.unit, symbol: cfg.symbol, asOf: rows.lastDate,
        facts: Object.assign(macroFacts(rows), rel ? { rel: rel } : {}) }));
      if (writeChart("idx-" + cfg.key, rows, 2)) charts++;
      live++;
    } else if (prev[cfg.key]) {
      macro.push(Object.assign({}, prev[cfg.key], { change: "–", changeDir: "down" }));
      fellBack++;
    }
  }

  // 폴백만 남은 경우(전 지수 조회 실패)엔 이전 asOf 를 유지해 신선도 오판을 막는다.
  const asOf = argVal("date") || lastBar || loadPrevAsOf() || new Date().toISOString().slice(0, 10);

  const T = {
    asOf: asOf,
    // builtAt = 이 파일을 실제로 다시 만든 시각(asOf 는 마지막 봉의 거래일이라 다르다).
    builtAt: new Date().toISOString().slice(0, 19) + "Z",
    note: "기술적 지표는 Yahoo 일봉에서 매일 자동 계산(LLM 토큰 0). 이동평균(SMA·EMA)과 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를 종합 투표한 5단계 신호 — 단기=일봉, 중기=주봉, 장기=월봉 3기간.",
    indices: indices,
    macro: macro
  };

  const body =
    "// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)\n" +
    "// 나스닥·다우·코스피·코스닥(indices)과 원/달러·달러인덱스·WTI·금(macro)의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.\n" +
    "// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.\n" +
    "window.INDEX_TA = " + JSON.stringify(T, null, 1) + ";\n";
  fs.writeFileSync(OUT, body);

  const fl = indices.filter((x) => x.flows).map((x) => x.key + " " + x.flows.asOf + " 외국인 " + x.flows.last.f + "억");
  console.log("indices.js 갱신: " + indices.length + "개 지수 + 환율·원자재 " + macro.length + " (" + asOf + ") — 실시간 " +
    live + " · 폴백 " + fellBack + " · 차트 " + charts + (fl.length ? " · 수급(" + flowState + ") " + fl.join(", ") : " · 수급 없음"));

  // 섹터 — 지수 파일을 쓴 뒤 따로(실패해도 indices.js 는 이미 저장됨). --no-sectors 면 건너뛴다.
  if (process.argv.indexOf("--no-sectors") < 0) {
    try { await buildSectors(fetched); } catch (e) { console.warn((process.env.GITHUB_ACTIONS ? "::warning::" : "  ⚠ ") + "섹터 갱신 실패(이전 data/sectors.js 유지) — " + e.message); }
  }
})();
