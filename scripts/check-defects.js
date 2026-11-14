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
//   판정이 덮는 신호(flags)에 없는 새 신호가 뜨면 다시 '점검 필요'가 된다. 같은 종류라도 판정일이 이번 신호의 시작
//   (실적 발표일·5거래일 창 첫날·목표가 비교 기준일)보다 앞서면 지난 신호의 판정이라 덮지 않는다(2026-11-07 — 그 전엔 한 번
//   'earn' 을 판정하면 다음 분기 실적도 덮어 정식 72자리 중 42자리가 실적 점검에서 영영 빠졌다).
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
const THEMES = ["core", "growth", "value", "dividend"];   // 정식 편성(주목·관심·보유는 결격 점검 대상이 아니다)
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
// 스크린·판정 기록에 이름이 없는 후보는 검색 사전(tickers.js)에서 이름을 찾는다(코드만 보이지 않게)
let DICT = null;
function dictName(c, t) {
  if (!DICT) { DICT = new Map(); ((load("tickers.js", "TICKER_DICT")) || []).forEach((x) => { if (x && x.t && !DICT.has(x.c + "|" + x.t)) DICT.set(x.c + "|" + x.t, x.n); }); }
  return DICT.get(c + "|" + t) || null;
}
// 분산 상한(§5 ⑥) — update-reco.js 와 같은 비교(교체 전 대비 중복·그룹·금융이 늘고 상한을 넘으면 거부)로 후보를 미리 걸러 보인다
const { concentration, GROUP_CAP, FIN_CAP } = require("./validate-reco");
const CONC = concentration(D);
function capBlock(c, th, add, removeTicker) {
  const D2 = { korea: D.korea.slice(), us: D.us.slice() };
  if (removeTicker) D2[c] = D2[c].filter((s) => !(s.ticker === removeTicker && s.theme === th));
  D2[c].push({ ticker: add.ticker, name: add.name, theme: th });
  const A = concentration(D2), out = [];
  if (A.dup > CONC.dup) out.push("중복");
  Object.keys(A.groups.korea).forEach((gk) => { const a = A.groups.korea[gk]; if (a > (CONC.groups.korea[gk] || 0) && a > GROUP_CAP) out.push(gk + "그룹 상한"); });
  if (A.fin.korea > CONC.fin.korea && A.fin.korea > FIN_CAP) out.push("금융 상한");
  return out;
}

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
const R5FROM = {};   // 5거래일 수익률 창의 첫날(YYYY-MM-DD) — 'drop' 신호의 시작으로 쓴다
function ret5(t) {
  try {
    const j = JSON.parse(fs.readFileSync(path.join(DATA, "chart", t + ".json"), "utf8"));
    const d = j.d || [];
    if (d.length < 6) return null;
    const f = String(d[d.length - 6][0]); R5FROM[t] = f.slice(0, 4) + "-" + f.slice(4, 6) + "-" + f.slice(6, 8);
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

// 주제 기준 미달의 '걸린 조건' 키 — 스크린이 준 failKeys(2026-11-14~), 없으면(옛 스크린 출력) 문구에서 숫자를 뺀 글자.
//   문구의 숫자(순위·비율)는 매일 바뀌므로 조건의 종류만 본다.
function themeKeys(row) {
  if (Array.isArray(row.failKeys) && row.failKeys.length) return { scheme: "keys", keys: row.failKeys.slice().sort() };
  return { scheme: "text", keys: (row.fails || []).map((t) => String(t).replace(/[−-]?\d[\d.,]*%?p?/g, "#")).sort() };
}
// 편성 종목 한 개의 자동 신호
function flagsFor(c, th, s, screenRow) {
  const out = [], key = c + ":" + s.ticker, prot = PROTECT.has(key);
  const sg = sigOf(s.ticker);
  if (!prot && sg && sg.every((x) => BAD.has(x))) out.push({ k: "trend", hard: true, msg: "추세 붕괴(단·중·장기 모두 매도 이하)" });
  if (screenFresh && screenRow && screenRow.fails && screenRow.fails.length)
    out.push({ k: "theme", hard: true, msg: "주제 기준 미달 — " + screenRow.fails.join(", "), keys: themeKeys(screenRow) });
  // 실적 발표 직후 — 한국은 events.next(그날)·last(직전 발표 — 지난 일정은 update-events 가 last 로 남긴다), 미국은 hist[0]
  const ev = EV[s.ticker] || {};
  const ed = c === "us" ? (ev.hist && ev.hist[0] && ev.hist[0].date) : (ev.next && ev.next.date <= T ? ev.next.date : ev.last && ev.last.date);
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
    out.push({ k: "drop", hard: false, since: R5FROM[s.ticker], msg: "5거래일 " + pct(r5) + "%(시장 중앙값 " + pct(MKT5[c]) + "%) 급락 — 원인 확인" });
  const tc = tpChange(c, s.ticker);
  if (tc != null && tc <= TPCUT_PCT) out.push({ k: "tpcut", hard: false, since: new Date(Date.parse(T) - TPCUT_DAYS * 86400000).toISOString().slice(0, 10), msg: "컨센서스 목표가 " + TPCUT_DAYS + "일 새 " + pct(tc) + "% 하향 — 논거 확인" });
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
  return a.slice(0, 3).join(" · ");
}
const shortName = (n) => String(n || "").replace(/,?\s+(Inc\.?|Corporation|Corp\.?|Co\.?|Ltd\.?|Limited|PLC|plc|N\.V\.|S\.A\.|SE|AG|Holdings?|Group|ADR|Company)\b\.?/g, "").replace(/\s{2,}/g, " ").trim();
function link(c, r) {
  if (c === "korea") return "https://m.stock.naver.com/domestic/stock/" + r.ticker + "/total";
  if (r.code) return "https://m.stock.naver.com/worldstock/stock/" + r.code + "/total";
  return "https://finance.yahoo.com/quote/" + encodeURIComponent(r.ticker);
}

// 중복 편성(2026-10-21 사용자 승인 — 분산 가드레일): 같은 종목이 정식 주제 2곳 이상에 있으면 한 곳만 남기고
// 나머지 자리는 '중복' 결격으로 올린다(검색 없이 확정 — 같은 주제 후보로 교체). 남길 곳 = ①그 주제 스크린 기준을 통과하는 곳
// (fails 없음 — 예: SK하이닉스는 성장 필터 미달·우량 통과 → 우량) ②tier 가 높은(숫자 작은) 곳 ③주제 순서(우량→성장→저평가→배당).
// 앱(대표 종목 선택)·ai-daily(Top Pick 후보)도 이 판정을 그대로 따른다(candidates.js 의 dup).
const THEME_KO = { core: "우량", growth: "성장", value: "저평가", dividend: "배당" };
const DUP = {};
COUNTRIES.forEach((c) => {
  const occ = {};
  D[c].filter((s) => THEMES.includes(s.theme)).forEach((s) => { (occ[s.ticker] = occ[s.ticker] || []).push(s); });
  const fits = (s) => {
    if (!screenFresh) return 1;
    const row = (((SC.groups || {})[c + "|" + s.theme] || {}).incumbents || []).find((r) => r.ticker === s.ticker);
    return row && row.fails && row.fails.length ? 0 : 1;
  };
  Object.keys(occ).forEach((t) => {
    if (occ[t].length < 2) return;
    const keep = occ[t].slice().sort((a, b) => (fits(b) - fits(a)) || ((a.tier || 9) - (b.tier || 9)) || (THEMES.indexOf(a.theme) - THEMES.indexOf(b.theme)))[0];
    occ[t].forEach((s) => { if (s !== keep) DUP[c + ":" + s.theme + ":" + t] = keep.theme; });
  });
});
// 결격이 이어진 날수의 시작일 — 직전 candidates.js 의 since 를 이어받는다(판정을 다시 써도 시계가 초기화되지 않게).
// 실질 판정이 남은 채 새 신호로 '점검 필요'가 된 동안에도 since 를 적어 이어 간다(2026-11-07 — 그 전엔 결격 상태만 이어받아
// 점검 필요를 한 번 거치면 재판정일부터 다시 세었다: 에이피알 10-21 → 10-30, 14·28일 단계가 9일 늦어짐).
// 실질 판정이 풀렸다면(없음·형식) since 를 적지 않아 다음 결격은 새로 센다.
const PREV_SINCE = {};
(() => {
  const prev = load("candidates.js", "CANDIDATES");
  Object.keys((prev && prev.groups) || {}).forEach((g) => ((prev.groups[g] || {}).defects || []).forEach((d) => {
    if (d.since) PREV_SINCE[g + "|" + d.ticker] = d.since;
  }));
})();
// 단단한 신호(추세 붕괴·주제 기준 미달)가 '언제부터' 떴는지(2026-11-14 버그 수정) — 직전 candidates.js 의 hard 지도를 이어받는다.
//   예전엔 이 두 신호에 시작일이 없어, 판정에 "theme" 이 한 번 적히면 그 뒤 '다른 조건'이 새로 걸려도, 추세가 풀렸다 다시 무너져도 영영 덮였다
//   (정식 72자리 중 18자리가 그런 판정 — 주제 기준에 걸린 14자리 가운데 결격으로 다루는 것은 1자리). 판정은 자기보다 뒤에 새로 뜬 신호를 덮지 못한다:
//   추세 붕괴 = 이번 붕괴가 시작된 날, 주제 기준 미달 = 지금 걸린 조건 가운데 가장 늦게 걸리기 시작한 날. 판정일이 그날보다 앞서면 다시 '점검 필요'.
//   hard["<그룹>|<티커>"] = { trend: 날짜|"-", tvf, scheme: "keys"|"text", theme: { 조건 키: 날짜|"-" }, vf: { 조건 키: 지문 }, gone: { "trend"|"theme:<키>": [날짜, 마지막으로 본 날, 지문] } }
//   — "-" 는 '이 기록을 시작하기 전부터'(기준선). 지도가 아직 없는 첫 실행과, 스크린 출력이 글자 → 키로 바뀌는 날만 기준선으로 둔다
//   (그날 한꺼번에 다시 점검으로 올리지 않는다). 지도가 있는데 그 종목 기록이 없으면 '오늘 처음 걸린 것'이다(2026-11-14 검토 — 기록이 없다고
//   기준선으로 두면 통과하던 종목이 새로 걸려도, 뺐다가 다시 넣은 종목도 옛 판정이 덮는다).
//   · 판정할 수 없는 날(스크린이 8일 넘게 낡음·스크린에 그 종목 줄이 없음·신호 자료 없음)은 기록을 그대로 이어 둔다 — 지우면 다음에 기준선이나
//     '오늘'로 다시 적혀, 판정을 기다리던 조건이 아무도 보지 않은 채 덮이거나 전부 한꺼번에 다시 올라온다.
//   · 풀렸다가 GRACE_DAYS 안에 다시 걸린 조건은 처음 걸린 날을 되살린다(gone) — 문턱 근처를 오가는 종목(배당수익률 하한·시총 순위)이
//     오갈 때마다 다시 점검으로 올라오지 않게. 그보다 오래 풀려 있었으면 새로 걸린 것으로 본다.
//   · 날짜만으로는 같은 날 안의 순서를 알 수 없다 — 조건이 처음 보인 순간의 판정 지문(vf)을 함께 적어, 판정일이 그날과 같으면 판정이 그 뒤에
//     다시 쓰였을 때만(지문이 달라졌을 때만) 덮는다(아침 세션 판정 → 같은 날 저녁 스크린에서 새 조건이 걸리는 순서).
const PREV_CAND = load("candidates.js", "CANDIDATES");
const PREV_HARD = PREV_CAND && PREV_CAND.hard && typeof PREV_CAND.hard === "object" && !Array.isArray(PREV_CAND.hard) ? PREV_CAND.hard : null;
const PREV_T = (PREV_CAND && typeof PREV_CAND.T === "string" && PREV_CAND.T <= T && PREV_CAND.T) || T;   // 직전 실행의 기준일 — 풀린 조건을 '마지막으로 본 날'
const GRACE_DAYS = 14;
const isDay = (x) => typeof x === "string" && /^\d{4}-\d{2}-\d{2}$/.test(x);
const verdictFp = (v) => {   // 판정 지문 — 날짜·등급·신호·메모가 같으면 같은 판정
  if (!v) return "";
  const str = [v.asOf || "", v.verdict || "", (v.flags || []).join(","), v.note || ""].join("|");
  let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
};
const HARD = {};
// known = { trend: 기술 신호를 읽을 수 있었나, theme: 스크린이 이 종목을 판정했나 } — 판정 못 한 쪽은 이전 기록을 이어 둔다
function hardSince(g, ticker, fl, v, known) {
  const id = g + "|" + ticker, first = !PREV_HARD;
  const pr = (PREV_HARD && PREV_HARD[id] && typeof PREV_HARD[id] === "object" && PREV_HARD[id]) || {};
  const pg = pr.gone && typeof pr.gone === "object" ? pr.gone : {};
  const cur = {}, gone = {}, fp = verdictFp(v);
  const back = (k) => { const x = pg[k]; return Array.isArray(x) && isDay(x[1]) && dayDiff(T, x[1]) <= GRACE_DAYS ? x : null; };
  const tf = fl.find((x) => x.k === "trend"), hf = fl.find((x) => x.k === "theme" && x.keys);
  const used = {};
  // ── 추세 붕괴
  if (tf) {
    if (first) cur.trend = "-";
    else if (pr.trend) { cur.trend = pr.trend; if (pr.tvf != null) cur.tvf = pr.tvf; }
    else {
      const b = back("trend");
      if (b) { cur.trend = b[0]; if (b[2] != null) cur.tvf = b[2]; used.trend = 1; } else { cur.trend = T; cur.tvf = fp; }
    }
    if (isDay(cur.trend)) tf.sinces = [{ d: cur.trend, vf: cur.tvf }];
  } else if (pr.trend) {
    if (!known.trend) { cur.trend = pr.trend; if (pr.tvf != null) cur.tvf = pr.tvf; }
    else gone.trend = [pr.trend, PREV_T, pr.tvf != null ? pr.tvf : null];
  }
  // ── 주제 기준 미달(조건 키마다)
  const prevKeys = pr.theme && typeof pr.theme === "object" ? pr.theme : null, prevVf = (pr.vf && typeof pr.vf === "object" && pr.vf) || {};
  if (hf) {
    const same = !pr.scheme || pr.scheme === hf.keys.scheme, was = (same && prevKeys) || {};
    cur.scheme = hf.keys.scheme; cur.theme = {}; cur.vf = {};
    hf.keys.keys.forEach((k) => {
      if (first || !same) { cur.theme[k] = "-"; return; }
      if (was[k]) { cur.theme[k] = was[k]; if (prevVf[k] != null) cur.vf[k] = prevVf[k]; return; }
      const b = back("theme:" + k);
      if (b) { cur.theme[k] = b[0]; if (b[2] != null) cur.vf[k] = b[2]; used["theme:" + k] = 1; } else { cur.theme[k] = T; cur.vf[k] = fp; }
    });
    if (same) Object.keys(was).forEach((k) => { if (!(k in cur.theme)) gone["theme:" + k] = [was[k], PREV_T, prevVf[k] != null ? prevVf[k] : null]; });
    if (!Object.keys(cur.vf).length) delete cur.vf;
    hf.sinces = Object.keys(cur.theme).filter((k) => isDay(cur.theme[k])).map((k) => ({ d: cur.theme[k], vf: cur.vf && cur.vf[k] }));
  } else if (prevKeys) {
    if (!known.theme) { cur.scheme = pr.scheme; cur.theme = prevKeys; if (Object.keys(prevVf).length) cur.vf = prevVf; }
    else Object.keys(prevKeys).forEach((k) => { gone["theme:" + k] = [prevKeys[k], PREV_T, prevVf[k] != null ? prevVf[k] : null]; });
  }
  // 아직 유예 안인 '풀린 조건'은 이어 적는다(다시 걸려 되살린 것은 뺀다)
  Object.keys(pg).forEach((k) => { if (!used[k] && !(k in gone) && back(k)) gone[k] = pg[k]; });
  if (Object.keys(gone).length) cur.gone = gone;
  fl.forEach((x) => { if (x.sinces && x.sinces.length) x.since = x.sinces.map((y) => y.d).sort().pop(); else delete x.sinces; });
  if (cur.trend || cur.theme || cur.gone) HARD[id] = cur;
}
const minDate = (...xs) => xs.filter((x) => typeof x === "string" && /^\d{4}-\d{2}-\d{2}$/.test(x)).sort()[0] || null;
const LONG_DAYS = 14, LONGER_DAYS = 28;   // 실질 결격이 대체 없이 남은 기간 — 14일: 후보 범위 확대, 28일: 스크린 적격 후보로 교체(CLAUDE.md §3-7)
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
    hardSince(g, s.ticker, fl, v, { trend: !!sigOf(s.ticker), theme: !!(screenFresh && row && row.passesRule != null) });
    const dupKeep = DUP[c + ":" + th + ":" + s.ticker];
    if (dupKeep) {
      const d = { ticker: s.ticker, name: s.name, state: "결격", verdict: "실질",
        flags: [{ k: "dup", msg: "중복 편성 — " + THEME_KO[dupKeep] + " 주제에도 있어 분산이 줄어든다", fresh: false }],
        note: "중복 편성 — " + THEME_KO[dupKeep] + " 주제에 남기고 이 주제는 다른 종목으로 교체", dup: dupKeep };
      if (v && v.triedAt) d.triedAt = v.triedAt;
      d.since = minDate(PREV_SINCE[g + "|" + s.ticker], T); d.age = Math.max(0, dayDiff(T, d.since));
      if (d.age >= LONG_DAYS) d.long = d.age >= LONGER_DAYS ? 2 : 1;
      defects.push(d); queue.swap.push({ g, d });
      return;
    }
    if (v && opts.baseline && !v.flags) { v.flags = fl.map((x) => x.k); baselineTouched++; }
    // 판정이 덮는 신호 — 같은 종류이고, 신호에 시작일(since)이 있으면 판정일이 그날 이후일 때만(지난 신호의 판정은 덮지 않는다)
    //   단단한 신호(추세·주제)는 조건마다: 판정일이 그 조건이 걸린 날 이후이고, 그 조건이 처음 보인 순간에 있던 판정과 다른 판정일 때만
    //   (지문 비교 — 날짜로는 같은 날 안의 순서도, 주말처럼 판정일이 기준일 T 보다 뒤인 경우의 순서도 알 수 없다).
    //   '실질' 판정은 같은 종류의 단단한 신호가 더 걸려도 계속 덮는다 — 이미 결격인 종목이 조건이 하나 더 걸렸다고 '점검 필요'로 돌아가면
    //   교체 대기열·날수(☆★)에서 빠지고 Top Pick 결격 제외도 풀린다(2026-11-14 검토에서 확인한 되돌림).
    const fpNow = verdictFp(v);
    const covers = (x) => {
      if (!(v && v.flags && v.flags.includes(x.k))) return false;
      if (x.hard) return v.verdict === "실질" || !x.sinces || x.sinces.every((y) => !!v.asOf && v.asOf >= y.d && (y.vf == null || y.vf !== fpNow));
      return !x.since || !!(v.asOf && v.asOf >= x.since);
    };
    const fresh = fl.filter((x) => !covers(x));
    let state = null;
    // '보호'는 지수 대표 대형주(PROTECT)에만 통한다 — 다른 종목에 적힌 보호는 형식으로 읽는다(아무 종목이나 보호로 적어 신호를 숨기지 못하게)
    const prot = PROTECT.has(c + ":" + s.ticker), vv = v && v.verdict === "보호" && !prot ? "형식" : v && v.verdict;
    if (vv === "보호") state = fresh.some((x) => x.k === "earn" || x.k === "drop" || x.k === "tpcut") ? "점검 필요" : null;
    else if (fresh.length) state = "점검 필요";
    else if (vv === "실질") state = "결격";
    else if (vv === "형식") state = "감시";
    // 단단한 신호(추세 붕괴·주제 기준 미달)가 떠 있으면 '없음' 판정이어도 목록에서 사라지지 않는다 — 감시로 남긴다(CLAUDE.md §1-1b '없음 불가')
    else if (vv === "없음" && fl.some((x) => x.hard)) state = "감시";
    if (!state) return;
    // re = 판정에 같은 종류가 적혀 있는데도 다시 올라온 단단한 신호(판정 뒤에 새 조건이 걸렸거나 추세가 다시 무너짐) — 판정을 새로 써야 덮인다
    const d = { ticker: s.ticker, name: s.name, state, flags: fl.map((x) => {
      const fr = !covers(x), o = { k: x.k, msg: x.msg, fresh: fr };
      if (fr && x.hard && v && v.flags && v.flags.includes(x.k)) o.re = 1;
      return o;
    }) };
    if (v && v.note) d.note = v.note;
    if (v && v.asOf) d.judged = v.asOf;
    if (v && v.verdict) d.verdict = v.verdict;
    if (v && v.triedAt) d.triedAt = v.triedAt;
    if (v && v.by) d.by = v.by;   // 판정 주체 — "ai"(ai-defects.js) 면 앱이 'AI 판정'으로 표시
    if (PROTECT.has(c + ":" + s.ticker)) d.prot = true;
    if (state === "결격") {   // 대체 없이 남은 기간 — since(처음 실질 판정일)가 없으면 판정일
      const since = minDate(PREV_SINCE[g + "|" + s.ticker], v && v.since, v && v.asOf) || T;
      d.since = since; d.age = Math.max(0, dayDiff(T, since));
      if (d.age >= LONG_DAYS) d.long = d.age >= LONGER_DAYS ? 2 : 1;
    } else if (state === "점검 필요" && v && v.verdict === "실질") {   // 실질 결격이 이어지는 중 — 날수 시작일만 이어 적는다(표시 없음)
      d.since = minDate(PREV_SINCE[g + "|" + s.ticker], v.since, v.asOf) || T;
    }
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
    const it = { ticker: t, name: r ? (c === "us" ? shortName(r.name) : r.name) : (note && note.name) || dictName(c, t) || t, status };
    if (note && note.note) it.note = note.note;
    if (asOf) it.asOf = asOf;
    if (r) { const w = why(th, r); if (w) it.why = w; if (x.near) it.near = (r.fails || []).join(", ") || "근접"; }
    // 재무 팩터를 못 받은 후보(대개 IFRS 로 공시하는 외국 ADR) — 건전성 필터·점수를 판정할 수 없어 중립 점수로 올라온 것이라 표시한다(2026-11-14, 표시만 — 후보 순서·판정 불변)
    if (r && !r.fx) it.nofx = 1;
    if (formalElsewhere[t]) it.alsoIn = formalElsewhere[t];
    const cap = capBlock(c, th, it).filter((x) => x !== "중복");   // 중복은 alsoIn 으로 이미 보인다
    if (cap.length) it.cap = cap.join("·");
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
    push(t, x.near ? "근접 후보" : "검증 대기", null, x);   // 근접 후보 = 스크린 통과가 아니라 조건 하나를 문턱 가까이에서 못 채운 종목
  });
  groups[g] = { eligible: sg.eligible != null ? sg.eligible : null, defects, list };
}));

