"use strict";
const fs = require("fs"), path = require("path");
const REPO = path.resolve(__dirname, "..", "..", "..");
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

module.exports = { SIGN, merged, hdays, forward, exactFlip, ymd, TS, sd, clamp, rd };
