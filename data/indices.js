// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 나스닥·다우·코스피·코스닥의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.
// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.
window.INDEX_TA = {
 "asOf": "2026-08-04",
 "note": "기술적 지표는 Yahoo 일봉에서 매일 자동 계산(LLM 토큰 0). 이동평균(SMA·EMA)과 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를 종합 투표한 5단계 신호 — 단기(1–3M)는 일봉, 장기(6–12M+)는 주봉 기준.",
 "indices": [
  {
   "key": "nasdaq",
   "name": "나스닥 종합",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.IXIC/total",
   "level": "25,373.85",
   "change": "+1.00%",
   "changeDir": "up",
   "period": "07/31 종가",
   "short": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "RSI(14)",
      "47.9 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "24,950 / 25,592"
     ]
    ],
    "read": "지표 19개 중 매수 8·매도 7·중립 4 → 단기 '중립'. ADX 29 · 강 · 하락우위, 스토캐스틱 29."
   },
   "long": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "주간 RSI(14)",
      "54.6 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +5.7%"
     ],
     [
      "지지 / 저항",
      "24,484 / 25,982"
     ]
    ],
    "read": "주간 지표 매수 6·매도 6·중립 5 → 장기 '중립'. 주간 MACD 매도, 골든크로스(정배열)."
   }
  },
  {
   "key": "dow",
   "name": "다우존스",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.DJI/total",
   "level": "52,485.03",
   "change": "+0.53%",
   "changeDir": "up",
   "period": "07/31 종가",
   "short": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "RSI(14)",
      "54.5 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "52,350 / 53,289"
     ]
    ],
    "read": "지표 19개 중 매수 13·매도 1·중립 5 → 단기 '적극매수'. ADX 15 · 약(횡보) · 상승우위, 스토캐스틱 40."
   },
   "long": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "주간 RSI(14)",
      "66.5 · 과매수 근접"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +7.0%"
     ],
     [
      "지지 / 저항",
      "51,370 / 53,289"
     ]
    ],
    "read": "주간 지표 매수 13·매도 0·중립 4 → 장기 '적극매수'. 주간 MACD 매수, 골든크로스(정배열)."
   }
  },
  {
   "key": "kospi",
   "name": "코스피",
   "flag": "🇰🇷",
   "chartUrl": "https://finance.naver.com/sise/sise_index.naver?code=KOSPI",
   "level": "6,358.95",
   "change": "-3.59%",
   "changeDir": "down",
   "period": "08/04 종가",
   "short": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "RSI(14)",
      "42.9 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "6,047 / 6,817"
     ]
    ],
    "read": "지표 19개 중 매수 4·매도 11·중립 4 → 단기 '매도'. ADX 30 · 강 · 하락우위, 스토캐스틱 41."
   },
   "long": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "46.5 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +10.6%"
     ],
     [
      "지지 / 저항",
      "5,748 / 6,757"
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
   "level": "780.72",
   "change": "+8.47%",
   "changeDir": "up",
   "period": "08/04 종가",
   "short": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "RSI(14)",
      "47.7 · 중립"
     ],
     [
      "MACD",
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "769 / 872"
     ]
    ],
    "read": "지표 19개 중 매수 8·매도 7·중립 4 → 단기 '중립'. ADX 34 · 강 · 하락우위, 스토캐스틱 39."
   },
   "long": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "35.0 · 과매도 근접"
     ],
     [
      "50/200 배열",
      "데드크로스(역배열) · 200일선 -21.7%"
     ],
     [
      "지지 / 저항",
      "631 / 945"
     ]
    ],
    "read": "주간 지표 매수 3·매도 12·중립 2 → 장기 '적극매도'. 주간 MACD 매도, 데드크로스(역배열)."
   }
  }
 ]
};
