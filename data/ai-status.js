// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-30T13:34:38.866Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 6,
  "judged": 6,
  "items": [
   {
    "g": "us|core",
    "t": "MA",
    "name": "Mastercard",
    "verdict": "없음"
   },
   {
    "g": "us|core",
    "t": "LLY",
    "name": "Eli Lilly",
    "verdict": "없음"
   },
   {
    "g": "us|growth",
    "t": "AMZN",
    "name": "Amazon",
    "verdict": "형식"
   },
   {
    "g": "us|value",
    "t": "AMP",
    "name": "Ameriprise Financial",
    "verdict": "형식"
   },
   {
    "g": "us|dividend",
    "t": "WEC",
    "name": "WEC Energy Group",
    "verdict": "없음"
   },
   {
    "g": "us|rising",
    "t": "FSS",
    "name": "Federal Signal",
    "verdict": "실질"
   }
  ],
  "usage": {
   "calls": 13,
   "input": 177373,
   "output": 9267,
   "cacheRead": 0,
   "searches": 18,
   "usd": 0.447
  }
 },
 "news": {
  "at": "2026-10-30T13:40:38.698Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 98,
  "lines": 87,
  "usage": {
   "calls": 98,
   "input": 147948,
   "output": 9299,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.019
  }
 },
 "daily": {
  "at": "2026-10-30T13:37:19.550Z",
  "T": "2026-10-30",
  "basis": {
   "kr": "2026-10-30",
   "us": "2026-10-29"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-30T13:40:38.621Z",
   "items": {
    "market": {
     "sig": "미국 빅테크 실적 실망이 AI 투자 수익성 우려로 번지면서 10/29 나#tre7ru",
     "basis": {
      "kr": "2026-10-30",
      "us": "2026-10-29"
     }
    },
    "liquidity": {
     "sig": "연준 인상 기대와 10년물 4.99%가 미국 유동성을 누르고, 한국은 코#am1g0g",
     "basis": {
      "kr": "2026-10-30",
      "us": "2026-10-29"
     }
    },
    "indexNotes": {
     "sig": "횡보 — 일목 구름 아래·전환<기준에 RSI 40.7이며, MACD는 시#1a4xl2p",
     "basis": {
      "kr": "2026-10-30",
      "us": "2026-10-29"
     }
    },
    "topPicks": {
     "sig": "자사주 매입·소각으로 주식 수가 한 해 5% 줄었고, 결산 배당을 크게 #c4r3cm",
     "basis": {
      "kr": "2026-10-30",
      "us": "2026-10-29"
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
   "liquidity": "연준 인상 기대와 10년물 4.99%가 미국 유동성을 누르고, 한국은 코#am1g0g",
   "indexNotes": "횡보 — 일목 구름 아래·전환<기준에 RSI 40.7이며, MACD는 시#1a4xl2p",
   "market": "미국 빅테크 실적 실망이 AI 투자 수익성 우려로 번지면서 10/29 나#tre7ru"
  },
  "sources": 38,
  "usage": {
   "calls": 3,
   "input": 167249,
   "output": 21351,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.096
  }
 }
};
