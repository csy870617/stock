// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-25T08:36:40.437Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 2,
  "judged": 2,
  "items": [
   {
    "g": "korea|growth",
    "t": "095340",
    "name": "ISC",
    "verdict": "형식"
   },
   {
    "g": "korea|value",
    "t": "267270",
    "name": "HD건설기계",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 4,
   "input": 98398,
   "output": 3719,
   "cacheRead": 0,
   "searches": 6,
   "usd": 0.234
  }
 },
 "news": {
  "at": "2026-11-25T08:42:21.434Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 98,
  "fetched": 98,
  "called": 51,
  "lines": 67,
  "usage": {
   "calls": 51,
   "input": 100178,
   "output": 3259,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.012
  }
 },
 "daily": {
  "at": "2026-11-25T08:38:59.057Z",
  "T": "2026-11-25",
  "basis": {
   "kr": "2026-11-25",
   "us": "2026-11-24"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-25T08:42:21.307Z",
   "basis": {
    "kr": "2026-11-25",
    "us": "2026-11-24"
   },
   "items": {
    "market": {
     "sig": "미국 반도체 급락이 한국 증시로 번진 하루다. 11/24 필라델피아 반도#1gdweq0",
     "basis": {
      "kr": "2026-11-25",
      "us": "2026-11-24"
     }
    },
    "liquidity": {
     "sig": "미국·한국 모두 돈의 흐름이 빠지는 중이고, 연준·한은 인상 경로와 극도#1cwazts",
     "basis": {
      "kr": "2026-11-25",
      "us": "2026-11-24"
     }
    },
    "indexNotes": {
     "sig": "하락세(매도) — 일목 구름 아래, 전환선이 기준선 아래이고 RSI 35#1hq4bn3",
     "basis": {
      "kr": "2026-11-25",
      "us": "2026-11-24"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#14hr0rr",
     "basis": {
      "kr": "2026-11-25",
      "us": "2026-11-24"
     }
    }
   }
  },
  "inputs": {
   "market": "zd8htd",
   "indexNotes": "nfnwlr"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국·한국 모두 돈의 흐름이 빠지는 중이고, 연준·한은 인상 경로와 극도#1cwazts",
   "indexNotes": "하락세(매도) — 일목 구름 아래, 전환선이 기준선 아래이고 RSI 35#1hq4bn3",
   "market": "미국 반도체 급락이 한국 증시로 번진 하루다. 11/24 필라델피아 반도#1gdweq0",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#14hr0rr"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 409395,
   "output": 14600,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.93
  }
 }
};
