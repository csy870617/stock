// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-12",
 "headline": "미국은 돈의 흐름이 중간 이상이나 12월 인상 기대와 금융여건 긴축이 겹친 신중 국면, 한국은 지수 반등에도 예탁금·신용융자 감소가 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 하위부터 67% 위치로 중간 이상이지만, 근원 CPI 상회로 12월 25bp 인상이 90% 반영되고 10년물이 5.00%에 이른 신중 국면이다.",
 "headlineKR": "투자자예탁금·신용융자가 3개월 새 두 자릿수로 줄고 외국인 유출이 이어지는 부정 국면이다. 한은 11월 인상 예상도 부담 요인이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 -0.03(최근 5년 하위부터 67%)으로 중상위 구간이며, 검증상 중간·상위 3분의 1의 다음 12개월 평균 초과수익은 +13.6%·+14.6%였다.",
   "신용 스프레드 1.51%p(3개월 -11bp)는 안정적이나 금융여건지수가 3개월 +0.079로 조여져 신용 경고 4개 중 1개가 켜졌다.",
   "연준 순유동성 5.79조 달러(3개월 -0.8%)로 정체, 달러인덱스 3개월 +2.9%로 유입 동력이 약하다.",
   "10월 근원 CPI 0.3%로 3개월 연속 예상 상회, 12월 25bp 인상 확률 90%·미 10년물 5.00%로 baseline 단기 우호보다 한 단계 낮게 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 85.2조원(3개월 -13%)·신용융자 26.5조원(3개월 -11.6%)이 함께 줄었고, 검증상 예탁금 증가 하위 3분의 1 구간의 다음 3개월 코스피 평균 초과수익은 -1.9%였다.",
   "외국인 순매수 -54.3조원 누적, 코스피 20일 외국인 -142,453억원으로 유출 흐름이 이어진다.",
   "원/달러 3개월 -5.8%로 원화 강세는 유입 쪽 요인이고 흐름 점수는 -0.11(하위부터 45%)로 중간 수준이다.",
   "한은 기준금리 3%에 1년 기대금리 3.583%로 인상 약 2.3회분이 반영돼 있다."
  ]
 },
 "nextCheck": "코스피 5,215 지지 여부, 11월 금통위 결정, 11월 말 미국 PCE 물가와 12월 9일 FOMC를 확인한다.",
 "sources": [
  "https://www.cnbc.com/2026/11/10/cpi-inflation-report-october-2026.html",
  "https://www.bloomberg.com/news/articles/2026-11-10/us-core-cpi-rises-more-than-forecast-0-3-supporting-rate-hike",
  "https://www.stocktitan.net/articles/october-2026-cpi-inflation-report",
  "https://view.asiae.co.kr/article/2026111116091976491"
 ],
 "policyNews": {
  "asOf": "2026-11-12",
  "us": {
   "stance": "매파",
   "note": "월러 이사는 근원 CPI가 0.3% 안팎이면 12월 0.5%p 인상을 논의해야 한다고 했고, 로건 댈러스 연은 총재는 0.25%p 인상이 두 차례 더 필요하다고 봤다. 10월 근원 CPI 0.3% 상회 뒤 12월 0.25%p 인상 확률은 90.5%로 집계됐다.",
   "sources": [
    "https://finance.yahoo.com/economy/policy/articles/jumbo-fed-rate-hike-warning-015453314.html",
    "https://www.bloomberg.com/news/articles/2026-11-10/us-core-cpi-rises-more-than-forecast-0-3-supporting-rate-hike",
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
