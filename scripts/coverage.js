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
//   verified   : 7일 회전 — 전 종목의 verifiedAt 이 7일 이내(큐는 --quota 만큼만 준다)
//   discovery  : 7일 회전 — 10개 (주제×국가) 그룹의 D.discovery["<country>|<theme>"] 가 7일 이내
//   aiTarget   : 7일 회전 — 전 종목의 aiCheckedAt(재시도한 날)이 7일 이내. 값 자체가 없는 건
//                정상이지만(입력값 검증 실패) 재시도조차 안 하는 건 갱신 누락이라 게이트다.
//   tier       : tierAsOf == 오늘 (watch 는 tier 구조 면제라 제외)
//   indexNotes : INDEX_NOTES.asOf == indices.js asOf + 4개 지수 5개 필드
//   topPicks   : topPicks.asOf == 오늘 + korea/us 각 3종목
//   liquidity  : liquidity.js asOf == 오늘 + 통합·미국·한국 headline
//
// 매일 전량인 항목(techNote·valueNote·tier·indexNotes·topPicks·liquidity·시황)과
// 7일 회전 항목(verified·discovery·aiTarget)이 합쳐져, 앱 데이터 전체가 최소 주 1회 갱신된다.

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
const VERIF_CYCLE_DAYS = 7;                          // ★ 목표: 전 종목이 7일 이내에 한 번은 재검증된다
const VERIF_QUOTA = Number(argVal("quota") || 20);   // 한 세션이 감당할 큐 크기(예산 상한에서 온 값)
const daysAgo = (d) => {
  if (!d) return Infinity;
  const t = Date.parse(d + "T00:00:00Z");
  return Number.isNaN(t) ? Infinity : Math.round((Date.parse(today + "T00:00:00Z") - t) / 86400000);
};
// 오래된 순 정렬 — verifiedAt 없는 종목이 가장 먼저다.
const byOldest = (a, b) => daysAgo(b.verifiedAt) - daysAgo(a.verifiedAt);
// 게이트는 '오늘 몇 종목 했나'가 아니라 **전 종목이 7일 이내인가**로 본다. 그래야 하루
// 몇 번을 발화하든(현재 2회) 밀린 만큼만 자동으로 소화되고, 한 세션이 실패해도 다음
// 세션이 그 몫까지 이어받는다.
const staleVerif = all.filter((s) => daysAgo(s.verifiedAt) > VERIF_CYCLE_DAYS).sort(byOldest);
const missVerif = staleVerif;
// 세션에 한 번에 던질 수 있는 양은 예산이 정한다 — 큐는 오래된 순으로 QUOTA 만큼만 준다.
const verifQueue = staleVerif.slice(0, VERIF_QUOTA);
const verifiedToday = all.filter((s) => s.verifiedAt === today);

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

// 신규 후보 탐색 — 재검증과 같은 7일 회전이다. 10개 (주제×국가) 그룹 각각을 마지막으로
// 탐색한 날을 D.discovery["<country>|<theme>"] 에 기록하고, 전 그룹이 7일 이내이면 통과한다.
// (전 그룹을 매일 도는 건 예산상 불가능하고, 굶게 두면 발굴이 영영 안 된다 — 그 사이가 회전이다.)
const DISC_GROUPS = [];
["korea", "us"].forEach((c) => {
  const seen = new Set((D[c] || []).filter((s) => s.theme !== "watch").map((s) => s.theme));
  [...seen].sort().forEach((t) => DISC_GROUPS.push(c + "|" + t));
});
const discMap = D.discovery || {};
const staleDisc = DISC_GROUPS.filter((g) => daysAgo(discMap[g]) > VERIF_CYCLE_DAYS)
  .sort((a, b) => daysAgo(discMap[b]) - daysAgo(discMap[a]));
const missDisc = staleDisc.map((g) => g + "(" + (discMap[g] || "기록 없음") + ")");
const discQueue = staleDisc.slice(0, Number(argVal("discQuota") || 4));

