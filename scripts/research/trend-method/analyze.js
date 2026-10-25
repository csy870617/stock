// 추세 판정 방법 비교 — 판정(사전 등록: PREREG.md). eval.js 기록으로 방법별 TC21·TC63(추세 포착), M0 대비 차이(전·후반·나라),
// 판정 비중·판정 뒤 평균 수익·판정 변경·헛신호·반납폭, 추가 가설 H2(효율비)를 낸다.
// 사용: node analyze.js <캐시 폴더>   → 표준 출력 + <캐시>/tm-result.json
const fs = require("fs"), path = require("path");
const DIR = path.resolve(process.argv[2] || "research-cache");
const METHODS = ["M0", "M0-k6", "M0-k8", "M0-k13", "M0-f20", "M0-zz", "M2", "M3", "M4", "M5"];
const E = [], S = [];
fs.readdirSync(DIR).forEach((f) => {
  if (/^tm-evals-\d+\.jsonl$/.test(f)) fs.readFileSync(path.join(DIR, f), "utf8").split("\n").forEach((l) => { if (l) E.push(JSON.parse(l)); });
  if (/^tm-stocks-\d+\.jsonl$/.test(f)) fs.readFileSync(path.join(DIR, f), "utf8").split("\n").forEach((l) => { if (l) S.push(JSON.parse(l)); });
});
const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
function nwT(xs, L) {
  const n = xs.length;
  if (n < 10) return null;
  const m = mean(xs), e = xs.map((x) => x - m);
  let v = e.reduce((s, x) => s + x * x, 0) / n;
  for (let l = 1; l <= L; l++) { let g = 0; for (let i = l; i < n; i++) g += e[i] * e[i - l]; v += 2 * (1 - l / (L + 1)) * (g / n); }
  return v > 0 ? m / Math.sqrt(v / n) : null;
}
const wk = (d) => Math.floor(Date.parse(d) / 864e5 / 7);   // 같은 주의 한국·미국 평가일을 짝짓는다
// 종목 평균 수익(추세 포착에서 뺀다)
const mu21 = {}, mu63 = {};
(() => { const a = {}, b = {}; E.forEach((r) => { (a[r.s] = a[r.s] || []).push(r.r21); (b[r.s] = b[r.s] || []).push(r.r63); });
  Object.keys(a).forEach((s) => { mu21[s] = mean(a[s]); mu63[s] = mean(b[s]); }); })();
const P = { U: 1, D: -1, F: 0 };
// 나라·주 → 그 주의 평가들
const byCW = new Map();
E.forEach((r) => { const k = r.c + "|" + wk(r.d); if (!byCW.has(k)) byCW.set(k, []); byCW.get(k).push(r); });
const weeks = [...new Set(E.map((r) => wk(r.d)))].sort((a, b) => a - b), mid = weeks[Math.floor(weeks.length / 2)];
// 방법 mi 의 주별 TC(나라별) — val(r) = 수익 − 종목 평균
function tcSeries(mi, h) {
  const out = { korea: new Map(), us: new Map() };
  for (const [k, rows] of byCW) {
    const [c, w] = k.split("|");
    if (rows.length < 20) continue;
    out[c].set(+w, mean(rows.map((r) => P[r.L[mi]] * (h === 21 ? r.r21 - mu21[r.s] : r.r63 - mu63[r.s]))));
  }
  return out;
}
// 요약 — 나라별·합침(같은 주 나라 평균)·전·후반
function summ(series, L) {
  const pooledMap = new Map();
  ["korea", "us"].forEach((c) => series[c].forEach((v, w) => { if (!pooledMap.has(w)) pooledMap.set(w, []); pooledMap.get(w).push(v); }));
  const pooled = [...pooledMap.entries()].sort((a, b) => a[0] - b[0]).map(([w, vs]) => ({ w, v: mean(vs) }));
  const asArr = (m) => [...m.entries()].sort((a, b) => a[0] - b[0]).map(([w, v]) => ({ w, v }));
  const st = (arr) => ({ n: arr.length, mean: arr.length ? +(mean(arr.map((x) => x.v)) * 100).toFixed(3) : null, t: arr.length ? +(nwT(arr.map((x) => x.v), L) || 0).toFixed(2) : null });
  const kr = asArr(series.korea), us = asArr(series.us);
  return { pooled: st(pooled), early: st(pooled.filter((x) => x.w < mid)), late: st(pooled.filter((x) => x.w >= mid)), korea: st(kr), us: st(us) };
}
const diff = (a, b) => ({ korea: new Map([...a.korea].filter(([w]) => b.korea.has(w)).map(([w, v]) => [w, v - b.korea.get(w)])),
  us: new Map([...a.us].filter(([w]) => b.us.has(w)).map(([w, v]) => [w, v - b.us.get(w)])) });

