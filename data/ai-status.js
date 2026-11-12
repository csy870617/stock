// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-11-12T07:13:23.443Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 3,
  "judged": 3,
  "items": [
   {
    "g": "korea|core",
    "t": "000810",
    "name": "삼성화재",
    "verdict": "형식"
   },
   {
    "g": "korea|value",
    "t": "138040",
    "name": "메리츠금융지주",
    "verdict": "형식"
   },
   {
    "g": "korea|dividend",
    "t": "005830",
    "name": "DB손해보험",
    "verdict": "없음"
   }
  ],
  "usage": {
   "calls": 6,
   "input": 160759,
   "output": 6378,
   "cacheRead": 0,
   "searches": 9,
   "usd": 0.385
  }
 },
 "news": {
  "at": "2026-11-12T07:18:38.908Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 97,
  "fetched": 97,
  "called": 59,
  "lines": 77,
  "usage": {
   "calls": 59,
   "input": 107331,
   "output": 4525,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.013
  }
 },
 "daily": {
  "at": "2026-11-12T07:16:13.974Z",
  "T": "2026-11-12",
  "basis": {
   "kr": "2026-11-12",
   "us": "2026-11-11"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-11-12T07:18:38.824Z",
   "basis": {
    "kr": "2026-11-12",
    "us": "2026-11-11"
   },
   "items": {
    "market": {
     "sig": "미국은 코어위브 호실적과 엔비디아 반등으로 AI 투자 신뢰가 살아나며 나#cpf7du",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-11"
     }
    },
    "liquidity": {
     "sig": "미국은 돈의 흐름이 중간 수준이나 12월 인상 기대와 금융여건 긴축이 겹#vw1x5u",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-11"
     }
    },
    "indexNotes": {
     "sig": "하락세 — 일목 구름 아래, 전환선이 기준선 아래, RSI 39.9로 과#epp12z",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-11"
     }
    },
    "topPicks": {
     "sig": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 약 7#wk7mvj",
     "basis": {
      "kr": "2026-11-12",
      "us": "2026-11-11"
     }
    }
   }
  },
  "inputs": {
   "market": "misfhx",
   "indexNotes": "1cekkjr"
  },
  "wrote": [
   "liquidity",
   "indexNotes",
   "market",
   "topPicks"
  ],
  "sig": {
   "liquidity": "미국은 돈의 흐름이 중간 수준이나 12월 인상 기대와 금융여건 긴축이 겹#vw1x5u",
   "indexNotes": "하락세 — 일목 구름 아래, 전환선이 기준선 아래, RSI 39.9로 과#epp12z",
   "market": "미국은 코어위브 호실적과 엔비디아 반등으로 AI 투자 신뢰가 살아나며 나#cpf7du",
   "topPicks": "300억원 자사주 매입을 마쳐 밸류업 계획 이후 유통주식수가 누적 약 7#wk7mvj"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 276219,
   "output": 13927,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.383
  }
 }
};
