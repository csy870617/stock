#!/usr/bin/env node
"use strict";
//
// 밸류에이션·최근 분기 실적 자동 갱신 — 카드의 숫자를 '출처 값 그대로' 매일 맞춘다 (LLM 토큰 0, refresh-quotes Action 에서 실행)
//
//   node scripts/update-fundamentals.js      → data/fundamentals.js (window.STOCK_FUND)
//
// 왜: 카드의 배당수익률·PER·실적 문구는 세션이 웹 검색 스니펫으로 적은 값이라 작성일 이후 낡거나 정의가 섞였다
//     (2026-10-16 점검: 한국 46종목 중 15종목이 네이버 배당수익률과 0.5%p 넘게 달랐다 — 예상 DPS·작년 DPS 혼용).
//     출처 값을 매일 그대로 받아 같은 정의로 보여주면 숫자 오류가 사라진다. 판단(thesis·valueNote)은 여전히 세션 몫이다.
// 출처: 한국 = 네이버 증권 종목 통합(totalInfos: PER·추정PER(FnGuide 컨센서스)·PBR·배당수익률(최근 결산 DPS)·시총·외국인 소진율)
//              + 분기 재무(매출액·영업이익·당기순이익, 다음 분기 컨센서스)
//       미국 = 네이버 해외주식 기본(stockItemTotalInfos: PER·PBR·배당수익률·시총) + 분기 재무(매출액·EBIT·순이익)
//              + 나스닥(Zacks) 분기 컨센서스 EPS(다음 4분기 합 = 12개월 선행 EPS → 선행 PER, 최근 4주 추정 상향·하향 건수)
// 실패한 종목은 이전 값을 유지한다. 비정상 값(음수·과대 PER, 배당 정의 불일치)은 버리거나 표시하지 않게 표시(flag)한다.

const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "fundamentals.js");
const UA = "Mozilla/5.0";

function load(rel, key) {
  try {
    global.window = {};
    const f = path.join(ROOT, rel);
    delete require.cache[require.resolve(f)];
    require(f);
    return global.window[key] || null;
  } catch (_e) { return null; }
}

