// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-23",
 "quotes": {
  "103590": {
   "price": 52300,
   "date": "2026-11-23",
   "changePct": -2.6,
   "close": 52300,
   "closeDate": "2026-11-23"
  },
  "105560": {
   "price": 143700,
   "date": "2026-11-23",
   "changePct": -5.7,
   "close": 143700,
   "closeDate": "2026-11-23"
  },
  "138040": {
   "price": 121200,
   "date": "2026-11-23",
   "changePct": -3.7,
   "close": 121200,
   "closeDate": "2026-11-23"
  },
  "139130": {
   "price": 15230,
   "date": "2026-11-23",
   "changePct": -1.7,
   "close": 15230,
   "closeDate": "2026-11-23"
  },
  "175330": {
   "price": 24700,
   "date": "2026-11-23",
   "changePct": -3.5,
   "close": 24700,
   "closeDate": "2026-11-23"
  },
  "207940": {
   "price": 1288000,
   "date": "2026-11-23",
   "changePct": -4.9,
   "close": 1288000,
   "closeDate": "2026-11-23"
  },
  "241560": {
   "price": 47100,
   "date": "2026-11-23",
   "changePct": -6.2,
   "close": 47100,
   "closeDate": "2026-11-23"
  },
  "267250": {
   "price": 106600,
   "date": "2026-11-23",
   "changePct": -5.7,
   "close": 106600,
   "closeDate": "2026-11-23"
  },
  "267260": {
   "price": 377500,
   "date": "2026-11-23",
   "changePct": -2.3,
   "close": 377500,
   "closeDate": "2026-11-23"
  },
  "267270": {
   "price": 74500,
   "date": "2026-11-23",
   "changePct": -6.4,
   "close": 74500,
   "closeDate": "2026-11-23"
  },
  "271560": {
   "price": 114300,
   "date": "2026-11-23",
   "changePct": -2.6,
   "close": 114300,
   "closeDate": "2026-11-23"
  },
  "282330": {
   "price": 132600,
   "date": "2026-11-23",
   "changePct": -5.8,
   "close": 132600,
   "closeDate": "2026-11-23"
  },
  "298040": {
   "price": 1639000,
   "date": "2026-11-23",
   "changePct": -2.4,
   "close": 1639000,
   "closeDate": "2026-11-23"
  },
  "316140": {
   "price": 30400,
   "date": "2026-11-23",
   "changePct": -3.9,
   "close": 30400,
   "closeDate": "2026-11-23"
  },
  "323410": {
   "price": 20750,
   "date": "2026-11-23",
   "changePct": -4.2,
   "close": 20750,
   "closeDate": "2026-11-23"
  },
  "361610": {
   "price": 10550,
   "date": "2026-11-23",
   "changePct": -4.3,
   "close": 10550,
   "closeDate": "2026-11-23"
  },
  "402340": {
   "price": 680000,
   "date": "2026-11-23",
   "changePct": 0.4,
   "close": 680000,
   "closeDate": "2026-11-23"
  },
  "005930": {
   "price": 177500,
   "date": "2026-11-23",
   "changePct": -3.1,
   "close": 177500,
   "closeDate": "2026-11-23"
  },
  "055550": {
   "price": 82300,
   "date": "2026-11-23",
   "changePct": -4.5,
   "close": 82300,
   "closeDate": "2026-11-23"
  },
  "000810": {
   "price": 482000,
   "date": "2026-11-23",
   "changePct": -5.7,
   "close": 482000,
   "closeDate": "2026-11-23"
  },
  "012450": {
   "price": 575000,
   "date": "2026-11-23",
   "changePct": -5,
   "close": 575000,
   "closeDate": "2026-11-23"
  },
  "009540": {
   "price": 213500,
   "date": "2026-11-23",
   "changePct": -4,
   "close": 213500,
   "closeDate": "2026-11-23"
  },
  "068270": {
   "price": 202000,
   "date": "2026-11-23",
   "changePct": -5.2,
   "close": 202000,
   "closeDate": "2026-11-23"
  },
  "000270": {
   "price": 86400,
   "date": "2026-11-23",
   "changePct": -2,
   "close": 86400,
   "closeDate": "2026-11-23"
  },
  "032640": {
   "price": 14720,
   "date": "2026-11-23",
   "changePct": -1.7,
   "close": 14720,
   "closeDate": "2026-11-23"
  },
  "029780": {
   "price": 40350,
   "date": "2026-11-23",
   "changePct": -2.5,
   "close": 40350,
   "closeDate": "2026-11-23"
  },
  "035900": {
   "price": 45550,
   "date": "2026-11-23",
   "changePct": -3.1,
   "close": 45550,
   "closeDate": "2026-11-23"
  },
  "036570": {
   "price": 168900,
   "date": "2026-11-23",
   "changePct": -6,
   "close": 168900,
   "closeDate": "2026-11-23"
  },
  "035720": {
   "price": 28950,
   "date": "2026-11-23",
   "changePct": -6.6,
   "close": 28950,
   "closeDate": "2026-11-23"
  },
  "001040": {
   "price": 111600,
   "date": "2026-11-23",
   "changePct": -2.5,
   "close": 111600,
   "closeDate": "2026-11-23"
  },
  "012750": {
   "price": 103000,
   "date": "2026-11-23",
   "changePct": -1.9,
   "close": 103000,
   "closeDate": "2026-11-23"
  },
  "000660": {
   "price": 1085000,
   "date": "2026-11-23",
   "changePct": -2.5,
   "close": 1085000,
   "closeDate": "2026-11-23"
  },
  "086790": {
   "price": 117300,
   "date": "2026-11-23",
   "changePct": -5.3,
   "close": 117300,
   "closeDate": "2026-11-23"
  },
  "001120": {
   "price": 31100,
   "date": "2026-11-23",
   "changePct": -4.6,
   "close": 31100,
   "closeDate": "2026-11-23"
  },
  "005830": {
   "price": 159000,
   "date": "2026-11-23",
   "changePct": -3.3,
   "close": 159000,
   "closeDate": "2026-11-23"
  },
  "066570": {
   "price": 123600,
   "date": "2026-11-23",
   "changePct": -5.4,
   "close": 123600,
   "closeDate": "2026-11-23"
  },
  "086280": {
   "price": 190200,
   "date": "2026-11-23",
   "changePct": -7,
   "close": 190200,
   "closeDate": "2026-11-23"
  },
  "018260": {
   "price": 177200,
   "date": "2026-11-23",
   "changePct": -15.4,
   "close": 177200,
   "closeDate": "2026-11-23"
  },
  "005850": {
   "price": 34050,
   "date": "2026-11-23",
   "changePct": -4.4,
   "close": 34050,
   "closeDate": "2026-11-23"
  },
  "005490": {
   "price": 242500,
   "date": "2026-11-23",
   "changePct": -3.8,
   "close": 242500,
   "closeDate": "2026-11-23"
  },
  "035420": {
   "price": 150000,
   "date": "2026-11-23",
   "changePct": -7.2,
   "close": 150000,
   "closeDate": "2026-11-23"
  },
  "010120": {
   "price": 110200,
   "date": "2026-11-23",
   "changePct": 0.5,
   "close": 110200,
   "closeDate": "2026-11-23"
  },
  "030200": {
   "price": 43900,
   "date": "2026-11-23",
   "changePct": -3.5,
   "close": 43900,
   "closeDate": "2026-11-23"
  },
  "012330": {
   "price": 313500,
   "date": "2026-11-23",
   "changePct": -2.9,
   "close": 313500,
   "closeDate": "2026-11-23"
  },
  "047050": {
   "price": 45150,
   "date": "2026-11-23",
   "changePct": -3,
   "close": 45150,
   "closeDate": "2026-11-23"
  },
  "042700": {
   "price": 150800,
   "date": "2026-11-23",
   "changePct": -2,
   "close": 150800,
   "closeDate": "2026-11-23"
  },
  "064400": {
   "price": 61800,
   "date": "2026-11-23",
   "changePct": -13.9,
   "close": 61800,
   "closeDate": "2026-11-23"
  },
  "095340": {
   "price": 121700,
   "date": "2026-11-23",
   "changePct": -4.2,
   "close": 121700,
   "closeDate": "2026-11-23"
  },
  "000100": {
   "price": 75800,
   "date": "2026-11-23",
   "changePct": -6,
   "close": 75800,
   "closeDate": "2026-11-23"
  },
  "021240": {
   "price": 97600,
   "date": "2026-11-23",
   "changePct": -7.2,
   "close": 97600,
   "closeDate": "2026-11-23"
  },
  "MSFT": {
   "price": 492.5,
   "date": "2026-11-23",
   "changePct": 1.6,
   "close": 484.52,
   "closeDate": "2026-11-20"
  },
  "V": {
   "price": 409.4,
   "date": "2026-11-23",
   "changePct": 1.9,
   "close": 401.87,
   "closeDate": "2026-11-20"
  },
  "MA": {
   "price": 635.48,
   "date": "2026-11-23",
   "changePct": 1.6,
   "close": 625.59,
   "closeDate": "2026-11-20"
  },
  "GOOGL": {
   "price": 282.1,
   "date": "2026-11-23",
   "changePct": 6.3,
   "close": 265.29,
   "closeDate": "2026-11-20"
  },
  "NVDA": {
   "price": 165.05,
   "date": "2026-11-23",
   "changePct": 31.5,
   "close": 125.53,
   "closeDate": "2026-11-20"
  },
  "META": {
   "price": 597.6,
   "date": "2026-11-23",
   "changePct": 6.6,
   "close": 560.84,
   "closeDate": "2026-11-20"
  },
  "AVGO": {
   "price": 313.55,
   "date": "2026-11-23",
   "changePct": 3,
   "close": 304.41,
   "closeDate": "2026-11-20"
  },
  "TSM": {
   "price": 363.6,
   "date": "2026-11-23",
   "changePct": 14.1,
   "close": 318.71,
   "closeDate": "2026-11-20"
  },
  "UBER": {
   "price": 64.07,
   "date": "2026-11-23",
   "changePct": 0.9,
   "close": 63.47,
   "closeDate": "2026-11-20"
  },
  "GM": {
   "price": 81.64,
   "date": "2026-11-23",
   "changePct": 3.7,
   "close": 78.71,
   "closeDate": "2026-11-20"
  },
  "VZ": {
   "price": 46.45,
   "date": "2026-11-23",
   "changePct": -0.1,
   "close": 46.48,
   "closeDate": "2026-11-20"
  },
  "C": {
   "price": 114.35,
   "date": "2026-11-23",
   "changePct": 3.4,
   "close": 110.62,
   "closeDate": "2026-11-20"
  },
  "DUK": {
   "price": 129.47,
   "date": "2026-11-23",
   "changePct": -0.2,
   "close": 129.78,
   "closeDate": "2026-11-20"
  },
  "KO": {
   "price": 95.88,
   "date": "2026-11-23",
   "changePct": -1.1,
   "close": 96.99,
   "closeDate": "2026-11-20"
  },
  "JNJ": {
   "price": 270.05,
   "date": "2026-11-23",
   "changePct": -0.2,
   "close": 270.47,
   "closeDate": "2026-11-20"
  },
  "LLY": {
   "price": 1364.6,
   "date": "2026-11-23",
   "changePct": 1.3,
   "close": 1347.11,
   "closeDate": "2026-11-20"
  },
  "CI": {
   "price": 270.46,
   "date": "2026-11-23",
   "changePct": -0.2,
   "close": 270.9,
   "closeDate": "2026-11-20"
  },
  "TSLA": {
   "price": 385.46,
   "date": "2026-11-23",
   "changePct": 11.5,
   "close": 345.82,
   "closeDate": "2026-11-20"
  },
  "AAPL": {
   "price": 349.08,
   "date": "2026-11-23",
   "changePct": 1.9,
   "close": 342.56,
   "closeDate": "2026-11-20"
  },
  "MU": {
   "price": 707.7,
   "date": "2026-11-23",
   "changePct": 19,
   "close": 594.51,
   "closeDate": "2026-11-20"
  },
  "MDT": {
   "price": 100.72,
   "date": "2026-11-23",
   "changePct": 0.8,
   "close": 99.94,
   "closeDate": "2026-11-20"
  },
  "IREN": {
   "price": 14.64,
   "date": "2026-11-23",
   "changePct": 23.9,
   "close": 11.82,
   "closeDate": "2026-11-20"
  },
  "DVN": {
   "price": 40.95,
   "date": "2026-11-23",
   "changePct": -1.4,
   "close": 41.54,
   "closeDate": "2026-11-20"
  },
  "GS": {
   "price": 823.62,
   "date": "2026-11-23",
   "changePct": 4.2,
   "close": 790.69,
   "closeDate": "2026-11-20"
  },
  "AMP": {
   "price": 494.04,
   "date": "2026-11-23",
   "changePct": 2.9,
   "close": 480.29,
   "closeDate": "2026-11-20"
  },
  "PNC": {
   "price": 217.13,
   "date": "2026-11-23",
   "changePct": 1.9,
   "close": 213.12,
   "closeDate": "2026-11-20"
  },
  "MTB": {
   "price": 211.6,
   "date": "2026-11-23",
   "changePct": 1.6,
   "close": 208.3,
   "closeDate": "2026-11-20"
  },
  "SO": {
   "price": 93.11,
   "date": "2026-11-23",
   "changePct": 0,
   "close": 93.13,
   "closeDate": "2026-11-20"
  },
  "WEC": {
   "price": 117.28,
   "date": "2026-11-23",
   "changePct": 0.2,
   "close": 117.07,
   "closeDate": "2026-11-20"
  },
  "TJX": {
   "price": 139.25,
   "date": "2026-11-23",
   "changePct": -0.3,
   "close": 139.62,
   "closeDate": "2026-11-20"
  },
  "ANET": {
   "price": 178.31,
   "date": "2026-11-23",
   "changePct": 6.4,
   "close": 167.62,
   "closeDate": "2026-11-20"
  },
  "GD": {
   "price": 347.84,
   "date": "2026-11-23",
   "changePct": 1.9,
   "close": 341.5,
   "closeDate": "2026-11-20"
  },
  "LMT": {
   "price": 571.67,
   "date": "2026-11-23",
   "changePct": 1.1,
   "close": 565.5,
   "closeDate": "2026-11-20"
  },
  "CB": {
   "price": 368.67,
   "date": "2026-11-23",
   "changePct": -0.8,
   "close": 371.63,
   "closeDate": "2026-11-20"
  },
  "GILD": {
   "price": 170.59,
   "date": "2026-11-23",
   "changePct": 2.5,
   "close": 166.43,
   "closeDate": "2026-11-20"
  },
  "BRK.B": {
   "price": 572.36,
   "date": "2026-11-23",
   "changePct": 0.4,
   "close": 570,
   "closeDate": "2026-11-20"
  },
  "TMO": {
   "price": 688.08,
   "date": "2026-11-23",
   "changePct": 2.8,
   "close": 669.54,
   "closeDate": "2026-11-20"
  },
  "ECL": {
   "price": 305.91,
   "date": "2026-11-23",
   "changePct": 3.8,
   "close": 294.7,
   "closeDate": "2026-11-20"
  },
  "RSG": {
   "price": 247.69,
   "date": "2026-11-23",
   "changePct": 0.4,
   "close": 246.59,
   "closeDate": "2026-11-20"
  },
  "CTAS": {
   "price": 223.68,
   "date": "2026-11-23",
   "changePct": 1.7,
   "close": 220.01,
   "closeDate": "2026-11-20"
  },
  "ORLY": {
   "price": 93.62,
   "date": "2026-11-23",
   "changePct": 1,
   "close": 92.65,
   "closeDate": "2026-11-20"
  },
  "ADP": {
   "price": 302.11,
   "date": "2026-11-23",
   "changePct": 0.1,
   "close": 301.71,
   "closeDate": "2026-11-20"
  },
  "FAST": {
   "price": 52.06,
   "date": "2026-11-23",
   "changePct": 2.9,
   "close": 50.61,
   "closeDate": "2026-11-20"
  },
  "VRT": {
   "price": 186.35,
   "date": "2026-11-23",
   "changePct": 12.1,
   "close": 166.24,
   "closeDate": "2026-11-20"
  },
  "WAB": {
   "price": 284.01,
   "date": "2026-11-23",
   "changePct": 5.5,
   "close": 269.31,
   "closeDate": "2026-11-20"
  },
  "CSCO": {
   "price": 96.8,
   "date": "2026-11-23",
   "changePct": 6.8,
   "close": 90.64,
   "closeDate": "2026-11-20"
  },
  "TEL": {
   "price": 212.97,
   "date": "2026-11-23",
   "changePct": 6.5,
   "close": 199.97,
   "closeDate": "2026-11-20"
  },
  "LOGI": {
   "price": 100.37,
   "date": "2026-11-23",
   "changePct": 3.3,
   "close": 97.21,
   "closeDate": "2026-11-20"
  },
  "RMD": {
   "price": 239.38,
   "date": "2026-11-23",
   "changePct": 1.6,
   "close": 235.63,
   "closeDate": "2026-11-20"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 4708.54,
   "date": "2026-11-23",
   "changePct": -3.3,
   "close": 4708.54,
   "closeDate": "2026-11-23",
   "at": "2026-11-23T21:32:12Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7237.17,
   "date": "2026-11-23",
   "changePct": 4.7,
   "close": 6910.3901,
   "closeDate": "2026-11-20",
   "at": "2026-11-23T21:32:12Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 212.82,
   "date": "2026-11-23",
   "changePct": 2.6,
   "close": 207.44,
   "closeDate": "2026-11-20",
   "at": "2026-11-23T21:32:12Z"
  }
 }
};
