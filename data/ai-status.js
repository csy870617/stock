// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-27T12:43:38.680Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "us|value",
    "t": "VZ",
    "name": "Verizon Communications",
    "verdict": "없음"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 33656,
   "output": 1417,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.081
  }
 },
 "news": {
  "at": "2026-10-27T12:44:04.422Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 93,
  "lines": 81,
  "usage": {
   "calls": 93,
   "input": 138157,
   "output": 6282,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
  }
 },
 "daily": {
  "at": "2026-10-26T23:58:57.597Z",
  "T": "2026-10-26",
  "basis": {
   "kr": "2026-10-26",
   "us": "2026-10-26"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-27T12:44:04.346Z",
   "items": {
    "market": {
     "sig": "코스피가 3.09% 반등하며 외국인 순매수로 돌아섰지만 미국은 10/26#1jixlqu",
     "basis": {
      "kr": "2026-10-27",
      "us": "2026-10-26"
     }
    },
    "liquidity": {
     "sig": "미 10년물 5% 부근과 연준 12월 인상 기대가 미국 유동성을 누르고,#1k2pfg",
     "basis": {
      "kr": "2026-10-27",
      "us": "2026-10-26"
     }
    },
    "indexNotes": {
     "sig": "하락세: 일봉 구름 아래·전환선<기준선이고 RSI 35.9로 과매도에 가#19msdf7",
     "basis": {
      "kr": "2026-10-27",
      "us": "2026-10-26"
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
   "liquidity": "미 10년물 5% 부근과 연준 12월 인상 기대가 미국 유동성을 누르고,#10mxphg",
   "indexNotes": "하락세: 일봉 구름 아래·전환선<기준선이고 RSI 30.1로 과매도에 가#7jrvky",
   "market": "AI 기대가 미국 기술주를 끌어올린 반면, 한국 증시는 외국인 매도에 코#1fgpzh7"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 374303,
   "output": 15527,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.808
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity",
  "checkedAt": "2026-10-27T12:44:04.346Z",
  "skipped": "오늘(2026-10-27) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
