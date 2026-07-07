#!/usr/bin/env node
// 매일 유지보수 갱신 — LLM 토큰 0 (순수 스크립트, refresh-quotes Action에서 실행)
//
// 목적: 자동 추천 Routine(LLM 세션)이 실패해도 앱이 매일 최신 날짜·스냅샷을 유지하도록,
//       기준일(generatedAt)을 오늘로 갱신하고 지수(KOSPI/S&P500)를 받아 스냅샷을 축적한다.
//       시세는 update-quotes.js(quotes.js)가, 종목별 심층 분석·발굴은 LLM Routine이 담당한다.
//
// 사용법: node scripts/daily-maintenance.js  [--date YYYY-MM-DD]

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");

function argVal(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : null;
}
const TODAY = argVal("date") || new Date().toISOString().slice(0, 10);

// 1) generatedAt 을 오늘로 갱신 (상단 top-level 필드 1개만 치환)
let src = fs.readFileSync(RECO, "utf8");
const before = src;
src = src.replace(/generatedAt:\s*"[^"]*"/, 'generatedAt: "' + TODAY + '"');
if (src !== before) fs.writeFileSync(RECO, src);

// 2) 지수(KOSPI ^KS11, S&P500 ^GSPC) 조회 — 실패 시 생략(스냅샷이 기존 지수값 보존)
async function indexPrice(sym) {
  if (typeof fetch !== "function") return null;
  try {
    const r = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=1d",
      { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } }
    );
    if (!r.ok) return null;
    const j = await r.json();
    const m = j && j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
    const p = m && m.regularMarketPrice;
    return (typeof p === "number" && isFinite(p)) ? p : null;
  } catch (_e) { return null; }
}

(async () => {
  const kospi = await indexPrice("^KS11");
  const sp500 = await indexPrice("^GSPC");
  // 3) 스냅샷 축적 (snapshot.js 가 generatedAt 기준일로 기록, 시세는 quotes.js 사용)
  const args = [path.join("scripts", "snapshot.js")];
  if (kospi != null) args.push("--kospi", String(kospi));
  if (sp500 != null) args.push("--sp500", String(sp500));
  execFileSync("node", args, { cwd: ROOT, stdio: "inherit" });
  console.log("daily-maintenance: generatedAt=" + TODAY +
    " kospi=" + (kospi == null ? "-" : kospi) + " sp500=" + (sp500 == null ? "-" : sp500));
})();
