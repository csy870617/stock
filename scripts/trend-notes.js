#!/usr/bin/env node
"use strict";
//
// 현재 추세의 '기사로 확인한 이유' — 루틴 세션(CLAUDE.md §3-4c, `추세 설명 채워줘`)이 쓰는 도구 (API 를 쓰지 않는다)
//
//   node scripts/trend-notes.js --queue [--max 40] [--out <폴더>]
//       설명이 필요한 종목을 고르고 종목마다 조사 묶음(<폴더>/<티커>.md)과 목록(<폴더>/queue.json)을 쓴다.
//       순서: 설명 없음 → 추세가 바뀜(판정·시작일) → 지문(핵심 날짜 상위 3)이 바뀜 → 21일 지남. 같은 순위면 정식 편성 먼저.
//   node scripts/trend-notes.js --apply <결과.json> [--queue <폴더>/queue.json]
//       서브에이전트가 돌려준 {티커: {fp, headline, summary, legs:[{n,why,sources}], days:[{id,why,short,sources}]}} 를 검사해
//       data/trend/<티커>.json 의 ai 에 쓴다. 검사(가격 의존 수치·매매 지시·전망 문구·길이·차단 출처)에 걸린 항목은 빼고,
//       요약이 걸리면 그 종목은 쓰지 않는다. 그사이 추세가 바뀐 종목(판정·시작일 불일치)도 쓰지 않는다.
//       앱은 원인 줄 = headline, 주요 날짜 줄 = 확인된 날의 short(+출처)만 보인다 — 요약·단계·날짜 설명 전문은 화면에 없다(2026-10-25 '분석된 내용 자체를 간단하게 정리해서').
//   node scripts/trend-notes.js --status
//
// 왜 루틴인가(2026-10-24 사용자 결정 '루틴으로 완전히 바꿔줘'): 설명은 하루 늦어도 되는 정보라 API 비용(종목당 약 $0.1)을 쓰지 않고
// 구독 세션의 웹 검색으로 채운다. 출처는 세션이 검색 결과에서 실제로 본 URL 만 쓰게 한다(docs/TREND-AGENT.md).
const fs = require("fs");
const path = require("path");
const { isBlockedSource, priceNumberIn } = require("./validate-reco");
const { DIRECTIVE } = require("./lib-claude");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "data", "trend");
const AGE_DAYS = 21;
const LABELS = "ABCDEFGHIJ";
const PERSONAL = { spotlight: 1, watch: 1, hold: 1 };   // 정식 밖 목록 — 정식 편성 다음 순서
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 && args[i + 1] && !/^--/.test(args[i + 1]) ? args[i + 1] : d; };

const pct = (v) => {
  if (v == null || !isFinite(v)) return "–";
  const x = v * 100, a = Math.abs(x), s = a.toFixed(a >= 100 ? 0 : 1);
  return (+s === 0 ? "" : x > 0 ? "+" : "-") + s + "%";
};
const won = (v) => {
  const a = Math.abs(v);
  if (a >= 1e12) return (a / 1e12).toFixed(1).replace(/\.0$/, "") + "조원";
  if (a >= 1e8) return Math.round(a / 1e8).toLocaleString("ko-KR") + "억원";
  return Math.round(a / 1e4).toLocaleString("ko-KR") + "만원";
};
const flowTxt = (who, v) => who + " " + won(v) + " " + (v >= 0 ? "순매수" : "순매도");
const KIND = { low: "저점부터", high: "고점부터", window: "이전부터" };
const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (_e) { return null; } };
const files = () => (fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => /\.json$/.test(f)) : []);
function formalSet() {
  try {
    global.window = {};
    const f = path.join(ROOT, "data", "recommendations.js");
    delete require.cache[require.resolve(f)];
    require(f);
    const D = global.window.STOCK_DATA || {}, out = {};
    ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => { if (s && !PERSONAL[s.theme]) out[s.ticker] = 1; }));
    return out;
  } catch (_e) { return {}; }
}
// 설명이 지금 추세와 맞는가 — 판정·시작일이 같아야 한다(앱도 같은 조건으로 요약을 보인다)
const sameTrend = (m) => m.ai && m.ai.cls === m.cls && m.ai.from === m.from;

