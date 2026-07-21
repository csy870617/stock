// 공유 기술적 분석 라이브러리 — 지수(update-indices.js)와 종목(update-stock-ta.js)이 함께 쓴다.
// Yahoo 일봉 rows([{t,close,high,low}])에서 단기/장기 기술적 분석을 결정론적으로 계산한다(LLM 토큰 0).
//  · 단기(1–3M): 5·20·60일선, RSI(14), 20일 모멘텀, 근접 지지/저항
//  · 장기(6–12M+): 60·120·200일선, 200일선 대비 위치, 50/200 골든·데드크로스, 120일 모멘텀

function mean(a) { return a.reduce((x, y) => x + y, 0) / a.length; }
function ma(c, n) { return c.length >= n ? mean(c.slice(-n)) : null; }

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
  if (al === 0) return 100;
  return 100 - 100 / (1 + ag / al);
}
function rsiState(r) {
  if (r == null) return "";
  if (r >= 70) return "과매수"; if (r >= 65) return "과매수 근접";
  if (r <= 30) return "과매도"; if (r <= 35) return "과매도 근접";
  return "중립";
}

// 이동평균 집계 신호 — 종가가 각 이평선 위/아래인지로 매수/매도 표를 세어 5단계로 매핑
function tallySignal(closes, level, periods) {
  let buy = 0, total = 0;
  periods.forEach((p) => { const m = ma(closes, p); if (m == null) return; total++; if (level > m) buy++; });
  if (!total) return { signal: "중립", buy: 0, total: 0 };
  const ratio = buy / total;
  let signal;
  if (ratio >= 0.83) signal = "적극매수";
  else if (ratio >= 0.6) signal = "매수";
  else if (ratio > 0.4) signal = "중립";
  else if (ratio >= 0.17) signal = "매도";
  else signal = "적극매도";
  return { signal, buy, total };
}

function trendBy(level, base, band) {
  if (base == null) return "횡보";
  const dev = (level - base) / base;
  if (dev > (band || 0.005)) return "상승";
  if (dev < -(band || 0.005)) return "하락";
  return "횡보";
}

// 추세 타이브레이커 — 이평선 집계가 '중립'일 때, 상승추세 + 기준선(장기선) 상회면 '매수'로 상향(상향 전용)
function signalTiebreak(signal, trend, level, refMA) {
  if (signal === "중립" && trend === "상승" && refMA != null && level > refMA) return "매수";
  return signal;
}

// 현재가 기준 가장 가까운 아래/위 레벨(이평선·최근 저·고점 후보 중)
function levels(level, cands, lo, hi) {
  const below = cands.filter((v) => v != null && v < level);
  const above = cands.filter((v) => v != null && v > level);
  return {
    support: below.length ? Math.max.apply(null, below) : lo,
    resistance: above.length ? Math.min.apply(null, above) : hi
  };
}

// 이동평균 관계 요약 (지정 이평선들 상회/하회)
function maSummary(level, pairs) {
  const items = pairs.filter((x) => x[1] != null);
  if (!items.length) return "–";
  const above = items.filter((x) => level > x[1]).map((x) => x[0]);
  const below = items.filter((x) => level <= x[1]).map((x) => x[0]);
  if (!below.length) return items.map((x) => x[0]).join("·") + "일선 모두 상회";
  if (!above.length) return items.map((x) => x[0]).join("·") + "일선 모두 하회";
  const parts = [];
  if (above.length) parts.push(above.join("·") + "일선 상회");
  if (below.length) parts.push(below.join("·") + "일선 하회");
  return parts.join(" · ");
}

function fmtNum(n, dp) {
  if (n == null || !isFinite(n)) return "–";
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}
function chgN(c, n) { const p = c[Math.max(0, c.length - 1 - n)]; return p ? (c[c.length - 1] - p) / p * 100 : null; }

