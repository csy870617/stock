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

// ── 출처 신뢰도 등급 — WebSearch 기반 재평가의 증거 품질을 기계적으로 강제 ──
// TRUSTED: 컨센서스 집계·공시·주요 경제언론·증권사 리서치 — 수치 인용을 신뢰할 수 있는 도메인.
// BLOCKED: 커뮤니티·개인 블로그·SNS·위키 — 풍문/부정확 위험이 커서 근거(sources)로 금지.
// 정책: 기존(baked) 데이터의 BLOCKED/비신뢰 출처는 경고만(배포 통과 — 레거시 관용, 재평가 우선 대상 표시),
//       새 패치(update-reco.js)는 BLOCKED 즉시 거부 + 분석 변경/신규 편입엔 TRUSTED ≥1 필수.
const TRUSTED_SOURCES = [
  // 컨센서스·시장 데이터 집계
  "fnguide.com", "wisereport.co.kr", "tipranks.com", "stockanalysis.com",
  "investing.com", "marketbeat.com", "marketscreener.com", "zacks.com",
  "morningstar.com", "tikr.com", "tradingview.com", "koyfin.com",
  "finance.yahoo.com", "nasdaq.com", "finance.naver.com", "stock.naver.com",
  // 공시·규제기관
  "dart.fss.or.kr", "krx.co.kr", "sec.gov", "seibro.or.kr",
  // 한국 주요 경제언론
  "hankyung.com", "mk.co.kr", "sedaily.com", "edaily.co.kr", "mt.co.kr",
  "biz.chosun.com", "yna.co.kr", "newsis.com", "news1.kr", "fnnews.com",
  "asiae.co.kr", "businesspost.co.kr", "thebell.co.kr", "heraldcorp.com",
  "newspim.com", "zdnet.co.kr", "bizwatch.co.kr",
  // 글로벌 주요 언론
  "reuters.com", "bloomberg.com", "wsj.com", "ft.com", "cnbc.com",
  "marketwatch.com", "barrons.com", "cnn.com", "apnews.com",
  // 증권사 리서치
  "kbthink.com", "kbsec.com", "kiwoom.com", "miraeasset.com", "samsungpop.com",
  "nhqv.com", "truefriend.com", "shinhansec.com", "hanaw.com",
];
const BLOCKED_SOURCES = [
  // 블로그·포스팅 플랫폼
  "blog.naver.com", "cafe.naver.com", "post.naver.com", "kin.naver.com",
  "cafe.daum.net", "tistory.com", "brunch.co.kr", "blogspot.com",
  "wordpress.com", "medium.com", "velog.io",
  // SNS·동영상
  "youtube.com", "youtu.be", "facebook.com", "twitter.com", "x.com",
  "instagram.com", "tiktok.com", "threads.net", "t.me", "reddit.com",
  // 커뮤니티·위키
  "dcinside.com", "fmkorea.com", "clien.net", "ppomppu.co.kr",
  "mlbpark.donga.com", "bobaedream.co.kr", "ruliweb.com", "theqoo.net",
  "instiz.net", "82cook.com", "thinkpool.com", "namu.wiki", "wikipedia.org",
];

function sourceHost(u) {
  try { return new URL(u).hostname.replace(/^www\./, "").toLowerCase(); }
  catch (_e) { return ""; }
}
function matchDomain(host, list) {
  return !!host && list.some((d) => host === d || host.endsWith("." + d));
}
function isTrustedSource(u) { return matchDomain(sourceHost(u), TRUSTED_SOURCES); }
// 매칭된 '신뢰 도메인 등록명'을 돌려준다 — comp.fnguide.com·asp01.fnguide.com 이 모두
// "fnguide.com" 으로 귀결되므로, 같은 제공자의 서브도메인 2개가 '독립 출처 2개'로 세어지는 것을 막는다.
function trustedDomainOf(u) {
  const h = sourceHost(u);
  if (!h) return null;
  return TRUSTED_SOURCES.find((d) => h === d || h.endsWith("." + d)) || null;
}
function isBlockedSource(u) { return matchDomain(sourceHost(u), BLOCKED_SOURCES); }


