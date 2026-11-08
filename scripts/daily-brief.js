#!/usr/bin/env node
// 매일 투자 브리핑 메일 본문 — 2026-11-08 사용자 'LA 시간으로 매일 오전 7시에 e-mail 로 투자 포인트 정리해서 브리핑 해줘'
//
// 앱 데이터(data/*.js)만 읽어 결정론으로 만든다(웹 검색·AI 0). 매일 LA 07시 전후 루틴 세션이 이 결과를
// Gmail 로 보낸다(루틴 프롬프트는 짧게 — 내용 규칙은 이 파일에만).
//   ① 핵심 몇 줄 ② 지수·환율 ③ 시황(한·미) ④ 돈의 흐름·시장 심리 ⑤ Top Pick ⑥ 편성 변화(최근 3일)
//   ⑦ 주의(결격 교체 대기·실적 주의·이번 주 실적 발표) ⑧ 최근 추세 전환 ⑨ 관심·보유 종목
// 문장은 앱과 같은 원칙 — 이미 일어난 움직임·규칙의 사실만, 예측·매매 권유 없음, 존댓말 없이.
//
// 사용: node scripts/daily-brief.js [--out brief.json] [--html brief.html] [--data <data 폴더>]
//   brief.json = {subject, html, text, chars} — 루틴은 subject·html(htmlBody)·text(body)를 그대로 보낸다.
"use strict";
const fs = require("fs");
const path = require("path");

const arg = (k) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : null; };
const DATA = arg("data") || path.join(__dirname, "..", "data");
const APP = "https://csy870617.github.io/stock/";

function win(file) {
  try { const w = {}; new Function("window", fs.readFileSync(path.join(DATA, file), "utf8"))(w); return w[Object.keys(w)[0]] || null; }
  catch (_e) { return null; }
}
function json(file) { try { return JSON.parse(fs.readFileSync(path.join(DATA, file), "utf8")); } catch (_e) { return null; } }

const R = win("recommendations.js") || {};
const IT = win("indices.js") || {};
const Q = win("quotes.js") || {};
const LF = win("liquidity-flow.js") || {};
const S = win("sentiment.js") || {};
const LQ = win("liquidity.js") || {};
const TA = (win("stock-ta.js") || {}).ta || {};
const TS = (win("trend-summary.js") || {}).items || {};
const ER = win("earn-risk.js") || {};
const EV = (win("events.js") || {}).items || {};
const CA = win("candidates.js") || {};
const HI = win("history-index.js") || {};
const GONE = (json("removed.json") || {}).items || {};

// ── 도우미 ──
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const UP = "#d32f2f", DN = "#1565c0", MUT = "#666";
const col = (v, s) => (v > 0 ? '<font color="' + UP + '">' + s + "</font>" : v < 0 ? '<font color="' + DN + '">' + s + "</font>" : s);
// 메일 HTML 은 짧게 — 루틴 세션이 본문을 그대로 옮겨 보내므로 반복 스타일 대신 font·small 태그(Gmail 이 그린다)
const mut = (s) => '<font color="' + MUT + '">' + s + "</font>";
const sm = (s) => "<small>" + s + "</small>";
const pct = (v, d = 2) => (v == null || !isFinite(v) ? "–" : (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(d) + "%");
const num = (s) => { const v = parseFloat(String(s).replace(/[^0-9.+-]/g, "")); return isFinite(v) ? v : null; };
const comma = (v, d = 0) => (v == null || !isFinite(v) ? "–" : v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }));
const px = (c, v) => (c === "korea" ? comma(v) + "원" : "$" + comma(v, 2));
const md = (d) => { const m = String(d || "").match(/^\d{4}-(\d{2})-(\d{2})/); return m ? +m[1] + "/" + +m[2] : ""; };
const cut = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; };
const firstSentence = (s) => { const m = String(s || "").match(/^.*?(다\.|\.)(\s|$)/); return m ? m[0].trim() : String(s || ""); };
// 추세 상태 이름(앱과 같다 — 데이터 값은 적극매수~적극매도)
const SIG = { "적극매수": "강한 상승세", "매수": "상승세", "중립": "횡보", "매도": "하락세", "적극매도": "강한 하락세" };
const SIGC = { "적극매수": UP, "매수": UP, "중립": MUT, "매도": DN, "적극매도": DN };
const sigTxt = (sg) => (sg && SIG[sg] ? '<font color="' + SIGC[sg] + '">' + SIG[sg] + "</font>" : "–");
const sig3 = (o) => (o ? [o.short, o.mid, o.long].map((x) => sigTxt(x && x.signal)).join(" · ") : "–");
const TH = { core: "우량", growth: "성장", value: "저평가", dividend: "배당", spotlight: "주목", watch: "관심", hold: "보유", rising: "히든" };
const KN = { korea: "한국", us: "미국" };

