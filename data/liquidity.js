// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-04",
 "headline": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면이고, 한국은 예탁금 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "미국은 흐름 점수 -0.01, 최근 5년 중 68% 위치로 돈이 들어오는 중이다. 다만 12월 25bp 인상 확률 80%가 반영돼 신중 국면이다.",
 "headlineKR": "한국은 흐름 점수 -0.25로 돈이 빠지는 중이다. 투자자예탁금이 3개월 새 20.1% 줄었고, 외국인 순매도가 계속돼 부정 국면이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "연준 순유동성은 5.75조 달러로 3개월 새 1.4% 줄었고, 신용 스프레드는 1.53%p로 8bp 좁혀져 보통 수준이다.",
   "금융여건지수는 -0.459로 3개월 새 0.079 올라 신용 경고 1/4가 켜졌다. 4개 중 2개 이상이 켜진 급락 위험 구간은 아니다.",
   "연방기금금리 선물은 12/9 25bp 인상 80%, 2027년 4월까지 기대 금리 4.37%를 반영한다. 미 10년물 4.95%가 baseline의 단기 우호 판단을 상쇄한다.",
   "흐름 점수는 중간 3분의 1에 해당한다. 이 구간의 과거 다음 12개월 평균 초과수익은 +13.6%였지만, 인상 경로가 중기 판단을 신중에 묶어 둔다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금은 88.2조원으로 3개월 새 20.1% 줄었다. 예탁금 감소 하위 3분의 1 구간의 과거 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "외국인 순매수는 -54.7조원으로 빠지는 흐름이고, 코스피 60일 외국인 누적 순매도는 52조9,928억원이다.",
   "신용융자는 29조원(3개월 +5.6%), 회사채 스프레드는 0.69%p(3개월 -1bp)로 보통이다. 원/달러도 3개월 -5.7%로 들어오는 쪽이어서, baseline의 단기 매우 부정보다 한 단계 높게 본다.",
   "11/26 금통위 인상 가능성이 거론되고, 1년 시장금리는 인상 약 2.0회분을 반영한다."
  ]
 },
 "nextCheck": "12/9 FOMC 인상 확률과 11/26 금통위 결정, 코스피 5,306 지지 여부, 투자자예탁금 88.2조원의 변화를 확인한다.",
 "sources": [
  "https://www.raisin.com/en-us/news/post-fomc-policy-breakdown-navigating-rates-q4-2026/",
  "https://www.cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html",
  "https://www.tmgm.com/en-eu/analysis/market-news/article/federal-reserve-one-more-2026-hike-then-murkier-path-bny-202611031159",
  "https://www.etoday.co.kr/news/view/2644192"
 ],
 "policyNews": {
  "asOf": "2026-11-04",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 FOMC에서 10대 2로 금리를 3.75~4.00%에 동결했고, 쿡 이사와 해맥 총재는 25bp 인상을 주장했다. 10/30 로건 총재는 25bp 인상이 최소 두 번 더 필요하다고 했고, 무살렘 총재는 추가 인상이 곧 필요하다고 말했다.",
   "sources": [
    "https://www.raisin.com/en-us/news/post-fomc-policy-breakdown-navigating-rates-q4-2026/",
    "https://www.cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html",
    "https://www.tmgm.com/en-eu/analysis/market-news/article/federal-reserve-one-more-2026-hike-then-murkier-path-bny-202611031159"
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
