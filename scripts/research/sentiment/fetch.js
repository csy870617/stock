#!/usr/bin/env node
// 시장 심리 온도계 연구 자료 받기(PREREG.md) — 야후 일봉·FRED·금융투자협회 신용융자·한국은행 ECOS(CD 91일, 공개 견본 키)
// 사용: node scripts/research/sentiment/fetch.js <캐시 폴더>   → <캐시>/yahoo.json · fred.json · kofia.json · ecos.json
// 외국인 순매수는 저장소 data/market-flows.json(2016-05~)을 시험 때 읽는다.
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { US_SECTORS, KR_SECTORS } = require("../../lib-sentiment");

const OUT = path.resolve(process.argv[2] || "senti-cache");
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const curl = (args) => new Promise((res) => execFile("curl", ["-s", "--max-time", "60"].concat(args), { maxBuffer: 256 << 20 }, (e, out) => res(e ? null : String(out))));

async function yahoo(sym, adj) {
  const p1 = Math.floor(Date.parse("1990-01-01T00:00:00Z") / 1000), p2 = Math.floor(Date.now() / 1000);
  for (let i = 0; i < 4; i++) {
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
async function fred(id) {
  for (let i = 0; i < 3; i++) {
    const t = await curl(["https://fred.stlouisfed.org/graph/fredgraph.csv?id=" + id]);
    if (t && t.indexOf("observation_date") === 0) {
      const m = {};
      t.trim().split("\n").slice(1).forEach((l) => { const [d, v] = l.split(","); const x = parseFloat(v); if (d && isFinite(x)) m[d] = x; });
      return m;
    }
    await sleep(1500 * (i + 1));
  }
  return null;
}
async function kofia(obj, col, fromY) {
  const m = {}, y1 = new Date().getUTCFullYear();
  for (let y = fromY; y <= y1; y++) {
    const body = JSON.stringify({ dmSearch: { tmpV40: "1000000", tmpV41: "1", tmpV1: "D", tmpV45: y + "0101", tmpV46: y + "1231", OBJ_NM: obj } });
    for (let i = 0; i < 3; i++) {
      const t = await curl(["-X", "POST", "-H", "Content-Type: application/json", "-A", "Mozilla/5.0", "-d", body, "https://freesis.kofia.or.kr/meta/getMetaDataList.do"]);
      try { (JSON.parse(t).ds1 || []).forEach((r) => { const d = String(r.TMPV1), v = r[col]; if (isFinite(v)) m[d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6, 8)] = v; }); break; } catch (_e) { await sleep(1500); }
    }
  }
  return m;
}
async function ecos(stat, item, from) {   // 견본 키는 한 번에 10줄 — 쪽마다
  const to = new Date().toISOString().slice(0, 7).replace("-", ""), m = {};
  let total = null;
  for (let s = 1; s < 3000; s += 10) {
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
  const Y = {};
  const list = [["^GSPC", false], ["^VIX", false], ["SPY", true], ["IEF", true], ["^KS11", false], ["KRW=X", false]]
    .concat(US_SECTORS.map((s) => [s, false]), KR_SECTORS.map((s) => [s, false]));
  for (const [sym, adj] of list) {
    Y[sym] = await yahoo(sym, adj);
    const ks = Y[sym] ? Object.keys(Y[sym]).sort() : [];
    console.log("야후 " + sym + " " + (ks.length ? ks[0] + "~" + ks[ks.length - 1] + " " + ks.length : "실패"));
  }
  fs.writeFileSync(path.join(OUT, "yahoo.json"), JSON.stringify(Y));
  const F = {};
  // IR3TIB01KRM156N = OECD 한국 3개월 금리(CD 91일) 월별 — ECOS 가 막혔을 때 한국 무위험 수익 대체(2026-11-06 이 환경에서 ECOS 접속 실패)
  for (const id of ["BAA10Y", "DTB3", "IR3TIB01KRM156N"]) { F[id] = await fred(id); console.log("FRED " + id + " " + (F[id] ? Object.keys(F[id]).length : "실패")); }
  fs.writeFileSync(path.join(OUT, "fred.json"), JSON.stringify(F));
  const K = { margin: await kofia("STATSCU0100000070BO", "TMPV2", 2002) };
  const mk = Object.keys(K.margin).sort();
  console.log("금융투자협회 신용융자 " + (mk.length ? mk[0] + "~" + mk[mk.length - 1] + " " + mk.length : "실패"));
  fs.writeFileSync(path.join(OUT, "kofia.json"), JSON.stringify(K));
  const E = { cd91: await ecos("721Y001", "2010000", "200201") };
  console.log("ECOS CD91 " + Object.keys(E.cd91).length);
  fs.writeFileSync(path.join(OUT, "ecos.json"), JSON.stringify(E));
})();
