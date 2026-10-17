#!/usr/bin/env node
// 히든(rising) 후보 스크린 — '10배 가능성은 크고 영구 손실 위험은 낮은 회사' (2026-10-17 사용자 정의, LLM 토큰 0)
//
// 정의(CLAUDE.md §6 히든 기준과 같은 내용):
//   상방(10배 가능성) — ①작은 출발점: 시총 수천억~수조 원 ②긴 성장 활주로: 매출 연 20% 이상 성장 ③ROIC 15% 이상 지속(번 돈을
//     높은 수익률로 재투자) ④이중 엔진: 출발 밸류가 합리적(PEG ≤ 1.5 — 이익 성장 + 재평가)
//   하방(비교적 안전) — ⑤순현금 또는 낮은 부채 + 잉여현금흐름(FCF) 흑자 ⑥이미 이익을 내는 회사 ⑦해자 ⑧주주와 같은 배를 탄
//     경영진(창업자·내부자 지분, 희석 자제) ⑨단일 고객·제품·규제 집중 없음
//   ⑦⑧⑨와 성장 활주로(시장 규모·침투율)는 숫자로 잴 수 없어 세션이 웹 검색으로 검증한다 — 이 스크립트는 ①~⑥과 희석만 거른다.
//
// 데이터(전부 공개 페이지·API, 키 불필요):
//   한국 — 네이버 시가총액 순위(유니버스) + 네이버 기업현황(WiseReport) 연간 요약(매출·영업이익·순이익·자본·이자발생부채·
//          영업현금흐름·CAPEX·FCF·EPS·발행주식수, 5년 실적 + 3년 컨센서스)·재무상태표(현금·단기금융자산)·최대주주 지분율·WICS 업종
//   미국 — 나스닥 전 종목 스크리너(유니버스·시총·업종) + SEC XBRL frames(전 상장사 연간 매출·영업이익·순이익·영업현금흐름·CAPEX·
//          희석 주식 수, 연말 현금·단기투자·차입금·자본) + SEC 검색(티커→CIK) + 나스닥 연간 EPS 컨센서스(PEG)
//
// ★ 후보 생성용이다(CLAUDE.md §6 — 편입·교체는 세션 검증과 §5 기준으로만). 숫자는 집계·자동 추출이라 틀릴 수 있다.
//
// 사용법: node scripts/screen-hidden.js              # 두 나라 스크린 → data/discovery-candidates.js 의 korea|rising·us|rising 교체
//         node scripts/screen-hidden.js --only korea # 한 나라만(나머지 그룹은 그대로)
//         node scripts/screen-hidden.js --dry        # 파일을 쓰지 않고 결과만 출력
//   screen-discovery.js 가 주 1회 실행 때 이 모듈의 hiddenGroups() 를 불러 히든 두 그룹을 채운다.
"use strict";
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "discovery-candidates.js");
const TOP_N = 15;

// ── 기준(숫자) — 바꾸면 CLAUDE.md §6·docs/HISTORY.md 도 함께 ──
const C = {
  krMcap: [3000e8, 8e12],        // 한국 시총 3,000억~8조 원
  usMcap: [0.5e9, 15e9],         // 미국 시총 5억~150억 달러(≈ 7천억~21조 원 — 하한은 애널리스트 커버리지·유동성 때문에 한국보다 높게,
                                 //   상한은 2026-10-17 사용자 결정으로 60억→150억: 숫자 조건을 다 채운 미국 회사가 극소수)
  growth: 0.20,                  // 매출 성장 기준(연평균)
  growthFloor: 0.10,             // 다른 쪽 성장률의 바닥
  roicAvg: 0.15,                 // 최근 3년 평균 ROIC
  roicLast: 0.12,                // 최근 연도 ROIC 바닥
  peg: 1.5,
  dilution: 0.03,                // 주식 수 연평균 증가 상한(2년)
  tax: 0.22,                     // NOPAT 세율(한국 법인세+지방세 근사, 미국 연방+주 근사 23% 와 비슷해 공통값)
  histFloor: 0.05,               // 향후 성장이 20%+ 일 때 최근 3년 연평균의 바닥(사이클 반등만으로 통과하지 않게)
};
// '근접 후보' — 안전 조건(이익·FCF·부채·업종)은 그대로, 상방 조건(시총 상한·성장·ROIC·PEG·희석) 중 딱 하나만 이 완화선 안에서 못 미친 종목.
//   모든 조건을 갖춘 후보는 드물어서(2026-10-17 첫 실행: 한국 14·미국 5) 빈자리를 채울 때 무엇이 모자란지 밝히고 쓴다.
const RELAX = Object.assign({}, C, { krMcap: [3000e8, 12e12], usMcap: [0.5e9, 22.5e9], growth: 0.15, growthFloor: 0.05, histFloor: 0,
  roicAvg: 0.12, roicLast: 0.10, peg: 2.0, dilution: 0.05 });
const RULE_LABEL = {
  korea: "시총 3천억~8조 원 · 금융·부동산·지주·원자재 제외 · 영업이익 3년 연속·순이익 흑자 · FCF 최근 연도·3년 합 흑자 · 순현금 또는 순차입금 ≤ 영업현금흐름 1년치 · 매출 성장(최근 3년 연평균·향후 2년 컨센서스 연평균 중 하나 ≥ 20%, 다른 쪽 ≥ 10%) · ROIC 3년 평균 ≥ 15%(최근 연도 ≥ 12%) · PEG ≤ 1.5 · 주식 수 증가 연 3% 이하",
  us: "시총 5억~150억 달러 · 금융·부동산·원자재·SPAC 제외 · 영업이익 3년 연속·순이익 흑자 · FCF 최근 연도·3년 합 흑자 · 순현금 또는 순차입금 ≤ 영업현금흐름 1년치 · 매출 성장(최근 3년 연평균·최근 연도 중 하나 ≥ 20%, 다른 쪽 ≥ 10%) · ROIC 3년 평균 ≥ 15%(최근 연도 ≥ 12%) · PEG ≤ 1.5(나스닥 EPS 컨센서스) · 희석 주식 수 증가 연 3% 이하",
};
const WEIGHTS = {
  korea: { growth: 0.25, roic: 0.25, pegInv: 0.2, fcfM: 0.1, cashM: 0.05, small: 0.1, owner: 0.05 },
  us: { growth: 0.25, roic: 0.25, pegInv: 0.2, fcfM: 0.1, cashM: 0.1, small: 0.1 },
};

