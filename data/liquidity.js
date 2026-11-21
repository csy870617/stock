// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-21",
 "headline": "미국은 돈이 들어오는 흐름이지만 극도의 공포와 연준 인상 경로가 겹쳐 단기 부정·중기 신중이다. 한국은 예탁금·신용융자 감소와 외국인 이탈로 단기·중기 모두 부정이다.",
 "headlineUS": "흐름 점수 -0.08로 돈은 들어오는 중이다. 다만 심리 8.8 극도의 공포와 12월 인상 확률 93%가 겹쳐 단기 근거가 약해졌다.",
 "headlineKR": "예탁금 3개월 -22.6%·신용융자 -18.2%로 개인 자금이 빠지고, 외국인 순매도가 이어지는 부정 국면이다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "시장 심리 8.8로 극도의 공포 구간이다 — 과거 20 미만인 달 뒤 3개월 안 S&P500이 10% 넘게 더 빠진 경우가 31%(그 밖 8%)여서 기준값 단기 신중보다 한 단계 낮췄다.",
   "흐름 점수 -0.08(최근 5년 하위부터 63%)로 돈은 들어오는 중이고, 과거 중간 3분의 1 구간의 다음 12개월 평균 초과수익은 +13.6%여서 기준값 중기 매우 부정보다 높게 봤다.",
   "연준 순유동성 5.82조 달러(3개월 +0.6%)·신용 스프레드 1.56%p(3개월 -8bp)는 보통이지만, 금융여건지수(3개월 +0.07)·달러인덱스(3개월 +5.1%)는 빠지는 쪽이고 신용 경고는 4개 중 1개다.",
   "연방기금금리 선물은 12월 +25bp 확률 93%, 내년 3월 기대 금리 4.4%로 인상 경로를 반영한다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 81.6조원(3개월 -22.6%)·신용융자 26.1조원(3개월 -18.2%)이 함께 줄었다 — 과거 하위 3분의 1 구간 뒤 3개월 코스피 초과수익은 평균 -1.9%·-0.7%였다.",
   "외국인 순매수 -62.1조원으로 이탈이 이어지고, 최근 20일 코스피 외국인 순매도는 14조7,355억원이다.",
   "원/달러 1,335원(3개월 -4%)·회사채 스프레드 0.69%p(3개월 -1bp)는 버티는 쪽이지만, 흐름 점수 -0.27(하위부터 35%)로 전체 흐름은 빠지는 중이다.",
   "기준금리 3%에 시장은 1년 기간 평균 금리를 인상 약 2.2회분 높은 3.548%로 본다."
  ]
 },
 "nextCheck": "나스닥 22,513·코스피 4,832 지지 유지 여부와 11월 26일 금통위, 12월 8~9일 FOMC 결정을 확인한다.",
 "sources": [
  "https://www.marketscreener.com/news/nasdaq-has-its-worst-week-since-2020-dow-s-p-500-in-correction-ce785ed3dc80f620",
  "https://www.cnbc.com/2026/11/20/treasury-yields-bonds-inflation.html",
  "https://admiralmarkets.com/analytics/traders-blog/fed-rate-decision-december-2026-preview"
 ],
 "policyNews": {
  "asOf": "2026-11-21",
  "us": {
   "stance": "매파",
   "note": "11/18 공개된 10월 FOMC 의사록에서 두 명의 위원이 물가 지표가 나쁘면 12월에 0.25%p보다 큰 인상을 검토해야 한다고 했다. 월러 이사는 다음 달 0.5%p 인상이 필요할 가능성이 크다고 말했고, 선물 시장은 12월 0.25%p 인상 확률을 약 92~93%로 반영한다.",
   "sources": [
    "https://www.breitbart.com/economy/2026/11/18/fed-minutes-show-officials-raised-possibility-of-bigger-december-hike/",
    "https://cryptobriefing.com/fed-officials-divided-on-december-rate-hike-amid-inflation-concerns/",
    "https://admiralmarkets.com/analytics/traders-blog/fed-rate-decision-december-2026-preview"
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
