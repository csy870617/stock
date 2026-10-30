#!/usr/bin/env node
// 관심 차트 패턴 × 훌륭한 기업 — 사전 등록(PREREG.md) 평가 실행
// 사용: node scripts/research/watch/test-watch.js <theme 캐시> <일봉 캐시> [--out 결과.json]
//   theme 캐시 = scripts/research/theme/ 의 <캐시>/<us|kr>/panel.json(시점 일치 재무·월말 순위·다음 1·3·6·12개월 총수익)
//   일봉 캐시 = fetch-daily.js 가 받은 <캐시>/<us|kr>/<티커>.json({d:[YYYYMMDD], c:[종가]})
"use strict";
const fs = require("fs");
const path = require("path");

const THEME = path.resolve(process.argv[2] || "theme"), DAILY = path.resolve(process.argv[3] || "watch-daily");
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const median = (a) => { const x = a.filter(ok).sort((p, q) => p - q); if (!x.length) return null; const m = x.length >> 1; return x.length % 2 ? x[m] : (x[m - 1] + x[m]) / 2; };
function nw(series, lag) {
  const x = series.filter(ok); const T = x.length; if (T < 6) return { mean: mean(x), t: null, n: T };
  const m = x.reduce((s, v) => s + v, 0) / T;
  const g = (k) => { let s = 0; for (let i = k; i < T; i++) s += (x[i] - m) * (x[i - k] - m); return s / T; };
  let v = g(0); for (let k = 1; k <= lag; k++) v += 2 * (1 - k / (lag + 1)) * g(k);
  return { mean: m, t: v > 0 ? m / Math.sqrt(v / T) : null, n: T };
}
const r4 = (v) => (ok(v) ? Math.round(v * 10000) / 10000 : null);
const t2 = (v) => (ok(v) ? Math.round(v * 100) / 100 : null);

// ── 패턴(screen-watch.js 와 같은 식) ──
const P = { SPREAD_MAX: 5, OFF_HIGH_MAX: -8, ABOVE_LOW_MIN: 1, BASE_MIN_DAYS: 15, BASE_WIDTH_MAX: 25, REL_MIN: -5, REL_MAX: 15, FRESH_GAP: 15 };
function sma(arr, n, off) { off = off || 0; if (arr.length < n + off) return null; let s = 0; for (let i = arr.length - n - off; i < arr.length - off; i++) s += arr[i]; return s / n; }
function patterns(cl) {
  const N = cl.length, px = cl[N - 1];
  const ma5 = sma(cl, 5), ma20 = sma(cl, 20), ma60 = sma(cl, 60), ma5prev = sma(cl, 5, 3);
  if (ma5 == null || ma20 == null || ma60 == null) return null;
  let hi52 = -Infinity; for (let i = Math.max(0, N - 252); i < N; i++) if (cl[i] > hi52) hi52 = cl[i];
  let lo90 = Infinity; for (let i = Math.max(0, N - 90); i < N; i++) if (cl[i] < lo90) lo90 = cl[i];
  const spread = (Math.max(ma5, ma20, ma60) - Math.min(ma5, ma20, ma60)) / px * 100;
  const offHigh = (px / hi52 - 1) * 100, aboveLow = (px / lo90 - 1) * 100;
  const stacked = ma5 >= ma20 && ma20 >= ma60, nearStacked = ma5 >= ma20 * 0.985 && ma20 >= ma60 * 0.975;
  const T = spread <= P.SPREAD_MAX && (stacked || nearStacked) && offHigh <= P.OFF_HIGH_MAX && aboveLow >= P.ABOVE_LOW_MIN && ma5 > ma5prev;
  const bEnd = N - P.FRESH_GAP;
  let prevHigh = -Infinity, hiIdx = -1; for (let i = 0; i < bEnd; i++) if (cl[i] >= prevHigh) { prevHigh = cl[i]; hiIdx = i; }
  const baseDays = (bEnd - 1) - hiIdx;
  let wmax = -Infinity, wmin = Infinity; for (let i = Math.max(0, N - 65); i < bEnd; i++) { if (cl[i] > wmax) wmax = cl[i]; if (cl[i] < wmin) wmin = cl[i]; }
  const baseWidth = wmax > -Infinity ? (wmax - wmin) / px * 100 : 999;
  const rel = (px / prevHigh - 1) * 100, wasBelow = cl[N - P.FRESH_GAP - 1] < prevHigh * 0.98;
  const B = rel >= P.REL_MIN && rel <= P.REL_MAX && wasBelow && baseDays >= P.BASE_MIN_DAYS && baseWidth <= P.BASE_WIDTH_MAX;
  return { B, T };
}

