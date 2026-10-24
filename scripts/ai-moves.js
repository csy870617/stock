#!/usr/bin/env node
// 6개월 흐름의 '뉴스로 본 이유'(Claude API) — data/move/<ticker>.json(update-moves.js 의 숫자: 판정·구간·핵심 날짜·공시)을
// 바탕으로, 그 움직임이 왜 일어났는지를 웹 검색으로 확인해 같은 파일의 ai 필드에 쓴다.
//
// 왜(2026-10-24 사용자 요청 '지난 6개월 차트를 분석해 상승·하락·보합의 이유를 정밀분석해서 보여 달라'):
//   숫자 분해(시장 몫·종목 고유·핵심 날짜·수급·공시)는 '무엇이·언제' 움직였는지까지 말해 주지만, '왜'(어떤 소식·업황·정책)는
//   기사로만 확인된다. 핵심 날짜와 구간을 콕 집어 조사하게 하면 짧은 검색으로 원인을 찾을 수 있다.
//
// 흐름(종목마다): research(Sonnet 5.5, 웹 검색 최대 4회) → compose(JSON {summary, legs[], days[]}) → 검사 → 기록
//   출처는 검색 결과 URL 번호로만 고르게 해 지어낸 URL 을 막는다(lib-claude). 원인이 확인되지 않은 항목은 '원인 보도 확인 안 됨'.
//   이미 일어난 일만 쓴다 — 전망·매매 지시·지금 기준 가격 의존 수치(목표가·PER·상승여력)는 검사에서 막는다.
// 다시 쓰는 때: ai 없음 → 지문(판정·시장 대비·핵심 날짜 상위 3)이 바뀜 → 21일 지남. 정식 편성 종목 먼저, 한 번에 최대 N종목.
//
// 사용법: ANTHROPIC_API_KEY=… node scripts/ai-moves.js [--max N] [티커 …]
//   (Action rebase 충돌 때는 data/move 폴더째 이번 실행분을 다시 얹으므로 --reapply 가 필요 없다)
const fs = require("fs");
const path = require("path");
const L = require("./lib-claude");
const { isBlockedSource, priceNumberIn } = require("./validate-reco");

const args = process.argv.slice(2);
const MAX = +(args[args.indexOf("--max") + 1] || process.env.AI_MOVES_MAX || 16) || 16;
const ONLY = args.filter((x, i) => !/^--/.test(x) && args[i - 1] !== "--max");
const AGE_DAYS = 21;
const DIR = path.join(L.DATA, "move");
const PERSONAL = { watch: 1, hold: 1 };

// ── 표기 ──
const pct = (v) => {
  if (v == null || !isFinite(v)) return "–";
  const x = v * 100, a = Math.abs(x), s = a.toFixed(a >= 100 ? 0 : 1);
  return (+s === 0 ? "" : x > 0 ? "+" : "-") + s + "%";
};
const md = (s) => { const m = String(s || "").match(/\d{4}-?(\d{2})-?(\d{2})/); return m ? +m[1] + "/" + +m[2] : ""; };
const won = (v) => {
  const a = Math.abs(v);
  if (a >= 1e12) return (a / 1e12).toFixed(1).replace(/\.0$/, "") + "조원";
  if (a >= 1e8) return Math.round(a / 1e8).toLocaleString("ko-KR") + "억원";
  return Math.round(a / 1e4).toLocaleString("ko-KR") + "만원";
};
const flowTxt = (who, v) => who + " " + won(v) + " " + (v >= 0 ? "순매수" : "순매도");
const LABELS = "ABCDEFGHIJ";

