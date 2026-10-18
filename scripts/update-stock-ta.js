#!/usr/bin/env node
// 개별 종목 기술적 분석 자동 갱신 — LLM 토큰 0 (순수 스크립트, refresh-quotes Action에서 실행)
//
// 역할: recommendations.js의 전 종목에 대해 Yahoo 10년 일봉을 받아 단기(일봉)·중기(주봉)·장기(월봉)
//       기술적 분석(이동평균·일목균형표·매물대·오실레이터·지지/저항·신호)을 공유 lib-ta로 계산해
//       data/stock-ta.js로 저장. ★10년을 받는 이유: 월봉 일목균형표는 선행스팬B(52)+선행 26 = 78개월치가
//       필요해 5년(60개월)으로는 장기 구름을 만들 수 없다.
//       가격·지표 모두 결정론적 계산이므로 시세(quotes.js)·지수(indices.js)와 함께 매일 자동 갱신된다.
//
// 사용법: node scripts/update-stock-ta.js  [--date YYYY-MM-DD]
// 조회 실패 종목은 이전 stock-ta.js 값으로 폴백한다.

const fs = require("fs");
const path = require("path");
const TA = require("./lib-ta.js");
const { settleDailyBars } = require("./lib-quote");   // 일봉을 끝난 장 기준으로 정리(장중 미완성 봉 제외·빈 종가 채움)

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");
const OUT = path.join(ROOT, "data", "stock-ta.js");

function argVal(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : null;
}

function symbolFor(s) {
  if (s.market === "KOSPI") return s.ticker + ".KS";
  if (s.market === "KOSDAQ") return s.ticker + ".KQ";
  return s.ticker === "BRK.B" ? "BRK-B" : s.ticker;   // 미국(NASDAQ/NYSE)
}

function loadStocks() {
  global.window = {};
  delete require.cache[require.resolve(RECO)];
  require(RECO);
  const D = global.window.STOCK_DATA || {};
  const seen = {}, list = [];
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (!s || !s.ticker || seen[s.ticker]) return;
    seen[s.ticker] = 1;
    list.push({ ticker: s.ticker, symbol: symbolFor(s), market: s.market, name: s.name });
  }));
  return list;
}

function loadPrev() {
  if (!fs.existsSync(OUT)) return {};
  try {
    global.window = {};
    delete require.cache[require.resolve(OUT)];
    require(OUT);
    return (global.window.STOCK_TA && global.window.STOCK_TA.ta) || {};
  } catch (_e) { return {}; }
}

// 직전 asOf — 전 종목 조회 실패 시 실행일로 덮어쓰지 않기 위한 폴백
function loadPrevAsOf() {
  if (!fs.existsSync(OUT)) return null;
  try {
    global.window = {};
    delete require.cache[require.resolve(OUT)];
    require(OUT);
    return (global.window.STOCK_TA && global.window.STOCK_TA.asOf) || null;
  } catch (_e) { return null; }
}

const sleepMs = (ms) => new Promise((res) => setTimeout(res, ms));

// 야후 간헐 429/5xx 대비 3회 재시도 — 실패 시 이전 파일 폴백인데, 폴백된 종목은
// 구식 지표가 최신 asOf 아래 표시되므로(종목별 asOf 없음) 실패율을 최대한 낮춘다.
async function fetchRows(symbol) {
  for (let i = 0; i < 3; i++) {
    const rows = await fetchRowsOnce(symbol);
    if (rows) return rows;
    if (i < 2) await sleepMs(400 * Math.pow(2, i));
  }
  return null;
}

