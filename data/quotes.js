// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-14",
 "quotes": {
  "105560": {
   "price": 159200,
   "date": "2026-10-14",
   "changePct": -2,
   "close": 159200,
   "closeDate": "2026-10-14"
  },
  "139130": {
   "price": 16760,
   "date": "2026-10-14",
   "changePct": -4.5,
   "close": 16760,
   "closeDate": "2026-10-14"
  },
  "175330": {
   "price": 26450,
   "date": "2026-10-14",
   "changePct": -6.2,
   "close": 26450,
   "closeDate": "2026-10-14"
  },
  "207940": {
   "price": 1182000,
   "date": "2026-10-14",
   "changePct": -2,
   "close": 1182000,
   "closeDate": "2026-10-14"
  },
  "213420": {
   "price": 27650,
   "date": "2026-10-14",
   "changePct": -0.2,
   "close": 27650,
   "closeDate": "2026-10-14"
  },
  "257720": {
   "price": 31950,
   "date": "2026-10-14",
   "changePct": -1.8,
   "close": 31950,
   "closeDate": "2026-10-14"
  },
  "267260": {
   "price": 543000,
   "date": "2026-10-14",
   "changePct": -3,
   "close": 543000,
   "closeDate": "2026-10-14"
  },
  "316140": {
   "price": 31000,
   "date": "2026-10-14",
   "changePct": -3.1,
   "close": 31000,
   "closeDate": "2026-10-14"
  },
  "323410": {
   "price": 20050,
   "date": "2026-10-14",
   "changePct": -0.5,
   "close": 20050,
   "closeDate": "2026-10-14"
  },
  "329180": {
   "price": 369000,
   "date": "2026-10-14",
   "changePct": 0.7,
   "close": 369000,
   "closeDate": "2026-10-14"
  },
  "361610": {
   "price": 18810,
   "date": "2026-10-14",
   "changePct": 3.5,
   "close": 18810,
   "closeDate": "2026-10-14"
  },
  "403870": {
   "price": 57100,
   "date": "2026-10-14",
   "changePct": -7.3,
   "close": 57100,
   "closeDate": "2026-10-14"
  },
  "005930": {
   "price": 232000,
   "date": "2026-10-14",
   "changePct": 0,
   "close": 232000,
   "closeDate": "2026-10-14"
  },
  "055550": {
   "price": 95000,
   "date": "2026-10-14",
   "changePct": -4.7,
   "close": 95000,
   "closeDate": "2026-10-14"
  },
  "000810": {
   "price": 582000,
   "date": "2026-10-14",
   "changePct": -4.9,
   "close": 582000,
   "closeDate": "2026-10-14"
  },
  "028260": {
   "price": 291500,
   "date": "2026-10-14",
   "changePct": -2.8,
   "close": 291500,
   "closeDate": "2026-10-14"
  },
  "012330": {
   "price": 358500,
   "date": "2026-10-14",
   "changePct": 2.9,
   "close": 358500,
   "closeDate": "2026-10-14"
  },
  "086790": {
   "price": 121600,
   "date": "2026-10-14",
   "changePct": -2.3,
   "close": 121600,
   "closeDate": "2026-10-14"
  },
  "000660": {
   "price": 1419000,
   "date": "2026-10-14",
   "changePct": -1.7,
   "close": 1419000,
   "closeDate": "2026-10-14"
  },
  "012450": {
   "price": 842000,
   "date": "2026-10-14",
   "changePct": 0.4,
   "close": 842000,
   "closeDate": "2026-10-14"
  },
  "009540": {
   "price": 276000,
   "date": "2026-10-14",
   "changePct": -0.7,
   "close": 276000,
   "closeDate": "2026-10-14"
  },
  "068270": {
   "price": 179800,
   "date": "2026-10-14",
   "changePct": 0.1,
   "close": 179800,
   "closeDate": "2026-10-14"
  },
  "035420": {
   "price": 179400,
   "date": "2026-10-14",
   "changePct": 0.8,
   "close": 179400,
   "closeDate": "2026-10-14"
  },
  "034020": {
   "price": 69400,
   "date": "2026-10-14",
   "changePct": -1.1,
   "close": 69400,
   "closeDate": "2026-10-14"
  },
  "000270": {
   "price": 108600,
   "date": "2026-10-14",
   "changePct": 0.3,
   "close": 108600,
   "closeDate": "2026-10-14"
  },
  "005490": {
   "price": 309000,
   "date": "2026-10-14",
   "changePct": 3.3,
   "close": 309000,
   "closeDate": "2026-10-14"
  },
  "015760": {
   "price": 29150,
   "date": "2026-10-14",
   "changePct": 0,
   "close": 29150,
   "closeDate": "2026-10-14"
  },
  "096770": {
   "price": 163200,
   "date": "2026-10-14",
   "changePct": 4.1,
   "close": 163200,
   "closeDate": "2026-10-14"
  },
  "051910": {
   "price": 267500,
   "date": "2026-10-14",
   "changePct": 2.1,
   "close": 267500,
   "closeDate": "2026-10-14"
  },
  "003490": {
   "price": 30150,
   "date": "2026-10-14",
   "changePct": -1.1,
   "close": 30150,
   "closeDate": "2026-10-14"
  },
  "032640": {
   "price": 14700,
   "date": "2026-10-14",
   "changePct": -0.5,
   "close": 14700,
   "closeDate": "2026-10-14"
  },
  "088980": {
   "price": 9620,
   "date": "2026-10-14",
   "changePct": -0.6,
   "close": 9620,
   "closeDate": "2026-10-14"
  },
  "029780": {
   "price": 42050,
   "date": "2026-10-14",
   "changePct": -1.5,
   "close": 42050,
   "closeDate": "2026-10-14"
  },
  "024110": {
   "price": 19710,
   "date": "2026-10-14",
   "changePct": -0.7,
   "close": 19710,
   "closeDate": "2026-10-14"
  },
  "058470": {
   "price": 76000,
   "date": "2026-10-14",
   "changePct": -4.5,
   "close": 76000,
   "closeDate": "2026-10-14"
  },
  "082920": {
   "price": 25300,
   "date": "2026-10-14",
   "changePct": 3.9,
   "close": 25300,
   "closeDate": "2026-10-14"
  },
  "064760": {
   "price": 259000,
   "date": "2026-10-14",
   "changePct": -5.6,
   "close": 259000,
   "closeDate": "2026-10-14"
  },
  "014680": {
   "price": 248500,
   "date": "2026-10-14",
   "changePct": -5,
   "close": 248500,
   "closeDate": "2026-10-14"
  },
  "039030": {
   "price": 468500,
   "date": "2026-10-14",
   "changePct": -5.2,
   "close": 468500,
   "closeDate": "2026-10-14"
  },
  "011780": {
   "price": 116700,
   "date": "2026-10-14",
   "changePct": 1.8,
   "close": 116700,
   "closeDate": "2026-10-14"
  },
  "035900": {
   "price": 37700,
   "date": "2026-10-14",
   "changePct": 0.5,
   "close": 37700,
   "closeDate": "2026-10-14"
  },
  "021240": {
   "price": 103100,
   "date": "2026-10-14",
   "changePct": 1.9,
   "close": 103100,
   "closeDate": "2026-10-14"
  },
  "036570": {
   "price": 206500,
   "date": "2026-10-14",
   "changePct": -0.2,
   "close": 206500,
   "closeDate": "2026-10-14"
  },
  "035720": {
   "price": 31700,
   "date": "2026-10-14",
   "changePct": 1.3,
   "close": 31700,
   "closeDate": "2026-10-14"
  },
  "001040": {
   "price": 125400,
   "date": "2026-10-14",
   "changePct": -2.5,
   "close": 125400,
   "closeDate": "2026-10-14"
  },
  "012750": {
   "price": 85700,
   "date": "2026-10-14",
   "changePct": -1.5,
   "close": 85700,
   "closeDate": "2026-10-14"
  },
  "047050": {
   "price": 57500,
   "date": "2026-10-14",
   "changePct": 1.6,
   "close": 57500,
   "closeDate": "2026-10-14"
  },
  "033780": {
   "price": 181800,
   "date": "2026-10-14",
   "changePct": 0.2,
   "close": 181800,
   "closeDate": "2026-10-14"
  },
  "001120": {
   "price": 44500,
   "date": "2026-10-14",
   "changePct": 1,
   "close": 44500,
   "closeDate": "2026-10-14"
  },
  "004370": {
   "price": 393500,
   "date": "2026-10-14",
   "changePct": -1.9,
   "close": 393500,
   "closeDate": "2026-10-14"
  },
  "062040": {
   "price": 212000,
   "date": "2026-10-14",
   "changePct": 0.5,
   "close": 212000,
   "closeDate": "2026-10-14"
  },
  "MSFT": {
   "price": 543.45,
   "date": "2026-10-13",
   "changePct": 0.4,
   "close": 543.45,
   "closeDate": "2026-10-13"
  },
  "V": {
   "price": 396.06,
   "date": "2026-10-13",
   "changePct": 1.7,
   "close": 396.06,
   "closeDate": "2026-10-13"
  },
  "MA": {
   "price": 604.8,
   "date": "2026-10-13",
   "changePct": 1.6,
   "close": 604.8,
   "closeDate": "2026-10-13"
  },
  "GOOGL": {
   "price": 353.78,
   "date": "2026-10-13",
   "changePct": 0.3,
   "close": 353.78,
   "closeDate": "2026-10-13"
  },
  "AMZN": {
   "price": 258.58,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 258.58,
   "closeDate": "2026-10-13"
  },
  "COST": {
   "price": 954.63,
   "date": "2026-10-13",
   "changePct": -0.5,
   "close": 954.63,
   "closeDate": "2026-10-13"
  },
  "NVDA": {
   "price": 228.52,
   "date": "2026-10-13",
   "changePct": 1,
   "close": 228.52,
   "closeDate": "2026-10-13"
  },
  "META": {
   "price": 762.5,
   "date": "2026-10-13",
   "changePct": 2.6,
   "close": 762.5,
   "closeDate": "2026-10-13"
  },
  "AVGO": {
   "price": 357.31,
   "date": "2026-10-13",
   "changePct": 0.7,
   "close": 357.31,
   "closeDate": "2026-10-13"
  },
  "TSM": {
   "price": 445.12,
   "date": "2026-10-13",
   "changePct": 0.2,
   "close": 445.12,
   "closeDate": "2026-10-13"
  },
  "UBER": {
   "price": 71.32,
   "date": "2026-10-13",
   "changePct": -0.3,
   "close": 71.32,
   "closeDate": "2026-10-13"
  },
  "GM": {
   "price": 84,
   "date": "2026-10-13",
   "changePct": 2,
   "close": 84,
   "closeDate": "2026-10-13"
  },
  "VZ": {
   "price": 43.53,
   "date": "2026-10-13",
   "changePct": 1.8,
   "close": 43.53,
   "closeDate": "2026-10-13"
  },
  "C": {
   "price": 124.53,
   "date": "2026-10-13",
   "changePct": -5.6,
   "close": 124.53,
   "closeDate": "2026-10-13"
  },
  "O": {
   "price": 54.99,
   "date": "2026-10-13",
   "changePct": 0.5,
   "close": 54.99,
   "closeDate": "2026-10-13"
  },
  "DUK": {
   "price": 118.19,
   "date": "2026-10-13",
   "changePct": 0.4,
   "close": 118.19,
   "closeDate": "2026-10-13"
  },
  "XOM": {
   "price": 174.08,
   "date": "2026-10-13",
   "changePct": 1.1,
   "close": 174.08,
   "closeDate": "2026-10-13"
  },
  "KO": {
   "price": 90.11,
   "date": "2026-10-13",
   "changePct": 0.4,
   "close": 90.11,
   "closeDate": "2026-10-13"
  },
  "JNJ": {
   "price": 248.61,
   "date": "2026-10-13",
   "changePct": -5.7,
   "close": 248.61,
   "closeDate": "2026-10-13"
  },
  "AXON": {
   "price": 413.35,
   "date": "2026-10-13",
   "changePct": -0.3,
   "close": 413.35,
   "closeDate": "2026-10-13"
  },
  "NXT": {
   "price": 88.77,
   "date": "2026-10-13",
   "changePct": 4.6,
   "close": 88.77,
   "closeDate": "2026-10-13"
  },
  "TCOM": {
   "price": 38.75,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 38.75,
   "closeDate": "2026-10-13"
  },
  "LLY": {
   "price": 1166.51,
   "date": "2026-10-13",
   "changePct": -1.4,
   "close": 1166.51,
   "closeDate": "2026-10-13"
  },
  "CVX": {
   "price": 217.73,
   "date": "2026-10-13",
   "changePct": 1.3,
   "close": 217.73,
   "closeDate": "2026-10-13"
  },
  "CI": {
   "price": 282.53,
   "date": "2026-10-13",
   "changePct": -0.3,
   "close": 282.53,
   "closeDate": "2026-10-13"
  },
  "ALGN": {
   "price": 143.54,
   "date": "2026-10-13",
   "changePct": 2.2,
   "close": 143.54,
   "closeDate": "2026-10-13"
  },
  "NOW": {
   "price": 138.61,
   "date": "2026-10-13",
   "changePct": -1.2,
   "close": 138.61,
   "closeDate": "2026-10-13"
  },
  "TSLA": {
   "price": 375.23,
   "date": "2026-10-13",
   "changePct": -0.7,
   "close": 375.23,
   "closeDate": "2026-10-13"
  },
  "PG": {
   "price": 153.04,
   "date": "2026-10-13",
   "changePct": -0.1,
   "close": 153.04,
   "closeDate": "2026-10-13"
  },
  "MDLZ": {
   "price": 61.5,
   "date": "2026-10-13",
   "changePct": -0.5,
   "close": 61.5,
   "closeDate": "2026-10-13"
  },
  "AAPL": {
   "price": 341.27,
   "date": "2026-10-13",
   "changePct": 0.1,
   "close": 341.27,
   "closeDate": "2026-10-13"
  },
  "ABT": {
   "price": 102.61,
   "date": "2026-10-13",
   "changePct": 0.8,
   "close": 102.61,
   "closeDate": "2026-10-13"
  },
  "MU": {
   "price": 953.19,
   "date": "2026-10-13",
   "changePct": -3.6,
   "close": 953.19,
   "closeDate": "2026-10-13"
  },
  "MDT": {
   "price": 93.01,
   "date": "2026-10-13",
   "changePct": 1.2,
   "close": 93.01,
   "closeDate": "2026-10-13"
  },
  "IREN": {
   "price": 34.8,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 34.8,
   "closeDate": "2026-10-13"
  },
  "UNH": {
   "price": 377.76,
   "date": "2026-10-13",
   "changePct": -0.2,
   "close": 377.76,
   "closeDate": "2026-10-13"
  },
  "MCHP": {
   "price": 74.16,
   "date": "2026-10-13",
   "changePct": 0.4,
   "close": 74.16,
   "closeDate": "2026-10-13"
  },
  "GILD": {
   "price": 147.92,
   "date": "2026-10-13",
   "changePct": -1.7,
   "close": 147.92,
   "closeDate": "2026-10-13"
  },
  "BRK.B": {
   "price": 520.59,
   "date": "2026-10-13",
   "changePct": 0.6,
   "close": 520.59,
   "closeDate": "2026-10-13"
  },
  "TMO": {
   "price": 663.04,
   "date": "2026-10-13",
   "changePct": 0.1,
   "close": 663.04,
   "closeDate": "2026-10-13"
  },
  "ECL": {
   "price": 285.66,
   "date": "2026-10-13",
   "changePct": 0.5,
   "close": 285.66,
   "closeDate": "2026-10-13"
  },
  "APH": {
   "price": 85.89,
   "date": "2026-10-13",
   "changePct": -0.3,
   "close": 85.89,
   "closeDate": "2026-10-13"
  },
  "NVT": {
   "price": 161.47,
   "date": "2026-10-13",
   "changePct": -0.8,
   "close": 161.47,
   "closeDate": "2026-10-13"
  },
  "FSS": {
   "price": 114.24,
   "date": "2026-10-13",
   "changePct": -0.5,
   "close": 114.24,
   "closeDate": "2026-10-13"
  },
  "MKSI": {
   "price": 247.56,
   "date": "2026-10-13",
   "changePct": -0.9,
   "close": 247.56,
   "closeDate": "2026-10-13"
  },
  "AAON": {
   "price": 86.19,
   "date": "2026-10-13",
   "changePct": 1.7,
   "close": 86.19,
   "closeDate": "2026-10-13"
  },
  "NVMI": {
   "price": 342.29,
   "date": "2026-10-13",
   "changePct": 0.6,
   "close": 342.29,
   "closeDate": "2026-10-13"
  },
  "POWL": {
   "price": 182.79,
   "date": "2026-10-13",
   "changePct": -1.4,
   "close": 182.79,
   "closeDate": "2026-10-13"
  },
  "TXN": {
   "price": 287.85,
   "date": "2026-10-13",
   "changePct": 2.2,
   "close": 287.85,
   "closeDate": "2026-10-13"
  },
  "MSI": {
   "price": 449.01,
   "date": "2026-10-13",
   "changePct": 0.6,
   "close": 449.01,
   "closeDate": "2026-10-13"
  },
  "SNY": {
   "price": 39.12,
   "date": "2026-10-13",
   "changePct": -1.6,
   "close": 39.12,
   "closeDate": "2026-10-13"
  },
  "DVN": {
   "price": 50.21,
   "date": "2026-10-13",
   "changePct": 2.6,
   "close": 50.21,
   "closeDate": "2026-10-13"
  },
  "RBC": {
   "price": 510.01,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 510.01,
   "closeDate": "2026-10-13"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 6008.81,
   "date": "2026-10-14",
   "changePct": -0.4,
   "close": 6008.81,
   "closeDate": "2026-10-14"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7805.45,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 7805.45,
   "closeDate": "2026-10-13"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 213.3,
   "date": "2026-10-13",
   "changePct": 0.1,
   "close": 213.3,
   "closeDate": "2026-10-13"
  }
 }
};
