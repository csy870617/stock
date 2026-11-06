// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-06",
 "headline": "미국은 돈이 소폭 들어오지만 연준 인상 기대와 AI주 급락이 누르는 신중 국면, 한국은 예탁금 감소와 외국인 이탈이 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수 0.01(최근 5년 하위부터 68%)로 돈은 소폭 들어오는 중이고 신용 스프레드도 안정적이다. 다만 12월 FOMC 인상 확률 68%와 VIX 28.2가 부담이라 신중 국면이다.",
 "headlineKR": "투자자예탁금이 3개월 새 13.5% 줄고 외국인 순매도가 쌓여 부정 국면이다. 신용융자·회사채 스프레드는 안정적이라 신용 경색으로 번진 상태는 아니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0.01로 최근 5년 중 하위부터 68% 위치이고, 이 점수는 과거 다음 12개월 S&P500 초과수익과 같은 방향이었지만 3개월 앞은 뚜렷하지 않았다.",
   "신용 스프레드 1.52%p(3개월 -10bp)로 안정적이고 신용 경고는 4개 중 1개(금융여건 3개월 변화)만 켜져 급락 경고 조건(2개 이상)에는 못 미친다.",
   "연준 순유동성 5.79조 달러(3개월 -0.8%)와 실질 M2 +2%로 돈의 양은 보통 수준이다.",
   "연방기금금리 선물은 12/9 인상 68%, 1/27까지 누적 인상 84%를 반영해 baseline 중기 부정과 흐름 점수 사이에서 신중으로 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 89.2조원으로 3개월 -13.5% 줄었고, 예탁금 감소 하위 3분의 1 구간은 과거 다음 3개월 코스피 초과수익 평균이 -1.9%였다.",
   "외국인 순매수 누적 -55.3조원, 코스피 60일 외국인 순매도 53조776억원으로 이탈이 이어진다.",
   "baseline 단기는 코스피 20일 -18% 급락으로 매우 부정이지만, 신용융자 28.6조원(3개월 +0.8%)·회사채 스프레드 0.69%p(3개월 -1bp)가 보통이라 부정으로 둔다.",
   "흐름 점수 -0.17(하위부터 43%)이고 한은 1년 기대금리가 인상 약 2회분 높아 중기도 부정이다."
  ]
 },
 "nextCheck": "코스피 5,306·나스닥 24,262 지지 여부, 12/9 FOMC 인상 확률(현재 68%)과 11/26 금통위 결과를 확인한다.",
 "sources": [
  "https://www.bloomberg.com/news/articles/2026-11-05/treasuries-extend-advance-as-technology-shares-resume-slide",
  "https://fortune.com/2026/11/05/wall-street-drop-off-tech-ai-plunge-2-trillion/",
  "https://biz.heraldcorp.com/article/10927440",
  "https://cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html"
 ],
 "policyNews": {
  "asOf": "2026-11-06",
  "us": {
   "stance": "매파",
   "note": "10월 FOMC는 금리를 동결했으나 쿡 이사와 해맥 총재가 인상을 주장하며 반대했고, 로건 총재는 0.25%p 인상이 적어도 두 번 더 필요하다고 말했다. 11/05 해맥 총재는 점진적 인상을 선호한다고, 바킨 총재는 광범위한 인플레이션이 여전히 너무 높다고 말했다.",
   "sources": [
    "https://cnbc.com/2026/10/30/musalem-fed-monetary-policy-tightening.html",
    "https://247wallst.com/investing/2026/10/31/two-fed-officials-just-called-for-more-rate-hikes-starting-soon",
    "https://www.cnbc.com/2026/11/05/barkin-sees-interest-rate-hikes-ahead-but-at-a-gradual-pace.html",
    "https://cryptobriefing.com/feds-hammack-supports-gradual-rate-hikes-to-manage-inflation/"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.0%로 만장일치 동결했다. 신현송 총재는 성장세와 물가 오름세가 8월보다 더 강한 면이 있어 긴축 기조를 이어 가야 한다고 말했다. 언론은 11/26 금통위의 인상 가능성이 커졌다고 본다.",
   "sources": [
    "https://hankookilbo.com/news/article/A2026102913470001326",
    "https://m.news.nate.com/view/20261022n40350",
    "https://www.fnnews.com/news/202610290728345571"
   ]
  }
 }
};