const monthEnd = (ym) => { const [y, m] = ym.split("-").map(Number); return +(new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10).replace(/-/g, "")); };
const dayDiff = (a, b) => (Date.UTC(Math.floor(a / 10000), Math.floor(a / 100) % 100 - 1, a % 100) - Date.UTC(Math.floor(b / 10000), Math.floor(b / 100) % 100 - 1, b % 100)) / 864e5;

const out = {};
for (const [C, lim, split] of [["us", 1000, "2019-01"], ["kr", 600, "2024-04"]]) {
  const Pn = JSON.parse(fs.readFileSync(path.join(THEME, C, "panel.json"), "utf8"));
  const FI = {}; Pn.fields.forEach((f, i) => { FI[f] = i; });
  const get = (r, f) => (f in FI ? r[FI[f]] : null);
  const half = lim / 2;
  const cache = new Map();
  const daily = (t) => {
    if (cache.has(t)) return cache.get(t);
    let x = null; try { x = JSON.parse(fs.readFileSync(path.join(DAILY, C, t + ".json"), "utf8")); } catch (_e) { x = null; }
    cache.set(t, x); return x;
  };
  // 날짜 × 유니버스(개발 dev / 확인용 hold) 묶음
  const byKey = new Map();
  let nPat = 0, nNo = 0;
  for (const r of Pn.rows) {
    const rk = get(r, "rank"); if (!ok(rk) || rk > lim) continue;
    const ym = get(r, "ym"), tier = rk <= half ? "dev" : "hold";
    const k = ym + "|" + tier; if (!byKey.has(k)) byKey.set(k, []);
    const row = { r, ym, tier, pat: null };
    const x = daily(get(r, "t"));
    if (x && x.d.length >= 252) {
      const me = monthEnd(ym);
      let lo = 0, hi = x.d.length - 1, idx = -1;
      while (lo <= hi) { const m = (lo + hi) >> 1; if (x.d[m] <= me) { idx = m; lo = m + 1; } else hi = m - 1; }
      if (idx >= 251 && dayDiff(me, x.d[idx]) <= 7) { row.pat = patterns(x.c.slice(idx - 251, idx + 1)); nPat++; } else nNo++;
    } else nNo++;
    byKey.get(k).push(row);
  }
  // 날짜별 관문·초과수익
  const H = [1, 3, 6, 12];
  const SETS = ["B", "T", "BH", "BG", "BP", "BF", "TH", "TG", "TP", "TF", "H", "G", "Pq", "F", "ALL"];
  const res = { dev: {}, hold: {} };
  const ev = { dev: {}, hold: {} };   // 사건 단위(폭락·오른 비율)
  ["dev", "hold"].forEach((tr) => { SETS.forEach((s) => { res[tr][s] = []; ev[tr][s] = { n: 0, crash: 0, nc: 0, up: 0, nu: 0, h1: { crash: 0, nc: 0 }, h2: { crash: 0, nc: 0 } }; }); });
  const keys = [...byKey.keys()].sort();
  for (const k of keys) {
    const [ym, tier] = k.split("|"), pool = byKey.get(k), hf = ym < split ? "h1" : "h2";
    const cut90 = (list, f) => { const xs = list.map((o) => get(o.r, f)).filter(ok).sort((a, b) => a - b); return xs.length >= 30 ? xs[Math.floor(xs.length * 0.9)] : null; };
    const agCut = cut90(pool, "AG"), sCut = { 1: cut90(pool.filter((o) => get(o.r, "fin")), "SROA"), 0: cut90(pool.filter((o) => !get(o.r, "fin")), "SROA") };
    const roicMed = median(pool.filter((o) => !get(o.r, "fin")).map((o) => get(o.r, "ROIC3")));
    const roeMedFin = median(pool.filter((o) => get(o.r, "fin")).map((o) => get(o.r, "ROE")));
    const isH = (r) => {
      if (get(r, "niPos") === 0) return false;
      if (ok(get(r, "ISS")) && get(r, "ISS") > 0.05) return false;
      if (agCut != null && ok(get(r, "AG")) && get(r, "AG") >= agCut) return false;
      const sc = sCut[get(r, "fin") ? 1 : 0];
      if (sc != null && ok(get(r, "SROA")) && get(r, "SROA") >= sc) return false;
      return true;
    };
    const isG = (r) => ok(get(r, "SG1")) && get(r, "SG1") > 0 && ok(get(r, "OPG")) && get(r, "OPG") > 0;
    const isP = (r) => (get(r, "fin") ? ok(get(r, "ROE")) && roeMedFin != null && get(r, "ROE") >= roeMedFin : ok(get(r, "ROIC3")) && roicMed != null && get(r, "ROIC3") >= roicMed);
    const isF = (r) => ok(get(r, "F")) && get(r, "F") >= 7;
    const mr = {}; H.forEach((h) => { mr[h] = mean(pool.map((o) => get(o.r, "r" + h))); });
    const ex = (r, h) => (ok(get(r, "r" + h)) && mr[h] != null ? get(r, "r" + h) - mr[h] : null);
    const mem = {}; SETS.forEach((s) => { mem[s] = []; });
    for (const o of pool) {
      const r = o.r, h0 = isH(r), q = { H: h0, G: h0 && isG(r), Pq: h0 && isP(r), F: h0 && isF(r) };
      mem.ALL.push(r);
      ["H", "G", "Pq", "F"].forEach((s) => { if (q[s]) mem[s].push(r); });
      if (!o.pat) continue;
      ["B", "T"].forEach((p) => {
        if (!o.pat[p]) return;
        mem[p].push(r);
        if (q.H) mem[p + "H"].push(r);
        if (q.G) mem[p + "G"].push(r);
        if (q.Pq) mem[p + "P"].push(r);
        if (q.F) mem[p + "F"].push(r);
      });
    }
    SETS.forEach((s) => {
      const L = mem[s];
      const row = { ym, hf, n: L.length };
      H.forEach((h) => { row["e" + h] = L.length ? mean(L.map((r) => ex(r, h))) : null; });
      res[tier][s].push(row);
      const E = ev[tier][s];
      L.forEach((r) => {
        E.n++;
        const r12 = get(r, "r12"); if (ok(r12)) { E.nc++; E[hf].nc++; if (r12 <= -0.3) { E.crash++; E[hf].crash++; } }
        const e6 = ex(r, 6); if (ok(e6)) { E.nu++; if (e6 > 0) E.up++; }
      });
    });
  }
  // 요약
  const sum = (tier, s, h, which) => {
    const L = res[tier][s].filter((x) => (!which || x.hf === which));
    return nw(L.map((x) => x["e" + h]), h - 1);
  };
  const diff = (tier, a, b, h, which) => {
    const A = res[tier][a], Bv = res[tier][b], d = [];
    for (let i = 0; i < A.length; i++) { if (which && A[i].hf !== which) continue; if (ok(A[i]["e" + h]) && ok(Bv[i]["e" + h])) d.push(A[i]["e" + h] - Bv[i]["e" + h]); }
    return nw(d, h - 1);
  };
  const crash = (tier, s, which) => { const E = ev[tier][s], x = which ? E[which] : E; return x.nc ? x.crash / x.nc : null; };
  const O = { nPat, nNo, months: keys.length / 2, sets: {} };
  ["dev", "hold"].forEach((tier) => {
    O.sets[tier] = {};
    SETS.forEach((s) => {
      const E = ev[tier][s];
      O.sets[tier][s] = { events: E.n, perMonth: r4(E.n / Math.max(1, res[tier][s].length)), up6: E.nu ? r4(E.up / E.nu) : null,
        crash: r4(crash(tier, s)), crashH1: r4(crash(tier, s, "h1")), crashH2: r4(crash(tier, s, "h2")) };
      H.forEach((h) => { const a = sum(tier, s, h), a1 = sum(tier, s, h, "h1"), a2 = sum(tier, s, h, "h2");
        O.sets[tier][s]["e" + h] = { m: r4(a.mean), t: t2(a.t), n: a.n, h1: r4(a1.mean), h2: r4(a2.mean) }; });
    });
  });
  // 판정 1 — 관문(패턴마다): E6(P∧Q) − E6(P)
  O.gate = {};
  ["B", "T"].forEach((p) => {
    O.gate[p] = {};
    ["H", "G", "P", "F"].forEach((q) => {
      const s = p + q, g = {};
      ["dev", "hold"].forEach((tier) => {
        const d = diff(tier, s, p, 6), d1 = diff(tier, s, p, 6, "h1"), d2 = diff(tier, s, p, 6, "h2");
        g[tier] = { d6: r4(d.mean), t: t2(d.t), h1: r4(d1.mean), h2: r4(d2.mean), crashQ: O.sets[tier][s].crash, crashP: O.sets[tier][p].crash,
          crashQh1: O.sets[tier][s].crashH1, crashPh1: O.sets[tier][p].crashH1, crashQh2: O.sets[tier][s].crashH2, crashPh2: O.sets[tier][p].crashH2,
          e6: O.sets[tier][s].e6.m, perMonth: O.sets[tier][s].perMonth };
      });
      O.gate[p][q] = g;
    });
    // 패턴의 몫: E6(P∧Q) − E6(Q)
    O.patternAdds = O.patternAdds || {};
    O.patternAdds[p] = {};
    ["H", "G", "P", "F"].forEach((q) => {
      const s = p + q, base = q === "P" ? "Pq" : q, g = {};
      ["dev", "hold"].forEach((tier) => {
        const d = diff(tier, s, base, 6), d1 = diff(tier, s, base, 6, "h1"), d2 = diff(tier, s, base, 6, "h2");
        g[tier] = { d6: r4(d.mean), t: t2(d.t), h1: r4(d1.mean), h2: r4(d2.mean) };
      });
      O.patternAdds[p][q] = g;
    });
    // 패턴 자체: E6(P) − E6(ALL)
    O.patternRaw = O.patternRaw || {};
    O.patternRaw[p] = {};
    ["dev", "hold"].forEach((tier) => { const d = diff(tier, p, "ALL", 6), d1 = diff(tier, p, "ALL", 6, "h1"), d2 = diff(tier, p, "ALL", 6, "h2");
      O.patternRaw[p][tier] = { d6: r4(d.mean), t: t2(d.t), h1: r4(d1.mean), h2: r4(d2.mean), crashP: O.sets[tier][p].crash, crashAll: O.sets[tier].ALL.crash }; });
  });
  out[C] = O;
  console.log("== " + C + " — 패턴 판정 " + nPat + " · 판정 불가 " + nNo);
}

