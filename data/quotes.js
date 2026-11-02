// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-02",
 "quotes": {
  "103590": {
   "price": 56900,
   "date": "2026-11-02",
   "changePct": 8,
   "close": 56900,
   "closeDate": "2026-11-02"
  },
  "105560": {
   "price": 153400,
   "date": "2026-11-02",
   "changePct": -1.4,
   "close": 153400,
   "closeDate": "2026-11-02"
  },
  "138040": {
   "price": 129500,
   "date": "2026-11-02",
   "changePct": -2.8,
   "close": 129500,
   "closeDate": "2026-11-02"
  },
  "139130": {
   "price": 15490,
   "date": "2026-11-02",
   "changePct": -1.8,
   "close": 15490,
   "closeDate": "2026-11-02"
  },
  "175330": {
   "price": 25400,
   "date": "2026-11-02",
   "changePct": -1.9,
   "close": 25400,
   "closeDate": "2026-11-02"
  },
  "192400": {
   "price": 27150,
   "date": "2026-11-02",
   "changePct": -1.5,
   "close": 27150,
   "closeDate": "2026-11-02"
  },
  "207940": {
   "price": 1422000,
   "date": "2026-11-02",
   "changePct": -4.4,
   "close": 1422000,
   "closeDate": "2026-11-02"
  },
  "241560": {
   "price": 48950,
   "date": "2026-11-02",
   "changePct": 0.9,
   "close": 48950,
   "closeDate": "2026-11-02"
  },
  "267250": {
   "price": 145700,
   "date": "2026-11-02",
   "changePct": 3.5,
   "close": 145700,
   "closeDate": "2026-11-02"
  },
  "267260": {
   "price": 446500,
   "date": "2026-11-02",
   "changePct": 5.2,
   "close": 446500,
   "closeDate": "2026-11-02"
  },
  "267270": {
   "price": 80600,
   "date": "2026-11-02",
   "changePct": 4.4,
   "close": 80600,
   "closeDate": "2026-11-02"
  },
  "278470": {
   "price": 263500,
   "date": "2026-11-02",
   "changePct": 1,
   "close": 263500,
   "closeDate": "2026-11-02"
  },
  "298040": {
   "price": 2050000,
   "date": "2026-11-02",
   "changePct": 13.3,
   "close": 2050000,
   "closeDate": "2026-11-02"
  },
  "316140": {
   "price": 30400,
   "date": "2026-11-02",
   "changePct": -1.3,
   "close": 30400,
   "closeDate": "2026-11-02"
  },
  "323410": {
   "price": 19770,
   "date": "2026-11-02",
   "changePct": -0.8,
   "close": 19770,
   "closeDate": "2026-11-02"
  },
  "329180": {
   "price": 288000,
   "date": "2026-11-02",
   "changePct": 5.1,
   "close": 288000,
   "closeDate": "2026-11-02"
  },
  "361610": {
   "price": 15000,
   "date": "2026-11-02",
   "changePct": 0.2,
   "close": 15000,
   "closeDate": "2026-11-02"
  },
  "005930": {
   "price": 229000,
   "date": "2026-11-02",
   "changePct": 1.8,
   "close": 229000,
   "closeDate": "2026-11-02"
  },
  "055550": {
   "price": 86800,
   "date": "2026-11-02",
   "changePct": -3.1,
   "close": 86800,
   "closeDate": "2026-11-02"
  },
  "000810": {
   "price": 651000,
   "date": "2026-11-02",
   "changePct": -1.2,
   "close": 651000,
   "closeDate": "2026-11-02"
  },
  "028260": {
   "price": 316500,
   "date": "2026-11-02",
   "changePct": 1.4,
   "close": 316500,
   "closeDate": "2026-11-02"
  },
  "086790": {
   "price": 117700,
   "date": "2026-11-02",
   "changePct": -2.3,
   "close": 117700,
   "closeDate": "2026-11-02"
  },
  "012450": {
   "price": 740000,
   "date": "2026-11-02",
   "changePct": 6.3,
   "close": 740000,
   "closeDate": "2026-11-02"
  },
  "009540": {
   "price": 249000,
   "date": "2026-11-02",
   "changePct": 7.6,
   "close": 249000,
   "closeDate": "2026-11-02"
  },
  "068270": {
   "price": 192000,
   "date": "2026-11-02",
   "changePct": 0.2,
   "close": 192000,
   "closeDate": "2026-11-02"
  },
  "000270": {
   "price": 95700,
   "date": "2026-11-02",
   "changePct": 0.1,
   "close": 95700,
   "closeDate": "2026-11-02"
  },
  "032640": {
   "price": 14540,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 14540,
   "closeDate": "2026-11-02"
  },
  "029780": {
   "price": 41500,
   "date": "2026-11-02",
   "changePct": -2.2,
   "close": 41500,
   "closeDate": "2026-11-02"
  },
  "035900": {
   "price": 37950,
   "date": "2026-11-02",
   "changePct": -3.7,
   "close": 37950,
   "closeDate": "2026-11-02"
  },
  "036570": {
   "price": 198500,
   "date": "2026-11-02",
   "changePct": -1.5,
   "close": 198500,
   "closeDate": "2026-11-02"
  },
  "035720": {
   "price": 29700,
   "date": "2026-11-02",
   "changePct": 0.8,
   "close": 29700,
   "closeDate": "2026-11-02"
  },
  "001040": {
   "price": 114800,
   "date": "2026-11-02",
   "changePct": 3.4,
   "close": 114800,
   "closeDate": "2026-11-02"
  },
  "012750": {
   "price": 96000,
   "date": "2026-11-02",
   "changePct": -1.7,
   "close": 96000,
   "closeDate": "2026-11-02"
  },
  "000660": {
   "price": 1472000,
   "date": "2026-11-02",
   "changePct": 3.8,
   "close": 1472000,
   "closeDate": "2026-11-02"
  },
  "001120": {
   "price": 40700,
   "date": "2026-11-02",
   "changePct": 1,
   "close": 40700,
   "closeDate": "2026-11-02"
  },
  "005830": {
   "price": 175600,
   "date": "2026-11-02",
   "changePct": -4.9,
   "close": 175600,
   "closeDate": "2026-11-02"
  },
  "066570": {
   "price": 153700,
   "date": "2026-11-02",
   "changePct": 2,
   "close": 153700,
   "closeDate": "2026-11-02"
  },
  "086280": {
   "price": 204500,
   "date": "2026-11-02",
   "changePct": 11.3,
   "close": 204500,
   "closeDate": "2026-11-02"
  },
  "018260": {
   "price": 208500,
   "date": "2026-11-02",
   "changePct": 2.7,
   "close": 208500,
   "closeDate": "2026-11-02"
  },
  "005850": {
   "price": 48650,
   "date": "2026-11-02",
   "changePct": 0.5,
   "close": 48650,
   "closeDate": "2026-11-02"
  },
  "005490": {
   "price": 283000,
   "date": "2026-11-02",
   "changePct": 3.5,
   "close": 283000,
   "closeDate": "2026-11-02"
  },
  "035420": {
   "price": 175400,
   "date": "2026-11-02",
   "changePct": 1.8,
   "close": 175400,
   "closeDate": "2026-11-02"
  },
  "010120": {
   "price": 160600,
   "date": "2026-11-02",
   "changePct": 7.4,
   "close": 160600,
   "closeDate": "2026-11-02"
  },
  "030200": {
   "price": 46700,
   "date": "2026-11-02",
   "changePct": 0.9,
   "close": 46700,
   "closeDate": "2026-11-02"
  },
  "012330": {
   "price": 350000,
   "date": "2026-11-02",
   "changePct": 4.8,
   "close": 350000,
   "closeDate": "2026-11-02"
  },
  "047050": {
   "price": 51400,
   "date": "2026-11-02",
   "changePct": 5.7,
   "close": 51400,
   "closeDate": "2026-11-02"
  },
  "021240": {
   "price": 105100,
   "date": "2026-11-02",
   "changePct": 1.1,
   "close": 105100,
   "closeDate": "2026-11-02"
  },
  "033780": {
   "price": 192600,
   "date": "2026-11-02",
   "changePct": -1.8,
   "close": 192600,
   "closeDate": "2026-11-02"
  },
  "030190": {
   "price": 17160,
   "date": "2026-11-02",
   "changePct": -1.3,
   "close": 17160,
   "closeDate": "2026-11-02"
  },
  "MSFT": {
   "price": 523.245,
   "date": "2026-11-02",
   "changePct": 0.3,
   "close": 521.91,
   "closeDate": "2026-10-30"
  },
  "V": {
   "price": 425.385,
   "date": "2026-11-02",
   "changePct": 2.9,
   "close": 413.59,
   "closeDate": "2026-10-30"
  },
  "MA": {
   "price": 658.06,
   "date": "2026-11-02",
   "changePct": 3.1,
   "close": 638.01,
   "closeDate": "2026-10-30"
  },
  "GOOGL": {
   "price": 283.25,
   "date": "2026-11-02",
   "changePct": 1.2,
   "close": 279.84,
   "closeDate": "2026-10-30"
  },
  "COST": {
   "price": 1028.04,
   "date": "2026-11-02",
   "changePct": 1.6,
   "close": 1012.28,
   "closeDate": "2026-10-30"
  },
  "NVDA": {
   "price": 206.9,
   "date": "2026-11-02",
   "changePct": 1.1,
   "close": 204.64,
   "closeDate": "2026-10-30"
  },
  "META": {
   "price": 611.95,
   "date": "2026-11-02",
   "changePct": -0.5,
   "close": 614.99,
   "closeDate": "2026-10-30"
  },
  "AVGO": {
   "price": 330.255,
   "date": "2026-11-02",
   "changePct": 1.3,
   "close": 326.08,
   "closeDate": "2026-10-30"
  },
  "AMZN": {
   "price": 251.585,
   "date": "2026-11-02",
   "changePct": 4.7,
   "close": 240.35,
   "closeDate": "2026-10-30"
  },
  "TSM": {
   "price": 406.38,
   "date": "2026-11-02",
   "changePct": 0.1,
   "close": 406.13,
   "closeDate": "2026-10-30"
  },
  "UBER": {
   "price": 67.24,
   "date": "2026-11-02",
   "changePct": 3,
   "close": 65.25,
   "closeDate": "2026-10-30"
  },
  "GM": {
   "price": 89.31,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 87.4,
   "closeDate": "2026-10-30"
  },
  "VZ": {
   "price": 45.108,
   "date": "2026-11-02",
   "changePct": 0.8,
   "close": 44.73,
   "closeDate": "2026-10-30"
  },
  "C": {
   "price": 123.65,
   "date": "2026-11-02",
   "changePct": 0.8,
   "close": 122.64,
   "closeDate": "2026-10-30"
  },
  "DUK": {
   "price": 127.315,
   "date": "2026-11-02",
   "changePct": -0.1,
   "close": 127.39,
   "closeDate": "2026-10-30"
  },
  "KO": {
   "price": 95.04,
   "date": "2026-11-02",
   "changePct": 1,
   "close": 94.08,
   "closeDate": "2026-10-30"
  },
  "JNJ": {
   "price": 268.08,
   "date": "2026-11-02",
   "changePct": -1.9,
   "close": 273.2,
   "closeDate": "2026-10-30"
  },
  "LLY": {
   "price": 1406.86,
   "date": "2026-11-02",
   "changePct": -0.8,
   "close": 1417.54,
   "closeDate": "2026-10-30"
  },
  "CI": {
   "price": 293.95,
   "date": "2026-11-02",
   "changePct": -1.4,
   "close": 298.23,
   "closeDate": "2026-10-30"
  },
  "NOW": {
   "price": 108.215,
   "date": "2026-11-02",
   "changePct": 2.9,
   "close": 105.12,
   "closeDate": "2026-10-30"
  },
  "TSLA": {
   "price": 410.77,
   "date": "2026-11-02",
   "changePct": 2.7,
   "close": 399.81,
   "closeDate": "2026-10-30"
  },
  "MDLZ": {
   "price": 65.69,
   "date": "2026-11-02",
   "changePct": 1.2,
   "close": 64.94,
   "closeDate": "2026-10-30"
  },
  "AAPL": {
   "price": 341.25,
   "date": "2026-11-02",
   "changePct": -1,
   "close": 344.63,
   "closeDate": "2026-10-30"
  },
  "MU": {
   "price": 864.42,
   "date": "2026-11-02",
   "changePct": -2.3,
   "close": 884.74,
   "closeDate": "2026-10-30"
  },
  "MDT": {
   "price": 97.92,
   "date": "2026-11-02",
   "changePct": 1.4,
   "close": 96.54,
   "closeDate": "2026-10-30"
  },
  "IREN": {
   "price": 23.39,
   "date": "2026-11-02",
   "changePct": -2.3,
   "close": 23.95,
   "closeDate": "2026-10-30"
  },
  "UNH": {
   "price": 396.4,
   "date": "2026-11-02",
   "changePct": -2.6,
   "close": 406.97,
   "closeDate": "2026-10-30"
  },
  "DVN": {
   "price": 49.935,
   "date": "2026-11-02",
   "changePct": -4.2,
   "close": 52.15,
   "closeDate": "2026-10-30"
  },
  "GS": {
   "price": 910.923,
   "date": "2026-11-02",
   "changePct": 1.8,
   "close": 894.55,
   "closeDate": "2026-10-30"
  },
  "AMP": {
   "price": 501.22,
   "date": "2026-11-02",
   "changePct": 2.1,
   "close": 490.83,
   "closeDate": "2026-10-30"
  },
  "PNC": {
   "price": 231.92,
   "date": "2026-11-02",
   "changePct": 1.8,
   "close": 227.86,
   "closeDate": "2026-10-30"
  },
  "MTB": {
   "price": 223.955,
   "date": "2026-11-02",
   "changePct": 1.5,
   "close": 220.72,
   "closeDate": "2026-10-30"
  },
  "SO": {
   "price": 93.72,
   "date": "2026-11-02",
   "changePct": 0,
   "close": 93.71,
   "closeDate": "2026-10-30"
  },
  "WEC": {
   "price": 115.68,
   "date": "2026-11-02",
   "changePct": -0.3,
   "close": 116.07,
   "closeDate": "2026-10-30"
  },
  "TJX": {
   "price": 140.05,
   "date": "2026-11-02",
   "changePct": -0.2,
   "close": 140.31,
   "closeDate": "2026-10-30"
  },
  "ANET": {
   "price": 166.89,
   "date": "2026-11-02",
   "changePct": -1.2,
   "close": 168.86,
   "closeDate": "2026-10-30"
  },
  "GD": {
   "price": 370.1,
   "date": "2026-11-02",
   "changePct": -0.7,
   "close": 372.59,
   "closeDate": "2026-10-30"
  },
  "LMT": {
   "price": 638.515,
   "date": "2026-11-02",
   "changePct": 0.2,
   "close": 636.95,
   "closeDate": "2026-10-30"
  },
  "CB": {
   "price": 366.35,
   "date": "2026-11-02",
   "changePct": 0.6,
   "close": 364.12,
   "closeDate": "2026-10-30"
  },
  "GILD": {
   "price": 168.44,
   "date": "2026-11-02",
   "changePct": -1.3,
   "close": 170.68,
   "closeDate": "2026-10-30"
  },
  "BRK.B": {
   "price": 551.24,
   "date": "2026-11-02",
   "changePct": 1.6,
   "close": 542.49,
   "closeDate": "2026-10-30"
  },
  "TMO": {
   "price": 684.8,
   "date": "2026-11-02",
   "changePct": -1.8,
   "close": 697,
   "closeDate": "2026-10-30"
  },
  "ECL": {
   "price": 308.91,
   "date": "2026-11-02",
   "changePct": 2,
   "close": 302.98,
   "closeDate": "2026-10-30"
  },
  "MSI": {
   "price": 492.24,
   "date": "2026-11-02",
   "changePct": 0.1,
   "close": 491.53,
   "closeDate": "2026-10-30"
  },
  "MSCI": {
   "price": 636.4,
   "date": "2026-11-02",
   "changePct": 2.1,
   "close": 623.38,
   "closeDate": "2026-10-30"
  },
  "RSG": {
   "price": 243.52,
   "date": "2026-11-02",
   "changePct": -0.2,
   "close": 244.04,
   "closeDate": "2026-10-30"
  },
  "CTAS": {
   "price": 223.625,
   "date": "2026-11-02",
   "changePct": 1.7,
   "close": 219.82,
   "closeDate": "2026-10-30"
  },
  "ORLY": {
   "price": 90.35,
   "date": "2026-11-02",
   "changePct": 2.5,
   "close": 88.12,
   "closeDate": "2026-10-30"
  },
  "YUM": {
   "price": 157.114,
   "date": "2026-11-02",
   "changePct": 1.1,
   "close": 155.4,
   "closeDate": "2026-10-30"
  },
  "ADP": {
   "price": 299.7,
   "date": "2026-11-02",
   "changePct": 2,
   "close": 293.84,
   "closeDate": "2026-10-30"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5859.08,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 5859.08,
   "closeDate": "2026-11-02"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7624.19,
   "date": "2026-11-02",
   "changePct": 0.6,
   "close": 7580.0698,
   "closeDate": "2026-10-30"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 220.71,
   "date": "2026-11-02",
   "changePct": 1.1,
   "close": 218.31,
   "closeDate": "2026-10-30"
  }
 }
};
