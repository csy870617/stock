// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-09-29",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "5.23",
  "curve": "1.14",
  "vix": "15.8",
  "hyg20": "-3.0",
  "dxy": "101.4",
  "usdkrw": "1356"
 },
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "shortScore": -0.54,
  "midScore": -0.33,
  "drivers": [
   "10Y 추세 (−2)",
   "HY 신용(20d) (−2)",
   "일드커브 (+2)",
   "VIX 15.8 (+1)"
  ]
 },
 "korea": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "shortScore": -0.1,
  "midScore": -0.26,
  "drivers": [
   "글로벌 신용(20d) (−2)",
   "코스피 모멘텀(20d) (+1)",
   "글로벌 변동성 VIX (+1)",
   "달러 추세 (−1)"
  ]
 }
};
