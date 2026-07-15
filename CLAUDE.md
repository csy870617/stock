# CLAUDE.md — 주식 추천 대시보드 운영 지침

이 저장소는 정적 대시보드(GitHub Pages)다. Claude 세션은 아래 규칙을 반드시 따른다.

## 운영 모델
- **시세·스냅샷·배포**: `refresh-quotes` GitHub Action이 매일 자동 처리(순수 스크립트, LLM 0). `data/quotes.js`·`data/history.js`·`price`·`priceDate`·`upside`·`generatedAt`은 이 Action이 담당 — **직접 조사·수정하지 않는다.**
- **분석·추천(`data/recommendations.js`)·유동성(`data/liquidity.js`)**: **온디맨드**. 사용자가 "업데이트/분석 갱신/유동성 갱신"을 요청할 때만 갱신한다.
- **기본(=배포) 브랜치**: `claude/stock-analysis-recommendation-v9310x` (여기 push하면 `deploy-pages`가 자동 배포). 개발 브랜치 `claude/github-push-proxy-auth-6keb1y` 에도 함께 반영한다.

## ★ "업데이트" 요청 처리 프로토콜 (반드시 지킬 것)
사용자가 업데이트를 요청하면 — **버튼(이슈)을 눌렀든 안 눌렀든** — 앱 상단 상태칩이 진행을 표시하도록 **항상 GitHub 이슈로 추적**한다:

1. **이슈 확보**: title에 `업데이트 요청` 이 든 **열린 이슈**를 찾는다(`mcp__github__list_issues`). 있으면 재사용, 없으면 새로 만든다(title: `전체 업데이트 요청 (분석·추천 + 유동성)`).
2. **착수 표시**: 그 이슈에 `🔧 처리 시작` 코멘트를 단다 → 상태칩이 **🔧 처리중**으로 바뀐다.
3. **작업 수행**(아래 내용).
4. **완료 표시**: 결과 요약 코멘트 + 이슈 **닫기**(state=closed) → 상태칩이 **🟢 완료**로 바뀐다.

> 앱 상태칩(`index.html`의 `#updStatus`)은 title에 `업데이트 요청`이 든 **최신 이슈**를 GitHub 공개 API로 읽어 **🟡(열림·코멘트0) → 🔧(열림·코멘트≥1) → 🟢(닫힘)** 로 표시한다. 위 순서를 지켜야 색이 올바르게 흐른다.

## 업데이트 작업 내용
- **공통**: WebSearch만 사용(WebFetch·금융 API 직접 호출은 이 환경에서 403). 수치는 검색 스니펫에 실제로 적힌 값만 쓰고, 확인 못 한 값은 기존값 유지. 완료 후 `node scripts/validate-reco.js` 통과 확인 → 배포 브랜치 커밋·push(경합 시 `git rebase` 후 재푸시).
- **A. 분석·추천 (`data/recommendations.js`)**: `generatedAt`·`marketNote`(오늘 시황) 갱신 → `node scripts/snapshot.js` 기록. `node scripts/performance-report.js`(목표가 소진·성과 부진)·`validate-reco.js`(신뢰 출처 부족·재추가 금지)로 우선순위 선별. 목표가는 컨센서스(신뢰 출처 2개 이상 교차확인), 논거·리스크·tier·dividendYield·earnings 최신화. 지배구조 스크리닝·`BANNED_TICKERS` 준수. (주제×국가) 9종목·tier 3/3/3 유지. `node scripts/update-reco.js <패치.json>` 증분 패치로 적용. **시세(price·priceDate·upside)는 건드리지 않는다.**
- **B. 유동성 (`data/liquidity.js`)**: 미국(연준 금리·FOMC·M2·연준 대차대조표·HY 스프레드·10Y·10Y-2Y 커브·Core PCE/CPI), 한국(한은 금리·금통위·CPI·원달러·외국인 수급) 조사 → 기존 구조 유지하며 게이지 5단계(`매우 우호`/`우호`/`신중`/`부정`/`매우 부정`)·`asOf`(오늘) 갱신. 등급 변경 시 근거 수치를 `drivers`에 남긴다.

## 가드레일 (코드로 강제됨)
`scripts/update-reco.js`·`scripts/validate-reco.js`가 다음을 강제한다(어기면 저장 거부): 신뢰 출처 2개 이상(커뮤니티·블로그·SNS 금지), 목표가 ±50% 급변 차단, 분석 변경 시 근거 URL 필수, `BANNED_TICKERS`(재추가 금지) 편입 거부, (주제×국가) 9종목·tier 3/3/3 구조.
