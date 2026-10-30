#!/usr/bin/env node
// 유동성(돈의 흐름)과 주가 — 사전 등록(PREREG.md) 평가 실행
// 사용: node scripts/research/liquidity/test-liquidity.js <캐시(fetch.js)> [--flows data/market-flows.json] [--out 결과.json]
// 시점(룩어헤드 방지): 월말 신호는 그때 공개된 값만 — 연준 주간 자료 2일·NFCI 5일·은행 신용 10일 지연, 미국 M2·물가 1개월·한국 M2 2개월 지연,
//   일별 시장 자료(금리·스프레드·환율·지수·예탁금·외국인 수급)는 그날 값.
"use strict";
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(process.argv[2] || "liq-cache");
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const FLOWS = path.resolve(arg("flows") || path.join(__dirname, "..", "..", "..", "data", "market-flows.json"));
const rd = (f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
const F = rd("fred.json"), Y = rd("yahoo.json"), K = rd("kofia.json"), E = rd("ecos.json");
const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const sd = (a) => { const x = a.filter(ok); if (x.length < 3) return null; const m = mean(x); return Math.sqrt(x.reduce((s, v) => s + (v - m) ** 2, 0) / (x.length - 1)); };
const r4 = (v) => (ok(v) ? Math.round(v * 10000) / 10000 : null);
const t2 = (v) => (ok(v) ? Math.round(v * 100) / 100 : null);

// ── 날짜 도구 ──
const addM = (ym, k) => { const [y, m] = ym.split("-").map(Number); return new Date(Date.UTC(y, m - 1 + k, 1)).toISOString().slice(0, 7); };
const endOf = (ym) => { const [y, m] = ym.split("-").map(Number); return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10); };
const minusD = (iso, d) => new Date(Date.parse(iso + "T00:00:00Z") - d * 864e5).toISOString().slice(0, 10);
function sorted(map) { const ks = Object.keys(map || {}).sort(); return { ks, vs: ks.map((k) => map[k]) }; }
const SER = {};
function ser(name, map) { if (!SER[name]) SER[name] = sorted(map); return SER[name]; }
// 날짜 iso 이하 마지막 값(그 전 maxAge 일 안)
function at(name, map, iso, maxAge) {
  const s = ser(name, map); let lo = 0, hi = s.ks.length - 1, idx = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (s.ks[m] <= iso) { idx = m; lo = m + 1; } else hi = m - 1; }
  if (idx < 0) return null;
  if (maxAge && (Date.parse(iso) - Date.parse(s.ks[idx])) / 864e5 > maxAge) return null;
  return s.vs[idx];
}
const monthly = (map) => { const o = {}; Object.keys(map || {}).forEach((d) => { o[d.slice(0, 7)] = map[d]; }); return o; };

// ── 월 축 ──
const LASTM = addM(new Date().toISOString().slice(0, 7), -1);
const months = []; for (let m = "2002-01"; m <= LASTM; m = addM(m, 1)) months.push(m);

