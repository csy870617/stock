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
   "price": 508.29,
   "date": "2026-11-18",
   "changePct": 0.4,
   "close": 508.29,
   "closeDate": "2026-11-18"
  },
  "V": {
   "price": 415.22,
   "date": "2026-11-18",
   "changePct": -0.4,
   "close": 415.22,
   "closeDate": "2026-11-18"
  },
  "MA": {
   "price": 643.37,
   "date": "2026-11-18",
   "changePct": -0.4,
   "close": 643.37,
   "closeDate": "2026-11-18"
  },
  "GOOGL": {
   "price": 282.44,
   "date": "2026-11-18",
   "changePct": 0.8,
   "close": 282.44,
   "closeDate": "2026-11-18"
  },
  "NVDA": {
   "price": 150.96,
   "date": "2026-11-18",
   "changePct": -2.9,
   "close": 150.96,
   "closeDate": "2026-11-18"
  },
  "META": {
   "price": 616.38,
   "date": "2026-11-18",
   "changePct": -0.4,
   "close": 616.38,
   "closeDate": "2026-11-18"
  },
  "AVGO": {
   "price": 354.05,
   "date": "2026-11-18",
   "changePct": 3.6,
   "close": 354.05,
   "closeDate": "2026-11-18"
  },
  "TSM": {
   "price": 362.62,
   "date": "2026-11-18",
   "changePct": 0.8,
   "close": 362.62,
   "closeDate": "2026-11-18"
  },
  "UBER": {
   "price": 68.76,
   "date": "2026-11-18",
   "changePct": -0.1,
   "close": 68.76,
   "closeDate": "2026-11-18"
  },
  "GM": {
   "price": 82.13,
   "date": "2026-11-18",
   "changePct": -2.3,
   "close": 82.13,
   "closeDate": "2026-11-18"
  },
  "VZ": {
   "price": 46.13,
   "date": "2026-11-18",
   "changePct": 0.4,
   "close": 46.13,
   "closeDate": "2026-11-18"
  },
  "C": {
   "price": 117.34,
   "date": "2026-11-18",
   "changePct": -2.2,
   "close": 117.34,
   "closeDate": "2026-11-18"
  },
  "DUK": {
   "price": 130.05,
   "date": "2026-11-18",
   "changePct": 0.2,
   "close": 130.05,
   "closeDate": "2026-11-18"
  },
  "KO": {
   "price": 98.09,
   "date": "2026-11-18",
   "changePct": -0.7,
   "close": 98.09,
   "closeDate": "2026-11-18"
  },
  "JNJ": {
   "price": 272.7,
   "date": "2026-11-18",
   "changePct": -2.2,
   "close": 272.7,
   "closeDate": "2026-11-18"
  },
  "LLY": {
   "price": 1382.75,
   "date": "2026-11-18",
   "changePct": -2.3,
   "close": 1382.75,
   "closeDate": "2026-11-18"
  },
  "CI": {
   "price": 285.37,
   "date": "2026-11-18",
   "changePct": -3,
   "close": 285.37,
   "closeDate": "2026-11-18"
  },
  "TSLA": {
   "price": 383.72,
   "date": "2026-11-18",
   "changePct": 0.9,
   "close": 383.72,
   "closeDate": "2026-11-18"
  },
  "AAPL": {
   "price": 352.45,
   "date": "2026-11-18",
   "changePct": 0.2,
   "close": 352.45,
   "closeDate": "2026-11-18"
  },
  "MU": {
   "price": 705.27,
   "date": "2026-11-18",
   "changePct": -1,
   "close": 705.27,
   "closeDate": "2026-11-18"
  },
  "MDT": {
   "price": 100.72,
   "date": "2026-11-18",
   "changePct": -1.6,
   "close": 100.72,
   "closeDate": "2026-11-18"
  },
  "IREN": {
   "price": 15.24,
   "date": "2026-11-18",
   "changePct": -3.6,
   "close": 15.24,
   "closeDate": "2026-11-18"
  },
  "DVN": {
   "price": 41.96,
   "date": "2026-11-18",
   "changePct": -3.5,
   "close": 41.96,
   "closeDate": "2026-11-18"
  },
  "GS": {
   "price": 873.18,
   "date": "2026-11-18",
   "changePct": -0.5,
   "close": 873.18,
   "closeDate": "2026-11-18"
  },
  "AMP": {
   "price": 501.42,
   "date": "2026-11-18",
   "changePct": -0.9,
   "close": 501.42,
   "closeDate": "2026-11-18"
  },
  "PNC": {
   "price": 221.14,
   "date": "2026-11-18",
   "changePct": -1.4,
   "close": 221.14,
   "closeDate": "2026-11-18"
  },
  "MTB": {
   "price": 214.17,
   "date": "2026-11-18",
   "changePct": -0.8,
   "close": 214.17,
   "closeDate": "2026-11-18"
  },
  "SO": {
   "price": 94.41,
   "date": "2026-11-18",
   "changePct": 0.9,
   "close": 94.41,
   "closeDate": "2026-11-18"
  },
  "WEC": {
   "price": 117.47,
   "date": "2026-11-18",
   "changePct": 1,
   "close": 117.47,
   "closeDate": "2026-11-18"
  },
  "TJX": {
   "price": 140.3,
   "date": "2026-11-18",
   "changePct": 8,
   "close": 140.3,
   "closeDate": "2026-11-18"
  },
  "ANET": {
   "price": 193.94,
   "date": "2026-11-18",
   "changePct": 4,
   "close": 193.94,
   "closeDate": "2026-11-18"
  },
  "GD": {
   "price": 349.04,
   "date": "2026-11-18",
   "changePct": -1.9,
   "close": 349.04,
   "closeDate": "2026-11-18"
  },
  "LMT": {
   "price": 578.19,
   "date": "2026-11-18",
   "changePct": -2.1,
   "close": 578.19,
   "closeDate": "2026-11-18"
  },
  "CB": {
   "price": 371.02,
   "date": "2026-11-18",
   "changePct": -1.2,
   "close": 371.02,
   "closeDate": "2026-11-18"
  },
  "GILD": {
   "price": 168.98,
   "date": "2026-11-18",
   "changePct": -0.8,
   "close": 168.98,
   "closeDate": "2026-11-18"
  },
  "BRK.B": {
   "price": 574.62,
   "date": "2026-11-18",
   "changePct": -2.1,
   "close": 574.62,
   "closeDate": "2026-11-18"
  },
  "TMO": {
   "price": 692.74,
   "date": "2026-11-18",
   "changePct": 0.9,
   "close": 692.74,
   "closeDate": "2026-11-18"
  },
  "ECL": {
   "price": 300.68,
   "date": "2026-11-18",
   "changePct": -0.6,
   "close": 300.68,
   "closeDate": "2026-11-18"
  },
  "RSG": {
   "price": 249.16,
   "date": "2026-11-18",
   "changePct": -1.5,
   "close": 249.16,
   "closeDate": "2026-11-18"
  },
  "CTAS": {
   "price": 222,
   "date": "2026-11-18",
   "changePct": -0.1,
   "close": 222,
   "closeDate": "2026-11-18"
  },
  "ORLY": {
   "price": 93.37,
   "date": "2026-11-18",
   "changePct": 0.7,
   "close": 93.37,
   "closeDate": "2026-11-18"
  },
  "ADP": {
   "price": 305.57,
   "date": "2026-11-18",
   "changePct": -0.9,
   "close": 305.57,
   "closeDate": "2026-11-18"
  },
  "FAST": {
   "price": 53.96,
   "date": "2026-11-18",
   "changePct": -0.7,
   "close": 53.96,
   "closeDate": "2026-11-18"
  },
  "VRT": {
   "price": 194.48,
   "date": "2026-11-18",
   "changePct": 2.2,
   "close": 194.48,
   "closeDate": "2026-11-18"
  },
  "WAB": {
   "price": 290.58,
   "date": "2026-11-18",
   "changePct": 0.1,
   "close": 290.58,
   "closeDate": "2026-11-18"
  },
  "NTES": {
   "price": 118.43,
   "date": "2026-11-18",
   "changePct": -1,
   "close": 118.43,
   "closeDate": "2026-11-18"
  },
  "CSCO": {
   "price": 97.18,
   "date": "2026-11-18",
   "changePct": 2.2,
   "close": 97.18,
   "closeDate": "2026-11-18"
  },
  "TEL": {
   "price": 212.09,
   "date": "2026-11-18",
   "changePct": 0.3,
   "close": 212.09,
   "closeDate": "2026-11-18"
  },
  "LOGI": {
   "price": 101.01,
   "date": "2026-11-18",
   "changePct": 1.8,
   "close": 101.01,
   "closeDate": "2026-11-18"
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
   "at": "2026-11-19T09:18:01Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7323.63,
   "date": "2026-11-18",
   "changePct": -0.2,
   "close": 7323.63,
   "closeDate": "2026-11-18",
   "at": "2026-11-19T09:18:01Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215.43,
   "date": "2026-11-18",
   "changePct": -0.2,
   "close": 215.43,
   "closeDate": "2026-11-18",
   "at": "2026-11-19T09:18:01Z"
  }
 }
};
