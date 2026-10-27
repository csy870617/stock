#!/usr/bin/env node
// Top Pick 3차 — 점수 후보(기둥 묶음)·건강 관문 추가 후보를 개발/홀드아웃 유니버스에서 지금 규칙과 견준다(PREREG-3.md A·B)
// 사용: node scripts/research/top-pick/test-rules.js <캐시 폴더> <us|kr> [--out 결과.json] [--sims 200]
//   개발 = 미국 1~500·한국 1~300위, 홀드아웃 = 미국 501~1000·한국 301~600위(유니버스마다 건강 관문 문턱·백분위를 따로 잰다).
//   평가 대상 = 건강 관문 통과 ∩ 주식 수 값이 있는 종목. 날짜별 Spearman IC 와 기준선 대비 IC 차이(뉴이-웨스트 t, 시차 h−1),
//   풀 시뮬레이션(매달 무작위 40종목 → 관문 → 1~3위), 관문 후보의 걸리는 쪽 vs 남는 쪽 6개월 초과·12개월 폭락.
"use strict";
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const C = process.argv[3] || "us";
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const SIMS = +(arg("sims") || 200), POOLN = 40;
const P = JSON.parse(fs.readFileSync(path.join(DIR, C, "panel.json"), "utf8"));
const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
const get = (r, f) => (f in FI ? r[FI[f]] : null);
for (const r of P.rows) { const v = r[FI.ISS]; if (v != null && v < -0.2) r[FI.ISS] = 0; }   // 앱과 같은 자료 정리

const DEV = C === "us" ? 500 : 300, SPLIT = C === "us" ? "2019-01" : "2024-04", MINN = C === "us" ? 30 : 20;
const H = [1, 3, 6];
const PIL = { I: [["ISS", -1]], Q: [["ROIC3", 1], ["SROA", -1]], V: [["EP", 1], ["EBITEV", 1]], Y: [["DY", 1]] };
const RULES = {
  S0: [[["ISS", -1], ["SHY", 1], ["ROIC", 1]]],   // 지금 미국 규칙(평평한 평균 — 기둥 하나로 둔다)
  C1: [PIL.I], C2: [PIL.I, PIL.Q], C3: [PIL.I, PIL.V], C4: [PIL.I, PIL.Y], C5: [PIL.I, PIL.Q, PIL.V], C6: [PIL.I, PIL.Q, PIL.V, PIL.Y],
};
if (!("SHY" in FI)) delete RULES.S0;
const BASE = C === "us" ? "S0" : "C1";
const RN = Object.keys(RULES);

