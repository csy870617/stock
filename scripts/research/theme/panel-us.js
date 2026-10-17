#!/usr/bin/env node
// 주제 기준 연구 — 미국 월별 패널(2026-10-17). 사전 등록: README.md
// 사용: node scripts/research/theme/panel-us.js <캐시 폴더>  → <캐시>/us/panel.json (열 지향: {fields, rows:[…]})
// 시점: FY 재무는 회계연도 말 + 150일(≈ 5개월) 뒤 달부터 쓴다(10-K 제출 기한 60~90일 + 여유 — 룩어헤드 방지).
// 시총(t) = 분할 수정 종가(t) × 그 회계연도 희석 가중 주식 수 × (회계연도 말 이후 분할 비율) — 야후 종가는 현재까지의 분할로 수정돼 있다.
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("./lib");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const US = path.join(DIR, "us");
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const YEARS = []; for (let y = 2009; y <= 2025; y++) YEARS.push(y);

// ── frames 로드 ──
const F = {};
for (const f of fs.readdirSync(path.join(US, "frames"))) {
  const [c, p] = f.replace(/\.json$/, "").split("__");
  F[c + "|" + p] = L.readJson(path.join(US, "frames", f), {});
}
const fv = (c, p, cik) => { const m = F[c + "|" + p]; const x = m && m[cik]; return x ? x[0] : null; };
const fe = (c, p, cik) => { const m = F[c + "|" + p]; const x = m && m[cik]; return x ? x[1] : null; };
log("frames " + Object.keys(F).length);

const REV = ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "SalesRevenueNet", "RevenueFromContractWithCustomerIncludingAssessedTax", "SalesRevenueGoodsNet"];
const COGS = ["CostOfRevenue", "CostOfGoodsAndServicesSold", "CostOfGoodsSold"];
const CAPEX = ["PaymentsToAcquirePropertyPlantAndEquipment", "PaymentsToAcquireProductiveAssets", "PaymentsForCapitalImprovements"];
const first = (arr) => { for (const v of arr) if (v != null) return v; return null; };

function fundamentals(cik) {
  // 매출 개념: 연도가 가장 많이 채워진 것을 기본, 빈 해는 다른 개념으로 메운다
  let best = null;
  REV.forEach((c) => { const n = YEARS.filter((y) => fv(c, "CY" + y, cik) != null).length; if (n && (!best || n > best.n)) best = { c, n }; });
  const out = {};
  for (const y of YEARS) {
    const p = "CY" + y, pi = "CY" + y + "Q4I";
    const rev = best ? (fv(best.c, p, cik) ?? first(REV.map((c) => fv(c, p, cik)))) : null;
    const ni = fv("NetIncomeLoss", p, cik), op = fv("OperatingIncomeLoss", p, cik);
    const end = fe("NetIncomeLoss", p, cik) || (best && fe(best.c, p, cik)) || fe("OperatingIncomeLoss", p, cik);
    if (rev == null && ni == null) continue;
    const cogs = first(COGS.map((c) => fv(c, p, cik)));
    const gp = fv("GrossProfit", p, cik) ?? (rev != null && cogs != null ? rev - cogs : null);
    const cx = first(CAPEX.map((c) => fv(c, p, cik)));
    const capex = cx == null ? null : cx + (fv("PaymentsToDevelopSoftware", p, cik) || 0);
    const v = (c) => fv(c, pi, cik) || 0;
    const debt = Math.max(v("LongTermDebt"), v("LongTermDebtNoncurrent") + v("LongTermDebtCurrent"),
      v("LongTermDebtAndCapitalLeaseObligations") + v("LongTermDebtAndCapitalLeaseObligationsCurrent"), v("SeniorNotes"), v("ConvertibleNotesPayable"))
      + Math.max(v("LongTermLineOfCredit"), v("LineOfCredit")) + v("ShortTermBorrowings") + (v("LongTermDebtCurrent") === 0 && v("LongTermDebt") === 0 ? v("DebtCurrent") : 0);
    out[y] = {
      end, rev, gp, op, ni, ocf: fv("NetCashProvidedByUsedInOperatingActivities", p, cik), capex,
      div: fv("PaymentsOfDividendsCommonStock", p, cik) ?? fv("PaymentsOfDividends", p, cik),
      buy: fv("PaymentsForRepurchaseOfCommonStock", p, cik), iss: fv("ProceedsFromIssuanceOfCommonStock", p, cik),
      sh: fv("WeightedAverageNumberOfDilutedSharesOutstanding", p, cik),
      assets: fv("Assets", pi, cik), ca: fv("AssetsCurrent", pi, cik), cl: fv("LiabilitiesCurrent", pi, cik), liab: fv("Liabilities", pi, cik),
      eq: fv("StockholdersEquity", pi, cik) ?? fv("StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest", pi, cik),
      cash: (fv("CashAndCashEquivalentsAtCarryingValue", pi, cik) ?? fv("CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents", pi, cik)),
      sti: fv("ShortTermInvestments", pi, cik) ?? fv("MarketableSecuritiesCurrent", pi, cik) ?? 0,
      debt,
    };
  }
  return out;
}

