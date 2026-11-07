#!/usr/bin/env node
"use strict";
//
// WATCHLIST.md 회차 기록 정리 — '# 최근 회차 기록' 아래에서 KEEP_DAYS 일이 지난 섹션을
// archive/WATCHLIST-<YYYY-MM>.md 로 옮긴다 (토큰 0, 멱등).
//
//   node scripts/archive-watchlist.js            # 기본 7일 보존
//   node scripts/archive-watchlist.js --keep 10
//
// 왜: 회차마다 기록을 덧붙이기만 해서 WATCHLIST.md 가 479KB(2026-10-03)까지 커졌다. 세션마다 읽히는
//     파일이라 커지면 컨텍스트를 잠식한다. 2026-10-03 에 한 번 손으로 옮겼지만(→ 75KB) 규칙만으로는
//     다시 쌓이므로, A 회차 11단계에서 이 스크립트를 돌려 기계적으로 유지한다.
// 구조: '# 최근 회차 기록' 줄 위는 상태 섹션(보류·기각 후보 등) — 건드리지 않는다. 그 아래 '## …' 섹션 중
//      제목에 날짜(YYYY-MM-DD)가 있는 것만 나이를 따진다. 아카이브는 최신이 위, 같은 제목은 두 번 넣지 않는다.
// 2026-11-07: 상태 섹션 위에 잘못 들어간 회차 기록('## YYYY-MM-DD … 회차')은 아래로 옮기고, 최근 기록을 날짜 최신순
//      (같은 날은 U → 그 밖 → A — U 가 가장 늦게 돈다)으로 다시 세운다. 11-05 A 회차 기록이 상태 섹션 위에 들어가
//      영영 보관되지 않을 뻔했다.

const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "WATCHLIST.md");
const ARCH = path.join(ROOT, "archive");
const MARK = /^# 최근 회차 기록[^\n]*\n/m;

const ki = process.argv.indexOf("--keep");
const KEEP_DAYS = ki >= 0 ? Number(process.argv[ki + 1]) : 7;
const today = new Date().toISOString().slice(0, 10);
const cutoff = new Date(Date.parse(today + "T00:00:00Z") - KEEP_DAYS * 86400000).toISOString().slice(0, 10);

const src = fs.readFileSync(FILE, "utf8");
const m = src.match(MARK);
if (!m) { console.error("WATCHLIST.md 에 '# 최근 회차 기록' 줄이 없습니다 — 구조를 확인하세요(아무것도 바꾸지 않음)."); process.exit(1); }
const cut = m.index + m[0].length;
const title = (sec) => sec.split("\n", 1)[0];
const dateOf = (sec) => { const d = title(sec).match(/(20\d\d-\d\d-\d\d)/); return d ? d[1] : null; };
const ROUND = /^## .*20\d\d-\d\d-\d\d.*회차/;
// 표시 줄 위(상태 섹션 사이)에 들어간 회차 기록을 떼어 아래로 옮긴다
const topParts = src.slice(0, m.index).split(/^(?=## )/m);
const misplaced = topParts.filter((sec) => ROUND.test(title(sec)));
const top = topParts.filter((sec) => !ROUND.test(title(sec))).join("").replace(/\s*$/, "\n\n") + m[0];
const parts = src.slice(cut).split(/^(?=## )/m);
const lead = parts[0].startsWith("## ") ? "" : parts.shift();
const rank = (sec) => (/ U 회차/.test(title(sec)) ? 0 : / A 회차/.test(title(sec)) ? 2 : 1);
parts.push(...misplaced);
parts.sort((a, b) => ((dateOf(b) || "") > (dateOf(a) || "") ? 1 : (dateOf(b) || "") < (dateOf(a) || "") ? -1 : rank(a) - rank(b)));
if (misplaced.length) console.log("WATCHLIST.md: 상태 섹션 위에 있던 회차 기록 " + misplaced.length + "건을 '# 최근 회차 기록' 아래로 옮김 — " + misplaced.map(title).join(" / "));

const keep = [], old = {};
parts.forEach((sec) => {
  const d = dateOf(sec);
  if (!d || d >= cutoff) keep.push(sec);
  else (old[d.slice(0, 7)] = old[d.slice(0, 7)] || []).push(sec);
});
const desc = (a, b) => ((dateOf(b) || "") > (dateOf(a) || "") ? 1 : (dateOf(b) || "") < (dateOf(a) || "") ? -1 : 0);

let moved = 0;
Object.entries(old).forEach(([ym, secs]) => {
  fs.mkdirSync(ARCH, { recursive: true });
  const f = path.join(ARCH, "WATCHLIST-" + ym + ".md");
  const header = "# WATCHLIST 회차 기록 아카이브 — " + ym + "\n\n`WATCHLIST.md` 에서 " +
    "7일이 지난 회차 기록을 옮겨 둔 것(최신이 위). 현재 상태(보류·기각 후보 등)는 `WATCHLIST.md` 상단 상태 섹션이 기준이다.\n\n";
  const prev = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : header;
  const prevParts = prev.split(/^(?=## )/m);
  const prevHead = prevParts[0].startsWith("## ") ? header : prevParts.shift();
  const have = new Set(prevParts.map(title));
  const merged = prevParts.concat(secs.filter((x) => !have.has(title(x)))).sort(desc);
  moved += secs.length;
  fs.writeFileSync(f, prevHead.replace(/\s*$/, "\n\n") + merged.map((x) => x.replace(/\s*$/, "\n\n")).join("").replace(/\s*$/, "\n"));
});

const out = top + lead + keep.map((x) => x.replace(/\s*$/, "\n\n")).join("");
fs.writeFileSync(FILE, out.replace(/\s*$/, "\n"));
console.log("WATCHLIST.md: 회차 기록 " + keep.length + "건 유지 · " + moved + "건 archive/ 로 이동 (기준 " + cutoff +
  ", " + Math.round(Buffer.byteLength(src) / 1024) + "KB → " + Math.round(Buffer.byteLength(out) / 1024) + "KB)");
