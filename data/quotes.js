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
   "price": 43050,
   "date": "2026-11-06",
   "changePct": -12.1,
   "close": 43050,
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
   "price": 132000,
   "date": "2026-11-06",
   "changePct": -2.2,
   "close": 132000,
   "closeDate": "2026-11-06"
  },
  "139130": {
   "price": 15290,
   "date": "2026-11-06",
   "changePct": -1.9,
   "close": 15290,
   "closeDate": "2026-11-06"
  },
  "175330": {
   "price": 27050,
   "date": "2026-11-06",
   "changePct": 0.2,
   "close": 27050,
   "closeDate": "2026-11-06"
  },
  "192400": {
   "price": 27100,
   "date": "2026-11-06",
   "changePct": -0.6,
   "close": 27100,
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
   "price": 51900,
   "date": "2026-11-06",
   "changePct": 0.4,
   "close": 51900,
   "closeDate": "2026-11-06"
  },
  "267250": {
   "price": 124600,
   "date": "2026-11-06",
   "changePct": -4.1,
   "close": 124600,
   "closeDate": "2026-11-06"
  },
  "267260": {
   "price": 365000,
   "date": "2026-11-06",
   "changePct": -9.1,
   "close": 365000,
   "closeDate": "2026-11-06"
  },
  "267270": {
   "price": 79900,
   "date": "2026-11-06",
   "changePct": -3.6,
   "close": 79900,
   "closeDate": "2026-11-06"
  },
  "278470": {
   "price": 255000,
   "date": "2026-11-06",
   "changePct": -5.2,
   "close": 255000,
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
   "price": 1563000,
   "date": "2026-11-06",
   "changePct": -12.7,
   "close": 1563000,
   "closeDate": "2026-11-06"
  },
  "316140": {
   "price": 31550,
   "date": "2026-11-06",
   "changePct": -1.3,
   "close": 31550,
   "closeDate": "2026-11-06"
  },
  "323410": {
   "price": 20700,
   "date": "2026-11-06",
   "changePct": -0.5,
   "close": 20700,
   "closeDate": "2026-11-06"
  },
  "329180": {
   "price": 262500,
   "date": "2026-11-06",
   "changePct": -3.1,
   "close": 262500,
   "closeDate": "2026-11-06"
  },
  "361610": {
   "price": 12660,
   "date": "2026-11-06",
   "changePct": -5.2,
   "close": 12660,
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
   "price": 86600,
   "date": "2026-11-06",
   "changePct": -2.4,
   "close": 86600,
   "closeDate": "2026-11-06"
  },
  "000810": {
   "price": 603000,
   "date": "2026-11-06",
   "changePct": -7.5,
   "close": 603000,
   "closeDate": "2026-11-06"
  },
  "012450": {
   "price": 659000,
   "date": "2026-11-06",
   "changePct": -3.1,
   "close": 659000,
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
   "price": 210500,
   "date": "2026-11-06",
   "changePct": -2.1,
   "close": 210500,
   "closeDate": "2026-11-06"
  },
  "000270": {
   "price": 99600,
   "date": "2026-11-06",
   "changePct": -1.2,
   "close": 99600,
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
   "price": 208000,
   "date": "2026-11-06",
   "changePct": -0.7,
   "close": 208000,
   "closeDate": "2026-11-06"
  },
  "035720": {
   "price": 32100,
   "date": "2026-11-06",
   "changePct": -0.3,
   "close": 32100,
   "closeDate": "2026-11-06"
  },
  "001040": {
   "price": 114400,
   "date": "2026-11-06",
   "changePct": -2.5,
   "close": 114400,
   "closeDate": "2026-11-06"
  },
  "012750": {
   "price": 98600,
   "date": "2026-11-06",
   "changePct": -0.1,
   "close": 98600,
   "closeDate": "2026-11-06"
  },
  "000660": {
   "price": 1128000,
   "date": "2026-11-06",
   "changePct": -10.8,
   "close": 1128000,
   "closeDate": "2026-11-06"
  },
  "086790": {
   "price": 117900,
   "date": "2026-11-06",
   "changePct": -2.4,
   "close": 117900,
   "closeDate": "2026-11-06"
  },
  "001120": {
   "price": 34550,
   "date": "2026-11-06",
   "changePct": -5,
   "close": 34550,
   "closeDate": "2026-11-06"
  },
  "005830": {
   "price": 170500,
   "date": "2026-11-06",
   "changePct": -4.9,
   "close": 170500,
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
   "price": 196000,
   "date": "2026-11-06",
   "changePct": -2.7,
   "close": 196000,
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
   "price": 47150,
   "date": "2026-11-06",
   "changePct": -3.7,
   "close": 47150,
   "closeDate": "2026-11-06"
  },
  "005490": {
   "price": 264000,
   "date": "2026-11-06",
   "changePct": -3.5,
   "close": 264000,
   "closeDate": "2026-11-06"
  },
  "035420": {
   "price": 189900,
   "date": "2026-11-06",
   "changePct": 2.7,
   "close": 189900,
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
   "price": 53100,
   "date": "2026-11-06",
   "changePct": 2.5,
   "close": 53100,
   "closeDate": "2026-11-06"
  },
  "012330": {
   "price": 349500,
   "date": "2026-11-06",
   "changePct": -4,
   "close": 349500,
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
   "price": 108100,
   "date": "2026-11-06",
   "changePct": -1.5,
   "close": 108100,
   "closeDate": "2026-11-06"
  },
  "033780": {
   "price": 189700,
   "date": "2026-11-06",
   "changePct": -2.3,
   "close": 189700,
   "closeDate": "2026-11-06"
  },
  "030190": {
   "price": 17970,
   "date": "2026-11-06",
   "changePct": 0.6,
   "close": 17970,
   "closeDate": "2026-11-06"
  },
  "042700": {
   "price": 161600,
   "date": "2026-11-06",
   "changePct": -4.4,
   "close": 161600,
   "closeDate": "2026-11-06"
  },
  "064400": {
   "price": 74100,
   "date": "2026-11-06",
   "changePct": 2.1,
   "close": 74100,
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
  "MSCI": {
   "price": 655.91,
   "date": "2026-11-05",
   "changePct": -2.7,
   "close": 655.91,
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
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5050.29,
   "date": "2026-11-06",
   "changePct": -6.2,
   "close": 5050.29,
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
