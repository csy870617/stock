#!/usr/bin/env node
// 돈의 흐름 '지표 상세'(앱)의 긴 월별 추이 — data/liquidity-ind.json (LLM 토큰 0 · 네트워크 없음)
//
// 2026-11-19 사용자 '자금 흐름의 하위 내용을 눌렀을 때, 해당 되는 주제의 상세 화면을 만들어주고, 볼 수 있게 해줘'.
// 홈 '돈의 흐름' 카드의 지표 칸·상세의 지표 줄·신용 경고 줄을 누르면 그 지표의 상세가 열린다 — 이 파일은 그 화면의 그래프 자료다.
//   - 누적 월말 원자료(data/liquidity-hist.json, 2003~)를 흐름 점수와 같은 식(lib-liqflow.js)으로 지표마다 펼친다:
//     수준(lv) · 3개월 변화(sig — 흐름 점수에 들어가는 신호) · 그달 평소 대비(z — 직전 60개월 기준, 우호 방향 +) ·
//     지금 z 의 기준(base — 직전 60개월 평균·표준편차) · 미국 신용 경고 기준선(직전 60개월의 나쁜 3분의 1 경계)과 켜진 달 · 지수.
//   - 앱은 지표 상세를 열 때만 받는다(첫 화면엔 안 받는다). 오늘 값·방향(들어옴/빠짐)은 data/liquidity-flow.js 의 것을 쓴다.
// update-liquidity-flow.js 가 매일 끝에서 부른다. 단독 실행: node scripts/build-liquidity-ind.js
"use strict";
const fs = require("fs");
const path = require("path");
const { ok, mean, sd, rnd, DIRN, COMP, RISK_P, signals } = require("./lib-liqflow");

const ROOT = path.join(__dirname, "..");
const HIST = path.join(ROOT, "data", "liquidity-hist.json");
const FLOW = path.join(ROOT, "data", "liquidity-flow.js");
const OUT = path.join(ROOT, "data", "liquidity-ind.json");

// 지표별 화면 단위 — lv: 수준, sig: 3개월 변화(흐름 신호), mul: 신호 원값 → sig 단위 배수(지금 z 의 기준 평균·표준편차에 같이 쓴다)
//   M2R 의 수준은 명목 M2(조 달러), 신호는 실질 증가율(전년 대비 M2 − 물가). KFF3 의 신호는 3개월 합(조원) — 흐름 점수는 그 합을
//   직전 3년 표준편차로 나눈 값을 쓰므로 평균·표준편차 기준(base)은 만들지 않는다.
const per = (v, d) => (ok(v) ? v / d : null);   // 빈 달은 그대로 빈 값(null / 1e6 = 0 이 되지 않게)
const IND = {
  NL3: { lv: (h, m) => per(h(m, "NL"), 1e6), lvD: 3, mul: 100, sigD: 2 },
  CS3: { lv: (h, m) => h(m, "CS"), lvD: 2, mul: 100, sigD: 1 },
  FCI3: { lv: (h, m) => h(m, "FCI"), lvD: 3, mul: 1, sigD: 3 },
  USD3: { lv: (h, m) => h(m, "DXY"), lvD: 2, mul: 100, sigD: 2 },
  M2R: { lv: (h, m) => per(h(m, "M2"), 1000), lvD: 2, mul: 100, sigD: 2 },
  KDEP3: { lv: (h, m) => per(h(m, "DEP"), 1e6), lvD: 2, mul: 100, sigD: 2 },
  KMRG3: { lv: (h, m) => per(h(m, "MRG"), 1e6), lvD: 2, mul: 100, sigD: 2 },
  KFF3: { lv: (h, m) => per(h(m, "FF"), 1e4), lvD: 2, mul: null, sigD: 2 },
  KRW3: { lv: (h, m) => h(m, "KRW"), lvD: 1, mul: 100, sigD: 2 },
  KCS3: { lv: (h, m) => h(m, "KCS"), lvD: 3, mul: 100, sigD: 1 },
};
// 미국 신용 경고 4개 — 어느 지표 상세의 어느 그래프(수준 lv / 3개월 변화 sig)에 기준선을 그리나
const RISK = { CS: { ind: "CS3", on: "lv", mul: 1, d: 2 }, CS3: { ind: "CS3", on: "sig", mul: 100, d: 1 }, FCI: { ind: "FCI3", on: "lv", mul: 1, d: 3 }, FCI3: { ind: "FCI3", on: "sig", mul: 1, d: 3 } };

function readFlow() {
  try { const w = {}; new Function("window", fs.readFileSync(FLOW, "utf8"))(w); return w.LIQUIDITY_FLOW || null; } catch (_e) { return null; }
}

