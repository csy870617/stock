// Descriptive facts for the app copy under production Z10F (mode b, data from 2016-11-07, roll from index 500), current tickers.
"use strict";
const fs = require("fs"), path = require("path");
const { SIGN, merged, hdays, forward, TS } = require("./zlib");
const KR = new Set();
const TS2 = TS; Object.keys(TS2.items).forEach((t) => { if (TS2.items[t].c === "korea") KR.add(t); });
const acc = (o) => o || { lag: [], mv: [], opp10: 0, n10: 0, ext: 0, opp1: 0, n1: 0, opp5: 0, n5: 0, cnt: 0 };
const R2 = { last: { kr: acc(), us: acc() }, all: { kr: acc(), us: acc() } };
const med = (a) => { const b = a.slice().sort((x, y) => x - y); return b.length ? b[b.length >> 1] : null; };
for (const t of Object.keys(TS2.items)) {
  const bars = merged(t), n = bars.length; if (n < SIGN + 1) continue;
  const y = bars.map((b) => Math.log(b.c)), { H } = hdays(y), R = forward(y, SIGN, H), last = n - 1;
  const cc = KR.has(t) ? "kr" : "us";
  for (let d = SIGN + 1; d <= last; d++) {
    const p = R[d - 1], c = R[d]; if (!c.d || p.d === c.d) continue;
    for (const key of ["all", "last"]) {
      if (key === "last" && d < last - 260) continue;
      const A = R2[key][cc]; A.cnt++;
      A.lag.push(d - c.s); A.mv.push(Math.abs(Math.exp(y[d] - y[c.s]) - 1));
      // confirm-day close is the most extreme close of the new leg so far (since pivot)?
      let isExt = true; for (let k = c.s + 1; k < d; k++) if (c.d > 0 ? y[k] > y[d] : y[k] < y[d]) { isExt = false; break; }
      if (isExt) A.ext++;
      for (const [h, kO, kN] of [[1, "opp1", "n1"], [5, "opp5", "n5"], [10, "opp10", "n10"]]) {
        if (d + h > last) continue; A[kN]++; const r = y[d + h] - y[d]; if (c.d > 0 ? r < 0 : r > 0) A[kO]++;
      }
    }
  }
}
for (const key of ["last", "all"]) for (const cc of ["kr", "us"]) {
  const A = R2[key][cc];
  console.log(key, cc, "switches", A.cnt, "| lag start→confirm median", med(A.lag), "sessions; >60:", (A.lag.filter((x) => x > 60).length / A.lag.length * 100).toFixed(1) + "%",
    "| move at confirm median", (med(A.mv) * 100).toFixed(1) + "%", "| confirm close = leg extreme", (A.ext / A.cnt * 100).toFixed(1) + "%",
    "| against verdict +1d", (A.opp1 / A.n1 * 100).toFixed(0) + "%", "+5d", (A.opp5 / A.n5 * 100).toFixed(0) + "%", "+10d", (A.opp10 / A.n10 * 100).toFixed(0) + "%");
}