// ── 미국 원자료(월말, 공개 지연 반영) ──
const M2 = monthly(F.M2SL), CPI = monthly(F.CPIAUCSL);
const US = {};
months.forEach((ym) => {
  const e = endOf(ym);
  const walcl = at("WALCL", F.WALCL, minusD(e, 2), 10), tga = at("WTREGEN", F.WTREGEN, minusD(e, 2), 10), rrp = at("RRP", F.RRPONTSYD, e, 10);
  US[ym] = {
    NL: ok(walcl) && ok(tga) ? walcl - tga - (ok(rrp) ? rrp * 1000 : 0) : null,
    M2: M2[addM(ym, -1)], CPI: CPI[addM(ym, -1)], M2now: M2[ym],
    BK: at("TOTBKCR", F.TOTBKCR, minusD(e, 10), 20), BKnow: at("TOTBKCR2", F.TOTBKCR, e, 10),
    CS: at("BAA10Y", F.BAA10Y, e, 10), FCI: at("NFCI", F.NFCI, minusD(e, 5), 14), FCInow: at("NFCI2", F.NFCI, e, 10),
    CRV: at("T10Y3M", F.T10Y3M, e, 10), RR: at("DFII10", F.DFII10, e, 10), RF: at("DTB3", F.DTB3, e, 10),
    DXY: at("DXY", Y["DX-Y.NYB"], e, 10), SPY: at("SPY", Y.SPY, e, 10), KS: at("KS11", Y["^KS11"], e, 10), KRW: at("KRW", Y["KRW=X"], e, 10),
  };
});
// ── 한국 원자료 ──
const DEP = {}, MRG = {};
Object.keys(K.deposit || {}).forEach((d) => { const v = K.deposit[d]; DEP[d] = Array.isArray(v) ? v[0] : v; });
Object.keys(K.margin || {}).forEach((d) => { const v = K.margin[d]; MRG[d] = Array.isArray(v) ? v[0] : v; });
const FL = JSON.parse(fs.readFileSync(FLOWS, "utf8"));
const FCOL = FL.cols.indexOf("외국인");
const FFm = {};
(FL.kospi || []).forEach((r) => { const s = String(r[0]); const ym = s.slice(0, 4) + "-" + s.slice(4, 6); if (ok(r[FCOL])) FFm[ym] = (FFm[ym] || 0) + r[FCOL]; });
const FF0 = Object.keys(FFm).sort()[0];
const KR = {};
months.forEach((ym) => {
  const e = endOf(ym);
  KR[ym] = { DEP: at("DEP", DEP, minusD(e, 1), 10), MRG: at("MRG", MRG, minusD(e, 1), 10), M2: E.m2 ? E.m2[addM(ym, -2)] : null, M2now: E.m2 ? E.m2[ym] : null,
    KCS: E.corp3 && E.ktb3 && ok(E.corp3[ym]) && ok(E.ktb3[ym]) ? E.corp3[ym] - E.ktb3[ym] : null, CD: E.cd91 ? E.cd91[ym] : null,
    FF: FF0 && ym >= FF0 && ym < LASTM ? (FFm[ym] || 0) : (FF0 && ym === LASTM ? FFm[ym] || null : null) };
});

