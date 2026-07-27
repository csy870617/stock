#!/usr/bin/env node
// 관심종목 후보 스크리닝 — LLM 토큰 0 (순수 스크립트, refresh-quotes Action에서 매일 실행)
//
// 역할: 안전 우량주 유니버스(아래 UNIVERSE)의 Yahoo 일봉을 받아 두 가지 차트 패턴을 계산해
//       data/watch-candidates.js 로 저장한다. LLM 통합 루틴은 이 후보 목록만 읽어
//       컨센서스 목표가·논거를 리서치한 뒤 theme:"watch" 로 편입한다(차트 탐색 비용 0).
//
//   ① 턴어라운드 (watchTag:"턴어라운드")
//      - 바닥 확인: 52주 고점 대비 조정 + 90일 저점에서 반등
//      - 5·20·60일선 수렴(폭 ≤ SPREAD_MAX) + 정배열 완성/근접
//      - 5일선 상승 전환
//   ② 신고가 (watchTag:"신고가")
//      - 직전 고점이 충분히 예전(BASE_MIN_DAYS↑ = 물량 소화 기간 확보)
//      - 베이스 폭 타이트(≤ BASE_WIDTH_MAX)
//      - 현재가가 그 고점 부근/갓 돌파(REL_MIN~REL_MAX), 직전엔 고점 아래(=갓 돌파)
//
//       ※ 성장성(매출·이익 YoY)은 스크립트가 판단하지 못한다 — 최종 편입 전
//         LLM 루틴이 '안정적으로 성장 중'인지 반드시 검증한다(CLAUDE.md D 절 참조).
//
// 또한 현재 편성된 관심종목(theme:"watch")이 자기 태그 조건을 여전히 충족하는지 점검해
// current[] 에 남긴다(루틴의 교체 판단용).
//
// 사용법: node scripts/screen-watch.js [--date YYYY-MM-DD]

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");
const OUT = path.join(ROOT, "data", "watch-candidates.js");

// ── 튜닝 파라미터 ──
const TOP_N = 8;                 // 국가·패턴별로 남길 후보 수(루틴이 이 중 5개를 리서치·편입)
const SPREAD_MAX = 5;            // 턴어라운드: 5·20·60일선 수렴 폭 상한(현재가 대비 %)
const OFF_HIGH_MAX = -8;         // 턴어라운드: 52주 고점 대비 이 이하로 조정됐어야 '바닥'
const ABOVE_LOW_MIN = 1;         // 턴어라운드: 90일 저점 대비 이 이상 반등
const BASE_MIN_DAYS = 15;        // 신고가: 직전 고점이 최소 이만큼 예전(물량 소화)
const BASE_WIDTH_MAX = 25;       // 신고가: 베이스 폭 상한(현재가 대비 %)
const REL_MIN = -5;              // 신고가: 직전 고점 대비 하한(돌파 임박 허용)
const REL_MAX = 15;              // 신고가: 직전 고점 대비 상한(이미 급등한 종목 배제)
const FRESH_GAP = 15;            // 신고가: 이 거래일 전에는 고점 아래였어야 '갓 돌파'

