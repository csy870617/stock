#!/usr/bin/env node
// 추천 데이터 검증기 — 재평가 신뢰도의 기계적 하한선을 보장한다 (LLM 토큰 0)
//
// 왜: 매일 자동 재평가(LLM Routine)는 사람이 지켜보지 않으므로,
//     "그럴듯하지만 틀린" 데이터(구조 붕괴·티커 오타·출처 누락·계산 불일치)가
//     조용히 배포되는 것을 코드 레벨에서 차단해야 한다.
//     이 검증기는 update-reco.js 저장 직전 + CI(커밋·배포 전) 양쪽에서 실행된다.
//
// 사용법:
//   node scripts/validate-reco.js                  # data/recommendations.js 검증
//   node scripts/validate-reco.js --file <경로>    # 다른 파일(미리보기 등) 검증
//   종료코드: 오류 있으면 1, 없으면 0 (경고는 출력만 하고 통과)
//
// 오류(차단)와 경고(통과·표시)의 구분:
//   오류 = 데이터가 깨졌다고 단정할 수 있는 것 (구조·형식·계산 불일치)
//   경고 = 사람/루틴의 주의가 필요한 것 (목표가 소진, 오래된 기준일 등)

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function loadGlobalScript(file, key) {
  global.window = {};
  delete require.cache[require.resolve(file)];
  require(file);
  return global.window[key];
}

