// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// 한국 투자자별 수급(외국인·기관) 선행성 검증 — 사전 등록(2026-10-16, 결과 보기 전 고정)
// 신호(하루 지연 — 그날 수급은 장 마감 뒤 공개되므로 t-1 까지만 사용):
//   FI20 (1순위) = Σ(외국인+기관 순매수 수량, t-20..t-1) / Σ(거래량, 같은 기간)
//   F20 = 외국인만, O20 = 기관만, FR20 = 외국인 보유율 변화(t-1 vs t-21, %p), FI5 = 5일 판(단기)
// 평가: KOSPI 달력 5거래일 간격, +5/+21/+63거래일 ^KS11 대비 초과수익과의 날짜별 횡단면 Spearman IC.
// 채택 기준: FI20 의 +21일 IC 전반·후반 모두 양, 겹침 할인 t ≥ 2.5, +63일 음수 아님, 편성 이력 종목 IC 음수 아님.
//           (보조 신호는 t ≥ 3.0 일 때만 채택 후보 — 다중검정 보정)
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const PX = path.join(DIR, 'px'), FL = path.join(DIR, 'flow');
const B = JSON.parse(fs.readFileSync(path.join(PX, '^KS11.json')));
const stocks = [];
for (const f of fs.readdirSync(FL)) {
  const fl = JSON.parse(fs.readFileSync(path.join(FL, f))); const code = fl.code;
  const pf = ['.KS', '.KQ'].map((s) => path.join(PX, code + s + '.json')).find((p) => fs.existsSync(p)); if (!pf) continue;
  const o = JSON.parse(fs.readFileSync(pf)); o.m = new Map(o.d.map((d, i) => [d, i]));
  const fm = new Map(fl.d.map((d, i) => [d, i])); o.fl = fl; o.fm = fm; stocks.push(o);
}
const H = [5, 21, 63];
function rank(a) { const n = a.length, idx = a.map((v, i) => i).sort((x, y) => a[x] - a[y]), r = new Array(n); for (let i = 0; i < n;) { let j = i; while (j + 1 < n && a[idx[j + 1]] === a[idx[i]]) j++; const avg = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k]] = avg; i = j + 1; } return r; }
function spear(x, y) { const n = x.length; if (n < 20) return null; const rx = rank(x), ry = rank(y), m = (n + 1) / 2; let a = 0, b = 0, c = 0; for (let i = 0; i < n; i++) { a += (rx[i] - m) * (ry[i] - m); b += (rx[i] - m) ** 2; c += (ry[i] - m) ** 2; } return b && c ? a / Math.sqrt(b * c) : null; }
function sig(o, d) {
  const k = o.fm.get(d); if (k == null || k < 22) return null; const F = o.fl;
  const win = (n, pick) => { let s = 0, v = 0, cnt = 0; for (let j = k - n; j <= k - 1; j++) { const x = pick(j), vv = F.v[j]; if (x == null || !vv) continue; s += x; v += vv; cnt++; } return cnt >= n * 0.7 && v > 0 ? s / v : null; };
  return {
    FI20: win(20, (j) => (F.f[j] == null || F.o[j] == null ? null : F.f[j] + F.o[j])),
    F20: win(20, (j) => F.f[j]), O20: win(20, (j) => F.o[j]),
    FI5: win(5, (j) => (F.f[j] == null || F.o[j] == null ? null : F.f[j] + F.o[j])),
    FR20: F.fr[k - 1] != null && F.fr[k - 21] != null ? F.fr[k - 1] - F.fr[k - 21] : null,
  };
}
const S = ['FI20', 'F20', 'O20', 'FI5', 'FR20'], acc = {};
const n = B.d.length;
for (let j = 300; j < n - 64; j++) {
  if ((n - 1 - j) % 5) continue; const d = B.d[j]; const rows = [];
  for (const o of stocks) { const i = o.m.get(d); if (i == null) continue; const s = sig(o, d); if (!s) continue;
    const ex = {}; for (const h of H) { const k = o.m.get(B.d[j + h]); ex[h] = k == null ? null : (o.cl[k] / o.cl[i] - 1) - (B.cl[j + h] / B.cl[j] - 1); }
    rows.push({ s, ex, roster: o.roster }); }
  for (const name of S) for (const h of H) for (const sub of ['all', 'roster']) {
    const p = rows.filter((r) => (sub === 'all' || r.roster) && r.s[name] != null && r.ex[h] != null);
    const ic = spear(p.map((r) => r.s[name]), p.map((r) => r.ex[h])); if (ic == null) continue;
    let q = null; if (p.length >= 25) { const srt = p.slice().sort((a, b) => a.s[name] - b.s[name]); const k = Math.floor(srt.length / 5); const mm = (a) => a.reduce((z, r) => z + r.ex[h], 0) / a.length; q = mm(srt.slice(-k)) - mm(srt.slice(0, k)); }
    const key = name + '|' + h + '|' + sub; (acc[key] = acc[key] || []).push({ d, ic, q, n: p.length });
  }
}
const res = {};
for (const key of Object.keys(acc)) { const a = acc[key]; const [name, h, sub] = key.split('|'); const ds = a.map((x) => x.d).sort(), split = ds[ds.length >> 1];
  const mean = (z) => z.reduce((s, x) => s + x, 0) / z.length; const ics = a.map((x) => x.ic), mu = mean(ics), sd = Math.sqrt(ics.reduce((s, x) => s + (x - mu) ** 2, 0) / (ics.length - 1));
  const qs = a.map((x) => x.q).filter((x) => x != null);
  res[key] = { dates: a.length, ic: mu, t: mu / (sd / Math.sqrt(ics.length)) / Math.sqrt(Math.max(1, +h / 5)), first: mean(a.filter((x) => x.d < split).map((x) => x.ic)), second: mean(a.filter((x) => x.d >= split).map((x) => x.ic)), q5: qs.length ? mean(qs) : null, split, avgN: mean(a.map((x) => x.n)), from: ds[0], to: ds[ds.length - 1] }; }
fs.writeFileSync(path.join(DIR, 'flow-result.json'), JSON.stringify(res));
const P = (x, k) => (x == null ? '   –  ' : (x >= 0 ? '+' : '') + x.toFixed(k == null ? 3 : k));
console.log('종목', stocks.length, '· 기간', (res['FI20|21|all'] || {}).from, '~', (res['FI20|21|all'] || {}).to, '· 분할', (res['FI20|21|all'] || {}).split);
for (const name of S) console.log(name.padEnd(5), H.map((h) => { const r = res[name + '|' + h + '|all']; return r ? h + 'd IC ' + P(r.ic) + ' t ' + P(r.t, 2) + ' [' + P(r.first) + '/' + P(r.second) + '] Q5-Q1 ' + P(r.q5 * 100, 2) + '%' : '–'; }).join(' | '), '| 편성 21d', P((res[name + '|21|roster'] || {}).ic), '(n≈' + ((res[name + '|21|all'] || {}).avgN | 0) + ')');
