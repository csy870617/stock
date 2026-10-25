// 추세추종 검증 — 판정(사전 등록: PREREG.md). backtest.js 결과로 나라별 동일비중 포트폴리오의 성적(규칙 vs 그냥 보유),
// 전·후반, 샤프 차이의 블록 부트스트랩 구간, 채택 판정, 종목별 분포·거래 성적, 지수, H2(종목별 성적 지속성)를 낸다.
// 사용: node analyze.js <캐시 폴더>   → 표준 출력 + <캐시>/tf-result.json
const fs = require("fs"), path = require("path");
const DIR = path.resolve(process.argv[2] || "research-cache");
const parts = fs.readdirSync(DIR).filter((f) => /^tf-agg-\d+\.json$/.test(f)).map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f))));
const { MID, RULES } = parts[0];
const NAME = { BH: "그냥 보유", Z10: "Z10 현행", Z6: "Z6", Z8: "Z8", M0: "M0 옛 규칙", Z10M: "Z10+시장", DCH: "신고가 돌파", MA200: "MA200", GC: "GC 50/200", TS12: "TS12", M10: "M10" };
const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
const median = (a) => { const b = a.slice().sort((x, y) => x - y); return b.length ? (b.length % 2 ? b[b.length >> 1] : (b[b.length / 2 - 1] + b[b.length / 2]) / 2) : null; };

// 나라·날짜별 합치기 → 포트폴리오 일간 수익
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
// 블록 부트스트랩 — 짝지은 일간 수익(a: 규칙, b: 그냥 보유), 21거래일 블록
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

const res = { MID, countries: {}, rules: {} };
const halfIdx = (c, early) => P[c].d.map((d, i) => (early ? d < MID : d >= MID) ? i : -1).filter((i) => i >= 0);
const sub = (arr, idx) => idx.map((i) => arr[i]);
for (const c of ["korea", "us"]) {
  res.countries[c] = { from: P[c].d[0], to: P[c].d[P[c].d.length - 1], days: P[c].d.length, stocksAvg: Math.round(mean(P[c].n)), dropped: P[c].dropped };
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
      o[c].dMdd = o[c].full.mdd - res.rules.BH[c].full.mdd;   // 양수 = 낙폭이 얕다
      boots[r + c] = bootDiffs(P[c][r], P[c].BH, BOOT);
      o[c].ci = [q(boots[r + c], 0.05), q(boots[r + c], 0.95)];
    }
  }
  if (r !== "BH") {
    o.dS = (o.korea.dS + o.us.dS) / 2;
    o.dSe = (o.korea.dSe + o.us.dSe) / 2;
    o.dSl = (o.korea.dSl + o.us.dSl) / 2;
    const avg = boots[r + "korea"].map((x, k) => (x + boots[r + "us"][k]) / 2);
    o.ci = [q(avg, 0.05), q(avg, 0.95)];
    o.pass = o.korea.dS > 0 && o.us.dS > 0 && o.dSe > 0 && o.dSl > 0 && o.korea.full.mdd > res.rules.BH.korea.full.mdd && o.us.full.mdd > res.rules.BH.us.full.mdd;
  }
  res.rules[r] = o;
});

// 출력 — 포트폴리오
const pc = (x, d) => (x == null ? "–" : (x >= 0 ? "+" : "") + (x * 100).toFixed(d == null ? 1 : d) + "%");
const f2 = (x) => (x == null ? "–" : (x >= 0 ? "+" : "") + x.toFixed(2));
console.log("경계 " + MID + " · 한국 " + res.countries.korea.from + "~" + res.countries.korea.to + " " + res.countries.korea.days + "일(평균 " + res.countries.korea.stocksAvg + "종목)" +
  " · 미국 " + res.countries.us.from + "~" + res.countries.us.to + " " + res.countries.us.days + "일(평균 " + res.countries.us.stocksAvg + "종목)");
