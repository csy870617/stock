// 지난 6개월 주가 흐름 분석 — 상승·하락·보합 판정과 그 '이유'를 숫자로 쪼갠다(토큰 0).
// update-moves.js 가 종목마다 data/chart/<ticker>.json 일봉(update-stock-ta.js)과 지수 일봉으로 계산해
// data/move/<ticker>.json 에 쓰고, 앱 종목 상세 '6개월 흐름'이 그린다.
//
//   1) 판정 — 6개월 수익률을 그 종목의 6개월 통상 변동폭(일간 변동성 × √거래일 수)과 견준다. 그 3분의 1을 넘으면 상승·하락,
//      안이면 보합. 띠는 5~10% 로 묶는다(±5% 안은 늘 보합, ±10% 밖은 늘 상승·하락 — 처음엔 절반·5~15% 였으나 '+10.8% 인데
//      보합'처럼 읽는 사람의 감각과 어긋나 좁혔다). '시장보다 강함·약함'은 지수와의 차이(비율)가 5% 를 넘었는지로 본다.
//   2) 시장 몫 vs 종목 고유 — 최근 1년 일간 수익률을 지수에 회귀한 β 로 '시장만 따랐다면'((1+지수)^β − 1)과 실제를 가른다.
//      로그로는 정확히 더해진다: ln(1+실제) = β·ln(1+지수) + Σ 일간 초과수익(종목 − β×지수).
//   3) 핵심 날짜 — 일간 초과수익이 기간 표준편차의 2.2배·2.5% 를 넘은 날(같은 방향으로 이어진 날은 최대 3일로 묶는다)을
//      크기순으로. 종목 고유 움직임 중 이 며칠의 몫으로 '사건이 이끈 움직임'과 '꾸준히 쌓인 흐름'을 가른다.
//      종목이 크게 움직였지만 대부분 시장 몫이었던 날은 '시장 급변일'로 따로 둔다.
//   4) 구간 — 로그 가격을 꺾은선 1~4개로 근사한다(동적 계획법 — 구간 = 시작·끝 종가를 잇는 직선, 오차 제곱합 최소).
//      구간을 하나 늘려도 오차가 40% 넘게 줄지 않으면 멈추고, 같은 판정(상승·하락·보합)이 이어지면 합친다.
// 예측이 아니다 — 이미 일어난 움직임을 분해한 사실이다.
"use strict";

const MONTHS = 6;
const KEY_MAX = 5;          // 핵심 날짜 최대 개수
const MKT_DAY_MAX = 2;      // 시장 급변일 최대 개수
const LEG_MAX = 4, LEG_MIN = 10, LEG_GAIN = 0.6;   // 구간: 최대 4개, 최소 10거래일, 오차가 60% 이하로 줄어야 하나 더

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const r4 = (v) => (v == null || !isFinite(v) ? null : Math.round(v * 1e4) / 1e4);
const r2 = (v) => (v == null || !isFinite(v) ? null : Math.round(v * 100) / 100);
const ymd = (t) => { const s = String(t); return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8); };
const mean = (a) => a.reduce((s, v) => s + v, 0) / (a.length || 1);
function sd(a) {
  if (a.length < 2) return 0;
  const m = mean(a);
  return Math.sqrt(a.reduce((s, v) => s + (v - m) * (v - m), 0) / (a.length - 1));
}
function median(a) {
  const b = a.filter((v) => v > 0).sort((x, y) => x - y);
  if (!b.length) return 0;
  const k = b.length >> 1;
  return b.length % 2 ? b[k] : (b[k - 1] + b[k]) / 2;
}
// y = a + b·x 최소제곱
function ols(y, x) {
  const n = y.length;
  if (n < 40) return null;
  const mx = mean(x), my = mean(y);
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) * (x[i] - mx); }
  if (!(sxx > 0)) return null;
  const b = sxy / sxx;
  return { a: my - b * mx, b, n };
}
// 날짜 정수(YYYYMMDD)에서 m 개월 전 같은 날(그 달에 없으면 말일)
function monthsBack(t, m) {
  const s = String(t);
  let y = +s.slice(0, 4), mo = +s.slice(4, 6) - m;
  const d = +s.slice(6, 8);
  while (mo <= 0) { mo += 12; y--; }
  const dim = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  return y * 10000 + mo * 100 + Math.min(d, dim);
}
// 판정 띠 — 기간 통상 변동폭(σ_일·√n)의 3분의 1, lo~hi 로 묶음
const bandOf = (sigD, n, lo, hi) => clamp(sigD * Math.sqrt(Math.max(1, n)) / 3, lo, hi);
const REL_BAND = 0.05;   // 시장 대비 강함·약함 — 두 숫자를 나란히 보는 사람의 감각에 맞춘 고정 띠
const clsOf = (ret, band) => (ret >= band ? "상승" : ret <= -band ? "하락" : "보합");