// ── 네트워크(curl — 세션 프록시·Action 모두에서 동작) ──
const MOBILE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const DESKTOP = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const SEC_UA = "Mozilla/5.0 (compatible; stock-dashboard-screen/1.0)";
function curl(url, ua, extra) {
  return new Promise((resolve) => {
    const args = ["-s", "--max-time", "40", "--compressed", "-A", ua || MOBILE].concat(extra || []).concat([url]);
    execFile("curl", args, { maxBuffer: 64 * 1024 * 1024 }, (err, out) => resolve(err ? null : out));
  });
}
async function getText(url, ua, extra) {
  for (let i = 0; i < 3; i++) {
    const t = await curl(url, ua, extra);
    if (t && t.length > 20) return t;
    await new Promise((r) => setTimeout(r, 500 * (i + 1)));
  }
  return null;
}
async function getJson(url, ua, extra) {
  const t = await getText(url, ua, extra);
  if (!t) return null;
  try { return JSON.parse(t.replace(/^﻿/, "")); } catch (_e) { return null; }
}
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}
const num = (v) => { if (v == null) return null; const n = parseFloat(String(v).replace(/[,%$배원]/g, "").trim()); return isFinite(n) ? n : null; };
const cagr = (a, b, yrs) => (a != null && b != null && a > 0 && b > 0 && yrs > 0 ? Math.pow(b / a, 1 / yrs) - 1 : null);
const r1 = (v, d = 1) => (v == null || !isFinite(v) ? null : Math.round(v * Math.pow(10, d)) / Math.pow(10, d));
const pct = (v) => (v == null || !isFinite(v) ? null : r1(v * 100));
const avg = (a) => { const x = a.filter((v) => v != null && isFinite(v)); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };

