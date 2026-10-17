#!/usr/bin/env node
// 주제 기준 2차 연구 — 주제다움(정체성) 판정(README '2차 연구' 사전 등록, 2026-10-17)
// 사용: node scripts/research/theme/test-identity.js <캐시 폴더> <us|kr> [--combo "core:GPA,ROIC3;value:MAGIC"] [--pops] [--out 결과.json]
//   지표마다 ①수익 IC(6·12개월, 전반·후반, 뉴이-웨스트 t) ②충실도(주제의 약속 — 우량 다음 해 ROIC·성장 다음 해 매출 성장 IC,
//   저평가 다음 해 이익 붕괴 확률·배당 다음 해 삭감 확률의 3분위 상·하) ③12개월 −30% 대폭락 확률(3분위 상·하).
//   --pops: 정체성 조건(모집단) 현행 vs 대안 비교.
"use strict";
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const C = process.argv[3] || "us";
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const P = JSON.parse(fs.readFileSync(path.join(DIR, C, "panel.json"), "utf8"));
const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
const rows = P.rows;
const get = (r, f) => r[FI[f]];
const SPLIT = C === "us" ? "2019-01" : "2024-04";
const US = C === "us";
const CFG = US ? { core: 150, growth: 600, value: 800, dividend: 900, all: 1000 } : { core: 80, growth: 300, value: 400, dividend: 500, all: 600 };
const DYMIN = US ? 0.025 : 0.03;
const SIGN = { EP: 1, BP: 1, SP: 1, FCFP: 1, EBITEV: 1, DY: 1, SHY: 1, BUYY: 1, ROE: 1, ROA: 1, GPA: 1, OPA: 1, CFOA: 1, OPM: 1, ROIC: 1, ROIC3: 1, ACC: -1, LEV: -1, F: 1,
  SROA: -1, SOPM: -1, FCFM: 1, FCFNI: 1, NETCASH: 1, SG1: 1, SG3: 1, SGVOL: -1, SGAG: 1, OPG: 1, GPG: 1, DROA: 1, DGM: 1, AG: -1, ISS: -1, RDS: 1, RDA: 1, CAPEXA: 1,
  PAYOUT: -1, DGR: 1, DSTREAK: 1, COV: 1, MOM: 1, VOL: -1 };
const BASE = Object.keys(SIGN).filter((f) => f in FI);
const DERIVED = ["GSCORE", "MAGIC", "VALC"];
const OUTCOME = { core: "fROIC", growth: "fSG", value: "fTRAP", dividend: "dcut", all: "fROIC" };   // 충실도 결과 변수
const BINARY = { fTRAP: true, dcut: true };   // 3분위 상·하 확률로 판정(낮을수록 좋음)

