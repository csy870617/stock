// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
  asOf: "2026-08-18",
  headline: "미국은 7/28-29 FOMC 동결(3.50~3.75%, 매파 소수의견 3명) 이후 8/19 의사록 공개를 앞두고 관망 국면이며 단기는 우호·중기는 신중, 한국은 반도체 랠리로 코스피가 7,100선을 재돌파했으나 8/27 금통위 매파적 동결 전망이 중기 상단을 제약해 단기 우호·중기 신중을 유지한다.",
  headlineUS: "7월 고용 쇼크(비농업 -2.3만명, 실업률 4.1%)로 9월 동결 확률이 약 60%까지 반등했지만 3명의 매파 소수의견과 CPI 3.4%(YoY, 전월대비 0.1%p 둔화)의 끈적한 물가가 남아 있어, VIX 15선·HY스프레드 270~280bp대의 타이트한 신용 환경이 단기 우호를 뒷받침하는 가운데 8/19 의사록 공개가 중기 방향의 다음 변수다.",
  headlineKR: "외국인이 오늘 하루만 4,300억원 이상 순매수하며 삼성전자·SK하이닉스 급등을 주도, 코스피가 장중 7,100~7,200선까지 회복했으나 8/27 금통위에서 2.75% 매파적 동결(1~2명 인상 소수의견 가능성) 전망이 유효해 중기는 신중 유지, 원달러는 1,410~1,423원 박스권이다.",
  us: {
    shortTerm: "우호",
    midTerm: "신중",
    drivers: [
      "7/28-29 FOMC 5연속 동결(3.50~3.75%), 매파 소수의견 3명(Waller 등 인상 주장)",
      "7월 비농업 고용 -2.3만명(고용 쇼크), 실업률 4.1% — 9월 동결 확률 CME FedWatch 약 60%(인상 확률 40%대)로 반등",
      "7월 CPI YoY 3.4%(전월대비 0.1%p 둔화), 근원 CPI YoY 2.5%, MoM 0.1%/0.2% — 물가는 여전히 목표(2%) 상회, 둔화 속도는 완만",
      "8/19(내일) FOMC 의사록 공개 예정 — 매파 3인 소수의견 배경과 향후 정책 스탠스 확인 필요",
      "VIX 15.19(8/17 종가, +6.6%) 저변동성 구간 유지",
      "HY OAS 약 270~280bp(8월 중순) 타이트 — 신용시장 스트레스 낮음",
      "연준 대차대조표·M2는 완만한 축소·증가 기조 지속(QT 지속)"
    ]
  },
  korea: {
    shortTerm: "우호",
    midTerm: "신중",
    drivers: [
      "코스피 8/18 장중 7,100~7,200선 회복(전일比 +2%대), 외국인 단독 순매수 약 4,301억원",
      "삼성전자 +3.28%(28만3,500원), SK하이닉스 +5.78%(174만원) 반도체 투톱 급등이 지수 견인",
      "미국 증시가 중동발 지정학 불안에도 반도체 강세로 견조 — 국내 수급에도 우호적 파급",
      "8/27 금통위 컨센서스: 기준금리 2.75% 매파적 동결(1~2명 인상 소수의견 가능성, GDP·물가 전망 상향 여부가 변수)",
      "원달러 환율 1,410~1,423원 박스권, NDF 종가 1,416.50원 — 미 고용 둔화·9월 인상 기대 약화가 하방 압력",
      "북한-러시아-중국 군사협력 강화 등 한반도 지정학 리스크는 상존하나 현재 국내 증시 수급에는 미반영"
    ]
  },
  nextCheck: "8/19 FOMC 의사록(7/28-29 회의) 공개, 8/27 한국은행 금융통화위원회 기준금리 결정",
  sources: [
    "https://www.interactivecrypto.com/fomc-minutes-on-august-19-set-to-clarify-fed-s-rate-path-amid-mixed-economic-signals-aug-2026",
    "https://www.cnn.com/2026/07/29/business/live-news/federal-reserve-interest-rate-07-29-26",
    "https://www.cnbc.com/2026/07/29/fed-meeting-today-live-updates.html",
    "https://www.cnbc.com/2026/08/12/cpi-inflation-report-july-2026.html",
    "https://www.kiplinger.com/investing/economy/cpi-report-july-2026-what-to-expect",
    "https://www.cnbc.com/2026/08/07/odds-the-fed-hikes-in-september-tumble-following-big-july-jobs-miss.html",
    "https://convextrade.com/metrics/bamlh0a0hym2",
    "https://fred.stlouisfed.org/series/VIXCLS",
    "https://www.newsfc.co.kr/news/articleView.html?idxno=80371",
    "https://economist.co.kr/article/view/ecn202608060049",
    "https://kbthink.com/investment/fx/daily/260818.html",
    "https://www.fnnews.com/news/202608181001000822",
    "https://news.tf.co.kr/read/economy/2354862.htm",
    "https://www.sentv.co.kr/article/view/sentv202608180028",
    "https://www.cnbc.com/2026/05/29/feds-bowman-warns-against-hiking-interest-rates-due-to-inflation-spike.html"
  ]
};