// ── 유니버스: 기본적으로 안전한(대형·우량·안정 성장) 종목 ──
// 편성(recommendations.js)에 이미 있는 종목은 자동 제외된다. 새 종목은 여기에 추가하면 된다.
const UNIVERSE = {
  korea: [
    ["005930", "삼성전자", "KOSPI"], ["000660", "SK하이닉스", "KOSPI"], ["373220", "LG에너지솔루션", "KOSPI"],
    ["207940", "삼성바이오로직스", "KOSPI"], ["005380", "현대차", "KOSPI"], ["000270", "기아", "KOSPI"],
    ["005490", "POSCO홀딩스", "KOSPI"], ["051910", "LG화학", "KOSPI"], ["006400", "삼성SDI", "KOSPI"],
    ["035420", "NAVER", "KOSPI"], ["035720", "카카오", "KOSPI"], ["105560", "KB금융", "KOSPI"],
    ["055550", "신한지주", "KOSPI"], ["086790", "하나금융지주", "KOSPI"], ["316140", "우리금융지주", "KOSPI"],
    ["024110", "기업은행", "KOSPI"], ["138040", "메리츠금융지주", "KOSPI"], ["039490", "키움증권", "KOSPI"],
    ["016360", "삼성증권", "KOSPI"], ["005940", "NH투자증권", "KOSPI"], ["032830", "삼성생명", "KOSPI"],
    ["000810", "삼성화재", "KOSPI"], ["005830", "DB손해보험", "KOSPI"], ["001450", "현대해상", "KOSPI"],
    ["012330", "현대모비스", "KOSPI"], ["028260", "삼성물산", "KOSPI"], ["034730", "SK", "KOSPI"],
    ["003550", "LG", "KOSPI"], ["018260", "삼성에스디에스", "KOSPI"], ["030200", "KT", "KOSPI"],
    ["017670", "SK텔레콤", "KOSPI"], ["032640", "LG유플러스", "KOSPI"], ["033780", "KT&G", "KOSPI"],
    ["097950", "CJ제일제당", "KOSPI"], ["271560", "오리온", "KOSPI"], ["003230", "삼양식품", "KOSPI"],
    ["004370", "농심", "KOSPI"], ["280360", "롯데웰푸드", "KOSPI"], ["051900", "LG생활건강", "KOSPI"],
    ["090430", "아모레퍼시픽", "KOSPI"], ["021240", "코웨이", "KOSPI"], ["161890", "한국콜마", "KOSPI"],
    ["192820", "코스맥스", "KOSPI"], ["030000", "제일기획", "KOSPI"], ["012750", "에스원", "KOSPI"],
    ["069960", "현대백화점", "KOSPI"], ["139480", "이마트", "KOSPI"], ["023530", "롯데쇼핑", "KOSPI"],
    ["086280", "현대글로비스", "KOSPI"], ["000100", "유한양행", "KOSPI"], ["128940", "한미약품", "KOSPI"],
    ["068270", "셀트리온", "KOSPI"], ["302440", "SK바이오사이언스", "KOSPI"], ["009150", "삼성전기", "KOSPI"],
    ["011070", "LG이노텍", "KOSPI"], ["066570", "LG전자", "KOSPI"], ["009540", "HD한국조선해양", "KOSPI"],
    ["329180", "HD현대중공업", "KOSPI"], ["042660", "한화오션", "KOSPI"], ["010140", "삼성중공업", "KOSPI"],
    ["012450", "한화에어로스페이스", "KOSPI"], ["047810", "한국항공우주", "KOSPI"], ["079550", "LIG넥스원", "KOSPI"],
    ["064350", "현대로템", "KOSPI"], ["272210", "한화시스템", "KOSPI"], ["267260", "HD현대일렉트릭", "KOSPI"],
    ["010120", "LS일렉트릭", "KOSPI"], ["006260", "LS", "KOSPI"], ["298040", "효성중공업", "KOSPI"],
    ["034020", "두산에너빌리티", "KOSPI"], ["000720", "현대건설", "KOSPI"], ["028050", "삼성E&A", "KOSPI"],
    ["015760", "한국전력", "KOSPI"], ["036460", "한국가스공사", "KOSPI"], ["051600", "한전KPS", "KOSPI"],
    ["003490", "대한항공", "KOSPI"], ["011200", "HMM", "KOSPI"], ["010950", "S-Oil", "KOSPI"],
    ["096770", "SK이노베이션", "KOSPI"], ["011170", "롯데케미칼", "KOSPI"], ["011780", "금호석유화학", "KOSPI"],
    ["009830", "한화솔루션", "KOSPI"], ["161390", "한국타이어앤테크놀로지", "KOSPI"], ["073240", "금호타이어", "KOSPI"],
    ["047050", "포스코인터내셔널", "KOSPI"], ["078930", "GS", "KOSPI"], ["267250", "HD현대", "KOSPI"],
    ["443060", "HD현대마린솔루션", "KOSPI"], ["012510", "더존비즈온", "KOSPI"], ["036570", "엔씨소프트", "KOSPI"],
    ["251270", "넷마블", "KOSPI"], ["259960", "크래프톤", "KOSPI"], ["462870", "시프트업", "KOSPI"],
    ["035900", "JYP Ent.", "KOSDAQ"], ["041510", "에스엠", "KOSDAQ"], ["122870", "와이지엔터테인먼트", "KOSDAQ"],
    ["352820", "하이브", "KOSPI"], ["058470", "리노공업", "KOSDAQ"], ["064760", "티씨케이", "KOSDAQ"],
    ["213420", "덕산네오룩스", "KOSDAQ"], ["357780", "솔브레인", "KOSDAQ"], ["014680", "한솔케미칼", "KOSPI"],
    ["403870", "HPSP", "KOSDAQ"], ["095340", "ISC", "KOSDAQ"], ["039030", "이오테크닉스", "KOSDAQ"],
    ["042700", "한미반도체", "KOSPI"], ["007660", "이수페타시스", "KOSPI"], ["214150", "클래시스", "KOSDAQ"],
    ["145020", "휴젤", "KOSDAQ"], ["196170", "알테오젠", "KOSDAQ"], ["214450", "파마리서치", "KOSDAQ"],
    ["018290", "브이티", "KOSDAQ"], ["257720", "실리콘투", "KOSDAQ"], ["278470", "에이피알", "KOSPI"],
    ["009450", "경동나비엔", "KOSPI"], ["112610", "씨에스윈드", "KOSPI"], ["082920", "비츠로셀", "KOSDAQ"],
  ],
  us: [
    ["AAPL", "Apple", "NASDAQ"], ["MSFT", "Microsoft", "NASDAQ"], ["GOOGL", "Alphabet", "NASDAQ"],
    ["AMZN", "Amazon", "NASDAQ"], ["META", "Meta Platforms", "NASDAQ"], ["NVDA", "NVIDIA", "NASDAQ"],
    ["AVGO", "Broadcom", "NASDAQ"], ["TSM", "Taiwan Semiconductor", "NYSE"], ["ORCL", "Oracle", "NYSE"],
    ["CRM", "Salesforce", "NYSE"], ["ADBE", "Adobe", "NASDAQ"], ["NOW", "ServiceNow", "NYSE"],
    ["INTU", "Intuit", "NASDAQ"], ["IBM", "IBM", "NYSE"], ["ACN", "Accenture", "NYSE"],
    ["CSCO", "Cisco Systems", "NASDAQ"], ["QCOM", "Qualcomm", "NASDAQ"], ["TXN", "Texas Instruments", "NASDAQ"],
    ["AMAT", "Applied Materials", "NASDAQ"], ["LRCX", "Lam Research", "NASDAQ"], ["KLAC", "KLA", "NASDAQ"],
    ["ADI", "Analog Devices", "NASDAQ"], ["MU", "Micron", "NASDAQ"], ["ANET", "Arista Networks", "NYSE"],
    ["APH", "Amphenol", "NYSE"], ["MSI", "Motorola Solutions", "NYSE"], ["CDNS", "Cadence Design", "NASDAQ"],
    ["SNPS", "Synopsys", "NASDAQ"], ["PANW", "Palo Alto Networks", "NASDAQ"], ["CRWD", "CrowdStrike", "NASDAQ"],
    ["FTNT", "Fortinet", "NASDAQ"], ["VRT", "Vertiv", "NYSE"], ["V", "Visa", "NYSE"],
    ["MA", "Mastercard", "NYSE"], ["AXP", "American Express", "NYSE"], ["JPM", "JPMorgan Chase", "NYSE"],
    ["BAC", "Bank of America", "NYSE"], ["GS", "Goldman Sachs", "NYSE"], ["MS", "Morgan Stanley", "NYSE"],
    ["SCHW", "Charles Schwab", "NYSE"], ["BLK", "BlackRock", "NYSE"], ["SPGI", "S&P Global", "NYSE"],
    ["MCO", "Moody's", "NYSE"], ["MSCI", "MSCI", "NYSE"], ["ICE", "Intercontinental Exchange", "NYSE"],
    ["CME", "CME Group", "NASDAQ"], ["PGR", "Progressive", "NYSE"], ["CB", "Chubb", "NYSE"],
    ["TRV", "Travelers", "NYSE"], ["AON", "Aon", "NYSE"], ["MMC", "Marsh McLennan", "NYSE"],
    ["BRK.B", "Berkshire Hathaway", "NYSE"], ["UNH", "UnitedHealth", "NYSE"], ["ELV", "Elevance Health", "NYSE"],
    ["CI", "Cigna", "NYSE"], ["HUM", "Humana", "NYSE"], ["LLY", "Eli Lilly", "NYSE"],
    ["JNJ", "Johnson & Johnson", "NYSE"], ["ABBV", "AbbVie", "NYSE"], ["MRK", "Merck", "NYSE"],
    ["PFE", "Pfizer", "NYSE"], ["BMY", "Bristol-Myers Squibb", "NYSE"], ["AMGN", "Amgen", "NASDAQ"],
    ["GILD", "Gilead Sciences", "NASDAQ"], ["VRTX", "Vertex Pharmaceuticals", "NASDAQ"], ["REGN", "Regeneron", "NASDAQ"],
    ["TMO", "Thermo Fisher", "NYSE"], ["DHR", "Danaher", "NYSE"], ["ABT", "Abbott", "NYSE"],
    ["SYK", "Stryker", "NYSE"], ["BSX", "Boston Scientific", "NYSE"], ["MDT", "Medtronic", "NYSE"],
    ["ISRG", "Intuitive Surgical", "NASDAQ"], ["ZTS", "Zoetis", "NYSE"], ["PG", "Procter & Gamble", "NYSE"],
    ["KO", "Coca-Cola", "NYSE"], ["PEP", "PepsiCo", "NASDAQ"], ["MDLZ", "Mondelez", "NASDAQ"],
    ["CL", "Colgate-Palmolive", "NYSE"], ["KMB", "Kimberly-Clark", "NYSE"], ["GIS", "General Mills", "NYSE"],
    ["HSY", "Hershey", "NYSE"], ["STZ", "Constellation Brands", "NYSE"], ["MNST", "Monster Beverage", "NASDAQ"],
    ["COST", "Costco", "NASDAQ"], ["WMT", "Walmart", "NYSE"], ["TGT", "Target", "NYSE"],
    ["HD", "Home Depot", "NYSE"], ["LOW", "Lowe's", "NYSE"], ["TJX", "TJX Companies", "NYSE"],
    ["ORLY", "O'Reilly Automotive", "NASDAQ"], ["AZO", "AutoZone", "NYSE"], ["MCD", "McDonald's", "NYSE"],
    ["SBUX", "Starbucks", "NASDAQ"], ["YUM", "Yum! Brands", "NYSE"], ["CMG", "Chipotle", "NYSE"],
    ["NKE", "Nike", "NYSE"], ["DIS", "Disney", "NYSE"], ["NFLX", "Netflix", "NASDAQ"],
    ["CMCSA", "Comcast", "NASDAQ"], ["T", "AT&T", "NYSE"], ["VZ", "Verizon", "NYSE"],
    ["TMUS", "T-Mobile US", "NASDAQ"], ["BKNG", "Booking Holdings", "NASDAQ"], ["MELI", "MercadoLibre", "NASDAQ"],
    ["UBER", "Uber", "NYSE"], ["GE", "GE Aerospace", "NYSE"], ["GEV", "GE Vernova", "NYSE"],
    ["RTX", "RTX", "NYSE"], ["LMT", "Lockheed Martin", "NYSE"], ["NOC", "Northrop Grumman", "NYSE"],
    ["GD", "General Dynamics", "NYSE"], ["BA", "Boeing", "NYSE"], ["HWM", "Howmet Aerospace", "NYSE"],
    ["TDG", "TransDigm", "NYSE"], ["HON", "Honeywell", "NASDAQ"], ["MMM", "3M", "NYSE"],
    ["CAT", "Caterpillar", "NYSE"], ["DE", "Deere", "NYSE"], ["ETN", "Eaton", "NYSE"],
    ["PH", "Parker Hannifin", "NYSE"], ["TT", "Trane Technologies", "NYSE"], ["JCI", "Johnson Controls", "NYSE"],
    ["CARR", "Carrier Global", "NYSE"], ["EMR", "Emerson Electric", "NYSE"], ["ITW", "Illinois Tool Works", "NYSE"],
    ["UNP", "Union Pacific", "NYSE"], ["UPS", "UPS", "NYSE"], ["FDX", "FedEx", "NYSE"],
    ["WM", "Waste Management", "NYSE"], ["RSG", "Republic Services", "NYSE"], ["CTAS", "Cintas", "NASDAQ"],
    ["ADP", "ADP", "NASDAQ"], ["PAYX", "Paychex", "NASDAQ"], ["LIN", "Linde", "NASDAQ"],
    ["SHW", "Sherwin-Williams", "NYSE"], ["APD", "Air Products", "NYSE"], ["ECL", "Ecolab", "NYSE"],
    ["XOM", "Exxon Mobil", "NYSE"], ["CVX", "Chevron", "NYSE"], ["COP", "ConocoPhillips", "NYSE"],
    ["NEE", "NextEra Energy", "NYSE"], ["DUK", "Duke Energy", "NYSE"], ["SO", "Southern Company", "NYSE"],
    ["AEP", "American Electric Power", "NASDAQ"], ["O", "Realty Income", "NYSE"], ["AMT", "American Tower", "NYSE"],
    ["PLD", "Prologis", "NYSE"], ["EQIX", "Equinix", "NASDAQ"],
  ],
};