const res = { n: E.length, stocks: S.length, from: E.reduce((m, r) => (r.d < m ? r.d : m), "9"), to: E.reduce((m, r) => (r.d > m ? r.d : m), "0"), methods: {} };
console.log("평가 " + E.length + "건 · 종목 " + S.length + " · " + res.from + " ~ " + res.to + " · 주 " + weeks.length);
const base21 = tcSeries(0, 21), base63 = tcSeries(0, 63);
const f = (x) => (x.mean == null ? "–" : (x.mean >= 0 ? "+" : "") + x.mean.toFixed(2) + "(t " + x.t + ")");
console.log("\n방법     | TC21 합침   | 전반       | 후반       | 한국       | 미국       || TC63 합침  || M0 대비 TC21: 합침 · 전반 · 후반 · 한국 · 미국 → 채택?");
METHODS.forEach((name, mi) => {
  const s21 = tcSeries(mi, 21), s63 = tcSeries(mi, 63), a = summ(s21, 5), b = summ(s63, 13);
  const r = { tc21: a, tc63: b };
  let line = name.padEnd(8) + " | " + f(a.pooled).padEnd(11) + " | " + f(a.early).padEnd(10) + " | " + f(a.late).padEnd(10) + " | " + f(a.korea).padEnd(10) + " | " + f(a.us).padEnd(10) + " || " + f(b.pooled).padEnd(10);
  if (mi > 0) {
    const d = summ(diff(s21, base21), 5);
    const pass = d.pooled.mean > 0 && d.pooled.t >= 2 && d.early.mean > 0 && d.late.mean > 0 && d.korea.mean > 0 && d.us.mean > 0;
    r.diff21 = d; r.pass = pass;
    line += " || " + [d.pooled, d.early, d.late, d.korea, d.us].map(f).join(" · ") + " → " + (pass ? "기준 통과(헛신호 확인 필요)" : "아니오");
  }
  res.methods[name] = r;
  console.log(line);
});

// 보조 — 판정 비중·판정 뒤 평균 수익(절대)·판정 변경·헛신호·반납폭
console.log("\n방법     | 상승/하락/보합 비중 | 21일 평균 수익: 상승 뒤 · 하락 뒤 · 보합 뒤 | 연간 판정 변경 | 헛신호 | 반납폭(상승 끝) | 반등폭(하락 끝)");
METHODS.forEach((name, mi) => {
  const cnt = { U: 0, D: 0, F: 0 }, ret = { U: [], D: [], F: [] };
  E.forEach((r) => { const l = r.L[mi]; cnt[l]++; ret[l].push(r.r21); });
  let flips = 0, whip = 0, gbS = 0, gbN = 0, rbS = 0, rbN = 0, nEval = 0;
  S.forEach((s) => { const m = s.m[name]; flips += m.flips; whip += m.whip; gbS += m.gbS; gbN += m.gbN; rbS += m.rbS; rbN += m.rbN; nEval += s.n; });
  const pc = (x) => (x * 100).toFixed(0) + "%", ex = (a) => (a.length ? ((Math.exp(mean(a)) - 1) * 100).toFixed(2) + "%" : "–");
  const yrs = nEval * 5 / 252;
  const aux = { share: { U: cnt.U / E.length, D: cnt.D / E.length, F: cnt.F / E.length }, ret21: { U: mean(ret.U), D: mean(ret.D), F: mean(ret.F) },
    flipsPerYear: flips / yrs * (S.length ? 1 : 0) / 1, whipsaw: whip / flips, giveBack: gbS / gbN, rebound: rbS / rbN };
  aux.flipsPerYearPerStock = flips / yrs;
  res.methods[name].aux = aux;
  console.log(name.padEnd(8) + " | " + [pc(aux.share.U), pc(aux.share.D), pc(aux.share.F)].join("/").padEnd(19) + " | " + [ex(ret.U), ex(ret.D), ex(ret.F)].join(" · ").padEnd(37) + " | " +
    (flips / yrs).toFixed(2).padStart(6) + "        | " + pc(aux.whipsaw).padStart(4) + "   | " + (aux.giveBack * 100).toFixed(1) + "%".padEnd(11) + " | +" + (aux.rebound * 100).toFixed(1) + "%");
});

// H2 — M0 상승·하락 판정 안 효율비 상위 3분위 − 하위 3분위
console.log("\n[H2] M0 상승·하락 판정 안, 효율비(ER) 상위 3분위 − 하위 3분위의 TC21(%p)");
const h2 = { korea: new Map(), us: new Map() };
for (const [k, rows] of byCW) {
  const [c, w] = k.split("|");
  const v = rows.filter((r) => r.L[0] !== "F" && r.er != null).sort((a, b) => a.er - b.er);
  if (v.length < 15) continue;
  const n3 = Math.floor(v.length / 3), lo = v.slice(0, n3), hi = v.slice(v.length - n3);
  const tc = (arr) => mean(arr.map((r) => P[r.L[0]] * (r.r21 - mu21[r.s])));
  h2[c].set(+w, tc(hi) - tc(lo));
}
const H2 = summ(h2, 5);
H2.pass = H2.pooled.mean > 0 && H2.pooled.t >= 2 && H2.early.mean > 0 && H2.late.mean > 0 && H2.korea.mean > 0 && H2.us.mean > 0;
res.H2 = H2;
console.log("  합침 " + f(H2.pooled) + " · 전반 " + f(H2.early) + " · 후반 " + f(H2.late) + " · 한국 " + f(H2.korea) + " · 미국 " + f(H2.us) + " → " + (H2.pass ? "통과" : "통과 못 함"));
fs.writeFileSync(path.join(DIR, "tm-result.json"), JSON.stringify(res, null, 1));
console.log("\n→ " + path.join(DIR, "tm-result.json"));
