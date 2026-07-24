// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-07-23",
  headline: "미국은 M2 확장(+5.6% YoY)·초타이트 신용(HY OAS 268bp)으로 중기 유동성 완충이 있으나, 미·이란 호르무즈 봉쇄에 따른 유가 급등(WTI +6.37%·약 $92)·연준 매파·Core PCE 재가속(2.8%)으로 단기 '부정'을 유지합니다. 한국은 7/23 외국인 2.1조 순매수로 코스피가 +4.40% 급반등해 단기 급락 리스크는 완화됐으나, 한은 긴축 전환(2.75%)·3%대 물가·1,480원 고환율로 '신중'을 유지합니다 — 글로벌 완화 온기 속 한국만 긴축으로 역행하는 국면입니다.",
  us: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "미·이란 전쟁이 호르무즈 해협 봉쇄 재가동으로 재격화 — WTI 유가가 7/23 하루 +6.37% 급등해 배럴당 약 92달러까지 상승. 유가발 인플레·비용 충격이 단기 유동성의 최대 부담",
      "7/28~29 FOMC에서 25bp 인상 가능성이 약 46.5%로 부상하고 연말 점도표 중앙값도 상향(약 3.8%) — 매파 편향에 10Y 국채금리 4.70%(2025.1 이후 최고), 10Y-2Y 커브 +0.35%p로 정상화",
      "Core PCE 6월 2.8% YoY로 예상(2.7%) 상회·전월 대비 재가속 — 물가 둔화 지연이 완화 기대를 늦춤",
      "다만 M2 +5.6% YoY(다년 최고, 약 $23.1조)로 통화량은 확장 국면이고 HY OAS 268bp로 신용 스프레드는 매우 타이트 — 중기(6~12M) 유동성은 '신중~우호' 로 완충. 약달러(DXY ~100~101)도 글로벌 유동성엔 우호",
      "美 지수 7/23 하락(나스닥 -2.18%·S&P500 -1.21%·다우 -1.01%) — 테슬라(-14%)·알파벳(-7%) 실적 후 급락에 기술주 약세. 단기 '부정' 유지, 브렌트 $95 재돌파·확전 심화 시 '매우 부정' 하향 검토"
    ]
  },
  korea: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "코스피 7/23 +4.40%(7,096.89)로 7,000선 급반등·코스닥 +5.22%(790.28) — 외국인 약 2조1,351억원 대규모 순매수가 단기 급락 리스크를 완화(신중 유지, 부정으로 하향하지 않음)",
      "한국은행 7/16 기준금리 2.75%로 인상(3년 6개월 만의 긴축 전환)·추가 인상 가능성 시사 — 긴축 기조가 완화되지 않아 유동성 상단을 제약",
      "CPI 6월 3.2% YoY(전월 3.1%서 상승)·근원 2.5% — 고물가 지속이 완화 여지를 좁힘",
      "원/달러 약 1,480원의 고환율 — 수입물가·자본유출 압력으로 유동성 관점 부정적 신호",
      "반도체 수출은 사상 최대 수준으로 실물 펀더멘털은 강하나, 이는 유동성보다 이익 모멘텀 요인이라 게이지 판단엔 제한적으로만 반영"
    ]
  },
  nextCheck: "7/28~29 FOMC(25bp 인상 여부·점도표·성명 톤 최우선). 미·이란 호르무즈 봉쇄 지속·유가($95) 추가 급등 여부. 코스피 7,000선 안착·외국인 순매수 지속 여부, 원/달러 1,480원대 방어, 한은 8·10월 추가 인상 여부, Core PCE·M2 후속 지표.",
  sources: [
    "https://finance.yahoo.com/markets/stocks/articles/p-500-dow-nasdaq-end-223400729.html",
    "https://www.cnbc.com/2026/07/23/treasury-yields-oil-prices-jobless-claims.html",
    "https://www.cnbc.com/2026/07/13/-a-july-rate-hike-from-the-fed-the-odds-are-rising.html",
    "https://seekingalpha.com/article/4807167-core-pce-inflation-rises-2-8-percent-in-june-higher-than-expected",
    "https://tradingeconomics.com/united-states/bofa-merrill-lynch-us-high-yield-option-adjusted-spread-fed-data.html",
    "https://en.macromicro.me/series/18359/us-m2-stock-monthly-yoy",
    "https://tradingeconomics.com/commodity/crude-oil",
    "https://www.mt.co.kr/stock/2026/07/23/2026072315015067484",
    "https://www.fnnews.com/news/202607231605160464",
    "https://m.joseilbo.com/news/view.htm?newsid=572037",
    "https://ko.tradingeconomics.com/south-korea/inflation-cpi/news/467164",
    "https://www.newsis.com/view/NISX20260724_0003721525"
  ]
};
