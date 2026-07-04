# 📈 주식 분석 · 종목 추천 페이지

`stock-recommender` · `macro-liquidity-monitor` 스킬(claude.ai)의 분석 결과를 웹페이지로 보여주는 저장소입니다.

- **`index.html`** — 대시보드 (거시 유동성 게이지 + 한국/미국 탭, Tier 1·2·3 필터, 목표가·상승여력·배당·리스크·네이버 차트 링크)
- **`data/recommendations.js`** — 종목 추천 데이터 (`stock-recommender` 스킬 결과)
- **`data/liquidity.js`** — 거시 유동성 데이터 (`macro-liquidity-monitor` 스킬 결과, 없으면 게이지 섹션 자동 숨김)

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

### 데이터 갱신 방법

Claude Code 세션(웹/앱 어디서든)에서 이렇게 요청하세요:

> stock-recommender 스킬 기준으로 오늘 날짜 최신 주가·컨센서스를 다시 조사해서
> `data/recommendations.js` 를 갱신하고 커밋·푸시해줘.

또는 claude.ai 채팅에서 스킬로 추천을 받은 뒤, 그 결과를 이 저장소의
`data/recommendations.js` 형식으로 저장해달라고 요청해도 됩니다.

정기 갱신을 원하면 Claude Code 세션에 예약 작업(Routine)을 걸어
매주/매일 자동으로 데이터를 갱신하도록 설정할 수도 있습니다.

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

## 데이터 정확성

데이터의 정확성이 최우선입니다. 자동 갱신 작업에는 다음 정확성 규칙이 포함돼 있습니다.

- 종목별로 **가장 최근 날짜의 종가**를 취하고 카드에 **기준일(priceDate)** 을 정직하게 표기 (오늘 날짜로 억지로 맞추지 않음)
- 각 가격을 **최소 2개 독립 출처로 교차확인**, 5% 이상 차이 나면 재검색해 판별
- 기억/직전 값 대비 배수로 어긋나면 **액면분할 여부 확인**
- 확인 못 한 값은 추측하지 않고 기존 값·기준일 유지 (커밋 메시지에 명시)

### 실행 환경의 제약과 개선 방법

이 환경의 **네트워크 정책**상 Yahoo·Google Finance·KRX 등 금융 사이트/ API에 대한 직접 접근이
차단되어, 현재 시세는 **검색(WebSearch) 결과**를 통해 확보합니다. 이 때문에 실시간이 아닌
**직전 거래일 종가** 수준의 정확도이며, 특히 국내 사이트 접근 제한으로 일부 한국 종목은
기준일이 며칠 전일 수 있습니다.

**더 높은(실시간) 정확도가 필요하면** 환경의 네트워크 정책을 넓혀
금융 데이터 API 호스트(예: `query1.finance.yahoo.com`)를 허용하면 됩니다. 그러면 자동 갱신이
검색 대신 API에서 정확한 시세를 직접 받아오도록 개선할 수 있습니다. 네트워크 정책 설정은
[Claude Code on the web 문서](https://code.claude.com/docs/en/claude-code-on-the-web)를 참고하세요.

## 투자 유의

본 페이지의 내용은 정보 제공 목적이며 투자 권유가 아닙니다.
모든 투자 판단과 책임은 투자자 본인에게 있습니다.
