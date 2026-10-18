#!/usr/bin/env node
"use strict";
//
// C 모드(주간 심층 발굴, CLAUDE.md §3-6) 서브에이전트 입력 묶음 — 그룹별 JSON 10개 (토큰 0)
//
//   node scripts/deep-packets.js <출력 폴더>          # 예: 세션 scratchpad 아래 deep/
//   node scripts/deep-packets.js <출력 폴더> --beta   # 편성·후보 전부의 1년 β(일간·주간)·60일 변동성도 붙인다(vol-beta.js, 약 3분)
//
// 묶음 = 주제 정의 + 스크린 규칙·적격 수·정체성 문턱(gateThresholds)·필터 문턱(filterCuts) + 현 편성 9종목(tier·현재가·목표가·
//        상승여력·목표가 소진 여부·배당·AI적정가·재검증일·엔진 신호 3종·60일 변동성·논거/실적/리스크 요약·같은 잣대로 잰 스크린 지표)
//        + 스크린 후보 상위 25(히든은 근접 후보 nearMiss 포함) + 국가 β 메모(betaNote — performance-report.js 의 보유 기준 β)
//        + (미국 저평가·배당) 재무 팩터를 못 받은 종목 목록(noFactors — 대개 IFRS 로 공시하는 외국 ADR, 문턱으로 직접 판정).
// 서브에이전트 지침은 docs/DEEP-DISCOVERY-AGENT.md(후보 검증)·docs/DEEP-AUDIT-AGENT.md(편성 전수 점검) — {PACKET} 을 이 파일이 쓴 경로로.
//
// ★ 상승여력·목표가 소진은 quotes.js 현재가로 계산한다. recommendations.js 의 price·upside 는 quotes.js 미보유
//   종목용 폴백값이라, 예전에는 7월 가격이 남아 '거짓 목표가 소진'(삼성물산 -9.8%, 실제 +58%) 같은 오판을 낳았다(2026-10-12).
// 먼저 `node scripts/screen-discovery.js` 로 data/discovery-candidates.js 를 최신화해 둘 것(6일 넘으면 경고).

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..");

const OUT = process.argv[2];
if (!OUT || OUT.startsWith("--")) { console.error("사용법: node scripts/deep-packets.js <출력 폴더> [--beta]"); process.exit(1); }
const WITH_BETA = process.argv.includes("--beta");
fs.mkdirSync(OUT, { recursive: true });

function load(rel, key) {
  global.window = {};
  const f = path.join(ROOT, rel);
  delete require.cache[require.resolve(f)];
  require(f);
  return global.window[key];
}
const D = load("data/recommendations.js", "STOCK_DATA");
const Q = (load("data/quotes.js", "STOCK_QUOTES") || {}).quotes || {};
const TA = (load("data/stock-ta.js", "STOCK_TA") || {}).ta || {};
const DC = load("data/discovery-candidates.js", "DISCOVERY_CANDIDATES");
if (!DC || !DC.groups) { console.error("data/discovery-candidates.js 없음 — 먼저 node scripts/screen-discovery.js"); process.exit(1); }
const ageDays = (Date.now() - Date.parse(DC.builtAt)) / 86400000;
if (ageDays > 6) console.warn("⚠ 스크린이 " + ageDays.toFixed(1) + "일 전 것 — screen-discovery.js 재실행 권장");

const theme = {};
D.themes.forEach((t) => { theme[t.key] = t; });
const cut = (s, n) => (s ? String(s).replace(/\s+/g, " ").slice(0, n) : null);

// 국가 β(보유 기준, performance-report.js) — 교체가 β 를 1 쪽으로 움직이는지 판단하는 기준
const countryBeta = {};
try {
  const rep = execFileSync("node", [path.join(ROOT, "scripts/performance-report.js")], { encoding: "utf8", timeout: 300000 });
  rep.split("\n").forEach((l) => { const m = l.match(/^\s*(korea|us)\/정식전체.*β (-?[\d.]+)/); if (m) countryBeta[m[1]] = +m[2]; });
} catch (_e) { /* 없으면 메모만 생략 */ }
const betaNote = (c) => {
  const b = countryBeta[c];
  if (b == null) return null;
  const dir = b < 1 ? "위로(β 가 높은 후보)" : "아래로(β 가 낮은 후보)";
  return (c === "korea" ? "한국" : "미국") + " 정식 편성 보유 기준 β " + b.toFixed(2) + (b < 0.7 || b > 1.3 ? "(밴드 0.7~1.3 밖)" : "(밴드 0.7~1.3 안)") +
    " — 우량·성장·저평가 교체는 그날 교체를 합한 β 가 1 쪽, 즉 " + dir + " 가야 한다. 배당·히든은 β 예외. 같은 품질이면 β 가 1 에 가까워지는 후보를 앞에.";
};

