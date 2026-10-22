// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-22T13:02:41.529Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 3,
  "judged": 3,
  "items": [
   {
    "g": "korea|value",
    "t": "086280",
    "name": "현대글로비스",
    "verdict": "형식"
   },
   {
    "g": "korea|value",
    "t": "018260",
    "name": "삼성에스디에스",
    "verdict": "형식"
   },
   {
    "g": "us|growth",
    "t": "META",
    "name": "Meta Platforms",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 6,
   "input": 78256,
   "output": 4124,
   "cacheRead": 0,
   "searches": 9,
   "usd": 0.198
  }
 },
 "news": {
  "at": "2026-10-22T13:03:55.534Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 114,
  "fetched": 114,
  "called": 95,
  "lines": 85,
  "usage": {
   "calls": 95,
   "input": 142260,
   "output": 6908,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.018
  }
 },
 "daily": {
  "checkedAt": "2026-10-22T13:03:55.402Z",
  "seen": {
   "at": "2026-10-22T13:03:55.402Z",
   "items": {
    "market": {
     "sig": "(10/21 미국 마감 기준) 나스닥 26,702.86(+1.05%)·다",
     "basis": {
      "kr": "2026-10-22",
      "us": "2026-10-21"
     }
    },
    "liquidity": {
     "sig": "미국은 10/21 다우·나스닥 동반 상승과 VIX 16.7에도 10년물 ",
     "basis": {
      "kr": "2026-10-22",
      "us": "2026-10-21"
     }
    },
    "indexNotes": {
     "sig": "일봉은 구름 아래·전환<기준에 머리 위 매물 61%로 자체 '적극매도'이",
     "basis": {
      "kr": "2026-10-22",
      "us": "2026-10-21"
     }
    },
    "topPicks": {
     "sig": "주가가 순자산가치를 밑도는 할인 상태에서 2분기 영업이익이 전년보다 늘었",
     "basis": {
      "kr": "2026-10-22",
      "us": "2026-10-21"
     }
    }
   }
  },
  "skipped": "오늘(2026-10-22) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
