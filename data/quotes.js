// 시세 스냅샷 — scripts/update-quotes.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)
// 분석(recommendations.js) 과 분리되어 시세만 매일 저비용으로 갱신된다.
// 페이지 가격 우선순위: 실시간 API(config.js) > 이 스냅샷 > recommendations.js 종가(폴백)
// 각 항목: ticker → { price, date, changePct, close, closeDate }
//   price·date 는 조회 시각의 현재가(장중이면 장중가), close·closeDate 는 마지막으로 끝난 정규장 종가(스냅샷 기록용)
// indices: 성과 기준 지수(kospi ^KS11·sp500 ^GSPC·rsp RSP) — 같은 형식, snapshot.js 가 종목 종가와 짝지어 기록
window.STOCK_QUOTES = {
 "generatedAt": "2026-11-25",
 "quotes": {
  "103590": {
   "price": 50800,
   "date": "2026-11-25",
   "changePct": -7.8,
   "close": 50800,
   "closeDate": "2026-11-25"
  },
  "105560": {
   "price": 148100,
   "date": "2026-11-25",
   "changePct": -2.2,
   "close": 148100,
   "closeDate": "2026-11-25"
  },
  "138040": {
   "price": 123800,
   "date": "2026-11-25",
   "changePct": 0.7,
   "close": 123800,
   "closeDate": "2026-11-25"
  },
  "139130": {
   "price": 15400,
   "date": "2026-11-25",
   "changePct": -1.2,
   "close": 15400,
   "closeDate": "2026-11-25"
  },
  "175330": {
   "price": 24850,
   "date": "2026-11-25",
   "changePct": -2,
   "close": 24850,
   "closeDate": "2026-11-25"
  },
  "192820": {
   "price": 327000,
   "date": "2026-11-25",
   "changePct": 12.2,
   "close": 327000,
   "closeDate": "2026-11-25"
  },
  "207940": {
   "price": 1363000,
   "date": "2026-11-25",
   "changePct": 5.7,
   "close": 1363000,
   "closeDate": "2026-11-25"
  },
  "241560": {
   "price": 48450,
   "date": "2026-11-25",
   "changePct": -2.5,
   "close": 48450,
   "closeDate": "2026-11-25"
  },
  "267250": {
   "price": 113300,
   "date": "2026-11-25",
   "changePct": 0.1,
   "close": 113300,
   "closeDate": "2026-11-25"
  },
  "267260": {
   "price": 383000,
   "date": "2026-11-25",
   "changePct": -4.2,
   "close": 383000,
   "closeDate": "2026-11-25"
  },
  "267270": {
   "price": 74300,
   "date": "2026-11-25",
   "changePct": -6.7,
   "close": 74300,
   "closeDate": "2026-11-25"
  },
  "271560": {
   "price": 119900,
   "date": "2026-11-25",
   "changePct": 2.9,
   "close": 119900,
   "closeDate": "2026-11-25"
  },
  "282330": {
   "price": 142400,
   "date": "2026-11-25",
   "changePct": 6.7,
   "close": 142400,
   "closeDate": "2026-11-25"
  },
  "298040": {
   "price": 1608000,
   "date": "2026-11-25",
   "changePct": -8.8,
   "close": 1608000,
   "closeDate": "2026-11-25"
  },
  "316140": {
   "price": 31400,
   "date": "2026-11-25",
   "changePct": 0.2,
   "close": 31400,
   "closeDate": "2026-11-25"
  },
  "323410": {
   "price": 22000,
   "date": "2026-11-25",
   "changePct": 3.3,
   "close": 22000,
   "closeDate": "2026-11-25"
  },
  "361610": {
   "price": 10410,
   "date": "2026-11-25",
   "changePct": -2.9,
   "close": 10410,
   "closeDate": "2026-11-25"
  },
  "402340": {
   "price": 635000,
   "date": "2026-11-25",
   "changePct": -11.2,
   "close": 635000,
   "closeDate": "2026-11-25"
  },
  "005930": {
   "price": 170700,
   "date": "2026-11-25",
   "changePct": -9.9,
   "close": 170700,
   "closeDate": "2026-11-25"
  },
  "055550": {
   "price": 85100,
   "date": "2026-11-25",
   "changePct": -1.7,
   "close": 85100,
   "closeDate": "2026-11-25"
  },
  "000810": {
   "price": 514000,
   "date": "2026-11-25",
   "changePct": 0.6,
   "close": 514000,
   "closeDate": "2026-11-25"
  },
  "012450": {
   "price": 633000,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 633000,
   "closeDate": "2026-11-25"
  },
  "009540": {
   "price": 221000,
   "date": "2026-11-25",
   "changePct": -1.8,
   "close": 221000,
   "closeDate": "2026-11-25"
  },
  "068270": {
   "price": 217000,
   "date": "2026-11-25",
   "changePct": 3.8,
   "close": 217000,
   "closeDate": "2026-11-25"
  },
  "000270": {
   "price": 96000,
   "date": "2026-11-25",
   "changePct": 0.4,
   "close": 96000,
   "closeDate": "2026-11-25"
  },
  "032640": {
   "price": 15290,
   "date": "2026-11-25",
   "changePct": 2.2,
   "close": 15290,
   "closeDate": "2026-11-25"
  },
  "029780": {
   "price": 40600,
   "date": "2026-11-25",
   "changePct": 0.2,
   "close": 40600,
   "closeDate": "2026-11-25"
  },
  "035900": {
   "price": 46550,
   "date": "2026-11-25",
   "changePct": -0.3,
   "close": 46550,
   "closeDate": "2026-11-25"
  },
  "036570": {
   "price": 182300,
   "date": "2026-11-25",
   "changePct": 6.4,
   "close": 182300,
   "closeDate": "2026-11-25"
  },
  "035720": {
   "price": 31000,
   "date": "2026-11-25",
   "changePct": 2.1,
   "close": 31000,
   "closeDate": "2026-11-25"
  },
  "001040": {
   "price": 120400,
   "date": "2026-11-25",
   "changePct": 6.6,
   "close": 120400,
   "closeDate": "2026-11-25"
  },
  "012750": {
   "price": 103600,
   "date": "2026-11-25",
   "changePct": 1.8,
   "close": 103600,
   "closeDate": "2026-11-25"
  },
  "000660": {
   "price": 1030000,
   "date": "2026-11-25",
   "changePct": -11.1,
   "close": 1030000,
   "closeDate": "2026-11-25"
  },
  "086790": {
   "price": 120900,
   "date": "2026-11-25",
   "changePct": -1.8,
   "close": 120900,
   "closeDate": "2026-11-25"
  },
  "001120": {
   "price": 31800,
   "date": "2026-11-25",
   "changePct": -0.2,
   "close": 31800,
   "closeDate": "2026-11-25"
  },
  "005830": {
   "price": 166100,
   "date": "2026-11-25",
   "changePct": 1.1,
   "close": 166100,
   "closeDate": "2026-11-25"
  },
  "066570": {
   "price": 137000,
   "date": "2026-11-25",
   "changePct": -4.3,
   "close": 137000,
   "closeDate": "2026-11-25"
  },
  "086280": {
   "price": 205000,
   "date": "2026-11-25",
   "changePct": -0.7,
   "close": 205000,
   "closeDate": "2026-11-25"
  },
  "018260": {
   "price": 192500,
   "date": "2026-11-25",
   "changePct": 4.5,
   "close": 192500,
   "closeDate": "2026-11-25"
  },
  "005850": {
   "price": 38250,
   "date": "2026-11-25",
   "changePct": 0.1,
   "close": 38250,
   "closeDate": "2026-11-25"
  },
  "005490": {
   "price": 251500,
   "date": "2026-11-25",
   "changePct": -1.6,
   "close": 251500,
   "closeDate": "2026-11-25"
  },
  "035420": {
   "price": 159000,
   "date": "2026-11-25",
   "changePct": 1.9,
   "close": 159000,
   "closeDate": "2026-11-25"
  },
  "010120": {
   "price": 114300,
   "date": "2026-11-25",
   "changePct": -6.3,
   "close": 114300,
   "closeDate": "2026-11-25"
  },
  "030200": {
   "price": 46000,
   "date": "2026-11-25",
   "changePct": 2.2,
   "close": 46000,
   "closeDate": "2026-11-25"
  },
  "012330": {
   "price": 349500,
   "date": "2026-11-25",
   "changePct": -2.6,
   "close": 349500,
   "closeDate": "2026-11-25"
  },
  "047050": {
   "price": 46050,
   "date": "2026-11-25",
   "changePct": -1.7,
   "close": 46050,
   "closeDate": "2026-11-25"
  },
  "042700": {
   "price": 147300,
   "date": "2026-11-25",
   "changePct": -10,
   "close": 147300,
   "closeDate": "2026-11-25"
  },
  "064400": {
   "price": 66900,
   "date": "2026-11-25",
   "changePct": 1.5,
   "close": 66900,
   "closeDate": "2026-11-25"
  },
  "095340": {
   "price": 115400,
   "date": "2026-11-25",
   "changePct": -11.2,
   "close": 115400,
   "closeDate": "2026-11-25"
  },
  "000100": {
   "price": 83500,
   "date": "2026-11-25",
   "changePct": 8,
   "close": 83500,
   "closeDate": "2026-11-25"
  },
  "021240": {
   "price": 102100,
   "date": "2026-11-25",
   "changePct": 1.7,
   "close": 102100,
   "closeDate": "2026-11-25"
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
  }
 },
 "indices": {
  "kospi": {
   "symbol": "^KS11",
   "price": 4697.51,
   "date": "2026-11-25",
   "changePct": -6.2,
   "close": 4697.51,
   "closeDate": "2026-11-25",
   "at": "2026-11-25T22:14:41Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7182.78,
   "date": "2026-11-25",
   "changePct": -0.3,
   "close": 7182.78,
   "closeDate": "2026-11-25",
   "at": "2026-11-25T22:14:41Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 215.74,
   "date": "2026-11-25",
   "changePct": 0.8,
   "close": 215.74,
   "closeDate": "2026-11-25",
   "at": "2026-11-25T22:14:41Z"
  }
 }
};
