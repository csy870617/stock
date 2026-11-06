#!/usr/bin/env node
// 지난 편출 카드 되살리기 — data/history-index.js 의 편출 기록(roster r)마다 git 이력에서 '빠지기 직전' recommendations.js 의
// 카드를 찾아 data/removed.json 에 넣는다(lib-removed.js). 사유는 같은 커밋의 candidate-notes.json 결격 판정 메모.
// 한 번 돌리면 되고(2026-11-06), 그 뒤로는 update-reco.js 가 remove 할 때마다 직접 남긴다.
//   사용: node scripts/backfill-removed.js [--since 2026-07-01]
//   얕은 클론이면 먼저: git fetch --filter=blob:none --shallow-since=2026-07-01 origin <배포 브랜치>
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { trimCard, defectNote, defectFlags, presentSet, load, save } = require("./lib-removed");

const ROOT = path.join(__dirname, "..");
const args = process.argv.slice(2);
const since = (args.indexOf("--since") >= 0 && args[args.indexOf("--since") + 1]) || "2026-07-01";
const git = (a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "ignore"] });

const w = {};
new Function("window", fs.readFileSync(path.join(ROOT, "data/history-index.js"), "utf8"))(w);
const roster = (w.HISTORY_INDEX && w.HISTORY_INDEX.roster) || [];
const removals = [];
roster.forEach((e) => (e.r || []).forEach((x) => { if (e.d >= since) removals.push({ d: e.d, c: x.c, t: x.t, n: x.n, th: x.th }); }));

// recommendations.js 를 바꾼 커밋 — 오래된 순
const commits = git(["log", "--reverse", "--format=%H %cI", "HEAD", "--", "data/recommendations.js"]).trim().split("\n")
  .map((l) => { const [h, iso] = l.split(" "); return { h, t: new Date(iso).toISOString() }; });
const cache = {};
function cardsAt(h) {
  if (cache[h]) return cache[h];
  const m = {};
  try {
    const ww = {};
    new Function("window", git(["show", h + ":data/recommendations.js"]))(ww);
    const D = ww.STOCK_DATA || {};
    ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => { m[c + "|" + s.ticker + "|" + s.theme] = s; }));
  } catch (_e) { /* 그 커밋의 파일이 깨졌으면 건너뛴다 */ }
  let notes = null, cands = null;
  try { notes = JSON.parse(git(["show", h + ":data/candidate-notes.json"])); } catch (_e) { notes = null; }
  try { const cw = {}; new Function("window", git(["show", h + ":data/candidates.js"]))(cw); cands = cw.CANDIDATES || null; } catch (_e) { cands = null; }
  return (cache[h] = { m, notes, cands });
}

const doc = load();
let found = 0, miss = [];
removals.forEach((r) => {
  const end = r.d + "T23:59:59.999Z";
  let i = commits.length - 1;
  while (i >= 0 && commits[i].t > end) i--;
  for (let k = 0; i >= 0 && k < 40; i--, k++) {
    const at = cardsAt(commits[i].h), card = at.m[r.c + "|" + r.t + "|" + r.th];
    if (!card) continue;
    const key = r.c + "|" + r.t, prev = doc.items[key];
    if (!prev || (prev.removedAt || "") <= r.d) {
      doc.items[key] = { c: r.c, t: r.t, n: card.name || r.n, th: r.th, tier: card.tier || null, removedAt: r.d,
        reason: defectNote(at.notes, r.c, r.th, r.t) || defectFlags(at.cands, r.c, r.th, r.t), card: trimCard(card) };
    }
    found++;
    return;
  }
  miss.push(r.d + " " + r.c + ":" + r.t + " " + r.n + "(" + r.th + ")");
});
const today = new Date().toISOString().slice(0, 10);
const cw = {};
new Function("window", fs.readFileSync(path.join(ROOT, "data/recommendations.js"), "utf8"))(cw);
const n = save(doc, today, presentSet(cw.STOCK_DATA || {}));
console.log("backfill-removed: 편출 기록 " + removals.length + "건 중 카드 " + found + "건 찾음 · 보관 " + n + "종목 → data/removed.json (커밋 " + Object.keys(cache).length + "개 읽음)");
if (miss.length) console.log("  못 찾음 " + miss.length + "건:\n   " + miss.slice(0, 30).join("\n   "));
