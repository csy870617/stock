// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-04",
 "headline": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면, 한국은 예탁금 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 70% 위치로 돈이 들어오는 쪽이지만, 12월 25bp 인상 확률 76%와 10년물 4.95%가 부담이다. 신용 경고는 4개 중 1개만 켜졌다.",
 "headlineKR": "투자자예탁금이 3개월 새 12% 줄고 외국인 순매수가 -45조원으로 빠지는 흐름이다. 한국은행 인상 기대도 남아 있다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.02로 최근 5년 중 하위부터 70% 위치이며, 과거 이 구간의 다음 12개월 성과는 하위 구간보다 나았다.",
   "연준 순유동성 5.75조 달러로 3개월 -1.4%, 신용 스프레드 1.53%p로 3개월 -8bp라 신용 여건은 보통이다.",
   "신용 경고는 금융여건지수 3개월 변화(+0.051) 1개만 켜져 급락 위험 신호는 제한적이다.",
   "연방기금금리 선물은 12월 +25bp 확률 76%, 2027년 4월 기대 4.33%로 인상 경로를 반영해 baseline 단기 우호보다 한 단계 낮게 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 90.5조원으로 3개월 -12% 빠져, 과거 예탁금 감소 구간의 다음 3개월 코스피 초과수익은 낮았다.",
   "신용융자 29.2조원으로 3개월 +6.5%에 그쳐 보통 수준이다.",
   "외국인 순매수 -45조원으로 이탈이 이어지고, 코스피 60일 외국인 순매도는 49조원을 넘었다.",
   "원/달러 3개월 -5.4%로 원화 쪽 흐름은 들어오는 편이지만, 한국은행 1년 인상 기대가 약 2.0회분이다."
  ]
 },
 "nextCheck": "미국 중간선거 결과와 AMD 실적, 코스피 5,306 지지 여부, 12월 FOMC 인상 확률(현재 76%)을 확인한다.",
 "sources": [
  "https://www.wikitree.co.kr/articles/1171463",
  "https://m.news.nate.com/view/20261103n26431",
  "https://www.babypips.com/news/daily-financial-forex-market-recap-2026-11-03",
  "https://www.cnbc.com/amp/2026/11/03/us-treasury-yields-bonds.html"
 ],
 "policyNews": {
  "asOf": "2026-11-04",
  "us": {
   "stance": "매파",
   "note": "연준은 10월 FOMC에서 금리를 동결했고 쿡 이사와 해맥(클리블랜드) 총재가 인상 쪽 반대표를 냈다. 10/30 로건·무살렘·바킨 총재는 물가가 너무 높다며 추가 인상 필요성을 언급했고, 12월 25bp 인상 확률은 약 76%다.",
   "sources": [
    "https://finance.yahoo.com/economy/policy/articles/feds-musalem-says-rate-hike-163223128.html",
    "https://www.cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html",
    "https://wtvbam.com/2026/10/30/feds-musalem-says-a-rate-hike-is-needed-soon/"
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
