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
//
// 신뢰도 가드레일 (자동 재평가의 기계적 안전장치):
//   1) 일일 편입+편출 합계가 20건(=10교체) 초과 → --force 없이 거부 (과도한 대량 개편 차단)
//   2) 기존 종목의 targetPrice 를 ±50% 초과 변경 → --force 없이 거부, ±25% 초과는 경고
//      (단일 증권사 최고치를 컨센서스로 착각하는 실수 차단)
//   3) targetPrice/thesis/earnings 를 바꾸는 stocks 항목은 sources(근거 URL) 필수
//   4) 적용 결과가 validate-reco.js 전체 검증(구조 9·3×3, 형식, 계산 정합성)을 통과해야 저장

const fs = require("fs");
const path = require("path");
const { validate, isTrustedSource, isBlockedSource, sourceHost, isBannedTicker, BANNED_TICKERS } = require("./validate-reco");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");

const patchPath = process.argv[2];
if (!patchPath || patchPath.startsWith("--")) {
  console.error("사용법: node scripts/update-reco.js <patch.json> [--out <경로>] [--force]");
  process.exit(1);
}
const outIdx = process.argv.indexOf("--out");
const OUT = outIdx >= 0 ? process.argv[outIdx + 1] : RECO;
const FORCE = process.argv.includes("--force");

const patch = JSON.parse(fs.readFileSync(patchPath, "utf8"));

// ── 가드레일: 과도한 일일 변경 차단 ──
const MAX_DAILY_OPS = 20;   // add+remove 합계 (교체 1건 = add 1 + remove 1) → 최대 10교체
const ops = (patch.add || []).length + (patch.remove || []).length;
if (ops > MAX_DAILY_OPS && !FORCE) {
  console.error("✗ 가드레일: 일일 편입+편출 " + ops + "건 > 허용 " + MAX_DAILY_OPS + "건.");
  console.error("  보수적 교체 원칙 위반 가능성 — 정말 의도한 대규모 개편이면 --force 로 재실행.");
  process.exit(1);
}

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
const guardErrors = [];
(patch.stocks || []).forEach((entry) => {
  const country = entry.country, ticker = entry.ticker, theme = entry.theme;
  if (!country || !D[country] || !ticker) { warnings.push("stocks 항목에 country/ticker 필요: " + JSON.stringify(entry)); return; }
  const fields = Object.assign({}, entry);
  delete fields.country; delete fields.ticker; delete fields.theme;   // theme 은 대상 지정용(값 변경 안 함)
  const matches = D[country].filter((s) => s.ticker === ticker && (theme == null || s.theme === theme));
  if (!matches.length) { warnings.push("merge 대상 없음: " + country + ":" + ticker + (theme ? "/" + theme : "")); return; }

  // 가드레일: 분석 필드 변경엔 근거 URL 필수
  const changesAnalysis = ["targetPrice", "thesis", "earnings"].some((k) => fields[k] !== undefined);
  const hasSources = Array.isArray(fields.sources) && fields.sources.length >= 1;
  if (changesAnalysis && !hasSources && !FORCE) {
    guardErrors.push(country + ":" + ticker + " — targetPrice/thesis/earnings 변경에는 sources(근거 URL 1~3개) 필수");
    return;
  }

  // 가드레일: 출처 신뢰도 (WebSearch 결과의 품질을 기계적으로 강제)
  //  - 커뮤니티/블로그/SNS 출처는 --force 로도 불가 (풍문은 어떤 경우에도 근거가 아님)
  //  - 분석 변경엔 신뢰 출처(컨센서스 집계·공시·주요 언론·증권사) 2개 이상 필수
  //    → '2개 독립 출처 교차확인' 규칙의 양쪽이 모두 신뢰 출처가 되도록 강제
  if (hasSources) {
    const blocked = fields.sources.filter(isBlockedSource);
    if (blocked.length) {
      guardErrors.push(country + ":" + ticker + " — 커뮤니티/블로그/SNS 는 근거 출처로 쓸 수 없음: " +
        blocked.map(sourceHost).join(", ") + " (컨센서스 집계·공시·주요 언론으로 교체)");
      return;
    }
    const trustedN = fields.sources.filter(isTrustedSource).length;
    if (changesAnalysis && trustedN < 2 && !FORCE) {
      guardErrors.push(country + ":" + ticker + " — targetPrice/thesis/earnings 변경엔 신뢰 출처(FnGuide·WiseReport·TipRanks·MarketBeat·공시·주요 언론·증권사 등) 2개 이상 필수 (현재 " +
        trustedN + "개: " + fields.sources.map(sourceHost).join(", ") + ")");
      return;
    }
  }

  // 가드레일: 목표가 급변 차단 (단일 증권사 최고치 오인 방지)
  if (typeof fields.targetPrice === "number") {
    const prevTp = matches[0].targetPrice;
    if (typeof prevTp === "number" && prevTp > 0) {
      const chg = (fields.targetPrice - prevTp) / prevTp * 100;
      if (Math.abs(chg) > 50 && !FORCE) {
        guardErrors.push(country + ":" + ticker + " — 목표가 " + prevTp + " → " + fields.targetPrice +
          " (" + chg.toFixed(1) + "%) 급변. 컨센서스(다수 증권사 평균) 맞는지 재확인 후 --force 로만 허용");
        return;
      }
      if (Math.abs(chg) > 25) {
        warnings.push(country + ":" + ticker + " — 목표가 " + chg.toFixed(1) + "% 변경. 단일 증권사 목표가가 아닌 컨센서스인지 확인 요망");
      }
    }
  }

  matches.forEach((s) => Object.assign(s, fields));
  merged += matches.length;
});

