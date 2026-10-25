// 추세 판정 방법 비교(사전 등록: PREREG.md) — 종목마다 평가일(지수 달력 5거래일 간격)에 방법별 판정(상승 U·하락 D·보합 F)을
// 그날까지의 자료로 내고, 이후 21·63거래일 로그수익과 M0 의 효율비(ER)를 쓴다. 판정 변경·헛신호·반납폭은 종목별로 모아 쓴다.
// 사용: node eval.js <캐시 폴더> [i/n]   → <캐시>/tm-evals-<i>.jsonl, <캐시>/tm-stocks-<i>.jsonl   (분석: analyze.js)
const fs = require("fs"), path = require("path");
const TR = require(path.join(__dirname, "..", "..", "lib-trend.js"));
const M0 = require(path.join(__dirname, "m0.js"));   // 비교 당시 운영 판정(지금 운영은 M0-zz)
const DIR = path.resolve(process.argv[2] || "research-cache");
const [PART, PARTS] = (process.argv[3] || "0/1").split("/").map(Number);
const PX = path.join(DIR, "px");
const WARM = 756, STEP = 5, WIN = 750;
const METHODS = ["M0", "M0-k6", "M0-k8", "M0-k13", "M0-f20", "M0-zz", "M2", "M3", "M4", "M5"];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const bench = {};
for (const [c, f] of [["korea", "^KS11.json"], ["us", "^GSPC.json"]]) {
  const b = JSON.parse(fs.readFileSync(path.join(PX, f)));
  const n = b.d.length;
  bench[c] = new Set(b.d.filter((d, i) => (n - 1 - i) % STEP === 0));
}

// 지그재그 계열 — k: σ 배수(하한 k·1%, 상한 k·3.5%), fixed: 고정 되돌림, zz: 정체 규칙 없이 지그재그만
function zzFamily(w, sig, opt) {
  const h = opt.fixed != null ? opt.fixed : clamp(opt.k * sig, opt.k * 0.01, opt.k * 0.035), H = Math.log(1 + h);
  if (opt.zz) {
    const z = TR.zigzag(w, H);
    if (!z.dir) return { L: "F", s: 0 };
    return { L: z.dir > 0 ? "U" : "D", s: z.piv[z.piv.length - 1].i };
  }
  const rg = M0.regime(w, H, 60, sig);
  return { L: rg.cls === "상승" ? "U" : rg.cls === "하락" ? "D" : "F", s: rg.s };
}
// M2 다우 구조 — 5σ 스윙의 고점·저점 배열
function dow(w, sig) {
  const H = Math.log(1 + clamp(5 * sig, 0.05, 0.175)), z = TR.zigzag(w, H), last = w.length - 1, cur = w[last];
  const hs = z.piv.filter((p) => p.k === "H"), ls = z.piv.filter((p) => p.k === "L");
  if (hs.length < 2 || ls.length < 2) return { L: "F", s: 0 };
  const H1 = w[hs[hs.length - 2].i], H2 = w[hs[hs.length - 1].i], L1 = w[ls[ls.length - 2].i], L2 = w[ls[ls.length - 1].i];
  if (H2 > H1 && L2 > L1 && cur > L2) {
    let j = ls.length - 1;
    while (j > 0 && w[ls[j].i] > w[ls[j - 1].i]) j--;
    return { L: "U", s: ls[j].i };
  }
  if (H2 < H1 && L2 < L1 && cur < H2) {
    let j = hs.length - 1;
    while (j > 0 && w[hs[j].i] < w[hs[j - 1].i]) j--;
    return { L: "D", s: hs[j].i };
  }
  return { L: "F", s: Math.max(hs[hs.length - 1].i, ls[ls.length - 1].i) };
}

