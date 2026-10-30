// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-30",
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
   "price": 530.14,
   "date": "2026-10-29",
   "changePct": -0.2,
   "close": 530.14,
   "closeDate": "2026-10-29"
  },
  "V": {
   "price": 410.54,
   "date": "2026-10-29",
   "changePct": 2.5,
   "close": 410.54,
   "closeDate": "2026-10-29"
  },
  "MA": {
   "price": 635.7,
   "date": "2026-10-29",
   "changePct": 4.2,
   "close": 635.7,
   "closeDate": "2026-10-29"
  },
  "GOOGL": {
   "price": 283.82,
   "date": "2026-10-29",
   "changePct": -12.6,
   "close": 283.82,
   "closeDate": "2026-10-29"
  },
  "COST": {
   "price": 996.08,
   "date": "2026-10-29",
   "changePct": 1.4,
   "close": 996.08,
   "closeDate": "2026-10-29"
  },
  "NVDA": {
   "price": 213.66,
   "date": "2026-10-29",
   "changePct": -0.8,
   "close": 213.66,
   "closeDate": "2026-10-29"
  },
  "META": {
   "price": 624.52,
   "date": "2026-10-29",
   "changePct": 2,
   "close": 624.52,
   "closeDate": "2026-10-29"
  },
  "AVGO": {
   "price": 345,
   "date": "2026-10-29",
   "changePct": -1.9,
   "close": 345,
   "closeDate": "2026-10-29"
  },
  "AMZN": {
   "price": 243.79,
   "date": "2026-10-29",
   "changePct": -4.2,
   "close": 243.79,
   "closeDate": "2026-10-29"
  },
  "TSM": {
   "price": 431.81,
   "date": "2026-10-29",
   "changePct": -1.8,
   "close": 431.81,
   "closeDate": "2026-10-29"
  },
  "UBER": {
   "price": 65.74,
   "date": "2026-10-29",
   "changePct": 0.7,
   "close": 65.74,
   "closeDate": "2026-10-29"
  },
  "GM": {
   "price": 85.72,
   "date": "2026-10-29",
   "changePct": 3.9,
   "close": 85.72,
   "closeDate": "2026-10-29"
  },
  "VZ": {
   "price": 43.66,
   "date": "2026-10-29",
   "changePct": 1.1,
   "close": 43.66,
   "closeDate": "2026-10-29"
  },
  "C": {
   "price": 125.76,
   "date": "2026-10-29",
   "changePct": 1.3,
   "close": 125.76,
   "closeDate": "2026-10-29"
  },
  "DUK": {
   "price": 125.9,
   "date": "2026-10-29",
   "changePct": 1.9,
   "close": 125.9,
   "closeDate": "2026-10-29"
  },
  "KO": {
   "price": 92.82,
   "date": "2026-10-29",
   "changePct": 1.2,
   "close": 92.82,
   "closeDate": "2026-10-29"
  },
  "JNJ": {
   "price": 275.2,
   "date": "2026-10-29",
   "changePct": 1.5,
   "close": 275.2,
   "closeDate": "2026-10-29"
  },
  "NXT": {
   "price": 79.83,
   "date": "2026-10-29",
   "changePct": -2.7,
   "close": 79.83,
   "closeDate": "2026-10-29"
  },
  "LLY": {
   "price": 1373.7,
   "date": "2026-10-29",
   "changePct": 6.6,
   "close": 1373.7,
   "closeDate": "2026-10-29"
  },
  "CI": {
   "price": 298.41,
   "date": "2026-10-29",
   "changePct": 1.2,
   "close": 298.41,
   "closeDate": "2026-10-29"
  },
  "NOW": {
   "price": 109.67,
   "date": "2026-10-29",
   "changePct": -26.9,
   "close": 109.67,
   "closeDate": "2026-10-29"
  },
  "TSLA": {
   "price": 403.3,
   "date": "2026-10-29",
   "changePct": -0.2,
   "close": 403.3,
   "closeDate": "2026-10-29"
  },
  "MDLZ": {
   "price": 62.53,
   "date": "2026-10-29",
   "changePct": 1.1,
   "close": 62.53,
   "closeDate": "2026-10-29"
  },
  "AAPL": {
   "price": 348.91,
   "date": "2026-10-29",
   "changePct": 1.5,
   "close": 348.91,
   "closeDate": "2026-10-29"
  },
  "MU": {
   "price": 934.27,
   "date": "2026-10-29",
   "changePct": -5,
   "close": 934.27,
   "closeDate": "2026-10-29"
  },
  "MDT": {
   "price": 97.11,
   "date": "2026-10-29",
   "changePct": 2.5,
   "close": 97.11,
   "closeDate": "2026-10-29"
  },
  "IREN": {
   "price": 26.25,
   "date": "2026-10-29",
   "changePct": -9,
   "close": 26.25,
   "closeDate": "2026-10-29"
  },
  "UNH": {
   "price": 410.91,
   "date": "2026-10-29",
   "changePct": 0.9,
   "close": 410.91,
   "closeDate": "2026-10-29"
  },
  "GILD": {
   "price": 165.61,
   "date": "2026-10-29",
   "changePct": 4,
   "close": 165.61,
   "closeDate": "2026-10-29"
  },
  "BRK.B": {
   "price": 541.96,
   "date": "2026-10-29",
   "changePct": 0.3,
   "close": 541.96,
   "closeDate": "2026-10-29"
  },
  "TMO": {
   "price": 709.18,
   "date": "2026-10-29",
   "changePct": 0.7,
   "close": 709.18,
   "closeDate": "2026-10-29"
  },
  "ECL": {
   "price": 300.86,
   "date": "2026-10-29",
   "changePct": 2.9,
   "close": 300.86,
   "closeDate": "2026-10-29"
  },
  "NVT": {
   "price": 138.15,
   "date": "2026-10-29",
   "changePct": -1.4,
   "close": 138.15,
   "closeDate": "2026-10-29"
  },
  "FSS": {
   "price": 115.21,
   "date": "2026-10-29",
   "changePct": 1.6,
   "close": 115.21,
   "closeDate": "2026-10-29"
  },
  "AAON": {
   "price": 75.3,
   "date": "2026-10-29",
   "changePct": -0.4,
   "close": 75.3,
   "closeDate": "2026-10-29"
  },
  "NVMI": {
   "price": 334.59,
   "date": "2026-10-29",
   "changePct": 0,
   "close": 334.59,
   "closeDate": "2026-10-29"
  },
  "POWL": {
   "price": 168.48,
   "date": "2026-10-29",
   "changePct": 0.3,
   "close": 168.48,
   "closeDate": "2026-10-29"
  },
  "MSI": {
   "price": 492.08,
   "date": "2026-10-29",
   "changePct": 1.8,
   "close": 492.08,
   "closeDate": "2026-10-29"
  },
  "DVN": {
   "price": 51.17,
   "date": "2026-10-29",
   "changePct": -0.2,
   "close": 51.17,
   "closeDate": "2026-10-29"
  },
  "GS": {
   "price": 927.73,
   "date": "2026-10-29",
   "changePct": 0.3,
   "close": 927.73,
   "closeDate": "2026-10-29"
  },
  "AMP": {
   "price": 497.9,
   "date": "2026-10-29",
   "changePct": 1.7,
   "close": 497.9,
   "closeDate": "2026-10-29"
  },
  "PNC": {
   "price": 231.83,
   "date": "2026-10-29",
   "changePct": 1.6,
   "close": 231.83,
   "closeDate": "2026-10-29"
  },
  "MTB": {
   "price": 224.07,
   "date": "2026-10-29",
   "changePct": 1.8,
   "close": 224.07,
   "closeDate": "2026-10-29"
  },
  "SO": {
   "price": 92.99,
   "date": "2026-10-29",
   "changePct": 1.6,
   "close": 92.99,
   "closeDate": "2026-10-29"
  },
  "WEC": {
   "price": 114.63,
   "date": "2026-10-29",
   "changePct": 3.7,
   "close": 114.63,
   "closeDate": "2026-10-29"
  },
  "MSCI": {
   "price": 618.55,
   "date": "2026-10-29",
   "changePct": 2.2,
   "close": 618.55,
   "closeDate": "2026-10-29"
  },
  "RSG": {
   "price": 236.28,
   "date": "2026-10-29",
   "changePct": 1.2,
   "close": 236.28,
   "closeDate": "2026-10-29"
  },
  "CTAS": {
   "price": 218.07,
   "date": "2026-10-29",
   "changePct": 2.5,
   "close": 218.07,
   "closeDate": "2026-10-29"
  },
  "TJX": {
   "price": 141.39,
   "date": "2026-10-29",
   "changePct": 2.2,
   "close": 141.39,
   "closeDate": "2026-10-29"
  },
  "ANET": {
   "price": 184.22,
   "date": "2026-10-29",
   "changePct": -1.3,
   "close": 184.22,
   "closeDate": "2026-10-29"
  },
  "GD": {
   "price": 370.82,
   "date": "2026-10-29",
   "changePct": 4.6,
   "close": 370.82,
   "closeDate": "2026-10-29"
  },
  "APPF": {
   "price": 207.05,
   "date": "2026-10-29",
   "changePct": 1,
   "close": 207.05,
   "closeDate": "2026-10-29"
  },
  "CB": {
   "price": 362.28,
   "date": "2026-10-29",
   "changePct": 1.9,
   "close": 362.28,
   "closeDate": "2026-10-29"
  },
  "ADP": {
   "price": 286.08,
   "date": "2026-10-29",
   "changePct": 0.2,
   "close": 286.08,
   "closeDate": "2026-10-29"
  },
  "LMT": {
   "price": 643.59,
   "date": "2026-10-29",
   "changePct": 2.2,
   "close": 643.59,
   "closeDate": "2026-10-29"
  },
  "ORLY": {
   "price": 88.07,
   "date": "2026-10-29",
   "changePct": -2.6,
   "close": 88.07,
   "closeDate": "2026-10-29"
  },
  "YUM": {
   "price": 154.55,
   "date": "2026-10-29",
   "changePct": 2.9,
   "close": 154.55,
   "closeDate": "2026-10-29"
  },
  "FIVE": {
   "price": 245.5,
   "date": "2026-10-29",
   "changePct": 4.7,
   "close": 245.5,
   "closeDate": "2026-10-29"
  },
  "STRL": {
   "price": 373.66,
   "date": "2026-10-29",
   "changePct": -3.9,
   "close": 373.66,
   "closeDate": "2026-10-29"
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
   "price": 7720.39,
   "date": "2026-10-29",
   "changePct": -0.3,
   "close": 7720.39,
   "closeDate": "2026-10-29"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 220.04,
   "date": "2026-10-29",
   "changePct": 1.2,
   "close": 220.04,
   "closeDate": "2026-10-29"
  }
 }
};
