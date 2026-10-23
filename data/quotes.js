// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-23",
 "quotes": {
  "103590": {
   "price": 57700,
   "date": "2026-10-23",
   "changePct": -3.2,
   "close": 57700,
   "closeDate": "2026-10-23"
  },
  "105560": {
   "price": 153000,
   "date": "2026-10-23",
   "changePct": -3.3,
   "close": 153000,
   "closeDate": "2026-10-23"
  },
  "119850": {
   "price": 40550,
   "date": "2026-10-23",
   "changePct": -4.4,
   "close": 40550,
   "closeDate": "2026-10-23"
  },
  "138040": {
   "price": 127800,
   "date": "2026-10-23",
   "changePct": -2.1,
   "close": 127800,
   "closeDate": "2026-10-23"
  },
  "139130": {
   "price": 15750,
   "date": "2026-10-23",
   "changePct": -4,
   "close": 15750,
   "closeDate": "2026-10-23"
  },
  "175330": {
   "price": 25150,
   "date": "2026-10-23",
   "changePct": -3.6,
   "close": 25150,
   "closeDate": "2026-10-23"
  },
  "207940": {
   "price": 1466000,
   "date": "2026-10-23",
   "changePct": 7.7,
   "close": 1466000,
   "closeDate": "2026-10-23"
  },
  "214450": {
   "price": 239500,
   "date": "2026-10-23",
   "changePct": -6.1,
   "close": 239500,
   "closeDate": "2026-10-23"
  },
  "241560": {
   "price": 49400,
   "date": "2026-10-23",
   "changePct": -1.2,
   "close": 49400,
   "closeDate": "2026-10-23"
  },
  "267250": {
   "price": 137800,
   "date": "2026-10-23",
   "changePct": -3.3,
   "close": 137800,
   "closeDate": "2026-10-23"
  },
  "267260": {
   "price": 470000,
   "date": "2026-10-23",
   "changePct": -4.1,
   "close": 470000,
   "closeDate": "2026-10-23"
  },
  "267270": {
   "price": 89300,
   "date": "2026-10-23",
   "changePct": -5,
   "close": 89300,
   "closeDate": "2026-10-23"
  },
  "278470": {
   "price": 284500,
   "date": "2026-10-23",
   "changePct": -2.2,
   "close": 284500,
   "closeDate": "2026-10-23"
  },
  "298040": {
   "price": 1877000,
   "date": "2026-10-23",
   "changePct": -2.4,
   "close": 1877000,
   "closeDate": "2026-10-23"
  },
  "316140": {
   "price": 30100,
   "date": "2026-10-23",
   "changePct": -3.7,
   "close": 30100,
   "closeDate": "2026-10-23"
  },
  "323410": {
   "price": 19990,
   "date": "2026-10-23",
   "changePct": -0.3,
   "close": 19990,
   "closeDate": "2026-10-23"
  },
  "329180": {
   "price": 305000,
   "date": "2026-10-23",
   "changePct": -1.3,
   "close": 305000,
   "closeDate": "2026-10-23"
  },
  "361610": {
   "price": 15810,
   "date": "2026-10-23",
   "changePct": -2.9,
   "close": 15810,
   "closeDate": "2026-10-23"
  },
  "403870": {
   "price": 47700,
   "date": "2026-10-23",
   "changePct": -1.4,
   "close": 47700,
   "closeDate": "2026-10-23"
  },
  "005930": {
   "price": 215500,
   "date": "2026-10-23",
   "changePct": 0.5,
   "close": 215500,
   "closeDate": "2026-10-23"
  },
  "055550": {
   "price": 88100,
   "date": "2026-10-23",
   "changePct": -2.4,
   "close": 88100,
   "closeDate": "2026-10-23"
  },
  "000810": {
   "price": 602000,
   "date": "2026-10-23",
   "changePct": -1,
   "close": 602000,
   "closeDate": "2026-10-23"
  },
  "028260": {
   "price": 288000,
   "date": "2026-10-23",
   "changePct": -0.2,
   "close": 288000,
   "closeDate": "2026-10-23"
  },
  "086790": {
   "price": 116300,
   "date": "2026-10-23",
   "changePct": -3,
   "close": 116300,
   "closeDate": "2026-10-23"
  },
  "012450": {
   "price": 792000,
   "date": "2026-10-23",
   "changePct": -2.3,
   "close": 792000,
   "closeDate": "2026-10-23"
  },
  "009540": {
   "price": 248000,
   "date": "2026-10-23",
   "changePct": -1.6,
   "close": 248000,
   "closeDate": "2026-10-23"
  },
  "068270": {
   "price": 194400,
   "date": "2026-10-23",
   "changePct": 0.1,
   "close": 194400,
   "closeDate": "2026-10-23"
  },
  "000270": {
   "price": 106900,
   "date": "2026-10-23",
   "changePct": -1.7,
   "close": 106900,
   "closeDate": "2026-10-23"
  },
  "032640": {
   "price": 14160,
   "date": "2026-10-23",
   "changePct": -1.9,
   "close": 14160,
   "closeDate": "2026-10-23"
  },
  "029780": {
   "price": 42150,
   "date": "2026-10-23",
   "changePct": 1,
   "close": 42150,
   "closeDate": "2026-10-23"
  },
  "058470": {
   "price": 61600,
   "date": "2026-10-23",
   "changePct": -4,
   "close": 61600,
   "closeDate": "2026-10-23"
  },
  "082920": {
   "price": 23250,
   "date": "2026-10-23",
   "changePct": -0.9,
   "close": 23250,
   "closeDate": "2026-10-23"
  },
  "064760": {
   "price": 213500,
   "date": "2026-10-23",
   "changePct": -1.6,
   "close": 213500,
   "closeDate": "2026-10-23"
  },
  "035900": {
   "price": 36850,
   "date": "2026-10-23",
   "changePct": -3.3,
   "close": 36850,
   "closeDate": "2026-10-23"
  },
  "021240": {
   "price": 106000,
   "date": "2026-10-23",
   "changePct": -0.1,
   "close": 106000,
   "closeDate": "2026-10-23"
  },
  "036570": {
   "price": 205000,
   "date": "2026-10-23",
   "changePct": -3.1,
   "close": 205000,
   "closeDate": "2026-10-23"
  },
  "035720": {
   "price": 29950,
   "date": "2026-10-23",
   "changePct": -1.3,
   "close": 29950,
   "closeDate": "2026-10-23"
  },
  "001040": {
   "price": 118200,
   "date": "2026-10-23",
   "changePct": -0.4,
   "close": 118200,
   "closeDate": "2026-10-23"
  },
  "012750": {
   "price": 96000,
   "date": "2026-10-23",
   "changePct": -0.7,
   "close": 96000,
   "closeDate": "2026-10-23"
  },
  "000660": {
   "price": 1277000,
   "date": "2026-10-23",
   "changePct": 4.4,
   "close": 1277000,
   "closeDate": "2026-10-23"
  },
  "033780": {
   "price": 189400,
   "date": "2026-10-23",
   "changePct": -2.3,
   "close": 189400,
   "closeDate": "2026-10-23"
  },
  "001120": {
   "price": 42800,
   "date": "2026-10-23",
   "changePct": -1.2,
   "close": 42800,
   "closeDate": "2026-10-23"
  },
  "004370": {
   "price": 402500,
   "date": "2026-10-23",
   "changePct": 0.8,
   "close": 402500,
   "closeDate": "2026-10-23"
  },
  "062040": {
   "price": 165200,
   "date": "2026-10-23",
   "changePct": -5,
   "close": 165200,
   "closeDate": "2026-10-23"
  },
  "041830": {
   "price": 47050,
   "date": "2026-10-23",
   "changePct": -2.5,
   "close": 47050,
   "closeDate": "2026-10-23"
  },
  "005830": {
   "price": 184200,
   "date": "2026-10-23",
   "changePct": -1.5,
   "close": 184200,
   "closeDate": "2026-10-23"
  },
  "066570": {
   "price": 157100,
   "date": "2026-10-23",
   "changePct": -1.8,
   "close": 157100,
   "closeDate": "2026-10-23"
  },
  "086280": {
   "price": 175900,
   "date": "2026-10-23",
   "changePct": -1.2,
   "close": 175900,
   "closeDate": "2026-10-23"
  },
  "018260": {
   "price": 213500,
   "date": "2026-10-23",
   "changePct": 3.1,
   "close": 213500,
   "closeDate": "2026-10-23"
  },
  "005850": {
   "price": 49400,
   "date": "2026-10-23",
   "changePct": -1.4,
   "close": 49400,
   "closeDate": "2026-10-23"
  },
  "095340": {
   "price": 148300,
   "date": "2026-10-23",
   "changePct": -3.6,
   "close": 148300,
   "closeDate": "2026-10-23"
  },
  "005490": {
   "price": 275500,
   "date": "2026-10-23",
   "changePct": -3.7,
   "close": 275500,
   "closeDate": "2026-10-23"
  },
  "035420": {
   "price": 173600,
   "date": "2026-10-23",
   "changePct": -1.6,
   "close": 173600,
   "closeDate": "2026-10-23"
  },
  "010120": {
   "price": 156900,
   "date": "2026-10-23",
   "changePct": -2.8,
   "close": 156900,
   "closeDate": "2026-10-23"
  },
  "030200": {
   "price": 46800,
   "date": "2026-10-23",
   "changePct": -1.6,
   "close": 46800,
   "closeDate": "2026-10-23"
  },
  "012330": {
   "price": 328500,
   "date": "2026-10-23",
   "changePct": -2.5,
   "close": 328500,
   "closeDate": "2026-10-23"
  },
  "MSFT": {
   "price": 524.51,
   "date": "2026-10-23",
   "changePct": 0.7,
   "close": 524.51,
   "closeDate": "2026-10-23"
  },
  "V": {
   "price": 407.92,
   "date": "2026-10-23",
   "changePct": -1.5,
   "close": 407.92,
   "closeDate": "2026-10-23"
  },
  "MA": {
   "price": 623.6,
   "date": "2026-10-23",
   "changePct": -1.5,
   "close": 623.6,
   "closeDate": "2026-10-23"
  },
  "GOOGL": {
   "price": 320.21,
   "date": "2026-10-23",
   "changePct": -1.2,
   "close": 320.21,
   "closeDate": "2026-10-23"
  },
  "COST": {
   "price": 1003.32,
   "date": "2026-10-23",
   "changePct": -1.5,
   "close": 1003.32,
   "closeDate": "2026-10-23"
  },
  "NVDA": {
   "price": 210.96,
   "date": "2026-10-23",
   "changePct": -0.6,
   "close": 210.96,
   "closeDate": "2026-10-23"
  },
  "META": {
   "price": 642.62,
   "date": "2026-10-23",
   "changePct": -1,
   "close": 642.62,
   "closeDate": "2026-10-23"
  },
  "AVGO": {
   "price": 321.68,
   "date": "2026-10-23",
   "changePct": -0.5,
   "close": 321.68,
   "closeDate": "2026-10-23"
  },
  "AMZN": {
   "price": 248,
   "date": "2026-10-23",
   "changePct": -1,
   "close": 248,
   "closeDate": "2026-10-23"
  },
  "TSM": {
   "price": 418.51,
   "date": "2026-10-23",
   "changePct": 1.5,
   "close": 418.51,
   "closeDate": "2026-10-23"
  },
  "UBER": {
   "price": 66.7,
   "date": "2026-10-23",
   "changePct": -3.4,
   "close": 66.7,
   "closeDate": "2026-10-23"
  },
  "GM": {
   "price": 75.92,
   "date": "2026-10-23",
   "changePct": -1.7,
   "close": 75.92,
   "closeDate": "2026-10-23"
  },
  "VZ": {
   "price": 44.66,
   "date": "2026-10-23",
   "changePct": -1.2,
   "close": 44.66,
   "closeDate": "2026-10-23"
  },
  "C": {
   "price": 120.62,
   "date": "2026-10-23",
   "changePct": -1.5,
   "close": 120.62,
   "closeDate": "2026-10-23"
  },
  "DUK": {
   "price": 124.98,
   "date": "2026-10-23",
   "changePct": -0.3,
   "close": 124.98,
   "closeDate": "2026-10-23"
  },
  "KO": {
   "price": 92.71,
   "date": "2026-10-23",
   "changePct": -2.8,
   "close": 92.71,
   "closeDate": "2026-10-23"
  },
  "JNJ": {
   "price": 263.81,
   "date": "2026-10-23",
   "changePct": -1.4,
   "close": 263.81,
   "closeDate": "2026-10-23"
  },
  "NXT": {
   "price": 78.89,
   "date": "2026-10-23",
   "changePct": 1.6,
   "close": 78.89,
   "closeDate": "2026-10-23"
  },
  "LLY": {
   "price": 1273.46,
   "date": "2026-10-23",
   "changePct": -2.5,
   "close": 1273.46,
   "closeDate": "2026-10-23"
  },
  "CI": {
   "price": 306.95,
   "date": "2026-10-23",
   "changePct": -2.8,
   "close": 306.95,
   "closeDate": "2026-10-23"
  },
  "NOW": {
   "price": 158.96,
   "date": "2026-10-23",
   "changePct": 1.2,
   "close": 158.96,
   "closeDate": "2026-10-23"
  },
  "TSLA": {
   "price": 372.22,
   "date": "2026-10-23",
   "changePct": -0.6,
   "close": 372.22,
   "closeDate": "2026-10-23"
  },
  "MDLZ": {
   "price": 63.8,
   "date": "2026-10-23",
   "changePct": -2.1,
   "close": 63.8,
   "closeDate": "2026-10-23"
  },
  "AAPL": {
   "price": 347.725,
   "date": "2026-10-23",
   "changePct": -0.1,
   "close": 347.725,
   "closeDate": "2026-10-23"
  },
  "MU": {
   "price": 877.55,
   "date": "2026-10-23",
   "changePct": 2.5,
   "close": 877.55,
   "closeDate": "2026-10-23"
  },
  "MDT": {
   "price": 95.41,
   "date": "2026-10-23",
   "changePct": -1.2,
   "close": 95.41,
   "closeDate": "2026-10-23"
  },
  "IREN": {
   "price": 24.905,
   "date": "2026-10-23",
   "changePct": -2.4,
   "close": 24.905,
   "closeDate": "2026-10-23"
  },
  "UNH": {
   "price": 418.09,
   "date": "2026-10-23",
   "changePct": -1.6,
   "close": 418.09,
   "closeDate": "2026-10-23"
  },
  "GILD": {
   "price": 156.04,
   "date": "2026-10-23",
   "changePct": -0.7,
   "close": 156.04,
   "closeDate": "2026-10-23"
  },
  "BRK.B": {
   "price": 542.19,
   "date": "2026-10-23",
   "changePct": -0.9,
   "close": 542.19,
   "closeDate": "2026-10-23"
  },
  "TMO": {
   "price": 673.82,
   "date": "2026-10-23",
   "changePct": -0.4,
   "close": 673.82,
   "closeDate": "2026-10-23"
  },
  "ECL": {
   "price": 288.53,
   "date": "2026-10-23",
   "changePct": -1.3,
   "close": 288.53,
   "closeDate": "2026-10-23"
  },
  "NVT": {
   "price": 125.4,
   "date": "2026-10-23",
   "changePct": -1.8,
   "close": 125.4,
   "closeDate": "2026-10-23"
  },
  "FSS": {
   "price": 113.23,
   "date": "2026-10-23",
   "changePct": -2,
   "close": 113.23,
   "closeDate": "2026-10-23"
  },
  "MKSI": {
   "price": 196.55,
   "date": "2026-10-23",
   "changePct": 0.2,
   "close": 196.55,
   "closeDate": "2026-10-23"
  },
  "AAON": {
   "price": 68.85,
   "date": "2026-10-23",
   "changePct": -1.1,
   "close": 68.85,
   "closeDate": "2026-10-23"
  },
  "NVMI": {
   "price": 311.35,
   "date": "2026-10-23",
   "changePct": 0.4,
   "close": 311.35,
   "closeDate": "2026-10-23"
  },
  "POWL": {
   "price": 150.95,
   "date": "2026-10-23",
   "changePct": 0.2,
   "close": 150.95,
   "closeDate": "2026-10-23"
  },
  "MSI": {
   "price": 481.83,
   "date": "2026-10-23",
   "changePct": 0.8,
   "close": 481.83,
   "closeDate": "2026-10-23"
  },
  "DVN": {
   "price": 51.39,
   "date": "2026-10-23",
   "changePct": 4.5,
   "close": 51.39,
   "closeDate": "2026-10-23"
  },
  "RBC": {
   "price": 471.98,
   "date": "2026-10-23",
   "changePct": -1.3,
   "close": 471.98,
   "closeDate": "2026-10-23"
  },
  "GS": {
   "price": 875.68,
   "date": "2026-10-23",
   "changePct": -1.8,
   "close": 875.68,
   "closeDate": "2026-10-23"
  },
  "AMP": {
   "price": 492.19,
   "date": "2026-10-23",
   "changePct": -0.9,
   "close": 492.19,
   "closeDate": "2026-10-23"
  },
  "PNC": {
   "price": 224.46,
   "date": "2026-10-23",
   "changePct": -0.5,
   "close": 224.46,
   "closeDate": "2026-10-23"
  },
  "MTB": {
   "price": 221.66,
   "date": "2026-10-23",
   "changePct": -0.5,
   "close": 221.66,
   "closeDate": "2026-10-23"
  },
  "SO": {
   "price": 92.89,
   "date": "2026-10-23",
   "changePct": -1,
   "close": 92.89,
   "closeDate": "2026-10-23"
  },
  "WEC": {
   "price": 111.09,
   "date": "2026-10-23",
   "changePct": -0.9,
   "close": 111.09,
   "closeDate": "2026-10-23"
  },
  "MSCI": {
   "price": 615.62,
   "date": "2026-10-23",
   "changePct": -0.7,
   "close": 615.62,
   "closeDate": "2026-10-23"
  },
  "RSG": {
   "price": 240.45,
   "date": "2026-10-23",
   "changePct": -0.6,
   "close": 240.45,
   "closeDate": "2026-10-23"
  },
  "CTAS": {
   "price": 224.1,
   "date": "2026-10-23",
   "changePct": 0,
   "close": 224.1,
   "closeDate": "2026-10-23"
  },
  "TJX": {
   "price": 145.06,
   "date": "2026-10-23",
   "changePct": -1.6,
   "close": 145.06,
   "closeDate": "2026-10-23"
  },
  "ANET": {
   "price": 172.37,
   "date": "2026-10-23",
   "changePct": 0.8,
   "close": 172.37,
   "closeDate": "2026-10-23"
  },
  "GD": {
   "price": 349.36,
   "date": "2026-10-23",
   "changePct": -0.4,
   "close": 349.36,
   "closeDate": "2026-10-23"
  },
  "APPF": {
   "price": 210.62,
   "date": "2026-10-23",
   "changePct": -3.1,
   "close": 210.62,
   "closeDate": "2026-10-23"
  },
  "CB": {
   "price": 355.11,
   "date": "2026-10-23",
   "changePct": -2.4,
   "close": 355.11,
   "closeDate": "2026-10-23"
  },
  "ADP": {
   "price": 304.16,
   "date": "2026-10-23",
   "changePct": -1.2,
   "close": 304.16,
   "closeDate": "2026-10-23"
  },
  "LMT": {
   "price": 604.18,
   "date": "2026-10-23",
   "changePct": 2.4,
   "close": 604.18,
   "closeDate": "2026-10-23"
  },
  "ORLY": {
   "price": 89.92,
   "date": "2026-10-23",
   "changePct": -2.3,
   "close": 89.92,
   "closeDate": "2026-10-23"
  },
  "YUM": {
   "price": 149.7,
   "date": "2026-10-23",
   "changePct": -3.1,
   "close": 149.7,
   "closeDate": "2026-10-23"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5550.3,
   "date": "2026-10-23",
   "changePct": 0.3,
   "close": 5550.3,
   "closeDate": "2026-10-23"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7623.68,
   "date": "2026-10-23",
   "changePct": -0.5,
   "close": 7623.68,
   "closeDate": "2026-10-23"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 216.54,
   "date": "2026-10-23",
   "changePct": -0.8,
   "close": 216.54,
   "closeDate": "2026-10-23"
  }
 }
};
