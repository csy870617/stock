---
name: 유동성 지표 갱신
about: 거시 유동성 지표(data/liquidity.js) 갱신을 요청합니다. Claude 세션에서 이 이슈를 열어 처리합니다.
title: 유동성 지표 갱신 요청
---

[유동성 갱신 요청] data/liquidity.js 의 거시 유동성 지표를 아래 절차대로 최신 갱신해 주세요. (Claude 세션에서 이 이슈를 열어 처리합니다.)

절차:
1. WebSearch로 현재 유동성 여건을 조사한다 — 미국(연준 정책금리·차기 FOMC·인상/인하 확률·M2·연준 대차대조표·HY 신용스프레드·10년물·10Y-2Y 커브·Core PCE/CPI), 한국(한은 기준금리·금통위·CPI·원/달러 환율·외국인 코스피 수급). 모든 수치는 검색 결과에 실제로 적힌 값만 쓰고, 확인 못 한 값은 기존값을 유지한다. WebFetch·금융 API 직접 호출은 막히니(403) WebSearch만 쓴다.
2. data/liquidity.js 를 기존 구조 그대로 갱신한다: `window.LIQUIDITY_DATA = { asOf(오늘 날짜), headline(한국어), us·korea 각각 {shortTerm, midTerm, drivers[]}, nextCheck, sources[] }`. 게이지는 "매우 우호"/"우호"/"신중"/"부정"/"매우 부정" 5단계 중 하나로만 쓴다. 게이지 등급을 바꿀 땐 근거 수치를 drivers 에 남긴다.
3. node 로 파일 로드·게이지 값을 검증한 뒤, `data/liquidity.js` 만 변경해 배포 브랜치 `claude/stock-analysis-recommendation-v9310x` 에 직접 커밋한다(그래야 GitHub Pages 로 자동 배포됨). 다른 파일은 건드리지 않는다.
