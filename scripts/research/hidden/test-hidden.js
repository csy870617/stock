#!/usr/bin/env node
// 히든(rising) 숫자 기준의 과거 성적 — 사전 등록 PREREG.md 그대로 판정한다(2026-10-30).
// 사용: node test-hidden.js <theme 캐시> [--out 결과.json] [--nominal]
//   캐시: scripts/research/theme 의 fetch-us/kr.js 결과 + fetch-extra.js(한국 현금·지수)
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("../theme/lib");
const LF = require("../../lib-factors");
const SH = require("../../screen-hidden");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const argVal = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const OUT = argVal("out");
const log = (...a) => console.error(new Date().toISOString().slice(11, 19), ...a);

// ── 기준: screen-hidden.js 와 같은 값(어긋나면 멈춘다) ──
const C = { krMcap: [3000e8, 8e12], usMcap: [0.5e9, 15e9], growth: 0.20, growthFloor: 0.10, roicAvg: 0.15, roicLast: 0.12, peg: 1.5, dilution: 0.03, tax: 0.22, histFloor: 0.05 };
const RELAX = Object.assign({}, C, { krMcap: [3000e8, 12e12], usMcap: [0.5e9, 22.5e9], growth: 0.15, growthFloor: 0.05, histFloor: 0, roicAvg: 0.12, roicLast: 0.10, peg: 2.0, dilution: 0.05 });
for (const k of Object.keys(C)) if (JSON.stringify(C[k]) !== JSON.stringify(SH.CRITERIA[k])) throw new Error("screen-hidden.js 기준과 다름: " + k);
const US_EX_SECTOR = /^Finance$/;
const US_EX_IND = /(Real Estate|REIT|Oil and Gas Field|Oil & Gas|Oilfield|Blank Check|Oil & Gas Production|Integrated oil|Precious Metals|Metal Mining|Mining & Quarrying|Coal Mining|Steel\/Iron Ore|Marine Transportation|Oil Refining|Natural Gas Distribution|Banks|Savings Institutions|Finance)/i;
const US_EX_NAME = /(Acquisition Corp|Warrant|Rights?\b|Units?\b|Preferred|Depositary Shares? Representing|ETF|Fund\b|Trust\b|Notes due|% Senior)/i;
const KR_FIN_NAME = /(금융|은행|보험|증권|화재|생명|카드|캐피탈|투자|리츠|REIT|홀딩스|지주|스팩|SPAC)/i;
const KR_EX_WICS = /(은행|증권|보험|다각화된금융|기타금융|부동산|철강|비철금속|석유와가스|해운사|복합기업|창업투자)/;

const ge = (a, b) => a != null && isFinite(a) && a >= b;
const cagr = (a, b, yrs) => (a != null && b != null && a > 0 && b > 0 && yrs > 0 ? Math.pow(b / a, 1 / yrs) - 1 : null);
const avg = (a) => { const x = a.filter((v) => v != null && isFinite(v)); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const mean = (a) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : null);
const addM = (ym, k) => { let [y, m] = ym.split("-").map(Number); m += k; while (m > 12) { m -= 12; y++; } while (m < 1) { m += 12; y--; } return y + "-" + String(m).padStart(2, "0"); };
const r2 = (v, d) => (v == null || !isFinite(v) ? null : +v.toFixed(d == null ? 2 : d));

// ── 판정(엄격·완화) — screen-hidden.js judgeUS/judgeKR 와 같은 순서·식 ──
function judge(c, m, T, band) {
  const why = [];
  if (!(m.mcap >= band[0] && m.mcap <= band[1])) why.push("cap");
  if (m.excl) why.push("excl");
  if (!m.opPos3) why.push("op3");
  if (!m.npPos) why.push("ni");
  if (c === "us" && m.capexMissing && !(m.fcfLast < 0)) why.push("fcf?");
  else if (!(m.fcfLast > 0 && m.fcf3 > 0)) why.push("fcf");
  if (m.netCash != null && m.netCash < 0 && -m.netCash > Math.max(m.ocfLast || 0, 0)) why.push("debt");
  const gOK = c === "us"
    ? (ge(m.g3, T.growth) && ge(m.gLast, T.growthFloor)) || (ge(m.gLast, T.growth) && ge(m.g3, T.growthFloor))
    : ge(m.g3, T.growth) && ge(m.gLast, T.growthFloor);   // 한국: 과거 컨센서스가 없어 스크린의 '추정 없음' 식
  if (!gOK) why.push("growth");
  if (!(ge(m.roicAvg, T.roicAvg) && ge(m.roicLast, T.roicLast))) why.push("roic");
  if (!(m.peg != null && m.peg <= T.peg)) why.push("peg");
  if (m.dil != null && m.dil > T.dilution) why.push("dil");
  return why;
}
const SAFETY = new Set(["excl", "op3", "ni", "fcf?", "fcf", "debt"]);

