// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-11",
 "headline": "미국은 돈의 흐름이 중간 수준을 유지하나 물가 상회와 12월 인상 기대가 겹친 신중 국면, 한국은 하루 급반등에도 예탁금·신용융자 감소가 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수 0(최근 5년 하위부터 68%)으로 돈은 소폭 들어오지만, 10월 CPI 상회 뒤 10년물 5%대 복귀와 12월 인상 기대가 부담이다.",
 "headlineKR": "투자자예탁금 3개월 -12.4%, 신용융자 -6.5%로 개인 자금이 빠지는 가운데 11월 26일 금통위 인상 전망까지 겹쳐 있다. 원화 강세와 외국인 순매수 전환은 완충 요인이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0(최근 5년 하위부터 68%)으로 '들어오는 중'이나 연준 순유동성 5.79조 달러는 3개월 -0.8%로 보통이다.",
   "신용 스프레드 1.51%p(3개월 -11bp)는 안정적이지만 금융여건지수 3개월 +0.079 악화로 신용 경고 1/4가 켜져 있다.",
   "달러인덱스는 3개월 +2.4%로 빠지는 쪽이고, 선물시장은 12월 +25bp 87%, 1월 기대 4.32%로 연속 인상을 반영해 baseline 단기 우호(금리 추세·장단기 금리차 0.87%p)를 상쇄한다.",
   "실질 통화량(M2) 2% 유입과 중간 이상 흐름 점수는 baseline 중기 부정보다 한 단계 나은 신중의 근거다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 88.3조원(3개월 -12.4%)과 신용융자 28.1조원(3개월 -6.5%)이 함께 줄어 개인 자금이 빠지는 쪽이다.",
   "외국인은 누적 -55.8조원 순매도 흐름 속에 11/10 8거래일 만에 +4,439억원 순매수로 돌아섰다.",
   "원/달러 1,338원(3개월 -5.2%)은 들어오는 쪽, 회사채 스프레드 0.69%p(3개월 -1bp)는 보통이라 baseline 단기 매우 부정(코스피 20일 -21% 급락 floor)보다 한 단계 덜한 부정으로 본다.",
   "한은은 11월 26일 3.25% 인상이 예상되고 1년 시장 기대 금리 3.552%로 인상 약 2.2회분이 반영돼 중기 부담이다."
  ]
 },
 "nextCheck": "코스피 5,277 저항·4,911 지지, 나스닥 24,990 지지, 미 10년물 5% 유지 여부와 11월 26일 금통위 결정을 확인한다.",
 "sources": [
  "https://www.housingwire.com/articles/october-cpi-fed-hike/",
  "https://think.ing.com/articles/us-cpi-october-2026",
  "https://www.cnbc.com/2026/11/10/us-bonds-treasurys-yields.html",
  "https://www.joongangenews.com/news/articleView.html?idxno=562702"
 ],
 "policyNews": {
  "asOf": "2026-11-11",
  "us": {
   "stance": "매파",
   "note": "월러 이사는 인플레이션이 예상보다 높으면 12월 회의에서 50bp 인상을 검토해야 한다고 했고, 로건 총재도 추가 인상을 시사했다. 10월 CPI 상회 뒤 시장은 12월 25bp 인상을 완전히 반영했다.",
   "sources": [
    "https://think.ing.com/articles/us-cpi-october-2026",
    "https://www.thestreet.com/fed/fed-waller-jumbo-interest-rate-hike-december-inflation",
    "https://www.cnbc.com/2026/11/10/us-bonds-treasurys-yields.html",
    "https://www.investing.com/news/economic-indicators/hot-october-inflation-report-rattles-markets-5015775"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결했고, 신현송 총재는 성장·물가 상방 위험을 들며 11월 인상을 예고했다. 11월 26일 금통위에서 3.25%로 인상이 예상된다는 보도가 있다.",
   "sources": [
    "https://www.khan.co.kr/article/202610222159005",
    "https://www.ajunews.com/view/20261022150447471"
   ]
  }
 }
};
