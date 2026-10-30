#!/usr/bin/env node
// 돈의 흐름(유동성) — LLM 토큰 0 (순수 스크립트, refresh-quotes Action·A 회차 backbone 에서 실행)
//
// 2026-10-30 사용자 요청 '유동성은 돈의 흐름이고 정말 중요하다 — 철저히 연구하고 화면에 직관적으로'.
// 사전 등록 연구(scripts/research/liquidity/ — PREREG.md·README.md)를 통과한 것만 '앞으로'에 쓰고, 나머지는 지금의 흐름(사실)으로만 보인다.
//   통과: 미국 흐름 점수 → 다음 12개월 S&P500(표본 밖 R² +7.6%) · 한국 투자자예탁금·신용융자 3개월 증가 → 다음 3개월 코스피(+11.4%·+1.5%)
//         · 한국 흐름 점수·미국 연준 순유동성 3개월 변화 → 다음 12개월 코스피 · 미국 신용 스프레드·금융여건 악화 → 다음 3개월 −10% 급락 확률(S&P500).
//   미달: 지금 게이지(update-liquidity-gauge.js — 금리 수준·VIX·하이일드·코스피 모멘텀) — '전망'이라 부르지 않는다.
//
// 흐름 점수 = 구성 '변화' 신호를 직전 60개월(최소 36개월) 평균·표준편차로 z 화해 우호 방향으로 맞춘 평균(3개 이상)
//   미국: 연준 순유동성 3개월 변화율(+) · 신용 스프레드(Baa−10년) 3개월 변화(−) · 금융여건지수(NFCI) 3개월 변화(−) · 달러인덱스 3개월 변화율(−) · 실질 M2 증가율(+)
//   한국: 투자자예탁금 3개월 변화율(+) · 회사채(AA−3년)−국고 3년 스프레드 3개월 변화(−) · 원/달러 3개월 변화율(−) · 외국인 순매수 3개월 합 z(+) · 미국 순유동성(+)
//   단계 = 지금 점수가 직전 60개월 월말 점수 중 어디인가(20% 씩 5단계).
// 신용 경고(미국) = 신용 스프레드 수준·3개월 변화·NFCI 수준·3개월 변화 각각이 직전 60개월의 나쁜 3분의 1 안인가.
// 공개 지연(룩어헤드 방지 — 연구와 같다): 연준 주간 자료 2일·NFCI 5일·예탁금·신용융자 1일·미국 M2/물가 1개월. 오늘 값은 '지금 공개된 마지막 값'.
//
// 출력: data/liquidity-flow.js(window.LIQUIDITY_FLOW — 앱 홈 '돈의 흐름'·상세), data/liquidity-hist.json(월말 원자료 누적 — 다음 실행이 이어 쓴다)
// 사용법: node scripts/update-liquidity-flow.js [--rebuild]   (--rebuild: 금융투자협회·한국은행 자료를 2004년부터 다시 받는다)
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "liquidity-flow.js");
const HIST = path.join(ROOT, "data", "liquidity-hist.json");
const FLOWS = path.join(ROOT, "data", "market-flows.json");
const ECOS_KEY = process.env.ECOS_KEY || "sample";
const REBUILD = process.argv.includes("--rebuild");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const curl = (args) => new Promise((res) => execFile("curl", ["-s", "--max-time", "60"].concat(args), { maxBuffer: 256 << 20 }, (e, out) => res(e ? null : String(out))));
const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const sd = (a) => { const x = a.filter(ok); if (x.length < 3) return null; const m = mean(x); return Math.sqrt(x.reduce((s, v) => s + (v - m) ** 2, 0) / (x.length - 1)); };
const rnd = (v, d) => (ok(v) ? Math.round(v * Math.pow(10, d)) / Math.pow(10, d) : null);
const addM = (ym, k) => { const [y, m] = ym.split("-").map(Number); return new Date(Date.UTC(y, m - 1 + k, 1)).toISOString().slice(0, 7); };
const endOf = (ym) => { const [y, m] = ym.split("-").map(Number); return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10); };
const minusD = (iso, d) => new Date(Date.parse(iso + "T00:00:00Z") - d * 864e5).toISOString().slice(0, 10);
const today = new Date().toISOString().slice(0, 10);

