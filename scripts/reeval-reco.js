#!/usr/bin/env node
// 매일 종목 재평가 — LLM(웹 검색)으로 "더 나은 종목"을 찾아 패치(JSON)를 생성한다.
//
// 왜: refresh-quotes.js 는 "가격만" 갱신할 뿐 종목 선정을 바꾸지 못한다.
//     이 스크립트는 현재 recommendations.js 전체를 LLM 에게 주고, 웹 검색으로
//     최신 펀더멘털·컨센서스·뉴스를 확인해 편입/편출·티어·목표가·논거를 갱신한
//     "패치"를 만든다. 패치는 update-reco.js 형식이므로 바뀐 종목만 담긴다(토큰 절약).
//
// 출력: 지정한 경로에 patch.json 을 쓴다. 이후 워크플로가
//       `node scripts/update-reco.js <patch.json>` 로 적용한다.
//
// 사용법:
//   ANTHROPIC_API_KEY=... node scripts/reeval-reco.js [--out patch.json] [--date YYYY-MM-DD]
//
// 필요 환경변수: ANTHROPIC_API_KEY (GitHub Actions Secret)

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");
const QUOTES = path.join(ROOT, "data", "quotes.js");

function argVal(name) {
  const i = process.argv.indexOf("--" + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--")
    ? process.argv[i + 1] : null;
}
const OUT = argVal("out") || path.join(ROOT, "reco-patch.json");
const TODAY = argVal("date") || new Date().toISOString().slice(0, 10);

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY 가 설정되지 않았습니다. GitHub Actions Secret 에 추가하세요.");
  process.exit(1);
}

// ── 현재 상태 로드(모델 입력용 원문 그대로) ──
if (!fs.existsSync(RECO)) { console.error("recommendations.js 없음"); process.exit(1); }
const recoSrc = fs.readFileSync(RECO, "utf8");
const quotesSrc = fs.existsSync(QUOTES) ? fs.readFileSync(QUOTES, "utf8") : "// (없음)";

// 로깅용 종목 수 계산
let stockCount = "?";
try {
  global.window = {};
  require(RECO);
  const D = global.window.STOCK_DATA || {};
  stockCount = ((D.korea || []).length) + ((D.us || []).length);
} catch (_e) { /* 계산 실패는 무시 */ }

// ── 패치 형식 명세(update-reco.js 와 일치해야 함) ──
const PATCH_SPEC = [
  "패치는 아래 형식의 JSON 하나여야 한다(모든 항목 선택적, 바뀐 것만 포함):",
  "{",
  '  "generatedAt": "' + TODAY + '",              // 항상 오늘 날짜로',
  '  "marketNote": "...",                          // 한국어 1~2문장 시황(갱신 시)',
  '  "stocks": [                                    // 기존 종목의 필드만 병합(국가+티커[+주제]로 매칭)',
  '    { "country": "korea"|"us", "ticker": "005930", "theme": "core", "tier": 1,',
  '      "targetPrice": 450000, "dividendYield": 0.5, "thesis": "...", "risks": ["...","..."],',
  '      "earnings": "...", "sources": ["https://...","https://..."] }',
  "  ],",
  '  "add": [                                        // 신규 편입(모든 핵심 필드 포함)',
  '    { "country": "us", "theme": "growth", "tier": 2, "name": "회사명", "ticker": "TSLA",',
  '      "market": "NASDAQ", "price": 250.1, "priceDate": "' + TODAY + '", "targetPrice": 300,',
  '      "upside": 20.0, "dividendYield": 0, "thesis": "...", "risks": ["..."],',
  '      "earnings": "...", "chartUrl": "https://finance.yahoo.com/quote/TSLA", "sources": ["https://..."] }',
  "  ],",
  '  "remove": [ { "country": "korea", "ticker": "000810" } ]   // 편출(theme 생략 시 해당 티커 전부)',
  "}",
].join("\n");

