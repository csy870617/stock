// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-26",
 "quotes": {
  "103590": {
   "price": 54800,
   "date": "2026-10-26",
   "changePct": -5,
   "close": 54800,
   "closeDate": "2026-10-26"
  },
  "105560": {
   "price": 147200,
   "date": "2026-10-26",
   "changePct": -3.8,
   "close": 147200,
   "closeDate": "2026-10-26"
  },
  "119850": {
   "price": 36150,
   "date": "2026-10-26",
   "changePct": -10.9,
   "close": 36150,
   "closeDate": "2026-10-26"
  },
  "138040": {
   "price": 125200,
   "date": "2026-10-26",
   "changePct": -2,
   "close": 125200,
   "closeDate": "2026-10-26"
  },
  "139130": {
   "price": 15090,
   "date": "2026-10-26",
   "changePct": -4.2,
   "close": 15090,
   "closeDate": "2026-10-26"
  },
  "175330": {
   "price": 24150,
   "date": "2026-10-26",
   "changePct": -4,
   "close": 24150,
   "closeDate": "2026-10-26"
  },
  "207940": {
   "price": 1452000,
   "date": "2026-10-26",
   "changePct": -1,
   "close": 1452000,
   "closeDate": "2026-10-26"
  },
  "214450": {
   "price": 229500,
   "date": "2026-10-26",
   "changePct": -4.2,
   "close": 229500,
   "closeDate": "2026-10-26"
  },
  "241560": {
   "price": 48550,
   "date": "2026-10-26",
   "changePct": -1.7,
   "close": 48550,
   "closeDate": "2026-10-26"
  },
  "267250": {
   "price": 132200,
   "date": "2026-10-26",
   "changePct": -4.1,
   "close": 132200,
   "closeDate": "2026-10-26"
  },
  "267260": {
   "price": 447000,
   "date": "2026-10-26",
   "changePct": -4.9,
   "close": 447000,
   "closeDate": "2026-10-26"
  },
  "267270": {
   "price": 81000,
   "date": "2026-10-26",
   "changePct": -9.3,
   "close": 81000,
   "closeDate": "2026-10-26"
  },
  "278470": {
   "price": 282000,
   "date": "2026-10-26",
   "changePct": -0.9,
   "close": 282000,
   "closeDate": "2026-10-26"
  },
  "298040": {
   "price": 1853000,
   "date": "2026-10-26",
   "changePct": -1.3,
   "close": 1853000,
   "closeDate": "2026-10-26"
  },
  "316140": {
   "price": 29250,
   "date": "2026-10-26",
   "changePct": -2.8,
   "close": 29250,
   "closeDate": "2026-10-26"
  },
  "323410": {
   "price": 19620,
   "date": "2026-10-26",
   "changePct": -1.9,
   "close": 19620,
   "closeDate": "2026-10-26"
  },
  "329180": {
   "price": 289500,
   "date": "2026-10-26",
   "changePct": -5.1,
   "close": 289500,
   "closeDate": "2026-10-26"
  },
  "361610": {
   "price": 15710,
   "date": "2026-10-26",
   "changePct": -0.6,
   "close": 15710,
   "closeDate": "2026-10-26"
  },
  "403870": {
   "price": 44900,
   "date": "2026-10-26",
   "changePct": -5.9,
   "close": 44900,
   "closeDate": "2026-10-26"
  },
  "005930": {
   "price": 213000,
   "date": "2026-10-26",
   "changePct": -1.2,
   "close": 213000,
   "closeDate": "2026-10-26"
  },
  "055550": {
   "price": 85500,
   "date": "2026-10-26",
   "changePct": -3,
   "close": 85500,
   "closeDate": "2026-10-26"
  },
  "000810": {
   "price": 595000,
   "date": "2026-10-26",
   "changePct": -1.2,
   "close": 595000,
   "closeDate": "2026-10-26"
  },
  "028260": {
   "price": 292000,
   "date": "2026-10-26",
   "changePct": 1.4,
   "close": 292000,
   "closeDate": "2026-10-26"
  },
  "086790": {
   "price": 112400,
   "date": "2026-10-26",
   "changePct": -3.4,
   "close": 112400,
   "closeDate": "2026-10-26"
  },
  "012450": {
   "price": 760000,
   "date": "2026-10-26",
   "changePct": -4,
   "close": 760000,
   "closeDate": "2026-10-26"
  },
  "009540": {
   "price": 243000,
   "date": "2026-10-26",
   "changePct": -2,
   "close": 243000,
   "closeDate": "2026-10-26"
  },
  "068270": {
   "price": 190000,
   "date": "2026-10-26",
   "changePct": -2.3,
   "close": 190000,
   "closeDate": "2026-10-26"
  },
  "000270": {
   "price": 105100,
   "date": "2026-10-26",
   "changePct": -1.7,
   "close": 105100,
   "closeDate": "2026-10-26"
  },
  "032640": {
   "price": 14030,
   "date": "2026-10-26",
   "changePct": -0.9,
   "close": 14030,
   "closeDate": "2026-10-26"
  },
  "029780": {
   "price": 41550,
   "date": "2026-10-26",
   "changePct": -1.4,
   "close": 41550,
   "closeDate": "2026-10-26"
  },
  "058470": {
   "price": 59000,
   "date": "2026-10-26",
   "changePct": -4.2,
   "close": 59000,
   "closeDate": "2026-10-26"
  },
  "082920": {
   "price": 22800,
   "date": "2026-10-26",
   "changePct": -1.9,
   "close": 22800,
   "closeDate": "2026-10-26"
  },
  "064760": {
   "price": 199300,
   "date": "2026-10-26",
   "changePct": -6.7,
   "close": 199300,
   "closeDate": "2026-10-26"
  },
  "035900": {
   "price": 36000,
   "date": "2026-10-26",
   "changePct": -2.3,
   "close": 36000,
   "closeDate": "2026-10-26"
  },
  "021240": {
   "price": 103800,
   "date": "2026-10-26",
   "changePct": -2.1,
   "close": 103800,
   "closeDate": "2026-10-26"
  },
  "036570": {
   "price": 201500,
   "date": "2026-10-26",
   "changePct": -1.7,
   "close": 201500,
   "closeDate": "2026-10-26"
  },
  "035720": {
   "price": 29550,
   "date": "2026-10-26",
   "changePct": -1.3,
   "close": 29550,
   "closeDate": "2026-10-26"
  },
  "001040": {
   "price": 115400,
   "date": "2026-10-26",
   "changePct": -2.4,
   "close": 115400,
   "closeDate": "2026-10-26"
  },
  "012750": {
   "price": 93300,
   "date": "2026-10-26",
   "changePct": -2.8,
   "close": 93300,
   "closeDate": "2026-10-26"
  },
  "000660": {
   "price": 1275000,
   "date": "2026-10-26",
   "changePct": -0.2,
   "close": 1275000,
   "closeDate": "2026-10-26"
  },
  "033780": {
   "price": 188900,
   "date": "2026-10-26",
   "changePct": -0.3,
   "close": 188900,
   "closeDate": "2026-10-26"
  },
  "001120": {
   "price": 41200,
   "date": "2026-10-26",
   "changePct": -3.7,
   "close": 41200,
   "closeDate": "2026-10-26"
  },
  "004370": {
   "price": 393000,
   "date": "2026-10-26",
   "changePct": -2.4,
   "close": 393000,
   "closeDate": "2026-10-26"
  },
  "062040": {
   "price": 159600,
   "date": "2026-10-26",
   "changePct": -3.4,
   "close": 159600,
   "closeDate": "2026-10-26"
  },
  "041830": {
   "price": 45650,
   "date": "2026-10-26",
   "changePct": -3,
   "close": 45650,
   "closeDate": "2026-10-26"
  },
  "005830": {
   "price": 179700,
   "date": "2026-10-26",
   "changePct": -2.4,
   "close": 179700,
   "closeDate": "2026-10-26"
  },
  "066570": {
   "price": 156000,
   "date": "2026-10-26",
   "changePct": -0.7,
   "close": 156000,
   "closeDate": "2026-10-26"
  },
  "086280": {
   "price": 176200,
   "date": "2026-10-26",
   "changePct": 0.2,
   "close": 176200,
   "closeDate": "2026-10-26"
  },
  "018260": {
   "price": 213000,
   "date": "2026-10-26",
   "changePct": -0.2,
   "close": 213000,
   "closeDate": "2026-10-26"
  },
  "005850": {
   "price": 48750,
   "date": "2026-10-26",
   "changePct": -1.3,
   "close": 48750,
   "closeDate": "2026-10-26"
  },
  "095340": {
   "price": 140600,
   "date": "2026-10-26",
   "changePct": -5.2,
   "close": 140600,
   "closeDate": "2026-10-26"
  },
  "005490": {
   "price": 269500,
   "date": "2026-10-26",
   "changePct": -2.2,
   "close": 269500,
   "closeDate": "2026-10-26"
  },
  "035420": {
   "price": 174200,
   "date": "2026-10-26",
   "changePct": 0.3,
   "close": 174200,
   "closeDate": "2026-10-26"
  },
  "010120": {
   "price": 152900,
   "date": "2026-10-26",
   "changePct": -2.5,
   "close": 152900,
   "closeDate": "2026-10-26"
  },
  "030200": {
   "price": 45700,
   "date": "2026-10-26",
   "changePct": -2.4,
   "close": 45700,
   "closeDate": "2026-10-26"
  },
  "012330": {
   "price": 326000,
   "date": "2026-10-26",
   "changePct": -0.8,
   "close": 326000,
   "closeDate": "2026-10-26"
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
  },
  "FIVE": {
   "price": 223.24,
   "date": "2026-10-23",
   "changePct": -1.2,
   "close": 223.24,
   "closeDate": "2026-10-23"
  },
  "STRL": {
   "price": 355.3,
   "date": "2026-10-23",
   "changePct": -4.7,
   "close": 355.3,
   "closeDate": "2026-10-23"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5469.47,
   "date": "2026-10-26",
   "changePct": -1.5,
   "close": 5469.47,
   "closeDate": "2026-10-26"
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
