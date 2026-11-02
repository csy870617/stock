// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-02",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.93",
  "curve": "0.96",
  "vix": "19.4",
  "hyg20": "0.7",
  "dxy": "101.9",
  "usdkrw": "1338"
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
   "VIX 19.4 (·0)"
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "shortScore": -0.06,
  "midScore": -0.39,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -16%)",
   "코스피 모멘텀(20d) (−2)",
   "원/달러 추세 (+1)",
   "글로벌 신용(20d) (+1)",
   "글로벌 변동성 VIX (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-11-02",
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
    "rate": 4.145,
    "stepBp": 7.5,
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
    "date": "2027-03-17",
    "rate": 4.289,
    "stepBp": 14.4,
    "cumBp": 40.9,
    "outcomes": [
     {
      "n": 2,
      "p": 64
     },
     {
      "n": 1,
      "p": 36
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.345,
    "stepBp": 5.6,
    "cumBp": 46.5,
    "outcomes": [
     {
      "n": 2,
      "p": 86
     },
     {
      "n": 1,
      "p": 14
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.438,
    "stepBp": 9.3,
    "cumBp": 55.8,
    "outcomes": [
     {
      "n": 2,
      "p": 77
     },
     {
      "n": 3,
      "p": 23
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.445,
    "stepBp": 0.7,
    "cumBp": 56.5,
    "outcomes": [
     {
      "n": 2,
      "p": 74
     },
     {
      "n": 3,
      "p": 26
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.465,
    "stepBp": 2,
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
  "asOf": "2026-11-02",
  "base": 3,
  "call": 3.051,
  "cd91": 3.32,
  "y1": 3.561,
  "y2": 3.717,
  "y3": 3.744,
  "exp3m": {
   "rate": 3.14,
   "chg": 0.14,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.511,
   "chg": 0.511,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.0회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-10-29",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.16,
     "chg": 0.28,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4
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
     "rate": 4.66,
     "chg": 0.78,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.42
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
    "rate": 4.83,
    "infl": 2.73,
    "inflAt": "2026-09",
    "unemp": 2.7,
    "ustar": 3.32
   }
  }
 }
};
