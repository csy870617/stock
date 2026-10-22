// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-22",
 "quotes": {
  "105560": {
   "price": 158200,
   "date": "2026-10-22",
   "changePct": -1.5,
   "close": 158200,
   "closeDate": "2026-10-22"
  },
  "119850": {
   "price": 42400,
   "date": "2026-10-22",
   "changePct": 0.7,
   "close": 42400,
   "closeDate": "2026-10-22"
  },
  "138040": {
   "price": 130600,
   "date": "2026-10-22",
   "changePct": 0.1,
   "close": 130600,
   "closeDate": "2026-10-22"
  },
  "139130": {
   "price": 16400,
   "date": "2026-10-22",
   "changePct": -0.2,
   "close": 16400,
   "closeDate": "2026-10-22"
  },
  "175330": {
   "price": 26100,
   "date": "2026-10-22",
   "changePct": -0.8,
   "close": 26100,
   "closeDate": "2026-10-22"
  },
  "207940": {
   "price": 1361000,
   "date": "2026-10-22",
   "changePct": -4,
   "close": 1361000,
   "closeDate": "2026-10-22"
  },
  "214450": {
   "price": 255000,
   "date": "2026-10-22",
   "changePct": -3.4,
   "close": 255000,
   "closeDate": "2026-10-22"
  },
  "241560": {
   "price": 50000,
   "date": "2026-10-22",
   "changePct": -1.8,
   "close": 50000,
   "closeDate": "2026-10-22"
  },
  "267250": {
   "price": 142500,
   "date": "2026-10-22",
   "changePct": -3.6,
   "close": 142500,
   "closeDate": "2026-10-22"
  },
  "267260": {
   "price": 490000,
   "date": "2026-10-22",
   "changePct": -1.8,
   "close": 490000,
   "closeDate": "2026-10-22"
  },
  "267270": {
   "price": 94000,
   "date": "2026-10-22",
   "changePct": 0.1,
   "close": 94000,
   "closeDate": "2026-10-22"
  },
  "278470": {
   "price": 291000,
   "date": "2026-10-22",
   "changePct": -8.8,
   "close": 291000,
   "closeDate": "2026-10-22"
  },
  "298040": {
   "price": 1924000,
   "date": "2026-10-22",
   "changePct": -1.3,
   "close": 1924000,
   "closeDate": "2026-10-22"
  },
  "316140": {
   "price": 31250,
   "date": "2026-10-22",
   "changePct": -0.8,
   "close": 31250,
   "closeDate": "2026-10-22"
  },
  "323410": {
   "price": 20050,
   "date": "2026-10-22",
   "changePct": -0.7,
   "close": 20050,
   "closeDate": "2026-10-22"
  },
  "329180": {
   "price": 309000,
   "date": "2026-10-22",
   "changePct": -3.4,
   "close": 309000,
   "closeDate": "2026-10-22"
  },
  "361610": {
   "price": 16280,
   "date": "2026-10-22",
   "changePct": -8.3,
   "close": 16280,
   "closeDate": "2026-10-22"
  },
  "403870": {
   "price": 48400,
   "date": "2026-10-22",
   "changePct": -4.9,
   "close": 48400,
   "closeDate": "2026-10-22"
  },
  "005930": {
   "price": 214500,
   "date": "2026-10-22",
   "changePct": -4,
   "close": 214500,
   "closeDate": "2026-10-22"
  },
  "055550": {
   "price": 90300,
   "date": "2026-10-22",
   "changePct": -1.5,
   "close": 90300,
   "closeDate": "2026-10-22"
  },
  "000810": {
   "price": 608000,
   "date": "2026-10-22",
   "changePct": 1.2,
   "close": 608000,
   "closeDate": "2026-10-22"
  },
  "028260": {
   "price": 288500,
   "date": "2026-10-22",
   "changePct": -0.5,
   "close": 288500,
   "closeDate": "2026-10-22"
  },
  "086790": {
   "price": 119900,
   "date": "2026-10-22",
   "changePct": -1.6,
   "close": 119900,
   "closeDate": "2026-10-22"
  },
  "012450": {
   "price": 811000,
   "date": "2026-10-22",
   "changePct": -0.4,
   "close": 811000,
   "closeDate": "2026-10-22"
  },
  "009540": {
   "price": 252000,
   "date": "2026-10-22",
   "changePct": -3.1,
   "close": 252000,
   "closeDate": "2026-10-22"
  },
  "068270": {
   "price": 194300,
   "date": "2026-10-22",
   "changePct": -1.7,
   "close": 194300,
   "closeDate": "2026-10-22"
  },
  "000270": {
   "price": 108800,
   "date": "2026-10-22",
   "changePct": -1.5,
   "close": 108800,
   "closeDate": "2026-10-22"
  },
  "032640": {
   "price": 14430,
   "date": "2026-10-22",
   "changePct": -2.6,
   "close": 14430,
   "closeDate": "2026-10-22"
  },
  "029780": {
   "price": 41750,
   "date": "2026-10-22",
   "changePct": -0.8,
   "close": 41750,
   "closeDate": "2026-10-22"
  },
  "058470": {
   "price": 64200,
   "date": "2026-10-22",
   "changePct": -4.7,
   "close": 64200,
   "closeDate": "2026-10-22"
  },
  "082920": {
   "price": 23450,
   "date": "2026-10-22",
   "changePct": -1.1,
   "close": 23450,
   "closeDate": "2026-10-22"
  },
  "064760": {
   "price": 217000,
   "date": "2026-10-22",
   "changePct": -6.1,
   "close": 217000,
   "closeDate": "2026-10-22"
  },
  "035900": {
   "price": 38100,
   "date": "2026-10-22",
   "changePct": -4,
   "close": 38100,
   "closeDate": "2026-10-22"
  },
  "021240": {
   "price": 106100,
   "date": "2026-10-22",
   "changePct": -0.5,
   "close": 106100,
   "closeDate": "2026-10-22"
  },
  "036570": {
   "price": 211500,
   "date": "2026-10-22",
   "changePct": -1.2,
   "close": 211500,
   "closeDate": "2026-10-22"
  },
  "035720": {
   "price": 30350,
   "date": "2026-10-22",
   "changePct": -1.9,
   "close": 30350,
   "closeDate": "2026-10-22"
  },
  "001040": {
   "price": 118700,
   "date": "2026-10-22",
   "changePct": -2.3,
   "close": 118700,
   "closeDate": "2026-10-22"
  },
  "012750": {
   "price": 96700,
   "date": "2026-10-22",
   "changePct": -0.4,
   "close": 96700,
   "closeDate": "2026-10-22"
  },
  "047050": {
   "price": 53000,
   "date": "2026-10-22",
   "changePct": -1.7,
   "close": 53000,
   "closeDate": "2026-10-22"
  },
  "000660": {
   "price": 1223000,
   "date": "2026-10-22",
   "changePct": -5.5,
   "close": 1223000,
   "closeDate": "2026-10-22"
  },
  "033780": {
   "price": 193800,
   "date": "2026-10-22",
   "changePct": -0.1,
   "close": 193800,
   "closeDate": "2026-10-22"
  },
  "001120": {
   "price": 43300,
   "date": "2026-10-22",
   "changePct": -0.8,
   "close": 43300,
   "closeDate": "2026-10-22"
  },
  "004370": {
   "price": 399500,
   "date": "2026-10-22",
   "changePct": -1.6,
   "close": 399500,
   "closeDate": "2026-10-22"
  },
  "062040": {
   "price": 173900,
   "date": "2026-10-22",
   "changePct": -3.9,
   "close": 173900,
   "closeDate": "2026-10-22"
  },
  "041830": {
   "price": 48250,
   "date": "2026-10-22",
   "changePct": -1.1,
   "close": 48250,
   "closeDate": "2026-10-22"
  },
  "005830": {
   "price": 187100,
   "date": "2026-10-22",
   "changePct": 0.8,
   "close": 187100,
   "closeDate": "2026-10-22"
  },
  "066570": {
   "price": 160000,
   "date": "2026-10-22",
   "changePct": -3.1,
   "close": 160000,
   "closeDate": "2026-10-22"
  },
  "086280": {
   "price": 178100,
   "date": "2026-10-22",
   "changePct": -2.8,
   "close": 178100,
   "closeDate": "2026-10-22"
  },
  "018260": {
   "price": 207000,
   "date": "2026-10-22",
   "changePct": 2.7,
   "close": 207000,
   "closeDate": "2026-10-22"
  },
  "005850": {
   "price": 50100,
   "date": "2026-10-22",
   "changePct": 0.2,
   "close": 50100,
   "closeDate": "2026-10-22"
  },
  "095340": {
   "price": 153900,
   "date": "2026-10-22",
   "changePct": -3.5,
   "close": 153900,
   "closeDate": "2026-10-22"
  },
  "005490": {
   "price": 286000,
   "date": "2026-10-22",
   "changePct": -5,
   "close": 286000,
   "closeDate": "2026-10-22"
  },
  "035420": {
   "price": 176400,
   "date": "2026-10-22",
   "changePct": -1.7,
   "close": 176400,
   "closeDate": "2026-10-22"
  },
  "010120": {
   "price": 161400,
   "date": "2026-10-22",
   "changePct": -2.8,
   "close": 161400,
   "closeDate": "2026-10-22"
  },
  "030200": {
   "price": 47550,
   "date": "2026-10-22",
   "changePct": -3.2,
   "close": 47550,
   "closeDate": "2026-10-22"
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
   "price": 5533.77,
   "date": "2026-10-22",
   "changePct": -3.5,
   "close": 5533.77,
   "closeDate": "2026-10-22"
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
