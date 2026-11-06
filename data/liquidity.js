// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-06",
 "headline": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대와 AI주 급락이 누르는 신중 국면, 한국은 예탁금 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 68% 위치로 돈이 들어오는 쪽이지만, 금융여건 악화 신호 1/4와 12월 인상 기대가 부담이다. 단기·중기 모두 신중이다.",
 "headlineKR": "투자자예탁금이 3개월 새 14.9% 줄고 외국인 순매도가 이어져 단기·중기 모두 부정이다. 신용 스프레드와 원화 강세는 추가 악화를 막는 쪽이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0으로 최근 5년 중 하위부터 68% 위치, 실질 통화량(M2)은 2% 늘어 돈이 들어오는 쪽이다.",
   "신용 스프레드 1.52%p로 3개월 새 10bp 좁아져, 중기 baseline(부정)보다 한 단계 높은 신중으로 본다.",
   "금융여건지수가 -0.459로 3개월 새 +0.079 빠져 신용 경고 1/4가 켜졌고, VIX는 28.2다.",
   "연방기금금리 선물은 12/09 25bp 인상 확률 66%를 반영해 금리 부담이 남아 있다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 88.5조원으로 3개월 새 14.9% 줄어, 검증상 다음 3개월 코스피가 약했던 구간에 해당한다.",
   "외국인 순매수 -57.7조원으로 빠지는 흐름이고 코스피 20일 외국인 순매도는 22조6,846억원이다.",
   "신용융자 28.8조원(3개월 -0.1%)과 회사채 스프레드 0.69%p(3개월 -1bp)가 안정적이고 원/달러가 3개월 -4.6%로 들어오는 쪽이라, 단기 baseline(매우 부정)보다 한 단계 높은 부정으로 본다.",
   "한국은행은 1년 기준 인상 약 2회분이 반영돼(기대 3.504%) 금리 쪽 부담이 크다."
  ]
 },
 "nextCheck": "나스닥 24,262·코스피 4,911 지지 여부와 미국 10월 고용보고서, 11/26 금통위 결정을 확인한다.",
 "sources": [
  "https://finance.yahoo.com/markets/live/stock-market-today-thursday-november-5-dow-sp-500-nasdaq-plunge-chip-stocks-melt-down-193726491.html",
  "https://en.sedaily.com/international/2026/11/06/nasdaq-plunges-55-percent-into-correction-on-ai-regulation",
  "https://www.cnbc.com/2026/11/05/treasury-yields-bonds-interest-rates.html"
 ],
 "policyNews": {
  "asOf": "2026-11-06",
  "us": {
   "stance": "매파",
   "note": "10월 FOMC는 금리를 동결했으나 쿡 이사와 해맥 총재가 인상을 주장하며 반대했고, 로건 총재는 0.25%p 인상이 적어도 두 번 더 필요하다고 말했다. 11/05 해맥 총재는 점진적 인상을 선호한다고, 바킨 총재는 광범위한 인플레이션이 여전히 너무 높다고 말했다.",
   "sources": [
    "https://cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html",
    "https://247wallst.com/investing/2026/10/31/two-fed-officials-just-called-for-more-rate-hikes-starting-soon",
    "https://www.cnbc.com/2026/11/05/barkin-sees-interest-rate-hikes-ahead-but-at-a-gradual-pace.html",
    "https://cryptobriefing.com/feds-hammack-supports-gradual-rate-hikes-to-manage-inflation/"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.0%로 만장일치 동결했다. 신현송 총재는 성장세와 물가 오름세가 8월보다 더 강한 면이 있어 긴축 기조를 이어 가야 한다고 말했다. 언론은 11/26 금통위의 인상 가능성이 커졌다고 본다.",
   "sources": [
    "https://hankookilbo.com/news/article/A2026102913470001326",
    "https://m.news.nate.com/view/20261022n40350",
    "https://www.fnnews.com/news/202610290728345571"
   ]
  }
 }
};
