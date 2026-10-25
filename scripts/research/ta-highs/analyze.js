// '고점의 적극매수' 판정(사전 등록: PREREG.md) — records.js 기록으로 H1(초과수익)·H2(변동성 대비 낙폭)·H3(적극매수 안 RSI 과열)과
// 맥락(등급별 평균·점수 IC)을 낸다. 날짜별 횡단면 차이(같은 날·같은 나라)를 날짜 평균하고 t 는 Newey–West(lag = h/5 올림).
// 사용: node analyze.js <캐시 폴더>   → 표준 출력 + <캐시>/tah-result.json
const fs = require("fs"), path = require("path");
const DIR = path.resolve(process.argv[2] || "research-cache");
const R = [];
fs.readdirSync(DIR).filter((f) => /^tah-records-\d+\.jsonl$/.test(f)).forEach((f) => {
  fs.readFileSync(path.join(DIR, f), "utf8").split("\n").forEach((l) => { if (l) R.push(JSON.parse(l)); });
});
const TOP = "적극매수", GR = ["적극매도", "매도", "중립", "매수", "적극매수"];
const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
// Newey–West t — 날짜순 시계열
function nwT(xs, L) {
  const n = xs.length;
  if (n < 10) return null;
  const m = mean(xs), e = xs.map((x) => x - m);
  let v = e.reduce((s, x) => s + x * x, 0) / n;
  for (let l = 1; l <= L; l++) {
    let g = 0;
    for (let i = l; i < n; i++) g += e[i] * e[i - l];
    v += 2 * (1 - l / (L + 1)) * (g / n);
  }
  return v > 0 ? m / Math.sqrt(v / n) : null;
}
const byCD = new Map();   // "c|d" → 행들
R.forEach((r) => { const k = r.c + "|" + r.d; if (!byCD.has(k)) byCD.set(k, []); byCD.get(k).push(r); });
const dates = [...new Set(R.map((r) => r.d))].sort();
const mid = dates[Math.floor(dates.length / 2)];

// 그룹 A vs B 의 날짜별 평균 차이 → {c: [{d, v}]}
function diffSeries(val, inA, inB, minA, minB) {
  const out = { korea: [], us: [] };
  for (const [k, rows] of byCD) {
    const [c, d] = k.split("|");
    const A = [], B = [];
    rows.forEach((r) => { const v = val(r); if (v == null || !isFinite(v)) return; if (inA(r)) A.push(v); else if (inB(r)) B.push(v); });
    if (A.length >= (minA || 5) && B.length >= (minB || 20)) out[c].push({ d, v: mean(A) - mean(B), nA: A.length });
  }
  out.korea.sort((x, y) => (x.d < y.d ? -1 : 1)); out.us.sort((x, y) => (x.d < y.d ? -1 : 1));
  return out;
}
// 나라별·합침(같은 날짜의 나라 평균)·전반·후반 요약
function summarize(S, L) {
  const pooledMap = new Map();
  ["korea", "us"].forEach((c) => S[c].forEach((x) => { if (!pooledMap.has(x.d)) pooledMap.set(x.d, []); pooledMap.get(x.d).push(x.v); }));
  const pooled = [...pooledMap.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([d, vs]) => ({ d, v: mean(vs) }));
  const st = (arr) => ({ n: arr.length, mean: arr.length ? +(mean(arr.map((x) => x.v)) * 100).toFixed(3) : null, t: arr.length ? +(nwT(arr.map((x) => x.v), L) || 0).toFixed(2) : null });
  const half = (arr, early) => arr.filter((x) => (early ? x.d < mid : x.d >= mid));
  return { pooled: st(pooled), early: st(half(pooled, true)), late: st(half(pooled, false)), korea: st(S.korea), us: st(S.us),
    koreaEarly: st(half(S.korea, true)), koreaLate: st(half(S.korea, false)), usEarly: st(half(S.us, true)), usLate: st(half(S.us, false)) };
}
const verdict = (s) => s.pooled.mean < 0 && s.pooled.t <= -2.5 && s.early.mean < 0 && s.late.mean < 0 && !(s.korea.t >= 2) && !(s.us.t >= 2);
const isG1 = (r) => r.S === TOP && r.hi >= 0.95;
const dz = (r) => (r.dd63 == null || !r.sig ? null : Math.log(1 + r.dd63) / (r.sig * Math.sqrt(63)));
const res = { n: R.length, dates: dates.length, from: dates[0], to: dates[dates.length - 1], mid, tests: {} };

