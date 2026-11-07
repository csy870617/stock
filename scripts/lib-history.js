// 스냅샷(data/history.js) 한 줄의 형식 — snapshot.js 가 쓰고 backfill-memberships.js 가 지난 줄을 채우며, lib-perf.js·perf-track.js 가 읽는다.
//
// 한 종목 = 한 줄(국가·티커마다 하나)이고 th·tier 는 대표 소속이다: 정식 주제(우량·성장·저평가·배당, 그 시절의 히든 포함)가 있으면 그중
//   tier 가 가장 높은 것(같으면 recommendations.js 순서), 없으면 주목, 그다음 관심·보유. 두 곳 이상에 있으면 ths:[[주제, tier|null], …]
//   (대표가 맨 앞)에 모두 적는다 — 한 곳뿐이면 ths 를 쓰지 않는다(파일을 작게).
//   2026-11-07 전엔 tier 가 가장 낮은 카드 하나만 남겨(관심 T1 이 우량 T2 를 밀어냈다) 두 주제에 있던 종목이 한 주제에서 빠졌다 —
//   성과 탭 주제·티어 묶음, β 밴드, 편입·제외 기록, 과거 보기가 모두 틀렸다. 지난 줄은 backfill-memberships.js 가 git 이력으로 채운다.
"use strict";
const fs = require("fs");

// 정식 밖 목록 — 주목(spotlight)·관심·보유. 그 밖의 주제는 모두 정식(없어진 'rising' 도 그 시절 기록에선 정식)
const PERSONAL = { spotlight: 1, watch: 1, hold: 1 };
// 갈래 — 정식 편성(주제끼리는 한 갈래)·주목·관심·보유
const kindOf = (th) => (PERSONAL[th] ? th : "formal");
const kindRank = (th) => (!PERSONAL[th] ? 0 : th === "spotlight" ? 1 : 2);
const tierKey = (v) => (typeof v === "number" ? v : 9);

// 한 줄의 소속 전부 — [[주제, tier|null], …]
function members(e) {
  if (!e) return [];
  if (Array.isArray(e.ths) && e.ths.length) return e.ths;
  return [[e.th, e.tier == null ? null : e.tier]];
}
const themesOf = (e) => members(e).map((m) => m[0]);
const hasKind = (e, k) => members(e).some((m) => kindOf(m[0]) === k);

// 소속을 대표 순서로(정식 → 주목 → 관심·보유, 같은 갈래는 tier 오름차순, 같으면 들어온 순서) — 같은 주제가 두 번이면 앞의 것만
function sortMembers(list) {
  const seen = {};
  return list.map((m, i) => ({ m, i }))
    .sort((a, b) => kindRank(a.m[0]) - kindRank(b.m[0]) || tierKey(a.m[1]) - tierKey(b.m[1]) || a.i - b.i)
    .map((x) => x.m)
    .filter((m) => (seen[m[0]] ? false : (seen[m[0]] = 1)))
    .map((m) => [m[0], m[1] == null ? null : m[1]]);
}

// recommendations.js 카드 → {"국가:티커": {c, card(대표 카드), ms(대표 순서 소속)}} — 순서는 처음 나온 순서(한국 → 미국, 카드 순서)
function groupCards(D) {
  const by = {};
  ["korea", "us"].forEach((c) => ((D && D[c]) || []).forEach((s) => {
    if (!s || !s.ticker) return;
    const k = c + ":" + s.ticker;
    (by[k] = by[k] || { c, cards: [] }).cards.push(s);
  }));
  Object.keys(by).forEach((k) => {
    const g = by[k];
    g.ms = sortMembers(g.cards.map((s) => [s.theme, s.tier]));
    g.card = g.cards.find((s) => s.theme === g.ms[0][0]) || g.cards[0];
  });
  return by;
}

