#!/usr/bin/env node
// Top Pick 6차 — '미래 성장'(PREREG-6.md): 애널리스트 기대 상향(F1)·기대 수준(F2, 미국)·성장 예측(F3)·둘 다(F4)와 관문 Q1 을 지금 규칙(S0)과 견준다
// 사용: node scripts/research/top-pick/test-future.js <테마 캐시> <리포트 캐시> <us|kr> [--out 결과.json] [--sims 200]
//   테마 캐시 = research/theme 의 panel·px(분할)·us/universe.json(업종)·us/analyst(fetch-analyst-us.js), 리포트 캐시 = tgt-kr(fetch-tgt-kr.js).
//   한국 F3 은 같은 날짜의 미국 계수를 쓰므로 미국 패널도 읽는다. 판정 합치기: --judge us.json kr.json
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

// ── 두 나라 결과 합치기(다른 나라에서 같은 후보가 개발 차이 t ≤ −2 면 채택하지 않는다) ──
if (process.argv.includes("--judge")) {
  const i = process.argv.indexOf("--judge"), A = JSON.parse(fs.readFileSync(process.argv[i + 1], "utf8")), B = JSON.parse(fs.readFileSync(process.argv[i + 2], "utf8"));
  const by = { [A.country]: A, [B.country]: B };
  const out = {};
  for (const c of Object.keys(by)) {
    const me = by[c], other = by[c === "us" ? "kr" : "us"], J = me.judge;
    const opp = (k) => { const d = other.universes.dev.diff[k + "|H"]; return !!(d && d.ex6 && d.ex6.t != null && d.ex6.t <= -2); };
    const passS = J.scores.filter((x) => x.pass && !opp(x.key));
    out[c] = { scorePass: J.scores.filter((x) => x.pass).map((x) => x.key), blockedByOther: J.scores.filter((x) => x.pass && opp(x.key)).map((x) => x.key),
      chosen: passS.length ? passS.sort((a, b) => b.devEx6 - a.devEx6)[0].key : "S0", gate: J.gate };
  }
  console.log(JSON.stringify(out, null, 1));
  process.exit(0);
}

const TDIR = path.resolve(process.argv[2] || "theme-cache"), RDIR = path.resolve(process.argv[3] || "research-cache");
const C = process.argv[4] || "us";
const SIMS = +(arg("sims") || 200), POOLN = 40;
const addM = (ym, k) => { const y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1 + k; const yy = y + Math.floor(m / 12), mm = ((m % 12) + 12) % 12; return yy + "-" + String(mm + 1).padStart(2, "0"); };
const monthEnd = (ym) => { const d = new Date(Date.UTC(+ym.slice(0, 4), +ym.slice(5, 7), 0)); return d.toISOString().slice(0, 10); };
const dayShift = (iso, k) => new Date(Date.parse(iso + "T00:00:00Z") + k * 864e5).toISOString().slice(0, 10);

