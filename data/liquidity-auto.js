// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-12",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "5.00",
  "curve": "0.88",
  "vix": "17.5",
  "hyg20": "1.2",
  "dxy": "102.9",
  "usdkrw": "1342"
 },
 "us": {
  "shortTerm": "우호",
  "midTerm": "부정",
  "shortScore": 1,
  "midScore": -0.57,
  "drivers": [
   "10Y 추세 (+2)",
   "일드커브 (+2)",
   "HY 신용(20d) (+1)",
   "VIX 17.5 (·0)"
  ]
 },
 "korea": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "shortScore": -0.3,
  "midScore": -0.59,
  "drivers": [
   "코스피 모멘텀(20d) (−2)",
   "글로벌 신용(20d) (+1)",
   "원/달러 추세 (·0)",
   "글로벌 변동성 VIX (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-11-12",
  "current": 3.882,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.154,
    "stepBp": 27.1,
    "cumBp": 27.1,
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
    "rate": 4.325,
    "stepBp": 17.1,
    "cumBp": 44.2,
    "outcomes": [
     {
      "n": 2,
      "p": 77
     },
     {
      "n": 1,
      "p": 23
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.458,
    "stepBp": 13.3,
    "cumBp": 57.5,
    "outcomes": [
     {
      "n": 2,
      "p": 70
     },
     {
      "n": 3,
      "p": 30
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.54,
    "stepBp": 8.2,
    "cumBp": 65.8,
    "outcomes": [
     {
      "n": 3,
      "p": 63
     },
     {
      "n": 2,
      "p": 37
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.619,
    "stepBp": 7.9,
    "cumBp": 73.6,
    "outcomes": [
     {
      "n": 3,
      "p": 94
     },
     {
      "n": 2,
      "p": 6
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.645,
    "stepBp": 2.6,
    "cumBp": 76.2,
    "outcomes": [
     {
      "n": 3,
      "p": 95
     },
     {
      "n": 4,
      "p": 5
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.655,
    "stepBp": 1,
    "cumBp": 77.3,
    "outcomes": [
     {
      "n": 3,
      "p": 91
     },
     {
      "n": 4,
      "p": 9
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-12",
  "base": 3,
  "call": 2.974,
  "cd91": 3.37,
  "y1": 3.645,
  "y2": 3.729,
  "y3": 3.729,
  "exp3m": {
   "rate": 3.19,
   "chg": 0.19,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.595,
   "chg": 0.595,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.4회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-11-09",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.22,
     "chg": 0.34,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.06
    },
    {
     "h": 6,
     "rate": 4.42,
     "chg": 0.54,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.15
    },
    {
     "h": 12,
     "rate": 4.58,
     "chg": 0.7,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.38
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
    "rate": 4.9,
    "infl": 2.78,
    "inflAt": "2026-10",
    "unemp": 2.7,
    "ustar": 3.32
   }
  }
 }
};
