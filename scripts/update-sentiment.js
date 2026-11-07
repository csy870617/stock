#!/usr/bin/env node
// 시장 심리 온도계(공포 ↔ 환호) — 매일 자동(LLM 토큰 0). 2026-11-06 사용자 '공포와 환호 등 대중의 심리까지 함께 분석되면 좋겠다'.
// 정의 = lib-sentiment.js(연구와 공용), 검증 = scripts/research/sentiment/README.md(사전 등록 PREREG.md).
// 결과: data/sentiment.js — 나라별 점수(0 극도의 공포 ~ 100 극도의 환호, 직전 5년 안 위치)·구간·구성 지표 지금 값·백분위·1개월 전·5년 주간 추이·검증 사실.
// 사용: node scripts/update-sentiment.js
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const L = require("./lib-sentiment");
const { settleDailyBars, fillPrevSessionClose, exchangeDate } = require("./lib-quote");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "sentiment.js");
const FLOWS = path.join(ROOT, "data", "market-flows.json");
const YEARS = 15;   // 지표 백분위(5년)와 점수 백분위(5년)가 모두 꽉 찬 창이 되도록 — 연구(1990~)와 같은 값
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const curl = (args) => new Promise((res) => execFile("curl", ["-s", "--max-time", "60"].concat(args), { maxBuffer: 256 << 20 }, (e, out) => res(e ? null : String(out))));
const ok = (v) => v != null && isFinite(v);
const rnd = (v, d) => (ok(v) ? Math.round(v * Math.pow(10, d)) / Math.pow(10, d) : null);

// 검증 사실(scripts/research/sentiment/README.md — 2026-11-06 사전 등록 시험). 통과한 것만 '검증' 문장으로 보인다(사전 반영 규칙).
const EVIDENCE = {
  asOf: "2026-11-06", src: "scripts/research/sentiment/README.md",
  us: {
    sample: "1994-06~2026-10 월말 389개",
    fearCrash: { pass: true, inZone: 31.1, rest: 8.2, months: 106, t: 3.86,
      line: "과거 극도의 공포(20 미만)인 달 뒤 3개월 안에 S&P 500 이 10% 넘게 더 빠진 경우 31% — 그 밖 8%(1994~2026 월말, 전·후반 모두)." },
    verdict: "공포 뒤 더 오르는 역발상도, 환호 뒤 수익 감소·급락 증가도 확인되지 않았다(방향은 오히려 반대, 유의하지 않음)."
  },
  korea: {
    sample: "2006-02~2026-10 월말 249개",
    fearCrash: { pass: false },
    verdict: "공포 뒤 더 오르는 역발상도, 환호 뒤 수익 감소·급락 증가도 확인되지 않았다(방향은 오히려 반대, 유의하지 않음). 극도의 공포 뒤 급락 위험도 기준 미달."
  }
};

// ── 받기 ──
async function yahoo(sym, adj) {
  const p1 = Math.floor((Date.now() - YEARS * 365.25 * 864e5) / 1000), p2 = Math.floor(Date.now() / 1000);
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&period1=" + p1 + "&period2=" + p2;
  for (let i = 0; i < 3; i++) {
    const ctrl = new AbortController(), to = setTimeout(() => ctrl.abort(), 20000);
    try {
      const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
      if (r.ok) {
        const res = (await r.json()).chart.result[0];
        settleDailyBars(res);   // 진행 중인 장의 미완성 봉은 버리고 끝난 장의 빈 종가는 채운다(지표와 같은 '끝난 장' 기준)
        await fillPrevSessionClose(res, sym);
        const q = res.indicators.quote[0], a = adj && res.indicators.adjclose && res.indicators.adjclose[0].adjclose, m = {};
        let ratio = null;   // 수정종가가 빈 마지막 날은 직전 날의 수정/종가 비율로 채운다
        (res.timestamp || []).forEach((ts, k) => {
          const c = q.close[k]; let v = c;
          if (a) { if (ok(a[k]) && ok(c) && c > 0) { v = a[k]; ratio = a[k] / c; } else v = ok(c) && ratio ? c * ratio : null; }
          if (ok(v) && v > 0) m[exchangeDate(ts, res.meta)] = v;   // 봉마다 그 시각의 거래소 시간대로 센 날짜(원/달러 여름 봉이 하루 앞으로 밀리지 않게)
        });
        if (Object.keys(m).length > 100) { clearTimeout(to); return m; }
      }
    } catch (_e) { /* 다시 */ }
    clearTimeout(to);
    await sleep(1000 * (i + 1));
  }
  return null;
}
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
async function poolMap(list, n, fn) {
  const out = new Array(list.length); let k = 0;
  await Promise.all(Array.from({ length: Math.min(n, list.length) }, async () => { while (k < list.length) { const i = k++; out[i] = await fn(list[i], i); } }));
  return out;
}
function loadPrev() {
  try { global.window = {}; delete require.cache[require.resolve(OUT)]; require(OUT); return global.window.MARKET_SENTIMENT || null; } catch (_e) { return null; }
}

