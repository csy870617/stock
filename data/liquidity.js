// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-11-10",
 "headline": "미국은 돈의 흐름이 중간 수준에서 소폭 들어오지만 연준 12월 인상 기대가 겹친 신중 국면이고, 한국은 예탁금·신용융자 감소와 외국인 대규모 순매도가 이어지는 부정 국면이다.",
 "headlineUS": "흐름 점수 0(최근 5년 하위부터 68% 위치)으로 중간 구간이고 신용 경고는 4개 중 1개다. 12월 25bp 인상 기대 86%가 단기 부담이다.",
 "headlineKR": "투자자예탁금이 3개월 새 12.4%, 신용융자가 6.5% 줄어 검증 기준상 약한 구간이다. 외국인 순매도와 한은 인상 기대가 겹친다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "신중",
  "drivers": [
   "흐름 점수 0으로 최근 5년 하위부터 68% 위치이고 실질 통화량(M2)은 2% 증가로 들어오는 쪽이라 baseline 중기 '부정'보다 한 단계 높게 본다.",
   "연준 순유동성 5.79조 달러(3개월 -0.8%), 신용 스프레드 1.56%p(3개월 -8bp)로 보통 수준이다.",
   "금융여건지수 -0.459가 3개월 새 +0.079 악화해 신용 경고 4개 중 1개가 켜졌다.",
   "연방기금금리 선물이 12/9 FOMC 25bp 인상 86%, 미 10년물 4.86%를 반영해 baseline 단기 '우호'보다 한 단계 낮게 본다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "부정",
  "drivers": [
   "투자자예탁금 88.3조원으로 3개월 새 12.4% 줄어 검증상 다음 3개월 성과가 약했던 쪽에 있다.",
   "신용융자 28.1조원으로 3개월 새 6.5% 줄어 개인 자금 유입도 약하다.",
   "외국인 순매수 누적 -55.9조원, 코스피 20일 외국인 -161,469억원으로 순매도가 이어진다.",
   "원/달러 1,337원(3개월 -5.6%)은 들어오는 쪽이지만, 한은 3개월 기대금리 3.18%로 인상 쪽에 기운다."
  ]
 },
 "nextCheck": "이번 주 미국 10월 CPI 결과와 12/9 FOMC 인상 확률, 코스피 5,277 저항·4,911 지지 유지 여부를 확인한다.",
 "sources": [
  "https://www.fntimes.com/html/view.php?ud=202611100710183972141825007d_18",
  "https://247wallst.com/investing/2026/11/07/odds-of-a-december-rate-hike-jump-to-77-after-a-blowout-jobs-report/",
  "https://cryptobriefing.com/october-jobs-surge-raises-odds-of-december-fed-rate-hike/",
  "https://www.newspim.com/news/view/20261110001216"
 ],
 "policyNews": {
  "asOf": "2026-11-10",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 10대 2로 동결했고 쿡 이사·해맥 총재가 추가 인상을 주장하며 반대했다. 10월 고용 16.5만 명 증가(예상 5.6만 명) 이후 CME 페드워치의 12월 0.25%p 인상 확률은 76.8%로 높아졌다.",
   "sources": [
    "https://247wallst.com/investing/2026/11/07/odds-of-a-december-rate-hike-jump-to-77-after-a-blowout-jobs-report/",
    "https://cryptobriefing.com/october-jobs-surge-raises-odds-of-december-fed-rate-hike/",
    "https://www.fntimes.com/html/view.php?ud=202611100710183972141825007d_18"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결했고, 신현송 총재는 추가 인상의 시기와 속도를 데이터를 점검하며 결정하겠다고 했다. 언론은 11월 금통위 인상 전망이 유지되고 있다고 전했다.",
   "sources": [
    "https://www.khan.co.kr/article/202610222159005",
    "https://www.etoday.co.kr/news/view/2639028",
    "https://www.fntimes.com/html/view.php?ud=202611100710183972141825007d_18"
   ]
  }
 }
};