function loadPanel(c) {
  const P = JSON.parse(fs.readFileSync(path.join(TDIR, c, "panel.json"), "utf8"));
  const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
  for (const r of P.rows) { const v = r[FI.ISS]; if (v != null && v < -0.2) r[FI.ISS] = 0; }   // 앱과 같은 자료 정리
  return { P, FI };
}
function pctRankMap(vals) {
  const xs = vals.filter(ok).sort((a, b) => a - b);
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
function solve(A, b) {   // 가우스 소거(작은 능선 0 근처 — 안정용)
  const n = b.length, M = A.map((row, i) => row.slice().concat([b[i]]));
  for (let i = 0; i < n; i++) M[i][i] += 1e-9;
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    if (Math.abs(M[c][c]) < 1e-12) return null;
    for (let r = 0; r < n; r++) { if (r === c) continue; const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
  }
  return M.map((row, i) => row[n] / row[i]);
}

// ── F3: 다음 해 매출 성장 예측(그 달 안 백분위 회귀, 결과가 알려진 행만으로 학습) ──
const PRED = ["SG1", "SG3", "SGVOL", "OPG", "OPM", "DGM", "ROIC", "DROA", "AG", "CAPEXA", "FCFM"];
const xRow = (maps, FI, r) => [1].concat(PRED.map((f, k) => { const p = maps[k](r[FI[f]]); return p == null ? 0.5 : p; }));
function monthMaps(rows, FI) { return PRED.map((f) => pctRankMap(rows.map((r) => r[FI[f]]))); }
// 미국 개발 유니버스로 달마다 학습 합(X'X, X'y)을 만들고, t 의 계수 = 행 날짜 ≤ t − 13개월 누적(학습 달 24개 이상)
function usBetas() {
  const { P, FI } = C === "us" ? MAIN : loadPanel("us");
  const by = new Map();
  for (const r of P.rows) { if (r[FI.rank] > 500) continue; const d = r[FI.ym]; if (!by.has(d)) by.set(d, []); by.get(d).push(r); }
  const months = [...by.keys()].sort(), K = PRED.length + 1;
  const sums = new Map();
  for (const d of months) {
    const rows = by.get(d), withY = rows.filter((r) => ok(r[FI.fSG]));
    if (withY.length < 50) continue;
    const maps = monthMaps(rows, FI), ym = pctRankMap(withY.map((r) => r[FI.fSG]));
    const A = Array.from({ length: K }, () => new Array(K).fill(0)), b = new Array(K).fill(0);
    for (const r of withY) { const x = xRow(maps, FI, r), y = ym(r[FI.fSG]); for (let i = 0; i < K; i++) { b[i] += x[i] * y; for (let j = 0; j < K; j++) A[i][j] += x[i] * x[j]; } }
    sums.set(d, { A, b });
  }
  const trainMonths = [...sums.keys()].sort();
  return (t) => {
    const lim = addM(t, -13), use = trainMonths.filter((d) => d <= lim);
    if (use.length < 24) return null;
    const A = Array.from({ length: K }, () => new Array(K).fill(0)), b = new Array(K).fill(0);
    for (const d of use) { const s = sums.get(d); for (let i = 0; i < K; i++) { b[i] += s.b[i]; for (let j = 0; j < K; j++) A[i][j] += s.A[i][j]; } }
    return solve(A, b);
  };
}

// ── F1·F2: 애널리스트 컨센서스 목표가(월말, 지난 180일 증권사별 최신, 그 뒤 분할로 나눠 지금 단위) ──
function loadPx(t) { try { return JSON.parse(fs.readFileSync(path.join(TDIR, C, "px", t + ".json"), "utf8")); } catch (_e) { return null; } }
function loadAnalyst(t) {
  try {
    if (C === "us") return JSON.parse(fs.readFileSync(path.join(TDIR, "us", "analyst", t + ".json"), "utf8"))
      .filter((x) => x[4] > 0).map((x) => ({ d: new Date(x[0] * 1000).toISOString().slice(0, 10), f: x[1], g: x[4] }));
    return JSON.parse(fs.readFileSync(path.join(RDIR, "tgt-kr", t + ".json"), "utf8")).filter((x) => x.goal > 0).map((x) => ({ d: x.d, f: x.broker, g: x.goal }));
  } catch (_e) { return null; }
}
const MINF = C === "us" ? 3 : 2;
function consensusSeries(t, months) {
  const px = loadPx(t), ev = loadAnalyst(t);
  if (!px || !ev || !ev.length) return null;
  const ci = new Map(px.d.map((d, i) => [d, i]));
  const splitAfter = (d) => (px.splits || []).filter((s) => s[0] > d).reduce((p, s) => p * s[1], 1);
  const items = [];
  for (const e of ev) {
    const g = e.g / splitAfter(e.d), i = ci.get(e.d.slice(0, 7)), c = i != null ? px.c[i] : null;
    if (!ok(c) || !(c > 0) || g / c < 0.2 || g / c > 5) continue;   // 자료 오류(단위·분할 어긋남)
    items.push({ d: e.d, f: e.f, g });
  }
  items.sort((a, b) => (a.d < b.d ? -1 : a.d > b.d ? 1 : 0));
  const out = new Map(); const last = new Map(); let k = 0;
  for (const ym of months) {
    const end = monthEnd(ym), from = dayShift(end, -180);
    while (k < items.length && items[k].d <= end) { last.set(items[k].f, items[k]); k++; }
    const live = [...last.values()].filter((x) => x.d > from);
    const i = ci.get(ym), c = i != null ? px.c[i] : null;
    if (live.length >= MINF) out.set(ym, { cons: mean(live.map((x) => x.g)), c });
  }
  return out;
}

// ── 패널 + 새 열 ──
const MAIN = loadPanel(C);
const { P, FI } = MAIN;
["F1", "F2", "PG"].forEach((f) => { FI[f] = P.fields.length + ["F1", "F2", "PG"].indexOf(f); });
const get = (r, f) => (f in FI ? r[FI[f]] : null);
const byDate = new Map();
for (const r of P.rows) { const d = r[FI.ym]; if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();
const DEV = C === "us" ? 500 : 300, SPLIT = C === "us" ? "2019-01" : "2024-04", MINN = C === "us" ? 30 : 20;

{
  const tickers = [...new Set(P.rows.map((r) => r[FI.t]))];
  const series = new Map();
  let n = 0;
  for (const t of tickers) { const s = consensusSeries(t, dates); if (s) { series.set(t, s); n++; } }
  for (const r of P.rows) {
    const s = series.get(r[FI.t]), ym = r[FI.ym];
    const a = s && s.get(ym), b = s && s.get(addM(ym, -3));
    r.push(a && b && a.cons > 0 && b.cons > 0 ? Math.log(a.cons / b.cons) : null, a && ok(a.c) && a.c > 0 ? a.cons / a.c - 1 : null, null);
  }
  console.error("애널리스트 자료 " + n + "/" + tickers.length + "종목");
}
{
  const betaAt = usBetas();
  for (const d of dates) {
    const beta = betaAt(d); if (!beta) continue;
    const rows = byDate.get(d);
    for (const [lo, hi] of [[1, DEV], [DEV + 1, 2 * DEV]]) {
      const u = rows.filter((r) => r[FI.rank] >= lo && r[FI.rank] <= hi); if (!u.length) continue;
      const maps = monthMaps(u, FI);
      for (const r of u) { const x = xRow(maps, FI, r); r[FI.PG] = x.reduce((s, v, i) => s + v * beta[i], 0); }
    }
  }
}

// 평가 기간: 개발 유니버스 F1 값 30% 이상인 첫 달과 F3 첫 달 가운데 늦은 달
const cov = (d, lo, hi, f) => { const u = byDate.get(d).filter((r) => r[FI.rank] >= lo && r[FI.rank] <= hi); return u.length ? u.filter((r) => ok(get(r, f))).length / u.length : 0; };
const s1 = dates.find((d) => cov(d, 1, DEV, "F1") >= 0.3), s3 = dates.find((d) => cov(d, 1, DEV, "PG") > 0.5);
const START = [s1, s3].filter(Boolean).sort().pop();
const EVAL = dates.filter((d) => d >= START);

const SECT = {};
if (C === "us") for (const u of JSON.parse(fs.readFileSync(path.join(TDIR, "us", "universe.json"), "utf8"))) SECT[u.t] = SEC.usSector(u.sector);
const secOf = (r) => SECT[get(r, "t")] || null;
const DIVERSIFY = C === "us";

const BASE = C === "us" ? [["ISS", -1], ["SHY", 1], ["ROIC", 1]] : [["ISS", -1], ["DY", 1]];
const SCORES = { S0: BASE, F1: BASE.concat([["F1", 1]]) };
if (C === "us") SCORES.F2 = BASE.concat([["F2", 1]]);
Object.assign(SCORES, { F3: BASE.concat([["PG", 1]]), F4: BASE.concat([["F1", 1], ["PG", 1]]), O: BASE.concat([["fSG", 1]]) });
const SN = Object.keys(SCORES), GATES = ["H", "Q1"];
const KEYS = []; for (const g of GATES) for (const s of SN) KEYS.push(s + "|" + g); KEYS.push("RAND");
const MET = ["ex3", "ex6", "ex12", "up6", "big12", "crash", "fin", "pSG", "pF1", "pPG"];
const QCUT = Math.log(0.9);

function cutQ(list, f, q) { const xs = list.map((r) => get(r, f)).filter(ok).sort((a, b) => a - b); return xs.length >= 30 ? xs[Math.floor(xs.length * q)] : null; }
function gateOf(pool) {
  const agCut = cutQ(pool, "AG", 0.9), sCut = { 1: cutQ(pool.filter((r) => get(r, "fin")), "SROA", 0.9), 0: cutQ(pool.filter((r) => !get(r, "fin")), "SROA", 0.9) };
  const bad = (r) => {
    if (get(r, "niPos") === 0) return true;
    if (ok(get(r, "ISS")) && get(r, "ISS") > 0.05) return true;
    if (agCut != null && ok(get(r, "AG")) && get(r, "AG") >= agCut) return true;
    const sc = sCut[get(r, "fin") ? 1 : 0];
    return sc != null && ok(get(r, "SROA")) && get(r, "SROA") >= sc;
  };
  return { H: (r) => !bad(r), Q1: (r) => !bad(r) && !(ok(get(r, "F1")) && get(r, "F1") <= QCUT) };
}
function scorer(list, F) {
  const maps = F.map(([f, s]) => [pctRankMap(list.map((r) => get(r, f))), f, s]);
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

const UNI = { dev: [1, DEV], holdout: [DEV + 1, 2 * DEV] };
const res = { country: C, scores: SCORES, start: START, starts: { F1: s1, F3: s3 }, split: SPLIT, dates: [EVAL[0], EVAL[EVAL.length - 1]], sims: SIMS, universes: {} };

for (const [un, [lo, hi]] of Object.entries(UNI)) {
  const months = [], ic = {}; SN.forEach((k) => { ic[k] = []; });
  const acc3 = [], covF1 = [], covF2 = [];
  const rand = rng((C === "us" ? 20261028 : 1028) + lo);
  for (const d of EVAL) {
    const pool = byDate.get(d).filter((r) => get(r, "rank") >= lo && get(r, "rank") <= hi);
    if (pool.length < 100) continue;
    const half = d < SPLIT ? "h1" : "h2";
    covF1.push(pool.filter((r) => ok(get(r, "F1"))).length / pool.length);
    covF2.push(pool.filter((r) => ok(get(r, "F2"))).length / pool.length);
    { const xs = [], ys = []; pool.forEach((r) => { if (ok(get(r, "PG")) && ok(get(r, "fSG"))) { xs.push(get(r, "PG")); ys.push(get(r, "fSG")); } }); acc3.push(xs.length >= MINN ? spearman(xs, ys) : null); }
    const G = gateOf(pool);
    const mr = {}; [3, 6, 12].forEach((h) => { mr[h] = mean(pool.map((r) => get(r, "r" + h))); });
    const ex = (r, h) => (ok(get(r, "r" + h)) && mr[h] != null ? get(r, "r" + h) - mr[h] : null);
    const crash = (r) => (ok(get(r, "r12")) ? (get(r, "r12") < -0.3 ? 1 : 0) : null);
    const big = (r) => { const e = ex(r, 12); return ok(e) ? (e >= 0.3 ? 1 : 0) : null; };
    const pr = { fSG: pctRankMap(pool.map((r) => get(r, "fSG"))), F1: pctRankMap(pool.map((r) => get(r, "F1"))), PG: pctRankMap(pool.map((r) => get(r, "PG"))) };
    const evalH = pool.filter(G.H).filter((r) => ok(get(r, "ISS")));
    for (const k of SN) {
      const sc = scorer(evalH, SCORES[k]); const xs = [], ys = [];
      evalH.forEach((r) => { const v = sc(r), y = get(r, "r6"); if (v != null && ok(y)) { xs.push(v); ys.push(y); } });
      ic[k].push({ half, v: xs.length >= MINN ? spearman(xs, ys) : null });
    }
    const acc = {}; KEYS.forEach((k) => { acc[k] = {}; MET.forEach((m) => { acc[k][m] = []; }); });
    for (let s = 0; s < SIMS; s++) {
      const idx = [], used = new Set();
      while (idx.length < Math.min(POOLN, pool.length)) { const j = Math.floor(rand() * pool.length); if (!used.has(j)) { used.add(j); idx.push(j); } }
      const raw = idx.map((j) => pool[j]).filter((r) => ok(get(r, "ISS")));
      const samp = {}; for (const g of GATES) samp[g] = raw.filter(G[g]);
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
        const e6 = top.map((r) => ex(r, 6));
        acc[k].ex3.push(mean(top.map((r) => ex(r, 3)))); acc[k].ex6.push(mean(e6)); acc[k].ex12.push(mean(top.map((r) => ex(r, 12))));
        acc[k].up6.push(mean(e6.filter(ok).map((v) => (v > 0 ? 1 : 0))));
        acc[k].big12.push(mean(top.map(big))); acc[k].crash.push(mean(top.map(crash)));
        acc[k].fin.push(mean(top.map((r) => (get(r, "fin") ? 1 : 0))));
        acc[k].pSG.push(mean(top.map((r) => pr.fSG(get(r, "fSG"))))); acc[k].pF1.push(mean(top.map((r) => pr.F1(get(r, "F1"))))); acc[k].pPG.push(mean(top.map((r) => pr.PG(get(r, "PG")))));
      }
    }
    const v = {}; KEYS.forEach((k) => { v[k] = {}; MET.forEach((m) => { v[k][m] = mean(acc[k][m]); }); });
    months.push({ d, half, v });
  }
  const r4 = (x) => (x == null ? null : Math.round(x * 10000) / 10000), t2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
  const U = { level: {}, diff: {}, ic: {}, icDiff: {}, months: months.length, cov: { F1: r4(mean(covF1)), F2: r4(mean(covF2)) } };
  { const s = nw(acc3, 11); U.acc3 = { mean: r4(s.mean), t: t2(s.t), n: s.n }; }
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
  for (const k of SN) if (k !== "S0") U.diff[k + "|H"] = dif(k + "|H", "S0|H");
  for (const k of SN) U.diff[k + "|Q1"] = dif(k + "|Q1", k + "|H");
  for (const k of SN) { const s = nw(ic[k].map((x) => x.v), 5); U.ic[k] = { all: r4(s.mean), t: t2(s.t), h1: r4(mean(ic[k].filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(ic[k].filter((x) => x.half === "h2").map((x) => x.v))) }; }
  for (const k of SN) {
    if (k === "S0") continue;
    const dd = ic[k].map((x, i) => (ok(x.v) && ok(ic.S0[i].v) ? x.v - ic.S0[i].v : null)).filter(ok);
    const s = nw(dd, 5); U.icDiff[k] = { all: r4(s.mean), t: t2(s.t) };
  }
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
const J = { scores: [], accuracy: D.acc3 };
for (const k of SN) {
  if (k === "S0" || k === "O") continue;
  const p = passWith(k + "|H", "S0|H"), icOk = !(D.icDiff[k].t != null && D.icDiff[k].t <= -1);
  const accOk = !/^F[34]$/.test(k) || (D.acc3.mean != null && D.acc3.mean >= 0.1);
  J.scores.push(Object.assign({ key: k, icT: D.icDiff[k].t, icOk, accOk, pass: p.core && icOk && accOk }, p));
}
const sPass = J.scores.filter((x) => x.pass).sort((a, b) => b.devEx6 - a.devEx6);
J.chosenInCountry = sPass.length ? sPass[0].key : "S0";
{ const k = J.chosenInCountry + "|Q1", p = passWith(k, J.chosenInCountry + "|H"); J.gate = Object.assign({ key: k, pass: p.core }, p); }
res.judge = J;
const OUT = arg("out");
if (OUT) fs.writeFileSync(OUT, JSON.stringify(res));

// 출력
const p = (v) => (v == null ? "  –  " : (v * 100).toFixed(1).padStart(5));
const sg = (v) => (v == null ? "   – " : ((v >= 0 ? "+" : "") + (v * 100).toFixed(2)).padStart(6));
const NAME = { S0: "지금", F1: "기대 상향", F2: "기대 수준", F3: "성장 예측", F4: "상향+예측", O: "예지력(참고)" };
console.log("■ " + C + " · 평가 " + res.dates.join("~") + "(F1 30% 시작 " + s1 + " · F3 시작 " + s3 + ") · 풀 시뮬레이션 " + SIMS + "회/월" + (DIVERSIFY ? " · 업종 분산" : ""));
for (const un of ["dev", "holdout"]) {
  const U = res.universes[un];
  console.log("\n [" + (un === "dev" ? "개발" : "확인용") + "] " + U.months + "개월 · F1 값 있는 비율 " + p(U.cov.F1) + "% · F2 " + p(U.cov.F2) + "% · 성장 예측 정확도(순위상관) " + U.acc3.mean + "(t " + U.acc3.t + ")");
  console.log("  1~3위: 6M·12M 평균 초과(%p) · 6M 오른 비율 · 12M 크게 오름(+30%p) · 폭락 · 금융 | 실제 다음 해 매출 성장·기대 상향·예측 성장 백분위");
  for (const g of GATES) for (const k of SN) {
    const L = U.level[k + "|" + g];
    console.log("  " + (g + " " + NAME[k]).padEnd(16) + p(L.ex6.all) + p(L.ex12.all) + " · " + p(L.up6.all) + "% · " + p(L.big12.all) + "% · " + p(L.crash.all) + "% · " + p(L.fin.all) + "% | " + p(L.pSG.all) + p(L.pF1.all) + p(L.pPG.all));
  }
  const R = U.level.RAND; console.log("  " + "무작위 3".padEnd(16) + p(R.ex6.all) + p(R.ex12.all) + " · " + p(R.up6.all) + "% · " + p(R.big12.all) + "% · " + p(R.crash.all) + "% · " + p(R.fin.all) + "% | " + p(R.pSG.all) + p(R.pF1.all) + p(R.pPG.all));
  for (const [k, x] of Object.entries(U.diff)) console.log("  차이 " + k.padEnd(6) + " 6M " + sg(x.ex6.all) + "%p(t " + x.ex6.t + ", 전반 " + sg(x.ex6.h1) + "/후반 " + sg(x.ex6.h2) + ") · 12M " + sg(x.ex12.all) + " · 오른 비율 " + sg(x.up6.all) + " · 크게 오름 " + sg(x.big12.all) + " · 폭락 " + sg(x.crash.all) + " · 해마다 " + Object.entries(x.ex6.years).map(([y, v]) => y.slice(2) + ":" + (v * 100).toFixed(1)).join(" "));
  console.log("  IC 6M: " + SN.map((k) => k + " " + U.ic[k].all + "(" + U.ic[k].t + ")").join(" · ") + " | 차이 t: " + Object.entries(U.icDiff).map(([k, x]) => k + " " + x.t).join(" · "));
}
console.log("\n 판정(나라 안): " + JSON.stringify(J));
