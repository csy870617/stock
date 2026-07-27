#!/usr/bin/env node
// 개별 종목 기술적 분석 자동 갱신 — LLM 토큰 0 (순수 스크립트, refresh-quotes Action에서 실행)
//
// 역할: recommendations.js의 전 종목에 대해 Yahoo 2년 일봉을 받아 단기(1–3M)·장기(6–12M+)
//       기술적 분석(RSI·이동평균·추세·지지/저항·신호)을 공유 lib-ta로 계산해 data/stock-ta.js로 저장.
//       가격·지표 모두 결정론적 계산이므로 시세(quotes.js)·지수(indices.js)와 함께 매일 자동 갱신된다.
//
// 사용법: node scripts/update-stock-ta.js  [--date YYYY-MM-DD]
// 조회 실패 종목은 이전 stock-ta.js 값으로 폴백한다.

const fs = require("fs");
const path = require("path");
const TA = require("./lib-ta.js");

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
  let r;
  try {
    r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(symbol) +
      "?interval=1d&range=2y", { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
  } catch (_e) { clearTimeout(to); return null; }
  clearTimeout(to);
  if (!r.ok) return null;
  let j; try { j = await r.json(); } catch (_e) { return null; }
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  if (!res || !res.indicators || !res.indicators.quote || !res.indicators.quote[0]) return null;
  const q = res.indicators.quote[0], ts = res.timestamp || [], rows = [];
  for (let i = 0; i < (q.close || []).length; i++) {
    if (q.close[i] == null) continue;
    rows.push({ t: ts[i], close: q.close[i],
      high: q.high && q.high[i] != null ? q.high[i] : q.close[i],
      low: q.low && q.low[i] != null ? q.low[i] : q.close[i] });
  }
  if (rows.length < 30) return null;
  // 마지막 봉의 거래소 현지 날짜 = 실제 최신 거래일. 주말·휴장일에 돌려도 실행일이 아닌
  // 이 날짜가 asOf 가 돼야 techNote.asOf 비교에서 전 종목이 '구식'으로 오판되지 않는다.
  const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000;
  const lastT = rows[rows.length - 1].t;
  rows.lastDate = lastT ? new Date(lastT * 1000 + off).toISOString().slice(0, 10) : null;
  return rows;
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
  let live = 0, fellBack = 0, lastBar = null;
  const ta = {};

  await mapLimit(stocks, 8, async (s) => {
    const rows = await fetchRows(s.symbol);
    const dp = s.market === "KOSPI" || s.market === "KOSDAQ" ? 0 : 2;   // 한국주=정수, 미국주=소수 2
    const a = rows ? TA.analyzeTimeframes(rows, { dp: dp, srDp: dp }) : null;
    if (a) {
      ta[s.ticker] = { short: a.short, long: a.long }; live++;
      if (rows.lastDate && (!lastBar || rows.lastDate > lastBar)) lastBar = rows.lastDate;
    }
    else if (prev[s.ticker]) { ta[s.ticker] = prev[s.ticker]; fellBack++; }
    else fellBack++;   // 최초 실패는 생략(렌더가 해당 종목 TA를 숨김)
  });

  // 폴백만 남은 경우(전 종목 조회 실패)엔 이전 asOf 를 유지해 신선도 오판을 막는다.
  const asOf = argVal("date") || lastBar || loadPrevAsOf() || new Date().toISOString().slice(0, 10);

  const T = {
    asOf: asOf,
    note: "개별 종목 기술적 분석 — 이동평균(SMA·EMA)+오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀) 종합 투표. 단기(1–3M)는 일봉, 장기(6–12M+)는 주봉 기준. Yahoo 2년 일봉에서 매일 자동 계산(LLM 토큰 0).",
    ta: ta
  };
  const body =
    "// 개별 종목 기술적 분석 스냅샷 — scripts/update-stock-ta.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)\n" +
    "// ticker → { short:{trend,signal,metrics,read}, long:{...} }. 단기/장기 분리.\n" +
    "window.STOCK_TA = " + JSON.stringify(T) + ";\n";
  fs.writeFileSync(OUT, body);

  console.log("stock-ta.js 갱신: " + Object.keys(ta).length + "/" + stocks.length +
    "종목 (" + asOf + ") — 실시간 " + live + " · 폴백 " + fellBack);
})();
