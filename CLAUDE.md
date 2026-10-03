# CLAUDE.md — 주식 추천 대시보드 운영 지침

이 저장소는 정적 대시보드(GitHub Pages)다. Claude 세션은 아래 규칙을 반드시 따른다.
**이 파일은 현행 규칙만 담는다.** 규칙이 생긴 이유·실측 사례·백테스트 수치는 `docs/HISTORY.md`(부록에 2026-10-03 이전 원문 전체)에 있다 — 규칙의 근거가 궁금할 때만 찾아본다. 규칙을 바꾸면 근거 한두 줄은 여기에, 긴 설명은 HISTORY 에 남긴다.

## 1. 운영 모델

### 1-1. 자동(Action, LLM 0) — 직접 수정 금지
`refresh-quotes` GitHub Action 이 **평일 07:00·21:00 UTC** 에 순수 스크립트로 처리한다(주말·휴장일은 A 루틴 세션의 backbone 재실행이 대신한다). 아래 파일과 `price`·`priceDate`·`upside`·`generatedAt` 은 이 Action 몫이다 — **직접 조사·수정하지 않는다.**
- `data/quotes.js`(시세) · `data/indices.js`(나스닥·다우·코스피·코스닥) · `data/stock-ta.js`(전 종목) — Yahoo **10년** 일봉에서 단기(일봉)·중기(주봉)·장기(월봉) 3기간 계산(`scripts/update-indices.js`·`update-stock-ta.js`, 공유 `lib-ta.js`). 10년인 이유: 월봉 일목 선행스팬B(52)+선행(26)=78개월이 필요.
- **신호 엔진 `mtf`**: 기간별로 이동평균 30%·일목균형표 30%·매물대 25%·오실레이터(RSI·스토캐스틱·MACD·ADX) 15% 가중(=`flow` 점수) 후 상위 기간 추세를 섞는다(단기=일·주·월 5:3:2, 중기=주·월 7:3, 장기=월봉). 중립 밴드 안이면 그 축은 기권하고, 결측은 재정규화한다. 5단계 신호.
- `data/liquidity-auto.js`(유동성 baseline, `update-liquidity-gauge.js`) · `data/watch-candidates.js`(관심 차트 후보, `screen-watch.js`) · `data/history.js`(스냅샷, `rsp` 포함) · `data/coverage-status.js`(앱 '데이터 신선도' 패널, `coverage.js --emit`) · `data/tickers.js`(검색 사전, `gen-tickers.js` — 월요일 주 1회, KRX 실패 시 네이버 폴백).

### 1-2. 온디맨드 분석(LLM) — "업데이트" 요청 시
`data/recommendations.js`(분석·추천·`topPicks`·시황)·`data/liquidity.js`(유동성 판단)·`data/index-notes.js`(지수 대응)·`techNote` 는 **"업데이트" 요청**이 들어올 때 갱신한다. 요청 = 사용자 채팅 또는 아래 루틴 발화. **지시는 루틴 프롬프트가 아니라 이 파일에만 둔다**(루틴은 한 줄만 발화 — 긴 프롬프트 루틴이 조용히 실패한 이력 때문).

### 1-3. 루틴 일정
| 루틴 | cron(UTC) | 한국시간 | 발화 문구 | 범위 |
|---|---|---|---|---|
| `trig_01DskdsSYkxFaojtufE6Bav4` | `0 8 * * *` | 매일 17:00 | `업데이트 해줘` | **A = 풀 업데이트**(§3) |
| `trig_0159yuXFunsQ6Yx9AWKZqSi7` | `0 10 * * *` | 매일 19:00 | `재검증 돌려줘` | **B = 회전 전용**(§3-4) |

