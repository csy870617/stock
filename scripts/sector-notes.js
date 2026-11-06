#!/usr/bin/env node
"use strict";
//
// 섹터 흐름 분석 — 루틴 세션(CLAUDE.md §3-4c, `추세 설명 채워줘` 회차 끝에)이 웹 검색으로 쓰는 도구 (API 를 쓰지 않는다)
//   2026-11-06 사용자 '각 섹터 상세화면에 해당 섹터의 최근 흐름을 분석해서 함께 기록해줘'.
//
//   node scripts/sector-notes.js --queue [--max 10] [--out <폴더>]
//       분석이 필요한 섹터를 고르고 섹터마다 조사 묶음(<폴더>/<key>.md)과 목록(<폴더>/queue.json)을 쓴다.
//       순서: 분석 없음 → 흐름이 바뀜(지문 — 중기·장기 신호, 1개월 시장 대비 방향) → 이번 주 크게 움직임 → 7일 지남. 같은 순위면 한국·미국을 번갈아.
//   node scripts/sector-notes.js --apply <결과.json> [--queue <폴더>/queue.json]
//       서브에이전트가 돌려준 {key: {fp, headline, flow, watch, sources}} 를 검사해 data/sector-notes.js 에 쓴다.
//       검사(길이·가격 의존 수치·매매 지시·전망 문구·존댓말·차단 출처, 출처 1개 이상)에 걸린 headline·flow 는 그 섹터를 쓰지 않고,
//       watch 만 걸리면 그것만 뺀다.
//   node scripts/sector-notes.js --status
//
// 숫자(기간 등락·시장 대비·신호·52주 위치)는 data/sectors.js(update-indices.js — 매일 자동)가 맡고 앱이 그 숫자로 '숫자로 본 흐름'을 쓴다.
// 이 도구는 '왜 그렇게 움직였나'(기사로 확인한 원인)만 쓴다 — 추세 설명(trend-notes.js)처럼 하루 늦어도 되는 정보라 API 비용을 쓰지 않는다.
const fs = require("fs");
const path = require("path");
const { textProblems } = require("./trend-notes");
const { isBlockedSource, politeIn } = require("./validate-reco");

const ROOT = path.join(__dirname, "..");
const SECT = path.join(ROOT, "data", "sectors.js");
const OUT = path.join(ROOT, "data", "sector-notes.js");
const AGE_DAYS = 7;
const LIMIT = { headline: 60, flow: 300, flowMax: 420, watch: 140 };
const SIG_WORD = { "적극매수": "강한 상승세", "매수": "상승세", "중립": "횡보", "매도": "하락세", "적극매도": "강한 하락세" };
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 && args[i + 1] && !/^--/.test(args[i + 1]) ? args[i + 1] : d; };

function loadWin(file, key) {
  try { const w = {}; new Function("window", fs.readFileSync(file, "utf8"))(w); return w[key] || null; } catch (_e) { return null; }
}
const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (_e) { return null; } };
function sectors() {
  const S = loadWin(SECT, "SECTOR_TA") || {}, out = [];
  ["korea", "us"].forEach((c) => (S[c] || []).forEach((x) => out.push(Object.assign({ c }, x))));
  return { S, list: out };
}
function loadNotes() {
  const N = loadWin(OUT, "SECTOR_NOTES");
  return N && N.items ? N : { asOf: null, items: {} };
}
// 흐름 지문 — 중기·장기 신호와 1개월 시장 대비 방향(±5%p). 바뀌면 분석을 다시 쓴다(단기 신호는 하루에도 바뀌어 넣지 않는다)
function fpOf(x) {
  const rs = (x.facts && x.facts.rs && x.facts.rs.m1) || 0;
  return [(x.mid || {}).signal || "-", (x.long || {}).signal || "-", rs >= 5 ? "강" : rs <= -5 ? "약" : "비슷"].join("|");
}
// 이번 주 크게 움직였나 — 분석을 쓴 지 이틀 넘었고 1주 등락이나 1주 시장 대비가 크면 새 사건이 있었을 수 있다
function bigWeek(x) {
  const f = x.facts || {}, w1 = f.chg && f.chg.w1, r1 = f.rs && f.rs.w1;
  return (w1 != null && Math.abs(w1) >= 8) || (r1 != null && Math.abs(r1) >= 5);
}
const pct = (v, pp) => (v == null || !isFinite(v) ? "–" : (v > 0 ? "+" : "") + Number(v).toFixed(1) + (pp ? "%p" : "%"));

