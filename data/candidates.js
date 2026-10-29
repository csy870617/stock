// 주제별 후보 종목 + 편성 결격 점검 — scripts/check-defects.js 가 생성(LLM 토큰 0). 앱 '추천 종목' 주제 화면의 T3 아래 '후보 종목'.
// groups["<country>|<theme>"] = {defects 편성 결격(state 결격|점검 필요|감시), list 후보(status 검증 통과|보류|검증 대기)}
// 세션 판정은 data/candidate-notes.json(CLAUDE.md §3-7) — 이 파일을 직접 고치지 않는다.
window.CANDIDATES = {
 "asOf": "2026-10-29",
 "T": "2026-10-29",
 "screenAsOf": "2026-10-28",
 "screenFresh": true,
 "beta": {
  "korea": 0.67,
  "us": 1.05
 },
 "groups": {
  "korea|core": {
   "eligible": 18,
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
     "triedAt": "2026-10-29",
     "since": "2026-10-18",
     "age": 11
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
     "triedAt": "2026-10-29",
     "since": "2026-10-21",
     "age": 8
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
     "triedAt": "2026-10-29",
     "since": "2026-10-21",
     "age": 8
    }
   ],
   "list": [
    {
     "ticker": "042700",
     "name": "한미반도체",
     "status": "보류",
     "note": "3년 평균 ROIC 23%로 우량 정체성은 충족하나 컨센서스 목표가를 신뢰 출처 2곳으로 확인하지 못했고 매출 변동·고객 집중이 커 3분기 실적(11월) 뒤 재검토.",
     "asOf": "2026-10-26",
     "why": "3년 평균 ROIC 23.2% · 매출 성장 3.2% · 주식 수 연 -1.3%",
     "url": "https://m.stock.naver.com/domestic/stock/042700/total"
    }
   ]
  },
  "korea|growth": {
   "eligible": 46,
   "defects": [
    {
     "ticker": "329180",
     "name": "HD현대중공업",
     "state": "감시",
     "flags": [
      {
       "k": "trend",
       "msg": "추세 붕괴(단·중·장기 모두 매도 이하)",
       "fresh": false
      }
     ],
     "note": "추세 붕괴 신호는 있으나 가이던스 하향·역성장은 확인되지 않았다. 7월 말 생산중단·중대재해 공시, 모회사의 교환사채 발행에 따른 수급 부담, 캐나다 잠수함 사업 탈락, 노조 부분파업 보도가 겹친 하락으로 10월의 새 악재는 찾지 못했다.",
     "judged": "2026-10-29",
     "verdict": "형식"
    },
    {
     "ticker": "267260",
     "name": "HD현대일렉트릭",
     "state": "감시",
     "flags": [
      {
       "k": "tpcut",
       "msg": "컨센서스 목표가 14일 새 -19.9% 하향 — 논거 확인",
       "fresh": false
      }
     ],
     "note": "3분기 매출 +18.5%·영업이익 +15.1%에 수주잔고도 늘었다. 3분기 수주는 전분기보다 줄었고 환율 하락이 수익성 부담으로 언급됐으며 실적 역성장·논거 훼손은 확인되지 않았다.",
     "judged": "2026-10-29",
     "verdict": "형식"
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
     "ticker": "161890",
     "name": "한국콜마",
     "status": "보류",
     "note": "컨센서스 출처 2곳 미확보",
     "asOf": "2026-10-18",
     "why": "3년 매출 연평균 13.4% · FCF 마진 4.7% · 3년 평균 ROIC 7.5%",
     "url": "https://m.stock.naver.com/domestic/stock/161890/total"
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
     "ticker": "006260",
     "name": "LS",
     "status": "검증 대기",
     "why": "3년 매출 연평균 22.1% · FCF 마진 -3% · 3년 평균 ROIC 5.9%",
     "url": "https://m.stock.naver.com/domestic/stock/006260/total"
    },
    {
     "ticker": "084370",
     "name": "유진테크",
     "status": "검증 대기",
     "why": "3년 매출 연평균 4.1% · FCF 마진 15.2% · 3년 평균 ROIC 8.4%",
     "url": "https://m.stock.naver.com/domestic/stock/084370/total"
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
   "eligible": 55,
   "defects": [
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
     "ticker": "267270",
     "name": "HD건설기계",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 정체성 조건 미달(EBIT/EV·FCF 수익률 상위 30%)",
       "fresh": false
      },
      {
       "k": "drop",
       "msg": "5거래일 -16.8%(시장 중앙값 -2.1%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "3분기 영업이익은 합병 전 두 회사 합산 전년보다 23.9% 늘었다. 순이익은 환율 하락에 따른 외화채권 환산 손실로 줄었고 급락은 그 발표와 같은 시기였다. 영업 실적과 논거는 유지됐다.",
     "judged": "2026-10-29",
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
      },
      {
       "k": "earn",
       "msg": "실적 발표(10/29) — 가이던스·논거 확인",
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
     "why": "EBIT/EV 12.6% · FCF/시총 9.4% · 매출 성장 7.3%",
     "url": "https://m.stock.naver.com/domestic/stock/271560/total"
    },
    {
     "ticker": "282330",
     "name": "BGF리테일",
     "status": "검증 통과",
     "note": "검증 통과 — 저평가 주제에 결격이 생기면 대체 후보",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 8.4% · FCF/시총 24.4% · 매출 성장 4.2%",
     "url": "https://m.stock.naver.com/domestic/stock/282330/total"
    },
    {
     "ticker": "004370",
     "name": "농심",
     "status": "검증 통과",
     "note": "검증 통과(관심 편성 중) — 저평가 주제에 결격이 생기면 대체 후보",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 7.2% · FCF/시총 8.5% · 매출 성장 2.2%",
     "url": "https://m.stock.naver.com/domestic/stock/004370/total"
    },
    {
     "ticker": "032830",
     "name": "삼성생명",
     "status": "보류",
     "note": "기업가치의 약 70%가 삼성전자 지분(우량 편성과 노출 중복)·3분기 일회성",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.3% · 매출 성장 9.9%",
     "cap": "삼성그룹 상한·금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/032830/total"
    },
    {
     "ticker": "004170",
     "name": "신세계",
     "status": "보류",
     "note": "3분기 증익 유지·추정 하향 멈춤 확인 필요",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.2% · FCF/시총 20.7% · 매출 성장 5.5%",
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
     "why": "EBIT/EV 9.5% · FCF/시총 9.9% · 매출 성장 6.8%",
     "url": "https://m.stock.naver.com/domestic/stock/012330/total"
    },
    {
     "ticker": "047050",
     "name": "포스코인터내셔널",
     "status": "검증 대기",
     "why": "EBIT/EV 7.4% · FCF/시총 14.4% · 매출 성장 0.3%",
     "url": "https://m.stock.naver.com/domestic/stock/047050/total"
    },
    {
     "ticker": "021240",
     "name": "코웨이",
     "status": "검증 대기",
     "why": "EBIT/EV 9.4% · FCF/시총 -2.6% · 매출 성장 15.2%",
     "url": "https://m.stock.naver.com/domestic/stock/021240/total"
    },
    {
     "ticker": "033780",
     "name": "KT&G",
     "status": "검증 대기",
     "why": "EBIT/EV 6.3% · FCF/시총 -0.3% · 매출 성장 11.4%",
     "url": "https://m.stock.naver.com/domestic/stock/033780/total"
    },
    {
     "ticker": "006260",
     "name": "LS",
     "status": "검증 대기",
     "why": "EBIT/EV 6.3% · FCF/시총 -13.5% · 매출 성장 15.7%",
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
     "triedAt": "2026-10-29",
     "since": "2026-10-21",
     "age": 8
    },
    {
     "ticker": "029780",
     "name": "삼성카드",
     "state": "감시",
     "flags": [
      {
       "k": "tpcut",
       "msg": "컨센서스 목표가 14일 새 -15.8% 하향 — 논거 확인",
       "fresh": false
      }
     ],
     "note": "3분기 순이익이 전년보다 13.5% 줄어 컨센서스를 밑돌았다. 조달·대손 비용 증가라는 업황 요인이고 증권사들은 목표가를 낮추면서도 매수 의견을 유지했으며 연간 배당은 전년과 같을 것으로 전망된다.",
     "judged": "2026-10-29",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "383220",
     "name": "F&F",
     "status": "보류",
     "note": "3분기 실적 발표 전(2분기는 컨센서스 하회, 중국 법인 성장 둔화). 테일러메이드 인수 여부 미정이고 2025 DPS를 신뢰 출처 2곳에서 확인하지 못해 보류. 비금융·비삼성 후보로 블로커 해소 시 1순위.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 4년 · 배당성향 25.4% · 배당 4.4%",
     "url": "https://m.stock.naver.com/domestic/stock/383220/total"
    },
    {
     "ticker": "003690",
     "name": "코리안리",
     "status": "보류",
     "note": "금융(편중 유지)이며 컨센서스 신뢰 출처가 한화투자증권 1곳(매수)과 미래에셋 중립으로 갈려 2곳 교차확인 불가. 2025 DPS도 미확인. 올해 1분기 대형 사고가 적어 순이익이 크게 늘었으나 사고 변동이 큰 업종.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 3년 · 배당성향 31.3% · 배당 4.1%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/003690/total"
    },
    {
     "ticker": "031210",
     "name": "서울보증보험",
     "status": "보류",
     "note": "금융 업종 상한에 걸리고 목표가를 내는 증권사 1곳뿐인 블로커 유지.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 1년 · 배당성향 74.5% · 배당 6.6%",
     "cap": "금융 상한",
     "url": "https://m.stock.naver.com/domestic/stock/031210/total"
    },
    {
     "ticker": "030000",
     "name": "제일기획",
     "status": "보류",
     "note": "삼성그룹 계열이라 삼성그룹 상한 5 초과를 해소하지 못하고 2026E 영업이익 감익 추정 블로커 유지.",
     "asOf": "2026-10-23",
     "why": "배당 비감소 2년 · 배당성향 60% · 배당 6.6%",
     "url": "https://m.stock.naver.com/domestic/stock/030000/total"
    },
    {
     "ticker": "009970",
     "name": "영원무역홀딩스",
     "status": "보류",
     "note": "8월 밸류업(배당성향 30%·자사주 매입) 확인, 지주사 연결 왜곡과 컨센서스 부재가 블로커.",
     "asOf": "2026-10-26",
     "why": "배당 비감소 4년 · 배당성향 20.8% · 배당 4%",
     "url": "https://m.stock.naver.com/domestic/stock/009970/total"
    },
    {
     "ticker": "000240",
     "name": "한국앤컴퍼니",
     "status": "보류",
     "note": "배당 지속성은 양호하나 경영권 분쟁 소송과 실적·컨센서스 미확인.",
     "asOf": "2026-10-26",
     "why": "배당 비감소 4년 · 배당성향 30% · 배당 4.8%",
     "url": "https://m.stock.naver.com/domestic/stock/000240/total"
    },
    {
     "ticker": "018670",
     "name": "SK가스",
     "status": "보류",
     "note": "배당 비감소 4년·성향 35%로 배당 조건은 충족하는 비금융 후보. 3분기 실적(10월 말~11월 초)과 컨센서스 목표가 2출처 확인 뒤 재검토, 분기 영업이익 급감의 원인 확인 필요.",
     "asOf": "2026-10-26",
     "why": "배당 비감소 4년 · 배당성향 34.5% · 배당 3.6%",
     "url": "https://m.stock.naver.com/domestic/stock/018670/total"
    },
    {
     "ticker": "047050",
     "name": "포스코인터내셔널",
     "status": "보류",
     "note": "배당 조건은 통과하나 3년 매출 역성장과 모기업 지분 매각 오버행, 컨센서스 미확인.",
     "asOf": "2026-10-26",
     "why": "배당 비감소 4년 · 배당성향 51.4% · 배당 3.7%",
     "url": "https://m.stock.naver.com/domestic/stock/047050/total"
    },
    {
     "ticker": "024110",
     "name": "기업은행",
     "status": "검증 대기",
     "why": "배당 비감소 0년 · 배당성향 30.8% · 배당 5.6%",
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
     "triedAt": "2026-10-29",
     "since": "2026-10-18",
     "age": 11
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
     "triedAt": "2026-10-29",
     "since": "2026-10-18",
     "age": 11
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
     "triedAt": "2026-10-29",
     "since": "2026-10-18",
     "age": 11
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
     "ticker": "062040",
     "name": "산일전기",
     "state": "감시",
     "flags": [
      {
       "k": "trend",
       "msg": "추세 붕괴(단·중·장기 모두 매도 이하)",
       "fresh": false
      }
     ],
     "note": "추세 붕괴 신호는 있으나 논거 훼손 근거는 찾지 못했다. 2분기 수주가 분기 기준 처음 2천억 원을 넘었고 데이터센터용 변압기 수주와 초고압 3공장 증설이 진행 중이라 히든 기준 위반 징후가 없다.",
     "judged": "2026-10-26",
     "verdict": "형식"
    },
    {
     "ticker": "119850",
     "name": "지엔씨에너지",
     "state": "감시",
     "flags": [
      {
       "k": "drop",
       "msg": "5거래일 -17.9%(시장 중앙값 -2.1%) 급락 — 원인 확인",
       "fresh": false
      }
     ],
     "note": "급락을 설명하는 회사 고유 공시·악재는 찾지 못했다. 데이터센터용 비상발전기 수주 공시가 7월 이후 이어지고 있고 매출 반영은 2027년부터로 전망된다.",
     "judged": "2026-10-29",
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
     "note": "3년 평균 ROIC가 기준 15%에 근소 미달(14.4%)한 숫자 경계이고 사업 논거 훼손은 확인되지 않아 형식 결격으로 본다.",
     "judged": "2026-10-27",
     "verdict": "형식",
     "by": "ai"
    }
   ],
   "list": [
    {
     "ticker": "092730",
     "name": "네오팜",
     "status": "보류",
     "note": "2분기 매출 +36%·영업이익 +40%, 월봉 추세 정상. 컨센서스 목표가를 신뢰 출처 2곳으로 확인하지 못해 대기 — 3분기 실적(11월) 뒤 리포트 확인.",
     "asOf": "2026-10-26",
     "why": "3년 매출 연평균 15.9% · 3년 평균 ROIC 38.9% · PEG 0.5",
     "url": "https://m.stock.naver.com/domestic/stock/092730/total"
    },
    {
     "ticker": "003350",
     "name": "한국화장품제조",
     "status": "보류",
     "note": "2분기 매출 +32%·영업이익 +29%, 월봉 추세 정상. 증권사 커버리지가 없어 목표가·해자 근거 미확인 — 11-16 기한 안에 커버리지가 없으면 기각.",
     "asOf": "2026-10-26",
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
     "ticker": "HSBC",
     "name": "HSBC",
     "status": "검증 대기",
     "why": "매출 성장 -9.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/HSBC.K/total"
    },
    {
     "ticker": "MUFG",
     "name": "Mitsubishi UFJ Financial",
     "status": "검증 대기",
     "why": "매출 성장 3%",
     "url": "https://m.stock.naver.com/worldstock/stock/MUFG.K/total"
    },
    {
     "ticker": "FTNT",
     "name": "Fortinet",
     "status": "검증 대기",
     "why": "매출 성장 14.2% · 주식 수 연 -0.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/FTNT.O/total"
    },
    {
     "ticker": "UBS",
     "name": "UBS",
     "status": "검증 대기",
     "why": "매출 성장 -20.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/UBS/total"
    },
    {
     "ticker": "ETN",
     "name": "Eaton",
     "status": "검증 대기",
     "why": "매출 성장 10.3% · 주식 수 연 -2.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/ETN/total"
    },
    {
     "ticker": "BBVA",
     "name": "Banco Bilbao Vizcaya Argentaria S.a",
     "status": "검증 대기",
     "why": "매출 성장 -5.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/BBVA.K/total"
    },
    {
     "ticker": "MRK",
     "name": "Merck &",
     "status": "검증 대기",
     "why": "매출 성장 1.3% · 주식 수 연 -1.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/MRK/total"
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
     "ticker": "NVS",
     "name": "Novartis",
     "status": "검증 대기",
     "why": "매출 성장 8.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/NVS/total"
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
      },
      {
       "k": "drop",
       "msg": "5거래일 -12.2%(시장 중앙값 0.3%) 급락 — 원인 확인",
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
     "ticker": "KEYS",
     "name": "Keysight Technologies",
     "status": "검증 대기",
     "why": "3년 매출 연평균 -0.3% · FCF 마진 23.8% · 3년 평균 ROIC 15.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/KEYS.K/total"
    }
   ]
  },
  "us|value": {
   "eligible": 80,
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
     "why": "EBIT/EV 4.6% · FCF/시총 4.9% · 매출 성장 8.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/TEL/total"
    },
    {
     "ticker": "COR",
     "name": "Cencora",
     "status": "보류",
     "note": "EBIT/EV 문턱 미달(FCF 로만 통과)·오피오이드 소송",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.9% · FCF/시총 5.2% · 매출 성장 9.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/COR/total"
    },
    {
     "ticker": "LHX",
     "name": "L3Harris Technologies",
     "status": "보류",
     "note": "방산 중복(GD)·3년 ROIC 낮음·3분기 10/29",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 3.6% · FCF/시총 5.6% · 매출 성장 2.5%",
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
     "why": "EBIT/EV 3.7% · FCF/시총 4.6% · 매출 성장 5.9%",
     "url": "https://m.stock.naver.com/worldstock/stock/IQV/total"
    },
    {
     "ticker": "FDX",
     "name": "FedEx",
     "status": "보류",
     "note": "분사로 재무 왜곡",
     "asOf": "2026-10-18",
     "why": "EBIT/EV 6.3% · FCF/시총 7.1% · 매출 성장 7.7%",
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
     "name": "Lloyds Banking Group",
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
     "ticker": "XYZ",
     "name": "Block",
     "status": "검증 대기",
     "why": "EBIT/EV 3.7% · FCF/시총 5.4% · 매출 성장 0.3%",
     "url": "https://m.stock.naver.com/worldstock/stock/XYZ/total"
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
     "why": "EBIT/EV 4.1% · FCF/시총 7.3% · 매출 성장 9.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/CRM/total"
    }
   ]
  },
  "us|dividend": {
   "eligible": 68,
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
      },
      {
       "k": "earn",
       "msg": "실적 발표(10/27) · EPS 서프라이즈 4.6% — 가이던스·논거 확인",
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
     "ticker": "ITUB",
     "name": "Itau Unibanco SA",
     "status": "검증 대기",
     "why": "배당성향 11.8% · 배당 6.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/ITUB.K/total"
    },
    {
     "ticker": "SNY",
     "name": "Sanofi SA",
     "status": "검증 대기",
     "why": "배당성향 76.6% · 배당 5.8%",
     "url": "https://m.stock.naver.com/worldstock/stock/SNY.O/total"
    },
    {
     "ticker": "PBR A",
     "name": "Petroleo Brasileiro Reptg 2 Pref Shs",
     "status": "검증 대기",
     "why": "배당성향 4.5% · 배당 5.1%",
     "url": "https://m.stock.naver.com/worldstock/stock/PBRa/total"
    },
    {
     "ticker": "HSBC",
     "name": "HSBC",
     "status": "검증 대기",
     "why": "배당성향 45% · 배당 4.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/HSBC.K/total"
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
     "ticker": "ING",
     "name": "ING Groep N.V.",
     "status": "검증 대기",
     "why": "배당성향 63.3% · 배당 4.7%",
     "url": "https://m.stock.naver.com/worldstock/stock/ING/total"
    },
    {
     "ticker": "UL",
     "name": "Unilever",
     "status": "검증 대기",
     "why": "배당성향 79.6% · 배당 3.4%",
     "url": "https://m.stock.naver.com/worldstock/stock/UL/total"
    },
    {
     "ticker": "GSK",
     "name": "GSK",
     "status": "검증 대기",
     "why": "배당성향 58.1% · 배당 3.6%",
     "url": "https://m.stock.naver.com/worldstock/stock/GSK/total"
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
     "triedAt": "2026-10-29",
     "since": "2026-10-21",
     "age": 8
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
     "triedAt": "2026-10-29",
     "since": "2026-10-18",
     "age": 11
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
     "triedAt": "2026-10-29",
     "since": "2026-10-18",
     "age": 11
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
     "triedAt": "2026-10-29",
     "since": "2026-10-18",
     "age": 11
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
    },
    {
     "ticker": "FIVE",
     "name": "Five Below",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — PEG 1.98",
       "fresh": false
      }
     ],
     "note": "PEG 가 상한을 넘어 근접 후보 범위(완화선 안) — 재무·ROIC 는 충족, 해자 약세는 기존 위험으로 감시.",
     "judged": "2026-10-26",
     "verdict": "형식"
    },
    {
     "ticker": "STRL",
     "name": "Sterling Infrastructure",
     "state": "감시",
     "flags": [
      {
       "k": "theme",
       "msg": "주제 기준 미달 — 매출 성장 미달(3년 12.1%·최근 17.7%)",
       "fresh": false
      }
     ],
     "note": "3년 매출 성장이 문턱 아래지만 수주잔고·최근 분기 성장은 훨씬 높은 근접 후보. 최근 급락은 회사 고유 악재(공시·실적·애널리스트 조치)를 찾지 못했고 11/9 실적 발표에서 확인한다.",
     "judged": "2026-10-26",
     "verdict": "형식"
    }
   ],
   "list": [
    {
     "ticker": "CORT",
     "name": "Corcept Therapeutics Incorporated",
     "status": "보류",
     "note": "⑨ 주력 제품 매출 비중 약 80% — 12-17 신약 승인 결정과 희석 연 3% 이하 복귀 뒤 재검토.",
     "asOf": "2026-10-26",
     "why": "3년 매출 연평균 23.7% · 3년 평균 ROIC 36.4% · PEG 0.8",
     "near": "희석 주식 수 연 3.6% 증가",
     "url": "https://finance.yahoo.com/quote/CORT"
    },
    {
     "ticker": "CAMT",
     "name": "Camtek",
     "status": "보류",
     "note": "반등 중이나 매출의 약 절반이 중국(⑨)이고 성장 문턱 미달 — 중국 비중 감소 시 재검토.",
     "asOf": "2026-10-26",
     "why": "3년 매출 연평균 15.6% · 3년 평균 ROIC 21.5% · PEG 1.5",
     "near": "매출 성장 미달(3년 15.6%·최근 15.6%)",
     "url": "https://finance.yahoo.com/quote/CAMT"
    }
   ]
  }
 },
 "summary": {
  "review": 0,
  "defect": 11,
  "watch": 25,
  "untried": 0,
  "dup": 2,
  "long": 0
 }
};
