# C 모드(주간 심층 발굴) — 그룹 담당 서브에이전트 지침

> 메인 세션 사용법(CLAUDE.md §3-6): `node scripts/screen-discovery.js` → `node scripts/deep-packets.js <폴더>` 로 그룹별 묶음 10개를 만든 뒤, 그룹마다 서브에이전트 1개에 **이 파일 본문(아래 '---' 이후)** 을 넘긴다. `{TODAY}`·`{GROUP}`·`{PACKET}`(묶음 JSON 경로)·`{BETA_NOTE}`(그날 `performance-report.js` 의 국가별 보유 기준 β 한 줄)를 채운다. 10개를 한 메시지에서 동시에 띄운다(백그라운드).
> 2026-10-12 첫 회차 기준: 그룹당 검색 10~12회·약 12분이 걸렸다. 후보 64건 검토, 교체 5건.

---

당신은 주식 추천 대시보드의 (국가×주제) 한 그룹 **{GROUP}** 을 맡아 **더 좋은 종목이 있는지** 검증한다. 오늘은 {TODAY}.
**파일을 절대 수정하지 말 것**(읽기만). 결과는 마지막에 JSON 하나로 반환한다.

## 입력
- 그룹 묶음: `{PACKET}` — 주제 정의, 현 편성 9종목(tier·현재가·목표가·`upsidePct`·`targetExhausted`·배당·신호 3종·60일 변동성 `vol60`·논거/실적/리스크 요약·스크린 지표·`passesRule`), 스크린 후보 상위 10(`candidates`).
  - 상승여력·목표가 소진은 묶음 값(quotes.js 현재가 기준)을 쓴다. `data/recommendations.js` 의 `upside`·`price` 는 폴백값이라 판단에 쓰지 않는다.
  - 스크린 지표 단위: revG(최근 연도 매출 YoY %)·revE(올해 추정 매출 YoY %)·qRevYoY(최근 분기 매출 YoY %)·opE/opG/qOpYoY(영업이익 증가 %)·roe/roa/opm(%)·ebitM(TTM EBIT 마진 %)·debt(부채비율 %)·per/pbr(배)·divY(배당수익률 %)·upside(컨센서스 목표가 대비 %, tp=목표가)·recomm(투자의견 평균, 5=강력매수).
  - 스크린은 '후보 생성'일 뿐이다. 숫자는 네이버 집계라 틀릴 수 있으니 핵심 수치는 검색으로 확인한다.
- 이력: `/home/user/stock/WATCHLIST.md` 의 '보류 후보'·'기각 후보'·'결격 감시' 섹션(이 그룹 줄만 보면 된다). 기각 후보는 사정이 바뀐 증거가 없으면 다시 조사하지 않는다. 보류 후보는 적힌 '확인' 조건부터 본다.

## 도구·예산
- **WebSearch 만** 쓴다(WebFetch·금융 API 직접 호출은 403). **검색은 최대 12회.**
- `allowed_domains` 에 **biz.chosun.com·mk.co.kr·yna.co.kr·reuters.com·barrons.com·marketwatch.com 을 넣지 말 것** — 넣으면 API 가 실행 전에 400 으로 거부해 호출만 버린다(첫 회차 10그룹 중 대부분이 1~2회씩 낭비). 이 도메인 기사는 도메인 제한 없는 검색 결과에 나오면 인용해도 된다.
- 수치는 검색 결과에 실제로 적힌 값만 쓴다. 확인 못 하면 null 과 '미확인'으로 남긴다(추정 금지).
- 신뢰 출처(출처 URL 은 이 도메인들에서): fnguide.com, wisereport.co.kr, tipranks.com, stockanalysis.com, investing.com, marketbeat.com, marketscreener.com, zacks.com, morningstar.com, finance.yahoo.com, nasdaq.com, finance.naver.com, stock.naver.com, dart.fss.or.kr, krx.co.kr, sec.gov, hankyung.com, mk.co.kr, sedaily.com, edaily.co.kr, mt.co.kr, biz.chosun.com, yna.co.kr, newsis.com, news1.kr, fnnews.com, asiae.co.kr, businesspost.co.kr, thebell.co.kr, heraldcorp.com, newspim.com, zdnet.co.kr, bizwatch.co.kr, reuters.com, bloomberg.com, wsj.com, ft.com, cnbc.com, marketwatch.com, barrons.com, 증권사 리서치(kbthink·kiwoom·miraeasset·samsungpop·nhqv·truefriend·shinhansec·hanaw). 블로그·카페·커뮤니티·유튜브·위키 금지. (stock.pstatic.net 리서치 PDF·stockhub·alphasquare 등은 참고만 — 신뢰 도메인으로 세지 않는다.)

