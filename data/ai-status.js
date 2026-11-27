// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-27T08:36:49.233Z",
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
  "at": "2026-11-27T08:40:41.718Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 57,
  "lines": 73,
  "usage": {
   "calls": 57,
   "input": 102429,
   "output": 3905,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.012
  }
 },
 "daily": {
  "at": "2026-11-27T08:38:04.856Z",
  "T": "2026-11-27",
  "basis": {
   "kr": "2026-11-27",
   "us": "2026-11-25"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-27T08:40:41.616Z",
   "basis": {
    "kr": "2026-11-27",
    "us": "2026-11-25"
   },
   "items": {
    "market": {
     "sig": "미국은 AI 투자 불안, 신규 관세안, 물가 부담에 장중 급락했다가 낙폭#65iyb1",
     "basis": {
      "kr": "2026-11-27",
      "us": "2026-11-25"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 5년 하위 25%로 빠지는 중이고 연준 12월 인상이#1d1fuic",
     "basis": {
      "kr": "2026-11-27",
      "us": "2026-11-25"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일목 구름 아래, 전환선<기준선이지만 MACD는 시그널을 상회#1c8h0w8",
     "basis": {
      "kr": "2026-11-27",
      "us": "2026-11-25"
     }
    },
    "topPicks": {
     "sig": "주식 수를 연 2.9% 줄인 주주환원 쪽과 증권사 예상 이익 성장 +16#1f0pcpb",
     "basis": {
      "kr": "2026-11-27",
      "us": "2026-11-25"
     }
    }
   }
  },
  "inputs": {
   "market": "17tptks",
   "indexNotes": "10gx9c6"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 5년 하위 25%로 빠지는 중이고 연준 12월 인상이#1d1fuic",
   "indexNotes": "하락세 — 일목 구름 아래, 전환선<기준선이지만 MACD는 시그널을 상회#1c8h0w8",
   "market": "미국은 AI 투자 불안, 신규 관세안, 물가 부담에 장중 급락했다가 낙폭#65iyb1",
   "topPicks": "주식 수를 연 2.9% 줄인 주주환원 쪽과 증권사 예상 이익 성장 +16#1f0pcpb"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 233042,
   "output": 17079,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.274
  }
 }
};
