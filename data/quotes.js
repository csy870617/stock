// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-21",
 "quotes": {
  "103590": {
   "price": 53700,
   "date": "2026-11-20",
   "changePct": -4.3,
   "close": 53700,
   "closeDate": "2026-11-20"
  },
  "105560": {
   "price": 152400,
   "date": "2026-11-20",
   "changePct": -0.3,
   "close": 152400,
   "closeDate": "2026-11-20"
  },
  "138040": {
   "price": 125900,
   "date": "2026-11-20",
   "changePct": 0.6,
   "close": 125900,
   "closeDate": "2026-11-20"
  },
  "139130": {
   "price": 15500,
   "date": "2026-11-20",
   "changePct": -2.1,
   "close": 15500,
   "closeDate": "2026-11-20"
  },
  "175330": {
   "price": 25600,
   "date": "2026-11-20",
   "changePct": -0.2,
   "close": 25600,
   "closeDate": "2026-11-20"
  },
  "192400": {
   "price": 26150,
   "date": "2026-11-20",
   "changePct": -1.7,
   "close": 26150,
   "closeDate": "2026-11-20"
  },
  "207940": {
   "price": 1355000,
   "date": "2026-11-20",
   "changePct": -1.5,
   "close": 1355000,
   "closeDate": "2026-11-20"
  },
  "241560": {
   "price": 50200,
   "date": "2026-11-20",
   "changePct": -3.1,
   "close": 50200,
   "closeDate": "2026-11-20"
  },
  "267250": {
   "price": 113000,
   "date": "2026-11-20",
   "changePct": -4.3,
   "close": 113000,
   "closeDate": "2026-11-20"
  },
  "267260": {
   "price": 386500,
   "date": "2026-11-20",
   "changePct": -7,
   "close": 386500,
   "closeDate": "2026-11-20"
  },
  "267270": {
   "price": 79600,
   "date": "2026-11-20",
   "changePct": -12.8,
   "close": 79600,
   "closeDate": "2026-11-20"
  },
  "271560": {
   "price": 117400,
   "date": "2026-11-20",
   "changePct": -0.8,
   "close": 117400,
   "closeDate": "2026-11-20"
  },
  "282330": {
   "price": 140800,
   "date": "2026-11-20",
   "changePct": -0.1,
   "close": 140800,
   "closeDate": "2026-11-20"
  },
  "298040": {
   "price": 1679000,
   "date": "2026-11-20",
   "changePct": -6.5,
   "close": 1679000,
   "closeDate": "2026-11-20"
  },
  "316140": {
   "price": 31650,
   "date": "2026-11-20",
   "changePct": -0.3,
   "close": 31650,
   "closeDate": "2026-11-20"
  },
  "323410": {
   "price": 21650,
   "date": "2026-11-20",
   "changePct": 0.9,
   "close": 21650,
   "closeDate": "2026-11-20"
  },
  "361610": {
   "price": 11020,
   "date": "2026-11-20",
   "changePct": -3.9,
   "close": 11020,
   "closeDate": "2026-11-20"
  },
  "402340": {
   "price": 677000,
   "date": "2026-11-20",
   "changePct": -8.4,
   "close": 677000,
   "closeDate": "2026-11-20"
  },
  "005930": {
   "price": 183100,
   "date": "2026-11-20",
   "changePct": -7,
   "close": 183100,
   "closeDate": "2026-11-20"
  },
  "055550": {
   "price": 86200,
   "date": "2026-11-20",
   "changePct": 0.7,
   "close": 86200,
   "closeDate": "2026-11-20"
  },
  "000810": {
   "price": 511000,
   "date": "2026-11-20",
   "changePct": -2.7,
   "close": 511000,
   "closeDate": "2026-11-20"
  },
  "012450": {
   "price": 605000,
   "date": "2026-11-20",
   "changePct": -4.1,
   "close": 605000,
   "closeDate": "2026-11-20"
  },
  "009540": {
   "price": 222500,
   "date": "2026-11-20",
   "changePct": -3.7,
   "close": 222500,
   "closeDate": "2026-11-20"
  },
  "068270": {
   "price": 213000,
   "date": "2026-11-20",
   "changePct": -0.9,
   "close": 213000,
   "closeDate": "2026-11-20"
  },
  "000270": {
   "price": 88200,
   "date": "2026-11-20",
   "changePct": -3.6,
   "close": 88200,
   "closeDate": "2026-11-20"
  },
  "032640": {
   "price": 14970,
   "date": "2026-11-20",
   "changePct": -1.4,
   "close": 14970,
   "closeDate": "2026-11-20"
  },
  "029780": {
   "price": 41400,
   "date": "2026-11-20",
   "changePct": -0.7,
   "close": 41400,
   "closeDate": "2026-11-20"
  },
  "035900": {
   "price": 47000,
   "date": "2026-11-20",
   "changePct": -2,
   "close": 47000,
   "closeDate": "2026-11-20"
  },
  "036570": {
   "price": 179600,
   "date": "2026-11-20",
   "changePct": -2.4,
   "close": 179600,
   "closeDate": "2026-11-20"
  },
  "035720": {
   "price": 31000,
   "date": "2026-11-20",
   "changePct": -2.8,
   "close": 31000,
   "closeDate": "2026-11-20"
  },
  "001040": {
   "price": 114500,
   "date": "2026-11-20",
   "changePct": 0.3,
   "close": 114500,
   "closeDate": "2026-11-20"
  },
  "012750": {
   "price": 105000,
   "date": "2026-11-20",
   "changePct": -0.8,
   "close": 105000,
   "closeDate": "2026-11-20"
  },
  "000660": {
   "price": 1113000,
   "date": "2026-11-20",
   "changePct": -5.9,
   "close": 1113000,
   "closeDate": "2026-11-20"
  },
  "086790": {
   "price": 123900,
   "date": "2026-11-20",
   "changePct": 0,
   "close": 123900,
   "closeDate": "2026-11-20"
  },
  "001120": {
   "price": 32600,
   "date": "2026-11-20",
   "changePct": -3.7,
   "close": 32600,
   "closeDate": "2026-11-20"
  },
  "005830": {
   "price": 164400,
   "date": "2026-11-20",
   "changePct": -2.4,
   "close": 164400,
   "closeDate": "2026-11-20"
  },
  "066570": {
   "price": 130600,
   "date": "2026-11-20",
   "changePct": -3.9,
   "close": 130600,
   "closeDate": "2026-11-20"
  },
  "086280": {
   "price": 204500,
   "date": "2026-11-20",
   "changePct": 0.5,
   "close": 204500,
   "closeDate": "2026-11-20"
  },
  "018260": {
   "price": 209500,
   "date": "2026-11-20",
   "changePct": -2.3,
   "close": 209500,
   "closeDate": "2026-11-20"
  },
  "005850": {
   "price": 35600,
   "date": "2026-11-20",
   "changePct": -5.9,
   "close": 35600,
   "closeDate": "2026-11-20"
  },
  "005490": {
   "price": 252000,
   "date": "2026-11-20",
   "changePct": -2.9,
   "close": 252000,
   "closeDate": "2026-11-20"
  },
  "035420": {
   "price": 161600,
   "date": "2026-11-20",
   "changePct": -4,
   "close": 161600,
   "closeDate": "2026-11-20"
  },
  "010120": {
   "price": 109700,
   "date": "2026-11-20",
   "changePct": -9.2,
   "close": 109700,
   "closeDate": "2026-11-20"
  },
  "030200": {
   "price": 45500,
   "date": "2026-11-20",
   "changePct": -3.8,
   "close": 45500,
   "closeDate": "2026-11-20"
  },
  "012330": {
   "price": 323000,
   "date": "2026-11-20",
   "changePct": -5.4,
   "close": 323000,
   "closeDate": "2026-11-20"
  },
  "047050": {
   "price": 46550,
   "date": "2026-11-20",
   "changePct": -3.5,
   "close": 46550,
   "closeDate": "2026-11-20"
  },
  "042700": {
   "price": 153800,
   "date": "2026-11-20",
   "changePct": -10.8,
   "close": 153800,
   "closeDate": "2026-11-20"
  },
  "064400": {
   "price": 71800,
   "date": "2026-11-20",
   "changePct": -4.3,
   "close": 71800,
   "closeDate": "2026-11-20"
  },
  "095340": {
   "price": 127100,
   "date": "2026-11-20",
   "changePct": -13.5,
   "close": 127100,
   "closeDate": "2026-11-20"
  },
  "MSFT": {
   "price": 484.52,
   "date": "2026-11-20",
   "changePct": -2.8,
   "close": 484.52,
   "closeDate": "2026-11-20"
  },
  "V": {
   "price": 401.87,
   "date": "2026-11-20",
   "changePct": -0.1,
   "close": 401.87,
   "closeDate": "2026-11-20"
  },
  "MA": {
   "price": 625.59,
   "date": "2026-11-20",
   "changePct": -0.1,
   "close": 625.59,
   "closeDate": "2026-11-20"
  },
  "GOOGL": {
   "price": 265.29,
   "date": "2026-11-20",
   "changePct": -2.7,
   "close": 265.29,
   "closeDate": "2026-11-20"
  },
  "NVDA": {
   "price": 125.53,
   "date": "2026-11-20",
   "changePct": -14,
   "close": 125.53,
   "closeDate": "2026-11-20"
  },
  "META": {
   "price": 560.84,
   "date": "2026-11-20",
   "changePct": -5.9,
   "close": 560.84,
   "closeDate": "2026-11-20"
  },
  "AVGO": {
   "price": 304.41,
   "date": "2026-11-20",
   "changePct": -12.2,
   "close": 304.41,
   "closeDate": "2026-11-20"
  },
  "TSM": {
   "price": 318.71,
   "date": "2026-11-20",
   "changePct": -9.5,
   "close": 318.71,
   "closeDate": "2026-11-20"
  },
  "UBER": {
   "price": 63.47,
   "date": "2026-11-20",
   "changePct": -3.2,
   "close": 63.47,
   "closeDate": "2026-11-20"
  },
  "GM": {
   "price": 78.71,
   "date": "2026-11-20",
   "changePct": -3.7,
   "close": 78.71,
   "closeDate": "2026-11-20"
  },
  "VZ": {
   "price": 46.48,
   "date": "2026-11-20",
   "changePct": 1.6,
   "close": 46.48,
   "closeDate": "2026-11-20"
  },
  "C": {
   "price": 110.62,
   "date": "2026-11-20",
   "changePct": -4,
   "close": 110.62,
   "closeDate": "2026-11-20"
  },
  "DUK": {
   "price": 129.78,
   "date": "2026-11-20",
   "changePct": 0.7,
   "close": 129.78,
   "closeDate": "2026-11-20"
  },
  "KO": {
   "price": 96.99,
   "date": "2026-11-20",
   "changePct": 0.9,
   "close": 96.99,
   "closeDate": "2026-11-20"
  },
  "JNJ": {
   "price": 270.47,
   "date": "2026-11-20",
   "changePct": 1.2,
   "close": 270.47,
   "closeDate": "2026-11-20"
  },
  "LLY": {
   "price": 1347.11,
   "date": "2026-11-20",
   "changePct": -0.3,
   "close": 1347.11,
   "closeDate": "2026-11-20"
  },
  "CI": {
   "price": 270.9,
   "date": "2026-11-20",
   "changePct": -0.8,
   "close": 270.9,
   "closeDate": "2026-11-20"
  },
  "TSLA": {
   "price": 345.82,
   "date": "2026-11-20",
   "changePct": -7.6,
   "close": 345.82,
   "closeDate": "2026-11-20"
  },
  "AAPL": {
   "price": 342.56,
   "date": "2026-11-20",
   "changePct": -1.9,
   "close": 342.56,
   "closeDate": "2026-11-20"
  },
  "MU": {
   "price": 594.51,
   "date": "2026-11-20",
   "changePct": -13.9,
   "close": 594.51,
   "closeDate": "2026-11-20"
  },
  "MDT": {
   "price": 99.94,
   "date": "2026-11-20",
   "changePct": -0.7,
   "close": 99.94,
   "closeDate": "2026-11-20"
  },
  "IREN": {
   "price": 11.82,
   "date": "2026-11-20",
   "changePct": -18,
   "close": 11.82,
   "closeDate": "2026-11-20"
  },
  "DVN": {
   "price": 41.54,
   "date": "2026-11-20",
   "changePct": -1.2,
   "close": 41.54,
   "closeDate": "2026-11-20"
  },
  "GS": {
   "price": 790.69,
   "date": "2026-11-20",
   "changePct": -6.7,
   "close": 790.69,
   "closeDate": "2026-11-20"
  },
  "AMP": {
   "price": 480.29,
   "date": "2026-11-20",
   "changePct": -2.5,
   "close": 480.29,
   "closeDate": "2026-11-20"
  },
  "PNC": {
   "price": 213.12,
   "date": "2026-11-20",
   "changePct": -2.2,
   "close": 213.12,
   "closeDate": "2026-11-20"
  },
  "MTB": {
   "price": 208.3,
   "date": "2026-11-20",
   "changePct": -1.2,
   "close": 208.3,
   "closeDate": "2026-11-20"
  },
  "SO": {
   "price": 93.13,
   "date": "2026-11-20",
   "changePct": -0.2,
   "close": 93.13,
   "closeDate": "2026-11-20"
  },
  "WEC": {
   "price": 117.07,
   "date": "2026-11-20",
   "changePct": 0.8,
   "close": 117.07,
   "closeDate": "2026-11-20"
  },
  "TJX": {
   "price": 139.62,
   "date": "2026-11-20",
   "changePct": 0.2,
   "close": 139.62,
   "closeDate": "2026-11-20"
  },
  "ANET": {
   "price": 167.62,
   "date": "2026-11-20",
   "changePct": -11.6,
   "close": 167.62,
   "closeDate": "2026-11-20"
  },
  "GD": {
   "price": 341.5,
   "date": "2026-11-20",
   "changePct": -1.7,
   "close": 341.5,
   "closeDate": "2026-11-20"
  },
  "LMT": {
   "price": 565.5,
   "date": "2026-11-20",
   "changePct": -1.1,
   "close": 565.5,
   "closeDate": "2026-11-20"
  },
  "CB": {
   "price": 371.63,
   "date": "2026-11-20",
   "changePct": 0.4,
   "close": 371.63,
   "closeDate": "2026-11-20"
  },
  "GILD": {
   "price": 166.43,
   "date": "2026-11-20",
   "changePct": -0.1,
   "close": 166.43,
   "closeDate": "2026-11-20"
  },
  "BRK.B": {
   "price": 570,
   "date": "2026-11-20",
   "changePct": -0.4,
   "close": 570,
   "closeDate": "2026-11-20"
  },
  "TMO": {
   "price": 669.54,
   "date": "2026-11-20",
   "changePct": -2.8,
   "close": 669.54,
   "closeDate": "2026-11-20"
  },
  "ECL": {
   "price": 294.7,
   "date": "2026-11-20",
   "changePct": -0.9,
   "close": 294.7,
   "closeDate": "2026-11-20"
  },
  "RSG": {
   "price": 246.59,
   "date": "2026-11-20",
   "changePct": 0,
   "close": 246.59,
   "closeDate": "2026-11-20"
  },
  "CTAS": {
   "price": 220.01,
   "date": "2026-11-20",
   "changePct": 0.5,
   "close": 220.01,
   "closeDate": "2026-11-20"
  },
  "ORLY": {
   "price": 92.65,
   "date": "2026-11-20",
   "changePct": 0,
   "close": 92.65,
   "closeDate": "2026-11-20"
  },
  "ADP": {
   "price": 301.71,
   "date": "2026-11-20",
   "changePct": 0.2,
   "close": 301.71,
   "closeDate": "2026-11-20"
  },
  "FAST": {
   "price": 50.61,
   "date": "2026-11-20",
   "changePct": -3.9,
   "close": 50.61,
   "closeDate": "2026-11-20"
  },
  "VRT": {
   "price": 166.24,
   "date": "2026-11-20",
   "changePct": -10.1,
   "close": 166.24,
   "closeDate": "2026-11-20"
  },
  "WAB": {
   "price": 269.31,
   "date": "2026-11-20",
   "changePct": -4.1,
   "close": 269.31,
   "closeDate": "2026-11-20"
  },
  "CSCO": {
   "price": 90.64,
   "date": "2026-11-20",
   "changePct": -4.3,
   "close": 90.64,
   "closeDate": "2026-11-20"
  },
  "TEL": {
   "price": 199.97,
   "date": "2026-11-20",
   "changePct": -5.3,
   "close": 199.97,
   "closeDate": "2026-11-20"
  },
  "LOGI": {
   "price": 97.21,
   "date": "2026-11-20",
   "changePct": -2.4,
   "close": 97.21,
   "closeDate": "2026-11-20"
  },
  "RMD": {
   "price": 235.63,
   "date": "2026-11-20",
   "changePct": -0.5,
   "close": 235.63,
   "closeDate": "2026-11-20"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 4869.96,
   "date": "2026-11-20",
   "changePct": -5.2,
   "close": 4869.96,
   "closeDate": "2026-11-20",
   "at": "2026-11-21T01:36:49Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 6910.39,
   "date": "2026-11-20",
   "changePct": -3.7,
   "close": 6910.39,
   "closeDate": "2026-11-20",
   "at": "2026-11-21T01:36:49Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 207.44,
   "date": "2026-11-20",
   "changePct": -2,
   "close": 207.44,
   "closeDate": "2026-11-20",
   "at": "2026-11-21T01:36:49Z"
  }
 }
};
