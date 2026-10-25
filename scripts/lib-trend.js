// 현재 추세 분석 — 지금 이 종목이 상승·하락 중 어느 추세에 있는지, 그 추세가 언제 시작됐는지를 정하고
// 그 추세 구간을 숫자로 쪼갠다(토큰 0). update-trend.js 가 종목마다 일봉(최근 약 3년)과 지수 일봉으로 계산해
// data/trend/<ticker>.json 에 쓰고, 앱 종목 상세 '현재 추세'가 그린다.
//
// 고정 기간(예: 6개월)으로 자르지 않는 이유(2026-10-24 사용자 요청 '6개월이라는 시간에 갇히지 않고 가장 적절한 추세 판단'):
//   6개월 창은 '+61% 뒤 -40%'인 종목을 '보합 -4%'로 뭉개고, 3주 전 시작된 급락이나 2년째 이어진 상승을 같은 잣대로 자른다.
//   추세는 '의미 있는 되돌림이 나올 때까지 이어진다'로 정의하면 시작점이 종목마다 데이터로 정해진다.
//
//   1) 전환 — 지그재그: 마지막 고점(저점)에서 h 넘게 되돌리면 그 고점(저점)을 전환점으로 확정한다.
//      h = 그 종목 일간 변동성 × 10(약 100거래일 무작위 움직임의 1표준편차 — 몇 달짜리 추세를 가르는 크기), 10~35% 로 묶는다.
//      되돌림이 h 안이면 추세는 이어진 것으로 본다(상승 추세 속 조정·하락 추세 속 반등). 지금 추세 = 마지막 전환점 이후의 다리.
//      2026-10-25 까지는 '60거래일 새 고점(저점)이 없으면 멈춤 → 보합 또는 반대 추세'와 박스권 이후 재시작 규칙이 더 있었다.
//      한·미 955종목 7년 비교(scripts/research/trend-method, 사전 등록)에서 그 규칙을 뺀 쪽이 판정이 덜 뒤집혔고(헛신호 23→15%)
//      이후 움직임과도 조금 더 맞아(멈춘 듯한 다리도 이후엔 원래 방향으로 움직인 경우가 조금 더 많았다 — 약 53~54%) 뺐다.
//      대신 추세 방향으로 60거래일 넘게 새 고점(저점)이 없으면 그 사실만 quiet 로 남긴다 — 앱 'N개월째 새 고점 없음'(판정은 그대로).
//   2) 추세 구간 분해 — 시장 몫(1년 일간 β × 지수) vs 종목 고유(로그로 정확히 더해짐), 핵심 날짜(초과수익이 큰 날),
//      구간 안의 단계(로그 가격 꺾은선 1~4개 — 상승·하락·보합), 직전 추세(그 앞 다리).
// 예측이 아니다 — 지금까지 일어난 움직임의 정리다(어느 판정 방식도 이후 방향을 믿을 만하게 맞히지 못했다).
"use strict";

const LOOKBACK = 750;       // 약 3년 일봉
const H_K = 10, H_MIN = 0.10, H_MAX = 0.35;   // 전환 되돌림 = 일간 σ × 10, 10~35%
const KEY_MAX = 5;          // 핵심 날짜 최대 개수
const MKT_DAY_MAX = 2;      // 시장 급변일 최대 개수
const LEG_MAX = 4, LEG_MIN = 10, LEG_GAIN = 0.6;   // 단계: 최대 4개, 최소 10거래일, 오차가 60% 이하로 줄어야 하나 더
const REL_BAND = 0.05;      // 시장 대비 강함·약함 — 지수와의 비율 차 5%
const QUIET = 60;           // 추세 방향으로 새 고점(저점) 없이 60거래일(약 3개월) → 'N개월째 새 고점 없음' 표시(사실 — 판정은 바꾸지 않는다)

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
// 단계 판정 띠 — 단계 길이의 통상 변동폭(σ_일·√n)의 3분의 1, lo~hi 로 묶음
const bandOf = (sigD, n, lo, hi) => clamp(sigD * Math.sqrt(Math.max(1, n)) / 3, lo, hi);
const clsOf = (ret, band) => (ret >= band ? "상승" : ret <= -band ? "하락" : "보합");

