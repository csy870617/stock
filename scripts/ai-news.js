#!/usr/bin/env node
// 종목별 '오늘의 뉴스' 한 줄(Claude API) — 편성·관심·보유 전 종목의 최근 3일 헤드라인을 회사 소식만 골라 한국어 한 줄로 요약한다.
//
// 왜(2026-10-21): 카드의 논거·리스크는 7일 회전으로만 다시 보므로, 그 사이 회사에 무슨 일이 있었는지 앱에서 바로 보이지 않았다.
// 비용: 헤드라인은 무료 출처(한국 네이버 증권 종목 뉴스, 미국 야후 파이낸스 검색 → 실패 시 네이버 해외 뉴스)에서 받고,
//   모델은 '이 회사 소식인가 + 한 줄 요약'만 한다(웹 검색 없음, Haiku 5.5). 헤드라인이 어제와 같으면 다시 부르지 않는다.
// 출력: data/news.js — window.STOCK_NEWS = {asOf, builtAt, model, items: {티커: {line, date, links[{t,u,s,d}], h} | {none:1, h}}}
//   none = 최근 헤드라인이 있었지만 회사 고유 소식이 아니었다(앱은 표시하지 않음). 3일 안 헤드라인이 없으면 항목을 지운다.
//
// 사용법: ANTHROPIC_API_KEY=… node scripts/ai-news.js [--only 005930,AAPL] [--max N]
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFile } = require("child_process");
const L = require("./lib-claude");

const args = process.argv.slice(2);
const ONLY = args.includes("--only") ? new Set(String(args[args.indexOf("--only") + 1] || "").split(",").filter(Boolean)) : null;
const MAX = +(args.includes("--max") ? args[args.indexOf("--max") + 1] : process.env.AI_NEWS_MAX || 200) || 200;
const OUT = path.join(L.DATA, "news.js");
const HOURS = 72, KEEP = 8, CONC = 4;
const UA_M = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const UA_D = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// 네이버 증권 API 는 일부 환경에서 node fetch 가 막혀 curl 로 받는다(lib-bokpath.js 와 같은 이유)
function getJson(url, ua) {
  return new Promise((resolve) => {
    execFile("curl", ["-s", "--max-time", "15", "-A", ua || UA_M, "-H", "Accept: application/json", url], { maxBuffer: 8 * 1024 * 1024 }, (err, out) => {
      if (err || !out) return resolve(null);
      try { resolve(JSON.parse(out)); } catch (_e) { resolve(null); }
    });
  });
}
const ENT = { "&quot;": "\"", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&#39;": "'", "&apos;": "'", "&middot;": "·", "&hellip;": "…", "&nbsp;": " " };
const clean = (s) => String(s || "").replace(/<[^>]+>/g, "").replace(/&[a-z#0-9]+;/gi, (m) => ENT[m] || "").replace(/\s+/g, " ").trim();
const ymd = (s) => (s && s.length >= 8 ? s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8) : null);
const cutoff = Date.now() - HOURS * 3600 * 1000;

async function krNews(code) {
  const j = await getJson("https://m.stock.naver.com/api/news/stock/" + code + "?pageSize=15&page=1");
  if (!Array.isArray(j)) return null;
  const out = [];
  j.forEach((cl) => (cl.items || []).forEach((it) => {
    const dt = String(it.datetime || "");
    const t = Date.parse(ymd(dt) + "T" + dt.slice(8, 10) + ":" + dt.slice(10, 12) + ":00+09:00");
    if (!isFinite(t) || t < cutoff) return;
    out.push({ t: clean(it.titleFull || it.title), b: clean(it.body).slice(0, 160), s: it.officeName || "",
      u: it.mobileNewsUrl || ("https://n.news.naver.com/mnews/article/" + it.officeId + "/" + it.articleId), d: ymd(dt), ts: t });
  }));
  return out;
}
async function usNews(ticker, code) {
  const sym = ticker.replace(".", "-");
  const y = await getJson("https://query2.finance.yahoo.com/v1/finance/search?q=" + encodeURIComponent(sym) + "&quotesCount=0&newsCount=12&enableFuzzyQuery=false", UA_D);
  if (y && Array.isArray(y.news)) {
    return y.news.filter((n) => (n.relatedTickers || []).includes(sym) && n.providerPublishTime * 1000 >= cutoff).map((n) => ({
      t: clean(n.title), b: "", s: n.publisher || "", u: n.link, d: new Date(n.providerPublishTime * 1000).toISOString().slice(0, 10), ts: n.providerPublishTime * 1000 }));
  }
  if (!code) return null;
  const j = await getJson("https://api.stock.naver.com/news/worldStock/" + encodeURIComponent(code) + "?pageSize=12&page=1");
  if (!Array.isArray(j)) return null;
  return j.map((n) => {
    const dt = String(n.dt || ""), t = Date.parse(ymd(dt) + "T" + dt.slice(8, 10) + ":" + dt.slice(10, 12) + ":00+09:00");
    return { t: clean(n.tit), b: clean(n.subcontent).slice(0, 160), s: n.ohnm || "", u: "https://m.stock.naver.com/worldstock/stock/" + code + "/news", d: ymd(dt), ts: t };
  }).filter((n) => isFinite(n.ts) && n.ts >= cutoff);
}

const SCHEMA = { type: "object", additionalProperties: false, required: ["relevant", "line", "use"],
  properties: { relevant: { type: "boolean" }, line: { type: "string" }, use: { type: "array", items: { type: "integer" } } } };
const SYSTEM = [
  "너는 한국어 증권 뉴스 편집자다. 한 회사의 최근 헤드라인 목록에서 '이 회사 자체에 관한 새 소식'만 골라 한국어 한 줄로 요약한다.",
  "- 시장 전체 시황·지수 기사, 다른 회사가 주인공인 기사, 단순 주가 등락 나열은 제외한다. 남는 소식이 없으면 relevant=false, line 은 빈 문자열.",
  "- line: 60자 안팎 한 문장, 무엇이 일어났는지 사실만(실적·계약·제품·규제·소송·경영진·자본 정책 등). 숫자는 헤드라인에 있는 것만.",
  "- 매매 지시·전망·평가('호재', '사야 한다' 등)를 쓰지 않는다. 영어 기사는 한국어로 옮긴다.",
  "- use: line 의 근거가 된 헤드라인 번호(최대 3개).",
].join("\n");

function prevNews() {
  const w = L.loadWin("news.js", "STOCK_NEWS");
  return (w && w.items) || {};
}
async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); }
  }));
  return out;
}