- **서머타임(DST)은 신경 쓰지 않는다**: cron 은 UTC 고정이고 전환 때 옮기지 않는다(2026-10-03 사용자 결정). 한국시간은 연중 같고 LA 시각만 1시간 바뀐다. 앱 안내 문구(`#routineTime`)·'약 N시간 뒤' ETA 는 `index.html` 의 `ROUTINE_UTC_HOUR = 8` 기준으로 자동 계산된다 — cron 을 바꾸면 이 상수도 함께 바꾼다.
- 08:00 UTC 는 한국 마감(06:30) 뒤라 한국은 당일 종가, 미국은 직전 정규장 종가 기준이다.
- **주말·휴장일**: T 가 그대로라 매 거래일 항목은 이미 통과 상태다(§3-1) — 그날 A 는 회전 큐와 D절만 처리하고 날짜만 바꿔 다시 쓰지 않는다.
- **새 루틴을 만들면 `sources`(저장소)를 반드시 `csy870617/stock` 으로 지정**한다(MCP `create_trigger` 는 비워 둔다 → 저장소 없이 떠서 흔적 없이 실패). 루틴이 아무 흔적 없이 실패하면 프롬프트보다 `sources` 부터 본다(`mcp__Claude_Code_Remote__list_triggers` 의 `job_config.ccr.session_context.sources`).

### 1-4. 브랜치
- **배포 브랜치** `claude/stock-analysis-recommendation-v9310x` 에 push 될 때만 `deploy-pages` 가 배포한다. 세션에 지정 작업 브랜치(`claude/…`)가 따로 있으면 **같은 커밋을 양쪽에** 남긴다 — 지정 브랜치에만 push 하면 앱은 갱신되지 않는다. 배포 브랜치가 `claude/` 접두사라 루틴 기본 권한으로 push 가능하다.

### 1-5. 주제(탭)
- 정식 추천 5개: `core` 우량·`growth` 성장·`value` 저평가·`dividend` 배당·`rising` 히든 — (주제×국가) **9종목·tier 3/3/3** 구조.
- 개인 목록 2개: `watch`(관심)·`hold`(보유) — 구조 규칙 면제(`validate-reco.js` 의 `PERSONAL_THEMES`), **분석 깊이는 추천과 동일**(techNote 3기간·valueNote·컨센서스·aiTarget, 회전 포함). Top Pick 후보에서만 제외. 앱 카드의 `+ 관심`·`+ 보유` 토글로 담는다(서로 독립).

## 2. 업데이트 요청 처리 프로토콜 — GitHub 이슈로 추적 (★ 필수)
앱 상태칩(`#updStatus`)은 title 에 `업데이트 요청` 이 든 최신 이슈를 읽어 🟡(열림·코멘트0)→🔧(열림·코멘트≥1)→🟢(닫힘) 으로 표시한다.
1. **이슈 확보**: 열린 `업데이트 요청` 이슈가 있으면 재사용, 없으면 생성(title `전체 업데이트 요청 (분석·추천 + 유동성)`).
2. **착수**: `🔧 처리 시작` 코멘트.
3. **작업**(§3).
4. **완료**: 결과 요약 코멘트 + 이슈 닫기. `coverage.js` 가 red 로 끝나면(backlog) 열어 둔 채 출력을 코멘트로 남긴다.
- `mcp__github__*` 가 없는 세션이면 이슈 추적만 건너뛰고 나머지는 전량 수행, 마지막 커밋 메시지에 `(이슈 추적 생략: github MCP 없음)`.

## 3. 풀 업데이트 (A) — 매 거래일 항목 + 7일 회전 (★★)

### 3-1. 항목별 주기 — 완료 판정은 `node scripts/coverage.js` 가 한다
**기준일은 '오늘'이 아니라 최신 거래일 T(`stock-ta.js` asOf)다.** 주말·휴장일엔 T 가 그대로라 직전 거래일 분석이 그대로 유효하다 — 새 데이터 없이 날짜만 바꿔 찍지 않는다.

