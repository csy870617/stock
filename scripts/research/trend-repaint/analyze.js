// trend-repaint PREREG measure 2 — analysis. Copy of scripts/research/trend-follow/analyze.js (portfolio construction, perf,
// block bootstrap unchanged) + the PREREG trend-repaint comparison of Z10 (baseline) vs Z10F vs Z10L:
// Sharpe full / halves (boundary 2023-04-26), CAGR, MDD, exposure, verdict changes and 10-day switch-backs, criteria 1-3, decision,
// and diagnostics (cause of Z10 verdict changes, confirm/start repaint, agreement, start-offset sensitivity).
// usage: node analyze.js <outdir>   → stdout + <outdir>/repaint-result.json
const fs = require("fs"), path = require("path");
const DIR = path.resolve(process.argv[2] || "out");
const parts = fs.readdirSync(DIR).filter((f) => /^tf-agg-\d+\.json$/.test(f)).map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f))));
const { MID, RULES } = parts[0];
const NAME = { BH: "BH", Z10: "Z10", Z6: "Z6", Z8: "Z8", M0: "M0", Z10M: "Z10M", DCH: "DCH", MA200: "MA200", GC: "GC", TS12: "TS12", M10: "M10", Z10F: "Z10F", Z10L: "Z10L", Z10Fa: "Z10Fa(sens)" };
const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
const median = (a) => { const b = a.slice().sort((x, y) => x - y); return b.length ? (b.length % 2 ? b[b.length >> 1] : (b[b.length / 2 - 1] + b[b.length / 2]) / 2) : null; };

const P = {};
for (const c of ["korea", "us"]) {
  const G = {};
  parts.forEach((p) => Object.entries(p.agg[c]).forEach(([d, g]) => {
    const x = G[d] || (G[d] = { n: 0, bh: 0, R: {}, E: {} });
    x.n += g.n; x.bh += g.bh;
    RULES.forEach((r) => { x.R[r] = x.R[r] || [0, 0]; x.R[r][0] += g.R[r][0]; x.R[r][1] += g.R[r][1]; x.E[r] = (x.E[r] || 0) + g.E[r]; });
  }));
  const dates = Object.keys(G).sort().filter((d) => G[d].n >= 20);
  const out = { d: dates, BH: dates.map((d) => G[d].bh / G[d].n), n: dates.map((d) => G[d].n) };
  RULES.forEach((r) => { out[r] = dates.map((d) => G[d].R[r][0] / G[d].n); out[r + "_alt"] = dates.map((d) => G[d].R[r][1] / G[d].n); out[r + "_E"] = dates.map((d) => G[d].E[r] / G[d].n); });
  out.dropped = Object.keys(G).length - dates.length;
  P[c] = out;
}
function perf(rs) {
  const N = rs.length;
  if (N < 20) return null;
  const m = mean(rs);
  let v = 0;
  for (const r of rs) v += (r - m) * (r - m);
  const sd = Math.sqrt(v / (N - 1));
  let eq = 1, pk = 1, mdd = 0, mddAt = 0;
  rs.forEach((r, i) => { eq *= 1 + r; if (eq > pk) pk = eq; const dd = eq / pk - 1; if (dd < mdd) { mdd = dd; mddAt = i; } });
  const cagr = Math.pow(eq, 252 / N) - 1;
  return { n: N, cagr, vol: sd * Math.sqrt(252), sharpe: sd > 0 ? m / sd * Math.sqrt(252) : 0, mdd, calmar: mdd < 0 ? cagr / -mdd : null, mddAt, tot: eq - 1 };
}
const sharpe = (rs) => { const m = mean(rs); let v = 0; for (const r of rs) v += (r - m) * (r - m); const sd = Math.sqrt(v / (rs.length - 1)); return sd > 0 ? m / sd * Math.sqrt(252) : 0; };
let seed = 12345;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
function bootDiffs(a, b, reps) {
  const N = a.length, B = 21, out = [];
  for (let k = 0; k < reps; k++) {
    const xa = [], xb = [];
    while (xa.length < N) { const s = Math.floor(rnd() * (N - B)); for (let j = s; j < s + B && xa.length < N; j++) { xa.push(a[j]); xb.push(b[j]); } }
    out.push(sharpe(xa) - sharpe(xb));
  }
  return out;
}
const q = (arr, p) => { const b = arr.slice().sort((x, y) => x - y); return b[Math.min(b.length - 1, Math.max(0, Math.floor(p * (b.length - 1))))]; };

