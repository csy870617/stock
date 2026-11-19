// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-19",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "5.07",
  "curve": "0.92",
  "vix": "24.6",
  "hyg20": "0.1",
  "dxy": "103.9",
  "usdkrw": "1333"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "shortScore": 0.17,
  "midScore": -0.9,
  "drivers": [
   "일드커브 (+2)",
   "VIX 24.6 (−1)",
   "10Y 추세 (+1)",
   "달러 추세 (−1)"
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "shortScore": -0.82,
  "midScore": -0.91,
  "drivers": [
   "코스피 모멘텀(20d) (−2)",
   "글로벌 변동성 VIX (−1)",
   "달러 추세 (−1)",
   "원/달러 추세 (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-11-19",
  "current": 3.88,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.155,
    "stepBp": 27.5,
    "cumBp": 27.5,
    "outcomes": [
     {
      "n": 1,
      "p": 90
     },
     {
      "n": 2,
      "p": 10
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.33,
    "stepBp": 17.5,
    "cumBp": 45,
    "outcomes": [
     {
      "n": 2,
      "p": 80
     },
     {
      "n": 1,
      "p": 20
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.507,
    "stepBp": 17.7,
    "cumBp": 62.7,
    "outcomes": [
     {
      "n": 3,
      "p": 51
     },
     {
      "n": 2,
      "p": 49
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.57,
    "stepBp": 6.3,
    "cumBp": 69,
    "outcomes": [
     {
      "n": 3,
      "p": 76
     },
     {
      "n": 2,
      "p": 24
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.656,
    "stepBp": 8.6,
    "cumBp": 77.6,
    "outcomes": [
     {
      "n": 3,
      "p": 90
     },
     {
      "n": 4,
      "p": 10
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.685,
    "stepBp": 2.9,
    "cumBp": 80.5,
    "outcomes": [
     {
      "n": 3,
      "p": 78
     },
     {
      "n": 4,
      "p": 22
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.705,
    "stepBp": 2,
    "cumBp": 82.5,
    "outcomes": [
     {
      "n": 3,
      "p": 70
     },
     {
      "n": 4,
      "p": 30
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-18",
  "base": 3,
  "call": 3.062,
  "cd91": 3.37,
  "y1": 3.642,
  "y2": 3.725,
  "y3": 3.721,
  "exp3m": {
   "rate": 3.19,
   "chg": 0.19,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.592,
   "chg": 0.592,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.4회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-11-17",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.32,
     "chg": 0.44,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.15
    },
    {
     "h": 6,
     "rate": 4.66,
     "chg": 0.78,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.29
    },
    {
     "h": 12,
     "rate": 5.05,
     "chg": 1.17,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.6
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
