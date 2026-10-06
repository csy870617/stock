// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-06",
 "headline": "미국은 나스닥 사상 최고(10/5)에도 10년물 5.3%대 고금리가 이어져 단기 '부정'·중기 '신중', 한국은 코스피 6,978.62(10/6, -0.36%)·원/달러 1,344원대에 외국인 수급 반전 미확인으로 '신중'을 유지한다.",
 "headlineUS": "10/5 나스닥 종합이 27,477.31(+1.05%)로 사상 최고를 갱신했으나 미 10년물은 장중 5.347%로 2002년 4월 이후 최고를 기록했다(자동 baseline 5.31%). 금리 부담이 이어져 단기 '부정'·중기 '신중'을 유지하고, 10년물이 5.2%를 확실히 밑돌면 단기 상향을 검토한다.",
 "headlineKR": "10/6 코스피는 6,978.62(-0.36%)로 7,000선 아래로 되밀렸고 코스닥은 912.23(+2.12%) 급등했다. 원/달러는 1,344원대로 안정적이나 외국인 순매수 전환은 확인하지 못해 단기·중기 '신중'을 유지한다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "나스닥 종합 27,477.31(+1.05%) 사상 최고 마감(10/5), 다우 51,267.90(+0.18%) — AI 대형주가 지수를 견인했다.",
   "미 10년물 장중 5.347%로 2002년 4월 이후 최고 — 자동 baseline도 10Y 5.31%·HY 신용 20일 악화·달러 추세로 단기 '부정'을 가리킨다.",
   "일드커브 +1.29%p·VIX 15.5로 위험 선호는 유지돼 중기는 '신중'(baseline 중기 점수 -0.12)이다.",
   "10월 FOMC(10/28) 인상 확률은 10/2 기준 17%(고용 쇼크 후) — 10/5 신규 수치는 확인하지 못해 직전 값을 유지했다."
  ]
 },
 "korea": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "10/6 코스피 6,978.62(-0.36%)로 7,000선 아래 복귀, 코스닥 912.23(+2.12%) 급등 — 월봉 장기 신호는 코스피 적극매수·코스닥 매수로 유지.",
   "외국인·기관 수급은 이번 회차에 검증된 수치를 확인하지 못해(10/2 기준 외국인 1,438억원 순매도) 단기 상향을 보류한다.",
   "원/달러 baseline 1,344원, 코스피 모멘텀(20d)은 우호(+2)이나 글로벌 신용·달러 추세가 부담 — baseline 단기·중기 '신중'과 일치.",
   "미 10년물 5.3%대 고금리가 외국인 자금 복귀를 막는 구도 — 외국인 순매수 전환 확인 시 단기 '우호' 검토."
  ]
 },
 "nextCheck": "10월 FOMC(10/28) 인상 확률, 미 10년물 5.2% 하회 여부, 코스피 외국인 순매수 전환 및 7,000선 재탈환, 원/달러 1,350원 안착 여부",
 "sources": [
  "https://www.mt.co.kr/economy/2026/10/01/2026100109004992929",
  "https://www.newspim.com/news/view/20261001000310",
  "https://www.etoday.co.kr/news/view/2631459",
  "https://www.fnnews.com/news/202610011036530980",
  "https://www.investing.com/news/economy-news/feds-kashkari-says-central-bank-must-lower-inflation-pressures-4926070",
  "https://www.cnbc.com/2026/10/01/us-treasury-bond-yield.html",
  "https://www.cnbc.com/2026/10/01/the-september-jobs-report-will-be-released-friday-heres-what-to-expect.html",
  "https://finance.yahoo.com/news/feds-williams-sees-no-urgency-180056354.html",
  "https://www.fnnews.com/news/202610011619453708",
  "https://view.asiae.co.kr/article/2026100115341651023",
  "https://www.cnbc.com/2026/10/02/jobs-report-september-2026.html",
  "https://www.cnbc.com/2026/10/02/treasury-yields-bonds-nonfarm-payrolls.html",
  "https://www.cnbc.com/2026/10/02/fed-rate-hike-odds-decline-after-september-jobs-report.html",
  "https://www.newspim.com/news/view/20261002001046",
  "https://www.mt.co.kr/stock/2026/10/02/2026100216085371801"
 ]
};
