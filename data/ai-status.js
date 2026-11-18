// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-18T07:31:56.398Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 2,
  "judged": 2,
  "items": [
   {
    "g": "korea|core",
    "t": "207940",
    "name": "삼성바이오로직스",
    "verdict": "형식"
   },
   {
    "g": "korea|dividend",
    "t": "005850",
    "name": "에스엘",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 4,
   "input": 53468,
   "output": 2727,
   "cacheRead": 0,
   "searches": 6,
   "usd": 0.134
  }
 },
 "news": {
  "at": "2026-11-18T07:37:09.548Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 61,
  "lines": 81,
  "usage": {
   "calls": 61,
   "input": 104908,
   "output": 4885,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.013
  }
 },
 "daily": {
  "at": "2026-11-18T07:34:08.331Z",
  "T": "2026-11-18",
  "basis": {
   "kr": "2026-11-18",
   "us": "2026-11-17"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-18T07:37:09.415Z",
   "basis": {
    "kr": "2026-11-18",
    "us": "2026-11-17"
   },
   "items": {
    "market": {
     "sig": "미국은 엔비디아 실적 경계와 금리 인상 우려로 11/17 다우가 1.64#11fk77g",
     "basis": {
      "kr": "2026-11-18",
      "us": "2026-11-17"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름에 연준 인상 경로와 극도의 공포가 겹친 신중 #11dzkvl",
     "basis": {
      "kr": "2026-11-18",
      "us": "2026-11-17"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래, 전환선<기준선, RSI 36.5다. 이번 상#109w3r4",
     "basis": {
      "kr": "2026-11-18",
      "us": "2026-11-17"
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
   "market": "b2z09j",
   "indexNotes": "mt14fp"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름에 연준 인상 경로와 극도의 공포가 겹친 신중 #11dzkvl",
   "indexNotes": "하락세 — 일봉 구름 아래, 전환선<기준선, RSI 36.5다. 이번 상#109w3r4",
   "market": "미국은 엔비디아 실적 경계와 금리 인상 우려로 11/17 다우가 1.64#11fk77g",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#1ldlqpb"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 445578,
   "output": 15200,
   "cacheRead": 0,
   "searches": 6,
   "usd": 2.086
  }
 }
};
