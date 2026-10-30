// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-30T00:01:48.371Z",
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
  "at": "2026-10-30T00:05:38.992Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 86,
  "lines": 87,
  "usage": {
   "calls": 86,
   "input": 128184,
   "output": 6703,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-10-30T00:01:57.428Z",
  "T": "2026-10-29",
  "basis": {
   "kr": "2026-10-29",
   "us": "2026-10-29"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-30T00:05:38.889Z",
   "items": {
    "market": {
     "sig": "알파벳 급락과 삼성전자 실적 발표 후 실망 매물이 겹치며 10/29 미국#rowx3n",
     "basis": {
      "kr": "2026-10-29",
      "us": "2026-10-29"
     }
    },
    "liquidity": {
     "sig": "연준의 12월 인상 기대와 한국은행의 인상 쪽 기울기가 이어져 두 나라 #u0gahh",
     "basis": {
      "kr": "2026-10-29",
      "us": "2026-10-29"
     }
    },
    "indexNotes": {
     "sig": "횡보입니다. 일봉이 구름 아래에 있고 전환선이 기준선 아래에 있지만 MA#4x94g8",
     "basis": {
      "kr": "2026-10-29",
      "us": "2026-10-29"
     }
    },
    "topPicks": {
     "sig": "자사주 매입·소각으로 주식 수가 한 해 5% 줄었고, 결산 배당을 크게 #np1oxn",
     "basis": {
      "kr": "2026-10-28",
      "us": "2026-10-28"
     }
    }
   }
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "연준의 12월 인상 기대와 한국은행의 인상 쪽 기울기가 이어져 두 나라 #u0gahh",
   "indexNotes": "횡보입니다. 일봉이 구름 아래에 있고 전환선이 기준선 아래에 있지만 MA#4x94g8",
   "market": "알파벳 급락과 삼성전자 실적 발표 후 실망 매물이 겹치며 10/29 미국#rowx3n"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 558585,
   "output": 23117,
   "cacheRead": 0,
   "searches": 6,
   "usd": 2.697
  },
  "note": "새 종가로 세션 문장 갱신: indexNotes"
 }
};
