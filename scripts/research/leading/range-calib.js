// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// 예상 가격 범위 보정 검증 — 변동성 예측 σ 로 만든 h일 범위에 실제 수익률이 들어간 비율(커버리지)
// z = ln(P_{t+h}/P_t) / (σ_d·√h). 전반부에서 z 분위수(10·90%)를 정하고 후반부에서 80% 범위 적중률을 확인(표본 밖).
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const PX = path.join(DIR, 'px');
const files = fs.readdirSync(PX).filter((f) => !f.startsWith('^'));
const H = [21, 63], STEP = 5, WARM = 260;
const z = {};   // key c|est|h → [{d, z}]
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(path.join(PX, f))); const n = o.cl.length; if (n < WARM + 70) continue;
  const lr = o.cl.map((x, i) => (i ? Math.log(x / o.cl[i - 1]) : 0));
  let ew = null;   // EWMA 분산(λ=0.94)
  for (let i = 1; i < n; i++) {
    ew = ew == null ? lr[i] * lr[i] : 0.94 * ew + 0.06 * lr[i] * lr[i];
    if (i < WARM || (n - 1 - i) % STEP !== 0) continue;
    const sd = (k) => { let a = 0, b = 0; for (let j = i - k + 1; j <= i; j++) { a += lr[j]; b += lr[j] * lr[j]; } const mu = a / k; return Math.sqrt(Math.max(1e-12, (b - k * mu * mu) / (k - 1))); };
    const est = { s60: sd(60), ewma: Math.sqrt(ew), s250: sd(250), mix: Math.sqrt(0.5 * sd(60) ** 2 + 0.5 * sd(250) ** 2) };
    for (const h of H) { if (i + h >= n) continue; const r = Math.log(o.cl[i + h] / o.cl[i]);
      for (const k in est) { const key = o.c + '|' + k + '|' + h; (z[key] = z[key] || []).push({ d: o.d[i], z: r / (est[k] * Math.sqrt(h)) }); } }
  }
}
const q = (a, p) => { const b = a.slice().sort((x, y) => x - y); return b[Math.min(b.length - 1, Math.max(0, Math.floor(p * (b.length - 1))))]; };
const out = {};
for (const key of Object.keys(z).sort()) {
  const a = z[key]; const ds = a.map((x) => x.d).sort(); const split = ds[ds.length >> 1];
  const A = a.filter((x) => x.d < split).map((x) => x.z), B = a.filter((x) => x.d >= split).map((x) => x.z);
  const lo = q(A, 0.10), hi = q(A, 0.90), med = q(A, 0.5);
  const covB = B.filter((x) => x >= lo && x <= hi).length / B.length;
  const cov1 = a.filter((x) => Math.abs(x.z) <= 1).length / a.length;
  const loAll = q(a.map((x) => x.z), 0.10), hiAll = q(a.map((x) => x.z), 0.90), medAll = q(a.map((x) => x.z), 0.5);
  out[key] = { n: a.length, split, cov1sd: cov1, q10_first: lo, q90_first: hi, med_first: med, cov80_second: covB, q10: loAll, q50: medAll, q90: hiAll };
  console.log(key.padEnd(18), 'n', String(a.length).padStart(6), '| ±1σ 적중', (cov1 * 100).toFixed(1) + '%', '| 전반 10·50·90% z', lo.toFixed(2), med.toFixed(2), hi.toFixed(2), '→ 후반 80% 범위 적중', (covB * 100).toFixed(1) + '%', '| 전체 분위', loAll.toFixed(2), medAll.toFixed(2), hiAll.toFixed(2));
}
fs.writeFileSync(path.join(DIR, 'range-calib.json'), JSON.stringify(out, null, 1));
