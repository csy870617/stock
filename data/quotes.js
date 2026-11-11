// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-11",
 "quotes": {
  "103590": {
   "price": 45350,
   "date": "2026-11-11",
   "changePct": -1.5,
   "close": 46050,
   "closeDate": "2026-11-10"
  },
  "105560": {
   "price": 153100,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 152700,
   "closeDate": "2026-11-10"
  },
  "138040": {
   "price": 131200,
   "date": "2026-11-11",
   "changePct": 2.1,
   "close": 128500,
   "closeDate": "2026-11-10"
  },
  "139130": {
   "price": 15690,
   "date": "2026-11-11",
   "changePct": 1.3,
   "close": 15490,
   "closeDate": "2026-11-10"
  },
  "175330": {
   "price": 26800,
   "date": "2026-11-11",
   "changePct": 1.7,
   "close": 26350,
   "closeDate": "2026-11-10"
  },
  "192400": {
   "price": 27450,
   "date": "2026-11-11",
   "changePct": 0.7,
   "close": 27250,
   "closeDate": "2026-11-10"
  },
  "207940": {
   "price": 1461000,
   "date": "2026-11-11",
   "changePct": -0.5,
   "close": 1468000,
   "closeDate": "2026-11-10"
  },
  "241560": {
   "price": 53200,
   "date": "2026-11-11",
   "changePct": -0.6,
   "close": 53500,
   "closeDate": "2026-11-10"
  },
  "267250": {
   "price": 123400,
   "date": "2026-11-11",
   "changePct": -2.6,
   "close": 126700,
   "closeDate": "2026-11-10"
  },
  "267260": {
   "price": 383000,
   "date": "2026-11-11",
   "changePct": -2.8,
   "close": 394000,
   "closeDate": "2026-11-10"
  },
  "267270": {
   "price": 91100,
   "date": "2026-11-11",
   "changePct": -1.2,
   "close": 92200,
   "closeDate": "2026-11-10"
  },
  "278470": {
   "price": 251000,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 251000,
   "closeDate": "2026-11-10"
  },
  "298040": {
   "price": 1693000,
   "date": "2026-11-11",
   "changePct": -3,
   "close": 1746000,
   "closeDate": "2026-11-10"
  },
  "316140": {
   "price": 31450,
   "date": "2026-11-11",
   "changePct": 1.3,
   "close": 31050,
   "closeDate": "2026-11-10"
  },
  "323410": {
   "price": 20850,
   "date": "2026-11-11",
   "changePct": 1.5,
   "close": 20550,
   "closeDate": "2026-11-10"
  },
  "361610": {
   "price": 12850,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 12820,
   "closeDate": "2026-11-10"
  },
  "005930": {
   "price": 197400,
   "date": "2026-11-11",
   "changePct": -0.8,
   "close": 198900,
   "closeDate": "2026-11-10"
  },
  "055550": {
   "price": 85700,
   "date": "2026-11-11",
   "changePct": 0.2,
   "close": 85500,
   "closeDate": "2026-11-10"
  },
  "000810": {
   "price": 585000,
   "date": "2026-11-11",
   "changePct": -2.3,
   "close": 599000,
   "closeDate": "2026-11-10"
  },
  "012450": {
   "price": 642000,
   "date": "2026-11-11",
   "changePct": -2.6,
   "close": 659000,
   "closeDate": "2026-11-10"
  },
  "009540": {
   "price": 237000,
   "date": "2026-11-11",
   "changePct": -3.3,
   "close": 245000,
   "closeDate": "2026-11-10"
  },
  "068270": {
   "price": 210000,
   "date": "2026-11-11",
   "changePct": 3.4,
   "close": 203000,
   "closeDate": "2026-11-10"
  },
  "000270": {
   "price": 95700,
   "date": "2026-11-11",
   "changePct": -0.4,
   "close": 96100,
   "closeDate": "2026-11-10"
  },
  "032640": {
   "price": 15880,
   "date": "2026-11-11",
   "changePct": 0.1,
   "close": 15860,
   "closeDate": "2026-11-10"
  },
  "029780": {
   "price": 41300,
   "date": "2026-11-11",
   "changePct": 0.7,
   "close": 41000,
   "closeDate": "2026-11-10"
  },
  "035900": {
   "price": 40150,
   "date": "2026-11-11",
   "changePct": 0.9,
   "close": 39800,
   "closeDate": "2026-11-10"
  },
  "036570": {
   "price": 211500,
   "date": "2026-11-11",
   "changePct": -0.9,
   "close": 213500,
   "closeDate": "2026-11-10"
  },
  "035720": {
   "price": 32450,
   "date": "2026-11-11",
   "changePct": 1.2,
   "close": 32050,
   "closeDate": "2026-11-10"
  },
  "001040": {
   "price": 112700,
   "date": "2026-11-11",
   "changePct": 0.3,
   "close": 112400,
   "closeDate": "2026-11-10"
  },
  "012750": {
   "price": 100100,
   "date": "2026-11-11",
   "changePct": 2,
   "close": 98100,
   "closeDate": "2026-11-10"
  },
  "000660": {
   "price": 1198000,
   "date": "2026-11-11",
   "changePct": -1.2,
   "close": 1212000,
   "closeDate": "2026-11-10"
  },
  "086790": {
   "price": 119300,
   "date": "2026-11-11",
   "changePct": 0.8,
   "close": 118400,
   "closeDate": "2026-11-10"
  },
  "001120": {
   "price": 35200,
   "date": "2026-11-11",
   "changePct": 1.3,
   "close": 34750,
   "closeDate": "2026-11-10"
  },
  "005830": {
   "price": 169100,
   "date": "2026-11-11",
   "changePct": -1.9,
   "close": 172300,
   "closeDate": "2026-11-10"
  },
  "066570": {
   "price": 138600,
   "date": "2026-11-11",
   "changePct": -1,
   "close": 140000,
   "closeDate": "2026-11-10"
  },
  "086280": {
   "price": 202500,
   "date": "2026-11-11",
   "changePct": 1.8,
   "close": 199000,
   "closeDate": "2026-11-10"
  },
  "018260": {
   "price": 235000,
   "date": "2026-11-11",
   "changePct": 1.1,
   "close": 232500,
   "closeDate": "2026-11-10"
  },
  "005850": {
   "price": 47100,
   "date": "2026-11-11",
   "changePct": 0.6,
   "close": 46800,
   "closeDate": "2026-11-10"
  },
  "005490": {
   "price": 273000,
   "date": "2026-11-11",
   "changePct": 0.7,
   "close": 271000,
   "closeDate": "2026-11-10"
  },
  "035420": {
   "price": 197500,
   "date": "2026-11-11",
   "changePct": 2.3,
   "close": 193000,
   "closeDate": "2026-11-10"
  },
  "010120": {
   "price": 115700,
   "date": "2026-11-11",
   "changePct": -4.4,
   "close": 121000,
   "closeDate": "2026-11-10"
  },
  "030200": {
   "price": 51300,
   "date": "2026-11-11",
   "changePct": 0.6,
   "close": 51000,
   "closeDate": "2026-11-10"
  },
  "012330": {
   "price": 355500,
   "date": "2026-11-11",
   "changePct": 1.1,
   "close": 351500,
   "closeDate": "2026-11-10"
  },
  "047050": {
   "price": 50200,
   "date": "2026-11-11",
   "changePct": 1.8,
   "close": 49300,
   "closeDate": "2026-11-10"
  },
  "030190": {
   "price": 18390,
   "date": "2026-11-11",
   "changePct": 1.9,
   "close": 18040,
   "closeDate": "2026-11-10"
  },
  "042700": {
   "price": 177600,
   "date": "2026-11-11",
   "changePct": 2.4,
   "close": 173400,
   "closeDate": "2026-11-10"
  },
  "064400": {
   "price": 80100,
   "date": "2026-11-11",
   "changePct": 0,
   "close": 80100,
   "closeDate": "2026-11-10"
  },
  "095340": {
   "price": 145600,
   "date": "2026-11-11",
   "changePct": 9.6,
   "close": 132900,
   "closeDate": "2026-11-10"
  },
  "MSFT": {
   "price": 533.16,
   "date": "2026-11-10",
   "changePct": -2.2,
   "close": 533.16,
   "closeDate": "2026-11-10"
  },
  "V": {
   "price": 423,
   "date": "2026-11-10",
   "changePct": 0.2,
   "close": 423,
   "closeDate": "2026-11-10"
  },
  "MA": {
   "price": 658.84,
   "date": "2026-11-10",
   "changePct": 0.5,
   "close": 658.84,
   "closeDate": "2026-11-10"
  },
  "GOOGL": {
   "price": 287.38,
   "date": "2026-11-10",
   "changePct": -0.3,
   "close": 287.38,
   "closeDate": "2026-11-10"
  },
  "COST": {
   "price": 1066.14,
   "date": "2026-11-10",
   "changePct": 0,
   "close": 1066.14,
   "closeDate": "2026-11-10"
  },
  "NVDA": {
   "price": 168.89,
   "date": "2026-11-10",
   "changePct": -5.5,
   "close": 168.89,
   "closeDate": "2026-11-10"
  },
  "META": {
   "price": 641.39,
   "date": "2026-11-10",
   "changePct": 0,
   "close": 641.39,
   "closeDate": "2026-11-10"
  },
  "AVGO": {
   "price": 331.98,
   "date": "2026-11-10",
   "changePct": 3.9,
   "close": 331.98,
   "closeDate": "2026-11-10"
  },
  "TSM": {
   "price": 396.48,
   "date": "2026-11-10",
   "changePct": 2,
   "close": 396.48,
   "closeDate": "2026-11-10"
  },
  "UBER": {
   "price": 70.05,
   "date": "2026-11-10",
   "changePct": -1.6,
   "close": 70.05,
   "closeDate": "2026-11-10"
  },
  "GM": {
   "price": 88.69,
   "date": "2026-11-10",
   "changePct": -1.1,
   "close": 88.69,
   "closeDate": "2026-11-10"
  },
  "VZ": {
   "price": 46.31,
   "date": "2026-11-10",
   "changePct": 0.5,
   "close": 46.31,
   "closeDate": "2026-11-10"
  },
  "C": {
   "price": 122.27,
   "date": "2026-11-10",
   "changePct": 0.2,
   "close": 122.27,
   "closeDate": "2026-11-10"
  },
  "DUK": {
   "price": 128.94,
   "date": "2026-11-10",
   "changePct": 0.7,
   "close": 128.94,
   "closeDate": "2026-11-10"
  },
  "KO": {
   "price": 96.91,
   "date": "2026-11-10",
   "changePct": 0.9,
   "close": 96.91,
   "closeDate": "2026-11-10"
  },
  "JNJ": {
   "price": 280.78,
   "date": "2026-11-10",
   "changePct": -0.5,
   "close": 280.78,
   "closeDate": "2026-11-10"
  },
  "LLY": {
   "price": 1432.29,
   "date": "2026-11-10",
   "changePct": 1.4,
   "close": 1432.29,
   "closeDate": "2026-11-10"
  },
  "CI": {
   "price": 303.13,
   "date": "2026-11-10",
   "changePct": 2.5,
   "close": 303.13,
   "closeDate": "2026-11-10"
  },
  "TSLA": {
   "price": 379.78,
   "date": "2026-11-10",
   "changePct": 0.5,
   "close": 379.78,
   "closeDate": "2026-11-10"
  },
  "AAPL": {
   "price": 348.51,
   "date": "2026-11-10",
   "changePct": -0.6,
   "close": 348.51,
   "closeDate": "2026-11-10"
  },
  "MU": {
   "price": 725.11,
   "date": "2026-11-10",
   "changePct": -1.1,
   "close": 725.11,
   "closeDate": "2026-11-10"
  },
  "MDT": {
   "price": 101.59,
   "date": "2026-11-10",
   "changePct": -1.2,
   "close": 101.59,
   "closeDate": "2026-11-10"
  },
  "IREN": {
   "price": 19.73,
   "date": "2026-11-10",
   "changePct": -7.8,
   "close": 19.73,
   "closeDate": "2026-11-10"
  },
  "UNH": {
   "price": 405.12,
   "date": "2026-11-10",
   "changePct": 1.9,
   "close": 405.12,
   "closeDate": "2026-11-10"
  },
  "DVN": {
   "price": 43.41,
   "date": "2026-11-10",
   "changePct": 2.4,
   "close": 43.41,
   "closeDate": "2026-11-10"
  },
  "GS": {
   "price": 910.19,
   "date": "2026-11-10",
   "changePct": 0.4,
   "close": 910.19,
   "closeDate": "2026-11-10"
  },
  "AMP": {
   "price": 519.96,
   "date": "2026-11-10",
   "changePct": 0.3,
   "close": 519.96,
   "closeDate": "2026-11-10"
  },
  "PNC": {
   "price": 231.3,
   "date": "2026-11-10",
   "changePct": 0,
   "close": 231.3,
   "closeDate": "2026-11-10"
  },
  "MTB": {
   "price": 220.61,
   "date": "2026-11-10",
   "changePct": -1,
   "close": 220.61,
   "closeDate": "2026-11-10"
  },
  "SO": {
   "price": 93.65,
   "date": "2026-11-10",
   "changePct": 0.1,
   "close": 93.65,
   "closeDate": "2026-11-10"
  },
  "WEC": {
   "price": 117.01,
   "date": "2026-11-10",
   "changePct": -0.1,
   "close": 117.01,
   "closeDate": "2026-11-10"
  },
  "TJX": {
   "price": 136.92,
   "date": "2026-11-10",
   "changePct": -0.9,
   "close": 136.92,
   "closeDate": "2026-11-10"
  },
  "ANET": {
   "price": 185.02,
   "date": "2026-11-10",
   "changePct": -0.6,
   "close": 185.02,
   "closeDate": "2026-11-10"
  },
  "GD": {
   "price": 367.44,
   "date": "2026-11-10",
   "changePct": 1.5,
   "close": 367.44,
   "closeDate": "2026-11-10"
  },
  "LMT": {
   "price": 603.12,
   "date": "2026-11-10",
   "changePct": 2.5,
   "close": 603.12,
   "closeDate": "2026-11-10"
  },
  "CB": {
   "price": 369.11,
   "date": "2026-11-10",
   "changePct": 1.6,
   "close": 369.11,
   "closeDate": "2026-11-10"
  },
  "GILD": {
   "price": 170.87,
   "date": "2026-11-10",
   "changePct": 0.9,
   "close": 170.87,
   "closeDate": "2026-11-10"
  },
  "BRK.B": {
   "price": 583.34,
   "date": "2026-11-10",
   "changePct": 1.4,
   "close": 583.34,
   "closeDate": "2026-11-10"
  },
  "TMO": {
   "price": 718.2,
   "date": "2026-11-10",
   "changePct": -0.5,
   "close": 718.2,
   "closeDate": "2026-11-10"
  },
  "ECL": {
   "price": 306.03,
   "date": "2026-11-10",
   "changePct": -0.2,
   "close": 306.03,
   "closeDate": "2026-11-10"
  },
  "RSG": {
   "price": 247.62,
   "date": "2026-11-10",
   "changePct": 0.3,
   "close": 247.62,
   "closeDate": "2026-11-10"
  },
  "CTAS": {
   "price": 225.28,
   "date": "2026-11-10",
   "changePct": 0.9,
   "close": 225.28,
   "closeDate": "2026-11-10"
  },
  "ORLY": {
   "price": 89.39,
   "date": "2026-11-10",
   "changePct": -0.4,
   "close": 89.39,
   "closeDate": "2026-11-10"
  },
  "ADP": {
   "price": 305.44,
   "date": "2026-11-10",
   "changePct": 1.1,
   "close": 305.44,
   "closeDate": "2026-11-10"
  },
  "FAST": {
   "price": 54.84,
   "date": "2026-11-10",
   "changePct": 0.5,
   "close": 54.84,
   "closeDate": "2026-11-10"
  },
  "VRT": {
   "price": 194.22,
   "date": "2026-11-10",
   "changePct": -3.1,
   "close": 194.22,
   "closeDate": "2026-11-10"
  },
  "WAB": {
   "price": 303.49,
   "date": "2026-11-10",
   "changePct": 1.8,
   "close": 303.49,
   "closeDate": "2026-11-10"
  },
  "NTES": {
   "price": 128.03,
   "date": "2026-11-10",
   "changePct": -1.2,
   "close": 128.03,
   "closeDate": "2026-11-10"
  },
  "ROST": {
   "price": 238.95,
   "date": "2026-11-10",
   "changePct": 0.8,
   "close": 238.95,
   "closeDate": "2026-11-10"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5212.06,
   "date": "2026-11-11",
   "changePct": -0.5,
   "close": 5239.13,
   "closeDate": "2026-11-10"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7520.93,
   "date": "2026-11-10",
   "changePct": -0.4,
   "close": 7520.93,
   "closeDate": "2026-11-10"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 220.88,
   "date": "2026-11-10",
   "changePct": 0,
   "close": 220.88,
   "closeDate": "2026-11-10"
  }
 }
};