// 편성 카드(나라·티커 → 첫 카드)와 소속 주제
const card = {}, themesOf = {};
["korea", "us"].forEach((c) => (R[c] || []).forEach((s) => {
  const k = c + "|" + s.ticker;
  if (!card[k]) card[k] = s;
  (themesOf[k] = themesOf[k] || []).push(TH[s.theme] + (s.tier && /^(core|growth|value|dividend)$/.test(s.theme) ? " T" + s.tier : s.watchTag ? " · " + s.watchTag : ""));
}));
const nameOf = (c, t) => (card[c + "|" + t] && card[c + "|" + t].name) || (GONE[c + "|" + t] && GONE[c + "|" + t].card && GONE[c + "|" + t].card.name) || t;
const quote = (t) => (Q.quotes || {})[t] || null;

// ── 날짜(LA 기준) ──
const now = new Date();
const laParts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }).formatToParts(now);
const lp = (t) => (laParts.find((p) => p.type === t) || {}).value;
const LA_DATE = lp("year") + "-" + lp("month") + "-" + lp("day");
const WD = { Sun: "일", Mon: "월", Tue: "화", Wed: "수", Thu: "목", Fri: "금", Sat: "토" }[lp("weekday")] || "";
const dayDiff = (a, b) => Math.round((Date.parse(a) - Date.parse(b)) / 864e5);

// ── 지수·환율 ──
const IX = {};
(IT.indices || []).concat(IT.macro || []).forEach((x) => { if (x && x.key) IX[x.key] = x; });
const qi = Q.indices || {};
const krClose = (qi.kospi && qi.kospi.closeDate) || IT.asOf || "";
const usClose = (qi.sp500 && qi.sp500.closeDate) || "";
const idxRow = (k) => {
  const x = IX[k]; if (!x) return "";
  const ch = num(x.change);
  return "<tr><td>" + esc(x.name) + "</td><td align=right>" + esc(x.level) + "</td><td align=right>" + col(ch, esc(x.change || "–")) +
    "</td><td>" + sm(sig3(x)) + "</td></tr>";
};

// ── 핵심 줄 ──
const key = [];
{
  const k = IX.kospi, n = IX.nasdaq;
  if (k || n) key.push("마감: " + [k && "코스피 " + k.level + " " + col(num(k.change), k.change), IX.kosdaq && "코스닥 " + IX.kosdaq.level + " " + col(num(IX.kosdaq.change), IX.kosdaq.change),
    n && "나스닥 " + n.level + " " + col(num(n.change), n.change), IX.dow && "다우 " + col(num(IX.dow.change), IX.dow.change)].filter(Boolean).join(" · ") +
    " " + mut("(한국 " + md(krClose) + " · 미국 " + md(usClose) + ")"));
  const mood = ["korea", "us"].map((c) => {
    const s = S[c], f = LF[c];
    const parts = [];
    if (s && s.score != null) parts.push("심리 " + Math.round(s.score) + "(" + s.level + ")");
    if (f && f.level) parts.push("돈의 흐름 '" + f.level + "'");
    return parts.length ? KN[c] + " " + parts.join(" · ") : "";
  }).filter(Boolean);
  if (mood.length) key.push(mood.join(" / "));
  const us = S.us, fc = us && us.evidence && us.evidence.fearCrash;
  if (us && us.level === "극도의 공포" && fc && fc.pass && fc.inZone != null) key.push("미국 극도의 공포 구간 — 과거 이 구간 뒤 3개월 안에 S&amp;P 500 이 10% 넘게 더 빠진 경우 " + fc.inZone + "%(그 밖 " + fc.rest + "%)");
  const risk = LF.us && LF.us.risk;
  if (risk && risk.on >= 2) key.push("미국 신용 경고 " + risk.on + "/" + risk.of + " 켜짐 — 과거 켜졌을 때 3개월 안 −10% 급락 확률이 높았다");
}

