// trend-repaint PREREG measure 2 — copy of scripts/research/trend-follow/backtest.js (same rules, same execution assumptions)
// with two added rules from scripts/research/trend-repaint/PREREG.md:
//   Z10F  forward-only zigzag: state (direction, extreme) rolled forward every day from the first day sigma exists (t = SIG_N),
//         the day's reversal test uses the day-t h; confirmed pivots are never revisited.
//   Z10L  same, but the reversal test uses the h of the day the current leg was confirmed (new h at the next confirmation).
// plus per-stock verdict-change / 10-day switch-back counts and Z10 diagnostics (cause of each Z10 verdict change,
// confirm-date / start repaint while the verdict is unchanged, start-offset sensitivity of Z10F/Z10L).
// usage: node backtest.js <cache> <i/n> <outdir>
// Only change to the copied logic: require paths point into this repo, outputs go to <outdir>, MID is fixed to 2023-04-26 (PREREG).
const fs = require("fs"), path = require("path");
const TR = require(path.join(__dirname, "..", "..", "lib-trend.js"));
const M0 = require(path.join(__dirname, "..", "trend-method", "m0.js"));
const DIR = path.resolve(process.argv[2] || "research-cache");
const [PART, PARTS] = (process.argv[3] || "0/1").split("/").map(Number);
const OUTD = path.resolve(process.argv[4] || DIR);
fs.mkdirSync(OUTD, { recursive: true });
const PX = path.join(DIR, "px"), ADJ = path.join(DIR, "adj");
const T0 = 756, WIN = 750, SIG_N = 500;
const BACK = 10;   // switch-back window (trading days)
// Z10Fa = implementation-sensitivity copy of Z10F (new leg's extreme = confirmation-day close, as in lib-trend zigzag code)
const RULES = ["Z10", "Z6", "Z8", "M0", "Z10M", "DCH", "MA200", "GC", "TS12", "M10", "Z10F", "Z10L", "Z10Fa"];
const ZZ3 = ["Z10", "Z10F", "Z10L", "Z10Fa"];   // rules with a 3-state verdict (up / down / none)
const OFFS = [1, 5, 21, 63];                     // start-offset sensitivity for the forward rules
const COST = { korea: 0.0015, us: 0.0005 };   // one-way cost
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

const BENCH = {};
for (const [c, f] of [["korea", "^KS11.json"], ["us", "^GSPC.json"]]) BENCH[c] = JSON.parse(fs.readFileSync(path.join(PX, f)));
const firstEval = [BENCH.korea.d[T0 + 2], BENCH.us.d[T0 + 2]].sort()[0];
const lastDay = [BENCH.korea.d[BENCH.korea.d.length - 1], BENCH.us.d[BENCH.us.d.length - 1]].sort()[1];
const MID_COMPUTED = new Date((Date.parse(firstEval) + Date.parse(lastDay)) / 2).toISOString().slice(0, 10);
const MID = "2023-04-26";   // PREREG trend-repaint: 전·후반(경계 2023-04-26) — same boundary as the trend-follow README

// Forward-rolling zigzag on log closes y from index S0. Hday[t] = ln(1 + h_t). lock: Z10L. extMode "b" (default): after a
// confirmation the new leg's extreme is the most extreme close since the pivot; "a": the confirmation-day close (lib-trend code).
// Returns per-day direction (1 up, -1 down, 0 none yet) and the current leg's pivot index pI and confirmation index pC.
function forwardZZ(y, S0, Hday, lock, extMode) {
  const n = y.length, dir = new Int8Array(n), pI = new Int32Array(n).fill(-1), pC = new Int32Array(n).fill(-1);
  let d = 0, hiI = S0, loI = S0, ext = -1, cx = -1, Hl = 0, lastI = -1, lastC = -1;
  // cx = counter-extreme since ext (lowest close after the leg high in an up leg, highest after the leg low in a down leg)
  const counter = (from, to, dd) => { let c = -1; for (let k = from; k <= to; k++) if (c < 0 || (dd > 0 ? y[k] < y[c] : y[k] > y[c])) c = k; return c; };
  for (let t = S0 + 1; t < n; t++) {
    if (d === 0) {
      // initial swing — same as lib-trend zigzag's first phase, with the day-t H
      const Ht = Hday[t];
      if (y[t] > y[hiI]) hiI = t;
      if (y[t] < y[loI]) loI = t;
      if (y[hiI] - y[loI] >= Ht) {
        if (hiI < loI) { lastI = hiI; d = -1; ext = loI; } else { lastI = loI; d = 1; ext = hiI; }
        lastC = t; Hl = Ht;
        cx = counter(ext + 1, t, d);
      }
    } else {
      const Ht = lock ? Hl : Hday[t];
      if (d > 0) {
        if (y[t] > y[ext]) { ext = t; cx = -1; }
        else {
          if (cx < 0 || y[t] < y[cx]) cx = t;
          if (y[ext] - y[t] >= Ht) {
            lastI = ext; lastC = t; d = -1; ext = extMode === "a" ? t : cx; Hl = Hday[t];
            cx = counter(ext + 1, t, d);
          }
        }
      } else {
        if (y[t] < y[ext]) { ext = t; cx = -1; }
        else {
          if (cx < 0 || y[t] > y[cx]) cx = t;
          if (y[t] - y[ext] >= Ht) {
            lastI = ext; lastC = t; d = 1; ext = extMode === "a" ? t : cx; Hl = Hday[t];
            cx = counter(ext + 1, t, d);
          }
        }
      }
    }
    dir[t] = d; pI[t] = lastI; pC[t] = lastC;
  }
  return { dir, pI, pC };
}

