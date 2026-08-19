// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
  asOf: "2026-08-19",
  headline: "미국은 8/19 FOMC 의사록(7/28-29 회의, 9-3표결·매파 3인 동일방향 소수의견은 2016년 9월 이후 최초)이 예상대로 공개돼 정책 불확실성 자체는 완화됐으나, 30년물 국채금리가 2007년 이후 최고치(5.3%대)를 찍고 반도체주 급락·이란-미 전쟁 장기화가 겹쳐 단기 신중·중기 부정으로 하향하며, 한국은 반도체 차익실현과 글로벌 장기금리 급등이 맞물려 코스피가 매도 사이드카를 동반한 채 –5.8%(6,471) 급락하고 외국인이 하루 4조원 넘게 순매도해 단기를 신중으로 낮춘다.",
  headlineUS: "8/19 공개된 FOMC 의사록은 Hammack(클리블랜드)·Kashkari(미니애폴리스)·Logan(댈러스) 3인의 동일방향 인상 소수의견(9-3표결, 2016년 9월 이후 최초)을 재확인했지만, 회의 이후 3주간 나온 고용 쇼크(7월 비농업 -2.3만명)·CPI 둔화(3.4%)로 9월 인상 확률은 CME FedWatch 기준 이미 8/7에 67%→44%대로 꺾였고 이후 흐름도 유지되는 반면, 대신 30년물 국채금리가 5.33%(8/18)로 2007년 이후 최고치를 기록하며 재정적자·AI 설비투자發 회사채 공급 부담이 부각되고 반도체株 급락(SK하이닉스·삼성전자·마이크론 등 시총 수천억달러 증발)과 이란-미 전쟁 장기화(브렌트유 90달러대)에 따른 지정학 리스크까지 겹쳐 단기 신중·중기 부정으로 하향한다.",
  headlineKR: "코스피가 8/19 반도체 차익실현(전일도 -1.55%)에 미국 장기금리 급등·중동 지정학 불안까지 겹치며 매도 사이드카를 동반한 채 전일比 –5.80%(6,471선) 급락, 외국인이 하루 만에 4조원 넘게 순매도했다(개인은 5.6조원 순매수로 저가매수 유입). 국고채 10년물도 4.40%까지 올라 미국발 금리 상승이 전이됐고, 8/27 금통위는 2.75% 매파적 동결(1~2인 인상 소수의견 가능성) 전망이 유지돼 단기는 신중으로 하향, 중기는 신중을 유지한다.",
  us: {
    shortTerm: "신중",
    midTerm: "부정",
    drivers: [
      "8/19 FOMC 의사록 공개: 7/28-29 회의 9-3표결, Hammack(클리블랜드)·Kashkari(미니애폴리스)·Logan(댈러스) 3인 동일방향 인상 소수의견(2016년 9월 이후 최초) 재확인",
      "9월 인상 확률(CME FedWatch): 7/31 약 67% → 7월 고용쇼크(비농업 -2.3만명, 5·6월 합산 -10.3만명 하향) 발표 직후인 8/7 약 44%(동결 확률 60%)로 급락 — 의사록 이후에도 되돌림 없이 동결 우세 유지",
      "7월 CPI YoY 3.4%(전월비 0.1%p 둔화), 근원 CPI YoY 2.5% — 물가는 목표(2%) 상회하나 둔화 지속",
      "30년물 국채금리 5.33%(8/18)로 2007년 7월 이후 최고치 — 대규모 재정적자發 국채 발행 증가 + AI 설비투자發 회사채 공급 부담이 장기금리 상승 견인, 10년물도 4.70~4.75%대로 동반 상승",
      "반도체주 글로벌 급락(7/28 촉발, 8/19까지 지속) — SK하이닉스·삼성전자·마이크론 등 대형 칩주 시가총액 합산 수천억달러 증발, AI 인프라 고평가 되돌림",
      "이란-미 전쟁 장기화(약 6개월째, 호르무즈해협 통행 사실상 마비) — 브렌트유 90달러대, 유가 상승이 물가·성장 양방향 리스크",
      "VIX 15.8선(8/18 종가 15.84, +4.28%)으로 여전히 낮은 수준 — 장기금리·지정학 리스크 대비 변동성이 과소평가됐다는 전략가 경고 다수",
      "HY OAS 약 271~281bp(8월 중순)로 여전히 타이트 — 신용시장은 아직 주식·채권 변동성 확대를 반영하지 않음",
      "★ baseline(자동, midScore -0.54) 과의 정합: 이전 온디맨드 판정(신중)이 30년물 기록 경신·반도체 밸류에이션 리셋을 충분히 반영하지 못해 중기를 '부정'으로 하향, baseline 방향과 일치시킴"
    ]
  },
  korea: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "코스피 8/19 종가 6,471(-5.80%), 장중 매도 사이드카(프로그램 매도호가 효력 정지) 발동 — 반도체 차익실현(전일 -1.55%) + 미국 장기금리 급등 + 중동 지정학 불안 복합 작용",
      "외국인 8/19 하루 약 4조 242억원 순매도, 기관 약 1조 7,926억원 순매도 — 개인이 약 5조 640억원 순매수로 저가매수 유입되며 낙폭 일부 방어",
      "국고채 10년물 8/18 약 4.40%까지 상승 — 미국발 글로벌 장기금리 급등이 국내로 전이",
      "원달러 환율 장중 변동성 확대: 오전 9시 1,413.5원 → 오후 1,397.7원(-14.1원) — 코스피 급락에 따른 원화 약세 압력을, 미 국채 장기금리 급등發 달러 약세 압력이 일부 상쇄",
      "8/27 금통위 컨센서스 유지: 기준금리 2.75% 매파적 동결(1~2인 인상 소수의견 가능성), GDP·물가 전망 상향 여부가 변수(우리금융경영연구소 등)",
      "이번 급락은 반도체 랠리 과열 되돌림 성격이 커 신용·환율·정책금리 등 유동성 펀더멘털 자체가 훼손된 신호는 아직 아님 — 단기만 신중으로 낮추고 중기는 신중 유지"
    ]
  },
  nextCheck: "8/27 한국은행 금융통화위원회 기준금리 결정, 9월 FOMC 회의 및 향후 CPI·고용 지표, 이란-미 전쟁·호르무즈해협 협상 진행 상황",
  sources: [
    "https://www.federalreserve.gov/monetarypolicy/fomcpresconf20260729.htm",
    "https://www.newsquawk.com/headlines/preview-fomc-minutes-due-wednesday-19th-august-2026-at-1900bst1400edt",
    "https://www.cnbc.com/2026/08/07/odds-the-fed-hikes-in-september-tumble-following-big-july-jobs-miss.html",
    "https://www.cnbc.com/2026/08/12/cpi-inflation-report-july-2026.html",
    "https://www.bloomberg.com/news/articles/2026-08-17/us-bond-selloff-drives-30-year-yields-to-the-highest-since-2007",
    "https://www.cnbc.com/2026/08/18/treasury-yields-.html",
    "https://www.cnbc.com/2026/07/29/chip-selloff-sk-hynix-samsung-softbank.html",
    "https://www.aljazeera.com/economy/2026/8/10/oil-prices-climb-as-iranian-demands-cloud-outlook-for-strait-of-hormuz",
    "https://www.cnbc.com/2026/08/17/stock-market-volatility-vix-wall-street.html",
    "https://convextrade.com/metrics/bamlh0a0hym2",
    "https://www.etnews.com/20260819000341",
    "https://www.newspim.com/news/view/20260819001007",
    "https://www.newsis.com/view/NISX20260819_0003753655",
    "https://www.mt.co.kr/economy/2026/08/19/2026081915333633766",
    "https://www.newsfc.co.kr/news/articleView.html?idxno=80371",
    "https://economist.co.kr/article/view/ecn202608060049",
    "https://zdnet.co.kr/view/?no=20260819101606"
  ]
};
