#!/usr/bin/env node
// Top Pick '건강 + 상승 가능성' — 사전 등록(PREREG.md) 평가 실행(2026-10-27)
// 사용: node scripts/research/top-pick/test-picks.js <캐시 폴더> <us|kr> [--out 결과.json]
//   캐시 = scripts/research/theme/ 의 panel-us/kr.js 가 만든 <폴더>/<us|kr>/panel.json(새로 받지 않는다).
//   매월 말 후보 모집단 P(미국 시총 상위 500·한국 300)에서 건강 조건 H 를 거르고, H 안에서 점수 Q(−ISS·SHY·ROIC 백분위 평균)
//   와 −ISS 단독의 다음 1·3·6개월 초과수익(P 같은 비중 평균 대비) 날짜별 Spearman IC(뉴이-웨스트 t, 겹침 시차 h−1),
//   H vs P∖H 의 평균 초과수익·상승 비율, H 안 Q 상위 10%·상위 3종목의 초과수익·상승 비율, 라이브 문턱(AG·SROA 90백분위의 월별 중앙값).
"use strict";
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const C = process.argv[3] || "us";
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const P = JSON.parse(fs.readFileSync(path.join(DIR, C, "panel.json"), "utf8"));
const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
const get = (r, f) => (f in FI ? r[FI[f]] : null);
// 민감도(사후, 채택 근거 아님): --iss-floor -0.2 — 주식 수가 한 해 20% 넘게 준 값(인적분할·주식 병합 등 자본 거래 추정)을
//   '값 없음'으로(--iss-floor-zero 면 0 — 자본 거래 해의 순발행·소각을 0 으로 본다, 앱 lib-picks 와 같은 처리)
const ISS_FLOOR = arg("iss-floor") != null ? +arg("iss-floor") : null, ISS_ZERO = process.argv.includes("--iss-floor-zero");
if (ISS_FLOOR != null) for (const r of P.rows) { if (r[FI.ISS] != null && r[FI.ISS] < ISS_FLOOR) r[FI.ISS] = ISS_ZERO ? 0 : null; }

const POOL = C === "us" ? 500 : 300;
const SPLIT = C === "us" ? "2019-01" : "2024-04";
const H = [1, 3, 6];
const SCORE = C === "us" ? ["ISS", "SHY", "ROIC"] : ["ISS", "ROIC"];   // 한국 패널엔 SHY 가 없다
const SIGN = { ISS: -1, SHY: 1, ROIC: 1 };

const byDate = new Map();
for (const r of P.rows) { if (get(r, "rank") > POOL) continue; const d = get(r, "ym"); if (!byDate.has(d)) byDate.set(d, []); byDate.get(d).push(r); }
const dates = [...byDate.keys()].sort();

const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const median = (a) => { const x = a.filter(ok).sort((p, q) => p - q); if (!x.length) return null; const m = x.length >> 1; return x.length % 2 ? x[m] : (x[m - 1] + x[m]) / 2; };
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

// 건강 조건 H — 값이 없는 항목은 통과
function healthOf(pool) {
  const agCut = cut90(pool, "AG");
  const sCut = { 1: cut90(pool.filter((r) => get(r, "fin")), "SROA"), 0: cut90(pool.filter((r) => !get(r, "fin")), "SROA") };
  const why = (r) => {
    if (get(r, "niPos") === 0) return "loss";
    if (ok(get(r, "ISS")) && get(r, "ISS") > 0.05) return "dilution";
    if (agCut != null && ok(get(r, "AG")) && get(r, "AG") >= agCut) return "assetGrowth";
    const sc = sCut[get(r, "fin") ? 1 : 0];
    if (sc != null && ok(get(r, "SROA")) && get(r, "SROA") >= sc) return "earnVol";
    return null;
  };
  return { agCut, sCut, why };
}
// 점수 — H 안 백분위(높을수록 좋게)의 평균, 있는 것만
function scorer(list, facs) {
  const pr = facs.map((f) => [f, pctRankMap(list, f)]);
  return (r) => { const v = pr.map(([f, m]) => { const x = m(get(r, f)); return x == null ? null : (SIGN[f] > 0 ? x : 1 - x); }).filter((x) => x != null); return v.length ? mean(v) : null; };
}

const S = { Q: SCORE, ISS: ["ISS"] };
const acc = { hv: [], ic: {}, top10: {}, top3: {}, excl: { loss: 0, dilution: 0, assetGrowth: 0, earnVol: 0 }, nP: 0, nH: 0, cuts: { ag: [], sFin: [], sNon: [] } };
Object.keys(S).forEach((k) => { acc.ic[k] = {}; acc.top10[k] = {}; acc.top3[k] = {}; H.forEach((h) => { acc.ic[k][h] = []; acc.top10[k][h] = []; acc.top3[k][h] = []; }); });

