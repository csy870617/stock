#!/usr/bin/env node
// 히든 과거 성적 — 판정 뒤 확인(사후, PREREG 판정에는 쓰지 않는다)
//   ① 데이터 점검: 한 달에 4배 넘게 뛴 가격(분할 처리 오류 의심)을 뺀 PEER 10배 비율
//   ② 조건별 기여: SAFE(안전 조건) 위에 상방 조건을 하나씩 더했을 때 같은 크기 대비·포트폴리오
//   ③ 운영 흉내: 판정 집합 안에서 스크린 점수(screen-hidden.js WEIGHTS) 상위 9종목만 매달 담았을 때
// 사용: node posthoc.js <theme 캐시> --only us|korea
"use strict";
const path = require("path");
const L = require("../theme/lib");
const T = require("./test-hidden");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const only = (() => { const i = process.argv.indexOf("--only"); return i >= 0 ? process.argv[i + 1] : "us"; })();
const r2 = (v, d) => (v == null || !isFinite(v) ? null : +v.toFixed(d == null ? 2 : d));
const W = { us: { g: 0.25, roic: 0.25, pegInv: 0.2, fcfM: 0.1, cashM: 0.1, small: 0.1 }, korea: { g: 0.25, roic: 0.25, pegInv: 0.2, fcfM: 0.1, cashM: 0.05, small: 0.1 } };

const R = only === "us" ? T.res.us : T.res.kr;
const data = R._data, vk = R.verdictKey;
const half = only === "us" ? ["2013-06", "2019-07", "2019-08", "2026-09"] : ["2024-04", "2025-03", "2025-04", "2026-09"];
const out = { country: only, verdictKey: vk };

// ① 10배 — 월 4배 넘는 점프가 있는 종목 제외
if (only === "us") {
  const rows = []; for (let yr = 2013; yr <= 2016; yr++) { const d = data.find((x) => x.ym === yr + "-06"); if (d) rows.push(...d.rows.map((r) => Object.assign({ yr }, r))); }
  const rate = (A) => { const v = A.filter((r) => r.maxAll != null); return { pct: v.length ? r2(100 * v.filter((r) => r.maxAll >= 10).length / v.length, 1) : null, n: v.length }; };
  const P = rows.filter((r) => r.peer), S = rows.filter((r) => T.setOf(r, vk));
  out.tenBagger = { peer: rate(P), peerNoJump: rate(P.filter((r) => !r.jump)), set: rate(S), setNoJump: rate(S.filter((r) => !r.jump)),
    peerJumpShare: r2(100 * P.filter((r) => r.jump).length / P.length, 1),
    setHits: S.filter((r) => r.maxAll >= 10).map((r) => r.yr + ":" + r.t),
    peerHitsSample: P.filter((r) => r.maxAll >= 10 && !r.jump).slice(0, 40).map((r) => r.yr + ":" + r.t) };
}

// ② 조건별 기여 — SAFE 이면서 그 상방 조건을 통과(엄격 기준, 다른 상방 조건은 무시)
const UP = ["growth", "roic", "peg", "dil"];
const sel = (pred, h, from, to) => {
  const ds = [];
  for (const { ym, rows } of data) {
    if (ym < from || ym > to) continue;
    const S = rows.filter((r) => pred(r) && r["r" + h] != null), P = rows.filter((r) => r.peer && r["r" + h] != null);
    if (S.length < 5 || P.length < 20) continue;
    ds.push(T.mean(S.map((r) => r["r" + h])) - T.mean(P.map((r) => r["r" + h])));
  }
  return { months: ds.length, mean: ds.length ? r2(100 * T.mean(ds)) : null, t: r2(T.nwT(ds, h - 1)) };
};
out.components = {};
for (const u of UP) {
  const pred = (r) => r.safe && !r.why.includes(u);
  out.components["SAFE+" + u] = { all: sel(pred, 12, half[0], half[3]), first: sel(pred, 12, half[0], half[1]), second: sel(pred, 12, half[2], half[3]) };
}
out.components["SAFE+all-upside(=H in band)"] = { all: sel((r) => r.H, 12, half[0], half[3]) };

// ③ 운영 흉내: 매달 판정 집합 안 점수 상위 9종목(동일비중, 다음 1개월)
function pctRankFn(vals) { const xs = vals.filter((v) => v != null && isFinite(v)).sort((a, b) => a - b); return (v) => { if (v == null || !isFinite(v) || !xs.length) return 0.5; let lo = 0; while (lo < xs.length && xs[lo] < v) lo++; return xs.length === 1 ? 1 : lo / (xs.length - 1); }; }
const idxSym = only === "us" ? "SPY" : "069500.KS";
const idx = L.readJson(path.join(DIR, "idx", idxSym + ".json"));
function sim(from, to, N) {
  const rs = [], ms = [];
  for (const { ym, rows } of data) {
    if (ym < from || ym > to) continue;
    const pop = rows.filter((r) => T.setOf(r, vk));
    if (pop.length < 5) continue;
    const w = W[only]; const pr = {}; Object.keys(w).forEach((k) => { pr[k] = pctRankFn(pop.map((r) => r.sc[k])); });
    const top = pop.map((r) => ({ r, s: Object.keys(w).reduce((acc, k) => acc + w[k] * pr[k](r.sc[k]), 0) })).sort((a, b) => b.s - a.s).slice(0, N).map((x) => x.r).filter((r) => r.r1 != null);
    const i = idx.d.indexOf(ym), j = idx.d.indexOf(T.addM(ym, 1));
    if (!top.length || i < 0 || j < 0) continue;
    rs.push(T.mean(top.map((r) => r.r1))); ms.push(idx.a[j] / idx.a[i] - 1);
  }
  const st = (r) => { let v = 1, pk = 1, mdd = 0; r.forEach((x) => { v *= 1 + x; pk = Math.max(pk, v); mdd = Math.min(mdd, v / pk - 1); }); const mu = T.mean(r), sd = Math.sqrt(r.reduce((p, x) => p + (x - mu) ** 2, 0) / (r.length - 1)); return { cagr: r2(100 * (Math.pow(v, 12 / r.length) - 1)), vol: r2(100 * sd * Math.sqrt(12)), sharpe: r2(mu * 12 / (sd * Math.sqrt(12))), mdd: r2(100 * mdd) }; };
  return { months: rs.length, top: st(rs), idx: st(ms) };
}
out.top9 = { all: sim(half[0], half[3], 9), first: sim(half[0], half[1], 9), second: sim(half[2], half[3], 9) };
console.log(JSON.stringify(out, null, 1));
