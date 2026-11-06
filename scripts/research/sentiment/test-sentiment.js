#!/usr/bin/env node
// 시장 심리 온도계 — 사전 등록(PREREG.md) 시험
// 사용: node scripts/research/sentiment/test-sentiment.js <캐시(fetch.js)> [--flows data/market-flows.json] [--coverage] [--out 결과.json] [--dump 월별.json]
//   --coverage: 지표별 자료 범위와 점수 분포만(앞날 수익은 보지 않는다 — 사전 등록 전 확인용)
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("../../lib-sentiment");

const DIR = path.resolve(process.argv[2] || "senti-cache");
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const has = (n) => process.argv.includes("--" + n);
const FLOWS = path.resolve(arg("flows") || path.join(__dirname, "..", "..", "..", "data", "market-flows.json"));
const rd = (f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
const Y = rd("yahoo.json"), F = rd("fred.json"), K = rd("kofia.json"), E = fs.existsSync(path.join(DIR, "ecos.json")) ? rd("ecos.json") : {};
const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const r4 = (v) => (ok(v) ? Math.round(v * 10000) / 10000 : null);
const t2 = (v) => (ok(v) ? Math.round(v * 100) / 100 : null);
const addM = (ym, k) => { const [y, m] = ym.split("-").map(Number); return new Date(Date.UTC(y, m - 1 + k, 1)).toISOString().slice(0, 7); };
const pick = (keys) => { const o = {}; keys.forEach((k) => { if (Y[k]) o[k] = Y[k]; }); return o; };

// ── 입력 ──
const FL = JSON.parse(fs.readFileSync(FLOWS, "utf8")), FCOL = FL.cols.indexOf("외국인"), FLm = {};
(FL.kospi || []).forEach((r) => { const s = String(r[0]); if (ok(r[FCOL])) FLm[s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8)] = r[FCOL]; });
const CAL = { us: Object.keys(Y["^GSPC"]).sort(), korea: Object.keys(Y["^KS11"]).sort() };
const IN = {
  us: { index: Y["^GSPC"], vix: Y["^VIX"], spy: Y.SPY, ief: Y.IEF, baa: F.BAA10Y, sectors: pick(L.US_SECTORS) },
  korea: { index: Y["^KS11"], krw: Y["KRW=X"], flows: FLm, margin: K.margin, sectors: pick(L.KR_SECTORS) }
};
const RES = {}; ["us", "korea"].forEach((c) => { RES[c] = L.compute(c, CAL[c], IN[c]); });

// ── 월말 표본 ──
const LASTM = addM(new Date().toISOString().slice(0, 7), -1);   // 끝난 달까지
function monthEnds(c) {   // {ym: 그 달 마지막 거래일 순번}
  const o = {}; CAL[c].forEach((d, i) => { o[d.slice(0, 7)] = i; }); return o;
}
const ME = { us: monthEnds("us"), korea: monthEnds("korea") };
const firstOk = (a, dates) => { for (let i = 0; i < a.length; i++) if (ok(a[i])) return dates[i]; return null; };

if (has("coverage")) {
  ["us", "korea"].forEach((c) => {
    const R = RES[c], dates = R.dates;
    console.log("\n[" + c + "] 거래일 " + dates[0] + "~" + dates[dates.length - 1]);
    L.COMPS[c].forEach((d) => console.log("  " + d.key.padEnd(5) + " 원값 " + firstOk(R.comps[d.key].raw, dates) + " · 백분위 " + firstOk(R.comps[d.key].pct, dates)));
    console.log("  원점수 " + firstOk(R.raw, dates) + " · 심리 점수 " + firstOk(R.score, dates));
    const ms = Object.keys(ME[c]).filter((ym) => ym <= LASTM && ok(R.score[ME[c][ym]])).sort();
    const band = [0, 0, 0, 0, 0]; ms.forEach((ym) => { const s = R.score[ME[c][ym]]; band[s < 20 ? 0 : s < 40 ? 1 : s < 60 ? 2 : s < 80 ? 3 : 4]++; });
    console.log("  월말 표본 " + ms.length + "개(" + ms[0] + "~" + ms[ms.length - 1] + ") — 극도의 공포 " + band[0] + " · 공포 " + band[1] + " · 중립 " + band[2] + " · 환호 " + band[3] + " · 극도의 환호 " + band[4]);
    const i = dates.length - 1;
    console.log("  지금(" + dates[i] + ") 점수 " + r4(R.score[i]) + " · 지표 " + L.COMPS[c].map((d) => d.key + " " + t2(R.comps[d.key].raw[i]) + "→" + t2(R.comps[d.key].pct[i])).join(" · "));
  });
  process.exit(0);
}

