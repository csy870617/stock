// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-05T06:49:29.588Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 5,
  "judged": 5,
  "items": [
   {
    "g": "korea|core",
    "t": "000660",
    "name": "SK하이닉스",
    "verdict": "보호"
   },
   {
    "g": "korea|core",
    "t": "042700",
    "name": "한미반도체",
    "verdict": "형식"
   },
   {
    "g": "korea|growth",
    "t": "010120",
    "name": "LS ELECTRIC",
    "verdict": "없음"
   },
   {
    "g": "korea|growth",
    "t": "103590",
    "name": "일진전기",
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
   "calls": 11,
   "input": 240806,
   "output": 9922,
   "cacheRead": 0,
   "searches": 15,
   "usd": 0.581
  }
 },
 "news": {
  "at": "2026-11-05T06:56:28.203Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 99,
  "fetched": 99,
  "called": 61,
  "lines": 77,
  "usage": {
   "calls": 61,
   "input": 107529,
   "output": 4480,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.013
  }
 },
 "daily": {
  "at": "2026-11-05T06:53:21.143Z",
  "T": "2026-11-05",
  "basis": {
   "kr": "2026-11-05",
   "us": "2026-11-04"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-05T06:56:28.104Z",
   "items": {
    "market": {
     "sig": "미국과 한국 증시가 정반대로 움직였다. 미국은 중간선거에서 민주당이 상·#4iigc2",
     "basis": {
      "kr": "2026-11-05",
      "us": "2026-11-04"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 소폭 들어오지만 연준 추가 인상 기대가 누르는 신중 국면, #1tc7ut3",
     "basis": {
      "kr": "2026-11-05",
      "us": "2026-11-04"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래, 전환선이 기준선 아래이고 RSI 35.5로 #47uh6u",
     "basis": {
      "kr": "2026-11-05",
      "us": "2026-11-04"
     }
    },
    "topPicks": {
     "sig": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #5r68qs",
     "basis": {
      "kr": "2026-11-05",
      "us": "2026-11-04"
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
   "liquidity": "미국은 돈이 소폭 들어오지만 연준 추가 인상 기대가 누르는 신중 국면, #1tc7ut3",
   "indexNotes": "하락세 — 일봉 구름 아래, 전환선이 기준선 아래이고 RSI 35.5로 #47uh6u",
   "market": "미국과 한국 증시가 정반대로 움직였다. 미국은 중간선거에서 민주당이 상·#4iigc2",
   "topPicks": "300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #5r68qs"
  },
  "sources": 28,
  "usage": {
   "calls": 3,
   "input": 164890,
   "output": 19573,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.051
  }
 }
};
