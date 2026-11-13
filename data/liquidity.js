// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-13",
 "headline": "미국은 돈의 흐름이 들어오는 쪽이지만 연준 인상 기대와 금리 급등이 겹친 신중 국면, 한국은 예탁금·신용융자가 3개월 새 15% 가까이 줄어든 부정 국면이다.",
 "headlineUS": "흐름 점수가 최근 5년 중 73% 위치로 들어오는 쪽이고 신용 스프레드도 좁아졌다. 다만 12월 인상 기대와 10년물 5.10%, 금융여건 긴축이 단기 부담이다.",
 "headlineKR": "투자자예탁금 85.5조원(3개월 -14.5%)과 신용융자 25.9조원(3개월 -14.8%)이 함께 줄었다. 원화 강세는 들어오는 쪽이지만 한은 인상 기대가 겹쳐 부정 국면이 이어진다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.06으로 최근 5년 중 하위부터 73% 위치이고, 검증상 흐름 점수 상위 구간일수록 다음 12개월 S&P500 초과수익이 높았다(3개월 앞은 뚜렷하지 않음).",
   "신용 스프레드 1.51%p로 3개월 새 13bp 좁아졌고 연준 순유동성 5.84조 달러(3개월 +0.8%), 실질 M2 2%로 돈이 들어오는 쪽이며, 이 근거로 baseline 중기 부정보다 한 단계 높게 본다.",
   "금융여건지수 -0.462가 3개월 새 0.082 올라 긴축 쪽으로 움직이며 신용 경고 4개 중 1개가 켜졌고, 달러인덱스는 3개월 +3.2% 올랐다.",
   "연방기금금리 선물은 12월 +25bp 90%, 2027년 4월까지 +75bp 90%를 반영해 실효 3.88%에서 4.61%까지 인상 경로를 가격에 담고 있다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 85.5조원으로 3개월 새 14.5% 줄었고, 검증상 예탁금 감소 하위 3분의 1 구간의 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "신용융자 25.9조원으로 3개월 새 14.8% 줄어 개인 레버리지 자금도 빠지는 중이다.",
   "외국인 순매수 누적 -52.4조원, 코스피 60일 외국인 순매도 57조원대로 외국인 자금 이탈이 이어진다.",
   "원/달러 1,333원(3개월 -5.9%)으로 원화 강세는 들어오는 쪽이지만, 한은 기준금리 3%에 1년 인상 약 2.4회분(기대 3.595%)이 반영돼 있다."
  ]
 },
 "nextCheck": "12월 8~9일 FOMC 전까지 미 10년물 5.10% 부근 움직임, 코스피 5,207 지지 여부, 투자자예탁금 85.5조원·신용융자 25.9조원의 추가 감소 여부를 본다.",
 "sources": [
  "https://www.babypips.com/news/daily-financial-forex-market-recap-2026-11-12",
  "https://finance.yahoo.com/economy/policy/articles/fed-officials-open-door-half-164918823.html",
  "https://www.bloomberg.com/news/articles/2026-11-10/fed-s-waller-backs-december-rate-hike-says-open-to-larger-move",
  "https://cnn.com/2026/11/10/investing/bond-yields-inflation-fed"
 ],
 "policyNews": {
  "asOf": "2026-11-13",
  "us": {
   "stance": "매파",
   "note": "10월 근원 CPI가 0.3%로 예상치 0.2%를 웃돌아 월러 이사가 제시한 12월 50bp 인상 검토 기준에 닿았고, 로건 댈러스 연은 총재는 3.75~4.00% 정책금리가 너무 낮다고, 슈미드 캔자스시티 연은 총재는 상당히 완화적이라고 말했다. 로이터 설문에서는 101명 전원이 12월 9일 25bp 인상을 예상했다.",
   "sources": [
    "https://finance.yahoo.com/economy/policy/articles/fed-officials-open-door-half-164918823.html",
    "https://www.bloomberg.com/news/articles/2026-11-10/fed-s-waller-backs-december-rate-hike-says-open-to-larger-move",
    "https://fxstreet.com/news/25-basis-points-is-the-unanimous-call-for-december-fed-hike-reuters-poll-202611101326",
    "https://www.tradingandinvestmentnews.co.uk/fed-waller-rate-hike-allies/"
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
