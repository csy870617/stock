// 주제별 후보 종목 + 편성 결격 점검 — scripts/check-defects.js 가 생성(LLM 토큰 0). 앱 '추천 종목' 주제 화면의 T3 아래 '후보 종목'.
// groups["<country>|<theme>"] = {defects 편성 결격(state 결격|점검 필요|감시), list 후보(status 검증 통과|보류|검증 대기)}
// 세션 판정은 data/candidate-notes.json(CLAUDE.md §3-7) — 이 파일을 직접 고치지 않는다.
window.CANDIDATES = {
 "asOf": "2026-10-21",
 "T": "2026-10-21",
 "screenAsOf": "2026-10-21",
 "screenFresh": true,
 "groups": {
  "korea|core": {
   "eligible": 17,
   "defects": [
    {
     "ticker": "028260",
     "name": "삼성물산",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "ROE 6%·3년 평균 ROIC 5.7%(우량 정체성 미달) — 검증 통과 대체 없음",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "278470",
     "name": "에이피알",
     "state": "결격",
     "flags": [
      {
       "k": "trend",
       "msg": "추세 붕괴(단·중·장기 모두 매도 이하)",
       "fresh": false
      }
     ],
     "note": "단·중·장기 신호 모두 매도 이하(추세 붕괴) — 3분기 영업이익 추정 하향(원화 강세·유럽 물류비)으로 증권사 목표가 하향, 매출 성장은 유지돼 기초 체력 훼손은 아님 · 검증 통과 대체 후보 없어 감시",
     "judged": "2026-10-21",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    }
   ],
   "list": [
    {
     "ticker": "024110",
     "name": "기업은행",
     "status": "검증 대기",
     "why": "3년 평균 ROIC 1% · 매출 성장 -9.9% · 주식 수 연 0%",
     "url": "https://m.stock.naver.com/domestic/stock/024110/total"
    }
   ]
  },
  "korea|growth": {
   "eligible": 46,
   "defects": [
    {
     "ticker": "298040",
     "name": "효성중공업",
     "state": "감시",
     "flags": [],
     "note": "3분기 건설 부문 일회성 원가 반영 전망(중공업 부문은 증익 예상) — 확정 실적 확인 전까지 감시",
     "judged": "2026-10-18",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "443060",
     "name": "HD현대마린솔루션",
     "status": "검증 통과",
     "note": "3년 평균 ROIC 33%·FCF 마진 15.5% — HD 계열 결격 시 계열 비중을 늘리지 않는 대체",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 14.1% · FCF 마진 15.5% · 3년 평균 ROIC 33.3%",
     "url": "https://m.stock.naver.com/domestic/stock/443060/total"
    },
    {
     "ticker": "003230",
     "name": "삼양식품",
     "status": "검증 통과",
     "note": "3년 매출 연평균 37%·3년 평균 ROIC 19.5% — 어느 편성 결격에도 대체 1순위(한국 β 를 낮추는 점은 짝 교체로 상쇄)",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 37.3% · FCF 마진 -5.9% · 3년 평균 ROIC 19.5%",
     "url": "https://m.stock.naver.com/domestic/stock/003230/total"
    },
    {
     "ticker": "010140",
     "name": "삼성중공업",
     "status": "검증 통과",
     "note": "3년 매출 연평균 21.5%·FCF 마진 12.6% — HD현대중공업 결격 시 같은 업종 대체",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 21.5% · FCF 마진 12.6% · 3년 평균 ROIC 6.1%",
     "url": "https://m.stock.naver.com/domestic/stock/010140/total"
    },
    {
     "ticker": "103590",
     "name": "일진전기",
     "status": "보류",
     "note": "FCF 마진·ROIC 약함, 편성 전력기기 2종목과 겹침 — 효성중공업 결격 시 1순위",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 20.6% · FCF 마진 3% · 3년 평균 ROIC 11.8%",
     "url": "https://m.stock.naver.com/domestic/stock/103590/total"
    },
    {
     "ticker": "161890",
     "name": "한국콜마",
     "status": "보류",
     "note": "컨센서스 출처 2곳 미확보",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 13.4% · FCF 마진 4.7% · 3년 평균 ROIC 7.5%",
     "url": "https://m.stock.naver.com/domestic/stock/161890/total"
    },
    {
     "ticker": "010120",
     "name": "LS ELECTRIC",
     "status": "보류",
     "note": "FCF 마진·ROIC 약함, 지배구조 미확인",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 13.7% · FCF 마진 2% · 3년 평균 ROIC 9.6%",
     "url": "https://m.stock.naver.com/domestic/stock/010120/total"
    },
    {
     "ticker": "079550",
     "name": "LIG디펜스앤에어로스페이스",
     "status": "보류",
     "note": "한화에어로스페이스 결격 시 대체",
     "asOf": "2026-10-18",
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
     "url": "https://m.stock.naver.com/domestic/stock/009150/total"
    },
    {
     "ticker": "006260",
     "name": "LS",
     "status": "검증 대기",
     "why": "3년 매출 연평균 22.1% · FCF 마진 -3% · 3년 평균 ROIC 5.9%",
     "url": "https://m.stock.naver.com/domestic/stock/006260/total"
    },
    {
     "ticker": "319660",
     "name": "피에스케이",
     "status": "검증 대기",
     "why": "3년 매출 연평균 -0.3% · FCF 마진 9.4% · 3년 평균 ROIC 11.9%",
     "url": "https://m.stock.naver.com/domestic/stock/319660/total"
    },
    {
     "ticker": "000500",
     "name": "가온전선",
     "status": "검증 대기",
     "why": "3년 매출 연평균 21.6% · FCF 마진 0.7% · 3년 평균 ROIC 6%",
     "url": "https://m.stock.naver.com/domestic/stock/000500/total"
    },
    {
     "ticker": "011780",
     "name": "금호석유화학",
     "status": "검증 대기",
     "why": "3년 매출 연평균 -4.6% · FCF 마진 7.5% · 3년 평균 ROIC 3.4%",
     "url": "https://m.stock.naver.com/domestic/stock/011780/total"
    }
   ]
  },
  "korea|value": {
   "eligible": 56,
   "defects": [
    {
     "ticker": "000270",
     "name": "기아",
     "state": "감시",
     "flags": [
      {
       "k": "tpcut",
       "msg": "컨센서스 목표가 14일 새 -11.2% 하향 — 논거 확인",
       "fresh": false
      }
     ],
     "note": "원재료비·전기차 믹스로 3분기 이익 추정 하향(매수 의견 유지) — 3분기 실적에서 확인",
     "judged": "2026-10-18",
     "verdict": "형식"
    },
    {
     "ticker": "001120",
     "name": "LX인터내셔널",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "시총 순위 경계",
     "judged": "2026-10-18",
     "verdict": "형식"
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
     "note": "합병 전 재무 왜곡 — 합병 후 재무로 재판정",
     "judged": "2026-10-18",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "271560",
     "name": "오리온",
     "status": "검증 통과",
     "note": "저평가 정체성·이익 안정성·컨센 2출처 통과 — β 가 매우 낮아 β 를 올리는 교체와 짝일 때 편입",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 12.5% · FCF/시총 9.3% · 매출 성장 7.3%",
     "url": "https://m.stock.naver.com/domestic/stock/271560/total"
    },
    {
     "ticker": "282330",
     "name": "BGF리테일",
     "status": "검증 통과",
     "note": "검증 통과 — β 가 매우 낮아 β 를 올리는 교체와 짝일 때 편입",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 8.1% · FCF/시총 23% · 매출 성장 4.2%",
     "url": "https://m.stock.naver.com/domestic/stock/282330/total"
    },
    {
     "ticker": "004370",
     "name": "농심",
     "status": "검증 통과",
     "note": "검증 통과(관심 편성 중) — β 가 매우 낮아 β 를 올리는 교체와 짝일 때 편입",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.9% · FCF/시총 8.1% · 매출 성장 2.2%",
     "url": "https://m.stock.naver.com/domestic/stock/004370/total"
    },
    {
     "ticker": "032830",
     "name": "삼성생명",
     "status": "보류",
     "note": "기업가치의 약 70%가 삼성전자 지분(우량 편성과 노출 중복)·3분기 일회성",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.6% · 매출 성장 9.9%",
     "url": "https://m.stock.naver.com/domestic/stock/032830/total"
    },
    {
     "ticker": "004170",
     "name": "신세계",
     "status": "보류",
     "note": "3분기 증익 유지·추정 하향 멈춤 확인 필요",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.1% · FCF/시총 19.6% · 매출 성장 5.5%",
     "url": "https://m.stock.naver.com/domestic/stock/004170/total"
    },
    {
     "ticker": "018670",
     "name": "SK가스",
     "status": "보류",
     "note": "3분기 증익 유지·컨센 2출처 확인 필요",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.8% · FCF/시총 14.9% · 매출 성장 8.2%",
     "url": "https://m.stock.naver.com/domestic/stock/018670/total"
    },
    {
     "ticker": "071050",
     "name": "071050",
     "status": "보류",
     "note": "3분기 증익 유지·컨센 2출처 확인 필요",
     "asOf": "2026-10-18",
     "url": "https://m.stock.naver.com/domestic/stock/071050/total"
    },
    {
     "ticker": "012330",
     "name": "현대모비스",
     "status": "검증 대기",
     "why": "EBIT/EV 9.7% · FCF/시총 10.1% · 매출 성장 6.8%",
     "url": "https://m.stock.naver.com/domestic/stock/012330/total"
    },
    {
     "ticker": "047050",
     "name": "포스코인터내셔널",
     "status": "검증 대기",
     "why": "EBIT/EV 7.1% · FCF/시총 13.3% · 매출 성장 0.3%",
     "url": "https://m.stock.naver.com/domestic/stock/047050/total"
    },
    {
     "ticker": "033780",
     "name": "KT&G",
     "status": "검증 대기",
     "why": "EBIT/EV 6.1% · FCF/시총 -0.3% · 매출 성장 11.4%",
     "url": "https://m.stock.naver.com/domestic/stock/033780/total"
    },
    {
     "ticker": "021240",
     "name": "코웨이",
     "status": "검증 대기",
     "why": "EBIT/EV 9.1% · FCF/시총 -2.5% · 매출 성장 15.2%",
     "url": "https://m.stock.naver.com/domestic/stock/021240/total"
    },
    {
     "ticker": "006260",
     "name": "LS",
     "status": "검증 대기",
     "why": "EBIT/EV 6.2% · FCF/시총 -13.1% · 매출 성장 15.7%",
     "url": "https://m.stock.naver.com/domestic/stock/006260/total"
    }
   ]
  },
  "korea|dividend": {
   "eligible": 28,
   "defects": [
    {
     "ticker": "000810",
     "name": "삼성화재",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "주가 상승으로 배당수익률 문턱 경계",
     "judged": "2026-10-18",
     "verdict": "형식"
    },
    {
     "ticker": "086790",
     "name": "하나금융지주",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "주가 상승으로 배당수익률 문턱 경계",
     "judged": "2026-10-18",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "030200",
     "name": "KT",
     "status": "보류",
     "note": "1·2분기 영업이익 감소, 신뢰 컨센 2출처 없음 — 3분기 회복·분기 배당 유지 시 비금융 1순위",
     "asOf": "2026-10-18",
     "why": "배당 비감소 2년 · 배당성향 33.6% · 배당 4.9%",
     "url": "https://m.stock.naver.com/domestic/stock/030200/total"
    },
    {
     "ticker": "003690",
     "name": "코리안리",
     "status": "보류",
     "note": "3년 연속 배당 최대, 컨센 출처 간 10% 괴리 — 세 번째 출처 필요",
     "asOf": "2026-10-18",
     "why": "배당 비감소 3년 · 배당성향 31.3% · 배당 4%",
     "url": "https://m.stock.naver.com/domestic/stock/003690/total"
    },
    {
     "ticker": "031210",
     "name": "서울보증보험",
     "status": "보류",
     "note": "목표가 내는 증권사 1곳",
     "asOf": "2026-10-18",
     "why": "배당 비감소 1년 · 배당성향 74.5% · 배당 6.8%",
     "url": "https://m.stock.naver.com/domestic/stock/031210/total"
    },
    {
     "ticker": "030000",
     "name": "제일기획",
     "status": "보류",
     "note": "2026년 이익 감소 전망",
     "asOf": "2026-10-18",
     "why": "배당 비감소 2년 · 배당성향 60% · 배당 6.3%",
     "url": "https://m.stock.naver.com/domestic/stock/030000/total"
    },
    {
     "ticker": "024110",
     "name": "기업은행",
     "status": "검증 대기",
     "why": "배당 비감소 0년 · 배당성향 30.8% · 배당 5.3%",
     "url": "https://m.stock.naver.com/domestic/stock/024110/total"
    },
    {
     "ticker": "004800",
     "name": "효성",
     "status": "검증 대기",
     "why": "배당 비감소 1년 · 배당성향 25.3% · 배당 4.1%",
     "url": "https://m.stock.naver.com/domestic/stock/004800/total"
    }
   ]
  },
  "korea|rising": {
   "eligible": 14,
   "defects": [
    {
     "ticker": "058470",
     "name": "리노공업",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 매출 성장 미달(3년 4.9%·향후 18.4%), PEG 1.77",
       "fresh": false
      }
     ],
     "note": "성장 숫자·PEG 미달 — 품질 최상위라 대체 확보 시 교체",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "064760",
     "name": "티씨케이",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 매출 성장 미달(3년 -1.9%·향후 31.3%)",
       "fresh": false
      }
     ],
     "note": "3년 매출 연평균 -1.9% — 근접 완화선 미달, 대체 후보 소진",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "403870",
     "name": "HPSP",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 매출 성장 미달(3년 2.8%·향후 48%)",
       "fresh": false
      }
     ],
     "note": "3년 성장 2.8%·1·2분기 매출·영업이익 감소",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "082920",
     "name": "비츠로셀",
     "state": "감시",
     "flags": [],
     "note": "상반기 매출 +30.7%·영업이익 +25.1%로 성장 유지, 최근 목표가 하향 원인 미확인 — 감시",
     "judged": "2026-10-18",
     "verdict": "형식"
    },
    {
     "ticker": "095340",
     "name": "ISC",
     "state": "감시",
     "flags": [],
     "note": "근접 후보(3년 평균 ROIC 14.4%)",
     "judged": "2026-10-18",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "092730",
     "name": "네오팜",
     "status": "보류",
     "note": "2분기 매출 +36% — 목표가 내는 증권사 1곳",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 15.9% · 3년 평균 ROIC 38.9% · PEG 0.5",
     "url": "https://m.stock.naver.com/domestic/stock/092730/total"
    },
    {
     "ticker": "003350",
     "name": "한국화장품제조",
     "status": "보류",
     "note": "증권사 커버리지 없음 — 11-16까지 진전 없으면 기각",
     "asOf": "2026-10-17",
     "why": "3년 매출 연평균 21.1% · 3년 평균 ROIC 40.7% · PEG 0.4",
     "url": "https://m.stock.naver.com/domestic/stock/003350/total"
    }
   ]
  },
  "us|core": {
   "eligible": 61,
   "defects": [
    {
     "ticker": "UNH",
     "name": "UnitedHealth Group",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      },
      {
       "k": "earn",
       "msg": "실적 발표(10/13) · EPS 서프라이즈 13.8% · 전년 대비 매출 -0.4% — 가이던스·논거 확인",
       "fresh": false
      }
     ],
     "note": "마진·3년 ROIC 구조적 미달 — 검증 통과 대체 없음",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "AMZN",
     "name": "Amazon",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달(3년 평균 ROIC 상위 절반)",
       "fresh": false
      }
     ],
     "note": "3년 ROIC 문턱 근소 미달",
     "judged": "2026-10-18",
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
     "ticker": "CB",
     "name": "Chubb",
     "status": "보류",
     "note": "컨센 목표가가 현재가 수준(편입 즉시 소진)·금융 편중 — 3분기 뒤 목표가 상향 시 UNH 자리 후보",
     "asOf": "2026-10-18",
     "why": "매출 성장 6.5% · 주식 수 연 -1.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/CB/total"
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
     "ticker": "BAC",
     "name": "Bank of America",
     "status": "검증 대기",
     "why": "매출 성장 6.8% · 주식 수 연 -3.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/BAC/total"
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
     "ticker": "ETN",
     "name": "Eaton",
     "status": "검증 대기",
     "why": "매출 성장 10.3% · 주식 수 연 -2.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/ETN/total"
    },
    {
     "ticker": "HSBC",
     "name": "HSBC",
     "status": "검증 대기",
     "why": "매출 성장 -9.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/HSBC.K/total"
    },
    {
     "ticker": "UBS",
     "name": "UBS",
     "status": "검증 대기",
     "why": "매출 성장 -20.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/UBS/total"
    },
    {
     "ticker": "BBVA",
     "name": "Banco Bilbao Vizcaya Argentaria S.a",
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
     "ticker": "TD",
     "name": "The Toronto-Dominion Bank",
     "status": "검증 대기",
     "why": "매출 성장 -6.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/TD/total"
    }
   ]
  },
  "us|growth": {
   "eligible": 66,
   "defects": [
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
     "note": "인수 완료 시 자산 급증 가능",
     "judged": "2026-10-18",
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
     "why": "3년 매출 연평균 14.1% · FCF 마진 30% · 3년 평균 ROIC 49.7%",
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
     "why": "3년 매출 연평균 12.2% · FCF 마진 33.4% · 3년 평균 ROIC 26.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/MCO/total"
    },
    {
     "ticker": "VRT",
     "name": "Vertiv",
     "status": "검증 대기",
     "why": "3년 매출 연평균 21.6% · FCF 마진 18.5% · 3년 평균 ROIC 23.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/VRT/total"
    },
    {
     "ticker": "GE",
     "name": "General Electric",
     "status": "검증 대기",
     "why": "3년 매출 연평균 16.3% · FCF 마진 15.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/GE/total"
    },
    {
     "ticker": "SCCO",
     "name": "Southern Copper",
     "status": "검증 대기",
     "why": "3년 매출 연평균 10.1% · FCF 마진 25.5% · 3년 평균 ROIC 35.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/SCCO.K/total"
    },
    {
     "ticker": "FAST",
     "name": "Fastenal",
     "status": "검증 대기",
     "why": "3년 매출 연평균 5.5% · FCF 마진 12.8% · 3년 평균 ROIC 34.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/FAST.O/total"
    },
    {
     "ticker": "ASX",
     "name": "ASE Technology",
     "status": "검증 대기",
     "url": "https://m.stock.naver.com/worldstock/stock/ASX/total"
    },
    {
     "ticker": "KEYS",
     "name": "Keysight Technologies",
     "status": "검증 대기",
     "why": "3년 매출 연평균 -0.3% · FCF 마진 23.8% · 3년 평균 ROIC 15.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/KEYS.K/total"
    },
    {
     "ticker": "RIO",
     "name": "Rio Tinto",
     "status": "검증 대기",
     "url": "https://m.stock.naver.com/worldstock/stock/RIO/total"
    }
   ]
  },
  "us|value": {
   "eligible": 81,
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
      },
      {
       "k": "earn",
       "msg": "실적 발표(10/20) · EPS 서프라이즈 4.2% — 가이던스·논거 확인",
       "fresh": false
      }
     ],
     "note": "10/20 3분기 EPS가 예상을 4.2% 웃돌았으나, 조사 메모는 가이던스·GAAP 이익·악재 여부를 확인하지 못했다. 원인 미확인이라 감시가 필요하다.",
     "judged": "2026-10-21",
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
     "ticker": "COR",
     "name": "Cencora",
     "status": "보류",
     "note": "EBIT/EV 문턱 미달(FCF 로만 통과)·오피오이드 소송",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.7% · FCF/시총 4.9% · 매출 성장 9.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/COR/total"
    },
    {
     "ticker": "LHX",
     "name": "L3Harris Technologies",
     "status": "보류",
     "note": "방산 중복(GD)·3년 ROIC 낮음·3분기 10/29",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.7% · FCF/시총 5.8% · 매출 성장 2.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/LHX/total"
    },
    {
     "ticker": "LMT",
     "name": "Lockheed Martin",
     "status": "보류",
     "note": "방산 중복(GD)·최근 EBIT 감소 원인 미확인",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 5.4% · FCF/시총 5.5% · 매출 성장 5.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/LMT/total"
    },
    {
     "ticker": "IQV",
     "name": "IQVIA",
     "status": "보류",
     "note": "컨센 목표가가 현재가 수준",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.8% · FCF/시총 4.7% · 매출 성장 5.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/IQV/total"
    },
    {
     "ticker": "FDX",
     "name": "FedEx",
     "status": "보류",
     "note": "분사로 재무 왜곡",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.4% · FCF/시총 7.2% · 매출 성장 7.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/FDX/total"
    },
    {
     "ticker": "BAC",
     "name": "BAC",
     "status": "보류",
     "note": "금융 4번째(편중)",
     "asOf": "2026-10-18",
     "url": "https://finance.yahoo.com/quote/BAC"
    },
    {
     "ticker": "LYG",
     "name": "LYG",
     "status": "보류",
     "note": "11-11 기한",
     "asOf": "2026-10-18",
     "url": "https://finance.yahoo.com/quote/LYG"
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
     "ticker": "CMG",
     "name": "Chipotle Mexican Grill",
     "status": "검증 대기",
     "why": "EBIT/EV 5.3% · FCF/시총 3.9% · 매출 성장 5.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/CMG/total"
    },
    {
     "ticker": "XYZ",
     "name": "Block",
     "status": "검증 대기",
     "why": "EBIT/EV 3.5% · FCF/시총 5.2% · 매출 성장 0.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/XYZ/total"
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
       "msg": "주제 기준 미달 — 정체성 조건 미달",
       "fresh": false
      }
     ],
     "note": "주가 상승",
     "judged": "2026-10-18",
     "verdict": "형식"
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
      },
      {
       "k": "earn",
       "msg": "실적 발표(10/13) · EPS 서프라이즈 2.4% · 전년 대비 EBIT -12.3% — 가이던스·논거 확인",
       "fresh": false
      }
     ],
     "note": "주가 상승",
     "judged": "2026-10-18",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "PG",
     "name": "Procter & Gamble",
     "status": "보류",
     "note": "10/22 실적 후 컨센 여유 5% 이상이면 KO·JNJ 대체 1순위(유틸리티 쏠림 완화)",
     "asOf": "2026-10-18",
     "url": "https://finance.yahoo.com/quote/PG"
    },
    {
     "ticker": "MCD",
     "name": "MCD",
     "status": "보류",
     "note": "추세·컨센 하향 멈춤 확인 시",
     "asOf": "2026-10-18",
     "url": "https://finance.yahoo.com/quote/MCD"
    },
    {
     "ticker": "T",
     "name": "T",
     "status": "보류",
     "note": "VZ 결격 시(10/26 3분기)",
     "asOf": "2026-10-18",
     "url": "https://finance.yahoo.com/quote/T"
    },
    {
     "ticker": "BAC",
     "name": "Bank of America",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 30% · 배당 2.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/BAC/total"
    },
    {
     "ticker": "SNY",
     "name": "Sanofi SA",
     "status": "검증 대기",
     "why": "배당성향 76.6% · 배당 5.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/SNY.O/total"
    },
    {
     "ticker": "LYG",
     "name": "Lloyds Banking",
     "status": "검증 대기",
     "why": "배당성향 68.8% · 배당 4%",
     "url": "https://m.stock.naver.com/worldstock/stock/LYG/total"
    },
    {
     "ticker": "MUFG",
     "name": "Mitsubishi UFJ Financial",
     "status": "검증 대기",
     "why": "배당성향 0.2% · 배당 2.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/MUFG.K/total"
    },
    {
     "ticker": "AMX",
     "name": "America Movil SAB de CV",
     "status": "검증 대기",
     "why": "배당성향 2% · 배당 2.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/AMX/total"
    },
    {
     "ticker": "LMT",
     "name": "Lockheed Martin",
     "status": "검증 대기",
     "why": "배당 비감소 10년 · 배당성향 62.4% · 배당 2.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/LMT/total"
    },
    {
     "ticker": "ING",
     "name": "ING Groep N.V.",
     "status": "검증 대기",
     "why": "배당성향 63.3% · 배당 4.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/ING/total"
    },
    {
     "ticker": "HSBC",
     "name": "HSBC",
     "status": "검증 대기",
     "why": "배당성향 45% · 배당 4%",
     "url": "https://m.stock.naver.com/worldstock/stock/HSBC.K/total"
    },
    {
     "ticker": "UL",
     "name": "Unilever",
     "status": "검증 대기",
     "why": "배당성향 79.6% · 배당 3.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/UL/total"
    }
   ]
  },
  "us|rising": {
   "eligible": 11,
   "defects": [
    {
     "ticker": "NXT",
     "name": "Nextpower",
     "state": "결격",
     "flags": [
      {
       "k": "drop",
       "msg": "5거래일 -11%(시장 중앙값 1.6%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "⑨ 세액공제(45X) 의존 · 최근 낙폭은 회사 고유 악재 미확인(10/28 실적 발표 예정)",
     "judged": "2026-10-21",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "NVT",
     "name": "nVent Electric",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 시총 범위 밖, 순차입금 > 영업현금흐름, ROIC 미달(3년 평균 8.3%)",
       "fresh": false
      },
      {
       "k": "drop",
       "msg": "5거래일 -13.4%(시장 중앙값 1.6%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "⑤ 재무 안전 조건 미달 — 미국 히든 후보 풀 소진",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "FSS",
     "name": "Federal Signal",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 순차입금 > 영업현금흐름, 매출 성장 미달(3년 15%·최근 17.1%), ROIC 미달(3년 평균 15%), PEG 2.18",
       "fresh": false
      }
     ],
     "note": "⑤ 재무 안전 조건 미달 — 미국 히든 후보 풀 소진",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "MKSI",
     "name": "MKS Inc.",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 시총 범위 밖, 영업이익 3년 연속 흑자 아님, 순차입금 > 영업현금흐름, 매출 성장 미달(3년 3.5%·최근 9.6%), ROIC 미달(3년 평균 -1.6%)",
       "fresh": false
      },
      {
       "k": "drop",
       "msg": "5거래일 -14.7%(시장 중앙값 1.6%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "⑤ 재무 안전 조건 미달 — 미국 히든 후보 풀 소진",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "AAON",
     "name": "AAON",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — FCF 적자, 순차입금 > 영업현금흐름, ROIC 미달(3년 평균 16.1%)",
       "fresh": false
      },
      {
       "k": "drop",
       "msg": "5거래일 -14.2%(시장 중앙값 1.6%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "⑤ 재무 안전 조건 미달 — 미국 히든 후보 풀 소진",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "RBC",
     "name": "RBC Bearings",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 시총 범위 밖, 순차입금 > 영업현금흐름, 매출 성장 미달(3년 8.4%·최근 14.3%), ROIC 미달(3년 평균 6.5%), PEG 3.48, 희석 주식 수 연 4.1% 증가",
       "fresh": false
      }
     ],
     "note": "⑤ 재무 안전 조건 미달 — 미국 히든 후보 풀 소진",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-21"
    },
    {
     "ticker": "NVMI",
     "name": "Nova Ltd.",
     "state": "감시",
     "flags": [],
     "note": "근접 후보",
     "judged": "2026-10-18",
     "verdict": "형식"
    },
    {
     "ticker": "POWL",
     "name": "Powell Industries",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 매출 성장 미달(3년 27.5%·최근 9.1%)",
       "fresh": false
      }
     ],
     "note": "근접 후보",
     "judged": "2026-10-18",
     "verdict": "형식"
    },
    {
     "ticker": "APPF",
     "name": "AppFolio",
     "state": "감시",
     "flags": [],
     "note": "근접 후보",
     "judged": "2026-10-18",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "FIVE",
     "name": "Five Below",
     "status": "보류",
     "note": "숫자는 근접 — ⑦ 해자 근거 부족, 신뢰 출처 확보 시 MKSI 대체 1순위",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 15.7% · 3년 평균 ROIC 24.9% · PEG 2",
     "near": "PEG 1.95",
     "url": "https://finance.yahoo.com/quote/FIVE"
    },
    {
     "ticker": "CORT",
     "name": "Corcept Therapeutics Incorporated",
     "status": "보류",
     "note": "⑨ 단일 제품 의존 — 12-17 신약 승인 결정 뒤",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 23.7% · 3년 평균 ROIC 36.4% · PEG 0.9",
     "near": "희석 주식 수 연 3.6% 증가",
     "url": "https://finance.yahoo.com/quote/CORT"
    }
   ]
  }
 },
 "summary": {
  "review": 0,
  "defect": 12,
  "watch": 17,
  "untried": 0
 }
};
