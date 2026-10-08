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
//    generatedAtTs(정확한 갱신 시각, ISO)도 함께 기록 — 날짜만으로는 한국(KST) 달력일을
//    알 수 없어(21:00 UTC 실행이면 한국은 이미 다음날) 앱의 '기준일 (한국 …)' 병기가 이를 쓴다.
const NOW_TS = new Date().toISOString().slice(0, 19) + "Z";
let src = fs.readFileSync(RECO, "utf8");
const before = src;
src = src.replace(/generatedAt:\s*"[^"]*"/, 'generatedAt: "' + TODAY + '"');
if (/generatedAtTs:\s*"[^"]*"/.test(src)) {
  src = src.replace(/generatedAtTs:\s*"[^"]*"/, 'generatedAtTs: "' + NOW_TS + '"');
} else {
  src = src.replace(/(generatedAt:\s*"[^"]*",)/, '$1\n  generatedAtTs: "' + NOW_TS + '",');
}
if (src !== before) fs.writeFileSync(RECO, src);

// 2) 지수(KOSPI ^KS11, S&P500 ^GSPC, 동일비중 S&P500 RSP) — 스냅샷의 성과 기준선.
//    종목 가격과 '같은 조회'여야 짝이 맞으므로 기본은 quotes.js 의 지수 종가(update-quotes 가 직전 단계에서 함께 받음)를
//    snapshot.js 가 직접 읽는다. quotes.js 에 지수가 없을 때(옛 형식·조회 전부 실패)만 여기서 받아 인자로 넘긴다.
//    ★ regularMarketPrice 를 그대로 쓰면 안 된다: 예약 실행이 지연돼 장중(한국 00~06시·미국 13~20시 UTC)에 돌면
//      장중 지수가 기록된다(2026-10-08 KOSPI 6,763 기록 vs 종가 6,626). lib-quote 의 close 는 끝난 장의 종가다.
const { yahooQuote } = require("./lib-quote");
function quotesIndices() {
  try {
    global.window = {};
    const f = path.join(ROOT, "data", "quotes.js");
    delete require.cache[require.resolve(f)];
    require(f);
    return (global.window.STOCK_QUOTES || {}).indices || {};
  } catch (_e) { return {}; }
}
async function indexClose(sym) {
  if (typeof fetch !== "function") return null;
  try { const q = await yahooQuote(sym); return q.close != null ? q.close : null; }
  catch (_e) { return null; }   // 실패 시 snapshot 이 기존 지수값을 보존
}

(async () => {
  const QI = quotesIndices();
  const SYM = { kospi: "^KS11", sp500: "^GSPC", rsp: "RSP" };
  const args = [path.join("scripts", "snapshot.js")];
  const shown = {};
  for (const k of Object.keys(SYM)) {
    const q = QI[k];
    if (q && (q.close != null || q.price != null)) { shown[k] = (q.close != null ? q.close : q.price) + "(quotes.js)"; continue; }
    const v = await indexClose(SYM[k]);
    if (v != null) { args.push("--" + k, String(v)); shown[k] = v + "(직접 조회)"; }
    else shown[k] = "-";
  }
  // 3) 스냅샷 축적 (snapshot.js 가 generatedAt 기준일로 기록, 시세·지수는 quotes.js 종가 사용)
  execFileSync("node", args, { cwd: ROOT, stdio: "inherit" });
  console.log("daily-maintenance: generatedAt=" + TODAY +
    " kospi=" + shown.kospi + " sp500=" + shown.sp500 + " rsp=" + shown.rsp);
})();
