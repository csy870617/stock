// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-07-17",
  headline: "미·이란 군사충돌 격화가 유가를 끌어올리며(브렌트 88달러, 주간 +14%) 물가·유동성의 새 역풍이 됐습니다. 미국은 6월 CPI 둔화(전년비 3.5%)로 7월 FOMC(7/28~29) 동결 확률이 약 80%지만, 유가 급등·중동 리스크가 매파 편향을 지지하는 신중 국면입니다. 한국은 한은이 기준금리를 2.75%로 인상(3년 6개월 만)하며 추가 인상을 예고한 데다, 원유 순수입국으로서 유가 급등·원화 약세(1,480~1,500원)·외국인 순매도가 겹쳐 중기 유동성이 부정으로 기울었습니다.",
  us: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "연준 정책금리 3.50~3.75% 유지 — 6월 CPI 전년비 3.5%로 둔화하며 7월 FOMC(7/28~29) 동결 확률 약 80%(인상 약 19%)",
      "다만 위원 9명이 연내 1회 이상 인상을 시사한 도트플롯·연말 중간값 3.8% 전망으로 매파 편향 지속 — 인하 시점 후퇴",
      "미·이란 충돌 격화(트럼프 휴전 종료 선언·호르무즈 위협)로 유가 급등 — 브렌트 88달러·WTI 81달러, 주간 +14%로 물가 상방 리스크 재점화",
      "10년물 국채금리 4.55%·2년물 4.18%로 안정(연화된 물가 vs 지정학 리스크 상쇄), M2 완만한 증가 — 자금 여건 자체는 우호적이나 유가가 중기 변수"
    ]
  },
  korea: {
    shortTerm: "신중",
    midTerm: "부정",
    drivers: [
      "한은 기준금리 2.50%→2.75% 인상(7/16, 3년 6개월 만) — 결정문에서 '추가 인상 기조 지속' 예고, 시장은 연말 3.0% 전망(유동성 긴축 방향)",
      "6월 소비자물가 3.2%로 목표(2%) 상회 + 미·이란發 유가 급등(브렌트 88달러) — 원유 순수입국에 물가·무역수지 이중 압박, 중기 역풍 강화",
      "원/달러 1,480~1,500원대 약세 지속 — 수입물가·외국인 자금 이탈 압력, 한은 긴축의 배경",
      "한 주간 롤러코스터(7/13 서킷브레이커 -8.95% → 7/15 +6.24% → 7/16 -6.37%, 코스피 6,820) — AI 거품 경고·반도체 급락에 외국인·기관 순매도, 수급 취약"
    ]
  },
  nextCheck: "7월 28~29일 FOMC(동결 우세·9월 인상 확률), 8월 한은 금통위(연속 인상 여부), 미국 7월 CPI·Core PCE, 미·이란 충돌·호르무즈發 유가, 원/달러 1,500원 방어 여부",
  sources: [
    "https://finance.yahoo.com/markets/live/stock-market-today-friday-july-17-dow-sp-500-nasdaq-092345307.html",
    "https://www.etftrends.com/fixed-income-content-hub/treasury-yields-snapshot-july-17-2026/",
    "https://tradingeconomics.com/commodity/brent-crude-oil",
    "https://www.businesskorea.co.kr/news/articleView.html?idxno=273185",
    "https://www.cnbc.com/2026/07/13/-a-july-rate-hike-from-the-fed-the-odds-are-rising.html"
  ]
};