// 조사·작성에 넣는 숫자 묶음 — 라벨(구간 1·2…, 핵심 날짜 A·B…, 시장 급변일 M1·M2)로 항목을 짚게 한다
function packet(m) {
  const lines = [];
  lines.push("종목: " + m.name + " (" + m.t + ", " + (m.c === "korea" ? "한국 " : "미국 ") + (m.mk || "") + ") · 기간 " + m.from + " ~ " + m.to + " · 비교 지수 " + m.bench.name);
  lines.push("판정: " + m.cls + " " + pct(m.ret) + " — " + m.bench.name + " " + pct(m.mret) + ", 시장 민감도 β " + m.beta +
    " 기준 시장만 따랐다면 " + pct(m.mkt) + ", 종목 고유 " + pct(m.spec) + " · 시장 대비 " + m.rel);
  lines.push("구간:");
  m.legs.forEach((g, i) => {
    const fl = m.flow && m.flow.legs && m.flow.legs[i];
    lines.push("  " + (i + 1) + ". " + g.s + " ~ " + g.e + " " + g.cls + " " + pct(g.ret) + " (" + m.bench.name + " " + pct(g.mret) + ", 종목 고유 " + pct(g.spec) + ")" +
      (fl ? " · " + flowTxt("외국인", fl.f) + " · " + flowTxt("기관", fl.o) : ""));
  });
  const dayLine = (k, lab) => "  " + lab + ". " + k.s + (k.n > 1 ? " ~ " + k.e : "") + " " + pct(k.ret) + " (" + m.bench.name + " " + pct(k.mret) +
    (k.vr ? ", 거래량 평소의 " + k.vr.toFixed(1) + "배" : "") + (k.gap != null && Math.abs(k.gap) >= 0.02 ? ", 시가 갭 " + pct(k.gap) : "") + ")" +
    (k.tags && k.tags.length ? " · 같은 때 공시: " + k.tags.map((g) => g.k + " '" + g.t + "'(" + md(g.d) + ")").join(", ") : "");
  if (m.keys.length) { lines.push("핵심 날짜(종목 고유 움직임이 컸던 날):"); m.keys.forEach((k, i) => lines.push(dayLine(k, LABELS[i]))); }
  if (m.mktDays && m.mktDays.length) { lines.push("시장 급변일(시장 전체가 크게 움직여 종목도 따라 움직인 날):"); m.mktDays.forEach((k, i) => lines.push(dayLine(k, "M" + (i + 1)))); }
  if (m.earn && m.earn.length) lines.push("실적 발표 반응: " + m.earn.map((e) => md(e.rd) + " " + pct(e.ret) + "(시장 대비 " + pct(e.ar) + ")").join(", "));
  if (m.flow) lines.push("6개월 수급: " + [flowTxt("외국인", m.flow.f), flowTxt("기관", m.flow.o), flowTxt("개인", m.flow.p)].join(" · "));
  return lines.join("\n");
}

const RESEARCH_SYSTEM = [
  "너는 한국어로 일하는 주식 리서처다. 한 종목의 지난 6개월 주가 움직임이 왜 일어났는지 웹 검색으로 확인한다.",
  "- 확인한 사실만 날짜와 함께 메모한다(한국어 600단어 이내, 라벨별 글머리표). 기사의 해석은 '누가 그렇게 봤다'로 쓴다.",
  "- 회사 고유의 원인(실적·수주·제품·규제·소송·경영진·증자 등)과 업종·시장 전체의 원인(업황·금리·정책·지정학)을 구분한다.",
  "- 원인을 찾지 못한 라벨은 '확인 못 함'으로 적는다. 추측하지 않는다.",
].join("\n");

const COMPOSE_SYSTEM = [
  "너는 한국 개인 투자자용 주식 앱의 '6개월 흐름' 설명을 쓴다. 지난 6개월 주가가 왜 그렇게 움직였는지를 [데이터] 숫자와 [조사 메모]의 사실로만 설명한다. 출력은 지정된 JSON 하나다.",
  "",
  "공통 규칙",
  "- 한국어. 이미 일어난 일의 원인만 쓴다. 앞으로의 방향·전망·목표를 쓰지 않는다('~할 것', '~할 가능성', '~가 기대된다', '전망이다' 금지).",
  "- 매매 지시를 쓰지 않는다('매수·매도·비중 확대·기회' 권유 금지).",
  "- 원인은 [조사 메모]에 근거가 있는 것만 쓴다. 근거가 없으면 그 항목 why 를 '원인 보도 확인 안 됨'으로 쓰고 sources 를 빈 배열로 둔다. 지어내지 않는다.",
  "- 숫자는 [데이터]·[조사 메모]에 있는 것만. 지금 기준 PER·PBR 배수, 목표가·적정가 금액, 상승여력 %, 'N만원' 같은 주가 수준은 쓰지 않는다.",
  "  날짜가 붙은 과거 사실(예: '7/24 발표한 2분기 영업이익 +40%', '6/1~6/2 +13.7%')은 된다.",
  "- 앱이 그대로 보여 주므로 처리 메모·작업 경위('조사 메모에 따르면', '검색 결과')를 쓰지 않는다.",
  "- sources 에는 [출처 목록]의 번호만, 그 문장의 근거로 쓴 것만 넣는다.",
  "",
  "항목",
  "- summary: 2~3문장. 첫 문장에 '왜 상승(또는 하락·보합)했는가'의 핵심 원인을 쓴다. 시장 몫과 종목 고유 몫 중 어느 쪽이 컸는지 [데이터] 숫자와 어긋나지 않게 쓴다.",
  "  보합이면 오르게 한 요인과 내리게 한 요인이 무엇이었는지, 시장 대비 강했다면(약했다면) 그 이유를 쓴다.",
  "- legs: [데이터]의 구간마다 하나(n = 구간 번호). why 1~2문장 — 그 구간의 주된 원인.",
  "- days: [데이터]의 핵심 날짜(A·B…)와 시장 급변일(M1·M2)마다 하나(id = 라벨). why 1문장 — 그날 주가를 움직인 소식·공시. 시장 급변일은 시장 전체를 움직인 사건.",
].join("\n");

