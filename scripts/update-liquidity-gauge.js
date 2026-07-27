#!/usr/bin/env node
// 유동성 게이지 자동 baseline — LLM 토큰 0 (순수 스크립트, refresh-quotes Action에서 실행)
//
// 역할: Yahoo 에서 받을 수 있는 시장 기반 지표(국채금리·일드커브·VIX·신용(HY ETF)·
//       달러·원/달러·코스피 모멘텀)로 미국·한국의 단기(1–3M)·중기(6–12M) 유동성 게이지를
//       "가중 합성 점수 → 5단계"로 결정론적으로 산출해 data/liquidity-auto.js 로 저장한다.
//       GS·블룸버그 금융환경지수(FCI)와 같은 방식(금리+신용+변동성+달러의 합성)이다.
//
// 하이브리드 설계: 이 자동 baseline 은 매일 신선하게 유지된다(무토큰). 반면 거시 이벤트
//       (FOMC·지정학)·내러티브 판단은 기계가 읽지 못하므로, data/liquidity.js(온디맨드,
//       macro-liquidity-monitor 스킬)가 이를 '덮어쓰기/보정'한다. 앱은 온디맨드 값이 있으면
//       그것을 우선 표시하고, 이 baseline 을 항상 함께 보여준다(온디맨드가 없으면 baseline 이 게이지).
//
// 한계: FRED(M2·연준 대차대조표·HY OAS·Core PCE)는 이 환경에서 차단·키 필요라 미포함.
//       금리·신용·변동성·달러 등 '시장이 실시간 반영하는' 유동성 신호만 담는다.
//
// 사용법: node scripts/update-liquidity-gauge.js  [--date YYYY-MM-DD]

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "liquidity-auto.js");
const RANKS = ["매우 부정", "부정", "신중", "우호", "매우 우호"];   // 점수 낮음→높음

function argVal(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : null;
}

// ── Yahoo 3개월 일봉(종가 배열) ──
const sleepMs = (ms) => new Promise((res) => setTimeout(res, ms));

// 야후 간헐 429/5xx 대비 — screen-watch.js 와 동일한 지수 백오프 3회 재시도
async function series(sym) {
  for (let i = 0; i < 3; i++) {
    const a = await seriesOnce(sym);
    if (a) return a;
    if (i < 2) await sleepMs(400 * Math.pow(2, i));
  }
  return null;
}

async function seriesOnce(sym) {
  if (typeof fetch !== "function") return null;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 10000);
  let r;
  try {
    r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) +
      "?interval=1d&range=6mo", { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
  } catch (_e) { clearTimeout(to); return null; }
  clearTimeout(to);
  if (!r.ok) return null;
  let j; try { j = await r.json(); } catch (_e) { return null; }
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  // quote[0] 까지 가드 — 야후가 indicators:{} 또는 quote:[] 를 돌려주면 TypeError 로
  // 프로세스가 죽고, refresh-quotes 워크플로우의 후속 스텝(screen-watch·commit)까지 전멸한다.
  const c = res && res.indicators && res.indicators.quote &&
            res.indicators.quote[0] && res.indicators.quote[0].close;
  if (!c) return null;
  const arr = c.filter((x) => x != null);
  if (arr.length < 25) return null;
  return arr;
}
const last = (a) => a[a.length - 1];
const ago = (a, n) => a[Math.max(0, a.length - 1 - n)];
const chg = (a, n) => { const p = ago(a, n); return p ? (last(a) - p) / p : 0; };

