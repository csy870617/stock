// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 나스닥·다우·코스피·코스닥의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.
// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.
window.INDEX_TA = {
 "asOf": "2026-07-23",
 "note": "기술적 지표는 Yahoo 일봉에서 매일 자동 계산(LLM 토큰 0). 이동평균(SMA·EMA)과 오실레이터(RSI·MACD·스토캐스틱·CCI·Williams %R·ADX·모멘텀)를 종합 투표한 5단계 신호 — 단기(1–3M)는 일봉, 장기(6–12M+)는 주봉 기준.",
 "indices": [
  {
   "key": "nasdaq",
   "name": "나스닥 종합",
   "flag": "🇺🇸",
   "chartUrl": "https://m.stock.naver.com/worldstock/index/.IXIC/total",
   "level": "25,690.90",
   "change": "-0.57%",
   "changeDir": "down",
   "period": "07/22 종가",
   "short": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "RSI(14)",
      "47.0 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "25,688 / 25,851"
     ]
    ],
    "read": "지표 19개 중 매수 5·매도 10·중립 4 → 단기 '매도'. ADX 21 · 보통 · 하락우위, 스토캐스틱 40."
   },
   "long": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "주간 RSI(14)",
      "56.9 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +7.4%"
     ],
     [
      "지지 / 저항",
      "24,381 / 25,978"
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
   "level": "52,218.58",
   "change": "-0.01%",
   "changeDir": "down",
   "period": "07/22 종가",
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
      "52,196 / 52,373"
     ]
    ],
    "read": "지표 19개 중 매수 8·매도 6·중립 5 → 단기 '중립'. ADX 19 · 약(횡보) · 상승우위, 스토캐스틱 21."
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
      "골든크로스(정배열) · 200일선 +6.9%"
     ],
     [
      "지지 / 저항",
      "51,031 / 53,289"
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
   "level": "7,096.89",
   "change": "+4.40%",
   "changeDir": "up",
   "period": "07/23 종가",
   "short": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "RSI(14)",
      "44.6 · 중립"
     ],
     [
      "MACD",
      "매도(시그널 하회) · 히스토그램−"
     ],
     [
      "지지 / 저항",
      "6,796 / 7,545"
     ]
    ],
    "read": "지표 19개 중 매수 8·매도 7·중립 4 → 단기 '중립'. ADX 24 · 보통 · 하락우위, 스토캐스틱 23."
   },
   "long": {
    "trend": "횡보",
    "signal": "중립",
    "metrics": [
     [
      "주간 RSI(14)",
      "53.0 · 중립"
     ],
     [
      "50/200 배열",
      "골든크로스(정배열) · 200일선 +25.6%"
     ],
     [
      "지지 / 저항",
      "6,692 / 7,771"
     ]
    ],
    "read": "주간 지표 매수 6·매도 7·중립 4 → 장기 '중립'. 주간 MACD 매도, 골든크로스(정배열)."
   }
  },
  {
   "key": "kosdaq",
   "name": "코스닥",
   "flag": "🇰🇷",
   "chartUrl": "https://finance.naver.com/sise/sise_index.naver?code=KOSDAQ",
   "level": "790.28",
   "change": "+5.22%",
   "changeDir": "up",
   "period": "07/23 종가",
   "short": {
    "trend": "하락",
    "signal": "매도",
    "metrics": [
     [
      "RSI(14)",
      "40.6 · 중립"
     ],
     [
      "MACD",
      "매수(시그널 상회) · 히스토그램+"
     ],
     [
      "지지 / 저항",
      "767 / 829"
     ]
    ],
    "read": "지표 19개 중 매수 5·매도 10·중립 4 → 단기 '매도'. ADX 33 · 강 · 하락우위, 스토캐스틱 21."
   },
   "long": {
    "trend": "하락",
    "signal": "적극매도",
    "metrics": [
     [
      "주간 RSI(14)",
      "38.5 · 과매도 근접"
     ],
     [
      "50/200 배열",
      "데드크로스(역배열) · 200일선 -21.1%"
     ],
     [
      "지지 / 저항",
      "731 / 1,001"
     ]
    ],
    "read": "주간 지표 매수 3·매도 13·중립 1 → 장기 '적극매도'. 주간 MACD 매도, 데드크로스(역배열)."
   }
  }
 ]
};
