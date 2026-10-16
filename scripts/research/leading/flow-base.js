// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md). 사용: node scripts/research/leading/flow-base.js <캐시 폴더>
// FI20(외국인+기관 20일 순매수 / 거래량) 구간별 기준 성적 — 날짜별 횡단면 5분위(전 기간 2016-11~2026-07) + 고정 경계값(전체 분포 20·80%)
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache');
const PX = path.join(DIR, 'px'), FL = path.join(DIR, 'flow');
const B = JSON.parse(fs.readFileSync(path.join(PX, '^KS11.json')));
const stocks = [];
for (const f of fs.readdirSync(FL)) { const fl = JSON.parse(fs.readFileSync(path.join(FL, f))); const pf = ['.KS', '.KQ'].map((s) => path.join(PX, fl.code + s + '.json')).find((p) => fs.existsSync(p)); if (!pf) continue;
  const o = JSON.parse(fs.readFileSync(pf)); o.m = new Map(o.d.map((d, i) => [d, i])); o.fl = fl; o.fm = new Map(fl.d.map((d, i) => [d, i])); stocks.push(o); }
function fi20(o, d) { const k = o.fm.get(d); if (k == null || k < 21) return null; const F = o.fl; let s = 0, v = 0, c = 0; for (let j = k - 20; j <= k - 1; j++) { if (F.f[j] == null || F.o[j] == null || !F.v[j]) continue; s += F.f[j] + F.o[j]; v += F.v[j]; c++; } return c >= 14 && v > 0 ? s / v : null; }
const n = B.d.length, all = [], byQ = { 21: [[], [], [], [], []], 63: [[], [], [], [], []] };
for (let j = 22; j < n - 64; j++) { if ((n - 1 - j) % 5) continue; const d = B.d[j]; const rows = [];
  for (const o of stocks) { const i = o.m.get(d); if (i == null) continue; const x = fi20(o, d); if (x == null) continue; const ex = {}; for (const h of [21, 63]) { const k = o.m.get(B.d[j + h]); ex[h] = k == null ? null : (o.cl[k] / o.cl[i] - 1) - (B.cl[j + h] / B.cl[j] - 1); } rows.push({ x, ex }); all.push(x); }
  if (rows.length < 50) continue; rows.sort((a, b) => a.x - b.x);
  rows.forEach((r, idx) => { const q = Math.min(4, Math.floor(idx / rows.length * 5)); for (const h of [21, 63]) if (r.ex[h] != null) byQ[h][q].push(r.ex[h]); }); }
all.sort((a, b) => a - b); const qq = (p) => all[Math.floor(p * (all.length - 1))];
console.log('관측', all.length, '· 분포 10/20/50/80/90%:', [0.1, 0.2, 0.5, 0.8, 0.9].map((p) => (qq(p) * 100).toFixed(2) + '%').join(' / '));
const out = { cut20: qq(0.2), cut80: qq(0.8), q: {} };
for (const h of [21, 63]) { console.log('+' + h + '일 — 5분위(1=외국인·기관 순매도 최다 … 5=순매수 최다) 지수 대비 평균·중앙값·이긴 비율:');
  byQ[h].forEach((a, q) => { const m = a.reduce((s, x) => s + x, 0) / a.length; const s = a.slice().sort((x, y) => x - y); const med = s[s.length >> 1]; const win = a.filter((x) => x > 0).length / a.length;
    console.log('  Q' + (q + 1), 'n', a.length, '평균', (m * 100).toFixed(2) + '%', '중앙값', (med * 100).toFixed(2) + '%', '이긴 비율', (win * 100).toFixed(1) + '%'); (out.q[h] = out.q[h] || []).push({ mean: m, med, win, n: a.length }); }); }
fs.writeFileSync(path.join(DIR, 'flow-base.json'), JSON.stringify(out));
