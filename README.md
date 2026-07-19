# 📈 주식 분석 · 종목 추천 페이지

`stock-recommender` · `macro-liquidity-monitor` 스킬(claude.ai)의 분석 결과를 웹페이지로 보여주는 저장소입니다.

- **`index.html`** — 대시보드 (거시 유동성 게이지 + 한국/미국 탭, Tier 1·2·3 필터, 목표가·상승여력·배당·리스크·네이버 차트 링크)
- **`data/recommendations.js`** — 종목 **분석** 데이터 (`stock-recommender` 스킬 결과, thesis·리스크·목표가 등). 시세는 빠짐.
- **`data/quotes.js`** — **시세 스냅샷** (`scripts/update-quotes.js` 가 자동 생성, LLM 토큰 0). 분석과 분리되어 매일 저비용 갱신.
- **`data/liquidity.js`** — 거시 유동성 데이터 (`macro-liquidity-monitor` 스킬 결과, 없으면 게이지 섹션 자동 숨김)

### 💡 토큰 절약 구조 (시세 분리 + 증분 갱신)

시세와 분석을 분리해, 비싼 LLM 리서치는 정말 필요할 때만 돌린다.

| 갱신 대상 | 방법 | 주기 | LLM 토큰 |
|---|---|---|---|
| **시세** (`data/quotes.js`) | `scripts/update-quotes.js` (Yahoo 조회) — 자동화: `.github/workflows/refresh-quotes.yml` | 매일 | **0** |
| **분석** (`data/recommendations.js`) | `scripts/update-reco.js` 로 **바뀐 종목만** 패치 | 필요 시 | 변경분만 |

- 페이지 가격 우선순위: **실시간 API(`data/config.js`) > `data/quotes.js` 스냅샷 > `recommendations.js` 종가(폴백)**.
- 예전처럼 매일 90종목을 통째로 재리서치할 필요가 없다.

### 🛡️ 재평가 신뢰도 가드레일

매일 자동 재평가(LLM Routine)는 사람이 지켜보지 않으므로, "그럴듯하지만 틀린" 변경이
조용히 배포되는 것을 **코드 레벨에서 차단**한다. 3중 방어선:

| 방어선 | 무엇을 | 어떻게 |
|---|---|---|
| **1. 패치 가드레일** (`update-reco.js`) | 위험한 변경 자체를 거부 | 일일 최대 10교체(add+remove ≤ 20), 목표가 ±50% 급변 차단·±25% 경고(단일 증권사 최고치 오인 방지), 목표가·논거 변경 시 근거 URL 필수. 위반 시 저장 취소(우회는 `--force` 명시로만) |
| **2. 데이터 검증기** (`validate-reco.js`) | 결과 무결성 보장 | (주제×국가) 9종목·Tier 3×3 구조, 티커/시장 형식, 한국어 강제, upside=계산값 일치, 출처 1~3개. `update-reco.js` 저장 직전 + CI 커밋·배포 전 이중 실행 — 깨진 데이터는 커밋·배포 자체가 불가능 |
| **3. 성과 측정** (`performance-report.js`) | 추천 능력을 사후 검증 | `history.js` 스냅샷 기반 수익률 vs KOSPI/S&P500 벤치마크, 티어별 순위(Tier1>3 확인), 목표가 소진·-15% 하락 종목 자동 스크리닝 → 루틴이 판단 전 실행해 재평가 우선순위를 데이터로 받음 |

재평가 판단 규칙(체크리스트)은 `data/recommendations.js` 파일 상단 주석에 있어,
매일 루틴이 데이터를 읽는 순간 함께 읽힌다: **컨센서스만 사용(단일 증권사 금지)·출처
발행일 확인·2개 이상 교차 확인·확신 없으면 변경 0건.**

```
node scripts/validate-reco.js          # 데이터 검증 (오류 시 exit 1)
node scripts/performance-report.js     # 성과 리포트 (--json 으로 기계용 출력)
```

## 페이지 보는 법

### GitHub Pages 자동 배포 (권장)
`.github/workflows/deploy-pages.yml` 워크플로우가 이 브랜치에 푸시될 때마다
(주간 자동 갱신 포함) 자동으로 GitHub Pages에 배포합니다.
배포되면 `https://<계정>.github.io/stock/` 에서 볼 수 있습니다.