const show = (name, s, unit) => {
  const f = (x) => (x.mean == null ? "–" : (x.mean >= 0 ? "+" : "") + x.mean.toFixed(2) + unit + " (t " + x.t + ", " + x.n + "일)");
  console.log("  " + name.padEnd(30) + " 합침 " + f(s.pooled) + " | 전반 " + f(s.early) + " | 후반 " + f(s.late));
  console.log("  " + "".padEnd(30) + " 한국 " + f(s.korea) + " | 미국 " + f(s.us));
};
console.log("기록 " + R.length + "건 · 날짜 " + dates.length + " (" + dates[0] + " ~ " + dates[dates.length - 1] + ", 전·후반 경계 " + mid + ")");
const g1share = R.filter(isG1).length / R.length;
console.log("G1(단기 적극매수 ∧ 52주 고점 5% 안) 비중 " + (g1share * 100).toFixed(1) + "%");

console.log("\n[H1] G1 − 나머지, 지수 대비 초과수익(%p)");
const h1 = summarize(diffSeries((r) => r.ex21, isG1, (r) => !isG1(r)), 5);
const h1b = summarize(diffSeries((r) => r.ex63, isG1, (r) => !isG1(r)), 13);
show("21거래일", h1, "%p"); show("63거래일(확인용)", h1b, "%p");
res.tests.H1 = { ex21: h1, ex63: h1b, danger: verdict(h1) };
console.log("  → H1 '위험' 판정: " + (verdict(h1) ? "예" : "아니오"));

console.log("\n[H2] G1 − 나머지, 변동성으로 나눈 63일 최대 하락(dd63z, 단위 σ√63 — 음수면 더 깊게 빠짐)");
const h2 = summarize(diffSeries(dz, isG1, (r) => !isG1(r)), 13);
const h2raw = summarize(diffSeries((r) => r.dd63, isG1, (r) => !isG1(r)), 13);
const h2hit = summarize(diffSeries((r) => (r.dd63 == null ? null : r.dd63 <= -0.10 ? 1 : 0), isG1, (r) => !isG1(r)), 13);
show("dd63z(×100)", h2, ""); show("dd63 원래 값(%p)", h2raw, "%p"); show("−10% 이상 하락 경험(%p)", h2hit, "%p");
res.tests.H2 = { dd63z: h2, dd63: h2raw, hit10: h2hit, danger: verdict(h2) };
console.log("  → H2 '위험' 판정: " + (verdict(h2) ? "예" : "아니오"));

console.log("\n[H3] 단기 적극매수 안에서 RSI ≥ 70 − RSI < 70, 21거래일 초과수익(%p)");
const isTop = (r) => r.S === TOP && r.rsi != null;
const h3 = summarize(diffSeries((r) => r.ex21, (r) => isTop(r) && r.rsi >= 70, (r) => isTop(r) && r.rsi < 70, 5, 5), 5);
const h3b = summarize(diffSeries((r) => r.ex63, (r) => isTop(r) && r.rsi >= 70, (r) => isTop(r) && r.rsi < 70, 5, 5), 13);
show("21거래일", h3, "%p"); show("63거래일(확인용)", h3b, "%p");
res.tests.H3 = { ex21: h3, ex63: h3b, danger: verdict(h3) };
console.log("  → H3 '위험' 판정: " + (verdict(h3) ? "예" : "아니오"));

