// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-06T06:49:22.884Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 3,
  "judged": 3,
  "items": [
   {
    "g": "korea|growth",
    "t": "267260",
    "name": "HD현대일렉트릭",
    "verdict": "형식"
   },
   {
    "g": "korea|growth",
    "t": "298040",
    "name": "효성중공업",
    "verdict": "형식"
   },
   {
    "g": "korea|value",
    "t": "001120",
    "name": "LX인터내셔널",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 6,
   "input": 113163,
   "output": 5109,
   "cacheRead": 0,
   "searches": 9,
   "usd": 0.277
  }
 },
 "news": {
  "at": "2026-11-06T06:55:18.071Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 101,
  "fetched": 101,
  "called": 70,
  "lines": 77,
  "usage": {
   "calls": 70,
   "input": 118241,
   "output": 5155,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.014
  }
 },
 "daily": {
  "at": "2026-11-06T06:52:22.741Z",
  "T": "2026-11-06",
  "basis": {
   "kr": "2026-11-06",
   "us": "2026-11-05"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-06T06:55:17.944Z",
   "items": {
    "market": {
     "sig": "미국 AI·반도체주 급락이 하루 만에 한국으로 번졌다. 11/05 나스닥#tcfqd6",
     "basis": {
      "kr": "2026-11-06",
      "us": "2026-11-05"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대와 AI주 급락이 누르#1lswux8",
     "basis": {
      "kr": "2026-11-06",
      "us": "2026-11-05"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 30.8로 과매도 근접#15kdhok",
     "basis": {
      "kr": "2026-11-06",
      "us": "2026-11-05"
     }
    },
    "topPicks": {
     "sig": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #662s7h",
     "basis": {
      "kr": "2026-11-06",
      "us": "2026-11-05"
     }
    }
   }
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대와 AI주 급락이 누르#1lswux8",
   "indexNotes": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 30.8로 과매도 근접#15kdhok",
   "market": "미국 AI·반도체주 급락이 하루 만에 한국으로 번졌다. 11/05 나스닥#tcfqd6",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #662s7h"
  },
  "sources": 37,
  "usage": {
   "calls": 3,
   "input": 220799,
   "output": 19135,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.266
  }
 }
};
