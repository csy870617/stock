#!/usr/bin/env node
// 컨센서스 목표가 자동 갱신 — 네이버 증권(한국 FnGuide 집계·미국 LSEG 집계)의 종목별 컨센서스를 매일 받아
// data/consensus.js 에 기록하고, recommendations.js 의 targetPrice 를 그 값으로 맞춘다(LLM 토큰 0).
//
// 왜: 웹 검색 스니펫으로 맞추던 한국 목표가가 기사 시점·증권사마다 섞여 네이버 컨센서스와 중간값 4.6%,
//     15/53종목이 10% 넘게 어긋났다(2026-10-05 실측, 미국은 1.6%). 한 집계를 매일 일관되게 쓰면
//     7일 회전보다 신선하고 출처 혼선이 없다. 웹 검색 재검증은 논거·리스크·배당·실적과
//     '네이버 값이 없거나 오래된 종목'의 목표가 확인에만 쓴다(CLAUDE.md §4-1).
//
// 사용법: node scripts/update-consensus.js            # 받기 + recommendations.js 반영
//         node scripts/update-consensus.js --dry-run  # 받기만(consensus.js 기록), 반영할 변경 목록만 출력
//
// 반영 규칙:
//  - 네이버 createDate 가 30일 이내인 값만 쓴다(오래된 값은 반영하지 않고 tpStale 로 표시 → 세션 재검증 우선).
//  - 변화가 0.5% 미만이면 건드리지 않는다(매일 미세 변동으로 diff·원장이 불어나는 것 방지).
//  - 기존 대비 ±50% 를 넘는 변화는 반영하지 않고 경고만 낸다(update-reco 가드레일과 동일 — 세션이 확인).
//  - 최고 = 최저(미국)면 증권사 1곳의 값이라 컨센서스로 보지 않는다 — 반영하지 않고 tpSource 를 'naver-single' 로 바꿔
//    세션 웹 확인 큐로 보낸다(2026-10-08 LLY: 평균·최고·최저 모두 $1,156).
//  - 반영 시 tpSource:"naver"·tpAsOf(집계 기준일)·tpHigh·tpLow 를 함께 기록하고, sources 맨 앞에 네이버 종목 페이지를 둔다
//    (세션 재검증이 sources 를 바꿔 빠졌으면 목표가 변화가 없어도 되살린다).
//  - 저장은 update-reco.js 패치로 한다(가드레일·직렬화·원장 공유).
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { isBlockedSource } = require("./validate-reco");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "consensus.js");
const DRY = process.argv.includes("--dry-run");
const STALE_DAYS = 30;
const MIN_CHANGE = 0.005;
const MAX_CHANGE = 0.5;
const today = new Date().toISOString().slice(0, 10);

global.window = {};
require(path.join(ROOT, "data", "recommendations.js"));
const D = global.window.STOCK_DATA;

// 네이버 코드 — 한국은 종목코드, 미국은 chartUrl(…/worldstock/stock/<코드>/total)에 저장된 네이버 코드
function naverCode(c, s) {
  if (c === "korea") return s.ticker;
  const m = String(s.chartUrl || "").match(/\/(?:worldstock\/stock|fchart\/foreign\/stock)\/([^/]+)/);
  return m ? m[1] : null;
}
function apiUrl(c, code) {
  return c === "korea"
    ? "https://m.stock.naver.com/api/stock/" + encodeURIComponent(code) + "/integration"
    : "https://api.stock.naver.com/stock/" + encodeURIComponent(code) + "/integration";
}
function pageUrl(c, code) {
  return c === "korea"
    ? "https://m.stock.naver.com/domestic/stock/" + code + "/total"
    : "https://m.stock.naver.com/worldstock/stock/" + code + "/total";
}

const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
// node fetch 우선, 막히면 curl 로 폴백(일부 세션 환경은 node 의 이 도메인 접근을 차단한다)
async function getJson(url) {
  for (let i = 0; i < 2; i++) {
    try {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 10000);
      const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": UA, "Accept": "application/json" } });
      clearTimeout(to);
      if (r.ok) return await r.json();
      if (r.status === 404 || r.status === 409) return null;
    } catch (_e) { /* 폴백 */ }
    try {
      const body = execFileSync("curl", ["-s", "--max-time", "12", "-A", UA, url], { encoding: "utf8" });
      if (body && body.trim().charAt(0) === "{") return JSON.parse(body);
    } catch (_e) { /* 재시도 */ }
  }
  return null;
}
const num = (v) => { const n = parseFloat(String(v == null ? "" : v).replace(/,/g, "")); return isFinite(n) ? n : null; };
const daysSince = (d) => Math.round((Date.parse(today) - Date.parse(d)) / 86400000);