async function fetchRowsOnce(symbol) {
  if (typeof fetch !== "function") return null;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 10000);
  let j;
  try {
    const r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(symbol) +
      "?interval=1d&range=10y", { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
    if (!r.ok) return null;
    j = await r.json();   // 본문 수신도 타임아웃 범위 안에서(스톨 방지)
  } catch (_e) { return null; }
  finally { clearTimeout(to); }
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  if (!res || !res.indicators || !res.indicators.quote || !res.indicators.quote[0]) return null;
  // 장중 실행이면 진행 중인 장의 미완성 봉은 버린다 — 끝난 장 기준으로만 신호를 낸다(lib-quote 참고)
  settleDailyBars(res);
  const q = res.indicators.quote[0], ts = res.timestamp || [], rows = [];
  for (let i = 0; i < (q.close || []).length; i++) {
    if (q.close[i] == null) continue;
    rows.push({ t: ts[i], close: q.close[i],
      open: q.open && q.open[i] != null ? q.open[i] : null,   // 차트 캔들용(지표 계산은 쓰지 않는다)
      high: q.high && q.high[i] != null ? q.high[i] : q.close[i],
      low: q.low && q.low[i] != null ? q.low[i] : q.close[i],
      vol: q.volume && q.volume[i] != null ? q.volume[i] : null });
  }
  if (rows.length < TA.MIN_BARS) return null;   // lib 의 최소 봉수와 동일 게이트(불일치 시 조용한 폴백 발생)
  // 마지막 봉의 거래소 현지 날짜 = 실제 최신 거래일. 주말·휴장일에 돌려도 실행일이 아닌
  // 이 날짜가 asOf 가 돼야 techNote.asOf 비교에서 전 종목이 '구식'으로 오판되지 않는다.
  const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000;
  const lastT = rows[rows.length - 1].t;
  rows.lastDate = lastT ? new Date(lastT * 1000 + off).toISOString().slice(0, 10) : null;
  rows.offMs = off;
  return rows;
}

// ── 종목 상세 차트 데이터(data/chart/<ticker>.json) ──
// 앱 종목 상세의 캔들 차트(일·주·월봉 + 이동평균 5·20·60·120 + 거래량)가 종목을 열 때만 받아 그린다.
// 받아 둔 10년 일봉에서 만들어 추가 조회가 없다. 이동평균은 앱이 계산하므로 표시 구간보다 길게 담는다
// (일봉 260개 = 표시 120 + 120일선 준비분, 주봉 200개, 월봉 전부). 행 = [날짜, 시가, 고가, 저가, 종가, 거래량],
// 날짜는 거래소 현지 날짜 정수(일·주 YYYYMMDD — 주봉은 그 주 마지막 거래일, 월봉 YYYYMM).
const CHART_DIR = path.join(ROOT, "data", "chart");
const CHART_KEEP = { d: 260, w: 200, m: 130 };
function chartFile(ticker) { return path.join(CHART_DIR, ticker.replace(/[^A-Za-z0-9.\-]/g, "_") + ".json"); }
function chartOf(rows, dp) {
  const off = rows.offMs || 0;
  const r = (v) => (dp ? +v.toFixed(dp) : Math.round(v));
  const daily = [];
  rows.forEach((x) => {
    if (!(x.close > 0)) return;
    const o = x.open > 0 ? x.open : x.close;
    const ymd = new Date(x.t * 1000 + off).toISOString().slice(0, 10);
    daily.push({ ymd: ymd, o: o, h: Math.max(x.high || 0, o, x.close), l: Math.min(x.low > 0 ? x.low : x.close, o, x.close), c: x.close, v: x.vol || 0 });
  });
  // 주봉(월요일 시작 주)·월봉(달력 월) — 시가는 첫 봉, 종가는 마지막 봉, 고·저는 극값, 거래량은 합
  function bucket(keyOf) {
    const out = [];
    daily.forEach((b) => {
      const k = keyOf(b.ymd), last = out[out.length - 1];
      if (!last || last.k !== k) out.push({ k: k, ymd: b.ymd, o: b.o, h: b.h, l: b.l, c: b.c, v: b.v });
      else { last.ymd = b.ymd; last.h = Math.max(last.h, b.h); last.l = Math.min(last.l, b.l); last.c = b.c; last.v += b.v; }
    });
    return out;
  }
  const weekKey = (ymd) => { const d = new Date(ymd + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); };
  const row = (b, dateInt) => [dateInt, r(b.o), r(b.h), r(b.l), r(b.c), Math.round(b.v)];
  const ymdInt = (s) => +s.replace(/-/g, "");
  return {
    d: daily.slice(-CHART_KEEP.d).map((b) => row(b, ymdInt(b.ymd))),
    w: bucket(weekKey).slice(-CHART_KEEP.w).map((b) => row(b, ymdInt(b.ymd))),
    m: bucket((ymd) => ymd.slice(0, 7)).slice(-CHART_KEEP.m).map((b) => row(b, +b.ymd.slice(0, 7).replace("-", ""))),
  };
}
function writeChart(ticker, rows, dp) {
  const c = chartOf(rows, dp);
  if (!c.d.length) return false;
  fs.mkdirSync(CHART_DIR, { recursive: true });
  fs.writeFileSync(chartFile(ticker), JSON.stringify(Object.assign({ t: ticker, dp: dp, asOf: rows.lastDate }, c)));
  return true;
}

