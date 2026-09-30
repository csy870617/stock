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
const ENGINES = ["legacy", "block", "flow", "mtf"];

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
  const off = ((res.meta && res.meta.gmtoffset) || 0) * 1000;   // 거래소 현지 날짜(지수와 날짜 맞춤용)
  for (let i = 0; i < (q.close || []).length; i++) {
    if (q.close[i] == null) continue;
    rows.push({ t: ts[i], d: new Date(ts[i] * 1000 + off).toISOString().slice(0, 10), close: q.close[i],
      high: q.high && q.high[i] != null ? q.high[i] : q.close[i],
      low: q.low && q.low[i] != null ? q.low[i] : q.close[i],
      vol: q.volume && q.volume[i] != null ? q.volume[i] : null });
  }
  return rows;
}

// ── 시장 대비(초과수익) 기준 — 같은 나라 대표 지수 ─────────────────────────────
// 절대수익률만 보면 '적극매수'가 단지 상승장에 많이 나온 등급이어도 좋아 보인다(국면·베타 오염).
// 신호가 종목을 '고르는' 힘이 있는지는 같은 기간 지수 수익률을 뺀 초과수익으로 봐야 한다.
const BENCH = { korea: "^KS11", us: "^GSPC" };
function benchLookup(rows) {
  const ds = rows.map((r) => r.d), cs = rows.map((r) => r.close);
  // d 이하 가장 가까운 거래일 종가(휴장일 차이 흡수)
  const f = (d) => {
    let lo = 0, hi = ds.length - 1, ans = -1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (ds[mid] <= d) { ans = mid; lo = mid + 1; } else hi = mid - 1; }
    return ans >= 0 ? cs[ans] : null;
  };
  // 평가일 달력 — 지수 거래일 STEP 간격. 모든 종목을 '같은 날'에 평가해야 날짜별 횡단면(종목 간 순위)
  // 비교가 가능하다(종목마다 상장 길이가 달라 t 인덱스로 뽑으면 평가일이 서로 어긋난다).
  f.evalDates = new Set(ds.filter((_, i) => (ds.length - 1 - i) % STEP === 0));
  return f;
}