for (const c of ["korea", "us"]) {
  console.log("\n[" + (c === "korea" ? "한국" : "미국") + " 동일비중 포트폴리오] 규칙 | 연수익 | 변동성 | 샤프 | 최대낙폭 | 칼마 | 보유비중 | 샤프차(전체·전반·후반) | 90% 구간 | 그날 종가 체결 샤프");
  ["BH"].concat(RULES).forEach((r) => {
    const o = res.rules[r][c], F = o.full;
    console.log((NAME[r] || r).padEnd(10) + " | " + pc(F.cagr).padStart(6) + " | " + pc(F.vol).padStart(6) + " | " + F.sharpe.toFixed(2).padStart(5) + " | " + pc(F.mdd).padStart(6) + " | " +
      (F.calmar == null ? "–" : F.calmar.toFixed(2)).padStart(5) + " | " + (r === "BH" ? "100%" : pc(o.expo, 0).replace("+", "")).padStart(5) +
      (r === "BH" ? "" : " | " + [o.dS, o.dSe, o.dSl].map(f2).join(" · ") + " | [" + o.ci.map(f2).join(", ") + "] | " + o.alt.sharpe.toFixed(2)));
  });
}
console.log("\n[판정] 두 나라 평균 샤프 차(전체·전반·후반) · 90% 구간 · 최대 낙폭 얕아짐(한국·미국) → 기준 통과?");
RULES.forEach((r) => {
  const o = res.rules[r];
  console.log((NAME[r] || r).padEnd(10) + " | " + [o.dS, o.dSe, o.dSl].map(f2).join(" · ") + " | [" + o.ci.map(f2).join(", ") + "] | " +
    pc(o.korea.dMdd) + " · " + pc(o.us.dMdd) + " → " + (o.pass ? "통과" : "아니오"));
});
const passers = RULES.filter((r) => res.rules[r].pass).sort((a, b) => res.rules[b].dS - res.rules[a].dS);
let adopt = "Z10", why;
if (!passers.length) why = "통과한 규칙 없음 → Z10 유지";
else if (passers.includes("Z10") && res.rules[passers[0]].dS - res.rules.Z10.dS <= 0.05) why = "Z10 통과, 최선(" + passers[0] + ")과 차이 0.05 이내 → Z10 유지";
else { adopt = passers[0]; why = "통과 규칙 중 평균 샤프 개선 최대 → " + passers[0]; }
res.passers = passers; res.adopt = adopt; res.adoptWhy = why;
console.log("→ 채택: " + adopt + " (" + why + ")");

// 종목별 분포·거래 성적
const S = [];
fs.readdirSync(DIR).filter((f) => /^tf-stocks-\d+\.jsonl$/.test(f)).forEach((f) => fs.readFileSync(path.join(DIR, f), "utf8").split("\n").forEach((l) => { if (l) S.push(JSON.parse(l)); }));
console.log("\n[종목별 — " + S.length + "종목] 규칙 | 샤프 개선 비율·중앙값 | 낙폭 얕아진 비율·중앙값 | 연수익 높아진 비율 | 거래: 연간 수·승률·평균 이익·평균 손실·손익비·평균 보유일");
res.stocks = {};
RULES.forEach((r) => {
  const dS = [], dD = [], dC = [];
  let tn = 0, tw = 0, sw = 0, sl = 0, nw = 0, nl = 0, dsum = 0, yrs = 0, sumWin = 0, sumLoss = 0;
  S.forEach((s) => {
    const a = s.m[r], b = s.m.BH;
    if (!a || !a.full || !b.full) return;
    dS.push(a.full.sharpe - b.full.sharpe); dD.push(a.full.mdd - b.full.mdd); dC.push(a.full.cagr - b.full.cagr);
    const t = a.trades; yrs += s.n / 252;
    if (t && t.n) {
      tn += t.n; const w = Math.round(t.win * t.n); tw += w; nw += w; nl += t.n - w;
      if (t.avgWin != null) sumWin += t.avgWin * w;
      if (t.avgLoss != null) sumLoss += t.avgLoss * (t.n - w);
      dsum += t.days * t.n;
    }
  });
  const o = { up: dS.filter((x) => x > 0).length / dS.length, medS: median(dS), shallower: dD.filter((x) => x > 0).length / dD.length, medD: median(dD),
    cagrUp: dC.filter((x) => x > 0).length / dC.length, tradesPerYear: tn / yrs, win: tw / tn, avgWin: nw ? sumWin / nw : null, avgLoss: nl ? sumLoss / nl : null,
    pf: sumLoss ? sumWin / -sumLoss : null, days: dsum / tn };
  res.stocks[r] = o;
  console.log((NAME[r] || r).padEnd(10) + " | " + pc(o.up, 0).replace("+", "") + " · " + f2(o.medS) + " | " + pc(o.shallower, 0).replace("+", "") + " · " + pc(o.medD) +
    " | " + pc(o.cagrUp, 0).replace("+", "") + " | " + o.tradesPerYear.toFixed(1) + " · " + pc(o.win, 0).replace("+", "") + " · " + pc(o.avgWin) + " · " + pc(o.avgLoss) + " · " + (o.pf == null ? "–" : o.pf.toFixed(2)) + " · " + Math.round(o.days));
});

