// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-18",
 "headline": "미국은 돈이 들어오는 흐름에 연준 인상 경로와 극도의 공포가 겹친 신중 국면이고, 한국은 예탁금·신용융자 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 70% 위치로 돈이 들어오는 쪽이지만, 12월 인상이 96% 반영되고 금융여건지수가 3개월 새 나빠져 단기·중기 모두 신중이다.",
 "headlineKR": "투자자예탁금 3개월 -17.3%, 신용융자 -15.3%로 국내 자금이 빠지고 외국인 순매도가 이어져 단기·중기 모두 부정이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.03(최근 5년 하위부터 70%)로 들어오는 중이고, 신용 스프레드 1.5%p는 3개월 새 19bp 좁아졌다.",
   "금융여건지수 -0.462는 3개월 새 0.082 나빠져 신용 경고 1/4가 켜졌고, 달러인덱스는 3개월 +4.9%다.",
   "연방기금 선물은 12월 +25bp 96%, 2027년 4월 기대 4.55%로 인상 경로를 반영하고, 10년물은 5.10%다.",
   "중기를 baseline(부정)보다 높게 둔 근거는 흐름 점수 70% 위치로, 과거 중간~상위 3분의 1 구간의 다음 12개월 초과수익 평균이 +13.6~14.6%였다는 점이다(미국 심리 15.8 극도의 공포 구간 뒤 3개월 안 10% 넘는 추가 하락은 31%였다)."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 86.6조원(3개월 -17.3%), 신용융자 26.3조원(3개월 -15.3%)으로 줄어, 과거 예탁금 감소 하위 3분의 1 구간 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "외국인 순매수는 -64.1조원이고 코스피 20일 외국인 순매도는 142,402억원이다.",
   "원/달러 1,333원(3개월 -5.7%)과 회사채 스프레드 0.69%p는 우호~보통이지만 흐름 점수 -0.12(하위부터 45%)를 끌어올리지 못했다.",
   "기준금리 3%에서 금리 시장은 3개월 기대 3.2%로 인상 쪽에 기울어 있다."
  ]
 },
 "nextCheck": "엔비디아 실적 뒤 나스닥 지지 23,989·코스피 지지 4,911 유지 여부, 투자자예탁금 증감, 12월 8~9일 FOMC 인상 폭.",
 "sources": [
  "https://theweekendspread.substack.com/p/the-close-tuesday-november-17-2026",
  "https://finance.yahoo.com/markets/live/stock-market-today-tuesday-november-17-dow-sp-500-nasdaq-nvidia-earnings-retail-sales-143848454.html",
  "https://www.fnnews.com/news/202611181541225731",
  "https://www.newspim.com/news/view/20261118001065"
 ],
 "policyNews": {
  "asOf": "2026-11-18",
  "us": {
   "stance": "매파",
   "note": "무살렘 세인트루이스 연은 총재는 곧 금리를 올리고 봄 전에 여러 차례 더 올려야 한다고 했고, 윌리엄스 뉴욕 연은 총재는 추가 인상 필요성은 인정하면서 12월 50bp 인상론에는 선을 그었다. 연방기금 선물의 12월 인상 확률은 90%를 넘는다.",
   "sources": [
    "https://finance.yahoo.com/economy/policy/article/st-louis-feds-musalem-calls-for-interest-rate-hikes-soon-132554806.html",
    "https://www.bloomberg.com/news/articles/2026-11-17/fed-s-williams-says-no-need-for-dramatic-rate-move",
    "https://www.investing.com/news/economy-news/feds-williams-says-more-rate-hikes-likely-needed-amid-inflation-5033876",
    "https://www.bloomberg.com/news/articles/2026-11-17/fed-s-musalem-says-several-rate-hikes-likely-needed-by-spring"
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
