// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-26",
 "headline": "미국·한국 모두 돈의 흐름이 빠지는 중이고, 연준·한은 인상 경로와 극도의 공포 심리가 겹쳐 단기 유동성 여건은 두 나라 모두 부정적이다.",
 "headlineUS": "흐름 점수 -0.45로 최근 5년 하위 20%이고, 12월 인상이 사실상 확정된 상태라 단기 여건은 부정적이다. 신용 스프레드는 안정적이어서 중기는 신중으로 본다.",
 "headlineKR": "예탁금·신용융자가 3개월 새 20% 넘게 줄었고 외국인 매도가 이어지는 가운데 한은이 인상에 나서, 단기·중기 모두 부정적이다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 -0.45는 최근 5년 하위 20% 위치로, 과거 하위 3분의 1 구간의 다음 12개월 초과수익 평균은 +9.9%로 상위 구간(+14.6%)보다 낮았다.",
   "금융여건지수가 3개월 새 +0.098 악화해 신용 경고가 1/4 켜졌다.",
   "시장 심리 13.2 극도의 공포 구간은 과거 3개월 안 S&P500 10% 넘는 추가 하락이 31%로, 그 밖의 구간(8%)보다 잦았다.",
   "신용 스프레드 1.61%p(3개월 -1bp)와 연준 순유동성 5.82조 달러(3개월 +0.6%)는 보통이어서, baseline 중기 '매우 부정'보다 한 단계 높은 신중으로 둔다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 82조원은 3개월 새 -20%로, 과거 예탁금 감소 하위 3분의 1 구간의 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "신용융자 25.9조원(3개월 -21.2%)과 외국인 순매수 -61.3조원 모두 자금이 빠지는 방향이다.",
   "원/달러 1,342원(3개월 -3%)은 자금 유입 쪽이고 회사채 스프레드 0.69%p는 보통이어서, baseline '매우 부정'보다 한 단계 높은 부정으로 둔다.",
   "한은이 11/26 기준금리를 3.25%로 올렸고, 1년 금리 기대에 인상 약 1.4회분이 더 반영돼 있다."
  ]
 },
 "nextCheck": "코스피 4,587·나스닥 23,581 지지 여부, 12/9 FOMC 결정, 예탁금·신용융자의 3개월 변화 방향을 확인한다.",
 "sources": [
  "https://www.segye.com/newsView/20261125513634",
  "https://news.jkn.co.kr/post/1121942",
  "https://finance.yahoo.com/markets/stocks/articles/stock-market-today-nov-25-221745503.html",
  "https://babypips.com/news/daily-financial-forex-market-recap-2026-11-25"
 ],
 "policyNews": {
  "asOf": "2026-11-26",
  "us": {
   "stance": "매파",
   "note": "윌리엄스 뉴욕연은 총재는 물가가 여전히 너무 높다며 연속 인상 가능성을 배제하지 않았다. 10월 의사록에서는 거의 모든 위원이 12월 0.25%p 인상을 예상했다. 시장은 12/9 25bp 인상 확률을 99%로 반영하고 있다.",
   "sources": [
    "https://abcnews.com/US/wireStory/fed-minutes-higher-interest-rates-needed-december-inflation-138258781",
    "https://bankingjournal.aba.com/2026/11/fomc-minutes-show-close-call-over-possible-rate-hike/",
    "https://www.cnbc.com/federal-reserve/",
    "https://247wallst.com/investing/2026/11/24/the-new-york-feds-john-williams-wont-rule-out-back-to-back-rate-hikes/"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "11월 26일 금통위를 앞두고 채권 전문가 설문 응답자 전원이 기준금리를 3.00%에서 3.25%로 올릴 것으로 봤다. 반도체 수출 호조로 3분기 성장률이 전망을 크게 웃돌았고, 다수는 내년 3.50%까지 인상을 예상한다.",
   "sources": [
    "https://www.news1.kr/economy/trend/6361408",
    "https://www.seoul.co.kr/news/economy/finance/2026/11/23/20261123031005"
   ]
  }
 }
};
