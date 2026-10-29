// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-29",
 "headline": "연준의 매파적 동결과 12월 인상 기대, 한국은행의 인상 기대와 외국인 누적 매도가 겹쳐 미국은 단기 신중·중기 부정, 한국은 단기·중기 모두 부정으로 봅니다.",
 "headlineUS": "미 10년물 5.05%와 12월 인상 확률 82%가 단기 유동성을 누르고 있어 자동 baseline(단기 우호)보다 한 단계 낮은 신중으로 봅니다. 중기는 2027년 4월까지 기대 금리가 4.42%로 오르는 경로라 부정을 유지합니다.",
 "headlineKR": "코스피 20일 -14% 급락과 외국인 60일 누적 순매도로 단기는 부정입니다. 중기는 1년 인상 약 2.1회분이 반영된 금리 기대 때문에 자동 baseline(우호)과 달리 부정으로 봅니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "drivers": [
   "연방기금금리 선물이 12/9 회의 인상 확률을 82%로 반영하고 있어 일드커브(1.05%p)·신용 지표가 주는 우호 신호를 상쇄한다고 봐 단기를 baseline(우호)보다 낮춥니다.",
   "미 10년물이 5.05%로 높고 9월 CPI가 전년비 +3.7%, PPI가 +6.3%여서 긴축 압력이 남아 있습니다.",
   "FOMC에서 쿡 이사와 해맥 총재가 0.25%p 인상을 주장하며 10대 2로 동결됐고, 성명서의 경제활동 평가가 '강한 속도'로 상향됐습니다.",
   "선물 기준 기대 금리가 현재 3.89%에서 2027-04-28 4.42%로 오르는 경로라 중기는 부정입니다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "코스피가 20일 -14% 급락해 baseline의 급락 floor가 발동했고, 코스닥은 일봉 강한 하락세로 내려앉았습니다.",
   "외국인은 코스피에서 최근 3일 연속 순매수했지만 60일 누적 41조5,381억원, 20일 누적 19조870억원 순매도라 수급 회복을 확인하기 어렵습니다.",
   "시장 금리가 1년 평균 3.516%로 인상 약 2.1회분을 반영하고 노무라·BNP파리바가 11월 인상을 예상해, 중기를 baseline(우호)과 달리 부정으로 봅니다.",
   "WTI가 1개월 +15% 오른 102.78달러여서 물가 부담이 금리 인상 기대를 키우는 요인입니다."
  ]
 },
 "nextCheck": "코스피 5,722 지지와 6,102 저항, 11/3 미국 중간선거 뒤 유가 흐름, 그리고 12/9 FOMC 인상 확률 변화를 확인합니다.",
 "sources": [
  "https://admiralmarkets.com/analytics/traders-blog/fed-rate-decision-october-28-2026-hawkish-hold",
  "https://www.roic.ai/news/fed-holds-rates-steady-in-10-2-vote-as-inflation-risks-linger-10-28-2026",
  "https://finance.yahoo.com/economy/policy/live/fed-meeting-live-updates-interest-rates-held-steady-in-split-vote-warsh-says-politics-played-no-role-ahead-of-midterm-elections-191946928.html",
  "https://www.fnnews.com/news/202610290728345571"
 ],
 "policyNews": {
  "asOf": "2026-10-29",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 기준금리를 3.75~4.00%로 10대 2 동결했고, 리사 쿡 이사와 베스 해맥 클리블랜드 연은 총재가 0.25%p 인상을 주장하며 반대했습니다. 성명서는 경제활동 평가를 '강한 속도'로 올렸고, 워시 의장은 중간선거를 앞둔 정치가 결정에 아무 역할도 하지 않았다고 말했습니다.",
   "sources": [
    "https://finance.yahoo.com/markets/live/stock-market-today-wednesday-october-28-dow-sp-500-nasdaq-fed-meeting-decision-big-tech-earnings-130508769.html",
    "https://finance.yahoo.com/economy/policy/live/fed-meeting-live-updates-interest-rates-held-steady-in-split-vote-warsh-says-politics-played-no-role-ahead-of-midterm-elections-191946928.html",
    "https://admiralmarkets.com/analytics/traders-blog/fed-rate-decision-october-28-2026-hawkish-hold",
    "https://www.roic.ai/news/fed-holds-rates-steady-in-10-2-vote-as-inflation-risks-linger-10-28-2026"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결했고, 신현송 총재는 성장·물가가 8월보다 강한 측면이 있어 긴축 기조를 이어갈 필요가 있다고 말했습니다. 한은은 10/29 시장상황점검회의에서 미국 정책 불확실성에 '각별한 경계감'으로 시장을 점검하겠다고 밝혔습니다.",
   "sources": [
    "https://www.segye.com/newsView/20261022520163",
    "https://www.fnnews.com/news/202610290728345571"
   ]
  }
 }
};