// ── 결과 변수(유동성 연구와 같은 정의) ──
// 한국 무위험 = ECOS CD 91일(월평균). ECOS 를 받지 못하면 FRED 의 OECD 한국 3개월 금리(IR3TIB01KRM156N — CD 91일)로 대신한다(README 에 적음)
const DTB3 = F.DTB3 || {};
const CD = (E.cd91 && Object.keys(E.cd91).length) ? E.cd91 : (() => { const o = {}; Object.keys(F.IR3TIB01KRM156N || {}).forEach((d) => { o[d.slice(0, 7)] = F.IR3TIB01KRM156N[d]; }); return o; })();
const CD_SRC = (E.cd91 && Object.keys(E.cd91).length) ? "ECOS CD91" : "FRED IR3TIB01KRM156N";
function lastVal(map, iso, maxDays) {   // iso 이하 마지막 값
  const ks = (lastVal.cache[map === DTB3 ? "d" : "x"] = lastVal.cache[map === DTB3 ? "d" : "x"] || Object.keys(map).sort());
  let lo = 0, hi = ks.length - 1, idx = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (ks[m] <= iso) { idx = m; lo = m + 1; } else hi = m - 1; }
  if (idx < 0 || (Date.parse(iso) - Date.parse(ks[idx])) / 864e5 > maxDays) return null;
  return map[ks[idx]];
}
lastVal.cache = {};
const PX = { us: L.align(CAL.us, Y.SPY), korea: L.align(CAL.korea, Y["^KS11"]) };   // 수익 = 미국 SPY(배당 포함)·한국 코스피
function exMonth(c, ym) {   // 그달 초과수익 = 월간 수익 − 무위험(전월말 3개월 국채·전월 CD 91일 ÷ 12)
  const p = addM(ym, -1), i = ME[c][ym], j = ME[c][p];
  if (i == null || j == null || !ok(PX[c][i]) || !ok(PX[c][j])) return null;
  const rf = c === "us" ? lastVal(DTB3, CAL.us[j], 10) : CD[p];
  return ok(rf) ? PX[c][i] / PX[c][j] - 1 - rf / 1200 : null;
}
function fwd(c, ym, h) { let s = 0; for (let k = 1; k <= h; k++) { const m = addM(ym, k); if (m > LASTM) return null; const v = exMonth(c, m); if (!ok(v)) return null; s += v; } return s; }
function crash(c, ym) {   // 다음 63거래일 안 월말 종가 대비 −10% 이하
  const i = ME[c][ym], a = PX[c]; if (i == null || i + 63 >= a.length || !ok(a[i])) return null;
  let mn = Infinity; for (let k = i + 1; k <= i + 63; k++) if (ok(a[k])) mn = Math.min(mn, a[k]);
  return mn / a[i] - 1 <= -0.10 ? 1 : 0;
}

