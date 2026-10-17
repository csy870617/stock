// 발굴 스크린용 주제 팩터 수집(현재 시점) — 정의는 scripts/lib-factors.js(연구 패널과 같은 계산식)
//   한국: 네이버 기업현황(WiseReport) 연간 주요재무 → 최신 12월 결산 연도 기준 팩터
//   미국: SEC XBRL frames(최근 5개 회계연도) + 야후 월봉(배당 이력·가격) → 최신 회계연도 기준 팩터
// screen-discovery.js 가 후보 풀에 s.fx(팩터)·s.fxYear 를 붙이는 데 쓴다. 실패한 종목은 s.fx 가 비고 점수는 중립(백분위 0.5)으로 계산된다.
"use strict";
const { execFile } = require("child_process");
const LF = require("./lib-factors");

const DESKTOP = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const SEC_UA = "Mozilla/5.0 (compatible; stock-dashboard-screen/1.0)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function curl(url, ua, extra) {
  return new Promise((resolve) => {
    execFile("curl", ["-s", "--max-time", "40", "--compressed", "-A", ua || DESKTOP].concat(extra || []).concat([url]), { maxBuffer: 128 * 1024 * 1024 },
      (err, out) => resolve(err ? null : out));
  });
}
async function getText(url, ua, extra) { for (let i = 0; i < 3; i++) { const t = await curl(url, ua, extra); if (t && t.length > 20) return t; await sleep(500 * (i + 1)); } return null; }
async function getJson(url, ua, extra) { const t = await getText(url, ua, extra); if (!t) return null; try { return JSON.parse(t.replace(/^﻿/, "")); } catch (_e) { return null; } }
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}
function rateLimiter(perSec) { let next = 0; return async () => { const now = Date.now(); const at = Math.max(now, next); next = at + 1000 / perSec; if (at > now) await sleep(at - now); }; }
const num = (v) => { if (v == null) return null; const n = parseFloat(String(v).replace(/[,%$배원]/g, "").trim()); return isFinite(n) ? n : null; };

function parseWiseTable(html) {
  const trs = html.match(/<tr[\s\S]*?<\/tr>/g) || [];
  let cols = null; const rows = {};
  for (const tr of trs) {
    const cells = (tr.match(/<t[hd][\s\S]*?<\/t[hd]>/g) || []).map((c) => c.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim());
    if (!cells.length) continue;
    if (!cols && cells.filter((c) => /^\d{4}\/\d{2}/.test(c)).length >= 3) { cols = cells.filter((c) => /^\d{4}\/\d{2}/.test(c)).map((c) => ({ title: c.slice(0, 7), est: /\(E\)/.test(c) })); continue; }
    if (cols && cells.length === cols.length + 1 && !rows[cells[0]]) rows[cells[0]] = cells.slice(1).map(num);
  }
  return cols ? { cols, rows } : null;
}

