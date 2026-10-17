// 주제 기준 팩터 — 연구(scripts/research/theme)와 발굴 스크린(screen-discovery.js)이 같은 정의를 쓰도록 한 곳에 둔다.
// 정의·검증 결과: scripts/research/theme/README.md(사전 등록) · docs/HISTORY.md '주제 기준 연구'.
// 입력은 연간 재무 지도 fu = {연도: {...}} 와 그 시점 시가총액(같은 통화·단위).
//   한국: 네이버 기업현황(WiseReport) 연간 주요재무 — 금액 억 원, 시총도 억 원
//   미국: SEC XBRL frames — 금액 달러, 시총도 달러
"use strict";

const ratio = (a, b) => (a != null && b != null && b > 0 ? a / b : null);
const gr = (a, b) => (a != null && b != null && b > 0 ? a / b - 1 : null);
const sd = (a) => { const x = a.filter((v) => v != null && isFinite(v)); if (x.length < 3) return null; const m = x.reduce((p, v) => p + v, 0) / x.length; return Math.sqrt(x.reduce((p, v) => p + (v - m) ** 2, 0) / (x.length - 1)); };

// ── 한국: 기업현황 표 → 연도별 재무(12월 결산 실적 열만) ──
function krFundamentals(w) {
  if (!w || !w.cols || !w.rows) return {};
  const g = (names) => { for (const n of names) if (w.rows[n]) return w.rows[n]; return w.cols.map(() => null); };
  const rev = g(["매출액", "영업수익", "순영업수익"]), op = g(["영업이익", "영업이익(발표기준)"]), np = g(["당기순이익(지배)", "당기순이익"]);
  const assets = g(["자산총계"]), liab = g(["부채총계"]), eq = g(["자본총계(지배)", "자본총계"]), ibd = g(["이자발생부채"]);
  const ocf = g(["영업활동현금흐름"]), capex = g(["CAPEX"]), fcf = g(["FCF"]), dps = g(["현금DPS(원)"]), payout = g(["현금배당성향(%)"]), sh = g(["발행주식수(보통주)"]);
  const fu = {};
  w.cols.forEach((c, i) => {
    if (c.est) return;
    const y = Number(c.title.slice(0, 4)), mo = Number(c.title.slice(5, 7));
    if (mo !== 12) return;
    fu[y] = { rev: rev[i], op: op[i], np: np[i], assets: assets[i], liab: liab[i], eq: eq[i], ibd: ibd[i], ocf: ocf[i], capex: capex[i], fcf: fcf[i],
      dps: dps[i], payout: payout[i], sh: sh[i], divTot: dps[i] != null && sh[i] ? dps[i] * sh[i] / 1e8 : null };
  });
  return fu;
}
// 한국 팩터(FY y 기준, 시총 mcap 억 원). MOM·VOL 같은 가격 지표는 호출 쪽에서 더한다.
function krFactorsAt(fu, y, mcap) {
  const f = fu[y], f1 = fu[y - 1], f3 = fu[y - 3];
  if (!f || !(mcap > 0)) return null;
  const avgA = f1 && f1.assets > 0 && f.assets > 0 ? (f.assets + f1.assets) / 2 : f.assets;
  const roa = ratio(f.np, avgA), roa1 = f1 ? ratio(f1.np, f1.assets) : null;
  const lev = ratio(f.liab, f.assets), lev1 = f1 ? ratio(f1.liab, f1.assets) : null;
  const opm = ratio(f.op, f.rev), opm1 = f1 ? ratio(f1.op, f1.rev) : null;
  const ato = ratio(f.rev, f.assets), ato1 = f1 ? ratio(f1.rev, f1.assets) : null;
  const shG = f1 && f1.sh > 0 && f.sh > 0 ? f.sh / f1.sh : null;
  const iss = shG != null && shG < 1.8 && shG > 0.55 ? shG - 1 : null;   // 액면분할·무상증자 급변은 희석으로 보지 않는다
  // F-score(한국판 8신호 — 유동비율 없음, 매출총이익률 대신 영업이익률) → 9점 만점 환산
  const sig = [roa != null ? roa > 0 : null, f.ocf != null ? f.ocf > 0 : null, roa != null && roa1 != null ? roa > roa1 : null,
    f.ocf != null && f.np != null ? f.ocf > f.np : null, lev != null && lev1 != null ? lev <= lev1 : null, iss != null ? iss <= 0.005 : null,
    opm != null && opm1 != null ? opm > opm1 : null, ato != null && ato1 != null ? ato > ato1 : null];
  const nOk = sig.filter((v) => v != null).length;
  let streak = 0; for (let yy = y; fu[yy] && fu[yy - 1]; yy--) { const d0 = fu[yy].divTot, dp = fu[yy - 1].divTot; if (d0 > 0 && dp != null && d0 >= dp * 0.99) streak++; else break; }
  const roas = [0, 1, 2, 3, 4].map((k) => { const g2 = fu[y - k]; return g2 ? ratio(g2.np, g2.assets) : null; });
  return {
    opPos: f.op != null ? (f.op > 0 ? 1 : 0) : null, niPos: f.np != null ? (f.np > 0 ? 1 : 0) : null,
    EP: ratio(f.np, mcap), BP: ratio(f.eq, mcap), SP: ratio(f.rev, mcap), FCFP: f.fcf != null ? f.fcf / mcap : null,
    EBITEV: f.op != null ? f.op / (mcap + (f.ibd || 0)) : null, DY: f.divTot != null ? f.divTot / mcap : null,
    ROE: f.eq > 0 && f.np != null ? f.np / f.eq : null, ROA: roa, OPA: ratio(f.op, f.assets), CFOA: ratio(f.ocf, f.assets),
    ROIC: f.op != null && (f.eq || 0) + (f.ibd || 0) > 0 ? f.op * 0.78 / ((f.eq || 0) + (f.ibd || 0)) : null,
    ACC: f.np != null && f.ocf != null && avgA > 0 ? (f.np - f.ocf) / avgA : null, LEV: lev,
    F: nOk >= 6 ? Math.round(sig.filter((v) => v === true).length * 9 / nOk) : null, SROA: sd(roas),
    SG1: f1 ? gr(f.rev, f1.rev) : null, SG3: f3 && f3.rev > 0 && f.rev > 0 ? Math.pow(f.rev / f3.rev, 1 / 3) - 1 : null, OPG: f1 ? gr(f.op, f1.op) : null,
    DROA: roa != null && roa1 != null ? roa - roa1 : null, DGM: opm != null && opm1 != null ? opm - opm1 : null, AG: f1 ? gr(f.assets, f1.assets) : null, ISS: iss,
    PAYOUT: f.payout != null ? f.payout / 100 : null, DGR: f1 && f.divTot > 0 && f1.divTot > 0 ? f.divTot / f1.divTot - 1 : null,
    DSTREAK: f.divTot > 0 ? streak : null, COV: f.fcf != null && f.divTot > 0 ? f.fcf / f.divTot : null,
  };
}

