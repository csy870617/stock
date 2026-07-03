// stock-recommender 스킬 분석 결과 데이터
// 갱신 방법: README.md 참고 (스킬 재실행 → 이 파일 갱신 → git push)
window.STOCK_DATA = {
  generatedAt: "2026-07-03",
  marketNote: "AI 메모리 슈퍼사이클로 코스피 반도체가 급등락을 반복하는 고변동성 구간(7/3 삼성전자 +8.2% 반등). 미국은 빅테크 AI 캐펙스 부담으로 MSFT·NVDA 등이 조정을 받아 선별적 저가 매수 기회가 열린 상태. 반도체 비중이 높은 포트폴리오는 금융·필수소비 등 방어주로 변동성 완충 권장.",
  disclaimer: "본 페이지의 내용은 정보 제공 목적이며 투자 권유가 아닙니다. 목표가는 증권사 컨센서스 기준이며 실제 주가와 다를 수 있습니다. 모든 투자 판단과 책임은 투자자 본인에게 있습니다.",
  korea: [
    {
      name: "삼성전자", ticker: "005930", market: "KOSPI",
      price: 309500, priceDate: "2026-07-03", targetPrice: 432600, upside: 39.8, dividendYield: 0.5,
      earnings: "2026년 1분기 매출 133.9조원, 영업이익 57.2조원(영업이익률 42.8%)으로 역대 최대 분기 실적 (영업이익 전년比 +755%)",
      thesis: "AI 메모리 슈퍼사이클의 최대 수혜주로 HBM·서버 D램·eSSD 가격 급등에 힘입어 사상 최대 실적을 경신 중. 순현금의 압도적 재무 건전성, 분기배당·자사주 소각의 주주환원 이력, 반도체+모바일+가전 다각화로 중장기 핵심 보유에 적합. 급등 후에도 컨센서스 목표가(432,600원, 최신 리포트는 56만~58.5만원) 대비 상승여력이 남아 있다.",
      risks: ["메모리 사이클 고점 논란과 급등 후 변동성 확대 (7/2 급락 → 7/3 +8.2% 반등)", "가격 급등에 따른 수요처 구매 저항 및 증설발 공급 과잉 전환 가능성"],
      tier: 1,
      chartUrl: "https://finance.naver.com/item/main.naver?code=005930",
      sources: ["https://news.samsung.com/kr/", "https://www.joongangenews.com/news/articleView.html?idxno=530305", "https://www.investing.com/equities/samsung-electronics-co-ltd"]
    },
    {
      name: "SK하이닉스", ticker: "000660", market: "KOSPI",
      price: 2187000, priceDate: "2026-07-02", targetPrice: 4000000, upside: 82.9, dividendYield: 0.1,
      earnings: "2026년 1분기 매출 52.58조원(사상 첫 50조 돌파), 영업이익 37.61조원(영업이익률 72%)으로 창사 이래 최고 실적",
      thesis: "HBM 주도권으로 코스피 시가총액 1위에 오른 대표 성장주. 1년간 800% 이상 급등하고도 증권사 목표가는 400만~430만원으로 계속 상향 중이며, 7월 10일 나스닥 ADR 상장·순현금 100조원 목표·자사주 매입 검토가 리레이팅 촉매. 배당은 미미해 성장성에 베팅하는 포지션.",
      risks: ["단기 과열 — 연초 이후 +300% 급등에 따른 차익실현 압력과 극심한 변동성", "메모리 사이클 반전 시 이익 급감 및 HBM 경쟁 심화 (삼성전자·마이크론)"],
      tier: 2,
      chartUrl: "https://finance.naver.com/item/main.naver?code=000660",
      sources: ["https://news.skhynix.co.kr/q1-2026-business-results/", "https://www.newspim.com/news/view/20260701000135", "https://www.kedglobal.com/korean-chipmakers/newsView/ked202606220007"]
    },
    {
      name: "현대차", ticker: "005380", market: "KOSPI",
      price: 493000, priceDate: "2026-07-02", targetPrice: 744562, upside: 51.0, dividendYield: 2.0,
      earnings: "2026년 1분기 매출 45.94조원(+3.4%, 역대 최대), 영업이익 2.51조원(-30.8%, 미국 관세 8,600억원 반영)",
      thesis: "매출은 역대 최대를 이어가나 미국 관세·환율발 충당부채로 이익이 눌린 상태 — 악재가 주가에 상당 부분 반영된 구간. 지배주주 순이익 25% 이상 배당 정책과 분기배당(연 약 2%)으로 주주환원이 제도화되어 있고, 로보틱스 가치 재평가로 목표가 상향(메리츠·현대차증권 95만원)이 이어지는 중.",
      risks: ["미국 관세 부담 지속으로 분기당 수천억원대 이익 훼손", "원·달러 환율 변동에 따른 판매보증충당부채 증가"],
      tier: 2,
      chartUrl: "https://finance.naver.com/item/main.naver?code=005380",
      sources: ["https://www.hyundaimotorgroup.com/ko/news/hyundai-motor-company-2026-first-quarter-earnings", "https://www.investing.com/equities/hyundai-motor-consensus-estimates"]
    },
    {
      name: "기아", ticker: "000270", market: "KOSPI",
      price: 145200, priceDate: "2026-07-02", targetPrice: 228567, upside: 57.4, dividendYield: 4.8,
      earnings: "2026년 1분기 매출 29.50조원(+5.3%, 역대 최대), 영업이익 2.21조원(-26.7%, 미국 관세 7,550억원 반영)",
      thesis: "관세 여파로 이익이 감소했음에도 매출·판매대수는 역대 최대를 경신 중인 PER 5~6배의 대표 저평가주. 2026년 예상 DPS 7,200원(배당수익률 약 4.8%)으로 배당 매력이 가장 높아 저평가·배당 기회 관점에 적합. 평균 목표가 228,567원으로 상승여력이 크지만 관세 불확실성 해소가 전제.",
      risks: ["미국 관세 장기화 시 이익률 추가 훼손", "AI·반도체 주도 장세에서 자동차 업종 소외로 밸류에이션 갭 해소 지연 가능성"],
      tier: 3,
      chartUrl: "https://finance.naver.com/item/main.naver?code=000270",
      sources: ["https://worldwide.kia.com/ko/newsroom-korea/view/?id=1513", "https://www.investing.com/equities/kia-motors"]
    },
    {
      name: "KB금융", ticker: "105560", market: "KOSPI",
      price: 169800, priceDate: "2026-07-02", targetPrice: 195750, upside: 15.3, dividendYield: 3.0,
      earnings: "2026년 1분기 지배주주 순이익 1조8,924억원(+11.5%, 전망치 상회), 역대 최대 비이자이익·비은행 비중 43%",
      thesis: "국내 대표 금융지주로 은행·비은행 균형 포트폴리오에서 사상 최대 이익 경신 중. 2.3조원 자사주 전량 소각 등 밸류업 주주환원의 선두 주자로, 배당 약 3% + 소각을 더한 총주주환원 관점에서 반도체 급등장의 변동성을 완충하는 중장기 안정 보유 성격. 애널리스트 20명 전원 매수 의견.",
      risks: ["금리 하락 사이클 진입 시 순이자마진(NIM) 축소", "2년새 87% 급등에 따른 외국인 순매도 및 단기 조정 가능성"],
      tier: 1,
      chartUrl: "https://finance.naver.com/item/main.naver?code=105560",
      sources: ["https://www.investing.com/equities/kb-financial-group", "https://www.inthenews.co.kr/news/article.html?no=86009"]
    },
    {
      name: "신한지주", ticker: "055550", market: "KOSPI",
      price: 96900, priceDate: "2026-07-03", targetPrice: 120370, upside: 24.2, dividendYield: 2.9,
      earnings: "2026년 1분기 지배주주 순이익 1조6,226억원으로 분기 기준 사상 최대, 컨센서스 5% 상회",
      thesis: "밸류업 2.0 하에 주주환원율을 2026년 51.7%→2027년 54%로 상향하고 3년간 DPS 연 10% 이상 증액을 약속한 대표적 주주친화 금융주. 은행 순이자이익 성장과 증권 자회사 정상화로 2026년 순이익 5.6조원대 전망 — 2월 고점 대비 조정받은 현 주가는 저평가 구간.",
      risks: ["기준금리 인하 시 NIM 축소로 이자이익 성장 둔화", "내수 경기 부진에 따른 대손비용 증가 가능성"],
      tier: 1,
      chartUrl: "https://finance.naver.com/item/main.naver?code=055550",
      sources: ["https://www.investing.com/equities/shinhan-financial-group", "https://www.businesskorea.co.kr/news/articleView.html?idxno=268324"]
    },
    {
      name: "NAVER", ticker: "035420", market: "KOSPI",
      price: 195800, priceDate: "2026-07-03", targetPrice: 300308, upside: 53.4, dividendYield: 1.3,
      earnings: "2026년 1분기 매출 3조2,411억원(+16.3%), 영업이익 5,418억원(+7.2%) — AI 접목 효과로 매출 확대",
      thesis: "AI·커머스 중심의 두 자릿수 매출 성장이 지속되는 성장주임에도 주가는 52주 저점 부근 — 26개 증권사 평균 목표가(약 30만원) 대비 괴리가 50%를 넘는 성장+저평가 조합. AI 인프라 투자로 단기 마진은 눌리지만 중장기 성장 동력 확보 과정으로 분할 매수 기회로 평가.",
      risks: ["글로벌 AI 경쟁 심화에 따른 검색·광고 점유율 잠식 우려", "AI 인프라 투자 확대로 영업이익률 개선 지연"],
      tier: 2,
      chartUrl: "https://finance.naver.com/item/main.naver?code=035420",
      sources: ["https://www.investing.com/equities/nhn-corp-consensus-estimates", "https://www.cbci.co.kr/news/articleView.html?idxno=571305"]
    },
    {
      name: "KT&G", ticker: "033780", market: "KOSPI",
      price: 172700, priceDate: "2026-07-02", targetPrice: 193000, upside: 11.8, dividendYield: 3.5,
      earnings: "2026년 1분기 매출 1조7,036억원(+14.3%), 영업이익 3,645억원(+27.6%) — 해외 담배 성장 주도",
      thesis: "경기 방어적 담배 사업에 해외 생산·판매 확대가 더해지며 회사 목표를 웃도는 실적을 내는 대표 배당주. DPS 최소 6,000원(600원 이상 증액)과 FY2024~2027 약 2.4조원 배당 계획 등 주주환원이 확고해 중장기 안정 보유에 적합. 다만 1년간 급등해 목표가 대비 상승여력은 제한적.",
      risks: ["국내 흡연 인구 감소와 담배 규제 강화", "주가 급등 이후 밸류에이션 부담 및 환율 변동"],
      tier: 1,
      chartUrl: "https://finance.naver.com/item/main.naver?code=033780",
      sources: ["https://www.investing.com/equities/kt-g-corp", "https://kbthink.com/securities-view.html?docId=20260408152522820K"]
    },
    {
      name: "삼성물산", ticker: "028260", market: "KOSPI",
      price: 412000, priceDate: "2026-07-02", targetPrice: 612000, upside: 48.5, dividendYield: 0.8,
      earnings: "2026년 1분기 매출 10조4,660억원, 영업이익 7,200억원(-0.6%) — 상사 호조(+73%), 건설 부진",
      thesis: "삼성전자·삼성생명·삼성바이오로직스 지분가치가 NAV의 90% 이상인데 주가는 PBR 0.7배 수준인 대표적 NAV 할인 저평가주. 삼성전자 특별배당 기대로 최근 한 달 새 증권사들이 목표가를 59만~63만원으로 일제히 상향했고, 배당 확대 등 주주환원 강화 여지가 큼. 7/2 5%대 급락으로 진입 기회가 열린 상태.",
      risks: ["건설 부문 실적 부진 지속", "보유 계열사 주가에 연동되는 NAV 변동성 및 지배구조 이슈"],
      tier: 3,
      chartUrl: "https://finance.naver.com/item/main.naver?code=028260",
      sources: ["https://view.asiae.co.kr/article/2026061908243827450", "https://www.inthenews.co.kr/news/article.html?no=86290"]
    },
    {
      name: "HD현대중공업", ticker: "329180", market: "KOSPI",
      price: 564000, priceDate: "2026-06-28", targetPrice: 883955, upside: 56.7, dividendYield: 0.9,
      earnings: "2026년 1분기 매출 5조9,163억원(+54.8%), 영업이익 9,054억원(+108.8%) 깜짝 실적, 수주 61.2억달러(+29.6%)",
      thesis: "조선 슈퍼사이클과 고선가 물량 매출 인식으로 이익이 배 이상 급증하는 고성장 국면. 12개월 평균 목표가 883,955원(최고 104만원) 대비 상승여력 50% 이상. 데이터센터용 엔진 등 신성장 스토리와 배당총액 3배 확대·주주환원율 40% 달성 등 주주환원도 빠르게 강화 중이나, 성장 축으로 접근할 종목.",
      risks: ["조선 사이클 둔화 및 후판가·환율 변동에 따른 마진 훼손", "52주 37만~76.5만원의 높은 주가 변동성"],
      tier: 2,
      chartUrl: "https://finance.naver.com/item/main.naver?code=329180",
      sources: ["https://www.mt.co.kr/stock/2026/05/08/2026050808381416863", "https://www.newspim.com/news/view/20260611000296"]
    }
  ],
  us: [
    {
      name: "Microsoft", ticker: "MSFT", market: "NASDAQ",
      price: 384.28, priceDate: "2026-07-01", targetPrice: 561.11, upside: 46.0, dividendYield: 0.9,
      earnings: "FY26 3분기 매출 829억 달러(+18%), EPS 4.27달러로 컨센서스 상회, Azure +40% 성장",
      thesis: "AI 캐펙스 부담과 잉여현금흐름 감소 우려로 고점 대비 21% 이상 하락(M7 중 최저 수익률)했지만, 매출 +18%·Azure +40%·AI 사업 연환산 370억 달러(+123%) 등 펀더멘털은 견조. 구독 기반의 안정적 현금흐름과 AAA급 재무 건전성을 갖춘 핵심 보유 종목으로, 현재 조정이 중장기 저평가 매력을 더해준다. 컨센서스 Strong Buy, 상승여력 40%+.",
      risks: ["연 1,900억 달러 AI 캐펙스로 인한 잉여현금흐름·마진 압박", "OpenAI 관계 재편 및 AI 투자 회수 지연 리스크"],
      tier: 1,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/MSFT.O/total",
      sources: ["https://www.tipranks.com/stocks/msft/forecast", "https://news.microsoft.com/source/2026/04/29/microsoft-cloud-and-ai-strength-fuels-third-quarter-results/"]
    },
    {
      name: "Alphabet", ticker: "GOOGL", market: "NASDAQ",
      price: 355.05, priceDate: "2026-07-02", targetPrice: 433.59, upside: 22.1, dividendYield: 0.2,
      earnings: "2026년 1분기 매출 1,099억 달러(+22%), EPS 5.11달러(+81%), 구글 클라우드 +63% 성장",
      thesis: "검색 광고의 독점적 현금창출력 위에 클라우드가 +63%로 재가속하며 성장 엔진이 이원화. 영업이익률 36.1%로 수익성도 동반 확장 중이며, 순현금 재무구조에 배당 개시·대규모 자사주 매입 등 주주환원도 강화되고 있어 안정성과 성장성을 겸비한 핵심 보유 종목.",
      risks: ["연 1,800억~1,900억 달러 AI 캐펙스 확대에 따른 이익률 부담", "AI 챗봇 경쟁·반독점 규제로 인한 검색 점유율 침식 가능성"],
      tier: 1,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/GOOGL.O/total",
      sources: ["https://stockanalysis.com/stocks/googl/forecast/", "https://www.cnbc.com/2026/04/29/alphabet-googl-q1-2026-earnings.html"]
    },
    {
      name: "NVIDIA", ticker: "NVDA", market: "NASDAQ",
      price: 194.83, priceDate: "2026-07-02", targetPrice: 301.62, upside: 54.8, dividendYield: 0.5,
      earnings: "FY27 1분기 매출 816억 달러(+85%), 비GAAP EPS 1.87달러, 데이터센터 매출 752억 달러(+92%)",
      thesis: "매출 +85%·데이터센터 +92%·총마진 75%의 압도적 성장에도 주가는 52주 저점 부근까지 밀려 컨센서스 목표가 대비 55% 내외 상승여력이 열린 전형적 저평가·기회 구간. 2분기 매출 가이던스 910억 달러로 성장 가시성이 유지되고 배당 25배 증액·800억 달러 자사주 매입 승인 등 주주환원도 본격화. 변동성을 감내할 수 있는 기회 추구형 포지션에 적합.",
      risks: ["AI 인프라 투자 사이클 둔화 시 실적·멀티플 동반 조정 (변동성 매우 큼)", "빅테크 자체 칩(커스텀 ASIC) 확산 및 대중국 수출 규제"],
      tier: 3,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/NVDA.O/total",
      sources: ["https://www.tipranks.com/stocks/nvda/forecast", "https://www.cnbc.com/2026/05/20/nvidia-nvda-earnings-report-q1-2027.html"]
    },
    {
      name: "Broadcom", ticker: "AVGO", market: "NASDAQ",
      price: 406.54, priceDate: "2026-07-01", targetPrice: 516.91, upside: 27.2, dividendYield: 0.7,
      earnings: "FY26 2분기 매출 221.9억 달러(+48%), 비GAAP EPS 2.44달러, AI 반도체 매출 108억 달러(+143%)",
      thesis: "구글·메타·OpenAI·Anthropic 등을 고객으로 둔 커스텀 AI 가속기·네트워킹 반도체의 최대 수혜주. AI 매출 +143%에 3분기 가이던스는 +200%(160억 달러)로 성장 가시성이 매우 높고, EBITDA 마진 69%·14년 연속 배당 인상의 주주친화 이력까지 갖춰 성장과 균형을 모두 충족. VMware 소프트웨어 매출이 실적 안정성을 보완.",
      risks: ["소수 하이퍼스케일러 고객 집중에 따른 주문 변동 리스크", "AI 기대가 선반영된 높은 밸류에이션"],
      tier: 2,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/AVGO.O/total",
      sources: ["https://www.tipranks.com/stocks/avgo/forecast", "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial"]
    },
    {
      name: "Amazon", ticker: "AMZN", market: "NASDAQ",
      price: 243.00, priceDate: "2026-07-02", targetPrice: 312.99, upside: 28.8, dividendYield: 0.0,
      earnings: "2026년 1분기 매출 1,815억 달러(+17%), EPS 2.78달러, AWS +28%(376억 달러)로 15분기 만의 최고 성장",
      thesis: "AWS가 +28%로 15분기 만에 최고 성장률을 회복했고 자체 AI 칩이 연환산 200억 달러(세 자릿수 성장), 광고가 연 700억 달러 규모로 커지며 고마진 사업 비중이 구조적으로 확대 중. 영업이익률 13.1%로 사상 최고 — 이익 레버리지가 본격화되는 성장·균형형 종목. 배당은 없지만 현금흐름 재투자를 통한 복리 성장이 강점.",
      risks: ["분기 442억 달러에 달하는 AI 캐펙스 급증으로 인한 현금흐름 부담", "소매 부문 경기 민감성 및 1분기 EPS 중 Anthropic 평가익 비중(이익의 질 이슈)"],
      tier: 2,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/AMZN.O/total",
      sources: ["https://stockanalysis.com/stocks/amzn/forecast/", "https://www.cnbc.com/2026/04/29/aws-earnings-q1-2026.html"]
    },
    {
      name: "JPMorgan", ticker: "JPM", market: "NYSE",
      price: 334.47, priceDate: "2026-07-02", targetPrice: 344.85, upside: 3.1, dividendYield: 1.8,
      earnings: "2026년 1분기 매출 498억 달러(+10%), 희석 EPS 5.94달러(+17%), ROTCE 23%로 컨센서스 상회",
      thesis: "미국 최대 은행으로 소매·IB·자산관리에 걸친 압도적 프랜차이즈와 19% ROE의 수익성을 보유해 중장기 안정 보유에 적합. 분기 41억 달러 배당·83억 달러 자사주 매입 등 주주환원이 꾸준하고 재무 건전성(요새형 대차대조표)은 업계 최고 수준. 다만 사상 최고가권으로 상승여력은 약 3%로 제한적 — 밸류에이션보다 안정성 중심의 접근이 유효.",
      risks: ["미국 경기 침체 시 대손충당금 증가 및 순이자마진 축소", "고평가 논란 — 유형자산 대비 주가 배수가 역사적 상단"],
      tier: 1,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/JPM.N/total",
      sources: ["https://stockanalysis.com/stocks/jpm/history/", "https://www.tipranks.com/stocks/jpm/forecast"]
    },
    {
      name: "Visa", ticker: "V", market: "NYSE",
      price: 362.13, priceDate: "2026-07-02", targetPrice: 395.48, upside: 9.2, dividendYield: 0.8,
      earnings: "FY26 2분기 순매출 112억 달러(+17%), 조정 EPS 3.31달러로 예상치 상회",
      thesis: "글로벌 결제 네트워크 듀오폴리의 한 축으로 매출 17% 성장과 50%대 순이익률의 압도적 수익성 — 성장과 안정의 균형이 뛰어남. 분기 92억 달러 주주환원과 신규 200억 달러 자사주 프로그램 승인 등 주주친화 정책이 강력. 7/2 52주 신고가 경신에도 약 9% 상승여력이 남아 있음.",
      risks: ["스테이블코인·계좌간(A2A) 결제 등 대체 결제 인프라의 장기적 수수료 잠식", "소비 둔화 시 결제 볼륨 성장률 하락 및 프리미엄 밸류에이션 부담"],
      tier: 2,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/V.N/total",
      sources: ["https://www.ebc.com/forex/visa-stock-jumps-q2-growth-premium-multiple", "https://public.com/stocks/v/forecast-price-target"]
    },
    {
      name: "Berkshire Hathaway B", ticker: "BRK.B", market: "NYSE",
      price: 507.78, priceDate: "2026-07-02", targetPrice: 524.50, upside: 3.3, dividendYield: 0.0,
      earnings: "2026년 1분기 영업이익 113.5억 달러(+18%), Class B 주당순이익 4.68달러, 현금성 자산 3,970억 달러 초과",
      thesis: "보험·철도·에너지 등 경기 방어적 사업 포트폴리오와 3,970억 달러의 막대한 현금으로 재무 건전성이 시장 최고 수준인 핵심 안정 보유 종목. 그렉 아벨 체제 첫 분기에 영업이익 +18%를 기록하며 경영 승계 우려를 상당 부분 불식. 대규모 현금은 시장 급락 시 기회 포착 옵션으로 작동.",
      risks: ["버핏 퇴진 이후 '버핏 프리미엄' 소멸 및 자본배분 성과 불확실성", "막대한 현금의 낮은 재투자 수익률로 상승장 수익률 부진 가능성"],
      tier: 1,
      chartUrl: "https://search.naver.com/search.naver?query=%EB%B2%84%ED%81%AC%EC%85%94%ED%95%B4%EC%84%9C%EC%9B%A8%EC%9D%B4+%EC%A3%BC%EA%B0%80",
      sources: ["https://stockanalysis.com/stocks/brk.b/", "https://www.marketbeat.com/stocks/NYSE/BRK-B/forecast/"]
    },
    {
      name: "Johnson & Johnson", ticker: "JNJ", market: "NYSE",
      price: 263.04, priceDate: "2026-07-02", targetPrice: 264.62, upside: 0.6, dividendYield: 2.1,
      earnings: "2026년 1분기 매출 241억 달러(+9.9%), 조정 EPS 2.70달러로 예상치 상회, 연간 가이던스 상향",
      thesis: "64년 연속 배당 증액의 배당왕으로 주주친화성과 중장기 안정성이 검증된 헬스케어 핵심 보유 종목. 혁신의약품(다잘렉스 +18%, 트렘피아 +74%)과 메드테크의 균형 성장으로 스텔라라 특허절벽을 성공적으로 상쇄 중. 다만 사상 최고가 경신으로 목표가 컨센서스에 사실상 도달 — 신규 매수보다 보유·분할 접근이 적절.",
      risks: ["탈크(활석) 소송 등 제품책임 소송 리스크 잔존", "사상 최고가권 밸류에이션 — 상승여력 1% 미만"],
      tier: 1,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/JNJ.N/total",
      sources: ["https://www.tipranks.com/stocks/jnj/forecast", "https://www.jnj.com/media-center/press-releases/johnson-johnson-reports-q1-2026-results-raises-2026-outlook"]
    },
    {
      name: "TSMC ADR", ticker: "TSM", market: "NYSE",
      price: 434.16, priceDate: "2026-07-02", targetPrice: 520.00, upside: 19.8, dividendYield: 0.8,
      earnings: "2026년 1분기 매출 359억 달러(+40.6%), ADR당 EPS 3.49달러(+58%), 총마진 66.2%",
      thesis: "AI 반도체 파운드리의 사실상 독점 사업자로 매출 40%대 성장·66% 총마진의 압도적 펀더멘털을 보유하면서도 지정학 리스크 할인으로 약 20% 상승여력이 남은 저평가·기회 종목. BofA(590달러) 등 7월 16일 2분기 실적 발표를 앞두고 목표가 상향이 이어지는 중. 대만 집중 리스크로 포트폴리오 내 비중 관리 필요.",
      risks: ["대만해협 지정학 리스크 및 미·중 반도체 규제 강화", "AI 설비투자 사이클 둔화 시 실적·멀티플 동반 조정 가능성"],
      tier: 3,
      chartUrl: "https://m.stock.naver.com/worldstock/stock/TSM.N/total",
      sources: ["https://www.tipranks.com/news/tsmc-stock-price-forecast-top-analysts-raise-targets-ahead-of-q2-earnings", "https://public.com/stocks/tsm/forecast-price-target"]
    }
  ]
};