function argVal(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : null;
}
function symbolFor(ticker, market) {
  if (market === "KOSPI") return ticker + ".KS";
  if (market === "KOSDAQ") return ticker + ".KQ";
  return ticker === "BRK.B" ? "BRK-B" : ticker;
}
function sma(arr, n, off) {
  off = off || 0;
  if (arr.length < n + off) return null;
  const s = arr.slice(arr.length - n - off, arr.length - off);
  return s.reduce((a, b) => a + b, 0) / s.length;
}
function r1(v) { return Math.round(v * 10) / 10; }

// 현재 편성(recommendations.js) 로드 — 후보 제외용 + 관심종목 태그 점검용
function loadRoster() {
  global.window = {};
  delete require.cache[require.resolve(RECO)];
  require(RECO);
  const D = global.window.STOCK_DATA || {};
  const held = {};      // ticker → true (모든 편성 종목: 후보에서 제외)
  const watch = [];     // 현재 관심종목(태그 유효성 점검 대상)
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (!s || !s.ticker) return;
    held[s.ticker] = true;
    if (s.theme === "watch") watch.push({ country: c, ticker: s.ticker, name: s.name, market: s.market, tag: s.watchTag || "" });
  }));
  return { held: held, watch: watch };
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// 야후는 다건 연속 조회 시 간헐적으로 429/5xx 를 돌려준다. 한 번 실패했다고 버리면
// 유니버스의 상당수가 스크리닝에서 빠져(2026-07-27 실측: 182건 중 64건 실패) 후보를
// 놓치므로, 지수 백오프로 최대 3회까지 재시도한다.
async function fetchClosesOnce(symbol) {
  if (typeof fetch !== "function") return null;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 10000);
  let r;
  try {
    r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(symbol) +
      "?interval=1d&range=1y", { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
  } catch (_e) { clearTimeout(to); return null; }
  clearTimeout(to);
  if (!r.ok) return null;
  let j; try { j = await r.json(); } catch (_e) { return null; }
  const q = j && j.chart && j.chart.result && j.chart.result[0] &&
            j.chart.result[0].indicators && j.chart.result[0].indicators.quote &&
            j.chart.result[0].indicators.quote[0];
  if (!q || !q.close) return null;
  const cl = q.close.filter((v) => typeof v === "number" && isFinite(v));
  return cl.length >= 130 ? cl : null;
}

