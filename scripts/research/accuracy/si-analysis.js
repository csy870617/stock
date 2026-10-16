// 미국(나스닥 상장) 공매도 잔고 → 다음 1·3개월 S&P500 대비 초과수익 — 날짜별 횡단면 IC, 5분위
// 공매도 잔고는 결제일 기준 집계가 약 8영업일 뒤 공개되므로 결제일 + 8거래일 종가에서 출발한다(룩어헤드 방지).
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); const PX = path.join(DIR, 'px');
const B = JSON.parse(fs.readFileSync(path.join(PX, '^GSPC.json'))); const bIdx = new Map(B.d.map((d, i) => [d, i]));
const LAG = 8, H = [21, 63];
const recs = [];
for (const f of fs.readdirSync(path.join(DIR, 'si-us'))) {
  const S = JSON.parse(fs.readFileSync(path.join(DIR, 'si-us', f))); const pf = path.join(PX, S.sym + '.json'); if (!fs.existsSync(pf)) continue;
  const P = JSON.parse(fs.readFileSync(pf)); const n = P.d.length; const sh = S.inst && S.inst.shOutM;
  const idxOn = (d) => { let lo = 0, hi = n - 1, a = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (P.d[m] <= d) { a = m; lo = m + 1; } else hi = m - 1; } return a; };
  for (let k = 0; k < S.si.length; k++) {
    const x = S.si[k]; const i0 = idxOn(x.d); if (i0 < 0) continue; const i = i0 + LAG; if (i >= n) continue;
    const bi = bIdx.get(P.d[i]); if (bi == null) continue;
    const prev = k > 0 ? S.si[k - 1] : null;
    const r = { s: S.sym, d: x.d, dtc: x.dtc, pct: sh > 0 && x.si != null ? x.si / (sh * 1e6) : null, chg: prev && prev.si > 0 && x.si != null ? x.si / prev.si - 1 : null, ex: {} };
    for (const h of H) if (i + h < n && bi + h < B.d.length) r.ex[h] = (P.cl[i + h] / P.cl[i] - 1) - (B.cl[bi + h] / B.cl[bi] - 1);
    recs.push(r);
  }
}
const rank = (a) => { const idx = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]); const o = new Array(a.length); idx.forEach((p, k) => { o[p[1]] = k; }); return o; };
const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
console.log('관측', recs.length, '종목', new Set(recs.map((r) => r.s)).size, '결제일', new Set(recs.map((r) => r.d)).size);
for (const feat of ['dtc', 'pct', 'chg']) for (const h of H) {
  const byD = new Map(); for (const r of recs) { if (r[feat] == null || r.ex[h] == null) continue; if (!byD.has(r.d)) byD.set(r.d, []); byD.get(r.d).push(r); }
  const ics = [], q1 = [], q5 = [];
  for (const [d, g] of [...byD].sort()) {
    if (g.length < 40) continue;
    const rx = rank(g.map((r) => r[feat])), ry = rank(g.map((r) => r.ex[h])), nn = g.length, mm = (nn - 1) / 2; let c = 0, v = 0;
    for (let k = 0; k < nn; k++) { c += (rx[k] - mm) * (ry[k] - mm); v += (rx[k] - mm) ** 2; }
    ics.push([d, c / v]);
    const srt = g.slice().sort((a, b) => a[feat] - b[feat]); const q = Math.floor(nn / 5);
    q1.push(mean(srt.slice(0, q).map((r) => r.ex[h]))); q5.push(mean(srt.slice(nn - q).map((r) => r.ex[h])));
  }
  const st = (a) => { if (!a.length) return '–'; const m = mean(a), sd = Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / Math.max(1, a.length - 1)); return (m >= 0 ? '+' : '') + m.toFixed(3) + '(t ' + (sd ? m / sd * Math.sqrt(a.length) / Math.sqrt(Math.max(1, h / 10)) : 0).toFixed(1) + ', ' + a.length + ')'; };
  const half = Math.floor(ics.length / 2);
  console.log(feat.padEnd(4), 'h' + h, 'IC', st(ics.map((x) => x[1])), '전반', st(ics.slice(0, half).map((x) => x[1])), '후반', st(ics.slice(half).map((x) => x[1])),
    '| 하위20% 초과 ' + (mean(q1) * 100).toFixed(2) + '% · 상위20% ' + (mean(q5) * 100).toFixed(2) + '%');
}