// 맥락 — 등급별(그날 그 나라 평균 대비) 평균, 점수 IC
console.log("\n[맥락] 단기 등급별 — 그날 그 나라 평균 대비 초과수익·63일 최대 하락·−10% 경험 비율");
const ctx = {};
for (const g of GR) {
  const a21 = [], a63 = [], dd = [], hit = [];
  for (const [, rows] of byCD) {
    const v21 = rows.filter((r) => r.ex21 != null), v63 = rows.filter((r) => r.ex63 != null);
    const m21 = mean(v21.map((r) => r.ex21)), m63 = mean(v63.map((r) => r.ex63));
    rows.forEach((r) => {
      if (r.S !== g) return;
      if (r.ex21 != null) a21.push(r.ex21 - m21);
      if (r.ex63 != null) a63.push(r.ex63 - m63);
      if (r.dd63 != null) { dd.push(r.dd63); hit.push(r.dd63 <= -0.10 ? 1 : 0); }
    });
  }
  ctx[g] = { n: a21.length, ex21: +(mean(a21) * 100).toFixed(2), ex63: +(mean(a63) * 100).toFixed(2), dd63: +(mean(dd) * 100).toFixed(1), hit10: +(mean(hit) * 100).toFixed(1) };
  console.log("  " + g.padEnd(5) + " n " + String(a21.length).padStart(7) + " · 21일 " + ctx[g].ex21 + "%p · 63일 " + ctx[g].ex63 + "%p · 63일 최대 하락 평균 " + ctx[g].dd63 + "% · −10% 경험 " + ctx[g].hit10 + "%");
}
res.context = ctx;
// 점수 IC(스피어만) — 날짜·나라별 → 평균
function spearman(xs, ys) {
  const rk = (a) => { const idx = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]); const r = new Array(a.length); idx.forEach(([, i], k) => { r[i] = k; }); return r; };
  const rx = rk(xs), ry = rk(ys), n = xs.length, mx = (n - 1) / 2;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxy += (rx[i] - mx) * (ry[i] - mx); sxx += (rx[i] - mx) ** 2; syy += (ry[i] - mx) ** 2; }
  return sxx && syy ? sxy / Math.sqrt(sxx * syy) : null;
}
for (const [key, h, L] of [["sS", "ex21", 5], ["sS", "ex63", 13], ["sM", "ex63", 13], ["sL", "ex63", 13]]) {
  const S = { korea: [], us: [] };
  for (const [k, rows] of byCD) {
    const [c, d] = k.split("|");
    const v = rows.filter((r) => r[key] != null && r[h] != null);
    if (v.length < 30) continue;
    S[c].push({ d, v: spearman(v.map((r) => r[key]), v.map((r) => r[h])) });
  }
  const s = summarize(S, L);
  res.context["ic_" + key + "_" + h] = s;
  console.log("  IC " + key + "→" + h + ": 합침 " + (s.pooled.mean / 100).toFixed(3) + " (t " + s.pooled.t + ") · 전반 " + (s.early.mean / 100).toFixed(3) + " · 후반 " + (s.late.mean / 100).toFixed(3) +
    " · 한국 " + (s.korea.mean / 100).toFixed(3) + " · 미국 " + (s.us.mean / 100).toFixed(3));
}

