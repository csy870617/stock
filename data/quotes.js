// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-21",
 "quotes": {
  "105560": {
   "price": 160600,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 160600,
   "closeDate": "2026-10-21"
  },
  "119850": {
   "price": 42100,
   "date": "2026-10-21",
   "changePct": 7.3,
   "close": 42100,
   "closeDate": "2026-10-21"
  },
  "138040": {
   "price": 130500,
   "date": "2026-10-21",
   "changePct": 0.9,
   "close": 130500,
   "closeDate": "2026-10-21"
  },
  "139130": {
   "price": 16430,
   "date": "2026-10-21",
   "changePct": 0.1,
   "close": 16430,
   "closeDate": "2026-10-21"
  },
  "175330": {
   "price": 26300,
   "date": "2026-10-21",
   "changePct": -1.9,
   "close": 26300,
   "closeDate": "2026-10-21"
  },
  "207940": {
   "price": 1417000,
   "date": "2026-10-21",
   "changePct": 1.9,
   "close": 1417000,
   "closeDate": "2026-10-21"
  },
  "214450": {
   "price": 264000,
   "date": "2026-10-21",
   "changePct": -0.8,
   "close": 264000,
   "closeDate": "2026-10-21"
  },
  "241560": {
   "price": 50900,
   "date": "2026-10-21",
   "changePct": 0.8,
   "close": 50900,
   "closeDate": "2026-10-21"
  },
  "267250": {
   "price": 147800,
   "date": "2026-10-21",
   "changePct": -0.6,
   "close": 147800,
   "closeDate": "2026-10-21"
  },
  "267260": {
   "price": 499000,
   "date": "2026-10-21",
   "changePct": 2.4,
   "close": 499000,
   "closeDate": "2026-10-21"
  },
  "267270": {
   "price": 93900,
   "date": "2026-10-21",
   "changePct": 4.7,
   "close": 93900,
   "closeDate": "2026-10-21"
  },
  "278470": {
   "price": 319000,
   "date": "2026-10-21",
   "changePct": 2.9,
   "close": 319000,
   "closeDate": "2026-10-21"
  },
  "298040": {
   "price": 1949000,
   "date": "2026-10-21",
   "changePct": 3,
   "close": 1949000,
   "closeDate": "2026-10-21"
  },
  "316140": {
   "price": 31500,
   "date": "2026-10-21",
   "changePct": -0.9,
   "close": 31500,
   "closeDate": "2026-10-21"
  },
  "323410": {
   "price": 20200,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 20200,
   "closeDate": "2026-10-21"
  },
  "329180": {
   "price": 320000,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 320000,
   "closeDate": "2026-10-21"
  },
  "361610": {
   "price": 17760,
   "date": "2026-10-21",
   "changePct": 4.2,
   "close": 17760,
   "closeDate": "2026-10-21"
  },
  "403870": {
   "price": 50900,
   "date": "2026-10-21",
   "changePct": 1.2,
   "close": 50900,
   "closeDate": "2026-10-21"
  },
  "005930": {
   "price": 223500,
   "date": "2026-10-21",
   "changePct": 5.7,
   "close": 223500,
   "closeDate": "2026-10-21"
  },
  "055550": {
   "price": 91700,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 91700,
   "closeDate": "2026-10-21"
  },
  "000810": {
   "price": 601000,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 601000,
   "closeDate": "2026-10-21"
  },
  "028260": {
   "price": 290000,
   "date": "2026-10-21",
   "changePct": 5.5,
   "close": 290000,
   "closeDate": "2026-10-21"
  },
  "086790": {
   "price": 121800,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 121800,
   "closeDate": "2026-10-21"
  },
  "000660": {
   "price": 1294000,
   "date": "2026-10-21",
   "changePct": 5.8,
   "close": 1294000,
   "closeDate": "2026-10-21"
  },
  "012450": {
   "price": 814000,
   "date": "2026-10-21",
   "changePct": 1.9,
   "close": 814000,
   "closeDate": "2026-10-21"
  },
  "009540": {
   "price": 260000,
   "date": "2026-10-21",
   "changePct": 2.2,
   "close": 260000,
   "closeDate": "2026-10-21"
  },
  "068270": {
   "price": 197600,
   "date": "2026-10-21",
   "changePct": 0.1,
   "close": 197600,
   "closeDate": "2026-10-21"
  },
  "000270": {
   "price": 110500,
   "date": "2026-10-21",
   "changePct": -1.7,
   "close": 110500,
   "closeDate": "2026-10-21"
  },
  "032640": {
   "price": 14820,
   "date": "2026-10-21",
   "changePct": -3.4,
   "close": 14820,
   "closeDate": "2026-10-21"
  },
  "029780": {
   "price": 42100,
   "date": "2026-10-21",
   "changePct": -1.6,
   "close": 42100,
   "closeDate": "2026-10-21"
  },
  "058470": {
   "price": 67400,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 67400,
   "closeDate": "2026-10-21"
  },
  "082920": {
   "price": 23700,
   "date": "2026-10-21",
   "changePct": -2.1,
   "close": 23700,
   "closeDate": "2026-10-21"
  },
  "064760": {
   "price": 231000,
   "date": "2026-10-21",
   "changePct": 3.6,
   "close": 231000,
   "closeDate": "2026-10-21"
  },
  "035900": {
   "price": 39700,
   "date": "2026-10-21",
   "changePct": 0.3,
   "close": 39700,
   "closeDate": "2026-10-21"
  },
  "021240": {
   "price": 106600,
   "date": "2026-10-21",
   "changePct": -1,
   "close": 106600,
   "closeDate": "2026-10-21"
  },
  "036570": {
   "price": 214000,
   "date": "2026-10-21",
   "changePct": -2.9,
   "close": 214000,
   "closeDate": "2026-10-21"
  },
  "035720": {
   "price": 30950,
   "date": "2026-10-21",
   "changePct": -1.9,
   "close": 30950,
   "closeDate": "2026-10-21"
  },
  "001040": {
   "price": 121500,
   "date": "2026-10-21",
   "changePct": 1.3,
   "close": 121500,
   "closeDate": "2026-10-21"
  },
  "012750": {
   "price": 97100,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 97100,
   "closeDate": "2026-10-21"
  },
  "047050": {
   "price": 53900,
   "date": "2026-10-21",
   "changePct": -3.1,
   "close": 53900,
   "closeDate": "2026-10-21"
  },
  "033780": {
   "price": 194000,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 194000,
   "closeDate": "2026-10-21"
  },
  "001120": {
   "price": 43650,
   "date": "2026-10-21",
   "changePct": -2.2,
   "close": 43650,
   "closeDate": "2026-10-21"
  },
  "004370": {
   "price": 406000,
   "date": "2026-10-21",
   "changePct": -1.3,
   "close": 406000,
   "closeDate": "2026-10-21"
  },
  "062040": {
   "price": 181000,
   "date": "2026-10-21",
   "changePct": 3.9,
   "close": 181000,
   "closeDate": "2026-10-21"
  },
  "041830": {
   "price": 48800,
   "date": "2026-10-21",
   "changePct": -3.2,
   "close": 48800,
   "closeDate": "2026-10-21"
  },
  "005830": {
   "price": 185600,
   "date": "2026-10-21",
   "changePct": -1.5,
   "close": 185600,
   "closeDate": "2026-10-21"
  },
  "066570": {
   "price": 165100,
   "date": "2026-10-21",
   "changePct": 1,
   "close": 165100,
   "closeDate": "2026-10-21"
  },
  "086280": {
   "price": 183300,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 183300,
   "closeDate": "2026-10-21"
  },
  "018260": {
   "price": 201500,
   "date": "2026-10-21",
   "changePct": 1.4,
   "close": 201500,
   "closeDate": "2026-10-21"
  },
  "005850": {
   "price": 50000,
   "date": "2026-10-21",
   "changePct": -0.4,
   "close": 50000,
   "closeDate": "2026-10-21"
  },
  "095340": {
   "price": 159500,
   "date": "2026-10-21",
   "changePct": 1.9,
   "close": 159500,
   "closeDate": "2026-10-21"
  },
  "005490": {
   "price": 301000,
   "date": "2026-10-21",
   "changePct": -0.3,
   "close": 301000,
   "closeDate": "2026-10-21"
  },
  "035420": {
   "price": 179500,
   "date": "2026-10-21",
   "changePct": 0.8,
   "close": 179500,
   "closeDate": "2026-10-21"
  },
  "MSFT": {
   "price": 531.11,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 531.87,
   "closeDate": "2026-10-20"
  },
  "V": {
   "price": 409.29,
   "date": "2026-10-21",
   "changePct": 0.7,
   "close": 406.57,
   "closeDate": "2026-10-20"
  },
  "MA": {
   "price": 623.89,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 620.42,
   "closeDate": "2026-10-20"
  },
  "GOOGL": {
   "price": 333.285,
   "date": "2026-10-21",
   "changePct": -2.1,
   "close": 340.28,
   "closeDate": "2026-10-20"
  },
  "AMZN": {
   "price": 262.27,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 262.63,
   "closeDate": "2026-10-20"
  },
  "COST": {
   "price": 994.17,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 994.61,
   "closeDate": "2026-10-20"
  },
  "NVDA": {
   "price": 220.2,
   "date": "2026-10-21",
   "changePct": 1.7,
   "close": 216.47,
   "closeDate": "2026-10-20"
  },
  "META": {
   "price": 710.56,
   "date": "2026-10-21",
   "changePct": 2.3,
   "close": 694.25,
   "closeDate": "2026-10-20"
  },
  "AVGO": {
   "price": 336.24,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 334.37,
   "closeDate": "2026-10-20"
  },
  "TSM": {
   "price": 426.885,
   "date": "2026-10-21",
   "changePct": 0.4,
   "close": 425.08,
   "closeDate": "2026-10-20"
  },
  "UBER": {
   "price": 68.19,
   "date": "2026-10-21",
   "changePct": -1.1,
   "close": 68.94,
   "closeDate": "2026-10-20"
  },
  "GM": {
   "price": 75.8,
   "date": "2026-10-21",
   "changePct": -1.7,
   "close": 77.09,
   "closeDate": "2026-10-20"
  },
  "VZ": {
   "price": 43.3,
   "date": "2026-10-21",
   "changePct": -2.8,
   "close": 44.54,
   "closeDate": "2026-10-20"
  },
  "C": {
   "price": 123.23,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 122.51,
   "closeDate": "2026-10-20"
  },
  "DUK": {
   "price": 121.08,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 121.33,
   "closeDate": "2026-10-20"
  },
  "KO": {
   "price": 92.895,
   "date": "2026-10-21",
   "changePct": -0.6,
   "close": 93.49,
   "closeDate": "2026-10-20"
  },
  "JNJ": {
   "price": 255,
   "date": "2026-10-21",
   "changePct": -1.7,
   "close": 259.36,
   "closeDate": "2026-10-20"
  },
  "NXT": {
   "price": 80.925,
   "date": "2026-10-21",
   "changePct": 2.4,
   "close": 79.03,
   "closeDate": "2026-10-20"
  },
  "LLY": {
   "price": 1266.66,
   "date": "2026-10-21",
   "changePct": -1.3,
   "close": 1283.66,
   "closeDate": "2026-10-20"
  },
  "CI": {
   "price": 305.62,
   "date": "2026-10-21",
   "changePct": -0.3,
   "close": 306.6,
   "closeDate": "2026-10-20"
  },
  "NOW": {
   "price": 152.928,
   "date": "2026-10-21",
   "changePct": 2.3,
   "close": 149.54,
   "closeDate": "2026-10-20"
  },
  "TSLA": {
   "price": 386.82,
   "date": "2026-10-21",
   "changePct": 3.5,
   "close": 373.71,
   "closeDate": "2026-10-20"
  },
  "PG": {
   "price": 158.23,
   "date": "2026-10-21",
   "changePct": -0.7,
   "close": 159.32,
   "closeDate": "2026-10-20"
  },
  "MDLZ": {
   "price": 62.68,
   "date": "2026-10-21",
   "changePct": -2,
   "close": 63.99,
   "closeDate": "2026-10-20"
  },
  "AAPL": {
   "price": 344.925,
   "date": "2026-10-21",
   "changePct": 1.6,
   "close": 339.5,
   "closeDate": "2026-10-20"
  },
  "MU": {
   "price": 910.8,
   "date": "2026-10-21",
   "changePct": 1.6,
   "close": 896.07,
   "closeDate": "2026-10-20"
  },
  "MDT": {
   "price": 93.37,
   "date": "2026-10-21",
   "changePct": -1.3,
   "close": 94.63,
   "closeDate": "2026-10-20"
  },
  "IREN": {
   "price": 27.565,
   "date": "2026-10-21",
   "changePct": 3.5,
   "close": 26.62,
   "closeDate": "2026-10-20"
  },
  "UNH": {
   "price": 416.31,
   "date": "2026-10-21",
   "changePct": -0.7,
   "close": 419.26,
   "closeDate": "2026-10-20"
  },
  "GILD": {
   "price": 153.63,
   "date": "2026-10-21",
   "changePct": -1.8,
   "close": 156.51,
   "closeDate": "2026-10-20"
  },
  "BRK.B": {
   "price": 542.42,
   "date": "2026-10-21",
   "changePct": 0.5,
   "close": 539.82,
   "closeDate": "2026-10-20"
  },
  "TMO": {
   "price": 701.78,
   "date": "2026-10-21",
   "changePct": 2.1,
   "close": 687.37,
   "closeDate": "2026-10-20"
  },
  "ECL": {
   "price": 288.19,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 288.16,
   "closeDate": "2026-10-20"
  },
  "NVT": {
   "price": 143.65,
   "date": "2026-10-21",
   "changePct": 2.8,
   "close": 139.78,
   "closeDate": "2026-10-20"
  },
  "FSS": {
   "price": 116.7,
   "date": "2026-10-21",
   "changePct": 1.8,
   "close": 114.66,
   "closeDate": "2026-10-20"
  },
  "MKSI": {
   "price": 215.52,
   "date": "2026-10-21",
   "changePct": 2.1,
   "close": 211.14,
   "closeDate": "2026-10-20"
  },
  "AAON": {
   "price": 73.91,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 73.92,
   "closeDate": "2026-10-20"
  },
  "NVMI": {
   "price": 328.34,
   "date": "2026-10-21",
   "changePct": 2.6,
   "close": 320.03,
   "closeDate": "2026-10-20"
  },
  "POWL": {
   "price": 167.77,
   "date": "2026-10-21",
   "changePct": 1.7,
   "close": 164.94,
   "closeDate": "2026-10-20"
  },
  "TXN": {
   "price": 285.34,
   "date": "2026-10-21",
   "changePct": 2.7,
   "close": 277.78,
   "closeDate": "2026-10-20"
  },
  "MSI": {
   "price": 465.85,
   "date": "2026-10-21",
   "changePct": 0.5,
   "close": 463.46,
   "closeDate": "2026-10-20"
  },
  "DVN": {
   "price": 50.005,
   "date": "2026-10-21",
   "changePct": -0.7,
   "close": 50.38,
   "closeDate": "2026-10-20"
  },
  "RBC": {
   "price": 503.655,
   "date": "2026-10-21",
   "changePct": 1.7,
   "close": 495.39,
   "closeDate": "2026-10-20"
  },
  "GS": {
   "price": 893.95,
   "date": "2026-10-21",
   "changePct": 1,
   "close": 884.81,
   "closeDate": "2026-10-20"
  },
  "AMP": {
   "price": 490.43,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 487.67,
   "closeDate": "2026-10-20"
  },
  "PNC": {
   "price": 222.87,
   "date": "2026-10-21",
   "changePct": 0.9,
   "close": 220.99,
   "closeDate": "2026-10-20"
  },
  "MTB": {
   "price": 219.93,
   "date": "2026-10-21",
   "changePct": 0.7,
   "close": 218.35,
   "closeDate": "2026-10-20"
  },
  "SO": {
   "price": 90.53,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 90.71,
   "closeDate": "2026-10-20"
  },
  "WEC": {
   "price": 108.73,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 108.75,
   "closeDate": "2026-10-20"
  },
  "MSCI": {
   "price": 604.595,
   "date": "2026-10-21",
   "changePct": 2.2,
   "close": 591.69,
   "closeDate": "2026-10-20"
  },
  "RSG": {
   "price": 230.14,
   "date": "2026-10-21",
   "changePct": -1.2,
   "close": 232.98,
   "closeDate": "2026-10-20"
  },
  "CTAS": {
   "price": 218.96,
   "date": "2026-10-21",
   "changePct": 0.9,
   "close": 217.03,
   "closeDate": "2026-10-20"
  },
  "TJX": {
   "price": 147.08,
   "date": "2026-10-21",
   "changePct": 0.1,
   "close": 146.99,
   "closeDate": "2026-10-20"
  },
  "ANET": {
   "price": 182.485,
   "date": "2026-10-21",
   "changePct": 0.7,
   "close": 181.19,
   "closeDate": "2026-10-20"
  },
  "GD": {
   "price": 346.08,
   "date": "2026-10-21",
   "changePct": 0.5,
   "close": 344.44,
   "closeDate": "2026-10-20"
  },
  "APPF": {
   "price": 226.705,
   "date": "2026-10-21",
   "changePct": 1.3,
   "close": 223.7,
   "closeDate": "2026-10-20"
  },
  "CB": {
   "price": 356.03,
   "date": "2026-10-21",
   "changePct": -0.5,
   "close": 357.75,
   "closeDate": "2026-10-20"
  },
  "ADP": {
   "price": 295.46,
   "date": "2026-10-21",
   "changePct": 0.9,
   "close": 292.75,
   "closeDate": "2026-10-20"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5735.66,
   "date": "2026-10-21",
   "changePct": 3.3,
   "close": 5735.66,
   "closeDate": "2026-10-21"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7746.5,
   "date": "2026-10-21",
   "changePct": 0.4,
   "close": 7712.5698,
   "closeDate": "2026-10-20"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 216.42,
   "date": "2026-10-21",
   "changePct": 0.3,
   "close": 215.86,
   "closeDate": "2026-10-20"
  }
 }
};
