// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-03T02:30:22.605Z",
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
  "at": "2026-11-03T02:35:27.029Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 77,
  "lines": 76,
  "usage": {
   "calls": 77,
   "input": 117209,
   "output": 5396,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.014
  }
 },
 "daily": {
  "at": "2026-11-03T02:31:41.851Z",
  "T": "2026-11-02",
  "basis": {
   "kr": "2026-11-02",
   "us": "2026-11-02"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-03T02:35:26.904Z",
   "items": {
    "market": {
     "sig": "미국은 AI 투자 부담에 기술주가 밀리며 나스닥이 1.07% 내렸고, 한#1xmrp9r",
     "basis": {
      "kr": "2026-11-02",
      "us": "2026-11-02"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 들어오는 중이지만 연준 인상 기대가 누르는 신중 국면#rldbw7",
     "basis": {
      "kr": "2026-11-02",
      "us": "2026-11-02"
     }
    },
    "indexNotes": {
     "sig": "횡보 — 구름 아래·전환선<기준선이지만 MACD가 시그널을 상회했고 RS#vl9j77",
     "basis": {
      "kr": "2026-11-02",
      "us": "2026-11-02"
     }
    },
    "topPicks": {
     "sig": "자사주 매입·소각으로 주식 수가 한 해 5% 줄었고, 결산 배당을 크게 #q6lqah",
     "basis": {
      "kr": "2026-10-30",
      "us": "2026-10-30"
     }
    }
   }
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 들어오는 중이지만 연준 인상 기대가 누르는 신중 국면#rldbw7",
   "indexNotes": "횡보 — 구름 아래·전환선<기준선이지만 MACD가 시그널을 상회했고 RS#vl9j77",
   "market": "미국은 AI 투자 부담에 기술주가 밀리며 나스닥이 1.07% 내렸고, 한#1xmrp9r"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 415676,
   "output": 21543,
   "cacheRead": 0,
   "searches": 6,
   "usd": 2.094
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
