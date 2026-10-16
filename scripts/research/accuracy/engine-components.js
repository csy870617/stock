// 엔진 구성요소 예측력 — 991종목에 현행 엔진(lib-ta analyzeTimeframes)을 룩어헤드 없이 주 1회 적용,
// 기간(단·중·장)별 구성요소 점수(이평·일목·매물대·보조)와 mtf 최종 점수, 매물대 원재료(머리 위 매물 비중·주변 불균형),
// 한국 수급(FI20, 하루 지연)을 기록하고 +5/+21/+63거래일 지수 대비 초과수익을 붙인다 → eng-records.jsonl (분석: comp-ic.js)
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache');
const TA = require(path.join(__dirname, '..', '..', 'lib-ta.js'));
const PX = path.join(DIR, 'px'), FL = path.join(DIR, 'flow');
const H = [5, 21, 63], WARM = 1630, STEP = 5;
const bench = { korea: JSON.parse(fs.readFileSync(path.join(PX, '^KS11.json'))), us: JSON.parse(fs.readFileSync(path.join(PX, '^GSPC.json'))) };
for (const c in bench) { const b = bench[c]; b.m = new Map(b.d.map((d, i) => [d, i])); const n = b.d.length; b.evalSet = new Set(b.d.filter((d, i) => (n - 1 - i) % STEP === 0)); }
const files = fs.readdirSync(PX).filter((f) => !f.startsWith('^'));
const out = fs.openSync(path.join(DIR, 'eng-records.jsonl'), 'w');
let done = 0, evals = 0; const t0 = Date.now();
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(path.join(PX, f))); if (o.cl.length < WARM + 70) continue; o.m = new Map(o.d.map((d, i) => [d, i]));
  const b = bench[o.c];
  let fl = null; if (o.c === 'korea') { const fp = path.join(FL, o.s.slice(0, 6) + '.json'); if (fs.existsSync(fp)) { fl = JSON.parse(fs.readFileSync(fp)); fl.m = new Map(fl.d.map((d, i) => [d, i])); } }
  const rows = o.d.map((d, i) => ({ t: Date.parse(d) / 1000, close: o.cl[i], high: o.h[i] != null ? o.h[i] : o.cl[i], low: o.l[i] != null ? o.l[i] : o.cl[i], vol: o.v[i] }));
  for (let t = WARM; t < rows.length - 1; t++) {
    const d = o.d[t]; if (!b.evalSet.has(d)) continue; const j = b.m.get(d); if (j == null) continue;
    const a = TA.analyzeTimeframes(rows.slice(0, t + 1), { dp: 2, srDp: 2 }); if (!a) continue;
    const ex = {}; for (const h of H) { if (j + h >= b.d.length) { ex[h] = null; continue; } const k = o.m ? o.m.get(b.d[j + h]) : null; let kk = k; if (kk == null) { kk = o.d.indexOf(b.d[j + h]); if (kk < 0) kk = null; } ex[h] = kk == null ? null : +((o.cl[kk] / o.cl[t] - 1) - (b.cl[j + h] / b.cl[j] - 1)).toFixed(5); }
    const comp = (x) => x && x.flow ? [x.flow.ma, x.flow.ichimoku, x.flow.volume, x.flow.osc].map((v) => (v == null ? null : +v.toFixed(3))) : null;
    const rec = { c: o.c, s: o.s, r: o.roster ? 1 : 0, d, sc: [a.short.scoreFlow, a.mid.scoreFlow, a.long.scoreFlow].map((v) => (v == null ? null : +v.toFixed(3))),
      cs: comp(a.short), cm: comp(a.mid), cl: comp(a.long), ex };
    // 매물대 원재료(일봉 1년) — 머리 위 매물 비중·주변 ±5% 불균형
    const vp = TA.volumeProfile(rows.slice(Math.max(0, t - 260), t + 1), 250); if (vp) { rec.vpA = +vp.aboveRatio.toFixed(3); rec.vpL = +vp.local.toFixed(3); }
    if (fl) { const k = fl.m.get(d); if (k != null && k >= 21) { let s = 0, v = 0, ss = 0, vv = 0, c = 0; for (let q = k - 20; q <= k - 1; q++) { if (fl.f[q] == null || fl.o[q] == null || !fl.v[q]) continue; s += fl.f[q] + fl.o[q]; v += fl.v[q]; c++; if (q >= k - 5) { ss += fl.f[q] + fl.o[q]; vv += fl.v[q]; } } if (c >= 14 && v > 0) { rec.fi20 = +(s / v).toFixed(4); if (vv > 0) rec.fi5 = +(ss / vv).toFixed(4); } } }
    fs.writeSync(out, JSON.stringify(rec) + '\n'); evals++;
  }
  if (!o.m) o.m = null;
  done++; if (done % 50 === 0) console.log('…', done, '/', files.length, '평가', evals, ((Date.now() - t0) / 1000 | 0) + 's');
}
fs.closeSync(out); console.log('완료', done, '평가', evals, ((Date.now() - t0) / 1000 | 0) + 's');
