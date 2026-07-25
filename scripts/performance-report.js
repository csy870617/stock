#!/usr/bin/env node
// 추천 성과 리포트 — 재평가 신뢰도를 '측정 가능'하게 만든다 (LLM 토큰 0)
//
// 역할: data/history.js 스냅샷을 기반으로
//   1) 종목별 수익률 (첫 스냅샷 편입가 → 최신 시세) vs KOSPI/S&P500 벤치마크
//   2) 주제·티어별 평균 수익률 (Tier1 이 Tier3 보다 나은가? = 확신도 검증)
//   3) 재평가 우선 대상 스크리닝: 목표가 소진(상승여력 ≤0%), 큰 폭 하락(-15% 이상)
// 을 출력한다. 매일 재평가 루틴이 판단 전에 실행해 '데이터에 근거한' 교체 후보를 얻는다.
//
// 사용법: node scripts/performance-report.js [--json]
//   --json : 기계가 읽기 좋은 JSON 으로 출력 (루틴용)

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function load(file, key) {
  const p = path.join(ROOT, "data", file);
  if (!fs.existsSync(p)) return null;
  global.window = {};
  delete require.cache[require.resolve(p)];
  require(p);
  return global.window[key];
}

const JSON_MODE = process.argv.includes("--json");

const D = load("recommendations.js", "STOCK_DATA");
const H = load("history.js", "STOCK_HISTORY") || [];
const Q = (load("quotes.js", "STOCK_QUOTES") || {}).quotes || {};
if (!D) { console.error("recommendations.js 로드 실패"); process.exit(1); }
if (!H.length) { console.error("history.js 스냅샷 없음 — 성과 측정 불가"); process.exit(1); }

// ── 종목별 기준선: 해당 종목이 처음 등장한 스냅샷의 가격 (그 날 추천을 따랐다고 가정) ──
const baseline = {};   // country:ticker → {date, price}
H.forEach((snap) => {
  (snap.stocks || []).forEach((s) => {
    const k = s.c + ":" + s.t;
    if (!baseline[k] && typeof s.p === "number" && s.p > 0) {
      baseline[k] = { date: snap.date, price: s.p, name: s.n, theme: s.th, tier: s.tier, tp: s.tp };
    }
  });
});

// ── 벤치마크: 첫 스냅샷 지수 → 최신 non-null 지수 ──
function benchReturn(key) {
  const first = H.find((h) => h[key] != null);
  const last = [...H].reverse().find((h) => h[key] != null);
  if (!first || !last || first === last) return null;
  return { from: first.date, to: last.date, pct: (last[key] - first[key]) / first[key] * 100 };
}
const benchKr = benchReturn("kospi");
const benchUs = benchReturn("sp500");

// ── 종목별 편입일에 맞춘 벤치마크(like-for-like 초과수익용) ──
// 전체구간 벤치마크와 종목별(편입시점 상이) 수익률을 나란히 비교하면 구간 불일치로 왜곡되므로,
// 각 종목의 baseline.date 이후 첫 non-null 지수 → 최신 non-null 지수로 '동일 구간' 벤치마크를 구해 초과수익을 낸다.
function indexAt(key, fromDate) {
  for (let i = 0; i < H.length; i++) { if (H[i].date >= fromDate && H[i][key] != null) return H[i][key]; }
  return null;
}
const lastKospi = H.reduce((a, h) => (h.kospi != null ? h.kospi : a), null);
const lastSp = H.reduce((a, h) => (h.sp500 != null ? h.sp500 : a), null);

// ── 현재 보유 종목의 수익률 계산 ──
const latest = H[H.length - 1];
const rows = [];
const seen = {};
["korea", "us"].forEach((c) => {
  (D[c] || []).forEach((s) => {
    const k = c + ":" + s.ticker;
    if (seen[k]) return; seen[k] = 1;         // 여러 주제 중복 → 1회만 (tier 는 baseline 기준)
    const b = baseline[k];
    const q = Q[s.ticker];
    const cur = q && typeof q.price === "number" ? q.price : s.price;
    if (!b || !(cur > 0)) return;
    const ret = (cur - b.price) / b.price * 100;
    const liveUpside = typeof s.targetPrice === "number" ? (s.targetPrice - cur) / cur * 100 : null;
    // 동일 구간(편입일~현재) 지수 대비 초과수익
    const bkey = c === "korea" ? "kospi" : "sp500";
    const fromIdx = indexAt(bkey, b.date);
    const lastIdx = c === "korea" ? lastKospi : lastSp;
    const benchPct = (fromIdx && lastIdx) ? (lastIdx - fromIdx) / fromIdx * 100 : null;
    const excess = benchPct == null ? null : +(ret - benchPct).toFixed(2);
    rows.push({ country: c, ticker: s.ticker, name: s.name, theme: b.theme, tier: b.tier,
      since: b.date, basePrice: b.price, curPrice: cur, retPct: +ret.toFixed(2), excessPct: excess,
      targetPrice: s.targetPrice, liveUpsidePct: liveUpside == null ? null : +liveUpside.toFixed(1) });
  });
});

