// 공유 기술적 분석 라이브러리 (다중 지표 엔진) — 지수(update-indices.js)·종목(update-stock-ta.js) 공용.
// Yahoo 일봉 rows([{t,close,high,low,vol}])에서 5단계 신호(적극매수~적극매도)를 결정론적으로
// 산출한다(LLM 토큰 0). 기본 엔진 flow 는 '힘과 흐름'을 읽는 세 축에 가중을 몰아준다:
//   · 이동평균선 30% — 위치 / 정배열 순서 / 기울기
//   · 일목균형표 30% — 구름 대비 위치 · 전환/기준 · 후행스팬 · 구름 방향
//   · 매물대     25% — 머리 위 매물 비중 · 현재가 주변 국소 지지/저항
//   · 오실레이터 15% — RSI·스토캐스틱·MACD·ADX (보조)
// 시계열은 단기=일봉 · 중기=주봉 · 장기=월봉 3기간으로 분리해 각각 계산한다.
// 비교용으로 구 엔진(legacy 19표 동등가중, block 3블록 균형)도 나란히 계산해 반환한다.

// ── 기본 통계/이동평균 ──
function sma(a, n) { if (a.length < n) return null; let s = 0; for (let i = a.length - n; i < a.length; i++) s += a[i]; return s / n; }
function emaSeries(a, n) {
  if (a.length < n) return null;
  const k = 2 / (n + 1), out = new Array(a.length).fill(null);
  let prev = 0; for (let i = 0; i < n; i++) prev += a[i]; prev /= n; out[n - 1] = prev;   // SMA 시드
  for (let i = n; i < a.length; i++) { prev = a[i] * k + prev * (1 - k); out[i] = prev; }
  return out;
}
function ema(a, n) { const s = emaSeries(a, n); return s ? s[s.length - 1] : null; }

// ── RSI(14) Wilder ──
function rsi(c, period) {
  period = period || 14;
  if (c.length < period + 1) return null;
  let g = 0, l = 0;
  for (let i = 1; i <= period; i++) { const d = c[i] - c[i - 1]; if (d >= 0) g += d; else l -= d; }
  let ag = g / period, al = l / period;
  for (let i = period + 1; i < c.length; i++) {
    const d = c[i] - c[i - 1];
    ag = (ag * (period - 1) + (d > 0 ? d : 0)) / period;
    al = (al * (period - 1) + (d < 0 ? -d : 0)) / period;
  }
  if (ag === 0 && al === 0) return 50;   // 완전 보합(거래정지 등): RS=0/0 은 미정의 — 중립 처리
  if (al === 0) return 100;
  return 100 - 100 / (1 + ag / al);
}
function rsiState(r) {
  if (r == null) return "";
  if (r >= 70) return "과매수"; if (r >= 60) return "과매수 근접";
  if (r <= 30) return "과매도"; if (r <= 40) return "과매도 근접";
  return "중립";
}

// ── MACD(12,26,9) ──
function macd(c, f, s, sig) {
  f = f || 12; s = s || 26; sig = sig || 9;
  if (c.length < s + sig) return null;
  const ef = emaSeries(c, f), es = emaSeries(c, s);
  if (!ef || !es) return null;
  const line = []; for (let i = 0; i < c.length; i++) { if (ef[i] != null && es[i] != null) line.push(ef[i] - es[i]); }
  const sigS = emaSeries(line, sig); if (!sigS) return null;
  const macdLine = line[line.length - 1], signal = sigS[sigS.length - 1];
  return { macd: macdLine, signal: signal, hist: macdLine - signal };
}

// ── 스토캐스틱 %K(14,3,3), %D ──
function stochastic(h, l, c, kP, kS, dS) {
  kP = kP || 14; kS = kS || 3; dS = dS || 3;
  if (c.length < kP + kS + dS) return null;
  const rawK = [];
  for (let i = kP - 1; i < c.length; i++) {
    let hh = -Infinity, ll = Infinity;
    for (let j = i - kP + 1; j <= i; j++) { if (h[j] > hh) hh = h[j]; if (l[j] < ll) ll = l[j]; }
    rawK.push(hh === ll ? 50 : 100 * (c[i] - ll) / (hh - ll));
  }
  const smaArr = (arr, n) => { const o = []; for (let i = n - 1; i < arr.length; i++) { let s = 0; for (let j = i - n + 1; j <= i; j++) s += arr[j]; o.push(s / n); } return o; };
  const kSm = smaArr(rawK, kS), dSm = smaArr(kSm, dS);
  if (!kSm.length || !dSm.length) return null;
  return { k: kSm[kSm.length - 1], d: dSm[dSm.length - 1] };
}

// ── CCI(20) ──
function cci(h, l, c, n) {
  n = n || 20; if (c.length < n) return null;
  const tp = []; for (let i = 0; i < c.length; i++) tp.push((h[i] + l[i] + c[i]) / 3);
  const last = tp.slice(-n);
  const m = last.reduce((a, b) => a + b, 0) / n;
  let md = 0; for (const x of last) md += Math.abs(x - m); md /= n;
  if (md === 0) return 0;
  return (tp[tp.length - 1] - m) / (0.015 * md);
}

