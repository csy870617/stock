// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-08-08",
  headline: "미국은 고용 둔화에 따른 9월 인하 기대와 낮은 신용 스프레드로 단기 유동성 환경이 우호적인 반면, 한국은 한은의 금리 인상 재개와 환율·수급 변동성으로 여전히 부정적이다 — 국가별 온도차가 뚜렷한 하이브리드 국면이 이어지고 있다.",
  headlineUS: "7월 고용보고서 충격(비농업고용 -2.3만명, 컨센서스 +8.5만 대폭 하회, 5·6월 합계 -10.3만 하향)으로 9월 FOMC 금리 인하 기대가 급등했고 나스닥이 사상 최고치권까지 랠리했다. HY 크레디트 스프레드는 약 280bp대 역사적 저점권을 유지해 신용시장 스트레스가 없고, QT는 지난해 12월 종료·M2는 +5.5~6%YoY로 재확장 중이라 유동성 환경은 완만히 우호적이나, Core PCE가 6월 +3.3%YoY로 여전히 목표를 크게 웃돌아 중기 인플레 부담은 남아있어 단기 '우호', 중기 '신중'을 유지한다.",
  headlineKR: "한은이 7/16 기준금리를 2.50%→2.75%로 인상(2023년 이후 첫 인상)하며 긴축을 재개했고 8월 추가 인상 가능성도 열어둔 상태다. 7월 CPI는 +2.8%로 낮아졌지만 한은은 통신비 기저효과로 8월 물가 반등을 예상한다. 원/달러는 1420~1430원대이고, 코스피는 7월 두 차례 서킷브레이커급 급락 이후 변동성이 큰 흐름 속에 6200~6400선을 오가며 8/7엔 외국인이 반도체주 중심으로 순매수 전환했으나 수급이 여전히 불안정해 단기 '부정', 중기 '신중'을 유지한다.",
  us: {
    shortTerm: "우호",
    midTerm: "신중",
    drivers: [
      "美 7/29 FOMC 3.50~3.75% 동결(9-3, 매파 3인 반대) 후 8/7 발표된 7월 고용보고서가 비농업 -2.3만명·실업률 4.1%로 예상을 크게 밑돌며 9월 인하 기대 급등, 나스닥 사상 최고치권 랠리",
      "5·6월 비농업고용 합계 -10.3만명 하향 조정 — 노동시장 둔화가 일회성이 아니라 추세적임을 시사",
      "Core PCE 6월 +3.3%YoY로 목표 상회 지속, Fed는 작년 12월 QT 종료 후 대차대조표 정체·M2는 +5.5~6%YoY 재확장",
      "HY 크레디트 스프레드 약 280bp대 역사적 저점권으로 신용시장 리스크온 유지",
    ]
  },
  korea: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "한은 7/16 기준금리 25bp 인상(2.50%→2.75%, 2023년 이후 첫 인상)으로 긴축 재개, 8월 추가 인상 가능성 시사",
      "7월 CPI +2.8%로 낮아졌으나 한은은 통신비 기저효과로 8월 물가 반등 전망 — 인하 전환은 아직 이르다는 신호",
      "원/달러 1420~1430원대, 코스피는 7월 두 차례 급락(서킷브레이커 포함) 이후 변동성 장세로 6200~6400선 등락",
      "8/7 외국인이 삼성전자·SK하이닉스 등 반도체주를 순매수하며 반등 주도했으나 수급 방향성은 아직 불안정",
    ]
  },
  nextCheck: "9/16~17 FOMC(9월 인하 여부), 한국 BOK 8/27 금통위, 8월 미국 CPI/PCE",
  sources: [
    "https://www.cnbc.com/2026/08/07/july-jobs-report.html",
    "https://www.bloomberg.com/news/articles/2026-08-07/us-employers-unexpectedly-shed-jobs-unemployment-rate-falls",
    "https://247wallst.com/investing/2026/08/07/live-nasdaq-composite-tech-broader-markets-rise-as-payrolls-miss-signals-fed-patience/",
    "https://www.advisorperspectives.com/dshort/updates/2026/07/30/core-pce-inflation-at-3-3-in-june-edging-down-from-may",
    "https://www.svb.com/market-insights/us-treasuries/the-federal-reserve-ends-qt-key-market-liquidity-insights/",
    "https://www.khan.co.kr/en/article/202607161738037/",
    "https://en.sedaily.com/finance/2026/08/04/bank-of-korea-sees-august-inflation-rebounding-on-telecom",
    "https://www.hankyung.com/article/2026080700756",
    "https://www.mt.co.kr/stock/2026/08/07/2026080715205549201",
  ]
};
