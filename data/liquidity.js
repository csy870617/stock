// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-07",
 "headline": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대와 극도의 공포가 겹친 신중 국면이다. 한국은 예탁금 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 들어오는 중(5년 중 60% 위치)이고 신용 경고는 1/4에 그친다. 다만 12/9 인상 확률 78%와 극도의 공포(15.2)가 단기 부담이다.",
 "headlineKR": "투자자예탁금이 3개월 -14.9% 줄었고, 외국인 20일 순매도가 22조6,048억원이다. 다만 신용융자·회사채 스프레드는 보통 수준이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "연준 순유동성은 5.79조 달러(3개월 -0.8%)이고, 신용 스프레드는 1.57%p(3개월 -4bp)로 보통이다. 신용 경고는 금융여건 1개만 켜진 1/4다.",
   "흐름 점수 -0.09는 5년 중 60% 위치로 중간 구간이다. 과거 이 구간의 다음 12개월 평균은 +13.6%였다.",
   "시장 심리 15.2는 극도의 공포 구간이다. 과거 이 구간인 달 뒤 3개월 안에 S&P500이 10% 넘게 더 빠진 경우가 31%였다(그 밖 8%).",
   "12/9 FOMC 인상 확률이 78%이고 10년물이 4.86%다. baseline 단기 우호보다 한 단계 낮게 본 근거다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금은 88.5조원(3개월 -14.9%)으로 빠지는 흐름이다. 과거 예탁금 감소 하위 3분의 1의 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "외국인 순매수 누계는 -57.6조원이다. 코스피 외국인 순매도는 20일 22조6,048억원, 6일 연속이다.",
   "신용융자는 28.8조원(3개월 -0.1%), 회사채 스프레드는 0.69%p(3개월 -1bp)로 보통이다. 원/달러도 3개월 -4.6%로 들어오는 쪽이어서, baseline 단기 매우 부정보다 한 단계 높게 봤다.",
   "한국은행은 11/26 인상 가능성이 거론되는 긴축 기조다. 1년 기대금리는 3.537%로 현재 3%보다 높다."
  ]
 },
 "nextCheck": "코스피 4,911·코스닥 629 지지 여부, 투자자예탁금 추이, 11/26 금통위와 12/9 FOMC 인상 여부를 확인한다.",
 "sources": [
  "https://www.ddaily.co.kr/page/view/2026110615524945049",
  "https://www.fnnews.com/news/202611061559461085",
  "https://www.upi.com/Top_News/US/2026/11/06/nasdaq-rebounds-tech-stocks/5901794005326",
  "https://investrade.com/market-review-november-06-2026/"
 ],
 "policyNews": {
  "asOf": "2026-11-07",
  "us": {
   "stance": "매파",
   "note": "데일리 샌프란시스코 연은 총재는 11/06 추가 긴축이 필요할 것으로 본다고 말했다. 바킨·해맥 총재는 점진적 인상을 지지했고, 로건 총재는 최소 두 차례 25bp 인상이 더 필요하다고 했다.",
   "sources": [
    "https://bloomberg.com/news/articles/2026-11-06/fed-s-daly-says-more-rate-increases-likely-needed-to-tame-prices",
    "https://www.cnbc.com/2026/11/06/fed-daly-interest-rates-inflation.html",
    "https://investing.com/news/economy-news/feds-daly-says-further-rate-hikes-likely-needed-to-curb-inflation-5009002",
    "https://www.advisorhub.com/morning-bell-wrapup-11-6-2026/"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결했고, 신현송 총재는 긴축 기조를 이어가겠다고 했다. 시장은 11/26 금통위의 인상에 무게를 두며, 노무라는 11월과 내년 2월 각 0.25%p 인상을 예상했다.",
   "sources": [
    "https://www.segye.com/newsView/20261022520163",
    "https://www.fnnews.com/news/202610290728345571",
    "https://www.hankookilbo.com/news/article/A2026102913470001326"
   ]
  }
 }
};