// ── Williams %R(14) ──
function williamsR(h, l, c, n) {
  n = n || 14; if (c.length < n) return null;
  let hh = -Infinity, ll = Infinity;
  for (let i = c.length - n; i < c.length; i++) { if (h[i] > hh) hh = h[i]; if (l[i] < ll) ll = l[i]; }
  if (hh === ll) return -50;
  return -100 * (hh - c[c.length - 1]) / (hh - ll);
}

// ── ADX(14) + DI (Wilder) ──
function adx(h, l, c, n) {
  n = n || 14; if (c.length < 2 * n + 1) return null;
  const tr = [], pDM = [], mDM = [];
  for (let i = 1; i < c.length; i++) {
    const up = h[i] - h[i - 1], dn = l[i - 1] - l[i];
    pDM.push(up > dn && up > 0 ? up : 0);
    mDM.push(dn > up && dn > 0 ? dn : 0);
    tr.push(Math.max(h[i] - l[i], Math.abs(h[i] - c[i - 1]), Math.abs(l[i] - c[i - 1])));
  }
  // Wilder 평활
  const rma = (arr) => { let v = 0; for (let i = 0; i < n; i++) v += arr[i]; const out = [v]; for (let i = n; i < arr.length; i++) { v = v - v / n + arr[i]; out.push(v); } return out; };
  const trS = rma(tr), pS = rma(pDM), mS = rma(mDM);
  const dx = [];
  for (let i = 0; i < trS.length; i++) {
    // TR 합이 0(전 구간 완전 보합·데이터 이상)이면 0 으로 나눠 NaN/Infinity 가 전파되므로 0 처리
    const pdi = trS[i] ? 100 * pS[i] / trS[i] : 0, mdi = trS[i] ? 100 * mS[i] / trS[i] : 0;
    const sum = pdi + mdi;
    dx.push(sum === 0 ? 0 : 100 * Math.abs(pdi - mdi) / sum);
  }
  if (dx.length < n) return null;
  let adxV = 0; for (let i = 0; i < n; i++) adxV += dx[i]; adxV /= n;
  for (let i = n; i < dx.length; i++) adxV = (adxV * (n - 1) + dx[i]) / n;
  const li = trS.length - 1;
  return { adx: adxV, pdi: trS[li] ? 100 * pS[li] / trS[li] : 0, mdi: trS[li] ? 100 * mS[li] / trS[li] : 0 };
}

function momentum(c, n) { n = n || 10; return c.length > n ? c[c.length - 1] - c[c.length - 1 - n] : null; }
function chgN(c, n) { const p = c[Math.max(0, c.length - 1 - n)]; return p ? (c[c.length - 1] - p) / p * 100 : null; }

