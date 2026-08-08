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
  if (i < 0 || !process.argv[i + 1]) return null;
  // 쉼표 포함 값("8,088.34")도 안전하게 파싱하고, 숫자가 아니면 null 로 정규화
  const v = parseFloat(String(process.argv[i + 1]).replace(/,/g, ""));
  return isNaN(v) ? null : v;
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

// 시세는 data/quotes.js(매일 갱신되는 실제 시세)를 우선 사용한다.
// recommendations.js 의 price 는 quotes.js 미보유 종목용 폴백일 뿐이므로,
// 성과 히스토리도 quotes.js 값으로 기록해야 정확하다.
const QUOTES = path.join(ROOT, "data", "quotes.js");
let quotes = {};
if (fs.existsSync(QUOTES)) {
  try { require(QUOTES); quotes = (global.window.STOCK_QUOTES || {}).quotes || {}; }
  catch (_e) { quotes = {}; }
}
function priceOf(s) {
  const q = quotes[s.ticker];
  return (q && typeof q.price === "number") ? q.price : s.price;
}
function priceDateOf(s) {
  const q = quotes[s.ticker];
  return (q && q.date) ? q.date : s.priceDate;
}

// (국가,티커) 중복 제거 — tier 최소(=확신 최고) 항목 우선
const seen = {};
["korea", "us"].forEach((c) => {
  (D[c] || []).forEach((s) => {
    const key = c + ":" + s.ticker;
    if (!seen[key] || s.tier < seen[key].tier) {
      seen[key] = { t: s.ticker, n: s.name, c, th: s.theme, tier: s.tier,
                    p: priceOf(s), pd: priceDateOf(s), tp: s.targetPrice,
                    // 그날의 단기·중기·장기 신호 등급 — 앱의 '기준일 선택'이 과거 편성을 보여줄 때 쓴다.
                    // 문구(techNote.short/mid/long)는 용량이 커 저장하지 않고 등급만 남긴다.
                    ss: (s.techNote && s.techNote.sigShort) || null,
                    sm: (s.techNote && s.techNote.sigMid) || null,
                    sl: (s.techNote && s.techNote.sigLong) || null };
    }
  });
});

// 그날의 요약 분석 — 앱 '기준일 선택'이 과거를 되짚을 때 최소한의 맥락을 준다.
// 분석 문구 전량(techNote·valueNote·thesis)은 하루 15KB+ 라 저장하지 않는다(파일 비대화).
// 여기 담는 것은 문서 단위 소량 필드뿐이다(하루 약 1KB).
let LQ = null;
try {
  global.window = {};
  require(path.join(ROOT, "data/liquidity.js"));
  LQ = global.window.LIQUIDITY_DATA || null;
} catch (_e) { LQ = null; }

const pickTickers = (arr) => (Array.isArray(arr) ? arr.map((x) => x.ticker).filter(Boolean) : []);

const snap = {
  date: D.generatedAt,
  kospi: arg("kospi"),
  sp500: arg("sp500"),
  note: D.marketNote || null,
  noteUS: D.marketNoteUS || null,
  noteKR: D.marketNoteKR || null,
  liq: LQ ? { us: (LQ.us && LQ.us.shortTerm) || null, korea: (LQ.korea && LQ.korea.shortTerm) || null,
             headline: LQ.headline || null } : null,
  picks: D.topPicks ? { korea: pickTickers(D.topPicks.korea), us: pickTickers(D.topPicks.us) } : null,
  stocks: Object.values(seen)
};

// 가드: 스냅샷 날짜는 generatedAt 인데 가격은 '오늘' quotes.js 값이다.
// generatedAt 이 과거인 채 실행하면 과거 날짜 스냅샷을 오늘 가격으로 덮어써
// 성과 기준선이 오염되므로, 날짜가 어긋나면 기록을 건너뛴다(--force 로 강행 가능).
const TODAY = new Date().toISOString().slice(0, 10);   // UTC 달력일 — generatedAt 과 동일 기준
const FORCE = process.argv.includes("--force");
if (snap.date !== TODAY && !FORCE) {
  console.warn("스냅샷 건너뜀: generatedAt(" + snap.date + ") ≠ 오늘(" + TODAY + ") — " +
    "과거 날짜 스냅샷을 오늘 시세로 덮어쓰지 않습니다. 강행하려면 --force.");
  process.exit(0);
}

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

// 히스토리 상한 — 최근 90일치만 보존한다(2026-07-31 개정: 365 → 90).
//
// 왜 줄였나: history.js 는 앱이 매 로드마다 통째로 받는 파일이다. 한 스냅샷이 약 18KB
// (110종목 편성 + 요약 분석)라 365일이면 6.5MB 까지 커져 로딩이 눈에 띄게 느려진다.
// 90일이면 약 1.6MB 로 억제된다.
//
// ★ 대가: 성과(perf)의 '추천시점 대비'는 보존된 스냅샷 중 그 종목이 **처음 등장한 날**을
// 기준선으로 쓴다(computePerf). 따라서 90일보다 오래 보유한 종목도 수익률이 최대 90일
// 구간으로만 측정된다 — 장기 보유 종목의 실제 누적 성과보다 짧게 보인다는 뜻이다.
// 더 긴 성과 구간이 필요해지면 이 값을 늘리되 파일 크기를 함께 고려할 것.
const RETAIN_DAYS = 90;
if (history.length) {
  const latest = new Date(history[history.length - 1].date);
  latest.setUTCDate(latest.getUTCDate() - RETAIN_DAYS);
  const cutoff = latest.toISOString().slice(0, 10);
  history = history.filter((h) => h.date >= cutoff);
}

const out = "// 일별 추천 스냅샷 히스토리 — scripts/snapshot.js 가 자동 생성/추가\n" +
  "// 각 항목: {date, kospi, sp500, note·noteUS·noteKR 시황, liq 유동성{us,korea,headline}, picks Top Pick{korea[],us[]},\n" +
  "//           stocks:[{t 티커, n 이름, c 국가, th 주제, tier, p 가격, pd 가격기준일, tp 목표가, ss 단기신호, sl 장기신호}]}\n" +
  "window.STOCK_HISTORY = " + JSON.stringify(history, null, 1) + ";\n";
fs.writeFileSync(HIST, out);
console.log("스냅샷 저장: " + snap.date + " (" + snap.stocks.length + "종목, KOSPI " +
  (snap.kospi ?? "–") + ", S&P500 " + (snap.sp500 ?? "–") + ") / 총 " + history.length + "일치 기록");