// 로그 가격 꺾은선 근사 — 구간 끝점은 실제 종가(구간 = 끝점 종가를 잇는 직선), 오차 제곱합 최소. → 끝점 인덱스 배열
function breakpoints(y) {
  const N = y.length;
  if (N < LEG_MIN * 2 + 1) return [0, N - 1];
  // 접두합으로 구간 오차를 O(1)에
  const P0 = [0], P1 = [0], P2 = [0], Y1 = [0], Y2 = [0], TY = [0];
  for (let t = 0; t < N; t++) {
    P0.push(P0[t] + 1); P1.push(P1[t] + t); P2.push(P2[t] + t * t);
    Y1.push(Y1[t] + y[t]); Y2.push(Y2[t] + y[t] * y[t]); TY.push(TY[t] + t * y[t]);
  }
  const cost = (i, j) => {
    const m = (y[j] - y[i]) / (j - i), A = y[i] - m * i;
    const c0 = P0[j + 1] - P0[i], c1 = P1[j + 1] - P1[i], c2 = P2[j + 1] - P2[i];
    const s1 = Y1[j + 1] - Y1[i], s2 = Y2[j + 1] - Y2[i], st = TY[j + 1] - TY[i];
    return Math.max(0, s2 - 2 * (A * s1 + m * st) + (A * A * c0 + 2 * A * m * c1 + m * m * c2));
  };
  const best = [], prev = [];
  for (let k = 1; k <= LEG_MAX; k++) { best[k] = new Array(N).fill(Infinity); prev[k] = new Array(N).fill(-1); }
  for (let j = LEG_MIN; j < N; j++) best[1][j] = cost(0, j);
  for (let k = 2; k <= LEG_MAX; k++) {
    for (let j = k * LEG_MIN; j < N; j++) {
      for (let i = (k - 1) * LEG_MIN; i <= j - LEG_MIN; i++) {
        if (best[k - 1][i] === Infinity) continue;
        const v = best[k - 1][i] + cost(i, j);
        if (v < best[k][j]) { best[k][j] = v; prev[k][j] = i; }
      }
    }
  }
  let K = 1;
  for (let k = 2; k <= LEG_MAX; k++) {
    if (best[k][N - 1] < Infinity && best[k][N - 1] <= LEG_GAIN * best[K][N - 1]) K = k;
    else break;
  }
  const pts = [N - 1];
  for (let k = K, j = N - 1; k > 1; k--) { j = prev[k][j]; pts.unshift(j); }
  pts.unshift(0);
  // 꺾이는 점을 실제 고점·저점으로 옮긴다 — 직선 근사의 끝점은 고점 며칠 앞뒤에 잡히곤 해 '6/2까지 상승'인데 고점은 6/22 같은
  // 어긋남이 생긴다. 오르다 내리면 이웃 구간 사이의 최고가로, 내리다 오르면 최저가로(구간 최소 길이는 지킨다).
  for (let q = 1; q + 1 < pts.length; q++) {
    const a = pts[q - 1], b = pts[q], c = pts[q + 1];
    const up1 = y[b] > y[a], up2 = y[c] > y[b];
    if (up1 === up2) continue;
    let best = b;
    for (let t = a + LEG_MIN; t <= c - LEG_MIN; t++) {
      if (up1 ? y[t] > y[best] : y[t] < y[best]) best = t;
    }
    pts[q] = best;
  }
  return pts;
}

