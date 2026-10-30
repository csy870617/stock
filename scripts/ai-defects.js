#!/usr/bin/env node
// 결격 점검 판정 자동화(Claude API) — check-defects.js 가 올린 '점검 필요' 종목을 웹 검색으로 실질·형식·없음 판정한다.
//
// 왜(2026-10-21): 매일 결격 점검(CLAUDE.md §3-7)의 판정이 A 루틴 세션에만 걸려 있어, 루틴이 건너뛰면 '점검 필요'가
//   며칠씩 쌓였다. 신호가 뜬 종목만(보통 하루 0~5개) 짧게 조사해 candidate-notes.json 에 판정을 남기면
//   앱의 '점검' 표시가 그날 판정으로 바뀌고, 세션은 실질 결격의 교체(§5)에 검색 예산을 쓴다.
//   교체(add/remove)는 하지 않는다 — 되돌리기 어려운 결정이라 세션 몫으로 남긴다.
//
// 흐름(종목마다): research(Sonnet 5.5, 웹 검색 최대 3회) → compose(JSON {verdict, note, sources}) → 검사 → 기록
//   기록: defects[그룹][티커] = {verdict, note, asOf, flags(지금 뜬 신호 전부), by:"ai", sources} — 기존 triedAt 은 유지.
//   지수 대표 대형주(prot)는 '보호'를 유지하고 메모만 갱신한다. 추세 붕괴·주제 기준 미달(자동 결격)은 '없음'을 줄 수 없다.
//
// 사용법: ANTHROPIC_API_KEY=… node scripts/ai-defects.js [--max N] [--reapply]
//   --reapply — API 없이 이번 실행 판정(.ai-cache/defects.json)을 원격 최신 위에 다시 얹는다(원격에 더 새 판정이 있으면 원격 유지).
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const L = require("./lib-claude");
const { isBlockedSource, priceNumberIn } = require("./validate-reco");

const args = process.argv.slice(2);
const REAPPLY = args.includes("--reapply");
const MAX = +(args[args.indexOf("--max") + 1] || process.env.AI_DEFECTS_MAX || 8) || 8;
const today = new Date().toISOString().slice(0, 10);
const NOTES = path.join(L.DATA, "candidate-notes.json");
const THEME_KO = { core: "우량", growth: "성장", value: "저평가", dividend: "배당" };
const THEME_DEF = {
  core: "우량 — 대형·흑자·높은 자본효율(3년 평균 ROIC 상위)·재무 건전",
  growth: "성장 — 매출이 꾸준히 크고(3년 연평균) 현금을 벌며 희석·적자 없이 성장",
  value: "저평가 — 이익·현금흐름 대비 싸고(EBIT/EV·FCF/시총 상위) 이익이 붕괴하지 않는 회사",
  dividend: "배당 — 이익이 안정적이고 배당을 줄이지 않아 온 회사(배당성향 100% 이하)",
};

const readNotes = () => (fs.existsSync(NOTES) ? JSON.parse(fs.readFileSync(NOTES, "utf8")) : { candidates: {}, defects: {} });
const writeNotes = (n) => fs.writeFileSync(NOTES, JSON.stringify(n, null, 2) + "\n");
function rerunCheck() {
  const r = spawnSync(process.execPath, [path.join(__dirname, "check-defects.js")], { encoding: "utf8" });
  if (r.status !== 0) console.log("  ⚠ check-defects 재실행 실패: " + String(r.stderr || "").trim().slice(0, 200));
}

const STR = { type: "string" };
const SCHEMA = { type: "object", additionalProperties: false, required: ["verdict", "note", "sources"],
  properties: { verdict: { type: "string", enum: ["실질", "형식", "없음"] }, note: STR, sources: { type: "array", items: { type: "integer" } } } };

