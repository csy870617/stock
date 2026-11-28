// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-28",
 "headline": "두 나라 모두 단기 유동성 여건은 부정적이다 — 미국은 돈의 흐름이 5년 하위 25%로 빠지는 중이고, 한국은 예탁금·신용융자가 3개월 새 크게 줄었다.",
 "headlineUS": "미국 흐름 점수 -0.41(5년 하위 25%)로 돈이 빠지는 국면이고, 달러 강세·금융여건 악화에 12월 인상이 반영돼 있다. 극도의 공포 구간에서 3개월 안 추가 급락이 잦았던 점이 단기 부담이다.",
 "headlineKR": "예탁금(-15.6%)과 신용융자(-23.5%)가 3개월 새 크게 줄어 단기 여건은 부정적이다. 한은의 올해 세 번째 인상과 1년 인상 기대도 중기 부담이다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 -0.41로 최근 5년 하위 25%이며 금융여건지수 -0.444(3개월 +0.098)와 달러인덱스 104.01(3개월 +4.3%)이 빠짐 쪽이다.",
   "신용 경고는 4개 중 1개(금융여건 3개월 변화)가 켜졌고, 시장 심리 16.2 극도의 공포 구간 뒤 3개월 안 S&P500 10% 넘는 추가 하락이 31%였다.",
   "중기는 baseline(부정)보다 한 단계 높게 본다 — 연준 순유동성 5.83조 달러(3개월 +0.9%)와 신용 스프레드 1.61%p(3개월 -1bp)가 보통이고, 흐름 점수 하위 3분의 1에서도 다음 12개월 평균 초과수익은 +9.9%였다.",
   "연방기금선물은 12/9 +25bp를 99%, 2027년 4월까지 기대 금리 4.51%를 반영해 긴축 경로가 이어진다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 83.5조원(3개월 -15.6%)과 신용융자 25조원(3개월 -23.5%)이 모두 줄어, 과거 이 구간 다음 3개월 코스피 초과수익이 낮았던 쪽에 있다.",
   "외국인 순매수는 -56.3조원으로 빠짐이고 20일 누적도 -146,635억원이다.",
   "중기는 baseline(매우 부정)보다 한 단계 높게 본다 — 흐름 점수 -0.18(5년 하위 43%)은 보통이고 원/달러 1,344원(3개월 -2.7%)은 들어옴, 회사채 스프레드 0.69%p는 보통이다.",
   "한은 기준금리 3.25%에 1년 기대 금리 3.638%로 추가 인상이 반영돼 있다."
  ]
 },
 "nextCheck": "11/30 금융권 시장안정 긴급 점검회의 결과, 12/9 FOMC 결정, 코스피 4,808·나스닥 23,631 지지 유지 여부를 본다.",
 "sources": [
  "https://theglassdesk.substack.com/p/weekly-market-review-nov-27-2026",
  "https://keyzard.cc/views/nb/PTosKz4xNjI-M2VlbW1ra2ZraGtvZmxv",
  "https://predictionmarketspicks.com/tools/fed-rate-tracker/december-2026",
  "https://www.fntimes.com/html/view.php?ud=202611261110132637179ad43907_18"
 ],
 "policyNews": {
  "asOf": "2026-11-28",
  "us": {
   "stance": "매파",
   "note": "10월 28일 FOMC는 기준금리를 3.75~4%로 동결했지만 위원 2명이 인상에 표를 던졌다. 12월 9일 결정을 앞두고 연방기금선물은 0.25%p 인상을 99% 반영하고 있다.",
   "sources": [
    "https://defirate.com/odds/fed-decision/",
    "https://predictionmarketspicks.com/tools/fed-rate-tracker/december-2026",
    "https://predictionmarketspicks.com/articles/fed-rate-december-2026-odds-half-point-hike-dot-plot-kalshi-polymarket-futures",
    "https://www.frenzycap.com/fedwatch/2026-12-09"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "한은 금통위는 11/26 기준금리를 0.25%p 올려 3.25%로 결정했고(5명 찬성) 올해 세 번째 인상이다. 신현송 총재는 견조한 성장 속 물가 안정 기조를 공고히 하려는 인상이라고 밝혔고, 성장률 전망을 내년 4.1%로 올렸으며 점도표는 3.50%에 8개가 몰렸다.",
   "sources": [
    "https://www.fntimes.com/html/view.php?ud=202611261110132637179ad43907_18",
    "https://www.seoul.co.kr/news/economy/finance/2026/11/26/20261126500036",
    "https://www.news21tongsin.co.kr/news/311233",
    "https://dansin-news.vercel.app/articles/bok-base-rate-increase-november-2026"
   ]
  }
 }
};
