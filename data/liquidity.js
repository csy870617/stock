// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-07-20",
  headline: "미국은 AI·반도체 셀오프와 유가·연준 인상 리스크로 '신중', 한국은 한은 금리인상·초약세 원화·7/20 사이드카 급락으로 단기 '부정' — 전반적 위험회피 국면입니다.",
  us: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "연준 동결 유력(7/29 FOMC, FedWatch 동결 확률 약 87%)이나 인상 위험 상존 — 6월 CPI 3.5%(5월 4.2%서 둔화)·근원 2.6%",
      "미 10년물 4.55~4.57%(7/17 종가 4.55%)로 여전히 높아 실질금리 부담 지속",
      "HY 스프레드(OAS) 269~271bp로 매우 타이트 — 신용시장은 양호한 유동성 신호(우호 요인)",
      "AI·반도체 셀오프 확산 — 주간 나스닥 -2.9%·SMH(반도체 ETF) -9%, TSMC 캡엑스 상향($60~64B) 여파. 브렌트유 $87.7·이란 리스크·M2 +1.88% 완만, 7/21주 빅테크 실적이 분수령"
    ]
  },
  korea: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "한은 7/16 기준금리 2.50%→2.75% 인상(3년 6개월 만·만장일치)·긴축 지속 시사 — 유동성 긴축 전환",
      "6월 CPI 전년비 3.2%(5월 3.1%서 가속, 2개월째 3%대)로 물가 압력 확대",
      "원/달러 1,478.4원(7/20 마감, 0.1원 강세) — 1,400원대 후반 지속, 수입물가·자본유출 압박은 여전",
      "7/20 코스피 6,516.27(-4.46%)·코스닥 749.64(-5.33%, 52주 신저가) 양 시장 매도 사이드카 발동 — 글로벌 반도체 급락에 기관 1.1조 순매도, 수급 취약"
    ]
  },
  nextCheck: "7/29 미 FOMC(동결/인상 여부·파월 톤), 8월 한은 금통위 및 원/달러 1,500원 상단 방어, 호르무즈 유가 추이. 유가·미이란 충돌·반도체주 반등 여부는 상시 모니터링.",
  sources: [
    "https://www.cnbc.com/2026/07/14/consumer-price-index-inflation-report-june-2026.html",
    "https://finance.yahoo.com/markets/live/stock-market-today-friday-july-17-dow-sp-500-nasdaq-092345307.html",
    "https://fred.stlouisfed.org/series/BAMLH0A0HYM2",
    "https://www.newspim.com/news/view/20260720000897",
    "https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=03014326645516488"
  ]
};

