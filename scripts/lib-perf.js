// 추천 성과 계산(보유 기준) — perf-track.js(앱 성과 탭의 data/perf.json)와 performance-report.js(루틴·결격 점검의 β)가 함께 쓴다.
//
// 보유 기준: 매 기록일(history.js 스냅샷)의 편성을 다음 기록일까지 동일비중으로 보유했다고 보고 수익률을 이어 붙인다(편출 종목 포함 —
//   생존 편향 없음). 기록일 사이에 빠진 종목은 다음 기록일 스냅샷에 가격이 없으므로, 그날 종가(exitPx — 야후, perf.json cache)로
//   마지막 하루를 잰다(2026-10-23 전에는 이 하루가 빠져 주제별로 최대 2%p 어긋났다).
// 거래일: 지수 종가가 바뀐 기록일만 거래일로 센다 — 주말·휴장일 기록(수익 0)은 다음 거래일에 합친다.
// β: 거래일 일간 수익률을 지수에 회귀(20거래일 이상) — 주간 7기록 묶음(12점)은 오차가 커서(미국 주제별 ±0.4~0.9) 바꿨다.
// t: 일간 초과수익(편성 − 지수)의 평균 ÷ 표준오차, β 반영 초과는 회귀 절편의 t — |t| < 2 면 우연과 구별되지 않는 차이.
"use strict";

const PERSONAL = { watch: 1, hold: 1 };
const MIN_DAYS = 20;   // β·t 를 계산하는 최소 거래일

// 선택자: null = 정식 전체(관심·보유 제외), "core" 등 = 그 주제, "tier:1" = 정식 중 그 티어, "watch"/"hold" = 개인 목록,
//   "picks" = 그 기록일의 그 나라 Top Pick(스냅샷 picks — chain 이 기록일마다 고른다, inGroup 으로는 가릴 수 없다)
function inGroup(sel, th, tier) {
  if (!sel) return !PERSONAL[th];
  if (sel.indexOf("tier:") === 0) return !PERSONAL[th] && tier === +sel.slice(5);
  return th === sel;
}
// 스냅샷의 그 나라 가격 기준일 — 미국은 한국 시각 기록이라 전날 미국 종가가 많다(가장 흔한 pd)
function pdOf(snap, country) {
  const cnt = {};
  (snap.stocks || []).forEach((e) => { if (e.c === country && e.pd) cnt[e.pd] = (cnt[e.pd] || 0) + 1; });
  let best = null;
  Object.keys(cnt).forEach((d) => { if (!best || cnt[d] > cnt[best] || (cnt[d] === cnt[best] && d > best)) best = d; });
  return best || snap.date;
}
const idxKey = (country) => (country === "korea" ? "kospi" : "sp500");

// 보유 기준 일별 수익 — [{d, r, rb, re, eq, n}] (거래일만, 앞쪽 n=0 은 그 묶음이 아직 비어 있던 날)
//   exitPx(country, ticker, i) → 기록일 i-1 에 있다가 i 에 없는 종목의 기록일 i 종가(없으면 null — 그 종목은 그날 빠진다)
function chain(H, country, sel, exitPx) {
  const bk = idxKey(country), prev = {};
  const lv = (snap, k) => { if (snap[k]) prev[k] = snap[k]; return prev[k] || null; };
  if (!H.length) return [];
  lv(H[0], bk); lv(H[0], "rsp");
  const days = [];
  let acc = null;   // 거래일이 아닌 기록(주말·휴장)의 수익을 다음 거래일에 합친다
  for (let i = 1; i < H.length; i++) {
    const a = H[i - 1], b = H[i];
    const b0 = prev[bk] || null, e0 = prev.rsp || null;
    const b1 = lv(b, bk), e1 = lv(b, "rsp");
    const trade = b[bk] != null && b0 != null && b[bk] !== b0;
    const pb = {};
    (b.stocks || []).forEach((e) => { if (e.c === country && e.p) pb[e.t] = e.p; });
    const seen = {};
    let sum = 0, n = 0;
    // Top Pick 묶음 — 그 기록일에 고른 3종목을 다음 기록일까지 같은 비중으로(고른 날 종가부터 — 정식 편성과 같은 기준)
    const pk = sel === "picks" ? (a.picks && a.picks[country]) || [] : null;
    (a.stocks || []).forEach((e) => {
      if (e.c !== country || seen[e.t] || !e.p || (pk ? pk.indexOf(e.t) < 0 : !inGroup(sel, e.th, e.tier))) return;
      let p1 = pb[e.t];
      if (!p1 && exitPx) p1 = exitPx(country, e.t, i);
      if (!p1) return;
      seen[e.t] = 1; sum += p1 / e.p - 1; n++;
    });
    // RSP(동일비중 S&P500)는 미국 편성의 비교 기준 — 한국 쪽은 쓰지 않는다
    const eq = country === "us" && !!(e0 && e1);
    const r = n ? sum / n : 0, rb = b0 && b1 ? b1 / b0 - 1 : 0, re = eq ? e1 / e0 - 1 : 0;
    if (!acc) acc = { r: 0, rb: 0, re: 0, eq: true, n: 0 };
    acc.r = (1 + acc.r) * (1 + r) - 1; acc.rb = (1 + acc.rb) * (1 + rb) - 1; acc.re = (1 + acc.re) * (1 + re) - 1;
    acc.eq = acc.eq && eq; acc.n = Math.max(acc.n, n);
    if (trade) { days.push({ d: b.date, r: acc.r, rb: acc.rb, re: acc.re, eq: acc.eq, n: acc.n }); acc = null; }
  }
  if (acc && days.length) {   // 마지막 기록이 주말이면 마지막 거래일에 합친다(대개 0)
    const z = days[days.length - 1];
    z.r = (1 + z.r) * (1 + acc.r) - 1; z.rb = (1 + z.rb) * (1 + acc.rb) - 1; z.re = (1 + z.re) * (1 + acc.re) - 1;
  }
  return days;
}