// ── 종목 추가 ──
(patch.add || []).forEach((s) => {
  const country = s.country;
  if (!country || !D[country]) { warnings.push("add 국가 오류: " + JSON.stringify(s).slice(0, 80)); return; }
  const obj = Object.assign({}, s); delete obj.country;
  if (!obj.ticker || !obj.name) { warnings.push("add 에 ticker/name 필요: " + JSON.stringify(s).slice(0, 80)); return; }

  // 가드레일: 재추가 금지 종목(지배구조·실적정정 등으로 편출)은 --force 로도 재편입 불가
  if (isBannedTicker(obj.ticker)) {
    guardErrors.push("add " + country + ":" + obj.ticker + " — 재추가 금지 종목(" + BANNED_TICKERS[obj.ticker] + ") 은 편입할 수 없음");
    return;
  }

  // 가드레일: 신규 편입은 근거 전체가 새로 만들어지므로 출처 신뢰도를 가장 엄격히 본다
  const srcs = Array.isArray(obj.sources) ? obj.sources : [];
  const blocked = srcs.filter(isBlockedSource);
  if (blocked.length) {
    guardErrors.push("add " + country + ":" + obj.ticker + " — 커뮤니티/블로그/SNS 는 근거 출처로 쓸 수 없음: " + blocked.map(sourceHost).join(", "));
    return;
  }
  const trustedN = srcs.filter(isTrustedSource).length;
  if (trustedN < 2 && !FORCE) {
    guardErrors.push("add " + country + ":" + obj.ticker + " — 신규 편입엔 신뢰 출처(컨센서스 집계·공시·주요 언론·증권사) 2개 이상 필수 (현재 " +
      trustedN + "개: " + (srcs.length ? srcs.map(sourceHost).join(", ") : "없음") + ")");
    return;
  }

  D[country].push(obj);
  added++;
});

if (guardErrors.length) {
  console.error("✗ 가드레일 위반 " + guardErrors.length + "건 — 저장 취소:");
  guardErrors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}

// ── 종목 제거 ──
(patch.remove || []).forEach((r) => {
  if (!r.country || !D[r.country] || !r.ticker) { warnings.push("remove 에 country/ticker 필요"); return; }
  const before = D[r.country].length;
  D[r.country] = D[r.country].filter((s) => !(s.ticker === r.ticker && (r.theme == null || s.theme === r.theme)));
  removed += before - D[r.country].length;
});

// ── 파생 필드 재계산 — upside 는 price·targetPrice 에서 유도 (수기 값 불일치 방지) ──
["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
  if (typeof s.price === "number" && s.price > 0 && typeof s.targetPrice === "number") {
    s.upside = Math.round((s.targetPrice - s.price) / s.price * 1000) / 10;
  }
}));

