#!/usr/bin/env node
// 추천 성과 사전 계산 → data/perf.json (앱 '성과' 탭이 그대로 그린다, LLM 토큰 0)
//
// 무엇을: data/history.js 스냅샷으로 보유 기준 성적(편출 종목 포함 — lib-perf.js)을 묶음마다(정식 전체·5주제·티어·관심·보유)
//   전체·최근 1/3/6/12개월 창으로 계산하고, 차트용 누적 곡선, 종목별(지금 편성·최근 90일 편출) 성적, 교체 성과(같은 날·같은 주제의
//   편입 ⇄ 편출 묶음을 교체일 종가부터 지수 대비로 비교 — swap-outcome.js 와 같은 기준), 3개월 검증(data/shadow.json 의 추천 vs 그림자)을 쓴다.
// 왜 미리 계산하나: 편출 종목의 마지막 하루·편출 후 시세는 스냅샷에 없어 야후 종가가 필요하고, 앱이 매번 2년 시세를 받아
//   계산하던 기간별 화면(지금 종목의 과거 주가 — 추천 성적이 아님)을 없애 성과 탭을 가볍게 한다(2026-10-23 사용자 요청 '성과 화면 개선').
//
// 사용법: node scripts/perf-track.js            # 야후로 편출일 종가·편출 후 시세·교체 성과를 받아 계산
//         node scripts/perf-track.js --offline  # 네트워크 없이(편출일 종가는 이전 perf.json 캐시만) 계산
"use strict";
const fs = require("fs");
const path = require("path");
const LP = require("./lib-perf");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const OUT = path.join(DATA, "perf.json");
const OFFLINE = process.argv.includes("--offline");
const FORMAL = ["core", "growth", "value", "dividend", "rising"];
// picks = 홈 'Top Pick'(그날 고른 나라별 3종목 — 스냅샷 picks, 2026-07-31~): 가장 눈에 띄는 추천이라 같은 방식으로 성적을 잰다
const GROUPS = ["all"].concat(FORMAL, ["tier:1", "tier:2", "tier:3", "picks", "watch", "hold"]);
const REMOVED_DAYS = 90;   // 편출 종목 목록에 남기는 기간(일)
const SWAP_DAYS = 365;     // 교체 성과를 재는 기간(일)
const AFTER = 20;          // 교체 뒤 비교 시점(거래일)
const CONC = 6;
const COUNTRIES = ["korea", "us"];
const IDX_SYM = { korea: "^KS11", us: "^GSPC" };

function load(file, key) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  const w = {};
  try { new Function("window", fs.readFileSync(p, "utf8"))(w); } catch (_e) { return null; }
  return w[key] || null;
}
function readJson(file) {
  try { return JSON.parse(fs.readFileSync(path.join(DATA, file), "utf8")); } catch (_e) { return null; }
}
const H = load("history.js", "STOCK_HISTORY") || [];
const D = load("recommendations.js", "STOCK_DATA") || {};
const SH = readJson("shadow.json");
const FR = readJson("rules-freeze.json");
const PREV = readJson("perf.json");
const dayDiff = (a, b) => Math.round((Date.parse(a) - Date.parse(b)) / 86400000);
const r2 = LP.r2, r4 = (v) => (v == null || !isFinite(v) ? null : Math.round(v * 1e4) / 1e4);

