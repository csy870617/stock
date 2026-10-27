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
   "price": 5638.34,
   "date": "2026-10-27",
   "changePct": 3.1,
   "close": 5638.34,
   "closeDate": "2026-10-27"
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
