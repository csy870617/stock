#!/usr/bin/env node
// 히든 기준 과거 성적(사전 등록 PREREG.md) — 주제 기준 연구 캐시에 없는 자료를 더 받는다.
//   ① 한국 재무상태표 연간 현금및현금성자산·단기금융자산(억 원) — screen-hidden.js cashKR 과 같은 출처(기업현황 cF3002)
//   ② 지수 월봉: SPY·IJR(미국), 069500.KS(KODEX 200)
// 사용: node fetch-extra.js <theme 캐시>  → <캐시>/kr/cash/<코드>.json · <캐시>/idx/<심볼>.json
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("../theme/lib");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

async function cashOf(t) {
  const page = await L.getText("https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=" + t, L.DESKTOP);
  const enc = page && (page.match(/encparam\s*[:=]\s*['"]([^'"]+)/) || [])[1];
  if (!enc) return { none: "encparam" };
  const j = await L.getJson("https://navercomp.wisereport.co.kr/v2/company/cF3002.aspx?cmp_cd=" + t + "&frq=0&rpt=1&finGubun=MAIN&frqTyp=0&cn=&encparam=" + enc, L.DESKTOP,
    ["-e", "https://navercomp.wisereport.co.kr/v2/company/c1030001.aspx?cmp_cd=" + t]);
  if (!j || !Array.isArray(j.DATA) || !Array.isArray(j.YYMM)) return { none: "cF3002" };
  const yy = j.YYMM.map((x) => String(x));
  const pick = (re) => { const r = j.DATA.find((d) => re.test(String(d.ACC_NM || "").replace(/\./g, ""))); return r ? yy.map((_, i) => L.num(r["DATA" + (i + 1)])) : null; };
  const cash = pick(/^현금및현금성자산$/), sti = pick(/^단기금융자산$/);
  const out = {};
  yy.forEach((y, i) => {
    if (/\(E\)|\(P\)/.test(y) || !/^\d{4}\/12/.test(y)) return;
    out[y.slice(0, 4)] = { cash: cash ? cash[i] : null, sti: sti ? sti[i] : null };
  });
  return { years: out };
}

(async () => {
  // ② 지수
  for (const sym of ["SPY", "IJR", "069500.KS"]) {
    const f = path.join(DIR, "idx", sym + ".json");
    if (fs.existsSync(f)) continue;
    const px = await L.yahooMonthly(sym);
    if (!px) { log("지수 실패 " + sym); continue; }
    L.writeJson(f, px); log("지수 " + sym + " " + px.d[0] + "~" + px.d[px.d.length - 1]);
  }
  // ① 한국 현금 — 기업현황이 있는 종목 중 지금 시총 500억~50조 원(과거 시총 범위를 넉넉히 덮는다)
  const uni = L.readJson(path.join(DIR, "kr", "universe.json"), []);
  const todo = uni.filter((u) => u.mcap >= 500e8 && u.mcap <= 50e12 && fs.existsSync(path.join(DIR, "kr", "wise", u.t + ".json")))
    .filter((u) => !fs.existsSync(path.join(DIR, "kr", "cash", u.t + ".json")));
  log("한국 현금 받을 종목 " + todo.length);
  let done = 0, fail = 0;
  await L.mapLimit(todo, Number(process.env.CONC || 6), async (u) => {
    const r = await cashOf(u.t);
    if (r.none) { fail++; return; }   // 실패는 쓰지 않는다 — 다시 돌리면 그 종목만 받는다
    L.writeJson(path.join(DIR, "kr", "cash", u.t + ".json"), r);
    if (++done % 200 === 0) log("  … " + done + "/" + todo.length + " (실패 " + fail + ")");
  });
  log("한국 현금 완료 " + done + " (실패 " + fail + ")");
})();
