// 코스피·코스닥 투자자별 순매수(개인·외국인·기관, 억원) — 지수 상세 '수급'(차트 아래 수급 막대·수급 표).
//
// 출처: 다음 금융 investor/days(한국거래소 집계, 원 단위). 네이버 m.stock 지수 trend(?bizdate=)는 장 마감 직후의 잠정치를
//   그대로 남겨 일부 날짜가 확정치와 크게 다르다 — 2026-10-26 점검: 2025-07~2026-10 의 20개 날짜는 두 곳이 같았지만
//   9/15~10/26 사이 여러 날이 달랐고(10/1 외국인 네이버 -5,558억 vs 다음 +1,194억), 한 달 뒤 연합뉴스 집계(10/1 +1,194억·
//   10/6 -1조7,577억·10/14 -1조1,791억)는 다음과 같았다. 한국거래소(data.krx.co.kr)는 로그인을 요구해 쓰지 못한다.
//
// data/market-flows.json 에 일별 [YYYYMMDD, 개인, 외국인, 기관](억원)을 쌓는다 — 처음 한 번 전체(약 10년)를 받고,
// 이후에는 최근 60거래일만 다시 받아 정정치를 반영한다. 끝난 장(maxDate 이하, 없으면 한국 16시 기준)만 남긴다 —
// 장중 실행(예약 지연)이 진행 중인 날의 누적치를 남기지 않게. 받기에 실패하면 이전 기록을 그대로 쓴다.
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "data", "market-flows.json");
const MARKETS = { kospi: "KOSPI", kosdaq: "KOSDAQ" };
const REFRESH = 60, FULL_MIN = 2000;

async function getPage(code, page, perPage) {
  if (typeof fetch !== "function") return null;
  const url = "https://finance.daum.net/api/investor/" + code + "/days?page=" + page + "&perPage=" + perPage + "&pagination=true";
  for (let i = 0; i < 3; i++) {
    const ctrl = new AbortController(), to = setTimeout(() => ctrl.abort(), 20000);
    try {
      const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", Referer: "https://finance.daum.net/", Accept: "application/json" } });
      if (r.ok) { const j = await r.json(); if (j && Array.isArray(j.data)) return j; }
    } catch (_e) { /* 재시도 */ } finally { clearTimeout(to); }
    await new Promise((res) => setTimeout(res, 1000 * (i + 1)));
  }
  return null;
}
const eok = (v) => (v == null || v === "" || !isFinite(+v) ? null : Math.round(+v / 1e8));
function rowOf(x) {
  const d = String((x && x.date) || "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
  const p = eok(x.individualStraightPurchasePrice), f = eok(x.foreignStraightPurchasePrice), o = eok(x.institutionStraightPurchasePrice);
  return p == null || f == null || o == null ? null : [+d.replace(/-/g, ""), p, f, o];
}
// 끝난 장의 마지막 날짜(정수) — maxDate(야후가 끝난 장으로 본 마지막 봉)가 없으면 한국 시각 16시 전의 오늘은 뺀다
function cutoffOf(maxDate) {
  const k = new Date(Date.now() + 9 * 3600e3), today = +k.toISOString().slice(0, 10).replace(/-/g, "");
  const byClock = k.getUTCHours() >= 16 ? today : +new Date(k.getTime() - 86400e3).toISOString().slice(0, 10).replace(/-/g, "");
  const given = maxDate ? +String(maxDate).replace(/-/g, "") : null;
  return given ? Math.min(given, byClock) : byClock;
}
function load() { try { return JSON.parse(fs.readFileSync(FILE, "utf8")); } catch (_e) { return null; } }

// 받아서 쌓고 { data: {kospi:[…], kosdaq:[…]}, changed, notes } 를 돌려준다
async function updateFlows(opt) {
  const cut = cutoffOf(opt && opt.maxDate);
  const prev = load() || {};
  const out = { src: "다음 금융(한국거래소 집계)", unit: "억원", cols: ["날짜", "개인", "외국인", "기관"], updatedAt: prev.updatedAt || null };
  const notes = [];
  let changed = false;
  for (const key of Object.keys(MARKETS)) {
    const old = Array.isArray(prev[key]) ? prev[key] : [];
    let got = [];
    if (old.length < FULL_MIN) {
      for (let page = 1; page <= 6; page++) {
        const j = await getPage(MARKETS[key], page, 1000);
        if (!j) { got = null; break; }
        got = got.concat(j.data.map(rowOf).filter(Boolean));
        if (page >= (j.totalPages || 1)) break;
      }
    } else {
      const j = await getPage(MARKETS[key], 1, REFRESH);
      got = j ? j.data.map(rowOf).filter(Boolean) : null;
    }
    const m = new Map(old.map((r) => [r[0], r]));
    if (got && got.length) got.forEach((r) => m.set(r[0], r));
    else notes.push(key + " 받기 실패 — 이전 기록 유지");
    [...m.keys()].forEach((d) => { if (d > cut) m.delete(d); });   // 끝나지 않은 장(이전 장중 실행이 남긴 것 포함)
    const rows = [...m.values()].sort((a, b) => a[0] - b[0]);
    if (JSON.stringify(rows) !== JSON.stringify(old)) changed = true;
    out[key] = rows;
  }
  if (changed) {
    out.updatedAt = new Date().toISOString().slice(0, 19) + "Z";
    fs.writeFileSync(FILE, JSON.stringify(out) + "\n");
  }
  return { data: out, changed, notes };
}

// 지수 상세 '수급' 표·AI 맥락용 요약 — 최근일·5·20·60거래일 합(억원)과 연속 순매수(+)/순매도(-) 일수
function flowSummary(rows) {
  if (!rows || !rows.length) return null;
  const last = rows[rows.length - 1], pick = (r) => ({ p: r[1], f: r[2], o: r[3] });
  const sum = (n) => rows.slice(-n).reduce((s, r) => ({ p: s.p + r[1], f: s.f + r[2], o: s.o + r[3] }), { p: 0, f: 0, o: 0 });
  const streak = (i) => {
    const sg = Math.sign(last[i]);
    let n = 0;
    for (let k = rows.length - 1; sg && k >= 0 && Math.sign(rows[k][i]) === sg; k--) n++;
    return sg * n;
  };
  const d = String(last[0]);
  return {
    asOf: d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6, 8), unit: "억원", src: "다음 금융(한국거래소 집계)",
    last: pick(last), s5: sum(5), s20: sum(20), s60: sum(60), streak: { p: streak(1), f: streak(2), o: streak(3) },
  };
}
// 차트용 — 날짜(정수) → [개인, 외국인, 기관]
function flowMap(rows) { return new Map((rows || []).map((r) => [r[0], [r[1], r[2], r[3]]])); }

module.exports = { FILE, MARKETS, updateFlows, flowSummary, flowMap, cutoffOf };
