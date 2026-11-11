// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-11T00:45:07.326Z",
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
  "at": "2026-11-11T00:49:13.986Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 77,
  "lines": 69,
  "usage": {
   "calls": 77,
   "input": 121915,
   "output": 4926,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.015
  }
 },
 "daily": {
  "at": "2026-11-11T00:46:34.666Z",
  "T": "2026-11-10",
  "basis": {
   "kr": "2026-11-10",
   "us": "2026-11-10"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-11T00:49:13.899Z",
   "basis": {
    "kr": "2026-11-10",
    "us": "2026-11-10"
   },
   "items": {
    "market": {
     "sig": "10월 물가가 예상보다 높게 나오며 미국 증시는 하락했고, 한국은 사흘 #1nfgprm",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-10"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 중간 수준을 유지하나 물가 상회와 12월 인상 기대가#oqjgfe",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-10"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 4.39% 급반등에도 일봉 구름 아래, 전환선<기준선, RSI#1poa8d7",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-10"
     }
    },
    "topPicks": {
     "sig": "7월 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 #13he0xd",
     "basis": {
      "kr": "2026-11-10",
      "us": "2026-11-09"
     }
    }
   }
  },
  "inputs": {
   "market": "d5nz6c",
   "indexNotes": "fnqdqg"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 중간 수준을 유지하나 물가 상회와 12월 인상 기대가#oqjgfe",
   "indexNotes": "하락세 — 4.39% 급반등에도 일봉 구름 아래, 전환선<기준선, RSI#1poa8d7",
   "market": "10월 물가가 예상보다 높게 나오며 미국 증시는 하락했고, 한국은 사흘 #1nfgprm",
   "topPicks": "7월 300억원 규모 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 #bqj7al"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 315303,
   "output": 15842,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.578
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
