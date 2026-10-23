// 장 마감 게이트 — refresh-quotes 예약 실행이 '새 종가가 생겼을 때만' 전체 갱신을 돌게 한다.
//
// 왜: GitHub 예약 실행은 정각 슬롯에서 수 시간씩 밀리고(2026-10 실측: 07:00 UTC 분이 12~14시, 21:00 UTC 분이
//   다음날 23~02시) 가끔 통째로 빠진다. 그래서 마감 직후 여러 슬롯(정각을 피한 분)을 걸어 두고, 이 게이트가
//   이미 처리한 마감이면 바로 끝낸다 — 먼저 도착한 슬롯 하나가 그 마감을 처리한다.
//
// 마감 판정은 현지 시각으로 한다(서머타임 자동): 한국 평일 15:45 KST, 미국 평일 16:15 ET 이후면 그날이 마감된 날.
//   주말이면 직전 금요일. 휴장일은 모른다 — 시세에 그날 종가가 없으면 '대기'로 보고, 같은 마감을 2번 시도해도
//   종가가 안 나오면 휴장으로 보고 처리 완료로 친다(다음 마감까지 빈 실행 반복 방지).
//
// 사용:
//   node scripts/close-gate.js            → stdout 에 run=true|false (GITHUB_OUTPUT 형식), 사유는 stderr
//   node scripts/close-gate.js --mark     → 갱신 뒤 quotes.js 의 지수 종가일로 data/close-runs.json 기록
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const STATE = path.join(ROOT, "data", "close-runs.json");
const MARKETS = {
  kr: { tz: "Asia/Seoul", hm: 15 * 60 + 45, idx: "kospi" },
  us: { tz: "America/New_York", hm: 16 * 60 + 15, idx: "sp500" },
};
const MAX_TRIES = 2;

function local(now, tz) {
  const p = {};
  new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "short" })
    .formatToParts(now).forEach((x) => { p[x.type] = x.value; });
  return { date: p.year + "-" + p.month + "-" + p.day, hm: +p.hour * 60 + +p.minute, wd: p.weekday };
}
function prevWeekday(d) {
  const t = new Date(d + "T12:00:00Z");
  do { t.setUTCDate(t.getUTCDate() - 1); } while (t.getUTCDay() === 0 || t.getUTCDay() === 6);
  return t.toISOString().slice(0, 10);
}
// 그 시장의 '마지막으로 끝난 정규장' 날짜(휴장일 무시)
function expectedClose(now, m) {
  const l = local(now, m.tz);
  const weekend = l.wd === "Sat" || l.wd === "Sun";
  return !weekend && l.hm >= m.hm ? l.date : prevWeekday(l.date);
}
function readState() {
  try { return JSON.parse(fs.readFileSync(STATE, "utf8")); } catch (e) { return {}; }
}
function capturedCloses() {
  try {
    global.window = {};
    delete require.cache[require.resolve(path.join(ROOT, "data", "quotes.js"))];
    require(path.join(ROOT, "data", "quotes.js"));
    const ix = (window.STOCK_QUOTES && window.STOCK_QUOTES.indices) || {};
    const out = {};
    Object.keys(MARKETS).forEach((k) => { const q = ix[MARKETS[k].idx]; out[k] = (q && q.closeDate) || null; });
    return out;
  } catch (e) { return {}; }
}

const now = new Date();
const st = readState();
const exp = {};
Object.keys(MARKETS).forEach((k) => { exp[k] = expectedClose(now, MARKETS[k]); });

if (process.argv.includes("--mark")) {
  const got = capturedCloses();
  const next = { updatedAt: now.toISOString().slice(0, 19) + "Z" };
  Object.keys(MARKETS).forEach((k) => {
    const prev = st[k] || {};
    const tries = prev.expected === exp[k] ? (prev.tries || 0) + 1 : 1;
    // 그날 종가를 잡았거나, 같은 마감을 MAX_TRIES 번 시도해도 안 나오면(휴장) 처리 완료
    const done = (got[k] && got[k] >= exp[k]) || tries >= MAX_TRIES;
    next[k] = { expected: exp[k], captured: got[k] || null, tries: tries, done: !!done };
  });
  fs.writeFileSync(STATE, JSON.stringify(next, null, 2) + "\n");
  console.error("close-runs.json 기록: " + Object.keys(MARKETS).map((k) => k + " " + next[k].expected +
    (next[k].done ? " 완료" : " 대기(" + next[k].tries + "회)") + " · 종가일 " + next[k].captured).join(" / "));
  process.exit(0);
}

const pending = Object.keys(MARKETS).filter((k) => { const s = st[k]; return !(s && s.expected === exp[k] && s.done); });
const why = pending.length
  ? "새 마감 " + pending.map((k) => k + " " + exp[k]).join(", ") + " — 갱신 실행"
  : "처리할 새 마감 없음(" + Object.keys(MARKETS).map((k) => k + " " + exp[k]).join(", ") + " 이미 반영) — 건너뜀";
console.error(why);
console.log("run=" + (pending.length ? "true" : "false"));
