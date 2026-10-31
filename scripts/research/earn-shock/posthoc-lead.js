#!/usr/bin/env node
// 실적 주의 앞당기기 — 사후 분석(판정 뒤, 판정에 쓰지 않음): 한국에서 '신호 3개 이상 vs 0개' 배수가 들쭉날쭉한 까닭이
//   증권사가 다루지 않는 종목(목표가·리포트가 없어 신호가 0개로만 잡히고 변동이 큰 중소형)이 '0개' 쪽에 섞여서인지 본다.
// 사용: node scripts/research/earn-shock/posthoc-lead.js <test-lead.js --dump 결과>
"use strict";
const E = JSON.parse(require("fs").readFileSync(process.argv[2], "utf8"));
const LS = [2, 10, 20, 40, 60];
const big = (e) => Math.abs(e.ar) >= 0.10;
const rate = (a) => (a.length ? a.filter(big).length / a.length : null);
const p = (v) => (v == null ? "–" : (v * 100).toFixed(1) + "%");
const x2 = (a, b) => (a != null && b ? (a / b).toFixed(2) + "배" : "–");
for (const c of ["korea", "us"]) {
  console.log("\n■ " + c);
  for (const L of LS) {
    const V = E.filter((e) => e.c === c && e.cnt[L] != null);
    const cov = V.filter((e) => e.cov[L].f1), unc = V.filter((e) => !e.cov[L].f1);
    const y = V.filter((e) => e.cnt[L] >= 3), z = V.filter((e) => e.cnt[L] === 0);
    const zc = z.filter((e) => e.cov[L].f1), zu = z.filter((e) => !e.cov[L].f1);
    const yc = y.filter((e) => e.cov[L].f1);
    const mid = V.filter((e) => e.cnt[L] >= 1 && e.cnt[L] <= 2);
    const line = "  L=" + L + ": 3개 이상 " + p(rate(y)) + "(" + y.length + ") · 0개 " + p(rate(z)) + "(" + z.length + ") → " + x2(rate(y), rate(z)) +
      " | 0개 중 증권사 자료 있음 " + p(rate(zc)) + "(" + zc.length + ") vs 없음 " + p(rate(zu)) + "(" + zu.length + ")" +
      " | 자료 있는 종목끼리 3개 이상 " + p(rate(yc)) + "(" + yc.length + ") vs 0개 " + p(rate(zc)) + " → " + x2(rate(yc), rate(zc)) +
      " | 1~2개 " + p(rate(mid)) + " · 자료 있음 전체 " + p(rate(cov)) + " vs 없음 " + p(rate(unc));
    console.log(line);
    if (c === "korea") {
      const mk = (re) => { const a = V.filter((e) => re.test(e.s)); const yy = a.filter((e) => e.cnt[L] >= 3), zz = a.filter((e) => e.cnt[L] === 0); return p(rate(yy)) + "(" + yy.length + ") vs " + p(rate(zz)) + "(" + zz.length + ") → " + x2(rate(yy), rate(zz)); };
      console.log("      KOSPI " + mk(/\.KS$/) + " · KOSDAQ " + mk(/\.KQ$/));
    }
  }
}
