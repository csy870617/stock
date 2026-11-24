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
   "price": 54600,
   "date": "2026-11-24",
   "changePct": 4.4,
   "close": 52300,
   "closeDate": "2026-11-23"
  },
  "105560": {
   "price": 151500,
   "date": "2026-11-24",
   "changePct": 5.4,
   "close": 143700,
   "closeDate": "2026-11-23"
  },
  "138040": {
   "price": 122600,
   "date": "2026-11-24",
   "changePct": 1.2,
   "close": 121200,
   "closeDate": "2026-11-23"
  },
  "139130": {
   "price": 15490,
   "date": "2026-11-24",
   "changePct": 1.7,
   "close": 15230,
   "closeDate": "2026-11-23"
  },
  "175330": {
   "price": 25400,
   "date": "2026-11-24",
   "changePct": 2.8,
   "close": 24700,
   "closeDate": "2026-11-23"
  },
  "207940": {
   "price": 1304000,
   "date": "2026-11-24",
   "changePct": 1.2,
   "close": 1288000,
   "closeDate": "2026-11-23"
  },
  "241560": {
   "price": 49600,
   "date": "2026-11-24",
   "changePct": 5.3,
   "close": 47100,
   "closeDate": "2026-11-23"
  },
  "267250": {
   "price": 111700,
   "date": "2026-11-24",
   "changePct": 4.8,
   "close": 106600,
   "closeDate": "2026-11-23"
  },
  "267260": {
   "price": 399500,
   "date": "2026-11-24",
   "changePct": 5.8,
   "close": 377500,
   "closeDate": "2026-11-23"
  },
  "267270": {
   "price": 78300,
   "date": "2026-11-24",
   "changePct": 5.1,
   "close": 74500,
   "closeDate": "2026-11-23"
  },
  "271560": {
   "price": 115100,
   "date": "2026-11-24",
   "changePct": 0.7,
   "close": 114300,
   "closeDate": "2026-11-23"
  },
  "282330": {
   "price": 132600,
   "date": "2026-11-24",
   "changePct": 0,
   "close": 132600,
   "closeDate": "2026-11-23"
  },
  "298040": {
   "price": 1762000,
   "date": "2026-11-24",
   "changePct": 7.5,
   "close": 1639000,
   "closeDate": "2026-11-23"
  },
  "316140": {
   "price": 31450,
   "date": "2026-11-24",
   "changePct": 3.5,
   "close": 30400,
   "closeDate": "2026-11-23"
  },
  "323410": {
   "price": 21250,
   "date": "2026-11-24",
   "changePct": 2.4,
   "close": 20750,
   "closeDate": "2026-11-23"
  },
  "361610": {
   "price": 10600,
   "date": "2026-11-24",
   "changePct": 0.5,
   "close": 10550,
   "closeDate": "2026-11-23"
  },
  "402340": {
   "price": 729000,
   "date": "2026-11-24",
   "changePct": 7.2,
   "close": 680000,
   "closeDate": "2026-11-23"
  },
  "005930": {
   "price": 191800,
   "date": "2026-11-24",
   "changePct": 8.1,
   "close": 177500,
   "closeDate": "2026-11-23"
  },
  "055550": {
   "price": 86200,
   "date": "2026-11-24",
   "changePct": 4.7,
   "close": 82300,
   "closeDate": "2026-11-23"
  },
  "000810": {
   "price": 509000,
   "date": "2026-11-24",
   "changePct": 5.6,
   "close": 482000,
   "closeDate": "2026-11-23"
  },
  "012450": {
   "price": 627000,
   "date": "2026-11-24",
   "changePct": 9,
   "close": 575000,
   "closeDate": "2026-11-23"
  },
  "009540": {
   "price": 223000,
   "date": "2026-11-24",
   "changePct": 4.4,
   "close": 213500,
   "closeDate": "2026-11-23"
  },
  "068270": {
   "price": 208000,
   "date": "2026-11-24",
   "changePct": 3,
   "close": 202000,
   "closeDate": "2026-11-23"
  },
  "000270": {
   "price": 95400,
   "date": "2026-11-24",
   "changePct": 10.4,
   "close": 86400,
   "closeDate": "2026-11-23"
  },
  "032640": {
   "price": 14970,
   "date": "2026-11-24",
   "changePct": 1.7,
   "close": 14720,
   "closeDate": "2026-11-23"
  },
  "029780": {
   "price": 40050,
   "date": "2026-11-24",
   "changePct": -0.7,
   "close": 40350,
   "closeDate": "2026-11-23"
  },
  "035900": {
   "price": 46850,
   "date": "2026-11-24",
   "changePct": 2.9,
   "close": 45550,
   "closeDate": "2026-11-23"
  },
  "036570": {
   "price": 173500,
   "date": "2026-11-24",
   "changePct": 2.7,
   "close": 168900,
   "closeDate": "2026-11-23"
  },
  "035720": {
   "price": 30300,
   "date": "2026-11-24",
   "changePct": 4.7,
   "close": 28950,
   "closeDate": "2026-11-23"
  },
  "001040": {
   "price": 110900,
   "date": "2026-11-24",
   "changePct": -0.6,
   "close": 111600,
   "closeDate": "2026-11-23"
  },
  "012750": {
   "price": 101300,
   "date": "2026-11-24",
   "changePct": -1.7,
   "close": 103000,
   "closeDate": "2026-11-23"
  },
  "000660": {
   "price": 1182000,
   "date": "2026-11-24",
   "changePct": 8.9,
   "close": 1085000,
   "closeDate": "2026-11-23"
  },
  "086790": {
   "price": 122700,
   "date": "2026-11-24",
   "changePct": 4.6,
   "close": 117300,
   "closeDate": "2026-11-23"
  },
  "001120": {
   "price": 31800,
   "date": "2026-11-24",
   "changePct": 2.3,
   "close": 31100,
   "closeDate": "2026-11-23"
  },
  "005830": {
   "price": 163800,
   "date": "2026-11-24",
   "changePct": 3,
   "close": 159000,
   "closeDate": "2026-11-23"
  },
  "066570": {
   "price": 144300,
   "date": "2026-11-24",
   "changePct": 16.7,
   "close": 123600,
   "closeDate": "2026-11-23"
  },
  "086280": {
   "price": 206000,
   "date": "2026-11-24",
   "changePct": 8.3,
   "close": 190200,
   "closeDate": "2026-11-23"
  },
  "018260": {
   "price": 186400,
   "date": "2026-11-24",
   "changePct": 5.2,
   "close": 177200,
   "closeDate": "2026-11-23"
  },
  "005850": {
   "price": 38000,
   "date": "2026-11-24",
   "changePct": 11.6,
   "close": 34050,
   "closeDate": "2026-11-23"
  },
  "005490": {
   "price": 254000,
   "date": "2026-11-24",
   "changePct": 4.7,
   "close": 242500,
   "closeDate": "2026-11-23"
  },
  "035420": {
   "price": 156400,
   "date": "2026-11-24",
   "changePct": 4.3,
   "close": 150000,
   "closeDate": "2026-11-23"
  },
  "010120": {
   "price": 122500,
   "date": "2026-11-24",
   "changePct": 11.2,
   "close": 110200,
   "closeDate": "2026-11-23"
  },
  "030200": {
   "price": 45100,
   "date": "2026-11-24",
   "changePct": 2.7,
   "close": 43900,
   "closeDate": "2026-11-23"
  },
  "012330": {
   "price": 361000,
   "date": "2026-11-24",
   "changePct": 15.2,
   "close": 313500,
   "closeDate": "2026-11-23"
  },
  "047050": {
   "price": 46550,
   "date": "2026-11-24",
   "changePct": 3.1,
   "close": 45150,
   "closeDate": "2026-11-23"
  },
  "042700": {
   "price": 163500,
   "date": "2026-11-24",
   "changePct": 8.4,
   "close": 150800,
   "closeDate": "2026-11-23"
  },
  "064400": {
   "price": 66100,
   "date": "2026-11-24",
   "changePct": 7,
   "close": 61800,
   "closeDate": "2026-11-23"
  },
  "095340": {
   "price": 128300,
   "date": "2026-11-24",
   "changePct": 5.4,
   "close": 121700,
   "closeDate": "2026-11-23"
  },
  "000100": {
   "price": 76500,
   "date": "2026-11-24",
   "changePct": 0.9,
   "close": 75800,
   "closeDate": "2026-11-23"
  },
  "021240": {
   "price": 99400,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 97600,
   "closeDate": "2026-11-23"
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
   "price": 5041.1,
   "date": "2026-11-24",
   "changePct": 7.1,
   "close": 4708.54,
   "closeDate": "2026-11-23",
   "at": "2026-11-24T04:51:35Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7237.17,
   "date": "2026-11-23",
   "changePct": 4.7,
   "close": 7237.17,
   "closeDate": "2026-11-23",
   "at": "2026-11-24T04:51:35Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 212.82,
   "date": "2026-11-23",
   "changePct": 2.6,
   "close": 212.82,
   "closeDate": "2026-11-23",
   "at": "2026-11-24T04:51:36Z"
  }
 }
};
