// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-10-23",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.99",
  "curve": "0.96",
  "vix": "19.5",
  "hyg20": "-0.6",
  "dxy": "101.6",
  "usdkrw": "1326"
 },
 "us": {
  "shortTerm": "우호",
  "midTerm": "신중",
  "shortScore": 0.5,
  "midScore": -0.24,
  "drivers": [
   "10Y 추세 (+2)",
   "일드커브 (+2)",
   "HY 신용(20d) (−1)",
   "VIX 19.5 (·0)"
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "신중",
  "shortScore": -0.42,
  "midScore": -0.2,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -21%)",
   "코스피 모멘텀(20d) (−2)",
   "원/달러 추세 (+1)",
   "글로벌 신용(20d) (−1)",
   "글로벌 변동성 VIX (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-10-23",
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
    "rate": 4.09,
    "stepBp": 19,
    "cumBp": 21,
    "outcomes": [
     {
      "n": 1,
      "p": 84
     },
     {
      "n": 0,
      "p": 16
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.18,
    "stepBp": 9,
    "cumBp": 29.9,
    "outcomes": [
     {
      "n": 1,
      "p": 80
     },
     {
      "n": 2,
      "p": 20
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.313,
    "stepBp": 13.3,
    "cumBp": 43.2,
    "outcomes": [
     {
      "n": 2,
      "p": 73
     },
     {
      "n": 1,
      "p": 27
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.405,
    "stepBp": 9.2,
    "cumBp": 52.4,
    "outcomes": [
     {
      "n": 2,
      "p": 90
     },
     {
      "n": 3,
      "p": 10
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.498,
    "stepBp": 9.3,
    "cumBp": 61.7,
    "outcomes": [
     {
      "n": 2,
      "p": 53
     },
     {
      "n": 3,
      "p": 47
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.525,
    "stepBp": 2.7,
    "cumBp": 64.4,
    "outcomes": [
     {
      "n": 3,
      "p": 58
     },
     {
      "n": 2,
      "p": 42
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-10-23",
  "base": 3,
  "call": 3.032,
  "cd91": 3.26,
  "y1": 3.573,
  "y2": 3.755,
  "y3": 3.816,
  "exp3m": {
   "rate": 3.08,
   "chg": 0.08,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.523,
   "chg": 0.523,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.1회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-10-22",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.2,
     "chg": 0.32,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.04
    },
    {
     "h": 6,
     "rate": 4.44,
     "chg": 0.56,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.16
    },
    {
     "h": 12,
     "rate": 4.64,
     "chg": 0.76,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.41
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