// ════════ 미국 — panel-us.js 와 같은 적재(CIK 당 1종목, 분할 정규화) ════════
function loadUS() {
  const US = path.join(DIR, "us");
  const YEARS = []; for (let y = 2009; y <= 2025; y++) YEARS.push(y);
  const F = {};
  for (const f of fs.readdirSync(path.join(US, "frames"))) { const [c, p] = f.replace(/\.json$/, "").split("__"); F[c + "|" + p] = L.readJson(path.join(US, "frames", f), {}); }
  const fv = (c, p, cik) => { const m = F[c + "|" + p]; const x = m && m[cik]; return x ? x[0] : null; };
  const fe = (c, p, cik) => { const m = F[c + "|" + p]; const x = m && m[cik]; return x ? x[1] : null; };
  const fa = (c, p, cik) => { const m = F[c + "|" + p]; const x = m && m[cik]; return x ? x[2] || null : null; };
  const splitAfterPx = (px, date) => px.splits.filter((x) => x[0] > date).reduce((p, x) => p * x[1], 1);
  const shNormFor = (px) => (val, accn, end) => {
    const yf = accn ? 2000 + Number(String(accn).split("-")[1]) : null;
    let F0 = end || null;
    if (yf && end) { const m = ((Number(end.slice(5, 7)) + 1) % 12) + 1; F0 = yf + "-" + String(m).padStart(2, "0") + "-15"; }
    return F0 ? val * splitAfterPx(px, F0) : val;
  };
  const uni = L.readJson(path.join(US, "universe.json"), []);
  const cikMap = L.readJson(path.join(US, "cik.json"), {});
  const names = L.readJson(path.join(US, "names.json"), {});
  const normName = (n) => String(n || "").toLowerCase().replace(/common stock|ordinary shares|class [a-z]\b|american depositary shares?.*$/g, " ")
    .replace(/\b(inc|corp|corporation|co|company|ltd|limited|plc|holdings?|group|the|n\.?v|s\.?a)\b\.?/g, " ").replace(/[^a-z0-9]/g, "");
  const byName = {}; Object.entries(names).forEach(([c, n]) => { const k = normName(n); if (k) (byName[k] = byName[k] || []).push(Number(c)); });
  const hasYear = (cik, y) => ["NetIncomeLoss", "ProfitLoss", "Revenues", "RevenueFromContractWithCustomerExcludingAssessedTax"].some((c) => fv(c, "CY" + y, cik) != null);
  const yearsWith = (cik) => YEARS.filter((y) => hasYear(cik, y)).length;
  const recent = (cik) => [2023, 2024, 2025].some((y) => hasYear(cik, y));
  for (const u of uni) {
    const c0 = cikMap[u.t]; if (!c0 || yearsWith(c0) >= 3) continue;
    const alt = (byName[normName(u.name)] || []).filter((c) => c !== c0).filter(recent).map((c) => [c, yearsWith(c)]).filter((x) => x[1] >= 5).sort((a, b) => b[1] - a[1])[0];
    if (alt) cikMap[u.t] = alt[0];
  }
  const vol12 = (px) => px.v.slice(-12).reduce((s, x) => s + x, 0);
  const byCik = {};
  for (const u of uni) {
    const c = cikMap[u.t]; if (!c) continue;
    const f = path.join(US, "px", u.t + ".json"); if (!fs.existsSync(f)) continue;
    const px = L.readJson(f, null);
    if (!px || px.none || !px.d || px.d.length < 24) continue;
    const b = byCik[c];
    if (!b || px.d.length > b.px.d.length || (px.d.length === b.px.d.length && vol12(px) > vol12(b.px))) byCik[c] = { u, px };
  }
  const availYM = (end) => { if (!end) return null; const d = new Date(end + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + 150); return d.toISOString().slice(0, 7); };
  const stocks = Object.keys(byCik).map((c) => {
    const { u, px } = byCik[c];
    const fu = LF.usFundamentals(Number(c), YEARS, fv, fe, { fa, shNorm: shNormFor(px) });
    const ys = Object.keys(fu).map(Number).sort((a, b) => a - b);
    const avail = {}; ys.forEach((y) => { avail[y] = availYM(fu[y].end) || (y + 1) + "-06"; });
    return { t: u.t, name: u.name, excl: US_EX_SECTOR.test(u.sector || "") || US_EX_IND.test(u.industry || "") || US_EX_NAME.test(u.name || ""),
      sector: u.sector, fu, ys, avail, px, idx: new Map(px.d.map((d, i) => [d, i])) };
  }).filter((s) => s.ys.length >= 2);
  log("미국 종목 " + stocks.length);
  return stocks;
}
function metricsUS(s, y, mcap) {
  const fu = s.fu, f = fu[y], f1 = fu[y - 1], f2 = fu[y - 2], f3 = fu[y - 3];
  const m = { mcap, excl: s.excl };
  m.g3 = f3 ? cagr(f3.rev, f.rev, 3) : null;
  m.gLast = f1 && f1.rev > 0 && f.rev != null ? f.rev / f1.rev - 1 : null;
  m.opPos3 = [f, f1, f2].every((g) => g && g.op != null && g.op > 0);
  m.npPos = f.ni != null && f.ni > 0;
  const fcfOf = (g) => (g && g.ocf != null && g.capex != null ? g.ocf - g.capex : null);
  m.capexMissing = [f2, f1, f].some((g) => !g || g.capex == null);
  m.fcfLast = fcfOf(f);
  m.fcf3 = [f2, f1, f].reduce((acc, g) => { const v = fcfOf(g); return v == null || acc == null ? null : acc + v; }, 0);
  m.ocfLast = f.ocf;
  m.netCash = f.cash != null ? f.cash + (f.sti || 0) - (f.debt || 0) : null;
  const roicOf = (g) => { if (!g || g.op == null || g.eq == null) return null; const ic = g.eq + (g.debt || 0) - (g.cash || 0) - (g.sti || 0); return ic > 0 ? Math.min(1, g.op * (1 - C.tax) / ic) : 1; };
  const ro = [f2, f1, f].map(roicOf);
  m.roicAvg = avg(ro); m.roicLast = ro[2];
  const eps = (g) => (g && g.ni != null && g.sh > 0 ? g.ni / g.sh : null);
  const per = f.ni > 0 ? mcap / f.ni : null;
  const epsG = f3 ? cagr(eps(f3), eps(f), 3) : null;
  m.peg = per != null && epsG > 0 ? per / (epsG * 100) : null;
  const shr = f2 && f2.sh > 0 && f.sh > 0 ? f.sh / f2.sh : null;
  const split = shr != null && (shr >= 1.8 || shr <= 0.55);
  m.dil = shr != null && !split ? Math.sqrt(shr) - 1 : null;
  m.peerOK = f.rev != null && f.ni != null;
  return m;
}

