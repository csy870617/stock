// 1) my copy's original-rule daily aggregates == unmodified harness's (same cache)  2) baseline restricted to README end date
// 3) forwardZZ with constant H == lib-trend zigzag from the same start (dir and pivots)  4) switch-back counter on a toy series
// usage: node checks.js <cache> <out> <orig>   (<orig> = ../trend-follow/backtest.js run on the same cache, i/4 → tf-agg-*.json)
const fs = require("fs"), path = require("path");
const TR = require(path.join(__dirname, "..", "..", "lib-trend.js"));
const load = (d) => fs.readdirSync(d).filter((f) => /^tf-agg-\d+\.json$/.test(f)).sort().map((f) => JSON.parse(fs.readFileSync(path.join(d, f))));
const CACHE = path.resolve(process.argv[2] || "research-cache");
const A = load(path.resolve(process.argv[3] || "out")), B = load(path.resolve(process.argv[4] || "orig"));
let cmp = 0, diff = 0;
for (let i = 0; i < 4; i++) for (const c of ["korea", "us"]) for (const [d, g] of Object.entries(B[i].agg[c])) {
  const h = A[i].agg[c][d];
  if (!h || h.n !== g.n || h.bh !== g.bh) { diff++; continue; }
  for (const r of B[i].RULES) { cmp++; if (h.R[r][0] !== g.R[r][0] || h.R[r][1] !== g.R[r][1] || h.E[r] !== g.E[r]) diff++; }
}
console.log("1) original-rule aggregates compared", cmp, "differences", diff);
// 2) restrict to dates <= 2026-10-23 (README end) and also to README start
function port(parts, c, r, lo, hi) {
  const G = {};
  parts.forEach((p) => Object.entries(p.agg[c]).forEach(([d, g]) => { const x = G[d] || (G[d] = { n: 0, bh: 0, R: 0 }); x.n += g.n; x.bh += g.bh; if (r !== "BH") x.R += g.R[r][0]; }));
  const ds = Object.keys(G).sort().filter((d) => G[d].n >= 20 && d >= lo && d <= hi);
  return ds.map((d) => (r === "BH" ? G[d].bh : G[d].R) / G[d].n);
}
function perf(rs) { const N = rs.length, m = rs.reduce((s, x) => s + x, 0) / N; let v = 0; for (const x of rs) v += (x - m) ** 2; const sd = Math.sqrt(v / (N - 1)); let eq = 1, pk = 1, mdd = 0; for (const x of rs) { eq *= 1 + x; if (eq > pk) pk = eq; mdd = Math.min(mdd, eq / pk - 1); } return { n: N, sharpe: +(m / sd * Math.sqrt(252)).toFixed(3), mdd: +(mdd * 100).toFixed(1), cagr: +((Math.pow(eq, 252 / N) - 1) * 100).toFixed(1) }; }
for (const c of ["korea", "us"]) for (const r of ["BH", "Z10", "Z10F", "Z10L"]) {
  console.log("2)", c, r, "full", JSON.stringify(perf(port(A, c, r, "0000", "9999"))), "≤2026-10-23", JSON.stringify(perf(port(A, c, r, "0000", "2026-10-23"))));
}
// 3) forwardZZ (copied from backtest.js) with constant H vs lib-trend zigzag from the same start
const src = fs.readFileSync(path.join(__dirname, "backtest.js"), "utf8");
const fz = src.slice(src.indexOf("function forwardZZ"), src.indexOf("// verdict changes and switch-backs"));
const forwardZZ = new Function(fz + "; return forwardZZ;")();
let bad = 0, tested = 0;
const pxd = path.join(CACHE, "px"), files = fs.readdirSync(pxd).filter((f) => !f.startsWith("^")).slice(0, 60);
for (const f of files) {
  const p = JSON.parse(fs.readFileSync(path.join(pxd, f))); if (p.cl.length < 900) continue;
  const y = p.cl.map(Math.log), n = y.length, S0 = 500, H0 = Math.log(1.18);
  const Hc = new Float64Array(n).fill(H0);
  for (const [lock, mode] of [[false, "b"], [true, "b"], [false, "a"]]) {
    const F = forwardZZ(y, S0, Hc, lock, mode);
    for (let t = S0 + 30; t < n; t += 37) {
      const z = TR.zigzag(y.slice(S0, t + 1), H0); tested++;
      const P = z.piv[z.piv.length - 1];
      const ok = z.dir === F.dir[t] && (!P ? F.pI[t] === -1 : (S0 + P.i === F.pI[t] && S0 + P.c === F.pC[t]));
      if (!ok) bad++;
    }
  }
}
console.log("3) constant-H forwardZZ vs lib-trend zigzag: tested", tested, "mismatches", bad);
// 4) toy switch-back counter
const T0 = 756, BACK = 10;
const ch = src.slice(src.indexOf("function changes"), src.indexOf("// rule signals"));
const changes = new Function("T0", "BACK", ch + "; return changes;")(T0, BACK);
const v = new Int8Array(800); for (let t = 760; t < 800; t++) v[t] = 1; for (let t = 765; t < 768; t++) v[t] = 0; for (let t = 790; t < 800; t++) v[t] = -1;
const r = changes(v, 800); console.log("4) toy: changes", r.n, "switch-backs", r.back, JSON.stringify(r.ch.map((x) => [x.t, x.from, x.to])));
