#!/usr/bin/env node
// 지수 기술적 분석 자동 갱신 — LLM 토큰 0 (순수 스크립트, refresh-quotes Action에서 실행)
//
// 역할: 나스닥 종합(^IXIC)·다우존스(^DJI)·코스피(^KS11)·코스닥(^KQ11)의 5년치 일봉을
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
    chartUrl: "https://finance.naver.com/sise/sise_index.naver?code=KOSPI" },
  { key: "kosdaq", name: "코스닥", flag: "🇰🇷", symbol: "^KQ11",
    chartUrl: "https://finance.naver.com/sise/sise_index.naver?code=KOSDAQ" }
];


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
  const q = res.indicators.quote[0];
  const ts = res.timestamp || [];
  const rows = [];
  for (let i = 0; i < (q.close || []).length; i++) {
    if (q.close[i] == null) continue;
    rows.push({
      t: ts[i], close: q.close[i],
      high: q.high && q.high[i] != null ? q.high[i] : q.close[i],
      low: q.low && q.low[i] != null ? q.low[i] : q.close[i],
      vol: q.volume && q.volume[i] != null ? q.volume[i] : null
    });
  }
  if (rows.length < TA.MIN_BARS) return null;   // lib 의 최소 봉수와 동일 게이트(불일치 시 조용한 폴백 발생)
  // 마지막 봉의 거래소 현지 날짜 = 실제 최신 거래일. 주말·휴장일에 돌려도 실행일이 아닌
  // 이 날짜가 asOf 가 돼야 INDEX_NOTES.asOf 비교에서 '구식'으로 오판되지 않는다.
  const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000;
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
  const a = TA.analyzeTimeframes(rows, { dp: 2, srDp: 0 });
  if (!a) return null;
  // 시리즈에 구멍이 있으면(중간 거래일 누락) 등락률이 여러 날치를 하루로 뭉뚱그린 값이 된다.
  // 틀린 숫자를 보여주느니 감춘다 — 지표(RSI·이동평균)는 1봉 누락에 둔감해 그대로 쓴다.
  const gapOk = gapOkOverride != null ? gapOkOverride : (!rows.lastGapDays || rows.lastGapDays <= MAX_GAP_DAYS);
  if (!gapOk) {
    console.warn("  ⚠ " + cfg.key + ": 등락률 생략 — 최근 봉 간격 " + rows.lastGapDays +
      "일(" + rows.prevDate + " → " + rows.lastDate + ")");
  }
  const slim = (x) => { const o = Object.assign({}, x); delete o.sigLegacy; delete o.sigBlock; delete o.blocks; return o; };   // 비교용 필드 제거(페이로드)
  return {
    key: cfg.key, name: cfg.name, flag: cfg.flag, chartUrl: cfg.chartUrl,
    level: a.level, change: gapOk ? a.change : "–", changeDir: gapOk ? a.changeDir : "down",
    period: a.period, short: slim(a.short), mid: slim(a.mid), long: slim(a.long)
  };
}

function loadPrev() {
  if (!fs.existsSync(OUT)) return {};
  try {
    global.window = {};
    delete require.cache[require.resolve(OUT)];
    require(OUT);
    const T = global.window.INDEX_TA;
    const map = {};
    (T && T.indices || []).forEach((x) => { map[x.key] = x; });
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
  const prev = loadPrev();
  let live = 0, fellBack = 0, lastBar = null;

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

  const indices = [];
  for (const cfg of INDICES) {
    const rows = fetched[cfg.key];
    const a = rows ? analyze(cfg, rows, gapOkFor(cfg.key)) : null;
    if (a) {
      indices.push(a);
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

  // 폴백만 남은 경우(전 지수 조회 실패)엔 이전 asOf 를 유지해 신선도 오판을 막는다.
  const asOf = argVal("date") || lastBar || loadPrevAsOf() || new Date().toISOString().slice(0, 10);

  const T = {
    asOf: asOf,
    // builtAt = 이 파일을 실제로 다시 만든 시각(asOf 는 마지막 봉의 거래일이라 다르다).
    builtAt: new Date().toISOString().slice(0, 19) + "Z",
    note: "기술적 지표는 Yahoo 일봉에서 매일 자동 계산(LLM 토큰 0). 이동평균(SMA·EMA)과 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를 종합 투표한 5단계 신호 — 단기=일봉, 중기=주봉, 장기=월봉 3기간.",
    indices: indices
  };

  const body =
    "// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)\n" +
    "// 나스닥·다우·코스피·코스닥의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.\n" +
    "// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.\n" +
    "window.INDEX_TA = " + JSON.stringify(T, null, 1) + ";\n";
  fs.writeFileSync(OUT, body);

  console.log("indices.js 갱신: " + indices.length + "개 지수 (" + asOf + ") — 실시간 " +
    live + " · 폴백 " + fellBack);
})();