// ── 지금 게이지(update-liquidity-gauge.js 와 같은 식) — 그 날짜까지의 일봉으로 ──
function sYieldLevel(y) { if (y < 3.8) return 2; if (y < 4.1) return 1; if (y < 4.4) return 0; if (y < 4.7) return -1; return -2; }
function sTrend(chRate, favorFall) { if (chRate == null) return null; const s = favorFall ? -chRate : chRate; if (s > 0.03) return 2; if (s > 0.01) return 1; if (s > -0.01) return 0; if (s > -0.03) return -1; return -2; }
function sVix(v) { if (v < 13) return 2; if (v < 16) return 1; if (v < 21) return 0; if (v < 27) return -1; return -2; }
function sCredit(ch) { if (ch == null) return null; if (ch > 0.015) return 2; if (ch > 0.005) return 1; if (ch > -0.005) return 0; if (ch > -0.02) return -1; return -2; }
function sCurve(spread) { if (spread == null) return null; if (spread > 0.8) return 2; if (spread > 0.4) return 1; if (spread > 0.05) return 0; if (spread > -0.3) return -1; return -2; }
function composite(items) { let s = 0, w = 0; items.forEach(([sc, wt]) => { if (sc == null) return; s += sc * wt; w += wt; }); return w ? s / w : null; }
function tail(name, map, iso, n) {   // iso 이하 마지막 n+1 개 종가
  const s = ser(name, map); let lo = 0, hi = s.ks.length - 1, idx = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (s.ks[m] <= iso) { idx = m; lo = m + 1; } else hi = m - 1; }
  if (idx < n) return null;
  if ((Date.parse(iso) - Date.parse(s.ks[idx])) / 864e5 > 10) return null;
  return s.vs.slice(idx - n, idx + 1);
}
const chgN = (a, n) => (a && a.length > n ? a[a.length - 1] / a[a.length - 1 - n] - 1 : null);
function gaugeAt(ym) {
  const e = endOf(ym);
  const tnx = tail("TNX", Y["^TNX"], e, 60), irx = tail("IRX", Y["^IRX"], e, 0), vix = tail("VIX", Y["^VIX"], e, 0), hyg = tail("HYG", Y.HYG, e, 60),
    dxy = tail("DXYd", Y["DX-Y.NYB"], e, 60), krw = tail("KRWd", Y["KRW=X"], e, 60), ks = tail("KSd", Y["^KS11"], e, 60);
  if (!tnx || !vix || !hyg || !dxy || !krw || !ks) return null;
  const y10 = tnx[tnx.length - 1], spread = irx ? y10 - irx[irx.length - 1] : null, v = vix[vix.length - 1];
  const tn20 = chgN(tnx, 20), hy20 = chgN(hyg, 20), hy60 = chgN(hyg, 60), dx20 = chgN(dxy, 20), dx60 = chgN(dxy, 60), kw20 = chgN(krw, 20), kw60 = chgN(krw, 60), k20 = chgN(ks, 20), k60 = chgN(ks, 60);
  return {
    usS: composite([[sVix(v), 1], [sTrend(tn20, true), 1], [sCredit(hy20), 1.2], [sTrend(dx20, true), 0.8], [sCurve(spread), 0.8]]),
    usM: composite([[sYieldLevel(y10), 1.3], [sCurve(spread), 1.2], [sCredit(hy60), 1], [sTrend(dx60, true), 0.8], [sVix(v), 0.6]]),
    krS: composite([[sTrend(kw20, true), 1.2], [sTrend(k20, false), 1.2], [sVix(v), 0.9], [sCredit(hy20), 0.9], [sTrend(dx20, true), 0.8]]),
    krM: composite([[sTrend(kw60, true), 1.1], [sTrend(k60, false), 1.1], [sTrend(dx60, true), 0.9], [sCredit(hy60), 0.9], [sVix(v), 0.6]]),
  };
}

