// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-10-28",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.99",
  "curve": "0.95",
  "vix": "17.5",
  "hyg20": "0.8",
  "dxy": "102.3",
  "usdkrw": "1325"
 },
 "us": {
  "shortTerm": "우호",
  "midTerm": "부정",
  "shortScore": 1,
  "midScore": -0.41,
  "drivers": [
   "10Y 추세 (+2)",
   "일드커브 (+2)",
   "HY 신용(20d) (+1)",
   "VIX 17.5 (·0)"
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "우호",
  "shortScore": -0.06,
  "midScore": 0.57,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -13%)",
   "코스피 모멘텀(20d) (−2)",
   "원/달러 추세 (+1)",
   "글로벌 신용(20d) (+1)",
   "글로벌 변동성 VIX (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-10-28",
  "current": 3.881,
  "meetings": [
   {
    "date": "2026-10-28",
    "rate": 3.9,
    "stepBp": 1.9,
    "cumBp": 1.9,
    "outcomes": [
     {
      "n": 0,
      "p": 92
     },
     {
      "n": 1,
      "p": 8
     }
    ]
   },
   {
    "date": "2026-12-09",
    "rate": 4.111,
    "stepBp": 21.1,
    "cumBp": 23.1,
    "outcomes": [
     {
      "n": 1,
      "p": 92
     },
     {
      "n": 0,
      "p": 8
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.21,
    "stepBp": 9.9,
    "cumBp": 32.9,
    "outcomes": [
     {
      "n": 1,
      "p": 68
     },
     {
      "n": 2,
      "p": 32
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.387,
    "stepBp": 17.7,
    "cumBp": 50.7,
    "outcomes": [
     {
      "n": 2,
      "p": 97
     },
     {
      "n": 3,
      "p": 3
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.475,
    "stepBp": 8.8,
    "cumBp": 59.4,
    "outcomes": [
     {
      "n": 2,
      "p": 62
     },
     {
      "n": 3,
      "p": 38
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.575,
    "stepBp": 10,
    "cumBp": 69.4,
    "outcomes": [
     {
      "n": 3,
      "p": 78
     },
     {
      "n": 2,
      "p": 22
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.61,
    "stepBp": 3.5,
    "cumBp": 72.9,
    "outcomes": [
     {
      "n": 3,
      "p": 92
     },
     {
      "n": 2,
      "p": 8
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-10-28",
  "base": 3,
  "call": 2.995,
  "cd91": 3.27,
  "y1": 3.582,
  "y2": 3.772,
  "y3": 3.8,
  "exp3m": {
   "rate": 3.09,
   "chg": 0.09,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.532,
   "chg": 0.532,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.1회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-10-26",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.21,
     "chg": 0.33,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.05
    },
    {
     "h": 6,
     "rate": 4.52,
     "chg": 0.64,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.21
    },
    {
     "h": 12,
     "rate": 4.77,
     "chg": 0.89,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.47
    }
   ],
   "taylor": {
    "rate": 4.39,
    "infl": 3.01,
    "inflAt": "2026-08",
    "unemp": 4.2,
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
    "rate": 4.83,
    "infl": 2.73,
    "inflAt": "2026-09",
    "unemp": 2.7,
    "ustar": 3.32
   }
  }
 }
};
