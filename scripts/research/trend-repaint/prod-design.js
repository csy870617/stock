#!/usr/bin/env node
// Synthesizer check: production-candidate Z10F (measure-2 'Z10F' = extMode b: after a confirmation the new leg's extreme is the
// most extreme close since the pivot; day-t h; roll from index 500 of a FIXED-start series). Read-only on the repo.
"use strict";
const fs = require("fs"), path = require("path");
const REPO = path.resolve(__dirname, "..", "..", "..");
const TR = require(path.join(REPO, "scripts", "lib-trend.js"));
const C = path.join(__dirname, "cache");   // replay-fetch.js range=10y and range=5y
const SIGN = 500, NDAYS = 260;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mean = (a) => a.reduce((s, v) => s + v, 0) / (a.length || 1);
function sd(a) { if (a.length < 2) return 0; const m = mean(a); return Math.sqrt(a.reduce((s, v) => s + (v - m) * (v - m), 0) / (a.length - 1)); }
const ymd = (t) => { const s = String(t); return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8); };
const safe = (t) => String(t).replace(/[^A-Za-z0-9.\-^]/g, "_");
const rd = (r, k) => { try { return JSON.parse(fs.readFileSync(path.join(C, r, safe(k) + ".json"), "utf8")).bars; } catch (_e) { return null; } };
global.window = {}; require(path.join(REPO, "data", "trend-summary.js")); const TS = global.window.TREND_SUMMARY;
function merged(t) {
  const a = rd("10y", t) || [], b = rd("5y", t) || [];
  const m = new Map(); a.forEach((x) => { if (x && x.c > 0) m.set(x.t, x); }); b.forEach((x) => { if (x && x.c > 0) m.set(x.t, x); });
  return [...m.values()].sort((x, y) => x.t - y.t);
}
// Hday[t] = ln(1+h_t), h_t = clamp(10*sd(lr[t-499..t]))
function hdays(y) {
  const n = y.length, lr = new Float64Array(n), H = new Float64Array(n), h = new Float64Array(n);
  for (let i = 1; i < n; i++) lr[i] = y[i] - y[i - 1];
  for (let t = SIGN; t < n; t++) { const a = []; for (let i = t - SIGN + 1; i <= t; i++) a.push(lr[i]); h[t] = clamp(10 * sd(a), 0.10, 0.35); H[t] = Math.log(1 + h[t]); }
  return { lr, H, h };
}
// forward roll (mode b) from S0 → per-day state
function forward(y, S0, H) {
  const n = y.length, R = new Array(n).fill(null);
  let d = 0, hiI = S0, loI = S0, ext = -1, cx = -1, I = -1, Cf = -1, pI = -1;   // pI = previous pivot index (start of previous leg)
  const counter = (from, to, dd) => { let c = -1; for (let k = from; k <= to; k++) if (c < 0 || (dd > 0 ? y[k] < y[c] : y[k] > y[c])) c = k; return c; };
  R[S0] = { d: 0, s: -1, c: -1, ext: -1 };
  for (let t = S0 + 1; t < n; t++) {
    const Ht = H[t];
    if (d === 0) {
      if (y[t] > y[hiI]) hiI = t;
      if (y[t] < y[loI]) loI = t;
      if (y[hiI] - y[loI] >= Ht) { pI = S0; if (hiI < loI) { I = hiI; d = -1; ext = loI; } else { I = loI; d = 1; ext = hiI; } Cf = t; cx = counter(ext + 1, t, d); }
    } else if (d > 0) {
      if (y[t] > y[ext]) { ext = t; cx = -1; }
      else { if (cx < 0 || y[t] < y[cx]) cx = t; if (y[ext] - y[t] >= Ht) { pI = I; I = ext; Cf = t; d = -1; ext = cx; cx = counter(ext + 1, t, d); } }
    } else {
      if (y[t] < y[ext]) { ext = t; cx = -1; }
      else { if (cx < 0 || y[t] > y[cx]) cx = t; if (y[t] - y[ext] >= Ht) { pI = I; I = ext; Cf = t; d = 1; ext = cx; cx = counter(ext + 1, t, d); } }
    }
    R[t] = { d, s: I, c: Cf, ext, p: pI };
  }
  return R;
}
// exact next-close threshold under Z10F at day t (state R[t]); returns price P*: up-trend flips iff close<=P*, down iff close>=P*
function exactFlip(y, lr, t, st) {
  if (!st || !st.d) return null;
  const base = []; for (let i = t - SIGN + 2; i <= t; i++) base.push(lr[i]);   // 499 most recent returns (oldest one drops tomorrow)
  const hOf = (lnP) => { const a = base.concat([lnP - y[t]]); return Math.log(1 + clamp(10 * sd(a), 0.10, 0.35)); };
  const E = y[st.ext];
  const flips = (lnP) => st.d > 0 ? (lnP <= E && E - lnP >= hOf(lnP)) : (lnP >= E && lnP - E >= hOf(lnP));
  let lo, hi;
  if (st.d > 0) { lo = E - Math.log(1.36) - 0.01; hi = E; if (!flips(lo) || flips(hi)) return { bad: 1 }; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (flips(m)) lo = m; else hi = m; } return { lnP: lo }; }
  lo = E; hi = E + Math.log(1.36) + 0.01; if (flips(lo) || !flips(hi)) return { bad: 1 }; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (flips(m)) hi = m; else lo = m; } return { lnP: hi };
}
const out = { tickers: 0, young: [], repaint: { conf: 0, start: 0 }, chg: 0, back: 0, oneTime: [], fromChanged: [], list: [], exact: { n: 0, mism: 0 }, naive: { n: 0, mism: 0, ex: [] }, maxLen: 0, anchorDiff: [], deltaPx: [] };
const tickers = Object.keys(TS.items);
for (const t of tickers) {
  const bars = merged(t);
  const n = bars.length; if (!n) continue;
  out.tickers++;
  if (n < SIGN + 1) { out.young.push(t + "(" + n + ")"); continue; }
  const y = bars.map((b) => Math.log(b.c)), { lr, H, h } = hdays(y);
  const R = forward(y, SIGN, H);
  const last = n - 1, d0 = Math.max(SIGN, last - NDAYS);
  // repaints & changes over last 260 days
  const ch = [];
  for (let d = d0 + 1; d <= last; d++) {
    const p = R[d - 1], c = R[d];
    if (p.d !== c.d) ch.push(d); else { if (p.c !== c.c) out.repaint.conf++; if (p.s !== c.s) out.repaint.start++; }
    if (c.d !== 0 && p.d !== c.d && c.c !== d) throw new Error("verdict changed but conf != day " + t);
  }
  out.chg += ch.length;
  for (const d of ch) { const A = R[d - 1].d; for (let e = d + 1; e <= Math.min(last, d + 10); e++) { if (R[e].d !== R[e - 1].d) { if (R[e].d === A) out.back++; break; } } }
  // flip contract over last 260 days: exact vs naive (ext/(1+h_t))
  for (let d = d0; d < last; d++) {
    const st = R[d]; if (!st.d) continue;
    const nx = R[d + 1], flipped = nx.d !== st.d;
    const ex = exactFlip(y, lr, d, st);
    if (ex && ex.lnP != null) { out.exact.n++; const cross = st.d > 0 ? y[d + 1] <= ex.lnP : y[d + 1] >= ex.lnP; if (cross !== flipped) out.exact.mism++; }
    const nv = st.d > 0 ? y[st.ext] - H[d] : y[st.ext] + H[d];
    out.naive.n++; const crossN = st.d > 0 ? y[d + 1] <= nv + 1e-12 : y[d + 1] >= nv - 1e-12;
    if (crossN !== flipped) { out.naive.mism++; if (out.naive.ex.length < 8) out.naive.ex.push(t + " " + ymd(bars[d + 1].t) + (flipped ? " flipped w/o crossing naive" : " crossed naive w/o flip")); }
  }
  const L = R[last];
  const len = L.d ? last - L.s : 0; if (len > out.maxLen) { out.maxLen = len; out.maxLenT = t; }
  const prod = TS.items[t];
  const z = { cls: L.d > 0 ? "상승" : L.d < 0 ? "하락" : "보합", from: L.s >= 0 ? ymd(bars[L.s].t) : null, conf: L.c >= 0 ? ymd(bars[L.c].t) : null, n: L.c >= 0 ? last - L.c : null };
  if (prod.cls !== z.cls || prod.conf?.d !== z.conf || prod.from !== z.from) out.oneTime.push(t + ": prod " + prod.cls + " " + prod.from + " conf " + (prod.conf && prod.conf.d) + " → Z10F " + z.cls + " " + z.from + " conf " + z.conf + " (n=" + z.n + ")");
  if (prod.from !== z.from || prod.cls !== z.cls) out.fromChanged.push(t);
  if (z.n != null && z.n <= 10) out.list.push({ t, cls: z.cls, conf: z.conf, n: z.n });
  // exact vs naive threshold at last day
  const ex = exactFlip(y, lr, last, L);
  if (ex && ex.lnP != null) { const nv = L.d > 0 ? y[L.ext] - H[last] : y[L.ext] + H[last]; out.deltaPx.push(Math.abs(Math.exp(ex.lnP - nv) - 1)); }
  // anchor sensitivity: 5y-anchored roll (index 500 of the 5y-only series)
  const b5 = (rd("5y", t) || []).filter((x) => x && x.c > 0);
  if (b5.length > SIGN + 1) {
    const y5 = b5.map((b) => Math.log(b.c)), H5 = hdays(y5).H, R5 = forward(y5, SIGN, H5), L5 = R5[b5.length - 1];
    const z5 = { cls: L5.d > 0 ? "상승" : L5.d < 0 ? "하락" : "보합", from: L5.s >= 0 ? ymd(b5[L5.s].t) : null, conf: L5.c >= 0 ? ymd(b5[L5.c].t) : null };
    if (z5.cls !== z.cls || z5.from !== z.from || z5.conf !== z.conf) out.anchorDiff.push(t + ": 10y " + z.cls + " " + z.from + "/" + z.conf + " vs 5y " + z5.cls + " " + z5.from + "/" + z5.conf);
  }
}
out.list.sort((a, b) => a.n - b.n);
const dp = out.deltaPx.sort((a, b) => a - b);
console.log(JSON.stringify({ tickers: out.tickers, young: out.young, repaint: out.repaint, chg: out.chg, back10: out.back,
  exact: out.exact, naive: { n: out.naive.n, mism: out.naive.mism, ex: out.naive.ex }, maxLen: out.maxLen, maxLenT: out.maxLenT,
  lastDayThresholdGap: { median: dp[dp.length >> 1], p90: dp[Math.floor(dp.length * 0.9)], max: dp[dp.length - 1] } }, null, 1));
console.log("one-time changes vs production (" + out.oneTime.length + "), from/cls changed " + out.fromChanged.length + ":"); out.oneTime.forEach((x) => console.log("  " + x));
console.log("Z10F home list (n<=10) on last day (" + out.list.length + "):"); out.list.forEach((x) => console.log("  " + x.t + " " + x.cls + " " + x.conf + " n=" + x.n));
console.log("anchor 10y vs 5y last-day differences (" + out.anchorDiff.length + "):"); out.anchorDiff.forEach((x) => console.log("  " + x));