// ── 1) 지그재그 — 로그 가격 y 에서 H(로그) 넘게 되돌린 고점·저점. → { piv:[{i,k:'H'|'L'}], dir: 지금 다리 방향(1·-1·0), ext: 지금 다리의 극점 }
function zigzag(y, H) {
  const n = y.length, piv = [];
  let hiI = 0, loI = 0, t = 1, dir = 0, ext = 0;
  for (; t < n; t++) {
    if (y[t] > y[hiI]) hiI = t;
    if (y[t] < y[loI]) loI = t;
    if (y[hiI] - y[loI] >= H) {
      if (hiI < loI) { piv.push({ i: hiI, k: "H" }); dir = -1; ext = loI; }
      else { piv.push({ i: loI, k: "L" }); dir = 1; ext = hiI; }
      break;
    }
  }
  if (!dir) return { piv, dir: 0, ext: null };
  for (t = t + 1; t < n; t++) {
    if (dir > 0) {
      if (y[t] > y[ext]) ext = t;
      else if (y[ext] - y[t] >= H) { piv.push({ i: ext, k: "H" }); dir = -1; ext = t; }
    } else {
      if (y[t] < y[ext]) ext = t;
      else if (y[t] - y[ext] >= H) { piv.push({ i: ext, k: "L" }); dir = 1; ext = t; }
    }
  }
  return { piv, dir, ext };
}

// ── 2) 지금 추세 — 지그재그의 마지막 다리. 시작 = 마지막 전환점, 직전 추세 = 그 앞 다리 ──
//   → { cls, s(시작 인덱스), kind(시작점 종류: low 저점부터 · high 고점부터 · window 창 시작부터), prev:{cls,s,e,kind}|null }
const WORD = (d) => (d > 0 ? "상승" : "하락");
function regime(y, H) {
  const z = zigzag(y, H);
  if (!z.dir) return { cls: "보합", s: 0, kind: "window", prev: null };   // 창 전체(약 3년)가 H 안 — 기간 내내 박스권
  const P = z.piv[z.piv.length - 1];
  const prev = z.piv.length >= 2 ? { cls: WORD(-z.dir), s: z.piv[z.piv.length - 2].i, e: P.i, kind: z.dir > 0 ? "high" : "low" }
    : { cls: WORD(-z.dir), s: 0, e: P.i, kind: "window" };
  return { cls: WORD(z.dir), s: P.i, kind: z.dir > 0 ? "low" : "high", prev };
}

// ── 3) 로그 가격 꺾은선 근사 — 구간 끝점은 실제 종가, 오차 제곱합 최소. → 끝점 인덱스 배열 ──
function breakpoints(y) {
  const N = y.length;
  if (N < LEG_MIN * 2 + 1) return [0, N - 1];
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
  // 꺾이는 점을 실제 고점·저점으로 옮긴다(직선 근사의 끝점은 고점 며칠 앞뒤에 잡히곤 한다)
  for (let q = 1; q + 1 < pts.length; q++) {
    const a = pts[q - 1], b = pts[q], c = pts[q + 1];
    const up1 = y[b] > y[a], up2 = y[c] > y[b];
    if (up1 === up2) continue;
    let bst = b;
    for (let t = a + LEG_MIN; t <= c - LEG_MIN; t++) { if (up1 ? y[t] > y[bst] : y[t] < y[bst]) bst = t; }
    pts[q] = bst;
  }
  return pts;
}