function fmtNum(x, dp) {
  if (x == null || !isFinite(x)) return "–";
  return Number(x).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

// 일봉 → 주봉 리샘플 (월요일 시작 주 버킷: 마지막 종가, 최고/최저)
// 유닉스 epoch(1970-01-01)는 목요일이라 단순 t/604800 버킷은 주가 목~수로 잘린다.
// +3일(259200초)을 보정해 경계를 월요일 00:00 UTC 에 맞춘다(실제 거래주 단위와 일치).
function toWeekly(rows) {
  const map = {}, order = [];
  rows.forEach((r) => {
    const k = Math.floor((r.t + 259200) / 604800);
    if (!map[k]) { map[k] = { t: r.t, close: r.close, high: r.high, low: r.low, vol: r.vol || 0 }; order.push(k); }
    else { const w = map[k]; w.high = Math.max(w.high, r.high); w.low = Math.min(w.low, r.low); w.close = r.close; w.t = r.t; w.vol += r.vol || 0; }
  });
  return order.map((k) => map[k]);
}

// 월봉 집계 — 달력 월(UTC) 단위로 묶는다. 장기(6~12M+) 판단의 기준 시계열.
function toMonthly(rows) {
  const map = {}, order = [];
  rows.forEach((r) => {
    const d = new Date(r.t * 1000);
    const k = d.getUTCFullYear() * 12 + d.getUTCMonth();
    if (!map[k]) { map[k] = { t: r.t, close: r.close, high: r.high, low: r.low, vol: r.vol || 0 }; order.push(k); }
    else { const w = map[k]; w.high = Math.max(w.high, r.high); w.low = Math.min(w.low, r.low); w.close = r.close; w.t = r.t; w.vol += r.vol || 0; }
  });
  return order.map((k) => map[k]);
}

// ── 일목균형표(9,26,52) ──────────────────────────────────────────────────
// 전환선=최근 9봉 중간값, 기준선=26봉 중간값, 선행스팬A=(전환+기준)/2, 선행스팬B=52봉 중간값,
// 후행스팬=현재 종가. ★스팬 2종은 26봉 '앞으로' 그려지므로, **오늘 위치의 구름**은 26봉 전
// 시점에서 산출된 값이다 — 인덱스를 반드시 26 되짚어야 한다(오늘 값으로 비교하면 구름이
// 26봉 미래로 밀려 있어 위치 판정이 통째로 틀린다). 마찬가지로 후행스팬은 26봉 전 가격과 비교한다.
// 필요 봉수 = 52 + 26 = 78. 그보다 짧으면 null(호출부가 가중에서 제외).
function midPrice(h, l, i, n) {
  if (i < 0 || i - n + 1 < 0) return null;
  let hh = -Infinity, ll = Infinity;
  for (let j = i - n + 1; j <= i; j++) { if (h[j] > hh) hh = h[j]; if (l[j] < ll) ll = l[j]; }
  return (hh + ll) / 2;
}
function ichimoku(h, l, c, conv, base, spanBP, lag) {
  conv = conv || 9; base = base || 26; spanBP = spanBP || 52; lag = lag || 26;
  const n = c.length;
  if (n < spanBP + lag) return null;
  const i = n - 1, j = i - lag, price = c[i];
  const tenkan = midPrice(h, l, i, conv), kijun = midPrice(h, l, i, base);
  const tkPast = midPrice(h, l, j, conv), kjPast = midPrice(h, l, j, base);
  const spanA = (tkPast != null && kjPast != null) ? (tkPast + kjPast) / 2 : null;
  const spanB = midPrice(h, l, j, spanBP);
  if (spanA == null || spanB == null || tenkan == null || kijun == null) return null;
  const top = Math.max(spanA, spanB), bot = Math.min(spanA, spanB);

  // ① 구름 대비 위치 — 일목의 핵심. 구름 '안'은 방향 미정이라 진짜 중립(0)이다.
  const posCloud = price > top ? 1 : price < bot ? -1 : 0;
  // ② 전환/기준 교차 — 딱 붙어 있으면(가격의 0.3% 미만) 교차 직전이라 기권시킨다.
  const tkGap = price ? (tenkan - kijun) / price * 100 : 0;
  const tkCross = Math.abs(tkGap) < 0.3 ? 0 : (tkGap > 0 ? 1 : -1);
  // ③ 후행스팬 — 현재 종가가 26봉 전 종가를 넘었는가(과거 매물을 이겼는가).
  const ref = c[i - lag];
  const chGap = ref ? (price - ref) / ref * 100 : 0;
  const chikou = Math.abs(chGap) < 0.3 ? 0 : (chGap > 0 ? 1 : -1);
  // ④ 구름 방향(양운/음운) — 앞으로의 지지·저항 두께가 두꺼워지는 쪽.
  const cloudDir = spanA > spanB ? 1 : spanA < spanB ? -1 : 0;

  const score = 0.40 * posCloud + 0.25 * tkCross + 0.20 * chikou + 0.15 * cloudDir;
  const where = posCloud > 0 ? "구름 위" : posCloud < 0 ? "구름 아래" : "구름 안";
  return { tenkan, kijun, spanA, spanB, cloudTop: top, cloudBot: bot,
    posCloud, tkCross, chikou, cloudDir, score, where,
    thickPct: price ? (top - bot) / price * 100 : null };
}

// ── 매물대(Volume Profile) ───────────────────────────────────────────────
// 최근 lookback 봉의 거래량을 가격 구간(bin)에 배분해 '어느 가격대에 물량이 쌓였나'를 본다.
// 봉마다 거래량을 저가~고가에 균등 배분한다(종가 한 점에 몰아넣는 것보다 실제 체결 분포에 가깝다).
// 반환 score = 0.6·(머리 위 매물 부담) + 0.4·(현재가 주변 국소 지지/저항).
//   · 머리 위 매물: 현재가보다 위에 쌓인 물량 비중 aboveRatio. 0=신고가권(저항 없음) → +1,
//     1=전 물량이 위(전부 손실 구간, 반등마다 매물) → -1. 흐름을 막는 '저항의 총량'.
//   · 국소 밀도: 현재가 ±5% 안에서 아래쪽 물량(지지)과 위쪽 물량(저항)의 비.
//     두 축은 척도가 달라(전역 누적 vs 국소) 중복 계산이 아니다.
// 거래량이 없으면(지수 등) null — 호출부가 가중에서 제외한다.
function volumeProfile(bars, lookback, bins) {
  lookback = lookback || 250; bins = bins || 24;
  const w = bars.slice(-lookback).filter((b) => b && b.vol != null && isFinite(b.vol) && b.vol > 0);
  if (w.length < 40) return null;
  let lo = Infinity, hi = -Infinity;
  w.forEach((b) => { if (b.low < lo) lo = b.low; if (b.high > hi) hi = b.high; });
  if (!(hi > lo)) return null;
  const step = (hi - lo) / bins, vol = new Array(bins).fill(0);
  w.forEach((b) => {
    const a = Math.max(0, Math.min(bins - 1, Math.floor((b.low - lo) / step)));
    const z = Math.max(0, Math.min(bins - 1, Math.floor((b.high - lo) / step)));
    const share = b.vol / (z - a + 1);
    for (let k = a; k <= z; k++) vol[k] += share;
  });
  const total = vol.reduce((a, b) => a + b, 0);
  if (!total) return null;
  let pocIdx = 0; for (let k = 1; k < bins; k++) if (vol[k] > vol[pocIdx]) pocIdx = k;
  const poc = lo + step * (pocIdx + 0.5);
  const price = bars[bars.length - 1].close;

  let above = 0;
  for (let k = 0; k < bins; k++) {
    const bLo = lo + step * k, bHi = bLo + step;
    if (bLo >= price) above += vol[k];
    else if (bHi > price) above += vol[k] * (bHi - price) / step;   // 현재가가 걸친 구간은 비례 배분
  }
  const aboveRatio = above / total;

  const band = price * 0.05;
  let dBelow = 0, dAbove = 0;
  for (let k = 0; k < bins; k++) {
    const mid = lo + step * (k + 0.5);
    if (mid < price && mid >= price - band) dBelow += vol[k];
    if (mid > price && mid <= price + band) dAbove += vol[k];
  }
  const local = (dBelow + dAbove) > 0 ? (dBelow - dAbove) / (dBelow + dAbove) : 0;
  const score = 0.6 * (1 - 2 * aboveRatio) + 0.4 * local;
  return { poc, aboveRatio, local, score, lo, hi, pocIdx, bins };
}

// 현재가 기준 가장 가까운 아래/위 레벨(이평선·최근 저·고점 후보 중)
function levels(level, cands, lo, hi) {
  const below = cands.filter((v) => v != null && v < level);
  const above = cands.filter((v) => v != null && v > level);
  return { support: below.length ? Math.max.apply(null, below) : lo, resistance: above.length ? Math.min.apply(null, above) : hi };
}

// 점수(-1..+1) → 5단계 등급. 세 엔진이 같은 경계를 써야 등급 분포를 정면 비교할 수 있다.
function grade(s) {
  return s >= 0.5 ? "적극매수" : s >= 0.15 ? "매수" : s > -0.15 ? "중립" : s > -0.5 ? "매도" : "적극매도";
}
// 결측(null) 항목을 가중에서 제외하고 남은 가중치로 재정규화하는 가중평균.
// 0 으로 채우면 결측이 '중립 한 표'로 작동해 점수를 중앙으로 끌어당긴다 — 그래서 제외한다.
function wavg(pairs) {
  let s = 0, w = 0;
  pairs.forEach((p) => { if (p[0] != null && isFinite(p[0])) { s += p[0] * p[1]; w += p[1]; } });
  return w ? s / w : null;
}

// ── 다중 지표 종합(한 시계열) ──
// 반환: {level, buy, sell, neu, total, score, signal, rsi, macd, stoch, adx, sma20/50/200 ...}
function computeSuite(bars, opts) {
  opts = opts || {};
  const c = bars.map((b) => b.close), h = bars.map((b) => b.high), l = bars.map((b) => b.low), n = c.length;
  if (n < 35) return null;
  const level = c[n - 1];
  let buy = 0, sell = 0, neu = 0;

  // 이동평균 투표 (SMA + EMA, 다기간) — ±MA_NEUTRAL_PCT 밴드 안이면 '중립'.
  // 밴드 없이 level>ma 만 보면 12표가 전부 매수/매도로 갈려 종합 점수가 한쪽으로 쏠린다
  // (2026-08-07 실측: 단기 '적극매수' 49종목 vs '적극매도' 11종목). 이평선에 딱 붙어 있는
  // 상태는 방향이 아직 정해지지 않은 것이므로 기권시키는 편이 실제 차트 판단에 가깝다.
  const MA_NEUTRAL_PCT = 0.5;
  let maBuy = 0, maSell = 0, maNeu = 0;   // 블록 방식이 MA 12표를 부분점수 하나로 압축할 때 쓴다
  const voteVsMa = (ref) => {
    if (ref == null || !isFinite(ref) || ref === 0) return;
    const gap = (level - ref) / ref * 100;
    if (Math.abs(gap) < MA_NEUTRAL_PCT) { neu++; maNeu++; }
    else if (gap > 0) { buy++; maBuy++; }
    else { sell++; maSell++; }
  };
  const maP = [5, 10, 20, 50, 100, 200], sm = {};
  maP.forEach((p) => {
    const s = sma(c, p); if (s != null) { sm[p] = s; voteVsMa(s); }
    const e = ema(c, p); if (e != null) voteVsMa(e);
  });

  // 오실레이터 투표 (+1 매수 / -1 매도 / 0 중립)
  const rNow = rsi(c, 14);
  const oRsi = rNow == null ? 0 : (rNow < 30 ? 1 : rNow > 70 ? -1 : 0);
  const m = macd(c);
  // MACD 도 시그널선과의 격차가 가격 대비 미미하면 중립 — 부호만 보면 교차 직전의
  // 사실상 붙어 있는 상태까지 매수/매도로 단정하게 된다(실측 매수 86 : 매도 23, 중립 0).
  const oMacd = (function () {
    if (!m || !level) return 0;
    const gap = (m.macd - m.signal) / level * 100;
    return Math.abs(gap) < 0.05 ? 0 : (gap > 0 ? 1 : -1);
  })();
  const st = stochastic(h, l, c, 14, 3, 3);
  const oStoch = st ? (st.k < 20 && st.k > st.d ? 1 : st.k > 80 && st.k < st.d ? -1 : 0) : 0;
  const cNow = cci(h, l, c, 20), cPrev = cci(h.slice(0, -1), l.slice(0, -1), c.slice(0, -1), 20);
  const oCci = cNow == null ? 0 : (cNow < -100 && (cPrev == null || cNow > cPrev) ? 1 : cNow > 100 && (cPrev == null || cNow < cPrev) ? -1 : 0);
  const wNow = williamsR(h, l, c, 14), wPrev = williamsR(h.slice(0, -1), l.slice(0, -1), c.slice(0, -1), 14);
  const oWr = wNow == null ? 0 : (wNow < -80 && (wPrev == null || wNow > wPrev) ? 1 : wNow > -20 && (wPrev == null || wNow < wPrev) ? -1 : 0);
  const ax = adx(h, l, c, 14);
  const oAdx = ax && ax.adx > 20 ? (ax.pdi > ax.mdi ? 1 : ax.mdi > ax.pdi ? -1 : 0) : 0;
  const moNow = momentum(c, 10);
  const oMom = moNow == null ? 0 : (moNow > 0 ? 1 : moNow < 0 ? -1 : 0);

  [oRsi, oMacd, oStoch, oCci, oWr, oAdx, oMom].forEach((v) => { if (v > 0) buy++; else if (v < 0) sell++; else neu++; });

  // ── 구(legacy) 방식: 19표 동등가중 ──
  // 문제(2026-08-11 감사·백테스트로 확인): MA 12표는 상관이 극도로 높은 '추세' 하나의
  // 반복 측정이라 표의 63% 를 지배하고, W%R 은 스토캐스틱 %K 의 선형변환(중복)이다.
  // 정배열 상승장에선 오실레이터가 전부 중립이어도 자동 '적극매수'가 된다.
  const total = buy + sell + neu;
  const score = total ? (buy - sell) / total : 0;
  const signal = grade(score);

  // ── 신(block) 방식: 성격이 같은 지표를 묶어 블록당 1표 — 추세·모멘텀·과열 1/3 씩 ──
  //  · 추세: MA 12표를 하나의 부분점수 (매수−매도)/전체 ∈ [-1,1] 로 압축
  //  · 모멘텀: MACD·10일 모멘텀·ADX 방향의 평균 (추세 '확인' 계열)
  //  · 과열/평균회귀: RSI·스토캐스틱·CCI 의 평균 (역추세 계열 — W%R 은 스토캐스틱과 중복이라 투표 제외)
  //  블록 입력이 전부 결측이면 그 블록은 가중에서 제외한다(0점 취급 금지).
  const maTot = maBuy + maSell + maNeu;
  const bTrend = maTot ? (maBuy - maSell) / maTot : null;
  const avg = (arr) => { const v = arr.filter((x) => x != null); return v.length ? v.reduce((a, x) => a + x, 0) / v.length : null; };
  const bMom = avg([m ? oMacd : null, moNow == null ? null : oMom, ax ? oAdx : null]);
  const bOsc = avg([rNow == null ? null : oRsi, st ? oStoch : null, cNow == null ? null : oCci]);
  let bs = 0, bw = 0;
  [bTrend, bMom, bOsc].forEach((b) => { if (b != null) { bs += b; bw++; } });
  const scoreBlock = bw ? bs / bw : 0;
  const signalBlock = grade(scoreBlock);

  // ── 흐름(flow) 방식: 이동평균선 · 일목균형표 · 매물대 중심 가중 ──────────────
  // 사용자가 '힘과 흐름'으로 읽는 세 축에 85% 를 배정하고 오실레이터는 보조(15%)로 낮춘다.
  // legacy 가 오실레이터 7표(37%)를 쓰고 매물대·일목을 아예 안 보던 것과의 핵심 차이다.
  //  · 이동평균선 30% — 위치(12표 압축) / 정배열 순서 / 기울기. 셋은 같은 '추세'라도 층위가
  //    달라(어디에 있나 · 줄이 섰나 · 움직이고 있나) 중복 계산이 아니다.
  //  · 일목균형표 30% — 구름 대비 위치·전환/기준·후행스팬·구름 방향(ichimoku() 내부 가중).
  //  · 매물대     25% — 머리 위 매물 비중 + 현재가 주변 국소 지지/저항(volumeProfile()).
  //  · 오실레이터 15% — RSI·스토캐스틱·MACD·ADX 평균(과열 판단 보조).
  // 결측 블록은 가중에서 빼고 남은 블록으로 재정규화한다(0점 취급 금지 — 거래량이 없는
  // 지수나 봉수가 모자란 월봉에서 '중립 쪽으로 끌리는' 편향이 생긴다).
  const maPos = maTot ? (maBuy - maSell) / maTot : null;
  const alignSeq = [5, 10, 20, 50, 100, 200].map((p) => sm[p]);
  let aOk = 0, aBad = 0;
  for (let i = 1; i < alignSeq.length; i++) {
    const a = alignSeq[i - 1], b = alignSeq[i];
    if (a == null || b == null) continue;
    if (a > b) aOk++; else if (a < b) aBad++;
  }
  const maAlign = (aOk + aBad) ? (aOk - aBad) / (aOk + aBad) : null;
  const slopeOf = (p, back) => {
    const now = sma(c, p), then = sma(c.slice(0, c.length - back), p);
    if (now == null || then == null || !then) return null;
    const g = (now - then) / then * 100;
    return Math.abs(g) < 0.2 ? 0 : (g > 0 ? 1 : -1);   // 거의 수평이면 기권
  };
  const maSlope = avg([slopeOf(20, 10), slopeOf(60, 20)]);
  const bMa = wavg([[maPos, 0.40], [maAlign, 0.35], [maSlope, 0.25]]);

  const ich = ichimoku(h, l, c);
  const vp = volumeProfile(bars, opts.vpLookback);
  const bOscF = avg([rNow == null ? null : oRsi, st ? oStoch : null, m ? oMacd : null, ax ? oAdx : null]);
  const scoreFlow = wavg([[bMa, 0.30], [ich ? ich.score : null, 0.30],
    [vp ? vp.score : null, 0.25], [bOscF, 0.15]]) || 0;
  const signalFlow = grade(scoreFlow);

  return { level, buy, sell, neu, total, score, signal, rsi: rNow, macd: m, stoch: st, adx: ax,
    blocks: { trend: bTrend, momentum: bMom, osc: bOsc }, scoreBlock, signalBlock,
    flow: { ma: bMa, ichimoku: ich ? ich.score : null, volume: vp ? vp.score : null, osc: bOscF },
    ichi: ich, vprof: vp, scoreFlow, signalFlow,
    cci: cNow, willr: wNow, mom: moNow, sma: sm, sma5: sma(c, 5), sma20: sma(c, 20), sma50: sma(c, 50),
    sma60: sma(c, 60), sma120: sma(c, 120), sma200: sma(c, 200) };
}

// 추세 화살표 — 종합 신호 방향과 일치시켜 '하락/매수' 같은 모순 표시를 방지한다.
function trendFromSignal(sig) {
  if (sig === "적극매수" || sig === "매수") return "상승";
  if (sig === "적극매도" || sig === "매도") return "하락";
  return "횡보";
}
function macdText(m, level) {
  if (!m) return "–";
  const gap = level ? (m.macd - m.signal) / level * 100 : (m.macd - m.signal);
  const dir = Math.abs(gap) < 0.05 ? "중립(시그널 근접)"
    : (m.macd > m.signal ? "매수(시그널 상회)" : "매도(시그널 하회)");
  return dir + (m.hist >= 0 ? " · 히스토그램+" : " · 히스토그램−");
}
function adxText(ax) {
  if (!ax || !isFinite(ax.adx)) return "–";
  const strength = ax.adx >= 40 ? "매우 강" : ax.adx >= 25 ? "강" : ax.adx >= 20 ? "보통" : "약(횡보)";
  const dir = ax.pdi > ax.mdi ? "상승우위" : "하락우위";
  return "ADX " + ax.adx.toFixed(0) + " · " + strength + " · " + dir;
}

// ── 공개: 단기(일봉)/장기(주봉) 기술적 분석 ──
function analyzeTimeframes(rows, opts) {
  opts = opts || {};
  const engine = opts.engine || DEFAULT_ENGINE;   // "block"(기본) | "legacy" — 백테스트 비교용으로 둘 다 병기 반환
  const dp = opts.dp != null ? opts.dp : 2, srDp = opts.srDp != null ? opts.srDp : 0;
  if (!rows || rows.length < 35) return null;
  const closes = rows.map((r) => r.close), level = closes[closes.length - 1];
  const prev = closes[closes.length - 2];
  const changePct = prev ? (level - prev) / prev * 100 : 0;
  const lastT = rows[rows.length - 1].t;
  const period = lastT ? (new Date(lastT * 1000).toISOString().slice(5, 10).replace("-", "/") + " 종가") : "";

  // 3구간 — 단기(일봉) · 중기(주봉) · 장기(월봉).
  // 각 시계열이 짧아 지표를 못 만들면 한 단계 짧은 봉으로 폴백하고 라벨도 그에 맞춰 정직하게 쓴다
  // ('월간 지표'라고 적어 놓고 실제로는 주봉인 상황을 만들지 않는다).
  // 매물대 조회 구간은 봉 단위마다 다르게 잡는다 — 모두 '대략 최근 1~5년'의 체결 분포.
  const S = computeSuite(rows, { vpLookback: 250 });        // 일봉 ~1년
  if (!S) return null;
  const weekly = toWeekly(rows), monthly = toMonthly(rows);
  const Mw = computeSuite(weekly, { vpLookback: 104 });      // 주봉 ~2년
  const M = Mw || S;                     // 중기: 주봉, 짧으면 일봉
  const mdName = Mw ? "주간" : "일봉";
  const Lm = computeSuite(monthly, { vpLookback: 60 });      // 월봉 ~5년
  const L = Lm || M;                     // 장기: 월봉, 짧으면 중기로 폴백
  const lgName = Lm ? "월간" : mdName;

  // 지지/저항
  const winS = rows.slice(-20);
  const loS = Math.min.apply(null, winS.map((x) => x.low)), hiS = Math.max.apply(null, winS.map((x) => x.high));
  const srS = levels(level, [S.sma5, S.sma20, S.sma60, loS, hiS], loS, hiS);
  const wl = weekly.slice(-13);   // 중기: 최근 ~3개월(주봉)
  const loM = wl.length ? Math.min.apply(null, wl.map((x) => x.low)) : loS, hiM = wl.length ? Math.max.apply(null, wl.map((x) => x.high)) : hiS;
  const srM = levels(level, [S.sma20, S.sma60, S.sma120, loM, hiM], loM, hiM);
  const ml = monthly.slice(-24);  // 장기: 최근 ~2년(월봉)
  const loL = ml.length ? Math.min.apply(null, ml.map((x) => x.low)) : loM, hiL = ml.length ? Math.max.apply(null, ml.map((x) => x.high)) : hiM;
  const srL = levels(level, [S.sma60, S.sma120, S.sma200, loL, hiL], loL, hiL);

  // 골든/데드크로스(일봉 50/200)
  let cross = "–";
  if (S.sma50 != null && S.sma200 != null) cross = S.sma50 > S.sma200 ? "골든크로스(정배열)" : "데드크로스(역배열)";
  else if (S.sma60 != null && S.sma120 != null) cross = S.sma60 > S.sma120 ? "정배열(60>120)" : "역배열(60<120)";
  const vs200 = S.sma200 != null ? (level - S.sma200) / S.sma200 * 100 : null;

  const rsS = rsiState(S.rsi), rsM = rsiState(M.rsi), rsL = rsiState(L.rsi);
  const pick = (X) => (engine === "legacy" ? X.signal : engine === "block" ? X.signalBlock : X.signalFlow);
  // read 요약 — 엔진마다 결론의 근거를 그 엔진의 언어로 보여준다.
  const fb = (v) => (v == null ? "–" : (v > 0 ? "+" : "") + v.toFixed(2));
  const tally = (X, label) =>
    engine === "legacy"
      ? "지표 " + X.total + "개 중 매수 " + X.buy + "·매도 " + X.sell + (X.neu ? "·중립 " + X.neu : "") + " → " + label + " '" + X.signal + "'. "
      : engine === "block"
      ? "추세 " + fb(X.blocks.trend) + " · 모멘텀 " + fb(X.blocks.momentum) + " · 과열 " + fb(X.blocks.osc) +
        " → " + label + " '" + X.signalBlock + "'(3블록 균형 투표). "
      : "이평 " + fb(X.flow.ma) + " · 일목 " + fb(X.flow.ichimoku) + " · 매물대 " + fb(X.flow.volume) +
        " · 보조 " + fb(X.flow.osc) + " → " + label + " '" + X.signalFlow + "'(이평30·일목30·매물대25·보조15). ";

  // 일목·매물대 표시 문구 — 카드에서 '힘과 흐름'을 숫자로 확인할 수 있게 한다.
  const ichiText = (X) => {
    const I = X.ichi;
    if (!I) return "–";
    return I.where + " · 전환" + (I.tkCross > 0 ? ">" : I.tkCross < 0 ? "<" : "≈") + "기준" +
      " · 후행 " + (I.chikou > 0 ? "양호" : I.chikou < 0 ? "부진" : "중립") +
      " · " + (I.cloudDir > 0 ? "양운" : I.cloudDir < 0 ? "음운" : "평운");
  };
  const vpText = (X) => {
    const V = X.vprof;
    if (!V) return "–";
    return "POC " + fmtNum(V.poc, srDp) + " · 머리위 매물 " + (V.aboveRatio * 100).toFixed(0) + "%" +
      " · 주변 " + (V.local > 0.15 ? "지지 우위" : V.local < -0.15 ? "저항 우위" : "균형");
  };

  // 지표 표시 순서 = 판단 가중 순서(일목·매물대·이평 → 보조). 카드에서 근거가 바로 읽히도록.
  const short = {
    trend: trendFromSignal(pick(S)),
    signal: pick(S), sigLegacy: S.signal, sigBlock: S.signalBlock, sigFlow: S.signalFlow,
    blocks: S.blocks, flow: S.flow,
    metrics: [
      ["일목균형표", ichiText(S)],
      ["매물대", vpText(S)],
      ["RSI(14)", (S.rsi == null ? "–" : S.rsi.toFixed(1)) + (rsS ? " · " + rsS : "")],
      ["MACD", macdText(S.macd, S.level)],
      ["지지 / 저항", fmtNum(srS.support, srDp) + " / " + fmtNum(srS.resistance, srDp)]
    ],
    read: tally(S, "단기") + adxText(S.adx) +
      (S.stoch ? ", 스토캐스틱 " + S.stoch.k.toFixed(0) : "") + "."
  };
  const mid = {
    trend: trendFromSignal(pick(M)),
    signal: pick(M), sigLegacy: M.signal, sigBlock: M.signalBlock, sigFlow: M.signalFlow,
    blocks: M.blocks, flow: M.flow,
    metrics: [
      [mdName + " 일목균형표", ichiText(M)],
      [mdName + " 매물대", vpText(M)],
      [mdName + " RSI(14)", (M.rsi == null ? "–" : M.rsi.toFixed(1)) + (rsM ? " · " + rsM : "")],
      [mdName + " MACD", macdText(M.macd, M.level)],
      ["지지 / 저항", fmtNum(srM.support, srDp) + " / " + fmtNum(srM.resistance, srDp)]
    ],
    read: tally(M, "중기") + mdName + " 기준 " +
      (M.macd ? "MACD " + macdText(M.macd, M.level).split(" ·")[0] : "") + "."
  };
  const long = {
    trend: trendFromSignal(pick(L)),
    signal: pick(L), sigLegacy: L.signal, sigBlock: L.signalBlock, sigFlow: L.signalFlow,
    blocks: L.blocks, flow: L.flow,
    metrics: [
      [lgName + " 일목균형표", ichiText(L)],
      [lgName + " 매물대", vpText(L)],
      ["50/200 배열", cross + (vs200 != null ? " · 200일선 " + (vs200 >= 0 ? "+" : "") + vs200.toFixed(1) + "%" : "")],
      [lgName + " RSI(14)", (L.rsi == null ? "–" : L.rsi.toFixed(1)) + (rsL ? " · " + rsL : "")],
      ["지지 / 저항", fmtNum(srL.support, srDp) + " / " + fmtNum(srL.resistance, srDp)]
    ],
    read: tally(L, "장기") + lgName + " 기준, " + cross + "."
  };

  return {
    level: fmtNum(level, dp),
    change: (changePct >= 0 ? "+" : "") + changePct.toFixed(2) + "%",
    changeDir: changePct >= 0 ? "up" : "down",
    period: period,
    short: short, mid: mid, long: long
  };
}

// ── 엔진 선택 (2026-08-15 백테스트로 결정: flow 채택) ──────────────────────
// 세 엔진을 **동일 표본**(103종목·10년 일봉·15,776회 평가, 룩어헤드 없음)으로 정면 비교했다.
// 63일 지평 스프레드(적극매수 − 적극매도, %p) — 클수록 등급이 사후 수익률을 잘 가른다:
//        단기   중기   장기
//   legacy +0.24  +2.36  +3.62
//   block  -0.61  +2.57  +2.28
//   flow   +1.14  +3.81  +5.29   ← 9개 조합(3기간×3지평) 중 8개에서 최고
// flow 는 중기 63일에서 5등급이 완전 단조 증가(4.67→4.94→6.84→7.00→8.48%)했다 —
// 이 검증에서 단조성을 만족한 유일한 조합이다. 종전 legacy 로는 예측력이 없다시피 하던
// 단기(일봉)도 63일 스프레드가 +0.24 → +1.14 로 올라왔다.
// 왜 좋아졌나(가설): legacy 는 오실레이터 7표(37%)에 끌려다니고 매물대·일목을 아예 보지
// 않았다. flow 는 ①거래량이라는 **새 정보**(매물대)를 처음 투입했고 ②구름 안=중립처럼
// 방향이 없을 때 기권하는 일목의 성질이 무의미한 극단 등급을 줄인다.
// 한계: 단조성은 중기 63일 외엔 미달이고 단기 +21일 스프레드는 여전히 음수(-0.27)다.
//       생존편향·거래비용 미반영, 10년 미만 상장 종목은 표본에서 빠졌다(WARMUP 1,630봉).
//       → 앱 푸터의 '매매 트리거가 아닌 참고 지표' 고지는 유지한다.
// 재도전 규칙은 그대로: 가설을 세우고 backtest-signals.js 로 같은 표본에서 비교할 것.
var DEFAULT_ENGINE = "flow";
var MIN_BARS = 35;   // computeSuite 최소 봉수(MACD 26+9) — 호출부 게이트도 이 상수를 쓸 것
var _LIB_TA = { MIN_BARS, sma, ema, rsi, rsiState, macd, stochastic, cci, williamsR, adx, momentum, chgN, fmtNum, levels, toWeekly, toMonthly, ichimoku, volumeProfile, grade, computeSuite, analyzeTimeframes };
if (typeof module !== "undefined" && module.exports) module.exports = _LIB_TA;   // Node (update 스크립트)
if (typeof window !== "undefined") window.LIB_TA = _LIB_TA;                       // 브라우저(관심종목 라이트 분석)
