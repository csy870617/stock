// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// 엔진 신호 '뒷북' 진단 — 편성 이력 종목에 현행 엔진(mtf)을 룩어헤드 없이 주 1회 적용,
// 등급이 바뀐 시점 전후의 지수 대비 초과수익을 비교한다.
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const TA = require(path.join(__dirname, '..', '..', 'lib-ta.js'));
const PX = path.join(DIR, 'px');
const load = (f) => JSON.parse(fs.readFileSync(path.join(PX, f)));
const bench = { korea: load('^KS11.json'), us: load('^GSPC.json') };
for (const c in bench) { const b = bench[c]; b.idx = new Map(b.d.map((d, i) => [d, i])); }
const bAt = (b, d) => { let lo = 0, hi = b.d.length - 1, a = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (b.d[m] <= d) { a = m; lo = m + 1; } else hi = m - 1; } return a >= 0 ? b.cl[a] : null; };
const files = fs.readdirSync(PX).filter((f) => !f.startsWith('^'));
const WARM = 1630, STEP = 5, G = ['적극매도', '매도', '중립', '매수', '적극매수'], gi = (g) => G.indexOf(g);
const ev = { short: { up: [], dn: [] }, mid: { up: [], dn: [] }, long: { up: [], dn: [] } };
const grades = { short: {}, mid: {}, long: {} };
let n = 0, t0 = Date.now();
for (const f of files) {
  const o = load(f); if (!o.roster || o.cl.length < WARM + 63) continue;
  const b = bench[o.c];
  const rows = o.d.map((d, i) => ({ t: Date.parse(d) / 1000, d, close: o.cl[i], high: o.h[i] != null ? o.h[i] : o.cl[i], low: o.l[i] != null ? o.l[i] : o.cl[i], vol: o.v[i] }));
  const ex = (i0, i1) => { const b0 = bAt(b, o.d[i0]), b1 = bAt(b, o.d[i1]); return (o.cl[i1] / o.cl[i0] - 1) - (b1 / b0 - 1); };
  let prev = null;
  for (let t = WARM; t < rows.length; t += STEP) {
    const a = TA.analyzeTimeframes(rows.slice(0, t + 1), { dp: 2, srDp: 2 }); if (!a) continue;
    const cur = { short: a.short.sigMtf || a.short.signal, mid: a.mid.sigMtf || a.mid.signal, long: a.long.sigMtf || a.long.signal };
    for (const p of ['short', 'mid', 'long']) {
      if (t + 63 < rows.length && t >= 20) { const k = cur[p]; (grades[p][k] = grades[p][k] || []).push({ pre: ex(t - 20, t), post21: ex(t, t + 21), post63: ex(t, t + 63) }); }
      if (prev && prev[p] !== cur[p] && t >= 20) {
        const up = gi(cur[p]) >= 3 && gi(prev[p]) <= 2, dn = gi(cur[p]) <= 1 && gi(prev[p]) >= 2;
        if (!up && !dn) continue;
        const e = { pre20: ex(t - 20, t), pre60: t >= 60 ? ex(t - 60, t) : null, post21: t + 21 < rows.length ? ex(t, t + 21) : null, post63: t + 63 < rows.length ? ex(t, t + 63) : null };
        ev[p][up ? 'up' : 'dn'].push(e);
      }
    }
    prev = cur;
  }
  n++;
}
const m = (a, k) => { const v = a.map((x) => x[k]).filter((x) => x != null); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
const hit = (a, k) => { const v = a.map((x) => x[k]).filter((x) => x != null); return v.length ? v.filter((x) => x > 0).length / v.length : null; };
const P = (x) => x == null ? '  –  ' : ((x >= 0 ? '+' : '') + (x * 100).toFixed(2) + '%');
console.log('종목', n, '·', ((Date.now() - t0) / 1000 | 0) + 's');
for (const p of ['short', 'mid', 'long']) for (const k of ['up', 'dn']) {
  const a = ev[p][k];
  console.log(p.padEnd(5), k === 'up' ? '매수 전환' : '매도 전환', 'n=' + String(a.length).padStart(4), '| 전환 전 60일', P(m(a, 'pre60')), '전 20일', P(m(a, 'pre20')), '| 전환 후 21일', P(m(a, 'post21')), '(양수 ' + (hit(a, 'post21') * 100).toFixed(0) + '%)', '후 63일', P(m(a, 'post63')), '(양수 ' + (hit(a, 'post63') * 100).toFixed(0) + '%)');
}
console.log('\n등급별 — 직전 20일 초과수익(이미 일어난 일) vs 다음 21·63일 초과수익');
for (const p of ['short', 'mid', 'long']) for (const g of G) { const a = grades[p][g] || []; console.log(p.padEnd(5), g.padEnd(4), 'n=' + String(a.length).padStart(5), '| 직전 20일', P(m(a, 'pre')), '| 다음 21일', P(m(a, 'post21')), '다음 63일', P(m(a, 'post63'))); }
fs.writeFileSync(path.join(DIR, 'lag-result.json'), JSON.stringify({ ev, grades: Object.fromEntries(Object.entries(grades).map(([p, o]) => [p, Object.fromEntries(Object.entries(o).map(([g, a]) => [g, { n: a.length, pre: m(a, 'pre'), post21: m(a, 'post21'), post63: m(a, 'post63') }]))])) }));
