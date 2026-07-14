---
name: 전체 업데이트 (분석·추천 + 유동성)
about: 분석·종목 추천(recommendations.js)과 거시 유동성(liquidity.js)을 한 번에 갱신 요청합니다. Claude 세션에서 이 이슈를 열어 처리합니다.
title: 전체 업데이트 요청 (분석·추천 + 유동성)
---

[전체 업데이트 요청] 주식 대시보드의 분석·종목 추천(recommendations.js)과 거시 유동성 지표(liquidity.js)를 한 번에 최신으로 갱신해 주세요. (Claude 세션에서 이 이슈를 열어 처리합니다.)

공통: WebSearch로 조사한다(WebFetch·금융 API는 이 환경에서 403). 수치는 검색 스니펫에 실제로 적힌 값만 쓰고, 확인 못 한 값은 기존값을 유지한다. 완료 후 `node scripts/validate-reco.js` 통과 확인하고 배포 브랜치 `claude/stock-analysis-recommendation-v9310x` 에 커밋한다.

## A. 분석·추천 (data/recommendations.js)
1. generatedAt·marketNote(오늘 시황)를 갱신하고 `node scripts/snapshot.js` 로 스냅샷을 기록한다.
2. `node scripts/performance-report.js` 로 우선순위(목표가 소진·성과 부진)를, `validate-reco.js` 로 신뢰 출처 부족·재추가 금지 위반을 선별한다.
3. 목표가는 컨센서스(신뢰 출처 2개 이상 교차확인), 논거·리스크·tier·dividendYield·earnings를 최신화한다. 지배구조 스크리닝과 BANNED_TICKERS(재추가 금지)를 준수한다.
4. (주제×국가) 9종목·tier 3/3/3 구조를 유지하고 `node scripts/update-reco.js <패치.json>` 증분 패치로 적용한다.
5. 시세(price·priceDate·upside)는 refresh-quotes Action 담당이므로 건드리지 않는다.

## B. 유동성 (data/liquidity.js)
6. 미국(연준 정책금리·차기 FOMC·인상/인하 확률·M2·연준 대차대조표·HY 신용스프레드·10년물·10Y-2Y 커브·Core PCE/CPI), 한국(한은 기준금리·금통위·CPI·원/달러 환율·외국인 코스피 수급)을 조사한다.
7. 기존 구조를 유지한다: `window.LIQUIDITY_DATA = { asOf(오늘), headline(한국어), us·korea 각각 {shortTerm, midTerm, drivers[]}, nextCheck, sources[] }`. 게이지는 "매우 우호"/"우호"/"신중"/"부정"/"매우 부정" 5단계 중 하나로만 쓰고, 등급을 바꿀 땐 근거 수치를 drivers 에 남긴다.