// ── 신호(사전 방향: dir = +1 이면 클수록 우호, −1 이면 작을수록 우호) ──
const g = (o, k) => (o ? o[k] : null);
const pchg = (a, b) => (ok(a) && ok(b) && b !== 0 ? a / b - 1 : null);
const dif = (a, b) => (ok(a) && ok(b) ? a - b : null);
const SIG = {};
function put(key, ym, v) { (SIG[key] = SIG[key] || {})[ym] = ok(v) ? v : null; }
months.forEach((ym) => {
  const u = US[ym], u3 = US[addM(ym, -3)], u12 = US[addM(ym, -12)], k = KR[ym], k3 = KR[addM(ym, -3)], k12 = KR[addM(ym, -12)];
  put("NL3", ym, pchg(g(u, "NL"), g(u3, "NL"))); put("NL12", ym, pchg(g(u, "NL"), g(u12, "NL")));
  put("M2R", ym, ok(pchg(g(u, "M2"), g(u12, "M2"))) && ok(pchg(g(u, "CPI"), g(u12, "CPI"))) ? pchg(g(u, "M2"), g(u12, "M2")) - pchg(g(u, "CPI"), g(u12, "CPI")) : null);
  put("BK12", ym, pchg(g(u, "BK"), g(u12, "BK")));
  put("CS", ym, g(u, "CS")); put("CS3", ym, dif(g(u, "CS"), g(u3, "CS")));
  put("FCI", ym, g(u, "FCI")); put("FCI3", ym, dif(g(u, "FCI"), g(u3, "FCI")));
  put("USD3", ym, pchg(g(u, "DXY"), g(u3, "DXY"))); put("CRV", ym, g(u, "CRV")); put("RR3", ym, dif(g(u, "RR"), g(u3, "RR")));
  put("KDEP3", ym, pchg(g(k, "DEP"), g(k3, "DEP"))); put("KMRG3", ym, pchg(g(k, "MRG"), g(k3, "MRG")));
  put("KM2", ym, pchg(g(k, "M2"), g(k12, "M2"))); put("KCS3", ym, dif(g(k, "KCS"), g(k3, "KCS"))); put("KRW3", ym, pchg(g(u, "KRW"), g(u3, "KRW")));
  const gg = gaugeAt(ym);
  put("GAUGE_US_S", ym, gg && gg.usS); put("GAUGE_US_M", ym, gg && gg.usM); put("GAUGE_KR_S", ym, gg && gg.krS); put("GAUGE_KR_M", ym, gg && gg.krM);
});
// KFF3 — 외국인 3개월 합 ÷ 직전 36개월(최소 24개월) 3개월 합 표준편차
months.forEach((ym, i) => {
  const s3 = (j) => { const a = [0, 1, 2].map((d) => g(KR[months[j - d]], "FF")); return a.every(ok) ? a.reduce((x, y) => x + y, 0) : null; };
  if (i < 3) return put("KFF3", ym, null);
  const cur = s3(i), hist = [];
  for (let j = i - 36; j < i; j++) if (j >= 2) { const v = s3(j); if (ok(v)) hist.push(v); }
  const s = hist.length >= 24 ? sd(hist) : null;
  put("KFF3", ym, ok(cur) && ok(s) && s > 0 ? cur / s : null);
});
const DIR_ = { NL3: 1, NL12: 1, M2R: 1, BK12: 1, CS: -1, CS3: -1, FCI: -1, FCI3: -1, USD3: -1, CRV: 1, RR3: -1, KDEP3: 1, KMRG3: 1, KM2: 1, KCS3: -1, KRW3: -1, KFF3: 1,
  GAUGE_US_S: 1, GAUGE_US_M: 1, GAUGE_KR_S: 1, GAUGE_KR_M: 1, FLOW_US: 1, FLOW_KR: 1 };
// FLOW — 직전 60개월(최소 36개월) 평균·표준편차로 z, 방향 맞춘 평균(구성 신호 3개 이상)
function zAt(key, i) {
  const v = SIG[key][months[i]]; if (!ok(v)) return null;
  const h = []; for (let j = Math.max(0, i - 60); j < i; j++) { const x = SIG[key][months[j]]; if (ok(x)) h.push(x); }
  if (h.length < 36) return null; const s = sd(h); return s > 0 ? DIR_[key] * (v - mean(h)) / s : null;
}
months.forEach((ym, i) => {
  const zu = ["NL3", "CS3", "FCI3", "USD3", "M2R"].map((k) => zAt(k, i)).filter(ok);
  const zk = ["KDEP3", "KCS3", "KRW3", "KFF3", "NL3"].map((k) => zAt(k, i)).filter(ok);
  put("FLOW_US", ym, zu.length >= 3 ? mean(zu) : null); put("FLOW_KR", ym, zk.length >= 3 ? mean(zk) : null);
});

