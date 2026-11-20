// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-20T01:50:57.994Z",
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
  "at": "2026-11-20T01:54:59.149Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 98,
  "fetched": 98,
  "called": 90,
  "lines": 77,
  "usage": {
   "calls": 90,
   "input": 140988,
   "output": 5700,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-11-20T01:52:44.780Z",
  "T": "2026-11-19",
  "basis": {
   "kr": "2026-11-19",
   "us": "2026-11-19"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-20T01:54:59.012Z",
   "basis": {
    "kr": "2026-11-19",
    "us": "2026-11-19"
   },
   "items": {
    "market": {
     "sig": "미국은 AI 붐 종료 우려로 다우 -2.19%, 나스닥 -2.25%가 동#1d3nxr8",
     "basis": {
      "kr": "2026-11-19",
      "us": "2026-11-19"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신#1vlyyat",
     "basis": {
      "kr": "2026-11-19",
      "us": "2026-11-19"
     }
    },
    "indexNotes": {
     "sig": "하락세. 일봉 구름 아래이고, MACD는 시그널을 상회했다. 지지 5,1#bgmxlv",
     "basis": {
      "kr": "2026-11-19",
      "us": "2026-11-19"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#quvvil",
     "basis": {
      "kr": "2026-11-19",
      "us": "2026-11-18"
     }
    }
   }
  },
  "inputs": {
   "market": "1lpb0jo",
   "indexNotes": "kjz3u6"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신#1vlyyat",
   "indexNotes": "하락세. 일봉 구름 아래이고, MACD는 시그널을 상회했다. 지지 5,1#bgmxlv",
   "market": "미국은 AI 붐 종료 우려로 다우 -2.19%, 나스닥 -2.25%가 동#1d3nxr8",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#1ldlqpb"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 219890,
   "output": 13236,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.144
  },
  "note": "새 종가로 세션 문장 갱신: market, indexNotes"
 }
};
