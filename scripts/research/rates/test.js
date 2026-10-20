#!/usr/bin/env node
// 금리 예측 모델 검증 — 시장 기대만(M1) vs 시장 기대 + 경제지표 준칙(M2) vs 준칙만(M3) vs 변화 없음(M0)
//
// 예측 대상: h개월 뒤 정책금리 − 지금 정책금리(h = 3·6·12). 미국 = 실효 연방기금금리 월평균, 한국 = 기준금리.
// 입력(시점 t 에 알 수 있던 것만): 시장 금리 스프레드 = h개월 시장 금리(미국 국채 3·6·12개월 월말, 한국 CD·KORIBOR 6개월·국고 1년) − 정책금리,
//   준칙 갭 = 테일러 준칙 금리 − 정책금리. 준칙 = 0.5 + π + 0.5(π − 2) + 2(u* − u) (π 근원물가 전년비, u 실업률 — 발표 시차로 t−1 값),
//   미국 u* = CBO 자연실업률, 한국 u* = 직전 10년 평균 실업률. 준칙 금리는 0 아래로 두지 않는다.
// 평가: 확장 창 표본 밖 — 시점 t 의 계수는 t 이전에 결과가 확정된 표본으로만 추정(OLS). 미국 2000-01~, 한국 2006-01~.
// ★ 사전 기준(2026-10-20 등록): M2 를 '예측 금리'로 쓰려면 (국가×기간)마다
//   ① 표본 밖 RMSE 가 M1 보다 작고 ② 앞·뒤 절반 모두 작고 ③ 손실 차이 t ≥ 2(겹치는 예측이라 유효 표본 n/h).
//   통과 못 하면 M1(시장 기대)을 예측으로 쓰고 준칙 금리는 참고선으로만 보인다.
//
// 사용법: node scripts/research/rates/test.js <panel.json> [--json out.json]
const fs = require("fs");
const P = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const outJson = process.argv.includes("--json") ? process.argv[process.argv.indexOf("--json") + 1] : null;

