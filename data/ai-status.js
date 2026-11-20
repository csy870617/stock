// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-20T07:21:11.005Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "korea|core",
    "t": "402340",
    "name": "SK스퀘어",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 37192,
   "output": 1861,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.093
  }
 },
 "news": {
  "at": "2026-11-20T07:25:21.244Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 98,
  "fetched": 98,
  "called": 58,
  "lines": 75,
  "usage": {
   "calls": 58,
   "input": 106631,
   "output": 4526,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.013
  }
 },
 "daily": {
  "at": "2026-11-20T07:22:53.490Z",
  "T": "2026-11-20",
  "basis": {
   "kr": "2026-11-20",
   "us": "2026-11-19"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-20T07:25:21.163Z",
   "basis": {
    "kr": "2026-11-20",
    "us": "2026-11-19"
   },
   "items": {
    "market": {
     "sig": "미국 증시가 6거래일 연속 하락한 뒤 한국 증시는 매도 사이드카가 발동되#1n2g96h",
     "basis": {
      "kr": "2026-11-20",
      "us": "2026-11-19"
     }
    },
    "liquidity": {
     "sig": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신#nleijn",
     "basis": {
      "kr": "2026-11-20",
      "us": "2026-11-19"
     }
    },
    "indexNotes": {
     "sig": "하락세: 구름 아래, 머리위 매물 86%, RSI 33.8로 과매도 근접#1xkuc3u",
     "basis": {
      "kr": "2026-11-20",
      "us": "2026-11-19"
     }
    },
    "topPicks": {
     "sig": "7월 300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #3xc4hj",
     "basis": {
      "kr": "2026-11-20",
      "us": "2026-11-19"
     }
    }
   }
  },
  "inputs": {
   "market": "1ezu7vp",
   "indexNotes": "pu0lx7"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈이 들어오는 흐름이지만 연준 인상 경로와 극도의 공포가 겹친 신#nleijn",
   "indexNotes": "하락세: 구름 아래, 머리위 매물 86%, RSI 33.8로 과매도 근접#1xkuc3u",
   "market": "미국 증시가 6거래일 연속 하락한 뒤 한국 증시는 매도 사이드카가 발동되#1n2g96h",
   "topPicks": "7월 300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 #3xc4hj"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 322624,
   "output": 14356,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.578
  }
 }
};
