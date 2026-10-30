// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-30",
 "headline": "연준 인상 기대와 10년물 4.99%가 미국 유동성을 누르고, 한국은 코스피 급락과 외국인 대규모 순매도에 한은 인상 기대까지 겹쳐 두 나라 모두 신중 이하 국면입니다.",
 "headlineUS": "신용·변동성은 안정적이지만 12월 인상 확률 76%와 10년물 4.99%로 정책 경로가 무거워 단기 신중, 중기 부정으로 봅니다.",
 "headlineKR": "코스피가 20일간 약 16% 빠지고 외국인이 20일간 18조원 넘게 순매도한 데다 시장이 1년 안에 인상 약 2회분을 반영해 단기·중기 모두 부정으로 봅니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "drivers": [
   "연방기금금리 선물이 12월 FOMC 인상 확률 76%, 1월까지 인상 98%를 반영해 baseline의 금리·커브 신호보다 정책 경로가 무겁습니다.",
   "미 10년물이 4.99%로 5%에 근접해 있고 금리 예측 모델은 12개월 뒤 정책금리를 4.77%로 봅니다.",
   "HY 채권 20일 +0.9%, VIX 17.2로 신용·변동성 지표는 아직 안정적인 편입니다.",
   "알파벳 실적 충격으로 나스닥이 1.38% 내리는 등 AI 투자 수익성에 대한 의구심이 커졌습니다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "코스피가 20일간 약 16% 빠져 급락 기준이 발동됐고 10/30 하루에만 3.48% 내렸습니다.",
   "외국인이 코스피에서 20일간 18조6,373억원, 60일간 50조3,940억원을 순매도했습니다.",
   "기준금리 3%에 대해 시장은 1년 평균 3.5%, 인상 약 2회분을 반영하고 있습니다.",
   "원/달러가 올해 6.8% 내린 1,340원대에 머물러 원화 강세가 완충 요인으로 남아 있습니다."
  ]
 },
 "nextCheck": "코스피 5,306·코스닥 717 지지 유지 여부와 12/9 FOMC 인상 확률(현재 76%), 미 10년물의 5% 돌파 여부를 확인합니다.",
 "sources": [
  "https://finance.yahoo.com/markets/live/stock-market-today-thursday-october-29-dow-sp-500-nasdaq-alphabet-microsoft-earnings-130305714.html",
  "https://www.cnbc.com/2026/10/28/stock-market-today-live-updates.html",
  "https://www.cnbc.com/2026/10/28/fed-interest-rate-decision-october-2026.html",
  "https://www.cnn.com/2026/10/28/business/live-news/federal-reserve-interest-rate-october"
 ],
 "policyNews": {
  "asOf": "2026-10-30",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 기준금리를 3.75~4.00%로 10대 2 동결했고, 리사 쿡 이사와 해맥 클리블랜드 연은 총재가 0.25%p 인상을 주장하며 반대했습니다. 성명은 경기 판단을 '견고한 속도'에서 '강한 속도'로 올렸고, 선물시장은 12월 추가 인상 가능성을 크게 반영하고 있습니다.",
   "sources": [
    "https://www.cnbc.com/2026/10/28/fed-interest-rate-decision-october-2026.html",
    "https://www.cnn.com/2026/10/28/business/live-news/federal-reserve-interest-rate-october",
    "https://www.kiplinger.com/investing/live/fed-meeting-updates-and-commentary-october-2026",
    "https://www.indmoney.com/blog/us-stocks/fed-rate-decision-october-inflation-stock-market-impact"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 동결했고 신현송 총재가 회의를 주재하고 기자간담회를 열었습니다. 시장 금리는 1년 평균 3.5%로 인상 약 2회분을 반영하고 있습니다.",
   "sources": [
    "https://www.newspim.com/news/view/20261022000329",
    "https://nocutnews.co.kr/news/6595292"
   ]
  }
 }
};
