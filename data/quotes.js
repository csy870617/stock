// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-11",
 "quotes": {
  "103590": {
   "price": 52700,
   "date": "2026-11-11",
   "changePct": 14.4,
   "close": 52700,
   "closeDate": "2026-11-11"
  },
  "105560": {
   "price": 153300,
   "date": "2026-11-11",
   "changePct": 0.4,
   "close": 153300,
   "closeDate": "2026-11-11"
  },
  "138040": {
   "price": 129500,
   "date": "2026-11-11",
   "changePct": 0.8,
   "close": 129500,
   "closeDate": "2026-11-11"
  },
  "139130": {
   "price": 15600,
   "date": "2026-11-11",
   "changePct": 0.7,
   "close": 15600,
   "closeDate": "2026-11-11"
  },
  "175330": {
   "price": 26600,
   "date": "2026-11-11",
   "changePct": 0.9,
   "close": 26600,
   "closeDate": "2026-11-11"
  },
  "192400": {
   "price": 27550,
   "date": "2026-11-11",
   "changePct": 1.1,
   "close": 27550,
   "closeDate": "2026-11-11"
  },
  "207940": {
   "price": 1430000,
   "date": "2026-11-11",
   "changePct": -2.6,
   "close": 1430000,
   "closeDate": "2026-11-11"
  },
  "241560": {
   "price": 52800,
   "date": "2026-11-11",
   "changePct": -1.3,
   "close": 52800,
   "closeDate": "2026-11-11"
  },
  "267250": {
   "price": 124000,
   "date": "2026-11-11",
   "changePct": -2.1,
   "close": 124000,
   "closeDate": "2026-11-11"
  },
  "267260": {
   "price": 405000,
   "date": "2026-11-11",
   "changePct": 2.8,
   "close": 405000,
   "closeDate": "2026-11-11"
  },
  "267270": {
   "price": 92400,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 92400,
   "closeDate": "2026-11-11"
  },
  "278470": {
   "price": 251500,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 251500,
   "closeDate": "2026-11-11"
  },
  "298040": {
   "price": 1793000,
   "date": "2026-11-11",
   "changePct": 2.7,
   "close": 1793000,
   "closeDate": "2026-11-11"
  },
  "316140": {
   "price": 31500,
   "date": "2026-11-11",
   "changePct": 1.4,
   "close": 31500,
   "closeDate": "2026-11-11"
  },
  "323410": {
   "price": 20300,
   "date": "2026-11-11",
   "changePct": -1.2,
   "close": 20300,
   "closeDate": "2026-11-11"
  },
  "361610": {
   "price": 12810,
   "date": "2026-11-11",
   "changePct": -0.1,
   "close": 12810,
   "closeDate": "2026-11-11"
  },
  "005930": {
   "price": 206000,
   "date": "2026-11-11",
   "changePct": 3.6,
   "close": 206000,
   "closeDate": "2026-11-11"
  },
  "055550": {
   "price": 85700,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 85700,
   "closeDate": "2026-11-11"
  },
  "000810": {
   "price": 566000,
   "date": "2026-11-11",
   "changePct": -5.5,
   "close": 566000,
   "closeDate": "2026-11-11"
  },
  "012450": {
   "price": 659000,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 659000,
   "closeDate": "2026-11-11"
  },
  "009540": {
   "price": 240000,
   "date": "2026-11-11",
   "changePct": -2,
   "close": 240000,
   "closeDate": "2026-11-11"
  },
  "068270": {
   "price": 207000,
   "date": "2026-11-11",
   "changePct": 2,
   "close": 207000,
   "closeDate": "2026-11-11"
  },
  "000270": {
   "price": 94600,
   "date": "2026-11-11",
   "changePct": -1.6,
   "close": 94600,
   "closeDate": "2026-11-11"
  },
  "032640": {
   "price": 15440,
   "date": "2026-11-11",
   "changePct": -2.6,
   "close": 15440,
   "closeDate": "2026-11-11"
  },
  "029780": {
   "price": 40900,
   "date": "2026-11-11",
   "changePct": -0.2,
   "close": 40900,
   "closeDate": "2026-11-11"
  },
  "035900": {
   "price": 38700,
   "date": "2026-11-11",
   "changePct": -2.8,
   "close": 38700,
   "closeDate": "2026-11-11"
  },
  "036570": {
   "price": 209000,
   "date": "2026-11-11",
   "changePct": -2.1,
   "close": 209000,
   "closeDate": "2026-11-11"
  },
  "035720": {
   "price": 32000,
   "date": "2026-11-11",
   "changePct": -0.2,
   "close": 32000,
   "closeDate": "2026-11-11"
  },
  "001040": {
   "price": 113500,
   "date": "2026-11-11",
   "changePct": 1,
   "close": 113500,
   "closeDate": "2026-11-11"
  },
  "012750": {
   "price": 98500,
   "date": "2026-11-11",
   "changePct": 0.4,
   "close": 98500,
   "closeDate": "2026-11-11"
  },
  "000660": {
   "price": 1277000,
   "date": "2026-11-11",
   "changePct": 5.4,
   "close": 1277000,
   "closeDate": "2026-11-11"
  },
  "086790": {
   "price": 120100,
   "date": "2026-11-11",
   "changePct": 1.4,
   "close": 120100,
   "closeDate": "2026-11-11"
  },
  "001120": {
   "price": 34950,
   "date": "2026-11-11",
   "changePct": 0.6,
   "close": 34950,
   "closeDate": "2026-11-11"
  },
  "005830": {
   "price": 169500,
   "date": "2026-11-11",
   "changePct": -1.6,
   "close": 169500,
   "closeDate": "2026-11-11"
  },
  "066570": {
   "price": 141100,
   "date": "2026-11-11",
   "changePct": 0.8,
   "close": 141100,
   "closeDate": "2026-11-11"
  },
  "086280": {
   "price": 200500,
   "date": "2026-11-11",
   "changePct": 0.8,
   "close": 200500,
   "closeDate": "2026-11-11"
  },
  "018260": {
   "price": 230500,
   "date": "2026-11-11",
   "changePct": -0.9,
   "close": 230500,
   "closeDate": "2026-11-11"
  },
  "005850": {
   "price": 47500,
   "date": "2026-11-11",
   "changePct": 1.5,
   "close": 47500,
   "closeDate": "2026-11-11"
  },
  "005490": {
   "price": 276500,
   "date": "2026-11-11",
   "changePct": 2,
   "close": 276500,
   "closeDate": "2026-11-11"
  },
  "035420": {
   "price": 194300,
   "date": "2026-11-11",
   "changePct": 0.7,
   "close": 194300,
   "closeDate": "2026-11-11"
  },
  "010120": {
   "price": 121900,
   "date": "2026-11-11",
   "changePct": 0.7,
   "close": 121900,
   "closeDate": "2026-11-11"
  },
  "030200": {
   "price": 50600,
   "date": "2026-11-11",
   "changePct": -0.8,
   "close": 50600,
   "closeDate": "2026-11-11"
  },
  "012330": {
   "price": 354500,
   "date": "2026-11-11",
   "changePct": 0.9,
   "close": 354500,
   "closeDate": "2026-11-11"
  },
  "047050": {
   "price": 50500,
   "date": "2026-11-11",
   "changePct": 2.4,
   "close": 50500,
   "closeDate": "2026-11-11"
  },
  "030190": {
   "price": 18100,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 18100,
   "closeDate": "2026-11-11"
  },
  "042700": {
   "price": 184000,
   "date": "2026-11-11",
   "changePct": 6.1,
   "close": 184000,
   "closeDate": "2026-11-11"
  },
  "064400": {
   "price": 79200,
   "date": "2026-11-11",
   "changePct": -1.1,
   "close": 79200,
   "closeDate": "2026-11-11"
  },
  "095340": {
   "price": 145900,
   "date": "2026-11-11",
   "changePct": 9.8,
   "close": 145900,
   "closeDate": "2026-11-11"
  },
  "MSFT": {
   "price": 521.125,
   "date": "2026-11-11",
   "changePct": -2.3,
   "close": 521.125,
   "closeDate": "2026-11-11"
  },
  "V": {
   "price": 425.55,
   "date": "2026-11-11",
   "changePct": 0.6,
   "close": 425.55,
   "closeDate": "2026-11-11"
  },
  "MA": {
   "price": 660.73,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 660.73,
   "closeDate": "2026-11-11"
  },
  "GOOGL": {
   "price": 293.45,
   "date": "2026-11-11",
   "changePct": 2.1,
   "close": 293.45,
   "closeDate": "2026-11-11"
  },
  "COST": {
   "price": 1087.61,
   "date": "2026-11-11",
   "changePct": 2,
   "close": 1087.61,
   "closeDate": "2026-11-11"
  },
  "NVDA": {
   "price": 173.73,
   "date": "2026-11-11",
   "changePct": 2.9,
   "close": 173.73,
   "closeDate": "2026-11-11"
  },
  "META": {
   "price": 628.77,
   "date": "2026-11-11",
   "changePct": -2,
   "close": 628.77,
   "closeDate": "2026-11-11"
  },
  "AVGO": {
   "price": 345.22,
   "date": "2026-11-11",
   "changePct": 4,
   "close": 345.22,
   "closeDate": "2026-11-11"
  },
  "TSM": {
   "price": 413.35,
   "date": "2026-11-11",
   "changePct": 4.3,
   "close": 413.35,
   "closeDate": "2026-11-11"
  },
  "UBER": {
   "price": 70.68,
   "date": "2026-11-11",
   "changePct": 0.9,
   "close": 70.68,
   "closeDate": "2026-11-11"
  },
  "GM": {
   "price": 88.9,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 88.9,
   "closeDate": "2026-11-11"
  },
  "VZ": {
   "price": 46.6,
   "date": "2026-11-11",
   "changePct": 0.6,
   "close": 46.6,
   "closeDate": "2026-11-11"
  },
  "C": {
   "price": 124.21,
   "date": "2026-11-11",
   "changePct": 1.6,
   "close": 124.21,
   "closeDate": "2026-11-11"
  },
  "DUK": {
   "price": 128.77,
   "date": "2026-11-11",
   "changePct": -0.1,
   "close": 128.77,
   "closeDate": "2026-11-11"
  },
  "KO": {
   "price": 97.57,
   "date": "2026-11-11",
   "changePct": 0.7,
   "close": 97.57,
   "closeDate": "2026-11-11"
  },
  "JNJ": {
   "price": 280.41,
   "date": "2026-11-11",
   "changePct": -0.1,
   "close": 280.41,
   "closeDate": "2026-11-11"
  },
  "LLY": {
   "price": 1437.29,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 1437.29,
   "closeDate": "2026-11-11"
  },
  "CI": {
   "price": 301.45,
   "date": "2026-11-11",
   "changePct": -0.6,
   "close": 301.45,
   "closeDate": "2026-11-11"
  },
  "TSLA": {
   "price": 390.84,
   "date": "2026-11-11",
   "changePct": 2.9,
   "close": 390.84,
   "closeDate": "2026-11-11"
  },
  "AAPL": {
   "price": 355.63,
   "date": "2026-11-11",
   "changePct": 2,
   "close": 355.63,
   "closeDate": "2026-11-11"
  },
  "MU": {
   "price": 811.3,
   "date": "2026-11-11",
   "changePct": 11.9,
   "close": 811.3,
   "closeDate": "2026-11-11"
  },
  "MDT": {
   "price": 101.61,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 101.61,
   "closeDate": "2026-11-11"
  },
  "IREN": {
   "price": 20.84,
   "date": "2026-11-11",
   "changePct": 5.6,
   "close": 20.84,
   "closeDate": "2026-11-11"
  },
  "UNH": {
   "price": 402.94,
   "date": "2026-11-11",
   "changePct": -0.5,
   "close": 402.94,
   "closeDate": "2026-11-11"
  },
  "DVN": {
   "price": 44.95,
   "date": "2026-11-11",
   "changePct": 3.5,
   "close": 44.95,
   "closeDate": "2026-11-11"
  },
  "GS": {
   "price": 926.81,
   "date": "2026-11-11",
   "changePct": 1.8,
   "close": 926.81,
   "closeDate": "2026-11-11"
  },
  "AMP": {
   "price": 520.06,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 520.06,
   "closeDate": "2026-11-11"
  },
  "PNC": {
   "price": 232,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 232,
   "closeDate": "2026-11-11"
  },
  "MTB": {
   "price": 220.19,
   "date": "2026-11-11",
   "changePct": -0.2,
   "close": 220.19,
   "closeDate": "2026-11-11"
  },
  "SO": {
   "price": 93.84,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 93.84,
   "closeDate": "2026-11-11"
  },
  "WEC": {
   "price": 117.47,
   "date": "2026-11-11",
   "changePct": 0.4,
   "close": 117.47,
   "closeDate": "2026-11-11"
  },
  "TJX": {
   "price": 136.44,
   "date": "2026-11-11",
   "changePct": -0.4,
   "close": 136.44,
   "closeDate": "2026-11-11"
  },
  "ANET": {
   "price": 196.68,
   "date": "2026-11-11",
   "changePct": 6.3,
   "close": 196.68,
   "closeDate": "2026-11-11"
  },
  "GD": {
   "price": 367.22,
   "date": "2026-11-11",
   "changePct": -0.1,
   "close": 367.22,
   "closeDate": "2026-11-11"
  },
  "LMT": {
   "price": 610.05,
   "date": "2026-11-11",
   "changePct": 1.1,
   "close": 610.05,
   "closeDate": "2026-11-11"
  },
  "CB": {
   "price": 370.33,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 370.33,
   "closeDate": "2026-11-11"
  },
  "GILD": {
   "price": 169.73,
   "date": "2026-11-11",
   "changePct": -0.7,
   "close": 169.73,
   "closeDate": "2026-11-11"
  },
  "BRK.B": {
   "price": 588.24,
   "date": "2026-11-11",
   "changePct": 0.8,
   "close": 588.24,
   "closeDate": "2026-11-11"
  },
  "TMO": {
   "price": 717.71,
   "date": "2026-11-11",
   "changePct": -0.1,
   "close": 717.71,
   "closeDate": "2026-11-11"
  },
  "ECL": {
   "price": 307.86,
   "date": "2026-11-11",
   "changePct": 0.6,
   "close": 307.86,
   "closeDate": "2026-11-11"
  },
  "RSG": {
   "price": 249.34,
   "date": "2026-11-11",
   "changePct": 0.7,
   "close": 249.34,
   "closeDate": "2026-11-11"
  },
  "CTAS": {
   "price": 227.26,
   "date": "2026-11-11",
   "changePct": 0.9,
   "close": 227.26,
   "closeDate": "2026-11-11"
  },
  "ORLY": {
   "price": 90.54,
   "date": "2026-11-11",
   "changePct": 1.3,
   "close": 90.54,
   "closeDate": "2026-11-11"
  },
  "ADP": {
   "price": 306.36,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 306.36,
   "closeDate": "2026-11-11"
  },
  "FAST": {
   "price": 55.49,
   "date": "2026-11-11",
   "changePct": 1.2,
   "close": 55.49,
   "closeDate": "2026-11-11"
  },
  "VRT": {
   "price": 206.51,
   "date": "2026-11-11",
   "changePct": 6.3,
   "close": 206.51,
   "closeDate": "2026-11-11"
  },
  "WAB": {
   "price": 304.18,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 304.18,
   "closeDate": "2026-11-11"
  },
  "NTES": {
   "price": 122.13,
   "date": "2026-11-11",
   "changePct": -4.6,
   "close": 122.13,
   "closeDate": "2026-11-11"
  },
  "ROST": {
   "price": 241.27,
   "date": "2026-11-11",
   "changePct": 1,
   "close": 241.27,
   "closeDate": "2026-11-11"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5375.36,
   "date": "2026-11-11",
   "changePct": 2.6,
   "close": 5375.36,
   "closeDate": "2026-11-11"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7619.38,
   "date": "2026-11-11",
   "changePct": 1.3,
   "close": 7619.38,
   "closeDate": "2026-11-11"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 222.65,
   "date": "2026-11-11",
   "changePct": 0.8,
   "close": 222.65,
   "closeDate": "2026-11-11"
  }
 }
};
