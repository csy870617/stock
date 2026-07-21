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

async function fetchRows(symbol) {
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
  return rows.length >= 30 ? rows : null;
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
  const asOf = argVal("date") || new Date().toISOString().slice(0, 10);
  let live = 0, fellBack = 0;
  const ta = {};

  await mapLimit(stocks, 8, async (s) => {
    const rows = await fetchRows(s.symbol);
    const dp = s.market === "KOSPI" || s.market === "KOSDAQ" ? 0 : 2;   // 한국주=정수, 미국주=소수 2
    const a = rows ? TA.analyzeTimeframes(rows, { dp: dp, srDp: dp }) : null;
    if (a) { ta[s.ticker] = { short: a.short, long: a.long }; live++; }
    else if (prev[s.ticker]) { ta[s.ticker] = prev[s.ticker]; fellBack++; }
    else fellBack++;   // 최초 실패는 생략(렌더가 해당 종목 TA를 숨김)
  });

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
