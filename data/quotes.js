// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-06",
 "quotes": {
  "103590": {
   "price": 43250,
   "date": "2026-11-06",
   "changePct": -11.7,
   "close": 43250,
   "closeDate": "2026-11-06"
  },
  "105560": {
   "price": 151000,
   "date": "2026-11-06",
   "changePct": -3.8,
   "close": 151000,
   "closeDate": "2026-11-06"
  },
  "138040": {
   "price": 132200,
   "date": "2026-11-06",
   "changePct": -2.1,
   "close": 132200,
   "closeDate": "2026-11-06"
  },
  "139130": {
   "price": 15240,
   "date": "2026-11-06",
   "changePct": -2.2,
   "close": 15240,
   "closeDate": "2026-11-06"
  },
  "175330": {
   "price": 27100,
   "date": "2026-11-06",
   "changePct": 0.4,
   "close": 27100,
   "closeDate": "2026-11-06"
  },
  "192400": {
   "price": 27000,
   "date": "2026-11-06",
   "changePct": -0.9,
   "close": 27000,
   "closeDate": "2026-11-06"
  },
  "207940": {
   "price": 1516000,
   "date": "2026-11-06",
   "changePct": -0.3,
   "close": 1516000,
   "closeDate": "2026-11-06"
  },
  "241560": {
   "price": 51700,
   "date": "2026-11-06",
   "changePct": 0,
   "close": 51700,
   "closeDate": "2026-11-06"
  },
  "267250": {
   "price": 124100,
   "date": "2026-11-06",
   "changePct": -4.5,
   "close": 124100,
   "closeDate": "2026-11-06"
  },
  "267260": {
   "price": 366500,
   "date": "2026-11-06",
   "changePct": -8.7,
   "close": 366500,
   "closeDate": "2026-11-06"
  },
  "267270": {
   "price": 80000,
   "date": "2026-11-06",
   "changePct": -3.5,
   "close": 80000,
   "closeDate": "2026-11-06"
  },
  "278470": {
   "price": 255500,
   "date": "2026-11-06",
   "changePct": -5,
   "close": 255500,
   "closeDate": "2026-11-06"
  },
  "282330": {
   "price": 143400,
   "date": "2026-11-06",
   "changePct": -4.5,
   "close": 143400,
   "closeDate": "2026-11-06"
  },
  "298040": {
   "price": 1577000,
   "date": "2026-11-06",
   "changePct": -11.9,
   "close": 1577000,
   "closeDate": "2026-11-06"
  },
  "316140": {
   "price": 31400,
   "date": "2026-11-06",
   "changePct": -1.7,
   "close": 31400,
   "closeDate": "2026-11-06"
  },
  "323410": {
   "price": 20750,
   "date": "2026-11-06",
   "changePct": -0.2,
   "close": 20750,
   "closeDate": "2026-11-06"
  },
  "361610": {
   "price": 12580,
   "date": "2026-11-06",
   "changePct": -5.8,
   "close": 12580,
   "closeDate": "2026-11-06"
  },
  "005930": {
   "price": 188700,
   "date": "2026-11-06",
   "changePct": -6.4,
   "close": 188700,
   "closeDate": "2026-11-06"
  },
  "055550": {
   "price": 86700,
   "date": "2026-11-06",
   "changePct": -2.3,
   "close": 86700,
   "closeDate": "2026-11-06"
  },
  "000810": {
   "price": 604000,
   "date": "2026-11-06",
   "changePct": -7.4,
   "close": 604000,
   "closeDate": "2026-11-06"
  },
  "012450": {
   "price": 660000,
   "date": "2026-11-06",
   "changePct": -2.9,
   "close": 660000,
   "closeDate": "2026-11-06"
  },
  "009540": {
   "price": 240000,
   "date": "2026-11-06",
   "changePct": -2.4,
   "close": 240000,
   "closeDate": "2026-11-06"
  },
  "068270": {
   "price": 211000,
   "date": "2026-11-06",
   "changePct": -1.9,
   "close": 211000,
   "closeDate": "2026-11-06"
  },
  "000270": {
   "price": 100300,
   "date": "2026-11-06",
   "changePct": -0.5,
   "close": 100300,
   "closeDate": "2026-11-06"
  },
  "032640": {
   "price": 16760,
   "date": "2026-11-06",
   "changePct": 5.2,
   "close": 16760,
   "closeDate": "2026-11-06"
  },
  "029780": {
   "price": 42050,
   "date": "2026-11-06",
   "changePct": 0.5,
   "close": 42050,
   "closeDate": "2026-11-06"
  },
  "035900": {
   "price": 41300,
   "date": "2026-11-06",
   "changePct": 4.6,
   "close": 41300,
   "closeDate": "2026-11-06"
  },
  "036570": {
   "price": 208500,
   "date": "2026-11-06",
   "changePct": -0.5,
   "close": 208500,
   "closeDate": "2026-11-06"
  },
  "035720": {
   "price": 32300,
   "date": "2026-11-06",
   "changePct": 0.3,
   "close": 32300,
   "closeDate": "2026-11-06"
  },
  "001040": {
   "price": 113800,
   "date": "2026-11-06",
   "changePct": -3,
   "close": 113800,
   "closeDate": "2026-11-06"
  },
  "012750": {
   "price": 98400,
   "date": "2026-11-06",
   "changePct": -0.3,
   "close": 98400,
   "closeDate": "2026-11-06"
  },
  "000660": {
   "price": 1132000,
   "date": "2026-11-06",
   "changePct": -10.4,
   "close": 1132000,
   "closeDate": "2026-11-06"
  },
  "086790": {
   "price": 118300,
   "date": "2026-11-06",
   "changePct": -2.1,
   "close": 118300,
   "closeDate": "2026-11-06"
  },
  "001120": {
   "price": 34450,
   "date": "2026-11-06",
   "changePct": -5.2,
   "close": 34450,
   "closeDate": "2026-11-06"
  },
  "005830": {
   "price": 171100,
   "date": "2026-11-06",
   "changePct": -4.5,
   "close": 171100,
   "closeDate": "2026-11-06"
  },
  "066570": {
   "price": 138600,
   "date": "2026-11-06",
   "changePct": -2.9,
   "close": 138600,
   "closeDate": "2026-11-06"
  },
  "086280": {
   "price": 197300,
   "date": "2026-11-06",
   "changePct": -2.1,
   "close": 197300,
   "closeDate": "2026-11-06"
  },
  "018260": {
   "price": 218000,
   "date": "2026-11-06",
   "changePct": 6.3,
   "close": 218000,
   "closeDate": "2026-11-06"
  },
  "005850": {
   "price": 47050,
   "date": "2026-11-06",
   "changePct": -3.9,
   "close": 47050,
   "closeDate": "2026-11-06"
  },
  "005490": {
   "price": 265000,
   "date": "2026-11-06",
   "changePct": -3.1,
   "close": 265000,
   "closeDate": "2026-11-06"
  },
  "035420": {
   "price": 190200,
   "date": "2026-11-06",
   "changePct": 2.9,
   "close": 190200,
   "closeDate": "2026-11-06"
  },
  "010120": {
   "price": 116500,
   "date": "2026-11-06",
   "changePct": -10.2,
   "close": 116500,
   "closeDate": "2026-11-06"
  },
  "030200": {
   "price": 53300,
   "date": "2026-11-06",
   "changePct": 2.9,
   "close": 53300,
   "closeDate": "2026-11-06"
  },
  "012330": {
   "price": 349000,
   "date": "2026-11-06",
   "changePct": -4.1,
   "close": 349000,
   "closeDate": "2026-11-06"
  },
  "047050": {
   "price": 48050,
   "date": "2026-11-06",
   "changePct": -4.5,
   "close": 48050,
   "closeDate": "2026-11-06"
  },
  "021240": {
   "price": 107600,
   "date": "2026-11-06",
   "changePct": -2,
   "close": 107600,
   "closeDate": "2026-11-06"
  },
  "033780": {
   "price": 189900,
   "date": "2026-11-06",
   "changePct": -2.2,
   "close": 189900,
   "closeDate": "2026-11-06"
  },
  "030190": {
   "price": 17850,
   "date": "2026-11-06",
   "changePct": -0.1,
   "close": 17850,
   "closeDate": "2026-11-06"
  },
  "042700": {
   "price": 161400,
   "date": "2026-11-06",
   "changePct": -4.6,
   "close": 161400,
   "closeDate": "2026-11-06"
  },
  "064400": {
   "price": 74100,
   "date": "2026-11-06",
   "changePct": 2.1,
   "close": 74100,
   "closeDate": "2026-11-06"
  },
  "095340": {
   "price": 121000,
   "date": "2026-11-06",
   "changePct": -14.1,
   "close": 121000,
   "closeDate": "2026-11-06"
  },
  "MSFT": {
   "price": 535.93,
   "date": "2026-11-05",
   "changePct": -3.6,
   "close": 535.93,
   "closeDate": "2026-11-05"
  },
  "V": {
   "price": 422.59,
   "date": "2026-11-05",
   "changePct": -3.2,
   "close": 422.59,
   "closeDate": "2026-11-05"
  },
  "MA": {
   "price": 655.92,
   "date": "2026-11-05",
   "changePct": -2.5,
   "close": 655.92,
   "closeDate": "2026-11-05"
  },
  "GOOGL": {
   "price": 282.57,
   "date": "2026-11-05",
   "changePct": -2.2,
   "close": 282.57,
   "closeDate": "2026-11-05"
  },
  "COST": {
   "price": 1065.59,
   "date": "2026-11-05",
   "changePct": 1.8,
   "close": 1065.59,
   "closeDate": "2026-11-05"
  },
  "NVDA": {
   "price": 181.6,
   "date": "2026-11-05",
   "changePct": -9.3,
   "close": 181.6,
   "closeDate": "2026-11-05"
  },
  "META": {
   "price": 605.08,
   "date": "2026-11-05",
   "changePct": -4,
   "close": 605.08,
   "closeDate": "2026-11-05"
  },
  "AVGO": {
   "price": 291.53,
   "date": "2026-11-05",
   "changePct": -10.4,
   "close": 291.53,
   "closeDate": "2026-11-05"
  },
  "TSM": {
   "price": 353.1,
   "date": "2026-11-05",
   "changePct": -10.8,
   "close": 353.1,
   "closeDate": "2026-11-05"
  },
  "UBER": {
   "price": 68.78,
   "date": "2026-11-05",
   "changePct": -1.6,
   "close": 68.78,
   "closeDate": "2026-11-05"
  },
  "GM": {
   "price": 89.33,
   "date": "2026-11-05",
   "changePct": -3.4,
   "close": 89.33,
   "closeDate": "2026-11-05"
  },
  "VZ": {
   "price": 46.12,
   "date": "2026-11-05",
   "changePct": -0.1,
   "close": 46.12,
   "closeDate": "2026-11-05"
  },
  "C": {
   "price": 118.45,
   "date": "2026-11-05",
   "changePct": -5,
   "close": 118.45,
   "closeDate": "2026-11-05"
  },
  "DUK": {
   "price": 130.08,
   "date": "2026-11-05",
   "changePct": 0.4,
   "close": 130.08,
   "closeDate": "2026-11-05"
  },
  "KO": {
   "price": 95.73,
   "date": "2026-11-05",
   "changePct": -0.1,
   "close": 95.73,
   "closeDate": "2026-11-05"
  },
  "JNJ": {
   "price": 272.32,
   "date": "2026-11-05",
   "changePct": -1.4,
   "close": 272.32,
   "closeDate": "2026-11-05"
  },
  "LLY": {
   "price": 1364.73,
   "date": "2026-11-05",
   "changePct": -3.8,
   "close": 1364.73,
   "closeDate": "2026-11-05"
  },
  "CI": {
   "price": 301.48,
   "date": "2026-11-05",
   "changePct": -1.3,
   "close": 301.48,
   "closeDate": "2026-11-05"
  },
  "TSLA": {
   "price": 343.69,
   "date": "2026-11-05",
   "changePct": -10.8,
   "close": 343.69,
   "closeDate": "2026-11-05"
  },
  "MDLZ": {
   "price": 66.82,
   "date": "2026-11-05",
   "changePct": -0.8,
   "close": 66.82,
   "closeDate": "2026-11-05"
  },
  "AAPL": {
   "price": 344.17,
   "date": "2026-11-05",
   "changePct": -1.5,
   "close": 344.17,
   "closeDate": "2026-11-05"
  },
  "MU": {
   "price": 656.39,
   "date": "2026-11-05",
   "changePct": -17.5,
   "close": 656.39,
   "closeDate": "2026-11-05"
  },
  "MDT": {
   "price": 104.84,
   "date": "2026-11-05",
   "changePct": -0.1,
   "close": 104.84,
   "closeDate": "2026-11-05"
  },
  "IREN": {
   "price": 18.03,
   "date": "2026-11-05",
   "changePct": -17,
   "close": 18.03,
   "closeDate": "2026-11-05"
  },
  "UNH": {
   "price": 395.72,
   "date": "2026-11-05",
   "changePct": -3.3,
   "close": 395.72,
   "closeDate": "2026-11-05"
  },
  "DVN": {
   "price": 42.88,
   "date": "2026-11-05",
   "changePct": -2.8,
   "close": 42.88,
   "closeDate": "2026-11-05"
  },
  "GS": {
   "price": 868.95,
   "date": "2026-11-05",
   "changePct": -6.4,
   "close": 868.95,
   "closeDate": "2026-11-05"
  },
  "AMP": {
   "price": 509.32,
   "date": "2026-11-05",
   "changePct": -3.4,
   "close": 509.32,
   "closeDate": "2026-11-05"
  },
  "PNC": {
   "price": 226.75,
   "date": "2026-11-05",
   "changePct": -2.9,
   "close": 226.75,
   "closeDate": "2026-11-05"
  },
  "MTB": {
   "price": 219.78,
   "date": "2026-11-05",
   "changePct": -2.2,
   "close": 219.78,
   "closeDate": "2026-11-05"
  },
  "SO": {
   "price": 93.34,
   "date": "2026-11-05",
   "changePct": 0.2,
   "close": 93.34,
   "closeDate": "2026-11-05"
  },
  "WEC": {
   "price": 118.32,
   "date": "2026-11-05",
   "changePct": 0.2,
   "close": 118.32,
   "closeDate": "2026-11-05"
  },
  "TJX": {
   "price": 138.59,
   "date": "2026-11-05",
   "changePct": -4.3,
   "close": 138.59,
   "closeDate": "2026-11-05"
  },
  "ANET": {
   "price": 159.16,
   "date": "2026-11-05",
   "changePct": -10.8,
   "close": 159.16,
   "closeDate": "2026-11-05"
  },
  "GD": {
   "price": 356.35,
   "date": "2026-11-05",
   "changePct": -2.3,
   "close": 356.35,
   "closeDate": "2026-11-05"
  },
  "LMT": {
   "price": 576.16,
   "date": "2026-11-05",
   "changePct": -3.2,
   "close": 576.16,
   "closeDate": "2026-11-05"
  },
  "CB": {
   "price": 371.63,
   "date": "2026-11-05",
   "changePct": -0.7,
   "close": 371.63,
   "closeDate": "2026-11-05"
  },
  "GILD": {
   "price": 167.57,
   "date": "2026-11-05",
   "changePct": -4,
   "close": 167.57,
   "closeDate": "2026-11-05"
  },
  "BRK.B": {
   "price": 572.33,
   "date": "2026-11-05",
   "changePct": -1.2,
   "close": 572.33,
   "closeDate": "2026-11-05"
  },
  "TMO": {
   "price": 676.94,
   "date": "2026-11-05",
   "changePct": -4.1,
   "close": 676.94,
   "closeDate": "2026-11-05"
  },
  "ECL": {
   "price": 305.83,
   "date": "2026-11-05",
   "changePct": -2.9,
   "close": 305.83,
   "closeDate": "2026-11-05"
  },
  "MSI": {
   "price": 517.01,
   "date": "2026-11-05",
   "changePct": 4,
   "close": 517.01,
   "closeDate": "2026-11-05"
  },
  "RSG": {
   "price": 249.42,
   "date": "2026-11-05",
   "changePct": 1.6,
   "close": 249.42,
   "closeDate": "2026-11-05"
  },
  "CTAS": {
   "price": 226.41,
   "date": "2026-11-05",
   "changePct": -1.1,
   "close": 226.41,
   "closeDate": "2026-11-05"
  },
  "ORLY": {
   "price": 91.49,
   "date": "2026-11-05",
   "changePct": -0.9,
   "close": 91.49,
   "closeDate": "2026-11-05"
  },
  "YUM": {
   "price": 166.09,
   "date": "2026-11-05",
   "changePct": -0.1,
   "close": 166.09,
   "closeDate": "2026-11-05"
  },
  "ADP": {
   "price": 307.14,
   "date": "2026-11-05",
   "changePct": 1.2,
   "close": 307.14,
   "closeDate": "2026-11-05"
  },
  "FAST": {
   "price": 52.9,
   "date": "2026-11-05",
   "changePct": -0.6,
   "close": 52.9,
   "closeDate": "2026-11-05"
  },
  "VRT": {
   "price": 176.73,
   "date": "2026-11-05",
   "changePct": -14,
   "close": 176.73,
   "closeDate": "2026-11-05"
  },
  "WAB": {
   "price": 278.48,
   "date": "2026-11-05",
   "changePct": -5.6,
   "close": 278.48,
   "closeDate": "2026-11-05"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5059.69,
   "date": "2026-11-06",
   "changePct": -6,
   "close": 5059.69,
   "closeDate": "2026-11-06"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7353.73,
   "date": "2026-11-05",
   "changePct": -4.4,
   "close": 7353.73,
   "closeDate": "2026-11-05"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 216.87,
   "date": "2026-11-05",
   "changePct": -2.9,
   "close": 216.87,
   "closeDate": "2026-11-05"
  }
 }
};
