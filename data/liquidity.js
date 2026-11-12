// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-12",
 "headline": "미국은 돈의 흐름이 중간 수준이지만 금리 인상 기대와 금융여건 긴축이 겹친 신중 국면, 한국은 예탁금·신용융자가 3개월 새 15% 가까이 줄어든 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 63% 위치로 중간이고 신용 스프레드도 낮다. 다만 12월 인상 확률이 93%로 반영됐고 금융여건지수와 달러가 3개월 새 빠지는 쪽이라 신중하게 본다.",
 "headlineKR": "투자자예탁금 -14.5%, 신용융자 -14.8%로 3개월 새 개인 자금이 크게 빠졌다. 과거 이 구간은 다음 3개월 코스피 초과수익이 낮은 쪽이었다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 -0.05로 최근 5년 중 63% 위치, 과거 이 중간 구간의 다음 12개월 평균은 국채 이자 대비 +13.6%였다.",
   "신용 스프레드 1.51%p(3개월 -11bp)로 안정적이지만 금융여건지수가 3개월 +0.082 악화돼 신용 경고 1/4가 켜졌다.",
   "연방기금금리 선물은 12월 인상 93%, 2027년 4월까지 기대 4.58%로 추가 인상을 반영해 baseline 단기 '우호'보다 한 단계 낮게 본다.",
   "달러인덱스 3개월 +3.2%로 달러 강세가 유동성에는 빠지는 쪽이다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 85.5조원(3개월 -14.5%)으로 줄어, 과거 하위 3분의 1 구간의 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "신용융자 25.9조원(3개월 -14.8%)도 함께 줄어 개인 자금이 빠지는 흐름이다.",
   "외국인 순매수는 -52.4조원으로 빠지는 쪽이고, 60일 누적 코스피 외국인 순매도는 57조원을 넘는다.",
   "원/달러가 3개월 -5.8% 내린 점은 들어오는 쪽이지만, 한국은행 1년 금리 기대가 3.595%로 인상 쪽이라 중기도 부정으로 둔다."
  ]
 },
 "nextCheck": "나스닥 24,936·코스피 5,207 아래로 내려가는지, 11월 말 10월 PCE와 12월 8~9일 FOMC 결과, 예탁금·신용융자의 3개월 변화가 멈추는지 확인한다.",
 "sources": [
  "https://www.axios.com/2026/11/10/cpi-october-inflation-fed",
  "https://www.bloomberg.com/news/articles/2026-11-10/fed-s-waller-backs-december-rate-hike-says-open-to-larger-move",
  "https://www.cnbc.com/2026/11/10/fed-governor-waller-sees-december-hike-likely.html",
  "https://www.cnn.com/2026/11/10/investing/bond-yields-inflation-fed"
 ],
 "policyNews": {
  "asOf": "2026-11-12",
  "us": {
   "stance": "매파",
   "note": "월러 이사는 근원 CPI가 0.3% 이상이면 12월 50bp 인상을 검토해야 한다고 했고, 근원 CPI는 0.3%로 발표됐다. 로건 댈러스 연은 총재는 최소 두 차례 추가 0.25%p 인상을, 슈미드 캔자스시티 연은 총재는 현재 금리가 '상당히 완화적'이라고 말했다.",
   "sources": [
    "https://finance.yahoo.com/economy/policy/articles/fed-officials-open-door-half-164918823.html",
    "https://www.bloomberg.com/news/articles/2026-11-10/fed-s-waller-backs-december-rate-hike-says-open-to-larger-move",
    "https://www.cnbc.com/2026/11/10/fed-governor-waller-sees-december-hike-likely.html",
    "https://investinglive.com/central-banks/fed-s-waller-says-a-half-point-rate-hike-in-december-may-be-needed-if-core-cpi-comes-in-hot/"
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
