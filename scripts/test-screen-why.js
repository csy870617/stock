#!/usr/bin/env node
// 발굴 스크린 진단(WHY) ↔ 판정(RULES.ok) 일치 시험 — 네트워크 없이 돈다(토큰 0).
//   screen-discovery.js 의 WHY[나라][주제](정체성 조건을 하나씩 풀어 쓴 진단)가 RULES[나라][주제].ok 와 같은 판정을 내는지
//   무작위 입력(빈 값·경계값 포함)으로 확인한다. 조건을 고치고 진단을 안 고치면 여기서 걸린다(진단은 그때 예전 문구로 돌아간다).
//   사용: node scripts/test-screen-why.js        — 어긋나면 exit 1
"use strict";
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "screen-discovery.js"), "utf8");
const a = src.indexOf("const g0 = "), b = src.indexOf("// 점수용 파생값");
if (a < 0 || b < 0) { console.error("test-screen-why: screen-discovery.js 에서 규칙 구간을 찾지 못함"); process.exit(1); }
const M = new Function(src.slice(a, b) + "\nreturn { RULES, WHY, whyNot, gateWhy, nearOne, gateNear };")();
// 진단 항목의 모양 — [조건, 문구, 키, (선택) 근접 판정]
for (const c of Object.keys(M.RULES)) for (const th of Object.keys(M.RULES[c])) {
  if (!M.WHY[c] || !M.WHY[c][th]) { console.error("test-screen-why: WHY 에 " + c + "|" + th + " 없음"); process.exit(1); }
  M.WHY[c][th].forEach((p, i) => { if (typeof p[0] !== "function" || typeof p[1] !== "function" || typeof p[2] !== "string" || (p[3] != null && typeof p[3] !== "function")) { console.error("test-screen-why: WHY " + c + "|" + th + "[" + i + "] 모양 이상"); process.exit(1); } });
}

// 재현되는 무작위(mulberry32)
let seed = 20261114;
const rnd = () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const pick = (xs) => xs[Math.floor(rnd() * xs.length)];
const EMPTY = [undefined, null];
const num = (vals) => (rnd() < 0.12 ? pick(EMPTY) : rnd() < 0.5 ? pick(vals) : pick(vals) + (rnd() - 0.5) * 0.02);
const row = () => ({
  market: pick(["KOSPI", "KOSDAQ", "NASDAQ", "NYSE", undefined]),
  rank: rnd() < 0.1 ? pick(EMPTY) : pick([1, 59, 60, 61, 119, 120, 121, 149, 150, 151, 199, 200, 201, 249, 250, 251, 299, 300, 301, 399, 400, 401, 449, 450, 451, 600]),
  fin: pick([true, false, undefined]), cycl: pick([true, false, undefined]), lp: pick([true, false, undefined]),
  opPos: pick([true, false, undefined]), npPos: pick([true, false, undefined]),
  roe: num([-5, 0, 6.9, 7, 7.1, 30]), debt: num([0, 149, 150, 151, 900]), roa: num([-3, 4.9, 5, 5.1, 20]),
  revE: num([-0.2, 0, 0.149, 0.15, 0.151, 0.6]), revG: num([-0.2, 0, 0.149, 0.15, 0.151, 0.6]), qRevYoY: num([-0.2, 0, 0.149, 0.15, 0.151, 0.6]),
  opE: num([-0.5, 0, 0.001, 0.4]), qOpYoY: num([-0.5, 0, 0.001, 0.4]), ebitYoY: num([-0.5, 0, 0.001, 0.4]),
  ttmEbit: num([-100, 0, 1, 5000]), ttmNi: num([-100, 0, 1, 5000]), ebitM: num([-0.1, 0.099, 0.1, 0.101, 0.4]),
  divY: num([0, 2.49, 2.5, 2.51, 3.49, 3.5, 3.51, 9]), payout: num([0, 0.89, 0.9, 0.91, 0.99, 1, 1.01, 3]),
  per: num([5, 12, 16, 40]), pbr: num([0.5, 0.9, 2, 8]), fx: rnd() < 0.2 ? undefined : { ROIC3: num([0.02, 0.2]), EBITEV: num([0.01, 0.1]), FCFP: num([0.01, 0.1]) },
});
let n = 0, bad = 0, empty = 0;
const N = 200000;
for (let i = 0; i < N; i++) {
  const s = row();
  for (const c of Object.keys(M.RULES)) for (const th of Object.keys(M.RULES[c])) {
    n++;
    const ok = !!M.RULES[c][th].ok(s), parts = M.WHY[c][th], all = parts.every((p) => !!p[0](s));
    if (ok !== all) { if (++bad <= 5) console.error("어긋남 " + c + "|" + th + " ok=" + ok + " 진단=" + all + " " + JSON.stringify(s)); continue; }
    const w = M.whyNot(c, th, s);
    if (!ok && (!w.length || w.some((x) => typeof x !== "string" || !x || /undefined|NaN/.test(x)))) { if (++empty <= 5) console.error("문구 이상 " + c + "|" + th + " " + JSON.stringify(w) + " " + JSON.stringify(s)); }
    if (ok && w.length) { if (++empty <= 5) console.error("통과인데 문구 " + c + "|" + th + " " + JSON.stringify(w)); }
    const keys = M.whyNot(c, th, s, true);
    if (keys.length !== w.length || keys.some((k) => !/^id:[A-Za-z]+$/.test(k))) { if (++empty <= 5) console.error("키 이상 " + c + "|" + th + " " + JSON.stringify(keys)); }
    const nr = M.nearOne(c, th, s);
    if (nr != null && (ok || typeof nr !== "string" || w.length !== 1 || w[0] !== nr)) { if (++empty <= 5) console.error("근접 판정 이상 " + c + "|" + th + " " + JSON.stringify(nr)); }
    if (typeof M.gateNear(c, th, s, { roic3Median: 9.6, ebitevP70: 6.6, fcfpP70: 7.5 }) !== "boolean") { if (++empty <= 5) console.error("분포 근접 판정이 참/거짓이 아님 " + c + "|" + th); }
    const g = M.gateWhy(c, th, s, { roic3Median: 9.6, ebitevP70: 6.6, fcfpP70: 7.5 });
    if (typeof g !== "string" || /undefined|NaN/.test(g)) { if (++empty <= 5) console.error("분포 문구 이상 " + c + "|" + th + " " + JSON.stringify(g)); }
  }
}
console.log("test-screen-why: " + n + "건 — 판정 어긋남 " + bad + " · 문구 이상 " + empty);
process.exit(bad || empty ? 1 : 0);
