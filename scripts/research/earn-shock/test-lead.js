#!/usr/bin/env node
// 실적 주의 앞당기기(PREREG-LEAD.md): 발표 L(2·10·20·40·60)거래일 전에 잰 위험 신호(F1~F4, 3개 이상)가 발표 반응의 큰 움직임(|AR| ≥ 10%)을 가르나
// 사용: node scripts/research/earn-shock/test-lead.js <일봉 캐시(px/)> <자료 폴더(es/)> <한국 목표가(tgt-kr/)> <미국 목표가(us/analyst/)> <한국 분할(kpx/)> <미국 분할(upx/)> [--out 결과.json]
//   신호 정의·발표일·반응은 test-shock.js 와 같고, 신호를 재는 날만 r−2 대신 r−L 이다(앞 발표 반응 다음 날보다 뒤일 때만).
"use strict";
const fs = require("fs"), path = require("path");
const [PX, ES, TKR, TUS, KPX, UPX] = process.argv.slice(2);
const arg = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const readJ = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (_e) { return null; } };
const dayShift = (iso, k) => new Date(Date.parse(iso + "T00:00:00Z") + k * 864e5).toISOString().slice(0, 10);
const monthsBack = (iso, k) => { const y = +iso.slice(0, 4), m = +iso.slice(5, 7) - 1 - k, d = +iso.slice(8, 10); const yy = y + Math.floor(m / 12), mm = ((m % 12) + 12) % 12, last = new Date(Date.UTC(yy, mm + 1, 0)).getUTCDate(); return yy + "-" + String(mm + 1).padStart(2, "0") + "-" + String(Math.min(d, last)).padStart(2, "0"); };
const START = { korea: "2021-10-01", us: "2017-01-01" }, HALF = { korea: "2024-01-01", us: "2022-01-01" };
const NEG = /하회|부진|쇼크|우려|눈높이|하향|적자|감익/;
const LS = [2, 10, 20, 40, 60];

// ── 가격과 나라별 동일비중 지수(test-shock.js 와 같다) ──
const stocks = [];
for (const f of fs.readdirSync(PX)) {
  const j = readJ(path.join(PX, f)); if (!j || j.bench || !j.cl) continue;
  stocks.push({ s: j.s, c: j.c, key: j.c === "korea" ? j.s.slice(0, 6) : j.s, d: j.d, cl: j.cl });
}
const mkt = {};
for (const c of ["korea", "us"]) {
  const sum = new Map(), cnt = new Map();
  for (const s of stocks) { if (s.c !== c) continue; for (let i = 1; i < s.d.length; i++) { const r = s.cl[i] / s.cl[i - 1] - 1; if (!ok(r) || Math.abs(r) > 0.6) continue; sum.set(s.d[i], (sum.get(s.d[i]) || 0) + r); cnt.set(s.d[i], (cnt.get(s.d[i]) || 0) + 1); } }
  const days = [...sum.keys()].sort(); let v = 1; const lvl = new Map();
  for (const d of days) { v *= 1 + sum.get(d) / cnt.get(d); lvl.set(d, v); }
  mkt[c] = lvl;
}
const ret = (s, i0, i1) => (i0 >= 0 && i1 < s.cl.length && i0 < i1 ? s.cl[i1] / s.cl[i0] - 1 : null);
const exr = (s, i0, i1) => { const r = ret(s, i0, i1); if (r == null) return null; const a = mkt[s.c].get(s.d[i0]), b = mkt[s.c].get(s.d[i1]); return a && b ? r - (b / a - 1) : null; };
const firstOnOrAfter = (s, iso) => { let lo = 0, hi = s.d.length - 1, ans = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (s.d[m] >= iso) { ans = m; hi = m - 1; } else lo = m + 1; } return ans; };

