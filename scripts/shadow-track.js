#!/usr/bin/env node
// 그림자 포트폴리오 — '세션의 판단이 기계적 스크린보다 나은가'를 재는 비교 기준(2026-10-21 사용자 승인, LLM 토큰 0).
//
// 왜: 추천 편성의 지수 대비 초과가 대부분 β(시장 민감도) 차이에서 나왔다(한국 β 0.40 — β 반영 시 -2%). 사람이 고른 편성이
//   '같은 스크린 점수 상위를 기계적으로 고른 편성'보다 나은지를 같은 날·같은 방식으로 재야 선별 실력을 알 수 있다.
// 규칙(고정): 국가마다 주제 순서(우량→성장→저평가→배당→히든)로 스크린(discovery-candidates.js)의 후보+현 편성 행 중
//   주제 기준 미달(fails)이 없는 것을 점수순으로 9개씩, 앞 주제에서 고른 종목은 건너뛴다(중복 없음 — 국가 45종목).
//   매주 월요일(또는 보유가 비었을 때) 다시 고르고, 그 사이는 그대로 보유한다. 동일비중·일별 연결.
// 비교 대상도 같은 방식으로 잰다: 추천 편성(정식 5주제 고유 종목, quotes.js 종가 — 매 기록일 그날 편성으로), 지수(KOSPI·S&P500·RSP).
// 출력: data/shadow.json — {startedAt, rule, korea|us: {series[{d, s 그림자, f 추천, i 지수, e RSP(미국)}], hold{rebalAt, items[{t,y,p}]}, picks{날짜:[티커]}}, summary}
//
// 사용법: node scripts/shadow-track.js            # 끝난 장 종가가 새로 생긴 나라만 한 줄 추가
//         node scripts/shadow-track.js --rebalance # 그림자 편성을 지금 다시 고른다
const fs = require("fs");
const path = require("path");
const { yahooQuote } = require("./lib-quote");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const OUT = path.join(DATA, "shadow.json");
const THEMES = ["core", "growth", "value", "dividend", "rising"];
const PER = 9, CONC = 6;
const FORCE_REBAL = process.argv.includes("--rebalance");

function load(file, key) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  const w = {};
  try { new Function("window", fs.readFileSync(p, "utf8"))(w); } catch (_e) { return null; }
  return w[key] || null;
}
const D = load("recommendations.js", "STOCK_DATA");
const Q = load("quotes.js", "STOCK_QUOTES") || {};
const SC = load("discovery-candidates.js", "DISCOVERY_CANDIDATES") || { groups: {} };
const state = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : null;
const today = new Date().toISOString().slice(0, 10);
const IDX = { korea: "kospi", us: "sp500" };

function yahooSym(c, row) {
  if (c === "korea") return row.ticker + (row.market === "KOSDAQ" ? ".KQ" : ".KS");
  return String(row.ticker).replace(".", "-");
}
// 그림자 편성 고르기 — 위 규칙 그대로
function pickShadow(c) {
  const chosen = [], seen = new Set();
  THEMES.forEach((th) => {
    const g = (SC.groups || {})[c + "|" + th];
    if (!g) return;
    const rows = (g.candidates || []).concat(g.incumbents || []).filter((r) => r && r.ticker && r.score != null && !(r.fails && r.fails.length));
    rows.sort((a, b) => b.score - a.score);
    let n = 0;
    rows.forEach((r) => {
      if (n >= PER || seen.has(r.ticker)) return;
      seen.add(r.ticker); n++;
      chosen.push({ t: r.ticker, y: yahooSym(c, r), th });
    });
  });
  return chosen;
}
async function closes(items) {
  const out = {};
  let i = 0;
  await Promise.all(Array.from({ length: CONC }, async () => {
    while (i < items.length) {
      const it = items[i++];
      try { const q = await yahooQuote(it.y); if (q.close != null) out[it.t] = { p: q.close, d: q.closeDate }; } catch (_e) { /* 그날 빠진 종목은 수익 계산에서 제외 */ }
    }
  }));
  return out;
}
function formalCloses(c) {
  const out = {}, qs = Q.quotes || {};
  (D[c] || []).filter((s) => THEMES.includes(s.theme)).forEach((s) => {
    const q = qs[s.ticker];
    if (q && q.close != null && q.closeDate) out[s.ticker] = { p: q.close, d: q.closeDate };
  });
  return out;
}
// 보유 바구니의 동일비중 수익(이전 가격 대비) — 두 날짜 모두 가격이 있는 종목만
function basketRet(items, now) {
  const r = [];
  items.forEach((it) => { const x = now[it.t]; if (x && it.p > 0 && x.p > 0) r.push(x.p / it.p - 1); });
  return r.length ? r.reduce((a, b) => a + b, 0) / r.length : null;
}
// β·β 반영 초과(주간 수익 회귀, 6주 이상)
function stats(series, key) {
  if (series.length < 2) return null;
  const a = series[0], z = series[series.length - 1];
  const res = { from: a.d, to: z.d, ret: (z[key] / a[key] - 1) * 100, idx: (z.i / a.i - 1) * 100 };
  const wk = [];
  for (let k = 5; k < series.length; k += 5) wk.push([series[k][key] / series[k - 5][key] - 1, series[k].i / series[k - 5].i - 1]);
  if (wk.length >= 6) {
    const mx = wk.reduce((s, x) => s + x[1], 0) / wk.length, my = wk.reduce((s, x) => s + x[0], 0) / wk.length;
    let sxy = 0, sxx = 0; wk.forEach((x) => { sxy += (x[1] - mx) * (x[0] - my); sxx += (x[1] - mx) ** 2; });
    if (sxx > 0) { res.beta = Math.round(sxy / sxx * 100) / 100; res.betaAlpha = res.ret - res.beta * res.idx; }
  }
  ["ret", "idx", "betaAlpha"].forEach((k) => { if (res[k] != null) res[k] = Math.round(res[k] * 100) / 100; });
  return res;
}