const RE_DATE = /^\d{4}-\d{2}-\d{2}$/;
const RE_KR_TICKER = /^\d{6}$/;
const RE_US_TICKER = /^[A-Z][A-Z0-9.\-]{0,6}$/;
const RE_HANGUL = /[가-힣]/;
const RE_URL = /^https?:\/\/[^\s"']+$/;
const BAD_URL_HINTS = ["example.com", "example.org", "localhost", "127.0.0.1"];

const MARKETS = { korea: ["KOSPI", "KOSDAQ"], us: ["NASDAQ", "NYSE"] };
const PER_GROUP = 9;              // (주제×국가)당 종목 수
const PER_TIER = 3;               // 티어당 종목 수
const UPSIDE_TOL = 1.5;           // upside 필드 vs (target-price)/price*100 허용 오차(%p)
const STALE_PRICE_DAYS = 45;      // priceDate 가 이보다 오래되면 경고

function validate(D, opts) {
  opts = opts || {};
  const quotes = opts.quotes || {};
  const today = opts.today || new Date().toISOString().slice(0, 10);
  const errors = [];
  const warnings = [];

  if (!D || typeof D !== "object") return { errors: ["STOCK_DATA 없음"], warnings };

  // ── 상단 필드 ──
  if (!RE_DATE.test(D.generatedAt || "")) errors.push("generatedAt 형식 오류: " + D.generatedAt);
  else if (D.generatedAt > today) errors.push("generatedAt 이 미래 날짜: " + D.generatedAt);
  if (!D.marketNote || !RE_HANGUL.test(D.marketNote)) errors.push("marketNote 누락 또는 한국어 아님");
  if (!D.disclaimer || !RE_HANGUL.test(D.disclaimer)) errors.push("disclaimer 누락 또는 한국어 아님");
  if (!Array.isArray(D.themes) || !D.themes.length) errors.push("themes 배열 누락");

  const themeKeys = (D.themes || []).map((t) => t && t.key).filter(Boolean);
  (D.themes || []).forEach((t, i) => {
    if (!t || !t.key || !t.label) errors.push("themes[" + i + "] key/label 누락");
  });

  // ── 종목 필드 + 그룹 구조 ──
  ["korea", "us"].forEach((c) => {
    const arr = D[c];
    if (!Array.isArray(arr)) { errors.push(c + " 배열 누락"); return; }

    const groups = {};   // theme → [stocks]
    const dupCheck = {}; // theme:ticker → count

    arr.forEach((s, i) => {
      const tag = c + "[" + i + "] " + (s && (s.name || s.ticker) || "?");

      if (!s || typeof s !== "object") { errors.push(tag + ": 항목이 객체가 아님"); return; }
      if (!themeKeys.includes(s.theme)) errors.push(tag + ": 미정의 theme '" + s.theme + "'");
      if (![1, 2, 3].includes(s.tier)) errors.push(tag + ": tier 는 1|2|3 이어야 함 (" + s.tier + ")");
      if (!s.name || typeof s.name !== "string") errors.push(tag + ": name 누락");

      // 티커·시장 형식 (국가별)
      const tickRe = c === "korea" ? RE_KR_TICKER : RE_US_TICKER;
      if (!tickRe.test(s.ticker || "")) errors.push(tag + ": " + c + " 티커 형식 오류 '" + s.ticker + "'");
      if (!(MARKETS[c] || []).includes(s.market)) errors.push(tag + ": market 은 " + MARKETS[c].join("|") + " 여야 함 ('" + s.market + "')");

      // 가격·목표가·계산 정합성
      if (!(typeof s.price === "number" && isFinite(s.price) && s.price > 0)) errors.push(tag + ": price 오류 (" + s.price + ")");
      if (!(typeof s.targetPrice === "number" && isFinite(s.targetPrice) && s.targetPrice > 0)) errors.push(tag + ": targetPrice 오류 (" + s.targetPrice + ")");
      if (!RE_DATE.test(s.priceDate || "")) errors.push(tag + ": priceDate 형식 오류 '" + s.priceDate + "'");
      else if (s.priceDate > today) errors.push(tag + ": priceDate 가 미래 날짜 " + s.priceDate);
      if (typeof s.upside !== "number" || !isFinite(s.upside)) errors.push(tag + ": upside 오류 (" + s.upside + ")");
      else if (typeof s.price === "number" && s.price > 0 && typeof s.targetPrice === "number") {
        const calc = (s.targetPrice - s.price) / s.price * 100;
        if (Math.abs(calc - s.upside) > UPSIDE_TOL) {
          errors.push(tag + ": upside(" + s.upside + ") ≠ 계산값(" + calc.toFixed(1) + ") — price/targetPrice 와 불일치");
        }
      }
      if (!(typeof s.dividendYield === "number" && s.dividendYield >= 0 && s.dividendYield <= 30)) {
        errors.push(tag + ": dividendYield 오류 (" + s.dividendYield + ")");
      }

      // 분석 텍스트 — 한국어 강제 (루틴이 영어로 채우는 퇴행 방지)
      if (!s.earnings || !RE_HANGUL.test(s.earnings)) errors.push(tag + ": earnings 누락 또는 한국어 아님");
      if (!s.thesis || !RE_HANGUL.test(s.thesis)) errors.push(tag + ": thesis 누락 또는 한국어 아님");
      if (!Array.isArray(s.risks) || !s.risks.length || s.risks.length > 4 || s.risks.some((r) => !r || !RE_HANGUL.test(r))) {
        errors.push(tag + ": risks 는 한국어 1~4개 배열이어야 함");
      }

      // 출처 — 신규 편입·논거 변경의 증거 사슬
      if (!RE_URL.test(s.chartUrl || "")) errors.push(tag + ": chartUrl 오류");
      if (!Array.isArray(s.sources) || s.sources.length < 1 || s.sources.length > 3) {
        errors.push(tag + ": sources 는 URL 1~3개여야 함");
      } else {
        s.sources.forEach((u) => {
          if (!RE_URL.test(u)) errors.push(tag + ": sources URL 형식 오류 '" + String(u).slice(0, 60) + "'");
          else if (BAD_URL_HINTS.some((h) => u.includes(h))) errors.push(tag + ": sources 에 플레이스홀더 도메인 '" + u + "'");
        });
      }

      // 그룹 집계
      (groups[s.theme] = groups[s.theme] || []).push(s);
      const dk = s.theme + ":" + s.ticker;
      dupCheck[dk] = (dupCheck[dk] || 0) + 1;

      // ── 경고 (통과하되 루틴·사람이 주목할 것) ──
      const q = quotes[s.ticker];
      const cur = q && typeof q.price === "number" ? q.price : s.price;
      if (typeof s.targetPrice === "number" && cur > 0) {
        const liveUp = (s.targetPrice - cur) / cur * 100;
        if (liveUp <= 0) warnings.push(tag + ": 목표가 소진 (현재가 " + cur + " ≥ 목표가 " + s.targetPrice + ") — 재평가 우선 대상");
      }
      if (RE_DATE.test(s.priceDate || "")) {
        const age = (new Date(today) - new Date(s.priceDate)) / 86400000;
        if (age > STALE_PRICE_DAYS) warnings.push(tag + ": priceDate 가 " + Math.round(age) + "일 경과 (" + s.priceDate + ")");
      }
      if (typeof s.dividendYield === "number" && s.dividendYield > 12) {
        warnings.push(tag + ": 배당수익률 " + s.dividendYield + "% — 비정상적으로 높음, 확인 필요");
      }
    });

    // 같은 (theme,ticker) 중복 금지
    Object.keys(dupCheck).forEach((k) => {
      if (dupCheck[k] > 1) errors.push(c + ": (" + k + ") 이 같은 주제에 " + dupCheck[k] + "번 등장");
    });

    // 주제별 9종목 · Tier 3×3 구조
    themeKeys.forEach((tk) => {
      const g = groups[tk] || [];
      if (g.length !== PER_GROUP) {
        errors.push(c + "/" + tk + ": 종목 수 " + g.length + " ≠ " + PER_GROUP);
      }
      [1, 2, 3].forEach((tier) => {
        const n = g.filter((s) => s.tier === tier).length;
        if (n !== PER_TIER) errors.push(c + "/" + tk + ": Tier" + tier + " 종목 수 " + n + " ≠ " + PER_TIER);
      });
    });
  });

  return { errors, warnings };
}

// ── CLI ──
if (require.main === module) {
  const fileIdx = process.argv.indexOf("--file");
  const file = fileIdx >= 0 && process.argv[fileIdx + 1]
    ? path.resolve(process.argv[fileIdx + 1])
    : path.join(ROOT, "data", "recommendations.js");

  const D = loadGlobalScript(file, "STOCK_DATA");

  let quotes = {};
  const QUOTES = path.join(ROOT, "data", "quotes.js");
  if (fs.existsSync(QUOTES)) {
    try { quotes = (loadGlobalScript(QUOTES, "STOCK_QUOTES") || {}).quotes || {}; } catch (_e) {}
  }

  const { errors, warnings } = validate(D, { quotes });
  if (warnings.length) {
    console.log("⚠ 경고 " + warnings.length + "건:");
    warnings.forEach((w) => console.log("  - " + w));
  }
  if (errors.length) {
    console.error("✗ 오류 " + errors.length + "건:");
    errors.forEach((e) => console.error("  - " + e));
    console.error("검증 실패 — " + path.relative(ROOT, file));
    process.exit(1);
  }
  const total = (D.korea || []).length + (D.us || []).length;
  console.log("✓ 검증 통과: " + total + "종목, 오류 0건, 경고 " + warnings.length + "건 (" + path.relative(ROOT, file) + ")");
}

module.exports = { validate };