const RULES = [
  "규칙:",
  "1) 구조 유지: 각 (주제 theme × 국가 country) 조합은 정확히 9종목이어야 하며, 확신도에 따라 Tier 1(최우선)·2(차선)·3(관심) 각 3종목으로 나뉜다. 편입과 편출은 같은 (주제,국가) 안에서 짝을 맞춰 총 9종목을 유지하라.",
  "2) 주제(themes)·국가(korea/us) 목록 자체는 바꾸지 말라. market 은 한국은 \"KOSPI\" 또는 \"KOSDAQ\", 미국은 \"NASDAQ\" 또는 \"NYSE\".",
  "3) 시세(price/priceDate/upside)는 별도 스크립트가 매일 갱신하므로 기존 종목(stocks) 패치에는 넣지 말라. 단 신규 편입(add)은 조사한 현재가로 price·priceDate·upside·targetPrice 를 채워라(upside = (targetPrice-price)/price*100).",
  "4) 한국 종목 ticker 는 6자리 숫자 문자열(예: \"005930\"), 미국은 심볼(예: \"NVDA\", \"BRK.B\").",
  "5) targetPrice 는 증권사 컨센서스 기준, dividendYield 는 % 숫자. thesis/risks/earnings 는 한국어로.",
  "6) 보수적으로 교체하라: 명백히 더 나은 후보가 있거나, 기존 종목의 투자 논거가 훼손되었거나, 목표가에 도달해 상승여력이 사라진 경우에만 편출/편입하라. 근거가 약하면 그날은 바꾸지 말라(빈 stocks/add/remove 도 정상).",
  "7) 각 변경에는 신뢰할 수 있는 출처 URL 을 sources 에 1~3개 포함하라.",
  "8) 웹 검색으로 오늘 기준 최신 정보를 확인한 뒤 판단하라.",
  "9) 최종 출력은 ```json 코드블록 안에 패치 JSON 하나만. 그 외 설명 텍스트는 코드블록 밖에 최소한으로만.",
].join("\n");

const userPrompt = [
  "너는 한국·미국 주식 추천 대시보드의 종목 큐레이터다. 아래는 현재 recommendations.js(분석 데이터)와 quotes.js(최신 시세) 전문이다.",
  "웹 검색으로 각 종목의 최신 펀더멘털·증권사 목표가·최근 뉴스를 확인하고, 더 나은 종목이 있으면 교체하는 '패치'를 만들어라.",
  "",
  "=== 현재 recommendations.js ===",
  recoSrc,
  "",
  "=== 현재 quotes.js (최신 시세) ===",
  quotesSrc,
  "",
  "=== 패치 형식 ===",
  PATCH_SPEC,
  "",
  RULES,
  "",
  "오늘 날짜: " + TODAY + " · 총 종목 수(현재): " + stockCount,
].join("\n");

function extractJson(text) {
  // ```json ... ``` 우선, 없으면 첫 { 부터 마지막 } 까지
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  let candidate = fence ? fence[1] : text;
  const s = candidate.indexOf("{"), e = candidate.lastIndexOf("}");
  if (s < 0 || e < 0 || e < s) throw new Error("응답에서 JSON 을 찾지 못함");
  return candidate.slice(s, e + 1);
}

(async () => {
  let Anthropic;
  try { Anthropic = require("@anthropic-ai/sdk"); }
  catch (_e) { console.error("@anthropic-ai/sdk 미설치 — 워크플로에서 `npm install @anthropic-ai/sdk` 필요"); process.exit(1); }

  const client = new Anthropic();
  const tools = [{ type: "web_search_20260209", name: "web_search", max_uses: 20 }];
  const messages = [{ role: "user", content: userPrompt }];

  let finalText = "";
  // 서버측 웹 검색 루프가 10회 한도에 걸리면 stop_reason=pause_turn → 재요청으로 이어간다.
  for (let attempt = 0; attempt < 6; attempt++) {
    const stream = client.messages.stream({
      model: "claude-opus-4-8",
      max_tokens: 32000,
      thinking: { type: "adaptive" },
      output_config: { effort: "high" },
      tools,
      messages,
    });
    const msg = await stream.finalMessage();
    finalText = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
    if (msg.stop_reason === "pause_turn") {
      messages.push({ role: "assistant", content: msg.content });
      continue;
    }
    if (msg.stop_reason === "refusal") { console.error("모델이 요청을 거부함(refusal)."); process.exit(1); }
    break;
  }

  const jsonText = extractJson(finalText);
  let patch;
  try { patch = JSON.parse(jsonText); }
  catch (e) { console.error("패치 JSON 파싱 실패: " + e.message); console.error(jsonText.slice(0, 500)); process.exit(1); }

  // 최소 형식 검증
  if (typeof patch !== "object" || patch === null) { console.error("패치가 객체가 아님"); process.exit(1); }
  patch.generatedAt = TODAY;   // 날짜는 항상 오늘로 강제
  ["stocks", "add", "remove"].forEach((k) => {
    if (patch[k] !== undefined && !Array.isArray(patch[k])) { console.error(k + " 는 배열이어야 함"); process.exit(1); }
  });

  fs.writeFileSync(OUT, JSON.stringify(patch, null, 2) + "\n");
  const n = (a) => (Array.isArray(a) ? a.length : 0);
  console.log("재평가 패치 생성: " + OUT +
    " — merge " + n(patch.stocks) + " · add " + n(patch.add) + " · remove " + n(patch.remove));
})().catch((e) => { console.error("재평가 실패: " + (e && e.message ? e.message : e)); process.exit(1); });
