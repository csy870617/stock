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
   "price": 532.6,
   "date": "2026-10-26",
   "changePct": 1.5,
   "close": 532.6,
   "closeDate": "2026-10-26"
  },
  "V": {
   "price": 404.16,
   "date": "2026-10-26",
   "changePct": -0.9,
   "close": 404.16,
   "closeDate": "2026-10-26"
  },
  "MA": {
   "price": 613.5,
   "date": "2026-10-26",
   "changePct": -1.6,
   "close": 613.5,
   "closeDate": "2026-10-26"
  },
  "GOOGL": {
   "price": 316.8,
   "date": "2026-10-26",
   "changePct": -1.1,
   "close": 316.8,
   "closeDate": "2026-10-26"
  },
  "COST": {
   "price": 1005.16,
   "date": "2026-10-26",
   "changePct": 0.2,
   "close": 1005.16,
   "closeDate": "2026-10-26"
  },
  "NVDA": {
   "price": 216,
   "date": "2026-10-26",
   "changePct": 2.4,
   "close": 216,
   "closeDate": "2026-10-26"
  },
  "META": {
   "price": 630.56,
   "date": "2026-10-26",
   "changePct": -1.9,
   "close": 630.56,
   "closeDate": "2026-10-26"
  },
  "AVGO": {
   "price": 329.17,
   "date": "2026-10-26",
   "changePct": 2.3,
   "close": 329.17,
   "closeDate": "2026-10-26"
  },
  "AMZN": {
   "price": 249.09,
   "date": "2026-10-26",
   "changePct": 0.4,
   "close": 249.09,
   "closeDate": "2026-10-26"
  },
  "TSM": {
   "price": 424.37,
   "date": "2026-10-26",
   "changePct": 1.4,
   "close": 424.37,
   "closeDate": "2026-10-26"
  },
  "UBER": {
   "price": 66.13,
   "date": "2026-10-26",
   "changePct": -0.9,
   "close": 66.13,
   "closeDate": "2026-10-26"
  },
  "GM": {
   "price": 76.31,
   "date": "2026-10-26",
   "changePct": 0.5,
   "close": 76.31,
   "closeDate": "2026-10-26"
  },
  "VZ": {
   "price": 43.1,
   "date": "2026-10-26",
   "changePct": -3.5,
   "close": 43.1,
   "closeDate": "2026-10-26"
  },
  "C": {
   "price": 121.04,
   "date": "2026-10-26",
   "changePct": 0.3,
   "close": 121.04,
   "closeDate": "2026-10-26"
  },
  "DUK": {
   "price": 124.44,
   "date": "2026-10-26",
   "changePct": -0.4,
   "close": 124.44,
   "closeDate": "2026-10-26"
  },
  "KO": {
   "price": 92.7,
   "date": "2026-10-26",
   "changePct": 0,
   "close": 92.7,
   "closeDate": "2026-10-26"
  },
  "JNJ": {
   "price": 266.3,
   "date": "2026-10-26",
   "changePct": 0.9,
   "close": 266.3,
   "closeDate": "2026-10-26"
  },
  "NXT": {
   "price": 76.48,
   "date": "2026-10-26",
   "changePct": -3.1,
   "close": 76.48,
   "closeDate": "2026-10-26"
  },
  "LLY": {
   "price": 1279.14,
   "date": "2026-10-26",
   "changePct": 0.4,
   "close": 1279.14,
   "closeDate": "2026-10-26"
  },
  "CI": {
   "price": 305.78,
   "date": "2026-10-26",
   "changePct": -0.4,
   "close": 305.78,
   "closeDate": "2026-10-26"
  },
  "NOW": {
   "price": 158.18,
   "date": "2026-10-26",
   "changePct": -0.5,
   "close": 158.18,
   "closeDate": "2026-10-26"
  },
  "TSLA": {
   "price": 391.62,
   "date": "2026-10-26",
   "changePct": 5.2,
   "close": 391.62,
   "closeDate": "2026-10-26"
  },
  "MDLZ": {
   "price": 62.97,
   "date": "2026-10-26",
   "changePct": -1.3,
   "close": 62.97,
   "closeDate": "2026-10-26"
  },
  "AAPL": {
   "price": 343.91,
   "date": "2026-10-26",
   "changePct": -1.1,
   "close": 343.91,
   "closeDate": "2026-10-26"
  },
  "MU": {
   "price": 903.7,
   "date": "2026-10-26",
   "changePct": 3,
   "close": 903.7,
   "closeDate": "2026-10-26"
  },
  "MDT": {
   "price": 94.79,
   "date": "2026-10-26",
   "changePct": -0.6,
   "close": 94.79,
   "closeDate": "2026-10-26"
  },
  "IREN": {
   "price": 25.43,
   "date": "2026-10-26",
   "changePct": 2.1,
   "close": 25.43,
   "closeDate": "2026-10-26"
  },
  "UNH": {
   "price": 410.7,
   "date": "2026-10-26",
   "changePct": -1.8,
   "close": 410.7,
   "closeDate": "2026-10-26"
  },
  "GILD": {
   "price": 158.69,
   "date": "2026-10-26",
   "changePct": 1.7,
   "close": 158.69,
   "closeDate": "2026-10-26"
  },
  "BRK.B": {
   "price": 548.56,
   "date": "2026-10-26",
   "changePct": 1.2,
   "close": 548.56,
   "closeDate": "2026-10-26"
  },
  "TMO": {
   "price": 684.89,
   "date": "2026-10-26",
   "changePct": 1.6,
   "close": 684.89,
   "closeDate": "2026-10-26"
  },
  "ECL": {
   "price": 288.89,
   "date": "2026-10-26",
   "changePct": 0.1,
   "close": 288.89,
   "closeDate": "2026-10-26"
  },
  "NVT": {
   "price": 129.18,
   "date": "2026-10-26",
   "changePct": 3,
   "close": 129.18,
   "closeDate": "2026-10-26"
  },
  "FSS": {
   "price": 114.14,
   "date": "2026-10-26",
   "changePct": 0.8,
   "close": 114.14,
   "closeDate": "2026-10-26"
  },
  "AAON": {
   "price": 70.8,
   "date": "2026-10-26",
   "changePct": 2.8,
   "close": 70.8,
   "closeDate": "2026-10-26"
  },
  "NVMI": {
   "price": 316.33,
   "date": "2026-10-26",
   "changePct": 1.6,
   "close": 316.33,
   "closeDate": "2026-10-26"
  },
  "POWL": {
   "price": 157.07,
   "date": "2026-10-26",
   "changePct": 4.1,
   "close": 157.07,
   "closeDate": "2026-10-26"
  },
  "MSI": {
   "price": 485.62,
   "date": "2026-10-26",
   "changePct": 0.8,
   "close": 485.62,
   "closeDate": "2026-10-26"
  },
  "DVN": {
   "price": 51.64,
   "date": "2026-10-26",
   "changePct": 0.5,
   "close": 51.64,
   "closeDate": "2026-10-26"
  },
  "GS": {
   "price": 893.28,
   "date": "2026-10-26",
   "changePct": 2,
   "close": 893.28,
   "closeDate": "2026-10-26"
  },
  "AMP": {
   "price": 493.6,
   "date": "2026-10-26",
   "changePct": 0.3,
   "close": 493.6,
   "closeDate": "2026-10-26"
  },
  "PNC": {
   "price": 225.84,
   "date": "2026-10-26",
   "changePct": 0.6,
   "close": 225.84,
   "closeDate": "2026-10-26"
  },
  "MTB": {
   "price": 221.8,
   "date": "2026-10-26",
   "changePct": 0.1,
   "close": 221.8,
   "closeDate": "2026-10-26"
  },
  "SO": {
   "price": 92.57,
   "date": "2026-10-26",
   "changePct": -0.3,
   "close": 92.57,
   "closeDate": "2026-10-26"
  },
  "WEC": {
   "price": 111.12,
   "date": "2026-10-26",
   "changePct": 0,
   "close": 111.12,
   "closeDate": "2026-10-26"
  },
  "MSCI": {
   "price": 617.67,
   "date": "2026-10-26",
   "changePct": 0.3,
   "close": 617.67,
   "closeDate": "2026-10-26"
  },
  "RSG": {
   "price": 241.31,
   "date": "2026-10-26",
   "changePct": 0.4,
   "close": 241.31,
   "closeDate": "2026-10-26"
  },
  "CTAS": {
   "price": 225.93,
   "date": "2026-10-26",
   "changePct": 0.8,
   "close": 225.93,
   "closeDate": "2026-10-26"
  },
  "TJX": {
   "price": 143.7,
   "date": "2026-10-26",
   "changePct": -0.9,
   "close": 143.7,
   "closeDate": "2026-10-26"
  },
  "ANET": {
   "price": 177.24,
   "date": "2026-10-26",
   "changePct": 2.8,
   "close": 177.24,
   "closeDate": "2026-10-26"
  },
  "GD": {
   "price": 357.04,
   "date": "2026-10-26",
   "changePct": 2.2,
   "close": 357.04,
   "closeDate": "2026-10-26"
  },
  "APPF": {
   "price": 214.32,
   "date": "2026-10-26",
   "changePct": 1.8,
   "close": 214.32,
   "closeDate": "2026-10-26"
  },
  "CB": {
   "price": 356.74,
   "date": "2026-10-26",
   "changePct": 0.5,
   "close": 356.74,
   "closeDate": "2026-10-26"
  },
  "ADP": {
   "price": 301.12,
   "date": "2026-10-26",
   "changePct": -1,
   "close": 301.12,
   "closeDate": "2026-10-26"
  },
  "LMT": {
   "price": 635.2,
   "date": "2026-10-26",
   "changePct": 5.1,
   "close": 635.2,
   "closeDate": "2026-10-26"
  },
  "ORLY": {
   "price": 91.05,
   "date": "2026-10-26",
   "changePct": 1.3,
   "close": 91.05,
   "closeDate": "2026-10-26"
  },
  "YUM": {
   "price": 149.47,
   "date": "2026-10-26",
   "changePct": -0.2,
   "close": 149.47,
   "closeDate": "2026-10-26"
  },
  "FIVE": {
   "price": 230,
   "date": "2026-10-26",
   "changePct": 3,
   "close": 230,
   "closeDate": "2026-10-26"
  },
  "STRL": {
   "price": 360.72,
   "date": "2026-10-26",
   "changePct": 1.5,
   "close": 360.72,
   "closeDate": "2026-10-26"
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
   "price": 7676.77,
   "date": "2026-10-26",
   "changePct": 0.7,
   "close": 7676.77,
   "closeDate": "2026-10-26"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 217.29,
   "date": "2026-10-26",
   "changePct": 0.3,
   "close": 217.29,
   "closeDate": "2026-10-26"
  }
 }
};
