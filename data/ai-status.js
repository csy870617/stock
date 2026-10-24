// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-24T12:31:40.119Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 4,
  "judged": 4,
  "items": [
   {
    "g": "korea|rising",
    "t": "095340",
    "name": "ISC",
    "verdict": "형식"
   },
   {
    "g": "us|rising",
    "t": "NXT",
    "name": "Nextpower",
    "verdict": "실질"
   },
   {
    "g": "us|rising",
    "t": "NVMI",
    "name": "Nova Ltd.",
    "verdict": "형식"
   },
   {
    "g": "us|rising",
    "t": "APPF",
    "name": "AppFolio",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 8,
   "input": 108037,
   "output": 5475,
   "cacheRead": 0,
   "searches": 12,
   "usd": 0.271
  }
 },
 "news": {
  "at": "2026-10-24T12:37:07.291Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 73,
  "lines": 84,
  "usage": {
   "calls": 73,
   "input": 112967,
   "output": 5793,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.014
  }
 },
 "daily": {
  "at": "2026-10-24T12:33:27.468Z",
  "T": "2026-10-23",
  "basis": {
   "kr": "2026-10-23",
   "us": "2026-10-23"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-24T12:37:07.181Z",
   "items": {
    "market": {
     "sig": "유가 급등과 AI 투자 지속성 우려가 겹치며 미국 증시는 10/23 다우",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-23"
     }
    },
    "liquidity": {
     "sig": "유가 100달러 돌파와 연준 12월 인상 기대(86%)로 미국은 단기 신",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-23"
     }
    },
    "indexNotes": {
     "sig": "매도 — 하락 추세에 일목 구름 아래, 전환선<기준선, MACD 시그널 ",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-23"
     }
    },
    "topPicks": {
     "sig": "주가가 순자산가치를 밑도는 할인 상태에서 3분기 누적 순이익이 역대 최대",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-22"
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
   "liquidity": "유가 100달러 돌파와 연준 12월 인상 기대(86%)로 미국은 단기 신",
   "indexNotes": "매도 — 하락 추세에 일목 구름 아래, 전환선<기준선, MACD 시그널 ",
   "market": "유가 급등과 AI 투자 지속성 우려가 겹치며 미국 증시는 10/23 다우"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 252555,
   "output": 21086,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.432
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
