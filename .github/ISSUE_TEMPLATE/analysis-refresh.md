---
name: 분석·추천 갱신
about: 분석·종목 추천(data/recommendations.js) 재평가를 요청합니다. Claude 세션에서 이 이슈를 열어 처리합니다.
title: 분석·추천 갱신 요청
---

[분석·추천 갱신 요청] data/recommendations.js 의 분석·종목 추천을 최신으로 재평가해 주세요. (Claude 세션에서 이 이슈를 열어 처리합니다.)

지침:
1. WebSearch로 조사한다(WebFetch·금융 API는 이 환경에서 403). 수치는 검색 스니펫에 실제로 적힌 값만 쓰고, 확인 못 한 값은 기존값을 유지한다.
2. generatedAt·marketNote(오늘 시황)를 갱신하고 `node scripts/snapshot.js` 로 스냅샷을 기록한다.
3. `node scripts/performance-report.js` 와 `node scripts/validate-reco.js` 로 우선순위(목표가 소진·성과 부진·신뢰 출처 부족)를 선별한다.
4. 목표가는 컨센서스(신뢰 출처 2개 이상 교차확인), 논거·리스크·tier·dividendYield·earnings를 최신화한다. 지배구조 스크리닝과 BANNED_TICKERS(재추가 금지)를 준수한다.
5. (주제×국가) 9종목·tier 3/3/3 구조를 유지하고, `node scripts/update-reco.js <패치.json>` 증분 패치로 적용 → validate 통과 → 배포 브랜치 `claude/stock-analysis-recommendation-v9310x` 에 커밋한다.
6. 시세(price·priceDate·upside)는 refresh-quotes Action 담당이므로 건드리지 않는다.
