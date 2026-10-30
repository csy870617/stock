#!/usr/bin/env node
// 관심 차트 패턴 연구 — 연구 패널(주제 기준 연구의 시점 일치 패널) 종목의 야후 일봉 종가(분할 보정)를 받는다.
// 사용: node scripts/research/watch/fetch-daily.js <주제 연구 캐시 폴더(theme)> <출력 폴더>
//   panel.json 에서 그 달 시총 순위가 미국 1,000·한국 600 안에 든 적이 있는 종목만. 기호는 <캐시>/<us|kr>/px/<티커>.json 의 sym.
//   출력 <출력>/<us|kr>/<티커>.json = {sym, d:[YYYYMMDD], c:[종가]} — 패턴 판정은 screen-watch.js 처럼 종가(분할 보정, 배당 미반영)로 한다.
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const SRC = path.resolve(process.argv[2] || "theme"), OUT = path.resolve(process.argv[3] || "watch-daily");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const curl = (url) => new Promise((res) => execFile("curl", ["-s", "--max-time", "40", "-A", "Mozilla/5.0", url], { maxBuffer: 64 << 20 },
  (e, out) => { try { res(e ? null : JSON.parse(out)); } catch (_e) { res(null); } }));

async function one(sym, from) {
  const p1 = Math.floor(Date.parse(from + "T00:00:00Z") / 1000), p2 = Math.floor(Date.now() / 1000);
  for (let i = 0; i < 3; i++) {
    const j = await curl("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&period1=" + p1 + "&period2=" + p2);
    const r = j && j.chart && j.chart.result && j.chart.result[0];
    if (r && r.timestamp && r.indicators && r.indicators.quote && r.indicators.quote[0]) {
      const q = r.indicators.quote[0], off = (r.meta && r.meta.gmtoffset) || 0, d = [], c = [];
      r.timestamp.forEach((t, k) => {
        const v = q.close[k];
        if (v == null || !isFinite(v) || v <= 0) return;
        const day = +new Date((t + off) * 1000).toISOString().slice(0, 10).replace(/-/g, "");
        if (d.length && d[d.length - 1] === day) { c[c.length - 1] = v; return; }
        d.push(day); c.push(Math.round(v * 10000) / 10000);
      });
      return d.length ? { sym, d, c } : null;
    }
    await sleep(800 * (i + 1));
  }
  return null;
}

(async () => {
  for (const [C, lim, from] of [["us", 1000, "2010-01-01"], ["kr", 600, "2020-06-01"]]) {
    const P = JSON.parse(fs.readFileSync(path.join(SRC, C, "panel.json"), "utf8"));
    const FI = {}; P.fields.forEach((f, i) => { FI[f] = i; });
    const ts = [...new Set(P.rows.filter((r) => r[FI.rank] != null && r[FI.rank] <= lim).map((r) => r[FI.t]))].sort();
    fs.mkdirSync(path.join(OUT, C), { recursive: true });
    let k = 0, ok = 0, miss = 0, skip = 0;
    await Promise.all(Array.from({ length: 8 }, async () => {
      while (k < ts.length) {
        const t = ts[k++], dst = path.join(OUT, C, t + ".json");
        if (fs.existsSync(dst)) { skip++; continue; }
        let sym = null;
        try { sym = JSON.parse(fs.readFileSync(path.join(SRC, C, "px", t + ".json"), "utf8")).sym; } catch (_e) { sym = null; }
        if (!sym) { miss++; continue; }
        const x = await one(sym, from);
        if (!x) { miss++; continue; }
        fs.writeFileSync(dst, JSON.stringify(x));
        ok++;
        if ((ok + miss) % 200 === 0) console.log("  " + C + " " + (ok + miss) + "/" + ts.length);
      }
    }));
    console.log(C + ": 받음 " + ok + " · 이미 있음 " + skip + " · 실패 " + miss + " / " + ts.length);
  }
})();
