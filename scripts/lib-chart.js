const fs = require("fs");
const path = require("path");

// 상세 캔들 차트 데이터(data/chart/<이름>.json) — update-stock-ta.js(종목)·update-indices.js(지수, idx-<key>)가 함께 쓴다.
// 앱 종목 상세의 캔들 차트(일·주·월봉 + 이동평균 5·20·60·120 + 거래량)가 종목을 열 때만 받아 그린다.
// 받아 둔 10년 일봉에서 만들어 추가 조회가 없다. 이동평균은 앱이 계산하므로 표시 구간보다 길게 담는다
// (일봉 260개 = 표시 120 + 120일선 준비분, 주봉 200개, 월봉 전부). 행 = [날짜, 시가, 고가, 저가, 종가, 거래량],
// 날짜는 거래소 현지 날짜 정수(일·주 YYYYMMDD — 주봉은 그 주 마지막 거래일, 월봉 YYYYMM).
const CHART_DIR = path.join(__dirname, "..", "data", "chart");
const CHART_KEEP = { d: 260, w: 200, m: 130 };
function chartFile(ticker) { return path.join(CHART_DIR, ticker.replace(/[^A-Za-z0-9.\-]/g, "_") + ".json"); }
function chartOf(rows, dp) {
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
      if (!last || last.k !== k) out.push({ k: k, ymd: b.ymd, o: b.o, h: b.h, l: b.l, c: b.c, v: b.v });
      else { last.ymd = b.ymd; last.h = Math.max(last.h, b.h); last.l = Math.min(last.l, b.l); last.c = b.c; last.v += b.v; }
    });
    return out;
  }
  const weekKey = (ymd) => { const d = new Date(ymd + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); };
  const row = (b, dateInt) => [dateInt, r(b.o), r(b.h), r(b.l), r(b.c), Math.round(b.v)];
  const ymdInt = (s) => +s.replace(/-/g, "");
  return {
    d: daily.slice(-CHART_KEEP.d).map((b) => row(b, ymdInt(b.ymd))),
    w: bucket(weekKey).slice(-CHART_KEEP.w).map((b) => row(b, ymdInt(b.ymd))),
    m: bucket((ymd) => ymd.slice(0, 7)).slice(-CHART_KEEP.m).map((b) => row(b, +b.ymd.slice(0, 7).replace("-", ""))),
  };
}
function writeChart(ticker, rows, dp) {
  const c = chartOf(rows, dp);
  if (!c.d.length) return false;
  fs.mkdirSync(CHART_DIR, { recursive: true });
  fs.writeFileSync(chartFile(ticker), JSON.stringify(Object.assign({ t: ticker, dp: dp, asOf: rows.lastDate }, c)));
  return true;
}

module.exports = { CHART_DIR, chartFile, chartOf, writeChart };