| 데이터 | 주기 | 게이트 | 세션 큐 |
|---|---|---|---|
| `techNote`(단·중·장 + sig 3종) | 매 거래일 | `asOf == T` | `carry-technote.js` 후 `--remaining techNote` |
| `valueNote` | 상시 | 비어 있지 않음 | `--remaining valueNote` |
| `index-notes` 4개 지수 | 매 거래일 | `asOf == indices.js asOf` + 7필드 | — |
| `topPicks` 한·미 3+3 | 매 거래일 | `asOf ≥ T` | — |
| `liquidity.js` 게이지·headline 3종 | 매 거래일 | `asOf ≥ T` | — |
| 시황 `marketNote`/US/KR | 매 거래일 | `marketNoteAsOf ≥ T` | — |
| backbone 재생성 | 매 실행 | `builtAt` 오늘, 또는 T 21:00Z 이후(주말·휴장일) | — |
| **목표가 재검증**(`targetPrice`·`thesis`·`risks`·배당·실적) | 7일 회전 | 전 종목 `verifiedAt` 7일 이내 | `--remaining verified`(최대 15 — **목표가 소진 종목 우선** → 만료 → 선행) |
| **신규 후보 탐색** 10그룹 | 7일 회전 | 전 그룹 `discovery["<country>\|<theme>"]` 7일 이내 | `--remaining discovery`(최대 4, 선행 포함) |
| **aiTarget 재시도** | 7일 회전(값 없이 2회 연속 실패면 14일) | 전 종목 `aiCheckedAt` 주기 이내 | `--remaining aiTarget`(최대 20, 선행 포함) |
| **tier 재평가** 10그룹 | 7일 회전 | 전 그룹 `tierAsOf` 7일 이내 | `--remaining tier`(만료+선행 그룹 최대 3, 주제 포함 출력) |

- **한국·미국 동등**: 회전 큐는 경과일이 같으면 한·미를 번갈아 낸다(`fairQueue`). 큐 순서를 그대로 쓰고 임의로 국가를 고르지 않는다.
- 회전 항목은 '오늘 몇 건 했나'가 아니라 **'가장 오래된 것이 주기를 넘지 않았나'** 로 판정한다. 큐를 다 비웠는데도 초과가 남으면 backlog 이고, 그 회차는 red 로 끝나는 게 정상이다(이슈를 열어 둔 채 인계).
- **선행 채움**: 만료분이 큐 한도에 못 미치면 4일 이상 지난 종목·그룹을 오래된 순으로 미리 채운다(출력 끝 `(선행)`, `--lookahead N`). 같은 날 대량 만료를 막고 노는 예산을 당겨 쓰는 것이라 **선행분도 똑같이 처리**한다.
- **목표가 소진 우선**: 현재가 ≥ 목표가이고 3일 이상 재검증하지 않은 종목은 주기와 무관하게 재검증 큐 맨 앞에 온다.

### 3-2. A 회차 순서
1. **backbone 최신화**: `update-quotes.js`·`update-stock-ta.js`·`update-indices.js`·`update-liquidity-gauge.js`·`screen-watch.js` 실행 → T 확정. 건너뛰면 구식 T 로 techNote 를 써서 다음 Action 직후 통째로 무효가 된다.
2. **techNote**: 먼저 `node scripts/carry-technote.js` — 엔진 등급 3종이 그대로이고 가격이 ±3% 이내이며 문장을 쓴 지 6일 이내인 종목은 `asOf` 만 T 로 이월한다(`writtenAt`·`basePrice` 기록). 남은 종목(`--remaining techNote`)만 재작성한다. valueNote 누락분도 채운다. **무검색**(quotes·stock-ta 숫자만).
3. **목표가 재검증** 큐(§4-1).
4. **tier 재평가** 큐 그룹(§4-4). 실적 발표·가이던스 급변·대형 M&A 가 있었던 그룹은 큐와 무관하게 즉시 재평가.
5. **aiTarget 재시도** 큐(§4-5).
6. **신규 후보 탐색** 큐(§5) — 예산을 재검증보다 **먼저** 떼어 둔다.
7. **관심종목 D절**(§4-7).
8. **시황·유동성**(§4-3): `marketNote`·`marketNoteUS`·`marketNoteKR`·`marketNoteAsOf`, `liquidity.js` 전체.
9. **지수 대응** `index-notes.js`(§4-2).
10. **Top Pick** 재선정(§4-6).
11. **기록·배포**: `snapshot.js` → `WATCHLIST.md` 갱신(상태 섹션 갱신 + 회차 기록은 `# 최근 회차 기록` 맨 위에 추가) → `node scripts/archive-watchlist.js`(7일 지난 회차 기록을 `archive/WATCHLIST-<YYYY-MM>.md` 로 이동 — 세션마다 읽히는 파일이라 커지면 컨텍스트를 잠식한다) → `validate-reco.js` 오류 0 → **`node scripts/coverage.js --emit`**(빠뜨리면 앱 패널이 이번 회차를 반영 못 함) → 커밋·push(배포+지정 브랜치).

