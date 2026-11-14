// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-14",
 "headline": "미국은 돈이 들어오는 흐름이지만 연준 인상 기대와 10년물 5.15%가 겹친 신중 국면, 한국은 예탁금·신용융자 감소와 외국인 매도가 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수가 최근 5년 중 75% 위치이고 신용 스프레드가 좁혀졌지만, 12월 인상 확률 92%와 10년물 5.15%가 부담인 신중 국면이다.",
 "headlineKR": "투자자예탁금(3개월 -7.8%)과 신용융자(-16.7%)가 함께 줄고 외국인 매도가 이어지는 부정 국면이다. 원화 강세만 들어오는 쪽이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.09로 최근 5년 중 75% 위치이며, 과거 상위 구간 뒤 12개월 S&P500 초과수익 평균이 더 높았던 쪽이다.",
   "신용 스프레드 1.48%p로 3개월 새 19bp 좁혀졌고 신용 경고는 4개 중 1개(금융여건지수 3개월 +0.082)만 켜져 있어, 중기는 baseline(부정)보다 한 단계 높은 신중으로 본다.",
   "연방기금금리 선물은 12월 4.15%·내년 4월 4.57%까지 인상을 반영하고 10년물은 5.15%다.",
   "달러인덱스 3개월 +3.8%로 달러 강세가 돈의 흐름에서 빠지는 쪽으로 작용한다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 92.2조원으로 3개월 -7.8%, 신용융자 25.8조원으로 -16.7% 줄어, 과거 감소 구간 뒤 3개월 코스피 초과수익이 낮았던 쪽이다.",
   "외국인 순매수는 -53조원이고 코스피 20일 외국인 순매도가 10조9,373억원이다.",
   "원/달러 1,334원으로 3개월 -5.9% 원화 강세는 들어오는 쪽이지만 흐름 점수 0.07(최근 5년 62% 위치)은 중간이다.",
   "한국은행 기준금리 3%에 시장의 3개월 기대 금리가 3.19%로 인상 쪽에 기울어 있다."
  ]
 },
 "nextCheck": "12월 9일 FOMC 인상 폭(선물 25bp 92%·50bp 8%), 미 10년물 5.15% 흐름, 코스피 5,253 지지 여부를 확인한다.",
 "sources": [
  "https://www.cnbc.com/2026/11/12/stock-market-today-live-updates.html",
  "https://www.cnbc.com/2026/11/13/ppi-inflation-report-october-2026.html",
  "https://www.bloomberg.com/news/articles/2026-11-12/fed-s-daly-says-more-rate-hikes-likely-needed-to-cool-inflation",
  "https://www.washingtonpost.com/business/2026/11/10/trump-appointed-fed-member-signals-big-rate-hike-inflation-runs-hot/"
 ],
 "policyNews": {
  "asOf": "2026-11-14",
  "us": {
   "stance": "매파",
   "note": "콜린스 보스턴 연은 총재(11/13)는 곧 추가 긴축이 적절하다고, 데일리 샌프란시스코 연은 총재(11/12)는 추가 긴축이 필요할 것이라는 쪽으로 기운다고 말했다. 월러 이사(11/10)는 인플레이션이 계속 높으면 12월 0.5%p 인상이 필요할 수 있다고 했고, 윌리엄스 뉴욕 연은 총재도 추가 인상 가능성이 높다고 말했다.",
   "sources": [
    "https://www.bloomberg.com/news/articles/2026-11-12/fed-s-daly-says-more-rate-hikes-likely-needed-to-cool-inflation",
    "https://www.washingtonpost.com/business/2026/11/10/trump-appointed-fed-member-signals-big-rate-hike-inflation-runs-hot/",
    "https://www.investing.com/news/economy-news/feds-collins-says-more-rate-hikes-are-coming-bloomberg-television-reports-5026183",
    "https://www.mpamag.com/us/mortgage-industry/industry-trends/feds-williams-signals-more-rate-hikes-as-inflation-stays-stubborn/597403"
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
