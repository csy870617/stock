// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-27",
 "headline": "미 10년물 5% 부근과 연준 12월 인상 기대가 미국 유동성을 누르고, 한국은 코스피가 하루 3% 반등했지만 20일간 외국인 대량 매도가 이어져 단기 유동성 여건이 여전히 가장 나쁜 구간에 있습니다.",
 "headlineUS": "미국은 단기 신중·중기 부정입니다. 신용·변동성은 안정적이지만 10년물 4.99%와 12월 인상을 거의 반영한 금리 선물, 100달러대 유가가 여유를 줄이고 있습니다.",
 "headlineKR": "한국은 단기 매우 부정·중기 부정입니다. 코스피가 하루 3% 반등했지만 외국인이 20일간 26조 원 넘게 순매도한 가운데, 시장은 1년 안에 한은 금리 인상을 반영하고 있습니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "drivers": [
   "미 10년물 금리가 4.99%로 5% 부근에 머물러 자동 baseline(우호)보다 한 단계 낮춰 봅니다.",
   "연방기금 선물은 10/28 동결(90%) 뒤 12/9 회의 25bp 인상 확률을 92% 반영하고 있습니다.",
   "WTI가 103.27달러로 올해 79.9% 올라 물가·금리 부담을 키우고 있습니다.",
   "VIX 18.4, 하이일드 채권 20일 0.0%로 신용·변동성 지표는 아직 안정적입니다."
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "부정",
  "drivers": [
   "코스피가 10/27 3.09% 반등했지만 20일 기준으로는 큰 폭 하락 구간에 머물러 baseline 급락 floor가 유지됩니다.",
   "외국인은 10/27 코스피에서 5,972억 원을 순매수했지만 20일간 26조 7,480억 원, 60일간 42조 8,594억 원 순매도 상태입니다.",
   "한국은행 기준금리 3%에 대해 시장은 1년 평균 3.517%로 약 2.1회 인상분을 반영하고 있습니다.",
   "원/달러는 1,321.8원으로 연저점을 다시 낮춰 원화 강세가 이어지고 있지만 외국인 매도를 되돌리지는 못하고 있습니다."
  ]
 },
 "nextCheck": "10/28 FOMC 결과와 워시 의장 기자회견, 10/29 미국 3분기 GDP·근원 PCE, 그리고 코스피가 5,586 위에서 버티는지를 확인합니다.",
 "sources": [
  "https://finance.yahoo.com/markets/stocks/articles/stock-market-today-oct-26-134626728.html",
  "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-oct-26-2026",
  "https://www.fool.com/coverage/stock-market-today/2026/10/26/stock-market-today-oct-26-ai-optimism-lifts-nasdaq-as-tech-stocks-rebound/",
  "https://www.businesskorea.co.kr/news/articleView.html?idxno=279680"
 ],
 "policyNews": {
  "asOf": "2026-10-26",
  "us": {
   "stance": "매파",
   "note": "연준은 9월 인상으로 기준금리를 3.75~4.00%로 올렸고, 10/27~28 FOMC(결정 10/28)에서는 동결이 널리 예상되지만 CNBC는 연내 추가 인상 가능성을 전했습니다. Kiplinger는 시장의 관심이 워시 의장의 기자회견에 쏠려 있다고 전했고, 연방기금 선물은 12/9 회의 인상 확률을 92% 반영하고 있습니다.",
   "sources": [
    "https://finance.yahoo.com/markets/stocks/articles/stock-market-today-oct-26-134626728.html",
    "https://www.cnbc.com/2026/10/26/fed-decision-expectations-october-meeting.html",
    "https://www.raisin.com/en-us/news/pre-fomc-preview-positioning-cash-october-2026/",
    "https://www.kiplinger.com/investing/live/fed-meeting-updates-and-commentary-october-2026"
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