// ── 미국: SEC frames → 연도별 재무 ──
// fv(concept, period, cik) → 값, fe(concept, period, cik) → 기간 끝 날짜. period: "CY2024"(연간)·"CY2024Q4I"(연말 잔액)
const US_REV = ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "SalesRevenueNet", "RevenueFromContractWithCustomerIncludingAssessedTax", "SalesRevenueGoodsNet"];
const US_COGS = ["CostOfRevenue", "CostOfGoodsAndServicesSold", "CostOfGoodsSold"];
const US_CAPEX = ["PaymentsToAcquirePropertyPlantAndEquipment", "PaymentsToAcquireProductiveAssets", "PaymentsForCapitalImprovements"];
const US_DUR = US_REV.concat(US_COGS, US_CAPEX, ["GrossProfit", "OperatingIncomeLoss", "NetIncomeLoss", "NetCashProvidedByUsedInOperatingActivities", "PaymentsToDevelopSoftware",
  "PaymentsOfDividends", "PaymentsOfDividendsCommonStock", "PaymentsForRepurchaseOfCommonStock", "ProceedsFromIssuanceOfCommonStock"]);
const US_SHARES = ["WeightedAverageNumberOfDilutedSharesOutstanding"];
const US_INST = ["Assets", "AssetsCurrent", "LiabilitiesCurrent", "Liabilities", "StockholdersEquity", "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
  "CashAndCashEquivalentsAtCarryingValue", "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents", "ShortTermInvestments", "MarketableSecuritiesCurrent",
  "LongTermDebt", "LongTermDebtNoncurrent", "LongTermDebtCurrent", "DebtCurrent", "ShortTermBorrowings",
  "LongTermDebtAndCapitalLeaseObligations", "LongTermDebtAndCapitalLeaseObligationsCurrent", "LineOfCredit", "LongTermLineOfCredit", "SeniorNotes", "ConvertibleNotesPayable"];
