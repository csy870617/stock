"use strict";
// 증시자금(고객예탁금·신용잔고) 일별 — 네이버 증권 '증시자금동향'(금융투자협회 집계)에서 받아 data/deposit-daily.json 에 쌓는다(LLM 토큰 0).
//
// 2026-11-27: 금융투자협회 통계 사이트(freesis)가 자동 요청을 웹 방화벽으로 막기 시작했다(그날 03:00 UTC Action 부터 'web firewall security
//   policies … blocked' 응답 — 투자자예탁금·신용융자가 비어 돈의 흐름 한국 점수가 4개 지표로 계산되고 시장 심리의 신용융자가 빠졌다).
//   방화벽을 돌아가지 않고, 같은 금융투자협회 집계를 공개하는 네이버 증권 증시자금동향(stock.naver.com — 이 프로젝트의 다른 자료와 같은 곳)으로 바꿨다.
//   - 고객예탁금 = 금융투자협회 투자자예탁금과 같은 값(2016~2026 월말 비교 비율 1.0000).
//   - 신용잔고 = 금융투자협회 신용거래융자 합계(freesis 신용공여 잔고 TMPV2)의 98.1~99.9%(2016 0.997 → 2026 0.986 으로 천천히 줄었다 —
//     네이버 쪽이 조금 좁은 정의). 그래서 월말 이력도 이 값으로 다시 써 한 정의로 잇는다(update-liquidity-flow.js — 3개월 변화는 두 정의가 거의 같다).
//   쌓아 두는 이유: 받기에 실패해도 마지막으로 받은 값으로 계속 보이게 하고(날짜가 그대로 드러난다), 매번 24년치를 받지 않게(처음 한 번만).
//
// API: GET https://stock.naver.com/api/domestic/market/trendDeposit?startIdx=<쪽 번호>&pageSize=100 — 최신이 앞, 쪽마다 100영업일(최대 100),
//   항목 { bizdate:"YYYYMMDD", customerDeposit, creditLoan, … }(억원, 문자열). 공표는 영업일 다음 날 오후(금융투자협회 공표 뒤).
// 저장: { src, unit:"억원", cols:["날짜","고객예탁금","신용잔고"], updatedAt, rows:[[YYYYMMDD, 예탁금, 신용잔고], …](오래된 순) }
// 돌려주는 값은 예전 금융투자협회 자료와 같은 백만원 단위의 날짜 지도({ "2026-11-25": 83510700 }) — 쓰는 쪽 계산을 바꾸지 않게.
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const FILE = path.join(__dirname, "..", "data", "deposit-daily.json");
const API = "https://stock.naver.com/api/domestic/market/trendDeposit";
const PAGE = 100, MAX_PAGES = 80;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const curl = (args) => new Promise((res) => execFile("curl", ["-s", "--max-time", "30"].concat(args), { maxBuffer: 64 << 20 }, (e, out) => res(e ? null : String(out))));
const num = (s) => { const v = parseFloat(String(s == null ? "" : s).replace(/,/g, "")); return isFinite(v) ? v : null; };
const iso = (d) => { const s = String(d); return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8); };

function readCache(file) {
  try { const j = JSON.parse(fs.readFileSync(file || FILE, "utf8")); return j && Array.isArray(j.rows) ? j : null; } catch (_e) { return null; }
}
// 한 쪽 받기 — 실패(응답 없음·형식 다름)면 null, 비어 있으면 { rows: [], last: true }
async function fetchPage(page) {
  for (let i = 0; i < 3; i++) {
    const t = await curl(["-A", "Mozilla/5.0", API + "?startIdx=" + page + "&pageSize=" + PAGE]);
    try {
      const j = JSON.parse(t);
      if (j && Array.isArray(j.content)) {
        const rows = [];
        j.content.forEach((r) => {
          const d = String(r.bizdate || ""), dep = num(r.customerDeposit), mrg = num(r.creditLoan);
          if (/^\d{8}$/.test(d) && dep > 0 && mrg > 0) rows.push([+d, dep, mrg]);
        });
        return { rows, last: j.last === true || j.last === "true" || !j.content.length };
      }
    } catch (_e) { /* 다시 */ }
    await sleep(1500 * (i + 1));
  }
  return null;
}

// opts: full(처음부터 다시) · fresh(분 — 저장본이 그 안에 갱신됐으면 받지 않는다: 같은 실행의 두 번째 스크립트) · log
// → { dep, mrg(날짜 → 백만원), latest(마지막 날짜), fetched(이번에 받았나), stale(받기 실패 — 저장본만), pages, rows }
async function loadDeposit(opts) {
  opts = opts || {};
  const log = opts.log || (() => {});
  const cache = opts.full ? null : readCache(opts.file);
  const by = new Map((cache ? cache.rows : []).map((r) => [r[0], r]));
  const age = cache && cache.updatedAt ? (Date.now() - Date.parse(cache.updatedAt)) / 6e4 : Infinity;
  let fetched = false, stale = false, pages = 0;
  if (!(opts.fresh && age <= opts.fresh && by.size)) {
    // 최근 100영업일은 늘 다시 받는다(정정치) — 저장본 마지막 날보다 앞선 날까지 받았거나 마지막 쪽이면 멈춘다. 저장본이 없으면 끝까지.
    const lastHave = by.size ? Math.max(...by.keys()) : 0;
    for (let p = 0; p < MAX_PAGES; p++) {
      const pg = await fetchPage(p);
      if (!pg) { if (p === 0) stale = true; else log("  ⚠ 증시자금 " + p + "쪽 받기 실패 — 받은 데까지 쓴다"); break; }
      pages++;
      pg.rows.forEach((r) => by.set(r[0], r));
      if (pg.rows.length) fetched = true;
      const oldest = pg.rows.length ? Math.min(...pg.rows.map((r) => r[0])) : 0;
      if (pg.last || !pg.rows.length || (lastHave && oldest < lastHave)) break;
      await sleep(300);
    }
    if (fetched) {
      const rows = [...by.values()].sort((a, b) => a[0] - b[0]);
      const out = { src: "네이버 증권 증시자금동향(금융투자협회 집계) — scripts/lib-deposit.js", unit: "억원", cols: ["날짜", "고객예탁금", "신용잔고"],
        updatedAt: new Date().toISOString().slice(0, 19) + "Z", rows };
      fs.writeFileSync(opts.file || FILE, JSON.stringify(out));
    }
  }
  const dep = {}, mrg = {};
  [...by.values()].sort((a, b) => a[0] - b[0]).forEach((r) => { const d = iso(r[0]); dep[d] = r[1] * 100; mrg[d] = r[2] * 100; });   // 억원 → 백만원
  const ds = Object.keys(dep);
  return { dep: ds.length ? dep : null, mrg: ds.length ? mrg : null, latest: ds.length ? ds[ds.length - 1] : null, fetched, stale, pages, rows: ds.length };
}

module.exports = { loadDeposit, readCache, FILE };
