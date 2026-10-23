// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-23T12:23:12.122Z",
  "model": "claude-sonnet-5-5",
  "ok": true,
  "pending": 1,
  "judged": 1,
  "items": [
   {
    "g": "us|dividend",
    "t": "LMT",
    "name": "Lockheed Martin",
    "verdict": "형식"
   }
  ],
  "usage": {
   "calls": 2,
   "input": 25443,
   "output": 1343,
   "cacheRead": 0,
   "searches": 3,
   "usd": 0.064
  }
 },
 "news": {
  "at": "2026-10-23T12:23:36.634Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 116,
  "fetched": 116,
  "called": 96,
  "lines": 79,
  "usage": {
   "calls": 96,
   "input": 142568,
   "output": 6232,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.017
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
   "at": "2026-10-23T12:23:36.549Z",
   "items": {
    "market": {
     "sig": "10/23 코스피는 장중 4% 넘게 빠졌다가 SK하이닉스 반등에 힘입어 ",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-22"
     }
    },
    "liquidity": {
     "sig": "미국은 10년물이 5% 아래지만 연방기금 선물이 12월 인상을 87% 반",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-22"
     }
    },
    "indexNotes": {
     "sig": "일봉 등급 매도(추세 하락)로 구름 아래·전환<기준이고 MACD도 시그널",
     "basis": {
      "kr": "2026-10-23",
      "us": "2026-10-22"
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
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes",
  "checkedAt": "2026-10-23T12:23:36.549Z",
  "skipped": "오늘(2026-10-23) 몫이 이미 최신 — 루틴 세션이 작성"
 }
};