const first = (arr) => { for (const v of arr) if (v != null) return v; return null; };
function usFundamentals(cik, years, fv, fe) {
  let best = null;
  US_REV.forEach((c) => { const n = years.filter((y) => fv(c, "CY" + y, cik) != null).length; if (n && (!best || n > best.n)) best = { c, n }; });
  const out = {};
  for (const y of years) {
    const p = "CY" + y, pi = "CY" + y + "Q4I";
    const rev = best ? (fv(best.c, p, cik) ?? first(US_REV.map((c) => fv(c, p, cik)))) : null;
    const ni = fv("NetIncomeLoss", p, cik), op = fv("OperatingIncomeLoss", p, cik);
    const end = fe("NetIncomeLoss", p, cik) || (best && fe(best.c, p, cik)) || fe("OperatingIncomeLoss", p, cik);
    if (rev == null && ni == null) continue;
    const cogs = first(US_COGS.map((c) => fv(c, p, cik)));
    const gp = fv("GrossProfit", p, cik) ?? (rev != null && cogs != null ? rev - cogs : null);
    const cx = first(US_CAPEX.map((c) => fv(c, p, cik)));
    const v = (c) => fv(c, pi, cik) || 0;
    const debt = Math.max(v("LongTermDebt"), v("LongTermDebtNoncurrent") + v("LongTermDebtCurrent"),
      v("LongTermDebtAndCapitalLeaseObligations") + v("LongTermDebtAndCapitalLeaseObligationsCurrent"), v("SeniorNotes"), v("ConvertibleNotesPayable"))
      + Math.max(v("LongTermLineOfCredit"), v("LineOfCredit")) + v("ShortTermBorrowings") + (v("LongTermDebtCurrent") === 0 && v("LongTermDebt") === 0 ? v("DebtCurrent") : 0);
    out[y] = {
      end, rev, gp, op, ni, ocf: fv("NetCashProvidedByUsedInOperatingActivities", p, cik), capex: cx == null ? null : cx + (fv("PaymentsToDevelopSoftware", p, cik) || 0),
      div: fv("PaymentsOfDividendsCommonStock", p, cik) ?? fv("PaymentsOfDividends", p, cik),
      buy: fv("PaymentsForRepurchaseOfCommonStock", p, cik), iss: fv("ProceedsFromIssuanceOfCommonStock", p, cik),
      sh: fv("WeightedAverageNumberOfDilutedSharesOutstanding", p, cik),
      assets: fv("Assets", pi, cik), ca: fv("AssetsCurrent", pi, cik), cl: fv("LiabilitiesCurrent", pi, cik), liab: fv("Liabilities", pi, cik),
      eq: fv("StockholdersEquity", pi, cik) ?? fv("StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest", pi, cik),
      cash: fv("CashAndCashEquivalentsAtCarryingValue", pi, cik) ?? fv("CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents", pi, cik),
      sti: fv("ShortTermInvestments", pi, cik) ?? fv("MarketableSecuritiesCurrent", pi, cik) ?? 0,
      debt,
    };
  }
  return out;
}
// 미국 팩터(FY y, 시총 mcap 달러). ext = {dy: 최근 12개월 배당수익률, dgr: 배당 3년 연평균 성장, streak: 배당 비감소 연수} — 가격·배당 이력은 호출 쪽 몫
function usFactorsAt(fu, y, mcap, ext) {
  const f = fu[y], f1 = fu[y - 1], f3 = fu[y - 3];
  if (!f || !(mcap > 0)) return null;
  ext = ext || {};
  const avgA = f1 && f1.assets > 0 && f.assets > 0 ? (f.assets + f1.assets) / 2 : f.assets;
  const fcf = f.ocf != null && f.capex != null ? f.ocf - f.capex : null;
  const ev = mcap + (f.debt || 0) - (f.cash || 0) - (f.sti || 0);
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
  const roas = [0, 1, 2, 3, 4].map((k) => { const g = fu[y - k]; return g ? ratio(g.ni, g.assets) : null; });
  const ic = (f.eq || 0) + (f.debt || 0) - (f.cash || 0) - (f.sti || 0);
  return {
    opPos: f.op != null ? (f.op > 0 ? 1 : 0) : null, niPos: f.ni != null ? (f.ni > 0 ? 1 : 0) : null,
    EP: ratio(f.ni, mcap), BP: ratio(f.eq, mcap), SP: ratio(f.rev, mcap), FCFP: fcf != null ? fcf / mcap : null,
    EBITEV: ev > 0 && f.op != null ? f.op / ev : null, DY: ext.dy != null ? ext.dy : null,
    SHY: ((f.div || 0) + (f.buy || 0) - (f.iss || 0)) / mcap,
    ROE: f.eq > 0 && f.ni != null ? f.ni / f.eq : null, ROA: roa, GPA: ratio(f.gp, f.assets), OPA: ratio(f.op, f.assets), CFOA: ratio(f.ocf, f.assets),
    ROIC: f.op != null && ic > 0 ? f.op * 0.78 / ic : null,
    ACC: f.ni != null && f.ocf != null && avgA > 0 ? (f.ni - f.ocf) / avgA : null, LEV: lev,
    F: nOk >= 7 ? Math.round(sig.filter((v) => v === true).length * 9 / nOk) : null, SROA: sd(roas),
    SG1: f1 ? gr(f.rev, f1.rev) : null, SG3: f3 && f3.rev > 0 && f.rev > 0 ? Math.pow(f.rev / f3.rev, 1 / 3) - 1 : null, OPG: f1 ? gr(f.op, f1.op) : null,
    DROA: roa != null && roa1 != null ? roa - roa1 : null, DGM: gm != null && gm1 != null ? gm - gm1 : null, AG: f1 ? gr(f.assets, f1.assets) : null, ISS: f1 ? gr(f.sh, f1.sh) : null,
    PAYOUT: f.div != null && f.ni > 0 ? f.div / f.ni : null, DGR: ext.dgr != null ? ext.dgr : null, DSTREAK: ext.streak != null ? ext.streak : null,
    COV: fcf != null && f.div > 0 ? fcf / f.div : null,
  };
}

module.exports = { krFundamentals, krFactorsAt, usFundamentals, usFactorsAt, US_DUR, US_SHARES, US_INST, US_REV };
