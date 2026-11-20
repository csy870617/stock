// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-20",
 "headline": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신중 국면이고, 한국은 예탁금·신용융자 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 중 하위부터 67% 위치로 돈이 들어오는 쪽이지만, 12월 0.25%p 인상이 완전히 반영된 긴축 경로와 극도의 공포 심리가 겹쳐 신중으로 본다.",
 "headlineKR": "투자자예탁금과 신용융자가 3개월 새 각각 22.6%, 18.2% 줄었고 외국인 매도가 이어져 국내 증시 자금 흐름은 부정 국면이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "신용 스프레드 1.52%p로 3개월 새 12bp 좁아졌고 연준 순유동성 5.82조 달러(3개월 +0.6%)로 신용 경고는 4개 중 1개(금융여건 3개월 변화)만 켜져 baseline(부정)보다 한 단계 높게 본다.",
   "흐름 점수 -0.03은 최근 5년 중 하위부터 67% 위치로, 과거 중간 3분의 1 구간 뒤 12개월 평균 초과수익은 +13.6%였다.",
   "달러인덱스 3개월 +5%와 금융여건지수 3개월 +0.07 악화는 돈이 빠지는 쪽 신호다.",
   "시장 심리 12.4 극도의 공포 구간이며, 과거 이 구간 뒤 3개월 안 S&P500이 10% 넘게 더 빠진 경우가 31%(그 밖 8%)였다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 81.6조원으로 3개월 새 22.6% 줄어 과거 다음 3개월 코스피 초과수익이 낮았던 하위 구간 방향이다.",
   "신용융자 26.1조원으로 3개월 새 18.2% 감소했다.",
   "외국인 순매수 -62.2조원으로 이탈이 이어지고, 코스피 20일 외국인 순매도는 -147,753억원이다.",
   "흐름 점수 -0.27로 최근 5년 중 하위부터 35% 위치이며, 원/달러 3개월 -4%만 들어오는 쪽 신호다."
  ]
 },
 "nextCheck": "코스피 4,832·나스닥 23,871 지지 여부, 예탁금·외국인 순매도 추이, 11/26 금통위와 12/9 FOMC 결정.",
 "sources": [
  "https://finance.yahoo.com/markets/live/stock-market-today-thursday-november-19-dow-sp-500-nasdaq-anthropic-ipo-live-141306032.html",
  "https://strategitz.substack.com/p/global-markets-close-november-19",
  "https://theweekendspread.substack.com/p/the-close-thursday-november-19-2026",
  "https://www.fnnews.com/news/202611201412156007"
 ],
 "policyNews": {
  "asOf": "2026-11-20",
  "us": {
   "stance": "매파",
   "note": "11/18 공개된 10월 FOMC 의사록에서 거의 모든 참석자가 추가 인상이 적절할 가능성이 높다고 봤고, 2명이 12월 0.5%p 인상 가능성을 거론했다. 월러 이사는 12월 0.5%p 인상이 아마 필요하다고 말했고, 윌리엄스 뉴욕연은 총재는 극적인 조치는 필요 없다고 했다.",
   "sources": [
    "https://abcnews.com/US/wireStory/fed-minutes-higher-interest-rates-needed-december-inflation-138258781",
    "https://www.cnbc.com/2026/11/18/fed-minutes-october-2026.html",
    "https://www.cnbc.com/2026/11/18/federal-reserve-governor-christopher-waller.html",
    "https://finance.yahoo.com/economy/policy/articles/fed-minutes-higher-interest-rates-190932735.html"
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
