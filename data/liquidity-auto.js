// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-08-14",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.70",
  "curve": "1.00",
  "vix": "14.3",
  "hyg20": "0.1",
  "dxy": "99.6",
  "usdkrw": "1416"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "shortScore": 0.29,
  "midScore": 0.35,
  "drivers": [
   "10Y 추세 (−2)",
   "일드커브 (+2)",
   "VIX 14.3 (+1)",
   "달러 추세 (+1)"
  ]
 },
 "korea": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "shortScore": 0.34,
  "midScore": 0.13,
  "drivers": [
   "원/달러 추세 (+2)",
   "코스피 모멘텀(20d) (−2)",
   "글로벌 변동성 VIX (+1)",
   "달러 추세 (+1)"
  ]
 }
};
