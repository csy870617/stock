// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).
// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).
window.AI_STATUS = {
 "defects": {
  "at": "2026-10-23T23:16:19.598Z",
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
  "at": "2026-10-23T23:17:55.364Z",
  "model": "claude-haiku-5-5",
  "ok": true,
  "stocks": 115,
  "fetched": 115,
  "called": 88,
  "lines": 90,
  "usage": {
   "calls": 88,
   "input": 127292,
   "output": 6319,
   "cacheRead": 0,
   "searches": 0,
   "usd": 0.016
  }
 },
 "daily": {
  "at": "2026-10-23T23:16:19.688Z",
  "T": "2026-10-23",
  "basis": {
   "kr": "2026-10-22",
   "us": "2026-10-22"
  },
  "model": "claude-opus-5-5",
  "ok": false,
  "seen": {
   "at": "2026-10-23T23:16:19.688Z",
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
  "error": "요청 오류(400) — 400 {\"type\":\"error\",\"error\":{\"type\":\"invalid_request_error\",\"message\":\"The compiled grammar is too large, which would cause performance issues. Simplify your to",
  "usage": {
   "calls": 1,
   "input": 286093,
   "output": 7304,
   "cacheRead": 0,
   "searches": 6,
   "usd": 1.29
  },
  "note": "새 종가로 세션 문장 갱신: market, liquidity, indexNotes",
  "sig": {
   "liquidity": "미국은 금리가 내려왔지만 연준의 12월 인상 기대와 신용 약화로 '신중'",
   "indexNotes": "일봉 등급 매도(추세 하락)로 구름 아래·전환<기준·후행 부진이고, RS",
   "market": "10/22 미국과 한국 증시는 AI 투자비 부담과 유가 급등이 겹치며 기"
  },
  "lastOk": "2026-10-22T23:56:19.491Z"
 }
};
