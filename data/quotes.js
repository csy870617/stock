// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-19",
 "quotes": {
  "103590": {
   "price": 56100,
   "date": "2026-11-19",
   "changePct": 2.6,
   "close": 56100,
   "closeDate": "2026-11-19"
  },
  "105560": {
   "price": 152900,
   "date": "2026-11-19",
   "changePct": -2.2,
   "close": 152900,
   "closeDate": "2026-11-19"
  },
  "138040": {
   "price": 125200,
   "date": "2026-11-19",
   "changePct": 1.1,
   "close": 125200,
   "closeDate": "2026-11-19"
  },
  "139130": {
   "price": 15840,
   "date": "2026-11-19",
   "changePct": 0.7,
   "close": 15840,
   "closeDate": "2026-11-19"
  },
  "175330": {
   "price": 25650,
   "date": "2026-11-19",
   "changePct": -1.7,
   "close": 25650,
   "closeDate": "2026-11-19"
  },
  "192400": {
   "price": 26600,
   "date": "2026-11-19",
   "changePct": -2.2,
   "close": 26600,
   "closeDate": "2026-11-19"
  },
  "207940": {
   "price": 1375000,
   "date": "2026-11-19",
   "changePct": 0.7,
   "close": 1375000,
   "closeDate": "2026-11-19"
  },
  "241560": {
   "price": 51800,
   "date": "2026-11-19",
   "changePct": -0.4,
   "close": 51800,
   "closeDate": "2026-11-19"
  },
  "267250": {
   "price": 118100,
   "date": "2026-11-19",
   "changePct": -0.1,
   "close": 118100,
   "closeDate": "2026-11-19"
  },
  "267260": {
   "price": 415500,
   "date": "2026-11-19",
   "changePct": 8.6,
   "close": 415500,
   "closeDate": "2026-11-19"
  },
  "267270": {
   "price": 91300,
   "date": "2026-11-19",
   "changePct": 4.6,
   "close": 91300,
   "closeDate": "2026-11-19"
  },
  "271560": {
   "price": 118300,
   "date": "2026-11-19",
   "changePct": 3.6,
   "close": 118300,
   "closeDate": "2026-11-19"
  },
  "282330": {
   "price": 141000,
   "date": "2026-11-19",
   "changePct": 1,
   "close": 141000,
   "closeDate": "2026-11-19"
  },
  "298040": {
   "price": 1796000,
   "date": "2026-11-19",
   "changePct": 6.9,
   "close": 1796000,
   "closeDate": "2026-11-19"
  },
  "316140": {
   "price": 31750,
   "date": "2026-11-19",
   "changePct": -1.2,
   "close": 31750,
   "closeDate": "2026-11-19"
  },
  "323410": {
   "price": 21450,
   "date": "2026-11-19",
   "changePct": 2.1,
   "close": 21450,
   "closeDate": "2026-11-19"
  },
  "361610": {
   "price": 11470,
   "date": "2026-11-19",
   "changePct": -5,
   "close": 11470,
   "closeDate": "2026-11-19"
  },
  "402340": {
   "price": 739000,
   "date": "2026-11-19",
   "changePct": 4.2,
   "close": 739000,
   "closeDate": "2026-11-19"
  },
  "005930": {
   "price": 196900,
   "date": "2026-11-19",
   "changePct": 1.1,
   "close": 196900,
   "closeDate": "2026-11-19"
  },
  "055550": {
   "price": 85600,
   "date": "2026-11-19",
   "changePct": -1.6,
   "close": 85600,
   "closeDate": "2026-11-19"
  },
  "000810": {
   "price": 525000,
   "date": "2026-11-19",
   "changePct": -3.1,
   "close": 525000,
   "closeDate": "2026-11-19"
  },
  "012450": {
   "price": 631000,
   "date": "2026-11-19",
   "changePct": -0.2,
   "close": 631000,
   "closeDate": "2026-11-19"
  },
  "009540": {
   "price": 231000,
   "date": "2026-11-19",
   "changePct": 0.9,
   "close": 231000,
   "closeDate": "2026-11-19"
  },
  "068270": {
   "price": 215000,
   "date": "2026-11-19",
   "changePct": 3.6,
   "close": 215000,
   "closeDate": "2026-11-19"
  },
  "000270": {
   "price": 91500,
   "date": "2026-11-19",
   "changePct": -0.8,
   "close": 91500,
   "closeDate": "2026-11-19"
  },
  "032640": {
   "price": 15180,
   "date": "2026-11-19",
   "changePct": -1.6,
   "close": 15180,
   "closeDate": "2026-11-19"
  },
  "029780": {
   "price": 41700,
   "date": "2026-11-19",
   "changePct": 0.8,
   "close": 41700,
   "closeDate": "2026-11-19"
  },
  "035900": {
   "price": 47950,
   "date": "2026-11-19",
   "changePct": 2.6,
   "close": 47950,
   "closeDate": "2026-11-19"
  },
  "036570": {
   "price": 184100,
   "date": "2026-11-19",
   "changePct": -0.2,
   "close": 184100,
   "closeDate": "2026-11-19"
  },
  "035720": {
   "price": 31900,
   "date": "2026-11-19",
   "changePct": 0.3,
   "close": 31900,
   "closeDate": "2026-11-19"
  },
  "001040": {
   "price": 114200,
   "date": "2026-11-19",
   "changePct": 0.4,
   "close": 114200,
   "closeDate": "2026-11-19"
  },
  "012750": {
   "price": 105800,
   "date": "2026-11-19",
   "changePct": 2.7,
   "close": 105800,
   "closeDate": "2026-11-19"
  },
  "000660": {
   "price": 1183000,
   "date": "2026-11-19",
   "changePct": 3.4,
   "close": 1183000,
   "closeDate": "2026-11-19"
  },
  "086790": {
   "price": 123900,
   "date": "2026-11-19",
   "changePct": -0.2,
   "close": 123900,
   "closeDate": "2026-11-19"
  },
  "001120": {
   "price": 33850,
   "date": "2026-11-19",
   "changePct": -2.4,
   "close": 33850,
   "closeDate": "2026-11-19"
  },
  "005830": {
   "price": 168500,
   "date": "2026-11-19",
   "changePct": -0.5,
   "close": 168500,
   "closeDate": "2026-11-19"
  },
  "066570": {
   "price": 135900,
   "date": "2026-11-19",
   "changePct": -0.8,
   "close": 135900,
   "closeDate": "2026-11-19"
  },
  "086280": {
   "price": 203500,
   "date": "2026-11-19",
   "changePct": -0.2,
   "close": 203500,
   "closeDate": "2026-11-19"
  },
  "018260": {
   "price": 214500,
   "date": "2026-11-19",
   "changePct": -7.1,
   "close": 214500,
   "closeDate": "2026-11-19"
  },
  "005850": {
   "price": 37850,
   "date": "2026-11-19",
   "changePct": -5.5,
   "close": 37850,
   "closeDate": "2026-11-19"
  },
  "005490": {
   "price": 259500,
   "date": "2026-11-19",
   "changePct": -0.8,
   "close": 259500,
   "closeDate": "2026-11-19"
  },
  "035420": {
   "price": 168300,
   "date": "2026-11-19",
   "changePct": -1.2,
   "close": 168300,
   "closeDate": "2026-11-19"
  },
  "010120": {
   "price": 120800,
   "date": "2026-11-19",
   "changePct": 4.1,
   "close": 120800,
   "closeDate": "2026-11-19"
  },
  "030200": {
   "price": 47300,
   "date": "2026-11-19",
   "changePct": -4.4,
   "close": 47300,
   "closeDate": "2026-11-19"
  },
  "012330": {
   "price": 341500,
   "date": "2026-11-19",
   "changePct": -4.1,
   "close": 341500,
   "closeDate": "2026-11-19"
  },
  "047050": {
   "price": 48250,
   "date": "2026-11-19",
   "changePct": -4.8,
   "close": 48250,
   "closeDate": "2026-11-19"
  },
  "042700": {
   "price": 172400,
   "date": "2026-11-19",
   "changePct": 2.8,
   "close": 172400,
   "closeDate": "2026-11-19"
  },
  "064400": {
   "price": 75000,
   "date": "2026-11-19",
   "changePct": -2.3,
   "close": 75000,
   "closeDate": "2026-11-19"
  },
  "095340": {
   "price": 146900,
   "date": "2026-11-19",
   "changePct": 8.2,
   "close": 146900,
   "closeDate": "2026-11-19"
  },
  "MSFT": {
   "price": 498.3,
   "date": "2026-11-19",
   "changePct": -2,
   "close": 498.3,
   "closeDate": "2026-11-19"
  },
  "V": {
   "price": 402.25,
   "date": "2026-11-19",
   "changePct": -3.1,
   "close": 402.25,
   "closeDate": "2026-11-19"
  },
  "MA": {
   "price": 626.5,
   "date": "2026-11-19",
   "changePct": -2.6,
   "close": 626.5,
   "closeDate": "2026-11-19"
  },
  "GOOGL": {
   "price": 272.66,
   "date": "2026-11-19",
   "changePct": -3.5,
   "close": 272.66,
   "closeDate": "2026-11-19"
  },
  "NVDA": {
   "price": 145.98,
   "date": "2026-11-19",
   "changePct": -3.3,
   "close": 145.98,
   "closeDate": "2026-11-19"
  },
  "META": {
   "price": 596.22,
   "date": "2026-11-19",
   "changePct": -3.3,
   "close": 596.22,
   "closeDate": "2026-11-19"
  },
  "AVGO": {
   "price": 346.65,
   "date": "2026-11-19",
   "changePct": -2.1,
   "close": 346.65,
   "closeDate": "2026-11-19"
  },
  "TSM": {
   "price": 352.09,
   "date": "2026-11-19",
   "changePct": -2.9,
   "close": 352.09,
   "closeDate": "2026-11-19"
  },
  "UBER": {
   "price": 65.6,
   "date": "2026-11-19",
   "changePct": -4.6,
   "close": 65.6,
   "closeDate": "2026-11-19"
  },
  "GM": {
   "price": 81.75,
   "date": "2026-11-19",
   "changePct": -0.5,
   "close": 81.75,
   "closeDate": "2026-11-19"
  },
  "VZ": {
   "price": 45.74,
   "date": "2026-11-19",
   "changePct": -0.8,
   "close": 45.74,
   "closeDate": "2026-11-19"
  },
  "C": {
   "price": 115.28,
   "date": "2026-11-19",
   "changePct": -1.8,
   "close": 115.28,
   "closeDate": "2026-11-19"
  },
  "DUK": {
   "price": 128.86,
   "date": "2026-11-19",
   "changePct": -0.9,
   "close": 128.86,
   "closeDate": "2026-11-19"
  },
  "KO": {
   "price": 96.09,
   "date": "2026-11-19",
   "changePct": -2,
   "close": 96.09,
   "closeDate": "2026-11-19"
  },
  "JNJ": {
   "price": 267.14,
   "date": "2026-11-19",
   "changePct": -2,
   "close": 267.14,
   "closeDate": "2026-11-19"
  },
  "LLY": {
   "price": 1351.12,
   "date": "2026-11-19",
   "changePct": -2.3,
   "close": 1351.12,
   "closeDate": "2026-11-19"
  },
  "CI": {
   "price": 273.04,
   "date": "2026-11-19",
   "changePct": -4.3,
   "close": 273.04,
   "closeDate": "2026-11-19"
  },
  "TSLA": {
   "price": 374.41,
   "date": "2026-11-19",
   "changePct": -2.4,
   "close": 374.41,
   "closeDate": "2026-11-19"
  },
  "AAPL": {
   "price": 349.21,
   "date": "2026-11-19",
   "changePct": -0.9,
   "close": 349.21,
   "closeDate": "2026-11-19"
  },
  "MU": {
   "price": 690.44,
   "date": "2026-11-19",
   "changePct": -2.1,
   "close": 690.44,
   "closeDate": "2026-11-19"
  },
  "MDT": {
   "price": 100.61,
   "date": "2026-11-19",
   "changePct": -0.1,
   "close": 100.61,
   "closeDate": "2026-11-19"
  },
  "IREN": {
   "price": 14.41,
   "date": "2026-11-19",
   "changePct": -5.4,
   "close": 14.41,
   "closeDate": "2026-11-19"
  },
  "DVN": {
   "price": 42.05,
   "date": "2026-11-19",
   "changePct": 0.2,
   "close": 42.05,
   "closeDate": "2026-11-19"
  },
  "GS": {
   "price": 847.53,
   "date": "2026-11-19",
   "changePct": -2.9,
   "close": 847.53,
   "closeDate": "2026-11-19"
  },
  "AMP": {
   "price": 492.36,
   "date": "2026-11-19",
   "changePct": -1.8,
   "close": 492.36,
   "closeDate": "2026-11-19"
  },
  "PNC": {
   "price": 218,
   "date": "2026-11-19",
   "changePct": -1.4,
   "close": 218,
   "closeDate": "2026-11-19"
  },
  "MTB": {
   "price": 210.77,
   "date": "2026-11-19",
   "changePct": -1.6,
   "close": 210.77,
   "closeDate": "2026-11-19"
  },
  "SO": {
   "price": 93.29,
   "date": "2026-11-19",
   "changePct": -1.2,
   "close": 93.29,
   "closeDate": "2026-11-19"
  },
  "WEC": {
   "price": 116.11,
   "date": "2026-11-19",
   "changePct": -1.2,
   "close": 116.11,
   "closeDate": "2026-11-19"
  },
  "TJX": {
   "price": 139.41,
   "date": "2026-11-19",
   "changePct": -0.6,
   "close": 139.41,
   "closeDate": "2026-11-19"
  },
  "ANET": {
   "price": 189.59,
   "date": "2026-11-19",
   "changePct": -2.2,
   "close": 189.59,
   "closeDate": "2026-11-19"
  },
  "GD": {
   "price": 347.34,
   "date": "2026-11-19",
   "changePct": -0.5,
   "close": 347.34,
   "closeDate": "2026-11-19"
  },
  "LMT": {
   "price": 571.85,
   "date": "2026-11-19",
   "changePct": -1.1,
   "close": 571.85,
   "closeDate": "2026-11-19"
  },
  "CB": {
   "price": 370.11,
   "date": "2026-11-19",
   "changePct": -0.2,
   "close": 370.11,
   "closeDate": "2026-11-19"
  },
  "GILD": {
   "price": 166.53,
   "date": "2026-11-19",
   "changePct": -1.4,
   "close": 166.53,
   "closeDate": "2026-11-19"
  },
  "BRK.B": {
   "price": 572.04,
   "date": "2026-11-19",
   "changePct": -0.4,
   "close": 572.04,
   "closeDate": "2026-11-19"
  },
  "TMO": {
   "price": 688.75,
   "date": "2026-11-19",
   "changePct": -0.6,
   "close": 688.75,
   "closeDate": "2026-11-19"
  },
  "ECL": {
   "price": 297.32,
   "date": "2026-11-19",
   "changePct": -1.1,
   "close": 297.32,
   "closeDate": "2026-11-19"
  },
  "RSG": {
   "price": 246.49,
   "date": "2026-11-19",
   "changePct": -1.1,
   "close": 246.49,
   "closeDate": "2026-11-19"
  },
  "CTAS": {
   "price": 218.92,
   "date": "2026-11-19",
   "changePct": -1.4,
   "close": 218.92,
   "closeDate": "2026-11-19"
  },
  "ORLY": {
   "price": 92.61,
   "date": "2026-11-19",
   "changePct": -0.8,
   "close": 92.61,
   "closeDate": "2026-11-19"
  },
  "ADP": {
   "price": 301.19,
   "date": "2026-11-19",
   "changePct": -1.4,
   "close": 301.19,
   "closeDate": "2026-11-19"
  },
  "FAST": {
   "price": 52.68,
   "date": "2026-11-19",
   "changePct": -2.4,
   "close": 52.68,
   "closeDate": "2026-11-19"
  },
  "VRT": {
   "price": 184.99,
   "date": "2026-11-19",
   "changePct": -4.9,
   "close": 184.99,
   "closeDate": "2026-11-19"
  },
  "WAB": {
   "price": 280.73,
   "date": "2026-11-19",
   "changePct": -3.4,
   "close": 280.73,
   "closeDate": "2026-11-19"
  },
  "NTES": {
   "price": 104.94,
   "date": "2026-11-19",
   "changePct": -11.4,
   "close": 104.94,
   "closeDate": "2026-11-19"
  },
  "CSCO": {
   "price": 94.7,
   "date": "2026-11-19",
   "changePct": -2.6,
   "close": 94.7,
   "closeDate": "2026-11-19"
  },
  "TEL": {
   "price": 211.21,
   "date": "2026-11-19",
   "changePct": -0.4,
   "close": 211.21,
   "closeDate": "2026-11-19"
  },
  "LOGI": {
   "price": 99.55,
   "date": "2026-11-19",
   "changePct": -1.4,
   "close": 99.55,
   "closeDate": "2026-11-19"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5137.89,
   "date": "2026-11-19",
   "changePct": 1.4,
   "close": 5137.89,
   "closeDate": "2026-11-19",
   "at": "2026-11-19T22:14:16Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7175.83,
   "date": "2026-11-19",
   "changePct": -2,
   "close": 7175.83,
   "closeDate": "2026-11-19",
   "at": "2026-11-19T22:14:16Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 211.63,
   "date": "2026-11-19",
   "changePct": -1.8,
   "close": 211.63,
   "closeDate": "2026-11-19",
   "at": "2026-11-19T22:14:16Z"
  }
 }
};
