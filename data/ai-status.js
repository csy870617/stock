// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-21T23:56:53.979Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 0,
  "judged": 0,
  "items": [],
  "usage": {
   "calls": 0,
   "input": 0,
   "output": 0,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0
  }
 },
 "news": {
  "at": "2026-10-21T23:56:54.245Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 114,
  "fetched": 114,
  "called": 80,
  "lines": 85,
  "usage": {
   "calls": 80,
   "input": 120942,
   "output": 5189,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.015
  }
 },
 "daily": {
  "checkedAt": "2026-10-21T23:56:54.120Z",
  "seen": {
   "at": "2026-10-21T23:56:54.121Z",
   "items": {
    "market": {
     "sig": "(10/20 미국 마감 기준) 나스닥 26,424.82(-0.02%)는 ",
     "basis": {
      "kr": "2026-10-21",
      "us": "2026-10-21"
     }
    },
    "liquidity": {
     "sig": "미국은 10/20 다우 +1.02%·나스닥 보합에 VIX 17.3으로 내",
     "basis": {
      "kr": "2026-10-21",
      "us": "2026-10-21"
     }
    },
    "indexNotes": {
     "sig": "일봉은 구름 아래·전환<기준에 머리 위 매물 52%로 자체 '적극매도'이",
     "basis": {
      "kr": "2026-10-21",
      "us": "2026-10-21"
     }
    },
    "topPicks": {
     "sig": "가치 주제 Tier1 — 주가가 순자산가치를 밑도는 할인 상태에서 2분기",
     "basis": {
      "kr": "2026-10-21",
      "us": "2026-10-21"
     }
    }
   }
  },
  "skipped": "오늘(2026-10-21) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