// ── 개선 가설(변형) — 같은 시점·같은 표본에서 기간별 점수를 조합만 바꿔 비교한다 ──
// base: 현행(기간별 flow 점수 그대로).
// mtf : 다중 시간프레임 합류 — 짧은 기간 신호를 상위 기간 추세 쪽으로 기울인다.
//       (단기 = 0.5·일봉 + 0.3·주봉 + 0.2·월봉, 중기 = 0.7·주봉 + 0.3·월봉, 장기 = 월봉)
// gate: 상위 추세 거스름 차단 — 상위 기간이 뚜렷한 반대 방향(|점수|≥0.15)이면 하위 기간의
//       같은 방향 신호를 중립 경계(±0.149)로 눌러 '하락 추세 속 반등 매수' 류를 줄인다.
const VARIANTS = {
  base: (s, m, l) => ({ short: s, mid: m, long: l }),
  mtf: (s, m, l) => ({ short: wsum([[s, 0.5], [m, 0.3], [l, 0.2]]), mid: wsum([[m, 0.7], [l, 0.3]]), long: l }),
  gate: (s, m, l) => ({ short: gateBy(s, m), mid: gateBy(m, l), long: l }),
};
function wsum(pairs) {
  let s = 0, w = 0;
  pairs.forEach(([v, k]) => { if (v != null && isFinite(v)) { s += v * k; w += k; } });
  return w ? s / w : null;
}
function gateBy(x, up) {
  if (x == null || up == null) return x;
  if (up <= -0.15 && x > 0.149) return 0.149;
  if (up >= 0.15 && x < -0.149) return -0.149;
  return x;
}
// Spearman 순위상관(동순위 평균순위) — 등급 양 끝 표본에 좌우되는 스프레드보다 안정적인 예측력 척도
function spearman(xs, ys, minN) {
  const n = xs.length;
  if (n < (minN || 30)) return null;
  const rank = (a) => {
    const idx = a.map((v, i) => i).sort((i, j) => a[i] - a[j]), r = new Array(n);
    for (let i = 0; i < n;) {
      let j = i; while (j + 1 < n && a[idx[j + 1]] === a[idx[i]]) j++;
      const avg = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k]] = avg; i = j + 1;
    }
    return r;
  };
  const rx = rank(xs), ry = rank(ys), mx = (n + 1) / 2;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) { num += (rx[i] - mx) * (ry[i] - mx); dx += (rx[i] - mx) ** 2; dy += (ry[i] - mx) ** 2; }
  return dx && dy ? +(num / Math.sqrt(dx * dy)).toFixed(4) : null;
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
  const records = [];   // 시점별 {d, sc:{s,m,l}, fwd:{h}, ex:{h}} — 초과수익·IC·표본 분할 검증용

  const bench = {};
  for (const c of Object.keys(BENCH)) {
    const b = await fetchRows(BENCH[c]);
    bench[c] = b && b.length ? benchLookup(b) : null;
    if (!bench[c]) console.log("  ⚠ 기준 지수 " + BENCH[c] + " 조회 실패 — " + c + " 초과수익 생략");
  }

  await mapLimit(stocks, 6, async (s) => {
    const rows = await fetchRows(s.symbol);
    if (!rows || rows.length < WARMUP + Math.max.apply(null, HORIZONS)) { failed++; return; }
    const bx = bench[s.country];
    const maxH = Math.max.apply(null, HORIZONS);
    for (let t = WARMUP; t < rows.length - maxH; t++) {
      // 평가일: 지수 달력의 STEP 간격 날짜(횡단면 정렬). 지수를 못 받았으면 종전처럼 종목별 STEP 간격.
      if (bx ? !bx.evalDates.has(rows[t].d) : (t - WARMUP) % STEP !== 0) continue;
      // 그 시점까지의 봉만으로 신호 계산 — 룩어헤드 없음
      const a = TA.analyzeTimeframes(rows.slice(0, t + 1), { dp: 2, srDp: 2 });
      if (!a) continue;
      evals++;
      const px = rows[t].close;
      const rec = { c: s.country, d: rows[t].d, sc: { s: a.short.scoreFlow, m: a.mid.scoreFlow, l: a.long.scoreFlow }, fwd: {}, ex: {} };
      const b0 = bx ? bx(rows[t].d) : null;
      HORIZONS.forEach((h) => {
        const fwd = (rows[t + h].close - px) / px * 100;
        rec.fwd[h] = fwd;
        const b1 = bx ? bx(rows[t + h].d) : null;
        rec.ex[h] = (b0 && b1) ? fwd - (b1 - b0) / b0 * 100 : null;
        [["short", a.short], ["mid", a.mid], ["long", a.long]].forEach(([tf, sig]) => {
          if (!sig) return;
          const byEng = { legacy: sig.sigLegacy, block: sig.sigBlock, flow: sig.sigFlow, mtf: sig.sigMtf };
          ENGINES.forEach((eng) => {
            const g = byEng[eng];
            if (g && buckets[eng][tf][h][g]) buckets[eng][tf][h][g].push(fwd);
          });
        });
      });
      records.push(rec);
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

  // ── 정밀 검증(2026-09-30): 시장 대비 초과수익 · 순위상관(IC) · 기간 전/후반 분할 ──
  // 채택 기준(과적합 방지): 변형은 전반·후반 두 구간 모두에서 base 보다 초과수익 IC 가 높아야 한다.
  const dates = records.map((r) => r.d).sort();
  const split = dates.length ? dates[Math.floor(dates.length / 2)] : null;
  const validation = { method: "flow 엔진 점수의 시장 대비 초과수익(국가 대표 지수 차감) 예측력. IC=점수와 사후 초과수익의 Spearman 순위상관. first/second=평가일 중앙값(" + split + ") 기준 전반·후반 분할(표본 밖 안정성 확인).",
    benchmark: BENCH, split, records: records.length, variants: {} };
  Object.keys(VARIANTS).forEach((vk) => {
    validation.variants[vk] = {};
    const scored = records.map((r) => ({ r, v: VARIANTS[vk](r.sc.s, r.sc.m, r.sc.l) }));
    ["short", "mid", "long"].forEach((tf) => {
      validation.variants[vk][tf] = {};
      HORIZONS.forEach((h) => {
        const pts = scored.filter((x) => x.v[tf] != null && x.r.ex[h] != null);
        const byGrade = {};
        GRADES.forEach((g) => { byGrade[g] = stats(pts.filter((x) => TA.grade(x.v[tf]) === g).map((x) => x.r.ex[h])); });
        const top = byGrade["적극매수"], bot = byGrade["적극매도"];
        const means = GRADES.map((g) => byGrade[g].mean);
        // 횡단면 IC: 같은 날·같은 나라 종목들 사이에서 '신호가 높은 종목이 이후 시장을 더 이겼나'.
        // 날짜별 Spearman 을 평균한다 — 국면(상승장·하락장)이 섞이지 않는, 종목 선별력의 표준 척도.
        const xsIC = (arr) => {
          const g = {};
          arr.forEach((x) => { const k = x.r.c + "|" + x.r.d; (g[k] = g[k] || []).push(x); });
          const ics = Object.values(g).map((a) => spearman(a.map((x) => x.v[tf]), a.map((x) => x.r.ex[h]), 8)).filter((v) => v != null);
          if (ics.length < 10) return { mean: null, n: ics.length, t: null, hit: null };
          const mean = ics.reduce((a, b) => a + b, 0) / ics.length;
          const sd = Math.sqrt(ics.reduce((a, b) => a + (b - mean) ** 2, 0) / (ics.length - 1));
          // 지평(h)이 평가 간격(STEP)보다 길면 인접 날짜의 IC 가 겹쳐 독립이 아니다 — t 값을 √(h/STEP) 로 보수 할인
          const tRaw = sd > 0 ? mean / (sd / Math.sqrt(ics.length)) : null;
          const t = tRaw == null ? null : tRaw / Math.sqrt(Math.max(1, h / STEP));
          return { mean: +mean.toFixed(4), n: ics.length, t: t == null ? null : +t.toFixed(2),
                   hit: +(ics.filter((v) => v > 0).length / ics.length).toFixed(3) };
        };
        const all = xsIC(pts), first = xsIC(pts.filter((x) => x.r.d < split)), second = xsIC(pts.filter((x) => x.r.d >= split));
        validation.variants[vk][tf][h + "d"] = {
          n: pts.length,
          exByGrade: byGrade,
          spread: (top.mean != null && bot.mean != null) ? +(top.mean - bot.mean).toFixed(3) : null,
          monotonic: means.every((m, i) => m != null && (i === 0 || m >= means[i - 1])),
          ic: all.mean, icT: all.t, icHit: all.hit, icDates: all.n,
          icFirst: first.mean, icSecond: second.mean,
          pooledIc: spearman(pts.map((x) => x.v[tf]), pts.map((x) => x.r.ex[h])),
        };
      });
    });
  });
  report.validation = validation;

  fs.writeFileSync(OUT, JSON.stringify(report, null, 1) + "\n");
  console.log("\n══ 정밀 검증: 시장 대비 초과수익 기준 (분할일 " + split + ", 평가 " + records.length + "회) ══");
  Object.keys(VARIANTS).forEach((vk) => {
    console.log("[" + vk + "]");
    ["short", "mid", "long"].forEach((tf) => {
      console.log("  " + tf + ": " + HORIZONS.map((h) => {
        const r = validation.variants[vk][tf][h + "d"];
        return "+" + h + "일 IC " + r.ic + "(t " + r.icT + ", 양수 " + r.icHit + ") 전 " + r.icFirst + " / 후 " + r.icSecond + " · 스프레드 " + r.spread + "%p" + (r.monotonic ? " 단조" : "");
      }).join(" | "));
    });
  });
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
