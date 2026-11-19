// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-19",
 "headline": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신중 국면, 한국은 예탁금·신용융자 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수가 최근 5년 중 68% 위치로 돈은 들어오는 쪽이다. 다만 12월 인상 확률 90%의 금리 경로와 극도의 공포(14.9)가 단기 부담이다.",
 "headlineKR": "투자자예탁금(3개월 -17.3%)과 신용융자(3개월 -15.3%)가 함께 줄고 외국인 순매도가 이어져 개인·해외 자금 모두 빠지는 흐름이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.01로 최근 5년 중 68% 위치이고, 이 점수는 다음 12개월 초과수익과 같은 방향이었다(상위 3분의 1 평균 +14.6%) — baseline 중기 부정보다 한 단계 높게 본 근거다.",
   "신용 스프레드 1.53%p로 3개월 새 15bp 좁아졌고 신용 경고는 4개 중 1개(금융여건 3개월 변화)만 켜져 있다.",
   "연준 순유동성 5.84조 달러(3개월 +0.8%)는 보통이고, 달러인덱스 3개월 +5%와 금융여건지수 악화가 빠지는 쪽 요인이다.",
   "연방기금 선물은 12월 +25bp 90%, 2027년 4월까지 누적 +75bp 72%를 반영해 금리 부담이 이어진다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 86.6조원으로 3개월 새 17.3% 줄었고, 예탁금 감소 하위 3분의 1 구간은 다음 3개월 코스피 초과수익 평균 -1.9%였다.",
   "신용융자 26.3조원으로 3개월 -15.3%, 같은 방향 지표다.",
   "외국인 순매수 -64조원으로 빠지는 쪽이고, 코스피 20일 외국인 순매도 14조1,731억원이다.",
   "원/달러 3개월 -4.1%는 들어오는 쪽이고 회사채 스프레드 0.69%p는 보통이다."
  ]
 },
 "nextCheck": "12월 8~9일 FOMC 인상 폭, 코스피 4,911·나스닥 23,989 지지 여부, 투자자예탁금·신용융자의 감소 둔화 여부.",
 "sources": [
  "https://www.fool.com/coverage/stock-market-today/2026/11/18/stock-market-today-nov-18-s-and-p-500-breaks-key-support-as-fed-minutes-signal-more-rate-hikes-ahead/",
  "https://pro.thestreet.com/stock-market-today/2026-11-18",
  "https://uk.finance.yahoo.com/news/fed-waller-says-fed-consider-125331533.html",
  "https://bankingjournal.aba.com/2026/11/fomc-minutes-show-close-call-over-possible-rate-hike/"
 ],
 "policyNews": {
  "asOf": "2026-11-19",
  "us": {
   "stance": "매파",
   "note": "10월 FOMC 의사록에서 거의 모든 참석자가 추가 인상에 동의했고 일부는 25bp 넘는 인상에도 열려 있었다. 월러 이사는 근원물가 전월 대비 0.3% 상승을 근거로 12월 50bp 인상 검토를 주장했고, 윌리엄스 뉴욕연은 총재는 극적인 조치가 필요한 상황은 아니라고 했다.",
   "sources": [
    "https://uk.finance.yahoo.com/news/fed-waller-says-fed-consider-125331533.html",
    "https://www.bloomberg.com/news/articles/2026-11-18/fed-s-waller-says-fed-should-consider-half-point-rate-hike",
    "https://bankingjournal.aba.com/2026/11/fomc-minutes-show-close-call-over-possible-rate-hike/",
    "https://www.cnbc.com/2026/11/18/federal-reserve-governor-christopher-waller.html"
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
