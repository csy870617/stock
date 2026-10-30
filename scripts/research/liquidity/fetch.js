#!/usr/bin/env node
// 유동성 연구 자료 받기(PREREG.md) — FRED 그래프 CSV·야후 일봉·금융투자협회 증시자금·한국은행 ECOS(공개 견본 키)
// 사용: node scripts/research/liquidity/fetch.js <캐시 폴더>   → <캐시>/fred.json · yahoo.json · kofia.json · ecos.json
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const OUT = path.resolve(process.argv[2] || "liq-cache");
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const curl = (args) => new Promise((res) => execFile("curl", ["-s", "--max-time", "60"].concat(args), { maxBuffer: 256 << 20 }, (e, out) => res(e ? null : String(out))));

async function fred(id) {
  for (let i = 0; i < 3; i++) {
    const t = await curl(["https://fred.stlouisfed.org/graph/fredgraph.csv?id=" + id]);   // 브라우저 흉내 UA 엔 빈 응답 — curl 기본값
    if (t && t.indexOf("observation_date") === 0) {
      const m = {};
      t.trim().split("\n").slice(1).forEach((l) => { const [d, v] = l.split(","); const x = parseFloat(v); if (d && isFinite(x)) m[d] = x; });
      return m;
    }
    await sleep(1500 * (i + 1));
  }
  return null;
}
async function yahoo(sym, adj) {
  const p1 = Math.floor(Date.parse("2002-01-01T00:00:00Z") / 1000), p2 = Math.floor(Date.now() / 1000);
  for (let i = 0; i < 3; i++) {
    const t = await curl(["-A", "Mozilla/5.0", "https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&period1=" + p1 + "&period2=" + p2 + "&events=div%2Csplit"]);
    try {
      const r = JSON.parse(t).chart.result[0], q = r.indicators.quote[0], a = adj && r.indicators.adjclose && r.indicators.adjclose[0].adjclose;
      const off = (r.meta && r.meta.gmtoffset) || 0, m = {};
      r.timestamp.forEach((ts, k) => { const v = a ? a[k] : q.close[k]; if (v != null && isFinite(v) && v > 0) m[new Date((ts + off) * 1000).toISOString().slice(0, 10)] = v; });
      if (Object.keys(m).length > 100) return m;
    } catch (_e) { /* 다시 */ }
    await sleep(1500 * (i + 1));
  }
  return null;
}
async function kofia(obj, cols) {
  const m = {};
  const y1 = new Date().getUTCFullYear();
  for (let y = 2004; y <= y1; y++) {
    const body = JSON.stringify({ dmSearch: { tmpV40: "1000000", tmpV41: "1", tmpV1: "D", tmpV45: y + "0101", tmpV46: y + "1231", OBJ_NM: obj } });
    let ok = false;
    for (let i = 0; i < 3 && !ok; i++) {
      const t = await curl(["-X", "POST", "-H", "Content-Type: application/json", "-A", "Mozilla/5.0", "-d", body, "https://freesis.kofia.or.kr/meta/getMetaDataList.do"]);
      try { (JSON.parse(t).ds1 || []).forEach((r) => { const d = String(r.TMPV1); m[d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6, 8)] = cols.map((c) => r[c]); }); ok = true; } catch (_e) { await sleep(1500); }
    }
  }
  return m;
}
// 견본 키는 한 번에 10줄 — 쪽마다 받되, 중간에 빈 응답(속도 제한)이면 쉬었다가 다시(전체 건수까지)
async function ecos(stat, item, from) {
  const to = new Date().toISOString().slice(0, 7).replace("-", ""), m = {};
  let total = null;
  for (let s = 1; s < 2000; s += 10) {
    if (total != null && s > total) break;
    let r = [];
    for (let i = 0; i < 6; i++) {
      const t = await curl(["https://ecos.bok.or.kr/api/StatisticSearch/sample/json/kr/" + s + "/" + (s + 9) + "/" + stat + "/M/" + from + "/" + to + "/" + item]);
      try { const j = JSON.parse(t).StatisticSearch || {}; r = j.row || []; if (j.list_total_count) total = j.list_total_count; } catch (_e) { r = []; }
      if (r.length) break;
      await sleep(2000 * (i + 1));
    }
    r.forEach((x) => { const v = parseFloat(x.DATA_VALUE); if (isFinite(v)) m[x.TIME.slice(0, 4) + "-" + x.TIME.slice(4, 6)] = v; });
    if (!r.length || (total == null && r.length < 10)) break;
    await sleep(300);
  }
  return m;
}

(async () => {
  if (process.argv.includes("--only-ecos")) {
    const E = { m2: await ecos("161Y005", "BBHS00", "200310"), corp3: await ecos("721Y001", "7020000", "200301"), ktb3: await ecos("721Y001", "5020000", "200301"), cd91: await ecos("721Y001", "2010000", "200301") };
    console.log("ECOS " + Object.keys(E).map((k) => k + " " + Object.keys(E[k]).length).join(" · "));
    fs.writeFileSync(path.join(OUT, "ecos.json"), JSON.stringify(E));
    return;
  }
  const F = {};
  for (const id of ["WALCL", "WTREGEN", "RRPONTSYD", "M2SL", "CPIAUCSL", "TOTBKCR", "BAA10Y", "NFCI", "T10Y3M", "DFII10", "DTB3"]) {
    F[id] = await fred(id); console.log("FRED " + id + " " + (F[id] ? Object.keys(F[id]).length : "실패"));
  }
  fs.writeFileSync(path.join(OUT, "fred.json"), JSON.stringify(F));
  const Y = {};
  for (const [sym, adj] of [["SPY", true], ["^KS11", false], ["DX-Y.NYB", false], ["KRW=X", false], ["^VIX", false], ["^TNX", false], ["^IRX", false], ["HYG", true]]) {
    Y[sym] = await yahoo(sym, adj); console.log("야후 " + sym + " " + (Y[sym] ? Object.keys(Y[sym]).length : "실패"));
  }
  fs.writeFileSync(path.join(OUT, "yahoo.json"), JSON.stringify(Y));
  // 금융투자협회: 증시자금추이(투자자예탁금 TMPV2, 백만원) · 신용공여 잔고(신용융자 합계 TMPV2, 백만원)
  const K = { deposit: await kofia("STATSCU0100000060BO", ["TMPV2"]), margin: await kofia("STATSCU0100000070BO", ["TMPV2"]) };
  console.log("금융투자협회 예탁금 " + Object.keys(K.deposit).length + " · 신용융자 " + Object.keys(K.margin).length);
  fs.writeFileSync(path.join(OUT, "kofia.json"), JSON.stringify(K));
  const E = { m2: await ecos("161Y005", "BBHS00", "200310"), corp3: await ecos("721Y001", "7020000", "200301"), ktb3: await ecos("721Y001", "5020000", "200301"), cd91: await ecos("721Y001", "2010000", "200301") };
  console.log("ECOS " + Object.keys(E).map((k) => k + " " + Object.keys(E[k]).length).join(" · "));
  fs.writeFileSync(path.join(OUT, "ecos.json"), JSON.stringify(E));
})();