function mean(a) { return a.reduce((s, v) => s + v, 0) / a.length; }
function reg(y, x) {
  const n = y.length;
  if (n < MIN_DAYS) return null;
  const mx = mean(x), my = mean(y);
  let sxy = 0, sxx = 0;
  x.forEach((v, i) => { sxy += (v - mx) * (y[i] - my); sxx += (v - mx) * (v - mx); });
  if (!(sxx > 0)) return null;
  const b = sxy / sxx, a = my - b * mx;
  let sse = 0;
  x.forEach((v, i) => { sse += Math.pow(y[i] - a - b * v, 2); });
  const s2 = sse / (n - 2), seA = Math.sqrt(s2 * (1 / n + mx * mx / sxx));
  return { beta: b, seBeta: Math.sqrt(s2 / sxx), tAlpha: seA > 0 ? a / seA : null };
}
function tMean(d) {
  const n = d.length;
  if (n < MIN_DAYS) return null;
  const m = mean(d), sd = Math.sqrt(d.reduce((s, v) => s + (v - m) * (v - m), 0) / (n - 1));
  return sd > 0 ? m / (sd / Math.sqrt(n)) : null;
}
const r2 = (v) => (v == null || !isFinite(v) ? null : Math.round(v * 100) / 100);

// 기간 성적 — days[from..] (from 은 그 묶음이 처음 찬 날 이후로 당긴다). base = 첫 기록일(기간 시작 표시용)
function stats(days, from, base) {
  let i0 = from || 0;
  while (i0 < days.length && !days[i0].n) i0++;
  const w = days.slice(i0);
  if (!w.length) return null;
  let c = 1, cb = 1, ce = 1, eq = true;
  // 최대 낙폭(직전 고점 대비 가장 깊은 하락) — 같은 수익이라도 중간에 얼마나 깊게 빠졌는지가 버틸 수 있는 편성인지를 가른다
  let pk = 1, pkb = 1, mdd = 0, mddB = 0;
  w.forEach((x) => {
    c *= 1 + x.r; cb *= 1 + x.rb; ce *= 1 + x.re; eq = eq && x.eq;
    pk = Math.max(pk, c); pkb = Math.max(pkb, cb); mdd = Math.min(mdd, c / pk - 1); mddB = Math.min(mddB, cb / pkb - 1);
  });
  const ret = (c - 1) * 100, bench = (cb - 1) * 100;
  const g = reg(w.map((x) => x.r), w.map((x) => x.rb));
  const out = {
    from: i0 > 0 ? days[i0 - 1].d : (base || null), to: w[w.length - 1].d, days: w.length,
    ret: r2(ret), bench: r2(bench), excess: r2(ret - bench),
    beta: g ? r2(g.beta) : null, seBeta: g ? r2(g.seBeta) : null,
    betaAlpha: g ? r2(ret - g.beta * bench) : null,
    tEx: r2(tMean(w.map((x) => x.r - x.rb))), tAlpha: g ? r2(g.tAlpha) : null,
    mdd: r2(mdd * 100), mddB: r2(mddB * 100)
  };
  if (eq) { out.eq = r2((ce - 1) * 100); out.vsEq = r2(ret - (ce - 1) * 100); }
  return out;
}
// 기간 창 — 전체 + (기록이 그보다 길 때만) 최근 1·3·6개월·1년(21·63·126·252거래일)
const WINDOWS = [["m1", 21], ["m3", 63], ["m6", 126], ["y1", 252]];
function windows(days, base) {
  const out = { all: stats(days, 0, base) };
  let first = 0;
  while (first < days.length && !days[first].n) first++;
  const avail = days.length - first;
  WINDOWS.forEach(([k, len]) => { if (avail > len) out[k] = stats(days, days.length - len, base); });
  return out;
}

module.exports = { PERSONAL, MIN_DAYS, inGroup, pdOf, idxKey, chain, stats, windows, reg, tMean, r2 };
