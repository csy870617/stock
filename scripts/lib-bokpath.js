// 한국은행 기준금리 시장 기대 — 시장 금리(CD 91일·국고채 1년)에서 평균 기간 프리미엄을 빼고 읽는다(LLM 토큰 0).
// update-liquidity-gauge.js 가 불러 data/liquidity-auto.js 의 bok 에 쓴다.
//
// 왜 이 방식: 한국은 연준(연방기금금리 선물 — lib-fedpath.js)처럼 회의별 정책금리 선물이 없다.
//   대신 만기가 짧은 시장 금리는 '그 기간 평균 기준금리 기대 + 기간 프리미엄'이라, 과거 평균 프리미엄을 빼면 기대가 남는다.
// 보정(2026-10-20, 네이버 일별 시세 — 기준금리는 콜금리를 0.25%p 로 반올림해 15일 중앙값으로 복원):
//   CD 91일 − 다음 63거래일 평균 기준금리 = 평균 0.18%p(표준편차 0.15, 2016-12~2026-07 2,336일) — 방향 적중 82%(변화 ±5bp 이상 811/992)
//   국고 1년 − 다음 250거래일 평균 기준금리 = 평균 0.05%p(표준편차 0.17, 2023-10~2025-10 479일 — 표본 짧음) — 방향 적중 94%(357/380)
// 한계: 프리미엄은 국면마다 움직인다(CD 연도별 0.12~0.31). 회의별 확률이 아니라 '기간 평균 기대 금리'다.
const { execFile } = require("child_process");

const PREM = { cd91: { mean: 0.18, sd: 0.15 }, y1: { mean: 0.05, sd: 0.17 } };
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

// 네이버 증권 API — node fetch 가 막힌 환경(세션 egress)도 있어 curl 로 받는다
function getJson(url) {
  return new Promise((resolve) => {
    execFile("curl", ["-s", "--max-time", "15", "-A", UA, url], { maxBuffer: 8 * 1024 * 1024 }, (err, out) => {
      if (err || !out) return resolve(null);
      try { resolve(JSON.parse(out)); } catch (_e) { resolve(null); }
    });
  });
}
const num = (v) => { const x = parseFloat(String(v == null ? "" : v).replace(/,/g, "")); return isFinite(x) ? x : null; };

function label(chg, sd, horizon) {
  if (chg == null) return null;
  const n = chg / 0.25;
  if (chg >= 0.25) return horizon + " 인상 기대 — 기간 평균 금리가 지금보다 인상 약 " + n.toFixed(1) + "회분 높다";
  if (chg <= -0.25) return horizon + " 인하 기대 — 기간 평균 금리가 지금보다 인하 약 " + (-n).toFixed(1) + "회분 낮다";
  if (chg >= 0.05) return horizon + " 동결 우세 — 인상 쪽으로 기움";
  if (chg <= -0.05) return horizon + " 동결 우세 — 인하 쪽으로 기움";
  return horizon + " 동결 기대";
}

async function bokPath() {
  const majors = await getJson("https://m.stock.naver.com/front-api/marketIndex/majors");
  const R = majors && majors.result;
  if (!R) return null;
  const find = (arr, code) => (arr || []).find((x) => x.reutersCode === code) || null;
  const baseRow = find(R.standardInterest, "KROCRT=ECIX");
  const callRow = find(R.domesticInterest, "KRCALLBOKK");
  const cdRow = find(R.domesticInterest, "KFIA114000");
  const bond = async (code) => {
    const j = await getJson("https://m.stock.naver.com/front-api/marketIndex/productDetail?category=bond&reutersCode=" + encodeURIComponent(code));
    const r = j && j.result;
    return r ? { v: num(r.closePrice), at: (r.localTradedAt || "").slice(0, 10) } : null;
  };
  const y1 = await bond("KR1YT=RR"), y2 = await bond("KR2YT=RR"), y3 = await bond("KR3YT=RR");
  const base = baseRow ? num(baseRow.closePrice) : null;
  if (base == null) return null;
  const cd91 = cdRow ? num(cdRow.closePrice) : null;
  const r3 = (x) => (x == null ? null : Math.round(x * 1000) / 1000);
  const e3 = cd91 != null ? cd91 - PREM.cd91.mean : null;
  const e12 = y1 && y1.v != null ? y1.v - PREM.y1.mean : null;
  return {
    asOf: (y1 && y1.at) || (cdRow && (cdRow.localTradedAt || "").slice(0, 10)) || new Date().toISOString().slice(0, 10),
    base, call: callRow ? num(callRow.closePrice) : null, cd91, y1: y1 && y1.v, y2: y2 && y2.v, y3: y3 && y3.v,
    exp3m: e3 == null ? null : { rate: r3(e3), chg: r3(e3 - base), sd: PREM.cd91.sd, label: label(e3 - base, PREM.cd91.sd, "3개월") },
    exp12m: e12 == null ? null : { rate: r3(e12), chg: r3(e12 - base), sd: PREM.y1.sd, label: label(e12 - base, PREM.y1.sd, "1년") },
    source: "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)",
  };
}

module.exports = { bokPath, PREM };

if (require.main === module) bokPath().then((r) => console.log(JSON.stringify(r, null, 1)));