const MARKETS = { korea: ["KOSPI", "KOSDAQ"], us: ["NASDAQ", "NYSE", "AMEX"] };   // AMEX 우량주(예: 일부 ETF·중형주) 편입 허용
// 개인 목록 주제 — 사용자가 앱에서 직접 담는 '관심'·'보유' 탭. 추천 편성이 아니라
// 모니터링·보유 현황이므로 (주제×국가) 9종목·tier 3/3/3 구조와 tier 자체가 면제된다.
// (종목별 필드 검증·신뢰 출처·목표가 가드레일은 추천 종목과 똑같이 적용된다.)
const PERSONAL_THEMES = ["watch", "hold"];
const isPersonalTheme = (t) => PERSONAL_THEMES.includes(t);
// 주목(spotlight, 2026-10-30 히든 자리) — 정기 분석이 차트(신고가·턴어라운드)와 훌륭한 기업 관문으로 고르는 목록(§4-7).
//   tier 가 없고 나라·모양별 5종목까지라 9종목·tier 구조와 정식 편성 규칙(결격·티어·발굴·β·그림자)에서 빠진다.
const SPOTLIGHT = "spotlight";
const SPOT_TAGS = ["신고가", "턴어라운드"];
const SPOT_PER_TAG = 5;
const NONFORMAL_THEMES = [SPOTLIGHT].concat(PERSONAL_THEMES);
const isFormalTheme = (t) => !NONFORMAL_THEMES.includes(t);
const PER_GROUP = 9;              // (주제×국가)당 종목 수
const PER_TIER = 3;               // 티어당 종목 수
const UPSIDE_TOL = 1.5;           // upside 필드 vs (target-price)/price*100 허용 오차(%p)
const STALE_PRICE_DAYS = 45;      // priceDate 가 이보다 오래되면 경고
const TIER_STALE_DAYS = 14;       // tierAsOf(티어 품질 평가일)가 이보다 오래되면 경고 — 티어를 최신 데이터로 유지

