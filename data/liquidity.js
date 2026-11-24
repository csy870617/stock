// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-24",
 "headline": "미국은 돈의 흐름이 보통이지만 극도의 공포와 연준 인상 경로가 겹쳐 단기 부정·중기 신중, 한국은 예탁금·신용융자 감소와 외국인 순매도가 이어져 단기·중기 모두 부정이다.",
 "headlineUS": "흐름 점수 -0.15로 중간 구간이고 순유동성은 소폭 늘었다. 다만 심리 11.3 극도의 공포와 12월 인상 93% 반영으로 단기 부정·중기 신중이다.",
 "headlineKR": "투자자예탁금 3개월 -17.6%, 신용융자 -19.9%로 개인 자금이 빠지고 외국인 순매도도 이어진다. 단기·중기 모두 부정이다.",
 "us": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 -0.15로 최근 5년 중 52% 위치의 보통 국면이고, 연준 순유동성 5.82조 달러는 3개월 +0.6%로 소폭 늘었다.",
   "신용 스프레드 1.61%p(3개월 -2bp)는 안정적이지만 금융여건지수(3개월 +0.07)와 달러인덱스(3개월 +5.3%)는 빠지는 쪽이며, 신용 경고는 4개 중 1개다.",
   "시장 심리 11.3 극도의 공포 구간으로, 과거 20 미만인 달 뒤 3개월 안 S&P500이 10% 넘게 더 빠진 경우가 31%(그 밖 8%)여서 단기는 baseline 신중보다 낮은 부정으로 본다.",
   "선물은 12/9 0.25%p 인상 93%, 2027년 3월 기대 4.46%의 인상 경로를 반영한다. 흐름 점수가 중간 구간이어서 중기는 baseline 부정보다 한 단계 높은 신중으로 둔다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 83조원(3개월 -17.6%)과 신용융자 26조원(3개월 -19.9%)이 모두 빠지는 중이며, 과거 예탁금 증가 하위 3분의 1 구간의 다음 3개월 코스피 초과수익 평균은 -1.9%였다.",
   "외국인 순매수는 -64.1조원으로 빠지는 쪽이고, 코스피 20일 외국인 순매도는 14조3,413억원, 연속 순매도는 7일이다.",
   "흐름 점수 -0.25로 최근 5년 중 37% 위치이며, 원/달러 3개월 -2.8%만 들어오는 쪽이다.",
   "한국은행 기준금리 3%에 대해 시장 금리는 3개월 기대 3.21%·1년 기대 3.607%로 인상 쪽에 기울어 있다."
  ]
 },
 "nextCheck": "코스피 지지 4,587 유지 여부, 11/26 금통위 결정, 12/9 FOMC 인상 폭을 확인한다.",
 "sources": [
  "https://www.investing.com/news/economy-news/asian-stocks-rally-as-huangs-nvidia-return-revives-ai-trade-5046823",
  "https://www.marketscreener.com/news/wall-street-soars-on-huang-s-return-to-nvidia-treasury-yields-rise-ce7851dadf8ff627",
  "https://www.ppss.kr/news/articleView.html?idxno=322468",
  "https://www.m-economynews.com/news/article.html?no=73485"
 ],
 "policyNews": {
  "asOf": "2026-11-24",
  "us": {
   "stance": "매파",
   "note": "윌리엄스 뉴욕 연은 총재는 11/23 인플레이션이 여전히 너무 높아 할 일이 남았다고 했지만 12월 결정은 지표를 보겠다고 했고, 월러 이사는 물가가 계속 뜨거우면 12월 0.5%p 인상도 검토해야 한다고 했다. 선물시장은 12/9 인상을 사실상 완전히 반영했다.",
   "sources": [
    "https://broadspectrum.substack.com/p/broad-spectrum-finance-116-the-reinstatement",
    "https://www.marketscreener.com/news/wall-street-soars-on-huang-s-return-to-nvidia-treasury-yields-rise-ce7851dadf8ff627"
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
