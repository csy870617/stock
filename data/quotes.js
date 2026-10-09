// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-09",
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
   "price": 522.61,
   "date": "2026-10-08",
   "changePct": -1.3,
   "close": 522.61,
   "closeDate": "2026-10-08"
  },
  "V": {
   "price": 375.1,
   "date": "2026-10-08",
   "changePct": 0.8,
   "close": 375.1,
   "closeDate": "2026-10-08"
  },
  "MA": {
   "price": 574.76,
   "date": "2026-10-08",
   "changePct": 0.8,
   "close": 574.76,
   "closeDate": "2026-10-08"
  },
  "GOOGL": {
   "price": 348.29,
   "date": "2026-10-08",
   "changePct": -0.6,
   "close": 348.29,
   "closeDate": "2026-10-08"
  },
  "AMZN": {
   "price": 254.06,
   "date": "2026-10-08",
   "changePct": -2.3,
   "close": 254.06,
   "closeDate": "2026-10-08"
  },
  "COST": {
   "price": 947.92,
   "date": "2026-10-08",
   "changePct": 0.6,
   "close": 947.92,
   "closeDate": "2026-10-08"
  },
  "NVDA": {
   "price": 230.48,
   "date": "2026-10-08",
   "changePct": -2.9,
   "close": 230.48,
   "closeDate": "2026-10-08"
  },
  "META": {
   "price": 720.89,
   "date": "2026-10-08",
   "changePct": -0.1,
   "close": 720.89,
   "closeDate": "2026-10-08"
  },
  "AVGO": {
   "price": 360.14,
   "date": "2026-10-08",
   "changePct": -4.3,
   "close": 360.14,
   "closeDate": "2026-10-08"
  },
  "TSM": {
   "price": 457.99,
   "date": "2026-10-08",
   "changePct": -3,
   "close": 457.99,
   "closeDate": "2026-10-08"
  },
  "PLTR": {
   "price": 198.78,
   "date": "2026-10-08",
   "changePct": 2.4,
   "close": 198.78,
   "closeDate": "2026-10-08"
  },
  "UBER": {
   "price": 70.24,
   "date": "2026-10-08",
   "changePct": 2.6,
   "close": 70.24,
   "closeDate": "2026-10-08"
  },
  "GM": {
   "price": 82.25,
   "date": "2026-10-08",
   "changePct": 1.6,
   "close": 82.25,
   "closeDate": "2026-10-08"
  },
  "VZ": {
   "price": 46.35,
   "date": "2026-10-08",
   "changePct": 1.3,
   "close": 46.35,
   "closeDate": "2026-10-08"
  },
  "C": {
   "price": 128.08,
   "date": "2026-10-08",
   "changePct": 0.6,
   "close": 128.08,
   "closeDate": "2026-10-08"
  },
  "PEP": {
   "price": 128.34,
   "date": "2026-10-08",
   "changePct": 3.7,
   "close": 128.34,
   "closeDate": "2026-10-08"
  },
  "O": {
   "price": 54.17,
   "date": "2026-10-08",
   "changePct": 1.5,
   "close": 54.17,
   "closeDate": "2026-10-08"
  },
  "DUK": {
   "price": 116.84,
   "date": "2026-10-08",
   "changePct": 1.2,
   "close": 116.84,
   "closeDate": "2026-10-08"
  },
  "XOM": {
   "price": 168.5,
   "date": "2026-10-08",
   "changePct": 2.7,
   "close": 168.5,
   "closeDate": "2026-10-08"
  },
  "KO": {
   "price": 87.77,
   "date": "2026-10-08",
   "changePct": 2.3,
   "close": 87.77,
   "closeDate": "2026-10-08"
  },
  "JNJ": {
   "price": 256.48,
   "date": "2026-10-08",
   "changePct": -0.8,
   "close": 256.48,
   "closeDate": "2026-10-08"
  },
  "AXON": {
   "price": 417.31,
   "date": "2026-10-08",
   "changePct": 2.8,
   "close": 417.31,
   "closeDate": "2026-10-08"
  },
  "NXT": {
   "price": 85.26,
   "date": "2026-10-08",
   "changePct": -0.9,
   "close": 85.26,
   "closeDate": "2026-10-08"
  },
  "TCOM": {
   "price": 37.96,
   "date": "2026-10-08",
   "changePct": -0.3,
   "close": 37.96,
   "closeDate": "2026-10-08"
  },
  "LLY": {
   "price": 1169.6,
   "date": "2026-10-08",
   "changePct": -1.6,
   "close": 1169.6,
   "closeDate": "2026-10-08"
  },
  "CVX": {
   "price": 211.55,
   "date": "2026-10-08",
   "changePct": 3.1,
   "close": 211.55,
   "closeDate": "2026-10-08"
  },
  "CI": {
   "price": 281.03,
   "date": "2026-10-08",
   "changePct": 0.9,
   "close": 281.03,
   "closeDate": "2026-10-08"
  },
  "ALGN": {
   "price": 141.03,
   "date": "2026-10-08",
   "changePct": 0.8,
   "close": 141.03,
   "closeDate": "2026-10-08"
  },
  "NOW": {
   "price": 139.75,
   "date": "2026-10-08",
   "changePct": 1.4,
   "close": 139.75,
   "closeDate": "2026-10-08"
  },
  "TSLA": {
   "price": 375,
   "date": "2026-10-08",
   "changePct": -0.7,
   "close": 375,
   "closeDate": "2026-10-08"
  },
  "PG": {
   "price": 150.59,
   "date": "2026-10-08",
   "changePct": 1.9,
   "close": 150.59,
   "closeDate": "2026-10-08"
  },
  "MDLZ": {
   "price": 60.67,
   "date": "2026-10-08",
   "changePct": 2.2,
   "close": 60.67,
   "closeDate": "2026-10-08"
  },
  "AAPL": {
   "price": 340.42,
   "date": "2026-10-08",
   "changePct": 1.1,
   "close": 340.42,
   "closeDate": "2026-10-08"
  },
  "ABT": {
   "price": 98.49,
   "date": "2026-10-08",
   "changePct": -0.2,
   "close": 98.49,
   "closeDate": "2026-10-08"
  },
  "MU": {
   "price": 1035.84,
   "date": "2026-10-08",
   "changePct": -4.8,
   "close": 1035.84,
   "closeDate": "2026-10-08"
  },
  "MDT": {
   "price": 87.75,
   "date": "2026-10-08",
   "changePct": 2.6,
   "close": 87.75,
   "closeDate": "2026-10-08"
  },
  "IREN": {
   "price": 35.71,
   "date": "2026-10-08",
   "changePct": -7.7,
   "close": 35.71,
   "closeDate": "2026-10-08"
  },
  "UNH": {
   "price": 370.95,
   "date": "2026-10-08",
   "changePct": -1.3,
   "close": 370.95,
   "closeDate": "2026-10-08"
  },
  "DE": {
   "price": 652.58,
   "date": "2026-10-08",
   "changePct": -0.7,
   "close": 652.58,
   "closeDate": "2026-10-08"
  },
  "MCHP": {
   "price": 75.52,
   "date": "2026-10-08",
   "changePct": -3.2,
   "close": 75.52,
   "closeDate": "2026-10-08"
  },
  "ISRG": {
   "price": 415.41,
   "date": "2026-10-08",
   "changePct": 0.2,
   "close": 415.41,
   "closeDate": "2026-10-08"
  },
  "GILD": {
   "price": 147.1,
   "date": "2026-10-08",
   "changePct": 0.2,
   "close": 147.1,
   "closeDate": "2026-10-08"
  },
  "BRK.B": {
   "price": 511.05,
   "date": "2026-10-08",
   "changePct": 0.9,
   "close": 511.05,
   "closeDate": "2026-10-08"
  },
  "TMO": {
   "price": 651.98,
   "date": "2026-10-08",
   "changePct": -1.5,
   "close": 651.98,
   "closeDate": "2026-10-08"
  },
  "ECL": {
   "price": 281.69,
   "date": "2026-10-08",
   "changePct": 1.3,
   "close": 281.69,
   "closeDate": "2026-10-08"
  },
  "APH": {
   "price": 85.32,
   "date": "2026-10-08",
   "changePct": -2.5,
   "close": 85.32,
   "closeDate": "2026-10-08"
  },
  "NVT": {
   "price": 164.2,
   "date": "2026-10-08",
   "changePct": -2.2,
   "close": 164.2,
   "closeDate": "2026-10-08"
  },
  "FSS": {
   "price": 112.61,
   "date": "2026-10-08",
   "changePct": -1.6,
   "close": 112.61,
   "closeDate": "2026-10-08"
  },
  "MPWR": {
   "price": 1369.8,
   "date": "2026-10-08",
   "changePct": -3.9,
   "close": 1369.8,
   "closeDate": "2026-10-08"
  },
  "MKSI": {
   "price": 260.38,
   "date": "2026-10-08",
   "changePct": -4.7,
   "close": 260.38,
   "closeDate": "2026-10-08"
  },
  "AAON": {
   "price": 85.95,
   "date": "2026-10-08",
   "changePct": -1.4,
   "close": 85.95,
   "closeDate": "2026-10-08"
  },
  "NVMI": {
   "price": 354.59,
   "date": "2026-10-08",
   "changePct": -6.1,
   "close": 354.59,
   "closeDate": "2026-10-08"
  },
  "POWL": {
   "price": 189.27,
   "date": "2026-10-08",
   "changePct": -4.3,
   "close": 189.27,
   "closeDate": "2026-10-08"
  },
  "TXN": {
   "price": 288.2,
   "date": "2026-10-08",
   "changePct": -0.3,
   "close": 288.2,
   "closeDate": "2026-10-08"
  },
  "MSI": {
   "price": 447.12,
   "date": "2026-10-08",
   "changePct": -0.3,
   "close": 447.12,
   "closeDate": "2026-10-08"
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
   "price": 7765.36,
   "date": "2026-10-08",
   "changePct": -0.5,
   "close": 7765.36,
   "closeDate": "2026-10-08"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 211.87,
   "date": "2026-10-08",
   "changePct": 0.6,
   "close": 211.87,
   "closeDate": "2026-10-08"
  }
 }
};
