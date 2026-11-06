// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-06T01:04:22.577Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 2,
  "judged": 2,
  "items": [
   {
    "g": "korea|core",
    "t": "064400",
    "name": "LG씨엔에스",
    "verdict": "형식"
   },
   {
    "g": "korea|value",
    "t": "066570",
    "name": "LG전자",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 4,
   "input": 71495,
   "output": 3108,
   "cacheRead": 0,
   "searches": 6,
   "usd": 0.174
  }
 },
 "news": {
  "at": "2026-11-06T01:09:37.390Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 101,
  "fetched": 101,
  "called": 87,
  "lines": 77,
  "usage": {
   "calls": 87,
   "input": 137141,
   "output": 5335,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-06T01:06:39.396Z",
  "T": "2026-11-05",
  "basis": {
   "kr": "2026-11-05",
   "us": "2026-11-05"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-06T01:09:37.268Z",
   "items": {
    "market": {
     "sig": "미국 중간선거 민주당 압승 뒤 AI 규제·데이터센터 지연 우려가 번지며 #stq2tg",
     "basis": {
      "kr": "2026-11-05",
      "us": "2026-11-05"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 소폭 들어오지만 연준 인상 기대와 AI주 급락이 누르는 신중#loggoy",
     "basis": {
      "kr": "2026-11-05",
      "us": "2026-11-05"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래, 전환선<기준선, RSI 35.6으로 과매도 #1loya40",
     "basis": {
      "kr": "2026-11-05",
      "us": "2026-11-05"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 약 7#dpm3gu",
     "basis": {
      "kr": "2026-11-05",
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
   "liquidity": "미국은 돈이 소폭 들어오지만 연준 인상 기대와 AI주 급락이 누르는 신중#loggoy",
   "indexNotes": "하락세 — 일봉 구름 아래, 전환선<기준선, RSI 35.6으로 과매도 #1loya40",
   "market": "미국 중간선거 민주당 압승 뒤 AI 규제·데이터센터 지연 우려가 번지며 #stq2tg",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 약 7#dpm3gu"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 192640,
   "output": 18884,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.148
  }
 }
};