// 실측 리스크 — 최근 60일 실현변동성(연율화 %)·최근 120일 최대낙폭(%).
// pickScore 의 riskScore 가 종전엔 '리스크 불릿 개수'(내생 변수 — 성실한 공시를 벌점화)였는데,
// 이미 받는 일봉으로 토큰 0 에 계산되는 실측치로 대체하기 위한 입력이다.
function riskOf(rows) {
  const closes = rows.map((r) => r.close);
  const rets = [];
  const from = Math.max(1, closes.length - 60);
  for (let i = from; i < closes.length; i++) {
    if (closes[i] > 0 && closes[i - 1] > 0) rets.push(Math.log(closes[i] / closes[i - 1]));
  }
  if (rets.length < 20) return null;   // 표본 부족이면 저장하지 않음(앱이 불릿 폴백 사용)
  const mean = rets.reduce((a, b) => a + b, 0) / rets.length;
  const sd = Math.sqrt(rets.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (rets.length - 1));
  const vol = sd * Math.sqrt(252) * 100;
  let peak = -Infinity, mdd = 0;
  for (const c of closes.slice(-120)) {
    if (c > peak) peak = c;
    else if (peak > 0) mdd = Math.max(mdd, (peak - c) / peak * 100);
  }
  return { vol: Math.round(vol * 10) / 10, mdd: Math.round(mdd * 10) / 10 };
}

// 전망 범위 — 다음 1개월(21거래일)·3개월(63거래일) 80% 가격 범위(종가 × exp(±1.28·σ60·√h)).
// 왜: 신호 등급은 이미 일어난 움직임을 설명할 뿐 다음 방향을 맞히지 못한다(2026-10-16 진단 — 등급 전환 직후
//     1개월 지수 대비 초과수익 평균 -1.1~+0.9%, 전환 전 20일에 이미 ±2.5~6% 움직임). 대신 '얼마나 움직일 수 있나'는
//     예측된다: 이 대칭 범위가 2016~2026 한·미 991종목에서 표본 밖 79.8~81.3% 적중했다(docs/HISTORY.md).
//     드리프트를 넣지 않는다 — 현재 시총 상위 표본의 상승 편향(생존편향)을 예측에 섞지 않기 위해서다.
const RANGE_Z = 1.28;
// 50% 핵심 범위(z 0.674) — 80% 범위의 절반 폭. 표본 밖 적중 한국 54~55%·미국 50~51%(1개월)로 보정이 맞았다(range-sharp.js).
// '80% 범위는 넓어서 맞는 것 아니냐'(2026-10-16 사용자 지적)에 대한 답: 폭은 그 종목의 실제 변동성이라 크게 줄일 수 없지만
// (변동성 추정법 9가지 중 최선도 6~10% 좁아지는 대신 적중률이 76~78%로 떨어짐), 절반 확률 구간은 폭이 절반이라 더 구체적이다.
const CORE_Z = 0.674;
function outlookOf(rows, dp) {
  const c = rows.map((r) => r.close), n = c.length;
  if (n < 61) return null;
  const lr = [];
  for (let i = n - 60; i < n; i++) if (c[i] > 0 && c[i - 1] > 0) lr.push(Math.log(c[i] / c[i - 1]));
  if (lr.length < 40) return null;
  const mu = lr.reduce((a, b) => a + b, 0) / lr.length;
  const sd = Math.sqrt(lr.reduce((a, b) => a + (b - mu) * (b - mu), 0) / (lr.length - 1));
  const base = c[n - 1];
  const rnd = (v) => (dp ? +v.toFixed(dp) : Math.round(v));
  const band = (h, z) => [rnd(base * Math.exp(-z * sd * Math.sqrt(h))), rnd(base * Math.exp(z * sd * Math.sqrt(h)))];
  return { base: rnd(base), sd: +(sd * 100).toFixed(2), m1: band(21, RANGE_Z), m3: band(63, RANGE_Z), c1: band(21, CORE_Z), c3: band(63, CORE_Z) };
}
// 시장 기준 변동성 — 종목 범위가 넓은지 좁은지 읽을 잣대(코스피·S&P500 의 같은 σ60). 카드에 '시장의 N배'로 보인다.
const BENCH = { korea: { sym: "^KS11", name: "코스피" }, us: { sym: "^GSPC", name: "S&P500" } };

