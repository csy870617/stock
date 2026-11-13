// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-13",
 "quotes": {
  "103590": {
   "price": 56700,
   "date": "2026-11-13",
   "changePct": 4.4,
   "close": 56700,
   "closeDate": "2026-11-13"
  },
  "105560": {
   "price": 159000,
   "date": "2026-11-13",
   "changePct": 4.7,
   "close": 159000,
   "closeDate": "2026-11-13"
  },
  "138040": {
   "price": 118700,
   "date": "2026-11-13",
   "changePct": 5.4,
   "close": 118700,
   "closeDate": "2026-11-13"
  },
  "139130": {
   "price": 15750,
   "date": "2026-11-13",
   "changePct": 2.1,
   "close": 15750,
   "closeDate": "2026-11-13"
  },
  "175330": {
   "price": 26950,
   "date": "2026-11-13",
   "changePct": 2.1,
   "close": 26950,
   "closeDate": "2026-11-13"
  },
  "192400": {
   "price": 27500,
   "date": "2026-11-13",
   "changePct": 0.2,
   "close": 27500,
   "closeDate": "2026-11-13"
  },
  "207940": {
   "price": 1411000,
   "date": "2026-11-13",
   "changePct": -2.6,
   "close": 1411000,
   "closeDate": "2026-11-13"
  },
  "241560": {
   "price": 53000,
   "date": "2026-11-13",
   "changePct": 1.9,
   "close": 53000,
   "closeDate": "2026-11-13"
  },
  "267250": {
   "price": 124600,
   "date": "2026-11-13",
   "changePct": 0.9,
   "close": 124600,
   "closeDate": "2026-11-13"
  },
  "267260": {
   "price": 416000,
   "date": "2026-11-13",
   "changePct": -1.2,
   "close": 416000,
   "closeDate": "2026-11-13"
  },
  "267270": {
   "price": 93000,
   "date": "2026-11-13",
   "changePct": 1.6,
   "close": 93000,
   "closeDate": "2026-11-13"
  },
  "278470": {
   "price": 236000,
   "date": "2026-11-13",
   "changePct": -2.3,
   "close": 236000,
   "closeDate": "2026-11-13"
  },
  "298040": {
   "price": 1807000,
   "date": "2026-11-13",
   "changePct": -1.6,
   "close": 1807000,
   "closeDate": "2026-11-13"
  },
  "316140": {
   "price": 32500,
   "date": "2026-11-13",
   "changePct": 3,
   "close": 32500,
   "closeDate": "2026-11-13"
  },
  "323410": {
   "price": 20800,
   "date": "2026-11-13",
   "changePct": 2.7,
   "close": 20800,
   "closeDate": "2026-11-13"
  },
  "361610": {
   "price": 12650,
   "date": "2026-11-13",
   "changePct": -1.5,
   "close": 12650,
   "closeDate": "2026-11-13"
  },
  "005930": {
   "price": 206000,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 206000,
   "closeDate": "2026-11-13"
  },
  "055550": {
   "price": 89800,
   "date": "2026-11-13",
   "changePct": 5.6,
   "close": 89800,
   "closeDate": "2026-11-13"
  },
  "000810": {
   "price": 529000,
   "date": "2026-11-13",
   "changePct": 0.8,
   "close": 529000,
   "closeDate": "2026-11-13"
  },
  "012450": {
   "price": 641000,
   "date": "2026-11-13",
   "changePct": -2,
   "close": 641000,
   "closeDate": "2026-11-13"
  },
  "009540": {
   "price": 237500,
   "date": "2026-11-13",
   "changePct": -0.2,
   "close": 237500,
   "closeDate": "2026-11-13"
  },
  "068270": {
   "price": 214000,
   "date": "2026-11-13",
   "changePct": 2.1,
   "close": 214000,
   "closeDate": "2026-11-13"
  },
  "000270": {
   "price": 94600,
   "date": "2026-11-13",
   "changePct": 1.1,
   "close": 94600,
   "closeDate": "2026-11-13"
  },
  "032640": {
   "price": 15550,
   "date": "2026-11-13",
   "changePct": 3.2,
   "close": 15550,
   "closeDate": "2026-11-13"
  },
  "029780": {
   "price": 40850,
   "date": "2026-11-13",
   "changePct": 0.9,
   "close": 40850,
   "closeDate": "2026-11-13"
  },
  "035900": {
   "price": 43500,
   "date": "2026-11-13",
   "changePct": -3.5,
   "close": 43500,
   "closeDate": "2026-11-13"
  },
  "036570": {
   "price": 179000,
   "date": "2026-11-13",
   "changePct": -5.7,
   "close": 179000,
   "closeDate": "2026-11-13"
  },
  "035720": {
   "price": 31700,
   "date": "2026-11-13",
   "changePct": 0,
   "close": 31700,
   "closeDate": "2026-11-13"
  },
  "001040": {
   "price": 110800,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 110800,
   "closeDate": "2026-11-13"
  },
  "012750": {
   "price": 101200,
   "date": "2026-11-13",
   "changePct": 1.9,
   "close": 101200,
   "closeDate": "2026-11-13"
  },
  "000660": {
   "price": 1216000,
   "date": "2026-11-13",
   "changePct": -3,
   "close": 1216000,
   "closeDate": "2026-11-13"
  },
  "086790": {
   "price": 124600,
   "date": "2026-11-13",
   "changePct": 3.4,
   "close": 124600,
   "closeDate": "2026-11-13"
  },
  "001120": {
   "price": 35050,
   "date": "2026-11-13",
   "changePct": 1.3,
   "close": 35050,
   "closeDate": "2026-11-13"
  },
  "005830": {
   "price": 163600,
   "date": "2026-11-13",
   "changePct": 0.7,
   "close": 163600,
   "closeDate": "2026-11-13"
  },
  "066570": {
   "price": 135600,
   "date": "2026-11-13",
   "changePct": -1.2,
   "close": 135600,
   "closeDate": "2026-11-13"
  },
  "086280": {
   "price": 204500,
   "date": "2026-11-13",
   "changePct": -0.5,
   "close": 204500,
   "closeDate": "2026-11-13"
  },
  "018260": {
   "price": 234500,
   "date": "2026-11-13",
   "changePct": 1.7,
   "close": 234500,
   "closeDate": "2026-11-13"
  },
  "005850": {
   "price": 47500,
   "date": "2026-11-13",
   "changePct": 2.8,
   "close": 47500,
   "closeDate": "2026-11-13"
  },
  "005490": {
   "price": 275000,
   "date": "2026-11-13",
   "changePct": 0,
   "close": 275000,
   "closeDate": "2026-11-13"
  },
  "035420": {
   "price": 172500,
   "date": "2026-11-13",
   "changePct": -5.1,
   "close": 172500,
   "closeDate": "2026-11-13"
  },
  "010120": {
   "price": 123300,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 123300,
   "closeDate": "2026-11-13"
  },
  "030200": {
   "price": 51000,
   "date": "2026-11-13",
   "changePct": -0.6,
   "close": 51000,
   "closeDate": "2026-11-13"
  },
  "012330": {
   "price": 355500,
   "date": "2026-11-13",
   "changePct": 1,
   "close": 355500,
   "closeDate": "2026-11-13"
  },
  "047050": {
   "price": 49850,
   "date": "2026-11-13",
   "changePct": 1.7,
   "close": 49850,
   "closeDate": "2026-11-13"
  },
  "030190": {
   "price": 17740,
   "date": "2026-11-13",
   "changePct": -2.8,
   "close": 17740,
   "closeDate": "2026-11-13"
  },
  "042700": {
   "price": 181700,
   "date": "2026-11-13",
   "changePct": -0.1,
   "close": 181700,
   "closeDate": "2026-11-13"
  },
  "064400": {
   "price": 78500,
   "date": "2026-11-13",
   "changePct": 4.1,
   "close": 78500,
   "closeDate": "2026-11-13"
  },
  "095340": {
   "price": 150900,
   "date": "2026-11-13",
   "changePct": 5.2,
   "close": 150900,
   "closeDate": "2026-11-13"
  },
  "MSFT": {
   "price": 523,
   "date": "2026-11-12",
   "changePct": 0.4,
   "close": 523,
   "closeDate": "2026-11-12"
  },
  "V": {
   "price": 420.31,
   "date": "2026-11-12",
   "changePct": -1.2,
   "close": 420.31,
   "closeDate": "2026-11-12"
  },
  "MA": {
   "price": 652.6,
   "date": "2026-11-12",
   "changePct": -1.2,
   "close": 652.6,
   "closeDate": "2026-11-12"
  },
  "GOOGL": {
   "price": 298.7,
   "date": "2026-11-12",
   "changePct": 1.8,
   "close": 298.7,
   "closeDate": "2026-11-12"
  },
  "COST": {
   "price": 1092.21,
   "date": "2026-11-12",
   "changePct": 0.4,
   "close": 1092.21,
   "closeDate": "2026-11-12"
  },
  "NVDA": {
   "price": 166.19,
   "date": "2026-11-12",
   "changePct": -4.3,
   "close": 166.19,
   "closeDate": "2026-11-12"
  },
  "META": {
   "price": 623.61,
   "date": "2026-11-12",
   "changePct": -0.8,
   "close": 623.61,
   "closeDate": "2026-11-12"
  },
  "AVGO": {
   "price": 364.36,
   "date": "2026-11-12",
   "changePct": 5.5,
   "close": 364.36,
   "closeDate": "2026-11-12"
  },
  "TSM": {
   "price": 405.49,
   "date": "2026-11-12",
   "changePct": -1.9,
   "close": 405.49,
   "closeDate": "2026-11-12"
  },
  "UBER": {
   "price": 69.12,
   "date": "2026-11-12",
   "changePct": -2.2,
   "close": 69.12,
   "closeDate": "2026-11-12"
  },
  "GM": {
   "price": 86.25,
   "date": "2026-11-12",
   "changePct": -3,
   "close": 86.25,
   "closeDate": "2026-11-12"
  },
  "VZ": {
   "price": 46.55,
   "date": "2026-11-12",
   "changePct": -0.1,
   "close": 46.55,
   "closeDate": "2026-11-12"
  },
  "C": {
   "price": 124.06,
   "date": "2026-11-12",
   "changePct": -0.1,
   "close": 124.06,
   "closeDate": "2026-11-12"
  },
  "DUK": {
   "price": 128.59,
   "date": "2026-11-12",
   "changePct": -0.1,
   "close": 128.59,
   "closeDate": "2026-11-12"
  },
  "KO": {
   "price": 97.44,
   "date": "2026-11-12",
   "changePct": -0.1,
   "close": 97.44,
   "closeDate": "2026-11-12"
  },
  "JNJ": {
   "price": 283.52,
   "date": "2026-11-12",
   "changePct": 1.1,
   "close": 283.52,
   "closeDate": "2026-11-12"
  },
  "LLY": {
   "price": 1427.28,
   "date": "2026-11-12",
   "changePct": -0.7,
   "close": 1427.28,
   "closeDate": "2026-11-12"
  },
  "CI": {
   "price": 296.27,
   "date": "2026-11-12",
   "changePct": -1.7,
   "close": 296.27,
   "closeDate": "2026-11-12"
  },
  "TSLA": {
   "price": 397.45,
   "date": "2026-11-12",
   "changePct": 1.7,
   "close": 397.45,
   "closeDate": "2026-11-12"
  },
  "AAPL": {
   "price": 354.88,
   "date": "2026-11-12",
   "changePct": -0.2,
   "close": 354.88,
   "closeDate": "2026-11-12"
  },
  "MU": {
   "price": 798.44,
   "date": "2026-11-12",
   "changePct": -1.6,
   "close": 798.44,
   "closeDate": "2026-11-12"
  },
  "MDT": {
   "price": 100.99,
   "date": "2026-11-12",
   "changePct": -0.6,
   "close": 100.99,
   "closeDate": "2026-11-12"
  },
  "IREN": {
   "price": 19.48,
   "date": "2026-11-12",
   "changePct": -6.5,
   "close": 19.48,
   "closeDate": "2026-11-12"
  },
  "UNH": {
   "price": 405.13,
   "date": "2026-11-12",
   "changePct": 0.5,
   "close": 405.13,
   "closeDate": "2026-11-12"
  },
  "DVN": {
   "price": 46.23,
   "date": "2026-11-12",
   "changePct": 2.8,
   "close": 46.23,
   "closeDate": "2026-11-12"
  },
  "GS": {
   "price": 913.6,
   "date": "2026-11-12",
   "changePct": -1.4,
   "close": 913.6,
   "closeDate": "2026-11-12"
  },
  "AMP": {
   "price": 513.48,
   "date": "2026-11-12",
   "changePct": -1.3,
   "close": 513.48,
   "closeDate": "2026-11-12"
  },
  "PNC": {
   "price": 231.03,
   "date": "2026-11-12",
   "changePct": -0.4,
   "close": 231.03,
   "closeDate": "2026-11-12"
  },
  "MTB": {
   "price": 219.78,
   "date": "2026-11-12",
   "changePct": -0.2,
   "close": 219.78,
   "closeDate": "2026-11-12"
  },
  "SO": {
   "price": 92.47,
   "date": "2026-11-12",
   "changePct": -1.5,
   "close": 92.47,
   "closeDate": "2026-11-12"
  },
  "WEC": {
   "price": 117.48,
   "date": "2026-11-12",
   "changePct": 0,
   "close": 117.48,
   "closeDate": "2026-11-12"
  },
  "TJX": {
   "price": 135.98,
   "date": "2026-11-12",
   "changePct": -0.3,
   "close": 135.98,
   "closeDate": "2026-11-12"
  },
  "ANET": {
   "price": 206.63,
   "date": "2026-11-12",
   "changePct": 5.1,
   "close": 206.63,
   "closeDate": "2026-11-12"
  },
  "GD": {
   "price": 363.07,
   "date": "2026-11-12",
   "changePct": -1.1,
   "close": 363.07,
   "closeDate": "2026-11-12"
  },
  "LMT": {
   "price": 604.09,
   "date": "2026-11-12",
   "changePct": -1,
   "close": 604.09,
   "closeDate": "2026-11-12"
  },
  "CB": {
   "price": 371.76,
   "date": "2026-11-12",
   "changePct": 0.4,
   "close": 371.76,
   "closeDate": "2026-11-12"
  },
  "GILD": {
   "price": 167.95,
   "date": "2026-11-12",
   "changePct": -1,
   "close": 167.95,
   "closeDate": "2026-11-12"
  },
  "BRK.B": {
   "price": 589.83,
   "date": "2026-11-12",
   "changePct": 0.3,
   "close": 589.83,
   "closeDate": "2026-11-12"
  },
  "TMO": {
   "price": 699.44,
   "date": "2026-11-12",
   "changePct": -2.5,
   "close": 699.44,
   "closeDate": "2026-11-12"
  },
  "ECL": {
   "price": 304.41,
   "date": "2026-11-12",
   "changePct": -1.1,
   "close": 304.41,
   "closeDate": "2026-11-12"
  },
  "RSG": {
   "price": 253,
   "date": "2026-11-12",
   "changePct": 1.5,
   "close": 253,
   "closeDate": "2026-11-12"
  },
  "CTAS": {
   "price": 227.52,
   "date": "2026-11-12",
   "changePct": 0.1,
   "close": 227.52,
   "closeDate": "2026-11-12"
  },
  "ORLY": {
   "price": 91.56,
   "date": "2026-11-12",
   "changePct": 1.1,
   "close": 91.56,
   "closeDate": "2026-11-12"
  },
  "ADP": {
   "price": 307.92,
   "date": "2026-11-12",
   "changePct": 0.5,
   "close": 307.92,
   "closeDate": "2026-11-12"
  },
  "FAST": {
   "price": 55.55,
   "date": "2026-11-12",
   "changePct": 0.1,
   "close": 55.55,
   "closeDate": "2026-11-12"
  },
  "VRT": {
   "price": 209.64,
   "date": "2026-11-12",
   "changePct": 1.5,
   "close": 209.64,
   "closeDate": "2026-11-12"
  },
  "WAB": {
   "price": 300.51,
   "date": "2026-11-12",
   "changePct": -1.2,
   "close": 300.51,
   "closeDate": "2026-11-12"
  },
  "NTES": {
   "price": 122.63,
   "date": "2026-11-12",
   "changePct": 0.4,
   "close": 122.63,
   "closeDate": "2026-11-12"
  },
  "ROST": {
   "price": 237.24,
   "date": "2026-11-12",
   "changePct": -1.7,
   "close": 237.24,
   "closeDate": "2026-11-12"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5290.53,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 5290.53,
   "closeDate": "2026-11-13"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7592.4,
   "date": "2026-11-12",
   "changePct": -0.4,
   "close": 7592.4,
   "closeDate": "2026-11-12"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 220.72,
   "date": "2026-11-12",
   "changePct": -0.9,
   "close": 220.72,
   "closeDate": "2026-11-12"
  }
 }
};
