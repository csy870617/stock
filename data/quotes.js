// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-17",
 "quotes": {
  "103590": {
   "price": 56000,
   "date": "2026-11-17",
   "changePct": -0.4,
   "close": 56000,
   "closeDate": "2026-11-17"
  },
  "105560": {
   "price": 156800,
   "date": "2026-11-17",
   "changePct": -3,
   "close": 156800,
   "closeDate": "2026-11-17"
  },
  "138040": {
   "price": 121100,
   "date": "2026-11-17",
   "changePct": -0.2,
   "close": 121100,
   "closeDate": "2026-11-17"
  },
  "139130": {
   "price": 15610,
   "date": "2026-11-17",
   "changePct": -1.5,
   "close": 15610,
   "closeDate": "2026-11-17"
  },
  "175330": {
   "price": 27500,
   "date": "2026-11-17",
   "changePct": 0.2,
   "close": 27500,
   "closeDate": "2026-11-17"
  },
  "192400": {
   "price": 27100,
   "date": "2026-11-17",
   "changePct": -3.2,
   "close": 27100,
   "closeDate": "2026-11-17"
  },
  "207940": {
   "price": 1414000,
   "date": "2026-11-17",
   "changePct": -0.6,
   "close": 1414000,
   "closeDate": "2026-11-17"
  },
  "241560": {
   "price": 51100,
   "date": "2026-11-17",
   "changePct": -1.5,
   "close": 51100,
   "closeDate": "2026-11-17"
  },
  "267250": {
   "price": 117600,
   "date": "2026-11-17",
   "changePct": -4.5,
   "close": 117600,
   "closeDate": "2026-11-17"
  },
  "267260": {
   "price": 378500,
   "date": "2026-11-17",
   "changePct": -5.6,
   "close": 378500,
   "closeDate": "2026-11-17"
  },
  "267270": {
   "price": 88500,
   "date": "2026-11-17",
   "changePct": -2.5,
   "close": 88500,
   "closeDate": "2026-11-17"
  },
  "278470": {
   "price": 231000,
   "date": "2026-11-17",
   "changePct": -3.7,
   "close": 231000,
   "closeDate": "2026-11-17"
  },
  "298040": {
   "price": 1646000,
   "date": "2026-11-17",
   "changePct": -5.6,
   "close": 1646000,
   "closeDate": "2026-11-17"
  },
  "316140": {
   "price": 32600,
   "date": "2026-11-17",
   "changePct": -1.2,
   "close": 32600,
   "closeDate": "2026-11-17"
  },
  "323410": {
   "price": 21050,
   "date": "2026-11-17",
   "changePct": -0.7,
   "close": 21050,
   "closeDate": "2026-11-17"
  },
  "361610": {
   "price": 11950,
   "date": "2026-11-17",
   "changePct": -3,
   "close": 11950,
   "closeDate": "2026-11-17"
  },
  "005930": {
   "price": 190300,
   "date": "2026-11-17",
   "changePct": -3.3,
   "close": 190300,
   "closeDate": "2026-11-17"
  },
  "055550": {
   "price": 87500,
   "date": "2026-11-17",
   "changePct": -3.5,
   "close": 87500,
   "closeDate": "2026-11-17"
  },
  "000810": {
   "price": 527000,
   "date": "2026-11-17",
   "changePct": -2.8,
   "close": 527000,
   "closeDate": "2026-11-17"
  },
  "012450": {
   "price": 623000,
   "date": "2026-11-17",
   "changePct": -4,
   "close": 623000,
   "closeDate": "2026-11-17"
  },
  "009540": {
   "price": 233000,
   "date": "2026-11-17",
   "changePct": -2.5,
   "close": 233000,
   "closeDate": "2026-11-17"
  },
  "068270": {
   "price": 213000,
   "date": "2026-11-17",
   "changePct": -0.7,
   "close": 213000,
   "closeDate": "2026-11-17"
  },
  "000270": {
   "price": 92100,
   "date": "2026-11-17",
   "changePct": -3.1,
   "close": 92100,
   "closeDate": "2026-11-17"
  },
  "032640": {
   "price": 15650,
   "date": "2026-11-17",
   "changePct": 0.1,
   "close": 15650,
   "closeDate": "2026-11-17"
  },
  "029780": {
   "price": 41350,
   "date": "2026-11-17",
   "changePct": -0.7,
   "close": 41350,
   "closeDate": "2026-11-17"
  },
  "035900": {
   "price": 43000,
   "date": "2026-11-17",
   "changePct": -2.3,
   "close": 43000,
   "closeDate": "2026-11-17"
  },
  "036570": {
   "price": 177800,
   "date": "2026-11-17",
   "changePct": -2.1,
   "close": 177800,
   "closeDate": "2026-11-17"
  },
  "035720": {
   "price": 31700,
   "date": "2026-11-17",
   "changePct": -2.3,
   "close": 31700,
   "closeDate": "2026-11-17"
  },
  "001040": {
   "price": 110100,
   "date": "2026-11-17",
   "changePct": -1.4,
   "close": 110100,
   "closeDate": "2026-11-17"
  },
  "012750": {
   "price": 101800,
   "date": "2026-11-17",
   "changePct": 0.6,
   "close": 101800,
   "closeDate": "2026-11-17"
  },
  "000660": {
   "price": 1098000,
   "date": "2026-11-17",
   "changePct": -2,
   "close": 1098000,
   "closeDate": "2026-11-17"
  },
  "086790": {
   "price": 125100,
   "date": "2026-11-17",
   "changePct": -1.3,
   "close": 125100,
   "closeDate": "2026-11-17"
  },
  "001120": {
   "price": 34550,
   "date": "2026-11-17",
   "changePct": -1.3,
   "close": 34550,
   "closeDate": "2026-11-17"
  },
  "005830": {
   "price": 166800,
   "date": "2026-11-17",
   "changePct": -5,
   "close": 166800,
   "closeDate": "2026-11-17"
  },
  "066570": {
   "price": 129300,
   "date": "2026-11-17",
   "changePct": -1.8,
   "close": 129300,
   "closeDate": "2026-11-17"
  },
  "086280": {
   "price": 201000,
   "date": "2026-11-17",
   "changePct": -2.9,
   "close": 201000,
   "closeDate": "2026-11-17"
  },
  "018260": {
   "price": 226000,
   "date": "2026-11-17",
   "changePct": -1.3,
   "close": 226000,
   "closeDate": "2026-11-17"
  },
  "005850": {
   "price": 40550,
   "date": "2026-11-17",
   "changePct": -13.7,
   "close": 40550,
   "closeDate": "2026-11-17"
  },
  "005490": {
   "price": 261500,
   "date": "2026-11-17",
   "changePct": -2.6,
   "close": 261500,
   "closeDate": "2026-11-17"
  },
  "035420": {
   "price": 170000,
   "date": "2026-11-17",
   "changePct": -1.7,
   "close": 170000,
   "closeDate": "2026-11-17"
  },
  "010120": {
   "price": 113600,
   "date": "2026-11-17",
   "changePct": -4.2,
   "close": 113600,
   "closeDate": "2026-11-17"
  },
  "030200": {
   "price": 51000,
   "date": "2026-11-17",
   "changePct": -0.8,
   "close": 51000,
   "closeDate": "2026-11-17"
  },
  "012330": {
   "price": 346000,
   "date": "2026-11-17",
   "changePct": -2.8,
   "close": 346000,
   "closeDate": "2026-11-17"
  },
  "047050": {
   "price": 48900,
   "date": "2026-11-17",
   "changePct": -1.3,
   "close": 48900,
   "closeDate": "2026-11-17"
  },
  "030190": {
   "price": 16260,
   "date": "2026-11-17",
   "changePct": -4,
   "close": 16260,
   "closeDate": "2026-11-17"
  },
  "042700": {
   "price": 165300,
   "date": "2026-11-17",
   "changePct": -2.6,
   "close": 165300,
   "closeDate": "2026-11-17"
  },
  "064400": {
   "price": 77200,
   "date": "2026-11-17",
   "changePct": 0.3,
   "close": 77200,
   "closeDate": "2026-11-17"
  },
  "095340": {
   "price": 132700,
   "date": "2026-11-17",
   "changePct": -4,
   "close": 132700,
   "closeDate": "2026-11-17"
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
   "price": 4968.48,
   "date": "2026-11-17",
   "changePct": -2.6,
   "close": 4968.48,
   "closeDate": "2026-11-17",
   "at": "2026-11-17T07:55:35Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7416.59,
   "date": "2026-11-16",
   "changePct": -1.9,
   "close": 7416.59,
   "closeDate": "2026-11-16",
   "at": "2026-11-17T07:55:35Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 218.93,
   "date": "2026-11-16",
   "changePct": -1,
   "close": 218.93,
   "closeDate": "2026-11-16",
   "at": "2026-11-17T07:55:35Z"
  }
 }
};
