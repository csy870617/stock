#!/usr/bin/env node
// Top Pick 3차 C — 한국 애널리스트 신호(목표가 상승여력·컨센서스 변화)를 한국 점수에 더하면 나아지나(PREREG-3.md C)
// 사용: node scripts/research/top-pick/test-analyst-kr.js <테마 캐시 폴더> <리포트 캐시 폴더> [--out 결과.json]
//   리포트 캐시 = ../accuracy·../leading 이 만든 폴더(tgt-kr/<코드>.json 증권사별 목표가, px/<코드>.K?.json 일봉).
//   월말 컨센서스 = 최근 180일 안 증권사별 최신 목표가(작성일 종가 단위로 환산)의 평균(2곳 이상).
//   A1 상승여력 = 컨센서스 ÷ 월말 종가 − 1 · A2 = 3개월 컨센서스 로그 변화 · A3 = 1개월 로그 변화.
//   평가 대상 = 리포트 이력이 있는 한국 종목 ∩ 패널(2022-04~) ∩ 건강 관문 ∩ 주식 수 값. 기준선 = 지금 한국 점수 {−주식 수}.
"use strict";
const fs = require("fs");
const path = require("path");

const TDIR = path.resolve(process.argv[2] || "theme-cache"), RDIR = path.resolve(process.argv[3] || "research-cache");
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const P = JSON.parse(fs.readFileSync(path.join(TDIR, "kr", "panel.json"), "utf8"));
const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
const get = (r, f) => (f in FI ? r[FI[f]] : null);
for (const r of P.rows) { const v = r[FI.ISS]; if (v != null && v < -0.2) r[FI.ISS] = 0; }
const SPLIT = "2024-04", H = [1, 3, 6];

