// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-24T04:53:18.390Z",
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
  "at": "2026-11-24T04:57:49.943Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 67,
  "lines": 68,
  "usage": {
   "calls": 67,
   "input": 116215,
   "output": 5177,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.014
  }
 },
 "daily": {
  "at": "2026-11-24T04:54:43.645Z",
  "T": "2026-11-23",
  "basis": {
   "kr": "2026-11-23",
   "us": "2026-11-23"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-24T04:57:49.853Z",
   "basis": {
    "kr": "2026-11-23",
    "us": "2026-11-23"
   },
   "items": {
    "market": {
     "sig": "엔비디아 이사회의 젠슨 황 CEO 복귀 결정으로 11/23 나스닥이 6.#1l58u8l",
     "basis": {
      "kr": "2026-11-23",
      "us": "2026-11-23"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 보통이지만 극도의 공포와 연준 인상 경로가 겹쳐 단기#1atwgz",
     "basis": {
      "kr": "2026-11-23",
      "us": "2026-11-23"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래, RSI 31.2로 과매도 근접이고 머리 위 #1r4y26",
     "basis": {
      "kr": "2026-11-23",
      "us": "2026-11-23"
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
   "market": "kmxv3h",
   "indexNotes": "vyqfmd"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 보통이지만 극도의 공포와 연준 인상 경로가 겹쳐 단기#1atwgz",
   "indexNotes": "하락세 — 일봉 구름 아래, RSI 31.2로 과매도 근접이고 머리 위 #1r4y26",
   "market": "엔비디아 이사회의 젠슨 황 CEO 복귀 결정으로 11/23 나스닥이 6.#1l58u8l",
   "topPicks": "7월 발표한 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주#1tu7kx8"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 317076,
   "output": 17264,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.614
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