// verdict changes and switch-backs on t in [T0+1, n-1]; v: verdict array (3-state or 0/1)
function changes(v, n) {
  const ch = [];
  for (let t = T0 + 1; t < n; t++) if (v[t] !== v[t - 1]) ch.push({ t, from: v[t - 1], to: v[t] });
  let back = 0;
  const backAt = new Set();
  for (let j = 1; j < ch.length; j++) if (ch[j].t - ch[j - 1].t <= BACK && ch[j].to === ch[j - 1].from) { back++; backAt.add(ch[j - 1].t); }
  return { n: ch.length, back, ch, backAt };
}

// rule signals s[k][t] (t >= T0) + extras
function signals(cl, d, idxSig, withExtras) {
  const n = cl.length, y = cl.map(Math.log), lr = y.map((v, i) => (i ? v - y[i - 1] : 0));
  const C = [0];
  for (let i = 0; i < n; i++) C.push(C[i] + cl[i]);
  const sma = (t, L) => (C[t + 1] - C[t + 1 - L]) / L;
  const S = {};
  RULES.forEach((r) => { S[r] = new Int8Array(n); });
  const L1 = [0], L2 = [0];
  for (let i = 0; i < n; i++) { L1.push(L1[i] + lr[i]); L2.push(L2[i] + lr[i] * lr[i]); }
  const sig = (t) => { const a = t - SIG_N + 1, s1 = L1[t + 1] - L1[a], s2 = L2[t + 1] - L2[a]; return Math.sqrt(Math.max(0, (s2 - s1 * s1 / SIG_N) / (SIG_N - 1))); };
  const monthEnd = (t) => t + 1 < n && d[t + 1].slice(0, 7) !== d[t].slice(0, 7);
  const me = [];
  let m10 = 0;
  let inD = 0, peak = 0;
  const Hday = new Float64Array(n);
  const D3 = {}; ZZ3.forEach((r) => { D3[r] = new Int8Array(n); });
  const zC = new Int32Array(n).fill(-1), zI = new Int32Array(n).fill(-1);   // Z10 current leg confirm / start (absolute index)
  for (let t = SIG_N; t < n; t++) {
    const sg = sig(t), h10 = clamp(10 * sg, 0.10, 0.35);
    Hday[t] = Math.log(1 + h10);
    if (t >= 252) {
      let mx = -Infinity;
      for (let k = t - 252; k < t; k++) if (cl[k] > mx) mx = cl[k];
      if (!inD) { if (cl[t] >= mx) { inD = 1; peak = cl[t]; } }
      else { if (cl[t] > peak) peak = cl[t]; if (cl[t] < peak * (1 - h10)) inD = 0; }
    }
    if (monthEnd(t) || t === n - 1) {
      if (monthEnd(t)) me.push(cl[t]);
    }
    if (monthEnd(t) && me.length >= 10) m10 = cl[t] > mean(me.slice(-10)) ? 1 : 0;
    if (t < T0) continue;
    S.DCH[t] = inD;
    S.M10[t] = m10;
    S.MA200[t] = cl[t] > sma(t, 200) ? 1 : 0;
    S.GC[t] = sma(t, 50) > sma(t, 200) ? 1 : 0;
    S.TS12[t] = cl[t] > cl[t - 252] ? 1 : 0;
    const ws = Math.max(0, t - WIN), w = y.slice(ws, t + 1);
    const z = (k) => { const H = Math.log(1 + clamp(k * sg, k * 0.01, k * 0.035)); return TR.zigzag(w, H).dir > 0 ? 1 : 0; };
    // Z10 (identical to z(10) of the original): keep the full zigzag result for the 3-state verdict and the current leg
    const z10 = TR.zigzag(w, Math.log(1 + clamp(10 * sg, 0.10, 0.35)));
    S.Z10[t] = z10.dir > 0 ? 1 : 0;
    D3.Z10[t] = z10.dir;
    if (z10.piv.length) { const P = z10.piv[z10.piv.length - 1]; zC[t] = ws + P.c; zI[t] = ws + P.i; }
    if (withExtras !== "index") { S.Z6[t] = z(6); S.Z8[t] = z(8); S.M0[t] = M0.regime(w, Math.log(1 + h10), 60, sg).cls === "상승" ? 1 : 0; }
    const iz = idxSig ? idxSig(d[t]) : 1;
    S.Z10M[t] = S.Z10[t] && iz ? 1 : 0;
  }
  // forward rules
  const F = forwardZZ(y, SIG_N, Hday, false, "b"), L = forwardZZ(y, SIG_N, Hday, true, "b"), Fa = forwardZZ(y, SIG_N, Hday, false, "a");
  for (let t = T0; t < n; t++) {
    S.Z10F[t] = F.dir[t] > 0 ? 1 : 0; D3.Z10F[t] = F.dir[t];
    S.Z10L[t] = L.dir[t] > 0 ? 1 : 0; D3.Z10L[t] = L.dir[t];
    S.Z10Fa[t] = Fa.dir[t] > 0 ? 1 : 0; D3.Z10Fa[t] = Fa.dir[t];
  }
  if (!withExtras || withExtras === "index") return { S };
  // ── extras (stocks only) ──
  const X = { vc: {}, z10cause: { price: 0, window: 0, h: 0 }, z10causeBack: { price: 0, window: 0, h: 0 }, rep: {}, agree: {}, offs: {} };
  // verdict changes / switch-backs: 3-state for zigzag rules, binary for all rules
  const ch3 = {};
  ZZ3.forEach((r) => { ch3[r] = changes(D3[r], n); });
  RULES.forEach((r) => {
    const b = changes(S[r], n);
    X.vc[r] = ZZ3.includes(r) ? [ch3[r].n, ch3[r].back, b.n, b.back] : [null, null, b.n, b.back];
  });
  // cause of each Z10 verdict change (3-state): V0 yesterday = zz([t-751, t-1], H[t-1]); V1 = add today's bar (same start, H[t-1]);
  // V2 = also drop the oldest bar ([t-750, t], H[t-1]); V3 = today (H[t]). price if V1 != V0, else window if V2 != V0, else h.
  for (const c of ch3.Z10.ch) {
    const t = c.t;
    if (t - 1 < T0) continue;
    const V0 = c.from;
    const V1 = TR.zigzag(y.slice(t - 1 - WIN, t + 1), Hday[t - 1]).dir;
    let cause;
    if (V1 !== V0) cause = "price";
    else {
      const V2 = TR.zigzag(y.slice(t - WIN, t + 1), Hday[t - 1]).dir;
      cause = V2 !== V0 ? "window" : "h";
    }
    X.z10cause[cause]++;
    if (ch3.Z10.backAt.has(t)) X.z10causeBack[cause]++;
  }
  // repaint while the verdict is unchanged: confirm date / start (absolute index) differ from yesterday's
  const repOf = (D, cI, sI) => {
    let same = 0, confCh = 0, startCh = 0;
    for (let t = T0 + 1; t < n; t++) {
      if (D[t] !== D[t - 1] || D[t] === 0) continue;
      same++;
      if (cI[t] !== cI[t - 1]) confCh++;
      if (sI[t] !== sI[t - 1]) startCh++;
    }
    return [same, confCh, startCh];
  };
  X.rep.Z10 = repOf(D3.Z10, zC, zI);
  X.rep.Z10F = repOf(D3.Z10F, F.pC, F.pI);
  X.rep.Z10L = repOf(D3.Z10L, L.pC, L.pI);
  // agreement with Z10 (binary verdict, t in [T0, n-1]) and 3-state
  ["Z10F", "Z10L", "Z10Fa"].forEach((r) => {
    let a = 0, a3 = 0, m = 0;
    for (let t = T0; t < n; t++) { m++; if (S[r][t] === S.Z10[t]) a++; if (D3[r][t] === D3.Z10[t]) a3++; }
    X.agree[r] = [a, a3, m];
  });
  // start-offset sensitivity: forward rules started k days later (same h series) vs the SIG_N start, on t >= T0
  for (const [r, lock] of [["Z10F", false], ["Z10L", true]]) {
    const base = r === "Z10F" ? F : L;
    X.offs[r] = {};
    for (const k of OFFS) {
      const o = forwardZZ(y, SIG_N + k, Hday, lock, "b");
      let dd = 0, leg = 0, m = 0;
      for (let t = T0; t < n; t++) { m++; if (o.dir[t] !== base.dir[t]) dd++; if (o.dir[t] !== base.dir[t] || o.pI[t] !== base.pI[t] || o.pC[t] !== base.pC[t]) leg++; }
      X.offs[r][k] = [dd, leg, m];
    }
  }
  return { S, X };
}