// 로그 가격 yw(구간 시작 = 0)의 단계 — 꺾은선 구간을 길이에 맞는 띠로 상승·하락·보합 판정하고 같은 판정이 이어지면 합친다
function phases(yw, sigD) {
  const pts = breakpoints(yw);
  let legs = [];
  for (let q = 0; q + 1 < pts.length; q++) legs.push({ si: pts[q], ei: pts[q + 1] });
  const stat = (L) => {
    const ln = L.ei - L.si, r = Math.exp(yw[L.ei] - yw[L.si]) - 1;
    return Object.assign(L, { len: ln, ret: r, cls: clsOf(r, bandOf(sigD, ln, 0.04, 0.10)) });
  };
  legs = legs.map(stat);
  for (let changed = true; changed;) {
    changed = false;
    for (let q = 0; q + 1 < legs.length; q++) {
      if (legs[q].cls === legs[q + 1].cls) { legs.splice(q, 2, stat({ si: legs[q].si, ei: legs[q + 1].ei })); changed = true; break; }
    }
  }
  return legs;
}

// bars: [{t:YYYYMMDD, o,h,l,c,v}] 오름차순 일봉(종목, 길수록 좋다 — 최근 LOOKBACK 개를 쓴다), bench: [{t, c}] 오름차순 일봉(지수)
function analyze(bars, bench, opts) {
  opts = opts || {};
  bars = (bars || []).filter((b) => b && b.c > 0);
  if (bars.length > LOOKBACK + 1) bars = bars.slice(bars.length - LOOKBACK - 1);
  const bs = (bench || []).filter((b) => b && b.c > 0);
  if (bars.length < 60 || bs.length < 60) return null;
  const n = bars.length, last = n - 1;
  // 지수 종가 맞추기 — 그 날짜 이하의 마지막 지수 종가
  const mc = new Array(n).fill(null);
  for (let i = 0, j = 0; i < n; i++) {
    while (j + 1 < bs.length && bs[j + 1].t <= bars[i].t) j++;
    if (bs[j].t <= bars[i].t) mc[i] = bs[j].c;
  }
  const benchLag = bs[bs.length - 1].t < bars[last].t;
  const y = bars.map((b) => Math.log(b.c));
  const lrAll = [];
  for (let i = 1; i < n; i++) lrAll.push(y[i] - y[i - 1]);
  const sigD = sd(lrAll.slice(-500));
  const h = clamp(H_K * sigD, H_MIN, H_MAX), H = Math.log(1 + h);
  const rg = regime(y, H);
  const s = rg.s, len = last - s;
  if (len < 1) return null;

  // β — 최근 1년(추세가 더 길면 그 길이, 최대 500거래일) 일간 로그 수익 회귀
  const est = [];
  for (let i = Math.max(1, n - Math.min(500, Math.max(250, len))); i < n; i++) {
    if (mc[i] > 0 && mc[i - 1] > 0) est.push({ rs: y[i] - y[i - 1], rm: Math.log(mc[i] / mc[i - 1]) });
  }
  const fit = ols(est.map((x) => x.rs), est.map((x) => x.rm));
  // 음수 β 는 0 으로 — 시장과 상관이 거의 없는 종목(유틸리티 등)에서 회귀가 음수로 흔들리면 '지수 +14% → 시장만 따랐다면 -4%' 같은
  // 읽기 어려운 문장이 된다. 0 이면 '시장 몫 없음, 전부 종목 고유'로 읽힌다.
  const beta = fit ? clamp(fit.b, 0, 3) : 1;

  // 추세 구간의 하루하루(k = 1..len → bars[s+k])
  const days = [];
  for (let k = 1; k <= len; k++) {
    const i = s + k, rs = y[i] - y[i - 1];
    const rm = mc[i] > 0 && mc[i - 1] > 0 ? Math.log(mc[i] / mc[i - 1]) : 0;
    days.push({ k, t: bars[i].t, rs, rm, ar: rs - beta * rm, v: bars[i].v || 0, o: bars[i].o, pc: bars[i - 1].c });
  }
  // 초과수익 변동성 — 짧은 추세에서도 안정되게 최근 250일(추세가 더 길면 그 구간)으로 잰다
  const arRef = [];
  for (let i = Math.max(1, n - Math.max(250, len)); i < n; i++) {
    const rm = mc[i] > 0 && mc[i - 1] > 0 ? Math.log(mc[i] / mc[i - 1]) : 0;
    arRef.push(y[i] - y[i - 1] - beta * rm);
  }
  const sigAR = sd(arRef);
  const base = bars[s], now = bars[last];
  const ret = now.c / base.c - 1;
  const mret = mc[s] > 0 && mc[last] > 0 ? mc[last] / mc[s] - 1 : 0;
  const logTot = Math.log(1 + ret), logMkt = beta * Math.log(1 + mret), logSpec = logTot - logMkt;
  const relRaw = (1 + ret) / (1 + mret) - 1;
  const rel = relRaw >= REL_BAND ? "강함" : relRaw <= -REL_BAND ? "약함" : "비슷";

  // 추세 구간의 고점·저점·최대 낙폭
  let hi = s, lo = s, peak = s, mdd = 0, mddFrom = null, mddTo = null;
  for (let i = s; i <= last; i++) {
    if (bars[i].c > bars[hi].c) hi = i;
    if (bars[i].c < bars[lo].c) lo = i;
    if (bars[i].c > bars[peak].c) peak = i;
    const dd = bars[i].c / bars[peak].c - 1;
    if (dd < mdd) { mdd = dd; mddFrom = bars[peak].t; mddTo = bars[i].t; }
  }
  // 추세 방향으로 새 극점이 없는 기간(2026-10-25 사용자 요청 '보합 대신 N개월째 새 고점 없음 표시') — 마지막 극점 날짜와 그 뒤 거래일 수
  const ext = rg.cls === "상승" ? hi : rg.cls === "하락" ? lo : -1;
  const quiet = ext >= 0 && last - ext >= QUIET ? { n: last - ext, d: ymd(bars[ext].t) } : null;

  // 핵심 날짜(종목 고유) — 초과수익이 큰 날, 같은 방향으로 이어진 날은 최대 3일로 묶는다
  const volMed = median(days.map((d) => d.v));
  const thr = Math.max(2.2 * sigAR, 0.025), cont = Math.max(1.0 * sigAR, 0.01);
  const used = new Array(days.length).fill(false);
  const eps = [];
  days.map((d, idx) => ({ idx, a: Math.abs(d.ar) })).filter((x) => x.a >= thr).sort((a, b) => b.a - a.a).forEach((c) => {
    if (used[c.idx]) return;
    const sg = Math.sign(days[c.idx].ar);
    let a = c.idx, e = c.idx;
    while (e + 1 < days.length && e - a < 2 && !used[e + 1] && Math.sign(days[e + 1].ar) === sg && Math.abs(days[e + 1].ar) >= cont) e++;
    while (a - 1 >= 0 && e - a < 2 && !used[a - 1] && Math.sign(days[a - 1].ar) === sg && Math.abs(days[a - 1].ar) >= 1.5 * cont) a--;
    for (let q = a; q <= e; q++) used[q] = true;
    const seg = days.slice(a, e + 1);
    const sum = (k) => seg.reduce((t, d) => t + d[k], 0);
    const vmax = Math.max.apply(null, seg.map((d) => d.v));
    const d0 = days[a];
    eps.push({ a, e, s: d0.t, eT: days[e].t, n: e - a + 1, ar: sum("ar"), ret: Math.exp(sum("rs")) - 1, mret: Math.exp(sum("rm")) - 1,
      vr: volMed > 0 && vmax > 0 ? vmax / volMed : null, gap: d0.o > 0 && d0.pc > 0 && Math.abs(d0.o / d0.pc - 1) > 1e-6 ? d0.o / d0.pc - 1 : null });
  });
  eps.sort((a, b) => Math.abs(b.ar) - Math.abs(a.ar));
  const key = eps.slice(0, KEY_MAX);
  // 시장 급변일 — 종목이 크게 움직였는데 그 대부분이 시장 몫이었던 날(핵심 날짜와 겹치지 않게)
  const mThr = Math.max(2 * sigD, 0.03);
  const mktDays = days.map((d, idx) => ({ d, idx })).filter((x) => !used[x.idx] && Math.abs(x.d.rs) >= mThr &&
      Math.sign(x.d.rm) === Math.sign(x.d.rs) && Math.abs(beta * x.d.rm) >= 0.6 * Math.abs(x.d.rs))
    .sort((a, b) => Math.abs(b.d.rs) - Math.abs(a.d.rs)).slice(0, MKT_DAY_MAX)
    .map((x) => ({ a: x.idx, e: x.idx, s: x.d.t, eT: x.d.t, n: 1, ar: x.d.ar, ret: Math.exp(x.d.rs) - 1, mret: Math.exp(x.d.rm) - 1,
      vr: volMed > 0 && x.d.v > 0 ? x.d.v / volMed : null, gap: null }));

  // 종목 고유 움직임(로그)의 분해 — 큰 날(급등·급락 따로) + 그 밖의 날들. 정확히 더해진다.
  const upS = eps.filter((e) => e.ar > 0), dnS = eps.filter((e) => e.ar < 0);
  const sumAr = (a) => a.reduce((t, e) => t + e.ar, 0);
  const att = { mkt: logMkt, up: sumAr(upS), upN: upS.reduce((t, e) => t + e.n, 0), down: sumAr(dnS), downN: dnS.reduce((t, e) => t + e.n, 0) };
  att.rest = logSpec - att.up - att.down;
  const keyShare = Math.abs(logSpec) >= 0.04 ? (att.up + att.down) / logSpec : null;
  const character = keyShare == null ? null : keyShare >= 0.6 ? "사건" : keyShare <= 0.35 ? "흐름" : "혼합";

  // 거래량 — 오른 날에 몰린 거래 비중, 최근 20일 평균 / 추세 구간 평균
  const vSum = days.reduce((t, d) => t + d.v, 0);
  const upVol = vSum > 0 ? days.filter((d) => d.rs > 0).reduce((t, d) => t + d.v, 0) / vSum : null;
  const vAvg = vSum / (days.length || 1), v20 = days.slice(-20).reduce((t, d) => t + d.v, 0) / Math.min(20, days.length || 1);
  const volTrend = vAvg > 0 && days.length >= 40 ? v20 / vAvg : null;

  // 추세 안의 단계(꺾은선) — 같은 판정이 이어지면 합친다
  let legs = phases(y.slice(s), sigD);
  const dayIn = (L, e) => e.a + 1 > L.si && e.a + 1 <= L.ei;   // days[k] 는 구간 기준 k+1 번째 날
  legs = legs.map((L) => {
    const seg = days.slice(L.si, L.ei);
    const lr = seg.reduce((t, d) => t + d.rm, 0), la = seg.reduce((t, d) => t + d.ar, 0);
    const lv = seg.reduce((t, d) => t + d.v, 0) / (seg.length || 1);
    return { s: ymd(bars[s + L.si].t), e: ymd(bars[s + L.ei].t), si: L.si, ei: L.ei, len: L.len, cls: L.cls, ret: r4(L.ret), mret: r4(Math.exp(lr) - 1),
      spec: r4(Math.exp(la) - 1), vol: vAvg > 0 ? r2(lv / vAvg) : null, keys: key.filter((e) => dayIn(L, e)).length };
  });

  // 직전 추세(맥락)
  const pv = rg.prev && rg.prev.e > rg.prev.s ? { cls: rg.prev.cls, from: ymd(bars[rg.prev.s].t), to: ymd(bars[rg.prev.e].t), n: rg.prev.e - rg.prev.s,
    ret: r4(bars[rg.prev.e].c / bars[rg.prev.s].c - 1), kind: rg.prev.kind, cut: rg.prev.s === 0 } : null;

  // 앱 차트 — 추세 시작 앞에 맥락 구간(추세 길이의 절반, 10~250거래일)을 붙인다. lead = 추세 시작의 배열 위치
  const lead = Math.min(s, Math.max(10, Math.min(250, Math.round(len * 0.5))));
  const c0 = s - lead;
  // 보합(창 전체가 h 안)이면 박스 범위(고·저)와 지금 위치
  const box = rg.cls === "보합" ? { hi: { d: ymd(bars[hi].t), c: bars[hi].c }, lo: { d: ymd(bars[lo].t), c: bars[lo].c },
    width: r4(bars[hi].c / bars[lo].c - 1), pos: r2(bars[hi].c > bars[lo].c ? (now.c - bars[lo].c) / (bars[hi].c - bars[lo].c) : 0.5) } : null;
  const toKey = (e) => ({ s: ymd(e.s), e: ymd(e.eT), si: lead + e.a + 1, ei: lead + e.e + 1, n: e.n, ar: r4(e.ar), ret: r4(e.ret), mret: r4(e.mret), vr: r2(e.vr), gap: r4(e.gap) });
  return {
    cls: rg.cls, kind: rg.kind, from: ymd(base.t), to: ymd(now.t), n: len, cut: s === 0, benchLag,
    h: r4(h), sigD: r4(sigD),
    ret: r4(ret), mret: r4(mret), beta: r2(beta), betaN: est.length, mkt: r4(Math.exp(logMkt) - 1), spec: r4(Math.exp(logSpec) - 1),
    rel, relRaw: r4(relRaw), relBand: REL_BAND,
    hi: { d: ymd(bars[hi].t), c: bars[hi].c }, lo: { d: ymd(bars[lo].t), c: bars[lo].c },
    fromHi: r4(now.c / bars[hi].c - 1), fromLo: r4(now.c / bars[lo].c - 1),
    mdd: mddFrom ? { v: r4(mdd), from: ymd(mddFrom), to: ymd(mddTo) } : null, quiet,
    box, prev: pv,
    att: { mkt: r4(att.mkt), up: r4(att.up), upN: att.upN, down: r4(att.down), downN: att.downN, rest: r4(att.rest), spec: r4(logSpec), tot: r4(logTot) },
    keyShare: r4(keyShare), character, upVol: r4(upVol), volTrend: r2(volTrend),
    legs: legs.map((L) => Object.assign({}, L, { si: lead + L.si, ei: lead + L.ei })),
    keys: key.map(toKey),
    mktDays: mktDays.map((e) => Object.assign(toKey(e), { market: true })),
    // 앱 차트용 — 맥락 구간 + 추세 구간의 종가와 같은 날 지수 종가(lead = 추세 시작 위치, si·ei 는 이 배열의 인덱스)
    series: { lead, t: bars.slice(c0).map((b) => b.t), c: bars.slice(c0).map((b) => b.c), m: bars.slice(c0).map((b, k) => r2(mc[c0 + k])) },
    // 내부용(파일에 쓰지 않는다) — 추세 구간 날짜별 로그 수익과 초과수익
    _days: days.map((d) => ({ t: d.t, rs: d.rs, rm: d.rm, ar: d.ar })),
  };
}

// 설명(AI·루틴)을 다시 쓸지 가르는 지문 — 추세 판정·시작일·핵심 날짜 상위 3개(시작일)
function fingerprint(a) {
  if (!a) return "";
  return [a.cls, a.from].concat((a.keys || []).slice(0, 3).map((k) => k.s).sort()).join("|");
}

module.exports = { LOOKBACK, H_K, H_MIN, H_MAX, QUIET, analyze, regime, zigzag, breakpoints, phases, fingerprint, ymd, bandOf, clsOf };
