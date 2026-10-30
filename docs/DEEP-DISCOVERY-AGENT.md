# C 모드(주간 심층 발굴) — 후보 검증 서브에이전트 지침

> 메인 세션 사용법(CLAUDE.md §3-6): `node scripts/screen-discovery.js` → `node scripts/deep-packets.js <폴더> --beta` 로 그룹별 묶음 10개를 만든 뒤, 그룹마다 **후보 검증 에이전트(이 파일)** 1개와 **편성 전수 점검 에이전트(`docs/DEEP-AUDIT-AGENT.md`)** 1개를 띄운다(모두 20개, 한 메시지에서 백그라운드로). 에이전트에게는 이 파일 경로와 `{TODAY}`·`{GROUP}`·`{PACKET}` 값만 넘기고 파일을 직접 읽게 한다.
> 2026-10-12 첫 회차는 그룹당 검색 12회·후보 3~4개였다. 2026-10-18 사용자 지시('최선의 종목 선정이 최우선')로 후보 상위 25·새 후보 최소 8개 깊은 검증·검색 35회로 넓혔으나, 턴당 검색 200회 상한(하네스 강제)에 막혀 같은 날 오후부터 '편성 점검 → 실질 결격 그룹만 후보 검증' 파이프라인으로 바꿨다(CLAUDE.md §3-6).

---

당신은 주식 추천 대시보드의 (국가×주제) 한 그룹 **{GROUP}** 의 **후보 검증** 담당이다. 오늘은 {TODAY}.
사용자 지시(2026-10-18): **"최선의 종목을 고르는 것이 최우선 과제 — 토큰을 많이 써도 된다."** 그래서 그룹마다 후보를 넓고 깊게 본다. 같은 그룹의 편성 9종목 결격 점검은 다른 에이전트가 맡으니 당신은 **후보**에 집중한다.
**저장소 파일은 절대 수정하지 말 것**(읽기와 계산 스크립트 실행만). 결과는 마지막에 JSON 하나로 반환한다.

## 입력
- 묶음 `{PACKET}`
  - `themeDefinition`·`screenRule`, `gateThresholds`(정체성 조건 문턱 — 스크린 밖 종목 판정용: 우량 3년 평균 ROIC 중앙값 %, 저평가 EBIT/EV·FCF/시총 70백분위 %), `filterCuts`(자산 증가율 `agTop`·이익 변동 `sroaTop` 상위 10% 문턱 %)
  - `incumbents`: 현 편성 9종목(스크린 지표·신호 3종·β) — 비교 기준
  - `candidates`: 스크린 상위 후보(점수순, 지표·`beta` 포함)
  - `noFactors`(미국만): 재무 팩터를 못 받아 스크린 판정이 불완전한 종목(대개 IFRS 로 공시하는 외국 ADR)
  - `betaNote`: 국가 β 상황
- 규칙 원문: `/home/user/stock/CLAUDE.md` §5(교체 기준)·§6(주제 기준·추세 붕괴) — 판정 전에 이 그룹 주제 부분을 읽는다.
- 이력: `/home/user/stock/WATCHLIST.md` 의 '보류 후보'·'기각 후보'·'결격 감시' 중 이 그룹 줄. 기각 후보는 사정이 바뀐 증거가 없으면 다시 조사하지 않는다. 보류 후보는 적힌 '확인' 조건부터 본다.

## 할 일
1. **선별**: candidates 를 점수순으로 보되 다음은 이유만 적고 건너뛴다 — 다른 정식 주제에 이미 편성(`alsoIn` 이 정식 주제)·지주사 지분법/연결 왜곡·합병·분사 직후 숫자 왜곡·기각 후보(사정 변경 없음).
   - 'β 때문에 보류'된 보류 후보는 검증 사실을 그대로 쓰고 verdict 를 `adopt` 로 올린다(β 조합은 메인이 국가 단위로 판단한다 — 당신은 β 값만 정확히 적는다).
   - 미국 저평가·배당 그룹은 `noFactors` 목록에서 주제에 맞을 법한 큰 종목 2~4개를 `gateThresholds` 기준으로 직접 따져 본다(stockanalysis statistics 의 EV/EBIT·FCF yield 등).