// 야후 일봉 종가 — {날짜: 종가}. maxD 보다 새 봉(진행 중인 장)은 버린다
async function chart(sym, range, maxD) {
  try {
    const r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=" + range,
      { headers: { "User-Agent": "Mozilla/5.0" } });
    const j = await r.json();
    const res = j.chart && j.chart.result && j.chart.result[0];
    if (!res || !res.timestamp) return null;
    const off = res.meta.gmtoffset || 0, cl = res.indicators.quote[0].close, m = {};
    res.timestamp.forEach((t, i) => {
      const d = new Date((t + off) * 1000).toISOString().slice(0, 10);
      if (cl[i] != null && !(maxD && d > maxD)) m[d] = cl[i];
    });
    return Object.keys(m).length > 5 ? m : null;
  } catch (_e) { return null; }
}
const marketOf = {};
COUNTRIES.forEach((c) => (D[c] || []).forEach((s) => { marketOf[c + ":" + s.ticker] = s.market; }));
function symsOf(c, t) {
  if (c === "us") return [String(t).replace(".", "-")];
  return marketOf[c + ":" + t] === "KOSDAQ" ? [t + ".KQ", t + ".KS"] : [t + ".KS", t + ".KQ"];
}
const sortedKeys = (m) => Object.keys(m).sort();
function closeAt(m, d) { if (!m) return null; const ks = sortedKeys(m).filter((x) => x <= d); return ks.length ? m[ks[ks.length - 1]] : null; }
function lastClose(m) { if (!m) return null; const ks = sortedKeys(m); return ks.length ? { d: ks[ks.length - 1], p: m[ks[ks.length - 1]] } : null; }
// 지수 거래일 기준 n 번째 뒤 날짜
function nthAfter(idx, d, n) { if (!idx) return null; const ks = sortedKeys(idx).filter((x) => x > d); return ks.length >= n ? ks[n - 1] : null; }

