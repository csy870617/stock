#!/usr/bin/env node
// 지수 기술적 분석 자동 갱신 — LLM 토큰 0 (순수 스크립트, refresh-quotes Action에서 실행)
//
// 역할: 나스닥 종합(^IXIC)·다우존스(^DJI)·코스피(^KS11)·코스닥(^KQ11)의 1년치 일봉을
//       Yahoo Finance 에서 받아, 종가·등락률·이동평균(20/60/120)·RSI(14)·추세·
//       지지/저항·기계적 매매신호(이동평균 집계)를 "결정론적으로 계산"해
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

const TA = require("./lib-ta.js");   // 공유 기술적 분석 라이브러리(단기/장기)

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

// ── 숫자 포맷: 천단위 콤마 + 소수 자릿수 ──
function fmt(n, dp) {
  if (n == null || !isFinite(n)) return "–";
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

// ── 기술적 지표 계산 ──
function mean(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }
function ma(closes, n) { return closes.length >= n ? mean(closes.slice(-n)) : null; }

// RSI(14) — Wilder 스무딩
function rsi(closes, period) {
  period = period || 14;
  if (closes.length < period + 1) return null;
  let gain = 0, loss = 0;
  for (let i = 1; i <= period; i++) {
    const d = closes[i] - closes[i - 1];
    if (d >= 0) gain += d; else loss -= d;
  }
  let avgGain = gain / period, avgLoss = loss / period;
  for (let i = period + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    avgGain = (avgGain * (period - 1) + (d > 0 ? d : 0)) / period;
    avgLoss = (avgLoss * (period - 1) + (d < 0 ? -d : 0)) / period;
  }
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

function rsiState(r) {
  if (r == null) return "";
  if (r >= 70) return "과매수";
  if (r >= 65) return "과매수 근접";
  if (r <= 30) return "과매도";
  if (r <= 35) return "과매도 근접";
  return "중립";
}

// 이동평균 집계 신호 — 종가가 각 이평선 위/아래인지로 매수/매도 표를 세어 5단계로 매핑
function maSignal(closes, level) {
  const periods = [5, 10, 20, 50, 100, 200];
  let buy = 0, total = 0;
  periods.forEach((p) => {
    const m = ma(closes, p);
    if (m == null) return;
    total++;
    if (level > m) buy++;
  });
  if (!total) return { signal: "중립", buy: 0, total: 0 };
  const ratio = buy / total;
  let signal;
  if (ratio >= 0.83) signal = "적극매수";
  else if (ratio >= 0.6) signal = "매수";
  else if (ratio > 0.4) signal = "중립";
  else if (ratio >= 0.17) signal = "매도";
  else signal = "적극매도";
  return { signal, buy, total };
}

// 추세 — 중기선(60일선, 없으면 120·20일선) 대비 종가 위치로 판단.
// 급락 직후 20일선이 아직 60일선 위에 걸쳐 있어 하락장이 '횡보'로 오판되는 것을 피한다.
function trendOf(level, m20, m60, m120) {
  const base = m60 != null ? m60 : (m120 != null ? m120 : m20);
  if (base == null) return "횡보";
  const dev = (level - base) / base;
  if (dev > 0.005) return "상승";
  if (dev < -0.005) return "하락";
  return "횡보";
}

// 지지/저항 — 현재가 기준 '가장 가까운' 아래/위 레벨을 이평선·최근 저·고점 후보에서 고른다.
// (크래시 때 20일 고점처럼 멀리 떨어진 값이 무의미한 저항으로 잡히는 것을 방지)
function levels(level, cands, lo20, hi20) {
  const below = cands.filter((v) => v != null && v < level);
  const above = cands.filter((v) => v != null && v > level);
  const support = below.length ? Math.max.apply(null, below) : lo20;      // 가장 가까운 아래 레벨
  const resistance = above.length ? Math.min.apply(null, above) : hi20;   // 가장 가까운 위 레벨
  return { support, resistance };
}

// 추세 타이브레이커 — 이평선 집계가 '중립'(3:3 부근)일 때 장기 추세로 애매함을 가른다.
// 상승 추세 + 장기선(120일) 상회면 '고점 부근 단기 눌림'으로 보고 '매수'로 상향(상향 전용 —
// 하락 지수는 이미 매도/적극매도라 영향 없음). 단순 이평선 집계가 강한 장기 추세를 과소평가하는 것을 보정.
function signalTiebreak(signal, trend, level, m120) {
  if (signal === "중립" && trend === "상승" && m120 != null && level > m120) return "매수";
  return signal;
}

// 이동평균 관계 요약 문구 (20·60·120일선 상회/하회)
function maSummary(level, m20, m60, m120) {
  const items = [["20", m20], ["60", m60], ["120", m120]].filter((x) => x[1] != null);
  if (!items.length) return "–";
  const above = items.filter((x) => level > x[1]).map((x) => x[0]);
  const below = items.filter((x) => level <= x[1]).map((x) => x[0]);
  if (!below.length) return items.map((x) => x[0]).join("·") + "일선 모두 상회";
  if (!above.length) return items.map((x) => x[0]).join("·") + "일선 모두 하회";
  const parts = [];
  if (above.length) parts.push(above.join("·") + "일선 상회");
  if (below.length) parts.push(below.join("·") + "일선 하회");
  return parts.join(" · ");
}

// ── Yahoo 일봉 조회 (종가·고가·저가·타임스탬프) ──
async function fetchSeries(symbol) {
  if (typeof fetch !== "function") return null;
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(symbol) + "?interval=1d&range=2y";
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 10000);
  let r;
  try {
    r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
  } catch (_e) { clearTimeout(to); return null; }
  clearTimeout(to);
  if (!r.ok) return null;
  let j;
  try { j = await r.json(); } catch (_e) { return null; }
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
      low: q.low && q.low[i] != null ? q.low[i] : q.close[i]
    });
  }
  if (rows.length < 30) return null;   // 계산이 무의미할 만큼 짧으면 실패 처리(폴백)
  return rows;
}

