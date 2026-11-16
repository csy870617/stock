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
   "price": 517.99,
   "date": "2026-11-16",
   "changePct": -1.1,
   "close": 517.99,
   "closeDate": "2026-11-16"
  },
  "V": {
   "price": 426.46,
   "date": "2026-11-16",
   "changePct": 0.2,
   "close": 426.46,
   "closeDate": "2026-11-16"
  },
  "MA": {
   "price": 661.71,
   "date": "2026-11-16",
   "changePct": 0.1,
   "close": 661.71,
   "closeDate": "2026-11-16"
  },
  "GOOGL": {
   "price": 283.72,
   "date": "2026-11-16",
   "changePct": -4.1,
   "close": 283.72,
   "closeDate": "2026-11-16"
  },
  "NVDA": {
   "price": 156.14,
   "date": "2026-11-16",
   "changePct": -4.1,
   "close": 156.14,
   "closeDate": "2026-11-16"
  },
  "META": {
   "price": 626.41,
   "date": "2026-11-16",
   "changePct": -2.4,
   "close": 626.41,
   "closeDate": "2026-11-16"
  },
  "AVGO": {
   "price": 333.4,
   "date": "2026-11-16",
   "changePct": -3.9,
   "close": 333.4,
   "closeDate": "2026-11-16"
  },
  "TSM": {
   "price": 373.45,
   "date": "2026-11-16",
   "changePct": -6.3,
   "close": 373.45,
   "closeDate": "2026-11-16"
  },
  "UBER": {
   "price": 69.99,
   "date": "2026-11-16",
   "changePct": 0.4,
   "close": 69.99,
   "closeDate": "2026-11-16"
  },
  "GM": {
   "price": 83.67,
   "date": "2026-11-16",
   "changePct": -2.7,
   "close": 83.67,
   "closeDate": "2026-11-16"
  },
  "VZ": {
   "price": 46.34,
   "date": "2026-11-16",
   "changePct": 0,
   "close": 46.34,
   "closeDate": "2026-11-16"
  },
  "C": {
   "price": 121.32,
   "date": "2026-11-16",
   "changePct": -2.2,
   "close": 121.32,
   "closeDate": "2026-11-16"
  },
  "DUK": {
   "price": 130.59,
   "date": "2026-11-16",
   "changePct": 1.1,
   "close": 130.59,
   "closeDate": "2026-11-16"
  },
  "KO": {
   "price": 99.48,
   "date": "2026-11-16",
   "changePct": 0.2,
   "close": 99.48,
   "closeDate": "2026-11-16"
  },
  "JNJ": {
   "price": 282.55,
   "date": "2026-11-16",
   "changePct": -1.1,
   "close": 282.55,
   "closeDate": "2026-11-16"
  },
  "LLY": {
   "price": 1431.67,
   "date": "2026-11-16",
   "changePct": -0.8,
   "close": 1431.67,
   "closeDate": "2026-11-16"
  },
  "CI": {
   "price": 300.16,
   "date": "2026-11-16",
   "changePct": 1.1,
   "close": 300.16,
   "closeDate": "2026-11-16"
  },
  "TSLA": {
   "price": 379.74,
   "date": "2026-11-16",
   "changePct": -2.7,
   "close": 379.74,
   "closeDate": "2026-11-16"
  },
  "AAPL": {
   "price": 352.78,
   "date": "2026-11-16",
   "changePct": -1,
   "close": 352.78,
   "closeDate": "2026-11-16"
  },
  "MU": {
   "price": 719.02,
   "date": "2026-11-16",
   "changePct": -7.6,
   "close": 719.02,
   "closeDate": "2026-11-16"
  },
  "MDT": {
   "price": 102.88,
   "date": "2026-11-16",
   "changePct": 0,
   "close": 102.88,
   "closeDate": "2026-11-16"
  },
  "IREN": {
   "price": 16.39,
   "date": "2026-11-16",
   "changePct": -9.8,
   "close": 16.39,
   "closeDate": "2026-11-16"
  },
  "UNH": {
   "price": 412.02,
   "date": "2026-11-16",
   "changePct": 1.1,
   "close": 412.02,
   "closeDate": "2026-11-16"
  },
  "DVN": {
   "price": 44.27,
   "date": "2026-11-16",
   "changePct": -5,
   "close": 44.27,
   "closeDate": "2026-11-16"
  },
  "GS": {
   "price": 891.54,
   "date": "2026-11-16",
   "changePct": -2.7,
   "close": 891.54,
   "closeDate": "2026-11-16"
  },
  "AMP": {
   "price": 514.06,
   "date": "2026-11-16",
   "changePct": -1,
   "close": 514.06,
   "closeDate": "2026-11-16"
  },
  "PNC": {
   "price": 229.61,
   "date": "2026-11-16",
   "changePct": -1.2,
   "close": 229.61,
   "closeDate": "2026-11-16"
  },
  "MTB": {
   "price": 219.78,
   "date": "2026-11-16",
   "changePct": -0.6,
   "close": 219.78,
   "closeDate": "2026-11-16"
  },
  "SO": {
   "price": 94.64,
   "date": "2026-11-16",
   "changePct": 1.1,
   "close": 94.64,
   "closeDate": "2026-11-16"
  },
  "WEC": {
   "price": 117.46,
   "date": "2026-11-16",
   "changePct": -0.1,
   "close": 117.46,
   "closeDate": "2026-11-16"
  },
  "TJX": {
   "price": 131.09,
   "date": "2026-11-16",
   "changePct": -2.4,
   "close": 131.09,
   "closeDate": "2026-11-16"
  },
  "ANET": {
   "price": 187.02,
   "date": "2026-11-16",
   "changePct": -5.2,
   "close": 187.02,
   "closeDate": "2026-11-16"
  },
  "GD": {
   "price": 359.69,
   "date": "2026-11-16",
   "changePct": -1,
   "close": 359.69,
   "closeDate": "2026-11-16"
  },
  "LMT": {
   "price": 585.21,
   "date": "2026-11-16",
   "changePct": -1.8,
   "close": 585.21,
   "closeDate": "2026-11-16"
  },
  "CB": {
   "price": 381.28,
   "date": "2026-11-16",
   "changePct": 1.5,
   "close": 381.28,
   "closeDate": "2026-11-16"
  },
  "GILD": {
   "price": 167.58,
   "date": "2026-11-16",
   "changePct": -0.3,
   "close": 167.58,
   "closeDate": "2026-11-16"
  },
  "BRK.B": {
   "price": 592.85,
   "date": "2026-11-16",
   "changePct": 0,
   "close": 592.85,
   "closeDate": "2026-11-16"
  },
  "TMO": {
   "price": 691.33,
   "date": "2026-11-16",
   "changePct": -1.3,
   "close": 691.33,
   "closeDate": "2026-11-16"
  },
  "ECL": {
   "price": 308.41,
   "date": "2026-11-16",
   "changePct": -0.3,
   "close": 308.41,
   "closeDate": "2026-11-16"
  },
  "RSG": {
   "price": 255.56,
   "date": "2026-11-16",
   "changePct": 1,
   "close": 255.56,
   "closeDate": "2026-11-16"
  },
  "CTAS": {
   "price": 224.16,
   "date": "2026-11-16",
   "changePct": -0.9,
   "close": 224.16,
   "closeDate": "2026-11-16"
  },
  "ORLY": {
   "price": 92.7,
   "date": "2026-11-16",
   "changePct": 0.6,
   "close": 92.7,
   "closeDate": "2026-11-16"
  },
  "ADP": {
   "price": 313.43,
   "date": "2026-11-16",
   "changePct": 1.1,
   "close": 313.43,
   "closeDate": "2026-11-16"
  },
  "FAST": {
   "price": 55.11,
   "date": "2026-11-16",
   "changePct": -0.1,
   "close": 55.11,
   "closeDate": "2026-11-16"
  },
  "VRT": {
   "price": 188.67,
   "date": "2026-11-16",
   "changePct": -6.6,
   "close": 188.67,
   "closeDate": "2026-11-16"
  },
  "WAB": {
   "price": 291.74,
   "date": "2026-11-16",
   "changePct": -2.1,
   "close": 291.74,
   "closeDate": "2026-11-16"
  },
  "NTES": {
   "price": 121.565,
   "date": "2026-11-16",
   "changePct": -0.5,
   "close": 121.565,
   "closeDate": "2026-11-16"
  },
  "ROST": {
   "price": 222.99,
   "date": "2026-11-16",
   "changePct": -3.8,
   "close": 222.99,
   "closeDate": "2026-11-16"
  },
  "CSCO": {
   "price": 94.52,
   "date": "2026-11-16",
   "changePct": -1.2,
   "close": 94.52,
   "closeDate": "2026-11-16"
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
   "at": "2026-11-16T22:14:36Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7416.59,
   "date": "2026-11-16",
   "changePct": -1.9,
   "close": 7416.59,
   "closeDate": "2026-11-16",
   "at": "2026-11-16T22:14:36Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 218.93,
   "date": "2026-11-16",
   "changePct": -1,
   "close": 218.93,
   "closeDate": "2026-11-16",
   "at": "2026-11-16T22:14:36Z"
  }
 }
};
