// Claude API 공용 도구 — AI 단계(ai-daily·ai-defects·ai-news)가 함께 쓴다.
// 키는 환경변수 ANTHROPIC_API_KEY(GitHub Secrets)에서만 읽는다. 키가 없으면 client() 가 null 을 돌려주고
// 각 스크립트는 아무것도 바꾸지 않고 끝난다(그날 몫은 지금처럼 A 루틴 세션이 쓴다).
//
// 호출은 두 단계로 나눈다:
//   research() — 웹 검색 도구로 조사해 메모(문장 + 검색 결과 URL)를 받는다.
//   compose()  — 검색 없이 데이터 + 메모로 정해진 JSON(structured outputs)을 받는다.
// 나누는 이유: JSON 출력 형식은 인용(citations)과 함께 쓸 수 없고, 출처를 '검색 결과에 실제로 나온 URL 번호'로만
// 고르게 해야 모델이 URL 을 지어내지 못한다.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const CACHE_DIR = process.env.AI_CACHE_DIR || path.join(ROOT, ".ai-cache");

// 모델 — 기본값은 작업 성격에 맞춰 고른다(환경변수로 바꿀 수 있다)
const MODELS = {
  daily: process.env.AI_MODEL_DAILY || "claude-opus-5-5",      // 시황·유동성·지수 대응·Top Pick — 판단의 질이 중요
  defects: process.env.AI_MODEL_DEFECTS || "claude-sonnet-5-5", // 결격 점검 판정 — 종목당 짧은 조사
  news: process.env.AI_MODEL_NEWS || "claude-haiku-5-5",        // 뉴스 한 줄 요약 — 100종목 이상, 검색 없음
};
// 100만 토큰당 달러(입력·출력·캐시 읽기, 2026-10 공시가) — ai-status.js 의 비용 추정용
const PRICE = {
  "claude-opus-5-5": { in: 4, out: 20, cacheRead: 0.2 },
  "claude-sonnet-5-5": { in: 2, out: 10, cacheRead: 0.2 },
  "claude-haiku-5-5": { in: 0.1, out: 0.5, cacheRead: 0.01 },
};
// 거절(refusal) 시 서버가 다른 모델로 다시 돌려 주는 기능 — Opus·Sonnet 5.5 만(Haiku 는 없음)
const FALLBACK_OK = new Set(["claude-opus-5-5", "claude-sonnet-5-5"]);
const FALLBACK_BETA = "server-side-fallback-2026-07-01";

let SDK;
function sdk() {
  if (SDK === undefined) {
    try { const m = require("@anthropic-ai/sdk"); SDK = m.default || m; } catch (_e) { SDK = null; }
  }
  return SDK;
}
function client() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  const A = sdk();
  if (!A) throw new Error("@anthropic-ai/sdk 가 설치되지 않았습니다 — 저장소 루트에서 npm ci");
  return new A({ maxRetries: 3, timeout: 10 * 60 * 1000 });
}

function webSearchTool(model, maxUses) {
  const dyn = /^claude-(opus|sonnet)-5/.test(model);   // 동적 필터링 버전은 Opus·Sonnet 5 계열
  return { type: dyn ? "web_search_20260209" : "web_search_20250305", name: "web_search", max_uses: maxUses };
}
function withFallback(model, params) {
  if (FALLBACK_OK.has(model)) { params.betas = [FALLBACK_BETA]; params.fallbacks = "default"; }
  return params;
}

function newUsage() { return { calls: 0, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, searches: 0, usd: 0 }; }
function addUsage(acc, model, u) {
  if (!u) return acc;
  const p = PRICE[model] || PRICE["claude-opus-5-5"];
  const inp = u.input_tokens || 0, out = u.output_tokens || 0, cr = u.cache_read_input_tokens || 0, cw = u.cache_creation_input_tokens || 0;
  acc.calls++; acc.input += inp; acc.output += out; acc.cacheRead += cr; acc.cacheWrite += cw;
  acc.searches += (u.server_tool_use && u.server_tool_use.web_search_requests) || 0;
  acc.usd += (inp * p.in + out * p.out + cr * p.cacheRead + cw * p.in * 1.25) / 1e6;
  return acc;
}
function mergeUsage(a, b) {
  const o = newUsage();
  Object.keys(o).forEach((k) => { o[k] = (a[k] || 0) + (b[k] || 0); });
  return o;
}
function roundUsage(u) {
  return { calls: u.calls, input: u.input, output: u.output, cacheRead: u.cacheRead, searches: u.searches, usd: Math.round(u.usd * 1000) / 1000 };
}

