// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-22T23:55:48.277Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "us|growth",
    "t": "META",
    "name": "Meta Platforms",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 43179,
   "output": 2018,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.107
  }
 },
 "news": {
  "at": "2026-10-22T23:58:54.539Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 114,
  "fetched": 114,
  "called": 91,
  "lines": 79,
  "usage": {
   "calls": 91,
   "input": 129706,
   "output": 6275,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-10-22T23:56:19.491Z",
  "T": "2026-10-22",
  "basis": {
   "kr": "2026-10-22",
   "us": "2026-10-22"
  },
  "model": "claude-opus-5-5",
  "ok": true,
  "seen": {
   "at": "2026-10-22T23:58:54.404Z",
   "items": {
    "market": {
     "sig": "10/22 미국과 한국 증시는 AI 투자비 부담과 유가 급등이 겹치며 기",
     "basis": {
      "kr": "2026-10-22",
      "us": "2026-10-22"
     }
    },
    "liquidity": {
     "sig": "미국은 금리가 내려왔지만 연준의 12월 인상 기대와 신용 약화로 '신중'",
     "basis": {
      "kr": "2026-10-22",
      "us": "2026-10-22"
     }
    },
    "indexNotes": {
     "sig": "일봉 등급 매도(추세 하락)로 구름 아래·전환<기준·후행 부진이고, RS",
     "basis": {
      "kr": "2026-10-22",
      "us": "2026-10-22"
     }
    },
    "topPicks": {
     "sig": "주가가 순자산가치를 밑도는 할인 상태에서 2분기 영업이익이 전년보다 늘었",
     "basis": {
      "kr": "2026-10-22",
      "us": "2026-10-21"
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
   "liquidity": "미국은 금리가 내려왔지만 연준의 12월 인상 기대와 신용 약화로 '신중'",
   "indexNotes": "일봉 등급 매도(추세 하락)로 구름 아래·전환<기준·후행 부진이고, RS",
   "market": "10/22 미국과 한국 증시는 AI 투자비 부담과 유가 급등이 겹치며 기"
  },
  "sources": 40,
  "usage": {
   "calls": 2,
   "input": 266228,
   "output": 13178,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.328
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes"
 }
};
