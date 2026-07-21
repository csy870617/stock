// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 나스닥·다우·코스피·코스닥의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.
// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.
window.INDEX_TA = {
 "asOf": "2026-07-21",
 "note": "기술적 지표는 Yahoo 일봉에서 매일 자동 계산(LLM 토큰 0). 이동평균(SMA·EMA)과 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를 종합 투표한 5단계 신호 — 단기(1–3M)는 일봉, 장기(6–12M+)는 주봉 기준.",
 "indices": [
  {
   "key": "nasdaq",
   "name": "나스닥 종합",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.IXIC/total",
   "level": "25,837.21",
   "change": "+1.29%",
   "changeDir": "up",
   "period": "07/21 종가",
   "short": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "RSI(14)",
      "49.0 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "25,803 / 25,846"
     ]
    ],
    "read": "지표 19개 중 매수 8·매도 7·중립 4 → 단기 '중립'. ADX 21 · 보통 · 하락우위, 스토캐스틱 35."
   },
   "long": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "주간 RSI(14)",
      "58.0 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +8.1%"
     ],
     [
      "지지 / 저항",
      "24,366 / 25,963"
     ]
    ],
    "read": "주간 지표 매수 7·매도 5·중립 5 → 장기 '중립'. 주간 MACD 매도, 골든크로스(정배열)."
   }
  },
  {
   "key": "dow",
   "name": "다우존스",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.DJI/total",
   "level": "52,224.64",
   "change": "+0.74%",
   "changeDir": "up",
   "period": "07/21 종가",
   "short": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "RSI(14)",
      "53.3 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "51,302 / 52,284"
     ]
    ],
    "read": "지표 19개 중 매수 7·매도 7·중립 5 → 단기 '중립'. ADX 20 · 약(횡보) · 하락우위, 스토캐스틱 16."
   },
   "long": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "주간 RSI(14)",
      "66.0 · 과매수 근접"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +7.0%"
     ],
     [
      "지지 / 저항",
      "50,981 / 53,289"
     ]
    ],
    "read": "주간 지표 매수 12·매도 3·중립 2 → 장기 '적극매수'. 주간 MACD 매수, 골든크로스(정배열)."
   }
  },
  {
   "key": "kospi",
   "name": "코스피",
   "flag": "🇰🇷",
   "chartUrl": "https://finance.naver.com/sise/sise_index.naver?code=KOSPI",
   "level": "6,516.27",
   "change": "-4.46%",
   "changeDir": "down",
   "period": "07/20 종가",
   "short": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "RSI(14)",
      "35.8 · 과매도 근접"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "6,449 / 6,857"
     ]
    ],
    "read": "지표 19개 중 매수 2·매도 13·중립 4 → 단기 '적극매도'. ADX 23 · 보통 · 하락우위, 스토캐스틱 18."
   },
   "long": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "48.6 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +16.4%"
     ],
     [
      "지지 / 저항",
      "6,309 / 6,644"
     ]
    ],
    "read": "주간 지표 매수 5·매도 8·중립 4 → 장기 '매도'. 주간 MACD 매도, 골든크로스(정배열)."
   }
  },
  {
   "key": "kosdaq",
   "name": "코스닥",
   "flag": "🇰🇷",
   "chartUrl": "https://finance.naver.com/sise/sise_index.naver?code=KOSDAQ",
   "level": "749.64",
   "change": "-5.33%",
   "changeDir": "down",
   "period": "07/20 종가",
   "short": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "RSI(14)",
      "33.7 · 과매도 근접"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "747 / 791"
     ]
    ],
    "read": "지표 19개 중 매수 0·매도 15·중립 4 → 단기 '적극매도'. ADX 34 · 강 · 하락우위, 스토캐스틱 20."
   },
   "long": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "35.5 · 과매도 근접"
     ],
     [
      "50/200 배열",
      "데드크로스(역배열) · 200일선 -25.2%"
     ],
     [
      "지지 / 저항",
      "747 / 1,003"
     ]
    ],
    "read": "주간 지표 매수 1·매도 13·중립 3 → 장기 '적극매도'. 주간 MACD 매도, 데드크로스(역배열)."
   }
  }
 ]
};
