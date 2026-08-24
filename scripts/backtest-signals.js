#!/usr/bin/env node
// 기술 신호 백테스트 — 5단계 신호 등급이 실제 사후 수익률과 연결되는지 검증 (LLM 토큰 0)
//
// 왜: 이 대시보드의 매수/매도 등급은 지표 투표(lib-ta.js)로 결정론적으로 계산되지만,
//     "적극매수가 매수보다 실제로 나은가"는 한 번도 검증된 적이 없었다(2026-08-11 감사).
//     신호 엔진이 결정론적이고 5년 일봉이 무료로 재조회 가능하므로, 과거 임의 시점의
//     신호를 완벽 재현해 등급별 사후 수익률 표를 만들 수 있다 — 이 스크립트가 그 일을 한다.
//
// 방법: 전 편성 종목의 5년 일봉을 받아, STEP 거래일 간격의 각 시점 t 에 대해
//       rows[0..t] 만으로 analyzeTimeframes 를 계산(룩어헤드 없음 — 그 시점에 알 수 있던
//       봉만 사용)하고, 단기/중기/장기 등급별로 +5/+21/+63 거래일 사후 수익률을 모은다.
//       등급별 평균·표준편차·t값과 '적극매수 − 적극매도' 스프레드를 집계한다.
//
// 한계(결과 해석 시 유의):
//  - 현재 편성 종목만 대상이라 생존편향이 있다(오늘 살아남은 종목의 과거만 본다).
//    등급 간 "상대" 비교에는 영향이 덜하지만 절대 수익률은 부풀려질 수 있다.
//  - 거래비용·슬리피지 미반영. 수정주가(배당 제외 분할만 반영된 Yahoo close) 기준.
//  - 같은 종목의 인접 시점 표본은 독립이 아니라 t값은 참고치다(과신 금지).
//
// 사용법: node scripts/backtest-signals.js [--step 5] [--sample 0=전종목] [--out data/backtest-report.json]

const fs = require("fs");
const path = require("path");
const TA = require("./lib-ta.js");

const ROOT = path.join(__dirname, "..");

function argNum(name, def) {
  const i = process.argv.indexOf("--" + name);
  const v = i >= 0 ? parseInt(process.argv[i + 1], 10) : NaN;
  return Number.isFinite(v) ? v : def;
}
const STEP = argNum("step", 5);          // 신호 평가 간격(거래일) — 5=주 1회
const SAMPLE = argNum("sample", 0);      // 0 이면 전 종목
const OUT = (() => {
  const i = process.argv.indexOf("--out");
  return i >= 0 && process.argv[i + 1] ? path.resolve(process.argv[i + 1]) : path.join(ROOT, "data", "backtest-report.json");
})();
const HORIZONS = [5, 21, 63];            // 사후 수익률 구간(거래일): 1주 / 1개월 / 3개월
// 최소 이력(거래일). 월봉 일목균형표는 78개월(≈1,630거래일)이 있어야 구름이 생기므로,
// WARMUP 을 그만큼 올려야 세 엔진이 '같은 정보량'으로 겨룬다(짧게 잡으면 flow 만 표본 전반부에서
// 일목 블록이 빠진 채 평가돼 비교가 불공정해진다). 대신 10년 미만 상장 종목은 표본에서 빠진다.
const WARMUP = argNum("warmup", 1630);
const GRADES = ["적극매도", "매도", "중립", "매수", "적극매수"];
const ENGINES = ["legacy", "block", "flow"];

function symbolFor(s) {
  if (s.market === "KOSPI") return s.ticker + ".KS";
  if (s.market === "KOSDAQ") return s.ticker + ".KQ";
  return s.ticker === "BRK.B" ? "BRK-B" : s.ticker;
}

function loadStocks() {
  global.window = {};
  delete require.cache[require.resolve(path.join(ROOT, "data", "recommendations.js"))];
  require(path.join(ROOT, "data", "recommendations.js"));
  const D = global.window.STOCK_DATA || {};
  const seen = {}, list = [];
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (!s || !s.ticker || seen[s.ticker]) return;
    seen[s.ticker] = 1;
    list.push({ ticker: s.ticker, symbol: symbolFor(s), country: c, name: s.name });
  }));
  return list;
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
      "?interval=1d&range=10y", { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
    if (!r.ok) return null;
    j = await r.json();
  } catch (_e) { return null; }
  finally { clearTimeout(to); }
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  if (!res || !res.indicators || !res.indicators.quote || !res.indicators.quote[0]) return null;
  const q = res.indicators.quote[0], ts = res.timestamp || [], rows = [];
  for (let i = 0; i < (q.close || []).length; i++) {
    if (q.close[i] == null) continue;
    rows.push({ t: ts[i], close: q.close[i],
      high: q.high && q.high[i] != null ? q.high[i] : q.close[i],
      low: q.low && q.low[i] != null ? q.low[i] : q.close[i],
      vol: q.volume && q.volume[i] != null ? q.volume[i] : null });
  }
  return rows.length >= WARMUP + Math.max.apply(null, HORIZONS) ? rows : null;
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

