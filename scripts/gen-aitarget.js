#!/usr/bin/env node
// AI적정가 패치 생성기 — 조사된 입력값(inputs.json) + 밸류에이션 규칙(rules.json)으로
// update-reco.js 용 패치 JSON을 만든다. 검증 안 된 종목은 자동 제외(생략이 정상).
//
// inputs.json: { korea: [{t, eps, epsNote, dps, fpe, src[], note}], us: [...] }
// rules.json:  { "<country>:<ticker>": { method: "per"|"yield"|"fpe", mult: 10, yld: 4.2,
//                rationale: "적정 배수/수익률 선택 근거(한국어)" } }
//
// 방법: per   → aiTarget = eps × mult
//       yield → aiTarget = dps ÷ (yld/100)
//       fpe   → aiTarget = price ÷ fpe × mult (선행 PER 역산 EPS × 적정 PER)
// 사용: node scripts/gen-aitarget.js <inputs.json> <rules.json> <out-patch.json>

const fs = require("fs");
const path = require("path");
const [inputsPath, rulesPath, outPath, asOfArg] = process.argv.slice(2);
if (!inputsPath || !rulesPath || !outPath) {
  console.error("사용법: node scripts/gen-aitarget.js <inputs.json> <rules.json> <out-patch.json> [산출일 YYYY-MM-DD]");
  process.exit(1);
}
const AS_OF = asOfArg || new Date().toISOString().slice(0, 10);
const inputs = JSON.parse(fs.readFileSync(inputsPath, "utf8"));
const rules = JSON.parse(fs.readFileSync(rulesPath, "utf8"));

global.window = {};
require(path.join(__dirname, "..", "data", "recommendations.js"));
const D = global.window.STOCK_DATA;

function round(v, country) {
  if (country === "korea") return v >= 100000 ? Math.round(v / 1000) * 1000 : Math.round(v / 100) * 100;
  return Math.round(v * 100) / 100;
}
function fmt(v, country) {
  return country === "korea" ? Math.round(v).toLocaleString("ko-KR") + "원" : v.toLocaleString("en-US") + "달러";
}

const stocks = [];
const skipped = [];
["korea", "us"].forEach((c) => {
  (inputs[c] || []).forEach((row) => {
    const key = c + ":" + row.t;
    const rule = rules[key];
    const recos = D[c].filter((s) => s.ticker === row.t);
    if (!recos.length) { skipped.push(key + " (편성에 없음)"); return; }
    const s0 = recos[0];
    if (s0.aiTarget != null && !rules[key]) return; // 이미 산출된 종목은 규칙 없으면 유지
    if (!rule) { skipped.push(key + " (규칙 없음)"); return; }
    let v = null, basis = "";
    const srcNote = row.epsNote || "";
    if (rule.method === "per" && typeof row.eps === "number" && row.eps > 0) {
      v = row.eps * rule.mult;
      basis = "적정가 = 2026E EPS " + fmt(row.eps, c) + (srcNote ? "(" + srcNote + ", 검증)" : "(검증)") +
        " × 적정 PER " + rule.mult + "배(" + rule.rationale + ") ≈ " + fmt(round(v, c), c);
    } else if (rule.method === "yield" && typeof row.dps === "number" && row.dps > 0) {
      v = row.dps / (rule.yld / 100);
      basis = "적정가 = 연간 주당배당 " + fmt(row.dps, c) + "(검증) ÷ 요구 배당수익률 " + rule.yld +
        "%(" + rule.rationale + ") ≈ " + fmt(round(v, c), c) + " — 배당가치 기준 보수적 추정";
    } else if (rule.method === "fpe" && typeof row.fpe === "number" && row.fpe > 0 && s0.price > 0) {
      v = (s0.price / row.fpe) * rule.mult;
      basis = "적정가 = 12개월 선행 PER " + row.fpe + "배(검증)로 역산한 선행 EPS × 적정 PER " +
        rule.mult + "배(" + rule.rationale + ") ≈ " + fmt(round(v, c), c);
    } else {
      skipped.push(key + " (입력값 미검증: " + rule.method + ")");
      return;
    }
    v = round(v, c);
    const tp = s0.targetPrice;
    if (tp && Math.abs(v - tp) / tp > 0.5) basis += ". 컨센서스와 괴리 큼 — 참고 지표로만 볼 것";
    else if (tp) basis += ". 컨센서스(" + fmt(tp, c) + ") 대비 " + (v >= tp ? "높음" : "낮음/유사");
    recos.forEach((s) => stocks.push({ country: c, ticker: row.t, theme: s.theme, aiTarget: v, aiBasis: basis, aiAsOf: AS_OF }));
  });
});

fs.writeFileSync(outPath, JSON.stringify({ stocks }, null, 1));
console.log("패치 생성: " + stocks.length + "항목 → " + outPath);
if (skipped.length) console.log("제외(" + skipped.length + "): " + skipped.join(", "));