const RESEARCH_SYSTEM = [
  "너는 한국어로 일하는 주식 애널리스트다. 추천 편성 종목에 자동 점검 신호가 떴을 때, 그것이 회사 고유의 결격인지 웹 검색으로 확인한다.",
  "- 확인한 사실만 날짜와 함께 메모한다(한국어 300단어 이내). 기사의 해석은 '누가 그렇게 봤다'로 쓴다.",
  "- 신호의 원인이 회사 고유 문제인지, 시장·업종 전체 움직임인지 구분한다.",
].join("\n");
const COMPOSE_SYSTEM = [
  "너는 주식 대시보드의 편성 결격 판정자다. 조사 메모와 카드 정보로 판정 하나를 JSON 으로 낸다.",
  "verdict:",
  "- 실질: 편출 사유가 실제로 성립 — 투자 논거의 핵심 가정이 깨짐, 가이던스 하향·역성장, 지배구조 결격(횡령·대규모 희석·부당 내부거래 등),",
  "  일시적이 아닌 주제 이탈, 추세 붕괴 신호의 원인이 회사 고유 악재.",
  "- 형식: 숫자 신호는 떴지만 실체는 유지 — 일회성 비용·회계 효과, 주가 상승으로 생긴 배당 기준 미달, 가이던스는 지킨 실적, 원인 미확인이라 감시가 필요한 경우.",
  "- 없음: 시장·업종 전체 하락, 회사 고유 악재 없음, 가이던스를 지킨 실적.",
  "- 자동 결격 신호(추세 붕괴·주제 기준 미달)가 있으면 '없음'을 줄 수 없다(실질 또는 형식).",
  "- 근거가 약하면 실질을 주지 않는다(실질은 교체로 이어진다).",
  "- '이번에 판단할 신호'만 판정한다. 이미 판정된 신호의 기존 판정은 따로 유지되니 다시 판정하지 않는다.",
  "note: 한국어 1~2문장, 120자 이내. 판정의 근거 사실(날짜·회사 수치)을 쓴다. 앱이 그대로 보여 주므로 처리 메모·매매 지시를 쓰지 않는다.",
  "  '조사 메모'·'검색'·'확인하지 못했다' 같은 작업 경위를 쓰지 않는다 — 확인 전인 사항은 'OO 확인 전까지 감시'처럼 사실로만 쓴다.",
  "  목표가·적정가 금액, 상승여력 %, PER·PBR 배수, 배당수익률 % 같은 가격 의존 수치는 쓰지 않는다.",
  "sources: [출처 목록]의 번호(근거로 쓴 것만, 없으면 빈 배열).",
].join("\n");

function stockPrompt(c, th, s, d, S) {
  const fu = (S.FU[s.ticker] || {}), q = fu.q || {}, ev = S.EV[s.ticker] || {};
  const yo = (k, lab) => (q[k] && q[k].yoy != null ? lab + " " + (q[k].yoy > 0 ? "+" : "") + q[k].yoy + "%" : null);
  const fresh = d.flags.filter((f) => f.fresh), old = d.flags.filter((f) => !f.fresh);
  return [
    "종목: " + s.name + " (" + s.ticker + ", " + (c === "korea" ? "한국 " : "미국 ") + (s.market || "") + ") — 주제 " + THEME_KO[th] + " T" + s.tier,
    "주제 정의: " + THEME_DEF[th],
    "투자 포인트(카드): " + (s.thesis || "–"),
    "리스크(카드): " + ((s.risks || []).join(" / ") || "–"),
    "이번에 판단할 신호:", fresh.map((f) => "- [" + f.k + "] " + f.msg).join("\n") || "- (없음)",
    old.length ? "이미 판정된 신호: " + old.map((f) => f.k).join(", ") + (d.verdict ? " (기존 판정 " + d.verdict + (d.note ? " — " + d.note : "") + ")" : "") : "",
    "최근 분기(" + (q.period || "–") + ") 전년 대비: " + ([yo("rev", "매출"), yo("op", q.opLabel === "EBIT" ? "EBIT" : "영업이익"), yo("np", "순이익")].filter(Boolean).join(" ") || "–"),
    ev.next && ev.next.date ? "다음 실적 발표: " + ev.next.date : "",
    "오늘(UTC): " + today,
  ].filter(Boolean).join("\n");
}