// ── 하위 점수(-2..+2, 양수=유동성 우호) ──
// 임계값은 과거 1년 시계열 롤링 백테스트로 캘리브레이션(v2). 앵커:
//  · VIX: 장기 중앙값 ~17 을 '중립(0)'으로 재중심 — 정상 변동성을 우호로 과대평가하지 않는다.
//  · 10Y: 제약적 레짐(관측범위 3.95~4.67%) 안에서 촘촘히 — 4.2%=중립, 4.5%+=역풍.
//  · 커브: 무반전 구간 판별력 위해 양의 밴드 촘촘히. 음수(역전) 밴드는 레짐 전환 대비 유지.
//  · toRank 중립대는 ±0.35 로 좁혀 게이지가 한 단계에 고착되지 않게 한다.
function sYieldLevel(y) { if (y < 3.8) return 2; if (y < 4.1) return 1; if (y < 4.4) return 0; if (y < 4.7) return -1; return -2; }
function sTrend(chRate, favorFall) { const s = favorFall ? -chRate : chRate; if (s > 0.03) return 2; if (s > 0.01) return 1; if (s > -0.01) return 0; if (s > -0.03) return -1; return -2; }
function sVix(v) { if (v < 13) return 2; if (v < 16) return 1; if (v < 21) return 0; if (v < 27) return -1; return -2; }
function sCredit(ch) { if (ch > 0.015) return 2; if (ch > 0.005) return 1; if (ch > -0.005) return 0; if (ch > -0.02) return -1; return -2; }
function sCurve(spread) { if (spread > 0.8) return 2; if (spread > 0.4) return 1; if (spread > 0.05) return 0; if (spread > -0.3) return -1; return -2; }
function toRank(avg) { if (avg >= 1.2) return 4; if (avg >= 0.35) return 3; if (avg > -0.35) return 2; if (avg > -1.2) return 1; return 0; }
// 급성 주식 드로다운 floor — 월간(20거래일) 폭락은 리스크오프가 지배하는 국면이라,
// FX·신용 개선이 등가로 상쇄해 게이지가 관대해지는 것을 막는다(합성 점수보다 등급을 하향 고정).
//   20일 모멘텀 < -18% → 최소 '매우 부정', < -10% → 최소 '부정'.
function equityFloorRank(rank, mom20) {
  if (mom20 < -0.18) return Math.min(rank, 0);
  if (mom20 < -0.10) return Math.min(rank, 1);
  return rank;
}

// 가중 평균(항목: [라벨, 점수, 가중치])
function composite(items) {
  let s = 0, w = 0;
  items.forEach(([, sc, wt]) => { s += sc * (wt || 1); w += (wt || 1); });
  return w ? s / w : 0;
}
// 드라이버 문구: 감점/가점 큰 항목순으로 요약
function drivers(items, extra) {
  const sorted = items.slice().sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  const sign = (n) => (n > 0 ? "+" : n < 0 ? "−" : "·");
  return sorted.slice(0, 4).map(([lbl, sc]) => lbl + " (" + sign(sc) + Math.abs(sc) + ")").concat(extra || []);
}

function loadPrev() {
  if (!fs.existsSync(OUT)) return null;
  try { global.window = {}; delete require.cache[require.resolve(OUT)]; require(OUT); return global.window.LIQUIDITY_AUTO || null; }
  catch (_e) { return null; }
}

