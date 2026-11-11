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
   "price": 533.33,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 533.16,
   "closeDate": "2026-11-10"
  },
  "V": {
   "price": 419.575,
   "date": "2026-11-11",
   "changePct": -0.8,
   "close": 423,
   "closeDate": "2026-11-10"
  },
  "MA": {
   "price": 655.65,
   "date": "2026-11-11",
   "changePct": -0.5,
   "close": 658.84,
   "closeDate": "2026-11-10"
  },
  "GOOGL": {
   "price": 290.68,
   "date": "2026-11-11",
   "changePct": 1.1,
   "close": 287.38,
   "closeDate": "2026-11-10"
  },
  "COST": {
   "price": 1089.42,
   "date": "2026-11-11",
   "changePct": 2.2,
   "close": 1066.14,
   "closeDate": "2026-11-10"
  },
  "NVDA": {
   "price": 174.11,
   "date": "2026-11-11",
   "changePct": 3.1,
   "close": 168.89,
   "closeDate": "2026-11-10"
  },
  "META": {
   "price": 643.35,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 641.39,
   "closeDate": "2026-11-10"
  },
  "AVGO": {
   "price": 351.402,
   "date": "2026-11-11",
   "changePct": 5.9,
   "close": 331.98,
   "closeDate": "2026-11-10"
  },
  "TSM": {
   "price": 412.86,
   "date": "2026-11-11",
   "changePct": 4.1,
   "close": 396.48,
   "closeDate": "2026-11-10"
  },
  "UBER": {
   "price": 69.68,
   "date": "2026-11-11",
   "changePct": -0.5,
   "close": 70.05,
   "closeDate": "2026-11-10"
  },
  "GM": {
   "price": 88.19,
   "date": "2026-11-11",
   "changePct": -0.6,
   "close": 88.69,
   "closeDate": "2026-11-10"
  },
  "VZ": {
   "price": 46.16,
   "date": "2026-11-11",
   "changePct": -0.3,
   "close": 46.31,
   "closeDate": "2026-11-10"
  },
  "C": {
   "price": 122.9,
   "date": "2026-11-11",
   "changePct": 0.5,
   "close": 122.27,
   "closeDate": "2026-11-10"
  },
  "DUK": {
   "price": 128.37,
   "date": "2026-11-11",
   "changePct": -0.4,
   "close": 128.94,
   "closeDate": "2026-11-10"
  },
  "KO": {
   "price": 96.345,
   "date": "2026-11-11",
   "changePct": -0.6,
   "close": 96.91,
   "closeDate": "2026-11-10"
  },
  "JNJ": {
   "price": 277.79,
   "date": "2026-11-11",
   "changePct": -1.1,
   "close": 280.78,
   "closeDate": "2026-11-10"
  },
  "LLY": {
   "price": 1421.05,
   "date": "2026-11-11",
   "changePct": -0.8,
   "close": 1432.29,
   "closeDate": "2026-11-10"
  },
  "CI": {
   "price": 298.38,
   "date": "2026-11-11",
   "changePct": -1.6,
   "close": 303.13,
   "closeDate": "2026-11-10"
  },
  "TSLA": {
   "price": 389.189,
   "date": "2026-11-11",
   "changePct": 2.5,
   "close": 379.78,
   "closeDate": "2026-11-10"
  },
  "AAPL": {
   "price": 352.348,
   "date": "2026-11-11",
   "changePct": 1.1,
   "close": 348.51,
   "closeDate": "2026-11-10"
  },
  "MU": {
   "price": 775.485,
   "date": "2026-11-11",
   "changePct": 6.9,
   "close": 725.11,
   "closeDate": "2026-11-10"
  },
  "MDT": {
   "price": 100.87,
   "date": "2026-11-11",
   "changePct": -0.7,
   "close": 101.59,
   "closeDate": "2026-11-10"
  },
  "IREN": {
   "price": 21.295,
   "date": "2026-11-11",
   "changePct": 7.9,
   "close": 19.73,
   "closeDate": "2026-11-10"
  },
  "UNH": {
   "price": 399.845,
   "date": "2026-11-11",
   "changePct": -1.3,
   "close": 405.12,
   "closeDate": "2026-11-10"
  },
  "DVN": {
   "price": 43.64,
   "date": "2026-11-11",
   "changePct": 0.5,
   "close": 43.41,
   "closeDate": "2026-11-10"
  },
  "GS": {
   "price": 917.96,
   "date": "2026-11-11",
   "changePct": 0.9,
   "close": 910.19,
   "closeDate": "2026-11-10"
  },
  "AMP": {
   "price": 516.045,
   "date": "2026-11-11",
   "changePct": -0.8,
   "close": 519.96,
   "closeDate": "2026-11-10"
  },
  "PNC": {
   "price": 231.03,
   "date": "2026-11-11",
   "changePct": -0.1,
   "close": 231.3,
   "closeDate": "2026-11-10"
  },
  "MTB": {
   "price": 219.255,
   "date": "2026-11-11",
   "changePct": -0.6,
   "close": 220.61,
   "closeDate": "2026-11-10"
  },
  "SO": {
   "price": 93.5,
   "date": "2026-11-11",
   "changePct": -0.2,
   "close": 93.65,
   "closeDate": "2026-11-10"
  },
  "WEC": {
   "price": 116.53,
   "date": "2026-11-11",
   "changePct": -0.4,
   "close": 117.01,
   "closeDate": "2026-11-10"
  },
  "TJX": {
   "price": 136.18,
   "date": "2026-11-11",
   "changePct": -0.5,
   "close": 136.92,
   "closeDate": "2026-11-10"
  },
  "ANET": {
   "price": 195.945,
   "date": "2026-11-11",
   "changePct": 5.9,
   "close": 185.02,
   "closeDate": "2026-11-10"
  },
  "GD": {
   "price": 365,
   "date": "2026-11-11",
   "changePct": -0.7,
   "close": 367.44,
   "closeDate": "2026-11-10"
  },
  "LMT": {
   "price": 600.875,
   "date": "2026-11-11",
   "changePct": -0.4,
   "close": 603.12,
   "closeDate": "2026-11-10"
  },
  "CB": {
   "price": 366.19,
   "date": "2026-11-11",
   "changePct": -0.8,
   "close": 369.11,
   "closeDate": "2026-11-10"
  },
  "GILD": {
   "price": 169.525,
   "date": "2026-11-11",
   "changePct": -0.8,
   "close": 170.87,
   "closeDate": "2026-11-10"
  },
  "BRK.B": {
   "price": 579.841,
   "date": "2026-11-11",
   "changePct": -0.6,
   "close": 583.34,
   "closeDate": "2026-11-10"
  },
  "TMO": {
   "price": 718.87,
   "date": "2026-11-11",
   "changePct": 0.1,
   "close": 718.2,
   "closeDate": "2026-11-10"
  },
  "ECL": {
   "price": 304.62,
   "date": "2026-11-11",
   "changePct": -0.5,
   "close": 306.03,
   "closeDate": "2026-11-10"
  },
  "RSG": {
   "price": 247.77,
   "date": "2026-11-11",
   "changePct": 0.1,
   "close": 247.62,
   "closeDate": "2026-11-10"
  },
  "CTAS": {
   "price": 225.22,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 225.28,
   "closeDate": "2026-11-10"
  },
  "ORLY": {
   "price": 89.145,
   "date": "2026-11-11",
   "changePct": -0.3,
   "close": 89.39,
   "closeDate": "2026-11-10"
  },
  "ADP": {
   "price": 304.85,
   "date": "2026-11-11",
   "changePct": -0.2,
   "close": 305.44,
   "closeDate": "2026-11-10"
  },
  "FAST": {
   "price": 54.84,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 54.84,
   "closeDate": "2026-11-10"
  },
  "VRT": {
   "price": 206.81,
   "date": "2026-11-11",
   "changePct": 6.5,
   "close": 194.22,
   "closeDate": "2026-11-10"
  },
  "WAB": {
   "price": 303.59,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 303.49,
   "closeDate": "2026-11-10"
  },
  "NTES": {
   "price": 123.405,
   "date": "2026-11-11",
   "changePct": -3.6,
   "close": 128.03,
   "closeDate": "2026-11-10"
  },
  "ROST": {
   "price": 238.705,
   "date": "2026-11-11",
   "changePct": -0.1,
   "close": 238.95,
   "closeDate": "2026-11-10"
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
   "price": 7588.72,
   "date": "2026-11-11",
   "changePct": 0.9,
   "close": 7520.9302,
   "closeDate": "2026-11-10"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 221.24,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 220.88,
   "closeDate": "2026-11-10"
  }
 }
};