const res = { MID, MID_COMPUTED: parts[0].MID_COMPUTED, countries: {}, rules: {} };
const halfIdx = (c, early) => P[c].d.map((d, i) => (early ? d < MID : d >= MID) ? i : -1).filter((i) => i >= 0);
const sub = (arr, idx) => idx.map((i) => arr[i]);
for (const c of ["korea", "us"]) {
  res.countries[c] = { from: P[c].d[0], to: P[c].d[P[c].d.length - 1], days: P[c].d.length, stocksAvg: Math.round(mean(P[c].n)), dropped: P[c].dropped,
    earlyDays: halfIdx(c, true).length, lateDays: halfIdx(c, false).length };
}
const BOOT = 2000;
const boots = {};
["BH"].concat(RULES).forEach((r) => {
  const o = { name: NAME[r] };
  for (const c of ["korea", "us"]) {
    const E = halfIdx(c, true), L = halfIdx(c, false);
    o[c] = { full: perf(P[c][r]), early: perf(sub(P[c][r], E)), late: perf(sub(P[c][r], L)) };
    if (r !== "BH") {
      o[c].alt = perf(P[c][r + "_alt"]);
      o[c].expo = mean(P[c][r + "_E"]);
      o[c].dS = o[c].full.sharpe - res.rules.BH[c].full.sharpe;
      o[c].dSe = o[c].early.sharpe - res.rules.BH[c].early.sharpe;
      o[c].dSl = o[c].late.sharpe - res.rules.BH[c].late.sharpe;
      o[c].dMdd = o[c].full.mdd - res.rules.BH[c].full.mdd;
      boots[r + c] = bootDiffs(P[c][r], P[c].BH, BOOT);
      o[c].ci = [q(boots[r + c], 0.05), q(boots[r + c], 0.95)];
    }
  }
  if (r !== "BH") {
    o.dS = (o.korea.dS + o.us.dS) / 2; o.dSe = (o.korea.dSe + o.us.dSe) / 2; o.dSl = (o.korea.dSl + o.us.dSl) / 2;
    const avg = boots[r + "korea"].map((x, k) => (x + boots[r + "us"][k]) / 2);
    o.ci = [q(avg, 0.05), q(avg, 0.95)];
    o.passTF = o.korea.dS > 0 && o.us.dS > 0 && o.dSe > 0 && o.dSl > 0 && o.korea.full.mdd > res.rules.BH.korea.full.mdd && o.us.full.mdd > res.rules.BH.us.full.mdd;
  }
  res.rules[r] = o;
});

const pc = (x, d) => (x == null ? "–" : (x >= 0 ? "+" : "") + (x * 100).toFixed(d == null ? 1 : d) + "%");
const pp = (x) => (x == null ? "–" : (x >= 0 ? "+" : "") + (x * 100).toFixed(1) + "%p");
const f2 = (x) => (x == null ? "–" : (x >= 0 ? "+" : "") + x.toFixed(2));
const f3 = (x) => (x == null ? "–" : (x >= 0 ? "+" : "") + x.toFixed(3));
console.log("boundary " + MID + " (computed by the original formula: " + res.MID_COMPUTED + ") · korea " + res.countries.korea.from + "~" + res.countries.korea.to + " " + res.countries.korea.days +
  "d (avg " + res.countries.korea.stocksAvg + " stocks) · us " + res.countries.us.from + "~" + res.countries.us.to + " " + res.countries.us.days + "d (avg " + res.countries.us.stocksAvg + ")");
