// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-24",
 "quotes": {
  "103590": {
   "price": 55100,
   "date": "2026-11-24",
   "changePct": 5.4,
   "close": 55100,
   "closeDate": "2026-11-24"
  },
  "105560": {
   "price": 151400,
   "date": "2026-11-24",
   "changePct": 5.4,
   "close": 151400,
   "closeDate": "2026-11-24"
  },
  "138040": {
   "price": 123000,
   "date": "2026-11-24",
   "changePct": 1.5,
   "close": 123000,
   "closeDate": "2026-11-24"
  },
  "139130": {
   "price": 15580,
   "date": "2026-11-24",
   "changePct": 2.3,
   "close": 15580,
   "closeDate": "2026-11-24"
  },
  "175330": {
   "price": 25350,
   "date": "2026-11-24",
   "changePct": 2.6,
   "close": 25350,
   "closeDate": "2026-11-24"
  },
  "207940": {
   "price": 1290000,
   "date": "2026-11-24",
   "changePct": 0.2,
   "close": 1290000,
   "closeDate": "2026-11-24"
  },
  "241560": {
   "price": 49700,
   "date": "2026-11-24",
   "changePct": 5.5,
   "close": 49700,
   "closeDate": "2026-11-24"
  },
  "267250": {
   "price": 113200,
   "date": "2026-11-24",
   "changePct": 6.2,
   "close": 113200,
   "closeDate": "2026-11-24"
  },
  "267260": {
   "price": 400000,
   "date": "2026-11-24",
   "changePct": 6,
   "close": 400000,
   "closeDate": "2026-11-24"
  },
  "267270": {
   "price": 79600,
   "date": "2026-11-24",
   "changePct": 6.8,
   "close": 79600,
   "closeDate": "2026-11-24"
  },
  "271560": {
   "price": 116500,
   "date": "2026-11-24",
   "changePct": 1.9,
   "close": 116500,
   "closeDate": "2026-11-24"
  },
  "282330": {
   "price": 133400,
   "date": "2026-11-24",
   "changePct": 0.6,
   "close": 133400,
   "closeDate": "2026-11-24"
  },
  "298040": {
   "price": 1763000,
   "date": "2026-11-24",
   "changePct": 7.6,
   "close": 1763000,
   "closeDate": "2026-11-24"
  },
  "316140": {
   "price": 31350,
   "date": "2026-11-24",
   "changePct": 3.1,
   "close": 31350,
   "closeDate": "2026-11-24"
  },
  "323410": {
   "price": 21300,
   "date": "2026-11-24",
   "changePct": 2.7,
   "close": 21300,
   "closeDate": "2026-11-24"
  },
  "361610": {
   "price": 10720,
   "date": "2026-11-24",
   "changePct": 1.6,
   "close": 10720,
   "closeDate": "2026-11-24"
  },
  "402340": {
   "price": 715000,
   "date": "2026-11-24",
   "changePct": 5.1,
   "close": 715000,
   "closeDate": "2026-11-24"
  },
  "005930": {
   "price": 189400,
   "date": "2026-11-24",
   "changePct": 6.7,
   "close": 189400,
   "closeDate": "2026-11-24"
  },
  "055550": {
   "price": 86600,
   "date": "2026-11-24",
   "changePct": 5.2,
   "close": 86600,
   "closeDate": "2026-11-24"
  },
  "000810": {
   "price": 511000,
   "date": "2026-11-24",
   "changePct": 6,
   "close": 511000,
   "closeDate": "2026-11-24"
  },
  "012450": {
   "price": 628000,
   "date": "2026-11-24",
   "changePct": 9.2,
   "close": 628000,
   "closeDate": "2026-11-24"
  },
  "009540": {
   "price": 225000,
   "date": "2026-11-24",
   "changePct": 5.4,
   "close": 225000,
   "closeDate": "2026-11-24"
  },
  "068270": {
   "price": 209000,
   "date": "2026-11-24",
   "changePct": 3.5,
   "close": 209000,
   "closeDate": "2026-11-24"
  },
  "000270": {
   "price": 95600,
   "date": "2026-11-24",
   "changePct": 10.6,
   "close": 95600,
   "closeDate": "2026-11-24"
  },
  "032640": {
   "price": 14960,
   "date": "2026-11-24",
   "changePct": 1.6,
   "close": 14960,
   "closeDate": "2026-11-24"
  },
  "029780": {
   "price": 40500,
   "date": "2026-11-24",
   "changePct": 0.4,
   "close": 40500,
   "closeDate": "2026-11-24"
  },
  "035900": {
   "price": 46700,
   "date": "2026-11-24",
   "changePct": 2.5,
   "close": 46700,
   "closeDate": "2026-11-24"
  },
  "036570": {
   "price": 171400,
   "date": "2026-11-24",
   "changePct": 1.5,
   "close": 171400,
   "closeDate": "2026-11-24"
  },
  "035720": {
   "price": 30350,
   "date": "2026-11-24",
   "changePct": 4.8,
   "close": 30350,
   "closeDate": "2026-11-24"
  },
  "001040": {
   "price": 112900,
   "date": "2026-11-24",
   "changePct": 1.2,
   "close": 112900,
   "closeDate": "2026-11-24"
  },
  "012750": {
   "price": 101800,
   "date": "2026-11-24",
   "changePct": -1.2,
   "close": 101800,
   "closeDate": "2026-11-24"
  },
  "000660": {
   "price": 1158000,
   "date": "2026-11-24",
   "changePct": 6.7,
   "close": 1158000,
   "closeDate": "2026-11-24"
  },
  "086790": {
   "price": 123100,
   "date": "2026-11-24",
   "changePct": 4.9,
   "close": 123100,
   "closeDate": "2026-11-24"
  },
  "001120": {
   "price": 31850,
   "date": "2026-11-24",
   "changePct": 2.4,
   "close": 31850,
   "closeDate": "2026-11-24"
  },
  "005830": {
   "price": 164300,
   "date": "2026-11-24",
   "changePct": 3.3,
   "close": 164300,
   "closeDate": "2026-11-24"
  },
  "066570": {
   "price": 143200,
   "date": "2026-11-24",
   "changePct": 15.9,
   "close": 143200,
   "closeDate": "2026-11-24"
  },
  "086280": {
   "price": 206500,
   "date": "2026-11-24",
   "changePct": 8.6,
   "close": 206500,
   "closeDate": "2026-11-24"
  },
  "018260": {
   "price": 184200,
   "date": "2026-11-24",
   "changePct": 4,
   "close": 184200,
   "closeDate": "2026-11-24"
  },
  "005850": {
   "price": 38200,
   "date": "2026-11-24",
   "changePct": 12.2,
   "close": 38200,
   "closeDate": "2026-11-24"
  },
  "005490": {
   "price": 255500,
   "date": "2026-11-24",
   "changePct": 5.4,
   "close": 255500,
   "closeDate": "2026-11-24"
  },
  "035420": {
   "price": 156100,
   "date": "2026-11-24",
   "changePct": 4.1,
   "close": 156100,
   "closeDate": "2026-11-24"
  },
  "010120": {
   "price": 122000,
   "date": "2026-11-24",
   "changePct": 10.7,
   "close": 122000,
   "closeDate": "2026-11-24"
  },
  "030200": {
   "price": 45000,
   "date": "2026-11-24",
   "changePct": 2.5,
   "close": 45000,
   "closeDate": "2026-11-24"
  },
  "012330": {
   "price": 359000,
   "date": "2026-11-24",
   "changePct": 14.5,
   "close": 359000,
   "closeDate": "2026-11-24"
  },
  "047050": {
   "price": 46850,
   "date": "2026-11-24",
   "changePct": 3.8,
   "close": 46850,
   "closeDate": "2026-11-24"
  },
  "042700": {
   "price": 163600,
   "date": "2026-11-24",
   "changePct": 8.5,
   "close": 163600,
   "closeDate": "2026-11-24"
  },
  "064400": {
   "price": 65900,
   "date": "2026-11-24",
   "changePct": 6.6,
   "close": 65900,
   "closeDate": "2026-11-24"
  },
  "095340": {
   "price": 130000,
   "date": "2026-11-24",
   "changePct": 6.8,
   "close": 130000,
   "closeDate": "2026-11-24"
  },
  "000100": {
   "price": 77300,
   "date": "2026-11-24",
   "changePct": 2,
   "close": 77300,
   "closeDate": "2026-11-24"
  },
  "021240": {
   "price": 100400,
   "date": "2026-11-24",
   "changePct": 2.9,
   "close": 100400,
   "closeDate": "2026-11-24"
  },
  "MSFT": {
   "price": 492.5,
   "date": "2026-11-23",
   "changePct": 1.6,
   "close": 492.5,
   "closeDate": "2026-11-23"
  },
  "V": {
   "price": 409.4,
   "date": "2026-11-23",
   "changePct": 1.9,
   "close": 409.4,
   "closeDate": "2026-11-23"
  },
  "MA": {
   "price": 635.48,
   "date": "2026-11-23",
   "changePct": 1.6,
   "close": 635.48,
   "closeDate": "2026-11-23"
  },
  "GOOGL": {
   "price": 282.1,
   "date": "2026-11-23",
   "changePct": 6.3,
   "close": 282.1,
   "closeDate": "2026-11-23"
  },
  "NVDA": {
   "price": 165.05,
   "date": "2026-11-23",
   "changePct": 31.5,
   "close": 165.05,
   "closeDate": "2026-11-23"
  },
  "META": {
   "price": 597.6,
   "date": "2026-11-23",
   "changePct": 6.6,
   "close": 597.6,
   "closeDate": "2026-11-23"
  },
  "AVGO": {
   "price": 313.55,
   "date": "2026-11-23",
   "changePct": 3,
   "close": 313.55,
   "closeDate": "2026-11-23"
  },
  "TSM": {
   "price": 363.6,
   "date": "2026-11-23",
   "changePct": 14.1,
   "close": 363.6,
   "closeDate": "2026-11-23"
  },
  "UBER": {
   "price": 64.07,
   "date": "2026-11-23",
   "changePct": 0.9,
   "close": 64.07,
   "closeDate": "2026-11-23"
  },
  "GM": {
   "price": 81.64,
   "date": "2026-11-23",
   "changePct": 3.7,
   "close": 81.64,
   "closeDate": "2026-11-23"
  },
  "VZ": {
   "price": 46.45,
   "date": "2026-11-23",
   "changePct": -0.1,
   "close": 46.45,
   "closeDate": "2026-11-23"
  },
  "C": {
   "price": 114.35,
   "date": "2026-11-23",
   "changePct": 3.4,
   "close": 114.35,
   "closeDate": "2026-11-23"
  },
  "DUK": {
   "price": 129.47,
   "date": "2026-11-23",
   "changePct": -0.2,
   "close": 129.47,
   "closeDate": "2026-11-23"
  },
  "KO": {
   "price": 95.88,
   "date": "2026-11-23",
   "changePct": -1.1,
   "close": 95.88,
   "closeDate": "2026-11-23"
  },
  "JNJ": {
   "price": 270.05,
   "date": "2026-11-23",
   "changePct": -0.2,
   "close": 270.05,
   "closeDate": "2026-11-23"
  },
  "LLY": {
   "price": 1364.6,
   "date": "2026-11-23",
   "changePct": 1.3,
   "close": 1364.6,
   "closeDate": "2026-11-23"
  },
  "CI": {
   "price": 270.46,
   "date": "2026-11-23",
   "changePct": -0.2,
   "close": 270.46,
   "closeDate": "2026-11-23"
  },
  "TSLA": {
   "price": 385.46,
   "date": "2026-11-23",
   "changePct": 11.5,
   "close": 385.46,
   "closeDate": "2026-11-23"
  },
  "AAPL": {
   "price": 349.08,
   "date": "2026-11-23",
   "changePct": 1.9,
   "close": 349.08,
   "closeDate": "2026-11-23"
  },
  "MU": {
   "price": 707.7,
   "date": "2026-11-23",
   "changePct": 19,
   "close": 707.7,
   "closeDate": "2026-11-23"
  },
  "MDT": {
   "price": 100.72,
   "date": "2026-11-23",
   "changePct": 0.8,
   "close": 100.72,
   "closeDate": "2026-11-23"
  },
  "IREN": {
   "price": 14.64,
   "date": "2026-11-23",
   "changePct": 23.9,
   "close": 14.64,
   "closeDate": "2026-11-23"
  },
  "DVN": {
   "price": 40.95,
   "date": "2026-11-23",
   "changePct": -1.4,
   "close": 40.95,
   "closeDate": "2026-11-23"
  },
  "GS": {
   "price": 823.62,
   "date": "2026-11-23",
   "changePct": 4.2,
   "close": 823.62,
   "closeDate": "2026-11-23"
  },
  "AMP": {
   "price": 494.04,
   "date": "2026-11-23",
   "changePct": 2.9,
   "close": 494.04,
   "closeDate": "2026-11-23"
  },
  "PNC": {
   "price": 217.13,
   "date": "2026-11-23",
   "changePct": 1.9,
   "close": 217.13,
   "closeDate": "2026-11-23"
  },
  "MTB": {
   "price": 211.6,
   "date": "2026-11-23",
   "changePct": 1.6,
   "close": 211.6,
   "closeDate": "2026-11-23"
  },
  "SO": {
   "price": 93.11,
   "date": "2026-11-23",
   "changePct": 0,
   "close": 93.11,
   "closeDate": "2026-11-23"
  },
  "WEC": {
   "price": 117.28,
   "date": "2026-11-23",
   "changePct": 0.2,
   "close": 117.28,
   "closeDate": "2026-11-23"
  },
  "TJX": {
   "price": 139.25,
   "date": "2026-11-23",
   "changePct": -0.3,
   "close": 139.25,
   "closeDate": "2026-11-23"
  },
  "ANET": {
   "price": 178.31,
   "date": "2026-11-23",
   "changePct": 6.4,
   "close": 178.31,
   "closeDate": "2026-11-23"
  },
  "GD": {
   "price": 347.84,
   "date": "2026-11-23",
   "changePct": 1.9,
   "close": 347.84,
   "closeDate": "2026-11-23"
  },
  "LMT": {
   "price": 571.67,
   "date": "2026-11-23",
   "changePct": 1.1,
   "close": 571.67,
   "closeDate": "2026-11-23"
  },
  "CB": {
   "price": 368.67,
   "date": "2026-11-23",
   "changePct": -0.8,
   "close": 368.67,
   "closeDate": "2026-11-23"
  },
  "GILD": {
   "price": 170.59,
   "date": "2026-11-23",
   "changePct": 2.5,
   "close": 170.59,
   "closeDate": "2026-11-23"
  },
  "BRK.B": {
   "price": 572.36,
   "date": "2026-11-23",
   "changePct": 0.4,
   "close": 572.36,
   "closeDate": "2026-11-23"
  },
  "TMO": {
   "price": 688.08,
   "date": "2026-11-23",
   "changePct": 2.8,
   "close": 688.08,
   "closeDate": "2026-11-23"
  },
  "ECL": {
   "price": 305.91,
   "date": "2026-11-23",
   "changePct": 3.8,
   "close": 305.91,
   "closeDate": "2026-11-23"
  },
  "RSG": {
   "price": 247.69,
   "date": "2026-11-23",
   "changePct": 0.4,
   "close": 247.69,
   "closeDate": "2026-11-23"
  },
  "CTAS": {
   "price": 223.68,
   "date": "2026-11-23",
   "changePct": 1.7,
   "close": 223.68,
   "closeDate": "2026-11-23"
  },
  "ORLY": {
   "price": 93.62,
   "date": "2026-11-23",
   "changePct": 1,
   "close": 93.62,
   "closeDate": "2026-11-23"
  },
  "ADP": {
   "price": 302.11,
   "date": "2026-11-23",
   "changePct": 0.1,
   "close": 302.11,
   "closeDate": "2026-11-23"
  },
  "FAST": {
   "price": 52.06,
   "date": "2026-11-23",
   "changePct": 2.9,
   "close": 52.06,
   "closeDate": "2026-11-23"
  },
  "VRT": {
   "price": 186.35,
   "date": "2026-11-23",
   "changePct": 12.1,
   "close": 186.35,
   "closeDate": "2026-11-23"
  },
  "WAB": {
   "price": 284.01,
   "date": "2026-11-23",
   "changePct": 5.5,
   "close": 284.01,
   "closeDate": "2026-11-23"
  },
  "CSCO": {
   "price": 96.8,
   "date": "2026-11-23",
   "changePct": 6.8,
   "close": 96.8,
   "closeDate": "2026-11-23"
  },
  "TEL": {
   "price": 212.97,
   "date": "2026-11-23",
   "changePct": 6.5,
   "close": 212.97,
   "closeDate": "2026-11-23"
  },
  "LOGI": {
   "price": 100.37,
   "date": "2026-11-23",
   "changePct": 3.3,
   "close": 100.37,
   "closeDate": "2026-11-23"
  },
  "RMD": {
   "price": 239.38,
   "date": "2026-11-23",
   "changePct": 1.6,
   "close": 239.38,
   "closeDate": "2026-11-23"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5006.03,
   "date": "2026-11-24",
   "changePct": 6.3,
   "close": 5006.03,
   "closeDate": "2026-11-24",
   "at": "2026-11-24T09:08:22Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7237.17,
   "date": "2026-11-23",
   "changePct": 4.7,
   "close": 7237.17,
   "closeDate": "2026-11-23",
   "at": "2026-11-24T09:08:22Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 212.82,
   "date": "2026-11-23",
   "changePct": 2.6,
   "close": 212.82,
   "closeDate": "2026-11-23",
   "at": "2026-11-24T09:08:22Z"
  }
 }
};
