// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-28",
 "quotes": {
  "103590": {
   "price": 58900,
   "date": "2026-10-28",
   "changePct": 4.2,
   "close": 58900,
   "closeDate": "2026-10-28"
  },
  "105560": {
   "price": 154000,
   "date": "2026-10-28",
   "changePct": 4.3,
   "close": 154000,
   "closeDate": "2026-10-28"
  },
  "119850": {
   "price": 37450,
   "date": "2026-10-28",
   "changePct": 1.8,
   "close": 37450,
   "closeDate": "2026-10-28"
  },
  "138040": {
   "price": 123500,
   "date": "2026-10-28",
   "changePct": 0.4,
   "close": 123500,
   "closeDate": "2026-10-28"
  },
  "139130": {
   "price": 15150,
   "date": "2026-10-28",
   "changePct": 1.8,
   "close": 15150,
   "closeDate": "2026-10-28"
  },
  "175330": {
   "price": 24450,
   "date": "2026-10-28",
   "changePct": 0.6,
   "close": 24450,
   "closeDate": "2026-10-28"
  },
  "207940": {
   "price": 1372000,
   "date": "2026-10-28",
   "changePct": -0.1,
   "close": 1372000,
   "closeDate": "2026-10-28"
  },
  "214450": {
   "price": 228500,
   "date": "2026-10-28",
   "changePct": -1.3,
   "close": 228500,
   "closeDate": "2026-10-28"
  },
  "241560": {
   "price": 49450,
   "date": "2026-10-28",
   "changePct": 1.6,
   "close": 49450,
   "closeDate": "2026-10-28"
  },
  "267250": {
   "price": 145100,
   "date": "2026-10-28",
   "changePct": 6.5,
   "close": 145100,
   "closeDate": "2026-10-28"
  },
  "267260": {
   "price": 462500,
   "date": "2026-10-28",
   "changePct": 2.8,
   "close": 462500,
   "closeDate": "2026-10-28"
  },
  "267270": {
   "price": 80900,
   "date": "2026-10-28",
   "changePct": 0.1,
   "close": 80900,
   "closeDate": "2026-10-28"
  },
  "278470": {
   "price": 289000,
   "date": "2026-10-28",
   "changePct": 4,
   "close": 289000,
   "closeDate": "2026-10-28"
  },
  "298040": {
   "price": 1998000,
   "date": "2026-10-28",
   "changePct": 4.4,
   "close": 1998000,
   "closeDate": "2026-10-28"
  },
  "316140": {
   "price": 29900,
   "date": "2026-10-28",
   "changePct": 3.6,
   "close": 29900,
   "closeDate": "2026-10-28"
  },
  "323410": {
   "price": 19530,
   "date": "2026-10-28",
   "changePct": -0.3,
   "close": 19530,
   "closeDate": "2026-10-28"
  },
  "329180": {
   "price": 285500,
   "date": "2026-10-28",
   "changePct": -2.1,
   "close": 285500,
   "closeDate": "2026-10-28"
  },
  "361610": {
   "price": 15920,
   "date": "2026-10-28",
   "changePct": 0.5,
   "close": 15920,
   "closeDate": "2026-10-28"
  },
  "403870": {
   "price": 47300,
   "date": "2026-10-28",
   "changePct": 2.6,
   "close": 47300,
   "closeDate": "2026-10-28"
  },
  "005930": {
   "price": 242000,
   "date": "2026-10-28",
   "changePct": 9,
   "close": 242000,
   "closeDate": "2026-10-28"
  },
  "055550": {
   "price": 87800,
   "date": "2026-10-28",
   "changePct": 2.3,
   "close": 87800,
   "closeDate": "2026-10-28"
  },
  "000810": {
   "price": 637000,
   "date": "2026-10-28",
   "changePct": 6.7,
   "close": 637000,
   "closeDate": "2026-10-28"
  },
  "028260": {
   "price": 324500,
   "date": "2026-10-28",
   "changePct": 7.8,
   "close": 324500,
   "closeDate": "2026-10-28"
  },
  "086790": {
   "price": 115300,
   "date": "2026-10-28",
   "changePct": 1.8,
   "close": 115300,
   "closeDate": "2026-10-28"
  },
  "012450": {
   "price": 787000,
   "date": "2026-10-28",
   "changePct": 2.5,
   "close": 787000,
   "closeDate": "2026-10-28"
  },
  "009540": {
   "price": 241500,
   "date": "2026-10-28",
   "changePct": -2,
   "close": 241500,
   "closeDate": "2026-10-28"
  },
  "068270": {
   "price": 189800,
   "date": "2026-10-28",
   "changePct": 0.6,
   "close": 189800,
   "closeDate": "2026-10-28"
  },
  "000270": {
   "price": 107900,
   "date": "2026-10-28",
   "changePct": 1.3,
   "close": 107900,
   "closeDate": "2026-10-28"
  },
  "032640": {
   "price": 13790,
   "date": "2026-10-28",
   "changePct": 1.1,
   "close": 13790,
   "closeDate": "2026-10-28"
  },
  "029780": {
   "price": 40850,
   "date": "2026-10-28",
   "changePct": 0.2,
   "close": 40850,
   "closeDate": "2026-10-28"
  },
  "058470": {
   "price": 63500,
   "date": "2026-10-28",
   "changePct": 3.4,
   "close": 63500,
   "closeDate": "2026-10-28"
  },
  "082920": {
   "price": 23850,
   "date": "2026-10-28",
   "changePct": 1.9,
   "close": 23850,
   "closeDate": "2026-10-28"
  },
  "064760": {
   "price": 220000,
   "date": "2026-10-28",
   "changePct": 3.3,
   "close": 220000,
   "closeDate": "2026-10-28"
  },
  "035900": {
   "price": 40050,
   "date": "2026-10-28",
   "changePct": 4.2,
   "close": 40050,
   "closeDate": "2026-10-28"
  },
  "021240": {
   "price": 101600,
   "date": "2026-10-28",
   "changePct": -1.6,
   "close": 101600,
   "closeDate": "2026-10-28"
  },
  "036570": {
   "price": 201000,
   "date": "2026-10-28",
   "changePct": 1.2,
   "close": 201000,
   "closeDate": "2026-10-28"
  },
  "035720": {
   "price": 29800,
   "date": "2026-10-28",
   "changePct": 1,
   "close": 29800,
   "closeDate": "2026-10-28"
  },
  "001040": {
   "price": 115000,
   "date": "2026-10-28",
   "changePct": 1.9,
   "close": 115000,
   "closeDate": "2026-10-28"
  },
  "012750": {
   "price": 95100,
   "date": "2026-10-28",
   "changePct": -0.2,
   "close": 95100,
   "closeDate": "2026-10-28"
  },
  "000660": {
   "price": 1487000,
   "date": "2026-10-28",
   "changePct": 10.9,
   "close": 1487000,
   "closeDate": "2026-10-28"
  },
  "033780": {
   "price": 188100,
   "date": "2026-10-28",
   "changePct": 0.7,
   "close": 188100,
   "closeDate": "2026-10-28"
  },
  "001120": {
   "price": 40250,
   "date": "2026-10-28",
   "changePct": -2.8,
   "close": 40250,
   "closeDate": "2026-10-28"
  },
  "004370": {
   "price": 389500,
   "date": "2026-10-28",
   "changePct": -0.9,
   "close": 389500,
   "closeDate": "2026-10-28"
  },
  "062040": {
   "price": 164100,
   "date": "2026-10-28",
   "changePct": 2.4,
   "close": 164100,
   "closeDate": "2026-10-28"
  },
  "041830": {
   "price": 46400,
   "date": "2026-10-28",
   "changePct": 1,
   "close": 46400,
   "closeDate": "2026-10-28"
  },
  "005830": {
   "price": 180300,
   "date": "2026-10-28",
   "changePct": 1.1,
   "close": 180300,
   "closeDate": "2026-10-28"
  },
  "066570": {
   "price": 161700,
   "date": "2026-10-28",
   "changePct": 2.7,
   "close": 161700,
   "closeDate": "2026-10-28"
  },
  "086280": {
   "price": 187000,
   "date": "2026-10-28",
   "changePct": 3.7,
   "close": 187000,
   "closeDate": "2026-10-28"
  },
  "018260": {
   "price": 222500,
   "date": "2026-10-28",
   "changePct": 3.5,
   "close": 222500,
   "closeDate": "2026-10-28"
  },
  "005850": {
   "price": 49900,
   "date": "2026-10-28",
   "changePct": 0.8,
   "close": 49900,
   "closeDate": "2026-10-28"
  },
  "095340": {
   "price": 165900,
   "date": "2026-10-28",
   "changePct": 9.6,
   "close": 165900,
   "closeDate": "2026-10-28"
  },
  "005490": {
   "price": 282000,
   "date": "2026-10-28",
   "changePct": 2.2,
   "close": 282000,
   "closeDate": "2026-10-28"
  },
  "035420": {
   "price": 178000,
   "date": "2026-10-28",
   "changePct": 2.1,
   "close": 178000,
   "closeDate": "2026-10-28"
  },
  "010120": {
   "price": 164600,
   "date": "2026-10-28",
   "changePct": 4.1,
   "close": 164600,
   "closeDate": "2026-10-28"
  },
  "030200": {
   "price": 45350,
   "date": "2026-10-28",
   "changePct": 1.5,
   "close": 45350,
   "closeDate": "2026-10-28"
  },
  "012330": {
   "price": 352000,
   "date": "2026-10-28",
   "changePct": 5.9,
   "close": 352000,
   "closeDate": "2026-10-28"
  },
  "MSFT": {
   "price": 531.33,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 531.33,
   "closeDate": "2026-10-27"
  },
  "V": {
   "price": 401.86,
   "date": "2026-10-27",
   "changePct": -0.6,
   "close": 401.86,
   "closeDate": "2026-10-27"
  },
  "MA": {
   "price": 609.85,
   "date": "2026-10-27",
   "changePct": -0.6,
   "close": 609.85,
   "closeDate": "2026-10-27"
  },
  "GOOGL": {
   "price": 320.58,
   "date": "2026-10-27",
   "changePct": 1.2,
   "close": 320.58,
   "closeDate": "2026-10-27"
  },
  "COST": {
   "price": 992.13,
   "date": "2026-10-27",
   "changePct": -1.3,
   "close": 992.13,
   "closeDate": "2026-10-27"
  },
  "NVDA": {
   "price": 217.94,
   "date": "2026-10-27",
   "changePct": 0.9,
   "close": 217.94,
   "closeDate": "2026-10-27"
  },
  "META": {
   "price": 620.19,
   "date": "2026-10-27",
   "changePct": -1.6,
   "close": 620.19,
   "closeDate": "2026-10-27"
  },
  "AVGO": {
   "price": 342.33,
   "date": "2026-10-27",
   "changePct": 4,
   "close": 342.33,
   "closeDate": "2026-10-27"
  },
  "AMZN": {
   "price": 253.1,
   "date": "2026-10-27",
   "changePct": 1.6,
   "close": 253.1,
   "closeDate": "2026-10-27"
  },
  "TSM": {
   "price": 436.87,
   "date": "2026-10-27",
   "changePct": 2.9,
   "close": 436.87,
   "closeDate": "2026-10-27"
  },
  "UBER": {
   "price": 65.78,
   "date": "2026-10-27",
   "changePct": -0.5,
   "close": 65.78,
   "closeDate": "2026-10-27"
  },
  "GM": {
   "price": 80.54,
   "date": "2026-10-27",
   "changePct": 5.5,
   "close": 80.54,
   "closeDate": "2026-10-27"
  },
  "VZ": {
   "price": 43.93,
   "date": "2026-10-27",
   "changePct": 1.9,
   "close": 43.93,
   "closeDate": "2026-10-27"
  },
  "C": {
   "price": 122.69,
   "date": "2026-10-27",
   "changePct": 1.4,
   "close": 122.69,
   "closeDate": "2026-10-27"
  },
  "DUK": {
   "price": 124.8,
   "date": "2026-10-27",
   "changePct": 0.3,
   "close": 124.8,
   "closeDate": "2026-10-27"
  },
  "KO": {
   "price": 91.18,
   "date": "2026-10-27",
   "changePct": -1.6,
   "close": 91.18,
   "closeDate": "2026-10-27"
  },
  "JNJ": {
   "price": 268.73,
   "date": "2026-10-27",
   "changePct": 0.9,
   "close": 268.73,
   "closeDate": "2026-10-27"
  },
  "NXT": {
   "price": 79.44,
   "date": "2026-10-27",
   "changePct": 3.9,
   "close": 79.44,
   "closeDate": "2026-10-27"
  },
  "LLY": {
   "price": 1281.91,
   "date": "2026-10-27",
   "changePct": 0.2,
   "close": 1281.91,
   "closeDate": "2026-10-27"
  },
  "CI": {
   "price": 298.28,
   "date": "2026-10-27",
   "changePct": -2.5,
   "close": 298.28,
   "closeDate": "2026-10-27"
  },
  "NOW": {
   "price": 154.78,
   "date": "2026-10-27",
   "changePct": -2.1,
   "close": 154.78,
   "closeDate": "2026-10-27"
  },
  "TSLA": {
   "price": 407.46,
   "date": "2026-10-27",
   "changePct": 4,
   "close": 407.46,
   "closeDate": "2026-10-27"
  },
  "MDLZ": {
   "price": 62.35,
   "date": "2026-10-27",
   "changePct": -1,
   "close": 62.35,
   "closeDate": "2026-10-27"
  },
  "AAPL": {
   "price": 347.1,
   "date": "2026-10-27",
   "changePct": 0.9,
   "close": 347.1,
   "closeDate": "2026-10-27"
  },
  "MU": {
   "price": 928.76,
   "date": "2026-10-27",
   "changePct": 2.8,
   "close": 928.76,
   "closeDate": "2026-10-27"
  },
  "MDT": {
   "price": 93.95,
   "date": "2026-10-27",
   "changePct": -0.9,
   "close": 93.95,
   "closeDate": "2026-10-27"
  },
  "IREN": {
   "price": 27.44,
   "date": "2026-10-27",
   "changePct": 7.9,
   "close": 27.44,
   "closeDate": "2026-10-27"
  },
  "UNH": {
   "price": 410.39,
   "date": "2026-10-27",
   "changePct": -0.1,
   "close": 410.39,
   "closeDate": "2026-10-27"
  },
  "GILD": {
   "price": 159.08,
   "date": "2026-10-27",
   "changePct": 0.2,
   "close": 159.08,
   "closeDate": "2026-10-27"
  },
  "BRK.B": {
   "price": 542.99,
   "date": "2026-10-27",
   "changePct": -1,
   "close": 542.99,
   "closeDate": "2026-10-27"
  },
  "TMO": {
   "price": 693.02,
   "date": "2026-10-27",
   "changePct": 1.2,
   "close": 693.02,
   "closeDate": "2026-10-27"
  },
  "ECL": {
   "price": 291.27,
   "date": "2026-10-27",
   "changePct": 0.8,
   "close": 291.27,
   "closeDate": "2026-10-27"
  },
  "NVT": {
   "price": 134.53,
   "date": "2026-10-27",
   "changePct": 4.1,
   "close": 134.53,
   "closeDate": "2026-10-27"
  },
  "FSS": {
   "price": 115.81,
   "date": "2026-10-27",
   "changePct": 1.5,
   "close": 115.81,
   "closeDate": "2026-10-27"
  },
  "AAON": {
   "price": 75.83,
   "date": "2026-10-27",
   "changePct": 7.1,
   "close": 75.83,
   "closeDate": "2026-10-27"
  },
  "NVMI": {
   "price": 327.6,
   "date": "2026-10-27",
   "changePct": 3.6,
   "close": 327.6,
   "closeDate": "2026-10-27"
  },
  "POWL": {
   "price": 161.36,
   "date": "2026-10-27",
   "changePct": 2.7,
   "close": 161.36,
   "closeDate": "2026-10-27"
  },
  "MSI": {
   "price": 483.61,
   "date": "2026-10-27",
   "changePct": -0.4,
   "close": 483.61,
   "closeDate": "2026-10-27"
  },
  "DVN": {
   "price": 51.23,
   "date": "2026-10-27",
   "changePct": -0.8,
   "close": 51.23,
   "closeDate": "2026-10-27"
  },
  "GS": {
   "price": 911.77,
   "date": "2026-10-27",
   "changePct": 2.1,
   "close": 911.77,
   "closeDate": "2026-10-27"
  },
  "AMP": {
   "price": 492.85,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 492.85,
   "closeDate": "2026-10-27"
  },
  "PNC": {
   "price": 227.54,
   "date": "2026-10-27",
   "changePct": 0.8,
   "close": 227.54,
   "closeDate": "2026-10-27"
  },
  "MTB": {
   "price": 221.31,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 221.31,
   "closeDate": "2026-10-27"
  },
  "SO": {
   "price": 92.65,
   "date": "2026-10-27",
   "changePct": 0.1,
   "close": 92.65,
   "closeDate": "2026-10-27"
  },
  "WEC": {
   "price": 111.43,
   "date": "2026-10-27",
   "changePct": 0.3,
   "close": 111.43,
   "closeDate": "2026-10-27"
  },
  "MSCI": {
   "price": 601.75,
   "date": "2026-10-27",
   "changePct": -2.6,
   "close": 601.75,
   "closeDate": "2026-10-27"
  },
  "RSG": {
   "price": 235.66,
   "date": "2026-10-27",
   "changePct": -2.3,
   "close": 235.66,
   "closeDate": "2026-10-27"
  },
  "CTAS": {
   "price": 214.8,
   "date": "2026-10-27",
   "changePct": -4.9,
   "close": 214.8,
   "closeDate": "2026-10-27"
  },
  "TJX": {
   "price": 140.2,
   "date": "2026-10-27",
   "changePct": -2.4,
   "close": 140.2,
   "closeDate": "2026-10-27"
  },
  "ANET": {
   "price": 187,
   "date": "2026-10-27",
   "changePct": 5.5,
   "close": 187,
   "closeDate": "2026-10-27"
  },
  "GD": {
   "price": 354.89,
   "date": "2026-10-27",
   "changePct": -0.6,
   "close": 354.89,
   "closeDate": "2026-10-27"
  },
  "APPF": {
   "price": 201.445,
   "date": "2026-10-27",
   "changePct": -6,
   "close": 201.445,
   "closeDate": "2026-10-27"
  },
  "CB": {
   "price": 356.25,
   "date": "2026-10-27",
   "changePct": -0.1,
   "close": 356.25,
   "closeDate": "2026-10-27"
  },
  "ADP": {
   "price": 293.11,
   "date": "2026-10-27",
   "changePct": -2.7,
   "close": 293.11,
   "closeDate": "2026-10-27"
  },
  "LMT": {
   "price": 622.99,
   "date": "2026-10-27",
   "changePct": -1.9,
   "close": 622.99,
   "closeDate": "2026-10-27"
  },
  "ORLY": {
   "price": 89.82,
   "date": "2026-10-27",
   "changePct": -1.4,
   "close": 89.82,
   "closeDate": "2026-10-27"
  },
  "YUM": {
   "price": 149.54,
   "date": "2026-10-27",
   "changePct": 0,
   "close": 149.54,
   "closeDate": "2026-10-27"
  },
  "FIVE": {
   "price": 231.25,
   "date": "2026-10-27",
   "changePct": 0.5,
   "close": 231.25,
   "closeDate": "2026-10-27"
  },
  "STRL": {
   "price": 367.5,
   "date": "2026-10-27",
   "changePct": 1.9,
   "close": 367.5,
   "closeDate": "2026-10-27"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 6012.44,
   "date": "2026-10-28",
   "changePct": 6.6,
   "close": 6012.44,
   "closeDate": "2026-10-28"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7722.6,
   "date": "2026-10-27",
   "changePct": 0.6,
   "close": 7722.6,
   "closeDate": "2026-10-27"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 217.52,
   "date": "2026-10-27",
   "changePct": 0.1,
   "close": 217.52,
   "closeDate": "2026-10-27"
  }
 }
};