// 그룹에 없는 종목의 결격 판정(고아) — 다시 편입되면 옛 판정·since 가 그대로 살아나므로 세션이 지운다(2026-11-07 점검: UNH·AMZN 등 4건)
const ORPHANS = [];
COUNTRIES.forEach((c) => THEMES.forEach((th) => {
  const g = c + "|" + th, mem = new Set(D[c].filter((s) => s.theme === th).map((s) => s.ticker));
  Object.keys(notes.defects[g] || {}).forEach((t) => { if (!mem.has(t)) ORPHANS.push(g + " " + t + "(" + ((notes.defects[g][t] || {}).asOf || "?") + ")"); });
}));

if (opts.baseline && baselineTouched) {
  fs.writeFileSync(NOTES, JSON.stringify(notes, null, 1) + "\n");
  console.log("candidate-notes.json — 판정 " + baselineTouched + "건에 현재 신호(flags) 기록");
}

// 국가 정식 편성 β(보유 기준 — performance-report.js 와 같은 계산) — 밴드(0.7~1.3) 밖이면 교체 후보는 β 를 1 쪽으로 되돌리는 쪽만(§5 ⑤)
const BETA = (() => {
  try {
    const r = require("child_process").spawnSync(process.execPath, [path.join(__dirname, "performance-report.js"), "--json"], { encoding: "utf8", timeout: 60000 });
    const j = JSON.parse(r.stdout);
    const out = {};
    COUNTRIES.forEach((c) => { const b = j.held && j.held[c] && j.held[c].all && j.held[c].all.beta; if (b != null) out[c] = b; });
    return out;
  } catch (_e) { return {}; }
})();
const outObj = { asOf: today, T, screenAsOf: SC.asOf || null, screenFresh: !!screenFresh, beta: BETA, groups, hard: HARD,
  summary: { review: queue.review.length, defect: queue.swap.length, watch: queue.formal,
    untried: queue.swap.filter((x) => !(x.d.triedAt >= T)).length,
    dup: queue.swap.filter((x) => x.d.dup).length, long: queue.swap.filter((x) => x.d.long).length } };
