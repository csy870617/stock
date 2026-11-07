// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-07",
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
   "price": 530.61,
   "date": "2026-11-06",
   "changePct": -1,
   "close": 530.61,
   "closeDate": "2026-11-06"
  },
  "V": {
   "price": 422.65,
   "date": "2026-11-06",
   "changePct": 0,
   "close": 422.65,
   "closeDate": "2026-11-06"
  },
  "MA": {
   "price": 652.7,
   "date": "2026-11-06",
   "changePct": -0.5,
   "close": 652.7,
   "closeDate": "2026-11-06"
  },
  "GOOGL": {
   "price": 284.78,
   "date": "2026-11-06",
   "changePct": 0.8,
   "close": 284.78,
   "closeDate": "2026-11-06"
  },
  "COST": {
   "price": 1053.56,
   "date": "2026-11-06",
   "changePct": -1.1,
   "close": 1053.56,
   "closeDate": "2026-11-06"
  },
  "NVDA": {
   "price": 186.64,
   "date": "2026-11-06",
   "changePct": 2.8,
   "close": 186.64,
   "closeDate": "2026-11-06"
  },
  "META": {
   "price": 610.15,
   "date": "2026-11-06",
   "changePct": 0.8,
   "close": 610.15,
   "closeDate": "2026-11-06"
  },
  "AVGO": {
   "price": 293.69,
   "date": "2026-11-06",
   "changePct": 0.7,
   "close": 293.69,
   "closeDate": "2026-11-06"
  },
  "TSM": {
   "price": 375.44,
   "date": "2026-11-06",
   "changePct": 6.3,
   "close": 375.44,
   "closeDate": "2026-11-06"
  },
  "UBER": {
   "price": 68.59,
   "date": "2026-11-06",
   "changePct": -0.3,
   "close": 68.59,
   "closeDate": "2026-11-06"
  },
  "GM": {
   "price": 86.16,
   "date": "2026-11-06",
   "changePct": -3.5,
   "close": 86.16,
   "closeDate": "2026-11-06"
  },
  "VZ": {
   "price": 45.69,
   "date": "2026-11-06",
   "changePct": -0.9,
   "close": 45.69,
   "closeDate": "2026-11-06"
  },
  "C": {
   "price": 119.05,
   "date": "2026-11-06",
   "changePct": 0.5,
   "close": 119.05,
   "closeDate": "2026-11-06"
  },
  "DUK": {
   "price": 127.78,
   "date": "2026-11-06",
   "changePct": -1.8,
   "close": 127.78,
   "closeDate": "2026-11-06"
  },
  "KO": {
   "price": 95.67,
   "date": "2026-11-06",
   "changePct": -0.1,
   "close": 95.67,
   "closeDate": "2026-11-06"
  },
  "JNJ": {
   "price": 276.22,
   "date": "2026-11-06",
   "changePct": 1.4,
   "close": 276.22,
   "closeDate": "2026-11-06"
  },
  "LLY": {
   "price": 1354,
   "date": "2026-11-06",
   "changePct": -0.8,
   "close": 1354,
   "closeDate": "2026-11-06"
  },
  "CI": {
   "price": 293.59,
   "date": "2026-11-06",
   "changePct": -2.6,
   "close": 293.59,
   "closeDate": "2026-11-06"
  },
  "TSLA": {
   "price": 358.22,
   "date": "2026-11-06",
   "changePct": 4.2,
   "close": 358.22,
   "closeDate": "2026-11-06"
  },
  "MDLZ": {
   "price": 66.02,
   "date": "2026-11-06",
   "changePct": -1.2,
   "close": 66.02,
   "closeDate": "2026-11-06"
  },
  "AAPL": {
   "price": 342.37,
   "date": "2026-11-06",
   "changePct": -0.5,
   "close": 342.37,
   "closeDate": "2026-11-06"
  },
  "MU": {
   "price": 690,
   "date": "2026-11-06",
   "changePct": 5.1,
   "close": 690,
   "closeDate": "2026-11-06"
  },
  "MDT": {
   "price": 101.8,
   "date": "2026-11-06",
   "changePct": -2.9,
   "close": 101.8,
   "closeDate": "2026-11-06"
  },
  "IREN": {
   "price": 21.64,
   "date": "2026-11-06",
   "changePct": 20,
   "close": 21.64,
   "closeDate": "2026-11-06"
  },
  "UNH": {
   "price": 394.15,
   "date": "2026-11-06",
   "changePct": -0.4,
   "close": 394.15,
   "closeDate": "2026-11-06"
  },
  "DVN": {
   "price": 42.21,
   "date": "2026-11-06",
   "changePct": -1.6,
   "close": 42.21,
   "closeDate": "2026-11-06"
  },
  "GS": {
   "price": 865.82,
   "date": "2026-11-06",
   "changePct": -0.4,
   "close": 865.82,
   "closeDate": "2026-11-06"
  },
  "AMP": {
   "price": 501.49,
   "date": "2026-11-06",
   "changePct": -1.5,
   "close": 501.49,
   "closeDate": "2026-11-06"
  },
  "PNC": {
   "price": 225.38,
   "date": "2026-11-06",
   "changePct": -0.6,
   "close": 225.38,
   "closeDate": "2026-11-06"
  },
  "MTB": {
   "price": 217.75,
   "date": "2026-11-06",
   "changePct": -0.9,
   "close": 217.75,
   "closeDate": "2026-11-06"
  },
  "SO": {
   "price": 92.34,
   "date": "2026-11-06",
   "changePct": -1.1,
   "close": 92.34,
   "closeDate": "2026-11-06"
  },
  "WEC": {
   "price": 115.87,
   "date": "2026-11-06",
   "changePct": -2.1,
   "close": 115.87,
   "closeDate": "2026-11-06"
  },
  "TJX": {
   "price": 135.3,
   "date": "2026-11-06",
   "changePct": -2.4,
   "close": 135.3,
   "closeDate": "2026-11-06"
  },
  "ANET": {
   "price": 170.8,
   "date": "2026-11-06",
   "changePct": 7.3,
   "close": 170.8,
   "closeDate": "2026-11-06"
  },
  "GD": {
   "price": 354.06,
   "date": "2026-11-06",
   "changePct": -0.6,
   "close": 354.06,
   "closeDate": "2026-11-06"
  },
  "LMT": {
   "price": 567.08,
   "date": "2026-11-06",
   "changePct": -1.6,
   "close": 567.08,
   "closeDate": "2026-11-06"
  },
  "CB": {
   "price": 365.02,
   "date": "2026-11-06",
   "changePct": -1.8,
   "close": 365.02,
   "closeDate": "2026-11-06"
  },
  "GILD": {
   "price": 166.89,
   "date": "2026-11-06",
   "changePct": -0.4,
   "close": 166.89,
   "closeDate": "2026-11-06"
  },
  "BRK.B": {
   "price": 570.89,
   "date": "2026-11-06",
   "changePct": -0.3,
   "close": 570.89,
   "closeDate": "2026-11-06"
  },
  "TMO": {
   "price": 694.76,
   "date": "2026-11-06",
   "changePct": 2.6,
   "close": 694.76,
   "closeDate": "2026-11-06"
  },
  "ECL": {
   "price": 300.68,
   "date": "2026-11-06",
   "changePct": -1.7,
   "close": 300.68,
   "closeDate": "2026-11-06"
  },
  "MSI": {
   "price": 514.51,
   "date": "2026-11-06",
   "changePct": -0.5,
   "close": 514.51,
   "closeDate": "2026-11-06"
  },
  "RSG": {
   "price": 246.85,
   "date": "2026-11-06",
   "changePct": -1,
   "close": 246.85,
   "closeDate": "2026-11-06"
  },
  "CTAS": {
   "price": 222.36,
   "date": "2026-11-06",
   "changePct": -1.8,
   "close": 222.36,
   "closeDate": "2026-11-06"
  },
  "ORLY": {
   "price": 89.89,
   "date": "2026-11-06",
   "changePct": -1.7,
   "close": 89.89,
   "closeDate": "2026-11-06"
  },
  "YUM": {
   "price": 161.14,
   "date": "2026-11-06",
   "changePct": -3,
   "close": 161.14,
   "closeDate": "2026-11-06"
  },
  "ADP": {
   "price": 303.35,
   "date": "2026-11-06",
   "changePct": -1.2,
   "close": 303.35,
   "closeDate": "2026-11-06"
  },
  "FAST": {
   "price": 52.99,
   "date": "2026-11-06",
   "changePct": 0.2,
   "close": 52.99,
   "closeDate": "2026-11-06"
  },
  "VRT": {
   "price": 182.86,
   "date": "2026-11-06",
   "changePct": 3.5,
   "close": 182.86,
   "closeDate": "2026-11-06"
  },
  "WAB": {
   "price": 283.59,
   "date": "2026-11-06",
   "changePct": 1.8,
   "close": 283.59,
   "closeDate": "2026-11-06"
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
   "price": 7376.86,
   "date": "2026-11-06",
   "changePct": 0.3,
   "close": 7376.86,
   "closeDate": "2026-11-06"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 216.05,
   "date": "2026-11-06",
   "changePct": -0.4,
   "close": 216.05,
   "closeDate": "2026-11-06"
  }
 }
};
