// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 나스닥·다우·코스피·코스닥의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.
// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.
window.INDEX_TA = {
 "asOf": "2026-08-06",
 "builtAt": "2026-08-06T09:35:06Z",
 "note": "기술적 지표는 Yahoo 일봉에서 매일 자동 계산(LLM 토큰 0). 이동평균(SMA·EMA)과 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를 종합 투표한 5단계 신호 — 단기(1–3M)는 일봉, 장기(6–12M+)는 주봉 기준.",
 "indices": [
  {
   "key": "nasdaq",
   "name": "나스닥 종합",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.IXIC/total",
   "level": "26,363.44",
   "change": "-0.83%",
   "changeDir": "down",
   "period": "08/05 종가",
   "short": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "RSI(14)",
      "58.2 · 중립"
     ],
     [
      "MACD",
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "25,998 / 26,739"
     ]
    ],
    "read": "지표 19개 중 매수 15·매도 2·중립 2 → 단기 '적극매수'. ADX 26 · 강 · 상승우위, 스토캐스틱 86."
   },
   "long": {
    "trend": "상승",
    "signal": "매수",
    "metrics": [
     [
      "주간 RSI(14)",
      "59.9 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +9.6%"
     ],
     [
      "지지 / 저항",
      "25,998 / 27,190"
     ]
    ],
    "read": "주간 지표 매수 10·매도 2·중립 5 → 장기 '매수'. 주간 MACD 매도, 골든크로스(정배열)."
   }
  },
  {
   "key": "dow",
   "name": "다우존스",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.DJI/total",
   "level": "54,349.12",
   "change": "+0.49%",
   "changeDir": "up",
   "period": "08/05 종가",
   "short": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "RSI(14)",
      "68.2 · 과매수 근접"
     ],
     [
      "MACD",
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "53,261 / 54,744"
     ]
    ],
    "read": "지표 19개 중 매수 14·매도 2·중립 3 → 단기 '적극매수'. ADX 18 · 약(횡보) · 상승우위, 스토캐스틱 93."
   },
   "long": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "주간 RSI(14)",
      "73.5 · 과매수"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +10.5%"
     ],
     [
      "지지 / 저항",
      "51,578 / 54,744"
     ]
    ],
    "read": "주간 지표 매수 13·매도 1·중립 3 → 장기 '적극매수'. 주간 MACD 매수, 골든크로스(정배열)."
   }
  },
  {
   "key": "kospi",
   "name": "코스피",
   "flag": "🇰🇷",
   "chartUrl": "https://finance.naver.com/sise/sise_index.naver?code=KOSPI",
   "level": "6,296.38",
   "change": "-4.58%",
   "changeDir": "down",
   "period": "08/06 종가",
   "short": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "RSI(14)",
      "43.2 · 중립"
     ],
     [
      "MACD",
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "5,263 / 6,421"
     ]
    ],
    "read": "지표 19개 중 매수 4·매도 11·중립 4 → 단기 '매도'. ADX 29 · 강 · 하락우위, 스토캐스틱 58."
   },
   "long": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "45.9 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +8.7%"
     ],
     [
      "지지 / 저항",
      "5,790 / 6,786"
     ]
    ],
    "read": "주간 지표 매수 4·매도 9·중립 4 → 장기 '매도'. 주간 MACD 매도, 골든크로스(정배열)."
   }
  },
  {
   "key": "kosdaq",
   "name": "코스닥",
   "flag": "🇰🇷",
   "chartUrl": "https://finance.naver.com/sise/sise_index.naver?code=KOSDAQ",
   "level": "801.67",
   "change": "+0.26%",
   "changeDir": "up",
   "period": "08/06 종가",
   "short": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "RSI(14)",
      "50.5 · 중립"
     ],
     [
      "MACD",
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "768 / 867"
     ]
    ],
    "read": "지표 19개 중 매수 8·매도 7·중립 4 → 단기 '중립'. ADX 29 · 강 · 하락우위, 스토캐스틱 86."
   },
   "long": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "37.2 · 과매도 근접"
     ],
     [
      "50/200 배열",
      "데드크로스(역배열) · 200일선 -19.5%"
     ],
     [
      "지지 / 저항",
      "631 / 924"
     ]
    ],
    "read": "주간 지표 매수 4·매도 11·중립 2 → 장기 '매도'. 주간 MACD 매도, 데드크로스(역배열)."
   }
  }
 ]
};
