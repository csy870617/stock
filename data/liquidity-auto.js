// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-09",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.86",
  "curve": "0.86",
  "vix": "25.6",
  "hyg20": "0.0",
  "dxy": "102.3",
  "usdkrw": "1356"
 },
 "us": {
  "shortTerm": "우호",
  "midTerm": "부정",
  "shortScore": 0.54,
  "midScore": -0.73,
  "drivers": [
   "10Y 추세 (+2)",
   "일드커브 (+2)",
   "VIX 25.6 (−1)",
   "HY 신용(20d) (·0)"
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "부정",
  "shortScore": -0.66,
  "midScore": -0.72,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -21%)",
   "코스피 모멘텀(20d) (−2)",
   "글로벌 변동성 VIX (−1)",
   "원/달러 추세 (·0)",
   "글로벌 신용(20d) (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-11-09",
  "current": 3.878,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.078,
    "stepBp": 20.1,
    "cumBp": 20.1,
    "outcomes": [
     {
      "n": 1,
      "p": 80
     },
     {
      "n": 0,
      "p": 20
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.135,
    "stepBp": 5.7,
    "cumBp": 25.7,
    "outcomes": [
     {
      "n": 1,
      "p": 97
     },
     {
      "n": 2,
      "p": 3
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.246,
    "stepBp": 11.1,
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
    "date": "2027-04-28",
    "rate": 4.28,
    "stepBp": 3.4,
    "cumBp": 40.2,
    "outcomes": [
     {
      "n": 2,
      "p": 61
     },
     {
      "n": 1,
      "p": 39
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.337,
    "stepBp": 5.7,
    "cumBp": 46,
    "outcomes": [
     {
      "n": 2,
      "p": 84
     },
     {
      "n": 1,
      "p": 16
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.355,
    "stepBp": 1.8,
    "cumBp": 47.8,
    "outcomes": [
     {
      "n": 2,
      "p": 91
     },
     {
      "n": 1,
      "p": 9
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.315,
    "stepBp": -4,
    "cumBp": 43.7,
    "outcomes": [
     {
      "n": 2,
      "p": 75
     },
     {
      "n": 1,
      "p": 25
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-09",
  "base": 3,
  "call": 3.048,
  "cd91": 3.34,
  "y1": 3.602,
  "y2": 3.621,
  "y3": 3.634,
  "exp3m": {
   "rate": 3.16,
   "chg": 0.16,
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
   "asOf": "2026-11-05",
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
     "rate": 4.3,
     "chg": 0.42,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.08
    },
    {
     "h": 12,
     "rate": 4.36,
     "chg": 0.48,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.28
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