(async () => {
  const targets = [];
  const seen = {};
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => {
    const k = c + ":" + s.ticker;
    if (seen[k]) return; seen[k] = 1;
    targets.push({ c, s, code: naverCode(c, s) });
  }));

  const items = {}, fail = [];
  for (let i = 0; i < targets.length; i += 6) {
    await Promise.all(targets.slice(i, i + 6).map(async (t) => {
      if (!t.code) { fail.push(t.c + ":" + t.s.ticker + "(코드 없음)"); return; }
      const j = await getJson(apiUrl(t.c, t.code));
      const ci = j && j.consensusInfo;
      const mean = ci && num(ci.priceTargetMean);
      if (!mean) { fail.push(t.c + ":" + t.s.ticker); return; }
      items[t.c + ":" + t.s.ticker] = {
        code: t.code, mean, high: num(ci.priceTargetHigh), low: num(ci.priceTargetLow),
        date: ci.createDate || null, recomm: num(ci.recommMean)
      };
    }));
  }

  // 받기 결과 기록(앱은 로드하지 않는다 — 세션·validate 참고용)
  const prev = (() => { try { global.window = {}; require(OUT); return global.window.STOCK_CONSENSUS; } catch (_e) { return null; } })();
  if (!Object.keys(items).length && prev) {
    console.log("컨센서스 받기 전부 실패 — 이전 파일 유지(" + fail.length + "건 실패)");
    process.exit(0);
  }
  const outObj = { asOf: today, builtAt: new Date().toISOString(), source: "네이버 증권 consensusInfo(한국 FnGuide·미국 LSEG 집계)", items };
  fs.writeFileSync(OUT,
    "// 컨센서스 목표가 원천 — scripts/update-consensus.js 가 매일 자동 생성(LLM 토큰 0). 앱은 로드하지 않는다.\n" +
    "// key \"<country>:<ticker>\" → {code 네이버 코드, mean 평균 목표가, high, low, date 집계 기준일, recomm 투자의견 평균(5=강력매수)}\n" +
    "window.STOCK_CONSENSUS = " + JSON.stringify(outObj, null, 1) + ";\n");

  // recommendations.js 반영 패치
  const stocks = [], skipBig = [], stale = [], changed = [], single = [];
  targets.forEach((t) => {
    const k = t.c + ":" + t.s.ticker, it = items[k];
    if (!it) return;
    const old = t.s.targetPrice;
    const isStale = !it.date || daysSince(it.date) > STALE_DAYS;
    const meta = { tpAsOf: it.date, tpHigh: it.high, tpLow: it.low };
    if (isStale) { stale.push(k + " (" + it.date + ")"); stocks.push(Object.assign({ country: t.c, ticker: t.s.ticker, tpStale: true }, meta)); return; }
    // 최고 = 최저(미국만 범위 제공) — 증권사 1곳의 값이지 컨센서스가 아니다(2026-10-08 LLY: 평균·최고·최저 모두 $1,156,
    // 투자의견은 다수 평균). 반영하지 않고, 지금 네이버 값을 쓰고 있으면 tpSource 를 'naver-single' 로 바꿔
    // coverage 재검증 큐 맨 앞(웹 검색 확인)으로 보낸다(§4-1 — 단일 증권사 값으로 목표가를 정하지 않는다).
    if (it.high != null && it.low != null && it.high === it.low) {
      single.push(k + " " + it.mean);
      if (t.s.tpSource === "naver") stocks.push({ country: t.c, ticker: t.s.ticker, tpSource: "naver-single" });
      return;
    }
    const rel = typeof old === "number" && old > 0 ? (it.mean - old) / old : null;
    if (rel != null && Math.abs(rel) > MAX_CHANGE) { skipBig.push(k + " " + old + "→" + it.mean + " (" + (rel * 100).toFixed(1) + "%)"); return; }
    const entry = Object.assign({ country: t.c, ticker: t.s.ticker, tpSource: "naver", tpStale: false }, meta);
    // 목표가 근거(네이버 종목 페이지)는 출처 맨 앞에 둔다 — 세션 재검증이 sources 를 통째로 바꾸면 빠지므로 매일 되살린다
    const page = pageUrl(t.c, it.code);
    // 차단 출처(블로그·커뮤니티)는 옮겨 싣지 않는다 — 하나라도 섞이면 update-reco 가 패치 전체를 거부한다
    const withPage = () => [page].concat((t.s.sources || []).filter((u) => u.indexOf("m.stock.naver.com") < 0 && !isBlockedSource(u))).slice(0, 3);
    if (rel == null || Math.abs(rel) >= MIN_CHANGE) {
      // 소수 자릿수 — 한국은 원 단위 정수, 미국은 센트까지
      entry.targetPrice = t.c === "korea" ? Math.round(it.mean) : Math.round(it.mean * 100) / 100;
      entry.sources = withPage();
      changed.push(k + " " + old + "→" + entry.targetPrice + (rel == null ? "" : " (" + (rel >= 0 ? "+" : "") + (rel * 100).toFixed(1) + "%)"));
    } else if (!(t.s.sources || []).some((u) => u === page)) {
      entry.sources = withPage();
    }
    // 메타만 바뀐 경우에도 기록은 남긴다(기준일·범위 표시용)
    const same = !entry.targetPrice && !entry.sources && t.s.tpSource === "naver" && t.s.tpAsOf === it.date && t.s.tpHigh === it.high && t.s.tpLow === it.low && !t.s.tpStale;
    if (!same) stocks.push(entry);
  });

  console.log("컨센서스 받기: " + Object.keys(items).length + "/" + targets.length + "종목" + (fail.length ? " · 실패 " + fail.join(", ") : ""));
  console.log("목표가 변경 " + changed.length + "건" + (changed.length ? ":\n  " + changed.join("\n  ") : ""));
  if (skipBig.length) console.log("::warning::±50% 초과로 미반영(세션 확인 필요) " + skipBig.length + "건:\n  " + skipBig.join("\n  "));
  if (stale.length) console.log("집계 기준일 " + STALE_DAYS + "일 초과(미반영·재검증 우선) " + stale.length + "건: " + stale.join(", "));
  if (single.length) console.log("::warning::최고=최저(단일 증권사 값)라 미반영(세션 웹 확인) " + single.length + "건: " + single.join(", "));
  if (DRY || !stocks.length) { if (DRY) console.log("(dry-run — recommendations.js 미반영)"); return; }

  // 한 번에 적용하고(--consensus: 목표가만 바꾸는 네이버 집계 항목은 신뢰 도메인 2개 규칙 대신 집계 1곳으로 인정),
  // 그래도 거부되면 종목별로 나눠 적용한다 — 한 종목의 출처·가드 문제로 전 종목 동기화가 통째로 취소되지 않게
  // (2026-10-08: 세션이 바꾼 출처 2종목 때문에 107종목 변경 21건이 모두 저장 취소되던 문제).
  const tmp = require("os").tmpdir();
  const apply = (list, tag) => {
    const p = path.join(tmp, "consensus-patch-" + process.pid + "-" + tag + ".json");
    fs.writeFileSync(p, JSON.stringify({ stocks: list }));
    try {
      const out = execFileSync("node", [path.join(ROOT, "scripts", "update-reco.js"), p, "--consensus"], { cwd: ROOT, stdio: "pipe", encoding: "utf8" });
      if (tag === "all" && out) process.stdout.write(out);
      return null;
    } catch (e) { return String((e.stdout || "") + (e.stderr || "")).trim() || e.message; }
    finally { try { fs.unlinkSync(p); } catch (_e) { /* 무시 */ } }
  };
  const err = apply(stocks, "all");
  if (!err) { console.log("recommendations.js 반영: " + stocks.length + "건"); return; }
  console.log("::warning::일괄 반영 거부 — 종목별로 나눠 적용합니다:\n" + err.split("\n").filter((l) => /✗|-\s/.test(l)).slice(0, 6).join("\n"));
  let ok = 0; const bad = [];
  stocks.forEach((e, i) => {
    const r = apply([e], "s" + i);
    if (!r) ok++;
    else bad.push(e.country + ":" + e.ticker + " — " + (r.split("\n").find((l) => /^\s*-\s/.test(l)) || r.split("\n")[0]).trim());
  });
  console.log("recommendations.js 반영: " + ok + "/" + stocks.length + "건" + (bad.length ? "\n::warning::반영 실패 " + bad.length + "건(세션 확인):\n  " + bad.join("\n  ") : ""));
})();