// ── 결과 변수 ──
function exRet(mkt, ym) {
  const p = addM(ym, -1);
  if (mkt === "us") { const a = g(US[ym], "SPY"), b = g(US[p], "SPY"), rf = g(US[p], "RF"); return ok(a) && ok(b) && ok(rf) ? a / b - 1 - rf / 1200 : null; }
  const a = g(US[ym], "KS"), b = g(US[p], "KS"), cd = g(KR[p], "CD"); return ok(a) && ok(b) && ok(cd) ? a / b - 1 - cd / 1200 : null;
}
const EX = { us: {}, kr: {} }; months.forEach((ym) => { EX.us[ym] = exRet("us", ym); EX.kr[ym] = exRet("kr", ym); });
function fwd(mkt, i, h) { let s = 0; for (let k = 1; k <= h; k++) { const ym = months[i + k]; if (!ym) return null; const v = EX[mkt][ym]; if (!ok(v)) return null; s += v; } return s; }
function dd10(mkt, ym) {   // 다음 63거래일 안 월말 종가 대비 −10% 이하
  const map = mkt === "us" ? Y.SPY : Y["^KS11"], name = mkt === "us" ? "SPYd" : "KSd2", s = ser(name, map), e = endOf(ym);
  let lo = 0, hi = s.ks.length - 1, idx = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (s.ks[m] <= e) { idx = m; lo = m + 1; } else hi = m - 1; }
  if (idx < 0 || idx + 63 >= s.ks.length) return null;
  const p0 = s.vs[idx]; let mn = Infinity; for (let k = idx + 1; k <= idx + 63; k++) mn = Math.min(mn, s.vs[k]);
  return mn / p0 - 1 <= -0.10 ? 1 : 0;
}
const DD = { us: {}, kr: {} }; months.forEach((ym) => { DD.us[ym] = dd10("us", ym); DD.kr[ym] = dd10("kr", ym); });

// ── 통계 ──
function ols(x, y) { const n = x.length, mx = mean(x), my = mean(y); let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; } const b = sxx ? sxy / sxx : 0; return { a: my - b * mx, b }; }
function nwSlope(x, y, lag) {   // 기울기와 뉴이-웨스트 t
  const n = x.length; if (n < 24) return { b: null, t: null, n };
  const { a, b } = ols(x, y), mx = mean(x); let sxx = 0; for (let i = 0; i < n; i++) sxx += (x[i] - mx) ** 2;
  const u = x.map((xi, i) => (xi - mx) * (y[i] - a - b * xi));
  let S = u.reduce((s, v) => s + v * v, 0); for (let L = 1; L <= lag; L++) { let c = 0; for (let i = L; i < n; i++) c += u[i] * u[i - L]; S += 2 * (1 - L / (lag + 1)) * c; }
  const se = Math.sqrt(S) / sxx; return { b, t: se > 0 ? b / se : null, n };
}
function corr(x, y) { const n = x.length; if (n < 12) return null; const mx = mean(x), my = mean(y); let a = 0, b = 0, c = 0; for (let i = 0; i < n; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) ** 2; c += (y[i] - my) ** 2; } return b && c ? a / Math.sqrt(b * c) : null; }
const SPL = { us: "2015-01", kr: "2016-01" }, OOS0 = { us: "2012-01", kr: "2014-01" };
const contempVar = {
  NL3: (ym) => pchg(g(US[ym], "NL"), g(US[addM(ym, -1)], "NL")), NL12: (ym) => pchg(g(US[ym], "NL"), g(US[addM(ym, -1)], "NL")),
  M2R: (ym) => pchg(g(US[ym], "M2now"), g(US[addM(ym, -1)], "M2now")), BK12: (ym) => pchg(g(US[ym], "BKnow"), g(US[addM(ym, -1)], "BKnow")),
  CS: (ym) => dif(g(US[ym], "CS"), g(US[addM(ym, -1)], "CS")), CS3: (ym) => dif(g(US[ym], "CS"), g(US[addM(ym, -1)], "CS")),
  FCI: (ym) => dif(g(US[ym], "FCInow"), g(US[addM(ym, -1)], "FCInow")), FCI3: (ym) => dif(g(US[ym], "FCInow"), g(US[addM(ym, -1)], "FCInow")),
  USD3: (ym) => pchg(g(US[ym], "DXY"), g(US[addM(ym, -1)], "DXY")), CRV: (ym) => dif(g(US[ym], "CRV"), g(US[addM(ym, -1)], "CRV")), RR3: (ym) => dif(g(US[ym], "RR"), g(US[addM(ym, -1)], "RR")),
  KDEP3: (ym) => pchg(g(KR[ym], "DEP"), g(KR[addM(ym, -1)], "DEP")), KMRG3: (ym) => pchg(g(KR[ym], "MRG"), g(KR[addM(ym, -1)], "MRG")),
  KM2: (ym) => pchg(g(KR[ym], "M2now"), g(KR[addM(ym, -1)], "M2now")), KCS3: (ym) => dif(g(KR[ym], "KCS"), g(KR[addM(ym, -1)], "KCS")),
  KRW3: (ym) => pchg(g(US[ym], "KRW"), g(US[addM(ym, -1)], "KRW")), KFF3: (ym) => g(KR[ym], "FF"),
};
["GAUGE_US_S", "GAUGE_US_M", "GAUGE_KR_S", "GAUGE_KR_M", "FLOW_US", "FLOW_KR"].forEach((k) => { contempVar[k] = (ym) => dif(SIG[k][ym], SIG[k][addM(ym, -1)]); });

