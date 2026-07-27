#!/usr/bin/env node
"use strict";
//
// 풀 업데이트 완료 게이트 — "정말 전량 끝냈는가"를 기계적으로 판정한다 (LLM 토큰 0, 순수 스크립트).
//
//   node scripts/coverage.js                # 기본: 오늘 기준으로 점검
//   node scripts/coverage.js --date 2026-07-27
//   node scripts/coverage.js --remaining techNote   # 미완료 티커만 줄단위 출력(배치 재시도용)
//
// validate-reco.js 가 '값이 올바른가'(정합성)를 본다면, 이 스크립트는 '전부 했는가'(커버리지)를 본다.
// 미완료가 하나라도 있으면 exit 1 → 루틴이 이 코드를 보고 남은 종목만 재배치해 100% 까지 반복한다.
//
// 판정 기준(항목별):
//   techNote   : techNote.asOf == T (최신 거래일 = stock-ta.js asOf)
//   valueNote  : 비어 있지 않음
//   verified   : verifiedAt == 오늘 (목표가 컨센서스·논거·배당·실적 재검증일)
//   tier       : tierAsOf == 오늘 (watch 는 tier 구조 면제라 제외)
//   indexNotes : INDEX_NOTES.asOf == indices.js asOf + 4개 지수 5개 필드
//   topPicks   : topPicks.asOf == 오늘 + korea/us 각 3종목
//   liquidity  : liquidity.js asOf == 오늘 + 통합·미국·한국 headline
//   aiTarget   : 참고 지표(검증 실패 시 생략이 정상이라 게이트에 포함하지 않음)

const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

function argVal(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

function load(rel, key) {
  const f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) return null;
  try {
    global.window = {};
    delete require.cache[require.resolve(f)];
    require(f);
    return global.window[key] || null;
  } catch (_e) { return null; }
}

const D  = load("data/recommendations.js", "STOCK_DATA");
const TA = load("data/stock-ta.js", "STOCK_TA");
const IX = load("data/indices.js", "INDEX_TA");
const IN = load("data/index-notes.js", "INDEX_NOTES");
const LQ = load("data/liquidity.js", "LIQUIDITY_DATA");

if (!D) { console.error("recommendations.js 를 읽을 수 없습니다."); process.exit(2); }

const today = argVal("date") || new Date().toISOString().slice(0, 10);
const T = (TA && TA.asOf) || today;          // 최신 거래일

const all = [].concat(D.korea || [], D.us || []);
const label = (s) => s.ticker + "(" + s.name + ")";

// ── 종목 단위 항목 ──
const missTech  = all.filter((s) => !s.techNote || !s.techNote.short || !s.techNote.long ||
                                    !s.techNote.sigShort || !s.techNote.sigLong || s.techNote.asOf !== T);
const missValue = all.filter((s) => !s.valueNote || !String(s.valueNote).trim());
const missVerif = all.filter((s) => s.verifiedAt !== today);
const tierable  = all.filter((s) => s.theme !== "watch");
const missTier  = tierable.filter((s) => s.tierAsOf !== today);

// ── 문서 단위 항목 ──
const IX_ASOF = IX && IX.asOf;
const idxKeys = ["nasdaq", "dow", "kospi", "kosdaq"];
const missIdx = [];
if (!IN) missIdx.push("index-notes.js 없음");
else {
  if (IX_ASOF && IN.asOf !== IX_ASOF) missIdx.push("asOf " + IN.asOf + " ≠ indices " + IX_ASOF);
  idxKeys.forEach((k) => {
    const it = IN.items && IN.items[k];
    if (!it) return missIdx.push(k + " 없음");
    ["value", "short", "long", "sigShort", "sigLong"].forEach((f) => {
      if (!it[f] || !String(it[f]).trim()) missIdx.push(k + "." + f);
    });
  });
}

