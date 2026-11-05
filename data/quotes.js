// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-05",
 "quotes": {
  "103590": {
   "price": 50300,
   "date": "2026-11-05",
   "changePct": -8.5,
   "close": 55000,
   "closeDate": "2026-11-04"
  },
  "105560": {
   "price": 159600,
   "date": "2026-11-05",
   "changePct": 5.3,
   "close": 151500,
   "closeDate": "2026-11-04"
  },
  "138040": {
   "price": 139100,
   "date": "2026-11-05",
   "changePct": 5.2,
   "close": 132200,
   "closeDate": "2026-11-04"
  },
  "139130": {
   "price": 16050,
   "date": "2026-11-05",
   "changePct": 3.7,
   "close": 15470,
   "closeDate": "2026-11-04"
  },
  "175330": {
   "price": 26950,
   "date": "2026-11-05",
   "changePct": 4.5,
   "close": 25800,
   "closeDate": "2026-11-04"
  },
  "192400": {
   "price": 27450,
   "date": "2026-11-05",
   "changePct": 1.7,
   "close": 27000,
   "closeDate": "2026-11-04"
  },
  "207940": {
   "price": 1534000,
   "date": "2026-11-05",
   "changePct": 2.6,
   "close": 1495000,
   "closeDate": "2026-11-04"
  },
  "241560": {
   "price": 51700,
   "date": "2026-11-05",
   "changePct": 4.8,
   "close": 49350,
   "closeDate": "2026-11-04"
  },
  "267250": {
   "price": 132900,
   "date": "2026-11-05",
   "changePct": -3.4,
   "close": 137600,
   "closeDate": "2026-11-04"
  },
  "267260": {
   "price": 403500,
   "date": "2026-11-05",
   "changePct": -8,
   "close": 438500,
   "closeDate": "2026-11-04"
  },
  "267270": {
   "price": 83000,
   "date": "2026-11-05",
   "changePct": 0.6,
   "close": 82500,
   "closeDate": "2026-11-04"
  },
  "278470": {
   "price": 267000,
   "date": "2026-11-05",
   "changePct": 5.1,
   "close": 254000,
   "closeDate": "2026-11-04"
  },
  "298040": {
   "price": 1831000,
   "date": "2026-11-05",
   "changePct": -10.6,
   "close": 2049000,
   "closeDate": "2026-11-04"
  },
  "316140": {
   "price": 32350,
   "date": "2026-11-05",
   "changePct": 6.6,
   "close": 30350,
   "closeDate": "2026-11-04"
  },
  "323410": {
   "price": 20550,
   "date": "2026-11-05",
   "changePct": 2,
   "close": 20150,
   "closeDate": "2026-11-04"
  },
  "329180": {
   "price": 275000,
   "date": "2026-11-05",
   "changePct": -3,
   "close": 283500,
   "closeDate": "2026-11-04"
  },
  "361610": {
   "price": 13760,
   "date": "2026-11-05",
   "changePct": -3.9,
   "close": 14320,
   "closeDate": "2026-11-04"
  },
  "005930": {
   "price": 207500,
   "date": "2026-11-05",
   "changePct": -4.8,
   "close": 218000,
   "closeDate": "2026-11-04"
  },
  "055550": {
   "price": 89900,
   "date": "2026-11-05",
   "changePct": 4.2,
   "close": 86300,
   "closeDate": "2026-11-04"
  },
  "000810": {
   "price": 675000,
   "date": "2026-11-05",
   "changePct": 3.4,
   "close": 653000,
   "closeDate": "2026-11-04"
  },
  "086790": {
   "price": 124100,
   "date": "2026-11-05",
   "changePct": 6,
   "close": 117100,
   "closeDate": "2026-11-04"
  },
  "012450": {
   "price": 698000,
   "date": "2026-11-05",
   "changePct": -5,
   "close": 735000,
   "closeDate": "2026-11-04"
  },
  "009540": {
   "price": 251000,
   "date": "2026-11-05",
   "changePct": -0.6,
   "close": 252500,
   "closeDate": "2026-11-04"
  },
  "068270": {
   "price": 214000,
   "date": "2026-11-05",
   "changePct": 7,
   "close": 200000,
   "closeDate": "2026-11-04"
  },
  "000270": {
   "price": 100000,
   "date": "2026-11-05",
   "changePct": 4.4,
   "close": 95800,
   "closeDate": "2026-11-04"
  },
  "032640": {
   "price": 15950,
   "date": "2026-11-05",
   "changePct": 2.8,
   "close": 15510,
   "closeDate": "2026-11-04"
  },
  "029780": {
   "price": 42550,
   "date": "2026-11-05",
   "changePct": 3,
   "close": 41300,
   "closeDate": "2026-11-04"
  },
  "035900": {
   "price": 39350,
   "date": "2026-11-05",
   "changePct": 4.1,
   "close": 37800,
   "closeDate": "2026-11-04"
  },
  "036570": {
   "price": 207500,
   "date": "2026-11-05",
   "changePct": 4.4,
   "close": 198800,
   "closeDate": "2026-11-04"
  },
  "035720": {
   "price": 31800,
   "date": "2026-11-05",
   "changePct": 9.3,
   "close": 29100,
   "closeDate": "2026-11-04"
  },
  "001040": {
   "price": 117100,
   "date": "2026-11-05",
   "changePct": 2.4,
   "close": 114300,
   "closeDate": "2026-11-04"
  },
  "012750": {
   "price": 99000,
   "date": "2026-11-05",
   "changePct": 0.7,
   "close": 98300,
   "closeDate": "2026-11-04"
  },
  "000660": {
   "price": 1296000,
   "date": "2026-11-05",
   "changePct": -7.2,
   "close": 1396000,
   "closeDate": "2026-11-04"
  },
  "001120": {
   "price": 39100,
   "date": "2026-11-05",
   "changePct": -4.9,
   "close": 41100,
   "closeDate": "2026-11-04"
  },
  "005830": {
   "price": 183200,
   "date": "2026-11-05",
   "changePct": 5.5,
   "close": 173600,
   "closeDate": "2026-11-04"
  },
  "066570": {
   "price": 145700,
   "date": "2026-11-05",
   "changePct": -0.4,
   "close": 146300,
   "closeDate": "2026-11-04"
  },
  "086280": {
   "price": 202000,
   "date": "2026-11-05",
   "changePct": 0,
   "close": 202000,
   "closeDate": "2026-11-04"
  },
  "018260": {
   "price": 205500,
   "date": "2026-11-05",
   "changePct": 0.5,
   "close": 204500,
   "closeDate": "2026-11-04"
  },
  "005850": {
   "price": 49400,
   "date": "2026-11-05",
   "changePct": 3,
   "close": 47950,
   "closeDate": "2026-11-04"
  },
  "005490": {
   "price": 277000,
   "date": "2026-11-05",
   "changePct": 0.4,
   "close": 276000,
   "closeDate": "2026-11-04"
  },
  "035420": {
   "price": 179600,
   "date": "2026-11-05",
   "changePct": 5.2,
   "close": 170800,
   "closeDate": "2026-11-04"
  },
  "010120": {
   "price": 137200,
   "date": "2026-11-05",
   "changePct": -9,
   "close": 150700,
   "closeDate": "2026-11-04"
  },
  "030200": {
   "price": 50600,
   "date": "2026-11-05",
   "changePct": 3.1,
   "close": 49100,
   "closeDate": "2026-11-04"
  },
  "012330": {
   "price": 361500,
   "date": "2026-11-05",
   "changePct": 1.8,
   "close": 355000,
   "closeDate": "2026-11-04"
  },
  "047050": {
   "price": 51800,
   "date": "2026-11-05",
   "changePct": -0.8,
   "close": 52200,
   "closeDate": "2026-11-04"
  },
  "021240": {
   "price": 107600,
   "date": "2026-11-05",
   "changePct": 3.9,
   "close": 103600,
   "closeDate": "2026-11-04"
  },
  "033780": {
   "price": 198600,
   "date": "2026-11-05",
   "changePct": 3.4,
   "close": 192000,
   "closeDate": "2026-11-04"
  },
  "030190": {
   "price": 17630,
   "date": "2026-11-05",
   "changePct": 3.2,
   "close": 17090,
   "closeDate": "2026-11-04"
  },
  "042700": {
   "price": 171700,
   "date": "2026-11-05",
   "changePct": -7.7,
   "close": 186100,
   "closeDate": "2026-11-04"
  },
  "MSFT": {
   "price": 555.8,
   "date": "2026-11-04",
   "changePct": 6.7,
   "close": 555.8,
   "closeDate": "2026-11-04"
  },
  "V": {
   "price": 436.57,
   "date": "2026-11-04",
   "changePct": 3.8,
   "close": 436.57,
   "closeDate": "2026-11-04"
  },
  "MA": {
   "price": 672.68,
   "date": "2026-11-04",
   "changePct": 3.9,
   "close": 672.68,
   "closeDate": "2026-11-04"
  },
  "GOOGL": {
   "price": 288.93,
   "date": "2026-11-04",
   "changePct": 3.2,
   "close": 288.93,
   "closeDate": "2026-11-04"
  },
  "COST": {
   "price": 1046.47,
   "date": "2026-11-04",
   "changePct": 2.7,
   "close": 1046.47,
   "closeDate": "2026-11-04"
  },
  "NVDA": {
   "price": 200.13,
   "date": "2026-11-04",
   "changePct": -3.2,
   "close": 200.13,
   "closeDate": "2026-11-04"
  },
  "META": {
   "price": 630,
   "date": "2026-11-04",
   "changePct": 1.4,
   "close": 630,
   "closeDate": "2026-11-04"
  },
  "AVGO": {
   "price": 325.48,
   "date": "2026-11-04",
   "changePct": -2,
   "close": 325.48,
   "closeDate": "2026-11-04"
  },
  "AMZN": {
   "price": 266.03,
   "date": "2026-11-04",
   "changePct": 6.1,
   "close": 266.03,
   "closeDate": "2026-11-04"
  },
  "TSM": {
   "price": 395.75,
   "date": "2026-11-04",
   "changePct": -2.2,
   "close": 395.75,
   "closeDate": "2026-11-04"
  },
  "UBER": {
   "price": 69.87,
   "date": "2026-11-04",
   "changePct": 4.9,
   "close": 69.87,
   "closeDate": "2026-11-04"
  },
  "GM": {
   "price": 92.43,
   "date": "2026-11-04",
   "changePct": 4.6,
   "close": 92.43,
   "closeDate": "2026-11-04"
  },
  "VZ": {
   "price": 46.17,
   "date": "2026-11-04",
   "changePct": 2.1,
   "close": 46.17,
   "closeDate": "2026-11-04"
  },
  "C": {
   "price": 124.74,
   "date": "2026-11-04",
   "changePct": 1.7,
   "close": 124.74,
   "closeDate": "2026-11-04"
  },
  "DUK": {
   "price": 129.59,
   "date": "2026-11-04",
   "changePct": 2.4,
   "close": 129.59,
   "closeDate": "2026-11-04"
  },
  "KO": {
   "price": 95.8,
   "date": "2026-11-04",
   "changePct": 1.1,
   "close": 95.8,
   "closeDate": "2026-11-04"
  },
  "JNJ": {
   "price": 276.32,
   "date": "2026-11-04",
   "changePct": 3.8,
   "close": 276.32,
   "closeDate": "2026-11-04"
  },
  "LLY": {
   "price": 1417.99,
   "date": "2026-11-04",
   "changePct": 0.6,
   "close": 1417.99,
   "closeDate": "2026-11-04"
  },
  "CI": {
   "price": 305.41,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 305.41,
   "closeDate": "2026-11-04"
  },
  "NOW": {
   "price": 108.81,
   "date": "2026-11-04",
   "changePct": -0.3,
   "close": 108.81,
   "closeDate": "2026-11-04"
  },
  "TSLA": {
   "price": 385.19,
   "date": "2026-11-04",
   "changePct": -3.3,
   "close": 385.19,
   "closeDate": "2026-11-04"
  },
  "MDLZ": {
   "price": 67.38,
   "date": "2026-11-04",
   "changePct": 3.5,
   "close": 67.38,
   "closeDate": "2026-11-04"
  },
  "AAPL": {
   "price": 349.51,
   "date": "2026-11-04",
   "changePct": 5.3,
   "close": 349.51,
   "closeDate": "2026-11-04"
  },
  "MU": {
   "price": 795.23,
   "date": "2026-11-04",
   "changePct": -7,
   "close": 795.23,
   "closeDate": "2026-11-04"
  },
  "MDT": {
   "price": 104.96,
   "date": "2026-11-04",
   "changePct": 6.1,
   "close": 104.96,
   "closeDate": "2026-11-04"
  },
  "IREN": {
   "price": 21.71,
   "date": "2026-11-04",
   "changePct": -11.2,
   "close": 21.71,
   "closeDate": "2026-11-04"
  },
  "UNH": {
   "price": 409.38,
   "date": "2026-11-04",
   "changePct": 1.2,
   "close": 409.38,
   "closeDate": "2026-11-04"
  },
  "DVN": {
   "price": 44.12,
   "date": "2026-11-04",
   "changePct": -7.3,
   "close": 44.12,
   "closeDate": "2026-11-04"
  },
  "GS": {
   "price": 928,
   "date": "2026-11-04",
   "changePct": 3.6,
   "close": 928,
   "closeDate": "2026-11-04"
  },
  "AMP": {
   "price": 527.41,
   "date": "2026-11-04",
   "changePct": 4.5,
   "close": 527.41,
   "closeDate": "2026-11-04"
  },
  "PNC": {
   "price": 233.45,
   "date": "2026-11-04",
   "changePct": 1.8,
   "close": 233.45,
   "closeDate": "2026-11-04"
  },
  "MTB": {
   "price": 224.64,
   "date": "2026-11-04",
   "changePct": 1.2,
   "close": 224.64,
   "closeDate": "2026-11-04"
  },
  "SO": {
   "price": 93.12,
   "date": "2026-11-04",
   "changePct": -0.7,
   "close": 93.12,
   "closeDate": "2026-11-04"
  },
  "WEC": {
   "price": 118.11,
   "date": "2026-11-04",
   "changePct": 2.3,
   "close": 118.11,
   "closeDate": "2026-11-04"
  },
  "TJX": {
   "price": 144.76,
   "date": "2026-11-04",
   "changePct": 5.2,
   "close": 144.76,
   "closeDate": "2026-11-04"
  },
  "ANET": {
   "price": 178.48,
   "date": "2026-11-04",
   "changePct": 5,
   "close": 178.48,
   "closeDate": "2026-11-04"
  },
  "GD": {
   "price": 364.87,
   "date": "2026-11-04",
   "changePct": -2.6,
   "close": 364.87,
   "closeDate": "2026-11-04"
  },
  "LMT": {
   "price": 595.04,
   "date": "2026-11-04",
   "changePct": -6.9,
   "close": 595.04,
   "closeDate": "2026-11-04"
  },
  "CB": {
   "price": 374.17,
   "date": "2026-11-04",
   "changePct": 2.1,
   "close": 374.17,
   "closeDate": "2026-11-04"
  },
  "GILD": {
   "price": 174.48,
   "date": "2026-11-04",
   "changePct": 4.2,
   "close": 174.48,
   "closeDate": "2026-11-04"
  },
  "BRK.B": {
   "price": 579.09,
   "date": "2026-11-04",
   "changePct": 4,
   "close": 579.09,
   "closeDate": "2026-11-04"
  },
  "TMO": {
   "price": 706.16,
   "date": "2026-11-04",
   "changePct": 1.1,
   "close": 706.16,
   "closeDate": "2026-11-04"
  },
  "ECL": {
   "price": 315.01,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 315.01,
   "closeDate": "2026-11-04"
  },
  "MSI": {
   "price": 496.99,
   "date": "2026-11-04",
   "changePct": 1.2,
   "close": 496.99,
   "closeDate": "2026-11-04"
  },
  "MSCI": {
   "price": 674.3,
   "date": "2026-11-04",
   "changePct": 5.4,
   "close": 674.3,
   "closeDate": "2026-11-04"
  },
  "RSG": {
   "price": 245.41,
   "date": "2026-11-04",
   "changePct": 1,
   "close": 245.41,
   "closeDate": "2026-11-04"
  },
  "CTAS": {
   "price": 229.03,
   "date": "2026-11-04",
   "changePct": 2.4,
   "close": 229.03,
   "closeDate": "2026-11-04"
  },
  "ORLY": {
   "price": 92.34,
   "date": "2026-11-04",
   "changePct": 2.6,
   "close": 92.34,
   "closeDate": "2026-11-04"
  },
  "YUM": {
   "price": 166.31,
   "date": "2026-11-04",
   "changePct": 5.9,
   "close": 166.31,
   "closeDate": "2026-11-04"
  },
  "ADP": {
   "price": 303.54,
   "date": "2026-11-04",
   "changePct": 2.5,
   "close": 303.54,
   "closeDate": "2026-11-04"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5504.4,
   "date": "2026-11-05",
   "changePct": -3.2,
   "close": 5683.8,
   "closeDate": "2026-11-04"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7688.62,
   "date": "2026-11-04",
   "changePct": 1.6,
   "close": 7688.62,
   "closeDate": "2026-11-04"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 223.33,
   "date": "2026-11-04",
   "changePct": 1.9,
   "close": 223.33,
   "closeDate": "2026-11-04"
  }
 }
};
