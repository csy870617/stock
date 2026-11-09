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
   "price": 545.18,
   "date": "2026-11-09",
   "changePct": 2.7,
   "close": 545.18,
   "closeDate": "2026-11-09"
  },
  "V": {
   "price": 422.16,
   "date": "2026-11-09",
   "changePct": -0.1,
   "close": 422.16,
   "closeDate": "2026-11-09"
  },
  "MA": {
   "price": 655.81,
   "date": "2026-11-09",
   "changePct": 0.5,
   "close": 655.81,
   "closeDate": "2026-11-09"
  },
  "GOOGL": {
   "price": 288.15,
   "date": "2026-11-09",
   "changePct": 1.2,
   "close": 288.15,
   "closeDate": "2026-11-09"
  },
  "COST": {
   "price": 1066.18,
   "date": "2026-11-09",
   "changePct": 1.2,
   "close": 1066.18,
   "closeDate": "2026-11-09"
  },
  "NVDA": {
   "price": 178.67,
   "date": "2026-11-09",
   "changePct": -4.3,
   "close": 178.67,
   "closeDate": "2026-11-09"
  },
  "META": {
   "price": 641.37,
   "date": "2026-11-09",
   "changePct": 5.1,
   "close": 641.37,
   "closeDate": "2026-11-09"
  },
  "AVGO": {
   "price": 319.48,
   "date": "2026-11-09",
   "changePct": 8.8,
   "close": 319.48,
   "closeDate": "2026-11-09"
  },
  "TSM": {
   "price": 388.62,
   "date": "2026-11-09",
   "changePct": 3.5,
   "close": 388.62,
   "closeDate": "2026-11-09"
  },
  "UBER": {
   "price": 71.17,
   "date": "2026-11-09",
   "changePct": 3.8,
   "close": 71.17,
   "closeDate": "2026-11-09"
  },
  "GM": {
   "price": 89.65,
   "date": "2026-11-09",
   "changePct": 4.1,
   "close": 89.65,
   "closeDate": "2026-11-09"
  },
  "VZ": {
   "price": 46.06,
   "date": "2026-11-09",
   "changePct": 0.8,
   "close": 46.06,
   "closeDate": "2026-11-09"
  },
  "C": {
   "price": 121.97,
   "date": "2026-11-09",
   "changePct": 2.5,
   "close": 121.97,
   "closeDate": "2026-11-09"
  },
  "DUK": {
   "price": 128.1,
   "date": "2026-11-09",
   "changePct": 0.3,
   "close": 128.1,
   "closeDate": "2026-11-09"
  },
  "KO": {
   "price": 96.03,
   "date": "2026-11-09",
   "changePct": 0.4,
   "close": 96.03,
   "closeDate": "2026-11-09"
  },
  "JNJ": {
   "price": 282.11,
   "date": "2026-11-09",
   "changePct": 2.1,
   "close": 282.11,
   "closeDate": "2026-11-09"
  },
  "LLY": {
   "price": 1411.95,
   "date": "2026-11-09",
   "changePct": 4.3,
   "close": 1411.95,
   "closeDate": "2026-11-09"
  },
  "CI": {
   "price": 295.6,
   "date": "2026-11-09",
   "changePct": 0.7,
   "close": 295.6,
   "closeDate": "2026-11-09"
  },
  "TSLA": {
   "price": 378.05,
   "date": "2026-11-09",
   "changePct": 5.5,
   "close": 378.05,
   "closeDate": "2026-11-09"
  },
  "AAPL": {
   "price": 350.69,
   "date": "2026-11-09",
   "changePct": 2.4,
   "close": 350.69,
   "closeDate": "2026-11-09"
  },
  "MU": {
   "price": 733.15,
   "date": "2026-11-09",
   "changePct": 6.3,
   "close": 733.15,
   "closeDate": "2026-11-09"
  },
  "MDT": {
   "price": 102.79,
   "date": "2026-11-09",
   "changePct": 1,
   "close": 102.79,
   "closeDate": "2026-11-09"
  },
  "IREN": {
   "price": 21.41,
   "date": "2026-11-09",
   "changePct": -1.1,
   "close": 21.41,
   "closeDate": "2026-11-09"
  },
  "UNH": {
   "price": 397.62,
   "date": "2026-11-09",
   "changePct": 0.9,
   "close": 397.62,
   "closeDate": "2026-11-09"
  },
  "DVN": {
   "price": 42.4,
   "date": "2026-11-09",
   "changePct": 0.5,
   "close": 42.4,
   "closeDate": "2026-11-09"
  },
  "GS": {
   "price": 906.22,
   "date": "2026-11-09",
   "changePct": 4.7,
   "close": 906.22,
   "closeDate": "2026-11-09"
  },
  "AMP": {
   "price": 518.3,
   "date": "2026-11-09",
   "changePct": 3.4,
   "close": 518.3,
   "closeDate": "2026-11-09"
  },
  "PNC": {
   "price": 231.3,
   "date": "2026-11-09",
   "changePct": 2.6,
   "close": 231.3,
   "closeDate": "2026-11-09"
  },
  "MTB": {
   "price": 222.73,
   "date": "2026-11-09",
   "changePct": 2.3,
   "close": 222.73,
   "closeDate": "2026-11-09"
  },
  "SO": {
   "price": 93.57,
   "date": "2026-11-09",
   "changePct": 1.3,
   "close": 93.57,
   "closeDate": "2026-11-09"
  },
  "WEC": {
   "price": 117.15,
   "date": "2026-11-09",
   "changePct": 1.1,
   "close": 117.15,
   "closeDate": "2026-11-09"
  },
  "TJX": {
   "price": 138.13,
   "date": "2026-11-09",
   "changePct": 2.1,
   "close": 138.13,
   "closeDate": "2026-11-09"
  },
  "ANET": {
   "price": 186.17,
   "date": "2026-11-09",
   "changePct": 9,
   "close": 186.17,
   "closeDate": "2026-11-09"
  },
  "GD": {
   "price": 362.07,
   "date": "2026-11-09",
   "changePct": 2.3,
   "close": 362.07,
   "closeDate": "2026-11-09"
  },
  "LMT": {
   "price": 588.19,
   "date": "2026-11-09",
   "changePct": 3.7,
   "close": 588.19,
   "closeDate": "2026-11-09"
  },
  "CB": {
   "price": 363.45,
   "date": "2026-11-09",
   "changePct": -0.4,
   "close": 363.45,
   "closeDate": "2026-11-09"
  },
  "GILD": {
   "price": 169.32,
   "date": "2026-11-09",
   "changePct": 1.5,
   "close": 169.32,
   "closeDate": "2026-11-09"
  },
  "BRK.B": {
   "price": 575.25,
   "date": "2026-11-09",
   "changePct": 0.8,
   "close": 575.25,
   "closeDate": "2026-11-09"
  },
  "TMO": {
   "price": 721.63,
   "date": "2026-11-09",
   "changePct": 3.9,
   "close": 721.63,
   "closeDate": "2026-11-09"
  },
  "ECL": {
   "price": 306.74,
   "date": "2026-11-09",
   "changePct": 2,
   "close": 306.74,
   "closeDate": "2026-11-09"
  },
  "RSG": {
   "price": 246.78,
   "date": "2026-11-09",
   "changePct": 0,
   "close": 246.78,
   "closeDate": "2026-11-09"
  },
  "CTAS": {
   "price": 223.16,
   "date": "2026-11-09",
   "changePct": 0.4,
   "close": 223.16,
   "closeDate": "2026-11-09"
  },
  "ORLY": {
   "price": 89.79,
   "date": "2026-11-09",
   "changePct": -0.1,
   "close": 89.79,
   "closeDate": "2026-11-09"
  },
  "ADP": {
   "price": 302.06,
   "date": "2026-11-09",
   "changePct": -0.4,
   "close": 302.06,
   "closeDate": "2026-11-09"
  },
  "FAST": {
   "price": 54.57,
   "date": "2026-11-09",
   "changePct": 3,
   "close": 54.57,
   "closeDate": "2026-11-09"
  },
  "VRT": {
   "price": 200.47,
   "date": "2026-11-09",
   "changePct": 9.6,
   "close": 200.47,
   "closeDate": "2026-11-09"
  },
  "WAB": {
   "price": 298.19,
   "date": "2026-11-09",
   "changePct": 5.1,
   "close": 298.19,
   "closeDate": "2026-11-09"
  },
  "NTES": {
   "price": 129.65,
   "date": "2026-11-09",
   "changePct": 0.2,
   "close": 129.65,
   "closeDate": "2026-11-09"
  },
  "ROST": {
   "price": 237,
   "date": "2026-11-09",
   "changePct": 2.6,
   "close": 237,
   "closeDate": "2026-11-09"
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
   "price": 7549.94,
   "date": "2026-11-09",
   "changePct": 2.3,
   "close": 7549.94,
   "closeDate": "2026-11-09"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 220.95,
   "date": "2026-11-09",
   "changePct": 2.3,
   "close": 220.95,
   "closeDate": "2026-11-09"
  }
 }
};