### 3-3. 검색 예산·실행 전략
- **WebSearch 예산은 세션 전체 공유 ~200회**다(서브에이전트별이 아님 — 에이전트를 늘려도 총량은 같다). 배분: 발굴(그룹당 ~6) → 목표가 재검증(종목당 ≤10) → aiTarget(종목당 ≤4) → tier·D절 성장 검증. `quotes.js`·`stock-ta.js` 로 아는 숫자는 재검색하지 않는다.
- 독립 조사는 서브에이전트로 병렬 fan-out 하고 결과만 구조화 반환받는다(서브에이전트는 파일을 고치지 않는다). 파일 반영은 메인이 **단일 작성자**로 순차 수행하고, 중간 커밋으로 진행분을 보존한다. tier 는 그룹당 1에이전트(9종목을 함께 봐야 하는 상대순위).
- 예산 부족으로 못 채운 필드는 서브에이전트가 명시해 반환하고, 메인이 더 작은 배치로 재시도한다.

### 3-4. B 모드 — 회전 전용 (`재검증 돌려줘` / `목표가 재검증만 해줘`)
1. **먼저 이슈 정리**: 열린 `업데이트 요청` 이슈가 있으면(큐가 비었더라도) `node scripts/coverage.js` 를 돌려 exit 0 이면 결과 코멘트 후 닫는다 — 큐 확인보다 먼저 한다(큐가 비어 바로 끝나면 A 가 열어 둔 이슈가 '🔧 처리중'으로 남는다).
2. 큐 4종을 받는다: `--remaining verified`·`aiTarget`·`discovery`·`tier`(만료분과 `(선행)` 분 모두 대상). **모두 비면 "전 항목 주기 내 — 할 일 없음"으로 끝낸다**(빈 커밋 금지).
3. 발굴 → 목표가 재검증 → aiTarget → tier 순으로 집행. `verifiedAt`·`aiCheckedAt`(+`aiFailCount`·`aiFailReason`)·`discovery[<그룹>]`·`tierAsOf` 를 merge.
4. **하지 않는 것**: techNote·valueNote·시황·유동성·지수·Top Pick·D절·backbone.
5. 새 이슈를 만들지 않는다. 열린 이슈가 있으면 결과를 코멘트로 남기고, 처리 후 `coverage.js` 가 **exit 0 이면 닫는다**(exit 1 이면 열어 둔다).
6. `validate-reco.js` 오류 0 → `coverage.js --emit` → 커밋·push. 보고에 재검증 N·aiTarget M·탐색 K그룹·tier G그룹·남은 초과 건수.

### 3-5. 완료 게이트·보고
- `validate-reco.js`(값이 올바른가)와 `coverage.js`(전부 했는가) **둘 다 통과해야 "완료"**. merge 할 때마다 `coverage.js` 로 진척을 보고, 미달분은 `--remaining <항목>` 으로 재배치한다.
- 세션 한도로 끝내야 하면 진행분을 push 하고 **`coverage.js` 출력을 그대로** 보고한다(조용한 축소·낙관적 보고 금지).
- 완료 보고 필수 항목: techNote(재작성/이월 수), valueNote, 목표가 재검증, tier 그룹, aiTarget(보유 X/전체·신규 Y·실패 사유), 탐색 그룹, 교체 건수, 못 한 항목과 이유.

## 4. 작업 기준

**공통**: WebSearch 만 사용(WebFetch·금융 API 직접 호출은 403). 수치는 검색 스니펫에 실제로 적힌 값만, 확인 못 한 값은 기존값 유지. 패치는 `node scripts/update-reco.js <patch.json>` 증분 적용(시세 필드는 넣지 않는다).

