#!/usr/bin/env node
// Home '최근 추세 전환' list simulated on every replay day (rows 10..260 of out/replay.json daily):
//   Z10 list  = conf within the last 10 trading days (n ≤ 10) and cls 상승/하락 (what index.html shows)
//   Z10A list = the daily verdict actually changed within the last 10 trading days (real switch)
//   counts spurious (Z10 only), missing (Z10A only), wrong date (both, conf date ≠ switch date); also Z10F/Z10L lists vs Z10A.
"use strict";
const fs = require("fs"), path = require("path");
const R = JSON.parse(fs.readFileSync(path.join(__dirname, "out", "replay.json"), "utf8"));
const N = 10;
const tot = { days: 0, z10: 0, z10a: 0, spurious: 0, missing: 0, wrongDate: 0, both: 0, F: { list: 0, notA: 0, missA: 0, wrong: 0 }, L: { list: 0, notA: 0, missA: 0, wrong: 0 } };
const byC = { korea: { spurious: 0, missing: 0, wrongDate: 0, z10: 0 }, us: { spurious: 0, missing: 0, wrongDate: 0, z10: 0 } };
const daySet = new Set();
const ex = { spurious: [], missing: [], wrongDate: [] };
for (const [tk, r] of Object.entries(R.results)) {
  const rows = r.daily, pos = new Map(rows.map((x, i) => [x[0], i]));
  const nOf = (i, d) => (d == null ? Infinity : pos.has(d) ? i - pos.get(d) : Infinity);   // dates before the window → > 10 for i ≥ 10
  for (let i = N; i < rows.length; i++) {
    const [date, cls, , conf, , fcls, fconf, lcls, lconf, aconf] = rows[i];
    daySet.add(date);
    const inZ = (cls === "상승" || cls === "하락") && nOf(i, conf) <= N;
    const inA = (cls === "상승" || cls === "하락") && nOf(i, aconf) <= N;
    const inF = fcls && (fcls === "상승" || fcls === "하락") && nOf(i, fconf) <= N;
    const inL = lcls && (lcls === "상승" || lcls === "하락") && nOf(i, lconf) <= N;
    tot.days++;
    if (inZ) { tot.z10++; byC[r.c].z10++; }
    if (inA) tot.z10a++;
    if (inZ && !inA) { tot.spurious++; byC[r.c].spurious++; if (ex.spurious.length < 15) ex.spurious.push(tk + " " + date + " conf " + conf + " (real switch " + aconf + ")"); }
    if (inA && !inZ) { tot.missing++; byC[r.c].missing++; if (ex.missing.length < 15) ex.missing.push(tk + " " + date + " switch " + aconf + " (shown conf " + conf + ")"); }
    if (inA && inZ) { tot.both++; if (conf !== aconf) { tot.wrongDate++; byC[r.c].wrongDate++; if (ex.wrongDate.length < 15) ex.wrongDate.push(tk + " " + date + " conf " + conf + " vs switch " + aconf); } }
    if (inF) { tot.F.list++; if (!inA) tot.F.notA++; else if (fconf !== aconf) tot.F.wrong++; }
    if (inA && !inF) tot.F.missA++;
    if (inL) { tot.L.list++; if (!inA) tot.L.notA++; else if (lconf !== aconf) tot.L.wrong++; }
    if (inA && !inL) tot.L.missA++;
  }
}
console.log("ticker-days", tot.days, "(", daySet.size, "distinct dates )");
console.log("Z10 home-list entries (ticker-days)", tot.z10, "· Z10A (real switch ≤10d)", tot.z10a);
console.log("spurious (in Z10 list, no real verdict change ≤10d):", tot.spurious, "=", (100 * tot.spurious / tot.z10).toFixed(1) + "% of Z10 entries");
console.log("missing (real change ≤10d, not in Z10 list):", tot.missing, "=", (100 * tot.missing / tot.z10a).toFixed(1) + "% of real switches");
console.log("wrong date (in both, conf ≠ real switch):", tot.wrongDate, "of", tot.both);
console.log("by country", JSON.stringify(byC));
console.log("Z10F list vs Z10A:", JSON.stringify(tot.F), "  Z10L list vs Z10A:", JSON.stringify(tot.L));
console.log("examples", JSON.stringify(ex, null, 1));
