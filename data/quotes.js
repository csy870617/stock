// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-21",
 "quotes": {
  "105560": {
   "price": 160600,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 160600,
   "closeDate": "2026-10-21"
  },
  "119850": {
   "price": 42100,
   "date": "2026-10-21",
   "changePct": 7.3,
   "close": 42100,
   "closeDate": "2026-10-21"
  },
  "138040": {
   "price": 130500,
   "date": "2026-10-21",
   "changePct": 0.9,
   "close": 130500,
   "closeDate": "2026-10-21"
  },
  "139130": {
   "price": 16430,
   "date": "2026-10-21",
   "changePct": 0.1,
   "close": 16430,
   "closeDate": "2026-10-21"
  },
  "175330": {
   "price": 26300,
   "date": "2026-10-21",
   "changePct": -1.9,
   "close": 26300,
   "closeDate": "2026-10-21"
  },
  "207940": {
   "price": 1417000,
   "date": "2026-10-21",
   "changePct": 1.9,
   "close": 1417000,
   "closeDate": "2026-10-21"
  },
  "214450": {
   "price": 264000,
   "date": "2026-10-21",
   "changePct": -0.8,
   "close": 264000,
   "closeDate": "2026-10-21"
  },
  "241560": {
   "price": 50900,
   "date": "2026-10-21",
   "changePct": 0.8,
   "close": 50900,
   "closeDate": "2026-10-21"
  },
  "267250": {
   "price": 147800,
   "date": "2026-10-21",
   "changePct": -0.6,
   "close": 147800,
   "closeDate": "2026-10-21"
  },
  "267260": {
   "price": 499000,
   "date": "2026-10-21",
   "changePct": 2.4,
   "close": 499000,
   "closeDate": "2026-10-21"
  },
  "267270": {
   "price": 93900,
   "date": "2026-10-21",
   "changePct": 4.7,
   "close": 93900,
   "closeDate": "2026-10-21"
  },
  "278470": {
   "price": 319000,
   "date": "2026-10-21",
   "changePct": 2.9,
   "close": 319000,
   "closeDate": "2026-10-21"
  },
  "298040": {
   "price": 1949000,
   "date": "2026-10-21",
   "changePct": 3,
   "close": 1949000,
   "closeDate": "2026-10-21"
  },
  "316140": {
   "price": 31500,
   "date": "2026-10-21",
   "changePct": -0.9,
   "close": 31500,
   "closeDate": "2026-10-21"
  },
  "323410": {
   "price": 20200,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 20200,
   "closeDate": "2026-10-21"
  },
  "329180": {
   "price": 320000,
   "date": "2026-10-21",
   "changePct": 0.6,
   "close": 320000,
   "closeDate": "2026-10-21"
  },
  "361610": {
   "price": 17760,
   "date": "2026-10-21",
   "changePct": 4.2,
   "close": 17760,
   "closeDate": "2026-10-21"
  },
  "403870": {
   "price": 50900,
   "date": "2026-10-21",
   "changePct": 1.2,
   "close": 50900,
   "closeDate": "2026-10-21"
  },
  "005930": {
   "price": 223500,
   "date": "2026-10-21",
   "changePct": 5.7,
   "close": 223500,
   "closeDate": "2026-10-21"
  },
  "055550": {
   "price": 91700,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 91700,
   "closeDate": "2026-10-21"
  },
  "000810": {
   "price": 601000,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 601000,
   "closeDate": "2026-10-21"
  },
  "028260": {
   "price": 290000,
   "date": "2026-10-21",
   "changePct": 5.5,
   "close": 290000,
   "closeDate": "2026-10-21"
  },
  "086790": {
   "price": 121800,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 121800,
   "closeDate": "2026-10-21"
  },
  "012450": {
   "price": 814000,
   "date": "2026-10-21",
   "changePct": 1.9,
   "close": 814000,
   "closeDate": "2026-10-21"
  },
  "009540": {
   "price": 260000,
   "date": "2026-10-21",
   "changePct": 2.2,
   "close": 260000,
   "closeDate": "2026-10-21"
  },
  "068270": {
   "price": 197600,
   "date": "2026-10-21",
   "changePct": 0.1,
   "close": 197600,
   "closeDate": "2026-10-21"
  },
  "000270": {
   "price": 110500,
   "date": "2026-10-21",
   "changePct": -1.7,
   "close": 110500,
   "closeDate": "2026-10-21"
  },
  "032640": {
   "price": 14820,
   "date": "2026-10-21",
   "changePct": -3.4,
   "close": 14820,
   "closeDate": "2026-10-21"
  },
  "029780": {
   "price": 42100,
   "date": "2026-10-21",
   "changePct": -1.6,
   "close": 42100,
   "closeDate": "2026-10-21"
  },
  "058470": {
   "price": 67400,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 67400,
   "closeDate": "2026-10-21"
  },
  "082920": {
   "price": 23700,
   "date": "2026-10-21",
   "changePct": -2.1,
   "close": 23700,
   "closeDate": "2026-10-21"
  },
  "064760": {
   "price": 231000,
   "date": "2026-10-21",
   "changePct": 3.6,
   "close": 231000,
   "closeDate": "2026-10-21"
  },
  "035900": {
   "price": 39700,
   "date": "2026-10-21",
   "changePct": 0.3,
   "close": 39700,
   "closeDate": "2026-10-21"
  },
  "021240": {
   "price": 106600,
   "date": "2026-10-21",
   "changePct": -1,
   "close": 106600,
   "closeDate": "2026-10-21"
  },
  "036570": {
   "price": 214000,
   "date": "2026-10-21",
   "changePct": -2.9,
   "close": 214000,
   "closeDate": "2026-10-21"
  },
  "035720": {
   "price": 30950,
   "date": "2026-10-21",
   "changePct": -1.9,
   "close": 30950,
   "closeDate": "2026-10-21"
  },
  "001040": {
   "price": 121500,
   "date": "2026-10-21",
   "changePct": 1.3,
   "close": 121500,
   "closeDate": "2026-10-21"
  },
  "012750": {
   "price": 97100,
   "date": "2026-10-21",
   "changePct": -0.2,
   "close": 97100,
   "closeDate": "2026-10-21"
  },
  "047050": {
   "price": 53900,
   "date": "2026-10-21",
   "changePct": -3.1,
   "close": 53900,
   "closeDate": "2026-10-21"
  },
  "000660": {
   "price": 1294000,
   "date": "2026-10-21",
   "changePct": 5.8,
   "close": 1294000,
   "closeDate": "2026-10-21"
  },
  "033780": {
   "price": 194000,
   "date": "2026-10-21",
   "changePct": 0,
   "close": 194000,
   "closeDate": "2026-10-21"
  },
  "001120": {
   "price": 43650,
   "date": "2026-10-21",
   "changePct": -2.2,
   "close": 43650,
   "closeDate": "2026-10-21"
  },
  "004370": {
   "price": 406000,
   "date": "2026-10-21",
   "changePct": -1.3,
   "close": 406000,
   "closeDate": "2026-10-21"
  },
  "062040": {
   "price": 181000,
   "date": "2026-10-21",
   "changePct": 3.9,
   "close": 181000,
   "closeDate": "2026-10-21"
  },
  "041830": {
   "price": 48800,
   "date": "2026-10-21",
   "changePct": -3.2,
   "close": 48800,
   "closeDate": "2026-10-21"
  },
  "005830": {
   "price": 185600,
   "date": "2026-10-21",
   "changePct": -1.5,
   "close": 185600,
   "closeDate": "2026-10-21"
  },
  "066570": {
   "price": 165100,
   "date": "2026-10-21",
   "changePct": 1,
   "close": 165100,
   "closeDate": "2026-10-21"
  },
  "086280": {
   "price": 183300,
   "date": "2026-10-21",
   "changePct": -0.1,
   "close": 183300,
   "closeDate": "2026-10-21"
  },
  "018260": {
   "price": 201500,
   "date": "2026-10-21",
   "changePct": 1.4,
   "close": 201500,
   "closeDate": "2026-10-21"
  },
  "005850": {
   "price": 50000,
   "date": "2026-10-21",
   "changePct": -0.4,
   "close": 50000,
   "closeDate": "2026-10-21"
  },
  "095340": {
   "price": 159500,
   "date": "2026-10-21",
   "changePct": 1.9,
   "close": 159500,
   "closeDate": "2026-10-21"
  },
  "005490": {
   "price": 301000,
   "date": "2026-10-21",
   "changePct": -0.3,
   "close": 301000,
   "closeDate": "2026-10-21"
  },
  "035420": {
   "price": 179500,
   "date": "2026-10-21",
   "changePct": 0.8,
   "close": 179500,
   "closeDate": "2026-10-21"
  },
  "010120": {
   "price": 166100,
   "date": "2026-10-21",
   "changePct": 7,
   "close": 166100,
   "closeDate": "2026-10-21"
  },
  "030200": {
   "price": 49100,
   "date": "2026-10-21",
   "changePct": -3,
   "close": 49100,
   "closeDate": "2026-10-21"
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
   "price": 5735.66,
   "date": "2026-10-21",
   "changePct": 3.3,
   "close": 5735.66,
   "closeDate": "2026-10-21"
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
