#!/usr/bin/env node
// Top Pick 5차 — '싸 보이는 것'이 아니라 '건강하면서 잘 오를 것'(PREREG-5.md): 점수 가족(P1~P5)·관문 후보(G1·G2)를 지금 규칙(S0)과 견준다
// 사용: node scripts/research/top-pick/test-rise.js <캐시 폴더> <us|kr> [--out 결과.json] [--sims 200]
//   캐시 = research/theme 의 panel(<캐시>/<us|kr>/panel.json), 미국 업종 us/universe.json(4차 업종 분산을 미국에 그대로 적용).
//   개발 = 미국 1~500·한국 1~300위, 확인용 = 501~1000·301~600위. 매달 무작위 40종목 → 관문 → 1~3위(모든 후보가 같은 표본 — 짝 비교).
//   판정은 나라별로 여기서 하고, '다른 나라에서 뚜렷이 반대' 조건은 두 결과를 합쳐 본다(--judge us.json kr.json).
"use strict";
const fs = require("fs");
const path = require("path");
const SEC = require("../../lib-sectors.js");

const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
function nw(series, lag) {
  const x = series.filter(ok); const T = x.length; if (T < 6) return { mean: mean(x), t: null, n: T };
  const m = x.reduce((s, v) => s + v, 0) / T;
  const g = (k) => { let s = 0; for (let i = k; i < T; i++) s += (x[i] - m) * (x[i - k] - m); return s / T; };
  let v = g(0); for (let k = 1; k <= lag; k++) v += 2 * (1 - k / (lag + 1)) * g(k);
  return { mean: m, t: v > 0 ? m / Math.sqrt(v / T) : null, n: T };
}

// ── 두 나라 결과 합치기(사전 등록: 다른 나라에서 같은 후보가 개발 차이 t ≤ −2 면 채택하지 않는다) ──
if (process.argv.includes("--judge")) {
  const i = process.argv.indexOf("--judge"), A = JSON.parse(fs.readFileSync(process.argv[i + 1], "utf8")), B = JSON.parse(fs.readFileSync(process.argv[i + 2], "utf8"));
  const by = { [A.country]: A, [B.country]: B };
  const out = {};
  for (const c of Object.keys(by)) {
    const me = by[c], other = by[c === "us" ? "kr" : "us"], J = me.judge;
    const opp = (k) => { const d = other.universes.dev.diff[k + "|H"]; return d && d.ex6 && d.ex6.t != null && d.ex6.t <= -2; };
    const passS = J.scores.filter((x) => x.pass && !opp(x.key));
    out[c] = { scorePass: J.scores.filter((x) => x.pass).map((x) => x.key), blockedByOther: J.scores.filter((x) => x.pass && opp(x.key)).map((x) => x.key),
      chosen: passS.length ? passS.sort((a, b) => b.devEx6 - a.devEx6)[0].key : "S0", gates: J.gates };
  }
  console.log(JSON.stringify(out, null, 1));
  process.exit(0);
}

const DIR = path.resolve(process.argv[2] || "theme-cache");
const C = process.argv[3] || "us";
const SIMS = +(arg("sims") || 200), POOLN = 40;
const P = JSON.parse(fs.readFileSync(path.join(DIR, C, "panel.json"), "utf8"));
const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
// 파생 값: ΔROIC = 최근 연도 ROIC − 3년 평균 ROIC(이익 개선)
FI.DROIC = P.fields.length;
for (const r of P.rows) {
  const v = r[FI.ISS]; if (v != null && v < -0.2) r[FI.ISS] = 0;   // 앱과 같은 자료 정리
  const a = r[FI.ROIC], b = r[FI.ROIC3]; r.push(ok(a) && ok(b) ? a - b : null);
}
const get = (r, f) => (f in FI ? r[FI[f]] : null);

const SECT = {};
if (C === "us") for (const u of JSON.parse(fs.readFileSync(path.join(DIR, "us", "universe.json"), "utf8"))) SECT[u.t] = SEC.usSector(u.sector);
const secOf = (r) => SECT[get(r, "t")] || null;
const DIVERSIFY = C === "us";   // 4차: 미국만 업종 분산

