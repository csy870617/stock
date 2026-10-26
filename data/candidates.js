// 주제별 후보 종목 + 편성 결격 점검 — scripts/check-defects.js 가 생성(LLM 토큰 0). 앱 '추천 종목' 주제 화면의 T3 아래 '후보 종목'.
// groups["<country>|<theme>"] = {defects 편성 결격(state 결격|점검 필요|감시), list 후보(status 검증 통과|보류|검증 대기)}
// 세션 판정은 data/candidate-notes.json(CLAUDE.md §3-7) — 이 파일을 직접 고치지 않는다.
window.CANDIDATES = {
 "asOf": "2026-10-26",
 "T": "2026-10-26",
 "screenAsOf": "2026-10-26",
 "screenFresh": true,
 "beta": {
  "korea": 0.72,
  "us": 1.01
 },
 "groups": {
  "korea|core": {
   "eligible": 19,
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
     "triedAt": "2026-10-23",
     "since": "2026-10-18",
     "age": 8
    },
    {
     "ticker": "086790",
     "name": "하나금융지주",
     "state": "결격",
     "verdict": "실질",
     "flags": [
      {
       "k": "dup",
       "msg": "중복 편성 — 저평가 주제에도 있어 분산이 줄어든다",
       "fresh": false
      }
     ],
     "note": "중복 편성 — 저평가 주제에 남기고 이 주제는 다른 종목으로 교체",
     "dup": "value",
     "triedAt": "2026-10-23",
     "since": "2026-10-21",
     "age": 5
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
     "triedAt": "2026-10-23",
     "since": "2026-10-21",
     "age": 5
    }
   ],
   "list": [
    {
     "ticker": "323410",
     "name": "카카오뱅크",
     "status": "검증 대기",
     "why": "3년 평균 ROIC 6.9% · 매출 성장 4.8% · 주식 수 연 0%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/323410/total"
    }
   ]
  },
  "korea|growth": {
   "eligible": 45,
   "defects": [
    {
     "ticker": "329180",
     "name": "HD현대중공업",
     "state": "점검 필요",
     "flags": [
      {
       "k": "trend",
       "msg": "추세 붕괴(단·중·장기 모두 매도 이하)",
       "fresh": true
      }
     ]
    },
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
     "note": "3년 평균 ROIC 33%·FCF 마진 15.5% — HD현대그룹 상한으로 현재 불가, 계열 종목 결격 시 계열 내 교체용",
     "asOf": "2026-10-23",
     "why": "3년 매출 연평균 14.1% · FCF 마진 15.5% · 3년 평균 ROIC 33.3%",
     "cap": "HD현대그룹 상한",
     "url": "https://m.stock.naver.com/domestic/stock/443060/total"
    },
    {
     "ticker": "003230",
     "name": "삼양식품",
     "status": "검증 통과",
     "note": "3년 매출 연평균 37%·3년 평균 ROIC 19.5% — 성장 주제에 결격이 생기면 1순위 대체",
     "asOf": "2026-10-23",
     "why": "3년 매출 연평균 37.3% · FCF 마진 -5.9% · 3년 평균 ROIC 19.5%",
     "url": "https://m.stock.naver.com/domestic/stock/003230/total"
    },
    {
     "ticker": "010140",
     "name": "삼성중공업",
     "status": "검증 통과",
     "note": "3년 매출 연평균 21.5%·FCF 마진 12.6% — 삼성그룹 상한으로 불가(삼성바이오가 우량에 남아 그룹 수가 줄지 않음)",
     "asOf": "2026-10-23",
     "why": "3년 매출 연평균 21.5% · FCF 마진 12.6% · 3년 평균 ROIC 6.1%",
     "cap": "삼성그룹 상한",
     "url": "https://m.stock.naver.com/domestic/stock/010140/total"
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
     "cap": "삼성그룹 상한",
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
    },
    {
     "ticker": "028050",
     "name": "삼성E&A",
     "status": "검증 대기",
     "why": "3년 매출 연평균 -3.5% · FCF 마진 2.2% · 3년 평균 ROIC 17.3%",
     "cap": "삼성그룹 상한",
     "url": "https://m.stock.naver.com/domestic/stock/028050/total"
    },
    {
     "ticker": "111770",
     "name": "영원무역",
     "status": "검증 대기",
     "why": "3년 매출 연평균 1.3% · FCF 마진 3.7% · 3년 평균 ROIC 9.1%",
     "url": "https://m.stock.naver.com/domestic/stock/111770/total"
    }
   ]
  },
  "korea|value": {
   "eligible": 58,
   "defects": [
    {
     "ticker": "267270",
     "name": "HD건설기계",
     "state": "점검 필요",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달(EBIT/EV·FCF 수익률 상위 30%)",
       "fresh": false
      },
      {
       "k": "earn",
       "msg": "실적 발표(10/26) — 가이던스·논거 확인",
       "fresh": true
      }
     ],
     "note": "합병 전 재무 왜곡 — 합병 후 재무로 재판정",
     "judged": "2026-10-18",
     "verdict": "형식"
    },
    {
     "ticker": "000270",
     "name": "기아",
     "state": "감시",
     "flags": [],
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
     "ticker": "086280",
     "name": "현대글로비스",
     "state": "감시",
     "flags": [],
     "note": "2분기 매출은 8조7,054억원(+15.8%)으로 분기 최대지만 영업이익은 -8.1%(4,950억원)였다. 해운 이익 감소는 유가 반영 지연 때문이며, 3분기 회복 여부는 10월 30일 실적 발표까지 감시.",
     "judged": "2026-10-22",
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
       "msg": "주제 기준 미달 — 정체성 조건 미달(EBIT/EV·FCF 수익률 상위 30%)",
       "fresh": false
      }
     ],
     "note": "2026년 2분기 매출 +5.9%, 영업이익 +0.7%(2,318억원)로 이익은 유지됐고 회사 고유 악재는 확인되지 않았다. 주가 상승 등으로 수익률 순위가 밀렸을 가능성이 있어 10월 29일 실적 발표까지 감시한다.",
     "judged": "2026-10-22",
     "verdict": "형식",
     "by": "ai"
    }
   ],
   "list": [
    {
     "ticker": "271560",
     "name": "오리온",
     "status": "검증 통과",
     "note": "저평가 정체성·이익 안정성·컨센 2출처 통과 — 저평가 주제에 결격이 생기면 대체 후보",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 12.5% · FCF/시총 9.3% · 매출 성장 7.3%",
     "url": "https://m.stock.naver.com/domestic/stock/271560/total"
    },
    {
     "ticker": "282330",
     "name": "BGF리테일",
     "status": "검증 통과",
     "note": "검증 통과 — 저평가 주제에 결격이 생기면 대체 후보",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 8.2% · FCF/시총 23.4% · 매출 성장 4.2%",
     "url": "https://m.stock.naver.com/domestic/stock/282330/total"
    },
    {
     "ticker": "004370",
     "name": "농심",
     "status": "검증 통과",
     "note": "검증 통과(관심 편성 중) — 저평가 주제에 결격이 생기면 대체 후보",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 7.2% · FCF/시총 8.4% · 매출 성장 2.2%",
     "url": "https://m.stock.naver.com/domestic/stock/004370/total"
    },
    {
     "ticker": "032830",
     "name": "삼성생명",
     "status": "보류",
     "note": "기업가치의 약 70%가 삼성전자 지분(우량 편성과 노출 중복)·3분기 일회성",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.6% · 매출 성장 9.9%",
     "cap": "삼성그룹 상한·금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/032830/total"
    },
    {
     "ticker": "004170",
     "name": "신세계",
     "status": "보류",
     "note": "3분기 증익 유지·추정 하향 멈춤 확인 필요",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.3% · FCF/시총 21.6% · 매출 성장 5.5%",
     "url": "https://m.stock.naver.com/domestic/stock/004170/total"
    },
    {
     "ticker": "018670",
     "name": "SK가스",
     "status": "보류",
     "note": "3분기 증익 유지·컨센 2출처 확인 필요",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 7% · FCF/시총 16.3% · 매출 성장 8.2%",
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
     "ticker": "012330",
     "name": "현대모비스",
     "status": "검증 대기",
     "why": "EBIT/EV 10.1% · FCF/시총 10.6% · 매출 성장 6.8%",
     "url": "https://m.stock.naver.com/domestic/stock/012330/total"
    },
    {
     "ticker": "047050",
     "name": "포스코인터내셔널",
     "status": "검증 대기",
     "why": "EBIT/EV 7.5% · FCF/시총 14.6% · 매출 성장 0.3%",
     "url": "https://m.stock.naver.com/domestic/stock/047050/total"
    },
    {
     "ticker": "081660",
     "name": "미스토홀딩스",
     "status": "검증 대기",
     "why": "EBIT/EV 12.3% · FCF/시총 17% · 매출 성장 4.7%",
     "url": "https://m.stock.naver.com/domestic/stock/081660/total"
    },
    {
     "ticker": "021240",
     "name": "코웨이",
     "status": "검증 대기",
     "why": "EBIT/EV 9.2% · FCF/시총 -2.5% · 매출 성장 15.2%",
     "url": "https://m.stock.naver.com/domestic/stock/021240/total"
    },
    {
     "ticker": "006260",
     "name": "LS",
     "status": "검증 대기",
     "why": "EBIT/EV 6.4% · FCF/시총 -14.5% · 매출 성장 15.7%",
     "url": "https://m.stock.naver.com/domestic/stock/006260/total"
    }
   ]
  },
  "korea|dividend": {
   "eligible": 31,
   "defects": [
    {
     "ticker": "000810",
     "name": "삼성화재",
     "state": "결격",
     "verdict": "실질",
     "flags": [
      {
       "k": "dup",
       "msg": "중복 편성 — 우량 주제에도 있어 분산이 줄어든다",
       "fresh": false
      }
     ],
     "note": "중복 편성 — 우량 주제에 남기고 이 주제는 다른 종목으로 교체",
     "dup": "core",
     "triedAt": "2026-10-23",
     "since": "2026-10-21",
     "age": 5
    }
   ],
   "list": [
    {
     "ticker": "383220",
     "name": "F&F",
     "status": "보류",
     "note": "3분기 실적 발표 전(2분기는 컨센서스 하회, 중국 법인 성장 둔화). 테일러메이드 인수 여부 미정이고 2025 DPS를 신뢰 출처 2곳에서 확인하지 못해 보류. 비금융·비삼성 후보로 블로커 해소 시 1순위.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 4년 · 배당성향 25.4% · 배당 4.5%",
     "url": "https://m.stock.naver.com/domestic/stock/383220/total"
    },
    {
     "ticker": "003690",
     "name": "코리안리",
     "status": "보류",
     "note": "금융(편중 유지)이며 컨센서스 신뢰 출처가 한화투자증권 1곳(매수)과 미래에셋 중립으로 갈려 2곳 교차확인 불가. 2025 DPS도 미확인. 올해 1분기 대형 사고가 적어 순이익이 크게 늘었으나 사고 변동이 큰 업종.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 3년 · 배당성향 31.3% · 배당 4.2%",
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
     "why": "배당 비감소 2년 · 배당성향 60% · 배당 6.4%",
     "url": "https://m.stock.naver.com/domestic/stock/030000/total"
    },
    {
     "ticker": "047050",
     "name": "포스코인터내셔널",
     "status": "검증 대기",
     "why": "배당 비감소 4년 · 배당성향 51.4% · 배당 3.8%",
     "url": "https://m.stock.naver.com/domestic/stock/047050/total"
    },
    {
     "ticker": "018670",
     "name": "SK가스",
     "status": "검증 대기",
     "why": "배당 비감소 4년 · 배당성향 34.5% · 배당 3.6%",
     "url": "https://m.stock.naver.com/domestic/stock/018670/total"
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
       "msg": "주제 기준 미달 — 매출 성장 미달(3년 4.9%·향후 18.4%)",
       "fresh": false
      }
     ],
     "note": "성장 숫자·PEG 미달 — 품질 최상위라 대체 확보 시 교체",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-23",
     "since": "2026-10-18",
     "age": 8
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
     "triedAt": "2026-10-23",
     "since": "2026-10-18",
     "age": 8
    },
    {
     "ticker": "403870",
     "name": "HPSP",
     "state": "결격",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 매출 성장 미달(3년 2.8%·향후 48.8%)",
       "fresh": false
      }
     ],
     "note": "3년 성장 2.8%·1·2분기 매출·영업이익 감소",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-23",
     "since": "2026-10-18",
     "age": 8
    },
    {
     "ticker": "062040",
     "name": "산일전기",
     "state": "점검 필요",
     "flags": [
      {
       "k": "trend",
       "msg": "추세 붕괴(단·중·장기 모두 매도 이하)",
       "fresh": true
      }
     ],
     "note": "전력기기 업종 전반 급락, 2분기 매출 +28%·영업이익 +34% — 회사 고유 악재 없음",
     "judged": "2026-10-18",
     "verdict": "없음"
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
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — ROIC 미달(3년 평균 14.4%)",
       "fresh": false
      }
     ],
     "note": "3년 평균 ROIC 14.4%로 기준 15%에 0.6%p 못 미치나, 2023년 업황 저점이 평균에 남은 산식 효과다. 2026.06 분기 매출 +41%, 영업이익 +55.5%로 개선 중이며, 원인 확인 전까지 감시한다.",
     "judged": "2026-10-24",
     "verdict": "형식",
     "by": "ai"
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
    },
    {
     "ticker": "278470",
     "name": "에이피알",
     "status": "검증 대기",
     "why": "3년 매출 연평균 56.6% · 3년 평균 ROIC 67.7% · PEG 0.6",
     "near": "시총 범위 밖",
     "alsoIn": "core",
     "url": "https://m.stock.naver.com/domestic/stock/278470/total"
    },
    {
     "ticker": "084370",
     "name": "유진테크",
     "status": "검증 대기",
     "why": "3년 매출 연평균 4.1% · 3년 평균 ROIC 16.8% · PEG 1.3",
     "near": "매출 성장 미달(3년 4.1%·향후 40.5%)",
     "url": "https://m.stock.naver.com/domestic/stock/084370/total"
    }
   ]
  },
  "us|core": {
   "eligible": 61,
   "defects": [
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
     "ticker": "HSBC",
     "name": "HSBC",
     "status": "검증 대기",
     "why": "매출 성장 -9.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/HSBC.K/total"
    },
    {
     "ticker": "ETN",
     "name": "Eaton",
     "status": "검증 대기",
     "why": "매출 성장 10.3% · 주식 수 연 -2.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/ETN/total"
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
    },
    {
     "ticker": "MRK",
     "name": "Merck &",
     "status": "검증 대기",
     "why": "매출 성장 1.3% · 주식 수 연 -1.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/MRK/total"
    },
    {
     "ticker": "NVS",
     "name": "Novartis",
     "status": "검증 대기",
     "why": "매출 성장 8.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/NVS/total"
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
   "eligible": 65,
   "defects": [
    {
     "ticker": "META",
     "name": "Meta Platforms",
     "state": "감시",
     "flags": [
      {
       "k": "earn",
       "msg": "실적 발표(10/21) · EPS 서프라이즈 13.5% — 가이던스·논거 확인",
       "fresh": false
      }
     ],
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
     "ticker": "GE",
     "name": "General Electric",
     "status": "검증 대기",
     "why": "3년 매출 연평균 16.3% · FCF 마진 15.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/GE/total"
    },
    {
     "ticker": "VRT",
     "name": "Vertiv",
     "status": "검증 대기",
     "why": "3년 매출 연평균 21.6% · FCF 마진 18.5% · 3년 평균 ROIC 23.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/VRT/total"
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
     "ticker": "RIO",
     "name": "Rio Tinto",
     "status": "검증 대기",
     "url": "https://m.stock.naver.com/worldstock/stock/RIO/total"
    },
    {
     "ticker": "GEV",
     "name": "GE Vernova",
     "status": "검증 대기",
     "why": "3년 매출 연평균 8.7% · FCF 마진 9.7% · 3년 평균 ROIC 18.2%",
     "url": "https://m.stock.naver.com/worldstock/stock/GEV/total"
    }
   ]
  },
  "us|value": {
   "eligible": 82,
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
     "note": "10/20 3분기 EPS가 예상을 4.2% 웃돌았다 — 가이던스·GAAP 이익 확인 전까지 감시.",
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
     "why": "EBIT/EV 5% · FCF/시총 5.3% · 매출 성장 8.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/TEL/total"
    },
    {
     "ticker": "COR",
     "name": "Cencora",
     "status": "보류",
     "note": "EBIT/EV 문턱 미달(FCF 로만 통과)·오피오이드 소송",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.8% · FCF/시총 5.1% · 매출 성장 9.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/COR/total"
    },
    {
     "ticker": "LHX",
     "name": "L3Harris Technologies",
     "status": "보류",
     "note": "방산 중복(GD)·3년 ROIC 낮음·3분기 10/29",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.7% · FCF/시총 5.7% · 매출 성장 2.5%",
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
     "why": "EBIT/EV 3.7% · FCF/시총 4.5% · 매출 성장 5.9%",
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
     "name": "Bank of America",
     "status": "보류",
     "note": "금융 4번째(편중)",
     "asOf": "2026-10-18",
     "url": "https://finance.yahoo.com/quote/BAC"
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
     "ticker": "XYZ",
     "name": "Block",
     "status": "검증 대기",
     "why": "EBIT/EV 3.6% · FCF/시총 5.3% · 매출 성장 0.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/XYZ/total"
    },
    {
     "ticker": "BN",
     "name": "Brookfield",
     "status": "검증 대기",
     "why": "매출 성장 -12.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/BN/total"
    }
   ]
  },
  "us|dividend": {
   "eligible": 71,
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
      },
      {
       "k": "earn",
       "msg": "실적 발표(10/22) · EPS 서프라이즈 6.4% · 전년 대비 EBIT -11% — 가이던스·논거 확인",
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
     "why": "배당 비감소 10년 · 배당성향 30% · 배당 2.5%",
     "url": "https://m.stock.naver.com/worldstock/stock/BAC/total"
    },
    {
     "ticker": "LYG",
     "name": "Lloyds Banking",
     "status": "검증 대기",
     "why": "배당성향 68.8% · 배당 4%",
     "url": "https://m.stock.naver.com/worldstock/stock/LYG/total"
    },
    {
     "ticker": "SNY",
     "name": "Sanofi SA",
     "status": "검증 대기",
     "why": "배당성향 76.6% · 배당 5.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/SNY.O/total"
    },
    {
     "ticker": "MUFG",
     "name": "Mitsubishi UFJ Financial",
     "status": "검증 대기",
     "why": "배당성향 0.2% · 배당 2.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/MUFG.K/total"
    },
    {
     "ticker": "ING",
     "name": "ING Groep N.V.",
     "status": "검증 대기",
     "why": "배당성향 63.3% · 배당 4.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/ING/total"
    },
    {
     "ticker": "HSBC",
     "name": "HSBC",
     "status": "검증 대기",
     "why": "배당성향 45% · 배당 4.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/HSBC.K/total"
    },
    {
     "ticker": "RIO",
     "name": "Rio Tinto",
     "status": "검증 대기",
     "why": "배당성향 58.8% · 배당 5.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/RIO/total"
    },
    {
     "ticker": "UL",
     "name": "Unilever",
     "status": "검증 대기",
     "why": "배당성향 79.6% · 배당 3.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/UL/total"
    },
    {
     "ticker": "CM",
     "name": "Canadian Imperial Bank of Commerce",
     "status": "검증 대기",
     "why": "배당성향 29% · 배당 2.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/CM/total"
    },
    {
     "ticker": "IX",
     "name": "ORIX CORPORATION",
     "status": "검증 대기",
     "why": "배당성향 0.2% · 배당 2.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/IX/total"
    }
   ]
  },
  "us|rising": {
   "eligible": 12,
   "defects": [
    {
     "ticker": "NXT",
     "name": "Nextpower",
     "state": "결격",
     "flags": [],
     "note": "⑨ 세액공제(45X) 의존 · 최근 낙폭은 회사 고유 악재 미확인(10/28 실적 발표 예정) · 새 신호: 2026.07 분기 매출 +8.2%, EBIT +6.2%, 순이익 +5.2%로 흑자 성장을 유지했고 FY2027 가이던스도 상향됐다. 다만 재무 데이터 공백으로 기준 충족 여부는 확인 전이라 10-28 실적 발표까지 감시한다.",
     "judged": "2026-10-24",
     "verdict": "실질",
     "triedAt": "2026-10-25",
     "since": "2026-10-21",
     "age": 5
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
      }
     ],
     "note": "⑤ 재무 안전 조건 미달 — 남은 대체 후보는 모두 집중 리스크(⑨)·추세 붕괴로 막힘",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-25",
     "since": "2026-10-18",
     "age": 8
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
     "note": "⑤ 재무 안전 조건 미달 — 남은 대체 후보는 모두 집중 리스크(⑨)·추세 붕괴로 막힘",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-25",
     "since": "2026-10-18",
     "age": 8
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
      }
     ],
     "note": "⑤ 재무 안전 조건 미달 — 남은 대체 후보는 모두 집중 리스크(⑨)·추세 붕괴로 막힘",
     "judged": "2026-10-18",
     "verdict": "실질",
     "triedAt": "2026-10-25",
     "since": "2026-10-18",
     "age": 8
    },
    {
     "ticker": "FIVE",
     "name": "Five Below",
     "state": "점검 필요",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — PEG 1.98",
       "fresh": true
      }
     ]
    },
    {
     "ticker": "STRL",
     "name": "Sterling Infrastructure",
     "state": "점검 필요",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 매출 성장 미달(3년 12.1%·최근 17.7%)",
       "fresh": true
      },
      {
       "k": "drop",
       "msg": "5거래일 -16.3%(시장 중앙값 -0.1%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "같은 5거래일 데이터센터 시공·전력 인프라 업종이 함께 10~19% 하락(FIX -19.3%·IESC -15.2%·PWR -13.5%, S&P 500 -0.5%) — 업종 전체 하락이고 회사 고유 악재·소송·회계 문제는 확인되지 않았다. 10/28 3분기 실적(수주잔고 일시 감소 가능성)을 확인한다.",
     "judged": "2026-10-25",
     "verdict": "없음"
    },
    {
     "ticker": "NVMI",
     "name": "Nova Ltd.",
     "state": "감시",
     "flags": [],
     "note": "SEC 재무 수치가 비어 있어 기준 미달로 잡혔으나, 2026.06 분기 매출 +15.9%, 순이익 +9.8%로 흑자 성장은 유지 중이다. 회사 고유 악재는 확인되지 않아 11월 5일 실적 발표까지 감시한다.",
     "judged": "2026-10-24",
     "verdict": "형식",
     "by": "ai"
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
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — PEG 1.75",
       "fresh": false
      },
      {
       "k": "earn",
       "msg": "실적 발표(10/22) · EPS 서프라이즈 0.8% — 가이던스·논거 확인",
       "fresh": false
      }
     ],
     "note": "주제 기준 미달 신호는 대부분 값이 비어 있어 데이터 공백으로 보이며, 2026년 6월 분기 매출 +19.3%·영업이익 +30.8%·순이익 +15.5%로 흑자 성장이 이어진다. 3분기 원문 확인 전까지 감시한다.",
     "judged": "2026-10-24",
     "verdict": "형식",
     "by": "ai"
    }
   ],
   "list": [
    {
     "ticker": "CORT",
     "name": "Corcept Therapeutics Incorporated",
     "status": "보류",
     "note": "⑨ 단일 제품 의존 — 12-17 신약 승인 결정 뒤",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 23.7% · 3년 평균 ROIC 36.4% · PEG 0.8",
     "near": "희석 주식 수 연 3.6% 증가",
     "url": "https://finance.yahoo.com/quote/CORT"
    },
    {
     "ticker": "CAMT",
     "name": "Camtek",
     "status": "보류",
     "note": "⑨ 2025년 매출의 약 49%가 중국이고 미국 수출 규제 영향권 — 중국 비중이 1/3 안팎으로 내려가고 GAAP 이익이 다시 늘면 재검토",
     "asOf": "2026-10-25",
     "why": "3년 매출 연평균 15.6% · 3년 평균 ROIC 21.5% · PEG 1.5",
     "near": "매출 성장 미달(3년 15.6%·최근 15.6%)",
     "url": "https://finance.yahoo.com/quote/CAMT"
    }
   ]
  }
 },
 "summary": {
  "review": 5,
  "defect": 11,
  "watch": 17,
  "untried": 11,
  "dup": 2,
  "long": 0
 }
};
