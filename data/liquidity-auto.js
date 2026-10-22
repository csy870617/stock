// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-10-22",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "5.15",
  "curve": "1.08",
  "vix": "16.7",
  "hyg20": "-1.0",
  "dxy": "101.8",
  "usdkrw": "1324"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "shortScore": 0.08,
  "midScore": -0.24,
  "drivers": [
   "일드커브 (+2)",
   "HY 신용(20d) (−1)",
   "VIX 16.7 (·0)",
   "10Y 추세 (·0)"
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "신중",
  "shortScore": -0.42,
  "midScore": -0.2,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -20%)",
   "코스피 모멘텀(20d) (−2)",
   "원/달러 추세 (+1)",
   "글로벌 신용(20d) (−1)",
   "글로벌 변동성 VIX (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-10-22",
  "current": 3.88,
  "meetings": [
   {
    "date": "2026-10-28",
    "rate": 3.91,
    "stepBp": 3,
    "cumBp": 3,
    "outcomes": [
     {
      "n": 0,
      "p": 88
     },
     {
      "n": 1,
      "p": 12
     }
    ]
   },
   {
    "date": "2026-12-09",
    "rate": 4.114,
    "stepBp": 20.4,
    "cumBp": 23.5,
    "outcomes": [
     {
      "n": 1,
      "p": 94
     },
     {
      "n": 0,
      "p": 6
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.22,
    "stepBp": 10.6,
    "cumBp": 34,
    "outcomes": [
     {
      "n": 1,
      "p": 64
     },
     {
      "n": 2,
      "p": 36
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.386,
    "stepBp": 16.6,
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
    "rate": 4.47,
    "stepBp": 8.4,
    "cumBp": 59,
    "outcomes": [
     {
      "n": 2,
      "p": 64
     },
     {
      "n": 3,
      "p": 36
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.563,
    "stepBp": 9.3,
    "cumBp": 68.3,
    "outcomes": [
     {
      "n": 3,
      "p": 73
     },
     {
      "n": 2,
      "p": 27
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.59,
    "stepBp": 2.7,
    "cumBp": 71,
    "outcomes": [
     {
      "n": 3,
      "p": 84
     },
     {
      "n": 2,
      "p": 16
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-10-22",
  "base": 3,
  "call": 3.03,
  "cd91": 3.26,
  "y1": 3.59,
  "y2": 3.777,
  "y3": 3.84,
  "exp3m": {
   "rate": 3.08,
   "chg": 0.08,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.54,
   "chg": 0.54,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.2회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-10-20",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.24,
     "chg": 0.36,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.08
    },
    {
     "h": 6,
     "rate": 4.54,
     "chg": 0.66,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.22
    },
    {
     "h": 12,
     "rate": 4.86,
     "chg": 0.98,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.51
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