### 4-1. 목표가·논거 (`recommendations.js`)
- 목표가는 **컨센서스**(단일 증권사 최고치 금지), 서로 다른 신뢰 도메인 2개 교차확인. 두 출처가 5% 이상 다르면 세 번째로 판별해 다수/중앙값. 확인 못 하면 기존값 유지하되 `verifiedAt` 은 갱신하고 못 채운 필드를 보고.
- 재검증 시 `thesis`·`risks`·`dividendYield`·`earnings` 도 재확인. 지배구조 스크리닝 수행(과거 편출 종목도 결격 해소 시 재편입 가능).
- 우선순위 도구: `performance-report.js`(목표가 소진·성과 부진·`tierReview` 참고)·`validate-reco.js` 경고.
- **내러티브 수치 신선도**: `reason`·`valueNote`·`thesis` 의 상승여력·목표가 수치는 **작성 시점 quotes.js 가격 기준**으로 계산한다(저장 `upside` 를 박지 말 것). validate 가 topPicks ±10%p·valueNote ±15%p 괴리를 경고하면 다음 회차에 우선 재작성. 수치 없이 써도 된다.

### 4-2. 기술 대응 (`techNote`) · 지수 대응 (`index-notes.js`)
- 6단계(추세·위치·모멘텀·거래량·지지저항·변동성/손절)로 분석하되 저장은 간결히: `{asOf, short, mid, long(각 1~2문장, 핵심 숫자 포함), sigShort, sigMid, sigLong}`. 단기=일봉·중기=주봉·장기=월봉. 형식 예시는 삼성전자(005930).
- 서술 순서 = 판단 가중 순서: **이평·일목·매물대 먼저, 오실레이터는 보조**. 지표 충돌을 양방향으로 얼버무리지 말 것(확률 높은 쪽), 하락추세면 '반등 시도'로만('추세 전환' 금지), 미확인 수치 금지.
- **sig 3종은 같은 거래일 `stock-ta.js` 의 `short/mid/long.signal`(최종 등급)을 그대로 쓴다** — 문구는 등급의 근거 설명이다. 2단계 이상 어긋나면 validate·update-reco 가 저장을 거부한다.
- 기술 대응은 LLM techNote 만 표시한다(자동 폴백 없음). 구식 신호칩(taStrip)은 폐기됐다.
- **지수**: `window.INDEX_NOTES = {asOf, items:{nasdaq|dow|kospi|kosdaq:{value,short,mid,long,sigShort,sigMid,sigLong}}}`. `value` = 지수 고유 밸류(멀티플 등)+해당 지역 유동성 국면(미국=nasdaq·dow, 한국=kospi·kosdaq), sig 는 `indices.js` 의 각 기간 signal 기준.
- **valueNote**: 밸류에이션 관점 1~2문장("왜 싸다/비싸다") — thesis(사업)·techNote(매매)와 구별, 검증된 값만.

### 4-3. 시황·유동성 (`liquidity.js` — baseline 위 판단층)
- baseline(`liquidity-auto.js`)이 못 읽는 것에 집중: 거시 이벤트(FOMC·금통위·지정학), 느린 거시(M2·연준 대차대조표·Core PCE/CPI·외국인 수급), 내러티브.
- 게이지 5단계(`매우 우호`/`우호`/`신중`/`부정`/`매우 부정`) 단기·중기, 등급 변경·baseline 과의 괴리는 근거 수치를 `drivers` 에. `headline`·`headlineUS`·`headlineKR` 모두 갱신(앱은 선택 국가 것만 표시).
- 시황 `marketNoteUS`·`marketNoteKR`(국가별)·`marketNote`(통합) 모두 갱신하고 `marketNoteAsOf` = 다시 쓴 날.