function avg(list) { return list.length ? list.reduce((a, r) => a + r.retPct, 0) / list.length : null; }
function avgEx(list) { const v = list.filter((r) => r.excessPct != null); return v.length ? v.reduce((a, r) => a + r.excessPct, 0) / v.length : null; }
function fmt(v) { return v == null ? "  n/a" : (v >= 0 ? "+" : "") + v.toFixed(2) + "%"; }

// 그룹 통계
const byCountry = {}, byTheme = {}, byTier = {};
rows.forEach((r) => {
  (byCountry[r.country] = byCountry[r.country] || []).push(r);
  (byTheme[r.country + "/" + r.theme] = byTheme[r.country + "/" + r.theme] || []).push(r);
  (byTier[r.country + "/T" + r.tier] = byTier[r.country + "/T" + r.tier] || []).push(r);
});

// 재평가 우선 대상
const targetReached = rows.filter((r) => r.liveUpsidePct != null && r.liveUpsidePct <= 0)
  .sort((a, b) => a.liveUpsidePct - b.liveUpsidePct);
const bigLosers = rows.filter((r) => r.retPct <= -15).sort((a, b) => a.retPct - b.retPct);
const winners = [...rows].sort((a, b) => b.retPct - a.retPct).slice(0, 5);
const losers = [...rows].sort((a, b) => a.retPct - b.retPct).slice(0, 5);

// ── 티어 재검토 신호 — (주제×국가) 그룹 안에서 tier 순위가 실제 성과와 어긋나는 종목을 짚는다.
//    tier 는 '주제 그룹 안 상대 확신순위'(3/3/3)이므로 재조정도 반드시 같은 그룹 안에서 판단한다.
//    지표: 편입일 정렬 초과수익(excessPct) 우선, 없으면 원수익률(retPct). 표본이 작으면 잠정 신호.
function metricOf(r) { return r.excessPct != null ? r.excessPct : r.retPct; }
const tierReview = [];
Object.keys(byTheme).sort().forEach((gk) => {
  const g = byTheme[gk];                       // 이 (주제×국가) 그룹의 종목들
  const byT = { 1: [], 2: [], 3: [] };
  g.forEach((r) => { if (byT[r.tier]) byT[r.tier].push(r); });
  const tAvg = {};
  [1, 2, 3].forEach((t) => {
    const v = byT[t].map(metricOf).filter((x) => x != null);
    tAvg[t] = v.length ? +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(2) : null;
  });
  const promote = [], demote = [];
  // 승격 후보: 하위 tier(2·3) 종목이 같은 그룹 Tier1 평균을 능가
  if (tAvg[1] != null) g.forEach((r) => {
    const m = metricOf(r);
    if (r.tier > 1 && m != null && m > tAvg[1]) promote.push({ ticker: r.ticker, name: r.name, tier: r.tier, metric: +m.toFixed(2) });
  });
  // 강등 후보: Tier1 종목이 같은 그룹 Tier3 평균을 하회
  if (tAvg[3] != null) g.forEach((r) => {
    const m = metricOf(r);
    if (r.tier === 1 && m != null && m < tAvg[3]) demote.push({ ticker: r.ticker, name: r.name, tier: r.tier, metric: +m.toFixed(2) });
  });
  // tier 평균 역전(하위 tier 평균이 상위 tier 평균보다 높음)
  const inverted = (tAvg[1] != null && tAvg[3] != null && tAvg[3] > tAvg[1]) ||
                   (tAvg[1] != null && tAvg[2] != null && tAvg[2] > tAvg[1]);
  if (promote.length || demote.length || inverted) {
    tierReview.push({ group: gk, n: g.length, tierAvg: tAvg, inverted, promote, demote });
  }
});

