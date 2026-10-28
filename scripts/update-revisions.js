#!/usr/bin/env node
// 한국 증권사 목표가의 3개월 변화(리포트 평균) — Top Pick 한국 관문 '목표가 급락'(2026-10-28 6차 연구, scripts/research/top-pick/PREREG-6.md)
//   컨센서스(날짜 D) = D 까지 지난 180일 안 증권사마다 가장 최근 목표가의 평균(2곳 이상) — 연구와 같은 정의(네이버 리서치 리포트).
//   변화 = ln(컨센서스(T) ÷ 컨센서스(T − 3개월)), 둘 다 있을 때만. 10% 넘게 내렸으면 Top Pick 후보에서 뺀다(lib-picks.js, 한국만).
//   리포트는 data/analyst-kr.json 에 400일치를 쌓아 두고 매번 새 리포트만 받는다(토큰 0). 목표가 ÷ 작성일 주가가 0.2~5 밖이면 자료 오류로 뺀다.
//   분할·병합: 작성일 주가(px)와 차트의 수정 종가가 30% 넘게 어긋날 때만 그 비율로 목표가를 지금 단위로 고친다.
// 사용: node scripts/update-revisions.js   → data/revisions.js(window.STOCK_REVISIONS) + data/analyst-kr.json
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const CACHE = path.join(DATA, "analyst-kr.json");
const OUT = path.join(DATA, "revisions.js");
const KEEP_DAYS = 400, WINDOW = 180, MIN_BROKERS = 2, MONTHS = 3, CUT_PCT = -10;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

function load(file, key) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  const w = {};
  try { new Function("window", fs.readFileSync(p, "utf8"))(w); } catch (_e) { return null; }
  return w[key] || null;
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const curlJson = (url) => new Promise((res) => execFile("curl", ["-s", "--max-time", "20", "-A", UA, "-H", "Accept: application/json", url], { maxBuffer: 16 << 20 },
  (e, out) => { try { res(e ? null : JSON.parse(out)); } catch (_e) { res(null); } }));
async function get(url) { for (let i = 0; i < 3; i++) { const j = await curlJson(url); if (j) return j; await wait(600 * (i + 1)); } return null; }
const num = (s) => { const v = parseFloat(String(s == null ? "" : s).replace(/,/g, "")); return isFinite(v) && v > 0 ? v : null; };
const ok = (v) => v != null && isFinite(v);
const dayShift = (iso, k) => new Date(Date.parse(iso + "T00:00:00Z") + k * 864e5).toISOString().slice(0, 10);
const monthsBack = (iso, k) => {
  const y = +iso.slice(0, 4), m = +iso.slice(5, 7) - 1 - k, d = +iso.slice(8, 10);
  const yy = y + Math.floor(m / 12), mm = ((m % 12) + 12) % 12, last = new Date(Date.UTC(yy, mm + 1, 0)).getUTCDate();
  return yy + "-" + String(mm + 1).padStart(2, "0") + "-" + String(Math.min(d, last)).padStart(2, "0");
};

// 새 리포트만 받는다: 목록 첫 쪽부터, 아는 리포트가 나오거나 보관 기간보다 오래되면 멈춘다. 상세(목표가·작성일 주가)는 새 것만.
async function refresh(code, list, cutoff) {
  const known = new Set(list.map((x) => x[0]));
  const fresh = [];
  for (let p = 1; p <= 15; p++) {
    const j = await get("https://m.stock.naver.com/api/research/stock/" + code + "?pageSize=20&page=" + p);
    if (!Array.isArray(j)) return null;
    if (!j.length) break;
    let older = false, allNew = true;
    for (const x of j) {
      if (!x.writeDate || x.writeDate < cutoff) { older = true; continue; }
      if (known.has(x.researchId)) { allNew = false; continue; }
      fresh.push({ id: x.researchId, d: x.writeDate, broker: x.brokerName || "" });
    }
    if (older || !allNew || j.length < 20) break;
  }
  const add = [];
  for (const it of fresh) {
    const j = await get("https://m.stock.naver.com/api/research/stock/" + code + "/" + it.id);
    const r = j && j.researchContent;
    if (!r) continue;   // 이번에 못 받은 상세는 다음 실행이 다시 받는다
    add.push([it.id, it.d, it.broker, num(r.goalPrice), num(r.priceAtWriteDate)]);
  }
  return add;
}