### 4-4. tier — 기업·주식의 질 기준
- (주제×국가) 9종목을 품질 축으로 종합해 상위 3=T1·다음 3=T2·나머지 3=T3: ①재무 건전성 ②수익성·자본효율 ③경쟁력·해자 ④성장성 ⑤주주환원 ⑥밸류 매력(상승여력·aiTarget) ⑦논거 견고성·리스크. 검증된 스니펫 수치만, 미확인 축은 기존 판단 유지.
- **과거 성과는 tier 를 직접 바꾸지 않는다**(`tierReview` 는 참고). 승격 1건 = 같은 그룹 강등 1건. 재평가한 종목은 `tierAsOf` 를 오늘로(변경 없어도). 조정 내역은 완료 코멘트·WATCHLIST 에.

### 4-5. AI 적정가 (`aiTarget`·`aiBasis`·`aiAsOf`·`aiCheckedAt`·`aiFailCount`·`aiFailReason`)
- 검증된 입력값만으로 명시적 공식: 이익주 `EPS × 적정 PER`, 배당주 `DPS ÷ 요구수익률`, 금융주 PBR-ROE 등. 배수는 검증 가능한 앵커(역사 평균 선행 PER·리포트 Target 배수·현행 선행 PER)를 인용해 업종 밴드와 비교, 보수적인 쪽. `aiBasis` 에 공식·입력·근거 필수.
- **입력값(EPS·DPS)이 검증됐는데 앵커만 못 찾았다면 실패가 아니다** — 업종 밴드 하단(보수적)으로 산출하고 그 사실을 `aiBasis` 에 적는다.
- 성공: `aiTarget`·`aiBasis`·`aiAsOf`·`aiCheckedAt`·`aiFailCount:0`. 실패: `aiCheckedAt`·`aiFailCount`(+1)·`aiFailReason`(한국어 한 줄 — 무엇을 확인 못 했나). 값 없이 **2회 연속 실패하면 주기가 14일**로 늘어난다. 재시도 전 `aiFailReason` 을 읽고 그 병목부터 겨냥한다. 종목당 검색 4회 이내, 추정치로 채우지 않는다.

### 4-6. 오늘의 Top Pick (`topPicks`)
- 정식 추천(watch·hold 제외) 중 한국·미국 **각 3종목**을 매 회차 처음부터 재선정. 스키마 `{asOf, note, korea:[{rank,ticker,market,name,reason(한국어 1문장)}×3], us:[…×3]}`.
- **장기(월봉) 신호를 주 근거로**(시장 대비 선별력이 전·후반 모두 일관된 유일한 기간), 단기·중기는 적극매도·매도 제외(falling knife 회피)에만 쓴다.
- **한국은 상승여력 크기로 순위를 매기지 않는다**(컨센서스 upside 선별력 미확인) — 품질(tier)·장기 신호·실적 모멘텀 우선. 미국은 상승여력·품질을 함께.
- `validate-reco.js` 가 국가별 3종목·해당국 정식 추천·한국어 이유·중복을 검증. 데이터가 없으면 앱이 국가별 상위 3으로 폴백.

### 4-7. 관심종목 D절 — 차트 스크리닝 편입·교체 (`watch` 전용, `hold` 제외)
- 국가별·태그별 **5종목** 정원: `watchTag:"턴어라운드"`(바닥 확인+5·20·60일선 수렴+정배열 근접), `"신고가"`(물량 소화 후 신고가 갓 돌파). 관심 카드엔 tier 배지를 쓰지 않는다.
- 차트는 다시 조회하지 말고 `data/watch-candidates.js` 만 읽는다: `turnaround`·`breakout`(국가별 상위 후보), `current`(현 관심종목 상태: 유지·졸업·이탈·태그 없음).
- 할 일: ①**이탈** 제외 ②**졸업**(52주 고점 회복)은 `신고가` 전환 검토 ③빈자리를 후보 점수순으로 충원 ④**목표가 소진**(재검증 후에도 상승여력 ≤0) 종목은 편출 후보 — 같은 태그 후보가 검증을 통과하면 교체, 없으면 유지하고 WATCHLIST 에 기록.
- **편입 전 필수 검증**(WebSearch): 안정 성장(최근 분기·연간 매출·영업이익/EPS YoY 증가 — 이익 감소·역성장·턴어라운드 초입 금지), 컨센서스 목표가(신뢰 도메인 2개), 배당·실적·논거·리스크 → `theme:"watch"` 풀카드 `add`. 실패하면 다음 순위.
- **판정은 마감 후 스크리닝 기준**: 08:00 UTC A 회차는 한국 마감(06:30 UTC) 뒤라 그대로 진행한다. 한국 장중에 수동으로 돌린 경우 한국 종목 편입은 마감 후로 미루고, 부득이 편입했으면 마감 후 재스크리닝해 이탈분을 정리한다(미국 종목은 직전 정규장 종가 기준이라 그대로 진행).
- 정원 미달 태그는 매 회차 채우려 시도하고, 못 채우면 몇 자리가 왜 비었는지(후보 0건/검증 실패)를 WATCHLIST·완료 보고에 남긴다. 후보가 없으면 억지로 채우지 않는다.
- 편입 후 `update-quotes.js`·`update-stock-ta.js` 를 한 번 돌리고 techNote·valueNote 를 채운다. 유니버스는 `screen-watch.js` 의 `UNIVERSE`.

