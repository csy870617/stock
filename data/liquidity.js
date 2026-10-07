// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-07",
 "headline": "미국은 나스닥 10/6 27,599.79(+0.45%)로 신고가를 이어가나 미 10년물 5.27%(baseline)의 고금리가 남아 단기 '부정'·중기 '신중', 한국은 코스피 10/7 6,803.90(-1.98%)로 밀렸고 외국인 수급 반전 미확인으로 '신중'을 유지한다.",
 "headlineUS": "10/6 나스닥 종합 27,599.79(+0.45%)·다우 51,521.28(+0.49%)로 동반 상승했으나 자동 baseline 기준 10년물 5.27%·달러 추세 약세 신호가 이어져 단기 '부정'·중기 '신중'을 유지한다. 10년물이 5.2%를 확실히 밑돌면 단기 상향을 검토한다.",
 "headlineKR": "10/7 코스피 6,803.90(-1.98%)·코스닥 898.43(-2.34%)로 동반 급락했다(원인은 이번 회차에 검증하지 못함). 원/달러 baseline은 1,338원이고 외국인 순매수 전환은 확인하지 못해 단기·중기 '신중'을 유지한다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "나스닥 종합 27,599.79(+0.45%)·다우 51,521.28(+0.49%) — 10/6 종가(indices.js), 나스닥은 직전 최고(10/5 27,477.31) 상회.",
   "자동 baseline: 10년물 5.27%·달러 추세(−2)로 단기 '부정'(단기 점수 -0.46), 일드커브 +1.23%p·VIX 15.3으로 위험 선호는 유지돼 중기 '신중'(-0.29).",
   "10월 FOMC(10/28) 인상 확률은 직전 회차(10/2 기준 17%) 이후 신규 수치를 확인하지 못해 갱신하지 않았다."
  ]
 },
 "korea": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "10/7 코스피 6,803.90(-1.98%)·코스닥 898.43(-2.34%) 동반 급락 — 월봉 장기 신호는 코스피 적극매수·코스닥 매수로 유지(일봉 코스피 매수·코스닥 매수).",
   "자동 baseline: 달러 추세(−2)·글로벌 신용(−1) 부담, 코스피 모멘텀(20d)(+1)·VIX(+1)로 단기·중기 '신중'(점수 -0.08/-0.26).",
   "외국인·기관 수급과 급락 원인은 검증된 수치를 확인하지 못해 등급 변경을 보류했다. 원/달러 baseline 1,338원.",
   "외국인 순매수 전환과 코스피 6,739 지지 유지 여부 확인 시 판단을 재검토한다."
  ]
 },
 "nextCheck": "코스피 6,739 지지 유지·외국인 순매수 전환 여부, 미 10년물 5.2% 하회 여부, 10월 FOMC(10/28) 인상 확률, 원/달러 1,350원 안착 여부",
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
