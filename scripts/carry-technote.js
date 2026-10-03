#!/usr/bin/env node
"use strict";
//
// techNote 이월 — 새 거래일 T 에 '다시 쓸 필요가 없는' 기술 대응은 asOf 만 T 로 올린다 (LLM 토큰 0).
//
//   node scripts/carry-technote.js            # 이월 대상 패치를 만들어 update-reco.js 로 적용
//   node scripts/carry-technote.js --dry      # 대상만 출력(적용 안 함)
//
// 왜: 매 거래일 117종목 techNote 를 전량 재작성했지만, 상당수는 엔진 등급(단·중·장)도 가격대도
//     그대로라 같은 문장을 다시 쓰는 셈이었다. 아래 조건을 '모두' 만족하는 종목만 이월하고,
//     나머지(등급이 바뀌었거나 가격이 움직였거나 문장이 오래된 종목)만 세션이 재작성한다.
//
// 이월 조건(전부 충족):
//   ① 같은 T 의 stock-ta.js 엔진 최종 등급(short/mid/long.signal)이 techNote 의 sig 3종과 '완전히' 같다
//   ② 문장을 쓸 때의 가격(basePrice) 대비 현재가 변동이 ±MAX_MOVE% 이내 — 문장 속 지지·저항 숫자가 유효
//   ③ 문장을 실제로 쓴 날(writtenAt)이 MAX_AGE 일 이내 — 이월만으로 문장이 낡지 않게 최소 주 1회 재작성
//
// 이월 시 techNote 에 writtenAt(원래 작성일)·basePrice(작성 당시 가격)를 남긴다. 세션이 techNote 를
// 새로 쓰면 객체가 통째로 교체돼 두 필드가 사라지고, 그 날짜·가격이 새 기준이 된다.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..");

const MAX_MOVE = 3;   // %
const MAX_AGE = 6;    // 일(달력) — 주 5거래일 기준 최소 주 1회 재작성
const DRY = process.argv.includes("--dry");

function load(rel, key) {
  global.window = {};
  const f = path.join(ROOT, rel);
  delete require.cache[require.resolve(f)];
  require(f);
  return global.window[key];
}

const D = load("data/recommendations.js", "STOCK_DATA");
const TA = load("data/stock-ta.js", "STOCK_TA");
const QT = load("data/quotes.js", "STOCK_QUOTES") || {};
const H = load("data/history.js", "STOCK_HISTORY") || [];
const T = TA && TA.asOf;
if (!T) { console.error("stock-ta.js asOf 없음 — update-stock-ta.js 먼저 실행"); process.exit(2); }

// 작성 당시 가격 — basePrice 가 없으면 스냅샷 이력에서 그 날짜 종가(pd == asOf)를 찾는다.
function priceOn(ticker, day) {
  for (let i = H.length - 1; i >= 0; i--) {
    const st = (H[i].stocks || []).find((x) => x.t === ticker && x.pd === day);
    if (st && typeof st.p === "number") return st.p;
  }
  return null;
}
const days = (a, b) => Math.round((Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z")) / 86400000);

const patch = [], skip = {};
const note = (k) => (skip[k] = (skip[k] || 0) + 1);
["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
  const n = s.techNote;
  if (!n || !n.asOf || n.asOf >= T) return;                     // 이미 최신이거나 없음 → 대상 아님
  const ta = TA.ta && TA.ta[s.ticker];
  if (!ta) return note("엔진 데이터 없음");
  if (!(ta.short && ta.mid && ta.long) ||
      ta.short.signal !== n.sigShort || ta.mid.signal !== n.sigMid || ta.long.signal !== n.sigLong)
    return note("등급 변화");
  const written = n.writtenAt || n.asOf;
  if (days(written, T) > MAX_AGE) return note("문장 " + MAX_AGE + "일 초과");
  const base = typeof n.basePrice === "number" ? n.basePrice : priceOn(s.ticker, n.asOf);
  const q = QT.quotes && QT.quotes[s.ticker];
  const cur = q && typeof q.price === "number" ? q.price : null;
  if (!base || !cur) return note("가격 기준 없음");
  if (Math.abs(cur / base - 1) * 100 > MAX_MOVE) return note("가격 ±" + MAX_MOVE + "% 초과");
  patch.push({ country: c, ticker: s.ticker, theme: s.theme,
    techNote: Object.assign({}, n, { asOf: T, writtenAt: written, basePrice: base }) });
}));

const total = [].concat(D.korea || [], D.us || []).filter((s) => s.techNote && s.techNote.asOf < T).length;
console.log("techNote 이월 — T " + T + " · 구식 " + total + "종목 중 이월 " + patch.length + "종목" +
  (Object.keys(skip).length ? " · 재작성 필요: " + Object.entries(skip).map(([k, v]) => k + " " + v).join(", ") : ""));
if (DRY || !patch.length) process.exit(0);

const tmp = path.join(require("os").tmpdir(), "carry-technote-" + process.pid + ".json");
fs.writeFileSync(tmp, JSON.stringify({ stocks: patch }));
try {
  execFileSync(process.execPath, [path.join(__dirname, "update-reco.js"), tmp], { stdio: "inherit" });
} finally { fs.unlinkSync(tmp); }
console.log("남은 재작성 대상: node scripts/coverage.js --remaining techNote");