// 화면 문장(thesis·valueNote·risks·earnings·Top Pick 이유)에 '그날 가격에 따라 바뀌는 수치'가 박혔는지 — 있으면 그 조각을 반환.
// 왜(2026-10-16): valueNote 110/113·thesis 17·risks 8 이 '목표가 X원 대비 상승여력 Y%'·'목표주가 상향' 같은 수치를 담아
//   다음 날부터 카드 상단 값(네이버 목표가·현재가 매일 갱신)과 어긋났고, 큰 상승여력을 문장으로 한 번 더 강조했다.
//   이런 수치는 카드 상단 칸(목표가·현재가 대비·PER·PBR·배당 — 자동)이 맡고, 문장은 그 수치를 '어떻게 읽는지'만 쓴다.
//   회사 고유 수치(매출·이익 성장률·배당성향·ROE·순현금 등)는 가격과 무관해 허용한다.
const SPAN = "(?:[^.。\\n]|\\.(?=\\d)){0,16}?";   // 문장 경계(마침표)는 넘지 않되 소수점(12.5만)은 허용
const PRICE_NUM_RES = [
  /상승\s*여력[도은이을를의]?\s*(?:약|최대|기준|이)?\s*[+\-−]?\s*\d+(?:\.\d+)?\s*%/,
  new RegExp("(?:목표\\s*주?가|목표가격|적정\\s*주가|AI\\s*적정가)" + SPAN + "[$₩]?\\s*\\d[\\d,.]*\\s*(?:만\\s*원|원|달러|\\$)"),
  new RegExp("(?:목표\\s*주?가|AI\\s*적정가)" + SPAN + "\\$\\s*\\d"),
  // 목표가 변경 표기 '40만→35만원'·'$46→$65'·'46→65달러'
  /\d[\d,.]*\s*(?:만\s*원?|원|달러)?\s*(?:→|->)\s*\$?\s*\d[\d,.]*\s*(?:만\s*원|원|달러)/,
  /\$\s?\d[\d,.]*\s*(?:→|->)\s*\$?\s?\d/,
  // 증권사 이름 뒤 가격 '키움증권 16만원'·'NH투자증권(40만…' — 리포트 목표가 인용
  /(?:증권|투자증권|Securities)\s*\(?\s*\d[\d,.]*\s*만\s*원/,
  // 만원 단위 가격 — 이 앱의 문장에서 'N만원'은 사실상 주가·목표가다(매출·이익은 억·조원)
  /\d+(?:\.\d+)?\s*만\s*원/,
  /\b(?:P\/?E|PER|PBR|P\/B)\b[^.。\n]{0,8}?\d+(?:\.\d+)?\s*배/,
  /(?:주가수익비율|주가순자산비율)[^.。\n]{0,8}?\d+(?:\.\d+)?\s*배/,
  // 배당 '수익률' 만 — '배당 4% 인상'·'배당을 10% 늘렸다' 같은 회사의 배당 증감률은 가격과 무관해 허용
  /배당(?!성향)(?:수익률)?\s*(?:은|는|이|률)?\s*(?:약\s*)?\d+(?:\.\d+)?\s*%(?!\s*(?:인상|증가|상향|확대|늘|성장|감소|삭감|인하|줄))/,
];
function priceNumberIn(text) {
  if (!text) return null;
  const t = String(text);
  for (const re of PRICE_NUM_RES) { const m = t.match(re); if (m) return m[0]; }
  return null;
}

// 분산 가드레일(2026-10-21 사용자 승인): ①같은 종목은 정식 주제 1곳에만 ②한국 같은 기업집단·금융 업종은 국가 정식 편성(고유 종목)의
// 일정 수 이하. 기존 초과는 경고(check-defects 가 중복을 결격으로 올려 교체), update-reco 는 '더 나빠지는' 편입을 거부한다.
const GROUP_CAP = 5, FIN_CAP = 7;
const KR_GROUPS = [["삼성", /^삼성/], ["SK", /^SK/], ["LG", /^LG/], ["현대차", /^현대(차|자동차|모비스|글로비스|로템|위아|건설|제철|오토에버|비앤지스틸)|^기아|^이노션/], ["HD현대", /^HD/],
  ["한화", /^한화/], ["롯데", /^롯데/], ["CJ", /^CJ/], ["포스코", /^POSCO|^포스코/], ["두산", /^두산/], ["GS", /^GS/], ["카카오", /^카카오/], ["LS", /^LS/]];
// 금융 판정은 스크린(discovery-candidates.js)의 fin 표시(네이버 업종 코드 — 은행·보험·증권·카드)를 먼저 쓰고, 스크린에 없는 종목만 이름으로.
// 이름만 보면 '신한지주'처럼 금융 낱말이 없는 금융지주를 놓친다(2026-10-21 점검).
const FIN_RE = /금융|은행|화재|손해|생명|증권|카드|캐피탈|보험|해상|^신한지주$/;
let SCREEN_FIN = null;
function screenFin() {
  if (SCREEN_FIN) return SCREEN_FIN;
  SCREEN_FIN = new Map();
  try {
    const w = {};
    new Function("window", fs.readFileSync(path.join(ROOT, "data", "discovery-candidates.js"), "utf8"))(w);
    const G = (w.DISCOVERY_CANDIDATES || {}).groups || {};
    Object.keys(G).forEach((g) => {
      const c = g.split("|")[0];
      (G[g].incumbents || []).concat(G[g].candidates || []).forEach((r) => {
        if (r && r.ticker && r.fin != null) SCREEN_FIN.set(c + "|" + r.ticker, !!r.fin || !!SCREEN_FIN.get(c + "|" + r.ticker));
      });
    });
  } catch (_e) { /* 스크린이 없으면 이름으로만 판정 */ }
  return SCREEN_FIN;
}
function concentration(D) {
  const out = { dup: 0, dupList: [], groups: { korea: {}, us: {} }, fin: { korea: 0, us: 0 }, over: [] };
  const sf = screenFin();
  ["korea", "us"].forEach((c) => {
    const occ = {};
    (D[c] || []).filter((s) => isFormalTheme(s.theme)).forEach((s) => { (occ[s.ticker] = occ[s.ticker] || { n: 0, s }).n++; });
    Object.keys(occ).forEach((t) => {
      const o = occ[t];
      if (o.n > 1) { out.dup += o.n - 1; out.dupList.push(c + ":" + t + "×" + o.n); }
      if (c === "korea") {
        KR_GROUPS.forEach(([g, re]) => { if (re.test(o.s.name)) out.groups.korea[g] = (out.groups.korea[g] || 0) + 1; });
        const k = c + "|" + t;
        if (sf.has(k) ? sf.get(k) : FIN_RE.test(o.s.name)) out.fin.korea++;
      }
    });
    Object.keys(out.groups[c]).forEach((g) => { if (out.groups[c][g] > GROUP_CAP) out.over.push(c + " " + g + "그룹 " + out.groups[c][g] + "종목(상한 " + GROUP_CAP + ")"); });
    if (out.fin[c] > FIN_CAP) out.over.push(c + " 금융 " + out.fin[c] + "종목(상한 " + FIN_CAP + ")");
  });
  return out;
}

function validate(D, opts) {
  opts = opts || {};
  const quotes = opts.quotes || {};
  // 내러티브(선정 이유·valueNote)에 하드코딩된 '상승여력 X%' 가 실계산과 어긋나면 경고.
  // 2026-08-11 감사 실측: Top Pick 6종목 전원이 작성 시점 upside 를 문구에 박아 두어
  // 같은 화면의 카드 수치와 최대 3.5배 괴리 — 문구 수치는 최신가 기준으로 다시 쓰거나 빼야 한다.
  function narrativeUpsideGap(text, s) {
    if (!text || !s) return null;
    // 부호 표기("상승여력 +11%", "상승여력 -5.5%", 유니코드 마이너스 −)도 잡는다 — 부호가 붙으면
    // 매치되지 않아 문구 수치 검사를 통째로 건너뛰고, 음수는 부호를 잃어 괴리가 과소 계산됐다.
    const m = String(text).match(/상승여력[도은이]?\s*([+\-−]?)\s*(\d+(?:\.\d+)?)\s*%/);
    if (!m) return null;
    const price = (quotes[s.ticker] && quotes[s.ticker].price) || s.price;
    if (typeof s.targetPrice !== "number" || typeof price !== "number" || price <= 0) return null;
    const real = (s.targetPrice - price) / price * 100;
    const said = (m[1] === "-" || m[1] === "−" ? -1 : 1) * parseFloat(m[2]);
    return { said: said, real: Math.round(real * 10) / 10, gap: Math.abs(said - real) };
  }
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
      // 관심·보유는 tier 구조 면제 대상이라 tier 자체도 선택 — 있으면 형식만 검사. 주목은 tier 대신 모양 이름표(신고가·턴어라운드)
      if (s.theme === SPOTLIGHT) {
        if (s.tier != null) errors.push(tag + ": 주목은 tier 가 없다 (" + s.tier + ")");
        if (!SPOT_TAGS.includes(s.watchTag)) errors.push(tag + ": 주목 종목은 watchTag 가 " + SPOT_TAGS.join("|") + " 여야 함 ('" + s.watchTag + "')");
      } else if (isPersonalTheme(s.theme)) {
        if (s.tier != null && ![1, 2, 3].includes(s.tier)) errors.push(tag + ": tier 는 1|2|3 이어야 함 (" + s.tier + ")");
        if (s.watchTag) warnings.push(tag + ": 관심·보유는 사용자가 직접 담은 종목이라 신고가·턴어라운드 이름표를 쓰지 않는다(그런 종목은 주목, §4-7)");
      } else if (![1, 2, 3].includes(s.tier)) errors.push(tag + ": tier 는 1|2|3 이어야 함 (" + s.tier + ")");
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

      // AI적정가(선택) — 컨센서스와 별개인 자체 분석치. 근거(aiBasis) 없이는 저장 거부.
      if (s.aiTarget != null) {
        if (!(typeof s.aiTarget === "number" && isFinite(s.aiTarget) && s.aiTarget > 0)) {
          errors.push(tag + ": aiTarget 오류 (" + s.aiTarget + ")");
        }
        if (!s.aiBasis || !RE_HANGUL.test(s.aiBasis)) {
          errors.push(tag + ": aiTarget 에는 한국어 aiBasis(산출 공식·입력값 근거)가 필수");
        }
        if (typeof s.targetPrice === "number" && s.targetPrice > 0 &&
            Math.abs(s.aiTarget - s.targetPrice) / s.targetPrice > 0.5) {
          warnings.push(tag + ": aiTarget(" + s.aiTarget + ")이 컨센서스 목표가와 50% 이상 괴리 — 입력값 재확인 필요");
        }
        if (s.aiAsOf != null) {
          if (!RE_DATE.test(s.aiAsOf)) errors.push(tag + ": aiAsOf 형식 오류 '" + s.aiAsOf + "'");
          else {
            const aiAge = (new Date(today) - new Date(s.aiAsOf)) / 86400000;
            if (aiAge > 45) warnings.push(tag + ": AI적정가 산출 후 " + Math.round(aiAge) + "일 경과 — 재산출 대상");
          }
        }
      }

      // 분석 텍스트 — 한국어 강제 (루틴이 영어로 채우는 퇴행 방지)
      if (!s.earnings || !RE_HANGUL.test(s.earnings)) errors.push(tag + ": earnings 누락 또는 한국어 아님");
      if (!s.thesis || !RE_HANGUL.test(s.thesis)) errors.push(tag + ": thesis 누락 또는 한국어 아님");
      if (!Array.isArray(s.risks) || !s.risks.length || s.risks.length > 4 || s.risks.some((r) => !r || !RE_HANGUL.test(r))) {
        errors.push(tag + ": risks 는 한국어 1~4개 배열이어야 함");
      }

      // 기술 대응(techNote, 선택) — 6단계 분석의 결론을 단기(일봉)/중기(주봉)/장기(월봉) 대응으로 압축.
      if (s.techNote != null) {
        const n = s.techNote;
        if (typeof n !== "object" || Array.isArray(n)) errors.push(tag + ": techNote 는 객체여야 함");
        else {
          if (!n.short || !RE_HANGUL.test(n.short)) errors.push(tag + ": techNote.short(단기 대응) 누락 또는 한국어 아님");
          if (!n.long || !RE_HANGUL.test(n.long)) errors.push(tag + ": techNote.long(장기 대응) 누락 또는 한국어 아님");
          // 중기(주봉)는 2026-08-08 신설이라 기존 데이터엔 없다 — 있으면 검증하고, 없으면
          // 경고만 남긴다(오류로 막으면 채우기 전엔 어떤 패치도 저장할 수 없다).
          // 전량 채움은 coverage.js 게이트가 강제한다.
          if (n.mid == null) warnings.push(tag + ": techNote.mid(중기 대응) 없음 — 다음 업데이트에서 채울 것");
          else if (!RE_HANGUL.test(n.mid)) errors.push(tag + ": techNote.mid(중기 대응) 가 한국어가 아님");
          if (n.asOf != null) {
            if (!RE_DATE.test(n.asOf)) errors.push(tag + ": techNote.asOf 형식 오류 '" + n.asOf + "'");
            else if (n.asOf > today) errors.push(tag + ": techNote.asOf 가 미래 날짜 " + n.asOf);
            else if ((new Date(today) - new Date(n.asOf)) / 86400000 > 10) warnings.push(tag + ": techNote 산출 후 10일 경과 (" + n.asOf + ") — 갱신 대상");
          }
          const SIGS = ["적극매도", "매도", "중립", "매수", "적극매수"];
          if (n.sigShort != null && SIGS.indexOf(n.sigShort) < 0) errors.push(tag + ": techNote.sigShort 는 5단계(" + SIGS.join("/") + ") 중 하나여야 함 (현재 '" + n.sigShort + "')");
          if (n.sigMid != null && SIGS.indexOf(n.sigMid) < 0) errors.push(tag + ": techNote.sigMid 는 5단계 중 하나여야 함 (현재 '" + n.sigMid + "')");
          if (n.sigLong != null && SIGS.indexOf(n.sigLong) < 0) errors.push(tag + ": techNote.sigLong 는 5단계 중 하나여야 함 (현재 '" + n.sigLong + "')");
          // 엔진 정합성 — 같은 거래일(techNote.asOf == stock-ta.asOf)에 쓴 신호 등급이 백테스트로 검증된
          // 엔진 등급(stock-ta.js)과 어긋나면 사용자는 근거 없는 등급을 보게 된다(2026-09-30 실측:
          // 348개 등급 중 47개 불일치, 3개는 2단계 이상 — 엔진 '매도'인데 문구 '매수'). 문구가 설명하는
          // 대상은 엔진 등급이어야 하므로 1단계 차이는 경고, 방향이 뒤집히는 2단계 이상은 오류로 막는다.
          // 날짜가 다르면(Action 이 T 를 올린 뒤 등) 비교 대상이 아니므로 검사하지 않는다 — 그 경우는
          // '⚠ 미갱신' 표시와 coverage.js 게이트가 처리한다.
          const TAx = opts.ta && opts.ta.ta && opts.ta.ta[s.ticker];
          if (TAx && n.asOf && opts.ta.asOf === n.asOf) {
            [["sigShort", "short", "단기"], ["sigMid", "mid", "중기"], ["sigLong", "long", "장기"]].forEach(([k, tf, lbl]) => {
              const eng = TAx[tf] && TAx[tf].signal, mine = n[k];
              const ie = SIGS.indexOf(eng), im = SIGS.indexOf(mine);
              if (ie < 0 || im < 0 || ie === im) return;
              const msg = tag + ": techNote." + k + "(" + lbl + ") '" + mine + "' 가 같은 날 엔진 등급 '" + eng + "' 와 " + Math.abs(ie - im) + "단계 어긋남";
              if (Math.abs(ie - im) >= 2) errors.push(msg + " — 엔진 등급으로 맞추고 문구를 그 근거로 다시 쓸 것");
              else warnings.push(msg + " — 엔진 등급과 맞출 것");
            });
          }
          // 형식 v2(2026-10-16~, CLAUDE.md §4-2): 추격형 매매 지시 금지 — 등급 전환은 이미 움직인 뒤에 나온다
          // (진단: 전환 직후 1개월 지수 대비 평균 -1.1~+0.9%, 전환 전 20일에 이미 ±2.5~6%). v2 를 표방한 문장에
          // '돌파 시 비중을 늘린다'·'이탈 시 비중을 줄인다' 류가 있으면 막는다(v3 부터는 gen-technote.js 가 쓰므로 템플릿을 고칠 때의 안전장치).
          const CHASE = /비중을?\s*(늘|줄)|비중\s*(확대|축소)|추격\s*(매수|매도)/;
          if ((n.v || 1) >= 2) ["short", "mid", "long"].forEach((k) => {
            const m = n[k] && String(n[k]).match(CHASE);
            if (m) errors.push(tag + ": techNote." + k + " 에 추격형 매매 지시('" + m[0] + "') — v2 는 확인·무효화 가격과 다음 1·3개월 범위로 쓴다(§4-2)");
          });
        }
      }

      // 밸류 설명(valueNote, 선택) — 그 종목의 밸류에이션(멀티플·저평가/고평가)+상승여력 해석 1~2문장.
      if (s.valueNote != null) {
        if (typeof s.valueNote !== "string" || !RE_HANGUL.test(s.valueNote)) errors.push(tag + ": valueNote 는 한국어 문자열이어야 함");
        else if (s.valueNote.length > 220) warnings.push(tag + ": valueNote 가 너무 김(" + s.valueNote.length + "자) — 1~2문장으로 압축 권장");
        // valueNote 는 회전 재작성이라 topPicks(매일)보다 관대한 15%p 로만 경고한다
        const vg = narrativeUpsideGap(s.valueNote, s);
        if (vg && vg.gap > 15) warnings.push(tag + ": valueNote 속 상승여력 " + vg.said + "% 가 실계산 " + vg.real + "% 와 " + vg.gap.toFixed(1) + "%p 괴리 — 다음 회전에서 수치 갱신 필요");
      }
      // 화면 문장 속 가격 의존 수치(§4 공통) — 기존 데이터는 경고(다음 회전에서 수치 없이 재작성), 새로 쓰는 패치는 update-reco 가 거부
      ["valueNote", "thesis", "earnings"].forEach((k) => { const hit = priceNumberIn(s[k]); if (hit) warnings.push(tag + ": " + k + " 에 가격 의존 수치('" + hit + "') — 카드 상단 칸이 맡는다, 수치 없이 재작성"); });
      (Array.isArray(s.risks) ? s.risks : []).forEach((r, i) => { const hit = priceNumberIn(r); if (hit) warnings.push(tag + ": risks[" + i + "] 에 가격 의존 수치('" + hit + "') — 수치 없이 재작성"); });

      // 컨센서스 신선도 — 네이버 집계 기준일이 30일을 넘었거나(tpStale) 수기 목표가인데 재확인이 14일 넘게 없으면 경고
      {
        if (s.tpStale) warnings.push(tag + ": 컨센서스 집계 기준일 " + (s.tpAsOf || "?") + " — 30일 초과(목표가 웹 재검증 우선)");
        else if (s.tpSource !== "naver" && s.verifiedAt && (Date.now() - Date.parse(s.verifiedAt)) / 86400000 > 14)
          warnings.push(tag + ": 수기 목표가(네이버 컨센서스 없음) 재확인 14일 초과 — 재검증 우선");
      }
      // 출처 — 신규 편입·논거 변경의 증거 사슬
      if (!RE_URL.test(s.chartUrl || "")) errors.push(tag + ": chartUrl 오류");
      // 차트 링크 형식 — 한국 m.stock.naver.com/domestic/stock/<코드>/total, 미국 …/worldstock/stock/<네이버 reutersCode>/total
      //   (네이버 미국 코드: 나스닥 'AAPL.O', 뉴욕거래소는 접미사 없이 'KO', 버크셔 B 'BRKb' — 'KO.N' 은 없는 코드라 빈 화면이 뜬다)
      else if (!new RegExp("^https://m\\.stock\\.naver\\.com/" + (c === "korea" ? "domestic" : "worldstock") + "/stock/[A-Za-z0-9.]+/total$").test(s.chartUrl))
        warnings.push(tag + ": chartUrl 형식 — 네이버 증권 종목 페이지(…/stock/<코드>/total) 주소로 통일할 것(" + s.chartUrl + ")");
      if (!Array.isArray(s.sources) || s.sources.length < 1 || s.sources.length > 3) {
        errors.push(tag + ": sources 는 URL 1~3개여야 함");
      } else {
        s.sources.forEach((u) => {
          if (!RE_URL.test(u)) errors.push(tag + ": sources URL 형식 오류 '" + String(u).slice(0, 60) + "'");
          else if (BAD_URL_HINTS.some((h) => u.includes(h))) errors.push(tag + ": sources 에 플레이스홀더 도메인 '" + u + "'");
          else if (isBlockedSource(u)) warnings.push(tag + ": 커뮤니티/블로그/SNS 출처 '" + sourceHost(u) + "' — 신뢰 출처(컨센서스·공시·주요언론)로 교체 필요, 재평가 우선 대상");
        });
        // 신뢰 출처가 하나도 없으면 근거가 약한 종목 — 재평가 때 신뢰 출처로 보강 대상
        if (!s.sources.some((u) => isTrustedSource(u))) {
          warnings.push(tag + ": 신뢰 출처 0개 (" + s.sources.map(sourceHost).join(", ") + ") — 컨센서스 집계/공시/주요언론 출처로 보강 필요");
        }
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
      // 시세 신선도 — 표시 가격은 quotes.js 가 우선이므로 그쪽 날짜로 본다. 저장된 price/priceDate 는
      // quotes.js 미보유 종목용 폴백일 뿐이라, quotes.js 에 시세가 있는데 폴백 날짜로 경고하면
      // 실제 문제(목표가 소진 등) 경고가 노이즈에 묻힌다(2026-10-03 실측: 경고 99건 중 93건이 이것).
      const effDate = q && typeof q.price === "number" && RE_DATE.test(q.date || "") ? q.date : s.priceDate;
      if (RE_DATE.test(effDate || "")) {
        const age = (new Date(today) - new Date(effDate)) / 86400000;
        if (age > STALE_PRICE_DAYS) warnings.push(tag + ": 시세가 " + Math.round(age) + "일 경과 (" + effDate +
          (effDate === s.priceDate && !q ? ", quotes.js 미보유" : "") + ")");
      }
      // 티어 신선도 — 티어는 항상 최신 펀더멘털로 유지(주목·관심·보유는 tier 가 없어 제외)
      if (isFormalTheme(s.theme)) {
        if (!RE_DATE.test(s.tierAsOf || "")) {
          warnings.push(tag + ": tierAsOf(티어 품질 평가일) 없음 — 최신 데이터로 티어 재평가 필요");
        } else {
          const tAge = (new Date(today) - new Date(s.tierAsOf)) / 86400000;
          if (tAge > TIER_STALE_DAYS) warnings.push(tag + ": tierAsOf 가 " + Math.round(tAge) + "일 경과 (" + s.tierAsOf + ") — 최신 펀더멘털로 티어 재평가 대상");
        }
      }
      if (typeof s.dividendYield === "number" && s.dividendYield > 12) {
        warnings.push(tag + ": 배당수익률 " + s.dividendYield + "% — 비정상적으로 높음, 확인 필요");
      }
    });

    // 같은 (theme,ticker) 중복 금지
    Object.keys(dupCheck).forEach((k) => {
      if (dupCheck[k] > 1) errors.push(c + ": (" + k + ") 이 같은 주제에 " + dupCheck[k] + "번 등장");
    });

    // 주제별 9종목 · Tier 3×3 구조 (주목 'spotlight'·관심 'watch'·보유 'hold' 는 구조 규칙 면제 — 주목은 모양별 정원만 본다)
    {
      const sp = groups[SPOTLIGHT] || [];
      SPOT_TAGS.forEach((tg) => {
        const n = sp.filter((s) => s.watchTag === tg).length;
        if (n > SPOT_PER_TAG) warnings.push(c + "/" + SPOTLIGHT + ": " + tg + " " + n + "종목 — 정원 " + SPOT_PER_TAG + " 초과(§4-7)");
      });
    }
    themeKeys.forEach((tk) => {
      if (!isFormalTheme(tk)) return;
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

  // ── 오늘의 Top Pick (선택) — 국가별(korea·us) 정식 추천·주목·관심 종목(보유 제외 — 2026-10-30 사용자 요청) 3종목씩 ──
  // 추세 붕괴(2026-10-17 사용자 결정, CLAUDE.md §6): 엔진 단·중·장기 신호가 모두 '매도' 이하인 종목은 추천하지 않는다.
  //   정식 편성에 있으면 경고(다음 C 모드·회차에서 검증된 대체 후보와 교체), Top Pick 이면 오류.
  const trendBroken = (t) => { const x = opts.ta && opts.ta.ta && opts.ta.ta[t]; return !!(x && ["short", "mid", "long"].every((k) => x[k] && /매도/.test(x[k].signal || ""))); };
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (isFormalTheme(s.theme) && trendBroken(s.ticker)) warnings.push(c + ":" + s.ticker + " " + s.name + "(" + s.theme + "): 추세 붕괴(단·중·장기 모두 매도 이하) — 정식 추천 결격, 검증된 대체 후보와 교체 대상");
  }));
  {
    const cc = concentration(D);
    if (cc.dup) warnings.push("분산: 정식 주제 중복 " + cc.dup + "자리(" + cc.dupList.join(", ") + ") — 한 종목은 한 주제에만, check-defects 가 '중복' 결격으로 교체 대상에 올린다");
    cc.over.forEach((x) => warnings.push("분산: " + x + " — 이 그룹·업종을 늘리는 편입 금지, 교체 때 줄이는 쪽 우선"));
  }
  if (D.topPicks != null) {
    const tp = D.topPicks;
    if (typeof tp !== "object" || Array.isArray(tp)) {
      errors.push("topPicks 는 {asOf, korea[], us[]} 객체여야 함");
    } else {
      if (!RE_DATE.test(tp.asOf || "")) errors.push("topPicks.asOf 형식 오류: " + tp.asOf);
      else if (tp.asOf > today) errors.push("topPicks.asOf 가 미래 날짜: " + tp.asOf);
      // 국가별 Top Pick 후보(정식 추천 + 관심 — lib-picks canPick) 티커 집합
      const { canPick } = require("./lib-picks");
      function pickableOf(cc) {
        const set = new Set();
        const src = cc === "items" ? ["korea", "us"] : [cc];
        src.forEach((c) => (D[c] || []).forEach((s) => { if (canPick(s.theme)) set.add(s.ticker); }));
        return set;
      }
      const tpByTicker = {};
      ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => { if (!tpByTicker[s.ticker]) tpByTicker[s.ticker] = s; }));
      const groups = ["korea", "us", "items"].filter((g) => tp[g] !== undefined);
      if (!groups.length) errors.push("topPicks 에 korea·us 그룹이 없음 (각 국가 3종목 필요)");
      groups.forEach((g) => {
        const arr = tp[g];
        if (!Array.isArray(arr) || arr.length !== 3) {
          errors.push("topPicks." + g + " 는 정확히 3종목 배열이어야 함 (현재 " + (Array.isArray(arr) ? arr.length : "비배열") + ")");
          return;
        }
        const pickable = pickableOf(g);
        const seen = {};
        arr.forEach((it, i) => {
          const tag = "topPicks." + g + "[" + i + "]";
          if (!it || typeof it !== "object") { errors.push(tag + ": 객체 아님"); return; }
          if (!it.ticker) errors.push(tag + ": ticker 누락");
          else if (trendBroken(it.ticker)) errors.push(tag + ": " + it.ticker + " 추세 붕괴(단·중·장기 모두 매도 이하) — Top Pick 제외 대상");
          else {
            if (!pickable.has(it.ticker)) errors.push(tag + ": '" + it.ticker + "' 는 " + (g === "us" ? "미국" : g === "korea" ? "한국" : "") + " 정식 추천·주목·관심 종목이 아님 (보유·타국·미편성 불가)");
            seen[it.ticker] = (seen[it.ticker] || 0) + 1;
          }
          if (!it.reason || !RE_HANGUL.test(it.reason)) errors.push(tag + ": reason(선정 이유) 누락 또는 한국어 아님");
          // 이유 문구에 박힌 상승여력 수치가 실계산과 10%p 넘게 어긋나면 경고 — 작성 시점
          // 수치를 하드코딩하면 가격이 움직인 뒤 카드 표시값과 모순돼 사용자를 오도한다.
          const ng = narrativeUpsideGap(it.reason, tpByTicker[it.ticker]);
          if (ng && ng.gap > 10) warnings.push(tag + ": 이유 속 상승여력 " + ng.said + "% 가 실계산 " + ng.real + "% 와 " + ng.gap.toFixed(1) + "%p 괴리 — 최신가 기준으로 다시 쓸 것");
          const pn = priceNumberIn(it.reason);
          if (pn) warnings.push(tag + ": 이유에 가격 의존 수치('" + pn + "') — 상승여력 크기로 고르지 않는다(§4-6), 수치 없이 쓸 것");
        });
        Object.keys(seen).forEach((t) => { if (seen[t] > 1) errors.push("topPicks." + g + ": '" + t + "' 중복 선정"); });
      });
    }
  }

  return { errors, warnings };
}