// 집계 버킷: horizon(기간) → grade(등급) → 수익률 배열
function makeBuckets() {
  const b = {};
  ENGINES.forEach((eng) => {
    b[eng] = {};
    ["short", "mid", "long"].forEach((tf) => {
      b[eng][tf] = {};
      HORIZONS.forEach((h) => { b[eng][tf][h] = {}; GRADES.forEach((g) => { b[eng][tf][h][g] = []; }); });
    });
  });
  return b;
}

function stats(arr) {
  const n = arr.length;
  if (!n) return { n: 0, mean: null, sd: null, t: null };
  const mean = arr.reduce((a, x) => a + x, 0) / n;
  const sd = n > 1 ? Math.sqrt(arr.reduce((a, x) => a + (x - mean) * (x - mean), 0) / (n - 1)) : 0;
  const t = sd > 0 ? mean / (sd / Math.sqrt(n)) : null;
  return { n, mean: +mean.toFixed(3), sd: +sd.toFixed(3), t: t == null ? null : +t.toFixed(2) };
}

(async () => {
  let stocks = loadStocks();
  if (SAMPLE > 0) stocks = stocks.slice(0, SAMPLE);
  console.log("백테스트 대상 " + stocks.length + "종목 · 평가 간격 " + STEP + "거래일 · 기간 " + HORIZONS.join("/") + "일");

  const buckets = makeBuckets();
  let done = 0, failed = 0, evals = 0;

  await mapLimit(stocks, 6, async (s) => {
    const rows = await fetchRows(s.symbol);
    if (!rows) { failed++; return; }
    const maxH = Math.max.apply(null, HORIZONS);
    for (let t = WARMUP; t < rows.length - maxH; t += STEP) {
      // 그 시점까지의 봉만으로 신호 계산 — 룩어헤드 없음
      const a = TA.analyzeTimeframes(rows.slice(0, t + 1), { dp: 2, srDp: 2 });
      if (!a) continue;
      evals++;
      const px = rows[t].close;
      HORIZONS.forEach((h) => {
        const fwd = (rows[t + h].close - px) / px * 100;
        [["short", a.short], ["mid", a.mid], ["long", a.long]].forEach(([tf, sig]) => {
          if (!sig) return;
          const byEng = { legacy: sig.sigLegacy, block: sig.sigBlock, flow: sig.sigFlow };
          ENGINES.forEach((eng) => {
            const g = byEng[eng];
            if (g && buckets[eng][tf][h][g]) buckets[eng][tf][h][g].push(fwd);
          });
        });
      });
    }
    done++;
    if (done % 20 === 0) console.log("  …" + done + "/" + stocks.length + "종목 · 평가 " + evals + "회");
  });

  // 집계
  const report = { step: STEP, horizons: HORIZONS, stocks: done, failed, evaluations: evals, note:
    "현재 편성 종목의 10년 일봉에 신호 엔진을 룩어헤드 없이 롤링 적용한 등급별 사후 수익률(%). legacy=19표 동등가중, block=추세·모멘텀·과열 3블록 균형, flow=이평30·일목30·매물대25·보조15 가중. 생존편향·거래비용 미반영 — 등급 간 상대 비교용.", warmup: WARMUP, engines: {} };
  ENGINES.forEach((eng) => {
    report.engines[eng] = {};
    ["short", "mid", "long"].forEach((tf) => {
      report.engines[eng][tf] = {};
      HORIZONS.forEach((h) => {
        const byGrade = {};
        GRADES.forEach((g) => { byGrade[g] = stats(buckets[eng][tf][h][g]); });
        const top = byGrade["적극매수"], bot = byGrade["적극매도"];
        byGrade.spread = (top.mean != null && bot.mean != null) ? +(top.mean - bot.mean).toFixed(3) : null;
        const means = GRADES.map((g) => byGrade[g].mean).filter((m) => m != null);
        byGrade.monotonic = means.length === GRADES.length && means.every((m, i) => i === 0 || m >= means[i - 1]);
        report.engines[eng][tf][h + "d"] = byGrade;
      });
    });
  });

  fs.writeFileSync(OUT, JSON.stringify(report, null, 1) + "\n");
  console.log("\n종목 " + done + " (실패 " + failed + ") · 신호 평가 " + evals + "회 → " + OUT);
  ENGINES.forEach((eng) => {
    console.log("\n══ 엔진: " + eng + " ══");
    ["short", "mid", "long"].forEach((tf) => {
      console.log("[" + tf + "]");
      HORIZONS.forEach((h) => {
        const r = report.engines[eng][tf][h + "d"];
        const row = GRADES.map((g) => g + " " + (r[g].mean == null ? "–" : r[g].mean + "%") + "(n=" + r[g].n + ")").join(" · ");
        console.log("  +" + h + "일: " + row);
        console.log("        스프레드 " + (r.spread == null ? "–" : r.spread + "%p") + " · 단조성 " + (r.monotonic ? "O" : "X"));
      });
    });
  });
})();
