// 한국 증권사 목표가(네이버 리서치 리포트별) — 상승여력은 실제로 얼마나 실현되나, 도달 확률 모형은 맞나
// 입력: tgt-kr/<code>.json [{d, goal, px}], px/<code>.K?.json, px/^KS11.json
// 사용: node tgt-kr-analysis.js [DIR]
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache');
const PX = path.join(DIR, 'px');
const B = JSON.parse(fs.readFileSync(path.join(PX, '^KS11.json'))); const bIdx = new Map(B.d.map((d, i) => [d, i]));
const Phi = (x) => { const t = 1 / (1 + 0.2316419 * Math.abs(x)); const d = 0.3989423 * Math.exp(-x * x / 2); const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return x > 0 ? 1 - p : p; };
const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
const med = (a) => { const b = a.slice().sort((x, y) => x - y); return b.length ? (b.length % 2 ? b[b.length >> 1] : (b[b.length / 2 - 1] + b[b.length / 2]) / 2) : null; };
const pct = (v, dp = 1) => (v == null ? '–' : (v * 100).toFixed(dp) + '%');
const H = [63, 126, 252];
const pxFile = (code) => { for (const s of ['.KS', '.KQ']) { const f = path.join(PX, code + s + '.json'); if (fs.existsSync(f)) return f; } return null; };
const reps = [], monthly = [];
for (const f of fs.readdirSync(path.join(DIR, 'tgt-kr'))) {
  const code = f.slice(0, 6); const pf = pxFile(code); if (!pf) continue;
  const P = JSON.parse(fs.readFileSync(pf)); const n = P.d.length;
  const Hh = P.h.map((v, i) => (v != null ? v : P.cl[i]));
  const sdAt = (i) => { if (i < 61) return null; let s = 0, ss = 0, m = 0; for (let k = i - 59; k <= i; k++) { const r = Math.log(P.cl[k] / P.cl[k - 1]); if (!isFinite(r)) continue; s += r; ss += r * r; m++; } return m > 40 ? Math.sqrt(Math.max(0, (ss - s * s / m) / (m - 1))) : null; };
  const idxOn = (d) => { let lo = 0, hi = n - 1, ans = -1; while (lo <= hi) { const mid = (lo + hi) >> 1; if (P.d[mid] <= d) { ans = mid; lo = mid + 1; } else hi = mid - 1; } return ans; };
  const R = JSON.parse(fs.readFileSync(path.join(DIR, 'tgt-kr', f))).filter((r) => r.goal > 0 && r.px > 0);
  for (const r of R) {
    const i = idxOn(r.d); if (i < 61) continue;
    const u = r.goal / r.px - 1; if (!(u > -0.5 && u < 3)) continue;
    const adj = P.cl[i] / r.px; if (!(adj > 0.02 && adj < 50)) continue;
    const lvl = P.cl[i] * (1 + u), sd = sdAt(i); if (!sd) continue;
    const bi = bIdx.get(P.d[i]);
    const o = { code, d: r.d, u, sd, ret: {}, ex: {}, touch: {}, end: {}, pT: {}, pE: {} };
    for (const h of H) {
      if (i + h >= n) continue;
      o.ret[h] = P.cl[i + h] / P.cl[i] - 1;
      if (bi != null && bi + h < B.d.length) o.ex[h] = o.ret[h] - (B.cl[bi + h] / B.cl[bi] - 1);
      let mx = -Infinity; for (let k = i + 1; k <= i + h; k++) if (Hh[k] > mx) mx = Hh[k];
      o.touch[h] = mx >= lvl ? 1 : 0; o.end[h] = P.cl[i + h] >= lvl ? 1 : 0;
      const z = Math.log(1 + u) / (sd * Math.sqrt(h));
      o.pT[h] = u <= 0 ? 1 : Math.min(1, 2 * (1 - Phi(z))); o.pE[h] = u <= 0 ? 1 - Phi(z) : 1 - Phi(z);
    }
    reps.push(o);
  }
  // 월말 컨센서스(최근 180일 안 증권사별 최신 목표가의 평균 상승여력 — 작성 당시 가격 대비 비율을 현재 가격으로 환산)
  const months = [...new Set(P.d.map((d) => d.slice(0, 7)))].sort();
  for (const m of months) {
    const i = idxOn(m + '-31'); if (i < 61 || P.d[i].slice(0, 7) !== m) continue;
    const d = P.d[i], from = new Date(Date.parse(d) - 180 * 864e5).toISOString().slice(0, 10);
    const lastBy = new Map();
    for (const r of R) if (r.d <= d && r.d >= from) lastBy.set(r.broker, r);
    if (lastBy.size < 2) continue;
    // 브로커 목표가를 현재(Yahoo) 단위로: goal × (그날 Yahoo 종가 / 작성 당시 px)
    const lv = []; for (const r of lastBy.values()) { const j = idxOn(r.d); if (j < 0) continue; lv.push(r.goal * P.cl[j] / r.px); }
    if (lv.length < 2) continue;
    const cons = mean(lv), u = cons / P.cl[i] - 1; if (!(u > -0.5 && u < 3)) continue;
    const sd = sdAt(i); if (!sd) continue;
    const ch20 = i >= 20 ? P.cl[i] / P.cl[i - 20] - 1 : null;
    // 목표가 반응 — 20거래일 전 컨센서스 대비 변화
    const o = { code, d, u, sd, n: lv.length, ch20, ret: {}, ex: {}, touch: {}, pT: {} };
    const bi = bIdx.get(d);
    for (const h of [21, 63, 126, 252]) {
      if (i + h >= n) continue;
      o.ret[h] = P.cl[i + h] / P.cl[i] - 1;
      if (bi != null && bi + h < B.d.length) o.ex[h] = o.ret[h] - (B.cl[bi + h] / B.cl[bi] - 1);
      let mx = -Infinity; for (let k = i + 1; k <= i + h; k++) if (Hh[k] > mx) mx = Hh[k];
      o.touch[h] = mx >= cons ? 1 : 0;
      const z = Math.log(1 + u) / (sd * Math.sqrt(h)); o.pT[h] = u <= 0 ? 1 : Math.min(1, 2 * (1 - Phi(z)));
    }
    monthly.push(o);
  }
}
console.log('리포트', reps.length, '종목', new Set(reps.map((r) => r.code)).size, '기간', reps.map((r) => r.d).sort()[0], '~', reps.map((r) => r.d).sort().pop());
for (const h of H) {
  const R = reps.filter((r) => r.ret[h] != null); if (!R.length) continue;
  console.log('\n[리포트] h=' + h + ' (n ' + R.length + ') 제시 상승여력 평균 ' + pct(mean(R.map((r) => r.u))) + ' 중앙 ' + pct(med(R.map((r) => r.u))) +
    ' | 실현 평균 ' + pct(mean(R.map((r) => r.ret[h]))) + ' 중앙 ' + pct(med(R.map((r) => r.ret[h]))) + ' | 코스피 초과 평균 ' + pct(mean(R.filter((r) => r.ex[h] != null).map((r) => r.ex[h]))) +
    ' | 기간 중 터치 ' + pct(mean(R.map((r) => r.touch[h]))) + ' (모형 ' + pct(mean(R.map((r) => r.pT[h]))) + ') · 만기 시 위 ' + pct(mean(R.map((r) => r.end[h]))) + ' (모형 ' + pct(mean(R.map((r) => r.pE[h]))) + ')');
  const S = R.slice().sort((a, b) => a.u - b.u);
  for (let k = 0; k < 5; k++) { const g = S.slice(Math.floor(k * S.length / 5), Math.floor((k + 1) * S.length / 5));
    console.log('  Q' + (k + 1) + ' 상승여력 ' + pct(mean(g.map((r) => r.u))).padStart(6) + ' → 실현 평균 ' + pct(mean(g.map((r) => r.ret[h]))).padStart(6) + ' 중앙 ' + pct(med(g.map((r) => r.ret[h]))).padStart(6) +
      ' · 초과 ' + pct(mean(g.filter((r) => r.ex[h] != null).map((r) => r.ex[h]))).padStart(6) + ' · 터치 ' + pct(mean(g.map((r) => r.touch[h]))).padStart(6) + ' (모형 ' + pct(mean(g.map((r) => r.pT[h]))) + ')'); }
  // 모형 확률 보정표
  const bins = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0001];
  const cal = [];
  for (let k = 0; k < bins.length - 1; k++) { const g = R.filter((r) => r.pT[h] >= bins[k] && r.pT[h] < bins[k + 1]); if (g.length < 30) continue; cal.push(pct(bins[k], 0) + '~' + pct(bins[k + 1] > 1 ? 1 : bins[k + 1], 0) + ': 모형 ' + pct(mean(g.map((r) => r.pT[h])), 0) + ' 실제 ' + pct(mean(g.map((r) => r.touch[h])), 0) + ' (n' + g.length + ')'); }
  console.log('  터치 확률 보정: ' + cal.join(' | '));
}
// 월말 컨센서스: 날짜별 IC, 보정
const rank = (a) => { const idx = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]); const o = new Array(a.length); idx.forEach((p, k) => { o[p[1]] = k; }); return o; };
const SPLIT = '2022-10-01';
for (const h of [21, 63, 126, 252]) {
  const R = monthly.filter((r) => r.ex[h] != null); if (!R.length) continue;
  const byD = new Map(); for (const r of R) { const k = r.d.slice(0, 7); if (!byD.has(k)) byD.set(k, []); byD.get(k).push(r); }
  const ics = [];
  for (const [m, g] of [...byD].sort()) { if (g.length < 25) continue; const rx = rank(g.map((r) => r.u)), ry = rank(g.map((r) => r.ex[h])), nn = g.length, mm = (nn - 1) / 2; let c = 0, v = 0; for (let k = 0; k < nn; k++) { c += (rx[k] - mm) * (ry[k] - mm); v += (rx[k] - mm) ** 2; } ics.push([m, c / v]); }
  const st = (a) => { if (!a.length) return '–'; const m = mean(a), sd = Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / Math.max(1, a.length - 1)); return (m >= 0 ? '+' : '') + m.toFixed(3) + '(t ' + (sd ? m / sd * Math.sqrt(a.length) / Math.sqrt(Math.max(1, h / 21)) : 0).toFixed(1) + ', ' + a.length + '개월)'; };
  console.log('\n[월말 컨센서스] h=' + h + ' 관측 ' + R.length + ' — IC 전체 ' + st(ics.map((x) => x[1])) + ' · 전반 ' + st(ics.filter((x) => x[0] < SPLIT.slice(0, 7)).map((x) => x[1])) + ' · 후반 ' + st(ics.filter((x) => x[0] >= SPLIT.slice(0, 7)).map((x) => x[1])));
  console.log('  컨센서스 상승여력 평균 ' + pct(mean(R.map((r) => r.u))) + ' → 실현 평균 ' + pct(mean(R.map((r) => r.ret[h]))) + ' · 초과 ' + pct(mean(R.map((r) => r.ex[h]))) + ' · 터치 ' + pct(mean(R.map((r) => r.touch[h]))) + ' (모형 ' + pct(mean(R.map((r) => r.pT[h]))) + ')');
  const S = R.slice().sort((a, b) => a.u - b.u);
  for (let k = 0; k < 5; k++) { const g = S.slice(Math.floor(k * S.length / 5), Math.floor((k + 1) * S.length / 5));
    console.log('  Q' + (k + 1) + ' 상승여력 ' + pct(mean(g.map((r) => r.u))).padStart(6) + ' → 실현 ' + pct(mean(g.map((r) => r.ret[h]))).padStart(6) + ' · 초과 ' + pct(mean(g.map((r) => r.ex[h]))).padStart(6) + ' · 터치 ' + pct(mean(g.map((r) => r.touch[h]))).padStart(6) + ' (모형 ' + pct(mean(g.map((r) => r.pT[h]))) + ')'); }
  // 급락 직후(20일 -15% 이하) — 목표가가 아직 안 내려온 상태의 상승여력
  const crash = R.filter((r) => r.ch20 != null && r.ch20 <= -0.15), rest = R.filter((r) => r.ch20 != null && r.ch20 > -0.15);
  if (crash.length > 20) console.log('  20일 -15% 급락 직후 (n ' + crash.length + '): 상승여력 ' + pct(mean(crash.map((r) => r.u))) + ' → 실현 ' + pct(mean(crash.map((r) => r.ret[h]))) + ' · 초과 ' + pct(mean(crash.map((r) => r.ex[h]))) + ' · 터치 ' + pct(mean(crash.map((r) => r.touch[h]))) + ' (모형 ' + pct(mean(crash.map((r) => r.pT[h]))) + ') | 나머지 상승여력 ' + pct(mean(rest.map((r) => r.u))) + ' → 실현 ' + pct(mean(rest.map((r) => r.ret[h]))) + ' · 터치 ' + pct(mean(rest.map((r) => r.touch[h]))) + ' (모형 ' + pct(mean(rest.map((r) => r.pT[h]))) + ')');
  const bins = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0001]; const cal = [];
  for (let k = 0; k < bins.length - 1; k++) { const g = R.filter((r) => r.pT[h] >= bins[k] && r.pT[h] < bins[k + 1]); if (g.length < 30) continue; cal.push(pct(bins[k], 0) + '~: 모형 ' + pct(mean(g.map((r) => r.pT[h])), 0) + ' 실제 ' + pct(mean(g.map((r) => r.touch[h])), 0) + ' (n' + g.length + ')'); }
  console.log('  터치 확률 보정: ' + cal.join(' | '));
}
fs.writeFileSync(path.join(DIR, 'tgt-kr-monthly.json'), JSON.stringify(monthly));
