#!/usr/bin/env node
// 주간 심층 발굴(C 모드)의 후보 스크린 — LLM 토큰 0 (순수 스크립트)
//
// 왜: 신규 후보 탐색이 웹 검색 스니펫에 걸리는 종목(기사·'유망주 리스트')에서만 후보를 얻어, 7월에 나온
//     후보(코세스·고려아연·BNK…)를 석 달째 돌려 막고 있었다(2026-10-12 점검 — 9/13 이후 루틴 탐색 교체 2건).
//     시장 전체를 같은 잣대로 훑어 '검증할 만한 후보'를 먼저 뽑고, 세션은 검색 예산을 후보 검증에만 쓴다.
//
// 무엇을: 네이버 증권 시가총액 순위(한국 KOSPI 250·KOSDAQ 150, 미국 NASDAQ 250·NYSE 350)를 받아
//   종목별 연간·분기 재무(매출·영업이익/EBIT·순이익·ROE/ROA·부채비율·배당)와 컨센서스·밸류(PER·PBR·배당수익률)를
//   모은 뒤, 주제 정의(core 우량·growth 성장·value 저평가·dividend 배당)에 맞는 '하드 조건 + 점수'로
//   (국가×주제) 그룹마다 후보 상위 10개와, 같은 잣대로 잰 현 편성 9종목을 함께 data/discovery-candidates.js 에 쓴다.
//   히든(rising) 두 그룹은 scripts/screen-hidden.js 가 채운다('10배 가능성 + 영구 손실 위험 낮음' 기준, CLAUDE.md §6).
//
// ★ 이것은 '후보 생성'이지 '선정 규칙'이 아니다(CLAUDE.md §6 — 검증 안 된 팩터를 선정에 쓰지 않는다).
//   편입·교체는 세션이 웹 검색으로 검증하고 §5 교체 기준(편출 종목 결격 등)을 그대로 따른다.
//   한국 점수에는 컨센서스 상승여력을 넣지 않는다(백테스트상 한국 upside 선별력 없음 — §7). 미국만 일부 반영.
//
// 사용법: node scripts/screen-discovery.js            # 받기 + 기록
//         node scripts/screen-discovery.js --if-stale  # 6일 이내 생성본이 있으면 건너뜀(Action 주 1회용)
//         node scripts/screen-discovery.js --limit 40  # 시험용(국가별 상위 N종목만)
//         node scripts/screen-discovery.js --skip-hidden  # 히든 두 그룹은 이전 결과 유지(약 15분 절약 — 주제 기준만 다시 볼 때)
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "discovery-candidates.js");
const argVal = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
const LIMIT = Number(argVal("limit") || 0);
const IF_STALE = process.argv.includes("--if-stale");
const TOP_N = 10;
const today = new Date().toISOString().slice(0, 10);

if (IF_STALE && fs.existsSync(OUT)) {
  try {
    global.window = {}; require(OUT);
    const b = (global.window.DISCOVERY_CANDIDATES || {}).builtAt;
    if (b && (Date.now() - Date.parse(b)) / 86400000 < 6) { console.log("discovery-candidates.js 신선(" + b + ") — 건너뜀"); process.exit(0); }
  } catch (_e) { /* 다시 만든다 */ }
}

global.window = {};
require(path.join(ROOT, "data", "recommendations.js"));
const D = global.window.STOCK_DATA;

