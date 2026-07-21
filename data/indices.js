// 지수 기술적 분석 스냅샷 — scripts/update-indices.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 나스닥·다우·코스피·코스닥의 종가·이동평균·RSI·추세·지지/저항·신호를 매일 계산해 저장한다.
// 거시 유동성 '게이지 등급'은 판단 영역이라 data/liquidity.js 에서 온디맨드로 남는다.
window.INDEX_TA = {
 "asOf": "2026-07-21",
 "note": "가격·기술적 지표(RSI·이동평균·추세·지지/저항·신호)는 Yahoo Finance 일봉에서 매일 자동 계산됩니다(LLM 토큰 0). 신호는 이동평균 집계 기준.",
 "indices": [
  {
   "key": "nasdaq",
   "name": "나스닥 종합",
   "flag": "🇺🇸",
   "chartUrl": "https://kr.investing.com/technical/nasdaq-composite-technical-analysis",
   "level": "25,508.07",
   "change": "-0.05%",
   "changeDir": "down",
   "period": "07/20 종가",
   "trend": "하락",
   "signal": "매도",
   "metrics": [
    [
     "RSI(14)",
     "44.1 · 중립"
    ],
    [
     "이동평균",
     "120일선 상회 · 20·60일선 하회"
    ],
    [
     "지지 / 저항",
     "25,015 / 25,863"
    ]
   ],
   "read": "120일선 상회 · 20·60일선 하회, RSI 44.1(중립), 주간 -1.4%. 이동평균 2매수/4매도로 '매도' 우위 — 지지 25,015선."
  },
  {
   "key": "dow",
   "name": "다우존스",
   "flag": "🇺🇸",
   "chartUrl": "https://kr.investing.com/indices/us-30",
   "level": "51,839.26",
   "change": "-0.59%",
   "changeDir": "down",
   "period": "07/20 종가",
   "trend": "상승",
   "signal": "중립",
   "metrics": [
    [
     "RSI(14)",
     "47.7 · 중립"
    ],
    [
     "이동평균",
     "60·120일선 상회 · 20일선 하회"
    ],
    [
     "지지 / 저항",
     "51,302 / 52,320"
    ]
   ],
   "read": "60·120일선 상회 · 20일선 하회, RSI 47.7(중립), 주간 -1.3%. 이동평균 3매수/3매도로 '중립' 우위 — 지지 51,302선."
  },
  {
   "key": "kospi",
   "name": "코스피",
   "flag": "🇰🇷",
   "chartUrl": "https://kr.investing.com/indices/kospi-technical",
   "level": "6,536.32",
   "change": "-4.17%",
   "changeDir": "down",
   "period": "07/21 종가",
   "trend": "하락",
   "signal": "적극매도",
   "metrics": [
    [
     "RSI(14)",
     "35.9 · 중립"
    ],
    [
     "이동평균",
     "20·60·120일선 모두 하회"
    ],
    [
     "지지 / 저항",
     "6,429 / 6,644"
    ]
   ],
   "read": "20·60·120일선 모두 하회, RSI 35.9(중립), 주간 -12.6%. 이동평균 1매수/5매도로 '적극매도' 우위 — 지지 6,429선."
  },
  {
   "key": "kosdaq",
   "name": "코스닥",
   "flag": "🇰🇷",
   "chartUrl": "https://kr.investing.com/indices/kosdaq",
   "level": "737.08",
   "change": "-6.92%",
   "changeDir": "down",
   "period": "07/21 종가",
   "trend": "하락",
   "signal": "적극매도",
   "metrics": [
    [
     "RSI(14)",
     "32.7 · 과매도 근접"
    ],
    [
     "이동평균",
     "20·60·120일선 모두 하회"
    ],
    [
     "지지 / 저항",
     "732 / 852"
    ]
   ],
   "read": "20·60·120일선 모두 하회, RSI 32.7(과매도 근접), 주간 -12.0%. 이동평균 0매수/6매도로 '적극매도' 우위 — 지지 732선."
  }
 ]
};
