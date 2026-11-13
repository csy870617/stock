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
   "price": 57900,
   "date": "2026-11-13",
   "changePct": 6.6,
   "close": 54300,
   "closeDate": "2026-11-12"
  },
  "105560": {
   "price": 158000,
   "date": "2026-11-13",
   "changePct": 4.1,
   "close": 151800,
   "closeDate": "2026-11-12"
  },
  "138040": {
   "price": 118900,
   "date": "2026-11-13",
   "changePct": 5.6,
   "close": 112600,
   "closeDate": "2026-11-12"
  },
  "139130": {
   "price": 15900,
   "date": "2026-11-13",
   "changePct": 3.1,
   "close": 15420,
   "closeDate": "2026-11-12"
  },
  "175330": {
   "price": 27200,
   "date": "2026-11-13",
   "changePct": 3,
   "close": 26400,
   "closeDate": "2026-11-12"
  },
  "192400": {
   "price": 27550,
   "date": "2026-11-13",
   "changePct": 0.4,
   "close": 27450,
   "closeDate": "2026-11-12"
  },
  "207940": {
   "price": 1437000,
   "date": "2026-11-13",
   "changePct": -0.8,
   "close": 1449000,
   "closeDate": "2026-11-12"
  },
  "241560": {
   "price": 53300,
   "date": "2026-11-13",
   "changePct": 2.5,
   "close": 52000,
   "closeDate": "2026-11-12"
  },
  "267250": {
   "price": 126900,
   "date": "2026-11-13",
   "changePct": 2.8,
   "close": 123500,
   "closeDate": "2026-11-12"
  },
  "267260": {
   "price": 428500,
   "date": "2026-11-13",
   "changePct": 1.8,
   "close": 421000,
   "closeDate": "2026-11-12"
  },
  "267270": {
   "price": 94100,
   "date": "2026-11-13",
   "changePct": 2.8,
   "close": 91500,
   "closeDate": "2026-11-12"
  },
  "278470": {
   "price": 240500,
   "date": "2026-11-13",
   "changePct": -0.4,
   "close": 241500,
   "closeDate": "2026-11-12"
  },
  "298040": {
   "price": 1854000,
   "date": "2026-11-13",
   "changePct": 0.9,
   "close": 1837000,
   "closeDate": "2026-11-12"
  },
  "316140": {
   "price": 32550,
   "date": "2026-11-13",
   "changePct": 3.2,
   "close": 31550,
   "closeDate": "2026-11-12"
  },
  "323410": {
   "price": 20850,
   "date": "2026-11-13",
   "changePct": 3,
   "close": 20250,
   "closeDate": "2026-11-12"
  },
  "361610": {
   "price": 12940,
   "date": "2026-11-13",
   "changePct": 0.8,
   "close": 12840,
   "closeDate": "2026-11-12"
  },
  "005930": {
   "price": 213000,
   "date": "2026-11-13",
   "changePct": 2.4,
   "close": 208000,
   "closeDate": "2026-11-12"
  },
  "055550": {
   "price": 90000,
   "date": "2026-11-13",
   "changePct": 5.9,
   "close": 85000,
   "closeDate": "2026-11-12"
  },
  "000810": {
   "price": 541000,
   "date": "2026-11-13",
   "changePct": 3,
   "close": 525000,
   "closeDate": "2026-11-12"
  },
  "012450": {
   "price": 657000,
   "date": "2026-11-13",
   "changePct": 0.5,
   "close": 654000,
   "closeDate": "2026-11-12"
  },
  "009540": {
   "price": 245500,
   "date": "2026-11-13",
   "changePct": 3.2,
   "close": 238000,
   "closeDate": "2026-11-12"
  },
  "068270": {
   "price": 211500,
   "date": "2026-11-13",
   "changePct": 1,
   "close": 209500,
   "closeDate": "2026-11-12"
  },
  "000270": {
   "price": 94900,
   "date": "2026-11-13",
   "changePct": 1.4,
   "close": 93600,
   "closeDate": "2026-11-12"
  },
  "032640": {
   "price": 15510,
   "date": "2026-11-13",
   "changePct": 2.9,
   "close": 15070,
   "closeDate": "2026-11-12"
  },
  "029780": {
   "price": 41000,
   "date": "2026-11-13",
   "changePct": 1.2,
   "close": 40500,
   "closeDate": "2026-11-12"
  },
  "035900": {
   "price": 45600,
   "date": "2026-11-13",
   "changePct": 1.1,
   "close": 45100,
   "closeDate": "2026-11-12"
  },
  "036570": {
   "price": 185700,
   "date": "2026-11-13",
   "changePct": -2.2,
   "close": 189800,
   "closeDate": "2026-11-12"
  },
  "035720": {
   "price": 32125,
   "date": "2026-11-13",
   "changePct": 1.3,
   "close": 31700,
   "closeDate": "2026-11-12"
  },
  "001040": {
   "price": 112000,
   "date": "2026-11-13",
   "changePct": 0.1,
   "close": 111900,
   "closeDate": "2026-11-12"
  },
  "012750": {
   "price": 100500,
   "date": "2026-11-13",
   "changePct": 1.2,
   "close": 99300,
   "closeDate": "2026-11-12"
  },
  "000660": {
   "price": 1290000,
   "date": "2026-11-13",
   "changePct": 2.9,
   "close": 1254000,
   "closeDate": "2026-11-12"
  },
  "086790": {
   "price": 124800,
   "date": "2026-11-13",
   "changePct": 3.6,
   "close": 120500,
   "closeDate": "2026-11-12"
  },
  "001120": {
   "price": 34650,
   "date": "2026-11-13",
   "changePct": 0.1,
   "close": 34600,
   "closeDate": "2026-11-12"
  },
  "005830": {
   "price": 163600,
   "date": "2026-11-13",
   "changePct": 0.7,
   "close": 162500,
   "closeDate": "2026-11-12"
  },
  "066570": {
   "price": 140400,
   "date": "2026-11-13",
   "changePct": 2.3,
   "close": 137200,
   "closeDate": "2026-11-12"
  },
  "086280": {
   "price": 206500,
   "date": "2026-11-13",
   "changePct": 0.5,
   "close": 205500,
   "closeDate": "2026-11-12"
  },
  "018260": {
   "price": 237000,
   "date": "2026-11-13",
   "changePct": 2.8,
   "close": 230500,
   "closeDate": "2026-11-12"
  },
  "005850": {
   "price": 47450,
   "date": "2026-11-13",
   "changePct": 2.7,
   "close": 46200,
   "closeDate": "2026-11-12"
  },
  "005490": {
   "price": 280750,
   "date": "2026-11-13",
   "changePct": 2.1,
   "close": 275000,
   "closeDate": "2026-11-12"
  },
  "035420": {
   "price": 181400,
   "date": "2026-11-13",
   "changePct": -0.2,
   "close": 181800,
   "closeDate": "2026-11-12"
  },
  "010120": {
   "price": 128800,
   "date": "2026-11-13",
   "changePct": 3.5,
   "close": 124500,
   "closeDate": "2026-11-12"
  },
  "030200": {
   "price": 50900,
   "date": "2026-11-13",
   "changePct": -0.8,
   "close": 51300,
   "closeDate": "2026-11-12"
  },
  "012330": {
   "price": 366000,
   "date": "2026-11-13",
   "changePct": 4,
   "close": 352000,
   "closeDate": "2026-11-12"
  },
  "047050": {
   "price": 50500,
   "date": "2026-11-13",
   "changePct": 3.1,
   "close": 49000,
   "closeDate": "2026-11-12"
  },
  "030190": {
   "price": 17660,
   "date": "2026-11-13",
   "changePct": -3.2,
   "close": 18250,
   "closeDate": "2026-11-12"
  },
  "042700": {
   "price": 185700,
   "date": "2026-11-13",
   "changePct": 2.1,
   "close": 181900,
   "closeDate": "2026-11-12"
  },
  "064400": {
   "price": 80700,
   "date": "2026-11-13",
   "changePct": 7,
   "close": 75400,
   "closeDate": "2026-11-12"
  },
  "095340": {
   "price": 158600,
   "date": "2026-11-13",
   "changePct": 10.6,
   "close": 143400,
   "closeDate": "2026-11-12"
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
   "price": 5468.88,
   "date": "2026-11-13",
   "changePct": 2.4,
   "close": 5342.73,
   "closeDate": "2026-11-12"
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