const byDate = new Map();
for (const r of rows) { const d = get(r, "ym"); if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();
const mean = (a) => { const x = a.filter((v) => v != null && isFinite(v)); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
function pctRankMap(list, f, valFn) {
  const vf = valFn || ((r) => get(r, f));
  const xs = list.map(vf).filter((v) => v != null && isFinite(v)).sort((a, b) => a - b);
  return (v) => { if (v == null || !isFinite(v) || !xs.length) return null; let lo = 0, hi = xs.length; while (lo < hi) { const m = (lo + hi) >> 1; if (xs[m] < v) lo = m + 1; else hi = m; } return xs.length === 1 ? 0.5 : lo / (xs.length - 1); };
}
const median = (list, f) => { const xs = list.map((r) => get(r, f)).filter((v) => v != null && isFinite(v)).sort((a, b) => a - b); return xs.length ? xs[xs.length >> 1] : null; };

// 모집단 — alt=true 면 사전 등록한 대안 정체성 조건
function population(theme, list, alt) {
  const base = list.filter((r) => get(r, "rank") <= CFG[theme]);
  if (theme === "core") {
    const p = base.filter((r) => get(r, "opPos") === 1);
    if (!alt) return p;
    const m = median(p, "ROIC3"); return p.filter((r) => get(r, "ROIC3") != null && m != null && get(r, "ROIC3") >= m);
  }
  if (theme === "growth") {
    const p = base.filter((r) => get(r, "opPos") === 1 && !get(r, "fin"));
    return alt ? p.filter((r) => get(r, "SG3") != null && get(r, "SG3") >= 0.15 && get(r, "SG1") != null && get(r, "SG1") >= 0.10) : p.filter((r) => get(r, "SG1") != null && get(r, "SG1") >= 0.15);
  }
  if (theme === "value") {
    const [a, b] = alt ? ["EBITEV", "FCFP"] : ["EP", "BP"];
    const pa = pctRankMap(base, a), pb = pctRankMap(base, b);
    return base.filter((r) => get(r, "niPos") === 1 && ((pa(get(r, a)) ?? 0) >= 0.7 || (pb(get(r, b)) ?? 0) >= 0.7));
  }
  if (theme === "dividend") return base.filter((r) => get(r, "niPos") === 1 && get(r, "DY") != null && get(r, "DY") >= DYMIN);
  return base;
}
function ranks(a) {
  const idx = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]); const rk = new Array(a.length);
  for (let i = 0; i < idx.length;) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; const r = (i + j) / 2; for (let k = i; k <= j; k++) rk[idx[k][1]] = r; i = j + 1; }
  return rk;
}
function spearman(x, y) {
  const n = x.length; if (n < 3) return null; const rx = ranks(x), ry = ranks(y); const mx = (n - 1) / 2; let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { const a = rx[i] - mx, b = ry[i] - mx; sxy += a * b; sxx += a * a; syy += b * b; }
  return sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : null;
}
function nw(series, lag) {
  const x = series.filter((v) => v != null && isFinite(v)); const T = x.length; if (T < 6) return { mean: null, t: null, n: T };
  const m = x.reduce((s, v) => s + v, 0) / T; const g = (k) => { let s = 0; for (let i = k; i < T; i++) s += (x[i] - m) * (x[i - k] - m); return s / T; };
  let v = g(0); for (let k = 1; k <= lag; k++) v += 2 * (1 - k / (lag + 1)) * g(k);
  return { mean: m, t: v > 0 ? m / Math.sqrt(v / T) : null, n: T };
}
const COMBO = {};
(arg("combo") || "").split(";").filter(Boolean).forEach((p) => { const [th, nm, fs2] = p.split(":"); COMBO[th] = COMBO[th] || {}; COMBO[th][nm] = fs2.split(","); });

// 날짜별 파생 지표(모집단 안 상대값)
function derive(pop) {
  const D = new Map(); pop.forEach((r) => D.set(r, {}));
  // Mohanram G-score: 7신호(모집단 중앙값 기준)
  const md = {}; ["ROA", "CFOA", "SROA", "SGVOL", "RDA", "CAPEXA"].forEach((f) => { md[f] = median(pop, f); });
  pop.forEach((r) => {
    const s = [];
    const gt = (f) => (get(r, f) != null && md[f] != null ? (get(r, f) > md[f] ? 1 : 0) : null);
    const lt = (f) => (get(r, f) != null && md[f] != null ? (get(r, f) < md[f] ? 1 : 0) : null);
    s.push(gt("ROA"), gt("CFOA"), get(r, "CFOA") != null && get(r, "ROA") != null ? (get(r, "CFOA") > get(r, "ROA") ? 1 : 0) : null, lt("SROA"), lt("SGVOL"),
      md.RDA != null ? (get(r, "RDA") != null && get(r, "RDA") > md.RDA ? 1 : 0) : null, gt("CAPEXA"));
    const ok = s.filter((v) => v != null); D.get(r).GSCORE = ok.length >= 5 ? ok.reduce((a, b) => a + b, 0) * 7 / ok.length : null;
  });
  const comb = (fs3) => { const pr = fs3.map((f) => [f, pctRankMap(pop, f)]); return (r) => { const v = pr.map(([f, p]) => { const x = p(get(r, f)); return x == null ? null : SIGN[f] > 0 ? x : 1 - x; }).filter((x) => x != null); return v.length >= Math.ceil(fs3.length / 2) ? mean(v) : null; }; };
  const mg = comb(["EBITEV", "ROIC"]), vc = comb(["EP", "BP", "SP", "FCFP", "EBITEV"]);
  pop.forEach((r) => { D.get(r).MAGIC = mg(r); D.get(r).VALC = vc(r); });
  return D;
}