// ── 단기/장기 기술적 분석 ──
// dp: 표시 소수 자릿수, srDp: 지지/저항 소수 자릿수
function analyzeTimeframes(rows, opts) {
  opts = opts || {};
  const dp = opts.dp != null ? opts.dp : 2, srDp = opts.srDp != null ? opts.srDp : 0;
  const closes = rows.map((r) => r.close);
  if (closes.length < 30) return null;
  const level = closes[closes.length - 1];
  const prev = closes[closes.length - 2];
  const changePct = prev ? (level - prev) / prev * 100 : 0;

  const m5 = ma(closes, 5), m20 = ma(closes, 20), m60 = ma(closes, 60),
        m120 = ma(closes, 120), m200 = ma(closes, 200), m50 = ma(closes, 50);
  const r14 = rsi(closes, 14);
  const rs = rsiState(r14);

  const lastT = rows[rows.length - 1].t;
  const period = lastT ? (new Date(lastT * 1000).toISOString().slice(5, 10).replace("-", "/") + " 종가") : "";

  // ── 단기 ──
  const winS = rows.slice(-20);
  const loS = Math.min.apply(null, winS.map((x) => x.low)), hiS = Math.max.apply(null, winS.map((x) => x.high));
  const srS = levels(level, [m5, m20, m60, loS, hiS], loS, hiS);
  const sigSraw = tallySignal(closes, level, [5, 20, 60]);   // 단기 집계 이평(표시와 일치)
  const trendS = trendBy(level, m20);
  const sigS = { signal: signalTiebreak(sigSraw.signal, trendS, level, m60) };
  const momS = chgN(closes, 20);
  const short = {
    trend: trendS, signal: sigS.signal,
    metrics: [
      ["RSI(14)", (r14 == null ? "–" : r14.toFixed(1)) + (rs ? " · " + rs : "")],
      ["단기 이평(5·20·60)", maSummary(level, [["5", m5], ["20", m20], ["60", m60]])],
      ["지지 / 저항", fmtNum(srS.support, srDp) + " / " + fmtNum(srS.resistance, srDp)]
    ],
    read: maSummary(level, [["20", m20], ["60", m60]]) +
      (r14 != null ? ", RSI " + r14.toFixed(0) + (rs ? "(" + rs + ")" : "") : "") +
      (momS != null ? ", 20일 " + (momS >= 0 ? "+" : "") + momS.toFixed(1) + "%" : "") +
      " → 단기 '" + sigS.signal + "'."
  };

  // ── 장기 ──
  const nLong = Math.min(rows.length, 120);
  const winL = rows.slice(-nLong);
  const loL = Math.min.apply(null, winL.map((x) => x.low)), hiL = Math.max.apply(null, winL.map((x) => x.high));
  const srL = levels(level, [m60, m120, m200, loL, hiL], loL, hiL);
  const sigLraw = tallySignal(closes, level, [60, 120, 200]);   // 장기 집계 이평(표시와 일치)
  const longBase = m200 != null ? m200 : (m120 != null ? m120 : m60);
  const trendL = trendBy(level, longBase, 0.01);
  const sigL = { signal: signalTiebreak(sigLraw.signal, trendL, level, longBase) };
  const momL = chgN(closes, 120);
  // 50/200 골든·데드크로스(둘 다 있을 때)
  let cross = "–";
  if (m50 != null && m200 != null) cross = m50 > m200 ? "골든크로스(정배열)" : "데드크로스(역배열)";
  else if (m60 != null && m120 != null) cross = m60 > m120 ? "정배열(60>120)" : "역배열(60<120)";
  const vs200 = m200 != null ? ((level - m200) / m200 * 100) : (m120 != null ? ((level - m120) / m120 * 100) : null);
  const long = {
    trend: trendL, signal: sigL.signal,
    metrics: [
      ["장기 이평(60·120·200)", maSummary(level, [["60", m60], ["120", m120], ["200", m200]])],
      ["50/200 배열", cross],
      ["지지 / 저항", fmtNum(srL.support, srDp) + " / " + fmtNum(srL.resistance, srDp)]
    ],
    read: (m200 != null ? "200일선 " + (vs200 >= 0 ? "상회" : "하회") + "(" + (vs200 >= 0 ? "+" : "") + vs200.toFixed(1) + "%)"
      : maSummary(level, [["60", m60], ["120", m120]])) +
      ", " + cross +
      (momL != null ? ", 120일 " + (momL >= 0 ? "+" : "") + momL.toFixed(1) + "%" : "") +
      " → 장기 '" + sigL.signal + "'."
  };

  return {
    level: fmtNum(level, dp),
    change: (changePct >= 0 ? "+" : "") + changePct.toFixed(2) + "%",
    changeDir: changePct >= 0 ? "up" : "down",
    period: period,
    short: short, long: long
  };
}

module.exports = { ma, rsi, rsiState, tallySignal, trendBy, signalTiebreak, levels, maSummary, fmtNum, chgN, analyzeTimeframes };
