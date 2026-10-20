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
  "dxy": "102.0",
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
  "current": 3.878,
  "meetings": [
   {
    "date": "2026-10-28",
    "rate": 3.925,
    "stepBp": 4.7,
    "cumBp": 4.7,
    "outcomes": [
     {
      "n": 0,
      "p": 81
     },
     {
      "n": 1,
      "p": 19
     }
    ]
   },
   {
    "date": "2026-12-09",
    "rate": 4.143,
    "stepBp": 21.8,
    "cumBp": 26.5,
    "outcomes": [
     {
      "n": 1,
      "p": 94
     },
     {
      "n": 2,
      "p": 6
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.255,
    "stepBp": 11.2,
    "cumBp": 37.7,
    "outcomes": [
     {
      "n": 2,
      "p": 51
     },
     {
      "n": 1,
      "p": 49
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.432,
    "stepBp": 17.7,
    "cumBp": 55.4,
    "outcomes": [
     {
      "n": 2,
      "p": 78
     },
     {
      "n": 3,
      "p": 22
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.52,
    "stepBp": 8.8,
    "cumBp": 64.2,
    "outcomes": [
     {
      "n": 3,
      "p": 57
     },
     {
      "n": 2,
      "p": 43
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.606,
    "stepBp": 8.6,
    "cumBp": 72.8,
    "outcomes": [
     {
      "n": 3,
      "p": 91
     },
     {
      "n": 2,
      "p": 9
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.63,
    "stepBp": 2.4,
    "cumBp": 75.2,
    "outcomes": [
     {
      "n": 3,
      "p": 99
     },
     {
      "n": 4,
      "p": 1
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-10-20",
  "base": 3,
  "call": 3.036,
  "cd91": 3.25,
  "y1": 3.614,
  "y2": 3.821,
  "y3": 3.866,
  "exp3m": {
   "rate": 3.07,
   "chg": 0.07,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.564,
   "chg": 0.564,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.3회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 }
};
