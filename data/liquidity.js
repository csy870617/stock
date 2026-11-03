// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-03",
 "headline": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면이다. 한국은 예탁금 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 들어오는 중(최근 5년 중 70% 위치)이다. 다만 12월 25bp 인상 확률 73%와 10년물 4.89%가 부담이라 신중 국면이다.",
 "headlineKR": "투자자예탁금이 3개월 새 12% 줄고 외국인 순매수가 -45.1조원으로 빠지는 부정 국면이다. 한국은행 인상 기대도 이어진다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.04로 최근 5년 중 하위부터 70% 위치이며, 실질 M2가 2% 늘어 돈이 들어오는 쪽이다.",
   "연준 순유동성은 5.75조 달러로 3개월 새 1.4% 줄었고, 신용 스프레드는 1.53%p로 3개월 새 10bp 좁아져 보통 수준이다.",
   "신용 경고는 4개 중 1개(금융여건지수 3개월 +0.051)만 켜져, 2개 이상 켜진 급락 위험 구간은 아니다.",
   "연방기금금리 선물은 12/9 25bp 인상 확률 73%, 2027년 4월까지 실효 4.34%를 반영해 baseline 단기 우호(+0.54)보다 한 단계 낮게 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금은 90.5조원으로 3개월 새 12% 줄었다. 과거 예탁금 감소 하위 3분의 1 구간의 다음 3개월 코스피 평균 초과수익은 -1.9%였다.",
   "외국인 순매수는 -45.1조원으로 빠짐이고, 코스피 60일 외국인 순매도가 49조991억원에 이른다.",
   "신용융자는 29.2조원(3개월 +6.5%)으로 보통이고 회사채 스프레드는 0.69%p(3개월 -1bp)로 안정적이다. 흐름 점수도 47% 위치의 중간이라 baseline 단기 매우 부정보다 한 단계 높게 본다.",
   "한국은행 기준금리 3%에 1년 인상 약 2.0회분이 반영돼 있어 중기 부담이 이어진다."
  ]
 },
 "nextCheck": "코스피 5,306·나스닥 25,146 지지 여부, 이번 주 미국 고용지표·중간선거 결과, 투자자예탁금 추이를 확인한다.",
 "sources": [
  "https://www.munhwa.com/article/11628216",
  "https://news.tf.co.kr/read/economy/2383943.htm",
  "https://www.mediafine.co.kr/news/articleView.html?idxno=94415",
  "https://www.businesskorea.co.kr/news/articleView.html?idxno=280247"
 ],
 "policyNews": {
  "asOf": "2026-11-03",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 기준금리를 3.75~4.00%로 10대 2 동결했고 쿡 이사와 해맥 총재는 25bp 인상을 주장했다. 10/30 로건 총재는 최소 두 차례 추가 인상이 필요하다고, 무살렘 총재는 추가 긴축이 곧 필요하다고 말했다.",
   "sources": [
    "https://www.cnbc.com/2026/10/28/fed-meeting-today-live-updates.html",
    "https://am.jpmorgan.com/us/en/asset-management/adv/insights/portfolio-insights/fixed-income/fixed-income-perspectives/fomc-statement-october-2026/",
    "https://www.cnn.com/2026/10/28/business/live-news/federal-reserve-interest-rate-october",
    "https://www.cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결했다. 7·8월 연속 인상 뒤 첫 동결이며, 신현송 총재는 물가가 목표로 안정적으로 수렴한다는 확신이 들 때까지 긴축 기조를 유지해야 한다고 말했다.",
   "sources": [
    "https://www.ajunews.com/view/20261022150447471",
    "https://m.news.nate.com/view/20261022n25087"
   ]
  }
 }
};
