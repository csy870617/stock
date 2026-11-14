#!/usr/bin/env node
"use strict";
//
// 교체 성과 점검 — '더 좋은 종목을 찾는 기능이 실제로 더 좋은 종목을 골랐나' (토큰 0, 파일을 쓰지 않음)
//
//   node scripts/swap-outcome.js                    # 전체 이력
//   node scripts/swap-outcome.js --since 2026-10-12 # C 모드(주간 심층 발굴) 도입 이후만
//
// data/history.js 스냅샷을 차례로 비교해 정식 편성(우량·성장·저평가·배당)의 편입·편출을 뽑고, 같은 날·같은 나라의
// 편입 묶음과 편출 묶음을 '교체 1회'로 짝지어 교체일 종가 → (현재, 20거래일 뒤) 같은 나라 지수 대비 초과수익을 비교한다.
// 2026-10-12 점검: 미국 교체일 7회 중 6회 편입이 나았고(평균 +4.5% vs -2.0%), 한국은 4회 중 1회(-2.8% vs +2.3%).
// 소속(주제) 단위로 견준다 — 여러 주제에 있는 종목의 한 주제만 뺀 교체(예: TSM value 슬롯)도 편출이고(스냅샷 ths — lib-history.js),
//   같은 날 한 정식 주제에서 빠지고 다른 정식 주제에 든 종목은 이동이라 세지 않는다. 표본이 작을 때는 방향만 참고한다(§5 교체 기준을 바꿀 근거로는 부족).

const path = require("path");
const LH = require("./lib-history");
const ROOT = path.join(__dirname, "..");
const FORMAL = new Set(["core", "growth", "value", "dividend"]);   // 2026-10-30 히든 폐지 — 그 주제의 교체는 더 세지 않는다
const si = process.argv.indexOf("--since");
const SINCE = si >= 0 ? process.argv[si + 1] : "0000-00-00";

global.window = {};
require(path.join(ROOT, "data", "history.js"));
const H = global.window.STOCK_HISTORY || [];
global.window = {};
require(path.join(ROOT, "data", "recommendations.js"));
const D = global.window.STOCK_DATA;
const market = {};
["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => { market[c + ":" + s.ticker] = s.market; }));

// 정식 소속 — "국가:티커" → {e 스냅샷 항목(t 티커, n 이름, c 국가, th·tier·ths 소속, p 가격, pd 가격일), ths 정식 주제 목록}
const formal = (snap) => {
  const m = {};
  (snap.stocks || []).forEach((e) => { const ths = LH.themesOf(e).filter((th) => FORMAL.has(th)); if (ths.length) m[e.c + ":" + e.t] = { e, ths }; });
  return m;
};
const events = [];
for (let i = 1; i < H.length; i++) {
  if (H[i].date < SINCE) continue;
  const a = formal(H[i - 1]), b = formal(H[i]), d = H[i].date;
  new Set(Object.keys(a).concat(Object.keys(b))).forEach((k) => {
    const A = a[k] ? a[k].ths : [], B = b[k] ? b[k].ths : [];
    const gain = B.filter((th) => A.indexOf(th) < 0), lost = A.filter((th) => B.indexOf(th) < 0);
    if (gain.length && lost.length) return;   // 정식 주제끼리 옮김 — 교체가 아니다
    // 한 종목이 같은 날 두 주제에 들거나 빠져도 한 번만 센다(평균 비중이 겹치지 않게)
    if (gain.length) events.push({ d, type: "add", k, n: b[k].e.n, th: gain[0] });
    if (lost.length) events.push({ d, type: "rem", k, n: a[k].e.n, th: lost[0] });
  });
}

function yahoo(k) {
  const [c, t] = k.split(":");
  if (c === "us") return [t.replace(".", "-")];
  return market[k] === "KOSDAQ" ? [t + ".KQ", t + ".KS"] : [t + ".KS", t + ".KQ"];
}
const cache = {};
async function series(sym) {
  if (sym in cache) return cache[sym];
  let out = null;
  try {
    const r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=2y",
      { headers: { "User-Agent": "Mozilla/5.0" } });
    const j = await r.json();
    const res = j.chart && j.chart.result && j.chart.result[0];
    if (res && res.timestamp) {
      const off = res.meta.gmtoffset || 0, cl = res.indicators.quote[0].close, m = {};
      res.timestamp.forEach((t, i) => { if (cl[i] != null) m[new Date((t + off) * 1000).toISOString().slice(0, 10)] = cl[i]; });
      if (Object.keys(m).length > 20) out = m;
    }
  } catch (_e) { /* 네트워크 실패 — 해당 종목만 제외 */ }
  cache[sym] = out;
  return out;
}
async function seriesOf(k) { for (const s of yahoo(k)) { const m = await series(s); if (m) return m; } return null; }
const at = (m, d) => { const ks = Object.keys(m).filter((x) => x <= d).sort(); return ks.length ? m[ks[ks.length - 1]] : null; };
const last = (m) => { const ks = Object.keys(m).sort(); return m[ks[ks.length - 1]]; };
const after = (m, d, n) => { const ks = Object.keys(m).filter((x) => x > d).sort(); return ks.length >= n ? m[ks[n - 1]] : null; };
const pct = (v) => (v == null ? "   –  " : ((v >= 0 ? "+" : "") + (v * 100).toFixed(1) + "%"));

