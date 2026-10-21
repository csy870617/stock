#!/usr/bin/env node
// 매일 결격 점검 + 주제별 후보 목록 — LLM 토큰 0 (순수 스크립트)
//
// 왜: 교체는 편출 종목에 결격이 있을 때만 한다(CLAUDE.md §5). 그런데 결격을 주 1회(C 모드)만 찾으면
//     추세 붕괴·주제 이탈·실적 쇼크가 생겨도 최대 일주일 늦게 바뀐다(2026-10-18 사용자 지시 '매일 결격 검사, 발생 시 바로 교체').
//     숫자로 판정되는 결격은 이 스크립트가 매일 찾고, 판단이 필요한 신호(실적 발표·급락·목표가 하향)는
//     '점검 필요'로 올려 A 회차 세션이 웹 검색으로 실질/형식을 가린다(§3-7).
//
// 입력: recommendations.js(편성) · stock-ta.js(엔진 신호) · events.js(실적 일정) · fundamentals.js(최근 분기)
//       · tp-history.json(목표가 변화) · chart/<ticker>.json(5일 수익률) · discovery-candidates.js(스크린 — 주제 기준·후보)
//       · candidate-notes.json(세션 판정 — 후보 상태·편성 결격 판정)
// 출력: data/candidates.js(앱 — 주제별 T3 아래 '후보 종목'과 편성 종목 결격 표시) + 콘솔 세션 큐
//
// 자동 신호(편성 정식 5주제 × 한·미):
//   (목표가 소진은 결격 사유가 아니다 — 2026-10-18 사용자 결정. 재검증 우선순위로만 쓴다: coverage.js)
//   trend 추세 붕괴 — 엔진 단·중·장기 신호 모두 '매도' 이하(§6)
//   theme 주제 기준 미달 — 스크린(discovery-candidates.js)의 편성 판정 fails
//   earn  실적 발표 직후(10일 안) — 가이던스·역성장 확인
//   drop  5거래일 수익률이 같은 나라 편성 종목 중앙값보다 12%p 이상 낮음 — 원인 확인(시장 전체 급락은 결격 신호가 아니다)
//   tpcut 컨센서스 목표가 14일 새 -10% 이상 하향 — 논거 훼손 확인
// 세션·AI 판정(candidate-notes.json defects[그룹][티커] = {verdict: 실질|형식|없음|보호, note, asOf, flags, triedAt, by?, sources?}):
//   '점검 필요'는 ai-defects.js(Claude API, 키가 있을 때 Action 이 매일)가 먼저 판정하고(by:"ai") 세션이 검토·교체한다.
//   판정이 덮는 신호(flags)에 없는 새 신호가 뜨면 다시 '점검 필요'가 된다.
//   실질 결격은 매 거래일(T) 대체 후보로 교체를 시도하고 triedAt 을 남긴다(대체가 없으면 결격 표시 유지).
//
// 사용법: node scripts/check-defects.js            # data/candidates.js 기록 + 세션 큐 출력
//         node scripts/check-defects.js --gate     # 점검 필요가 남았거나 오늘(T) 교체를 시도하지 않은 결격이 있으면 exit 1
//         node scripts/check-defects.js --baseline # 판정에 flags 가 없는 항목을 지금 신호로 채운다(초기화용)
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const NOTES = path.join(DATA, "candidate-notes.json");
const OUT = path.join(DATA, "candidates.js");
const THEMES = ["core", "growth", "value", "dividend", "rising"];
const COUNTRIES = ["korea", "us"];
const LIST_MAX = 12;           // 그룹당 앱에 보이는 후보 수(검증 통과·보류는 모두, 나머지는 스크린 점수순)
const EARN_DAYS = 10, DROP_PCT = -12, TPCUT_PCT = -10, TPCUT_DAYS = 14;
const BAD = new Set(["매도", "적극매도"]);
const opts = { gate: process.argv.includes("--gate"), baseline: process.argv.includes("--baseline") };

