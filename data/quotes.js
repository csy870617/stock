// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-13",
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
   "changePct": -0.1,
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
   "changePct": -1.1,
   "close": 1206000,
   "closeDate": "2026-10-13"
  },
  "213420": {
   "price": 27700,
   "date": "2026-10-13",
   "changePct": -7.5,
   "close": 27700,
   "closeDate": "2026-10-13"
  },
  "257720": {
   "price": 32550,
   "date": "2026-10-13",
   "changePct": -8.2,
   "close": 32550,
   "closeDate": "2026-10-13"
  },
  "267260": {
   "price": 560000,
   "date": "2026-10-13",
   "changePct": -7.6,
   "close": 560000,
   "closeDate": "2026-10-13"
  },
  "316140": {
   "price": 32000,
   "date": "2026-10-13",
   "changePct": -1.1,
   "close": 32000,
   "closeDate": "2026-10-13"
  },
  "323410": {
   "price": 20150,
   "date": "2026-10-13",
   "changePct": 3.5,
   "close": 20150,
   "closeDate": "2026-10-13"
  },
  "329180": {
   "price": 366500,
   "date": "2026-10-13",
   "changePct": -4.6,
   "close": 366500,
   "closeDate": "2026-10-13"
  },
  "361610": {
   "price": 18180,
   "date": "2026-10-13",
   "changePct": -2.3,
   "close": 18180,
   "closeDate": "2026-10-13"
  },
  "403870": {
   "price": 61600,
   "date": "2026-10-13",
   "changePct": -4.6,
   "close": 61600,
   "closeDate": "2026-10-13"
  },
  "005930": {
   "price": 232000,
   "date": "2026-10-13",
   "changePct": -11.5,
   "close": 232000,
   "closeDate": "2026-10-13"
  },
  "055550": {
   "price": 99700,
   "date": "2026-10-13",
   "changePct": 0.2,
   "close": 99700,
   "closeDate": "2026-10-13"
  },
  "000810": {
   "price": 612000,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 612000,
   "closeDate": "2026-10-13"
  },
  "028260": {
   "price": 300000,
   "date": "2026-10-13",
   "changePct": -5.5,
   "close": 300000,
   "closeDate": "2026-10-13"
  },
  "012330": {
   "price": 348500,
   "date": "2026-10-13",
   "changePct": -2.9,
   "close": 348500,
   "closeDate": "2026-10-13"
  },
  "086790": {
   "price": 124400,
   "date": "2026-10-13",
   "changePct": 0.1,
   "close": 124400,
   "closeDate": "2026-10-13"
  },
  "000660": {
   "price": 1443000,
   "date": "2026-10-13",
   "changePct": -14.2,
   "close": 1443000,
   "closeDate": "2026-10-13"
  },
  "012450": {
   "price": 839000,
   "date": "2026-10-13",
   "changePct": -5.8,
   "close": 839000,
   "closeDate": "2026-10-13"
  },
  "009540": {
   "price": 278000,
   "date": "2026-10-13",
   "changePct": -4.6,
   "close": 278000,
   "closeDate": "2026-10-13"
  },
  "068270": {
   "price": 179700,
   "date": "2026-10-13",
   "changePct": 0.1,
   "close": 179700,
   "closeDate": "2026-10-13"
  },
  "035420": {
   "price": 178000,
   "date": "2026-10-13",
   "changePct": -3.2,
   "close": 178000,
   "closeDate": "2026-10-13"
  },
  "034020": {
   "price": 70200,
   "date": "2026-10-13",
   "changePct": -10,
   "close": 70200,
   "closeDate": "2026-10-13"
  },
  "000270": {
   "price": 108300,
   "date": "2026-10-13",
   "changePct": 1.4,
   "close": 108300,
   "closeDate": "2026-10-13"
  },
  "005490": {
   "price": 299000,
   "date": "2026-10-13",
   "changePct": -2.4,
   "close": 299000,
   "closeDate": "2026-10-13"
  },
  "015760": {
   "price": 29150,
   "date": "2026-10-13",
   "changePct": 0.2,
   "close": 29150,
   "closeDate": "2026-10-13"
  },
  "096770": {
   "price": 156800,
   "date": "2026-10-13",
   "changePct": -2.5,
   "close": 156800,
   "closeDate": "2026-10-13"
  },
  "051910": {
   "price": 262000,
   "date": "2026-10-13",
   "changePct": -8.6,
   "close": 262000,
   "closeDate": "2026-10-13"
  },
  "003490": {
   "price": 30500,
   "date": "2026-10-13",
   "changePct": -0.7,
   "close": 30500,
   "closeDate": "2026-10-13"
  },
  "032640": {
   "price": 14780,
   "date": "2026-10-13",
   "changePct": 2.6,
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
   "changePct": 3.6,
   "close": 42700,
   "closeDate": "2026-10-13"
  },
  "024110": {
   "price": 19840,
   "date": "2026-10-13",
   "changePct": 0.5,
   "close": 19840,
   "closeDate": "2026-10-13"
  },
  "058470": {
   "price": 79600,
   "date": "2026-10-13",
   "changePct": -9.4,
   "close": 79600,
   "closeDate": "2026-10-13"
  },
  "082920": {
   "price": 24350,
   "date": "2026-10-13",
   "changePct": -12.9,
   "close": 24350,
   "closeDate": "2026-10-13"
  },
  "064760": {
   "price": 274500,
   "date": "2026-10-13",
   "changePct": -7.9,
   "close": 274500,
   "closeDate": "2026-10-13"
  },
  "014680": {
   "price": 261500,
   "date": "2026-10-13",
   "changePct": -3.5,
   "close": 261500,
   "closeDate": "2026-10-13"
  },
  "039030": {
   "price": 494000,
   "date": "2026-10-13",
   "changePct": -5.7,
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
   "changePct": -5.2,
   "close": 37500,
   "closeDate": "2026-10-13"
  },
  "021240": {
   "price": 101200,
   "date": "2026-10-13",
   "changePct": -0.2,
   "close": 101200,
   "closeDate": "2026-10-13"
  },
  "036570": {
   "price": 207000,
   "date": "2026-10-13",
   "changePct": -6.8,
   "close": 207000,
   "closeDate": "2026-10-13"
  },
  "035720": {
   "price": 31300,
   "date": "2026-10-13",
   "changePct": -3.1,
   "close": 31300,
   "closeDate": "2026-10-13"
  },
  "001040": {
   "price": 128600,
   "date": "2026-10-13",
   "changePct": -1.4,
   "close": 128600,
   "closeDate": "2026-10-13"
  },
  "012750": {
   "price": 87000,
   "date": "2026-10-13",
   "changePct": 3.3,
   "close": 87000,
   "closeDate": "2026-10-13"
  },
  "047050": {
   "price": 56600,
   "date": "2026-10-13",
   "changePct": -0.9,
   "close": 56600,
   "closeDate": "2026-10-13"
  },
  "010120": {
   "price": 179200,
   "date": "2026-10-13",
   "changePct": -8.3,
   "close": 179200,
   "closeDate": "2026-10-13"
  },
  "033780": {
   "price": 181400,
   "date": "2026-10-13",
   "changePct": 2.3,
   "close": 181400,
   "closeDate": "2026-10-13"
  },
  "001120": {
   "price": 44050,
   "date": "2026-10-13",
   "changePct": 1.6,
   "close": 44050,
   "closeDate": "2026-10-13"
  },
  "004370": {
   "price": 401000,
   "date": "2026-10-13",
   "changePct": 0.9,
   "close": 401000,
   "closeDate": "2026-10-13"
  },
  "062040": {
   "price": 211000,
   "date": "2026-10-13",
   "changePct": -5.2,
   "close": 211000,
   "closeDate": "2026-10-13"
  },
  "MSFT": {
   "price": 548.625,
   "date": "2026-10-13",
   "changePct": 1.4,
   "close": 541.15,
   "closeDate": "2026-10-12"
  },
  "V": {
   "price": 392.79,
   "date": "2026-10-13",
   "changePct": 0.9,
   "close": 389.27,
   "closeDate": "2026-10-12"
  },
  "MA": {
   "price": 601.42,
   "date": "2026-10-13",
   "changePct": 1.1,
   "close": 595.09,
   "closeDate": "2026-10-12"
  },
  "GOOGL": {
   "price": 354.15,
   "date": "2026-10-13",
   "changePct": 0.4,
   "close": 352.72,
   "closeDate": "2026-10-12"
  },
  "AMZN": {
   "price": 260.845,
   "date": "2026-10-13",
   "changePct": 0.5,
   "close": 259.53,
   "closeDate": "2026-10-12"
  },
  "COST": {
   "price": 957.56,
   "date": "2026-10-13",
   "changePct": -0.2,
   "close": 959.44,
   "closeDate": "2026-10-12"
  },
  "NVDA": {
   "price": 226.26,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 226.32,
   "closeDate": "2026-10-12"
  },
  "META": {
   "price": 769.89,
   "date": "2026-10-13",
   "changePct": 3.6,
   "close": 742.96,
   "closeDate": "2026-10-12"
  },
  "AVGO": {
   "price": 356.24,
   "date": "2026-10-13",
   "changePct": 0.4,
   "close": 354.73,
   "closeDate": "2026-10-12"
  },
  "TSM": {
   "price": 442.54,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 444.35,
   "closeDate": "2026-10-12"
  },
  "UBER": {
   "price": 71.31,
   "date": "2026-10-13",
   "changePct": -0.3,
   "close": 71.5,
   "closeDate": "2026-10-12"
  },
  "GM": {
   "price": 83.36,
   "date": "2026-10-13",
   "changePct": 1.2,
   "close": 82.37,
   "closeDate": "2026-10-12"
  },
  "VZ": {
   "price": 43.145,
   "date": "2026-10-13",
   "changePct": 0.9,
   "close": 42.78,
   "closeDate": "2026-10-12"
  },
  "C": {
   "price": 129.64,
   "date": "2026-10-13",
   "changePct": -1.7,
   "close": 131.92,
   "closeDate": "2026-10-12"
  },
  "O": {
   "price": 54.465,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 54.7,
   "closeDate": "2026-10-12"
  },
  "DUK": {
   "price": 116.9,
   "date": "2026-10-13",
   "changePct": -0.7,
   "close": 117.69,
   "closeDate": "2026-10-12"
  },
  "XOM": {
   "price": 173.78,
   "date": "2026-10-13",
   "changePct": 0.9,
   "close": 172.15,
   "closeDate": "2026-10-12"
  },
  "KO": {
   "price": 89.995,
   "date": "2026-10-13",
   "changePct": 0.2,
   "close": 89.79,
   "closeDate": "2026-10-12"
  },
  "JNJ": {
   "price": 250.37,
   "date": "2026-10-13",
   "changePct": -5.1,
   "close": 263.73,
   "closeDate": "2026-10-12"
  },
  "AXON": {
   "price": 412.91,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 414.43,
   "closeDate": "2026-10-12"
  },
  "NXT": {
   "price": 86.92,
   "date": "2026-10-13",
   "changePct": 2.4,
   "close": 84.86,
   "closeDate": "2026-10-12"
  },
  "TCOM": {
   "price": 38.95,
   "date": "2026-10-13",
   "changePct": 0.5,
   "close": 38.76,
   "closeDate": "2026-10-12"
  },
  "LLY": {
   "price": 1176.59,
   "date": "2026-10-13",
   "changePct": -0.5,
   "close": 1182.62,
   "closeDate": "2026-10-12"
  },
  "CVX": {
   "price": 217.74,
   "date": "2026-10-13",
   "changePct": 1.3,
   "close": 215,
   "closeDate": "2026-10-12"
  },
  "CI": {
   "price": 280.9,
   "date": "2026-10-13",
   "changePct": -0.9,
   "close": 283.34,
   "closeDate": "2026-10-12"
  },
  "ALGN": {
   "price": 141.39,
   "date": "2026-10-13",
   "changePct": 0.7,
   "close": 140.42,
   "closeDate": "2026-10-12"
  },
  "NOW": {
   "price": 142.255,
   "date": "2026-10-13",
   "changePct": 1.4,
   "close": 140.32,
   "closeDate": "2026-10-12"
  },
  "TSLA": {
   "price": 375.2,
   "date": "2026-10-13",
   "changePct": -0.7,
   "close": 378.03,
   "closeDate": "2026-10-12"
  },
  "PG": {
   "price": 152.77,
   "date": "2026-10-13",
   "changePct": -0.3,
   "close": 153.2,
   "closeDate": "2026-10-12"
  },
  "MDLZ": {
   "price": 61.305,
   "date": "2026-10-13",
   "changePct": -0.8,
   "close": 61.79,
   "closeDate": "2026-10-12"
  },
  "AAPL": {
   "price": 346.271,
   "date": "2026-10-13",
   "changePct": 1.6,
   "close": 340.97,
   "closeDate": "2026-10-12"
  },
  "ABT": {
   "price": 101.3,
   "date": "2026-10-13",
   "changePct": -0.5,
   "close": 101.82,
   "closeDate": "2026-10-12"
  },
  "MU": {
   "price": 948.66,
   "date": "2026-10-13",
   "changePct": -4.1,
   "close": 989.04,
   "closeDate": "2026-10-12"
  },
  "MDT": {
   "price": 91.12,
   "date": "2026-10-13",
   "changePct": -0.9,
   "close": 91.93,
   "closeDate": "2026-10-12"
  },
  "IREN": {
   "price": 33.98,
   "date": "2026-10-13",
   "changePct": -2.4,
   "close": 34.8,
   "closeDate": "2026-10-12"
  },
  "UNH": {
   "price": 376.655,
   "date": "2026-10-13",
   "changePct": -0.5,
   "close": 378.52,
   "closeDate": "2026-10-12"
  },
  "MCHP": {
   "price": 73.05,
   "date": "2026-10-13",
   "changePct": -1.1,
   "close": 73.83,
   "closeDate": "2026-10-12"
  },
  "ISRG": {
   "price": 418.85,
   "date": "2026-10-13",
   "changePct": -2.1,
   "close": 427.64,
   "closeDate": "2026-10-12"
  },
  "GILD": {
   "price": 148.74,
   "date": "2026-10-13",
   "changePct": -1.1,
   "close": 150.43,
   "closeDate": "2026-10-12"
  },
  "BRK.B": {
   "price": 520.29,
   "date": "2026-10-13",
   "changePct": 0.5,
   "close": 517.6,
   "closeDate": "2026-10-12"
  },
  "TMO": {
   "price": 660.715,
   "date": "2026-10-13",
   "changePct": -0.2,
   "close": 662.24,
   "closeDate": "2026-10-12"
  },
  "ECL": {
   "price": 285.09,
   "date": "2026-10-13",
   "changePct": 0.3,
   "close": 284.3,
   "closeDate": "2026-10-12"
  },
  "APH": {
   "price": 84.875,
   "date": "2026-10-13",
   "changePct": -1.5,
   "close": 86.19,
   "closeDate": "2026-10-12"
  },
  "NVT": {
   "price": 160.12,
   "date": "2026-10-13",
   "changePct": -1.6,
   "close": 162.78,
   "closeDate": "2026-10-12"
  },
  "FSS": {
   "price": 113.68,
   "date": "2026-10-13",
   "changePct": -1,
   "close": 114.78,
   "closeDate": "2026-10-12"
  },
  "MKSI": {
   "price": 247.77,
   "date": "2026-10-13",
   "changePct": -0.9,
   "close": 249.91,
   "closeDate": "2026-10-12"
  },
  "AAON": {
   "price": 83.46,
   "date": "2026-10-13",
   "changePct": -1.5,
   "close": 84.77,
   "closeDate": "2026-10-12"
  },
  "NVMI": {
   "price": 337.145,
   "date": "2026-10-13",
   "changePct": -1,
   "close": 340.4,
   "closeDate": "2026-10-12"
  },
  "POWL": {
   "price": 180.97,
   "date": "2026-10-13",
   "changePct": -2.4,
   "close": 185.38,
   "closeDate": "2026-10-12"
  },
  "TXN": {
   "price": 280.91,
   "date": "2026-10-13",
   "changePct": -0.3,
   "close": 281.74,
   "closeDate": "2026-10-12"
  },
  "MSI": {
   "price": 445.18,
   "date": "2026-10-13",
   "changePct": -0.3,
   "close": 446.33,
   "closeDate": "2026-10-12"
  },
  "SNY": {
   "price": 39.585,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 39.74,
   "closeDate": "2026-10-12"
  },
  "DVN": {
   "price": 49.635,
   "date": "2026-10-13",
   "changePct": 1.4,
   "close": 48.96,
   "closeDate": "2026-10-12"
  },
  "RBC": {
   "price": 502.79,
   "date": "2026-10-13",
   "changePct": -1.4,
   "close": 510,
   "closeDate": "2026-10-12"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 6035.35,
   "date": "2026-10-13",
   "changePct": -5.5,
   "close": 6035.35,
   "closeDate": "2026-10-13"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7804.97,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 7807.2402,
   "closeDate": "2026-10-12"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 212.405,
   "date": "2026-10-13",
   "changePct": -0.4,
   "close": 213.19,
   "closeDate": "2026-10-12"
  }
 }
};
