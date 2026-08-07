// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-08-07",
  headline: "미국은 NFP 결과 미확인 속 ADP 부진·9월 금리인상 확률 61.9%·호르무즈 재긴장이 겹치며 단기 우호·중기 신중을, 한국은 반도체 수급발 매도가 이어지되 낙폭이 축소되고 7월 수출(+62.8% YoY)이 견조해 단기 부정·중기 신중을 유지한다 — 양국 모두 美 NFP 확정치와 BOK 8/27 회의가 다음 유동성 국면 분기점이다.",
  headlineUS: "미국은 7월 고용보고서(NFP, 8/7 08:30 ET 발표 예정)의 실제 결과가 검색 시점까지 확인되지 않아 시장 컨센서스(+80~85천 명, 실업률 4.2%)만 반영됐다. 선행지표인 ADP 민간고용이 7월 +4.4만 명으로 예상을 하회했고(8/5 발표), 9월 FOMC 금리 인상 확률이 CME FedWatch 기준 61.9%(8/4 집계)로 높게 유지되는 가운데, 호르무즈 해협에서 이란이 표적을 재타격했다는 보도로 유가가 WTI 78달러·브렌트 82달러대로 재상승하며 전일의 지정학 완화 흐름이 반전됐다. VIX는 15~16선의 안정권을 유지하고 10년물 금리는 4.61%(8/6)로 주중 하락세를 보여, 단기는 '우호', 금리 인상 리스크와 지정학 불확실성을 반영해 중기는 '신중'을 유지한다.",
  headlineKR: "코스피는 8/7 6,258.77(-0.60%)로 2거래일 연속 하락했으나 전일(-4.58% 급락) 대비 낙폭은 축소됐고, 외국인 순매도도 약 8,580억원으로 전일(3.33조원)보다 완화됐다. 코스닥은 798.81(-0.36%) 마감으로 장중 반도체(SK하이닉스 등) 약세와 외국인 매도 전환에 상승분을 반납했다. 다만 7월 수출은 988.9억달러(+62.8% YoY), 반도체 수출은 410.1억달러(+178.8% YoY)로 2개월 연속 400억달러를 넘어서며 펀더멘털은 견조함을 재확인했다. BOK 8/27 금통위의 추가 인상 가능성이 여전히 부담 요인으로 남아 단기는 '부정', 중기는 '신중'을 유지한다.",
  us: {
    shortTerm: "우호",
    midTerm: "신중",
    drivers: [
      "미국 7월 고용보고서(NFP)는 8/7 08:30 ET 발표 예정이었으나 검색 시점 기준 실제 발표치가 확인되지 않음 — 시장 컨센서스는 +80~85천 명, 실업률 4.2% 유지",
      "선행지표인 ADP 민간고용은 7월 +4.4만 명으로 시장 예상을 하회(8/5 발표)해 노동시장 둔화 신호가 이어짐",
      "CME FedWatch 기준 9월 FOMC 금리 인상 확률이 61.9%(8/4 집계)로 높게 유지돼 긴축 리스크가 상존",
      "호르무즈 해협에서 이란이 '적대 세력' 표적을 재타격했다는 보도로 유가가 WTI 78달러·브렌트 82달러대로 재상승, 전일의 지정학 완화 흐름이 반전됨",
      "VIX는 15~16선에서 안정적 유지, 10년물 국채금리는 8/6 기준 4.61%로 주 중 하락세",
    ]
  },
  korea: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "코스피 8/7 종가 6,258.77(-0.60%)로 2거래일 연속 하락, 전일(-4.58% 급락) 대비 낙폭은 축소",
      "외국인은 8/7에도 KOSPI 순매도(약 8,580억원)를 이어갔으나 전일(3.33조원)보다 매도 강도 완화, 개인·기관은 순매수로 대응",
      "코스닥은 798.81(-0.36%) 마감 — 장중 반도체(SK하이닉스 등) 약세와 외국인 매도 전환으로 상승분 반납",
      "7월 수출 988.9억달러(+62.8% YoY), 반도체 수출 410.1억달러(+178.8% YoY)로 2개월 연속 400억달러 돌파 — 펀더멘털은 견조하나 단기 수급은 위축된 상태",
      "BOK 8/27 금통위에서 강한 7월 성장세를 근거로 한 추가(연속) 금리 인상 가능성이 여전히 거론되며 단기 수급에 부담",
    ]
  },
  nextCheck: "美 7월 고용보고서(NFP) 확정치 확인, 9/16 FOMC, 한국 BOK 8/27 금통위",
  sources: [
    "https://www.cnbc.com/2026/08/06/the-july-jobs-numbers-are-due-out-friday-heres-what-to-expect.html",
    "https://www.cnbc.com/2026/08/05/private-companies-added-just-44000-workers-in-july-below-expectations-adp-reports.html",
    "https://www.cnbc.com/2026/08/06/what-fridays-jobs-report-could-mean-for-investors.html",
    "https://insight.factset.com/total-nonfarm-payrolls-for-july-2026-are-projected-to-rise-by-97500",
    "https://continuumeconomics.com/a/6815e0e3/preview-due-august-7-us-july-employment-non-farm-payrolls-stronger-than-june-but-with-a-rise-in-unemployment",
    "https://www.bloomberg.com/news/articles/2026-08-06/latest-oil-market-news-and-analysis-for-aug-7",
    "https://www.koreajoongangdaily.com/business/kospi-falls-for-second-straight-day-on-foreign-selling/12814413",
    "https://www.asiae.co.kr/en/article/2026080709423090130",
    "https://segye.com/newsView/20260807509867",
    "https://www.fnnews.com/news/202608070058206931",
    "https://biz.heraldcorp.com/article/10827691",
  ]
};
