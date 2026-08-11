#!/usr/bin/env node
// upside(컨센서스 목표가 상승여력) 예측력 백테스트 — 탈편향 변형의 효과 검증 (LLM 토큰 0)
//
// 왜: pickScore 는 upside 에 ~50% 가중을 주는데, 애널리스트 목표가의 낙관 편향·하향 지연
//     때문에 upside 가 실제 기대수익의 좋은 대리변수인지는 검증된 적이 없었다(2026-08-11 감사).
//     감사가 제안한 탈편향(중앙값 차감·가치함정 페널티·상한 조정)이 예측력을 올리는지 잰다.
//
// 방법: history.js 스냅샷(일별 목표가 tp — 그 시점에 실제로 저장돼 있던 값이라 룩어헤드 없음)의
//       각 (날짜, 국가) 횡단면에서 upside 와 +5/+10/+21거래일 사후 수익률(Yahoo 종가)의
//       Spearman IC, 그리고 상위 3종목 포트폴리오 수익률을 변형별로 비교한다.
//       가치함정 판정용 장기(월봉) 신호는 결정론 엔진으로 그 시점 봉까지만 잘라 재현한다.
//
// 비교 변형:
//   raw       — upside 그대로 (현행 랭킹의 근간)
//   capped    — min(upside, 60) (현행 pickScore 의 60% 상한)
//   trapAdj   — 장기 신호 매도 이하면 upside − 18%p (배포된 가치함정 감점 -0.15 와 등가 스케일)
//   centered  — upside − 같은 (날짜,국가) 중앙값. 국가 내 순위는 raw 와 동일(순위 불변)하므로
//               국가 내 IC 는 같고, 국가·날짜를 합쳐 쓸 때(pooled)만 차이가 난다 — 그 효과를 잰다.
//
// 한계: 목표가 이력이 90일 보존이라 표본이 약 5주(35일)다. 장기 지평은 검증 불가하고
//       단일 시장 국면(7월 급락→8월 반등)에 묶여 있다 — 결과는 참고 신호이지 확정이 아니다.
//
// 사용법: node scripts/backtest-upside.js [--out data/backtest-upside.json]

const fs = require("fs");
const path = require("path");
const TA = require("./lib-ta.js");

const ROOT = path.join(__dirname, "..");
const OUT = (() => {
  const i = process.argv.indexOf("--out");
  return i >= 0 && process.argv[i + 1] ? path.resolve(process.argv[i + 1]) : path.join(ROOT, "data", "backtest-upside.json");
})();
const HORIZONS = [5, 10, 21];   // 거래일
const MIN_XS = 8;               // 횡단면 최소 종목 수
const TRAP_PENALTY = 18;        // %p — pickScore 의 trap −0.15 ÷ upside 가중 0.5 × 60 스케일

function loadHistory() {
  global.window = {};
  require(path.join(ROOT, "data", "history.js"));
  return global.window.STOCK_HISTORY || [];
}
function symbolFor(c, t) {
  if (c === "korea") return null;   // 시장 구분이 스냅샷에 없어 recommendations 로 보완
  return t === "BRK.B" ? "BRK-B" : t;
}
function loadMarkets() {
  global.window = {};
  delete require.cache[require.resolve(path.join(ROOT, "data", "recommendations.js"))];
  require(path.join(ROOT, "data", "recommendations.js"));
  const D = global.window.STOCK_DATA || {};
  const m = {};
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => { if (!m[s.ticker]) m[s.ticker] = s.market; }));
  return m;
}

const sleepMs = (ms) => new Promise((res) => setTimeout(res, ms));
async function fetchRows(symbol) {
  for (let i = 0; i < 3; i++) {
    const rows = await fetchRowsOnce(symbol);
    if (rows) return rows;
    if (i < 2) await sleepMs(400 * Math.pow(2, i));
  }
  return null;
}
async function fetchRowsOnce(symbol) {
  if (typeof fetch !== "function") return null;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 10000);
  let j;
  try {
    const r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(symbol) +
      "?interval=1d&range=5y", { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
    if (!r.ok) return null;
    j = await r.json();
  } catch (_e) { return null; }
  finally { clearTimeout(to); }
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  if (!res || !res.indicators || !res.indicators.quote || !res.indicators.quote[0]) return null;
  const q = res.indicators.quote[0], ts = res.timestamp || [], rows = [];
  const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000;
  for (let i = 0; i < (q.close || []).length; i++) {
    if (q.close[i] == null) continue;
    rows.push({ t: ts[i], d: new Date(ts[i] * 1000 + off).toISOString().slice(0, 10), close: q.close[i],
      high: q.high && q.high[i] != null ? q.high[i] : q.close[i],
      low: q.low && q.low[i] != null ? q.low[i] : q.close[i] });
  }
  return rows.length >= 300 ? rows : null;
}
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