// 서술(판정 아님) — 다른 정의
console.log("\n[서술] 다른 정의 — 21거래일 초과수익 차이(%p), 판정에 쓰지 않음");
const alt = [
  ["52주 고점 5% 안(등급 무관)", (r) => r.hi >= 0.95],
  ["중기 적극매수 ∧ 고점", (r) => r.M === TOP && r.hi >= 0.95],
  ["장기 적극매수 ∧ 고점", (r) => r.L === TOP && r.hi >= 0.95],
  ["단기 적극매수 ∧ 볼린저 상단 위", (r) => r.S === TOP && r.pb != null && r.pb >= 1],
  ["단기 적극매수 ∧ RSI ≥ 75", (r) => r.S === TOP && r.rsi >= 75],
  ["세 기간 모두 적극매수 ∧ 고점", (r) => r.S === TOP && r.M === TOP && r.L === TOP && r.hi >= 0.95],
];
res.alt = {};
for (const [name, fn] of alt) {
  const s21 = summarize(diffSeries((r) => r.ex21, fn, (r) => !fn(r)), 5);
  const sdd = summarize(diffSeries(dz, fn, (r) => !fn(r)), 13);
  res.alt[name] = { ex21: s21, dd63z: sdd };
  show(name + " · 21일", s21, "%p");
  show(name + " · dd63z(×100)", sdd, "");
}
// H4 — σ60 무작위 보행 모형의 '63일 안 −10%(−20%) 이하 종가' 확률 보정(사전 등록 추가분)
console.log("\n[H4] 63거래일 안 −10%·−20% 이상 하락을 한 번이라도 겪을 확률 — 모형 2·Φ(ln(1−a) ÷ (kσ60·√63)) vs 실제");
const Phi = (x) => { const t = 1 / (1 + 0.2316419 * Math.abs(x)), d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return x > 0 ? 1 - p : p; };
const pHit = (sig, a, k) => Math.min(1, 2 * Phi(Math.log(1 - a) / (k * sig * Math.sqrt(63))));
const H4rows = R.filter((r) => r.dd63 != null && r.sig > 0);
const cuts = {};
["korea", "us"].forEach((c) => {
  const s = H4rows.filter((r) => r.c === c).map((r) => r.sig).sort((a, b) => a - b);
  cuts[c] = [0.2, 0.4, 0.6, 0.8].map((q) => s[Math.floor(q * (s.length - 1))]);
});
const qOf = (r) => cuts[r.c].filter((x) => r.sig > x).length;
function calib(k, rowsSel) {
  const cells = {};
  rowsSel.forEach((r) => {
    for (const a of [0.10, 0.20]) {
      const key = r.c + "|" + (r.d < mid ? "전반" : "후반") + "|" + (qOf(r) + 1) + "|" + a;
      const cl = cells[key] || (cells[key] = { n: 0, hit: 0, p: 0 });
      cl.n++; cl.hit += r.dd63 <= -a + 1e-9 ? 1 : 0; cl.p += pHit(r.sig, a, k);
    }
  });
  return Object.entries(cells).map(([key, v]) => ({ key, n: v.n, obs: v.hit / v.n, model: v.p / v.n, gap: v.hit / v.n - v.p / v.n }));
}
const printCal = (cal, title) => {
  console.log("  " + title);
  for (const a of ["0.1", "0.2"]) for (const c of ["korea", "us"]) for (const h of ["전반", "후반"]) {
    const row = [1, 2, 3, 4, 5].map((q) => cal.find((x) => x.key === c + "|" + h + "|" + q + "|" + a))
      .map((x) => (x ? (x.obs * 100).toFixed(0) + "/" + (x.model * 100).toFixed(0) : "–"));
    console.log("    −" + (+a * 100) + "% " + (c === "korea" ? "한국" : "미국") + " " + h + " (실제/모형 %, σ 1→5분위): " + row.join("  "));
  }
  const worst = cal.reduce((m, x) => (Math.abs(x.gap) > Math.abs(m.gap) ? x : m), cal[0]);
  console.log("    최대 어긋남 " + (worst.gap * 100).toFixed(1) + "%p (" + worst.key + ")");
  return Math.abs(worst.gap);
};
const cal1 = calib(1, H4rows);
const worst1 = printCal(cal1, "k = 1(보정 없음)");
let kFit = 1, k4 = { k: 1, pass: worst1 <= 0.05, worst: +(worst1 * 100).toFixed(1) };
if (worst1 > 0.05) {
  // 전반으로 k 하나 맞추기(두 기준·두 나라·5분위 칸의 제곱 오차 최소) → 후반 검증
  const early = H4rows.filter((r) => r.d < mid);
  let best = { k: 1, e: Infinity };
  for (let k = 0.7; k <= 1.6; k += 0.01) {
    const e = calib(k, early).reduce((s, x) => s + x.gap * x.gap * x.n, 0);
    if (e < best.e) best = { k: +k.toFixed(2), e };
  }
  kFit = best.k;
  const calK = calib(kFit, H4rows);
  const lateWorst = Math.max(...calK.filter((x) => x.key.indexOf("후반") > 0).map((x) => Math.abs(x.gap)));
  printCal(calK, "k = " + kFit + "(전반으로 맞춤) — 판정은 후반 칸");
  k4 = { k: kFit, pass: lateWorst <= 0.05, worstLate: +(lateWorst * 100).toFixed(1), worstNoCal: +(worst1 * 100).toFixed(1) };
}
res.tests.H4 = Object.assign(k4, { cuts });
console.log("  → H4 '쓸 수 있음' 판정: " + (k4.pass ? "예 (k " + k4.k + ")" : "아니오"));
// 같은 모형 확률에서 고점 적극매수(G1)와 나머지의 실제 빈도 — 모형이 고점에서 위험을 과소평가하는지
for (const a of [0.10, 0.20]) {
  const grp = (fn) => { const v = H4rows.filter(fn); return { n: v.length, obs: mean(v.map((r) => (r.dd63 <= -a + 1e-9 ? 1 : 0))), model: mean(v.map((r) => pHit(r.sig, a, kFit))) }; };
  const g = grp(isG1), o = grp((r) => !isG1(r));
  console.log("  −" + a * 100 + "%: 고점 적극매수 실제 " + (g.obs * 100).toFixed(1) + "% · 모형 " + (g.model * 100).toFixed(1) + "% | 나머지 실제 " + (o.obs * 100).toFixed(1) + "% · 모형 " + (o.model * 100).toFixed(1) + "%");
  res.tests.H4["g1_" + a] = { g1: g, rest: o };
}

fs.writeFileSync(path.join(DIR, "tah-result.json"), JSON.stringify(res, null, 1));
console.log("\n→ " + path.join(DIR, "tah-result.json"));
