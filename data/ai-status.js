// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-19T04:17:25.261Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 3,
  "judged": 3,
  "items": [
   {
    "g": "korea|value",
    "t": "241560",
    "name": "두산밥캣",
    "verdict": "형식"
   },
   {
    "g": "korea|value",
    "t": "066570",
    "name": "LG전자",
    "verdict": "형식"
   },
   {
    "g": "korea|value",
    "t": "086280",
    "name": "현대글로비스",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 6,
   "input": 103336,
   "output": 4522,
   "cacheRead": 0,
   "searches": 9,
   "usd": 0.252
  }
 },
 "news": {
  "at": "2026-11-19T04:22:40.556Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 90,
  "lines": 76,
  "usage": {
   "calls": 90,
   "input": 141403,
   "output": 6409,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-11-19T04:20:14.326Z",
  "T": "2026-11-18",
  "basis": {
   "kr": "2026-11-18",
   "us": "2026-11-18"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-19T04:22:40.478Z",
   "basis": {
    "kr": "2026-11-18",
    "us": "2026-11-18"
   },
   "items": {
    "market": {
     "sig": "미국은 연준 추가 인상 기대에 S&P500이 5거래일 연속 내렸고, 한국#1vov2eq",
     "basis": {
      "kr": "2026-11-18",
      "us": "2026-11-18"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신#givhqj",
     "basis": {
      "kr": "2026-11-18",
      "us": "2026-11-18"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래, 전환선<기준선, RSI 36.5로 과매도 근#okk2s4",
     "basis": {
      "kr": "2026-11-18",
      "us": "2026-11-18"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#1ldlqpb",
     "basis": {
      "kr": "2026-11-18",
      "us": "2026-11-17"
     }
    }
   }
  },
  "inputs": {
   "market": "1ryqoo9",
   "indexNotes": "g533nf"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신#givhqj",
   "indexNotes": "하락세 — 일봉 구름 아래, 전환선<기준선, RSI 36.5로 과매도 근#okk2s4",
   "market": "미국은 연준 추가 인상 기대에 S&P500이 5거래일 연속 내렸고, 한국#1vov2eq",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#1ldlqpb"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 326668,
   "output": 13434,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.575
  },
  "note": "새 종가로 세션 문장 갱신: market, indexNotes"
 }
};
