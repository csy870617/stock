// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 나스닥·다우·코스피·코스닥의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.
// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.
window.INDEX_TA = {
 "asOf": "2026-08-03",
 "note": "기술적 지표는 Yahoo 일봉에서 매일 자동 계산(LLM 토큰 0). 이동평균(SMA·EMA)과 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를 종합 투표한 5단계 신호 — 단기(1–3M)는 일봉, 장기(6–12M+)는 주봉 기준.",
 "indices": [
  {
   "key": "nasdaq",
   "name": "나스닥 종합",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.IXIC/total",
   "level": "25,913.90",
   "change": "+2.13%",
   "changeDir": "up",
   "period": "08/03 종가",
   "short": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "RSI(14)",
      "54.6 · 중립"
     ],
     [
      "MACD",
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "25,582 / 25,983"
     ]
    ],
    "read": "지표 19개 중 매수 13·매도 2·중립 4 → 단기 '적극매수'. ADX 28 · 강 · 하락우위, 스토캐스틱 55."
   },
   "long": {
    "trend": "상승",
    "signal": "매수",
    "metrics": [
     [
      "주간 RSI(14)",
      "57.7 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +7.9%"
     ],
     [
      "지지 / 저항",
      "24,507 / 25,983"
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
   "level": "53,178.41",
   "change": "+1.32%",
   "changeDir": "up",
   "period": "08/03 종가",
   "short": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "RSI(14)",
      "60.5 · 과매수 근접"
     ],
     [
      "MACD",
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "52,443 / 53,289"
     ]
    ],
    "read": "지표 19개 중 매수 14·매도 0·중립 5 → 단기 '적극매수'. ADX 15 · 약(횡보) · 상승우위, 스토캐스틱 71."
   },
   "long": {
    "trend": "상승",
    "signal": "적극매수",
    "metrics": [
     [
      "주간 RSI(14)",
      "69.5 · 과매수 근접"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +8.3%"
     ],
     [
      "지지 / 저항",
      "51,424 / 53,289"
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
   "level": "6,595.45",
   "change": "+17.91%",
   "changeDir": "up",
   "period": "07/31 종가",
   "short": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "RSI(14)",
      "45.2 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "6,126 / 6,903"
     ]
    ],
    "read": "지표 19개 중 매수 6·매도 9·중립 4 → 단기 '매도'. ADX 30 · 강 · 하락우위, 스토캐스틱 30."
   },
   "long": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "48.9 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +15.0%"
     ],
     [
      "지지 / 저항",
      "5,734 / 6,748"
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
   "level": "719.76",
   "change": "+11.63%",
   "changeDir": "up",
   "period": "07/31 종가",
   "short": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "RSI(14)",
      "40.4 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "700 / 773"
     ]
    ],
    "read": "지표 19개 중 매수 4·매도 13·중립 2 → 단기 '매도'. ADX 36 · 강 · 하락우위, 스토캐스틱 19."
   },
   "long": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "27.9 · 과매도"
     ],
     [
      "50/200 배열",
      "데드크로스(역배열) · 200일선 -27.8%"
     ],
     [
      "지지 / 저항",
      "631 / 952"
     ]
    ],
    "read": "주간 지표 매수 3·매도 13·중립 1 → 장기 '적극매도'. 주간 MACD 매도, 데드크로스(역배열)."
   }
  }
 ]
};
