#!/usr/bin/env node
// Top Pick 2차 — '데이터가 고르는' 점수(걸어가며 검증) vs 사람이 고른 규칙(PREREG-2.md, 2026-10-27)
// 사용: node scripts/research/top-pick/test-objective.js <캐시 폴더> <us|kr> [--out 결과.json]
//   매월 건강 통과 종목(H) 안에서 후보 지표마다 '지표 ↔ 다음 h개월 초과수익' Spearman IC 를 재고, 그 달까지 결과가 나온 달만으로
//   |뉴이-웨스트 t| ≥ 2 인 지표를 골라(방향 = 평균 IC 부호) 백분위 평균으로 순위를 매긴다(WF). 같은 표본 밖 달에서 M1(주식 수 감소)·
//   M2(주식 수 감소·주주환원·ROIC)와 IC·상위 10%·상위 3종목 성적을 견준다. 마지막 단계(지금 쓸 지표·방향)도 낸다.
"use strict";
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const C = process.argv[3] || "us";
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const P = JSON.parse(fs.readFileSync(path.join(DIR, C, "panel.json"), "utf8"));
const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
const get = (r, f) => (f in FI ? r[FI[f]] : null);
for (const r of P.rows) { const v = r[FI.ISS]; if (v != null && v < -0.2) r[FI.ISS] = 0; }   // 앱과 같은 자료 정리

const POOL = C === "us" ? 500 : 300, MINN = C === "us" ? 30 : 20, MINHIST = 24;
const CAND = ["ISS", "SHY", "ROIC", "ROIC3", "GPA", "BUYY", "SROA", "SOPM", "AG", "SG1", "SG3", "FCFM", "FCFNI", "NETCASH", "EBITEV", "FCFP",
  "COV", "DSTREAK", "PAYOUT", "EP", "BP", "DY"].filter((f) => f in FI);
const H = [1, 3, 6];

