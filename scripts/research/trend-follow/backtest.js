// 추세추종 검증(사전 등록: PREREG.md) — 종목마다 규칙 10가지의 일별 '보유/현금' 판정을 그날 종가까지의 자료로 내고,
// 다음 거래일 종가 체결(주)·그날 종가 체결(민감도)로 사고판 일간 수익(배당 포함, 거래 비용 차감)을 낸다.
// 사용: node backtest.js <캐시 폴더> [i/n]   → <캐시>/tf-agg-<i>.json(나라·날짜별 합계), tf-stocks-<i>.jsonl(종목별 성적), tf-index.json(i=0 만)
// 분석: analyze.js
const fs = require("fs"), path = require("path");
const TR = require(path.join(__dirname, "..", "..", "lib-trend.js"));
const M0 = require(path.join(__dirname, "..", "trend-method", "m0.js"));
const DIR = path.resolve(process.argv[2] || "research-cache");
const [PART, PARTS] = (process.argv[3] || "0/1").split("/").map(Number);
const PX = path.join(DIR, "px"), ADJ = path.join(DIR, "adj");
const T0 = 756, WIN = 750, SIG_N = 500;
const RULES = ["Z10", "Z6", "Z8", "M0", "Z10M", "DCH", "MA200", "GC", "TS12", "M10"];
const COST = { korea: 0.0015, us: 0.0005 };   // 한쪽 거래 비용
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

// 전·후반 경계 — 지수 달력의 첫 평가일과 마지막 날의 달력 중간
const BENCH = {};
for (const [c, f] of [["korea", "^KS11.json"], ["us", "^GSPC.json"]]) BENCH[c] = JSON.parse(fs.readFileSync(path.join(PX, f)));
const firstEval = [BENCH.korea.d[T0 + 2], BENCH.us.d[T0 + 2]].sort()[0];
const lastDay = [BENCH.korea.d[BENCH.korea.d.length - 1], BENCH.us.d[BENCH.us.d.length - 1]].sort()[1];
const MID = new Date((Date.parse(firstEval) + Date.parse(lastDay)) / 2).toISOString().slice(0, 10);

// 한 가격 계열의 규칙별 판정 s[k][t](t ≥ T0) — cl: 분할 수정 종가, d: 날짜, idxSig: 같은 나라 지수 Z10 판정(날짜 → 0/1, 없으면 null)
function signals(cl, d, idxSig) {
  const n = cl.length, y = cl.map(Math.log), lr = y.map((v, i) => (i ? v - y[i - 1] : 0));
  const C = [0];
  for (let i = 0; i < n; i++) C.push(C[i] + cl[i]);
  const sma = (t, L) => (C[t + 1] - C[t + 1 - L]) / L;
  const S = {};
  RULES.forEach((r) => { S[r] = new Int8Array(n); });
  // σ — 직전 500 일간 로그수익(누적합으로)
  const L1 = [0], L2 = [0];
  for (let i = 0; i < n; i++) { L1.push(L1[i] + lr[i]); L2.push(L2[i] + lr[i] * lr[i]); }
  const sig = (t) => { const a = t - SIG_N + 1, s1 = L1[t + 1] - L1[a], s2 = L2[t + 1] - L2[a]; return Math.sqrt(Math.max(0, (s2 - s1 * s1 / SIG_N) / (SIG_N - 1))); };
  // 월말(다음 거래일의 달이 다르면 월말 — 달력만 본다)
  const monthEnd = (t) => t + 1 < n && d[t + 1].slice(0, 7) !== d[t].slice(0, 7);
  const me = [];   // 월말 종가 누적
  let m10 = 0;
  // 신고가 돌파 — σ 가 생기는 날부터 상태를 굴린다(평가 시작 때 상태가 이어지도록)
  let inD = 0, peak = 0;
  for (let t = SIG_N; t < n; t++) {
    const sg = sig(t), h10 = clamp(10 * sg, 0.10, 0.35);
    // DCH
    if (t >= 252) {
      let mx = -Infinity;
      for (let k = t - 252; k < t; k++) if (cl[k] > mx) mx = cl[k];
      if (!inD) { if (cl[t] >= mx) { inD = 1; peak = cl[t]; } }
      else { if (cl[t] > peak) peak = cl[t]; if (cl[t] < peak * (1 - h10)) inD = 0; }
    }
    // 월말 종가 기록(그날 판정에 그날 종가를 넣는다)
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
    const w = y.slice(Math.max(0, t - WIN), t + 1);
    const z = (k) => { const H = Math.log(1 + clamp(k * sg, k * 0.01, k * 0.035)); return TR.zigzag(w, H).dir > 0 ? 1 : 0; };
    S.Z10[t] = z(10); S.Z6[t] = z(6); S.Z8[t] = z(8);
    S.M0[t] = M0.regime(w, Math.log(1 + h10), 60, sg).cls === "상승" ? 1 : 0;
    const iz = idxSig ? idxSig(d[t]) : 1;
    S.Z10M[t] = S.Z10[t] && iz ? 1 : 0;
  }
  return S;
}

