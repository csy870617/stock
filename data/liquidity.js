// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-20",
 "headline": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신중 국면이고, 한국은 예탁금·신용융자 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 하위부터 67% 위치이고 신용 스프레드도 안정적이다. 다만 12월·1월 인상이 거의 확실시되는 금리 경로와 극도의 공포(12.4)가 겹쳐 신중 국면이다.",
 "headlineKR": "투자자예탁금이 3개월 새 21%, 신용융자가 16.1% 줄었고 외국인 순매도가 이어져 돈이 빠지는 부정 국면이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "연준 순유동성은 5.82조 달러로 3개월 +0.6%, 신용 스프레드는 1.52%p로 3개월 -12bp 좁아져 돈은 들어오는 쪽이다. 이 점에서 baseline의 부정보다 한 단계 높게 본다.",
   "흐름 점수 -0.03은 최근 5년 중 하위부터 67% 위치로, 과거 중간 3분의 1 구간의 다음 12개월 평균 초과수익은 +13.6%였다.",
   "신용 경고는 1/4(금융여건지수 3개월 +0.07)이다. 다만 심리 12.4의 극도의 공포 구간 뒤에는 과거 3개월 안 S&P500 추가 10% 하락이 31%로, 그 밖 구간의 8%보다 잦았다.",
   "연방기금금리 선물은 12/9 +25bp 확률 96%, 2027년 3월 기대 금리 4.46%를 반영해 인상 경로가 뚜렷하고, 미 10년물은 5.05%다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금은 84.2조원으로 3개월 -21%다. 과거 예탁금 감소 하위 3분의 1 구간의 다음 3개월 코스피 평균 초과수익은 -1.9%였다.",
   "신용융자는 26.3조원으로 3개월 -16.1% 줄어 개인 레버리지 자금이 빠지고 있다.",
   "외국인은 코스피에서 60일 62.6조원, 20일 14.6조원을 순매도했다. 흐름 점수 -0.26은 최근 5년 중 하위부터 35% 위치다.",
   "원/달러가 3개월 -3.9%로 원화 강세 쪽인 점은 들어오는 요인이다. 반면 한국은행 금리 기대는 인상 쪽(3개월 기대 3.19%)으로 기울어 있다."
  ]
 },
 "nextCheck": "12/9 FOMC 인상 폭과 함께 코스피 5,113·나스닥 23,871 지지 유지 여부, 투자자예탁금·신용융자의 감소 둔화 여부를 확인한다.",
 "sources": [
  "https://www.cnbc.com/2026/11/18/fed-minutes-october-2026.html",
  "https://abcnews.com/US/wireStory/fed-minutes-higher-interest-rates-needed-december-inflation-138258781",
  "https://finance.yahoo.com/markets/live/stock-market-today-thursday-november-19-dow-sp-500-nasdaq-anthropic-ipo-live-141306032.html",
  "https://www.washingtonpost.com/business/2026/11/19/wall-street-stocks-dow-nasdaq/6aaf39d0-e463-11f1-a99e-b3e3805c6b8b_story.html"
 ],
 "policyNews": {
  "asOf": "2026-11-20",
  "us": {
   "stance": "매파",
   "note": "11/18 공개된 10월 FOMC 의사록에서 거의 모든 참석자가 추가 인상이 적절하다고 봤고, 10월 동결 결정에는 쿡 이사와 해맥 총재가 인상을 주장하며 반대했다. 월러 이사는 12월 0.5%p 인상을 주장했고, 로건 총재는 최소 두 차례 0.25%p 인상을 제시했다.",
   "sources": [
    "https://www.cnbc.com/2026/11/18/fed-minutes-october-2026.html",
    "https://abcnews.com/US/wireStory/fed-minutes-higher-interest-rates-needed-december-inflation-138258781",
    "https://qz.com/fed-officials-split-aggressive-rate-hikes-december-111826",
    "https://www.forbes.com/sites/simonmoore/2026/11/13/waller-floats-prospect-of-larger-december-interest-rate-hike/"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10월 22일 기준금리를 연 3.00%로 만장일치 동결했고, 신현송 총재는 긴축적 정책 기조를 이어갈 필요가 있다고 말했다. 시장은 11월 26일 회의에서 3.25% 인상 가능성에 무게를 둔다.",
   "sources": [
    "https://www.khan.co.kr/article/202610222159005",
    "https://www.segye.com/newsView/20261022520163"
   ]
  }
 }
};