const DEV = C === "us" ? 500 : 300, SPLIT = C === "us" ? "2019-01" : "2024-04", MINN = C === "us" ? 30 : 20;
const PAY = C === "us" ? [["SHY", 1]] : [["DY", 1]];   // 주가에 기대는 주주환원 재료(싼 정도를 함께 잰다)
const BASEF = C === "us" ? [["ISS", -1], ["ROIC", 1]] : [["ISS", -1]];
const MOM = [["MOM", 1]], DR = [["DROIC", 1]];
const SCORES = {
  S0: BASEF.slice(0, 1).concat(PAY, BASEF.slice(1)),        // 지금(미국 ISS·SHY·ROIC, 한국 ISS·DY)
  P1: BASEF,                                                  // 싼 정도 빼기
  P2: BASEF.slice(0, 1).concat(PAY, BASEF.slice(1), MOM),    // 오름세 더하기
  P3: BASEF.concat(MOM),                                      // 싼 정도 대신 오름세
  P4: BASEF.slice(0, 1).concat(PAY, BASEF.slice(1), DR),     // 이익 개선 더하기
  P5: BASEF.concat(MOM, DR),                                  // 품질 성장
};
const SN = Object.keys(SCORES), GATES = ["H", "G1", "G2"];
const COMBOS = []; for (const g of GATES) for (const s of SN) COMBOS.push(s + "|" + g);
const KEYS = COMBOS.concat(["RAND"]);
const MET = ["ex3", "ex6", "ex12", "up6", "big12", "crash", "fin", "pEP", "pBP", "pDY", "pMOM"];

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
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// 관문 — 지금(H) · G1(H + 12-1개월 수익률 하위 20% 제외) · G2(자산 급증이라도 ROIC ≥ 그 달 중앙값이면 통과). 사유도 돌려준다(G3 진단)
function gateOf(pool) {
  const agCut = cutQ(pool, "AG", 0.9), sCut = { 1: cutQ(pool.filter((r) => get(r, "fin")), "SROA", 0.9), 0: cutQ(pool.filter((r) => !get(r, "fin")), "SROA", 0.9) };
  const momCut = cutQ(pool, "MOM", 0.2), roicMed = cutQ(pool, "ROIC", 0.5);
  const why = (r, g2) => {
    if (get(r, "niPos") === 0) return "NI";
    if (ok(get(r, "ISS")) && get(r, "ISS") > 0.05) return "ISS";
    if (agCut != null && ok(get(r, "AG")) && get(r, "AG") >= agCut && !(g2 && roicMed != null && ok(get(r, "ROIC")) && get(r, "ROIC") >= roicMed)) return "AG";
    const sc = sCut[get(r, "fin") ? 1 : 0];
    if (sc != null && ok(get(r, "SROA")) && get(r, "SROA") >= sc) return "SROA";
    return null;
  };
  const knife = (r) => momCut != null && ok(get(r, "MOM")) && get(r, "MOM") < momCut;
  return { why, pass: { H: (r) => !why(r, false), G1: (r) => !why(r, false) && !knife(r), G2: (r) => !why(r, true) }, agCut, roicMed, momCut };
}
function scorer(list, F) {
  const maps = F.map(([f, s]) => [pctRankMap(list, f), f, s]);
  return (r) => mean(maps.map(([m, f, s]) => { const p = m(get(r, f)); return p == null ? null : (s > 0 ? p : 1 - p); }));
}
function top3(scored, div) {
  const out = [], used = new Set();
  for (const [r] of scored) {
    if (out.length >= 3) break;
    const s = secOf(r);
    if (div && s && used.has(s)) continue;
    if (s) used.add(s);
    out.push(r);
  }
  return out;
}

