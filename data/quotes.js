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
  },
  "RMD": {
   "price": 236.88,
   "date": "2026-11-19",
   "changePct": -2.4,
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
   "at": "2026-11-20T09:18:43Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7175.83,
   "date": "2026-11-19",
   "changePct": -2,
   "close": 7175.83,
   "closeDate": "2026-11-19",
   "at": "2026-11-20T09:18:44Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 211.63,
   "date": "2026-11-19",
   "changePct": -1.8,
   "close": 211.63,
   "closeDate": "2026-11-19",
   "at": "2026-11-20T09:18:44Z"
  }
 }
};