// 조사 묶음 — 라벨(단계 1·2…, 핵심 날짜 A·B…, 시장 급변일 M1·M2)로 항목을 짚게 한다
function packet(m) {
  const L = [];
  L.push("# " + m.name + " (" + m.t + ", " + (m.c === "korea" ? "한국 " : "미국 ") + (m.mk || "") + ")");
  L.push("기준일 " + m.asOf + " · 비교 지수 " + m.bench.name + " · fp `" + m.fp + "`");
  L.push("");
  L.push("## 현재 추세: " + m.cls + " — " + m.from + " " + (KIND[m.kind] || "") + " " + m.n + "거래일, 시작점 대비 " + pct(m.ret));
  L.push("- 같은 기간 " + m.bench.name + " " + pct(m.mret) + " → 앱 표시: 시장" + (m.rel === "비슷" ? "과 비슷" : "보다 " + m.rel) + "(단순 비교, ±5%p 기준 — headline 의 시장 비교는 이 방향으로)");
  L.push("- 참고(자세히 화면): 시장 민감도 β " + m.beta + " → 시장만 따랐다면 " + pct(m.mkt) + ", 종목 고유 " + pct(m.spec));
  if (m.cls === "상승" && m.fromHi <= -0.05) L.push("- 추세 중 고점 " + m.hi.d + " 대비 " + pct(m.fromHi) + " (상승 추세 속 조정)");
  if (m.cls === "하락" && m.fromLo >= 0.05) L.push("- 추세 중 저점 " + m.lo.d + " 대비 " + pct(m.fromLo) + " (하락 추세 속 반등)");
  if (m.quiet) L.push("- " + (m.cls === "상승" ? "고점" : "저점") + " " + m.quiet.d + " 이후 " + m.quiet.n + "거래일 새 " + (m.cls === "상승" ? "고점" : "저점") + " 없음(앱 표시: N개월째 새 " + (m.cls === "상승" ? "고점" : "저점") + " 없음 — 사실 표시, 추세 판정은 그대로)");
  if (m.box) L.push("- 박스권(약 3년 내내 전환 기준 안): 고점 " + m.hi.d + " · 저점 " + m.lo.d + " · 폭 " + pct(m.box.width));
  if (m.prev) L.push("- 직전 추세: " + m.prev.cls + " " + m.prev.from + " ~ " + m.prev.to + " " + pct(m.prev.ret));
  L.push("");
  L.push("## 추세 안의 단계(legs)");
  m.legs.forEach((g, i) => {
    const fl = m.flow && m.flow.legs && m.flow.legs[i];
    L.push((i + 1) + ". " + g.s + " ~ " + g.e + " " + g.cls + " " + pct(g.ret) + " (" + m.bench.name + " " + pct(g.mret) + ", 종목 고유 " + pct(g.spec) + ")" +
      (fl ? " · " + flowTxt("외국인", fl.f) + " · " + flowTxt("기관", fl.o) : ""));
  });
  const dayLine = (k, lab) => lab + ". " + k.s + (k.n > 1 ? " ~ " + k.e : "") + " " + pct(k.ret) + " (" + m.bench.name + " " + pct(k.mret) +
    (k.vr ? ", 거래량 평소의 " + k.vr.toFixed(1) + "배" : "") + (k.gap != null && Math.abs(k.gap) >= 0.02 ? ", 시가 갭 " + pct(k.gap) : "") + ")" +
    (k.tags && k.tags.length ? " · 같은 때 공시: " + k.tags.map((g) => g.k + " '" + g.t + "'(" + g.d + ")").join(", ") : "");
  if (m.keys.length) { L.push(""); L.push("## 핵심 날짜(days — 종목 고유 움직임이 컸던 날)"); m.keys.forEach((k, i) => L.push(dayLine(k, LABELS[i]))); }
  if (m.mktDays && m.mktDays.length) { L.push(""); L.push("## 시장 급변일(days — 시장 전체가 크게 움직여 종목도 따라 움직인 날)"); m.mktDays.forEach((k, i) => L.push(dayLine(k, "M" + (i + 1)))); }
  if (m.earn && m.earn.length) { L.push(""); L.push("실적 발표 반응: " + m.earn.map((e) => e.rd + " " + pct(e.ret) + "(시장 대비 " + pct(e.ar) + ")").join(", ")); }
  if (m.flow) L.push("추세 구간 수급: " + [flowTxt("외국인", m.flow.f), flowTxt("기관", m.flow.o), flowTxt("개인", m.flow.p)].join(" · "));
  return L.join("\n") + "\n";
}

