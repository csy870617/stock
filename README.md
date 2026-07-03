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

## 투자 유의

본 페이지의 내용은 정보 제공 목적이며 투자 권유가 아닙니다.
모든 투자 판단과 책임은 투자자 본인에게 있습니다.
