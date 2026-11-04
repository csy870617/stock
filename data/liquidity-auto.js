// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-04",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.95",
  "curve": "0.93",
  "vix": "20.8",
  "hyg20": "-0.4",
  "dxy": "101.8",
  "usdkrw": "1345"
 },
 "us": {
  "shortTerm": "우호",
  "midTerm": "부정",
  "shortScore": 0.75,
  "midScore": -0.61,
  "drivers": [
   "10Y 추세 (+2)",
   "일드커브 (+2)",
   "VIX 20.8 (·0)",
   "HY 신용(20d) (·0)"
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "shortScore": -0.48,
  "midScore": -0.59,
  "drivers": [
   "코스피 모멘텀(20d) (−2)",
   "원/달러 추세 (·0)",
   "글로벌 변동성 VIX (·0)",
   "글로벌 신용(20d) (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-11-04",
  "current": 3.88,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.07,
    "stepBp": 19,
    "cumBp": 19,
    "outcomes": [
     {
      "n": 1,
      "p": 76
     },
     {
      "n": 0,
      "p": 24
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.13,
    "stepBp": 6,
    "cumBp": 25,
    "outcomes": [
     {
      "n": 1,
      "p": 100
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.263,
    "stepBp": 13.3,
    "cumBp": 38.3,
    "outcomes": [
     {
      "n": 2,
      "p": 53
     },
     {
      "n": 1,
      "p": 47
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.33,
    "stepBp": 6.7,
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
    "date": "2027-06-09",
    "rate": 4.416,
    "stepBp": 8.6,
    "cumBp": 53.6,
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
    "date": "2027-07-28",
    "rate": 4.435,
    "stepBp": 1.9,
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
    "date": "2027-09-15",
    "rate": 4.465,
    "stepBp": 3,
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
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-03",
  "base": 3,
  "call": 3.041,
  "cd91": 3.34,
  "y1": 3.553,
  "y2": 3.694,
  "y3": 3.726,
  "exp3m": {
   "rate": 3.16,
   "chg": 0.16,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.503,
   "chg": 0.503,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.0회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-11-02",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.19,
     "chg": 0.31,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.03
    },
    {
     "h": 6,
     "rate": 4.41,
     "chg": 0.53,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.14
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
    "rate": 4.56,
    "infl": 3.12,
    "inflAt": "2026-09",
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
    "rate": 4.9,
    "infl": 2.78,
    "inflAt": "2026-10",
    "unemp": 2.7,
    "ustar": 3.32
   }
  }
 }
};
