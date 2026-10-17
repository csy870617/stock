#!/usr/bin/env node
// 주제 기준 연구 — 사전 등록(README.md) 평가 실행(2026-10-17)
// 사용: node scripts/research/theme/test-factors.js <캐시 폴더> <us|kr> [--out 결과.json] [--combo "growth:GPA,ROE;value:EP,F"]
//   주제별 모집단 안에서 지표 → 다음 1·3·6·12개월 초과수익(같은 날 모집단 평균 대비)의 날짜별 Spearman IC,
//   전반·후반, 뉴이-웨스트 t(겹침 시차 h−1), 3분위(상·하) 초과수익·승률·12개월 −30% 대폭락 확률·배당 삭감 확률,
//   건전성 필터(걸러지는 쪽 vs 남는 쪽)의 6개월 초과수익과 대폭락 확률.
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
const CFG = C === "us"
  ? { core: { rank: 150 }, growth: { rank: 600 }, value: { rank: 800 }, dividend: { rank: 900, dy: 0.025 }, all: { rank: 1000 } }
  : { core: { rank: 80 }, growth: { rank: 300 }, value: { rank: 400 }, dividend: { rank: 500, dy: 0.03 }, all: { rank: 600 } };
const SIGN = { EP: 1, BP: 1, SP: 1, FCFP: 1, EBITEV: 1, DY: 1, SHY: 1, ROE: 1, ROA: 1, GPA: 1, OPA: 1, CFOA: 1, ROIC: 1, ACC: -1, LEV: -1, F: 1, SROA: -1,
  SG1: 1, SG3: 1, OPG: 1, DROA: 1, DGM: 1, AG: -1, ISS: -1, PAYOUT: -1, DGR: 1, DSTREAK: 1, COV: 1, MOM: 1, VOL: -1 };
const FACTORS = Object.keys(SIGN).filter((f) => f in FI);
const H = [1, 3, 6, 12];

// 날짜별 묶음
const byDate = new Map();
for (const r of rows) { const d = get(r, "ym"); if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();

function pctRankMap(list, f) {
  const xs = list.map((r) => get(r, f)).filter((v) => v != null && isFinite(v)).sort((a, b) => a - b);
  return (v) => { if (v == null || !isFinite(v) || !xs.length) return null; let lo = 0, hi = xs.length; while (lo < hi) { const m = (lo + hi) >> 1; if (xs[m] < v) lo = m + 1; else hi = m; } return xs.length === 1 ? 0.5 : lo / (xs.length - 1); };
}
function population(theme, list) {
  const c = CFG[theme];
  const base = list.filter((r) => get(r, "rank") <= c.rank);
  if (theme === "core") return base.filter((r) => get(r, "opPos") === 1);
  if (theme === "growth") return base.filter((r) => get(r, "SG1") != null && get(r, "SG1") >= 0.15 && get(r, "opPos") === 1 && !get(r, "fin"));
  if (theme === "value") {
    const pe = pctRankMap(base, "EP"), pb = pctRankMap(base, "BP");
    return base.filter((r) => get(r, "niPos") === 1 && ((pe(get(r, "EP")) ?? 0) >= 0.7 || (pb(get(r, "BP")) ?? 0) >= 0.7));
  }
  if (theme === "dividend") return base.filter((r) => get(r, "niPos") === 1 && get(r, "DY") != null && get(r, "DY") >= c.dy);
  return base;
}
function ranks(a) {
  const idx = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]);
  const rk = new Array(a.length);
  for (let i = 0; i < idx.length;) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; const r = (i + j) / 2; for (let k = i; k <= j; k++) rk[idx[k][1]] = r; i = j + 1; }
  return rk;
}
function spearman(x, y) {
  const n = x.length; if (n < 3) return null;
  const rx = ranks(x), ry = ranks(y);
  const mx = (n - 1) / 2; let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { const a = rx[i] - mx, b = ry[i] - mx; sxy += a * b; sxx += a * a; syy += b * b; }
  return sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : null;
}
function nw(series, lag) {
  const x = series.filter((v) => v != null && isFinite(v)); const T = x.length; if (T < 6) return { mean: null, t: null, n: T };
  const m = x.reduce((s, v) => s + v, 0) / T;
  const g = (k) => { let s = 0; for (let i = k; i < T; i++) s += (x[i] - m) * (x[i - k] - m); return s / T; };
  let v = g(0); for (let k = 1; k <= lag; k++) v += 2 * (1 - k / (lag + 1)) * g(k);
  return { mean: m, t: v > 0 ? m / Math.sqrt(v / T) : null, n: T };
}
const mean = (a) => { const x = a.filter((v) => v != null && isFinite(v)); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };

