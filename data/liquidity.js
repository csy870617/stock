// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-05",
 "headline": "미국은 돈이 소폭 들어오지만 연준 추가 인상 기대가 누르는 신중 국면, 한국은 예탁금 급감과 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 중간대(68% 위치)이고 실질 M2가 늘고 있다. 다만 금융여건지수가 3개월 새 나빠져 신용 경고 1개가 켜졌고, 12월 인상 확률이 82%다.",
 "headlineKR": "투자자예탁금이 3개월 새 13.5% 줄었고 외국인 순매수가 -55.3조원으로 빠지는 흐름이다. 원화 강세와 안정된 회사채 스프레드가 일부를 상쇄한다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0으로 최근 5년 중 하위부터 68% 위치이고, 실질 M2가 2% 늘어 돈이 들어오는 쪽이다.",
   "금융여건지수가 -0.459로 3개월 새 +0.079 나빠져 신용 경고 4개 중 1개가 켜졌다 — baseline 단기 우호보다 한 단계 낮게 보는 근거다.",
   "연준 순유동성 5.75조 달러(3개월 -1.4%), 신용 스프레드 1.54%p(3개월 -10bp)로 둘 다 보통 수준이다.",
   "연방기금금리 선물은 12/09 인상 확률 82%, 2027년 4월 기대 금리 4.33%로 추가 인상 경로를 반영한다 — 흐름 점수가 중간대여서 baseline 중기 부정까지는 낮추지 않았다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 89.2조원으로 3개월 새 13.5% 줄어 빠지는 흐름이다 — 과거 예탁금 감소 하위 3분의 1 구간은 다음 3개월 코스피 초과수익이 평균 -1.9%였다.",
   "외국인 순매수 -55.3조원으로 빠지는 흐름이고, 코스피에서 최근 20일 22조119억원을 순매도했다.",
   "신용융자 28.6조원(3개월 +0.8%)·회사채 스프레드 0.69%p(3개월 -1bp)가 보통이고 원/달러가 3개월 -5.8%로 들어오는 쪽이라, baseline 단기 매우 부정보다 한 단계 높게 본다.",
   "흐름 점수 -0.15(최근 5년 중 43% 위치)에 한은 1년 기대 금리가 인상 약 2회분 높아 중기도 부정이다."
  ]
 },
 "nextCheck": "코스피 5,306·코스닥 673 지지 유지 여부, 예탁금·외국인 수급 변화, 11/26 금통위와 12/09 FOMC 결과를 확인한다.",
 "sources": [
  "https://finance.yahoo.com/markets/stocks/articles/stock-market-today-dow-futures-135650348.html",
  "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-nov-04-2026",
  "https://www.fool.com/coverage/stock-market-today/2026/11/04/stock-market-today-nov-4-dow-surges-3-in-biggest-post-midterm-rally-in-44-years/"
 ],
 "policyNews": {
  "asOf": "2026-11-05",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 FOMC에서 금리를 3.75~4.00%로 동결했고 쿡 이사와 해맥 총재가 인상을 주장하며 반대했다. 10/30 로건 총재는 최소 두 차례 더 25bp 인상이 필요하다고, 무살렘 총재는 곧 추가 인상이 필요하다고 말했고, 선거 뒤 CME 기준 12월 인상 확률은 76.9%로 올랐다.",
   "sources": [
    "https://www.cnn.com/2026/10/28/business/live-news/federal-reserve-interest-rate-october",
    "https://www.bloomberg.com/news/articles/2026-10-28/fed-holds-rates-says-more-data-will-help-next-decision",
    "https://www.cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html",
    "https://www.tokenpost.com/news/investing/48784"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.0%로 만장일치 동결했다. 신현송 총재는 성장세와 물가 오름세가 8월보다 더 강한 면이 있어 긴축 기조를 이어 가야 한다고 말했다. 언론은 11/26 금통위의 인상 가능성이 커졌다고 본다.",
   "sources": [
    "https://hankookilbo.com/news/article/A2026102913470001326",
    "https://m.news.nate.com/view/20261022n40350",
    "https://www.fnnews.com/news/202610290728345571"
   ]
  }
 }
};