// ── 컨센서스 목표가(test-shock.js 와 같다) ──
function consFn(s) {
  const px = readJ(path.join(s.c === "korea" ? KPX : UPX, s.key + ".json"));
  const splits = (px && px.splits) || [];
  const after = (d) => splits.filter((x) => x[0] > d).reduce((p, x) => p * x[1], 1);
  let ev = [];
  if (s.c === "korea") ev = (readJ(path.join(TKR, s.key + ".json")) || []).filter((x) => x.goal > 0).map((x) => ({ d: x.d, f: x.broker, g: x.goal / after(x.d) }));
  else ev = (readJ(path.join(TUS, s.key + ".json")) || []).filter((x) => x[4] > 0).map((x) => ({ d: new Date(x[0] * 1000).toISOString().slice(0, 10), f: x[1], g: x[4] / after(new Date(x[0] * 1000).toISOString().slice(0, 10)), act: x[3] }));
  ev = ev.filter((x) => { const i = firstOnOrAfter(s, x.d); const c = i >= 0 ? s.cl[i] : null; return c > 0 && x.g / c >= 0.2 && x.g / c <= 5; }).sort((a, b) => (a.d < b.d ? -1 : 1));
  const MINF = s.c === "korea" ? 2 : 3;
  const at = (D) => { const from = dayShift(D, -180), last = new Map(); for (const x of ev) { if (x.d > D) break; if (x.d > from) last.set(x.f, x.g); } return last.size >= MINF ? mean([...last.values()]) : null; };
  const raw = s.c === "us" ? (readJ(path.join(TUS, s.key + ".json")) || []).map((x) => ({ d: new Date(x[0] * 1000).toISOString().slice(0, 10), act: x[3] })) : [];
  return { at, raw };
}

// ── 실적 발표일(test-shock.js 와 같다) ──
const nyDate = (iso) => {
  const dt = new Date(iso); if (isNaN(dt)) return null;
  const p = {}; new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23" }).formatToParts(dt).forEach((x) => { p[x.type] = x.value; });
  const d = p.year + "-" + p.month + "-" + p.day; return +p.hour >= 16 ? dayShift(d, 1) : d;
};
function eventsOf(s) {
  if (s.c === "korea") {
    const a = readJ(path.join(ES, "kr-events", s.key + ".json")) || [];
    const cons = a.filter((x) => /연결재무제표기준영업\(잠정\)실적/.test(x[2]));
    const use = cons.length ? cons : a;
    const ds = [...new Set(use.map((x) => x[0]))].sort(), out = [];
    for (const d of ds) { if (!cons.length && out.length && Date.parse(d) - Date.parse(out[out.length - 1]) < 45 * 864e5) continue; out.push(d); }
    return out;
  }
  const a = readJ(path.join(ES, "us-events", s.key + ".json")) || [];
  return [...new Set(a.map((x) => nyDate(x[0])).filter(Boolean))].sort();
}
const titlesOf = (s) => (s.c === "korea" ? readJ(path.join(ES, "kr-titles", s.key + ".json")) || [] : []);

// ── 표본: 발표마다 L 별 신호 ──
const E = [];
for (const s of stocks) {
  const evd = eventsOf(s); if (!evd.length) continue;
  const C = consFn(s), T = titlesOf(s);
  let prev = null;
  for (const d of evd) {
    const r = firstOnOrAfter(s, d);
    if (r < 0 || r + 1 >= s.cl.length) { prev = null; continue; }
    if (Date.parse(s.d[r]) - Date.parse(d) > 6 * 864e5) continue;
    const ar = exr(s, r - 1, r + 1);
    const ev = { c: s.c, s: s.s, d: s.d[r], season: s.d[r].slice(0, 4) + "Q" + (Math.floor((+s.d[r].slice(5, 7) - 1) / 3) + 1), ar, cnt: {}, f: {} };
    const F2 = !!(prev && Date.parse(s.d[r]) - Date.parse(prev.d) <= 200 * 864e5 && ok(prev.ar) && prev.ar <= -0.05);
    for (const L of LS) {
      const m = r - L;
      if (m - 60 < 0) continue;
      if (prev && m <= prev.r + 1) continue;   // 앞 발표가 끝나기 전 — 이번 발표를 미리 본 것이 아니다
      const Dm = s.d[m];
      const a = C.at(Dm), b = C.at(monthsBack(Dm, 3));
      const F1 = !!(a && b && Math.log(a / b) <= Math.log(0.95));
      const pre = exr(s, m - 60, m), F3 = ok(pre) && pre <= -0.10;
      const from = dayShift(Dm, -30);
      let F4;
      if (s.c === "korea") F4 = T.some((x) => x[0] > from && x[0] <= Dm && NEG.test(x[2] + " " + x[3]));
      else { const w = C.raw.filter((x) => x.d > from && x.d <= Dm); const lo = w.filter((x) => x.act === "Lowers").length, up = w.filter((x) => x.act === "Raises").length; F4 = lo >= 2 && lo > up; }
      ev.f[L] = [F1, F2, F3, F4];
      ev.cnt[L] = ev.f[L].filter(Boolean).length;
      // 사후 보고용(판정엔 안 씀): 증권사 자료가 있었나 — F1 은 컨센서스 두 시점, F4 는 30일 안 리포트·목표가 행동
      (ev.cov = ev.cov || {})[L] = { f1: !!(a && b), f4: s.c === "korea" ? T.some((x) => x[0] > from && x[0] <= Dm) : C.raw.some((x) => x.d > from && x.d <= Dm) };
    }
    prev = { r, d: s.d[r], ar };
    if (ev.d >= START[s.c] && ok(ar)) E.push(ev);
  }
}