async function fetchCloses(symbol) {
  for (let i = 0; i < 3; i++) {
    const cl = await fetchClosesOnce(symbol);
    if (cl) return cl;
    if (i < 2) await sleep(400 * Math.pow(2, i));   // 400ms → 800ms
  }
  return null;
}

// 한 종목의 두 패턴 지표를 계산한다
function analyze(cl) {
  const N = cl.length, px = cl[N - 1];
  const ma5 = sma(cl, 5), ma20 = sma(cl, 20), ma60 = sma(cl, 60);
  const ma5prev = sma(cl, 5, 3);
  if (ma5 == null || ma20 == null || ma60 == null) return null;

  // ── 턴어라운드 지표 ──
  const hi52 = Math.max.apply(null, cl.slice(-252));
  const lo90 = Math.min.apply(null, cl.slice(-90));
  const spread = (Math.max(ma5, ma20, ma60) - Math.min(ma5, ma20, ma60)) / px * 100;
  const offHigh = (px / hi52 - 1) * 100;
  const aboveLow = (px / lo90 - 1) * 100;
  const stacked = ma5 >= ma20 && ma20 >= ma60;
  const nearStacked = ma5 >= ma20 * 0.985 && ma20 >= ma60 * 0.975;
  const turningUp = ma5 > ma5prev;
  const turnOk = spread <= SPREAD_MAX && (stacked || nearStacked) &&
                 offHigh <= OFF_HIGH_MAX && aboveLow >= ABOVE_LOW_MIN && turningUp;
  // 점수: 수렴이 타이트할수록·정배열 완성일수록·반등 초입일수록 우수
  const turnScore = turnOk
    ? (SPREAD_MAX - spread) * 10 + (stacked ? 25 : 0) + Math.max(0, 30 - Math.abs(aboveLow - 12))
    : 0;

  // ── 신고가 지표 ──
  const base = cl.slice(0, N - FRESH_GAP);
  const prevHigh = Math.max.apply(null, base);
  const hiIdx = base.lastIndexOf(prevHigh);
  const baseDays = (base.length - 1) - hiIdx;                    // 직전 고점 이후 경과 거래일
  const win = cl.slice(Math.max(0, N - 65), N - FRESH_GAP);      // 베이스 구간
  const baseWidth = win.length ? (Math.max.apply(null, win) - Math.min.apply(null, win)) / px * 100 : 999;
  const rel = (px / prevHigh - 1) * 100;                          // 직전 고점 대비 위치
  const wasBelow = cl[N - FRESH_GAP - 1] < prevHigh * 0.98;       // 갓 돌파인가
  const highOk = rel >= REL_MIN && rel <= REL_MAX && wasBelow &&
                 baseDays >= BASE_MIN_DAYS && baseWidth <= BASE_WIDTH_MAX;
  // 점수: 돌파 직후(0~+8%)일수록·베이스가 길고 타이트할수록 우수
  const highScore = highOk
    ? Math.max(0, 30 - Math.abs(rel - 3) * 3) + Math.min(30, baseDays / 3) + Math.max(0, BASE_WIDTH_MAX - baseWidth)
    : 0;

  return {
    px: px, spread: r1(spread), offHigh: r1(offHigh), aboveLow: r1(aboveLow),
    stacked: stacked, nearStacked: nearStacked, turningUp: turningUp,
    rel: r1(rel), baseDays: baseDays, baseWidth: r1(baseWidth),
    turnOk: turnOk, turnScore: Math.round(turnScore),
    highOk: highOk, highScore: Math.round(highScore),
    // 미충족 사유 — 정원을 못 채웠을 때 '얼마나 모자랐는지'를 데이터로 남기기 위함
    highMiss: highOk ? null : [
      rel < REL_MIN ? "고점 대비 " + r1(rel) + "%(하한 " + REL_MIN + "%)" : null,
      rel > REL_MAX ? "이미 " + r1(rel) + "% 급등(상한 " + REL_MAX + "%)" : null,
      !wasBelow ? "갓 돌파 아님(이미 고점 위)" : null,
      baseDays < BASE_MIN_DAYS ? "베이스 " + baseDays + "일(최소 " + BASE_MIN_DAYS + "일)" : null,
      baseWidth > BASE_WIDTH_MAX ? "베이스 폭 " + r1(baseWidth) + "%(상한 " + BASE_WIDTH_MAX + "%)" : null,
    ].filter(Boolean),
    turnMiss: turnOk ? null : [
      spread > SPREAD_MAX ? "이평 수렴 " + r1(spread) + "%(상한 " + SPREAD_MAX + "%)" : null,
      !(stacked || nearStacked) ? "정배열 아님" : null,
      offHigh > OFF_HIGH_MAX ? "고점 대비 " + r1(offHigh) + "%(상한 " + OFF_HIGH_MAX + "%)" : null,
      aboveLow < ABOVE_LOW_MIN ? "저점 대비 " + r1(aboveLow) + "%(최소 " + ABOVE_LOW_MIN + "%)" : null,
      !turningUp ? "5일선 하락 중" : null,
    ].filter(Boolean),
  };
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length); let i = 0;
  async function worker() { while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

(async () => {
  const asOf = argVal("date") || new Date().toISOString().slice(0, 10);
  const { held, watch } = loadRoster();

  // 1) 유니버스 스크리닝(편성 보유 종목 제외)
  const targets = [];
  ["korea", "us"].forEach((c) => UNIVERSE[c].forEach((row) => {
    if (held[row[0]]) return;
    targets.push({ country: c, ticker: row[0], name: row[1], market: row[2], symbol: symbolFor(row[0], row[2]) });
  }));

  const turnaround = { korea: [], us: [] };
  const breakout = { korea: [], us: [] };
  // 조건 1개만 아슬아슬하게 미달한 종목 — 후보 0건일 때 '왜 없는지'를 보여준다
  const nearHigh = { korea: [], us: [] };
  const nearTurn = { korea: [], us: [] };
  let ok = 0, fail = 0;

  await mapLimit(targets, 8, async (t) => {
    const cl = await fetchCloses(t.symbol);
    if (!cl) { fail++; return; }
    ok++;
    const a = analyze(cl);
    if (!a) return;
    const base = { ticker: t.ticker, name: t.name, market: t.market, price: Math.round(a.px * 100) / 100 };
    if (a.turnOk) {
      turnaround[t.country].push(Object.assign({}, base, {
        score: a.turnScore, spread: a.spread, offHigh: a.offHigh, aboveLow: a.aboveLow,
        arrangement: a.stacked ? "정배열" : "정배열 근접",
      }));
    }
    if (a.highOk) {
      breakout[t.country].push(Object.assign({}, base, {
        score: a.highScore, rel: a.rel, baseDays: a.baseDays, baseWidth: a.baseWidth,
        state: a.rel >= 0 ? "돌파" : "돌파 임박",
      }));
    } else if (a.highMiss && a.highMiss.length === 1) {
      // 조건 하나만 아슬아슬하게 못 넘긴 종목 — 정원 미달 사유를 설명하고 다음 회차 추적에 쓴다
      nearHigh[t.country].push(Object.assign({}, base, { rel: a.rel, why: a.highMiss[0] }));
    }
    if (!a.turnOk && a.turnMiss && a.turnMiss.length === 1) {
      nearTurn[t.country].push(Object.assign({}, base, { why: a.turnMiss[0] }));
    }
  });

  ["korea", "us"].forEach((c) => {
    turnaround[c].sort((x, y) => y.score - x.score);
    breakout[c].sort((x, y) => y.score - x.score);
    turnaround[c] = turnaround[c].slice(0, TOP_N);
    breakout[c] = breakout[c].slice(0, TOP_N);
    nearHigh[c].sort((x, y) => y.rel - x.rel);
    nearHigh[c] = nearHigh[c].slice(0, 5);
    nearTurn[c] = nearTurn[c].slice(0, 5);
  });

  // 2) 현재 관심종목의 태그 유효성 점검(루틴의 교체 판단용)
  const current = [];
  await mapLimit(watch, 6, async (w) => {
    const cl = await fetchCloses(symbolFor(w.ticker, w.market));
    if (!cl) { current.push({ ticker: w.ticker, name: w.name, country: w.country, tag: w.tag, status: "확인 불가", note: "시세 조회 실패" }); return; }
    const a = analyze(cl);
    if (!a) { current.push({ ticker: w.ticker, name: w.name, country: w.country, tag: w.tag, status: "확인 불가", note: "계산 불가" }); return; }
    // 보유 종목은 '오늘 새로 편입할 만한가'가 아니라 '편입 논리가 유지되는가'로 본다.
    //   유지 = 셋업 진행 중 · 졸업 = 목표를 달성해 태그 전환 검토 · 이탈 = 논리 훼손(교체 후보)
    let status = "확인 불가", note = "";
    if (w.tag === "턴어라운드") {
      const intact = (a.stacked || a.nearStacked) && a.spread <= SPREAD_MAX * 1.6;
      if (a.offHigh >= -2) status = "졸업";              // 52주 고점 회복 → 신고가 태그 전환 검토
      else if (intact) status = "유지";
      else status = "이탈";                               // 배열 붕괴 + 수렴 확산
      note = "수렴 " + a.spread + "% · 고점대비 " + a.offHigh + "% · " +
             (a.stacked ? "정배열" : a.nearStacked ? "정배열 근접" : "배열 흐트러짐");
    } else if (w.tag === "신고가") {
      if (a.rel >= -8) status = "유지";                   // 고점권 유지
      else status = "이탈";                               // 돌파 실패·되돌림
      note = "직전고점 대비 " + a.rel + "% · 베이스 " + a.baseDays + "일";
    } else {
      status = "태그 없음";
      note = "사용자 요청 편입 종목 등 — 차트 태그 미적용";
    }
    current.push({ ticker: w.ticker, name: w.name, country: w.country, tag: w.tag, status: status, note: note });
  });

  const W = {
    asOf: asOf,
    note: "관심종목 차트 후보 — scripts/screen-watch.js 가 매일 자동 계산(LLM 토큰 0). " +
          "turnaround=바닥 확인+5·20·60일선 수렴+정배열(근접), breakout=물량 소화 후 신고가 갓 돌파. " +
          "성장성(매출·이익 YoY)은 미판정 — 편입 전 LLM 루틴이 반드시 검증한다.",
    params: { TOP_N, SPREAD_MAX, OFF_HIGH_MAX, ABOVE_LOW_MIN, BASE_MIN_DAYS, BASE_WIDTH_MAX, REL_MIN, REL_MAX },
    universe: { korea: UNIVERSE.korea.length, us: UNIVERSE.us.length, screened: ok, failed: fail },
    turnaround: turnaround,
    breakout: breakout,
    // 조건 1개만 미달한 근접 후보 — 정원을 못 채웠을 때 그 사유를 데이터로 남긴다
    nearMiss: { turnaround: nearTurn, breakout: nearHigh },
    current: current,
  };
  fs.writeFileSync(OUT,
    "// 관심종목 차트 후보 스냅샷 — scripts/screen-watch.js 가 자동 생성 (LLM 토큰 0, 순수 스크립트)\n" +
    "// turnaround/breakout = 국가별 상위 후보(점수순), current = 현재 관심종목의 태그 유효성 점검.\n" +
    "window.WATCH_CANDIDATES = " + JSON.stringify(W) + ";\n");

  console.log("watch-candidates.js 갱신 (" + asOf + ") — 스크리닝 " + ok + "종목(실패 " + fail + ")");
  ["korea", "us"].forEach((c) => {
    const kn = c === "korea" ? "한국" : "미국";
    console.log("  [" + kn + "] 턴어라운드 " + turnaround[c].length + "건: " +
      (turnaround[c].map((x) => x.name).join(", ") || "없음"));
    console.log("  [" + kn + "] 신고가 " + breakout[c].length + "건: " +
      (breakout[c].map((x) => x.name).join(", ") || "없음"));
    // 후보가 정원(5)에 못 미치면 '얼마나 모자랐는지'를 함께 찍어 다음 회차 판단을 돕는다
    if (breakout[c].length < 5 && nearHigh[c].length) {
      console.log("     └ 근접(조건 1개 미달): " +
        nearHigh[c].map((x) => x.name + "(" + x.why + ")").join(" · "));
    }
    if (turnaround[c].length < 5 && nearTurn[c].length) {
      console.log("     └ 턴어라운드 근접: " +
        nearTurn[c].map((x) => x.name + "(" + x.why + ")").join(" · "));
    }
  });
  const out = current.filter((x) => x.status === "이탈");
  const grad = current.filter((x) => x.status === "졸업");
  if (grad.length) console.log("  ★ 졸업(신고가 전환 검토): " + grad.map((x) => x.name).join(", "));
  if (out.length) console.log("  ⚠ 이탈(교체 검토): " + out.map((x) => x.name + "(" + x.tag + ")").join(", "));
})();