// bars: [{t:YYYYMMDD, o,h,l,c,v}] 오름차순 일봉(종목), bench: [{t, c}] 오름차순 일봉(지수)
function analyze(bars, bench, opts) {
  opts = opts || {};
  const months = opts.months || MONTHS;
  bars = (bars || []).filter((b) => b && b.c > 0);
  const bs = (bench || []).filter((b) => b && b.c > 0);
  if (bars.length < 100 || bs.length < 100) return null;
  const end = bars[bars.length - 1];
  const target = monthsBack(end.t, months);
  let i0 = -1;
  for (let i = bars.length - 1; i >= 0; i--) if (bars[i].t <= target) { i0 = i; break; }
  if (i0 < 0) return null;   // 6개월 이력이 안 되면(최근 상장) 판정하지 않는다

  // 지수 종가 맞추기 — 그 날짜 이하의 마지막 지수 종가(휴장 차이는 이어 붙인다 → 로그 수익이 정확히 망원(telescoping)된다)
  const mc = new Array(bars.length).fill(null);
  for (let i = 0, j = 0; i < bars.length; i++) {
    while (j + 1 < bs.length && bs[j + 1].t <= bars[i].t) j++;
    if (bs[j].t <= bars[i].t) mc[i] = bs[j].c;
  }
  if (!(mc[i0] > 0)) return null;
  const benchLag = bs[bs.length - 1].t < end.t;   // 지수 자료가 종목보다 늦게 끝남(마지막 날 지수 수익은 0으로 들어간다)

  // β — 최근 1년(최대 250거래일) 일간 로그 수익 회귀
  const est = [];
  for (let i = Math.max(1, bars.length - 250); i < bars.length; i++) {
    if (mc[i] > 0 && mc[i - 1] > 0) est.push({ rs: Math.log(bars[i].c / bars[i - 1].c), rm: Math.log(mc[i] / mc[i - 1]) });
  }
  const fit = ols(est.map((x) => x.rs), est.map((x) => x.rm));
  const beta = fit ? clamp(fit.b, -0.5, 3) : 1;

  const W = bars.slice(i0), n = W.length - 1;
  const days = [];
  for (let k = 1; k <= n; k++) {
    const i = i0 + k, rs = Math.log(bars[i].c / bars[i - 1].c);
    const rm = mc[i] > 0 && mc[i - 1] > 0 ? Math.log(mc[i] / mc[i - 1]) : 0;
    days.push({ k, t: bars[i].t, rs, rm, ar: rs - beta * rm, v: bars[i].v || 0, o: bars[i].o, pc: bars[i - 1].c });
  }
  const base = W[0], last = W[n];
  const ret = last.c / base.c - 1;
  const mret = mc[bars.length - 1] / mc[i0] - 1;
  const sigD = sd(days.map((d) => d.rs)), sigAR = sd(days.map((d) => d.ar));
  const band = bandOf(sigD, n, 0.05, 0.10);
  const cls = clsOf(ret, band);
  const logTot = Math.log(1 + ret), logMkt = beta * Math.log(1 + mret), logSpec = logTot - logMkt;
  const relRaw = (1 + ret) / (1 + mret) - 1;
  const relBand = REL_BAND;
  const rel = relRaw >= relBand ? "강함" : relRaw <= -relBand ? "약함" : "비슷";

  // 고점·저점·최대 낙폭(기간 안)
  let hi = W[0], lo = W[0], peak = W[0], mdd = 0, mddFrom = null, mddTo = null;
  W.forEach((b) => {
    if (b.c > hi.c) hi = b;
    if (b.c < lo.c) lo = b;
    if (b.c > peak.c) peak = b;
    const dd = b.c / peak.c - 1;
    if (dd < mdd) { mdd = dd; mddFrom = peak.t; mddTo = b.t; }
  });

  // 핵심 날짜(종목 고유) — 초과수익이 큰 날, 같은 방향으로 이어진 날은 묶는다
  const volMed = median(days.map((d) => d.v));
  const thr = Math.max(2.2 * sigAR, 0.025), cont = Math.max(1.0 * sigAR, 0.01);
  const used = new Array(days.length).fill(false);
  const eps = [];
  days.map((d, idx) => ({ idx, a: Math.abs(d.ar) })).filter((x) => x.a >= thr).sort((a, b) => b.a - a.a).forEach((c) => {
    if (used[c.idx]) return;
    const sg = Math.sign(days[c.idx].ar);
    let s = c.idx, e = c.idx;
    while (e + 1 < days.length && e - s < 2 && !used[e + 1] && Math.sign(days[e + 1].ar) === sg && Math.abs(days[e + 1].ar) >= cont) e++;
    while (s - 1 >= 0 && e - s < 2 && !used[s - 1] && Math.sign(days[s - 1].ar) === sg && Math.abs(days[s - 1].ar) >= 1.5 * cont) s--;
    for (let q = s; q <= e; q++) used[q] = true;
    const seg = days.slice(s, e + 1);
    const sum = (k) => seg.reduce((t, d) => t + d[k], 0);
    const vmax = Math.max.apply(null, seg.map((d) => d.v));
    const d0 = days[s];
    eps.push({ si: s, ei: e, s: d0.t, e: days[e].t, n: e - s + 1, ar: sum("ar"), ret: Math.exp(sum("rs")) - 1, mret: Math.exp(sum("rm")) - 1,
      vr: volMed > 0 && vmax > 0 ? vmax / volMed : null, gap: d0.o > 0 && d0.pc > 0 && Math.abs(d0.o / d0.pc - 1) > 1e-6 ? d0.o / d0.pc - 1 : null });
  });
  eps.sort((a, b) => Math.abs(b.ar) - Math.abs(a.ar));
  const key = eps.slice(0, KEY_MAX);
  // 시장 급변일 — 종목이 크게 움직였는데 그 대부분이 시장 몫(β×지수)이었던 날(핵심 날짜와 겹치지 않게)
  const mThr = Math.max(2 * sigD, 0.03);
  const mktDays = days.map((d, idx) => ({ d, idx })).filter((x) => !used[x.idx] && Math.abs(x.d.rs) >= mThr &&
      Math.sign(x.d.rm) === Math.sign(x.d.rs) && Math.abs(beta * x.d.rm) >= 0.6 * Math.abs(x.d.rs))
    .sort((a, b) => Math.abs(b.d.rs) - Math.abs(a.d.rs)).slice(0, MKT_DAY_MAX)
    .map((x) => ({ si: x.idx, ei: x.idx, s: x.d.t, e: x.d.t, n: 1, ar: x.d.ar, ret: Math.exp(x.d.rs) - 1, mret: Math.exp(x.d.rm) - 1,
      vr: volMed > 0 && x.d.v > 0 ? x.d.v / volMed : null, gap: null, market: true }));

  // 종목 고유 움직임(로그)의 분해 — 큰 날(문턱을 넘은 모든 날, 급등·급락 따로) + 그 밖의 날들. 정확히 더해진다.
  const upS = eps.filter((e) => e.ar > 0), dnS = eps.filter((e) => e.ar < 0);
  const sumAr = (a) => a.reduce((t, e) => t + e.ar, 0);
  const att = { mkt: logMkt, up: sumAr(upS), upN: upS.reduce((t, e) => t + e.n, 0), down: sumAr(dnS), downN: dnS.reduce((t, e) => t + e.n, 0) };
  att.rest = logSpec - att.up - att.down;
  // 사건형 vs 꾸준한 흐름 — 종목 고유 움직임 중 큰 날들의 몫(고유 움직임이 4% 미만이면 따지지 않는다)
  const keyShare = Math.abs(logSpec) >= 0.04 ? (att.up + att.down) / logSpec : null;
  const character = keyShare == null ? null : keyShare >= 0.6 ? "사건" : keyShare <= 0.35 ? "흐름" : "혼합";

  // 거래량 — 오른 날에 몰린 거래 비중, 최근 20일 평균 / 기간 평균
  const vSum = days.reduce((t, d) => t + d.v, 0);
  const upVol = vSum > 0 ? days.filter((d) => d.rs > 0).reduce((t, d) => t + d.v, 0) / vSum : null;
  const vAvg = vSum / (days.length || 1), v20 = days.slice(-20).reduce((t, d) => t + d.v, 0) / Math.min(20, days.length || 1);
  const volTrend = vAvg > 0 ? v20 / vAvg : null;

  // 구간
  const y = W.map((b) => Math.log(b.c));
  const pts = breakpoints(y);
  let legs = [];
  for (let q = 0; q + 1 < pts.length; q++) legs.push({ si: pts[q], ei: pts[q + 1] });
  const legStat = (L) => {
    const len = L.ei - L.si, r = W[L.ei].c / W[L.si].c - 1;
    return Object.assign(L, { len, ret: r, cls: clsOf(r, bandOf(sigD, len, 0.04, 0.10)) });
  };
  legs = legs.map(legStat);
  // 같은 판정이 이어지면 합친다(합친 뒤 다시 판정 — 반복)
  for (let changed = true; changed;) {
    changed = false;
    for (let q = 0; q + 1 < legs.length; q++) {
      if (legs[q].cls === legs[q + 1].cls) { legs.splice(q, 2, legStat({ si: legs[q].si, ei: legs[q + 1].ei })); changed = true; break; }
    }
  }
  const dayIn = (L, e) => e.si + 1 > L.si && e.si + 1 <= L.ei;   // days[k] 는 W[k+1] 의 하루
  legs = legs.map((L) => {
    const seg = days.slice(L.si, L.ei);   // W[si]→W[ei] 사이의 하루하루
    const lr = seg.reduce((t, d) => t + d.rm, 0), la = seg.reduce((t, d) => t + d.ar, 0);
    const lv = seg.reduce((t, d) => t + d.v, 0) / (seg.length || 1);
    return { s: W[L.si].t, e: W[L.ei].t, si: L.si, ei: L.ei, len: L.len, cls: L.cls, ret: L.ret, mret: Math.exp(lr) - 1,
      spec: Math.exp(la) - 1, vol: vAvg > 0 ? lv / vAvg : null, keys: key.filter((e) => dayIn(L, e)).length };
  });

  return {
    from: ymd(base.t), to: ymd(last.t), n, benchLag,
    cls, ret: r4(ret), band: r4(band), sig6: r4(sigD * Math.sqrt(n)),
    mret: r4(mret), beta: r2(beta), betaN: est.length, mkt: r4(Math.exp(logMkt) - 1), spec: r4(Math.exp(logSpec) - 1),
    rel, relRaw: r4(relRaw), relBand: r4(relBand),
    hi: { d: ymd(hi.t), c: hi.c }, lo: { d: ymd(lo.t), c: lo.c }, fromHi: r4(last.c / hi.c - 1),
    mdd: mddFrom ? { v: r4(mdd), from: ymd(mddFrom), to: ymd(mddTo) } : null,
    att: { mkt: r4(att.mkt), up: r4(att.up), upN: att.upN, down: r4(att.down), downN: att.downN, rest: r4(att.rest), spec: r4(logSpec), tot: r4(logTot) },
    keyShare: r4(keyShare), character, upVol: r4(upVol), volTrend: r2(volTrend),
    legs: legs.map((L) => ({ s: ymd(L.s), e: ymd(L.e), si: L.si, ei: L.ei, len: L.len, cls: L.cls, ret: r4(L.ret), mret: r4(L.mret),
      spec: r4(L.spec), vol: r2(L.vol), keys: L.keys })),
    keys: key.map((e) => ({ s: ymd(e.s), e: ymd(e.e), si: e.si + 1, ei: e.ei + 1, n: e.n, ar: r4(e.ar), ret: r4(e.ret), mret: r4(e.mret), vr: r2(e.vr), gap: r4(e.gap) })),
    mktDays: mktDays.map((e) => ({ s: ymd(e.s), e: ymd(e.e), si: e.si + 1, ei: e.ei + 1, n: 1, ar: r4(e.ar), ret: r4(e.ret), mret: r4(e.mret), vr: r2(e.vr), market: true })),
    // 앱 차트용 — 기간 일봉 종가와 같은 날 지수 종가(si·ei 는 이 배열의 인덱스)
    series: { t: W.map((b) => b.t), c: W.map((b) => b.c), m: W.map((b, k) => r2(mc[i0 + k])) },
    // 내부용(파일에 쓰지 않는다) — 날짜별 종목·지수 로그 수익과 초과수익(W 인덱스 1..n)
    _days: days.map((d) => ({ t: d.t, rs: d.rs, rm: d.rm, ar: d.ar })),
  };
}

// AI 설명을 다시 쓸지 가르는 지문 — 판정·시장 대비·핵심 날짜 상위 3개(시작일)
function fingerprint(a) {
  if (!a) return "";
  return [a.cls, a.rel].concat((a.keys || []).slice(0, 3).map((k) => k.s).sort()).join("|");
}

module.exports = { MONTHS, analyze, breakpoints, fingerprint, monthsBack, ymd, bandOf, clsOf };
