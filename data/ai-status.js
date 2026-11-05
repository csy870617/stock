// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-05T01:02:22.830Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "korea|growth",
    "t": "103590",
    "name": "일진전기",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 26505,
   "output": 1101,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.064
  }
 },
 "news": {
  "at": "2026-11-05T01:07:28.945Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 86,
  "lines": 79,
  "usage": {
   "calls": 86,
   "input": 131369,
   "output": 5686,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-05T01:03:59.586Z",
  "T": "2026-11-04",
  "basis": {
   "kr": "2026-11-04",
   "us": "2026-11-04"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-05T01:07:28.843Z",
   "items": {
    "market": {
     "sig": "미국은 중간선거에서 민주당이 상·하원을 모두 가져가며 정책 변동성이 줄어#ueo7l",
     "basis": {
      "kr": "2026-11-04",
      "us": "2026-11-04"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 소폭 들어오지만 연준 인상 기대가 누르는 신중 국면, 한국은#16vhi95",
     "basis": {
      "kr": "2026-11-04",
      "us": "2026-11-04"
     }
    },
    "indexNotes": {
     "sig": "하락세(매도) — 일봉 구름 아래, 전환선<기준선, RSI 41.1이며 #1xkvc84",
     "basis": {
      "kr": "2026-11-04",
      "us": "2026-11-04"
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
   "liquidity": "미국은 돈이 소폭 들어오지만 연준 인상 기대가 누르는 신중 국면, 한국은#16vhi95",
   "indexNotes": "하락세(매도) — 일봉 구름 아래, 전환선<기준선, RSI 41.1이며 #1xkvc84",
   "market": "미국은 중간선거에서 민주당이 상·하원을 모두 가져가며 정책 변동성이 줄어#ueo7l",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7#1fcw392"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 351370,
   "output": 22666,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.859
  }
 }
};
