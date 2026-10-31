#!/usr/bin/env node
// 한국 실적 프리뷰 연구(PREREG-KR.md): 발표 전 30일 리포트로 만든 신호
//   P1 부정 우세 · P2 목표가 하향 우세 · P3 기대 하회 명시 우세 가 발표 반응을 아래로 가르나(방향)
// 사용: node scripts/research/earn-shock/test-kr-preview.js <일봉 캐시(px/)> <자료 폴더(es/)> <한국 목표가(tgt-kr/)> <한국 분할(kpx/)> [--out 결과.json]
//   발표일·반응·시즌 t 는 test-shock.js 와 같다. 표본은 창(m−30일, m] 안에 리포트가 1건 이상 있는 발표.
"use strict";
const fs = require("fs"), path = require("path");
const [PX, ES, TKR, KPX] = process.argv.slice(2);
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const readJ = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (_e) { return null; } };
const dayShift = (iso, k) => new Date(Date.parse(iso + "T00:00:00Z") + k * 864e5).toISOString().slice(0, 10);
const START = "2021-10-01", HALF = "2024-01-01";
const LS = [2, 10, 20];
// 낱말(사전 등록 그대로)
const NEG = /하회|부진|쇼크|우려|눈높이|하향|적자|감익/;
const POS = /상회|서프라이즈|호실적|호조|상향|증익|흑자\s*전환|흑전|최대/;
const EXP_NEG = /(컨센서스|컨센|기대치|시장\s*기대|시장\s*예상|예상치|추정치|눈높이)[^.\n]{0,15}(하회|밑돌|미달|미치지\s*못)|어닝\s*쇼크|실적\s*쇼크/;
const EXP_POS = /(컨센서스|컨센|기대치|시장\s*기대|시장\s*예상|예상치|추정치|눈높이)[^.\n]{0,15}(상회|웃돌|넘어|뛰어넘)|서프라이즈/;

// ── 가격과 한국 동일비중 지수(test-shock.js 와 같다) ──
const stocks = [];
for (const f of fs.readdirSync(PX)) {
  const j = readJ(path.join(PX, f)); if (!j || j.bench || !j.cl || j.c !== "korea") continue;
  stocks.push({ s: j.s, key: j.s.slice(0, 6), d: j.d, cl: j.cl });
}
const sum = new Map(), cnt = new Map();
for (const s of stocks) for (let i = 1; i < s.d.length; i++) { const r = s.cl[i] / s.cl[i - 1] - 1; if (!ok(r) || Math.abs(r) > 0.6) continue; sum.set(s.d[i], (sum.get(s.d[i]) || 0) + r); cnt.set(s.d[i], (cnt.get(s.d[i]) || 0) + 1); }
const mkt = new Map(); { let v = 1; for (const d of [...sum.keys()].sort()) { v *= 1 + sum.get(d) / cnt.get(d); mkt.set(d, v); } }
const ret = (s, i0, i1) => (i0 >= 0 && i1 < s.cl.length && i0 < i1 ? s.cl[i1] / s.cl[i0] - 1 : null);
const exr = (s, i0, i1) => { const r = ret(s, i0, i1); if (r == null) return null; const a = mkt.get(s.d[i0]), b = mkt.get(s.d[i1]); return a && b ? r - (b / a - 1) : null; };
const firstOnOrAfter = (s, iso) => { let lo = 0, hi = s.d.length - 1, ans = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (s.d[m] >= iso) { ans = m; hi = m - 1; } else lo = m + 1; } return ans; };