// 검증 사실(research/liquidity/README.md) — 앱 ⓘ·상세·AI 프롬프트에 그대로
const EVIDENCE = {
  us: {
    flow: "흐름 점수가 높을수록 다음 12개월 S&P500 초과수익이 높았다(2005~2026, 전·후반 모두, 표본 밖에서도 과거 평균보다 나음 — R² 7.6%). 하위·중간·상위 3분의 1 다음 12개월 평균 +9.9%·+13.6%·+14.6%(국채 이자 대비, 겹치는 창). 3개월 앞은 뚜렷하지 않았다.",
    risk: "신용 스프레드(Baa−국채 10년)·금융여건지수가 수준이나 3개월 변화로 최근 5년 중 나쁜 3분의 1이면 다음 3개월 안 S&P500 −10% 하락이 23~30%였다(나머지 8~10%, 2003~2026 전·후반 모두). 4개 중 2개 이상이 켜졌을 땐 28%(그 밖 7%).",
    same: "그달 주가와 가장 같이 움직인 것은 신용 스프레드(상관 0.55)·금융여건(0.50)·달러(0.37)였다. 연준 순유동성은 달마다로는 일관되지 않았다(−0.10).",
  },
  korea: {
    flow: "투자자예탁금이 3개월 새 늘수록 다음 3개월 코스피 초과수익이 높았다(2005~2026, 전·후반 모두, 표본 밖 R² 11%) — 하위·중간·상위 3분의 1 평균 −1.9%·+1.7%·+5.1%. 신용융자도 같은 방향(−0.7%·−0.8%·+7.5%). 흐름 점수는 다음 12개월(+4.8%·+5.0%·+11.5%)과 같은 방향이었고, 미국 연준 순유동성이 늘 때도 다음 12개월 코스피가 나았다.",
    risk: "예탁금·신용융자·환율·외국인 수급, 미국 신용 경고 모두 코스피 −10% 급락 확률은 뚜렷이 가르지 못했다 — 개인 자금이 몰리는 국면은 과열과 같이 오기도 한다.",
    same: "그달 코스피와 같이 움직인 것은 투자자예탁금(0.43)·신용융자(0.43)·미국 신용 스프레드(0.40)·원/달러(0.35)였다. 외국인 순매수 월합은 2016년 이후 0.09로 약했다.",
  },
  gauge: "지금 시장 여건 게이지(금리 수준·VIX·하이일드 채권·달러·코스피 모멘텀)는 이후 수익·급락을 가르지 못했다 — 그래서 전망이 아니라 지금 상태로만 본다.",
};
// 신용 경고 신호별 과거 확률(S&P500 다음 3개월 −10% 하락 — 비우호 3분위 vs 나머지)
const RISK_P = { CS: [30.0, 10.1], CS3: [26.9, 8.0], FCI: [28.6, 8.0], FCI3: [23.4, 9.9] };