for (const d of dates) {
  const pool = byDate.get(d), half = d < SPLIT ? "h1" : "h2";
  const hc = healthOf(pool);
  acc.cuts.ag.push(hc.agCut); acc.cuts.sFin.push(hc.sCut[1]); acc.cuts.sNon.push(hc.sCut[0]);
  const inH = [], outH = [];
  for (const r of pool) { const w = hc.why(r); if (w) { outH.push(r); acc.excl[w]++; } else inH.push(r); }
  acc.nP += pool.length; acc.nH += inH.length;
  const mr = {}; H.forEach((h) => { mr[h] = mean(pool.map((r) => get(r, "r" + h))); });
  const ex = (r, h) => (ok(get(r, "r" + h)) && mr[h] != null ? get(r, "r" + h) - mr[h] : null);
  const up = (r, h) => { const e = ex(r, h); return e == null ? null : e > 0 ? 1 : 0; };
  const raw = (r, h) => (ok(get(r, "r" + h)) ? (get(r, "r" + h) > 0 ? 1 : 0) : null);
  const row = { d, half, nP: pool.length, nH: inH.length };
  H.forEach((h) => {
    row["H" + h] = mean(inH.map((r) => ex(r, h))); row["N" + h] = mean(outH.map((r) => ex(r, h)));
    row["Hu" + h] = mean(inH.map((r) => up(r, h))); row["Nu" + h] = mean(outH.map((r) => up(r, h)));
    row["Hr" + h] = mean(inH.map((r) => raw(r, h))); row["Nr" + h] = mean(outH.map((r) => raw(r, h)));
    row["Pr" + h] = mean(pool.map((r) => raw(r, h)));
  });
  acc.hv.push(row);
  for (const k of Object.keys(S)) {
    const sc = scorer(inH, S[k]);
    const L = inH.map((r) => [r, sc(r)]).filter((x) => x[1] != null).sort((a, b) => b[1] - a[1]);
    for (const h of H) {
      const xs = [], ys = [];
      L.forEach(([r, s]) => { const y = get(r, "r" + h); if (ok(y)) { xs.push(s); ys.push(y); } });
      acc.ic[k][h].push({ half, v: xs.length >= 30 ? spearman(xs, ys) : null });
      const t10 = L.slice(0, Math.max(3, Math.round(L.length * 0.1))).map((x) => x[0]), t3 = L.slice(0, 3).map((x) => x[0]);
      const pack = (arr) => ({ half, ex: mean(arr.map((r) => ex(r, h))), up: mean(arr.map((r) => up(r, h))), raw: mean(arr.map((r) => raw(r, h))) });
      acc.top10[k][h].push(pack(t10)); acc.top3[k][h].push(pack(t3));
    }
  }
}

const r4 = (v) => (v == null ? null : Math.round(v * 10000) / 10000);
const t2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const halves = { all: () => true, h1: (x) => x.half === "h1", h2: (x) => x.half === "h2" };
const res = { country: C, pool: POOL, split: SPLIT, dates: [dates[0], dates[dates.length - 1]], nDates: dates.length,
  avgPool: Math.round(acc.nP / dates.length), avgHealthy: Math.round(acc.nH / dates.length), healthShare: r4(acc.nH / acc.nP),
  excluded: Object.fromEntries(Object.entries(acc.excl).map(([k, v]) => [k, r4(v / acc.nP)])), score: SCORE, health: {}, ic: {}, top10: {}, top3: {} };
for (const h of H) {
  const o = {};
  for (const [hf, f] of Object.entries(halves)) {
    const rows = acc.hv.filter(f);
    o[hf] = { H: r4(mean(rows.map((x) => x["H" + h]))), notH: r4(mean(rows.map((x) => x["N" + h]))), upH: r4(mean(rows.map((x) => x["Hu" + h]))), upNotH: r4(mean(rows.map((x) => x["Nu" + h]))),
      rawH: r4(mean(rows.map((x) => x["Hr" + h]))), rawNotH: r4(mean(rows.map((x) => x["Nr" + h]))), rawP: r4(mean(rows.map((x) => x["Pr" + h]))),
      diffT: t2(nw(rows.map((x) => (x["H" + h] != null && x["N" + h] != null ? x["H" + h] - x["N" + h] : null)), h - 1).t), n: rows.length };
  }
  res.health["m" + h] = o;
}
for (const k of Object.keys(S)) {
  res.ic[k] = {}; res.top10[k] = {}; res.top3[k] = {};
  for (const h of H) {
    const s = acc.ic[k][h], a = nw(s.map((x) => x.v), h - 1), b = nw(s.filter(halves.h1).map((x) => x.v), h - 1), c = nw(s.filter(halves.h2).map((x) => x.v), h - 1);
    res.ic[k]["m" + h] = { all: r4(a.mean), t: t2(a.t), h1: r4(b.mean), t1: t2(b.t), h2: r4(c.mean), t2: t2(c.t), n: a.n };
    for (const [nm, src] of [["top10", acc.top10], ["top3", acc.top3]]) {
      const o = {};
      for (const [hf, f] of Object.entries(halves)) { const rows = src[k][h].filter(f); o[hf] = { ex: r4(mean(rows.map((x) => x.ex))), up: r4(mean(rows.map((x) => x.up))), raw: r4(mean(rows.map((x) => x.raw))) }; }
      o.exT = t2(nw(src[k][h].map((x) => x.ex), h - 1).t);
      res[nm][k]["m" + h] = o;
    }
  }
}
// 라이브 문턱 — 각 달 90백분위의 중앙값(비율 그대로; 앱 fx 는 % 단위라 ×100)
res.liveCuts = { AG: r4(median(acc.cuts.ag)), SROA_fin: r4(median(acc.cuts.sFin)), SROA_nonfin: r4(median(acc.cuts.sNon)) };

