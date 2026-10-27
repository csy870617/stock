#!/usr/bin/env node
// Top Pick 4차 — 업종 분산(N1)·값 없는 재료 중간값(M1, 미국)·한국 점수(C1 vs C4)를 1~3위의 상승 폭·오를 확률·큰 상승·폭락·쏠림으로 견준다(PREREG-4.md)
// 사용: node scripts/research/top-pick/test-balance.js <캐시 폴더> <us|kr> [--out 결과.json] [--sims 200]
//   캐시 = research/theme 의 fetch·panel 결과(<캐시>/<us|kr>/panel.json, 미국 업종 us/universe.json, 한국 업종 kr/wise/*.json 의 WICS).
//   개발 = 미국 1~500·한국 1~300위, 확인용 = 501~1000·301~600위. 매달 무작위 40종목 → 건강 관문 → 1~3위(같은 표본을 모든 규칙이 쓴다 — 짝 비교).
"use strict";
const fs = require("fs");
const path = require("path");
const SEC = require("../../lib-sectors.js");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const C = process.argv[3] || "us";
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const SIMS = +(arg("sims") || 200), POOLN = 40;
const P = JSON.parse(fs.readFileSync(path.join(DIR, C, "panel.json"), "utf8"));
const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
const get = (r, f) => (f in FI ? r[FI[f]] : null);
for (const r of P.rows) { const v = r[FI.ISS]; if (v != null && v < -0.2) r[FI.ISS] = 0; }   // 앱과 같은 자료 정리

// 업종 — 지금 분류를 과거에 그대로 쓴다
const SECT = {};
if (C === "us") {
  for (const u of JSON.parse(fs.readFileSync(path.join(DIR, "us", "universe.json"), "utf8"))) SECT[u.t] = SEC.usSector(u.sector);
} else {
  const wd = path.join(DIR, "kr", "wise");
  for (const f of fs.readdirSync(wd)) { try { const j = JSON.parse(fs.readFileSync(path.join(wd, f), "utf8")); SECT[j.t] = SEC.krSector(j.wics); } catch (e) { /* 깨진 캐시 무시 */ } }
}
const secOf = (r) => SECT[get(r, "t")] || null;

const DEV = C === "us" ? 500 : 300, SPLIT = C === "us" ? "2019-01" : "2024-04", MINN = C === "us" ? 30 : 20;
// 점수 — 재료 [필드, 방향], miss: "skip" 값 있는 것만 평균(지금) | "mid" 값 없으면 0.5
const SCORES = C === "us"
  ? { M0: { f: [["ISS", -1], ["SHY", 1], ["ROIC", 1]], miss: "skip" }, M1: { f: [["ISS", -1], ["SHY", 1], ["ROIC", 1]], miss: "mid" } }
  : { C4: { f: [["ISS", -1], ["DY", 1]], miss: "skip" }, C1: { f: [["ISS", -1]], miss: "skip" } };
const BASE_S = C === "us" ? "M0" : "C4", ALT_S = C === "us" ? "M1" : "C1";
const COMBOS = [BASE_S + "N0", BASE_S + "N1", ALT_S + "N0", ALT_S + "N1"];
const KEYS = COMBOS.concat(["RAND"]);

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
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// 건강 관문 — 3차와 같다(문턱은 유니버스 전체에서 그 달)
function gateOf(pool) {
  const agCut = cutQ(pool, "AG", 0.9), sCut = { 1: cutQ(pool.filter((r) => get(r, "fin")), "SROA", 0.9), 0: cutQ(pool.filter((r) => !get(r, "fin")), "SROA", 0.9) };
  return (r) => {
    if (get(r, "niPos") === 0) return false;
    if (ok(get(r, "ISS")) && get(r, "ISS") > 0.05) return false;
    if (agCut != null && ok(get(r, "AG")) && get(r, "AG") >= agCut) return false;
    const sc = sCut[get(r, "fin") ? 1 : 0];
    return !(sc != null && ok(get(r, "SROA")) && get(r, "SROA") >= sc);
  };
}
// 점수 — 평가 대상(list) 안 백분위 평균
function scorer(list, S) {
  const maps = S.f.map(([f, s]) => [pctRankMap(list, f), f, s]);
  return (r) => mean(maps.map(([m, f, s]) => { const p = m(get(r, f)); return p == null ? (S.miss === "mid" ? 0.5 : null) : (s > 0 ? p : 1 - p); }));
}
// 1~3위 — N1 이면 같은 업종은 하나만(업종 모름은 제한 없음)
function top3(scored, n1) {
  const out = [], used = new Set();
  for (const [r] of scored) {
    if (out.length >= 3) break;
    const s = secOf(r);
    if (n1 && s && used.has(s)) continue;
    if (s) used.add(s);
    out.push(r);
  }
  return out;
}

