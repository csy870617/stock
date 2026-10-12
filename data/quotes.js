// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-12",
 "quotes": {
  "105560": {
   "price": 162800,
   "date": "2026-10-12",
   "changePct": 0,
   "close": 162800,
   "closeDate": "2026-10-12"
  },
  "139130": {
   "price": 17510,
   "date": "2026-10-12",
   "changePct": -0.3,
   "close": 17510,
   "closeDate": "2026-10-12"
  },
  "175330": {
   "price": 27850,
   "date": "2026-10-12",
   "changePct": 0,
   "close": 27850,
   "closeDate": "2026-10-12"
  },
  "207940": {
   "price": 1201000,
   "date": "2026-10-12",
   "changePct": -1.5,
   "close": 1201000,
   "closeDate": "2026-10-12"
  },
  "213420": {
   "price": 28450,
   "date": "2026-10-12",
   "changePct": -5,
   "close": 28450,
   "closeDate": "2026-10-12"
  },
  "214150": {
   "price": 29550,
   "date": "2026-10-12",
   "changePct": -2.6,
   "close": 29550,
   "closeDate": "2026-10-12"
  },
  "257720": {
   "price": 34900,
   "date": "2026-10-12",
   "changePct": -1.6,
   "close": 34900,
   "closeDate": "2026-10-12"
  },
  "267260": {
   "price": 582000,
   "date": "2026-10-12",
   "changePct": -4,
   "close": 582000,
   "closeDate": "2026-10-12"
  },
  "316140": {
   "price": 32200,
   "date": "2026-10-12",
   "changePct": -0.5,
   "close": 32200,
   "closeDate": "2026-10-12"
  },
  "323410": {
   "price": 19950,
   "date": "2026-10-12",
   "changePct": 2.5,
   "close": 19950,
   "closeDate": "2026-10-12"
  },
  "329180": {
   "price": 365500,
   "date": "2026-10-12",
   "changePct": -4.8,
   "close": 365500,
   "closeDate": "2026-10-12"
  },
  "361610": {
   "price": 17680,
   "date": "2026-10-12",
   "changePct": -4.9,
   "close": 17680,
   "closeDate": "2026-10-12"
  },
  "403870": {
   "price": 61000,
   "date": "2026-10-12",
   "changePct": -5.6,
   "close": 61000,
   "closeDate": "2026-10-12"
  },
  "005930": {
   "price": 250500,
   "date": "2026-10-12",
   "changePct": -4.4,
   "close": 250500,
   "closeDate": "2026-10-12"
  },
  "055550": {
   "price": 100500,
   "date": "2026-10-12",
   "changePct": 1,
   "close": 100500,
   "closeDate": "2026-10-12"
  },
  "000810": {
   "price": 622000,
   "date": "2026-10-12",
   "changePct": 1.6,
   "close": 622000,
   "closeDate": "2026-10-12"
  },
  "028260": {
   "price": 314500,
   "date": "2026-10-12",
   "changePct": -0.9,
   "close": 314500,
   "closeDate": "2026-10-12"
  },
  "012330": {
   "price": 354500,
   "date": "2026-10-12",
   "changePct": -1.3,
   "close": 354500,
   "closeDate": "2026-10-12"
  },
  "086790": {
   "price": 124400,
   "date": "2026-10-12",
   "changePct": 0.1,
   "close": 124400,
   "closeDate": "2026-10-12"
  },
  "000660": {
   "price": 1605000,
   "date": "2026-10-12",
   "changePct": -4.5,
   "close": 1605000,
   "closeDate": "2026-10-12"
  },
  "012450": {
   "price": 862000,
   "date": "2026-10-12",
   "changePct": -3.3,
   "close": 862000,
   "closeDate": "2026-10-12"
  },
  "009540": {
   "price": 282000,
   "date": "2026-10-12",
   "changePct": -3.3,
   "close": 282000,
   "closeDate": "2026-10-12"
  },
  "068270": {
   "price": 180400,
   "date": "2026-10-12",
   "changePct": 0.4,
   "close": 180400,
   "closeDate": "2026-10-12"
  },
  "035420": {
   "price": 180500,
   "date": "2026-10-12",
   "changePct": -1.8,
   "close": 180500,
   "closeDate": "2026-10-12"
  },
  "034020": {
   "price": 71500,
   "date": "2026-10-12",
   "changePct": -8.3,
   "close": 71500,
   "closeDate": "2026-10-12"
  },
  "000270": {
   "price": 108100,
   "date": "2026-10-12",
   "changePct": 1.2,
   "close": 108100,
   "closeDate": "2026-10-12"
  },
  "005490": {
   "price": 299000,
   "date": "2026-10-12",
   "changePct": -2.4,
   "close": 299000,
   "closeDate": "2026-10-12"
  },
  "015760": {
   "price": 28550,
   "date": "2026-10-12",
   "changePct": -1.9,
   "close": 28550,
   "closeDate": "2026-10-12"
  },
  "096770": {
   "price": 152800,
   "date": "2026-10-12",
   "changePct": -5,
   "close": 152800,
   "closeDate": "2026-10-12"
  },
  "051910": {
   "price": 260500,
   "date": "2026-10-12",
   "changePct": -9.1,
   "close": 260500,
   "closeDate": "2026-10-12"
  },
  "003490": {
   "price": 31100,
   "date": "2026-10-12",
   "changePct": 1.3,
   "close": 31100,
   "closeDate": "2026-10-12"
  },
  "032640": {
   "price": 14550,
   "date": "2026-10-12",
   "changePct": 1,
   "close": 14550,
   "closeDate": "2026-10-12"
  },
  "088980": {
   "price": 9690,
   "date": "2026-10-12",
   "changePct": -0.6,
   "close": 9690,
   "closeDate": "2026-10-12"
  },
  "029780": {
   "price": 41900,
   "date": "2026-10-12",
   "changePct": 1.7,
   "close": 41900,
   "closeDate": "2026-10-12"
  },
  "024110": {
   "price": 19910,
   "date": "2026-10-12",
   "changePct": 0.8,
   "close": 19910,
   "closeDate": "2026-10-12"
  },
  "058470": {
   "price": 78100,
   "date": "2026-10-12",
   "changePct": -11.1,
   "close": 78100,
   "closeDate": "2026-10-12"
  },
  "082920": {
   "price": 25550,
   "date": "2026-10-12",
   "changePct": -8.6,
   "close": 25550,
   "closeDate": "2026-10-12"
  },
  "064760": {
   "price": 290500,
   "date": "2026-10-12",
   "changePct": -2.5,
   "close": 290500,
   "closeDate": "2026-10-12"
  },
  "014680": {
   "price": 263500,
   "date": "2026-10-12",
   "changePct": -2.8,
   "close": 263500,
   "closeDate": "2026-10-12"
  },
  "039030": {
   "price": 511000,
   "date": "2026-10-12",
   "changePct": -2.5,
   "close": 511000,
   "closeDate": "2026-10-12"
  },
  "011780": {
   "price": 114700,
   "date": "2026-10-12",
   "changePct": 0,
   "close": 114700,
   "closeDate": "2026-10-12"
  },
  "035900": {
   "price": 37650,
   "date": "2026-10-12",
   "changePct": -4.8,
   "close": 37650,
   "closeDate": "2026-10-12"
  },
  "021240": {
   "price": 102300,
   "date": "2026-10-12",
   "changePct": 0.9,
   "close": 102300,
   "closeDate": "2026-10-12"
  },
  "036570": {
   "price": 209000,
   "date": "2026-10-12",
   "changePct": -5.9,
   "close": 209000,
   "closeDate": "2026-10-12"
  },
  "035720": {
   "price": 32000,
   "date": "2026-10-12",
   "changePct": -0.9,
   "close": 32000,
   "closeDate": "2026-10-12"
  },
  "001040": {
   "price": 128600,
   "date": "2026-10-12",
   "changePct": -1.4,
   "close": 128600,
   "closeDate": "2026-10-12"
  },
  "012750": {
   "price": 86300,
   "date": "2026-10-12",
   "changePct": 2.5,
   "close": 86300,
   "closeDate": "2026-10-12"
  },
  "047050": {
   "price": 54800,
   "date": "2026-10-12",
   "changePct": -4,
   "close": 54800,
   "closeDate": "2026-10-12"
  },
  "010120": {
   "price": 183600,
   "date": "2026-10-12",
   "changePct": -6.1,
   "close": 183600,
   "closeDate": "2026-10-12"
  },
  "033780": {
   "price": 180200,
   "date": "2026-10-12",
   "changePct": 1.6,
   "close": 180200,
   "closeDate": "2026-10-12"
  },
  "001120": {
   "price": 44050,
   "date": "2026-10-12",
   "changePct": 1.6,
   "close": 44050,
   "closeDate": "2026-10-12"
  },
  "004370": {
   "price": 401000,
   "date": "2026-10-12",
   "changePct": 0.9,
   "close": 401000,
   "closeDate": "2026-10-12"
  },
  "MSFT": {
   "price": 535.07,
   "date": "2026-10-09",
   "changePct": 2.4,
   "close": 535.07,
   "closeDate": "2026-10-09"
  },
  "V": {
   "price": 385.45,
   "date": "2026-10-09",
   "changePct": 2.8,
   "close": 385.45,
   "closeDate": "2026-10-09"
  },
  "MA": {
   "price": 589.14,
   "date": "2026-10-09",
   "changePct": 2.5,
   "close": 589.14,
   "closeDate": "2026-10-09"
  },
  "GOOGL": {
   "price": 351.66,
   "date": "2026-10-09",
   "changePct": 1,
   "close": 351.66,
   "closeDate": "2026-10-09"
  },
  "AMZN": {
   "price": 262.43,
   "date": "2026-10-09",
   "changePct": 3.3,
   "close": 262.43,
   "closeDate": "2026-10-09"
  },
  "COST": {
   "price": 946.92,
   "date": "2026-10-09",
   "changePct": -0.1,
   "close": 946.92,
   "closeDate": "2026-10-09"
  },
  "NVDA": {
   "price": 229.28,
   "date": "2026-10-09",
   "changePct": -0.5,
   "close": 229.28,
   "closeDate": "2026-10-09"
  },
  "META": {
   "price": 718.67,
   "date": "2026-10-09",
   "changePct": -0.3,
   "close": 718.67,
   "closeDate": "2026-10-09"
  },
  "AVGO": {
   "price": 361.54,
   "date": "2026-10-09",
   "changePct": 0.4,
   "close": 361.54,
   "closeDate": "2026-10-09"
  },
  "TSM": {
   "price": 453.31,
   "date": "2026-10-09",
   "changePct": -1,
   "close": 453.31,
   "closeDate": "2026-10-09"
  },
  "PLTR": {
   "price": 209.05,
   "date": "2026-10-09",
   "changePct": 5.2,
   "close": 209.05,
   "closeDate": "2026-10-09"
  },
  "UBER": {
   "price": 71.51,
   "date": "2026-10-09",
   "changePct": 1.8,
   "close": 71.51,
   "closeDate": "2026-10-09"
  },
  "GM": {
   "price": 82.73,
   "date": "2026-10-09",
   "changePct": 0.6,
   "close": 82.73,
   "closeDate": "2026-10-09"
  },
  "VZ": {
   "price": 41.65,
   "date": "2026-10-09",
   "changePct": -10.1,
   "close": 41.65,
   "closeDate": "2026-10-09"
  },
  "C": {
   "price": 129.64,
   "date": "2026-10-09",
   "changePct": 1.2,
   "close": 129.64,
   "closeDate": "2026-10-09"
  },
  "PEP": {
   "price": 125.97,
   "date": "2026-10-09",
   "changePct": -1.8,
   "close": 125.97,
   "closeDate": "2026-10-09"
  },
  "O": {
   "price": 54.18,
   "date": "2026-10-09",
   "changePct": 0,
   "close": 54.18,
   "closeDate": "2026-10-09"
  },
  "DUK": {
   "price": 116.65,
   "date": "2026-10-09",
   "changePct": -0.2,
   "close": 116.65,
   "closeDate": "2026-10-09"
  },
  "XOM": {
   "price": 168.94,
   "date": "2026-10-09",
   "changePct": 0.3,
   "close": 168.94,
   "closeDate": "2026-10-09"
  },
  "KO": {
   "price": 88.05,
   "date": "2026-10-09",
   "changePct": 0.3,
   "close": 88.05,
   "closeDate": "2026-10-09"
  },
  "JNJ": {
   "price": 261.44,
   "date": "2026-10-09",
   "changePct": 1.9,
   "close": 261.44,
   "closeDate": "2026-10-09"
  },
  "AXON": {
   "price": 422.89,
   "date": "2026-10-09",
   "changePct": 1.3,
   "close": 422.89,
   "closeDate": "2026-10-09"
  },
  "NXT": {
   "price": 86.11,
   "date": "2026-10-09",
   "changePct": 1,
   "close": 86.11,
   "closeDate": "2026-10-09"
  },
  "TCOM": {
   "price": 38.9,
   "date": "2026-10-09",
   "changePct": 2.5,
   "close": 38.9,
   "closeDate": "2026-10-09"
  },
  "LLY": {
   "price": 1179.27,
   "date": "2026-10-09",
   "changePct": 0.8,
   "close": 1179.27,
   "closeDate": "2026-10-09"
  },
  "CVX": {
   "price": 211.98,
   "date": "2026-10-09",
   "changePct": 0.2,
   "close": 211.98,
   "closeDate": "2026-10-09"
  },
  "CI": {
   "price": 282.43,
   "date": "2026-10-09",
   "changePct": 0.5,
   "close": 282.43,
   "closeDate": "2026-10-09"
  },
  "ALGN": {
   "price": 142.71,
   "date": "2026-10-09",
   "changePct": 1.2,
   "close": 142.71,
   "closeDate": "2026-10-09"
  },
  "NOW": {
   "price": 140.86,
   "date": "2026-10-09",
   "changePct": 0.8,
   "close": 140.86,
   "closeDate": "2026-10-09"
  },
  "TSLA": {
   "price": 382.7,
   "date": "2026-10-09",
   "changePct": 2.1,
   "close": 382.7,
   "closeDate": "2026-10-09"
  },
  "PG": {
   "price": 151.23,
   "date": "2026-10-09",
   "changePct": 0.4,
   "close": 151.23,
   "closeDate": "2026-10-09"
  },
  "MDLZ": {
   "price": 60.41,
   "date": "2026-10-09",
   "changePct": -0.4,
   "close": 60.41,
   "closeDate": "2026-10-09"
  },
  "AAPL": {
   "price": 336.64,
   "date": "2026-10-09",
   "changePct": -1.1,
   "close": 336.64,
   "closeDate": "2026-10-09"
  },
  "ABT": {
   "price": 99.6,
   "date": "2026-10-09",
   "changePct": 1.1,
   "close": 99.6,
   "closeDate": "2026-10-09"
  },
  "MU": {
   "price": 1029,
   "date": "2026-10-09",
   "changePct": -0.7,
   "close": 1029,
   "closeDate": "2026-10-09"
  },
  "MDT": {
   "price": 88.48,
   "date": "2026-10-09",
   "changePct": 0.8,
   "close": 88.48,
   "closeDate": "2026-10-09"
  },
  "IREN": {
   "price": 35.19,
   "date": "2026-10-09",
   "changePct": -1.5,
   "close": 35.19,
   "closeDate": "2026-10-09"
  },
  "UNH": {
   "price": 379.3,
   "date": "2026-10-09",
   "changePct": 2.3,
   "close": 379.3,
   "closeDate": "2026-10-09"
  },
  "DE": {
   "price": 620.93,
   "date": "2026-10-09",
   "changePct": -4.8,
   "close": 620.93,
   "closeDate": "2026-10-09"
  },
  "MCHP": {
   "price": 75.55,
   "date": "2026-10-09",
   "changePct": 0,
   "close": 75.55,
   "closeDate": "2026-10-09"
  },
  "ISRG": {
   "price": 423.96,
   "date": "2026-10-09",
   "changePct": 2.1,
   "close": 423.96,
   "closeDate": "2026-10-09"
  },
  "GILD": {
   "price": 151.17,
   "date": "2026-10-09",
   "changePct": 2.8,
   "close": 151.17,
   "closeDate": "2026-10-09"
  },
  "BRK.B": {
   "price": 515.62,
   "date": "2026-10-09",
   "changePct": 0.9,
   "close": 515.62,
   "closeDate": "2026-10-09"
  },
  "TMO": {
   "price": 658.02,
   "date": "2026-10-09",
   "changePct": 0.9,
   "close": 658.02,
   "closeDate": "2026-10-09"
  },
  "ECL": {
   "price": 281.83,
   "date": "2026-10-09",
   "changePct": 0,
   "close": 281.83,
   "closeDate": "2026-10-09"
  },
  "APH": {
   "price": 87.24,
   "date": "2026-10-09",
   "changePct": 2.3,
   "close": 87.24,
   "closeDate": "2026-10-09"
  },
  "NVT": {
   "price": 167.43,
   "date": "2026-10-09",
   "changePct": 2,
   "close": 167.43,
   "closeDate": "2026-10-09"
  },
  "FSS": {
   "price": 113.57,
   "date": "2026-10-09",
   "changePct": 0.9,
   "close": 113.57,
   "closeDate": "2026-10-09"
  },
  "MPWR": {
   "price": 1386.29,
   "date": "2026-10-09",
   "changePct": 1.2,
   "close": 1386.29,
   "closeDate": "2026-10-09"
  },
  "MKSI": {
   "price": 264.5,
   "date": "2026-10-09",
   "changePct": 1.6,
   "close": 264.5,
   "closeDate": "2026-10-09"
  },
  "AAON": {
   "price": 86.16,
   "date": "2026-10-09",
   "changePct": 0.2,
   "close": 86.16,
   "closeDate": "2026-10-09"
  },
  "NVMI": {
   "price": 353,
   "date": "2026-10-09",
   "changePct": -0.4,
   "close": 353,
   "closeDate": "2026-10-09"
  },
  "POWL": {
   "price": 191.93,
   "date": "2026-10-09",
   "changePct": 1.4,
   "close": 191.93,
   "closeDate": "2026-10-09"
  },
  "TXN": {
   "price": 283.74,
   "date": "2026-10-09",
   "changePct": -1.5,
   "close": 283.74,
   "closeDate": "2026-10-09"
  },
  "MSI": {
   "price": 444.18,
   "date": "2026-10-09",
   "changePct": -0.7,
   "close": 444.18,
   "closeDate": "2026-10-09"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 6384.24,
   "date": "2026-10-12",
   "changePct": -3.6,
   "close": 6384.24,
   "closeDate": "2026-10-12"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7811.54,
   "date": "2026-10-09",
   "changePct": 0.6,
   "close": 7811.54,
   "closeDate": "2026-10-09"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 213.04,
   "date": "2026-10-09",
   "changePct": 0.6,
   "close": 213.04,
   "closeDate": "2026-10-09"
  }
 }
};