const addM = (ym, k) => { const [y, m] = ym.split("-").map(Number); return new Date(Date.UTC(y, m - 1 + k, 1)).toISOString().slice(0, 7); };
function taylor(D, ym) {
  const p = addM(ym, -1), pi = D.infl[p], u = D.unemp[p], us = D.ustar[p];
  if (pi == null || u == null || us == null) return null;
  return Math.max(0, 0.5 + pi + 0.5 * (pi - 2) + 2 * (us - u));
}
// 최소제곱(작은 행렬 — 정규방정식)
function ols(X, y) {
  const k = X[0].length, A = Array.from({ length: k }, () => new Array(k).fill(0)), b = new Array(k).fill(0);
  X.forEach((r, i) => { for (let a = 0; a < k; a++) { b[a] += r[a] * y[i]; for (let c = 0; c < k; c++) A[a][c] += r[a] * r[c]; } });
  for (let i = 0; i < k; i++) A[i][i] += 1e-9;
  // 가우스 소거
  for (let i = 0; i < k; i++) {
    let p = i; for (let r = i + 1; r < k; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
    [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
    for (let r = 0; r < k; r++) { if (r === i) continue; const f = A[r][i] / A[i][i]; for (let c = i; c < k; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; }
  }
  return b.map((v, i) => v / A[i][i]);
}
const MODELS = {
  M0: () => null,
  M1: (o) => [1, o.spread],
  M2: (o) => [1, o.spread, o.gap],
  M3: (o) => [1, o.gap],
  // 보조(탐색 — 사전 기준 밖, 기록용): M1f 기울기 1 고정(스프레드 − 평균 프리미엄, lib-bokpath 방식), M4 미국 시장 스프레드 추가(한국만)
  M1f: "fixed",
  M4: (o) => [1, o.spread, o.usSpread],
};

function run(cc, h, trainFrom, oosFrom) {
  const D = P[cc], inst = D["m" + h];
  const months = Object.keys(D.policy).sort();
  const rows = [];
  months.forEach((t) => {
    const pol = D.policy[t], mk = inst[t], T = taylor(D, t), fut = D.policy[addM(t, h)];
    if (pol == null || mk == null || T == null || t < trainFrom) return;
    const U = P.us, usS = U["m" + h][t] != null && U.policy[t] != null ? U["m" + h][t] - U.policy[t] : null;
    if (cc === "korea" && usS == null) return;
    rows.push({ t, pol, spread: mk - pol, gap: T - pol, taylor: T, usSpread: usS == null ? 0 : usS, y: fut == null ? null : fut - pol });
  });
  const res = {}, last = rows[rows.length - 1];
  Object.keys(MODELS).forEach((name) => {
    if (name === "M4" && cc !== "korea") return;
    const errs = [];
    let coef = null;
    rows.forEach((o) => {
      if (o.t < oosFrom || o.y == null) return;
      const train = rows.filter((s) => s.y != null && addM(s.t, h) <= o.t);
      if (train.length < 36) return;   // 추정 표본이 3년 미만인 시점은 평가하지 않는다(모든 모델 같은 시점만)
      let f = 0;
      if (name === "M1f") { const prem = train.reduce((a, s) => a + (s.spread - s.y), 0) / train.length; f = o.spread - prem; }
      else if (name !== "M0") { coef = ols(train.map(MODELS[name]), train.map((s) => s.y)); f = MODELS[name](o).reduce((a, x, i) => a + x * coef[i], 0); }
      errs.push({ t: o.t, e: o.y - f, y: o.y, f });
    });
    // 지금 시점 예측(전체 확정 표본으로 추정)
    let now = 0, coefNow = null;
    const tr = rows.filter((s) => s.y != null);
    if (name === "M1f") { const prem = tr.reduce((a, s) => a + (s.spread - s.y), 0) / tr.length; now = last.spread - prem; coefNow = [prem]; }
    else if (name !== "M0") { coefNow = ols(tr.map(MODELS[name]), tr.map((s) => s.y)); now = MODELS[name](last).reduce((a, x, i) => a + x * coefNow[i], 0); }
    res[name] = { errs, coef: coefNow, now };
  });
  const rmse = (a) => Math.sqrt(a.reduce((s, x) => s + x.e * x.e, 0) / a.length);
  const n = res.M1.errs.length, half = Math.floor(n / 2);
  const out = { country: cc, h, n, from: res.M1.errs[0].t, to: res.M1.errs[n - 1].t, asOf: last.t, policy: last.pol, taylor: +last.taylor.toFixed(3), spread: +last.spread.toFixed(3), models: {} };
  Object.keys(res).forEach((k) => {
    const e = res[k].errs;
    // 방향 적중: 실제 변화가 ±0.125%p 이상인 시점에서 예측 부호가 맞은 비율(M0 은 해당 없음)
    const mv = e.filter((x) => Math.abs(x.y) >= 0.125), hit = mv.filter((x) => Math.sign(x.f) === Math.sign(x.y)).length;
    out.models[k] = { hit: k === "M0" ? null : hit + "/" + mv.length, rmse: +rmse(e).toFixed(3), rmse1: +rmse(e.slice(0, half)).toFixed(3), rmse2: +rmse(e.slice(half)).toFixed(3),
      now: +res[k].now.toFixed(3), coef: res[k].coef && res[k].coef.map((x) => +x.toFixed(3)) };
  });
  // 손실 차이 t(M2 vs M1) — 겹침 보정: 유효 표본 n/h
  const d = res.M1.errs.map((x, i) => x.e * x.e - res.M2.errs[i].e * res.M2.errs[i].e);
  if (res.M0.errs.length !== n) throw new Error("모델별 평가 시점 불일치");
  const md = d.reduce((a, b) => a + b, 0) / d.length, sd = Math.sqrt(d.reduce((a, b) => a + (b - md) ** 2, 0) / (d.length - 1));
  out.dm = +(md / (sd / Math.sqrt(d.length / h))).toFixed(2);
  const m1 = out.models.M1, m2 = out.models.M2;
  out.pass = m2.rmse < m1.rmse && m2.rmse1 < m1.rmse1 && m2.rmse2 < m1.rmse2 && out.dm >= 2;
  return out;
}

const all = [];
[["us", "1990-01", "2000-01"], ["korea", "2001-01", "2006-01"]].forEach(([cc, tf, of]) => {
  [3, 6, 12].forEach((h) => {
    const r = run(cc, h, tf, of);
    all.push(r);
    const f = (k) => k + " " + r.models[k].rmse + " (" + r.models[k].rmse1 + "/" + r.models[k].rmse2 + (r.models[k].hit ? " 방향 " + r.models[k].hit : "") + ")";
    console.log((cc === "us" ? "미국" : "한국") + " " + h + "개월 · 표본 밖 " + r.n + "개월 " + r.from + "~" + r.to + " · RMSE(앞/뒤) " +
      Object.keys(r.models).map(f).join(" | ") + " · M2 vs M1 t " + r.dm + " → " + (r.pass ? "통과" : "기각"));
    console.log("   지금(" + r.asOf + ") 정책 " + r.policy + " · 준칙 " + r.taylor + " · 스프레드 " + r.spread + " → 예측 변화 M1 " + r.models.M1.now + " · M2 " + r.models.M2.now + " · M3 " + r.models.M3.now + " · M1f " + r.models.M1f.now + (r.models.M4 ? " · M4 " + r.models.M4.now : "") +
      " · M2 계수 " + JSON.stringify(r.models.M2.coef));
  });
});
if (outJson) fs.writeFileSync(outJson, JSON.stringify({ builtAt: new Date().toISOString(), results: all }, null, 1));
