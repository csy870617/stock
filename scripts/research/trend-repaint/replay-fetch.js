#!/usr/bin/env node
// Fetch Yahoo daily bars for every ticker in data/trend-summary.js exactly the way scripts/update-trend.js does
// (yahooSym mapping, interval=1d, settleDailyBars from scripts/lib-quote.js, local date via gmtoffset, null closes dropped).
// Usage: node fetch.js [range=5y] [--force]
//   -> cache/<range>/<ticker>.json  {sym, range, fetchedAt, settle, gmtoffset, bars:[{t,o,h,l,c,v}]}
//   bench indices ^KS11 ^KQ11 ^GSPC are cached as cache/<range>/^KS11.json etc.
// Read-only with respect to the repository.
"use strict";
const fs = require("fs");
const path = require("path");
const REPO = path.resolve(__dirname, "..", "..", "..");
const { settleDailyBars } = require(path.join(REPO, "scripts", "lib-quote.js"));
const HERE = __dirname;
const range = (process.argv.find((a) => /^range=/.test(a)) || "range=5y").slice(6);
const force = process.argv.includes("--force");
const OUT = path.join(HERE, "cache", range);
fs.mkdirSync(OUT, { recursive: true });

function load(rel, key) {
  global.window = {};
  const f = path.join(REPO, rel);
  delete require.cache[require.resolve(f)];
  require(f);
  return global.window[key] || null;
}
const D = load("data/recommendations.js", "STOCK_DATA") || {};
const TS = load("data/trend-summary.js", "TREND_SUMMARY") || { items: {} };
const list = [], seen = {};
["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
  if (!s || !s.ticker || seen[s.ticker]) return;
  seen[s.ticker] = 1;
  if (!TS.items[s.ticker]) return;
  list.push({ c, ticker: s.ticker, name: s.name, market: s.market });
}));
const yahooSym = (s) => (s.c === "korea" ? s.ticker + (s.market === "KOSDAQ" ? ".KQ" : ".KS") : String(s.ticker).replace(/\./g, "-"));
const safe = (t) => String(t).replace(/[^A-Za-z0-9.\-^]/g, "_");

async function getJson(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 25000);
      const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
      clearTimeout(to);
      if (r.ok) return await r.json();
      if (r.status === 404) return null;
    } catch (_e) { /* retry */ }
    await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
  return null;
}
async function yahooBars(sym) {
  for (let i = 0; i < 3; i++) {
    const j = await getJson("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=" + range);
    const res = j && j.chart && j.chart.result && j.chart.result[0];
    if (res && res.indicators && res.indicators.quote && res.timestamp) {
      const settle = settleDailyBars(res);
      const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000, q = res.indicators.quote[0], out = [];
      let nulls = 0;
      res.timestamp.forEach((ts, k) => {
        if (q.close[k] == null) { nulls++; return; }
        out.push({ t: +new Date(ts * 1000 + off).toISOString().slice(0, 10).replace(/-/g, ""), o: q.open[k], h: q.high[k], l: q.low[k], c: q.close[k], v: q.volume[k] || 0 });
      });
      if (out.length > 60) return { bars: out, settle, nulls, gmtoffset: res.meta && res.meta.gmtoffset, meta: { regularMarketTime: res.meta && res.meta.regularMarketTime, regularMarketPrice: res.meta && res.meta.regularMarketPrice, firstTradeDate: res.meta && res.meta.firstTradeDate } };
    }
    await new Promise((r) => setTimeout(r, 600 * (i + 1)));
  }
  return null;
}
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}
(async () => {
  const jobs = list.map((s) => ({ key: s.ticker, sym: yahooSym(s), c: s.c, market: s.market, name: s.name }))
    .concat([{ key: "^KS11", sym: "^KS11" }, { key: "^KQ11", sym: "^KQ11" }, { key: "^GSPC", sym: "^GSPC" }]);
  let ok = 0, fail = [];
  await mapLimit(jobs, 4, async (j) => {
    const f = path.join(OUT, safe(j.key) + ".json");
    if (!force && fs.existsSync(f)) { ok++; return; }
    const r = await yahooBars(j.sym);
    if (!r) { fail.push(j.key); return; }
    fs.writeFileSync(f, JSON.stringify(Object.assign({ key: j.key, sym: j.sym, c: j.c, market: j.market, name: j.name, range, fetchedAt: new Date().toISOString() }, r)));
    ok++;
  });
  console.log("range", range, "ok", ok, "/", jobs.length, fail.length ? "FAIL " + fail.join(",") : "");
})();
