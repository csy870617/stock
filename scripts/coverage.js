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
//   verified   : 회전 — verifiedAt 이 가장 오래된 QUOTA(기본 15)종목을 오늘 재검증(--quota 로 조정)
//   discovery  : discoveryAsOf == 오늘 (신규 후보 탐색 10그룹 — 재검증에 밀려 굶지 않도록 게이트)
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

// '오늘'은 UTC 달력일 기준 — Action·루틴(08:00 UTC 발화)·verifiedAt/tierAsOf 기록이 모두
// 같은 UTC 기준을 쓰므로 내부 정합이 유지된다. (KST 자정~09시 사이 수동 실행 시 KST 달력일과
// 하루 어긋나 보일 수 있으나 게이트 비교 기준은 일관된다 — 필요하면 --date 로 강제.)
const today = argVal("date") || new Date().toISOString().slice(0, 10);
// 최신 거래일 T 는 stock-ta.js 가 유일한 출처다. 로드 실패 시 today 로 폴백하면
// 전 종목 techNote 가 '오늘'과 비교돼 커버리지가 통째로 오판되므로 실패로 멈춘다.
if (!TA || !TA.asOf) {
  console.error("stock-ta.js 를 읽을 수 없거나 asOf 가 없습니다 — 먼저 node scripts/update-stock-ta.js 를 실행하세요.");
  process.exit(2);
}
const T = TA.asOf;                            // 최신 거래일

const all = [].concat(D.korea || [], D.us || []);
const label = (s) => s.ticker + "(" + s.name + ")";

// ── 종목 단위 항목 ──
const missTech  = all.filter((s) => !s.techNote || !s.techNote.short || !s.techNote.long ||
                                    !s.techNote.sigShort || !s.techNote.sigLong || s.techNote.asOf !== T);
const missValue = all.filter((s) => !s.valueNote || !String(s.valueNote).trim());
// ── 목표가 재검증은 '회전(rotation)' 이다 ──
// WebSearch 예산은 세션 전체 공유 ~200회라 전 종목(110) 재검증은 한 회차에 물리적으로
// 불가능하다(종목당 25~35회 → 2,750회+ 필요). 그래서 회차마다 verifiedAt 이 가장 오래된
// QUOTA 종목만 재검증하고, 전 종목은 약 QUOTA/N 주기로 돌아가며 신선해진다.
const VERIF_QUOTA = Number(argVal("quota") || 15);   // 회차당 재검증 목표 종목 수
const VERIF_STALE_DAYS = 21;                          // 이 일수를 넘긴 종목은 경고(게이트 아님)
const daysAgo = (d) => {
  if (!d) return Infinity;
  const t = Date.parse(d + "T00:00:00Z");
  return Number.isNaN(t) ? Infinity : Math.round((Date.parse(today + "T00:00:00Z") - t) / 86400000);
};
// 오래된 순 정렬 — verifiedAt 없는 종목이 가장 먼저다.
const byOldest = (a, b) => daysAgo(b.verifiedAt) - daysAgo(a.verifiedAt);
const verifiedToday = all.filter((s) => s.verifiedAt === today);
const notVerifToday = all.filter((s) => s.verifiedAt !== today).sort(byOldest);
// 이번 회차에 남은 할당량만큼만 큐에 올린다(전량이 아니라).
const verifQueue = notVerifToday.slice(0, Math.max(0, VERIF_QUOTA - verifiedToday.length));
const missVerif = verifQueue;                         // 게이트: 큐가 비면 이번 회차 완료
const staleVerif = all.filter((s) => daysAgo(s.verifiedAt) > VERIF_STALE_DAYS);

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

// 신규 후보 탐색 — 예산이 남으면 하는 게 아니라 매 회차 필수다(재검증에 밀려 굶는 걸 막는다).
// 10개 (주제×국가) 그룹을 전부 탐색한 날을 discoveryAsOf 에 기록한다.
const missDisc = [];
if (D.discoveryAsOf !== today) missDisc.push("discoveryAsOf " + (D.discoveryAsOf || "없음") + " ≠ 오늘 " + today);