(async () => {
  const idx = { korea: await series("^KS11"), us: await series("^GSPC") };
  // 지수 시세를 못 받으면 아래 표가 통째로 비어 '교체 0회'처럼 보인다(2026-11-14 점검 — 네트워크가 막힌 세션에서 실제로 그렇게 찍혔다).
  //   회차 보고가 이 출력을 인용하므로(CLAUDE.md §3-6) 실패는 실패라고 적고 끝낸다. 같은 계산은 data/perf.json 의 swaps 에도 있다.
  const noIdx = ["korea", "us"].filter((c) => !idx[c]);
  if (noIdx.length === 2) {
    console.error("교체 성과: 지수 시세(야후)를 받지 못함 — 결과 없음(교체 0회가 아니다). 네트워크를 확인하거나 data/perf.json 의 swaps 를 본다.");
    process.exitCode = 1;
    return;
  }
  const dropped = [];
  const groups = {};
  events.forEach((e) => {
    const key = e.d + "|" + e.k.split(":")[0];
    (groups[key] = groups[key] || { add: [], rem: [] })[e.type].push(e);
  });
  const rows = [];
  for (const key of Object.keys(groups).sort()) {
    const g = groups[key];
    if (!g.add.length || !g.rem.length) continue;   // 편입만·편출만인 날은 교체가 아니다
    const [d, c] = key.split("|");
    const ix = idx[c];
    if (!ix) continue;
    const i0 = at(ix, d), iN = last(ix), i20 = after(ix, d, 20);
    const one = async (e) => {
      const m = await seriesOf(e.k);
      const p0 = m && at(m, d);
      if (!p0) { dropped.push(d + " " + e.n); return null; }
      const p20 = after(m, d, 20);
      return { n: e.n, now: (last(m) / p0 - 1) - (iN / i0 - 1), d20: p20 && i20 ? (p20 / p0 - 1) - (i20 / i0 - 1) : null };
    };
    const A = (await Promise.all(g.add.map(one))).filter(Boolean), R = (await Promise.all(g.rem.map(one))).filter(Boolean);
    const avg = (arr, f) => { const v = arr.map((x) => x[f]).filter((x) => x != null); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
    rows.push({ d, c, A, R, addNow: avg(A, "now"), remNow: avg(R, "now"), add20: avg(A, "d20"), rem20: avg(R, "d20") });
  }
  console.log("교체 성과 (같은 나라 지수 대비 초과수익, 교체일 종가 기준)" + (si >= 0 ? " — " + SINCE + " 이후" : ""));
  console.log("날짜        국가   편입/편출 | 현재까지: 편입 / 편출 | 20거래일: 편입 / 편출");
  rows.forEach((r) => console.log(r.d, r.c.padEnd(6), (r.A.length + "/" + r.R.length).padStart(5), " |",
    pct(r.addNow).padStart(7), "/", pct(r.remNow).padStart(7), " |", pct(r.add20).padStart(7), "/", pct(r.rem20).padStart(7),
    "  ", r.A.map((x) => x.n).join("·").slice(0, 36), "⇄", r.R.map((x) => x.n).join("·").slice(0, 36)));
  if (noIdx.length) console.log("⚠ " + noIdx.join("·") + " 지수 시세를 받지 못해 그 나라 교체는 계산하지 못했다(0회가 아니다)");
  if (dropped.length) console.log("⚠ 시세를 받지 못해 평균에서 빠진 종목 " + dropped.length + "개: " + dropped.slice(0, 12).join(", ") + (dropped.length > 12 ? " …" : ""));
  for (const c of ["korea", "us"]) {
    if (!idx[c]) continue;
    const done = rows.filter((r) => r.c === c && r.add20 != null && r.rem20 != null);
    const wins = done.filter((r) => r.add20 > r.rem20).length;
    const mean = (f) => done.reduce((s, r) => s + r[f], 0) / (done.length || 1);
    console.log(c.padEnd(6), "20거래일 지난 교체일 " + done.length + "회 — 편입이 나은 날 " + wins + "/" + done.length +
      (done.length ? " · 평균 편입 " + pct(mean("add20")) + " / 편출 " + pct(mean("rem20")) : "") +
      " · 진행 중 " + rows.filter((r) => r.c === c && (r.add20 == null || r.rem20 == null)).length + "회");
  }
})();
