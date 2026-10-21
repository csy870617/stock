#!/usr/bin/env node
// 그림자 포트폴리오 — '세션의 판단이 기계적 스크린보다 나은가'를 재는 비교 기준(2026-10-21 사용자 승인, LLM 토큰 0).
//
// 왜: 추천 편성의 지수 대비 초과가 대부분 β(시장 민감도) 차이에서 나왔다(한국 β 0.40 — β 반영 시 -2%). 사람이 고른 편성이
//   '같은 스크린 점수 상위를 기계적으로 고른 편성'보다 나은지를 같은 날·같은 방식으로 재야 선별 실력을 알 수 있다.
// 규칙(고정): 국가마다 주제 순서(우량→성장→저평가→배당→히든)로 스크린(discovery-candidates.js)의 후보+현 편성 행 중
//   주제 기준 미달(fails)이 없는 것을 점수순으로 9개씩, 앞 주제에서 고른 종목은 건너뛴다(중복 없음 — 국가 45종목).
//   매주 월요일(또는 마지막 재선정 7일 경과·보유가 비었을 때) 다시 고르고, 그 사이는 그대로 보유한다. 동일비중·일별 연결.
// 비교 대상도 같은 방식으로 잰다: 추천 편성(정식 5주제 고유 종목 — 매 기록일 그날 편성으로 갈아 끼움, 다음 기록일에 빠진 종목도
//   야후 종가로 그날 수익을 잰다), 지수(KOSPI·S&P500, 미국은 RSP 도). 주제별로도 같은 계산(추천 그 주제 9종목 vs 그림자 그 주제 9종목).
// 출력: data/shadow.json — {startedAt, rule, korea|us: {series[{d, s 그림자, f 추천, i 지수, e RSP}], th{주제:{s,f}}, hold, formal, picks, summary}}
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
const PER = 9, CONC = 6, REBAL_DAYS = 7;
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
const dayDiff = (a, b) => Math.round((Date.parse(a) - Date.parse(b)) / 86400000);