function strat(ret, s, lag, cost, from) {
  const n = ret.length, R = new Float64Array(n), E = new Int8Array(n);
  let prev = s[from - lag] || 0;
  for (let t = from; t < n; t++) {
    const e = s[t - lag];
    R[t] = e * ret[t] - cost * Math.abs(e - prev);
    E[t] = e; prev = e;
  }
  return { R, E };
}
function perf(rs) {
  const N = rs.length;
  if (N < 20) return null;
  let m = 0;
  for (const r of rs) m += r;
  m /= N;
  let v = 0;
  for (const r of rs) v += (r - m) * (r - m);
  const sd = Math.sqrt(v / (N - 1));
  let eq = 1, pk = 1, mdd = 0;
  for (const r of rs) { eq *= 1 + r; if (eq > pk) pk = eq; const dd = eq / pk - 1; if (dd < mdd) mdd = dd; }
  const cagr = Math.pow(eq, 252 / N) - 1;
  return { n: N, cagr, vol: sd * Math.sqrt(252), sharpe: sd > 0 ? m / sd * Math.sqrt(252) : 0, mdd };
}
function trades(R, E, from) {
  const out = [];
  let cur = null;
  for (let t = from; t < E.length; t++) {
    if (E[t] && !cur) cur = { g: 1, days: 0 };
    if (E[t]) { cur.g *= 1 + R[t]; cur.days++; }
    if (!E[t] && cur) { out.push({ r: cur.g - 1, days: cur.days }); cur = null; }
  }
  if (cur) out.push({ r: cur.g - 1, days: cur.days, open: true });
  return out;
}

