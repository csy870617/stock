// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-27",
 "quotes": {
  "103590": {
   "price": 56500,
   "date": "2026-10-27",
   "changePct": 3.1,
   "close": 56500,
   "closeDate": "2026-10-27"
  },
  "105560": {
   "price": 147600,
   "date": "2026-10-27",
   "changePct": 0.3,
   "close": 147600,
   "closeDate": "2026-10-27"
  },
  "119850": {
   "price": 36800,
   "date": "2026-10-27",
   "changePct": 1.8,
   "close": 36800,
   "closeDate": "2026-10-27"
  },
  "138040": {
   "price": 123000,
   "date": "2026-10-27",
   "changePct": -1.8,
   "close": 123000,
   "closeDate": "2026-10-27"
  },
  "139130": {
   "price": 14880,
   "date": "2026-10-27",
   "changePct": -1.4,
   "close": 14880,
   "closeDate": "2026-10-27"
  },
  "175330": {
   "price": 24300,
   "date": "2026-10-27",
   "changePct": 0.6,
   "close": 24300,
   "closeDate": "2026-10-27"
  },
  "207940": {
   "price": 1374000,
   "date": "2026-10-27",
   "changePct": -5.4,
   "close": 1374000,
   "closeDate": "2026-10-27"
  },
  "214450": {
   "price": 231500,
   "date": "2026-10-27",
   "changePct": 0.9,
   "close": 231500,
   "closeDate": "2026-10-27"
  },
  "241560": {
   "price": 48650,
   "date": "2026-10-27",
   "changePct": 0.2,
   "close": 48650,
   "closeDate": "2026-10-27"
  },
  "267250": {
   "price": 136200,
   "date": "2026-10-27",
   "changePct": 3,
   "close": 136200,
   "closeDate": "2026-10-27"
  },
  "267260": {
   "price": 450000,
   "date": "2026-10-27",
   "changePct": 0.7,
   "close": 450000,
   "closeDate": "2026-10-27"
  },
  "267270": {
   "price": 80800,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 80800,
   "closeDate": "2026-10-27"
  },
  "278470": {
   "price": 278000,
   "date": "2026-10-27",
   "changePct": -1.4,
   "close": 278000,
   "closeDate": "2026-10-27"
  },
  "298040": {
   "price": 1914000,
   "date": "2026-10-27",
   "changePct": 3.3,
   "close": 1914000,
   "closeDate": "2026-10-27"
  },
  "316140": {
   "price": 28850,
   "date": "2026-10-27",
   "changePct": -1.4,
   "close": 28850,
   "closeDate": "2026-10-27"
  },
  "323410": {
   "price": 19580,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 19580,
   "closeDate": "2026-10-27"
  },
  "329180": {
   "price": 291500,
   "date": "2026-10-27",
   "changePct": 0.7,
   "close": 291500,
   "closeDate": "2026-10-27"
  },
  "361610": {
   "price": 15840,
   "date": "2026-10-27",
   "changePct": 0.8,
   "close": 15840,
   "closeDate": "2026-10-27"
  },
  "403870": {
   "price": 46100,
   "date": "2026-10-27",
   "changePct": 2.7,
   "close": 46100,
   "closeDate": "2026-10-27"
  },
  "005930": {
   "price": 222000,
   "date": "2026-10-27",
   "changePct": 4.2,
   "close": 222000,
   "closeDate": "2026-10-27"
  },
  "055550": {
   "price": 85800,
   "date": "2026-10-27",
   "changePct": 0.4,
   "close": 85800,
   "closeDate": "2026-10-27"
  },
  "000810": {
   "price": 597000,
   "date": "2026-10-27",
   "changePct": 0.3,
   "close": 597000,
   "closeDate": "2026-10-27"
  },
  "028260": {
   "price": 301000,
   "date": "2026-10-27",
   "changePct": 3.1,
   "close": 301000,
   "closeDate": "2026-10-27"
  },
  "086790": {
   "price": 113300,
   "date": "2026-10-27",
   "changePct": 0.8,
   "close": 113300,
   "closeDate": "2026-10-27"
  },
  "012450": {
   "price": 768000,
   "date": "2026-10-27",
   "changePct": 1.1,
   "close": 768000,
   "closeDate": "2026-10-27"
  },
  "009540": {
   "price": 246500,
   "date": "2026-10-27",
   "changePct": 1.4,
   "close": 246500,
   "closeDate": "2026-10-27"
  },
  "068270": {
   "price": 188600,
   "date": "2026-10-27",
   "changePct": -0.7,
   "close": 188600,
   "closeDate": "2026-10-27"
  },
  "000270": {
   "price": 106500,
   "date": "2026-10-27",
   "changePct": 1.3,
   "close": 106500,
   "closeDate": "2026-10-27"
  },
  "032640": {
   "price": 13640,
   "date": "2026-10-27",
   "changePct": -2.8,
   "close": 13640,
   "closeDate": "2026-10-27"
  },
  "029780": {
   "price": 40750,
   "date": "2026-10-27",
   "changePct": -1.9,
   "close": 40750,
   "closeDate": "2026-10-27"
  },
  "058470": {
   "price": 61400,
   "date": "2026-10-27",
   "changePct": 4.1,
   "close": 61400,
   "closeDate": "2026-10-27"
  },
  "082920": {
   "price": 23400,
   "date": "2026-10-27",
   "changePct": 2.6,
   "close": 23400,
   "closeDate": "2026-10-27"
  },
  "064760": {
   "price": 213000,
   "date": "2026-10-27",
   "changePct": 6.9,
   "close": 213000,
   "closeDate": "2026-10-27"
  },
  "035900": {
   "price": 38450,
   "date": "2026-10-27",
   "changePct": 6.8,
   "close": 38450,
   "closeDate": "2026-10-27"
  },
  "021240": {
   "price": 103200,
   "date": "2026-10-27",
   "changePct": -0.6,
   "close": 103200,
   "closeDate": "2026-10-27"
  },
  "036570": {
   "price": 198700,
   "date": "2026-10-27",
   "changePct": -1.4,
   "close": 198700,
   "closeDate": "2026-10-27"
  },
  "035720": {
   "price": 29500,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 29500,
   "closeDate": "2026-10-27"
  },
  "001040": {
   "price": 112900,
   "date": "2026-10-27",
   "changePct": -2.2,
   "close": 112900,
   "closeDate": "2026-10-27"
  },
  "012750": {
   "price": 95300,
   "date": "2026-10-27",
   "changePct": 2.1,
   "close": 95300,
   "closeDate": "2026-10-27"
  },
  "000660": {
   "price": 1341000,
   "date": "2026-10-27",
   "changePct": 5.2,
   "close": 1341000,
   "closeDate": "2026-10-27"
  },
  "033780": {
   "price": 186700,
   "date": "2026-10-27",
   "changePct": -1.2,
   "close": 186700,
   "closeDate": "2026-10-27"
  },
  "001120": {
   "price": 41400,
   "date": "2026-10-27",
   "changePct": 0.5,
   "close": 41400,
   "closeDate": "2026-10-27"
  },
  "004370": {
   "price": 393000,
   "date": "2026-10-27",
   "changePct": 0,
   "close": 393000,
   "closeDate": "2026-10-27"
  },
  "062040": {
   "price": 160200,
   "date": "2026-10-27",
   "changePct": 0.4,
   "close": 160200,
   "closeDate": "2026-10-27"
  },
  "041830": {
   "price": 45950,
   "date": "2026-10-27",
   "changePct": 0.7,
   "close": 45950,
   "closeDate": "2026-10-27"
  },
  "005830": {
   "price": 178400,
   "date": "2026-10-27",
   "changePct": -0.7,
   "close": 178400,
   "closeDate": "2026-10-27"
  },
  "066570": {
   "price": 157500,
   "date": "2026-10-27",
   "changePct": 1,
   "close": 157500,
   "closeDate": "2026-10-27"
  },
  "086280": {
   "price": 180400,
   "date": "2026-10-27",
   "changePct": 2.4,
   "close": 180400,
   "closeDate": "2026-10-27"
  },
  "018260": {
   "price": 215000,
   "date": "2026-10-27",
   "changePct": 0.9,
   "close": 215000,
   "closeDate": "2026-10-27"
  },
  "005850": {
   "price": 49500,
   "date": "2026-10-27",
   "changePct": 1.5,
   "close": 49500,
   "closeDate": "2026-10-27"
  },
  "095340": {
   "price": 151300,
   "date": "2026-10-27",
   "changePct": 7.6,
   "close": 151300,
   "closeDate": "2026-10-27"
  },
  "005490": {
   "price": 276000,
   "date": "2026-10-27",
   "changePct": 2.4,
   "close": 276000,
   "closeDate": "2026-10-27"
  },
  "035420": {
   "price": 174300,
   "date": "2026-10-27",
   "changePct": 0.1,
   "close": 174300,
   "closeDate": "2026-10-27"
  },
  "010120": {
   "price": 158100,
   "date": "2026-10-27",
   "changePct": 3.4,
   "close": 158100,
   "closeDate": "2026-10-27"
  },
  "030200": {
   "price": 44700,
   "date": "2026-10-27",
   "changePct": -2.2,
   "close": 44700,
   "closeDate": "2026-10-27"
  },
  "012330": {
   "price": 332500,
   "date": "2026-10-27",
   "changePct": 2,
   "close": 332500,
   "closeDate": "2026-10-27"
  },
  "MSFT": {
   "price": 531.33,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 531.33,
   "closeDate": "2026-10-27"
  },
  "V": {
   "price": 401.86,
   "date": "2026-10-27",
   "changePct": -0.6,
   "close": 401.86,
   "closeDate": "2026-10-27"
  },
  "MA": {
   "price": 609.85,
   "date": "2026-10-27",
   "changePct": -0.6,
   "close": 609.85,
   "closeDate": "2026-10-27"
  },
  "GOOGL": {
   "price": 320.58,
   "date": "2026-10-27",
   "changePct": 1.2,
   "close": 320.58,
   "closeDate": "2026-10-27"
  },
  "COST": {
   "price": 992.13,
   "date": "2026-10-27",
   "changePct": -1.3,
   "close": 992.13,
   "closeDate": "2026-10-27"
  },
  "NVDA": {
   "price": 217.94,
   "date": "2026-10-27",
   "changePct": 0.9,
   "close": 217.94,
   "closeDate": "2026-10-27"
  },
  "META": {
   "price": 620.19,
   "date": "2026-10-27",
   "changePct": -1.6,
   "close": 620.19,
   "closeDate": "2026-10-27"
  },
  "AVGO": {
   "price": 342.33,
   "date": "2026-10-27",
   "changePct": 4,
   "close": 342.33,
   "closeDate": "2026-10-27"
  },
  "AMZN": {
   "price": 253.1,
   "date": "2026-10-27",
   "changePct": 1.6,
   "close": 253.1,
   "closeDate": "2026-10-27"
  },
  "TSM": {
   "price": 436.87,
   "date": "2026-10-27",
   "changePct": 2.9,
   "close": 436.87,
   "closeDate": "2026-10-27"
  },
  "UBER": {
   "price": 65.78,
   "date": "2026-10-27",
   "changePct": -0.5,
   "close": 65.78,
   "closeDate": "2026-10-27"
  },
  "GM": {
   "price": 80.54,
   "date": "2026-10-27",
   "changePct": 5.5,
   "close": 80.54,
   "closeDate": "2026-10-27"
  },
  "VZ": {
   "price": 43.93,
   "date": "2026-10-27",
   "changePct": 1.9,
   "close": 43.93,
   "closeDate": "2026-10-27"
  },
  "C": {
   "price": 122.69,
   "date": "2026-10-27",
   "changePct": 1.4,
   "close": 122.69,
   "closeDate": "2026-10-27"
  },
  "DUK": {
   "price": 124.8,
   "date": "2026-10-27",
   "changePct": 0.3,
   "close": 124.8,
   "closeDate": "2026-10-27"
  },
  "KO": {
   "price": 91.18,
   "date": "2026-10-27",
   "changePct": -1.6,
   "close": 91.18,
   "closeDate": "2026-10-27"
  },
  "JNJ": {
   "price": 268.73,
   "date": "2026-10-27",
   "changePct": 0.9,
   "close": 268.73,
   "closeDate": "2026-10-27"
  },
  "NXT": {
   "price": 79.44,
   "date": "2026-10-27",
   "changePct": 3.9,
   "close": 79.44,
   "closeDate": "2026-10-27"
  },
  "LLY": {
   "price": 1281.91,
   "date": "2026-10-27",
   "changePct": 0.2,
   "close": 1281.91,
   "closeDate": "2026-10-27"
  },
  "CI": {
   "price": 298.28,
   "date": "2026-10-27",
   "changePct": -2.5,
   "close": 298.28,
   "closeDate": "2026-10-27"
  },
  "NOW": {
   "price": 154.78,
   "date": "2026-10-27",
   "changePct": -2.1,
   "close": 154.78,
   "closeDate": "2026-10-27"
  },
  "TSLA": {
   "price": 407.46,
   "date": "2026-10-27",
   "changePct": 4,
   "close": 407.46,
   "closeDate": "2026-10-27"
  },
  "MDLZ": {
   "price": 62.35,
   "date": "2026-10-27",
   "changePct": -1,
   "close": 62.35,
   "closeDate": "2026-10-27"
  },
  "AAPL": {
   "price": 347.1,
   "date": "2026-10-27",
   "changePct": 0.9,
   "close": 347.1,
   "closeDate": "2026-10-27"
  },
  "MU": {
   "price": 928.76,
   "date": "2026-10-27",
   "changePct": 2.8,
   "close": 928.76,
   "closeDate": "2026-10-27"
  },
  "MDT": {
   "price": 93.95,
   "date": "2026-10-27",
   "changePct": -0.9,
   "close": 93.95,
   "closeDate": "2026-10-27"
  },
  "IREN": {
   "price": 27.44,
   "date": "2026-10-27",
   "changePct": 7.9,
   "close": 27.44,
   "closeDate": "2026-10-27"
  },
  "UNH": {
   "price": 410.39,
   "date": "2026-10-27",
   "changePct": -0.1,
   "close": 410.39,
   "closeDate": "2026-10-27"
  },
  "GILD": {
   "price": 159.08,
   "date": "2026-10-27",
   "changePct": 0.2,
   "close": 159.08,
   "closeDate": "2026-10-27"
  },
  "BRK.B": {
   "price": 542.99,
   "date": "2026-10-27",
   "changePct": -1,
   "close": 542.99,
   "closeDate": "2026-10-27"
  },
  "TMO": {
   "price": 693.02,
   "date": "2026-10-27",
   "changePct": 1.2,
   "close": 693.02,
   "closeDate": "2026-10-27"
  },
  "ECL": {
   "price": 291.27,
   "date": "2026-10-27",
   "changePct": 0.8,
   "close": 291.27,
   "closeDate": "2026-10-27"
  },
  "NVT": {
   "price": 134.53,
   "date": "2026-10-27",
   "changePct": 4.1,
   "close": 134.53,
   "closeDate": "2026-10-27"
  },
  "FSS": {
   "price": 115.81,
   "date": "2026-10-27",
   "changePct": 1.5,
   "close": 115.81,
   "closeDate": "2026-10-27"
  },
  "AAON": {
   "price": 75.83,
   "date": "2026-10-27",
   "changePct": 7.1,
   "close": 75.83,
   "closeDate": "2026-10-27"
  },
  "NVMI": {
   "price": 327.6,
   "date": "2026-10-27",
   "changePct": 3.6,
   "close": 327.6,
   "closeDate": "2026-10-27"
  },
  "POWL": {
   "price": 161.36,
   "date": "2026-10-27",
   "changePct": 2.7,
   "close": 161.36,
   "closeDate": "2026-10-27"
  },
  "MSI": {
   "price": 483.61,
   "date": "2026-10-27",
   "changePct": -0.4,
   "close": 483.61,
   "closeDate": "2026-10-27"
  },
  "DVN": {
   "price": 51.23,
   "date": "2026-10-27",
   "changePct": -0.8,
   "close": 51.23,
   "closeDate": "2026-10-27"
  },
  "GS": {
   "price": 911.77,
   "date": "2026-10-27",
   "changePct": 2.1,
   "close": 911.77,
   "closeDate": "2026-10-27"
  },
  "AMP": {
   "price": 492.85,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 492.85,
   "closeDate": "2026-10-27"
  },
  "PNC": {
   "price": 227.54,
   "date": "2026-10-27",
   "changePct": 0.8,
   "close": 227.54,
   "closeDate": "2026-10-27"
  },
  "MTB": {
   "price": 221.31,
   "date": "2026-10-27",
   "changePct": -0.2,
   "close": 221.31,
   "closeDate": "2026-10-27"
  },
  "SO": {
   "price": 92.65,
   "date": "2026-10-27",
   "changePct": 0.1,
   "close": 92.65,
   "closeDate": "2026-10-27"
  },
  "WEC": {
   "price": 111.43,
   "date": "2026-10-27",
   "changePct": 0.3,
   "close": 111.43,
   "closeDate": "2026-10-27"
  },
  "MSCI": {
   "price": 601.75,
   "date": "2026-10-27",
   "changePct": -2.6,
   "close": 601.75,
   "closeDate": "2026-10-27"
  },
  "RSG": {
   "price": 235.66,
   "date": "2026-10-27",
   "changePct": -2.3,
   "close": 235.66,
   "closeDate": "2026-10-27"
  },
  "CTAS": {
   "price": 214.8,
   "date": "2026-10-27",
   "changePct": -4.9,
   "close": 214.8,
   "closeDate": "2026-10-27"
  },
  "TJX": {
   "price": 140.2,
   "date": "2026-10-27",
   "changePct": -2.4,
   "close": 140.2,
   "closeDate": "2026-10-27"
  },
  "ANET": {
   "price": 187,
   "date": "2026-10-27",
   "changePct": 5.5,
   "close": 187,
   "closeDate": "2026-10-27"
  },
  "GD": {
   "price": 354.89,
   "date": "2026-10-27",
   "changePct": -0.6,
   "close": 354.89,
   "closeDate": "2026-10-27"
  },
  "APPF": {
   "price": 201.445,
   "date": "2026-10-27",
   "changePct": -6,
   "close": 201.445,
   "closeDate": "2026-10-27"
  },
  "CB": {
   "price": 356.25,
   "date": "2026-10-27",
   "changePct": -0.1,
   "close": 356.25,
   "closeDate": "2026-10-27"
  },
  "ADP": {
   "price": 293.11,
   "date": "2026-10-27",
   "changePct": -2.7,
   "close": 293.11,
   "closeDate": "2026-10-27"
  },
  "LMT": {
   "price": 622.99,
   "date": "2026-10-27",
   "changePct": -1.9,
   "close": 622.99,
   "closeDate": "2026-10-27"
  },
  "ORLY": {
   "price": 89.82,
   "date": "2026-10-27",
   "changePct": -1.4,
   "close": 89.82,
   "closeDate": "2026-10-27"
  },
  "YUM": {
   "price": 149.54,
   "date": "2026-10-27",
   "changePct": 0,
   "close": 149.54,
   "closeDate": "2026-10-27"
  },
  "FIVE": {
   "price": 231.25,
   "date": "2026-10-27",
   "changePct": 0.5,
   "close": 231.25,
   "closeDate": "2026-10-27"
  },
  "STRL": {
   "price": 367.5,
   "date": "2026-10-27",
   "changePct": 1.9,
   "close": 367.5,
   "closeDate": "2026-10-27"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5638.34,
   "date": "2026-10-27",
   "changePct": 3.1,
   "close": 5638.34,
   "closeDate": "2026-10-27"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7722.6,
   "date": "2026-10-27",
   "changePct": 0.6,
   "close": 7722.6,
   "closeDate": "2026-10-27"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 217.52,
   "date": "2026-10-27",
   "changePct": 0.1,
   "close": 217.52,
   "closeDate": "2026-10-27"
  }
 }
};
