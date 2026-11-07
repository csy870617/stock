// 운영 코드(scripts/lib-trend.js)로 지난 N 거래일을 하루씩 다시 계산 — 소급 변경 0·판정이 바뀐 날 conf.n=0 확인
"use strict";
const path = require("path");
const WT = path.resolve(__dirname, "..", "..", "..");
const NEW = require(path.join(WT, "scripts/lib-trend.js"));
const Z = require("./zlib");
const N = +(process.argv[2] || 60);
const bench = {}; for (const [k, s] of [["kospi", "^KS11"], ["kosdaq", "^KQ11"], ["sp500", "^GSPC"]]) bench[k] = Z.merged(s).map((b) => ({ t: b.t, c: b.c }));
global.window = {}; require(path.join(WT, "data/recommendations.js")); const SD = global.window.STOCK_DATA;
const TS = Z.TS;   // zlib already loaded data/trend-summary.js (require cache)
const meta = {}; ["korea", "us"].forEach((c) => (SD[c] || []).forEach((s) => { if (!meta[s.ticker]) meta[s.ticker] = { c, market: s.market }; }));
let days = 0, rep = [], noConf0 = [], changes = 0, lastMismatch = [];
for (const t of Object.keys(TS.items)) {
  const m = meta[t] || { c: TS.items[t].c }, bk = m.c === "korea" ? (m.market === "KOSDAQ" ? "kosdaq" : "kospi") : "sp500";
  const bars = Z.merged(t).filter((b) => b.t >= 20161107); let prev = null, last = null;
  for (let d = bars.length - N; d <= bars.length; d++) {
    const a = NEW.analyze(bars.slice(0, d), bench[bk]); if (!a) continue; days++;
    if (prev && !a.young && !prev.young) {
      if (prev.cls === a.cls) { if (prev.from !== a.from || (prev.conf && prev.conf.d) !== (a.conf && a.conf.d)) rep.push(t + " " + a.to + " " + prev.from + "/" + (prev.conf && prev.conf.d) + " → " + a.from + "/" + (a.conf && a.conf.d)); }
      else { changes++; if (!a.conf || a.conf.n !== 0) noConf0.push(t + " " + a.to); }
    }
    prev = a; last = a;
  }
  const s = TS.items[t];
  if (last && (last.cls !== s.cls || last.from !== s.from || (last.conf && last.conf.d) !== (s.conf && s.conf.d))) lastMismatch.push(t + " replay " + last.cls + "/" + last.from + "/" + (last.conf && last.conf.d) + " file " + s.cls + "/" + s.from + "/" + (s.conf && s.conf.d));
}
console.log(JSON.stringify({ sessions: N, tickerDays: days, verdictChanges: changes, repaints: rep.length, repaintEx: rep.slice(0, 5), changeWithoutConf0: noConf0.length, lastDayMismatchVsFile: lastMismatch.length, mismatchEx: lastMismatch.slice(0, 5) }, null, 1));
