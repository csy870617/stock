// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-10T15:16:32.752Z",
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
  "at": "2026-11-10T15:17:39.807Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 76,
  "lines": 69,
  "usage": {
   "calls": 76,
   "input": 123436,
   "output": 4727,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.015
  }
 },
 "daily": {
  "at": "2026-11-10T07:22:10.471Z",
  "T": "2026-11-10",
  "basis": {
   "kr": "2026-11-10",
   "us": "2026-11-09"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-10T15:17:39.686Z",
   "basis": {
    "kr": "2026-11-10",
    "us": "2026-11-09"
   },
   "items": {
    "market": {
     "sig": "미국 증시가 칩 관련주 반등과 유가 급락에 힘입어 11/09 큰 폭으로 #vqgx87",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-09"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 중간 수준에서 소폭 들어오지만 연준 12월 인상 기대#1b16gxs",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-09"
     }
    },
    "indexNotes": {
     "sig": "하락세 속 반등 시도 — 일봉 구름 아래·머리위 매물 76%, RSI 3#70x0t7",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-09"
     }
    },
    "topPicks": {
     "sig": "7월 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 #avorip",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-09"
     }
    }
   }
  },
  "inputs": {
   "market": "11acyki",
   "indexNotes": "fvnrhc"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 중간 수준에서 소폭 들어오지만 연준 12월 인상 기대#cvwtnk",
   "indexNotes": "하락세 속 반등 시도 — 일봉 구름 아래·머리위 매물 76%, RSI 3#1x1oo5x",
   "market": "미국 증시가 칩 관련주 반등과 유가 급락에 힘입어 11/09 큰 폭으로 #fmbgfx",
   "topPicks": "7월 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 #bqj7al"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 209490,
   "output": 13446,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.107
  },
  "checkedAt": "2026-11-10T15:17:39.686Z",
  "skipped": "오늘(2026-11-10) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