// ── 직렬화 (종목 1개 = 1줄 → 다음 패치의 diff 가 최소화된다) ──
function serialize(D) {
  const L = [];
  L.push("// stock-recommender 분석 결과 — 시세는 data/quotes.js 로 분리(update-quotes.js).");
  L.push("// 증분 갱신: node scripts/update-reco.js <patch.json> 로 바뀐 종목만 merge (README 참고).");
  L.push("// price·priceDate·upside 는 quotes.js 미보유 종목용 폴백값일 뿐, 표시는 quotes.js 가 우선.");
  L.push("//");
  L.push("// ★ 재평가 체크리스트 (자동 루틴 필독 — 어기면 update-reco.js 가드레일이 저장을 거부한다):");
  L.push("//  1. 목표가는 반드시 '컨센서스(다수 증권사 평균)'. 단일 증권사 최고치 금지. 출처에서 발행일 확인 — 4주 이상 지난 기사를 '최신'으로 취급 금지.");
  L.push("//  2. 편입·편출·목표가 변경엔 WebSearch 로 서로 다른 출처 2개 이상을 교차 확인. 수치는 스니펫에 실제로 적힌 것만 사용(기억·추론으로 채우기 금지),");
  L.push("//     두 출처가 5% 이상 다르면 세 번째 출처로 판별해 다수/중앙값 채택. 확인 못 한 수치는 추정 금지(기존값 유지).");
  L.push("//  3. 출처 등급 — 분석 변경·신규 편입의 sources 에는 반드시 신뢰 출처 2개 이상(교차확인 양쪽 모두): ① 컨센서스 집계(FnGuide·WiseReport·TipRanks·MarketBeat·Investing·StockAnalysis 등)");
  L.push("//     ② 공시·IR(DART·KRX·SEC) ③ 주요 경제언론(한경·매경·연합·로이터·블룸버그 등) ④ 증권사 리서치. 커뮤니티·개인 블로그·SNS·유튜브·위키는");
  L.push("//     근거 금지(가드레일이 저장 거부). 신뢰 출처를 먼저 찾으려면 'site:comp.fnguide.com 종목명' 처럼 도메인 한정 검색을 활용하라.");
  L.push("//  4. 외부 사이트 WebFetch·금융 API 직접 호출은 이 샌드박스에서 403 으로 막힌다 — 쓰지 말 것. 403 을 만나도 멈추지 말고 WebSearch 로 대체해");
  L.push("//     계속 진행한다. (시세는 refresh-quotes GitHub Action 이 담당하므로 price·priceDate·upside 는 검색·기록 대상이 아니다)");
  L.push("//  5. 근거가 약하면 그날은 바꾸지 않는다(변경 0건이 정상). 하루 최대 10교체.");
  L.push("//  6. 판단 전 scripts/performance-report.js 와 scripts/validate-reco.js 실행 — 목표가 소진·성과 부진·'신뢰 출처 0개' 경고 종목이 재평가 우선 대상.");
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

// ── 전체 데이터 검증 (구조 9·3×3, 티커/시장/출처 형식, upside 정합성) — 실패 시 저장 취소 ──
{
  let quotes = {};
  const QUOTES = path.join(ROOT, "data", "quotes.js");
  if (fs.existsSync(QUOTES)) {
    try {
      global.window = {};
      delete require.cache[require.resolve(QUOTES)];
      require(QUOTES);
      quotes = (global.window.STOCK_QUOTES || {}).quotes || {};
    } catch (_e) {}
  }
  const res = validate(D, { quotes });
  if (res.warnings.length) {
    console.log("⚠ 검증 경고 " + res.warnings.length + "건:");
    res.warnings.forEach((w) => console.log("  - " + w));
  }
  if (res.errors.length) {
    console.error("✗ 데이터 검증 실패 " + res.errors.length + "건 — 저장 취소:");
    res.errors.forEach((e) => console.error("  - " + e));
    console.error("  (패치를 수정해 9종목·Tier 3×3 구조와 필드 형식을 맞춘 뒤 재실행)");
    process.exit(1);
  }
}

fs.writeFileSync(OUT, out);

console.log("recommendations.js 갱신 → " + OUT);
console.log("  merge " + merged + "종목 · add " + added + " · remove " + removed +
  " · 총 " + (D.korea.length + D.us.length) + "종목");
if (warnings.length) { console.log("  ⚠ 경고:"); warnings.forEach((w) => console.log("   - " + w)); }