// 야후 월봉 → 배당(최근 12개월·3년 전 12개월·연속 비감소 연수)과 가격 지표(12-1개월 모멘텀·12개월 변동성)
async function yahooExt(sym) {
  const j = await getJson("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) +
    "?interval=1mo&range=10y&events=div%2Csplit", "Mozilla/5.0");
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  if (!res || !res.timestamp) return null;
  const cur = new Date().toISOString().slice(0, 7);
  const q = res.indicators.quote[0], a = res.indicators.adjclose && res.indicators.adjclose[0] && res.indicators.adjclose[0].adjclose;
  const d = [], c = [], ad = [];
  res.timestamp.forEach((t, k) => { const ym = new Date((t + 15 * 86400) * 1000).toISOString().slice(0, 7); if (ym >= cur || q.close[k] == null || !a || a[k] == null) return; if (d.length && d[d.length - 1] === ym) return; d.push(ym); c.push(q.close[k]); ad.push(a[k]); });
  if (d.length < 13) return null;
  const divM = {}; Object.values((res.events && res.events.dividends) || {}).forEach((x) => { const k = new Date(x.date * 1000).toISOString().slice(0, 7); divM[k] = (divM[k] || 0) + x.amount; });
  const addM = (ym, k) => { let [y, m] = ym.split("-").map(Number); m += k; while (m > 12) { m -= 12; y++; } while (m < 1) { m += 12; y--; } return y + "-" + String(m).padStart(2, "0"); };
  const last = d[d.length - 1];
  const divSum = (from, to) => { let s = 0; for (let k = addM(from, 1); k <= to; k = addM(k, 1)) s += divM[k] || 0; return s; };
  const dTTM = divSum(addM(last, -12), last), d36 = divSum(addM(last, -48), addM(last, -36));
  let streak = 0;
  for (let yy = Number(last.slice(0, 4)) - 1; yy > Number(last.slice(0, 4)) - 11; yy--) {
    const d0 = divSum((yy - 1) + "-12", yy + "-12"), dp = divSum((yy - 2) + "-12", (yy - 1) + "-12");
    if (d0 > 0 && d0 >= dp * 0.99) streak++; else break;
  }
  const n = ad.length, mr = []; for (let k = n - 12; k < n; k++) if (k > 0) mr.push(ad[k] / ad[k - 1] - 1);
  const m0 = mr.reduce((s, v) => s + v, 0) / mr.length;
  return { dy: c[n - 1] > 0 ? dTTM / c[n - 1] : null, dgr: dTTM > 0 && d36 > 0 ? Math.pow(dTTM / d36, 1 / 3) - 1 : null, streak: dTTM > 0 ? streak : null,
    MOM: n >= 13 ? ad[n - 2] / ad[n - 13] - 1 : null, VOL: Math.sqrt(mr.reduce((s, v) => s + (v - m0) ** 2, 0) / (mr.length - 1)) };
}