for (const c of ["korea", "us"]) {
  console.log("\n[" + c + " equal-weight] rule | CAGR | vol | Sharpe | MDD | Calmar | expo | dSharpe vs BH (full·H1·H2) | 90% CI | same-day-close Sharpe");
  ["BH"].concat(RULES).forEach((r) => {
    const o = res.rules[r][c], F = o.full;
    console.log((NAME[r] || r).padEnd(12) + " | " + pc(F.cagr).padStart(6) + " | " + pc(F.vol).padStart(6) + " | " + F.sharpe.toFixed(2).padStart(5) + " | " + pc(F.mdd).padStart(6) + " | " +
      (F.calmar == null ? "–" : F.calmar.toFixed(2)).padStart(5) + " | " + (r === "BH" ? "100%" : pc(o.expo, 0).replace("+", "")).padStart(5) +
      (r === "BH" ? "" : " | " + [o.dS, o.dSe, o.dSl].map(f2).join(" · ") + " | [" + o.ci.map(f2).join(", ") + "] | " + o.alt.sharpe.toFixed(2)));
  });
}

// ── stocks ──
const S = [];
fs.readdirSync(DIR).filter((f) => /^tf-stocks-\d+\.jsonl$/.test(f)).forEach((f) => fs.readFileSync(path.join(DIR, f), "utf8").split("\n").forEach((l) => { if (l) S.push(JSON.parse(l)); }));
res.nStocks = { korea: S.filter((s) => s.c === "korea").length, us: S.filter((s) => s.c === "us").length };

