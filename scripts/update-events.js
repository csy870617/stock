#!/usr/bin/env node
"use strict";
//
// 다음 실적 일정·직전 서프라이즈·한국 수급 과열 — 앞으로를 위한 정보만 모은다 (LLM 토큰 0, refresh-quotes Action 에서 실행)
//
//   node scripts/update-events.js          → data/events.js (window.STOCK_EVENTS)
//
// 왜: 카드의 분석이 이미 끝난 움직임을 설명하는 데 그쳐 '뒷북'으로 읽혔다(2026-10-16 사용자 지적·진단 — docs/HISTORY.md).
//     방향은 예측되지 않지만, 주가를 크게 움직일 날짜(실적 발표)와 그날 시장이 기대하는 숫자(컨센서스 EPS)는
//     미리 알 수 있다. 이 파일이 그 '앞으로의 일정'을 매일 갱신한다.
// 출처: 한국 = 네이버 증권 종목 통합 API 의 irScheduleInfo(회사가 공지한 IR·실적 발표 일정 — 공지 전이면 없음),
//       미국 = 나스닥 API(earnings-date: 예정일·장 전/후·분기 컨센서스 EPS·전년 같은 분기 EPS, Zacks 집계 /
//              earnings-surprise: 최근 4분기 발표일·실제 EPS·컨센서스·서프라이즈 %).
// 실패한 종목은 이전 값을 유지하되, 이미 지난 일정은 버린다(지난 날짜를 '다음 실적'으로 보여주지 않게).

const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "events.js");
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

// 네이버는 일부 환경(세션 egress)에서 node fetch 가 막혀 curl 로 폴백한다(screen-discovery 와 같은 방식)
let useCurl = false;
const curlJson = (url) => new Promise((resolve) => {
  execFile("curl", ["-s", "--max-time", "15", "-A", UA, "-H", "Accept: application/json", url], { maxBuffer: 8 << 20 }, (err, out) => {
    if (err || !out || !/^\s*[[{]/.test(out)) return resolve(null);
    try { resolve(JSON.parse(out)); } catch (_e) { resolve(null); }
  });
});
async function getJson(url) {
  for (let i = 0; i < 2; i++) {
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
  }
  return null;
}
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

const mdy = (s) => { const m = String(s || "").match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/); return m ? m[3] + "-" + m[1].padStart(2, "0") + "-" + m[2].padStart(2, "0") : null; };
const numOr = (s) => { const v = parseFloat(String(s == null ? "" : s).replace(/[$,]/g, "")); return isFinite(v) ? v : null; };

// 수급 과열 — 최근 20거래일 외국인+기관 순매수 수량 / 같은 기간 거래량(FI20). 상위 20% 경계 6.33%(2016~2026 한국 391종목 분포).
// 왜: '외국인·기관이 사면 오른다'는 통념과 반대로, 이 값이 경계 이상인 종목은 다음 1개월 지수 대비 평균 -0.3%(나머지 +0.8%),
//     3개월 -0.7%(나머지 +2.8%) — 보류 표본(2016-17)·전반(2018-22)·후반(2022-26) 세 구간 모두 같은 방향, 날짜별 차이
//     1개월 -1.05%p(t -3.70)·3개월 -2.68%p(t -2.94)였다(docs/HISTORY.md 2026-10-16). 수급을 따라 사면 대개 늦다는 '전망' 정보다.
//     많이 판 쪽(하위 20%)이 더 오른다는 근거는 약해 과열 쪽만 표시한다. 단위가 수량이라 거래량으로 나눠 액면분할에 무관하게 만든다.
const FLOW_HOT = 0.0633;
const signedNum = (s) => { const v = parseFloat(String(s == null ? "" : s).replace(/[,+]/g, "")); return isFinite(v) ? v : null; };
async function koreaFlow(code) {
  const j = await getJson("https://m.stock.naver.com/api/stock/" + code + "/trend?pageSize=30");
  if (!Array.isArray(j) || !j.length) return null;
  const rows = j.map((x) => ({ d: String(x.bizdate || ""), f: signedNum(x.foreignerPureBuyQuant), o: signedNum(x.organPureBuyQuant), v: signedNum(x.accumulatedTradingVolume) }))
    .filter((r) => /^\d{8}$/.test(r.d) && r.f != null && r.o != null && r.v > 0)
    .sort((a, b) => (a.d < b.d ? 1 : -1)).slice(0, 20);   // 최신 20거래일(장 마감 뒤 공개분까지)
  if (rows.length < 14) return null;
  const V = rows.reduce((s, r) => s + r.v, 0), F = rows.reduce((s, r) => s + r.f, 0), O = rows.reduce((s, r) => s + r.o, 0);
  const fi20 = (F + O) / V, d = rows[0].d;
  return { asOf: d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6), days: rows.length,
    fi20: +fi20.toFixed(4), f20: +(F / V).toFixed(4), o20: +(O / V).toFixed(4), hot: fi20 >= FLOW_HOT };
}

