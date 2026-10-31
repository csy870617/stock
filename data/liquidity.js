// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-30",
 "headline": "미국은 돈의 흐름 점수가 최근 5년 상위권이지만 연준 인상 기대가 이를 누르는 신중 국면이고, 한국은 예탁금·신용융자 감소와 외국인 이탈이 겹친 부정 국면입니다.",
 "headlineUS": "흐름 점수 0.06(최근 5년 중 73% 위치)과 좁은 신용 스프레드로 돈은 들어오는 쪽입니다. 다만 12월·1월 연속 인상을 반영한 금리 선물과 4.9%대 10년물이 단기 여건을 누릅니다.",
 "headlineKR": "투자자예탁금이 3개월 새 15.2%, 신용융자가 9.5% 줄어 다음 3개월 여건을 가늠하는 검증 지표가 모두 약한 쪽입니다. 한은 추가 인상 기대도 부담입니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.06은 최근 5년 중 하위부터 73% 위치로, 과거 상위 3분의 1 구간의 다음 12개월 S&P500 초과수익 평균은 +14.6%였습니다(시장 여건 baseline 중기 '부정'보다 한 단계 높게 본 근거).",
   "신용 스프레드는 1.49%p로 3개월 새 15bp 좁혀졌고 실질 M2도 2% 늘어 들어오는 흐름이며, 신용 경고는 4개 중 1개로 급락 확률이 높아지는 2개 이상 구간에는 들지 않았습니다.",
   "연준 순유동성은 5.75조 달러로 3개월 새 1.4% 줄었고, 금융여건지수도 3개월 새 0.051 올라 덜 우호적인 쪽으로 움직였습니다.",
   "연방기금금리 선물은 12/9 25bp 인상 확률 73%, 1/27까지 누적 기대 4.14%를 반영하고 있어 단기 여건을 누릅니다(baseline 단기 '우호'보다 낮게 본 근거)."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금은 88.7조원으로 3개월 새 15.2% 줄었고, 과거 예탁금 감소 하위 3분의 1 구간의 다음 3개월 코스피 초과수익 평균은 -1.9%였습니다.",
   "신용융자도 29.1조원으로 3개월 새 9.5% 줄어 개인 레버리지 자금이 빠지는 흐름입니다.",
   "외국인 순매수는 -43.1조원으로 빠지는 흐름이고, 코스피에서 최근 20일 외국인 순매도는 18조6,373억 원에 달합니다.",
   "흐름 점수는 -0.16(최근 5년 중 45%)으로 중간이지만, 시장은 한은 기준금리가 1년 평균 3.5%까지 약 2회 인상되는 경로를 반영하고 있고 연준 순유동성도 줄고 있습니다."
  ]
 },
 "nextCheck": "나스닥이 지지선 25,177, 코스피가 5,306 위를 지키는지와 함께 11/3 미국 중간선거, 11월 금통위 수정 경제전망, 12/9 FOMC 인상 확률 변화를 확인합니다.",
 "sources": [
  "https://www.home.saxo/en-mena/content/articles/macro/market-quick-take---now-amazon-and-intel-spook-us-tech---30-october-2026-30102026",
  "https://www.bloomberg.com/news/articles/2026-10-30/treasuries-extend-rally-with-global-peers-on-tech-stock-selloff",
  "https://www.cnbc.com/2026/10/28/fed-meeting-today-live-updates.html",
  "https://www.ajunews.com/view/20261022150447471"
 ],
 "policyNews": {
  "asOf": "2026-10-30",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 기준금리를 3.75~4.00%로 10대 2 동결했고, 쿡 이사와 해맥 클리블랜드 연은 총재는 0.25%p 인상을 주장하며 반대했습니다. 성명은 '인플레이션은 여전히 높다'고 밝혔고, 시장은 12월 인상 가능성을 열어둔 동결로 해석했습니다.",
   "sources": [
    "https://money.usnews.com/investing/news/articles/2026-10-28/fomc-holds-rates-steady-markets-mostly-follow-suit",
    "https://www.cnbc.com/2026/10/28/fed-meeting-today-live-updates.html",
    "https://finance.yahoo.com/economy/policy/live/fed-meeting-live-updates-interest-rates-held-steady-in-split-vote-warsh-says-politics-played-no-role-ahead-of-midterm-elections-191946928.html",
    "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결했습니다. 7·8월 연속 인상 뒤 첫 동결이며, 신현송 총재는 물가가 목표로 안정적으로 수렴한다는 확신이 들 때까지 긴축 기조를 유지해야 한다고 말했습니다.",
   "sources": [
    "https://www.ajunews.com/view/20261022150447471",
    "https://m.news.nate.com/view/20261022n25087"
   ]
  }
 }
};
