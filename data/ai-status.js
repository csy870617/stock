// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-03T06:50:48.942Z",
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
    "g": "korea|growth",
    "t": "298040",
    "name": "효성중공업",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 4,
   "input": 79797,
   "output": 3845,
   "cacheRead": 0,
   "searches": 6,
   "usd": 0.198
  }
 },
 "news": {
  "at": "2026-11-03T06:56:50.885Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 53,
  "lines": 75,
  "usage": {
   "calls": 53,
   "input": 94648,
   "output": 3496,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.011
  }
 },
 "daily": {
  "at": "2026-11-03T06:53:05.276Z",
  "T": "2026-11-03",
  "basis": {
   "kr": "2026-11-03",
   "us": "2026-11-02"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-03T06:56:50.813Z",
   "items": {
    "market": {
     "sig": "미국 기술주 이탈이 한국 반도체 급락으로 번졌다. 11/02 나스닥은 반#1xu5hcx",
     "basis": {
      "kr": "2026-11-03",
      "us": "2026-11-02"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면이다. 한국은 #kx459h",
     "basis": {
      "kr": "2026-11-03",
      "us": "2026-11-02"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일목 구름 아래·전환선<기준선, 머리위 매물 58%, RSI #891zpi",
     "basis": {
      "kr": "2026-11-03",
      "us": "2026-11-02"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식 수가 누적 약 #1oywete",
     "basis": {
      "kr": "2026-11-03",
      "us": "2026-11-02"
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
   "liquidity": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면이다. 한국은 #kx459h",
   "indexNotes": "하락세 — 일목 구름 아래·전환선<기준선, 머리위 매물 58%, RSI #891zpi",
   "market": "미국 기술주 이탈이 한국 반도체 급락으로 번졌다. 11/02 나스닥은 반#1xu5hcx",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식 수가 누적 약 #1oywete"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 345919,
   "output": 21489,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.813
  }
 }
};
