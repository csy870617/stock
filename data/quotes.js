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
  "086790": {
   "price": 120800,
   "date": "2026-11-05",
   "changePct": 3.2,
   "close": 120800,
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
  "MSFT": {
   "price": 555.8,
   "date": "2026-11-04",
   "changePct": 6.7,
   "close": 555.8,
   "closeDate": "2026-11-04"
  },
  "V": {
   "price": 436.57,
   "date": "2026-11-04",
   "changePct": 3.8,
   "close": 436.57,
   "closeDate": "2026-11-04"
  },
  "MA": {
   "price": 672.68,
   "date": "2026-11-04",
   "changePct": 3.9,
   "close": 672.68,
   "closeDate": "2026-11-04"
  },
  "GOOGL": {
   "price": 288.93,
   "date": "2026-11-04",
   "changePct": 3.2,
   "close": 288.93,
   "closeDate": "2026-11-04"
  },
  "COST": {
   "price": 1046.47,
   "date": "2026-11-04",
   "changePct": 2.7,
   "close": 1046.47,
   "closeDate": "2026-11-04"
  },
  "NVDA": {
   "price": 200.13,
   "date": "2026-11-04",
   "changePct": -3.2,
   "close": 200.13,
   "closeDate": "2026-11-04"
  },
  "META": {
   "price": 630,
   "date": "2026-11-04",
   "changePct": 1.4,
   "close": 630,
   "closeDate": "2026-11-04"
  },
  "AVGO": {
   "price": 325.48,
   "date": "2026-11-04",
   "changePct": -2,
   "close": 325.48,
   "closeDate": "2026-11-04"
  },
  "TSM": {
   "price": 395.75,
   "date": "2026-11-04",
   "changePct": -2.2,
   "close": 395.75,
   "closeDate": "2026-11-04"
  },
  "UBER": {
   "price": 69.87,
   "date": "2026-11-04",
   "changePct": 4.9,
   "close": 69.87,
   "closeDate": "2026-11-04"
  },
  "GM": {
   "price": 92.43,
   "date": "2026-11-04",
   "changePct": 4.6,
   "close": 92.43,
   "closeDate": "2026-11-04"
  },
  "VZ": {
   "price": 46.17,
   "date": "2026-11-04",
   "changePct": 2.1,
   "close": 46.17,
   "closeDate": "2026-11-04"
  },
  "C": {
   "price": 124.74,
   "date": "2026-11-04",
   "changePct": 1.7,
   "close": 124.74,
   "closeDate": "2026-11-04"
  },
  "DUK": {
   "price": 129.59,
   "date": "2026-11-04",
   "changePct": 2.4,
   "close": 129.59,
   "closeDate": "2026-11-04"
  },
  "KO": {
   "price": 95.8,
   "date": "2026-11-04",
   "changePct": 1.1,
   "close": 95.8,
   "closeDate": "2026-11-04"
  },
  "JNJ": {
   "price": 276.32,
   "date": "2026-11-04",
   "changePct": 3.8,
   "close": 276.32,
   "closeDate": "2026-11-04"
  },
  "LLY": {
   "price": 1417.99,
   "date": "2026-11-04",
   "changePct": 0.6,
   "close": 1417.99,
   "closeDate": "2026-11-04"
  },
  "CI": {
   "price": 305.41,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 305.41,
   "closeDate": "2026-11-04"
  },
  "TSLA": {
   "price": 385.19,
   "date": "2026-11-04",
   "changePct": -3.3,
   "close": 385.19,
   "closeDate": "2026-11-04"
  },
  "MDLZ": {
   "price": 67.38,
   "date": "2026-11-04",
   "changePct": 3.5,
   "close": 67.38,
   "closeDate": "2026-11-04"
  },
  "AAPL": {
   "price": 349.51,
   "date": "2026-11-04",
   "changePct": 5.3,
   "close": 349.51,
   "closeDate": "2026-11-04"
  },
  "MU": {
   "price": 795.23,
   "date": "2026-11-04",
   "changePct": -7,
   "close": 795.23,
   "closeDate": "2026-11-04"
  },
  "MDT": {
   "price": 104.96,
   "date": "2026-11-04",
   "changePct": 6.1,
   "close": 104.96,
   "closeDate": "2026-11-04"
  },
  "IREN": {
   "price": 21.71,
   "date": "2026-11-04",
   "changePct": -11.2,
   "close": 21.71,
   "closeDate": "2026-11-04"
  },
  "UNH": {
   "price": 409.38,
   "date": "2026-11-04",
   "changePct": 1.2,
   "close": 409.38,
   "closeDate": "2026-11-04"
  },
  "DVN": {
   "price": 44.12,
   "date": "2026-11-04",
   "changePct": -7.3,
   "close": 44.12,
   "closeDate": "2026-11-04"
  },
  "GS": {
   "price": 928,
   "date": "2026-11-04",
   "changePct": 3.6,
   "close": 928,
   "closeDate": "2026-11-04"
  },
  "AMP": {
   "price": 527.41,
   "date": "2026-11-04",
   "changePct": 4.5,
   "close": 527.41,
   "closeDate": "2026-11-04"
  },
  "PNC": {
   "price": 233.45,
   "date": "2026-11-04",
   "changePct": 1.8,
   "close": 233.45,
   "closeDate": "2026-11-04"
  },
  "MTB": {
   "price": 224.64,
   "date": "2026-11-04",
   "changePct": 1.2,
   "close": 224.64,
   "closeDate": "2026-11-04"
  },
  "SO": {
   "price": 93.12,
   "date": "2026-11-04",
   "changePct": -0.7,
   "close": 93.12,
   "closeDate": "2026-11-04"
  },
  "WEC": {
   "price": 118.11,
   "date": "2026-11-04",
   "changePct": 2.3,
   "close": 118.11,
   "closeDate": "2026-11-04"
  },
  "TJX": {
   "price": 144.76,
   "date": "2026-11-04",
   "changePct": 5.2,
   "close": 144.76,
   "closeDate": "2026-11-04"
  },
  "ANET": {
   "price": 178.48,
   "date": "2026-11-04",
   "changePct": 5,
   "close": 178.48,
   "closeDate": "2026-11-04"
  },
  "GD": {
   "price": 364.87,
   "date": "2026-11-04",
   "changePct": -2.6,
   "close": 364.87,
   "closeDate": "2026-11-04"
  },
  "LMT": {
   "price": 595.04,
   "date": "2026-11-04",
   "changePct": -6.9,
   "close": 595.04,
   "closeDate": "2026-11-04"
  },
  "CB": {
   "price": 374.17,
   "date": "2026-11-04",
   "changePct": 2.1,
   "close": 374.17,
   "closeDate": "2026-11-04"
  },
  "GILD": {
   "price": 174.48,
   "date": "2026-11-04",
   "changePct": 4.2,
   "close": 174.48,
   "closeDate": "2026-11-04"
  },
  "BRK.B": {
   "price": 579.09,
   "date": "2026-11-04",
   "changePct": 4,
   "close": 579.09,
   "closeDate": "2026-11-04"
  },
  "TMO": {
   "price": 706.16,
   "date": "2026-11-04",
   "changePct": 1.1,
   "close": 706.16,
   "closeDate": "2026-11-04"
  },
  "ECL": {
   "price": 315.01,
   "date": "2026-11-04",
   "changePct": 3.4,
   "close": 315.01,
   "closeDate": "2026-11-04"
  },
  "MSI": {
   "price": 496.99,
   "date": "2026-11-04",
   "changePct": 1.2,
   "close": 496.99,
   "closeDate": "2026-11-04"
  },
  "MSCI": {
   "price": 674.3,
   "date": "2026-11-04",
   "changePct": 5.4,
   "close": 674.3,
   "closeDate": "2026-11-04"
  },
  "RSG": {
   "price": 245.41,
   "date": "2026-11-04",
   "changePct": 1,
   "close": 245.41,
   "closeDate": "2026-11-04"
  },
  "CTAS": {
   "price": 229.03,
   "date": "2026-11-04",
   "changePct": 2.4,
   "close": 229.03,
   "closeDate": "2026-11-04"
  },
  "ORLY": {
   "price": 92.34,
   "date": "2026-11-04",
   "changePct": 2.6,
   "close": 92.34,
   "closeDate": "2026-11-04"
  },
  "YUM": {
   "price": 166.31,
   "date": "2026-11-04",
   "changePct": 5.9,
   "close": 166.31,
   "closeDate": "2026-11-04"
  },
  "ADP": {
   "price": 303.54,
   "date": "2026-11-04",
   "changePct": 2.5,
   "close": 303.54,
   "closeDate": "2026-11-04"
  },
  "FAST": {
   "price": 53.21,
   "date": "2026-11-04",
   "changePct": 1.7,
   "close": 53.21,
   "closeDate": "2026-11-04"
  },
  "VRT": {
   "price": 205.55,
   "date": "2026-11-04",
   "changePct": -12.9,
   "close": 205.55,
   "closeDate": "2026-11-04"
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
   "price": 7688.62,
   "date": "2026-11-04",
   "changePct": 1.6,
   "close": 7688.62,
   "closeDate": "2026-11-04"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 223.33,
   "date": "2026-11-04",
   "changePct": 1.9,
   "close": 223.33,
   "closeDate": "2026-11-04"
  }
 }
};