// ── 발표일(test-shock.js 와 같다) ──
function eventsOf(s) {
  const a = readJ(path.join(ES, "kr-events", s.key + ".json")) || [];
  const cons = a.filter((x) => /연결재무제표기준영업\(잠정\)실적/.test(x[2]));
  const use = cons.length ? cons : a;
  const ds = [...new Set(use.map((x) => x[0]))].sort(), out = [];
  for (const d of ds) { if (!cons.length && out.length && Date.parse(d) - Date.parse(out[out.length - 1]) < 45 * 864e5) continue; out.push(d); }
  return out;
}
// ── 증권사별 목표가 변경(같은 증권사 직전 목표가 365일 안 대비, 분할은 지금 단위로) ──
function revisionsOf(s) {
  const px = readJ(path.join(KPX, s.key + ".json"));
  const splits = (px && px.splits) || [];
  const after = (d) => splits.filter((x) => x[0] > d).reduce((p, x) => p * x[1], 1);
  const rows = (readJ(path.join(TKR, s.key + ".json")) || []).filter((x) => x.goal > 0 && x.d).map((x) => ({ d: x.d, f: x.broker, g: x.goal / after(x.d) })).sort((a, b) => (a.d < b.d ? -1 : 1));
  const last = new Map(), out = [];
  for (const x of rows) {
    const p = last.get(x.f);
    if (p && Date.parse(x.d) - Date.parse(p.d) <= 365 * 864e5) out.push({ d: x.d, f: x.f, ch: x.g / p.g - 1 });
    last.set(x.f, x);
  }
  return out;
}

// ── 표본 ──
const E = [];
for (const s of stocks) {
  const evd = eventsOf(s); if (!evd.length) continue;
  const T = (readJ(path.join(ES, "kr-titles", s.key + ".json")) || []).map((x) => ({ d: x[0], txt: String(x[2] || "") + " " + String(x[3] || "") }));
  const RV = revisionsOf(s);
  let prev = null;
  for (const d of evd) {
    const r = firstOnOrAfter(s, d);
    if (r < 0 || r + 1 >= s.cl.length) { prev = null; continue; }
    if (Date.parse(s.d[r]) - Date.parse(d) > 6 * 864e5) continue;
    const ar = exr(s, r - 1, r + 1);
    const ev = { s: s.s, d: s.d[r], season: s.d[r].slice(0, 4) + "Q" + (Math.floor((+s.d[r].slice(5, 7) - 1) / 3) + 1), ar, post: exr(s, r + 1, Math.min(r + 22, s.cl.length - 1)), at: {} };
    for (const L of LS) {
      const m = r - L;
      if (m < 1) continue;
      if (prev && m <= prev.r + 1) continue;
      const Dm = s.d[m], from = dayShift(Dm, -30);
      const w = T.filter((x) => x.d > from && x.d <= Dm);
      if (!w.length) continue;   // 리포트가 없는 발표는 표본 밖
      const neg = w.filter((x) => NEG.test(x.txt)).length, pos = w.filter((x) => POS.test(x.txt)).length;
      const xn = w.filter((x) => EXP_NEG.test(x.txt)).length, xp = w.filter((x) => EXP_POS.test(x.txt)).length;
      const lastBy = new Map(); RV.filter((x) => x.d > from && x.d <= Dm).forEach((x) => lastBy.set(x.f, x.ch));
      const lo = [...lastBy.values()].filter((c) => c < -0.005).length, up = [...lastBy.values()].filter((c) => c > 0.005).length;
      ev.at[L] = { n: w.length, P1: neg > pos, P2: lo >= 2 && lo > up, P3: xn >= 1 && xn > xp, F4: neg >= 1, neg, pos, xn, xp, lo, up };
    }
    prev = { r };
    if (ev.d >= START && ok(ar)) E.push(ev);
  }
}

