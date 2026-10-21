#!/usr/bin/env node
// 선정 규칙 동결 지킴이 — 2026-10-21 ~ 2027-01-21(CLAUDE.md §6, 사용자 승인, LLM 토큰 0).
//
// 왜: 10/17~10/19 에 기준을 여러 번 바꾸고 하루 25종목을 교체해, 성과 기록으로 어떤 규칙이 맞는지 판단할 수 없게 됐다.
//   동결 중엔 주제 정의·스크린 RULES·점수 가중·결격 기준·히든 기준·그림자 규칙을 바꾸지 않는다. 문서 규칙만으로는
//   세션이 '개선'하다 모르고 바꿀 수 있어, 규칙이 든 파일의 지문을 기준선과 비교해 validate-reco.js 가 경고한다.
// 받아들일 수 있는 변경: ①명백한 버그·데이터 오류 수정 ②사전 등록 검증(§7 방식)을 통과하고 사용자가 승인한 변경 —
//   --accept 로 사유를 남기면 지금 상태가 새 기준선이 된다(HISTORY 에도 날짜·근거).
//
// 사용법: node scripts/rules-freeze.js                  # 상태 — 동결 중 기준선과 다른 것이 있으면 exit 1
//         node scripts/rules-freeze.js --accept "사유"   # 지금 상태를 새 기준선으로(사유 기록)
//         node scripts/rules-freeze.js --init            # 기준선 처음 만들기(기존 기록이 있으면 거부)
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "rules-freeze.json");
const FROM = "2026-10-21", UNTIL = "2027-01-21";
// 선정 결과를 바꾸는 파일 — 스크린(주제 정의·필터·점수)·히든 기준·결격 신호·신호 엔진(추세 붕괴)·그림자 규칙·검증 에이전트 지침
const FILES = [
  "scripts/screen-discovery.js", "scripts/screen-hidden.js", "scripts/screen-factors.js", "scripts/lib-factors.js",
  "scripts/check-defects.js", "scripts/lib-ta.js", "scripts/shadow-track.js",
  "docs/DEEP-AUDIT-AGENT.md", "docs/DEEP-DISCOVERY-AGENT.md",
];
const THEMES_KEY = "recommendations.js themes";
const PERSONAL = new Set(["watch", "hold"]);

const sha = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
// 줄 끝 공백·CRLF 차이는 무시(내용이 같으면 같은 지문)
const norm = (s) => s.replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "");
function loadThemes() {
  const w = {};
  try { new Function("window", fs.readFileSync(path.join(ROOT, "data", "recommendations.js"), "utf8"))(w); } catch (_e) { return null; }
  return ((w.STOCK_DATA || {}).themes || []).filter((t) => !PERSONAL.has(t.key));
}
function current(D) {
  const out = {};
  FILES.forEach((f) => { const p = path.join(ROOT, f); out[f] = fs.existsSync(p) ? sha(norm(fs.readFileSync(p, "utf8"))) : null; });
  const th = D ? (D.themes || []).filter((t) => !PERSONAL.has(t.key)) : loadThemes();
  out[THEMES_KEY] = th ? sha(JSON.stringify(th)) : null;
  return out;
}
function readState() { return fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : null; }
// validate-reco 가 부른다 — D(이미 읽은 recommendations)를 넘기면 주제 정의를 다시 읽지 않는다
function freezeStatus(D, today) {
  const st = readState();
  today = today || new Date().toISOString().slice(0, 10);
  if (!st) return { active: false, missingBaseline: true, changed: [] };
  const active = today >= st.from && today <= st.until;
  const cur = current(D), base = st.baseline || {};
  const changed = Object.keys(cur).filter((k) => cur[k] !== base[k]);
  return { active, from: st.from, until: st.until, changed, cur };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const today = new Date().toISOString().slice(0, 10);
  const write = (st) => fs.writeFileSync(OUT, JSON.stringify(st, null, 1) + "\n");
  if (args.includes("--init")) {
    if (readState()) { console.error("rules-freeze: 기준선이 이미 있다 — 바꾸려면 --accept \"사유\""); process.exit(1); }
    write({ from: FROM, until: UNTIL, note: "선정 규칙 동결(CLAUDE.md §6) — 아래 파일·주제 정의가 기준선과 다르면 validate-reco 가 경고한다. 받아들인 변경은 accepted 에 사유와 함께 남는다.",
      baseline: current(), accepted: [] });
    console.log("rules-freeze: 기준선 생성 — " + FILES.length + "개 파일 + 주제 정의 (" + FROM + " ~ " + UNTIL + ")");
    process.exit(0);
  }
  const ai = args.indexOf("--accept");
  if (ai >= 0) {
    const reason = (args[ai + 1] || "").trim();
    if (!reason || reason.startsWith("--")) { console.error("rules-freeze: --accept 뒤에 사유를 적는다(버그 수정·승인된 변경)"); process.exit(1); }
    const st = readState();
    if (!st) { console.error("rules-freeze: 기준선 없음 — 먼저 --init"); process.exit(1); }
    const fz = freezeStatus(null, today);
    if (!fz.changed.length) { console.log("rules-freeze: 기준선과 같다 — 받아들일 변경 없음"); process.exit(0); }
    st.accepted = (st.accepted || []).concat([{ at: today, items: fz.changed, reason }]);
    st.baseline = fz.cur;
    write(st);
    console.log("rules-freeze: 받아들임(" + today + ") — " + fz.changed.join(", ") + " · 사유: " + reason);
    process.exit(0);
  }
  const fz = freezeStatus(null, today);
  if (fz.missingBaseline) { console.log("rules-freeze: 기준선 없음(data/rules-freeze.json) — node scripts/rules-freeze.js --init"); process.exit(1); }
  const head = "rules-freeze: " + (fz.active ? "동결 중(" + fz.from + " ~ " + fz.until + ")" : "동결 기간 밖(" + fz.from + " ~ " + fz.until + ")");
  if (!fz.changed.length) { console.log(head + " — 기준선과 같다"); process.exit(0); }
  console.log(head + " — 기준선과 다른 것 " + fz.changed.length + "개:\n  - " + fz.changed.join("\n  - ") +
    "\n  버그 수정·승인된 변경이면 node scripts/rules-freeze.js --accept \"사유\", 아니면 되돌린다(CLAUDE.md §6).");
  process.exit(fz.active ? 1 : 0);
}

module.exports = { freezeStatus, FILES };