function build() {
  const H = JSON.parse(fs.readFileSync(HIST, "utf8"));
  const flow = readFlow();
  const { MS, h, SIG, histOf, zOf, SCORE } = signals(H);
  if (MS.length < 60) throw new Error("월말 원자료가 너무 짧다(" + MS.length + "개월)");
  const lastI = MS.length;

  const series = {}, base = {};
  Object.keys(IND).forEach((k) => {
    const d = IND[k];
    const sig = k === "KFF3"
      ? MS.map((m, i) => { const a = [0, 1, 2].map((j) => (i - j >= 0 ? h(MS[i - j], "FF") : null)); return a.every(ok) ? rnd(a.reduce((x, y) => x + y, 0) / 1e4, d.sigD) : null; })
      : MS.map((m) => (ok(SIG[k][m]) ? rnd(SIG[k][m] * d.mul, d.sigD) : null));
    series[k] = {
      lv: MS.map((m) => { const v = d.lv(h, m); return ok(v) ? rnd(v, d.lvD) : null; }),
      sig,
      z: MS.map((m, i) => rnd(zOf(k, SIG[k][m], histOf(k, i)), 2)),
    };
    if (d.mul) {
      const hs = histOf(k, lastI);
      if (hs.length >= 36) base[k] = { mean: rnd(mean(hs) * d.mul, 3), sd: rnd(sd(hs) * d.mul, 3), n: hs.length, from: MS[Math.max(0, lastI - 60)], to: MS[lastI - 1] };
    }
  });

  // 신용 경고 기준선 — 그달 앞 60개월의 우호 방향 값 중 아래 3분의 1 경계(update-liquidity-flow.js 의 '지금' 판정과 같은 식)
  const risk = {};
  Object.keys(RISK).forEach((k) => {
    const r = RISK[k];
    const cut = (i) => { const hs = histOf(k, i).map((v) => DIRN[k] * v).sort((a, b) => a - b); return hs.length >= 36 ? hs[Math.floor(hs.length / 3)] : null; };
    const thr = [], hit = [];
    MS.forEach((m, i) => {
      const c = cut(i), v = SIG[k][m];
      thr.push(ok(c) ? rnd(DIRN[k] * c * r.mul, r.d) : null);
      hit.push(ok(c) && ok(v) ? (DIRN[k] * v < c ? 1 : 0) : null);
    });
    const cNow = cut(lastI);
    risk[k] = { ind: r.ind, on: r.on, thr, hit, now: ok(cNow) ? rnd(DIRN[k] * cNow * r.mul, r.d) : null, p: RISK_P[k][0], base: RISK_P[k][1] };
  });

  const idx = {
    // 미국은 2003년부터 이어지는 SPY(S&P500 추종 ETF, 배당 재투자 가격)를 쓴다 — S&P500 지수 원자료(SPX)는 2020-11 부터만 쌓였다
    us: { name: "S&P500 추종 ETF(SPY · 배당 재투자)", short: "SPY", v: MS.map((m) => { const v = h(m, "SPY"); return ok(v) ? rnd(v, 2) : null; }) },
    korea: { name: "코스피", short: "코스피", v: MS.map((m) => { const v = h(m, "KS"); return ok(v) ? rnd(v, 2) : null; }) },
  };

  // 앞뒤 일치 점검 — 같은 원자료로 만든 liquidity-flow.js 의 월말 흐름 점수(최근 60개월)와 같아야 한다
  const warn = [];
  if (flow) ["us", "korea"].forEach((c) => {
    const fh = (flow[c] && flow[c].hist) || [];
    const bad = fh.filter((p) => { const v = SCORE[c][p[0]]; return !ok(v) || Math.abs(rnd(v, 3) - p[1]) > 0.0015; });
    if (fh.length && bad.length) warn.push(c + " 월말 흐름 점수 " + bad.length + "/" + fh.length + "개월 불일치(" + bad.slice(0, 3).map((p) => p[0]).join(", ") + ")");
    // 지금 z — liquidity-flow.js 의 오늘 값(3개월 변화)을 이 기준(평균·표준편차)으로 다시 재면 같은 z 가 나와야 한다
    ((flow[c] && flow[c].comps) || []).forEach((x) => {
      const b = base[x.key], v = x.chg != null ? x.chg : x.value;
      if (!b || !ok(v) || !ok(x.z) || !(b.sd > 0)) return;
      const z = DIRN[x.key] * (v - b.mean) / b.sd;
      if (Math.abs(z - x.z) > 0.03) warn.push(c + " " + x.key + " 지금 z " + x.z + " ↔ 기준으로 다시 잰 값 " + rnd(z, 2));
    });
  });

  const out = {
    asOf: (flow && flow.asOf) || new Date().toISOString().slice(0, 10),
    builtAt: new Date().toISOString().slice(0, 19) + "Z",
    note: "돈의 흐름 지표 상세의 월말 추이(build-liquidity-ind.js — 원자료 liquidity-hist.json, 식 lib-liqflow.js). lv 수준·sig 3개월 변화·z 그달 평소 대비(직전 60개월, 돈이 들어오는 쪽 +)·base 지금 z 의 기준·risk 미국 신용 경고 기준선(thr)과 켜진 달(hit)·idx 지수.",
    comp: COMP,
    months: MS,
    series, base, risk, idx,
  };
  fs.writeFileSync(OUT, JSON.stringify(out));
  return { out, warn, bytes: fs.statSync(OUT).size };
}

module.exports = { build };

if (require.main === module) {
  try {
    const r = build();
    console.log("liquidity-ind.json 갱신 — " + r.out.months[0] + "~" + r.out.months[r.out.months.length - 1] + " · 지표 " + Object.keys(r.out.series).length + "개 · " + Math.round(r.bytes / 1024) + "KB");
    r.warn.forEach((w) => console.log("::warning::build-liquidity-ind: " + w));
  } catch (e) { console.error("build-liquidity-ind 실패:", e && e.message); process.exit(1); }
}
