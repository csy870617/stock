// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-18",
 "quotes": {
  "105560": {
   "price": 160000,
   "date": "2026-10-16",
   "changePct": 2.1,
   "close": 160000,
   "closeDate": "2026-10-16"
  },
  "119850": {
   "price": 41400,
   "date": "2026-10-16",
   "changePct": 4.5,
   "close": 41400,
   "closeDate": "2026-10-16"
  },
  "138040": {
   "price": 129800,
   "date": "2026-10-16",
   "changePct": -0.7,
   "close": 129800,
   "closeDate": "2026-10-16"
  },
  "139130": {
   "price": 17030,
   "date": "2026-10-16",
   "changePct": 1.4,
   "close": 17030,
   "closeDate": "2026-10-16"
  },
  "175330": {
   "price": 26850,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 26850,
   "closeDate": "2026-10-16"
  },
  "207940": {
   "price": 1298000,
   "date": "2026-10-16",
   "changePct": 4.1,
   "close": 1298000,
   "closeDate": "2026-10-16"
  },
  "214450": {
   "price": 278000,
   "date": "2026-10-16",
   "changePct": 7.5,
   "close": 278000,
   "closeDate": "2026-10-16"
  },
  "241560": {
   "price": 50900,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 50900,
   "closeDate": "2026-10-16"
  },
  "267250": {
   "price": 157400,
   "date": "2026-10-16",
   "changePct": -0.3,
   "close": 157400,
   "closeDate": "2026-10-16"
  },
  "267260": {
   "price": 516000,
   "date": "2026-10-16",
   "changePct": 6,
   "close": 516000,
   "closeDate": "2026-10-16"
  },
  "267270": {
   "price": 92100,
   "date": "2026-10-16",
   "changePct": -0.6,
   "close": 92100,
   "closeDate": "2026-10-16"
  },
  "278470": {
   "price": 325500,
   "date": "2026-10-16",
   "changePct": 9.2,
   "close": 325500,
   "closeDate": "2026-10-16"
  },
  "298040": {
   "price": 1926000,
   "date": "2026-10-16",
   "changePct": 5.8,
   "close": 1926000,
   "closeDate": "2026-10-16"
  },
  "316140": {
   "price": 31350,
   "date": "2026-10-16",
   "changePct": 0.6,
   "close": 31350,
   "closeDate": "2026-10-16"
  },
  "323410": {
   "price": 20350,
   "date": "2026-10-16",
   "changePct": 1.2,
   "close": 20350,
   "closeDate": "2026-10-16"
  },
  "329180": {
   "price": 351500,
   "date": "2026-10-16",
   "changePct": -0.3,
   "close": 351500,
   "closeDate": "2026-10-16"
  },
  "361610": {
   "price": 17480,
   "date": "2026-10-16",
   "changePct": -1.6,
   "close": 17480,
   "closeDate": "2026-10-16"
  },
  "403870": {
   "price": 54100,
   "date": "2026-10-16",
   "changePct": 8.7,
   "close": 54100,
   "closeDate": "2026-10-16"
  },
  "005930": {
   "price": 215500,
   "date": "2026-10-16",
   "changePct": 2.6,
   "close": 215500,
   "closeDate": "2026-10-16"
  },
  "055550": {
   "price": 93400,
   "date": "2026-10-16",
   "changePct": -0.8,
   "close": 93400,
   "closeDate": "2026-10-16"
  },
  "000810": {
   "price": 586000,
   "date": "2026-10-16",
   "changePct": 1,
   "close": 586000,
   "closeDate": "2026-10-16"
  },
  "028260": {
   "price": 286500,
   "date": "2026-10-16",
   "changePct": 7.1,
   "close": 286500,
   "closeDate": "2026-10-16"
  },
  "086790": {
   "price": 122500,
   "date": "2026-10-16",
   "changePct": 0.1,
   "close": 122500,
   "closeDate": "2026-10-16"
  },
  "000660": {
   "price": 1272000,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 1272000,
   "closeDate": "2026-10-16"
  },
  "012450": {
   "price": 888000,
   "date": "2026-10-16",
   "changePct": 7.8,
   "close": 888000,
   "closeDate": "2026-10-16"
  },
  "009540": {
   "price": 265000,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 265000,
   "closeDate": "2026-10-16"
  },
  "068270": {
   "price": 194000,
   "date": "2026-10-16",
   "changePct": 6.5,
   "close": 194000,
   "closeDate": "2026-10-16"
  },
  "000270": {
   "price": 110200,
   "date": "2026-10-16",
   "changePct": 4.1,
   "close": 110200,
   "closeDate": "2026-10-16"
  },
  "032640": {
   "price": 15510,
   "date": "2026-10-16",
   "changePct": 2.9,
   "close": 15510,
   "closeDate": "2026-10-16"
  },
  "029780": {
   "price": 42750,
   "date": "2026-10-16",
   "changePct": 1.3,
   "close": 42750,
   "closeDate": "2026-10-16"
  },
  "058470": {
   "price": 70800,
   "date": "2026-10-16",
   "changePct": 5.4,
   "close": 70800,
   "closeDate": "2026-10-16"
  },
  "082920": {
   "price": 24100,
   "date": "2026-10-16",
   "changePct": 3.9,
   "close": 24100,
   "closeDate": "2026-10-16"
  },
  "064760": {
   "price": 241500,
   "date": "2026-10-16",
   "changePct": 7.6,
   "close": 241500,
   "closeDate": "2026-10-16"
  },
  "035900": {
   "price": 39050,
   "date": "2026-10-16",
   "changePct": 4.4,
   "close": 39050,
   "closeDate": "2026-10-16"
  },
  "021240": {
   "price": 107800,
   "date": "2026-10-16",
   "changePct": 2.7,
   "close": 107800,
   "closeDate": "2026-10-16"
  },
  "036570": {
   "price": 207000,
   "date": "2026-10-16",
   "changePct": 3,
   "close": 207000,
   "closeDate": "2026-10-16"
  },
  "035720": {
   "price": 31850,
   "date": "2026-10-16",
   "changePct": 2.7,
   "close": 31850,
   "closeDate": "2026-10-16"
  },
  "001040": {
   "price": 124600,
   "date": "2026-10-16",
   "changePct": 0.9,
   "close": 124600,
   "closeDate": "2026-10-16"
  },
  "012750": {
   "price": 97500,
   "date": "2026-10-16",
   "changePct": -0.1,
   "close": 97500,
   "closeDate": "2026-10-16"
  },
  "047050": {
   "price": 56000,
   "date": "2026-10-16",
   "changePct": 1.6,
   "close": 56000,
   "closeDate": "2026-10-16"
  },
  "033780": {
   "price": 190500,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 190500,
   "closeDate": "2026-10-16"
  },
  "001120": {
   "price": 44500,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 44500,
   "closeDate": "2026-10-16"
  },
  "004370": {
   "price": 410000,
   "date": "2026-10-16",
   "changePct": 1.9,
   "close": 410000,
   "closeDate": "2026-10-16"
  },
  "062040": {
   "price": 182100,
   "date": "2026-10-16",
   "changePct": 2.6,
   "close": 182100,
   "closeDate": "2026-10-16"
  },
  "041830": {
   "price": 52300,
   "date": "2026-10-16",
   "changePct": 10,
   "close": 52300,
   "closeDate": "2026-10-16"
  },
  "005830": {
   "price": 181400,
   "date": "2026-10-16",
   "changePct": -2.1,
   "close": 181400,
   "closeDate": "2026-10-16"
  },
  "066570": {
   "price": 169700,
   "date": "2026-10-16",
   "changePct": 0.7,
   "close": 169700,
   "closeDate": "2026-10-16"
  },
  "086280": {
   "price": 187100,
   "date": "2026-10-16",
   "changePct": 5.5,
   "close": 187100,
   "closeDate": "2026-10-16"
  },
  "018260": {
   "price": 199900,
   "date": "2026-10-16",
   "changePct": 2.9,
   "close": 199900,
   "closeDate": "2026-10-16"
  },
  "005850": {
   "price": 48550,
   "date": "2026-10-16",
   "changePct": 3.9,
   "close": 48550,
   "closeDate": "2026-10-16"
  },
  "095340": {
   "price": 160800,
   "date": "2026-10-16",
   "changePct": 9,
   "close": 160800,
   "closeDate": "2026-10-16"
  },
  "MSFT": {
   "price": 529.05,
   "date": "2026-10-16",
   "changePct": -1.9,
   "close": 529.05,
   "closeDate": "2026-10-16"
  },
  "V": {
   "price": 402.61,
   "date": "2026-10-16",
   "changePct": 0.7,
   "close": 402.61,
   "closeDate": "2026-10-16"
  },
  "MA": {
   "price": 617.42,
   "date": "2026-10-16",
   "changePct": 0.2,
   "close": 617.42,
   "closeDate": "2026-10-16"
  },
  "GOOGL": {
   "price": 340.59,
   "date": "2026-10-16",
   "changePct": -2.5,
   "close": 340.59,
   "closeDate": "2026-10-16"
  },
  "AMZN": {
   "price": 250,
   "date": "2026-10-16",
   "changePct": -1.9,
   "close": 250,
   "closeDate": "2026-10-16"
  },
  "COST": {
   "price": 989.11,
   "date": "2026-10-16",
   "changePct": 1.1,
   "close": 989.11,
   "closeDate": "2026-10-16"
  },
  "NVDA": {
   "price": 214.13,
   "date": "2026-10-16",
   "changePct": -1.4,
   "close": 214.13,
   "closeDate": "2026-10-16"
  },
  "META": {
   "price": 709.325,
   "date": "2026-10-16",
   "changePct": -3.7,
   "close": 709.325,
   "closeDate": "2026-10-16"
  },
  "AVGO": {
   "price": 328.75,
   "date": "2026-10-16",
   "changePct": -4.5,
   "close": 328.75,
   "closeDate": "2026-10-16"
  },
  "TSM": {
   "price": 412.61,
   "date": "2026-10-16",
   "changePct": -2.3,
   "close": 412.61,
   "closeDate": "2026-10-16"
  },
  "UBER": {
   "price": 70.35,
   "date": "2026-10-16",
   "changePct": -1.3,
   "close": 70.35,
   "closeDate": "2026-10-16"
  },
  "GM": {
   "price": 83.96,
   "date": "2026-10-16",
   "changePct": 0.4,
   "close": 83.96,
   "closeDate": "2026-10-16"
  },
  "VZ": {
   "price": 44.79,
   "date": "2026-10-16",
   "changePct": 0.9,
   "close": 44.79,
   "closeDate": "2026-10-16"
  },
  "C": {
   "price": 124.26,
   "date": "2026-10-16",
   "changePct": 0.9,
   "close": 124.26,
   "closeDate": "2026-10-16"
  },
  "DUK": {
   "price": 121.47,
   "date": "2026-10-16",
   "changePct": 2.2,
   "close": 121.47,
   "closeDate": "2026-10-16"
  },
  "KO": {
   "price": 93.9,
   "date": "2026-10-16",
   "changePct": 2.1,
   "close": 93.9,
   "closeDate": "2026-10-16"
  },
  "JNJ": {
   "price": 255.56,
   "date": "2026-10-16",
   "changePct": 0.9,
   "close": 255.56,
   "closeDate": "2026-10-16"
  },
  "NXT": {
   "price": 80.04,
   "date": "2026-10-16",
   "changePct": -4.1,
   "close": 80.04,
   "closeDate": "2026-10-16"
  },
  "LLY": {
   "price": 1257.03,
   "date": "2026-10-16",
   "changePct": 0.4,
   "close": 1257.03,
   "closeDate": "2026-10-16"
  },
  "CI": {
   "price": 302.3,
   "date": "2026-10-16",
   "changePct": 1.2,
   "close": 302.3,
   "closeDate": "2026-10-16"
  },
  "NOW": {
   "price": 141.97,
   "date": "2026-10-16",
   "changePct": -4.4,
   "close": 141.97,
   "closeDate": "2026-10-16"
  },
  "TSLA": {
   "price": 354.72,
   "date": "2026-10-16",
   "changePct": -2.1,
   "close": 354.72,
   "closeDate": "2026-10-16"
  },
  "PG": {
   "price": 159.35,
   "date": "2026-10-16",
   "changePct": 1.4,
   "close": 159.35,
   "closeDate": "2026-10-16"
  },
  "MDLZ": {
   "price": 63.91,
   "date": "2026-10-16",
   "changePct": 1.4,
   "close": 63.91,
   "closeDate": "2026-10-16"
  },
  "AAPL": {
   "price": 343.46,
   "date": "2026-10-16",
   "changePct": 0.4,
   "close": 343.46,
   "closeDate": "2026-10-16"
  },
  "MU": {
   "price": 878.84,
   "date": "2026-10-16",
   "changePct": -5.6,
   "close": 878.84,
   "closeDate": "2026-10-16"
  },
  "MDT": {
   "price": 94.75,
   "date": "2026-10-16",
   "changePct": -0.7,
   "close": 94.75,
   "closeDate": "2026-10-16"
  },
  "IREN": {
   "price": 26.99,
   "date": "2026-10-16",
   "changePct": -11.2,
   "close": 26.99,
   "closeDate": "2026-10-16"
  },
  "UNH": {
   "price": 401.43,
   "date": "2026-10-16",
   "changePct": -1.3,
   "close": 401.43,
   "closeDate": "2026-10-16"
  },
  "GILD": {
   "price": 156.19,
   "date": "2026-10-16",
   "changePct": -0.7,
   "close": 156.19,
   "closeDate": "2026-10-16"
  },
  "BRK.B": {
   "price": 532.02,
   "date": "2026-10-16",
   "changePct": 1.2,
   "close": 532.02,
   "closeDate": "2026-10-16"
  },
  "TMO": {
   "price": 690,
   "date": "2026-10-16",
   "changePct": -0.9,
   "close": 690,
   "closeDate": "2026-10-16"
  },
  "ECL": {
   "price": 288.89,
   "date": "2026-10-16",
   "changePct": -0.7,
   "close": 288.89,
   "closeDate": "2026-10-16"
  },
  "NVT": {
   "price": 142.03,
   "date": "2026-10-16",
   "changePct": -2.5,
   "close": 142.03,
   "closeDate": "2026-10-16"
  },
  "FSS": {
   "price": 112.39,
   "date": "2026-10-16",
   "changePct": -1,
   "close": 112.39,
   "closeDate": "2026-10-16"
  },
  "MKSI": {
   "price": 214.83,
   "date": "2026-10-16",
   "changePct": -6,
   "close": 214.83,
   "closeDate": "2026-10-16"
  },
  "AAON": {
   "price": 73.73,
   "date": "2026-10-16",
   "changePct": -4.6,
   "close": 73.73,
   "closeDate": "2026-10-16"
  },
  "NVMI": {
   "price": 321.2,
   "date": "2026-10-16",
   "changePct": -2.5,
   "close": 321.2,
   "closeDate": "2026-10-16"
  },
  "POWL": {
   "price": 165.14,
   "date": "2026-10-16",
   "changePct": -3.3,
   "close": 165.14,
   "closeDate": "2026-10-16"
  },
  "TXN": {
   "price": 276.48,
   "date": "2026-10-16",
   "changePct": -0.9,
   "close": 276.48,
   "closeDate": "2026-10-16"
  },
  "MSI": {
   "price": 463.15,
   "date": "2026-10-16",
   "changePct": 1.5,
   "close": 463.15,
   "closeDate": "2026-10-16"
  },
  "DVN": {
   "price": 50.73,
   "date": "2026-10-16",
   "changePct": 3,
   "close": 50.73,
   "closeDate": "2026-10-16"
  },
  "RBC": {
   "price": 498.52,
   "date": "2026-10-16",
   "changePct": 0.2,
   "close": 498.52,
   "closeDate": "2026-10-16"
  },
  "GS": {
   "price": 881.26,
   "date": "2026-10-16",
   "changePct": -1.1,
   "close": 881.26,
   "closeDate": "2026-10-16"
  },
  "AMP": {
   "price": 500.8,
   "date": "2026-10-16",
   "changePct": -0.4,
   "close": 500.8,
   "closeDate": "2026-10-16"
  },
  "PNC": {
   "price": 217.39,
   "date": "2026-10-16",
   "changePct": 1.1,
   "close": 217.39,
   "closeDate": "2026-10-16"
  },
  "MTB": {
   "price": 215.28,
   "date": "2026-10-16",
   "changePct": -1.5,
   "close": 215.28,
   "closeDate": "2026-10-16"
  },
  "SO": {
   "price": 91.18,
   "date": "2026-10-16",
   "changePct": 2.2,
   "close": 91.18,
   "closeDate": "2026-10-16"
  },
  "WEC": {
   "price": 108.71,
   "date": "2026-10-16",
   "changePct": 2.5,
   "close": 108.71,
   "closeDate": "2026-10-16"
  },
  "MSCI": {
   "price": 569.08,
   "date": "2026-10-16",
   "changePct": -1,
   "close": 569.08,
   "closeDate": "2026-10-16"
  },
  "RSG": {
   "price": 231.54,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 231.54,
   "closeDate": "2026-10-16"
  },
  "CTAS": {
   "price": 213.69,
   "date": "2026-10-16",
   "changePct": 0.3,
   "close": 213.69,
   "closeDate": "2026-10-16"
  },
  "TJX": {
   "price": 147.33,
   "date": "2026-10-16",
   "changePct": 1.9,
   "close": 147.33,
   "closeDate": "2026-10-16"
  },
  "ANET": {
   "price": 176.98,
   "date": "2026-10-16",
   "changePct": -4.6,
   "close": 176.98,
   "closeDate": "2026-10-16"
  },
  "GD": {
   "price": 344.23,
   "date": "2026-10-16",
   "changePct": 2.1,
   "close": 344.23,
   "closeDate": "2026-10-16"
  },
  "APPF": {
   "price": 212.13,
   "date": "2026-10-16",
   "changePct": -3,
   "close": 212.13,
   "closeDate": "2026-10-16"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5668.05,
   "date": "2026-10-16",
   "changePct": 2,
   "close": 5668.05,
   "closeDate": "2026-10-16"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7659.44,
   "date": "2026-10-16",
   "changePct": -1.1,
   "close": 7659.44,
   "closeDate": "2026-10-16"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 214.09,
   "date": "2026-10-16",
   "changePct": -0.4,
   "close": 214.09,
   "closeDate": "2026-10-16"
  }
 }
};