const STR = { type: "string" };
const IDXS = { type: "array", items: { type: "integer" } };
const obj = (p) => ({ type: "object", properties: p, required: Object.keys(p), additionalProperties: false });
const SCHEMA = obj({
  summary: STR,
  legs: { type: "array", items: obj({ n: { type: "integer" }, why: STR, sources: IDXS }) },
  days: { type: "array", items: obj({ id: STR, why: STR, sources: IDXS }) },
});
// 전망·추측 문구 — 이미 일어난 일만 쓰게 한다
const FORECAST = /(?:오를|내릴|상승할|하락할|반등할|회복할|개선될|악화될)\s*(?:것|가능성|전망)|(?:것으로|으로)\s*(?:보인다|예상된다|전망된다|기대된다)|기대된다|전망이다/;

function problems(o, m) {
  const p = [];
  const txts = [["summary", o.summary]].concat((o.legs || []).map((x) => ["legs." + x.n, x.why]), (o.days || []).map((x) => ["days." + x.id, x.why]));
  if (!o.summary || !/[가-힣]/.test(o.summary)) p.push("summary 가 비었거나 한국어가 아님");
  if (String(o.summary || "").length > 420) p.push("summary 가 너무 김(420자 이내)");
  txts.forEach(([k, t]) => {
    const s = String(t || "");
    const hit = priceNumberIn(s);
    if (hit) p.push(k + " 에 가격 의존 수치('" + hit + "') 금지");
    if (L.DIRECTIVE.test(s)) p.push(k + " 에 매매 지시 문구 금지");
    if (FORECAST.test(s)) p.push(k + " 에 전망·추측 문구('" + s.match(FORECAST)[0] + "') 금지 — 이미 일어난 일만");
    if (k !== "summary" && s.length > 240) p.push(k + " 가 너무 김(240자 이내)");
  });
  (o.legs || []).forEach((x) => { if (!(x.n >= 1 && x.n <= m.legs.length)) p.push("legs.n " + x.n + " 은 없는 구간"); });
  const ids = m.keys.map((_k, i) => LABELS[i]).concat((m.mktDays || []).map((_k, i) => "M" + (i + 1)));
  (o.days || []).forEach((x) => { if (!ids.includes(x.id)) p.push("days.id " + x.id + " 은 없는 라벨"); });
  return p;
}

async function explain(cl, model, m) {
  const base = packet(m);
  const r = await L.research(cl, { model, system: RESEARCH_SYSTEM, maxSearches: 4, effort: "medium", maxTokens: 16000,
    prompt: base + "\n\n조사: ①핵심 날짜(A·B…)와 시장 급변일(M…)마다 그날 주가를 움직인 소식·공시 ②구간마다 주된 원인(업황·실적·정책·수급·회사 이슈)과 그것이 업종 전체의 움직임이었는지. " +
      "확인한 것만 라벨별로 날짜와 함께 메모한다. 검색은 4회 이내." });
  const urls = r.urls.slice(0, 24);
  const prompt = "[데이터]\n" + base + "\n\n[조사 메모]\n" + (r.text || "(조사 결과 없음)") + "\n\n[출처 목록]\n" +
    (urls.length ? urls.map((u, i) => (i + 1) + ". " + u.url + (u.title ? " — " + u.title : "")).join("\n") : "(없음)");
  const c1 = await L.compose(cl, { model, system: COMPOSE_SYSTEM, prompt, schema: SCHEMA, effort: "medium", maxTokens: 8000 });
  let usage = L.mergeUsage(r.usage, c1.usage), out = c1.data, pr = problems(out, m);
  if (pr.length) {
    const c2 = await L.compose(cl, { model, system: COMPOSE_SYSTEM, schema: SCHEMA, effort: "medium", maxTokens: 8000,
      prompt: prompt + "\n\n[직전 출력]\n" + JSON.stringify(out) + "\n[문제 — 이것만 고쳐 같은 형식으로 다시]\n- " + pr.join("\n- ") });
    usage = L.mergeUsage(usage, c2.usage); out = c2.data; pr = problems(out, m);
  }
  // 그래도 남은 문제: summary 가 문제면 이 종목은 버리고, 개별 항목은 그 항목만 뺀다
  if (pr.some((x) => /^summary/.test(x))) throw new L.AiError("check", "검사 미통과: " + pr.join(" · "));
  const bad = new Set(pr.map((x) => x.split(" ")[0]));
  const src = (ids) => {
    const outU = [];
    (ids || []).forEach((i) => { const u = urls[i - 1]; if (u && !isBlockedSource(u.url) && !outU.includes(u.url)) outU.push(u.url); });
    return outU.slice(0, 3);
  };
  const legs = (out.legs || []).filter((x) => !bad.has("legs." + x.n) && x.n >= 1 && x.n <= m.legs.length)
    .map((x) => ({ s: m.legs[x.n - 1].s, e: m.legs[x.n - 1].e, why: String(x.why).trim(), src: src(x.sources) }));
  const dayOf = (id) => (/^M\d$/.test(id) ? (m.mktDays || [])[+id.slice(1) - 1] : m.keys[LABELS.indexOf(id)]);
  const days = (out.days || []).filter((x) => !bad.has("days." + x.id) && dayOf(x.id))
    .map((x) => { const k = dayOf(x.id); return { s: k.s, e: k.e, why: String(x.why).trim(), src: src(x.sources) }; });
  return { ai: { at: new Date().toISOString().slice(0, 19) + "Z", asOf: m.asOf, fp: m.fp, model, from: m.from, to: m.to,
    summary: String(out.summary).trim(), legs, days }, usage, dropped: pr.length };
}