async function korea(code) {
  const [j, flow] = await Promise.all([getJson("https://m.stock.naver.com/api/stock/" + code + "/integration"), koreaFlow(code)]);
  if (!j && !flow) return undefined;              // 조회 실패 — 이전 값 유지
  const out = {};
  const ir = j && j.irScheduleInfo;
  if (ir && ir.irScheduleDate) out.next = { date: String(ir.irScheduleDate).slice(0, 10), title: ir.title || "IR 일정" };
  if (flow) out.flow = flow;
  return Object.keys(out).length ? out : null;    // 공지된 일정·수급 모두 없음
}

async function us(ticker) {
  const sym = encodeURIComponent(ticker);
  const [d, s] = await Promise.all([
    getJson("https://api.nasdaq.com/api/analyst/" + sym + "/earnings-date"),
    getJson("https://api.nasdaq.com/api/company/" + sym + "/earnings-surprise"),
  ]);
  if (!d && !s) return undefined;
  const out = {};
  const txt = d && d.data && d.data.reportText;
  const date = txt && mdy((txt.match(/report earnings on\s+([\d/]+)/) || [])[1]);
  if (date) {
    out.next = {
      date,
      // 'estimated … derived from an algorithm' = 회사 공지 전 과거 발표일로 추정한 날짜(확정 아님)
      tentative: /estimated to report|derived from an algorithm/i.test(txt),
      when: /after market close/i.test(txt) ? "장 마감 후" : /before market open/i.test(txt) ? "장 시작 전" : null,
      qtr: (txt.match(/Quarter ending\s+([A-Za-z]{3}\s+\d{4})/) || [])[1] || null,
      epsEst: numOr((txt.match(/consensus EPS forecast for the quarter is\s+\$?(-?[\d.]+)/) || [])[1]),
      epsPrev: numOr((txt.match(/same quarter last year was\s+\$?(-?[\d.]+)/) || [])[1]),
      analysts: numOr((txt.match(/based on\s+(\d+)\s+analysts/) || [])[1]),
    };
  }
  const rows = s && s.data && s.data.earningsSurpriseTable && s.data.earningsSurpriseTable.rows;
  if (Array.isArray(rows) && rows.length) {
    out.hist = rows.slice(0, 4).map((r) => ({ date: mdy(r.dateReported), qtr: r.fiscalQtrEnd || null,
      eps: numOr(r.eps), est: numOr(r.consensusForecast), pct: numOr(r.percentageSurprise) })).filter((r) => r.date);
  }
  return Object.keys(out).length ? out : null;
}

(async () => {
  const D = load("data/recommendations.js", "STOCK_DATA") || {};
  const prev = (load("data/events.js", "STOCK_EVENTS") || {}).items || {};
  const today = new Date().toISOString().slice(0, 10);
  const list = [], seen = {};
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (!s || !s.ticker || seen[s.ticker]) return;
    seen[s.ticker] = 1; list.push({ c, t: s.ticker });
  }));
  const items = {};
  let fresh = 0, kept = 0, none = 0;
  await mapLimit(list, 6, async (x) => {
    const r = x.c === "korea" ? await korea(x.t) : await us(x.t);
    let v = r;
    if (r === undefined) { v = prev[x.t] || null; if (v) kept++; }
    else if (r) fresh++;
    else none++;
    // 지난 일정은 '다음 실적'이 아니다 — 날짜가 오늘(UTC)보다 이르면 버린다
    if (v && v.next && v.next.date && v.next.date < today) { v = Object.assign({}, v); delete v.next; }
    if (v && Object.keys(v).length) items[x.t] = v;
  });
  const E = {
    asOf: today,
    builtAt: new Date().toISOString().slice(0, 19) + "Z",
    note: "다음 실적 일정 — 한국: 네이버 증권 irScheduleInfo(회사 공지 IR 일정, 공지 전이면 없음)·투자자별 매매동향(20일 외국인·기관 순매수, 수급 과열 판정), 미국: 나스닥(Zacks) 예정일·분기 컨센서스 EPS·최근 4분기 서프라이즈. 매일 자동 갱신(LLM 토큰 0).",
    items,
  };
  fs.writeFileSync(OUT, "// 다음 실적 일정·직전 서프라이즈 — scripts/update-events.js 가 자동 생성 (LLM 토큰 0)\n" +
    "// ticker → { next:{date, title(한국)|tentative(추정일 여부)·when·qtr·epsEst·epsPrev·analysts(미국)}, hist:[{date,qtr,eps,est,pct}](미국 최근 4분기),\n" +
    "//            flow:{asOf, days, fi20·f20·o20(20일 외국인+기관·외국인·기관 순매수 / 거래량), hot(fi20 ≥ 6.33% — 수급 과열)}(한국) }\n" +
    "window.STOCK_EVENTS = " + JSON.stringify(E) + ";\n");
  console.log("events.js 갱신: " + Object.keys(items).length + "/" + list.length + "종목 (신규 " + fresh + " · 이전 유지 " + kept + " · 일정 없음 " + none + ")");
})();
