// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-12",
 "quotes": {
  "103590": {
   "price": 54300,
   "date": "2026-11-12",
   "changePct": 3,
   "close": 54300,
   "closeDate": "2026-11-12"
  },
  "105560": {
   "price": 151800,
   "date": "2026-11-12",
   "changePct": -1,
   "close": 151800,
   "closeDate": "2026-11-12"
  },
  "138040": {
   "price": 112600,
   "date": "2026-11-12",
   "changePct": -13.1,
   "close": 112600,
   "closeDate": "2026-11-12"
  },
  "139130": {
   "price": 15420,
   "date": "2026-11-12",
   "changePct": -1.2,
   "close": 15420,
   "closeDate": "2026-11-12"
  },
  "175330": {
   "price": 26400,
   "date": "2026-11-12",
   "changePct": -0.8,
   "close": 26400,
   "closeDate": "2026-11-12"
  },
  "192400": {
   "price": 27450,
   "date": "2026-11-12",
   "changePct": -0.4,
   "close": 27450,
   "closeDate": "2026-11-12"
  },
  "207940": {
   "price": 1449000,
   "date": "2026-11-12",
   "changePct": 1.3,
   "close": 1449000,
   "closeDate": "2026-11-12"
  },
  "241560": {
   "price": 52000,
   "date": "2026-11-12",
   "changePct": -1.5,
   "close": 52000,
   "closeDate": "2026-11-12"
  },
  "267250": {
   "price": 123500,
   "date": "2026-11-12",
   "changePct": -0.4,
   "close": 123500,
   "closeDate": "2026-11-12"
  },
  "267260": {
   "price": 421000,
   "date": "2026-11-12",
   "changePct": 4,
   "close": 421000,
   "closeDate": "2026-11-12"
  },
  "267270": {
   "price": 91500,
   "date": "2026-11-12",
   "changePct": -1,
   "close": 91500,
   "closeDate": "2026-11-12"
  },
  "278470": {
   "price": 241500,
   "date": "2026-11-12",
   "changePct": -4,
   "close": 241500,
   "closeDate": "2026-11-12"
  },
  "298040": {
   "price": 1837000,
   "date": "2026-11-12",
   "changePct": 2.5,
   "close": 1837000,
   "closeDate": "2026-11-12"
  },
  "316140": {
   "price": 31550,
   "date": "2026-11-12",
   "changePct": 0.2,
   "close": 31550,
   "closeDate": "2026-11-12"
  },
  "323410": {
   "price": 20250,
   "date": "2026-11-12",
   "changePct": -0.2,
   "close": 20250,
   "closeDate": "2026-11-12"
  },
  "361610": {
   "price": 12840,
   "date": "2026-11-12",
   "changePct": 0.2,
   "close": 12840,
   "closeDate": "2026-11-12"
  },
  "005930": {
   "price": 208000,
   "date": "2026-11-12",
   "changePct": 1,
   "close": 208000,
   "closeDate": "2026-11-12"
  },
  "055550": {
   "price": 85000,
   "date": "2026-11-12",
   "changePct": -0.8,
   "close": 85000,
   "closeDate": "2026-11-12"
  },
  "000810": {
   "price": 525000,
   "date": "2026-11-12",
   "changePct": -7.2,
   "close": 525000,
   "closeDate": "2026-11-12"
  },
  "012450": {
   "price": 654000,
   "date": "2026-11-12",
   "changePct": -0.8,
   "close": 654000,
   "closeDate": "2026-11-12"
  },
  "009540": {
   "price": 238000,
   "date": "2026-11-12",
   "changePct": -0.8,
   "close": 238000,
   "closeDate": "2026-11-12"
  },
  "068270": {
   "price": 209500,
   "date": "2026-11-12",
   "changePct": 1.2,
   "close": 209500,
   "closeDate": "2026-11-12"
  },
  "000270": {
   "price": 93600,
   "date": "2026-11-12",
   "changePct": -1.1,
   "close": 93600,
   "closeDate": "2026-11-12"
  },
  "032640": {
   "price": 15070,
   "date": "2026-11-12",
   "changePct": -2.4,
   "close": 15070,
   "closeDate": "2026-11-12"
  },
  "029780": {
   "price": 40500,
   "date": "2026-11-12",
   "changePct": -1,
   "close": 40500,
   "closeDate": "2026-11-12"
  },
  "035900": {
   "price": 45100,
   "date": "2026-11-12",
   "changePct": 16.5,
   "close": 45100,
   "closeDate": "2026-11-12"
  },
  "036570": {
   "price": 189800,
   "date": "2026-11-12",
   "changePct": -9.2,
   "close": 189800,
   "closeDate": "2026-11-12"
  },
  "035720": {
   "price": 31700,
   "date": "2026-11-12",
   "changePct": -0.9,
   "close": 31700,
   "closeDate": "2026-11-12"
  },
  "001040": {
   "price": 111900,
   "date": "2026-11-12",
   "changePct": -1.4,
   "close": 111900,
   "closeDate": "2026-11-12"
  },
  "012750": {
   "price": 99300,
   "date": "2026-11-12",
   "changePct": 0.8,
   "close": 99300,
   "closeDate": "2026-11-12"
  },
  "000660": {
   "price": 1254000,
   "date": "2026-11-12",
   "changePct": -1.8,
   "close": 1254000,
   "closeDate": "2026-11-12"
  },
  "086790": {
   "price": 120500,
   "date": "2026-11-12",
   "changePct": 0.3,
   "close": 120500,
   "closeDate": "2026-11-12"
  },
  "001120": {
   "price": 34600,
   "date": "2026-11-12",
   "changePct": -1,
   "close": 34600,
   "closeDate": "2026-11-12"
  },
  "005830": {
   "price": 162500,
   "date": "2026-11-12",
   "changePct": -4.1,
   "close": 162500,
   "closeDate": "2026-11-12"
  },
  "066570": {
   "price": 137200,
   "date": "2026-11-12",
   "changePct": -2.8,
   "close": 137200,
   "closeDate": "2026-11-12"
  },
  "086280": {
   "price": 205500,
   "date": "2026-11-12",
   "changePct": 2.5,
   "close": 205500,
   "closeDate": "2026-11-12"
  },
  "018260": {
   "price": 230500,
   "date": "2026-11-12",
   "changePct": 0,
   "close": 230500,
   "closeDate": "2026-11-12"
  },
  "005850": {
   "price": 46200,
   "date": "2026-11-12",
   "changePct": -2.7,
   "close": 46200,
   "closeDate": "2026-11-12"
  },
  "005490": {
   "price": 275000,
   "date": "2026-11-12",
   "changePct": -0.5,
   "close": 275000,
   "closeDate": "2026-11-12"
  },
  "035420": {
   "price": 181800,
   "date": "2026-11-12",
   "changePct": -6.4,
   "close": 181800,
   "closeDate": "2026-11-12"
  },
  "010120": {
   "price": 124500,
   "date": "2026-11-12",
   "changePct": 2.1,
   "close": 124500,
   "closeDate": "2026-11-12"
  },
  "030200": {
   "price": 51300,
   "date": "2026-11-12",
   "changePct": 1.4,
   "close": 51300,
   "closeDate": "2026-11-12"
  },
  "012330": {
   "price": 352000,
   "date": "2026-11-12",
   "changePct": -0.7,
   "close": 352000,
   "closeDate": "2026-11-12"
  },
  "047050": {
   "price": 49000,
   "date": "2026-11-12",
   "changePct": -3,
   "close": 49000,
   "closeDate": "2026-11-12"
  },
  "030190": {
   "price": 18250,
   "date": "2026-11-12",
   "changePct": 0.8,
   "close": 18250,
   "closeDate": "2026-11-12"
  },
  "042700": {
   "price": 181900,
   "date": "2026-11-12",
   "changePct": -1.1,
   "close": 181900,
   "closeDate": "2026-11-12"
  },
  "064400": {
   "price": 75400,
   "date": "2026-11-12",
   "changePct": -4.8,
   "close": 75400,
   "closeDate": "2026-11-12"
  },
  "095340": {
   "price": 143400,
   "date": "2026-11-12",
   "changePct": -1.7,
   "close": 143400,
   "closeDate": "2026-11-12"
  },
  "MSFT": {
   "price": 525.285,
   "date": "2026-11-12",
   "changePct": 0.8,
   "close": 521.13,
   "closeDate": "2026-11-11"
  },
  "V": {
   "price": 426.225,
   "date": "2026-11-12",
   "changePct": 0.2,
   "close": 425.55,
   "closeDate": "2026-11-11"
  },
  "MA": {
   "price": 661.445,
   "date": "2026-11-12",
   "changePct": 0.1,
   "close": 660.73,
   "closeDate": "2026-11-11"
  },
  "GOOGL": {
   "price": 295.212,
   "date": "2026-11-12",
   "changePct": 0.6,
   "close": 293.45,
   "closeDate": "2026-11-11"
  },
  "COST": {
   "price": 1099.3,
   "date": "2026-11-12",
   "changePct": 1.1,
   "close": 1087.61,
   "closeDate": "2026-11-11"
  },
  "NVDA": {
   "price": 163.59,
   "date": "2026-11-12",
   "changePct": -5.8,
   "close": 173.73,
   "closeDate": "2026-11-11"
  },
  "META": {
   "price": 620.765,
   "date": "2026-11-12",
   "changePct": -1.3,
   "close": 628.77,
   "closeDate": "2026-11-11"
  },
  "AVGO": {
   "price": 360.65,
   "date": "2026-11-12",
   "changePct": 4.5,
   "close": 345.22,
   "closeDate": "2026-11-11"
  },
  "TSM": {
   "price": 404.64,
   "date": "2026-11-12",
   "changePct": -2.1,
   "close": 413.35,
   "closeDate": "2026-11-11"
  },
  "UBER": {
   "price": 69.465,
   "date": "2026-11-12",
   "changePct": -1.7,
   "close": 70.68,
   "closeDate": "2026-11-11"
  },
  "GM": {
   "price": 87.78,
   "date": "2026-11-12",
   "changePct": -1.3,
   "close": 88.9,
   "closeDate": "2026-11-11"
  },
  "VZ": {
   "price": 46.815,
   "date": "2026-11-12",
   "changePct": 0.5,
   "close": 46.6,
   "closeDate": "2026-11-11"
  },
  "C": {
   "price": 123.98,
   "date": "2026-11-12",
   "changePct": -0.2,
   "close": 124.21,
   "closeDate": "2026-11-11"
  },
  "DUK": {
   "price": 129.75,
   "date": "2026-11-12",
   "changePct": 0.8,
   "close": 128.77,
   "closeDate": "2026-11-11"
  },
  "KO": {
   "price": 98.17,
   "date": "2026-11-12",
   "changePct": 0.6,
   "close": 97.57,
   "closeDate": "2026-11-11"
  },
  "JNJ": {
   "price": 283.385,
   "date": "2026-11-12",
   "changePct": 1.1,
   "close": 280.41,
   "closeDate": "2026-11-11"
  },
  "LLY": {
   "price": 1446.1,
   "date": "2026-11-12",
   "changePct": 0.6,
   "close": 1437.29,
   "closeDate": "2026-11-11"
  },
  "CI": {
   "price": 297.695,
   "date": "2026-11-12",
   "changePct": -1.2,
   "close": 301.45,
   "closeDate": "2026-11-11"
  },
  "TSLA": {
   "price": 390.187,
   "date": "2026-11-12",
   "changePct": -0.2,
   "close": 390.84,
   "closeDate": "2026-11-11"
  },
  "AAPL": {
   "price": 357.27,
   "date": "2026-11-12",
   "changePct": 0.5,
   "close": 355.63,
   "closeDate": "2026-11-11"
  },
  "MU": {
   "price": 771.91,
   "date": "2026-11-12",
   "changePct": -4.9,
   "close": 811.3,
   "closeDate": "2026-11-11"
  },
  "MDT": {
   "price": 101.93,
   "date": "2026-11-12",
   "changePct": 0.3,
   "close": 101.61,
   "closeDate": "2026-11-11"
  },
  "IREN": {
   "price": 18.675,
   "date": "2026-11-12",
   "changePct": -10.4,
   "close": 20.84,
   "closeDate": "2026-11-11"
  },
  "UNH": {
   "price": 402.81,
   "date": "2026-11-12",
   "changePct": 0,
   "close": 402.94,
   "closeDate": "2026-11-11"
  },
  "DVN": {
   "price": 45.43,
   "date": "2026-11-12",
   "changePct": 1.1,
   "close": 44.95,
   "closeDate": "2026-11-11"
  },
  "GS": {
   "price": 918.26,
   "date": "2026-11-12",
   "changePct": -0.9,
   "close": 926.81,
   "closeDate": "2026-11-11"
  },
  "AMP": {
   "price": 516.2,
   "date": "2026-11-12",
   "changePct": -0.7,
   "close": 520.06,
   "closeDate": "2026-11-11"
  },
  "PNC": {
   "price": 230.69,
   "date": "2026-11-12",
   "changePct": -0.6,
   "close": 232,
   "closeDate": "2026-11-11"
  },
  "MTB": {
   "price": 218.66,
   "date": "2026-11-12",
   "changePct": -0.7,
   "close": 220.19,
   "closeDate": "2026-11-11"
  },
  "SO": {
   "price": 93.615,
   "date": "2026-11-12",
   "changePct": -0.2,
   "close": 93.84,
   "closeDate": "2026-11-11"
  },
  "WEC": {
   "price": 118.04,
   "date": "2026-11-12",
   "changePct": 0.5,
   "close": 117.47,
   "closeDate": "2026-11-11"
  },
  "TJX": {
   "price": 137.11,
   "date": "2026-11-12",
   "changePct": 0.5,
   "close": 136.44,
   "closeDate": "2026-11-11"
  },
  "ANET": {
   "price": 198.91,
   "date": "2026-11-12",
   "changePct": 1.1,
   "close": 196.68,
   "closeDate": "2026-11-11"
  },
  "GD": {
   "price": 363.82,
   "date": "2026-11-12",
   "changePct": -0.9,
   "close": 367.22,
   "closeDate": "2026-11-11"
  },
  "LMT": {
   "price": 605.145,
   "date": "2026-11-12",
   "changePct": -0.8,
   "close": 610.05,
   "closeDate": "2026-11-11"
  },
  "CB": {
   "price": 373.155,
   "date": "2026-11-12",
   "changePct": 0.8,
   "close": 370.33,
   "closeDate": "2026-11-11"
  },
  "GILD": {
   "price": 170.602,
   "date": "2026-11-12",
   "changePct": 0.5,
   "close": 169.73,
   "closeDate": "2026-11-11"
  },
  "BRK.B": {
   "price": 593.83,
   "date": "2026-11-12",
   "changePct": 1,
   "close": 588.24,
   "closeDate": "2026-11-11"
  },
  "TMO": {
   "price": 698.96,
   "date": "2026-11-12",
   "changePct": -2.6,
   "close": 717.71,
   "closeDate": "2026-11-11"
  },
  "ECL": {
   "price": 308.02,
   "date": "2026-11-12",
   "changePct": 0.1,
   "close": 307.86,
   "closeDate": "2026-11-11"
  },
  "RSG": {
   "price": 251.875,
   "date": "2026-11-12",
   "changePct": 1,
   "close": 249.34,
   "closeDate": "2026-11-11"
  },
  "CTAS": {
   "price": 229.955,
   "date": "2026-11-12",
   "changePct": 1.2,
   "close": 227.26,
   "closeDate": "2026-11-11"
  },
  "ORLY": {
   "price": 91.875,
   "date": "2026-11-12",
   "changePct": 1.5,
   "close": 90.54,
   "closeDate": "2026-11-11"
  },
  "ADP": {
   "price": 310.135,
   "date": "2026-11-12",
   "changePct": 1.2,
   "close": 306.36,
   "closeDate": "2026-11-11"
  },
  "FAST": {
   "price": 55.89,
   "date": "2026-11-12",
   "changePct": 0.7,
   "close": 55.49,
   "closeDate": "2026-11-11"
  },
  "VRT": {
   "price": 207.65,
   "date": "2026-11-12",
   "changePct": 0.6,
   "close": 206.51,
   "closeDate": "2026-11-11"
  },
  "WAB": {
   "price": 305.15,
   "date": "2026-11-12",
   "changePct": 0.3,
   "close": 304.18,
   "closeDate": "2026-11-11"
  },
  "NTES": {
   "price": 122.72,
   "date": "2026-11-12",
   "changePct": 0.5,
   "close": 122.13,
   "closeDate": "2026-11-11"
  },
  "ROST": {
   "price": 238.955,
   "date": "2026-11-12",
   "changePct": -1,
   "close": 241.27,
   "closeDate": "2026-11-11"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5342.73,
   "date": "2026-11-12",
   "changePct": -0.6,
   "close": 5342.73,
   "closeDate": "2026-11-12"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7591.09,
   "date": "2026-11-12",
   "changePct": -0.4,
   "close": 7619.3799,
   "closeDate": "2026-11-11"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 221.879,
   "date": "2026-11-12",
   "changePct": -0.3,
   "close": 222.65,
   "closeDate": "2026-11-11"
  }
 }
};
