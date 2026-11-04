// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-04T14:52:34.556Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "us|growth",
    "t": "ANET",
    "name": "Arista Networks",
    "verdict": "없음"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 26468,
   "output": 1358,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.067
  }
 },
 "news": {
  "at": "2026-11-04T14:57:52.651Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 85,
  "lines": 75,
  "usage": {
   "calls": 85,
   "input": 133214,
   "output": 5173,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-04T14:54:41.273Z",
  "T": "2026-11-04",
  "basis": {
   "kr": "2026-11-04",
   "us": "2026-11-03"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-04T14:57:52.530Z",
   "items": {
    "market": {
     "sig": "미국 중간선거 개표가 양국 증시의 변동성을 키웠다. 11/03 미국은 반#c90fly",
     "basis": {
      "kr": "2026-11-04",
      "us": "2026-11-03"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면이고, 한국은 #1x7btt7",
     "basis": {
      "kr": "2026-11-04",
      "us": "2026-11-03"
     }
    },
    "indexNotes": {
     "sig": "하락세다. 일목 구름 아래에서 전환선이 기준선 밑에 있고 RSI는 41.#bhwosx",
     "basis": {
      "kr": "2026-11-04",
      "us": "2026-11-03"
     }
    },
    "topPicks": {
     "sig": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7#1j0c3hg",
     "basis": {
      "kr": "2026-11-04",
      "us": "2026-11-03"
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
   "liquidity": "미국은 돈이 들어오지만 연준 인상 기대가 누르는 신중 국면이고, 한국은 #1x7btt7",
   "indexNotes": "하락세다. 일목 구름 아래에서 전환선이 기준선 밑에 있고 RSI는 41.#bhwosx",
   "market": "미국 중간선거 개표가 양국 증시의 변동성을 키웠다. 11/03 미국은 반#c90fly",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7#1fcw392"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 312325,
   "output": 19590,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.641
  }
 }
};
