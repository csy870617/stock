#!/usr/bin/env node
// 지난 스냅샷 줄에 빠진 소속 채우기(data/history.js) — 2026-11-07 전 snapshot.js 는 종목마다 tier 가 가장 낮은 카드 하나만 남겨,
//   두 주제에 있던 종목이 다른 주제에서 빠졌다(AAPL 관심 T1 + 우량 T2 → 관심만, 삼성화재 우량 T2 + 배당 T2 → 우량만). 그래서 성과 탭의
//   주제·티어 묶음, β 밴드, 편입·제외 기록, 과거 보기가 그 종목을 한 주제에서만 셌다.
// 기록일마다 그날 스냅샷을 쓴 커밋의 recommendations.js(git 이력 — generatedAt 이 그 기록일이고, 저장된 종목·주제·tier 가 맞는 가장 늦은 커밋)에서
//   같은 종목의 카드를 모두 찾아 ths 를 채우고 th·tier 를 지금 규칙의 대표 소속으로 맞춘다(lib-history.js — snapshot.js 가 그날 썼을 줄과 같게).
//   줄·종목을 지우거나 더하지 않고 가격·목표가·신호는 그대로 둔다. 몇 번 돌려도 같다(멱등) — 새 snapshot.js 가 쓴 줄은 바뀌지 않는다.
//   맞는 커밋을 못 찾은 기록일은 그대로 두고 알린다.
//   사용: node scripts/backfill-memberships.js [--dry]   → 이어서 node scripts/perf-track.js
//   얕은 클론이면 먼저: git fetch --shallow-since=2026-07-01 origin <배포 브랜치>
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const LH = require("./lib-history");

const ROOT = path.join(__dirname, "..");
const HIST = path.join(ROOT, "data", "history.js");
const INDEX = path.join(ROOT, "data", "history-index.js");
const RECO = "data/recommendations.js";
const DRY = process.argv.includes("--dry");
const git = (args, input) => execFileSync("git", args, { cwd: ROOT, input, maxBuffer: 1 << 30, stdio: [input == null ? "ignore" : "pipe", "pipe", "ignore"] });
const loadWin = (src, key) => { const w = {}; new Function("window", src)(w); return w[key]; };

const H = loadWin(fs.readFileSync(HIST, "utf8"), "STOCK_HISTORY") || [];
if (!H.length) { console.error("backfill-memberships: history.js 비어 있음"); process.exit(1); }

// ── 1. 후보 커밋 — history.js·recommendations.js 를 바꾼 커밋(최신 순)과 그때의 recommendations.js(같은 내용은 한 번만 읽는다) ──
const logOf = (file) => git(["log", "--format=%H", "HEAD", "--", file]).toString().trim().split("\n").filter(Boolean);
const histSet = new Set(logOf("data/history.js"));
const commits = Array.from(new Set(Array.from(histSet).concat(logOf(RECO))));
const blobOf = {};   // 커밋 → 그때 recommendations.js 의 blob(파일이 없던 커밋은 빠진다)
git(["cat-file", "--batch-check"], commits.map((h) => h + ":" + RECO).join("\n") + "\n").toString().trim().split("\n")
  .forEach((l, k) => { const f = l.split(" "); if (f[1] === "blob") blobOf[commits[k]] = f[0]; });
// 커밋 시각 — 같은 기록일 후보는 늦은 것부터 본다(git log 순서는 병합이 끼면 시각순이 아닐 수 있다)
const timeOf = {};
git(["log", "--format=%H %ct", "HEAD", "--", "data/history.js", RECO]).toString().trim().split("\n").forEach((l) => { const [h, t] = l.split(" "); timeOf[h] = +t; });
const blobs = Array.from(new Set(Object.values(blobOf)));
const byBlob = {};   // blob → {gen, G: {"국가:티커": 대표 순서 소속}} (못 읽으면 null)
{
  const buf = git(["cat-file", "--batch"], blobs.join("\n") + "\n");
  let pos = 0;
  while (pos < buf.length) {
    const nl = buf.indexOf(10, pos), head = buf.slice(pos, nl).toString().split(" ");
    const size = +head[2];
    if (!(size >= 0)) { pos = nl + 1; continue; }   // missing — 얕은 클론 등
    const src = buf.slice(nl + 1, nl + 1 + size).toString("utf8");
    pos = nl + 1 + size + 1;
    let v = null;
    try {
      const D = loadWin(src, "STOCK_DATA");
      if (D && D.generatedAt) {
        const G = {};
        Object.entries(LH.groupCards(D)).forEach(([k, g]) => { G[k] = g.ms; });
        v = { gen: D.generatedAt, G };
      }
    } catch (_e) { v = null; }
    byBlob[head[0]] = v;
  }
}
// 아직 커밋하지 않은 지금 파일 — 그날 기록을 방금 쓴 경우
let work = null;
try {
  const D = loadWin(fs.readFileSync(path.join(ROOT, RECO), "utf8"), "STOCK_DATA");
  if (D && D.generatedAt) { const G = {}; Object.entries(LH.groupCards(D)).forEach(([k, g]) => { G[k] = g.ms; }); work = { gen: D.generatedAt, G }; }
} catch (_e) { work = null; }

