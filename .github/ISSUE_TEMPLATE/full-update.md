---
name: 전체 업데이트 (분석·추천 + 유동성)
about: 분석·종목 추천(recommendations.js)과 거시 유동성(liquidity.js)을 한 번에 갱신 요청합니다. Claude 세션에서 이 이슈를 열어 처리합니다.
title: 전체 업데이트 요청 (분석·추천 + 유동성)
---

[전체 업데이트 요청] 주식 대시보드의 분석·추천·유동성 레이어를 최신으로 갱신해 주세요.

절차·범위·완료 판정은 저장소의 **CLAUDE.md 가 유일한 지시서**입니다 — ★ "업데이트" 요청 처리 프로토콜과 ★★ 온디맨드 업데이트(매일 항목 전량 + 7일 회전 3종) 절을 따르고, `node scripts/coverage.js` 와 `node scripts/validate-reco.js` 를 모두 통과한 뒤 배포 브랜치(`claude/stock-analysis-recommendation-v9310x`)에 커밋·push 합니다.

(이 이슈는 앱 상단 상태칩이 진행 상태를 표시하는 데 쓰입니다: 🟡 접수 → 🔧 처리 중 → 🟢 완료.)
