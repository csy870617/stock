#!/usr/bin/env node
// 실적 충격 연구 — 과거 실적 발표일과 증권사 리포트 제목 받기(PREREG.md)
// 사용: node scripts/research/earn-shock/fetch-events.js <일봉 캐시(px/*.json 이 있는 폴더)> <출력 폴더> [kr|us|titles]
//   kr     : 네이버 공시 목록에서 '(연결재무제표기준)영업(잠정)실적' 공시 날짜 → <출력>/kr-events/<코드>.json
//   titles : 네이버 리서치 목록(제목·미리보기)                         → <출력>/kr-titles/<코드>.json
//   us     : SEC 제출 목록에서 8-K 항목 2.02(실적 발표) 접수 시각       → <출력>/us-events/<티커>.json
"use strict";
const fs = require("fs"), path = require("path"), { execFile } = require("child_process");
const [PXDIR, OUT, MODE] = process.argv.slice(2);
const SINCE = "2016-10-01";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const curl = (url, ua) => new Promise((res) => execFile("curl", ["-s", "--max-time", "25", "-A", ua || "Mozilla/5.0", "-H", "Accept: application/json", url], { maxBuffer: 64 << 20 }, (e, out) => { try { res(e ? null : JSON.parse(out)); } catch (_e) { res(null); } }));
async function get(url, ua) { for (let i = 0; i < 3; i++) { const j = await curl(url, ua); if (j) return j; await wait(700 * (i + 1)); } return null; }
const SEC_UA = "stock-dashboard-research admin@stock-dashboard.dev";
const list = fs.readdirSync(path.join(PXDIR)).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(PXDIR, f), "utf8"))).filter((j) => !j.bench).map((j) => ({ s: j.s, c: j.c }));

async function krEvents(code) {
  const raw = [];
  for (let p = 1; p <= 15; p++) {
    const j = await get("https://m.stock.naver.com/api/stock/" + code + "/disclosure?page=" + p + "&pageSize=100");
    if (!Array.isArray(j)) return null;
    if (!j.length) break;
    let oldest = "9999";
    j.forEach((x) => { const d = String(x.datetime || "").slice(0, 10); if (d && d < oldest) oldest = d; raw.push([d, String(x.datetime || ""), String(x.title || "")]); });
    if (oldest < SINCE || j.length < 100) break;
  }
  return raw.filter((x) => /영업\(잠정\)실적/.test(x[2]) && !/정정/.test(x[2]));
}
async function krTitles(code) {
  const out = [];
  for (let p = 1; p <= 40; p++) {
    const j = await get("https://m.stock.naver.com/api/research/stock/" + code + "?pageSize=20&page=" + p);
    if (!Array.isArray(j)) return out.length ? out : null;
    if (!j.length) break;
    let older = false;
    for (const x of j) { if (x.writeDate < SINCE) { older = true; continue; } out.push([x.writeDate, x.brokerName || "", x.title || "", String(x.previewContent || "").slice(0, 240)]); }
    if (older || j.length < 20) break;
  }
  return out;
}
let CIK = null;
async function usEvents(t) {
  if (!CIK) { const tj = await get("https://www.sec.gov/files/company_tickers.json", SEC_UA); CIK = {}; Object.values(tj || {}).forEach((x) => { CIK[String(x.ticker).toUpperCase()] = x.cik_str; }); }
  const cik = CIK[t.toUpperCase().replace(".", "-")] || CIK[t.toUpperCase()];
  if (!cik) return [];
  const pad = String(cik).padStart(10, "0");
  const sub = await get("https://data.sec.gov/submissions/CIK" + pad + ".json", SEC_UA);
  if (!sub) return null;
  const out = [];
  const take = (r) => { if (!r || !r.form) return; for (let i = 0; i < r.form.length; i++) if (/^8-K/.test(r.form[i]) && /2\.02/.test(r.items[i] || "")) out.push([r.acceptanceDateTime[i], r.filingDate[i]]); };
  take(sub.filings && sub.filings.recent);
  for (const f of (sub.filings && sub.filings.files) || []) {
    if (f.filingTo && f.filingTo < SINCE) continue;
    await wait(150);
    take(await get("https://data.sec.gov/submissions/" + f.name, SEC_UA));
  }
  return out.filter((x) => x[1] >= SINCE).sort();
}

(async () => {
  const sub = MODE === "us" ? "us-events" : MODE === "titles" ? "kr-titles" : "kr-events";
  const dir = path.join(OUT, sub); fs.mkdirSync(dir, { recursive: true });
  const todo = list.filter((x) => (MODE === "us" ? x.c === "us" : x.c === "korea"));
  let k = 0, done = 0, fail = 0; const t0 = Date.now();
  await Promise.all(Array.from({ length: MODE === "us" ? 2 : 4 }, async () => {
    while (k < todo.length) {
      const x = todo[k++], key = MODE === "us" ? x.s : x.s.slice(0, 6), f = path.join(dir, key + ".json");
      if (fs.existsSync(f)) { done++; continue; }
      const r = MODE === "us" ? await usEvents(x.s) : MODE === "titles" ? await krTitles(key) : await krEvents(key);
      if (r == null) fail++; else fs.writeFileSync(f, JSON.stringify(r));
      done++;
      if (done % 50 === 0) console.log("… " + done + "/" + todo.length + " 실패 " + fail + " " + ((Date.now() - t0) / 1000 | 0) + "s");
      await wait(MODE === "us" ? 250 : 80);
    }
  }));
  console.log("완료 " + sub + " " + done + "/" + todo.length + " 실패 " + fail);
})();