async function judge(cl, model, item, S) {
  const { c, th, s, d } = item;
  const base = stockPrompt(c, th, s, d, S);
  const r = await L.research(cl, { model, system: RESEARCH_SYSTEM, maxSearches: 3, effort: "medium", maxTokens: 16000,
    prompt: base + "\n\n조사: 위 신호의 원인(회사 고유 악재인지, 시장·업종 전체 움직임인지), 최근 실적·가이던스, 투자 포인트를 훼손하는 사건(규제·소송·지배구조·대규모 증자 등)이 있는지. 검색은 3회 이내." });
  const urls = r.urls.slice(0, 20);
  const prompt = base + "\n\n[조사 메모]\n" + (r.text || "(조사 결과 없음)") + "\n\n[출처 목록]\n" +
    (urls.length ? urls.map((u, i) => (i + 1) + ". " + u.url + (u.title ? " — " + u.title : "")).join("\n") : "(없음)");
  let c1 = await L.compose(cl, { model, system: COMPOSE_SYSTEM, prompt, schema: SCHEMA, effort: "medium", maxTokens: 8000 });
  let usage = L.mergeUsage(r.usage, c1.usage), out = c1.data;
  const problems = (o) => {
    const p = [];
    if (!o.note || !/[가-힣]/.test(o.note)) p.push("note 가 비었거나 한국어가 아님");
    const hit = priceNumberIn(o.note);
    if (hit) p.push("note 에 가격 의존 수치('" + hit + "') 금지");
    if (L.DIRECTIVE.test(o.note || "")) p.push("note 에 매매 지시 문구 금지");
    if (o.verdict === "없음" && d.flags.some((f) => f.k === "trend" || f.k === "theme")) p.push("자동 결격 신호(추세 붕괴·주제 기준 미달)가 있으면 '없음' 불가 — 실질 또는 형식");
    return p;
  };
  let pr = problems(out);
  if (pr.length) {
    const c2 = await L.compose(cl, { model, system: COMPOSE_SYSTEM, schema: SCHEMA, effort: "medium", maxTokens: 8000,
      prompt: prompt + "\n\n[직전 출력]\n" + JSON.stringify(out) + "\n[문제 — 고쳐서 다시]\n- " + pr.join("\n- ") });
    usage = L.mergeUsage(usage, c2.usage); out = c2.data; pr = problems(out);
  }
  if (pr.length) throw new L.AiError("check", "검사 미통과: " + pr.join(" · "));
  const sources = [];
  (out.sources || []).forEach((i) => { const u = urls[i - 1]; if (u && !isBlockedSource(u.url) && !sources.includes(u.url)) sources.push(u.url); });
  const verdict = d.prot ? "보호" : out.verdict;
  return { entry: { verdict, note: out.note.trim().slice(0, 160), asOf: today, flags: d.flags.map((f) => f.k), by: "ai", sources: sources.slice(0, 3) }, usage, aiVerdict: out.verdict };
}

// 기존 판정과 합친다 — AI 는 '새로 뜬 신호'만 보므로, 이전에 더 무거운 판정(실질 > 형식 > 없음)이 있으면 그것을 지우지 않는다
// (예: 질적 사유로 '실질'인 종목에 급락 신호가 새로 떠 AI 가 '없음'이라 봐도 결격은 그대로 — 해제는 세션 몫).
const RANK = { "실질": 3, "형식": 2, "없음": 1 };
function put(notes, g, t, entry) {
  notes.defects = notes.defects || {};
  notes.defects[g] = notes.defects[g] || {};
  const prev = notes.defects[g][t];
  const e = Object.assign({}, entry);
  if (prev && prev.verdict && prev.verdict !== "보호" && e.verdict !== "보호" && (RANK[prev.verdict] || 0) > (RANK[e.verdict] || 0)) {
    e.verdict = prev.verdict;
    e.note = (String(prev.note || "") + " · 새 신호: " + e.note).slice(0, 200);
    if (prev.by) e.by = prev.by; else delete e.by;   // 결격을 정한 쪽은 이전 판정(대개 세션) — 'AI 판정'으로 표시하지 않는다
  }
  if (prev && prev.triedAt) e.triedAt = prev.triedAt;
  // 실질 결격이 처음 성립한 날 — 14·28일 장기 결격 판정의 기준(재판정해도 유지)
  if (e.verdict === "실질") e.since = (prev && prev.verdict === "실질" && (prev.since || prev.asOf)) || e.asOf;
  notes.defects[g][t] = e;
  return e;
}

