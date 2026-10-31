#!/usr/bin/env node
// 실적 발표 전 '실적 주의' 표시(검증: scripts/research/earn-shock/) — 선정 규칙에는 쓰지 않고 앱이 알리기만 한다(매도 신호가 아니다).
//   대상: 편성(정식·주목·관심·보유) 종목. 나라마다 규칙이 다르다.
//   미국(2026-10-30 사용자 선택 · 10-31 '발표날이 가깝지 않더라도 미리' — 앞당기기 시험 PREREG-LEAD): 아래 위험 신호 4개 중 3개 이상이면,
//     발표가 얼마나 남았든(다음 발표까지). 과거 발표 1만 8천여 건에서 발표 때 크게 움직일 확률(위·아래 모두)이 약 2배 — 방향은 가르지 못했다.
//     tp   증권사 목표가 평균 3개월 −5% 이하(야후 증권사별 이력 — 180일 안 증권사별 최신, 3곳 이상)
//     prev 직전 실적 발표 반응(발표 전날 → 다음 날 종가, 지수 대비) −5% 이하(200일 안, events.js 지난 발표일)
//     weak 최근 60거래일 지수 대비 −10% 이하(data/trend 의 1년 일봉·지수)
//     pre  30일 목표가 내림 2건 이상이고 올림보다 많음
//   한국(2026-10-31 한국 프리뷰 시험 PREREG-KR — 사전 기준 미달이지만 사용자 선택 '프리뷰 기준으로 바꾸기'): 다음 발표가 20거래일 안이고
//     최근 30일 증권사 리포트(제목 + 미리보기 240자)에서 부정 낱말 리포트가 긍정 낱말 리포트보다 많으면. 뜻은 '기대에 못 미칠 가능성' —
//     과거 발표에서 반응이 평균 1.5%p 낮았고, 그 차이는 크게 빠지는 쪽이 아니라 크게 오르지 못하는 쪽에서 나왔다.
//     발표일을 공지하지 않았으면 작년 같은 분기 잠정실적 공시일(52주 뒤)로 추정한다('추정' 표시).
// 사용: node scripts/update-earn-risk.js → data/earn-risk.js(window.EARN_RISK)
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const OUT = path.join(DATA, "earn-risk.js");
const WIN = { korea: 20, us: null }, MIN = 3;   // 발표까지 남은 거래일 상한 — null 은 '얼마나 남았든(다음 발표까지)', MIN 은 미국 신호 수
// 한국 프리뷰 낱말(연구 PREREG-KR 그대로)
const NEG = /하회|부진|쇼크|우려|눈높이|하향|적자|감익/;
const POS = /상회|서프라이즈|호실적|호조|상향|증익|흑자\s*전환|흑전|최대/;
const PREVIEW_DAYS = 30, PREVIEW_CHARS = 240;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
// 나라별 근거(scripts/research/earn-shock/README.md '앞당기기 시험'·'한국 프리뷰 시험')
const EVIDENCE = {
  us: "미국 실적 발표 1만 8천여 건(2017~2026)에서 위험 신호가 3개 이상이면 발표 때 −10% 이하 폭락이 약 10%, +10% 이상 급등이 약 11%였습니다(신호가 없을 때 4%·6%). " +
    "발표 3개월 전에 잰 신호로도 비율이 거의 같았습니다. 크게 움직일 때가 많았지만 평균 방향은 같았습니다 — 매도 신호가 아니라 발표 때 변동이 커질 수 있다는 표시입니다.",
  korea: "한국 실적 발표 2,488건(2021~2026, 발표 전 30일 안에 증권사 리포트가 있던 발표)에서 프리뷰에 부정적인 말(하회·부진·우려 등)이 긍정적인 말(상회·호실적 등)보다 많았던 발표는 " +
    "발표 때 반응이 평균 1.5%p 낮았습니다(앞뒤 두 기간 모두 같은 방향, 발표 한 달 전에 잰 프리뷰도 같음). 차이는 크게 빠지는 쪽(−10% 이하 4.7% vs 4.8%)이 아니라 " +
    "크게 오르지 못하는 쪽(+10% 이상 4.0% vs 8.5%)에서 나왔습니다 — 쇼크 경고가 아니라 '기대에 못 미칠 가능성'이라는 표시입니다(미리 정한 기준엔 조금 못 미쳐 사용자 선택으로 보입니다).",
};

