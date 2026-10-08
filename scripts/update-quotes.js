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
// 시세 1건 조회(현재가 + 마지막으로 끝난 정규장 종가) — daily-maintenance 와 공용.
// 7일 넘은 시세(거래정지·상장폐지 심볼)는 lib-quote 가 'stale quote' 로 거부해 폴백시킨다.
const { yahooQuote } = require("./lib-quote");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");
const QUOTES = path.join(ROOT, "data", "quotes.js");
// 성과 기준 지수 — 스냅샷(history.js)이 종목 종가와 '같은 조회'의 지수 종가를 쓰도록 함께 받는다
const INDEX_SYMBOLS = { kospi: "^KS11", sp500: "^GSPC", rsp: "RSP" };

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
let prev = {}, prevIdx = {};
if (fs.existsSync(QUOTES)) {
  try { const pq = loadGlobalScript(QUOTES, "STOCK_QUOTES") || {}; prev = pq.quotes || {}; prevIdx = pq.indices || {}; }
  catch (_e) { prev = {}; prevIdx = {}; }
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

// 시세 1건 — 가드(7일 넘은 시세 거부)·등락률(직전 거래일 종가 대비)·끝난 장 종가는 lib-quote 가 처리한다.
//   price/date   : 화면용 현재가(장중이면 장중가) — 앱 표시·상승여력 계산
//   close/closeDate: 마지막으로 끝난 정규장 종가 — 스냅샷(history.js) 성과 기록 전용
function oneQuote(symbol) { return yahooQuote(symbol); }

// 저장 형태 — close 가 있으면 함께 남긴다(장중 조회면 전 거래일 종가)
function entryOf(q) {
  const e = { price: q.price, date: q.date, changePct: q.changePct };
  if (typeof q.close === "number" && isFinite(q.close) && q.closeDate) { e.close = q.close; e.closeDate = q.closeDate; }
  return e;
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
      // 야후 간헐 429/5xx 대비 지수 백오프 3회 재시도(screen-watch.js 와 동일).
      // 'stale quote'(거래정지 심볼)는 재시도해도 같은 결과라 즉시 폴백한다.
      for (let att = 0; att < 3; att++) {
        try {
          const q = await oneQuote(t.symbol);
          if (q && q.price != null) return { t, q, ok: true };
          break;
        } catch (e) {
          if (String(e && e.message).indexOf("stale quote") === 0) break;
          if (att < 2) await new Promise((r) => setTimeout(r, 400 * Math.pow(2, att)));
        }
      }
    }
    return { t, q: null, ok: false };
  });

  results.forEach(({ t, q, ok }) => {
    if (ok) {
      quotes[t.ticker] = entryOf(q);
      live++;
    } else if (prev[t.ticker] && prev[t.ticker].price != null) {
      // 이전 시세 유지 — 단 changePct 는 '그날' 등락률이라 구식 값을 넘기면
      // 앱 배지가 이틀 전 등락률을 오늘 것처럼 표시하므로 null 로 지운다(앱은 null 이면 숨김).
      const pq = prev[t.ticker];
      quotes[t.ticker] = { price: pq.price, date: pq.date || null, changePct: null };
      if (pq.close != null && pq.closeDate) { quotes[t.ticker].close = pq.close; quotes[t.ticker].closeDate = pq.closeDate; }
      fellBack++;
    } else if (t.baked.price != null) {
      quotes[t.ticker] = { price: t.baked.price, date: t.baked.date || null };  // 종가 seed
      fellBack++;
    }
  });

  // 성과 기준 지수 — 같은 조회 시점의 종가를 스냅샷이 종목 종가와 짝지어 쓴다. 실패하면 이전 값 유지.
  const indices = {};
  for (const [k, sym] of Object.entries(INDEX_SYMBOLS)) {
    let q = null;
    if (canFetch) {
      for (let att = 0; att < 3 && !q; att++) {
        try { q = await oneQuote(sym); } catch (_e) { if (att < 2) await new Promise((r) => setTimeout(r, 400 * Math.pow(2, att))); }
      }
    }
    if (q) indices[k] = Object.assign({ symbol: sym }, entryOf(q));
    else if (prevIdx[k]) indices[k] = Object.assign({}, prevIdx[k], { changePct: null });
  }

  const generatedAt = argVal("date") || new Date().toISOString().slice(0, 10);
  const body =
    "// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)\n" +
    "// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.\n" +
    "// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)\n" +
    "// 각 항목: ticker → { price, date, changePct, close, closeDate }\n" +
    "//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)\n" +
    "// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록\n" +
    "window.STOCK_QUOTES = " +
    JSON.stringify({ generatedAt, quotes, indices }, null, 1) + ";\n";
  fs.writeFileSync(QUOTES, body);

  console.log("quotes.js 갱신: " + Object.keys(quotes).length + "종목 (" +
    generatedAt + ") — 실시간 " + live + " · 폴백 " + fellBack +
    " · 지수 " + Object.keys(indices).map((k) => k + "=" + (indices[k].close != null ? indices[k].close + "(" + indices[k].closeDate + ")" : indices[k].price)).join(" ") +
    (SEED_ONLY ? " [seed 모드]" : ""));
})();
