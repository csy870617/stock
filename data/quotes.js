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
  "047050": {
   "price": 51500,
   "date": "2026-10-23",
   "changePct": -2.8,
   "close": 51500,
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
   "price": 521.08,
   "date": "2026-10-22",
   "changePct": -2.2,
   "close": 521.08,
   "closeDate": "2026-10-22"
  },
  "V": {
   "price": 414.34,
   "date": "2026-10-22",
   "changePct": 1.6,
   "close": 414.34,
   "closeDate": "2026-10-22"
  },
  "MA": {
   "price": 633.21,
   "date": "2026-10-22",
   "changePct": 1.7,
   "close": 633.21,
   "closeDate": "2026-10-22"
  },
  "GOOGL": {
   "price": 324.22,
   "date": "2026-10-22",
   "changePct": -3.1,
   "close": 324.22,
   "closeDate": "2026-10-22"
  },
  "COST": {
   "price": 1018.21,
   "date": "2026-10-22",
   "changePct": 2,
   "close": 1018.21,
   "closeDate": "2026-10-22"
  },
  "NVDA": {
   "price": 212.21,
   "date": "2026-10-22",
   "changePct": -4.4,
   "close": 212.21,
   "closeDate": "2026-10-22"
  },
  "META": {
   "price": 648.85,
   "date": "2026-10-22",
   "changePct": -7,
   "close": 648.85,
   "closeDate": "2026-10-22"
  },
  "AVGO": {
   "price": 323.24,
   "date": "2026-10-22",
   "changePct": -4.3,
   "close": 323.24,
   "closeDate": "2026-10-22"
  },
  "AMZN": {
   "price": 250.38,
   "date": "2026-10-22",
   "changePct": -4.6,
   "close": 250.38,
   "closeDate": "2026-10-22"
  },
  "TSM": {
   "price": 412.35,
   "date": "2026-10-22",
   "changePct": -4.5,
   "close": 412.35,
   "closeDate": "2026-10-22"
  },
  "UBER": {
   "price": 69.07,
   "date": "2026-10-22",
   "changePct": 2.1,
   "close": 69.07,
   "closeDate": "2026-10-22"
  },
  "GM": {
   "price": 77.21,
   "date": "2026-10-22",
   "changePct": 1.4,
   "close": 77.21,
   "closeDate": "2026-10-22"
  },
  "VZ": {
   "price": 45.2,
   "date": "2026-10-22",
   "changePct": 3.8,
   "close": 45.2,
   "closeDate": "2026-10-22"
  },
  "C": {
   "price": 122.51,
   "date": "2026-10-22",
   "changePct": -1.1,
   "close": 122.51,
   "closeDate": "2026-10-22"
  },
  "DUK": {
   "price": 125.4,
   "date": "2026-10-22",
   "changePct": 3.9,
   "close": 125.4,
   "closeDate": "2026-10-22"
  },
  "KO": {
   "price": 95.34,
   "date": "2026-10-22",
   "changePct": 2.9,
   "close": 95.34,
   "closeDate": "2026-10-22"
  },
  "JNJ": {
   "price": 267.61,
   "date": "2026-10-22",
   "changePct": 3.8,
   "close": 267.61,
   "closeDate": "2026-10-22"
  },
  "NXT": {
   "price": 77.63,
   "date": "2026-10-22",
   "changePct": -5.1,
   "close": 77.63,
   "closeDate": "2026-10-22"
  },
  "LLY": {
   "price": 1306.69,
   "date": "2026-10-22",
   "changePct": 2.8,
   "close": 1306.69,
   "closeDate": "2026-10-22"
  },
  "CI": {
   "price": 315.88,
   "date": "2026-10-22",
   "changePct": 3.8,
   "close": 315.88,
   "closeDate": "2026-10-22"
  },
  "NOW": {
   "price": 157,
   "date": "2026-10-22",
   "changePct": 2.5,
   "close": 157,
   "closeDate": "2026-10-22"
  },
  "TSLA": {
   "price": 374.58,
   "date": "2026-10-22",
   "changePct": -3.1,
   "close": 374.58,
   "closeDate": "2026-10-22"
  },
  "PG": {
   "price": 165.59,
   "date": "2026-10-22",
   "changePct": 5.6,
   "close": 165.59,
   "closeDate": "2026-10-22"
  },
  "MDLZ": {
   "price": 65.19,
   "date": "2026-10-22",
   "changePct": 3.9,
   "close": 65.19,
   "closeDate": "2026-10-22"
  },
  "AAPL": {
   "price": 348.22,
   "date": "2026-10-22",
   "changePct": 1.2,
   "close": 348.22,
   "closeDate": "2026-10-22"
  },
  "MU": {
   "price": 856.49,
   "date": "2026-10-22",
   "changePct": -6.3,
   "close": 856.49,
   "closeDate": "2026-10-22"
  },
  "MDT": {
   "price": 96.59,
   "date": "2026-10-22",
   "changePct": 3.8,
   "close": 96.59,
   "closeDate": "2026-10-22"
  },
  "IREN": {
   "price": 25.51,
   "date": "2026-10-22",
   "changePct": -8.4,
   "close": 25.51,
   "closeDate": "2026-10-22"
  },
  "UNH": {
   "price": 424.98,
   "date": "2026-10-22",
   "changePct": 1.9,
   "close": 424.98,
   "closeDate": "2026-10-22"
  },
  "GILD": {
   "price": 157.19,
   "date": "2026-10-22",
   "changePct": 2.4,
   "close": 157.19,
   "closeDate": "2026-10-22"
  },
  "BRK.B": {
   "price": 546.97,
   "date": "2026-10-22",
   "changePct": 1.5,
   "close": 546.97,
   "closeDate": "2026-10-22"
  },
  "TMO": {
   "price": 676.54,
   "date": "2026-10-22",
   "changePct": -2.5,
   "close": 676.54,
   "closeDate": "2026-10-22"
  },
  "ECL": {
   "price": 292.3,
   "date": "2026-10-22",
   "changePct": 1.5,
   "close": 292.3,
   "closeDate": "2026-10-22"
  },
  "NVT": {
   "price": 127.67,
   "date": "2026-10-22",
   "changePct": -12.6,
   "close": 127.67,
   "closeDate": "2026-10-22"
  },
  "FSS": {
   "price": 115.54,
   "date": "2026-10-22",
   "changePct": -1,
   "close": 115.54,
   "closeDate": "2026-10-22"
  },
  "MKSI": {
   "price": 196.11,
   "date": "2026-10-22",
   "changePct": -9.3,
   "close": 196.11,
   "closeDate": "2026-10-22"
  },
  "AAON": {
   "price": 69.62,
   "date": "2026-10-22",
   "changePct": -7.5,
   "close": 69.62,
   "closeDate": "2026-10-22"
  },
  "NVMI": {
   "price": 310.13,
   "date": "2026-10-22",
   "changePct": -6.4,
   "close": 310.13,
   "closeDate": "2026-10-22"
  },
  "POWL": {
   "price": 150.71,
   "date": "2026-10-22",
   "changePct": -11.5,
   "close": 150.71,
   "closeDate": "2026-10-22"
  },
  "TXN": {
   "price": 279.5,
   "date": "2026-10-22",
   "changePct": -1.8,
   "close": 279.5,
   "closeDate": "2026-10-22"
  },
  "MSI": {
   "price": 477.81,
   "date": "2026-10-22",
   "changePct": 2.2,
   "close": 477.81,
   "closeDate": "2026-10-22"
  },
  "DVN": {
   "price": 49.18,
   "date": "2026-10-22",
   "changePct": -1.4,
   "close": 49.18,
   "closeDate": "2026-10-22"
  },
  "RBC": {
   "price": 478.03,
   "date": "2026-10-22",
   "changePct": -5.2,
   "close": 478.03,
   "closeDate": "2026-10-22"
  },
  "GS": {
   "price": 891.3,
   "date": "2026-10-22",
   "changePct": -1.5,
   "close": 891.3,
   "closeDate": "2026-10-22"
  },
  "AMP": {
   "price": 496.83,
   "date": "2026-10-22",
   "changePct": 1.3,
   "close": 496.83,
   "closeDate": "2026-10-22"
  },
  "PNC": {
   "price": 225.53,
   "date": "2026-10-22",
   "changePct": 1.2,
   "close": 225.53,
   "closeDate": "2026-10-22"
  },
  "MTB": {
   "price": 222.83,
   "date": "2026-10-22",
   "changePct": 1.5,
   "close": 222.83,
   "closeDate": "2026-10-22"
  },
  "SO": {
   "price": 93.82,
   "date": "2026-10-22",
   "changePct": 3.8,
   "close": 93.82,
   "closeDate": "2026-10-22"
  },
  "WEC": {
   "price": 112.15,
   "date": "2026-10-22",
   "changePct": 3.4,
   "close": 112.15,
   "closeDate": "2026-10-22"
  },
  "MSCI": {
   "price": 620.24,
   "date": "2026-10-22",
   "changePct": 2.6,
   "close": 620.24,
   "closeDate": "2026-10-22"
  },
  "RSG": {
   "price": 241.9,
   "date": "2026-10-22",
   "changePct": 5,
   "close": 241.9,
   "closeDate": "2026-10-22"
  },
  "CTAS": {
   "price": 224.04,
   "date": "2026-10-22",
   "changePct": 1.8,
   "close": 224.04,
   "closeDate": "2026-10-22"
  },
  "TJX": {
   "price": 147.38,
   "date": "2026-10-22",
   "changePct": 1.3,
   "close": 147.38,
   "closeDate": "2026-10-22"
  },
  "ANET": {
   "price": 171.07,
   "date": "2026-10-22",
   "changePct": -7.2,
   "close": 171.07,
   "closeDate": "2026-10-22"
  },
  "GD": {
   "price": 350.79,
   "date": "2026-10-22",
   "changePct": 1.8,
   "close": 350.79,
   "closeDate": "2026-10-22"
  },
  "APPF": {
   "price": 217.33,
   "date": "2026-10-22",
   "changePct": 0.1,
   "close": 217.33,
   "closeDate": "2026-10-22"
  },
  "CB": {
   "price": 363.95,
   "date": "2026-10-22",
   "changePct": 2.5,
   "close": 363.95,
   "closeDate": "2026-10-22"
  },
  "ADP": {
   "price": 307.94,
   "date": "2026-10-22",
   "changePct": 4.6,
   "close": 307.94,
   "closeDate": "2026-10-22"
  },
  "LMT": {
   "price": 589.91,
   "date": "2026-10-22",
   "changePct": 7,
   "close": 589.91,
   "closeDate": "2026-10-22"
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
   "price": 7663.43,
   "date": "2026-10-22",
   "changePct": -1.2,
   "close": 7663.43,
   "closeDate": "2026-10-22"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 218.22,
   "date": "2026-10-22",
   "changePct": 0.7,
   "close": 218.22,
   "closeDate": "2026-10-22"
  }
 }
};