const missMarket = ["marketNote", "marketNoteUS", "marketNoteKR"].filter((f) => !D[f] || !String(D[f]).trim());
if (D.generatedAt !== today) missMarket.push("generatedAt " + D.generatedAt + " ≠ 오늘 " + today);
// generatedAt 은 daily-maintenance 가 매일 올려 시황 신선도를 가리므로,
// 시황 문구를 실제로 다시 쓴 날(marketNoteAsOf)을 별도로 게이트한다.
if (D.marketNoteAsOf !== today) missMarket.push("marketNoteAsOf " + (D.marketNoteAsOf || "없음") + " ≠ 오늘 " + today);

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
  ["목표가 재검증 (회전 " + VERIF_QUOTA + "종목/회차)", Math.min(verifiedToday.length, VERIF_QUOTA), VERIF_QUOTA, missVerif],
  ["tier 재평가 (tierAsOf==" + today + ")", tierable.length - missTier.length, tierable.length, missTier],
];

console.log("풀 업데이트 커버리지 — 오늘 " + today + " · 최신 거래일 T " + T + " · 종목 " + N + "\n");
rows.forEach(([name, done, total, miss]) => {
  const ok = done === total;
  console.log((ok ? "  ✅ " : "  ❌ ") + name + ": " + done + "/" + total +
    (ok ? "" : "  ← 남음 " + miss.length + "종목: " + miss.slice(0, 8).map(label).join(", ") +
      (miss.length > 8 ? " 외 " + (miss.length - 8) : "")));
});

[["index-notes", missIdx], ["topPicks", missTop], ["liquidity", missLiq],
 ["신규 후보 탐색 10그룹", missDisc], ["시황·generatedAt", missMarket]]
  .forEach(([name, miss]) => {
    console.log((miss.length ? "  ❌ " : "  ✅ ") + name + (miss.length ? ": " + miss.join(", ") : ""));
  });

// aiTarget 은 참고(입력값 검증 실패 시 생략이 정상 — 게이트 아님)
const hasAi = all.filter((s) => s.aiTarget != null);
const freshAi = hasAi.filter((s) => s.aiAsOf === today);
console.log("  ℹ️  aiTarget(참고·게이트 아님): 보유 " + hasAi.length + "/" + N + " · 오늘 산출 " + freshAi.length +
  " · 미보유 " + (N - hasAi.length));

// 회전 진척 — 전 종목이 실제로 돌고 있는지 보여주는 참고 지표(게이트 아님)
const cycleFresh = all.filter((s) => daysAgo(s.verifiedAt) <= VERIF_STALE_DAYS).length;
console.log("  ℹ️  재검증 회전(참고): 전 종목 " + cycleFresh + "/" + N + " 이 " + VERIF_STALE_DAYS +
  "일 이내" + (staleVerif.length ? " · ⚠ " + VERIF_STALE_DAYS + "일 초과 " + staleVerif.length + "종목: " +
  staleVerif.sort(byOldest).slice(0, 5).map(label).join(", ") + (staleVerif.length > 5 ? " 외 " + (staleVerif.length - 5) : "") : ""));

const blockers = missTech.length + missValue.length + missVerif.length + missTier.length +
  missIdx.length + missTop.length + missLiq.length + missDisc.length + missMarket.length;

console.log("");
if (blockers === 0) {
  console.log("✓ 풀 업데이트 완료 — 전 항목 100%");
  process.exit(0);
}
console.log("✗ 미완료 " + blockers + "건 — 남은 종목만 재배치해 100% 까지 반복할 것");
console.log("  (남은 티커 목록: node scripts/coverage.js --remaining techNote|valueNote|verified|tier)");
process.exit(1);
