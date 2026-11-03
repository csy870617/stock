// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-03",
 "quotes": {
  "103590": {
   "price": 53500,
   "date": "2026-11-03",
   "changePct": -6,
   "close": 53500,
   "closeDate": "2026-11-03"
  },
  "105560": {
   "price": 151400,
   "date": "2026-11-03",
   "changePct": -1.3,
   "close": 151400,
   "closeDate": "2026-11-03"
  },
  "138040": {
   "price": 130400,
   "date": "2026-11-03",
   "changePct": 0.7,
   "close": 130400,
   "closeDate": "2026-11-03"
  },
  "139130": {
   "price": 15300,
   "date": "2026-11-03",
   "changePct": -1.2,
   "close": 15300,
   "closeDate": "2026-11-03"
  },
  "175330": {
   "price": 25200,
   "date": "2026-11-03",
   "changePct": -0.8,
   "close": 25200,
   "closeDate": "2026-11-03"
  },
  "192400": {
   "price": 27100,
   "date": "2026-11-03",
   "changePct": -0.2,
   "close": 27100,
   "closeDate": "2026-11-03"
  },
  "207940": {
   "price": 1452000,
   "date": "2026-11-03",
   "changePct": 2.1,
   "close": 1452000,
   "closeDate": "2026-11-03"
  },
  "241560": {
   "price": 48950,
   "date": "2026-11-03",
   "changePct": 0,
   "close": 48950,
   "closeDate": "2026-11-03"
  },
  "267250": {
   "price": 140700,
   "date": "2026-11-03",
   "changePct": -3.4,
   "close": 140700,
   "closeDate": "2026-11-03"
  },
  "267260": {
   "price": 439000,
   "date": "2026-11-03",
   "changePct": -1.7,
   "close": 439000,
   "closeDate": "2026-11-03"
  },
  "267270": {
   "price": 80900,
   "date": "2026-11-03",
   "changePct": 0.4,
   "close": 80900,
   "closeDate": "2026-11-03"
  },
  "278470": {
   "price": 246000,
   "date": "2026-11-03",
   "changePct": -6.6,
   "close": 246000,
   "closeDate": "2026-11-03"
  },
  "298040": {
   "price": 1971000,
   "date": "2026-11-03",
   "changePct": -3.9,
   "close": 1971000,
   "closeDate": "2026-11-03"
  },
  "316140": {
   "price": 30150,
   "date": "2026-11-03",
   "changePct": -0.8,
   "close": 30150,
   "closeDate": "2026-11-03"
  },
  "323410": {
   "price": 19240,
   "date": "2026-11-03",
   "changePct": -2.7,
   "close": 19240,
   "closeDate": "2026-11-03"
  },
  "329180": {
   "price": 287500,
   "date": "2026-11-03",
   "changePct": -0.2,
   "close": 287500,
   "closeDate": "2026-11-03"
  },
  "361610": {
   "price": 13740,
   "date": "2026-11-03",
   "changePct": -8.4,
   "close": 13740,
   "closeDate": "2026-11-03"
  },
  "005930": {
   "price": 219500,
   "date": "2026-11-03",
   "changePct": -4.1,
   "close": 219500,
   "closeDate": "2026-11-03"
  },
  "055550": {
   "price": 85600,
   "date": "2026-11-03",
   "changePct": -1.4,
   "close": 85600,
   "closeDate": "2026-11-03"
  },
  "000810": {
   "price": 651000,
   "date": "2026-11-03",
   "changePct": 0,
   "close": 651000,
   "closeDate": "2026-11-03"
  },
  "028260": {
   "price": 309500,
   "date": "2026-11-03",
   "changePct": -2.2,
   "close": 309500,
   "closeDate": "2026-11-03"
  },
  "086790": {
   "price": 116100,
   "date": "2026-11-03",
   "changePct": -1.4,
   "close": 116100,
   "closeDate": "2026-11-03"
  },
  "012450": {
   "price": 740000,
   "date": "2026-11-03",
   "changePct": 0,
   "close": 740000,
   "closeDate": "2026-11-03"
  },
  "009540": {
   "price": 256500,
   "date": "2026-11-03",
   "changePct": 3,
   "close": 256500,
   "closeDate": "2026-11-03"
  },
  "068270": {
   "price": 189900,
   "date": "2026-11-03",
   "changePct": -1.1,
   "close": 189900,
   "closeDate": "2026-11-03"
  },
  "000270": {
   "price": 96600,
   "date": "2026-11-03",
   "changePct": 0.9,
   "close": 96600,
   "closeDate": "2026-11-03"
  },
  "032640": {
   "price": 14480,
   "date": "2026-11-03",
   "changePct": -0.4,
   "close": 14480,
   "closeDate": "2026-11-03"
  },
  "029780": {
   "price": 41350,
   "date": "2026-11-03",
   "changePct": -0.4,
   "close": 41350,
   "closeDate": "2026-11-03"
  },
  "035900": {
   "price": 37400,
   "date": "2026-11-03",
   "changePct": -1.4,
   "close": 37400,
   "closeDate": "2026-11-03"
  },
  "036570": {
   "price": 195300,
   "date": "2026-11-03",
   "changePct": -1.6,
   "close": 195300,
   "closeDate": "2026-11-03"
  },
  "035720": {
   "price": 28800,
   "date": "2026-11-03",
   "changePct": -3,
   "close": 28800,
   "closeDate": "2026-11-03"
  },
  "001040": {
   "price": 113300,
   "date": "2026-11-03",
   "changePct": -1.3,
   "close": 113300,
   "closeDate": "2026-11-03"
  },
  "012750": {
   "price": 97500,
   "date": "2026-11-03",
   "changePct": 1.6,
   "close": 97500,
   "closeDate": "2026-11-03"
  },
  "000660": {
   "price": 1398000,
   "date": "2026-11-03",
   "changePct": -5,
   "close": 1398000,
   "closeDate": "2026-11-03"
  },
  "001120": {
   "price": 39450,
   "date": "2026-11-03",
   "changePct": -3.1,
   "close": 39450,
   "closeDate": "2026-11-03"
  },
  "005830": {
   "price": 174100,
   "date": "2026-11-03",
   "changePct": -0.9,
   "close": 174100,
   "closeDate": "2026-11-03"
  },
  "066570": {
   "price": 144500,
   "date": "2026-11-03",
   "changePct": -6,
   "close": 144500,
   "closeDate": "2026-11-03"
  },
  "086280": {
   "price": 201000,
   "date": "2026-11-03",
   "changePct": -1.7,
   "close": 201000,
   "closeDate": "2026-11-03"
  },
  "018260": {
   "price": 201500,
   "date": "2026-11-03",
   "changePct": -3.4,
   "close": 201500,
   "closeDate": "2026-11-03"
  },
  "005850": {
   "price": 47600,
   "date": "2026-11-03",
   "changePct": -2.2,
   "close": 47600,
   "closeDate": "2026-11-03"
  },
  "005490": {
   "price": 266500,
   "date": "2026-11-03",
   "changePct": -5.8,
   "close": 266500,
   "closeDate": "2026-11-03"
  },
  "035420": {
   "price": 169000,
   "date": "2026-11-03",
   "changePct": -3.6,
   "close": 169000,
   "closeDate": "2026-11-03"
  },
  "010120": {
   "price": 151500,
   "date": "2026-11-03",
   "changePct": -5.7,
   "close": 151500,
   "closeDate": "2026-11-03"
  },
  "030200": {
   "price": 47500,
   "date": "2026-11-03",
   "changePct": 1.7,
   "close": 47500,
   "closeDate": "2026-11-03"
  },
  "012330": {
   "price": 350500,
   "date": "2026-11-03",
   "changePct": 0.1,
   "close": 350500,
   "closeDate": "2026-11-03"
  },
  "047050": {
   "price": 50000,
   "date": "2026-11-03",
   "changePct": -2.7,
   "close": 50000,
   "closeDate": "2026-11-03"
  },
  "021240": {
   "price": 103900,
   "date": "2026-11-03",
   "changePct": -1.1,
   "close": 103900,
   "closeDate": "2026-11-03"
  },
  "033780": {
   "price": 192700,
   "date": "2026-11-03",
   "changePct": 0.1,
   "close": 192700,
   "closeDate": "2026-11-03"
  },
  "030190": {
   "price": 17290,
   "date": "2026-11-03",
   "changePct": 0.8,
   "close": 17290,
   "closeDate": "2026-11-03"
  },
  "MSFT": {
   "price": 520.99,
   "date": "2026-11-03",
   "changePct": 2.7,
   "close": 520.99,
   "closeDate": "2026-11-03"
  },
  "V": {
   "price": 420.42,
   "date": "2026-11-03",
   "changePct": -1.2,
   "close": 420.42,
   "closeDate": "2026-11-03"
  },
  "MA": {
   "price": 647.18,
   "date": "2026-11-03",
   "changePct": -1.7,
   "close": 647.18,
   "closeDate": "2026-11-03"
  },
  "GOOGL": {
   "price": 280.03,
   "date": "2026-11-03",
   "changePct": 0.4,
   "close": 280.03,
   "closeDate": "2026-11-03"
  },
  "COST": {
   "price": 1019.26,
   "date": "2026-11-03",
   "changePct": -2,
   "close": 1019.26,
   "closeDate": "2026-11-03"
  },
  "NVDA": {
   "price": 206.69,
   "date": "2026-11-03",
   "changePct": 2.3,
   "close": 206.69,
   "closeDate": "2026-11-03"
  },
  "META": {
   "price": 621.03,
   "date": "2026-11-03",
   "changePct": 2.4,
   "close": 621.03,
   "closeDate": "2026-11-03"
  },
  "AVGO": {
   "price": 332.13,
   "date": "2026-11-03",
   "changePct": 3.1,
   "close": 332.13,
   "closeDate": "2026-11-03"
  },
  "AMZN": {
   "price": 250.69,
   "date": "2026-11-03",
   "changePct": 2.1,
   "close": 250.69,
   "closeDate": "2026-11-03"
  },
  "TSM": {
   "price": 404.8,
   "date": "2026-11-03",
   "changePct": 1.5,
   "close": 404.8,
   "closeDate": "2026-11-03"
  },
  "UBER": {
   "price": 66.6,
   "date": "2026-11-03",
   "changePct": -0.2,
   "close": 66.6,
   "closeDate": "2026-11-03"
  },
  "GM": {
   "price": 88.34,
   "date": "2026-11-03",
   "changePct": -1.8,
   "close": 88.34,
   "closeDate": "2026-11-03"
  },
  "VZ": {
   "price": 45.24,
   "date": "2026-11-03",
   "changePct": 0.4,
   "close": 45.24,
   "closeDate": "2026-11-03"
  },
  "C": {
   "price": 122.71,
   "date": "2026-11-03",
   "changePct": -0.3,
   "close": 122.71,
   "closeDate": "2026-11-03"
  },
  "DUK": {
   "price": 126.51,
   "date": "2026-11-03",
   "changePct": -1.5,
   "close": 126.51,
   "closeDate": "2026-11-03"
  },
  "KO": {
   "price": 94.8,
   "date": "2026-11-03",
   "changePct": -1.1,
   "close": 94.8,
   "closeDate": "2026-11-03"
  },
  "JNJ": {
   "price": 266.17,
   "date": "2026-11-03",
   "changePct": -1.6,
   "close": 266.17,
   "closeDate": "2026-11-03"
  },
  "LLY": {
   "price": 1409.38,
   "date": "2026-11-03",
   "changePct": -0.1,
   "close": 1409.38,
   "closeDate": "2026-11-03"
  },
  "CI": {
   "price": 295.44,
   "date": "2026-11-03",
   "changePct": 0.1,
   "close": 295.44,
   "closeDate": "2026-11-03"
  },
  "NOW": {
   "price": 109.16,
   "date": "2026-11-03",
   "changePct": 3,
   "close": 109.16,
   "closeDate": "2026-11-03"
  },
  "TSLA": {
   "price": 398.5,
   "date": "2026-11-03",
   "changePct": -1.3,
   "close": 398.5,
   "closeDate": "2026-11-03"
  },
  "MDLZ": {
   "price": 65.12,
   "date": "2026-11-03",
   "changePct": -1.9,
   "close": 65.12,
   "closeDate": "2026-11-03"
  },
  "AAPL": {
   "price": 331.9,
   "date": "2026-11-03",
   "changePct": -1.9,
   "close": 331.9,
   "closeDate": "2026-11-03"
  },
  "MU": {
   "price": 855.1,
   "date": "2026-11-03",
   "changePct": 2.6,
   "close": 855.1,
   "closeDate": "2026-11-03"
  },
  "MDT": {
   "price": 98.88,
   "date": "2026-11-03",
   "changePct": -0.4,
   "close": 98.88,
   "closeDate": "2026-11-03"
  },
  "IREN": {
   "price": 24.46,
   "date": "2026-11-03",
   "changePct": 11.1,
   "close": 24.46,
   "closeDate": "2026-11-03"
  },
  "UNH": {
   "price": 404.44,
   "date": "2026-11-03",
   "changePct": 1,
   "close": 404.44,
   "closeDate": "2026-11-03"
  },
  "DVN": {
   "price": 47.62,
   "date": "2026-11-03",
   "changePct": -2.1,
   "close": 47.62,
   "closeDate": "2026-11-03"
  },
  "GS": {
   "price": 896.09,
   "date": "2026-11-03",
   "changePct": -0.3,
   "close": 896.09,
   "closeDate": "2026-11-03"
  },
  "AMP": {
   "price": 504.88,
   "date": "2026-11-03",
   "changePct": 0.1,
   "close": 504.88,
   "closeDate": "2026-11-03"
  },
  "PNC": {
   "price": 229.41,
   "date": "2026-11-03",
   "changePct": -1,
   "close": 229.41,
   "closeDate": "2026-11-03"
  },
  "MTB": {
   "price": 222.07,
   "date": "2026-11-03",
   "changePct": -1.1,
   "close": 222.07,
   "closeDate": "2026-11-03"
  },
  "SO": {
   "price": 93.75,
   "date": "2026-11-03",
   "changePct": -0.9,
   "close": 93.75,
   "closeDate": "2026-11-03"
  },
  "WEC": {
   "price": 115.4,
   "date": "2026-11-03",
   "changePct": -1.3,
   "close": 115.4,
   "closeDate": "2026-11-03"
  },
  "TJX": {
   "price": 137.63,
   "date": "2026-11-03",
   "changePct": -2.4,
   "close": 137.63,
   "closeDate": "2026-11-03"
  },
  "ANET": {
   "price": 169.91,
   "date": "2026-11-03",
   "changePct": 3.5,
   "close": 169.91,
   "closeDate": "2026-11-03"
  },
  "GD": {
   "price": 374.5,
   "date": "2026-11-03",
   "changePct": 0.3,
   "close": 374.5,
   "closeDate": "2026-11-03"
  },
  "LMT": {
   "price": 639,
   "date": "2026-11-03",
   "changePct": -0.6,
   "close": 639,
   "closeDate": "2026-11-03"
  },
  "CB": {
   "price": 366.54,
   "date": "2026-11-03",
   "changePct": -0.7,
   "close": 366.54,
   "closeDate": "2026-11-03"
  },
  "GILD": {
   "price": 167.47,
   "date": "2026-11-03",
   "changePct": -1.7,
   "close": 167.47,
   "closeDate": "2026-11-03"
  },
  "BRK.B": {
   "price": 557.07,
   "date": "2026-11-03",
   "changePct": 0.2,
   "close": 557.07,
   "closeDate": "2026-11-03"
  },
  "TMO": {
   "price": 698.34,
   "date": "2026-11-03",
   "changePct": 2.3,
   "close": 698.34,
   "closeDate": "2026-11-03"
  },
  "ECL": {
   "price": 304.68,
   "date": "2026-11-03",
   "changePct": -1.2,
   "close": 304.68,
   "closeDate": "2026-11-03"
  },
  "MSI": {
   "price": 491,
   "date": "2026-11-03",
   "changePct": 0.8,
   "close": 491,
   "closeDate": "2026-11-03"
  },
  "MSCI": {
   "price": 639.78,
   "date": "2026-11-03",
   "changePct": 0.4,
   "close": 639.78,
   "closeDate": "2026-11-03"
  },
  "RSG": {
   "price": 242.87,
   "date": "2026-11-03",
   "changePct": -1.3,
   "close": 242.87,
   "closeDate": "2026-11-03"
  },
  "CTAS": {
   "price": 223.74,
   "date": "2026-11-03",
   "changePct": -0.5,
   "close": 223.74,
   "closeDate": "2026-11-03"
  },
  "ORLY": {
   "price": 89.99,
   "date": "2026-11-03",
   "changePct": -0.8,
   "close": 89.99,
   "closeDate": "2026-11-03"
  },
  "YUM": {
   "price": 157.01,
   "date": "2026-11-03",
   "changePct": -0.4,
   "close": 157.01,
   "closeDate": "2026-11-03"
  },
  "ADP": {
   "price": 296.01,
   "date": "2026-11-03",
   "changePct": -0.9,
   "close": 296.01,
   "closeDate": "2026-11-03"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5648.79,
   "date": "2026-11-03",
   "changePct": -3.6,
   "close": 5648.79,
   "closeDate": "2026-11-03"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7568.92,
   "date": "2026-11-03",
   "changePct": 0.4,
   "close": 7568.92,
   "closeDate": "2026-11-03"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 219.26,
   "date": "2026-11-03",
   "changePct": -0.3,
   "close": 219.26,
   "closeDate": "2026-11-03"
  }
 }
};
