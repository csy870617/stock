// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-06",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.84",
  "curve": "0.85",
  "vix": "28.2",
  "hyg20": "0.2",
  "dxy": "101.6",
  "usdkrw": "1340"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "shortScore": 0.33,
  "midScore": -0.86,
  "drivers": [
   "VIX 28.2 (−2)",
   "10Y 추세 (+2)",
   "일드커브 (+2)",
   "HY 신용(20d) (·0)"
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "부정",
  "shortScore": -0.84,
  "midScore": -0.85,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -24%)",
   "코스피 모멘텀(20d) (−2)",
   "글로벌 변동성 VIX (−2)",
   "원/달러 추세 (·0)",
   "글로벌 신용(20d) (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-11-06",
  "current": 3.878,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.043,
    "stepBp": 16.6,
    "cumBp": 16.6,
    "outcomes": [
     {
      "n": 1,
      "p": 66
     },
     {
      "n": 0,
      "p": 34
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.08,
    "stepBp": 3.7,
    "cumBp": 20.2,
    "outcomes": [
     {
      "n": 1,
      "p": 81
     },
     {
      "n": 0,
      "p": 19
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.169,
    "stepBp": 8.9,
    "cumBp": 29.1,
    "outcomes": [
     {
      "n": 1,
      "p": 84
     },
     {
      "n": 2,
      "p": 16
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.2,
    "stepBp": 3.1,
    "cumBp": 32.2,
    "outcomes": [
     {
      "n": 1,
      "p": 71
     },
     {
      "n": 2,
      "p": 29
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.257,
    "stepBp": 5.7,
    "cumBp": 38,
    "outcomes": [
     {
      "n": 2,
      "p": 52
     },
     {
      "n": 1,
      "p": 48
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.27,
    "stepBp": 1.3,
    "cumBp": 39.2,
    "outcomes": [
     {
      "n": 2,
      "p": 57
     },
     {
      "n": 1,
      "p": 43
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.29,
    "stepBp": 2,
    "cumBp": 41.2,
    "outcomes": [
     {
      "n": 2,
      "p": 65
     },
     {
      "n": 1,
      "p": 35
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-05",
  "base": 3,
  "call": 3.048,
  "cd91": 3.34,
  "y1": 3.554,
  "y2": 3.601,
  "y3": 3.612,
  "exp3m": {
   "rate": 3.16,
   "chg": 0.16,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.504,
   "chg": 0.504,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.0회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-11-04",
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
     "rate": 4.6,
     "chg": 0.72,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.39
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
