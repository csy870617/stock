// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-04T00:48:16.632Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 2,
  "judged": 2,
  "items": [
   {
    "g": "korea|core",
    "t": "278470",
    "name": "에이피알",
    "verdict": "실질"
   },
   {
    "g": "korea|value",
    "t": "000270",
    "name": "기아",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 4,
   "input": 89629,
   "output": 3643,
   "cacheRead": 0,
   "searches": 6,
   "usd": 0.216
  }
 },
 "news": {
  "at": "2026-11-04T00:53:32.241Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 86,
  "lines": 67,
  "usage": {
   "calls": 86,
   "input": 132547,
   "output": 5140,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-04T00:50:27.501Z",
  "T": "2026-11-03",
  "basis": {
   "kr": "2026-11-03",
   "us": "2026-11-03"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-04T00:53:32.140Z",
   "items": {
    "market": {
     "sig": "미국은 반도체 반등으로 나스닥이 올랐지만, 한국은 AI 빅테크 부담과 미#hwf298",
     "basis": {
      "kr": "2026-11-03",
      "us": "2026-11-03"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면, 한국은 예탁#1vekho9",
     "basis": {
      "kr": "2026-11-03",
      "us": "2026-11-03"
     }
    },
    "indexNotes": {
     "sig": "하락세. 일목 구름 아래·전환선<기준선이고 RSI 40.1이며 MACD는#vnq0h8",
     "basis": {
      "kr": "2026-11-03",
      "us": "2026-11-03"
     }
    },
    "topPicks": {
     "sig": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7#1fcw392",
     "basis": {
      "kr": "2026-11-03",
      "us": "2026-11-03"
     }
    }
   }
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면, 한국은 예탁#1vekho9",
   "indexNotes": "하락세. 일목 구름 아래·전환선<기준선이고 RSI 40.1이며 MACD는#vnq0h8",
   "market": "미국은 반도체 반등으로 나스닥이 올랐지만, 한국은 AI 빅테크 부담과 미#hwf298",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7#1fcw392"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 292628,
   "output": 19486,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.56
  }
 }
};
