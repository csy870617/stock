// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-20",
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
   "price": 494.85,
   "date": "2026-11-20",
   "changePct": -0.7,
   "close": 498.3,
   "closeDate": "2026-11-19"
  },
  "V": {
   "price": 407.99,
   "date": "2026-11-20",
   "changePct": 1.4,
   "close": 402.25,
   "closeDate": "2026-11-19"
  },
  "MA": {
   "price": 634.965,
   "date": "2026-11-20",
   "changePct": 1.4,
   "close": 626.5,
   "closeDate": "2026-11-19"
  },
  "GOOGL": {
   "price": 278.77,
   "date": "2026-11-20",
   "changePct": 2.2,
   "close": 272.66,
   "closeDate": "2026-11-19"
  },
  "NVDA": {
   "price": 137.045,
   "date": "2026-11-20",
   "changePct": -6.1,
   "close": 145.98,
   "closeDate": "2026-11-19"
  },
  "META": {
   "price": 578.48,
   "date": "2026-11-20",
   "changePct": -3,
   "close": 596.22,
   "closeDate": "2026-11-19"
  },
  "AVGO": {
   "price": 317.857,
   "date": "2026-11-20",
   "changePct": -8.3,
   "close": 346.65,
   "closeDate": "2026-11-19"
  },
  "TSM": {
   "price": 329.77,
   "date": "2026-11-20",
   "changePct": -6.3,
   "close": 352.09,
   "closeDate": "2026-11-19"
  },
  "UBER": {
   "price": 67.06,
   "date": "2026-11-20",
   "changePct": 2.2,
   "close": 65.6,
   "closeDate": "2026-11-19"
  },
  "GM": {
   "price": 81.13,
   "date": "2026-11-20",
   "changePct": -0.8,
   "close": 81.75,
   "closeDate": "2026-11-19"
  },
  "VZ": {
   "price": 46.78,
   "date": "2026-11-20",
   "changePct": 2.3,
   "close": 45.74,
   "closeDate": "2026-11-19"
  },
  "C": {
   "price": 112.32,
   "date": "2026-11-20",
   "changePct": -2.6,
   "close": 115.28,
   "closeDate": "2026-11-19"
  },
  "DUK": {
   "price": 130.915,
   "date": "2026-11-20",
   "changePct": 1.6,
   "close": 128.86,
   "closeDate": "2026-11-19"
  },
  "KO": {
   "price": 97.39,
   "date": "2026-11-20",
   "changePct": 1.4,
   "close": 96.09,
   "closeDate": "2026-11-19"
  },
  "JNJ": {
   "price": 271.99,
   "date": "2026-11-20",
   "changePct": 1.8,
   "close": 267.14,
   "closeDate": "2026-11-19"
  },
  "LLY": {
   "price": 1361.91,
   "date": "2026-11-20",
   "changePct": 0.8,
   "close": 1351.12,
   "closeDate": "2026-11-19"
  },
  "CI": {
   "price": 278.39,
   "date": "2026-11-20",
   "changePct": 2,
   "close": 273.04,
   "closeDate": "2026-11-19"
  },
  "TSLA": {
   "price": 363.89,
   "date": "2026-11-20",
   "changePct": -2.8,
   "close": 374.41,
   "closeDate": "2026-11-19"
  },
  "AAPL": {
   "price": 348.9,
   "date": "2026-11-20",
   "changePct": -0.1,
   "close": 349.21,
   "closeDate": "2026-11-19"
  },
  "MU": {
   "price": 621.31,
   "date": "2026-11-20",
   "changePct": -10,
   "close": 690.44,
   "closeDate": "2026-11-19"
  },
  "MDT": {
   "price": 102.27,
   "date": "2026-11-20",
   "changePct": 1.6,
   "close": 100.61,
   "closeDate": "2026-11-19"
  },
  "IREN": {
   "price": 12.814,
   "date": "2026-11-20",
   "changePct": -11.1,
   "close": 14.41,
   "closeDate": "2026-11-19"
  },
  "DVN": {
   "price": 42.275,
   "date": "2026-11-20",
   "changePct": 0.5,
   "close": 42.05,
   "closeDate": "2026-11-19"
  },
  "GS": {
   "price": 808.33,
   "date": "2026-11-20",
   "changePct": -4.6,
   "close": 847.53,
   "closeDate": "2026-11-19"
  },
  "AMP": {
   "price": 495.33,
   "date": "2026-11-20",
   "changePct": 0.6,
   "close": 492.36,
   "closeDate": "2026-11-19"
  },
  "PNC": {
   "price": 219.305,
   "date": "2026-11-20",
   "changePct": 0.6,
   "close": 218,
   "closeDate": "2026-11-19"
  },
  "MTB": {
   "price": 212.87,
   "date": "2026-11-20",
   "changePct": 1,
   "close": 210.77,
   "closeDate": "2026-11-19"
  },
  "SO": {
   "price": 94.315,
   "date": "2026-11-20",
   "changePct": 1.1,
   "close": 93.29,
   "closeDate": "2026-11-19"
  },
  "WEC": {
   "price": 117.96,
   "date": "2026-11-20",
   "changePct": 1.6,
   "close": 116.11,
   "closeDate": "2026-11-19"
  },
  "TJX": {
   "price": 140.85,
   "date": "2026-11-20",
   "changePct": 1,
   "close": 139.41,
   "closeDate": "2026-11-19"
  },
  "ANET": {
   "price": 171.48,
   "date": "2026-11-20",
   "changePct": -9.6,
   "close": 189.59,
   "closeDate": "2026-11-19"
  },
  "GD": {
   "price": 349.58,
   "date": "2026-11-20",
   "changePct": 0.6,
   "close": 347.34,
   "closeDate": "2026-11-19"
  },
  "LMT": {
   "price": 574.46,
   "date": "2026-11-20",
   "changePct": 0.5,
   "close": 571.85,
   "closeDate": "2026-11-19"
  },
  "CB": {
   "price": 378.64,
   "date": "2026-11-20",
   "changePct": 2.3,
   "close": 370.11,
   "closeDate": "2026-11-19"
  },
  "GILD": {
   "price": 169.53,
   "date": "2026-11-20",
   "changePct": 1.8,
   "close": 166.53,
   "closeDate": "2026-11-19"
  },
  "BRK.B": {
   "price": 576.06,
   "date": "2026-11-20",
   "changePct": 0.7,
   "close": 572.04,
   "closeDate": "2026-11-19"
  },
  "TMO": {
   "price": 680.16,
   "date": "2026-11-20",
   "changePct": -1.2,
   "close": 688.75,
   "closeDate": "2026-11-19"
  },
  "ECL": {
   "price": 299.325,
   "date": "2026-11-20",
   "changePct": 0.7,
   "close": 297.32,
   "closeDate": "2026-11-19"
  },
  "RSG": {
   "price": 250.3,
   "date": "2026-11-20",
   "changePct": 1.5,
   "close": 246.49,
   "closeDate": "2026-11-19"
  },
  "CTAS": {
   "price": 226.385,
   "date": "2026-11-20",
   "changePct": 3.4,
   "close": 218.92,
   "closeDate": "2026-11-19"
  },
  "ORLY": {
   "price": 94.91,
   "date": "2026-11-20",
   "changePct": 2.5,
   "close": 92.61,
   "closeDate": "2026-11-19"
  },
  "ADP": {
   "price": 307.005,
   "date": "2026-11-20",
   "changePct": 1.9,
   "close": 301.19,
   "closeDate": "2026-11-19"
  },
  "FAST": {
   "price": 52.56,
   "date": "2026-11-20",
   "changePct": -0.2,
   "close": 52.68,
   "closeDate": "2026-11-19"
  },
  "VRT": {
   "price": 168.615,
   "date": "2026-11-20",
   "changePct": -8.9,
   "close": 184.99,
   "closeDate": "2026-11-19"
  },
  "WAB": {
   "price": 274.09,
   "date": "2026-11-20",
   "changePct": -2.4,
   "close": 280.73,
   "closeDate": "2026-11-19"
  },
  "CSCO": {
   "price": 93.36,
   "date": "2026-11-20",
   "changePct": -1.4,
   "close": 94.7,
   "closeDate": "2026-11-19"
  },
  "TEL": {
   "price": 205.505,
   "date": "2026-11-20",
   "changePct": -2.7,
   "close": 211.21,
   "closeDate": "2026-11-19"
  },
  "LOGI": {
   "price": 99.18,
   "date": "2026-11-20",
   "changePct": -0.4,
   "close": 99.55,
   "closeDate": "2026-11-19"
  },
  "RMD": {
   "price": 239.655,
   "date": "2026-11-20",
   "changePct": 1.2,
   "close": 236.88,
   "closeDate": "2026-11-19"
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
   "at": "2026-11-20T15:43:19Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7104.02,
   "date": "2026-11-20",
   "changePct": -1,
   "close": 7175.8301,
   "closeDate": "2026-11-19",
   "at": "2026-11-20T15:43:19Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 212.06,
   "date": "2026-11-20",
   "changePct": 0.2,
   "close": 211.63,
   "closeDate": "2026-11-19",
   "at": "2026-11-20T15:43:19Z"
  }
 }
};