function load(file, key) {
  global.window = {};
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  delete require.cache[require.resolve(p)];
  require(p);
  return global.window[key] || null;
}
const D = load("recommendations.js", "STOCK_DATA");
const TA = load("stock-ta.js", "STOCK_TA") || {};
const EV = (load("events.js", "STOCK_EVENTS") || {}).items || {};
const FU = (load("fundamentals.js", "STOCK_FUND") || {}).items || {};
const SC = load("discovery-candidates.js", "DISCOVERY_CANDIDATES") || { groups: {} };
const notes = fs.existsSync(NOTES) ? JSON.parse(fs.readFileSync(NOTES, "utf8")) : { candidates: {}, defects: {} };
notes.candidates = notes.candidates || {}; notes.defects = notes.defects || {};
const tpHist = (() => { try { return JSON.parse(fs.readFileSync(path.join(DATA, "tp-history.json"), "utf8")); } catch (_e) { return null; } })();

const today = new Date().toISOString().slice(0, 10);
const T = TA.asOf || today;
const dayDiff = (a, b) => Math.round((Date.parse(a) - Date.parse(b)) / 86400000);
const screenFresh = SC.asOf && dayDiff(today, SC.asOf) <= 8;
const pct = (v) => (v == null || !isFinite(v) ? null : Math.round(v * 10) / 10);

// 지수 대표 대형주(§6 — 결격 없이 상승여력 축소·추세만으로 편출하지 않는다): 한국 삼성전자·SK하이닉스, 미국 스크린 시총 1·2위 편성 종목
const PROTECT = new Set(["korea:005930", "korea:000660"]);
(() => {
  const ranks = {};
  Object.keys(SC.groups || {}).filter((k) => k.indexOf("us|") === 0).forEach((k) =>
    (SC.groups[k].incumbents || []).forEach((r) => { if (r.rank) ranks[r.ticker] = r.rank; }));
  const usFormal = new Set(D.us.filter((s) => THEMES.includes(s.theme)).map((s) => s.ticker));
  Object.keys(ranks).filter((t) => usFormal.has(t)).sort((a, b) => ranks[a] - ranks[b]).slice(0, 2).forEach((t) => PROTECT.add("us:" + t));
})();

// 목표가 이력에서 14일 전 값(그날 이전 마지막 기록)과 최신 값
function tpChange(c, t) {
  if (!tpHist || !tpHist.days) return null;
  const key = c + ":" + t, cut = new Date(Date.parse(T) - TPCUT_DAYS * 86400000).toISOString().slice(0, 10);
  let old = null, cur = null;
  Object.keys(tpHist.days).sort().forEach((d) => {
    const v = tpHist.days[d][key];
    if (v == null) return;
    if (d <= cut) old = v;
    cur = v;
  });
  return old && cur ? (cur / old - 1) * 100 : null;
}
function ret5(t) {
  try {
    const j = JSON.parse(fs.readFileSync(path.join(DATA, "chart", t + ".json"), "utf8"));
    const d = j.d || [];
    if (d.length < 6) return null;
    return (d[d.length - 1][4] / d[d.length - 6][4] - 1) * 100;
  } catch (_e) { return null; }
}
// 시장 기준 — 같은 나라 전 종목(편성·관심·보유) 5일 수익률 중앙값
const MKT5 = {};
COUNTRIES.forEach((c) => {
  const v = [...new Set(D[c].map((s) => s.ticker))].map(ret5).filter((x) => x != null).sort((a, b) => a - b);
  MKT5[c] = v.length ? v[Math.floor(v.length / 2)] : 0;
});
function sigOf(t) {
  const x = (TA.ta || {})[t];
  return x ? [x.short && x.short.signal, x.mid && x.mid.signal, x.long && x.long.signal] : null;
}