// ── PREREG trend-repaint comparison ──
const CMP = ["Z10", "Z10F", "Z10L", "Z10Fa"];
const VC = {};   // country → rule → {chg3, back3, chgB, backB, sy}
for (const c of ["korea", "us"]) {
  VC[c] = {};
  const sy = S.filter((s) => s.c === c).reduce((t, s) => t + (s.nv - 1) / 252, 0);
  RULES.forEach((r) => {
    let a = 0, b = 0, e = 0, f = 0;
    S.filter((s) => s.c === c).forEach((s) => { const v = s.x.vc[r]; if (v[0] != null) { a += v[0]; b += v[1]; } e += v[2]; f += v[3]; });
    VC[c][r] = { chg3: CMP.includes(r) ? a : null, back3: CMP.includes(r) ? b : null, chgB: e, backB: f, sy };
  });
}
res.vc = VC;
// paired bootstrap of Sharpe(variant) − Sharpe(Z10) (21-day blocks, same generator as the original)
res.cmp = {};
for (const r of CMP) {
  const o = { korea: {}, us: {} };
  for (const c of ["korea", "us"]) {
    const R = res.rules[r][c], Z = res.rules.Z10[c];
    o[c] = {
      cagr: R.full.cagr, vol: R.full.vol, sharpe: R.full.sharpe, sharpeH1: R.early.sharpe, sharpeH2: R.late.sharpe, mdd: R.full.mdd, expo: R.expo,
      cagrH1: R.early.cagr, cagrH2: R.late.cagr, mddH1: R.early.mdd, mddH2: R.late.mdd,
      dS: R.full.sharpe - Z.full.sharpe, dSe: R.early.sharpe - Z.early.sharpe, dSl: R.late.sharpe - Z.late.sharpe, dMdd: R.full.mdd - Z.full.mdd,
      chg3: VC[c][r].chg3, back3: VC[c][r].back3, chgB: VC[c][r].chgB, backB: VC[c][r].backB, sy: VC[c][r].sy,
    };
    if (r !== "Z10") { const bd = bootDiffs(P[c][r], P[c].Z10, BOOT); o[c].ciVsZ10 = [q(bd, 0.05), q(bd, 0.95)]; }
  }
  res.cmp[r] = o;
}
console.log("\n[PREREG trend-repaint measure 2] variant | country | CAGR | Sharpe (full · H1<" + MID + " · H2≥) | MDD | expo | dSharpe vs Z10 (full · H1 · H2) [90% CI full] | dMDD vs Z10 | verdict changes 3-state (per stock-yr) | 10d switch-backs 3-state (per stock-yr) | binary changes · switch-backs");
for (const r of CMP) for (const c of ["korea", "us"]) {
  const o = res.cmp[r][c];
  console.log((NAME[r]).padEnd(12) + " | " + c.padEnd(5) + " | " + pc(o.cagr) + " | " + [o.sharpe, o.sharpeH1, o.sharpeH2].map((x) => x.toFixed(3)).join(" · ") + " | " + pc(o.mdd) + " | " + pc(o.expo, 1).replace("+", "") +
    " | " + (r === "Z10" ? "—" : [o.dS, o.dSe, o.dSl].map(f3).join(" · ") + " [" + o.ciVsZ10.map(f2).join(", ") + "]") + " | " + (r === "Z10" ? "—" : pp(o.dMdd)) +
    " | " + o.chg3 + " (" + (o.chg3 / o.sy).toFixed(2) + ") | " + o.back3 + " (" + (o.back3 / o.sy).toFixed(3) + ") | " + o.chgB + " · " + o.backB);
}
// criteria (PREREG trend-repaint): 1) both countries dSharpe ≥ −0.05 and each half ≥ −0.10; 2) both countries MDD not worse than Z10 by > 2%p;
// 3) both countries fewer verdict changes and fewer 10-day switch-backs than Z10; 4) structural (no retroactive change of confirm date / start).
res.criteria = {};
for (const r of ["Z10F", "Z10L", "Z10Fa"]) {
  const k = res.cmp[r].korea, u = res.cmp[r].us, zk = res.cmp.Z10.korea, zu = res.cmp.Z10.us;
  const c1 = [k, u].every((o) => o.dS >= -0.05 && o.dSe >= -0.10 && o.dSl >= -0.10);
  const c1avg = (k.dS + u.dS) / 2 >= -0.05 && (k.dSe + u.dSe) / 2 >= -0.10 && (k.dSl + u.dSl) / 2 >= -0.10;   // alternative (two-country-average) reading, for reference only
  const c2 = [k, u].every((o) => o.dMdd >= -0.02);
  const c3 = k.chg3 < zk.chg3 && k.back3 < zk.back3 && u.chg3 < zu.chg3 && u.back3 < zu.back3;
  const c3bin = k.chgB < zk.chgB && k.backB < zk.backB && u.chgB < zu.chgB && u.backB < zu.backB;
  res.criteria[r] = { c1, c1avg, c2, c3, c3bin };
  console.log("criteria " + NAME[r] + ": 1 " + (c1 ? "pass" : "FAIL") + " (avg-reading " + (c1avg ? "pass" : "fail") + ") · 2 " + (c2 ? "pass" : "FAIL") + " · 3 " + (c3 ? "pass" : "FAIL") + " (binary " + (c3bin ? "pass" : "fail") + ")");
}