async function main() {
  if (H.length < 2) { console.log("perf-track: 스냅샷 부족 — 건너뜀"); return; }
  const last = H[H.length - 1], base = H[0].date;
  const cache = Object.assign({}, (PREV && PREV.cache) || {});

  // ── 1. 편출(국가 단위 — 기록일 i-1 에 있다가 i 에 없는 종목)·교체(같은 날·같은 주제의 편입 ⇄ 편출) 이벤트 ──
  const exits = [], swaps = [];
  for (let i = 1; i < H.length; i++) {
    const a = H[i - 1], b = H[i];
    COUNTRIES.forEach((c) => {
      const A = {}, B = {};
      (a.stocks || []).forEach((e) => { if (e.c === c) A[e.t] = e; });
      (b.stocks || []).forEach((e) => { if (e.c === c) B[e.t] = e; });
      Object.keys(A).forEach((t) => { if (!B[t]) exits.push({ c, t, i, d: b.date, e: A[t] }); });
      FORMAL.forEach((th) => {
        // 다른 주제에서 옮겨 온·옮겨 간 종목은 교체가 아니라 이동이다
        const add = Object.keys(B).filter((t) => B[t].th === th && !A[t]);
        const rem = Object.keys(A).filter((t) => A[t].th === th && !B[t]);
        if (add.length && rem.length) swaps.push({ c, i, d: b.date, pd: LP.pdOf(b, c), th, add: add.map((t) => B[t]), rem: rem.map((t) => A[t]) });
      });
    });
  }
  const recentSwaps = swaps.filter((s) => dayDiff(last.date, s.d) <= SWAP_DAYS);
  const recentExits = exits.filter((x) => dayDiff(last.date, x.d) <= REMOVED_DAYS);

  // ── 2. 야후 일봉 — 편출 종목(편출일 종가 보충·편출 후 성적)과 교체 종목, 지수 ──
  const maxD = {}; COUNTRIES.forEach((c) => { maxD[c] = LP.pdOf(last, c); });
  const need = {};
  exits.forEach((x) => { if (!cache[x.c + ":" + x.t + "@" + x.d]) need[x.c + ":" + x.t] = 1; });
  recentExits.forEach((x) => { need[x.c + ":" + x.t] = 1; });
  recentSwaps.forEach((s) => s.add.concat(s.rem).forEach((e) => { need[s.c + ":" + e.t] = 1; }));
  const earliest = [].concat(exits.map((x) => x.d), recentSwaps.map((s) => s.d)).sort()[0] || last.date;
  const range = dayDiff(last.date, earliest) > 330 ? "2y" : dayDiff(last.date, earliest) > 160 ? "1y" : "6mo";
  const charts = {}, idx = {};
  if (!OFFLINE) {
    for (const c of COUNTRIES) idx[c] = await chart(IDX_SYM[c], range, maxD[c]);
    const keys = Object.keys(need);
    let k = 0, miss = 0;
    await Promise.all(Array.from({ length: CONC }, async () => {
      while (k < keys.length) {
        const key = keys[k++], [c, t] = key.split(":");
        let m = null;
        for (const s of symsOf(c, t)) { m = await chart(s, range, maxD[c]); if (m) break; }
        if (m) charts[key] = m; else miss++;
      }
    }));
    console.log("perf-track: 야후 일봉 " + Object.keys(charts).length + "/" + keys.length + "종목(" + range + ")" + (miss ? " · 실패 " + miss : ""));
    // 야후 지수 일봉은 막 끝난 장의 종가가 비어 있을 때가 있다(코스피 당일) — 스냅샷에 기록된 같은 날 지수 종가로 채운다
    COUNTRIES.forEach((c) => {
      if (!idx[c]) return;
      H.forEach((s) => { const v = s[LP.idxKey(c)], d = LP.pdOf(s, c); if (v && d <= maxD[c] && idx[c][d] == null) idx[c][d] = v; });
    });
  }
  // 편출일 종가 보충 — 그 기록일의 같은 나라 가격 기준일(pd) 종가
  let filled = 0;
  exits.forEach((x) => {
    const key = x.c + ":" + x.t + "@" + x.d;
    if (cache[key]) return;
    // 그날 봉이 정확히 있을 때만 — 아직 비어 있는 봉(막 끝난 장)을 전날 종가로 채워 영구 캐시하지 않게
    const pd = LP.pdOf(H[x.i], x.c), m = charts[x.c + ":" + x.t], p = m && m[pd];
    if (p) { cache[key] = { p: r4(p), d: pd }; filled++; }
  });
  const exitPx = (c, t, i) => { const v = cache[c + ":" + t + "@" + H[i].date]; return v ? v.p : null; };
  const unfilled = exits.filter((x) => !cache[x.c + ":" + x.t + "@" + x.d]).length;

  const out = { builtAt: new Date().toISOString(), asOf: last.date, base, freeze: FR ? { from: FR.from, until: FR.until } : null };
  for (const c of COUNTRIES) {
    // ── 3. 묶음별 성적·누적 곡선(정식 전체의 거래일에 맞춘다) ──
    const daysAll = LP.chain(H, c, null, exitPx);
    if (!daysAll.length) continue;
    const dates = [base].concat(daysAll.map((x) => x.d));
    const idxNav = [1], eqNav = c === "us" ? [1] : null;
    let vb = 1, ve = 1;
    daysAll.forEach((x) => { vb *= 1 + x.rb; idxNav.push(r4(vb)); if (eqNav) { ve *= 1 + x.re; eqNav.push(r4(ve)); } });
    const groups = {};
    const lastC = (last.stocks || []).filter((e) => e.c === c);
    GROUPS.forEach((g) => {
      const sel = g === "all" ? null : g;
      const days = g === "all" ? daysAll : LP.chain(H, c, sel, exitPx);
      const f = days.findIndex((x) => x.n > 0);
      if (f < 0) return;
      const nav = new Array(dates.length).fill(null);
      nav[f] = 1;
      let v = 1;
      for (let k = f; k < days.length; k++) { v *= 1 + days[k].r; nav[k + 1] = r4(v); }
      groups[g] = { w: LP.windows(days, base), nav,
        n: g === "picks" ? ((last.picks && last.picks[c]) || []).length : lastC.filter((e) => LP.inGroup(sel, e.th, e.tier)).length };
    });

    // ── 4. 종목별 — 지금 편성(이번 주제 연속 보유 시작일부터)과 최근 90일 편출 ──
    const ix = (i) => { for (let j = i; j >= 0; j--) if (H[j][LP.idxKey(c)]) return H[j][LP.idxKey(c)]; return null; };
    // 기록일 i 부터 거꾸로 같은 갈래(정식 편성·관심·보유)로 이어진 첫 기록일 — 정식 안에서 주제만 옮긴 종목은 처음 추천한 날부터 센다
    //   (스냅샷은 종목당 한 주제만 남겨, 두 주제에 있던 종목은 한쪽이 빠진 날 '옮긴' 것처럼 보인다)
    const kind = (th) => (LP.PERSONAL[th] ? th : "formal");
    const runStart = (i, t, th) => {
      let j = i;
      while (j > 0 && (H[j - 1].stocks || []).some((e) => e.c === c && e.t === t && kind(e.th) === kind(th))) j--;
      return j;
    };
    const priceIn = (i, t) => { const e = (H[i].stocks || []).find((x) => x.c === c && x.t === t); return e ? e.p : null; };
    const L = H.length - 1, ixL = ix(L);
    const stocks = lastC.map((e) => {
      const j = runStart(L, e.t, e.th), p0 = priceIn(j, e.t), i0 = ix(j);
      const ret = p0 && e.p ? (e.p / p0 - 1) * 100 : null, ir = i0 && ixL ? (ixL / i0 - 1) * 100 : null;
      return { t: e.t, n: e.n, th: e.th, tier: e.tier, d0: H[j].date, ret: r2(ret), ex: ret != null && ir != null ? r2(ret - ir) : null };
    });
    const nowIdx = lastClose(idx[c]);
    const removed = recentExits.filter((x) => x.c === c && !lastC.some((e) => e.t === x.t)).map((x) => {
      const j = runStart(x.i - 1, x.t, x.e.th), p0 = priceIn(j, x.t), ex = cache[c + ":" + x.t + "@" + x.d];
      const px = ex ? ex.p : x.e.p, i0 = ix(j), i1 = ix(x.i);
      const ret = p0 && px ? (px / p0 - 1) * 100 : null, ir = i0 && i1 ? (i1 / i0 - 1) * 100 : null;
      const row = { t: x.t, n: x.e.n, th: x.e.th, tier: x.e.tier, d0: H[j].date, d1: x.d, ret: r2(ret), ex: ret != null && ir != null ? r2(ret - ir) : null };
      // 편출 후 — 편출일 종가 → 마지막 종가, 같은 기간 지수 대비(양수면 뺀 뒤에 지수보다 더 올랐다)
      const m = charts[c + ":" + x.t], now = lastClose(m), pdx = ex ? ex.d : null;
      if (ex && now && now.d > pdx) {
        // 종목 마지막 종가와 같은 날의 지수로 비교(지수·종목 일봉의 마지막 날이 다를 수 있다)
        const ia = closeAt(idx[c], pdx), iz = closeAt(idx[c], now.d), post = (now.p / ex.p - 1) * 100;
        row.post = r2(post);
        if (ia && iz) row.postEx = r2(post - (iz / ia - 1) * 100);
      }
      return row;
    }).sort((a, b) => (a.d1 < b.d1 ? 1 : a.d1 > b.d1 ? -1 : 0));

    // ── 5. 교체 성과 — 교체일 종가부터 지금·20거래일 뒤, 같은 나라 지수 대비(편입 묶음 평균 vs 편출 묶음 평균) ──
    const swapRows = [];
    recentSwaps.filter((s) => s.c === c).forEach((s) => {
      const i0 = closeAt(idx[c], s.pd), d20 = nthAfter(idx[c], s.pd, AFTER), i20 = d20 ? closeAt(idx[c], d20) : null;
      if (!i0 || !nowIdx) return;
      const one = (e) => {
        const m = charts[c + ":" + e.t], p0 = closeAt(m, s.pd), now = lastClose(m), iz = now && closeAt(idx[c], now.d);
        if (!p0 || !now || !iz) return null;
        const p20 = d20 ? closeAt(m, d20) : null;
        return { t: e.t, n: e.n, now: r2((now.p / p0 - 1) * 100 - (iz / i0 - 1) * 100),
          d20: p20 && i20 ? r2((p20 / p0 - 1) * 100 - (i20 / i0 - 1) * 100) : null };
      };
      const A = s.add.map(one).filter(Boolean), R = s.rem.map(one).filter(Boolean);
      if (!A.length || !R.length) return;
      const avg = (arr, f) => { const v = arr.map((x) => x[f]).filter((x) => x != null); return v.length ? r2(v.reduce((p, q) => p + q, 0) / v.length) : null; };
      const days = sortedKeys(idx[c]).filter((x) => x > s.pd).length;   // 교체일 뒤 지난 거래일
      swapRows.push({ d: s.d, th: s.th, days, add: A, rem: R, addNow: avg(A, "now"), remNow: avg(R, "now"), add20: avg(A, "d20"), rem20: avg(R, "d20") });
    });
    swapRows.sort((a, b) => (a.d < b.d ? 1 : a.d > b.d ? -1 : 0));
    const done = swapRows.filter((s) => s.add20 != null && s.rem20 != null);
    const mean = (arr) => (arr.length ? r2(arr.reduce((p, q) => p + q, 0) / arr.length) : null);
    const swapSum = {
      n: swapRows.length,
      nowWins: swapRows.filter((s) => s.addNow > s.remNow).length,
      nowDiff: mean(swapRows.map((s) => s.addNow - s.remNow)),
      done: done.length, wins20: done.filter((s) => s.add20 > s.rem20).length,
      diff20: mean(done.map((s) => s.add20 - s.rem20))
    };

    // ── 6. 3개월 검증 — 추천 vs 그림자(shadow.json, 선정 규칙 동결 첫날부터 같은 방식으로 잰 값) ──
    let shadow = null;
    const S = SH && SH[c];
    if (S && Array.isArray(S.series) && S.series.length) {
      const se = S.series, a0 = se[0], z = se[se.length - 1];
      const diffs = [];
      for (let k = 1; k < se.length; k++) diffs.push(se[k].f / se[k - 1].f - se[k].s / se[k - 1].s);
      shadow = { from: a0.d, to: z.d, days: se.length - 1,
        f: r2((z.f / a0.f - 1) * 100), s: r2((z.s / a0.s - 1) * 100), i: r2((z.i / a0.i - 1) * 100),
        e: a0.e && z.e ? r2((z.e / a0.e - 1) * 100) : null,
        edge: r2(((z.f / a0.f) - (z.s / a0.s)) * 100), tEdge: r2(LP.tMean(diffs)),
        themes: (S.summary && S.summary.themes) || null,
        series: se.map((x) => ({ d: x.d, f: r4(x.f), s: r4(x.s), i: r4(x.i) })) };
    }
    // 야후를 못 받았으면(--offline·장애) 교체 성과·편출 후 성적은 지난 계산을 잇는다 — 하루 빈 화면보다 하루 늦은 값이 낫다
    let swapsOut = { list: swapRows, summary: swapSum };
    const P0 = PREV && PREV[c];
    if (!idx[c] && P0) {
      if (P0.swaps) swapsOut = P0.swaps;
      const old = {};
      (P0.removed || []).forEach((r) => { old[r.t + "@" + r.d1] = r; });
      removed.forEach((r) => { const o = old[r.t + "@" + r.d1]; if (o && r.post == null && o.post != null) { r.post = o.post; r.postEx = o.postEx; } });
    }
    out[c] = { pd: maxD[c], dates, idx: idxNav, eq: eqNav, groups, stocks, removed, swaps: swapsOut, shadow };
    const a = groups.all && groups.all.w.all;
    console.log("perf-track " + c + ": " + daysAll.length + "거래일 · 정식 " + (a ? a.ret + "% vs 지수 " + a.bench + "% (β " + a.beta + ", β 반영 " + a.betaAlpha + "%p, t " + a.tEx + ")" : "–") +
      " · 편출 " + removed.length + " · 교체 " + swapsOut.list.length + "회(20거래일 지난 " + swapsOut.summary.done + "회 중 편입이 나은 " + swapsOut.summary.wins20 + ")" + (swapsOut === P0?.swaps ? " — 지난 계산 유지" : ""));
  }
  // 편출일 종가 캐시 — 지난 사실이라 한 번 받으면 다시 받지 않는다(스냅샷 보존 기간 밖은 정리)
  const keepDates = new Set(H.map((s) => s.date));
  Object.keys(cache).forEach((k) => { if (!keepDates.has(k.split("@")[1])) delete cache[k]; });
  out.cache = cache;
  fs.writeFileSync(OUT, JSON.stringify(out) + "\n");
  console.log("perf-track: data/perf.json — 편출일 종가 " + Object.keys(cache).length + "건(새로 " + filled + ")" + (unfilled ? " · 못 채운 편출 " + unfilled + "건(그날 수익 제외)" : ""));
}

main().catch((e) => { console.error("perf-track 오류: " + e.message); process.exitCode = 1; });
