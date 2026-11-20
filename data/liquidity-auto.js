// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-20",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "5.05",
  "curve": "0.91",
  "vix": "28.4",
  "hyg20": "-0.2",
  "dxy": "103.9",
  "usdkrw": "1330"
 },
 "us": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "shortScore": -0.46,
  "midScore": -1.02,
  "drivers": [
   "VIX 28.4 (−2)",
   "일드커브 (+2)",
   "10Y 추세 (−1)",
   "달러 추세 (−1)"
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "shortScore": -1,
  "midScore": -1.04,
  "drivers": [
   "코스피 모멘텀(20d) (−2)",
   "글로벌 변동성 VIX (−2)",
   "달러 추세 (−1)",
   "원/달러 추세 (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-11-20",
  "current": 3.882,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.133,
    "stepBp": 25,
    "cumBp": 25,
    "outcomes": [
     {
      "n": 1,
      "p": 100
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.29,
    "stepBp": 15.7,
    "cumBp": 40.8,
    "outcomes": [
     {
      "n": 2,
      "p": 63
     },
     {
      "n": 1,
      "p": 37
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.445,
    "stepBp": 15.5,
    "cumBp": 56.3,
    "outcomes": [
     {
      "n": 2,
      "p": 75
     },
     {
      "n": 3,
      "p": 25
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.495,
    "stepBp": 5,
    "cumBp": 61.3,
    "outcomes": [
     {
      "n": 2,
      "p": 55
     },
     {
      "n": 3,
      "p": 45
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.566,
    "stepBp": 7.1,
    "cumBp": 68.4,
    "outcomes": [
     {
      "n": 3,
      "p": 74
     },
     {
      "n": 2,
      "p": 26
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.59,
    "stepBp": 2.4,
    "cumBp": 70.7,
    "outcomes": [
     {
      "n": 3,
      "p": 83
     },
     {
      "n": 2,
      "p": 17
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.6,
    "stepBp": 1,
    "cumBp": 71.8,
    "outcomes": [
     {
      "n": 3,
      "p": 87
     },
     {
      "n": 2,
      "p": 13
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-20",
  "base": 3,
  "call": 3.074,
  "cd91": 3.38,
  "y1": 3.598,
  "y2": 3.69,
  "y3": 3.667,
  "exp3m": {
   "rate": 3.2,
   "chg": 0.2,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.548,
   "chg": 0.548,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.2회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-11-18",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.33,
     "chg": 0.45,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.16
    },
    {
     "h": 6,
     "rate": 4.69,
     "chg": 0.81,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.31
    },
    {
     "h": 12,
     "rate": 5.1,
     "chg": 1.22,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.62
    }
   ],
   "taylor": {
    "rate": 4.76,
    "infl": 3.12,
    "inflAt": "2026-09",
    "unemp": 4.1,
    "ustar": 4.39
   }
  },
  "korea": {
   "policy": 3,
   "forecasts": [
    {
     "h": 3,
     "rate": 3,
     "chg": 0,
     "rmse": 0.34,
     "method": "변화 없음"
    },
    {
     "h": 6,
     "rate": 3,
     "chg": 0,
     "rmse": 0.43,
     "method": "변화 없음"
    },
    {
     "h": 12,
     "rate": 3,
     "chg": 0,
     "rmse": 0.94,
     "method": "변화 없음"
    }
   ],
   "taylor": {
    "rate": 5.08,
    "infl": 2.78,
    "inflAt": "2026-10",
    "unemp": 2.6,
    "ustar": 3.31
   }
  }
 }
};
