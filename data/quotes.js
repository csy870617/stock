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
   "price": 496.13,
   "date": "2026-11-24",
   "changePct": 0.7,
   "close": 496.13,
   "closeDate": "2026-11-24"
  },
  "V": {
   "price": 416.78,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 416.78,
   "closeDate": "2026-11-24"
  },
  "MA": {
   "price": 647.44,
   "date": "2026-11-24",
   "changePct": 1.9,
   "close": 647.44,
   "closeDate": "2026-11-24"
  },
  "GOOGL": {
   "price": 279.05,
   "date": "2026-11-24",
   "changePct": -1.1,
   "close": 279.05,
   "closeDate": "2026-11-24"
  },
  "NVDA": {
   "price": 155.38,
   "date": "2026-11-24",
   "changePct": -5.9,
   "close": 155.38,
   "closeDate": "2026-11-24"
  },
  "META": {
   "price": 589.82,
   "date": "2026-11-24",
   "changePct": -1.3,
   "close": 589.82,
   "closeDate": "2026-11-24"
  },
  "AVGO": {
   "price": 301.08,
   "date": "2026-11-24",
   "changePct": -4,
   "close": 301.08,
   "closeDate": "2026-11-24"
  },
  "TSM": {
   "price": 349.2,
   "date": "2026-11-24",
   "changePct": -4,
   "close": 349.2,
   "closeDate": "2026-11-24"
  },
  "UBER": {
   "price": 64.7,
   "date": "2026-11-24",
   "changePct": 1,
   "close": 64.7,
   "closeDate": "2026-11-24"
  },
  "GM": {
   "price": 82.32,
   "date": "2026-11-24",
   "changePct": 0.8,
   "close": 82.32,
   "closeDate": "2026-11-24"
  },
  "VZ": {
   "price": 47.16,
   "date": "2026-11-24",
   "changePct": 1.5,
   "close": 47.16,
   "closeDate": "2026-11-24"
  },
  "C": {
   "price": 113.85,
   "date": "2026-11-24",
   "changePct": -0.4,
   "close": 113.85,
   "closeDate": "2026-11-24"
  },
  "DUK": {
   "price": 130.96,
   "date": "2026-11-24",
   "changePct": 1.2,
   "close": 130.96,
   "closeDate": "2026-11-24"
  },
  "KO": {
   "price": 97.62,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 97.62,
   "closeDate": "2026-11-24"
  },
  "JNJ": {
   "price": 276.46,
   "date": "2026-11-24",
   "changePct": 2.4,
   "close": 276.46,
   "closeDate": "2026-11-24"
  },
  "LLY": {
   "price": 1407.59,
   "date": "2026-11-24",
   "changePct": 3.2,
   "close": 1407.59,
   "closeDate": "2026-11-24"
  },
  "CI": {
   "price": 275,
   "date": "2026-11-24",
   "changePct": 1.7,
   "close": 275,
   "closeDate": "2026-11-24"
  },
  "TSLA": {
   "price": 384.68,
   "date": "2026-11-24",
   "changePct": -0.2,
   "close": 384.68,
   "closeDate": "2026-11-24"
  },
  "AAPL": {
   "price": 354.07,
   "date": "2026-11-24",
   "changePct": 1.4,
   "close": 354.07,
   "closeDate": "2026-11-24"
  },
  "MU": {
   "price": 629.79,
   "date": "2026-11-24",
   "changePct": -11,
   "close": 629.79,
   "closeDate": "2026-11-24"
  },
  "MDT": {
   "price": 96.13,
   "date": "2026-11-24",
   "changePct": -4.6,
   "close": 96.13,
   "closeDate": "2026-11-24"
  },
  "IREN": {
   "price": 12.95,
   "date": "2026-11-24",
   "changePct": -11.5,
   "close": 12.95,
   "closeDate": "2026-11-24"
  },
  "DVN": {
   "price": 41.33,
   "date": "2026-11-24",
   "changePct": 0.9,
   "close": 41.33,
   "closeDate": "2026-11-24"
  },
  "GS": {
   "price": 806.02,
   "date": "2026-11-24",
   "changePct": -2.1,
   "close": 806.02,
   "closeDate": "2026-11-24"
  },
  "AMP": {
   "price": 497.8,
   "date": "2026-11-24",
   "changePct": 0.8,
   "close": 497.8,
   "closeDate": "2026-11-24"
  },
  "PNC": {
   "price": 218.62,
   "date": "2026-11-24",
   "changePct": 0.7,
   "close": 218.62,
   "closeDate": "2026-11-24"
  },
  "MTB": {
   "price": 214.33,
   "date": "2026-11-24",
   "changePct": 1.3,
   "close": 214.33,
   "closeDate": "2026-11-24"
  },
  "SO": {
   "price": 94.11,
   "date": "2026-11-24",
   "changePct": 1.1,
   "close": 94.11,
   "closeDate": "2026-11-24"
  },
  "WEC": {
   "price": 118.12,
   "date": "2026-11-24",
   "changePct": 0.7,
   "close": 118.12,
   "closeDate": "2026-11-24"
  },
  "TJX": {
   "price": 143.86,
   "date": "2026-11-24",
   "changePct": 3.3,
   "close": 143.86,
   "closeDate": "2026-11-24"
  },
  "ANET": {
   "price": 168.56,
   "date": "2026-11-24",
   "changePct": -5.5,
   "close": 168.56,
   "closeDate": "2026-11-24"
  },
  "GD": {
   "price": 351.55,
   "date": "2026-11-24",
   "changePct": 1.1,
   "close": 351.55,
   "closeDate": "2026-11-24"
  },
  "LMT": {
   "price": 586.63,
   "date": "2026-11-24",
   "changePct": 2.6,
   "close": 586.63,
   "closeDate": "2026-11-24"
  },
  "CB": {
   "price": 375.37,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 375.37,
   "closeDate": "2026-11-24"
  },
  "GILD": {
   "price": 178.29,
   "date": "2026-11-24",
   "changePct": 4.5,
   "close": 178.29,
   "closeDate": "2026-11-24"
  },
  "BRK.B": {
   "price": 577.21,
   "date": "2026-11-24",
   "changePct": 0.8,
   "close": 577.21,
   "closeDate": "2026-11-24"
  },
  "TMO": {
   "price": 695.62,
   "date": "2026-11-24",
   "changePct": 1.1,
   "close": 695.62,
   "closeDate": "2026-11-24"
  },
  "ECL": {
   "price": 307.14,
   "date": "2026-11-24",
   "changePct": 0.4,
   "close": 307.14,
   "closeDate": "2026-11-24"
  },
  "RSG": {
   "price": 252.15,
   "date": "2026-11-24",
   "changePct": 1.8,
   "close": 252.15,
   "closeDate": "2026-11-24"
  },
  "CTAS": {
   "price": 225.76,
   "date": "2026-11-24",
   "changePct": 0.9,
   "close": 225.76,
   "closeDate": "2026-11-24"
  },
  "ORLY": {
   "price": 95.43,
   "date": "2026-11-24",
   "changePct": 1.9,
   "close": 95.43,
   "closeDate": "2026-11-24"
  },
  "ADP": {
   "price": 310.79,
   "date": "2026-11-24",
   "changePct": 2.9,
   "close": 310.79,
   "closeDate": "2026-11-24"
  },
  "FAST": {
   "price": 52.27,
   "date": "2026-11-24",
   "changePct": 0.4,
   "close": 52.27,
   "closeDate": "2026-11-24"
  },
  "VRT": {
   "price": 173.82,
   "date": "2026-11-24",
   "changePct": -6.7,
   "close": 173.82,
   "closeDate": "2026-11-24"
  },
  "CSCO": {
   "price": 93.99,
   "date": "2026-11-24",
   "changePct": -2.9,
   "close": 93.99,
   "closeDate": "2026-11-24"
  },
  "TEL": {
   "price": 208.71,
   "date": "2026-11-24",
   "changePct": -2,
   "close": 208.71,
   "closeDate": "2026-11-24"
  },
  "LOGI": {
   "price": 100.16,
   "date": "2026-11-24",
   "changePct": -0.2,
   "close": 100.16,
   "closeDate": "2026-11-24"
  },
  "RMD": {
   "price": 243.44,
   "date": "2026-11-24",
   "changePct": 1.7,
   "close": 243.44,
   "closeDate": "2026-11-24"
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
   "at": "2026-11-25T08:35:07Z"
  },
  "sp500": {
   "symbol": "^GSPC",
   "price": 7201.09,
   "date": "2026-11-24",
   "changePct": -0.5,
   "close": 7201.09,
   "closeDate": "2026-11-24",
   "at": "2026-11-25T08:35:07Z"
  },
  "rsp": {
   "symbol": "RSP",
   "price": 213.96,
   "date": "2026-11-24",
   "changePct": 0.5,
   "close": 213.96,
   "closeDate": "2026-11-24",
   "at": "2026-11-25T08:35:07Z"
  }
 }
};