const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
function cutQ(list, f, q) { const xs = list.map((r) => get(r, f)).filter(ok).sort((a, b) => a - b); return xs.length >= 30 ? xs[Math.floor(xs.length * q)] : null; }
function pctRank(vals) {
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
function nw(series, lag) {
  const x = series.filter(ok); const T = x.length; if (T < 6) return { mean: mean(x), t: null, n: T };
  const m = x.reduce((s, v) => s + v, 0) / T;
  const g = (k) => { let s = 0; for (let i = k; i < T; i++) s += (x[i] - m) * (x[i - k] - m); return s / T; };
  let v = g(0); for (let k = 1; k <= lag; k++) v += 2 * (1 - k / (lag + 1)) * g(k);
  return { mean: m, t: v > 0 ? m / Math.sqrt(v / T) : null, n: T };
}

// 종목별 월말 컨센서스
const pxFile = (code) => { for (const s of [".KS", ".KQ"]) { const f = path.join(RDIR, "px", code + s + ".json"); if (fs.existsSync(f)) return f; } return null; };
const CONS = new Map();   // code → Map(ym → {cons, u})
for (const f of fs.readdirSync(path.join(RDIR, "tgt-kr"))) {
  const code = f.slice(0, 6), pf = pxFile(code); if (!pf) continue;
  const X = JSON.parse(fs.readFileSync(pf, "utf8")), n = X.d.length;
  const idxOn = (d) => { let lo = 0, hi = n - 1, ans = -1; while (lo <= hi) { const mid = (lo + hi) >> 1; if (X.d[mid] <= d) { ans = mid; lo = mid + 1; } else hi = mid - 1; } return ans; };
  const R = JSON.parse(fs.readFileSync(path.join(RDIR, "tgt-kr", f), "utf8")).filter((r) => r.goal > 0 && r.px > 0 && r.d).sort((a, b) => (a.d < b.d ? -1 : 1));
  const m = new Map();
  const months = [...new Set(X.d.map((d) => d.slice(0, 7)))].sort().filter((ym) => ym >= "2021-10");
  for (const ym of months) {
    const i = idxOn(ym + "-31"); if (i < 0 || X.d[i].slice(0, 7) !== ym) continue;
    const d = X.d[i], from = new Date(Date.parse(d) - 180 * 864e5).toISOString().slice(0, 10);
    const lastBy = new Map();
    for (const r of R) if (r.d <= d && r.d >= from) lastBy.set(r.broker, r);
    const lv = [];
    for (const r of lastBy.values()) { const j = idxOn(r.d); if (j < 0) continue; const adj = X.cl[j] / r.px; if (adj > 0.02 && adj < 50) lv.push(r.goal * adj); }
    if (lv.length < 2) continue;
    const cons = mean(lv), u = cons / X.cl[i] - 1;
    if (!(u > -0.5 && u < 3)) continue;
    m.set(ym, { cons, u });
  }
  CONS.set(code, m);
}
const ymShift = (ym, k) => { const [y, mo] = ym.split("-").map(Number); const t = y * 12 + (mo - 1) + k; return Math.floor(t / 12) + "-" + String(t % 12 + 1).padStart(2, "0"); };
const sig = (code, ym) => {
  const m = CONS.get(code); if (!m || !m.has(ym)) return null;
  const c0 = m.get(ym), c1 = m.get(ymShift(ym, -1)), c3 = m.get(ymShift(ym, -3));
  return { A1: c0.u, A2: c3 ? Math.log(c0.cons / c3.cons) : null, A3: c1 ? Math.log(c0.cons / c1.cons) : null };
};

const RULES = {
  B0: [["ISS", -1]], B4: [["ISS", -1], ["DY", 1]],
  A1: [["A1", 1]], A2: [["A2", 1]], A3: [["A3", 1]],
  "B0+A1": [["ISS", -1], ["A1", 1]], "B0+A2": [["ISS", -1], ["A2", 1]], "B0+A3": [["ISS", -1], ["A3", 1]],
};
const RN = Object.keys(RULES);
const byDate = new Map();
for (const r of P.rows) { const d = get(r, "ym"); if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();
const ic = {}; RN.forEach((k) => { ic[k] = {}; H.forEach((h) => { ic[k][h] = []; }); });
const top = {}; RN.forEach((k) => { top[k] = {}; H.forEach((h) => { top[k][h] = []; }); });
let nAvg = [];
for (const d of dates) {
  const all = byDate.get(d), dev = all.filter((r) => get(r, "rank") <= 300);
  const agCut = cutQ(dev, "AG", 0.9), sCut = { 1: cutQ(dev.filter((r) => get(r, "fin")), "SROA", 0.9), 0: cutQ(dev.filter((r) => !get(r, "fin")), "SROA", 0.9) };
  const healthy = (r) => !(get(r, "niPos") === 0 || (ok(get(r, "ISS")) && get(r, "ISS") > 0.05) || (agCut != null && ok(get(r, "AG")) && get(r, "AG") >= agCut) ||
    ((sCut[get(r, "fin") ? 1 : 0]) != null && ok(get(r, "SROA")) && get(r, "SROA") >= sCut[get(r, "fin") ? 1 : 0]));
  const E = all.filter((r) => CONS.has(get(r, "t")) && healthy(r) && ok(get(r, "ISS"))).map((r) => ({ r, a: sig(get(r, "t"), d) })).filter((x) => x.a);
  if (E.length < 20) continue;
  nAvg.push(E.length);
  const half = d < SPLIT ? "h1" : "h2";
  const val = (x, f) => (f === "ISS" || f === "DY" ? get(x.r, f) : x.a[f]);
  const mr = {}; H.forEach((h) => { mr[h] = mean(E.map((x) => get(x.r, "r" + h))); });
  for (const k of RN) {
    const maps = RULES[k].map(([f, s]) => [pctRank(E.map((x) => val(x, f))), f, s]);
    const sc = E.map((x) => mean(maps.map(([m, f, s]) => { const p = m(val(x, f)); return p == null ? null : (s > 0 ? p : 1 - p); })));
    for (const h of H) {
      const xs = [], ys = [];
      E.forEach((x, i) => { const y = get(x.r, "r" + h); if (sc[i] != null && ok(y)) { xs.push(sc[i]); ys.push(y); } });
      ic[k][h].push({ half, v: xs.length >= 20 ? spearman(xs, ys) : null });
      const L = E.map((x, i) => [x, sc[i]]).filter((z) => z[1] != null).sort((a, b) => b[1] - a[1]);
      const t10 = L.slice(0, Math.max(3, Math.round(L.length * 0.1))).map((z) => get(z[0].r, "r" + h)).filter(ok);
      if (t10.length && mr[h] != null) top[k][h].push({ half, ex: mean(t10) - mr[h], up: mean(t10.map((v) => (v > mr[h] ? 1 : 0))) });
    }
  }
}
const r4 = (v) => (v == null ? null : Math.round(v * 10000) / 10000), t2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const res = { avgCovered: Math.round(mean(nAvg)), months: nAvg.length, ic: {}, diff: {}, top10: {} };
for (const k of RN) {
  res.ic[k] = {}; res.diff[k] = {}; res.top10[k] = {};
  for (const h of H) {
    const s = ic[k][h], a = nw(s.map((x) => x.v), h - 1);
    res.ic[k]["m" + h] = { all: r4(a.mean), t: t2(a.t), h1: r4(mean(s.filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(s.filter((x) => x.half === "h2").map((x) => x.v))) };
    const dd = s.map((x, i) => (ok(x.v) && ok(ic.B0[h][i].v) ? { half: x.half, v: x.v - ic.B0[h][i].v } : null)).filter(Boolean), b = nw(dd.map((x) => x.v), h - 1);
    res.diff[k]["m" + h] = { all: r4(b.mean), t: t2(b.t), h1: r4(mean(dd.filter((x) => x.half === "h1").map((x) => x.v))), h2: r4(mean(dd.filter((x) => x.half === "h2").map((x) => x.v))) };
    res.top10[k]["m" + h] = { ex: r4(mean(top[k][h].map((x) => x.ex))), up: r4(mean(top[k][h].map((x) => x.up))) };
  }
}
res.judge = {};
for (const k of ["B0+A1", "B0+A2", "B0+A3"]) {
  const d1 = res.diff[k].m1, d3 = res.diff[k].m3;
  res.judge[k] = { t1: d1.t, halves: d1.h1 > 0 && d1.h2 > 0, t3: d3.t, pass: d1.t != null && d1.t >= 2.5 && d1.h1 > 0 && d1.h2 > 0 && !(d3.t != null && d3.t <= -1) };
}
const OUT = arg("out");
if (OUT) fs.writeFileSync(OUT, JSON.stringify(res, null, 1));
const q = (v) => (v == null ? "   –  " : (v >= 0 ? "+" : "") + v.toFixed(3)), p = (v) => (v == null ? "  –  " : (v * 100).toFixed(1).padStart(5));
console.log("■ 한국 애널리스트 신호 — 평가 대상 평균 " + res.avgCovered + "종목 · " + res.months + "개월");
console.log("  규칙     IC 1M(t) 전반/후반          3M(t)         6M(t)       · 기준선 대비 1M 차이(t) 전반/후반 · 3M 차이(t) · 상위10% 1M 초과·오름 / 3M 오름");
for (const k of RN) {
  const a = res.ic[k], d = res.diff[k], t = res.top10[k];
  console.log("  " + k.padEnd(6) + " " + q(a.m1.all) + "(" + a.m1.t + ") " + q(a.m1.h1) + "/" + q(a.m1.h2) + "  " + q(a.m3.all) + "(" + a.m3.t + ")  " + q(a.m6.all) + "(" + a.m6.t + ")" +
    (k === "B0" ? "   (기준선)                              " : "   " + q(d.m1.all) + "(" + d.m1.t + ") " + q(d.m1.h1) + "/" + q(d.m1.h2) + " · " + q(d.m3.all) + "(" + d.m3.t + ")") +
    "   " + p(t.m1.ex) + "%p " + p(t.m1.up) + "% / " + p(t.m3.up) + "%");
}
console.log("  판정: " + JSON.stringify(res.judge));
