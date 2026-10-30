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
   "price": 52700,
   "date": "2026-10-30",
   "changePct": -5.9,
   "close": 52700,
   "closeDate": "2026-10-30"
  },
  "105560": {
   "price": 155500,
   "date": "2026-10-30",
   "changePct": -0.8,
   "close": 155500,
   "closeDate": "2026-10-30"
  },
  "119850": {
   "price": 31900,
   "date": "2026-10-30",
   "changePct": -8.3,
   "close": 31900,
   "closeDate": "2026-10-30"
  },
  "138040": {
   "price": 133200,
   "date": "2026-10-30",
   "changePct": 1.4,
   "close": 133200,
   "closeDate": "2026-10-30"
  },
  "139130": {
   "price": 15770,
   "date": "2026-10-30",
   "changePct": 1,
   "close": 15770,
   "closeDate": "2026-10-30"
  },
  "175330": {
   "price": 25900,
   "date": "2026-10-30",
   "changePct": 1.4,
   "close": 25900,
   "closeDate": "2026-10-30"
  },
  "207940": {
   "price": 1487000,
   "date": "2026-10-30",
   "changePct": 8.9,
   "close": 1487000,
   "closeDate": "2026-10-30"
  },
  "214450": {
   "price": 212000,
   "date": "2026-10-30",
   "changePct": -4.7,
   "close": 212000,
   "closeDate": "2026-10-30"
  },
  "241560": {
   "price": 48500,
   "date": "2026-10-30",
   "changePct": -1.3,
   "close": 48500,
   "closeDate": "2026-10-30"
  },
  "267250": {
   "price": 140800,
   "date": "2026-10-30",
   "changePct": 0.3,
   "close": 140800,
   "closeDate": "2026-10-30"
  },
  "267260": {
   "price": 424500,
   "date": "2026-10-30",
   "changePct": -3.6,
   "close": 424500,
   "closeDate": "2026-10-30"
  },
  "267270": {
   "price": 77200,
   "date": "2026-10-30",
   "changePct": -1.3,
   "close": 77200,
   "closeDate": "2026-10-30"
  },
  "278470": {
   "price": 261000,
   "date": "2026-10-30",
   "changePct": -7.6,
   "close": 261000,
   "closeDate": "2026-10-30"
  },
  "298040": {
   "price": 1809000,
   "date": "2026-10-30",
   "changePct": -5.3,
   "close": 1809000,
   "closeDate": "2026-10-30"
  },
  "316140": {
   "price": 30800,
   "date": "2026-10-30",
   "changePct": 0,
   "close": 30800,
   "closeDate": "2026-10-30"
  },
  "323410": {
   "price": 19920,
   "date": "2026-10-30",
   "changePct": 2,
   "close": 19920,
   "closeDate": "2026-10-30"
  },
  "329180": {
   "price": 274000,
   "date": "2026-10-30",
   "changePct": 0.7,
   "close": 274000,
   "closeDate": "2026-10-30"
  },
  "361610": {
   "price": 14970,
   "date": "2026-10-30",
   "changePct": 0.5,
   "close": 14970,
   "closeDate": "2026-10-30"
  },
  "403870": {
   "price": 42600,
   "date": "2026-10-30",
   "changePct": -6.7,
   "close": 42600,
   "closeDate": "2026-10-30"
  },
  "005930": {
   "price": 225000,
   "date": "2026-10-30",
   "changePct": -3,
   "close": 225000,
   "closeDate": "2026-10-30"
  },
  "055550": {
   "price": 89600,
   "date": "2026-10-30",
   "changePct": 1.2,
   "close": 89600,
   "closeDate": "2026-10-30"
  },
  "000810": {
   "price": 659000,
   "date": "2026-10-30",
   "changePct": 1.2,
   "close": 659000,
   "closeDate": "2026-10-30"
  },
  "028260": {
   "price": 312000,
   "date": "2026-10-30",
   "changePct": -3.6,
   "close": 312000,
   "closeDate": "2026-10-30"
  },
  "086790": {
   "price": 120500,
   "date": "2026-10-30",
   "changePct": 0.7,
   "close": 120500,
   "closeDate": "2026-10-30"
  },
  "012450": {
   "price": 696000,
   "date": "2026-10-30",
   "changePct": -8.4,
   "close": 696000,
   "closeDate": "2026-10-30"
  },
  "009540": {
   "price": 231500,
   "date": "2026-10-30",
   "changePct": -0.6,
   "close": 231500,
   "closeDate": "2026-10-30"
  },
  "068270": {
   "price": 191600,
   "date": "2026-10-30",
   "changePct": 1.2,
   "close": 191600,
   "closeDate": "2026-10-30"
  },
  "000270": {
   "price": 95600,
   "date": "2026-10-30",
   "changePct": -11.7,
   "close": 95600,
   "closeDate": "2026-10-30"
  },
  "032640": {
   "price": 14230,
   "date": "2026-10-30",
   "changePct": 2.1,
   "close": 14230,
   "closeDate": "2026-10-30"
  },
  "029780": {
   "price": 42450,
   "date": "2026-10-30",
   "changePct": 3.5,
   "close": 42450,
   "closeDate": "2026-10-30"
  },
  "058470": {
   "price": 56100,
   "date": "2026-10-30",
   "changePct": -9.1,
   "close": 56100,
   "closeDate": "2026-10-30"
  },
  "082920": {
   "price": 24000,
   "date": "2026-10-30",
   "changePct": -1.4,
   "close": 24000,
   "closeDate": "2026-10-30"
  },
  "064760": {
   "price": 193600,
   "date": "2026-10-30",
   "changePct": -9.1,
   "close": 193600,
   "closeDate": "2026-10-30"
  },
  "035900": {
   "price": 39400,
   "date": "2026-10-30",
   "changePct": 1.3,
   "close": 39400,
   "closeDate": "2026-10-30"
  },
  "021240": {
   "price": 104000,
   "date": "2026-10-30",
   "changePct": 2.4,
   "close": 104000,
   "closeDate": "2026-10-30"
  },
  "036570": {
   "price": 201500,
   "date": "2026-10-30",
   "changePct": 1,
   "close": 201500,
   "closeDate": "2026-10-30"
  },
  "035720": {
   "price": 29450,
   "date": "2026-10-30",
   "changePct": 0.5,
   "close": 29450,
   "closeDate": "2026-10-30"
  },
  "001040": {
   "price": 111000,
   "date": "2026-10-30",
   "changePct": -1.6,
   "close": 111000,
   "closeDate": "2026-10-30"
  },
  "012750": {
   "price": 97700,
   "date": "2026-10-30",
   "changePct": 1.5,
   "close": 97700,
   "closeDate": "2026-10-30"
  },
  "000660": {
   "price": 1418000,
   "date": "2026-10-30",
   "changePct": -7.1,
   "close": 1418000,
   "closeDate": "2026-10-30"
  },
  "033780": {
   "price": 196200,
   "date": "2026-10-30",
   "changePct": 1.6,
   "close": 196200,
   "closeDate": "2026-10-30"
  },
  "001120": {
   "price": 40300,
   "date": "2026-10-30",
   "changePct": 0.2,
   "close": 40300,
   "closeDate": "2026-10-30"
  },
  "004370": {
   "price": 397500,
   "date": "2026-10-30",
   "changePct": 2.4,
   "close": 397500,
   "closeDate": "2026-10-30"
  },
  "062040": {
   "price": 146700,
   "date": "2026-10-30",
   "changePct": -6.4,
   "close": 146700,
   "closeDate": "2026-10-30"
  },
  "041830": {
   "price": 46550,
   "date": "2026-10-30",
   "changePct": 1.9,
   "close": 46550,
   "closeDate": "2026-10-30"
  },
  "005830": {
   "price": 184700,
   "date": "2026-10-30",
   "changePct": 1.5,
   "close": 184700,
   "closeDate": "2026-10-30"
  },
  "066570": {
   "price": 150700,
   "date": "2026-10-30",
   "changePct": -2.9,
   "close": 150700,
   "closeDate": "2026-10-30"
  },
  "086280": {
   "price": 183800,
   "date": "2026-10-30",
   "changePct": -2.6,
   "close": 183800,
   "closeDate": "2026-10-30"
  },
  "018260": {
   "price": 203000,
   "date": "2026-10-30",
   "changePct": -1.7,
   "close": 203000,
   "closeDate": "2026-10-30"
  },
  "005850": {
   "price": 48400,
   "date": "2026-10-30",
   "changePct": -2.4,
   "close": 48400,
   "closeDate": "2026-10-30"
  },
  "095340": {
   "price": 155800,
   "date": "2026-10-30",
   "changePct": -6.3,
   "close": 155800,
   "closeDate": "2026-10-30"
  },
  "005490": {
   "price": 273500,
   "date": "2026-10-30",
   "changePct": -0.7,
   "close": 273500,
   "closeDate": "2026-10-30"
  },
  "035420": {
   "price": 172300,
   "date": "2026-10-30",
   "changePct": -1.5,
   "close": 172300,
   "closeDate": "2026-10-30"
  },
  "010120": {
   "price": 149600,
   "date": "2026-10-30",
   "changePct": -5.6,
   "close": 149600,
   "closeDate": "2026-10-30"
  },
  "030200": {
   "price": 46300,
   "date": "2026-10-30",
   "changePct": 1.2,
   "close": 46300,
   "closeDate": "2026-10-30"
  },
  "012330": {
   "price": 334000,
   "date": "2026-10-30",
   "changePct": -5.4,
   "close": 334000,
   "closeDate": "2026-10-30"
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
   "price": 5730.74,
   "date": "2026-10-30",
   "changePct": -3.5,
   "close": 5730.74,
   "closeDate": "2026-10-30"
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