2. **깊은 검증 — 편성 점검이 찾은 실질 결격의 대체 후보를 최대 8개**(그럴듯한 후보가 그보다 적으면 전부, 결격이 없으면 메인이 이 단계를 건너뛴다). 종목마다 검색 2~4회:
   - 최근 분기·최근 연도 실적(매출·영업이익/EPS YoY), 올해·내년 가이던스 또는 컨센서스 방향(상향/하향)
   - 컨센서스 목표가 — **서로 다른 신뢰 도메인 2곳**(5% 넘게 다르면 세 번째로 판별). 단일 증권사 값은 컨센서스가 아니다.
   - 배당(DPS·배당 이력), 지배구조·주요 리스크(소송·규제·고객 집중·희석)
   - 주제 적합성: CLAUDE.md §6 이 주제의 정체성 조건·건전성 필터·검증된 점수 방향과 아래 함정 목록
3. **순위(ranked)**: 검증한 후보 전부를 '이 그룹에 넣을 가치' 순으로 — 주제 충실도(정체성·필터·점수 지표), 실적의 질과 지속성, 재무 건전성, 리스크, 컨센서스 확인 여부. 추세 붕괴(스크린 `fx.trendBroken` 또는 월봉 10·20개월선 아래·두 선 하락)는 `reject`.
4. **adopt 카드**(순위 상위이고 검증을 모두 통과한 후보, 최대 6개): 메인이 바로 카드로 만들 수 있게 `card` 를 채운다
   - `thesis` 한국어 2~3문장(첫 문장에 핵심 — 사업과 이 주제에 맞는 이유, 검증된 회사 수치), `risks` 한국어 2~4개, `earnings` 한국어 1~2문장(최근 분기 실적 수치), `dividendYield`(숫자 %, 무배당 0), `sources` 정확히 2개 URL(서로 다른 신뢰 도메인 — 네이버 종목 페이지는 메인이 맨 앞에 붙이므로 넣지 말 것), `market`(KOSPI·KOSDAQ·NASDAQ·NYSE), `naverCode`(미국만)
   - **카드 문장에 쓰지 말 것**: 가격 의존 수치(상승여력 %·목표가/목표주가 금액·PER/PBR 배수·배당수익률 %·주가 변동성 수치), 작업 경위('확인 못 함'·'재검증 결과' 등). 매출·이익 증가율·배당성향·ROE·순현금·수주잔고 같은 회사 고유 수치는 된다. 목표가 숫자는 `facts.consensusTarget` 에만.
   - 미국 네이버 코드: `curl -s -o /dev/null -w '%{http_code}' https://api.stock.naver.com/stock/<코드>/basic` 이 200 인 코드(나스닥 `TICKER.O`, 뉴욕거래소 접미사 없음 `KO`, 안 되면 `.K`·`.N` 순서로 시도).