// 조합 점수(채택 지표 백분위 평균) — --combo "growth:GPA,ROE;value:EP,F"
const COMBO = {};
(arg("combo") || "").split(";").filter(Boolean).forEach((p) => { const [th, fs2] = p.split(":"); COMBO[th] = fs2.split(","); });

function evalTheme(theme) {
  const out = { theme, nDates: 0, avgN: 0, factors: {}, filters: {} };
  const facs = FACTORS.concat(COMBO[theme] ? ["COMBO"] : []);
  const ic = {}; facs.forEach((f) => { ic[f] = {}; H.forEach((h) => { ic[f][h] = []; }); });
  const terc = {}; facs.forEach((f) => { terc[f] = { top6: [], bot6: [], top12: [], bot12: [], hitTop12: [], hitBot12: [], crashTop: [], crashBot: [], cutTop: [], cutBot: [] }; });
  const FILT = {
    "F≤3": (r, pop) => get(r, "F") != null && get(r, "F") <= 3,
    "발생액 상위10%": null, "부채/자산 상위10%": null, "자산증가 상위10%": null, "이익 변동 상위10%": null, "주가 변동성 상위10%": null,
    "적자(순이익<0)": (r) => get(r, "niPos") === 0,
    "희석 >5%": (r) => get(r, "ISS") != null && get(r, "ISS") > 0.05,
    "배당성향 >100%": (r) => get(r, "PAYOUT") != null && get(r, "PAYOUT") > 1,
    "FCF<배당": (r) => get(r, "COV") != null && get(r, "COV") < 1,
    "매출 역성장": (r) => get(r, "SG1") != null && get(r, "SG1") < 0,
  };
  const DEC = { "발생액 상위10%": ["ACC", 0.9], "부채/자산 상위10%": ["LEV", 0.9], "자산증가 상위10%": ["AG", 0.9], "이익 변동 상위10%": ["SROA", 0.9], "주가 변동성 상위10%": ["VOL", 0.9] };
  const fstat = {}; Object.keys(FILT).forEach((k) => { fstat[k] = { h1: { ex: [], kept: [], crEx: [], crKept: [], nEx: 0 }, h2: { ex: [], kept: [], crEx: [], crKept: [], nEx: 0 } }; });
  let nn = 0;
  for (const d of dates) {
    const pop = population(theme, byDate.get(d));
    if (pop.length < (C === "us" ? 30 : 20)) continue;
    out.nDates++; nn += pop.length;
    const half = d < SPLIT ? "h1" : "h2";
    // 수익률 평균(모집단)
    const mr = {}; H.forEach((h) => { mr[h] = mean(pop.map((r) => get(r, "r" + h))); });
    const comboVal = new Map();
    if (COMBO[theme]) {
      const prm = COMBO[theme].map((f) => [f, pctRankMap(pop, f)]);
      pop.forEach((r) => { const v = prm.map(([f, pr]) => { const x = pr(get(r, f)); return x == null ? null : (SIGN[f] > 0 ? x : 1 - x); }).filter((x) => x != null); comboVal.set(r, v.length >= Math.ceil(COMBO[theme].length / 2) ? mean(v) : null); });
    }
    const val = (r, f) => (f === "COMBO" ? comboVal.get(r) : (get(r, f) == null ? null : SIGN[f] * get(r, f)));
    for (const f of facs) {
      for (const h of H) {
        const xs = [], ys = [];
        for (const r of pop) { const v = val(r, f), y = get(r, "r" + h); if (v != null && isFinite(v) && y != null) { xs.push(v); ys.push(y); } }
        ic[f][h].push({ d, half, v: xs.length >= (C === "us" ? 30 : 20) ? spearman(xs, ys) : null, n: xs.length });
      }
      // 3분위
      const L = pop.filter((r) => val(r, f) != null && isFinite(val(r, f))).sort((a, b) => val(a, f) - val(b, f));
      if (L.length >= 30) {
        const k = Math.floor(L.length / 3), bot = L.slice(0, k), top = L.slice(L.length - k);
        const ex = (arr, h) => mean(arr.map((r) => (get(r, "r" + h) != null && mr[h] != null ? get(r, "r" + h) - mr[h] : null)));
        const hit = (arr) => mean(arr.map((r) => (get(r, "r12") != null && mr[12] != null ? (get(r, "r12") > mr[12] ? 1 : 0) : null)));
        const crash = (arr) => mean(arr.map((r) => (get(r, "r12") != null ? (get(r, "r12") < -0.3 ? 1 : 0) : null)));
        const cut = (arr) => mean(arr.map((r) => get(r, "dcut")));
        const T0 = terc[f];
        T0.top6.push({ half, v: ex(top, 6) }); T0.bot6.push({ half, v: ex(bot, 6) }); T0.top12.push({ half, v: ex(top, 12) }); T0.bot12.push({ half, v: ex(bot, 12) });
        T0.hitTop12.push({ half, v: hit(top) }); T0.hitBot12.push({ half, v: hit(bot) }); T0.crashTop.push({ half, v: crash(top) }); T0.crashBot.push({ half, v: crash(bot) });
        T0.cutTop.push({ half, v: cut(top) }); T0.cutBot.push({ half, v: cut(bot) });
      }
    }
    // 필터
    const decCut = {}; Object.keys(DEC).forEach((k) => { const [f, q] = DEC[k]; const xs = pop.map((r) => get(r, f)).filter((v) => v != null && isFinite(v)).sort((a, b) => a - b); decCut[k] = xs.length >= 30 ? xs[Math.floor(xs.length * q)] : null; });
    for (const k of Object.keys(FILT)) {
      const isEx = FILT[k] || ((r) => { const [f] = DEC[k]; return decCut[k] != null && get(r, f) != null && get(r, f) >= decCut[k]; });
      const ex = pop.filter((r) => isEx(r, pop)), kept = pop.filter((r) => !isEx(r, pop));
      if (ex.length < 3 || kept.length < 10) continue;
      const S = fstat[k][half];
      S.nEx += ex.length;
      S.ex.push(mean(ex.map((r) => (get(r, "r6") != null && mr[6] != null ? get(r, "r6") - mr[6] : null))));
      S.kept.push(mean(kept.map((r) => (get(r, "r6") != null && mr[6] != null ? get(r, "r6") - mr[6] : null))));
      S.crEx.push(mean(ex.map((r) => (get(r, "r12") != null ? (get(r, "r12") < -0.3 ? 1 : 0) : null))));
      S.crKept.push(mean(kept.map((r) => (get(r, "r12") != null ? (get(r, "r12") < -0.3 ? 1 : 0) : null))));
    }
  }
  out.avgN = out.nDates ? Math.round(nn / out.nDates) : 0;
  const r4 = (v) => (v == null ? null : Math.round(v * 10000) / 10000);
  for (const f of facs) {
    const o = {};
    for (const h of H) {
      const s = ic[f][h];
      const all = nw(s.map((x) => x.v), h - 1), a = nw(s.filter((x) => x.half === "h1").map((x) => x.v), h - 1), b = nw(s.filter((x) => x.half === "h2").map((x) => x.v), h - 1);
      o["ic" + h] = { all: r4(all.mean), t: all.t == null ? null : Math.round(all.t * 100) / 100, h1: r4(a.mean), h2: r4(b.mean), n: all.n, cov: Math.round(mean(s.map((x) => x.n)) || 0) };
    }
    const T0 = terc[f], hm = (arr, hf) => r4(mean(arr.filter((x) => !hf || x.half === hf).map((x) => x.v)));
    o.terc = { top6: hm(T0.top6), bot6: hm(T0.bot6), top12: hm(T0.top12), bot12: hm(T0.bot12),
      top12h1: hm(T0.top12, "h1"), top12h2: hm(T0.top12, "h2"), bot12h1: hm(T0.bot12, "h1"), bot12h2: hm(T0.bot12, "h2"),
      hitTop: hm(T0.hitTop12), hitBot: hm(T0.hitBot12), crashTop: hm(T0.crashTop), crashBot: hm(T0.crashBot),
      crashTopH1: hm(T0.crashTop, "h1"), crashTopH2: hm(T0.crashTop, "h2"), crashBotH1: hm(T0.crashBot, "h1"), crashBotH2: hm(T0.crashBot, "h2"),
      cutTop: hm(T0.cutTop), cutBot: hm(T0.cutBot) };
    const ic6 = o.ic6, ic12 = o.ic12;
    o.pass = ic6.h1 > 0 && ic6.h2 > 0 && ic6.t != null && ic6.t >= 2.5 && !(ic12.h1 < 0) && !(ic12.h2 < 0);
    out.factors[f] = o;
  }
  for (const k of Object.keys(FILT)) {
    const o = {};
    ["h1", "h2"].forEach((hf) => { const S = fstat[k][hf]; o[hf] = { ex6: r4(mean(S.ex)), kept6: r4(mean(S.kept)), crashEx: r4(mean(S.crEx)), crashKept: r4(mean(S.crKept)), nEx: S.nEx }; });
    o.pass = ["h1", "h2"].every((hf) => o[hf].ex6 != null && o[hf].ex6 < o[hf].kept6 && o[hf].crashEx > o[hf].crashKept);
    out.filters[k] = o;
  }
  return out;
}

