#!/usr/bin/env node
// 주제 기준 연구 — 미국 데이터 수집(2026-10-17). 결과·결정은 docs/HISTORY.md '주제 기준 연구'.
// 사용: node scripts/research/theme/fetch-us.js <캐시 폴더>   (저장소 밖 — 세션 scratchpad 권장, 재실행하면 받은 것은 건너뛴다)
//   1) 유니버스: 나스닥 전 종목 스크리너(현재 상장 — 상장폐지 종목은 빠진다: 생존편향)
//   2) 티커 → CIK: SEC 검색(efts), 초당 7회
//   3) SEC XBRL frames: 연간(CY2009~CY2025) 손익·현금흐름·주주환원, 연말 잔액(CY20xxQ4I) — 전 상장사 한 번에
//   4) 야후 월봉(2010-01~): 수정종가(분할+배당 → 총수익률)·종가(분할 수정)·배당·분할 — CIK 가 잡힌 종목만
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("./lib");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const US = path.join(DIR, "us");
fs.mkdirSync(path.join(US, "frames"), { recursive: true });
fs.mkdirSync(path.join(US, "px"), { recursive: true });
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const YEARS = []; for (let y = 2009; y <= 2025; y++) YEARS.push(y);
const DUR = [
  "RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "SalesRevenueNet", "RevenueFromContractWithCustomerIncludingAssessedTax", "SalesRevenueGoodsNet",
  "GrossProfit", "CostOfRevenue", "CostOfGoodsAndServicesSold", "CostOfGoodsSold",
  "OperatingIncomeLoss", "NetIncomeLoss", "ProfitLoss", "NetIncomeLossAvailableToCommonStockholdersBasic", "NetCashProvidedByUsedInOperatingActivities",
  "PaymentsToAcquirePropertyPlantAndEquipment", "PaymentsToAcquireProductiveAssets", "PaymentsForCapitalImprovements", "PaymentsToDevelopSoftware",
  "PaymentsOfDividends", "PaymentsOfDividendsCommonStock", "PaymentsForRepurchaseOfCommonStock", "ProceedsFromIssuanceOfCommonStock",
  "ResearchAndDevelopmentExpense",
];
const SHARES = ["WeightedAverageNumberOfDilutedSharesOutstanding", "WeightedAverageNumberOfShareOutstandingBasicAndDiluted", "WeightedAverageNumberOfSharesOutstandingBasic"];
const INST = [
  "Assets", "AssetsCurrent", "LiabilitiesCurrent", "Liabilities", "StockholdersEquity", "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
  "CashAndCashEquivalentsAtCarryingValue", "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents", "ShortTermInvestments", "MarketableSecuritiesCurrent",
  "LongTermDebt", "LongTermDebtNoncurrent", "LongTermDebtCurrent", "DebtCurrent", "ShortTermBorrowings",
  "LongTermDebtAndCapitalLeaseObligations", "LongTermDebtAndCapitalLeaseObligationsCurrent", "LineOfCredit", "LongTermLineOfCredit", "SeniorNotes", "ConvertibleNotesPayable",
];