async function main() {
  const cl = L.client();
  if (!cl) { console.log("ai-news: ANTHROPIC_API_KEY 없음 — 건너뜀"); return; }
  const D = L.loadWin("recommendations.js", "STOCK_DATA");
  if (!D) { console.log("ai-news: recommendations.js 없음 — 건너뜀"); return; }
  const uni = [], seen = new Set();
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    if (seen.has(s.ticker) || (ONLY && !ONLY.has(s.ticker))) return;
    seen.add(s.ticker);
    const m = /\/worldstock\/stock\/([^/]+)\/total/.exec(s.chartUrl || "");
    uni.push({ c, t: s.ticker, n: s.name, code: m ? m[1] : null });
  }));
  const todo = uni.slice(0, MAX), prev = prevNews(), model = L.MODELS.news, startedAt = new Date().toISOString();
  let usage = L.newUsage(), called = 0, fetched = 0, kept = 0, fail = 0, authFail = false;
  const items = {};
  // 이번에 범위 밖(--only·--max)인 종목의 이전 값은 유지한다
  Object.keys(prev).forEach((t) => { if (seen.has(t) && !todo.some((x) => x.t === t)) items[t] = prev[t]; });
  await pool(todo, CONC, async (x) => {
    const heads = x.c === "korea" ? await krNews(x.t) : await usNews(x.t, x.code);
    if (heads === null) { fail++; if (prev[x.t]) items[x.t] = prev[x.t]; return; }   // 출처 실패 — 이전 값 유지
    fetched++;
    const uniq = [], titles = new Set();
    heads.sort((a, b) => b.ts - a.ts).forEach((h) => { if (h.t && !titles.has(h.t)) { titles.add(h.t); uniq.push(h); } });
    const top = uniq.slice(0, KEEP);
    if (!top.length) return;   // 3일 안 헤드라인 없음 — 항목을 지운다
    const h = crypto.createHash("sha1").update(top.map((y) => y.t).join("\n")).digest("hex").slice(0, 12);
    if (prev[x.t] && prev[x.t].h === h) { items[x.t] = prev[x.t]; return; }   // 어제와 같은 헤드라인 — 다시 부르지 않는다
    if (authFail) { if (prev[x.t]) items[x.t] = prev[x.t]; return; }
    const prompt = "회사: " + x.n + " (" + x.t + ", " + (x.c === "korea" ? "한국" : "미국") + ")\n\n[헤드라인 — 최근 " + HOURS + "시간]\n" +
      top.map((y, i) => (i + 1) + ". [" + y.d + " " + y.s + "] " + y.t + (y.b ? " — " + y.b : "")).join("\n");
    try {
      const r = await L.compose(cl, { model, system: SYSTEM, prompt, schema: SCHEMA, effort: "low", maxTokens: 4000 });
      usage = L.mergeUsage(usage, r.usage); called++;
      const o = r.data, line = String(o.line || "").trim();
      if (!o.relevant || !line || L.DIRECTIVE.test(line)) { items[x.t] = { none: 1, h }; return; }
      const used = (o.use || []).map((i) => top[i - 1]).filter(Boolean).slice(0, 3);
      // 링크는 http(s) 만 남긴다 — 앱도 safeUrl 로 거르지만 데이터 파일에 javascript: 같은 주소가 들어가지 않게 한 번 더
      const links = (used.length ? used : top.slice(0, 1)).filter((y) => /^https?:\/\//i.test(String(y.u || "")))
        .map((y) => ({ t: y.t.slice(0, 90), u: y.u, s: y.s, d: y.d }));
      items[x.t] = { line: line.slice(0, 120), date: links[0].d, links, h };
      kept++;
    } catch (e) {
      const msg = L.describeError(e);
      if (/인증 실패|권한 없음/.test(msg)) authFail = true;
      fail++;
      if (prev[x.t]) items[x.t] = prev[x.t];
      console.log("  " + x.t + " 요약 실패 — " + msg);
    }
  });
  const today = new Date().toISOString().slice(0, 10);
  const obj = { asOf: today, builtAt: startedAt, model, items };
  const head = "// 종목별 오늘의 뉴스 한 줄 — scripts/ai-news.js 가 생성(최근 3일 헤드라인 → Claude 가 회사 소식만 골라 요약, 매일 자동).\n" +
    "// items[티커] = {line, date, links[{t 제목, u 주소, s 매체, d 날짜}], h} · none:1 은 회사 고유 소식 없음(앱 미표시).\n";
  fs.writeFileSync(OUT, head + "window.STOCK_NEWS = {\n asOf: " + JSON.stringify(obj.asOf) + ",\n builtAt: " + JSON.stringify(obj.builtAt) +
    ",\n model: " + JSON.stringify(model) + ",\n items: {\n" + Object.keys(items).sort().map((t) => "  " + JSON.stringify(t) + ": " + JSON.stringify(items[t])).join(",\n") + "\n }\n};\n");
  const status = { at: startedAt, model, ok: !authFail && fetched > 0, stocks: todo.length, fetched, called, lines: Object.values(items).filter((v) => v.line).length, usage: L.roundUsage(usage) };
  if (fail) status.note = "헤드라인·요약 실패 " + fail + "건(이전 값 유지)";
  if (authFail) status.error = "인증 실패 — ANTHROPIC_API_KEY 확인";
  L.writeStatus("news", status);
  console.log("ai-news: 종목 " + todo.length + " · 헤드라인 " + fetched + " · 요약 호출 " + called + " · 새 한 줄 " + kept + " · 표시 " + status.lines + " · 실패 " + fail + " · 사용량 " + JSON.stringify(status.usage));
  if (authFail) process.exitCode = 1;
}

main().catch((e) => { console.error("ai-news 오류: " + L.describeError(e)); process.exitCode = 1; });