async function main() {
  if (!D || !SC.groups) { console.log("shadow-track: 데이터 없음 — 건너뜀"); return; }
  const S = state || { startedAt: today, rule: "국가별 주제 순서대로 스크린 점수 상위 9(주제 기준 미달 제외·중복 없음), 매주 월요일 재선정, 동일비중", korea: {}, us: {} };
  const ix = Q.indices || {};
  for (const c of ["korea", "us"]) {
    const C = S[c] = S[c] || {};
    C.series = C.series || []; C.picks = C.picks || {};
    const idx = ix[IDX[c]];
    if (!idx || idx.close == null || !idx.closeDate) { console.log("shadow-track " + c + ": 지수 종가 없음 — 건너뜀"); continue; }
    const dNow = idx.closeDate, last = C.series[C.series.length - 1];
    const fNow = formalCloses(c);
    const hold = C.hold && C.hold.items && C.hold.items.length ? C.hold : null;
    const sNow = hold ? await closes(hold.items) : {};
    if (last && dNow > last.d) {
      // 끝난 장 하나 지남 — 지난 기록일 보유분의 수익으로 연결
      const rs = basketRet(hold ? hold.items : [], sNow), rf = basketRet(C.formal || [], fNow);
      const pt = { d: dNow,
        s: Math.round(last.s * (1 + (rs || 0)) * 1e6) / 1e6,
        f: Math.round(last.f * (1 + (rf || 0)) * 1e6) / 1e6,
        i: Math.round(last.i * (idx.close / C.idxClose) * 1e6) / 1e6 };
      if (c === "us" && ix.rsp && ix.rsp.close && C.rspClose) pt.e = Math.round(last.e * (ix.rsp.close / C.rspClose) * 1e6) / 1e6;
      C.series.push(pt);
    } else if (!last) {
      C.series.push(Object.assign({ d: dNow, s: 1, f: 1, i: 1 }, c === "us" ? { e: 1 } : {}));
    }
    // 다음 구간의 기준 가격 — 그림자는 보유 종목 종가, 추천은 오늘 편성(매 기록일 그날 편성으로 갈아 끼움)
    if (hold) hold.items.forEach((it) => { if (sNow[it.t]) it.p = sNow[it.t].p; });
    C.formal = Object.keys(fNow).map((t) => ({ t, p: fNow[t].p }));
    C.idxClose = idx.close;
    if (c === "us" && ix.rsp && ix.rsp.close) C.rspClose = ix.rsp.close;
    // 재선정 — 보유가 없거나, 월요일(UTC) 첫 실행이거나, 강제
    const monday = new Date().getUTCDay() === 1 && (!hold || hold.rebalAt < today);
    if (!hold || monday || FORCE_REBAL) {
      const picks = pickShadow(c);
      const px = await closes(picks);
      C.hold = { rebalAt: today, items: picks.filter((it) => px[it.t]).map((it) => ({ t: it.t, y: it.y, th: it.th, p: px[it.t].p })) };
      C.picks[today] = C.hold.items.map((it) => it.t);
      const keep = Object.keys(C.picks).sort().slice(-26); const kept = {}; keep.forEach((k) => { kept[k] = C.picks[k]; }); C.picks = kept;
      console.log("shadow-track " + c + ": 그림자 편성 " + C.hold.items.length + "종목 선정(" + today + ")");
    }
    C.summary = { shadow: stats(C.series, "s"), formal: stats(C.series, "f") };
    if (C.summary.shadow && C.summary.formal) C.summary.edge = Math.round((C.summary.formal.ret - C.summary.shadow.ret) * 100) / 100;
    console.log("shadow-track " + c + ": " + C.series.length + "일 기록 · " + (C.summary.formal ? "추천 " + C.summary.formal.ret + "% · 그림자 " + C.summary.shadow.ret + "% · 지수 " + C.summary.formal.idx + "%" : "첫 기록"));
  }
  fs.writeFileSync(OUT, JSON.stringify(S) + "\n");
}

main().catch((e) => { console.error("shadow-track 오류: " + e.message); process.exitCode = 1; });