(async () => {
  // 1) 유니버스
  const uFile = path.join(US, "universe.json");
  let uni = L.readJson(uFile, null);
  if (!uni) {
    const j = await L.getJson("https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=10000&offset=0&download=true", L.DESKTOP, ["-H", "Accept: application/json"]);
    const rows = (j && j.data && (j.data.rows || (j.data.table && j.data.table.rows))) || [];
    uni = rows.filter((r) => r.symbol && !/[\^/]/.test(r.symbol))
      .map((r) => ({ t: r.symbol, name: r.name, mcap: L.num(r.marketCap), sector: r.sector, industry: r.industry, country: r.country }));
    L.writeJson(uFile, uni);
  }
  log("유니버스 " + uni.length);

  // 2) CIK
  const cFile = path.join(US, "cik.json");
  const cik = L.readJson(cFile, {});
  const todo = uni.filter((u) => !(u.t in cik));
  const lim = L.rateLimiter(7);
  let n = 0;
  await L.mapLimit(todo, 6, async (u) => {
    await lim();
    const j = await L.getJson("https://efts.sec.gov/LATEST/search-index?keysTyped=" + encodeURIComponent(u.t), L.SEC_UA, null, 2);
    const hits = (j && j.hits && j.hits.hits) || [];
    const want = u.t.toUpperCase().replace(".", "-");
    let id = null;
    for (const h of hits) {
      const tk = String((h._source && h._source.tickers) || "").toUpperCase().split(/[,\s]+/).map((x) => x.replace(".", "-"));
      if (tk.includes(want)) { id = Number(h._id); break; }
    }
    cik[u.t] = id;
    if (++n % 500 === 0) { L.writeJson(cFile, cik); log("CIK " + n + "/" + todo.length); }
  });
  L.writeJson(cFile, cik);
  log("CIK 매핑 " + Object.values(cik).filter(Boolean).length + "/" + uni.length);

  // 3) frames
  const jobs = [];
  DUR.forEach((c) => YEARS.forEach((y) => jobs.push({ c, u: "USD", p: "CY" + y })));
  SHARES.forEach((c) => YEARS.forEach((y) => jobs.push({ c, u: "shares", p: "CY" + y })));
  INST.forEach((c) => YEARS.forEach((y) => jobs.push({ c, u: "USD", p: "CY" + y + "Q4I" })));
  const flim = L.rateLimiter(6);
  let fdone = 0;
  await L.mapLimit(jobs, 4, async (jb) => {
    const f = path.join(US, "frames", jb.c + "__" + jb.p + ".json");
    if (fs.existsSync(f)) { fdone++; return; }
    await flim();
    const j = await L.getJson("https://data.sec.gov/api/xbrl/frames/us-gaap/" + jb.c + "/" + jb.u + "/" + jb.p + ".json", L.SEC_UA, null, 3);
    const m = {};
    ((j && j.data) || []).forEach((d) => { m[d.cik] = [d.val, d.end || null, d.accn || null]; });   // 접수번호 — 주식 수 분할 보정에 쓴다
    L.writeJson(f, m);
    if (++fdone % 50 === 0) log("frames " + fdone + "/" + jobs.length);
  });
  log("frames 완료 " + jobs.length);

  // 회사명 → CIK (지주회사 재편으로 티커가 새 CIK 로 옮겨 간 경우 옛 CIK 를 이름으로 찾는다 — 예: XOM 2026 ExxonMobil Holdings)
  const nFile = path.join(US, "names.json");
  if (!fs.existsSync(nFile)) {
    const names = {};
    for (const p of ["CY2012Q4I", "CY2016Q4I", "CY2020Q4I", "CY2024Q4I"]) {
      await flim();
      const j = await L.getJson("https://data.sec.gov/api/xbrl/frames/us-gaap/Assets/USD/" + p + ".json", L.SEC_UA, null, 3);
      ((j && j.data) || []).forEach((d) => { names[d.cik] = d.entityName; });
    }
    L.writeJson(nFile, names);
    log("회사명 " + Object.keys(names).length);
  }

  // 4) 야후 월봉 — CIK 가 있는 종목(같은 CIK 여러 티커는 모두 받고 패널에서 하나만 쓴다)
  const syms = uni.filter((u) => cik[u.t]).map((u) => u.t);
  let pdone = 0, pfail = 0;
  await L.mapLimit(syms, 6, async (t) => {
    const f = path.join(US, "px", t + ".json");
    if (fs.existsSync(f)) { pdone++; return; }
    const o = await L.yahooMonthly(t.replace(".", "-"));
    if (!o) { pfail++; L.writeJson(f, { sym: t, none: true }); return; }
    L.writeJson(f, o);
    if (++pdone % 250 === 0) log("야후 " + pdone + "/" + syms.length + " (실패 " + pfail + ")");
  });
  log("야후 완료 " + pdone + " · 실패 " + pfail);
})().catch((e) => { console.error("fetch-us 실패:", e && e.stack || e); process.exit(1); });