// ── 편성 변화(최근 3일) ──
const rosterRows = [];
(HI.roster || []).filter((e) => e && e.d && dayDiff(LA_DATE, e.d) <= 2).forEach((e) => {
  (e.a || []).forEach((x) => rosterRows.push({ d: e.d, k: "편입", c: x.c, t: x.t, n: x.n, th: x.th }));
  (e.r || []).forEach((x) => rosterRows.push({ d: e.d, k: "제외", c: x.c, t: x.t, n: x.n, th: x.th }));
  (e.m || []).forEach((x) => rosterRows.push({ d: e.d, k: "이동", c: x.c, t: x.t, n: x.n, th: x.th, from: x.from }));
});
const rosterLi = rosterRows.sort((a, b) => (a.d < b.d ? 1 : a.d > b.d ? -1 : 0)).slice(0, 12).map((r) => {
  let why = "";
  if (r.k === "제외") { const g = GONE[r.c + "|" + r.t]; if (g && g.reason && g.reason.note) why = cut(g.reason.note, 90); }
  else if (r.k === "편입") { const cd = card[r.c + "|" + r.t]; if (cd && cd.thesis) why = cut(firstSentence(cd.thesis), 90); }
  return "<li><b>" + r.k + "</b> " + esc(r.n || nameOf(r.c, r.t)) + " " + mut(KN[r.c] + " " + (r.k === "이동" ? TH[r.from] + "→" : "") + (TH[r.th] || r.th) + " · " + md(r.d)) +
    (why ? "<br>" + sm(esc(why)) : "") + "</li>";
});

// ── 주의 ──
const defLi = [];
Object.keys(CA.groups || {}).forEach((g) => (CA.groups[g].defects || []).filter((d) => d.state === "결격").forEach((d) => {
  const [c, th] = g.split("|");
  defLi.push("<li>" + esc(d.name) + " " + mut(KN[c] + " " + TH[th] + (d.since ? " · " + dayDiff(LA_DATE, d.since) + "일째" : "")) + "<br>" +
    sm(esc(cut(d.note || (d.flags || []).map((f) => f.msg).join(" · "), 110))) + "</li>");
}));
const erLi = Object.keys(ER.items || {}).filter((t) => ER.items[t].risk).map((t) => {
  const x = ER.items[t];
  return { c: x.c, t, date: x.date, html: "<li>" + esc(nameOf(x.c, t)) + " " + mut(KN[x.c] + " · 발표 " + md(x.date) + (x.tentative || x.est ? "(추정)" : "")) + "</li>" };
}).sort((a, b) => (a.date < b.date ? -1 : 1));
const erMean = { korea: "한국 = 프리뷰에 부정 낱말이 많음(기대에 못 미칠 가능성)", us: "미국 = 위험 신호 3개 이상(발표 때 크게 움직일 가능성 — 방향 아님)" };
const erKinds = Array.from(new Set(erLi.map((x) => x.c))).map((c) => erMean[c]);
// 이번 주(오늘부터 7일 안) 실적 발표 — 편성·주목·관심·보유 전체
const seen = {};
const earnWeek = [];
Object.keys(card).forEach((k) => {
  const [c, t] = k.split("|"); if (seen[t]) return; seen[t] = 1;
  const nx = EV[t] && EV[t].next; if (!nx || !nx.date) return;
  const dd = dayDiff(nx.date, LA_DATE); if (dd < 0 || dd > 7) return;
  earnWeek.push({ date: nx.date, c, t, n: nameOf(c, t), time: nx.time || "" });
});
earnWeek.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.n < b.n ? -1 : 1));
const earnByDay = {};
earnWeek.forEach((e) => { (earnByDay[e.date] = earnByDay[e.date] || []).push(e.n); });