function packet(x, S, note, trends) {
  const f = x.facts || {}, ch = f.chg || {}, rs = f.rs || {}, rel = f.rel || {}, b = (S.bench || {})[x.c] || {};
  const L = [];
  L.push("# " + x.name + " (" + (x.c === "korea" ? "한국" : "미국") + " · " + x.etf + " ETF " + x.symbol + ")");
  L.push("기준일 " + x.asOf + " · 시장 " + (b.name || "") + " · fp `" + fpOf(x) + "`");
  L.push("");
  L.push("## 숫자(앱 화면 위쪽 표가 매일 새로 보인다 — 문장에 되풀이하지 않는다)");
  L.push("- 신호: 단기 " + (SIG_WORD[(x.short || {}).signal] || "–") + " · 중기 " + (SIG_WORD[(x.mid || {}).signal] || "–") + " · 장기 " + (SIG_WORD[(x.long || {}).signal] || "–"));
  L.push("- 등락(괄호 = 같은 기간 " + (b.name || "시장") + " 대비): 오늘 " + pct(ch.d1) + " · 1주 " + pct(ch.w1) + "(" + pct(rs.w1, 1) + ") · 1개월 " + pct(ch.m1) + "(" + pct(rs.m1, 1) + ") · 3개월 " +
    pct(ch.m3) + "(" + pct(rs.m3, 1) + ") · 올해 " + pct(ch.ytd) + "(" + pct(rs.ytd, 1) + ") · 1년 " + pct(ch.y1) + "(" + pct(rs.y1, 1) + ")");
  L.push("- 52주 범위 " + f.pos52 + "% 위치 · 50일선 " + pct(f.ma50) + " · 200일선 " + pct(f.ma200) + " · 60일 변동성 " + f.vol60 + "%(기록 " + (f.volYrs || 10) + "년 중 " + f.volPct + "백분위)");
  if (rel.bench) L.push("- 시장 상관 " + rel.bench.corr + " · β " + rel.bench.beta + "(최근 " + rel.weeks + "주 주간)");
  L.push("");
  L.push("## 관련 종목(앱 편성·관심·보유 중 — " + (rel.by === "ind" ? "WICS 업종이 같은 종목" : "시장 몫을 뺀 주간 상관이 큰 종목") + ")");
  if (!(rel.pos || []).length) L.push("- 없음");
  (rel.pos || []).forEach((y) => {
    const t = trends[y.t];
    L.push("- " + y.name + "(" + y.th + ") 상관 " + (rel.by === "ind" ? y.raw : y.corr) +
      (t && (t.cls === "상승" || t.cls === "하락") ? " · 현재 추세 " + t.cls + " " + t.from + "부터 " + pct(t.ret * 100) : ""));
  });
  if (note && note.headline) {
    L.push("");
    L.push("## 지난 분석(" + String(note.at || "").slice(0, 10) + ")");
    L.push("- " + note.headline);
    if (note.flow) L.push("- " + note.flow);
  }
  return L.join("\n") + "\n";
}

function queue() {
  const max = +opt("--max", 10) || 10, out = opt("--out", null);
  const { S, list } = sectors(), N = loadNotes(), now = Date.now();
  const T = loadWin(path.join(ROOT, "data", "trend-summary.js"), "TREND_SUMMARY"), trends = (T && T.items) || {};
  if (!list.length) { console.log("섹터 흐름 분석: data/sectors.js 없음 — update-indices.js 먼저"); return; }
  const q = [];
  let have = 0;
  list.forEach((x) => {
    const n = N.items[x.key], age = n && n.at ? (now - Date.parse(n.at)) / 864e5 : Infinity;
    if (n) have++;
    const why = !n ? 0 : n.fp !== fpOf(x) ? 1 : age >= 2 && bigWeek(x) ? 2 : age > AGE_DAYS ? 3 : -1;
    if (why >= 0) q.push({ x, n, why, age });
  });
  q.sort((a, b) => a.why - b.why || b.age - a.age || (a.x.key < b.x.key ? -1 : 1));
  const rank = {};
  q.forEach((y) => { const g = y.why + "|" + y.x.c; y.r = rank[g] = (rank[g] || 0) + 1; });
  q.sort((a, b) => a.why - b.why || a.r - b.r || (a.x.c === "korea" ? -1 : 1));
  const todo = q.slice(0, max);
  const WHY = ["분석 없음", "흐름 바뀜", "이번 주 크게 움직임", AGE_DAYS + "일 지남"];
  console.log("섹터 흐름 분석: 분석 있음 " + have + "/" + list.length + " · 필요 " + q.length + " → 이번 " + todo.length);
  todo.forEach((y) => console.log("  " + y.x.key + " " + y.x.name + " (" + WHY[y.why] + ")"));
  if (!out) return;
  fs.mkdirSync(out, { recursive: true });
  const ql = todo.map((y) => {
    const file = path.join(out, y.x.key + ".md");
    fs.writeFileSync(file, packet(y.x, S, y.n, trends));
    return { key: y.x.key, c: y.x.c, name: y.x.name, fp: fpOf(y.x), file };
  });
  fs.writeFileSync(path.join(out, "queue.json"), JSON.stringify(ql, null, 1));
  console.log("조사 묶음 " + ql.length + "개 → " + out + " (queue.json)");
}