function load(file, key) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  const w = {};
  try { new Function("window", fs.readFileSync(p, "utf8"))(w); } catch (_e) { return null; }
  return w[key] || null;
}
const readJ = (p) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch (_e) { return null; } };
const ok = (v) => v != null && isFinite(v);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const dayShift = (iso, k) => new Date(Date.parse(iso + "T00:00:00Z") + k * 864e5).toISOString().slice(0, 10);
const monthsBack = (iso, k) => {
  const y = +iso.slice(0, 4), m = +iso.slice(5, 7) - 1 - k, d = +iso.slice(8, 10);
  const yy = y + Math.floor(m / 12), mm = ((m % 12) + 12) % 12, last = new Date(Date.UTC(yy, mm + 1, 0)).getUTCDate();
  return yy + "-" + String(mm + 1).padStart(2, "0") + "-" + String(Math.min(d, last)).padStart(2, "0");
};
// T 다음 날부터 date 까지의 평일 수(공휴일은 보지 않는다) — 0 이면 발표 당일
function tdays(a, b) { let n = 0, d = Date.parse(a + "T00:00:00Z"); const e = Date.parse(b + "T00:00:00Z"); while (d < e) { d += 864e5; const w = new Date(d).getUTCDay(); if (w !== 0 && w !== 6) n++; } return n; }
const r1 = (v) => (ok(v) ? Math.round(v * 1000) / 10 : null);
const curl = (args) => new Promise((res) => execFile("curl", ["-s", "--max-time", "20", "-A", UA].concat(args), { maxBuffer: 32 << 20 }, (e, out) => res(e ? null : out)));
async function getJson(url, extra) { for (let i = 0; i < 3; i++) { const o = await curl((extra || []).concat([url])); try { return JSON.parse(o); } catch (_e) { /* 다시 */ } await wait(700 * (i + 1)); } return null; }

// 다음 발표일 추정(예정일이 없을 때): 지난 발표일의 52주 뒤(요일 유지) 가운데 T 뒤이고 마지막 발표보다 45일 넘게 뒤인 첫 날. 화면엔 '추정'.
function estimateNext(dates, T) {
  const ds = (dates || []).filter(Boolean).sort(), last = ds[ds.length - 1];
  for (const d of ds) { const e = dayShift(d, 364); if (e > T && (!last || Date.parse(e) - Date.parse(last) > 45 * 864e5)) return e; }
  return null;
}

