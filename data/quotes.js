// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-09",
 "quotes": {
  "103590": {
   "price": 42100,
   "date": "2026-11-09",
   "changePct": -2.7,
   "close": 42100,
   "closeDate": "2026-11-09"
  },
  "105560": {
   "price": 150900,
   "date": "2026-11-09",
   "changePct": -0.1,
   "close": 150900,
   "closeDate": "2026-11-09"
  },
  "138040": {
   "price": 128500,
   "date": "2026-11-09",
   "changePct": -2.8,
   "close": 128500,
   "closeDate": "2026-11-09"
  },
  "139130": {
   "price": 15170,
   "date": "2026-11-09",
   "changePct": -0.5,
   "close": 15170,
   "closeDate": "2026-11-09"
  },
  "175330": {
   "price": 25950,
   "date": "2026-11-09",
   "changePct": -4.2,
   "close": 25950,
   "closeDate": "2026-11-09"
  },
  "192400": {
   "price": 27100,
   "date": "2026-11-09",
   "changePct": 0.4,
   "close": 27100,
   "closeDate": "2026-11-09"
  },
  "207940": {
   "price": 1510000,
   "date": "2026-11-09",
   "changePct": -0.4,
   "close": 1510000,
   "closeDate": "2026-11-09"
  },
  "241560": {
   "price": 51600,
   "date": "2026-11-09",
   "changePct": -0.2,
   "close": 51600,
   "closeDate": "2026-11-09"
  },
  "267250": {
   "price": 121500,
   "date": "2026-11-09",
   "changePct": -2.1,
   "close": 121500,
   "closeDate": "2026-11-09"
  },
  "267260": {
   "price": 356000,
   "date": "2026-11-09",
   "changePct": -2.9,
   "close": 356000,
   "closeDate": "2026-11-09"
  },
  "267270": {
   "price": 82100,
   "date": "2026-11-09",
   "changePct": 2.6,
   "close": 82100,
   "closeDate": "2026-11-09"
  },
  "278470": {
   "price": 247000,
   "date": "2026-11-09",
   "changePct": -3.3,
   "close": 247000,
   "closeDate": "2026-11-09"
  },
  "282330": {
   "price": 139200,
   "date": "2026-11-09",
   "changePct": -2.9,
   "close": 139200,
   "closeDate": "2026-11-09"
  },
  "298040": {
   "price": 1549000,
   "date": "2026-11-09",
   "changePct": -1.8,
   "close": 1549000,
   "closeDate": "2026-11-09"
  },
  "316140": {
   "price": 30900,
   "date": "2026-11-09",
   "changePct": -1.6,
   "close": 30900,
   "closeDate": "2026-11-09"
  },
  "323410": {
   "price": 20250,
   "date": "2026-11-09",
   "changePct": -2.4,
   "close": 20250,
   "closeDate": "2026-11-09"
  },
  "361610": {
   "price": 12320,
   "date": "2026-11-09",
   "changePct": -2.1,
   "close": 12320,
   "closeDate": "2026-11-09"
  },
  "005930": {
   "price": 189900,
   "date": "2026-11-09",
   "changePct": 0.6,
   "close": 189900,
   "closeDate": "2026-11-09"
  },
  "055550": {
   "price": 85800,
   "date": "2026-11-09",
   "changePct": -1,
   "close": 85800,
   "closeDate": "2026-11-09"
  },
  "000810": {
   "price": 606000,
   "date": "2026-11-09",
   "changePct": 0.3,
   "close": 606000,
   "closeDate": "2026-11-09"
  },
  "012450": {
   "price": 639000,
   "date": "2026-11-09",
   "changePct": -3.2,
   "close": 639000,
   "closeDate": "2026-11-09"
  },
  "009540": {
   "price": 235500,
   "date": "2026-11-09",
   "changePct": -1.9,
   "close": 235500,
   "closeDate": "2026-11-09"
  },
  "068270": {
   "price": 210000,
   "date": "2026-11-09",
   "changePct": -0.5,
   "close": 210000,
   "closeDate": "2026-11-09"
  },
  "000270": {
   "price": 97000,
   "date": "2026-11-09",
   "changePct": -3.3,
   "close": 97000,
   "closeDate": "2026-11-09"
  },
  "032640": {
   "price": 15980,
   "date": "2026-11-09",
   "changePct": -4.7,
   "close": 15980,
   "closeDate": "2026-11-09"
  },
  "029780": {
   "price": 41500,
   "date": "2026-11-09",
   "changePct": -1.3,
   "close": 41500,
   "closeDate": "2026-11-09"
  },
  "035900": {
   "price": 40300,
   "date": "2026-11-09",
   "changePct": -2.4,
   "close": 40300,
   "closeDate": "2026-11-09"
  },
  "036570": {
   "price": 209000,
   "date": "2026-11-09",
   "changePct": 0.2,
   "close": 209000,
   "closeDate": "2026-11-09"
  },
  "035720": {
   "price": 32100,
   "date": "2026-11-09",
   "changePct": -0.6,
   "close": 32100,
   "closeDate": "2026-11-09"
  },
  "001040": {
   "price": 112000,
   "date": "2026-11-09",
   "changePct": -1.6,
   "close": 112000,
   "closeDate": "2026-11-09"
  },
  "012750": {
   "price": 98600,
   "date": "2026-11-09",
   "changePct": 0.2,
   "close": 98600,
   "closeDate": "2026-11-09"
  },
  "000660": {
   "price": 1136000,
   "date": "2026-11-09",
   "changePct": 0.4,
   "close": 1136000,
   "closeDate": "2026-11-09"
  },
  "086790": {
   "price": 116000,
   "date": "2026-11-09",
   "changePct": -1.9,
   "close": 116000,
   "closeDate": "2026-11-09"
  },
  "001120": {
   "price": 33950,
   "date": "2026-11-09",
   "changePct": -1.5,
   "close": 33950,
   "closeDate": "2026-11-09"
  },
  "005830": {
   "price": 171100,
   "date": "2026-11-09",
   "changePct": 0,
   "close": 171100,
   "closeDate": "2026-11-09"
  },
  "066570": {
   "price": 134700,
   "date": "2026-11-09",
   "changePct": -2.8,
   "close": 134700,
   "closeDate": "2026-11-09"
  },
  "086280": {
   "price": 189300,
   "date": "2026-11-09",
   "changePct": -4.1,
   "close": 189300,
   "closeDate": "2026-11-09"
  },
  "018260": {
   "price": 216500,
   "date": "2026-11-09",
   "changePct": -0.7,
   "close": 216500,
   "closeDate": "2026-11-09"
  },
  "005850": {
   "price": 45400,
   "date": "2026-11-09",
   "changePct": -3.5,
   "close": 45400,
   "closeDate": "2026-11-09"
  },
  "005490": {
   "price": 259000,
   "date": "2026-11-09",
   "changePct": -2.3,
   "close": 259000,
   "closeDate": "2026-11-09"
  },
  "035420": {
   "price": 187100,
   "date": "2026-11-09",
   "changePct": -1.6,
   "close": 187100,
   "closeDate": "2026-11-09"
  },
  "010120": {
   "price": 111700,
   "date": "2026-11-09",
   "changePct": -4.1,
   "close": 111700,
   "closeDate": "2026-11-09"
  },
  "030200": {
   "price": 52200,
   "date": "2026-11-09",
   "changePct": -2.1,
   "close": 52200,
   "closeDate": "2026-11-09"
  },
  "012330": {
   "price": 332000,
   "date": "2026-11-09",
   "changePct": -4.9,
   "close": 332000,
   "closeDate": "2026-11-09"
  },
  "047050": {
   "price": 47300,
   "date": "2026-11-09",
   "changePct": -1.6,
   "close": 47300,
   "closeDate": "2026-11-09"
  },
  "021240": {
   "price": 99400,
   "date": "2026-11-09",
   "changePct": -7.6,
   "close": 99400,
   "closeDate": "2026-11-09"
  },
  "033780": {
   "price": 182400,
   "date": "2026-11-09",
   "changePct": -3.9,
   "close": 182400,
   "closeDate": "2026-11-09"
  },
  "030190": {
   "price": 17930,
   "date": "2026-11-09",
   "changePct": 0.4,
   "close": 17930,
   "closeDate": "2026-11-09"
  },
  "042700": {
   "price": 160700,
   "date": "2026-11-09",
   "changePct": -0.4,
   "close": 160700,
   "closeDate": "2026-11-09"
  },
  "064400": {
   "price": 77300,
   "date": "2026-11-09",
   "changePct": 4.3,
   "close": 77300,
   "closeDate": "2026-11-09"
  },
  "095340": {
   "price": 124900,
   "date": "2026-11-09",
   "changePct": 3.2,
   "close": 124900,
   "closeDate": "2026-11-09"
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
  },
  "NTES": {
   "price": 129.45,
   "date": "2026-11-06",
   "changePct": 2.3,
   "close": 129.45,
   "closeDate": "2026-11-06"
  },
  "ROST": {
   "price": 231.09,
   "date": "2026-11-06",
   "changePct": -1.8,
   "close": 231.09,
   "closeDate": "2026-11-06"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5018.85,
   "date": "2026-11-09",
   "changePct": -0.8,
   "close": 5018.85,
   "closeDate": "2026-11-09"
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
