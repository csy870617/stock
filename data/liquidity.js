// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-08-04",
  headline: "한국은 08/04 코스피가 장중 -2.83%까지 밀렸다가 개인 순매수에 힘입어 +1.62%(6,358.95)로 V자 반전했으나 외국인·기관은 여전히 순매도를 이어가 수급 개선은 확인되지 않아 단기 '부정'을 유지합니다(8/27 금통위 추가 인상 우려도 지속). 미국은 08/03 이란 협상 재개 기대·유가 급락에 다우가 사상 최고치를 경신했으나 08/04 이란이 협상설을 부인하며 랠리 탄력이 둔화됐고, 8/7 고용보고서 대기로 '신중'을 유지합니다.",
  headlineUS: "이란 협상 기대에 사상최고치까지 갔던 랠리가 하루 만에 숨 고르기 국면 — 신용스프레드는 여전히 안정적이나 이란 협상 불확실성과 8/7 고용보고서 대기로 단기·중기 모두 신중 유지.",
  headlineKR: "코스피가 전일 급락(-5.12%)을 하루 만에 되돌리며 +1.62%로 V자 반등했으나 외국인·기관은 여전히 순매도(각 -3,706억/-5,392억)를 이어가 수급 안정으로 보기는 이르다. 한은이 8월 27일 추가 금리 인상 가능성을 열어둔 점도 단기 유동성엔 부담이다.",
  us: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "8/3(월) 뉴욕 3대 지수 급등(S&P500 +1.48%, 다우 +693p 사상최고, 나스닥 +2.1%) — 이란-오만 협상 재개 기대·유가 WTI 약 -5% 급락이 촉매.",
      "8/4 개장 전 선물은 소폭 상승에 그침(다우 +0.18%, S&P +0.06%, 나스닥100 +0.07%) — 이란이 협상 일정을 부인하고 트럼프도 이란 지도부 비판, 호르무즈 재개 여부 미확정으로 지정학 리스크 지속.",
      "하이일드 신용스프레드 281bp 안팎(장기 중앙값 450bp 대비 역사적 최저권), MOVE지수도 안정적 — 신용시장은 여전히 완화적(carry-friendly)이나 밸류에이션 여유는 크지 않음.",
      "6월 비농업고용 +5.7만(예상 대폭 하회, 5월도 12.9만으로 하향)으로 9월 인하 기대가 되살아나는 분위기지만 확률 편차가 커 신뢰도 낮음; 8/7(금) 7월 고용보고서가 9월 FOMC 인하 폭을 결정할 최대 변수로 임박."
    ]
  },
  korea: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "코스피 8/3 -5.12%(6,257.45) → 8/4 +1.62%(6,358.95) V자 반등, 코스닥 +5.88%로 3거래일 연속 매수 사이드카 — 극심한 변동성 지속.",
      "8/4 개인 +8,184억 순매수 vs 기관 -5,392억·외국인 -3,706억 순매도 — 반등에도 외국인·기관 수급은 여전히 부정적.",
      "한국은행 기준금리 2.75%에서 8/27 금통위 추가 인상 가능성 보도(경기 서프라이즈 vs 연속 인상 부담 사이 갈림) — 긴축 리스크 상존.",
      "원/달러 환율 1,420~1,435원대 박스권, 전일 대비 소폭 하락(-5.8원) — 환율 자체는 급격한 악화는 아님.",
      "삼성전자·SK하이닉스 프리마켓 급등 후 상승분 반납, 약세 마감 — 반도체 대형주 차익실현 매물 지속.",
      "[baseline 대비] baseline(단기 매우 부정·중기 부정)은 20일 낙폭 floor 기준의 후행 판정 — 오늘 반등 폭·코스닥 사이드카를 감안하면 '부정/신중'이 현재 국면에 더 부합한다고 판단해 채택하지 않음."
    ]
  },
  nextCheck: "미 8월 고용보고서(NFP, 8/7), 이란-호르무즈 해협 정세 및 유가 추이(협상 성사 여부), 미 FOMC 9/15~16, 한국 금통위 2026-08-27(7월 CPI 3.2% 가속에 따른 추가 인상 여부), 코스피·코스닥 수급 정상화 여부(외국인·기관 순매도 전환 시점).",
  sources: [
    "https://www.cnbc.com/2026/08/02/stock-market-today-live-updates.html",
    "https://www.thestreet.com/stock-market-today/stock-market-today-aug-3-2026-dow-futures-climb-as-oil-slides-on-renewed-iran-talks",
    "https://www.benzinga.com/markets/equities/26/08/60894610/trump-iran-talks-dow-futures-oil-prices",
    "https://www.aljazeera.com/economy/2026/8/4/us-stocks-near-record-high-oil-falls-as-trump-claims-iran-talks-underway",
    "https://convextrade.com/metrics/bamlh0a0hym2",
    "https://www.kiplinger.com/investing/economy/this-weeks-economic-calendar",
    "https://www.newspim.com/news/view/20260804001266",
    "https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=05582566645544040",
    "https://www.businesskorea.co.kr/news/articleView.html?idxno=274066",
    "https://www.fnnews.com/news/202608040943467110",
    "https://kbthink.com/investment/fx/daily/260804.html"
  ]
};
