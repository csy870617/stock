// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-25",
 "headline": "미국·한국 모두 돈의 흐름이 빠지는 중이고, 연준·한은 인상 경로와 극도의 공포 심리가 겹쳐 단기 유동성 여건은 두 나라 모두 부정적이다.",
 "headlineUS": "미국 흐름 점수 -0.36(최근 5년 하위 27%)으로 돈이 빠지는 중이며, 12월 인상이 사실상 확정 반영돼 단기 부정·중기 신중이다. 극도의 공포(11.4) 구간에서는 과거 3개월 안 10% 넘는 추가 하락 비율이 31%였다.",
 "headlineKR": "한국은 예탁금·신용융자가 3개월 새 각각 17.2%·20.5% 줄어 단기·중기 모두 부정이다. 11/24 하루 반등은 외국인·기관 동반 순매수였지만 20일 외국인 누적은 -14조원대 순매도다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 -0.36으로 최근 5년 하위 27% 위치, 금융여건지수 -0.478(3개월 +0.07)과 달러인덱스 3개월 +5.1%가 '빠짐' 쪽이다.",
   "연방기금금리 선물은 12/9 25bp 인상 97%, 2027년 3월까지 기대 금리 4.45%로 추가 인상 경로를 반영하고 있다.",
   "연준 순유동성 5.82조 달러(3개월 +0.6%)와 신용 스프레드 1.59%p(3개월 -4bp)는 보통이고 하이일드 스프레드도 11bp 좁혀져, 중기는 baseline 부정보다 한 단계 높은 신중으로 본다.",
   "신용 경고는 4개 중 1개(금융여건 3개월 변화)만 켜져 있으나, 시장 심리 11.4의 극도의 공포 구간은 과거 3개월 안 10% 넘는 추가 하락 비율이 31%(그 밖 8%)였다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 85.3조원(3개월 -17.2%)으로 감소 폭이 커, 과거 예탁금 감소 하위 3분의 1 구간의 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "신용융자 25.9조원(3개월 -20.5%), 외국인 순매수 누적 -63.1조원으로 개인·외국인 자금 모두 빠지는 흐름이다.",
   "원/달러 1,345원(3개월 -2.7%)은 '들어옴', 회사채 스프레드 0.69%p(3개월 -1bp)는 보통이라 단기는 baseline 매우 부정보다 한 단계 높은 부정으로 본다.",
   "11/26 금통위에서 3.00%→3.25% 인상이 유력하고 1년 기대 금리 3.6%로 추가 인상 경로가 반영돼 있다."
  ]
 },
 "nextCheck": "11/25 미국 10월 PCE, 11/26 금통위 결정·K점도표, 코스피 저항 5,322·지지 4,958 유지 여부를 확인한다.",
 "sources": [
  "https://cappnotes.substack.com/p/closing-look-tuesday-november-24",
  "https://news.bizwatch.co.kr/article/market/2026/11/24/0037",
  "https://www.blockmedia.co.kr/archives/1169839",
  "https://www.fnnews.com/news/202611241533500378"
 ],
 "policyNews": {
  "asOf": "2026-11-25",
  "us": {
   "stance": "매파",
   "note": "10월 FOMC 의사록에서 거의 모든 위원이 12월 0.25%p 인상을 예상했고 2명은 0.5%p 가능성을 언급했다. 월러 이사는 12월 0.5%p 인상을, 무살렘 세인트루이스 연은 총재는 여러 차례 인상 필요를 말했고, CME FedWatch 12월 25bp 인상 확률은 96.4%다.",
   "sources": [
    "https://thelandcle.org/stories/fed-minutes-higher-interest-rates-needed-in-december-as-inflation-worries-mount/",
    "https://ca.finance.yahoo.com/news/fed-minutes-higher-interest-rates-191215222.html",
    "https://pomegra.io/news/fed-rate-hike-odds-near-90-as-waller-eyes-bigger-move",
    "https://www.cnbc.com/2026/11/20/warsh-fed-forward-guidance-rate-hikes.html"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "11월 26일 금통위를 앞두고 채권 전문가 설문 응답자 전원이 기준금리를 3.00%에서 3.25%로 올릴 것으로 봤다. 반도체 수출 호조로 3분기 성장률이 전망을 크게 웃돌았고, 다수는 내년 3.50%까지 인상을 예상한다.",
   "sources": [
    "https://www.news1.kr/economy/trend/6361408",
    "https://www.seoul.co.kr/news/economy/finance/2026/11/23/20261123031005"
   ]
  }
 }
};
