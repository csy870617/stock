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
   "price": 492.85,
   "date": "2026-11-27",
   "changePct": 0.6,
   "close": 492.85,
   "closeDate": "2026-11-27"
  },
  "V": {
   "price": 429.56,
   "date": "2026-11-27",
   "changePct": 1.2,
   "close": 429.56,
   "closeDate": "2026-11-27"
  },
  "MA": {
   "price": 666.96,
   "date": "2026-11-27",
   "changePct": 1.1,
   "close": 666.96,
   "closeDate": "2026-11-27"
  },
  "GOOGL": {
   "price": 274.96,
   "date": "2026-11-27",
   "changePct": 0.7,
   "close": 274.96,
   "closeDate": "2026-11-27"
  },
  "NVDA": {
   "price": 150.49,
   "date": "2026-11-27",
   "changePct": 0.8,
   "close": 150.49,
   "closeDate": "2026-11-27"
  },
  "META": {
   "price": 628.96,
   "date": "2026-11-27",
   "changePct": 3.1,
   "close": 628.96,
   "closeDate": "2026-11-27"
  },
  "AVGO": {
   "price": 312.34,
   "date": "2026-11-27",
   "changePct": 3.8,
   "close": 312.34,
   "closeDate": "2026-11-27"
  },
  "TSM": {
   "price": 353.34,
   "date": "2026-11-27",
   "changePct": 3.2,
   "close": 353.34,
   "closeDate": "2026-11-27"
  },
  "UBER": {
   "price": 66.63,
   "date": "2026-11-27",
   "changePct": 0.4,
   "close": 66.63,
   "closeDate": "2026-11-27"
  },
  "GM": {
   "price": 85.2,
   "date": "2026-11-27",
   "changePct": 1.4,
   "close": 85.2,
   "closeDate": "2026-11-27"
  },
  "VZ": {
   "price": 47.54,
   "date": "2026-11-27",
   "changePct": 0.5,
   "close": 47.54,
   "closeDate": "2026-11-27"
  },
  "C": {
   "price": 115.59,
   "date": "2026-11-27",
   "changePct": 2,
   "close": 115.59,
   "closeDate": "2026-11-27"
  },
  "DUK": {
   "price": 131.91,
   "date": "2026-11-27",
   "changePct": 0,
   "close": 131.91,
   "closeDate": "2026-11-27"
  },
  "KO": {
   "price": 97.4,
   "date": "2026-11-27",
   "changePct": -0.2,
   "close": 97.4,
   "closeDate": "2026-11-27"
  },
  "JNJ": {
   "price": 275.51,
   "date": "2026-11-27",
   "changePct": 0.6,
   "close": 275.51,
   "closeDate": "2026-11-27"
  },
  "LLY": {
   "price": 1392.38,
   "date": "2026-11-27",
   "changePct": 0,
   "close": 1392.38,
   "closeDate": "2026-11-27"
  },
  "CI": {
   "price": 272.12,
   "date": "2026-11-27",
   "changePct": 0.3,
   "close": 272.12,
   "closeDate": "2026-11-27"
  },
  "TSLA": {
   "price": 400,
   "date": "2026-11-27",
   "changePct": 5.2,
   "close": 400,
   "closeDate": "2026-11-27"
  },
  "AAPL": {
   "price": 358.54,
   "date": "2026-11-27",
   "changePct": 0.8,
   "close": 358.54,
   "closeDate": "2026-11-27"
  },
  "MU": {
   "price": 646.95,
   "date": "2026-11-27",
   "changePct": 7.6,
   "close": 646.95,
   "closeDate": "2026-11-27"
  },
  "MDT": {
   "price": 95.41,
   "date": "2026-11-27",
   "changePct": -0.7,
   "close": 95.41,
   "closeDate": "2026-11-27"
  },
  "IREN": {
   "price": 13.61,
   "date": "2026-11-27",
   "changePct": 5.9,
   "close": 13.61,
   "closeDate": "2026-11-27"
  },
  "DVN": {
   "price": 42.84,
   "date": "2026-11-27",
   "changePct": 0.9,
   "close": 42.84,
   "closeDate": "2026-11-27"
  },
  "GS": {
   "price": 812.87,
   "date": "2026-11-27",
   "changePct": 1.5,
   "close": 812.87,
   "closeDate": "2026-11-27"
  },
  "AMP": {
   "price": 507.12,
   "date": "2026-11-27",
   "changePct": 0.4,
   "close": 507.12,
   "closeDate": "2026-11-27"
  },
  "PNC": {
   "price": 222.7,
   "date": "2026-11-27",
   "changePct": 1.1,
   "close": 222.7,
   "closeDate": "2026-11-27"
  },
  "MTB": {
   "price": 216.87,
   "date": "2026-11-27",
   "changePct": 0.6,
   "close": 216.87,
   "closeDate": "2026-11-27"
  },
  "SO": {
   "price": 95.04,
   "date": "2026-11-27",
   "changePct": 0,
   "close": 95.04,
   "closeDate": "2026-11-27"
  },
  "WEC": {
   "price": 119.08,
   "date": "2026-11-27",
   "changePct": 0,
   "close": 119.08,
   "closeDate": "2026-11-27"
  },
  "TJX": {
   "price": 143.77,
   "date": "2026-11-27",
   "changePct": -1.6,
   "close": 143.77,
   "closeDate": "2026-11-27"
  },
  "ANET": {
   "price": 174.73,
   "date": "2026-11-27",
   "changePct": 6.5,
   "close": 174.73,
   "closeDate": "2026-11-27"
  },
  "GD": {
   "price": 363.36,
   "date": "2026-11-27",
   "changePct": 0.9,
   "close": 363.36,
   "closeDate": "2026-11-27"
  },
  "LMT": {
   "price": 605.88,
   "date": "2026-11-27",
   "changePct": 1.1,
   "close": 605.88,
   "closeDate": "2026-11-27"
  },
  "CB": {
   "price": 381.02,
   "date": "2026-11-27",
   "changePct": 0.1,
   "close": 381.02,
   "closeDate": "2026-11-27"
  },
  "GILD": {
   "price": 177,
   "date": "2026-11-27",
   "changePct": 0.1,
   "close": 177,
   "closeDate": "2026-11-27"
  },
  "BRK.B": {
   "price": 580.79,
   "date": "2026-11-27",
   "changePct": 0.3,
   "close": 580.79,
   "closeDate": "2026-11-27"
  },
  "TMO": {
   "price": 683.04,
   "date": "2026-11-27",
   "changePct": -0.4,
   "close": 683.04,
   "closeDate": "2026-11-27"
  },
  "ECL": {
   "price": 311.67,
   "date": "2026-11-27",
   "changePct": 0.9,
   "close": 311.67,
   "closeDate": "2026-11-27"
  },
  "RSG": {
   "price": 253.26,
   "date": "2026-11-27",
   "changePct": -0.4,
   "close": 253.26,
   "closeDate": "2026-11-27"
  },
  "CTAS": {
   "price": 228.58,
   "date": "2026-11-27",
   "changePct": 0.4,
   "close": 228.58,
   "closeDate": "2026-11-27"
  },
  "ORLY": {
   "price": 96.28,
   "date": "2026-11-27",
   "changePct": -0.4,
   "close": 96.28,
   "closeDate": "2026-11-27"
  },
  "ADP": {
   "price": 319.43,
   "date": "2026-11-27",
   "changePct": 0.9,
   "close": 319.43,
   "closeDate": "2026-11-27"
  },
  "FAST": {
   "price": 53.41,
   "date": "2026-11-27",
   "changePct": 0.9,
   "close": 53.41,
   "closeDate": "2026-11-27"
  },
  "VRT": {
   "price": 178.71,
   "date": "2026-11-27",
   "changePct": 3.1,
   "close": 178.71,
   "closeDate": "2026-11-27"
  },
  "CSCO": {
   "price": 97.04,
   "date": "2026-11-27",
   "changePct": 3,
   "close": 97.04,
   "closeDate": "2026-11-27"
  },
  "TEL": {
   "price": 217.82,
   "date": "2026-11-27",
   "changePct": 3,
   "close": 217.82,
   "closeDate": "2026-11-27"
  },
  "RMD": {
   "price": 242.92,
   "date": "2026-11-27",
   "changePct": -1.1,
   "close": 242.92,
   "closeDate": "2026-11-27"
  },
  "DG": {
   "price": 138.84,
   "date": "2026-11-27",
   "changePct": -0.3,
   "close": 138.84,
   "closeDate": "2026-11-27"
  },
  "DXCM": {
   "price": 85.15,
   "date": "2026-11-27",
   "changePct": 0.4,
   "close": 85.15,
   "closeDate": "2026-11-27"
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
   "at": "2026-11-27T22:14:12Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7297.49,
   "date": "2026-11-27",
   "changePct": 1.6,
   "close": 7297.49,
   "closeDate": "2026-11-27",
   "at": "2026-11-27T22:14:12Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 218.38,
   "date": "2026-11-27",
   "changePct": 1.2,
   "close": 218.38,
   "closeDate": "2026-11-27",
   "at": "2026-11-27T22:14:12Z"
  }
 }
};
