// 엔진 구성요소·후보 피처의 날짜별 횡단면 IC(같은 나라 지수 초과수익, Spearman) — 전반/후반 분할
// 입력: eng-records.jsonl (engine-components.js)
// 사용: node comp-ic.js [DIR] [--roster]
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'research-cache');
const ROSTER = process.argv.includes('--roster');
const SPLIT = '2024-11-27';
const H = [5, 21, 63];
const recs = fs.readFileSync(path.join(DIR, 'eng-records.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l))
  .filter((r) => !ROSTER || r.r);

const wavg = (pairs) => { let s = 0, w = 0; for (const [v, k] of pairs) if (v != null && isFinite(v)) { s += v * k; w += k; } return w ? s / w : null; };
// 피처 정의 — r → 숫자|null
const F = {
  'flow.d': (r) => r.sc[0], 'flow.w': (r) => r.sc[1], 'flow.m': (r) => r.sc[2],
  'mtf.S': (r) => wavg([[r.sc[0], .5], [r.sc[1], .3], [r.sc[2], .2]]),
  'mtf.M': (r) => wavg([[r.sc[1], .7], [r.sc[2], .3]]),
  'd.ma': (r) => r.cs && r.cs[0], 'd.ichi': (r) => r.cs && r.cs[1], 'd.vol': (r) => r.cs && r.cs[2], 'd.osc': (r) => r.cs && r.cs[3],
  'w.ma': (r) => r.cm && r.cm[0], 'w.ichi': (r) => r.cm && r.cm[1], 'w.vol': (r) => r.cm && r.cm[2], 'w.osc': (r) => r.cm && r.cm[3],
  'm.ma': (r) => r.cl && r.cl[0], 'm.ichi': (r) => r.cl && r.cl[1], 'm.vol': (r) => r.cl && r.cl[2], 'm.osc': (r) => r.cl && r.cl[3],
  'vpA(1y,-)': (r) => r.vpA == null ? null : -r.vpA, 'vpL(1y)': (r) => r.vpL,
  'fi20(-)': (r) => r.fi20 == null ? null : -r.fi20, 'fi5(-)': (r) => r.fi5 == null ? null : -r.fi5,
};

function rank(a) {
  const idx = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]);
  const r = new Array(a.length);
  for (let i = 0; i < idx.length;) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; const m = (i + j) / 2; for (let k = i; k <= j; k++) r[idx[k][1]] = m; i = j + 1; }
  return r;
}
function spearman(x, y) {
  const rx = rank(x), ry = rank(y), n = x.length;
  const mx = rx.reduce((a, b) => a + b, 0) / n, my = ry.reduce((a, b) => a + b, 0) / n;
  let c = 0, vx = 0, vy = 0; for (let i = 0; i < n; i++) { c += (rx[i] - mx) * (ry[i] - my); vx += (rx[i] - mx) ** 2; vy += (ry[i] - my) ** 2; }
  return vx && vy ? c / Math.sqrt(vx * vy) : null;
}
// 날짜×나라 그룹
const groups = new Map();
for (const r of recs) { const k = r.c + '|' + r.d; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(r); }

function icSeries(fn, c, h) {
  const out = [];
  for (const [k, arr] of groups) {
    if (!k.startsWith(c + '|')) continue;
    const x = [], y = [];
    for (const r of arr) { const v = fn(r), e = r.ex[h]; if (v != null && isFinite(v) && e != null) { x.push(v); y.push(e); } }
    if (x.length < 20) continue;
    const ic = spearman(x, y); if (ic != null) out.push({ d: k.slice(c.length + 1), ic });
  }
  return out.sort((a, b) => (a.d < b.d ? -1 : 1));
}
const stat = (s, h) => {
  if (!s.length) return null;
  const m = s.reduce((a, b) => a + b.ic, 0) / s.length;
  const sd = Math.sqrt(s.reduce((a, b) => a + (b.ic - m) ** 2, 0) / Math.max(1, s.length - 1));
  return { m, t: sd ? m / sd * Math.sqrt(s.length) / Math.sqrt(Math.max(1, h / 5)) : 0, n: s.length };
};
const fmt = (x) => (x == null ? '   –  ' : (x.m >= 0 ? '+' : '') + x.m.toFixed(3) + '(' + x.t.toFixed(1) + ')');
const res = {};
for (const c of ['korea', 'us', 'all']) {
  console.log('\n=== ' + c + (ROSTER ? ' (편성 이력)' : '') + ' — IC 평균(t) 전체 | 전반 | 후반');
  for (const name of Object.keys(F)) {
    const line = [];
    for (const h of H) {
      let s;
      if (c === 'all') s = icSeries(F[name], 'korea', h).concat(icSeries(F[name], 'us', h));
      else s = icSeries(F[name], c, h);
      const a = stat(s, h), e = stat(s.filter((x) => x.d < SPLIT), h), l = stat(s.filter((x) => x.d >= SPLIT), h);
      (res[c] = res[c] || {})[name + '@' + h] = { all: a, early: e, late: l };
      line.push('h' + h + ' ' + fmt(a) + ' ' + fmt(e) + ' ' + fmt(l));
    }
    console.log(name.padEnd(10), line.join('  '));
  }
}
fs.writeFileSync(path.join(DIR, ROSTER ? 'comp-ic-roster.json' : 'comp-ic.json'), JSON.stringify(res));
