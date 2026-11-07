#!/usr/bin/env node
// Final exclusive cause classification of Z10 events (precedence d > b > c > a) and summary file.
//   (d) data anomaly: the event-day bar is anomalous (halt/stale/missing session/spike) OR the event disappears when the anomalous bars
//       found by scan.js are cleaned (000810 one-day closing-auction print 2025-12-11; 207940 17-day halt 2025-10-30..11-21;
//       012450 / 278470 / 010120 halts — those three changed nothing).
//   (b) h drift: the event does not happen when day d is recomputed with day d-1's h (same window).
//   (c) window start: happens with day d-1's h but not when both days use all 5y bars from a fixed start (also checked: one-bar test).
//   (a) price reversal: happens with day d-1's h and with a fixed window start.
// Usage: node classify.js  -> out/summary.json + printed tables
"use strict";
const fs = require("fs"), path = require("path");
const REPO = path.resolve(__dirname, "..", "..", "..");
const TR = require(process.env.TREND_LIB ? path.resolve(process.env.TREND_LIB) : path.join(REPO, "scripts", "lib-trend.js"));   // TREND_LIB = engine before 2026-11-07 (see README)
const HERE = __dirname;
const R = JSON.parse(fs.readFileSync(path.join(HERE, "out", "replay.json"), "utf8"));
const LOOK = 750, SIGN = 500, NDAYS = 260;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mean = (a) => a.reduce((s, v) => s + v, 0) / (a.length || 1);
function sd(a) { if (a.length < 2) return 0; const m = mean(a); return Math.sqrt(a.reduce((s, v) => s + (v - m) * (v - m), 0) / (a.length - 1)); }
const ymd = (t) => { const s = String(t); return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8); };
const readC = (key) => JSON.parse(fs.readFileSync(path.join(HERE, "cache", "5y", key + ".json"), "utf8"));
function z10Events(bars) {
  bars = bars.filter((b) => b.c > 0);
  const n = bars.length, y = new Float64Array(n), lr = new Float64Array(n);
  for (let i = 0; i < n; i++) y[i] = Math.log(bars[i].c);
  for (let i = 1; i < n; i++) lr[i] = y[i] - y[i - 1];
  const at = (d) => { const s0 = Math.max(0, d - LOOK), a = []; for (let i = Math.max(s0 + 1, d - SIGN + 1); i <= d; i++) a.push(lr[i]);
    const r = TR.regime(y.subarray(s0, d + 1), Math.log(1 + clamp(10 * sd(a), 0.10, 0.35))); return { cls: r.cls, s: s0 + r.s, conf: r.conf != null ? s0 + r.conf : -1 }; };
  const last = n - 1, keys = new Set();
  let p = at(last - NDAYS);
  for (let d = last - NDAYS + 1; d <= last; d++) {
    const c = at(d), D = ymd(bars[d].t);
    if (p.cls !== c.cls) keys.add(D + "|flip"); else { if (p.conf !== c.conf) keys.add(D + "|conf"); if (p.s !== c.s) keys.add(D + "|start"); }
    p = c;
  }
  return keys;
}
const ANOM = { "000810": { spike: [20251211], what: "one-day closing-auction print 2025-12-11 (+28.3% then -22.3% next day; Naver shows the same official close 630,000)" },
  "033780": { spike: [20241010], what: "one-day closing-auction print 2024-10-10 (+12.9% close at the day high, -12.6% next day; Naver same) — it inflated sigma until it left the 500-day window on 2026-11-02/03" },
  "029780": { spike: [20240613], what: "one-day closing-auction print 2024-06-13 (+11.4% close at the day high, -11.8% next day)" },
  "207940": { drop: [20251030, 20251121], what: "17-day trading halt 2025-10-30..11-21 (Samsung Epis Holdings split-off) recorded as flat zero-volume bars" },
  "012450": { drop: [20240829, 20240926], what: "halt 2024-08-29..09-26 with a flat-then-step price inside the halt" },
  "278470": { drop: [20241018, 20241030], what: "9-day flat zero-volume run 2024-10-18..10-30" },
  "010120": { drop: [20260408, 20260410], what: "3-day flat zero-volume run 2026-04-08..04-10" } };