async function main() {
  const cl = L.client();
  if (!cl) { console.log("ai-moves: ANTHROPIC_API_KEY 없음 — 건너뜀(6개월 흐름은 숫자 분석만 보인다)"); return; }
  if (!fs.existsSync(DIR)) { console.log("ai-moves: data/move 없음 — 건너뜀"); return; }
  const D = L.loadWin("recommendations.js", "STOCK_DATA") || {};
  const formal = {};
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => { if (s && !PERSONAL[s.theme]) formal[s.ticker] = 1; }));
  const now = Date.now(), queue = [];
  fs.readdirSync(DIR).filter((f) => /\.json$/.test(f)).forEach((f) => {
    let m;
    try { m = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); } catch (_e) { return; }
    if (!m || !m.t || !m.legs) return;
    if (ONLY.length && !ONLY.includes(m.t)) return;
    const a = m.ai, age = a && a.at ? (now - Date.parse(a.at)) / 864e5 : Infinity;
    const why = !a ? 0 : a.fp !== m.fp ? 1 : age > AGE_DAYS ? 2 : -1;
    if (why < 0 && !ONLY.length) return;
    queue.push({ f, m, why: Math.max(0, why), formal: formal[m.t] ? 0 : 1, age });
  });
  queue.sort((a, b) => a.why - b.why || a.formal - b.formal || b.age - a.age);
  const todo = queue.slice(0, MAX), model = L.MODELS.moves, startedAt = new Date().toISOString();
  console.log("ai-moves: 설명이 필요한 종목 " + queue.length + "개 중 " + todo.length + "개 작성(" + model + ")");
  const status = { at: startedAt, model, ok: true, pending: queue.length, done: 0, items: [] };
  let usage = L.newUsage();
  const errors = [];
  for (const it of todo) {
    try {
      const r = await explain(cl, model, it.m);
      usage = L.mergeUsage(usage, r.usage);
      // 그사이 update-moves 가 파일을 다시 썼을 수 있다 — 최신 파일에 ai 만 얹는다
      const p = path.join(DIR, it.f), cur = JSON.parse(fs.readFileSync(p, "utf8"));
      cur.ai = r.ai;
      fs.writeFileSync(p, JSON.stringify(cur));
      status.items.push({ t: it.m.t, name: it.m.name, cls: it.m.cls });
      console.log("  " + it.m.t + " " + it.m.name + " (" + it.m.cls + " " + pct(it.m.ret) + ") — " + r.ai.summary.slice(0, 80) + (r.dropped ? " · 검사로 뺀 항목 있음" : ""));
    } catch (e) {
      errors.push(it.m.t + " " + L.describeError(e));
      console.log("  " + it.m.t + " 작성 실패 — " + L.describeError(e));
      if (/인증 실패|권한 없음/.test(L.describeError(e))) break;
    }
  }
  status.done = status.items.length;
  status.pending = Math.max(0, queue.length - status.done);
  status.usage = L.roundUsage(usage);
  if (errors.length) { status.error = errors.slice(0, 3).join(" · "); status.ok = status.done > 0; }
  L.writeStatus("moves", status);
  console.log("ai-moves: 작성 " + status.done + "개 · 남은 " + status.pending + "개 · 사용량 " + JSON.stringify(status.usage));
  if (todo.length && !status.ok) process.exitCode = 1;
}

main().catch((e) => { console.error("ai-moves 오류: " + L.describeError(e)); process.exitCode = 1; });
