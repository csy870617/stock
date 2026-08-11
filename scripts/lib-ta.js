// 공유 기술적 분석 라이브러리 (다중 지표 엔진) — 지수(update-indices.js)·종목(update-stock-ta.js) 공용.
// Yahoo 일봉 rows([{t,close,high,low}])에서 프로 플랫폼(Investing.com·TradingView) 방식으로
// 이동평균(SMA·EMA 다기간) + 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를
// 종합 투표해 5단계 신호(적극매수~적극매도)를 결정론적으로 산출한다(LLM 토큰 0).
//   · 단기(1–3M): 일봉 기준
//   · 장기(6–12M+): 주봉(일봉 리샘플) 기준 — 주간 RSI·MACD·이평 등 진짜 장기 신호

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
    if (!map[k]) { map[k] = { t: r.t, close: r.close, high: r.high, low: r.low }; order.push(k); }
    else { const w = map[k]; w.high = Math.max(w.high, r.high); w.low = Math.min(w.low, r.low); w.close = r.close; w.t = r.t; }
  });
  return order.map((k) => map[k]);
}

// 월봉 집계 — 달력 월(UTC) 단위로 묶는다. 장기(6~12M+) 판단의 기준 시계열.
function toMonthly(rows) {
  const map = {}, order = [];
  rows.forEach((r) => {
    const d = new Date(r.t * 1000);
    const k = d.getUTCFullYear() * 12 + d.getUTCMonth();
    if (!map[k]) { map[k] = { t: r.t, close: r.close, high: r.high, low: r.low }; order.push(k); }
    else { const w = map[k]; w.high = Math.max(w.high, r.high); w.low = Math.min(w.low, r.low); w.close = r.close; w.t = r.t; }
  });
  return order.map((k) => map[k]);
}

// 현재가 기준 가장 가까운 아래/위 레벨(이평선·최근 저·고점 후보 중)
function levels(level, cands, lo, hi) {
  const below = cands.filter((v) => v != null && v < level);
  const above = cands.filter((v) => v != null && v > level);
  return { support: below.length ? Math.max.apply(null, below) : lo, resistance: above.length ? Math.min.apply(null, above) : hi };
}

// ── 다중 지표 종합(한 시계열) ──
// 반환: {level, buy, sell, neu, total, score, signal, rsi, macd, stoch, adx, sma20/50/200 ...}
function computeSuite(bars) {
  const c = bars.map((b) => b.close), h = bars.map((b) => b.high), l = bars.map((b) => b.low), n = c.length;
  if (n < 35) return null;
  const level = c[n - 1];
  let buy = 0, sell = 0, neu = 0;

  // 이동평균 투표 (SMA + EMA, 다기간) — ±MA_NEUTRAL_PCT 밴드 안이면 '중립'.
  // 밴드 없이 level>ma 만 보면 12표가 전부 매수/매도로 갈려 종합 점수가 한쪽으로 쏠린다
  // (2026-08-07 실측: 단기 '적극매수' 49종목 vs '적극매도' 11종목). 이평선에 딱 붙어 있는
  // 상태는 방향이 아직 정해지지 않은 것이므로 기권시키는 편이 실제 차트 판단에 가깝다.
  const MA_NEUTRAL_PCT = 0.5;
  const voteVsMa = (ref) => {
    if (ref == null || !isFinite(ref) || ref === 0) return;
    const gap = (level - ref) / ref * 100;
    if (Math.abs(gap) < MA_NEUTRAL_PCT) neu++;
    else if (gap > 0) buy++;
    else sell++;
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

  const total = buy + sell + neu;
  const score = total ? (buy - sell) / total : 0;
  const signal = score >= 0.5 ? "적극매수" : score >= 0.15 ? "매수" : score > -0.15 ? "중립" : score > -0.5 ? "매도" : "적극매도";

  return { level, buy, sell, neu, total, score, signal, rsi: rNow, macd: m, stoch: st, adx: ax,
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
  const S = computeSuite(rows);
  if (!S) return null;
  const weekly = toWeekly(rows), monthly = toMonthly(rows);
  const Mw = computeSuite(weekly);
  const M = Mw || S;                     // 중기: 주봉, 짧으면 일봉
  const mdName = Mw ? "주간" : "일봉";
  const Lm = computeSuite(monthly);
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
  const tally = (X, label) => "지표 " + X.total + "개 중 매수 " + X.buy + "·매도 " + X.sell +
    (X.neu ? "·중립 " + X.neu : "") + " → " + label + " '" + X.signal + "'. ";

  const short = {
    trend: trendFromSignal(S.signal),
    signal: S.signal,
    metrics: [
      ["RSI(14)", (S.rsi == null ? "–" : S.rsi.toFixed(1)) + (rsS ? " · " + rsS : "")],
      ["MACD", macdText(S.macd, S.level)],
      ["지지 / 저항", fmtNum(srS.support, srDp) + " / " + fmtNum(srS.resistance, srDp)]
    ],
    read: tally(S, "단기") + adxText(S.adx) +
      (S.stoch ? ", 스토캐스틱 " + S.stoch.k.toFixed(0) : "") + "."
  };
  const mid = {
    trend: trendFromSignal(M.signal),
    signal: M.signal,
    metrics: [
      [mdName + " RSI(14)", (M.rsi == null ? "–" : M.rsi.toFixed(1)) + (rsM ? " · " + rsM : "")],
      [mdName + " MACD", macdText(M.macd, M.level)],
      ["지지 / 저항", fmtNum(srM.support, srDp) + " / " + fmtNum(srM.resistance, srDp)]
    ],
    read: tally(M, "중기") + mdName + " 기준 " +
      (M.macd ? "MACD " + macdText(M.macd, M.level).split(" ·")[0] : "") + "."
  };
  const long = {
    trend: trendFromSignal(L.signal),
    signal: L.signal,
    metrics: [
      [lgName + " RSI(14)", (L.rsi == null ? "–" : L.rsi.toFixed(1)) + (rsL ? " · " + rsL : "")],
      ["50/200 배열", cross + (vs200 != null ? " · 200일선 " + (vs200 >= 0 ? "+" : "") + vs200.toFixed(1) + "%" : "")],
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

var MIN_BARS = 35;   // computeSuite 최소 봉수(MACD 26+9) — 호출부 게이트도 이 상수를 쓸 것
var _LIB_TA = { MIN_BARS, sma, ema, rsi, rsiState, macd, stochastic, cci, williamsR, adx, momentum, chgN, fmtNum, levels, toWeekly, toMonthly, computeSuite, analyzeTimeframes };
if (typeof module !== "undefined" && module.exports) module.exports = _LIB_TA;   // Node (update 스크립트)
if (typeof window !== "undefined") window.LIB_TA = _LIB_TA;                       // 브라우저(관심종목 라이트 분석)
