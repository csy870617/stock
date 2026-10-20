// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-20",
 "quotes": {
  "105560": {
   "price": 160900,
   "date": "2026-10-20",
   "changePct": -1.1,
   "close": 160900,
   "closeDate": "2026-10-20"
  },
  "119850": {
   "price": 39250,
   "date": "2026-10-20",
   "changePct": -5.5,
   "close": 39250,
   "closeDate": "2026-10-20"
  },
  "138040": {
   "price": 129300,
   "date": "2026-10-20",
   "changePct": -1.3,
   "close": 129300,
   "closeDate": "2026-10-20"
  },
  "139130": {
   "price": 16410,
   "date": "2026-10-20",
   "changePct": -3.5,
   "close": 16410,
   "closeDate": "2026-10-20"
  },
  "175330": {
   "price": 26800,
   "date": "2026-10-20",
   "changePct": -0.7,
   "close": 26800,
   "closeDate": "2026-10-20"
  },
  "207940": {
   "price": 1391000,
   "date": "2026-10-20",
   "changePct": -2.5,
   "close": 1391000,
   "closeDate": "2026-10-20"
  },
  "214450": {
   "price": 266000,
   "date": "2026-10-20",
   "changePct": -4.1,
   "close": 266000,
   "closeDate": "2026-10-20"
  },
  "241560": {
   "price": 50500,
   "date": "2026-10-20",
   "changePct": -2.1,
   "close": 50500,
   "closeDate": "2026-10-20"
  },
  "267250": {
   "price": 148700,
   "date": "2026-10-20",
   "changePct": -6.7,
   "close": 148700,
   "closeDate": "2026-10-20"
  },
  "267260": {
   "price": 487500,
   "date": "2026-10-20",
   "changePct": -7.1,
   "close": 487500,
   "closeDate": "2026-10-20"
  },
  "267270": {
   "price": 89700,
   "date": "2026-10-20",
   "changePct": -4.7,
   "close": 89700,
   "closeDate": "2026-10-20"
  },
  "278470": {
   "price": 310000,
   "date": "2026-10-20",
   "changePct": -6.5,
   "close": 310000,
   "closeDate": "2026-10-20"
  },
  "298040": {
   "price": 1892000,
   "date": "2026-10-20",
   "changePct": -2.3,
   "close": 1892000,
   "closeDate": "2026-10-20"
  },
  "316140": {
   "price": 31800,
   "date": "2026-10-20",
   "changePct": 0.5,
   "close": 31800,
   "closeDate": "2026-10-20"
  },
  "323410": {
   "price": 20250,
   "date": "2026-10-20",
   "changePct": -1.7,
   "close": 20250,
   "closeDate": "2026-10-20"
  },
  "329180": {
   "price": 318000,
   "date": "2026-10-20",
   "changePct": -8,
   "close": 318000,
   "closeDate": "2026-10-20"
  },
  "361610": {
   "price": 17040,
   "date": "2026-10-20",
   "changePct": -9.2,
   "close": 17040,
   "closeDate": "2026-10-20"
  },
  "403870": {
   "price": 50300,
   "date": "2026-10-20",
   "changePct": -4.4,
   "close": 50300,
   "closeDate": "2026-10-20"
  },
  "005930": {
   "price": 211500,
   "date": "2026-10-20",
   "changePct": -3,
   "close": 211500,
   "closeDate": "2026-10-20"
  },
  "055550": {
   "price": 91800,
   "date": "2026-10-20",
   "changePct": -1.6,
   "close": 91800,
   "closeDate": "2026-10-20"
  },
  "000810": {
   "price": 602000,
   "date": "2026-10-20",
   "changePct": -0.8,
   "close": 602000,
   "closeDate": "2026-10-20"
  },
  "028260": {
   "price": 275000,
   "date": "2026-10-20",
   "changePct": -3.5,
   "close": 275000,
   "closeDate": "2026-10-20"
  },
  "086790": {
   "price": 121800,
   "date": "2026-10-20",
   "changePct": -1.5,
   "close": 121800,
   "closeDate": "2026-10-20"
  },
  "000660": {
   "price": 1223000,
   "date": "2026-10-20",
   "changePct": -4.2,
   "close": 1223000,
   "closeDate": "2026-10-20"
  },
  "012450": {
   "price": 799000,
   "date": "2026-10-20",
   "changePct": -11.7,
   "close": 799000,
   "closeDate": "2026-10-20"
  },
  "009540": {
   "price": 254500,
   "date": "2026-10-20",
   "changePct": -6.3,
   "close": 254500,
   "closeDate": "2026-10-20"
  },
  "068270": {
   "price": 197400,
   "date": "2026-10-20",
   "changePct": -0.4,
   "close": 197400,
   "closeDate": "2026-10-20"
  },
  "000270": {
   "price": 112400,
   "date": "2026-10-20",
   "changePct": -3.1,
   "close": 112400,
   "closeDate": "2026-10-20"
  },
  "032640": {
   "price": 15340,
   "date": "2026-10-20",
   "changePct": -2.8,
   "close": 15340,
   "closeDate": "2026-10-20"
  },
  "029780": {
   "price": 42800,
   "date": "2026-10-20",
   "changePct": 0,
   "close": 42800,
   "closeDate": "2026-10-20"
  },
  "058470": {
   "price": 67500,
   "date": "2026-10-20",
   "changePct": -2.7,
   "close": 67500,
   "closeDate": "2026-10-20"
  },
  "082920": {
   "price": 24200,
   "date": "2026-10-20",
   "changePct": -4.2,
   "close": 24200,
   "closeDate": "2026-10-20"
  },
  "064760": {
   "price": 223000,
   "date": "2026-10-20",
   "changePct": -4.9,
   "close": 223000,
   "closeDate": "2026-10-20"
  },
  "035900": {
   "price": 39600,
   "date": "2026-10-20",
   "changePct": -2,
   "close": 39600,
   "closeDate": "2026-10-20"
  },
  "021240": {
   "price": 107700,
   "date": "2026-10-20",
   "changePct": -0.6,
   "close": 107700,
   "closeDate": "2026-10-20"
  },
  "036570": {
   "price": 220500,
   "date": "2026-10-20",
   "changePct": 1.1,
   "close": 220500,
   "closeDate": "2026-10-20"
  },
  "035720": {
   "price": 31550,
   "date": "2026-10-20",
   "changePct": -1.7,
   "close": 31550,
   "closeDate": "2026-10-20"
  },
  "001040": {
   "price": 119900,
   "date": "2026-10-20",
   "changePct": -7.2,
   "close": 119900,
   "closeDate": "2026-10-20"
  },
  "012750": {
   "price": 97300,
   "date": "2026-10-20",
   "changePct": -0.3,
   "close": 97300,
   "closeDate": "2026-10-20"
  },
  "047050": {
   "price": 55600,
   "date": "2026-10-20",
   "changePct": -2.8,
   "close": 55600,
   "closeDate": "2026-10-20"
  },
  "033780": {
   "price": 194000,
   "date": "2026-10-20",
   "changePct": 0.5,
   "close": 194000,
   "closeDate": "2026-10-20"
  },
  "001120": {
   "price": 44650,
   "date": "2026-10-20",
   "changePct": -0.3,
   "close": 44650,
   "closeDate": "2026-10-20"
  },
  "004370": {
   "price": 411500,
   "date": "2026-10-20",
   "changePct": 0,
   "close": 411500,
   "closeDate": "2026-10-20"
  },
  "062040": {
   "price": 174200,
   "date": "2026-10-20",
   "changePct": -7.8,
   "close": 174200,
   "closeDate": "2026-10-20"
  },
  "041830": {
   "price": 50400,
   "date": "2026-10-20",
   "changePct": -1.9,
   "close": 50400,
   "closeDate": "2026-10-20"
  },
  "005830": {
   "price": 188400,
   "date": "2026-10-20",
   "changePct": -0.3,
   "close": 188400,
   "closeDate": "2026-10-20"
  },
  "066570": {
   "price": 163400,
   "date": "2026-10-20",
   "changePct": -4.2,
   "close": 163400,
   "closeDate": "2026-10-20"
  },
  "086280": {
   "price": 183400,
   "date": "2026-10-20",
   "changePct": -3.7,
   "close": 183400,
   "closeDate": "2026-10-20"
  },
  "018260": {
   "price": 198800,
   "date": "2026-10-20",
   "changePct": -2.3,
   "close": 198800,
   "closeDate": "2026-10-20"
  },
  "005850": {
   "price": 50200,
   "date": "2026-10-20",
   "changePct": -2.5,
   "close": 50200,
   "closeDate": "2026-10-20"
  },
  "095340": {
   "price": 156600,
   "date": "2026-10-20",
   "changePct": -2.3,
   "close": 156600,
   "closeDate": "2026-10-20"
  },
  "005490": {
   "price": 302000,
   "date": "2026-10-20",
   "changePct": -4,
   "close": 302000,
   "closeDate": "2026-10-20"
  },
  "035420": {
   "price": 178000,
   "date": "2026-10-20",
   "changePct": -2.7,
   "close": 178000,
   "closeDate": "2026-10-20"
  },
  "MSFT": {
   "price": 531.87,
   "date": "2026-10-20",
   "changePct": -0.3,
   "close": 531.87,
   "closeDate": "2026-10-20"
  },
  "V": {
   "price": 406.57,
   "date": "2026-10-20",
   "changePct": 0.9,
   "close": 406.57,
   "closeDate": "2026-10-20"
  },
  "MA": {
   "price": 620.42,
   "date": "2026-10-20",
   "changePct": 0.7,
   "close": 620.42,
   "closeDate": "2026-10-20"
  },
  "GOOGL": {
   "price": 340.275,
   "date": "2026-10-20",
   "changePct": -1.1,
   "close": 340.275,
   "closeDate": "2026-10-20"
  },
  "AMZN": {
   "price": 262.63,
   "date": "2026-10-20",
   "changePct": 0.1,
   "close": 262.63,
   "closeDate": "2026-10-20"
  },
  "COST": {
   "price": 994.61,
   "date": "2026-10-20",
   "changePct": -0.1,
   "close": 994.61,
   "closeDate": "2026-10-20"
  },
  "NVDA": {
   "price": 216.47,
   "date": "2026-10-20",
   "changePct": -0.3,
   "close": 216.47,
   "closeDate": "2026-10-20"
  },
  "META": {
   "price": 694.25,
   "date": "2026-10-20",
   "changePct": -1.6,
   "close": 694.25,
   "closeDate": "2026-10-20"
  },
  "AVGO": {
   "price": 334.37,
   "date": "2026-10-20",
   "changePct": -0.1,
   "close": 334.37,
   "closeDate": "2026-10-20"
  },
  "TSM": {
   "price": 425.08,
   "date": "2026-10-20",
   "changePct": 1.2,
   "close": 425.08,
   "closeDate": "2026-10-20"
  },
  "UBER": {
   "price": 68.94,
   "date": "2026-10-20",
   "changePct": -1.5,
   "close": 68.94,
   "closeDate": "2026-10-20"
  },
  "GM": {
   "price": 77.09,
   "date": "2026-10-20",
   "changePct": -6.8,
   "close": 77.09,
   "closeDate": "2026-10-20"
  },
  "VZ": {
   "price": 44.54,
   "date": "2026-10-20",
   "changePct": 0.9,
   "close": 44.54,
   "closeDate": "2026-10-20"
  },
  "C": {
   "price": 122.51,
   "date": "2026-10-20",
   "changePct": 0.7,
   "close": 122.51,
   "closeDate": "2026-10-20"
  },
  "DUK": {
   "price": 121.33,
   "date": "2026-10-20",
   "changePct": 1.7,
   "close": 121.33,
   "closeDate": "2026-10-20"
  },
  "KO": {
   "price": 93.49,
   "date": "2026-10-20",
   "changePct": 0.1,
   "close": 93.49,
   "closeDate": "2026-10-20"
  },
  "JNJ": {
   "price": 259.36,
   "date": "2026-10-20",
   "changePct": 2.2,
   "close": 259.36,
   "closeDate": "2026-10-20"
  },
  "NXT": {
   "price": 79.03,
   "date": "2026-10-20",
   "changePct": -0.8,
   "close": 79.03,
   "closeDate": "2026-10-20"
  },
  "LLY": {
   "price": 1283.66,
   "date": "2026-10-20",
   "changePct": 3.5,
   "close": 1283.66,
   "closeDate": "2026-10-20"
  },
  "CI": {
   "price": 306.6,
   "date": "2026-10-20",
   "changePct": 2.7,
   "close": 306.6,
   "closeDate": "2026-10-20"
  },
  "NOW": {
   "price": 149.54,
   "date": "2026-10-20",
   "changePct": 2.9,
   "close": 149.54,
   "closeDate": "2026-10-20"
  },
  "TSLA": {
   "price": 373.71,
   "date": "2026-10-20",
   "changePct": 1.5,
   "close": 373.71,
   "closeDate": "2026-10-20"
  },
  "PG": {
   "price": 159.32,
   "date": "2026-10-20",
   "changePct": 1,
   "close": 159.32,
   "closeDate": "2026-10-20"
  },
  "MDLZ": {
   "price": 63.99,
   "date": "2026-10-20",
   "changePct": 1,
   "close": 63.99,
   "closeDate": "2026-10-20"
  },
  "AAPL": {
   "price": 339.5,
   "date": "2026-10-20",
   "changePct": -1,
   "close": 339.5,
   "closeDate": "2026-10-20"
  },
  "MU": {
   "price": 896.07,
   "date": "2026-10-20",
   "changePct": -1,
   "close": 896.07,
   "closeDate": "2026-10-20"
  },
  "MDT": {
   "price": 94.63,
   "date": "2026-10-20",
   "changePct": 2,
   "close": 94.63,
   "closeDate": "2026-10-20"
  },
  "IREN": {
   "price": 26.62,
   "date": "2026-10-20",
   "changePct": -4,
   "close": 26.62,
   "closeDate": "2026-10-20"
  },
  "UNH": {
   "price": 419.26,
   "date": "2026-10-20",
   "changePct": 3,
   "close": 419.26,
   "closeDate": "2026-10-20"
  },
  "GILD": {
   "price": 156.51,
   "date": "2026-10-20",
   "changePct": 2.2,
   "close": 156.51,
   "closeDate": "2026-10-20"
  },
  "BRK.B": {
   "price": 539.82,
   "date": "2026-10-20",
   "changePct": 1.4,
   "close": 539.82,
   "closeDate": "2026-10-20"
  },
  "TMO": {
   "price": 687.37,
   "date": "2026-10-20",
   "changePct": 1.2,
   "close": 687.37,
   "closeDate": "2026-10-20"
  },
  "ECL": {
   "price": 288.16,
   "date": "2026-10-20",
   "changePct": 0.8,
   "close": 288.16,
   "closeDate": "2026-10-20"
  },
  "NVT": {
   "price": 139.78,
   "date": "2026-10-20",
   "changePct": -1.3,
   "close": 139.78,
   "closeDate": "2026-10-20"
  },
  "FSS": {
   "price": 114.66,
   "date": "2026-10-20",
   "changePct": 1.5,
   "close": 114.66,
   "closeDate": "2026-10-20"
  },
  "MKSI": {
   "price": 211.14,
   "date": "2026-10-20",
   "changePct": -2,
   "close": 211.14,
   "closeDate": "2026-10-20"
  },
  "AAON": {
   "price": 73.92,
   "date": "2026-10-20",
   "changePct": -1.9,
   "close": 73.92,
   "closeDate": "2026-10-20"
  },
  "NVMI": {
   "price": 320.03,
   "date": "2026-10-20",
   "changePct": 0.3,
   "close": 320.03,
   "closeDate": "2026-10-20"
  },
  "POWL": {
   "price": 164.94,
   "date": "2026-10-20",
   "changePct": -0.5,
   "close": 164.94,
   "closeDate": "2026-10-20"
  },
  "TXN": {
   "price": 277.78,
   "date": "2026-10-20",
   "changePct": 0.6,
   "close": 277.78,
   "closeDate": "2026-10-20"
  },
  "MSI": {
   "price": 463.46,
   "date": "2026-10-20",
   "changePct": 1,
   "close": 463.46,
   "closeDate": "2026-10-20"
  },
  "DVN": {
   "price": 50.38,
   "date": "2026-10-20",
   "changePct": -1.1,
   "close": 50.38,
   "closeDate": "2026-10-20"
  },
  "RBC": {
   "price": 495.39,
   "date": "2026-10-20",
   "changePct": -1.7,
   "close": 495.39,
   "closeDate": "2026-10-20"
  },
  "GS": {
   "price": 884.81,
   "date": "2026-10-20",
   "changePct": 1,
   "close": 884.81,
   "closeDate": "2026-10-20"
  },
  "AMP": {
   "price": 487.67,
   "date": "2026-10-20",
   "changePct": 1.5,
   "close": 487.67,
   "closeDate": "2026-10-20"
  },
  "PNC": {
   "price": 220.99,
   "date": "2026-10-20",
   "changePct": 2.2,
   "close": 220.99,
   "closeDate": "2026-10-20"
  },
  "MTB": {
   "price": 218.35,
   "date": "2026-10-20",
   "changePct": 2.2,
   "close": 218.35,
   "closeDate": "2026-10-20"
  },
  "SO": {
   "price": 90.71,
   "date": "2026-10-20",
   "changePct": 1.6,
   "close": 90.71,
   "closeDate": "2026-10-20"
  },
  "WEC": {
   "price": 108.75,
   "date": "2026-10-20",
   "changePct": 1.6,
   "close": 108.75,
   "closeDate": "2026-10-20"
  },
  "MSCI": {
   "price": 591.69,
   "date": "2026-10-20",
   "changePct": 5,
   "close": 591.69,
   "closeDate": "2026-10-20"
  },
  "RSG": {
   "price": 232.98,
   "date": "2026-10-20",
   "changePct": 1.7,
   "close": 232.98,
   "closeDate": "2026-10-20"
  },
  "CTAS": {
   "price": 217.03,
   "date": "2026-10-20",
   "changePct": 2.2,
   "close": 217.03,
   "closeDate": "2026-10-20"
  },
  "TJX": {
   "price": 146.99,
   "date": "2026-10-20",
   "changePct": -0.3,
   "close": 146.99,
   "closeDate": "2026-10-20"
  },
  "ANET": {
   "price": 181.19,
   "date": "2026-10-20",
   "changePct": -1,
   "close": 181.19,
   "closeDate": "2026-10-20"
  },
  "GD": {
   "price": 344.44,
   "date": "2026-10-20",
   "changePct": 0.9,
   "close": 344.44,
   "closeDate": "2026-10-20"
  },
  "APPF": {
   "price": 223.7,
   "date": "2026-10-20",
   "changePct": 5.6,
   "close": 223.7,
   "closeDate": "2026-10-20"
  },
  "CB": {
   "price": 357.75,
   "date": "2026-10-20",
   "changePct": 0.4,
   "close": 357.75,
   "closeDate": "2026-10-20"
  },
  "ADP": {
   "price": 292.75,
   "date": "2026-10-20",
   "changePct": 2,
   "close": 292.75,
   "closeDate": "2026-10-20"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5552.74,
   "date": "2026-10-20",
   "changePct": -3.7,
   "close": 5552.74,
   "closeDate": "2026-10-20"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7712.57,
   "date": "2026-10-20",
   "changePct": 0.3,
   "close": 7712.57,
   "closeDate": "2026-10-20"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215.86,
   "date": "2026-10-20",
   "changePct": 1.2,
   "close": 215.86,
   "closeDate": "2026-10-20"
  }
 }
};