const cands = {};   // 기록일 → [{h, v, hist}] (history.js 를 바꾼 커밋 먼저, 그 안에선 늦은 것부터)
commits.forEach((h) => {
  const v = byBlob[blobOf[h]];
  if (v) (cands[v.gen] = cands[v.gen] || []).push({ h, v, hist: histSet.has(h) });
});
Object.values(cands).forEach((l) => l.sort((a, b) => (b.hist - a.hist) || (timeOf[b.h] || 0) - (timeOf[a.h] || 0)));

// ── 2. 기록일마다 맞는 커밋 — 종목 집합이 같고, 저장된 소속(주제·tier)이 모두 그날 카드에 있는 가장 늦은 커밋 ──
const key = (s) => s.c + ":" + s.t;
const sameTier = (a, b) => (a == null ? null : a) === (b == null ? null : b);
function fits(row, G) {
  if (row.stocks.length !== Object.keys(G).length) return false;
  return row.stocks.every((s) => {
    const g = G[key(s)];
    return !!g && LH.members(s).every((m) => g.some((x) => x[0] === m[0] && sameTier(x[1], m[1])));
  });
}
const sizes = (row) => {
  const n = {};
  row.stocks.forEach((s) => {
    const seen = {};
    LH.members(s).forEach((m) => {
      const ks = [s.c + "|" + m[0]];
      if (!LH.PERSONAL[m[0]]) { ks.push(s.c + "|정식"); if (m[1] != null) ks.push(s.c + "|tier:" + m[1]); }
      ks.forEach((k) => { if (!seen[k]) { seen[k] = 1; n[k] = (n[k] || 0) + 1; } });
    });
  });
  return n;
};
const before = JSON.stringify(H);
const lastBefore = sizes(H[H.length - 1]);
let changedRows = 0, added = 0, primary = 0;
const miss = [];
H.forEach((row) => {
  if (!row || !Array.isArray(row.stocks)) return;
  const list = (cands[row.date] || []).slice();
  if (work && work.gen === row.date) list.push({ h: "작업 트리", v: work });
  const hit = list.find((x) => fits(row, x.v.G));
  if (!hit) { miss.push(row.date + "(후보 " + list.length + ")"); return; }
  let changed = false;
  row.stocks.forEach((s) => {
    const own = LH.members(s), ms = LH.sortMembers(own.concat(hit.v.G[key(s)]));   // 이미 적힌 소속도 남긴다(지우지 않는다)
    added += ms.length - own.length;
    const p = ms[0];
    if (s.th !== p[0]) {
      s.th = p[0];
      if (p[1] == null) delete s.tier; else s.tier = p[1];
      primary++;
    }
    if (ms.length > 1) s.ths = ms; else delete s.ths;
    if (ms.length !== own.length) changed = true;
  });
  if (changed) changedRows++;
});

const lastAfter = sizes(H[H.length - 1]);
const diff = Object.keys(Object.assign({}, lastBefore, lastAfter)).filter((k) => lastBefore[k] !== lastAfter[k]).sort()
  .map((k) => k + " " + (lastBefore[k] || 0) + "→" + (lastAfter[k] || 0));
console.log("backfill-memberships: 기록 " + H.length + "일 · 소속을 더한 기록 " + changedRows + "일 · 더한 소속 " + added + "개 · 대표 주제를 바꾼 줄 " + primary + "개" +
  " (커밋 " + commits.length + "개, recommendations.js " + blobs.length + "판 읽음)");
console.log("  마지막 기록(" + H[H.length - 1].date + ") 묶음 크기: " + (diff.length ? diff.join(", ") : "변화 없음"));
if (miss.length) {
  console.log("  맞는 커밋을 못 찾아 그대로 둔 기록 " + miss.length + "일: " + miss.join(", "));
  try { if (git(["rev-parse", "--is-shallow-repository"]).toString().trim() === "true") console.log("  얕은 클론 — git fetch --shallow-since=2026-07-01 origin <배포 브랜치> 뒤 다시 돌린다"); } catch (_e) {}
}
if (DRY) { console.log("  --dry: 파일을 쓰지 않음"); process.exit(0); }
if (JSON.stringify(H) === before) { console.log("  바뀐 것 없음 — 파일을 쓰지 않음"); process.exit(0); }
LH.writeHistory(HIST, H);
LH.writeIndex(INDEX, H);
console.log("  data/history.js·history-index.js 다시 씀 — 이어서 node scripts/perf-track.js");