// ════════════════════════════ 한국 ════════════════════════════
const KR_FIN_NAME = /(금융|은행|보험|증권|화재|생명|카드|캐피탈|투자|리츠|REIT|홀딩스|지주|스팩|SPAC)/i;
const KR_EX_WICS = /(은행|증권|보험|다각화된금융|기타금융|부동산|철강|비철금속|석유와가스|해운사|복합기업|창업투자)/;
async function rankKR(market, pages) {
  const out = [];
  for (let p = 1; p <= pages; p++) {
    const j = await getJson("https://m.stock.naver.com/api/stocks/marketValue/" + market + "?page=" + p + "&pageSize=100");
    (j && j.stocks || []).forEach((s) => out.push(s));
  }
  return out.filter((s) => s.stockEndType === "stock" && /0$/.test(s.itemCode))
    .map((s) => ({ c: "korea", ticker: s.itemCode, name: s.stockName, market, price: num(s.closePriceRaw), mcap: num(s.marketValueRaw) }));
}
// 기업현황 표(HTML) → {cols:[{title,est}], rows:{제목:[값…]}}
function parseWiseTable(html) {
  const trs = html.match(/<tr[\s\S]*?<\/tr>/g) || [];
  let cols = null; const rows = {};
  for (const tr of trs) {
    const cells = (tr.match(/<t[hd][\s\S]*?<\/t[hd]>/g) || []).map((c) => c.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim());
    if (!cells.length) continue;
    if (!cols && cells.filter((c) => /^\d{4}\/\d{2}/.test(c)).length >= 3) {
      cols = cells.filter((c) => /^\d{4}\/\d{2}/.test(c)).map((c) => ({ title: c.slice(0, 7), est: /\(E\)/.test(c) }));
      continue;
    }
    if (cols && cells.length === cols.length + 1 && !rows[cells[0]]) rows[cells[0]] = cells.slice(1).map(num);
  }
  return cols ? { cols, rows } : null;
}
function krSeries(T, names) {
  for (const n of names) if (T.rows[n]) return T.rows[n];
  return T.cols.map(() => null);
}
async function enrichKR(s) {
  const page = await getText("https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=" + s.ticker, DESKTOP);
  if (!page) return Object.assign(s, { err: "기업현황 없음" });
  const enc = (page.match(/encparam\s*[:=]\s*['"]([^'"]+)/) || [])[1];
  const wics = ((page.match(/WICS\s*:\s*([^&<]+)/) || [])[1] || "").trim();
  const txt = page.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  const own = num((txt.match(/최대주주등\s+\d+\s+[\d,]+\s+([\d.]+)/) || [])[1]);
  const beta = num((txt.match(/52주베타\s+([\d.-]+)/) || [])[1]);
  if (!enc) return Object.assign(s, { wics, err: "encparam 없음" });
  const ref = ["-e", "https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=" + s.ticker];
  const sum = await getText("https://navercomp.wisereport.co.kr/v2/company/ajax/cF1001.aspx?cmp_cd=" + s.ticker + "&fin_typ=0&freq_typ=Y&encparam=" + enc + "&id=", DESKTOP, ref);
  const T = sum && parseWiseTable(sum.slice(sum.indexOf("주요재무정보") >= 0 ? sum.indexOf("주요재무정보") : 0));
  if (!T) return Object.assign(s, { wics, own, beta, err: "재무 요약 없음" });
  const A = T.cols.map((c, i) => (c.est ? -1 : i)).filter((i) => i >= 0);   // 실적 열 인덱스
  const E = T.cols.map((c, i) => (c.est ? i : -1)).filter((i) => i >= 0);   // 추정 열 인덱스
  const g = (names) => krSeries(T, names);
  const rev = g(["매출액"]), op = g(["영업이익", "영업이익(발표기준)"]), opE = g(["영업이익(발표기준)", "영업이익"]);
  const np = g(["당기순이익(지배)", "당기순이익"]), eq = g(["자본총계"]), ibd = g(["이자발생부채"]);
  const ocf = g(["영업활동현금흐름"]), capex = g(["CAPEX"]), fcf = g(["FCF"]), eps = g(["EPS(원)"]), sh = g(["발행주식수(보통주)"]);
  const dps = g(["현금DPS(원)"]);
  const a = (arr, k) => (A.length >= k ? arr[A[A.length - k]] : null);          // 실적 최근 k번째(1=최근)
  const e = (arr, k) => (E.length >= k ? arr[E[k - 1]] : null);                // 추정 k번째(1=올해)
  return Object.assign(s, {
    wics, own, beta, enc, years: A.map((i) => T.cols[i].title), estYears: E.map((i) => T.cols[i].title),
    rev: A.map((i) => rev[i]), op: A.map((i) => op[i]), np: A.map((i) => np[i]), eq: A.map((i) => eq[i]), ibd: A.map((i) => ibd[i]),
    ocf: A.map((i) => ocf[i]), capex: A.map((i) => capex[i]), fcf: A.map((i) => fcf[i]), eps: A.map((i) => eps[i]), sh: A.map((i) => sh[i]),
    dps: a(dps, 1),
    revE: E.map((i) => rev[i]), opE: E.map((i) => opE[i]), epsE: E.map((i) => eps[i]),
    _a: a, _e: e,
  });
}
// 재무상태표(연간) — 현금및현금성자산 + 단기금융자산(억 원)
async function cashKR(s) {
  if (!s.enc) return;
  const j = await getJson("https://navercomp.wisereport.co.kr/v2/company/cF3002.aspx?cmp_cd=" + s.ticker + "&frq=0&rpt=1&finGubun=MAIN&frqTyp=0&cn=&encparam=" + s.enc, DESKTOP,
    ["-e", "https://navercomp.wisereport.co.kr/v2/company/c1030001.aspx?cmp_cd=" + s.ticker]);
  if (!j || !Array.isArray(j.DATA) || !Array.isArray(j.YYMM)) return;
  const yy = j.YYMM.map((x) => String(x).slice(0, 7));
  const pick = (re) => { const r = j.DATA.find((d) => re.test(String(d.ACC_NM || "").replace(/\./g, ""))); return r ? yy.map((_, i) => num(r["DATA" + (i + 1)])) : null; };
  const cash = pick(/^현금및현금성자산$/), sti = pick(/^단기금융자산$/);
  s.cashBy = {};
  yy.forEach((y, i) => { if (!/\(E\)/.test(j.YYMM[i])) s.cashBy[y] = (cash && cash[i] || 0) + (sti && sti[i] || 0); });
}
function metricsKR(s) {
  const n = s.rev ? s.rev.length : 0;
  const L = (arr, k) => (arr && arr.length >= k ? arr[arr.length - k] : null);
  const m = { mcap: s.mcap, price: s.price };
  if (!n) return m;
  m.revLast = L(s.rev, 1);
  m.g3 = cagr(L(s.rev, 4), L(s.rev, 1), 3);
  m.gLast = L(s.rev, 2) > 0 && L(s.rev, 1) != null ? L(s.rev, 1) / L(s.rev, 2) - 1 : null;
  const re2 = s.revE && s.revE[1] != null ? s.revE[1] : null;               // 추정 2년차(예: 2027E)
  m.gFwd = re2 != null ? cagr(L(s.rev, 1), re2, 2) : null;
  m.op3 = [L(s.op, 3), L(s.op, 2), L(s.op, 1)];
  m.opPos3 = m.op3.every((v) => v != null && v > 0);
  m.npPos = L(s.np, 1) != null && L(s.np, 1) > 0;
  m.fcfLast = L(s.fcf, 1); m.fcf3 = [L(s.fcf, 3), L(s.fcf, 2), L(s.fcf, 1)].reduce((acc, v) => (v == null || acc == null ? null : acc + v), 0);
  m.fcfM = m.fcfLast != null && m.revLast > 0 ? m.fcfLast / m.revLast : null;
  m.ocfLast = L(s.ocf, 1);
  // 희석: 발행주식 수 2년 변화(무상증자·액면분할로 1.8배 이상 뛰면 희석이 아닌 것으로 보고 표시만)
  const sh0 = L(s.sh, 3), sh1 = L(s.sh, 1);
  const shr = sh0 > 0 && sh1 > 0 ? sh1 / sh0 : null;
  m.split = shr != null && shr >= 1.8;
  m.dil = shr != null && !m.split ? Math.pow(shr, 1 / 2) - 1 : null;
  m.owner = s.own;
  m.wics = s.wics; m.beta = s.beta;
  // ROIC = 영업이익×(1−세율) / (자본총계 + 이자발생부채 − 현금 − 단기금융자산), 연말 기준. 투하자본이 0 이하(현금 > 자본+부채)면 100%로 둔다.
  const roic = [];
  for (let k = 3; k >= 1; k--) {
    const y = L(s.years, k), opv = L(s.op, k), eqv = L(s.eq, k), d = L(s.ibd, k) || 0;
    if (opv == null || eqv == null) { roic.push(null); continue; }
    const cash = s.cashBy && s.cashBy[y] != null ? s.cashBy[y] : null;
    const ic = eqv + d - (cash || 0);
    roic.push(ic > 0 ? Math.min(1, opv * (1 - C.tax) / ic) : 1);
    if (cash == null) m.roicNoCash = true;
  }
  m.roic3 = roic; m.roicAvg = avg(roic); m.roicLast = roic[2];
  const yLast = L(s.years, 1);
  const cashLast = s.cashBy && s.cashBy[yLast] != null ? s.cashBy[yLast] : null;
  m.netCash = cashLast != null ? cashLast - (L(s.ibd, 1) || 0) : null;           // 억 원
  m.cashM = m.netCash != null && s.mcap > 0 ? m.netCash * 1e8 / s.mcap : null;
  // PEG = 선행 PER(현재가 / 올해 추정 EPS) ÷ EPS 성장률(올해→2년 뒤 추정 연평균, 없으면 1년, 추정이 없으면 최근 3년 실적 연평균과 후행 PER)
  const e1 = s.epsE && s.epsE[0], e2 = s.epsE && s.epsE[1], e3 = s.epsE && s.epsE[2];
  if (e1 > 0 && s.price > 0) {
    m.per = s.price / e1;
    m.epsG = e3 > 0 ? cagr(e1, e3, 2) : e2 > 0 ? e2 / e1 - 1 : null;
    m.pegBasis = e3 > 0 ? "추정 2년" : "추정 1년";
  } else if (L(s.eps, 1) > 0 && s.price > 0) {
    m.per = s.price / L(s.eps, 1);
    m.epsG = cagr(L(s.eps, 4), L(s.eps, 1), 3);
    m.pegBasis = "실적 3년(추정 없음)";
  }
  m.peg = m.per != null && m.epsG > 0 ? m.per / (m.epsG * 100) : null;
  m.cover = (s.revE || []).some((v) => v != null);
  return m;
}
function judgeKR(s, m, T) {
  T = T || C;
  const why = [];
  if (!(s.mcap >= T.krMcap[0] && s.mcap <= T.krMcap[1])) why.push("시총 범위 밖");
  if (KR_FIN_NAME.test(s.name) || KR_EX_WICS.test(s.wics || "")) why.push("제외 업종(" + (s.wics || "금융·지주") + ")");
  if (!m.opPos3) why.push("영업이익 3년 연속 흑자 아님");
  if (!m.npPos) why.push("최근 연도 순이익 적자");
  if (!(m.fcfLast > 0 && m.fcf3 > 0)) why.push("FCF 적자");
  if (m.netCash != null ? m.netCash < 0 && -m.netCash > Math.max(m.ocfLast || 0, 0) : false) why.push("순차입금 > 영업현금흐름");
  const gOK = m.gFwd != null
    ? (m.gFwd >= T.growth && m.g3 != null && m.g3 >= T.histFloor) || (m.g3 >= T.growth && m.gFwd >= T.growthFloor)
    : (m.g3 >= T.growth && m.gLast >= T.growthFloor);
  if (!gOK) why.push("매출 성장 미달(3년 " + (pct(m.g3) ?? "–") + "%" + (m.gFwd != null ? "·향후 " + pct(m.gFwd) + "%" : "·최근 " + (pct(m.gLast) ?? "–") + "%") + ")");
  if (!(m.roicAvg >= T.roicAvg && m.roicLast >= T.roicLast)) why.push("ROIC 미달(3년 평균 " + (pct(m.roicAvg) ?? "–") + "%)");
  if (!(m.peg != null && m.peg <= T.peg)) why.push(m.peg == null ? "PEG 계산 불가(EPS 감소·적자)" : "PEG " + r1(m.peg, 2));
  if (m.dil != null && m.dil > T.dilution) why.push("주식 수 연 " + pct(m.dil) + "% 증가(희석)");
  return why;
}

// ════════════════════════════ 미국 ════════════════════════════
const US_EX_SECTOR = /^Finance$/;   // 나스닥 섹터 분류는 틀린 경우가 있어(Stride 가 Real Estate) 부동산은 업종명으로만 거른다
const US_EX_IND = /(Real Estate|REIT|Oil and Gas Field|Oil & Gas|Oilfield|Blank Check|Oil & Gas Production|Integrated oil|Precious Metals|Metal Mining|Mining & Quarrying|Coal Mining|Steel\/Iron Ore|Marine Transportation|Oil Refining|Natural Gas Distribution|Banks|Savings Institutions|Finance)/i;
const US_EX_NAME = /(Acquisition Corp|Warrant|Rights?\b|Units?\b|Preferred|Depositary Shares? Representing|ETF|Fund\b|Trust\b|Notes due|% Senior)/i;
async function universeUS() {
  const j = await getJson("https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=10000&offset=0&download=true", DESKTOP, ["-H", "Accept: application/json"]);
  const rows = (j && j.data && (j.data.rows || (j.data.table && j.data.table.rows))) || [];
  return rows.map((r) => ({ c: "us", ticker: r.symbol, name: String(r.name || "").replace(/\s+(Common Stock|Class A Common Stock|Class A Ordinary Shares|Ordinary Shares|American Depositary Shares)\b.*$/i, "").trim(),
    fullName: r.name, price: num(r.lastsale), mcap: num(r.marketCap), sector: r.sector, industry: r.industry, country: r.country }))
    .filter((s) => s.ticker && !/[\^/]/.test(s.ticker));
}
async function cikOf(sym) {
  const j = await getJson("https://efts.sec.gov/LATEST/search-index?keysTyped=" + encodeURIComponent(sym), SEC_UA);
  const hits = (j && j.hits && j.hits.hits) || [];
  const want = sym.toUpperCase().replace(".", "-");
  for (const h of hits) {
    const tk = String((h._source && h._source.tickers) || "").toUpperCase().split(/[,\s]+/).map((x) => x.replace(".", "-"));
    if (tk.includes(want)) return Number(h._id);
  }
  return null;
}
// SEC XBRL frames — 한 개념·한 기간의 전 상장사 값. 연간(CY20xx)은 회계연도가 그 해에 대부분 걸친 값, 순간(CY20xxQ4I)은 연말 무렵 잔액.
const FRAME = {};
async function frame(concept, period) {
  const k = concept + "|" + period;
  if (FRAME[k]) return FRAME[k];
  const j = await getJson("https://data.sec.gov/api/xbrl/frames/us-gaap/" + concept + "/USD/" + period + ".json", SEC_UA);
  const m = new Map();
  ((j && j.data) || []).forEach((d) => m.set(d.cik, d.val));
  FRAME[k] = m;
  return m;
}
async function frameShares(concept, period) {
  const k = concept + "|" + period;
  if (FRAME[k]) return FRAME[k];
  const j = await getJson("https://data.sec.gov/api/xbrl/frames/us-gaap/" + concept + "/shares/" + period + ".json", SEC_UA);
  const m = new Map();
  ((j && j.data) || []).forEach((d) => m.set(d.cik, d.val));
  FRAME[k] = m;
  return m;
}
// 설비투자·차입금은 회사마다 다른 XBRL 태그를 쓴다(AAON: 리볼버를 LongTermLineOfCredit, CAPEX 는 표준 태그 밖 — 2026-10-17 검증에서 FCF·순차입을 놓쳤다).
//   CAPEX 는 아래 중 처음 찾은 값(+ 자본화 소프트웨어). 하나도 없으면 FCF 를 '미확인'으로 두고 안전 조건에서 탈락시킨다(0 으로 보지 않는다).
//   차입금은 겹치는 표현(합계·유동+비유동·리스 포함)은 최댓값으로 하나만, 신용한도 차입·단기차입은 더한다 — 겹쳐 세면 보수적(안전 쪽)이다.
const CAPEX = ["PaymentsToAcquirePropertyPlantAndEquipment", "PaymentsToAcquireProductiveAssets", "PaymentsForCapitalImprovements",
  "PaymentsToAcquireOtherPropertyPlantAndEquipment", "PaymentsToAcquireMachineryAndEquipment"];
const DEBT = ["LongTermDebt", "LongTermDebtNoncurrent", "LongTermDebtCurrent", "DebtCurrent", "ShortTermBorrowings", "ConvertibleNotesPayable", "ConvertibleNotesPayableCurrent",
  "LongTermDebtAndCapitalLeaseObligations", "LongTermDebtAndCapitalLeaseObligationsCurrent", "LongTermNotesPayable", "NotesPayableCurrent", "SeniorNotes",
  "LongTermLineOfCredit", "LineOfCredit", "LinesOfCreditCurrent", "SecuredDebt", "UnsecuredDebt"];
const YRS = ["CY2022", "CY2023", "CY2024", "CY2025"];
const INST = ["CY2023Q4I", "CY2024Q4I", "CY2025Q4I", "CY2026Q2I"];
async function loadFrames() {
  const jobs = [];
  const REV = ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "RevenueFromContractWithCustomerIncludingAssessedTax", "SalesRevenueNet"];
  const DUR = ["OperatingIncomeLoss", "NetIncomeLoss", "NetCashProvidedByUsedInOperatingActivities"].concat(CAPEX, ["PaymentsToDevelopSoftware"]);
  const BAL = ["CashAndCashEquivalentsAtCarryingValue", "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents", "ShortTermInvestments", "MarketableSecuritiesCurrent",
    "AvailableForSaleSecuritiesDebtSecuritiesCurrent", "StockholdersEquity", "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest"].concat(DEBT);
  REV.concat(DUR).forEach((c) => YRS.forEach((y) => jobs.push(() => frame(c, y))));
  BAL.forEach((c) => INST.forEach((y) => jobs.push(() => frame(c, y))));
  ["CY2023", "CY2025"].forEach((y) => jobs.push(() => frameShares("WeightedAverageNumberOfDilutedSharesOutstanding", y)));
  await mapLimit(jobs, 4, (f) => f());
  return { REV, DUR, BAL };
}
function secVal(concept, period, cik) { const m = FRAME[concept + "|" + period]; return m ? (m.has(cik) ? m.get(cik) : null) : null; }
function metricsUS(s) {
  const cik = s.cik, m = { mcap: s.mcap, price: s.price };
  if (!cik) return m;
  // 매출: CY2025 값이 있는 개념 중 연도가 가장 많이 채워진 것 하나로 통일(개념이 섞여 생기는 가짜 성장 방지)
  const REV = ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "RevenueFromContractWithCustomerIncludingAssessedTax", "SalesRevenueNet"];
  let best = null;
  REV.forEach((c) => { const v = YRS.map((y) => secVal(c, y, cik)); const n = v.filter((x) => x != null).length; if (v[3] != null && (!best || n > best.n)) best = { c, v, n }; });
  const rev = best ? best.v : [null, null, null, null];
  const ser = (c) => YRS.map((y) => secVal(c, y, cik));
  const op = ser("OperatingIncomeLoss"), ni = ser("NetIncomeLoss"), ocf = ser("NetCashProvidedByUsedInOperatingActivities");
  const cxs = CAPEX.map(ser), sw = ser("PaymentsToDevelopSoftware");
  const capex = YRS.map((_, i) => { const v = cxs.map((a) => a[i]).find((x) => x != null); return v == null ? null : v + (sw[i] || 0); });
  m.capexMissing = capex.slice(1).some((v) => v == null);
  const fcf = ocf.map((v, i) => (v == null || capex[i] == null ? null : v - capex[i]));
  m.revLast = rev[3];
  m.g3 = cagr(rev[0], rev[3], 3);
  m.gLast = rev[2] > 0 && rev[3] != null ? rev[3] / rev[2] - 1 : null;
  m.op3 = op.slice(1); m.opPos3 = m.op3.every((v) => v != null && v > 0);
  m.npPos = ni[3] != null && ni[3] > 0;
  m.fcfLast = fcf[3]; m.fcf3 = fcf.slice(1).reduce((acc, v) => (v == null || acc == null ? null : acc + v), 0);
  m.fcfM = m.fcfLast != null && m.revLast > 0 ? m.fcfLast / m.revLast : null;
  m.ocfLast = ocf[3];
  // 잔액(연말 3개 + 최신 2026-06): 현금+단기투자, 차입금, 자본
  const bal = (y) => {
    const cash = secVal("CashAndCashEquivalentsAtCarryingValue", y, cik) ?? secVal("CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents", y, cik);
    const sti = secVal("ShortTermInvestments", y, cik) ?? secVal("MarketableSecuritiesCurrent", y, cik) ?? secVal("AvailableForSaleSecuritiesDebtSecuritiesCurrent", y, cik) ?? 0;
    const v = (c) => secVal(c, y, cik) || 0;
    const lt = Math.max(v("LongTermDebt"), v("LongTermDebtNoncurrent") + v("LongTermDebtCurrent"),
      v("LongTermDebtAndCapitalLeaseObligations") + v("LongTermDebtAndCapitalLeaseObligationsCurrent"), v("LongTermNotesPayable") + v("NotesPayableCurrent"),
      v("SeniorNotes"), v("ConvertibleNotesPayable") + v("ConvertibleNotesPayableCurrent"), v("SecuredDebt") + v("UnsecuredDebt"));
    const lines = Math.max(v("LongTermLineOfCredit"), v("LineOfCredit"), v("LinesOfCreditCurrent"));
    const st = v("ShortTermBorrowings") + (v("LongTermDebtCurrent") === 0 && v("LongTermDebt") === 0 ? v("DebtCurrent") : 0);
    const debt = lt + lines + st;
    const eq = secVal("StockholdersEquity", y, cik) ?? secVal("StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest", y, cik);
    return { cash, sti, debt, eq };
  };
  const B = INST.map(bal);
  const roic = [1, 2, 3].map((k) => {
    const b = B[k - 1], o = op[k];
    if (o == null || b.eq == null) return null;
    const ic = b.eq + b.debt - (b.cash || 0) - (b.sti || 0);
    return ic > 0 ? Math.min(1, o * (1 - C.tax) / ic) : 1;
  });
  m.roic3 = roic; m.roicAvg = avg(roic); m.roicLast = roic[2];
  const bl = B[3].eq != null || B[3].cash != null ? B[3] : B[2];
  m.netCash = bl.cash != null ? bl.cash + (bl.sti || 0) - bl.debt : null;
  m.cashM = m.netCash != null && s.mcap > 0 ? m.netCash / s.mcap : null;
  const d0 = secValShares("CY2023", cik), d1 = secValShares("CY2025", cik);
  const shr = d0 > 0 && d1 > 0 ? d1 / d0 : null;
  m.split = shr != null && (shr >= 1.8 || shr <= 0.55);
  m.dil = shr != null && !m.split ? Math.pow(shr, 1 / 2) - 1 : null;
  return m;
}
function secValShares(y, cik) { const mm = FRAME["WeightedAverageNumberOfDilutedSharesOutstanding|" + y]; return mm && mm.has(cik) ? mm.get(cik) : null; }
async function pegUS(s, m) {
  const j = await getJson("https://api.nasdaq.com/api/analyst/" + encodeURIComponent(s.ticker) + "/earnings-forecast", DESKTOP, ["-H", "Accept: application/json"]);
  const rows = (j && j.data && j.data.yearlyForecast && j.data.yearlyForecast.rows) || [];
  const e = rows.map((r) => ({ fy: r.fiscalEnd, eps: num(r.consensusEPSForecast), n: num(r.noOfEstimates) }));
  m.analysts = e[0] ? e[0].n : 0;
  const e1 = e[0] && e[0].eps, e2 = e[1] && e[1].eps, e3 = e[2] && e[2].eps;
  if (e1 > 0 && s.price > 0) {
    m.per = s.price / e1;
    m.epsG = e3 > 0 && e[2].n >= 2 ? cagr(e1, e3, 2) : e2 > 0 ? e2 / e1 - 1 : null;
    m.pegBasis = e3 > 0 && e[2].n >= 2 ? "추정 2년(" + e[0].fy + "→" + e[2].fy + ")" : "추정 1년(" + (e[0] && e[0].fy) + "→" + (e[1] && e[1].fy) + ")";
  }
  m.peg = m.per != null && m.epsG > 0 ? m.per / (m.epsG * 100) : null;
}
function judgeUS(s, m, pegDone, T) {
  T = T || C;
  const why = [];
  if (!(s.mcap >= T.usMcap[0] && s.mcap <= T.usMcap[1])) why.push("시총 범위 밖");
  if (US_EX_SECTOR.test(s.sector || "") || US_EX_IND.test(s.industry || "") || US_EX_NAME.test(s.fullName || "")) why.push("제외 업종(" + (s.industry || s.sector || "?") + ")");
  if (!s.cik) why.push("SEC 재무 없음(해외 공시 등)");
  if (!m.opPos3) why.push("영업이익 3년 연속 흑자 아님");
  if (!m.npPos) why.push("최근 연도 순이익 적자");
  if (m.capexMissing && !(m.fcfLast < 0)) why.push("FCF 미확인(CAPEX 태그 없음)");
  else if (!(m.fcfLast > 0 && m.fcf3 > 0)) why.push("FCF 적자");
  if (m.netCash != null && m.netCash < 0 && -m.netCash > Math.max(m.ocfLast || 0, 0)) why.push("순차입금 > 영업현금흐름");
  const gOK = (m.g3 >= T.growth && m.gLast >= T.growthFloor) || (m.gLast >= T.growth && m.g3 >= T.growthFloor);
  if (!gOK) why.push("매출 성장 미달(3년 " + (pct(m.g3) ?? "–") + "%·최근 " + (pct(m.gLast) ?? "–") + "%)");
  if (!(m.roicAvg >= T.roicAvg && m.roicLast >= T.roicLast)) why.push("ROIC 미달(3년 평균 " + (pct(m.roicAvg) ?? "–") + "%)");
  if (pegDone && !(m.peg != null && m.peg <= T.peg)) why.push(m.peg == null ? "PEG 계산 불가(EPS 추정 없음·감소)" : "PEG " + r1(m.peg, 2));
  if (m.dil != null && m.dil > T.dilution) why.push("희석 주식 수 연 " + pct(m.dil) + "% 증가");
  return why;
}

// ════════════════════════════ 점수·출력 ════════════════════════════
function pctRank(vals) {
  const xs = vals.filter((v) => v != null && isFinite(v)).sort((a, b) => a - b);
  return (v) => { if (v == null || !isFinite(v) || !xs.length) return 0.5; let lo = 0; while (lo < xs.length && xs[lo] < v) lo++; return xs.length === 1 ? 1 : lo / (xs.length - 1); };
}
function feat(c, s, m) {
  return { growth: Math.max(m.g3 ?? -1, m.gFwd ?? -1, c === "us" ? (m.gLast ?? -1) : -1), roic: m.roicAvg, pegInv: m.peg > 0 ? -m.peg : null,
    fcfM: m.fcfM, cashM: m.cashM, small: s.mcap > 0 ? -Math.log(s.mcap) : null, owner: m.owner };
}
function view(c, s, m, score, why) {
  return { ticker: s.ticker, name: s.name, market: s.market || s.sector || null, industry: c === "korea" ? m.wics : s.industry, score: r1(score, 3),
    price: s.price, mcap: c === "korea" ? (s.mcap ? Math.round(s.mcap / 1e8) : null) : (s.mcap ? r1(s.mcap / 1e9, 2) : null),
    mcapUnit: c === "korea" ? "억원" : "십억달러",
    revG3: pct(m.g3), revLast: pct(m.gLast), revFwd: pct(m.gFwd), roicAvg: pct(m.roicAvg), roic3: (m.roic3 || []).map(pct), roicNoCash: m.roicNoCash || undefined,
    fcfM: pct(m.fcfM), netCash: c === "korea" ? (m.netCash != null ? Math.round(m.netCash) : null) : (m.netCash != null ? r1(m.netCash / 1e6, 0) : null),
    netCashUnit: c === "korea" ? "억원" : "백만달러", cashToMcap: pct(m.cashM), per: r1(m.per), epsG: pct(m.epsG), peg: r1(m.peg, 2), pegBasis: m.pegBasis,
    dilution: pct(m.dil), split: m.split || undefined, owner: m.owner != null ? r1(m.owner) : undefined, epsEstimates: m.analysts, coverage: c === "korea" ? m.cover : undefined,
    beta52w: m.beta != null ? m.beta : undefined, capexMissing: m.capexMissing || undefined, fails: why && why.length ? why : undefined };
}
function build(c, pool, members) {
  const elig = pool.filter((x) => !x.why.length);
  const near = pool.filter((x) => x.why.length === 1 && x.whyR && !x.whyR.length);
  const inSet = new Set(members.map((s) => s.ticker));
  const popn = elig.concat(near, pool.filter((x) => inSet.has(x.s.ticker) && x.why.length && !near.includes(x)));
  const w = WEIGHTS[c];
  const F = new Map(popn.map((x) => [x, feat(c, x.s, x.m)]));
  const pr = {}; Object.keys(w).forEach((k) => { pr[k] = pctRank(popn.map((x) => F.get(x)[k])); });
  const score = (x) => Object.keys(w).reduce((acc, k) => acc + w[k] * pr[k](F.get(x)[k]), 0);
  const formal = new Set(members.map((s) => s.ticker));
  const top = (arr, n, withWhy) => arr.filter((x) => !formal.has(x.s.ticker)).map((x) => ({ x, sc: score(x) })).sort((a, b) => b.sc - a.sc).slice(0, n)
    .map(({ x, sc }) => view(c, x.s, x.m, sc, withWhy ? x.why : null));
  const inc = members.map((mm) => {
    const x = pool.find((p) => p.s.ticker === mm.ticker);
    if (!x) return { ticker: mm.ticker, name: mm.name, tier: mm.tier, score: null, passesRule: null, fails: ["데이터 없음"] };
    return Object.assign(view(c, x.s, x.m, F.has(x) ? score(x) : null, x.why), { tier: mm.tier, passesRule: !x.why.length, nearMiss: near.includes(x) || undefined });
  }).sort((a, b) => (a.passesRule === b.passesRule ? (a.score ?? -1) - (b.score ?? -1) : a.passesRule ? 1 : -1));
  // 탈락 사유 분포(어느 조건이 얼마나 거르는지)
  const funnel = {};
  pool.forEach((x) => x.why.forEach((w0) => { const k = w0.replace(/\(.*$/, "").replace(/\s[\d.]+$/, "").replace(/연 [\d.]+% /, ""); funnel[k] = (funnel[k] || 0) + 1; }));
  return { rule: RULE_LABEL[c], weights: w, eligible: elig.length, nearMissCount: near.length, screened: pool.length, funnel, incumbents: inc,
    candidates: top(elig, TOP_N, false), nearMiss: top(near, 12, true),
    note: "히든 = 10배 가능성 + 영구 손실 위험 낮음(scripts/screen-hidden.js). candidates = 숫자 조건 모두 충족, nearMiss = 안전 조건은 충족하고 상방 조건(시총 상한·성장·ROIC·PEG·희석) 하나만 완화선 안에서 미달(fails 에 무엇이 모자란지). 해자·경영진 지분·집중 리스크·성장 활주로(시장 규모·침투율)는 숫자로 못 걸러 세션이 검증한다." };
}

async function hiddenKR(D, log) {
  const members = (D.korea || []).filter((s) => s.theme === "rising");
  let list = (await rankKR("KOSPI", 7)).concat(await rankKR("KOSDAQ", 4));
  const seen = new Set(); list = list.filter((s) => (seen.has(s.ticker) ? false : seen.add(s.ticker)));
  const band = list.filter((s) => (s.mcap >= RELAX.krMcap[0] && s.mcap <= RELAX.krMcap[1]) || members.some((m) => m.ticker === s.ticker));
  members.forEach((mm) => { if (!band.some((s) => s.ticker === mm.ticker)) band.push({ c: "korea", ticker: mm.ticker, name: mm.name, market: mm.market, price: null, mcap: null }); });
  log("한국 유니버스 " + list.length + " → 시총 범위·편성 " + band.length + "종목, 기업현황 수집 중…");
  await mapLimit(band, 6, async (s) => enrichKR(s));
  // 1차(현금 없이) 통과 + 편성 종목만 재무상태표를 더 받는다
  const pre = band.filter((s) => !s.err).filter((s) => {
    const m = metricsKR(s); const why = judgeKR(s, m, RELAX).filter((w0) => !/^ROIC|순차입금/.test(w0));
    return !why.length || members.some((mm) => mm.ticker === s.ticker);
  });
  log("한국 1차 통과·편성 " + pre.length + " — 재무상태표(현금) 수집");
  await mapLimit(pre, 6, (s) => cashKR(s));
  const pool = band.map((s) => {
    if (s.err) return { s, m: {}, why: [s.err] };
    const m = metricsKR(s); return { s, m, why: judgeKR(s, m), whyR: judgeKR(s, m, RELAX) };
  });
  return build("korea", pool, members);
}
async function hiddenUS(D, log) {
  const members = (D.us || []).filter((s) => s.theme === "rising");
  const all = await universeUS();
  const band = all.filter((s) => (s.mcap >= RELAX.usMcap[0] && s.mcap <= RELAX.usMcap[1] && !US_EX_SECTOR.test(s.sector || "") && !US_EX_IND.test(s.industry || "") && !US_EX_NAME.test(s.fullName || ""))
    || members.some((m) => m.ticker === s.ticker || m.ticker.replace(".", "-") === s.ticker));
  log("미국 유니버스 " + all.length + " → 시총 범위·업종·편성 " + band.length + "종목, SEC frames 수집 중…");
  await loadFrames();
  log("SEC frames " + Object.keys(FRAME).length + "개 — 티커→CIK 매핑 중…");
  await mapLimit(band, 6, async (s) => { s.cik = await cikOf(s.ticker); });
  const pool = band.map((s) => { const m = metricsUS(s); return { s, m, why: judgeUS(s, m, false), whyR: judgeUS(s, m, false, RELAX) }; });
  const pre = pool.filter((x) => !x.whyR.length || members.some((mm) => mm.ticker === x.s.ticker));
  log("미국 1차(SEC) 통과·편성 " + pre.length + " — 나스닥 EPS 컨센서스로 PEG 계산");
  await mapLimit(pre, 4, async (x) => { await pegUS(x.s, x.m); x.why = judgeUS(x.s, x.m, true); x.whyR = judgeUS(x.s, x.m, true, RELAX); });
  return build("us", pool, members);
}
async function hiddenGroups(D, opts) {
  const log = (opts && opts.log) || console.log, only = opts && opts.only;
  const out = {};
  if (!only || only === "korea") out["korea|rising"] = await hiddenKR(D, log);
  if (!only || only === "us") out["us|rising"] = await hiddenUS(D, log);
  return out;
}
module.exports = { hiddenGroups, CRITERIA: C, RULE_LABEL,
  _internal: { universeUS, loadFrames, cikOf, metricsUS, judgeUS, pegUS, rankKR, enrichKR, cashKR, metricsKR, judgeKR, FRAME } };

if (require.main === module) {
  const argVal = (n) => { const i = process.argv.indexOf("--" + n); return i >= 0 ? process.argv[i + 1] : null; };
  (async () => {
    const t0 = Date.now();
    global.window = {}; require(path.join(ROOT, "data", "recommendations.js"));
    const D = global.window.STOCK_DATA;
    const groups = await hiddenGroups(D, { only: argVal("only") });
    Object.keys(groups).forEach((k) => {
      const g = groups[k];
      console.log("\n■ " + k + " — 적격 " + g.eligible + " · 근접 " + g.nearMissCount + " / " + g.screened + "  탈락 사유: " + JSON.stringify(g.funnel));
      g.candidates.forEach((x, i) => console.log("  " + (i + 1) + ". " + x.ticker + " " + x.name + " [" + (x.industry || "") + "] 시총 " + x.mcap + x.mcapUnit +
        " · 매출3y " + x.revG3 + "% 최근 " + x.revLast + "% 향후 " + x.revFwd + "% · ROIC " + x.roicAvg + "% · PEG " + x.peg + "(" + x.pegBasis + ") · FCF마진 " + x.fcfM +
        "% · 순현금 " + x.netCash + x.netCashUnit + (x.owner != null ? " · 최대주주 " + x.owner + "%" : "") + (x.dilution != null ? " · 희석 " + x.dilution + "%" : "")));
      console.log("  [근접 후보 — 상방 조건 하나만 미달]");
      (g.nearMiss || []).forEach((x, i) => console.log("  " + (i + 1) + ". " + x.ticker + " " + x.name + " [" + (x.industry || "") + "] 시총 " + x.mcap + x.mcapUnit +
        " · 매출3y " + x.revG3 + "% 최근 " + x.revLast + "% 향후 " + x.revFwd + "% · ROIC " + x.roicAvg + "% · PEG " + x.peg + " · 미달: " + (x.fails || []).join("/")));
      console.log("  [현 편성]");
      g.incumbents.forEach((x) => console.log("   " + (x.passesRule ? "○" : "×") + " " + x.ticker + " " + x.name + " T" + x.tier + " — " + (x.fails ? x.fails.join(" / ") : "통과")));
    });
    if (process.argv.includes("--dry")) return;
    global.window = {};
    let base = { groups: {} };
    if (fs.existsSync(OUT)) { try { require(OUT); base = global.window.DISCOVERY_CANDIDATES || base; } catch (_e) { /* 새로 */ } }
    Object.assign(base.groups, groups);
    base.hiddenBuiltAt = new Date().toISOString();
    fs.writeFileSync(OUT,
      "// 주간 심층 발굴 후보 — scripts/screen-discovery.js 가 생성(LLM 토큰 0). 앱은 로드하지 않는다(sw.js SHELL 에 넣지 말 것).\n" +
      "// groups[\"<country>|<theme>\"] = {rule 하드 조건, weights 점수 가중, eligible 적격 수, incumbents 현 편성(점수 낮은 순·같은 잣대), candidates 상위 후보}\n" +
      "// 히든(korea|rising·us|rising)은 scripts/screen-hidden.js — 단위: 성장률·ROIC·FCF마진·PEG 근거 %, 시총(한국 억원·미국 십억달러), 순현금(한국 억원·미국 백만달러).\n" +
      "window.DISCOVERY_CANDIDATES = " + JSON.stringify(base, null, 1) + ";\n");
    console.log("\ndiscovery-candidates.js 의 히든 그룹 갱신 (" + Math.round((Date.now() - t0) / 1000) + "초)");
  })().catch((e) => { console.error("screen-hidden 실패:", e && e.stack || e); process.exit(1); });
}
