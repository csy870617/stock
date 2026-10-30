#!/usr/bin/env node
// Top Pick 순위 — 건강 관문 + 상승 가능성 점수(scripts/lib-picks.js, 2026-10-27~)로 나라별 정식 추천 종목을 줄 세운다(토큰 0).
//   사용: node scripts/pick-score.js           — 순위·제외 사유를 보인다(세션이 topPicks 를 쓸 때 ★ Top Pick 1~3 을 그대로 쓴다 — 미국은 업종마다 한 종목)
//         node scripts/pick-score.js --emit    — data/pick-scores.js 도 쓴다(앱 Top Pick 자동 선정·기준 표시, Action 매일)
//         node scripts/pick-score.js --json    — 결과를 JSON 으로
const fs = require("fs");
const path = require("path");
const LP = require("./lib-picks");

const DATA = path.join(__dirname, "..", "data");
const OUT = path.join(DATA, "pick-scores.js");
function load(file, key) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  const w = {};
  try { new Function("window", fs.readFileSync(p, "utf8"))(w); } catch (_e) { return null; }
  return w[key] || null;
}

const D = load("recommendations.js", "STOCK_DATA");
if (!D) { console.error("pick-score: recommendations.js 를 읽지 못함"); process.exit(1); }
const TA = load("stock-ta.js", "STOCK_TA") || {};
const DC = load("discovery-candidates.js", "DISCOVERY_CANDIDATES");
const RVD = load("revisions.js", "STOCK_REVISIONS");
const R = LP.rankPicks({ D, TA, EV: (load("events.js", "STOCK_EVENTS") || {}).items || {}, CA: load("candidates.js", "CANDIDATES") || { groups: {} }, DC,
  FU: (load("fundamentals.js", "STOCK_FUND") || {}).items || {}, RV: (RVD && RVD.items) || {} });

if (process.argv.includes("--json")) { console.log(JSON.stringify(R, null, 1)); process.exit(0); }

console.log("Top Pick 순위 — 건강 관문 + 상승 가능성 점수 · T " + (TA.asOf || "–") + " · 스크린 " + ((DC && DC.asOf) || "없음") + " · 한국 목표가 3개월 변화 " + ((RVD && RVD.asOf) || "없음"));
const tp = D.topPicks || {};
["korea", "us"].forEach((c) => {
  const r = R[c], cur = (tp[c] || []).map((x) => x.ticker);
  console.log("\n■ " + (c === "korea" ? "한국" : "미국") + " — 건강 통과 " + r.ranked.length + " · 제외 " + r.excluded.length + " · 점수 자료 없음 " + r.unscored.length +
    " · 지금 Top Pick(" + (tp.asOf || "–") + "): " + (cur.join(", ") || "–") + "\n  점수 = " + LP.SCORE[c].map((k) => ({ iss: "주식 수 감소", shy: "주주환원 수익률", roic: "ROIC", dy: "배당수익률" })[k]).join("·") + " 백분위" + (LP.SCORE[c].length > 1 ? " 평균" : ""));
  if (r.diversify) console.log("  업종 분산: 1~3위는 업종마다 한 종목(lib-picks DIVERSIFY — 미국 나스닥 섹터)");
  r.ranked.slice(0, 10).forEach((x) => console.log("  " + String(x.rank).padStart(2) + ". " + x.ticker + " " + x.name + " (" + LP.slotKo(x) + (x.secKo ? " · " + x.secKo : "") + ") 점수 " +
    x.score.toFixed(3) + " — " + LP.partsLine(x, c) + (x.src === "hidden" ? " (히든: 희석만)" : "") + (x.pick ? "  ★ Top Pick " + x.pick : "") +
    (x.skip ? "  (같은 업종 " + x.skip + " 가 이미 Top Pick)" : "") + (cur.includes(x.ticker) ? "  ← 지금" : "")));
  if (r.ranked.length > 10) console.log("  … " + (r.ranked.length - 10) + "종목 더");
  if (r.excluded.length) console.log("  건강 조건 제외: " + r.excluded.map((x) => x.name + "(" + x.why + ")").join(", "));
  if (r.unscored.length) console.log("  순위 없음: " + r.unscored.map((x) => x.name + "(" + x.why + ")").join(", "));
  const top = r.top;
  if (cur.length && top.join() !== cur.join()) console.log("  ⚠ 지금 Top Pick 이 순위 1~3위(" + top.join(", ") + ")와 다르다 — topPicks 를 이 순서로 다시 쓴다(CLAUDE.md §4-6)");
});

if (process.argv.includes("--emit")) {
  const keep = (x) => ({ rank: x.rank, ticker: x.ticker, name: x.name, theme: x.theme, tier: x.tier, tag: x.tag, score: x.score, iss: x.iss, shy: x.shy, roic: x.roic, dy: x.dy,
    sec: x.secKo || undefined, tp3: x.tp3, pick: x.pick || undefined, skip: x.skip || undefined });
  const doc = { asOf: TA.asOf || null, builtAt: new Date().toISOString().slice(0, 19) + "Z", screenAsOf: (DC && DC.asOf) || null, revAsOf: (RVD && RVD.asOf) || null,
    note: LP.NOTE, evidence: LP.EVIDENCE, cuts: LP.CUTS, rev: LP.REV };
  ["korea", "us"].forEach((c) => { doc[c] = { top: R[c].top, diversify: R[c].diversify, ranked: R[c].ranked.map(keep), excluded: R[c].excluded.map((x) => ({ ticker: x.ticker, why: x.why })), unscored: R[c].unscored.map((x) => x.ticker) }; });
  fs.writeFileSync(OUT, "// Top Pick 순위 — scripts/pick-score.js 가 매일 생성(토큰 0). 규칙: scripts/lib-picks.js · 검증: scripts/research/top-pick/\n" +
    "window.PICK_SCORES = " + JSON.stringify(doc) + ";\n");
  console.log("\n→ data/pick-scores.js");
}
