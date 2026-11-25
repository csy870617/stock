// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-25",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.90",
  "curve": "0.74",
  "vix": "26.4",
  "hyg20": "-1.0",
  "dxy": "103.8",
  "usdkrw": "1341"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "shortScore": -0.25,
  "midScore": -1.14,
  "drivers": [
   "VIX 26.4 (−1)",
   "10Y 추세 (+1)",
   "HY 신용(20d) (−1)",
   "달러 추세 (−1)"
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "부정",
  "shortScore": -1.24,
  "midScore": -1.15,
  "drivers": [
   "코스피 모멘텀(20d) (−2)",
   "원/달러 추세 (−1)",
   "글로벌 변동성 VIX (−1)",
   "글로벌 신용(20d) (−1)"
  ]
 },
 "fed": {
  "asOf": "2026-11-25",
  "current": 3.88,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.12,
    "stepBp": 24,
    "cumBp": 24,
    "outcomes": [
     {
      "n": 1,
      "p": 96
     },
     {
      "n": 0,
      "p": 4
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.275,
    "stepBp": 15.5,
    "cumBp": 39.5,
    "outcomes": [
     {
      "n": 2,
      "p": 58
     },
     {
      "n": 1,
      "p": 42
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.419,
    "stepBp": 14.4,
    "cumBp": 53.9,
    "outcomes": [
     {
      "n": 2,
      "p": 84
     },
     {
      "n": 3,
      "p": 16
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.465,
    "stepBp": 4.6,
    "cumBp": 58.5,
    "outcomes": [
     {
      "n": 2,
      "p": 66
     },
     {
      "n": 3,
      "p": 34
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.529,
    "stepBp": 6.4,
    "cumBp": 64.9,
    "outcomes": [
     {
      "n": 3,
      "p": 60
     },
     {
      "n": 2,
      "p": 40
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.52,
    "stepBp": -0.9,
    "cumBp": 64,
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
    "date": "2027-09-15",
    "rate": 4.51,
    "stepBp": -1,
    "cumBp": 63,
    "outcomes": [
     {
      "n": 3,
      "p": 52
     },
     {
      "n": 2,
      "p": 48
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-24",
  "base": 3,
  "call": 3.096,
  "cd91": 3.39,
  "y1": 3.65,
  "y2": 3.632,
  "y3": 3.582,
  "exp3m": {
   "rate": 3.21,
   "chg": 0.21,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.6,
   "chg": 0.6,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.4회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-11-23",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.35,
     "chg": 0.47,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.18
    },
    {
     "h": 6,
     "rate": 4.73,
     "chg": 0.85,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.33
    },
    {
     "h": 12,
     "rate": 4.99,
     "chg": 1.11,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.57
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