// ── 최근 추세 전환(앱 홈과 같은 기준 — 확인 뒤 0~9거래일) ──
const tc = { "상승": [], "하락": [] };
Object.keys(TS).forEach((t) => {
  const m = TS[t]; if (!m || !m.conf || m.conf.n == null || m.conf.n >= 10 || m.young || !(m.cls in tc)) return;
  if (!card[m.c + "|" + t]) return;
  tc[m.cls].push({ t, c: m.c, d: m.conf.d, ret: m.conf.ret, n: m.conf.n });
});
const tcLi = (arr) => arr.sort((a, b) => (a.d < b.d ? 1 : -1)).slice(0, 6).map((x) =>
  "<li>" + esc(nameOf(x.c, x.t)) + " " + mut(KN[x.c] + " · " + md(x.d) + " 확인") + " 그 뒤 " + col(x.ret, pct(x.ret * 100, 1)) + "</li>").join("");

// ── 관심·보유 ──
const personal = [];
["korea", "us"].forEach((c) => (R[c] || []).filter((s) => s.theme === "watch" || s.theme === "hold").forEach((s) => {
  if (personal.some((p) => p.c === c && p.t === s.ticker)) return;
  const q = quote(s.ticker), m = TS[s.ticker];
  personal.push({ c, t: s.ticker, n: s.name, th: TH[s.theme], q, ta: TA[s.ticker], tr: m && m.cls });
}));
const personalRows = personal.map((p) =>
  "<tr><td>" + esc(p.n) + " " + mut(sm(p.th)) + "</td><td align=right>" + (p.q ? px(p.c, p.q.price) : "–") +
  "</td><td align=right>" + (p.q ? col(p.q.changePct, pct(p.q.changePct, 1)) : "–") + "</td><td>" + sm(sig3(p.ta) +
  (p.tr ? " · 추세 " + (p.tr === "상승" ? col(1, "상승") : p.tr === "하락" ? col(-1, "하락") : esc(p.tr)) : "")) + "</td></tr>").join("");

// ── 조립 ──
const H2 = (t, sub) => "<h3>" + t + (sub ? " " + mut(sm(esc(sub))) : "") + "</h3>";
const P = (t) => "<p>" + t + "</p>";
const UL = (items) => "<ul>" + items + "</ul>";
const TABLE = (head, rows) => '<table cellpadding=3 width="100%"><tr align=left>' + head.map((h) => "<th>" + mut(sm(h)) + "</th>").join("") + "</tr>" + rows + "</table>";

