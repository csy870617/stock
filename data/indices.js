// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 나스닥·다우·코스피·코스닥의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.
// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.
window.INDEX_TA = {
 "asOf": "2026-07-29",
 "note": "기술적 지표는 Yahoo 일봉에서 매일 자동 계산(LLM 토큰 0). 이동평균(SMA·EMA)과 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를 종합 투표한 5단계 신호 — 단기(1–3M)는 일봉, 장기(6–12M+)는 주봉 기준.",
 "indices": [
  {
   "key": "nasdaq",
   "name": "나스닥 종합",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.IXIC/total",
   "level": "24,442.94",
   "change": "-1.74%",
   "changeDir": "down",
   "period": "07/29 종가",
   "short": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "RSI(14)",
      "33.0 · 과매도 근접"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "24,425 / 24,873"
     ]
    ],
    "read": "지표 19개 중 매수 3·매도 13·중립 3 → 단기 '적극매도'. ADX 28 · 강 · 하락우위, 스토캐스틱 9."
   },
   "long": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "48.7 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +2.0%"
     ],
     [
      "지지 / 저항",
      "24,425 / 24,443"
     ]
    ],
    "read": "주간 지표 매수 4·매도 8·중립 5 → 장기 '매도'. 주간 MACD 매도, 골든크로스(정배열)."
   }
  },
  {
   "key": "dow",
   "name": "다우존스",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.DJI/total",
   "level": "51,594.14",
   "change": "-2.19%",
   "changeDir": "down",
   "period": "07/29 종가",
   "short": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "RSI(14)",
      "45.1 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "51,542 / 52,042"
     ]
    ],
    "read": "지표 19개 중 매수 6·매도 8·중립 5 → 단기 '중립'. ADX 16 · 약(횡보) · 하락우위, 스토캐스틱 46."
   },
   "long": {
    "trend": "상승",
    "signal": "매수",
    "metrics": [
     [
      "주간 RSI(14)",
      "60.9 · 과매수 근접"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +5.3%"
     ],
     [
      "지지 / 저항",
      "51,262 / 53,289"
     ]
    ],
    "read": "주간 지표 매수 10·매도 3·중립 4 → 장기 '매수'. 주간 MACD 매수, 골든크로스(정배열)."
   }
  },
  {
   "key": "kospi",
   "name": "코스피",
   "flag": "🇰🇷",
   "chartUrl": "https://finance.naver.com/sise/sise_index.naver?code=KOSPI",
   "level": "6,023.66",
   "change": "-10.84%",
   "changeDir": "down",
   "period": "07/28 종가",
   "short": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "RSI(14)",
      "34.2 · 과매도 근접"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "5,993 / 6,673"
     ]
    ],
    "read": "지표 19개 중 매수 2·매도 13·중립 4 → 단기 '적극매도'. ADX 26 · 강 · 하락우위, 스토캐스틱 12."
   },
   "long": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "43.8 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +5.7%"
     ],
     [
      "지지 / 저항",
      "5,993 / 6,727"
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
   "level": "705.85",
   "change": "-7.72%",
   "changeDir": "down",
   "period": "07/28 종가",
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
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "697 / 752"
     ]
    ],
    "read": "지표 19개 중 매수 1·매도 14·중립 4 → 단기 '적극매도'. ADX 33 · 강 · 하락우위, 스토캐스틱 14."
   },
   "long": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "27.3 · 과매도"
     ],
     [
      "50/200 배열",
      "데드크로스(역배열) · 200일선 -29.4%"
     ],
     [
      "지지 / 저항",
      "697 / 979"
     ]
    ],
    "read": "주간 지표 매수 2·매도 13·중립 2 → 장기 '적극매도'. 주간 MACD 매도, 데드크로스(역배열)."
   }
  }
 ]
};