// 편성 종목 한 개의 자동 신호
function flagsFor(c, th, s, screenRow) {
  const out = [], key = c + ":" + s.ticker, prot = PROTECT.has(key);
  const sg = sigOf(s.ticker);
  if (!prot && sg && sg.every((x) => BAD.has(x))) out.push({ k: "trend", hard: true, msg: "추세 붕괴(단·중·장기 모두 매도 이하)" });
  if (screenFresh && screenRow && screenRow.fails && screenRow.fails.length)
    out.push({ k: "theme", hard: true, msg: "주제 기준 미달 — " + screenRow.fails.join(", ") });
  // 실적 발표 직후 — 한국은 events.next(지난 날짜가 남아 있는 동안), 미국은 hist[0]
  const ev = EV[s.ticker] || {};
  const ed = c === "us" ? (ev.hist && ev.hist[0] && ev.hist[0].date) : (ev.next && ev.next.date);
  if (ed && ed <= T && dayDiff(T, ed) <= EARN_DAYS) {
    const fq = (FU[s.ticker] || {}).q || {};
    const neg = [];
    if (fq.rev && fq.rev.yoy != null && fq.rev.yoy < 0) neg.push("매출 " + pct(fq.rev.yoy) + "%");
    if (fq.op && fq.op.yoy != null && fq.op.yoy < 0) neg.push((fq.opLabel || "영업이익") + " " + pct(fq.op.yoy) + "%");
    const sur = c === "us" && ev.hist[0].pct != null ? " · EPS 서프라이즈 " + pct(ev.hist[0].pct) + "%" : "";
    out.push({ k: "earn", hard: false, since: ed, msg: "실적 발표(" + ed.slice(5).replace("-", "/") + ")" + sur + (neg.length ? " · 전년 대비 " + neg.join(", ") : "") + " — 가이던스·논거 확인" });
  }
  const r5 = ret5(s.ticker);
  if (r5 != null && r5 - MKT5[c] <= DROP_PCT)
    out.push({ k: "drop", hard: false, msg: "5거래일 " + pct(r5) + "%(시장 중앙값 " + pct(MKT5[c]) + "%) 급락 — 원인 확인" });
  const tc = tpChange(c, s.ticker);
  if (tc != null && tc <= TPCUT_PCT) out.push({ k: "tpcut", hard: false, msg: "컨센서스 목표가 " + TPCUT_DAYS + "일 새 " + pct(tc) + "% 하향 — 논거 확인" });
  return out;
}

// 후보 한 줄 요약(주제 기준에서 쓰는 사실 수치만)
function why(th, r) {
  const fx = r.fx || {}, a = [];
  const p = (label, v, unit) => { if (v != null && isFinite(v)) a.push(label + " " + pct(v) + (unit == null ? "%" : unit)); };
  if (th === "core") { p("3년 평균 ROIC", fx.roic3); p("매출 성장", fx.sg1 != null ? fx.sg1 : r.revG); p("주식 수 연", fx.iss); }
  else if (th === "growth") { p("3년 매출 연평균", fx.sg3); p("FCF 마진", fx.fcfm); p("3년 평균 ROIC", fx.roic3); }
  else if (th === "value") { p("EBIT/EV", fx.ebitev); p("FCF/시총", fx.fcfp); p("매출 성장", fx.sg1 != null ? fx.sg1 : r.revG); }
  else if (th === "dividend") { if (fx.streak != null) a.push("배당 비감소 " + fx.streak + "년"); p("배당성향", fx.payoutFy != null ? fx.payoutFy : r.payout); p("배당", r.divY); }
  else if (th === "rising") { p("3년 매출 연평균", r.revG3); p("3년 평균 ROIC", r.roicAvg); if (r.peg != null) a.push("PEG " + pct(r.peg)); }
  return a.slice(0, 3).join(" · ");
}
const shortName = (n) => String(n || "").replace(/,?\s+(Inc\.?|Corporation|Corp\.?|Co\.?|Ltd\.?|Limited|PLC|plc|N\.V\.|S\.A\.|SE|AG|Holdings?|Group|ADR|Company)\b\.?/g, "").replace(/\s{2,}/g, " ").trim();
function link(c, r) {
  if (c === "korea") return "https://m.stock.naver.com/domestic/stock/" + r.ticker + "/total";
  if (r.code) return "https://m.stock.naver.com/worldstock/stock/" + r.code + "/total";
  return "https://finance.yahoo.com/quote/" + encodeURIComponent(r.ticker);
}

