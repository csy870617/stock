// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-17",
 "headline": "미국은 돈이 들어오는 흐름에 연준 인상 기대가 겹친 신중 국면이고, 한국은 예탁금·신용융자 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 상위권이고 신용 스프레드도 좁아졌다. 다만 12월 25bp 인상이 96% 반영됐고 10년물이 5%대여서 단기·중기 모두 신중이다.",
 "headlineKR": "투자자예탁금과 신용융자가 3개월 새 각각 13.7%, 14.9% 줄었고 외국인 순매도가 이어져 단기·중기 모두 부정이다. 11월 26일 금통위 인상 기대도 부담이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수는 0.11로 최근 5년 중 하위부터 75% 위치('들어오는 중')이며, 과거 상위 3분의 1 구간의 다음 12개월 평균 초과수익은 +14.6%였다. 이 때문에 중기를 baseline(부정)보다 한 단계 높은 신중으로 본다.",
   "신용 스프레드는 1.47%p로 3개월 새 22bp 좁아졌고, 신용 경고는 4개 중 1개(금융여건 3개월 변화)만 켜졌다.",
   "연방기금금리 선물은 12월 9일 +25bp 확률 96%, 2027년 4월 기대 금리 4.55%를 반영하고 있고 10년물은 5.12%다.",
   "달러인덱스 3개월 +3.9%, 금융여건지수 3개월 +0.082로 두 지표 모두 돈이 빠지는 쪽이다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금은 86.9조원으로 3개월 새 13.7% 줄었다. 과거 예탁금 증가율 하위 3분의 1 구간의 다음 3개월 코스피 평균 초과수익은 -1.9%였다.",
   "신용융자는 26.3조원으로 3개월 새 14.9% 줄어 개인 자금도 빠지는 흐름이다.",
   "외국인은 코스피에서 20일간 13조2,723억원, 60일간 60조3,691억원을 순매도했다.",
   "한국은행 3개월 금리 기대는 3.2%로 인상 쪽으로 기울어 있고, 다음 금통위는 11월 26일이다."
  ]
 },
 "nextCheck": "엔비디아 실적(한국 시간 18일 새벽)과 11월 26일 금통위 결정, 그리고 코스피 4,911·나스닥 24,262 지지 유지 여부를 확인한다.",
 "sources": [
  "https://www.hngn.com/articles/273846/20261116/stocks-slide-10-year-yield-stays-above-5-before-nvidia.htm",
  "https://www.fool.com/investing/2026/11/16/theres-now-100-chance-fed-rate-hike-in-december-thats-not-worst-news-for-wall-street/",
  "https://www.forbes.com/sites/simonmoore/2026/11/13/waller-floats-prospect-of-larger-december-interest-rate-hike/",
  "https://www.sisajournal-e.com/news/articleView.html?idxno=425108"
 ],
 "policyNews": {
  "asOf": "2026-11-17",
  "us": {
   "stance": "매파",
   "note": "월러 이사는 10월 근원 CPI가 전월 대비 0.3% 이상이면 12월 0.5%p 인상을 검토해야 한다고 했다. 해먁 클리블랜드 연은 총재는 물가가 '잘못된 방향'이라며 작은 폭의 잦은 인상을 제안했고, 굴스비 총재는 물가 지표를 '거의 우려할 만하다'고 평가했다.",
   "sources": [
    "https://www.forbes.com/sites/simonmoore/2026/11/13/waller-floats-prospect-of-larger-december-interest-rate-hike/",
    "https://finance.biggo.com/news/b62eb783-246d-4db0-a03f-01011752e2c5",
    "https://www.cnbc.com/2026/11/11/goolsbee-october-inflation-fed-rates-disturbing-distressing.html",
    "https://cnbc.com/2026/11/15/fed-has-some-work-to-do-on-inflation-kansas-city-fed-chief-says.html"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10월 22일 기준금리를 연 3.00%로 만장일치 동결했고, 신현송 총재는 긴축적 정책 기조를 이어갈 필요가 있다고 말했다. 시장은 11월 26일 회의에서 3.25% 인상 가능성에 무게를 둔다.",
   "sources": [
    "https://www.khan.co.kr/article/202610222159005",
    "https://www.segye.com/newsView/20261022520163"
   ]
  }
 }
};