const files = fs.readdirSync(PX).filter((f) => !f.startsWith("^")).sort().filter((f, i) => i % PARTS === PART);
const outE = fs.openSync(path.join(DIR, "tm-evals-" + PART + ".jsonl"), "w");
const outS = fs.openSync(path.join(DIR, "tm-stocks-" + PART + ".jsonl"), "w");
let done = 0, evals = 0;
const t0 = Date.now();
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(path.join(PX, f)));
  const n = o.cl.length;
  done++;
  if (n < WARM + 70) continue;
  const ev = bench[o.c];
  const cl = o.cl, y = cl.map(Math.log), lr = y.map((v, i) => (i ? v - y[i - 1] : 0));
  // 이동평균·추세 스캔용 누적합
  const P1 = [0], P2 = [0], Q = [0], C = [0];
  for (let i = 0; i < n; i++) { P1.push(P1[i] + y[i]); P2.push(P2[i] + y[i] * y[i]); Q.push(Q[i] + i * y[i]); C.push(C[i] + cl[i]); }
  const sma = (t, L) => (C[t + 1] - C[t + 1 - L]) / L;
  const scan = (t) => {   // 과거 방향 trend scanning — |t| 최대 창
    let best = null;
    for (let L = 21; L <= 252 && L <= t; L += 5) {
      const a = t - L, m = L + 1, Sx = L * m / 2, Sxx = (L * m * (2 * L + 1)) / 6;
      const Sy = P1[t + 1] - P1[a], Syy = P2[t + 1] - P2[a], Sxy = (Q[t + 1] - Q[a]) - a * Sy;
      const den = m * Sxx - Sx * Sx, b = (m * Sxy - Sx * Sy) / den;
      const sxx = Sxx - Sx * Sx / m, sxy = Sxy - Sx * Sy / m, syy = Syy - Sy * Sy / m;
      const ssr = Math.max(1e-12, syy - b * sxy), se = Math.sqrt(ssr / (m - 2) / sxx), tv = b / se;
      if (!best || Math.abs(tv) > Math.abs(best.tv)) best = { tv, b, L };
    }
    return best;
  };
  const seq = METHODS.map(() => []);   // 방법별 [{t, L}]
  for (let t = WARM; t + 63 < n; t++) {
    if (!ev.has(o.d[t])) continue;
    const ws = Math.max(0, t - WIN), w = y.slice(ws, t + 1);
    let s1 = 0, s2 = 0;
    for (let k = t - 499; k <= t; k++) { s1 += lr[k]; s2 += lr[k] * lr[k]; }
    const sig = Math.sqrt(Math.max(0, (s2 - s1 * s1 / 500) / 499));
    const res = [];
    const m0 = zzFamily(w, sig, { k: 10 });
    res.push(m0, zzFamily(w, sig, { k: 6 }), zzFamily(w, sig, { k: 8 }), zzFamily(w, sig, { k: 13 }), zzFamily(w, sig, { fixed: 0.20 }), zzFamily(w, sig, { k: 10, zz: true }), dow(w, sig));
    const c = cl[t], s200 = sma(t, 200), s50 = sma(t, 50);
    res.push({ L: c > s200 && s50 > s200 ? "U" : c < s200 && s50 < s200 ? "D" : "F" });
    const sc = scan(t), band = Math.log(1 + clamp(sig * Math.sqrt(sc.L) / 3, 0.05, 0.10));
    res.push({ L: Math.abs(sc.b * sc.L) < band ? "F" : sc.b > 0 ? "U" : "D" });
    const zs = [21, 63, 252].map((h) => (y[t] - y[t - h]) / (sig * Math.sqrt(h)));
    const zm = (zs[0] + zs[1] + zs[2]) / 3;
    res.push({ L: zm >= 0.25 ? "U" : zm <= -0.25 ? "D" : "F" });
    // M0 효율비(시작점 이후)
    const s0 = ws + m0.s;
    let pathLen = 0;
    for (let k = s0 + 1; k <= t; k++) pathLen += Math.abs(lr[k]);
    const er = t > s0 && pathLen > 0 ? Math.abs(y[t] - y[s0]) / pathLen : null;
    const labs = res.map((r) => r.L).join("");
    fs.writeSync(outE, JSON.stringify({ c: o.c, s: o.s, d: o.d[t], L: labs, r21: +(y[t + 21] - y[t]).toFixed(5), r63: +(y[t + 63] - y[t]).toFixed(5),
      er: er == null ? null : +er.toFixed(4), age: t - s0 }) + "\n");
    res.forEach((r, mi) => seq[mi].push({ t, L: r.L }));
    evals++;
  }
  // 종목별 — 판정 변경 수·헛신호·반납폭(상승 구간 최고 대비)·반등폭(하락 구간 최저 대비)
  const st = { c: o.c, s: o.s, n: seq[0].length, m: {} };
  METHODS.forEach((name, mi) => {
    const q = seq[mi];
    let flips = 0, whip = 0, gbS = 0, gbN = 0, rbS = 0, rbN = 0, runStart = 0;
    for (let j = 1; j < q.length; j++) {
      if (q[j].L === q[j - 1].L) continue;
      flips++;
      for (let k = j + 1; k <= j + 4 && k < q.length; k++) if (q[k].L === q[j - 1].L) { whip++; break; }
      const a = q[runStart].t, b = q[j].t;
      if (q[j - 1].L === "U") { let mx = -Infinity; for (let k = a; k <= b; k++) if (cl[k] > mx) mx = cl[k]; gbS += cl[b] / mx - 1; gbN++; }
      if (q[j - 1].L === "D") { let mn = Infinity; for (let k = a; k <= b; k++) if (cl[k] < mn) mn = cl[k]; rbS += cl[b] / mn - 1; rbN++; }
      runStart = j;
    }
    st.m[name] = { flips, whip, gbS: +gbS.toFixed(4), gbN, rbS: +rbS.toFixed(4), rbN };
  });
  fs.writeSync(outS, JSON.stringify(st) + "\n");
  if (done % 50 === 0) console.log("[" + PART + "] …", done, "/", files.length, "평가", evals, ((Date.now() - t0) / 1000 | 0) + "s");
}
fs.closeSync(outE); fs.closeSync(outS);
console.log("[" + PART + "] 완료", done, "평가", evals, ((Date.now() - t0) / 1000 | 0) + "s");
