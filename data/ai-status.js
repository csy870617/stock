// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-26T13:31:17.254Z",
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
  "at": "2026-10-26T13:34:08.288Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 97,
  "lines": 75,
  "usage": {
   "calls": 97,
   "input": 135339,
   "output": 6228,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-10-26T13:31:17.400Z",
  "T": "2026-10-26",
  "basis": {
   "kr": "2026-10-26",
   "us": "2026-10-23"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-26T13:34:08.154Z",
   "items": {
    "market": {
     "sig": "코스피가 10/26 외국인 6,955억원 순매도에 1.46% 내린 5,4",
     "basis": {
      "kr": "2026-10-26",
      "us": "2026-10-23"
     }
    },
    "liquidity": {
     "sig": "유가 100달러대와 연준 12월 인상 기대(89%)로 미국은 단기 신중·",
     "basis": {
      "kr": "2026-10-26",
      "us": "2026-10-23"
     }
    },
    "indexNotes": {
     "sig": "하락세(일봉)로 구름 아래·전환<기준이며 RSI 30.1로 과매도에 가깝#1wfqtmp",
     "basis": {
      "kr": "2026-10-26",
      "us": "2026-10-23"
     }
    },
    "topPicks": {
     "sig": "주가가 순자산가치를 밑도는 할인 상태에서 3분기 누적 순이익이 역대 최대",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-22"
     }
    }
   }
  },
  "wrote": [
   "indexNotes"
  ],
  "sig": {
   "liquidity": "유가 100달러 돌파와 연준 12월 인상 기대(86%)로 미국은 단기 신",
   "indexNotes": "하락세(일봉)로 구름 아래·전환<기준이며 RSI 30.1로 과매도에 가깝#1wfqtmp",
   "market": "유가 급등과 AI 투자 지속성 우려가 겹치며 미국 증시는 10/23 다우"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 292090,
   "output": 14617,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.461
  }
 }
};