function queue() {
  const max = +opt("--max", 40) || 40, out = opt("--out", null);
  const formal = formalSet(), now = Date.now(), q = [];
  let have = 0, total = 0;
  files().forEach((f) => {
    const m = readJson(path.join(DIR, f));
    if (!m || !m.t || !m.legs) return;
    total++;
    const a = m.ai, age = a && a.at ? (now - Date.parse(a.at)) / 864e5 : Infinity;
    if (a && sameTrend(m)) have++;
    const why = !a ? 0 : !sameTrend(m) ? 1 : a.fp !== m.fp ? 2 : age > AGE_DAYS ? 3 : -1;
    if (why < 0) return;
    q.push({ f, m, why, formal: formal[m.t] ? 0 : 1, age });
  });
  // 같은 순위 안에서는 오래된 순, 한국·미국을 번갈아(CLAUDE.md §3-1 '한국·미국 동등')
  q.sort((x, y) => x.why - y.why || x.formal - y.formal || y.age - x.age || (x.f < y.f ? -1 : 1));
  const rank = {};
  q.forEach((x) => { const g = x.why + "|" + x.formal + "|" + x.m.c; x.r = rank[g] = (rank[g] || 0) + 1; });
  q.sort((x, y) => x.why - y.why || x.formal - y.formal || x.r - y.r || (x.m.c === "korea" ? -1 : 1));
  const todo = q.slice(0, max);
  const WHY = ["설명 없음", "추세 바뀜", "핵심 날짜 바뀜", AGE_DAYS + "일 지남"];
  console.log("추세 설명: 지금 추세에 맞는 설명 " + have + "/" + total + "종목 · 필요 " + q.length + "종목 → 이번 " + todo.length + "종목");
  todo.forEach((x) => console.log("  " + x.m.t + " " + x.m.name + " — " + x.m.cls + " " + x.m.from + "~ (" + WHY[x.why] + ")"));
  if (!out) return;
  fs.mkdirSync(out, { recursive: true });
  const list = todo.map((x) => {
    const m = x.m, file = path.join(out, String(m.t).replace(/[^A-Za-z0-9.\-]/g, "_") + ".md");
    fs.writeFileSync(file, packet(m));
    return { t: m.t, name: m.name, fp: m.fp, cls: m.cls, from: m.from, file,
      legs: m.legs.map((g, i) => ({ n: i + 1, s: g.s, e: g.e })),
      days: m.keys.map((k, i) => ({ id: LABELS[i], s: k.s, e: k.e })).concat((m.mktDays || []).map((k, i) => ({ id: "M" + (i + 1), s: k.s, e: k.e }))) };
  });
  fs.writeFileSync(path.join(out, "queue.json"), JSON.stringify(list, null, 1));
  console.log("조사 묶음 " + list.length + "개 → " + out + " (queue.json)");
}

// 전망·추측 문구 — 이미 일어난 일만 쓰게 한다
const FORECAST = /(?:오를|내릴|상승할|하락할|반등할|회복할|개선될|악화될)\s*(?:것|가능성|전망)|(?:것으로|으로)\s*(?:보인다|예상된다|전망된다|기대된다)|기대된다|전망이다/;
const NONE = "원인 보도 확인 안 됨";
// 글자 수 상한 — headline·short 는 첫 화면에 그대로 보인다(휴대폰 두 줄·한 줄)
const LIMIT = { headline: 60, summary: 300, summaryMax: 420, why: 240, short: 40 };
function textProblems(k, t, maxLen) {
  const p = [], s = String(t || "");
  if (!/[가-힣]/.test(s)) p.push(k + " 가 비었거나 한국어가 아님");
  if (s.length > maxLen) p.push(k + " 가 너무 김(" + maxLen + "자 이내)");
  const hit = priceNumberIn(s);
  if (hit) p.push(k + " 에 가격 의존 수치('" + hit + "')");
  if (DIRECTIVE.test(s)) p.push(k + " 에 매매 지시 문구");
  if (FORECAST.test(s)) p.push(k + " 에 전망·추측 문구('" + s.match(FORECAST)[0] + "')");
  if (/조사\s*메모|검색\s*결과|패킷|packet/i.test(s)) p.push(k + " 에 작업 경위 문구");
  return p;
}
const cleanSrc = (list) => {
  const out = [];
  (Array.isArray(list) ? list : []).forEach((u) => {
    u = String(u || "").trim();
    if (!/^https?:\/\/[^\s/]+\.[^\s]+$/.test(u) || isBlockedSource(u) || out.includes(u)) return;
    out.push(u);
  });
  return out.slice(0, 3);
};