function evaluate(key, mkt) {
  const d = DIR_[key], spl = SPL[mkt], R = { key, mkt };
  // 동행
  const cx = [], cy = [], c1 = [[], []], c2 = [[], []];
  months.forEach((ym) => { const x = contempVar[key](ym), y = EX[mkt][ym]; if (!ok(x) || !ok(y)) return; cx.push(d * x); cy.push(y); const H = ym < spl ? c1 : c2; H[0].push(d * x); H[1].push(y); });
  R.contemp = { r: r4(corr(cx, cy)), n: cx.length, h1: r4(corr(c1[0], c1[1])), h2: r4(corr(c2[0], c2[1])) };
  // 예측
  R.pred = {};
  [3, 12].forEach((h) => {
    const X = [], Yv = [], D = [], H1 = [[], []], H2 = [[], []];
    months.forEach((ym, i) => { const x = SIG[key][ym], y = fwd(mkt, i, h); if (!ok(x) || !ok(y)) return; X.push(d * x); Yv.push(y); D.push(ym); const B = ym < spl ? H1 : H2; B[0].push(d * x); B[1].push(y); });
    const full = nwSlope(X, Yv, h + 1), b1 = H1[0].length >= 24 ? ols(H1[0], H1[1]).b : null, b2 = H2[0].length >= 24 ? ols(H2[0], H2[1]).b : null;
    // 표본 밖 R² — 그 달까지 결과가 다 나온 표본만으로 맞춘 회귀 vs 과거 평균
    let sseM = 0, sseB = 0, nO = 0;
    const first = D.length ? D[0] : null, start = first ? [OOS0[mkt], addM(first, 36)].sort()[1] : null;
    for (let i = 0; i < D.length; i++) {
      if (D[i] < start) continue;
      const lim = addM(D[i], -h), tx = [], ty = [];
      for (let j = 0; j < i; j++) if (D[j] <= lim) { tx.push(X[j]); ty.push(Yv[j]); }
      if (tx.length < 36) continue;
      const f = ols(tx, ty), pm = f.a + f.b * X[i], pb = mean(ty);
      sseM += (Yv[i] - pm) ** 2; sseB += (Yv[i] - pb) ** 2; nO++;
    }
    const oos = nO >= 24 && sseB > 0 ? 1 - sseM / sseB : null;
    const pass = !!(full.t != null && full.t >= 2 && b1 != null && b2 != null && b1 > 0 && b2 > 0 && oos != null && oos > 0);
    R.pred[h] = { b: r4(full.b), t: t2(full.t), n: full.n, h1: r4(b1), h2: r4(b2), oosR2: r4(oos), nOos: nO, pass };
  });
  // 위험 — 비우호 3분위(직전 60개월 분포 하위 3분의 1, 최소 36개월) vs 나머지의 다음 3개월 −10% 하락 확률
  const fl = [], dd = [], hh = [];
  months.forEach((ym, i) => {
    const x = SIG[key][ym], y = DD[mkt][ym]; if (!ok(x) || y == null) return;
    const hist = []; for (let j = Math.max(0, i - 60); j < i; j++) { const v = SIG[key][months[j]]; if (ok(v)) hist.push(d * v); }
    if (hist.length < 36) return;
    hist.sort((a, b) => a - b); const q = hist[Math.floor(hist.length / 3)];
    fl.push(d * x < q ? 1 : 0); dd.push(y); hh.push(ym < spl ? 1 : 2);
  });
  const prob = (f, hv) => { const a = [], b = []; fl.forEach((v, i) => { if (hv && hh[i] !== hv) return; (v ? a : b).push(dd[i]); }); return { bad: mean(a), rest: mean(b), nBad: a.length, n: a.length + b.length }; };
  const all = prob(), p1 = prob(null, 1), p2 = prob(null, 2), sl = nwSlope(fl, dd, 3);
  const df = (p) => (ok(p.bad) && ok(p.rest) ? p.bad - p.rest : null);
  R.risk = { bad: r4(all.bad), rest: r4(all.rest), diff: r4(df(all)), t: t2(sl.t), nBad: all.nBad, n: all.n, h1: r4(df(p1)), h2: r4(df(p2)),
    pass: !!(df(p1) != null && df(p2) != null && df(p1) >= 0.05 && df(p2) >= 0.05 && sl.t != null && sl.t >= 2) };
  return R;
}

