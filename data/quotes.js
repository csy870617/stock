// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-10",
 "quotes": {
  "103590": {
   "price": 46050,
   "date": "2026-11-10",
   "changePct": 9.4,
   "close": 46050,
   "closeDate": "2026-11-10"
  },
  "105560": {
   "price": 152700,
   "date": "2026-11-10",
   "changePct": 1.2,
   "close": 152700,
   "closeDate": "2026-11-10"
  },
  "138040": {
   "price": 128500,
   "date": "2026-11-10",
   "changePct": 0,
   "close": 128500,
   "closeDate": "2026-11-10"
  },
  "139130": {
   "price": 15490,
   "date": "2026-11-10",
   "changePct": 2.1,
   "close": 15490,
   "closeDate": "2026-11-10"
  },
  "175330": {
   "price": 26350,
   "date": "2026-11-10",
   "changePct": 1.5,
   "close": 26350,
   "closeDate": "2026-11-10"
  },
  "192400": {
   "price": 27250,
   "date": "2026-11-10",
   "changePct": 0.6,
   "close": 27250,
   "closeDate": "2026-11-10"
  },
  "207940": {
   "price": 1468000,
   "date": "2026-11-10",
   "changePct": -2.8,
   "close": 1468000,
   "closeDate": "2026-11-10"
  },
  "241560": {
   "price": 53500,
   "date": "2026-11-10",
   "changePct": 3.7,
   "close": 53500,
   "closeDate": "2026-11-10"
  },
  "267250": {
   "price": 126700,
   "date": "2026-11-10",
   "changePct": 4.3,
   "close": 126700,
   "closeDate": "2026-11-10"
  },
  "267260": {
   "price": 394000,
   "date": "2026-11-10",
   "changePct": 10.7,
   "close": 394000,
   "closeDate": "2026-11-10"
  },
  "267270": {
   "price": 92200,
   "date": "2026-11-10",
   "changePct": 12.3,
   "close": 92200,
   "closeDate": "2026-11-10"
  },
  "278470": {
   "price": 251000,
   "date": "2026-11-10",
   "changePct": 1.6,
   "close": 251000,
   "closeDate": "2026-11-10"
  },
  "298040": {
   "price": 1746000,
   "date": "2026-11-10",
   "changePct": 12.7,
   "close": 1746000,
   "closeDate": "2026-11-10"
  },
  "316140": {
   "price": 31050,
   "date": "2026-11-10",
   "changePct": 0.5,
   "close": 31050,
   "closeDate": "2026-11-10"
  },
  "323410": {
   "price": 20550,
   "date": "2026-11-10",
   "changePct": 1.5,
   "close": 20550,
   "closeDate": "2026-11-10"
  },
  "361610": {
   "price": 12820,
   "date": "2026-11-10",
   "changePct": 4.1,
   "close": 12820,
   "closeDate": "2026-11-10"
  },
  "005930": {
   "price": 198900,
   "date": "2026-11-10",
   "changePct": 4.7,
   "close": 198900,
   "closeDate": "2026-11-10"
  },
  "055550": {
   "price": 85500,
   "date": "2026-11-10",
   "changePct": -0.3,
   "close": 85500,
   "closeDate": "2026-11-10"
  },
  "000810": {
   "price": 599000,
   "date": "2026-11-10",
   "changePct": -1.2,
   "close": 599000,
   "closeDate": "2026-11-10"
  },
  "012450": {
   "price": 659000,
   "date": "2026-11-10",
   "changePct": 3.1,
   "close": 659000,
   "closeDate": "2026-11-10"
  },
  "009540": {
   "price": 245000,
   "date": "2026-11-10",
   "changePct": 4,
   "close": 245000,
   "closeDate": "2026-11-10"
  },
  "068270": {
   "price": 203000,
   "date": "2026-11-10",
   "changePct": -3.3,
   "close": 203000,
   "closeDate": "2026-11-10"
  },
  "000270": {
   "price": 96100,
   "date": "2026-11-10",
   "changePct": -0.9,
   "close": 96100,
   "closeDate": "2026-11-10"
  },
  "032640": {
   "price": 15860,
   "date": "2026-11-10",
   "changePct": -0.8,
   "close": 15860,
   "closeDate": "2026-11-10"
  },
  "029780": {
   "price": 41000,
   "date": "2026-11-10",
   "changePct": -1.2,
   "close": 41000,
   "closeDate": "2026-11-10"
  },
  "035900": {
   "price": 39800,
   "date": "2026-11-10",
   "changePct": -1.2,
   "close": 39800,
   "closeDate": "2026-11-10"
  },
  "036570": {
   "price": 213500,
   "date": "2026-11-10",
   "changePct": 2.2,
   "close": 213500,
   "closeDate": "2026-11-10"
  },
  "035720": {
   "price": 32050,
   "date": "2026-11-10",
   "changePct": -0.2,
   "close": 32050,
   "closeDate": "2026-11-10"
  },
  "001040": {
   "price": 112400,
   "date": "2026-11-10",
   "changePct": 0.4,
   "close": 112400,
   "closeDate": "2026-11-10"
  },
  "012750": {
   "price": 98100,
   "date": "2026-11-10",
   "changePct": -0.5,
   "close": 98100,
   "closeDate": "2026-11-10"
  },
  "000660": {
   "price": 1212000,
   "date": "2026-11-10",
   "changePct": 6.7,
   "close": 1212000,
   "closeDate": "2026-11-10"
  },
  "086790": {
   "price": 118400,
   "date": "2026-11-10",
   "changePct": 2.1,
   "close": 118400,
   "closeDate": "2026-11-10"
  },
  "001120": {
   "price": 34750,
   "date": "2026-11-10",
   "changePct": 2.4,
   "close": 34750,
   "closeDate": "2026-11-10"
  },
  "005830": {
   "price": 172300,
   "date": "2026-11-10",
   "changePct": 0.7,
   "close": 172300,
   "closeDate": "2026-11-10"
  },
  "066570": {
   "price": 140000,
   "date": "2026-11-10",
   "changePct": 3.9,
   "close": 140000,
   "closeDate": "2026-11-10"
  },
  "086280": {
   "price": 199000,
   "date": "2026-11-10",
   "changePct": 5.1,
   "close": 199000,
   "closeDate": "2026-11-10"
  },
  "018260": {
   "price": 232500,
   "date": "2026-11-10",
   "changePct": 7.4,
   "close": 232500,
   "closeDate": "2026-11-10"
  },
  "005850": {
   "price": 46800,
   "date": "2026-11-10",
   "changePct": 3.1,
   "close": 46800,
   "closeDate": "2026-11-10"
  },
  "005490": {
   "price": 271000,
   "date": "2026-11-10",
   "changePct": 4.6,
   "close": 271000,
   "closeDate": "2026-11-10"
  },
  "035420": {
   "price": 193000,
   "date": "2026-11-10",
   "changePct": 3.2,
   "close": 193000,
   "closeDate": "2026-11-10"
  },
  "010120": {
   "price": 121000,
   "date": "2026-11-10",
   "changePct": 8.3,
   "close": 121000,
   "closeDate": "2026-11-10"
  },
  "030200": {
   "price": 51000,
   "date": "2026-11-10",
   "changePct": -2.3,
   "close": 51000,
   "closeDate": "2026-11-10"
  },
  "012330": {
   "price": 351500,
   "date": "2026-11-10",
   "changePct": 5.9,
   "close": 351500,
   "closeDate": "2026-11-10"
  },
  "047050": {
   "price": 49300,
   "date": "2026-11-10",
   "changePct": 4.2,
   "close": 49300,
   "closeDate": "2026-11-10"
  },
  "030190": {
   "price": 18040,
   "date": "2026-11-10",
   "changePct": 0.6,
   "close": 18040,
   "closeDate": "2026-11-10"
  },
  "042700": {
   "price": 173400,
   "date": "2026-11-10",
   "changePct": 7.9,
   "close": 173400,
   "closeDate": "2026-11-10"
  },
  "064400": {
   "price": 80100,
   "date": "2026-11-10",
   "changePct": 3.6,
   "close": 80100,
   "closeDate": "2026-11-10"
  },
  "095340": {
   "price": 132900,
   "date": "2026-11-10",
   "changePct": 6.4,
   "close": 132900,
   "closeDate": "2026-11-10"
  },
  "MSFT": {
   "price": 542.4,
   "date": "2026-11-10",
   "changePct": -0.5,
   "close": 545.18,
   "closeDate": "2026-11-09"
  },
  "V": {
   "price": 419.89,
   "date": "2026-11-10",
   "changePct": -0.5,
   "close": 422.16,
   "closeDate": "2026-11-09"
  },
  "MA": {
   "price": 653.435,
   "date": "2026-11-10",
   "changePct": -0.4,
   "close": 655.81,
   "closeDate": "2026-11-09"
  },
  "GOOGL": {
   "price": 289.895,
   "date": "2026-11-10",
   "changePct": 0.6,
   "close": 288.15,
   "closeDate": "2026-11-09"
  },
  "COST": {
   "price": 1059.15,
   "date": "2026-11-10",
   "changePct": -0.7,
   "close": 1066.1801,
   "closeDate": "2026-11-09"
  },
  "NVDA": {
   "price": 173.19,
   "date": "2026-11-10",
   "changePct": -3.1,
   "close": 178.67,
   "closeDate": "2026-11-09"
  },
  "META": {
   "price": 645.085,
   "date": "2026-11-10",
   "changePct": 0.6,
   "close": 641.37,
   "closeDate": "2026-11-09"
  },
  "AVGO": {
   "price": 333.03,
   "date": "2026-11-10",
   "changePct": 4.2,
   "close": 319.48,
   "closeDate": "2026-11-09"
  },
  "TSM": {
   "price": 399.01,
   "date": "2026-11-10",
   "changePct": 2.7,
   "close": 388.62,
   "closeDate": "2026-11-09"
  },
  "UBER": {
   "price": 70.08,
   "date": "2026-11-10",
   "changePct": -1.5,
   "close": 71.17,
   "closeDate": "2026-11-09"
  },
  "GM": {
   "price": 89.38,
   "date": "2026-11-10",
   "changePct": -0.3,
   "close": 89.65,
   "closeDate": "2026-11-09"
  },
  "VZ": {
   "price": 45.58,
   "date": "2026-11-10",
   "changePct": -1,
   "close": 46.06,
   "closeDate": "2026-11-09"
  },
  "C": {
   "price": 122.897,
   "date": "2026-11-10",
   "changePct": 0.8,
   "close": 121.97,
   "closeDate": "2026-11-09"
  },
  "DUK": {
   "price": 127.885,
   "date": "2026-11-10",
   "changePct": -0.2,
   "close": 128.1,
   "closeDate": "2026-11-09"
  },
  "KO": {
   "price": 96.03,
   "date": "2026-11-10",
   "changePct": 0,
   "close": 96.03,
   "closeDate": "2026-11-09"
  },
  "JNJ": {
   "price": 281.195,
   "date": "2026-11-10",
   "changePct": -0.3,
   "close": 282.11,
   "closeDate": "2026-11-09"
  },
  "LLY": {
   "price": 1416.83,
   "date": "2026-11-10",
   "changePct": 0.3,
   "close": 1411.95,
   "closeDate": "2026-11-09"
  },
  "CI": {
   "price": 297.905,
   "date": "2026-11-10",
   "changePct": 0.8,
   "close": 295.6,
   "closeDate": "2026-11-09"
  },
  "TSLA": {
   "price": 376.58,
   "date": "2026-11-10",
   "changePct": -0.4,
   "close": 378.05,
   "closeDate": "2026-11-09"
  },
  "AAPL": {
   "price": 347.85,
   "date": "2026-11-10",
   "changePct": -0.8,
   "close": 350.69,
   "closeDate": "2026-11-09"
  },
  "MU": {
   "price": 741,
   "date": "2026-11-10",
   "changePct": 1.1,
   "close": 733.15,
   "closeDate": "2026-11-09"
  },
  "MDT": {
   "price": 101.23,
   "date": "2026-11-10",
   "changePct": -1.5,
   "close": 102.79,
   "closeDate": "2026-11-09"
  },
  "IREN": {
   "price": 21.003,
   "date": "2026-11-10",
   "changePct": -1.9,
   "close": 21.41,
   "closeDate": "2026-11-09"
  },
  "UNH": {
   "price": 399.62,
   "date": "2026-11-10",
   "changePct": 0.5,
   "close": 397.62,
   "closeDate": "2026-11-09"
  },
  "DVN": {
   "price": 43.52,
   "date": "2026-11-10",
   "changePct": 2.6,
   "close": 42.4,
   "closeDate": "2026-11-09"
  },
  "GS": {
   "price": 913.89,
   "date": "2026-11-10",
   "changePct": 0.8,
   "close": 906.22,
   "closeDate": "2026-11-09"
  },
  "AMP": {
   "price": 519.5,
   "date": "2026-11-10",
   "changePct": 0.2,
   "close": 518.3,
   "closeDate": "2026-11-09"
  },
  "PNC": {
   "price": 231.415,
   "date": "2026-11-10",
   "changePct": 0,
   "close": 231.3,
   "closeDate": "2026-11-09"
  },
  "MTB": {
   "price": 221.7,
   "date": "2026-11-10",
   "changePct": -0.5,
   "close": 222.73,
   "closeDate": "2026-11-09"
  },
  "SO": {
   "price": 93.02,
   "date": "2026-11-10",
   "changePct": -0.6,
   "close": 93.57,
   "closeDate": "2026-11-09"
  },
  "WEC": {
   "price": 116.29,
   "date": "2026-11-10",
   "changePct": -0.7,
   "close": 117.15,
   "closeDate": "2026-11-09"
  },
  "TJX": {
   "price": 136.865,
   "date": "2026-11-10",
   "changePct": -0.9,
   "close": 138.13,
   "closeDate": "2026-11-09"
  },
  "ANET": {
   "price": 190.71,
   "date": "2026-11-10",
   "changePct": 2.4,
   "close": 186.17,
   "closeDate": "2026-11-09"
  },
  "GD": {
   "price": 364.978,
   "date": "2026-11-10",
   "changePct": 0.8,
   "close": 362.07,
   "closeDate": "2026-11-09"
  },
  "LMT": {
   "price": 598.62,
   "date": "2026-11-10",
   "changePct": 1.8,
   "close": 588.19,
   "closeDate": "2026-11-09"
  },
  "CB": {
   "price": 364.01,
   "date": "2026-11-10",
   "changePct": 0.2,
   "close": 363.45,
   "closeDate": "2026-11-09"
  },
  "GILD": {
   "price": 168.535,
   "date": "2026-11-10",
   "changePct": -0.5,
   "close": 169.32,
   "closeDate": "2026-11-09"
  },
  "BRK.B": {
   "price": 577.8,
   "date": "2026-11-10",
   "changePct": 0.4,
   "close": 575.25,
   "closeDate": "2026-11-09"
  },
  "TMO": {
   "price": 717.305,
   "date": "2026-11-10",
   "changePct": -0.6,
   "close": 721.63,
   "closeDate": "2026-11-09"
  },
  "ECL": {
   "price": 305.65,
   "date": "2026-11-10",
   "changePct": -0.4,
   "close": 306.74,
   "closeDate": "2026-11-09"
  },
  "RSG": {
   "price": 245.395,
   "date": "2026-11-10",
   "changePct": -0.6,
   "close": 246.78,
   "closeDate": "2026-11-09"
  },
  "CTAS": {
   "price": 221.33,
   "date": "2026-11-10",
   "changePct": -0.8,
   "close": 223.16,
   "closeDate": "2026-11-09"
  },
  "ORLY": {
   "price": 88.98,
   "date": "2026-11-10",
   "changePct": -0.9,
   "close": 89.79,
   "closeDate": "2026-11-09"
  },
  "ADP": {
   "price": 297.24,
   "date": "2026-11-10",
   "changePct": -1.6,
   "close": 302.06,
   "closeDate": "2026-11-09"
  },
  "FAST": {
   "price": 54.135,
   "date": "2026-11-10",
   "changePct": -0.8,
   "close": 54.57,
   "closeDate": "2026-11-09"
  },
  "VRT": {
   "price": 197.775,
   "date": "2026-11-10",
   "changePct": -1.3,
   "close": 200.47,
   "closeDate": "2026-11-09"
  },
  "WAB": {
   "price": 300.5,
   "date": "2026-11-10",
   "changePct": 0.8,
   "close": 298.19,
   "closeDate": "2026-11-09"
  },
  "NTES": {
   "price": 128.65,
   "date": "2026-11-10",
   "changePct": -0.8,
   "close": 129.65,
   "closeDate": "2026-11-09"
  },
  "ROST": {
   "price": 235.975,
   "date": "2026-11-10",
   "changePct": -0.4,
   "close": 237,
   "closeDate": "2026-11-09"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5239.13,
   "date": "2026-11-10",
   "changePct": 4.4,
   "close": 5239.13,
   "closeDate": "2026-11-10"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7534.58,
   "date": "2026-11-10",
   "changePct": -0.2,
   "close": 7549.9399,
   "closeDate": "2026-11-09"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 219.73,
   "date": "2026-11-10",
   "changePct": -0.6,
   "close": 220.95,
   "closeDate": "2026-11-09"
  }
 }
};
