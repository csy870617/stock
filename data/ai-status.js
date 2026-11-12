// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-12T01:58:16.084Z",
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
  "at": "2026-11-12T02:02:30.639Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 81,
  "lines": 76,
  "usage": {
   "calls": 81,
   "input": 126015,
   "output": 5562,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.015
  }
 },
 "daily": {
  "at": "2026-11-12T01:59:35.431Z",
  "T": "2026-11-11",
  "basis": {
   "kr": "2026-11-11",
   "us": "2026-11-11"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-12T02:02:30.534Z",
   "basis": {
    "kr": "2026-11-11",
    "us": "2026-11-11"
   },
   "items": {
    "market": {
     "sig": "미국은 코어위브 호실적과 엔비디아 반등으로 나스닥이 1.60% 올랐으나,#1qmoiyg",
     "basis": {
      "kr": "2026-11-11",
      "us": "2026-11-11"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 중간 이상이나 12월 인상 기대와 금융여건 긴축이 겹#xqwvqh",
     "basis": {
      "kr": "2026-11-11",
      "us": "2026-11-11"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 구름 아래, 전환선이 기준선 아래, RSI 40.6이라 이번 #1rnbt7w",
     "basis": {
      "kr": "2026-11-11",
      "us": "2026-11-11"
     }
    },
    "topPicks": {
     "sig": "7월 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 #13he0xd",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-09"
     }
    }
   }
  },
  "inputs": {
   "market": "yl3eut",
   "indexNotes": "byf6gp"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 중간 이상이나 12월 인상 기대와 금융여건 긴축이 겹#xqwvqh",
   "indexNotes": "하락세 — 구름 아래, 전환선이 기준선 아래, RSI 40.6이라 이번 #1rnbt7w",
   "market": "미국은 코어위브 호실적과 엔비디아 반등으로 나스닥이 1.60% 올랐으나,#1qmoiyg",
   "topPicks": "7월 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 #bqj7al"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 348075,
   "output": 16125,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.715
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
