// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-13",
 "headline": "미국은 돈이 들어오는 흐름이지만 연준 인상 기대와 10년물 5.10%가 겹친 신중 국면, 한국은 예탁금·신용융자 감소가 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수 0.05(최근 5년 중 70% 위치)와 신용 스프레드 축소로 돈은 들어오는 쪽이다. 다만 12월 인상을 반영한 금리 선물과 10년물 5.10%가 부담이라 단기·중기 모두 신중으로 본다.",
 "headlineKR": "투자자예탁금 3개월 -7.8%, 신용융자 -16.7%로 국내 개인 자금이 빠지는 중이다. 외국인 대규모 순매도와 한은 인상 기대가 겹쳐 단기·중기 모두 부정으로 본다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.05는 최근 5년 중 70% 위치로 상위 3분의 1에 들고, 과거 이 구간의 다음 12개월 평균이 +14.6%로 가장 높았던 점이 baseline 중기 부정보다 한 단계 높게 본 근거다.",
   "신용 스프레드 1.51%p(3개월 -13bp)로 들어오는 쪽이고, 신용 경고는 1/4(금융여건지수 3개월 +0.082)로 2개 이상 경고 기준에는 못 미친다.",
   "연방기금금리 선물은 12/9 회의 기대 4.17%(+25bp 84%)를 반영하고 10년물은 5.10%까지 올라 금리 부담이 커졌다.",
   "달러인덱스 103.18(3개월 +3.5%)은 빠짐, 연준 순유동성 5.84조 달러(3개월 +0.8%)는 보통 쪽이다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 92.2조원(3개월 -7.8%)·신용융자 25.8조원(3개월 -16.7%)으로 모두 줄었고, 과거 예탁금 감소 하위 구간의 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "외국인 순매수 -53조원으로 빠짐 쪽이며, 코스피 20일 외국인 순매도는 -109,459억원이다.",
   "원/달러 1,335원(3개월 -5.8%)은 들어오는 쪽이고 흐름 점수는 0.06(최근 5년 중 62% 위치)이다.",
   "한은 기준금리 3%에 시장은 1년 기간 평균 기준 인상 약 2.4회분(기대 3.595%)을 반영하고 있다."
  ]
 },
 "nextCheck": "11/13 미국 10월 PPI와 11/17 엔비디아 실적, 코스피 5,255 지지 여부, 12/9 FOMC 인상 폭을 확인한다.",
 "sources": [
  "https://vistapglobal.com/stock-market-today-november-12-2026-stocks-fall-as-treasury-yields-hit-5-10-oil-rises-and-nvidia-faces-leadership-reset-amd-crwv-eprx-googl-modd-msft-nvda-ser-spcx-ttek-ual/",
  "https://www.adn.com/business-economy/2026/11/12/nvidia-stock-plunge-weighs-on-wall-street-while-oil-prices-swing/",
  "https://www.pbs.org/newshour/economy/sharp-swings-for-nvidia-and-oil-prices-weigh-on-wall-street",
  "https://www.ajunews.com/view/20261113152425151"
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