// ── 한국 ──
async function addKrFactors(list, log) {
  let ok = 0;
  await mapLimit(list, 6, async (s) => {
    const page = await getText("https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=" + s.ticker, DESKTOP);
    const enc = page && (page.match(/encparam\s*[:=]\s*['"]([^'"]+)/) || [])[1];
    if (!enc) return;
    s.wics = ((page.match(/WICS\s*:\s*([^&<]+)/) || [])[1] || "").trim() || s.wics;
    const sum = await getText("https://navercomp.wisereport.co.kr/v2/company/ajax/cF1001.aspx?cmp_cd=" + s.ticker + "&fin_typ=0&freq_typ=Y&encparam=" + enc + "&id=", DESKTOP,
      ["-e", "https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=" + s.ticker]);
    const T = sum && parseWiseTable(sum.slice(sum.indexOf("주요재무정보") >= 0 ? sum.indexOf("주요재무정보") : 0));
    if (!T) return;
    const fu = LF.krFundamentals(T);
    const ys = Object.keys(fu).map(Number).sort((a, b) => a - b);
    if (!ys.length || !(s.mcap > 0)) return;
    const y = ys[ys.length - 1];
    const fx = LF.krFactorsAt(fu, y, s.mcap / 1e8);
    if (!fx) return;
    const ext = await yahooExt(s.ticker + (s.market === "KOSDAQ" ? ".KQ" : ".KS"));
    if (ext) { fx.MOM = ext.MOM; fx.VOL = ext.VOL; }
    s.fx = fx; s.fxYear = y; ok++;
  });
  log("  한국 팩터(기업현황) " + ok + "/" + list.length);
}

// ── 미국 ──
async function addUsFactors(list, log) {
  const lim = rateLimiter(7);
  const want = (t) => String(t).toUpperCase().replace(".", "-");
  await mapLimit(list, 6, async (s) => {
    await lim();
    const j = await getJson("https://efts.sec.gov/LATEST/search-index?keysTyped=" + encodeURIComponent(s.ticker), SEC_UA);
    for (const h of (j && j.hits && j.hits.hits) || []) {
      const tk = String((h._source && h._source.tickers) || "").toUpperCase().split(/[,\s]+/).map((x) => x.replace(".", "-"));
      if (tk.includes(want(s.ticker))) { s.cik = Number(h._id); break; }
    }
  });
  const Y1 = new Date().getUTCFullYear() - 1, YEARS = [Y1 - 4, Y1 - 3, Y1 - 2, Y1 - 1, Y1];
  const FR = {};
  const jobs = [];
  LF.US_DUR.forEach((c) => YEARS.forEach((y) => jobs.push([c, "USD", "CY" + y])));
  LF.US_SHARES.forEach((c) => YEARS.forEach((y) => jobs.push([c, "shares", "CY" + y])));
  LF.US_INST.forEach((c) => YEARS.forEach((y) => jobs.push([c, "USD", "CY" + y + "Q4I"])));
  const flim = rateLimiter(6);
  await mapLimit(jobs, 4, async ([c, u, p]) => {
    await flim();
    const jj = await getJson("https://data.sec.gov/api/xbrl/frames/us-gaap/" + c + "/" + u + "/" + p + ".json", SEC_UA);
    const m = new Map(); ((jj && jj.data) || []).forEach((d) => m.set(d.cik, [d.val, d.end || null]));
    FR[c + "|" + p] = m;
  });
  const fv = (c, p, cik) => { const m = FR[c + "|" + p]; const x = m && m.get(cik); return x ? x[0] : null; };
  const fe = (c, p, cik) => { const m = FR[c + "|" + p]; const x = m && m.get(cik); return x ? x[1] : null; };
  let ok = 0, moved = 0;
  const yearsOf = (fu) => Object.keys(fu).map(Number).filter((y) => fu[y].sh > 0).sort((a, b) => a - b);
  await mapLimit(list, 6, async (s) => {
    if (!s.cik || !(s.mcap > 0)) return;
    let fu = LF.usFundamentals(s.cik, YEARS, fv, fe);
    let ys = yearsOf(fu);
    // 지주회사 재편으로 티커가 이력 없는 새 CIK 로 옮겨 간 경우(예: XOM 2026 ExxonMobil Holdings) — 회사명 검색으로 최근까지 공시한 옛 CIK 를 찾는다
    if (ys.length < 2 && s.name) {
      await lim();
      const q = String(s.name).replace(/[,.()]/g, " ").split(/\s+/).filter(Boolean).slice(0, 2).join(" ");
      const j2 = await getJson("https://efts.sec.gov/LATEST/search-index?keysTyped=" + encodeURIComponent(q), SEC_UA);
      for (const h of (j2 && j2.hits && j2.hits.hits) || []) {
        const c2 = Number(h._id); if (c2 === s.cik) continue;
        const fu2 = LF.usFundamentals(c2, YEARS, fv, fe), ys2 = yearsOf(fu2);
        if (ys2.length >= 2 && ys2[ys2.length - 1] >= Y1 - 1) { fu = fu2; ys = ys2; s.cikAlt = c2; moved++; break; }
      }
    }
    if (!ys.length) return;
    const y = ys[ys.length - 1];
    const ext = await yahooExt(String(s.ticker).replace(".", "-")) || {};
    const fx = LF.usFactorsAt(fu, y, s.mcap, ext);
    if (!fx) return;
    fx.MOM = ext.MOM != null ? ext.MOM : null; fx.VOL = ext.VOL != null ? ext.VOL : null;
    s.fx = fx; s.fxYear = y; ok++;
  });
  log("  미국 팩터(SEC·야후) " + ok + "/" + list.length + " (CIK " + list.filter((s) => s.cik).length + ", 재편 CIK 대체 " + moved + ")");
}

module.exports = { addKrFactors, addUsFactors };
