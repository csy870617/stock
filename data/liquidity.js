// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-12",
 "headline": "미국은 돈의 흐름이 중간 수준이나 12월 인상 기대와 금융여건 긴축이 겹친 신중 국면, 한국은 예탁금·신용융자가 3개월 새 15% 가까이 줄어든 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 65% 위치로 중간 구간이다. 다만 10월 CPI 상회 뒤 12월 인상이 거의 확실시되고 금융여건지수와 달러가 빠지는 쪽이라 신중 국면이다.",
 "headlineKR": "투자자예탁금·신용융자가 3개월 새 각각 -14.5%·-14.8% 줄어 과거 다음 3개월 성과가 가장 약했던 구간에 있다. 한은 인상 기대와 외국인 누적 순매도도 이어져 부정 국면이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 -0.04로 최근 5년 중 하위부터 65% 위치이며, 과거 중간 3분의 1 구간의 다음 12개월 평균 초과수익은 +13.6%였다.",
   "금융여건지수 -0.459로 3개월 +0.079 긴축되며 신용 경고 4개 중 1개가 켜져 있다.",
   "연준 순유동성 5.79조 달러(3개월 -0.8%), 달러인덱스 3개월 +3.1%로 유동성 보강 신호는 약하다.",
   "신용 스프레드 1.51%p로 3개월 -11bp 좁혀졌고, 선물은 12월 +25bp 92%·내년 4월까지 기대 금리 4.54%를 반영해 baseline 단기 우호보다 한 단계 낮게 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 85.5조원으로 3개월 -14.5% 줄어 과거 다음 3개월 코스피 초과수익이 평균 -1.9%였던 하위 구간에 있다.",
   "신용융자 25.9조원으로 3개월 -14.8% 감소해 개인 레버리지 자금도 빠지고 있다.",
   "외국인 순매수 누적 -52.5조원으로 빠지는 흐름이며, 코스피 20일 외국인 순매도는 10조 1,197억원이다.",
   "원/달러 3개월 -5.9%로 환율은 들어오는 쪽이나, 한은 1년 기대 금리 3.595%로 인상 약 2.4회분이 반영돼 있다."
  ]
 },
 "nextCheck": "12월 9일 FOMC 인상 폭 기대(+50bp 확률), 코스피 일봉 지지 5,207 유지 여부, 투자자예탁금·신용융자 감소세가 멈추는지 확인한다.",
 "sources": [
  "https://www.cnbc.com/2026/11/10/cpi-inflation-report-october-2026.html",
  "https://www.stocktitan.net/articles/october-2026-cpi-inflation-report",
  "https://www.g-enews.com/article/Finance/2026/11/202611121543373679bb91c46fcd_1"
 ],
 "policyNews": {
  "asOf": "2026-11-12",
  "us": {
   "stance": "매파",
   "note": "10월 CPI가 전월 대비 0.4%로 예상을 웃돌았고 근원 CPI는 월러 이사가 12월 0.5%p 인상 논의 기준으로 제시한 약 0.3%에 해당했다. CME FedWatch 기준 12월 0.25%p 인상 87.3%, 0.5%p 인상 12.7%, 동결 0%로 집계됐다.",
   "sources": [
    "https://www.cnbc.com/2026/11/10/cpi-inflation-report-october-2026.html",
    "https://www.investmentnews.com/equities/october-cpi-comes-in-hot-raising-odds-of-a-bigger-than-expected-rate-hike/268961",
    "https://www.stocktitan.net/articles/october-2026-cpi-inflation-report"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10월 22일 기준금리를 연 3.0%로 만장일치 동결했고 총재는 긴축적 정책 기조를 이어갈 필요가 있다고 말했다. 시장은 11월 회의에서 인상을 예상한다.",
   "sources": [
    "https://www.khan.co.kr/article/202610222159005",
    "https://www.seoulfn.com/news/articleView.html?idxno=640744"
   ]
  }
 }
};
