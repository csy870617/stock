// 추세추종 종목 선택 검증 — 판정(사전 등록: PREREG.md). fetch-broad.js 의 월 자료로 나라별 시점별 후보(그때 시총 상위)를 만들고
// 전략마다 매달 들고 갈 종목을 골라 비용을 뺀 월 수익을 낸다 → 연 수익률·샤프·최대 낙폭·회전율, EW 대비 초과수익(전·후반·t), 채택 판정,
// 민감도(지금 대형주 고정 후보 — 생존편향 크기).
// 사용: node analyze.js <캐시 폴더>   → 표준 출력 + <캐시>/tsel/result.json
const fs = require("fs"), path = require("path");
const DIR = path.resolve(process.argv[2] || "research-cache"), T = path.join(DIR, "tsel");
const TOPN = { korea: 300, us: 500 }, COST = { korea: 0.0015, us: 0.0005 };
const STRATS = ["BH", "EW", "TZ", "TZR", "DCH", "MA200", "MOM", "HI52"];
const NAME = { BH: "그냥 보유", EW: "후보 전체", TZ: "상승 추세 전부", TZR: "상승 추세·이익 키우기", DCH: "신고가 돌파 보유", MA200: "200일선 위", MOM: "12-1 모멘텀 상위 20%", HI52: "52주 고가 근접 상위 20%" };
const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
function nwT(xs, L) {
  const n = xs.length; if (n < 12) return null;
  const m = mean(xs), e = xs.map((x) => x - m);
  let v = e.reduce((s, x) => s + x * x, 0) / n;
  for (let l = 1; l <= L; l++) { let g = 0; for (let i = l; i < n; i++) g += e[i] * e[i - l]; v += 2 * (1 - l / (L + 1)) * (g / n); }
  return v > 0 ? m / Math.sqrt(v / n) : null;
}
function stats(rs) {
  if (!rs.length) return null;
  let eq = 1, pk = 1, mdd = 0;
  rs.forEach((r) => { eq *= 1 + r; if (eq > pk) pk = eq; mdd = Math.min(mdd, eq / pk - 1); });
  const m = mean(rs), sd = Math.sqrt(rs.reduce((s, r) => s + (r - m) * (r - m), 0) / Math.max(1, rs.length - 1));
  return { months: rs.length, cagr: Math.pow(eq, 12 / rs.length) - 1, vol: sd * Math.sqrt(12), sharpe: sd > 0 ? m / sd * Math.sqrt(12) : 0, mdd, tot: eq - 1 };
}

