#!/usr/bin/env node
// 주제 기준 연구 — 한국 데이터 수집(2026-10-17). 결과·결정은 docs/HISTORY.md '주제 기준 연구'.
// 사용: node scripts/research/theme/fetch-kr.js <캐시 폴더>   (재실행하면 받은 것은 건너뛴다)
//   1) 유니버스: 네이버 시가총액 순위 KOSPI·KOSDAQ 전 종목(현재 상장 — 생존편향)
//   2) 네이버 기업현황(WiseReport) 연간 주요재무 — 최근 5년 실적(+3년 추정): 매출·영업이익·순이익(지배)·자산·부채·자본·
//      영업현금흐름·CAPEX·FCF·이자발생부채·EPS·BPS·DPS·배당성향·발행주식수·WICS 업종
//      (KRX 정보데이터시스템의 과거 PER·PBR·배당은 2026-10 현재 로그인 필요로 막혀 있어 5년 표본이 한계)
//   3) 야후 월봉(.KS/.KQ, 2010-01~): 수정종가(분할+배당 — 한국 배당도 반영됨을 확인)
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("./lib");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const KR = path.join(DIR, "kr");
fs.mkdirSync(path.join(KR, "wise"), { recursive: true });
fs.mkdirSync(path.join(KR, "px"), { recursive: true });
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const MOBILE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function parseWiseTable(html) {
  const trs = html.match(/<tr[\s\S]*?<\/tr>/g) || [];
  let cols = null; const rows = {};
  for (const tr of trs) {
    const cells = (tr.match(/<t[hd][\s\S]*?<\/t[hd]>/g) || []).map((c) => c.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim());
    if (!cells.length) continue;
    if (!cols && cells.filter((c) => /^\d{4}\/\d{2}/.test(c)).length >= 3) {
      cols = cells.filter((c) => /^\d{4}\/\d{2}/.test(c)).map((c) => ({ title: c.slice(0, 7), est: /\(E\)/.test(c) }));
      continue;
    }
    if (cols && cells.length === cols.length + 1 && !rows[cells[0]]) rows[cells[0]] = cells.slice(1).map(L.num);
  }
  return cols ? { cols, rows } : null;
}

(async () => {
  const uFile = path.join(KR, "universe.json");
  let uni = L.readJson(uFile, null);
  if (!uni) {
    uni = [];
    for (const mk of ["KOSPI", "KOSDAQ"]) {
      for (let p = 1; p <= 30; p++) {
        const j = await L.getJson("https://m.stock.naver.com/api/stocks/marketValue/" + mk + "?page=" + p + "&pageSize=100", MOBILE);
        const st = (j && j.stocks) || [];
        if (!st.length) break;
        st.filter((s) => s.stockEndType === "stock" && /0$/.test(s.itemCode) && !/스팩|SPAC/i.test(s.stockName))
          .forEach((s) => uni.push({ t: s.itemCode, name: s.stockName, market: mk, mcap: L.num(s.marketValueRaw) }));
      }
    }
    L.writeJson(uFile, uni);
  }
  log("유니버스 " + uni.length);

  let wdone = 0, wfail = 0;
  await L.mapLimit(uni, 6, async (u) => {
    const f = path.join(KR, "wise", u.t + ".json");
    if (fs.existsSync(f)) { wdone++; return; }
    const page = await L.getText("https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=" + u.t, L.DESKTOP);
    const enc = page && (page.match(/encparam\s*[:=]\s*['"]([^'"]+)/) || [])[1];
    const wics = page ? ((page.match(/WICS\s*:\s*([^&<]+)/) || [])[1] || "").trim() : "";
    if (!enc) { wfail++; L.writeJson(f, { t: u.t, none: true, wics }); return; }
    const sum = await L.getText("https://navercomp.wisereport.co.kr/v2/company/ajax/cF1001.aspx?cmp_cd=" + u.t + "&fin_typ=0&freq_typ=Y&encparam=" + enc + "&id=", L.DESKTOP,
      ["-e", "https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=" + u.t]);
    const T = sum && parseWiseTable(sum.slice(sum.indexOf("주요재무정보") >= 0 ? sum.indexOf("주요재무정보") : 0));
    if (!T) { wfail++; L.writeJson(f, { t: u.t, none: true, wics }); return; }
    L.writeJson(f, { t: u.t, wics, cols: T.cols, rows: T.rows });
    if (++wdone % 200 === 0) log("기업현황 " + wdone + "/" + uni.length + " (실패 " + wfail + ")");
  });
  log("기업현황 완료 " + wdone + " · 실패 " + wfail);

  let pdone = 0, pfail = 0;
  await L.mapLimit(uni, 5, async (u) => {
    const f = path.join(KR, "px", u.t + ".json");
    if (fs.existsSync(f)) { pdone++; return; }
    const o = await L.yahooMonthly(u.t + (u.market === "KOSPI" ? ".KS" : ".KQ"));
    if (!o) { pfail++; L.writeJson(f, { sym: u.t, none: true }); return; }
    L.writeJson(f, o);
    if (++pdone % 250 === 0) log("야후 " + pdone + "/" + uni.length + " (실패 " + pfail + ")");
  });
  log("야후 완료 " + pdone + " · 실패 " + pfail);
})().catch((e) => { console.error("fetch-kr 실패:", e && e.stack || e); process.exit(1); });