// ── 판정·보고 ──
const big = (e) => Math.abs(e.ar) >= 0.10, crash = (e) => e.ar <= -0.10, jump = (e) => e.ar >= 0.10, shock = (e) => e.ar <= -0.05;
const rate = (a, fn) => (a.length ? a.filter(fn).length / a.length : null);
function ratioOf(list, L, k) {   // 신호 k개 이상 vs 0개 — 큰 움직임 배수
  const y = list.filter((e) => e.cnt[L] >= k), n = list.filter((e) => e.cnt[L] === 0);
  const ry = rate(y, big), rn = rate(n, big);
  return { nY: y.length, nN: n.length, bigY: ry, bigN: rn, ratio: ry != null && rn ? ry / rn : null,
    crashY: rate(y, crash), crashN: rate(n, crash), jumpY: rate(y, jump), jumpN: rate(n, jump), shockY: rate(y, shock), shockN: rate(n, shock) };
}
function seasonDir(list, L) {   // 방향(보고만): 3개 이상 vs 나머지 평균 반응 차이 — 시즌 평균·t
  const by = new Map(); list.forEach((e) => { if (!by.has(e.season)) by.set(e.season, []); by.get(e.season).push(e); });
  const diffs = [];
  for (const [, a] of by) { const y = a.filter((e) => e.cnt[L] >= 3), n = a.filter((e) => e.cnt[L] < 3); if (y.length >= 5 && n.length >= 5) diffs.push(mean(y.map((e) => e.ar)) - mean(n.map((e) => e.ar))); }
  const m = mean(diffs), sd = diffs.length > 1 ? Math.sqrt(diffs.reduce((s, v) => s + (v - m) ** 2, 0) / (diffs.length - 1)) : null;
  return { diff: m, t: sd ? m / (sd / Math.sqrt(diffs.length)) : null, seasons: diffs.length };
}
const res = { n: E.length, byCountry: { korea: E.filter((e) => e.c === "korea").length, us: E.filter((e) => e.c === "us").length }, L: {} };
const common = E.filter((e) => LS.every((L) => e.cnt[L] != null));
for (const L of LS) {
  const V = E.filter((e) => e.cnt[L] != null);
  const all = ratioOf(V, L, 3);
  const sub = {
    korea: ratioOf(V.filter((e) => e.c === "korea"), L, 3), us: ratioOf(V.filter((e) => e.c === "us"), L, 3),
    h1: ratioOf(V.filter((e) => e.d < HALF[e.c]), L, 3), h2: ratioOf(V.filter((e) => e.d >= HALF[e.c]), L, 3),
  };
  const cross = {};
  for (const c of ["korea", "us"]) for (const h of ["h1", "h2"]) cross[c + "-" + h] = ratioOf(V.filter((e) => e.c === c && (h === "h1" ? e.d < HALF[c] : e.d >= HALF[c])), L, 3);
  const pass = !!(all.ratio >= 1.5 && ["korea", "us", "h1", "h2"].every((k) => sub[k].ratio > 1.2) && all.nY >= 100);
  const pers = V.filter((e) => e.cnt[L] >= 3 && e.cnt[2] != null);
  res.L[L] = {
    n: V.length, share3: V.filter((e) => e.cnt[L] >= 3).length / (V.length || 1), all, sub, cross, pass,
    two: ratioOf(V, L, 2), dir: seasonDir(V, L),
    persist: pers.length ? pers.filter((e) => e.cnt[2] >= 3).length / pers.length : null,
    on: [0, 1, 2, 3].map((k) => V.filter((e) => e.f[L][k]).length / (V.length || 1)),
    cntTable: [0, 1, 2, 3, 4].map((k) => { const a = V.filter((e) => e.cnt[L] === k); return { k, n: a.length, big: rate(a, big), crash: rate(a, crash), jump: rate(a, jump) }; }),
    common: ratioOf(common, L, 3),
  };
}
// 채택: 통과한 L 가운데 가장 긴 것(그보다 짧은 L 이 모두 통과해야)
let adopt = null;
for (const L of LS.slice(1)) { if (LS.filter((x) => x > 2 && x <= L).every((x) => res.L[x].pass)) adopt = L; else break; }
res.adopt = adopt; res.commonN = common.length;
const OUT = arg("out"); if (OUT) fs.writeFileSync(OUT, JSON.stringify(res, null, 1));
const DUMP = arg("dump"); if (DUMP) fs.writeFileSync(DUMP, JSON.stringify(E.map((e) => ({ c: e.c, s: e.s, d: e.d, ar: e.ar, cnt: e.cnt, f: e.f, cov: e.cov }))));   // 사후 분석(posthoc-lead.js)용