// ════════ 한국 — 기업현황(주요재무) + 재무상태표 현금 ════════
function loadKR() {
  const KR = path.join(DIR, "kr");
  const uni = L.readJson(path.join(KR, "universe.json"), []);
  const stocks = [];
  for (const u of uni) {
    const w = L.readJson(path.join(KR, "wise", u.t + ".json"), null);
    const px = L.readJson(path.join(KR, "px", u.t + ".json"), null);
    if (!w || w.none || !w.cols || !px || px.none || !px.d || px.d.length < 24) continue;
    const g = (names) => { for (const n of names) if (w.rows[n]) return w.rows[n]; return w.cols.map(() => null); };
    const rev = g(["매출액"]), op = g(["영업이익", "영업이익(발표기준)"]), np = g(["당기순이익(지배)", "당기순이익"]), eq = g(["자본총계"]), ibd = g(["이자발생부채"]);
    const ocf = g(["영업활동현금흐름"]), fcf = g(["FCF"]), eps = g(["EPS(원)"]), sh = g(["발행주식수(보통주)"]);
    const cash = (L.readJson(path.join(KR, "cash", u.t + ".json"), {}) || {}).years || {};
    const fu = {};
    w.cols.forEach((c, i) => {
      if (c.est) return;
      const y = Number(c.title.slice(0, 4)); if (Number(c.title.slice(5, 7)) !== 12) return;
      const cy = cash[String(y)];
      fu[y] = { rev: rev[i], op: op[i], np: np[i], eq: eq[i], ibd: ibd[i], ocf: ocf[i], fcf: fcf[i], eps: eps[i], sh: sh[i],
        cash: cy && (cy.cash != null || cy.sti != null) ? (cy.cash || 0) + (cy.sti || 0) : null };
    });
    const ys = Object.keys(fu).map(Number).sort((a, b) => a - b);
    if (ys.length < 2) continue;
    stocks.push({ t: u.t, name: u.name, wics: w.wics, excl: KR_FIN_NAME.test(u.name || "") || KR_EX_WICS.test(w.wics || ""), fu, ys, px, idx: new Map(px.d.map((d, i) => [d, i])),
      hasCash: Object.keys(cash).length > 0 });
  }
  log("한국 종목 " + stocks.length + " (현금 자료 " + stocks.filter((s) => s.hasCash).length + ")");
  return stocks;
}
function metricsKR(s, y, mcap) {
  const fu = s.fu, f = fu[y], f1 = fu[y - 1], f2 = fu[y - 2];
  const span = fu[y - 3] ? 3 : 2;                     // FY2023 은 2021→2023 2년(PREREG)
  const fb = fu[y - span];
  const m = { mcap, excl: s.excl };
  m.g3 = fb ? cagr(fb.rev, f.rev, span) : null;
  m.gLast = f1 && f1.rev > 0 && f.rev != null ? f.rev / f1.rev - 1 : null;
  m.opPos3 = [f, f1, f2].every((g) => g && g.op != null && g.op > 0);
  m.npPos = f.np != null && f.np > 0;
  m.fcfLast = f.fcf;
  m.fcf3 = [f2, f1, f].reduce((acc, g) => (!g || g.fcf == null || acc == null ? null : acc + g.fcf), 0);
  m.ocfLast = f.ocf;
  m.netCash = f.cash != null ? f.cash - (f.ibd || 0) : null;   // 억 원
  const roicOf = (g) => { if (!g || g.op == null || g.eq == null) return null; const ic = g.eq + (g.ibd || 0) - (g.cash || 0); return ic > 0 ? Math.min(1, g.op * (1 - C.tax) / ic) : 1; };
  const ro = [f2, f1, f].map(roicOf);
  m.roicAvg = avg(ro); m.roicLast = ro[2];
  const per = f.np > 0 ? mcap / (f.np * 1e8) : null;
  const epsG = fb ? cagr(fb.eps, f.eps, span) : null;
  m.peg = per != null && epsG > 0 ? per / (epsG * 100) : null;
  const shr = f2 && f2.sh > 0 && f.sh > 0 ? f.sh / f2.sh : null;
  const split = shr != null && shr >= 1.8;
  m.dil = shr != null && !split ? Math.sqrt(shr) - 1 : null;
  m.peerOK = f.rev != null && f.np != null;
  return m;
}

