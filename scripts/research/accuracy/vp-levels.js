// 매물대가 실제로 지지·저항으로 작동하나 — 거래 집중 가격대(HVN) vs 거래 희박 가격대(LVN) 터치 후 반응 비교
// 각 종목·5거래일 간격 평가일 t 에서 최근 250일 매물대(40구간)를 만들고, 현재가 아래(지지 후보)·위(저항 후보)에서
// 1개월 안에 닿을 만한 거리(1.5σ√21 이내)의 최대 거래 구간(HVN, 평균의 1.3배 이상)과 최소 거래 구간(LVN, 0.7배 이하)을 고른다.
// 이후 21거래일 안에 그 가격에 처음 닿으면(터치) 그 가격 기준 +5·+10거래일 지수 대비 초과수익과 '다시 위(아래)로 마감' 비율을 잰다.
// 지지가 실재하면 HVN 아래 터치 후 수익이 LVN 보다 높아야 하고, 저항이 실재하면 HVN 위 터치 후 수익이 LVN 보다 낮아야 한다.
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache');
const PX = path.join(DIR, 'px');
const SPLIT = '2021-10-01';
const bench = {};
for (const [c, f] of [['korea', '^KS11.json'], ['us', '^GSPC.json']]) { const b = JSON.parse(fs.readFileSync(path.join(PX, f))); b.m = new Map(b.d.map((d, i) => [d, i])); bench[c] = b; }
const BINS = +(process.env.BINS||40), LB = +(process.env.LB||250), STEP = 5, WIN = 21; const HT = +(process.env.HT||1.3), LT = +(process.env.LT||0.7);
const acc = {};
function add(key, ex5, ex10, back5) {
  const a = acc[key] || (acc[key] = { n: 0, e5: 0, e10: 0, b5: 0, e5s: [], e10s: [] });
  a.n++; a.e5 += ex5; a.e10 += ex10; a.b5 += back5;
  if (a.e10s.length < 400000) { a.e5s.push(ex5); a.e10s.push(ex10); }
}
const files = fs.readdirSync(PX).filter((f) => !f.startsWith('^'));
let done = 0; const t0 = Date.now();
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(path.join(PX, f)));
  const b = bench[o.c]; if (!b) continue;
  const n = o.cl.length; if (n < LB + 80) continue;
  const H = o.h.map((v, i) => (v != null ? v : o.cl[i])), L = o.l.map((v, i) => (v != null ? v : o.cl[i])), V = o.v;
  for (let t = LB; t < n - WIN - 11; t += STEP) {
    const bi = b.m.get(o.d[t]); if (bi == null) continue;
    let lo = Infinity, hi = -Infinity, okv = 0;
    for (let k = t - LB + 1; k <= t; k++) { if (L[k] < lo) lo = L[k]; if (H[k] > hi) hi = H[k]; if (V[k] > 0) okv++; }
    if (okv < 200 || !(hi > lo)) continue;
    const step = (hi - lo) / BINS, vol = new Float64Array(BINS);
    for (let k = t - LB + 1; k <= t; k++) {
      if (!(V[k] > 0)) continue;
      const a = Math.max(0, Math.min(BINS - 1, Math.floor((L[k] - lo) / step))), z = Math.max(0, Math.min(BINS - 1, Math.floor((H[k] - lo) / step)));
      const sh = V[k] / (z - a + 1); for (let q = a; q <= z; q++) vol[q] += sh;
    }
    let tot = 0; for (let q = 0; q < BINS; q++) tot += vol[q]; const avg = tot / BINS;
    const P = o.cl[t];
    let s = 0, ss = 0, m = 0; for (let k = t - 59; k <= t; k++) { const r = Math.log(o.cl[k] / o.cl[k - 1]); s += r; ss += r * r; m++; }
    const sd = Math.sqrt(Math.max(0, (ss - s * s / m) / (m - 1))); if (!(sd > 0)) continue;
    const reachLo = P * Math.exp(-1.5 * sd * Math.sqrt(WIN)), reachHi = P * Math.exp(1.5 * sd * Math.sqrt(WIN));
    const half = o.d[t] < SPLIT ? 'early' : 'late';
    for (const side of ['below', 'above']) {
      let hv = -1, lv = -1;
      for (let q = 0; q < BINS; q++) {
        const bLo = lo + step * q, bHi = bLo + step, mid = bLo + step / 2;
        if (side === 'below' ? !(bHi < P && mid >= reachLo) : !(bLo > P && mid <= reachHi)) continue;
        if (vol[q] >= HT * avg && (hv < 0 || vol[q] > vol[hv])) hv = q;
        if (vol[q] <= LT * avg && (lv < 0 || vol[q] < vol[lv])) lv = q;
      }
      for (const [kind, q] of [['HVN', hv], ['LVN', lv]]) {
        if (q < 0) continue;
        const lvl = lo + step * (q + 0.5);
        const distS = Math.abs(Math.log(lvl / P)) / (sd * Math.sqrt(WIN));   // 1개월 σ 단위 거리
        const dB = distS < 0.5 ? 'd<0.5' : distS < 1 ? 'd0.5-1' : 'd1-1.5';
        let tau = -1;
        for (let k = t + 1; k <= t + WIN; k++) { if (side === 'below' ? L[k] <= lvl : H[k] >= lvl) { tau = k; break; } }
        if (tau < 0) { add(side + '|' + kind + '|notouch', 0, 0, 0); continue; }
        const bj = b.m.get(o.d[tau]); if (bj == null || bj + 10 >= b.cl.length || tau + 10 >= n) continue;
        // 레벨 가격 기준 수익 — 지수는 터치일 종가 기준(같은 기간)
        const ex5 = (o.cl[tau + 5] / lvl - 1) - (b.cl[bj + 5] / b.cl[bj] - 1);
        const ex10 = (o.cl[tau + 10] / lvl - 1) - (b.cl[bj + 10] / b.cl[bj] - 1);
        const back5 = side === 'below' ? (o.cl[tau + 5] > lvl ? 1 : 0) : (o.cl[tau + 5] < lvl ? 1 : 0);
        for (const key of [side + '|' + kind, side + '|' + kind + '|' + o.c, side + '|' + kind + '|' + half, side + '|' + kind + '|' + dB])
          add(key, ex5, ex10, back5);
      }
    }
  }
  done++; if (done % 200 === 0) console.error('…', done, '/', files.length, ((Date.now() - t0) / 1000 | 0) + 's');
}
const tstat = (a) => { const n = a.length; const m = a.reduce((x, y) => x + y, 0) / n; const v = a.reduce((x, y) => x + (y - m) ** 2, 0) / (n - 1); return m / Math.sqrt(v / n); };
const keys = Object.keys(acc).sort();
for (const k of keys) {
  const a = acc[k];
  if (/notouch/.test(k)) continue;
  const nt = acc[k.split('|').slice(0, 2).join('|') + '|notouch'];
  console.log(k.padEnd(26), 'n', String(a.n).padStart(7), ' +5일 ' + (a.e5 / a.n * 100).toFixed(2) + '%', ' +10일 ' + (a.e10 / a.n * 100).toFixed(2) + '% (t ' + tstat(a.e10s).toFixed(1) + ')',
    ' 5일 뒤 레벨 ' + (k.startsWith('below') ? '위' : '아래') + ' 마감 ' + (a.b5 / a.n * 100).toFixed(1) + '%');
}
for (const s of ['below', 'above']) for (const kd of ['HVN', 'LVN']) {
  const t = acc[s + '|' + kd], nt = acc[s + '|' + kd + '|notouch'];
  if (t && nt) console.log(s, kd, '1개월 내 터치율', (t.n / (t.n + nt.n) * 100).toFixed(1) + '%');
}
fs.writeFileSync(path.join(DIR, 'vp-levels.json'), JSON.stringify(Object.fromEntries(keys.map((k) => [k, { n: acc[k].n, e5: acc[k].e5 / acc[k].n, e10: acc[k].e10 / acc[k].n, back5: acc[k].b5 / acc[k].n }]))));