const p = (v) => (v == null ? "–" : (v * 100).toFixed(1));
const x2 = (v) => (v == null ? "–" : v.toFixed(2));
console.log("발표 " + res.n + "건(한국 " + res.byCountry.korea + " · 미국 " + res.byCountry.us + ") · 모든 L 공통 " + common.length + "건");
for (const L of LS) {
  const R = res.L[L], a = R.all;
  console.log("\nL=" + L + " (표본 " + R.n + " · 3개 이상 " + a.nY + "건 " + p(R.share3) + "%): 큰 움직임 " + p(a.bigY) + "% vs 0개 " + p(a.bigN) + "% → " + x2(a.ratio) + "배" +
    " | 폭락 " + p(a.crashY) + " vs " + p(a.crashN) + " · 급등 " + p(a.jumpY) + " vs " + p(a.jumpN) + " · 충격 " + p(a.shockY) + " vs " + p(a.shockN) + " → 통과 " + R.pass);
  console.log("   한국 " + x2(R.sub.korea.ratio) + "배(" + R.sub.korea.nY + "건) · 미국 " + x2(R.sub.us.ratio) + "배(" + R.sub.us.nY + "건) · 전반 " + x2(R.sub.h1.ratio) + " · 후반 " + x2(R.sub.h2.ratio) +
    " | 나라×반: " + Object.entries(R.cross).map(([k, v]) => k + " " + x2(v.ratio) + "(" + v.nY + ")").join(" · "));
  console.log("   2개 이상 " + x2(R.two.ratio) + "배 · 방향(3개 이상 − 나머지) " + p(R.dir.diff) + "%p (t " + (R.dir.t == null ? "–" : R.dir.t.toFixed(2)) + ") · 지속(r−2 에도 3개 이상) " + p(R.persist) + "% · 공통 표본 " + x2(R.common.ratio) + "배(" + R.common.nY + ")");
  console.log("   켜짐 F1 " + R.on.map(p).join("% · F") + "% (F1·F2·F3·F4 순) · 개수별 큰 움직임 " + R.cntTable.map((t) => t.k + "개 " + p(t.big) + "%(" + t.n + ")").join(" "));
}
console.log("\n채택: " + (adopt ? "L=" + adopt + " 까지 앞당김" : "앞당기지 않음(7거래일 유지)"));