// ── 통계(유동성 연구와 같은 식) ──
function ols(x, y) { const n = x.length, mx = mean(x), my = mean(y); let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; } const b = sxx ? sxy / sxx : 0; return { a: my - b * mx, b }; }
function nwSlope(x, y, lag) {
  const n = x.length; if (n < 24) return { b: null, t: null, n };
  const { a, b } = ols(x, y), mx = mean(x); let sxx = 0; for (let i = 0; i < n; i++) sxx += (x[i] - mx) ** 2;
  if (!sxx) return { b: null, t: null, n };
  const u = x.map((xi, i) => (xi - mx) * (y[i] - a - b * xi));
  let S = u.reduce((s, v) => s + v * v, 0); for (let Lg = 1; Lg <= lag; Lg++) { let cc = 0; for (let i = Lg; i < n; i++) cc += u[i] * u[i - Lg]; S += 2 * (1 - Lg / (lag + 1)) * cc; }
  const se = Math.sqrt(S) / sxx; return { b, t: se > 0 ? b / se : null, n };
}
const OOS0 = { us: "2005-01", korea: "2014-01" };
const THR = { 3: 0.02, 12: 0.05 }, MIN_ZONE_HALF = 6;

// 표본: 점수가 있는 끝난 달
function sample(c, x) {   // x(ym) → 신호값
  return Object.keys(ME[c]).filter((ym) => ym <= LASTM).sort().map((ym) => ({ ym, x: x(ym) })).filter((r) => ok(r.x));
}
function splitOf(c, S) {   // 전반·후반 — 점수와 3개월 수익이 다 있는 달의 가운데
  const ms = S.filter((r) => ok(fwd(c, r.ym, 3))).map((r) => r.ym);
  return ms[Math.floor(ms.length / 2)];
}
function evalSignal(c, S, label) {
  const spl = splitOf(c, S), out = { label, n: S.length, from: S.length ? S[0].ym : null, split: spl };
  // H1 — 점수(0~1) → 다음 h개월 초과수익, 기울기 음(역발상)
  out.H1 = {};
  [3, 12].forEach((h) => {
    const X = [], Yv = [], D = [], A = [[], []], B = [[], []];
    S.forEach((r) => { const y = fwd(c, r.ym, h); if (!ok(y)) return; X.push(r.x / 100); Yv.push(y); D.push(r.ym); const H = r.ym < spl ? A : B; H[0].push(r.x / 100); H[1].push(y); });
    const full = nwSlope(X, Yv, h + 1), b1 = A[0].length >= 24 ? ols(A[0], A[1]).b : null, b2 = B[0].length >= 24 ? ols(B[0], B[1]).b : null;
    let sseM = 0, sseB = 0, nO = 0;
    for (let i = 0; i < D.length; i++) {
      if (D[i] < OOS0[c]) continue;
      const lim = addM(D[i], -h), tx = [], ty = [];
      for (let j = 0; j < i; j++) if (D[j] <= lim) { tx.push(X[j]); ty.push(Yv[j]); }
      if (tx.length < 36) continue;
      const f = ols(tx, ty), pm = f.a + f.b * X[i], pb = mean(ty);
      sseM += (Yv[i] - pm) ** 2; sseB += (Yv[i] - pb) ** 2; nO++;
    }
    const oos = nO >= 24 && sseB > 0 ? 1 - sseM / sseB : null;
    out.H1[h] = { b: r4(full.b), t: t2(full.t), n: full.n, h1: r4(b1), h2: r4(b2), oosR2: r4(oos), nOos: nO,
      pass: !!(ok(full.t) && full.t <= -2 && ok(b1) && ok(b2) && b1 < 0 && b2 < 0 && ok(oos) && oos > 0) };
  });
  // 극단 구간 — zone(x) 이 참인 달 vs 나머지
  const zoneTest = (zone, yOf, lag, sign, thr) => {
    const X = [], Yv = [], H = [[[], []], [[], []]];
    S.forEach((r) => { const y = yOf(r.ym); if (!ok(y)) return; const z = zone(r.x) ? 1 : 0; X.push(z); Yv.push(y); H[r.ym < spl ? 0 : 1][z].push(y); });
    const zIn = X.filter((v) => v === 1).length, all = nwSlope(X, Yv, lag);
    const dIn = mean(Yv.filter((_, i) => X[i] === 1)), dOut = mean(Yv.filter((_, i) => X[i] === 0));
    const half = H.map((g) => ({ nIn: g[1].length, diff: g[1].length && g[0].length ? mean(g[1]) - mean(g[0]) : null }));
    const diff = ok(dIn) && ok(dOut) ? dIn - dOut : null;
    const enough = half.every((g) => g.nIn >= MIN_ZONE_HALF);
    const pass = !!(enough && ok(all.t) && ok(diff) && half.every((g) => ok(g.diff) && sign * g.diff > 0) && sign * all.t >= 2 && sign * diff >= thr);
    return { inZone: r4(dIn), rest: r4(dOut), diff: r4(diff), t: t2(all.t), nIn: zIn, n: X.length, h1: r4(half[0].diff), h2: r4(half[1].diff), nInHalf: half.map((g) => g.nIn), pass };
  };
  const fear = (x) => x < 20, greed = (x) => x >= 80;
  out.H2 = {}; out.H3 = {};
  [3, 12].forEach((h) => {
    out.H2[h] = zoneTest(fear, (ym) => fwd(c, ym, h), h + 1, +1, THR[h]);
    out.H3[h] = zoneTest(greed, (ym) => fwd(c, ym, h), h + 1, -1, THR[h]);
  });
  out.H4 = zoneTest(greed, (ym) => crash(c, ym), 3, +1, 0.05);
  out.H5 = zoneTest(fear, (ym) => crash(c, ym), 3, +1, 0.05);
  // H4·H5 의 사전 기준은 '두 반쪽 모두 +5%p 이상'(평균 차이가 아니라 반쪽마다) — 다시 판정
  [out.H4, out.H5].forEach((o) => { o.pass = !!(o.nInHalf.every((v) => v >= MIN_ZONE_HALF) && ok(o.h1) && ok(o.h2) && o.h1 >= 0.05 && o.h2 >= 0.05 && ok(o.t) && o.t >= 2); });
  // 단계별 기술(판정 아님): 다섯 구간의 다음 3·12개월 평균 초과수익·급락 비율·달 수
  const bands = [[0, 20], [20, 40], [40, 60], [60, 80], [80, 101]];
  out.bands = bands.map(([lo, hi]) => {
    const rs = S.filter((r) => r.x >= lo && r.x < hi);
    return { lo, hi, n: rs.length, f3: r4(mean(rs.map((r) => fwd(c, r.ym, 3)))), f12: r4(mean(rs.map((r) => fwd(c, r.ym, 12)))), crash: r4(mean(rs.map((r) => crash(c, r.ym)))) };
  });
  out.all = { f3: r4(mean(S.map((r) => fwd(c, r.ym, 3)))), f12: r4(mean(S.map((r) => fwd(c, r.ym, 12)))), crash: r4(mean(S.map((r) => crash(c, r.ym)))) };
  return out;
}

