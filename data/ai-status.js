// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-27T23:52:34.314Z",
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
  "at": "2026-10-27T23:55:26.916Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 90,
  "lines": 86,
  "usage": {
   "calls": 90,
   "input": 133709,
   "output": 6409,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-10-27T23:52:34.520Z",
  "T": "2026-10-27",
  "basis": {
   "kr": "2026-10-27",
   "us": "2026-10-27"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-27T23:55:26.811Z",
   "items": {
    "market": {
     "sig": "미국과 한국 증시는 앤트로픽 IPO 신청 소식에 AI·반도체주가 다시 오#1l6zrq7",
     "basis": {
      "kr": "2026-10-27",
      "us": "2026-10-27"
     }
    },
    "liquidity": {
     "sig": "미국은 10년물 5% 부근과 연준 12월 인상 기대가 단기 유동성을 누르#31fs1i",
     "basis": {
      "kr": "2026-10-27",
      "us": "2026-10-27"
     }
    },
    "indexNotes": {
     "sig": "하락세: 3% 반등에도 일봉은 구름 아래, 전환선이 기준선 아래이고 MA#no45wu",
     "basis": {
      "kr": "2026-10-27",
      "us": "2026-10-27"
     }
    },
    "topPicks": {
     "sig": "자사주 매입·소각으로 주식 수가 한 해 5% 줄었고, 결산 배당을 크게 #1qzh4no",
     "basis": {
      "kr": "2026-10-27",
      "us": "2026-10-26"
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
   "liquidity": "미국은 10년물 5% 부근과 연준 12월 인상 기대가 단기 유동성을 누르#31fs1i",
   "indexNotes": "하락세: 3% 반등에도 일봉은 구름 아래, 전환선이 기준선 아래이고 MA#no45wu",
   "market": "미국과 한국 증시는 앤트로픽 IPO 신청 소식에 AI·반도체주가 다시 오#1l6zrq7"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 455715,
   "output": 16050,
   "cacheRead": 0,
   "searches": 6,
   "usd": 2.144
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