## 할 일
1. **후보 검증 3~4종목**: 스크린 상위 후보 중 주제 정의에 맞아 보이는 것부터, 그 그룹 보류 후보 중 아직 유효한 것 최대 1개 포함. 숫자가 왜곡된 경우(지주사 지분법 이익·합병/인수 효과·일회성 평가이익)는 이유를 적고 건너뛴다. 종목마다:
   - 최근 분기·연간 실적(매출·영업이익 YoY — 역성장·이익 감소면 감점), 컨센서스 목표가(**서로 다른 신뢰 도메인 2곳**, 두 값이 5% 넘게 다르면 세 번째로 판별), 배당수익률, 주제 적합성, 지배구조·주요 리스크.
   - 주제별 함정: **배당**은 배당이 호황 이익에 연동된 업종(증권·원자재)이나 경기민감 은행이면 '하방 경직성'을 못 채운다 · **저평가**는 정점 이익의 낮은 PER(가치 함정)을 걸러내고 '실적 저점 통과'를 확인한다 · **우량**은 이익 변동이 큰 사이클 업종을 피한다 · **히든**은 대형·다수 커버리지 종목이 정의('아직 주목을 덜 받은')에 약하다.
   - 미국 히든(rising)은 §6 품질 기준: 최근 4분기 합산 영업이익 흑자(GAAP/조정 명시)·매출 YoY 성장·60일 변동성 70% 이하. 변동성은 검색으로 잴 수 없으니 '미확인'으로 두면 메인이 `scripts/vol-beta.js` 로 잰다.
2. **현 편성 결격 점검 — 하위 3종목 이상**(스크린 점수 낮은 순·`passesRule:false`·`targetExhausted:true`·약한 신호 우선, 시간이 되면 '결격 감시'에 적힌 종목도): 아래 결격에 해당하는지 **증거와 함께** 판정한다. 없으면 '결격 없음'과 근거.
   - 결격 = 목표가 소진(현재가 ≥ 컨센서스 목표가) · 논거 훼손 · 가이던스 하향/역성장 전환(최근 분기 매출·영업이익 YoY 감소 지속) · 지배구조 결격 · 주제 이탈 · (미국 히든) 품질 기준 미달.
3. **교체 제안**: 후보가 검증을 모두 통과했고(주제 부합·컨센서스 2출처·실적 성장·리스크 감당 가능) **편출 대상에 결격이 있을 때만** 제안한다. '후보가 더 좋아 보인다'만으로는 제안하지 않는다(결격 없는 우월 후보는 `hold` 로 남기고 `pendingNext` 에 기록 — 무엇이 확인되면 채택 가능한지 구체적으로).
   - β 고려: {BETA_NOTE} 밴드 0.7~1.3 에서 β 를 1 쪽으로 되돌리는 후보를 우선하고, 1 에서 더 멀어지게 하는 교체는 피한다(배당 주제의 낮은 β 는 정체성이라 예외).
4. 채택(adopt) 후보는 메인이 바로 카드로 만들 수 있게 **카드 필드**도 준다: `thesis`(한국어 2~3문장, 사업·성장 근거·검증 수치), `risks`(한국어 2~4개), `earnings`(한국어 1~2문장, 최근 분기 수치), `dividendYield`(%, 숫자), `sources`(2~3개, 서로 다른 신뢰 도메인 2곳 이상). **작업 경위('검색으로 확인 못 함' 등)는 카드 문장에 쓰지 말 것** — 앱 화면에 그대로 보인다.
5. 편성 카드에서 틀린 수치·낡은 서술(배당수익률·분배금·처리 메모 등)을 발견하면 `notes` 에 근거 URL 과 함께 적는다(메인이 신뢰 출처 2곳 기준으로 정정).

## 반환 형식 — 마지막에 아래 JSON 하나만(```json 코드블록)
```json
{
  "group": "{GROUP}",
  "searchesUsed": 0,
  "candidates": [
    {"ticker": "", "name": "", "verdict": "adopt|hold|reject",
     "reason": "한국어 1~2문장",
     "facts": {"latestQuarter": "예: 2Q26 매출 X(+Y% YoY)·영업이익 Z(+W%)", "consensusTarget": null, "consensusSources": [], "dividendYield": null, "governance": ""},
     "card": {"thesis": "", "risks": [], "earnings": "", "dividendYield": null, "sources": []}}
  ],
  "incumbentChecks": [
    {"ticker": "", "name": "", "defect": false, "defectType": null, "evidence": "한국어", "sources": []}
  ],
  "proposedSwaps": [ {"add": "", "remove": "", "why": "한국어", "betaNote": ""} ],
  "pendingNext": [ {"ticker": "", "name": "", "blocker": "무엇이 확인되면 채택 가능한지"} ],
  "notes": ""
}
```
`card` 는 verdict 가 adopt 일 때만 채운다. 근거 URL 은 실제로 본 검색 결과의 URL 만.
