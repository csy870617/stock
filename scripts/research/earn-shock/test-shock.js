#!/usr/bin/env node
// 실적 충격 연구(PREREG.md): 발표 전 위험 신호(F1 기대 하향·F2 직전 충격·F3 주가 약세·F4 프리뷰 경고, R = 2개 이상)가 있는 발표의 반응이 나쁜가
// 사용: node scripts/research/earn-shock/test-shock.js <일봉 캐시(px/)> <자료 폴더(es/)> <한국 목표가(tgt-kr/)> <미국 목표가(us/analyst/)> <한국 px(분할)> <미국 px(분할)> [--out 결과.json]
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

// ── 가격과 나라별 동일비중 지수 ──
const stocks = [];
for (const f of fs.readdirSync(PX)) {
  const j = readJ(path.join(PX, f)); if (!j || j.bench || !j.cl) continue;
  const idx = new Map(j.d.map((d, i) => [d, i]));
  stocks.push({ s: j.s, c: j.c, key: j.c === "korea" ? j.s.slice(0, 6) : j.s, d: j.d, cl: j.cl, idx });
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

// ── 컨센서스 목표가(Top Pick 6차와 같은 정의) ──
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
  return { at, has: ev.length > 0, raw };
}

// ── 실적 발표일 ──
const nyDate = (iso) => {
  const dt = new Date(iso); if (isNaN(dt)) return null;
  const p = {}; new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23" }).formatToParts(dt).forEach((x) => { p[x.type] = x.value; });
  const d = p.year + "-" + p.month + "-" + p.day; return +p.hour >= 16 ? dayShift(d, 1) : d;
};
function eventsOf(s) {
  if (s.c === "korea") {
    const a = readJ(path.join(ES, "kr-events", s.key + ".json")) || [];
    const cons = a.filter((x) => /연결재무제표기준영업\(잠정\)실적/.test(x[2]));
    let use = cons.length ? cons : a;
    const ds = [...new Set(use.map((x) => x[0]))].sort(), out = [];
    for (const d of ds) { if (!cons.length && out.length && Date.parse(d) - Date.parse(out[out.length - 1]) < 45 * 864e5) continue; out.push(d); }
    return out;
  }
  const a = readJ(path.join(ES, "us-events", s.key + ".json")) || [];
  return [...new Set(a.map((x) => nyDate(x[0])).filter(Boolean))].sort();
}
const titlesOf = (s) => (s.c === "korea" ? readJ(path.join(ES, "kr-titles", s.key + ".json")) || [] : []);

// ── 표본 ──
const E = [];
let kia = null;
for (const s of stocks) {
  const evd = eventsOf(s); if (!evd.length) continue;
  const C = consFn(s), T = titlesOf(s);
  let prev = null;
  for (const d of evd) {
    const r = firstOnOrAfter(s, d);
    if (r < 63 || r + 1 >= s.cl.length) { prev = null; continue; }
    if (s.d[r] && Date.parse(s.d[r]) - Date.parse(d) > 6 * 864e5) continue;   // 그 근처 가격이 없으면
    const ar = exr(s, r - 1, r + 1);
    const D2 = s.d[r - 2];
    const ev = { c: s.c, s: s.s, d: s.d[r], season: s.d[r].slice(0, 4) + "Q" + (Math.floor((+s.d[r].slice(5, 7) - 1) / 3) + 1), ar, post: exr(s, r + 1, Math.min(r + 22, s.cl.length - 1)) };
    // F1 기대 하향
    const a = C.at(D2), b = C.at(monthsBack(D2, 3));
    ev.f1d = a && b ? Math.log(a / b) : null; ev.F1 = ev.f1d != null && ev.f1d <= Math.log(0.95);
    // F2 직전 충격
    ev.F2 = !!(prev && Date.parse(s.d[r]) - Date.parse(prev.d) <= 200 * 864e5 && ok(prev.ar) && prev.ar <= -0.05);
    // F3 주가 약세
    const pre = exr(s, r - 62, r - 2); ev.pre = pre; ev.F3 = ok(pre) && pre <= -0.10;
    // F4 프리뷰 경고
    const from = dayShift(D2, -30);
    if (s.c === "korea") { const w = T.filter((x) => x[0] > from && x[0] <= D2); ev.f4n = w.length; ev.F4 = w.some((x) => NEG.test(x[2] + " " + x[3])); }
    else { const w = C.raw.filter((x) => x.d > from && x.d <= D2); const lo = w.filter((x) => x.act === "Lowers").length, up = w.filter((x) => x.act === "Raises").length; ev.f4n = w.length; ev.F4 = lo >= 2 && lo > up; }
    ev.cnt = [ev.F1, ev.F2, ev.F3, ev.F4].filter(Boolean).length; ev.R = ev.cnt >= 2;
    if (s.key === "000270" && ev.d === "2026-10-30") kia = ev;
    prev = ev;
    if (ev.d >= START[s.c] && ok(ar)) E.push(ev);
  }
}

