// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-14",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "5.15",
  "curve": "1.03",
  "vix": "19.3",
  "hyg20": "0.6",
  "dxy": "103.4",
  "usdkrw": "1334"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "shortScore": 0.21,
  "midScore": -0.57,
  "drivers": [
   "일드커브 (+2)",
   "10Y 추세 (−1)",
   "HY 신용(20d) (+1)",
   "달러 추세 (−1)"
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "shortScore": -0.46,
  "midScore": -0.59,
  "drivers": [
   "코스피 모멘텀(20d) (−2)",
   "글로벌 신용(20d) (+1)",
   "달러 추세 (−1)",
   "원/달러 추세 (·0)"
  ]
 },
 "fed": {
  "asOf": "2026-11-13",
  "current": 3.878,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.149,
    "stepBp": 27.1,
    "cumBp": 27.1,
    "outcomes": [
     {
      "n": 1,
      "p": 92
     },
     {
      "n": 2,
      "p": 8
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.32,
    "stepBp": 17.1,
    "cumBp": 44.2,
    "outcomes": [
     {
      "n": 2,
      "p": 77
     },
     {
      "n": 1,
      "p": 23
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.486,
    "stepBp": 16.6,
    "cumBp": 60.9,
    "outcomes": [
     {
      "n": 2,
      "p": 56
     },
     {
      "n": 3,
      "p": 44
     }
    ]
   },
   {
    "date": "2027-04-28",
    "rate": 4.57,
    "stepBp": 8.4,
    "cumBp": 69.2,
    "outcomes": [
     {
      "n": 3,
      "p": 77
     },
     {
      "n": 2,
      "p": 23
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.677,
    "stepBp": 10.7,
    "cumBp": 80,
    "outcomes": [
     {
      "n": 3,
      "p": 80
     },
     {
      "n": 4,
      "p": 20
     }
    ]
   },
   {
    "date": "2027-07-28",
    "rate": 4.715,
    "stepBp": 3.8,
    "cumBp": 83.7,
    "outcomes": [
     {
      "n": 3,
      "p": 65
     },
     {
      "n": 4,
      "p": 35
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.745,
    "stepBp": 3,
    "cumBp": 86.8,
    "outcomes": [
     {
      "n": 3,
      "p": 53
     },
     {
      "n": 4,
      "p": 47
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-13",
  "base": 3,
  "call": 3.061,
  "cd91": 3.37,
  "y1": 3.639,
  "y2": 3.75,
  "y3": 3.756,
  "exp3m": {
   "rate": 3.19,
   "chg": 0.19,
   "sd": 0.15,
   "label": "3개월 동결 우세 — 인상 쪽으로 기움"
  },
  "exp12m": {
   "rate": 3.589,
   "chg": 0.589,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 2.4회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-11-12",
   "policy": 3.88,
   "forecasts": [
    {
     "h": 3,
     "rate": 4.31,
     "chg": 0.43,
     "rmse": 0.33,
     "noChangeRmse": 0.47,
     "market": 4.14
    },
    {
     "h": 6,
     "rate": 4.68,
     "chg": 0.8,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.3
    },
    {
     "h": 12,
     "rate": 5.16,
     "chg": 1.28,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.65
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
