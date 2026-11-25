// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-25",
 "quotes": {
  "103590": {
   "price": 51000,
   "date": "2026-11-25",
   "changePct": -7.4,
   "close": 55100,
   "closeDate": "2026-11-24"
  },
  "105560": {
   "price": 146800,
   "date": "2026-11-25",
   "changePct": -3,
   "close": 151400,
   "closeDate": "2026-11-24"
  },
  "138040": {
   "price": 124100,
   "date": "2026-11-25",
   "changePct": 0.9,
   "close": 123000,
   "closeDate": "2026-11-24"
  },
  "139130": {
   "price": 15330,
   "date": "2026-11-25",
   "changePct": -1.6,
   "close": 15580,
   "closeDate": "2026-11-24"
  },
  "175330": {
   "price": 24750,
   "date": "2026-11-25",
   "changePct": -2.4,
   "close": 25350,
   "closeDate": "2026-11-24"
  },
  "207940": {
   "price": 1341000,
   "date": "2026-11-25",
   "changePct": 4,
   "close": 1290000,
   "closeDate": "2026-11-24"
  },
  "241560": {
   "price": 47700,
   "date": "2026-11-25",
   "changePct": -4,
   "close": 49700,
   "closeDate": "2026-11-24"
  },
  "267250": {
   "price": 110700,
   "date": "2026-11-25",
   "changePct": -2.2,
   "close": 113200,
   "closeDate": "2026-11-24"
  },
  "267260": {
   "price": 377500,
   "date": "2026-11-25",
   "changePct": -5.6,
   "close": 400000,
   "closeDate": "2026-11-24"
  },
  "267270": {
   "price": 73000,
   "date": "2026-11-25",
   "changePct": -8.3,
   "close": 79600,
   "closeDate": "2026-11-24"
  },
  "271560": {
   "price": 118400,
   "date": "2026-11-25",
   "changePct": 1.6,
   "close": 116500,
   "closeDate": "2026-11-24"
  },
  "282330": {
   "price": 139100,
   "date": "2026-11-25",
   "changePct": 4.3,
   "close": 133400,
   "closeDate": "2026-11-24"
  },
  "298040": {
   "price": 1610000,
   "date": "2026-11-25",
   "changePct": -8.7,
   "close": 1763000,
   "closeDate": "2026-11-24"
  },
  "316140": {
   "price": 31200,
   "date": "2026-11-25",
   "changePct": -0.5,
   "close": 31350,
   "closeDate": "2026-11-24"
  },
  "323410": {
   "price": 21650,
   "date": "2026-11-25",
   "changePct": 1.6,
   "close": 21300,
   "closeDate": "2026-11-24"
  },
  "361610": {
   "price": 10330,
   "date": "2026-11-25",
   "changePct": -3.6,
   "close": 10720,
   "closeDate": "2026-11-24"
  },
  "402340": {
   "price": 641000,
   "date": "2026-11-25",
   "changePct": -10.3,
   "close": 715000,
   "closeDate": "2026-11-24"
  },
  "005930": {
   "price": 171300,
   "date": "2026-11-25",
   "changePct": -9.6,
   "close": 189400,
   "closeDate": "2026-11-24"
  },
  "055550": {
   "price": 84400,
   "date": "2026-11-25",
   "changePct": -2.5,
   "close": 86600,
   "closeDate": "2026-11-24"
  },
  "000810": {
   "price": 504000,
   "date": "2026-11-25",
   "changePct": -1.4,
   "close": 511000,
   "closeDate": "2026-11-24"
  },
  "012450": {
   "price": 630000,
   "date": "2026-11-25",
   "changePct": 0.3,
   "close": 628000,
   "closeDate": "2026-11-24"
  },
  "009540": {
   "price": 220000,
   "date": "2026-11-25",
   "changePct": -2.2,
   "close": 225000,
   "closeDate": "2026-11-24"
  },
  "068270": {
   "price": 214500,
   "date": "2026-11-25",
   "changePct": 2.6,
   "close": 209000,
   "closeDate": "2026-11-24"
  },
  "000270": {
   "price": 94800,
   "date": "2026-11-25",
   "changePct": -0.8,
   "close": 95600,
   "closeDate": "2026-11-24"
  },
  "032640": {
   "price": 15250,
   "date": "2026-11-25",
   "changePct": 1.9,
   "close": 14960,
   "closeDate": "2026-11-24"
  },
  "029780": {
   "price": 40150,
   "date": "2026-11-25",
   "changePct": -0.9,
   "close": 40500,
   "closeDate": "2026-11-24"
  },
  "035900": {
   "price": 46750,
   "date": "2026-11-25",
   "changePct": 0.1,
   "close": 46700,
   "closeDate": "2026-11-24"
  },
  "036570": {
   "price": 180500,
   "date": "2026-11-25",
   "changePct": 5.3,
   "close": 171400,
   "closeDate": "2026-11-24"
  },
  "035720": {
   "price": 29600,
   "date": "2026-11-25",
   "changePct": -2.5,
   "close": 30350,
   "closeDate": "2026-11-24"
  },
  "001040": {
   "price": 117800,
   "date": "2026-11-25",
   "changePct": 4.3,
   "close": 112900,
   "closeDate": "2026-11-24"
  },
  "012750": {
   "price": 102700,
   "date": "2026-11-25",
   "changePct": 0.9,
   "close": 101800,
   "closeDate": "2026-11-24"
  },
  "000660": {
   "price": 1048500,
   "date": "2026-11-25",
   "changePct": -9.5,
   "close": 1158000,
   "closeDate": "2026-11-24"
  },
  "086790": {
   "price": 120300,
   "date": "2026-11-25",
   "changePct": -2.3,
   "close": 123100,
   "closeDate": "2026-11-24"
  },
  "001120": {
   "price": 31550,
   "date": "2026-11-25",
   "changePct": -0.9,
   "close": 31850,
   "closeDate": "2026-11-24"
  },
  "005830": {
   "price": 164700,
   "date": "2026-11-25",
   "changePct": 0.2,
   "close": 164300,
   "closeDate": "2026-11-24"
  },
  "066570": {
   "price": 136500,
   "date": "2026-11-25",
   "changePct": -4.7,
   "close": 143200,
   "closeDate": "2026-11-24"
  },
  "086280": {
   "price": 202500,
   "date": "2026-11-25",
   "changePct": -1.9,
   "close": 206500,
   "closeDate": "2026-11-24"
  },
  "018260": {
   "price": 188000,
   "date": "2026-11-25",
   "changePct": 2.1,
   "close": 184200,
   "closeDate": "2026-11-24"
  },
  "005850": {
   "price": 37900,
   "date": "2026-11-25",
   "changePct": -0.8,
   "close": 38200,
   "closeDate": "2026-11-24"
  },
  "005490": {
   "price": 251500,
   "date": "2026-11-25",
   "changePct": -1.6,
   "close": 255500,
   "closeDate": "2026-11-24"
  },
  "035420": {
   "price": 158800,
   "date": "2026-11-25",
   "changePct": 1.7,
   "close": 156100,
   "closeDate": "2026-11-24"
  },
  "010120": {
   "price": 114000,
   "date": "2026-11-25",
   "changePct": -6.6,
   "close": 122000,
   "closeDate": "2026-11-24"
  },
  "030200": {
   "price": 45650,
   "date": "2026-11-25",
   "changePct": 1.4,
   "close": 45000,
   "closeDate": "2026-11-24"
  },
  "012330": {
   "price": 351500,
   "date": "2026-11-25",
   "changePct": -2.1,
   "close": 359000,
   "closeDate": "2026-11-24"
  },
  "047050": {
   "price": 46100,
   "date": "2026-11-25",
   "changePct": -1.6,
   "close": 46850,
   "closeDate": "2026-11-24"
  },
  "042700": {
   "price": 151200,
   "date": "2026-11-25",
   "changePct": -7.6,
   "close": 163600,
   "closeDate": "2026-11-24"
  },
  "064400": {
   "price": 66000,
   "date": "2026-11-25",
   "changePct": 0.2,
   "close": 65900,
   "closeDate": "2026-11-24"
  },
  "095340": {
   "price": 117000,
   "date": "2026-11-25",
   "changePct": -10,
   "close": 130000,
   "closeDate": "2026-11-24"
  },
  "000100": {
   "price": 82600,
   "date": "2026-11-25",
   "changePct": 6.9,
   "close": 77300,
   "closeDate": "2026-11-24"
  },
  "021240": {
   "price": 101600,
   "date": "2026-11-25",
   "changePct": 1.2,
   "close": 100400,
   "closeDate": "2026-11-24"
  },
  "MSFT": {
   "price": 496.13,
   "date": "2026-11-24",
   "changePct": 0.7,
   "close": 496.13,
   "closeDate": "2026-11-24"
  },
  "V": {
   "price": 416.78,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 416.78,
   "closeDate": "2026-11-24"
  },
  "MA": {
   "price": 647.44,
   "date": "2026-11-24",
   "changePct": 1.9,
   "close": 647.44,
   "closeDate": "2026-11-24"
  },
  "GOOGL": {
   "price": 279.05,
   "date": "2026-11-24",
   "changePct": -1.1,
   "close": 279.05,
   "closeDate": "2026-11-24"
  },
  "NVDA": {
   "price": 155.38,
   "date": "2026-11-24",
   "changePct": -5.9,
   "close": 155.38,
   "closeDate": "2026-11-24"
  },
  "META": {
   "price": 589.82,
   "date": "2026-11-24",
   "changePct": -1.3,
   "close": 589.82,
   "closeDate": "2026-11-24"
  },
  "AVGO": {
   "price": 301.08,
   "date": "2026-11-24",
   "changePct": -4,
   "close": 301.08,
   "closeDate": "2026-11-24"
  },
  "TSM": {
   "price": 349.2,
   "date": "2026-11-24",
   "changePct": -4,
   "close": 349.2,
   "closeDate": "2026-11-24"
  },
  "UBER": {
   "price": 64.7,
   "date": "2026-11-24",
   "changePct": 1,
   "close": 64.7,
   "closeDate": "2026-11-24"
  },
  "GM": {
   "price": 82.32,
   "date": "2026-11-24",
   "changePct": 0.8,
   "close": 82.32,
   "closeDate": "2026-11-24"
  },
  "VZ": {
   "price": 47.16,
   "date": "2026-11-24",
   "changePct": 1.5,
   "close": 47.16,
   "closeDate": "2026-11-24"
  },
  "C": {
   "price": 113.85,
   "date": "2026-11-24",
   "changePct": -0.4,
   "close": 113.85,
   "closeDate": "2026-11-24"
  },
  "DUK": {
   "price": 130.96,
   "date": "2026-11-24",
   "changePct": 1.2,
   "close": 130.96,
   "closeDate": "2026-11-24"
  },
  "KO": {
   "price": 97.62,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 97.62,
   "closeDate": "2026-11-24"
  },
  "JNJ": {
   "price": 276.46,
   "date": "2026-11-24",
   "changePct": 2.4,
   "close": 276.46,
   "closeDate": "2026-11-24"
  },
  "LLY": {
   "price": 1407.59,
   "date": "2026-11-24",
   "changePct": 3.2,
   "close": 1407.59,
   "closeDate": "2026-11-24"
  },
  "CI": {
   "price": 275,
   "date": "2026-11-24",
   "changePct": 1.7,
   "close": 275,
   "closeDate": "2026-11-24"
  },
  "TSLA": {
   "price": 384.68,
   "date": "2026-11-24",
   "changePct": -0.2,
   "close": 384.68,
   "closeDate": "2026-11-24"
  },
  "AAPL": {
   "price": 354.07,
   "date": "2026-11-24",
   "changePct": 1.4,
   "close": 354.07,
   "closeDate": "2026-11-24"
  },
  "MU": {
   "price": 629.79,
   "date": "2026-11-24",
   "changePct": -11,
   "close": 629.79,
   "closeDate": "2026-11-24"
  },
  "MDT": {
   "price": 96.13,
   "date": "2026-11-24",
   "changePct": -4.6,
   "close": 96.13,
   "closeDate": "2026-11-24"
  },
  "IREN": {
   "price": 12.95,
   "date": "2026-11-24",
   "changePct": -11.5,
   "close": 12.95,
   "closeDate": "2026-11-24"
  },
  "DVN": {
   "price": 41.33,
   "date": "2026-11-24",
   "changePct": 0.9,
   "close": 41.33,
   "closeDate": "2026-11-24"
  },
  "GS": {
   "price": 806.02,
   "date": "2026-11-24",
   "changePct": -2.1,
   "close": 806.02,
   "closeDate": "2026-11-24"
  },
  "AMP": {
   "price": 497.8,
   "date": "2026-11-24",
   "changePct": 0.8,
   "close": 497.8,
   "closeDate": "2026-11-24"
  },
  "PNC": {
   "price": 218.62,
   "date": "2026-11-24",
   "changePct": 0.7,
   "close": 218.62,
   "closeDate": "2026-11-24"
  },
  "MTB": {
   "price": 214.33,
   "date": "2026-11-24",
   "changePct": 1.3,
   "close": 214.33,
   "closeDate": "2026-11-24"
  },
  "SO": {
   "price": 94.11,
   "date": "2026-11-24",
   "changePct": 1.1,
   "close": 94.11,
   "closeDate": "2026-11-24"
  },
  "WEC": {
   "price": 118.12,
   "date": "2026-11-24",
   "changePct": 0.7,
   "close": 118.12,
   "closeDate": "2026-11-24"
  },
  "TJX": {
   "price": 143.86,
   "date": "2026-11-24",
   "changePct": 3.3,
   "close": 143.86,
   "closeDate": "2026-11-24"
  },
  "ANET": {
   "price": 168.56,
   "date": "2026-11-24",
   "changePct": -5.5,
   "close": 168.56,
   "closeDate": "2026-11-24"
  },
  "GD": {
   "price": 351.55,
   "date": "2026-11-24",
   "changePct": 1.1,
   "close": 351.55,
   "closeDate": "2026-11-24"
  },
  "LMT": {
   "price": 586.63,
   "date": "2026-11-24",
   "changePct": 2.6,
   "close": 586.63,
   "closeDate": "2026-11-24"
  },
  "CB": {
   "price": 375.37,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 375.37,
   "closeDate": "2026-11-24"
  },
  "GILD": {
   "price": 178.29,
   "date": "2026-11-24",
   "changePct": 4.5,
   "close": 178.29,
   "closeDate": "2026-11-24"
  },
  "BRK.B": {
   "price": 577.21,
   "date": "2026-11-24",
   "changePct": 0.8,
   "close": 577.21,
   "closeDate": "2026-11-24"
  },
  "TMO": {
   "price": 695.62,
   "date": "2026-11-24",
   "changePct": 1.1,
   "close": 695.62,
   "closeDate": "2026-11-24"
  },
  "ECL": {
   "price": 307.14,
   "date": "2026-11-24",
   "changePct": 0.4,
   "close": 307.14,
   "closeDate": "2026-11-24"
  },
  "RSG": {
   "price": 252.15,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 252.15,
   "closeDate": "2026-11-24"
  },
  "CTAS": {
   "price": 225.76,
   "date": "2026-11-24",
   "changePct": 0.9,
   "close": 225.76,
   "closeDate": "2026-11-24"
  },
  "ORLY": {
   "price": 95.43,
   "date": "2026-11-24",
   "changePct": 1.9,
   "close": 95.43,
   "closeDate": "2026-11-24"
  },
  "ADP": {
   "price": 310.79,
   "date": "2026-11-24",
   "changePct": 2.9,
   "close": 310.79,
   "closeDate": "2026-11-24"
  },
  "FAST": {
   "price": 52.27,
   "date": "2026-11-24",
   "changePct": 0.4,
   "close": 52.27,
   "closeDate": "2026-11-24"
  },
  "VRT": {
   "price": 173.82,
   "date": "2026-11-24",
   "changePct": -6.7,
   "close": 173.82,
   "closeDate": "2026-11-24"
  },
  "CSCO": {
   "price": 93.99,
   "date": "2026-11-24",
   "changePct": -2.9,
   "close": 93.99,
   "closeDate": "2026-11-24"
  },
  "TEL": {
   "price": 208.71,
   "date": "2026-11-24",
   "changePct": -2,
   "close": 208.71,
   "closeDate": "2026-11-24"
  },
  "LOGI": {
   "price": 100.16,
   "date": "2026-11-24",
   "changePct": -0.2,
   "close": 100.16,
   "closeDate": "2026-11-24"
  },
  "RMD": {
   "price": 243.44,
   "date": "2026-11-24",
   "changePct": 1.7,
   "close": 243.44,
   "closeDate": "2026-11-24"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 4706.29,
   "date": "2026-11-25",
   "changePct": -6,
   "close": 5006.0298,
   "closeDate": "2026-11-24",
   "at": "2026-11-25T03:36:04Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7201.09,
   "date": "2026-11-24",
   "changePct": -0.5,
   "close": 7201.09,
   "closeDate": "2026-11-24",
   "at": "2026-11-25T03:36:04Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 213.96,
   "date": "2026-11-24",
   "changePct": 0.5,
   "close": 213.96,
   "closeDate": "2026-11-24",
   "at": "2026-11-25T03:36:04Z"
  }
 }
};
