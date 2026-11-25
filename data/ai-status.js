// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-25T03:40:42.125Z",
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
  "at": "2026-11-25T03:44:39.466Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 98,
  "fetched": 98,
  "called": 83,
  "lines": 67,
  "usage": {
   "calls": 83,
   "input": 134572,
   "output": 5482,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-25T03:41:49.715Z",
  "T": "2026-11-24",
  "basis": {
   "kr": "2026-11-24",
   "us": "2026-11-24"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-25T03:44:39.362Z",
   "basis": {
    "kr": "2026-11-24",
    "us": "2026-11-24"
   },
   "items": {
    "market": {
     "sig": "11/24 한국은 엔비디아 젠슨 황 복귀 소식에 반도체가 급등하며 코스피#ajluiq",
     "basis": {
      "kr": "2026-11-24",
      "us": "2026-11-24"
     }
    },
    "liquidity": {
     "sig": "미국·한국 모두 돈의 흐름이 빠지는 중이고, 연준·한은 인상 경로와 극도#frlocm",
     "basis": {
      "kr": "2026-11-24",
      "us": "2026-11-24"
     }
    },
    "indexNotes": {
     "sig": "하락세. 일봉 구름 아래·전환<기준·MACD 시그널 하회, 머리 위 매물#v63es",
     "basis": {
      "kr": "2026-11-24",
      "us": "2026-11-24"
     }
    },
    "topPicks": {
     "sig": "7월 발표한 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주#2u215m",
     "basis": {
      "kr": "2026-11-24",
      "us": "2026-11-23"
     }
    }
   }
  },
  "inputs": {
   "market": "p02bq0",
   "indexNotes": "1flbt2s"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국·한국 모두 돈의 흐름이 빠지는 중이고, 연준·한은 인상 경로와 극도#frlocm",
   "indexNotes": "하락세. 일봉 구름 아래·전환<기준·MACD 시그널 하회, 머리 위 매물#v63es",
   "market": "11/24 한국은 엔비디아 젠슨 황 복귀 소식에 반도체가 급등하며 코스피#ajluiq",
   "topPicks": "7월 발표한 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주#1tu7kx8"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 563498,
   "output": 16203,
   "cacheRead": 0,
   "searches": 6,
   "usd": 2.578
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