// ── 받기 ──
async function fred(id) {
  for (let i = 0; i < 3; i++) {
    const t = await curl(["https://fred.stlouisfed.org/graph/fredgraph.csv?id=" + id]);   // 브라우저 흉내 UA 엔 빈 응답 — curl 기본값
    if (t && t.indexOf("observation_date") === 0) {
      const m = {};
      t.trim().split("\n").slice(1).forEach((l) => { const [d, v] = l.split(","); const x = parseFloat(v); if (d && isFinite(x)) m[d] = x; });
      return m;
    }
    await sleep(1500 * (i + 1));
  }
  return null;
}
async function yahoo(sym, adj, years) {
  for (let i = 0; i < 3; i++) {
    const t = await curl(["-A", "Mozilla/5.0", "https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=" + years + "y"]);
    try {
      const r = JSON.parse(t).chart.result[0], q = r.indicators.quote[0], a = adj && r.indicators.adjclose && r.indicators.adjclose[0].adjclose;
      const off = (r.meta && r.meta.gmtoffset) || 0, m = {};
      r.timestamp.forEach((ts, k) => { const v = a ? a[k] : q.close[k]; if (v != null && isFinite(v) && v > 0) m[new Date((ts + off) * 1000).toISOString().slice(0, 10)] = v; });
      if (Object.keys(m).length > 100) return m;
    } catch (_e) { /* 다시 */ }
    await sleep(1500 * (i + 1));
  }
  return null;
}
async function kofia(obj, fromYear) {
  const m = {};
  for (let y = fromYear; y <= new Date().getUTCFullYear(); y++) {
    const body = JSON.stringify({ dmSearch: { tmpV40: "1000000", tmpV41: "1", tmpV1: "D", tmpV45: y + "0101", tmpV46: y + "1231", OBJ_NM: obj } });
    for (let i = 0; i < 3; i++) {
      const t = await curl(["-X", "POST", "-H", "Content-Type: application/json", "-A", "Mozilla/5.0", "-d", body, "https://freesis.kofia.or.kr/meta/getMetaDataList.do"]);
      try { (JSON.parse(t).ds1 || []).forEach((r) => { const d = String(r.TMPV1); if (ok(r.TMPV2)) m[d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6, 8)] = r.TMPV2; }); break; } catch (_e) { await sleep(1500 * (i + 1)); }
    }
  }
  return Object.keys(m).length ? m : null;
}
async function ecos(stat, item, from) {
  const to = new Date().toISOString().slice(0, 7).replace("-", ""), m = {}, step = ECOS_KEY === "sample" ? 10 : 100;
  let total = null;
  for (let s = 1; s < 3000; s += step) {
    if (total != null && s > total) break;
    let r = [];
    for (let i = 0; i < 5; i++) {
      const t = await curl(["https://ecos.bok.or.kr/api/StatisticSearch/" + ECOS_KEY + "/json/kr/" + s + "/" + (s + step - 1) + "/" + stat + "/M/" + from + "/" + to + "/" + item]);
      try { const j = JSON.parse(t).StatisticSearch || {}; r = j.row || []; if (j.list_total_count) total = j.list_total_count; } catch (_e) { r = []; }
      if (r.length) break;
      await sleep(1500 * (i + 1));
    }
    r.forEach((x) => { const v = parseFloat(x.DATA_VALUE); if (isFinite(v)) m[x.TIME.slice(0, 4) + "-" + x.TIME.slice(4, 6)] = v; });
    if (!r.length || (total == null && r.length < step)) break;
    await sleep(250);
  }
  return Object.keys(m).length ? m : null;
}

// ── 시계열 도구 ──
function series(map) { const ks = Object.keys(map || {}).sort(); return { ks, vs: ks.map((k) => map[k]) }; }
function atS(s, iso, maxAge) {
  let lo = 0, hi = s.ks.length - 1, idx = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (s.ks[m] <= iso) { idx = m; lo = m + 1; } else hi = m - 1; }
  if (idx < 0) return null;
  if (maxAge && (Date.parse(iso) - Date.parse(s.ks[idx])) / 864e5 > maxAge) return null;
  return { d: s.ks[idx], v: s.vs[idx] };
}
const val = (x) => (x ? x.v : null);
const lastOf = (s) => (s.ks.length ? { d: s.ks[s.ks.length - 1], v: s.vs[s.vs.length - 1] } : null);
const monthlyOf = (map) => { const o = {}; Object.keys(map || {}).forEach((d) => { o[d.slice(0, 7)] = map[d]; }); return o; };

