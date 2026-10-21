// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-21T15:32:54.649Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "us|value",
    "t": "GM",
    "name": "General Motors",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 25752,
   "output": 1313,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.065
  }
 },
 "news": {
  "at": "2026-10-21T15:33:17.704Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 111,
  "fetched": 111,
  "called": 102,
  "lines": 77,
  "usage": {
   "calls": 102,
   "input": 147871,
   "output": 6455,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.018
  }
 }
};