const res = { country: C, split: SPLIT, dates: [dates[0], dates[dates.length - 1]], themes: {} };
for (const th of Object.keys(CFG)) {
  const r = evalTheme(th);
  res.themes[th] = r;
  console.log("\n■ " + C + "/" + th + " — 날짜 " + r.nDates + " · 평균 모집단 " + r.avgN);
  console.log("  지표      IC6(전체 t | 전반 후반)        IC12(전반 후반)   상위−하위 12M 초과   대폭락 상/하    승률 상/하   배당삭감 상/하  판정");
  const fx = Object.keys(r.factors).sort((a, b) => (r.factors[b].ic6.t || -99) - (r.factors[a].ic6.t || -99));
  for (const f of fx) {
    const o = r.factors[f], t = o.terc, p = (v) => (v == null ? "  –  " : (v * 100).toFixed(1).padStart(5));
    console.log("  " + f.padEnd(8) + " " + (o.ic6.all == null ? "  –  " : o.ic6.all.toFixed(3).padStart(6)) + " (" + (o.ic6.t == null ? " – " : o.ic6.t.toFixed(1).padStart(5)) + " | " +
      (o.ic6.h1 == null ? " – " : o.ic6.h1.toFixed(3).padStart(6)) + " " + (o.ic6.h2 == null ? " – " : o.ic6.h2.toFixed(3).padStart(6)) + ")  " +
      (o.ic12.h1 == null ? " – " : o.ic12.h1.toFixed(3).padStart(6)) + " " + (o.ic12.h2 == null ? " – " : o.ic12.h2.toFixed(3).padStart(6)) + "     " +
      (t.top12 != null && t.bot12 != null ? p(t.top12 - t.bot12) : "  –  ") + "%p       " + p(t.crashTop) + "/" + p(t.crashBot) + "   " + p(t.hitTop) + "/" + p(t.hitBot) + "   " + p(t.cutTop) + "/" + p(t.cutBot) +
      "   " + (o.pass ? "✓ 채택" : "") + "  [n≈" + o.ic6.cov + "]");
  }
  console.log("  건전성 필터(걸러지는 쪽 vs 남는 쪽: 6M 초과%·12M 대폭락% — 전반 | 후반)");
  for (const k of Object.keys(r.filters)) {
    const o = r.filters[k], p = (v) => (v == null ? "–" : (v * 100).toFixed(1));
    console.log("   " + k.padEnd(14) + " 전반 " + p(o.h1.ex6) + " vs " + p(o.h1.kept6) + " · 폭락 " + p(o.h1.crashEx) + " vs " + p(o.h1.crashKept) + "  | 후반 " + p(o.h2.ex6) + " vs " + p(o.h2.kept6) + " · 폭락 " + p(o.h2.crashEx) + " vs " + p(o.h2.crashKept) +
      "  (n " + o.h1.nEx + "/" + o.h2.nEx + ")" + (o.pass ? "  ✓ 채택" : ""));
  }
}
const OUT = arg("out");
if (OUT) { fs.writeFileSync(OUT, JSON.stringify(res, null, 1)); console.log("\n→ " + OUT); }
