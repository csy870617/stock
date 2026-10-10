// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-10",
 "quotes": {
  "105560": {
   "price": 162800,
   "date": "2026-10-08",
   "changePct": -3.4,
   "close": 162800,
   "closeDate": "2026-10-08"
  },
  "139130": {
   "price": 17570,
   "date": "2026-10-08",
   "changePct": -2.4,
   "close": 17570,
   "closeDate": "2026-10-08"
  },
  "175330": {
   "price": 27850,
   "date": "2026-10-08",
   "changePct": -1.4,
   "close": 27850,
   "closeDate": "2026-10-08"
  },
  "207940": {
   "price": 1219000,
   "date": "2026-10-08",
   "changePct": -4.5,
   "close": 1219000,
   "closeDate": "2026-10-08"
  },
  "213420": {
   "price": 29950,
   "date": "2026-10-08",
   "changePct": 0.5,
   "close": 29950,
   "closeDate": "2026-10-08"
  },
  "214150": {
   "price": 30350,
   "date": "2026-10-08",
   "changePct": -1.1,
   "close": 30350,
   "closeDate": "2026-10-08"
  },
  "257720": {
   "price": 35450,
   "date": "2026-10-08",
   "changePct": -5.6,
   "close": 35450,
   "closeDate": "2026-10-08"
  },
  "267260": {
   "price": 606000,
   "date": "2026-10-08",
   "changePct": -3.5,
   "close": 606000,
   "closeDate": "2026-10-08"
  },
  "316140": {
   "price": 32350,
   "date": "2026-10-08",
   "changePct": -3,
   "close": 32350,
   "closeDate": "2026-10-08"
  },
  "323410": {
   "price": 19470,
   "date": "2026-10-08",
   "changePct": -2,
   "close": 19470,
   "closeDate": "2026-10-08"
  },
  "329180": {
   "price": 384000,
   "date": "2026-10-08",
   "changePct": -4,
   "close": 384000,
   "closeDate": "2026-10-08"
  },
  "361610": {
   "price": 18600,
   "date": "2026-10-08",
   "changePct": 1.8,
   "close": 18600,
   "closeDate": "2026-10-08"
  },
  "403870": {
   "price": 64600,
   "date": "2026-10-08",
   "changePct": -1.4,
   "close": 64600,
   "closeDate": "2026-10-08"
  },
  "005930": {
   "price": 262000,
   "date": "2026-10-08",
   "changePct": -2.4,
   "close": 262000,
   "closeDate": "2026-10-08"
  },
  "055550": {
   "price": 99500,
   "date": "2026-10-08",
   "changePct": -3.7,
   "close": 99500,
   "closeDate": "2026-10-08"
  },
  "000810": {
   "price": 612000,
   "date": "2026-10-08",
   "changePct": -2.7,
   "close": 612000,
   "closeDate": "2026-10-08"
  },
  "028260": {
   "price": 317500,
   "date": "2026-10-08",
   "changePct": -5.5,
   "close": 317500,
   "closeDate": "2026-10-08"
  },
  "012330": {
   "price": 359000,
   "date": "2026-10-08",
   "changePct": -3.9,
   "close": 359000,
   "closeDate": "2026-10-08"
  },
  "086790": {
   "price": 124300,
   "date": "2026-10-08",
   "changePct": -3.6,
   "close": 124300,
   "closeDate": "2026-10-08"
  },
  "000660": {
   "price": 1681000,
   "date": "2026-10-08",
   "changePct": -2.4,
   "close": 1681000,
   "closeDate": "2026-10-08"
  },
  "012450": {
   "price": 891000,
   "date": "2026-10-08",
   "changePct": -8.3,
   "close": 891000,
   "closeDate": "2026-10-08"
  },
  "009540": {
   "price": 291500,
   "date": "2026-10-08",
   "changePct": -3.3,
   "close": 291500,
   "closeDate": "2026-10-08"
  },
  "068270": {
   "price": 179600,
   "date": "2026-10-08",
   "changePct": -2.1,
   "close": 179600,
   "closeDate": "2026-10-08"
  },
  "035420": {
   "price": 183800,
   "date": "2026-10-08",
   "changePct": -2.8,
   "close": 183800,
   "closeDate": "2026-10-08"
  },
  "034020": {
   "price": 78000,
   "date": "2026-10-08",
   "changePct": -3.1,
   "close": 78000,
   "closeDate": "2026-10-08"
  },
  "000270": {
   "price": 106800,
   "date": "2026-10-08",
   "changePct": -2.6,
   "close": 106800,
   "closeDate": "2026-10-08"
  },
  "005490": {
   "price": 306500,
   "date": "2026-10-08",
   "changePct": -0.3,
   "close": 306500,
   "closeDate": "2026-10-08"
  },
  "015760": {
   "price": 29100,
   "date": "2026-10-08",
   "changePct": -3.2,
   "close": 29100,
   "closeDate": "2026-10-08"
  },
  "096770": {
   "price": 160900,
   "date": "2026-10-08",
   "changePct": 0.8,
   "close": 160900,
   "closeDate": "2026-10-08"
  },
  "051910": {
   "price": 286500,
   "date": "2026-10-08",
   "changePct": 3.4,
   "close": 286500,
   "closeDate": "2026-10-08"
  },
  "003490": {
   "price": 30700,
   "date": "2026-10-08",
   "changePct": -0.5,
   "close": 30700,
   "closeDate": "2026-10-08"
  },
  "032640": {
   "price": 14400,
   "date": "2026-10-08",
   "changePct": -0.7,
   "close": 14400,
   "closeDate": "2026-10-08"
  },
  "088980": {
   "price": 9750,
   "date": "2026-10-08",
   "changePct": -0.5,
   "close": 9750,
   "closeDate": "2026-10-08"
  },
  "029780": {
   "price": 41200,
   "date": "2026-10-08",
   "changePct": -1.3,
   "close": 41200,
   "closeDate": "2026-10-08"
  },
  "024110": {
   "price": 19750,
   "date": "2026-10-08",
   "changePct": -1.7,
   "close": 19750,
   "closeDate": "2026-10-08"
  },
  "058470": {
   "price": 87900,
   "date": "2026-10-08",
   "changePct": 3.2,
   "close": 87900,
   "closeDate": "2026-10-08"
  },
  "082920": {
   "price": 27950,
   "date": "2026-10-08",
   "changePct": -5.4,
   "close": 27950,
   "closeDate": "2026-10-08"
  },
  "064760": {
   "price": 298000,
   "date": "2026-10-08",
   "changePct": 4.6,
   "close": 298000,
   "closeDate": "2026-10-08"
  },
  "014680": {
   "price": 271000,
   "date": "2026-10-08",
   "changePct": 0.7,
   "close": 271000,
   "closeDate": "2026-10-08"
  },
  "039030": {
   "price": 524000,
   "date": "2026-10-08",
   "changePct": 1.2,
   "close": 524000,
   "closeDate": "2026-10-08"
  },
  "011780": {
   "price": 114700,
   "date": "2026-10-08",
   "changePct": -1,
   "close": 114700,
   "closeDate": "2026-10-08"
  },
  "035900": {
   "price": 39550,
   "date": "2026-10-08",
   "changePct": 2.6,
   "close": 39550,
   "closeDate": "2026-10-08"
  },
  "021240": {
   "price": 101400,
   "date": "2026-10-08",
   "changePct": -0.8,
   "close": 101400,
   "closeDate": "2026-10-08"
  },
  "036570": {
   "price": 222000,
   "date": "2026-10-08",
   "changePct": -6.5,
   "close": 222000,
   "closeDate": "2026-10-08"
  },
  "035720": {
   "price": 32300,
   "date": "2026-10-08",
   "changePct": -2.3,
   "close": 32300,
   "closeDate": "2026-10-08"
  },
  "001040": {
   "price": 130400,
   "date": "2026-10-08",
   "changePct": -1.1,
   "close": 130400,
   "closeDate": "2026-10-08"
  },
  "012750": {
   "price": 84200,
   "date": "2026-10-08",
   "changePct": 0.5,
   "close": 84200,
   "closeDate": "2026-10-08"
  },
  "047050": {
   "price": 57100,
   "date": "2026-10-08",
   "changePct": -0.2,
   "close": 57100,
   "closeDate": "2026-10-08"
  },
  "010120": {
   "price": 195500,
   "date": "2026-10-08",
   "changePct": -4.9,
   "close": 195500,
   "closeDate": "2026-10-08"
  },
  "033780": {
   "price": 177400,
   "date": "2026-10-08",
   "changePct": -1.2,
   "close": 177400,
   "closeDate": "2026-10-08"
  },
  "001120": {
   "price": 43350,
   "date": "2026-10-08",
   "changePct": -1.4,
   "close": 43350,
   "closeDate": "2026-10-08"
  },
  "004370": {
   "price": 397500,
   "date": "2026-10-08",
   "changePct": -0.6,
   "close": 397500,
   "closeDate": "2026-10-08"
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
   "price": 6625.93,
   "date": "2026-10-08",
   "changePct": -2.6,
   "close": 6625.93,
   "closeDate": "2026-10-08"
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