// 차트 수정 종가(그 날짜 이전 마지막 봉) — 분할·병합 점검용
function closeAt(code) {
  let bars = null;
  try { bars = JSON.parse(fs.readFileSync(path.join(DATA, "chart", code + ".json"), "utf8")).d || null; } catch (_e) { bars = null; }
  if (!bars || !bars.length) return () => null;
  return (iso) => {
    const k = +iso.replace(/-/g, "");
    let lo = 0, hi = bars.length - 1, best = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (bars[m][0] <= k) { best = m; lo = m + 1; } else hi = m - 1; }
    return best >= 0 ? bars[best][4] : null;
  };
}
function consensus(list, D, adj) {
  const from = dayShift(D, -WINDOW), last = new Map();
  for (const x of list) {
    if (x[1] > D || x[1] <= from) continue;
    const g = adj(x); if (!ok(g)) continue;
    const prev = last.get(x[2]);
    if (!prev || x[1] >= prev.d) last.set(x[2], { d: x[1], g });
  }
  if (last.size < MIN_BROKERS) return null;
  const gs = [...last.values()].map((o) => o.g);
  return { v: gs.reduce((s, v) => s + v, 0) / gs.length, n: gs.length };
}

(async () => {
  const D = load("recommendations.js", "STOCK_DATA");
  if (!D) { console.error("update-revisions: recommendations.js 를 읽지 못함"); process.exit(1); }
  const T = (load("stock-ta.js", "STOCK_TA") || {}).asOf || new Date().toISOString().slice(0, 10);
  const codes = [...new Set((D.korea || []).map((s) => s.ticker).filter((t) => /^\d{6}$/.test(t)))].sort();
  let cache = { items: {} };
  try { cache = JSON.parse(fs.readFileSync(CACHE, "utf8")); } catch (_e) { cache = { items: {} }; }
  const cutoff = dayShift(T, -KEEP_DAYS);
  let k = 0, failed = 0, added = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (k < codes.length) {
      const c = codes[k++];
      const list = (cache.items[c] || []).filter((x) => x[1] >= cutoff);
      const add = await refresh(c, list, cutoff);
      if (add == null) { failed++; cache.items[c] = list; continue; }
      added += add.length;
      cache.items[c] = list.concat(add).sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : a[0] - b[0]));
    }
  }));
  // 편성에서 빠진 종목은 지운다
  for (const c of Object.keys(cache.items)) if (!codes.includes(c)) delete cache.items[c];
  cache.asOf = T; cache.builtAt = new Date().toISOString().slice(0, 19) + "Z";
  fs.writeFileSync(CACHE, JSON.stringify(cache));

  const D3 = monthsBack(T, MONTHS), items = {};
  for (const c of codes) {
    const list = cache.items[c] || [], close = closeAt(c);
    const adj = (x) => {
      const goal = x[3], px = x[4];
      if (!(goal > 0)) return null;
      if (px > 0 && (goal / px < 0.2 || goal / px > 5)) return null;
      const cl = px > 0 ? close(x[1]) : null, r = cl > 0 ? cl / px : 1;
      return Math.abs(r - 1) > 0.3 ? goal * r : goal;
    };
    const a = consensus(list, T, adj), b = consensus(list, D3, adj);
    if (!a && !b) continue;
    const rev3 = a && b && a.v > 0 && b.v > 0 ? Math.log(a.v / b.v) : null;
    items[c] = { cons: a ? Math.round(a.v) : null, n: a ? a.n : 0, cons3: b ? Math.round(b.v) : null, n3: b ? b.n : 0,
      chg: ok(rev3) ? Math.round((Math.exp(rev3) - 1) * 1000) / 10 : null, rev3: ok(rev3) ? Math.round(rev3 * 10000) / 10000 : null };
  }
  const doc = { asOf: T, from: D3, builtAt: cache.builtAt, rule: { window: WINDOW, minBrokers: MIN_BROKERS, months: MONTHS, cutPct: CUT_PCT },
    note: "증권사 리포트 목표가(지난 " + WINDOW + "일 안 증권사마다 최신, " + MIN_BROKERS + "곳 이상) 평균의 " + MONTHS + "개월 변화 — 네이버 리서치", items };
  fs.writeFileSync(OUT, "// 한국 증권사 목표가 3개월 변화 — scripts/update-revisions.js 가 매일 생성(토큰 0). Top Pick 관문: scripts/lib-picks.js\n" +
    "window.STOCK_REVISIONS = " + JSON.stringify(doc) + ";\n");
  const withChg = Object.entries(items).filter(([, v]) => ok(v.chg));
  const cut = withChg.filter(([, v]) => v.chg <= CUT_PCT).map(([c, v]) => c + "(" + v.chg + "%)");
  console.log("목표가 3개월 변화(" + D3 + " → " + T + ") " + withChg.length + "/" + codes.length + "종목 · 새 리포트 " + added + "건" + (failed ? " · 받기 실패 " + failed + "종목(기록 사용)" : "") +
    " · 10% 넘게 하향: " + (cut.join(", ") || "없음"));
  if (failed > codes.length * 0.3) console.log("::warning::update-revisions: 네이버 리서치 받기 실패 " + failed + "/" + codes.length + "종목 — 쌓아 둔 리포트로 계산했다");
})();
