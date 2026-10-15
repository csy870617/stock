// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-15",
 "quotes": {
  "105560": {
   "price": 156700,
   "date": "2026-10-15",
   "changePct": -1.6,
   "close": 156700,
   "closeDate": "2026-10-15"
  },
  "139130": {
   "price": 16800,
   "date": "2026-10-15",
   "changePct": 0.2,
   "close": 16800,
   "closeDate": "2026-10-15"
  },
  "175330": {
   "price": 26650,
   "date": "2026-10-15",
   "changePct": 0.8,
   "close": 26650,
   "closeDate": "2026-10-15"
  },
  "207940": {
   "price": 1247000,
   "date": "2026-10-15",
   "changePct": 5.5,
   "close": 1247000,
   "closeDate": "2026-10-15"
  },
  "213420": {
   "price": 25800,
   "date": "2026-10-15",
   "changePct": -6.7,
   "close": 25800,
   "closeDate": "2026-10-15"
  },
  "257720": {
   "price": 31800,
   "date": "2026-10-15",
   "changePct": -0.5,
   "close": 31800,
   "closeDate": "2026-10-15"
  },
  "267260": {
   "price": 487000,
   "date": "2026-10-15",
   "changePct": -10.3,
   "close": 487000,
   "closeDate": "2026-10-15"
  },
  "316140": {
   "price": 31150,
   "date": "2026-10-15",
   "changePct": 0.5,
   "close": 31150,
   "closeDate": "2026-10-15"
  },
  "323410": {
   "price": 20100,
   "date": "2026-10-15",
   "changePct": 0.2,
   "close": 20100,
   "closeDate": "2026-10-15"
  },
  "329180": {
   "price": 352500,
   "date": "2026-10-15",
   "changePct": -4.5,
   "close": 352500,
   "closeDate": "2026-10-15"
  },
  "361610": {
   "price": 17760,
   "date": "2026-10-15",
   "changePct": -5.6,
   "close": 17760,
   "closeDate": "2026-10-15"
  },
  "403870": {
   "price": 49750,
   "date": "2026-10-15",
   "changePct": -12.9,
   "close": 49750,
   "closeDate": "2026-10-15"
  },
  "005930": {
   "price": 210000,
   "date": "2026-10-15",
   "changePct": -9.5,
   "close": 210000,
   "closeDate": "2026-10-15"
  },
  "055550": {
   "price": 94200,
   "date": "2026-10-15",
   "changePct": -0.8,
   "close": 94200,
   "closeDate": "2026-10-15"
  },
  "000810": {
   "price": 580000,
   "date": "2026-10-15",
   "changePct": -0.3,
   "close": 580000,
   "closeDate": "2026-10-15"
  },
  "028260": {
   "price": 267500,
   "date": "2026-10-15",
   "changePct": -8.2,
   "close": 267500,
   "closeDate": "2026-10-15"
  },
  "012330": {
   "price": 337500,
   "date": "2026-10-15",
   "changePct": -5.9,
   "close": 337500,
   "closeDate": "2026-10-15"
  },
  "086790": {
   "price": 122400,
   "date": "2026-10-15",
   "changePct": 0.7,
   "close": 122400,
   "closeDate": "2026-10-15"
  },
  "000660": {
   "price": 1262000,
   "date": "2026-10-15",
   "changePct": -11.1,
   "close": 1262000,
   "closeDate": "2026-10-15"
  },
  "012450": {
   "price": 824000,
   "date": "2026-10-15",
   "changePct": -2.1,
   "close": 824000,
   "closeDate": "2026-10-15"
  },
  "009540": {
   "price": 263000,
   "date": "2026-10-15",
   "changePct": -4.7,
   "close": 263000,
   "closeDate": "2026-10-15"
  },
  "068270": {
   "price": 182100,
   "date": "2026-10-15",
   "changePct": 1.3,
   "close": 182100,
   "closeDate": "2026-10-15"
  },
  "035420": {
   "price": 173600,
   "date": "2026-10-15",
   "changePct": -3.2,
   "close": 173600,
   "closeDate": "2026-10-15"
  },
  "034020": {
   "price": 63300,
   "date": "2026-10-15",
   "changePct": -8.8,
   "close": 63300,
   "closeDate": "2026-10-15"
  },
  "000270": {
   "price": 105900,
   "date": "2026-10-15",
   "changePct": -2.5,
   "close": 105900,
   "closeDate": "2026-10-15"
  },
  "005490": {
   "price": 292000,
   "date": "2026-10-15",
   "changePct": -5.5,
   "close": 292000,
   "closeDate": "2026-10-15"
  },
  "015760": {
   "price": 28450,
   "date": "2026-10-15",
   "changePct": -2.4,
   "close": 28450,
   "closeDate": "2026-10-15"
  },
  "096770": {
   "price": 155000,
   "date": "2026-10-15",
   "changePct": -5,
   "close": 155000,
   "closeDate": "2026-10-15"
  },
  "051910": {
   "price": 252000,
   "date": "2026-10-15",
   "changePct": -5.8,
   "close": 252000,
   "closeDate": "2026-10-15"
  },
  "003490": {
   "price": 29450,
   "date": "2026-10-15",
   "changePct": -2.3,
   "close": 29450,
   "closeDate": "2026-10-15"
  },
  "032640": {
   "price": 15070,
   "date": "2026-10-15",
   "changePct": 2.5,
   "close": 15070,
   "closeDate": "2026-10-15"
  },
  "088980": {
   "price": 9620,
   "date": "2026-10-15",
   "changePct": 0,
   "close": 9620,
   "closeDate": "2026-10-15"
  },
  "029780": {
   "price": 42200,
   "date": "2026-10-15",
   "changePct": 0.4,
   "close": 42200,
   "closeDate": "2026-10-15"
  },
  "024110": {
   "price": 19740,
   "date": "2026-10-15",
   "changePct": 0.2,
   "close": 19740,
   "closeDate": "2026-10-15"
  },
  "058470": {
   "price": 67200,
   "date": "2026-10-15",
   "changePct": -11.6,
   "close": 67200,
   "closeDate": "2026-10-15"
  },
  "082920": {
   "price": 23200,
   "date": "2026-10-15",
   "changePct": -8.3,
   "close": 23200,
   "closeDate": "2026-10-15"
  },
  "064760": {
   "price": 224500,
   "date": "2026-10-15",
   "changePct": -13.3,
   "close": 224500,
   "closeDate": "2026-10-15"
  },
  "014680": {
   "price": 231500,
   "date": "2026-10-15",
   "changePct": -6.8,
   "close": 231500,
   "closeDate": "2026-10-15"
  },
  "039030": {
   "price": 423000,
   "date": "2026-10-15",
   "changePct": -9.7,
   "close": 423000,
   "closeDate": "2026-10-15"
  },
  "011780": {
   "price": 114300,
   "date": "2026-10-15",
   "changePct": -2.1,
   "close": 114300,
   "closeDate": "2026-10-15"
  },
  "035900": {
   "price": 37400,
   "date": "2026-10-15",
   "changePct": -0.8,
   "close": 37400,
   "closeDate": "2026-10-15"
  },
  "021240": {
   "price": 105000,
   "date": "2026-10-15",
   "changePct": 1.8,
   "close": 105000,
   "closeDate": "2026-10-15"
  },
  "036570": {
   "price": 201000,
   "date": "2026-10-15",
   "changePct": -2.7,
   "close": 201000,
   "closeDate": "2026-10-15"
  },
  "035720": {
   "price": 31000,
   "date": "2026-10-15",
   "changePct": -2.2,
   "close": 31000,
   "closeDate": "2026-10-15"
  },
  "001040": {
   "price": 123500,
   "date": "2026-10-15",
   "changePct": -1.5,
   "close": 123500,
   "closeDate": "2026-10-15"
  },
  "012750": {
   "price": 97600,
   "date": "2026-10-15",
   "changePct": 13.9,
   "close": 97600,
   "closeDate": "2026-10-15"
  },
  "047050": {
   "price": 55100,
   "date": "2026-10-15",
   "changePct": -4.2,
   "close": 55100,
   "closeDate": "2026-10-15"
  },
  "033780": {
   "price": 189000,
   "date": "2026-10-15",
   "changePct": 4,
   "close": 189000,
   "closeDate": "2026-10-15"
  },
  "001120": {
   "price": 44150,
   "date": "2026-10-15",
   "changePct": -0.8,
   "close": 44150,
   "closeDate": "2026-10-15"
  },
  "004370": {
   "price": 402500,
   "date": "2026-10-15",
   "changePct": 2.3,
   "close": 402500,
   "closeDate": "2026-10-15"
  },
  "062040": {
   "price": 177500,
   "date": "2026-10-15",
   "changePct": -16.3,
   "close": 177500,
   "closeDate": "2026-10-15"
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
   "price": 5554.22,
   "date": "2026-10-15",
   "changePct": -7.6,
   "close": 5554.22,
   "closeDate": "2026-10-15"
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
