// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-18T02:33:17.613Z",
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
  "at": "2026-11-18T02:37:38.981Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 90,
  "lines": 75,
  "usage": {
   "calls": 90,
   "input": 138559,
   "output": 6251,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-11-18T02:34:53.651Z",
  "T": "2026-11-17",
  "basis": {
   "kr": "2026-11-17",
   "us": "2026-11-17"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-18T02:37:38.880Z",
   "basis": {
    "kr": "2026-11-17",
    "us": "2026-11-17"
   },
   "items": {
    "market": {
     "sig": "미국·한국 증시가 함께 밀렸고 낙폭은 한국이 더 컸다. 다우 -1.64%#bkdj5m",
     "basis": {
      "kr": "2026-11-17",
      "us": "2026-11-17"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름에 연준 인상 경로가 겹친 신중 국면이고, 한국#n8g78o",
     "basis": {
      "kr": "2026-11-17",
      "us": "2026-11-17"
     }
    },
    "indexNotes": {
     "sig": "하락세. 일목 구름 아래에 있고 RSI(14)는 33.2다. 위쪽에 거래#9wq8z9",
     "basis": {
      "kr": "2026-11-17",
      "us": "2026-11-17"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수 누적 감소율이#l1b2q7",
     "basis": {
      "kr": "2026-11-17",
      "us": "2026-11-17"
     }
    }
   }
  },
  "inputs": {
   "market": "1hwpzey",
   "indexNotes": "13j6liy"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름에 연준 인상 경로가 겹친 신중 국면이고, 한국#n8g78o",
   "indexNotes": "하락세. 일목 구름 아래에 있고 RSI(14)는 33.2다. 위쪽에 거래#9wq8z9",
   "market": "미국·한국 증시가 함께 밀렸고 낙폭은 한국이 더 컸다. 다우 -1.64%#bkdj5m",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수 누적 감소율이#l1b2q7"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 356905,
   "output": 15318,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.734
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