// ── 종목 묶기: CIK 당 하나(가장 긴 가격 이력) ──
const uni = L.readJson(path.join(US, "universe.json"), []);
const cikMap = L.readJson(path.join(US, "cik.json"), {});
const byCik = {};
for (const u of uni) {
  const c = cikMap[u.t]; if (!c) continue;
  const f = path.join(US, "px", u.t + ".json");
  if (!fs.existsSync(f)) continue;
  const px = L.readJson(f, null);
  if (!px || px.none || !px.d || px.d.length < 24) continue;
  if (!byCik[c] || px.d.length > byCik[c].px.d.length || (px.d.length === byCik[c].px.d.length && (px.v.slice(-12).reduce((s, x) => s + x, 0) > byCik[c].px.v.slice(-12).reduce((s, x) => s + x, 0))))
    byCik[c] = { u, px };
}
const FIN = /^Finance$|Real Estate/i, FIN_IND = /(REIT|Real Estate|Banks|Savings Institutions|Insurance|Finance|Investment|Trusts)/i;
const stocks = Object.keys(byCik).map((c) => {
  const { u, px } = byCik[c];
  const fu = fundamentals(Number(c));
  const idx = new Map(px.d.map((d, i) => [d, i]));
  return { cik: c, t: u.t, sector: u.sector, industry: u.industry, fin: FIN.test(u.sector || "") || FIN_IND.test(u.industry || ""), fu, px, idx };
}).filter((s) => Object.keys(s.fu).length >= 2);
log("종목 " + stocks.length);

// 월 목록
const months = [];
for (let y = 2011; y <= 2026; y++) for (let m = 1; m <= 12; m++) { const k = y + "-" + String(m).padStart(2, "0"); if (k >= "2011-06" && k <= "2026-09") months.push(k); }
const addM = (ym, k) => { let [y, m] = ym.split("-").map(Number); m += k; while (m > 12) { m -= 12; y++; } while (m < 1) { m += 12; y--; } return y + "-" + String(m).padStart(2, "0"); };
const availYM = (end) => { if (!end) return null; const d = new Date(end + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + 150); return d.toISOString().slice(0, 7); };

// 종목별 사전 계산: 연도별 사용 가능 월, 분할 누적(회계연도 말 이후), 배당 월별 합
for (const s of stocks) {
  s.ys = Object.keys(s.fu).map(Number).sort((a, b) => a - b);
  s.avail = {}; s.ys.forEach((y) => { s.avail[y] = availYM(s.fu[y].end) || (y + 1) + "-06"; });
  s.splitAfter = (date) => s.px.splits.filter((x) => x[0] > date).reduce((p, x) => p * x[1], 1);
  s.divM = {}; s.px.divs.forEach(([d, a]) => { const k = d.slice(0, 7); s.divM[k] = (s.divM[k] || 0) + a; });
}
const divSum = (s, fromYM, toYM) => { let t = 0; for (let k = addM(fromYM, 1); k <= toYM; k = addM(k, 1)) t += s.divM[k] || 0; return t; };   // (from, to]
const sd = (a) => { const x = a.filter((v) => v != null && isFinite(v)); if (x.length < 3) return null; const m = x.reduce((p, v) => p + v, 0) / x.length; return Math.sqrt(x.reduce((p, v) => p + (v - m) ** 2, 0) / (x.length - 1)); };
const ratio = (a, b) => (a != null && b != null && b > 0 ? a / b : null);
const gr = (a, b) => (a != null && b != null && b > 0 ? a / b - 1 : null);

