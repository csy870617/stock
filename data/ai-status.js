// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-28T02:54:22.867Z",
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
  "at": "2026-11-28T02:58:45.510Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 82,
  "lines": 74,
  "usage": {
   "calls": 82,
   "input": 126293,
   "output": 5247,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.015
  }
 },
 "daily": {
  "at": "2026-11-28T02:55:44.024Z",
  "T": "2026-11-27",
  "basis": {
   "kr": "2026-11-27",
   "us": "2026-11-27"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-28T02:58:45.387Z",
   "basis": {
    "kr": "2026-11-27",
    "us": "2026-11-27"
   },
   "items": {
    "market": {
     "sig": "미국·한국 증시가 11/27 동반 급반등했다. 반일장 미국은 AI·반도체#vdunf4",
     "basis": {
      "kr": "2026-11-27",
      "us": "2026-11-27"
     }
    },
    "liquidity": {
     "sig": "두 나라 모두 단기 유동성 여건은 부정적이다 — 미국은 돈의 흐름이 5년#ydsztz",
     "basis": {
      "kr": "2026-11-27",
      "us": "2026-11-27"
     }
    },
    "indexNotes": {
     "sig": "하락세 속 반등 시도 — 구름 아래·전환선<기준선, 머리위 매물 86%,#1askxvb",
     "basis": {
      "kr": "2026-11-27",
      "us": "2026-11-27"
     }
    },
    "topPicks": {
     "sig": "주식 수를 연 2.9% 줄이고 배당을 이어 가는 주주환원 쪽과 예상 이익#lnh1tv",
     "basis": {
      "kr": "2026-11-27",
      "us": "2026-11-27"
     }
    }
   }
  },
  "inputs": {
   "market": "1gamfu2",
   "indexNotes": "1l0aols"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "두 나라 모두 단기 유동성 여건은 부정적이다 — 미국은 돈의 흐름이 5년#ydsztz",
   "indexNotes": "하락세 속 반등 시도 — 구름 아래·전환선<기준선, 머리위 매물 86%,#1askxvb",
   "market": "미국·한국 증시가 11/27 동반 급반등했다. 반일장 미국은 AI·반도체#vdunf4",
   "topPicks": "주식 수를 연 2.9% 줄이고 배당을 이어 가는 주주환원 쪽과 예상 이익#lnh1tv"
  },
  "sources": 36,
  "usage": {
   "calls": 2,
   "input": 347512,
   "output": 16830,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.727
  }
 }
};
