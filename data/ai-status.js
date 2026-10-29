// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-29T13:44:16.363Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 5,
  "judged": 5,
  "items": [
   {
    "g": "us|core",
    "t": "MSFT",
    "name": "Microsoft",
    "verdict": "없음"
   },
   {
    "g": "us|core",
    "t": "GOOGL",
    "name": "Alphabet",
    "verdict": "형식"
   },
   {
    "g": "us|growth",
    "t": "NOW",
    "name": "ServiceNow",
    "verdict": "형식"
   },
   {
    "g": "us|rising",
    "t": "NXT",
    "name": "Nextpower",
    "verdict": "실질"
   },
   {
    "g": "us|rising",
    "t": "STRL",
    "name": "Sterling Infrastructure",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 11,
   "input": 148009,
   "output": 7335,
   "cacheRead": 0,
   "searches": 15,
   "usd": 0.369
  }
 },
 "news": {
  "at": "2026-10-29T13:49:59.270Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 93,
  "lines": 91,
  "usage": {
   "calls": 93,
   "input": 139328,
   "output": 7091,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-10-29T13:46:22.466Z",
  "T": "2026-10-29",
  "basis": {
   "kr": "2026-10-29",
   "us": "2026-10-28"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-29T13:49:59.194Z",
   "items": {
    "market": {
     "sig": "미국 증시는 10/28 연준의 매파적 동결 속에서도 3거래일 연속 올랐지#8ggmw5",
     "basis": {
      "kr": "2026-10-29",
      "us": "2026-10-28"
     }
    },
    "liquidity": {
     "sig": "연준의 매파적 동결과 12월 인상 기대, 한국은행의 인상 기대와 외국인 #1fwekya",
     "basis": {
      "kr": "2026-10-29",
      "us": "2026-10-28"
     }
    },
    "indexNotes": {
     "sig": "횡보: 일봉 구름 아래에서 전환선이 기준선 아래이고 RSI는 44.9이며#1vcipv0",
     "basis": {
      "kr": "2026-10-29",
      "us": "2026-10-28"
     }
    },
    "topPicks": {
     "sig": "자사주 매입·소각으로 주식 수가 한 해 5% 줄었고, 결산 배당을 크게 #np1oxn",
     "basis": {
      "kr": "2026-10-28",
      "us": "2026-10-28"
     }
    }
   }
  },
  "wrote": [
   "liquidity",
   "market"
  ],
  "sig": {
   "liquidity": "연준의 매파적 동결과 12월 인상 기대, 한국은행의 인상 기대와 외국인 #1fwekya",
   "indexNotes": "횡보: 급등에도 일봉 구름 아래이고 전환선이 기준선 아래이며 RSI는 4#1m9j8s2",
   "market": "미국 증시는 10/28 연준의 매파적 동결 속에서도 3거래일 연속 올랐지#8ggmw5"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 339286,
   "output": 21666,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.79
  }
 }
};
