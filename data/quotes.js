// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-19",
 "quotes": {
  "105560": {
   "price": 162700,
   "date": "2026-10-19",
   "changePct": 1.7,
   "close": 162700,
   "closeDate": "2026-10-19"
  },
  "119850": {
   "price": 41550,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 41550,
   "closeDate": "2026-10-19"
  },
  "138040": {
   "price": 131000,
   "date": "2026-10-19",
   "changePct": 0.9,
   "close": 131000,
   "closeDate": "2026-10-19"
  },
  "139130": {
   "price": 17000,
   "date": "2026-10-19",
   "changePct": -0.2,
   "close": 17000,
   "closeDate": "2026-10-19"
  },
  "175330": {
   "price": 27000,
   "date": "2026-10-19",
   "changePct": 0.6,
   "close": 27000,
   "closeDate": "2026-10-19"
  },
  "207940": {
   "price": 1427000,
   "date": "2026-10-19",
   "changePct": 9.9,
   "close": 1427000,
   "closeDate": "2026-10-19"
  },
  "214450": {
   "price": 277500,
   "date": "2026-10-19",
   "changePct": -0.2,
   "close": 277500,
   "closeDate": "2026-10-19"
  },
  "241560": {
   "price": 51600,
   "date": "2026-10-19",
   "changePct": 1.4,
   "close": 51600,
   "closeDate": "2026-10-19"
  },
  "267250": {
   "price": 159400,
   "date": "2026-10-19",
   "changePct": 1.3,
   "close": 159400,
   "closeDate": "2026-10-19"
  },
  "267260": {
   "price": 525000,
   "date": "2026-10-19",
   "changePct": 1.7,
   "close": 525000,
   "closeDate": "2026-10-19"
  },
  "267270": {
   "price": 94100,
   "date": "2026-10-19",
   "changePct": 2.2,
   "close": 94100,
   "closeDate": "2026-10-19"
  },
  "278470": {
   "price": 331500,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 331500,
   "closeDate": "2026-10-19"
  },
  "298040": {
   "price": 1936000,
   "date": "2026-10-19",
   "changePct": 0.5,
   "close": 1936000,
   "closeDate": "2026-10-19"
  },
  "316140": {
   "price": 31650,
   "date": "2026-10-19",
   "changePct": 1,
   "close": 31650,
   "closeDate": "2026-10-19"
  },
  "323410": {
   "price": 20600,
   "date": "2026-10-19",
   "changePct": 1.2,
   "close": 20600,
   "closeDate": "2026-10-19"
  },
  "329180": {
   "price": 345500,
   "date": "2026-10-19",
   "changePct": -1.7,
   "close": 345500,
   "closeDate": "2026-10-19"
  },
  "361610": {
   "price": 18770,
   "date": "2026-10-19",
   "changePct": 7.4,
   "close": 18770,
   "closeDate": "2026-10-19"
  },
  "403870": {
   "price": 52600,
   "date": "2026-10-19",
   "changePct": -2.8,
   "close": 52600,
   "closeDate": "2026-10-19"
  },
  "005930": {
   "price": 218000,
   "date": "2026-10-19",
   "changePct": 1.2,
   "close": 218000,
   "closeDate": "2026-10-19"
  },
  "055550": {
   "price": 93300,
   "date": "2026-10-19",
   "changePct": -0.1,
   "close": 93300,
   "closeDate": "2026-10-19"
  },
  "000810": {
   "price": 607000,
   "date": "2026-10-19",
   "changePct": 3.6,
   "close": 607000,
   "closeDate": "2026-10-19"
  },
  "028260": {
   "price": 285000,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 285000,
   "closeDate": "2026-10-19"
  },
  "086790": {
   "price": 123700,
   "date": "2026-10-19",
   "changePct": 1,
   "close": 123700,
   "closeDate": "2026-10-19"
  },
  "000660": {
   "price": 1277000,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 1277000,
   "closeDate": "2026-10-19"
  },
  "012450": {
   "price": 905000,
   "date": "2026-10-19",
   "changePct": 1.9,
   "close": 905000,
   "closeDate": "2026-10-19"
  },
  "009540": {
   "price": 271500,
   "date": "2026-10-19",
   "changePct": 2.5,
   "close": 271500,
   "closeDate": "2026-10-19"
  },
  "068270": {
   "price": 198200,
   "date": "2026-10-19",
   "changePct": 2.2,
   "close": 198200,
   "closeDate": "2026-10-19"
  },
  "000270": {
   "price": 116000,
   "date": "2026-10-19",
   "changePct": 5.3,
   "close": 116000,
   "closeDate": "2026-10-19"
  },
  "032640": {
   "price": 15790,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 15790,
   "closeDate": "2026-10-19"
  },
  "029780": {
   "price": 42800,
   "date": "2026-10-19",
   "changePct": 0.1,
   "close": 42800,
   "closeDate": "2026-10-19"
  },
  "058470": {
   "price": 69400,
   "date": "2026-10-19",
   "changePct": -2,
   "close": 69400,
   "closeDate": "2026-10-19"
  },
  "082920": {
   "price": 25250,
   "date": "2026-10-19",
   "changePct": 4.8,
   "close": 25250,
   "closeDate": "2026-10-19"
  },
  "064760": {
   "price": 234500,
   "date": "2026-10-19",
   "changePct": -2.9,
   "close": 234500,
   "closeDate": "2026-10-19"
  },
  "035900": {
   "price": 40400,
   "date": "2026-10-19",
   "changePct": 3.5,
   "close": 40400,
   "closeDate": "2026-10-19"
  },
  "021240": {
   "price": 108400,
   "date": "2026-10-19",
   "changePct": 0.6,
   "close": 108400,
   "closeDate": "2026-10-19"
  },
  "036570": {
   "price": 218000,
   "date": "2026-10-19",
   "changePct": 5.3,
   "close": 218000,
   "closeDate": "2026-10-19"
  },
  "035720": {
   "price": 32100,
   "date": "2026-10-19",
   "changePct": 0.8,
   "close": 32100,
   "closeDate": "2026-10-19"
  },
  "001040": {
   "price": 129200,
   "date": "2026-10-19",
   "changePct": 3.7,
   "close": 129200,
   "closeDate": "2026-10-19"
  },
  "012750": {
   "price": 97600,
   "date": "2026-10-19",
   "changePct": 0.1,
   "close": 97600,
   "closeDate": "2026-10-19"
  },
  "047050": {
   "price": 57200,
   "date": "2026-10-19",
   "changePct": 2.1,
   "close": 57200,
   "closeDate": "2026-10-19"
  },
  "033780": {
   "price": 193100,
   "date": "2026-10-19",
   "changePct": 1.4,
   "close": 193100,
   "closeDate": "2026-10-19"
  },
  "001120": {
   "price": 44800,
   "date": "2026-10-19",
   "changePct": 0.7,
   "close": 44800,
   "closeDate": "2026-10-19"
  },
  "004370": {
   "price": 411500,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 411500,
   "closeDate": "2026-10-19"
  },
  "062040": {
   "price": 189000,
   "date": "2026-10-19",
   "changePct": 3.8,
   "close": 189000,
   "closeDate": "2026-10-19"
  },
  "041830": {
   "price": 51400,
   "date": "2026-10-19",
   "changePct": -1.7,
   "close": 51400,
   "closeDate": "2026-10-19"
  },
  "005830": {
   "price": 189000,
   "date": "2026-10-19",
   "changePct": 4.2,
   "close": 189000,
   "closeDate": "2026-10-19"
  },
  "066570": {
   "price": 170500,
   "date": "2026-10-19",
   "changePct": 0.5,
   "close": 170500,
   "closeDate": "2026-10-19"
  },
  "086280": {
   "price": 190500,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 190500,
   "closeDate": "2026-10-19"
  },
  "018260": {
   "price": 203500,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 203500,
   "closeDate": "2026-10-19"
  },
  "005850": {
   "price": 51500,
   "date": "2026-10-19",
   "changePct": 6.1,
   "close": 51500,
   "closeDate": "2026-10-19"
  },
  "095340": {
   "price": 160300,
   "date": "2026-10-19",
   "changePct": -0.3,
   "close": 160300,
   "closeDate": "2026-10-19"
  },
  "005490": {
   "price": 314500,
   "date": "2026-10-19",
   "changePct": 6.1,
   "close": 314500,
   "closeDate": "2026-10-19"
  },
  "035420": {
   "price": 182900,
   "date": "2026-10-19",
   "changePct": 1.6,
   "close": 182900,
   "closeDate": "2026-10-19"
  },
  "MSFT": {
   "price": 532.26,
   "date": "2026-10-19",
   "changePct": 0.6,
   "close": 529.05,
   "closeDate": "2026-10-16"
  },
  "V": {
   "price": 402.49,
   "date": "2026-10-19",
   "changePct": 0,
   "close": 402.61,
   "closeDate": "2026-10-16"
  },
  "MA": {
   "price": 615.27,
   "date": "2026-10-19",
   "changePct": -0.3,
   "close": 617.42,
   "closeDate": "2026-10-16"
  },
  "GOOGL": {
   "price": 344.31,
   "date": "2026-10-19",
   "changePct": 1.1,
   "close": 340.59,
   "closeDate": "2026-10-16"
  },
  "AMZN": {
   "price": 258.595,
   "date": "2026-10-19",
   "changePct": 3.4,
   "close": 250,
   "closeDate": "2026-10-16"
  },
  "COST": {
   "price": 989.47,
   "date": "2026-10-19",
   "changePct": 0,
   "close": 989.11,
   "closeDate": "2026-10-16"
  },
  "NVDA": {
   "price": 215.91,
   "date": "2026-10-19",
   "changePct": 0.8,
   "close": 214.13,
   "closeDate": "2026-10-16"
  },
  "META": {
   "price": 694.705,
   "date": "2026-10-19",
   "changePct": -2.1,
   "close": 709.33,
   "closeDate": "2026-10-16"
  },
  "AVGO": {
   "price": 334.6,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 328.75,
   "closeDate": "2026-10-16"
  },
  "TSM": {
   "price": 419.45,
   "date": "2026-10-19",
   "changePct": 1.7,
   "close": 412.61,
   "closeDate": "2026-10-16"
  },
  "UBER": {
   "price": 70.05,
   "date": "2026-10-19",
   "changePct": -0.4,
   "close": 70.35,
   "closeDate": "2026-10-16"
  },
  "GM": {
   "price": 82.99,
   "date": "2026-10-19",
   "changePct": -1.2,
   "close": 83.96,
   "closeDate": "2026-10-16"
  },
  "VZ": {
   "price": 44.39,
   "date": "2026-10-19",
   "changePct": -0.9,
   "close": 44.79,
   "closeDate": "2026-10-16"
  },
  "C": {
   "price": 123.59,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 124.26,
   "closeDate": "2026-10-16"
  },
  "DUK": {
   "price": 120.122,
   "date": "2026-10-19",
   "changePct": -1.1,
   "close": 121.47,
   "closeDate": "2026-10-16"
  },
  "KO": {
   "price": 93.735,
   "date": "2026-10-19",
   "changePct": -0.2,
   "close": 93.9,
   "closeDate": "2026-10-16"
  },
  "JNJ": {
   "price": 253.83,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 255.56,
   "closeDate": "2026-10-16"
  },
  "NXT": {
   "price": 79.085,
   "date": "2026-10-19",
   "changePct": -1.2,
   "close": 80.04,
   "closeDate": "2026-10-16"
  },
  "LLY": {
   "price": 1258.345,
   "date": "2026-10-19",
   "changePct": 0.1,
   "close": 1257.03,
   "closeDate": "2026-10-16"
  },
  "CI": {
   "price": 299.91,
   "date": "2026-10-19",
   "changePct": -0.8,
   "close": 302.3,
   "closeDate": "2026-10-16"
  },
  "NOW": {
   "price": 143.333,
   "date": "2026-10-19",
   "changePct": 1,
   "close": 141.97,
   "closeDate": "2026-10-16"
  },
  "TSLA": {
   "price": 361.82,
   "date": "2026-10-19",
   "changePct": 2,
   "close": 354.72,
   "closeDate": "2026-10-16"
  },
  "PG": {
   "price": 158.01,
   "date": "2026-10-19",
   "changePct": -0.8,
   "close": 159.35,
   "closeDate": "2026-10-16"
  },
  "MDLZ": {
   "price": 63.84,
   "date": "2026-10-19",
   "changePct": -0.1,
   "close": 63.91,
   "closeDate": "2026-10-16"
  },
  "AAPL": {
   "price": 344.86,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 343.46,
   "closeDate": "2026-10-16"
  },
  "MU": {
   "price": 908.2,
   "date": "2026-10-19",
   "changePct": 3.3,
   "close": 878.84,
   "closeDate": "2026-10-16"
  },
  "MDT": {
   "price": 94.01,
   "date": "2026-10-19",
   "changePct": -0.8,
   "close": 94.75,
   "closeDate": "2026-10-16"
  },
  "IREN": {
   "price": 27.68,
   "date": "2026-10-19",
   "changePct": 2.6,
   "close": 26.99,
   "closeDate": "2026-10-16"
  },
  "UNH": {
   "price": 403.755,
   "date": "2026-10-19",
   "changePct": 0.6,
   "close": 401.43,
   "closeDate": "2026-10-16"
  },
  "GILD": {
   "price": 156.87,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 156.19,
   "closeDate": "2026-10-16"
  },
  "BRK.B": {
   "price": 531.56,
   "date": "2026-10-19",
   "changePct": -0.1,
   "close": 532.02,
   "closeDate": "2026-10-16"
  },
  "TMO": {
   "price": 687.06,
   "date": "2026-10-19",
   "changePct": -0.4,
   "close": 690,
   "closeDate": "2026-10-16"
  },
  "ECL": {
   "price": 285.545,
   "date": "2026-10-19",
   "changePct": -1.2,
   "close": 288.89,
   "closeDate": "2026-10-16"
  },
  "NVT": {
   "price": 141.895,
   "date": "2026-10-19",
   "changePct": -0.1,
   "close": 142.03,
   "closeDate": "2026-10-16"
  },
  "FSS": {
   "price": 112.795,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 112.39,
   "closeDate": "2026-10-16"
  },
  "MKSI": {
   "price": 219.05,
   "date": "2026-10-19",
   "changePct": 2,
   "close": 214.83,
   "closeDate": "2026-10-16"
  },
  "AAON": {
   "price": 74.21,
   "date": "2026-10-19",
   "changePct": 0.7,
   "close": 73.73,
   "closeDate": "2026-10-16"
  },
  "NVMI": {
   "price": 325.75,
   "date": "2026-10-19",
   "changePct": 1.4,
   "close": 321.2,
   "closeDate": "2026-10-16"
  },
  "POWL": {
   "price": 166.405,
   "date": "2026-10-19",
   "changePct": 0.8,
   "close": 165.14,
   "closeDate": "2026-10-16"
  },
  "TXN": {
   "price": 275.09,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 276.48,
   "closeDate": "2026-10-16"
  },
  "MSI": {
   "price": 459.34,
   "date": "2026-10-19",
   "changePct": -0.8,
   "close": 463.15,
   "closeDate": "2026-10-16"
  },
  "DVN": {
   "price": 50.48,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 50.73,
   "closeDate": "2026-10-16"
  },
  "RBC": {
   "price": 501.12,
   "date": "2026-10-19",
   "changePct": 0.5,
   "close": 498.52,
   "closeDate": "2026-10-16"
  },
  "GS": {
   "price": 883.105,
   "date": "2026-10-19",
   "changePct": 0.2,
   "close": 881.26,
   "closeDate": "2026-10-16"
  },
  "AMP": {
   "price": 483.205,
   "date": "2026-10-19",
   "changePct": -3.5,
   "close": 500.8,
   "closeDate": "2026-10-16"
  },
  "PNC": {
   "price": 217.6,
   "date": "2026-10-19",
   "changePct": 0.1,
   "close": 217.39,
   "closeDate": "2026-10-16"
  },
  "MTB": {
   "price": 213.18,
   "date": "2026-10-19",
   "changePct": -1,
   "close": 215.28,
   "closeDate": "2026-10-16"
  },
  "SO": {
   "price": 90.06,
   "date": "2026-10-19",
   "changePct": -1.2,
   "close": 91.18,
   "closeDate": "2026-10-16"
  },
  "WEC": {
   "price": 107.91,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 108.71,
   "closeDate": "2026-10-16"
  },
  "MSCI": {
   "price": 564.13,
   "date": "2026-10-19",
   "changePct": -0.9,
   "close": 569.08,
   "closeDate": "2026-10-16"
  },
  "RSG": {
   "price": 230.01,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 231.54,
   "closeDate": "2026-10-16"
  },
  "CTAS": {
   "price": 211.66,
   "date": "2026-10-19",
   "changePct": -0.9,
   "close": 213.69,
   "closeDate": "2026-10-16"
  },
  "TJX": {
   "price": 147.37,
   "date": "2026-10-19",
   "changePct": 0,
   "close": 147.33,
   "closeDate": "2026-10-16"
  },
  "ANET": {
   "price": 180.7,
   "date": "2026-10-19",
   "changePct": 2.1,
   "close": 176.98,
   "closeDate": "2026-10-16"
  },
  "GD": {
   "price": 341.8,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 344.23,
   "closeDate": "2026-10-16"
  },
  "APPF": {
   "price": 213.275,
   "date": "2026-10-19",
   "changePct": 0.5,
   "close": 212.13,
   "closeDate": "2026-10-16"
  },
  "CB": {
   "price": 357.165,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 359.79,
   "closeDate": "2026-10-16"
  },
  "ADP": {
   "price": 287.44,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 288.9,
   "closeDate": "2026-10-16"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5768.01,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 5768.01,
   "closeDate": "2026-10-19"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7693.27,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 7659.4399,
   "closeDate": "2026-10-16"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 213.6,
   "date": "2026-10-19",
   "changePct": -0.2,
   "close": 214.09,
   "closeDate": "2026-10-16"
  }
 }
};
