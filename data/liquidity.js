// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-29",
 "headline": "미국은 연준 동결에도 12월 인상 기대가 여전히 높아 단기 신중·중기 부정, 한국은 코스피 급반등에도 외국인 누적 매도와 금리 인상 기대가 커 단기·중기 모두 부정으로 봅니다.",
 "headlineUS": "연준이 동결했지만 위원 2명이 인상을 주장했고 선물시장은 12월 25bp 인상 확률을 84%로 반영해 단기 유동성은 신중입니다. 미 10년물 5.05%와 내년 상반기까지 이어지는 인상 경로가 중기 여건을 부정으로 누릅니다.",
 "headlineKR": "코스피가 이틀 연속 급반등하고 외국인이 2일 연속 순매수했지만 20일 누적 외국인 순매도가 22조7,467억원에 이르러 단기 여건은 부정입니다. 시장 금리가 한국은행의 1년 인상 약 2.1회분을 반영하고 있어 중기도 부정으로 봅니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "drivers": [
   "연준은 10/28 금리를 동결했지만 위원 2명이 인상을 주장하며 반대했고, 성명은 인플레이션이 여전히 높다는 표현을 유지했습니다.",
   "연방기금금리 선물은 12/9 회의에서 25bp 인상 확률을 84%로 반영해, 자동 baseline(단기 우호)보다 한 단계 낮게 봅니다.",
   "미 10년물 금리가 5.05%이고, 금리 예측 모델은 12개월 뒤 정책금리를 4.84%로 봐 현재 실효 3.89%보다 높습니다.",
   "VIX가 16.9로 안정적이고 HY 채권이 20일 0.9% 올라 신용 여건은 아직 양호합니다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "코스피 외국인 순매도가 20일 누적 22조7,467억원, 60일 누적 40조8,761억원으로, 최근 2일 순매수 전환으로는 아직 상쇄되지 않았습니다.",
   "한국은행 기준금리는 3%이지만 시장 금리는 1년간 인상 약 2.1회분(기대 3.532%)을 반영해, 자동 baseline(중기 우호)보다 낮게 봅니다.",
   "10/28 국고채 10년물 금리가 올라 채권시장이 7거래일 만에 약세로 돌아섰고, 외국인이 3년 국채선물을 17거래일 만에 순매도했습니다.",
   "원/달러가 3개월 6.6% 내려 원화 강세가 이어진 점은 외국인 수급에 우호적인 요인입니다."
  ]
 },
 "nextCheck": "10/29 장 마감 후 아마존 실적과 알파벳 급락 여파로 나스닥이 일봉 지지 26,232를 지키는지, 코스피가 저항 6,148을 넘어서는지 확인합니다.",
 "sources": [
  "https://www.cnn.com/2026/10/28/business/live-news/federal-reserve-interest-rate-october",
  "https://cnbc.com/2026/10/28/fed-meeting-today-live-updates.html",
  "https://rockandturner.substack.com/p/wed-oct-28-2026-the-market-today",
  "https://www.cnbc.com/2026/10/28/stock-market-today-live-updates.html"
 ],
 "policyNews": {
  "asOf": "2026-10-29",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 기준금리를 동결했고 위원 2명이 금리 인상을 주장하며 반대했습니다. 워시 의장은 기자회견에서 물가 안정이 우선이라고 강조하고 고용 상황을 '상당히 긍정적'이라고 평가했으며, 12월 인상 여부에는 분명한 신호를 주지 않았습니다.",
   "sources": [
    "https://www.cnn.com/2026/10/28/business/live-news/federal-reserve-interest-rate-october",
    "https://cnbc.com/2026/10/28/fed-meeting-today-live-updates.html",
    "https://rockandturner.substack.com/p/wed-oct-28-2026-the-market-today",
    "https://www.bloomberg.com/news/articles/2026-10-27/stock-market-today-dow-s-p-live-updates"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결해 7·8월 연속 인상 뒤 처음 쉬어 갔습니다. 신현송 총재는 성장·물가가 예상을 웃돌 위험이 커졌다면서도 3분기 GDP와 10월 물가를 더 보고 판단하겠다고 했고, 아주경제는 정책 방향이 뚜렷하게 매파적이라고 해석했습니다.",
   "sources": [
    "https://www.newspim.com/news/view/20261022000766",
    "https://www.ajunews.com/view/20261022150447471"
   ]
  }
 }
};