// 네이버는 일부 환경(세션 egress)에서 node fetch 가 막혀 curl 로 폴백한다(update-events 와 같은 방식)
let useCurl = false;
const curlJson = (url) => new Promise((resolve) => {
  execFile("curl", ["-s", "--max-time", "15", "-A", UA, "-H", "Accept: application/json", url], { maxBuffer: 8 << 20 }, (err, out) => {
    if (err || !out || !/^\s*[[{]/.test(out)) return resolve(null);
    try { resolve(JSON.parse(out)); } catch (_e) { resolve(null); }
  });
});
const sleepMs = (ms) => new Promise((r) => setTimeout(r, ms));
async function getJson(url) {
  for (let i = 0; i < 3; i++) {
    if (!useCurl) {
      try {
        const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 15000);
        const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": UA, "Accept": "application/json" } });
        clearTimeout(to);
        if (r.ok) return await r.json();
        if (r.status === 404) return null;
        if (r.status === 403) useCurl = true;
      } catch (_e) { useCurl = true; }
    }
    const j = await curlJson(url);
    if (j) return j;
    await sleepMs(600 * (i + 1));
  }
  return null;
}
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

const num = (v) => { if (v == null) return null; const n = parseFloat(String(v).replace(/[,%배원$]/g, "").trim()); return isFinite(n) ? n : null; };
const r1 = (v) => (v == null || !isFinite(v) ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null || !isFinite(v) ? null : Math.round(v * 100) / 100);

// 재무표 파싱(screen-discovery.js 와 같은 형식): {periods:[{key,title,est}], rows:{제목:{key:값}}}
function finTable(j) {
  const fi = j && (j.financeInfo || j);
  if (!fi || !Array.isArray(fi.trTitleList) || !Array.isArray(fi.rowList)) return null;
  const periods = fi.trTitleList.map((t) => ({ key: t.key, title: String(t.title || "").replace(/\.$/, ""), est: t.isConsensus === "Y" }));
  const rows = {};
  fi.rowList.forEach((r) => { const m = {}; Object.keys(r.columns || {}).forEach((k) => { m[k] = num(r.columns[k] && r.columns[k].value); }); rows[r.title] = m; });
  return { periods, rows };
}
// 최근 확정 분기와 1년 전 같은 분기 비교 — base ≤ 0 이면 증감률 대신 흑자전환/적자지속/적자전환 표기
function yoy(cur, prev) {
  if (cur == null || prev == null) return { v: cur, yoy: null, turn: null };
  if (prev > 0) return { v: cur, yoy: r1((cur / prev - 1) * 100), turn: cur < 0 ? "적자전환" : null };
  return { v: cur, yoy: null, turn: cur > 0 ? "흑자전환" : "적자지속" };
}
function quarter(t, opTitle) {
  if (!t) return null;
  const act = t.periods.filter((p) => !p.est), est = t.periods.find((p) => p.est);
  if (act.length < 5) return null;
  const cur = act[act.length - 1], prev = act[act.length - 5];
  const pick = (title, p) => (t.rows[title] ? t.rows[title][p.key] : null);
  const q = { period: cur.title.slice(0, 7), base: prev.title.slice(0, 7), opLabel: opTitle,
    rev: yoy(pick("매출액", cur), pick("매출액", prev)), op: yoy(pick(opTitle, cur), pick(opTitle, prev)),
    np: yoy(pick("당기순이익", cur), pick("당기순이익", prev)) };
  if (est) {
    const er = pick("매출액", est), eo = pick(opTitle, est);
    if (er != null || eo != null) q.next = { period: est.title.slice(0, 7), rev: er, op: eo };
  }
  return q;
}
// PER·PBR — 음수(적자)·비정상(1,000배 초과)은 숫자 대신 null
const ratioOk = (v) => (v != null && v > 0 && v < 1000 ? r2(v) : null);
// '3조 8,235억' → 원
const wonOf = (s) => { const a = /([\d,.]+)\s*조/.exec(s || ""), b = /([\d,.]+)\s*억/.exec(s || ""); const v = (a ? num(a[1]) * 1e12 : 0) + (b ? num(b[1]) * 1e8 : 0); return v > 0 ? v : null; };
// 결산 뒤 주식 수 변화(%, 한국) — 최근 결산 연도의 주식 수(지배주주순이익 ÷ EPS — 가중평균이라 근사)와 지금(시총 ÷ 종가)을 견준다.
//   Top Pick 의 '주식 수 감소' 점수(lib-picks.js)는 결산 재무라 결산 뒤 합병·증자·분할로 크게 바뀐 주식 수를 못 본다
//   (2026-10-27 HD건설기계: 2025년엔 −5.2% 였지만 2026-01 합병으로 지금 주식 수가 결산 때의 2.7배). 근사라 ±20% 넘는 차이만 쓴다.
function shareChange(t, ti) {
  if (!t) return null;
  const act = t.periods.filter((p) => !p.est), last = act[act.length - 1];
  if (!last) return null;
  const row = (title) => (t.rows[title] ? t.rows[title][last.key] : null);
  const ni = row("지배주주순이익") != null ? row("지배주주순이익") : row("당기순이익"), eps = row("EPS");
  const mv = wonOf(ti.marketValue), px = num(ti.lastClosePrice);
  if (!(ni > 0 && eps > 0 && mv > 0 && px > 0)) return null;
  return { fy: last.title.slice(0, 7), chg: r1((mv / px) / (ni * 1e8 / eps) * 100 - 100) };
}

async function korea(code) {
  const base = "https://m.stock.naver.com/api/stock/" + code;
  const [it, q, an] = await Promise.all([getJson(base + "/integration"), getJson(base + "/finance/quarter"), getJson(base + "/finance/annual")]);
  if (!it && !q) return undefined;
  const ti = {}; ((it && it.totalInfos) || []).forEach((x) => { ti[x.code] = x.value; });
  const o = {
    per: ratioOk(num(ti.per)), eps: num(ti.eps), fper: ratioOk(num(ti.cnsPer)), feps: num(ti.cnsEps),
    pbr: ratioOk(num(ti.pbr)), dy: num(ti.dividendYieldRatio), dps: num(ti.dividend),
    mcap: ti.marketValue || null, foreignRate: num(ti.foreignRate),
    hi52: num(ti.highPriceOf52Weeks), lo52: num(ti.lowPriceOf52Weeks),
  };
  const Q = quarter(finTable(q), "영업이익");
  if (Q) o.q = Q;
  const sh = shareChange(finTable(an), ti);
  if (sh) o.sh = sh;
  return o;
}

async function us(ticker, reuters) {
  const base = "https://api.stock.naver.com/stock/" + encodeURIComponent(reuters);
  const sym = encodeURIComponent(ticker.replace("-", "."));
  const [b, q, fc] = await Promise.all([getJson(base + "/basic"), getJson(base + "/finance/quarter"),
    getJson("https://api.nasdaq.com/api/analyst/" + sym + "/earnings-forecast")]);
  if (!b && !q && !fc) return undefined;
  const ti = {}; ((b && b.stockItemTotalInfos) || []).forEach((x) => { ti[x.code] = x.value; });
  const o = {
    per: ratioOk(num(ti.per)), eps: num(ti.eps), pbr: ratioOk(num(ti.pbr)),
    dy: num(ti.dividendYieldRatio), dps: num(ti.dividend), mcap: ti.marketValue || null,
    hi52: num(ti.highPriceOf52Weeks), lo52: num(ti.lowPriceOf52Weeks),
  };
  // 12개월 선행 EPS = 다음 4개 분기 컨센서스 합(Zacks). 4개가 다 있어야 계산한다.
  const rows = fc && fc.data && fc.data.quarterlyForecast && fc.data.quarterlyForecast.rows;
  if (Array.isArray(rows) && rows.length >= 4) {
    const e4 = rows.slice(0, 4).map((r) => num(r.consensusEPSForecast));
    if (e4.every((v) => v != null)) o.feps = r2(e4.reduce((s, v) => s + v, 0));
    const up = rows.slice(0, 4).reduce((s, r) => s + (num(r.up) || 0), 0), dn = rows.slice(0, 4).reduce((s, r) => s + (num(r.down) || 0), 0);
    o.rev4w = { up, down: dn };   // 최근 4주 분기 EPS 추정 상향·하향 건수(다음 4개 분기 합) — 표시·기록용(선정 규칙 아님, CLAUDE.md §6)
  }
  const Q = quarter(finTable(q), "EBIT");
  if (Q) o.q = Q;
  return o;
}

// 배당수익률 정의 점검 — 출처 값이 카드(세션이 신뢰 출처 2곳으로 확인한 값)와 3배 넘게·0.3%p 넘게 다르면
// 출처 쪽 오류 가능성이 커서(예: 네이버 NVDA 주당배당금 1.00달러 — 실제 연 0.04달러) 표시하지 않게 표시한다.
function dyCheck(o, card) {
  if (!o || o.dy == null) return;
  if (o.dy < 0 || o.dy > 25) { o.dyFlag = "범위 밖"; return; }
  if (card != null && card >= 0) {
    const a = Math.max(o.dy, card), b = Math.min(o.dy, card);
    if (Math.abs(o.dy - card) > 0.3 && (b === 0 ? a > 0.3 : a / b > 3)) o.dyFlag = "카드 값(" + card + "%)과 불일치";
  }
}

(async () => {
  const D = load("data/recommendations.js", "STOCK_DATA") || {};
  const QT = load("data/quotes.js", "STOCK_QUOTES") || {};
  const prev = (load("data/fundamentals.js", "STOCK_FUND") || {}).items || {};
  const list = [], seen = {};
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (!s || !s.ticker || seen[s.ticker]) return;
    seen[s.ticker] = 1;
    // 네이버 해외 코드는 chartUrl(worldstock/stock/<코드>/total)에서 — 없으면 티커 그대로(나스닥은 .O 가 붙어 실패할 수 있다)
    const m = c === "us" && String(s.chartUrl || "").match(/worldstock\/stock\/([^/]+)\//);
    list.push({ c, t: s.ticker, reuters: m ? decodeURIComponent(m[1]) : s.ticker, card: typeof s.dividendYield === "number" ? s.dividendYield : null });
  }));
  const items = {};
  let fresh = 0, kept = 0, none = 0;
  await mapLimit(list, 5, async (x) => {
    let v = x.c === "korea" ? await korea(x.t) : await us(x.t, x.reuters);
    if (v === undefined) { v = prev[x.t] || null; if (v) kept++; else none++; }
    else fresh++;
    if (!v) return;
    dyCheck(v, x.card);
    // 선행 PER(미국) — 현재가 ÷ 12개월 선행 EPS(양수일 때만)
    const q = QT.quotes && QT.quotes[x.t];
    if (x.c === "us" && v.feps > 0 && q && q.price > 0) v.fper = ratioOk(q.price / v.feps);
    items[x.t] = v;
  });
  const today = new Date().toISOString().slice(0, 10);
  const F = {
    asOf: today,
    builtAt: new Date().toISOString().slice(0, 19) + "Z",
    note: "밸류에이션·최근 분기 실적 — 한국: 네이버 증권(PER·추정PER(FnGuide)·PBR·배당수익률(최근 결산 DPS)·분기 매출/영업이익/순이익), 미국: 네이버 해외주식(PER·PBR·배당수익률·분기 매출/EBIT/순이익) + 나스닥(Zacks 다음 4분기 EPS 합 → 선행 PER). 매일 자동 갱신(LLM 토큰 0).",
    items,
  };
  fs.writeFileSync(OUT, "// 밸류에이션·최근 분기 실적 — scripts/update-fundamentals.js 가 자동 생성 (LLM 토큰 0)\n" +
    "// ticker → { per, eps, fper(선행 PER), feps(선행 EPS: 한국 FnGuide 올해 추정·미국 다음 4분기 합), pbr, dy(배당수익률 %), dps, dyFlag(출처 값 의심 사유),\n" +
    "//            mcap(시총 문자열), foreignRate(한국 외국인 소진율 %), hi52, lo52, rev4w:{up,down}(미국 최근 4주 EPS 추정 상향·하향),\n" +
    "//            sh:{fy(최근 결산), chg(결산 연도 주식 수 → 지금, % — 한국, Top Pick 자본 거래 점검)},\n" +
    "//            q:{period, base(비교 분기), opLabel(영업이익|EBIT), rev/op/np:{v, yoy(%), turn(흑자전환 등)}, next:{period, rev, op}(다음 분기 컨센서스)} }\n" +
    "//   단위: 한국 재무 = 억원, 미국 재무 = 백만 달러(네이버 표기 그대로).\n" +
    "window.STOCK_FUND = " + JSON.stringify(F) + ";\n");
  console.log("fundamentals.js 갱신: " + Object.keys(items).length + "/" + list.length + "종목 (신규 " + fresh + " · 이전 유지 " + kept + " · 실패 " + none + ")" +
    " · 배당 의심 " + Object.values(items).filter((v) => v.dyFlag).length);
})();
