#!/usr/bin/env node
// 일별 스냅샷 축적 스크립트
// 사용법: node scripts/snapshot.js --kospi 8088.34 --sp500 7483.24
// data/recommendations.js 의 현재 데이터를 data/history.js 에 스냅샷으로 추가한다.
// 같은 날짜(generatedAt)의 스냅샷이 이미 있으면 교체한다(멱등).
// 스냅샷은 (국가,티커) 기준으로 중복 제거하며, 여러 주제에 등장하면 가장 높은 확신(tier 최소값) 항목을 기록한다.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");
const HIST = path.join(ROOT, "data", "history.js");

function arg(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] ? parseFloat(process.argv[i + 1]) : null;
}

global.window = {};
require(RECO);
const D = global.window.STOCK_DATA;
if (!D || !D.generatedAt) { console.error("recommendations.js 로드 실패"); process.exit(1); }

let history = [];
if (fs.existsSync(HIST)) {
  require(HIST);
  history = global.window.STOCK_HISTORY || [];
}

// (국가,티커) 중복 제거 — tier 최소(=확신 최고) 항목 우선
const seen = {};
["korea", "us"].forEach((c) => {
  (D[c] || []).forEach((s) => {
    const key = c + ":" + s.ticker;
    if (!seen[key] || s.tier < seen[key].tier) {
      seen[key] = { t: s.ticker, n: s.name, c, th: s.theme, tier: s.tier,
                    p: s.price, pd: s.priceDate, tp: s.targetPrice };
    }
  });
});

const snap = {
  date: D.generatedAt,
  kospi: arg("kospi"),
  sp500: arg("sp500"),
  stocks: Object.values(seen)
};

// 같은 날짜가 있으면 교체하되, 기존에 지수값이 있고 새 값이 null이면 기존 값 보존
const idx = history.findIndex((h) => h.date === snap.date);
if (idx >= 0) {
  if (snap.kospi == null && history[idx].kospi != null) snap.kospi = history[idx].kospi;
  if (snap.sp500 == null && history[idx].sp500 != null) snap.sp500 = history[idx].sp500;
  history[idx] = snap;
} else {
  history.push(snap);
}
history.sort((a, b) => a.date.localeCompare(b.date));

const out = "// 일별 추천 스냅샷 히스토리 — scripts/snapshot.js 가 자동 생성/추가\n" +
  "// 각 항목: {date, kospi, sp500, stocks:[{t 티커, n 이름, c 국가, th 주제, tier, p 가격, pd 가격기준일, tp 목표가}]}\n" +
  "window.STOCK_HISTORY = " + JSON.stringify(history, null, 1) + ";\n";
fs.writeFileSync(HIST, out);
console.log("스냅샷 저장: " + snap.date + " (" + snap.stocks.length + "종목, KOSPI " +
  (snap.kospi ?? "–") + ", S&P500 " + (snap.sp500 ?? "–") + ") / 총 " + history.length + "일치 기록");
