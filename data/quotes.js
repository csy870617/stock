// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-05",
 "quotes": {
  "103590": {
   "price": 49000,
   "date": "2026-11-05",
   "changePct": -10.9,
   "close": 49000,
   "closeDate": "2026-11-05"
  },
  "105560": {
   "price": 157000,
   "date": "2026-11-05",
   "changePct": 3.6,
   "close": 157000,
   "closeDate": "2026-11-05"
  },
  "138040": {
   "price": 135000,
   "date": "2026-11-05",
   "changePct": 2.1,
   "close": 135000,
   "closeDate": "2026-11-05"
  },
  "139130": {
   "price": 15580,
   "date": "2026-11-05",
   "changePct": 0.7,
   "close": 15580,
   "closeDate": "2026-11-05"
  },
  "175330": {
   "price": 27000,
   "date": "2026-11-05",
   "changePct": 4.7,
   "close": 27000,
   "closeDate": "2026-11-05"
  },
  "192400": {
   "price": 27250,
   "date": "2026-11-05",
   "changePct": 0.9,
   "close": 27250,
   "closeDate": "2026-11-05"
  },
  "207940": {
   "price": 1520000,
   "date": "2026-11-05",
   "changePct": 1.7,
   "close": 1520000,
   "closeDate": "2026-11-05"
  },
  "241560": {
   "price": 51700,
   "date": "2026-11-05",
   "changePct": 4.8,
   "close": 51700,
   "closeDate": "2026-11-05"
  },
  "267250": {
   "price": 129900,
   "date": "2026-11-05",
   "changePct": -5.6,
   "close": 129900,
   "closeDate": "2026-11-05"
  },
  "267260": {
   "price": 401500,
   "date": "2026-11-05",
   "changePct": -8.4,
   "close": 401500,
   "closeDate": "2026-11-05"
  },
  "267270": {
   "price": 82900,
   "date": "2026-11-05",
   "changePct": 0.5,
   "close": 82900,
   "closeDate": "2026-11-05"
  },
  "278470": {
   "price": 269000,
   "date": "2026-11-05",
   "changePct": 5.9,
   "close": 269000,
   "closeDate": "2026-11-05"
  },
  "282330": {
   "price": 150200,
   "date": "2026-11-05",
   "changePct": 2.1,
   "close": 150200,
   "closeDate": "2026-11-05"
  },
  "298040": {
   "price": 1791000,
   "date": "2026-11-05",
   "changePct": -12.6,
   "close": 1791000,
   "closeDate": "2026-11-05"
  },
  "316140": {
   "price": 31950,
   "date": "2026-11-05",
   "changePct": 5.3,
   "close": 31950,
   "closeDate": "2026-11-05"
  },
  "323410": {
   "price": 20800,
   "date": "2026-11-05",
   "changePct": 3.2,
   "close": 20800,
   "closeDate": "2026-11-05"
  },
  "329180": {
   "price": 271000,
   "date": "2026-11-05",
   "changePct": -4.4,
   "close": 271000,
   "closeDate": "2026-11-05"
  },
  "361610": {
   "price": 13350,
   "date": "2026-11-05",
   "changePct": -6.8,
   "close": 13350,
   "closeDate": "2026-11-05"
  },
  "005930": {
   "price": 201500,
   "date": "2026-11-05",
   "changePct": -7.6,
   "close": 201500,
   "closeDate": "2026-11-05"
  },
  "055550": {
   "price": 88700,
   "date": "2026-11-05",
   "changePct": 2.8,
   "close": 88700,
   "closeDate": "2026-11-05"
  },
  "000810": {
   "price": 652000,
   "date": "2026-11-05",
   "changePct": -0.2,
   "close": 652000,
   "closeDate": "2026-11-05"
  },
  "012450": {
   "price": 680000,
   "date": "2026-11-05",
   "changePct": -7.5,
   "close": 680000,
   "closeDate": "2026-11-05"
  },
  "009540": {
   "price": 246000,
   "date": "2026-11-05",
   "changePct": -2.6,
   "close": 246000,
   "closeDate": "2026-11-05"
  },
  "068270": {
   "price": 215000,
   "date": "2026-11-05",
   "changePct": 7.5,
   "close": 215000,
   "closeDate": "2026-11-05"
  },
  "000270": {
   "price": 100800,
   "date": "2026-11-05",
   "changePct": 5.2,
   "close": 100800,
   "closeDate": "2026-11-05"
  },
  "032640": {
   "price": 15930,
   "date": "2026-11-05",
   "changePct": 2.7,
   "close": 15930,
   "closeDate": "2026-11-05"
  },
  "029780": {
   "price": 41850,
   "date": "2026-11-05",
   "changePct": 1.3,
   "close": 41850,
   "closeDate": "2026-11-05"
  },
  "035900": {
   "price": 39500,
   "date": "2026-11-05",
   "changePct": 4.5,
   "close": 39500,
   "closeDate": "2026-11-05"
  },
  "036570": {
   "price": 209500,
   "date": "2026-11-05",
   "changePct": 5.4,
   "close": 209500,
   "closeDate": "2026-11-05"
  },
  "035720": {
   "price": 32200,
   "date": "2026-11-05",
   "changePct": 10.7,
   "close": 32200,
   "closeDate": "2026-11-05"
  },
  "001040": {
   "price": 117300,
   "date": "2026-11-05",
   "changePct": 2.6,
   "close": 117300,
   "closeDate": "2026-11-05"
  },
  "012750": {
   "price": 98700,
   "date": "2026-11-05",
   "changePct": 0.4,
   "close": 98700,
   "closeDate": "2026-11-05"
  },
  "000660": {
   "price": 1264000,
   "date": "2026-11-05",
   "changePct": -9.5,
   "close": 1264000,
   "closeDate": "2026-11-05"
  },
  "086790": {
   "price": 120800,
   "date": "2026-11-05",
   "changePct": 3.2,
   "close": 120800,
   "closeDate": "2026-11-05"
  },
  "001120": {
   "price": 36350,
   "date": "2026-11-05",
   "changePct": -11.6,
   "close": 36350,
   "closeDate": "2026-11-05"
  },
  "005830": {
   "price": 179200,
   "date": "2026-11-05",
   "changePct": 3.2,
   "close": 179200,
   "closeDate": "2026-11-05"
  },
  "066570": {
   "price": 142800,
   "date": "2026-11-05",
   "changePct": -2.4,
   "close": 142800,
   "closeDate": "2026-11-05"
  },
  "086280": {
   "price": 201500,
   "date": "2026-11-05",
   "changePct": -0.2,
   "close": 201500,
   "closeDate": "2026-11-05"
  },
  "018260": {
   "price": 205000,
   "date": "2026-11-05",
   "changePct": 0.2,
   "close": 205000,
   "closeDate": "2026-11-05"
  },
  "005850": {
   "price": 48950,
   "date": "2026-11-05",
   "changePct": 2.1,
   "close": 48950,
   "closeDate": "2026-11-05"
  },
  "005490": {
   "price": 273500,
   "date": "2026-11-05",
   "changePct": -0.9,
   "close": 273500,
   "closeDate": "2026-11-05"
  },
  "035420": {
   "price": 184900,
   "date": "2026-11-05",
   "changePct": 8.3,
   "close": 184900,
   "closeDate": "2026-11-05"
  },
  "010120": {
   "price": 129800,
   "date": "2026-11-05",
   "changePct": -13.9,
   "close": 129800,
   "closeDate": "2026-11-05"
  },
  "030200": {
   "price": 51800,
   "date": "2026-11-05",
   "changePct": 5.5,
   "close": 51800,
   "closeDate": "2026-11-05"
  },
  "012330": {
   "price": 364000,
   "date": "2026-11-05",
   "changePct": 2.5,
   "close": 364000,
   "closeDate": "2026-11-05"
  },
  "047050": {
   "price": 50300,
   "date": "2026-11-05",
   "changePct": -3.6,
   "close": 50300,
   "closeDate": "2026-11-05"
  },
  "021240": {
   "price": 109800,
   "date": "2026-11-05",
   "changePct": 6,
   "close": 109800,
   "closeDate": "2026-11-05"
  },
  "033780": {
   "price": 194200,
   "date": "2026-11-05",
   "changePct": 1.1,
   "close": 194200,
   "closeDate": "2026-11-05"
  },
  "030190": {
   "price": 17870,
   "date": "2026-11-05",
   "changePct": 4.6,
   "close": 17870,
   "closeDate": "2026-11-05"
  },
  "042700": {
   "price": 169100,
   "date": "2026-11-05",
   "changePct": -9.1,
   "close": 169100,
   "closeDate": "2026-11-05"
  },
  "064400": {
   "price": 72600,
   "date": "2026-11-05",
   "changePct": -1,
   "close": 72600,
   "closeDate": "2026-11-05"
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
   "price": 5383.8,
   "date": "2026-11-05",
   "changePct": -5.3,
   "close": 5383.8,
   "closeDate": "2026-11-05"
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
