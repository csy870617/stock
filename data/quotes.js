// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-10-20",
 "quotes": {
  "105560": {
   "price": 162700,
   "date": "2026-10-19",
   "changePct": 1.7,
   "close": 162700,
   "closeDate": "2026-10-19"
  },
  "119850": {
   "price": 41550,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 41550,
   "closeDate": "2026-10-19"
  },
  "138040": {
   "price": 131000,
   "date": "2026-10-19",
   "changePct": 0.9,
   "close": 131000,
   "closeDate": "2026-10-19"
  },
  "139130": {
   "price": 17000,
   "date": "2026-10-19",
   "changePct": -0.2,
   "close": 17000,
   "closeDate": "2026-10-19"
  },
  "175330": {
   "price": 27000,
   "date": "2026-10-19",
   "changePct": 0.6,
   "close": 27000,
   "closeDate": "2026-10-19"
  },
  "207940": {
   "price": 1427000,
   "date": "2026-10-19",
   "changePct": 9.9,
   "close": 1427000,
   "closeDate": "2026-10-19"
  },
  "214450": {
   "price": 277500,
   "date": "2026-10-19",
   "changePct": -0.2,
   "close": 277500,
   "closeDate": "2026-10-19"
  },
  "241560": {
   "price": 51600,
   "date": "2026-10-19",
   "changePct": 1.4,
   "close": 51600,
   "closeDate": "2026-10-19"
  },
  "267250": {
   "price": 159400,
   "date": "2026-10-19",
   "changePct": 1.3,
   "close": 159400,
   "closeDate": "2026-10-19"
  },
  "267260": {
   "price": 525000,
   "date": "2026-10-19",
   "changePct": 1.7,
   "close": 525000,
   "closeDate": "2026-10-19"
  },
  "267270": {
   "price": 94100,
   "date": "2026-10-19",
   "changePct": 2.2,
   "close": 94100,
   "closeDate": "2026-10-19"
  },
  "278470": {
   "price": 331500,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 331500,
   "closeDate": "2026-10-19"
  },
  "298040": {
   "price": 1936000,
   "date": "2026-10-19",
   "changePct": 0.5,
   "close": 1936000,
   "closeDate": "2026-10-19"
  },
  "316140": {
   "price": 31650,
   "date": "2026-10-19",
   "changePct": 1,
   "close": 31650,
   "closeDate": "2026-10-19"
  },
  "323410": {
   "price": 20600,
   "date": "2026-10-19",
   "changePct": 1.2,
   "close": 20600,
   "closeDate": "2026-10-19"
  },
  "329180": {
   "price": 345500,
   "date": "2026-10-19",
   "changePct": -1.7,
   "close": 345500,
   "closeDate": "2026-10-19"
  },
  "361610": {
   "price": 18770,
   "date": "2026-10-19",
   "changePct": 7.4,
   "close": 18770,
   "closeDate": "2026-10-19"
  },
  "403870": {
   "price": 52600,
   "date": "2026-10-19",
   "changePct": -2.8,
   "close": 52600,
   "closeDate": "2026-10-19"
  },
  "005930": {
   "price": 218000,
   "date": "2026-10-19",
   "changePct": 1.2,
   "close": 218000,
   "closeDate": "2026-10-19"
  },
  "055550": {
   "price": 93300,
   "date": "2026-10-19",
   "changePct": -0.1,
   "close": 93300,
   "closeDate": "2026-10-19"
  },
  "000810": {
   "price": 607000,
   "date": "2026-10-19",
   "changePct": 3.6,
   "close": 607000,
   "closeDate": "2026-10-19"
  },
  "028260": {
   "price": 285000,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 285000,
   "closeDate": "2026-10-19"
  },
  "086790": {
   "price": 123700,
   "date": "2026-10-19",
   "changePct": 1,
   "close": 123700,
   "closeDate": "2026-10-19"
  },
  "000660": {
   "price": 1277000,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 1277000,
   "closeDate": "2026-10-19"
  },
  "012450": {
   "price": 905000,
   "date": "2026-10-19",
   "changePct": 1.9,
   "close": 905000,
   "closeDate": "2026-10-19"
  },
  "009540": {
   "price": 271500,
   "date": "2026-10-19",
   "changePct": 2.5,
   "close": 271500,
   "closeDate": "2026-10-19"
  },
  "068270": {
   "price": 198200,
   "date": "2026-10-19",
   "changePct": 2.2,
   "close": 198200,
   "closeDate": "2026-10-19"
  },
  "000270": {
   "price": 116000,
   "date": "2026-10-19",
   "changePct": 5.3,
   "close": 116000,
   "closeDate": "2026-10-19"
  },
  "032640": {
   "price": 15790,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 15790,
   "closeDate": "2026-10-19"
  },
  "029780": {
   "price": 42800,
   "date": "2026-10-19",
   "changePct": 0.1,
   "close": 42800,
   "closeDate": "2026-10-19"
  },
  "058470": {
   "price": 69400,
   "date": "2026-10-19",
   "changePct": -2,
   "close": 69400,
   "closeDate": "2026-10-19"
  },
  "082920": {
   "price": 25250,
   "date": "2026-10-19",
   "changePct": 4.8,
   "close": 25250,
   "closeDate": "2026-10-19"
  },
  "064760": {
   "price": 234500,
   "date": "2026-10-19",
   "changePct": -2.9,
   "close": 234500,
   "closeDate": "2026-10-19"
  },
  "035900": {
   "price": 40400,
   "date": "2026-10-19",
   "changePct": 3.5,
   "close": 40400,
   "closeDate": "2026-10-19"
  },
  "021240": {
   "price": 108400,
   "date": "2026-10-19",
   "changePct": 0.6,
   "close": 108400,
   "closeDate": "2026-10-19"
  },
  "036570": {
   "price": 218000,
   "date": "2026-10-19",
   "changePct": 5.3,
   "close": 218000,
   "closeDate": "2026-10-19"
  },
  "035720": {
   "price": 32100,
   "date": "2026-10-19",
   "changePct": 0.8,
   "close": 32100,
   "closeDate": "2026-10-19"
  },
  "001040": {
   "price": 129200,
   "date": "2026-10-19",
   "changePct": 3.7,
   "close": 129200,
   "closeDate": "2026-10-19"
  },
  "012750": {
   "price": 97600,
   "date": "2026-10-19",
   "changePct": 0.1,
   "close": 97600,
   "closeDate": "2026-10-19"
  },
  "047050": {
   "price": 57200,
   "date": "2026-10-19",
   "changePct": 2.1,
   "close": 57200,
   "closeDate": "2026-10-19"
  },
  "033780": {
   "price": 193100,
   "date": "2026-10-19",
   "changePct": 1.4,
   "close": 193100,
   "closeDate": "2026-10-19"
  },
  "001120": {
   "price": 44800,
   "date": "2026-10-19",
   "changePct": 0.7,
   "close": 44800,
   "closeDate": "2026-10-19"
  },
  "004370": {
   "price": 411500,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 411500,
   "closeDate": "2026-10-19"
  },
  "062040": {
   "price": 189000,
   "date": "2026-10-19",
   "changePct": 3.8,
   "close": 189000,
   "closeDate": "2026-10-19"
  },
  "041830": {
   "price": 51400,
   "date": "2026-10-19",
   "changePct": -1.7,
   "close": 51400,
   "closeDate": "2026-10-19"
  },
  "005830": {
   "price": 189000,
   "date": "2026-10-19",
   "changePct": 4.2,
   "close": 189000,
   "closeDate": "2026-10-19"
  },
  "066570": {
   "price": 170500,
   "date": "2026-10-19",
   "changePct": 0.5,
   "close": 170500,
   "closeDate": "2026-10-19"
  },
  "086280": {
   "price": 190500,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 190500,
   "closeDate": "2026-10-19"
  },
  "018260": {
   "price": 203500,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 203500,
   "closeDate": "2026-10-19"
  },
  "005850": {
   "price": 51500,
   "date": "2026-10-19",
   "changePct": 6.1,
   "close": 51500,
   "closeDate": "2026-10-19"
  },
  "095340": {
   "price": 160300,
   "date": "2026-10-19",
   "changePct": -0.3,
   "close": 160300,
   "closeDate": "2026-10-19"
  },
  "005490": {
   "price": 314500,
   "date": "2026-10-19",
   "changePct": 6.1,
   "close": 314500,
   "closeDate": "2026-10-19"
  },
  "035420": {
   "price": 182900,
   "date": "2026-10-19",
   "changePct": 1.6,
   "close": 182900,
   "closeDate": "2026-10-19"
  },
  "MSFT": {
   "price": 533.52,
   "date": "2026-10-19",
   "changePct": 0.8,
   "close": 533.52,
   "closeDate": "2026-10-19"
  },
  "V": {
   "price": 402.92,
   "date": "2026-10-19",
   "changePct": 0.1,
   "close": 402.92,
   "closeDate": "2026-10-19"
  },
  "MA": {
   "price": 616.4,
   "date": "2026-10-19",
   "changePct": -0.2,
   "close": 616.4,
   "closeDate": "2026-10-19"
  },
  "GOOGL": {
   "price": 344.18,
   "date": "2026-10-19",
   "changePct": 1.1,
   "close": 344.18,
   "closeDate": "2026-10-19"
  },
  "AMZN": {
   "price": 262.45,
   "date": "2026-10-19",
   "changePct": 5,
   "close": 262.45,
   "closeDate": "2026-10-19"
  },
  "COST": {
   "price": 995.53,
   "date": "2026-10-19",
   "changePct": 0.6,
   "close": 995.53,
   "closeDate": "2026-10-19"
  },
  "NVDA": {
   "price": 217.09,
   "date": "2026-10-19",
   "changePct": 1.4,
   "close": 217.09,
   "closeDate": "2026-10-19"
  },
  "META": {
   "price": 705.44,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 705.44,
   "closeDate": "2026-10-19"
  },
  "AVGO": {
   "price": 334.59,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 334.59,
   "closeDate": "2026-10-19"
  },
  "TSM": {
   "price": 420.22,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 420.22,
   "closeDate": "2026-10-19"
  },
  "UBER": {
   "price": 69.96,
   "date": "2026-10-19",
   "changePct": -0.6,
   "close": 69.96,
   "closeDate": "2026-10-19"
  },
  "GM": {
   "price": 82.75,
   "date": "2026-10-19",
   "changePct": -1.4,
   "close": 82.75,
   "closeDate": "2026-10-19"
  },
  "VZ": {
   "price": 44.15,
   "date": "2026-10-19",
   "changePct": -1.4,
   "close": 44.15,
   "closeDate": "2026-10-19"
  },
  "C": {
   "price": 121.69,
   "date": "2026-10-19",
   "changePct": -2.1,
   "close": 121.69,
   "closeDate": "2026-10-19"
  },
  "DUK": {
   "price": 119.27,
   "date": "2026-10-19",
   "changePct": -1.8,
   "close": 119.27,
   "closeDate": "2026-10-19"
  },
  "KO": {
   "price": 93.42,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 93.42,
   "closeDate": "2026-10-19"
  },
  "JNJ": {
   "price": 253.79,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 253.79,
   "closeDate": "2026-10-19"
  },
  "NXT": {
   "price": 79.7,
   "date": "2026-10-19",
   "changePct": -0.4,
   "close": 79.7,
   "closeDate": "2026-10-19"
  },
  "LLY": {
   "price": 1240.34,
   "date": "2026-10-19",
   "changePct": -1.3,
   "close": 1240.34,
   "closeDate": "2026-10-19"
  },
  "CI": {
   "price": 298.5,
   "date": "2026-10-19",
   "changePct": -1.3,
   "close": 298.5,
   "closeDate": "2026-10-19"
  },
  "NOW": {
   "price": 145.36,
   "date": "2026-10-19",
   "changePct": 2.4,
   "close": 145.36,
   "closeDate": "2026-10-19"
  },
  "TSLA": {
   "price": 368.06,
   "date": "2026-10-19",
   "changePct": 3.8,
   "close": 368.06,
   "closeDate": "2026-10-19"
  },
  "PG": {
   "price": 157.69,
   "date": "2026-10-19",
   "changePct": -1,
   "close": 157.69,
   "closeDate": "2026-10-19"
  },
  "MDLZ": {
   "price": 63.34,
   "date": "2026-10-19",
   "changePct": -0.9,
   "close": 63.34,
   "closeDate": "2026-10-19"
  },
  "AAPL": {
   "price": 342.94,
   "date": "2026-10-19",
   "changePct": -0.2,
   "close": 342.94,
   "closeDate": "2026-10-19"
  },
  "MU": {
   "price": 904.9,
   "date": "2026-10-19",
   "changePct": 3,
   "close": 904.9,
   "closeDate": "2026-10-19"
  },
  "MDT": {
   "price": 92.77,
   "date": "2026-10-19",
   "changePct": -2.1,
   "close": 92.77,
   "closeDate": "2026-10-19"
  },
  "IREN": {
   "price": 27.73,
   "date": "2026-10-19",
   "changePct": 2.7,
   "close": 27.73,
   "closeDate": "2026-10-19"
  },
  "UNH": {
   "price": 406.88,
   "date": "2026-10-19",
   "changePct": 1.4,
   "close": 406.88,
   "closeDate": "2026-10-19"
  },
  "GILD": {
   "price": 153.07,
   "date": "2026-10-19",
   "changePct": -2,
   "close": 153.07,
   "closeDate": "2026-10-19"
  },
  "BRK.B": {
   "price": 532.23,
   "date": "2026-10-19",
   "changePct": 0,
   "close": 532.23,
   "closeDate": "2026-10-19"
  },
  "TMO": {
   "price": 679.38,
   "date": "2026-10-19",
   "changePct": -1.5,
   "close": 679.38,
   "closeDate": "2026-10-19"
  },
  "ECL": {
   "price": 285.94,
   "date": "2026-10-19",
   "changePct": -1,
   "close": 285.94,
   "closeDate": "2026-10-19"
  },
  "NVT": {
   "price": 141.57,
   "date": "2026-10-19",
   "changePct": -0.3,
   "close": 141.57,
   "closeDate": "2026-10-19"
  },
  "FSS": {
   "price": 112.92,
   "date": "2026-10-19",
   "changePct": 0.5,
   "close": 112.92,
   "closeDate": "2026-10-19"
  },
  "MKSI": {
   "price": 215.41,
   "date": "2026-10-19",
   "changePct": 0.3,
   "close": 215.41,
   "closeDate": "2026-10-19"
  },
  "AAON": {
   "price": 75.34,
   "date": "2026-10-19",
   "changePct": 2.2,
   "close": 75.34,
   "closeDate": "2026-10-19"
  },
  "NVMI": {
   "price": 319.1,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 319.1,
   "closeDate": "2026-10-19"
  },
  "POWL": {
   "price": 165.76,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 165.76,
   "closeDate": "2026-10-19"
  },
  "TXN": {
   "price": 276.15,
   "date": "2026-10-19",
   "changePct": -0.1,
   "close": 276.15,
   "closeDate": "2026-10-19"
  },
  "MSI": {
   "price": 458.9,
   "date": "2026-10-19",
   "changePct": -0.9,
   "close": 458.9,
   "closeDate": "2026-10-19"
  },
  "DVN": {
   "price": 50.92,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 50.92,
   "closeDate": "2026-10-19"
  },
  "RBC": {
   "price": 503.79,
   "date": "2026-10-19",
   "changePct": 1.1,
   "close": 503.79,
   "closeDate": "2026-10-19"
  },
  "GS": {
   "price": 875.78,
   "date": "2026-10-19",
   "changePct": -0.6,
   "close": 875.78,
   "closeDate": "2026-10-19"
  },
  "AMP": {
   "price": 480.41,
   "date": "2026-10-19",
   "changePct": -4.1,
   "close": 480.41,
   "closeDate": "2026-10-19"
  },
  "PNC": {
   "price": 216.21,
   "date": "2026-10-19",
   "changePct": -0.5,
   "close": 216.21,
   "closeDate": "2026-10-19"
  },
  "MTB": {
   "price": 213.74,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 213.74,
   "closeDate": "2026-10-19"
  },
  "SO": {
   "price": 89.27,
   "date": "2026-10-19",
   "changePct": -2.1,
   "close": 89.27,
   "closeDate": "2026-10-19"
  },
  "WEC": {
   "price": 107,
   "date": "2026-10-19",
   "changePct": -1.6,
   "close": 107,
   "closeDate": "2026-10-19"
  },
  "MSCI": {
   "price": 563.49,
   "date": "2026-10-19",
   "changePct": -1,
   "close": 563.49,
   "closeDate": "2026-10-19"
  },
  "RSG": {
   "price": 229.03,
   "date": "2026-10-19",
   "changePct": -1.1,
   "close": 229.03,
   "closeDate": "2026-10-19"
  },
  "CTAS": {
   "price": 212.3,
   "date": "2026-10-19",
   "changePct": -0.7,
   "close": 212.3,
   "closeDate": "2026-10-19"
  },
  "TJX": {
   "price": 147.36,
   "date": "2026-10-19",
   "changePct": 0,
   "close": 147.36,
   "closeDate": "2026-10-19"
  },
  "ANET": {
   "price": 182.95,
   "date": "2026-10-19",
   "changePct": 3.4,
   "close": 182.95,
   "closeDate": "2026-10-19"
  },
  "GD": {
   "price": 341.43,
   "date": "2026-10-19",
   "changePct": -0.8,
   "close": 341.43,
   "closeDate": "2026-10-19"
  },
  "APPF": {
   "price": 211.91,
   "date": "2026-10-19",
   "changePct": -0.1,
   "close": 211.91,
   "closeDate": "2026-10-19"
  },
  "CB": {
   "price": 356.27,
   "date": "2026-10-19",
   "changePct": -1,
   "close": 356.27,
   "closeDate": "2026-10-19"
  },
  "ADP": {
   "price": 287.03,
   "date": "2026-10-19",
   "changePct": -0.6,
   "close": 287.03,
   "closeDate": "2026-10-19"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 5768.01,
   "date": "2026-10-19",
   "changePct": 1.8,
   "close": 5668.0498,
   "closeDate": "2026-10-16"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7690.73,
   "date": "2026-10-19",
   "changePct": 0.4,
   "close": 7690.73,
   "closeDate": "2026-10-19"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 213.4,
   "date": "2026-10-19",
   "changePct": -0.3,
   "close": 213.4,
   "closeDate": "2026-10-19"
  }
 }
};
