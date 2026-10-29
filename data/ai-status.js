// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-29T00:07:16.818Z",
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
  "at": "2026-10-29T00:10:55.261Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 91,
  "lines": 89,
  "usage": {
   "calls": 91,
   "input": 135045,
   "output": 6951,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-10-29T00:07:31.365Z",
  "T": "2026-10-28",
  "basis": {
   "kr": "2026-10-28",
   "us": "2026-10-28"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-29T00:10:55.137Z",
   "items": {
    "market": {
     "sig": "반도체 실적이 한·미 증시를 함께 끌어올렸지만 상승 폭은 크게 달랐습니다#1ch5uha",
     "basis": {
      "kr": "2026-10-28",
      "us": "2026-10-28"
     }
    },
    "liquidity": {
     "sig": "미국은 연준 동결에도 12월 인상 기대가 여전히 높아 단기 신중·중기 부#5zaefe",
     "basis": {
      "kr": "2026-10-28",
      "us": "2026-10-28"
     }
    },
    "indexNotes": {
     "sig": "횡보: 급등에도 일봉 구름 아래이고 전환선이 기준선 아래이며 RSI는 4#1m9j8s2",
     "basis": {
      "kr": "2026-10-28",
      "us": "2026-10-28"
     }
    },
    "topPicks": {
     "sig": "자사주 매입·소각으로 주식 수가 한 해 5% 줄었고, 결산 배당을 크게 #np1oxn",
     "basis": {
      "kr": "2026-10-28",
      "us": "2026-10-28"
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
   "liquidity": "미국은 연준 동결에도 12월 인상 기대가 여전히 높아 단기 신중·중기 부#5zaefe",
   "indexNotes": "횡보: 급등에도 일봉 구름 아래이고 전환선이 기준선 아래이며 RSI는 4#1m9j8s2",
   "market": "반도체 실적이 한·미 증시를 함께 끌어올렸지만 상승 폭은 크게 달랐습니다#1ch5uha"
  },
  "sources": 34,
  "usage": {
   "calls": 3,
   "input": 218732,
   "output": 22195,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.319
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