(async () => {
  const asOf = argVal("date") || new Date().toISOString().slice(0, 10);
  const [tnx, irx, vix, hyg, dxy, krw, kospi] = await Promise.all(
    ["^TNX", "^IRX", "^VIX", "HYG", "DX-Y.NYB", "KRW=X", "^KS11"].map(series)
  );

  // 하나라도 핵심 지표가 없으면 이전 baseline 유지(폴백). 이전 파일도 없으면 조용히 생략
  // (일시적 Yahoo 장애가 매일 워크플로우 전체를 실패시키지 않도록).
  if (!tnx || !vix || !hyg || !dxy || !krw || !kospi) {
    const prev = loadPrev();
    if (prev) {
      fs.writeFileSync(OUT, render(prev));
      console.log("liquidity-auto.js: 조회 실패 — 이전 baseline 유지 (" + (prev.asOf || "?") + ")");
    } else {
      console.log("liquidity-auto.js: 조회 실패·이전 파일 없음 — 이번 갱신 생략");
    }
    return;
  }

  const y10 = last(tnx);
  const spread = irx ? (y10 - last(irx)) : 0.3;            // 10Y − 3M 커브(없으면 완만 가정)
  const vixNow = last(vix);
  const hyg20 = chg(hyg, 20), hyg60 = chg(hyg, 60);
  const dxy20 = chg(dxy, 20), dxy60 = chg(dxy, 60);
  const krw20 = chg(krw, 20), krw60 = chg(krw, 60);
  const kospi20 = chg(kospi, 20), kospi60 = chg(kospi, 60);

  // ── 미국 ── 단기=모멘텀·리스크 중심 / 중기=수준·커브 중심
  const usShortItems = [
    ["VIX " + vixNow.toFixed(1), sVix(vixNow), 1],
    ["10Y 추세", sTrend(chg(tnx, 20), true), 1],
    ["HY 신용(20d)", sCredit(hyg20), 1.2],
    ["달러 추세", sTrend(dxy20, true), 0.8],
    ["일드커브", sCurve(spread), 0.8],
  ];
  const usMidItems = [
    ["10Y 수준 " + y10.toFixed(2) + "%", sYieldLevel(y10), 1.3],
    ["일드커브 " + spread.toFixed(2) + "%p", sCurve(spread), 1.2],
    ["HY 신용(60d)", sCredit(hyg60), 1],
    ["달러(60d)", sTrend(dxy60, true), 0.8],
    ["VIX", sVix(vixNow), 0.6],
  ];

  // ── 한국 ── 원/달러·달러·코스피 모멘텀·글로벌 신용/변동성 전이
  const krShortItems = [
    ["원/달러 추세", sTrend(krw20, true), 1.2],
    ["코스피 모멘텀(20d)", sTrend(kospi20, false), 1.2],
    ["글로벌 변동성 VIX", sVix(vixNow), 0.9],
    ["글로벌 신용(20d)", sCredit(hyg20), 0.9],
    ["달러 추세", sTrend(dxy20, true), 0.8],
  ];
  const krMidItems = [
    ["원/달러(60d)", sTrend(krw60, true), 1.1],
    ["코스피 추세(60d)", sTrend(kospi60, false), 1.1],
    ["달러(60d)", sTrend(dxy60, true), 0.9],
    ["글로벌 신용(60d)", sCredit(hyg60), 0.9],
    ["VIX", sVix(vixNow), 0.6],
  ];

  const usShort = composite(usShortItems), usMid = composite(usMidItems);
  const krShort = composite(krShortItems), krMid = composite(krMidItems);

  // 한국 단기 — 코스피 급락 floor 적용(급성 드로다운은 FX 개선으로 상쇄 불가)
  const krShortRank0 = toRank(krShort);
  const krShortRank = equityFloorRank(krShortRank0, kospi20);
  const krDrivers = drivers(krShortItems);
  if (krShortRank < krShortRank0) {
    krDrivers.unshift("⚠ 코스피 급락 floor 발동 (20일 " + (kospi20 * 100).toFixed(0) + "%)");
  }

  const data = {
    asOf: asOf,
    note: "Yahoo 시장지표 기반 자동 baseline(금리·일드커브·VIX·HY신용·달러·원달러·코스피). 거시 이벤트·내러티브는 미반영 — 온디맨드 유동성이 보정.",
    inputs: {
      us10y: y10.toFixed(2), curve: spread.toFixed(2), vix: vixNow.toFixed(1),
      hyg20: (hyg20 * 100).toFixed(1), dxy: last(dxy).toFixed(1), usdkrw: last(krw).toFixed(0)
    },
    us: {
      shortTerm: RANKS[toRank(usShort)], midTerm: RANKS[toRank(usMid)],
      shortScore: +usShort.toFixed(2), midScore: +usMid.toFixed(2),
      drivers: drivers(usShortItems)
    },
    korea: {
      shortTerm: RANKS[krShortRank], midTerm: RANKS[toRank(krMid)],
      shortScore: +krShort.toFixed(2), midScore: +krMid.toFixed(2),
      drivers: krDrivers
    }
  };

  fs.writeFileSync(OUT, render(data));
  console.log("liquidity-auto.js 갱신 (" + asOf + ") — 미국 단기 " + data.us.shortTerm +
    "/중기 " + data.us.midTerm + " · 한국 단기 " + data.korea.shortTerm + "/중기 " + data.korea.midTerm);
})();

function render(data) {
  return "// 유동성 게이지 자동 baseline — scripts/update-liquidity-gauge.js 가 자동 생성 (LLM 토큰 0)\n" +
    "// Yahoo 시장지표(금리·일드커브·VIX·HY신용·달러·원달러·코스피)의 가중 합성 → 5단계.\n" +
    "// 온디맨드 유동성(data/liquidity.js)이 있으면 그것을 우선 표시하고, 이 baseline 을 함께 보여준다.\n" +
    "window.LIQUIDITY_AUTO = " + JSON.stringify(data, null, 1) + ";\n";
}
