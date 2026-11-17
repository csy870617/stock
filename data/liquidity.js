// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-17",
 "headline": "미국은 돈이 들어오는 흐름이지만 12월 인상 기대와 10년물 5%대가 겹친 신중 국면, 한국은 예탁금·신용융자 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수 0.11(최근 5년 중 75% 위치)로 돈은 들어오는 쪽이지만 금융여건 악화로 신용 경고 1개가 켜졌다. 12월 인상 기대 98%와 10년물 5.12%가 단기 부담이다.",
 "headlineKR": "투자자예탁금이 3개월 새 13.2%, 신용융자가 15.8% 줄어 개인 자금이 빠지고 있다. 외국인 20일 순매도 12조3,620억원이 겹쳐 부정 국면이 이어진다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.11로 최근 5년 중 하위부터 75% 위치이고, 신용 스프레드 1.47%p로 3개월 새 22bp 좁아져 돈은 들어오는 쪽이다.",
   "연준 순유동성 5.84조 달러(3개월 +0.8%)는 보통, 실질 통화량(M2)은 2% 늘어 유동성 기반은 유지된다.",
   "금융여건지수가 3개월 +0.082 악화돼 신용 경고 1/4개가 켜졌고, 달러인덱스 3개월 +4%가 여건을 조인다.",
   "중기는 baseline(부정)보다 한 단계 높게 두는데, 흐름 점수 상위권(75% 위치)이 과거 다음 12개월 초과수익이 높은 쪽이었기 때문이며 12월 인상 기대 98%·10년물 5.12%로 신중에 그친다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 87.4조원으로 3개월 -13.2%, 신용융자 26조원으로 -15.8% 줄었고, 과거 이 방향은 다음 3개월 코스피 초과수익이 낮은 쪽이었다.",
   "외국인 순매수 누적 -57.2조원, 코스피 20일 외국인 순매도 12조3,620억원으로 외국인 자금 이탈이 이어진다.",
   "원/달러는 3개월 -5.4%로 원화 강세 쪽이고 회사채 스프레드는 0.69%p(3개월 -1bp)로 안정적이다.",
   "흐름 점수 -0.04(5년 중 53% 위치)로 보통이지만 한은 1년 인상 약 2.4회분 기대가 중기 부담으로 남는다."
  ]
 },
 "nextCheck": "11/17 엔비디아 실적과 소매판매, 11/18 연준 의사록, 그리고 코스피 4,911·나스닥 24,262 지지 여부를 확인한다.",
 "sources": [
  "https://www.fnnews.com/news/202611161547327457",
  "https://g-enews.com/article/Securities/2026/11/202611161609596508153ddfb15a_1",
  "https://www.cnn.com/2026/11/16/business/stocks-nvidia-ai-anthropic",
  "https://www.thestreet.com/fed/fed-rate-hike-fears-december-inflation-2027"
 ],
 "policyNews": {
  "asOf": "2026-11-17",
  "us": {
   "stance": "매파",
   "note": "월러 이사는 11월 10일 50bp 인상이 타당하다고 말했고, 워시 의장은 16일 연설에서 금리 결정 언급 없이 AI 전망에 집중했다. CME FedWatch는 12월 9일 25bp 인상 확률을 91.1%로 반영했다.",
   "sources": [
    "https://www.home.saxo/en-mena/content/articles/macro/market-quick-take---fed-chair-warsh-to-speak-today---16-november-2026-16112026",
    "https://www.thestreet.com/fed/fed-rate-hike-fears-december-inflation-2027",
    "https://fool.com/investing/2026/11/14/a-larger-than-normal-fed-rate-hike-in-december-now-looks-more-likely-here-s-why",
    "https://admiralmarkets.com/education/articles/fundamental-analysys/warsh-speech-preview-november-16-2026"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10월 22일 기준금리를 연 3.0%로 만장일치 동결했고 총재는 긴축적 정책 기조를 이어갈 필요가 있다고 말했다. 시장은 11월 회의에서 인상을 예상한다.",
   "sources": [
    "https://www.khan.co.kr/article/202610222159005",
    "https://www.seoulfn.com/news/articleView.html?idxno=640744"
   ]
  }
 }
};