> **최초 1회 설정** — 저장소 **Settings → Pages → Build and deployment → Source**
> 를 **`GitHub Actions`** 로 지정하세요. 그 뒤부터는 푸시할 때마다 자동 배포됩니다.
> (배포 브랜치가 기본 브랜치가 아니어서 `github-pages` 환경의 배포 브랜치 정책에
> 막히면, Settings → Environments → github-pages 에서 이 브랜치를 허용해 주세요.)

### 로컬
`index.html` 을 브라우저로 열면 됩니다 (서버 불필요).

## 스킬 ↔ 페이지 연결 구조

claude.ai 스킬은 웹페이지가 직접 실행할 수 없으므로, **스킬이 만든 분석 결과를
`data/recommendations.js` 에 저장**하고 페이지가 그것을 렌더링하는 구조입니다.

```
[stock-recommender 스킬 실행]  →  data/recommendations.js 갱신  →  git push  →  페이지 자동 반영
```

### 1) 시세 갱신 (매일 · LLM 토큰 0)

시세는 분석과 분리되어 있으므로 LLM 없이 스크립트로 갱신한다.

```
node scripts/update-quotes.js            # Yahoo 조회 → data/quotes.js 갱신
node scripts/update-quotes.js --seed     # (네트워크 없이) recommendations.js 종가로 seed
```

`.github/workflows/refresh-quotes.yml` 이 평일 자동으로 이 스크립트를 돌려 `data/quotes.js`
만 커밋한다. (조회 실패 종목은 기존 시세 → 종가 순으로 폴백해 항상 전체가 채워진다.)

### 2) 분석 갱신 (필요 시 · 바뀐 종목만 = 증분)

thesis·목표가·리스크 등 **분석**이 실제로 바뀔 때만, 전체가 아니라 **변경분만** 패치한다.

Claude Code 세션에서 이렇게 요청하세요:

> stock-recommender 스킬 기준으로 **바뀐 종목만** 골라서, 아래 형식의 패치 JSON 을 만들고
> `node scripts/update-reco.js <패치파일>` 로 적용한 뒤 커밋·푸시해줘.

패치 JSON 형식 (모든 항목 선택):

```json
{
  "generatedAt": "2026-07-11",
  "marketNote": "…",
  "stocks": [
    { "country": "korea", "ticker": "005930", "targetPrice": 460000, "thesis": "…" }
  ],
  "add":    [ { "country": "us", "theme": "growth", "tier": 2, "name": "…", "ticker": "…" } ],
  "remove": [ { "country": "korea", "ticker": "000810" } ]
}
```

- `stocks` 는 (국가+티커[+주제])로 찾아 **넣은 필드만** merge 한다. 시세는 넣지 않는다(quotes.js 담당).
- 전체 파일을 통째로 다시 쓰지 않으므로 LLM 출력 토큰이 크게 줄어든다.
- 미리보기: `node scripts/update-reco.js <패치> --out /tmp/preview.js` (원본을 건드리지 않음).

> 전체를 새로 만들어야 하는 큰 개편이 아니라면, 매번 `recommendations.js` 를 통째로
> 재생성하도록 요청하지 마세요 — 그게 토큰을 가장 많이 씁니다.

## 데이터 형식

`data/recommendations.js` 는 `window.STOCK_DATA` 전역 객체 하나를 정의합니다.
구조는 **주제(theme) 4개 × 국가 2개 × 각 9종목 = 72종목**이며, 각 (주제×국가) 9종목은
**확신·우선순위**에 따라 Tier 1(최우선)·2(차선)·3(관심)으로 3종목씩 나뉩니다.

```js
window.STOCK_DATA = {
  generatedAt: "2026-07-03",        // 분석 기준일
  marketNote: "...",                // 시장 코멘트 한 줄
  disclaimer: "...",                // 투자 유의 문구
  themes: [                         // 4개 주제 정의
    { key: "core",     label: "핵심·안정",   emoji: "🛡️", desc: "..." },
    { key: "growth",   label: "성장·균형",   emoji: "🚀", desc: "..." },
    { key: "value",    label: "저평가·기회", emoji: "💎", desc: "..." },
    { key: "dividend", label: "고배당·하방", emoji: "💰", desc: "..." }
  ],
  korea: [ /* 종목 카드 36개 (주제별 9개) */ ],
  us:    [ /* 종목 카드 36개 (주제별 9개) */ ]
};
```