function apply() {
  const resFile = opt("--apply", null);
  const res = readJson(resFile);
  if (!res || typeof res !== "object") { console.error("결과 파일을 읽지 못했습니다: " + resFile); process.exitCode = 1; return; }
  const qf = opt("--queue", resFile ? path.join(path.dirname(resFile), "queue.json") : null);
  const Q = {};
  (readJson(qf) || []).forEach((x) => { Q[x.t] = x; });
  let ok = 0, skip = 0, dropped = 0;
  const notes = [];
  Object.keys(res).forEach((t) => {
    const r = res[t] || {}, f = path.join(DIR, String(t).replace(/[^A-Za-z0-9.\-]/g, "_") + ".json"), m = readJson(f);
    if (!m) { skip++; notes.push(t + ": data/trend 파일 없음"); return; }
    const q = Q[t] || { fp: m.fp, cls: m.cls, from: m.from, legs: m.legs.map((g, i) => ({ n: i + 1, s: g.s, e: g.e })),
      days: m.keys.map((k, i) => ({ id: LABELS[i], s: k.s, e: k.e })).concat((m.mktDays || []).map((k, i) => ({ id: "M" + (i + 1), s: k.s, e: k.e }))) };
    if (q.cls !== m.cls || q.from !== m.from) { skip++; notes.push(t + ": 조사 뒤 추세가 바뀜(" + q.cls + " " + q.from + " → " + m.cls + " " + m.from + ") — 다음 회차에 다시"); return; }
    // 요약은 '자세히' 안에 있어 300자는 권장선(넘으면 알리기만), 420자 넘거나 금지 문구면 그 종목을 쓰지 않는다
    const sp = textProblems("summary", r.summary, LIMIT.summaryMax);
    if (sp.length) { skip++; notes.push(t + ": 요약 검사 미통과 — " + sp.join(" · ")); return; }
    if (String(r.summary).trim().length > LIMIT.summary) notes.push(t + ": 요약이 김(" + String(r.summary).trim().length + "자, " + LIMIT.summary + "자 권장) — 반영은 함");
    // 한 문장 요약 — 걸리면 그것만 빼고(앱은 요약 첫 문장으로 대신한다) 종목은 쓴다
    let headline = String(r.headline || "").trim();
    if (headline) {
      const hp = textProblems("headline", headline, LIMIT.headline);
      if (hp.length) { headline = ""; dropped++; notes.push(t + ": " + hp.join(" · ")); }
    } else notes.push(t + ": headline 없음 — 앱은 요약 첫 문장을 대신 보인다");
    const legs = [], days = [];
    (Array.isArray(r.legs) ? r.legs : []).forEach((x) => {
      const g = q.legs.find((y) => y.n === +x.n);
      const why = String(x.why || "").trim(), p = g ? textProblems("legs." + x.n, why, LIMIT.why) : ["legs." + x.n + " 은 없는 단계"];
      if (p.length) { dropped++; notes.push(t + ": " + p.join(" · ")); return; }
      legs.push({ s: g.s, e: g.e, why, src: why === NONE ? [] : cleanSrc(x.sources) });
    });
    (Array.isArray(r.days) ? r.days : []).forEach((x) => {
      const g = q.days.find((y) => y.id === String(x.id));
      const why = String(x.why || "").trim(), p = g ? textProblems("days." + x.id, why, LIMIT.why) : ["days." + x.id + " 은 없는 라벨"];
      if (p.length) { dropped++; notes.push(t + ": " + p.join(" · ")); return; }
      const d = { s: g.s, e: g.e, why, src: why === NONE ? [] : cleanSrc(x.sources) };
      const short = String(x.short || "").trim();
      if (short && why !== NONE) {
        const sp2 = textProblems("days." + x.id + ".short", short, LIMIT.short);
        if (sp2.length) { dropped++; notes.push(t + ": " + sp2.join(" · ")); } else d.short = short;
      }
      days.push(d);
    });
    // 출처 없는 원인 설명은 '확인 안 됨'으로 낮춘다(검색 결과로 확인한 것만 원인으로 쓴다)
    legs.concat(days).forEach((x) => { if (x.why !== NONE && !x.src.length) { x.why = NONE; delete x.short; dropped++; notes.push(t + ": 출처 없는 설명 → '" + NONE + "'"); } });
    m.ai = Object.assign({ at: new Date().toISOString().slice(0, 19) + "Z", asOf: m.asOf, fp: q.fp, by: "routine", cls: m.cls, from: m.from, to: m.to },
      headline ? { headline } : {}, { summary: String(r.summary).trim(), legs, days });
    fs.writeFileSync(f, JSON.stringify(m));
    ok++;
  });
  console.log("추세 설명 반영: " + ok + "종목 · 건너뜀 " + skip + " · 뺀 항목 " + dropped);
  notes.forEach((x) => console.log("  - " + x));
}

function status() {
  const now = Date.now();
  let total = 0, have = 0, stale = 0;
  files().forEach((f) => {
    const m = readJson(path.join(DIR, f));
    if (!m || !m.legs) return;
    total++;
    if (m.ai && sameTrend(m)) { have++; if (m.ai.fp !== m.fp || (now - Date.parse(m.ai.at)) / 864e5 > AGE_DAYS) stale++; }
  });
  console.log("추세 설명: " + have + "/" + total + "종목이 지금 추세에 맞는 설명 보유(그중 갱신 대상 " + stale + ")");
}

module.exports = { textProblems, cleanSrc, NONE, LIMIT };
if (require.main === module) {
  // --apply 를 먼저 본다(--apply 결과 --queue 목록 처럼 함께 줄 때 큐 모드로 빠지지 않게)
  if (args.includes("--apply")) apply();
  else if (args.includes("--queue")) queue();
  else status();
}
