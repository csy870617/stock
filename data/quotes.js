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
   "price": 531.01,
   "date": "2026-10-28",
   "changePct": -0.1,
   "close": 531.01,
   "closeDate": "2026-10-28"
  },
  "V": {
   "price": 400.6,
   "date": "2026-10-28",
   "changePct": -0.3,
   "close": 400.6,
   "closeDate": "2026-10-28"
  },
  "MA": {
   "price": 610.31,
   "date": "2026-10-28",
   "changePct": 0.1,
   "close": 610.31,
   "closeDate": "2026-10-28"
  },
  "GOOGL": {
   "price": 324.89,
   "date": "2026-10-28",
   "changePct": 1.3,
   "close": 324.89,
   "closeDate": "2026-10-28"
  },
  "COST": {
   "price": 982.73,
   "date": "2026-10-28",
   "changePct": -0.9,
   "close": 982.73,
   "closeDate": "2026-10-28"
  },
  "NVDA": {
   "price": 215.38,
   "date": "2026-10-28",
   "changePct": -1.2,
   "close": 215.38,
   "closeDate": "2026-10-28"
  },
  "META": {
   "price": 612.49,
   "date": "2026-10-28",
   "changePct": -1.2,
   "close": 612.49,
   "closeDate": "2026-10-28"
  },
  "AVGO": {
   "price": 351.81,
   "date": "2026-10-28",
   "changePct": 2.8,
   "close": 351.81,
   "closeDate": "2026-10-28"
  },
  "AMZN": {
   "price": 254.6,
   "date": "2026-10-28",
   "changePct": 0.6,
   "close": 254.6,
   "closeDate": "2026-10-28"
  },
  "TSM": {
   "price": 439.51,
   "date": "2026-10-28",
   "changePct": 0.6,
   "close": 439.51,
   "closeDate": "2026-10-28"
  },
  "UBER": {
   "price": 65.27,
   "date": "2026-10-28",
   "changePct": -0.8,
   "close": 65.27,
   "closeDate": "2026-10-28"
  },
  "GM": {
   "price": 82.48,
   "date": "2026-10-28",
   "changePct": 2.4,
   "close": 82.48,
   "closeDate": "2026-10-28"
  },
  "VZ": {
   "price": 43.18,
   "date": "2026-10-28",
   "changePct": -1.7,
   "close": 43.18,
   "closeDate": "2026-10-28"
  },
  "C": {
   "price": 124.11,
   "date": "2026-10-28",
   "changePct": 1.2,
   "close": 124.11,
   "closeDate": "2026-10-28"
  },
  "DUK": {
   "price": 123.57,
   "date": "2026-10-28",
   "changePct": -1,
   "close": 123.57,
   "closeDate": "2026-10-28"
  },
  "KO": {
   "price": 91.73,
   "date": "2026-10-28",
   "changePct": 0.6,
   "close": 91.73,
   "closeDate": "2026-10-28"
  },
  "JNJ": {
   "price": 271.04,
   "date": "2026-10-28",
   "changePct": 0.9,
   "close": 271.04,
   "closeDate": "2026-10-28"
  },
  "NXT": {
   "price": 82.08,
   "date": "2026-10-28",
   "changePct": 3.3,
   "close": 82.08,
   "closeDate": "2026-10-28"
  },
  "LLY": {
   "price": 1288.3,
   "date": "2026-10-28",
   "changePct": 0.5,
   "close": 1288.3,
   "closeDate": "2026-10-28"
  },
  "CI": {
   "price": 295,
   "date": "2026-10-28",
   "changePct": -1.1,
   "close": 295,
   "closeDate": "2026-10-28"
  },
  "NOW": {
   "price": 150.13,
   "date": "2026-10-28",
   "changePct": -3,
   "close": 150.13,
   "closeDate": "2026-10-28"
  },
  "TSLA": {
   "price": 404.22,
   "date": "2026-10-28",
   "changePct": -0.8,
   "close": 404.22,
   "closeDate": "2026-10-28"
  },
  "MDLZ": {
   "price": 61.87,
   "date": "2026-10-28",
   "changePct": -0.8,
   "close": 61.87,
   "closeDate": "2026-10-28"
  },
  "AAPL": {
   "price": 343.83,
   "date": "2026-10-28",
   "changePct": -0.9,
   "close": 343.83,
   "closeDate": "2026-10-28"
  },
  "MU": {
   "price": 983.23,
   "date": "2026-10-28",
   "changePct": 5.9,
   "close": 983.23,
   "closeDate": "2026-10-28"
  },
  "MDT": {
   "price": 94.78,
   "date": "2026-10-28",
   "changePct": 0.9,
   "close": 94.78,
   "closeDate": "2026-10-28"
  },
  "IREN": {
   "price": 28.84,
   "date": "2026-10-28",
   "changePct": 5.1,
   "close": 28.84,
   "closeDate": "2026-10-28"
  },
  "UNH": {
   "price": 407.1,
   "date": "2026-10-28",
   "changePct": -0.8,
   "close": 407.1,
   "closeDate": "2026-10-28"
  },
  "GILD": {
   "price": 159.2,
   "date": "2026-10-28",
   "changePct": 0.1,
   "close": 159.2,
   "closeDate": "2026-10-28"
  },
  "BRK.B": {
   "price": 540.34,
   "date": "2026-10-28",
   "changePct": -0.5,
   "close": 540.34,
   "closeDate": "2026-10-28"
  },
  "TMO": {
   "price": 704.15,
   "date": "2026-10-28",
   "changePct": 1.6,
   "close": 704.15,
   "closeDate": "2026-10-28"
  },
  "ECL": {
   "price": 292.41,
   "date": "2026-10-28",
   "changePct": 0.4,
   "close": 292.41,
   "closeDate": "2026-10-28"
  },
  "NVT": {
   "price": 140.12,
   "date": "2026-10-28",
   "changePct": 4.2,
   "close": 140.12,
   "closeDate": "2026-10-28"
  },
  "FSS": {
   "price": 113.45,
   "date": "2026-10-28",
   "changePct": -2,
   "close": 113.45,
   "closeDate": "2026-10-28"
  },
  "AAON": {
   "price": 75.61,
   "date": "2026-10-28",
   "changePct": -0.3,
   "close": 75.61,
   "closeDate": "2026-10-28"
  },
  "NVMI": {
   "price": 334.72,
   "date": "2026-10-28",
   "changePct": 2.2,
   "close": 334.72,
   "closeDate": "2026-10-28"
  },
  "POWL": {
   "price": 168.01,
   "date": "2026-10-28",
   "changePct": 4.1,
   "close": 168.01,
   "closeDate": "2026-10-28"
  },
  "MSI": {
   "price": 483.39,
   "date": "2026-10-28",
   "changePct": 0,
   "close": 483.39,
   "closeDate": "2026-10-28"
  },
  "DVN": {
   "price": 51.27,
   "date": "2026-10-28",
   "changePct": 0.1,
   "close": 51.27,
   "closeDate": "2026-10-28"
  },
  "GS": {
   "price": 925.17,
   "date": "2026-10-28",
   "changePct": 1.5,
   "close": 925.17,
   "closeDate": "2026-10-28"
  },
  "AMP": {
   "price": 489.8,
   "date": "2026-10-28",
   "changePct": -0.6,
   "close": 489.8,
   "closeDate": "2026-10-28"
  },
  "PNC": {
   "price": 228.25,
   "date": "2026-10-28",
   "changePct": 0.3,
   "close": 228.25,
   "closeDate": "2026-10-28"
  },
  "MTB": {
   "price": 220.2,
   "date": "2026-10-28",
   "changePct": -0.5,
   "close": 220.2,
   "closeDate": "2026-10-28"
  },
  "SO": {
   "price": 91.52,
   "date": "2026-10-28",
   "changePct": -1.2,
   "close": 91.52,
   "closeDate": "2026-10-28"
  },
  "WEC": {
   "price": 110.5,
   "date": "2026-10-28",
   "changePct": -0.8,
   "close": 110.5,
   "closeDate": "2026-10-28"
  },
  "MSCI": {
   "price": 604.94,
   "date": "2026-10-28",
   "changePct": 0.5,
   "close": 604.94,
   "closeDate": "2026-10-28"
  },
  "RSG": {
   "price": 233.4,
   "date": "2026-10-28",
   "changePct": -1,
   "close": 233.4,
   "closeDate": "2026-10-28"
  },
  "CTAS": {
   "price": 212.81,
   "date": "2026-10-28",
   "changePct": -0.9,
   "close": 212.81,
   "closeDate": "2026-10-28"
  },
  "TJX": {
   "price": 138.39,
   "date": "2026-10-28",
   "changePct": -1.3,
   "close": 138.39,
   "closeDate": "2026-10-28"
  },
  "ANET": {
   "price": 186.72,
   "date": "2026-10-28",
   "changePct": -0.1,
   "close": 186.72,
   "closeDate": "2026-10-28"
  },
  "GD": {
   "price": 354.35,
   "date": "2026-10-28",
   "changePct": -0.2,
   "close": 354.35,
   "closeDate": "2026-10-28"
  },
  "APPF": {
   "price": 205,
   "date": "2026-10-28",
   "changePct": 1.8,
   "close": 205,
   "closeDate": "2026-10-28"
  },
  "CB": {
   "price": 355.5,
   "date": "2026-10-28",
   "changePct": -0.2,
   "close": 355.5,
   "closeDate": "2026-10-28"
  },
  "ADP": {
   "price": 285.37,
   "date": "2026-10-28",
   "changePct": -2.6,
   "close": 285.37,
   "closeDate": "2026-10-28"
  },
  "LMT": {
   "price": 629.75,
   "date": "2026-10-28",
   "changePct": 1.1,
   "close": 629.75,
   "closeDate": "2026-10-28"
  },
  "ORLY": {
   "price": 90.44,
   "date": "2026-10-28",
   "changePct": 0.7,
   "close": 90.44,
   "closeDate": "2026-10-28"
  },
  "YUM": {
   "price": 150.16,
   "date": "2026-10-28",
   "changePct": 0.4,
   "close": 150.16,
   "closeDate": "2026-10-28"
  },
  "FIVE": {
   "price": 234.47,
   "date": "2026-10-28",
   "changePct": 1.4,
   "close": 234.47,
   "closeDate": "2026-10-28"
  },
  "STRL": {
   "price": 388.87,
   "date": "2026-10-28",
   "changePct": 5.8,
   "close": 388.87,
   "closeDate": "2026-10-28"
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
   "price": 7743.98,
   "date": "2026-10-28",
   "changePct": 0.3,
   "close": 7743.98,
   "closeDate": "2026-10-28"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 217.43,
   "date": "2026-10-28",
   "changePct": 0,
   "close": 217.43,
   "closeDate": "2026-10-28"
  }
 }
};
