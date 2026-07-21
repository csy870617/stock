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

// 주요 지수 기술적 분석 — 유동성과 함께 온디맨드 갱신(WebSearch로 확인된 값만 사용)
// signal: "적극매수"/"매수"/"중립"/"매도"/"적극매도" (색상 매핑용)
// trend:  "상승"/"횡보"/"하락" (화살표 매핑용)
window.INDEX_TA = {
  asOf: "2026-07-20",
  note: "미국 지수는 7/17 종가, 한국 지수는 7/20 종가 기준. 신호는 이동평균·RSI 등 기술적 지표 종합(출처 Investing.com·Yahoo Finance).",
  indices: [
    {
      key: "nasdaq", name: "나스닥 종합", flag: "🇺🇸",
      level: "25,520.24", change: "-1.4%", changeDir: "down", period: "7/17 종가",
      trend: "하락", signal: "매도",
      metrics: [
        ["RSI(14)", "35.5 · 과매도 근접*"],
        ["이동평균", "20일선 하회 · 매도 우위"],
        ["지지 / 저항", "25,000 / 26,000"]
      ],
      read: "AI·반도체 셀오프로 주간 -2.9%, 4개 지수 중 가장 약함. RSI 35선까지 눌려 과매도 초입이나 이동평균은 매도 우위. 25,000 사수 여부가 단기 분수령(*나스닥100 기준).",
      chartUrl: "https://kr.investing.com/technical/nasdaq-composite-technical-analysis"
    },
    {
      key: "dow", name: "다우존스", flag: "🇺🇸",
      level: "52,146.42", change: "-0.77%", changeDir: "down", period: "7/17 종가",
      trend: "상승", signal: "매수",
      metrics: [
        ["추세", "상승 지속 · 주요 이평선 상회"],
        ["전고점", "52,909(7/2)서 -1.4%"],
        ["주간 등락", "-0.9% · 지수 중 선방"]
      ],
      read: "기술주 급락 속 방어·가치주 로테이션으로 홀로 견조. 이동평균 기준 '매수' 신호 유지, 전고점 대비 낙폭 1%대. 나스닥과의 온도차가 뚜렷해 방어적 자금 이동을 시사.",
      chartUrl: "https://kr.investing.com/indices/us-30"
    },
    {
      key: "kospi", name: "코스피", flag: "🇰🇷",
      level: "6,516.27", change: "-4.46%", changeDir: "down", period: "7/20 종가",
      trend: "하락", signal: "매도",
      metrics: [
        ["RSI(14)", "45.1 · 중립"],
        ["이동평균", "20·60일선 하회"],
        ["지지 / 저항", "6,470 / 6,640(20일선권)"]
      ],
      read: "글로벌 반도체 급락에 -4.46% 급락, 매도 사이드카 발동. 6,500선 턱걸이(장중 저점 6,472)·기관 1.1조 순매도가 낙폭 주도. RSI는 아직 중립권이라 추가 조정 여지, 6,470 이탈 시 낙폭 확대 우려.",
      chartUrl: "https://kr.investing.com/indices/kospi-technical"
    },
    {
      key: "kosdaq", name: "코스닥", flag: "🇰🇷",
      level: "749.64", change: "-5.33%", changeDir: "down", period: "7/20 종가",
      trend: "하락", signal: "적극매도",
      metrics: [
        ["신호", "52주 신저가 · 최약세"],
        ["이동평균", "전 이평선 하회"],
        ["지지 / 저항", "747(장중저점) / 750"]
      ],
      read: "-5.33% 급락하며 심리적 지지선 750을 붕괴하고 52주 신저가 경신, 양 시장 사이드카. 4개 지수 중 가장 약한 흐름으로 뚜렷한 하방 지지가 확인되지 않아 반등 시그널 확인 전까지 신중.",
      chartUrl: "https://kr.investing.com/indices/kosdaq"
    }
  ]
};
