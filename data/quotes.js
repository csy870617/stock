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
  "192400": {
   "price": 27550,
   "date": "2026-10-30",
   "changePct": 1.7,
   "close": 27550,
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
  "030190": {
   "price": 17380,
   "date": "2026-10-30",
   "changePct": 0.9,
   "close": 17380,
   "closeDate": "2026-10-30"
  },
  "MSFT": {
   "price": 521.91,
   "date": "2026-10-30",
   "changePct": -1.6,
   "close": 521.91,
   "closeDate": "2026-10-30"
  },
  "V": {
   "price": 413.59,
   "date": "2026-10-30",
   "changePct": 0.7,
   "close": 413.59,
   "closeDate": "2026-10-30"
  },
  "MA": {
   "price": 638.01,
   "date": "2026-10-30",
   "changePct": 0.4,
   "close": 638.01,
   "closeDate": "2026-10-30"
  },
  "GOOGL": {
   "price": 279.84,
   "date": "2026-10-30",
   "changePct": -1.4,
   "close": 279.84,
   "closeDate": "2026-10-30"
  },
  "COST": {
   "price": 1012.28,
   "date": "2026-10-30",
   "changePct": 1.6,
   "close": 1012.28,
   "closeDate": "2026-10-30"
  },
  "NVDA": {
   "price": 204.64,
   "date": "2026-10-30",
   "changePct": -4.2,
   "close": 204.64,
   "closeDate": "2026-10-30"
  },
  "META": {
   "price": 614.99,
   "date": "2026-10-30",
   "changePct": -1.5,
   "close": 614.99,
   "closeDate": "2026-10-30"
  },
  "AVGO": {
   "price": 326.08,
   "date": "2026-10-30",
   "changePct": -5.5,
   "close": 326.08,
   "closeDate": "2026-10-30"
  },
  "AMZN": {
   "price": 240.35,
   "date": "2026-10-30",
   "changePct": -1.4,
   "close": 240.35,
   "closeDate": "2026-10-30"
  },
  "TSM": {
   "price": 406.13,
   "date": "2026-10-30",
   "changePct": -5.9,
   "close": 406.13,
   "closeDate": "2026-10-30"
  },
  "UBER": {
   "price": 65.25,
   "date": "2026-10-30",
   "changePct": -0.7,
   "close": 65.25,
   "closeDate": "2026-10-30"
  },
  "GM": {
   "price": 87.4,
   "date": "2026-10-30",
   "changePct": 2,
   "close": 87.4,
   "closeDate": "2026-10-30"
  },
  "VZ": {
   "price": 44.73,
   "date": "2026-10-30",
   "changePct": 2.5,
   "close": 44.73,
   "closeDate": "2026-10-30"
  },
  "C": {
   "price": 122.64,
   "date": "2026-10-30",
   "changePct": -2.5,
   "close": 122.64,
   "closeDate": "2026-10-30"
  },
  "DUK": {
   "price": 127.39,
   "date": "2026-10-30",
   "changePct": 1.2,
   "close": 127.39,
   "closeDate": "2026-10-30"
  },
  "KO": {
   "price": 94.08,
   "date": "2026-10-30",
   "changePct": 1.4,
   "close": 94.08,
   "closeDate": "2026-10-30"
  },
  "JNJ": {
   "price": 273.2,
   "date": "2026-10-30",
   "changePct": -0.7,
   "close": 273.2,
   "closeDate": "2026-10-30"
  },
  "NXT": {
   "price": 79.33,
   "date": "2026-10-30",
   "changePct": -0.6,
   "close": 79.33,
   "closeDate": "2026-10-30"
  },
  "LLY": {
   "price": 1417.54,
   "date": "2026-10-30",
   "changePct": 3.2,
   "close": 1417.54,
   "closeDate": "2026-10-30"
  },
  "CI": {
   "price": 298.23,
   "date": "2026-10-30",
   "changePct": -0.1,
   "close": 298.23,
   "closeDate": "2026-10-30"
  },
  "NOW": {
   "price": 105.12,
   "date": "2026-10-30",
   "changePct": -4.1,
   "close": 105.12,
   "closeDate": "2026-10-30"
  },
  "TSLA": {
   "price": 399.81,
   "date": "2026-10-30",
   "changePct": -0.9,
   "close": 399.81,
   "closeDate": "2026-10-30"
  },
  "MDLZ": {
   "price": 64.94,
   "date": "2026-10-30",
   "changePct": 3.9,
   "close": 64.94,
   "closeDate": "2026-10-30"
  },
  "AAPL": {
   "price": 344.63,
   "date": "2026-10-30",
   "changePct": -1.2,
   "close": 344.63,
   "closeDate": "2026-10-30"
  },
  "MU": {
   "price": 884.74,
   "date": "2026-10-30",
   "changePct": -5.3,
   "close": 884.74,
   "closeDate": "2026-10-30"
  },
  "MDT": {
   "price": 96.54,
   "date": "2026-10-30",
   "changePct": -0.6,
   "close": 96.54,
   "closeDate": "2026-10-30"
  },
  "IREN": {
   "price": 23.95,
   "date": "2026-10-30",
   "changePct": -8.8,
   "close": 23.95,
   "closeDate": "2026-10-30"
  },
  "UNH": {
   "price": 406.97,
   "date": "2026-10-30",
   "changePct": -1,
   "close": 406.97,
   "closeDate": "2026-10-30"
  },
  "GILD": {
   "price": 170.68,
   "date": "2026-10-30",
   "changePct": 3.1,
   "close": 170.68,
   "closeDate": "2026-10-30"
  },
  "BRK.B": {
   "price": 542.49,
   "date": "2026-10-30",
   "changePct": 0.1,
   "close": 542.49,
   "closeDate": "2026-10-30"
  },
  "TMO": {
   "price": 697,
   "date": "2026-10-30",
   "changePct": -1.7,
   "close": 697,
   "closeDate": "2026-10-30"
  },
  "ECL": {
   "price": 302.98,
   "date": "2026-10-30",
   "changePct": 0.7,
   "close": 302.98,
   "closeDate": "2026-10-30"
  },
  "NVT": {
   "price": 125.98,
   "date": "2026-10-30",
   "changePct": -8.8,
   "close": 125.98,
   "closeDate": "2026-10-30"
  },
  "FSS": {
   "price": 112.67,
   "date": "2026-10-30",
   "changePct": -2.2,
   "close": 112.67,
   "closeDate": "2026-10-30"
  },
  "AAON": {
   "price": 67.4,
   "date": "2026-10-30",
   "changePct": -10.5,
   "close": 67.4,
   "closeDate": "2026-10-30"
  },
  "NVMI": {
   "price": 312.24,
   "date": "2026-10-30",
   "changePct": -6.7,
   "close": 312.24,
   "closeDate": "2026-10-30"
  },
  "POWL": {
   "price": 156.26,
   "date": "2026-10-30",
   "changePct": -7.3,
   "close": 156.26,
   "closeDate": "2026-10-30"
  },
  "MSI": {
   "price": 491.53,
   "date": "2026-10-30",
   "changePct": -0.1,
   "close": 491.53,
   "closeDate": "2026-10-30"
  },
  "DVN": {
   "price": 52.15,
   "date": "2026-10-30",
   "changePct": 1.9,
   "close": 52.15,
   "closeDate": "2026-10-30"
  },
  "GS": {
   "price": 894.55,
   "date": "2026-10-30",
   "changePct": -3.6,
   "close": 894.55,
   "closeDate": "2026-10-30"
  },
  "AMP": {
   "price": 490.83,
   "date": "2026-10-30",
   "changePct": -1.4,
   "close": 490.83,
   "closeDate": "2026-10-30"
  },
  "PNC": {
   "price": 227.86,
   "date": "2026-10-30",
   "changePct": -1.7,
   "close": 227.86,
   "closeDate": "2026-10-30"
  },
  "MTB": {
   "price": 220.72,
   "date": "2026-10-30",
   "changePct": -1.5,
   "close": 220.72,
   "closeDate": "2026-10-30"
  },
  "SO": {
   "price": 93.71,
   "date": "2026-10-30",
   "changePct": 0.8,
   "close": 93.71,
   "closeDate": "2026-10-30"
  },
  "WEC": {
   "price": 116.07,
   "date": "2026-10-30",
   "changePct": 1.3,
   "close": 116.07,
   "closeDate": "2026-10-30"
  },
  "MSCI": {
   "price": 623.38,
   "date": "2026-10-30",
   "changePct": 0.8,
   "close": 623.38,
   "closeDate": "2026-10-30"
  },
  "RSG": {
   "price": 244.04,
   "date": "2026-10-30",
   "changePct": 3.3,
   "close": 244.04,
   "closeDate": "2026-10-30"
  },
  "CTAS": {
   "price": 219.82,
   "date": "2026-10-30",
   "changePct": 0.8,
   "close": 219.82,
   "closeDate": "2026-10-30"
  },
  "TJX": {
   "price": 140.31,
   "date": "2026-10-30",
   "changePct": -0.8,
   "close": 140.31,
   "closeDate": "2026-10-30"
  },
  "ANET": {
   "price": 168.86,
   "date": "2026-10-30",
   "changePct": -8.3,
   "close": 168.86,
   "closeDate": "2026-10-30"
  },
  "GD": {
   "price": 372.59,
   "date": "2026-10-30",
   "changePct": 0.5,
   "close": 372.59,
   "closeDate": "2026-10-30"
  },
  "APPF": {
   "price": 213.25,
   "date": "2026-10-30",
   "changePct": 3,
   "close": 213.25,
   "closeDate": "2026-10-30"
  },
  "CB": {
   "price": 364.12,
   "date": "2026-10-30",
   "changePct": 0.5,
   "close": 364.12,
   "closeDate": "2026-10-30"
  },
  "ADP": {
   "price": 293.84,
   "date": "2026-10-30",
   "changePct": 2.7,
   "close": 293.84,
   "closeDate": "2026-10-30"
  },
  "LMT": {
   "price": 636.95,
   "date": "2026-10-30",
   "changePct": -1,
   "close": 636.95,
   "closeDate": "2026-10-30"
  },
  "ORLY": {
   "price": 88.12,
   "date": "2026-10-30",
   "changePct": 0.1,
   "close": 88.12,
   "closeDate": "2026-10-30"
  },
  "YUM": {
   "price": 155.4,
   "date": "2026-10-30",
   "changePct": 0.5,
   "close": 155.4,
   "closeDate": "2026-10-30"
  },
  "FIVE": {
   "price": 240.955,
   "date": "2026-10-30",
   "changePct": -1.9,
   "close": 240.955,
   "closeDate": "2026-10-30"
  },
  "STRL": {
   "price": 345.91,
   "date": "2026-10-30",
   "changePct": -7.4,
   "close": 345.91,
   "closeDate": "2026-10-30"
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
   "price": 7580.07,
   "date": "2026-10-30",
   "changePct": -1.8,
   "close": 7580.07,
   "closeDate": "2026-10-30"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 218.31,
   "date": "2026-10-30",
   "changePct": -0.8,
   "close": 218.31,
   "closeDate": "2026-10-30"
  }
 }
};