function reapply() {
  const c = L.readCache("defects.json");
  if (!c || !c.items || !c.items.length) { console.log("ai-defects --reapply: 캐시 없음 — 건너뜀"); return; }
  const notes = readNotes();
  let n = 0;
  c.items.forEach((x) => {
    const cur = ((notes.defects || {})[x.g] || {})[x.t];
    if (cur && cur.asOf >= x.entry.asOf) return;   // 원격에 같은 날 이후 판정이 있으면 원격 유지
    put(notes, x.g, x.t, x.entry); n++;
  });
  if (n) { writeNotes(notes); rerunCheck(); }
  console.log("ai-defects --reapply: " + n + "건 다시 반영");
}

async function main() {
  if (REAPPLY) return reapply();
  const cl = L.client();
  if (!cl) { console.log("ai-defects: ANTHROPIC_API_KEY 없음 — 건너뜀(판정은 A 루틴 세션이 한다)"); return; }
  const S = {
    D: L.loadWin("recommendations.js", "STOCK_DATA"), CA: L.loadWin("candidates.js", "CANDIDATES"),
    EV: (L.loadWin("events.js", "STOCK_EVENTS") || {}).items || {}, FU: (L.loadWin("fundamentals.js", "STOCK_FUND") || {}).items || {},
  };
  if (!S.D || !S.CA) { console.log("ai-defects: 데이터 없음 — 건너뜀"); return; }
  const queue = [];
  Object.keys(S.CA.groups || {}).forEach((g) => {
    const [c, th] = g.split("|");
    (S.CA.groups[g].defects || []).forEach((d) => {
      if (d.state !== "점검 필요") return;
      const s = (S.D[c] || []).find((x) => x.ticker === d.ticker && x.theme === th);
      if (s) queue.push({ g, c, th, s, d, hard: d.flags.some((f) => f.fresh && (f.k === "trend" || f.k === "theme")) });
    });
  });
  queue.sort((a, b) => b.hard - a.hard);
  const todo = queue.slice(0, MAX), model = L.MODELS.defects, startedAt = new Date().toISOString();
  console.log("ai-defects: 점검 필요 " + queue.length + "건 중 " + todo.length + "건 판정(" + model + ")");
  const status = { at: startedAt, model, ok: true, pending: queue.length, judged: 0, items: [] };
  if (!todo.length) { L.writeStatus("defects", Object.assign(status, { usage: L.roundUsage(L.newUsage()) })); return; }
  const notes = readNotes();
  let usage = L.newUsage();
  const cache = { today, items: [] }, errors = [];
  for (const it of todo) {
    try {
      const r = await judge(cl, model, it, S);
      usage = L.mergeUsage(usage, r.usage);
      const fin = put(notes, it.g, it.s.ticker, r.entry);
      cache.items.push({ g: it.g, t: it.s.ticker, entry: r.entry });   // 합치기 전 원본 — --reapply 가 원격 판정과 다시 합친다
      status.items.push({ g: it.g, t: it.s.ticker, name: it.s.name, verdict: fin.verdict });
      console.log("  " + it.g + " " + it.s.ticker + " " + it.s.name + " → " + fin.verdict + (fin.verdict !== r.aiVerdict ? "(AI " + r.aiVerdict + ")" : "") + " — " + fin.note);
    } catch (e) {
      errors.push(it.s.ticker + " " + L.describeError(e));
      console.log("  " + it.g + " " + it.s.ticker + " 판정 실패 — " + L.describeError(e));
      // 인증·권한 오류면 나머지도 실패하므로 멈춘다
      if (/인증 실패|권한 없음/.test(L.describeError(e))) break;
    }
  }
  if (cache.items.length) {
    writeNotes(notes);
    L.writeCache("defects.json", cache);
    rerunCheck();
  }
  status.judged = cache.items.length;
  status.usage = L.roundUsage(usage);
  if (errors.length) { status.error = errors.slice(0, 3).join(" · "); status.ok = cache.items.length > 0; }
  L.writeStatus("defects", status);
  console.log("ai-defects: 판정 " + status.judged + "건 · 사용량 " + JSON.stringify(status.usage));
  if (!status.ok) process.exitCode = 1;
}

main().catch((e) => { console.error("ai-defects 오류: " + L.describeError(e)); process.exitCode = 1; });
