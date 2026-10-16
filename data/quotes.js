// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-16",
 "quotes": {
  "105560": {
   "price": 160000,
   "date": "2026-10-16",
   "changePct": 2.1,
   "close": 160000,
   "closeDate": "2026-10-16"
  },
  "139130": {
   "price": 17030,
   "date": "2026-10-16",
   "changePct": 1.4,
   "close": 17030,
   "closeDate": "2026-10-16"
  },
  "175330": {
   "price": 26850,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 26850,
   "closeDate": "2026-10-16"
  },
  "207940": {
   "price": 1298000,
   "date": "2026-10-16",
   "changePct": 4.1,
   "close": 1298000,
   "closeDate": "2026-10-16"
  },
  "213420": {
   "price": 27100,
   "date": "2026-10-16",
   "changePct": 5,
   "close": 27100,
   "closeDate": "2026-10-16"
  },
  "257720": {
   "price": 34200,
   "date": "2026-10-16",
   "changePct": 7.5,
   "close": 34200,
   "closeDate": "2026-10-16"
  },
  "267260": {
   "price": 516000,
   "date": "2026-10-16",
   "changePct": 6,
   "close": 516000,
   "closeDate": "2026-10-16"
  },
  "316140": {
   "price": 31350,
   "date": "2026-10-16",
   "changePct": 0.6,
   "close": 31350,
   "closeDate": "2026-10-16"
  },
  "323410": {
   "price": 20350,
   "date": "2026-10-16",
   "changePct": 1.2,
   "close": 20350,
   "closeDate": "2026-10-16"
  },
  "329180": {
   "price": 351500,
   "date": "2026-10-16",
   "changePct": -0.3,
   "close": 351500,
   "closeDate": "2026-10-16"
  },
  "361610": {
   "price": 17480,
   "date": "2026-10-16",
   "changePct": -1.6,
   "close": 17480,
   "closeDate": "2026-10-16"
  },
  "403870": {
   "price": 54100,
   "date": "2026-10-16",
   "changePct": 8.7,
   "close": 54100,
   "closeDate": "2026-10-16"
  },
  "005930": {
   "price": 215500,
   "date": "2026-10-16",
   "changePct": 2.6,
   "close": 215500,
   "closeDate": "2026-10-16"
  },
  "055550": {
   "price": 93400,
   "date": "2026-10-16",
   "changePct": -0.8,
   "close": 93400,
   "closeDate": "2026-10-16"
  },
  "000810": {
   "price": 586000,
   "date": "2026-10-16",
   "changePct": 1,
   "close": 586000,
   "closeDate": "2026-10-16"
  },
  "028260": {
   "price": 286500,
   "date": "2026-10-16",
   "changePct": 7.1,
   "close": 286500,
   "closeDate": "2026-10-16"
  },
  "012330": {
   "price": 352500,
   "date": "2026-10-16",
   "changePct": 4.4,
   "close": 352500,
   "closeDate": "2026-10-16"
  },
  "086790": {
   "price": 122500,
   "date": "2026-10-16",
   "changePct": 0.1,
   "close": 122500,
   "closeDate": "2026-10-16"
  },
  "000660": {
   "price": 1272000,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 1272000,
   "closeDate": "2026-10-16"
  },
  "012450": {
   "price": 888000,
   "date": "2026-10-16",
   "changePct": 7.8,
   "close": 888000,
   "closeDate": "2026-10-16"
  },
  "009540": {
   "price": 265000,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 265000,
   "closeDate": "2026-10-16"
  },
  "068270": {
   "price": 194000,
   "date": "2026-10-16",
   "changePct": 6.5,
   "close": 194000,
   "closeDate": "2026-10-16"
  },
  "035420": {
   "price": 180000,
   "date": "2026-10-16",
   "changePct": 3.7,
   "close": 180000,
   "closeDate": "2026-10-16"
  },
  "034020": {
   "price": 64600,
   "date": "2026-10-16",
   "changePct": 2.1,
   "close": 64600,
   "closeDate": "2026-10-16"
  },
  "000270": {
   "price": 110200,
   "date": "2026-10-16",
   "changePct": 4.1,
   "close": 110200,
   "closeDate": "2026-10-16"
  },
  "005490": {
   "price": 296500,
   "date": "2026-10-16",
   "changePct": 1.5,
   "close": 296500,
   "closeDate": "2026-10-16"
  },
  "015760": {
   "price": 28600,
   "date": "2026-10-16",
   "changePct": 0.5,
   "close": 28600,
   "closeDate": "2026-10-16"
  },
  "096770": {
   "price": 152000,
   "date": "2026-10-16",
   "changePct": -1.9,
   "close": 152000,
   "closeDate": "2026-10-16"
  },
  "051910": {
   "price": 254000,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 254000,
   "closeDate": "2026-10-16"
  },
  "003490": {
   "price": 26350,
   "date": "2026-10-16",
   "changePct": -10.5,
   "close": 26350,
   "closeDate": "2026-10-16"
  },
  "032640": {
   "price": 15510,
   "date": "2026-10-16",
   "changePct": 2.9,
   "close": 15510,
   "closeDate": "2026-10-16"
  },
  "088980": {
   "price": 9670,
   "date": "2026-10-16",
   "changePct": 0.5,
   "close": 9670,
   "closeDate": "2026-10-16"
  },
  "029780": {
   "price": 42750,
   "date": "2026-10-16",
   "changePct": 1.3,
   "close": 42750,
   "closeDate": "2026-10-16"
  },
  "024110": {
   "price": 19920,
   "date": "2026-10-16",
   "changePct": 0.9,
   "close": 19920,
   "closeDate": "2026-10-16"
  },
  "058470": {
   "price": 70800,
   "date": "2026-10-16",
   "changePct": 5.4,
   "close": 70800,
   "closeDate": "2026-10-16"
  },
  "082920": {
   "price": 24100,
   "date": "2026-10-16",
   "changePct": 3.9,
   "close": 24100,
   "closeDate": "2026-10-16"
  },
  "064760": {
   "price": 241500,
   "date": "2026-10-16",
   "changePct": 7.6,
   "close": 241500,
   "closeDate": "2026-10-16"
  },
  "014680": {
   "price": 232500,
   "date": "2026-10-16",
   "changePct": 0.4,
   "close": 232500,
   "closeDate": "2026-10-16"
  },
  "039030": {
   "price": 448000,
   "date": "2026-10-16",
   "changePct": 5.9,
   "close": 448000,
   "closeDate": "2026-10-16"
  },
  "011780": {
   "price": 113500,
   "date": "2026-10-16",
   "changePct": -0.7,
   "close": 113500,
   "closeDate": "2026-10-16"
  },
  "035900": {
   "price": 39050,
   "date": "2026-10-16",
   "changePct": 4.4,
   "close": 39050,
   "closeDate": "2026-10-16"
  },
  "021240": {
   "price": 107800,
   "date": "2026-10-16",
   "changePct": 2.7,
   "close": 107800,
   "closeDate": "2026-10-16"
  },
  "036570": {
   "price": 207000,
   "date": "2026-10-16",
   "changePct": 3,
   "close": 207000,
   "closeDate": "2026-10-16"
  },
  "035720": {
   "price": 31850,
   "date": "2026-10-16",
   "changePct": 2.7,
   "close": 31850,
   "closeDate": "2026-10-16"
  },
  "001040": {
   "price": 124600,
   "date": "2026-10-16",
   "changePct": 0.9,
   "close": 124600,
   "closeDate": "2026-10-16"
  },
  "012750": {
   "price": 97500,
   "date": "2026-10-16",
   "changePct": -0.1,
   "close": 97500,
   "closeDate": "2026-10-16"
  },
  "047050": {
   "price": 56000,
   "date": "2026-10-16",
   "changePct": 1.6,
   "close": 56000,
   "closeDate": "2026-10-16"
  },
  "033780": {
   "price": 190500,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 190500,
   "closeDate": "2026-10-16"
  },
  "001120": {
   "price": 44500,
   "date": "2026-10-16",
   "changePct": 0.8,
   "close": 44500,
   "closeDate": "2026-10-16"
  },
  "004370": {
   "price": 410000,
   "date": "2026-10-16",
   "changePct": 1.9,
   "close": 410000,
   "closeDate": "2026-10-16"
  },
  "062040": {
   "price": 182100,
   "date": "2026-10-16",
   "changePct": 2.6,
   "close": 182100,
   "closeDate": "2026-10-16"
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
   "price": 5668.05,
   "date": "2026-10-16",
   "changePct": 2,
   "close": 5668.05,
   "closeDate": "2026-10-16"
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