// Spearman 순위상관 — 동순위는 평균 순위
function spearman(x, y) {
  const n = x.length;
  if (n < 3) return null;
  const rank = (a) => {
    const idx = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]);
    const r = new Array(n);
    let i = 0;
    while (i < n) {
      let j = i; while (j + 1 < n && idx[j + 1][0] === idx[i][0]) j++;
      const avg = (i + j) / 2 + 1;
      for (let k = i; k <= j; k++) r[idx[k][1]] = avg;
      i = j + 1;
    }
    return r;
  };
  const rx = rank(x), ry = rank(y);
  const mx = rx.reduce((a, b) => a + b) / n, my = ry.reduce((a, b) => a + b) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) { const a = rx[i] - mx, b = ry[i] - my; num += a * b; dx += a * a; dy += b * b; }
  return dx && dy ? num / Math.sqrt(dx * dy) : null;
}
function meanSe(arr) {
  const v = arr.filter((x) => x != null);
  const n = v.length;
  if (!n) return { n: 0, mean: null, se: null, t: null };
  const mean = v.reduce((a, x) => a + x, 0) / n;
  const sd = n > 1 ? Math.sqrt(v.reduce((a, x) => a + (x - mean) * (x - mean), 0) / (n - 1)) : 0;
  const se = n > 1 ? sd / Math.sqrt(n) : null;
  return { n, mean: +mean.toFixed(4), se: se == null ? null : +se.toFixed(4), t: se ? +(mean / se).toFixed(2) : null };
}

