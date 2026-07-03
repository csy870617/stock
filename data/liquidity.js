// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-07-03",
  headline: "미국은 QT 종료·M2 증가·타이트한 신용스프레드로 유동성 여건은 우호적이나 에너지발 인플레와 연준 매파 전환이 중기 부담이며, 한국은 기록적 외국인 순매도·한은 긴축 편향에도 강한 국내 수급이 버티는 신중 국면입니다.",
  us: {
    shortTerm: "우호",
    midTerm: "신중",
    drivers: [
      "연준 정책금리 3.50~3.75% 동결(6/17 FOMC), 다만 에너지발 인플레로 선물시장은 연말 약 4%까지 인상 가능성 반영 — 6월 고용 57k 둔화로 인상 기대 일부 후퇴",
      "QT 2025년 12월 종료 후 지준 관리 매입 여지, M2 통화량 YoY 약 5.5%로 다년 최고 수준 증가 — 유동성 여건 우호적",
      "HY OAS 2.63%(6월)로 매우 타이트, 10Y-2Y 스프레드 +46~52bp로 커브 정상화 — 신용·경기 신호 양호",
      "RRP 사실상 소진(약 $2B)·TGA $919B 상승으로 지준 흡수(중기 역풍), DXY 약 100.8로 약세 전환 — 유동성 혼재"
    ]
  },
  korea: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "한은 기준금리 2.50% 8회 연속 동결(5/28), 다만 CPI 2.6%(21개월래 최고)·원화 약세로 시장은 연내 3.0% 인상 전망 — 긴축 편향",
      "외국인 상반기 코스피 약 149조원(약 $106.8B) 기록적 순매도 — 수급 부담",
      "원화 약세가 외국인 환손실 회피성 매도를 자극하며 자본 유출 압력으로 작용",
      "개인 약 99조원 순매수 등 강한 국내 수급으로 코스피 지수 회복 — 국내 유동성은 우호적"
    ]
  },
  nextCheck: "7월 28~29일 FOMC(인상 여부·점도표), 한은 7월 금통위, 7월 미국 CPI·고용지표",
  sources: [
    "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm",
    "https://fred.stlouisfed.org/series/M2SL",
    "https://fred.stlouisfed.org/series/BAMLH0A0HYM2"
  ]
};
