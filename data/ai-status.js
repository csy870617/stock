// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-12T15:38:41.842Z",
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
  "at": "2026-11-12T15:42:37.803Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 83,
  "lines": 74,
  "usage": {
   "calls": 83,
   "input": 129392,
   "output": 5632,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-12T15:40:06.581Z",
  "T": "2026-11-12",
  "basis": {
   "kr": "2026-11-12",
   "us": "2026-11-11"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-12T15:42:37.716Z",
   "basis": {
    "kr": "2026-11-12",
    "us": "2026-11-11"
   },
   "items": {
    "market": {
     "sig": "미국은 코어위브 호실적과 엔비디아 반등으로 AI 투자 신뢰가 살아나며 나#1lznd6x",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-11"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 중간 수준이지만 금리 인상 기대와 금융여건 긴축이 겹#a19n1n",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-11"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일목 구름 아래, 전환선이 기준선 아래, RSI 39.9로 과#z9f4vi",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-11"
     }
    },
    "topPicks": {
     "sig": "순이익의 50% 이상을 배당과 자사주 매입·소각으로 돌려주는 원칙으로 주#t0eij",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-11"
     }
    }
   }
  },
  "inputs": {
   "market": "misfhx",
   "indexNotes": "1cekkjr"
  },
  "wrote": [
   "liquidity",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 중간 수준이지만 금리 인상 기대와 금융여건 긴축이 겹#a19n1n",
   "indexNotes": "하락세 — 일목 구름 아래, 전환선이 기준선 아래, RSI 39.9로 과#epp12z",
   "market": "미국은 코어위브 호실적과 엔비디아 반등으로 AI 투자 신뢰가 살아나며 나#cpf7du",
   "topPicks": "순이익의 50% 이상을 배당과 자사주 매입·소각으로 돌려주는 원칙으로 주#t0eij"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 322730,
   "output": 12705,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.545
  }
 }
};