// ── 미국: 야후 증권사별 목표가 이력(이번 대상 종목만) ──
const JAR = path.join(os.tmpdir(), "earn-risk-yahoo.txt");
let crumb;
async function yahooHistory(t) {
  if (crumb === undefined) {
    await curl(["-c", JAR, "-o", "/dev/null", "https://fc.yahoo.com"]);
    const c = await curl(["-b", JAR, "https://query2.finance.yahoo.com/v1/test/getcrumb"]);
    crumb = c && c.length < 40 && !/[<{\s]/.test(c.trim()) ? c.trim() : null;
  }
  if (!crumb) return null;
  const j = await getJson("https://query2.finance.yahoo.com/v10/finance/quoteSummary/" + encodeURIComponent(t.replace(".", "-")) + "?modules=upgradeDowngradeHistory&crumb=" + encodeURIComponent(crumb), ["-b", JAR]);
  const r = j && j.quoteSummary && j.quoteSummary.result && j.quoteSummary.result[0];
  if (!r) return null;
  return ((r.upgradeDowngradeHistory && r.upgradeDowngradeHistory.history) || []).map((x) => ({ d: new Date(x.epochGradeDate * 1000).toISOString().slice(0, 10), f: x.firm || "", act: x.priceTargetAction || "", g: x.currentPriceTarget > 0 ? x.currentPriceTarget : null }))
    .sort((a, b) => (a.d < b.d ? -1 : 1));
}
function usConsensusChange(h, T) {
  const at = (D) => { const from = dayShift(D, -180), last = new Map(); for (const x of h) { if (x.d > D) break; if (x.d > from && x.g) last.set(x.f, x.g); } if (last.size < 3) return null; const g = [...last.values()]; return g.reduce((s, v) => s + v, 0) / g.length; };
  const a = at(T), b = at(monthsBack(T, 3));
  if (!a || !b) return null;
  const c = a / b - 1;
  return Math.abs(c) > 0.5 ? null : c;   // 분할 등 단위가 어긋난 이력
}

// ── 한국: 지난 잠정실적 공시일(네이버 공시 — 연구 fetch-events.js 와 같은 정의, 약 14개월치) ──
async function krEarningsDates(code, T) {
  const raw = [], since = dayShift(T, -430);
  for (let p = 1; p <= 6; p++) {
    const j = await getJson("https://m.stock.naver.com/api/stock/" + code + "/disclosure?page=" + p + "&pageSize=100");
    if (!Array.isArray(j)) return null;
    if (!j.length) break;
    let oldest = "9999";
    j.forEach((x) => { const d = String(x.datetime || "").slice(0, 10); if (d && d < oldest) oldest = d; raw.push([d, String(x.title || "")]); });
    if (oldest < since || j.length < 100) break;
    await wait(150);
  }
  const a = raw.filter((x) => /영업\(잠정\)실적/.test(x[1]) && !/정정/.test(x[1]));
  const cons = a.filter((x) => /연결재무제표기준영업\(잠정\)실적/.test(x[1]));
  const ds = [...new Set((cons.length ? cons : a).map((x) => x[0]).filter(Boolean))].sort(), out = [];
  for (const d of ds) { if (!cons.length && out.length && Date.parse(d) - Date.parse(out[out.length - 1]) < 45 * 864e5) continue; out.push(d); }   // 연결 공시가 없으면 45일 안 공시는 월별 판매로 본다
  return out;
}
// ── 한국: 최근 30일 증권사 리포트(네이버 리서치 목록 — 제목 + 미리보기 240자, 연구와 같다) ──
async function krReports(code, T) {
  const from = dayShift(T, -PREVIEW_DAYS), out = [];
  for (let p = 1; p <= 5; p++) {
    const j = await getJson("https://m.stock.naver.com/api/research/stock/" + code + "?pageSize=20&page=" + p);
    if (!Array.isArray(j)) return out.length ? out : null;
    if (!j.length) break;
    let older = false;
    for (const x of j) {
      if (!x.writeDate || x.writeDate <= from) { older = true; continue; }
      if (x.writeDate > T) continue;
      out.push({ d: x.writeDate, by: x.brokerName || "", txt: String(x.title || "") + " " + String(x.previewContent || "").slice(0, PREVIEW_CHARS) });
    }
    if (older || j.length < 20) break;
    await wait(150);
  }
  return out;
}

(async () => {
  const D = load("recommendations.js", "STOCK_DATA");
  if (!D) { console.error("update-earn-risk: recommendations.js 를 읽지 못함"); process.exit(1); }
  const T = (load("stock-ta.js", "STOCK_TA") || {}).asOf || new Date().toISOString().slice(0, 10);
  const EV = (load("events.js", "STOCK_EVENTS") || {}).items || {};
  const seen = new Set(), todo = [];
  let krFail = 0;
  for (const c of ["korea", "us"]) for (const s of D[c] || []) {
    if (seen.has(s.ticker)) continue; seen.add(s.ticker);
    const ev = EV[s.ticker] || {};
    let n = ev.next && ev.next.date && ev.next.date >= T ? ev.next : null;
    if (c === "us") {
      // 발표가 얼마나 남았든 — 다만 방금 발표해 반응이 끝나지 않았으면(발표 다음 날까지) 이번 발표를 미리 본 것이 아니라 건너뛴다(연구와 같은 조건)
      const last = (ev.hist || []).map((h) => h.date).filter((d) => d && d <= T).sort().pop();
      if (last && tdays(last, T) < 2) continue;
      if (!n) { const e = estimateNext((ev.hist || []).map((h) => h.date), T); if (e) n = { date: e, tentative: true, est: true }; }
      todo.push({ c, t: s.ticker, name: s.name, date: n ? n.date : null, dn: n ? tdays(T, n.date) : null, tentative: !!(n && n.tentative), est: !!(n && n.est) });
      continue;
    }
    if (!n) {   // 한국 — 공지한 일정이 없으면 작년 같은 분기로 추정(잠정 공시를 하지 않는 회사는 연구 표본 밖이라 건너뜀)
      const ds = await krEarningsDates(s.ticker, T);
      if (ds == null) { krFail++; continue; }
      const e = estimateNext(ds, T); if (e) n = { date: e, tentative: true, est: true };
      await wait(150);
    }
    if (!n) continue;
    const dn = tdays(T, n.date);
    if (dn > WIN.korea) continue;
    todo.push({ c, t: s.ticker, name: s.name, date: n.date, dn, tentative: !!n.tentative, est: !!n.est });
  }
  const items = {};
  let yFail = 0;
  for (const x of todo) {
    if (x.c === "korea") {
      const R = await krReports(x.t, T);
      if (R == null) { krFail++; continue; }
      const neg = R.filter((r) => NEG.test(r.txt)), pos = R.filter((r) => POS.test(r.txt)).length;
      const risk = neg.length > pos;
      let pre = { n: R.length, neg: neg.length, pos };
      if (neg.length) {   // 가장 최근 부정 문구 — 걸린 낱말 앞뒤를 짧게(화면에 '어디서 무엇이' 보이게)
        const h = neg.sort((a, b) => (a.d < b.d ? -1 : 1))[neg.length - 1], txt = h.txt.replace(/\s+/g, " "), m = txt.search(NEG);
        pre = Object.assign(pre, { by: h.by, d: h.d, hit: txt.slice(Math.max(0, m - 14), m + 12).trim() });
      }
      items[x.t] = { c: x.c, kind: "preview", date: x.date, dn: x.dn, tentative: x.tentative || undefined, est: x.est || undefined, n: neg.length, flags: risk ? ["pre"] : [], risk, pre };
      await wait(150);
      continue;
    }
    const tr = readJ(path.join(DATA, "trend", x.t + ".json"));
    const S = tr && tr.series, bars = S && S.t ? S.t.map((d, i) => [d, S.c[i], S.m[i]]) : [];
    const idxOn = (iso) => { const k = +iso.replace(/-/g, ""); return bars.findIndex((b) => b[0] >= k); };
    const sig = {};
    // weak — 60거래일 지수 대비
    { let i = -1; const k = +T.replace(/-/g, ""); bars.forEach((b, j) => { if (b[0] <= k) i = j; });
      if (i >= 60 && bars[i - 60][2] > 0) sig.weak = (bars[i][1] / bars[i - 60][1] - 1) - (bars[i][2] / bars[i - 60][2] - 1); }
    // prev — 직전 발표 반응
    const ref = x.date || T;   // 다음 발표일(모르면 기준일)
    const pd = ((EV[x.t] && EV[x.t].hist) || []).map((h) => h.date).filter((d) => d && d < ref && d <= T).sort().pop() || null;
    if (pd && Date.parse(ref) - Date.parse(pd) <= 200 * 864e5) {
      const i = idxOn(pd);
      if (i >= 1 && i + 1 < bars.length && bars[i - 1][2] > 0) sig.prev = { d: pd, ar: (bars[i + 1][1] / bars[i - 1][1] - 1) - (bars[i + 1][2] / bars[i - 1][2] - 1) };
    }
    // tp·pre — 증권사
    const h = await yahooHistory(x.t);
    if (!h) yFail++;
    else {
      const c = usConsensusChange(h, T); if (ok(c)) sig.tp = c;
      const from = dayShift(T, -30), w = h.filter((r) => r.d > from && r.d <= T);
      sig.pre = { lo: w.filter((r) => r.act === "Lowers").length, up: w.filter((r) => r.act === "Raises").length };
    }
    await wait(300);
    const flags = [];
    if (ok(sig.tp) && sig.tp <= -0.05) flags.push("tp");
    if (sig.prev && sig.prev.ar <= -0.05) flags.push("prev");
    if (ok(sig.weak) && sig.weak <= -0.10) flags.push("weak");
    if (sig.pre && sig.pre.lo >= 2 && sig.pre.lo > sig.pre.up) flags.push("pre");
    items[x.t] = { c: x.c, date: x.date, dn: x.dn, tentative: x.tentative || undefined, est: x.est || undefined, n: flags.length, flags, risk: flags.length >= MIN,
      tp: r1(sig.tp), prev: sig.prev ? { d: sig.prev.d, ar: r1(sig.prev.ar) } : null, weak: r1(sig.weak), pre: sig.pre || null };
  }
  const doc = { asOf: T, builtAt: new Date().toISOString().slice(0, 19) + "Z", rule: { days: WIN, min: MIN, korea: "preview" }, evidence: EVIDENCE.us, evidenceBy: EVIDENCE, items };
  fs.writeFileSync(OUT, "// 실적 발표 전 '실적 주의' — scripts/update-earn-risk.js 가 매일 생성(토큰 0). 검증: scripts/research/earn-shock/ — 미국은 변동 크기, 한국은 기대 하회 가능성\n" +
    "window.EARN_RISK = " + JSON.stringify(doc) + ";\n");
  const when = (v) => (v.dn == null ? "발표일 미정" : "D-" + v.dn + (v.est ? " 추정" : ""));
  const kr = Object.entries(items).filter(([, v]) => v.c === "korea"), us = Object.entries(items).filter(([, v]) => v.c === "us");
  console.log("한국(발표 20거래일 안) " + kr.length + "종목 · 프리뷰 부정 우세: " + (kr.filter(([, v]) => v.risk).map(([t, v]) => t + "(부정 " + v.pre.neg + " vs 긍정 " + v.pre.pos + ", " + when(v) + ")").join(", ") || "없음") +
    " | 미국(다음 발표까지) " + us.length + "종목 · 위험 신호 3개 이상: " + (us.filter(([, v]) => v.risk).map(([t, v]) => t + "(" + v.n + "/4, " + when(v) + ")").join(", ") || "없음") +
    (yFail ? " · 야후 이력 실패 " + yFail : "") + (krFail ? " · 네이버 실패 " + krFail : ""));
  if (yFail && yFail === todo.filter((x) => x.c === "us").length && yFail > 2) console.log("::warning::update-earn-risk: 야후 목표가 이력을 받지 못했다 — 미국은 목표가·프리뷰 신호 없이 계산");
  if (krFail > 5) console.log("::warning::update-earn-risk: 네이버 공시·리서치를 " + krFail + "종목 받지 못했다 — 한국 실적 주의가 빠졌을 수 있다");
})();
