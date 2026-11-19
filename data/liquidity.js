// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-19",
 "headline": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신중 국면, 한국은 예탁금·신용융자 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수 0.02(최근 5년 중 70% 위치)로 돈은 들어오는 중이지만, 선물이 12월 인상을 반영하고 시장 심리가 극도의 공포여서 신중 국면이다.",
 "headlineKR": "투자자예탁금(3개월 -21%)과 신용융자(3개월 -16.1%)가 함께 줄고 외국인 순매도가 이어져 돈이 빠지는 부정 국면이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.02로 최근 5년 중 70% 위치이며, 과거 이 점수는 다음 12개월 S&P500 초과수익과 같은 방향이었다.",
   "신용 스프레드는 1.53%p로 3개월 새 15bp 좁아졌고 연준 순유동성은 5.84조 달러로 3개월 +0.8%다.",
   "금융여건지수가 3개월 +0.07 악화돼 신용 경고 1/4가 켜졌고, 시장 심리 14.9의 극도의 공포 구간 뒤 3개월 안 10% 넘는 추가 하락은 과거 31%였다.",
   "연방기금금리 선물은 12월 9일 +25bp 90%, 2027년 4월까지 +75bp 76%를 반영하고 달러인덱스는 3개월 +5%다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 84.2조원으로 3개월 -21%이며, 과거 예탁금 감소 하위 3분의 1 구간의 다음 3개월 코스피 초과수익은 평균 -1.9%였다.",
   "신용융자 26.3조원으로 3개월 -16.1% 줄었다.",
   "외국인 순매수 누적 -64.5조원, 코스피 60일 외국인 순매도 62조5,768억원으로 이탈이 이어진다.",
   "원/달러 1,330원대로 3개월 -4.3% 내려 흐름 지표 중 유일하게 '들어옴' 쪽이다."
  ]
 },
 "nextCheck": "12월 8~9일 FOMC 인상 폭과 코스피 5,108 지지 여부, 예탁금·외국인 순매도 흐름을 확인한다.",
 "sources": [
  "https://www.fool.com/coverage/stock-market-today/2026/11/18/stock-market-today-nov-18-s-and-p-500-breaks-key-support-as-fed-minutes-signal-more-rate-hikes-ahead/",
  "https://qz.com/fed-officials-split-aggressive-rate-hikes-december-111826",
  "https://www.breitbart.com/economy/2026/11/18/fed-minutes-show-officials-raised-possibility-of-bigger-december-hike/"
 ],
 "policyNews": {
  "asOf": "2026-11-19",
  "us": {
   "stance": "매파",
   "note": "11/18 공개된 10월 FOMC 의사록에서 참석자 거의 전원이 몇 달 안 금리 인상이 필요하다고 봤고, 2명은 인플레이션 지표가 나쁘면 12월에 25bp보다 큰 인상을 검토해야 한다고 했다. 월러 이사는 12월 FOMC에서 50bp 인상이 필요할 것이라고 말했다.",
   "sources": [
    "https://www.fool.com/coverage/stock-market-today/2026/11/18/stock-market-today-nov-18-s-and-p-500-breaks-key-support-as-fed-minutes-signal-more-rate-hikes-ahead/",
    "https://qz.com/fed-officials-split-aggressive-rate-hikes-december-111826",
    "https://www.breitbart.com/economy/2026/11/18/fed-minutes-show-officials-raised-possibility-of-bigger-december-hike/"
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
