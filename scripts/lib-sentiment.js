// 시장 심리 온도계 — 공포 ↔ 환호를 0~100 한 숫자로(2026-11-06 사용자 '공포와 환호 등 대중의 심리까지 함께 분석되면 좋겠다').
// 연구(scripts/research/sentiment/ — 사전 등록 PREREG.md)와 운영(scripts/update-sentiment.js)이 이 정의를 같이 쓴다 — 한쪽만 고치지 않는다.
//
// 만드는 법(PREREG 그대로):
//  ① 구성 지표마다 그날 값을 직전 5년(1260거래일, 최소 2년 504거래일) 안에서 백분위로 바꾼다(같은 값은 절반으로 센 순위 — 그날 포함).
//  ② 방향을 맞춘다 — dir +1 은 클수록 환호, −1 은 클수록 공포라 100 − 백분위.
//  ③ 그날 값이 있는 지표(미국 5개·한국 6개 중 3개 이상)의 평균 = 원점수.
//  ④ 원점수를 다시 직전 5년(같은 창) 안 백분위로 = 심리 점수(0 극도의 공포 ~ 100 극도의 환호). 평균은 가운데로 몰리므로 한 번 더 순위로 편다.
//  공개 지연: 신용 스프레드(FRED)·신용융자(금융투자협회)는 하루 늦게 나오므로 전 거래일 값을 쓴다.
"use strict";

const W = 1260, MIN = 504;
const LEVELS = [[20, "극도의 공포"], [40, "공포"], [60, "중립"], [80, "환호"], [Infinity, "극도의 환호"]];
const US_SECTORS = ["XLB", "XLE", "XLF", "XLI", "XLK", "XLP", "XLU", "XLV", "XLY", "XLRE", "XLC"];
const KR_SECTORS = ["091160.KS", "305720.KS", "091180.KS", "143860.KS", "139230.KS", "449450.KS", "091170.KS", "102970.KS", "140700.KS", "315270.KS", "117460.KS", "117680.KS", "117700.KS", "227560.KS"];
const MIN_SECTORS = 6;
const COMPS = {
  us: [
    { key: "vix", name: "변동성", unit: "", dir: -1, desc: "VIX — S&P 500 옵션 가격에 담긴 앞으로 30일 기대 변동성. 높을수록 공포." },
    { key: "mom", name: "모멘텀", unit: "%", dir: 1, desc: "S&P 500 과 125거래일 이동평균의 거리. 위로 멀수록 환호, 아래로 멀수록 공포." },
    { key: "brd", name: "업종 폭", unit: "%", dir: 1, desc: "11개 업종 ETF 가운데 200일선 위에 있는 비율. 넓게 오를수록 환호." },
    { key: "safe", name: "안전자산 선호", unit: "%p", dir: 1, desc: "주식(SPY)과 중기 국채(IEF)의 20거래일 수익 차. 국채가 앞설수록 안전자산으로 몰리는 공포." },
    { key: "cred", name: "신용 스프레드", unit: "%p", dir: -1, desc: "Baa 회사채와 10년 국채의 금리 차. 넓을수록 돈 빌리기 어려운 공포." }
  ],
  korea: [
    { key: "vol", name: "변동성", unit: "%", dir: -1, desc: "코스피 20거래일 실현 변동성(연율). 크게 출렁일수록 공포." },
    { key: "mom", name: "모멘텀", unit: "%", dir: 1, desc: "코스피와 125거래일 이동평균의 거리. 위로 멀수록 환호, 아래로 멀수록 공포." },
    { key: "brd", name: "업종 폭", unit: "%", dir: 1, desc: "업종 ETF 가운데 200일선 위에 있는 비율. 넓게 오를수록 환호." },
    { key: "fx", name: "원/달러", unit: "%", dir: -1, desc: "원/달러 20거래일 변화. 원화가 약해질수록(환율 상승) 공포." },
    { key: "for", name: "외국인 수급", unit: "억원", dir: 1, desc: "코스피 외국인 20거래일 순매수 합. 많이 살수록 환호, 많이 팔수록 공포." },
    { key: "lev", name: "신용융자", unit: "%", dir: 1, desc: "개인 신용융자 잔고 20거래일 변화. 빚내서 사는 돈이 늘수록 환호." }
  ]
};
const MIN_COMP = { us: 3, korea: 3 };

const ok = (v) => v != null && isFinite(v);
const levelOf = (s) => (ok(s) ? LEVELS.find((l) => s < l[0])[1] : null);