// ════════ 월별 분류 ════════
function classify(c, stocks, months, idxPx, nominal) {
  const base = c === "us" ? C.usMcap : C.krMcap, baseR = c === "us" ? RELAX.usMcap : RELAX.krMcap;
  const iEnd = idxPx.d.indexOf("2026-09"), pEnd = idxPx.c[iEnd];
  const out = [];   // {ym, members:[{t, set flags, fwd}]}
  for (const ym of months) {
    const ii = idxPx.d.indexOf(ym); if (ii < 0) continue;
    const k = nominal ? 1 : idxPx.c[ii] / pEnd;
    const band = [base[0] * k, base[1] * k], bandR = [baseR[0] * k, baseR[1] * k];
    const rows = [];
    for (const s of stocks) {
      const i = s.idx.get(ym); if (i == null) continue;
      let y = null;
      if (c === "us") { for (const yy of s.ys) if (s.avail[yy] <= ym) y = yy; if (y == null || y < Number(ym.slice(0, 4)) - 2) continue; }
      else { for (const yy of s.ys) if ((yy + 1) + "-04" <= ym) y = yy; if (y == null || y < 2023) continue; }
      const f = s.fu[y]; if (!f || !(f.sh > 0)) continue;
      let mcap;
      if (c === "us") mcap = s.px.c[i] * f.sh;
      else mcap = s.px.c[i] * f.sh * s.px.splits.filter((x) => x[0] > y + "-12-31").reduce((p, x) => p * x[1], 1);
      if (!(mcap > 0)) continue;
      const m = c === "us" ? metricsUS(s, y, mcap) : metricsKR(s, y, mcap);
      const inBand = mcap >= band[0] && mcap <= band[1];
      const peer = inBand && !m.excl && m.peerOK;
      const why = judge(c, m, C, band);
      const whyR = judge(c, m, RELAX, bandR);
      const H = why.length === 0;
      const near = why.length === 1 && whyR.length === 0;
      if (!peer && !H && !near) continue;
      const safe = peer && !why.some((w) => SAFETY.has(w));
      const a = s.px.a;
      const fwd = (h) => { const j = s.idx.get(addM(ym, h)); return j != null ? a[j] / a[i] - 1 : null; };
      // 36개월 안 최고 배수, 2026-09 까지 최고 배수
      let max36 = null, maxAll = null;
      for (let h = 1; ; h++) { const j = s.idx.get(addM(ym, h)); if (addM(ym, h) > "2026-09") break; if (j == null) continue; const mult = a[j] / a[i]; if (h <= 36) max36 = Math.max(max36 || 0, mult); maxAll = Math.max(maxAll || 0, mult); }
      // 사후 분석용(판정에는 쓰지 않음): 스크린 점수 재료 — screen-hidden.js feat() 와 같은 항목
      const rev = s.fu[y].rev, fcfL = m.fcfLast;
      const sc = { g: Math.max(m.g3 ?? -1, m.gLast ?? -1), roic: m.roicAvg, pegInv: m.peg > 0 ? -m.peg : null,
        fcfM: fcfL != null && rev > 0 ? fcfL / rev : null, cashM: m.netCash != null ? (c === "us" ? m.netCash : m.netCash * 1e8) / mcap : null, small: -Math.log(mcap) };
      let jump = false; for (let h = 1; h <= 160; h++) { const j0 = s.idx.get(addM(ym, h - 1)), j1 = s.idx.get(addM(ym, h)); if (addM(ym, h) > "2026-09") break; if (j0 != null && j1 != null && a[j1] / a[j0] > 4) { jump = true; break; } }
      rows.push({ t: s.t, name: s.name, y, mcap, peer, safe, H, near, why, r1: fwd(1), r6: fwd(6), r12: fwd(12), r36: c === "us" ? fwd(36) : null, max36, maxAll, sc, jump });
    }
    out.push({ ym, rows });
  }
  return out;
}

