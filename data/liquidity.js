// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-07-21",
  headline: "미이란 전쟁은 여전히 진행형이나 중재국의 휴전 제안과 유가 진정으로 미국 유동성은 '부정'을 유지하되 완화 조짐이 보이고, 한국은 코스피 매수 사이드카 급반등·반도체 수출 사상 최대 실적에 힘입어 단기 유동성이 '부정'에서 '신중'으로 개선됐습니다 — 한은 긴축 기조와 코스닥 수급 부진은 여전히 부담 요인입니다.",
  us: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "美-이란 전면전 10일째 지속 — 7/21에도 호르무즈 해협에서 유조선 피격(선원 대피), 펜타곤 집계 미군 부상 100명 육박. 다만 카타르·이집트·파키스탄 등 중재국이 7/21 미국-이란에 10일 휴전안을 제시(양측 아직 미수용) — 확전과 협상 시도가 공존하는 국면",
      "브렌트유는 7/19 $90.93(6월래 최고) 이후 휴전 기대·유가 진정으로 $87~88대로 소폭 하락 — 다만 위기 이전 대비 높은 수준. 7/28~29 FOMC 인상 확률은 46.5%(직전 34%)로 여전히 높음, 7/8 의사록은 '2027년까지 인하 없음' 시사(신임 Warsh 의장 체제)",
      "다만 6월 Core CPI는 오히려 둔화(2.6% YoY, 5월 2.9%) — 유가발 헤드라인(3.5%)과 달리 근원물가는 안정적. Core PCE(5월) 3.4%로는 여전히 높은 수준이라 혼재",
      "신용시장은 견조: HY OAS 2.71~2.73%(7월 중순)로 타이트 — 시스템 리스크는 낮음. Fed 대차대조표 $6.72조로 안정(QT는 2025년 12월 종료, 이제 만기채 순roll-over 국면), M2 $23.05조로 완만한 증가 지속 — 유동성 공급 자체는 우호적 완충 요인",
      "美 증시는 7/20 이란·반도체발 하락 이후 7/21 새벽 선물이 휴전 기대·유가 진정에 소폭 반등(다우 +0.32%, 나스닥 +1.34%) — 전쟁이 실제로는 여전히 격화 중이라 단기 '부정'은 유지하되, 완화 조짐을 drivers에 반영"
    ]
  },
  korea: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "한국은행 7/16 기준금리 2.50%→2.75% 인상(3년6개월만, 금통위원 7명 만장일치) — 결정문에 '금리인상 기조를 이어 나갈 필요' 명시, 추가 긴축 시사로 중기 유동성에 부담 지속",
      "코스피 7/21 전일 대비 +3.56%(6,747.95) 급반등하며 매수 사이드카 발동(전일 매도 사이드카와 대조) — 반도체 수출 호조(7/1~20일 전년비 +52.3%, 반도체 수출 +180.6%로 7월 기준 사상 최대)와 외국인·기관 합산 약 2.2조원 순매수 전환이 동력. 코스�드도 +0.49%(753.34)로 동반 회복해 전일 급락에서 하루 만에 반전 — 단기 게이지를 '부정'에서 '신중'으로 상향한 근거",
      "원/달러 7/21 종가 1,473.4원(-5.0원)으로 소폭 강세 전환 — 다만 1,470원대 자체는 여전히 고환율 구간. 7월 외국인 수급 확정치는 아직 미확인",
      "미이란 전쟁 확전·유가 급등이 원유 수입국인 한국의 물가·경상수지에 추가 부담 요인 — 6월 CPI 3.2%(2개월 연속 3%대)로 이미 상방 압력 확인된 상태. 다만 브렌트유가 $90 고점에서 진정돼 부담은 다소 완화"
    ]
  },
  nextCheck: "7/28~29 FOMC(인상 여부·Warsh 의장 첫 성명서 톤) — 최우선. 카타르·이집트·파키스탄 중재 10일 휴전안의 수용 여부(확전 vs 진정 분기점). 호르무즈·바브엘만데브 봉쇄 및 유조선 피격 추가 발생 여부. 브렌트유 $90 재돌파 여부(인플레 기대 재점화 임계선). 코스피 6,700선·코스닥 750선 안착 지속 여부, 원/달러 1,470원대 방어. 7월 한국 외국인 수급·외환보유고 확정치 확인.",
  sources: [
    "https://www.fnnews.com/news/202607200752096147",
    "https://biz.heraldcorp.com/article/10814197",
    "https://www.cnbc.com/2026/07/13/-a-july-rate-hike-from-the-fed-the-odds-are-rising.html",
    "https://www.cnbc.com/2026/07/14/consumer-price-index-inflation-report-june-2026.html",
    "https://www.cnbc.com/2026/06/25/pce-inflation-report-may-2026-.html",
    "https://www.federalreserve.gov/monetarypolicy/bst_recenttrends.htm",
    "https://fred.stlouisfed.org/series/M2SL",
    "https://www.indexergo.com/series/?frq=M&idxDetail=13404",
    "https://www.mt.co.kr/economy/2026/07/16/2026071609223191018",
    "https://www.newspim.com/news/view/20260716000327",
    "https://www.cnbc.com/2026/07/21/us-iran-war-trump-hormuz-houthis.html",
    "https://www.axios.com/2026/07/21/iran-war-ceasefire-proposal-trump-troops",
    "https://www.irishtimes.com/world/middle-east/2026/07/21/iran-attacks-another-tanker-in-strait-of-hormuz-as-us-strikes-for-10th-night/",
    "https://www.mt.co.kr/stock/2026/07/21/2026072115201065462",
    "https://www.fnnews.com/news/202607211607246838",
    "https://www.newsis.com/view/NISX20260721_0003717269",
    "https://www.ytn.co.kr/_ln/0102_202607211032072630"
  ]
};