// {YYYY-MM-DD: 값} → dates 축 배열: 그 날짜 이하 마지막 값(7일 넘게 묵은 값은 버림), lag 거래일 앞 날짜의 값(공개 지연)
function align(dates, map, opt) {
  opt = opt || {};
  const stale = opt.maxStaleDays != null ? opt.maxStaleDays : 7, lag = opt.lag || 0, exact = !!opt.exact;
  const ks = Object.keys(map || {}).filter((k) => ok(map[k])).sort(), a = new Array(dates.length).fill(null);
  let j = -1;
  for (let i = 0; i < dates.length; i++) {
    const d = dates[i];
    while (j + 1 < ks.length && ks[j + 1] <= d) j++;
    if (j < 0) continue;
    if (exact ? ks[j] !== d : (Date.parse(d) - Date.parse(ks[j])) / 864e5 > stale) continue;
    a[i] = map[ks[j]];
  }
  if (!lag) return a;
  return a.map((_, i) => (i - lag >= 0 ? a[i - lag] : null));
}
function smaArr(a, n) {   // n 개가 모두 있을 때만
  const out = new Array(a.length).fill(null);
  let s = 0, c = 0;
  for (let i = 0; i < a.length; i++) {
    if (ok(a[i])) { s += a[i]; c++; }
    if (i >= n && ok(a[i - n])) { s -= a[i - n]; c--; }
    if (i >= n - 1 && c === n) out[i] = s / n;
  }
  return out;
}
const chgN = (a, i, n) => (i - n >= 0 && ok(a[i]) && ok(a[i - n]) && a[i - n] !== 0 ? a[i] / a[i - n] - 1 : null);
// 직전 w 개(그날 포함) 안 백분위 — 같은 값은 절반으로(가운데 순위), 값이 min 개 미만이면 null
function pctTrail(a, w, min) {
  w = w || W; min = min || MIN;
  const out = new Array(a.length).fill(null);
  for (let i = 0; i < a.length; i++) {
    const v = a[i]; if (!ok(v)) continue;
    let n = 0, lt = 0, eq = 0;
    for (let j = Math.max(0, i - w + 1); j <= i; j++) { const x = a[j]; if (!ok(x)) continue; n++; if (x < v) lt++; else if (x === v) eq++; }
    if (n >= min) out[i] = (lt + 0.5 * eq) / n * 100;
  }
  return out;
}
// 업종 폭 — 그날 200일선을 잴 수 있는 업종 ETF(MIN_SECTORS 개 이상) 중 종가가 200일선 위인 비율(%)
function breadth(dates, sectorMaps) {
  const rows = Object.keys(sectorMaps || {}).map((s) => { const c = align(dates, sectorMaps[s]); return { c, m: smaArr(c, 200) }; });
  return dates.map((_, i) => {
    let n = 0, up = 0;
    rows.forEach((r) => { if (ok(r.c[i]) && ok(r.m[i])) { n++; if (r.c[i] > r.m[i]) up++; } });
    return n >= MIN_SECTORS ? up / n * 100 : null;
  });
}

// 구성 지표 원값 — inputs 는 {YYYY-MM-DD: 값} 지도들. dates = 그 나라 지수 거래일(오름차순)
function rawComponents(country, dates, I) {
  const R = {};
  if (country === "us") {
    const px = align(dates, I.index), m125 = smaArr(px, 125), spy = align(dates, I.spy), ief = align(dates, I.ief);
    R.vix = align(dates, I.vix);
    R.mom = px.map((v, i) => (ok(v) && ok(m125[i]) ? (v / m125[i] - 1) * 100 : null));
    R.brd = breadth(dates, I.sectors);
    R.safe = dates.map((_, i) => { const a = chgN(spy, i, 20), b = chgN(ief, i, 20); return ok(a) && ok(b) ? (a - b) * 100 : null; });
    R.cred = align(dates, I.baa, { lag: 1 });
  } else {
    const px = align(dates, I.index), m125 = smaArr(px, 125), krw = align(dates, I.krw), fl = align(dates, I.flows || {}, { exact: true }), mg = align(dates, I.margin || {}, { lag: 1 });
    R.vol = dates.map((_, i) => {
      if (i < 20) return null;
      const r = [];
      for (let k = i - 19; k <= i; k++) { if (!ok(px[k]) || !ok(px[k - 1])) return null; r.push(Math.log(px[k] / px[k - 1])); }
      const m = r.reduce((s, v) => s + v, 0) / r.length, sd = Math.sqrt(r.reduce((s, v) => s + (v - m) * (v - m), 0) / (r.length - 1));
      return sd * Math.sqrt(252) * 100;
    });
    R.mom = px.map((v, i) => (ok(v) && ok(m125[i]) ? (v / m125[i] - 1) * 100 : null));
    R.brd = breadth(dates, I.sectors);
    R.fx = dates.map((_, i) => { const c = chgN(krw, i, 20); return ok(c) ? c * 100 : null; });
    R.for = dates.map((_, i) => { if (i < 19) return null; let s = 0; for (let k = i - 19; k <= i; k++) { if (!ok(fl[k])) return null; s += fl[k]; } return s; });
    R.lev = dates.map((_, i) => { const c = chgN(mg, i, 20); return ok(c) ? c * 100 : null; });
  }
  return R;
}

// 심리 점수 — {dates, comps:{key:{raw, pct(방향 맞춘 0~100, 클수록 환호)}}, raw, score, n(그날 쓴 지표 수)}
function compute(country, dates, inputs) {
  const defs = COMPS[country], R = rawComponents(country, dates, inputs), comps = {};
  defs.forEach((d) => { const p = pctTrail(R[d.key]); comps[d.key] = { raw: R[d.key], pct: p.map((v) => (ok(v) ? (d.dir > 0 ? v : 100 - v) : null)) }; });
  const n = new Array(dates.length).fill(0);
  const raw = dates.map((_, i) => {
    const vs = defs.map((d) => comps[d.key].pct[i]).filter(ok); n[i] = vs.length;
    return vs.length >= MIN_COMP[country] ? vs.reduce((s, v) => s + v, 0) / vs.length : null;
  });
  return { dates, comps, raw, score: pctTrail(raw), n };
}

module.exports = { W, MIN, LEVELS, COMPS, MIN_COMP, US_SECTORS, KR_SECTORS, MIN_SECTORS, levelOf, align, smaArr, pctTrail, breadth, rawComponents, compute };