const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
function cutQ(list, f, q) { const xs = list.map((r) => get(r, f)).filter(ok).sort((a, b) => a - b); return xs.length >= 30 ? xs[Math.floor(xs.length * q)] : null; }
function pctRankMap(list, f) {
  const xs = list.map((r) => get(r, f)).filter(ok).sort((a, b) => a - b);
  return (v) => { if (!ok(v) || !xs.length) return null; let lo = 0, hi = xs.length; while (lo < hi) { const m = (lo + hi) >> 1; if (xs[m] < v) lo = m + 1; else hi = m; } return xs.length === 1 ? 0.5 : lo / (xs.length - 1); };
}
function ranks(a) {
  const idx = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]);
  const rk = new Array(a.length);
  for (let i = 0; i < idx.length;) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; const r = (i + j) / 2; for (let k = i; k <= j; k++) rk[idx[k][1]] = r; i = j + 1; }
  return rk;
}
function spearman(x, y) {
  const n = x.length; if (n < 3) return null;
  const rx = ranks(x), ry = ranks(y), mx = (n - 1) / 2;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { const a = rx[i] - mx, b = ry[i] - mx; sxy += a * b; sxx += a * a; syy += b * b; }
  return sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : null;
}
function nw(series, lag) {
  const x = series.filter(ok); const T = x.length; if (T < 6) return { mean: mean(x), t: null, n: T };
  const m = x.reduce((s, v) => s + v, 0) / T;
  const g = (k) => { let s = 0; for (let i = k; i < T; i++) s += (x[i] - m) * (x[i - k] - m); return s / T; };
  let v = g(0); for (let k = 1; k <= lag; k++) v += 2 * (1 - k / (lag + 1)) * g(k);
  return { mean: m, t: v > 0 ? m / Math.sqrt(v / T) : null, n: T };
}
// 재현되는 무작위(mulberry32)
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// 건강 관문 — 문턱은 유니버스 전체(그 달)에서
function gateOf(pool) {
  const agCut = cutQ(pool, "AG", 0.9), sCut = { 1: cutQ(pool.filter((r) => get(r, "fin")), "SROA", 0.9), 0: cutQ(pool.filter((r) => !get(r, "fin")), "SROA", 0.9) };
  const accCut = cutQ(pool, "ACC", 0.9);
  const healthy = (r) => {
    if (get(r, "niPos") === 0) return false;
    if (ok(get(r, "ISS")) && get(r, "ISS") > 0.05) return false;
    if (agCut != null && ok(get(r, "AG")) && get(r, "AG") >= agCut) return false;
    const sc = sCut[get(r, "fin") ? 1 : 0];
    return !(sc != null && ok(get(r, "SROA")) && get(r, "SROA") >= sc);
  };
  const G = {
    G1: (r) => !get(r, "fin") && ok(get(r, "SG1")) && get(r, "SG1") < 0,
    G2: (r) => ok(get(r, "PAYOUT")) && get(r, "PAYOUT") > 1,
    G3: (r) => ok(get(r, "F")) && get(r, "F") <= 3,
    G4: (r) => accCut != null && ok(get(r, "ACC")) && get(r, "ACC") >= accCut,
  };
  return { healthy, G };
}
// 점수 — 평가 대상(list) 안 백분위, 기둥 평균의 평균
function scorer(list, rule) {
  const maps = rule.map((pil) => pil.map(([f, s]) => [pctRankMap(list, f), f, s]));
  return (r) => mean(maps.map((pil) => mean(pil.map(([m, f, s]) => { const p = m(get(r, f)); return p == null ? null : (s > 0 ? p : 1 - p); }))));
}

