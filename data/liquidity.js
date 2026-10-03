// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-03",
 "headline": "미국은 9월 고용 +2.9만명 쇼크로 10월 금리인상 확률이 17%까지 낮아졌지만 10년물이 5.25%대로 되올라 단기 '부정'·중기 '신중'을 유지하고, 한국은 코스피 7,000선 회복·원/달러 1,350.6원 하락에도 외국인 순매도(1,438억원)가 이어져 '신중'을 유지한다.",
 "headlineUS": "9월 비농업 고용 +2.9만명(예상 +8.4만명)·실업률 4.2%·임금 상승률 3.0%로 고용이 식으면서 CME 기준 10월 인상 확률이 17%로 떨어졌다. 그러나 10년물이 5.252%, 30년물이 5.629%로 장 후반 되올라 장기금리 부담이 남아 단기 '부정'·중기 '신중'을 유지하고, 10년물이 5.2%를 확실히 밑돌면 단기 상향을 검토한다.",
 "headlineKR": "10/2 코스피가 기관 매수로 7,003.74(+0.46%) 7,000선을 되찾고 원/달러는 1,350.6원(-7.8원)으로 내려왔지만, 외국인은 1,438억원 순매도로 매도 우위를 이어갔다. 단기·중기 '신중'을 유지하고 외국인 순매수 전환이 확인되면 단기 '우호'를 검토한다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "9월 비농업 고용 +2.9만명(예상 +8.4만명)·실업률 4.2%(전월 4.1%), 7·8월 합계 6만명 하향 수정 — 고용 둔화가 뚜렷해졌다.",
   "평균 시간당 임금 전년비 3.0%로 2021년 5월 이후 최저 — CME FedWatch 10월 25bp 인상 확률이 17%로 하락했으나 12월 인상 가능성은 여전히 가격에 반영돼 있다.",
   "10년물은 고용지표 직후 하락했다가 반등해 5.252%(+1.8bp), 30년물 5.629%로 마감 — 2002년 이후 최고권 장기금리가 유지돼 단기 '부정'의 핵심 근거로 남는다.",
   "S&P500 +0.7%(7,722.72)·나스닥 +1.2%(27,190.86)로 인상 우려 후퇴를 반영 — 10년물이 5.2% 아래로 내려오면 단기 '신중' 상향을 검토한다."
  ]
 },
 "korea": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "10/2 코스피 7,003.74(+0.46%)로 7,000선 회복, 코스닥 893.29(-0.11%) — 9월 수출 1,209억달러(+83.5%)·반도체 603억달러 사상 최대가 업황을 받친다.",
   "수급: 기관 3,815억원 순매수가 지수를 떠받쳤으나 외국인 1,438억원·개인 1조7,207억원 순매도 — 외국인 매도 우위가 이어져 단기 상향을 보류한다.",
   "원/달러 1,350.6원으로 전일 대비 7.8원 하락 마감 — 환율 부담은 완화됐지만 미 10년물 5.25%대 고금리가 외국인 자금 복귀를 막는다.",
   "baseline(자동) 단기·중기 '신중'과 일치 — 미 고용 둔화로 연준 인상 우려가 줄어든 점은 중기 긍정 요인이나, 외국인 순매수 전환 확인 전까지 '신중' 유지."
  ]
 },
 "nextCheck": "(10/3 토요일 — 신규 마감 없음, 10/2 종가 기준 유지) 10월 FOMC(10/28) 인상 확률(현재 CME 17%), 미 10년물 5.2% 하회 여부, 코스피 외국인 순매수 전환, 원/달러 1,350원 안착 여부",
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
