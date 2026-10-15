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
   "price": 539.44,
   "date": "2026-10-15",
   "changePct": 1.1,
   "close": 539.44,
   "closeDate": "2026-10-15"
  },
  "V": {
   "price": 399.75,
   "date": "2026-10-15",
   "changePct": 2.1,
   "close": 399.75,
   "closeDate": "2026-10-15"
  },
  "MA": {
   "price": 616.32,
   "date": "2026-10-15",
   "changePct": 2.2,
   "close": 616.32,
   "closeDate": "2026-10-15"
  },
  "GOOGL": {
   "price": 349.22,
   "date": "2026-10-15",
   "changePct": 0.5,
   "close": 349.22,
   "closeDate": "2026-10-15"
  },
  "AMZN": {
   "price": 254.76,
   "date": "2026-10-15",
   "changePct": 0.3,
   "close": 254.76,
   "closeDate": "2026-10-15"
  },
  "COST": {
   "price": 978.01,
   "date": "2026-10-15",
   "changePct": -0.4,
   "close": 978.01,
   "closeDate": "2026-10-15"
  },
  "NVDA": {
   "price": 217.23,
   "date": "2026-10-15",
   "changePct": -1.8,
   "close": 217.23,
   "closeDate": "2026-10-15"
  },
  "META": {
   "price": 736.72,
   "date": "2026-10-15",
   "changePct": -0.1,
   "close": 736.72,
   "closeDate": "2026-10-15"
  },
  "AVGO": {
   "price": 344.33,
   "date": "2026-10-15",
   "changePct": -0.6,
   "close": 344.33,
   "closeDate": "2026-10-15"
  },
  "TSM": {
   "price": 422.25,
   "date": "2026-10-15",
   "changePct": -1.8,
   "close": 422.25,
   "closeDate": "2026-10-15"
  },
  "UBER": {
   "price": 71.27,
   "date": "2026-10-15",
   "changePct": 2.9,
   "close": 71.27,
   "closeDate": "2026-10-15"
  },
  "GM": {
   "price": 83.66,
   "date": "2026-10-15",
   "changePct": 0.7,
   "close": 83.66,
   "closeDate": "2026-10-15"
  },
  "VZ": {
   "price": 44.4,
   "date": "2026-10-15",
   "changePct": 0,
   "close": 44.4,
   "closeDate": "2026-10-15"
  },
  "C": {
   "price": 123.21,
   "date": "2026-10-15",
   "changePct": 0.8,
   "close": 123.21,
   "closeDate": "2026-10-15"
  },
  "O": {
   "price": 55.55,
   "date": "2026-10-15",
   "changePct": 0.7,
   "close": 55.55,
   "closeDate": "2026-10-15"
  },
  "DUK": {
   "price": 118.88,
   "date": "2026-10-15",
   "changePct": -0.6,
   "close": 118.88,
   "closeDate": "2026-10-15"
  },
  "XOM": {
   "price": 174.68,
   "date": "2026-10-15",
   "changePct": -1.3,
   "close": 174.68,
   "closeDate": "2026-10-15"
  },
  "KO": {
   "price": 92,
   "date": "2026-10-15",
   "changePct": 0.2,
   "close": 92,
   "closeDate": "2026-10-15"
  },
  "JNJ": {
   "price": 253.28,
   "date": "2026-10-15",
   "changePct": -0.2,
   "close": 253.28,
   "closeDate": "2026-10-15"
  },
  "AXON": {
   "price": 417.19,
   "date": "2026-10-15",
   "changePct": 2.1,
   "close": 417.19,
   "closeDate": "2026-10-15"
  },
  "NXT": {
   "price": 83.45,
   "date": "2026-10-15",
   "changePct": 1.1,
   "close": 83.45,
   "closeDate": "2026-10-15"
  },
  "TCOM": {
   "price": 39.93,
   "date": "2026-10-15",
   "changePct": 2.7,
   "close": 39.93,
   "closeDate": "2026-10-15"
  },
  "LLY": {
   "price": 1251.61,
   "date": "2026-10-15",
   "changePct": 3.5,
   "close": 1251.61,
   "closeDate": "2026-10-15"
  },
  "CVX": {
   "price": 219.32,
   "date": "2026-10-15",
   "changePct": -1.2,
   "close": 219.32,
   "closeDate": "2026-10-15"
  },
  "CI": {
   "price": 298.81,
   "date": "2026-10-15",
   "changePct": 3.2,
   "close": 298.81,
   "closeDate": "2026-10-15"
  },
  "ALGN": {
   "price": 149.34,
   "date": "2026-10-15",
   "changePct": 3.4,
   "close": 149.34,
   "closeDate": "2026-10-15"
  },
  "NOW": {
   "price": 148.57,
   "date": "2026-10-15",
   "changePct": 6.1,
   "close": 148.57,
   "closeDate": "2026-10-15"
  },
  "TSLA": {
   "price": 362.44,
   "date": "2026-10-15",
   "changePct": -1.3,
   "close": 362.44,
   "closeDate": "2026-10-15"
  },
  "PG": {
   "price": 157.08,
   "date": "2026-10-15",
   "changePct": 0.4,
   "close": 157.08,
   "closeDate": "2026-10-15"
  },
  "MDLZ": {
   "price": 63.03,
   "date": "2026-10-15",
   "changePct": 0.7,
   "close": 63.03,
   "closeDate": "2026-10-15"
  },
  "AAPL": {
   "price": 342,
   "date": "2026-10-15",
   "changePct": -0.3,
   "close": 342,
   "closeDate": "2026-10-15"
  },
  "ABT": {
   "price": 104.68,
   "date": "2026-10-15",
   "changePct": 1.7,
   "close": 104.68,
   "closeDate": "2026-10-15"
  },
  "MU": {
   "price": 931.24,
   "date": "2026-10-15",
   "changePct": 1.9,
   "close": 931.24,
   "closeDate": "2026-10-15"
  },
  "MDT": {
   "price": 95.45,
   "date": "2026-10-15",
   "changePct": 1.3,
   "close": 95.45,
   "closeDate": "2026-10-15"
  },
  "IREN": {
   "price": 30.39,
   "date": "2026-10-15",
   "changePct": -0.6,
   "close": 30.39,
   "closeDate": "2026-10-15"
  },
  "UNH": {
   "price": 406.67,
   "date": "2026-10-15",
   "changePct": 2.8,
   "close": 406.67,
   "closeDate": "2026-10-15"
  },
  "MCHP": {
   "price": 74.26,
   "date": "2026-10-15",
   "changePct": 4.2,
   "close": 74.26,
   "closeDate": "2026-10-15"
  },
  "GILD": {
   "price": 157.37,
   "date": "2026-10-15",
   "changePct": 2.5,
   "close": 157.37,
   "closeDate": "2026-10-15"
  },
  "BRK.B": {
   "price": 525.68,
   "date": "2026-10-15",
   "changePct": -0.1,
   "close": 525.68,
   "closeDate": "2026-10-15"
  },
  "TMO": {
   "price": 696.49,
   "date": "2026-10-15",
   "changePct": 3.5,
   "close": 696.49,
   "closeDate": "2026-10-15"
  },
  "ECL": {
   "price": 290.81,
   "date": "2026-10-15",
   "changePct": 1.1,
   "close": 290.81,
   "closeDate": "2026-10-15"
  },
  "APH": {
   "price": 81.49,
   "date": "2026-10-15",
   "changePct": -1.5,
   "close": 81.49,
   "closeDate": "2026-10-15"
  },
  "NVT": {
   "price": 145.73,
   "date": "2026-10-15",
   "changePct": -4.6,
   "close": 145.73,
   "closeDate": "2026-10-15"
  },
  "FSS": {
   "price": 113.47,
   "date": "2026-10-15",
   "changePct": 0.4,
   "close": 113.47,
   "closeDate": "2026-10-15"
  },
  "MKSI": {
   "price": 228.52,
   "date": "2026-10-15",
   "changePct": -2.6,
   "close": 228.52,
   "closeDate": "2026-10-15"
  },
  "AAON": {
   "price": 77.3,
   "date": "2026-10-15",
   "changePct": -4,
   "close": 77.3,
   "closeDate": "2026-10-15"
  },
  "NVMI": {
   "price": 329.44,
   "date": "2026-10-15",
   "changePct": -0.6,
   "close": 329.44,
   "closeDate": "2026-10-15"
  },
  "POWL": {
   "price": 170.82,
   "date": "2026-10-15",
   "changePct": 0.8,
   "close": 170.82,
   "closeDate": "2026-10-15"
  },
  "TXN": {
   "price": 279.12,
   "date": "2026-10-15",
   "changePct": -0.5,
   "close": 279.12,
   "closeDate": "2026-10-15"
  },
  "MSI": {
   "price": 456.39,
   "date": "2026-10-15",
   "changePct": 1,
   "close": 456.39,
   "closeDate": "2026-10-15"
  },
  "SNY": {
   "price": 40.29,
   "date": "2026-10-15",
   "changePct": 1.3,
   "close": 40.29,
   "closeDate": "2026-10-15"
  },
  "DVN": {
   "price": 49.24,
   "date": "2026-10-15",
   "changePct": -1.4,
   "close": 49.24,
   "closeDate": "2026-10-15"
  },
  "RBC": {
   "price": 497.73,
   "date": "2026-10-15",
   "changePct": -0.2,
   "close": 497.73,
   "closeDate": "2026-10-15"
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
   "price": 7744.06,
   "date": "2026-10-15",
   "changePct": 0.3,
   "close": 7744.06,
   "closeDate": "2026-10-15"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215,
   "date": "2026-10-15",
   "changePct": 1.4,
   "close": 215,
   "closeDate": "2026-10-15"
  }
 }
};
