// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-23T18:47:04.392Z",
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
  "at": "2026-11-23T18:48:35.884Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 90,
  "lines": 67,
  "usage": {
   "calls": 90,
   "input": 132659,
   "output": 5810,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-21T03:17:19.709Z",
  "T": "2026-11-20",
  "basis": {
   "kr": "2026-11-20",
   "us": "2026-11-20"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-23T18:48:35.798Z",
   "basis": {
    "kr": "2026-11-23",
    "us": "2026-11-20"
   },
   "items": {
    "market": {
     "sig": "AI 대형주 매도와 연준 인상 경로가 미국·한국 증시를 함께 끌어내렸다.#fyy27n",
     "basis": {
      "kr": "2026-11-23",
      "us": "2026-11-20"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름이지만 극도의 공포와 12월 인상 확률 96%가#17qu8kt",
     "basis": {
      "kr": "2026-11-23",
      "us": "2026-11-20"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 구름 아래, 음운, MACD 시그널 하회, RSI 31.2로 #bng7di",
     "basis": {
      "kr": "2026-11-23",
      "us": "2026-11-20"
     }
    },
    "topPicks": {
     "sig": "7월 발표한 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주#hnze42",
     "basis": {
      "kr": "2026-11-23",
      "us": "2026-11-20"
     }
    }
   }
  },
  "inputs": {
   "market": "8whxaw",
   "indexNotes": "tv8pfe"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름이지만 극도의 공포와 연준 인상 경로가 겹쳐 단#ml2bnp",
   "indexNotes": "하락세 — 구름 아래, MACD 시그널 하회, RSI 33.8로 과매도 #1lzrz0k",
   "market": "AI 대형주 매도가 미국·한국 증시를 함께 끌어내렸다. 11월 20일 코#4cuhte",
   "topPicks": "7월 발표한 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주#1tu7kx8"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 364734,
   "output": 18719,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.833
  },
  "note": "새 종가로 세션 문장 갱신: market, indexNotes",
  "checkedAt": "2026-11-23T18:48:35.798Z",
  "skipped": "오늘(2026-11-23) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
