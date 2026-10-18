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
   - 주제별 함정(CLAUDE.md §6 '주제 기준' — 2026-10-17 1·2차 검증. 스크린 묶음의 `fx`: `iss` 주식 수 증가율%, `buyy` 순자사주 매입 수익률%, `shy` 주주환원수익률%, `roic`·`roic3`(3년 평균), `gpa` 매출총이익/자산%, `sg3` 3년 매출 연평균%, `fcfm` FCF 마진%, `netcash` 순현금/자산%, `sopm` 영업이익률 변동, `sroa` 이익 변동, `fcfni` FCF/순이익, `ebitev`·`fcfp` 기업가치·시총 대비 수익률%, `streak` 배당 비감소 연수, `ag` 자산 증가율, `sg1` 매출 증가율 — 편성 종목의 `fails` 는 새 필터·정체성 조건 미달)
     - **우량·성장·저평가는 배당을 요구하지 않는다**(2026-10-17 사용자 결정) — 배당을 안 주는 회사도 같은 잣대로 본다. 주주환원은 자사주 소각·희석 없음으로 본다.
     - **배당**
       - 배당이 호황 이익에 연동된 업종(증권·원자재)이나 경기민감 은행이면 '하방 경직성'을 못 채운다.
       - 배당수익률이 가장 높은 후보를 우대하지 말 것. 최상위 3분위는 다음 해 삭감 확률이 5배였다.
       - 배당을 줄인 적이 없는 연수와 이익 안정성을 확인한다.
     - **저평가**
       - 정점 이익의 낮은 PER(가치 함정)을 걸러내고 '실적 저점 통과'를 확인한다. PER 이 가장 낮은 3분위는 다음 해 이익이 20% 넘게 줄거나 적자가 될 확률이 50%였다(가장 높은 쪽 19%) — 이익 대비가 아니라 기업가치(EBIT/EV)·현금(FCF/시총) 대비 싼지, 이익이 안정적인지(영업이익률·ROA 변동), 이익이 현금으로 들어오는지(FCF/순이익)를 본다.
       - 매출 역성장·희석(유상증자·CB)·자산 급증(대형 인수)은 검증된 결격 신호다.
     - **성장**: 매출 성장률이 가장 높은 후보를 우대하지 말 것. 성장주 안에서 가장 빨리 크는 쪽은 이후 수익이 낮았다. 성장이 **이어질** 회사를 고른다 — 3년 연속 성장, 높은 매출총이익/자산·FCF 마진, 순현금, 연구개발 투자가 다음 해 성장을 가장 잘 가렸다(미국 14년). 이익이 이미 나는지, 자산을 인수로 급히 불리지 않는지, 주식 수를 늘리지 않는지를 본다. 배당·자사주를 많이 하는 성장주는 다음 해 성장이 오히려 느렸다.
     - **우량**: 높은 자본 효율이 **유지되는** 회사 — 3년 평균 ROIC·매출총이익/자산이 높고(다음 해 ROIC 를 가장 잘 가렸다), 자사주 소각·희석 없음. 이익 변동이 큰 사이클 업종을 피한다. 배당 여부는 보지 않는다.
     - **히든**은 숫자 조건(시총·성장·ROIC·PEG·순현금·FCF)을 스크린이 이미 걸렀으니 숫자로 못 잡는 것을 본다 — 성장 활주로(시장 규모·침투율), 해자(전환비용·네트워크·원가우위), 경영진의 희석 이력(유상증자·CB·주식보상 — 창업자·내부자 지분은 가점), 집중 리스크(단일 고객 매출 비중·단일 제품·규제 한 번).
   - 히든(rising)은 CLAUDE.md §6 히든 기준('10배 가능성 + 영구 손실 위험 낮음'): 묶음 후보의 `fails`(근접 후보가 못 미친 조건)·`roicAvg`·`peg`·`netCash`·`owner`(한국 최대주주등 지분 %)·`dilution` 을 읽고, ⑦해자 ⑧희석 자제(주식 수 연 3% 이하·유상증자·CB·과도한 주식보상 없음 — 2026-10-18 완화로 창업자 경영·내부자 지분은 필수가 아니라 가점) ⑨집중 리스크 없음과 성장 활주로를 증거로 판정한다. 변동성 상한은 없다.
2. **현 편성 결격 점검 — 하위 3종목 이상**(스크린 점수 낮은 순·`passesRule:false`·`targetExhausted:true`·약한 신호 우선, 시간이 되면 '결격 감시'에 적힌 종목도): 아래 결격에 해당하는지 **증거와 함께** 판정한다. 없으면 '결격 없음'과 근거.
   - 결격 = 목표가 소진(현재가 ≥ 컨센서스 목표가) · 논거 훼손 · 가이던스 하향/역성장 전환(최근 분기 매출·영업이익 YoY 감소 지속) · 지배구조 결격 · 주제 이탈(히든은 §6 히든 기준 미달 — 스크린 `passesRule:false` 와 `fails`) · **추세 붕괴**(묶음 `signals` 단·중·장기가 모두 매도 이하 — 사용자 결정, 증거 수집 없이 성립).
   - 후보도 추세 붕괴면 채택하지 않는다(스크린이 월봉으로 이미 거르지만, 묶음에 신호가 있으면 다시 본다).
3. **교체 제안**: 후보가 검증을 모두 통과했고(주제 부합·컨센서스 2출처·실적 성장·리스크 감당 가능) **편출 대상에 결격이 있을 때만** 제안한다. '후보가 더 좋아 보인다'만으로는 제안하지 않는다(결격 없는 우월 후보는 `hold` 로 남기고 `pendingNext` 에 기록 — 무엇이 확인되면 채택 가능한지 구체적으로).
   - β 고려: {BETA_NOTE} 밴드 0.7~1.3 에서 β 를 1 쪽으로 되돌리는 후보를 우선하고, 1 에서 더 멀어지게 하는 교체는 피한다(배당 주제의 낮은 β 는 정체성이라 예외).
4. 채택(adopt) 후보는 메인이 바로 카드로 만들 수 있게 **카드 필드**도 준다: `thesis`(한국어 2~3문장, 사업·성장 근거·검증 수치), `risks`(한국어 2~4개), `earnings`(한국어 1~2문장, 최근 분기 수치), `dividendYield`(%, 숫자), `sources`(2~3개, 서로 다른 신뢰 도메인 2곳 이상). **작업 경위('검색으로 확인 못 함' 등)는 카드 문장에 쓰지 말 것** — 앱 화면에 그대로 보인다. **카드 문장에 가격 의존 수치(상승여력 %·목표가/목표주가 금액·PER/PBR 배수·배당수익률 %)도 쓰지 말 것** — 카드 숫자 칸이 매일 자동으로 보여주고 문장 속 수치는 다음 날부터 어긋난다(`update-reco.js` 가 거부, CLAUDE.md §4 공통). 매출·이익 증가율·배당성향 같은 회사 고유 수치는 괜찮다. 목표가 숫자는 JSON 의 검증 필드(`facts.consensusTarget`)에만 적는다.
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