// aiTarget — '산출됐는가'가 아니라 '최근에 재시도했는가'를 본다. 입력값 검증 실패로 값이
// 없는 건 정상이지만, 몇 주째 재시도조차 안 하는 건 갱신 누락이다. 그래서 시도한 날을
// aiCheckedAt 에 남기고(산출 성공 시 aiAsOf 도 함께), 전 종목 7일 회전으로 게이트한다.
const staleAi = all.filter((s) => daysAgo(s.aiCheckedAt) > VERIF_CYCLE_DAYS).sort(
  (a, b) => daysAgo(b.aiCheckedAt) - daysAgo(a.aiCheckedAt));
const aiQueue = staleAi.slice(0, Number(argVal("aiQuota") || 20));

const missMarket = ["marketNote", "marketNoteUS", "marketNoteKR"].filter((f) => !D[f] || !String(D[f]).trim());
if (D.generatedAt !== today) missMarket.push("generatedAt " + D.generatedAt + " ≠ 오늘 " + today);
// generatedAt 은 daily-maintenance 가 매일 올려 시황 신선도를 가리므로,
// 시황 문구를 실제로 다시 쓴 날(marketNoteAsOf)을 별도로 게이트한다.
if (D.marketNoteAsOf !== today) missMarket.push("marketNoteAsOf " + (D.marketNoteAsOf || "없음") + " ≠ 오늘 " + today);

// ── --remaining: 남은 티커만 출력(배치 재시도 입력용) ──
const REMAIN = {
  techNote: missTech, valueNote: missValue, verified: verifQueue, tier: missTier, aiTarget: aiQueue,
};
// discovery 는 종목이 아니라 그룹 목록이라 따로 처리한다.
if (argVal("remaining") === "discovery") {
  discQueue.forEach((g) => console.log(g.replace("|", " "), discMap[g] || "기록없음"));
  process.exit(discQueue.length ? 1 : 0);
}
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
  ["목표가 재검증 (전 종목 " + VERIF_CYCLE_DAYS + "일 이내)", N - staleVerif.length, N, missVerif],
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
 ["신규 후보 탐색 (전 " + DISC_GROUPS.length + "그룹 " + VERIF_CYCLE_DAYS + "일 이내)", missDisc],
 ["aiTarget 재시도 (전 종목 " + VERIF_CYCLE_DAYS + "일 이내)",
   staleAi.length ? [staleAi.length + "종목 경과: " + staleAi.slice(0, 6).map(label).join(", ") +
     (staleAi.length > 6 ? " 외 " + (staleAi.length - 6) : "")] : []],
 ["시황·generatedAt", missMarket]]
  .forEach(([name, miss]) => {
    console.log((miss.length ? "  ❌ " : "  ✅ ") + name + (miss.length ? ": " + miss.join(", ") : ""));
  });

// aiTarget 보유율은 참고 지표다(값이 없는 것 자체는 정상 — 게이트는 위의 '재시도 7일 회전').
const hasAi = all.filter((s) => s.aiTarget != null);
const freshAi = hasAi.filter((s) => s.aiAsOf === today);
console.log("  ℹ️  aiTarget 보유(참고): " + hasAi.length + "/" + N + " · 오늘 산출 " + freshAi.length +
  " · 미보유 " + (N - hasAi.length) + (aiQueue.length ? " → 이번 세션 재시도 큐 " + aiQueue.length + "종목" : ""));

// 회전 진척(참고) — 오늘 처리량과 이번 세션이 받아 갈 큐 크기
console.log("  ℹ️  재검증 회전(참고): 오늘 " + verifiedToday.length + "종목 · 7일 초과 " +
  staleVerif.length + "종목" + (staleVerif.length ? " → 이번 세션 큐 " + verifQueue.length +
  "종목(--remaining verified): " + verifQueue.slice(0, 5).map(label).join(", ") +
  (verifQueue.length > 5 ? " 외 " + (verifQueue.length - 5) : "") : " (전 종목 주기 내)"));

const blockers = missTech.length + missValue.length + missVerif.length + missTier.length +
  missIdx.length + missTop.length + missLiq.length + missDisc.length + staleAi.length + missMarket.length;

console.log("");
if (blockers === 0) {
  console.log("✓ 풀 업데이트 완료 — 전 항목 100%");
  process.exit(0);
}
console.log("✗ 미완료 " + blockers + "건 — 남은 종목만 재배치해 100% 까지 반복할 것");
console.log("  (남은 티커 목록: node scripts/coverage.js --remaining techNote|valueNote|verified|tier|aiTarget|discovery)");
process.exit(1);
