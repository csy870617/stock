// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-19",
 "quotes": {
  "103590": {
   "price": 56100,
   "date": "2026-11-19",
   "changePct": 2.6,
   "close": 56100,
   "closeDate": "2026-11-19"
  },
  "105560": {
   "price": 153300,
   "date": "2026-11-19",
   "changePct": -2,
   "close": 153300,
   "closeDate": "2026-11-19"
  },
  "138040": {
   "price": 124800,
   "date": "2026-11-19",
   "changePct": 0.8,
   "close": 124800,
   "closeDate": "2026-11-19"
  },
  "139130": {
   "price": 15770,
   "date": "2026-11-19",
   "changePct": 0.3,
   "close": 15770,
   "closeDate": "2026-11-19"
  },
  "175330": {
   "price": 25400,
   "date": "2026-11-19",
   "changePct": -2.7,
   "close": 25400,
   "closeDate": "2026-11-19"
  },
  "192400": {
   "price": 27000,
   "date": "2026-11-19",
   "changePct": -0.7,
   "close": 27000,
   "closeDate": "2026-11-19"
  },
  "207940": {
   "price": 1364000,
   "date": "2026-11-19",
   "changePct": -0.1,
   "close": 1364000,
   "closeDate": "2026-11-19"
  },
  "241560": {
   "price": 51700,
   "date": "2026-11-19",
   "changePct": -0.6,
   "close": 51700,
   "closeDate": "2026-11-19"
  },
  "267250": {
   "price": 117600,
   "date": "2026-11-19",
   "changePct": -0.5,
   "close": 117600,
   "closeDate": "2026-11-19"
  },
  "267260": {
   "price": 415500,
   "date": "2026-11-19",
   "changePct": 8.6,
   "close": 415500,
   "closeDate": "2026-11-19"
  },
  "267270": {
   "price": 90900,
   "date": "2026-11-19",
   "changePct": 4.1,
   "close": 90900,
   "closeDate": "2026-11-19"
  },
  "282330": {
   "price": 140100,
   "date": "2026-11-19",
   "changePct": 0.4,
   "close": 140100,
   "closeDate": "2026-11-19"
  },
  "298040": {
   "price": 1786000,
   "date": "2026-11-19",
   "changePct": 6.3,
   "close": 1786000,
   "closeDate": "2026-11-19"
  },
  "316140": {
   "price": 31750,
   "date": "2026-11-19",
   "changePct": -1.2,
   "close": 31750,
   "closeDate": "2026-11-19"
  },
  "323410": {
   "price": 21400,
   "date": "2026-11-19",
   "changePct": 1.9,
   "close": 21400,
   "closeDate": "2026-11-19"
  },
  "361610": {
   "price": 11450,
   "date": "2026-11-19",
   "changePct": -5.2,
   "close": 11450,
   "closeDate": "2026-11-19"
  },
  "402340": {
   "price": 740000,
   "date": "2026-11-19",
   "changePct": 4.4,
   "close": 740000,
   "closeDate": "2026-11-19"
  },
  "005930": {
   "price": 195500,
   "date": "2026-11-19",
   "changePct": 0.4,
   "close": 195500,
   "closeDate": "2026-11-19"
  },
  "055550": {
   "price": 85200,
   "date": "2026-11-19",
   "changePct": -2.1,
   "close": 85200,
   "closeDate": "2026-11-19"
  },
  "000810": {
   "price": 519000,
   "date": "2026-11-19",
   "changePct": -4.2,
   "close": 519000,
   "closeDate": "2026-11-19"
  },
  "012450": {
   "price": 628000,
   "date": "2026-11-19",
   "changePct": -0.6,
   "close": 628000,
   "closeDate": "2026-11-19"
  },
  "009540": {
   "price": 229000,
   "date": "2026-11-19",
   "changePct": 0,
   "close": 229000,
   "closeDate": "2026-11-19"
  },
  "068270": {
   "price": 214500,
   "date": "2026-11-19",
   "changePct": 3.4,
   "close": 214500,
   "closeDate": "2026-11-19"
  },
  "000270": {
   "price": 90900,
   "date": "2026-11-19",
   "changePct": -1.4,
   "close": 90900,
   "closeDate": "2026-11-19"
  },
  "032640": {
   "price": 15140,
   "date": "2026-11-19",
   "changePct": -1.9,
   "close": 15140,
   "closeDate": "2026-11-19"
  },
  "029780": {
   "price": 41450,
   "date": "2026-11-19",
   "changePct": 0.2,
   "close": 41450,
   "closeDate": "2026-11-19"
  },
  "035900": {
   "price": 47800,
   "date": "2026-11-19",
   "changePct": 2.2,
   "close": 47800,
   "closeDate": "2026-11-19"
  },
  "036570": {
   "price": 183500,
   "date": "2026-11-19",
   "changePct": -0.5,
   "close": 183500,
   "closeDate": "2026-11-19"
  },
  "035720": {
   "price": 31900,
   "date": "2026-11-19",
   "changePct": 0.3,
   "close": 31900,
   "closeDate": "2026-11-19"
  },
  "001040": {
   "price": 114000,
   "date": "2026-11-19",
   "changePct": 0.3,
   "close": 114000,
   "closeDate": "2026-11-19"
  },
  "012750": {
   "price": 105900,
   "date": "2026-11-19",
   "changePct": 2.8,
   "close": 105900,
   "closeDate": "2026-11-19"
  },
  "000660": {
   "price": 1180000,
   "date": "2026-11-19",
   "changePct": 3.1,
   "close": 1180000,
   "closeDate": "2026-11-19"
  },
  "086790": {
   "price": 123800,
   "date": "2026-11-19",
   "changePct": -0.3,
   "close": 123800,
   "closeDate": "2026-11-19"
  },
  "001120": {
   "price": 33900,
   "date": "2026-11-19",
   "changePct": -2.3,
   "close": 33900,
   "closeDate": "2026-11-19"
  },
  "005830": {
   "price": 167200,
   "date": "2026-11-19",
   "changePct": -1.3,
   "close": 167200,
   "closeDate": "2026-11-19"
  },
  "066570": {
   "price": 135000,
   "date": "2026-11-19",
   "changePct": -1.5,
   "close": 135000,
   "closeDate": "2026-11-19"
  },
  "086280": {
   "price": 201500,
   "date": "2026-11-19",
   "changePct": -1.2,
   "close": 201500,
   "closeDate": "2026-11-19"
  },
  "018260": {
   "price": 214000,
   "date": "2026-11-19",
   "changePct": -7.4,
   "close": 214000,
   "closeDate": "2026-11-19"
  },
  "005850": {
   "price": 37600,
   "date": "2026-11-19",
   "changePct": -6.1,
   "close": 37600,
   "closeDate": "2026-11-19"
  },
  "005490": {
   "price": 259000,
   "date": "2026-11-19",
   "changePct": -1,
   "close": 259000,
   "closeDate": "2026-11-19"
  },
  "035420": {
   "price": 168200,
   "date": "2026-11-19",
   "changePct": -1.2,
   "close": 168200,
   "closeDate": "2026-11-19"
  },
  "010120": {
   "price": 119900,
   "date": "2026-11-19",
   "changePct": 3.4,
   "close": 119900,
   "closeDate": "2026-11-19"
  },
  "030200": {
   "price": 47200,
   "date": "2026-11-19",
   "changePct": -4.6,
   "close": 47200,
   "closeDate": "2026-11-19"
  },
  "012330": {
   "price": 341500,
   "date": "2026-11-19",
   "changePct": -4.1,
   "close": 341500,
   "closeDate": "2026-11-19"
  },
  "047050": {
   "price": 48250,
   "date": "2026-11-19",
   "changePct": -4.8,
   "close": 48250,
   "closeDate": "2026-11-19"
  },
  "042700": {
   "price": 170000,
   "date": "2026-11-19",
   "changePct": 1.4,
   "close": 170000,
   "closeDate": "2026-11-19"
  },
  "064400": {
   "price": 74800,
   "date": "2026-11-19",
   "changePct": -2.6,
   "close": 74800,
   "closeDate": "2026-11-19"
  },
  "095340": {
   "price": 145200,
   "date": "2026-11-19",
   "changePct": 6.9,
   "close": 145200,
   "closeDate": "2026-11-19"
  },
  "MSFT": {
   "price": 508.29,
   "date": "2026-11-18",
   "changePct": 0.4,
   "close": 508.29,
   "closeDate": "2026-11-18"
  },
  "V": {
   "price": 415.22,
   "date": "2026-11-18",
   "changePct": -0.4,
   "close": 415.22,
   "closeDate": "2026-11-18"
  },
  "MA": {
   "price": 643.37,
   "date": "2026-11-18",
   "changePct": -0.4,
   "close": 643.37,
   "closeDate": "2026-11-18"
  },
  "GOOGL": {
   "price": 282.44,
   "date": "2026-11-18",
   "changePct": 0.8,
   "close": 282.44,
   "closeDate": "2026-11-18"
  },
  "NVDA": {
   "price": 150.96,
   "date": "2026-11-18",
   "changePct": -2.9,
   "close": 150.96,
   "closeDate": "2026-11-18"
  },
  "META": {
   "price": 616.38,
   "date": "2026-11-18",
   "changePct": -0.4,
   "close": 616.38,
   "closeDate": "2026-11-18"
  },
  "AVGO": {
   "price": 354.05,
   "date": "2026-11-18",
   "changePct": 3.6,
   "close": 354.05,
   "closeDate": "2026-11-18"
  },
  "TSM": {
   "price": 362.62,
   "date": "2026-11-18",
   "changePct": 0.8,
   "close": 362.62,
   "closeDate": "2026-11-18"
  },
  "UBER": {
   "price": 68.76,
   "date": "2026-11-18",
   "changePct": -0.1,
   "close": 68.76,
   "closeDate": "2026-11-18"
  },
  "GM": {
   "price": 82.13,
   "date": "2026-11-18",
   "changePct": -2.3,
   "close": 82.13,
   "closeDate": "2026-11-18"
  },
  "VZ": {
   "price": 46.13,
   "date": "2026-11-18",
   "changePct": 0.4,
   "close": 46.13,
   "closeDate": "2026-11-18"
  },
  "C": {
   "price": 117.34,
   "date": "2026-11-18",
   "changePct": -2.2,
   "close": 117.34,
   "closeDate": "2026-11-18"
  },
  "DUK": {
   "price": 130.05,
   "date": "2026-11-18",
   "changePct": 0.2,
   "close": 130.05,
   "closeDate": "2026-11-18"
  },
  "KO": {
   "price": 98.09,
   "date": "2026-11-18",
   "changePct": -0.7,
   "close": 98.09,
   "closeDate": "2026-11-18"
  },
  "JNJ": {
   "price": 272.7,
   "date": "2026-11-18",
   "changePct": -2.2,
   "close": 272.7,
   "closeDate": "2026-11-18"
  },
  "LLY": {
   "price": 1382.75,
   "date": "2026-11-18",
   "changePct": -2.3,
   "close": 1382.75,
   "closeDate": "2026-11-18"
  },
  "CI": {
   "price": 285.37,
   "date": "2026-11-18",
   "changePct": -3,
   "close": 285.37,
   "closeDate": "2026-11-18"
  },
  "TSLA": {
   "price": 383.72,
   "date": "2026-11-18",
   "changePct": 0.9,
   "close": 383.72,
   "closeDate": "2026-11-18"
  },
  "AAPL": {
   "price": 352.45,
   "date": "2026-11-18",
   "changePct": 0.2,
   "close": 352.45,
   "closeDate": "2026-11-18"
  },
  "MU": {
   "price": 705.27,
   "date": "2026-11-18",
   "changePct": -1,
   "close": 705.27,
   "closeDate": "2026-11-18"
  },
  "MDT": {
   "price": 100.72,
   "date": "2026-11-18",
   "changePct": -1.6,
   "close": 100.72,
   "closeDate": "2026-11-18"
  },
  "IREN": {
   "price": 15.24,
   "date": "2026-11-18",
   "changePct": -3.6,
   "close": 15.24,
   "closeDate": "2026-11-18"
  },
  "DVN": {
   "price": 41.96,
   "date": "2026-11-18",
   "changePct": -3.5,
   "close": 41.96,
   "closeDate": "2026-11-18"
  },
  "GS": {
   "price": 873.18,
   "date": "2026-11-18",
   "changePct": -0.5,
   "close": 873.18,
   "closeDate": "2026-11-18"
  },
  "AMP": {
   "price": 501.42,
   "date": "2026-11-18",
   "changePct": -0.9,
   "close": 501.42,
   "closeDate": "2026-11-18"
  },
  "PNC": {
   "price": 221.14,
   "date": "2026-11-18",
   "changePct": -1.4,
   "close": 221.14,
   "closeDate": "2026-11-18"
  },
  "MTB": {
   "price": 214.17,
   "date": "2026-11-18",
   "changePct": -0.8,
   "close": 214.17,
   "closeDate": "2026-11-18"
  },
  "SO": {
   "price": 94.41,
   "date": "2026-11-18",
   "changePct": 0.9,
   "close": 94.41,
   "closeDate": "2026-11-18"
  },
  "WEC": {
   "price": 117.47,
   "date": "2026-11-18",
   "changePct": 1,
   "close": 117.47,
   "closeDate": "2026-11-18"
  },
  "TJX": {
   "price": 140.3,
   "date": "2026-11-18",
   "changePct": 8,
   "close": 140.3,
   "closeDate": "2026-11-18"
  },
  "ANET": {
   "price": 193.94,
   "date": "2026-11-18",
   "changePct": 4,
   "close": 193.94,
   "closeDate": "2026-11-18"
  },
  "GD": {
   "price": 349.04,
   "date": "2026-11-18",
   "changePct": -1.9,
   "close": 349.04,
   "closeDate": "2026-11-18"
  },
  "LMT": {
   "price": 578.19,
   "date": "2026-11-18",
   "changePct": -2.1,
   "close": 578.19,
   "closeDate": "2026-11-18"
  },
  "CB": {
   "price": 371.02,
   "date": "2026-11-18",
   "changePct": -1.2,
   "close": 371.02,
   "closeDate": "2026-11-18"
  },
  "GILD": {
   "price": 168.98,
   "date": "2026-11-18",
   "changePct": -0.8,
   "close": 168.98,
   "closeDate": "2026-11-18"
  },
  "BRK.B": {
   "price": 574.62,
   "date": "2026-11-18",
   "changePct": -2.1,
   "close": 574.62,
   "closeDate": "2026-11-18"
  },
  "TMO": {
   "price": 692.74,
   "date": "2026-11-18",
   "changePct": 0.9,
   "close": 692.74,
   "closeDate": "2026-11-18"
  },
  "ECL": {
   "price": 300.68,
   "date": "2026-11-18",
   "changePct": -0.6,
   "close": 300.68,
   "closeDate": "2026-11-18"
  },
  "RSG": {
   "price": 249.16,
   "date": "2026-11-18",
   "changePct": -1.5,
   "close": 249.16,
   "closeDate": "2026-11-18"
  },
  "CTAS": {
   "price": 222,
   "date": "2026-11-18",
   "changePct": -0.1,
   "close": 222,
   "closeDate": "2026-11-18"
  },
  "ORLY": {
   "price": 93.37,
   "date": "2026-11-18",
   "changePct": 0.7,
   "close": 93.37,
   "closeDate": "2026-11-18"
  },
  "ADP": {
   "price": 305.57,
   "date": "2026-11-18",
   "changePct": -0.9,
   "close": 305.57,
   "closeDate": "2026-11-18"
  },
  "FAST": {
   "price": 53.96,
   "date": "2026-11-18",
   "changePct": -0.7,
   "close": 53.96,
   "closeDate": "2026-11-18"
  },
  "VRT": {
   "price": 194.48,
   "date": "2026-11-18",
   "changePct": 2.2,
   "close": 194.48,
   "closeDate": "2026-11-18"
  },
  "WAB": {
   "price": 290.58,
   "date": "2026-11-18",
   "changePct": 0.1,
   "close": 290.58,
   "closeDate": "2026-11-18"
  },
  "NTES": {
   "price": 118.43,
   "date": "2026-11-18",
   "changePct": -1,
   "close": 118.43,
   "closeDate": "2026-11-18"
  },
  "ROST": {
   "price": 227.64,
   "date": "2026-11-18",
   "changePct": 3.3,
   "close": 227.64,
   "closeDate": "2026-11-18"
  },
  "CSCO": {
   "price": 97.18,
   "date": "2026-11-18",
   "changePct": 2.2,
   "close": 97.18,
   "closeDate": "2026-11-18"
  },
  "TEL": {
   "price": 212.09,
   "date": "2026-11-18",
   "changePct": 0.3,
   "close": 212.09,
   "closeDate": "2026-11-18"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5115.26,
   "date": "2026-11-19",
   "changePct": 0.9,
   "close": 5115.26,
   "closeDate": "2026-11-19",
   "at": "2026-11-19T07:26:34Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7323.63,
   "date": "2026-11-18",
   "changePct": -0.2,
   "close": 7323.63,
   "closeDate": "2026-11-18",
   "at": "2026-11-19T07:26:34Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215.43,
   "date": "2026-11-18",
   "changePct": -0.2,
   "close": 215.43,
   "closeDate": "2026-11-18",
   "at": "2026-11-19T07:26:34Z"
  }
 }
};