(async () => {
  const H = loadHistory();
  const markets = loadMarkets();
  // 전 스냅샷에 등장한 (국가,티커) 전체 — 편출 종목도 그 시점 표본에는 남긴다(생존편향 완화)
  const seen = {};
  H.forEach((s) => s.stocks.forEach((x) => {
    if (typeof x.tp === "number" && typeof x.p === "number") seen[x.c + ":" + x.t] = x.t;
  }));
  const tickers = Object.keys(seen).map((k) => {
    const [c, t] = k.split(":");
    const mk = markets[t];
    const sym = c === "korea" ? t + (mk === "KOSDAQ" ? ".KQ" : ".KS") : (t === "BRK.B" ? "BRK-B" : t);
    return { key: k, c, t, sym };
  });
  console.log("스냅샷 " + H.length + "일 · 대상 " + tickers.length + "종목 — 일봉 조회 중…");

  const px = {};        // key → rows
  let failed = 0;
  await mapLimit(tickers, 6, async (x) => {
    const rows = await fetchRows(x.sym);
    if (rows) px[x.key] = rows; else failed++;
  });
  console.log("조회 완료 (실패 " + failed + ") — 횡단면 구성 중…");

  // 날짜 인덱스 (같은 날 봉이 없으면 직전 거래일 — 스냅샷은 주말에도 찍힌다)
  const idxCache = {};
  function idxAt(key, date) {
    const rows = px[key]; if (!rows) return -1;
    const ck = key + "|" + date;
    if (ck in idxCache) return idxCache[ck];
    let lo = 0, hi = rows.length - 1, ans = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (rows[m].d <= date) { ans = m; lo = m + 1; } else hi = m - 1; }
    idxCache[ck] = ans;
    return ans;
  }
  // 그 시점 장기(월봉) 신호 — 결정론 엔진으로 재현(가치함정 페널티 검증용)
  const sigCache = {};
  function sigLongAt(key, i) {
    const ck = key + "|" + i;
    if (ck in sigCache) return sigCache[ck];
    const rows = px[key];
    const a = rows && i >= 260 ? TA.analyzeTimeframes(rows.slice(0, i + 1), { dp: 2, srDp: 2 }) : null;
    const s = a ? a.long.signal : null;
    sigCache[ck] = s;
    return s;
  }

  // 변형별 IC·포트폴리오 집계
  const V = ["raw", "capped", "trapAdj"];
  const ic = {}, port = {}, pooled = { raw: { x: [], y: [] }, centered: { x: [], y: [] } };
  ["korea", "us"].forEach((c) => { ic[c] = {}; port[c] = {}; HORIZONS.forEach((h) => {
    ic[c][h] = {}; port[c][h] = {}; V.forEach((v) => { ic[c][h][v] = []; port[c][h][v] = []; }); }); });
  let xsCount = 0;

  H.forEach((snap) => {
    ["korea", "us"].forEach((c) => {
      // 횡단면: 그 날짜 스냅샷의 그 국가 종목 — upside 는 스냅샷의 tp / Yahoo 종가
      const xs = [];
      snap.stocks.forEach((s) => {
        if (s.c !== c || typeof s.tp !== "number") return;
        const key = c + ":" + s.t;
        const i = idxAt(key, snap.date);
        if (i < 0) return;
        const base = px[key][i].close;
        if (!(base > 0)) return;
        const up = (s.tp - base) / base * 100;
        if (!isFinite(up) || Math.abs(up) > 300) return;   // 데이터 오류 가드
        xs.push({ key, i, up, base });
      });
      if (xs.length < MIN_XS) return;
      const med = xs.map((x) => x.up).sort((a, b) => a - b)[Math.floor(xs.length / 2)];
      HORIZONS.forEach((h) => {
        const pts = [];
        xs.forEach((x) => {
          const rows = px[x.key];
          if (x.i + h >= rows.length) return;
          const fwd = (rows[x.i + h].close - x.base) / x.base * 100;
          const sl = sigLongAt(x.key, x.i);
          pts.push({ up: x.up, fwd,
            capped: Math.min(x.up, 60),
            trapAdj: x.up - (x.up >= 30 && (sl === "매도" || sl === "적극매도") ? TRAP_PENALTY : 0),
            centered: x.up - med });
        });
        if (pts.length < MIN_XS) return;
        xsCount++;
        ic[c][h].raw.push(spearman(pts.map((p) => p.up), pts.map((p) => p.fwd)));
        ic[c][h].capped.push(spearman(pts.map((p) => p.capped), pts.map((p) => p.fwd)));
        ic[c][h].trapAdj.push(spearman(pts.map((p) => p.trapAdj), pts.map((p) => p.fwd)));
        // 상위 3 포트폴리오(동률은 티커순 안정 정렬) — 변형별 평균 사후 수익률
        V.forEach((v) => {
          const top = pts.slice().sort((a, b) => b[v === "raw" ? "up" : v] - a[v === "raw" ? "up" : v]).slice(0, 3);
          port[c][h][v].push(top.reduce((a, p) => a + p.fwd, 0) / top.length);
        });
        // 국가·날짜 합산(pooled) — 중앙값 차감이 차이를 만드는 유일한 지점
        if (h === 10) pts.forEach((p) => {
          pooled.raw.x.push(p.up); pooled.raw.y.push(p.fwd);
          pooled.centered.x.push(p.centered); pooled.centered.y.push(p.fwd);
        });
      });
    });
  });

  const report = { snapshots: H.length, tickers: tickers.length, failed, crossSections: xsCount,
    trapPenalty: TRAP_PENALTY, horizons: HORIZONS, note:
    "history.js 목표가 이력(약 5주) 기반 — 표본이 짧고 단일 국면(7월 급락→8월 반등)이라 참고 신호. IC=횡단면 Spearman 순위상관의 날짜 평균, port=상위 3종목 평균 사후수익률(%).",
    ic: {}, portfolio: {}, pooledIC10d: {
      raw: spearman(pooled.raw.x, pooled.raw.y),
      centered: spearman(pooled.centered.x, pooled.centered.y),
      n: pooled.raw.x.length } };
  ["korea", "us"].forEach((c) => {
    report.ic[c] = {}; report.portfolio[c] = {};
    HORIZONS.forEach((h) => {
      report.ic[c][h + "d"] = {}; report.portfolio[c][h + "d"] = {};
      V.forEach((v) => {
        report.ic[c][h + "d"][v] = meanSe(ic[c][h][v]);
        report.portfolio[c][h + "d"][v] = meanSe(port[c][h][v]);
      });
    });
  });

  fs.writeFileSync(OUT, JSON.stringify(report, null, 1) + "\n");
  console.log("\n횡단면 " + xsCount + "개 → " + OUT);
  ["korea", "us"].forEach((c) => {
    console.log("\n[" + c + "]");
    HORIZONS.forEach((h) => {
      const r = report.ic[c][h + "d"], p = report.portfolio[c][h + "d"];
      console.log("  +" + h + "일 IC   raw " + fmt(r.raw) + " · capped " + fmt(r.capped) + " · trapAdj " + fmt(r.trapAdj));
      console.log("        top3  raw " + fmtP(p.raw) + " · capped " + fmtP(p.capped) + " · trapAdj " + fmtP(p.trapAdj));
    });
  });
  console.log("\npooled IC(+10일, 국가·날짜 합산 " + report.pooledIC10d.n + "표본): raw " +
    (report.pooledIC10d.raw == null ? "–" : report.pooledIC10d.raw.toFixed(3)) + " vs centered " +
    (report.pooledIC10d.centered == null ? "–" : report.pooledIC10d.centered.toFixed(3)));
  function fmt(s) { return s.mean == null ? "–" : s.mean.toFixed(3) + "(t=" + s.t + ",n=" + s.n + ")"; }
  function fmtP(s) { return s.mean == null ? "–" : s.mean.toFixed(2) + "%(n=" + s.n + ")"; }
})();
