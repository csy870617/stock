// 주제별 후보 종목 + 편성 결격 점검 — scripts/check-defects.js 가 생성(LLM 토큰 0). 앱 '추천 종목' 주제 화면의 T3 아래 '후보 종목'.
// groups["<country>|<theme>"] = {defects 편성 결격(state 결격|점검 필요|감시), list 후보(status 검증 통과|보류|검증 대기|근접 후보)}
// 세션 판정은 data/candidate-notes.json(CLAUDE.md §3-7) — 이 파일을 직접 고치지 않는다.
window.CANDIDATES = {
 "asOf": "2026-11-27",
 "T": "2026-11-27",
 "screenAsOf": "2026-11-27",
 "screenFresh": true,
 "beta": {
  "korea": 0.76,
  "us": 0.9
 },
 "groups": {
  "korea|core": {
   "eligible": 18,
   "defects": [
    {
     "ticker": "207940",
     "name": "삼성바이오로직스",
     "state": "감시",
     "flags": [
      {
       "k": "trend",
       "msg": "추세 붕괴(단·중·장기 모두 매도 이하)",
       "fresh": false
      }
     ],
     "note": "추세 붕괴는 코스피 급락(시장 심리 극도의 공포) 속 업종 동반 하락이 겹친 것이다. 3분기 연결 매출 1조4,903억원(+19%)·영업이익 6,401억원(+1%)으로 역성장이 아니고 회사는 연간 매출 성장 전망을 20%로 올렸다 — 5월 파업 여파로 이익률은 낮아졌다. 유상증자(약 4.9%)와 노조 쟁의는 감시한다.",
     "judged": "2026-11-18",
     "verdict": "형식"
    },
    {
     "ticker": "064400",
     "name": "LG씨엔에스",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달: 시총 순위 80위 — 상위 60 안이어야 한다",
       "fresh": false
      }
     ],
     "note": "5거래일 급락·추세 붕괴 — 11/20 코스피 −5.21%·11/23 −3.31% 시장 급락에 11/23 미국 데이터센터 과세 발언·전력망 비용 부담법으로 IT서비스·클라우드주가 함께 13~15% 내린 업종 충격이다. 11/24 코스피 반등에 주가도 6.6% 올랐다. 회사 실적·가이던스 변화는 없다(3분기 영업이익 +15.0%). 시총 순위 미달도 주가 몫이라 형식, 4분기 실적과 AI 데이터센터 수주로 다시 본다.",
     "judged": "2026-11-24",
     "verdict": "형식"
    },
    {
     "ticker": "402340",
     "name": "SK스퀘어",
     "state": "감시",
     "flags": [],
     "note": "3년 평균 ROIC 9.6%가 중앙값 10.3%에 0.7%p 못 미쳤다 — 과거 부진 연도가 평균에 섞인 결과로, 2026년 상반기 영업이익 +800.8%로 이익이 급증해 회복 여지가 크다.",
     "judged": "2026-11-20",
     "verdict": "형식",
     "by": "ai"
    }
   ],
   "list": [
    {
     "ticker": "323410",
     "name": "카카오뱅크",
     "status": "보류",
     "note": "금융 업종 상한(7)에 걸리고, 컨센서스 목표가를 신뢰 출처 2곳으로 최신 확인하지 못함 — 3분기 실적 발표 뒤 재검토.",
     "asOf": "2026-11-03",
     "url": "https://m.stock.naver.com/domestic/stock/323410/total"
    },
    {
     "ticker": "003230",
     "name": "삼양식품",
     "status": "보류",
     "note": "우량 수익성·시총 순위(59위) 충족. 시장 민감도가 매우 낮아(일간 β 0.15) 밴드 하단의 한국 편성 β 를 밴드 밖으로 낮춰 지금은 편입 불가.",
     "asOf": "2026-11-17",
     "why": "3년 평균 ROIC 19.5% · 매출 성장 36.1% · 주식 수 연 0%",
     "near": "정체성 조건 미달: 시총 순위 61위 — 상위 60 안이어야 한다",
     "url": "https://m.stock.naver.com/domestic/stock/003230/total"
    },
    {
     "ticker": "033780",
     "name": "KT&G",
     "status": "보류",
     "note": "우량 근접 후보 — 3년 평균 ROIC가 문턱에 조금 못 미치고, 1년 일간 β가 0에 가까워 에이피알 대신 넣으면 한국 편성 시장 민감도(허용 범위 하단)를 더 낮춘다.",
     "asOf": "2026-11-14",
     "why": "3년 평균 ROIC 9.1% · 매출 성장 11.4% · 주식 수 연 -5.9%",
     "near": "정체성 조건 미달(3년 평균 ROIC 상위 절반): 3년 평균 ROIC 9.1% — 적격 후보 중앙값 9.6% 이상이어야 한다",
     "url": "https://m.stock.naver.com/domestic/stock/033780/total"
    },
    {
     "ticker": "021240",
     "name": "코웨이",
     "status": "보류",
     "note": "우량 근접 후보 — 3년 평균 ROIC 13.1%·매출 성장 15.2%·주식 수 감소지만 시총 순위가 우량 정체성 조건 밖이고 시장 민감도가 매우 낮아 한국 편성 β 를 밴드 아래로 낮춘다.",
     "asOf": "2026-11-16",
     "url": "https://m.stock.naver.com/domestic/stock/021240/total"
    },
    {
     "ticker": "278470",
     "name": "에이피알",
     "status": "검증 대기",
     "why": "3년 평균 ROIC 37.1% · 매출 성장 111.3% · 주식 수 연 -1.8%",
     "url": "https://m.stock.naver.com/domestic/stock/278470/total"
    },
    {
     "ticker": "307950",
     "name": "현대오토에버",
     "status": "근접 후보",
     "why": "3년 평균 ROIC 8.9% · 매출 성장 14.5% · 주식 수 연 0%",
     "near": "정체성 조건 미달(3년 평균 ROIC 상위 절반): 3년 평균 ROIC 8.9% — 적격 후보 중앙값 9.6% 이상이어야 한다",
     "url": "https://m.stock.naver.com/domestic/stock/307950/total"
    },
    {
     "ticker": "005940",
     "name": "NH투자증권",
     "status": "근접 후보",
     "why": "3년 평균 ROIC 2.8% · 매출 성장 36.5% · 주식 수 연 8.8%",
     "near": "정체성 조건 미달: 시총 순위 68위 — 상위 60 안이어야 한다",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/005940/total"
    },
    {
     "ticker": "071050",
     "name": "한국금융지주",
     "status": "근접 후보",
     "why": "3년 평균 ROIC 2.2% · 매출 성장 6.1% · 주식 수 연 0%",
     "near": "정체성 조건 미달: 시총 순위 75위 — 상위 60 안이어야 한다",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/071050/total"
    }
   ]
  },
  "korea|growth": {
   "eligible": 45,
   "defects": [
    {
     "ticker": "012450",
     "name": "한화에어로스페이스",
     "state": "감시",
     "flags": [],
     "note": "3분기 영업이익 감소는 폴란드 K9 2차 물량 등 수익성 높은 수출 인도가 4분기로 밀리고 일회성 비용이 반영된 탓이다. 지상방산 수주잔고는 약 35조원이고 회사는 4분기 폴란드 천무 인도 목표를 높여 수출 성장 논거는 유지된다.",
     "judged": "2026-11-07",
     "verdict": "형식"
    },
    {
     "ticker": "095340",
     "name": "ISC",
     "state": "감시",
     "flags": [],
     "note": "5거래일 -15% 급락(시장 중앙값 -2.3%)의 회사 고유 원인은 확인되지 않았다. 최근 분기 매출 +41%·영업이익 +55.5%로 실적은 유지돼 악재 공시 확인 전까지 감시한다.",
     "judged": "2026-11-25",
     "verdict": "형식",
     "by": "ai"
    }
   ],
   "list": [
    {
     "ticker": "319660",
     "name": "피에스케이",
     "status": "보류",
     "note": "3년 매출 연평균 음수로 성장 지속성 미달, 3분기 실적·컨센서스 2곳 미확인.",
     "asOf": "2026-11-05",
     "why": "3년 매출 연평균 -0.3% · FCF 마진 9.4% · 3년 평균 ROIC 11.9%",
     "near": "정체성 조건 미달: 시총 순위 162위 — 상위 150 안이어야 한다",
     "url": "https://m.stock.naver.com/domestic/stock/319660/total"
    },
    {
     "ticker": "403870",
     "name": "HPSP",
     "status": "보류",
     "note": "최근 연도·분기 매출 역성장 — 성장 재개 확인 뒤 재검토.",
     "asOf": "2026-11-05",
     "why": "3년 매출 연평균 2.8% · FCF 마진 56.6% · 3년 평균 ROIC 25.2%",
     "url": "https://m.stock.naver.com/domestic/stock/403870/total"
    },
    {
     "ticker": "443060",
     "name": "HD현대마린솔루션",
     "status": "보류",
     "note": "3분기 영업이익 +2.2%로 컨센서스 하회, HD현대그룹 상한·β 낮음 — 계열 내 대체안.",
     "asOf": "2026-11-05",
     "why": "3년 매출 연평균 14.1% · FCF 마진 15.5% · 3년 평균 ROIC 33.3%",
     "url": "https://m.stock.naver.com/domestic/stock/443060/total"
    },
    {
     "ticker": "003230",
     "name": "삼양식품",
     "status": "보류",
     "note": "성장 지속성은 최상위지만 증설로 FCF 적자·자산 증가율이 필터 경계, 변동성 낮아 한국 β 를 더 낮춤.",
     "asOf": "2026-10-26",
     "why": "3년 매출 연평균 37.3% · FCF 마진 -5.9% · 3년 평균 ROIC 19.5%",
     "url": "https://m.stock.naver.com/domestic/stock/003230/total"
    },
    {
     "ticker": "010140",
     "name": "삼성중공업",
     "status": "보류",
     "note": "성장 정체성·현금흐름은 충족하나 삼성그룹 상한(5) 초과로 편입 불가 — 삼성 계열 편성이 줄면 첫 후보. 편입 전 엔진 신호 3종 확인 필요. (HD현대중공업 추세 붕괴 대체 1순위)",
     "asOf": "2026-10-26",
     "why": "3년 매출 연평균 21.5% · FCF 마진 12.6% · 3년 평균 ROIC 6.1%",
     "cap": "삼성그룹 상한",
     "url": "https://m.stock.naver.com/domestic/stock/010140/total"
    },
    {
     "ticker": "079550",
     "name": "LIG디펜스앤에어로스페이스",
     "status": "보류",
     "note": "FCF 적자·자산 증가율 30%대, 3분기 실적 하회 전망과 제재 심의·증자 일정이 변수.",
     "asOf": "2026-10-26",
     "why": "3년 매출 연평균 24.7% · FCF 마진 -17.5% · 3년 평균 ROIC 10.7%",
     "url": "https://m.stock.naver.com/domestic/stock/079550/total"
    },
    {
     "ticker": "039030",
     "name": "이오테크닉스",
     "status": "보류",
     "note": "3년 매출 연평균이 음수라 성장 지속성 미달, 장기 결격 규칙(14일 이후) 때 재검토.",
     "asOf": "2026-10-26",
     "why": "3년 매출 연평균 -5.2% · FCF 마진 25.3% · 3년 평균 ROIC 5.8%",
     "url": "https://m.stock.naver.com/domestic/stock/039030/total"
    },
    {
     "ticker": "062040",
     "name": "산일전기",
     "status": "보류",
     "note": "성장 지표 최상위(3년 매출 연평균 67%·3년 평균 ROIC 22.8%)지만 3분기 실적 발표 전, 10월 하순 이후 급락 원인 미확인, 전력기기 편중.",
     "asOf": "2026-11-05",
     "url": "https://m.stock.naver.com/domestic/stock/062040/total"
    },
    {
     "ticker": "058470",
     "name": "리노공업",
     "status": "보류",
     "note": "파업 영향 3분기 감익 추정, 3분기 실적과 4분기 정상화 확인 전.",
     "asOf": "2026-11-05",
     "why": "3년 매출 연평균 4.9% · FCF 마진 32.1% · 3년 평균 ROIC 16.8%",
     "url": "https://m.stock.naver.com/domestic/stock/058470/total"
    },
    {
     "ticker": "214450",
     "name": "파마리서치",
     "status": "검증 대기",
     "why": "3년 매출 연평균 40.2% · FCF 마진 28.6% · 3년 평균 ROIC 15.7%",
     "url": "https://m.stock.naver.com/domestic/stock/214450/total"
    },
    {
     "ticker": "329180",
     "name": "HD현대중공업",
     "status": "검증 대기",
     "why": "3년 매출 연평균 24.8% · FCF 마진 17.1% · 3년 평균 ROIC 8.5%",
     "url": "https://m.stock.naver.com/domestic/stock/329180/total"
    },
    {
     "ticker": "006260",
     "name": "LS",
     "status": "검증 대기",
     "why": "3년 매출 연평균 22.1% · FCF 마진 -3% · 3년 평균 ROIC 5.9%",
     "url": "https://m.stock.naver.com/domestic/stock/006260/total"
    }
   ]
  },
  "korea|value": {
   "eligible": 55,
   "defects": [
    {
     "ticker": "000270",
     "name": "기아",
     "state": "감시",
     "flags": [],
     "note": "추세 붕괴 — 11/20·11/23 이틀 코스피 약 −8.4% 시장 급락(외국인 7거래일 연속 순매도)에 함께 밀린 것이고 회사 고유 악재는 확인되지 않았다. 이익 개선 없음 조건은 확정 3분기 영업이익 +24.3% 로 회복이 확인된 상태 그대로이며, 4분기 감소나 연간 감소가 확정되면 실질로 다시 본다.",
     "judged": "2026-11-23",
     "verdict": "형식",
     "triedAt": "2026-10-30"
    },
    {
     "ticker": "001120",
     "name": "LX인터내셔널",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달: 시총 순위 257위 — 상위 200 안이어야 한다",
       "fresh": false
      }
     ],
     "note": "시총 순위 247위 — 상위 200 미달은 4월 뒤 주가 하락(약 −34%)에서 생긴 경계 이탈이다. 3분기 영업이익 +120.8%, 1~3분기 누적이 이미 지난해 연간을 넘어 사업은 좋아졌다. EBIT/EV 가 문턱과 같아 다음 스크린에서 다시 본다.",
     "judged": "2026-11-15",
     "verdict": "형식"
    },
    {
     "ticker": "267270",
     "name": "HD건설기계",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달(EBIT/EV·FCF 수익률 상위 30%): EBIT/EV 3.7% · FCF/시총 0.6% — 둘 중 하나가 문턱(6.6% · 6.9%) 이상이어야 한다",
       "fresh": false
      }
     ],
     "note": "5거래일 -14.9% 급락(시장 중앙값 -2.3%)의 원인은 규제·소송·증자 등 회사 고유 악재가 보도되지 않아 지켜본다. 11월 24일 대표이사가 자사주 630주를 장내 매수했고 3분기 영업이익은 합산 전년 대비 23.9% 늘었다.",
     "judged": "2026-11-25",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "138040",
     "name": "메리츠금융지주",
     "state": "감시",
     "flags": [],
     "note": "11일 발표한 3분기 지배주주순이익 4,707억원(전년비 -28.1%)이 컨센서스 6,345억원을 하회했다. 화재 투자손익 급감이 원인이나 보험손익(+34.9%)과 증권은 견조했고 50% 환원 방침도 재확인해 4분기 변동성 확인 전까지 감시한다.",
     "judged": "2026-11-12",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "018260",
     "name": "삼성에스디에스",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달(EBIT/EV·FCF 수익률 상위 30%): EBIT/EV 6.1% · FCF/시총 5.9% — 둘 중 하나가 문턱(6.6% · 6.9%) 이상이어야 한다",
       "fresh": false
      }
     ],
     "note": "5거래일 급락 — 11/23 트럼프 대통령의 미국 기업 해외 데이터센터 과세 발언과 미 상원의 데이터센터 전력망 비용 부담법 통과로 AI 인프라 투자 부담 우려가 번져 LG CNS·NHN 과 함께 하루 15% 넘게 내린 업종 충격이다. 3분기 매출은 11% 넘게 늘었고 회사 가이던스 변화는 없다. 주제 기준 미달(EBIT/EV·FCF/시총)은 그대로 주가 몫의 형식이다.",
     "judged": "2026-11-23",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "002790",
     "name": "아모레퍼시픽홀딩스",
     "status": "보류",
     "note": "3분기 연결 매출·영업이익 증가는 재확인했지만 컨센서스 목표가가 날짜 지난 집계 두 곳뿐이고 증권사 리포트를 특정하지 못했다.",
     "asOf": "2026-11-20",
     "why": "EBIT/EV 14.6% · FCF/시총 25.4% · 매출 성장 8.5%",
     "url": "https://m.stock.naver.com/domestic/stock/002790/total"
    },
    {
     "ticker": "007070",
     "name": "GS리테일",
     "status": "보류",
     "note": "편의점·슈퍼·홈쇼핑 개선으로 상반기 영업이익이 늘었지만 작년 3분기 높은 기저를 넘는지 3분기 실적 확인이 필요하다.",
     "asOf": "2026-11-04",
     "why": "EBIT/EV 6.6% · FCF/시총 39.6% · 매출 성장 3.3%",
     "near": "정체성 조건 미달: 시총 순위 205위 — 상위 200 안이어야 한다",
     "url": "https://m.stock.naver.com/domestic/stock/007070/total"
    },
    {
     "ticker": "012330",
     "name": "현대모비스",
     "status": "검증 대기",
     "why": "EBIT/EV 9.9% · FCF/시총 10.4% · 매출 성장 6.8%",
     "url": "https://m.stock.naver.com/domestic/stock/012330/total"
    },
    {
     "ticker": "033780",
     "name": "KT&G",
     "status": "검증 대기",
     "why": "EBIT/EV 6.6% · FCF/시총 -0.3% · 매출 성장 11.4%",
     "url": "https://m.stock.naver.com/domestic/stock/033780/total"
    },
    {
     "ticker": "181710",
     "name": "NHN",
     "status": "검증 대기",
     "why": "EBIT/EV 6% · FCF/시총 16.2% · 매출 성장 2.4%",
     "url": "https://m.stock.naver.com/domestic/stock/181710/total"
    },
    {
     "ticker": "021240",
     "name": "코웨이",
     "status": "검증 대기",
     "why": "EBIT/EV 9.6% · FCF/시총 -2.7% · 매출 성장 15.2%",
     "url": "https://m.stock.naver.com/domestic/stock/021240/total"
    },
    {
     "ticker": "006260",
     "name": "LS",
     "status": "검증 대기",
     "why": "EBIT/EV 7% · FCF/시총 -18.3% · 매출 성장 15.7%",
     "url": "https://m.stock.naver.com/domestic/stock/006260/total"
    },
    {
     "ticker": "024110",
     "name": "기업은행",
     "status": "검증 대기",
     "why": "EBIT/EV 1.4% · 매출 성장 -9.9%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/024110/total"
    },
    {
     "ticker": "214450",
     "name": "파마리서치",
     "status": "검증 대기",
     "why": "EBIT/EV 6.9% · FCF/시총 5.3% · 매출 성장 53.2%",
     "url": "https://m.stock.naver.com/domestic/stock/214450/total"
    },
    {
     "ticker": "003690",
     "name": "코리안리",
     "status": "검증 대기",
     "why": "EBIT/EV 22.8% · 매출 성장 -3.6%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/003690/total"
    },
    {
     "ticker": "279570",
     "name": "케이뱅크",
     "status": "검증 대기",
     "why": "EBIT/EV 5.6% · 매출 성장 8.7%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/279570/total"
    },
    {
     "ticker": "000990",
     "name": "DB하이텍",
     "status": "검증 대기",
     "why": "EBIT/EV 8.2% · FCF/시총 7% · 매출 성장 23.5%",
     "url": "https://m.stock.naver.com/domestic/stock/000990/total"
    }
   ]
  },
  "korea|dividend": {
   "eligible": 39,
   "defects": [
    {
     "ticker": "029780",
     "name": "삼성카드",
     "state": "감시",
     "flags": [],
     "note": "3분기 순이익이 전년보다 13.5% 줄어 컨센서스를 밑돌았다. 조달·대손 비용 증가라는 업황 요인이고 증권사들은 목표가를 낮추면서도 매수 의견을 유지했으며 연간 배당은 전년과 같을 것으로 전망된다.",
     "judged": "2026-10-29",
     "verdict": "형식"
    },
    {
     "ticker": "139130",
     "name": "iM금융지주",
     "state": "감시",
     "flags": [],
     "note": "3분기 누적 순이익은 판관비 증가로 소폭 줄었지만 이자이익이 늘고 보통주자본비율이 역대 최고다. 배당 삭감 발표는 없고 회사는 주주환원을 자사주 매입·소각 중심으로 늘리는 방향을 밝혔다.",
     "judged": "2026-11-07",
     "verdict": "형식"
    },
    {
     "ticker": "005850",
     "name": "에스엘",
     "state": "감시",
     "flags": [
      {
       "k": "tpcut",
       "msg": "컨센서스 목표가 14일 새 -14.9% 하향 — 논거 확인",
       "fresh": false
      }
     ],
     "note": "3분기 연결 영업이익 461억원(전년 대비 −32.5%)이 증권가 추정을 크게 밑돌았다 — 판관비·보증수리 비용 증가 탓이고 매출은 +4.7%다. 1·2분기 영업이익이 각각 21%·18.8% 늘어 1~3분기 누적은 아직 증가이고 배당성향 40% 이상 방침은 그대로다. 4분기도 감익이거나 배당 방침이 후퇴하면 실질로 다시 본다.",
     "judged": "2026-11-22",
     "verdict": "형식"
    },
    {
     "ticker": "030200",
     "name": "KT",
     "state": "감시",
     "flags": [],
     "note": "11/10 발표된 3분기 영업이익은 5053억원으로 전년 대비 6.1% 감소에 그쳤고, 해킹 보상 영향이 컸으며 AX 매출은 9%대 성장했다. 2026년 최소 DPS 2,400원 방침은 유지되어 논거는 살아 있다.",
     "judged": "2026-11-10",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "047050",
     "name": "포스코인터내셔널",
     "state": "감시",
     "flags": [],
     "note": "추세 붕괴 — 11월 코스피 급락(11/20 −5.21%·11/23 −3.31%)과 기관·외국인 순매도 속 올해 상승분을 되돌린 것이다. 3분기 매출 +9.6%·영업이익 +24.0% 로 배당 논거를 훼손하는 실적·가이던스 변화는 없다.",
     "judged": "2026-11-23",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "383220",
     "name": "F&F",
     "status": "보류",
     "note": "3분기 실적 발표 전이고 2분기 영업이익이 컨센서스를 밑돌았으며 이익 변동이 배당 후보 중 가장 크다.",
     "asOf": "2026-11-07",
     "why": "배당 비감소 4년 · 배당성향 25.4% · 배당 4.5%",
     "url": "https://m.stock.naver.com/domestic/stock/383220/total"
    },
    {
     "ticker": "003690",
     "name": "코리안리",
     "status": "보류",
     "note": "금융(편중 유지), 컨센서스 2곳 교차확인 실패.",
     "asOf": "2026-11-05",
     "why": "배당 비감소 3년 · 배당성향 31.3% · 배당 4.9%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/003690/total"
    },
    {
     "ticker": "031210",
     "name": "서울보증보험",
     "status": "보류",
     "note": "금융 업종 상한에 걸리고 목표가를 내는 증권사 1곳뿐인 블로커 유지.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 1년 · 배당성향 74.5% · 배당 10.7%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/031210/total"
    },
    {
     "ticker": "030000",
     "name": "제일기획",
     "status": "보류",
     "note": "삼성그룹 계열이라 삼성그룹 상한 5 초과를 해소하지 못하고 2026E 영업이익 감익 추정 블로커 유지.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 2년 · 배당성향 60% · 배당 6.3%",
     "url": "https://m.stock.naver.com/domestic/stock/030000/total"
    },
    {
     "ticker": "009970",
     "name": "영원무역홀딩스",
     "status": "보류",
     "note": "8월 밸류업(배당성향 30%·자사주 매입) 확인, 지주사 연결 왜곡과 컨센서스 부재가 블로커.",
     "asOf": "2026-10-26",
     "why": "배당 비감소 4년 · 배당성향 20.8% · 배당 4.5%",
     "url": "https://m.stock.naver.com/domestic/stock/009970/total"
    },
    {
     "ticker": "000240",
     "name": "한국앤컴퍼니",
     "status": "보류",
     "note": "배당 지속성은 양호하나 경영권 분쟁 소송과 실적·컨센서스 미확인.",
     "asOf": "2026-10-26",
     "why": "배당 비감소 4년 · 배당성향 30% · 배당 6.1%",
     "url": "https://m.stock.naver.com/domestic/stock/000240/total"
    },
    {
     "ticker": "018670",
     "name": "SK가스",
     "status": "보류",
     "note": "2분기 영업손실로 이익 안정성이 배당 주제에 못 미치고 3분기 실적 발표 전.",
     "asOf": "2026-11-07",
     "why": "배당 비감소 4년 · 배당성향 34.5% · 배당 4.2%",
     "url": "https://m.stock.naver.com/domestic/stock/018670/total"
    },
    {
     "ticker": "001800",
     "name": "오리온홀딩스",
     "status": "보류",
     "note": "배당 증액·최소 배당 계획은 확인했지만 지주사 목표가를 내는 최근 리포트가 네이버 집계 외에 없다.",
     "asOf": "2026-11-07",
     "why": "배당 비감소 4년 · 배당성향 54.7% · 배당 7.3%",
     "url": "https://m.stock.naver.com/domestic/stock/001800/total"
    },
    {
     "ticker": "005380",
     "name": "현대차",
     "status": "보류",
     "note": "분기배당 유지와 연간 최소 배당 정책은 지켜지고 있지만 3분기에 연간 판매·영업이익률 목표를 낮췄고 1~3분기 누적 영업이익이 줄어 이익 안정성 확인이 더 필요하다.",
     "asOf": "2026-11-04",
     "why": "배당 비감소 0년 · 배당성향 27.7% · 배당 3.9%",
     "url": "https://m.stock.naver.com/domestic/stock/005380/total"
    },
    {
     "ticker": "033780",
     "name": "KT&G",
     "status": "검증 대기",
     "why": "배당 비감소 1년 · 배당성향 57.6% · 배당 3.7%",
     "url": "https://m.stock.naver.com/domestic/stock/033780/total"
    },
    {
     "ticker": "024110",
     "name": "기업은행",
     "status": "검증 대기",
     "why": "배당 비감소 0년 · 배당성향 30.8% · 배당 6.8%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/024110/total"
    },
    {
     "ticker": "271560",
     "name": "오리온",
     "status": "검증 대기",
     "why": "배당 비감소 4년 · 배당성향 36.2% · 배당 4.4%",
     "url": "https://m.stock.naver.com/domestic/stock/271560/total"
    }
   ]
  },
  "us|core": {
   "eligible": 53,
   "defects": [
    {
     "ticker": "GOOGL",
     "name": "Alphabet",
     "state": "감시",
     "flags": [],
     "note": "10/28 실적 뒤 급락은 투자 평가손과 AI 설비투자 대비 잉여현금흐름 적자 우려 때문이다. 매출 +25%·클라우드 매출 두 배 성장·연간 capex 가이던스 유지로 사업 논거는 그대로라 형식 판정, 현금흐름 추이를 감시한다.",
     "judged": "2026-10-29",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "KLAC",
     "name": "KLA",
     "status": "보류",
     "note": "영업이익률·자본효율은 최상위지만 반도체 장비 사이클 업종이라 이익 변동이 크고 β 가 높아(일간 약 2.9) 미국 편성 β 를 크게 올린다.",
     "asOf": "2026-11-15",
     "why": "매출 성장 23.9% · 주식 수 연 -1.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/KLAC.O/total"
    },
    {
     "ticker": "ETN",
     "name": "Eaton",
     "status": "보류",
     "note": "3분기 데이터센터 수요로 사상 최대 실적이지만 3년 평균 ROIC 자료가 없어 우량 정체성을 판정할 수 없고 시총 순위가 상위 120 경계다. 성장 주제에 더 맞다.",
     "asOf": "2026-11-15",
     "why": "매출 성장 10.3% · 주식 수 연 -2.1%",
     "near": "정체성 조건 미달: 시총 순위 130위 — 상위 120 안이어야 한다",
     "url": "https://m.stock.naver.com/worldstock/stock/ETN/total"
    },
    {
     "ticker": "VRTX",
     "name": "Vertex Pharmaceuticals Incorporated",
     "status": "보류",
     "note": "낭포성 섬유증 독점·3년 평균 ROIC 약 24%·순현금으로 우량 품질은 최상위이지만 시총 순위가 상위 120 경계(118위)라 편입 직후 주제 기준 미달이 될 수 있다. 3분기 비GAAP EPS 컨센서스 하회, 매출 약 95%가 CF.",
     "asOf": "2026-11-15",
     "why": "3년 평균 ROIC 24.1% · 매출 성장 8.9% · 주식 수 연 0%",
     "url": "https://m.stock.naver.com/worldstock/stock/VRTX.O/total"
    },
    {
     "ticker": "XOM",
     "name": "Exxonmobil",
     "status": "검증 대기",
     "why": "매출 성장 -5% · 주식 수 연 0.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/XOM/total"
    },
    {
     "ticker": "CAT",
     "name": "Caterpillar",
     "status": "검증 대기",
     "why": "3년 평균 ROIC 21.5% · 매출 성장 4.3% · 주식 수 연 -3.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/CAT/total"
    },
    {
     "ticker": "PLTR",
     "name": "Palantir Technologies",
     "status": "검증 대기",
     "why": "매출 성장 56.2% · 주식 수 연 4.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/PLTR.O/total"
    },
    {
     "ticker": "MS",
     "name": "Morgan Stanley",
     "status": "검증 대기",
     "why": "매출 성장 11.5% · 주식 수 연 -1.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/MS/total"
    },
    {
     "ticker": "COP",
     "name": "ConocoPhillips",
     "status": "검증 대기",
     "why": "매출 성장 4.9% · 주식 수 연 6.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/COP/total"
    },
    {
     "ticker": "BRK.A",
     "name": "Berkshire Hathaway Class A",
     "status": "검증 대기",
     "why": "매출 성장 -1%",
     "url": "https://m.stock.naver.com/worldstock/stock/BRKa/total"
    },
    {
     "ticker": "PGR",
     "name": "The Progressive",
     "status": "검증 대기",
     "why": "매출 성장 16.3% · 주식 수 연 0.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/PGR/total"
    },
    {
     "ticker": "BLK",
     "name": "BlackRock",
     "status": "검증 대기",
     "why": "3년 평균 ROIC 11.6% · 매출 성장 18.7% · 주식 수 연 6.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/BLK/total"
    },
    {
     "ticker": "WELL",
     "name": "Welltower",
     "status": "검증 대기",
     "why": "매출 성장 40.2% · 주식 수 연 11.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/WELL.K/total"
    }
   ]
  },
  "us|growth": {
   "eligible": 67,
   "defects": [
    {
     "ticker": "NVDA",
     "name": "NVIDIA",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 자산 급증(주제 안 상위 10%), 이익 변동 큼(주제 안 상위 10%)",
       "fresh": false
      },
      {
       "k": "earn",
       "msg": "실적 발표(11/17) · EPS 서프라이즈 8.5% — 가이던스·논거 확인",
       "fresh": false
      },
      {
       "k": "tpcut",
       "msg": "컨센서스 목표가 14일 새 -25.1% 하향 — 논거 확인",
       "fresh": false
      }
     ],
     "note": "지금 미국 시총 3위라 지수 대표 보호 밖이다. 자산 급증·이익 변동 미달은 AI 초고성장에 따른 현금·자산 증가와 2023년 이익 급증 몫이고, 11/17 3분기(FY27) 매출 1,158억달러(+103%)·4분기 가이던스 상회로 사업은 그대로다. 젠슨 황 사임 뒤 이사회 조사, 11/17 보도된 SEC 공시 조사(회사·SEC 미확인)와 증권 집단소송은 감시 — SEC 정식 조치·10-Q 지연·재무제표 정정이 나오면 실질로 다시 본다.",
     "judged": "2026-11-22",
     "verdict": "형식"
    },
    {
     "ticker": "META",
     "name": "Meta Platforms",
     "state": "감시",
     "flags": [],
     "note": "3분기 실적 발표(10/21) 후 법적 비용 98.9억 달러와 capex 확대 계획, 비의결권 신규 주식 발표로 5거래일 -11.9% 하락했다. 매출 성장은 유지돼 비의결권 주식의 규모·용도와 희석 여부 확인 전까지 감시한다.",
     "judged": "2026-10-22",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "UBER",
     "name": "Uber Technologies",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 이익 변동 큼(주제 안 상위 10%)",
       "fresh": false
      }
     ],
     "note": "5년 이익 변동이 성장 주제 건전성 문턱을 넘었다 — 그 창에 적자→흑자 전환과 2024·2025년 법인세 평가충당금 환입 일회성 이익이 들어 있어서다. 영업이익은 2025년 99%, 2026년 3분기 EBIT는 35% 늘었다.",
     "judged": "2026-11-14",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "SCCO",
     "name": "Southern Copper",
     "status": "검증 대기",
     "why": "3년 매출 연평균 10.1% · FCF 마진 25.5% · 3년 평균 ROIC 35.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/SCCO.K/total"
    },
    {
     "ticker": "AMD",
     "name": "Advanced Micro Devices",
     "status": "검증 대기",
     "why": "3년 매출 연평균 13.6% · FCF 마진 19.4% · 3년 평균 ROIC 2.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/AMD.O/total"
    },
    {
     "ticker": "DELL",
     "name": "Dell Technologies",
     "status": "검증 대기",
     "why": "3년 매출 연평균 3.5% · FCF 마진 7.5% · 3년 평균 ROIC 29%",
     "url": "https://m.stock.naver.com/worldstock/stock/DELL.K/total"
    },
    {
     "ticker": "TT",
     "name": "Trane Technologies",
     "status": "검증 대기",
     "why": "3년 매출 연평균 10.1% · FCF 마진 13.2% · 3년 평균 ROIC 24.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/TT/total"
    },
    {
     "ticker": "GEV",
     "name": "GE Vernova",
     "status": "검증 대기",
     "why": "3년 매출 연평균 8.7% · FCF 마진 9.7% · 3년 평균 ROIC 18.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/GEV/total"
    },
    {
     "ticker": "ETN",
     "name": "Eaton",
     "status": "검증 대기",
     "why": "3년 매출 연평균 9.8% · FCF 마진 12.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/ETN/total"
    },
    {
     "ticker": "CAT",
     "name": "Caterpillar",
     "status": "검증 대기",
     "why": "3년 매출 연평균 4.4% · FCF 마진 13.2% · 3년 평균 ROIC 21.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/CAT/total"
    },
    {
     "ticker": "MRVL",
     "name": "Marvell Technology",
     "status": "검증 대기",
     "why": "3년 매출 연평균 11.4% · FCF 마진 17% · 3년 평균 ROIC 0.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/MRVL.O/total"
    },
    {
     "ticker": "STX",
     "name": "Seagate Technology",
     "status": "검증 대기",
     "why": "3년 매출 연평균 -5.2% · FCF 마진 9% · 3년 평균 ROIC 29.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/STX.O/total"
    },
    {
     "ticker": "ADI",
     "name": "Analog Devices",
     "status": "검증 대기",
     "why": "3년 매출 연평균 -2.8% · FCF 마진 38.8% · 3년 평균 ROIC 5.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/ADI.O/total"
    },
    {
     "ticker": "CEG",
     "name": "Constellation Energy",
     "status": "검증 대기",
     "why": "3년 매출 연평균 1.7% · FCF 마진 5.7% · 3년 평균 ROIC 12.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/CEG.O/total"
    },
    {
     "ticker": "NXPI",
     "name": "NXP Semiconductors NV",
     "status": "검증 대기",
     "why": "3년 매출 연평균 -2.4% · FCF 마진 19.7% · 3년 평균 ROIC 15.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/NXPI.O/total"
    }
   ]
  },
  "us|value": {
   "eligible": 79,
   "defects": [
    {
     "ticker": "GM",
     "name": "General Motors",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 매출 역성장(가치 함정)",
       "fresh": false
      }
     ],
     "note": "매출 역성장 필터(2025년 결산 매출 감소)에 걸렸다 — 2026년 2·3분기 매출이 각각 1.9%·2.9% 늘어 역성장이 이어지지 않았고 3분기 조정 EBIT도 21.6% 늘었다. 최근 분기 성장·4분기 순이익 조건은 분기 자료가 없어 잴 수 없다(3분기 순이익 흑자).",
     "judged": "2026-11-14",
     "verdict": "형식"
    },
    {
     "ticker": "CI",
     "name": "Cigna",
     "state": "감시",
     "flags": [
      {
       "k": "trend",
       "msg": "추세 붕괴(단·중·장기 모두 매도 이하)",
       "fresh": false
      }
     ],
     "note": "추세 붕괴는 11/16 CMS 부정 방지 규칙안(CRUSH — 메디케어 어드밴티지·메디케이드 관리의료 감독 강화)과 대형 보험사 분할 요구가 겹친 관리의료 업종 동반 매도(S&P 500 6거래일 연속 하락 속)다. 3분기 조정 EPS 가 예상을 웃돌아 11/5 연간 가이던스를 올린 뒤 바뀐 실적·가이던스가 없고 11/19 RBC 가 목표가를 올렸다. 규칙안 확정 범위와 PBM 규제 논의는 감시한다.",
     "judged": "2026-11-19",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "NTAP",
     "name": "NetApp",
     "status": "검증 통과",
     "note": "1분기(FY27) 매출 30% 증가(추가 1주 제외 26%)·비GAAP EPS 66% 증가, 연간 매출·EPS 가이던스 상향. 하반기 성장 둔화 전망과 잉여현금흐름 감소·매출총이익률 하락이 리스크다.",
     "asOf": "2026-11-04",
     "why": "EBIT/EV 5.2% · FCF/시총 5.8% · 매출 성장 5.4%",
     "near": "정체성 조건 미달: 시총 순위 420위 — 상위 400 안이어야 한다",
     "url": "https://m.stock.naver.com/worldstock/stock/NTAP.O/total"
    },
    {
     "ticker": "KR",
     "name": "Kroger",
     "status": "보류",
     "note": "2분기 조정 EPS 5% 증가·연간 EPS 가이던스 유지. 동일점 매출 증가가 거의 멈춰 연간 동일점 매출 가이던스를 낮췄다 — 다음 분기 동일점 매출 회복 확인 필요.",
     "asOf": "2026-11-04",
     "why": "EBIT/EV 3.5% · FCF/시총 8.4% · 매출 성장 0.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/KR/total"
    },
    {
     "ticker": "DELL",
     "name": "Dell Technologies",
     "status": "검증 대기",
     "why": "EBIT/EV 3.9% · FCF/시총 4.5% · 매출 성장 18.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/DELL.K/total"
    },
    {
     "ticker": "WFC",
     "name": "Wells Fargo &",
     "status": "검증 대기",
     "why": "매출 성장 -3.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/WFC/total"
    },
    {
     "ticker": "JPM",
     "name": "JPMorgan Chase &",
     "status": "검증 대기",
     "why": "매출 성장 2.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/JPM/total"
    },
    {
     "ticker": "CRM",
     "name": "Salesforce",
     "status": "검증 대기",
     "why": "EBIT/EV 4.9% · FCF/시총 8.9% · 매출 성장 9.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/CRM/total"
    },
    {
     "ticker": "XYZ",
     "name": "Block",
     "status": "검증 대기",
     "why": "EBIT/EV 3.6% · FCF/시총 5.3% · 매출 성장 0.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/XYZ/total"
    },
    {
     "ticker": "UNH",
     "name": "UnitedHealth Incorporated",
     "status": "검증 대기",
     "why": "EBIT/EV 5.3% · FCF/시총 5.2% · 매출 성장 11.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/UNH/total"
    },
    {
     "ticker": "ADSK",
     "name": "Autodesk",
     "status": "검증 대기",
     "why": "EBIT/EV 3.1% · FCF/시총 4.7% · 매출 성장 17.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/ADSK.O/total"
    },
    {
     "ticker": "AIG",
     "name": "American International",
     "status": "검증 대기",
     "why": "매출 성장 -1.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/AIG/total"
    },
    {
     "ticker": "SYY",
     "name": "Sysco",
     "status": "검증 대기",
     "why": "EBIT/EV 5.9% · FCF/시총 4.8% · 매출 성장 3.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/SYY/total"
    },
    {
     "ticker": "CVS",
     "name": "CVS Health",
     "status": "검증 대기",
     "why": "EBIT/EV 3% · FCF/시총 7.5% · 매출 성장 7.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/CVS/total"
    }
   ]
  },
  "us|dividend": {
   "eligible": 73,
   "defects": [
    {
     "ticker": "KO",
     "name": "Coca-Cola",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달: 배당수익률 2.2% — 2.5% 이상이어야 한다",
       "fresh": false
      }
     ],
     "note": "배당수익률 2.2% — 하한 2.5% 미달은 주가 상승 몫이다. 2026-02 분기 배당을 0.51→0.53달러로 올려 64년 연속 증액했고 증액 당시 수익률은 하한 위였다. 3분기 유기적 매출 +7%·조정 EPS +11%로 사업 악화는 없다.",
     "judged": "2026-11-15",
     "verdict": "형식"
    },
    {
     "ticker": "JNJ",
     "name": "Johnson & Johnson",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달: 배당수익률 1.9% — 2.5% 이상이어야 한다",
       "fresh": false
      }
     ],
     "note": "배당수익률 1.9% — 하한 2.5% 미달은 주가 상승 몫이다. 2026-04 분기 배당을 1.30→1.34달러로 올려 64년 연속 증액했고 배당성향은 약 50%다. 하한 회복엔 주가가 약 25% 내려야 해 형식 상태가 길어질 수 있다.",
     "judged": "2026-11-15",
     "verdict": "형식"
    },
    {
     "ticker": "LMT",
     "name": "Lockheed Martin",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달: 배당수익률 2.5% — 2.5% 이상이어야 한다 · 최근 4분기 순이익 흑자가 아니다(또는 자료 없음)",
       "fresh": false
      }
     ],
     "note": "최근 4분기 순이익 조건은 분기 자료가 비어 잴 수 없는 경우다 — 실제 4Q25~3Q26 순이익은 네 분기 모두 흑자(합계 약 65억달러)이고 2025년 2분기 프로그램 손실은 창 밖이다. 배당수익률은 하한 위로 돌아왔고 10월 분기 배당을 3.60달러로 올려 24년 연속 인상했다.",
     "judged": "2026-11-22",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "BAC",
     "name": "Bank of America",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 29.2% · 배당 2.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/BAC/total"
    },
    {
     "ticker": "UNH",
     "name": "UnitedHealth Incorporated",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 65.7% · 배당 2.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/UNH/total"
    },
    {
     "ticker": "USB",
     "name": "U.S. Bancorp",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 41.8% · 배당 3.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/USB/total"
    },
    {
     "ticker": "WMB",
     "name": "The Williams Companies",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 93.3% · 배당 3.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/WMB/total"
    },
    {
     "ticker": "SRE",
     "name": "Sempra",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 87.3% · 배당 3.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/SRE/total"
    },
    {
     "ticker": "VALE",
     "name": "Vale S.A.",
     "status": "검증 대기",
     "why": "배당 비감소 1년 · 배당성향 19.9% · 배당 10.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/VALE.K/total"
    },
    {
     "ticker": "SYY",
     "name": "Sysco",
     "status": "검증 대기",
     "why": "배당 비감소 9년 · 배당성향 59% · 배당 2.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/SYY/total"
    },
    {
     "ticker": "AEE",
     "name": "Ameren",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 52.7% · 배당 2.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/AEE/total"
    },
    {
     "ticker": "AEP",
     "name": "American Electric Power",
     "status": "검증 대기",
     "why": "배당 비감소 9년 · 배당성향 56.1% · 배당 3.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/AEP.O/total"
    },
    {
     "ticker": "TFC",
     "name": "Truist Financial",
     "status": "검증 대기",
     "why": "배당 비감소 9년 · 배당성향 53.7% · 배당 4.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/TFC/total"
    },
    {
     "ticker": "KDP",
     "name": "Keurig Dr Pepper",
     "status": "검증 대기",
     "why": "배당 비감소 6년 · 배당성향 60.1% · 배당 2.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/KDP.O/total"
    },
    {
     "ticker": "BNS",
     "name": "The Bank of Nova Scotia",
     "status": "검증 대기",
     "why": "배당 비감소 0년 · 배당성향 20.1% · 배당 3.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/BNS/total"
    }
   ]
  }
 },
 "hard": {
  "korea|core|005930": {
   "scheme": "keys",
   "theme": {
    "gate": "-"
   }
  },
  "korea|core|207940": {
   "trend": "2026-11-18",
   "tvf": ""
  },
  "korea|core|064400": {
   "scheme": "keys",
   "theme": {
    "id:rank": "-"
   },
   "gone": {
    "trend": [
     "2026-11-23",
     "2026-11-26",
     "1eg8iun",
     0
    ]
   }
  },
  "korea|core|402340": {
   "gone": {
    "theme:gate": [
     "2026-11-20",
     "2026-11-26",
     "",
     0
    ]
   }
  },
  "korea|value|000270": {
   "gone": {
    "theme:id:improve": [
     "-",
     "2026-11-24",
     null,
     0
    ],
    "trend": [
     "2026-11-23",
     "2026-11-23",
     "1mi8h6k",
     0
    ]
   }
  },
  "korea|value|001120": {
   "scheme": "keys",
   "theme": {
    "id:rank": "-"
   }
  },
  "korea|value|267270": {
   "scheme": "keys",
   "theme": {
    "gate": "-"
   }
  },
  "korea|value|241560": {
   "gone": {
    "theme:gate": [
     "2026-11-18",
     "2026-11-20",
     "1vlkz3t",
     0
    ]
   }
  },
  "korea|value|066570": {
   "gone": {
    "theme:gate": [
     "2026-11-18",
     "2026-11-20",
     "1sb5fjj",
     0
    ]
   }
  },
  "korea|value|086280": {
   "gone": {
    "theme:gate": [
     "2026-11-18",
     "2026-11-20",
     "778m78",
     0
    ]
   }
  },
  "korea|value|018260": {
   "scheme": "keys",
   "theme": {
    "gate": "-"
   }
  },
  "korea|dividend|047050": {
   "gone": {
    "trend": [
     "2026-11-23",
     "2026-11-23",
     "pmt6ko",
     0
    ]
   }
  },
  "us|growth|NVDA": {
   "scheme": "keys",
   "theme": {
    "ex:agTop": "-",
    "ex:sroaTop": "-"
   }
  },
  "us|growth|UBER": {
   "scheme": "keys",
   "theme": {
    "ex:sroaTop": "-"
   }
  },
  "us|value|GM": {
   "scheme": "keys",
   "theme": {
    "ex:revDown": "-"
   },
   "gone": {
    "theme:id:improve": [
     "-",
     "2026-11-23",
     null,
     0
    ],
    "theme:id:ttmNi": [
     "-",
     "2026-11-23",
     null,
     0
    ]
   }
  },
  "us|value|CI": {
   "trend": "2026-11-19",
   "tvf": "1a9bima"
  },
  "us|dividend|KO": {
   "scheme": "keys",
   "theme": {
    "id:divY": "-"
   }
  },
  "us|dividend|JNJ": {
   "scheme": "keys",
   "theme": {
    "id:divY": "-"
   }
  },
  "us|dividend|LMT": {
   "scheme": "keys",
   "theme": {
    "id:divY": "-",
    "id:ttmNi": "-"
   }
  }
 },
 "summary": {
  "review": 0,
  "defect": 0,
  "watch": 24,
  "untried": 0,
  "dup": 0,
  "long": 0
 }
};