const IDX = {};
for (const c of ["korea", "us"]) {
  const b = BENCH[c], s = signals(b.cl, b.d, null, "index").S.Z10, map = new Map();
  b.d.forEach((dd, t) => { if (t >= T0) map.set(dd, s[t]); });
  const dates = b.d;
  IDX[c] = (dd) => {
    if (map.has(dd)) return map.get(dd);
    let lo = 0, hi = dates.length - 1, ans = -1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (dates[mid] <= dd) { ans = mid; lo = mid + 1; } else hi = mid - 1; }
    return ans >= T0 ? map.get(dates[ans]) : 0;
  };
}

const files = fs.readdirSync(PX).filter((f) => !f.startsWith("^")).sort().filter((f, i) => i % PARTS === PART);
const AGG = { korea: {}, us: {} };
const outS = fs.openSync(path.join(OUTD, "tf-stocks-" + PART + ".jsonl"), "w");
let done = 0, used = 0;
const t0 = Date.now();
for (const f of files) {
  done++;
  const p = JSON.parse(fs.readFileSync(path.join(PX, f)));
  if (p.cl.length < T0 + 30) continue;
  let a = null;
  try { a = JSON.parse(fs.readFileSync(path.join(ADJ, f))); } catch (_e) {}
  const amap = new Map();
  if (a) a.d.forEach((dd, k) => amap.set(dd, a.ac[k]));
  const n = p.cl.length, ret = new Float64Array(n);
  let adjUsed = 0;
  for (let t = 1; t < n; t++) {
    const a1 = amap.get(p.d[t]), a0 = amap.get(p.d[t - 1]);
    if (a1 > 0 && a0 > 0) { ret[t] = a1 / a0 - 1; adjUsed++; }
    else ret[t] = p.cl[t] / p.cl[t - 1] - 1;
  }
  const { S, X } = signals(p.cl, p.d, IDX[p.c], true);
  const from = T0 + 2, cost = COST[p.c];
  const bhR = Array.from(ret.slice(from));
  const st = { s: p.s, c: p.c, roster: p.roster, n: n - from, nv: n - T0, adj: +(adjUsed / (n - 1)).toFixed(3), from: p.d[from], to: p.d[n - 1], m: {}, x: X };
  const half = (R) => {
    const e = [], l = [];
    for (let t = from; t < n; t++) (p.d[t] < MID ? e : l).push(R[t]);
    return [perf(e), perf(l)];
  };
  const bh = { full: perf(bhR) }; [bh.early, bh.late] = half(ret);
  st.m.BH = bh;
  const res = {};
  RULES.forEach((r) => {
    const A = strat(ret, S[r], 2, cost, from), B = strat(ret, S[r], 1, cost, from);
    res[r] = [A, B];
    const pf = { full: perf(Array.from(A.R.slice(from))), alt: perf(Array.from(B.R.slice(from))) };
    [pf.early, pf.late] = half(A.R);
    let ex = 0, sw = 0;
    for (let t = from; t < n; t++) { ex += A.E[t]; if (t > from && A.E[t] !== A.E[t - 1]) sw++; }
    pf.expo = ex / (n - from); pf.switches = sw;
    const tr = trades(A.R, A.E, from).filter((x) => !x.open);
    const wins = tr.filter((x) => x.r > 0), loss = tr.filter((x) => x.r <= 0);
    pf.trades = { n: tr.length, win: tr.length ? wins.length / tr.length : null, avgWin: wins.length ? mean(wins.map((x) => x.r)) : null,
      avgLoss: loss.length ? mean(loss.map((x) => x.r)) : null, pf: loss.length && wins.length ? wins.reduce((s, x) => s + x.r, 0) / -loss.reduce((s, x) => s + x.r, 0) : null,
      days: tr.length ? mean(tr.map((x) => x.days)) : null };
    st.m[r] = pf;
  });
  const G = AGG[p.c];
  for (let t = from; t < n; t++) {
    const dd = p.d[t];
    let g = G[dd];
    if (!g) { g = G[dd] = { n: 0, bh: 0, R: {}, E: {} }; RULES.forEach((r) => { g.R[r] = [0, 0]; g.E[r] = 0; }); }
    g.n++; g.bh += ret[t];
    RULES.forEach((r) => { g.R[r][0] += res[r][0].R[t]; g.R[r][1] += res[r][1].R[t]; g.E[r] += res[r][0].E[t]; });
  }
  fs.writeSync(outS, JSON.stringify(st) + "\n");
  used++;
  if (done % 25 === 0) console.log("[" + PART + "] …", done, "/", files.length, ((Date.now() - t0) / 1000 | 0) + "s");
}
fs.closeSync(outS);
const round = (x) => +x.toFixed(7);
for (const c of ["korea", "us"]) for (const dd of Object.keys(AGG[c])) { const g = AGG[c][dd]; g.bh = round(g.bh); RULES.forEach((r) => { g.R[r] = g.R[r].map(round); }); }
fs.writeFileSync(path.join(OUTD, "tf-agg-" + PART + ".json"), JSON.stringify({ MID, MID_COMPUTED, firstEval, lastDay, RULES, agg: AGG }));
if (PART === 0) {
  const out = { MID, idx: {} };
  for (const c of ["korea", "us"]) {
    const b = BENCH[c], n = b.cl.length, ret = new Float64Array(n);
    for (let t = 1; t < n; t++) ret[t] = b.cl[t] / b.cl[t - 1] - 1;
    const S = signals(b.cl, b.d, null, false).S, from = T0 + 2;
    const r = { d: b.d.slice(from), BH: Array.from(ret.slice(from)).map(round) };
    RULES.forEach((k) => { const sk = k === "Z10M" ? S.Z10 : S[k]; r[k] = Array.from(strat(ret, sk, 2, COST[c], from).R.slice(from)).map(round); });
    out.idx[c] = r;
  }
  fs.writeFileSync(path.join(OUTD, "tf-index.json"), JSON.stringify(out));
}
console.log("[" + PART + "] 완료 — 종목", used, "/", files.length, " 경계", MID, "(계산값 " + MID_COMPUTED + ")", ((Date.now() - t0) / 1000 | 0) + "s");