// ── 네트워크: node fetch 우선, 막히면(세션 환경은 네이버 egress 차단) curl 로 — 비동기라 동시성 유지 ──
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
let useCurl = false;
function curlJson(url) {
  return new Promise((resolve) => {
    execFile("curl", ["-s", "--max-time", "15", "-A", UA, url], { maxBuffer: 16 * 1024 * 1024 }, (err, out) => {
      if (err || !out || out.trim().charAt(0) !== "{") return resolve(null);
      try { resolve(JSON.parse(out)); } catch (_e) { resolve(null); }
    });
  });
}
async function getJson(url) {
  for (let i = 0; i < 2; i++) {
    if (!useCurl) {
      try {
        const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 12000);
        const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": UA, "Accept": "application/json" } });
        clearTimeout(to);
        if (r.ok) return await r.json();
        if (r.status === 404) return null;
        if (r.status === 403) useCurl = true;   // 프록시 egress 차단 — 이후 전부 curl
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
const num = (v) => { if (v == null) return null; const n = parseFloat(String(v).replace(/[,%배원$]/g, "").trim()); return isFinite(n) ? n : null; };

// ── 재무표 파싱: {periods:[{key,title,est}], rows:{제목:{key:값}}} ──
function finTable(j) {
  const fi = j && (j.financeInfo || j);
  if (!fi || !Array.isArray(fi.trTitleList) || !Array.isArray(fi.rowList)) return null;
  const periods = fi.trTitleList.map((t) => ({ key: t.key, title: t.title, est: t.isConsensus === "Y" }));
  const rows = {};
  fi.rowList.forEach((r) => { const m = {}; Object.keys(r.columns || {}).forEach((k) => { m[k] = num(r.columns[k] && r.columns[k].value); }); rows[r.title] = m; });
  return { periods, rows };
}
// 실적(확정) 기간 값 배열(오래된→최신)과 추정치
function series(t, title) {
  if (!t || !t.rows[title]) return { act: [], est: null };
  const act = t.periods.filter((p) => !p.est).map((p) => t.rows[title][p.key]);
  const e = t.periods.find((p) => p.est);
  return { act, est: e ? t.rows[title][e.key] : null };
}
const last = (a, k = 1) => (a.length >= k ? a[a.length - k] : null);
const growth = (cur, prev) => (cur != null && prev != null && prev > 0 ? cur / prev - 1 : null);
const sum4 = (a) => (a.length >= 4 && a.slice(-4).every((x) => x != null) ? a.slice(-4).reduce((s, x) => s + x, 0) : null);

// ── 유니버스 ──
async function rankKR(market, pages) {
  const out = [];
  for (let p = 1; p <= pages; p++) {
    const j = await getJson("https://m.stock.naver.com/api/stocks/marketValue/" + market + "?page=" + p + "&pageSize=100");
    (j && j.stocks || []).forEach((s) => out.push(s));
  }
  return out.filter((s) => s.stockEndType === "stock" && /0$/.test(s.itemCode) && !/스팩|SPAC/i.test(s.stockName))
    .map((s) => ({ c: "korea", code: s.itemCode, ticker: s.itemCode, name: s.stockName, market,
      price: num(s.closePriceRaw) || num(s.closePrice), mcap: num(s.marketValueRaw) }));
}
async function rankUS(exch, pages) {
  const out = [];
  for (let p = 1; p <= pages; p++) {
    const j = await getJson("https://api.stock.naver.com/stock/exchange/" + exch + "/marketValue?page=" + p + "&pageSize=100");
    (j && j.stocks || []).forEach((s) => out.push(s));
  }
  return out.filter((s) => s.stockEndType === "stock" && s.reutersCode)
    .map((s) => ({ c: "us", code: s.reutersCode, ticker: s.symbolCode, name: s.stockNameEng || s.stockName, nameKo: s.stockName,
      market: exch, industry: s.industryCodeType && s.industryCodeType.industryGroupKor, price: num(s.closePriceRaw),
      mcap: num(s.marketValueRaw), divYieldRank: num(s.dividendYield) }));
}
const FIN_RE = /(금융|은행|보험|증권|화재|생명|카드|캐피탈|투자|리츠|REIT)/i;
// 네이버 업종 코드(integration.industryCode) — 은행 301·손해보험 315·증권 321·생명보험 330·카드 337.
// 예전엔 이름에 금융 낱말이 없으면 '부채비율 400% 초과'로 금융을 추정했는데, 방산 선수금으로 부채비율이 높은
// LIG디펜스(446%)·한국항공우주(447%)가 금융으로 잡혀 비금융 부채비율·ROIC 조건을 건너뛰었다(2026-10-18 C 모드).
// 업종 코드가 없을 때만 부채비율 추정을 쓴다.
const KR_FIN_INDUSTRY = new Set(["301", "315", "321", "330", "337"]);
// 같은 회사의 다른 주식(GOOGL·GOOG, BRK.A·BRK.B …)을 한 회사로 묶는 이름 키
const coKey = (n) => String(n || "").toLowerCase().replace(/\bclass\s+[a-z]\b/g, "").replace(/\b(inc|corp|corporation|co|company|ltd|plc|holdings?|group|the|n\.?v|s\.?a|ag|se)\b\.?/g, "")
  .replace(/[^a-z0-9가-힣]/g, "");
const US_FIN_RE = /(은행|보험|대출|금융|투자 관리|투자 은행|중개|자산 관리|증권|리츠|REIT|캐피털|신용)/;
// 원자재 가격에 실적이 좌우되는 업종 — 성장·히든 후보에서 뺀다(금값·유가 급등이 '구조적 성장'처럼 보이는 착시 방지)
const US_CYCL_RE = /^(금|은|귀금속)$|광업|광산|탐사 및 생산|석탄|철강|알루미늄|구리/;
// 합자회사(MLP 등) — 미국 K-1 세금 처리로 개인 투자에 부적합
const PARTNERSHIP_RE = /\b(units?|l\.?p\.?)\b/i;

// ── 종목별 지표 ──
async function enrichKR(s) {
  const base = "https://m.stock.naver.com/api/stock/" + s.code;
  const [a, q, it] = await Promise.all([getJson(base + "/finance/annual"), getJson(base + "/finance/quarter"), getJson(base + "/integration")]);
  const A = finTable(a), Q = finTable(q);
  if (!A) return null;
  const rev = series(A, "매출액"), op = series(A, "영업이익"), np = series(A, "지배주주순이익").act.length ? series(A, "지배주주순이익") : series(A, "당기순이익");
  const roe = series(A, "ROE"), opm = series(A, "영업이익률"), debt = series(A, "부채비율"), dps = series(A, "주당배당금"), eps = series(A, "EPS");
  const qrev = series(Q, "매출액"), qop = series(Q, "영업이익");
  const ti = {}; ((it && it.totalInfos) || []).forEach((x) => { ti[x.code] = x.value; });
  const ci = (it && it.consensusInfo) || {};
  const price = s.price || num(ti.lastClosePrice);
  const tp = num(ci.priceTargetMean), tpDate = ci.createDate || null;
  const fresh = tpDate && (Date.now() - Date.parse(tpDate)) / 86400000 <= 60;
  const ind = it && it.industryCode != null ? String(it.industryCode) : null;
  const fin = FIN_RE.test(s.name) || (ind ? KR_FIN_INDUSTRY.has(ind) : (last(debt.act) != null && last(debt.act) > 400));
  return Object.assign(s, {
    fin, price,
    revG: growth(last(rev.act), last(rev.act, 2)), revE: growth(rev.est, last(rev.act)),
    opG: growth(last(op.act), last(op.act, 2)), opE: growth(op.est, last(op.act)),
    qRevYoY: qrev.act.length >= 5 ? growth(last(qrev.act), last(qrev.act, 5)) : null,
    qOpYoY: qop.act.length >= 5 ? growth(last(qop.act), last(qop.act, 5)) : null,
    opPos: op.act.length >= 2 && last(op.act) > 0 && last(op.act, 2) > 0, ttmOp: sum4(qop.act),
    npPos: last(np.act) != null && last(np.act) > 0, npE: np.est,
    roe: last(roe.act), opm: last(opm.act), debt: last(debt.act),
    per: num(ti.per), cnsPer: num(ti.cnsPer), pbr: num(ti.pbr),
    divY: num(ti.dividendYieldRatio) != null ? num(ti.dividendYieldRatio) : (last(dps.act) && price ? last(dps.act) / price * 100 : null),
    payout: last(dps.act) != null && last(eps.act) > 0 ? last(dps.act) / last(eps.act) : null,
    tp, tpDate, upside: tp && price && fresh ? tp / price - 1 : null, recomm: num(ci.recommMean),
    hi52: num(ti.highPriceOf52Weeks),
  });
}
async function enrichUS(s) {
  const base = "https://api.stock.naver.com/stock/" + s.code;
  const [a, q, it, b] = await Promise.all([getJson(base + "/finance/annual"), getJson(base + "/finance/quarter"), getJson(base + "/integration"), getJson(base + "/basic")]);
  const A = finTable(a), Q = finTable(q);
  if (!A && !Q) return null;
  const rev = series(A, "매출액"), ebit = series(A, "EBIT"), ni = series(A, "당기순이익"), roa = series(A, "ROA");
  const qrev = series(Q, "매출액"), qebit = series(Q, "EBIT"), qni = series(Q, "당기순이익");
  const ti = {}; ((b && b.stockItemTotalInfos) || []).forEach((x) => { ti[x.code] = x.value; });
  const ci = (it && it.consensusInfo) || {};
  const tp = num(ci.priceTargetMean), tpDate = ci.createDate || null;
  const fresh = tpDate && (Date.now() - Date.parse(tpDate)) / 86400000 <= 60;
  const ttmRev = sum4(qrev.act), ttmEbit = sum4(qebit.act), ttmNi = sum4(qni.act);
  const hi = num(ci.priceTargetHigh), lo = num(ci.priceTargetLow);
  return Object.assign(s, {
    fin: US_FIN_RE.test(s.industry || ""), cycl: US_CYCL_RE.test(s.industry || ""), lp: PARTNERSHIP_RE.test(s.name || ""),
    revG: growth(last(rev.act), last(rev.act, 2)),
    qRevYoY: qrev.act.length >= 5 ? growth(last(qrev.act), last(qrev.act, 5)) : null,
    ebitYoY: qebit.act.length >= 5 ? growth(last(qebit.act), last(qebit.act, 5)) : null,
    ttmEbit, ttmNi, ebitM: ttmEbit != null && ttmRev > 0 ? ttmEbit / ttmRev : null,
    roa: last(roa.act), per: num(ti.per), pbr: num(ti.pbr),
    divY: num(ti.dividendYieldRatio) != null ? num(ti.dividendYieldRatio) : s.divYieldRank,
    payout: num(ti.dividend) != null && num(ti.eps) > 0 ? num(ti.dividend) / num(ti.eps) : null,
    tp, tpDate, upside: tp && s.price && fresh ? tp / s.price - 1 : null, recomm: num(ci.recommMean),
    tpSingle: hi != null && lo != null && hi === lo, hi52: num(ti.highPriceOf52Weeks),
  });
}

// ── 주제별 하드 조건과 점수(백분위 가중합) — 2026-10-17 주제 기준 연구로 다시 짰다(scripts/research/theme · docs/HISTORY.md '주제 기준 연구') ──
// ok = 주제의 정체성 조건(규모·흑자·배당수익률·저평가 등, 예전과 같음) · ex = 검증된 건전성 필터 · w = 검증된 점수 지표
//   점수 지표는 '같은 주제 모집단에서 다음 6개월 초과수익을 미국 14년 전반·후반 모두 가른' 것만 남겼다(사전 등록 기준 통과 = 주 지표,
//   넓은 유니버스 통과 + 주제 안 전반·후반 양(+) + 한국 반대 아님 = 보조 지표). 배당 주제의 이익 안정성·배당 연속성은 다음 해 배당 삭감 확률을 낮춘 지표.
//   검증에서 떨어진 예전 항목(시총·매출/이익 성장·영업이익률·PER·PBR·ROE·배당수익률 크기)은 점수에서 뺐다:
//   성장주 안에서 매출 성장이 가장 빠른 쪽은 이후 수익이 오히려 낮았고(미국 t −2.6·한국 t −2.9), 배당주 안에서 배당수익률 최상위는
//   수익 우위 없이 다음 해 배당 삭감 확률만 5배였다(28% vs 5%). 미국 컨센서스 상승여력(upside)은 과거 이력이 없어 판정하지 않았다 — 예전 가중 유지(§7).
// 팩터(s.fx)는 scripts/screen-factors.js 가 붙인다(한국 기업현황·미국 SEC/야후 — 정의는 scripts/lib-factors.js, 연구 패널과 같은 계산식).
const g0 = (v) => (v == null ? -Infinity : v);
const EX = {   // 걸러지는 쪽이 전반·후반 모두 6개월 초과수익이 낮고 12개월 −30% 대폭락 확률이 높았던 조건(미국 검증 — 데이터가 없으면 거르지 않는다)
  loss: { label: "순이익 적자", f: (s) => s.fx && s.fx.niPos === 0 },
  dil: { label: "주식 수 연 5% 초과 증가(희석)", f: (s) => s.fx && s.fx.ISS != null && s.fx.ISS > 0.05 },
  // 금융(은행·보험·카드 등)의 '매출'은 이자·보험 수익이라 금리·업황에 따라 움직인다 — 금융을 뺀 표본에서도 이 필터가 성립해(미국 전반·후반) 비금융에만 적용
  revDown: { label: "매출 역성장(가치 함정)", f: (s) => !s.fin && s.fx && s.fx.SG1 != null && s.fx.SG1 < 0 },
  payout: { label: "배당성향 100% 초과", f: (s) => s.fx && s.fx.PAYOUT != null && s.fx.PAYOUT > 1 },
  agTop: { label: "자산 급증(주제 안 상위 10%)", dec: "AG" },
  sroaTop: { label: "이익 변동 큼(주제 안 상위 10%)", dec: "SROA" },
  // 사용자 결정(2026-10-17) — 수익 개선이 검증된 필터가 아니라 '추세가 완전히 무너진 종목은 추천하지 않는다'는 위험 회피 규칙(CLAUDE.md §6)
  trend: { label: "추세 붕괴(월봉 10·20개월선 아래·두 선 하락)", f: (s) => !!(s.fx && s.fx.trendBroken) },
};
// ── 2차 연구(2026-10-17 같은 날, '주제다움' — README '2차 연구'): 주제가 약속하는 것(우량=다음 해 ROIC 유지·성장=다음 해 매출 성장·
//   저평가=다음 해 이익 붕괴 없음·배당=삭감 없음)을 실제로 지킨 회사를 가르는 지표로 점수를 다시 짰다. 우량·성장·저평가에서는
//   배당 의존 지표(FCF 배당 커버리지·주주환원수익률의 배당분)를 뺐다 — 배당을 안 주는 회사가 불리하지 않게(사용자 요청).
//   gate = 정체성 조건 중 모집단 분포로 정하는 부분(우량: 비금융 3년 평균 ROIC 상위 절반, 저평가: EBIT/EV 또는 FCF/시총 상위 30%).
const pctOf = (arr, f) => { const xs = arr.map(f).filter((v) => v != null && isFinite(v)).sort((a, b) => a - b); return (v) => { if (v == null || !isFinite(v) || xs.length < 10) return null; let lo = 0; while (lo < xs.length && xs[lo] < v) lo++; return lo / (xs.length - 1); }; };
const fxv = (k) => (s) => (s.fx ? s.fx[k] : null);
// 우량: 비금융은 3년 평균 ROIC 가 같은 적격 후보 안 상위 절반. 금융은 투하자본 개념이 맞지 않고 연구에서 따로 검증하지 않아 이 조건을 면제한다
const coreGate = (base) => { const pn = pctOf(base.filter((s) => !s.fin), fxv("ROIC3")); return (s) => { if (s.fin) return true; const v = pn(s.fx && s.fx.ROIC3); return v == null ? true : v >= 0.5; }; };
// 저평가: 순위 안 전체에서 EBIT/EV 또는 FCF/시총 상위 30%(이익 대비가 아니라 기업가치·현금 대비 싼 쪽 — 가치 함정이 적었다).
//   금융은 EBIT/EV·FCF 가 정의되지 않아 예전 PER·PBR 조건을 쓴다
const valueGate = (pool, rankMax, perMax, pbrMax) => { const u = pool.filter((s) => !s.extra && s.rank <= rankMax && !s.fin); const pe = pctOf(u, fxv("EBITEV")), pf = pctOf(u, fxv("FCFP"));
  return (s) => (s.fin ? (s.per != null && s.per > 0 && s.per <= perMax) || (s.pbr != null && s.pbr > 0 && s.pbr <= pbrMax) : Math.max(pe(s.fx && s.fx.EBITEV) ?? -1, pf(s.fx && s.fx.FCFP) ?? -1) >= 0.7); };
const RULES = {
  korea: {
    core: { label: "KOSPI · 시총 상위 60 · 영업이익 2년 연속 흑자 · ROE ≥ 7% · 부채비율 ≤ 150%(금융 제외) · 3년 평균 ROIC 상위 절반(비금융) — 점수: 3년 평균 ROIC·주식 수 감소(배당 무관)",
      ok: (s) => s.market === "KOSPI" && s.rank <= 60 && s.opPos && s.roe >= 7 && (s.fin || s.debt == null || s.debt <= 150), gate: (base) => coreGate(base),
      ex: ["trend"], w: { roic3: 0.5, iss: 0.5 } },
    growth: { label: "시총 상위 150 · 금융 제외 · 매출 성장률(올해 추정 또는 최근 연도) ≥ 15% · 영업이익 흑자 · 순이익 흑자 · 자산 급증·이익 변동 상위 10% 제외 — 점수: 성장 지속성(3년 매출 연평균·FCF 마진·3년 평균 ROIC)·주식 수 감소(1년 성장 크기·배당은 뺌)",
      ok: (s) => s.rank <= 150 && !s.fin && Math.max(g0(s.revE), g0(s.revG)) >= 0.15 && s.opPos,
      ex: ["loss", "agTop", "sroaTop", "trend"], w: { sg3: 0.3, fcfm: 0.25, roic3: 0.25, iss: 0.2 } },
    value: { label: "시총 상위 200 · EBIT/EV 또는 FCF/시총 상위 30%(금융은 PER ≤ 12 또는 PBR ≤ 0.9) · 순이익 흑자 · 이익 개선 · 매출 역성장·희석 5% 초과·자산 급증 상위 10% 제외 — 점수: 이익 안정성(영업이익률·ROA 변동 작음)·이익의 현금 전환·주식 수 감소",
      ok: (s) => s.rank <= 200 && s.npPos && (g0(s.opE) > 0 || g0(s.qOpYoY) > 0), gate: (base, pool) => valueGate(pool, 200, 12, 0.9),
      ex: ["agTop", "dil", "revDown", "trend"], w: { sopm: 0.25, sroa: 0.25, fcfni: 0.25, iss: 0.25 } },
    dividend: { label: "배당수익률 ≥ 3.5% · 배당성향 ≤ 90% · 순이익 흑자 · 시총 상위 250 · 매출 역성장·희석 5% 초과·자산 급증 상위 10% 제외 — 점수: 이익 안정성·배당 연속 비감소·주식 수 감소(배당수익률 크기는 점수에서 뺌)",
      ok: (s) => s.rank <= 250 && s.divY >= 3.5 && s.npPos && (s.payout == null || s.payout <= 0.9),
      ex: ["agTop", "dil", "payout", "revDown", "trend"], w: { sroa: 0.35, streak: 0.35, iss: 0.3 } },
    // rising(히든)은 scripts/screen-hidden.js — 시총 수천억~수조·성장 20%·ROIC 15%·PEG 1.5·순현금/FCF 기준이라 더 작은 종목·5년 재무가 필요하다(2026-10-17)
  },
  us: {
    core: { label: "시총 상위 120 · TTM EBIT 흑자 · EBIT 마진 ≥ 10% · ROA ≥ 5%(금융 제외) · 3년 평균 ROIC 상위 절반(비금융) — 점수: 3년 평균 ROIC·매출총이익/자산·주식 수 감소·순자사주 매입·상승여력(배당 무관)",
      ok: (s) => s.rank <= 120 && s.ttmEbit > 0 && (s.fin || (s.ebitM >= 0.10 && s.roa >= 5)), gate: (base) => coreGate(base),
      ex: ["trend"], w: { roic3: 0.25, gpa: 0.2, iss: 0.2, buyy: 0.2, upside: 0.15 } },
    growth: { label: "시총 상위 300 · 금융·원자재(금·광업·석유 탐사) 제외 · 최근 분기 매출 YoY ≥ 15%(또는 최근 연도) · TTM EBIT 흑자 · 순이익 흑자 · 자산 급증·이익 변동 상위 10% 제외 — 점수: 성장 지속성(3년 매출 연평균·FCF 마진·매출총이익/자산·순현금)·3년 평균 ROIC·주식 수 감소·상승여력(1년 성장 크기·배당은 뺌)",
      ok: (s) => s.rank <= 300 && !s.fin && !s.cycl && Math.max(g0(s.qRevYoY), g0(s.revG)) >= 0.15 && s.ttmEbit > 0,
      ex: ["loss", "agTop", "sroaTop", "trend"], w: { sg3: 0.15, fcfm: 0.15, gpa: 0.15, netcash: 0.15, roic3: 0.15, iss: 0.1, upside: 0.15 } },
    value: { label: "시총 상위 400 · EBIT/EV 또는 FCF/시총 상위 30%(금융은 PER ≤ 16 또는 PBR ≤ 2) · TTM 순이익 흑자 · 매출 또는 EBIT 증가 · 매출 역성장·희석 5% 초과·자산 급증 상위 10% 제외 — 점수: 이익 안정성(영업이익률·ROA 변동 작음)·이익의 현금 전환·순자사주 매입·주식 수 감소·상승여력",
      ok: (s) => s.rank <= 400 && s.ttmNi > 0 && (g0(s.qRevYoY) > 0 || g0(s.ebitYoY) > 0), gate: (base, pool) => valueGate(pool, 400, 16, 2),
      ex: ["agTop", "dil", "revDown", "trend"], w: { sopm: 0.17, sroa: 0.17, fcfni: 0.17, buyy: 0.17, iss: 0.17, upside: 0.15 } },
    dividend: { label: "배당수익률 ≥ 2.5% · 배당성향 ≤ 100% · TTM 순이익 흑자 · 시총 상위 450 · 합자회사(MLP) 제외 · 매출 역성장·희석 5% 초과·자산 급증 상위 10% 제외 — 점수: 이익 안정성·배당 연속 비감소·주식 수 감소·주주환원·상승여력",
      ok: (s) => s.rank <= 450 && !s.lp && s.divY >= 2.5 && s.ttmNi > 0 && (s.payout == null || s.payout <= 1.0),
      ex: ["agTop", "dil", "payout", "revDown", "trend"], w: { sroa: 0.2, streak: 0.2, iss: 0.15, shy: 0.15, upside: 0.3 } },
    // rising(히든)은 scripts/screen-hidden.js (SEC XBRL·나스닥 EPS 컨센서스)
  },
};
// 점수용 파생값(높을수록 좋게) — 주제 기준 연구에서 검증된 지표만
function feat(s) {
  const x = s.fx || {};
  return {
    iss: x.ISS != null ? -x.ISS : null, shy: x.SHY != null ? x.SHY : null, cov: x.COV != null ? x.COV : null, roic: x.ROIC != null ? x.ROIC : null,
    sroa: x.SROA != null ? -x.SROA : null, streak: x.DSTREAK != null ? x.DSTREAK : null, upside: s.upside,
    roic3: x.ROIC3 != null ? x.ROIC3 : null, gpa: x.GPA != null ? x.GPA : null, buyy: x.BUYY != null ? x.BUYY : null, sg3: x.SG3 != null ? x.SG3 : null,
    fcfm: x.FCFM != null ? x.FCFM : null, netcash: x.NETCASH != null ? x.NETCASH : null, sopm: x.SOPM != null ? -x.SOPM : null, fcfni: x.FCFNI != null ? x.FCFNI : null,
  };
}
// 건전성 필터 적용: 상위 10% 필터는 그 주제 적격 후보 안의 분포로 문턱을 정한다
function exFilter(rule, elig) {
  const cut = {};
  (rule.ex || []).forEach((k) => {
    const e = EX[k]; if (!e.dec) return;
    const xs = elig.map((s) => s.fx && s.fx[e.dec]).filter((v) => v != null && isFinite(v)).sort((a, b) => a - b);
    cut[k] = xs.length >= 10 ? xs[Math.floor(xs.length * 0.9)] : null;
  });
  return (s) => (rule.ex || []).filter((k) => { const e = EX[k]; return e.dec ? cut[k] != null && s.fx && s.fx[e.dec] != null && s.fx[e.dec] >= cut[k] : e.f(s); }).map((k) => EX[k].label);
}
function pctRank(vals) {
  const xs = vals.filter((v) => v != null && isFinite(v)).sort((a, b) => a - b);
  return (v) => { if (v == null || !isFinite(v) || !xs.length) return 0.5; let lo = 0; while (lo < xs.length && xs[lo] < v) lo++; return xs.length === 1 ? 1 : lo / (xs.length - 1); };
}
const r1 = (v, d = 1) => (v == null || !isFinite(v) ? null : Math.round(v * Math.pow(10, d)) / Math.pow(10, d));
function view(s, score) {
  const pct = (v) => (v == null || !isFinite(v) ? null : r1(v * 100));
  return { ticker: s.ticker, code: s.code, name: s.name, market: s.market, rank: s.rank, score: r1(score, 3),
    price: s.price, mcap: s.mcap, upside: pct(s.upside), tp: s.tp, tpDate: s.tpDate, recomm: s.recomm,
    revG: pct(s.revG), revE: pct(s.revE), qRevYoY: pct(s.qRevYoY), opG: pct(s.opG), opE: pct(s.opE), qOpYoY: pct(s.qOpYoY), ebitYoY: pct(s.ebitYoY),
    roe: r1(s.roe), opm: r1(s.opm), roa: r1(s.roa), ebitM: pct(s.ebitM), debt: r1(s.debt, 0), per: r1(s.per), cnsPer: r1(s.cnsPer), pbr: r1(s.pbr),
    divY: r1(s.divY, 2), payout: pct(s.payout), fin: s.fin || undefined, industry: s.industry || undefined, tpSingle: s.tpSingle || undefined,
    fx: s.fx ? { year: s.fxYear, iss: pct(s.fx.ISS), shy: pct(s.fx.SHY), cov: r1(s.fx.COV, 2), roic: pct(s.fx.ROIC), sroa: pct(s.fx.SROA), streak: s.fx.DSTREAK,
      ag: pct(s.fx.AG), sg1: pct(s.fx.SG1), payoutFy: pct(s.fx.PAYOUT), niPos: s.fx.niPos,
      roic3: pct(s.fx.ROIC3), gpa: pct(s.fx.GPA), buyy: pct(s.fx.BUYY), sg3: pct(s.fx.SG3), fcfm: pct(s.fx.FCFM), netcash: pct(s.fx.NETCASH), sopm: pct(s.fx.SOPM), fcfni: r1(s.fx.FCFNI, 2),
      ebitev: pct(s.fx.EBITEV), fcfp: pct(s.fx.FCFP) } : undefined };
}

(async () => {
  const t0 = Date.now();
  const krPages = LIMIT ? 1 : null;
  let kr = (await rankKR("KOSPI", krPages || 5)).slice(0, LIMIT || 250).concat((await rankKR("KOSDAQ", krPages || 2)).slice(0, LIMIT || 150));
  let us = (await rankUS("NASDAQ", LIMIT ? 1 : 3)).slice(0, LIMIT || 250).concat((await rankUS("NYSE", LIMIT ? 1 : 4)).slice(0, LIMIT || 350));
  // 현 편성 종목은 순위 밖이어도 비교용으로 반드시 포함
  const roster = {};
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => { (roster[c + ":" + s.ticker] = roster[c + ":" + s.ticker] || []).push(s); }));
  const have = new Set(kr.map((s) => "korea:" + s.ticker).concat(us.map((s) => "us:" + s.ticker)));
  Object.keys(roster).forEach((k) => {
    if (have.has(k)) return;
    const [c, t] = k.split(":"); const s0 = roster[k][0];
    if (c === "korea") kr.push({ c, code: t, ticker: t, name: s0.name, market: s0.market, price: null, mcap: null, extra: true });
    else { const m = String(s0.chartUrl || "").match(/\/worldstock\/stock\/([^/]+)\//); if (m) us.push({ c, code: m[1], ticker: t, name: s0.name, market: s0.market, price: null, mcap: null, extra: true }); }
  });
  // 시총 순위(국가 내, 받은 순위 목록 기준)
  [kr, us].forEach((arr) => { arr.filter((s) => !s.extra).sort((a, b) => (b.mcap || 0) - (a.mcap || 0)).forEach((s, i) => { s.rank = i + 1; }); });
  console.log("유니버스: 한국 " + kr.length + " · 미국 " + us.length + " (편성 보충 포함)");

  const done = { korea: 0, us: 0 }, fail = [];
  const enr = await mapLimit(kr.concat(us), 10, async (s) => {
    const r = s.c === "korea" ? await enrichKR(s) : await enrichUS(s);
    if (!r) fail.push(s.c + ":" + s.ticker); else done[s.c]++;
    if ((done.korea + done.us) % 100 === 0) console.log("  … " + (done.korea + done.us) + "종목 (" + Math.round((Date.now() - t0) / 1000) + "초)");
    return r;
  });
  const all = enr.filter(Boolean);
  // 편성 보충 종목은 price 가 없을 수 있다 — 통합 시세로 채운 값 사용(한국), 미국은 순위 밖이면 순위 null
  console.log("지표 수집: 한국 " + done.korea + " · 미국 " + done.us + " · 실패 " + fail.length + (useCurl ? " (curl)" : ""));

  // 주제 기준 팩터(검증된 점수·필터 지표) — 한국 기업현황·미국 SEC/야후
  const { addKrFactors, addUsFactors } = require("./screen-factors");
  await addKrFactors(all.filter((s) => s.c === "korea"), console.log);
  await addUsFactors(all.filter((s) => s.c === "us"), console.log);

  const groups = {};
  ["korea", "us"].forEach((c) => {
    const pool = all.filter((s) => s.c === c);
    Object.keys(RULES[c]).forEach((th) => {
      const rule = RULES[c][th];
      const key = c + "|" + th;
      const members = (D[c] || []).filter((s) => s.theme === th);
      const inGroup = new Set(members.map((s) => s.ticker));
      const base0 = pool.filter((s) => !s.extra && rule.ok(s));
      const gate = rule.gate ? rule.gate(base0, pool) : () => true;
      const okAll = (s) => rule.ok(s) && gate(s);
      const base = base0.filter(gate);
      const whyEx = exFilter(rule, base);
      const elig = base.filter((s) => !whyEx(s).length);
      // 백분위는 '적격 후보 + 현 편성'을 한 모집단으로 — 편성 종목도 같은 잣대로 나란히 본다
      const memRows = pool.filter((s) => inGroup.has(s.ticker));
      const popn = elig.concat(memRows.filter((s) => !elig.includes(s)));
      const F = new Map(popn.map((s) => [s, feat(s)]));
      const pr = {}; Object.keys(rule.w).forEach((k) => { pr[k] = pctRank(popn.map((s) => F.get(s)[k])); });
      // 이익 안정성(5년 ROA 변동)은 금융·비금융을 따로 순위 매긴다 — 은행은 ROA 수준 자체가 1% 안팎이라 변동이 작게 재져 업종 간 비교가 안 된다
      const prFin = {}, prNon = {};
      ["sroa"].filter((k) => k in rule.w).forEach((k) => { prFin[k] = pctRank(popn.filter((s) => s.fin).map((s) => F.get(s)[k])); prNon[k] = pctRank(popn.filter((s) => !s.fin).map((s) => F.get(s)[k])); });
      const rk = (k, s) => (k in prFin ? (s.fin ? prFin[k] : prNon[k])(F.get(s)[k]) : pr[k](F.get(s)[k]));
      const score = (s) => Object.keys(rule.w).reduce((acc, k) => acc + rule.w[k] * rk(k, s), 0);
      const otherTheme = (t) => (roster[c + ":" + t] || []).map((x) => x.theme).filter((x) => x !== th);
      // 이미 정식 편성(어느 주제든)에 있는 종목·같은 회사(다른 주식 종류)는 '새 종목'이 아니라 뺀다.
      // 관심·보유(개인 목록) 종목은 후보로 남기되 alsoIn 으로 표시한다. 후보끼리도 같은 회사는 한 번만.
      const formalRows = (D[c] || []).filter((m) => !/^(watch|hold)$/.test(m.theme));
      const formalT = new Set(formalRows.map((m) => m.ticker));
      const groupCos = new Set(formalRows.map((m) => coKey(m.name)).concat(pool.filter((s) => formalT.has(s.ticker)).map((s) => coKey(s.name))));
      const seenCo = new Set();
      const cands = elig.filter((s) => !formalT.has(s.ticker) && !groupCos.has(coKey(s.name)))
        .map((s) => ({ s, sc: score(s) })).sort((a, b) => b.sc - a.sc)
        .filter(({ s }) => (seenCo.has(coKey(s.name)) ? false : seenCo.add(coKey(s.name)))).slice(0, TOP_N)
        .map(({ s, sc }) => Object.assign(view(s, sc), otherTheme(s.ticker).length ? { alsoIn: otherTheme(s.ticker) } : {}));
      const inc = members.map((m) => {
        const row = pool.find((s) => s.ticker === m.ticker);
        const v = row ? view(row, score(row)) : { ticker: m.ticker, name: m.name, score: null };
        // 편성 종목의 추세 붕괴는 엔진 세 신호(stock-ta.js)로 판정한다(CLAUDE.md §6) — 월봉 근사는 신호가 없는 후보용이라 여기선 뺀다
        const fails = row ? (okAll(row) ? [] : [rule.ok(row) ? "정체성 조건 미달(" + (th === "core" ? "3년 평균 ROIC 상위 절반" : "EBIT/EV·FCF 수익률 상위 30%") + ")" : "정체성 조건 미달"]).concat(whyEx(row).filter((w0) => w0 !== EX.trend.label)) : null;
        return Object.assign(v, { tier: m.tier, passesRule: row ? !fails.length : null }, fails && fails.length ? { fails } : {});
      }).sort((a, b) => (a.score == null) - (b.score == null) || (a.score - b.score));
      groups[key] = { rule: rule.label, weights: rule.w, eligible: elig.length, filtered: base.length - elig.length, incumbents: inc, candidates: cands };
    });
  });

  // 히든 두 그룹 — 별도 스크린(유니버스·지표가 다르다). 실패하면(또는 --skip-hidden) 이전 파일의 히든 그룹을 그대로 둔다.
  try {
    if (process.argv.includes("--skip-hidden")) throw new Error("--skip-hidden");
    Object.assign(groups, await require("./screen-hidden").hiddenGroups(D, { log: (m) => console.log("  [히든] " + m) }));
  } catch (e) {
    if (!(e && e.message === "--skip-hidden")) console.error("히든 스크린 실패 — 이전 히든 그룹 유지:", e && e.message);
    try { global.window = {}; delete require.cache[require.resolve(OUT)]; require(OUT); const old = (global.window.DISCOVERY_CANDIDATES || {}).groups || {};
      const skip = e && e.message === "--skip-hidden";
      ["korea|rising", "us|rising"].forEach((k) => { if (old[k]) groups[k] = skip ? old[k] : Object.assign({ stale: true }, old[k]); }); } catch (_e) { /* 없음 */ }
  }

  const outObj = { asOf: today, builtAt: new Date().toISOString(), source: "네이버 증권 시가총액 순위·재무(연간·분기)·컨센서스 — scripts/screen-discovery.js",
    universe: { korea: kr.length, us: us.length, failed: fail.length }, note: "후보 생성용 스크린 — 편입·교체 판단은 세션 검증과 CLAUDE.md §5 기준으로만", groups };
  fs.writeFileSync(OUT,
    "// 주간 심층 발굴 후보 — scripts/screen-discovery.js 가 생성(LLM 토큰 0). 앱은 로드하지 않는다(sw.js SHELL 에 넣지 말 것).\n" +
    "// groups[\"<country>|<theme>\"] = {rule 하드 조건, weights 점수 가중, eligible 적격 수, incumbents 현 편성(점수 낮은 순·같은 잣대), candidates 상위 후보}\n" +
    "// 수치 단위: 성장률·upside·마진·배당성향 %, ROE·ROA·opm %, debt 부채비율 %, per·pbr 배, divY %. 시세·재무는 생성 시점 네이버 값.\n" +
    "window.DISCOVERY_CANDIDATES = " + JSON.stringify(outObj, null, 1) + ";\n");
  console.log("discovery-candidates.js 기록 — " + Object.keys(groups).map((k) => k + " 적격 " + groups[k].eligible).join(" · ") +
    " (" + Math.round((Date.now() - t0) / 1000) + "초)");
})().catch((e) => { console.error("screen-discovery 실패:", e && e.message); process.exit(1); });