// 종목별 β(선택) — vol-beta.js 출력 줄을 읽는다. 같은 폴더의 beta.json 에 캐시해 재실행 때 다시 받지 않는다.
let beta = {};
const betaFile = path.join(OUT, "beta.json");
if (WITH_BETA) {
  try { beta = JSON.parse(fs.readFileSync(betaFile, "utf8")); } catch (_e) { beta = {}; }
  const want = new Set();
  Object.keys(DC.groups).forEach((g) => {
    const [c, th] = g.split("|");
    const G = DC.groups[g];
    D[c].filter((s) => s.theme === th).forEach((s) => want.add(c + ":" + s.ticker));
    (G.candidates || []).concat(G.nearMiss || []).forEach((x) => want.add(c + ":" + x.ticker));
  });
  const todo = [...want].filter((k) => !(k in beta));
  for (let i = 0; i < todo.length; i += 40) {
    const chunk = todo.slice(i, i + 40);
    let out = "";
    try { out = execFileSync("node", [path.join(ROOT, "scripts/vol-beta.js")].concat(chunk), { encoding: "utf8", timeout: 600000 }); } catch (e) { out = String(e.stdout || ""); }
    out.split("\n").forEach((line) => {
      const m = line.match(/^(\S+)\s+\S+\s+vol60 ([\d.]+)% \| β 일간 (-?[\d.]+) · 주간 (-?[\d.]+)/);
      if (m) beta[m[1]] = { daily: +m[3], weekly: +m[4], vol60: +m[2] };
    });
    chunk.forEach((k) => { if (!(k in beta)) beta[k] = null; });
    fs.writeFileSync(betaFile, JSON.stringify(beta));
    console.log("  β " + Math.min(i + 40, todo.length) + "/" + todo.length);
  }
}

const written = [];
Object.keys(DC.groups).forEach((g) => {
  const [c, th] = g.split("|");
  const G = DC.groups[g];
  const scr = {};
  G.incumbents.forEach((x) => { scr[x.ticker] = x; });
  const members = D[c].filter((s) => s.theme === th).map((s) => {
    const q = Q[s.ticker];
    const p = q && typeof q.price === "number" && q.price > 0 ? q.price : s.price;
    const up = s.targetPrice && p ? Math.round((s.targetPrice / p - 1) * 1000) / 10 : null;
    const ta = TA[s.ticker] || {};
    return {
      ticker: s.ticker, name: s.name, market: s.market, tier: s.tier,
      price: p, priceDate: q ? q.date : s.priceDate, targetPrice: s.targetPrice, tpSource: s.tpSource || null,
      upsidePct: up, targetExhausted: up != null && up <= 0,
      dividendYield: s.dividendYield, aiTarget: s.aiTarget || null, verifiedAt: s.verifiedAt || null,
      signals: { short: ta.short && ta.short.signal, mid: ta.mid && ta.mid.signal, long: ta.long && ta.long.signal },
      vol60: ta.risk ? ta.risk.vol : null, beta: WITH_BETA ? beta[c + ":" + s.ticker] || null : undefined,
      thesis: cut(s.thesis, 260), earnings: cut(s.earnings, 200), risks: (s.risks || []).slice(0, 3).map((r) => cut(r, 120)),
      screen: scr[s.ticker] ? Object.assign({}, scr[s.ticker]) : null,
    };
  });
  const withBeta = (arr) => (arr || []).map((x) => (WITH_BETA ? Object.assign({}, x, { beta: beta[c + ":" + x.ticker] || null }) : x));
  const packet = {
    group: g, country: c, theme: th, themeLabel: theme[th].label, themeDefinition: theme[th].desc,
    screenBuiltAt: DC.builtAt, screenRule: G.rule, screenEligible: G.eligible,
    gateThresholds: G.gateThresholds || null, filterCuts: G.filterCuts || null, betaNote: betaNote(c),
    incumbents: members, candidates: withBeta(G.candidates),
  };
  if (G.nearMiss) packet.nearMiss = withBeta(G.nearMiss);
  if (c === "us" && /^(value|dividend)$/.test(th)) packet.noFactors = (DC.noFactors || {}).us || [];
  const f = path.join(OUT, g.replace("|", "-") + ".json");
  fs.writeFileSync(f, JSON.stringify(packet, null, 1));
  written.push(f);
});
console.log("C 모드 입력 묶음 " + written.length + "개 → " + OUT + (WITH_BETA ? " (β 포함)" : ""));
written.forEach((f) => console.log("  " + f));
