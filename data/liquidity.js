// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-10",
 "headline": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대가 겹친 신중 국면, 한국은 예탁금 감소와 외국인 대규모 순매도가 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수 -0.01(5년 중 68% 위치)로 자금은 들어오는 쪽이나, 12월 +25bp 확률 83%의 인상 경로가 부담이다. 신용 경고는 4개 중 1개만 켜졌다.",
 "headlineKR": "투자자예탁금이 3개월 새 13.3% 줄어 과거 다음 3개월 성과가 약했던 구간에 있다. 외국인 7일 연속 순매도와 한은 인상 기대가 겹친다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "연준 순유동성 5.79조 달러(3개월 -0.8%)와 신용 스프레드 1.56%p(3개월 -8bp)는 보통 수준이다.",
   "금융여건지수 -0.459(3개월 +0.079)로 빠지는 쪽이라 신용 경고 1/4가 켜졌고, 2개 이상 켜졌을 때보다는 급락 위험 구간이 낮다.",
   "연방기금금리 선물은 12/9 +25bp 83%, 2027년 4월 기대 4.31%로 인상 경로를 반영해 baseline 단기 우호보다 한 단계 낮게 본다.",
   "흐름 점수 5년 중 68% 위치는 과거 다음 12개월 성과가 중간 이상이던 구간이라 baseline 중기 부정보다 한 단계 높은 신중으로 둔다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 90.3조원(3개월 -13.3%)으로 줄어 과거 하위 3분의 1 구간(다음 3개월 평균 -1.9%)에 해당한다.",
   "신용융자 28.4조원(3개월 -2.9%)으로 보통이고, 외국인 순매수는 -59.6조원으로 빠지는 쪽이다.",
   "원/달러 3개월 -5%와 회사채 스프레드 0.69%p(3개월 -1bp)는 중립 이상이라 baseline 단기 매우 부정보다 한 단계 높은 부정으로 둔다.",
   "한국은행은 1년 기간 평균 금리 기대가 3.552%로 인상 약 2.2회분을 반영해 중기 부담이다."
  ]
 },
 "nextCheck": "미국 10월 CPI 결과와 12월 인상 확률 변화, 코스피 4,911 지지 유지 여부와 투자자예탁금 3개월 변화를 확인한다.",
 "sources": [
  "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-nov-09-202",
  "https://www.news1.kr/finance/market-exr/6347975",
  "https://www.fxstreet.com/news/federal-reserve-december-rate-hike-view-reinforced-commerzbank-202611090801"
 ],
 "policyNews": {
  "asOf": "2026-11-10",
  "us": {
   "stance": "매파",
   "note": "코메르츠방크는 10월 고용 16만5천 명 증가와 높은 인플레이션이 12월 추가 인상 전망을 뒷받침한다고 봤고, 연준 위원들은 AI 투자가 인플레이션을 높게 유지할 수 있다고 경고했다. 10월 회의 동결 때 쿡 이사·해맥 총재가 인상을 주장하며 반대했고 로건 총재는 최소 두 차례 25bp 인상이 더 필요하다고 했다.",
   "sources": [
    "https://www.fxstreet.com/news/federal-reserve-december-rate-hike-view-reinforced-commerzbank-202611090801",
    "https://www.thestreet.com/fed/fed-rate-hikes-december-2026-march-2027-if-ai-boom-fuels-inflation",
    "https://www.cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결했고, 신현송 총재는 긴축 기조를 이어가겠다고 했다. 시장은 11/26 금통위의 인상에 무게를 두며, 노무라는 11월과 내년 2월 각 0.25%p 인상을 예상했다.",
   "sources": [
    "https://www.segye.com/newsView/20261022520163",
    "https://www.fnnews.com/news/202610290728345571",
    "https://www.hankookilbo.com/news/article/A2026102913470001326"
   ]
  }
 }
};
