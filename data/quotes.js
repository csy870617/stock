// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-27",
 "quotes": {
  "103590": {
   "price": 53700,
   "date": "2026-11-27",
   "changePct": 6.5,
   "close": 53700,
   "closeDate": "2026-11-27"
  },
  "105560": {
   "price": 145000,
   "date": "2026-11-27",
   "changePct": -0.2,
   "close": 145000,
   "closeDate": "2026-11-27"
  },
  "138040": {
   "price": 124900,
   "date": "2026-11-27",
   "changePct": 1.7,
   "close": 124900,
   "closeDate": "2026-11-27"
  },
  "139130": {
   "price": 15370,
   "date": "2026-11-27",
   "changePct": 1.2,
   "close": 15370,
   "closeDate": "2026-11-27"
  },
  "175330": {
   "price": 24200,
   "date": "2026-11-27",
   "changePct": -0.6,
   "close": 24200,
   "closeDate": "2026-11-27"
  },
  "192820": {
   "price": 315000,
   "date": "2026-11-27",
   "changePct": -6.4,
   "close": 315000,
   "closeDate": "2026-11-27"
  },
  "207940": {
   "price": 1351000,
   "date": "2026-11-27",
   "changePct": 1,
   "close": 1351000,
   "closeDate": "2026-11-27"
  },
  "241560": {
   "price": 48900,
   "date": "2026-11-27",
   "changePct": 2.3,
   "close": 48900,
   "closeDate": "2026-11-27"
  },
  "267250": {
   "price": 118700,
   "date": "2026-11-27",
   "changePct": 4.8,
   "close": 118700,
   "closeDate": "2026-11-27"
  },
  "267260": {
   "price": 418500,
   "date": "2026-11-27",
   "changePct": 8,
   "close": 418500,
   "closeDate": "2026-11-27"
  },
  "267270": {
   "price": 80300,
   "date": "2026-11-27",
   "changePct": 7.5,
   "close": 80300,
   "closeDate": "2026-11-27"
  },
  "271560": {
   "price": 114900,
   "date": "2026-11-27",
   "changePct": -3.6,
   "close": 114900,
   "closeDate": "2026-11-27"
  },
  "298040": {
   "price": 1724000,
   "date": "2026-11-27",
   "changePct": 6.9,
   "close": 1724000,
   "closeDate": "2026-11-27"
  },
  "316140": {
   "price": 31100,
   "date": "2026-11-27",
   "changePct": -0.3,
   "close": 31100,
   "closeDate": "2026-11-27"
  },
  "323410": {
   "price": 22500,
   "date": "2026-11-27",
   "changePct": 1.8,
   "close": 22500,
   "closeDate": "2026-11-27"
  },
  "361610": {
   "price": 11280,
   "date": "2026-11-27",
   "changePct": 4.7,
   "close": 11280,
   "closeDate": "2026-11-27"
  },
  "402340": {
   "price": 687000,
   "date": "2026-11-27",
   "changePct": 5.4,
   "close": 687000,
   "closeDate": "2026-11-27"
  },
  "005930": {
   "price": 179100,
   "date": "2026-11-27",
   "changePct": 4.6,
   "close": 179100,
   "closeDate": "2026-11-27"
  },
  "055550": {
   "price": 83900,
   "date": "2026-11-27",
   "changePct": -0.9,
   "close": 83900,
   "closeDate": "2026-11-27"
  },
  "000810": {
   "price": 524000,
   "date": "2026-11-27",
   "changePct": 2.1,
   "close": 524000,
   "closeDate": "2026-11-27"
  },
  "012450": {
   "price": 663000,
   "date": "2026-11-27",
   "changePct": 5.7,
   "close": 663000,
   "closeDate": "2026-11-27"
  },
  "009540": {
   "price": 230500,
   "date": "2026-11-27",
   "changePct": 3.4,
   "close": 230500,
   "closeDate": "2026-11-27"
  },
  "068270": {
   "price": 221000,
   "date": "2026-11-27",
   "changePct": 2.6,
   "close": 221000,
   "closeDate": "2026-11-27"
  },
  "000270": {
   "price": 94700,
   "date": "2026-11-27",
   "changePct": 1.1,
   "close": 94700,
   "closeDate": "2026-11-27"
  },
  "032640": {
   "price": 14640,
   "date": "2026-11-27",
   "changePct": -1.6,
   "close": 14640,
   "closeDate": "2026-11-27"
  },
  "029780": {
   "price": 41750,
   "date": "2026-11-27",
   "changePct": 3.9,
   "close": 41750,
   "closeDate": "2026-11-27"
  },
  "035900": {
   "price": 50100,
   "date": "2026-11-27",
   "changePct": 2.9,
   "close": 50100,
   "closeDate": "2026-11-27"
  },
  "036570": {
   "price": 189000,
   "date": "2026-11-27",
   "changePct": 1.6,
   "close": 189000,
   "closeDate": "2026-11-27"
  },
  "035720": {
   "price": 31050,
   "date": "2026-11-27",
   "changePct": 2.8,
   "close": 31050,
   "closeDate": "2026-11-27"
  },
  "001040": {
   "price": 129600,
   "date": "2026-11-27",
   "changePct": 3.7,
   "close": 129600,
   "closeDate": "2026-11-27"
  },
  "012750": {
   "price": 102200,
   "date": "2026-11-27",
   "changePct": -0.1,
   "close": 102200,
   "closeDate": "2026-11-27"
  },
  "000660": {
   "price": 1110000,
   "date": "2026-11-27",
   "changePct": 5.4,
   "close": 1110000,
   "closeDate": "2026-11-27"
  },
  "086790": {
   "price": 118200,
   "date": "2026-11-27",
   "changePct": -0.8,
   "close": 118200,
   "closeDate": "2026-11-27"
  },
  "001120": {
   "price": 32650,
   "date": "2026-11-27",
   "changePct": 3,
   "close": 32650,
   "closeDate": "2026-11-27"
  },
  "005830": {
   "price": 160700,
   "date": "2026-11-27",
   "changePct": -2.5,
   "close": 160700,
   "closeDate": "2026-11-27"
  },
  "066570": {
   "price": 144800,
   "date": "2026-11-27",
   "changePct": 7.1,
   "close": 144800,
   "closeDate": "2026-11-27"
  },
  "086280": {
   "price": 202500,
   "date": "2026-11-27",
   "changePct": 2.2,
   "close": 202500,
   "closeDate": "2026-11-27"
  },
  "018260": {
   "price": 201500,
   "date": "2026-11-27",
   "changePct": 4.4,
   "close": 201500,
   "closeDate": "2026-11-27"
  },
  "005850": {
   "price": 39200,
   "date": "2026-11-27",
   "changePct": 4.1,
   "close": 39200,
   "closeDate": "2026-11-27"
  },
  "005490": {
   "price": 258500,
   "date": "2026-11-27",
   "changePct": 4,
   "close": 258500,
   "closeDate": "2026-11-27"
  },
  "035420": {
   "price": 163400,
   "date": "2026-11-27",
   "changePct": 2,
   "close": 163400,
   "closeDate": "2026-11-27"
  },
  "010120": {
   "price": 121700,
   "date": "2026-11-27",
   "changePct": 7.3,
   "close": 121700,
   "closeDate": "2026-11-27"
  },
  "030200": {
   "price": 44650,
   "date": "2026-11-27",
   "changePct": -2.7,
   "close": 44650,
   "closeDate": "2026-11-27"
  },
  "012330": {
   "price": 339000,
   "date": "2026-11-27",
   "changePct": 2.9,
   "close": 339000,
   "closeDate": "2026-11-27"
  },
  "047050": {
   "price": 47750,
   "date": "2026-11-27",
   "changePct": 2.6,
   "close": 47750,
   "closeDate": "2026-11-27"
  },
  "042700": {
   "price": 161200,
   "date": "2026-11-27",
   "changePct": 9.1,
   "close": 161200,
   "closeDate": "2026-11-27"
  },
  "064400": {
   "price": 72000,
   "date": "2026-11-27",
   "changePct": 9.1,
   "close": 72000,
   "closeDate": "2026-11-27"
  },
  "095340": {
   "price": 126500,
   "date": "2026-11-27",
   "changePct": 8.3,
   "close": 126500,
   "closeDate": "2026-11-27"
  },
  "000100": {
   "price": 83200,
   "date": "2026-11-27",
   "changePct": 1.3,
   "close": 83200,
   "closeDate": "2026-11-27"
  },
  "033780": {
   "price": 176200,
   "date": "2026-11-27",
   "changePct": -1.8,
   "close": 176200,
   "closeDate": "2026-11-27"
  },
  "MSFT": {
   "price": 489.93,
   "date": "2026-11-25",
   "changePct": -1.2,
   "close": 489.93,
   "closeDate": "2026-11-25"
  },
  "V": {
   "price": 424.39,
   "date": "2026-11-25",
   "changePct": 1.8,
   "close": 424.39,
   "closeDate": "2026-11-25"
  },
  "MA": {
   "price": 659.97,
   "date": "2026-11-25",
   "changePct": 1.9,
   "close": 659.97,
   "closeDate": "2026-11-25"
  },
  "GOOGL": {
   "price": 273.1,
   "date": "2026-11-25",
   "changePct": -2.1,
   "close": 273.1,
   "closeDate": "2026-11-25"
  },
  "NVDA": {
   "price": 149.3,
   "date": "2026-11-25",
   "changePct": -3.9,
   "close": 149.3,
   "closeDate": "2026-11-25"
  },
  "META": {
   "price": 609.89,
   "date": "2026-11-25",
   "changePct": 3.4,
   "close": 609.89,
   "closeDate": "2026-11-25"
  },
  "AVGO": {
   "price": 300.86,
   "date": "2026-11-25",
   "changePct": -0.1,
   "close": 300.86,
   "closeDate": "2026-11-25"
  },
  "TSM": {
   "price": 342.34,
   "date": "2026-11-25",
   "changePct": -2,
   "close": 342.34,
   "closeDate": "2026-11-25"
  },
  "UBER": {
   "price": 66.35,
   "date": "2026-11-25",
   "changePct": 2.6,
   "close": 66.35,
   "closeDate": "2026-11-25"
  },
  "GM": {
   "price": 83.99,
   "date": "2026-11-25",
   "changePct": 2,
   "close": 83.99,
   "closeDate": "2026-11-25"
  },
  "VZ": {
   "price": 47.28,
   "date": "2026-11-25",
   "changePct": 0.3,
   "close": 47.28,
   "closeDate": "2026-11-25"
  },
  "C": {
   "price": 113.33,
   "date": "2026-11-25",
   "changePct": -0.5,
   "close": 113.33,
   "closeDate": "2026-11-25"
  },
  "DUK": {
   "price": 131.9,
   "date": "2026-11-25",
   "changePct": 0.7,
   "close": 131.9,
   "closeDate": "2026-11-25"
  },
  "KO": {
   "price": 97.59,
   "date": "2026-11-25",
   "changePct": 0,
   "close": 97.59,
   "closeDate": "2026-11-25"
  },
  "JNJ": {
   "price": 273.94,
   "date": "2026-11-25",
   "changePct": -0.9,
   "close": 273.94,
   "closeDate": "2026-11-25"
  },
  "LLY": {
   "price": 1392.22,
   "date": "2026-11-25",
   "changePct": -1.1,
   "close": 1392.22,
   "closeDate": "2026-11-25"
  },
  "CI": {
   "price": 271.42,
   "date": "2026-11-25",
   "changePct": -1.3,
   "close": 271.42,
   "closeDate": "2026-11-25"
  },
  "TSLA": {
   "price": 380.14,
   "date": "2026-11-25",
   "changePct": -1.2,
   "close": 380.14,
   "closeDate": "2026-11-25"
  },
  "AAPL": {
   "price": 355.58,
   "date": "2026-11-25",
   "changePct": 0.4,
   "close": 355.58,
   "closeDate": "2026-11-25"
  },
  "MU": {
   "price": 601.25,
   "date": "2026-11-25",
   "changePct": -4.5,
   "close": 601.25,
   "closeDate": "2026-11-25"
  },
  "MDT": {
   "price": 96.06,
   "date": "2026-11-25",
   "changePct": -0.1,
   "close": 96.06,
   "closeDate": "2026-11-25"
  },
  "IREN": {
   "price": 12.85,
   "date": "2026-11-25",
   "changePct": -0.8,
   "close": 12.85,
   "closeDate": "2026-11-25"
  },
  "DVN": {
   "price": 42.45,
   "date": "2026-11-25",
   "changePct": 2.7,
   "close": 42.45,
   "closeDate": "2026-11-25"
  },
  "GS": {
   "price": 801.03,
   "date": "2026-11-25",
   "changePct": -0.6,
   "close": 801.03,
   "closeDate": "2026-11-25"
  },
  "AMP": {
   "price": 504.98,
   "date": "2026-11-25",
   "changePct": 1.4,
   "close": 504.98,
   "closeDate": "2026-11-25"
  },
  "PNC": {
   "price": 220.33,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 220.33,
   "closeDate": "2026-11-25"
  },
  "MTB": {
   "price": 215.5,
   "date": "2026-11-25",
   "changePct": 0.5,
   "close": 215.5,
   "closeDate": "2026-11-25"
  },
  "SO": {
   "price": 95,
   "date": "2026-11-25",
   "changePct": 0.9,
   "close": 95,
   "closeDate": "2026-11-25"
  },
  "WEC": {
   "price": 119.09,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 119.09,
   "closeDate": "2026-11-25"
  },
  "TJX": {
   "price": 146.09,
   "date": "2026-11-25",
   "changePct": 1.6,
   "close": 146.09,
   "closeDate": "2026-11-25"
  },
  "ANET": {
   "price": 163.99,
   "date": "2026-11-25",
   "changePct": -2.7,
   "close": 163.99,
   "closeDate": "2026-11-25"
  },
  "GD": {
   "price": 360.27,
   "date": "2026-11-25",
   "changePct": 2.5,
   "close": 360.27,
   "closeDate": "2026-11-25"
  },
  "LMT": {
   "price": 599.24,
   "date": "2026-11-25",
   "changePct": 2.1,
   "close": 599.24,
   "closeDate": "2026-11-25"
  },
  "CB": {
   "price": 380.51,
   "date": "2026-11-25",
   "changePct": 1.4,
   "close": 380.51,
   "closeDate": "2026-11-25"
  },
  "GILD": {
   "price": 176.74,
   "date": "2026-11-25",
   "changePct": -0.9,
   "close": 176.74,
   "closeDate": "2026-11-25"
  },
  "BRK.B": {
   "price": 579.32,
   "date": "2026-11-25",
   "changePct": 0.4,
   "close": 579.32,
   "closeDate": "2026-11-25"
  },
  "TMO": {
   "price": 685.52,
   "date": "2026-11-25",
   "changePct": -1.5,
   "close": 685.52,
   "closeDate": "2026-11-25"
  },
  "ECL": {
   "price": 308.89,
   "date": "2026-11-25",
   "changePct": 0.6,
   "close": 308.89,
   "closeDate": "2026-11-25"
  },
  "RSG": {
   "price": 254.16,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 254.16,
   "closeDate": "2026-11-25"
  },
  "CTAS": {
   "price": 227.65,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 227.65,
   "closeDate": "2026-11-25"
  },
  "ORLY": {
   "price": 96.69,
   "date": "2026-11-25",
   "changePct": 1.3,
   "close": 96.69,
   "closeDate": "2026-11-25"
  },
  "ADP": {
   "price": 316.72,
   "date": "2026-11-25",
   "changePct": 1.9,
   "close": 316.72,
   "closeDate": "2026-11-25"
  },
  "FAST": {
   "price": 52.93,
   "date": "2026-11-25",
   "changePct": 1.3,
   "close": 52.93,
   "closeDate": "2026-11-25"
  },
  "VRT": {
   "price": 173.37,
   "date": "2026-11-25",
   "changePct": -0.3,
   "close": 173.37,
   "closeDate": "2026-11-25"
  },
  "CSCO": {
   "price": 94.2,
   "date": "2026-11-25",
   "changePct": 0.2,
   "close": 94.2,
   "closeDate": "2026-11-25"
  },
  "TEL": {
   "price": 211.48,
   "date": "2026-11-25",
   "changePct": 1.3,
   "close": 211.48,
   "closeDate": "2026-11-25"
  },
  "RMD": {
   "price": 245.7,
   "date": "2026-11-25",
   "changePct": 0.9,
   "close": 245.7,
   "closeDate": "2026-11-25"
  },
  "DG": {
   "price": 139.27,
   "date": "2026-11-25",
   "changePct": 0.4,
   "close": 139.27,
   "closeDate": "2026-11-25"
  },
  "DXCM": {
   "price": 84.84,
   "date": "2026-11-25",
   "changePct": 0.2,
   "close": 84.84,
   "closeDate": "2026-11-25"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 4915.68,
   "date": "2026-11-27",
   "changePct": 4.3,
   "close": 4915.68,
   "closeDate": "2026-11-27",
   "at": "2026-11-27T08:35:03Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7182.78,
   "date": "2026-11-25",
   "changePct": -0.3,
   "close": 7182.78,
   "closeDate": "2026-11-25",
   "at": "2026-11-27T08:35:03Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215.74,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 215.74,
   "closeDate": "2026-11-25",
   "at": "2026-11-27T08:35:03Z"
  }
 }
};