// ════════ 통계 ════════
function nwT(xs, lag) {
  const n = xs.length; if (n < 6) return null;
  const m = mean(xs); const e = xs.map((x) => x - m);
  let s = e.reduce((p, v) => p + v * v, 0) / n;
  for (let l = 1; l <= Math.min(lag, n - 1); l++) { let c = 0; for (let t = l; t < n; t++) c += e[t] * e[t - l]; s += 2 * (1 - l / (lag + 1)) * c / n; }
  return s > 0 ? m / Math.sqrt(s / n) : null;
}
const setOf = (row, key) => (key === "H" ? row.H : key === "H+" ? row.H || row.near : key === "SAFE" ? row.safe : row.peer);
function selection(data, key, h, from, to) {
  const rk = "r" + h, ds = [];
  for (const { ym, rows } of data) {
    if (ym < from || ym > to) continue;
    const S = rows.filter((r) => setOf(r, key) && r[rk] != null), P = rows.filter((r) => r.peer && r[rk] != null);
    if (S.length < 5 || P.length < 20) continue;
    ds.push({ ym, d: mean(S.map((r) => r[rk])) - mean(P.map((r) => r[rk])), n: S.length });
  }
  const xs = ds.map((x) => x.d);
  return { months: xs.length, mean: xs.length ? r2(100 * mean(xs)) : null, t: r2(nwT(xs, h - 1)), avgN: xs.length ? r2(mean(ds.map((x) => x.n)), 1) : null };
}
function crash(data, key, from, to) {
  let n = 0, k = 0, np = 0, kp = 0;
  for (const { ym, rows } of data) {
    if (ym < from || ym > to) continue;
    rows.forEach((r) => { if (r.r12 == null) return; if (setOf(r, key)) { n++; if (r.r12 <= -0.3) k++; } if (r.peer) { np++; if (r.r12 <= -0.3) kp++; } });
  }
  return { set: n ? r2(100 * k / n, 1) : null, peer: np ? r2(100 * kp / np, 1) : null, n, np };
}
function portfolio(data, keys, idxMap, from, to, verdictKey) {
  // 같은 달끼리: 판정 집합이 5종목 이상(1개월 수익 있음)인 달만
  const series = {}; keys.concat(Object.keys(idxMap)).forEach((k) => (series[k] = []));
  const months = [];
  for (const { ym, rows } of data) {
    if (ym < from || ym > to) continue;
    const V = rows.filter((r) => setOf(r, verdictKey) && r.r1 != null);
    if (V.length < 5) continue;
    const iret = {}; let ok = true;
    for (const [k, px] of Object.entries(idxMap)) { const i = px.d.indexOf(ym), j = px.d.indexOf(addM(ym, 1)); if (i < 0 || j < 0) { ok = false; break; } iret[k] = px.a[j] / px.a[i] - 1; }
    if (!ok) continue;
    const rets = {};
    for (const k of keys) { const S = rows.filter((r) => setOf(r, k) && r.r1 != null); if (!S.length) { ok = false; break; } rets[k] = mean(S.map((r) => r.r1)); }
    if (!ok) continue;
    months.push(ym); keys.forEach((k) => series[k].push(rets[k])); Object.keys(idxMap).forEach((k) => series[k].push(iret[k]));
  }
  const stat = (r, mkt) => {
    if (!r.length) return null;
    let v = 1, peak = 1, mdd = 0; r.forEach((x) => { v *= 1 + x; peak = Math.max(peak, v); mdd = Math.min(mdd, v / peak - 1); });
    const mu = mean(r), sd = Math.sqrt(r.reduce((p, x) => p + (x - mu) ** 2, 0) / (r.length - 1));
    const o = { cagr: r2(100 * (Math.pow(v, 12 / r.length) - 1)), vol: r2(100 * sd * Math.sqrt(12)), sharpe: r2(mu * 12 / (sd * Math.sqrt(12))), mdd: r2(100 * mdd), total: r2(100 * (v - 1)) };
    if (mkt) {
      const mm = mean(mkt), cov = r.reduce((p, x, i) => p + (x - mu) * (mkt[i] - mm), 0) / (r.length - 1), vm = mkt.reduce((p, x) => p + (x - mm) ** 2, 0) / (r.length - 1);
      o.beta = r2(cov / vm); o.alpha = r2(100 * 12 * (mu - (cov / vm) * mm));
    }
    return o;
  };
  const mk = Object.keys(idxMap)[0];
  const res = { months: months.length, from: months[0], to: months[months.length - 1] };
  for (const k of keys.concat(Object.keys(idxMap))) res[k] = stat(series[k], k === mk ? null : series[mk]);
  // 해마다(달력 연도 — 그 해 12개월이 모두 있는 해만) 판정 집합이 지수를 이긴 비율
  const byYear = {};
  months.forEach((ym, i) => { const y = ym.slice(0, 4); (byYear[y] = byYear[y] || []).push(i); });
  const years = Object.entries(byYear).filter(([, ix]) => ix.length === 12).map(([y, ix]) => {
    const g = (k) => ix.reduce((p, i) => p * (1 + series[k][i]), 1) - 1;
    return { y, set: r2(100 * g(verdictKey)), mkt: r2(100 * g(mk)), peer: r2(100 * g("PEER")) };
  });
  res.years = years; res.yearsBeat = years.length ? years.filter((x) => x.set > x.mkt).length + "/" + years.length : null;
  return res;
}
function promise(data, key) {
  const cohorts = [];
  for (let yr = 2013; yr <= 2023; yr++) {
    const d = data.find((x) => x.ym === yr + "-06"); if (!d) continue;
    const S = d.rows.filter((r) => setOf(r, key)), P = d.rows.filter((r) => r.peer);
    const rate = (A, f) => { const v = A.filter((r) => f(r) != null); return v.length ? { k: v.filter((r) => f(r)).length, n: v.length } : { k: 0, n: 0 }; };
    const m = {
      x3at36: (r) => (r.r36 == null ? null : r.r36 >= 2), max3in36: (r) => (r.max36 == null || r.r36 == null ? null : r.max36 >= 3),
      loss50at36: (r) => (r.r36 == null ? null : r.r36 <= -0.5), crash12: (r) => (r.r12 == null ? null : r.r12 <= -0.3),
      x10all: (r) => (yr <= 2016 && r.maxAll != null ? r.maxAll >= 10 : null),
    };
    const c = { ym: d.ym, n: S.length, nPeer: P.length, names: S.map((r) => r.t) };
    for (const [k, f] of Object.entries(m)) { c[k] = rate(S, f); c[k + "Peer"] = rate(P, f); }
    c.med36 = (() => { const v = S.map((r) => r.r36).filter((x) => x != null).sort((a, b) => a - b); return v.length ? r2(100 * v[Math.floor(v.length / 2)]) : null; })();
    c.med36Peer = (() => { const v = P.map((r) => r.r36).filter((x) => x != null).sort((a, b) => a - b); return v.length ? r2(100 * v[Math.floor(v.length / 2)]) : null; })();
    cohorts.push(c);
  }
  const pool = {};
  for (const k of ["x3at36", "max3in36", "loss50at36", "crash12", "x10all"]) {
    const s = cohorts.reduce((p, c) => ({ k: p.k + c[k].k, n: p.n + c[k].n }), { k: 0, n: 0 });
    const q = cohorts.reduce((p, c) => ({ k: p.k + c[k + "Peer"].k, n: p.n + c[k + "Peer"].n }), { k: 0, n: 0 });
    const better = cohorts.filter((c) => c[k].n && c[k + "Peer"].n).map((c) => c[k].k / c[k].n - c[k + "Peer"].k / c[k + "Peer"].n);
    pool[k] = { set: s.n ? r2(100 * s.k / s.n, 1) : null, nSet: s.n, peer: q.n ? r2(100 * q.k / q.n, 1) : null, nPeer: q.n,
      cohortsSetHigher: better.filter((x) => x > 0).length + "/" + better.length };
  }
  return { cohorts: cohorts.map((c) => ({ ym: c.ym, n: c.n, nPeer: c.nPeer, med36: c.med36, med36Peer: c.med36Peer, x3at36: c.x3at36, x3at36Peer: c.x3at36Peer, loss50at36: c.loss50at36, loss50at36Peer: c.loss50at36Peer, names: c.names.slice(0, 40) })), pooled: pool };
}

