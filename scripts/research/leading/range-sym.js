// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// 대칭 범위 [−k, +k]·σ60·√h 의 표본 밖(후반) 적중률 — 드리프트(생존편향 섞임)를 넣지 않는 보수적 범위
const fs = require('fs'), path = require('path'); const PX = path.join(DIR, 'px');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const K = [1.2, 1.25, 1.28, 1.3, 1.35], res = {};
for (const f of fs.readdirSync(PX).filter((f) => !f.startsWith('^'))) {
  const o = JSON.parse(fs.readFileSync(path.join(PX, f))); const n = o.cl.length; if (n < 330) continue;
  const lr = o.cl.map((x, i) => (i ? Math.log(x / o.cl[i - 1]) : 0));
  for (let i = 260; i < n; i++) { if ((n - 1 - i) % 5) continue;
    let a = 0, b = 0; for (let j = i - 59; j <= i; j++) { a += lr[j]; b += lr[j] * lr[j]; } const sd = Math.sqrt(Math.max(1e-12, (b - 60 * (a / 60) ** 2) / 59));
    for (const h of [21, 63]) { if (i + h >= n) continue; const z = Math.log(o.cl[i + h] / o.cl[i]) / (sd * Math.sqrt(h)); const half = o.d[i] < '2021-10-01' ? 'A' : 'B';
      for (const k of K) { const key = o.c + '|' + h + '|' + k + '|' + half; const r = res[key] = res[key] || { n: 0, in: 0, lo: 0, hi: 0 }; r.n++; if (Math.abs(z) <= k) r.in++; else if (z < -k) r.lo++; else r.hi++; } } }
}
for (const c of ['korea', 'us']) for (const h of [21, 63]) console.log(c, h + 'd', K.map((k) => { const A = res[c + '|' + h + '|' + k + '|A'], B2 = res[c + '|' + h + '|' + k + '|B']; return 'k' + k + ' 전 ' + (A.in / A.n * 100).toFixed(1) + '% 후 ' + (B2.in / B2.n * 100).toFixed(1) + '% (아래 ' + (B2.lo / B2.n * 100).toFixed(1) + ' 위 ' + (B2.hi / B2.n * 100).toFixed(1) + ')'; }).join(' | '));