const cleanSrc = (arr) => {
  const out = [];
  (Array.isArray(arr) ? arr : []).forEach((u) => {
    u = String(u || "").trim();
    if (!/^https?:\/\/[^\s/]+\.[^\s]+$/.test(u) || isBlockedSource(u) || out.includes(u)) return;
    out.push(u);
  });
  return out.slice(0, 4);
};
function check(k, t, max) {
  const p = textProblems(k, t, max), pol = politeIn(String(t || ""));
  if (pol) p.push(k + " 에 존댓말('" + pol + "')");
  // 기간 수익률은 화면 표가 매일 보인다 — 문장에 '1개월 -41%' 같은 숫자를 넣으면 며칠 뒤 어긋난다
  const m = String(t || "").match(/(?:1주|한 주|1개월|한 달|3개월|석 달|올해|연초\s*이후|1년)\s*(?:간|동안|새|사이)?\s*[+\-−]?\s*\d+(?:\.\d+)?\s*%/);
  if (m) p.push(k + " 에 기간 수익률 숫자('" + m[0] + "') — 표가 매일 보인다");
  return p;
}
function writeNotes(N) {
  N.asOf = new Date().toISOString().slice(0, 10);
  N.note = "섹터 흐름 분석 — 루틴 세션이 웹 검색으로 확인한 원인(scripts/sector-notes.js --apply). 숫자는 data/sectors.js(매일 자동)가 맡는다.";
  const items = {};
  Object.keys(N.items).sort().forEach((k) => { items[k] = N.items[k]; });
  N.items = items;
  fs.writeFileSync(OUT, "// 섹터 흐름 분석 — scripts/sector-notes.js 가 쓴다(루틴 세션의 웹 검색 결과를 검사해 반영). 앱 섹터 상세 '흐름 분석'.\n" +
    "window.SECTOR_NOTES = " + JSON.stringify(N) + ";\n");
}

function apply() {
  const resFile = opt("--apply", null), res = readJson(resFile);
  if (!res || typeof res !== "object") { console.error("결과 파일을 읽지 못했다: " + resFile); process.exitCode = 1; return; }
  const qf = opt("--queue", resFile ? path.join(path.dirname(resFile), "queue.json") : null), Q = {};
  (readJson(qf) || []).forEach((y) => { Q[y.key] = y; });
  const { list } = sectors(), byKey = {};
  list.forEach((x) => { byKey[x.key] = x; });
  const N = loadNotes(), notes = [];
  let ok = 0, skip = 0, dropped = 0;
  Object.keys(res).forEach((k) => {
    const r = res[k] || {}, x = byKey[k];
    if (!x) { skip++; notes.push(k + ": data/sectors.js 에 없는 섹터"); return; }
    const headline = String(r.headline || "").trim(), flow = String(r.flow || "").trim();
    const hp = check("headline", headline, LIMIT.headline), fp = check("flow", flow, LIMIT.flowMax);
    if (hp.length || fp.length) { skip++; notes.push(k + ": " + hp.concat(fp).join(" · ")); return; }
    if (flow.length > LIMIT.flow) notes.push(k + ": flow 가 김(" + flow.length + "자, " + LIMIT.flow + "자 권장) — 반영은 함");
    const src = cleanSrc(r.sources);
    if (!src.length) { skip++; notes.push(k + ": 출처 없음 — 쓰지 않음(기사로 확인한 원인만 쓴다)"); return; }
    let watch = String(r.watch || "").trim();
    if (watch) { const wp = check("watch", watch, LIMIT.watch); if (wp.length) { watch = ""; dropped++; notes.push(k + ": " + wp.join(" · ") + " — watch 만 뺌"); } }
    const q = Q[k];
    if (q && q.fp !== fpOf(x)) notes.push(k + ": 조사 뒤 흐름 지문이 바뀜(" + q.fp + " → " + fpOf(x) + ") — 반영하고 다음 회차에 다시 본다");
    N.items[k] = Object.assign({ at: new Date().toISOString().slice(0, 19) + "Z", asOf: x.asOf, fp: q ? q.fp : fpOf(x), by: "routine", headline, flow },
      watch ? { watch } : {}, { sources: src });
    ok++;
  });
  if (ok) writeNotes(N);
  console.log("섹터 흐름 분석 반영: " + ok + "섹터 · 건너뜀 " + skip + " · 뺀 항목 " + dropped + (ok ? " → data/sector-notes.js" : ""));
  notes.forEach((y) => console.log("  - " + y));
}

function status() {
  const { list } = sectors(), N = loadNotes(), now = Date.now();
  let have = 0, due = 0;
  list.forEach((x) => {
    const n = N.items[x.key];
    if (!n) { due++; return; }
    have++;
    const age = (now - Date.parse(n.at)) / 864e5;
    if (n.fp !== fpOf(x) || age > AGE_DAYS || (age >= 2 && bigWeek(x))) due++;
  });
  console.log("섹터 흐름 분석: " + have + "/" + list.length + "섹터 분석 보유 · 갱신 대상 " + due);
}

module.exports = { fpOf, bigWeek, LIMIT };
if (require.main === module) {
  if (args.includes("--apply")) apply();
  else if (args.includes("--queue")) queue();
  else status();
}