// ── 판정 ──
function seasonStat(list, flag) {
  const by = new Map(); list.forEach((e) => { if (!by.has(e.season)) by.set(e.season, []); by.get(e.season).push(e); });
  const diffs = [];
  for (const [, a] of [...by.entries()].sort()) {
    const y = a.filter((e) => e[flag]), n = a.filter((e) => !e[flag]);
    if (y.length >= 5 && n.length >= 5) diffs.push(mean(y.map((e) => e.ar)) - mean(n.map((e) => e.ar)));
  }
  const m = mean(diffs), sd = diffs.length > 1 ? Math.sqrt(diffs.reduce((s, v) => s + (v - m) ** 2, 0) / (diffs.length - 1)) : null;
  return { diff: m, t: sd ? m / (sd / Math.sqrt(diffs.length)) : null, seasons: diffs.length };
}
function rates(list, flag) {
  const y = list.filter((e) => e[flag]), n = list.filter((e) => !e[flag]);
  const sh = (a, k) => (a.length ? a.filter((e) => e.ar <= k).length / a.length : null);
  return { nFlag: y.length, share: y.length / (list.length || 1), shockY: sh(y, -0.05), shockN: sh(n, -0.05), ratio: sh(n, -0.05) ? sh(y, -0.05) / sh(n, -0.05) : null,
    bigY: sh(y, -0.10), bigN: sh(n, -0.10), arY: mean(y.map((e) => e.ar)), arN: mean(n.map((e) => e.ar)), postY: mean(y.map((e) => e.post)), postN: mean(n.map((e) => e.post)) };
}
const FL = ["R", "F1", "F2", "F3", "F4"], res = { n: E.length, byCountry: {}, kia };
for (const k of FL) {
  const all = seasonStat(E, k), r = rates(E, k), sub = {};
  for (const c of ["korea", "us"]) { const L = E.filter((e) => e.c === c); sub[c] = Object.assign(seasonStat(L, k), rates(L, k), { h1: seasonStat(L.filter((e) => e.d < HALF[c]), k).diff, h2: seasonStat(L.filter((e) => e.d >= HALF[c]), k).diff }); }
  const h1 = seasonStat(E.filter((e) => e.d < HALF[e.c]), k), h2 = seasonStat(E.filter((e) => e.d >= HALF[e.c]), k);
  const pass = all.diff <= -0.01 && all.t != null && all.t <= -2 && h1.diff < 0 && h2.diff < 0 && sub.korea.diff < 0 && sub.us.diff < 0 && r.ratio >= 1.3;
  const passC = {}; for (const c of ["korea", "us"]) { const o = sub[c === "korea" ? "us" : "korea"]; passC[c] = sub[c].diff <= -0.01 && sub[c].t != null && sub[c].t <= -2 && sub[c].h1 < 0 && sub[c].h2 < 0 && sub[c].ratio >= 1.3 && !(o.t != null && o.t >= 2); }
  res[k] = { all, h1: h1.diff, h2: h2.diff, rates: r, country: sub, pass, passCountry: passC };
}
res.byCountry = { korea: E.filter((e) => e.c === "korea").length, us: E.filter((e) => e.c === "us").length };
res.coverage = { f1: E.filter((e) => e.f1d != null).length / E.length, f4: E.filter((e) => e.f4n > 0).length / E.length };
res.cntTable = [0, 1, 2, 3, 4].map((k) => { const a = E.filter((e) => e.cnt === k); return { k, n: a.length, ar: mean(a.map((e) => e.ar)), shock: a.length ? a.filter((e) => e.ar <= -0.05).length / a.length : null, big: a.length ? a.filter((e) => e.ar <= -0.10).length / a.length : null, jump: a.length ? a.filter((e) => e.ar >= 0.10).length / a.length : null, kr: a.filter((e) => e.c === "korea").length }; });
const OUT = arg("out"); if (OUT) fs.writeFileSync(OUT, JSON.stringify(res, null, 1));
const p = (v) => (v == null ? "–" : (v * 100).toFixed(2));
console.log("발표 " + E.length + "건(한국 " + res.byCountry.korea + " · 미국 " + res.byCountry.us + ") · F1 자료 " + p(res.coverage.f1) + "% · F4 자료 " + p(res.coverage.f4) + "%");
for (const k of FL) {
  const x = res[k];
  console.log("\n" + k + ": 시즌 평균 차이 " + p(x.all.diff) + "%p (t " + (x.all.t == null ? "–" : x.all.t.toFixed(2)) + ", " + x.all.seasons + "시즌) 전반 " + p(x.h1) + " 후반 " + p(x.h2) +
    " | 신호 비중 " + p(x.rates.share) + "% · 충격 " + p(x.rates.shockY) + "% vs " + p(x.rates.shockN) + "% (" + (x.rates.ratio || 0).toFixed(2) + "배) · 큰 충격 " + p(x.rates.bigY) + "% vs " + p(x.rates.bigN) +
    "% · 반응 " + p(x.rates.arY) + " vs " + p(x.rates.arN) + " · 뒤 21일 " + p(x.rates.postY) + " vs " + p(x.rates.postN) + " → 통과 " + x.pass + " " + JSON.stringify(x.passCountry));
  for (const c of ["korea", "us"]) { const y = x.country[c]; console.log("   " + c + ": 차이 " + p(y.diff) + " (t " + (y.t == null ? "–" : y.t.toFixed(2)) + ") 전반 " + p(y.h1) + " 후반 " + p(y.h2) + " · 신호 " + y.nFlag + "건 · 충격 " + p(y.shockY) + "% vs " + p(y.shockN) + "%"); }
}
console.log("\n신호 개수별: " + res.cntTable.map((x) => x.k + "개 " + x.n + "건(한국 " + x.kr + ") 반응 " + p(x.ar) + " 충격 " + p(x.shock) + "% · −10% 이하 " + p(x.big) + "% · +10% 이상 " + p(x.jump) + "%").join("\n  "));
console.log("기아 10/30: " + JSON.stringify(kia));
