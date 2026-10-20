// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-10-20",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "5.14",
  "curve": "1.06",
  "vix": "18.4",
  "hyg20": "-1.9",
  "dxy": "101.8",
  "usdkrw": "1333"
 },
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "shortScore": -0.5,
  "midScore": -0.24,
  "drivers": [
   "10Y 추세 (−2)",
   "일드커브 (+2)",
   "HY 신용(20d) (−1)",
   "달러 추세 (−1)"
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "shortScore": -0.34,
  "midScore": -0.2,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -13%)",
   "원/달러 추세 (+2)",
   "코스피 모멘텀(20d) (−2)",
   "글로벌 신용(20d) (−1)",
   "달러 추세 (−1)"
  ]
 },
 "fed": {
  "asOf": "2026-10-20",
  "current": 3.881,
  "meetings": [
   {
    "date": "2026-10-28",
    "rate": 3.925,
    "stepBp": 4.4,
    "cumBp": 4.4,
    "outcomes": [
     {
      "n": 0,
      "p": 82
     },
     {
      "n": 1,
      "p": 18
     }
    ]
   },
   {
    "date": "2026-12-09",
    "rate": 4.15,
    "stepBp": 22.5,
    "cumBp": 27,
    "outcomes": [
     {
      "n": 1,
      "p": 92
     },
     {
      "n": 2,
      "p": 8
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.265,
    "stepBp": 11.5,
    "cumBp": 38.4,
    "outcomes": [
     {
      "n": 2,
      "p": 54
     },
     {
      "n": 1,
      "p": 46
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.431,
    "stepBp": 16.6,
    "cumBp": 55,
    "outcomes": [
     {
      "n": 2,
      "p": 80
     },
     {
      "n": 3,
      "p": 20
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.52,
    "stepBp": 8.9,
    "cumBp": 63.9,
    "outcomes": [
     {
      "n": 3,
      "p": 56
     },
     {
      "n": 2,
      "p": 44
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.613,
    "stepBp": 9.3,
    "cumBp": 73.2,
    "outcomes": [
     {
      "n": 3,
      "p": 93
     },
     {
      "n": 2,
      "p": 7
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.635,
    "stepBp": 2.2,
    "cumBp": 75.4,
    "outcomes": [
     {
      "n": 3,
      "p": 98
     },
     {
      "n": 4,
      "p": 2
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 }
};
