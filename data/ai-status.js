// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-13T01:15:13.717Z",
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
  "at": "2026-11-13T01:19:06.564Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 83,
  "lines": 76,
  "usage": {
   "calls": 83,
   "input": 130325,
   "output": 5635,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-11-13T01:16:26.985Z",
  "T": "2026-11-12",
  "basis": {
   "kr": "2026-11-12",
   "us": "2026-11-12"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-13T01:19:06.433Z",
   "basis": {
    "kr": "2026-11-12",
    "us": "2026-11-12"
   },
   "items": {
    "market": {
     "sig": "엔비디아 젠슨 황 CEO의 갑작스러운 사임과 국채 금리 급등이 겹쳐 11#qnkj7",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-12"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 들어오는 쪽이지만 연준 인상 기대와 금리 급등이 겹친#1cyzo21",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-12"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 구름 아래, 전환선이 기준선 아래이고 RSI 39.9로 과매도#1exdhv2",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-12"
     }
    },
    "topPicks": {
     "sig": "순이익의 50% 이상을 배당과 자사주 매입·소각으로 돌려주는 원칙을 지켜#1oqk2yk",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-12"
     }
    }
   }
  },
  "inputs": {
   "market": "1t7ewp0",
   "indexNotes": "qbexh2"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 들어오는 쪽이지만 연준 인상 기대와 금리 급등이 겹친#1cyzo21",
   "indexNotes": "하락세 — 구름 아래, 전환선이 기준선 아래이고 RSI 39.9로 과매도#1exdhv2",
   "market": "엔비디아 젠슨 황 CEO의 갑작스러운 사임과 국채 금리 급등이 겹쳐 11#qnkj7",
   "topPicks": "순이익의 50% 이상을 배당과 자사주 매입·소각으로 돌려주는 원칙을 지켜#1oqk2yk"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 322876,
   "output": 15122,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.594
  },
  "note": "새 종가로 세션 문장 갱신: market, indexNotes"
 }
};
