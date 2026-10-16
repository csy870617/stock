// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md). 사용: node scripts/research/leading/flow-fixed.js <캐시 폴더>
// 고정 경계(FI20 ≥ 6.33% — 전 기간 80% 분위) 기준 성적: 해당 vs 나머지, 전·후반·보류 구간별
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); const CUT = +(process.argv[3] || 0.0633);
const PX = path.join(DIR, 'px'), FL = path.join(DIR, 'flow'); const B = JSON.parse(fs.readFileSync(path.join(PX, '^KS11.json')));
const stocks = []; for (const f of fs.readdirSync(FL)) { const fl = JSON.parse(fs.readFileSync(path.join(FL, f))); const pf = ['.KS', '.KQ'].map((s) => path.join(PX, fl.code + s + '.json')).find((p) => fs.existsSync(p)); if (!pf) continue; const o = JSON.parse(fs.readFileSync(pf)); o.m = new Map(o.d.map((d, i) => [d, i])); o.fl = fl; o.fm = new Map(fl.d.map((d, i) => [d, i])); stocks.push(o); }
function fi20(o, d) { const k = o.fm.get(d); if (k == null || k < 21) return null; const F = o.fl; let s = 0, v = 0, c = 0; for (let j = k - 20; j <= k - 1; j++) { if (F.f[j] == null || F.o[j] == null || !F.v[j]) continue; s += F.f[j] + F.o[j]; v += F.v[j]; c++; } return c >= 14 && v > 0 ? s / v : null; }
const n = B.d.length, per = {}; // per period: {hot:{21:[],63:[]}, rest:{...}}
const period = (d) => (d < '2018-01-11' ? '보류 2016-17' : d < '2022-04-06' ? '전반 2018-22' : '후반 2022-26');
const diffByDate = { 21: [], 63: [] };
for (let j = 22; j < n - 64; j++) { if ((n - 1 - j) % 5) continue; const d = B.d[j]; const P = period(d); const R = per[P] = per[P] || { hot: { 21: [], 63: [] }, rest: { 21: [], 63: [] } };
  const day = { hot: { 21: [], 63: [] }, rest: { 21: [], 63: [] } };
  for (const o of stocks) { const i = o.m.get(d); if (i == null) continue; const x = fi20(o, d); if (x == null) continue; const g = x >= CUT ? 'hot' : 'rest';
    for (const h of [21, 63]) { const k = o.m.get(B.d[j + h]); if (k == null) continue; const ex = (o.cl[k] / o.cl[i] - 1) - (B.cl[j + h] / B.cl[j] - 1); R[g][h].push(ex); day[g][h].push(ex); } }
  for (const h of [21, 63]) if (day.hot[h].length >= 5 && day.rest[h].length >= 20) { const m = (a) => a.reduce((s, x) => s + x, 0) / a.length; diffByDate[h].push(m(day.hot[h]) - m(day.rest[h])); } }
const m = (a) => a.reduce((s, x) => s + x, 0) / a.length, win = (a) => a.filter((x) => x > 0).length / a.length;
for (const P of Object.keys(per)) for (const h of [21, 63]) { const R = per[P]; console.log(P, '+' + h + '일 | 과열(FI20≥' + (CUT * 100).toFixed(2) + '%) n', R.hot[h].length, '평균', (m(R.hot[h]) * 100).toFixed(2) + '%', '이긴', (win(R.hot[h]) * 100).toFixed(1) + '% | 나머지 n', R.rest[h].length, '평균', (m(R.rest[h]) * 100).toFixed(2) + '%', '이긴', (win(R.rest[h]) * 100).toFixed(1) + '%'); }
for (const h of [21, 63]) { const a = diffByDate[h]; const mu = m(a), sd = Math.sqrt(a.reduce((s, x) => s + (x - mu) ** 2, 0) / (a.length - 1)); console.log('날짜별 (과열−나머지) 평균 차 +' + h + '일', (mu * 100).toFixed(2) + '%p', 't', (mu / (sd / Math.sqrt(a.length)) / Math.sqrt(h / 5)).toFixed(2), '날짜', a.length, '음수 비율', (a.filter((x) => x < 0).length / a.length * 100).toFixed(0) + '%'); }
const all = [].concat(...Object.values(per).map((R) => R.hot[21])), rest = [].concat(...Object.values(per).map((R) => R.rest[21]));
const all63 = [].concat(...Object.values(per).map((R) => R.hot[63])), rest63 = [].concat(...Object.values(per).map((R) => R.rest[63]));
console.log('전체 +21일 과열', (m(all) * 100).toFixed(2) + '% (이긴 ' + (win(all) * 100).toFixed(1) + '%) vs 나머지', (m(rest) * 100).toFixed(2) + '% (' + (win(rest) * 100).toFixed(1) + '%) | +63일', (m(all63) * 100).toFixed(2) + '% (' + (win(all63) * 100).toFixed(1) + '%) vs', (m(rest63) * 100).toFixed(2) + '% (' + (win(rest63) * 100).toFixed(1) + '%)');
