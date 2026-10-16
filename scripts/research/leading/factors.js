// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// 선행(leading) 가설 검증 — 사전 등록(결과를 보기 전에 정의·기준 고정, 2026-10-16)
// 유니버스: 한국 KOSPI 250·KOSDAQ 150 + 미국 NASDAQ 250·NYSE 350 + 편성 이력(현재 시총 순위 기준 — 생존편향 있음)
// 평가: 지수 달력 5거래일 간격, 1년 예열, +5/+21/+63거래일 지수(^KS11·^GSPC) 대비 초과수익과의 날짜별 횡단면 Spearman IC
// 채택 기준(국가별): +21일 IC 전반·후반 모두 양, 겹침 할인 t ≥ 2.5, +63일 IC 음수 아님, 편성 이력 종목 IC 음수 아님.
//   조건부 가설(H3·H5·H6)은 같은 부분집단에서 무조건 대응물보다 전반·후반 모두 높아야 한다.
// 가설:
//  F0a REV21  = -21일 수익률 (1개월 반전 — 2026-10-07 기각, 비교 기준)
//  F0b MOM    = 12-1개월 모멘텀 (기각, 비교 기준)
//  H1  HVOL   = log(최근 5일 평균 거래량 / 그 전 60일 평균) — 고거래량 수익 프리미엄(Gervais·Kaniel·Mingelgrin 2001)
//  H2  SHOCK  = 최근 63일 중 거래량 비율(당일/직전 60일 평균) 최대일이 3배 이상이면 그날의 지수 대비 수익률(부호 유지), 아니면 0
//               — 정보 충격(실적·공시) 뒤 지속(post-event drift) 대용치
//  H3  DIPUP  = 상승추세(종가>200일선, 200일선 20일 전보다 상승) 부분집단에서 -10일 수익률 — 상승 추세 속 눌림목
//  H4  ACC    = rank(20일 상승일 거래량 비중) - rank(20일 수익률) — 가격보다 앞선 매집(거래량 방향과 가격의 괴리)
//  H5  SQZ    = 상승추세 부분집단에서 -(볼린저 폭 20일의 1년 백분위) — 변동성 수축 뒤 상방 돌파
//  H6  EARLY  = 200일선 위 부분집단에서 -log(1+200일선 상향 돌파 후 경과일) — 초기 추세 우위
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const PX = path.join(DIR, 'px');
const H = [5, 21, 63], WARM = 260, STEP = 5;
const load = (f) => JSON.parse(fs.readFileSync(path.join(PX, f)));
const bench = { korea: load('^KS11.json'), us: load('^GSPC.json') };
for (const c in bench) { const b = bench[c]; b.m = new Map(b.d.map((d, i) => [d, i])); }
const stocks = fs.readdirSync(PX).filter((f) => !f.startsWith('^')).map(load).filter((o) => o.cl.length > WARM + 70);
// 종목별 사전 계산
for (const o of stocks) {
  const n = o.cl.length, cl = o.cl, v = o.v.map((x) => (x != null && x > 0 ? x : null));
  o.m = new Map(o.d.map((d, i) => [d, i]));
  o.ret = cl.map((x, i) => (i ? x / cl[i - 1] - 1 : 0));
  // 200일선(롤링 합)
  o.sma200 = new Array(n).fill(null); let s = 0;
  for (let i = 0; i < n; i++) { s += cl[i]; if (i >= 200) s -= cl[i - 200]; if (i >= 199) o.sma200[i] = s / 200; }
  // 거래량 prefix(결측은 0, 개수도 따로)
  o.vps = new Float64Array(n + 1); o.vpc = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) { o.vps[i + 1] = o.vps[i] + (v[i] || 0); o.vpc[i + 1] = o.vpc[i] + (v[i] ? 1 : 0); }
  o.vv = v;
  // 볼린저 폭(20일 표준편차/평균)
  o.bbw = new Array(n).fill(null);
  for (let i = 19; i < n; i++) { let a = 0, b2 = 0; for (let k = i - 19; k <= i; k++) { a += cl[k]; b2 += cl[k] * cl[k]; } const mu = a / 20, sd = Math.sqrt(Math.max(0, b2 / 20 - mu * mu)); o.bbw[i] = mu ? sd / mu : null; }
  // 200일선 상향 돌파 후 경과일
  o.since = new Array(n).fill(null); let last = null;
  for (let i = 1; i < n; i++) { if (o.sma200[i] == null || o.sma200[i - 1] == null) continue; if (cl[i] > o.sma200[i] && cl[i - 1] <= o.sma200[i - 1]) last = i; o.since[i] = cl[i] > o.sma200[i] && last != null ? i - last : null; }
}
const vmean = (o, a, b) => { const c = o.vpc[b + 1] - o.vpc[a]; return c >= Math.max(3, (b - a + 1) * 0.6) ? (o.vps[b + 1] - o.vps[a]) / c : null; };
function feats(o, i, b, bi) {
  const cl = o.cl;
  const r = (k) => (i - k >= 0 ? cl[i] / cl[i - k] - 1 : null);
  const up = o.sma200[i] != null && o.sma200[i - 20] != null && cl[i] > o.sma200[i] && o.sma200[i] > o.sma200[i - 20];
  const f = { REV21: r(21) == null ? null : -r(21), MOM: i >= 252 ? cl[i - 21] / cl[i - 252] - 1 : null, REV10: r(10) == null ? null : -r(10), up };
  const v5 = vmean(o, i - 4, i), v60 = vmean(o, i - 64, i - 5);
  f.HVOL = v5 && v60 ? Math.log(v5 / v60) : null;
  // SHOCK
  let best = null, bestK = -1;
  for (let k = i - 62; k <= i; k++) { const vk = o.vv[k]; if (!vk) continue; const base = vmean(o, k - 60, k - 1); if (!base) continue; const vr = vk / base; if (best == null || vr > best) { best = vr; bestK = k; } }
  if (best == null) f.SHOCK = null;
  else if (best < 3) f.SHOCK = 0;
  else { const dk = o.d[bestK], bj = b.m.get(dk); const rb = bj != null && bj > 0 ? b.cl[bj] / b.cl[bj - 1] - 1 : null; f.SHOCK = rb == null ? null : o.ret[bestK] - rb; }
  // ACC 원재료
  let sv = 0, tv = 0; for (let k = i - 19; k <= i; k++) { const vk = o.vv[k]; if (!vk) continue; const s = o.ret[k] > 0 ? 1 : o.ret[k] < 0 ? -1 : 0; sv += s * vk; tv += vk; }
  f.UVS = tv ? sv / tv : null; f.R20 = r(20);
  // SQZ 원재료: 1년 백분위
  if (o.bbw[i] != null) { let cnt = 0, le = 0; for (let k = i - 249; k <= i; k++) { if (k < 0 || o.bbw[k] == null) continue; cnt++; if (o.bbw[k] <= o.bbw[i]) le++; } f.BBP = cnt >= 200 ? le / cnt : null; } else f.BBP = null;
  f.SINCE = o.since[i];
  return f;
}
function rank(a) { const n = a.length, idx = a.map((v, i) => i).sort((x, y) => a[x] - a[y]), r = new Array(n); for (let i = 0; i < n;) { let j = i; while (j + 1 < n && a[idx[j + 1]] === a[idx[i]]) j++; const avg = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k]] = avg; i = j + 1; } return r; }
function spear(x, y) { const n = x.length; if (n < 20) return null; const rx = rank(x), ry = rank(y), m = (n + 1) / 2; let a = 0, b = 0, c = 0; for (let i = 0; i < n; i++) { a += (rx[i] - m) * (ry[i] - m); b += (rx[i] - m) ** 2; c += (ry[i] - m) ** 2; } return b && c ? a / Math.sqrt(b * c) : null; }
// 평가
const out = {};   // key: country|factor|h → {dates:[{d, ic, q5}]}
const FACT = ['REV21', 'MOM', 'HVOL', 'SHOCK', 'ACC', 'REV10_all', 'DIPUP', 'SQZ_all', 'SQZ', 'EARLY_all', 'EARLY'];
const t0 = Date.now();
for (const c of ['korea', 'us']) {
  const b = bench[c]; const n = b.d.length;
  const evalIdx = []; for (let j = WARM; j < n - 64; j++) if ((n - 1 - j) % STEP === 0) evalIdx.push(j);
  for (const j of evalIdx) {
    const d = b.d[j], rows = [];
    for (const o of stocks) {
      if (o.c !== c) continue; const i = o.m.get(d); if (i == null || i < WARM) continue;
      const f = feats(o, i, b, j);
      const ex = {}; for (const h of H) { const dj = b.d[j + h]; const k = o.m.get(dj); ex[h] = k == null ? null : (o.cl[k] / o.cl[i] - 1) - (b.cl[j + h] / b.cl[j] - 1); }
      rows.push({ f, ex, roster: o.roster });
    }
    // ACC: 날짜별 순위 차
    const okA = rows.filter((r) => r.f.UVS != null && r.f.R20 != null);
    if (okA.length >= 20) { const ru = rank(okA.map((r) => r.f.UVS)), rr = rank(okA.map((r) => r.f.R20)); okA.forEach((r, k) => { r.f.ACC = (ru[k] - rr[k]) / okA.length; }); }
    const val = (r, F) => F === 'REV10_all' ? r.f.REV10 : F === 'DIPUP' ? (r.f.up ? r.f.REV10 : null) : F === 'SQZ_all' ? (r.f.BBP == null ? null : -r.f.BBP) : F === 'SQZ' ? (r.f.up && r.f.BBP != null ? -r.f.BBP : null)
      : F === 'EARLY_all' ? (r.f.SINCE == null ? null : -Math.log(1 + r.f.SINCE)) : F === 'EARLY' ? (r.f.SINCE == null ? null : -Math.log(1 + r.f.SINCE)) : r.f[F];
    // EARLY_all 비교 기준은 '200일선 위' 부분집단 전체에서의 경과일이 아니라… 사전 등록상 EARLY 는 200일선 위 집단, 비교 기준은 같은 집단의 무작위가 없으므로 0 대비로만 본다.
    for (const F of FACT) for (const h of H) {
      for (const sub of ['all', 'roster']) {
        const pts = rows.filter((r) => (sub === 'all' || r.roster) && val(r, F) != null && r.ex[h] != null && (F !== 'SQZ_all' || true));
        const ic = spear(pts.map((r) => val(r, F)), pts.map((r) => r.ex[h]));
        const key = c + '|' + F + '|' + h + '|' + sub; (out[key] = out[key] || []).push({ d, ic, n: pts.length,
          q: (() => { if (pts.length < 25) return null; const s = pts.slice().sort((x, y) => val(x, F) - val(y, F)); const q = Math.floor(s.length / 5); const mm = (a) => a.reduce((z, r) => z + r.ex[h], 0) / a.length; return mm(s.slice(-q)) - mm(s.slice(0, q)); })() });
      }
    }
  }
}
// 요약
const res = {};
for (const key of Object.keys(out)) {
  const [c, F, h, sub] = key.split('|'); const a = out[key].filter((x) => x.ic != null);
  if (a.length < 20) continue;
  const ds = a.map((x) => x.d).sort(), split = ds[ds.length >> 1];
  const mean = (z) => z.reduce((s, x) => s + x, 0) / z.length;
  const ics = a.map((x) => x.ic), mu = mean(ics), sd = Math.sqrt(ics.reduce((s, x) => s + (x - mu) ** 2, 0) / (ics.length - 1));
  const t = mu / (sd / Math.sqrt(ics.length)) / Math.sqrt(Math.max(1, +h / STEP));
  const qs = a.map((x) => x.q).filter((x) => x != null);
  res[key] = { c, F, h: +h, sub, dates: a.length, ic: mu, t, first: mean(a.filter((x) => x.d < split).map((x) => x.ic)), second: mean(a.filter((x) => x.d >= split).map((x) => x.ic)),
    hit: ics.filter((x) => x > 0).length / ics.length, q5: qs.length ? mean(qs) : null, split, avgN: mean(a.map((x) => x.n)) };
}
fs.writeFileSync(path.join(DIR, 'factors-result.json'), JSON.stringify(res));
const P = (x, k) => (x == null ? '   –  ' : (x >= 0 ? '+' : '') + x.toFixed(k == null ? 3 : k));
console.log('소요', ((Date.now() - t0) / 1000 | 0) + 's');
for (const c of ['korea', 'us']) { console.log('\n══', c, '(분할 ' + (res[c + '|REV21|21|all'] || {}).split + ')');
  for (const F of FACT) { const line = [5, 21, 63].map((h) => { const r = res[c + '|' + F + '|' + h + '|all']; return r ? h + 'd IC ' + P(r.ic) + ' t ' + P(r.t, 2) + ' [' + P(r.first) + '/' + P(r.second) + '] Q5-Q1 ' + P(r.q5 * 100, 2) + '%' : h + 'd –'; }).join(' | ');
    const ro = res[c + '|' + F + '|21|roster']; console.log(F.padEnd(10), line, '| 편성 21d', ro ? P(ro.ic) : '–', '(n≈' + ((res[c + '|' + F + '|21|all'] || {}).avgN | 0) + ')'); } }
