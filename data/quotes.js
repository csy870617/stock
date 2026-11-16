// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-16",
 "quotes": {
  "103590": {
   "price": 56200,
   "date": "2026-11-16",
   "changePct": -0.9,
   "close": 56200,
   "closeDate": "2026-11-16"
  },
  "105560": {
   "price": 161600,
   "date": "2026-11-16",
   "changePct": 1.6,
   "close": 161600,
   "closeDate": "2026-11-16"
  },
  "138040": {
   "price": 121400,
   "date": "2026-11-16",
   "changePct": 2.3,
   "close": 121400,
   "closeDate": "2026-11-16"
  },
  "139130": {
   "price": 15840,
   "date": "2026-11-16",
   "changePct": 0.6,
   "close": 15840,
   "closeDate": "2026-11-16"
  },
  "175330": {
   "price": 27450,
   "date": "2026-11-16",
   "changePct": 1.9,
   "close": 27450,
   "closeDate": "2026-11-16"
  },
  "192400": {
   "price": 28000,
   "date": "2026-11-16",
   "changePct": 1.8,
   "close": 28000,
   "closeDate": "2026-11-16"
  },
  "207940": {
   "price": 1423000,
   "date": "2026-11-16",
   "changePct": 0.9,
   "close": 1423000,
   "closeDate": "2026-11-16"
  },
  "241560": {
   "price": 51900,
   "date": "2026-11-16",
   "changePct": -2.1,
   "close": 51900,
   "closeDate": "2026-11-16"
  },
  "267250": {
   "price": 123200,
   "date": "2026-11-16",
   "changePct": -1.1,
   "close": 123200,
   "closeDate": "2026-11-16"
  },
  "267260": {
   "price": 401000,
   "date": "2026-11-16",
   "changePct": -3.6,
   "close": 401000,
   "closeDate": "2026-11-16"
  },
  "267270": {
   "price": 90800,
   "date": "2026-11-16",
   "changePct": -2.4,
   "close": 90800,
   "closeDate": "2026-11-16"
  },
  "278470": {
   "price": 240000,
   "date": "2026-11-16",
   "changePct": 1.7,
   "close": 240000,
   "closeDate": "2026-11-16"
  },
  "298040": {
   "price": 1743000,
   "date": "2026-11-16",
   "changePct": -3.5,
   "close": 1743000,
   "closeDate": "2026-11-16"
  },
  "316140": {
   "price": 33000,
   "date": "2026-11-16",
   "changePct": 1.5,
   "close": 33000,
   "closeDate": "2026-11-16"
  },
  "323410": {
   "price": 21200,
   "date": "2026-11-16",
   "changePct": 1.9,
   "close": 21200,
   "closeDate": "2026-11-16"
  },
  "361610": {
   "price": 12320,
   "date": "2026-11-16",
   "changePct": -2.6,
   "close": 12320,
   "closeDate": "2026-11-16"
  },
  "005930": {
   "price": 196800,
   "date": "2026-11-16",
   "changePct": -4.5,
   "close": 196800,
   "closeDate": "2026-11-16"
  },
  "055550": {
   "price": 90700,
   "date": "2026-11-16",
   "changePct": 1,
   "close": 90700,
   "closeDate": "2026-11-16"
  },
  "000810": {
   "price": 542000,
   "date": "2026-11-16",
   "changePct": 2.5,
   "close": 542000,
   "closeDate": "2026-11-16"
  },
  "012450": {
   "price": 649000,
   "date": "2026-11-16",
   "changePct": 1.2,
   "close": 649000,
   "closeDate": "2026-11-16"
  },
  "009540": {
   "price": 239000,
   "date": "2026-11-16",
   "changePct": 0.6,
   "close": 239000,
   "closeDate": "2026-11-16"
  },
  "068270": {
   "price": 214500,
   "date": "2026-11-16",
   "changePct": 0.2,
   "close": 214500,
   "closeDate": "2026-11-16"
  },
  "000270": {
   "price": 95000,
   "date": "2026-11-16",
   "changePct": 0.4,
   "close": 95000,
   "closeDate": "2026-11-16"
  },
  "032640": {
   "price": 15630,
   "date": "2026-11-16",
   "changePct": 0.5,
   "close": 15630,
   "closeDate": "2026-11-16"
  },
  "029780": {
   "price": 41650,
   "date": "2026-11-16",
   "changePct": 2,
   "close": 41650,
   "closeDate": "2026-11-16"
  },
  "035900": {
   "price": 44000,
   "date": "2026-11-16",
   "changePct": 1.1,
   "close": 44000,
   "closeDate": "2026-11-16"
  },
  "036570": {
   "price": 181700,
   "date": "2026-11-16",
   "changePct": 1.5,
   "close": 181700,
   "closeDate": "2026-11-16"
  },
  "035720": {
   "price": 32450,
   "date": "2026-11-16",
   "changePct": 2.4,
   "close": 32450,
   "closeDate": "2026-11-16"
  },
  "001040": {
   "price": 111700,
   "date": "2026-11-16",
   "changePct": 0.8,
   "close": 111700,
   "closeDate": "2026-11-16"
  },
  "012750": {
   "price": 101200,
   "date": "2026-11-16",
   "changePct": 0,
   "close": 101200,
   "closeDate": "2026-11-16"
  },
  "000660": {
   "price": 1120000,
   "date": "2026-11-16",
   "changePct": -7.9,
   "close": 1120000,
   "closeDate": "2026-11-16"
  },
  "086790": {
   "price": 126800,
   "date": "2026-11-16",
   "changePct": 1.8,
   "close": 126800,
   "closeDate": "2026-11-16"
  },
  "001120": {
   "price": 35000,
   "date": "2026-11-16",
   "changePct": -0.1,
   "close": 35000,
   "closeDate": "2026-11-16"
  },
  "005830": {
   "price": 175600,
   "date": "2026-11-16",
   "changePct": 7.3,
   "close": 175600,
   "closeDate": "2026-11-16"
  },
  "066570": {
   "price": 131700,
   "date": "2026-11-16",
   "changePct": -2.9,
   "close": 131700,
   "closeDate": "2026-11-16"
  },
  "086280": {
   "price": 207000,
   "date": "2026-11-16",
   "changePct": 1.2,
   "close": 207000,
   "closeDate": "2026-11-16"
  },
  "018260": {
   "price": 229000,
   "date": "2026-11-16",
   "changePct": -2.3,
   "close": 229000,
   "closeDate": "2026-11-16"
  },
  "005850": {
   "price": 47000,
   "date": "2026-11-16",
   "changePct": -1.1,
   "close": 47000,
   "closeDate": "2026-11-16"
  },
  "005490": {
   "price": 268500,
   "date": "2026-11-16",
   "changePct": -2.4,
   "close": 268500,
   "closeDate": "2026-11-16"
  },
  "035420": {
   "price": 172900,
   "date": "2026-11-16",
   "changePct": 0.2,
   "close": 172900,
   "closeDate": "2026-11-16"
  },
  "010120": {
   "price": 118600,
   "date": "2026-11-16",
   "changePct": -3.8,
   "close": 118600,
   "closeDate": "2026-11-16"
  },
  "030200": {
   "price": 51400,
   "date": "2026-11-16",
   "changePct": 0.8,
   "close": 51400,
   "closeDate": "2026-11-16"
  },
  "012330": {
   "price": 356000,
   "date": "2026-11-16",
   "changePct": 0.1,
   "close": 356000,
   "closeDate": "2026-11-16"
  },
  "047050": {
   "price": 49550,
   "date": "2026-11-16",
   "changePct": -0.6,
   "close": 49550,
   "closeDate": "2026-11-16"
  },
  "030190": {
   "price": 16930,
   "date": "2026-11-16",
   "changePct": -4.6,
   "close": 16930,
   "closeDate": "2026-11-16"
  },
  "042700": {
   "price": 169700,
   "date": "2026-11-16",
   "changePct": -6.6,
   "close": 169700,
   "closeDate": "2026-11-16"
  },
  "064400": {
   "price": 77000,
   "date": "2026-11-16",
   "changePct": -1.9,
   "close": 77000,
   "closeDate": "2026-11-16"
  },
  "095340": {
   "price": 138200,
   "date": "2026-11-16",
   "changePct": -8.4,
   "close": 138200,
   "closeDate": "2026-11-16"
  },
  "MSFT": {
   "price": 524.17,
   "date": "2026-11-16",
   "changePct": 0.1,
   "close": 523.88,
   "closeDate": "2026-11-13"
  },
  "V": {
   "price": 429.84,
   "date": "2026-11-16",
   "changePct": 1,
   "close": 425.76,
   "closeDate": "2026-11-13"
  },
  "MA": {
   "price": 665.575,
   "date": "2026-11-16",
   "changePct": 0.7,
   "close": 661.19,
   "closeDate": "2026-11-13"
  },
  "GOOGL": {
   "price": 288.26,
   "date": "2026-11-16",
   "changePct": -2.5,
   "close": 295.77,
   "closeDate": "2026-11-13"
  },
  "NVDA": {
   "price": 159.17,
   "date": "2026-11-16",
   "changePct": -2.3,
   "close": 162.85,
   "closeDate": "2026-11-13"
  },
  "META": {
   "price": 629.205,
   "date": "2026-11-16",
   "changePct": -1.9,
   "close": 641.69,
   "closeDate": "2026-11-13"
  },
  "AVGO": {
   "price": 334.93,
   "date": "2026-11-16",
   "changePct": -3.5,
   "close": 347.01,
   "closeDate": "2026-11-13"
  },
  "TSM": {
   "price": 378.24,
   "date": "2026-11-16",
   "changePct": -5.1,
   "close": 398.73,
   "closeDate": "2026-11-13"
  },
  "UBER": {
   "price": 70.46,
   "date": "2026-11-16",
   "changePct": 1.1,
   "close": 69.69,
   "closeDate": "2026-11-13"
  },
  "GM": {
   "price": 84.633,
   "date": "2026-11-16",
   "changePct": -1.6,
   "close": 86,
   "closeDate": "2026-11-13"
  },
  "VZ": {
   "price": 46.48,
   "date": "2026-11-16",
   "changePct": 0.3,
   "close": 46.36,
   "closeDate": "2026-11-13"
  },
  "C": {
   "price": 122.46,
   "date": "2026-11-16",
   "changePct": -1.2,
   "close": 124.01,
   "closeDate": "2026-11-13"
  },
  "DUK": {
   "price": 130.655,
   "date": "2026-11-16",
   "changePct": 1.2,
   "close": 129.16,
   "closeDate": "2026-11-13"
  },
  "KO": {
   "price": 99.795,
   "date": "2026-11-16",
   "changePct": 0.5,
   "close": 99.25,
   "closeDate": "2026-11-13"
  },
  "JNJ": {
   "price": 285.65,
   "date": "2026-11-16",
   "changePct": 0,
   "close": 285.75,
   "closeDate": "2026-11-13"
  },
  "LLY": {
   "price": 1458.135,
   "date": "2026-11-16",
   "changePct": 1,
   "close": 1443.5,
   "closeDate": "2026-11-13"
  },
  "CI": {
   "price": 299.495,
   "date": "2026-11-16",
   "changePct": 0.8,
   "close": 297,
   "closeDate": "2026-11-13"
  },
  "TSLA": {
   "price": 380.78,
   "date": "2026-11-16",
   "changePct": -2.4,
   "close": 390.22,
   "closeDate": "2026-11-13"
  },
  "AAPL": {
   "price": 355.039,
   "date": "2026-11-16",
   "changePct": -0.3,
   "close": 356.27,
   "closeDate": "2026-11-13"
  },
  "MU": {
   "price": 734,
   "date": "2026-11-16",
   "changePct": -5.7,
   "close": 778.31,
   "closeDate": "2026-11-13"
  },
  "MDT": {
   "price": 103.395,
   "date": "2026-11-16",
   "changePct": 0.5,
   "close": 102.86,
   "closeDate": "2026-11-13"
  },
  "IREN": {
   "price": 16.4,
   "date": "2026-11-16",
   "changePct": -9.7,
   "close": 18.17,
   "closeDate": "2026-11-13"
  },
  "UNH": {
   "price": 410.6,
   "date": "2026-11-16",
   "changePct": 0.8,
   "close": 407.46,
   "closeDate": "2026-11-13"
  },
  "DVN": {
   "price": 45.405,
   "date": "2026-11-16",
   "changePct": -2.5,
   "close": 46.58,
   "closeDate": "2026-11-13"
  },
  "GS": {
   "price": 897.09,
   "date": "2026-11-16",
   "changePct": -2.1,
   "close": 916.56,
   "closeDate": "2026-11-13"
  },
  "AMP": {
   "price": 517.22,
   "date": "2026-11-16",
   "changePct": -0.4,
   "close": 519.43,
   "closeDate": "2026-11-13"
  },
  "PNC": {
   "price": 231.015,
   "date": "2026-11-16",
   "changePct": -0.5,
   "close": 232.29,
   "closeDate": "2026-11-13"
  },
  "MTB": {
   "price": 220.35,
   "date": "2026-11-16",
   "changePct": -0.3,
   "close": 221.12,
   "closeDate": "2026-11-13"
  },
  "SO": {
   "price": 94.12,
   "date": "2026-11-16",
   "changePct": 0.6,
   "close": 93.59,
   "closeDate": "2026-11-13"
  },
  "WEC": {
   "price": 117.76,
   "date": "2026-11-16",
   "changePct": 0.1,
   "close": 117.6,
   "closeDate": "2026-11-13"
  },
  "TJX": {
   "price": 132.43,
   "date": "2026-11-16",
   "changePct": -1.4,
   "close": 134.37,
   "closeDate": "2026-11-13"
  },
  "ANET": {
   "price": 186.8,
   "date": "2026-11-16",
   "changePct": -5.3,
   "close": 197.29,
   "closeDate": "2026-11-13"
  },
  "GD": {
   "price": 361.32,
   "date": "2026-11-16",
   "changePct": -0.6,
   "close": 363.46,
   "closeDate": "2026-11-13"
  },
  "LMT": {
   "price": 585.5,
   "date": "2026-11-16",
   "changePct": -1.8,
   "close": 596.04,
   "closeDate": "2026-11-13"
  },
  "CB": {
   "price": 380.69,
   "date": "2026-11-16",
   "changePct": 1.3,
   "close": 375.74,
   "closeDate": "2026-11-13"
  },
  "GILD": {
   "price": 170.025,
   "date": "2026-11-16",
   "changePct": 1.2,
   "close": 168.08,
   "closeDate": "2026-11-13"
  },
  "BRK.B": {
   "price": 594.69,
   "date": "2026-11-16",
   "changePct": 0.3,
   "close": 592.94,
   "closeDate": "2026-11-13"
  },
  "TMO": {
   "price": 697.023,
   "date": "2026-11-16",
   "changePct": -0.5,
   "close": 700.22,
   "closeDate": "2026-11-13"
  },
  "ECL": {
   "price": 308.71,
   "date": "2026-11-16",
   "changePct": -0.2,
   "close": 309.27,
   "closeDate": "2026-11-13"
  },
  "RSG": {
   "price": 256.245,
   "date": "2026-11-16",
   "changePct": 1.3,
   "close": 252.99,
   "closeDate": "2026-11-13"
  },
  "CTAS": {
   "price": 225.7,
   "date": "2026-11-16",
   "changePct": -0.2,
   "close": 226.24,
   "closeDate": "2026-11-13"
  },
  "ORLY": {
   "price": 93.115,
   "date": "2026-11-16",
   "changePct": 1,
   "close": 92.19,
   "closeDate": "2026-11-13"
  },
  "ADP": {
   "price": 314.16,
   "date": "2026-11-16",
   "changePct": 1.4,
   "close": 309.93,
   "closeDate": "2026-11-13"
  },
  "FAST": {
   "price": 55.24,
   "date": "2026-11-16",
   "changePct": 0.1,
   "close": 55.19,
   "closeDate": "2026-11-13"
  },
  "VRT": {
   "price": 190.56,
   "date": "2026-11-16",
   "changePct": -5.7,
   "close": 202.07,
   "closeDate": "2026-11-13"
  },
  "WAB": {
   "price": 294.64,
   "date": "2026-11-16",
   "changePct": -1.1,
   "close": 297.96,
   "closeDate": "2026-11-13"
  },
  "NTES": {
   "price": 122.86,
   "date": "2026-11-16",
   "changePct": 0.6,
   "close": 122.18,
   "closeDate": "2026-11-13"
  },
  "ROST": {
   "price": 225.003,
   "date": "2026-11-16",
   "changePct": -2.9,
   "close": 231.68,
   "closeDate": "2026-11-13"
  },
  "CSCO": {
   "price": 94.29,
   "date": "2026-11-16",
   "changePct": -1.4,
   "close": 95.64,
   "closeDate": "2026-11-13"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5100.5,
   "date": "2026-11-16",
   "changePct": -3.6,
   "close": 5100.5,
   "closeDate": "2026-11-16",
   "at": "2026-11-16T16:20:44Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7479.93,
   "date": "2026-11-16",
   "changePct": -1.1,
   "close": 7561.6699,
   "closeDate": "2026-11-13",
   "at": "2026-11-16T16:20:44Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 220.085,
   "date": "2026-11-16",
   "changePct": -0.5,
   "close": 221.16,
   "closeDate": "2026-11-13",
   "at": "2026-11-16T16:20:44Z"
  }
 }
};
