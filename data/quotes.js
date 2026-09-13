// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date }
window.STOCK_QUOTES = {
 "generatedAt": "2026-09-13",
 "quotes": {
  "105560": {
   "price": 177900,
   "date": "2026-09-11",
   "changePct": 2.6
  },
  "139130": {
   "price": 18450,
   "date": "2026-09-11",
   "changePct": 0.9
  },
  "175330": {
   "price": 31750,
   "date": "2026-09-11",
   "changePct": 1
  },
  "192820": {
   "price": 270500,
   "date": "2026-09-11",
   "changePct": 2.1
  },
  "207940": {
   "price": 1415000,
   "date": "2026-09-11",
   "changePct": -0.6
  },
  "213420": {
   "price": 30850,
   "date": "2026-09-11",
   "changePct": -5.4
  },
  "214150": {
   "price": 32050,
   "date": "2026-09-11",
   "changePct": 3.4
  },
  "257720": {
   "price": 43500,
   "date": "2026-09-11",
   "changePct": -0.1
  },
  "267260": {
   "price": 747000,
   "date": "2026-09-11",
   "changePct": 0.1
  },
  "280360": {
   "price": 142900,
   "date": "2026-09-11",
   "changePct": -1.2
  },
  "316140": {
   "price": 35100,
   "date": "2026-09-11",
   "changePct": 3.2
  },
  "323410": {
   "price": 21350,
   "date": "2026-09-11",
   "changePct": 0
  },
  "329180": {
   "price": 479000,
   "date": "2026-09-11",
   "changePct": 5.6
  },
  "361610": {
   "price": 16690,
   "date": "2026-09-11",
   "changePct": -5.4
  },
  "403870": {
   "price": 53300,
   "date": "2026-09-11",
   "changePct": -4.1
  },
  "443060": {
   "price": 247000,
   "date": "2026-09-11",
   "changePct": 7.6
  },
  "005930": {
   "price": 259500,
   "date": "2026-09-11",
   "changePct": -3.5
  },
  "055550": {
   "price": 112900,
   "date": "2026-09-11",
   "changePct": 2.4
  },
  "000810": {
   "price": 686000,
   "date": "2026-09-11",
   "changePct": 6
  },
  "028260": {
   "price": 367000,
   "date": "2026-09-11",
   "changePct": -3.3
  },
  "012330": {
   "price": 415500,
   "date": "2026-09-11",
   "changePct": 0
  },
  "086790": {
   "price": 137800,
   "date": "2026-09-11",
   "changePct": 1.8
  },
  "000660": {
   "price": 1812000,
   "date": "2026-09-11",
   "changePct": -2.2
  },
  "012450": {
   "price": 1081000,
   "date": "2026-09-11",
   "changePct": 1.3
  },
  "009540": {
   "price": 365500,
   "date": "2026-09-11",
   "changePct": 4
  },
  "068270": {
   "price": 178200,
   "date": "2026-09-11",
   "changePct": -1.4
  },
  "035420": {
   "price": 206500,
   "date": "2026-09-11",
   "changePct": -0.7
  },
  "034020": {
   "price": 90800,
   "date": "2026-09-11",
   "changePct": 1
  },
  "000270": {
   "price": 126600,
   "date": "2026-09-11",
   "changePct": -0.3
  },
  "016360": {
   "price": 87400,
   "date": "2026-09-11",
   "changePct": 0
  },
  "005490": {
   "price": 334000,
   "date": "2026-09-11",
   "changePct": -1.5
  },
  "015760": {
   "price": 33100,
   "date": "2026-09-11",
   "changePct": 1.1
  },
  "096770": {
   "price": 144800,
   "date": "2026-09-11",
   "changePct": -5.4
  },
  "051910": {
   "price": 273000,
   "date": "2026-09-11",
   "changePct": -2.7
  },
  "003490": {
   "price": 28950,
   "date": "2026-09-11",
   "changePct": -2
  },
  "032640": {
   "price": 14890,
   "date": "2026-09-11",
   "changePct": 0.9
  },
  "088980": {
   "price": 9790,
   "date": "2026-09-11",
   "changePct": -0.7
  },
  "029780": {
   "price": 45500,
   "date": "2026-09-11",
   "changePct": -0.2
  },
  "024110": {
   "price": 20850,
   "date": "2026-09-11",
   "changePct": 1.7
  },
  "058470": {
   "price": 66400,
   "date": "2026-09-11",
   "changePct": -4.2
  },
  "082920": {
   "price": 27800,
   "date": "2026-09-11",
   "changePct": -1.8
  },
  "064760": {
   "price": 258000,
   "date": "2026-09-11",
   "changePct": -5
  },
  "014680": {
   "price": 200000,
   "date": "2026-09-11",
   "changePct": -1
  },
  "039030": {
   "price": 445500,
   "date": "2026-09-11",
   "changePct": -2.1
  },
  "011780": {
   "price": 124900,
   "date": "2026-09-11",
   "changePct": -1.5
  },
  "035900": {
   "price": 39350,
   "date": "2026-09-11",
   "changePct": 0.4
  },
  "078930": {
   "price": 119000,
   "date": "2026-09-11",
   "changePct": 0.9
  },
  "030000": {
   "price": 18910,
   "date": "2026-09-11",
   "changePct": 0.3
  },
  "021240": {
   "price": 95200,
   "date": "2026-09-11",
   "changePct": -1
  },
  "036570": {
   "price": 205500,
   "date": "2026-09-11",
   "changePct": -1.9
  },
  "035720": {
   "price": 34500,
   "date": "2026-09-11",
   "changePct": -1.1
  },
  "001040": {
   "price": 128300,
   "date": "2026-09-11",
   "changePct": 0.5
  },
  "012750": {
   "price": 81400,
   "date": "2026-09-11",
   "changePct": 0.7
  },
  "086280": {
   "price": 208500,
   "date": "2026-09-11",
   "changePct": 2.2
  },
  "047050": {
   "price": 57700,
   "date": "2026-09-11",
   "changePct": 0.7
  },
  "MSFT": {
   "price": 495.63,
   "date": "2026-09-11",
   "changePct": 0.6
  },
  "V": {
   "price": 370.45,
   "date": "2026-09-11",
   "changePct": 0.9
  },
  "MA": {
   "price": 569.19,
   "date": "2026-09-11",
   "changePct": 0.7
  },
  "GOOGL": {
   "price": 338.5,
   "date": "2026-09-11",
   "changePct": 1.8
  },
  "AMZN": {
   "price": 256.78,
   "date": "2026-09-11",
   "changePct": 1.9
  },
  "COST": {
   "price": 904.77,
   "date": "2026-09-11",
   "changePct": 0.3
  },
  "NVDA": {
   "price": 218.29,
   "date": "2026-09-11",
   "changePct": 0
  },
  "META": {
   "price": 648.03,
   "date": "2026-09-11",
   "changePct": 0.6
  },
  "AVGO": {
   "price": 361.99,
   "date": "2026-09-11",
   "changePct": 0.3
  },
  "TSM": {
   "price": 433.24,
   "date": "2026-09-11",
   "changePct": 1.2
  },
  "PLTR": {
   "price": 167.23,
   "date": "2026-09-11",
   "changePct": 0.8
  },
  "UBER": {
   "price": 71.67,
   "date": "2026-09-11",
   "changePct": -1.2
  },
  "GM": {
   "price": 85.62,
   "date": "2026-09-11",
   "changePct": -0.6
  },
  "VZ": {
   "price": 50.61,
   "date": "2026-09-11",
   "changePct": 1.3
  },
  "C": {
   "price": 138.82,
   "date": "2026-09-11",
   "changePct": 0.2
  },
  "PEP": {
   "price": 136.32,
   "date": "2026-09-11",
   "changePct": -0.2
  },
  "O": {
   "price": 59.5,
   "date": "2026-09-11",
   "changePct": -0.1
  },
  "DUK": {
   "price": 119.42,
   "date": "2026-09-11",
   "changePct": 0
  },
  "XOM": {
   "price": 165.99,
   "date": "2026-09-11",
   "changePct": 0.5
  },
  "KO": {
   "price": 88.29,
   "date": "2026-09-11",
   "changePct": 0.5
  },
  "JNJ": {
   "price": 265.58,
   "date": "2026-09-11",
   "changePct": -0.3
  },
  "AXON": {
   "price": 479.34,
   "date": "2026-09-11",
   "changePct": 0.1
  },
  "CRDO": {
   "price": 162.95,
   "date": "2026-09-11",
   "changePct": 1.6
  },
  "RDDT": {
   "price": 157.77,
   "date": "2026-09-11",
   "changePct": 1.6
  },
  "AEIS": {
   "price": 287.25,
   "date": "2026-09-11",
   "changePct": 4.9
  },
  "STRL": {
   "price": 511.04,
   "date": "2026-09-11",
   "changePct": 5.4
  },
  "NXT": {
   "price": 82.89,
   "date": "2026-09-11",
   "changePct": 1.9
  },
  "FOUR": {
   "price": 45.05,
   "date": "2026-09-11",
   "changePct": 4.7
  },
  "TCOM": {
   "price": 39.02,
   "date": "2026-09-11",
   "changePct": 0.8
  },
  "LLY": {
   "price": 1115.7,
   "date": "2026-09-11",
   "changePct": -0.7
  },
  "CVX": {
   "price": 214.06,
   "date": "2026-09-11",
   "changePct": 0.6
  },
  "CI": {
   "price": 280.76,
   "date": "2026-09-11",
   "changePct": -0.1
  },
  "ALGN": {
   "price": 150.82,
   "date": "2026-09-11",
   "changePct": 0.1
  },
  "NOW": {
   "price": 132.53,
   "date": "2026-09-11",
   "changePct": 1
  },
  "LITE": {
   "price": 927.03,
   "date": "2026-09-11",
   "changePct": -0.9
  },
  "TSLA": {
   "price": 365.44,
   "date": "2026-09-11",
   "changePct": 0.5
  },
  "PG": {
   "price": 145.27,
   "date": "2026-09-11",
   "changePct": 1.6
  },
  "MDLZ": {
   "price": 62.44,
   "date": "2026-09-11",
   "changePct": 0
  },
  "SCHW": {
   "price": 107.25,
   "date": "2026-09-11",
   "changePct": -0.1
  },
  "AAPL": {
   "price": 332.27,
   "date": "2026-09-11",
   "changePct": 1.7
  },
  "ABT": {
   "price": 101.95,
   "date": "2026-09-11",
   "changePct": -1.4
  },
  "MU": {
   "price": 975.26,
   "date": "2026-09-11",
   "changePct": -0.2
  },
  "MDT": {
   "price": 90.96,
   "date": "2026-09-11",
   "changePct": -0.7
  },
  "IREN": {
   "price": 43.83,
   "date": "2026-09-11",
   "changePct": 0.4
  },
  "BMY": {
   "price": 63.64,
   "date": "2026-09-11",
   "changePct": -0.2
  },
  "UNH": {
   "price": 379.09,
   "date": "2026-09-11",
   "changePct": -2.4
  },
  "RSG": {
   "price": 222.74,
   "date": "2026-09-11",
   "changePct": 0.8
  },
  "CLS": {
   "price": 346.55,
   "date": "2026-09-11",
   "changePct": 6.6
  },
  "PGR": {
   "price": 217.62,
   "date": "2026-09-11",
   "changePct": 0.7
  },
  "GS": {
   "price": 1029.18,
   "date": "2026-09-11",
   "changePct": 0.9
  },
  "COP": {
   "price": 137.35,
   "date": "2026-09-11",
   "changePct": 0.2
  },
  "DE": {
   "price": 675.74,
   "date": "2026-09-11",
   "changePct": -0.3
  },
  "MCHP": {
   "price": 74.2,
   "date": "2026-09-11",
   "changePct": 3.7
  },
  "HUM": {
   "price": 409.8,
   "date": "2026-09-11",
   "changePct": 2.3
  }
 }
};