const cleanKeys = {};
for (const [tk, a] of Object.entries(ANOM)) {
  let b = readC(tk).bars.map((x) => Object.assign({}, x));
  if (a.spike) a.spike.forEach((t) => { const i = b.findIndex((x) => x.t === t); b[i].c = Math.sqrt(b[i - 1].c * b[i + 1].c); });
  if (a.drop) b = b.filter((x) => !(x.t >= a.drop[0] && x.t <= a.drop[1]));
  cleanKeys[tk] = z10Events(b);
}
const E = R.events.map((e) => {
  let fin = e.cause;
  if (e.flags.length) fin = "d";
  else if (cleanKeys[e.t] && !cleanKeys[e.t].has(e.d + "|" + e.type)) fin = "d";
  return Object.assign({}, e, { final: fin });
});
const cnt = (arr, f) => arr.reduce((o, x) => { const k = f(x); o[k] = (o[k] || 0) + 1; return o; }, {});
const tab = cnt(E, (e) => e.type + ":" + e.final);
console.log("final exclusive classification (type:cause):", JSON.stringify(tab));
console.log("by country:", JSON.stringify(cnt(E, (e) => e.c + ":" + e.type + ":" + e.final)));
console.log("(d) events by ticker:", JSON.stringify(cnt(E.filter((e) => e.final === "d"), (e) => e.t + ":" + e.type)));

// switch-backs within 10 trading days in Z10, by the causes of the two flips
const flips = E.filter((e) => e.type === "flip").sort((x, y) => (x.t === y.t ? x.d.localeCompare(y.d) : x.t.localeCompare(y.t)));
const sb = [];
for (const tk of new Set(flips.map((e) => e.t))) {
  const rows = R.results[tk].daily.map((x) => x[0]);
  const f = flips.filter((e) => e.t === tk);
  for (let i = 0; i + 1 < f.length; i++) {
    const a = f[i], b = f[i + 1];
    const gap = rows.indexOf(b.d) - rows.indexOf(a.d);
    if (gap <= 10 && b.to.cls === a.from.cls) sb.push({ t: tk, out: a.d, back: b.d, gap, causes: a.final + b.final, path: a.from.cls + "→" + a.to.cls + "→" + b.to.cls });
  }
}
console.log("\nZ10 switch-backs ≤10 trading days:", sb.length, "· by causes (first,second):", JSON.stringify(cnt(sb, (x) => x.causes)));
sb.forEach((x) => console.log("  ", x.t, x.out, "→", x.back, "(" + x.gap + "d)", x.path, x.causes));

// examples per final cause
const pick = (f, n) => E.filter(f).slice(0, n).map((e) => e.t + " " + e.d + " " + e.type + " " + e.from.cls + "(start " + e.from.s + ", conf " + e.from.conf + ", h " + e.from.h + ") → " + e.to.cls + "(start " + e.to.s + ", conf " + e.to.conf + ", h " + e.to.h + ")");
const examples = {
  a: pick((e) => e.final === "a" && ["105560", "NVDA", "TSM", "META", "001120"].includes(e.t), 5),
  aBackdated: pick((e) => e.final === "a" && e.type === "flip" && e.back > 0, 6),
  bFlip: pick((e) => e.final === "b" && e.type === "flip" && ["139130", "DUK", "064400", "RSG", "WAB"].includes(e.t), 8),
  bConf: pick((e) => e.final === "b" && e.type === "conf" && ["AMP", "MA", "LMT", "KO", "207940", "GM"].includes(e.t), 10),
  bStart: pick((e) => e.final === "b" && e.type === "start" && ["033780", "JNJ", "005930", "ORLY"].includes(e.t), 4),
  d: pick((e) => e.final === "d", 8),
};
console.log("\nexamples:", JSON.stringify(examples, null, 1));
const summary = { builtAt: new Date().toISOString(), tot: R.tot, finalCauses: tab, finalCausesByCountry: cnt(E, (e) => e.c + ":" + e.type + ":" + e.final), switchBacks: sb, anomalies: ANOM, examples };
fs.writeFileSync(path.join(HERE, "out", "summary.json"), JSON.stringify(summary, null, 1));
fs.writeFileSync(path.join(HERE, "out", "events-final.json"), JSON.stringify(E));
