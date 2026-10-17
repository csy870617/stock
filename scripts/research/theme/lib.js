// 주제 기준 연구(2026-10-17) 공용 — 네트워크(curl: 세션 프록시·Action 모두 동작)·동시성·야후 월봉
// 사용처: fetch-us.js · fetch-kr.js · panel-*.js · test-factors.js (결과·결정은 docs/HISTORY.md '주제 기준 연구')
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const DESKTOP = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const SEC_UA = "Mozilla/5.0 (compatible; stock-dashboard-research/1.0)";

function curl(url, ua, extra, timeout) {
  return new Promise((resolve) => {
    const args = ["-s", "--max-time", String(timeout || 40), "--compressed", "-A", ua || DESKTOP].concat(extra || []).concat([url]);
    execFile("curl", args, { maxBuffer: 256 * 1024 * 1024 }, (err, out) => resolve(err ? null : out));
  });
}
async function getText(url, ua, extra, tries) {
  for (let i = 0; i < (tries || 3); i++) {
    const t = await curl(url, ua, extra);
    if (t && t.length > 20) return t;
    await sleep(600 * (i + 1));
  }
  return null;
}
async function getJson(url, ua, extra, tries) {
  const t = await getText(url, ua, extra, tries);
  if (!t) return null;
  try { return JSON.parse(t.replace(/^﻿/, "")); } catch (_e) { return null; }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}
// 초당 요청 상한(SEC 공정 사용 10회/초 — 여유를 두고 쓴다)
function rateLimiter(perSec) {
  let next = 0;
  return async () => { const now = Date.now(); const at = Math.max(now, next); next = at + 1000 / perSec; if (at > now) await sleep(at - now); };
}
const num = (v) => { if (v == null) return null; const n = parseFloat(String(v).replace(/[,%$배원]/g, "").trim()); return isFinite(n) ? n : null; };

// 야후 월봉(2010-01~) — 종가(분할 수정)·수정종가(분할+배당)·배당·분할 이벤트. 마지막 진행 중인 달은 버린다.
async function yahooMonthly(sym) {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) +
    "?interval=1mo&period1=1262304000&period2=" + Math.floor(Date.now() / 1000) + "&events=div%2Csplit";
  for (let i = 0; i < 3; i++) {
    const j = await getJson(url, "Mozilla/5.0", null, 1);
    const res = j && j.chart && j.chart.result && j.chart.result[0];
    if (j && j.chart && j.chart.error && /Not Found|No data/i.test(String(j.chart.error.description || j.chart.error.code))) return null;
    if (!res) { await sleep(1000 * (i + 1)); continue; }
    if (!res.timestamp) return null;
    const q = res.indicators.quote[0], a = res.indicators.adjclose && res.indicators.adjclose[0] && res.indicators.adjclose[0].adjclose;
    const curMonth = new Date().toISOString().slice(0, 7);
    const o = { sym, cur: res.meta && res.meta.currency, d: [], c: [], a: [], v: [], divs: [], splits: [] };
    res.timestamp.forEach((t, k) => {
      const ym = new Date((t + 15 * 86400) * 1000).toISOString().slice(0, 7);   // 월초 타임스탬프 — 15일 더해 월 확정
      const c = q.close[k], ad = a ? a[k] : null;
      if (ym >= curMonth || c == null || !(c > 0) || ad == null || !(ad > 0)) return;
      if (o.d.length && o.d[o.d.length - 1] === ym) return;
      o.d.push(ym); o.c.push(+c.toPrecision(7)); o.a.push(+ad.toPrecision(7)); o.v.push(q.volume[k] || 0);
    });
    const ev = res.events || {};
    Object.values(ev.dividends || {}).forEach((x) => o.divs.push([new Date(x.date * 1000).toISOString().slice(0, 10), x.amount]));
    Object.values(ev.splits || {}).forEach((x) => o.splits.push([new Date(x.date * 1000).toISOString().slice(0, 10), x.numerator / x.denominator]));
    o.divs.sort((x, y) => (x[0] < y[0] ? -1 : 1)); o.splits.sort((x, y) => (x[0] < y[0] ? -1 : 1));
    return o;
  }
  return null;
}
function writeJson(file, obj) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(obj)); }
function readJson(file, dflt) { try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch (_e) { return dflt; } }

module.exports = { DESKTOP, SEC_UA, curl, getText, getJson, sleep, mapLimit, rateLimiter, num, yahooMonthly, writeJson, readJson };
