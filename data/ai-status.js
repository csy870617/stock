// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-26T03:12:32.750Z",
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
  "at": "2026-11-26T03:17:01.509Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 98,
  "fetched": 98,
  "called": 89,
  "lines": 70,
  "usage": {
   "calls": 89,
   "input": 142147,
   "output": 6304,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-11-26T03:14:35.697Z",
  "T": "2026-11-25",
  "basis": {
   "kr": "2026-11-25",
   "us": "2026-11-25"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-26T03:17:01.375Z",
   "basis": {
    "kr": "2026-11-25",
    "us": "2026-11-25"
   },
   "items": {
    "market": {
     "sig": "AI·반도체 매도와 물가·관세 부담이 겹쳐 한국 증시 충격이 미국보다 훨#1inp9vi",
     "basis": {
      "kr": "2026-11-25",
      "us": "2026-11-25"
     }
    },
    "liquidity": {
     "sig": "미국·한국 모두 돈의 흐름이 빠지는 중이고, 연준·한은 인상 경로와 극도#gntk43",
     "basis": {
      "kr": "2026-11-25",
      "us": "2026-11-25"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일봉 구름 아래, RSI 35.1이다. 지지 4,587 아래로#1i0109q",
     "basis": {
      "kr": "2026-11-25",
      "us": "2026-11-25"
     }
    },
    "topPicks": {
     "sig": "1~3분기 누적 보험손익이 9.8%, 지배주주순이익이 4.6% 늘어 본업#1irg9xc",
     "basis": {
      "kr": "2026-11-25",
      "us": "2026-11-24"
     }
    }
   }
  },
  "inputs": {
   "market": "1wz72xc",
   "indexNotes": "1f3dc30"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국·한국 모두 돈의 흐름이 빠지는 중이고, 연준·한은 인상 경로와 극도#gntk43",
   "indexNotes": "하락세 — 일봉 구름 아래, RSI 35.1이다. 지지 4,587 아래로#1i0109q",
   "market": "AI·반도체 매도와 물가·관세 부담이 겹쳐 한국 증시 충격이 미국보다 훨#1inp9vi",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 약 7.4%#14hr0rr"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 364085,
   "output": 14447,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.745
  }
 }
};
