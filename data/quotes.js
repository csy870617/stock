// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-08",
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
   "price": 530.66,
   "date": "2026-10-08",
   "changePct": 0.2,
   "close": 529.76,
   "closeDate": "2026-10-07"
  },
  "V": {
   "price": 374.84,
   "date": "2026-10-08",
   "changePct": 0.7,
   "close": 372.1,
   "closeDate": "2026-10-07"
  },
  "MA": {
   "price": 574.98,
   "date": "2026-10-08",
   "changePct": 0.9,
   "close": 570.06,
   "closeDate": "2026-10-07"
  },
  "GOOGL": {
   "price": 351.99,
   "date": "2026-10-08",
   "changePct": 0.4,
   "close": 350.5,
   "closeDate": "2026-10-07"
  },
  "AMZN": {
   "price": 259.105,
   "date": "2026-10-08",
   "changePct": -0.3,
   "close": 259.92,
   "closeDate": "2026-10-07"
  },
  "COST": {
   "price": 944.43,
   "date": "2026-10-08",
   "changePct": 0.2,
   "close": 942.25,
   "closeDate": "2026-10-07"
  },
  "NVDA": {
   "price": 236.105,
   "date": "2026-10-08",
   "changePct": -0.6,
   "close": 237.47,
   "closeDate": "2026-10-07"
  },
  "META": {
   "price": 721.28,
   "date": "2026-10-08",
   "changePct": 0,
   "close": 721.31,
   "closeDate": "2026-10-07"
  },
  "AVGO": {
   "price": 370.675,
   "date": "2026-10-08",
   "changePct": -1.5,
   "close": 376.51,
   "closeDate": "2026-10-07"
  },
  "TSM": {
   "price": 468.015,
   "date": "2026-10-08",
   "changePct": -0.9,
   "close": 472.2,
   "closeDate": "2026-10-07"
  },
  "PLTR": {
   "price": 199.57,
   "date": "2026-10-08",
   "changePct": 2.8,
   "close": 194.12,
   "closeDate": "2026-10-07"
  },
  "UBER": {
   "price": 68.655,
   "date": "2026-10-08",
   "changePct": 0.3,
   "close": 68.45,
   "closeDate": "2026-10-07"
  },
  "GM": {
   "price": 80.87,
   "date": "2026-10-08",
   "changePct": -0.1,
   "close": 80.99,
   "closeDate": "2026-10-07"
  },
  "VZ": {
   "price": 45.885,
   "date": "2026-10-08",
   "changePct": 0.3,
   "close": 45.77,
   "closeDate": "2026-10-07"
  },
  "C": {
   "price": 125.92,
   "date": "2026-10-08",
   "changePct": -1.1,
   "close": 127.32,
   "closeDate": "2026-10-07"
  },
  "PEP": {
   "price": 125.315,
   "date": "2026-10-08",
   "changePct": 1.3,
   "close": 123.73,
   "closeDate": "2026-10-07"
  },
  "O": {
   "price": 53.22,
   "date": "2026-10-08",
   "changePct": -0.2,
   "close": 53.35,
   "closeDate": "2026-10-07"
  },
  "DUK": {
   "price": 115.37,
   "date": "2026-10-08",
   "changePct": -0.1,
   "close": 115.5,
   "closeDate": "2026-10-07"
  },
  "XOM": {
   "price": 168.685,
   "date": "2026-10-08",
   "changePct": 2.8,
   "close": 164.05,
   "closeDate": "2026-10-07"
  },
  "KO": {
   "price": 86.965,
   "date": "2026-10-08",
   "changePct": 1.3,
   "close": 85.82,
   "closeDate": "2026-10-07"
  },
  "JNJ": {
   "price": 252.65,
   "date": "2026-10-08",
   "changePct": -2.2,
   "close": 258.45,
   "closeDate": "2026-10-07"
  },
  "AXON": {
   "price": 403,
   "date": "2026-10-08",
   "changePct": -0.7,
   "close": 406,
   "closeDate": "2026-10-07"
  },
  "NXT": {
   "price": 85.57,
   "date": "2026-10-08",
   "changePct": -0.5,
   "close": 86.04,
   "closeDate": "2026-10-07"
  },
  "TCOM": {
   "price": 37.7,
   "date": "2026-10-08",
   "changePct": -1,
   "close": 38.09,
   "closeDate": "2026-10-07"
  },
  "LLY": {
   "price": 1142.38,
   "date": "2026-10-08",
   "changePct": -3.9,
   "close": 1188.72,
   "closeDate": "2026-10-07"
  },
  "CVX": {
   "price": 211.5,
   "date": "2026-10-08",
   "changePct": 3.1,
   "close": 205.15,
   "closeDate": "2026-10-07"
  },
  "CI": {
   "price": 276,
   "date": "2026-10-08",
   "changePct": -0.9,
   "close": 278.51,
   "closeDate": "2026-10-07"
  },
  "ALGN": {
   "price": 138.54,
   "date": "2026-10-08",
   "changePct": -1,
   "close": 139.87,
   "closeDate": "2026-10-07"
  },
  "NOW": {
   "price": 137.16,
   "date": "2026-10-08",
   "changePct": -0.5,
   "close": 137.87,
   "closeDate": "2026-10-07"
  },
  "TSLA": {
   "price": 372.65,
   "date": "2026-10-08",
   "changePct": -1.4,
   "close": 377.81,
   "closeDate": "2026-10-07"
  },
  "PG": {
   "price": 148.935,
   "date": "2026-10-08",
   "changePct": 0.8,
   "close": 147.82,
   "closeDate": "2026-10-07"
  },
  "MDLZ": {
   "price": 60.035,
   "date": "2026-10-08",
   "changePct": 1.1,
   "close": 59.38,
   "closeDate": "2026-10-07"
  },
  "AAPL": {
   "price": 337.59,
   "date": "2026-10-08",
   "changePct": 0.3,
   "close": 336.67,
   "closeDate": "2026-10-07"
  },
  "ABT": {
   "price": 97.415,
   "date": "2026-10-08",
   "changePct": -1.3,
   "close": 98.73,
   "closeDate": "2026-10-07"
  },
  "MU": {
   "price": 1065.82,
   "date": "2026-10-08",
   "changePct": -2,
   "close": 1088,
   "closeDate": "2026-10-07"
  },
  "MDT": {
   "price": 87.32,
   "date": "2026-10-08",
   "changePct": 2.1,
   "close": 85.51,
   "closeDate": "2026-10-07"
  },
  "IREN": {
   "price": 36.515,
   "date": "2026-10-08",
   "changePct": -5.6,
   "close": 38.69,
   "closeDate": "2026-10-07"
  },
  "UNH": {
   "price": 369.785,
   "date": "2026-10-08",
   "changePct": -1.6,
   "close": 375.98,
   "closeDate": "2026-10-07"
  },
  "DE": {
   "price": 640.75,
   "date": "2026-10-08",
   "changePct": -2.5,
   "close": 656.87,
   "closeDate": "2026-10-07"
  },
  "MCHP": {
   "price": 75.96,
   "date": "2026-10-08",
   "changePct": -2.6,
   "close": 78.02,
   "closeDate": "2026-10-07"
  },
  "ISRG": {
   "price": 412.08,
   "date": "2026-10-08",
   "changePct": -0.6,
   "close": 414.52,
   "closeDate": "2026-10-07"
  },
  "GILD": {
   "price": 145.04,
   "date": "2026-10-08",
   "changePct": -1.2,
   "close": 146.85,
   "closeDate": "2026-10-07"
  },
  "BRK.B": {
   "price": 505.97,
   "date": "2026-10-08",
   "changePct": -0.1,
   "close": 506.25,
   "closeDate": "2026-10-07"
  },
  "TMO": {
   "price": 638.48,
   "date": "2026-10-08",
   "changePct": -3.6,
   "close": 662.06,
   "closeDate": "2026-10-07"
  },
  "ECL": {
   "price": 277.895,
   "date": "2026-10-08",
   "changePct": -0.1,
   "close": 278.1,
   "closeDate": "2026-10-07"
  },
  "APH": {
   "price": 86.09,
   "date": "2026-10-08",
   "changePct": -1.7,
   "close": 87.55,
   "closeDate": "2026-10-07"
  },
  "NVT": {
   "price": 166.72,
   "date": "2026-10-08",
   "changePct": -0.7,
   "close": 167.82,
   "closeDate": "2026-10-07"
  },
  "FSS": {
   "price": 111.625,
   "date": "2026-10-08",
   "changePct": -2.4,
   "close": 114.41,
   "closeDate": "2026-10-07"
  },
  "MPWR": {
   "price": 1396.98,
   "date": "2026-10-08",
   "changePct": -2,
   "close": 1425.98,
   "closeDate": "2026-10-07"
  },
  "MKSI": {
   "price": 271.5,
   "date": "2026-10-08",
   "changePct": -0.6,
   "close": 273.15,
   "closeDate": "2026-10-07"
  },
  "AAON": {
   "price": 86.825,
   "date": "2026-10-08",
   "changePct": -0.4,
   "close": 87.13,
   "closeDate": "2026-10-07"
  },
  "NVMI": {
   "price": 359.845,
   "date": "2026-10-08",
   "changePct": -4.7,
   "close": 377.77,
   "closeDate": "2026-10-07"
  },
  "POWL": {
   "price": 194.69,
   "date": "2026-10-08",
   "changePct": -1.5,
   "close": 197.74,
   "closeDate": "2026-10-07"
  },
  "TXN": {
   "price": 288.09,
   "date": "2026-10-08",
   "changePct": -0.3,
   "close": 288.98,
   "closeDate": "2026-10-07"
  },
  "MSI": {
   "price": 444.695,
   "date": "2026-10-08",
   "changePct": -0.8,
   "close": 448.33,
   "closeDate": "2026-10-07"
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
   "price": 7778.7,
   "date": "2026-10-08",
   "changePct": -0.3,
   "close": 7801.77,
   "closeDate": "2026-10-07"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 210.23,
   "date": "2026-10-08",
   "changePct": -0.2,
   "close": 210.6,
   "closeDate": "2026-10-07"
  }
 }
};
