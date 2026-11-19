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
   "price": 52900,
   "date": "2026-11-19",
   "changePct": -3.3,
   "close": 54700,
   "closeDate": "2026-11-18"
  },
  "105560": {
   "price": 153600,
   "date": "2026-11-19",
   "changePct": -1.8,
   "close": 156400,
   "closeDate": "2026-11-18"
  },
  "138040": {
   "price": 124400,
   "date": "2026-11-19",
   "changePct": 0.5,
   "close": 123800,
   "closeDate": "2026-11-18"
  },
  "139130": {
   "price": 15670,
   "date": "2026-11-19",
   "changePct": -0.4,
   "close": 15730,
   "closeDate": "2026-11-18"
  },
  "175330": {
   "price": 25700,
   "date": "2026-11-19",
   "changePct": -1.5,
   "close": 26100,
   "closeDate": "2026-11-18"
  },
  "192400": {
   "price": 27450,
   "date": "2026-11-19",
   "changePct": 0.9,
   "close": 27200,
   "closeDate": "2026-11-18"
  },
  "207940": {
   "price": 1358000,
   "date": "2026-11-19",
   "changePct": -0.6,
   "close": 1366000,
   "closeDate": "2026-11-18"
  },
  "241560": {
   "price": 51800,
   "date": "2026-11-19",
   "changePct": -0.4,
   "close": 52000,
   "closeDate": "2026-11-18"
  },
  "267250": {
   "price": 117000,
   "date": "2026-11-19",
   "changePct": -1,
   "close": 118200,
   "closeDate": "2026-11-18"
  },
  "267260": {
   "price": 387500,
   "date": "2026-11-19",
   "changePct": 1.3,
   "close": 382500,
   "closeDate": "2026-11-18"
  },
  "267270": {
   "price": 87800,
   "date": "2026-11-19",
   "changePct": 0.6,
   "close": 87300,
   "closeDate": "2026-11-18"
  },
  "282330": {
   "price": 140300,
   "date": "2026-11-19",
   "changePct": 0.5,
   "close": 139600,
   "closeDate": "2026-11-18"
  },
  "298040": {
   "price": 1682000,
   "date": "2026-11-19",
   "changePct": 0.1,
   "close": 1680000,
   "closeDate": "2026-11-18"
  },
  "316140": {
   "price": 31700,
   "date": "2026-11-19",
   "changePct": -1.4,
   "close": 32150,
   "closeDate": "2026-11-18"
  },
  "323410": {
   "price": 21450,
   "date": "2026-11-19",
   "changePct": 2.1,
   "close": 21000,
   "closeDate": "2026-11-18"
  },
  "361610": {
   "price": 11720,
   "date": "2026-11-19",
   "changePct": -3,
   "close": 12080,
   "closeDate": "2026-11-18"
  },
  "402340": {
   "price": 690000,
   "date": "2026-11-19",
   "changePct": -2.7,
   "close": 709000,
   "closeDate": "2026-11-18"
  },
  "005930": {
   "price": 190000,
   "date": "2026-11-19",
   "changePct": -2.4,
   "close": 194700,
   "closeDate": "2026-11-18"
  },
  "055550": {
   "price": 85900,
   "date": "2026-11-19",
   "changePct": -1.3,
   "close": 87000,
   "closeDate": "2026-11-18"
  },
  "000810": {
   "price": 536000,
   "date": "2026-11-19",
   "changePct": -1.1,
   "close": 542000,
   "closeDate": "2026-11-18"
  },
  "012450": {
   "price": 607000,
   "date": "2026-11-19",
   "changePct": -4,
   "close": 632000,
   "closeDate": "2026-11-18"
  },
  "009540": {
   "price": 226500,
   "date": "2026-11-19",
   "changePct": -1.1,
   "close": 229000,
   "closeDate": "2026-11-18"
  },
  "068270": {
   "price": 210000,
   "date": "2026-11-19",
   "changePct": 1.2,
   "close": 207500,
   "closeDate": "2026-11-18"
  },
  "000270": {
   "price": 90600,
   "date": "2026-11-19",
   "changePct": -1.7,
   "close": 92200,
   "closeDate": "2026-11-18"
  },
  "032640": {
   "price": 15290,
   "date": "2026-11-19",
   "changePct": -0.9,
   "close": 15430,
   "closeDate": "2026-11-18"
  },
  "029780": {
   "price": 41450,
   "date": "2026-11-19",
   "changePct": 0.2,
   "close": 41350,
   "closeDate": "2026-11-18"
  },
  "035900": {
   "price": 47200,
   "date": "2026-11-19",
   "changePct": 1,
   "close": 46750,
   "closeDate": "2026-11-18"
  },
  "036570": {
   "price": 187000,
   "date": "2026-11-19",
   "changePct": 1.4,
   "close": 184500,
   "closeDate": "2026-11-18"
  },
  "035720": {
   "price": 31850,
   "date": "2026-11-19",
   "changePct": 0.2,
   "close": 31800,
   "closeDate": "2026-11-18"
  },
  "001040": {
   "price": 118600,
   "date": "2026-11-19",
   "changePct": 4.3,
   "close": 113700,
   "closeDate": "2026-11-18"
  },
  "012750": {
   "price": 105500,
   "date": "2026-11-19",
   "changePct": 2.4,
   "close": 103000,
   "closeDate": "2026-11-18"
  },
  "000660": {
   "price": 1116000,
   "date": "2026-11-19",
   "changePct": -2.4,
   "close": 1144000,
   "closeDate": "2026-11-18"
  },
  "086790": {
   "price": 123200,
   "date": "2026-11-19",
   "changePct": -0.8,
   "close": 124200,
   "closeDate": "2026-11-18"
  },
  "001120": {
   "price": 33500,
   "date": "2026-11-19",
   "changePct": -3.5,
   "close": 34700,
   "closeDate": "2026-11-18"
  },
  "005830": {
   "price": 168700,
   "date": "2026-11-19",
   "changePct": -0.4,
   "close": 169400,
   "closeDate": "2026-11-18"
  },
  "066570": {
   "price": 130600,
   "date": "2026-11-19",
   "changePct": -4.7,
   "close": 137000,
   "closeDate": "2026-11-18"
  },
  "086280": {
   "price": 201500,
   "date": "2026-11-19",
   "changePct": -1.2,
   "close": 204000,
   "closeDate": "2026-11-18"
  },
  "018260": {
   "price": 214500,
   "date": "2026-11-19",
   "changePct": -7.1,
   "close": 231000,
   "closeDate": "2026-11-18"
  },
  "005850": {
   "price": 37150,
   "date": "2026-11-19",
   "changePct": -7.2,
   "close": 40050,
   "closeDate": "2026-11-18"
  },
  "005490": {
   "price": 258000,
   "date": "2026-11-19",
   "changePct": -1.3,
   "close": 261500,
   "closeDate": "2026-11-18"
  },
  "035420": {
   "price": 169200,
   "date": "2026-11-19",
   "changePct": -0.6,
   "close": 170300,
   "closeDate": "2026-11-18"
  },
  "010120": {
   "price": 112200,
   "date": "2026-11-19",
   "changePct": -3.3,
   "close": 116000,
   "closeDate": "2026-11-18"
  },
  "030200": {
   "price": 47200,
   "date": "2026-11-19",
   "changePct": -4.6,
   "close": 49500,
   "closeDate": "2026-11-18"
  },
  "012330": {
   "price": 337000,
   "date": "2026-11-19",
   "changePct": -5.3,
   "close": 356000,
   "closeDate": "2026-11-18"
  },
  "047050": {
   "price": 48500,
   "date": "2026-11-19",
   "changePct": -4.3,
   "close": 50700,
   "closeDate": "2026-11-18"
  },
  "042700": {
   "price": 160900,
   "date": "2026-11-19",
   "changePct": -4.1,
   "close": 167700,
   "closeDate": "2026-11-18"
  },
  "064400": {
   "price": 72300,
   "date": "2026-11-19",
   "changePct": -5.9,
   "close": 76800,
   "closeDate": "2026-11-18"
  },
  "095340": {
   "price": 133900,
   "date": "2026-11-19",
   "changePct": -1.4,
   "close": 135800,
   "closeDate": "2026-11-18"
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
   "price": 4966.64,
   "date": "2026-11-19",
   "changePct": -2,
   "close": 5067.44,
   "closeDate": "2026-11-18",
   "at": "2026-11-19T01:55:11Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7323.63,
   "date": "2026-11-18",
   "changePct": -0.2,
   "close": 7323.63,
   "closeDate": "2026-11-18",
   "at": "2026-11-19T01:55:11Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215.43,
   "date": "2026-11-18",
   "changePct": -0.2,
   "close": 215.43,
   "closeDate": "2026-11-18",
   "at": "2026-11-19T01:55:11Z"
  }
 }
};