const report = {
  asOf: latest.date,
  snapshotDays: H.length,
  firstSnapshot: H[0].date,
  caveat: H.length < 20 ? "스냅샷 " + H.length + "일치 — 통계적으로 유의미한 판단에는 최소 4주(20거래일) 필요" : null,
  benchmark: {
    kospi: benchKr && +benchKr.pct.toFixed(2),
    sp500: benchUs && +benchUs.pct.toFixed(2)
  },
  avgReturn: {
    korea: byCountry.korea ? +avg(byCountry.korea).toFixed(2) : null,
    us: byCountry.us ? +avg(byCountry.us).toFixed(2) : null
  },
  // 편입일 정렬 지수 대비 초과수익 — 추천 능력(시장 초과 여부)의 like-for-like 지표
  avgExcess: {
    korea: byCountry.korea && avgEx(byCountry.korea) != null ? +avgEx(byCountry.korea).toFixed(2) : null,
    us: byCountry.us && avgEx(byCountry.us) != null ? +avgEx(byCountry.us).toFixed(2) : null
  },
  perfNote: "avgReturn 은 종목별 편입시점~현재 원수익률(편입 구간이 종목마다 달라 전체구간 벤치마크와 직접 비교는 왜곡). avgExcess/byTierExcess 는 각 종목 편입일에 맞춘 지수 대비 초과수익으로 like-for-like.",
  byTier: Object.fromEntries(Object.keys(byTier).sort().map((k) => [k, +avg(byTier[k]).toFixed(2)])),
  byTierExcess: Object.fromEntries(Object.keys(byTier).sort().map((k) => [k, avgEx(byTier[k]) == null ? null : +avgEx(byTier[k]).toFixed(2)])),
  byTheme: Object.fromEntries(Object.keys(byTheme).sort().map((k) => [k, +avg(byTheme[k]).toFixed(2)])),
  // 티어 재검토 신호(그룹 내 tier↔성과 불일치) — 루틴이 매 업데이트 시 승격·강등 검토에 사용
  tierReviewNote: "각 (주제×국가) 그룹 안에서만 tier 를 재조정하고 3/3/3 을 유지한다. tier 는 중기 확신 축이므로 단일 노이즈 1회로 뒤집지 말고 논거·상승여력·기술과 함께 종합 판단한다" + (H.length < 20 ? " (표본 " + H.length + "일 — 잠정 신호)" : ""),
  tierReview,
  reevalPriority: {
    targetReached: targetReached.map((r) => ({ ticker: r.ticker, name: r.name, country: r.country, liveUpsidePct: r.liveUpsidePct })),
    bigLosers: bigLosers.map((r) => ({ ticker: r.ticker, name: r.name, country: r.country, retPct: r.retPct }))
  },
  top5: winners.map((r) => ({ ticker: r.ticker, name: r.name, retPct: r.retPct })),
  bottom5: losers.map((r) => ({ ticker: r.ticker, name: r.name, retPct: r.retPct }))
};

if (JSON_MODE) { console.log(JSON.stringify(report, null, 1)); process.exit(0); }

console.log("═══ 추천 성과 리포트 (" + report.firstSnapshot + " → " + report.asOf + ", 스냅샷 " + report.snapshotDays + "일치) ═══");
if (report.caveat) console.log("⚠ " + report.caveat);
console.log("");
console.log("벤치마크(전체구간):  KOSPI " + fmt(report.benchmark.kospi) + "   S&P500 " + fmt(report.benchmark.sp500));
console.log("추천 평균(원수익률): 한국  " + fmt(report.avgReturn.korea) + "   미국   " + fmt(report.avgReturn.us));
console.log("초과수익(편입일 정렬·지수대비): 한국  " + fmt(report.avgExcess.korea) + "   미국   " + fmt(report.avgExcess.us) + "   ← 추천 능력의 like-for-like 지표");
console.log("");
console.log("티어별 (원수익률 / 초과수익) — Tier1 > Tier3 이어야 확신도가 유효:");
Object.keys(report.byTier).forEach((k) => console.log("  " + k + ": " + fmt(report.byTier[k]) + "  /  초과 " + fmt(report.byTierExcess[k])));
console.log("");
if (tierReview.length) {
  console.log("🔁 티어 재검토 신호 (그룹 내 성과와 tier 순위 불일치 — 3/3/3 유지하며 승격·강등 검토):");
  if (H.length < 20) console.log("   ⚠ 표본 부족 — 잠정 신호, 논거·상승여력·기술과 함께 종합 판단(단일 노이즈로 뒤집지 말 것)");
  tierReview.forEach((g) => {
    console.log("  [" + g.group + "] Tier평균 T1 " + fmt(g.tierAvg[1]) + " / T2 " + fmt(g.tierAvg[2]) + " / T3 " + fmt(g.tierAvg[3]) + (g.inverted ? "  ⚠역전" : ""));
    g.promote.forEach((p) => console.log("     ↑ 승격후보 T" + p.tier + " " + p.name + " (" + p.ticker + ") " + fmt(p.metric) + " > 그룹 T1평균"));
    g.demote.forEach((p) => console.log("     ↓ 강등후보 T" + p.tier + " " + p.name + " (" + p.ticker + ") " + fmt(p.metric) + " < 그룹 T3평균"));
  });
} else console.log("🔁 티어 재검토: 그룹 내 tier↔성과 불일치 없음");
console.log("");
console.log("주제별 평균:");
Object.keys(report.byTheme).forEach((k) => console.log("  " + k + ": " + fmt(report.byTheme[k])));
console.log("");
if (targetReached.length) {
  console.log("🎯 목표가 소진 — 재평가 우선 (상승여력 ≤ 0%):");
  targetReached.forEach((r) => console.log("  - " + r.name + " (" + r.ticker + ", " + r.country + ") 여력 " + r.liveUpsidePct + "%"));
} else console.log("🎯 목표가 소진 종목 없음");
if (bigLosers.length) {
  console.log("📉 -15% 이상 하락 — 논거 재점검 대상:");
  bigLosers.forEach((r) => console.log("  - " + r.name + " (" + r.ticker + ", " + r.country + ") " + fmt(r.retPct)));
} else console.log("📉 -15% 이상 하락 종목 없음");
console.log("");
console.log("상위 5: " + winners.map((r) => r.name + " " + fmt(r.retPct)).join(", "));
console.log("하위 5: " + losers.map((r) => r.name + " " + fmt(r.retPct)).join(", "));
