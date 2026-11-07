#!/usr/bin/env node
// PREREG measure 1 (scripts/research/trend-repaint/PREREG.md) — replay stability of the '현재 추세' verdict.
//   For every ticker in data/trend-summary.js and each of the last 260 trading days d (bars truncated at d) compute
//   Z10 (current engine, exactly like lib-trend analyze: last 751 bars, σ = sd(last 500 log returns), h = clamp(10σ,.10,.35),
//   regime(y, ln(1+h))), Z10A (Z10 verdict, confirm date = last day the daily Z10 verdict changed), Z10F (forward-only zigzag,
//   day-t h), Z10L (forward-only, h locked to the h of the day the current leg was confirmed).
//   Also classifies every Z10 verdict change / conf repaint / start repaint by cause (a price · b h drift · c window start · d data).
// Usage: node replay.js            -> out/replay.json + printed report
// Inputs: cache/5y/<ticker>.json (fetch.js range=5y — same as update-trend.js), cache/10y/<ticker>.json (pre-window Z10A history).
"use strict";
const fs = require("fs");
const path = require("path");
const REPO = path.resolve(__dirname, "..", "..", "..");
const TR = require(process.env.TREND_LIB ? path.resolve(process.env.TREND_LIB) : path.join(REPO, "scripts", "lib-trend.js"));   // TREND_LIB = engine before 2026-11-07 (see README)
const HERE = __dirname;
const OUT = path.join(HERE, "out");
fs.mkdirSync(OUT, { recursive: true });

const LOOK = 750, SIGN = 500, NDAYS = 260;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mean = (a) => a.reduce((s, v) => s + v, 0) / (a.length || 1);
function sd(a) {   // identical to lib-trend.js sd (two-pass, n-1)
  if (a.length < 2) return 0;
  const m = mean(a);
  return Math.sqrt(a.reduce((s, v) => s + (v - m) * (v - m), 0) / (a.length - 1));
}
const ymd = (t) => { const s = String(t); return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8); };
const safe = (t) => String(t).replace(/[^A-Za-z0-9.\-^]/g, "_");
const readC = (range, key) => { try { return JSON.parse(fs.readFileSync(path.join(HERE, "cache", range, safe(key) + ".json"), "utf8")); } catch (_e) { return null; } };
function loadRepo(rel, key) {
  global.window = {};
  const f = path.join(REPO, rel);
  delete require.cache[require.resolve(f)];
  require(f);
  return global.window[key] || null;
}
const TS = loadRepo("data/trend-summary.js", "TREND_SUMMARY");
const SD = loadRepo("data/recommendations.js", "STOCK_DATA");
const META = {};
["korea", "us"].forEach((c) => (SD[c] || []).forEach((s) => { if (s && s.ticker && !META[s.ticker]) META[s.ticker] = { c, market: s.market, name: s.name }; }));

