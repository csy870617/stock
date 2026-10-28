#!/usr/bin/env node
// Top Pick 6차 — 미국 증권사별 목표가 이력(야후 upgradeDowngradeHistory): 애널리스트 기대(목표가 수준·변화)를 그때 자료로 재기 위한 캐시
// 사용: node scripts/research/top-pick/fetch-analyst-us.js <테마 캐시 폴더>
//   대상 = 패널(us/panel.json)에서 1~1000위에 한 번이라도 든 종목.
//   출력 <캐시>/us/analyst/<티커>.json = [[epoch초, 증권사, 등급 행동, 목표가 행동, 목표가, 이전 목표가], …](날짜순)
//   목표가는 발표 당시 값(분할 수정 전) — 검증 스크립트가 그 뒤 분할로 나눠 지금 단위로 바꾼다.
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const OUT = path.join(DIR, "us", "analyst");
fs.mkdirSync(OUT, { recursive: true });
const JAR = path.join(OUT, ".cookies.txt");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const curl = (args) => new Promise((res) => execFile("curl", ["-s", "--max-time", "25", "-A", UA].concat(args), { maxBuffer: 32 << 20 }, (e, out) => res(e ? null : out)));

let crumb = null;
async function newCrumb() {
  await curl(["-c", JAR, "-o", "/dev/null", "https://fc.yahoo.com"]);
  const c = await curl(["-b", JAR, "https://query2.finance.yahoo.com/v1/test/getcrumb"]);
  crumb = c && c.length < 40 && !/[<{\s]/.test(c.trim()) ? c.trim() : null;
  return crumb;
}
const num = (v) => (typeof v === "number" && isFinite(v) && v > 0 ? v : null);

async function one(t) {
  const f = path.join(OUT, t + ".json");
  if (fs.existsSync(f)) return "skip";
  const sym = t.toUpperCase().replace(".", "-");
  for (let k = 0; k < 4; k++) {
    if (!crumb) await newCrumb();
    const out = await curl(["-b", JAR, "https://query2.finance.yahoo.com/v10/finance/quoteSummary/" + encodeURIComponent(sym) + "?modules=upgradeDowngradeHistory&crumb=" + encodeURIComponent(crumb || "")]);
    let j = null;
    try { j = JSON.parse(out); } catch (_e) { j = null; }
    const r = j && j.quoteSummary && j.quoteSummary.result && j.quoteSummary.result[0];
    if (r) {
      const h = (r.upgradeDowngradeHistory && r.upgradeDowngradeHistory.history) || [];
      const rows = h.map((x) => [x.epochGradeDate, x.firm || "", x.action || "", x.priceTargetAction || "", num(x.currentPriceTarget), num(x.priorPriceTarget)])
        .filter((x) => x[0] > 0).sort((a, b) => a[0] - b[0]);
      fs.writeFileSync(f, JSON.stringify(rows));
      return "ok:" + rows.length;
    }
    const err = (j && ((j.quoteSummary && j.quoteSummary.error) || (j.finance && j.finance.error))) || null;
    const msg = err ? String(err.description || err.code || "") : String(out || "").slice(0, 80);
    if (/not found|no fundamentals|no data/i.test(msg)) { fs.writeFileSync(f, "[]"); return "none"; }
    if (/crumb|unauthori/i.test(msg)) crumb = null;
    await wait(1000 * (k + 1));
  }
  return "fail";
}

(async () => {
  const P = JSON.parse(fs.readFileSync(path.join(DIR, "us", "panel.json"), "utf8"));
  const ti = P.fields.indexOf("t"), ri = P.fields.indexOf("rank");
  const set = new Set();
  for (const r of P.rows) if (r[ri] <= 1000) set.add(r[ti]);
  const list = [...set].sort();
  console.log("대상 " + list.length + "종목");
  let k = 0, done = 0, rows = 0;
  const st = { ok: 0, skip: 0, none: 0, fail: 0 };
  const t0 = Date.now();
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (k < list.length) {
      const t = list[k++];
      const r = await one(t);
      done++;
      const key = r.split(":")[0]; st[key] = (st[key] || 0) + 1;
      if (key === "ok") rows += +r.split(":")[1];
      if (done % 100 === 0) console.log("… " + done + "/" + list.length + " " + JSON.stringify(st) + " 기록 " + rows + " " + ((Date.now() - t0) / 1000 | 0) + "s");
      await wait(150);
    }
  }));
  console.log("완료 " + JSON.stringify(st) + " 기록 " + rows + " " + ((Date.now() - t0) / 1000 | 0) + "s");
})();
