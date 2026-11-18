// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-18",
 "headline": "미국은 돈이 들어오는 흐름에 연준 인상 경로가 겹친 신중 국면이고, 한국은 예탁금·신용융자 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수는 최근 5년 상위권이고 신용 스프레드도 좁다. 다만 12월 인상 확률이 96%이고 극도의 공포 구간이라 단기·중기 모두 신중이다.",
 "headlineKR": "투자자예탁금과 신용융자가 3개월 새 14% 안팎 줄었고, 외국인 순매도가 이어진다. 원화 강세 외에는 받쳐 주는 흐름이 약해 단기·중기 모두 부정이다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.08은 최근 5년 중 하위부터 75% 위치다. 과거 상위 3분의 1 구간에서는 다음 12개월 S&P500 초과수익 평균이 더 높았다(중기를 baseline 부정보다 한 단계 높게 본 근거).",
   "신용 스프레드는 1.5%p로 3개월 새 19bp 좁혀졌고, 신용 경고는 4개 중 1개(금융여건 3개월 변화)만 켜져 있다.",
   "연방기금금리 선물은 12월 +25bp 96%, 2027년 4월 기대 4.55%까지 인상 경로를 반영하고 있고, 미 10년물은 5.10%다.",
   "시장 심리는 15.8로 극도의 공포다. 과거 20 미만이었던 달 뒤 3개월 안에 S&P500이 10% 넘게 더 빠진 경우가 31%였다(그 밖 8%)."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 86.9조원(3개월 -13.7%), 신용융자 26.3조원(3개월 -14.9%)으로 모두 줄었다. 과거 이 구간에서는 다음 3개월 코스피 초과수익이 낮은 쪽이었다.",
   "외국인은 코스피에서 20일 13조2,589억원, 60일 60조3,557억원을 순매도해 이탈이 이어지고 있다.",
   "원/달러가 3개월 -6% 내려 환율 쪽은 들어오는 흐름이고 회사채 스프레드는 0.69%p로 보통이다. 다만 흐름 점수는 -0.04(하위부터 53%)로 중간에 머문다.",
   "한국은행 기준금리는 3%이고, 금리 시장은 3개월 기대 3.2%로 인상 쪽에 기울어 있다."
  ]
 },
 "nextCheck": "다음 확인 대상은 엔비디아 실적에 대한 정규장 반응, 목요일 앤트로픽 IPO, 코스피 4,911·나스닥 23,989 지지 여부, 11월 26일 금통위다.",
 "sources": [
  "https://www.fxstreet.com/news/euro-slips-as-hawkish-fed-remarks-strong-retail-sales-boost-us-dollar-202611180116",
  "https://finance.yahoo.com/economy/policy/article/new-york-feds-williams-rules-out-jumbo-rate-hike-for-december-205144565.html",
  "https://www.kdfnews.com/news/articleView.html?idxno=191067",
  "https://www.ebn.co.kr/news/articleView.html?idxno=1732003"
 ],
 "policyNews": {
  "asOf": "2026-11-18",
  "us": {
   "stance": "매파",
   "note": "무살렘 세인트루이스 연은 총재는 인플레이션을 잡으려면 여러 차례 인상이 필요할 수 있다며 신속한 대응을 촉구했다. 윌리엄스 뉴욕 연은 총재는 12월 50bp 인상에 대해 '극적인 조치가 필요한 상황은 아니다'라고 했고, 월러 이사는 12월 25bp 인상을 지지했다.",
   "sources": [
    "https://finance.yahoo.com/economy/policy/article/new-york-feds-williams-rules-out-jumbo-rate-hike-for-december-205144565.html",
    "https://www.cnbc.com/2026/11/10/fed-governor-waller-sees-december-hike-likely.html"
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
