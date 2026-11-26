// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-26",
 "headline": "미국은 돈의 흐름이 5년 중 하위 20%로 빠지는 중이고 한국은 예탁금·신용융자가 3개월 새 크게 줄어, 연준·한은 인상 경로와 겹쳐 두 나라 모두 단기 유동성 여건이 부정적이다.",
 "headlineUS": "흐름 점수 -0.45(5년 중 하위 20%)로 돈이 빠지는 중이고 12월 인상이 97% 반영돼 단기 여건은 부정적이다. 신용 스프레드는 보통이라 중기는 신중으로 본다.",
 "headlineKR": "투자자예탁금(-15.6%)·신용융자(-23.2%)가 3개월 새 줄었고 한은이 올해 세 번째 인상을 단행해 단기·중기 모두 부정적이다. 원화 강세 쪽 흐름만 들어오는 쪽이다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 -0.45로 최근 5년 중 하위 20% 위치이며, 금융여건지수 -0.444(3개월 +0.098)가 신용 경고 1/4를 켰다.",
   "시장 심리 13.2 극도의 공포 구간으로, 과거 이 구간 뒤 3개월 안 S&P500 10% 넘는 추가 하락이 31%(그 밖 8%)였다.",
   "연방기금금리 선물은 12/9 25bp 인상 97%, 2027년 4월 기대 4.49%로 연속 인상을 반영한다.",
   "흐름 점수 하위 3분의 1에서도 다음 12개월 평균 초과수익은 +9.9%였고 신용 스프레드 1.61%p(3개월 -1bp)·연준 순유동성 5.82조 달러(3개월 +0.6%)가 보통이라 baseline(매우 부정)보다 높은 신중으로 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 83.5조원이 3개월 새 -15.6% 줄어, 예탁금 감소 하위 구간 뒤 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "신용융자 25.4조원(3개월 -23.2%)도 같은 방향으로 빠지고 있고, 외국인 순매수는 -57.6조원이다.",
   "한은이 기준금리를 3.25%로 올렸고 점도표 21개 점 중 15개가 3.50% 이상이라 내년 긴축 지속이 반영됐다.",
   "흐름 점수 -0.19(5년 중 42% 위치)는 중간 구간이고 회사채 스프레드 0.69%p(3개월 -1bp) 보통, 원/달러 3개월 -2.9%는 들어오는 쪽이라 baseline(매우 부정)보다 한 단계 높게 본다."
  ]
 },
 "nextCheck": "12/8~9 FOMC 결과와 11/29 OPEC+ 회의, 코스피 4,587·나스닥 23,581 지지 유지 여부, 투자자예탁금·신용융자 3개월 변화.",
 "sources": [
  "https://newsway.co.kr/news/view?ud=2026112615280815068",
  "https://www.sedaily.com/article/20119477",
  "https://m.news.nate.com/view/20261126n24312",
  "https://cryptobriefing.com/polymarket-94-odds-december-fed-rate-hike/"
 ],
 "policyNews": {
  "asOf": "2026-11-26",
  "us": {
   "stance": "매파",
   "note": "10월 FOMC 의사록에서 거의 모든 위원이 추가 긴축이 적절할 수 있다고 봤고, 윌리엄스 뉴욕연은 총재는 11/23 인플레이션이 여전히 너무 높다고 말했다. 10월 근원 PCE가 3.3%로 예상을 웃돈 뒤 12월 0.25%p 인상 확률이 90%대로 반영됐다.",
   "sources": [
    "https://cryptobriefing.com/polymarket-94-odds-december-fed-rate-hike/",
    "https://www.finflashapp.com/trending/fed-rate-hike-december-2026-pce-stocks",
    "https://www.tradingandinvestmentnews.co.uk/fed-december-rate-hike-officials/",
    "https://www.weex.com/learn/articles/fed-minutes-november-2026-why-a-december-hike-is-now-91-priced-bvipixtjr816iv9dx5zl24su"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "한은 금통위는 11/26 기준금리를 3.00%에서 3.25%로 올렸고(7명 중 5명 찬성, 황건일·이수형 위원 동결 의견) 올해 세 번째 인상이다. 신현송 총재는 소비자물가가 2028년에야 목표 2%에 근접할 것으로 봤고, 점도표 21개 점 중 3.50%에 8개가 몰렸다.",
   "sources": [
    "https://newsway.co.kr/news/view?ud=2026112615280815068",
    "https://news.jkn.co.kr/post/1124497",
    "https://www.sedaily.com/article/20119477",
    "https://m.news.nate.com/view/20261126n24312"
   ]
  }
 }
};
