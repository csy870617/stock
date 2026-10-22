// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-22",
 "headline": "미국은 금리가 내려왔지만 연준의 12월 인상 기대와 신용 약화로 '신중'이고, 한국은 코스피 급락 floor와 한은의 매파 기조로 단기 '매우 부정'입니다.",
 "headlineUS": "10년물이 4.95%로 5% 아래로 내려왔지만, 연방기금 선물이 12월 인상 확률을 84%로 반영하고 HY 채권도 약해 단기·중기 모두 '신중'으로 봅니다.",
 "headlineKR": "코스피 20일 -20% 급락으로 floor가 발동해 단기는 '매우 부정'입니다. 원화 강세가 완충 역할을 하지만 1년 금리 기대가 3.54%로 높아 중기는 '신중'입니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "미 10년물이 4.95%로 내려오고 장단기 금리차가 0.93%p라 baseline은 단기 '우호'지만, 금리 수준 자체가 여전히 높아 한 단계 낮춰 봅니다.",
   "연방기금 선물은 12/9 회의 +25bp 확률 84%, 2027년 3월 기대 금리 4.3%로 추가 인상을 반영하고 있습니다.",
   "HY 채권 20일 수익률 -0.6%, VIX 19.0으로 신용·변동성 여건이 약해졌고, 유가는 5개월 만의 최고치에 올랐습니다.",
   "JP모건 트레이더들은 중간선거 이후 이란과의 군사 충돌 위험이 다시 거론된 점을 하락 요인으로 꼽았습니다."
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "신중",
  "drivers": [
   "코스피가 20일 기준 -20% 떨어져 급락 floor가 발동했고, 10/22 하루에만 -3.52% 밀렸습니다.",
   "금통위는 기준금리를 3.00%로 동결했지만, 시장의 1년 기대 금리는 3.54%로 약 2.2회 인상분을 반영하고 있습니다.",
   "원/달러가 1,324.2원으로 5거래일 연속 내린(원화 강세) 점은 완충 요인입니다.",
   "외국인·기관 동반 매도와 삼성전자·SK하이닉스 자사주 매입 종료로 수급 버팀목이 약해졌습니다."
  ]
 },
 "nextCheck": "10/27~28 FOMC 결과와 12월 인상 확률 변화, 나스닥 일봉 지지 25,918 유지 여부, 코스피 일봉 저항 5,652 회복 여부, 한국 3분기 GDP·10월 물가를 확인합니다.",
 "sources": [
  "https://finance.yahoo.com/markets/stocks/articles/nasdaq-futures-drop-over-1-093849296.html",
  "https://www.cnbc.com/2026/10/21/stock-market-today-live-updates.html",
  "https://pro.thestreet.com/stock-market-today/2026-10-22",
  "https://gvwire.com/2026/10/22/wall-street-sinks-as-nasdaq-falls-over-2-on-ai-cost-worries/"
 ],
 "policyNews": {
  "asOf": "2026-10-22",
  "us": {
   "stance": "매파",
   "note": "10/7 공개된 FOMC 의사록에는 위원들이 추가 인상을 예상하지만 시점은 정하지 않은 것으로 나옵니다. 워시 의장은 10/16 IMF 행사에서 어느 쪽 결정도 시사하지 않는다고 말했고, CNBC는 높은 물가와 느슨한 금융여건이 추가 인상의 근거가 될 수 있다고 분석했습니다.",
   "sources": [
    "https://www.cnbc.com/2026/10/07/fed-officials-see-another-hike-coming-but-no-sign-as-to-when-minutes-show.html",
    "https://www.cnbc.com/2026/10/16/kevin-warsh-fed-october-rate-hike-interest-rates-markets.html"
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