// 저장용 반올림 — 한국 정수, 미국 소수 2자리. 비율은 소수 3자리.
const rndP = (v, dp) => (v == null || !isFinite(v) ? null : dp ? +v.toFixed(dp) : Math.round(v));
const rndR = (v) => (v == null || !isFinite(v) ? null : +v.toFixed(3));
function factsSlim(f, dp) {
  if (!f) return null;
  const o = { unit: f.unit, ma: { m20: rndP(f.ma.m20, dp), m60: rndP(f.ma.m60, dp), m120: rndP(f.ma.m120, dp) },
    sr: { sup: rndP(f.sr.sup, dp), res: rndP(f.sr.res, dp) }, rsi: f.rsi == null ? null : +f.rsi.toFixed(1), vpAbove: rndR(f.vpAbove) };
  if (f.ichi) o.ichi = { where: f.ichi.where, top: rndP(f.ichi.top, dp), bot: rndP(f.ichi.bot, dp), tenkan: rndP(f.ichi.tenkan, dp),
    kijun: rndP(f.ichi.kijun, dp), cloudDir: f.ichi.cloudDir, chikou: f.ichi.chikou };
  if (f.cross) o.cross = f.cross;
  if (f.vs200 != null) o.vs200 = +f.vs200.toFixed(1);
  return o;
}
// 매물대 지도(최근 1년 일봉 24구간) — 카드의 매물대 막대와 자동 기술 요약이 쓴다. sh 는 구간별 거래 비중(천분율 정수).
function vpSlim(v, dp) {
  if (!v) return null;
  const z = (x) => (x ? { lo: rndP(x.lo, dp), hi: rndP(x.hi, dp), share: rndR(x.share) } : null);
  return { lo: rndP(v.lo, dp), hi: rndP(v.hi, dp), sh: v.sh.map((x) => Math.round(x * 1000)), above: rndR(v.above),
    poc: rndP(v.poc, dp), pocShare: rndR(v.pocShare), below: z(v.below), upper: z(v.upper) };
}

// 동시성 제한 실행
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