function evalTheme(theme) {
  const outF = OUTCOME[theme];
  const combos = COMBO[theme] || {};
  const facs = BASE.concat(DERIVED, Object.keys(combos));
  const S = {}; facs.forEach((f) => { S[f] = { ic6: [], ic12: [], fid: [], fidTop: [], fidBot: [], crTop: [], crBot: [] }; });
  let nd = 0;
  for (const d of dates) {
    const pop = population(theme, byDate.get(d), process.argv.includes("--alt"));
    if (pop.length < (US ? 30 : 20)) continue; nd++;
    const half = d < SPLIT ? "h1" : "h2";
    const D = derive(pop);
    const cv = {};
    for (const [nm, fs3] of Object.entries(combos)) {
      const pr = fs3.map((f) => [f, DERIVED.includes(f) ? pctRankMap(pop, null, (r) => D.get(r)[f]) : pctRankMap(pop, f)]);
      cv[nm] = new Map(pop.map((r) => { const v = pr.map(([f, p]) => { const raw = DERIVED.includes(f) ? D.get(r)[f] : get(r, f); const x = p(raw); return x == null ? null : (SIGN[f] || 1) > 0 ? x : 1 - x; }).filter((x) => x != null); return [r, v.length >= Math.ceil(fs3.length / 2) ? mean(v) : null]; }));
    }
    const val = (r, f) => { if (combos[f]) return cv[f].get(r); if (DERIVED.includes(f)) return D.get(r)[f]; const v = get(r, f); return v == null ? null : SIGN[f] * v; };
    for (const f of facs) {
      const L = pop.map((r) => [val(r, f), r]).filter(([v]) => v != null && isFinite(v));
      const icOf = (yf) => { const p = L.filter(([, r]) => get(r, yf) != null); return p.length >= (US ? 30 : 20) ? spearman(p.map((x) => x[0]), p.map(([, r]) => get(r, yf))) : null; };
      S[f].ic6.push({ half, v: icOf("r6") }); S[f].ic12.push({ half, v: icOf("r12") });
      if (!BINARY[outF]) S[f].fid.push({ half, v: icOf(outF) });
      if (L.length >= 30) {
        L.sort((a, b) => a[0] - b[0]); const k = Math.floor(L.length / 3), bot = L.slice(0, k).map((x) => x[1]), top = L.slice(L.length - k).map((x) => x[1]);
        const crash = (arr) => mean(arr.map((r) => (get(r, "r12") != null ? (get(r, "r12") < -0.3 ? 1 : 0) : null)));
        S[f].crTop.push({ half, v: crash(top) }); S[f].crBot.push({ half, v: crash(bot) });
        if (BINARY[outF]) { S[f].fidTop.push({ half, v: mean(top.map((r) => get(r, outF))) }); S[f].fidBot.push({ half, v: mean(bot.map((r) => get(r, outF))) }); }
      }
    }
  }
  const r4 = (v) => (v == null ? null : Math.round(v * 10000) / 10000);
  const hm = (arr, hf) => r4(mean(arr.filter((x) => !hf || x.half === hf).map((x) => x.v)));
  const res = {};
  for (const f of facs) {
    const s = S[f];
    const w = (arr, lag) => { const a = nw(arr.map((x) => x.v), lag), b = nw(arr.filter((x) => x.half === "h1").map((x) => x.v), lag), c = nw(arr.filter((x) => x.half === "h2").map((x) => x.v), lag); return { all: r4(a.mean), t: a.t == null ? null : Math.round(a.t * 100) / 100, h1: r4(b.mean), h2: r4(c.mean) }; };
    const o = { ic6: w(s.ic6, 5), ic12: w(s.ic12, 11), crash: { top: hm(s.crTop), bot: hm(s.crBot), topH1: hm(s.crTop, "h1"), topH2: hm(s.crTop, "h2"), botH1: hm(s.crBot, "h1"), botH2: hm(s.crBot, "h2") } };
    if (BINARY[outF]) o.fid = { top: hm(s.fidTop), bot: hm(s.fidBot), topH1: hm(s.fidTop, "h1"), topH2: hm(s.fidTop, "h2"), botH1: hm(s.fidBot, "h1"), botH2: hm(s.fidBot, "h2") };
    else o.fid = w(s.fid, 11);
    const fidPass = BINARY[outF] ? (o.fid.topH1 != null && o.fid.topH1 < o.fid.botH1 && o.fid.topH2 < o.fid.botH2) : (o.fid.h1 > 0 && o.fid.h2 > 0 && o.fid.t >= 2.5);
    const noHarm = o.ic6.t != null && o.ic6.t > -1 && !(o.ic12.h1 < 0 && o.ic12.h2 < 0);
    o.identity = fidPass && noHarm; o.fidPass = fidPass; o.noHarm = noHarm;
    o.returnPass = o.ic6.h1 > 0 && o.ic6.h2 > 0 && o.ic6.t >= 2.5 && !(o.ic12.h1 < 0) && !(o.ic12.h2 < 0);
    o.crashOk = o.crash.topH1 != null && o.crash.topH1 <= o.crash.botH1 && o.crash.topH2 <= o.crash.botH2;
    res[f] = o;
  }
  return { nDates: nd, factors: res };
}

