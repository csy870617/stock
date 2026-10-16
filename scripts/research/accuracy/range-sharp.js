// 예상 범위가 '넓어서 맞는 것'인가 — 범위의 정보량(날카로움)과 더 좁힐 수 있는지 검증 (2026-10-16)
//
// 질문(사용자): "위아래로 이만큼 넓으면 못 맞추는 게 이상하다." 적중률(커버리지)만으로는 쓸모를 말할 수 없다 —
//   아무리 넓은 범위도 잘 맞는다. 그래서 세 가지를 잰다.
//   ① 정보량: 모든 종목·날짜에 같은 폭을 쓰는 '고정 폭 범위'(같은 80% 적중이 되게 맞춤)와 비교 — 변동성이 낮은/높은
//      종목에서 각각 몇 % 맞는지(조건부 보정)와 평균 폭.
//   ② 날카로움: 변동성 추정법(20·60·120·250일 표준편차, EWMA, 고저가(Parkinson), 혼합)별로 같은 80% 적중을 내는 데
//      필요한 평균 폭과 구간 점수(interval score — 폭 + 벗어난 거리 벌점, 낮을수록 좋음, 적정 확률 규칙).
//   ③ 50% 범위(핵심 구간)의 보정.
// 방법: 평가일(5거래일 간격)마다 각 추정법의 σ 로 z = ln(P_t+h/P_t)/(σ√h). 보정 구간(2021-10 이전)에서 국가·지평별로
//   80% 적중이 되는 대칭 배수 c 를 맞추고, 표본 밖(2021-10~2024-03 / 2024-04~) 두 구간에서 평가한다.
//   현행(s60, c=1.28 고정)은 그대로 평가한다. 채택 기준(사전 등록): 두 표본 밖 구간·두 나라·두 지평 모두에서 현행보다
//   구간 점수가 낮고 적중률이 78~82% 안.
// 사용: node range-sharp.js [캐시 폴더 — px/ 가 있는 곳]
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache');
const PX = path.join(DIR, 'px');
const H = [21, 63], STEP = 5, WARM = 260, CAL_END = '2021-10-01', OOS_SPLIT = '2024-04-01';
const ALPHA = 0.2;
const EST = ['s20', 's60', 's120', 's250', 'ewma94', 'ewma97', 'park60', 'mix', 'mix3'];
const rows = [];   // {c, d, h, r, sig:{...}}
const files = fs.readdirSync(PX).filter((f) => !f.startsWith('^'));
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(path.join(PX, f)));
  const n = o.cl.length; if (n < WARM + 70) continue;
  const lr = new Float64Array(n), hl = new Float64Array(n), hlOk = new Uint8Array(n);
  for (let i = 1; i < n; i++) {
    lr[i] = o.cl[i] > 0 && o.cl[i - 1] > 0 ? Math.log(o.cl[i] / o.cl[i - 1]) : 0;
    const h = o.h[i], l = o.l[i];
    if (h != null && l != null && h > 0 && l > 0 && h >= l && h !== l) { const x = Math.log(h / l); hl[i] = x * x; hlOk[i] = 1; }
  }
  // 누적합(구간 표준편차를 O(1)로)
  const S1 = new Float64Array(n + 1), S2 = new Float64Array(n + 1), P1 = new Float64Array(n + 1), PC = new Float64Array(n + 1);
  for (let i = 1; i < n; i++) { S1[i + 1] = S1[i] + lr[i]; S2[i + 1] = S2[i] + lr[i] * lr[i]; P1[i + 1] = P1[i] + hl[i]; PC[i + 1] = PC[i] + hlOk[i]; }
  const sd = (i, k) => { const a = S1[i + 1] - S1[i + 1 - k], b = S2[i + 1] - S2[i + 1 - k]; const mu = a / k; return Math.sqrt(Math.max(1e-12, (b - k * mu * mu) / (k - 1))); };
  let e94 = null, e97 = null;
  for (let i = 1; i < n; i++) {
    const r2 = lr[i] * lr[i];
    e94 = e94 == null ? r2 : 0.94 * e94 + 0.06 * r2;
    e97 = e97 == null ? r2 : 0.97 * e97 + 0.03 * r2;
    if (i < WARM || (n - 1 - i) % STEP !== 0) continue;
    const s20 = sd(i, 20), s60 = sd(i, 60), s120 = sd(i, 120), s250 = sd(i, 250);
    const pc = PC[i + 1] - PC[i + 1 - 60];
    const park60 = pc >= 50 ? Math.sqrt((P1[i + 1] - P1[i + 1 - 60]) / pc / (4 * Math.LN2)) : null;
    const sig = { s20, s60, s120, s250, ewma94: Math.sqrt(e94), ewma97: Math.sqrt(e97), park60,
      mix: Math.sqrt(0.5 * s60 * s60 + 0.5 * s250 * s250), mix3: Math.sqrt((s20 * s20 + s60 * s60 + s250 * s250) / 3) };
    for (const h of H) {
      if (i + h >= n || !(o.cl[i + h] > 0) || !(o.cl[i] > 0)) continue;
      rows.push({ c: o.c, d: o.d[i], h, r: Math.log(o.cl[i + h] / o.cl[i]), sig, q: null });
    }
  }
}
console.log('관측', rows.length, '(종목·평가일·지평)');
const period = (d) => (d < CAL_END ? 'cal' : d < OOS_SPLIT ? 'oos1' : 'oos2');
const quantAbs = (arr, p) => { const b = arr.slice().sort((x, y) => x - y); return b[Math.min(b.length - 1, Math.floor(p * (b.length - 1)))]; };
// 국가·지평별 σ60 5분위 경계(보정 구간) — 조건부 보정 점검용
const res = {};
for (const c of ['korea', 'us']) for (const h of H) {
  const R = rows.filter((x) => x.c === c && x.h === h);
  const cal = R.filter((x) => period(x.d) === 'cal');
  const qs = [0.2, 0.4, 0.6, 0.8].map((p) => quantAbs(cal.map((x) => x.sig.s60 * Math.sqrt(h)), p));
  const bucket = (x) => { const v = x.sig.s60 * Math.sqrt(h); let k = 0; while (k < 4 && v > qs[k]) k++; return k; };
  // 후보 정의: 이름 → (x) => 로그 폭의 반(=c·σ√h). c 는 보정 구간에서 80% 적중 맞춤.
  const cands = {};
  cands['현행 s60·1.28'] = { half: (x) => 1.28 * x.sig.s60 * Math.sqrt(h) };
  for (const e of EST) {
    const zs = cal.filter((x) => x.sig[e] > 0).map((x) => Math.abs(x.r) / (x.sig[e] * Math.sqrt(h)));
    const k = quantAbs(zs, 1 - ALPHA);
    cands[e + '·맞춤'] = { half: (x) => (x.sig[e] > 0 ? k * x.sig[e] * Math.sqrt(h) : null), k };
  }
  { const k = quantAbs(cal.map((x) => Math.abs(x.r)), 1 - ALPHA); cands['고정 폭'] = { half: () => k, k }; }
  // 50% 범위(핵심 구간) — 현행 σ60 에 0.674
  cands['50% s60·0.674'] = { half: (x) => 0.674 * x.sig.s60 * Math.sqrt(h), alpha: 0.5 };
  for (const [name, cd] of Object.entries(cands)) {
    const a = cd.alpha || ALPHA;
    for (const per of ['oos1', 'oos2']) {
      const S = R.filter((x) => period(x.d) === per);
      let n = 0, hit = 0, wLog = 0, wPct = 0, is = 0; const bk = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
      for (const x of S) {
        const hh = cd.half(x); if (hh == null) continue;
        n++; const inn = Math.abs(x.r) <= hh; if (inn) hit++;
        wLog += 2 * hh; wPct += Math.exp(hh) - Math.exp(-hh);
        is += 2 * hh + (2 / a) * Math.max(0, Math.abs(x.r) - hh);
        const b = bucket(x); bk[b][0]++; if (inn) bk[b][1]++;
      }
      (res[c + '|' + h] = res[c + '|' + h] || {})[name + '|' + per] = { n, cov: hit / n, wPct: wPct / n, is: is / n, byVol: bk.map((z) => (z[0] ? z[1] / z[0] : null)), k: cd.k };
    }
  }
}
const pct = (v) => (v * 100).toFixed(1) + '%';
for (const key of Object.keys(res)) {
  console.log('\n=== ' + key + ' (표본 밖 2021-10~2024-03 | 2024-04~)');
  const names = [...new Set(Object.keys(res[key]).map((k) => k.split('|')[0]))];
  for (const nm of names) {
    const A = res[key][nm + '|oos1'], B = res[key][nm + '|oos2'];
    console.log('  ' + nm.padEnd(15), '적중 ' + pct(A.cov) + ' | ' + pct(B.cov), ' 평균 폭 ' + pct(A.wPct) + ' | ' + pct(B.wPct),
      ' 구간점수 ' + (A.is * 100).toFixed(2) + ' | ' + (B.is * 100).toFixed(2),
      ' 변동성 5분위별 적중(후반) ' + B.byVol.map((v) => (v == null ? '–' : Math.round(v * 100))).join('/') + (A.k ? '  c=' + A.k.toFixed(2) : ''));
  }
}
fs.writeFileSync(path.join(DIR, 'range-sharp.json'), JSON.stringify(res));