// 인접 기록일 사이 소속 변화 — 종목마다 이전·지금 주제 집합을 견줘 새로 든 주제는 편입(a), 빠진 주제는 제외(r),
//   같은 날 한 주제에서 빠지고 다른 주제에 든 것은 주제 이동(m, from = 이전 주제)으로 짝짓는다. 항목 {t, n, c, th(, from)}
//   (두 주제에 있던 종목이 한 주제에만 들거나 빠져도 그 주제의 편입·제외로 보인다 — 예전엔 대표 주제만 견줘 '이동'으로 보이거나 빠졌다)
function rosterDiff(prevStocks, curStocks) {
  const P = {}, C = {}, a = [], r = [], m = [];
  const key = (s) => s.c + ":" + s.t;
  const item = (s, th, from) => (from ? { t: s.t, n: s.n, c: s.c, th, from } : { t: s.t, n: s.n, c: s.c, th });
  (prevStocks || []).forEach((s) => { P[key(s)] = s; });
  (curStocks || []).forEach((s) => { C[key(s)] = s; });
  (curStocks || []).forEach((s) => {
    const p = P[key(s)], now = themesOf(s);
    if (!p) { now.forEach((th) => a.push(item(s, th))); return; }
    const before = themesOf(p);
    const gain = now.filter((th) => before.indexOf(th) < 0), lost = before.filter((th) => now.indexOf(th) < 0);
    const k = Math.min(gain.length, lost.length);
    for (let i = 0; i < k; i++) m.push(item(s, gain[i], lost[i]));
    gain.slice(k).forEach((th) => a.push(item(s, th)));
    lost.slice(k).forEach((th) => r.push(item(p, th)));
  });
  (prevStocks || []).forEach((s) => { if (!C[key(s)]) themesOf(s).forEach((th) => r.push(item(s, th))); });
  return { a, r, m };
}

// 한 기록일을 한 줄로 — 파일이 작아지고(들여쓰기 없음) 하루 기록이 git 에서 한 줄 변경으로 보인다
function writeHistory(file, list) {
  const out = "// 일별 추천 스냅샷 히스토리 — scripts/snapshot.js 가 자동 생성/추가(지우지 않는다, 한 줄 = 한 기록일)\n" +
    "// 각 항목: {date, kospi, sp500, rsp(동일비중 S&P500 ETF), note·noteUS·noteKR 시황, liq 유동성{us,korea,headline}, picks Top Pick{korea[],us[]},\n" +
    "//           stocks:[{t 티커, n 이름, c 국가, th 대표 주제, tier, p 종가(마지막으로 끝난 정규장), pd 그 거래일, tp 목표가, ss·sm·sl 단·중·장기 신호, ai AI 적정가,\n" +
    "//                    ths 소속 전부 [[주제, tier|null], …] — 두 곳 이상일 때만(대표가 맨 앞, scripts/lib-history.js)}]}\n" +
    "// kospi·sp500·rsp 도 같은 조회 시점의 끝난 장 종가다(장중 실행이어도 장중가를 기록하지 않음).\n" +
    "// 앱은 이 파일을 '과거 보기'를 열 때만 받는다 — 시작할 때는 history-index.js 만 받는다.\n" +
    "window.STOCK_HISTORY = [\n" + list.map((h) => JSON.stringify(h)).join(",\n") + "\n];\n";
  fs.writeFileSync(file, out);
}

// 앱 시작용 색인 — 기록일 목록(과거 보기 날짜 고르기)과 인접 기록일 사이의 편입(a)·제외(r)·주제 이동(m, from = 이전 주제).
// 앱 '종목 업데이트'·목록의 NEW 표시·제외 종목 상세의 이력이 쓴다. 소속(주제) 단위로 견준다(rosterDiff).
function writeIndex(file, list) {
  const H = list.filter((h) => h && typeof h.date === "string" && Array.isArray(h.stocks));
  const roster = [];
  for (let i = 1; i < H.length; i++) {
    const d = rosterDiff(H[i - 1].stocks, H[i].stocks), e = { d: H[i].date, p: H[i - 1].date };
    if (d.a.length) e.a = d.a;
    if (d.r.length) e.r = d.r;
    if (d.m.length) e.m = d.m;
    roster.push(e);
  }
  const idx = { asOf: H.length ? H[H.length - 1].date : null, dates: H.map((h) => h.date), roster };
  fs.writeFileSync(file,
    "// 스냅샷 색인 — scripts/snapshot.js 가 history.js 와 함께 쓴다(손으로 고치지 않는다). 앱이 시작할 때 받는다.\n" +
    "// {asOf 마지막 기록일, dates 기록일 전부, roster:[{d 기록일, p 직전 기록일, a 편입·r 제외·m 주제 이동(from) — [{t, n, c, th}], 주제 단위}]}\n" +
    "window.HISTORY_INDEX = " + JSON.stringify(idx) + ";\n");
}

module.exports = { PERSONAL, kindOf, members, themesOf, hasKind, sortMembers, groupCards, rosterDiff, writeHistory, writeIndex };
