#!/usr/bin/env node
"use strict";
//
// C 모드(주간 심층 발굴, CLAUDE.md §3-6) 서브에이전트 입력 묶음 — 그룹별 JSON 10개 (토큰 0)
//
//   node scripts/deep-packets.js <출력 폴더>     # 예: 세션 scratchpad 아래 deep/
//
// 묶음 = 주제 정의 + 스크린 규칙·적격 수 + 현 편성 9종목(tier·현재가·목표가·상승여력·목표가 소진 여부·배당·AI적정가·
//        재검증일·엔진 신호 3종·60일 변동성·논거/실적/리스크 요약·같은 잣대로 잰 스크린 지표) + 스크린 후보 상위 10.
// 서브에이전트 지침은 docs/DEEP-DISCOVERY-AGENT.md — 그 안의 {PACKET} 을 이 파일이 쓴 경로로 바꿔 넘긴다.
//
// ★ 상승여력·목표가 소진은 quotes.js 현재가로 계산한다. recommendations.js 의 price·upside 는 quotes.js 미보유
//   종목용 폴백값이라, 예전에는 7월 가격이 남아 '거짓 목표가 소진'(삼성물산 -9.8%, 실제 +58%) 같은 오판을 낳았다(2026-10-12).
// 먼저 `node scripts/screen-discovery.js` 로 data/discovery-candidates.js 를 최신화해 둘 것(6일 넘으면 경고).

const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const OUT = process.argv[2];
if (!OUT) { console.error("사용법: node scripts/deep-packets.js <출력 폴더>"); process.exit(1); }
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
      vol60: ta.risk ? ta.risk.vol : null,
      thesis: cut(s.thesis, 260), earnings: cut(s.earnings, 200), risks: (s.risks || []).slice(0, 3).map((r) => cut(r, 120)),
      screen: scr[s.ticker] ? Object.assign({}, scr[s.ticker]) : null,
    };
  });
  const packet = {
    group: g, country: c, theme: th, themeLabel: theme[th].label, themeDefinition: theme[th].desc,
    screenBuiltAt: DC.builtAt, screenRule: G.rule, screenEligible: G.eligible,
    incumbents: members, candidates: G.candidates,
  };
  const f = path.join(OUT, g.replace("|", "-") + ".json");
  fs.writeFileSync(f, JSON.stringify(packet, null, 1));
  written.push(f);
});
console.log("C 모드 입력 묶음 " + written.length + "개 → " + OUT);
written.forEach((f) => console.log("  " + f));
