#!/usr/bin/env node
"use strict";
//
// 현재 추세 — 지금 상승·하락 중 어느 추세인지, 언제 시작됐는지, 그 추세를 무엇이 만들었는지 숫자로 정리한다
// (LLM 토큰 0, refresh-quotes Action·세션 backbone)
//
//   node scripts/update-trend.js            → data/trend/<ticker>.json (편성·관심·보유 전 종목) + data/trend-summary.js(전 종목 요약)
//   node scripts/update-trend.js 005930 NVDA  → 그 종목만
//
// 계산(scripts/lib-trend.js): 추세 판정·시작점(되돌림 기준 지그재그의 마지막 다리) → 그 추세 구간의 시장 몫 vs 종목 고유(β)·
//   핵심 날짜(초과수익이 큰 날)·단계(꺾은선 1~4개)·직전 추세.
// 여기서 덧붙이는 사실:
//   - 한국: 네이버 증권 투자자별 매매동향(추세 구간의 외국인·기관·개인 순매수 — 수량 × 그날 종가, 단계별 합·보유율)과
//           공시(실적·수주·증자·자사주·배당·M&A·해명 등 — 핵심 날짜 전 거래일~그날 사이 공시를 붙인다)
//   - 미국: SEC 8-K(항목 번호로 실적 발표·중요 계약·임원 변경 등 — 접수 시각을 뉴욕 시각으로 바꿔 장 마감 뒤면 다음 거래일 반응),
//           나스닥 최근 실적 발표일(data/events.js)
//   - 공통: 실적 발표일 반응, 증권사 목표가 평균의 변화(data/tp-history.json 기록 구간), 숫자로 쓴 설명 문장(sum)
// 설명 문장(기사로 확인한 이유, ai 필드)은 루틴 세션이 scripts/trend-notes.js 로 쓴다 — 이 스크립트는 그대로 이어 붙인다.
// 일봉: 야후 5년 일봉(최근 약 3년을 쓴다) — 실패하면 data/chart 일봉(1년)으로 대신한다. 지수: 코스피·코스닥·S&P 500(야후).
// 조회가 실패한 종목은 이전 파일을 그대로 둔다(날짜가 지난 파일은 앱이 기준일을 보여 준다).

const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const TR = require("./lib-trend");
const { settleDailyBars } = require("./lib-quote");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "data", "trend");
const CHART = path.join(ROOT, "data", "chart");
const UA = "Mozilla/5.0";
const SEC_UA = "stock-dashboard-trend admin@stock-dashboard.dev";

function load(rel, key) {
  try {
    global.window = {};
    const f = path.join(ROOT, rel);
    delete require.cache[require.resolve(f)];
    require(f);
    return global.window[key] || null;
  } catch (_e) { return null; }
}
const safe = (t) => String(t).replace(/[^A-Za-z0-9.\-]/g, "_");
const fileOf = (t) => path.join(DIR, safe(t) + ".json");
const chartBars = (t) => {
  try {
    const j = JSON.parse(fs.readFileSync(path.join(CHART, safe(t) + ".json"), "utf8"));
    return ((j && j.d) || []).map((r) => ({ t: r[0], o: r[1], h: r[2], l: r[3], c: r[4], v: r[5] }));
  } catch (_e) { return []; }
};

