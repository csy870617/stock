// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-16T16:25:13.891Z",
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
  "at": "2026-11-16T16:26:25.041Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 91,
  "lines": 72,
  "usage": {
   "calls": 91,
   "input": 134369,
   "output": 5562,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-14T00:58:47.217Z",
  "T": "2026-11-13",
  "basis": {
   "kr": "2026-11-13",
   "us": "2026-11-13"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-16T16:26:24.917Z",
   "basis": {
    "kr": "2026-11-16",
    "us": "2026-11-13"
   },
   "items": {
    "market": {
     "sig": "11/16 코스피는 반도체 대형주 매도와 외국인·연기금 순매도로 -3.5#18uut07",
     "basis": {
      "kr": "2026-11-16",
      "us": "2026-11-13"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름이지만 12월 인상 기대와 10년물 5.15%가#d59pzm",
     "basis": {
      "kr": "2026-11-16",
      "us": "2026-11-13"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 35.5 과매도 근접,#w6ezc1",
     "basis": {
      "kr": "2026-11-16",
      "us": "2026-11-13"
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
   "market": "3zcp1s",
   "indexNotes": "1cbc9ns"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름이지만 연준 인상 기대와 10년물 5.15%가 #1fe3j7e",
   "indexNotes": "하락세 — 일봉 구름 아래·전환선<기준선, RSI 38.9 과매도 근접,#hd0dn",
   "market": "엔비디아 젠슨 황 CEO 사임 여파로 반도체주가 다시 밀리며 11/13 #1dy48km",
   "topPicks": "순이익의 50% 이상을 배당과 자사주 매입·소각으로 돌려주는 원칙으로 2#181anqq"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 240348,
   "output": 16003,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.281
  },
  "note": "새 종가로 세션 문장 갱신: market, indexNotes",
  "checkedAt": "2026-11-16T16:26:24.917Z",
  "skipped": "오늘(2026-11-16) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
