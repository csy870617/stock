// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-07-23",
  headline: "미이란 전쟁이 확전 방향으로 재악화(호르무즈 유조선 재피격, 10일 휴전안 미수용)되며 브렌트유가 $94대(6주래 최고)로 급등해 미국 유동성은 '부정'을 유지하되 Fed 점도표의 매파 선회라는 새 리스크가 더해졌습니다. 한국은 코스피 매수 사이드카가 이틀 연속 발동됐으나 알파벳 실적 경계감·유가 상승으로 상승분 대부분을 반납했고 기관도 순매도로 전환해 '신중'을 유지합니다 — 반도체 수출은 사상 최대이나 한은의 추가 긴축 시사가 계속 부담입니다.",
  us: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "美-이란 전쟁이 11일째 공습으로 확전 지속 — 7/21 호르무즈 해협 유조선 재피격, 카타르·이집트·파키스탄의 10일 휴전안은 7/23 현재까지 미국·이란 모두 미수용. 브렌트유는 7/22 $94.07(+3.4%, 6주래 최고)로 baseline($87~88) 대비 뚜렷이 추가 급등",
      "7/28~29 FOMC는 CME FedWatch 기준 인상 확률이 16.6%로 낮아져 즉각적 인상 리스크는 완화됐으나, 6/17 점도표에서 18명 중 9명이 2026년 내 최소 1회 인상을 시사하며 신임 Warsh 의장 체제가 매파적으로 선회 — 중기 정책 불확실성이 새로 부각됨",
      "Core CPI는 6월 2.6%(둔화 유지)로 안정적이고 HY OAS도 2.71~2.73%로 타이트 유지 — 신용시장 스트레스 없음(유동성 우호 요인 지속). Fed 대차대조표 $6.72조·M2 $23.05조로 안정",
      "10Y 국채금리는 유가발 인플레 우려로 4.63~4.64%(2개월래 최고)까지 상승 — 장기금리가 확전·유가 급등에 다시 반응하기 시작",
      "美 지수는 7/22 혼조(다우 -0.01% 보합, 나스닥 -0.57%, S&P500 +0.14%) — 알파벳·테슬라 실적 경계감에 반도체·AI주 차익실현, 실적 시즌 호조가 지정학 리스크를 부분 상쇄하는 리스크온·오프 혼재 국면. 단기 '부정'은 유지하되 브렌트 $95 재돌파·확전 심화 시 '매우 부정' 하향 검토"
    ]
  },
  korea: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "코스피 7/22 매수 사이드카 이틀 연속 발동(장중 +6.20%, 7,166.00)에도 알파벳 실적 경계감·유가 상승으로 상승분 대부분 반납, 종가 +0.74%(6,797.70)로 마감 — 랠리 지속력이 하루 만에 크게 약화. 코스닥은 -0.30%(751.09)로 반락",
      "외국인은 3거래일 연속 순매수(2조6,311억원)했으나 기관이 1조3,868억원 순매도로 전환 — 외국인·기관 합산 순매수가 baseline(7/21 약 2.2조원)보다 축소(약 1.24조원)됨, 수급 모멘텀 약화",
      "한국은행 신현송 총재가 '추가 인상 가능성 모두 열려있다'고 재확인, 8월 또는 10월 추가 긴축 전망 — 7/16 인상(2.75%) 이후에도 긴축 기조가 완화되지 않고 유지",
      "원/달러 1,480.1원(전일 대비 +6.7원)으로 약세 전환 — baseline(1,473.4원) 대비 유동성 관점에서 부정적 신호",
      "반도체 수출은 7/1~20일 전년비 +52.3%(반도체 +180.6%로 7월 기준 사상 최대)로 실물 펀더멘털은 매우 강함 — 다만 이는 유동성보다 이익 모멘텀 요인이라 게이지 판단에는 제한적으로만 반영",
      "미이란 전쟁 확전·유가 재상승이 원유 수입국인 한국의 물가·경상수지에 추가 부담 요인으로 잔존"
    ]
  },
  nextCheck: "7/28~29 FOMC(동결 유력하나 매파 점도표·Warsh 의장 첫 성명서 톤 최우선 주시). 미-이란 10일 휴전안 수용 여부(확전 vs 진정 분기점) 및 브렌트유 $95 재돌파 여부. 코스피 6,800선·코스닥 750선 안착 여부, 외국인·기관 수급 개선 여부, 원/달러 1,480원대 방어. 8월 또는 10월 한은 추가 인상 여부.",
  sources: [
    "https://www.washingtonpost.com/business/2026/07/22/stock-market-dow-nasdaq/c8c78c64-860a-11f1-9cec-0fb26676f07e_story.html",
    "https://www.fool.com/coverage/stock-market-today/2026/07/22/stock-market-today-july-22-nasdaq-slides-prior-to-tesla-and-alphabet-s-earnings-after-market-close/",
    "https://www.mt.co.kr/stock/2026/07/22/2026072209285923564",
    "https://biz.heraldcorp.com/article/10816742",
    "https://www.mt.co.kr/stock/2026/07/22/2026072215245457304",
    "https://www.mt.co.kr/economy/2026/07/22/2026072215361131009",
    "https://www.cnbc.com/2026/07/22/oil-prices-iran-war-macro-rubio-brent-wti.html",
    "https://www.nbcnews.com/business/business-news/oil-prices-brent-gas-iran-war-trump-hormuz-red-sea-houthis-rcna588671",
    "https://www.cnbc.com/2026/07/21/us-iran-war-trump-hormuz-houthis.html",
    "https://polymarket.com/event/fed-decision-in-july-181",
    "https://finance.yahoo.com/economy/policy/articles/warsh-hawkish-shock-9-fed-180221394.html",
    "https://www.cnbc.com/2026/07/14/consumer-price-index-inflation-report-june-2026.html",
    "https://www.advisorperspectives.com/dshort/updates/2026/07/17/treasury-yields-snapshot-july-17-2026",
    "https://www.etoday.co.kr/news/view/2604536",
    "https://www.fnnews.com/news/202607120545564818",
    "https://markets.hankyung.com/investment/foreigner-trading"
  ]
};
