// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)
// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.
// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.
window.LIQUIDITY_AUTO = {
 "asOf": "2026-11-27",
 "note": "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
 "inputs": {
  "us10y": "4.85",
  "curve": "0.69",
  "vix": "26.8",
  "hyg20": "-0.9",
  "dxy": "103.7",
  "usdkrw": "1343"
 },
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "shortScore": -0.04,
  "midScore": -1.14,
  "drivers": [
   "10Y 추세 (+2)",
   "VIX 26.8 (−1)",
   "HY 신용(20d) (−1)",
   "달러 추세 (−1)"
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "부정",
  "shortScore": -1,
  "midScore": -1.15,
  "drivers": [
   "⚠ 코스피 급락 floor 발동 (20일 -21%)",
   "코스피 모멘텀(20d) (−2)",
   "글로벌 변동성 VIX (−1)",
   "글로벌 신용(20d) (−1)",
   "달러 추세 (−1)"
  ]
 },
 "fed": {
  "asOf": "2026-11-27",
  "current": 3.878,
  "meetings": [
   {
    "date": "2026-12-09",
    "rate": 4.128,
    "stepBp": 25,
    "cumBp": 25,
    "outcomes": [
     {
      "n": 1,
      "p": 100
     }
    ]
   },
   {
    "date": "2027-01-27",
    "rate": 4.295,
    "stepBp": 16.7,
    "cumBp": 41.7,
    "outcomes": [
     {
      "n": 2,
      "p": 67
     },
     {
      "n": 1,
      "p": 33
     }
    ]
   },
   {
    "date": "2027-03-17",
    "rate": 4.461,
    "stepBp": 16.6,
    "cumBp": 58.4,
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
    "date": "2027-04-28",
    "rate": 4.515,
    "stepBp": 5.4,
    "cumBp": 63.7,
    "outcomes": [
     {
      "n": 3,
      "p": 55
     },
     {
      "n": 2,
      "p": 45
     }
    ]
   },
   {
    "date": "2027-06-09",
    "rate": 4.586,
    "stepBp": 7.1,
    "cumBp": 70.9,
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
   },
   {
    "date": "2027-07-28",
    "rate": 4.585,
    "stepBp": -0.1,
    "cumBp": 70.7,
    "outcomes": [
     {
      "n": 3,
      "p": 83
     },
     {
      "n": 2,
      "p": 17
     }
    ]
   },
   {
    "date": "2027-09-15",
    "rate": 4.575,
    "stepBp": -1,
    "cumBp": 69.8,
    "outcomes": [
     {
      "n": 3,
      "p": 79
     },
     {
      "n": 2,
      "p": 21
     }
    ]
   }
  ],
  "source": "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)"
 },
 "bok": {
  "asOf": "2026-11-26",
  "base": 3.25,
  "call": 3.321,
  "cd91": 3.4,
  "y1": 3.672,
  "y2": 3.694,
  "y3": 3.666,
  "exp3m": {
   "rate": 3.22,
   "chg": -0.03,
   "sd": 0.15,
   "label": "3개월 동결 기대"
  },
  "exp12m": {
   "rate": 3.622,
   "chg": 0.372,
   "sd": 0.17,
   "label": "1년 인상 기대 — 기간 평균 금리가 지금보다 인상 약 1.5회분 높다"
  },
  "source": "네이버 증권 — 한국은행 기준금리·콜·CD 91일·국고채 1~3년. 기대 금리 = 시장 금리 − 과거 평균 기간 프리미엄(CD 0.18%p·국고 1년 0.05%p)"
 },
 "rateModel": {
  "validatedAt": "2026-10-20",
  "us": {
   "asOf": "2026-11-24",
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
     "rate": 4.75,
     "chg": 0.87,
     "rmse": 0.52,
     "noChangeRmse": 0.86,
     "market": 4.34
    },
    {
     "h": 12,
     "rate": 5.03,
     "chg": 1.15,
     "rmse": 1.08,
     "noChangeRmse": 1.53,
     "market": 4.59
    }
   ],
   "taylor": {
    "rate": 4.97,
    "infl": 3.26,
    "inflAt": "2026-10",
    "unemp": 4.1,
    "ustar": 4.39
   }
  },
  "korea": {
   "policy": 3.25,
   "forecasts": [
    {
     "h": 3,
     "rate": 3.25,
     "chg": 0,
     "rmse": 0.34,
     "method": "변화 없음"
    },
    {
     "h": 6,
     "rate": 3.25,
     "chg": 0,
     "rmse": 0.43,
     "method": "변화 없음"
    },
    {
     "h": 12,
     "rate": 3.25,
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
