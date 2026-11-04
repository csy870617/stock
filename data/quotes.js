// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-04",
 "quotes": {
  "103590": {
   "price": 55000,
   "date": "2026-11-04",
   "changePct": 2.8,
   "close": 55000,
   "closeDate": "2026-11-04"
  },
  "105560": {
   "price": 151500,
   "date": "2026-11-04",
   "changePct": 0.1,
   "close": 151500,
   "closeDate": "2026-11-04"
  },
  "138040": {
   "price": 132200,
   "date": "2026-11-04",
   "changePct": 1.4,
   "close": 132200,
   "closeDate": "2026-11-04"
  },
  "139130": {
   "price": 15470,
   "date": "2026-11-04",
   "changePct": 1.1,
   "close": 15470,
   "closeDate": "2026-11-04"
  },
  "175330": {
   "price": 25800,
   "date": "2026-11-04",
   "changePct": 2.4,
   "close": 25800,
   "closeDate": "2026-11-04"
  },
  "192400": {
   "price": 27000,
   "date": "2026-11-04",
   "changePct": -0.4,
   "close": 27000,
   "closeDate": "2026-11-04"
  },
  "207940": {
   "price": 1495000,
   "date": "2026-11-04",
   "changePct": 3,
   "close": 1495000,
   "closeDate": "2026-11-04"
  },
  "241560": {
   "price": 49350,
   "date": "2026-11-04",
   "changePct": 0.8,
   "close": 49350,
   "closeDate": "2026-11-04"
  },
  "267250": {
   "price": 137600,
   "date": "2026-11-04",
   "changePct": -2.2,
   "close": 137600,
   "closeDate": "2026-11-04"
  },
  "267260": {
   "price": 438500,
   "date": "2026-11-04",
   "changePct": -0.1,
   "close": 438500,
   "closeDate": "2026-11-04"
  },
  "267270": {
   "price": 82500,
   "date": "2026-11-04",
   "changePct": 2,
   "close": 82500,
   "closeDate": "2026-11-04"
  },
  "278470": {
   "price": 254000,
   "date": "2026-11-04",
   "changePct": 3.3,
   "close": 254000,
   "closeDate": "2026-11-04"
  },
  "298040": {
   "price": 2049000,
   "date": "2026-11-04",
   "changePct": 4,
   "close": 2049000,
   "closeDate": "2026-11-04"
  },
  "316140": {
   "price": 30350,
   "date": "2026-11-04",
   "changePct": 0.7,
   "close": 30350,
   "closeDate": "2026-11-04"
  },
  "323410": {
   "price": 20150,
   "date": "2026-11-04",
   "changePct": 4.7,
   "close": 20150,
   "closeDate": "2026-11-04"
  },
  "329180": {
   "price": 283500,
   "date": "2026-11-04",
   "changePct": -1.4,
   "close": 283500,
   "closeDate": "2026-11-04"
  },
  "361610": {
   "price": 14320,
   "date": "2026-11-04",
   "changePct": 4.2,
   "close": 14320,
   "closeDate": "2026-11-04"
  },
  "005930": {
   "price": 218000,
   "date": "2026-11-04",
   "changePct": -0.7,
   "close": 218000,
   "closeDate": "2026-11-04"
  },
  "055550": {
   "price": 86300,
   "date": "2026-11-04",
   "changePct": 0.8,
   "close": 86300,
   "closeDate": "2026-11-04"
  },
  "000810": {
   "price": 653000,
   "date": "2026-11-04",
   "changePct": 0.3,
   "close": 653000,
   "closeDate": "2026-11-04"
  },
  "028260": {
   "price": 309000,
   "date": "2026-11-04",
   "changePct": -0.2,
   "close": 309000,
   "closeDate": "2026-11-04"
  },
  "086790": {
   "price": 117100,
   "date": "2026-11-04",
   "changePct": 0.9,
   "close": 117100,
   "closeDate": "2026-11-04"
  },
  "012450": {
   "price": 735000,
   "date": "2026-11-04",
   "changePct": -0.7,
   "close": 735000,
   "closeDate": "2026-11-04"
  },
  "009540": {
   "price": 252500,
   "date": "2026-11-04",
   "changePct": -1.6,
   "close": 252500,
   "closeDate": "2026-11-04"
  },
  "068270": {
   "price": 200000,
   "date": "2026-11-04",
   "changePct": 5.3,
   "close": 200000,
   "closeDate": "2026-11-04"
  },
  "000270": {
   "price": 95800,
   "date": "2026-11-04",
   "changePct": -0.8,
   "close": 95800,
   "closeDate": "2026-11-04"
  },
  "032640": {
   "price": 15510,
   "date": "2026-11-04",
   "changePct": 7.1,
   "close": 15510,
   "closeDate": "2026-11-04"
  },
  "029780": {
   "price": 41300,
   "date": "2026-11-04",
   "changePct": -0.1,
   "close": 41300,
   "closeDate": "2026-11-04"
  },
  "035900": {
   "price": 37800,
   "date": "2026-11-04",
   "changePct": 1.1,
   "close": 37800,
   "closeDate": "2026-11-04"
  },
  "036570": {
   "price": 198800,
   "date": "2026-11-04",
   "changePct": 1.8,
   "close": 198800,
   "closeDate": "2026-11-04"
  },
  "035720": {
   "price": 29100,
   "date": "2026-11-04",
   "changePct": 1,
   "close": 29100,
   "closeDate": "2026-11-04"
  },
  "001040": {
   "price": 114300,
   "date": "2026-11-04",
   "changePct": 0.9,
   "close": 114300,
   "closeDate": "2026-11-04"
  },
  "012750": {
   "price": 98300,
   "date": "2026-11-04",
   "changePct": 0.8,
   "close": 98300,
   "closeDate": "2026-11-04"
  },
  "000660": {
   "price": 1396000,
   "date": "2026-11-04",
   "changePct": -0.1,
   "close": 1396000,
   "closeDate": "2026-11-04"
  },
  "001120": {
   "price": 41100,
   "date": "2026-11-04",
   "changePct": 4.2,
   "close": 41100,
   "closeDate": "2026-11-04"
  },
  "005830": {
   "price": 173600,
   "date": "2026-11-04",
   "changePct": -0.3,
   "close": 173600,
   "closeDate": "2026-11-04"
  },
  "066570": {
   "price": 146300,
   "date": "2026-11-04",
   "changePct": 1.2,
   "close": 146300,
   "closeDate": "2026-11-04"
  },
  "086280": {
   "price": 202000,
   "date": "2026-11-04",
   "changePct": 0.5,
   "close": 202000,
   "closeDate": "2026-11-04"
  },
  "018260": {
   "price": 204500,
   "date": "2026-11-04",
   "changePct": 1.5,
   "close": 204500,
   "closeDate": "2026-11-04"
  },
  "005850": {
   "price": 47950,
   "date": "2026-11-04",
   "changePct": 0.7,
   "close": 47950,
   "closeDate": "2026-11-04"
  },
  "005490": {
   "price": 276000,
   "date": "2026-11-04",
   "changePct": 3.6,
   "close": 276000,
   "closeDate": "2026-11-04"
  },
  "035420": {
   "price": 170800,
   "date": "2026-11-04",
   "changePct": 1.1,
   "close": 170800,
   "closeDate": "2026-11-04"
  },
  "010120": {
   "price": 150700,
   "date": "2026-11-04",
   "changePct": -0.5,
   "close": 150700,
   "closeDate": "2026-11-04"
  },
  "030200": {
   "price": 49100,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 49100,
   "closeDate": "2026-11-04"
  },
  "012330": {
   "price": 355000,
   "date": "2026-11-04",
   "changePct": 1.3,
   "close": 355000,
   "closeDate": "2026-11-04"
  },
  "047050": {
   "price": 52200,
   "date": "2026-11-04",
   "changePct": 4.4,
   "close": 52200,
   "closeDate": "2026-11-04"
  },
  "021240": {
   "price": 103600,
   "date": "2026-11-04",
   "changePct": -0.3,
   "close": 103600,
   "closeDate": "2026-11-04"
  },
  "033780": {
   "price": 192000,
   "date": "2026-11-04",
   "changePct": -0.4,
   "close": 192000,
   "closeDate": "2026-11-04"
  },
  "030190": {
   "price": 17090,
   "date": "2026-11-04",
   "changePct": -1.2,
   "close": 17090,
   "closeDate": "2026-11-04"
  },
  "MSFT": {
   "price": 550.42,
   "date": "2026-11-04",
   "changePct": 5.6,
   "close": 520.99,
   "closeDate": "2026-11-03"
  },
  "V": {
   "price": 426.74,
   "date": "2026-11-04",
   "changePct": 1.5,
   "close": 420.42,
   "closeDate": "2026-11-03"
  },
  "MA": {
   "price": 659.395,
   "date": "2026-11-04",
   "changePct": 1.9,
   "close": 647.18,
   "closeDate": "2026-11-03"
  },
  "GOOGL": {
   "price": 289.295,
   "date": "2026-11-04",
   "changePct": 3.3,
   "close": 280.03,
   "closeDate": "2026-11-03"
  },
  "COST": {
   "price": 1036.905,
   "date": "2026-11-04",
   "changePct": 1.7,
   "close": 1019.26,
   "closeDate": "2026-11-03"
  },
  "NVDA": {
   "price": 205.34,
   "date": "2026-11-04",
   "changePct": -0.7,
   "close": 206.69,
   "closeDate": "2026-11-03"
  },
  "META": {
   "price": 631.35,
   "date": "2026-11-04",
   "changePct": 1.7,
   "close": 621.03,
   "closeDate": "2026-11-03"
  },
  "AVGO": {
   "price": 332.5,
   "date": "2026-11-04",
   "changePct": 0.1,
   "close": 332.13,
   "closeDate": "2026-11-03"
  },
  "AMZN": {
   "price": 268.339,
   "date": "2026-11-04",
   "changePct": 7,
   "close": 250.69,
   "closeDate": "2026-11-03"
  },
  "TSM": {
   "price": 407.82,
   "date": "2026-11-04",
   "changePct": 0.7,
   "close": 404.8,
   "closeDate": "2026-11-03"
  },
  "UBER": {
   "price": 68.88,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 66.6,
   "closeDate": "2026-11-03"
  },
  "GM": {
   "price": 91.37,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 88.34,
   "closeDate": "2026-11-03"
  },
  "VZ": {
   "price": 45.71,
   "date": "2026-11-04",
   "changePct": 1,
   "close": 45.24,
   "closeDate": "2026-11-03"
  },
  "C": {
   "price": 126.099,
   "date": "2026-11-04",
   "changePct": 2.8,
   "close": 122.71,
   "closeDate": "2026-11-03"
  },
  "DUK": {
   "price": 127.53,
   "date": "2026-11-04",
   "changePct": 0.8,
   "close": 126.51,
   "closeDate": "2026-11-03"
  },
  "KO": {
   "price": 94.715,
   "date": "2026-11-04",
   "changePct": -0.1,
   "close": 94.8,
   "closeDate": "2026-11-03"
  },
  "JNJ": {
   "price": 270.98,
   "date": "2026-11-04",
   "changePct": 1.8,
   "close": 266.17,
   "closeDate": "2026-11-03"
  },
  "LLY": {
   "price": 1422.879,
   "date": "2026-11-04",
   "changePct": 1,
   "close": 1409.38,
   "closeDate": "2026-11-03"
  },
  "CI": {
   "price": 303.08,
   "date": "2026-11-04",
   "changePct": 2.6,
   "close": 295.44,
   "closeDate": "2026-11-03"
  },
  "NOW": {
   "price": 110.415,
   "date": "2026-11-04",
   "changePct": 1.1,
   "close": 109.16,
   "closeDate": "2026-11-03"
  },
  "TSLA": {
   "price": 381.065,
   "date": "2026-11-04",
   "changePct": -4.4,
   "close": 398.5,
   "closeDate": "2026-11-03"
  },
  "MDLZ": {
   "price": 66.17,
   "date": "2026-11-04",
   "changePct": 1.6,
   "close": 65.12,
   "closeDate": "2026-11-03"
  },
  "AAPL": {
   "price": 350.207,
   "date": "2026-11-04",
   "changePct": 5.5,
   "close": 331.9,
   "closeDate": "2026-11-03"
  },
  "MU": {
   "price": 842.14,
   "date": "2026-11-04",
   "changePct": -1.5,
   "close": 855.1,
   "closeDate": "2026-11-03"
  },
  "MDT": {
   "price": 103.12,
   "date": "2026-11-04",
   "changePct": 4.3,
   "close": 98.88,
   "closeDate": "2026-11-03"
  },
  "IREN": {
   "price": 22.675,
   "date": "2026-11-04",
   "changePct": -7.3,
   "close": 24.46,
   "closeDate": "2026-11-03"
  },
  "UNH": {
   "price": 401.64,
   "date": "2026-11-04",
   "changePct": -0.7,
   "close": 404.44,
   "closeDate": "2026-11-03"
  },
  "DVN": {
   "price": 46.43,
   "date": "2026-11-04",
   "changePct": -2.5,
   "close": 47.62,
   "closeDate": "2026-11-03"
  },
  "GS": {
   "price": 922.576,
   "date": "2026-11-04",
   "changePct": 3,
   "close": 896.09,
   "closeDate": "2026-11-03"
  },
  "AMP": {
   "price": 518.105,
   "date": "2026-11-04",
   "changePct": 2.6,
   "close": 504.88,
   "closeDate": "2026-11-03"
  },
  "PNC": {
   "price": 233.73,
   "date": "2026-11-04",
   "changePct": 1.9,
   "close": 229.41,
   "closeDate": "2026-11-03"
  },
  "MTB": {
   "price": 226.395,
   "date": "2026-11-04",
   "changePct": 1.9,
   "close": 222.07,
   "closeDate": "2026-11-03"
  },
  "SO": {
   "price": 90.73,
   "date": "2026-11-04",
   "changePct": -3.2,
   "close": 93.75,
   "closeDate": "2026-11-03"
  },
  "WEC": {
   "price": 116.015,
   "date": "2026-11-04",
   "changePct": 0.5,
   "close": 115.4,
   "closeDate": "2026-11-03"
  },
  "TJX": {
   "price": 142.075,
   "date": "2026-11-04",
   "changePct": 3.2,
   "close": 137.63,
   "closeDate": "2026-11-03"
  },
  "ANET": {
   "price": 188.38,
   "date": "2026-11-04",
   "changePct": 10.9,
   "close": 169.91,
   "closeDate": "2026-11-03"
  },
  "GD": {
   "price": 368.44,
   "date": "2026-11-04",
   "changePct": -1.6,
   "close": 374.5,
   "closeDate": "2026-11-03"
  },
  "LMT": {
   "price": 611.97,
   "date": "2026-11-04",
   "changePct": -4.2,
   "close": 639,
   "closeDate": "2026-11-03"
  },
  "CB": {
   "price": 368.57,
   "date": "2026-11-04",
   "changePct": 0.6,
   "close": 366.54,
   "closeDate": "2026-11-03"
  },
  "GILD": {
   "price": 171.81,
   "date": "2026-11-04",
   "changePct": 2.6,
   "close": 167.47,
   "closeDate": "2026-11-03"
  },
  "BRK.B": {
   "price": 565.641,
   "date": "2026-11-04",
   "changePct": 1.5,
   "close": 557.07,
   "closeDate": "2026-11-03"
  },
  "TMO": {
   "price": 704.565,
   "date": "2026-11-04",
   "changePct": 0.9,
   "close": 698.34,
   "closeDate": "2026-11-03"
  },
  "ECL": {
   "price": 308.54,
   "date": "2026-11-04",
   "changePct": 1.3,
   "close": 304.68,
   "closeDate": "2026-11-03"
  },
  "MSI": {
   "price": 490.88,
   "date": "2026-11-04",
   "changePct": 0,
   "close": 491,
   "closeDate": "2026-11-03"
  },
  "MSCI": {
   "price": 661.32,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 639.78,
   "closeDate": "2026-11-03"
  },
  "RSG": {
   "price": 242.477,
   "date": "2026-11-04",
   "changePct": -0.2,
   "close": 242.87,
   "closeDate": "2026-11-03"
  },
  "CTAS": {
   "price": 227.31,
   "date": "2026-11-04",
   "changePct": 1.6,
   "close": 223.74,
   "closeDate": "2026-11-03"
  },
  "ORLY": {
   "price": 91.83,
   "date": "2026-11-04",
   "changePct": 2,
   "close": 89.99,
   "closeDate": "2026-11-03"
  },
  "YUM": {
   "price": 162.425,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 157.01,
   "closeDate": "2026-11-03"
  },
  "ADP": {
   "price": 298.37,
   "date": "2026-11-04",
   "changePct": 0.8,
   "close": 296.01,
   "closeDate": "2026-11-03"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5683.8,
   "date": "2026-11-04",
   "changePct": 0.6,
   "close": 5683.8,
   "closeDate": "2026-11-04"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7693.41,
   "date": "2026-11-04",
   "changePct": 1.6,
   "close": 7568.9199,
   "closeDate": "2026-11-03"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 221.84,
   "date": "2026-11-04",
   "changePct": 1.2,
   "close": 219.26,
   "closeDate": "2026-11-03"
  }
 }
};
