// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-27",
 "headline": "미국은 10년물 5% 부근과 연준 12월 인상 기대가 단기 유동성을 누르고, 한국은 하루 반등에도 20일간 외국인 대량 매도가 남아 단기 여건이 가장 나쁜 구간에 머뭅니다.",
 "headlineUS": "미국 유동성은 신용·일드커브 지표가 버티지만 FOMC를 앞두고 12월 인상 확률이 90% 반영돼 단기 신중, 금리 경로가 계속 높아지는 중기는 부정입니다.",
 "headlineKR": "한국은 코스피 20일 하락 폭이 커 단기 매우 부정이 이어지고, 외국인 순매도 누적과 한국은행 인상 기대가 중기 여건도 부정으로 묶어 둡니다.",
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
  "shortTerm": "매우 부정",
  "midTerm": "부정",
  "drivers": [
   "코스피가 20일간 약 20% 떨어져 급락 floor가 발동된 상태로, 10/27 하루 3.09% 반등이 이를 되돌리지는 못했습니다.",
   "외국인은 20일간 26조7,840억원, 60일간 42조8,954억원을 순매도해 하루 5,612억원 순매수 전환의 무게가 아직 작습니다.",
   "시장금리는 한국은행이 1년 동안 약 2.1회분 인상할 것을 반영(기대 3.52%)하고 있어 중기 금리 부담이 남아 있습니다.",
   "원/달러 환율이 1,321.76원으로 52주 최저 구간에 내려와 환율 측면의 외국인 자금 부담은 줄었습니다."
  ]
 },
 "nextCheck": "10/28 FOMC 결정과 워시 의장 기자회견의 12월 인상 신호, 그리고 이번 주 삼성전자·SK하이닉스 실적 뒤 코스피가 5,586 위를 지키는지 확인합니다.",
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
