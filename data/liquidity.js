// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-07-20",
  headline: "미국은 유가·인플레·연준 인상 리스크로 '신중', 한국은 한은 금리인상·초약세 원화·외국인 이탈로 단기 '부정' — 전반적 위험회피 국면입니다.",
  us: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "연준 동결 유력(7/29 FOMC, FedWatch 동결 확률 약 87%)이나 인상 위험 상존 — 6월 CPI 3.5%(5월 4.2%서 둔화)·근원 2.6%",
      "미 10년물 4.55~4.57%(7/17 종가 4.55%)로 여전히 높아 실질금리 부담 지속",
      "HY 스프레드(OAS) 269~271bp로 매우 타이트 — 신용시장은 양호한 유동성 신호(우호 요인)",
      "브렌트유 $90 터치 후 $87.7로 반락(미·이란 충돌·예멘 후티의 사우디 원유 봉쇄 선언)·M2 +1.88% 완만 — 유가발 인플레 재점화가 상존, 7/21주 빅테크 실적이 변수"
    ]
  },
  korea: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "한은 7/16 기준금리 2.50%→2.75% 인상(3년 6개월 만·만장일치)·긴축 지속 시사 — 유동성 긴축 전환",
      "6월 CPI 전년비 3.2%(5월 3.1%서 가속, 2개월째 3%대)로 물가 압력 확대",
      "원/달러 1,478.4원(7/20 마감, 0.1원 강세) — 1,400원대 후반 지속, 수입물가·자본유출 압박은 여전",
      "7/20 코스피 6,516.27(-4.46%) 급락·외국인·기관 2.7조원 순매도(장중 저가매수로 낙폭 축소) — 반도체 약세·중동 리스크에 수급 취약"
    ]
  },
  nextCheck: "7/29 미 FOMC(동결/인상 여부·파월 톤), 8월 한은 금통위 및 원/달러 1,500원 상단 방어, 호르무즈 유가 추이. 유가·미이란 충돌은 상시 모니터링.",
  sources: [
    "https://www.cnbc.com/2026/07/14/consumer-price-index-inflation-report-june-2026.html",
    "https://www.cnbc.com/2026/07/16/us-treasury-yields-wall-street-inflation-employment-data.html",
    "https://fred.stlouisfed.org/series/BAMLH0A0HYM2",
    "https://www.etoday.co.kr/news/view/2604425",
    "https://www.newspim.com/news/view/20260720000217"
  ]
};
