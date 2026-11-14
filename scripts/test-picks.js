#!/usr/bin/env node
// Top Pick 순위(lib-picks) 시험 — 네트워크 없이 돈다(토큰 0).
//   ①② 건강 관문(unhealthy) ↔ 화면용 건강 점검 목록(healthChecks) 일치 ③ 무배당 = 배당수익률 0 · 대표 자리(정식 먼저)
//   '걸린 항목이 하나라도 있다 ⟺ unhealthy 가 사유를 낸다'를 ①지금 데이터의 모든 후보·보유 종목 ②무작위 입력(빈 값·문턱 경계)으로 확인한다.
//   관문 조건을 고치고 건강 점검 목록을 안 고치면 여기서 걸린다(화면이 판정과 다른 말을 하지 않게).
//   사용: node scripts/test-picks.js      — 어긋나면 exit 1
"use strict";
const fs = require("fs");
const path = require("path");
const LP = require("./lib-picks");
const DATA = path.join(__dirname, "..", "data");
function load(file, key) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  const w = {};
  try { new Function("window", fs.readFileSync(p, "utf8"))(w); } catch (_e) { return null; }
  return w[key] || null;
}
let bad = 0, n = 0;
const note = (m) => { if (++bad <= 8) console.error(m); };

// ① 지금 데이터
const D = load("recommendations.js", "STOCK_DATA");
if (D) {
  const R = LP.rankPicks({ D, TA: load("stock-ta.js", "STOCK_TA") || {}, EV: (load("events.js", "STOCK_EVENTS") || {}).items || {}, CA: load("candidates.js", "CANDIDATES") || { groups: {} },
    DC: load("discovery-candidates.js", "DISCOVERY_CANDIDATES"), FU: (load("fundamentals.js", "STOCK_FUND") || {}).items || {}, RV: (load("revisions.js", "STOCK_REVISIONS") || {}).items || {} });
  ["korea", "us"].forEach((c) => {
    const h = R[c].health || {}, exc = new Set(R[c].excluded.map((x) => x.ticker));
    Object.keys(h).forEach((t) => {
      n++;
      const fail = h[t].checks.some((k) => k.st === 0);
      if (!!h[t].why !== fail) note("지금 데이터 어긋남 " + c + " " + t + " 사유=" + h[t].why + " 목록=" + JSON.stringify(h[t].checks));
      if (!h[t].hold && !!h[t].why !== exc.has(t)) note("제외 목록과 다름 " + c + " " + t);
      h[t].checks.forEach((k) => { if (typeof k.t !== "string" || !k.t || /undefined|NaN|null/.test(k.t)) note("문구 이상 " + c + " " + t + " " + JSON.stringify(k)); });
    });
  });
}

