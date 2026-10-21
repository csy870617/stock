// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-10-21",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "5.12",
  "curve": "1.04",
  "vix": "17.3",
  "hyg20": "-1.9",
  "dxy": "101.7",
  "usdkrw": "1330"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "shortScore": -0.29,
  "midScore": -0.24,
  "drivers": [
   "일드커브 (+2)",
   "10Y 추세 (−1)",
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
   "⚠ 코스피 급락 floor 발동 (20일 -15%)",
   "원/달러 추세 (+2)",
   "코스피 모멘텀(20d) (−2)",
   "글로벌 신용(20d) (−1)",
   "달러 추세 (−1)"
  ]
 },
 "fed": {
  "asOf": "2026-10-21",
  "current": 3.882,
  "meetings": [
   {
    "date": "2026-10-28",
    "rate": 3.915,
    "stepBp": 3.3,
    "cumBp": 3.3,
    "outcomes": [
     {
      "n": 0,
      "p": 87
     },
     {
      "n": 1,
      "p": 13
     }
    ]
   },
   {
    "date": "2026-12-09",
    "rate": 4.14,
    "stepBp": 22.5,
    "cumBp": 25.9,
    "outcomes": [
     {
      "n": 1,
      "p": 96
     },
     {
      "n": 2,
      "p": 4
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.25,
    "stepBp": 11,
    "cumBp": 36.8,
    "outcomes": [
     {
      "n": 1,
      "p": 53
     },
     {
      "n": 2,
      "p": 47
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.416,
    "stepBp": 16.6,
    "cumBp": 53.4,
    "outcomes": [
     {
      "n": 2,
      "p": 86
     },
     {
      "n": 3,
      "p": 14
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.515,
    "stepBp": 9.9,
    "cumBp": 63.3,
    "outcomes": [
     {
      "n": 3,
      "p": 53
     },
     {
      "n": 2,
      "p": 47
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.608,
    "stepBp": 9.3,
    "cumBp": 72.6,
    "outcomes": [
     {
      "n": 3,
      "p": 90
     },
     {
      "n": 2,
      "p": 10
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.64,
    "stepBp": 3.2,
    "cumBp": 75.8,
    "outcomes": [
     {
      "n": 3,
      "p": 97
     },
     {
      "n": 4,
      "p": 3
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-10-21",
  "base": 3,
  "call": 3.03,
  "cd91": 3.26,
  "y1": 3.602,
  "y2": 3.782,
  "y3": 3.832,
  "exp3m": {
   "rate": 3.08,
   "chg": 0.08,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.552,
   "chg": 0.552,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.2회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-10-19",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.27,
     "chg": 0.39,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.1
    },
    {
     "h": 6,
     "rate": 4.56,
     "chg": 0.68,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.23
    },
    {
     "h": 12,
     "rate": 4.84,
     "chg": 0.96,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.5
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