// ── diagnostics ──
res.diag = {};
for (const c of ["korea", "us"]) {
  const L = S.filter((s) => s.c === c);
  const sum = (f) => L.reduce((t, s) => t + f(s), 0);
  const cause = { price: sum((s) => s.x.z10cause.price), window: sum((s) => s.x.z10cause.window), h: sum((s) => s.x.z10cause.h) };
  const causeBack = { price: sum((s) => s.x.z10causeBack.price), window: sum((s) => s.x.z10causeBack.window), h: sum((s) => s.x.z10causeBack.h) };
  const rep = {};
  ["Z10", "Z10F", "Z10L"].forEach((r) => { rep[r] = [0, 1, 2].map((i) => sum((s) => s.x.rep[r][i])); rep[r].push(L.filter((s) => s.x.rep[r][1] > 0).length); });
  const agree = {};
  ["Z10F", "Z10L", "Z10Fa"].forEach((r) => { agree[r] = [0, 1, 2].map((i) => sum((s) => s.x.agree[r][i])); });
  const offs = {};
  ["Z10F", "Z10L"].forEach((r) => { offs[r] = {}; Object.keys(L[0].x.offs[r]).forEach((k) => { offs[r][k] = [0, 1, 2].map((i) => sum((s) => s.x.offs[r][k][i])); offs[r][k].push(L.filter((s) => s.x.offs[r][k][1] > 0).length); }); });
  res.diag[c] = { cause, causeBack, rep, agree, offs, stocks: L.length };
  const tot = cause.price + cause.window + cause.h, totB = causeBack.price + causeBack.window + causeBack.h;
  console.log("\n[diag " + c + "] Z10 verdict changes by cause (3-state): price " + cause.price + " (" + pc(cause.price / tot, 0) + ") · window " + cause.window + " · h " + cause.h + " (" + pc(cause.h / tot, 0) + ") of " + tot);
  console.log("  … of which reverted within 10 days: price " + causeBack.price + " · window " + causeBack.window + " · h " + causeBack.h + " of " + totB + "  → reversal rate price " + pc(causeBack.price / cause.price) + " vs h " + pc(causeBack.h / cause.h));
  ["Z10", "Z10F", "Z10L"].forEach((r) => { const x = rep[r]; console.log("  repaint while verdict unchanged — " + r + ": confirm-date changed " + x[1] + " / " + x[0] + " stock-days (" + pc(x[1] / x[0], 2) + "), start changed " + x[2] + " (" + pc(x[2] / x[0], 2) + "), stocks affected " + x[3] + "/" + L.length); });
  ["Z10F", "Z10L", "Z10Fa"].forEach((r) => { const x = agree[r]; console.log("  agreement with Z10 — " + r + ": binary " + pc(x[0] / x[2], 1) + " · 3-state " + pc(x[1] / x[2], 1)); });
  ["Z10F", "Z10L"].forEach((r) => Object.entries(offs[r]).forEach(([k, x]) => console.log("  start offset +" + k + "d — " + r + ": verdict differs " + x[0] + " / " + x[2] + " stock-days (" + pc(x[0] / x[2], 2) + "), leg (pivot/confirm) differs " + x[1] + " (" + pc(x[1] / x[2], 2) + "), stocks " + x[3])));
}
// per-stock: share of stocks where the variant's Sharpe ≥ Z10's
res.perStock = {};
for (const r of ["Z10F", "Z10L"]) {
  res.perStock[r] = {};
  for (const c of ["korea", "us"]) {
    const d = S.filter((s) => s.c === c && s.m[r].full && s.m.Z10.full).map((s) => s.m[r].full.sharpe - s.m.Z10.full.sharpe);
    const dd = S.filter((s) => s.c === c && s.m[r].full && s.m.Z10.full).map((s) => s.m[r].full.mdd - s.m.Z10.full.mdd);
    res.perStock[r][c] = { n: d.length, better: d.filter((x) => x > 1e-12).length / d.length, same: d.filter((x) => Math.abs(x) <= 1e-12).length / d.length, medDS: median(d), medDMdd: median(dd) };
    console.log("[per-stock " + r + " " + c + "] Sharpe higher than Z10 in " + pc(res.perStock[r][c].better, 0) + ", identical in " + pc(res.perStock[r][c].same, 0) + ", median dSharpe " + f3(res.perStock[r][c].medDS) + ", median dMDD " + pp(res.perStock[r][c].medDMdd));
  }
}
fs.writeFileSync(path.join(DIR, "repaint-result.json"), JSON.stringify(res, null, 1));
console.log("\n→ " + path.join(DIR, "repaint-result.json"));
