// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-05",
 "headline": "미국은 돈이 소폭 들어오지만 연준 인상 기대가 누르는 신중 국면, 한국은 예탁금 급감과 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수 0.01로 최근 5년 중 68% 위치의 '들어오는 중'이지만, 12월 25bp 인상 확률 82%와 10년물 4.89%가 부담이다. 신용 경고는 4개 중 1개만 켜져 급락 위험 신호는 제한적이다.",
 "headlineKR": "투자자예탁금이 3개월 새 20.1% 줄며 흐름 점수가 -0.24로 '빠지는 중'이다. 원화 강세와 안정된 회사채 스프레드가 극단적 악화는 막고 있다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.01(최근 5년 중 68% 위치)로 돈이 소폭 들어오는 국면이며, 과거 중간~상위 구간의 다음 12개월 평균 초과수익은 +13.6~14.6%였다.",
   "신용 스프레드 1.54%p(3개월 -10bp)는 보통이지만 금융여건지수가 3개월 +0.079 악화돼 신용 경고 1/4가 켜졌다.",
   "연준 순유동성 5.75조 달러로 3개월 -1.4% 줄었고, 금리 선물은 12/9 25bp 인상 82%, 2027년 4월 기대금리 4.34%를 반영한다.",
   "시장 여건 baseline은 단기 우호지만 연준 인상 경로와 10년물 4.89% 수준을 반영해 단기 신중으로 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 88.2조원으로 3개월 -20.1% 줄었고, 과거 예탁금 감소 하위 3분의 1 구간의 다음 3개월 코스피 평균 초과수익은 -1.9%였다.",
   "외국인 순매수 -54.7조원으로 이탈이 이어지고, 신용융자는 29조원(3개월 +5.6%)으로 보통 수준이다.",
   "baseline 단기 매우 부정은 코스피 20일 -19% 급락에 따른 것이지만, 원/달러 1339원(3개월 -5.9%)이 '들어옴'이고 회사채 스프레드 0.69%p(3개월 -1bp)가 안정돼 부정으로 본다.",
   "한은 1년 기대금리 3.508%로 인상 약 2회분이 반영돼 있고 연준 순유동성도 -1.4%로 중기 부담이다."
  ]
 },
 "nextCheck": "코스피 5,306 지지 유지 여부, 투자자예탁금 추이, 11/26 금통위와 12/9 FOMC 인상 확률을 확인한다.",
 "sources": [
  "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-nov-04-2026",
  "https://www.cnbc.com/2026/11/03/stock-market-today-live-updates.html",
  "https://www.benzinga.com/markets/equities/26/11/62877866/stock-market-today-dow-rallies-oil-sinks-midterms-democrats-sweep-congress",
  "https://www.tokenpost.com/news/investing/48784"
 ],
 "policyNews": {
  "asOf": "2026-11-05",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 FOMC에서 금리를 3.75~4.00%로 동결했고 쿡 이사와 해맥 총재가 인상을 주장하며 반대했다. 10/30 로건 총재는 최소 두 차례 더 25bp 인상이 필요하다고, 무살렘 총재는 곧 추가 인상이 필요하다고 말했고, 선거 뒤 CME 기준 12월 인상 확률은 76.9%로 올랐다.",
   "sources": [
    "https://www.cnn.com/2026/10/28/business/live-news/federal-reserve-interest-rate-october",
    "https://www.bloomberg.com/news/articles/2026-10-28/fed-holds-rates-says-more-data-will-help-next-decision",
    "https://www.cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html",
    "https://www.tokenpost.com/news/investing/48784"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.0%로 만장일치 동결했다. 신현송 총재는 성장세와 물가 오름세가 8월보다 더 강한 면이 있어 긴축 기조를 이어 가야 한다고 말했다. 언론은 11/26 금통위의 인상 가능성이 커졌다고 본다.",
   "sources": [
    "https://hankookilbo.com/news/article/A2026102913470001326",
    "https://m.news.nate.com/view/20261022n40350",
    "https://www.fnnews.com/news/202610290728345571"
   ]
  }
 }
};