// 지수(참고 — 가격 지수)
const IX = JSON.parse(fs.readFileSync(path.join(DIR, "tf-index.json")));
res.index = {};
console.log("\n[지수(가격 지수, 참고)] 규칙 | 코스피: 연수익·샤프·최대낙폭 | S&P 500: 연수익·샤프·최대낙폭");
["BH"].concat(RULES).forEach((r) => {
  const k = perf(IX.idx.korea[r]), u = perf(IX.idx.us[r]);
  res.index[r] = { korea: k, us: u };
  console.log((NAME[r] || r).padEnd(10) + " | " + pc(k.cagr) + " · " + k.sharpe.toFixed(2) + " · " + pc(k.mdd) + " | " + pc(u.cagr) + " · " + u.sharpe.toFixed(2) + " · " + pc(u.mdd));
});

// H2 — 채택 판정(없으면 Z10)의 종목별 샤프 개선이 전반 → 후반으로 이어지는가
function spearman(x, y) {
  const rk = (a) => { const idx = a.map((v, i) => [v, i]).sort((p, q2) => p[0] - q2[0]), r = new Array(a.length); idx.forEach((p, k) => { r[p[1]] = k; }); return r; };
  const rx = rk(x), ry = rk(y), mx = mean(rx), my = mean(ry);
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < x.length; i++) { sxy += (rx[i] - mx) * (ry[i] - my); sxx += (rx[i] - mx) ** 2; syy += (ry[i] - my) ** 2; }
  return sxy / Math.sqrt(sxx * syy);
}
res.H2 = { rule: adopt };
console.log("\n[H2] " + adopt + " 의 종목별 샤프 개선 — 전반 vs 후반 순위상관(각 반 250거래일 이상)");
for (const c of ["korea", "us"]) {
  const x = [], y = [];
  S.filter((s) => s.c === c).forEach((s) => {
    const a = s.m[adopt], b = s.m.BH;
    if (!a.early || !a.late || !b.early || !b.late || a.early.n < 250 || a.late.n < 250) return;
    x.push(a.early.sharpe - b.early.sharpe); y.push(a.late.sharpe - b.late.sharpe);
  });
  const rho = spearman(x, y);
  let ge = 0;
  const yy = y.slice();
  for (let k = 0; k < 2000; k++) { for (let i = yy.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [yy[i], yy[j]] = [yy[j], yy[i]]; } if (spearman(x, yy) >= rho) ge++; }
  res.H2[c] = { n: x.length, rho, p: (ge + 1) / 2001 };
  console.log("  " + (c === "korea" ? "한국" : "미국") + " " + x.length + "종목 · 상관 " + f2(rho) + " · p " + ((ge + 1) / 2001).toFixed(3));
}
res.H2.pass = res.H2.korea.rho > 0 && res.H2.korea.p < 0.05 && res.H2.us.rho > 0 && res.H2.us.p < 0.05;
console.log("  → " + (res.H2.pass ? "통과" : "통과 못 함"));

// 포트폴리오 누적 곡선(그림용, 주 단위로 줄여서)
res.curves = {};
for (const c of ["korea", "us"]) {
  const keep = ["BH", "Z10", adopt].filter((v, i, a) => a.indexOf(v) === i), cur = { d: [] };
  keep.forEach((r) => { cur[r] = []; });
  const eq = {};
  keep.forEach((r) => { eq[r] = 1; });
  P[c].d.forEach((d, i) => {
    keep.forEach((r) => { eq[r] *= 1 + P[c][r][i]; });
    if (i % 5 === 0 || i === P[c].d.length - 1) { cur.d.push(d); keep.forEach((r) => cur[r].push(+eq[r].toFixed(4))); }
  });
  res.curves[c] = cur;
}
fs.writeFileSync(path.join(DIR, "tf-result.json"), JSON.stringify(res, null, 1));
console.log("\n→ " + path.join(DIR, "tf-result.json"));
