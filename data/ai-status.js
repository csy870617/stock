// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-17T03:01:16.196Z",
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
  "at": "2026-11-17T03:05:38.355Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 79,
  "lines": 70,
  "usage": {
   "calls": 79,
   "input": 122306,
   "output": 4679,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.015
  }
 },
 "daily": {
  "at": "2026-11-17T03:02:36.221Z",
  "T": "2026-11-16",
  "basis": {
   "kr": "2026-11-16",
   "us": "2026-11-16"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-17T03:05:38.214Z",
   "basis": {
    "kr": "2026-11-16",
    "us": "2026-11-16"
   },
   "items": {
    "market": {
     "sig": "엔비디아 급락과 미국의 대중국 AI 칩 규제 강화가 겹치며 16일 미국·#uittd3",
     "basis": {
      "kr": "2026-11-16",
      "us": "2026-11-16"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름이지만 12월 인상 기대와 10년물 5%대가 겹#1n6pm3g",
     "basis": {
      "kr": "2026-11-16",
      "us": "2026-11-16"
     }
    },
    "indexNotes": {
     "sig": "하락세(매도) — 일봉 구름 아래·전환선<기준선, RSI 35.5로 과매#1948lr3",
     "basis": {
      "kr": "2026-11-16",
      "us": "2026-11-16"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 약 7#bbf5qf",
     "basis": {
      "kr": "2026-11-16",
      "us": "2026-11-13"
     }
    }
   }
  },
  "inputs": {
   "market": "1atgd5e",
   "indexNotes": "1yf5hny"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름이지만 12월 인상 기대와 10년물 5%대가 겹#1n6pm3g",
   "indexNotes": "하락세(매도) — 일봉 구름 아래·전환선<기준선, RSI 35.5로 과매#1948lr3",
   "market": "엔비디아 급락과 미국의 대중국 AI 칩 규제 강화가 겹치며 16일 미국·#uittd3",
   "topPicks": "순이익의 50% 이상을 배당과 자사주 매입·소각으로 돌려주는 원칙으로 2#181anqq"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 361159,
   "output": 15792,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.76
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
