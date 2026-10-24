// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-24",
 "headline": "유가 100달러 돌파와 연준 12월 인상 기대(86%)로 미국은 단기 신중·중기 부정, 코스피 20일 -21% 급락과 외국인 매도가 겹친 한국은 단기 매우 부정·중기 부정입니다.",
 "headlineUS": "자동 지표는 단기 우호를 가리키지만, 미 10년물 4.99% 반등과 연방기금 선물의 12월 인상 확률 86%·내년 3월 기대금리 4.32%를 반영해 단기 신중, 중기 부정으로 봅니다.",
 "headlineKR": "코스피 20일 -21% 급락과 외국인 9,810억원 순매도로 단기는 매우 부정입니다. 한국은행 1년 금리 기대가 인상 약 2.1회분을 반영하고 국제 유가가 급등해 중기도 부정입니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "drivers": [
   "연방기금 선물은 10/28 동결(90%) 뒤 12/9 인상 확률 86%, 2027년 3월 기대금리 4.32%를 반영해 긴축 경로가 이어지고 있습니다.",
   "WTI가 하루 3.82% 오른 103.27달러, 브렌트가 116.72달러로 4년여 만의 최고치에 오르면서 10년물이 4.99%로 반등해 baseline 의 10년물 추세 가점을 그대로 읽기 어렵습니다.",
   "HY 채권이 20일 -0.6%로 신용 여건이 다소 약해졌고 VIX는 19.5로 중립 수준입니다.",
   "금리 예측 모델의 12개월 전망 4.64%와 테일러 준칙 4.39%가 현재 실효금리 3.88%보다 높아 중기 부담이 큽니다."
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "부정",
  "drivers": [
   "코스피는 20일 -21% 급락 floor가 발동된 상태이고 10/23에도 장중 -4.12%까지 밀렸습니다.",
   "외국인은 직전 일주일(10/16~22) 5,800억원 순매수 뒤 10/23 9,810억원 순매도로 돌아서 수급 회복이 이어지지 못했습니다.",
   "한국은행 기준금리 3%에 대해 시장은 1년 평균 기대금리 3.523%로 인상 약 2.1회분을 반영하고 있습니다.",
   "원/달러가 3개월 -8.8%로 원화 강세가 이어진 점은 우호 요인이지만, WTI 올해 +79.9% 급등이 물가 부담을 키우고 있습니다."
  ]
 },
 "nextCheck": "10/28 FOMC 결정과 12월 인상 확률(현재 86%), WTI의 110.48달러 저항 돌파 여부, 코스피가 5,306 지지 위에서 버티는지를 확인합니다.",
 "sources": [
  "http://www.idahopress.com/ap_news/us/wall-street-loses-ground-under-pressure-from-rising-oil-prices/article_928170fe-05b3-59f5-a8fc-e253aee1bde2.html",
  "https://finance.yahoo.com/markets/world-indices/articles/major-us-stock-indexes-fared-201458598.html",
  "https://www.munhwa.com/article/11625899",
  "https://www.fnnews.com/news/202610231637254942"
 ],
 "policyNews": {
  "asOf": "2026-10-24",
  "us": {
   "stance": "매파",
   "note": "연준은 9월 15~16일 회의에서 금리를 0.25%p 올려 3.75~4.00%로 만들었고, 10/27~28 FOMC(결정 10/28)를 앞두고 로이터 설문에서 이코노미스트 100명 중 94명이 동결을 예상했습니다. 연방기금 선물은 10월 동결 90% 뒤 12/9 회의 인상 확률 86%를 반영하고 있습니다.",
   "sources": [
    "https://www.raisin.com/en-us/news/pre-fomc-preview-positioning-cash-october-2026/",
    "https://www.noradarealestate.com/blog/fed-interest-rate-predictions-october-2026/"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결해 7·8월 연속 인상 뒤 처음 쉬어 갔습니다. 신현송 총재는 성장·물가가 예상을 웃돌 위험이 커졌다면서도 3분기 GDP와 10월 물가를 더 보고 판단하겠다고 했고, 아주경제는 정책 방향이 뚜렷하게 매파적이라고 해석했습니다.",
   "sources": [
    "https://www.newspim.com/news/view/20261022000766",
    "https://www.ajunews.com/view/20261022150447471"
   ]
  }
 }
};