function load(c) {
  const rows = fs.readFileSync(path.join(T, "feat-" + c + ".jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
  // 월(판정일) → 그달 자료가 있는 종목들
  const byM = new Map();
  rows.forEach((st) => st.m.forEach((x) => {
    if (x.fr == null || x.bad) return;   // 자료 끊김이 걸친 달은 후보에서 뺀다(PREREG 덧붙임)
    if (!byM.has(x.d)) byM.set(x.d, []);
    byM.get(x.d).push(Object.assign({ s: st.s, cap0: st.cap0 }, x));
  }));
  return { rows, months: [...byM.keys()].sort(), byM };
}

const IX = JSON.parse(fs.readFileSync(path.join(T, "idx.json"), "utf8"));
// 한 나라·한 후보 방식(pit: 그때 시총, static: 지금 시총)으로 전략별 월 수익
function run(c, mode) {
  const D = load(c), months = D.months, N = TOPN[c], cost = COST[c];
  const out = {}; STRATS.forEach((k) => { out[k] = { r: [], turn: [], hold: [] }; });
  const W = {};   // 전략별 지금 비중(종목 → 비중, 매달 말 값 = 수익 반영 뒤)
  STRATS.forEach((k) => { W[k] = new Map(); });
  // 그냥 보유(BH): 첫 달 후보를 끝까지 들고 간다 — 후보에서 빠진 달(자료 끊김·거래 정지)에도 팔지 않는다.
  // 달력 매매일 가격(pa)으로 잇고(거래 정지 동안의 움직임은 재개 가격으로 반영), 끊김이 든 달의 수익만 0 으로 둔다.
  const CAL = IX.cal[c], calIdx = new Map(CAL.map((e, k) => [e.d, k])), byS = new Map(D.rows.map((st) => [st.s, st]));
  const bhV = new Map();
  let halt = 0, held = 0;   // 진단: 매매일에 거래가 없어(정지) 직전 거래일 값으로 정리된 것으로 본 종목-월(EW 기준)
  let bhStarted = false;
  months.forEach((d, mi) => {
    const all = D.byM.get(d);
    const ranked = all.slice().sort((a, b) => (mode === "static" ? b.cap0 - a.cap0 : b.cap - a.cap));
    const U = ranked.slice(0, N), Ux = new Map(U.map((x) => [x.s, x]));
    const allx = new Map(all.map((x) => [x.s, x]));
    const pickTop = (key) => { const a = U.slice().sort((p, q) => q[key] - p[key]); return a.slice(0, Math.max(1, Math.round(a.length * 0.2))); };
    const sel = {
      EW: U, TZ: U.filter((x) => x.z), TZR: U.filter((x) => x.z), DCH: U.filter((x) => x.dch), MA200: U.filter((x) => x.ma),
      MOM: pickTop("mom"), HI52: pickTop("hi"),
    };
    U.forEach((x) => { held++; if (x.end) halt++; });
    // BH
    {
      if (!bhStarted) U.forEach((x) => bhV.set(x.s, 1 / U.length));
      const k = calIdx.get(d), x0 = CAL[k].x, x1 = CAL[k + 1] ? CAL[k + 1].x : null;
      let v0 = 0, v1 = 0;
      bhV.forEach((v, s) => {
        const st = byS.get(s), p0 = st.pa[k], p1 = st.pa[k + 1];
        let r = 0;
        if (p0 && p1 && x1 && !st.jd.some((j) => j > x0 && j <= x1)) r = p1 / p0 - 1;
        v0 += v; v1 += v * (1 + r); bhV.set(s, v * (1 + r));
      });
      out.BH.r.push(v1 / v0 - 1); out.BH.turn.push(bhStarted ? 0 : 1); out.BH.hold.push(bhV.size);
    }
    STRATS.forEach((k) => {
      if (k === "BH") return;
      let target;
      const prev = W[k];
      {
        let S = sel[k];
        if (!S.length) S = U;
        if (k === "TZR" && prev.size) {
          const keep = S.filter((x) => prev.has(x.s)), add = S.filter((x) => !prev.has(x.s));
          const tot = [...prev.values()].reduce((s, v) => s + v, 0) || 1;
          const keepSum = keep.reduce((s, x) => s + prev.get(x.s) / tot, 0);
          const addW = 1 / S.length, rest = Math.max(0, 1 - add.length * addW);
          target = new Map();
          keep.forEach((x) => target.set(x.s, keepSum > 0 ? (prev.get(x.s) / tot) / keepSum * rest : rest / Math.max(1, keep.length)));
          add.forEach((x) => target.set(x.s, keep.length ? addW : 1 / add.length));
        } else target = new Map(S.map((x) => [x.s, 1 / S.length]));
      }
      // 회전율 = Σ|목표 비중 − 지금 비중|(사고판 금액 합, 현금은 거래가 아니다), 비용 = 한쪽 비용 × 회전율
      let turn = 0;
      const keys = new Set([...prev.keys(), ...target.keys()]);
      keys.forEach((s) => { turn += Math.abs((target.get(s) || 0) - (prev.get(s) || 0)); });
      if (!prev.size) turn = 1;   // 첫 매수
      // 이번 달 수익 — 목표 비중 × 그 종목의 다음 매매일까지 수익(매매일에 거래가 없던 종목은 직전 거래일 값으로 정리 → 다음 달 재투자)
      let r = 0, w1 = new Map(), cash = 0;
      target.forEach((w, s) => {
        const x = allx.get(s);
        const fr = x && x.fr != null ? x.fr : 0;
        r += w * fr;
        if (x && !x.end) w1.set(s, w * (1 + fr)); else cash += w * (1 + fr);
      });
      r -= cost * turn * (mi === 0 ? 0 : 1);
      out[k].r.push(r); out[k].turn.push(turn); out[k].hold.push(target.size);
      // 다음 달 시작 비중(정리된 현금은 다음 달 목표에 다시 넣는다 — 전액 투자)
      const after = [...w1.values()].reduce((s, v) => s + v, 0) + cash;
      const nw = new Map();
      w1.forEach((v, s) => nw.set(s, v / after));
      W[k] = nw;
    });
    bhStarted = true;
  });
  return { months, out, halt, held };
}

const res = { countries: {}, decision: null };
const R = {};
for (const c of ["korea", "us"]) {
  R[c] = { pit: run(c, "pit"), stat: run(c, "static") };
}
const months = R.korea.pit.months.filter((d) => R.us.pit.months.some((x) => x.slice(0, 7) === d.slice(0, 7)));
const first = months[0], last = months[months.length - 1];
const MID = new Date((Date.parse(first) + Date.parse(last)) / 2).toISOString().slice(0, 7);
const pc = (x) => (x == null ? "–" : (x >= 0 ? "+" : "") + (x * 100).toFixed(1) + "%");
const f2 = (x) => (x == null ? "–" : (x >= 0 ? "+" : "") + x.toFixed(2));
console.log("평가 " + first.slice(0, 7) + " ~ " + last.slice(0, 7) + " 판정월(한국 " + R.korea.pit.months.length + "·미국 " + R.us.pit.months.length + "개월) · 전·후반 경계 " + MID);
for (const c of ["korea", "us"]) console.log("  " + c + " 후보 중 매매일 거래 정지(직전 거래일 값으로 정리한 것으로 봄): " + R[c].pit.halt + " / " + R[c].pit.held + " 종목-월");
for (const mode of ["pit", "stat"]) {
  console.log("\n===== 후보: " + (mode === "pit" ? "시점별 대형주(판정용)" : "지금 대형주 고정(생존편향 민감도)") + " =====");
  for (const c of ["korea", "us"]) {
    const o = R[c][mode].out;
    console.log("[" + (c === "korea" ? "한국 상위 300" : "미국 상위 500") + "] 전략 | 연수익 | 변동성 | 샤프 | 최대낙폭 | 연 회전율 | 평균 종목 수 | EW 대비 월 초과(평균·t)");
    STRATS.forEach((k) => {
      const s = stats(o[k].r), ex = o[k].r.map((r, i) => r - o.EW.r[i]);
      const yr = o[k].turn.slice(1).reduce((a, b) => a + b, 0) / ((o[k].turn.length - 1) / 12) / 2;
      console.log(NAME[k].padEnd(14) + " | " + pc(s.cagr).padStart(6) + " | " + pc(s.vol).padStart(6) + " | " + s.sharpe.toFixed(2) + " | " + pc(s.mdd).padStart(6) + " | " +
        (yr * 100).toFixed(0).padStart(4) + "% | " + Math.round(mean(o[k].hold)).toString().padStart(4) + " | " + (k === "EW" ? "–" : pc(mean(ex)) + "·" + f2(nwT(ex, 3))));
    });
  }
}
// 판정(시점별 후보)
console.log("\n[판정] 전략 | CAGR − BH (한국·미국) | CAGR − EW (한국·미국) | 두 나라 평균 월 초과(EW 대비): 전반·후반·t → 기준");
const dec = {};
STRATS.filter((k) => k !== "BH" && k !== "EW").forEach((k) => {
  const g = {};
  for (const c of ["korea", "us"]) {
    const o = R[c].pit.out;
    g[c] = { cagr: stats(o[k].r).cagr, bh: stats(o.BH.r).cagr, ew: stats(o.EW.r).cagr, ex: new Map(R[c].pit.months.map((d, i) => [d.slice(0, 7), o[k].r[i] - o.EW.r[i]])) };
  }
  const ms = [...g.korea.ex.keys()].filter((m) => g.us.ex.has(m)).sort();
  const avg = ms.map((m) => (g.korea.ex.get(m) + g.us.ex.get(m)) / 2);
  const early = ms.map((m, i) => (m < MID ? avg[i] : null)).filter((v) => v != null), late = ms.map((m, i) => (m >= MID ? avg[i] : null)).filter((v) => v != null);
  const t = nwT(avg, 3);
  const pass = g.korea.cagr > g.korea.bh && g.korea.cagr > g.korea.ew && g.us.cagr > g.us.bh && g.us.cagr > g.us.ew && mean(early) > 0 && mean(late) > 0 && t >= 2;
  dec[k] = { kr: g.korea, us: g.us, early: mean(early), late: mean(late), t, pass, exAvg: ((g.korea.cagr - g.korea.ew) + (g.us.cagr - g.us.ew)) / 2 };
  console.log(NAME[k].padEnd(14) + " | " + pc(g.korea.cagr - g.korea.bh) + " · " + pc(g.us.cagr - g.us.bh) + " | " + pc(g.korea.cagr - g.korea.ew) + " · " + pc(g.us.cagr - g.us.ew) +
    " | " + pc(mean(early)) + " · " + pc(mean(late)) + " · t " + f2(t) + " → " + (pass ? "통과" : "아니오"));
});
const passers = Object.keys(dec).filter((k) => dec[k].pass).sort((a, b) => dec[b].exAvg - dec[a].exAvg);
let adopt = null, why;
if (!passers.length) why = "통과한 전략 없음";
else {
  adopt = passers[0]; why = "통과 전략 중 EW 대비 CAGR 초과가 가장 큼";
  const z = passers.filter((k) => k === "TZ" || k === "TZR").sort((a, b) => dec[b].exAvg - dec[a].exAvg)[0];
  if (z && z !== adopt && dec[adopt].exAvg - dec[z].exAvg <= 0.01) { adopt = z; why = "앱 판정과 같은 전략이 최선과 1%p 이내"; }
}
console.log("→ 채택: " + (adopt ? NAME[adopt] : "없음") + " (" + why + ")");
// 참고 지수
function idxMonthly(o, cal) {
  const rs = [];
  for (let k = 0; k + 1 < cal.length; k++) {
    const a = o.d.indexOf(cal[k].x), b = o.d.indexOf(cal[k + 1].x);
    if (a >= 0 && b >= 0 && cal[k].d >= first && cal[k].d <= last) rs.push(o.c[b] / o.c[a] - 1);
  }
  return stats(rs);
}
const ks = idxMonthly(IX.kospi, IX.cal.korea), sp = IX.sp500tr ? idxMonthly(IX.sp500tr, IX.cal.us) : null;
console.log("\n[참고] 코스피(가격) 연 " + pc(ks.cagr) + "·최대낙폭 " + pc(ks.mdd) + (sp ? " · S&P 500 총수익 연 " + pc(sp.cagr) + "·최대낙폭 " + pc(sp.mdd) : ""));
res.MID = MID; res.from = first; res.to = last; res.dec = dec; res.adopt = adopt; res.adoptWhy = why;
for (const c of ["korea", "us"]) for (const mode of ["pit", "stat"]) {
  res.countries[c + "_" + mode] = {};
  STRATS.forEach((k) => { res.countries[c + "_" + mode][k] = Object.assign(stats(R[c][mode].out[k].r), { hold: mean(R[c][mode].out[k].hold) }); });
}
res.curves = {};
for (const c of ["korea", "us"]) {
  const o = R[c].pit.out, cv = { d: R[c].pit.months };
  STRATS.forEach((k) => { let e = 1; cv[k] = o[k].r.map((r) => +(e *= 1 + r).toFixed(4)); });
  res.curves[c] = cv;
}
res.index = { kospi: ks, sp500tr: sp };
fs.writeFileSync(path.join(T, "result.json"), JSON.stringify(res, (k, v) => (v instanceof Map ? undefined : v), 1));
console.log("\n→ " + path.join(T, "result.json"));