const tp = D.topPicks || {};
const missTop = [];
if (!tp.asOf) missTop.push("topPicks 없음");
else {
  if (tp.asOf !== today) missTop.push("asOf " + tp.asOf + " ≠ 오늘 " + today);
  [["korea", tp.korea], ["us", tp.us]].forEach(([n, arr]) => {
    if (!Array.isArray(arr) || arr.length !== 3) missTop.push(n + " " + ((arr || []).length) + "/3");
  });
}

const missLiq = [];
if (!LQ) missLiq.push("liquidity.js 없음");
else {
  if (LQ.asOf !== today) missLiq.push("asOf " + LQ.asOf + " ≠ 오늘 " + today);
  ["headline", "headlineUS", "headlineKR"].forEach((f) => {
    if (!LQ[f] || !String(LQ[f]).trim()) missLiq.push(f);
  });
}

const missMarket = ["marketNote", "marketNoteUS", "marketNoteKR"].filter((f) => !D[f] || !String(D[f]).trim());
if (D.generatedAt !== today) missMarket.push("generatedAt " + D.generatedAt + " ≠ 오늘 " + today);

// ── --remaining: 남은 티커만 출력(배치 재시도 입력용) ──
const REMAIN = {
  techNote: missTech, valueNote: missValue, verified: missVerif, tier: missTier,
};
const which = argVal("remaining");
if (which) {
  const list = REMAIN[which];
  if (!list) {
    console.error("--remaining 값은 " + Object.keys(REMAIN).join("|") + " 중 하나여야 합니다.");
    process.exit(2);
  }
  list.forEach((s) => console.log(s.country || (D.korea.includes(s) ? "korea" : "us"), s.ticker, s.name));
  process.exit(list.length ? 1 : 0);
}

// ── 리포트 ──
const N = all.length;
const rows = [
  ["techNote  (asOf==" + T + ")", N - missTech.length, N, missTech],
  ["valueNote", N - missValue.length, N, missValue],
  ["목표가 재검증 (verifiedAt==" + today + ")", N - missVerif.length, N, missVerif],
  ["tier 재평가 (tierAsOf==" + today + ")", tierable.length - missTier.length, tierable.length, missTier],
];

console.log("풀 업데이트 커버리지 — 오늘 " + today + " · 최신 거래일 T " + T + " · 종목 " + N + "\n");
rows.forEach(([name, done, total, miss]) => {
  const ok = done === total;
  console.log((ok ? "  ✅ " : "  ❌ ") + name + ": " + done + "/" + total +
    (ok ? "" : "  ← 남음 " + miss.length + "종목: " + miss.slice(0, 8).map(label).join(", ") +
      (miss.length > 8 ? " 외 " + (miss.length - 8) : "")));
});

[["index-notes", missIdx], ["topPicks", missTop], ["liquidity", missLiq], ["시황·generatedAt", missMarket]]
  .forEach(([name, miss]) => {
    console.log((miss.length ? "  ❌ " : "  ✅ ") + name + (miss.length ? ": " + miss.join(", ") : ""));
  });

// aiTarget 은 참고(입력값 검증 실패 시 생략이 정상 — 게이트 아님)
const hasAi = all.filter((s) => s.aiTarget != null);
const freshAi = hasAi.filter((s) => s.aiAsOf === today);
console.log("  ℹ️  aiTarget(참고·게이트 아님): 보유 " + hasAi.length + "/" + N + " · 오늘 산출 " + freshAi.length +
  " · 미보유 " + (N - hasAi.length));

const blockers = missTech.length + missValue.length + missVerif.length + missTier.length +
  missIdx.length + missTop.length + missLiq.length + missMarket.length;

console.log("");
if (blockers === 0) {
  console.log("✓ 풀 업데이트 완료 — 전 항목 100%");
  process.exit(0);
}
console.log("✗ 미완료 " + blockers + "건 — 남은 종목만 재배치해 100% 까지 반복할 것");
console.log("  (남은 티커 목록: node scripts/coverage.js --remaining techNote|valueNote|verified|tier)");
process.exit(1);