// ════════ 실행 ════════
function run(c, nominal) {
  const stocks = c === "us" ? US_STOCKS : KR_STOCKS;
  const idxPx = L.readJson(path.join(DIR, "idx", (c === "us" ? "SPY" : "069500.KS") + ".json"), null);
  const months = []; for (let k = c === "us" ? "2013-06" : "2024-04"; k <= "2026-09"; k = addM(k, 1)) months.push(k);
  const data = classify(c, stocks, months, idxPx, nominal);
  const cnt = (key) => data.map((d) => d.rows.filter((r) => setOf(r, key)).length);
  const hN = cnt("H"), hpN = cnt("H+"), pN = cnt("PEER");
  const share5 = hN.filter((n) => n >= 5).length / hN.length;
  const verdictKey = share5 >= 0.8 ? "H" : "H+";
  const half = c === "us" ? ["2013-06", "2019-07", "2019-08", "2026-09"] : ["2024-04", "2025-03", "2025-04", "2026-09"];
  const sel = {};
  for (const key of ["H", "H+", "SAFE"]) for (const h of c === "us" ? [1, 6, 12, 36] : [1, 6, 12]) {
    sel[key + "|" + h] = { all: selection(data, key, h, half[0], half[3]), first: selection(data, key, h, half[0], half[1]), second: selection(data, key, h, half[2], half[3]) };
  }
  const idxMap = c === "us"
    ? { SPY: L.readJson(path.join(DIR, "idx", "SPY.json")), IJR: L.readJson(path.join(DIR, "idx", "IJR.json")) }
    : { KODEX200: L.readJson(path.join(DIR, "idx", "069500.KS.json")) };
  const keys = ["H", "H+", "SAFE", "PEER"];
  const port = { all: portfolio(data, keys, idxMap, half[0], half[3], verdictKey), first: portfolio(data, keys, idxMap, half[0], half[1], verdictKey), second: portfolio(data, keys, idxMap, half[2], half[3], verdictKey) };
  const cr = { all: crash(data, verdictKey, half[0], half[3]), first: crash(data, verdictKey, half[0], half[1]), second: crash(data, verdictKey, half[2], half[3]) };
  const prom = c === "us" ? promise(data, verdictKey) : null;
  // 지금(마지막 달) 판정 집합 — 지금 스크린과 비교용
  const last = data[data.length - 1];
  const now = last ? last.rows.filter((r) => setOf(r, verdictKey)).map((r) => r.t + (r.H ? "" : "(근접:" + r.why.join("/") + ")")) : [];
  return { country: c, nominal: !!nominal, months: data.length, verdictKey, share5: r2(100 * share5, 1),
    counts: { H: { min: Math.min(...hN), med: hN.slice().sort((a, b) => a - b)[Math.floor(hN.length / 2)], max: Math.max(...hN) },
      "H+": { min: Math.min(...hpN), med: hpN.slice().sort((a, b) => a - b)[Math.floor(hpN.length / 2)], max: Math.max(...hpN) },
      PEER: { min: Math.min(...pN), med: pN.slice().sort((a, b) => a - b)[Math.floor(pN.length / 2)], max: Math.max(...pN) } },
    selection: sel, portfolio: port, crash: cr, promise: prom, lastMonth: last && last.ym, now, _data: data };
}