class AiError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}
// 사람이 읽을 오류 한 줄(ai-status.js·로그)
function describeError(e) {
  const A = sdk();
  if (e instanceof AiError) return e.message;
  if (A) {
    if (e instanceof A.AuthenticationError) return "인증 실패 — ANTHROPIC_API_KEY 가 올바르지 않습니다";
    if (e instanceof A.PermissionDeniedError) return "권한 없음 — 키의 워크스페이스·모델 권한을 확인하세요";
    if (e instanceof A.RateLimitError) return "요청 한도 초과(429) — 잠시 후 다시 시도";
    if (e instanceof A.BadRequestError) return "요청 오류(400) — " + String(e.message || "").slice(0, 160);
    if (e instanceof A.APIConnectionError) return "API 연결 실패 — " + String(e.message || "").slice(0, 120);
    if (e instanceof A.APIError) return "API 오류 " + (e.status || "") + " — " + String(e.message || "").slice(0, 160);
  }
  return String((e && e.message) || e).slice(0, 200);
}

// 응답 블록들에서 검색 결과 URL 을 모은다 — web_search_tool_result 와(동적 필터링이면) 코드 실행 결과 안의 url 까지
function collectUrls(blocks) {
  const seen = new Map();
  const add = (url, title) => {
    if (typeof url !== "string" || !/^https?:\/\//.test(url)) return;
    const u = url.replace(/#.*$/, "");
    if (!seen.has(u)) seen.set(u, { url: u, title: typeof title === "string" ? title.slice(0, 140) : "" });
  };
  const walk = (x, depth) => {
    if (!x || depth > 6) return;
    if (Array.isArray(x)) { x.forEach((y) => walk(y, depth + 1)); return; }
    if (typeof x !== "object") return;
    if (typeof x.url === "string") add(x.url, x.title);
    Object.keys(x).forEach((k) => { if (k !== "url" && typeof x[k] === "object") walk(x[k], depth + 1); });
  };
  blocks.forEach((b) => {
    if (!b) return;
    if (b.type === "text") (b.citations || []).forEach((c) => add(c.url, c.title));
    else if (b.type !== "thinking" && b.type !== "redacted_thinking") walk(b, 0);
  });
  return [...seen.values()];
}

// 웹 검색으로 조사 → {text, urls[{url,title}], usage}
async function research(cl, { model, system, prompt, maxSearches = 5, effort = "medium", maxTokens = 32000 }) {
  const usage = newUsage();
  const base = withFallback(model, { model, max_tokens: maxTokens, system, tools: [webSearchTool(model, maxSearches)], output_config: { effort } });
  let messages = [{ role: "user", content: prompt }];
  const blocks = [];
  let msg;
  // 서버 쪽 도구 반복이 한도에 닿으면 pause_turn — 같은 대화를 그대로 다시 보내면 이어서 한다(최대 3회)
  for (let i = 0; i < 4; i++) {
    msg = await cl.beta.messages.stream(Object.assign({}, base, { messages })).finalMessage();
    addUsage(usage, model, msg.usage);
    blocks.push(...(msg.content || []));
    if (msg.stop_reason !== "pause_turn") break;
    messages = messages.concat([{ role: "assistant", content: msg.content }]);
  }
  if (msg.stop_reason === "refusal") throw new AiError("refusal", "모델이 요청을 거절했습니다(" + ((msg.stop_details && msg.stop_details.category) || "분류 없음") + ")");
  const text = blocks.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  const searchErrors = blocks.filter((b) => b.type === "web_search_tool_result" && b.content && !Array.isArray(b.content))
    .map((b) => b.content.error_code).filter(Boolean);
  return { text, urls: collectUrls(blocks), usage, searchErrors, stop: msg.stop_reason };
}

// 데이터 + 메모 → JSON(정해진 스키마) → {data, usage}
async function compose(cl, { model, system, prompt, schema, effort = "high", maxTokens = 24000 }) {
  const usage = newUsage();
  const params = withFallback(model, {
    model, max_tokens: maxTokens, system,
    messages: [{ role: "user", content: prompt }],
    output_config: { effort, format: { type: "json_schema", schema } },
  });
  const msg = await cl.beta.messages.stream(params).finalMessage();
  addUsage(usage, model, msg.usage);
  if (msg.stop_reason === "refusal") throw new AiError("refusal", "모델이 요청을 거절했습니다(" + ((msg.stop_details && msg.stop_details.category) || "분류 없음") + ")");
  if (msg.stop_reason === "max_tokens") throw new AiError("max_tokens", "출력이 max_tokens 에서 잘렸습니다");
  const text = (msg.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
  try { return { data: JSON.parse(text), usage }; }
  catch (_e) { throw new AiError("json", "JSON 출력 해석 실패: " + text.slice(0, 120)); }
}

// ── 파일 도우미 ──
function loadWin(file, key) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  const w = {};
  try { new Function("window", fs.readFileSync(p, "utf8"))(w); } catch (_e) { return null; }
  return w[key] || null;
}
function readCache(name) {
  try { return JSON.parse(fs.readFileSync(path.join(CACHE_DIR, name), "utf8")); } catch (_e) { return null; }
}
function writeCache(name, obj) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, name), JSON.stringify(obj));
}
// data/ai-status.js — 앱 'AI 연결' 창의 '매일 자동 분석' 상태. part 단위로 병합한다.
const STATUS = path.join(DATA, "ai-status.js");
function readStatus() { return loadWin("ai-status.js", "AI_STATUS") || {}; }
function writeStatus(part, obj) {
  const st = readStatus();
  st[part] = obj;
  const head = "// AI 자동 분석 상태 — scripts/ai-daily.js·ai-defects.js·ai-news.js 가 기록(Claude API, 키는 GitHub Secrets ANTHROPIC_API_KEY).\n" +
    "// 앱 'AI 연결' 창이 '매일 자동 분석' 칸에 보여 준다. 비용은 토큰 기준 추정(웹 검색은 횟수만 — 검색당 요금 별도).\n";
  fs.writeFileSync(STATUS, head + "window.AI_STATUS = " + JSON.stringify(st, null, 1) + ";\n");
}
// 화면 문장의 '지문'(앱이 지금 보이는 문장이 AI 가 쓴 것인지 판별) — 앞 40자
const sigOf = (s) => String(s || "").replace(/\s+/g, " ").trim().slice(0, 40);
// 항목 지문 = 대표 문장 앞 40자 + '#' + 항목 화면 문장 전체의 FNV-1a(앱 index.html aiWrote 와 같은 계산).
//   왜(2026-10-26): 앞 40자만 보면 틀이 같은 지수 대응 단기 문장('매도 — 하락 추세에 일목 구름 아래, …')이 누가 썼든
//   같아 보여, ai-daily 가 A 세션이 같은 T 로 다시 쓴 지수 대응을 자기 것으로 알고 덮었다.
const norm1 = (s) => String(s || "").replace(/\s+/g, " ").trim();
const fpOf = (s) => {
  let h = 0x811c9dc5;
  const t = String(s || "");
  for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36);
};
// X = { D: STOCK_DATA, LQ: LIQUIDITY_DATA, IN: INDEX_NOTES } — 항목별 [대표 문장, 화면 문장 전체]
function aiParts(item, X) {
  const D = X.D || {}, LQ = X.LQ || {}, items = (X.IN && X.IN.items) || {}, tp = D.topPicks || {};
  if (item === "market") return [D.marketNote, [D.marketNote, D.marketNoteUS, D.marketNoteKR].map(norm1).join("\n")];
  if (item === "liquidity") {
    const us = LQ.us || {}, kr = LQ.korea || {};
    return [LQ.headline, [LQ.headline, LQ.headlineUS, LQ.headlineKR, LQ.nextCheck, us.shortTerm, us.midTerm, kr.shortTerm, kr.midTerm]
      .concat(us.drivers || [], kr.drivers || []).map(norm1).join("\n")];
  }
  if (item === "indexNotes") {
    return [(items.kospi || {}).short, Object.keys(items).sort().map((k) => {
      const n = items[k] || {};
      return k + ":" + [n.value, n.short, n.mid, n.long].map(norm1).join("|");
    }).join("\n")];
  }
  if (item === "topPicks") {
    return [(tp.korea && tp.korea[0] || {}).reason, ["korea", "us"].map((c) => (tp[c] || []).map((x) => x.ticker + ":" + norm1(x.reason)).join("|")).join("\n")];
  }
  return ["", ""];
}
const aiSig = (item, X) => { const p = aiParts(item, X); return sigOf(p[0]) + "#" + fpOf(p[1]); };
// 지문 비교 — 예전 형식(앞 40자만, 2026-10-26 전 기록)은 앞부분만 견준다(그 항목을 다음에 쓰거나 볼 때 새 형식으로 바뀐다)
const sameSig = (a, b) => !!a && !!b && (a === b || (String(a).indexOf("#") < 0 && a === String(b).split("#")[0]));

// 매매 지시 문구 — 화면 문장에 쓰지 않는다(CLAUDE.md §4-2). '개인의 추격 매수가 몰렸다'·'손절 매물' 같은 시장 묘사는
// 사실이라 허용하고, 독자에게 행동을 권하는 꼴(…하라·…을 권한다·…가 유효하다·…할 기회다)만 막는다.
const DIRECTIVE = /(?:매수|매도|추격\s*매수|분할\s*매수|저가\s*매수|비중\s*(?:확대|축소)|손절|진입|청산|물타기)\s*(?:하라|하세요|하십시오|할\s*것을\s*권|를\s*권|을\s*권|권고|권유|추천합니다|가\s*유효|이\s*유효|전략이\s*유효|할\s*기회|기회다|기회로\s*삼)|지금\s*(?:사|팔)(?:라|세요|야\s*한다)/;

module.exports = {
  ROOT, DATA, CACHE_DIR, MODELS, PRICE, client, research, compose, newUsage, addUsage, mergeUsage, roundUsage,
  AiError, describeError, loadWin, readCache, writeCache, readStatus, writeStatus, sigOf, fpOf, aiParts, aiSig, sameSig, DIRECTIVE, collectUrls,
};