const byDate = new Map();
for (const r of P.rows) { const d = get(r, "ym"); if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();
const UNI = { dev: [1, DEV], holdout: [DEV + 1, 2 * DEV] };
const res = { country: C, combos: COMBOS, split: SPLIT, dates: [dates[0], dates[dates.length - 1]], sims: SIMS, universes: {} };
const MET = ["ex3", "ex6", "ex12", "up6", "big12", "crash", "fin", "maxSame"];

for (const [un, [lo, hi]] of Object.entries(UNI)) {
  const months = [];   // {d, half, v: {combo: {met: 값}}}
  const ic = {}; Object.keys(SCORES).forEach((k) => { ic[k] = { 3: [], 6: [] }; });
  const rand = rng(C === "us" ? 20261027 : 1027 + lo);
  for (const d of dates) {
    const pool = byDate.get(d).filter((r) => get(r, "rank") >= lo && get(r, "rank") <= hi);
    if (pool.length < 100) continue;
    const half = d < SPLIT ? "h1" : "h2";
    const healthy = gateOf(pool);
    const evalSet = pool.filter(healthy).filter((r) => ok(get(r, "ISS")));
    const mr = {}; [3, 6, 12].forEach((h) => { mr[h] = mean(pool.map((r) => get(r, "r" + h))); });
    const ex = (r, h) => (ok(get(r, "r" + h)) && mr[h] != null ? get(r, "r" + h) - mr[h] : null);
    // IC(점수 후보) — 평가 대상 전체
    for (const k of Object.keys(SCORES)) {
      const sc = scorer(evalSet, SCORES[k]);
      for (const h of [3, 6]) {
        const xs = [], ys = [];
        evalSet.forEach((r) => { const v = sc(r), y = get(r, "r" + h); if (v != null && ok(y)) { xs.push(v); ys.push(y); } });
        ic[k][h].push({ half, v: xs.length >= MINN ? spearman(xs, ys) : null });
      }
    }
    // 풀 시뮬레이션
    const acc = {}; KEYS.forEach((k) => { acc[k] = {}; MET.forEach((m) => { acc[k][m] = []; }); });
    for (let s = 0; s < SIMS; s++) {
      const idx = [], used = new Set();
      while (idx.length < Math.min(POOLN, pool.length)) { const j = Math.floor(rand() * pool.length); if (!used.has(j)) { used.add(j); idx.push(j); } }
      const sample = idx.map((j) => pool[j]).filter(healthy).filter((r) => ok(get(r, "ISS")));
      if (sample.length < 6) continue;
      const sorted = {};
      for (const k of Object.keys(SCORES)) { const sc = scorer(sample, SCORES[k]); sorted[k] = sample.map((r) => [r, sc(r)]).filter((x) => x[1] != null).sort((a, b) => b[1] - a[1]); }
      const shuffled = sample.slice(); for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
      for (const k of KEYS) {
        const top = k === "RAND" ? shuffled.slice(0, 3) : top3(sorted[k.slice(0, 2)], k.endsWith("N1"));
        if (!top.length) continue;
        const e3 = top.map((r) => ex(r, 3)), e6 = top.map((r) => ex(r, 6)), e12 = top.map((r) => ex(r, 12));
        acc[k].ex3.push(mean(e3)); acc[k].ex6.push(mean(e6)); acc[k].ex12.push(mean(e12));
        acc[k].up6.push(mean(e6.filter(ok).map((v) => (v > 0 ? 1 : 0))));
        acc[k].big12.push(mean(e12.filter(ok).map((v) => (v >= 0.3 ? 1 : 0))));
        acc[k].crash.push(mean(top.map((r) => (ok(get(r, "r12")) ? (get(r, "r12") < -0.3 ? 1 : 0) : null))));
        acc[k].fin.push(mean(top.map((r) => (get(r, "fin") ? 1 : 0))));
        const cnt = {}; let mx = 0; top.forEach((r, i) => { const sct = secOf(r) || "_" + i; cnt[sct] = (cnt[sct] || 0) + 1; mx = Math.max(mx, cnt[sct]); });
        acc[k].maxSame.push(mx);
      }
    }
    const v = {}; KEYS.forEach((k) => { v[k] = {}; MET.forEach((m) => { v[k][m] = mean(acc[k][m]); }); });
    months.push({ d, half, v });
  }
  // 모으기
  const r4 = (x) => (x == null ? null : Math.round(x * 10000) / 10000), t2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
  const U = { level: {}, diff: {}, ic: {}, icDiff: {} };
  for (const k of KEYS) {
    U.level[k] = {};
    for (const m of MET) U.level[k][m] = { all: r4(mean(months.map((x) => x.v[k][m]))), h1: r4(mean(months.filter((x) => x.half === "h1").map((x) => x.v[k][m]))), h2: r4(mean(months.filter((x) => x.half === "h2").map((x) => x.v[k][m]))) };
  }
  const pairs = { N1: [BASE_S + "N1", BASE_S + "N0"], ALT: [ALT_S + "N0", BASE_S + "N0"], N1alt: [ALT_S + "N1", BASE_S + "N1"] };
  for (const [name, [a, b]] of Object.entries(pairs)) {
    U.diff[name] = { a, b };
    for (const m of ["ex3", "ex6", "ex12", "up6", "crash"]) {
      const dd = months.map((x) => (ok(x.v[a][m]) && ok(x.v[b][m]) ? { half: x.half, v: x.v[a][m] - x.v[b][m] } : null)).filter(Boolean);
      const lag = m === "ex3" ? 2 : m === "ex6" || m === "up6" ? 5 : 11;
      const s = nw(dd.map((x) => x.v), lag);
      U.diff[name][m] = { all: r4(s.mean), t: t2(s.t), h1: r4(mean(dd.filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(dd.filter((x) => x.half === "h2").map((x) => x.v))), n: s.n };
    }
  }
  for (const k of Object.keys(SCORES)) {
    U.ic[k] = {};
    for (const h of [3, 6]) { const s = nw(ic[k][h].map((x) => x.v), h - 1); U.ic[k]["m" + h] = { all: r4(s.mean), t: t2(s.t), h1: r4(mean(ic[k][h].filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(ic[k][h].filter((x) => x.half === "h2").map((x) => x.v))) }; }
  }
  for (const h of [3, 6]) {
    const a = ic[ALT_S][h], b = ic[BASE_S][h];
    const dd = a.map((x, i) => (ok(x.v) && ok(b[i].v) ? { half: x.half, v: x.v - b[i].v } : null)).filter(Boolean);
    const s = nw(dd.map((x) => x.v), h - 1);
    U.icDiff["m" + h] = { all: r4(s.mean), t: t2(s.t), h1: r4(mean(dd.filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(dd.filter((x) => x.half === "h2").map((x) => x.v))) };
  }
  U.months = months.length;
  U.byMonth = months.map((x) => ({ d: x.d, half: x.half, v: x.v }));   // 탐색용(연도별 분해 등) — 판정에는 쓰지 않는다
  res.universes[un] = U;
}

// 판정(사전 등록 순서)
const D = res.universes.dev, Hd = res.universes.holdout;
const J = {};
{ // 1. 업종 분산
  const d = D.diff.N1.ex6, h = Hd.diff.N1.ex6;
  const crashOk = ["dev", "holdout"].every((u) => { const L = res.universes[u].level; return L[BASE_S + "N1"].crash.all <= L[BASE_S + "N0"].crash.all + 0.015; });
  J.N1 = { devDiff6: d.all, devT6: d.t, holdDiff6: h.all, crashOk, pass: d.t != null && d.t > -2 && d.all >= -0.005 && h.all >= -0.005 && crashOk };
}
const NS = J.N1.pass ? "N1" : "N0";
const altK = ALT_S + NS, baseK = BASE_S + NS;
// 선택된 N 아래에서의 점수 비교 — 짝 차이를 다시 잰다(N0 이면 diff.ALT, N1 이면 diff.N1alt)
const pick = (U) => (NS === "N1" ? U.diff.N1alt : U.diff.ALT);
if (C === "us") { // 2. 값 없는 재료 중간값
  const d = pick(D).ex6, h = pick(Hd).ex6;
  J.M1 = { under: NS, devDiff6: d.all, holdDiff6: h.all, devIcT3: D.icDiff.m3.t, holdIcT3: Hd.icDiff.m3.t,
    pass: d.all >= -0.003 && h.all >= -0.003 && !(D.icDiff.m3.t != null && D.icDiff.m3.t <= -1) && !(Hd.icDiff.m3.t != null && Hd.icDiff.m3.t <= -1) };
} else { // 3. 한국 점수
  const d = pick(D).ex6, h = pick(Hd).ex6;
  const upOk = ["dev", "holdout"].every((u) => { const L = res.universes[u].level; return L[altK].up6.all >= L[baseK].up6.all - 0.02; });
  const crashOk = ["dev", "holdout"].every((u) => { const L = res.universes[u].level; return L[altK].crash.all <= L.RAND.crash.all; });
  J.C1 = { under: NS, devDiff6: d.all, devT6: d.t, holdDiff6: h.all, upOk, crashOk, pass: d.all >= 0.005 && d.t != null && d.t >= 2 && h.all > 0 && upOk && crashOk };
}
res.judge = J;
const OUT = arg("out");
if (OUT) fs.writeFileSync(OUT, JSON.stringify(res, null, 1));

// 출력
const p = (v) => (v == null ? "  –  " : (v * 100).toFixed(1).padStart(5));
const sg = (v) => (v == null ? "   – " : ((v >= 0 ? "+" : "") + (v * 100).toFixed(2)).padStart(6));
const NAME = { M0N0: "지금(미국)", M0N1: "업종 분산", M1N0: "값 없음=중간", M1N1: "중간+분산", C4N0: "지금(한국 C4)", C4N1: "C4+업종 분산", C1N0: "C1 주식 수만", C1N1: "C1+업종 분산", RAND: "무작위 3" };
console.log("■ " + C + " · " + res.dates.join("~") + " · 풀 시뮬레이션 " + SIMS + "회/월");
for (const un of ["dev", "holdout"]) {
  const U = res.universes[un];
  console.log("\n [" + (un === "dev" ? "개발" : "확인용") + "] " + U.months + "개월 — 1~3위: 3M·6M·12M 평균 초과(%p) · 6M 오른 비율 · 12M 큰 상승(+30%p) · 폭락 · 금융 비중 · 같은 업종 최대");
  for (const k of KEYS) {
    const L = U.level[k];
    console.log("  " + (NAME[k] || k).padEnd(14) + p(L.ex3.all) + p(L.ex6.all) + p(L.ex12.all) + " · " + p(L.up6.all) + "% · " + p(L.big12.all) + "% · " + p(L.crash.all) + "% · " + p(L.fin.all) + "% · " + (L.maxSame.all == null ? "–" : L.maxSame.all.toFixed(2)));
  }
  for (const [name, x] of Object.entries(U.diff)) {
    console.log("  차이 " + (NAME[x.a] || x.a) + " − " + (NAME[x.b] || x.b) + ": 6M 초과 " + sg(x.ex6.all) + "%p(t " + x.ex6.t + ", 전반 " + sg(x.ex6.h1) + "/후반 " + sg(x.ex6.h2) + ") · 3M " + sg(x.ex3.all) + " · 12M " + sg(x.ex12.all) + " · 오른 비율 " + sg(x.up6.all) + " · 폭락 " + sg(x.crash.all));
  }
  const ic = U.ic;
  console.log("  IC 3M/6M: " + Object.keys(ic).map((k) => k + " " + ic[k].m3.all + "(" + ic[k].m3.t + ")/" + ic[k].m6.all + "(" + ic[k].m6.t + ")").join(" · ") + " · 차이(" + ALT_S + "−" + BASE_S + ") 3M " + U.icDiff.m3.all + "(t " + U.icDiff.m3.t + ") 6M " + U.icDiff.m6.all + "(t " + U.icDiff.m6.t + ")");
}
console.log("\n 판정: " + JSON.stringify(J));
