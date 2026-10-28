// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-28",
 "headline": "미국은 10/28 FOMC 결정과 워시 의장 기자회견을 앞두고 12월 인상 기대가 단기 유동성을 누르고, 한국은 코스피가 이틀째 급반등하고 외국인이 이틀 연속 순매수로 돌아섰지만 20일 누적 매도가 커 단기 여건이 아직 부정입니다.",
 "headlineUS": "미국 유동성은 신용·일드커브 지표가 버티지만 FOMC를 앞두고 12월 인상 확률이 90% 반영돼 단기 신중, 금리 경로가 계속 높아지는 중기는 부정입니다.",
 "headlineKR": "한국은 코스피가 6.63% 급등했고 외국인이 이틀 연속 순매수했지만 20일 누적 22조원대 순매도와 한국은행 인상 기대가 남아 단기·중기 모두 부정입니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "drivers": [
   "자동 baseline은 단기 우호지만, 연방기금 선물이 12/9 회의 +25bp 인상 확률을 90% 반영하고 있어 한 단계 낮춰 봅니다.",
   "미 10년물 금리가 4.99%로 5% 부근에 머물러 있어 위험자산 할인율 부담이 큽니다.",
   "9월 물가가 3.7%로 높아진 반면 비농업 고용은 2만9천명 증가에 그쳐 연준의 긴축 기조와 경기 둔화가 겹쳐 있습니다.",
   "금리 예측 모델은 3·6·12개월 정책금리를 4.21%/4.52%/4.77%로 보고 있어 중기 금리 경로가 위쪽을 향합니다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "코스피가 10/28 6.63% 올라 6,012.44에 마감해 이틀째 급반등했지만, 지난 20일 하락 폭을 되돌리는 중이라 단기 여건은 아직 부정으로 둡니다.",
   "외국인은 10/28 7,890억원을 순매수해 이틀 연속 매수했지만 20일 누적 22조7,268억원, 60일 누적 40조8,562억원 순매도 상태입니다.",
   "시장금리는 한국은행이 1년 동안 약 2.1회분 인상할 것을 반영(기대 3.53%)하고 있어 중기 금리 부담이 남아 있습니다.",
   "원/달러 환율이 1,324.77원으로 52주 최저 구간에 머물러 환율 측면의 외국인 자금 부담은 줄었습니다."
  ]
 },
 "nextCheck": "10/28 FOMC 결정(한국시간 10/29 새벽)과 워시 의장 기자회견의 12월 인상 신호, 그리고 외국인 순매수가 이어지며 코스피가 6,000선을 지키는지 확인합니다.",
 "sources": [
  "https://www.cnbc.com/2026/10/26/fed-decision-expectations-october-meeting.html",
  "https://defirate.com/odds/fed-decision/",
  "https://www.ebc.com/forex/fed-october-2026-rate-decision",
  "https://www.news1.kr/finance/market-exr/6333691"
 ],
 "policyNews": {
  "asOf": "2026-10-27",
  "us": {
   "stance": "매파",
   "note": "연준은 9월 25bp 인상으로 기준금리를 3.75~4.00%로 올렸고, 로이터 조사에서 이코노미스트 100명 중 94명이 10/28 동결을, 100명 전원이 12월 인상을 예상했습니다. 9월 의사록에는 대부분 참석자가 연내 추가 인상이 적절할 수 있다고 본 내용이 담겼고, 이번 회의는 점도표 없이 워시 의장 발언과 반대표가 주목받고 있습니다.",
   "sources": [
    "https://www.cnbc.com/2026/10/26/fed-decision-expectations-october-meeting.html",
    "https://defirate.com/odds/fed-decision/",
    "https://www.ebc.com/forex/fed-october-2026-rate-decision",
    "https://www.itechguides.com/what-to-expect-from-wednesdays-federal-reserve-meeting-on-october-28-2026/"
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