const FIELDS = ["t", "ym", "mcap", "rank", "fin", "opPos", "niPos",
  "EP", "BP", "SP", "FCFP", "EBITEV", "DY", "SHY",
  "ROE", "ROA", "GPA", "OPA", "CFOA", "ROIC", "ACC", "LEV", "F", "SROA",
  "SG1", "SG3", "OPG", "DROA", "DGM", "AG", "ISS",
  "PAYOUT", "DGR", "DSTREAK", "COV", "MOM", "VOL",
  "r1", "r3", "r6", "r12", "dcut"];
const rows = [];
for (const ym of months) {
  const cs = [];
  for (const s of stocks) {
    const i = s.idx.get(ym); if (i == null) continue;
    let y = null; for (const yy of s.ys) if (s.avail[yy] <= ym) y = yy;
    if (y == null) continue;
    const f = s.fu[y], f1 = s.fu[y - 1], f3 = s.fu[y - 3];
    if (!f || f.sh == null || !(f.sh > 0)) continue;
    const c = s.px.c[i];
    const mcap = c * f.sh * s.splitAfter(f.end || (y + "-12-31"));
    if (!(mcap > 0)) continue;
    cs.push({ s, i, y, f, f1, f3, mcap, c });
  }
  cs.sort((a, b) => b.mcap - a.mcap);
  const top = cs.slice(0, 1000);
  top.forEach((x, k) => {
    const { s, i, y, f, f1, f3, mcap, c } = x;
    const px = s.px, a = px.a;
    const fwd = (h) => { const j = s.idx.get(addM(ym, h)); return j != null ? a[j] / a[i] - 1 : null; };
    const avgA = f1 && f1.assets > 0 && f.assets > 0 ? (f.assets + f1.assets) / 2 : f.assets;
    const fcf = f.ocf != null && f.capex != null ? f.ocf - f.capex : null;
    const ev = mcap + (f.debt || 0) - (f.cash || 0) - (f.sti || 0);
    const dTTM = divSum(s, addM(ym, -12), ym), dNext = divSum(s, ym, addM(ym, 12));
    const hasNext = s.idx.get(addM(ym, 12)) != null;
    const roa = ratio(f.ni, avgA), roa1 = f1 ? ratio(f1.ni, f1.assets) : null;
    const lev = ratio(f.debt, f.assets), lev1 = f1 ? ratio(f1.debt, f1.assets) : null;
    const cr = ratio(f.ca, f.cl), cr1 = f1 ? ratio(f1.ca, f1.cl) : null;
    const gm = ratio(f.gp, f.rev), gm1 = f1 ? ratio(f1.gp, f1.rev) : null;
    const ato = ratio(f.rev, f.assets), ato1 = f1 ? ratio(f1.rev, f1.assets) : null;
    // 피오트로스키 F-score — 9개 중 7개 이상 계산 가능할 때 9점 만점으로 환산
    const sig = [roa != null ? roa > 0 : null, f.ocf != null ? f.ocf > 0 : null, roa != null && roa1 != null ? roa > roa1 : null,
      f.ocf != null && f.ni != null ? f.ocf > f.ni : null, lev != null && lev1 != null ? lev <= lev1 : null, cr != null && cr1 != null ? cr > cr1 : null,
      f1 && f.sh && f1.sh ? f.sh <= f1.sh * 1.005 : null, gm != null && gm1 != null ? gm > gm1 : null, ato != null && ato1 != null ? ato > ato1 : null];
    const nOk = sig.filter((v) => v != null).length;
    const F9 = nOk >= 7 ? Math.round(sig.filter((v) => v === true).length * 9 / nOk) : null;
    const roas = [0, 1, 2, 3, 4].map((k) => { const g = s.fu[y - k]; return g ? ratio(g.ni, g.assets) : null; });
    // 배당 연속 비감소 연수(완료된 달력 연도 기준)
    let streak = 0;
    const yNow = Number(ym.slice(0, 4)) - 1;
    for (let yy = yNow; yy > 2010; yy--) {
      const d0 = divSum(s, (yy - 1) + "-12", yy + "-12"), dp = divSum(s, (yy - 2) + "-12", (yy - 1) + "-12");
      if (d0 > 0 && d0 >= dp * 0.99) streak++; else break;
    }
    const d36 = divSum(s, addM(ym, -48), addM(ym, -36));
    const mret = []; for (let k = 1; k <= 12; k++) { const j0 = s.idx.get(addM(ym, -k)), j1 = s.idx.get(addM(ym, -k + 1)); if (j0 != null && j1 != null) mret.push(a[j1] / a[j0] - 1); }
    const j12 = s.idx.get(addM(ym, -12)), j1m = s.idx.get(addM(ym, -1));
    rows.push([s.t, ym, Math.round(mcap / 1e6), k + 1, s.fin ? 1 : 0, f.op != null ? (f.op > 0 ? 1 : 0) : null, f.ni != null ? (f.ni > 0 ? 1 : 0) : null,
      ratio(f.ni, mcap), ratio(f.eq, mcap), ratio(f.rev, mcap), fcf != null ? fcf / mcap : null, ev > 0 && f.op != null ? f.op / ev : null, c > 0 ? dTTM / c : null,
      ((f.div || 0) + (f.buy || 0) - (f.iss || 0)) / mcap,
      f.eq > 0 && f.ni != null ? f.ni / f.eq : null, roa, ratio(f.gp, f.assets), ratio(f.op, f.assets), ratio(f.ocf, f.assets),
      f.op != null && (f.eq || 0) + (f.debt || 0) - (f.cash || 0) - (f.sti || 0) > 0 ? f.op * 0.78 / ((f.eq || 0) + (f.debt || 0) - (f.cash || 0) - (f.sti || 0)) : null,
      f.ni != null && f.ocf != null && avgA > 0 ? (f.ni - f.ocf) / avgA : null, lev, F9, sd(roas),
      f1 ? gr(f.rev, f1.rev) : null, f3 && f3.rev > 0 && f.rev > 0 ? Math.pow(f.rev / f3.rev, 1 / 3) - 1 : null, f1 ? gr(f.op, f1.op) : null,
      roa != null && roa1 != null ? roa - roa1 : null, gm != null && gm1 != null ? gm - gm1 : null, f1 ? gr(f.assets, f1.assets) : null, f1 ? gr(f.sh, f1.sh) : null,
      f.div != null && f.ni > 0 ? f.div / f.ni : null, dTTM > 0 && d36 > 0 ? Math.pow(dTTM / d36, 1 / 3) - 1 : null, dTTM > 0 ? streak : null,
      fcf != null && f.div > 0 ? fcf / f.div : null,
      j12 != null && j1m != null ? a[j1m] / a[j12] - 1 : null, sd(mret),
      fwd(1), fwd(3), fwd(6), fwd(12), dTTM > 0 && hasNext ? (dNext < dTTM * 0.9 ? 1 : 0) : null]);
  });
  if (ym.endsWith("-12")) log(ym + " 종목 " + top.length);
}
const r6 = (v) => (typeof v === "number" && isFinite(v) ? +v.toPrecision(5) : v);
L.writeJson(path.join(US, "panel.json"), { fields: FIELDS, rows: rows.map((r) => r.map(r6)) });
log("패널 " + rows.length + "행 → " + path.join(US, "panel.json"));