// ── series helpers ──
function series(bars) {
  bars = bars.filter((b) => b && b.c > 0);
  const n = bars.length, y = new Float64Array(n), lr = new Float64Array(n);
  for (let i = 0; i < n; i++) y[i] = Math.log(bars[i].c);
  for (let i = 1; i < n; i++) lr[i] = y[i] - y[i - 1];
  const idx = new Map(bars.map((b, i) => [b.t, i]));
  return { bars, n, y, lr, idx, t: bars.map((b) => b.t) };
}
// σ / h / H that analyze() would use on day d (window start s0 = max(0, d-LOOK))
function hAt(S, d) {
  const s0 = Math.max(0, d - LOOK);
  const a = [];
  for (let i = Math.max(s0 + 1, d - SIGN + 1); i <= d; i++) a.push(S.lr[i]);
  const sig = sd(a);
  const h = clamp(10 * sig, 0.10, 0.35);
  return { sig, h, H: Math.log(1 + h), s0 };
}
// regime on y[s0..d] with H → absolute indices
function regAt(S, s0, d, H) {
  const r = TR.regime(S.y.subarray(s0, d + 1), H);
  return { cls: r.cls, s: s0 + r.s, conf: r.conf != null ? s0 + r.conf : -1, kind: r.kind };
}
// Z10 point-in-time result for every day d in [dFrom..n-1]
function z10Daily(S, dFrom) {
  const R = new Array(S.n).fill(null);
  for (let d = Math.max(59, dFrom); d < S.n; d++) {
    const hh = hAt(S, d);
    const r = regAt(S, hh.s0, d, hh.H);
    R[d] = Object.assign(r, { h: hh.h, H: hh.H, s0: hh.s0, sig: hh.sig });
  }
  return R;
}
// Z10F / Z10L forward-only zigzag from t0 (state re-taken from that day), day-t h (lock=false) or leg-locked h (lock=true)
function forward(S, t0, lock) {
  const R = new Array(S.n).fill(null);
  if (t0 >= S.n) return R;
  const Hs = new Float64Array(S.n);
  for (let t = t0; t < S.n; t++) {
    const a = [];
    for (let i = t - SIGN + 1; i <= t; i++) a.push(S.lr[i]);
    Hs[t] = Math.log(1 + clamp(10 * sd(a), 0.10, 0.35));
  }
  const y = S.y;
  let hiI = t0, loI = t0, dir = 0, ext = -1, Hl = null;
  const piv = [];
  R[t0] = { cls: "보합", s: t0, conf: -1, H: Hs[t0] };
  for (let t = t0 + 1; t < S.n; t++) {
    const H = lock && dir !== 0 ? Hl : Hs[t];
    if (dir === 0) {
      if (y[t] > y[hiI]) hiI = t;
      if (y[t] < y[loI]) loI = t;
      if (y[hiI] - y[loI] >= H) {
        if (hiI < loI) { piv.push({ i: hiI, k: "H", c: t }); dir = -1; ext = loI; }
        else { piv.push({ i: loI, k: "L", c: t }); dir = 1; ext = hiI; }
        Hl = Hs[t];
      }
    } else if (dir > 0) {
      if (y[t] > y[ext]) ext = t;
      else if (y[ext] - y[t] >= H) { piv.push({ i: ext, k: "H", c: t }); dir = -1; ext = t; Hl = Hs[t]; }
    } else {
      if (y[t] < y[ext]) ext = t;
      else if (y[t] - y[ext] >= H) { piv.push({ i: ext, k: "L", c: t }); dir = 1; ext = t; Hl = Hs[t]; }
    }
    const P = piv[piv.length - 1];
    R[t] = dir === 0 ? { cls: "보합", s: t0, conf: -1, H } : { cls: dir > 0 ? "상승" : "하락", s: P.i, conf: P.c, H, Hl };
  }
  return R;
}
// measure-1 metrics over days [d0..last] (transitions d0+1..last)
function metrics(R, d0, last, Z) {
  let chg = 0, back = 0, confR = 0, startR = 0, agree = 0, days = 0, trans = 0;
  const chgDays = [];
  for (let d = d0; d <= last; d++) {
    if (!R[d]) continue;
    days++;
    if (Z && Z[d] && R[d].cls === Z[d].cls) agree++;
    if (d === d0 || !R[d - 1]) continue;
    trans++;
    const p = R[d - 1], c = R[d];
    if (p.cls !== c.cls) { chg++; chgDays.push(d); }
    else {
      if (p.conf !== c.conf) confR++;
      if (p.s !== c.s) startR++;
    }
  }
  // switch-back: a change at d (A→B) whose verdict returns to A within 10 trading days (next change e ≤ d+10 with R[e].cls === A)
  for (const d of chgDays) {
    const A = R[d - 1].cls;
    for (let e = d + 1; e <= Math.min(last, d + 10); e++) {
      if (!R[e]) break;
      if (R[e].cls !== R[e - 1].cls) { if (R[e].cls === A) back++; break; }
    }
  }
  return { days, trans, verdictChanges: chg, switchBacks10: back, confRepaints: confR, startRepaints: startR, agree, chgDays };
}

// ── main ──
const tickers = Object.keys(TS.items);
const results = {}, events = [], verify = [];
const VAR = ["Z10", "Z10A", "Z10F", "Z10L"];
const tot = {}; VAR.forEach((v) => { tot[v] = { all: {}, korea: {}, us: {} }; });
const addTot = (v, c, m) => {
  ["all", c].forEach((k) => {
    const o = tot[v][k];
    ["days", "trans", "verdictChanges", "switchBacks10", "confRepaints", "startRepaints", "agree"].forEach((f) => { o[f] = (o[f] || 0) + (m[f] || 0); });
    o.tickers = (o.tickers || 0) + 1;
  });
};
const bench5 = { kospi: readC("5y", "^KS11"), kosdaq: readC("5y", "^KQ11"), sp500: readC("5y", "^GSPC") };
const calOf = (c) => new Set((c === "korea" ? bench5.kospi : bench5.sp500).bars.map((b) => b.t));

