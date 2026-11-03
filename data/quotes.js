// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-03",
 "quotes": {
  "103590": {
   "price": 53400,
   "date": "2026-11-03",
   "changePct": -6.2,
   "close": 53400,
   "closeDate": "2026-11-03"
  },
  "105560": {
   "price": 151400,
   "date": "2026-11-03",
   "changePct": -1.3,
   "close": 151400,
   "closeDate": "2026-11-03"
  },
  "138040": {
   "price": 130400,
   "date": "2026-11-03",
   "changePct": 0.7,
   "close": 130400,
   "closeDate": "2026-11-03"
  },
  "139130": {
   "price": 15350,
   "date": "2026-11-03",
   "changePct": -0.9,
   "close": 15350,
   "closeDate": "2026-11-03"
  },
  "175330": {
   "price": 25100,
   "date": "2026-11-03",
   "changePct": -1.2,
   "close": 25100,
   "closeDate": "2026-11-03"
  },
  "192400": {
   "price": 27050,
   "date": "2026-11-03",
   "changePct": -0.4,
   "close": 27050,
   "closeDate": "2026-11-03"
  },
  "207940": {
   "price": 1446000,
   "date": "2026-11-03",
   "changePct": 1.7,
   "close": 1446000,
   "closeDate": "2026-11-03"
  },
  "241560": {
   "price": 48950,
   "date": "2026-11-03",
   "changePct": 0,
   "close": 48950,
   "closeDate": "2026-11-03"
  },
  "267250": {
   "price": 140200,
   "date": "2026-11-03",
   "changePct": -3.8,
   "close": 140200,
   "closeDate": "2026-11-03"
  },
  "267260": {
   "price": 437000,
   "date": "2026-11-03",
   "changePct": -2.1,
   "close": 437000,
   "closeDate": "2026-11-03"
  },
  "267270": {
   "price": 80600,
   "date": "2026-11-03",
   "changePct": 0,
   "close": 80600,
   "closeDate": "2026-11-03"
  },
  "278470": {
   "price": 246000,
   "date": "2026-11-03",
   "changePct": -6.6,
   "close": 246000,
   "closeDate": "2026-11-03"
  },
  "298040": {
   "price": 1970000,
   "date": "2026-11-03",
   "changePct": -3.9,
   "close": 1970000,
   "closeDate": "2026-11-03"
  },
  "316140": {
   "price": 30050,
   "date": "2026-11-03",
   "changePct": -1.2,
   "close": 30050,
   "closeDate": "2026-11-03"
  },
  "323410": {
   "price": 19230,
   "date": "2026-11-03",
   "changePct": -2.7,
   "close": 19230,
   "closeDate": "2026-11-03"
  },
  "329180": {
   "price": 285000,
   "date": "2026-11-03",
   "changePct": -1,
   "close": 285000,
   "closeDate": "2026-11-03"
  },
  "361610": {
   "price": 13760,
   "date": "2026-11-03",
   "changePct": -8.3,
   "close": 13760,
   "closeDate": "2026-11-03"
  },
  "005930": {
   "price": 218500,
   "date": "2026-11-03",
   "changePct": -4.6,
   "close": 218500,
   "closeDate": "2026-11-03"
  },
  "055550": {
   "price": 85500,
   "date": "2026-11-03",
   "changePct": -1.5,
   "close": 85500,
   "closeDate": "2026-11-03"
  },
  "000810": {
   "price": 651000,
   "date": "2026-11-03",
   "changePct": 0,
   "close": 651000,
   "closeDate": "2026-11-03"
  },
  "028260": {
   "price": 308000,
   "date": "2026-11-03",
   "changePct": -2.7,
   "close": 308000,
   "closeDate": "2026-11-03"
  },
  "086790": {
   "price": 116000,
   "date": "2026-11-03",
   "changePct": -1.4,
   "close": 116000,
   "closeDate": "2026-11-03"
  },
  "012450": {
   "price": 738000,
   "date": "2026-11-03",
   "changePct": -0.3,
   "close": 738000,
   "closeDate": "2026-11-03"
  },
  "009540": {
   "price": 256000,
   "date": "2026-11-03",
   "changePct": 2.8,
   "close": 256000,
   "closeDate": "2026-11-03"
  },
  "068270": {
   "price": 189800,
   "date": "2026-11-03",
   "changePct": -1.1,
   "close": 189800,
   "closeDate": "2026-11-03"
  },
  "000270": {
   "price": 96300,
   "date": "2026-11-03",
   "changePct": 0.6,
   "close": 96300,
   "closeDate": "2026-11-03"
  },
  "032640": {
   "price": 14530,
   "date": "2026-11-03",
   "changePct": -0.1,
   "close": 14530,
   "closeDate": "2026-11-03"
  },
  "029780": {
   "price": 41150,
   "date": "2026-11-03",
   "changePct": -0.8,
   "close": 41150,
   "closeDate": "2026-11-03"
  },
  "035900": {
   "price": 37350,
   "date": "2026-11-03",
   "changePct": -1.6,
   "close": 37350,
   "closeDate": "2026-11-03"
  },
  "036570": {
   "price": 195300,
   "date": "2026-11-03",
   "changePct": -1.6,
   "close": 195300,
   "closeDate": "2026-11-03"
  },
  "035720": {
   "price": 28750,
   "date": "2026-11-03",
   "changePct": -3.2,
   "close": 28750,
   "closeDate": "2026-11-03"
  },
  "001040": {
   "price": 113300,
   "date": "2026-11-03",
   "changePct": -1.3,
   "close": 113300,
   "closeDate": "2026-11-03"
  },
  "012750": {
   "price": 97500,
   "date": "2026-11-03",
   "changePct": 1.6,
   "close": 97500,
   "closeDate": "2026-11-03"
  },
  "000660": {
   "price": 1388000,
   "date": "2026-11-03",
   "changePct": -5.7,
   "close": 1388000,
   "closeDate": "2026-11-03"
  },
  "001120": {
   "price": 39250,
   "date": "2026-11-03",
   "changePct": -3.6,
   "close": 39250,
   "closeDate": "2026-11-03"
  },
  "005830": {
   "price": 173900,
   "date": "2026-11-03",
   "changePct": -1,
   "close": 173900,
   "closeDate": "2026-11-03"
  },
  "066570": {
   "price": 143900,
   "date": "2026-11-03",
   "changePct": -6.4,
   "close": 143900,
   "closeDate": "2026-11-03"
  },
  "086280": {
   "price": 200000,
   "date": "2026-11-03",
   "changePct": -2.2,
   "close": 200000,
   "closeDate": "2026-11-03"
  },
  "018260": {
   "price": 201500,
   "date": "2026-11-03",
   "changePct": -3.4,
   "close": 201500,
   "closeDate": "2026-11-03"
  },
  "005850": {
   "price": 47450,
   "date": "2026-11-03",
   "changePct": -2.5,
   "close": 47450,
   "closeDate": "2026-11-03"
  },
  "005490": {
   "price": 265000,
   "date": "2026-11-03",
   "changePct": -6.4,
   "close": 265000,
   "closeDate": "2026-11-03"
  },
  "035420": {
   "price": 169000,
   "date": "2026-11-03",
   "changePct": -3.6,
   "close": 169000,
   "closeDate": "2026-11-03"
  },
  "010120": {
   "price": 150800,
   "date": "2026-11-03",
   "changePct": -6.1,
   "close": 150800,
   "closeDate": "2026-11-03"
  },
  "030200": {
   "price": 47350,
   "date": "2026-11-03",
   "changePct": 1.4,
   "close": 47350,
   "closeDate": "2026-11-03"
  },
  "012330": {
   "price": 350500,
   "date": "2026-11-03",
   "changePct": 0.1,
   "close": 350500,
   "closeDate": "2026-11-03"
  },
  "047050": {
   "price": 49900,
   "date": "2026-11-03",
   "changePct": -2.9,
   "close": 49900,
   "closeDate": "2026-11-03"
  },
  "021240": {
   "price": 104000,
   "date": "2026-11-03",
   "changePct": -1,
   "close": 104000,
   "closeDate": "2026-11-03"
  },
  "033780": {
   "price": 192500,
   "date": "2026-11-03",
   "changePct": -0.1,
   "close": 192500,
   "closeDate": "2026-11-03"
  },
  "030190": {
   "price": 17290,
   "date": "2026-11-03",
   "changePct": 0.8,
   "close": 17290,
   "closeDate": "2026-11-03"
  },
  "MSFT": {
   "price": 507.12,
   "date": "2026-11-02",
   "changePct": -2.8,
   "close": 507.12,
   "closeDate": "2026-11-02"
  },
  "V": {
   "price": 425.51,
   "date": "2026-11-02",
   "changePct": 2.9,
   "close": 425.51,
   "closeDate": "2026-11-02"
  },
  "MA": {
   "price": 658.1,
   "date": "2026-11-02",
   "changePct": 3.1,
   "close": 658.1,
   "closeDate": "2026-11-02"
  },
  "GOOGL": {
   "price": 278.99,
   "date": "2026-11-02",
   "changePct": -0.3,
   "close": 278.99,
   "closeDate": "2026-11-02"
  },
  "COST": {
   "price": 1040.55,
   "date": "2026-11-02",
   "changePct": 2.8,
   "close": 1040.55,
   "closeDate": "2026-11-02"
  },
  "NVDA": {
   "price": 202.06,
   "date": "2026-11-02",
   "changePct": -1.3,
   "close": 202.06,
   "closeDate": "2026-11-02"
  },
  "META": {
   "price": 606.73,
   "date": "2026-11-02",
   "changePct": -1.3,
   "close": 606.73,
   "closeDate": "2026-11-02"
  },
  "AVGO": {
   "price": 322.23,
   "date": "2026-11-02",
   "changePct": -1.2,
   "close": 322.23,
   "closeDate": "2026-11-02"
  },
  "AMZN": {
   "price": 245.63,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 245.63,
   "closeDate": "2026-11-02"
  },
  "TSM": {
   "price": 398.63,
   "date": "2026-11-02",
   "changePct": -1.8,
   "close": 398.63,
   "closeDate": "2026-11-02"
  },
  "UBER": {
   "price": 66.71,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 66.71,
   "closeDate": "2026-11-02"
  },
  "GM": {
   "price": 89.94,
   "date": "2026-11-02",
   "changePct": 2.9,
   "close": 89.94,
   "closeDate": "2026-11-02"
  },
  "VZ": {
   "price": 45.05,
   "date": "2026-11-02",
   "changePct": 0.7,
   "close": 45.05,
   "closeDate": "2026-11-02"
  },
  "C": {
   "price": 123.1,
   "date": "2026-11-02",
   "changePct": 0.4,
   "close": 123.1,
   "closeDate": "2026-11-02"
  },
  "DUK": {
   "price": 128.38,
   "date": "2026-11-02",
   "changePct": 0.8,
   "close": 128.38,
   "closeDate": "2026-11-02"
  },
  "KO": {
   "price": 95.83,
   "date": "2026-11-02",
   "changePct": 1.9,
   "close": 95.83,
   "closeDate": "2026-11-02"
  },
  "JNJ": {
   "price": 270.56,
   "date": "2026-11-02",
   "changePct": -1,
   "close": 270.56,
   "closeDate": "2026-11-02"
  },
  "LLY": {
   "price": 1410.99,
   "date": "2026-11-02",
   "changePct": -0.5,
   "close": 1410.99,
   "closeDate": "2026-11-02"
  },
  "CI": {
   "price": 295.19,
   "date": "2026-11-02",
   "changePct": -1,
   "close": 295.19,
   "closeDate": "2026-11-02"
  },
  "NOW": {
   "price": 106.01,
   "date": "2026-11-02",
   "changePct": 0.8,
   "close": 106.01,
   "closeDate": "2026-11-02"
  },
  "TSLA": {
   "price": 403.82,
   "date": "2026-11-02",
   "changePct": 1,
   "close": 403.82,
   "closeDate": "2026-11-02"
  },
  "MDLZ": {
   "price": 66.38,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 66.38,
   "closeDate": "2026-11-02"
  },
  "AAPL": {
   "price": 338.32,
   "date": "2026-11-02",
   "changePct": -1.8,
   "close": 338.32,
   "closeDate": "2026-11-02"
  },
  "MU": {
   "price": 833.59,
   "date": "2026-11-02",
   "changePct": -5.8,
   "close": 833.59,
   "closeDate": "2026-11-02"
  },
  "MDT": {
   "price": 99.29,
   "date": "2026-11-02",
   "changePct": 2.8,
   "close": 99.29,
   "closeDate": "2026-11-02"
  },
  "IREN": {
   "price": 22.02,
   "date": "2026-11-02",
   "changePct": -8.1,
   "close": 22.02,
   "closeDate": "2026-11-02"
  },
  "UNH": {
   "price": 400.44,
   "date": "2026-11-02",
   "changePct": -1.6,
   "close": 400.44,
   "closeDate": "2026-11-02"
  },
  "DVN": {
   "price": 48.63,
   "date": "2026-11-02",
   "changePct": -6.7,
   "close": 48.63,
   "closeDate": "2026-11-02"
  },
  "GS": {
   "price": 898.72,
   "date": "2026-11-02",
   "changePct": 0.5,
   "close": 898.72,
   "closeDate": "2026-11-02"
  },
  "AMP": {
   "price": 504.31,
   "date": "2026-11-02",
   "changePct": 2.7,
   "close": 504.31,
   "closeDate": "2026-11-02"
  },
  "PNC": {
   "price": 231.66,
   "date": "2026-11-02",
   "changePct": 1.7,
   "close": 231.66,
   "closeDate": "2026-11-02"
  },
  "MTB": {
   "price": 224.43,
   "date": "2026-11-02",
   "changePct": 1.7,
   "close": 224.43,
   "closeDate": "2026-11-02"
  },
  "SO": {
   "price": 94.61,
   "date": "2026-11-02",
   "changePct": 1,
   "close": 94.61,
   "closeDate": "2026-11-02"
  },
  "WEC": {
   "price": 116.9,
   "date": "2026-11-02",
   "changePct": 0.7,
   "close": 116.9,
   "closeDate": "2026-11-02"
  },
  "TJX": {
   "price": 141,
   "date": "2026-11-02",
   "changePct": 0.5,
   "close": 141,
   "closeDate": "2026-11-02"
  },
  "ANET": {
   "price": 164.14,
   "date": "2026-11-02",
   "changePct": -2.8,
   "close": 164.14,
   "closeDate": "2026-11-02"
  },
  "GD": {
   "price": 373.46,
   "date": "2026-11-02",
   "changePct": 0.2,
   "close": 373.46,
   "closeDate": "2026-11-02"
  },
  "LMT": {
   "price": 643.15,
   "date": "2026-11-02",
   "changePct": 1,
   "close": 643.15,
   "closeDate": "2026-11-02"
  },
  "CB": {
   "price": 368.98,
   "date": "2026-11-02",
   "changePct": 1.3,
   "close": 368.98,
   "closeDate": "2026-11-02"
  },
  "GILD": {
   "price": 170.33,
   "date": "2026-11-02",
   "changePct": -0.2,
   "close": 170.33,
   "closeDate": "2026-11-02"
  },
  "BRK.B": {
   "price": 556.11,
   "date": "2026-11-02",
   "changePct": 2.5,
   "close": 556.11,
   "closeDate": "2026-11-02"
  },
  "TMO": {
   "price": 682.65,
   "date": "2026-11-02",
   "changePct": -2.1,
   "close": 682.65,
   "closeDate": "2026-11-02"
  },
  "ECL": {
   "price": 308.38,
   "date": "2026-11-02",
   "changePct": 1.8,
   "close": 308.38,
   "closeDate": "2026-11-02"
  },
  "MSI": {
   "price": 487.31,
   "date": "2026-11-02",
   "changePct": -0.9,
   "close": 487.31,
   "closeDate": "2026-11-02"
  },
  "MSCI": {
   "price": 637.21,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 637.21,
   "closeDate": "2026-11-02"
  },
  "RSG": {
   "price": 245.97,
   "date": "2026-11-02",
   "changePct": 0.8,
   "close": 245.97,
   "closeDate": "2026-11-02"
  },
  "CTAS": {
   "price": 224.77,
   "date": "2026-11-02",
   "changePct": 2.3,
   "close": 224.77,
   "closeDate": "2026-11-02"
  },
  "ORLY": {
   "price": 90.7,
   "date": "2026-11-02",
   "changePct": 2.9,
   "close": 90.7,
   "closeDate": "2026-11-02"
  },
  "YUM": {
   "price": 157.6,
   "date": "2026-11-02",
   "changePct": 1.4,
   "close": 157.6,
   "closeDate": "2026-11-02"
  },
  "ADP": {
   "price": 298.78,
   "date": "2026-11-02",
   "changePct": 1.7,
   "close": 298.78,
   "closeDate": "2026-11-02"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5626.08,
   "date": "2026-11-03",
   "changePct": -4,
   "close": 5626.08,
   "closeDate": "2026-11-03"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7541.4,
   "date": "2026-11-02",
   "changePct": -0.5,
   "close": 7541.4,
   "closeDate": "2026-11-02"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 219.98,
   "date": "2026-11-02",
   "changePct": 0.8,
   "close": 219.98,
   "closeDate": "2026-11-02"
  }
 }
};