// 지수 1종목 분석 — 공유 lib-ta로 단기/장기 기술적 분석을 계산해 카드 필드와 합친다.
function analyze(cfg, rows) {
  const a = TA.analyzeTimeframes(rows, { dp: 2, srDp: 0 });
  if (!a) return null;
  return {
    key: cfg.key, name: cfg.name, flag: cfg.flag, chartUrl: cfg.chartUrl,
    level: a.level, change: a.change, changeDir: a.changeDir, period: a.period,
    short: a.short, long: a.long
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

(async () => {
  const prev = loadPrev();
  const asOf = argVal("date") || new Date().toISOString().slice(0, 10);
  let live = 0, fellBack = 0;

  const indices = [];
  for (const cfg of INDICES) {
    const rows = await fetchSeries(cfg.symbol);
    const a = rows ? analyze(cfg, rows) : null;
    if (a) {
      indices.push(a);
      live++;
    } else if (prev[cfg.key]) {
      indices.push(prev[cfg.key]);   // 이전 계산값 유지
      fellBack++;
    } else {
      // 최초 생성 시 조회 실패한 지수는 최소 골격만 남긴다(렌더가 깨지지 않도록).
      const skel = { trend: "횡보", signal: "중립", metrics: [["상태", "조회 실패 · 다음 갱신 대기"]], read: "데이터 조회 실패." };
      indices.push({
        key: cfg.key, name: cfg.name, flag: cfg.flag, chartUrl: cfg.chartUrl,
        level: "–", change: "–", changeDir: "down", period: "", short: skel, long: skel
      });
      fellBack++;
    }
  }

  const T = {
    asOf: asOf,
    note: "가격·기술적 지표는 Yahoo Finance 일봉에서 매일 자동 계산됩니다(LLM 토큰 0). 단기(1–3M: 5·20·60일선·RSI14)·장기(6–12M+: 60·120·200일선·골든크로스)로 분리, 신호는 이동평균 집계 기준.",
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