for (const tk of tickers) {
  const m = META[tk], it = TS.items[tk];
  const f5 = readC("5y", tk), f10 = readC("10y", tk);
  if (!f5) { console.error("no cache", tk); continue; }
  const S = series(f5.bars), last = S.n - 1, d0 = last - NDAYS;
  const S10 = f10 ? series(f10.bars) : null;
  const cal = calOf(m.c);

  // 0) latest-day verification against data/trend-summary.js with the real analyze()
  const bk = m.c === "korea" ? (m.market === "KOSDAQ" ? "kosdaq" : "kospi") : "sp500";
  const bb = bench5[bk].bars.map((b) => ({ t: b.t, c: b.c }));
  const a = TR.analyze(S.bars, bb);
  const ver = { t: tk, c: m.c, sum: { cls: it.cls, from: it.from, kind: it.kind, conf: it.conf && it.conf.d, n: it.conf && it.conf.n, ret: it.ret, cret: it.conf && it.conf.ret, flip: it.flip && it.flip.px, asOf: it.asOf },
    now: a ? { cls: a.cls, from: a.from, kind: a.kind, conf: a.conf && a.conf.d, n: a.conf && a.conf.n, ret: a.ret, cret: a.conf && a.conf.ret, flip: a.flip && a.flip.px, asOf: a.to } : null };
  ver.match = !!a && ["cls", "from", "kind", "conf", "n", "asOf"].every((k) => ver.sum[k] === ver.now[k]);
  ver.matchNum = !!a && ["ret", "cret"].every((k) => ver.sum[k] == null ? ver.now[k] == null : Math.abs(ver.sum[k] - ver.now[k]) < 1e-4) &&
    (ver.sum.flip == null ? ver.now.flip == null : Math.abs(ver.sum.flip / ver.now.flip - 1) < 1e-5);
  verify.push(ver);

  // 1) Z10 daily (5y series — the production input) and on 10y series for pre-window Z10A history
  const Z = z10Daily(S, 59);
  const lastR = Z[last];
  ver.replayMatch = lastR.cls === it.cls && ymd(S.t[lastR.s]) === it.from && (lastR.conf >= 0 ? ymd(S.t[lastR.conf]) : null) === (it.conf ? it.conf.d : null);
  let Z10hist = null;
  if (S10) {
    const boundaryStart = S10.t[0] <= 20161115;   // 10y series starts at the range limit → early windows artificially short
    const Zx = z10Daily(S10, boundaryStart ? LOOK : 59);
    Z10hist = { S: S10, Z: Zx };
  }
  // consistency: Z10 on 10y series equals Z10 on 5y series for days where the 5y window is full
  let cons = 0, consN = 0;
  if (Z10hist) for (let d = LOOK; d <= last; d++) {
    const j = Z10hist.S.idx.get(S.t[d]);
    const q = j != null ? Z10hist.Z[j] : null;
    if (!q) continue;
    consN++;
    if (q.cls === Z[d].cls && Z10hist.S.t[q.s] === S.t[Z[d].s] && (q.conf >= 0 ? Z10hist.S.t[q.conf] : -1) === (Z[d].conf >= 0 ? S.t[Z[d].conf] : -1)) cons++;
  }

  // 2) Z10A — confirm date = last day the daily Z10 verdict changed (search 10y-based history back from d)
  //    verdict history by date: union of 10y-based (earlier) and 5y-based results
  const vByDate = new Map();
  if (Z10hist) Z10hist.Z.forEach((r, j) => { if (r) vByDate.set(Z10hist.S.t[j], r.cls); });
  Z.forEach((r, d) => { if (r) vByDate.set(S.t[d], r.cls); });
  const dates = [...vByDate.keys()].sort((x, y) => x - y);
  const switchDate = new Map();   // date -> last change date ≤ date (null if none in history)
  let lastChg = null;
  for (let k = 0; k < dates.length; k++) {
    if (k > 0 && vByDate.get(dates[k]) !== vByDate.get(dates[k - 1])) lastChg = dates[k];
    switchDate.set(dates[k], lastChg);
  }
  const histFrom = dates[0];
  const ZA = Z.map((r, d) => {
    if (!r) return null;
    const sd8 = switchDate.get(S.t[d]);
    // Z10A conf as an index in the 5y series (or a negative sentinel encoding an earlier date)
    const ci = sd8 == null ? -2 : S.idx.has(sd8) ? S.idx.get(sd8) : -1e9 - sd8;
    return { cls: r.cls, s: r.s, conf: ci, confDate: sd8 };
  });

  // 3) Z10F / Z10L — forward-only from the first day σ can be measured on the 5y series (index 500)
  const ZF = forward(S, SIGN, false), ZL = forward(S, SIGN, true);

  const mt = { Z10: metrics(Z, d0, last, Z), Z10A: metrics(ZA, d0, last, Z), Z10F: metrics(ZF, d0, last, Z), Z10L: metrics(ZL, d0, last, Z) };
  VAR.forEach((v) => addTot(v, m.c, mt[v]));

  // sensitivity: Z10F/L started from the 10y series (index 500) and a production-like 'moving 5y window' restart
  const sens = {};
  if (S10) {
    const ZF10 = forward(S10, SIGN, false), ZL10 = forward(S10, SIGN, true);
    let aF = 0, aL = 0, nn = 0;
    for (let d = d0; d <= last; d++) {
      const j = S10.idx.get(S.t[d]);
      if (j == null || !ZF[d] || !ZF10[j]) continue;
      nn++;
      if (ZF[d].cls === ZF10[j].cls && ZF[d].conf >= 0 && S.t[ZF[d].conf] === S10.t[ZF10[j].conf]) aF++;
      if (ZL[d].cls === ZL10[j].cls && ZL[d].conf >= 0 && S.t[ZL[d].conf] === S10.t[ZL10[j].conf]) aL++;
    }
    sens.anchor10y = { days: nn, sameF: aF, sameL: aL };
  }

  // 4) root-cause classification of Z10 events in the replay window
  const anomalyAt = (d) => {
    const fl = [];
    // a session missing between d-1 and d (vs the market index calendar)
    for (const t of cal) { if (t > S.t[d - 1] && t < S.t[d]) { fl.push("missing-session " + ymd(t)); break; } }
    const r = S.lr[d];
    if (Math.abs(r) >= 0.25 && d + 1 <= last && Math.sign(S.lr[d + 1]) === -Math.sign(r) && Math.abs(S.lr[d + 1]) >= 0.6 * Math.abs(r)) fl.push("spike-reversal");
    if (Math.abs(r) >= Math.log(1.8)) fl.push("split-like jump");
    if (S.bars[d].c === S.bars[d - 1].c && !S.bars[d].v) fl.push("stale bar");
    return fl;
  };
  const rep = (type, p, c) => (type === "flip" ? c.cls !== p.cls : type === "conf" ? c.cls === p.cls && c.conf !== p.conf : c.cls === p.cls && c.s !== p.s);
  for (let d = d0 + 1; d <= last; d++) {
    const p = Z[d - 1], c = Z[d];
    const types = [];
    if (p.cls !== c.cls) types.push("flip");
    else { if (p.conf !== c.conf) types.push("conf"); if (p.s !== c.s) types.push("start"); }
    if (!types.length) continue;
    const cfH = regAt(S, c.s0, d, p.H);                 // today's window, yesterday's H
    const aP = regAt(S, 0, d - 1, p.H), aC = regAt(S, 0, d, p.H);   // all 5y bars (fixed start), yesterday's H
    const ob = regAt(S, p.s0, d, p.H);                  // yesterday's start + today's bar, yesterday's H (one-bar test)
    const aZp = regAt(S, 0, d - 1, p.H), aZc = regAt(S, 0, d, c.H);   // all 5y bars, daily H (anchored Z10)
    const fl = anomalyAt(d);
    for (const type of types) {
      const tH = rep(type, p, cfH), tA = rep(type, aP, aC), tOB = rep(type, p, ob), tAZ = rep(type, aZp, aZc);
      const cause = fl.length ? "d" : !tH ? "b" : !tA ? "c" : "a";
      const D8 = (i) => (i >= 0 ? ymd(S.t[i]) : null);
      events.push({ t: tk, c: m.c, d: ymd(S.t[d]), type, cause, from: { cls: p.cls, s: D8(p.s), conf: D8(p.conf), h: +p.h.toFixed(4) },
        to: { cls: c.cls, s: D8(c.s), conf: D8(c.conf), h: +c.h.toFixed(4) }, back: c.conf >= 0 ? d - c.conf : null,
        tests: { withPrevH: tH, anchored5yPrevH: tA, oneBarPrevH: tOB, anchored5yDailyH: tAZ }, flags: fl,
        cf: { prevH: { cls: cfH.cls, s: D8(cfH.s), conf: D8(cfH.conf) } }, droppedBar: c.s0 > p.s0 ? ymd(S.t[p.s0]) : null, lr: +S.lr[d].toFixed(4) });
    }
  }

  // 5) home-list audit fields at the last day
  const zl = Z[last], za = ZA[last];
  const nA = za.confDate == null ? null : S.idx.has(za.confDate) ? last - S.idx.get(za.confDate) : null;
  const Dd = (i) => (i >= 0 ? ymd(S.t[i]) : null);
  results[tk] = {
    c: m.c, name: m.name, n: S.n, last: ymd(S.t[last]), d0: ymd(S.t[d0]), histFrom: ymd(histFrom), cons: consN ? cons + "/" + consN : null,
    z10: { cls: zl.cls, from: Dd(zl.s), conf: Dd(zl.conf), n: zl.conf >= 0 ? last - zl.conf : null, h: +zl.h.toFixed(4) },
    z10a: { cls: za.cls, switch: za.confDate ? ymd(za.confDate) : null, n: nA },
    z10f: ZF[last] ? { cls: ZF[last].cls, from: Dd(ZF[last].s), conf: Dd(ZF[last].conf), n: ZF[last].conf >= 0 ? last - ZF[last].conf : null } : null,
    z10l: ZL[last] ? { cls: ZL[last].cls, from: Dd(ZL[last].s), conf: Dd(ZL[last].conf), n: ZL[last].conf >= 0 ? last - ZL[last].conf : null } : null,
    metrics: Object.fromEntries(VAR.map((v) => [v, Object.assign({}, mt[v], { chgDays: mt[v].chgDays.map((d) => ymd(S.t[d])) })])),
    sens,
    // daily verdict / conf / start in the replay window (for audits)
    daily: (() => { const o = []; for (let d = d0; d <= last; d++) o.push([ymd(S.t[d]), Z[d].cls, Dd(Z[d].s), Dd(Z[d].conf), +Z[d].h.toFixed(4),
      ZF[d] ? ZF[d].cls : null, ZF[d] ? Dd(ZF[d].conf) : null, ZL[d] ? ZL[d].cls : null, ZL[d] ? Dd(ZL[d].conf) : null, ZA[d].confDate ? ymd(ZA[d].confDate) : null]); return o; })(),
  };
}

