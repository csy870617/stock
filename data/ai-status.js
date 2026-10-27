// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-26T23:58:57.453Z",
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
  "at": "2026-10-27T00:02:03.934Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 86,
  "lines": 69,
  "usage": {
   "calls": 86,
   "input": 123125,
   "output": 6216,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.015
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
   "at": "2026-10-27T00:02:03.801Z",
   "items": {
    "market": {
     "sig": "AI 기대가 미국 기술주를 끌어올린 반면, 한국 증시는 외국인 매도에 코#1fgpzh7",
     "basis": {
      "kr": "2026-10-26",
      "us": "2026-10-26"
     }
    },
    "liquidity": {
     "sig": "미 10년물 5% 부근과 연준 12월 인상 기대가 미국 유동성을 누르고,#10mxphg",
     "basis": {
      "kr": "2026-10-26",
      "us": "2026-10-26"
     }
    },
    "indexNotes": {
     "sig": "하락세: 일봉 구름 아래·전환선<기준선이고 RSI 30.1로 과매도에 가#7jrvky",
     "basis": {
      "kr": "2026-10-26",
      "us": "2026-10-26"
     }
    },
    "topPicks": {
     "sig": "주가가 순자산가치를 밑도는 할인 상태에서 3분기 누적 순이익이 역대 최대#10iggx3",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-22"
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
  "note": "새 종가로 세션 문장 갱신: market, liquidity"
 }
};