(async () => {
  const stocks = loadStocks();
  const prev = loadPrev();
  let live = 0, fellBack = 0, lastBar = null, charts = 0;
  const ta = {};

  await mapLimit(stocks, 8, async (s) => {
    const rows = await fetchRows(s.symbol);
    const dp = s.market === "KOSPI" || s.market === "KOSDAQ" ? 0 : 2;   // 한국주=정수, 미국주=소수 2
    const a = rows ? TA.analyzeTimeframes(rows, { dp: dp, srDp: dp }) : null;
    if (a) {
      // 앱이 실제로 쓰는 필드만 남긴다(화이트리스트) — sigLegacy/sigBlock/sigFlow·blocks·flow 는
      // 엔진 비교(backtest)용이라 저장하면 파일만 커진다. 새 필드가 생겨도 자동으로 새지 않는다.
      // f = 구조화된 사실(이평·일목·지지/저항·매물대 비중) — gen-technote.js 가 자동 기술 요약을 만드는 입력.
      // metrics·read(엔진 내부 부분점수 문자열)는 2026-10-16 부터 저장하지 않는다 — 카드에 '이평(-0.72)' 같은 내부 점수가
      // 그대로 옮겨 적혀 읽는 사람에게 의미가 없었다. 판단 근거는 f 의 관측 가능한 가격(이평·구름·매물대)으로 쓴다.
      const slim = (x) => ({ trend: x.trend, signal: x.signal, f: factsSlim(x.facts, dp) });
      ta[s.ticker] = { short: slim(a.short), mid: slim(a.mid), long: slim(a.long) };
      const vp = vpSlim(TA.vpMap(rows, 250, 24), dp);
      if (vp) ta[s.ticker].vp = vp;
      const risk = riskOf(rows) || (prev[s.ticker] && prev[s.ticker].risk) || null;
      if (risk) ta[s.ticker].risk = risk;
      const ol = outlookOf(rows, dp);
      if (ol) ta[s.ticker].outlook = ol;
      if (writeChart(s.ticker, rows, dp)) charts++;   // 조회 실패 종목은 이전 차트 파일을 그대로 둔다
      live++;
      if (rows.lastDate && (!lastBar || rows.lastDate > lastBar)) lastBar = rows.lastDate;
    }
    else if (prev[s.ticker]) { ta[s.ticker] = prev[s.ticker]; fellBack++; }
    else fellBack++;   // 최초 실패는 생략(렌더가 해당 종목 TA를 숨김)
  });

  // 시장 기준 변동성 — 조회 실패면 이전 값 유지
  const prevBench = (() => { try { global.window = {}; delete require.cache[require.resolve(OUT)]; require(OUT); return (global.window.STOCK_TA && global.window.STOCK_TA.bench) || {}; } catch (_e) { return {}; } })();
  const bench = {};
  for (const c of Object.keys(BENCH)) {
    const rows = await fetchRows(BENCH[c].sym);
    const ol = rows ? outlookOf(rows, 2) : null;
    if (ol) bench[c] = { sym: BENCH[c].sym, name: BENCH[c].name, sd: ol.sd };
    else if (prevBench[c]) bench[c] = prevBench[c];
  }

  // 폴백만 남은 경우(전 종목 조회 실패)엔 이전 asOf 를 유지해 신선도 오판을 막는다.
  const asOf = argVal("date") || lastBar || loadPrevAsOf() || new Date().toISOString().slice(0, 10);

  const T = {
    asOf: asOf,
    // builtAt = 이 파일을 실제로 다시 만든 시각(asOf 는 마지막 봉의 거래일이라 다르다).
    // coverage.js 가 '이번 회차에 backbone 을 돌렸는가'를 이 값으로 판정한다 — 건너뛰면
    // 뒤늦게 backbone 이 T 를 올리면서 방금 쓴 techNote 가 통째로 구식이 된다.
    builtAt: new Date().toISOString().slice(0, 19) + "Z",
    note: "개별 종목 기술적 분석 — 이동평균(30%)·일목균형표(30%)·매물대(25%)·오실레이터(15%) 가중 종합에 상위 기간 추세 반영(단기=일·주·월 5:3:2, 중기=주·월 7:3). 단기=일봉, 중기=주봉, 장기=월봉 3기간. Yahoo 10년 일봉에서 매일 자동 계산(LLM 토큰 0).",
    bench: bench,
    ta: ta
  };
  const body =
    "// 개별 종목 기술적 분석 스냅샷 — scripts/update-stock-ta.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)\n" +
    "// ticker → { short:{trend,signal,f:{unit,ma:{m20,m60,m120},ichi:{where,top,bot,tenkan,kijun},sr:{sup,res},rsi,vpAbove}}, mid:{...}, long:{...,f:{…,cross,vs200}},\n" +
    "//            risk:{vol 60일 실현변동성(연율화%), mdd 120일 최대낙폭%}, outlook:{base 기준 종가, sd 일간 σ60(%), m1:[하단,상단] 다음 21거래일 80% 범위, m3:[…] 63거래일, c1·c3: 같은 기간 50% 핵심 범위},\n" +
    "//            vp:{lo,hi 최근 1년 가격 범위, sh[24] 구간별 거래 비중(‰), above 현재가 위 거래 비중, poc, pocShare, below/upper:{lo,hi,share} 가장 가까운 거래 집중 구간} }.\n" +
    "// bench:{korea|us:{sym,name,sd}} 시장 지수 σ60(일간 %) — 종목 변동폭을 '시장의 N배'로 읽는 잣대. 단기(일봉)/중기(주봉)/장기(월봉) 분리.\n" +
    "window.STOCK_TA = " + JSON.stringify(T) + ";\n";
  fs.writeFileSync(OUT, body);

  // 편성에서 빠진 종목의 차트 파일 정리(남겨 두면 저장소만 커진다)
  let pruned = 0;
  if (fs.existsSync(CHART_DIR)) {
    const keep = {};
    stocks.forEach((s) => { keep[path.basename(chartFile(s.ticker))] = 1; });
    fs.readdirSync(CHART_DIR).forEach((f) => { if (/\.json$/.test(f) && !keep[f]) { fs.unlinkSync(path.join(CHART_DIR, f)); pruned++; } });
  }

  console.log("stock-ta.js 갱신: " + Object.keys(ta).length + "/" + stocks.length +
    "종목 (" + asOf + ") — 실시간 " + live + " · 폴백 " + fellBack + " · 차트 " + charts + (pruned ? " (정리 " + pruned + ")" : ""));
})();
