// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-17T07:57:47.311Z",
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
  "at": "2026-11-17T08:02:01.493Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 56,
  "lines": 69,
  "usage": {
   "calls": 56,
   "input": 103673,
   "output": 3832,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.012
  }
 },
 "daily": {
  "at": "2026-11-17T07:59:08.219Z",
  "T": "2026-11-17",
  "basis": {
   "kr": "2026-11-17",
   "us": "2026-11-16"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-17T08:02:01.377Z",
   "basis": {
    "kr": "2026-11-17",
    "us": "2026-11-16"
   },
   "items": {
    "market": {
     "sig": "엔비디아발 AI 매도가 미국에서 한국으로 이어졌다. 11/16 나스닥은 #69mlo",
     "basis": {
      "kr": "2026-11-17",
      "us": "2026-11-16"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름에 연준 인상 기대가 겹친 신중 국면이고, 한국#1wlr9z9",
     "basis": {
      "kr": "2026-11-17",
      "us": "2026-11-16"
     }
    },
    "indexNotes": {
     "sig": "하락세. 일봉 구름 아래에 머리위 매물이 84%이고 RSI는 33.2로 #1p8ypwm",
     "basis": {
      "kr": "2026-11-17",
      "us": "2026-11-16"
     }
    },
    "topPicks": {
     "sig": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #i6hy42",
     "basis": {
      "kr": "2026-11-17",
      "us": "2026-11-16"
     }
    }
   }
  },
  "inputs": {
   "market": "1io2fts",
   "indexNotes": "1fh0h60"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름에 연준 인상 기대가 겹친 신중 국면이고, 한국#1wlr9z9",
   "indexNotes": "하락세. 일봉 구름 아래에 머리위 매물이 84%이고 RSI는 33.2로 #1p8ypwm",
   "market": "엔비디아발 AI 매도가 미국에서 한국으로 이어졌다. 11/16 나스닥은 #69mlo",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #i6hy42"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 451857,
   "output": 15108,
   "cacheRead": 0,
   "searches": 6,
   "usd": 2.11
  }
 }
};