const ONLY = argVal("only");
const US_STOCKS = ONLY === "korea" ? [] : loadUS();
const KR_STOCKS = ONLY === "us" ? [] : loadKR();
// 점검용: --check YYYY-MM → 그 달 H·근접 종목과 PEER 수만 보고 끝낸다(판정 계산 없음)
if (argVal("check")) {
  const ym = argVal("check");
  for (const c of ONLY ? [ONLY] : ["us", "korea"]) {
    const idxPx = L.readJson(path.join(DIR, "idx", (c === "us" ? "SPY" : "069500.KS") + ".json"), null);
    const d = classify(c, c === "us" ? US_STOCKS : KR_STOCKS, [ym], idxPx, false)[0];
    const H = d.rows.filter((r) => r.H), N = d.rows.filter((r) => r.near);
    console.log(c, ym, "PEER", d.rows.filter((r) => r.peer).length, "SAFE", d.rows.filter((r) => r.safe).length, "H", H.length, "near", N.length);
    console.log(" H:", H.map((r) => r.t + "(" + (r.mcap / (c === "us" ? 1e9 : 1e12)).toFixed(1) + ")").join(" "));
    console.log(" near:", N.map((r) => r.t + ":" + r.why.join("/")).join(" "));
    const fails = {}; d.rows.filter((r) => r.peer).forEach((r) => r.why.forEach((w) => { fails[w] = (fails[w] || 0) + 1; }));
    console.log(" PEER 탈락 사유:", JSON.stringify(fails));
  }
  process.exit(0);
}
const res = ONLY === "us" ? { us: run("us", false), usNominal: run("us", true) }
  : ONLY === "korea" ? { kr: run("korea", false), krNominal: run("korea", true) }
  : { us: run("us", false), usNominal: run("us", true), kr: run("korea", false), krNominal: run("korea", true) };