// 네이버는 일부 환경(세션 egress)에서 node fetch 가 막혀 curl 로 폴백한다(update-events 와 같은 방식)
let useCurl = false;
const curlJson = (url, ua) => new Promise((resolve) => {
  execFile("curl", ["-s", "--max-time", "20", "-A", ua || UA, "-H", "Accept: application/json", url], { maxBuffer: 64 << 20 }, (err, out) => {
    if (err || !out || !/^\s*[[{]/.test(out)) return resolve(null);
    try { resolve(JSON.parse(out)); } catch (_e) { resolve(null); }
  });
});
async function getJson(url, ua) {
  for (let i = 0; i < 2; i++) {
    if (!useCurl) {
      try {
        const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 20000);
        const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": ua || UA, "Accept": "application/json" } });
        clearTimeout(to);
        if (r.ok) return await r.json();
        if (r.status === 404) return null;
        if (r.status === 403) useCurl = true;
      } catch (_e) { useCurl = true; }
    }
    const j = await curlJson(url, ua);
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
const num = (s) => { const v = parseFloat(String(s == null ? "" : s).replace(/[,+%]/g, "")); return isFinite(v) ? v : null; };
const dstr = (s) => { const m = String(s || "").match(/(\d{4})-?(\d{2})-?(\d{2})/); return m ? m[1] + "-" + m[2] + "-" + m[3] : null; };

// ── 야후 일봉(5년) — 끝난 장 기준으로 정리(lib-quote) ──
async function yahooBars(sym) {
  for (let i = 0; i < 3; i++) {
    const j = await getJson("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=5y");
    const res = j && j.chart && j.chart.result && j.chart.result[0];
    if (res && res.indicators && res.indicators.quote && res.timestamp) {
      settleDailyBars(res);
      const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000, q = res.indicators.quote[0], out = [];
      res.timestamp.forEach((ts, k) => {
        if (q.close[k] == null) return;
        out.push({ t: +new Date(ts * 1000 + off).toISOString().slice(0, 10).replace(/-/g, ""), o: q.open[k], h: q.high[k], l: q.low[k], c: q.close[k], v: q.volume[k] || 0 });
      });
      if (out.length > 60) return out;
    }
    await new Promise((r) => setTimeout(r, 600 * (i + 1)));
  }
  return null;
}
const yahooSym = (s) => (s.c === "korea" ? s.ticker + (s.market === "KOSDAQ" ? ".KQ" : ".KS") : String(s.ticker).replace(/\./g, "-"));

// ── 한국: 투자자별 매매동향 — 한 번에 60행, bizdate 앞쪽으로 넘긴다(추세 시작까지, 최대 14쪽) ──
async function krFlows(code, fromYmd) {
  const rows = [];
  let before = null;
  for (let p = 0; p < 14; p++) {
    const j = await getJson("https://m.stock.naver.com/api/stock/" + code + "/trend?pageSize=60" + (before ? "&bizdate=" + before : ""));
    if (!Array.isArray(j) || !j.length) break;
    j.forEach((x) => {
      const d = String(x.bizdate || "");
      if (!/^\d{8}$/.test(d)) return;
      rows.push({ d: +d, f: num(x.foreignerPureBuyQuant), o: num(x.organPureBuyQuant), p: num(x.individualPureBuyQuant),
        c: num(x.closePrice), h: num(String(x.foreignerHoldRatio || "").replace("%", "")) });
    });
    const oldest = Math.min.apply(null, j.map((x) => +x.bizdate).filter(isFinite));
    if (!isFinite(oldest) || oldest <= fromYmd) break;
    before = String(oldest);
  }
  const seen = {};
  return rows.filter((r) => r.f != null && r.o != null && r.c > 0 && !seen[r.d] && (seen[r.d] = 1)).sort((a, b) => a.d - b.d);
}
// ── 한국: 공시 — 주가에 영향을 줄 만한 것만 이름표를 붙여 남긴다(추세 시작까지, 최대 6쪽) ──
const KR_TAGS = [
  ["실적", /잠정\)?\s*실적|영업실적|매출액또는손익구조|손익구조/],
  ["수주", /공급계약|수주/],
  ["증자·사채", /유상증자|무상증자|전환사채|신주인수권|교환사채|증권예탁증권발행|주식관련사채/],
  ["자사주", /자기주식|주식\s*소각|소각\s*결정/],
  ["배당", /배당\s*결정|현금ㆍ현물\s*배당\s*결정/],
  ["M&A·투자", /합병|분할|영업양수|영업양도|타법인주식|출자증권|신규시설투자|유형자산\s*(?:양수|양도)/],
  ["해명", /조회공시|풍문\s*또는\s*보도|해명/],
  ["지배구조", /최대주주\s*변경|대표이사\s*변경|경영권/],
  ["소송·손실", /소송|손실발생|횡령|배임|회생절차|부도/],
  ["경영 계획", /장래사업|경영\s*계획/],
  ["상장", /해외증권시장|상장\s*결정|상장결정/],
];
const KR_SKIP = /가격제한폭|배당락|기준가격|주주명부폐쇄|기업설명회|소유주식|소유상황|대량보유|공매도|투자주의|투자경고|투자위험|단기과열|매매거래정지|첨부|추가상장|발행실적|기업지배구조|대규모기업집단|특수관계인|동일인|주주총회|감사보고서|사업보고서|분기보고서|반기보고서|자회사의 주요경영사항/;
// 제목 앞 법인명('(주)KB금융지주 ', '주식회사 카카오뱅크 ', '에스케이아이이테크놀로지 주식회사 ') — 앱 이름(KB금융)과 달라
// 이름으로는 못 뗀다. 같은 회사 공시 제목에서 가장 흔한 첫 낱말(주식회사가 붙으면 두 낱말)이 법인명이다(거래소 공시처럼 없는 제목도 있다)
function krPrefix(titles) {
  const cnt = {};
  titles.forEach((t) => {
    const w = String(t || "").trim().split(/\s+/);
    if (w.length < 2) return;
    const p = (w[0] === "주식회사" || w[1] === "주식회사") && w.length > 2 ? w[0] + " " + w[1] : w[0];
    cnt[p] = (cnt[p] || 0) + 1;
  });
  let best = null, n = 0;
  Object.keys(cnt).forEach((k) => { if (cnt[k] > n) { best = k; n = cnt[k]; } });
  return best && n >= Math.max(3, titles.length * 0.4) ? best + " " : null;
}
function krTitle(t, name, prefix) {
  let s = String(t || "").trim();
  if (prefix && s.indexOf(prefix) === 0) s = s.slice(prefix.length);
  s = s.replace(/^[^\s]*?\(주\)\s*/, "");
  if (name && s.indexOf(name + " ") === 0) s = s.slice(name.length + 1);
  return s.replace(/\((?:공정|안내|자율)공시\)/g, "").replace(/^\(정정\)\s*/, "").replace(/\s+/g, " ").trim().slice(0, 40);
}
async function krDisclosures(code, name, fromStr) {
  const raw = [];
  let got = false;
  for (let p = 1; p <= 6; p++) {
    const j = await getJson("https://m.stock.naver.com/api/stock/" + code + "/disclosure?page=" + p + "&pageSize=100");
    if (!Array.isArray(j) || !j.length) break;
    got = true;
    let oldest = "9999";
    j.forEach((x) => {
      const d = dstr(x.datetime);
      if (d && d < oldest) oldest = d;
      raw.push({ title: String(x.title || ""), d });
    });
    if (oldest < fromStr || j.length < 100) break;
  }
  const prefix = krPrefix(raw.map((x) => x.title)), out = [], seen = {};
  raw.forEach(({ title, d }) => {
    if (!d || KR_SKIP.test(title)) return;
    const tag = KR_TAGS.find((g) => g[1].test(title));
    if (!tag) return;
    const t = krTitle(title, name, prefix), k = d + "|" + t;
    if (seen[k]) return;
    seen[k] = 1;
    out.push({ d, k: tag[0], t, corr: /\(정정\)/.test(title) || undefined });
  });
  return got ? out : null;
}

// ── 미국: SEC 8-K 항목 ──
const US_ITEMS = {
  "1.01": "중요 계약 체결", "1.02": "중요 계약 해지", "1.03": "파산·회생", "2.01": "인수·매각 완료", "2.02": "실적 발표",
  "2.03": "차입·채무 발생", "2.04": "채무 조기상환 사유", "2.05": "구조조정 비용", "2.06": "자산 손상", "3.01": "상장 유지 관련",
  "3.02": "비등록 증권 발행", "3.03": "주주 권리 변경", "4.01": "회계법인 변경", "4.02": "재무제표 정정", "5.01": "지배권 변경",
  "5.02": "임원 변경", "5.03": "정관 변경", "5.07": "주총 결과", "7.01": "투자자 대상 발표", "8.01": "기타 중요 사항",
};
// 접수 시각(UTC) → 뉴욕 현지 날짜·시각 → 반응 거래일 기준 날짜(장 마감 16:00 뒤면 다음 날)
function nyEffective(iso) {
  const dt = new Date(iso);
  if (isNaN(dt)) return null;
  const p = {};
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(dt).forEach((x) => { p[x.type] = x.value; });
  const d = p.year + "-" + p.month + "-" + p.day, hm = +p.hour * 60 + +p.minute;
  if (hm < 16 * 60) return { d, eff: d };
  const n = new Date(d + "T12:00:00Z"); n.setUTCDate(n.getUTCDate() + 1);
  return { d, eff: n.toISOString().slice(0, 10) };
}
let SEC_MAP = null;
async function secCik(ticker) {
  if (SEC_MAP === null) {
    SEC_MAP = new Map();
    const tj = await getJson("https://www.sec.gov/files/company_tickers.json", SEC_UA);
    Object.values(tj || {}).forEach((r) => { if (r && r.ticker) SEC_MAP.set(String(r.ticker).toUpperCase().replace(/[.\s/]+/g, "-"), Number(r.cik_str)); });
  }
  return SEC_MAP.get(String(ticker).toUpperCase().replace(/[.\s/]+/g, "-")) || null;
}
async function us8k(ticker, fromStr) {
  const cik = await secCik(ticker);
  if (!cik) return null;
  const j = await getJson("https://data.sec.gov/submissions/CIK" + String(cik).padStart(10, "0") + ".json", SEC_UA);
  const r = j && j.filings && j.filings.recent;
  if (!r || !Array.isArray(r.form)) return null;
  const out = [];
  for (let i = 0; i < r.form.length; i++) {
    if (r.form[i] !== "8-K") continue;
    if ((r.filingDate[i] || "") < fromStr) break;   // 최신순 — 기간 앞은 볼 필요 없다
    const at = nyEffective(r.acceptanceDateTime[i]);
    if (!at) continue;
    const items = String(r.items[i] || "").split(",").map((x) => x.trim()).filter((x) => US_ITEMS[x]);
    if (!items.length) continue;
    out.push({ d: at.d, eff: at.eff, k: items.includes("2.02") ? "실적" : "8-K", t: items.map((x) => US_ITEMS[x]).join("·") });
  }
  return out;
}

// ── 문장 도우미 ──
const pct = (v, dp) => {
  if (v == null || !isFinite(v)) return "–";
  const x = v * 100, a = Math.abs(x), d = dp != null ? dp : a >= 100 ? 0 : 1;
  const s = a.toFixed(d);
  return (+s === 0 ? "" : x > 0 ? "+" : "-") + s + "%";   // 앱(fmtPct)과 같은 ASCII 부호
};
const abs = (v) => pct(v).replace(/^[+-]/, "");
const md = (s) => { const m = String(s || "").match(/\d{4}-?(\d{2})-?(\d{2})/); return m ? +m[1] + "/" + +m[2] : ""; };
// 날짜 — 기준일과 같은 해면 '7/13', 다른 해면 '2025.4.8'
const mdy = (s, ref) => {
  const d = dstr(s);
  if (!d) return "";
  return d.slice(0, 4) !== String(ref || "").slice(0, 4) ? d.slice(0, 4) + "." + +d.slice(5, 7) + "." + +d.slice(8, 10) : md(d);
};
const won = (v) => {   // 원 → '1.2조원' · '3,400억원' · '12억원'
  const a = Math.abs(v);
  if (a >= 1e12) return (a / 1e12).toFixed(a >= 1e13 ? 0 : 1).replace(/\.0$/, "") + "조원";
  if (a >= 1e8) return Math.round(a / 1e8).toLocaleString("ko-KR") + "억원";
  return Math.round(a / 1e4).toLocaleString("ko-KR") + "만원";
};
const flowWord = (who, v) => who + " " + won(v) + " " + (v >= 0 ? "순매수" : "순매도");
// 기간 길이 — 달력 기준 '3주'·'4개월'·'1년 2개월'
function durTxt(from, to) {
  const d = (Date.parse(dstr(to)) - Date.parse(dstr(from))) / 864e5;
  if (!(d >= 0)) return "";
  if (d < 14) return Math.max(1, Math.round(d)) + "일";
  if (d < 56) return Math.round(d / 7) + "주";
  const m = Math.round(d / 30.44);
  if (m < 12) return m + "개월";
  return Math.floor(m / 12) + "년" + (m % 12 ? " " + (m % 12) + "개월" : "");
}
// 추세 시작점의 말
const START_WORD = { low: "저점부터", high: "고점부터", window: "이전부터" };

// 날짜 문자열 → 시리즈 인덱스(그 날짜 이상인 첫 거래일)
function idxOnOrAfter(T, dstrv) {
  const x = +dstrv.replace(/-/g, "");
  for (let i = 0; i < T.length; i++) if (T[i] >= x) return i;
  return -1;
}

function build(stock, a, extra) {
  const S = a.series, T = S.t, lead = S.lead, D = a._days;   // D[k-1] = 시리즈 lead+k 번째 날의 수익
  const dOf = (i) => TR.ymd(T[i]);
  const tagsFor = (si, ei, list, us) => {
    if (!list || !list.length) return [];
    const lo = si > 0 ? dOf(si - 1) : dOf(0), hi = dOf(ei);
    const got = list.filter((x) => {
      const e = us ? x.eff : x.d;
      return us ? e > lo && e <= hi : e >= lo && e <= hi;
    });
    // 같은 이름표에서 제목이 같거나 한쪽이 다른 쪽을 품으면(예: '해외증권시장주권등상장'과 '…상장결정') 긴 쪽 하나만
    return got.filter((x, i) => !got.some((y, j) => j !== i && y.k === x.k && y.t !== x.t && y.t.indexOf(x.t) >= 0) &&
      got.findIndex((y) => y.k === x.k && y.t === x.t) === i)
      .slice(0, 4).map((x) => ({ k: x.k, t: x.t, d: x.d }));
  };
  const ev = extra.kr ? extra.disc : extra.k8;
  const decorate = (e) => {
    const tags = tagsFor(e.si, e.ei, ev, !extra.kr);
    // 미국 실적 발표일(나스닥 기록) — 8-K 2.02 가 없을 때(외국 기업 등) 보완
    (extra.earnDates || []).forEach((ed) => {
      const i = idxOnOrAfter(T, ed);
      if (i < 0) return;
      if ((i >= e.si && i <= e.ei) || (i + 1 >= e.si && i + 1 <= e.ei)) {
        if (!tags.some((g) => g.k === "실적")) tags.unshift({ k: "실적", t: "실적 발표", d: ed });
      }
    });
    return Object.assign({}, e, tags.length ? { tags } : {});
  };
  const keys = a.keys.map(decorate), mktDays = a.mktDays.map(decorate);

  // 실적 발표 반응(추세 구간 안) — 발표일(그 날 이후 첫 거래일)과 다음 거래일 중 초과수익이 큰 쪽
  const eDates = [];
  if (extra.kr) {
    // 같은 날 정정 공시도 그 날 발표다. 연결 기준 분기 실적을 내는 회사는 그것만 — 월별 판매 '영업(잠정)실적'(자동차 등)은 실적 발표가 아니다
    let ed = (extra.disc || []).filter((x) => x.k === "실적");
    if (ed.some((x) => /연결/.test(x.t))) ed = ed.filter((x) => /연결/.test(x.t));
    ed.forEach((x) => { if (!eDates.includes(x.d)) eDates.push(x.d); });
  }
  else {
    (extra.k8 || []).filter((x) => x.k === "실적").forEach((x) => { if (!eDates.includes(x.eff)) eDates.push(x.eff); });
    (extra.earnDates || []).forEach((d) => { if (!eDates.some((x) => Math.abs(new Date(x) - new Date(d)) <= 2 * 864e5)) eDates.push(d); });
  }
  const earn = [];
  eDates.sort().forEach((d) => {
    const i = idxOnOrAfter(T, d);
    if (i <= lead) return;   // 추세 시작일 이전(또는 그 날)
    const cand = [i, i + 1].filter((k) => k > lead && k < T.length);
    if (!cand.length) return;
    const k = extra.kr || (extra.earnDates || []).includes(d) ? cand.sort((x, y) => Math.abs(D[y - lead - 1].ar) - Math.abs(D[x - lead - 1].ar))[0] : cand[0];
    const dd = D[k - lead - 1];
    if (earn.some((x) => x.rd === dOf(k))) return;
    earn.push({ d, rd: dOf(k), ret: Math.exp(dd.rs) - 1, ar: Math.exp(dd.ar) - 1 });
  });

  // 한국 수급 — 추세 구간·단계별 순매수 금액(원)
  let flow = null;
  if (extra.flows && extra.flows.length) {
    const from = T[lead], to = T[T.length - 1];
    const sumIn = (lo, hi) => {
      const o = { f: 0, o: 0, p: 0, n: 0 };
      extra.flows.forEach((r) => { if (r.d > lo && r.d <= hi) { o.f += r.f * r.c; o.o += r.o * r.c; o.p += (r.p || 0) * r.c; o.n++; } });
      return o;
    };
    const all = sumIn(from, to);
    if (all.n >= Math.min(20, Math.max(1, a.n - 2))) {
      const inWin = extra.flows.filter((r) => r.d >= from && r.d <= to && r.h != null);
      flow = { f: Math.round(all.f), o: Math.round(all.o), p: Math.round(all.p), days: all.n, part: all.n < a.n - 5 || undefined,
        hold: inWin.length >= 2 ? [inWin[0].h, inWin[inWin.length - 1].h] : null,
        legs: a.legs.map((L) => { const s = sumIn(+L.s.replace(/-/g, ""), +L.e.replace(/-/g, "")); return { f: Math.round(s.f), o: Math.round(s.o), p: Math.round(s.p) }; }) };
    }
  }

  // 증권사 목표가 평균의 변화(기록 구간 안)
  let tp = null;
  const TH = extra.tpHist;
  if (TH && TH.days) {
    const key = (extra.kr ? "korea:" : "us:") + stock.ticker, dates = Object.keys(TH.days).sort();
    let v0 = null, d0 = null, v1 = null, d1 = null;
    dates.forEach((d) => {
      const v = TH.days[d][key];
      if (v == null) return;
      if (d <= a.from || v0 == null) { v0 = v; d0 = d < a.from ? a.from : d; }
      v1 = v; d1 = d;
    });
    if (v0 > 0 && v1 > 0 && d1 > d0) tp = { from: d0, to: d1, chg: Math.round((v1 / v0 - 1) * 10000) / 10000 };
  }

  // 숫자로 본 이유(문장)
  const sum = [];
  const bn = extra.benchName, ex = (x) => Math.exp(x) - 1, dur = durTxt(a.from, a.to), y0 = a.to;
  const startTxt = mdy(a.from, y0) + " " + START_WORD[a.kind];
  if (a.cls === "보합") {   // 약 3년 창 전체가 전환 기준(h) 안에서만 움직였다
    const where = a.box && a.box.pos != null ? (a.box.pos >= 0.75 ? "상단 근처" : a.box.pos <= 0.25 ? "하단 근처" : "중간") : "";
    sum.push(startTxt + " " + dur + "째 박스권이다 — 이 기간 고점 " + mdy(a.hi.d, y0) + "·저점 " + mdy(a.lo.d, y0) + " 사이(폭 " + abs(a.box ? a.box.width : 0) + ")에서 움직였고 지금은 " + where + "다.");
  } else {
    const up = a.cls === "상승";
    sum.push(startTxt + " " + dur + "째 " + a.cls + " 추세다 — 시작점 대비 " + pct(a.ret) + ".");
    const pull = up ? a.fromHi : a.fromLo;
    if (pull != null && Math.abs(pull) >= 0.05 && (up ? a.hi.d : a.lo.d) !== a.to)
      sum.push(up ? "추세 중 고점(" + mdy(a.hi.d, y0) + ")보다 " + abs(pull) + " 낮다 — 상승 추세 속 조정이다(이 종목의 추세 전환 기준인 고점 대비 -" + abs(a.flip ? a.flip.dn : a.h) + "에는 못 미침)."
        : "추세 중 저점(" + mdy(a.lo.d, y0) + ")보다 " + abs(pull) + " 높다 — 하락 추세 속 반등이다(이 종목의 추세 전환 기준인 저점 대비 +" + abs(a.h) + "에는 못 미침).");
    if (a.conf) sum.push("추세 확인: " + mdy(a.conf.d, y0) + "(" + (up ? "저점보다 " + pct(a.h) + " 넘게 오른 날" : "고점보다 -" + abs(a.flip ? a.flip.dn : a.h) + " 넘게 내린 날") + ") 이후 " + pct(a.conf.ret) + ".");
    if (a.flip) sum.push("전환 기준: 종가가 " + a.flip.px + (up ? " 아래로 마감하면 하락 추세" : " 위로 마감하면 상승 추세") + "로 바뀐다(지금보다 " + pct(a.flip.pct) + ").");
    if (a.quiet) sum.push("추세 중 " + (up ? "고점" : "저점") + "(" + mdy(a.quiet.d, y0) + ") 이후 " + durTxt(a.quiet.d, a.to) + "째 새 " + (up ? "고점" : "저점") + "이 없다(" + a.quiet.n + "거래일).");
  }
  sum.push("같은 기간 " + bn + " " + pct(a.mret) + " · 시장 민감도 β " + a.beta.toFixed(2) + " → 시장만 따랐다면 " + pct(a.mkt) + ". 실제 " + pct(a.ret) +
    "로, 그 차이 " + pct(a.spec) + "가 종목 고유 요인이다.");
  const at = a.att, bigN = at.upN + at.downN, top = keys[0];
  const topTxt = top ? mdy(top.s, y0) + (top.n > 1 ? "~" + md(top.e) : "") + " " + pct(top.ret) + (top.tags && top.tags[0] ? "·" + top.tags[0].k : "") : "";
  if (a.character === "사건" && top) sum.push("종목 고유 움직임의 대부분이 큰 날 " + bigN + "일에서 나왔다 — 가장 컸던 날은 " + topTxt + ".");
  else if (a.character === "흐름") {
    const opp = Math.sign(at.up + at.down) && Math.sign(at.up + at.down) !== Math.sign(at.spec);
    sum.push("종목 고유 움직임은 특정한 날보다 평소에 조금씩 쌓였다" + (opp ? "(큰 날들은 오히려 " + (at.spec < 0 ? "반등" : "급락") + "이었다)" : "") + ".");
  } else if (a.character === "혼합" && top) sum.push("종목 고유 움직임 중 일부는 큰 날 " + bigN + "일(가장 큰 날 " + topTxt + ")에서, 나머지는 평소 흐름에서 나왔다.");
  else if (at.upN && at.downN && Math.abs(at.up + at.down) < 0.5 * Math.min(at.up, -at.down))
    sum.push("급등한 날 " + at.upN + "일(" + pct(ex(at.up)) + ")과 급락한 날 " + at.downN + "일(" + pct(ex(at.down)) + ")이 서로 상쇄돼 종목 고유 몫은 작았다(" + pct(a.spec) + ").");
  else if (bigN && Math.abs(at.up + at.down) >= 0.03 && Math.sign(at.up + at.down) !== Math.sign(at.rest))
    sum.push("큰 " + (at.up + at.down > 0 ? "상승" : "하락") + "일(" + bigN + "일 합계 " + pct(ex(at.up + at.down)) + ")이 있었지만 그 밖의 날들에 " +
      (at.rest < 0 ? "밀려" : "올라") + "(" + pct(ex(at.rest)) + ") 종목 고유 몫은 작았다(" + pct(a.spec) + ").");
  else sum.push("종목 고유 몫이 작아(" + pct(a.spec) + ") 주가는 대체로 시장 몫(β)대로 움직였다.");
  if (a.legs.length > 1) sum.push("추세 안의 단계: " + a.legs.map((L) => mdy(L.e, y0) + "까지 " + pct(L.ret) + " " + L.cls).join(" → ") + ".");
  if (a.prev) sum.push("직전에는 " + mdy(a.prev.from, y0) + (a.prev.cut ? " 이전" : "") + "부터 " + mdy(a.prev.to, y0) + "까지 " + durTxt(a.prev.from, a.prev.to) + " " +
    a.prev.cls + "(" + pct(a.prev.ret) + ")이었다.");
  if (flow) sum.push((flow.part ? "추세 구간 중 최근 " + flow.days + "거래일" : "같은 기간") + " " + [flowWord("외국인", flow.f), flowWord("기관", flow.o), flowWord("개인", flow.p)].join(" · ") +
    (flow.hold && flow.hold[0] != null && Math.abs(flow.hold[1] - flow.hold[0]) >= 0.3 ? " — 외국인 보유율 " + flow.hold[0].toFixed(1) + "% → " + flow.hold[1].toFixed(1) + "%" : "") + ".");
  if (earn.length) sum.push("실적 발표 반응: " + earn.slice(-6).map((e) => mdy(e.rd, y0) + " " + pct(e.ret) + "(시장 대비 " + pct(e.ar) + ")").join(", ") + ".");
  if (a.upVol != null && a.n >= 20 && a.upVol >= 0.58) sum.push("거래는 오른 날에 몰렸다(거래량의 " + Math.round(a.upVol * 100) + "%).");
  else if (a.upVol != null && a.n >= 20 && a.upVol <= 0.42) sum.push("거래는 내린 날에 몰렸다(거래량의 " + Math.round((1 - a.upVol) * 100) + "%).");
  if (a.volTrend != null && a.volTrend <= 0.6) sum.push("최근 20일 거래량은 추세 구간 평균의 " + Math.round(a.volTrend * 100) + "% 수준으로 줄었다.");
  else if (a.volTrend != null && a.volTrend >= 1.6) sum.push("최근 20일 거래량이 추세 구간 평균의 " + a.volTrend.toFixed(1) + "배로 늘었다.");
  if (tp && Math.abs(tp.chg) >= 0.03) sum.push("증권사 목표가 평균은 " + mdy(tp.from, y0) + " 이후 " + pct(tp.chg) + (tp.chg > 0 ? " 올라갔다." : " 내려갔다."));

  const out = Object.assign({ v: 1, t: stock.ticker, c: stock.c, name: stock.name, mk: stock.market, asOf: a.to,
    builtAt: new Date().toISOString().slice(0, 19) + "Z", bench: { k: extra.benchKey, name: bn }, src: extra.src }, a,
    { keys, mktDays, earn: earn.map((e) => ({ d: e.d, rd: e.rd, ret: +e.ret.toFixed(4), ar: +e.ar.toFixed(4) })), flow, tp, sum, fp: TR.fingerprint(a) });
  delete out._days;
  return out;
}

(async () => {
  const only = process.argv.slice(2).filter((x) => !/^--/.test(x));
  const D = load("data/recommendations.js", "STOCK_DATA") || {};
  const E = (load("data/events.js", "STOCK_EVENTS") || {}).items || {};
  let tpHist = null;
  try { tpHist = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "tp-history.json"), "utf8")); } catch (_e) {}
  const list = [], seen = {};
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (!s || !s.ticker || seen[s.ticker]) return;
    if (only.length && !only.includes(s.ticker)) return;
    seen[s.ticker] = 1;
    list.push({ c, ticker: s.ticker, name: s.name, market: s.market });
  }));
  fs.mkdirSync(DIR, { recursive: true });

  const BN = { kospi: "코스피", kosdaq: "코스닥", sp500: "S&P 500" }, BSYM = { kospi: "^KS11", kosdaq: "^KQ11", sp500: "^GSPC" };
  const need = new Set(list.map((s) => (s.c === "korea" ? (s.market === "KOSDAQ" ? "kosdaq" : "kospi") : "sp500")));
  const bench = {};
  for (const k of need) {
    const b = await yahooBars(BSYM[k]);
    // 야후 실패 시 지수 차트 파일(1년) — 미국은 대신할 파일이 없다
    bench[k] = b ? b.map((x) => ({ t: x.t, c: x.c })) : k !== "sp500" ? chartBars("idx-" + k).map((x) => ({ t: x.t, c: x.c })) : null;
  }

  let wrote = 0, kept = 0, skipped = 0, aiKept = 0, short = 0;
  const fails = [];
  await mapLimit(list, 4, async (s) => {
    const kr = s.c === "korea";
    const bk = kr ? (s.market === "KOSDAQ" ? "kosdaq" : "kospi") : "sp500";
    const prev = (() => { try { return JSON.parse(fs.readFileSync(fileOf(s.ticker), "utf8")); } catch (_e) { return null; } })();
    let bars = await yahooBars(yahooSym(s)), src = "yahoo5y";
    if (!bars) { bars = chartBars(s.ticker); src = "chart1y"; short++; }
    if (!bench[bk] || bench[bk].length < 60 || bars.length < 60) { if (prev) kept++; else skipped++; fails.push(s.ticker + "(자료 부족)"); return; }
    const a = TR.analyze(bars, bench[bk]);
    if (!a) { if (prev) kept++; else skipped++; fails.push(s.ticker + "(판정 불가)"); return; }
    const extra = { kr, benchKey: bk, benchName: BN[bk], tpHist, src };
    if (kr) {
      const fromInt = +a.from.replace(/-/g, "");
      const [flows, disc] = await Promise.all([krFlows(s.ticker, fromInt), krDisclosures(s.ticker, s.name, a.from)]);
      extra.flows = flows && flows.length ? flows : null;
      extra.disc = disc ? disc.filter((x) => x.d >= a.from) : null;
      if (!disc) fails.push(s.ticker + "(공시)");
      if (!flows || !flows.length) fails.push(s.ticker + "(수급)");
    } else {
      const ev = E[s.ticker];
      extra.earnDates = ((ev && ev.hist) || []).map((h) => h.date).filter((d) => d && d >= a.from);
      extra.k8 = await us8k(s.ticker, a.from);
    }
    const out = build(s, a, extra);
    // 기사로 확인한 이유(ai)는 루틴 세션 몫(trend-notes.js) — 이어 붙인다
    if (prev && prev.ai) { out.ai = prev.ai; aiKept++; }
    fs.writeFileSync(fileOf(s.ticker), JSON.stringify(out));
    wrote++;
  });

  // 편성에서 빠진 종목의 파일은 지운다(종목을 골라 돌린 때는 건드리지 않는다)
  let removed = 0;
  if (!only.length) {
    const keep = new Set(list.map((s) => path.basename(fileOf(s.ticker))));
    fs.readdirSync(DIR).forEach((f) => { if (/\.json$/.test(f) && !keep.has(f)) { fs.unlinkSync(path.join(DIR, f)); removed++; } });
  }
  // 전 종목 요약(data/trend-summary.js) — 목록에서 종목마다 추세를 바로 보이고(추세추종용), AI 질문 맥락에 넣는다. 지금 폴더의 파일 전체로 다시 쓴다
  const SUM = {};
  let sumAsOf = "";
  fs.readdirSync(DIR).filter((f) => /\.json$/.test(f)).forEach((f) => {
    let j = null;
    try { j = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); } catch (_e) { return; }
    if (!j || !j.t || !j.cls) return;
    if (j.asOf > sumAsOf) sumAsOf = j.asOf;
    SUM[j.t] = { c: j.c, cls: j.cls, from: j.from, kind: j.kind, ret: j.ret, conf: j.conf ? { d: j.conf.d, ret: j.conf.ret } : null,
      flip: j.flip ? { px: j.flip.px, pct: j.flip.pct } : null, quiet: j.quiet || null, asOf: j.asOf };
  });
  fs.writeFileSync(path.join(ROOT, "data", "trend-summary.js"), "// update-trend.js 가 쓴다 — 종목별 현재 추세 요약(목록·AI 질문용). 손으로 고치지 않는다.\n" +
    "window.TREND_SUMMARY = " + JSON.stringify({ asOf: sumAsOf, builtAt: new Date().toISOString().slice(0, 19) + "Z", items: SUM }) + ";\n");
  const miss = [...need].filter((k) => !bench[k]).map((k) => BN[k]);
  console.log("data/trend 갱신: " + wrote + "/" + list.length + "종목 (이전 유지 " + kept + " · 판정 불가 " + skipped + " · 설명 이어붙임 " + aiKept +
    (short ? " · 1년 일봉으로 대신 " + short : "") + (removed ? " · 정리 " + removed : "") + ")" + (miss.length ? " · 지수 조회 실패: " + miss.join("·") : "") +
    (fails.length ? "\n  일부 실패: " + fails.slice(0, 20).join(", ") + (fails.length > 20 ? " 외 " + (fails.length - 20) : "") : ""));
})();
