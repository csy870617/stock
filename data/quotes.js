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
  "282330": {
   "price": 140800,
   "date": "2026-11-17",
   "changePct": -1.4,
   "close": 140800,
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
   "price": 506.24,
   "date": "2026-11-17",
   "changePct": -2.3,
   "close": 506.24,
   "closeDate": "2026-11-17"
  },
  "V": {
   "price": 416.77,
   "date": "2026-11-17",
   "changePct": -2.3,
   "close": 416.77,
   "closeDate": "2026-11-17"
  },
  "MA": {
   "price": 645.73,
   "date": "2026-11-17",
   "changePct": -2.4,
   "close": 645.73,
   "closeDate": "2026-11-17"
  },
  "GOOGL": {
   "price": 280.2,
   "date": "2026-11-17",
   "changePct": -1.2,
   "close": 280.2,
   "closeDate": "2026-11-17"
  },
  "NVDA": {
   "price": 155.46,
   "date": "2026-11-17",
   "changePct": -0.4,
   "close": 155.46,
   "closeDate": "2026-11-17"
  },
  "META": {
   "price": 618.87,
   "date": "2026-11-17",
   "changePct": -1.2,
   "close": 618.87,
   "closeDate": "2026-11-17"
  },
  "AVGO": {
   "price": 341.6,
   "date": "2026-11-17",
   "changePct": 2.5,
   "close": 341.6,
   "closeDate": "2026-11-17"
  },
  "TSM": {
   "price": 359.69,
   "date": "2026-11-17",
   "changePct": -3.7,
   "close": 359.69,
   "closeDate": "2026-11-17"
  },
  "UBER": {
   "price": 68.81,
   "date": "2026-11-17",
   "changePct": -1.7,
   "close": 68.81,
   "closeDate": "2026-11-17"
  },
  "GM": {
   "price": 84.05,
   "date": "2026-11-17",
   "changePct": 0.5,
   "close": 84.05,
   "closeDate": "2026-11-17"
  },
  "VZ": {
   "price": 45.93,
   "date": "2026-11-17",
   "changePct": -0.9,
   "close": 45.93,
   "closeDate": "2026-11-17"
  },
  "C": {
   "price": 119.94,
   "date": "2026-11-17",
   "changePct": -1.1,
   "close": 119.94,
   "closeDate": "2026-11-17"
  },
  "DUK": {
   "price": 129.84,
   "date": "2026-11-17",
   "changePct": -0.6,
   "close": 129.84,
   "closeDate": "2026-11-17"
  },
  "KO": {
   "price": 98.79,
   "date": "2026-11-17",
   "changePct": -0.7,
   "close": 98.79,
   "closeDate": "2026-11-17"
  },
  "JNJ": {
   "price": 278.7,
   "date": "2026-11-17",
   "changePct": -1.4,
   "close": 278.7,
   "closeDate": "2026-11-17"
  },
  "LLY": {
   "price": 1415.55,
   "date": "2026-11-17",
   "changePct": -1.1,
   "close": 1415.55,
   "closeDate": "2026-11-17"
  },
  "CI": {
   "price": 294.06,
   "date": "2026-11-17",
   "changePct": -2,
   "close": 294.06,
   "closeDate": "2026-11-17"
  },
  "TSLA": {
   "price": 380.11,
   "date": "2026-11-17",
   "changePct": 0.1,
   "close": 380.11,
   "closeDate": "2026-11-17"
  },
  "AAPL": {
   "price": 351.91,
   "date": "2026-11-17",
   "changePct": -0.2,
   "close": 351.91,
   "closeDate": "2026-11-17"
  },
  "MU": {
   "price": 712.42,
   "date": "2026-11-17",
   "changePct": -0.9,
   "close": 712.42,
   "closeDate": "2026-11-17"
  },
  "MDT": {
   "price": 102.32,
   "date": "2026-11-17",
   "changePct": -0.5,
   "close": 102.32,
   "closeDate": "2026-11-17"
  },
  "IREN": {
   "price": 15.805,
   "date": "2026-11-17",
   "changePct": -3.6,
   "close": 15.805,
   "closeDate": "2026-11-17"
  },
  "UNH": {
   "price": 389.68,
   "date": "2026-11-17",
   "changePct": -5.4,
   "close": 389.68,
   "closeDate": "2026-11-17"
  },
  "DVN": {
   "price": 43.46,
   "date": "2026-11-17",
   "changePct": -1.8,
   "close": 43.46,
   "closeDate": "2026-11-17"
  },
  "GS": {
   "price": 877.52,
   "date": "2026-11-17",
   "changePct": -1.6,
   "close": 877.52,
   "closeDate": "2026-11-17"
  },
  "AMP": {
   "price": 505.77,
   "date": "2026-11-17",
   "changePct": -1.6,
   "close": 505.77,
   "closeDate": "2026-11-17"
  },
  "PNC": {
   "price": 224.33,
   "date": "2026-11-17",
   "changePct": -2.3,
   "close": 224.33,
   "closeDate": "2026-11-17"
  },
  "MTB": {
   "price": 215.84,
   "date": "2026-11-17",
   "changePct": -1.8,
   "close": 215.84,
   "closeDate": "2026-11-17"
  },
  "SO": {
   "price": 93.6,
   "date": "2026-11-17",
   "changePct": -1.1,
   "close": 93.6,
   "closeDate": "2026-11-17"
  },
  "WEC": {
   "price": 116.29,
   "date": "2026-11-17",
   "changePct": -1,
   "close": 116.29,
   "closeDate": "2026-11-17"
  },
  "TJX": {
   "price": 129.85,
   "date": "2026-11-17",
   "changePct": -0.9,
   "close": 129.85,
   "closeDate": "2026-11-17"
  },
  "ANET": {
   "price": 186.42,
   "date": "2026-11-17",
   "changePct": -0.3,
   "close": 186.42,
   "closeDate": "2026-11-17"
  },
  "GD": {
   "price": 355.63,
   "date": "2026-11-17",
   "changePct": -1.1,
   "close": 355.63,
   "closeDate": "2026-11-17"
  },
  "LMT": {
   "price": 590.34,
   "date": "2026-11-17",
   "changePct": 0.9,
   "close": 590.34,
   "closeDate": "2026-11-17"
  },
  "CB": {
   "price": 375.64,
   "date": "2026-11-17",
   "changePct": -1.5,
   "close": 375.64,
   "closeDate": "2026-11-17"
  },
  "GILD": {
   "price": 170.26,
   "date": "2026-11-17",
   "changePct": 1.6,
   "close": 170.26,
   "closeDate": "2026-11-17"
  },
  "BRK.B": {
   "price": 586.76,
   "date": "2026-11-17",
   "changePct": -1,
   "close": 586.76,
   "closeDate": "2026-11-17"
  },
  "TMO": {
   "price": 686.79,
   "date": "2026-11-17",
   "changePct": -0.7,
   "close": 686.79,
   "closeDate": "2026-11-17"
  },
  "ECL": {
   "price": 302.59,
   "date": "2026-11-17",
   "changePct": -1.9,
   "close": 302.59,
   "closeDate": "2026-11-17"
  },
  "RSG": {
   "price": 252.93,
   "date": "2026-11-17",
   "changePct": -1,
   "close": 252.93,
   "closeDate": "2026-11-17"
  },
  "CTAS": {
   "price": 222.2,
   "date": "2026-11-17",
   "changePct": -0.9,
   "close": 222.2,
   "closeDate": "2026-11-17"
  },
  "ORLY": {
   "price": 92.69,
   "date": "2026-11-17",
   "changePct": 0,
   "close": 92.69,
   "closeDate": "2026-11-17"
  },
  "ADP": {
   "price": 308.29,
   "date": "2026-11-17",
   "changePct": -1.6,
   "close": 308.29,
   "closeDate": "2026-11-17"
  },
  "FAST": {
   "price": 54.35,
   "date": "2026-11-17",
   "changePct": -1.4,
   "close": 54.35,
   "closeDate": "2026-11-17"
  },
  "VRT": {
   "price": 190.37,
   "date": "2026-11-17",
   "changePct": 0.9,
   "close": 190.37,
   "closeDate": "2026-11-17"
  },
  "WAB": {
   "price": 290.41,
   "date": "2026-11-17",
   "changePct": -0.5,
   "close": 290.41,
   "closeDate": "2026-11-17"
  },
  "NTES": {
   "price": 119.62,
   "date": "2026-11-17",
   "changePct": -1.6,
   "close": 119.62,
   "closeDate": "2026-11-17"
  },
  "ROST": {
   "price": 220.45,
   "date": "2026-11-17",
   "changePct": -1.1,
   "close": 220.45,
   "closeDate": "2026-11-17"
  },
  "CSCO": {
   "price": 95.11,
   "date": "2026-11-17",
   "changePct": 0.6,
   "close": 95.11,
   "closeDate": "2026-11-17"
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
   "at": "2026-11-17T22:14:15Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7340.53,
   "date": "2026-11-17",
   "changePct": -1,
   "close": 7340.53,
   "closeDate": "2026-11-17",
   "at": "2026-11-17T22:14:15Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215.76,
   "date": "2026-11-17",
   "changePct": -1.4,
   "close": 215.76,
   "closeDate": "2026-11-17",
   "at": "2026-11-17T22:14:15Z"
  }
 }
};
