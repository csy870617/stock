// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-26",
 "quotes": {
  "103590": {
   "price": 50400,
   "date": "2026-11-26",
   "changePct": -0.8,
   "close": 50400,
   "closeDate": "2026-11-26"
  },
  "105560": {
   "price": 145300,
   "date": "2026-11-26",
   "changePct": -1.9,
   "close": 145300,
   "closeDate": "2026-11-26"
  },
  "138040": {
   "price": 122800,
   "date": "2026-11-26",
   "changePct": -0.8,
   "close": 122800,
   "closeDate": "2026-11-26"
  },
  "139130": {
   "price": 15190,
   "date": "2026-11-26",
   "changePct": -1.4,
   "close": 15190,
   "closeDate": "2026-11-26"
  },
  "175330": {
   "price": 24350,
   "date": "2026-11-26",
   "changePct": -2,
   "close": 24350,
   "closeDate": "2026-11-26"
  },
  "192820": {
   "price": 336500,
   "date": "2026-11-26",
   "changePct": 2.9,
   "close": 336500,
   "closeDate": "2026-11-26"
  },
  "207940": {
   "price": 1337000,
   "date": "2026-11-26",
   "changePct": -1.9,
   "close": 1337000,
   "closeDate": "2026-11-26"
  },
  "241560": {
   "price": 47800,
   "date": "2026-11-26",
   "changePct": -1.3,
   "close": 47800,
   "closeDate": "2026-11-26"
  },
  "267250": {
   "price": 113300,
   "date": "2026-11-26",
   "changePct": 0,
   "close": 113300,
   "closeDate": "2026-11-26"
  },
  "267260": {
   "price": 387500,
   "date": "2026-11-26",
   "changePct": 1.2,
   "close": 387500,
   "closeDate": "2026-11-26"
  },
  "267270": {
   "price": 74700,
   "date": "2026-11-26",
   "changePct": 0.5,
   "close": 74700,
   "closeDate": "2026-11-26"
  },
  "271560": {
   "price": 119200,
   "date": "2026-11-26",
   "changePct": -0.6,
   "close": 119200,
   "closeDate": "2026-11-26"
  },
  "298040": {
   "price": 1613000,
   "date": "2026-11-26",
   "changePct": 0.3,
   "close": 1613000,
   "closeDate": "2026-11-26"
  },
  "316140": {
   "price": 31200,
   "date": "2026-11-26",
   "changePct": -0.6,
   "close": 31200,
   "closeDate": "2026-11-26"
  },
  "323410": {
   "price": 22100,
   "date": "2026-11-26",
   "changePct": 0.5,
   "close": 22100,
   "closeDate": "2026-11-26"
  },
  "361610": {
   "price": 10770,
   "date": "2026-11-26",
   "changePct": 3.5,
   "close": 10770,
   "closeDate": "2026-11-26"
  },
  "402340": {
   "price": 652000,
   "date": "2026-11-26",
   "changePct": 2.7,
   "close": 652000,
   "closeDate": "2026-11-26"
  },
  "005930": {
   "price": 171300,
   "date": "2026-11-26",
   "changePct": 0.4,
   "close": 171300,
   "closeDate": "2026-11-26"
  },
  "055550": {
   "price": 84700,
   "date": "2026-11-26",
   "changePct": -0.5,
   "close": 84700,
   "closeDate": "2026-11-26"
  },
  "000810": {
   "price": 513000,
   "date": "2026-11-26",
   "changePct": -0.2,
   "close": 513000,
   "closeDate": "2026-11-26"
  },
  "012450": {
   "price": 627000,
   "date": "2026-11-26",
   "changePct": -0.9,
   "close": 627000,
   "closeDate": "2026-11-26"
  },
  "009540": {
   "price": 223000,
   "date": "2026-11-26",
   "changePct": 0.9,
   "close": 223000,
   "closeDate": "2026-11-26"
  },
  "068270": {
   "price": 215500,
   "date": "2026-11-26",
   "changePct": -0.7,
   "close": 215500,
   "closeDate": "2026-11-26"
  },
  "000270": {
   "price": 93700,
   "date": "2026-11-26",
   "changePct": -2.4,
   "close": 93700,
   "closeDate": "2026-11-26"
  },
  "032640": {
   "price": 14880,
   "date": "2026-11-26",
   "changePct": -2.7,
   "close": 14880,
   "closeDate": "2026-11-26"
  },
  "029780": {
   "price": 40200,
   "date": "2026-11-26",
   "changePct": -1,
   "close": 40200,
   "closeDate": "2026-11-26"
  },
  "035900": {
   "price": 48700,
   "date": "2026-11-26",
   "changePct": 4.6,
   "close": 48700,
   "closeDate": "2026-11-26"
  },
  "036570": {
   "price": 186000,
   "date": "2026-11-26",
   "changePct": 2,
   "close": 186000,
   "closeDate": "2026-11-26"
  },
  "035720": {
   "price": 30200,
   "date": "2026-11-26",
   "changePct": -2.6,
   "close": 30200,
   "closeDate": "2026-11-26"
  },
  "001040": {
   "price": 125000,
   "date": "2026-11-26",
   "changePct": 3.8,
   "close": 125000,
   "closeDate": "2026-11-26"
  },
  "012750": {
   "price": 102300,
   "date": "2026-11-26",
   "changePct": -1.3,
   "close": 102300,
   "closeDate": "2026-11-26"
  },
  "000660": {
   "price": 1053000,
   "date": "2026-11-26",
   "changePct": 2.2,
   "close": 1053000,
   "closeDate": "2026-11-26"
  },
  "086790": {
   "price": 119200,
   "date": "2026-11-26",
   "changePct": -1.4,
   "close": 119200,
   "closeDate": "2026-11-26"
  },
  "001120": {
   "price": 31700,
   "date": "2026-11-26",
   "changePct": -0.3,
   "close": 31700,
   "closeDate": "2026-11-26"
  },
  "005830": {
   "price": 164900,
   "date": "2026-11-26",
   "changePct": -0.7,
   "close": 164900,
   "closeDate": "2026-11-26"
  },
  "066570": {
   "price": 135200,
   "date": "2026-11-26",
   "changePct": -1.3,
   "close": 135200,
   "closeDate": "2026-11-26"
  },
  "086280": {
   "price": 198100,
   "date": "2026-11-26",
   "changePct": -3.4,
   "close": 198100,
   "closeDate": "2026-11-26"
  },
  "018260": {
   "price": 193100,
   "date": "2026-11-26",
   "changePct": 0.3,
   "close": 193100,
   "closeDate": "2026-11-26"
  },
  "005850": {
   "price": 37650,
   "date": "2026-11-26",
   "changePct": -1.6,
   "close": 37650,
   "closeDate": "2026-11-26"
  },
  "005490": {
   "price": 248500,
   "date": "2026-11-26",
   "changePct": -1.2,
   "close": 248500,
   "closeDate": "2026-11-26"
  },
  "035420": {
   "price": 160200,
   "date": "2026-11-26",
   "changePct": 0.8,
   "close": 160200,
   "closeDate": "2026-11-26"
  },
  "010120": {
   "price": 113400,
   "date": "2026-11-26",
   "changePct": -0.8,
   "close": 113400,
   "closeDate": "2026-11-26"
  },
  "030200": {
   "price": 45900,
   "date": "2026-11-26",
   "changePct": -0.2,
   "close": 45900,
   "closeDate": "2026-11-26"
  },
  "012330": {
   "price": 329500,
   "date": "2026-11-26",
   "changePct": -5.7,
   "close": 329500,
   "closeDate": "2026-11-26"
  },
  "047050": {
   "price": 46550,
   "date": "2026-11-26",
   "changePct": 1.1,
   "close": 46550,
   "closeDate": "2026-11-26"
  },
  "042700": {
   "price": 147700,
   "date": "2026-11-26",
   "changePct": 0.3,
   "close": 147700,
   "closeDate": "2026-11-26"
  },
  "064400": {
   "price": 66000,
   "date": "2026-11-26",
   "changePct": -1.3,
   "close": 66000,
   "closeDate": "2026-11-26"
  },
  "095340": {
   "price": 116800,
   "date": "2026-11-26",
   "changePct": 1.2,
   "close": 116800,
   "closeDate": "2026-11-26"
  },
  "000100": {
   "price": 82100,
   "date": "2026-11-26",
   "changePct": -1.7,
   "close": 82100,
   "closeDate": "2026-11-26"
  },
  "033780": {
   "price": 179500,
   "date": "2026-11-26",
   "changePct": -2,
   "close": 179500,
   "closeDate": "2026-11-26"
  },
  "MSFT": {
   "price": 489.93,
   "date": "2026-11-25",
   "changePct": -1.2,
   "close": 489.93,
   "closeDate": "2026-11-25"
  },
  "V": {
   "price": 424.39,
   "date": "2026-11-25",
   "changePct": 1.8,
   "close": 424.39,
   "closeDate": "2026-11-25"
  },
  "MA": {
   "price": 659.97,
   "date": "2026-11-25",
   "changePct": 1.9,
   "close": 659.97,
   "closeDate": "2026-11-25"
  },
  "GOOGL": {
   "price": 273.1,
   "date": "2026-11-25",
   "changePct": -2.1,
   "close": 273.1,
   "closeDate": "2026-11-25"
  },
  "NVDA": {
   "price": 149.3,
   "date": "2026-11-25",
   "changePct": -3.9,
   "close": 149.3,
   "closeDate": "2026-11-25"
  },
  "META": {
   "price": 609.89,
   "date": "2026-11-25",
   "changePct": 3.4,
   "close": 609.89,
   "closeDate": "2026-11-25"
  },
  "AVGO": {
   "price": 300.86,
   "date": "2026-11-25",
   "changePct": -0.1,
   "close": 300.86,
   "closeDate": "2026-11-25"
  },
  "TSM": {
   "price": 342.34,
   "date": "2026-11-25",
   "changePct": -2,
   "close": 342.34,
   "closeDate": "2026-11-25"
  },
  "UBER": {
   "price": 66.35,
   "date": "2026-11-25",
   "changePct": 2.6,
   "close": 66.35,
   "closeDate": "2026-11-25"
  },
  "GM": {
   "price": 83.99,
   "date": "2026-11-25",
   "changePct": 2,
   "close": 83.99,
   "closeDate": "2026-11-25"
  },
  "VZ": {
   "price": 47.28,
   "date": "2026-11-25",
   "changePct": 0.3,
   "close": 47.28,
   "closeDate": "2026-11-25"
  },
  "C": {
   "price": 113.33,
   "date": "2026-11-25",
   "changePct": -0.5,
   "close": 113.33,
   "closeDate": "2026-11-25"
  },
  "DUK": {
   "price": 131.9,
   "date": "2026-11-25",
   "changePct": 0.7,
   "close": 131.9,
   "closeDate": "2026-11-25"
  },
  "KO": {
   "price": 97.59,
   "date": "2026-11-25",
   "changePct": 0,
   "close": 97.59,
   "closeDate": "2026-11-25"
  },
  "JNJ": {
   "price": 273.94,
   "date": "2026-11-25",
   "changePct": -0.9,
   "close": 273.94,
   "closeDate": "2026-11-25"
  },
  "LLY": {
   "price": 1392.22,
   "date": "2026-11-25",
   "changePct": -1.1,
   "close": 1392.22,
   "closeDate": "2026-11-25"
  },
  "CI": {
   "price": 271.42,
   "date": "2026-11-25",
   "changePct": -1.3,
   "close": 271.42,
   "closeDate": "2026-11-25"
  },
  "TSLA": {
   "price": 380.14,
   "date": "2026-11-25",
   "changePct": -1.2,
   "close": 380.14,
   "closeDate": "2026-11-25"
  },
  "AAPL": {
   "price": 355.58,
   "date": "2026-11-25",
   "changePct": 0.4,
   "close": 355.58,
   "closeDate": "2026-11-25"
  },
  "MU": {
   "price": 601.25,
   "date": "2026-11-25",
   "changePct": -4.5,
   "close": 601.25,
   "closeDate": "2026-11-25"
  },
  "MDT": {
   "price": 96.06,
   "date": "2026-11-25",
   "changePct": -0.1,
   "close": 96.06,
   "closeDate": "2026-11-25"
  },
  "IREN": {
   "price": 12.85,
   "date": "2026-11-25",
   "changePct": -0.8,
   "close": 12.85,
   "closeDate": "2026-11-25"
  },
  "DVN": {
   "price": 42.45,
   "date": "2026-11-25",
   "changePct": 2.7,
   "close": 42.45,
   "closeDate": "2026-11-25"
  },
  "GS": {
   "price": 801.03,
   "date": "2026-11-25",
   "changePct": -0.6,
   "close": 801.03,
   "closeDate": "2026-11-25"
  },
  "AMP": {
   "price": 504.98,
   "date": "2026-11-25",
   "changePct": 1.4,
   "close": 504.98,
   "closeDate": "2026-11-25"
  },
  "PNC": {
   "price": 220.33,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 220.33,
   "closeDate": "2026-11-25"
  },
  "MTB": {
   "price": 215.5,
   "date": "2026-11-25",
   "changePct": 0.5,
   "close": 215.5,
   "closeDate": "2026-11-25"
  },
  "SO": {
   "price": 95,
   "date": "2026-11-25",
   "changePct": 0.9,
   "close": 95,
   "closeDate": "2026-11-25"
  },
  "WEC": {
   "price": 119.09,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 119.09,
   "closeDate": "2026-11-25"
  },
  "TJX": {
   "price": 146.09,
   "date": "2026-11-25",
   "changePct": 1.6,
   "close": 146.09,
   "closeDate": "2026-11-25"
  },
  "ANET": {
   "price": 163.99,
   "date": "2026-11-25",
   "changePct": -2.7,
   "close": 163.99,
   "closeDate": "2026-11-25"
  },
  "GD": {
   "price": 360.27,
   "date": "2026-11-25",
   "changePct": 2.5,
   "close": 360.27,
   "closeDate": "2026-11-25"
  },
  "LMT": {
   "price": 599.24,
   "date": "2026-11-25",
   "changePct": 2.1,
   "close": 599.24,
   "closeDate": "2026-11-25"
  },
  "CB": {
   "price": 380.51,
   "date": "2026-11-25",
   "changePct": 1.4,
   "close": 380.51,
   "closeDate": "2026-11-25"
  },
  "GILD": {
   "price": 176.74,
   "date": "2026-11-25",
   "changePct": -0.9,
   "close": 176.74,
   "closeDate": "2026-11-25"
  },
  "BRK.B": {
   "price": 579.32,
   "date": "2026-11-25",
   "changePct": 0.4,
   "close": 579.32,
   "closeDate": "2026-11-25"
  },
  "TMO": {
   "price": 685.52,
   "date": "2026-11-25",
   "changePct": -1.5,
   "close": 685.52,
   "closeDate": "2026-11-25"
  },
  "ECL": {
   "price": 308.89,
   "date": "2026-11-25",
   "changePct": 0.6,
   "close": 308.89,
   "closeDate": "2026-11-25"
  },
  "RSG": {
   "price": 254.16,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 254.16,
   "closeDate": "2026-11-25"
  },
  "CTAS": {
   "price": 227.65,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 227.65,
   "closeDate": "2026-11-25"
  },
  "ORLY": {
   "price": 96.69,
   "date": "2026-11-25",
   "changePct": 1.3,
   "close": 96.69,
   "closeDate": "2026-11-25"
  },
  "ADP": {
   "price": 316.72,
   "date": "2026-11-25",
   "changePct": 1.9,
   "close": 316.72,
   "closeDate": "2026-11-25"
  },
  "FAST": {
   "price": 52.93,
   "date": "2026-11-25",
   "changePct": 1.3,
   "close": 52.93,
   "closeDate": "2026-11-25"
  },
  "VRT": {
   "price": 173.37,
   "date": "2026-11-25",
   "changePct": -0.3,
   "close": 173.37,
   "closeDate": "2026-11-25"
  },
  "CSCO": {
   "price": 94.2,
   "date": "2026-11-25",
   "changePct": 0.2,
   "close": 94.2,
   "closeDate": "2026-11-25"
  },
  "TEL": {
   "price": 211.48,
   "date": "2026-11-25",
   "changePct": 1.3,
   "close": 211.48,
   "closeDate": "2026-11-25"
  },
  "RMD": {
   "price": 245.7,
   "date": "2026-11-25",
   "changePct": 0.9,
   "close": 245.7,
   "closeDate": "2026-11-25"
  },
  "DG": {
   "price": 139.27,
   "date": "2026-11-25",
   "changePct": 0.4,
   "close": 139.27,
   "closeDate": "2026-11-25"
  },
  "DXCM": {
   "price": 84.84,
   "date": "2026-11-25",
   "changePct": 0.2,
   "close": 84.84,
   "closeDate": "2026-11-25"
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 4711.21,
   "date": "2026-11-26",
   "changePct": 0.3,
   "close": 4711.21,
   "closeDate": "2026-11-26",
   "at": "2026-11-26T09:17:53Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7182.78,
   "date": "2026-11-25",
   "changePct": -0.3,
   "close": 7182.78,
   "closeDate": "2026-11-25",
   "at": "2026-11-26T09:17:53Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215.74,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 215.74,
   "closeDate": "2026-11-25",
   "at": "2026-11-26T09:17:53Z"
  }
 }
};