const byDate = new Map();
for (const r of P.rows) { const d = get(r, "ym"); if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();
const UNI = { dev: [1, DEV], holdout: [DEV + 1, 2 * DEV] };
const res = { country: C, base: BASE, rules: RN, split: SPLIT, dates: [dates[0], dates[dates.length - 1]], sims: SIMS, universes: {} };

for (const [un, [lo, hi]] of Object.entries(UNI)) {
  const ic = {}; RN.forEach((k) => { ic[k] = {}; H.forEach((h) => { ic[k][h] = []; }); });
  const sim = {}; RN.concat(["RAND"]).forEach((k) => { sim[k] = {}; H.forEach((h) => { sim[k][h] = []; }); sim[k].crash = []; });
  const gate = {}; ["G1", "G2", "G3", "G4"].forEach((g) => { gate[g] = { h1: { ex: [], kept: [], crEx: [], crKept: [], share: [] }, h2: { ex: [], kept: [], crEx: [], crKept: [], share: [] } }; });
  const rand = rng(C === "us" ? 20261027 : 1027 + lo);
  for (const d of dates) {
    const pool = byDate.get(d).filter((r) => get(r, "rank") >= lo && get(r, "rank") <= hi);
    if (pool.length < 100) continue;
    const half = d < SPLIT ? "h1" : "h2";
    const { healthy, G } = gateOf(pool);
    const inH = pool.filter(healthy), evalSet = inH.filter((r) => ok(get(r, "ISS")));
    const mr = {}; H.concat([12]).forEach((h) => { mr[h] = mean(pool.map((r) => get(r, "r" + h))); });
    const ex = (r, h) => (ok(get(r, "r" + h)) && mr[h] != null ? get(r, "r" + h) - mr[h] : null);
    const crash = (r) => (ok(get(r, "r12")) ? (get(r, "r12") < -0.3 ? 1 : 0) : null);
    // IC
    for (const k of RN) {
      const sc = scorer(evalSet, RULES[k]);
      const sv = evalSet.map((r) => sc(r));
      for (const h of H) {
        const xs = [], ys = [];
        evalSet.forEach((r, i) => { const y = get(r, "r" + h); if (sv[i] != null && ok(y)) { xs.push(sv[i]); ys.push(y); } });
        ic[k][h].push({ d, half, v: xs.length >= MINN ? spearman(xs, ys) : null });
      }
    }
    // 관문 후보 — H 안에서 걸리는 쪽 vs 남는 쪽
    for (const g of Object.keys(G)) {
      const flag = inH.filter(G[g]), kept = inH.filter((r) => !G[g](r));
      const S = gate[g][half];
      S.share.push(inH.length ? flag.length / inH.length : null);
      if (flag.length < 3 || kept.length < 10) continue;
      S.ex.push(mean(flag.map((r) => ex(r, 6)))); S.kept.push(mean(kept.map((r) => ex(r, 6))));
      S.crEx.push(mean(flag.map(crash))); S.crKept.push(mean(kept.map(crash)));
    }
    // 풀 시뮬레이션 — 무작위 40종목 → 관문 → 그 안 백분위 점수 1~3위
    const acc = {}; RN.concat(["RAND"]).forEach((k) => { acc[k] = { ex: { 1: [], 3: [], 6: [] }, up: { 1: [], 3: [], 6: [] }, crash: [] }; });
    for (let s = 0; s < SIMS; s++) {
      const idx = []; const used = new Set();
      while (idx.length < Math.min(POOLN, pool.length)) { const j = Math.floor(rand() * pool.length); if (!used.has(j)) { used.add(j); idx.push(j); } }
      const sample = idx.map((j) => pool[j]).filter(healthy).filter((r) => ok(get(r, "ISS")));
      if (sample.length < 6) continue;
      const pickBy = (k) => {
        if (k === "RAND") { const a = sample.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, 3); }
        const sc = scorer(sample, RULES[k]);
        return sample.map((r) => [r, sc(r)]).filter((x) => x[1] != null).sort((a, b) => b[1] - a[1]).slice(0, 3).map((x) => x[0]);
      };
      for (const k of RN.concat(["RAND"])) {
        const top = pickBy(k);
        for (const h of H) { const e = top.map((r) => ex(r, h)).filter(ok); if (e.length) { acc[k].ex[h].push(mean(e)); acc[k].up[h].push(mean(e.map((v) => (v > 0 ? 1 : 0)))); } }
        const c = top.map(crash).filter(ok); if (c.length) acc[k].crash.push(mean(c));
      }
    }
    for (const k of RN.concat(["RAND"])) {
      H.forEach((h) => { sim[k][h].push({ half, ex: mean(acc[k].ex[h]), up: mean(acc[k].up[h]) }); });
      sim[k].crash.push({ half, v: mean(acc[k].crash) });
    }
  }
  // 모으기
  const U = { ic: {}, diff: {}, sim: {}, gate: {} };
  const r4 = (v) => (v == null ? null : Math.round(v * 10000) / 10000), t2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
  for (const k of RN) {
    U.ic[k] = {}; U.diff[k] = {};
    for (const h of H) {
      const s = ic[k][h], a = nw(s.map((x) => x.v), h - 1);
      U.ic[k]["m" + h] = { all: r4(a.mean), t: t2(a.t), h1: r4(mean(s.filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(s.filter((x) => x.half === "h2").map((x) => x.v))) };
      if (k === BASE) continue;
      const dd = s.map((x, i) => (ok(x.v) && ok(ic[BASE][h][i].v) ? { half: x.half, v: x.v - ic[BASE][h][i].v } : null)).filter(Boolean);
      const b = nw(dd.map((x) => x.v), h - 1);
      U.diff[k]["m" + h] = { all: r4(b.mean), t: t2(b.t), h1: r4(mean(dd.filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(dd.filter((x) => x.half === "h2").map((x) => x.v))), n: b.n };
    }
  }
  for (const k of RN.concat(["RAND"])) {
    U.sim[k] = {};
    for (const h of H) U.sim[k]["m" + h] = { ex: r4(mean(sim[k][h].map((x) => x.ex))), up: r4(mean(sim[k][h].map((x) => x.up))),
      upH1: r4(mean(sim[k][h].filter((x) => x.half === "h1").map((x) => x.up))), upH2: r4(mean(sim[k][h].filter((x) => x.half === "h2").map((x) => x.up))) };
    U.sim[k].crash = r4(mean(sim[k].crash.map((x) => x.v)));
  }
  for (const g of Object.keys(gate)) {
    U.gate[g] = {};
    for (const hf of ["h1", "h2"]) { const S = gate[g][hf]; U.gate[g][hf] = { ex6: r4(mean(S.ex)), kept6: r4(mean(S.kept)), crashEx: r4(mean(S.crEx)), crashKept: r4(mean(S.crKept)), share: r4(mean(S.share)) }; }
  }
  res.universes[un] = U;
}

// 판정(사전 등록)
const J = { score: {}, gate: {} };
for (const k of RN) {
  if (k === BASE) continue;
  const d = res.universes.dev.diff[k], h = res.universes.holdout.diff[k];
  J.score[k] = { devT3: d.m3.t, devHalves: d.m3.h1 > 0 && d.m3.h2 > 0, holdout3: h.m3.all, notWorse1: !(d.m1.t != null && d.m1.t <= -1), notWorse6: !(d.m6.t != null && d.m6.t <= -1),
    pass: d.m3.t != null && d.m3.t >= 2.5 && d.m3.all > 0 && d.m3.h1 > 0 && d.m3.h2 > 0 && h.m3.all > 0 && !(d.m1.t != null && d.m1.t <= -1) && !(d.m6.t != null && d.m6.t <= -1) };
}
for (const g of ["G1", "G2", "G3", "G4"]) {
  const okU = (U) => ["h1", "h2"].every((hf) => { const x = res.universes[U].gate[g][hf]; return x.ex6 != null && x.ex6 < x.kept6 && x.crashEx > x.crashKept; });
  J.gate[g] = { dev: okU("dev"), holdout: okU("holdout"), share: res.universes.dev.gate[g].h2.share };
}
res.judge = J;
const OUT = arg("out");
if (OUT) fs.writeFileSync(OUT, JSON.stringify(res, null, 1));

const p = (v) => (v == null ? "  –  " : (v * 100).toFixed(1).padStart(5));
const q = (v) => (v == null ? "   –  " : (v >= 0 ? "+" : "") + v.toFixed(3));
console.log("■ " + C + " — 기준선 " + BASE + " · " + res.dates.join("~") + " · 풀 시뮬레이션 " + SIMS + "회/월");
for (const un of ["dev", "holdout"]) {
  const U = res.universes[un];
  console.log("\n [" + (un === "dev" ? "개발" : "홀드아웃") + "] IC(t) 1M | 3M | 6M     · 기준선 대비 3M 차이(t) 전반/후반 · 1M·6M 차이 t     · 풀(40→3) 3M 초과·오름 / 1M 오름 · 폭락");
  for (const k of RN) {
    const a = U.ic[k], d = U.diff[k] || {}, s = U.sim[k];
    console.log("  " + k.padEnd(3) + " " + q(a.m1.all) + "(" + a.m1.t + ") " + q(a.m3.all) + "(" + a.m3.t + ") " + q(a.m6.all) + "(" + a.m6.t + ")" +
      (k === BASE ? "   (기준선)                                   " : "   " + q(d.m3.all) + "(" + d.m3.t + ") " + q(d.m3.h1) + "/" + q(d.m3.h2) + " · " + d.m1.t + "·" + d.m6.t) +
      "   " + p(s.m3.ex) + "%p " + p(s.m3.up) + "% / " + p(s.m1.up) + "% · " + p(s.crash) + "%");
  }
  const s = U.sim.RAND; console.log("  무작위3  풀 3M 초과 " + p(s.m3.ex) + "%p 오름 " + p(s.m3.up) + "% / 1M " + p(s.m1.up) + "% · 폭락 " + p(s.crash) + "%");
  console.log("  관문 후보(걸리는 쪽 vs 남는 쪽 6M 초과% · 12M 폭락% — 전반 | 후반 · 걸리는 비율)");
  for (const g of ["G1", "G2", "G3", "G4"]) {
    const x = U.gate[g];
    console.log("   " + g + " " + p(x.h1.ex6) + " vs " + p(x.h1.kept6) + " · " + p(x.h1.crashEx) + " vs " + p(x.h1.crashKept) + " | " + p(x.h2.ex6) + " vs " + p(x.h2.kept6) + " · " + p(x.h2.crashEx) + " vs " + p(x.h2.crashKept) + " · " + p(x.h2.share) + "%");
  }
}
console.log("\n 판정: " + JSON.stringify(J));
