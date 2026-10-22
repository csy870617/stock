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
   "price": 532.95,
   "date": "2026-10-21",
   "changePct": 0.2,
   "close": 532.95,
   "closeDate": "2026-10-21"
  },
  "V": {
   "price": 407.85,
   "date": "2026-10-21",
   "changePct": 0.3,
   "close": 407.85,
   "closeDate": "2026-10-21"
  },
  "MA": {
   "price": 622.62,
   "date": "2026-10-21",
   "changePct": 0.4,
   "close": 622.62,
   "closeDate": "2026-10-21"
  },
  "GOOGL": {
   "price": 334.76,
   "date": "2026-10-21",
   "changePct": -1.6,
   "close": 334.76,
   "closeDate": "2026-10-21"
  },
  "COST": {
   "price": 998.31,
   "date": "2026-10-21",
   "changePct": 0.4,
   "close": 998.31,
   "closeDate": "2026-10-21"
  },
  "NVDA": {
   "price": 221.97,
   "date": "2026-10-21",
   "changePct": 2.5,
   "close": 221.97,
   "closeDate": "2026-10-21"
  },
  "META": {
   "price": 697.52,
   "date": "2026-10-21",
   "changePct": 0.5,
   "close": 697.52,
   "closeDate": "2026-10-21"
  },
  "AVGO": {
   "price": 337.8,
   "date": "2026-10-21",
   "changePct": 1,
   "close": 337.8,
   "closeDate": "2026-10-21"
  },
  "AMZN": {
   "price": 262.37,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 262.37,
   "closeDate": "2026-10-21"
  },
  "TSM": {
   "price": 431.89,
   "date": "2026-10-21",
   "changePct": 1.6,
   "close": 431.89,
   "closeDate": "2026-10-21"
  },
  "UBER": {
   "price": 67.62,
   "date": "2026-10-21",
   "changePct": -1.9,
   "close": 67.62,
   "closeDate": "2026-10-21"
  },
  "GM": {
   "price": 76.11,
   "date": "2026-10-21",
   "changePct": -1.3,
   "close": 76.11,
   "closeDate": "2026-10-21"
  },
  "VZ": {
   "price": 43.56,
   "date": "2026-10-21",
   "changePct": -2.2,
   "close": 43.56,
   "closeDate": "2026-10-21"
  },
  "C": {
   "price": 123.85,
   "date": "2026-10-21",
   "changePct": 1.1,
   "close": 123.85,
   "closeDate": "2026-10-21"
  },
  "DUK": {
   "price": 120.67,
   "date": "2026-10-21",
   "changePct": -0.5,
   "close": 120.67,
   "closeDate": "2026-10-21"
  },
  "KO": {
   "price": 92.68,
   "date": "2026-10-21",
   "changePct": -0.9,
   "close": 92.68,
   "closeDate": "2026-10-21"
  },
  "JNJ": {
   "price": 257.78,
   "date": "2026-10-21",
   "changePct": -0.6,
   "close": 257.78,
   "closeDate": "2026-10-21"
  },
  "NXT": {
   "price": 81.77,
   "date": "2026-10-21",
   "changePct": 3.5,
   "close": 81.77,
   "closeDate": "2026-10-21"
  },
  "LLY": {
   "price": 1270.75,
   "date": "2026-10-21",
   "changePct": -1,
   "close": 1270.75,
   "closeDate": "2026-10-21"
  },
  "CI": {
   "price": 304.37,
   "date": "2026-10-21",
   "changePct": -0.7,
   "close": 304.37,
   "closeDate": "2026-10-21"
  },
  "NOW": {
   "price": 153.12,
   "date": "2026-10-21",
   "changePct": 2.4,
   "close": 153.12,
   "closeDate": "2026-10-21"
  },
  "TSLA": {
   "price": 386.47,
   "date": "2026-10-21",
   "changePct": 3.4,
   "close": 386.47,
   "closeDate": "2026-10-21"
  },
  "PG": {
   "price": 156.84,
   "date": "2026-10-21",
   "changePct": -1.6,
   "close": 156.84,
   "closeDate": "2026-10-21"
  },
  "MDLZ": {
   "price": 62.74,
   "date": "2026-10-21",
   "changePct": -2,
   "close": 62.74,
   "closeDate": "2026-10-21"
  },
  "AAPL": {
   "price": 343.99,
   "date": "2026-10-21",
   "changePct": 1.3,
   "close": 343.99,
   "closeDate": "2026-10-21"
  },
  "MU": {
   "price": 913.67,
   "date": "2026-10-21",
   "changePct": 2,
   "close": 913.67,
   "closeDate": "2026-10-21"
  },
  "MDT": {
   "price": 93.03,
   "date": "2026-10-21",
   "changePct": -1.7,
   "close": 93.03,
   "closeDate": "2026-10-21"
  },
  "IREN": {
   "price": 27.84,
   "date": "2026-10-21",
   "changePct": 4.6,
   "close": 27.84,
   "closeDate": "2026-10-21"
  },
  "UNH": {
   "price": 417,
   "date": "2026-10-21",
   "changePct": -0.5,
   "close": 417,
   "closeDate": "2026-10-21"
  },
  "GILD": {
   "price": 153.57,
   "date": "2026-10-21",
   "changePct": -1.9,
   "close": 153.57,
   "closeDate": "2026-10-21"
  },
  "BRK.B": {
   "price": 538.99,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 538.99,
   "closeDate": "2026-10-21"
  },
  "TMO": {
   "price": 694.02,
   "date": "2026-10-21",
   "changePct": 1,
   "close": 694.02,
   "closeDate": "2026-10-21"
  },
  "ECL": {
   "price": 288.09,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 288.09,
   "closeDate": "2026-10-21"
  },
  "NVT": {
   "price": 146.13,
   "date": "2026-10-21",
   "changePct": 4.5,
   "close": 146.13,
   "closeDate": "2026-10-21"
  },
  "FSS": {
   "price": 116.69,
   "date": "2026-10-21",
   "changePct": 1.8,
   "close": 116.69,
   "closeDate": "2026-10-21"
  },
  "MKSI": {
   "price": 216.1,
   "date": "2026-10-21",
   "changePct": 2.3,
   "close": 216.1,
   "closeDate": "2026-10-21"
  },
  "AAON": {
   "price": 75.23,
   "date": "2026-10-21",
   "changePct": 1.8,
   "close": 75.23,
   "closeDate": "2026-10-21"
  },
  "NVMI": {
   "price": 331.22,
   "date": "2026-10-21",
   "changePct": 3.5,
   "close": 331.22,
   "closeDate": "2026-10-21"
  },
  "POWL": {
   "price": 170.32,
   "date": "2026-10-21",
   "changePct": 3.3,
   "close": 170.32,
   "closeDate": "2026-10-21"
  },
  "TXN": {
   "price": 284.65,
   "date": "2026-10-21",
   "changePct": 2.5,
   "close": 284.65,
   "closeDate": "2026-10-21"
  },
  "MSI": {
   "price": 467.5,
   "date": "2026-10-21",
   "changePct": 0.9,
   "close": 467.5,
   "closeDate": "2026-10-21"
  },
  "DVN": {
   "price": 49.87,
   "date": "2026-10-21",
   "changePct": -1,
   "close": 49.87,
   "closeDate": "2026-10-21"
  },
  "RBC": {
   "price": 504.49,
   "date": "2026-10-21",
   "changePct": 1.8,
   "close": 504.49,
   "closeDate": "2026-10-21"
  },
  "GS": {
   "price": 904.72,
   "date": "2026-10-21",
   "changePct": 2.3,
   "close": 904.72,
   "closeDate": "2026-10-21"
  },
  "AMP": {
   "price": 490.51,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 490.51,
   "closeDate": "2026-10-21"
  },
  "PNC": {
   "price": 222.89,
   "date": "2026-10-21",
   "changePct": 0.9,
   "close": 222.89,
   "closeDate": "2026-10-21"
  },
  "MTB": {
   "price": 219.51,
   "date": "2026-10-21",
   "changePct": 0.5,
   "close": 219.51,
   "closeDate": "2026-10-21"
  },
  "SO": {
   "price": 90.39,
   "date": "2026-10-21",
   "changePct": -0.4,
   "close": 90.39,
   "closeDate": "2026-10-21"
  },
  "WEC": {
   "price": 108.5,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 108.5,
   "closeDate": "2026-10-21"
  },
  "MSCI": {
   "price": 604.46,
   "date": "2026-10-21",
   "changePct": 2.2,
   "close": 604.46,
   "closeDate": "2026-10-21"
  },
  "RSG": {
   "price": 230.32,
   "date": "2026-10-21",
   "changePct": -1.1,
   "close": 230.32,
   "closeDate": "2026-10-21"
  },
  "CTAS": {
   "price": 220.15,
   "date": "2026-10-21",
   "changePct": 1.4,
   "close": 220.15,
   "closeDate": "2026-10-21"
  },
  "TJX": {
   "price": 145.52,
   "date": "2026-10-21",
   "changePct": -1,
   "close": 145.52,
   "closeDate": "2026-10-21"
  },
  "ANET": {
   "price": 184.33,
   "date": "2026-10-21",
   "changePct": 1.7,
   "close": 184.33,
   "closeDate": "2026-10-21"
  },
  "GD": {
   "price": 344.71,
   "date": "2026-10-21",
   "changePct": 0.1,
   "close": 344.71,
   "closeDate": "2026-10-21"
  },
  "APPF": {
   "price": 217.2,
   "date": "2026-10-21",
   "changePct": -2.9,
   "close": 217.2,
   "closeDate": "2026-10-21"
  },
  "CB": {
   "price": 354.95,
   "date": "2026-10-21",
   "changePct": -0.8,
   "close": 354.95,
   "closeDate": "2026-10-21"
  },
  "ADP": {
   "price": 294.5,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 294.5,
   "closeDate": "2026-10-21"
  },
  "LMT": {
   "price": 551.51,
   "date": "2026-10-21",
   "changePct": 0.5,
   "close": 551.51,
   "closeDate": "2026-10-21"
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
   "price": 7757.17,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 7757.17,
   "closeDate": "2026-10-21"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 216.64,
   "date": "2026-10-21",
   "changePct": 0.4,
   "close": 216.64,
   "closeDate": "2026-10-21"
  }
 }
};