const parts = [];
parts.push('<div style="font-family:-apple-system,Segoe UI,Apple SD Gothic Neo,Malgun Gothic,sans-serif;max-width:640px;color:#222;font-size:15px">');
parts.push(P(mut(sm(md(LA_DATE) + "(" + WD + ") LA 아침 브리핑 · 앱 데이터 자동 정리"))));
parts.push(H2("핵심") + UL(key.map((k) => "<li>" + k + "</li>").join("")));
parts.push(H2("지수·환율") + TABLE(["", "값", "등락", "단·중·장 추세 상태"], ["kospi", "kosdaq", "nasdaq", "dow", "usdkrw", "dxy", "wti", "gold"].map(idxRow).join("")));
if (R.marketNoteKR || R.marketNoteUS) {
  parts.push(H2("시황", R.marketNoteAsOf ? md(R.marketNoteAsOf) + " 기준" : ""));
  if (R.marketNoteKR) parts.push(P("<b>한국</b> " + esc(R.marketNoteKR)));
  if (R.marketNoteUS) parts.push(P("<b>미국</b> " + esc(R.marketNoteUS)));
}
{
  const rows = ["korea", "us"].map((c) => {
    const s = S[c], f = LF[c], j = LQ[c] || {}, hl = c === "korea" ? LQ.headlineKR : LQ.headlineUS;
    return "<li><b>" + KN[c] + "</b> 돈의 흐름 '" + esc((f && f.level) || "–") + "' · 심리 " + (s && s.score != null ? Math.round(s.score) + "(" + esc(s.level) + ")" : "–") +
      (j.shortTerm ? " · 판단 단기 " + esc(j.shortTerm) + "/중기 " + esc(j.midTerm || "–") : "") + (hl ? "<br>" + sm(esc(hl)) : "") + "</li>";
  }).join("");
  parts.push(H2("돈의 흐름·시장 심리") + UL(rows));
}
{
  const tp = R.topPicks || {};
  const li = ["korea", "us"].map((c) => (tp[c] || []).map((x) => "<li><b>" + KN[c] + " " + x.rank + ". " + esc(x.name) + "</b>" + (themesOf[c + "|" + x.ticker] ? " " + mut(sm(esc(themesOf[c + "|" + x.ticker].join(", ")))) : "") +
    "<br>" + sm(esc(x.reason)) + "</li>").join("")).join("");
  if (li) parts.push(H2("오늘의 Top Pick", (tp.asOf ? md(tp.asOf) + " 기준 · " : "") + "건강 + 상승 가능성 점수 1~3위") + UL(li));
}
parts.push(H2("편성 변화", "최근 3일") + (rosterLi.length ? UL(rosterLi.join("")) : P("변화 없음")));
{
  const blocks = [];
  if (defLi.length) blocks.push(P("<b>결격 — 교체 대기</b>") + UL(defLi.join("")));
  if (erLi.length) blocks.push(P("<b>실적 주의</b> " + mut(sm(esc(erKinds.join(" · "))))) + UL(erLi.map((x) => x.html).join("")));
  const days = Object.keys(earnByDay);
  if (days.length) blocks.push(P("<b>이번 주 실적 발표</b>") + UL(days.map((d) => "<li>" + md(d) + " — " + esc(earnByDay[d].join(", ")) + "</li>").join("")));
  parts.push(H2("주의할 일") + (blocks.length ? blocks.join("") : P("없음")));
}
if (tc["상승"].length || tc["하락"].length) {
  parts.push(H2("최근 추세 전환", "판정이 실제로 바뀐 지 10거래일 안") +
    (tc["상승"].length ? P("<b>" + col(1, "상승 전환") + "</b>") + UL(tcLi(tc["상승"])) : "") +
    (tc["하락"].length ? P("<b>" + col(-1, "하락 전환") + "</b>") + UL(tcLi(tc["하락"])) : ""));
}
if (personalRows) parts.push(H2("관심·보유") + TABLE(["종목", "종가", "등락", "단·중·장 · 현재 추세"], personalRows));
parts.push("<p>" + mut(sm("이미 일어난 움직임과 규칙의 사실을 정리한 것 — 예측·매매 권유가 아니다. 추세 상태는 지금 모양의 이름이고 이후 수익을 가르지 못했다. 자세한 내용은 ")) + '<a href="' + APP + '">앱</a></p></div>');
const html = parts.join("");

// 제목 — 날짜 · 두 시장 · 심리 극단
const subj = ["[투자 브리핑] " + md(LA_DATE) + "(" + WD + ")"];
if (IX.kospi) subj.push("코스피 " + IX.kospi.change);
if (IX.nasdaq) subj.push("나스닥 " + IX.nasdaq.change);
["us", "korea"].forEach((c) => { const s = S[c]; if (s && /극도/.test(s.level || "")) subj.push(KN[c] + " " + s.level); });
const subject = subj.join(" · ");

// 텍스트 판(메일 앱이 HTML 을 못 그릴 때)
const text = html.replace(/<br>/g, "\n").replace(/<\/(li|p|h3|tr)>/g, "\n").replace(/<li>/g, "- ").replace(/<\/t[dh]>/g, "  ").replace(/<[^>]+>/g, "")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\n{3,}/g, "\n\n").trim() + "\n\n앱: " + APP + "\n";

const out = { subject, html, text, chars: { html: html.length, text: text.length } };
const o = arg("out"), oh = arg("html");
if (o) fs.writeFileSync(o, JSON.stringify(out));
if (oh) fs.writeFileSync(oh, "<!doctype html><meta charset=utf-8><title>" + esc(subject) + "</title>" + html);
console.log(subject);
console.log("html " + html.length + "자 · text " + text.length + "자" + (o ? " → " + o : "") + (oh ? " · " + oh : ""));
