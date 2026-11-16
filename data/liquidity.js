// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-16",
 "headline": "미국은 돈이 들어오는 흐름이지만 12월 인상 기대와 10년물 5.15%가 겹친 신중 국면, 한국은 예탁금·신용융자가 더 줄고 외국인 매도가 이어져 코스피가 3거래일 연속 내린 부정 국면이다.",
 "headlineUS": "흐름 점수가 최근 5년 중 75% 위치이고 신용 스프레드가 좁혀졌지만, 12월 인상 확률 93%와 10년물 5.15%가 부담인 신중 국면이다.",
 "headlineKR": "투자자예탁금(3개월 -13.2%)과 신용융자(-15.8%)가 함께 줄고 외국인 20일 순매도가 12조원을 넘은 부정 국면이다. 흐름 점수는 보통으로 한 단계 내려왔다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.09로 최근 5년 중 75% 위치이며, 과거 상위 구간 뒤 12개월 S&P500 초과수익 평균이 더 높았던 쪽이다.",
   "신용 스프레드 1.48%p로 3개월 새 19bp 좁혀졌고 신용 경고는 4개 중 1개(금융여건지수 3개월 +0.082)만 켜져 있어, 중기는 baseline(부정)보다 한 단계 높은 신중으로 본다.",
   "연방기금금리 선물은 12월 9일 25bp 인상 93%·50bp 7%, 내년 4월까지 약 70bp 인상을 반영하고 10년물은 5.15%다.",
   "달러인덱스 3개월 +3.8%로 달러 강세가 돈의 흐름에서 빠지는 쪽으로 작용한다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 87.4조원으로 3개월 -13.2%, 신용융자 26조원으로 -15.8% 줄어, 과거 감소 구간 뒤 3개월 코스피 초과수익이 낮았던 쪽이다.",
   "11/16 코스피 외국인 -1조3,610억원·기관 -4,616억원 순매도이고 20일 외국인 순매도는 12조3,930억원이다. 연기금 순매도는 5년 2개월 만에 가장 컸다.",
   "원/달러 1,333원으로 3개월 -5.8% 원화 강세는 들어오는 쪽이지만 흐름 점수는 -0.03(최근 5년 53% 위치)으로 보통이다.",
   "한국 시장 심리 점수는 3.1로 극도의 공포 구간이고, 한국은행 기준금리 3%에 시장의 3개월 기대 금리 3.19%로 인상 쪽에 기울어 있다."
  ]
 },
 "nextCheck": "11/17 엔비디아 3분기 실적, 12월 9일 FOMC 인상 폭(선물 25bp 93%·50bp 7%), 코스피 4,911 주간 지지 여부를 확인한다.",
 "sources": [
  "https://en.sedaily.com/market/2026/11/16/pension-funds-dump-most-stocks-in-five-years-as-kospi",
  "https://www.mt.co.kr/en/stock/2026/11/16/2026111610260966180",
  "https://www.cnbc.com/2026/11/12/stock-market-today-live-updates.html",
  "https://www.cnbc.com/2026/11/13/ppi-inflation-report-october-2026.html",
  "https://www.bloomberg.com/news/articles/2026-11-12/fed-s-daly-says-more-rate-hikes-likely-needed-to-cool-inflation"
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
