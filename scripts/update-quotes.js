#!/usr/bin/env node
// 시세 갱신 스크립트 — LLM 토큰 0 (순수 스크립트)
//
// 역할: data/recommendations.js 에 있는 모든 종목의 티커를 읽어, Yahoo Finance 에서
//       현재가를 받아 data/quotes.js(window.STOCK_QUOTES) 로 저장한다.
//       분석(thesis·risks 등)이 담긴 recommendations.js 는 건드리지 않으므로,
//       "매일 시세만 갱신"을 LLM 없이 저비용으로 처리할 수 있다.
//
// 사용법:
//   node scripts/update-quotes.js               # Yahoo 조회 후 quotes.js 갱신
//   node scripts/update-quotes.js --date 2026-07-06   # generatedAt 강제 지정
//   node scripts/update-quotes.js --seed        # 네트워크 없이 recommendations.js 종가로 seed
//
// 조회 실패한 종목은 기존 quotes.js 값 → recommendations.js 종가 순으로 폴백하므로
// 결과 파일은 항상 전체 종목이 채워진 상태로 유지된다.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");
const QUOTES = path.join(ROOT, "data", "quotes.js");

function argVal(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--")
    ? process.argv[i + 1] : null;
}
const SEED_ONLY = process.argv.includes("--seed");

function loadGlobalScript(file, key) {
  global.window = {};
  delete require.cache[require.resolve(file)];
  require(file);
  return global.window[key];
}

// ── recommendations.js 로드 ──
const D = loadGlobalScript(RECO, "STOCK_DATA");
if (!D || (!Array.isArray(D.korea) && !Array.isArray(D.us))) {
  console.error("recommendations.js 로드 실패");
  process.exit(1);
}

// ── 기존 quotes.js 로드(폴백용) ──
let prev = {};
if (fs.existsSync(QUOTES)) {
  try { prev = (loadGlobalScript(QUOTES, "STOCK_QUOTES") || {}).quotes || {}; }
  catch (_e) { prev = {}; }
}

// Yahoo 심볼 규칙 — index.html 의 symbolFor 와 동일하게 유지
function symbolFor(s) {
  if (s.market === "KOSPI") return s.ticker + ".KS";
  if (s.market === "KOSDAQ") return s.ticker + ".KQ";
  return s.ticker === "BRK.B" ? "BRK-B" : s.ticker;
}

// (ticker 중복 제거) 조회 대상 수집 — baked 종가를 폴백값으로 함께 보관
const targets = [];
const seen = {};
["korea", "us"].forEach((c) => {
  (D[c] || []).forEach((s) => {
    if (!s || !s.ticker || seen[s.ticker]) return;
    seen[s.ticker] = 1;
    targets.push({ ticker: s.ticker, symbol: symbolFor(s), baked: { price: s.price, date: s.priceDate } });
  });
});

async function oneQuote(symbol) {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(symbol) + "?interval=1d&range=1d";
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
  if (!r.ok) throw new Error("HTTP " + r.status);
  const j = await r.json();
  const m = j && j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
  if (!m || typeof m.regularMarketPrice !== "number" || !isFinite(m.regularMarketPrice)) {
    throw new Error("no price");
  }
  let date = null;
  if (m.regularMarketTime) {
    const off = (m.gmtoffset || 0) * 1000;               // 거래소 현지시각 기준 날짜
    date = new Date(m.regularMarketTime * 1000 + off).toISOString().slice(0, 10);
  }
  return { price: m.regularMarketPrice, date };
}

// 동시 요청 수 제한(야후 부하·차단 방지)
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

(async () => {
  const quotes = {};
  let live = 0, fellBack = 0;

  const canFetch = !SEED_ONLY && typeof fetch === "function";
  const results = await mapLimit(targets, 8, async (t) => {
    if (canFetch) {
      try {
        const q = await oneQuote(t.symbol);
        if (q && q.price != null) return { t, q, ok: true };
      } catch (_e) { /* 폴백으로 진행 */ }
    }
    return { t, q: null, ok: false };
  });

  results.forEach(({ t, q, ok }) => {
    if (ok) {
      quotes[t.ticker] = { price: q.price, date: q.date };
      live++;
    } else if (prev[t.ticker] && prev[t.ticker].price != null) {
      quotes[t.ticker] = prev[t.ticker];   // 이전 시세 유지
      fellBack++;
    } else if (t.baked.price != null) {
      quotes[t.ticker] = { price: t.baked.price, date: t.baked.date || null };  // 종가 seed
      fellBack++;
    }
  });

  const generatedAt = argVal("date") || new Date().toISOString().slice(0, 10);
  const body =
    "// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)\n" +
    "// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.\n" +
    "// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)\n" +
    "// 각 항목: ticker → { price, date }\n" +
    "window.STOCK_QUOTES = " +
    JSON.stringify({ generatedAt, quotes }, null, 1) + ";\n";
  fs.writeFileSync(QUOTES, body);

  console.log("quotes.js 갱신: " + Object.keys(quotes).length + "종목 (" +
    generatedAt + ") — 실시간 " + live + " · 폴백 " + fellBack +
    (SEED_ONLY ? " [seed 모드]" : ""));
})();
