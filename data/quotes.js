// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-29",
 "quotes": {
  "103590": {
   "price": 56000,
   "date": "2026-10-29",
   "changePct": -4.9,
   "close": 56000,
   "closeDate": "2026-10-29"
  },
  "105560": {
   "price": 156800,
   "date": "2026-10-29",
   "changePct": 1.8,
   "close": 156800,
   "closeDate": "2026-10-29"
  },
  "119850": {
   "price": 34800,
   "date": "2026-10-29",
   "changePct": -7.1,
   "close": 34800,
   "closeDate": "2026-10-29"
  },
  "138040": {
   "price": 131400,
   "date": "2026-10-29",
   "changePct": 6.4,
   "close": 131400,
   "closeDate": "2026-10-29"
  },
  "139130": {
   "price": 15610,
   "date": "2026-10-29",
   "changePct": 3,
   "close": 15610,
   "closeDate": "2026-10-29"
  },
  "175330": {
   "price": 25550,
   "date": "2026-10-29",
   "changePct": 4.5,
   "close": 25550,
   "closeDate": "2026-10-29"
  },
  "207940": {
   "price": 1366000,
   "date": "2026-10-29",
   "changePct": -0.4,
   "close": 1366000,
   "closeDate": "2026-10-29"
  },
  "214450": {
   "price": 222500,
   "date": "2026-10-29",
   "changePct": -2.6,
   "close": 222500,
   "closeDate": "2026-10-29"
  },
  "241560": {
   "price": 49150,
   "date": "2026-10-29",
   "changePct": -0.6,
   "close": 49150,
   "closeDate": "2026-10-29"
  },
  "267250": {
   "price": 140400,
   "date": "2026-10-29",
   "changePct": -3.2,
   "close": 140400,
   "closeDate": "2026-10-29"
  },
  "267260": {
   "price": 440500,
   "date": "2026-10-29",
   "changePct": -4.8,
   "close": 440500,
   "closeDate": "2026-10-29"
  },
  "267270": {
   "price": 78200,
   "date": "2026-10-29",
   "changePct": -3.3,
   "close": 78200,
   "closeDate": "2026-10-29"
  },
  "278470": {
   "price": 282500,
   "date": "2026-10-29",
   "changePct": -2.2,
   "close": 282500,
   "closeDate": "2026-10-29"
  },
  "298040": {
   "price": 1911000,
   "date": "2026-10-29",
   "changePct": -4.4,
   "close": 1911000,
   "closeDate": "2026-10-29"
  },
  "316140": {
   "price": 30800,
   "date": "2026-10-29",
   "changePct": 3,
   "close": 30800,
   "closeDate": "2026-10-29"
  },
  "323410": {
   "price": 19530,
   "date": "2026-10-29",
   "changePct": 0,
   "close": 19530,
   "closeDate": "2026-10-29"
  },
  "329180": {
   "price": 272000,
   "date": "2026-10-29",
   "changePct": -4.7,
   "close": 272000,
   "closeDate": "2026-10-29"
  },
  "361610": {
   "price": 14890,
   "date": "2026-10-29",
   "changePct": -6.5,
   "close": 14890,
   "closeDate": "2026-10-29"
  },
  "403870": {
   "price": 45650,
   "date": "2026-10-29",
   "changePct": -3.5,
   "close": 45650,
   "closeDate": "2026-10-29"
  },
  "005930": {
   "price": 232000,
   "date": "2026-10-29",
   "changePct": -4.1,
   "close": 232000,
   "closeDate": "2026-10-29"
  },
  "055550": {
   "price": 88500,
   "date": "2026-10-29",
   "changePct": 0.8,
   "close": 88500,
   "closeDate": "2026-10-29"
  },
  "000810": {
   "price": 651000,
   "date": "2026-10-29",
   "changePct": 2.2,
   "close": 651000,
   "closeDate": "2026-10-29"
  },
  "028260": {
   "price": 323500,
   "date": "2026-10-29",
   "changePct": -0.3,
   "close": 323500,
   "closeDate": "2026-10-29"
  },
  "086790": {
   "price": 119700,
   "date": "2026-10-29",
   "changePct": 3.8,
   "close": 119700,
   "closeDate": "2026-10-29"
  },
  "012450": {
   "price": 760000,
   "date": "2026-10-29",
   "changePct": -3.4,
   "close": 760000,
   "closeDate": "2026-10-29"
  },
  "009540": {
   "price": 233000,
   "date": "2026-10-29",
   "changePct": -3.5,
   "close": 233000,
   "closeDate": "2026-10-29"
  },
  "068270": {
   "price": 189300,
   "date": "2026-10-29",
   "changePct": -0.3,
   "close": 189300,
   "closeDate": "2026-10-29"
  },
  "000270": {
   "price": 108300,
   "date": "2026-10-29",
   "changePct": 0.4,
   "close": 108300,
   "closeDate": "2026-10-29"
  },
  "032640": {
   "price": 13940,
   "date": "2026-10-29",
   "changePct": 1.1,
   "close": 13940,
   "closeDate": "2026-10-29"
  },
  "029780": {
   "price": 41000,
   "date": "2026-10-29",
   "changePct": 0.4,
   "close": 41000,
   "closeDate": "2026-10-29"
  },
  "058470": {
   "price": 61700,
   "date": "2026-10-29",
   "changePct": -2.8,
   "close": 61700,
   "closeDate": "2026-10-29"
  },
  "082920": {
   "price": 24350,
   "date": "2026-10-29",
   "changePct": 2.1,
   "close": 24350,
   "closeDate": "2026-10-29"
  },
  "064760": {
   "price": 213000,
   "date": "2026-10-29",
   "changePct": -3.2,
   "close": 213000,
   "closeDate": "2026-10-29"
  },
  "035900": {
   "price": 38900,
   "date": "2026-10-29",
   "changePct": -2.9,
   "close": 38900,
   "closeDate": "2026-10-29"
  },
  "021240": {
   "price": 101600,
   "date": "2026-10-29",
   "changePct": 0,
   "close": 101600,
   "closeDate": "2026-10-29"
  },
  "036570": {
   "price": 199500,
   "date": "2026-10-29",
   "changePct": -0.7,
   "close": 199500,
   "closeDate": "2026-10-29"
  },
  "035720": {
   "price": 29300,
   "date": "2026-10-29",
   "changePct": -1.7,
   "close": 29300,
   "closeDate": "2026-10-29"
  },
  "001040": {
   "price": 112800,
   "date": "2026-10-29",
   "changePct": -1.9,
   "close": 112800,
   "closeDate": "2026-10-29"
  },
  "012750": {
   "price": 96300,
   "date": "2026-10-29",
   "changePct": 1.3,
   "close": 96300,
   "closeDate": "2026-10-29"
  },
  "000660": {
   "price": 1526000,
   "date": "2026-10-29",
   "changePct": 2.6,
   "close": 1526000,
   "closeDate": "2026-10-29"
  },
  "033780": {
   "price": 193100,
   "date": "2026-10-29",
   "changePct": 2.7,
   "close": 193100,
   "closeDate": "2026-10-29"
  },
  "001120": {
   "price": 40200,
   "date": "2026-10-29",
   "changePct": -0.1,
   "close": 40200,
   "closeDate": "2026-10-29"
  },
  "004370": {
   "price": 388000,
   "date": "2026-10-29",
   "changePct": -0.4,
   "close": 388000,
   "closeDate": "2026-10-29"
  },
  "062040": {
   "price": 156800,
   "date": "2026-10-29",
   "changePct": -4.4,
   "close": 156800,
   "closeDate": "2026-10-29"
  },
  "041830": {
   "price": 45700,
   "date": "2026-10-29",
   "changePct": -1.5,
   "close": 45700,
   "closeDate": "2026-10-29"
  },
  "005830": {
   "price": 182000,
   "date": "2026-10-29",
   "changePct": 0.9,
   "close": 182000,
   "closeDate": "2026-10-29"
  },
  "066570": {
   "price": 155200,
   "date": "2026-10-29",
   "changePct": -4,
   "close": 155200,
   "closeDate": "2026-10-29"
  },
  "086280": {
   "price": 188800,
   "date": "2026-10-29",
   "changePct": 1,
   "close": 188800,
   "closeDate": "2026-10-29"
  },
  "018260": {
   "price": 206500,
   "date": "2026-10-29",
   "changePct": -7.2,
   "close": 206500,
   "closeDate": "2026-10-29"
  },
  "005850": {
   "price": 49600,
   "date": "2026-10-29",
   "changePct": -0.6,
   "close": 49600,
   "closeDate": "2026-10-29"
  },
  "095340": {
   "price": 166200,
   "date": "2026-10-29",
   "changePct": 0.2,
   "close": 166200,
   "closeDate": "2026-10-29"
  },
  "005490": {
   "price": 275500,
   "date": "2026-10-29",
   "changePct": -2.3,
   "close": 275500,
   "closeDate": "2026-10-29"
  },
  "035420": {
   "price": 174900,
   "date": "2026-10-29",
   "changePct": -1.7,
   "close": 174900,
   "closeDate": "2026-10-29"
  },
  "010120": {
   "price": 158400,
   "date": "2026-10-29",
   "changePct": -3.8,
   "close": 158400,
   "closeDate": "2026-10-29"
  },
  "030200": {
   "price": 45750,
   "date": "2026-10-29",
   "changePct": 0.9,
   "close": 45750,
   "closeDate": "2026-10-29"
  },
  "012330": {
   "price": 353000,
   "date": "2026-10-29",
   "changePct": 0.3,
   "close": 353000,
   "closeDate": "2026-10-29"
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
   "price": 5937.66,
   "date": "2026-10-29",
   "changePct": -1.2,
   "close": 5937.66,
   "closeDate": "2026-10-29"
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
