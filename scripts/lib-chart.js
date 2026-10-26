const fs = require("fs");
const path = require("path");

// 상세 캔들 차트 데이터(data/chart/<이름>.json) — update-stock-ta.js(종목)·update-indices.js(지수, idx-<key>)가 함께 쓴다.
// 앱 종목 상세의 캔들 차트(일·주·월봉 + 이동평균 5·20·60·120 + 거래량)가 종목을 열 때만 받아 그린다.
// 받아 둔 10년 일봉에서 만들어 추가 조회가 없다. 이동평균은 앱이 계산하므로 표시 구간보다 길게 담는다
// (일봉 260개 = 표시 120 + 120일선 준비분, 주봉 200개, 월봉 전부). 행 = [날짜, 시가, 고가, 저가, 종가, 거래량],
// 날짜는 거래소 현지 날짜 정수(일·주 YYYYMMDD — 주봉은 그 주 마지막 거래일, 월봉 YYYYMM).
// 코스피·코스닥 지수는 행 끝에 투자자별 순매수 [개인, 외국인, 기관](억원, lib-flows.js)을 덧붙인다 — 주·월봉은 그 기간 합이고,
// 기간 전체가 수급 기록 안에 있을 때만 붙인다(기록 첫 주·달이나 아직 수급이 안 들어온 마지막 봉은 빈칸).
const CHART_DIR = path.join(__dirname, "..", "data", "chart");
const CHART_KEEP = { d: 260, w: 200, m: 130 };
function chartFile(ticker) { return path.join(CHART_DIR, ticker.replace(/[^A-Za-z0-9.\-]/g, "_") + ".json"); }
function chartOf(rows, dp, flows) {
  const off = rows.offMs || 0;
  const r = (v) => (dp ? +v.toFixed(dp) : Math.round(v));
  const daily = [];
  rows.forEach((x) => {
    if (!(x.close > 0)) return;
    const o = x.open > 0 ? x.open : x.close;
    const ymd = new Date(x.t * 1000 + off).toISOString().slice(0, 10);
    daily.push({ ymd: ymd, o: o, h: Math.max(x.high || 0, o, x.close), l: Math.min(x.low > 0 ? x.low : x.close, o, x.close), c: x.close, v: x.vol || 0 });
  });
  // 주봉(월요일 시작 주)·월봉(달력 월) — 시가는 첫 봉, 종가는 마지막 봉, 고·저는 극값, 거래량은 합
  function bucket(keyOf) {
    const out = [];
    daily.forEach((b) => {
      const k = keyOf(b.ymd), last = out[out.length - 1];
      if (!last || last.k !== k) out.push({ k: k, ymd: b.ymd, y0: b.ymd, o: b.o, h: b.h, l: b.l, c: b.c, v: b.v });
      else { last.ymd = b.ymd; last.h = Math.max(last.h, b.h); last.l = Math.min(last.l, b.l); last.c = b.c; last.v += b.v; }
    });
    return out;
  }
  const weekKey = (ymd) => { const d = new Date(ymd + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); };
  const monthKey = (ymd) => ymd.slice(0, 7);
  const ymdInt = (s) => +s.replace(/-/g, "");
  // 투자자별 순매수 — 일봉은 그날 값, 주·월봉은 같은 기간(수급 날짜 기준) 합. 기간이 수급 기록 범위 안에 다 들어올 때만.
  const fl = flows && flows.size ? flows : null;
  let fFirst = Infinity, fLast = -Infinity;
  const sums = { w: new Map(), m: new Map() };
  if (fl) fl.forEach((v, d) => {
    if (d < fFirst) fFirst = d;
    if (d > fLast) fLast = d;
    const s = String(d), ymd = s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8);
    [["w", weekKey(ymd)], ["m", monthKey(ymd)]].forEach(([p, k]) => {
      const a = sums[p].get(k) || [0, 0, 0];
      sums[p].set(k, [a[0] + v[0], a[1] + v[1], a[2] + v[2]]);
    });
  });
  const flowOf = (p, b) => {
    if (!fl) return null;
    if (p === "d") return fl.get(ymdInt(b.ymd)) || null;
    if (ymdInt(b.y0) < fFirst || ymdInt(b.ymd) > fLast) return null;
    return sums[p].get(b.k) || null;
  };
  const row = (b, dateInt, p) => {
    const x = [dateInt, r(b.o), r(b.h), r(b.l), r(b.c), Math.round(b.v)], f = flowOf(p, b);
    return f ? x.concat(f) : x;
  };
  return {
    d: daily.slice(-CHART_KEEP.d).map((b) => row(b, ymdInt(b.ymd), "d")),
    w: bucket(weekKey).slice(-CHART_KEEP.w).map((b) => row(b, ymdInt(b.ymd), "w")),
    m: bucket(monthKey).slice(-CHART_KEEP.m).map((b) => row(b, +b.ymd.slice(0, 7).replace("-", ""), "m")),
  };
}
function writeChart(ticker, rows, dp, flows) {
  const c = chartOf(rows, dp, flows);
  if (!c.d.length) return false;
  fs.mkdirSync(CHART_DIR, { recursive: true });
  fs.writeFileSync(chartFile(ticker), JSON.stringify(Object.assign({ t: ticker, dp: dp, asOf: rows.lastDate }, c)));
  return true;
}

module.exports = { CHART_DIR, chartFile, chartOf, writeChart };
