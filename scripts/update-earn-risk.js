#!/usr/bin/env node
// 실적 발표 전 '크게 움직일 가능성' 표시(2026-10-30 사용자 선택 — 검증: scripts/research/earn-shock/)
//   과거 한·미 실적 발표 2만 2천여 건에서 아래 네 신호는 발표 때 크게 움직일 확률(위·아래 모두)을 높였지만 방향은 가르지 못했다.
//   그래서 선정 규칙에는 쓰지 않고, 3개 이상이면 앱이 '실적 주의'로 알리기만 한다(매도 신호가 아니다).
//   대상: 편성(정식·관심·보유) 종목 중 다음 실적 발표가 기준일(T)부터 7거래일 안인 종목. 신호 정의는 연구와 같다:
//     tp   증권사 목표가 평균 3개월 −5% 이하(한국 revisions.js — 네이버 리서치, 미국 야후 증권사별 이력 — 180일 안 증권사별 최신, 3곳 이상)
//     prev 직전 실적 발표 반응(발표 전날 → 다음 날 종가, 지수 대비) −5% 이하(200일 안) — 한국 네이버 공시 '(연결)영업(잠정)실적', 미국 events.js 지난 발표일
//     weak 최근 60거래일 지수 대비 −10% 이하(data/trend 의 1년 일봉·지수)
//     pre  프리뷰 경고 — 한국: 최근 30일 리포트 제목·요약에 하회·부진·쇼크·우려·눈높이·하향·적자·감익, 미국: 30일 목표가 내림 2건 이상이고 올림보다 많음
// 사용: node scripts/update-earn-risk.js → data/earn-risk.js(window.EARN_RISK)
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const OUT = path.join(DATA, "earn-risk.js");
const WIN = 7, MIN = 3;
const NEG = /하회|부진|쇼크|우려|눈높이|하향|적자|감익/;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const EVIDENCE = "과거 한·미 실적 발표 2만 2천여 건(2017~2026)에서 위험 신호가 3개 이상인 발표는 그날 전후 −10% 이하 폭락이 8.9%, +10% 이상 급등이 8.8%였습니다" +
  "(신호가 없을 때 4.3%·5.9%). 크게 움직일 때가 많았지만 평균 방향은 같았습니다 — 매도 신호가 아니라 발표 때 변동이 커질 수 있다는 표시입니다.";

function load(file, key) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  const w = {};
  try { new Function("window", fs.readFileSync(p, "utf8"))(w); } catch (_e) { return null; }
  return w[key] || null;
}
const readJ = (p) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch (_e) { return null; } };
const ok = (v) => v != null && isFinite(v);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const dayShift = (iso, k) => new Date(Date.parse(iso + "T00:00:00Z") + k * 864e5).toISOString().slice(0, 10);
const monthsBack = (iso, k) => {
  const y = +iso.slice(0, 4), m = +iso.slice(5, 7) - 1 - k, d = +iso.slice(8, 10);
  const yy = y + Math.floor(m / 12), mm = ((m % 12) + 12) % 12, last = new Date(Date.UTC(yy, mm + 1, 0)).getUTCDate();
  return yy + "-" + String(mm + 1).padStart(2, "0") + "-" + String(Math.min(d, last)).padStart(2, "0");
};
// T 다음 날부터 date 까지의 평일 수(공휴일은 보지 않는다) — 0 이면 발표 당일
function tdays(a, b) { let n = 0, d = Date.parse(a + "T00:00:00Z"); const e = Date.parse(b + "T00:00:00Z"); while (d < e) { d += 864e5; const w = new Date(d).getUTCDay(); if (w !== 0 && w !== 6) n++; } return n; }
const r1 = (v) => (ok(v) ? Math.round(v * 1000) / 10 : null);
const curl = (args) => new Promise((res) => execFile("curl", ["-s", "--max-time", "20", "-A", UA].concat(args), { maxBuffer: 32 << 20 }, (e, out) => res(e ? null : out)));
async function getJson(url, extra) { for (let i = 0; i < 3; i++) { const o = await curl((extra || []).concat([url])); try { return JSON.parse(o); } catch (_e) { /* 다시 */ } await wait(700 * (i + 1)); } return null; }

