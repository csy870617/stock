// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-14",
 "quotes": {
  "103590": {
   "price": 56700,
   "date": "2026-11-13",
   "changePct": 4.4,
   "close": 56700,
   "closeDate": "2026-11-13"
  },
  "105560": {
   "price": 159000,
   "date": "2026-11-13",
   "changePct": 4.7,
   "close": 159000,
   "closeDate": "2026-11-13"
  },
  "138040": {
   "price": 118700,
   "date": "2026-11-13",
   "changePct": 5.4,
   "close": 118700,
   "closeDate": "2026-11-13"
  },
  "139130": {
   "price": 15750,
   "date": "2026-11-13",
   "changePct": 2.1,
   "close": 15750,
   "closeDate": "2026-11-13"
  },
  "175330": {
   "price": 26950,
   "date": "2026-11-13",
   "changePct": 2.1,
   "close": 26950,
   "closeDate": "2026-11-13"
  },
  "192400": {
   "price": 27500,
   "date": "2026-11-13",
   "changePct": 0.2,
   "close": 27500,
   "closeDate": "2026-11-13"
  },
  "207940": {
   "price": 1411000,
   "date": "2026-11-13",
   "changePct": -2.6,
   "close": 1411000,
   "closeDate": "2026-11-13"
  },
  "241560": {
   "price": 53000,
   "date": "2026-11-13",
   "changePct": 1.9,
   "close": 53000,
   "closeDate": "2026-11-13"
  },
  "267250": {
   "price": 124600,
   "date": "2026-11-13",
   "changePct": 0.9,
   "close": 124600,
   "closeDate": "2026-11-13"
  },
  "267260": {
   "price": 416000,
   "date": "2026-11-13",
   "changePct": -1.2,
   "close": 416000,
   "closeDate": "2026-11-13"
  },
  "267270": {
   "price": 93000,
   "date": "2026-11-13",
   "changePct": 1.6,
   "close": 93000,
   "closeDate": "2026-11-13"
  },
  "278470": {
   "price": 236000,
   "date": "2026-11-13",
   "changePct": -2.3,
   "close": 236000,
   "closeDate": "2026-11-13"
  },
  "298040": {
   "price": 1807000,
   "date": "2026-11-13",
   "changePct": -1.6,
   "close": 1807000,
   "closeDate": "2026-11-13"
  },
  "316140": {
   "price": 32500,
   "date": "2026-11-13",
   "changePct": 3,
   "close": 32500,
   "closeDate": "2026-11-13"
  },
  "323410": {
   "price": 20800,
   "date": "2026-11-13",
   "changePct": 2.7,
   "close": 20800,
   "closeDate": "2026-11-13"
  },
  "361610": {
   "price": 12650,
   "date": "2026-11-13",
   "changePct": -1.5,
   "close": 12650,
   "closeDate": "2026-11-13"
  },
  "005930": {
   "price": 206000,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 206000,
   "closeDate": "2026-11-13"
  },
  "055550": {
   "price": 89800,
   "date": "2026-11-13",
   "changePct": 5.6,
   "close": 89800,
   "closeDate": "2026-11-13"
  },
  "000810": {
   "price": 529000,
   "date": "2026-11-13",
   "changePct": 0.8,
   "close": 529000,
   "closeDate": "2026-11-13"
  },
  "012450": {
   "price": 641000,
   "date": "2026-11-13",
   "changePct": -2,
   "close": 641000,
   "closeDate": "2026-11-13"
  },
  "009540": {
   "price": 237500,
   "date": "2026-11-13",
   "changePct": -0.2,
   "close": 237500,
   "closeDate": "2026-11-13"
  },
  "068270": {
   "price": 214000,
   "date": "2026-11-13",
   "changePct": 2.1,
   "close": 214000,
   "closeDate": "2026-11-13"
  },
  "000270": {
   "price": 94600,
   "date": "2026-11-13",
   "changePct": 1.1,
   "close": 94600,
   "closeDate": "2026-11-13"
  },
  "032640": {
   "price": 15550,
   "date": "2026-11-13",
   "changePct": 3.2,
   "close": 15550,
   "closeDate": "2026-11-13"
  },
  "029780": {
   "price": 40850,
   "date": "2026-11-13",
   "changePct": 0.9,
   "close": 40850,
   "closeDate": "2026-11-13"
  },
  "035900": {
   "price": 43500,
   "date": "2026-11-13",
   "changePct": -3.5,
   "close": 43500,
   "closeDate": "2026-11-13"
  },
  "036570": {
   "price": 179000,
   "date": "2026-11-13",
   "changePct": -5.7,
   "close": 179000,
   "closeDate": "2026-11-13"
  },
  "035720": {
   "price": 31700,
   "date": "2026-11-13",
   "changePct": 0,
   "close": 31700,
   "closeDate": "2026-11-13"
  },
  "001040": {
   "price": 110800,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 110800,
   "closeDate": "2026-11-13"
  },
  "012750": {
   "price": 101200,
   "date": "2026-11-13",
   "changePct": 1.9,
   "close": 101200,
   "closeDate": "2026-11-13"
  },
  "000660": {
   "price": 1216000,
   "date": "2026-11-13",
   "changePct": -3,
   "close": 1216000,
   "closeDate": "2026-11-13"
  },
  "086790": {
   "price": 124600,
   "date": "2026-11-13",
   "changePct": 3.4,
   "close": 124600,
   "closeDate": "2026-11-13"
  },
  "001120": {
   "price": 35050,
   "date": "2026-11-13",
   "changePct": 1.3,
   "close": 35050,
   "closeDate": "2026-11-13"
  },
  "005830": {
   "price": 163600,
   "date": "2026-11-13",
   "changePct": 0.7,
   "close": 163600,
   "closeDate": "2026-11-13"
  },
  "066570": {
   "price": 135600,
   "date": "2026-11-13",
   "changePct": -1.2,
   "close": 135600,
   "closeDate": "2026-11-13"
  },
  "086280": {
   "price": 204500,
   "date": "2026-11-13",
   "changePct": -0.5,
   "close": 204500,
   "closeDate": "2026-11-13"
  },
  "018260": {
   "price": 234500,
   "date": "2026-11-13",
   "changePct": 1.7,
   "close": 234500,
   "closeDate": "2026-11-13"
  },
  "005850": {
   "price": 47500,
   "date": "2026-11-13",
   "changePct": 2.8,
   "close": 47500,
   "closeDate": "2026-11-13"
  },
  "005490": {
   "price": 275000,
   "date": "2026-11-13",
   "changePct": 0,
   "close": 275000,
   "closeDate": "2026-11-13"
  },
  "035420": {
   "price": 172500,
   "date": "2026-11-13",
   "changePct": -5.1,
   "close": 172500,
   "closeDate": "2026-11-13"
  },
  "010120": {
   "price": 123300,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 123300,
   "closeDate": "2026-11-13"
  },
  "030200": {
   "price": 51000,
   "date": "2026-11-13",
   "changePct": -0.6,
   "close": 51000,
   "closeDate": "2026-11-13"
  },
  "012330": {
   "price": 355500,
   "date": "2026-11-13",
   "changePct": 1,
   "close": 355500,
   "closeDate": "2026-11-13"
  },
  "047050": {
   "price": 49850,
   "date": "2026-11-13",
   "changePct": 1.7,
   "close": 49850,
   "closeDate": "2026-11-13"
  },
  "030190": {
   "price": 17740,
   "date": "2026-11-13",
   "changePct": -2.8,
   "close": 17740,
   "closeDate": "2026-11-13"
  },
  "042700": {
   "price": 181700,
   "date": "2026-11-13",
   "changePct": -0.1,
   "close": 181700,
   "closeDate": "2026-11-13"
  },
  "064400": {
   "price": 78500,
   "date": "2026-11-13",
   "changePct": 4.1,
   "close": 78500,
   "closeDate": "2026-11-13"
  },
  "095340": {
   "price": 150900,
   "date": "2026-11-13",
   "changePct": 5.2,
   "close": 150900,
   "closeDate": "2026-11-13"
  },
  "MSFT": {
   "price": 523.88,
   "date": "2026-11-13",
   "changePct": 0.2,
   "close": 523.88,
   "closeDate": "2026-11-13"
  },
  "V": {
   "price": 425.76,
   "date": "2026-11-13",
   "changePct": 1.3,
   "close": 425.76,
   "closeDate": "2026-11-13"
  },
  "MA": {
   "price": 661.19,
   "date": "2026-11-13",
   "changePct": 1.3,
   "close": 661.19,
   "closeDate": "2026-11-13"
  },
  "GOOGL": {
   "price": 295.77,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 295.77,
   "closeDate": "2026-11-13"
  },
  "COST": {
   "price": 1106.21,
   "date": "2026-11-13",
   "changePct": 1.3,
   "close": 1106.21,
   "closeDate": "2026-11-13"
  },
  "NVDA": {
   "price": 162.85,
   "date": "2026-11-13",
   "changePct": -2,
   "close": 162.85,
   "closeDate": "2026-11-13"
  },
  "META": {
   "price": 641.69,
   "date": "2026-11-13",
   "changePct": 2.9,
   "close": 641.69,
   "closeDate": "2026-11-13"
  },
  "AVGO": {
   "price": 347.01,
   "date": "2026-11-13",
   "changePct": -4.8,
   "close": 347.01,
   "closeDate": "2026-11-13"
  },
  "TSM": {
   "price": 398.73,
   "date": "2026-11-13",
   "changePct": -1.7,
   "close": 398.73,
   "closeDate": "2026-11-13"
  },
  "UBER": {
   "price": 69.69,
   "date": "2026-11-13",
   "changePct": 0.8,
   "close": 69.69,
   "closeDate": "2026-11-13"
  },
  "GM": {
   "price": 86,
   "date": "2026-11-13",
   "changePct": -0.3,
   "close": 86,
   "closeDate": "2026-11-13"
  },
  "VZ": {
   "price": 46.36,
   "date": "2026-11-13",
   "changePct": -0.4,
   "close": 46.36,
   "closeDate": "2026-11-13"
  },
  "C": {
   "price": 124.01,
   "date": "2026-11-13",
   "changePct": 0,
   "close": 124.01,
   "closeDate": "2026-11-13"
  },
  "DUK": {
   "price": 129.16,
   "date": "2026-11-13",
   "changePct": 0.4,
   "close": 129.16,
   "closeDate": "2026-11-13"
  },
  "KO": {
   "price": 99.25,
   "date": "2026-11-13",
   "changePct": 1.9,
   "close": 99.25,
   "closeDate": "2026-11-13"
  },
  "JNJ": {
   "price": 285.75,
   "date": "2026-11-13",
   "changePct": 0.8,
   "close": 285.75,
   "closeDate": "2026-11-13"
  },
  "LLY": {
   "price": 1443.5,
   "date": "2026-11-13",
   "changePct": 1.1,
   "close": 1443.5,
   "closeDate": "2026-11-13"
  },
  "CI": {
   "price": 297,
   "date": "2026-11-13",
   "changePct": 0.2,
   "close": 297,
   "closeDate": "2026-11-13"
  },
  "TSLA": {
   "price": 390.22,
   "date": "2026-11-13",
   "changePct": -1.8,
   "close": 390.22,
   "closeDate": "2026-11-13"
  },
  "AAPL": {
   "price": 356.27,
   "date": "2026-11-13",
   "changePct": 0.4,
   "close": 356.27,
   "closeDate": "2026-11-13"
  },
  "MU": {
   "price": 778.31,
   "date": "2026-11-13",
   "changePct": -2.5,
   "close": 778.31,
   "closeDate": "2026-11-13"
  },
  "MDT": {
   "price": 102.86,
   "date": "2026-11-13",
   "changePct": 1.9,
   "close": 102.86,
   "closeDate": "2026-11-13"
  },
  "IREN": {
   "price": 18.17,
   "date": "2026-11-13",
   "changePct": -6.7,
   "close": 18.17,
   "closeDate": "2026-11-13"
  },
  "UNH": {
   "price": 407.46,
   "date": "2026-11-13",
   "changePct": 0.6,
   "close": 407.46,
   "closeDate": "2026-11-13"
  },
  "DVN": {
   "price": 46.58,
   "date": "2026-11-13",
   "changePct": 0.8,
   "close": 46.58,
   "closeDate": "2026-11-13"
  },
  "GS": {
   "price": 916.56,
   "date": "2026-11-13",
   "changePct": 0.3,
   "close": 916.56,
   "closeDate": "2026-11-13"
  },
  "AMP": {
   "price": 519.43,
   "date": "2026-11-13",
   "changePct": 1.2,
   "close": 519.43,
   "closeDate": "2026-11-13"
  },
  "PNC": {
   "price": 232.29,
   "date": "2026-11-13",
   "changePct": 0.5,
   "close": 232.29,
   "closeDate": "2026-11-13"
  },
  "MTB": {
   "price": 221.12,
   "date": "2026-11-13",
   "changePct": 0.6,
   "close": 221.12,
   "closeDate": "2026-11-13"
  },
  "SO": {
   "price": 93.59,
   "date": "2026-11-13",
   "changePct": 1.2,
   "close": 93.59,
   "closeDate": "2026-11-13"
  },
  "WEC": {
   "price": 117.6,
   "date": "2026-11-13",
   "changePct": 0.1,
   "close": 117.6,
   "closeDate": "2026-11-13"
  },
  "TJX": {
   "price": 134.37,
   "date": "2026-11-13",
   "changePct": -1.2,
   "close": 134.37,
   "closeDate": "2026-11-13"
  },
  "ANET": {
   "price": 197.29,
   "date": "2026-11-13",
   "changePct": -4.5,
   "close": 197.29,
   "closeDate": "2026-11-13"
  },
  "GD": {
   "price": 363.46,
   "date": "2026-11-13",
   "changePct": 0.1,
   "close": 363.46,
   "closeDate": "2026-11-13"
  },
  "LMT": {
   "price": 596.04,
   "date": "2026-11-13",
   "changePct": -1.3,
   "close": 596.04,
   "closeDate": "2026-11-13"
  },
  "CB": {
   "price": 375.74,
   "date": "2026-11-13",
   "changePct": 1.1,
   "close": 375.74,
   "closeDate": "2026-11-13"
  },
  "GILD": {
   "price": 168.08,
   "date": "2026-11-13",
   "changePct": 0.1,
   "close": 168.08,
   "closeDate": "2026-11-13"
  },
  "BRK.B": {
   "price": 592.94,
   "date": "2026-11-13",
   "changePct": 0.5,
   "close": 592.94,
   "closeDate": "2026-11-13"
  },
  "TMO": {
   "price": 700.22,
   "date": "2026-11-13",
   "changePct": 0.1,
   "close": 700.22,
   "closeDate": "2026-11-13"
  },
  "ECL": {
   "price": 309.27,
   "date": "2026-11-13",
   "changePct": 1.6,
   "close": 309.27,
   "closeDate": "2026-11-13"
  },
  "RSG": {
   "price": 252.99,
   "date": "2026-11-13",
   "changePct": 0,
   "close": 252.99,
   "closeDate": "2026-11-13"
  },
  "CTAS": {
   "price": 226.24,
   "date": "2026-11-13",
   "changePct": -0.6,
   "close": 226.24,
   "closeDate": "2026-11-13"
  },
  "ORLY": {
   "price": 92.19,
   "date": "2026-11-13",
   "changePct": 0.7,
   "close": 92.19,
   "closeDate": "2026-11-13"
  },
  "ADP": {
   "price": 309.93,
   "date": "2026-11-13",
   "changePct": 0.7,
   "close": 309.93,
   "closeDate": "2026-11-13"
  },
  "FAST": {
   "price": 55.19,
   "date": "2026-11-13",
   "changePct": -0.6,
   "close": 55.19,
   "closeDate": "2026-11-13"
  },
  "VRT": {
   "price": 202.07,
   "date": "2026-11-13",
   "changePct": -3.6,
   "close": 202.07,
   "closeDate": "2026-11-13"
  },
  "WAB": {
   "price": 297.96,
   "date": "2026-11-13",
   "changePct": -0.8,
   "close": 297.96,
   "closeDate": "2026-11-13"
  },
  "NTES": {
   "price": 122.175,
   "date": "2026-11-13",
   "changePct": -0.4,
   "close": 122.175,
   "closeDate": "2026-11-13"
  },
  "ROST": {
   "price": 231.68,
   "date": "2026-11-13",
   "changePct": -2.3,
   "close": 231.68,
   "closeDate": "2026-11-13"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5290.53,
   "date": "2026-11-13",
   "changePct": -1,
   "close": 5290.53,
   "closeDate": "2026-11-13"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7561.67,
   "date": "2026-11-13",
   "changePct": -0.4,
   "close": 7561.67,
   "closeDate": "2026-11-13"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 221.16,
   "date": "2026-11-13",
   "changePct": 0.2,
   "close": 221.16,
   "closeDate": "2026-11-13"
  }
 }
};
