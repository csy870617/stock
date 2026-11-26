// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-26T08:20:45.323Z",
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
  "at": "2026-11-26T08:25:20.967Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 98,
  "fetched": 98,
  "called": 58,
  "lines": 71,
  "usage": {
   "calls": 58,
   "input": 109623,
   "output": 4254,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.013
  }
 },
 "daily": {
  "at": "2026-11-26T08:22:14.783Z",
  "T": "2026-11-26",
  "basis": {
   "kr": "2026-11-26",
   "us": "2026-11-25"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-26T08:25:20.858Z",
   "basis": {
    "kr": "2026-11-26",
    "us": "2026-11-25"
   },
   "items": {
    "market": {
     "sig": "미국은 물가·관세·AI주 매도로 장중 급락했다가 낙폭을 대부분 되찾아 혼#qibcp5",
     "basis": {
      "kr": "2026-11-26",
      "us": "2026-11-25"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 5년 중 하위 20%로 빠지는 중이고 한국은 예탁금·#16yfjlt",
     "basis": {
      "kr": "2026-11-26",
      "us": "2026-11-25"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래·MACD 시그널 하회, RSI 35.5로 과매#fgtm8l",
     "basis": {
      "kr": "2026-11-26",
      "us": "2026-11-25"
     }
    },
    "topPicks": {
     "sig": "주식 수를 연 2.9% 줄이는 주주환원과 증권사 예상 이익 성장 +16%#1b5jabu",
     "basis": {
      "kr": "2026-11-26",
      "us": "2026-11-25"
     }
    }
   }
  },
  "inputs": {
   "market": "13erke1",
   "indexNotes": "1gbzubx"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 5년 중 하위 20%로 빠지는 중이고 한국은 예탁금·#16yfjlt",
   "indexNotes": "하락세 — 일봉 구름 아래·MACD 시그널 하회, RSI 35.5로 과매#fgtm8l",
   "market": "미국은 물가·관세·AI주 매도로 장중 급락했다가 낙폭을 대부분 되찾아 혼#qibcp5",
   "topPicks": "주식 수를 연 2.9% 줄이는 주주환원과 증권사 예상 이익 성장 +16%#1b5jabu"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 609675,
   "output": 18209,
   "cacheRead": 0,
   "searches": 6,
   "usd": 2.803
  }
 }
};