fs.writeFileSync(path.join(OUT, "replay.json"), JSON.stringify({ builtAt: new Date().toISOString(), NDAYS, tot, verify, events, results }));

// ── report ──
const pct = (a, b) => (b ? (100 * a / b).toFixed(1) + "%" : "-");
console.log("tickers", tickers.length, "  replay days per ticker", NDAYS + 1, "(", NDAYS, "transitions )");
console.log("\n[verify] analyze() on today's 5y bars vs data/trend-summary.js: match cls/from/kind/conf/n/asOf", verify.filter((v) => v.match).length + "/" + verify.length,
  "· numeric ret/conf.ret/flip", verify.filter((v) => v.matchNum).length + "/" + verify.length, "· replay(regime) last day matches summary", Object.values(results).filter((r) => r).length);
verify.filter((v) => !v.match || !v.matchNum).forEach((v) => console.log("  MISMATCH", v.t, JSON.stringify(v.sum), "→", JSON.stringify(v.now)));
console.log("\n[measure 1] variant  days  trans  verdictChanges  switchBacks10  confRepaints  startRepaints  agreeWithZ10");
for (const k of ["all", "korea", "us"]) {
  console.log(" --", k);
  VAR.forEach((v) => { const o = tot[v][k]; console.log("  " + v.padEnd(5), String(o.days).padStart(6), String(o.trans).padStart(6), String(o.verdictChanges).padStart(8), String(o.switchBacks10).padStart(8), String(o.confRepaints).padStart(8), String(o.startRepaints).padStart(8), pct(o.agree, o.days).padStart(8)); });
}
const byType = {};
events.forEach((e) => { const k = e.type + ":" + e.cause; byType[k] = (byType[k] || 0) + 1; });
console.log("\n[causes] ", JSON.stringify(byType));