// 엔진 등급(stock-ta.js) — techNote 신호 등급 정합성 검사용. 없거나 깨졌으면 검사 생략(null).
function loadTa() {
  const TA_FILE = path.join(ROOT, "data", "stock-ta.js");
  if (!fs.existsSync(TA_FILE)) return null;
  try { return loadGlobalScript(TA_FILE, "STOCK_TA") || null; } catch (_e) { return null; }
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

  const { errors, warnings } = validate(D, { quotes, ta: loadTa() });
  // 선정 규칙 동결(CLAUDE.md §6) — 규칙이 든 파일·주제 정의가 기준선과 다르면 경고(받아들일 땐 rules-freeze.js --accept "사유")
  try {
    const fz = require("./rules-freeze").freezeStatus(D);
    if (fz.active && fz.changed.length) warnings.push("선정 규칙 동결 중(" + fz.from + " ~ " + fz.until + "): " + fz.changed.join(", ") +
      " 이(가) 기준선과 다르다 — 버그 수정·승인된 변경이면 node scripts/rules-freeze.js --accept \"사유\", 아니면 되돌린다");
  } catch (e) { warnings.push("선정 규칙 동결 확인 실패: " + e.message); }
  // Top Pick 선정 규칙(2026-10-27~, CLAUDE.md §4-6): 지금 데이터로 다시 매긴 lib-picks 순위 1~3위와 같아야 한다 — 최신 거래일 몫으로 쓴 것만 본다
  try {
    const tp = D.topPicks, T = (loadTa() || {}).asOf;
    if (tp && T && tp.asOf >= T) {
      const win = (f, k) => { const p = path.join(ROOT, "data", f); return fs.existsSync(p) ? loadGlobalScript(p, k) : null; };
      const R = require("./lib-picks").rankPicks({ D, TA: loadTa(), EV: (win("events.js", "STOCK_EVENTS") || {}).items || {},
        CA: win("candidates.js", "CANDIDATES") || { groups: {} }, DC: win("discovery-candidates.js", "DISCOVERY_CANDIDATES"),
        FU: (win("fundamentals.js", "STOCK_FUND") || {}).items || {}, RV: (win("revisions.js", "STOCK_REVISIONS") || {}).items || {} });
      ["korea", "us"].forEach((c) => {
        const want = R[c].top, got = (tp[c] || []).map((x) => x.ticker);
        if (want.length === 3 && want.join() !== got.join()) warnings.push("topPicks." + c + " 가 지금 순위 1~3위(" + want.join(", ") + ")와 다르다(" + got.join(", ") +
          ") — node scripts/pick-score.js 로 확인하고 그 순서로 다시 쓴다(§4-6)");
      });
    }
  } catch (e) { warnings.push("Top Pick 순위 확인 실패: " + e.message); }
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

module.exports = { concentration, GROUP_CAP, FIN_CAP, validate, loadTa, isTrustedSource, isBlockedSource, sourceHost, trustedDomainOf, PERSONAL_THEMES, isPersonalTheme,
  SPOTLIGHT, SPOT_TAGS, SPOT_PER_TAG, NONFORMAL_THEMES, isFormalTheme, priceNumberIn };
