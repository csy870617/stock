// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-07-25",
  headline: "주말 사이 디에스컬레이션 신호 없이 오히려 악재가 굳어져 미국 '매우 부정'을 유지·강화합니다 — CENTCOM이 7/24~25 이란 목표물 140여 곳(이번 분쟁 최대 규모 단일 타격)을 공습했고 호르무즈 해협은 해운업계가 '통행이 사실상 없다'고 밝힐 정도로 마비, FOMC(7/28~29) 인상 확률은 한 주 만에 3배 이상(10.7%→34.7%) 뛰었습니다. 유가는 브렌트 $98~101 고변동성 구간에서 조정 중이나 구조적 상방 압력은 그대로입니다. 한국은 원/달러가 NDF 기준 1,478~1,481원 박스권으로 안정적이고 한은 구두개입·긴급조치·국민연금 매도 가속 등 '부정' 하향 트리거가 주말 사이 확인되지 않아 '신중'을 유지합니다.",
  us: {
    shortTerm: "매우 부정",
    midTerm: "신중",
    drivers: [
      "미·이란 호르무즈 해협 확전 우려로 브렌트유가 7/23 종가 배럴당 100.69달러(+약 7%, 5월 말 이후 첫 100달러 상회)·WTI 92.19달러(+약 6%) — 트럼프 대통령이 이란의 유조선 공격 시마다 이란 인프라(교량·발전소) 타격을 경고, 이란도 역내 에너지 시설 보복 시사로 확전 리스크가 유가에 지속 반영",
      "7/28~29 FOMC 인상 확률이 장중 46.5%까지 치솟았다 36.5%로 재조정 — Waller 이사(\"근원물가가 또 뜨겁게 나오면 긴축 재고 필요, 연내 추가 인상 가능\")·Cook 이사(물가 3.7%가 고용 리스크보다 우려)·Jefferson 부의장(물가 미둔화 시 인상 지지) 등 매파 발언이 잇따라 확인",
      "10Y 국채금리 4.71%로 2025년 1월 이후 최고치(4거래일 연속 상승) — 유가발 인플레 우려와 인상 베팅 재상승이 겹쳐 금융여건을 조이는 방향. 2Y 약 4.31%로 커브는 양(+)이나 3개월-10년물은 이미 역전된 후기 사이클 형태",
      "신용 스프레드는 광의 HY OAS 268bp 안팎으로 아직 크게 벌어지지 않았으나, CCC 등급 스프레드는 15개월래 최고(약 800bp 부근)로 저신용 구간에 스트레스가 선반영 시작 — 광범위 신용경색은 아니나 초기 균열 신호",
      "다만 M2 +5.6% YoY(다년 최고)로 통화량 자체는 확장 국면, 연준 대차대조표(약 6.7조 달러)·RRP·TGA(약 8,740억 달러)는 변화 없이 안정 — 중기(6~12M) 유동성 완충은 유지되나, 유가·금리·매파 발언이 동시에 겹친 단기 충격이 더 커 '매우 부정'으로 하향",
      "DXY 약 101.3~101.4로 안전자산 선호에 소폭 강세(달러 스마일 초입), VIX는 전일 대비 급등(+약 12%, 19~20선) — 리스크오프가 채권·통화·변동성 지표 전반에 동시 반영",
      "[주말 업데이트, 7/25] CENTCOM이 금요일 밤~토요일 사이 이란 목표물 140여 곳(미사일·드론 기지, 해군 전력, 탄약고, 통신망 등)을 타격 — 이번 분쟁 중 최대 규모 단일 공습이자 3주 연속 주말 교전(이번 주에만 300개 이상 지점 공격). 카타르·파키스탄 중재의 간접 협상은 진전 없이 정체, 호르무즈 해협은 해운업계 관계자가 '통행이 사실상 없다'고 밝힐 정도로 마비 — 유가는 브렌트 $98~101 구간에서 급등 후 고변동성 조정 중(추세 반전 아님). FOMC 인상 확률은 7/15 10.7%→7/22 34.7%로 3배 이상 급등해 디에스컬레이션 신호 전무 — '매우 부정' 유지·경계 강화"
    ]
  },
  korea: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "7/24 코스피 -406.27p(-5.72%) 6,690.62·코스닥 -42.06p(-5.32%) 748.22로 동반 급락, 양 시장 모두 장중 매도 사이드카 발동(코스피 2026년 41번째) — 미·이란 호르무즈 확전발 유가 급등 + 글로벌 AI 밸류에이션 부담이 동시 촉발 요인",
      "외국인 약 3.27조원·기관 약 1.95조원 순매도 vs 개인 약 5.18조원 순매수로 낙폭 일부 방어 — 삼성전자 -7.59%·SK하이닉스 -7.19% 등 반도체 대형주 집중 타격. 개인 저가매수 유입이 패닉성 투매를 완화하는 안정판 역할",
      "원/달러 전일 종가 약 1,466.8원 → 1,480원대 터치 시도(약 +5~13원, ~1% 변동)로 환율은 주가 급락(-5.7%) 대비 상대적으로 완만하게 반응 — 국내 요인에 의한 자본유출형 위기라기보다 유가발 글로벌 리스크오프 성격, '부정' 하향까지는 아직 근거 부족",
      "한은·정부 차원의 긴급 구두개입이나 임시 금리 조치는 확인되지 않음(최상목 경제부총리는 중동 불확실성에 24시간 모니터링·비상계획 점검 지시 수준) — 시장 기능은 정상 작동 중이나 국민연금의 국내주식 리밸런싱 매도(최대 약 74조원 추정, 7/1 재개) 물량이 구조적 수급 부담으로 상존",
      "경계 조건: 원화 변동성이 2거래일 연속 3% 이상으로 확대되거나 한은의 구두개입·긴급 조치가 나오면 '부정'으로 즉시 하향 검토. 반도체 수출 자체의 펀더멘털은 유지되고 있어 이번 급락은 유동성보다 유가·지정학 충격발 밸류에이션 조정 성격이 강함",
      "[주말 업데이트, 7/26] 원/달러 금요일 종가 1,466.6원 확정 후 NDF(역외선물환) 1개월물이 1,478~1,481원대에서 호가되며 '큰 이벤트 없으면 1,480~1,490원 박스권' 전망 — 급변동 신호 없음. 한은 구두개입·긴급 금통위 소집 보도 없음(정기 금통위는 7/16 기준금리 인상으로 기완료), 국민연금 매도 가속 관련 신규 보도도 없어 '부정' 하향 트리거 미충족 재확인 — '신중' 유지"
    ]
  },
  nextCheck: "7/28~29 FOMC(25bp 인상 여부·점도표·성명 톤 최우선). 미·이란 호르무즈 확전 지속 여부·브렌트 100달러대 안착·추가 급등(105달러+) 시 미국 추가 하향 검토. 코스피·코스닥 사이드카 반복 여부, 원/달러 1,480원대 안착 또는 2거래일 연속 급변 여부, 국민연금 리밸런싱 매도 속도, CCC 크레딧 스프레드 확산 여부.",
  sources: [
    "https://www.forbes.com/sites/simonmoore/2026/07/23/markets-see-chance-fed-hikes-next-week-at-july-meeting/",
    "https://www.fool.com/investing/2026/07/20/in-15-words-fed-governor-christopher-waller-just-i/",
    "https://www.federalreserve.gov/newsevents/speech/cook20260715a.htm",
    "https://tradingeconomics.com/united-states/government-bond-yield",
    "https://centralbank.watch/tools/yield-curve/us-yield-curve/",
    "https://www.bloomberg.com/news/articles/2026-07-22/stock-market-today-dow-s-p-live-updates",
    "https://www.federalreserve.gov/releases/h41/current/",
    "https://www.fxstreet.com/news/united-states-dollar-index-firms-as-hormuz-tensions-boost-safe-haven-demand-202607070911",
    "https://www.vantagemarkets.com/en/market-analysis/crude-oil-price-today-brent-wti-23-july-2026/",
    "https://www.cnbc.com/2026/07/23/oil-prices-today-wti-brent-trump-iran-hormuz.html",
    "https://en.sedaily.com/finance/2026/07/24/kospi-closes-down-40627-points-at-669062",
    "https://www.hankyung.com/article/2026072440726",
    "https://www.koreajoongang.co.kr/business/kospi-kosdaq-trigger-sellside-curbs-as-stock-market-plunge-continues/12790200",
    "https://www.edaily.co.kr/News/Read?newsId=04264006645517800",
    "https://www.fnnews.com/news/202607241628414445",
    "https://www.hankyung.com/article/202607243416i",
    "https://biz.heraldcorp.com/article/10793385",
    "https://www.investing.com/currencies/usd-krw",
    "https://www.cbsnews.com/live-updates/us-iran-war-trump-ceasefire-talks-strait-of-hormuz/",
    "https://thehill.com/policy/defense/5965142-centcom-launches-precision-munitions/",
    "https://www.fool.com/investing/2026/07/24/probability-july-fed-rate-hike-tripled-last-week/",
    "https://www.businesskorea.co.kr/news/articleView.html?idxno=273576",
    "https://www.hankyung.com/article/202607244597i"
  ]
};