const byDate = new Map();
for (const r of P.rows) { if (get(r, "rank") > POOL) continue; const d = get(r, "ym"); if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();

const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
function cut90(list, f) { const xs = list.map((r) => get(r, f)).filter(ok).sort((a, b) => a - b); return xs.length >= 30 ? xs[Math.floor(xs.length * 0.9)] : null; }
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

// 날짜별 건강 통과 종목·지표 백분위·IC
const D = dates.map((d) => {
  const pool = byDate.get(d);
  const agCut = cut90(pool, "AG"), sCut = { 1: cut90(pool.filter((r) => get(r, "fin")), "SROA"), 0: cut90(pool.filter((r) => !get(r, "fin")), "SROA") };
  const inH = pool.filter((r) => {
    if (get(r, "niPos") === 0) return false;
    if (ok(get(r, "ISS")) && get(r, "ISS") > 0.05) return false;
    if (agCut != null && ok(get(r, "AG")) && get(r, "AG") >= agCut) return false;
    const sc = sCut[get(r, "fin") ? 1 : 0];
    return !(sc != null && ok(get(r, "SROA")) && get(r, "SROA") >= sc);
  });
  const mr = {}; H.forEach((h) => { mr[h] = mean(pool.map((r) => get(r, "r" + h))); });
  const pct = {}; CAND.forEach((f) => { const m = pctRankMap(inH, f); pct[f] = inH.map((r) => m(get(r, f))); });
  const ic = {};
  H.forEach((h) => {
    ic[h] = {};
    CAND.forEach((f) => {
      const xs = [], ys = [];
      inH.forEach((r) => { const v = get(r, f), y = get(r, "r" + h); if (ok(v) && ok(y)) { xs.push(v); ys.push(y); } });
      ic[h][f] = xs.length >= MINN ? spearman(xs, ys) : null;
    });
  });
  return { d, inH, mr, pct, ic };
});

function scoreRows(t, sel) {   // sel = [[지표, 방향]] → H 안 종목별 점수(없으면 null)
  const x = D[t];
  return x.inH.map((r, i) => { const v = sel.map(([f, s]) => { const p = x.pct[f][i]; return p == null ? null : (s > 0 ? p : 1 - p); }); return mean(v); });
}
function evalDate(t, sc, h) {
  const x = D[t], L = x.inH.map((r, i) => [r, sc[i]]).filter((z) => z[1] != null);
  const xs = [], ys = [];
  L.forEach(([r, s]) => { const y = get(r, "r" + h); if (ok(y)) { xs.push(s); ys.push(y); } });
  const ic = xs.length >= MINN ? spearman(xs, ys) : null;
  L.sort((a, b) => b[1] - a[1]);
  const ex = (r) => (ok(get(r, "r" + h)) && x.mr[h] != null ? get(r, "r" + h) - x.mr[h] : null);
  const pack = (arr) => ({ ex: mean(arr.map(ex)), up: mean(arr.map((r) => { const e = ex(r); return e == null ? null : e > 0 ? 1 : 0; })),
    crash: mean(arr.map((r) => (ok(get(r, "r12")) ? (get(r, "r12") < -0.3 ? 1 : 0) : null))) });
  return { ic, t10: pack(L.slice(0, Math.max(3, Math.round(L.length * 0.1))).map((z) => z[0])), t3: pack(L.slice(0, 3).map((z) => z[0])),
    all: pack(x.inH) };
}
// WF 의 t 시점 선택 — 결과가 나온 달(s + h ≤ t)의 IC 로
function wfSelect(t, h) {
  const hist = []; for (let s = 0; s + h <= t; s++) hist.push(s);
  if (hist.length < MINHIST) return null;
  const sel = [], info = [];
  CAND.forEach((f) => {
    const st = nw(hist.map((s) => D[s].ic[h][f]), h - 1);
    if (st.t != null && Math.abs(st.t) >= 2 && st.n >= MINHIST) { sel.push([f, Math.sign(st.mean)]); info.push([f, +st.mean.toFixed(4), +st.t.toFixed(2)]); }
  });
  return { sel, info };
}
const M1 = [["ISS", -1]], M2 = [["ISS", -1], ["SHY", 1], ["ROIC", 1]].filter(([f]) => f in FI);

const res = { country: C, dates: [dates[0], dates[dates.length - 1]], cand: CAND, horizons: {} };
for (const h of H) {
  const rows = { WF: [], M1: [], M2: [] }, picked = {};
  let abst = 0, first = null;
  for (let t = 0; t < D.length; t++) {
    // 평가는 그 달의 h개월 수익이 있는 달만
    if (!D[t].inH.some((r) => ok(get(r, "r" + h)))) continue;
    const w = wfSelect(t, h);
    if (!w) continue;
    if (!w.sel.length) { abst++; continue; }
    if (!first) first = D[t].d;
    w.sel.forEach(([f, s]) => { const k = (s > 0 ? "+" : "−") + f; picked[k] = (picked[k] || 0) + 1; });
    rows.WF.push(Object.assign({ d: D[t].d }, evalDate(t, scoreRows(t, w.sel), h)));
    rows.M1.push(Object.assign({ d: D[t].d }, evalDate(t, scoreRows(t, M1), h)));
    rows.M2.push(Object.assign({ d: D[t].d }, evalDate(t, scoreRows(t, M2), h)));
  }
  const n = rows.WF.length, half = Math.floor(n / 2), o = { oosFrom: first, oosMonths: n, abstained: abst, picked };
  for (const k of Object.keys(rows)) {
    const R = rows[k], a = nw(R.map((x) => x.ic), h - 1), b = nw(R.slice(0, half).map((x) => x.ic), h - 1), c = nw(R.slice(half).map((x) => x.ic), h - 1);
    const agg = (sel) => ({ ex: mean(R.map((x) => x[sel].ex)), up: mean(R.map((x) => x[sel].up)), crash: mean(R.map((x) => x[sel].crash)) });
    o[k] = { ic: a.mean, t: a.t, h1: b.mean, h2: c.mean, top10: agg("t10"), top3: agg("t3"), all: agg("all") };
  }
  // 지금 쓸 지표 — 결과가 나온 달 전부로(마지막 단계)
  let tNow = D.length; while (tNow > 0 && !D[tNow - 1].inH.some((r) => ok(get(r, "r" + h)))) tNow--;
  const live = wfSelect(tNow - 1 + h, h);
  o.live = live ? live.info : null;
  res.horizons["m" + h] = o;
}
const OUT = arg("out");
if (OUT) fs.writeFileSync(OUT, JSON.stringify(res, null, 1));

const p = (v) => (v == null ? "  –  " : (v * 100).toFixed(1).padStart(5));
const q = (v) => (v == null ? "  –  " : v.toFixed(3).padStart(6));
console.log("■ " + C + " — " + res.dates.join("~") + " · 후보 지표 " + CAND.length + "개");
for (const h of H) {
  const o = res.horizons["m" + h];
  console.log("\n  " + h + "개월 — 표본 밖 " + o.oosFrom + "~ " + o.oosMonths + "개월(쉰 달 " + o.abstained + ")");
  for (const k of ["WF", "M1", "M2"]) {
    const x = o[k];
    console.log("   " + k.padEnd(3) + " IC " + q(x.ic) + " (t " + (x.t == null ? "–" : x.t.toFixed(2)) + ") 전반 " + q(x.h1) + " 후반 " + q(x.h2) +
      " | 상위10% 초과 " + p(x.top10.ex) + "%p 오름 " + p(x.top10.up) + "% 폭락 " + p(x.top10.crash) + "% | 상위3 초과 " + p(x.top3.ex) + "%p 오름 " + p(x.top3.up) + "% | 통과 전체 오름 " + p(x.all.up) + "% 폭락 " + p(x.all.crash) + "%");
  }
  const pk = Object.entries(o.picked).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + " " + Math.round(v / o.oosMonths * 100) + "%");
  console.log("   WF 가 고른 지표(표본 밖 달 중 비율): " + pk.join(", "));
  console.log("   지금 고를 지표: " + (o.live ? o.live.map((x) => (x[1] > 0 ? "+" : "−") + x[0] + "(IC " + x[1] + ", t " + x[2] + ")").join(", ") : "없음"));
}
