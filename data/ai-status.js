// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-02T16:36:00.122Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 3,
  "judged": 3,
  "items": [
   {
    "g": "us|core",
    "t": "V",
    "name": "Visa",
    "verdict": "형식"
   },
   {
    "g": "us|growth",
    "t": "AMZN",
    "name": "Amazon",
    "verdict": "형식"
   },
   {
    "g": "us|value",
    "t": "GD",
    "name": "General Dynamics",
    "verdict": "없음"
   }
  ],
  "usage": {
   "calls": 6,
   "input": 115777,
   "output": 4809,
   "cacheRead": 0,
   "searches": 9,
   "usd": 0.28
  }
 },
 "news": {
  "at": "2026-11-02T16:38:55.479Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 93,
  "lines": 77,
  "usage": {
   "calls": 93,
   "input": 134821,
   "output": 5709,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-10-30T23:57:41.448Z",
  "T": "2026-10-30",
  "basis": {
   "kr": "2026-10-30",
   "us": "2026-10-30"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-02T16:38:55.373Z",
   "items": {
    "market": {
     "sig": "11/2 코스피가 +2.24% 반등한 5,859.08, 코스닥이 +1.3#10xmq59",
     "basis": {
      "kr": "2026-11-02",
      "us": "2026-10-30"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름 점수가 최근 5년 상위권이지만 연준 인상 기대가 누르는#2dn5tm",
     "basis": {
      "kr": "2026-11-02",
      "us": "2026-10-30"
     }
    },
    "indexNotes": {
     "sig": "횡보: 일봉 구름 아래·전환<기준, RSI 44.2 중립. MACD가 시#1mpfabo",
     "basis": {
      "kr": "2026-11-02",
      "us": "2026-10-30"
     }
    },
    "topPicks": {
     "sig": "자사주 매입·소각으로 주식 수가 한 해 5% 줄었고, 결산 배당을 크게 #q6lqah",
     "basis": {
      "kr": "2026-10-30",
      "us": "2026-10-30"
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
   "liquidity": "미국은 돈의 흐름 점수가 최근 5년 상위권이지만 연준 인상 기대가 이를 #194m558",
   "indexNotes": "횡보: 일봉 구름 아래·전환<기준이고 RSI는 40.7입니다. MACD는#10wcqzw",
   "market": "인텔과 아마존 실적이 AI 투자 수익성 우려를 키우면서 10/30 나스닥#bcafu8"
  },
  "sources": 40,
  "usage": {
   "calls": 3,
   "input": 344377,
   "output": 19064,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.759
  },
  "checkedAt": "2026-11-02T16:38:55.373Z",
  "skipped": "오늘(2026-11-02) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