const byDate = new Map();
for (const r of P.rows) { const d = get(r, "ym"); if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();
const UNI = { dev: [1, DEV], holdout: [DEV + 1, 2 * DEV] };
const res = { country: C, scores: SCORES, gates: GATES, split: SPLIT, dates: [dates[0], dates[dates.length - 1]], sims: SIMS, universes: {} };

for (const [un, [lo, hi]] of Object.entries(UNI)) {
  const months = [];
  const ic = {}; SN.forEach((k) => { ic[k] = []; });
  const g3 = { NI: [], ISS: [], AG: [], SROA: [], AGhi: [], pass: [] };   // 관문 항목별(보고용): {ex6, big12, crash}
  const rand = rng(C === "us" ? 20261028 : 1028 + lo);
  for (const d of dates) {
    const pool = byDate.get(d).filter((r) => get(r, "rank") >= lo && get(r, "rank") <= hi);
    if (pool.length < 100) continue;
    const half = d < SPLIT ? "h1" : "h2";
    const G = gateOf(pool);
    const mr = {}; [3, 6, 12].forEach((h) => { mr[h] = mean(pool.map((r) => get(r, "r" + h))); });
    const ex = (r, h) => (ok(get(r, "r" + h)) && mr[h] != null ? get(r, "r" + h) - mr[h] : null);
    const crash = (r) => (ok(get(r, "r12")) ? (get(r, "r12") < -0.3 ? 1 : 0) : null);
    const big = (r) => { const e = ex(r, 12); return ok(e) ? (e >= 0.3 ? 1 : 0) : null; };
    const pr = {}; ["EP", "BP", "DY", "MOM"].forEach((f) => { pr[f] = pctRankMap(pool, f); });
    // G3 — 관문 항목별 걸린 종목과 통과 종목(주식 수 값이 있는 종목만, 앱과 같은 평가 대상)
    {
      const ev = pool.filter((r) => ok(get(r, "ISS")) || get(r, "niPos") === 0);
      const grp = { NI: [], ISS: [], AG: [], SROA: [], AGhi: [], pass: [] };
      for (const r of ev) {
        const w = G.why(r, false);
        if (w) grp[w].push(r); else grp.pass.push(r);
        if (w === "AG" && !G.why(r, true)) grp.AGhi.push(r);
      }
      for (const k of Object.keys(grp)) if (grp[k].length >= 3) g3[k].push({ half, ex6: mean(grp[k].map((r) => ex(r, 6))), big12: mean(grp[k].map(big)), crash: mean(grp[k].map(crash)), n: grp[k].length });
    }
    // IC — 지금 관문(H) 통과·주식 수 값 있는 종목 전체
    const evalH = pool.filter(G.pass.H).filter((r) => ok(get(r, "ISS")));
    for (const k of SN) {
      const sc = scorer(evalH, SCORES[k]); const xs = [], ys = [];
      evalH.forEach((r) => { const v = sc(r), y = get(r, "r6"); if (v != null && ok(y)) { xs.push(v); ys.push(y); } });
      ic[k].push({ half, v: xs.length >= MINN ? spearman(xs, ys) : null });
    }
    // 풀 시뮬레이션
    const acc = {}; KEYS.forEach((k) => { acc[k] = {}; MET.forEach((m) => { acc[k][m] = []; }); });
    for (let s = 0; s < SIMS; s++) {
      const idx = [], used = new Set();
      while (idx.length < Math.min(POOLN, pool.length)) { const j = Math.floor(rand() * pool.length); if (!used.has(j)) { used.add(j); idx.push(j); } }
      const raw = idx.map((j) => pool[j]).filter((r) => ok(get(r, "ISS")));
      const samp = {}; for (const g of GATES) samp[g] = raw.filter(G.pass[g]);
      if (samp.H.length < 6) continue;
      const shuffled = samp.H.slice(); for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
      const pickOf = {};
      for (const g of GATES) {
        if (samp[g].length < 3) continue;
        for (const k of SN) { const sc = scorer(samp[g], SCORES[k]); pickOf[k + "|" + g] = top3(samp[g].map((r) => [r, sc(r)]).filter((x) => x[1] != null).sort((a, b) => b[1] - a[1]), DIVERSIFY); }
      }
      pickOf.RAND = shuffled.slice(0, 3);
      for (const k of KEYS) {
        const top = pickOf[k]; if (!top || !top.length) continue;
        const e6 = top.map((r) => ex(r, 6)), e12 = top.map((r) => ex(r, 12));
        acc[k].ex3.push(mean(top.map((r) => ex(r, 3)))); acc[k].ex6.push(mean(e6)); acc[k].ex12.push(mean(e12));
        acc[k].up6.push(mean(e6.filter(ok).map((v) => (v > 0 ? 1 : 0))));
        acc[k].big12.push(mean(top.map(big))); acc[k].crash.push(mean(top.map(crash)));
        acc[k].fin.push(mean(top.map((r) => (get(r, "fin") ? 1 : 0))));
        acc[k].pEP.push(mean(top.map((r) => pr.EP(get(r, "EP"))))); acc[k].pBP.push(mean(top.map((r) => pr.BP(get(r, "BP")))));
        acc[k].pDY.push(mean(top.map((r) => pr.DY(get(r, "DY"))))); acc[k].pMOM.push(mean(top.map((r) => pr.MOM(get(r, "MOM")))));
      }
    }
    const v = {}; KEYS.forEach((k) => { v[k] = {}; MET.forEach((m) => { v[k][m] = mean(acc[k][m]); }); });
    months.push({ d, half, v });
  }
  // 모으기
  const r4 = (x) => (x == null ? null : Math.round(x * 10000) / 10000), t2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
  const U = { level: {}, diff: {}, ic: {}, icDiff: {}, g3: {}, months: months.length };
  for (const k of KEYS) { U.level[k] = {}; for (const m of MET) U.level[k][m] = { all: r4(mean(months.map((x) => x.v[k][m]))), h1: r4(mean(months.filter((x) => x.half === "h1").map((x) => x.v[k][m]))), h2: r4(mean(months.filter((x) => x.half === "h2").map((x) => x.v[k][m]))) }; }
  const dif = (a, b) => {
    const o = { a, b };
    for (const m of ["ex3", "ex6", "ex12", "up6", "big12", "crash"]) {
      const dd = months.map((x) => (ok(x.v[a][m]) && ok(x.v[b][m]) ? { half: x.half, y: x.d.slice(0, 4), v: x.v[a][m] - x.v[b][m] } : null)).filter(Boolean);
      const s = nw(dd.map((x) => x.v), m === "ex3" ? 2 : m === "ex6" || m === "up6" ? 5 : 11);
      const yr = {}; dd.forEach((x) => { (yr[x.y] = yr[x.y] || []).push(x.v); });
      o[m] = { all: r4(s.mean), t: t2(s.t), h1: r4(mean(dd.filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(dd.filter((x) => x.half === "h2").map((x) => x.v))), n: s.n,
        years: Object.fromEntries(Object.entries(yr).map(([y, a2]) => [y, r4(mean(a2))])) };
    }
    return o;
  };
  // 점수 후보 vs S0(지금 관문), 관문 후보 vs 같은 점수의 지금 관문
  for (const k of SN) if (k !== "S0") U.diff[k + "|H"] = dif(k + "|H", "S0|H");
  for (const k of SN) for (const g of ["G1", "G2"]) U.diff[k + "|" + g] = dif(k + "|" + g, k + "|H");
  for (const k of SN) { const s = nw(ic[k].map((x) => x.v), 5); U.ic[k] = { all: r4(s.mean), t: t2(s.t), h1: r4(mean(ic[k].filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(ic[k].filter((x) => x.half === "h2").map((x) => x.v))) }; }
  for (const k of SN) {
    if (k === "S0") continue;
    const dd = ic[k].map((x, i) => (ok(x.v) && ok(ic.S0[i].v) ? x.v - ic.S0[i].v : null)).filter(ok);
    const s = nw(dd, 5); U.icDiff[k] = { all: r4(s.mean), t: t2(s.t) };
  }
  for (const k of Object.keys(g3)) U.g3[k] = { ex6: r4(mean(g3[k].map((x) => x.ex6))), big12: r4(mean(g3[k].map((x) => x.big12))), crash: r4(mean(g3[k].map((x) => x.crash))), n: Math.round(mean(g3[k].map((x) => x.n)) || 0), months: g3[k].length };
  U.byMonth = months;   // 탐색용(판정에는 쓰지 않는다)
  res.universes[un] = U;
}

// 판정(사전 등록 순서) — 나라 안에서
const D = res.universes.dev, Hd = res.universes.holdout;
const lv = (U, k, m) => U.level[k][m].all;
const passWith = (k, base) => {
  const d = D.diff[k], h = Hd.diff[k];
  const upOk = [D, Hd].every((U) => lv(U, k, "up6") >= lv(U, base, "up6") - 0.03);
  const crashOk = [D, Hd].every((U) => lv(U, k, "crash") <= lv(U, base, "crash") + 0.02 && lv(U, k, "crash") <= lv(U, "RAND", "crash"));
  return { devEx6: d.ex6.all, devT: d.ex6.t, h1: d.ex6.h1, h2: d.ex6.h2, holdEx6: h.ex6.all, upOk, crashOk,
    core: d.ex6.all >= 0.005 && d.ex6.t != null && d.ex6.t >= 2 && d.ex6.h1 > 0 && d.ex6.h2 > 0 && h.ex6.all > 0 && upOk && crashOk };
};
const J = { scores: [], gates: [] };
for (const k of SN) {
  if (k === "S0") continue;
  const p = passWith(k + "|H", "S0|H"), icOk = !(D.icDiff[k].t != null && D.icDiff[k].t <= -1);
  J.scores.push(Object.assign({ key: k, icT: D.icDiff[k].t, icOk, pass: p.core && icOk }, p));
}
const sPass = J.scores.filter((x) => x.pass).sort((a, b) => b.devEx6 - a.devEx6);
J.chosenInCountry = sPass.length ? sPass[0].key : "S0";
for (const g of ["G1", "G2"]) { const k = J.chosenInCountry + "|" + g, p = passWith(k, J.chosenInCountry + "|H"); J.gates.push(Object.assign({ key: k, pass: p.core }, p)); }
res.judge = J;
const OUT = arg("out");
if (OUT) fs.writeFileSync(OUT, JSON.stringify(res));

// 출력
const p = (v) => (v == null ? "  –  " : (v * 100).toFixed(1).padStart(5));
const sg = (v) => (v == null ? "   – " : ((v >= 0 ? "+" : "") + (v * 100).toFixed(2)).padStart(6));
const NAME = { S0: "지금", P1: "싼 정도 빼기", P2: "오름세 더하기", P3: "싼 정도→오름세", P4: "이익 개선 더하기", P5: "품질 성장" };
console.log("■ " + C + " · " + res.dates.join("~") + " · 풀 시뮬레이션 " + SIMS + "회/월" + (DIVERSIFY ? " · 업종 분산" : ""));
for (const un of ["dev", "holdout"]) {
  const U = res.universes[un];
  console.log("\n [" + (un === "dev" ? "개발" : "확인용") + "] " + U.months + "개월 — 1~3위: 6M·12M 평균 초과(%p) · 6M 오른 비율 · 12M 크게 오름(+30%p) · 폭락 · 금융 | 싼 정도 EP·BP·배당 · 오름세 MOM 백분위");
  for (const g of GATES) for (const k of SN) {
    const L = U.level[k + "|" + g];
    console.log("  " + (g + " " + NAME[k]).padEnd(16) + p(L.ex6.all) + p(L.ex12.all) + " · " + p(L.up6.all) + "% · " + p(L.big12.all) + "% · " + p(L.crash.all) + "% · " + p(L.fin.all) + "% | " + p(L.pEP.all) + p(L.pBP.all) + p(L.pDY.all) + " · " + p(L.pMOM.all));
  }
  const R = U.level.RAND; console.log("  " + "무작위 3".padEnd(16) + p(R.ex6.all) + p(R.ex12.all) + " · " + p(R.up6.all) + "% · " + p(R.big12.all) + "% · " + p(R.crash.all) + "% · " + p(R.fin.all) + "% | " + p(R.pEP.all) + p(R.pBP.all) + p(R.pDY.all) + " · " + p(R.pMOM.all));
  for (const [k, x] of Object.entries(U.diff)) console.log("  차이 " + k.padEnd(6) + " 6M " + sg(x.ex6.all) + "%p(t " + x.ex6.t + ", 전반 " + sg(x.ex6.h1) + "/후반 " + sg(x.ex6.h2) + ") · 12M " + sg(x.ex12.all) + " · 오른 비율 " + sg(x.up6.all) + " · 크게 오름 " + sg(x.big12.all) + " · 폭락 " + sg(x.crash.all) + " · 해마다 " + Object.entries(x.ex6.years).map(([y, v]) => y.slice(2) + ":" + (v * 100).toFixed(1)).join(" "));
  console.log("  IC 6M: " + SN.map((k) => k + " " + U.ic[k].all + "(" + U.ic[k].t + ")").join(" · ") + " | 차이 t: " + Object.entries(U.icDiff).map(([k, x]) => k + " " + x.t).join(" · "));
  console.log("  관문 항목별(G3, 보고용) 6M 초과·크게 오름·폭락·평균 종목 수: " + Object.entries(U.g3).map(([k, x]) => k + " " + p(x.ex6) + "/" + p(x.big12) + "/" + p(x.crash) + "/" + x.n).join(" · "));
}
console.log("\n 판정(나라 안): " + JSON.stringify(J));
