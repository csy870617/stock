// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-09T16:54:15.171Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "korea|value",
    "t": "066570",
    "name": "LG전자",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 26832,
   "output": 1392,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.068
  }
 },
 "news": {
  "at": "2026-11-09T16:55:54.735Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 98,
  "fetched": 98,
  "called": 91,
  "lines": 71,
  "usage": {
   "calls": 91,
   "input": 130285,
   "output": 6157,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-07T00:17:50.266Z",
  "T": "2026-11-06",
  "basis": {
   "kr": "2026-11-06",
   "us": "2026-11-06"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-09T16:55:54.609Z",
   "basis": {
    "kr": "2026-11-09",
    "us": "2026-11-06"
   },
   "items": {
    "market": {
     "sig": "미국은 11/06 고용 호조와 반도체 반등으로 나스닥이 +1.09% 올랐#k3ojf1",
     "basis": {
      "kr": "2026-11-09",
      "us": "2026-11-06"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대와 극도의 공포가 겹친#40bhrv",
     "basis": {
      "kr": "2026-11-09",
      "us": "2026-11-06"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 30.3으로 과매도 근#7xxps1",
     "basis": {
      "kr": "2026-11-09",
      "us": "2026-11-06"
     }
    },
    "topPicks": {
     "sig": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #1vgjl7g",
     "basis": {
      "kr": "2026-11-09",
      "us": "2026-11-06"
     }
    }
   }
  },
  "wrote": [
   "liquidity"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 소폭 들어오지만 연준 인상 기대와 극도의 공포가 겹친#mkipsk",
   "indexNotes": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 30.8로 과매도 근접#15kdhok",
   "market": "미국 AI·반도체주 급락이 하루 만에 한국으로 번졌다. 11/05 나스닥#tcfqd6",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #662s7h"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 345124,
   "output": 19833,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.777
  },
  "checkedAt": "2026-11-09T16:55:54.609Z",
  "inputs": {},
  "skipped": "오늘(2026-11-09) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
