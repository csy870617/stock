// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-07-22",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.66",
  "curve": "0.91",
  "vix": "16.6",
  "hyg20": "-0.4",
  "dxy": "101.1",
  "usdkrw": "1476"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "shortScore": -0.08,
  "midScore": -0.14,
  "drivers": [
   "10Y 추세 (−2)",
   "일드커브 (+2)",
   "VIX 16.6 (·0)",
   "HY 신용(20d) (·0)"
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "신중",
  "shortScore": 0,
  "midScore": 0.09,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -26%)",
   "원/달러 추세 (+2)",
   "코스피 모멘텀(20d) (−2)",
   "글로벌 변동성 VIX (·0)",
   "글로벌 신용(20d) (·0)"
  ]
 }
};