## 주제별 함정 (CLAUDE.md §6 요약 — 2026-10-17 1·2차 검증)
- 우량·성장·저평가는 배당을 요구하지 않는다. 주주환원은 자사주 소각·희석 없음으로 본다.
- **우량**: 높은 자본 효율이 **유지되는** 회사 — 3년 평균 ROIC·매출총이익/자산이 높고 희석 없음. 이익 변동이 큰 사이클 업종을 피한다.
- **성장**: 매출 성장률이 가장 높은 후보를 우대하지 말 것(성장주 안 최고 성장은 이후 수익이 낮았다). 성장이 **이어질** 회사 — 3년 연속 성장, 높은 매출총이익/자산·FCF 마진, 순현금, 이미 이익을 냄, 인수로 자산을 급히 불리지 않음, 주식 수를 늘리지 않음.
- **저평가**: 정점 이익의 낮은 PER(가치 함정)을 거른다 — 기업가치(EBIT/EV)·현금(FCF/시총) 대비 싼지, 이익이 안정적인지(영업이익률·ROA 변동), 이익이 현금으로 들어오는지(FCF/순이익). 매출 역성장·희석·자산 급증(대형 인수)은 결격 신호.
- **배당**: 배당이 호황 이익에 연동된 업종(증권·원자재)·경기민감 은행은 하방 경직성 미달. 배당수익률이 가장 높은 후보를 우대하지 말 것(최상위 3분위는 다음 해 삭감 확률 5배). 배당 비감소 연수와 이익 안정성을 본다. 같은 업종 쏠림(한국 금융, 미국 유틸리티)을 줄이는 후보를 같은 조건이면 우선한다.

## 도구·예산
- **WebSearch 만**(WebFetch·금융 API 직접 호출은 403). **검색 상한은 메인이 프롬프트로 준다(보통 ~10~15회, 결격이 많은 그룹 ~30회 — 턴당 200회를 모든 에이전트가 나눠 쓴다, CLAUDE.md §3-3).** `allowed_domains` 에 biz.chosun.com·mk.co.kr·yna.co.kr·reuters.com·barrons.com·marketwatch.com·apnews.com·ft.com·wsj.com 을 넣지 말 것(API 가 400 으로 거부해 호출만 버린다 — 도메인 제한 없는 결과에 나오면 인용은 된다).
- Bash 는 읽기·계산만: `cd /home/user/stock && node scripts/vol-beta.js korea:<코드> us:<티커>`(묶음에 β 가 없을 때만), 위 curl.
- 수치는 검색 결과에 실제로 적힌 값만. 확인 못 하면 null(추정 금지).
- 신뢰 도메인(출처 URL 은 여기서): fnguide.com, wisereport.co.kr, tipranks.com, stockanalysis.com, investing.com, marketbeat.com, marketscreener.com, zacks.com, morningstar.com, tikr.com, finance.yahoo.com, nasdaq.com, finance.naver.com, stock.naver.com, dart.fss.or.kr, krx.co.kr, sec.gov, hankyung.com, mk.co.kr, sedaily.com, edaily.co.kr, mt.co.kr, biz.chosun.com, yna.co.kr, newsis.com, news1.kr, fnnews.com, asiae.co.kr, businesspost.co.kr, thebell.co.kr, heraldcorp.com, newspim.com, zdnet.co.kr, bizwatch.co.kr, reuters.com, bloomberg.com, wsj.com, ft.com, cnbc.com, marketwatch.com, barrons.com, apnews.com. 블로그·카페·커뮤니티·유튜브·위키 금지. stock.pstatic.net PDF·회사 IR 페이지·globenewswire·prnewswire·businesswire·barchart 는 참고만(신뢰 도메인으로 세지 않음).

## 반환 — 마지막에 아래 JSON 하나만(```json 코드블록)
```json
{
  "group": "{GROUP}", "role": "candidates", "searchesUsed": 0,
  "ranked": [
    {"rank": 1, "ticker": "", "name": "", "verdict": "adopt|hold|reject",
     "why": "한국어 1~2문장 — 왜 이 순위·판정인가(주제 충실도·실적·리스크)",
     "beta": {"daily": null, "weekly": null},
     "facts": {"latestQuarter": "", "latestYear": "", "guidance": "", "consensusTarget": null, "consensusSources": [], "dividendYield": null, "governance": "", "themeFit": ""},
     "card": null}
  ],
  "skipped": [{"ticker": "", "name": "", "reason": ""}],
  "notes": ""
}
```
`card` 형식: `{"thesis":"","risks":[],"earnings":"","dividendYield":0,"sources":["",""],"market":"","naverCode":""}` — verdict 가 adopt 일 때만. 근거 URL 은 실제로 본 검색 결과의 URL 만.
