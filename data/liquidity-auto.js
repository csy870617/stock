// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-08-04",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.63",
  "curve": "0.90",
  "vix": "16.5",
  "hyg20": "-0.3",
  "dxy": "99.9",
  "usdkrw": "1430"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "shortScore": 0.29,
  "midScore": 0.06,
  "drivers": [
   "일드커브 (+2)",
   "10Y 추세 (−1)",
   "달러 추세 (+1)",
   "VIX 16.5 (·0)"
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "신중",
  "shortScore": 0.16,
  "midScore": -0.2,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -23%)",
   "원/달러 추세 (+2)",
   "코스피 모멘텀(20d) (−2)",
   "달러 추세 (+1)",
   "글로벌 변동성 VIX (·0)"
  ]
 }
};
