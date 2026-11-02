// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-02",
 "quotes": {
  "103590": {
   "price": 56900,
   "date": "2026-11-02",
   "changePct": 8,
   "close": 56900,
   "closeDate": "2026-11-02"
  },
  "105560": {
   "price": 153400,
   "date": "2026-11-02",
   "changePct": -1.4,
   "close": 153400,
   "closeDate": "2026-11-02"
  },
  "138040": {
   "price": 129500,
   "date": "2026-11-02",
   "changePct": -2.8,
   "close": 129500,
   "closeDate": "2026-11-02"
  },
  "139130": {
   "price": 15490,
   "date": "2026-11-02",
   "changePct": -1.8,
   "close": 15490,
   "closeDate": "2026-11-02"
  },
  "175330": {
   "price": 25400,
   "date": "2026-11-02",
   "changePct": -1.9,
   "close": 25400,
   "closeDate": "2026-11-02"
  },
  "192400": {
   "price": 27150,
   "date": "2026-11-02",
   "changePct": -1.5,
   "close": 27150,
   "closeDate": "2026-11-02"
  },
  "207940": {
   "price": 1422000,
   "date": "2026-11-02",
   "changePct": -4.4,
   "close": 1422000,
   "closeDate": "2026-11-02"
  },
  "241560": {
   "price": 48950,
   "date": "2026-11-02",
   "changePct": 0.9,
   "close": 48950,
   "closeDate": "2026-11-02"
  },
  "267250": {
   "price": 145700,
   "date": "2026-11-02",
   "changePct": 3.5,
   "close": 145700,
   "closeDate": "2026-11-02"
  },
  "267260": {
   "price": 446500,
   "date": "2026-11-02",
   "changePct": 5.2,
   "close": 446500,
   "closeDate": "2026-11-02"
  },
  "267270": {
   "price": 80600,
   "date": "2026-11-02",
   "changePct": 4.4,
   "close": 80600,
   "closeDate": "2026-11-02"
  },
  "278470": {
   "price": 263500,
   "date": "2026-11-02",
   "changePct": 1,
   "close": 263500,
   "closeDate": "2026-11-02"
  },
  "298040": {
   "price": 2050000,
   "date": "2026-11-02",
   "changePct": 13.3,
   "close": 2050000,
   "closeDate": "2026-11-02"
  },
  "316140": {
   "price": 30400,
   "date": "2026-11-02",
   "changePct": -1.3,
   "close": 30400,
   "closeDate": "2026-11-02"
  },
  "323410": {
   "price": 19770,
   "date": "2026-11-02",
   "changePct": -0.8,
   "close": 19770,
   "closeDate": "2026-11-02"
  },
  "329180": {
   "price": 288000,
   "date": "2026-11-02",
   "changePct": 5.1,
   "close": 288000,
   "closeDate": "2026-11-02"
  },
  "361610": {
   "price": 15000,
   "date": "2026-11-02",
   "changePct": 0.2,
   "close": 15000,
   "closeDate": "2026-11-02"
  },
  "005930": {
   "price": 229000,
   "date": "2026-11-02",
   "changePct": 1.8,
   "close": 229000,
   "closeDate": "2026-11-02"
  },
  "055550": {
   "price": 86800,
   "date": "2026-11-02",
   "changePct": -3.1,
   "close": 86800,
   "closeDate": "2026-11-02"
  },
  "000810": {
   "price": 651000,
   "date": "2026-11-02",
   "changePct": -1.2,
   "close": 651000,
   "closeDate": "2026-11-02"
  },
  "028260": {
   "price": 316500,
   "date": "2026-11-02",
   "changePct": 1.4,
   "close": 316500,
   "closeDate": "2026-11-02"
  },
  "086790": {
   "price": 117700,
   "date": "2026-11-02",
   "changePct": -2.3,
   "close": 117700,
   "closeDate": "2026-11-02"
  },
  "012450": {
   "price": 740000,
   "date": "2026-11-02",
   "changePct": 6.3,
   "close": 740000,
   "closeDate": "2026-11-02"
  },
  "009540": {
   "price": 249000,
   "date": "2026-11-02",
   "changePct": 7.6,
   "close": 249000,
   "closeDate": "2026-11-02"
  },
  "068270": {
   "price": 192000,
   "date": "2026-11-02",
   "changePct": 0.2,
   "close": 192000,
   "closeDate": "2026-11-02"
  },
  "000270": {
   "price": 95700,
   "date": "2026-11-02",
   "changePct": 0.1,
   "close": 95700,
   "closeDate": "2026-11-02"
  },
  "032640": {
   "price": 14540,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 14540,
   "closeDate": "2026-11-02"
  },
  "029780": {
   "price": 41500,
   "date": "2026-11-02",
   "changePct": -2.2,
   "close": 41500,
   "closeDate": "2026-11-02"
  },
  "035900": {
   "price": 37950,
   "date": "2026-11-02",
   "changePct": -3.7,
   "close": 37950,
   "closeDate": "2026-11-02"
  },
  "036570": {
   "price": 198500,
   "date": "2026-11-02",
   "changePct": -1.5,
   "close": 198500,
   "closeDate": "2026-11-02"
  },
  "035720": {
   "price": 29700,
   "date": "2026-11-02",
   "changePct": 0.8,
   "close": 29700,
   "closeDate": "2026-11-02"
  },
  "001040": {
   "price": 114800,
   "date": "2026-11-02",
   "changePct": 3.4,
   "close": 114800,
   "closeDate": "2026-11-02"
  },
  "012750": {
   "price": 96000,
   "date": "2026-11-02",
   "changePct": -1.7,
   "close": 96000,
   "closeDate": "2026-11-02"
  },
  "000660": {
   "price": 1472000,
   "date": "2026-11-02",
   "changePct": 3.8,
   "close": 1472000,
   "closeDate": "2026-11-02"
  },
  "001120": {
   "price": 40700,
   "date": "2026-11-02",
   "changePct": 1,
   "close": 40700,
   "closeDate": "2026-11-02"
  },
  "005830": {
   "price": 175600,
   "date": "2026-11-02",
   "changePct": -4.9,
   "close": 175600,
   "closeDate": "2026-11-02"
  },
  "066570": {
   "price": 153700,
   "date": "2026-11-02",
   "changePct": 2,
   "close": 153700,
   "closeDate": "2026-11-02"
  },
  "086280": {
   "price": 204500,
   "date": "2026-11-02",
   "changePct": 11.3,
   "close": 204500,
   "closeDate": "2026-11-02"
  },
  "018260": {
   "price": 208500,
   "date": "2026-11-02",
   "changePct": 2.7,
   "close": 208500,
   "closeDate": "2026-11-02"
  },
  "005850": {
   "price": 48650,
   "date": "2026-11-02",
   "changePct": 0.5,
   "close": 48650,
   "closeDate": "2026-11-02"
  },
  "005490": {
   "price": 283000,
   "date": "2026-11-02",
   "changePct": 3.5,
   "close": 283000,
   "closeDate": "2026-11-02"
  },
  "035420": {
   "price": 175400,
   "date": "2026-11-02",
   "changePct": 1.8,
   "close": 175400,
   "closeDate": "2026-11-02"
  },
  "010120": {
   "price": 160600,
   "date": "2026-11-02",
   "changePct": 7.4,
   "close": 160600,
   "closeDate": "2026-11-02"
  },
  "030200": {
   "price": 46700,
   "date": "2026-11-02",
   "changePct": 0.9,
   "close": 46700,
   "closeDate": "2026-11-02"
  },
  "012330": {
   "price": 350000,
   "date": "2026-11-02",
   "changePct": 4.8,
   "close": 350000,
   "closeDate": "2026-11-02"
  },
  "047050": {
   "price": 51400,
   "date": "2026-11-02",
   "changePct": 5.7,
   "close": 51400,
   "closeDate": "2026-11-02"
  },
  "021240": {
   "price": 105100,
   "date": "2026-11-02",
   "changePct": 1.1,
   "close": 105100,
   "closeDate": "2026-11-02"
  },
  "033780": {
   "price": 192600,
   "date": "2026-11-02",
   "changePct": -1.8,
   "close": 192600,
   "closeDate": "2026-11-02"
  },
  "030190": {
   "price": 17160,
   "date": "2026-11-02",
   "changePct": -1.3,
   "close": 17160,
   "closeDate": "2026-11-02"
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
   "price": 5859.08,
   "date": "2026-11-02",
   "changePct": 2.2,
   "close": 5859.08,
   "closeDate": "2026-11-02"
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
