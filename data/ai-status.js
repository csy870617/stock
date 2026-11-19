// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-19T07:39:45.973Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "korea|dividend",
    "t": "005850",
    "name": "에스엘",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 40961,
   "output": 2309,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.105
  }
 },
 "news": {
  "at": "2026-11-19T07:44:15.757Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 52,
  "lines": 76,
  "usage": {
   "calls": 52,
   "input": 98254,
   "output": 3844,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.012
  }
 },
 "daily": {
  "at": "2026-11-19T07:41:40.686Z",
  "T": "2026-11-19",
  "basis": {
   "kr": "2026-11-19",
   "us": "2026-11-18"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-19T07:44:15.608Z",
   "basis": {
    "kr": "2026-11-19",
    "us": "2026-11-18"
   },
   "items": {
    "market": {
     "sig": "미국은 연준 의사록이 추가 인상을 시사하며 S&P500이 5거래일 연속 #1whv7mr",
     "basis": {
      "kr": "2026-11-19",
      "us": "2026-11-18"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신#1yjkfzy",
     "basis": {
      "kr": "2026-11-19",
      "us": "2026-11-18"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 38.0이며 머리 위 #dcez35",
     "basis": {
      "kr": "2026-11-19",
      "us": "2026-11-18"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#1ldlqpb",
     "basis": {
      "kr": "2026-11-18",
      "us": "2026-11-17"
     }
    }
   }
  },
  "inputs": {
   "market": "d8n17a",
   "indexNotes": "1vee7iu"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신#1yjkfzy",
   "indexNotes": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 38.0이며 머리 위 #dcez35",
   "market": "미국은 연준 의사록이 추가 인상을 시사하며 S&P500이 5거래일 연속 #1whv7mr",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#1ldlqpb"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 372666,
   "output": 13755,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.766
  }
 }
};