function yahooSym(c, ticker, market) {
  if (c === "korea") return ticker + (market === "KOSDAQ" ? ".KQ" : ".KS");
  return String(ticker).replace(".", "-");
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
      chosen.push({ t: r.ticker, y: yahooSym(c, r.ticker, r.market), th });
    });
  });
  return chosen;
}
// 추천 편성(정식 5주제) — 종목마다 속한 주제 목록(같은 종목이 두 주제에 있으면 둘 다)
function formalNow(c) {
  const by = {};
  (D[c] || []).filter((s) => THEMES.includes(s.theme)).forEach((s) => {
    const x = by[s.ticker] || (by[s.ticker] = { t: s.ticker, y: yahooSym(c, s.ticker, s.market), th: [] });
    if (!x.th.includes(s.theme)) x.th.push(s.theme);
  });
  return Object.values(by);
}
// maxD: 기준 지수 종가일보다 새 종가는 버린다 — quotes.js 를 받은 뒤 이 스크립트가 도는 사이에 장이 끝나면
//   야후 종가만 하루 앞서 그림자 쪽에만 하루가 더 잡힌다(그 종목은 이번 구간에서 빼고 기준가를 남겨 다음 구간에 잡는다).
async function yahooCloses(items, maxD) {
  const out = {};
  let i = 0;
  await Promise.all(Array.from({ length: CONC }, async () => {
    while (i < items.length) {
      const it = items[i++];
      try {
        const q = await yahooQuote(it.y);
        if (q.close != null && !(maxD && q.closeDate && q.closeDate > maxD)) out[it.t] = { p: q.close, d: q.closeDate };
      } catch (_e) { /* 그날 빠진 종목은 수익 계산에서 제외 */ }
    }
  }));
  return out;
}
// 추천 종목 종가 — quotes.js(오늘 편성 종목)를 쓰고, 지난 기록일 바구니에서 빠진 종목만 야후로 받는다
async function formalCloses(c, need, maxD) {
  const out = {}, qs = Q.quotes || {}, miss = [];
  need.forEach((it) => {
    const q = qs[it.t];
    if (q && q.close != null && q.closeDate) out[it.t] = { p: q.close, d: q.closeDate };
    else if (it.y) miss.push(it);
  });
  if (miss.length) Object.assign(out, await yahooCloses(miss, maxD));
  return out;
}
// 바구니의 동일비중 수익(지난 가격 대비) — 두 날짜 모두 가격이 있는 종목만. filter 로 주제별 부분 바구니
function basketRet(items, now, filter) {
  const r = [];
  items.forEach((it) => {
    if (filter && !filter(it)) return;
    const x = now[it.t];
    if (x && it.p > 0 && x.p > 0) r.push(x.p / it.p - 1);
  });
  return r.length ? r.reduce((a, b) => a + b, 0) / r.length : null;
}
const r6 = (v) => Math.round(v * 1e6) / 1e6, r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
// 기간 수익·지수·β·β 반영 초과(주간 = 5거래일 묶음 회귀, 6주 이상)
function stats(series, key) {
  if (series.length < 2) return null;
  const a = series[0], z = series[series.length - 1];
  const res = { from: a.d, to: z.d, ret: (z[key] / a[key] - 1) * 100, idx: (z.i / a.i - 1) * 100 };
  if (a.e && z.e) res.eq = (z.e / a.e - 1) * 100;
  const wk = [];
  for (let k = 5; k < series.length; k += 5) wk.push([series[k][key] / series[k - 5][key] - 1, series[k].i / series[k - 5].i - 1]);
  if (wk.length >= 6) {
    const mx = wk.reduce((s, x) => s + x[1], 0) / wk.length, my = wk.reduce((s, x) => s + x[0], 0) / wk.length;
    let sxy = 0, sxx = 0; wk.forEach((x) => { sxy += (x[1] - mx) * (x[0] - my); sxx += (x[1] - mx) ** 2; });
    if (sxx > 0) { res.beta = Math.round(sxy / sxx * 100) / 100; res.betaAlpha = res.ret - res.beta * res.idx; }
  }
  ["ret", "idx", "eq", "betaAlpha"].forEach((k) => { if (res[k] != null) res[k] = r2(res[k]); });
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
    // 지수 날짜가 거꾸로 가면(야후 일시 오류로 옛 시세) 아무것도 바꾸지 않는다 — 옛 가격으로 기준을 덮으면 다음 날 수익이 두 번 잡힌다
    if (last && dNow < last.d) { console.log("shadow-track " + c + ": 지수 날짜 " + dNow + " < 마지막 기록 " + last.d + " — 건너뜀"); continue; }
    const hold = C.hold && C.hold.items && C.hold.items.length ? C.hold : null;
    const prevFormal = C.formal || [];
    const fNowList = formalNow(c);
    const needF = prevFormal.concat(fNowList.filter((x) => !prevFormal.some((y) => y.t === x.t)));
    const fNow = await formalCloses(c, needF, dNow);
    const sNow = hold ? await yahooCloses(hold.items, dNow) : {};
    C.th = C.th || {};
    THEMES.forEach((th) => { C.th[th] = C.th[th] || { s: 1, f: 1 }; });
    const rspOk = c === "us" && ix.rsp && ix.rsp.close > 0;
    if (last && dNow > last.d && C.idxClose > 0) {
      // 끝난 장이 새로 생김 — 지난 기록일 보유분의 수익으로 연결(전체·주제별)
      const rs = basketRet(hold ? hold.items : [], sNow), rf = basketRet(prevFormal, fNow);
      const pt = { d: dNow, s: r6(last.s * (1 + (rs || 0))), f: r6(last.f * (1 + (rf || 0))), i: r6(last.i * (idx.close / C.idxClose)) };
      // RSP 가 하루 빠지면 그날은 그대로 두고 기준가(rspClose)도 남긴다 — 다음 날 두 날치를 한 번에 잇는다(연결이 끊기지 않게)
      if (c === "us" && last.e) pt.e = rspOk && C.rspClose > 0 ? r6(last.e * (ix.rsp.close / C.rspClose)) : last.e;
      C.series.push(pt);
      THEMES.forEach((th) => {
        const a = basketRet(hold ? hold.items : [], sNow, (it) => it.th === th);
        const b = basketRet(prevFormal, fNow, (it) => (it.th || []).includes(th));
        C.th[th] = { s: r6(C.th[th].s * (1 + (a || 0))), f: r6(C.th[th].f * (1 + (b || 0))) };
      });
    } else if (!last) {
      C.series.push(Object.assign({ d: dNow, s: 1, f: 1, i: 1 }, c === "us" ? { e: 1 } : {}));
    }
    // 다음 구간의 기준 가격 — 그림자는 보유 종목 종가, 추천은 오늘 편성(매 기록일 그날 편성으로 갈아 끼움)
    if (hold) hold.items.forEach((it) => { if (sNow[it.t]) it.p = sNow[it.t].p; });
    C.formal = fNowList.filter((x) => fNow[x.t]).map((x) => ({ t: x.t, y: x.y, th: x.th, p: fNow[x.t].p }));
    C.idxClose = idx.close;
    if (rspOk) C.rspClose = ix.rsp.close;
    // 재선정 — 보유가 없거나, 월요일(UTC) 첫 실행이거나, 마지막 재선정 7일 경과(월요일 실행이 실패한 주), 또는 강제
    const due = !hold || FORCE_REBAL || dayDiff(today, hold.rebalAt) >= REBAL_DAYS || (new Date().getUTCDay() === 1 && hold.rebalAt < today);
    if (due) {
      const picks = pickShadow(c);
      const px = await yahooCloses(picks);
      // 계속 담는 종목은 방금 맞춘 기준가(지수 종가일 기준)를 잇는다 — 야후 종가가 그보다 새것이거나 빠졌을 때 하루가 새지 않게
      const oldP = {};
      if (hold) hold.items.forEach((it) => { if (it.p > 0) oldP[it.t] = it.p; });
      const base = (t) => (px[t] && !(px[t].d > dNow) ? px[t].p : (oldP[t] || (px[t] && px[t].p)));
      const before = new Set(Object.keys(oldP));
      C.hold = { rebalAt: today, items: picks.filter((it) => base(it.t) > 0).map((it) => ({ t: it.t, y: it.y, th: it.th, p: base(it.t) })) };
      C.hold.changed = hold ? C.hold.items.filter((x) => !before.has(x.t)).length : null;
      C.picks[today] = C.hold.items.map((it) => it.t);
      const keep = Object.keys(C.picks).sort().slice(-26), kept = {};
      keep.forEach((k) => { kept[k] = C.picks[k]; }); C.picks = kept;
      console.log("shadow-track " + c + ": 그림자 편성 " + C.hold.items.length + "종목 선정(" + today + (C.hold.changed != null ? ", 바뀐 종목 " + C.hold.changed : "") + ")");
    }
    const sum = { shadow: stats(C.series, "s"), formal: stats(C.series, "f") };
    if (sum.shadow && sum.formal) {
      sum.edge = r2(sum.formal.ret - sum.shadow.ret);
      sum.themes = {};
      THEMES.forEach((th) => {
        const x = C.th[th], s = (x.s - 1) * 100, f = (x.f - 1) * 100;
        sum.themes[th] = { s: r2(s), f: r2(f), edge: r2(f - s) };
      });
    }
    C.summary = sum;
    console.log("shadow-track " + c + ": " + C.series.length + "일 기록 · " + (sum.formal ? "추천 " + sum.formal.ret + "% · 그림자 " + sum.shadow.ret + "% · 지수 " + sum.formal.idx + "% · 판단 기여 " + sum.edge + "%p" : "첫 기록"));
  }
  fs.writeFileSync(OUT, JSON.stringify(S, null, 1) + "\n");
}

main().catch((e) => { console.error("shadow-track 오류: " + e.message); process.exitCode = 1; });
