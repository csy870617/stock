// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-13T06:49:06.657Z",
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
  "at": "2026-11-13T06:53:52.107Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 63,
  "lines": 74,
  "usage": {
   "calls": 63,
   "input": 108933,
   "output": 5198,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.013
  }
 },
 "daily": {
  "at": "2026-11-13T06:50:39.659Z",
  "T": "2026-11-13",
  "basis": {
   "kr": "2026-11-13",
   "us": "2026-11-12"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-13T06:53:51.973Z",
   "basis": {
    "kr": "2026-11-13",
    "us": "2026-11-12"
   },
   "items": {
    "market": {
     "sig": "엔비디아 젠슨 황 CEO 사임과 미 10년물 금리·유가 상승이 겹쳐 미국#17v5mjq",
     "basis": {
      "kr": "2026-11-13",
      "us": "2026-11-12"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름이지만 연준 인상 기대와 10년물 5.10%가 #16gvtpl",
     "basis": {
      "kr": "2026-11-13",
      "us": "2026-11-12"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 구름 아래·전환선<기준선이고 RSI 39.1로 과매도에 가깝다#r3sd1e",
     "basis": {
      "kr": "2026-11-13",
      "us": "2026-11-12"
     }
    },
    "topPicks": {
     "sig": "순이익의 50% 이상을 배당과 자사주 매입·소각으로 돌려주는 원칙으로 2#x38fsl",
     "basis": {
      "kr": "2026-11-13",
      "us": "2026-11-12"
     }
    }
   }
  },
  "inputs": {
   "market": "j7wlbu",
   "indexNotes": "1yo9i74"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름이지만 연준 인상 기대와 10년물 5.10%가 #16gvtpl",
   "indexNotes": "하락세 — 구름 아래·전환선<기준선이고 RSI 39.1로 과매도에 가깝다#r3sd1e",
   "market": "엔비디아 젠슨 황 CEO 사임과 미 10년물 금리·유가 상승이 겹쳐 미국#17v5mjq",
   "topPicks": "순이익의 50% 이상을 배당과 자사주 매입·소각으로 돌려주는 원칙으로 2#x38fsl"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 372534,
   "output": 18608,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.862
  }
 }
};