const US_KEYS = ["NL3", "NL12", "M2R", "BK12", "CS", "CS3", "FCI", "FCI3", "USD3", "CRV", "RR3", "GAUGE_US_S", "GAUGE_US_M", "FLOW_US"];
const KR_KEYS = ["KDEP3", "KMRG3", "KM2", "KCS3", "KRW3", "KFF3", "GAUGE_KR_S", "GAUGE_KR_M", "FLOW_KR"];
const GLOBAL_TO_KR = ["NL3", "NL12", "CS", "CS3", "FCI", "FCI3", "USD3"];
const res = { us: US_KEYS.map((k) => evaluate(k, "us")), kr: KR_KEYS.concat(GLOBAL_TO_KR).map((k) => evaluate(k, "kr")) };
// 지금 값(앱 설계 참고용) — 마지막 달 신호
res.latest = {}; Object.keys(SIG).forEach((k) => { const ks = months.filter((m) => ok(SIG[k][m])); res.latest[k] = ks.length ? { ym: ks[ks.length - 1], v: r4(SIG[k][ks[ks.length - 1]]) } : null; });
res.coverage = {}; Object.keys(SIG).forEach((k) => { const ks = months.filter((m) => ok(SIG[k][m])); res.coverage[k] = ks.length ? ks[0] + "~" + ks[ks.length - 1] + " (" + ks.length + ")" : "없음"; });

const line = (R) => {
  const p3 = R.pred[3], p12 = R.pred[12], c = R.contemp, k = R.risk;
  return (R.key + "→" + R.mkt).padEnd(16) + " 동행 r " + String(c.r).padStart(7) + " (전 " + c.h1 + " 후 " + c.h2 + ")" +
    " | 3개월 b " + p3.b + " t " + p3.t + " 전후 " + p3.h1 + "/" + p3.h2 + " OOS " + p3.oosR2 + (p3.pass ? " ✔" : "") +
    " | 12개월 t " + p12.t + " 전후 " + p12.h1 + "/" + p12.h2 + " OOS " + p12.oosR2 + (p12.pass ? " ✔" : "") +
    " | 하락확률 비우호 " + k.bad + " vs " + k.rest + " (전 " + k.h1 + " 후 " + k.h2 + " t " + k.t + ")" + (k.pass ? " ✔" : "");
};
console.log("범위: " + JSON.stringify(res.coverage));
res.us.concat(res.kr).forEach((R) => console.log(line(R)));
if (arg("out")) fs.writeFileSync(arg("out"), JSON.stringify(res, null, 1));
// 사후 분석용(판정과 무관) — 월별 신호·초과수익·하락 여부를 그대로 쓴다
if (arg("dump")) fs.writeFileSync(arg("dump"), JSON.stringify({ months, SIG, EX, DD, KS: months.map((m) => g(US[m], "KS")), SPY: months.map((m) => g(US[m], "SPY")) }));