// ── 미국: 야후 증권사별 목표가 이력(이번 대상 종목만) ──
const JAR = path.join(os.tmpdir(), "earn-risk-yahoo.txt");
let crumb;
async function yahooHistory(t) {
  if (crumb === undefined) {
    await curl(["-c", JAR, "-o", "/dev/null", "https://fc.yahoo.com"]);
    const c = await curl(["-b", JAR, "https://query2.finance.yahoo.com/v1/test/getcrumb"]);
    crumb = c && c.length < 40 && !/[<{\s]/.test(c.trim()) ? c.trim() : null;
  }
  if (!crumb) return null;
  const j = await getJson("https://query2.finance.yahoo.com/v10/finance/quoteSummary/" + encodeURIComponent(t.replace(".", "-")) + "?modules=upgradeDowngradeHistory&crumb=" + encodeURIComponent(crumb), ["-b", JAR]);
  const r = j && j.quoteSummary && j.quoteSummary.result && j.quoteSummary.result[0];
  if (!r) return null;
  return ((r.upgradeDowngradeHistory && r.upgradeDowngradeHistory.history) || []).map((x) => ({ d: new Date(x.epochGradeDate * 1000).toISOString().slice(0, 10), f: x.firm || "", act: x.priceTargetAction || "", g: x.currentPriceTarget > 0 ? x.currentPriceTarget : null }))
    .sort((a, b) => (a.d < b.d ? -1 : 1));
}
function usConsensusChange(h, T) {
  const at = (D) => { const from = dayShift(D, -180), last = new Map(); for (const x of h) { if (x.d > D) break; if (x.d > from && x.g) last.set(x.f, x.g); } if (last.size < 3) return null; const g = [...last.values()]; return g.reduce((s, v) => s + v, 0) / g.length; };
  const a = at(T), b = at(monthsBack(T, 3));
  if (!a || !b) return null;
  const c = a / b - 1;
  return Math.abs(c) > 0.5 ? null : c;   // 분할 등 단위가 어긋난 이력
}

// ── 한국: 직전 실적 공시일(네이버 공시 첫 쪽) ──
async function krPrevEarnings(code, before) {
  const j = await getJson("https://m.stock.naver.com/api/stock/" + code + "/disclosure?page=1&pageSize=100");
  if (!Array.isArray(j)) return null;
  const a = j.map((x) => [String(x.datetime || "").slice(0, 10), String(x.title || "")]).filter((x) => /영업\(잠정\)실적/.test(x[1]) && !/정정/.test(x[1]));
  const cons = a.filter((x) => /연결재무제표기준영업\(잠정\)실적/.test(x[1]));
  const use = (cons.length ? cons : a).map((x) => x[0]).filter((d) => d && d < before);
  const ds = [...new Set(use)].sort();
  if (!cons.length) { const kept = []; ds.forEach((d) => { if (!kept.length || Date.parse(d) - Date.parse(kept[kept.length - 1]) >= 45 * 864e5) kept.push(d); }); return kept.pop() || null; }
  return ds.pop() || null;
}

(async () => {
  const D = load("recommendations.js", "STOCK_DATA");
  if (!D) { console.error("update-earn-risk: recommendations.js 를 읽지 못함"); process.exit(1); }
  const T = (load("stock-ta.js", "STOCK_TA") || {}).asOf || new Date().toISOString().slice(0, 10);
  const EV = (load("events.js", "STOCK_EVENTS") || {}).items || {};
  const RV = (load("revisions.js", "STOCK_REVISIONS") || {}).items || {};
  const AK = (readJ(path.join(DATA, "analyst-kr.json")) || {}).items || {};
  const seen = new Set(), todo = [];
  for (const c of ["korea", "us"]) for (const s of D[c] || []) {
    if (seen.has(s.ticker)) continue; seen.add(s.ticker);
    const n = EV[s.ticker] && EV[s.ticker].next;
    if (!n || !n.date || n.date < T) continue;
    const dn = tdays(T, n.date);
    if (dn > WIN) continue;
    todo.push({ c, t: s.ticker, name: s.name, date: n.date, dn, tentative: !!n.tentative });
  }
  const items = {};
  let yFail = 0;
  for (const x of todo) {
    const tr = readJ(path.join(DATA, "trend", x.t + ".json"));
    const S = tr && tr.series, bars = S && S.t ? S.t.map((d, i) => [d, S.c[i], S.m[i]]) : [];
    const idxOn = (iso) => { const k = +iso.replace(/-/g, ""); return bars.findIndex((b) => b[0] >= k); };
    const sig = {};
    // weak — 60거래일 지수 대비
    { let i = -1; const k = +T.replace(/-/g, ""); bars.forEach((b, j) => { if (b[0] <= k) i = j; });
      if (i >= 60 && bars[i - 60][2] > 0) sig.weak = (bars[i][1] / bars[i - 60][1] - 1) - (bars[i][2] / bars[i - 60][2] - 1); }
    // prev — 직전 발표 반응
    let pd = null;
    if (x.c === "korea") pd = await krPrevEarnings(x.t, x.date);
    else pd = ((EV[x.t] && EV[x.t].hist) || []).map((h) => h.date).filter((d) => d && d < x.date && d <= T).sort().pop() || null;
    if (pd && Date.parse(x.date) - Date.parse(pd) <= 200 * 864e5) {
      const i = idxOn(pd);
      if (i >= 1 && i + 1 < bars.length && bars[i - 1][2] > 0) sig.prev = { d: pd, ar: (bars[i + 1][1] / bars[i - 1][1] - 1) - (bars[i + 1][2] / bars[i - 1][2] - 1) };
    }
    // tp·pre — 증권사
    if (x.c === "korea") {
      const rv = RV[x.t]; if (rv && ok(rv.chg)) sig.tp = rv.chg / 100;
      const from = dayShift(T, -30), hit = (AK[x.t] || []).filter((r) => r[1] > from && r[1] <= T && NEG.test((r[5] || "") + " " + (r[6] || "")));
      const any = (AK[x.t] || []).some((r) => r[1] > from && r[1] <= T && r[5] != null);
      if (hit.length) {   // 가장 최근 경고 문구 — 걸린 낱말 앞뒤를 짧게(화면에 '어디서 무엇이' 보이게)
        const h = hit[hit.length - 1], txt = ((h[5] || "") + " · " + (h[6] || "")).replace(/\s+/g, " "), m = txt.search(NEG);
        sig.pre = { n: hit.length, by: h[2], d: h[1], hit: txt.slice(Math.max(0, m - 14), m + 12).trim() };
      }
      else if (any) sig.pre = { n: 0 };
    } else {
      const h = await yahooHistory(x.t);
      if (!h) yFail++;
      else {
        const c = usConsensusChange(h, T); if (ok(c)) sig.tp = c;
        const from = dayShift(T, -30), w = h.filter((r) => r.d > from && r.d <= T);
        sig.pre = { lo: w.filter((r) => r.act === "Lowers").length, up: w.filter((r) => r.act === "Raises").length };
      }
      await wait(300);
    }
    const flags = [];
    if (ok(sig.tp) && sig.tp <= -0.05) flags.push("tp");
    if (sig.prev && sig.prev.ar <= -0.05) flags.push("prev");
    if (ok(sig.weak) && sig.weak <= -0.10) flags.push("weak");
    if (sig.pre && (x.c === "korea" ? sig.pre.n > 0 : sig.pre.lo >= 2 && sig.pre.lo > sig.pre.up)) flags.push("pre");
    items[x.t] = { c: x.c, date: x.date, dn: x.dn, tentative: x.tentative || undefined, n: flags.length, flags, risk: flags.length >= MIN,
      tp: r1(sig.tp), prev: sig.prev ? { d: sig.prev.d, ar: r1(sig.prev.ar) } : null, weak: r1(sig.weak), pre: sig.pre || null };
  }
  const doc = { asOf: T, builtAt: new Date().toISOString().slice(0, 19) + "Z", rule: { days: WIN, min: MIN }, evidence: EVIDENCE, items };
  fs.writeFileSync(OUT, "// 실적 발표 전 변동 위험 — scripts/update-earn-risk.js 가 매일 생성(토큰 0). 검증: scripts/research/earn-shock/ — 방향 예측이 아니다\n" +
    "window.EARN_RISK = " + JSON.stringify(doc) + ";\n");
  const flagged = Object.entries(items).filter(([, v]) => v.risk).map(([t, v]) => t + "(" + v.n + "/4, D-" + v.dn + ")");
  console.log("실적 발표 7거래일 안 " + todo.length + "종목 · 위험 신호 3개 이상: " + (flagged.join(", ") || "없음") + (yFail ? " · 야후 이력 실패 " + yFail : ""));
  if (yFail && yFail === todo.filter((x) => x.c === "us").length && yFail > 2) console.log("::warning::update-earn-risk: 야후 목표가 이력을 받지 못했다 — 미국은 목표가·프리뷰 신호 없이 계산");
})();