function comparePops(theme) {
  const outF = OUTCOME[theme];
  const acc = { cur: { h1: [], h2: [] }, alt: { h1: [], h2: [] } };
  for (const d of dates) {
    const all = byDate.get(d).filter((r) => get(r, "rank") <= CFG.all);
    const mr = mean(all.map((r) => get(r, "r12")));
    const half = d < SPLIT ? "h1" : "h2";
    for (const k of ["cur", "alt"]) {
      const pop = population(theme, byDate.get(d), k === "alt");
      if (pop.length < (US ? 20 : 10)) continue;
      acc[k][half].push({ n: pop.length, out: mean(pop.map((r) => get(r, outF))), ex12: mr == null ? null : mean(pop.map((r) => (get(r, "r12") != null ? get(r, "r12") - mr : null))),
        crash: mean(pop.map((r) => (get(r, "r12") != null ? (get(r, "r12") < -0.3 ? 1 : 0) : null))) });
    }
  }
  const s = (arr, f) => mean(arr.map((x) => x[f]));
  const o = {};
  for (const k of ["cur", "alt"]) o[k] = ["h1", "h2"].map((h) => ({ n: Math.round(s(acc[k][h], "n") || 0), out: s(acc[k][h], "out"), ex12: s(acc[k][h], "ex12"), crash: s(acc[k][h], "crash") }));
  const better = (a, b) => (BINARY[outF] ? a < b : a > b);
  o.pass = [0, 1].every((i) => o.alt[i].out != null && better(o.alt[i].out, o.cur[i].out) && o.alt[i].ex12 >= o.cur[i].ex12 - 0.005);
  return o;
}

const out = { country: C, themes: {}, pops: {} };
const p = (v, d = 3) => (v == null ? "  –  " : v.toFixed(d).padStart(6));
const pc = (v) => (v == null ? " – " : (v * 100).toFixed(1).padStart(5));
for (const th of ["core", "growth", "value", "dividend"]) {
  const r = evalTheme(th); out.themes[th] = r;
  const outF = OUTCOME[th];
  console.log("\n■ " + C + "/" + th + " (날짜 " + r.nDates + ") — 충실도 = " + outF + (BINARY[outF] ? " 확률(상/하 3분위, 전반|후반)" : " IC(t | 전반 후반)"));
  console.log("  지표       충실도                          수익 IC6 (t | 전반 후반)        IC12(전반 후반)  대폭락 상/하   판정");
  const keys = Object.keys(r.factors).sort((a, b) => {
    const fa = r.factors[a].fid, fb = r.factors[b].fid;
    return BINARY[outF] ? ((fa.top - fa.bot) || 0) - ((fb.top - fb.bot) || 0) : (fb.t || -99) - (fa.t || -99);
  });
  for (const f of keys) {
    const o = r.factors[f], fd = o.fid;
    const fidS = BINARY[outF] ? pc(fd.topH1) + "/" + pc(fd.botH1) + " | " + pc(fd.topH2) + "/" + pc(fd.botH2) + "  " : p(fd.all) + " (" + p(fd.t, 1) + " | " + p(fd.h1) + " " + p(fd.h2) + ")  ";
    console.log("  " + f.padEnd(9) + " " + fidS + p(o.ic6.all) + " (" + p(o.ic6.t, 1) + " | " + p(o.ic6.h1) + " " + p(o.ic6.h2) + ")  " + p(o.ic12.h1) + " " + p(o.ic12.h2) + "   " +
      pc(o.crash.top) + "/" + pc(o.crash.bot) + "  " + (o.identity ? "✓정체성 " : o.fidPass ? "(충실·수익해침) " : "") + (o.returnPass ? "✓수익" : ""));
  }
  if (process.argv.includes("--pops")) {
    const c = comparePops(th); out.pops[th] = c;
    const f = (x) => "n" + x.n + " " + outF + " " + (x.out == null ? "–" : (x.out * 100).toFixed(1)) + " · 12M초과 " + (x.ex12 == null ? "–" : (x.ex12 * 100).toFixed(1)) + "%p · 폭락 " + (x.crash == null ? "–" : (x.crash * 100).toFixed(1));
    console.log("  [모집단] 현행 전반 " + f(c.cur[0]) + " | 후반 " + f(c.cur[1]));
    console.log("  [모집단] 대안 전반 " + f(c.alt[0]) + " | 후반 " + f(c.alt[1]) + (c.pass ? "  ✓ 대안 채택" : ""));
  }
}
const OUT = arg("out");
if (OUT) { fs.writeFileSync(OUT, JSON.stringify(out, null, 1)); console.log("\n→ " + OUT); }
