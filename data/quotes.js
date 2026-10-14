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
   "price": 162400,
   "date": "2026-10-13",
   "changePct": -0.2,
   "close": 162400,
   "closeDate": "2026-10-13"
  },
  "139130": {
   "price": 17550,
   "date": "2026-10-13",
   "changePct": 0.2,
   "close": 17550,
   "closeDate": "2026-10-13"
  },
  "175330": {
   "price": 28200,
   "date": "2026-10-13",
   "changePct": 1.3,
   "close": 28200,
   "closeDate": "2026-10-13"
  },
  "207940": {
   "price": 1206000,
   "date": "2026-10-13",
   "changePct": 0.4,
   "close": 1206000,
   "closeDate": "2026-10-13"
  },
  "213420": {
   "price": 27700,
   "date": "2026-10-13",
   "changePct": -2.6,
   "close": 27700,
   "closeDate": "2026-10-13"
  },
  "257720": {
   "price": 32550,
   "date": "2026-10-13",
   "changePct": -6.7,
   "close": 32550,
   "closeDate": "2026-10-13"
  },
  "267260": {
   "price": 560000,
   "date": "2026-10-13",
   "changePct": -3.8,
   "close": 560000,
   "closeDate": "2026-10-13"
  },
  "316140": {
   "price": 32000,
   "date": "2026-10-13",
   "changePct": -0.6,
   "close": 32000,
   "closeDate": "2026-10-13"
  },
  "323410": {
   "price": 20150,
   "date": "2026-10-13",
   "changePct": 1,
   "close": 20150,
   "closeDate": "2026-10-13"
  },
  "329180": {
   "price": 366500,
   "date": "2026-10-13",
   "changePct": 0.3,
   "close": 366500,
   "closeDate": "2026-10-13"
  },
  "361610": {
   "price": 18180,
   "date": "2026-10-13",
   "changePct": 2.8,
   "close": 18180,
   "closeDate": "2026-10-13"
  },
  "403870": {
   "price": 61600,
   "date": "2026-10-13",
   "changePct": 1,
   "close": 61600,
   "closeDate": "2026-10-13"
  },
  "005930": {
   "price": 232000,
   "date": "2026-10-13",
   "changePct": -7.4,
   "close": 232000,
   "closeDate": "2026-10-13"
  },
  "055550": {
   "price": 99700,
   "date": "2026-10-13",
   "changePct": -0.8,
   "close": 99700,
   "closeDate": "2026-10-13"
  },
  "000810": {
   "price": 612000,
   "date": "2026-10-13",
   "changePct": -1.6,
   "close": 612000,
   "closeDate": "2026-10-13"
  },
  "028260": {
   "price": 300000,
   "date": "2026-10-13",
   "changePct": -4.6,
   "close": 300000,
   "closeDate": "2026-10-13"
  },
  "012330": {
   "price": 348500,
   "date": "2026-10-13",
   "changePct": -1.7,
   "close": 348500,
   "closeDate": "2026-10-13"
  },
  "086790": {
   "price": 124400,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 124400,
   "closeDate": "2026-10-13"
  },
  "000660": {
   "price": 1443000,
   "date": "2026-10-13",
   "changePct": -10.1,
   "close": 1443000,
   "closeDate": "2026-10-13"
  },
  "012450": {
   "price": 839000,
   "date": "2026-10-13",
   "changePct": -2.7,
   "close": 839000,
   "closeDate": "2026-10-13"
  },
  "009540": {
   "price": 278000,
   "date": "2026-10-13",
   "changePct": -1.4,
   "close": 278000,
   "closeDate": "2026-10-13"
  },
  "068270": {
   "price": 179700,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 179700,
   "closeDate": "2026-10-13"
  },
  "035420": {
   "price": 178000,
   "date": "2026-10-13",
   "changePct": -1.4,
   "close": 178000,
   "closeDate": "2026-10-13"
  },
  "034020": {
   "price": 70200,
   "date": "2026-10-13",
   "changePct": -1.8,
   "close": 70200,
   "closeDate": "2026-10-13"
  },
  "000270": {
   "price": 108300,
   "date": "2026-10-13",
   "changePct": 0.2,
   "close": 108300,
   "closeDate": "2026-10-13"
  },
  "005490": {
   "price": 299000,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 299000,
   "closeDate": "2026-10-13"
  },
  "015760": {
   "price": 29150,
   "date": "2026-10-13",
   "changePct": 2.1,
   "close": 29150,
   "closeDate": "2026-10-13"
  },
  "096770": {
   "price": 156800,
   "date": "2026-10-13",
   "changePct": 2.6,
   "close": 156800,
   "closeDate": "2026-10-13"
  },
  "051910": {
   "price": 262000,
   "date": "2026-10-13",
   "changePct": 0.6,
   "close": 262000,
   "closeDate": "2026-10-13"
  },
  "003490": {
   "price": 30500,
   "date": "2026-10-13",
   "changePct": -1.9,
   "close": 30500,
   "closeDate": "2026-10-13"
  },
  "032640": {
   "price": 14780,
   "date": "2026-10-13",
   "changePct": 1.6,
   "close": 14780,
   "closeDate": "2026-10-13"
  },
  "088980": {
   "price": 9680,
   "date": "2026-10-13",
   "changePct": -0.1,
   "close": 9680,
   "closeDate": "2026-10-13"
  },
  "029780": {
   "price": 42700,
   "date": "2026-10-13",
   "changePct": 1.9,
   "close": 42700,
   "closeDate": "2026-10-13"
  },
  "024110": {
   "price": 19840,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 19840,
   "closeDate": "2026-10-13"
  },
  "058470": {
   "price": 79600,
   "date": "2026-10-13",
   "changePct": 1.9,
   "close": 79600,
   "closeDate": "2026-10-13"
  },
  "082920": {
   "price": 24350,
   "date": "2026-10-13",
   "changePct": -4.7,
   "close": 24350,
   "closeDate": "2026-10-13"
  },
  "064760": {
   "price": 274500,
   "date": "2026-10-13",
   "changePct": -5.5,
   "close": 274500,
   "closeDate": "2026-10-13"
  },
  "014680": {
   "price": 261500,
   "date": "2026-10-13",
   "changePct": -0.8,
   "close": 261500,
   "closeDate": "2026-10-13"
  },
  "039030": {
   "price": 494000,
   "date": "2026-10-13",
   "changePct": -3.3,
   "close": 494000,
   "closeDate": "2026-10-13"
  },
  "011780": {
   "price": 114600,
   "date": "2026-10-13",
   "changePct": -0.1,
   "close": 114600,
   "closeDate": "2026-10-13"
  },
  "035900": {
   "price": 37500,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 37500,
   "closeDate": "2026-10-13"
  },
  "021240": {
   "price": 101200,
   "date": "2026-10-13",
   "changePct": -1.1,
   "close": 101200,
   "closeDate": "2026-10-13"
  },
  "036570": {
   "price": 207000,
   "date": "2026-10-13",
   "changePct": -1,
   "close": 207000,
   "closeDate": "2026-10-13"
  },
  "035720": {
   "price": 31300,
   "date": "2026-10-13",
   "changePct": -2.2,
   "close": 31300,
   "closeDate": "2026-10-13"
  },
  "001040": {
   "price": 128600,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 128600,
   "closeDate": "2026-10-13"
  },
  "012750": {
   "price": 87000,
   "date": "2026-10-13",
   "changePct": 0.8,
   "close": 87000,
   "closeDate": "2026-10-13"
  },
  "047050": {
   "price": 56600,
   "date": "2026-10-13",
   "changePct": 3.3,
   "close": 56600,
   "closeDate": "2026-10-13"
  },
  "010120": {
   "price": 179200,
   "date": "2026-10-13",
   "changePct": -2.4,
   "close": 179200,
   "closeDate": "2026-10-13"
  },
  "033780": {
   "price": 181400,
   "date": "2026-10-13",
   "changePct": 0.7,
   "close": 181400,
   "closeDate": "2026-10-13"
  },
  "001120": {
   "price": 44050,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 44050,
   "closeDate": "2026-10-13"
  },
  "004370": {
   "price": 401000,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 401000,
   "closeDate": "2026-10-13"
  },
  "062040": {
   "price": 211000,
   "date": "2026-10-13",
   "changePct": -1.6,
   "close": 211000,
   "closeDate": "2026-10-13"
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
  "ISRG": {
   "price": 422.06,
   "date": "2026-10-13",
   "changePct": -1.3,
   "close": 422.06,
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
   "price": 6035.35,
   "date": "2026-10-13",
   "changePct": -5.5,
   "close": 6384.2402,
   "closeDate": "2026-10-12"
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
