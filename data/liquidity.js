// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  "asOf": "2026-08-17",
  "headline": "미·한 모두 위험자산 우호적 환경(VIX 14선·HY스프레드 사상급 타이트·코스피 사상 최고권)이 유지되나, 8/19 FOMC 의사록과 8/27 금통위를 앞두고 정책 불확실성이 커 중기는 신중을 유지한다.",
  "headlineUS": "7월 FOMC 5연속 동결에도 3명 매파 소수의견(2016년 이후 최다)으로 9월 인상 우려가 부각됐으나, 직후 발표된 7월 고용 쇼크(비농업 -2.3만·5·6월 -10.3만 하향)로 9월 동결 확률이 다시 69%로 반등했다. 근원 PCE 3.3%·근원 CPI 2.5%로 물가는 여전히 목표 상회, HY스프레드 2.7%대·VIX 14선은 신용·변동성 국면상 우호적이다.",
  "headlineKR": "코스피는 외국인 순매수 지속으로 6,900선 부근 사상 최고권을 유지 중이다. 7월 금통위 깜짝 인상(2.50%→2.75%) 이후 8/27 회의는 매파적 동결(1~2명 인상 소수의견 가능성)이 컨센서스이며, 원달러는 1,420~1,440원대에서 여전히 높아 통화 측면 부담은 남아 있다.",
  "us": {
    "shortTerm": "우호",
    "midTerm": "신중",
    "drivers": [
      "7/28-29 FOMC 9:3 표결로 기준금리 3.50~3.75% 5연속 동결, Hammack·Kashkari·Logan 3인이 0.25%p 인상 소수의견(2016년 9월 이후 가장 분열된 매파적 표결)을 냈다.",
      "7월 고용보고서(8/7 발표): 비농업 고용 -2.3만 명(예상 +8만 대비 큰 폭 미스), 5·6월 합산 -10.3만 명 하향 수정, 실업률 4.1%, 평균시급 YoY +3.2%(2021년 5월 이후 최저) — CME FedWatch 9월 동결 확률이 8/14 기준 약 69%로 상승(인상 확률 급락).",
      "7월 CPI(8/12 발표) 헤드라인 YoY 3.4%(전월 3.5%에서 둔화, MoM +0.1%)·근원 CPI YoY 2.5%(전월 대비 -0.1%p), 6월 근원 PCE(7/30 발표, 최신치)는 YoY 3.3%·MoM +0.1%로 목표(2%)를 크게 상회한 채 정체.",
      "HY OAS 2.71~2.81%(8월 중순)로 장기 중앙값(약 4.5%) 대비 역사적 최상위 타이트권, VIX 14.2~14.3선(8/14)으로 낮은 변동성 유지 — 신용·주식 변동성 모두 위험선호 국면. Fed 총자산 6.66조 달러(QT 지속), M2 통화량 23.16조 달러(2026년 6월)로 완만한 확장 지속.",
      "8/19(수) 2시 FOMC 7월 의사록 공개 예정 — 매파 소수의견 배경과 9월 인상 논의 강도가 최대 변수."
    ]
  },
  "korea": {
    "shortTerm": "우호",
    "midTerm": "신중",
    "drivers": [
      "코스피 8/15 기준 6,900선 턱밑 마감, 외국인 순매수(8/14 약 1.8조원)가 지수를 사상 최고권으로 견인했다(8/17은 광복절 대체공휴일로 휴장, 8/14 종가 유지).",
      "한국은행 7월 금통위에서 기준금리 2.50%→2.75%로 깜짝 인상 — 성장·물가 전망 상향이 배경이며, 8/27 금통위는 시장 컨센서스상 2.75% 매파적 동결 전망(1~2명 인상 소수의견 가능성도 거론).",
      "원달러 환율 1,420~1,440원대(8월 초·중순)로 여전히 높은 수준 유지, DXY도 99.8선(8/10)으로 달러 강세 배경 — BOK 인상에도 원화 약세 압력이 지속된다.",
      "지정학: 우크라이나·중동 분쟁 장기화, 미 평균관세율 약 18%(1930년대 이후 최고) 등 구조적 리스크는 상수화됐으나 이번 주 급변 이벤트는 확인되지 않았다."
    ]
  },
  "nextCheck": "8/19(수) FOMC 7월 의사록 공개, 8/27(목) 한국은행 금융통화위원회",
  "sources": [
    "https://www.cnbc.com/2026/07/29/fed-rate-decision-july-2026.html",
    "https://www.usnews.com/news/national-news/articles/2026-07-29/fed-holds-rates-steady-but-3-members-favored-a-rate-hike",
    "https://www.techtimes.com/articles/322145/20260729/three-fed-dissenters-signal-september-hike-live-after-most-hawkish-fomc-vote-nearly-ten-years.htm",
    "https://www.cnbc.com/2026/08/07/odds-the-fed-hikes-in-september-tumble-following-big-july-jobs-miss.html",
    "https://www.cnbc.com/2026/08/12/cpi-inflation-report-july-2026.html",
    "https://qz.com/june-2026-pce-consumer-spending-personal-income-073026",
    "https://tradingeconomics.com/united-states/bofa-merrill-lynch-us-high-yield-option-adjusted-spread-fed-data.html",
    "https://primerates.com/primerate/fed-balance-sheet/",
    "https://tradingeconomics.com/united-states/money-supply-m2",
    "https://www.fnnews.com/news/202608141353252146",
    "https://www.newsfc.co.kr/news/articleView.html?idxno=80371",
    "https://economist.co.kr/article/view/ecn202608060049",
    "https://kr.investing.com/currencies/usd-krw"
  ]
};