const res = { asOf: new Date().toISOString().slice(0, 10), lastMonth: LASTM, primary: {}, components: {}, allComps: {}, latest: {} };
["us", "korea"].forEach((c) => {
  const R = RES[c], at = (ym) => R.score[ME[c][ym]];
  res.primary[c] = evalSignal(c, sample(c, at), c + " 심리 점수");
  // 사전 등록한 보조(판정에 쓰지 않음): 지표 하나씩(방향 맞춘 백분위), 지표가 모두 있는 달만
  res.components[c] = L.COMPS[c].map((d) => evalSignal(c, sample(c, (ym) => R.comps[d.key].pct[ME[c][ym]]), c + " " + d.key));
  const nAll = L.COMPS[c].length;
  res.allComps[c] = evalSignal(c, sample(c, (ym) => (R.n[ME[c][ym]] === nAll ? R.score[ME[c][ym]] : null)), c + " 모든 지표가 있는 달");
  const i = R.dates.length - 1;
  res.latest[c] = { date: R.dates[i], score: r4(R.score[i]), level: L.levelOf(R.score[i]), comps: L.COMPS[c].map((d) => ({ key: d.key, raw: r4(R.comps[d.key].raw[i]), pct: r4(R.comps[d.key].pct[i]) })) };
});

const P = (v) => (ok(v) ? (v * 100).toFixed(1) + "%" : "–");
const show = (o) => {
  console.log("\n■ " + o.label + " — 월말 " + o.n + "개(" + o.from + "~), 전·후반 경계 " + o.split);
  [3, 12].forEach((h) => { const q = o.H1[h]; console.log("  H1 " + h + "개월: 기울기 " + q.b + " t " + q.t + " 전/후 " + q.h1 + "/" + q.h2 + " 표본 밖 R² " + q.oosR2 + (q.pass ? " ✔" : " ✗")); });
  [3, 12].forEach((h) => { const q = o.H2[h]; console.log("  H2 극도의 공포 → " + h + "개월: " + P(q.inZone) + " vs " + P(q.rest) + " (차 " + P(q.diff) + " t " + q.t + " 전/후 " + P(q.h1) + "/" + P(q.h2) + " 달 " + q.nInHalf.join("/") + ")" + (q.pass ? " ✔" : " ✗")); });
  [3, 12].forEach((h) => { const q = o.H3[h]; console.log("  H3 극도의 환호 → " + h + "개월: " + P(q.inZone) + " vs " + P(q.rest) + " (차 " + P(q.diff) + " t " + q.t + " 전/후 " + P(q.h1) + "/" + P(q.h2) + " 달 " + q.nInHalf.join("/") + ")" + (q.pass ? " ✔" : " ✗")); });
  [["H4 극도의 환호 → 3개월 안 −10%", o.H4], ["H5 극도의 공포 → 3개월 안 −10%", o.H5]].forEach(([n, q]) => console.log("  " + n + ": " + P(q.inZone) + " vs " + P(q.rest) + " (전/후 " + P(q.h1) + "/" + P(q.h2) + " t " + q.t + " 달 " + q.nInHalf.join("/") + ")" + (q.pass ? " ✔" : " ✗")));
  console.log("  구간별(판정 아님): " + o.bands.map((b) => b.lo + "~" + b.hi + " n" + b.n + " 3개월 " + P(b.f3) + " 12개월 " + P(b.f12) + " 급락 " + P(b.crash)).join(" | ") + " | 전체 3개월 " + P(o.all.f3) + " 12개월 " + P(o.all.f12) + " 급락 " + P(o.all.crash));
};
["us", "korea"].forEach((c) => { show(res.primary[c]); show(res.allComps[c]); });
console.log("\n— 보조(지표 하나씩, 판정 아님) —");
["us", "korea"].forEach((c) => res.components[c].forEach((o) => console.log("  " + o.label.padEnd(12) + " H1 3/12 t " + o.H1[3].t + "/" + o.H1[12].t + " · 공포 12개월 차 " + P(o.H2[12].diff) + " (t " + o.H2[12].t + ") · 환호 12개월 차 " + P(o.H3[12].diff) + " (t " + o.H3[12].t + ") · 환호 급락 차 " + P(o.H4.diff) + " · 공포 급락 차 " + P(o.H5.diff))));
console.log("\n지금: " + JSON.stringify(res.latest));
if (arg("out")) fs.writeFileSync(arg("out"), JSON.stringify(res, null, 1));
if (arg("dump")) {
  const d = {}; ["us", "korea"].forEach((c) => { d[c] = Object.keys(ME[c]).filter((ym) => ym <= LASTM).sort().map((ym) => [ym, r4(RES[c].score[ME[c][ym]]), r4(exMonth(c, ym)), crash(c, ym)]); });
  fs.writeFileSync(arg("dump"), JSON.stringify(d));
}