// 일간 수익 계열 — ret[t] = t 일 수익(배당 포함), s: 판정, lag: 2(다음 날 종가 체결)·1(그날 종가 체결)
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
// 성적 — 일간 수익 배열(구간)
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
// 거래 단위 — 보유 구간마다 수익(비용 포함)·보유 일수
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

// 지수 Z10 판정(날짜 → 0/1)
const IDX = {};
for (const c of ["korea", "us"]) {
  const b = BENCH[c], s = signals(b.cl, b.d, null).Z10, map = new Map();
  b.d.forEach((dd, t) => { if (t >= T0) map.set(dd, s[t]); });
  const dates = b.d;
  IDX[c] = (dd) => {
    if (map.has(dd)) return map.get(dd);
    // 그 날짜 이전 마지막 지수 판정
    let lo = 0, hi = dates.length - 1, ans = -1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (dates[mid] <= dd) { ans = mid; lo = mid + 1; } else hi = mid - 1; }
    return ans >= T0 ? map.get(dates[ans]) : 0;
  };
}

const files = fs.readdirSync(PX).filter((f) => !f.startsWith("^")).sort().filter((f, i) => i % PARTS === PART);
const AGG = { korea: {}, us: {} };   // 나라 → 날짜 → {n, bh, R:{rule:[주, 민감도]}, E:{rule: 보유 수}}
const outS = fs.openSync(path.join(DIR, "tf-stocks-" + PART + ".jsonl"), "w");
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
  const S = signals(p.cl, p.d, IDX[p.c]);
  const from = T0 + 2, cost = COST[p.c];
  const bhR = Array.from(ret.slice(from));
  const st = { s: p.s, c: p.c, roster: p.roster, n: n - from, adj: +(adjUsed / (n - 1)).toFixed(3), from: p.d[from], m: {} };
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
  // 나라·날짜별 합계
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
  if (done % 50 === 0) console.log("[" + PART + "] …", done, "/", files.length, ((Date.now() - t0) / 1000 | 0) + "s");
}
fs.closeSync(outS);
// 합계 — 소수 자리 줄여 쓴다
const round = (x) => +x.toFixed(7);
for (const c of ["korea", "us"]) for (const dd of Object.keys(AGG[c])) { const g = AGG[c][dd]; g.bh = round(g.bh); RULES.forEach((r) => { g.R[r] = g.R[r].map(round); }); }
fs.writeFileSync(path.join(DIR, "tf-agg-" + PART + ".json"), JSON.stringify({ MID, firstEval, lastDay, RULES, agg: AGG }));
// 지수(참고) — 가격 지수, 같은 규칙(시장 필터 = 지수 자신의 Z10)
if (PART === 0) {
  const out = { MID, idx: {} };
  for (const c of ["korea", "us"]) {
    const b = BENCH[c], n = b.cl.length, ret = new Float64Array(n);
    for (let t = 1; t < n; t++) ret[t] = b.cl[t] / b.cl[t - 1] - 1;
    const S = signals(b.cl, b.d, null), from = T0 + 2;
    const r = { d: b.d.slice(from), BH: Array.from(ret.slice(from)).map(round) };
    RULES.forEach((k) => { const sk = k === "Z10M" ? S.Z10 : S[k]; r[k] = Array.from(strat(ret, sk, 2, COST[c], from).R.slice(from)).map(round); });
    out.idx[c] = r;
  }
  fs.writeFileSync(path.join(DIR, "tf-index.json"), JSON.stringify(out));
}
console.log("[" + PART + "] 완료 — 종목", used, "/", files.length, " 경계", MID, ((Date.now() - t0) / 1000 | 0) + "s");