const groups = {}, queue = { review: [], swap: [], formal: 0 };
let baselineTouched = 0;
COUNTRIES.forEach((c) => THEMES.forEach((th) => {
  const g = c + "|" + th, sg = (SC.groups || {})[g] || {};
  const members = D[c].filter((s) => s.theme === th);
  const memberSet = new Set(members.map((s) => s.ticker));
  const formalElsewhere = {};
  D[c].filter((s) => THEMES.includes(s.theme) && s.theme !== th).forEach((s) => { formalElsewhere[s.ticker] = s.theme; });
  const verdicts = notes.defects[g] || {};

  // ── 편성 결격
  const defects = [];
  members.forEach((s) => {
    const row = (sg.incumbents || []).find((r) => r.ticker === s.ticker);
    const fl = flagsFor(c, th, s, row);
    const v = verdicts[s.ticker];
    if (v && opts.baseline && !v.flags) { v.flags = fl.map((x) => x.k); baselineTouched++; }
    const covered = v && v.flags ? new Set(v.flags) : new Set();
    const fresh = fl.filter((x) => !covered.has(x.k));
    let state = null;
    if (v && v.verdict === "보호") state = fresh.some((x) => x.k === "earn" || x.k === "drop" || x.k === "tpcut") ? "점검 필요" : null;
    else if (fresh.length) state = "점검 필요";
    else if (v && v.verdict === "실질") state = "결격";
    else if (v && v.verdict === "형식") state = "감시";
    if (!state) return;
    const d = { ticker: s.ticker, name: s.name, state, flags: fl.map((x) => ({ k: x.k, msg: x.msg, fresh: !covered.has(x.k) })) };
    if (v && v.note) d.note = v.note;
    if (v && v.asOf) d.judged = v.asOf;
    if (v && v.verdict) d.verdict = v.verdict;
    if (v && v.triedAt) d.triedAt = v.triedAt;
    if (v && v.by) d.by = v.by;   // 판정 주체 — "ai"(ai-defects.js) 면 앱이 'AI 판정'으로 표시
    if (PROTECT.has(c + ":" + s.ticker)) d.prot = true;
    defects.push(d);
    if (state === "점검 필요") queue.review.push({ g, d, hard: fresh.some((x) => x.hard) });
    if (state === "결격") queue.swap.push({ g, d });
    if (state === "감시") queue.formal++;
  });
  const order = { "결격": 0, "점검 필요": 1, "감시": 2 };
  defects.sort((a, b) => order[a.state] - order[b.state]);

  // ── 후보 목록: 세션 판정(검증 통과·보류) → 스크린 상위(기각·편성 제외)
  const cn = notes.candidates[g] || {};
  const rows = (sg.candidates || []).map((r) => ({ r, near: false })).concat((sg.nearMiss || []).map((r) => ({ r, near: true })));
  const byT = {}; rows.forEach((x) => { if (!byT[x.r.ticker]) byT[x.r.ticker] = x; });
  const list = [];
  const push = (t, status, note, x, asOf) => {
    if (memberSet.has(t) || list.some((y) => y.ticker === t)) return;
    const r = x ? x.r : null;
    const it = { ticker: t, name: r ? (c === "us" ? shortName(r.name) : r.name) : (note && note.name) || t, status };
    if (note && note.note) it.note = note.note;
    if (asOf) it.asOf = asOf;
    if (r) { const w = why(th, r); if (w) it.why = w; if (x.near) it.near = (r.fails || []).join(", ") || "근접"; }
    if (formalElsewhere[t]) it.alsoIn = formalElsewhere[t];
    it.url = link(c, r || { ticker: t });
    list.push(it);
  };
  ["검증 통과", "보류", "검증 대기"].forEach((st) => Object.keys(cn).filter((t) => cn[t].status === st).forEach((t) => {
    const x = byT[t];
    push(t, st, Object.assign({ name: cn[t].name || (D[c].find((s) => s.ticker === t) || {}).name }, cn[t]), x, cn[t].asOf);
  }));
  rows.forEach((x) => {
    if (list.length >= LIST_MAX) return;
    const t = x.r.ticker;
    if (cn[t] && cn[t].status === "기각") return;
    if (cn[t]) return;   // 위에서 넣음
    push(t, "검증 대기", null, x);
  });
  groups[g] = { eligible: sg.eligible != null ? sg.eligible : null, defects, list };
}));

