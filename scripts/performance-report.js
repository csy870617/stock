#!/usr/bin/env node
// 추천 성과 리포트 — 재평가 신뢰도를 '측정 가능'하게 만든다 (LLM 토큰 0)
//
// 역할: data/history.js 스냅샷을 기반으로
//   1) 종목별 수익률 (첫 스냅샷 편입가 → 최신 시세) vs KOSPI/S&P500 벤치마크
//   2) 주제·티어별 평균 수익률 (Tier1 이 Tier3 보다 나은가? = 품질 tier 가 성과로 뒷받침되는지 참고 점검 — tier 는 성과로 바꾸지 않음)
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
// 현재 tier(여러 주제 중복 시 최고 확신 = 최소값) — tierReview 는 '지금의 품질 배정'이
// 성과로 뒷받침되는지 보는 점검이므로, 편입 당시(baseline) tier 가 아니라 현재 tier 로 대조한다.
// (baseline tier 를 쓰면 그 사이 승격·강등된 종목의 정합 신호가 과거 배정 기준으로 왜곡된다.)
const curTier = {};
["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
  if (typeof s.tier !== "number") return;   // watch 등 tier 없는 항목은 제외(baseline 폴백)
  const k = c + ":" + s.ticker;
  if (curTier[k] == null || s.tier < curTier[k]) curTier[k] = s.tier;
}));
// 액면분할·심볼 데이터 단절 의심 — 인접 스냅샷 가격이 하루 만에 ±45% 넘게 점프한 종목.
// 분할 미조정 가격으로 수익률을 재면 즉시 -90% 같은 값이 나와 bigLosers·tierReview 를
// 최장 90일(보존 창) 동안 오염시키므로, 의심 종목은 통계에서 빼고 따로 보고한다(감사).
const splitSuspect = {};
{
  const series = {};   // country:ticker → [{d,p}]
  H.forEach((snap) => (snap.stocks || []).forEach((s) => {
    if (typeof s.p === "number" && s.p > 0) (series[s.c + ":" + s.t] = series[s.c + ":" + s.t] || []).push(s.p);
  }));
  Object.keys(series).forEach((k) => {
    const a = series[k];
    for (let i = 1; i < a.length; i++) {
      const r = a[i] / a[i - 1];
      if (r > 1.45 || r < 0.55) { splitSuspect[k] = +((r - 1) * 100).toFixed(1); break; }
    }
  });
}
const rows = [];
const seen = {};
["korea", "us"].forEach((c) => {
  (D[c] || []).forEach((s) => {
    const k = c + ":" + s.ticker;
    if (seen[k]) return; seen[k] = 1;         // 여러 주제 중복 → 1회만
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
    rows.push({ country: c, ticker: s.ticker, name: s.name, theme: b.theme,
      suspect: splitSuspect[k] != null ? splitSuspect[k] : null,
      tier: curTier[k] != null ? curTier[k] : b.tier,
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
  // 개인 목록(관심·보유) 카드는 tier 가 없다 — 'korea/Tundefined' 같은 무의미한 그룹이
  // 통계에 섞여 루틴이 티어 성과로 오독하지 않게 tier 있는 행만 집계한다(감사).
  if (typeof r.tier === "number") (byTier[r.country + "/T" + r.tier] = byTier[r.country + "/T" + r.tier] || []).push(r);
});

// 재평가 우선 대상
const targetReached = rows.filter((r) => r.liveUpsidePct != null && r.liveUpsidePct <= 0)
  .sort((a, b) => a.liveUpsidePct - b.liveUpsidePct);
const bigLosers = rows.filter((r) => r.retPct <= -15 && r.suspect == null).sort((a, b) => a.retPct - b.retPct);
const winners = [...rows].sort((a, b) => b.retPct - a.retPct).slice(0, 5);
const losers = [...rows].sort((a, b) => a.retPct - b.retPct).slice(0, 5);

// ── 티어(품질)↔성과 정합 점검 [참고] — tier 는 '기업 질' 기준으로 배정하므로, 성과가 tier 를
//    직접 바꾸지 않는다. 이 신호는 각 (주제×국가) 그룹에서 품질 tier 와 실제 성과가 어긋나는
//    종목을 짚어 '품질 판단이 맞는지 되돌아보게' 하는 참고용일 뿐(자동 승격·강등 아님).
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
  const perfAheadOfTier = [], perfBehindTier = [];
  // 성과가 tier(품질)보다 앞섬: 하위 tier(2·3) 종목이 같은 그룹 Tier1 평균 성과를 능가 → 품질 상향 여지 점검
  if (tAvg[1] != null) g.forEach((r) => {
    const m = metricOf(r);
    if (r.tier > 1 && m != null && m > tAvg[1]) perfAheadOfTier.push({ ticker: r.ticker, name: r.name, tier: r.tier, metric: +m.toFixed(2) });
  });
  // 성과가 tier(품질)보다 뒤짐: Tier1 종목이 같은 그룹 Tier3 평균 성과를 하회 → 품질 근거 재확인
  if (tAvg[3] != null) g.forEach((r) => {
    const m = metricOf(r);
    if (r.tier === 1 && m != null && m < tAvg[3]) perfBehindTier.push({ ticker: r.ticker, name: r.name, tier: r.tier, metric: +m.toFixed(2) });
  });
  // tier 평균 역전(하위 tier 평균 성과가 상위 tier 평균보다 높음)
  const inverted = (tAvg[1] != null && tAvg[3] != null && tAvg[3] > tAvg[1]) ||
                   (tAvg[1] != null && tAvg[2] != null && tAvg[2] > tAvg[1]);
  if (perfAheadOfTier.length || perfBehindTier.length || inverted) {
    tierReview.push({ group: gk, n: g.length, tierAvg: tAvg, inverted, perfAheadOfTier, perfBehindTier });
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
  // 티어(품질)↔성과 정합 점검 [참고] — tier 는 '기업 질' 기준으로 배정하므로 성과로 직접 바꾸지 않는다.
  // 이 신호는 품질 판단이 맞는지 되돌아보는 참고용: 성과가 tier 를 앞서면 품질 상향 여지를, 뒤지면 품질 근거를 재검토.
  tierReviewNote: "tier 는 기업 질(재무·수익성·해자·성장·주주환원·밸류·논거) 기준으로 배정한다. 이 점검은 참고 신호일 뿐 성과로 tier 를 자동 조정하지 않는다 — 성과가 tier 를 지속적으로 앞서면 품질 근거를 다시 보고(상향 여지), 뒤지면 품질 판단을 재확인한다" + (H.length < 20 ? " (표본 " + H.length + "일 — 잠정 신호)" : ""),
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
console.log("티어별 (원수익률 / 초과수익) — 품질 tier 가 성과로 뒷받침되는지 참고 점검(Tier1>Tier3 이면 정합, tier 는 성과로 바꾸지 않음):");
Object.keys(report.byTier).forEach((k) => console.log("  " + k + ": " + fmt(report.byTier[k]) + "  /  초과 " + fmt(report.byTierExcess[k])));
console.log("");
if (tierReview.length) {
  console.log("🔎 티어(품질)↔성과 정합 점검 [참고] — tier 는 '기업 질'로 배정, 성과로 바꾸지 말 것. 품질 판단 재검토 신호:");
  if (H.length < 20) console.log("   ⚠ 표본 부족 — 잠정 신호(성과 노이즈), 품질 축으로만 tier 판단");
  tierReview.forEach((g) => {
    console.log("  [" + g.group + "] Tier평균성과 T1 " + fmt(g.tierAvg[1]) + " / T2 " + fmt(g.tierAvg[2]) + " / T3 " + fmt(g.tierAvg[3]) + (g.inverted ? "  ⚠역전" : ""));
    g.perfAheadOfTier.forEach((p) => console.log("     · 성과>tier T" + p.tier + " " + p.name + " (" + p.ticker + ") " + fmt(p.metric) + " > 그룹 T1평균 → 품질 상향 여지 점검"));
    g.perfBehindTier.forEach((p) => console.log("     · 성과<tier T" + p.tier + " " + p.name + " (" + p.ticker + ") " + fmt(p.metric) + " < 그룹 T3평균 → 품질 근거 재확인"));
  });
} else console.log("🔎 티어↔성과 정합 점검: 불일치 없음");
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