// ② 무작위 입력
let seed = 20261114;
const rnd = () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const pick = (xs) => xs[Math.floor(rnd() * xs.length)];
const numOr = (vals) => (rnd() < 0.15 ? pick([null, undefined]) : pick(vals) + (rnd() < 0.5 ? 0 : (rnd() - 0.5) * 0.2));
const SIG = ["적극매수", "매수", "중립", "매도", "적극매도", "–"];
for (let i = 0; i < 300000; i++) {
  const c = pick(["korea", "us"]), C = LP.CUTS[c];
  const sig = [pick(SIG), pick(SIG), pick(SIG)];
  const ev = rnd() < 0.2 ? undefined : { flow: rnd() < 0.2 ? undefined : { hot: pick([true, false, undefined]), fi20: numOr([-0.05, 0.02, 0.07]) } };
  const rv = rnd() < 0.3 ? undefined : { chg: numOr([-30, -10.1, -10, -9.9, 0, 12]) };
  const def = pick([undefined, "결격", "점검 필요", "감시"]);
  const post = rnd() < 0.7 ? null : { chg: pick([-35, -20.1, 20.1, 25, 170]) };
  const f = rnd() < 0.15 ? null : { niPos: pick([1, 0, null]), iss: numOr([-8, 0, C.iss - 0.1, C.iss, C.iss + 0.1, 12]), issCa: pick([true, false]), ag: numOr([-10, C.ag - 0.1, C.ag, C.ag + 0.1, 80]),
    sroa: numOr([0.1, (C.sroaFin || 3) - 0.1, C.sroaFin || 3, C.sroa - 0.1, C.sroa, C.sroa + 0.1, 25]), fin: pick([true, false]), post, shy: null, roic: null, dy: null };
  const why = LP.unhealthy(c, {}, sig, ev, def, f, rv);
  const hc = LP.healthChecks(c, sig, ev, def, f, rv, pick([true, false]));
  n++;
  // 결격 항목은 정식 자리에만 보인다 — 정식이 아닌데 결격 상태가 들어오는 조합은 실제로 없다(시험에서도 뺀다)
  const fail = hc.some((k) => k.st === 0) || ((def === "결격" || def === "점검 필요") && !hc.some((k) => k.k === "defect"));
  if (!!why !== fail) note("무작위 어긋남 " + c + " 사유=" + why + " sig=" + sig.join("/") + " ev=" + JSON.stringify(ev) + " rv=" + JSON.stringify(rv) + " def=" + def + " f=" + JSON.stringify(f) + " 목록=" + JSON.stringify(hc));
  hc.forEach((k) => { if (typeof k.t !== "string" || !k.t || /undefined|NaN|null/.test(k.t)) note("문구 이상 " + JSON.stringify(k)); });
}
// ③ 무배당 = 배당수익률 0(값 없음이 아니다 — 2026-11-14 수정) · 대표 자리는 정식 → 주목 → 관심
{
  const mk = (t, theme, tier) => ({ ticker: t, name: t, theme, tier, market: "KOSPI" });
  const fxRow = (t, iss, payoutFy, niPos) => ({ ticker: t, fx: { year: 2025, niPos: niPos == null ? 1 : niPos, iss, payoutFy, ag: 5, sroa: 1 } });
  const sigs = { short: { signal: "매수" }, mid: { signal: "매수" }, long: { signal: "매수" } };
  const rows = [fxRow("A", -8, 0), fxRow("B", -5, 25), fxRow("C", -2, 30), fxRow("D", 0, 20), fxRow("E", -6, null), fxRow("F", -7, 0), fxRow("G", -1, 0, 0)];
  const S = (c) => ({ D: { [c]: rows.map((r) => mk(r.ticker, "value", 1)), [c === "korea" ? "us" : "korea"]: [] }, TA: { ta: Object.fromEntries(rows.map((r) => [r.ticker, sigs])) }, EV: {}, CA: { groups: {} },
    DC: { groups: { [c + "|value"]: { incumbents: rows } } }, FU: { A: { dy: null }, B: { dy: 4.5 }, C: { dy: 4.7 }, D: { dy: 1 }, E: { dy: null }, F: { dy: 0.8, dyFlag: "x" }, G: { dy: null } }, RV: {} });
  const K = LP.rankPicks(S("korea")).korea, by = (R, t) => R.ranked.find((x) => x.ticker === t);
  n++;
  const a = by(K, "A"), e = by(K, "E"), f = by(K, "F");
  if (!a || a.dy !== 0 || a.pct.dy !== 0 || a.score !== 0.5) note("무배당(현금배당성향 0) 종목의 배당수익률이 0 으로 계산되지 않음: " + JSON.stringify(a));
  if (!e || e.pct.dy !== null) note("배당 자료가 없는 종목(현금배당성향 자료 없음)은 비워 두어야 한다: " + JSON.stringify(e));
  if (!f || f.pct.dy !== null) note("의심 값(dyFlag)은 0 으로 덮지 않는다: " + JSON.stringify(f));
  if (K.top[0] === "A") note("무배당 종목이 주식 수 하나로 1위가 됨: " + K.top.join(","));
  if (!K.excluded.some((x) => x.ticker === "G" && /적자/.test(x.why))) note("적자 종목이 제외되지 않음");
  const U = LP.rankPicks(S("us")).us, ua = by(U, "A");
  n++;
  if (!ua || ua.pct.iss == null || ua.dy != null) note("미국에는 무배당 0 처리를 적용하지 않는다: " + JSON.stringify(ua));
  // 대표 자리 — 관심 카드에 남은 tier 가 정식 자리를 밀어내지 않는다
  const S2 = S("korea"); S2.D.korea = [mk("B", "watch", 1), mk("B", "core", 2)].concat(S2.D.korea.filter((x) => x.ticker !== "B"));
  S2.DC.groups["korea|core"] = { incumbents: [rows[1]] }; S2.DC.personal = { korea: { B: rows[1] } };
  S2.CA = { groups: { "korea|core": { defects: [{ ticker: "B", state: "결격" }] } } };
  const K2 = LP.rankPicks(S2).korea;
  n++;
  if (!K2.excluded.some((x) => x.ticker === "B" && x.theme === "core")) note("정식 자리의 실질 결격이 Top Pick 제외로 이어지지 않음(대표 자리가 관심으로 잡힘): " + JSON.stringify(K2.ranked.find((x) => x.ticker === "B") || K2.excluded.find((x) => x.ticker === "B")));
  // 판정 전(점검 필요)인 정식 종목도 Top Pick 에서 뺀다(2026-11-14) — 감시(판정 끝)는 그대로 후보
  const S3 = S("korea"); S3.CA = { groups: { "korea|value": { defects: [{ ticker: "A", state: "점검 필요" }, { ticker: "B", state: "감시" }] } } };
  const K3 = LP.rankPicks(S3).korea;
  n++;
  if (!K3.excluded.some((x) => x.ticker === "A" && /점검 중/.test(x.why))) note("점검 필요 종목이 Top Pick 후보에서 빠지지 않음: " + JSON.stringify(K3.excluded));
  if (K3.excluded.some((x) => x.ticker === "B")) note("감시(판정 끝) 종목이 Top Pick 후보에서 빠짐: " + JSON.stringify(K3.excluded));
}
console.log("test-picks: " + n + "건 — 어긋남 " + bad);
process.exit(bad ? 1 : 0);