// 사전 등록 판정
const V = { gate: {}, adds: {} };
["B", "T"].forEach((p) => {
  const pass = [];
  ["H", "G", "P", "F"].forEach((q) => {
    const u = out.us.gate[p][q], k = out.kr.gate[p][q];
    const c1 = u.dev.h1 > 0 && u.dev.h2 > 0;
    const c2 = u.dev.crashQh1 < u.dev.crashPh1 && u.dev.crashQh2 < u.dev.crashPh2;
    const c3 = u.hold.t == null || u.hold.t > -2;
    const c4 = k.dev.t == null || k.dev.t > -2;
    V.gate[p + q] = { pass: !!(c1 && c2 && c3 && c4), c1, c2, c3, c4, usDevE6: u.dev.e6 };
    if (c1 && c2 && c3 && c4) pass.push([q, u.dev.e6]);
  });
  pass.sort((a, b) => b[1] - a[1]);
  V.gate[p] = { chosen: pass.length ? pass[0][0] : "H(최소 — 통과 없음)", passed: pass.map((x) => x[0]) };
  const q = pass.length ? pass[0][0] : "H";
  const u = out.us.patternAdds[p][q], k = out.kr.patternAdds[p][q];
  V.adds[p] = { q, pass: !!(u.dev.h1 > 0 && u.dev.h2 > 0 && u.dev.t != null && u.dev.t >= 2 && u.hold.d6 > 0 && (k.dev.t == null || k.dev.t > -2)), us: u, kr: k.dev };
});
out.verdict = V;
console.log(JSON.stringify(out, null, 1));
if (arg("out")) fs.writeFileSync(arg("out"), JSON.stringify(out, null, 1));