if (opts.baseline && baselineTouched) {
  fs.writeFileSync(NOTES, JSON.stringify(notes, null, 1) + "\n");
  console.log("candidate-notes.json — 판정 " + baselineTouched + "건에 현재 신호(flags) 기록");
}

const outObj = { asOf: today, T, screenAsOf: SC.asOf || null, screenFresh: !!screenFresh, groups,
  summary: { review: queue.review.length, defect: queue.swap.length, watch: queue.formal,
    untried: queue.swap.filter((x) => !(x.d.triedAt >= T)).length } };
fs.writeFileSync(OUT,
  "// 주제별 후보 종목 + 편성 결격 점검 — scripts/check-defects.js 가 생성(LLM 토큰 0). 앱 '추천 종목' 주제 화면의 T3 아래 '후보 종목'.\n" +
  "// groups[\"<country>|<theme>\"] = {defects 편성 결격(state 결격|점검 필요|감시), list 후보(status 검증 통과|보류|검증 대기)}\n" +
  "// 세션 판정은 data/candidate-notes.json(CLAUDE.md §3-7) — 이 파일을 직접 고치지 않는다.\n" +
  "window.CANDIDATES = " + JSON.stringify(outObj, null, 1) + ";\n");

console.log("candidates.js 기록 — T " + T + " · 스크린 " + (SC.asOf || "없음") + (screenFresh ? "" : "(8일 초과 — 주제 기준 신호 생략)") +
  " · 점검 필요 " + queue.review.length + " · 결격(교체 대기) " + queue.swap.length + " · 감시 " + queue.formal);
if (queue.review.length) {
  console.log("\n[점검 필요] 웹 검색으로 실질·형식·없음 판정 → candidate-notes.json defects 에 기록(flags = 판정한 신호)");
  queue.review.sort((a, b) => b.hard - a.hard).forEach((x) =>
    console.log("  " + x.g + " " + x.d.ticker + " " + x.d.name + (x.d.verdict ? " [기존 " + x.d.verdict + "]" : "") + " — " +
      x.d.flags.filter((f) => f.fresh).map((f) => f.msg).join(" / ")));
}
if (queue.swap.length) {
  console.log("\n[결격 — 교체 대기] 그룹의 '검증 통과' 후보부터 최종 확인 후 교체(§5·§3-7)");
  queue.swap.forEach((x) => {
    const ready = groups[x.g].list.filter((y) => y.status === "검증 통과").map((y) => y.name + "(" + y.ticker + ")");
    console.log("  " + x.g + " " + x.d.ticker + " " + x.d.name + (x.d.triedAt >= T ? " [교체 시도 " + x.d.triedAt + "]" : " [오늘 교체 시도 필요]") + " — " + (x.d.note || "") + " · 대체 " + (ready.length ? ready.join(", ") : "검증 통과 후보 없음 → 스크린 상위 검증"));
  });
}
if (opts.gate && (outObj.summary.review || outObj.summary.untried)) process.exit(1);
