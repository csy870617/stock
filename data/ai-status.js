// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-10T02:50:16.627Z",
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
  "at": "2026-11-10T02:53:44.532Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 98,
  "fetched": 98,
  "called": 79,
  "lines": 75,
  "usage": {
   "calls": 79,
   "input": 123011,
   "output": 5347,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.015
  }
 },
 "daily": {
  "at": "2026-11-10T02:51:24.842Z",
  "T": "2026-11-09",
  "basis": {
   "kr": "2026-11-09",
   "us": "2026-11-09"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-10T02:53:44.444Z",
   "basis": {
    "kr": "2026-11-09",
    "us": "2026-11-09"
   },
   "items": {
    "market": {
     "sig": "미국은 유가 하락과 기술주 반등으로 나스닥 +2.74%·다우 +2.15%#1mvgwle",
     "basis": {
      "kr": "2026-11-09",
      "us": "2026-11-09"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대가 겹친 신중 국면, #7lu7v1",
     "basis": {
      "kr": "2026-11-09",
      "us": "2026-11-09"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 구름 아래·전환선<기준선, RSI 30.3으로 과매도에 근접했#1x4aic7",
     "basis": {
      "kr": "2026-11-09",
      "us": "2026-11-09"
     }
    },
    "topPicks": {
     "sig": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #1vgjl7g",
     "basis": {
      "kr": "2026-11-09",
      "us": "2026-11-06"
     }
    }
   }
  },
  "inputs": {
   "market": "17mrrnw",
   "indexNotes": "1yxyqfm"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대가 겹친 신중 국면, #7lu7v1",
   "indexNotes": "하락세 — 구름 아래·전환선<기준선, RSI 30.3으로 과매도에 근접했#1x4aic7",
   "market": "미국은 유가 하락과 기술주 반등으로 나스닥 +2.74%·다우 +2.15%#1mvgwle",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #662s7h"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 199191,
   "output": 13373,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.064
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
