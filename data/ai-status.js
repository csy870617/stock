// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-07T00:16:17.171Z",
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
  "at": "2026-11-07T00:20:54.364Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 101,
  "fetched": 101,
  "called": 92,
  "lines": 73,
  "usage": {
   "calls": 92,
   "input": 138016,
   "output": 5555,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-11-07T00:17:50.266Z",
  "T": "2026-11-06",
  "basis": {
   "kr": "2026-11-06",
   "us": "2026-11-06"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-07T00:20:54.267Z",
   "items": {
    "market": {
     "sig": "미국 AI·반도체주 급락이 하루 만에 한국으로 번졌다. 11/05 나스닥#1q4untk",
     "basis": {
      "kr": "2026-11-06",
      "us": "2026-11-06"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대와 극도의 공포가 겹친#mkipsk",
     "basis": {
      "kr": "2026-11-06",
      "us": "2026-11-06"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 30.8로 과매도 근접#2wyfq0",
     "basis": {
      "kr": "2026-11-06",
      "us": "2026-11-06"
     }
    },
    "topPicks": {
     "sig": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #hbct95",
     "basis": {
      "kr": "2026-11-06",
      "us": "2026-11-06"
     }
    }
   }
  },
  "wrote": [
   "liquidity"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대와 극도의 공포가 겹친#mkipsk",
   "indexNotes": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 30.8로 과매도 근접#15kdhok",
   "market": "미국 AI·반도체주 급락이 하루 만에 한국으로 번졌다. 11/05 나스닥#tcfqd6",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #662s7h"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 345124,
   "output": 19833,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.777
  }
 }
};