### 4-8. 정밀분석·편성 제외 요청 (이슈)
- **정밀분석**: title `관심종목 정밀분석 요청:` 또는 `보유종목 정밀분석 요청:` 인 열린 이슈(본문에 `theme:"watch"|"hold"`). A 와 같은 기준으로 리서치해 해당 theme 풀카드로 `add` → validate → 커밋·push → 이슈 요약 코멘트 + 닫기. 개인 목록은 구조 규칙만 면제, 필드 검증·신뢰 출처·±50% 가드레일은 동일. 보유 종목엔 `watchTag` 를 붙이지 않고 D절 대상도 아니다.
- **편성 제외**: title `편성 제외 요청:` 이슈 → `remove` 로 `{country, ticker, theme}` 제거(같은 티커의 다른 주제는 유지). 사용자가 직접 뺀 것이므로 재편입 판단 없이 그대로 제거. `remove` 도 하루 20건 레저를 소진한다.

## 5. 신규 후보 탐색·교체 (7일 회전)
1. **대상**: `coverage.js --remaining discovery` 큐 그룹. 순서는 WATCHLIST 보류 후보 재검증 → 목표가 소진·성과 부진 그룹 → 나머지. 마친 그룹마다 top-level `discovery["<country>|<theme>"]` 에 오늘 날짜(안 남기면 게이트 미통과).
2. **다각도 검색**: 그룹마다 서로 다른 각도로 최소 2회(컨센서스 상승여력 상위·실적 서프라이즈·신규 커버리지·주제별 유망주 리스트·낙폭 과대+촉매 등).
3. **교체 기준(전부 충족)**: ①주제 정의 부합 ②신뢰 출처 2개 교차확인 ③목표가·배당 스니펫 확인 ④**편출 종목에 결격이 있어야 한다** — 목표가 소진·논거 훼손·가이던스 하향/역성장·지배구조 결격·주제 이탈·(미국 히든) 품질 기준 미달. **'후보가 더 좋아 보인다'만으로는 교체하지 않는다**(실측상 한국 교체는 편출 종목이 더 나았다 — 결격 없는 우월 후보는 WATCHLIST 대기) ⑤국가 정식 편성 β 를 1 에서 더 멀어지게 하지 않는다. 하루 최대 10교체, 0건이면 '교체 0건' 명시.
   - 현재가만 미확인이고 우월성이 가격 불확실성을 감안해도 성립하면 `priceUnverified: true` 로 편입 가능(quotes.js 가 시세를 잡으면 자동 해제).
4. **기록**: 탐색 그룹·검토 후보·채택/보류/기각 사유를 완료 코멘트와 `WATCHLIST.md`(보류 후보·기각 후보 섹션)에 남긴다. 보류 후보는 다음 회차에 가장 먼저 재검증.