// ── 판정 ──
function seasonStat(list, L, k) {
  const by = new Map(); list.forEach((e) => { if (!by.has(e.season)) by.set(e.season, []); by.get(e.season).push(e); });
  const diffs = [];
  for (const [, a] of [...by.entries()].sort()) {
    const y = a.filter((e) => e.at[L][k]), n = a.filter((e) => !e.at[L][k]);
    if (y.length >= 5 && n.length >= 5) diffs.push(mean(y.map((e) => e.ar)) - mean(n.map((e) => e.ar)));
  }
  const m = mean(diffs), sd = diffs.length > 1 ? Math.sqrt(diffs.reduce((s, v) => s + (v - m) ** 2, 0) / (diffs.length - 1)) : null;
  return { diff: m, t: sd ? m / (sd / Math.sqrt(diffs.length)) : null, seasons: diffs.length };
}
const rate = (a, fn) => (a.length ? a.filter(fn).length / a.length : null);
function rates(list, L, k) {
  const y = list.filter((e) => e.at[L][k]), n = list.filter((e) => !e.at[L][k]);
  const sh = (e) => e.ar <= -0.05, big = (e) => e.ar <= -0.10, jump = (e) => e.ar >= 0.10;
  return { nY: y.length, nN: n.length, share: y.length / (list.length || 1), arY: mean(y.map((e) => e.ar)), arN: mean(n.map((e) => e.ar)),
    shockY: rate(y, sh), shockN: rate(n, sh), ratio: rate(n, sh) ? rate(y, sh) / rate(n, sh) : null, bigY: rate(y, big), bigN: rate(n, big),
    jumpY: rate(y, jump), jumpN: rate(n, jump), postY: mean(y.map((e) => e.post)), postN: mean(n.map((e) => e.post)) };
}
const KS = ["P1", "P2", "P3", "F4"];
const res = { n: E.length, L: {} };
for (const L of LS) {
  const V = E.filter((e) => e.at[L]);
  res.L[L] = { n: V.length };
  for (const k of KS) {
    const all = seasonStat(V, L, k), h1 = seasonStat(V.filter((e) => e.d < HALF), L, k), h2 = seasonStat(V.filter((e) => e.d >= HALF), L, k), r = rates(V, L, k);
    const pass = k !== "F4" && all.diff != null && all.diff <= -0.01 && all.t != null && all.t <= -2 && h1.diff < 0 && h2.diff < 0 && r.ratio >= 1.3;
    res.L[L][k] = { all, h1: h1.diff, h2: h2.diff, rates: r, pass };
  }
}
// 채택: r−2 에서 통과한 신호 중 차이가 가장 큰 하나, 표시 기간은 10·20 에서도 통과한 가장 긴 것까지
const passed = ["P1", "P2", "P3"].filter((k) => res.L[2][k].pass).sort((a, b) => res.L[2][a].all.diff - res.L[2][b].all.diff);
res.adopt = passed.length ? passed[0] : null;
res.window = null;
if (res.adopt) { res.window = 7; if (res.L[10][res.adopt].pass) { res.window = 10; if (res.L[20][res.adopt].pass) res.window = 20; } }
const OUT = arg("out"); if (OUT) fs.writeFileSync(OUT, JSON.stringify(res, null, 1));

const p = (v) => (v == null ? "–" : (v * 100).toFixed(2));
console.log("한국 발표 " + E.length + "건(2021-10~) · 창 안 리포트가 있는 발표: " + LS.map((L) => "r−" + L + " " + res.L[L].n).join(" · "));
for (const L of LS) {
  console.log("\n■ r−" + L);
  for (const k of KS) {
    const x = res.L[L][k], r = x.rates;
    console.log("  " + k + ": 신호 " + r.nY + "건(" + p(r.share) + "%) · 시즌 평균 차이 " + p(x.all.diff) + "%p (t " + (x.all.t == null ? "–" : x.all.t.toFixed(2)) + ", " + x.all.seasons + "시즌) 전반 " + p(x.h1) + " 후반 " + p(x.h2) +
      " | 반응 " + p(r.arY) + " vs " + p(r.arN) + " · 충격 " + p(r.shockY) + "% vs " + p(r.shockN) + "% (" + (r.ratio || 0).toFixed(2) + "배) · 큰 충격 " + p(r.bigY) + " vs " + p(r.bigN) +
      " · 급등 " + p(r.jumpY) + " vs " + p(r.jumpN) + " · 뒤 21일 " + p(r.postY) + " vs " + p(r.postN) + (k === "F4" ? " (참고)" : " → 통과 " + x.pass));
  }
}
console.log("\n채택: " + (res.adopt ? res.adopt + " — 표시 " + res.window + "거래일 안" : "없음(지금 표시 유지)"));
