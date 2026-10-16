// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// PEAD(실적 발표 후 드리프트) 검증 — 미국 유니버스 최근 4분기(나스닥 서프라이즈 표)
// 사전 기준: 신호(①EPS 서프라이즈 % ②발표 반응 = 발표 전일 종가→발표 다음날 종가 지수 대비 수익률)와
//   발표 다음날 종가 이후 +21·+63거래일 지수 대비 초과수익의 시즌별 Spearman IC 가 4개 시즌 모두 양,
//   이벤트 전체 IC 의 t ≥ 3 (반응일 제외 — 룩어헤드 없음).
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const PX = path.join(DIR, 'px'), EPS = path.join(DIR, 'eps');
const B = JSON.parse(fs.readFileSync(path.join(PX, '^GSPC.json'))); const bm = new Map(B.d.map((d, i) => [d, i]));
function rank(a) { const n = a.length, idx = a.map((v, i) => i).sort((x, y) => a[x] - a[y]), r = new Array(n); for (let i = 0; i < n;) { let j = i; while (j + 1 < n && a[idx[j + 1]] === a[idx[i]]) j++; const avg = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k]] = avg; i = j + 1; } return r; }
function spear(x, y) { const n = x.length; if (n < 15) return null; const rx = rank(x), ry = rank(y), m = (n + 1) / 2; let a = 0, b = 0, c = 0; for (let i = 0; i < n; i++) { a += (rx[i] - m) * (ry[i] - m); b += (rx[i] - m) ** 2; c += (ry[i] - m) ** 2; } return a / Math.sqrt(b * c); }
const ev = [];
for (const f of fs.readdirSync(EPS)) {
  const e = JSON.parse(fs.readFileSync(path.join(EPS, f))); const pf = path.join(PX, f); if (!fs.existsSync(pf)) continue;
  const o = JSON.parse(fs.readFileSync(pf)); const om = new Map(o.d.map((d, i) => [d, i]));
  for (const r of e.rows) {
    const m = String(r.dateReported || '').match(/(\d+)\/(\d+)\/(\d{4})/); if (!m) continue;
    const D = m[3] + '-' + m[1].padStart(2, '0') + '-' + m[2].padStart(2, '0');
    // 발표일 이상 첫 거래일 인덱스
    let i = o.d.findIndex((d) => d >= D); if (i < 2 || i + 2 >= o.d.length) continue;
    const j = bm.get(o.d[i]); if (j == null) continue;
    const exr = (a, b) => { const ja = bm.get(o.d[a]), jb = bm.get(o.d[b]); return ja == null || jb == null ? null : (o.cl[b] / o.cl[a] - 1) - (B.cl[jb] / B.cl[ja] - 1); };
    const reac = exr(i - 1, i + 1);   // 발표 전일 종가 → 발표 다음날 종가(장전·장후 발표 모두 포함)
    const fwd = {}; for (const h of [21, 63]) fwd[h] = i + 1 + h < o.d.length ? exr(i + 1, i + 1 + h) : null;
    const sur = parseFloat(r.percentageSurprise); const eps = parseFloat(r.eps), est = parseFloat(r.consensusForecast);
    ev.push({ sym: e.sym, D, season: r.fiscalQtrEnd, sur: isFinite(sur) ? Math.max(-100, Math.min(100, sur)) : null, beat: isFinite(eps) && isFinite(est) ? Math.sign(eps - est) : null, reac, fwd });
  }
}
const seasons = [...new Set(ev.map((x) => x.season))].sort((a, b) => Date.parse('1 ' + a) - Date.parse('1 ' + b));
console.log('이벤트', ev.length, '시즌', seasons.join(', '));
for (const sig of ['sur', 'reac']) for (const h of [21, 63]) {
  const per = seasons.map((s) => { const a = ev.filter((x) => x.season === s && x[sig] != null && x.fwd[h] != null); return { s, n: a.length, ic: spear(a.map((x) => x[sig]), a.map((x) => x.fwd[h])) }; });
  const all = ev.filter((x) => x[sig] != null && x.fwd[h] != null); const ic = spear(all.map((x) => x[sig]), all.map((x) => x.fwd[h]));
  const t = ic == null ? null : ic * Math.sqrt(all.length - 2) / Math.sqrt(1 - ic * ic);
  // 상·하위 30% 평균 초과수익 차
  const srt = all.slice().sort((a, b) => a[sig] - b[sig]); const k = Math.floor(srt.length * 0.3); const mm = (a) => a.reduce((s, x) => s + x.fwd[h], 0) / a.length;
  console.log(sig.padEnd(5), h + 'd', '| 전체 IC', ic == null ? '–' : ic.toFixed(3), 't', t == null ? '–' : t.toFixed(2), 'n', all.length, '| 상위30%−하위30%', ((mm(srt.slice(-k)) - mm(srt.slice(0, k))) * 100).toFixed(2) + '%p', '| 시즌별', per.map((p) => p.s + ':' + (p.ic == null ? '–' : p.ic.toFixed(3)) + '(' + p.n + ')').join(' '));
}
const beat = ev.filter((x) => x.beat != null && x.fwd[21] != null); const mb = (v) => { const a = beat.filter((x) => x.beat === v); return a.length ? (a.reduce((s, x) => s + x.fwd[21], 0) / a.length * 100).toFixed(2) + '% (n ' + a.length + ')' : '–'; };
console.log('상회/부합/하회 다음 21일 초과수익:', mb(1), '/', mb(0), '/', mb(-1));