(async () => {
  let H = { months: {} };
  try { H = JSON.parse(fs.readFileSync(HIST, "utf8")); } catch (_e) { H = { months: {} }; }
  const first = !Object.keys(H.months || {}).length || REBUILD;
  const fromY = first ? 2004 : new Date().getUTCFullYear() - 1;
  // 미국(FRED 전체 CSV — 가볍다)·야후(지수·환율 — 처음엔 23년, 이후 2년)
  const ids = ["WALCL", "WTREGEN", "RRPONTSYD", "M2SL", "CPIAUCSL", "BAA10Y", "NFCI"];
  const F = {}; for (const id of ids) F[id] = await fred(id);
  const yy = first ? 23 : 2;
  const Y = { DXY: await yahoo("DX-Y.NYB", false, yy), KRW: await yahoo("KRW=X", false, yy), SPY: await yahoo("SPY", true, yy), KS: await yahoo("^KS11", false, yy),
    SPX: await yahoo("^GSPC", false, Math.max(yy, 6)) };   // 화면 그래프용 S&P500 지수(연구 수익은 SPY 배당 포함)
  const K = { DEP: await kofia("STATSCU0100000060BO", fromY), MRG: await kofia("STATSCU0100000070BO", fromY) };
  const eFrom = first ? "200301" : addM(today.slice(0, 7), -24).replace("-", "");
  const E = { corp3: await ecos("721Y001", "7020000", eFrom), ktb3: await ecos("721Y001", "5020000", eFrom) };
  const miss = [].concat(ids.filter((k) => !F[k]), Object.keys(Y).filter((k) => !Y[k]), Object.keys(K).filter((k) => !K[k]), Object.keys(E).filter((k) => !E[k]));

  // ── 월말 원자료를 누적 파일에 이어 쓴다(받은 자료가 덮는다 — 정정치 반영) ──
  const S = {}; Object.keys(F).forEach((k) => { if (F[k]) S[k] = series(F[k]); }); Object.keys(Y).forEach((k) => { if (Y[k]) S[k] = series(Y[k]); }); Object.keys(K).forEach((k) => { if (K[k]) S[k] = series(K[k]); });
  const M2 = monthlyOf(F.M2SL), CPI = monthlyOf(F.CPIAUCSL);
  const thisM = today.slice(0, 7);
  const allMonths = []; for (let m = "2003-01"; m < thisM; m = addM(m, 1)) allMonths.push(m);   // 끝난 달만
  allMonths.forEach((ym) => {
    const e = endOf(ym), o = Object.assign({}, H.months[ym] || {});
    const put = (k, v) => { if (ok(v)) o[k] = rnd(v, 6); };
    if (S.WALCL && S.WTREGEN) { const w = val(atS(S.WALCL, minusD(e, 2), 10)), t = val(atS(S.WTREGEN, minusD(e, 2), 10)), r = S.RRPONTSYD ? val(atS(S.RRPONTSYD, e, 10)) : null; if (ok(w) && ok(t)) put("NL", w - t - (ok(r) ? r * 1000 : 0)); }
    if (F.M2SL) put("M2", M2[addM(ym, -1)]);
    if (F.CPIAUCSL) put("CPI", CPI[addM(ym, -1)]);
    if (S.BAA10Y) put("CS", val(atS(S.BAA10Y, e, 10)));
    if (S.NFCI) put("FCI", val(atS(S.NFCI, minusD(e, 5), 14)));
    if (S.DXY) put("DXY", val(atS(S.DXY, e, 10)));
    if (S.KRW) put("KRW", val(atS(S.KRW, e, 10)));
    if (S.SPY) put("SPY", val(atS(S.SPY, e, 10)));
    if (S.SPX) put("SPX", val(atS(S.SPX, e, 10)));
    if (S.KS) put("KS", val(atS(S.KS, e, 10)));
    if (S.DEP) put("DEP", val(atS(S.DEP, minusD(e, 1), 10)));   // 연구와 같이 월말 하루 전(T+1 공개)
    if (S.MRG) put("MRG", val(atS(S.MRG, minusD(e, 1), 10)));
    if (E.corp3 && E.ktb3 && ok(E.corp3[ym]) && ok(E.ktb3[ym])) put("KCS", E.corp3[ym] - E.ktb3[ym]);
    if (Object.keys(o).length) H.months[ym] = o;
  });
  // 외국인 순매수(코스피, 억원) 월합 — data/market-flows.json(update-indices.js 가 매일 쌓는다)
  let FL = null; try { FL = JSON.parse(fs.readFileSync(FLOWS, "utf8")); } catch (_e) { FL = null; }
  const FFd = {};   // 날짜 → 외국인 순매수
  if (FL && Array.isArray(FL.kospi)) {
    const ci = FL.cols.indexOf("외국인"), ffm = {};
    FL.kospi.forEach((r) => { const s = String(r[0]); if (!ok(r[ci])) return; FFd[s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8)] = r[ci]; const ym = s.slice(0, 4) + "-" + s.slice(4, 6); ffm[ym] = (ffm[ym] || 0) + r[ci]; });
    Object.keys(ffm).forEach((ym) => { if (ym < thisM && H.months[ym]) H.months[ym].FF = ffm[ym]; });
  }

  // ── 월말 신호 → z → 흐름 점수(연구와 같은 식) ──
  const MS = Object.keys(H.months).sort();
  const h = (ym, k) => { const o = H.months[ym]; return o && ok(o[k]) ? o[k] : null; };
  const pchg = (a, b) => (ok(a) && ok(b) && b !== 0 ? a / b - 1 : null);
  const dif = (a, b) => (ok(a) && ok(b) ? a - b : null);
  const SIG = {}, DIRN = { NL3: 1, CS3: -1, FCI3: -1, USD3: -1, M2R: 1, KDEP3: 1, KMRG3: 1, KCS3: -1, KRW3: -1, KFF3: 1, CS: -1, FCI: -1 };
  Object.keys(DIRN).forEach((k) => { SIG[k] = {}; });
  MS.forEach((ym, i) => {
    const p3 = addM(ym, -3), p12 = addM(ym, -12);
    SIG.NL3[ym] = pchg(h(ym, "NL"), h(p3, "NL"));
    SIG.CS[ym] = h(ym, "CS"); SIG.CS3[ym] = dif(h(ym, "CS"), h(p3, "CS"));
    SIG.FCI[ym] = h(ym, "FCI"); SIG.FCI3[ym] = dif(h(ym, "FCI"), h(p3, "FCI"));
    SIG.USD3[ym] = pchg(h(ym, "DXY"), h(p3, "DXY"));
    const m2y = pchg(h(ym, "M2"), h(p12, "M2")), cpy = pchg(h(ym, "CPI"), h(p12, "CPI"));
    SIG.M2R[ym] = ok(m2y) && ok(cpy) ? m2y - cpy : null;
    SIG.KDEP3[ym] = pchg(h(ym, "DEP"), h(p3, "DEP")); SIG.KMRG3[ym] = pchg(h(ym, "MRG"), h(p3, "MRG"));
    SIG.KCS3[ym] = dif(h(ym, "KCS"), h(p3, "KCS")); SIG.KRW3[ym] = pchg(h(ym, "KRW"), h(p3, "KRW"));
    // 외국인 3개월 합 ÷ 직전 36개월(최소 24) 3개월 합 표준편차
    const s3 = (j) => { const a = [0, 1, 2].map((d) => (j - d >= 0 ? h(MS[j - d], "FF") : null)); return a.every(ok) ? a.reduce((x, y) => x + y, 0) : null; };
    const hist = []; for (let j = i - 36; j < i; j++) if (j >= 2) { const v = s3(j); if (ok(v)) hist.push(v); }
    const s = hist.length >= 24 ? sd(hist) : null, cur = s3(i);
    SIG.KFF3[ym] = ok(cur) && ok(s) && s > 0 ? cur / s : null;
  });
  const histOf = (k, i) => { const a = []; for (let j = Math.max(0, i - 60); j < i; j++) { const v = SIG[k][MS[j]]; if (ok(v)) a.push(v); } return a; };
  const zOf = (k, v, hist) => { if (!ok(v) || hist.length < 36) return null; const s = sd(hist); return s > 0 ? DIRN[k] * (v - mean(hist)) / s : null; };
  const COMP = { us: ["NL3", "CS3", "FCI3", "USD3", "M2R"], korea: ["KDEP3", "KCS3", "KRW3", "KFF3", "NL3"] };
  const SCORE = { us: {}, korea: {} };
  MS.forEach((ym, i) => ["us", "korea"].forEach((c) => {
    const z = COMP[c].map((k) => zOf(k, SIG[k][ym], histOf(k, i))).filter(ok);
    SCORE[c][ym] = z.length >= 3 ? mean(z) : null;
  }));

  // ── 오늘 값(지금 공개된 마지막 값 — 3개월 전은 91일 전 값) ──
  const L = (k) => (S[k] ? lastOf(S[k]) : null);
  const ago = (k, iso, d) => (S[k] && iso ? val(atS(S[k], minusD(iso, d), 10)) : null);
  const nlNow = (() => {
    if (!S.WALCL || !S.WTREGEN) return null;
    const w = L("WALCL"), t = val(atS(S.WTREGEN, w.d, 10)), r = S.RRPONTSYD ? val(atS(S.RRPONTSYD, w.d, 10)) : null;
    const w3 = atS(S.WALCL, minusD(w.d, 91), 10), t3 = w3 ? val(atS(S.WTREGEN, w3.d, 10)) : null, r3 = w3 && S.RRPONTSYD ? val(atS(S.RRPONTSYD, w3.d, 10)) : null;
    const now = ok(t) ? w.v - t - (ok(r) ? r * 1000 : 0) : null, past = w3 && ok(t3) ? w3.v - t3 - (ok(r3) ? r3 * 1000 : 0) : null;
    return { d: w.d, v: now, chg3: pchg(now, past) };
  })();
  const lv = (k) => L(k);
  const cs = lv("BAA10Y"), fci = lv("NFCI"), dxy = lv("DXY"), krw = lv("KRW"), dep = lv("DEP"), mrg = lv("MRG");
  const m2k = Object.keys(M2).sort().pop(), cpk = Object.keys(CPI).sort().pop();
  const m2r = m2k && cpk ? (() => { const k = [m2k, cpk].sort()[0]; const a = pchg(M2[k], M2[addM(k, -12)]), b = pchg(CPI[k], CPI[addM(k, -12)]); return ok(a) && ok(b) ? { d: k, v: a - b, m2: a, cpi: b } : null; })() : null;
  const kcsM = MS.filter((m) => ok(h(m, "KCS"))).pop();
  // 외국인: 최근 63거래일 합(억원), z 는 월 기준 표준편차로
  const ffDays = Object.keys(FFd).sort(), ff63 = ffDays.slice(-63).reduce((s, d) => s + FFd[d], 0);
  const ffHist = []; { const i = MS.length; for (let j = i - 36; j < i; j++) { if (j < 2) continue; const a = [0, 1, 2].map((d) => h(MS[j - d], "FF")); if (a.every(ok)) ffHist.push(a.reduce((x, y) => x + y, 0)); } }
  const ffS = ffHist.length >= 24 ? sd(ffHist) : null;
  const NOW = {
    NL3: nlNow ? nlNow.chg3 : null,
    CS: cs ? cs.v : null, CS3: cs ? dif(cs.v, ago("BAA10Y", cs.d, 91)) : null,
    FCI: fci ? fci.v : null, FCI3: fci ? dif(fci.v, ago("NFCI", fci.d, 91)) : null,
    USD3: dxy ? pchg(dxy.v, ago("DXY", dxy.d, 91)) : null,
    M2R: m2r ? m2r.v : null,
    KDEP3: dep ? pchg(dep.v, ago("DEP", dep.d, 91)) : null, KMRG3: mrg ? pchg(mrg.v, ago("MRG", mrg.d, 91)) : null,
    KCS3: kcsM ? dif(h(kcsM, "KCS"), h(addM(kcsM, -3), "KCS")) : null,
    KRW3: krw ? pchg(krw.v, ago("KRW", krw.d, 91)) : null,
    KFF3: ffDays.length >= 63 && ok(ffS) && ffS > 0 ? ff63 / ffS : null,
  };
  const lastI = MS.length;   // 오늘 = 마지막 끝난 달 다음
  const zNow = {}; Object.keys(NOW).forEach((k) => { zNow[k] = zOf(k, NOW[k], histOf(k, lastI)); });
  const LEVELS = ["많이 빠지는 중", "빠지는 중", "보통", "들어오는 중", "많이 들어오는 중"];
  const out = { asOf: today, builtAt: new Date().toISOString().slice(0, 19) + "Z", evidence: EVIDENCE, levels: LEVELS, missing: miss.length ? miss : undefined };
  const pctIn = (v, arr) => { const x = arr.filter(ok); if (!ok(v) || x.length < 24) return null; return x.filter((y) => y < v).length / x.length; };
  const tsOf = (k, n, f) => MS.slice(-n).map((m) => [m, rnd(f ? f(m) : h(m, k), 4)]).filter((p) => ok(p[1]));
  const state = (z) => (!ok(z) ? null : z >= 0.5 ? "들어옴" : z <= -0.5 ? "빠짐" : "보통");
  ["us", "korea"].forEach((c) => {
    const zs = COMP[c].map((k) => zNow[k]).filter(ok), score = zs.length >= 3 ? mean(zs) : null;
    const past = MS.slice(-60).map((m) => SCORE[c][m]).filter(ok), p = pctIn(score, past);
    const lvl = p == null ? null : Math.min(4, Math.floor(p * 5));
    const o = { score: rnd(score, 2), pct: rnd(p, 3), level: lvl == null ? null : LEVELS[lvl], levelIdx: lvl, n: zs.length,
      hist: MS.slice(-60).map((m) => [m, rnd(SCORE[c][m], 3)]).filter((x) => ok(x[1])),
      idx: tsOf(c === "us" ? "SPX" : "KS", 60).map((x) => [x[0], rnd(x[1], 2)]), idxName: c === "us" ? "S&P500" : "코스피" };
    // 구성 지표 — 지금 값·3개월 변화·방향(z)·3년 월말 추이·검증 표시
    if (c === "us") {
      o.comps = [
        { key: "NL3", name: "연준 순유동성", sub: "연준 자산 − 재무부 계좌 − 역레포", unit: "조 달러", value: nlNow && ok(nlNow.v) ? rnd(nlNow.v / 1e6, 2) : null, chg: rnd(NOW.NL3 * 100, 1), chgUnit: "%", z: rnd(zNow.NL3, 2),
          state: state(zNow.NL3), d: nlNow && nlNow.d, spark: tsOf("NL", 36).map((x) => [x[0], rnd(x[1] / 1e6, 3)]), valid: "코스피 12개월(검증) · S&P500 은 경계선" },
        { key: "CS3", name: "신용 스프레드", sub: "회사채(Baa) − 국채 10년", unit: "%p", value: rnd(NOW.CS, 2), chg: rnd(NOW.CS3 * 100, 0), chgUnit: "bp", z: rnd(zNow.CS3, 2),
          state: state(zNow.CS3), d: cs && cs.d, spark: tsOf("CS", 36), valid: "S&P500 급락 위험(검증)" },
        { key: "FCI3", name: "금융여건지수", sub: "시카고 연은 NFCI — 0보다 낮으면 평소보다 느슨", unit: "", value: rnd(NOW.FCI, 3), chg: rnd(NOW.FCI3, 3), chgUnit: "", z: rnd(zNow.FCI3, 2),
          state: state(zNow.FCI3), d: fci && fci.d, spark: tsOf("FCI", 36), valid: "S&P500 급락 위험(검증)" },
        { key: "USD3", name: "달러인덱스", sub: "달러가 강해지면 세계 돈이 미국으로", unit: "", value: rnd(dxy && dxy.v, 2), chg: rnd(NOW.USD3 * 100, 1), chgUnit: "%", z: rnd(zNow.USD3, 2),
          state: state(zNow.USD3), d: dxy && dxy.d, spark: tsOf("DXY", 36) },
        { key: "M2R", name: "실질 통화량(M2)", sub: "M2 증가율 − 물가 상승률(전년 대비)", unit: "%", value: m2r ? rnd(m2r.v * 100, 1) : null, chg: null, chgUnit: "", z: rnd(zNow.M2R, 2),
          state: state(zNow.M2R), d: m2r && m2r.d, spark: tsOf("M2R", 36, (m) => { const a = pchg(h(m, "M2"), h(addM(m, -12), "M2")), b = pchg(h(m, "CPI"), h(addM(m, -12), "CPI")); return ok(a) && ok(b) ? (a - b) * 100 : null; }) },
      ];
      // 신용 경고 — 4개 각각 직전 60개월의 나쁜 3분의 1 안인가
      const items = ["CS", "CS3", "FCI", "FCI3"].map((k) => {
        const hist = histOf(k, lastI).map((v) => DIRN[k] * v).sort((a, b) => a - b), v = NOW[k];
        if (!ok(v) || hist.length < 36) return { key: k, on: null };
        return { key: k, on: DIRN[k] * v < hist[Math.floor(hist.length / 3)], p: RISK_P[k][0], base: RISK_P[k][1] };
      });
      const NAME = { CS: "신용 스프레드 수준", CS3: "신용 스프레드 3개월 변화", FCI: "금융여건 수준", FCI3: "금융여건 3개월 변화" };
      items.forEach((x) => { x.name = NAME[x.key]; });
      const on = items.filter((x) => x.on).length;
      o.risk = { on, of: items.filter((x) => x.on != null).length, items, level: on >= 2 ? "경고" : on === 1 ? "주의" : "없음",
        note: on >= 2 ? "과거 4개 중 2개 이상이 켜졌을 때 다음 3개월 안 S&P500 −10% 하락 28%(그 밖 7%)" : on === 1 ? "켜진 신호 하나 — 그 신호만 켜졌던 때의 과거 확률은 아래" : "신용·금융여건이 최근 5년 중 나쁜 3분의 1에 들지 않았다" };
    } else {
      o.comps = [
        { key: "KDEP3", name: "투자자예탁금", sub: "주식 사려고 증권 계좌에 넣어 둔 돈", unit: "조원", value: dep ? rnd(dep.v / 1e6, 1) : null, chg: rnd(NOW.KDEP3 * 100, 1), chgUnit: "%", z: rnd(zNow.KDEP3, 2),
          state: state(zNow.KDEP3), d: dep && dep.d, spark: tsOf("DEP", 36).map((x) => [x[0], rnd(x[1] / 1e6, 2)]), valid: "다음 3개월 코스피(검증)" },
        { key: "KMRG3", name: "신용융자", sub: "빚을 내 산 주식 잔고", unit: "조원", value: mrg ? rnd(mrg.v / 1e6, 1) : null, chg: rnd(NOW.KMRG3 * 100, 1), chgUnit: "%", z: rnd(zNow.KMRG3, 2),
          state: state(zNow.KMRG3), d: mrg && mrg.d, spark: tsOf("MRG", 36).map((x) => [x[0], rnd(x[1] / 1e6, 2)]), valid: "다음 3개월 코스피(검증)" },
        { key: "KFF3", name: "외국인 순매수", sub: "코스피 최근 3개월(63거래일) 합", unit: "조원", value: ffDays.length ? rnd(ff63 / 1e4, 1) : null, chg: null, chgUnit: "", z: rnd(zNow.KFF3, 2),
          state: state(zNow.KFF3), d: ffDays.length ? ffDays[ffDays.length - 1] : null, spark: tsOf("FF", 36).map((x) => [x[0], rnd(x[1] / 1e4, 2)]), sparkKind: "bar" },
        { key: "KRW3", name: "원/달러", sub: "원화가 강해지면(내리면) 외국인 돈이 들어오기 쉽다", unit: "원", value: rnd(krw && krw.v, 0), chg: rnd(NOW.KRW3 * 100, 1), chgUnit: "%", z: rnd(zNow.KRW3, 2),
          state: state(zNow.KRW3), d: krw && krw.d, spark: tsOf("KRW", 36) },
        { key: "KCS3", name: "회사채 스프레드", sub: "회사채(AA−) − 국고채 3년 · 월평균", unit: "%p", value: kcsM ? rnd(h(kcsM, "KCS"), 2) : null, chg: rnd(NOW.KCS3 * 100, 0), chgUnit: "bp", z: rnd(zNow.KCS3, 2),
          state: state(zNow.KCS3), d: kcsM, spark: tsOf("KCS", 36) },
        { key: "NL3", name: "미국 연준 순유동성", sub: "3개월 변화 — 세계로 풀린 달러", unit: "%", value: rnd(NOW.NL3 * 100, 1), chg: null, chgUnit: "", z: rnd(zNow.NL3, 2),
          state: state(zNow.NL3), d: nlNow && nlNow.d, spark: tsOf("NL", 36).map((x) => [x[0], rnd(x[1] / 1e6, 3)]), valid: "다음 12개월 코스피(검증)" },
      ];
    }
    out[c] = o;
  });

  H.updatedAt = out.builtAt;
  H.note = "돈의 흐름 월말 원자료(update-liquidity-flow.js) — NL 백만 달러·M2/CPI 1개월 지연·CS %p·FCI·DXY·KRW·SPY(배당 포함)·SPX(S&P500 지수)·KS·DEP/MRG 백만원·KCS %p(월평균)·FF 억원(월합)";
  fs.writeFileSync(HIST, JSON.stringify({ note: H.note, updatedAt: H.updatedAt, months: H.months }));
  fs.writeFileSync(OUT, "// 돈의 흐름(유동성) — scripts/update-liquidity-flow.js 가 매일 생성(토큰 0). 검증: scripts/research/liquidity/README.md\n" +
    "window.LIQUIDITY_FLOW = " + JSON.stringify(out) + ";\n");
  const line = (c) => { const o = out[c]; return (c === "us" ? "미국" : "한국") + " " + (o.level || "–") + "(점수 " + o.score + ", 5년 중 " + (o.pct == null ? "–" : Math.round(o.pct * 100) + "%") + ")"; };
  console.log("liquidity-flow.js 갱신 (" + today + ") — " + line("us") + " · " + line("korea") + " · 미국 신용 경고 " + out.us.risk.on + "/" + out.us.risk.of +
    (miss.length ? " · 못 받음: " + miss.join(", ") + "(누적 자료 사용)" : ""));
  if (miss.length > 3) console.log("::warning::update-liquidity-flow: 자료 " + miss.length + "개를 받지 못했다(" + miss.join(", ") + ") — 누적 파일로 계산");
})().catch((e) => { console.error("update-liquidity-flow 실패:", e && e.message); process.exit(1); });