fs.writeFileSync(OUT,
  "// 주제별 후보 종목 + 편성 결격 점검 — scripts/check-defects.js 가 생성(LLM 토큰 0). 앱 '추천 종목' 주제 화면의 T3 아래 '후보 종목'.\n" +
  "// groups[\"<country>|<theme>\"] = {defects 편성 결격(state 결격|점검 필요|감시), list 후보(status 검증 통과|보류|검증 대기|근접 후보)}\n" +
  "// 세션 판정은 data/candidate-notes.json(CLAUDE.md §3-7) — 이 파일을 직접 고치지 않는다.\n" +
  "window.CANDIDATES = " + JSON.stringify(outObj, null, 1) + ";\n");

console.log("candidates.js 기록 — T " + T + " · 스크린 " + (SC.asOf || "없음") + (screenFresh ? "" : "(8일 초과 — 주제 기준 신호 생략)") +
  " · 점검 필요 " + queue.review.length + " · 결격(교체 대기) " + queue.swap.length + " · 감시 " + queue.formal);
if (queue.review.length) {
  console.log("\n[점검 필요] 웹 검색으로 실질·형식·없음 판정 → candidate-notes.json defects 에 기록(flags = 판정한 신호)");
  queue.review.sort((a, b) => b.hard - a.hard).forEach((x) =>
    console.log("  " + x.g + " " + x.d.ticker + " " + x.d.name + (x.d.verdict ? " [기존 " + x.d.verdict + "]" : "") + " — " +
      x.d.flags.filter((f) => f.fresh).map((f) => f.msg + (f.re ? " ※판정 뒤 새로 걸림 — 판정을 다시 쓴다" : "")).join(" / ")));
}
if (queue.swap.length) {
  console.log("\n[결격 — 교체 대기] 그룹의 '검증 통과' 후보부터 최종 확인 후 교체(§5·§3-7)");
  COUNTRIES.forEach((c) => {
    const b = BETA[c];
    if (b == null) return;
    const out = b < 0.7 || b > 1.3;
    console.log("  · " + c + " 정식 편성 β " + b.toFixed(2) + (out ? " — 밴드(0.7~1.3) 밖: 배당 외 교체는 β 를 " + (b < 0.7 ? "높이는" : "낮추는") + " 후보만(vol-beta.js 로 확인)" : " — 밴드 안"));
  });
  queue.swap.forEach((x) => {
    // 이 자리와 맞바꿀 때 분산 상한에 걸리는 후보는 표시(update-reco 가 거부한다 — 다른 후보로)
    const ready = groups[x.g].list.filter((y) => y.status === "검증 통과").map((y) => {
      const blk = capBlock(x.g.split("|")[0], x.g.split("|")[1], y, x.d.ticker);
      return y.name + "(" + y.ticker + (blk.length ? " — " + blk.join("·") + "으로 불가" : "") + ")";
    });
    // 28일 규칙보다 β 허용 범위가 먼저(2026-11-07 사용자 결정) — 밴드 밖이면 β 를 1 쪽으로 되돌리는 후보만, 없으면 유지(배당 자리는 예외)
    const xc = x.g.split("|")[0], xb = BETA[xc], bOut = xb != null && (xb < 0.7 || xb > 1.3) && x.g.split("|")[1] !== "dividend";
    const esc = x.d.long === 2 ? " ★" + x.d.age + "일째 — 스크린 적격 후보로 교체(§3-7 28일 규칙)" + (bOut ? " · 단 β " + xb.toFixed(2) + " 밴드 밖이라 β 를 " + (xb < 0.7 ? "높이는" : "낮추는") + " 후보만 — 없으면 결격 유지(β 우선)" : "") : x.d.long === 1 ? " ☆" + x.d.age + "일째 — 후보 범위 확대(스크린 근접 후보 nearMiss·인접 주제)" : "";
    console.log("  " + x.g + " " + x.d.ticker + " " + x.d.name + (x.d.triedAt >= T ? " [교체 시도 " + x.d.triedAt + "]" : " [오늘 교체 시도 필요]") + esc + " — " + (x.d.note || "") + " · 대체 " + (ready.length ? ready.join(", ") : "검증 통과 후보 없음 → 스크린 상위 검증"));
  });
}
if (ORPHANS.length) console.log("\n[고아 판정] 그룹에 없는 종목의 결격 판정 " + ORPHANS.length + "건 — candidate-notes.json defects 에서 지운다(다시 편입되면 옛 판정이 살아난다): " + ORPHANS.join(", "));
if (opts.gate && (outObj.summary.review || outObj.summary.untried)) process.exit(1);
