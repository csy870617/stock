#!/usr/bin/env node
// 밀림 알림 — data/coverage-status.js 의 overdue(회전 항목이 주기+1일 넘게 밀림)가 있으면
// GitHub 이슈 '업데이트 요청 — 밀린 회전: …' 을 연다(이미 열린 같은 이슈가 있으면 코멘트만 갱신하지 않고 그대로 둔다).
// refresh-quotes Action 이 매일 coverage.js --emit 뒤에 부른다. 세션은 CLAUDE.md §2 에 따라 이 이슈를 처리한다
// (작성자 github-actions[bot] 이고 제목이 '업데이트 요청 — 밀린 회전' 인 이슈만 주인 이슈와 같게 다룬다).
// 2026-11-04 사용자 '원인을 직접 막을 수 있게' — 루틴 세션이 주간 발굴을 9일 미룬 일 뒤.
// 토큰 0. GITHUB_TOKEN·GITHUB_REPOSITORY 가 없으면(로컬) 무엇을 할지만 출력한다.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const TITLE = "업데이트 요청 — 밀린 회전";

const w = {};
try { new Function("window", fs.readFileSync(path.join(ROOT, "data/coverage-status.js"), "utf8"))(w); } catch (e) { console.log("backlog-alert: coverage-status 읽기 실패 — " + e.message); process.exit(0); }
const od = ((w.COVERAGE_STATUS || {}).overdue) || [];
if (!od.length) { console.log("backlog-alert: 밀린 회전 없음"); process.exit(0); }
const what = od.map((r) => r.label + " " + r.days + "일").join(" · ");
const title = TITLE + ": " + what;
const body = "자동 점검(coverage.js)에서 회전 항목이 주기(7일)를 넘겨 밀렸다: **" + what + "**.\n\n" +
  "다음 세션(A·U·주간 발굴 루틴)은 CLAUDE.md §2·§3-5 에 따라 이 항목을 먼저 처리한다 — 실제 한도(웹 검색 상한·문맥)에 걸리지 않았으면 미루지 않는다.\n" +
  "처리 뒤 `node scripts/coverage.js` 가 exit 0 이면 이 이슈를 닫는다.\n\n(refresh-quotes Action 의 scripts/backlog-alert.js 가 열었다)";
const tok = process.env.GITHUB_TOKEN, repo = process.env.GITHUB_REPOSITORY;
if (!tok || !repo) { console.log("backlog-alert: (로컬) 열 이슈 — " + title); process.exit(0); }
const H = { Authorization: "Bearer " + tok, Accept: "application/vnd.github+json", "User-Agent": "stock-backlog-alert" };
(async () => {
  const r = await fetch("https://api.github.com/repos/" + repo + "/issues?state=open&per_page=50", { headers: H });
  if (!r.ok) { console.log("::warning::backlog-alert: 이슈 목록 실패 " + r.status); return; }
  const open = (await r.json()).filter((i) => !i.pull_request && String(i.title).startsWith(TITLE));
  if (open.length) { console.log("backlog-alert: 이미 열린 이슈 #" + open[0].number + " — 그대로 둔다"); return; }
  const c = await fetch("https://api.github.com/repos/" + repo + "/issues", { method: "POST", headers: H, body: JSON.stringify({ title, body }) });
  console.log(c.ok ? "backlog-alert: 이슈 열음 — " + title : "::warning::backlog-alert: 이슈 열기 실패 " + c.status);
})().catch((e) => console.log("::warning::backlog-alert: " + e.message));