종목 카드 필드:

| 필드 | 설명 |
|---|---|
| `theme` | 주제 키 (`core` / `growth` / `value` / `dividend`) |
| `tier` | 주제 안 확신·우선순위 등급 — 1 최우선 / 2 차선 / 3 관심 (각 주제당 3종목씩) |
| `name` / `ticker` / `market` | 종목명 / 코드 / 거래소 |
| `price` / `priceDate` | 현재가와 기준일 (한국: 원, 미국: USD) |
| `targetPrice` / `upside` | 컨센서스 목표가 / 상승여력 % |
| `dividendYield` | 배당수익률 % |
| `earnings` | 최근 실적 한 줄 요약 |
| `thesis` | 투자 논거 (중장기 안정·재무 건전성·주주친화·성장·저평가 관점) |
| `risks` | 리스크 배열 |
| `chartUrl` | 네이버 차트 링크 |
| `sources` | 근거 출처 URL (최대 3개) |

> 주제와 국가 모두에 잘 맞는 대형주(예: 삼성바이오로직스, TSMC 등)는 두 주제에 함께 등장할 수 있으며,
> 이때 가격·목표가 등 수치는 동일하게 맞추고 주제별 논거만 다르게 서술합니다.

`data/liquidity.js` 는 `window.LIQUIDITY_DATA` 를 정의합니다:

```js
window.LIQUIDITY_DATA = {
  asOf: "2026-07-03",
  headline: "미국·한국 종합 한 줄 결론",
  us:    { shortTerm: "우호", midTerm: "신중", drivers: ["근거…"] },
  korea: { shortTerm: "신중", midTerm: "신중", drivers: ["근거…"] },
  nextCheck: "다음 체크 이벤트",
  sources: ["url…"]
};
```

게이지 단계는 `"매우 우호" / "우호" / "신중" / "부정" / "매우 부정"` 다섯 중 하나입니다.

## 자동 갱신

이 저장소에는 Claude Code Remote **트리거**가 걸려 있어 **매일 미국 LA 오전 6시경**
새 세션이 자동으로 최신 주가·컨센서스·유동성을 다시 조사해 `data/*.js` 를 갱신하고
푸시합니다. 푸시되면 위의 배포 워크플로우가 이어서 실행돼 사이트까지 자동 갱신됩니다.
트리거 관리(주기 변경·중지)는 Claude Code 세션에서 요청하면 됩니다.

> ⏰ cron은 UTC로 동작하므로 서머타임(3~11월, PDT)에는 오전 6시, 표준시(11~3월, PST)에는
> 오전 5시에 실행됩니다. 표준시에도 정확히 6시를 원하면 세션에서 조정을 요청하세요.

## 성과 추적 (추천 능력 검증)

페이지의 **📊 성과** 뷰는 "추천이 실제로 좋았는지"를 데이터로 검증합니다.

- **`data/history.js`** — 매일 자동 갱신 때마다 `scripts/snapshot.js` 가 전 종목의
  가격·목표가·티어와 **KOSPI·S&P 500 종가**를 스냅샷으로 축적합니다 (추가만, 수정·삭제 없음).
- 성과 뷰가 보여주는 것:
  - 종목별 **첫 추천일 대비 수익률** (기록 시작: 2026-07-03)
  - **승률** (수익 종목 비율)
  - **시장 대비 초과수익** — 같은 기간 KOSPI/S&P 500 수익률을 뺀 값
  - **Tier 1 vs 2 vs 3 평균 수익률** — 확신 등급(티어 배정)이 실제로 유효한지 검증
- 수동 스냅샷: `node scripts/snapshot.js --kospi <종가> --sp500 <종가>`

## 실시간 시세 백엔드 (선택 — Cloudflare Worker)

페이지를 열 때 **현재가를 실시간으로** 보여주는 기능입니다. 브라우저에서 Yahoo 를 직접 부르면
CORS 로 막히므로, **본인 전용 Cloudflare Worker**(무료)를 프록시로 두어 안정적으로 받아옵니다.

