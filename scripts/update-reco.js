#!/usr/bin/env node
// 증분 분석 갱신 스크립트 — 전체 재생성 대신 "바뀐 종목만" 패치
//
// 왜: data/recommendations.js(약 90종목)를 통째로 다시 쓰면 LLM 출력 토큰이 크다.
//     대신 바뀐 종목/필드만 담은 작은 JSON 패치를 만들어 이 스크립트로 merge 하면,
//     LLM 은 변경분만 생성하면 되므로 토큰이 크게 줄어든다. (시세는 quotes.js 로 이미 분리)
//
// 사용법:
//   node scripts/update-reco.js patch.json            # patch.json 을 recommendations.js 에 적용
//   node scripts/update-reco.js patch.json --out /tmp/preview.js   # 원본 대신 다른 경로로 미리보기
//
// patch.json 형식 (모든 항목 선택):
//   {
//     "generatedAt": "2026-07-11",              // 상단 필드 갱신
//     "marketNote":  "...",
//     "disclaimer":  "...",
//     "themes":      [ ... ],                    // 주제 정의 교체(있을 때만)
//     "stocks": [                                 // (국가+티커[+주제])로 찾아 필드만 merge
//       { "country": "korea", "ticker": "005930", "targetPrice": 450000, "thesis": "..." }
//     ],
//     "add":    [ { "country": "us", "theme": "growth", "tier": 2, "name": "...", "ticker": "...", ... } ],
//     "remove": [ { "country": "korea", "ticker": "000810" } ]   // theme 생략 시 해당 티커 전부
//   }
//
// 시세(price·priceDate·upside)는 quotes.js 가 담당하므로 패치에 넣을 필요가 없다.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");

const patchPath = process.argv[2];
if (!patchPath || patchPath.startsWith("--")) {
  console.error("사용법: node scripts/update-reco.js <patch.json> [--out <경로>]");
  process.exit(1);
}
const outIdx = process.argv.indexOf("--out");
const OUT = outIdx >= 0 ? process.argv[outIdx + 1] : RECO;

const patch = JSON.parse(fs.readFileSync(patchPath, "utf8"));

global.window = {};
require(RECO);
const D = global.window.STOCK_DATA;
if (!D) { console.error("recommendations.js 로드 실패"); process.exit(1); }
D.korea = D.korea || [];
D.us = D.us || [];

const warnings = [];
let merged = 0, added = 0, removed = 0;

// ── 상단 필드 ──
["generatedAt", "marketNote", "disclaimer"].forEach((k) => {
  if (patch[k] !== undefined) D[k] = patch[k];
});
if (patch.themes !== undefined) D.themes = patch.themes;

// ── 종목 필드 merge (국가+티커[+주제]) ──
(patch.stocks || []).forEach((entry) => {
  const country = entry.country, ticker = entry.ticker, theme = entry.theme;
  if (!country || !D[country] || !ticker) { warnings.push("stocks 항목에 country/ticker 필요: " + JSON.stringify(entry)); return; }
  const fields = Object.assign({}, entry);
  delete fields.country; delete fields.ticker; delete fields.theme;   // theme 은 대상 지정용(값 변경 안 함)
  const matches = D[country].filter((s) => s.ticker === ticker && (theme == null || s.theme === theme));
  if (!matches.length) { warnings.push("merge 대상 없음: " + country + ":" + ticker + (theme ? "/" + theme : "")); return; }
  matches.forEach((s) => Object.assign(s, fields));
  merged += matches.length;
});

// ── 종목 추가 ──
(patch.add || []).forEach((s) => {
  const country = s.country;
  if (!country || !D[country]) { warnings.push("add 국가 오류: " + JSON.stringify(s).slice(0, 80)); return; }
  const obj = Object.assign({}, s); delete obj.country;
  if (!obj.ticker || !obj.name) { warnings.push("add 에 ticker/name 필요: " + JSON.stringify(s).slice(0, 80)); return; }
  D[country].push(obj);
  added++;
});

// ── 종목 제거 ──
(patch.remove || []).forEach((r) => {
  if (!r.country || !D[r.country] || !r.ticker) { warnings.push("remove 에 country/ticker 필요"); return; }
  const before = D[r.country].length;
  D[r.country] = D[r.country].filter((s) => !(s.ticker === r.ticker && (r.theme == null || s.theme === r.theme)));
  removed += before - D[r.country].length;
});

// ── 직렬화 (종목 1개 = 1줄 → 다음 패치의 diff 가 최소화된다) ──
function serialize(D) {
  const L = [];
  L.push("// stock-recommender 분석 결과 — 시세는 data/quotes.js 로 분리(update-quotes.js).");
  L.push("// 증분 갱신: node scripts/update-reco.js <patch.json> 로 바뀐 종목만 merge (README 참고).");
  L.push("// price·priceDate·upside 는 quotes.js 미보유 종목용 폴백값일 뿐, 표시는 quotes.js 가 우선.");
  L.push("window.STOCK_DATA = {");
  ["generatedAt", "marketNote", "disclaimer"].forEach((k) => {
    if (D[k] !== undefined) L.push("  " + k + ": " + JSON.stringify(D[k]) + ",");
  });
  if (Array.isArray(D.themes)) {
    L.push("  themes: [");
    D.themes.forEach((t) => L.push("    " + JSON.stringify(t) + ","));
    L.push("  ],");
  }
  ["korea", "us"].forEach((c) => {
    if (!Array.isArray(D[c])) return;
    L.push("  " + c + ": [");
    D[c].forEach((s) => L.push("    " + JSON.stringify(s) + ","));
    L.push("  ],");
  });
  const known = ["generatedAt", "marketNote", "disclaimer", "themes", "korea", "us"];
  Object.keys(D).forEach((k) => {
    if (known.includes(k)) return;
    L.push("  " + k + ": " + JSON.stringify(D[k]) + ",");
  });
  L.push("};");
  return L.join("\n") + "\n";
}

const out = serialize(D);

// 쓰기 전에 결과가 다시 로드되는지 검증(깨진 파일 방지)
try {
  const test = {};
  new Function("window", out)(test);
  if (!test.STOCK_DATA || !Array.isArray(test.STOCK_DATA.korea)) throw new Error("검증 실패");
} catch (e) {
  console.error("직렬화 결과 검증 실패, 저장 취소: " + e.message);
  process.exit(1);
}

fs.writeFileSync(OUT, out);

console.log("recommendations.js 갱신 → " + OUT);
console.log("  merge " + merged + "종목 · add " + added + " · remove " + removed +
  " · 총 " + (D.korea.length + D.us.length) + "종목");
if (warnings.length) { console.log("  ⚠ 경고:"); warnings.forEach((w) => console.log("   - " + w)); }
