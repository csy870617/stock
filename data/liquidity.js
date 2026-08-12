// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  "asOf": "2026-08-12",
  "headline": "미 CPI가 예상외로 뜨겁게(코어 전년비 3.1%, 2월來 최고) 나와 9월 금리인하 기대가 후퇴하고 국채금리·유가가 동반 급등한 가운데, 국내 증시는 미 반도체·AI 수급 훈풍과 외국인 대규모 순매수에 힘입어 코스피가 3.68% 급등해 대외 인플레 리스크와 국내 반도체 모멘텀이 상반되게 작용했다.",
  "headlineUS": "7월 CPI 코어가 전월비 +0.32%(예상 0.2%)·전년비 3.1%(2월來 최고)로 예상을 상회해 9월 FOMC 금리인하 기대가 반반으로 후퇴했고, 호르무즈 해협 재봉쇄 우려로 유가가 급등하며 10년물 금리가 이달 최고 4.7%대로 올라섰다. HY스프레드·VIX는 아직 안정적이나 인플레·유가발 긴축 리스크가 단기 우호도를 낮췄다.",
  "headlineKR": "코스피가 삼성전자·SK하이닉스 반도체 대형주 급등과 외국인 2.8조원 순매수에 힘입어 3.68% 급등(매수 사이드카 발동)했으나, 코스닥은 온기가 미치지 못해 대형주 쏠림 장세였다. 원화는 1412.9원으로 10개월래 최약세권에 머물렀고 8/27 금통위 매파적 동결 전망이 중기 판단을 신중에 묶어 뒀다.",
  "us": {
    "shortTerm": "부정",
    "midTerm": "신중",
    "drivers": [
      "7월 CPI가 예상보다 뜨겁게 나옴 — 코어 CPI 전월비 +0.32%(예상 0.2%), 전년비 +3.1%로 2월 이후 최고치. 관세發 상품가(가구·레저용품)·항공료 반등·의료비 등 서비스 인플레가 주도(FXStreet 8/12).",
      "미 10년물 국채금리가 8/10~11 4.7%대로 이달 최고치까지 상승 — 유가 급등에 따른 인플레 우려가 채권시장에 선반영됐고, CPI 발표 이후 추가 상승 압력 존재.",
      "브렌트유 8/12 장중 $89대(WTI $84대)로 호르무즈 해협 재봉쇄 우려 지속 — 이란-미 협상 교착과 유조선 공격 소식에 유가가 재차 튐(연초 대비 +24%대).",
      "HY 신용스프레드는 271~273bp(8/6 기준)로 여전히 역사적 타이트 구간, VIX도 15.4로 안정적 — 신용·변동성 채널에서는 아직 경고 신호가 없어 '매우 부정'까지는 아님.",
      "CME FedWatch 상 9월 FOMC 금리인하 확률이 코인토스 수준으로 후퇴 — 고용 둔화와 인플레 재점화 사이 갈등이 커짐.",
      "S&P500이 8/9~8/10 이틀 연속 하락(8/10 -0.32% → 7728.20) 이후 CPI 발표 — JPMorgan 시나리오상 코어 0.3%+ 시 S&P 추가 1.5~2.5% 조정 가능권으로, 발표 직후 위험자산 하방 압력이 우세할 전망."
    ]
  },
  "korea": {
    "shortTerm": "우호",
    "midTerm": "신중",
    "drivers": [
      "코스피 8/12 전일比 233.51p(+3.68%) 급등해 6579.04 마감, 3거래일 연속 상승 — 삼성전자 +6.68%, SK하이닉스 +5.54% 등 반도체 대형주가 견인(세계일보·이투데이 8/12).",
      "외국인 2조8357억원·기관 5278억원 순매수, 개인은 3조1913억원 순매도 — 코스피200선물 급등으로 프로그램 매수 사이드카까지 발동.",
      "미국 AI 인프라 투자 훈풍(CoreWeave 매출 +112%YoY·백로그 1040억달러, 엔비디아 대규모 AI 컴퓨팅 펀드 추진 소식)이 국내 반도체 수급 심리를 자극 — 미 증시 약세에도 국내 반도체는 역행 강세.",
      "코스닥은 반도체 온기 확산이 제한적으로 약세를 보여(대형주 쏠림 장세) 중소형·성장주 체감 온도차가 지속됨.",
      "원/달러 환율 1412.9원(8/12 오전 9시)으로 전일 10개월래 최저(1415.9원) 대비 소폭 강세되었으나 여전히 약세권 — 외국인 순매수에도 환율 개선은 제한적.",
      "한국은행이 7월 기준금리를 2.75%로 인상한 데 이어 8/27 금통위는 매파적 동결(1~2인 인상 소수의견 가능성) 전망 — GDP·물가 전망 상향 시사되며 통화완화 기대는 후퇴, 중기 판단을 '신중'에 묶는 요인."
    ]
  },
  "nextCheck": "8/12 미 CPI 발표 이후 시장 최종 반응 확인, 8/13 PPI, 8/27 한은 금통위(기준금리 동결 여부·소수의견), 9/11 미 8월 CPI, 9/15-16 FOMC",
  "sources": [
    "https://www.fxstreet.com/analysis/july-cpi-broad-heat-in-the-core-202508121356",
    "https://www.cnbc.com/2026/08/10/stock-market-today-live-updates.html",
    "https://www.cnbc.com/2026/08/09/stock-market-today-live-updates.html",
    "https://www.investing.com/indices/volatility-s-p-500",
    "https://convextrade.com/metrics/bamlh0a0hym2",
    "https://tradingeconomics.com/united-states/bofa-merrill-lynch-us-high-yield-option-adjusted-spread-fed-data.html",
    "https://www.aljazeera.com/economy/2026/8/12/oil-prices-rise-as-attacks-dent-hopes-for-strait-of-hormuz-reopening",
    "https://www.cnbc.com/2026/08/11/oil-prices-today-us-crude-84.html",
    "https://www.newsis.com/view/NISX20260812_0003745529",
    "https://www.etoday.co.kr/news/view/2613802",
    "https://segye.com/newsView/20260812518853",
    "https://www.mstoday.co.kr/news/articleView.html?idxno=102301",
    "https://biz.heraldcorp.com/article/10839198",
    "https://economist.co.kr/article/view/ecn202608060049",
    "https://www.newsfc.co.kr/news/articleView.html?idxno=80371",
    "https://segye.com/newsView/20260812507087"
  ]
};