// ── 판정(사전 고정) ──
function verdict() {
  const u = res.us, k = res.kr, vk = u.verdictKey;
  const s12 = u.selection[vk + "|12"];
  const A = s12.first.mean > 0 && s12.second.mean > 0 && s12.all.t >= 2;
  const P = u.portfolio, V = (p) => p[vk], M = (p) => p.SPY;
  const B = V(P.all).cagr > M(P.all).cagr && V(P.all).sharpe > M(P.all).sharpe && V(P.first).cagr > M(P.first).cagr && V(P.second).cagr > M(P.second).cagr;
  const Cc = u.crash.first.set <= u.crash.first.peer && u.crash.second.set <= u.crash.second.peer;
  const kSel = k.selection[k.verdictKey + "|12"].all.months >= 12 ? k.selection[k.verdictKey + "|12"].all : k.selection[k.verdictKey + "|6"].all;
  const krOK = kSel.t == null || kSel.t > -2;
  let concl;
  if (!(s12.all.mean > 0)) concl = "무효";
  else if (A && B && Cc && krOK) concl = "유효";
  else if (A && Cc && !B) concl = "선별만 유효";
  else if (!A) concl = "약함";
  else concl = "기타(A·C 중 일부만)";
  return { verdictSet: vk, A, B, C: Cc, krNotOpposite: krOK, krSel: kSel, conclusion: concl };
}
res.verdict = ONLY ? null : verdict();

const strip = (r) => { const o = Object.assign({}, r); delete o._data; return o; };
const outObj = { builtAt: new Date().toISOString(), verdict: res.verdict };
for (const k of ["us", "usNominal", "kr", "krNominal"]) if (res[k]) outObj[k] = strip(res[k]);
if (OUT) fs.writeFileSync(OUT, JSON.stringify(outObj, null, 1));
console.log(JSON.stringify({ verdict: res.verdict, us: res.us && { verdictKey: res.us.verdictKey, share5: res.us.share5, counts: res.us.counts }, kr: res.kr && { verdictKey: res.kr.verdictKey, share5: res.kr.share5, counts: res.kr.counts } }, null, 1));
module.exports = { res, selection, portfolio, setOf, mean, nwT, addM };