// ── 나라 하나 → 화면용 요약 ──
const DEC = { vix: 1, mom: 1, brd: 0, safe: 1, cred: 2, vol: 1, fx: 1, for: 0, lev: 1 };
function summarize(c, R, idxMap) {
  const n = R.dates.length;
  let i = n - 1; while (i >= 0 && !ok(R.score[i])) i--;
  if (i < 0) return null;
  const back = (k) => (i - k >= 0 && ok(R.score[i - k]) ? rnd(R.score[i - k], 1) : null);
  const comps = L.COMPS[c].map((d) => {
    const C = R.comps[d.key];
    return { key: d.key, name: d.name, unit: d.unit, dir: d.dir, desc: d.desc, value: rnd(C.raw[i], DEC[d.key]), pct: rnd(C.pct[i], 0), pctM1: i >= 21 ? rnd(C.pct[i - 21], 0) : null };
  });
  // 5년 주간 추이 — 주(월요일 시작)의 마지막 거래일 점수와 지수 종가
  const idx = L.align(R.dates, idxMap), wk = new Map(), from = new Date(Date.parse(R.dates[i]) - 5 * 365.25 * 864e5).toISOString().slice(0, 10);
  for (let k = 0; k <= i; k++) {
    if (R.dates[k] < from || !ok(R.score[k])) continue;
    const d = new Date(R.dates[k] + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
    wk.set(d.toISOString().slice(0, 10), [+R.dates[k].replace(/-/g, ""), rnd(R.score[k], 1), rnd(idx[k], 2)]);
  }
  return {
    asOf: R.dates[i], score: rnd(R.score[i], 1), level: L.levelOf(R.score[i]), used: R.n[i], total: L.COMPS[c].length,
    prev: { w1: back(5), m1: back(21), m3: back(63) }, comps, hist: Array.from(wk.values()), evidence: EVIDENCE[c]
  };
}

(async () => {
  const prev = loadPrev();
  const ySyms = [["^GSPC", false], ["^VIX", false], ["SPY", true], ["IEF", true], ["^KS11", false], ["KRW=X", false]]
    .concat(L.US_SECTORS.map((s) => [s, false]), L.KR_SECTORS.map((s) => [s, false]));
  const Yv = await poolMap(ySyms, 4, ([s, adj]) => yahoo(s, adj)), Y = {};
  ySyms.forEach(([s], k) => { Y[s] = Yv[k]; if (!Yv[k]) console.warn("  ⚠ 야후 " + s + " 실패"); });
  const baa = await fred("BAA10Y");
  if (!baa) console.warn("::warning::심리 온도계 — FRED BAA10Y 받기 실패(미국 신용 스프레드 빠짐)");
  const margin = await kofia("STATSCU0100000070BO", new Date().getUTCFullYear() - YEARS);
  if (!margin) console.warn("::warning::심리 온도계 — 금융투자협회 신용융자 받기 실패(한국 신용융자 빠짐)");
  let flows = {};
  try {
    const FL = JSON.parse(fs.readFileSync(FLOWS, "utf8")), col = FL.cols.indexOf("외국인");
    (FL.kospi || []).forEach((r) => { const s = String(r[0]); if (ok(r[col])) flows[s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8)] = r[col]; });
  } catch (_e) { console.warn("  ⚠ market-flows.json 읽기 실패 — 외국인 수급 빠짐"); }
  const pick = (keys) => { const o = {}; keys.forEach((k) => { if (Y[k]) o[k] = Y[k]; }); return o; };
  const out = { builtAt: new Date().toISOString().slice(0, 19) + "Z", levels: L.LEVELS.map((l) => [isFinite(l[0]) ? l[0] : 101, l[1]]),
    note: "시장 심리 온도계 — 구성 지표마다 직전 5년 안 위치(백분위)를 공포·환호 방향으로 맞춰 평균하고, 그 평균을 다시 직전 5년 안 위치로 바꾼 0~100 점수(0 극도의 공포·100 극도의 환호). 지금 분위기의 사실이지 예측이 아니다 — 검증은 evidence." };
  const IDX = { us: "^GSPC", korea: "^KS11" };
  for (const c of ["us", "korea"]) {
    const base = Y[IDX[c]];
    if (!base) { out[c] = prev && prev[c] ? prev[c] : null; console.warn("::warning::심리 온도계 — " + c + " 지수 받기 실패, 이전 값 유지"); continue; }
    const dates = Object.keys(base).sort();
    const inputs = c === "us"
      ? { index: base, vix: Y["^VIX"] || {}, spy: Y.SPY || {}, ief: Y.IEF || {}, baa: baa || {}, sectors: pick(L.US_SECTORS) }
      : { index: base, krw: Y["KRW=X"] || {}, flows, margin: margin || {}, sectors: pick(L.KR_SECTORS) };
    const s = summarize(c, L.compute(c, dates, inputs), base);
    out[c] = s || (prev && prev[c]) || null;
    if (s) console.log("심리 " + c + " " + s.asOf + " 점수 " + s.score + "(" + s.level + ") 지표 " + s.used + "/" + s.total + " · " + s.comps.map((d) => d.key + " " + d.value + "→" + d.pct).join(" · "));
  }
  if (!out.us && !out.korea) { console.warn("::warning::심리 온도계 — 두 나라 모두 실패, data/sentiment.js 그대로 둠"); return; }
  fs.writeFileSync(OUT, "// 시장 심리 온도계(공포 ↔ 환호) — scripts/update-sentiment.js 가 매일 자동 생성(LLM 토큰 0). 정의 lib-sentiment.js, 검증 scripts/research/sentiment/README.md.\n" +
    "window.MARKET_SENTIMENT = " + JSON.stringify(out) + ";\n");
  console.log("sentiment.js 갱신 — 미국 " + (out.us ? out.us.score : "–") + " · 한국 " + (out.korea ? out.korea.score : "–"));
})();
