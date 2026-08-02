// macro-liquidity-monitor 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
// 게이지 단계: "매우 우호" / "우호" / "신중" / "부정" / "매우 부정"
window.LIQUIDITY_DATA = {
  asOf: "2026-08-02",
  headline: "한국은 07/31 코스피가 +17.91%(6,595.45) 역대 최대 폭으로 반등하며 외국인이 역대 최대 규모(약 7.5조원, 기존 집계 5.7조원에서 상향 정정)를 순매수해 저점 통과 신호가 강화됐으나, 7월 CPI가 3.2%로 가속해 8/27 금통위 추가 인상 관측이 짙어져 단기 '부정'·중기 '신중'을 유지합니다. 미국은 FOMC 매파적 동결과 이란-호르무즈 갈등發 브렌트유 $100 돌파로 9월 추가 인상 확률이 82%까지 치솟았으나, 빅테크 실적 호조·안정적 신용스프레드(약 280bp)·사실상 종료된 QT가 상쇄해 '신중'을 유지합니다(2026-08-02, 일요일 휴장 — 07/31 마감 데이터 기준 재확인).",
  headlineUS: "미국 증시는 FOMC 매파적 동결(3.50~3.75%, 3인 인상 소수의견) 이후 마이크로소프트·아마존의 어닝 서프라이즈에 힘입어 7/31 3대 지수가 동반 상승 마감(다우 52,485.03·S&P 7,489.72·나스닥 25,373.85)했으나, 이란-호르무즈 해협 전운으로 브렌트유가 $100를 돌파하며 9월 추가 금리인상 확률이 CME FedWatch 기준 82%까지 치솟아 인플레이션 재점화 우려가 유동성 환경의 핵심 리스크로 부상했습니다. 연준 대차대조표는 QT 사실상 종료(6.75조 달러 동결)·M2는 완만한 증가로 유동성 위축 압력은 진정됐고 하이일드 스프레드(약 280bp)도 안정적이라 신용시장 경보는 없지만, 주말 사이 트럼프 대통령이 호르무즈 해협 추가 군사조치를 시사해 월요일 개장 전까지 지정학 리스크가 남아 있어 게이지는 '신중'을 유지합니다.",
  headlineKR: "코스피가 07/31 외국인 역대 최대 순매수(약 7.5조원)와 최태원 SK그룹 회장·노태문 삼성전자 사장 등 경영진의 책임매수에 힘입어 +17.91%(6,595.45) 역대 최대 폭으로 반등, 단기 저점 통과 신호를 재확인했습니다. 다만 7월 CPI가 3.2%로 가속(전월 3.1%)하며 8/27 금통위 추가 인상 관측이 짙어졌고 34조원 규모 레버리지 미청산 물량이 남아 있어 단기는 '부정', 중기는 '신중'을 유지합니다. 원/달러는 1,424.0원대로 안정됐고 7/31부터 단일종목 레버리지 ETF 규제가 조기 시행돼 변동성 재발 위험을 일부 억제하고 있습니다.",
  us: {
    shortTerm: "신중",
    midTerm: "신중",
    drivers: [
      "FOMC(7/28~29) 정책금리 3.50~3.75% 동결(9-3 표결) 유지, 다음 회의 9/15~16 — CME FedWatch 9월 인상 확률 82%로 급등(1주 전 53%대). 매파적 소수의견보다 이란-호르무즈 갈등發 브렌트유 $100 돌파가 더 근본적인 원인으로 확인됨.",
      "연준 대차대조표 $6.75조(7/22 기준)로 QT가 2025-12-1부로 사실상 종료돼 2026년 잔고 동결 상태, M2 $23.2조(6월)로 완만한 증가 — 유동성 위축 압력은 진정.",
      "하이일드 신용스프레드(OAS) 약 280~285bp로 10년 평균(~450bp) 대비 크게 낮은 역사적 하위권 — 신용시장 스트레스 신호 없음(다만 역사적 저점권 컴플레이시는 유의).",
      "10년물 국채금리 4.74%(FOMC 후 고점권 유지), 2s10s 스프레드 +35~46bp로 정상(비역전) 유지 — 경기침체 신호는 아님.",
      "07/31 다우 +0.53%(52,485.03)·S&P +0.7%(7,489.72)·나스닥 +1%(25,373.85) 동반 상승 마감(주간 S&P +1%), 마이크로소프트(+8%)·아마존(+8~10%)이 주도한 반면 메타(EPS 미스 -10%대)·애플(중국 매출 부진 -4%)은 약세 — 빅테크 내 온도차 뚜렷.",
      "주말(8/1~2) 이란-미국 갈등 격화 — 트럼프 대통령이 8/1 호르무즈 해협 추가 군사조치 가능성을 시사해 월요일 개장 전까지 지정학 리스크 잔존. 금주 팔란티어(8/3)·AMD(8/4) 실적과 8월 고용보고서(NFP, 8/7) 예정.",
      "[baseline 대비] liquidity-auto(스크립트)와 유사하게 '신중'으로 수렴 — 이란發 오일쇼크·9월 인상 확률 급등은 하방 요인이나 QT 사실상 종료·안정적 신용스프레드·빅테크 실적발 위험선호 회복이 상쇄해 상향 조정하지 않았다."
    ]
  },
  korea: {
    shortTerm: "부정",
    midTerm: "신중",
    drivers: [
      "코스피가 07/28(-10.84%)·07/29(-5.98%)·07/30(-1.23%, 5,593.56) 3거래일 연속 하락 후, 07/31 +17.91%(1,001.89p↑)로 역대 최대 상승률·상승폭을 기록하며 6,595.45로 마감. 코스닥도 +11.63%(719.76) 동반 급등.",
      "외국인이 유가증권시장에서 약 7.5조원(역대 최대, 기존 집계 5.7조원에서 상향 정정) 순매수, SK하이닉스 한 종목에 5조원 이상 집중 — 저점 통과 신호 강화. 개인은 약 5.2조원 순매도(차익실현).",
      "최태원 SK그룹 회장이 7/30 SK하이닉스 보통주 3,620주(약 47.9억원), 노태문 삼성전자 사장도 자사주 3,045주(약 7억원) 매입 — 다음날 SK하이닉스 +29.95%(상한가)·삼성전자 +26.81% 사상 최대 상승률 기록에 일부 기여한 경영진 책임매수 신호.",
      "7월 CPI +3.2%(전월 3.1%에서 가속)로 한은 8/27 금통위 25bp 추가 인상 관측(씨티 등) 강화 — 긴축 기조 유지 리스크.",
      "원/달러 환율 1,424.0원(07/31, -13.4원, 5개월래 최저권 근접) — 환율 리스크는 완화 지속. 단일종목 레버리지 ETF 규제가 당초 8/5·8/19 예정에서 7/31로 조기 시행(기본예탁금 1,000만→3,000만원, 현금 전액)돼 34조원 규모 마진론 미청산 잔재의 추가 청산발 변동성을 억제하려는 조치.",
      "다만 7월 전체 코스피는 -22.19%로 1997년 이후 최악의 월간 성적 — 하루 반등만으로 추세 전환을 단정하기엔 변동성이 여전히 극심하다.",
      "[baseline 대비] 신규 거래일 없음(일요일 휴장) — 07/31 데이터 정합성 재확인(외국인 순매수 5.7조→7.5조원, 환율 1,428~1,430원→1,424.0원 상향 정정) 외 등급 변경 없음, 단기 '부정'·중기 '신중' 유지."
    ]
  },
  nextCheck: "미 8월 고용보고서(NFP, 8/7), 팔란티어(8/3)·AMD(8/4) 실적 발표, 이란-호르무즈 해협 정세 및 유가 추이, 미 FOMC 9/15~16, 한국 금통위 2026-08-27(7월 CPI 3.2% 가속에 따른 추가 인상 여부), 코스피 외국인 순매수 지속성.",
  sources: [
    "https://www.hankyung.com/article/2026073181606",
    "https://www.newspim.com/news/view/20260731001224",
    "https://www.cnbc.com/2026/07/31/south-korea-kospi-samsung-sk-hynix-meltdown-record-rebound.html",
    "https://www.tradingkey.com/analysis/stocks/more/262066425-south-korea-markets-kospi-surges-18-historic-sk-hynix-tradingkey",
    "https://www.businesskorea.co.kr/news/articleView.html?idxno=273920",
    "https://www.techtimes.com/articles/322145/20260729/three-fed-dissenters-signal-september-hike-live-after-most-hawkish-fomc-vote-nearly-ten-years.htm",
    "https://www.cnbc.com/2026/07/29/fed-meeting-today-live-updates.html",
    "https://www.advisorperspectives.com/dshort/updates/2026/07/30/core-pce-inflation-at-3-3-in-june-edging-down-from-may",
    "https://www.cnbc.com/2026/07/14/consumer-price-index-inflation-report-june-2026.html",
    "https://www.fxstreet.com/news/united-states-dollar-index-slumps-as-suspected-japanese-intervention-rattles-markets-202607301554",
    "https://finance.yahoo.com/markets/live/stock-market-today-thursday-july-30-dow-sp-500-nasdaq-treasury-yields-microsoft-082255995.html",
    "https://finance.yahoo.com/markets/stocks/articles/stock-market-news-july-31-134200801.html",
    "https://finance.yahoo.com/markets/live/stock-market-today-friday-july-31-dow-sp-500-nasdaq-081227738.html",
    "https://www.bloomberg.com/news/articles/2026-07-25/fed-bank-of-england-bank-of-japan-face-100-oil-inflation-test",
    "https://www.cnn.com/2026/08/01/politics/trump-iran-war-oil-prices-strait-of-hormuz",
    "https://www.tradingkey.com/analysis/stocks/us-stocks/262067315-big-tech-earnings-scorecard-microsoft-amazon-apple-july-31-2026-tradingkey",
    "https://www.tradingkey.com/analysis/stocks/us-stocks/262067492-august-3-7-2026-preview-palantir-amd-sandisk-earnings-nfarm-payrolls-tradingkey"
  ]
};
