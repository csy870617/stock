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
   "price": 159700,
   "date": "2026-10-13",
   "changePct": -1.9,
   "close": 162800,
   "closeDate": "2026-10-08"
  },
  "139130": {
   "price": 17060,
   "date": "2026-10-13",
   "changePct": -2.9,
   "close": 17570,
   "closeDate": "2026-10-08"
  },
  "175330": {
   "price": 27850,
   "date": "2026-10-13",
   "changePct": 0,
   "close": 27850,
   "closeDate": "2026-10-08"
  },
  "207940": {
   "price": 1188000,
   "date": "2026-10-13",
   "changePct": -2.5,
   "close": 1219000,
   "closeDate": "2026-10-08"
  },
  "213420": {
   "price": 26700,
   "date": "2026-10-13",
   "changePct": -10.9,
   "close": 29950,
   "closeDate": "2026-10-08"
  },
  "257720": {
   "price": 32450,
   "date": "2026-10-13",
   "changePct": -8.5,
   "close": 35450,
   "closeDate": "2026-10-08"
  },
  "267260": {
   "price": 542000,
   "date": "2026-10-13",
   "changePct": -10.6,
   "close": 606000,
   "closeDate": "2026-10-08"
  },
  "316140": {
   "price": 31450,
   "date": "2026-10-13",
   "changePct": -2.8,
   "close": 32350,
   "closeDate": "2026-10-08"
  },
  "323410": {
   "price": 19820,
   "date": "2026-10-13",
   "changePct": 1.8,
   "close": 19470,
   "closeDate": "2026-10-08"
  },
  "329180": {
   "price": 350000,
   "date": "2026-10-13",
   "changePct": -8.9,
   "close": 384000,
   "closeDate": "2026-10-08"
  },
  "361610": {
   "price": 17220,
   "date": "2026-10-13",
   "changePct": -7.4,
   "close": 18600,
   "closeDate": "2026-10-08"
  },
  "403870": {
   "price": 58600,
   "date": "2026-10-13",
   "changePct": -9.3,
   "close": 64600,
   "closeDate": "2026-10-08"
  },
  "005930": {
   "price": 233000,
   "date": "2026-10-13",
   "changePct": -11.1,
   "close": 262000,
   "closeDate": "2026-10-08"
  },
  "055550": {
   "price": 98300,
   "date": "2026-10-13",
   "changePct": -1.2,
   "close": 99500,
   "closeDate": "2026-10-08"
  },
  "000810": {
   "price": 609000,
   "date": "2026-10-13",
   "changePct": -0.5,
   "close": 612000,
   "closeDate": "2026-10-08"
  },
  "028260": {
   "price": 293500,
   "date": "2026-10-13",
   "changePct": -7.6,
   "close": 317500,
   "closeDate": "2026-10-08"
  },
  "012330": {
   "price": 339500,
   "date": "2026-10-13",
   "changePct": -5.4,
   "close": 359000,
   "closeDate": "2026-10-08"
  },
  "086790": {
   "price": 121900,
   "date": "2026-10-13",
   "changePct": -1.9,
   "close": 124300,
   "closeDate": "2026-10-08"
  },
  "000660": {
   "price": 1473000,
   "date": "2026-10-13",
   "changePct": -12.4,
   "close": 1681000,
   "closeDate": "2026-10-08"
  },
  "012450": {
   "price": 819000,
   "date": "2026-10-13",
   "changePct": -8.1,
   "close": 891000,
   "closeDate": "2026-10-08"
  },
  "009540": {
   "price": 264500,
   "date": "2026-10-13",
   "changePct": -9.3,
   "close": 291500,
   "closeDate": "2026-10-08"
  },
  "068270": {
   "price": 176800,
   "date": "2026-10-13",
   "changePct": -1.6,
   "close": 179600,
   "closeDate": "2026-10-08"
  },
  "035420": {
   "price": 174600,
   "date": "2026-10-13",
   "changePct": -5,
   "close": 183800,
   "closeDate": "2026-10-08"
  },
  "034020": {
   "price": 69000,
   "date": "2026-10-13",
   "changePct": -11.5,
   "close": 78000,
   "closeDate": "2026-10-08"
  },
  "000270": {
   "price": 104500,
   "date": "2026-10-13",
   "changePct": -2.2,
   "close": 106800,
   "closeDate": "2026-10-08"
  },
  "005490": {
   "price": 285000,
   "date": "2026-10-13",
   "changePct": -7,
   "close": 306500,
   "closeDate": "2026-10-08"
  },
  "015760": {
   "price": 28300,
   "date": "2026-10-13",
   "changePct": -2.7,
   "close": 29100,
   "closeDate": "2026-10-08"
  },
  "096770": {
   "price": 149800,
   "date": "2026-10-13",
   "changePct": -6.9,
   "close": 160900,
   "closeDate": "2026-10-08"
  },
  "051910": {
   "price": 244500,
   "date": "2026-10-13",
   "changePct": -14.7,
   "close": 286500,
   "closeDate": "2026-10-08"
  },
  "003490": {
   "price": 30000,
   "date": "2026-10-13",
   "changePct": -2.3,
   "close": 30700,
   "closeDate": "2026-10-08"
  },
  "032640": {
   "price": 14590,
   "date": "2026-10-13",
   "changePct": 1.3,
   "close": 14400,
   "closeDate": "2026-10-08"
  },
  "088980": {
   "price": 9600,
   "date": "2026-10-13",
   "changePct": -0.9,
   "close": 9690,
   "closeDate": "2026-10-12"
  },
  "029780": {
   "price": 41550,
   "date": "2026-10-13",
   "changePct": 0.8,
   "close": 41200,
   "closeDate": "2026-10-08"
  },
  "024110": {
   "price": 19500,
   "date": "2026-10-13",
   "changePct": -1.3,
   "close": 19750,
   "closeDate": "2026-10-08"
  },
  "058470": {
   "price": 76400,
   "date": "2026-10-13",
   "changePct": -13.1,
   "close": 87900,
   "closeDate": "2026-10-08"
  },
  "082920": {
   "price": 23900,
   "date": "2026-10-13",
   "changePct": -14.5,
   "close": 27950,
   "closeDate": "2026-10-08"
  },
  "064760": {
   "price": 265250,
   "date": "2026-10-13",
   "changePct": -11,
   "close": 298000,
   "closeDate": "2026-10-08"
  },
  "014680": {
   "price": 254500,
   "date": "2026-10-13",
   "changePct": -6.1,
   "close": 271000,
   "closeDate": "2026-10-08"
  },
  "039030": {
   "price": 481000,
   "date": "2026-10-13",
   "changePct": -8.2,
   "close": 524000,
   "closeDate": "2026-10-08"
  },
  "011780": {
   "price": 110700,
   "date": "2026-10-13",
   "changePct": -3.5,
   "close": 114700,
   "closeDate": "2026-10-08"
  },
  "035900": {
   "price": 36800,
   "date": "2026-10-13",
   "changePct": -7,
   "close": 39550,
   "closeDate": "2026-10-08"
  },
  "021240": {
   "price": 99200,
   "date": "2026-10-13",
   "changePct": -2.2,
   "close": 101400,
   "closeDate": "2026-10-08"
  },
  "036570": {
   "price": 201500,
   "date": "2026-10-13",
   "changePct": -9.2,
   "close": 222000,
   "closeDate": "2026-10-08"
  },
  "035720": {
   "price": 30600,
   "date": "2026-10-13",
   "changePct": -5.3,
   "close": 32300,
   "closeDate": "2026-10-08"
  },
  "001040": {
   "price": 124300,
   "date": "2026-10-13",
   "changePct": -4.7,
   "close": 130400,
   "closeDate": "2026-10-08"
  },
  "012750": {
   "price": 85600,
   "date": "2026-10-13",
   "changePct": 1.7,
   "close": 84200,
   "closeDate": "2026-10-08"
  },
  "047050": {
   "price": 54100,
   "date": "2026-10-13",
   "changePct": -5.3,
   "close": 57100,
   "closeDate": "2026-10-08"
  },
  "010120": {
   "price": 175200,
   "date": "2026-10-13",
   "changePct": -10.4,
   "close": 195500,
   "closeDate": "2026-10-08"
  },
  "033780": {
   "price": 179800,
   "date": "2026-10-13",
   "changePct": 1.4,
   "close": 177400,
   "closeDate": "2026-10-08"
  },
  "001120": {
   "price": 43300,
   "date": "2026-10-13",
   "changePct": -0.1,
   "close": 43350,
   "closeDate": "2026-10-08"
  },
  "004370": {
   "price": 400000,
   "date": "2026-10-13",
   "changePct": 0.6,
   "close": 397500,
   "closeDate": "2026-10-08"
  },
  "062040": {
   "price": 203000,
   "date": "2026-10-13",
   "changePct": -8.8,
   "close": 222500,
   "closeDate": "2026-10-08"
  },
  "MSFT": {
   "price": 541.15,
   "date": "2026-10-12",
   "changePct": 1.1,
   "close": 541.15,
   "closeDate": "2026-10-12"
  },
  "V": {
   "price": 389.27,
   "date": "2026-10-12",
   "changePct": 1,
   "close": 389.27,
   "closeDate": "2026-10-12"
  },
  "MA": {
   "price": 595.09,
   "date": "2026-10-12",
   "changePct": 1,
   "close": 595.09,
   "closeDate": "2026-10-12"
  },
  "GOOGL": {
   "price": 352.72,
   "date": "2026-10-12",
   "changePct": 0.3,
   "close": 352.72,
   "closeDate": "2026-10-12"
  },
  "AMZN": {
   "price": 259.53,
   "date": "2026-10-12",
   "changePct": -1.1,
   "close": 259.53,
   "closeDate": "2026-10-12"
  },
  "COST": {
   "price": 959.44,
   "date": "2026-10-12",
   "changePct": 1.3,
   "close": 959.44,
   "closeDate": "2026-10-12"
  },
  "NVDA": {
   "price": 226.32,
   "date": "2026-10-12",
   "changePct": -1.3,
   "close": 226.32,
   "closeDate": "2026-10-12"
  },
  "META": {
   "price": 742.96,
   "date": "2026-10-12",
   "changePct": 3.4,
   "close": 742.96,
   "closeDate": "2026-10-12"
  },
  "AVGO": {
   "price": 354.73,
   "date": "2026-10-12",
   "changePct": -1.9,
   "close": 354.73,
   "closeDate": "2026-10-12"
  },
  "TSM": {
   "price": 444.35,
   "date": "2026-10-12",
   "changePct": -2,
   "close": 444.35,
   "closeDate": "2026-10-12"
  },
  "UBER": {
   "price": 71.5,
   "date": "2026-10-12",
   "changePct": 0,
   "close": 71.5,
   "closeDate": "2026-10-12"
  },
  "GM": {
   "price": 82.37,
   "date": "2026-10-12",
   "changePct": -0.4,
   "close": 82.37,
   "closeDate": "2026-10-12"
  },
  "VZ": {
   "price": 42.78,
   "date": "2026-10-12",
   "changePct": 2.7,
   "close": 42.78,
   "closeDate": "2026-10-12"
  },
  "C": {
   "price": 131.92,
   "date": "2026-10-12",
   "changePct": 1.8,
   "close": 131.92,
   "closeDate": "2026-10-12"
  },
  "O": {
   "price": 54.7,
   "date": "2026-10-12",
   "changePct": 1,
   "close": 54.7,
   "closeDate": "2026-10-12"
  },
  "DUK": {
   "price": 117.69,
   "date": "2026-10-12",
   "changePct": 0.9,
   "close": 117.69,
   "closeDate": "2026-10-12"
  },
  "XOM": {
   "price": 172.15,
   "date": "2026-10-12",
   "changePct": 1.9,
   "close": 172.15,
   "closeDate": "2026-10-12"
  },
  "KO": {
   "price": 89.79,
   "date": "2026-10-12",
   "changePct": 2,
   "close": 89.79,
   "closeDate": "2026-10-12"
  },
  "JNJ": {
   "price": 263.73,
   "date": "2026-10-12",
   "changePct": 0.9,
   "close": 263.73,
   "closeDate": "2026-10-12"
  },
  "AXON": {
   "price": 414.43,
   "date": "2026-10-12",
   "changePct": -2,
   "close": 414.43,
   "closeDate": "2026-10-12"
  },
  "NXT": {
   "price": 84.86,
   "date": "2026-10-12",
   "changePct": -1.5,
   "close": 84.86,
   "closeDate": "2026-10-12"
  },
  "TCOM": {
   "price": 38.76,
   "date": "2026-10-12",
   "changePct": -0.4,
   "close": 38.76,
   "closeDate": "2026-10-12"
  },
  "LLY": {
   "price": 1182.62,
   "date": "2026-10-12",
   "changePct": 0.3,
   "close": 1182.62,
   "closeDate": "2026-10-12"
  },
  "CVX": {
   "price": 215,
   "date": "2026-10-12",
   "changePct": 1.4,
   "close": 215,
   "closeDate": "2026-10-12"
  },
  "CI": {
   "price": 283.34,
   "date": "2026-10-12",
   "changePct": 0.3,
   "close": 283.34,
   "closeDate": "2026-10-12"
  },
  "ALGN": {
   "price": 140.42,
   "date": "2026-10-12",
   "changePct": -1.6,
   "close": 140.42,
   "closeDate": "2026-10-12"
  },
  "NOW": {
   "price": 140.32,
   "date": "2026-10-12",
   "changePct": -0.4,
   "close": 140.32,
   "closeDate": "2026-10-12"
  },
  "TSLA": {
   "price": 378.03,
   "date": "2026-10-12",
   "changePct": -1.2,
   "close": 378.03,
   "closeDate": "2026-10-12"
  },
  "PG": {
   "price": 153.2,
   "date": "2026-10-12",
   "changePct": 1.3,
   "close": 153.2,
   "closeDate": "2026-10-12"
  },
  "MDLZ": {
   "price": 61.79,
   "date": "2026-10-12",
   "changePct": 2.3,
   "close": 61.79,
   "closeDate": "2026-10-12"
  },
  "AAPL": {
   "price": 340.97,
   "date": "2026-10-12",
   "changePct": 1.3,
   "close": 340.97,
   "closeDate": "2026-10-12"
  },
  "ABT": {
   "price": 101.82,
   "date": "2026-10-12",
   "changePct": 2.2,
   "close": 101.82,
   "closeDate": "2026-10-12"
  },
  "MU": {
   "price": 989.04,
   "date": "2026-10-12",
   "changePct": -3.9,
   "close": 989.04,
   "closeDate": "2026-10-12"
  },
  "MDT": {
   "price": 91.93,
   "date": "2026-10-12",
   "changePct": 3.9,
   "close": 91.93,
   "closeDate": "2026-10-12"
  },
  "IREN": {
   "price": 34.8,
   "date": "2026-10-12",
   "changePct": -1.1,
   "close": 34.8,
   "closeDate": "2026-10-12"
  },
  "UNH": {
   "price": 378.52,
   "date": "2026-10-12",
   "changePct": -0.2,
   "close": 378.52,
   "closeDate": "2026-10-12"
  },
  "MCHP": {
   "price": 73.83,
   "date": "2026-10-12",
   "changePct": -2.3,
   "close": 73.83,
   "closeDate": "2026-10-12"
  },
  "ISRG": {
   "price": 427.64,
   "date": "2026-10-12",
   "changePct": 0.9,
   "close": 427.64,
   "closeDate": "2026-10-12"
  },
  "GILD": {
   "price": 150.43,
   "date": "2026-10-12",
   "changePct": -0.5,
   "close": 150.43,
   "closeDate": "2026-10-12"
  },
  "BRK.B": {
   "price": 517.6,
   "date": "2026-10-12",
   "changePct": 0.4,
   "close": 517.6,
   "closeDate": "2026-10-12"
  },
  "TMO": {
   "price": 662.24,
   "date": "2026-10-12",
   "changePct": 0.6,
   "close": 662.24,
   "closeDate": "2026-10-12"
  },
  "ECL": {
   "price": 284.3,
   "date": "2026-10-12",
   "changePct": 0.9,
   "close": 284.3,
   "closeDate": "2026-10-12"
  },
  "APH": {
   "price": 86.19,
   "date": "2026-10-12",
   "changePct": -1.2,
   "close": 86.19,
   "closeDate": "2026-10-12"
  },
  "NVT": {
   "price": 162.78,
   "date": "2026-10-12",
   "changePct": -2.8,
   "close": 162.78,
   "closeDate": "2026-10-12"
  },
  "FSS": {
   "price": 114.78,
   "date": "2026-10-12",
   "changePct": 1.1,
   "close": 114.78,
   "closeDate": "2026-10-12"
  },
  "MKSI": {
   "price": 249.91,
   "date": "2026-10-12",
   "changePct": -5.5,
   "close": 249.91,
   "closeDate": "2026-10-12"
  },
  "AAON": {
   "price": 84.77,
   "date": "2026-10-12",
   "changePct": -1.6,
   "close": 84.77,
   "closeDate": "2026-10-12"
  },
  "NVMI": {
   "price": 340.4,
   "date": "2026-10-12",
   "changePct": -3.6,
   "close": 340.4,
   "closeDate": "2026-10-12"
  },
  "POWL": {
   "price": 185.38,
   "date": "2026-10-12",
   "changePct": -3.4,
   "close": 185.38,
   "closeDate": "2026-10-12"
  },
  "TXN": {
   "price": 281.74,
   "date": "2026-10-12",
   "changePct": -0.7,
   "close": 281.74,
   "closeDate": "2026-10-12"
  },
  "MSI": {
   "price": 446.33,
   "date": "2026-10-12",
   "changePct": 0.5,
   "close": 446.33,
   "closeDate": "2026-10-12"
  },
  "SNY": {
   "price": 39.74,
   "date": "2026-10-12",
   "changePct": -0.8,
   "close": 39.74,
   "closeDate": "2026-10-12"
  },
  "DVN": {
   "price": 48.96,
   "date": "2026-10-12",
   "changePct": 1.5,
   "close": 48.96,
   "closeDate": "2026-10-12"
  },
  "RBC": {
   "price": 510,
   "date": "2026-10-12",
   "changePct": 1.3,
   "close": 510,
   "closeDate": "2026-10-12"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5993.06,
   "date": "2026-10-13",
   "changePct": -6.1,
   "close": 6384.2402,
   "closeDate": "2026-10-12"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7807.24,
   "date": "2026-10-12",
   "changePct": -0.1,
   "close": 7807.24,
   "closeDate": "2026-10-12"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 213.19,
   "date": "2026-10-12",
   "changePct": 0.1,
   "close": 213.19,
   "closeDate": "2026-10-12"
  }
 }
};
