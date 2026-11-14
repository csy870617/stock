// 주제별 후보 종목 + 편성 결격 점검 — scripts/check-defects.js 가 생성(LLM 토큰 0). 앱 '추천 종목' 주제 화면의 T3 아래 '후보 종목'.
// groups["<country>|<theme>"] = {defects 편성 결격(state 결격|점검 필요|감시), list 후보(status 검증 통과|보류|검증 대기)}
// 세션 판정은 data/candidate-notes.json(CLAUDE.md §3-7) — 이 파일을 직접 고치지 않는다.
window.CANDIDATES = {
 "asOf": "2026-11-14",
 "T": "2026-11-13",
 "screenAsOf": "2026-11-13",
 "screenFresh": true,
 "beta": {
  "korea": 0.7,
  "us": 0.91
 },
 "groups": {
  "korea|core": {
   "eligible": 17,
   "defects": [
    {
     "ticker": "278470",
     "name": "에이피알",
     "state": "결격",
     "flags": [
      {
       "k": "trend",
       "msg": "추세 붕괴(단·중·장기 모두 매도 이하)",
       "fresh": false
      },
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      },
      {
       "k": "tpcut",
       "msg": "컨센서스 목표가 14일 새 -12.3% 하향 — 논거 확인",
       "fresh": false
      }
     ],
     "note": "추세 붕괴(단·중·장기 모두 하락세) — 3분기 영업이익이 원화 강세에 따른 외화 평가손실로 컨센서스를 밑돌고 이익률이 낮아졌다. 코스피 시총 상위 60 중 편성 밖이면서 우량 정체성을 채우는 후보는 SK스퀘어(하이닉스 지분법 이익 왜곡·노출 중복으로 기각)·삼성E&A(삼성그룹 상한)·미래에셋증권·기업은행(금융 상한)뿐이라 대체 후보가 없다.",
     "judged": "2026-11-11",
     "verdict": "실질",
     "triedAt": "2026-11-13",
     "since": "2026-10-21",
     "age": 23,
     "long": 1
    },
    {
     "ticker": "000810",
     "name": "삼성화재",
     "state": "감시",
     "flags": [
      {
       "k": "drop",
       "msg": "5거래일 -12.4%(시장 중앙값 1.9%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "3분기 지배주주순이익 4,932억원(-8.3%)으로 감익했으나 카드 전망 범위 안이다. 1~9월 누적 1조8,655억원(+4.6%), 3분기 보험손익 191억원 흑자 전환으로 본업은 유지돼 매출 -6.6% 산식 확인 전까지 감시한다.",
     "judged": "2026-11-12",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "042700",
     "name": "한미반도체",
     "state": "감시",
     "flags": [
      {
       "k": "earn",
       "msg": "실적 발표(11/05) — 가이던스·논거 확인",
       "fresh": false
      }
     ],
     "note": "11/5 반도체 업종 동반 급락 — 3분기 매출 +8.9%·영업이익 +33.9%(영업이익률 50%대)로 역성장이 아니고 추세 붕괴도 아니다.",
     "judged": "2026-11-05",
     "verdict": "형식"
    },
    {
     "ticker": "064400",
     "name": "LG씨엔에스",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "2026.06 분기 영업이익은 -9.2%였지만 3분기 영업이익은 1,382억원으로 전년 대비 15.0% 늘었다. 어느 정체성 조건이 미달인지와 자사주 소각 이행 여부 확인 전까지 감시한다.",
     "judged": "2026-11-06",
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
     "note": "우량 수익성은 충족하지만 시총 순위가 우량 정체성 조건 바로 밖이고 시장 민감도가 매우 낮아 한국 편성 β 를 더 낮춘다.",
     "asOf": "2026-11-07",
     "url": "https://m.stock.naver.com/domestic/stock/003230/total"
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
     "flags": [
      {
       "k": "tpcut",
       "msg": "컨센서스 목표가 14일 새 -17.4% 하향 — 논거 확인",
       "fresh": false
      }
     ],
     "note": "3분기 영업이익 감소는 폴란드 K9 2차 물량 등 수익성 높은 수출 인도가 4분기로 밀리고 일회성 비용이 반영된 탓이다. 지상방산 수주잔고는 약 35조원이고 회사는 4분기 폴란드 천무 인도 목표를 높여 수출 성장 논거는 유지된다.",
     "judged": "2026-11-07",
     "verdict": "형식"
    },
    {
     "ticker": "103590",
     "name": "일진전기",
     "state": "감시",
     "flags": [],
     "note": "5거래일 -12.5%로 시장 중앙값 +0.4%와 달리 급락했고, 11월 5일 효성중공업 10%대 급락 등 전력기기주가 일제히 약세였다. 일진전기 고유 악재는 확인되지 않아 원인 확인 전까지 감시한다.",
     "judged": "2026-11-05",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "095340",
     "name": "ISC",
     "state": "감시",
     "flags": [],
     "note": "3분기 매출과 영업이익이 모두 전년보다 늘어 성장은 이어졌다. 생산능력 제약으로 일부 납품이 4분기로 밀려 매출이 기대에 못 미쳤지만 논거인 AI 테스트 소켓 수요는 그대로다.",
     "judged": "2026-11-07",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "161890",
     "name": "한국콜마",
     "status": "보류",
     "note": "컨센서스 출처 2곳 미확보",
     "asOf": "2026-10-18",
     "url": "https://m.stock.naver.com/domestic/stock/161890/total"
    },
    {
     "ticker": "319660",
     "name": "피에스케이",
     "status": "보류",
     "note": "3년 매출 연평균 음수로 성장 지속성 미달, 3분기 실적·컨센서스 2곳 미확인.",
     "asOf": "2026-11-05",
     "why": "3년 매출 연평균 -0.3% · FCF 마진 9.4% · 3년 평균 ROIC 11.9%",
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
     "ticker": "009150",
     "name": "삼성전기",
     "status": "보류",
     "note": "3년 지표 약함·컨센서스 분산",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 6.3% · FCF 마진 2.6% · 3년 평균 ROIC 5.7%",
     "cap": "삼성그룹 상한",
     "url": "https://m.stock.naver.com/domestic/stock/009150/total"
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
     "why": "3년 매출 연평균 67% · FCF 마진 20% · 3년 평균 ROIC 22.8%",
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
    }
   ]
  },
  "korea|value": {
   "eligible": 57,
   "defects": [
    {
     "ticker": "000270",
     "name": "기아",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      },
      {
       "k": "tpcut",
       "msg": "컨센서스 목표가 14일 새 -13.5% 하향 — 논거 확인",
       "fresh": false
      }
     ],
     "note": "3분기 영업이익은 관세율 인하 효과로 전년보다 늘어 이익 붕괴는 아니다. 전기차 인센티브·원재료 부담으로 컨센서스를 크게 밑돌고 누적 영업이익은 줄었지만 저평가 논거는 남아 있다.",
     "judged": "2026-11-07",
     "verdict": "형식",
     "triedAt": "2026-10-30"
    },
    {
     "ticker": "267270",
     "name": "HD건설기계",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달(EBIT/EV·FCF 수익률 상위 30%)",
       "fresh": false
      }
     ],
     "note": "합병 뒤 첫 분기 영업이익은 합산 전년보다 늘었고 순이익 감소는 외화채권 환산 손실 때문이다. 증권사 목표가 하향은 급락한 주가와 합병 효과 재산정이 겹친 조정이라 논거 훼손은 아니다.",
     "judged": "2026-11-02",
     "verdict": "형식"
    },
    {
     "ticker": "138040",
     "name": "메리츠금융지주",
     "state": "감시",
     "flags": [
      {
       "k": "drop",
       "msg": "5거래일 -10.2%(시장 중앙값 1.9%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "11일 발표한 3분기 지배주주순이익 4,707억원(전년비 -28.1%)이 컨센서스 6,345억원을 하회했다. 화재 투자손익 급감이 원인이나 보험손익(+34.9%)과 증권은 견조했고 50% 환원 방침도 재확인해 4분기 변동성 확인 전까지 감시한다.",
     "judged": "2026-11-12",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "066570",
     "name": "LG전자",
     "state": "감시",
     "flags": [],
     "note": "3분기 영업이익은 7,818억원(전년비 +13.5%)이고 1~3분기 누적 4조원을 처음 넘어 이익 붕괴는 아니다. 주제 기준 미달 원인은 확인 전까지 감시한다.",
     "judged": "2026-11-09",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "086280",
     "name": "현대글로비스",
     "state": "감시",
     "flags": [],
     "note": "실적 발표 당일(10/30) 확정치 미확인 — 영업이익 감소는 유가·운임 요인으로 논거는 유지",
     "judged": "2026-10-30",
     "verdict": "형식",
     "triedAt": "2026-10-30"
    },
    {
     "ticker": "018260",
     "name": "삼성에스디에스",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달(EBIT/EV·FCF 수익률 상위 30%)",
       "fresh": false
      }
     ],
     "note": "10/29 실적 확정치는 검색에 아직 없고, 새로 확인된 악재는 없다. 주제 기준 미달은 숫자 순위 경계로 보고 발표 후 다시 본다.",
     "judged": "2026-10-29",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "271560",
     "name": "오리온",
     "status": "검증 통과",
     "note": "저평가 정체성·이익 안정성·컨센 2출처 통과 — 저평가 주제에 결격이 생기면 대체 후보",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 12.4% · FCF/시총 9.3% · 매출 성장 7.3%",
     "url": "https://m.stock.naver.com/domestic/stock/271560/total"
    },
    {
     "ticker": "282330",
     "name": "BGF리테일",
     "status": "검증 통과",
     "note": "검증 통과 — 저평가 주제에 결격이 생기면 대체 후보",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 7.8% · FCF/시총 21.9% · 매출 성장 4.2%",
     "url": "https://m.stock.naver.com/domestic/stock/282330/total"
    },
    {
     "ticker": "004370",
     "name": "농심",
     "status": "검증 통과",
     "note": "검증 통과(관심 편성 중) — 저평가 주제에 결격이 생기면 대체 후보",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 7.6% · FCF/시총 9% · 매출 성장 2.2%",
     "url": "https://m.stock.naver.com/domestic/stock/004370/total"
    },
    {
     "ticker": "032830",
     "name": "삼성생명",
     "status": "보류",
     "note": "기업가치의 약 70%가 삼성전자 지분(우량 편성과 노출 중복)·3분기 일회성",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.5% · 매출 성장 9.9%",
     "cap": "삼성그룹 상한·금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/032830/total"
    },
    {
     "ticker": "004170",
     "name": "신세계",
     "status": "보류",
     "note": "3분기 증익 유지·추정 하향 멈춤 확인 필요",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.2% · FCF/시총 21.2% · 매출 성장 5.5%",
     "url": "https://m.stock.naver.com/domestic/stock/004170/total"
    },
    {
     "ticker": "018670",
     "name": "SK가스",
     "status": "보류",
     "note": "3분기 증익 유지·컨센 2출처 확인 필요",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 7.1% · FCF/시총 16.9% · 매출 성장 8.2%",
     "url": "https://m.stock.naver.com/domestic/stock/018670/total"
    },
    {
     "ticker": "071050",
     "name": "한국금융지주",
     "status": "보류",
     "note": "3분기 증익 유지·컨센 2출처 확인 필요",
     "asOf": "2026-10-18",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/071050/total"
    },
    {
     "ticker": "002790",
     "name": "아모레퍼시픽홀딩스",
     "status": "보류",
     "note": "3분기 연결 매출·영업이익이 늘었지만 지주사를 다루는 증권사가 적어 컨센서스 목표가를 두 곳에서 확인하지 못했다.",
     "asOf": "2026-11-04",
     "why": "EBIT/EV 15.7% · FCF/시총 27.6% · 매출 성장 8.5%",
     "url": "https://m.stock.naver.com/domestic/stock/002790/total"
    },
    {
     "ticker": "007070",
     "name": "GS리테일",
     "status": "보류",
     "note": "편의점·슈퍼·홈쇼핑 개선으로 상반기 영업이익이 늘었지만 작년 3분기 높은 기저를 넘는지 3분기 실적 확인이 필요하다.",
     "asOf": "2026-11-04",
     "url": "https://m.stock.naver.com/domestic/stock/007070/total"
    },
    {
     "ticker": "012330",
     "name": "현대모비스",
     "status": "검증 대기",
     "why": "EBIT/EV 9.4% · FCF/시총 9.7% · 매출 성장 6.8%",
     "url": "https://m.stock.naver.com/domestic/stock/012330/total"
    },
    {
     "ticker": "081660",
     "name": "미스토홀딩스",
     "status": "검증 대기",
     "why": "EBIT/EV 12.1% · FCF/시총 16.4% · 매출 성장 4.7%",
     "url": "https://m.stock.naver.com/domestic/stock/081660/total"
    },
    {
     "ticker": "033780",
     "name": "KT&G",
     "status": "검증 대기",
     "why": "EBIT/EV 6.7% · FCF/시총 -0.3% · 매출 성장 11.4%",
     "url": "https://m.stock.naver.com/domestic/stock/033780/total"
    }
   ]
  },
  "korea|dividend": {
   "eligible": 33,
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
     "ticker": "030200",
     "name": "KT",
     "state": "감시",
     "flags": [],
     "note": "11/10 발표된 3분기 영업이익은 5053억원으로 전년 대비 6.1% 감소에 그쳤고, 해킹 보상 영향이 컸으며 AX 매출은 9%대 성장했다. 2026년 최소 DPS 2,400원 방침은 유지되어 논거는 살아 있다.",
     "judged": "2026-11-10",
     "verdict": "형식",
     "by": "ai"
    }
   ],
   "list": [
    {
     "ticker": "383220",
     "name": "F&F",
     "status": "보류",
     "note": "3분기 실적 발표 전이고 2분기 영업이익이 컨센서스를 밑돌았으며 이익 변동이 배당 후보 중 가장 크다.",
     "asOf": "2026-11-07",
     "why": "배당 비감소 4년 · 배당성향 25.4% · 배당 4.6%",
     "url": "https://m.stock.naver.com/domestic/stock/383220/total"
    },
    {
     "ticker": "003690",
     "name": "코리안리",
     "status": "보류",
     "note": "금융(편중 유지), 컨센서스 2곳 교차확인 실패.",
     "asOf": "2026-11-05",
     "why": "배당 비감소 3년 · 배당성향 31.3% · 배당 4.4%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/003690/total"
    },
    {
     "ticker": "031210",
     "name": "서울보증보험",
     "status": "보류",
     "note": "금융 업종 상한에 걸리고 목표가를 내는 증권사 1곳뿐인 블로커 유지.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 1년 · 배당성향 74.5% · 배당 6.7%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/031210/total"
    },
    {
     "ticker": "030000",
     "name": "제일기획",
     "status": "보류",
     "note": "삼성그룹 계열이라 삼성그룹 상한 5 초과를 해소하지 못하고 2026E 영업이익 감익 추정 블로커 유지.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 2년 · 배당성향 60% · 배당 6.5%",
     "url": "https://m.stock.naver.com/domestic/stock/030000/total"
    },
    {
     "ticker": "009970",
     "name": "영원무역홀딩스",
     "status": "보류",
     "note": "8월 밸류업(배당성향 30%·자사주 매입) 확인, 지주사 연결 왜곡과 컨센서스 부재가 블로커.",
     "asOf": "2026-10-26",
     "why": "배당 비감소 4년 · 배당성향 20.8% · 배당 3.8%",
     "url": "https://m.stock.naver.com/domestic/stock/009970/total"
    },
    {
     "ticker": "000240",
     "name": "한국앤컴퍼니",
     "status": "보류",
     "note": "배당 지속성은 양호하나 경영권 분쟁 소송과 실적·컨센서스 미확인.",
     "asOf": "2026-10-26",
     "why": "배당 비감소 4년 · 배당성향 30% · 배당 5.2%",
     "url": "https://m.stock.naver.com/domestic/stock/000240/total"
    },
    {
     "ticker": "018670",
     "name": "SK가스",
     "status": "보류",
     "note": "2분기 영업손실로 이익 안정성이 배당 주제에 못 미치고 3분기 실적 발표 전.",
     "asOf": "2026-11-07",
     "why": "배당 비감소 4년 · 배당성향 34.5% · 배당 3.8%",
     "url": "https://m.stock.naver.com/domestic/stock/018670/total"
    },
    {
     "ticker": "001800",
     "name": "오리온홀딩스",
     "status": "보류",
     "note": "배당 증액·최소 배당 계획은 확인했지만 지주사 목표가를 내는 최근 리포트가 네이버 집계 외에 없다.",
     "asOf": "2026-11-07",
     "why": "배당 비감소 4년 · 배당성향 54.7% · 배당 4.8%",
     "url": "https://m.stock.naver.com/domestic/stock/001800/total"
    },
    {
     "ticker": "005380",
     "name": "현대차",
     "status": "보류",
     "note": "분기배당 유지와 연간 최소 배당 정책은 지켜지고 있지만 3분기에 연간 판매·영업이익률 목표를 낮췄고 1~3분기 누적 영업이익이 줄어 이익 안정성 확인이 더 필요하다.",
     "asOf": "2026-11-04",
     "why": "배당 비감소 0년 · 배당성향 27.7% · 배당 3.7%",
     "url": "https://m.stock.naver.com/domestic/stock/005380/total"
    },
    {
     "ticker": "024110",
     "name": "기업은행",
     "status": "검증 대기",
     "why": "배당 비감소 0년 · 배당성향 30.8% · 배당 5.5%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/024110/total"
    }
   ]
  },
  "us|core": {
   "eligible": 54,
   "defects": [
    {
     "ticker": "V",
     "name": "Visa",
     "state": "감시",
     "flags": [],
     "note": "2026.09 분기 순매출 121억 달러(+13%), GAAP 순이익 60억 달러(+18%)로 대형·흑자 조건은 유지됐다. 신호 발동 원인인 3년 평균 ROIC 순위는 확인 전까지 감시한다.",
     "judged": "2026-11-02",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "GOOGL",
     "name": "Alphabet",
     "state": "감시",
     "flags": [],
     "note": "10/28 실적 뒤 급락은 투자 평가손과 AI 설비투자 대비 잉여현금흐름 적자 우려 때문이다. 매출 +25%·클라우드 매출 두 배 성장·연간 capex 가이던스 유지로 사업 논거는 그대로라 형식 판정, 현금흐름 추이를 감시한다.",
     "judged": "2026-10-29",
     "verdict": "형식"
    },
    {
     "ticker": "COST",
     "name": "Costco Wholesale",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "EBIT 마진 예전 조건만",
     "judged": "2026-10-18",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "ETN",
     "name": "Eaton",
     "status": "검증 통과",
     "note": "3분기 매출 28% 증가(유기적 19%, 가이던스 상단 초과)·부문 이익률 최고치, 연간 유기 성장 가이던스 상향. 데이터센터 수주 쏠림과 인수(Boyd Thermal·COL Group) 통합이 리스크다.",
     "asOf": "2026-11-04",
     "why": "매출 성장 10.3% · 주식 수 연 -2.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/ETN/total"
    },
    {
     "ticker": "ASML",
     "name": "ASML N.V.",
     "status": "보류",
     "note": "반도체 집중·β 때문에 최후순위",
     "asOf": "2026-10-12",
     "why": "매출 성장 15.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/ASML.O/total"
    },
    {
     "ticker": "SAN",
     "name": "Banco Santander S.A.",
     "status": "검증 대기",
     "why": "매출 성장 -9.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/SAN/total"
    },
    {
     "ticker": "MUFG",
     "name": "Mitsubishi UFJ Financial",
     "status": "검증 대기",
     "why": "매출 성장 3%",
     "url": "https://m.stock.naver.com/worldstock/stock/MUFG.K/total"
    },
    {
     "ticker": "UBS",
     "name": "UBS",
     "status": "검증 대기",
     "why": "매출 성장 -20.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/UBS/total"
    },
    {
     "ticker": "HSBC",
     "name": "HSBC",
     "status": "검증 대기",
     "why": "매출 성장 -9.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/HSBC.K/total"
    },
    {
     "ticker": "BBVA",
     "name": "Banco Bilbao Vizcaya Argentaria S.A.",
     "status": "검증 대기",
     "why": "매출 성장 -5.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/BBVA.K/total"
    },
    {
     "ticker": "RY",
     "name": "Royal Bank of Canada",
     "status": "검증 대기",
     "why": "매출 성장 -1.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/RY/total"
    },
    {
     "ticker": "XOM",
     "name": "Exxonmobil",
     "status": "검증 대기",
     "why": "매출 성장 -5% · 주식 수 연 0.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/XOM/total"
    },
    {
     "ticker": "TD",
     "name": "The Toronto-Dominion Bank",
     "status": "검증 대기",
     "why": "매출 성장 -6.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/TD/total"
    },
    {
     "ticker": "MRK",
     "name": "Merck &",
     "status": "검증 대기",
     "why": "매출 성장 1.3% · 주식 수 연 -1.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/MRK/total"
    },
    {
     "ticker": "BHP",
     "name": "BHP",
     "status": "검증 대기",
     "why": "매출 성장 14.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/BHP/total"
    }
   ]
  },
  "us|growth": {
   "eligible": 68,
   "defects": [
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
      },
      {
       "k": "earn",
       "msg": "실적 발표(11/04) · EPS 서프라이즈 -73.4% — 가이던스·논거 확인",
       "fresh": false
      }
     ],
     "note": "3분기(11/4) 총거래액 +20%(고정환율)·조정 EPS +35%로 가이던스 상단. GAAP EPS 하회는 지분 투자 평가손실 때문 — 논거 훼손 아님. 인수 완료 시 자산 급증 가능.",
     "judged": "2026-11-05",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "MNST",
     "name": "Monster Beverage",
     "status": "보류",
     "note": "분할 후 컨센 2출처·3분기 연속 15% 성장 확인 시 UBER 자리 1순위(저β)",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 9.5% · FCF 마진 23.7% · 3년 평균 ROIC 32.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/MNST.O/total"
    },
    {
     "ticker": "CDNS",
     "name": "Cadence Design Systems",
     "status": "보류",
     "note": "품질 최상위(3년 ROIC 50%·순현금) — 인수 후 자산 증가율, 3년 성장 14%(경계)",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 14.1% · FCF 마진 30% · 3년 평균 ROIC 41%",
     "url": "https://m.stock.naver.com/worldstock/stock/CDNS.O/total"
    },
    {
     "ticker": "HWM",
     "name": "Howmet Aerospace",
     "status": "보류",
     "note": "유기적 +21% — 인수·순차입·10월 목표가 하향",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 13.4% · FCF 마진 17.3% · 3년 평균 ROIC 17.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/HWM/total"
    },
    {
     "ticker": "ASML",
     "name": "ASML N.V.",
     "status": "보류",
     "note": "반도체 편성 결격 시에만",
     "asOf": "2026-10-12",
     "url": "https://m.stock.naver.com/worldstock/stock/ASML.O/total"
    },
    {
     "ticker": "MCO",
     "name": "Moody's",
     "status": "검증 대기",
     "note": "우량 대형 조건 밖이지만 성장 후보로는 가능",
     "asOf": "2026-10-18",
     "url": "https://finance.yahoo.com/quote/MCO"
    },
    {
     "ticker": "ADSK",
     "name": "Autodesk",
     "status": "검증 대기",
     "why": "3년 매출 연평균 12.9% · FCF 마진 33.4% · 3년 평균 ROIC 40.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/ADSK.O/total"
    },
    {
     "ticker": "ASX",
     "name": "ASE Technology",
     "status": "검증 대기",
     "url": "https://m.stock.naver.com/worldstock/stock/ASX/total"
    },
    {
     "ticker": "PBR",
     "name": "Petroleo Brasileiro Reptg 2",
     "status": "검증 대기",
     "url": "https://m.stock.naver.com/worldstock/stock/PBR/total"
    },
    {
     "ticker": "TT",
     "name": "Trane Technologies",
     "status": "검증 대기",
     "why": "3년 매출 연평균 10.1% · FCF 마진 13.2% · 3년 평균 ROIC 24.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/TT/total"
    },
    {
     "ticker": "DELL",
     "name": "Dell Technologies",
     "status": "검증 대기",
     "why": "3년 매출 연평균 3.5% · FCF 마진 7.5% · 3년 평균 ROIC 29%",
     "url": "https://m.stock.naver.com/worldstock/stock/DELL.K/total"
    },
    {
     "ticker": "SCCO",
     "name": "Southern Copper",
     "status": "검증 대기",
     "why": "3년 매출 연평균 10.1% · FCF 마진 25.5% · 3년 평균 ROIC 35.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/SCCO.K/total"
    },
    {
     "ticker": "BP",
     "name": "BP",
     "status": "검증 대기",
     "url": "https://m.stock.naver.com/worldstock/stock/BP/total"
    }
   ]
  },
  "us|value": {
   "eligible": 75,
   "defects": [
    {
     "ticker": "GM",
     "name": "General Motors",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달, 매출 역성장(가치 함정)",
       "fresh": false
      }
     ],
     "note": "10/20 3분기 EPS가 예상을 4.2% 웃돌았다 — 가이던스·GAAP 이익 확인 전까지 감시.",
     "judged": "2026-10-21",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "AMP",
     "name": "Ameriprise Financial",
     "state": "감시",
     "flags": [],
     "note": "10/29 3분기 EPS가 시장 예상을 4.1% 웃돌았고 순이익도 +5%였으나 EBIT는 전년 대비 -1%였다. 가이던스 훼손과 회사 고유 악재는 확인되지 않아 EBIT 감소 원인과 Comerica 자산 유출 영향 확인 전까지 감시한다.",
     "judged": "2026-10-30",
     "verdict": "형식",
     "by": "ai"
    }
   ],
   "list": [
    {
     "ticker": "TEL",
     "name": "TE Connectivity",
     "status": "검증 통과",
     "note": "정체성 두 문턱 충족·FQ3 매출 +14% — β 가 높아 β 를 낮추는 교체와 짝일 때 편입",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 4.8% · FCF/시총 5.2% · 매출 성장 8.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/TEL/total"
    },
    {
     "ticker": "NTAP",
     "name": "NetApp",
     "status": "검증 통과",
     "note": "1분기(FY27) 매출 30% 증가(추가 1주 제외 26%)·비GAAP EPS 66% 증가, 연간 매출·EPS 가이던스 상향. 하반기 성장 둔화 전망과 잉여현금흐름 감소·매출총이익률 하락이 리스크다.",
     "asOf": "2026-11-04",
     "url": "https://finance.yahoo.com/quote/NTAP"
    },
    {
     "ticker": "COR",
     "name": "Cencora",
     "status": "보류",
     "note": "EBIT/EV 문턱 미달(FCF 로만 통과)·오피오이드 소송",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.6% · FCF/시총 4.8% · 매출 성장 9.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/COR/total"
    },
    {
     "ticker": "LHX",
     "name": "L3Harris Technologies",
     "status": "보류",
     "note": "방산 중복(GD)·3년 ROIC 낮음·3분기 10/29",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.5% · FCF/시총 5.3% · 매출 성장 2.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/LHX/total"
    },
    {
     "ticker": "LMT",
     "name": "Lockheed Martin",
     "status": "보류",
     "note": "방산 중복(GD)·최근 EBIT 감소 원인 미확인",
     "asOf": "2026-10-18",
     "alsoIn": "dividend",
     "url": "https://finance.yahoo.com/quote/LMT"
    },
    {
     "ticker": "IQV",
     "name": "IQVIA",
     "status": "보류",
     "note": "컨센 목표가가 현재가 수준",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.8% · FCF/시총 4.6% · 매출 성장 5.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/IQV/total"
    },
    {
     "ticker": "FDX",
     "name": "FedEx",
     "status": "보류",
     "note": "분사로 재무 왜곡",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.1% · FCF/시총 6.8% · 매출 성장 7.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/FDX/total"
    },
    {
     "ticker": "BAC",
     "name": "Bank of America",
     "status": "보류",
     "note": "금융 4번째(편중)",
     "asOf": "2026-10-18",
     "why": "매출 성장 6.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/BAC/total"
    },
    {
     "ticker": "LYG",
     "name": "Lloyds Banking",
     "status": "보류",
     "note": "11-11 기한",
     "asOf": "2026-10-18",
     "why": "매출 성장 -1.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/LYG/total"
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
     "ticker": "WFC",
     "name": "Wells Fargo &",
     "status": "검증 대기",
     "why": "매출 성장 -3.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/WFC/total"
    },
    {
     "ticker": "CRM",
     "name": "Salesforce",
     "status": "검증 대기",
     "why": "EBIT/EV 4.5% · FCF/시총 8% · 매출 성장 9.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/CRM/total"
    }
   ]
  },
  "us|dividend": {
   "eligible": 65,
   "defects": [
    {
     "ticker": "KO",
     "name": "Coca-Cola",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "10/27 3분기 순매출 +7%, 판매량 +5%, 조정 EPS +11%로 EPS 서프라이즈 4.6%를 냈고 연간 조정 EPS 성장률 가이던스를 11% 이상으로 상향했다. 배당 논거는 유지돼 숫자 신호만 뜬 것으로 본다.",
     "judged": "2026-10-28",
     "verdict": "형식",
     "by": "ai"
    },
    {
     "ticker": "JNJ",
     "name": "Johnson & Johnson",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "주가 상승",
     "judged": "2026-10-18",
     "verdict": "형식"
    },
    {
     "ticker": "LMT",
     "name": "Lockheed Martin",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "2분기 EBIT 감소로 주제 기준 미달 신호가 떴지만, 10월 22일 3분기 매출 +11%·EPS 7.97달러(전년 6.95달러)로 4개 부문이 모두 성장하고 수주잔고가 사상 최대로 늘었으며 연간 매출·EPS·잉여현금흐름 전망을 다시 올려 실질 결격은 아니다.",
     "judged": "2026-10-23",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "PG",
     "name": "Procter & Gamble",
     "status": "검증 통과",
     "note": "70년 연속 배당 증가·이익 안정 — 10/22 실적 확인 뒤 배당 결격 자리 1순위",
     "asOf": "2026-10-21",
     "url": "https://finance.yahoo.com/quote/PG"
    },
    {
     "ticker": "MCD",
     "name": "McDonald's",
     "status": "보류",
     "note": "추세·컨센 하향 멈춤 확인 시",
     "asOf": "2026-10-18",
     "url": "https://finance.yahoo.com/quote/MCD"
    },
    {
     "ticker": "BAC",
     "name": "Bank of America",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 29.2% · 배당 2.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/BAC/total"
    },
    {
     "ticker": "PBR.A",
     "name": "Petroleo Brasileiro Reptg 2 Pref Shs",
     "status": "검증 대기",
     "why": "배당성향 4.5% · 배당 6.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/PBRa/total"
    },
    {
     "ticker": "ITUB",
     "name": "Itau Unibanco SA",
     "status": "검증 대기",
     "why": "배당성향 11.5% · 배당 6.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/ITUB.K/total"
    },
    {
     "ticker": "LYG",
     "name": "Lloyds Banking",
     "status": "검증 대기",
     "why": "배당성향 68.8% · 배당 4.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/LYG/total"
    },
    {
     "ticker": "BP",
     "name": "BP",
     "status": "검증 대기",
     "why": "배당성향 26.7% · 배당 4.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/BP/total"
    },
    {
     "ticker": "ING",
     "name": "ING Groep N.V.",
     "status": "검증 대기",
     "why": "배당성향 62.3% · 배당 4.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/ING/total"
    },
    {
     "ticker": "WMB",
     "name": "The Williams Companies",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 93.3% · 배당 3%",
     "url": "https://m.stock.naver.com/worldstock/stock/WMB/total"
    },
    {
     "ticker": "IX",
     "name": "ORIX CORPORATION",
     "status": "검증 대기",
     "why": "배당성향 0.2% · 배당 2.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/IX/total"
    },
    {
     "ticker": "RIO",
     "name": "Rio Tinto",
     "status": "검증 대기",
     "why": "배당성향 58.8% · 배당 5.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/RIO/total"
    },
    {
     "ticker": "USB",
     "name": "U.S. Bancorp",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 41.8% · 배당 3.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/USB/total"
    }
   ]
  }
 },
 "summary": {
  "review": 0,
  "defect": 1,
  "watch": 25,
  "untried": 0,
  "dup": 0,
  "long": 1
 }
};