## 6. 성과 측정·포트폴리오 구성 원칙
- **측정은 '보유 기준'**: 앱 성과 탭 '추천시점'·`performance-report.js` 의 `held` = 매 스냅샷 편성을 동일비중으로 이어 붙인 실제 성적(편출 포함). 판단은 **β 반영 초과**와, 미국은 **동일비중 S&P(RSP) 대비**로.
- **β 밴드 0.7~1.3**: 국가별 정식 편성의 보유 기준 β. 벗어나면 `performance-report.js` 가 `⚠ 액티브 위험` — 편입·교체·tier 동률 판단에서 β 를 1 쪽으로 되돌리는 후보 우선(배당 주제의 낮은 β 는 정체성이라 다른 주제에서 조정).
- **지수 대표 대형주 유지**: 각국 시총 상위 2종목(현재 삼성전자·SK하이닉스, 미국 시총 1·2위)은 정식 편성에 두는 것이 기본값. 결격 없이 상승여력 축소만으로 편출하지 않는다.
- **미국 히든(rising) 품질 기준**: 신규 편입은 ①최근 4분기 합산 영업이익 흑자(GAAP/조정 명시) ②매출 YoY 성장 ③`risk.vol` 70% 이하. 기존 미충족 종목은 재검증 회차에 결격 기록·교체 1순위(일괄 편출 금지).
- **검증 없는 팩터 금지**: 모멘텀·반전·52주 고가·저변동성·200일선 이격 6종은 사전 기준(지수 초과 횡단면 IC, 전·후반 모두 양)에서 기각됐다 — 선정 규칙에 넣지 말 것. 다음 후보는 **목표가·이익 전망 상향(revision)** — `data/tp-history.json` 이 6개월(2027-02) 쌓이면 같은 기준으로 검증한다.

## 7. 신호·밸류 검증 도구 (온디맨드)
- `scripts/backtest-signals.js` → `data/backtest-report.json`: 룩어헤드 없는 롤링 평가. **엔진 변경은 `validation` 기준(같은 나라 지수 초과수익의 날짜별 횡단면 IC, 전반·후반 모두 우위)으로만 채택**한다 — 절대수익 스프레드만으로 채택하지 말 것. 현재 결론: 단기·중기 선별력 미약, 장기(월봉)만 일관(그래서 앱 푸터에 '신호는 참고 지표' 고지 상시). `legacy`·`block`·`gate` 변형은 이미 기각됐다 — 새 가설 없이 재설계를 반복하지 말 것.
- `scripts/backtest-upside.js` → `data/backtest-upside.json`: 미국 컨센서스 upside 는 양(+)의 IC, 한국은 선별력 없음(단일 국면 — 분기마다 재실행). pickScore 의 upScore 는 '국가 내 중앙값 ±30%p 상대 점수', riskScore 는 `stock-ta.js` 의 `risk{vol,mdd}` 실측(vol 20~70%·mdd 10~50% 정규화, 6:4).
- `data/tp-history.json`: `snapshot.js` 가 목표가 변경분만 무기한 기록(앱은 로드하지 않음 — `sw.js` SHELL 에 넣지 말 것).

## 8. 가드레일 (코드로 강제)
`update-reco.js`·`validate-reco.js` 가 거부하는 것: 신뢰 출처 2개 미만(서로 다른 신뢰 도메인, 커뮤니티·블로그·SNS 금지) · 목표가 ±50% 급변(같은 패치 내 체이닝 포함) · 분석 변경에 근거 URL 없음 · techNote 등급 ↔ 같은 거래일 엔진 등급 2단계 이상 불일치 · (주제×국가) 9종목·tier 3/3/3 위반(개인 목록 면제) · **하루(UTC) 편입+편출 20건 초과**(`data/reco-ops.json` 레저 — 함께 커밋).

### 경합 충돌 해소 (★ 필수)
다른 세션이 먼저 push 해 rebase 가 충돌하면 **원격 변경을 절대 버리지 않는다**(`--ours/--theirs` 통째 선택·덮어쓰기 금지). `git rebase --abort` → `git reset --hard origin/<배포브랜치>` → 이번 세션의 패치 JSON 을 `update-reco.js` 로 재적용 → validate → push. 패치를 안 남겼으면 양쪽 종목을 모두 살리도록 수동 병합. 해소 후 종목 수와 `watch`·`hold` 종목 유실 여부를 확인한다.
