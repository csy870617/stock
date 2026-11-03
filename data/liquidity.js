// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-03",
 "headline": "미국은 돈의 흐름이 들어오는 중이지만 연준 인상 기대가 누르는 신중 국면, 한국은 투자자예탁금 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 70% 위치로 양호하지만, 선물시장이 12월 인상 확률을 76%로 반영하고 있어 신중 국면이다.",
 "headlineKR": "투자자예탁금이 3개월 새 13.3% 줄었고 외국인 20일 순매도가 19조원을 넘어 부정 국면이다. 원화 강세는 우호 요인이지만 11/26 금통위 인상 관측이 부담이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.05로 최근 5년 중 하위부터 70% 위치이고 실질 M2가 2% 늘어 돈은 들어오는 중이다.",
   "연준 순유동성은 5.75조 달러로 3개월 -1.4%, 신용 스프레드는 1.53%p로 3개월 -10bp로 모두 보통 수준이다.",
   "신용 경고는 4개 중 1개(금융여건지수 3개월 +0.051)만 켜져 있어 과거 기준 급락 위험이 높은 구간은 아니다.",
   "baseline 단기 우호와 달리, 연방기금금리 선물이 12월 +25bp 76%·내년 4월 4.35%까지 인상을 반영하고 미 10년물이 4.89%라 단기를 신중으로 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금이 90.2조원으로 3개월 -13.3% 줄어, 과거 예탁금 감소 구간의 다음 3개월 코스피 초과수익은 낮았다.",
   "신용융자는 29.1조원으로 3개월 +0.5%에 그쳐 개인 레버리지 유입도 뚜렷하지 않다.",
   "외국인은 20일 -19조1,399억원·60일 -47조9,552억원 순매도로 이탈이 이어지고 있다.",
   "원/달러가 3개월 -6.2%로 원화 강세 쪽이지만, 흐름 점수 -0.08(하위부터 47%)과 연준 순유동성 -1.4%로 중기 보정 근거가 약하다."
  ]
 },
 "nextCheck": "나스닥 지지선 25,146 유지 여부, 미 중간선거 결과·고용지표, 11/26 금통위 결정을 확인한다.",
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