// 판정(사전 등록 채택 기준) — 한국은 미국 판정의 보조 조건이라 여기서는 재료만 낸다
const h6 = res.health.m6;
res.judge = {
  healthBetter: ["h1", "h2"].map((hf) => h6[hf].H > h6[hf].notH && h6[hf].upH > h6[hf].upNotH),
  healthOpposite: ["h1", "h2"].every((hf) => h6[hf].H < h6[hf].notH && h6[hf].upH < h6[hf].upNotH),
};
for (const k of Object.keys(S)) {
  const i6 = res.ic[k].m6, i3 = res.ic[k].m3;
  res.judge[k] = { ic6Both: i6.h1 > 0 && i6.h2 > 0, ic6t: i6.t, ic3Both: i3.h1 > 0 && i3.h2 > 0, usRule: i6.h1 > 0 && i6.h2 > 0 && i6.t != null && i6.t >= 2 && i3.h1 > 0 && i3.h2 > 0, krNotNeg: !(i6.t != null && i6.t <= -2) };
}

const p = (v) => (v == null ? "  –  " : (v * 100).toFixed(2).padStart(6));
const q = (v) => (v == null ? " – " : v.toFixed(3).padStart(6));
console.log("■ " + C + " — " + res.dates.join("~") + " " + res.nDates + "개월 · 모집단 " + res.avgPool + " · 건강 통과 " + res.avgHealthy + " (" + (res.healthShare * 100).toFixed(1) + "%)");
console.log("  걸러진 사유(모집단 대비): " + Object.entries(res.excluded).map(([k, v]) => k + " " + (v * 100).toFixed(1) + "%").join(" · "));
console.log("  건강 조건 H vs P∖H — 평균 초과수익%·시장보다 오른 비율%·절대 상승 비율%");
for (const h of H) for (const hf of ["all", "h1", "h2"]) {
  const o = res.health["m" + h][hf];
  console.log("   " + h + "M " + hf.padEnd(3) + "  초과 " + p(o.H) + " vs " + p(o.notH) + " (차이 t " + (o.diffT == null ? "–" : o.diffT.toFixed(2)) + ")   시장보다 오름 " + p(o.upH) + " vs " + p(o.upNotH) + "   절대 상승 " + p(o.rawH) + " vs " + p(o.rawNotH) + " (P " + p(o.rawP) + ")");
}
for (const k of Object.keys(S)) {
  console.log("  점수 " + k + " (" + S[k].join("·") + ") — H 안 IC 전체(t) | 전반(t) 후반(t)");
  for (const h of H) { const o = res.ic[k]["m" + h]; console.log("   " + h + "M  " + q(o.all) + " (" + (o.t == null ? "–" : o.t.toFixed(2)) + ") | " + q(o.h1) + " (" + (o.t1 == null ? "–" : o.t1.toFixed(2)) + ") " + q(o.h2) + " (" + (o.t2 == null ? "–" : o.t2.toFixed(2)) + ")"); }
  for (const nm of ["top10", "top3"]) for (const h of H) {
    const o = res[nm][k]["m" + h];
    console.log("   " + nm.padEnd(5) + " " + h + "M  초과 " + p(o.all.ex) + " (t " + (o.exT == null ? "–" : o.exT.toFixed(2)) + ", 전반 " + p(o.h1.ex) + " 후반 " + p(o.h2.ex) + ")   시장보다 오름 " + p(o.all.up) + " (전반 " + p(o.h1.up) + " 후반 " + p(o.h2.up) + ")   절대 상승 " + p(o.all.raw));
  }
}
console.log("  라이브 문턱(월별 90백분위 중앙값): AG " + res.liveCuts.AG + " · SROA 금융 " + res.liveCuts.SROA_fin + " · 비금융 " + res.liveCuts.SROA_nonfin);
console.log("  판정 재료: " + JSON.stringify(res.judge));
const OUT = arg("out");
if (OUT) { fs.writeFileSync(OUT, JSON.stringify(res, null, 1)); console.log("→ " + OUT); }