구조: `페이지 → 내 Worker → Yahoo Finance` (Worker가 CORS 헤더를 붙여 돌려줌)

### 배포 (한 번만)

1. **Worker 만들기** — [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** →
   **Create application** → **Create Worker** → 이름 예: `stock-quotes` → **Deploy**.
2. **코드 넣기** — 방금 만든 Worker의 **Edit code** 에서 기본 코드를 지우고
   `worker/quotes-worker.js` 내용을 **전부 붙여넣기** → **Deploy**.
   - (또는 CLI: `npm i -g wrangler` 후 `wrangler deploy worker/quotes-worker.js --name stock-quotes`)
3. **주소 확인** — 배포되면 `https://stock-quotes.<계정>.workers.dev` 같은 주소가 나옵니다.
   브라우저로 `…workers.dev/?symbols=005930.KS,AAPL` 를 열어 JSON 이 나오면 정상.
4. **페이지에 연결** — `data/config.js` 의 `quotesApi` 에 그 주소를 넣고 커밋·푸시:
   ```js
   window.APP_CONFIG = { quotesApi: "https://stock-quotes.<계정>.workers.dev" };
   ```
5. 배포 후 페이지를 새로고침하면 카드·표의 현재가 옆에 **🟢 실시간** 이 뜹니다.

### 동작·비용

- **배치 조회**: 보이는 종목(≈9개)을 한 번의 요청으로 가져오고, 60초 엣지 캐시로 야후 부하를 줄입니다.
- **무료 티어**: Cloudflare Worker 무료 한도는 하루 10만 요청 — 개인 사용엔 넉넉합니다.
- **폴백**: `quotesApi` 가 비어 있거나 조회가 실패하면 조용히 **매일 갱신된 종가(스냅샷)** 를 표시합니다.
- 티커 매핑은 페이지가 자동 처리합니다(한국 `코드.KS`, 미국 심볼 그대로, `BRK.B`→`BRK-B`).

### 기술분석용 과거 시계열 (같은 백엔드가 함께 제공)

카드·표의 **기술분석(매수/매도 신호)** 은 RSI14·이동평균(MA20/MA200)·골든/데드 크로스를 쓰는데,
이는 **신뢰할 만한 기간의 일봉 종가**가 있어야 정확합니다. 특히 **200일선(장기 국면 필터)** 과
**정통 골든/데드 크로스(50일선↔200일선)** 는 200일 이상이 필요합니다. 누적 스냅샷(`history.js`)만으로는
기간이 짧아, 같은 시세 백엔드에 **과거 시계열 모드**를 두어 **2년치 일봉**을 받아옵니다.

- **엔드포인트**: `GET …/?symbols=005930.KS,AAPL&history=1&range=2y`
  → 응답 `{"AAPL":{"closes":[…오래된→최신…],"dates":[…]}}` (서버가 Yahoo 를 서버-사이드로 조회해 CORS 로 반환)
  → `range` 허용값: `1mo·3mo·6mo·1y·2y` (기본·앱 사용값은 `2y`)
- **앱 동작**: 페이지가 보이는 종목의 2년 종가를 받아 기술분석에 사용합니다. 200일선 국면 필터와
  정통 50/200 골든크로스가 활성화되고, 카드 지표 끝에 **`480일 실측`**(실측 시계열) 또는
  **`14일 누적`**(폴백)으로 데이터 출처·길이를 표시합니다. 데이터가 짧으면 같은 비율로 축소해
  동작하고(예: 22일→5/20 크로스), 60거래일 미만이면 200일선 국면 판단은 생략합니다.
- **폴백**: 백엔드가 `history` 를 지원하지 않거나(구버전) 실패하면 조용히 **누적 스냅샷**으로 계산합니다.
  → 이 기능을 켜려면 위 배포 단계로 **최신 `worker/quotes-worker.js`(또는 `worker/valtown-quotes.ts`)를 재배포**하면 됩니다. 앱 코드 변경은 필요 없습니다.
- **캐시**: 과거 시계열은 하루 단위로만 바뀌므로 엣지에서 30분 캐시합니다.

## 데이터 정확성

데이터의 정확성이 최우선입니다. 자동 갱신 작업에는 다음 정확성 규칙이 포함돼 있습니다.

- 종목별로 **가장 최근 날짜의 종가**를 취하고 카드에 **기준일(priceDate)** 을 정직하게 표기 (오늘 날짜로 억지로 맞추지 않음)
- 각 가격을 **최소 2개 독립 출처로 교차확인**, 5% 이상 차이 나면 재검색해 판별
- 기억/직전 값 대비 배수로 어긋나면 **액면분할 여부 확인**
- 확인 못 한 값은 추측하지 않고 기존 값·기준일 유지 (커밋 메시지에 명시)

### 출처 신뢰도 정책 (WebSearch 결과의 품질을 코드로 강제)

검색 기반 재평가의 약점(부정확한 웹 문서 인용)을 **프롬프트 지침이 아니라 코드
가드레일**로 막습니다. 도메인 등급은 `scripts/validate-reco.js` 상단에 정의되어 있습니다.

| 등급 | 도메인 | 강제 방식 |
|---|---|---|
| **신뢰(TRUSTED)** | 컨센서스 집계(FnGuide·WiseReport·TipRanks·MarketBeat·Investing 등), 공시(DART·KRX·SEC), 주요 경제언론(한경·매경·연합·로이터·블룸버그 등), 증권사 리서치 | 분석 변경(`targetPrice`/`thesis`/`earnings`)·신규 편입엔 **신뢰 출처 ≥2개 필수**(교차확인의 양쪽 모두 신뢰 출처) — 미달이면 `update-reco.js` 가 저장 거부 |
| **미상** | 목록 밖 도메인 | 보조 출처로 허용. 단 신뢰 출처 0개인 종목은 검증기가 경고 → **재평가 우선 대상**으로 표시 |
| **차단(BLOCKED)** | 커뮤니티·개인 블로그·SNS·유튜브·위키(thinkpool, blog.naver, tistory, dcinside, fmkorea, youtube, reddit, namu.wiki 등) | 새 패치에서 **`--force` 로도 불가** — 즉시 거부. 기존 데이터에 남은 것은 경고로 표시해 교체 유도 |

추가 규칙(체크리스트로 매 실행 시 루틴에 주입 — `data/recommendations.js` 상단):
수치는 스니펫에 실제로 적힌 것만 사용(기억·추론 금지), 두 출처가 5% 이상 다르면 세 번째
출처로 판별해 다수/중앙값 채택, 신뢰 출처 우선 확보엔 `site:comp.fnguide.com 종목명` 식
도메인 한정 검색 활용.

### 실행 환경의 제약 — 자동 재평가는 **검색(WebSearch) 기반**

이 실행 환경(샌드박스)의 **네트워크 정책**상 Yahoo·금융 사이트/API 는 물론 대부분의 외부
뉴스 사이트로의 **직접 접근(WebFetch·직접 API 호출)이 403 으로 차단**됩니다(`Full` 로 열어도
막힘). 과거 Yahoo API 직접 호출 방식(`update_prices.js`)을 넣었다가 바로 이 차단 때문에
롤백한 이력이 있습니다. 따라서 **자동 재평가 Routine 은 오직 `WebSearch` 로만** 외부
정보(목표가 컨센서스·실적·뉴스·유동성)를 확보합니다 — WebSearch 는 Anthropic 을 경유하므로
차단 대상이 아니고, 스니펫에 컨센서스·수치·출처가 함께 담겨 옵니다.

- **403 을 만나도 멈추지 않는다:** 외부 URL 을 WebFetch 하려다 403 이 나면 실패로 간주해
  중단하지 말고, 그 정보를 `WebSearch` 로 대체해 끝까지 진행합니다.
- **시세(현재가)는 이미 정확합니다.** `refresh-quotes` GitHub Action 이 Yahoo 에서 직접
  받아 `data/quotes.js` 로 매일 기록합니다 — GitHub 러너는 이 정책의 적용 대상이 아니라
  차단되지 않습니다. (그래서 시세만은 검색이 아닌 실제 API 값입니다.)
- 이 403 은 **GitHub 권한과 무관**합니다 — push·clone·Actions 는 별도 전용 프록시로
  나가므로 정책과 상관없이 항상 동작합니다.

## 투자 유의

본 페이지의 내용은 정보 제공 목적이며 투자 권유가 아닙니다.
모든 투자 판단과 책임은 투자자 본인에게 있습니다.
