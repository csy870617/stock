// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-21",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.91",
  "curve": "0.79",
  "vix": "35.9",
  "hyg20": "-0.4",
  "dxy": "103.8",
  "usdkrw": "1335"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "매우 부정",
  "shortScore": -0.21,
  "midScore": -1.27,
  "drivers": [
   "VIX 35.9 (−2)",
   "10Y 추세 (+1)",
   "달러 추세 (−1)",
   "일드커브 (+1)"
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
  "current": 3.88,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.112,
    "stepBp": 23.3,
    "cumBp": 23.3,
    "outcomes": [
     {
      "n": 1,
      "p": 93
     },
     {
      "n": 0,
      "p": 7
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.265,
    "stepBp": 15.3,
    "cumBp": 38.5,
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
    "rate": 4.398,
    "stepBp": 13.3,
    "cumBp": 51.8,
    "outcomes": [
     {
      "n": 2,
      "p": 93
     },
     {
      "n": 3,
      "p": 7
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.435,
    "stepBp": 3.7,
    "cumBp": 55.5,
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
    "date": "2027-06-09",
    "rate": 4.492,
    "stepBp": 5.7,
    "cumBp": 61.2,
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
    "date": "2027-07-28",
    "rate": 4.505,
    "stepBp": 1.3,
    "cumBp": 62.5,
    "outcomes": [
     {
      "n": 2,
      "p": 50
     },
     {
      "n": 3,
      "p": 50
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.515,
    "stepBp": 1,
    "cumBp": 63.5,
    "outcomes": [
     {
      "n": 3,
      "p": 54
     },
     {
      "n": 2,
      "p": 46
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
  "y3": 3.642,
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
   "asOf": "2026-11-19",
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
