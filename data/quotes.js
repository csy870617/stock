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
   "price": 533.69,
   "date": "2026-10-14",
   "changePct": -1.8,
   "close": 533.69,
   "closeDate": "2026-10-14"
  },
  "V": {
   "price": 391.43,
   "date": "2026-10-14",
   "changePct": -1.2,
   "close": 391.43,
   "closeDate": "2026-10-14"
  },
  "MA": {
   "price": 603.24,
   "date": "2026-10-14",
   "changePct": -0.3,
   "close": 603.24,
   "closeDate": "2026-10-14"
  },
  "GOOGL": {
   "price": 347.64,
   "date": "2026-10-14",
   "changePct": -1.7,
   "close": 347.64,
   "closeDate": "2026-10-14"
  },
  "AMZN": {
   "price": 254.08,
   "date": "2026-10-14",
   "changePct": -1.7,
   "close": 254.08,
   "closeDate": "2026-10-14"
  },
  "COST": {
   "price": 982,
   "date": "2026-10-14",
   "changePct": 2.9,
   "close": 982,
   "closeDate": "2026-10-14"
  },
  "NVDA": {
   "price": 221.3,
   "date": "2026-10-14",
   "changePct": -3.2,
   "close": 221.3,
   "closeDate": "2026-10-14"
  },
  "META": {
   "price": 737.54,
   "date": "2026-10-14",
   "changePct": -3.3,
   "close": 737.54,
   "closeDate": "2026-10-14"
  },
  "AVGO": {
   "price": 346.25,
   "date": "2026-10-14",
   "changePct": -3.1,
   "close": 346.25,
   "closeDate": "2026-10-14"
  },
  "TSM": {
   "price": 430,
   "date": "2026-10-14",
   "changePct": -3.4,
   "close": 430,
   "closeDate": "2026-10-14"
  },
  "UBER": {
   "price": 69.29,
   "date": "2026-10-14",
   "changePct": -2.8,
   "close": 69.29,
   "closeDate": "2026-10-14"
  },
  "GM": {
   "price": 83.05,
   "date": "2026-10-14",
   "changePct": -1.1,
   "close": 83.05,
   "closeDate": "2026-10-14"
  },
  "VZ": {
   "price": 44.42,
   "date": "2026-10-14",
   "changePct": 2,
   "close": 44.42,
   "closeDate": "2026-10-14"
  },
  "C": {
   "price": 122.27,
   "date": "2026-10-14",
   "changePct": -1.8,
   "close": 122.27,
   "closeDate": "2026-10-14"
  },
  "O": {
   "price": 55.17,
   "date": "2026-10-14",
   "changePct": 0.3,
   "close": 55.17,
   "closeDate": "2026-10-14"
  },
  "DUK": {
   "price": 119.64,
   "date": "2026-10-14",
   "changePct": 1.2,
   "close": 119.64,
   "closeDate": "2026-10-14"
  },
  "XOM": {
   "price": 177.01,
   "date": "2026-10-14",
   "changePct": 1.7,
   "close": 177.01,
   "closeDate": "2026-10-14"
  },
  "KO": {
   "price": 91.78,
   "date": "2026-10-14",
   "changePct": 1.9,
   "close": 91.78,
   "closeDate": "2026-10-14"
  },
  "JNJ": {
   "price": 253.91,
   "date": "2026-10-14",
   "changePct": 2.1,
   "close": 253.91,
   "closeDate": "2026-10-14"
  },
  "AXON": {
   "price": 408.42,
   "date": "2026-10-14",
   "changePct": -1.2,
   "close": 408.42,
   "closeDate": "2026-10-14"
  },
  "NXT": {
   "price": 82.56,
   "date": "2026-10-14",
   "changePct": -7,
   "close": 82.56,
   "closeDate": "2026-10-14"
  },
  "TCOM": {
   "price": 38.88,
   "date": "2026-10-14",
   "changePct": 0.3,
   "close": 38.88,
   "closeDate": "2026-10-14"
  },
  "LLY": {
   "price": 1208.74,
   "date": "2026-10-14",
   "changePct": 3.6,
   "close": 1208.74,
   "closeDate": "2026-10-14"
  },
  "CVX": {
   "price": 222.04,
   "date": "2026-10-14",
   "changePct": 2,
   "close": 222.04,
   "closeDate": "2026-10-14"
  },
  "CI": {
   "price": 289.58,
   "date": "2026-10-14",
   "changePct": 2.5,
   "close": 289.58,
   "closeDate": "2026-10-14"
  },
  "ALGN": {
   "price": 144.44,
   "date": "2026-10-14",
   "changePct": 0.6,
   "close": 144.44,
   "closeDate": "2026-10-14"
  },
  "NOW": {
   "price": 139.98,
   "date": "2026-10-14",
   "changePct": 1,
   "close": 139.98,
   "closeDate": "2026-10-14"
  },
  "TSLA": {
   "price": 367.16,
   "date": "2026-10-14",
   "changePct": -2.2,
   "close": 367.16,
   "closeDate": "2026-10-14"
  },
  "PG": {
   "price": 156.53,
   "date": "2026-10-14",
   "changePct": 2.3,
   "close": 156.53,
   "closeDate": "2026-10-14"
  },
  "MDLZ": {
   "price": 62.57,
   "date": "2026-10-14",
   "changePct": 1.7,
   "close": 62.57,
   "closeDate": "2026-10-14"
  },
  "AAPL": {
   "price": 342.96,
   "date": "2026-10-14",
   "changePct": 0.5,
   "close": 342.96,
   "closeDate": "2026-10-14"
  },
  "ABT": {
   "price": 102.97,
   "date": "2026-10-14",
   "changePct": 0.4,
   "close": 102.97,
   "closeDate": "2026-10-14"
  },
  "MU": {
   "price": 914.13,
   "date": "2026-10-14",
   "changePct": -4.1,
   "close": 914.13,
   "closeDate": "2026-10-14"
  },
  "MDT": {
   "price": 94.23,
   "date": "2026-10-14",
   "changePct": 1.3,
   "close": 94.23,
   "closeDate": "2026-10-14"
  },
  "IREN": {
   "price": 30.56,
   "date": "2026-10-14",
   "changePct": -12.2,
   "close": 30.56,
   "closeDate": "2026-10-14"
  },
  "UNH": {
   "price": 395.62,
   "date": "2026-10-14",
   "changePct": 4.7,
   "close": 395.62,
   "closeDate": "2026-10-14"
  },
  "MCHP": {
   "price": 71.25,
   "date": "2026-10-14",
   "changePct": -3.9,
   "close": 71.25,
   "closeDate": "2026-10-14"
  },
  "GILD": {
   "price": 153.54,
   "date": "2026-10-14",
   "changePct": 3.8,
   "close": 153.54,
   "closeDate": "2026-10-14"
  },
  "BRK.B": {
   "price": 526.35,
   "date": "2026-10-14",
   "changePct": 1.1,
   "close": 526.35,
   "closeDate": "2026-10-14"
  },
  "TMO": {
   "price": 673.2,
   "date": "2026-10-14",
   "changePct": 1.5,
   "close": 673.2,
   "closeDate": "2026-10-14"
  },
  "ECL": {
   "price": 287.71,
   "date": "2026-10-14",
   "changePct": 0.7,
   "close": 287.71,
   "closeDate": "2026-10-14"
  },
  "APH": {
   "price": 82.69,
   "date": "2026-10-14",
   "changePct": -3.7,
   "close": 82.69,
   "closeDate": "2026-10-14"
  },
  "NVT": {
   "price": 152.72,
   "date": "2026-10-14",
   "changePct": -5.4,
   "close": 152.72,
   "closeDate": "2026-10-14"
  },
  "FSS": {
   "price": 113,
   "date": "2026-10-14",
   "changePct": -1.1,
   "close": 113,
   "closeDate": "2026-10-14"
  },
  "MKSI": {
   "price": 234.5,
   "date": "2026-10-14",
   "changePct": -5.3,
   "close": 234.5,
   "closeDate": "2026-10-14"
  },
  "AAON": {
   "price": 80.53,
   "date": "2026-10-14",
   "changePct": -6.6,
   "close": 80.53,
   "closeDate": "2026-10-14"
  },
  "NVMI": {
   "price": 331.38,
   "date": "2026-10-14",
   "changePct": -3.2,
   "close": 331.38,
   "closeDate": "2026-10-14"
  },
  "POWL": {
   "price": 169.53,
   "date": "2026-10-14",
   "changePct": -7.3,
   "close": 169.53,
   "closeDate": "2026-10-14"
  },
  "TXN": {
   "price": 280.65,
   "date": "2026-10-14",
   "changePct": -2.5,
   "close": 280.65,
   "closeDate": "2026-10-14"
  },
  "MSI": {
   "price": 451.73,
   "date": "2026-10-14",
   "changePct": 0.6,
   "close": 451.73,
   "closeDate": "2026-10-14"
  },
  "SNY": {
   "price": 39.77,
   "date": "2026-10-14",
   "changePct": 1.7,
   "close": 39.77,
   "closeDate": "2026-10-14"
  },
  "DVN": {
   "price": 49.92,
   "date": "2026-10-14",
   "changePct": -0.6,
   "close": 49.92,
   "closeDate": "2026-10-14"
  },
  "RBC": {
   "price": 498.54,
   "date": "2026-10-14",
   "changePct": -2.2,
   "close": 498.54,
   "closeDate": "2026-10-14"
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
   "price": 7718.94,
   "date": "2026-10-14",
   "changePct": -1.1,
   "close": 7718.94,
   "closeDate": "2026-10-14"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 212.09,
   "date": "2026-10-14",
   "changePct": -0.6,
   "close": 212.09,
   "closeDate": "2026-10-14"
  }
 }
};
