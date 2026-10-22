// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-22",
 "headline": "미국은 10/21 다우·나스닥 동반 상승과 VIX 16.7에도 10년물 5.15%라 단기·중기 '신중'을 유지하고, 한국은 10/22 코스피 -3.52% 급락으로 급락 floor가 발동해 단기 '매우 부정'·중기 '신중'이다.",
 "headlineUS": "미국은 10/21 다우 52,856.09(+0.69%)·나스닥 26,702.86(+1.05%)로 올랐고 VIX는 16.7로 내렸지만 10년물 5.15%·일드커브 +1.08%p의 baseline 대로 단기·중기 '신중'이다. 10/28 FOMC는 동결 87%·인상 13%로 선물이 반영하며, 10년물 안착이 우호 쪽 재상향의 조건이다.",
 "headlineKR": "한국은 10/22 코스피 5,533.77(-3.52%)·코스닥 764.10(-3.62%)로 급락해 20일 -20% 급락 floor가 발동했고 baseline 단기 '매우 부정'·중기 '신중'이다. 원/달러 1,324원이며 한국은행 시장 금리는 1년 평균 인상 쪽 기대를 가리킨다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "10/21 다우 52,856.09(+0.69%)·나스닥 26,702.86(+1.05%) — 동반 상승했다.",
   "자동 baseline(10/22): 10년물 5.15%·일드커브 +1.08%p(+2)·HY 신용 20일 -1.0%(−1)로 단기 '신중'(+0.08)·중기 '신중'(-0.24). 판단층도 baseline 과 같다.",
   "VIX 16.7로 직전보다 내렸다. 연방기금금리 선물은 10/28 FOMC 동결 87%·인상 13%, 12/9까지 누적 인상 약 24bp를 반영한다."
  ]
 },
 "korea": {
  "shortTerm": "매우 부정",
  "midTerm": "신중",
  "drivers": [
   "10/22 코스피 5,533.77(-3.52%)·코스닥 764.10(-3.62%) — 전날 반등분을 반납했다. 코스피 일봉 RSI 30.8.",
   "자동 baseline(10/22): 20일 -20% 급락 floor 발동·코스피 모멘텀(20d) −2·글로벌 신용 −1·원/달러 추세 +1로 단기 '매우 부정'(-0.42)·중기 '신중'(-0.20). 판단층도 baseline 과 같다.",
   "원/달러 1,324원. 한국은행 기준금리 3.00%에 시장 금리가 반영한 1년 평균 기대 기준금리는 3.54%다. 외국인 수급 전환 여부는 이번 회차에 확인하지 못했다."
  ]
 },
 "nextCheck": "코스피 일봉 지지 5,451 방어와 외국인 순매수 전환, 미 VIX 20 아래 유지와 10년물 5.1% 안착, 10/28 FOMC 결과(선물 동결 87%), 원/달러 1,350원 방어",
 "sources": [
  "https://koreatimes.co.kr/economy/20261015/black-thursday-kospi-plunges-7-amid-ai-spending-fears",
  "https://www.cnbc.com/2026/10/14/stock-market-today-live-updates.html"
 ],
 "policyNews": {
  "asOf": "2026-10-20",
  "us": {
   "stance": "매파",
   "note": "9월 FOMC 의사록과 Collins·Williams 등 위원들이 연내 추가 인상 1회가 적절하다고 시사했고, 10/27~28보다 12월 인상이 유력하다는 쪽으로 기울었다(Logan 은 2회 이상 주장, Williams 는 2027년 추가 인상 불필요).",
   "sources": [
    "https://www.kitco.com/news/off-the-wire/2026-10-13/feds-collins-sees-another-rate-hike-table-end-2026",
    "https://investinglive.com/central-banks/icymi-three-fed-officials-signal-inflation-fight-continues-williams-sees-no-2027-hike/",
    "https://tradingeconomics.com/united-states/interest-rate/news/592678"
   ]
  },
  "korea": {
   "stance": "중립",
   "note": "한국은행은 9월에 기준금리 3.00%가 추정 중립금리 범위 상단이라고 평가하고, 추가 인상은 중동 정세·국제유가와 회의 직전 지표를 보고 정하겠다며 단정하지 않았다.",
   "sources": [
    "https://www.metroseoul.co.kr/article/20260910500256"
   ]
  }
 }
};
