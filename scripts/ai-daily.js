#!/usr/bin/env node
// 매일 분석 자동화(Claude API) — 시황(통합·미국·한국)·거시 유동성 판단·연준/한은 뉴스 판단·지수 대응 4개·오늘의 Top Pick.
//
// 왜(2026-10-21 사용자 요청 'API 로 바꿔서 좋아지는 것 다 넣어줘'): 이 항목들은 A 루틴 세션이 써야만 갱신돼,
//   루틴이 조용히 실패하거나 순서를 건너뛰면 그날 화면이 비거나 하루 늦었다(10/20 '데이터 신선도' 사례).
//   refresh-quotes Action 이 시세·지표를 만든 직후 이 스크립트가 같은 숫자로 쓰면 세션 없이도 매 거래일 채워진다.
//
// 흐름: ①research — 웹 검색(Opus 5.5, 최대 6회)으로 최근 미·한 증시 원인·연준/한은 발언·이번 주 일정을 메모로
//       ②compose — 검색 없이 데이터(지수·유동성 baseline·금리 경로·편성 표) + 메모 → 정해진 JSON
//       ③검사 — 매매 지시 문구·Top Pick 규칙(lib-picks 순위 1~3위 그대로 — 건강 관문·상승 가능성 점수, 2026-10-27~ · 가격 의존 수치 금지)·출처 번호
//       ④반영 — recommendations.js(시황·Top Pick, update-reco.js 가드레일 통과) · liquidity.js · index-notes.js · ai-status.js
//
// 덮어쓰기 규칙(세션 작업을 지우지 않는다):
//   --if-stale(Action) — 항목별로 '오늘 데이터(T)로 아직 안 쓴 것' 또는 'AI 가 쓴 것인데 새 종가가 생긴 것'만 쓴다.
//     세션이 같은 T 로 쓴 문장은 그대로 둔다. 저녁(미국 마감 뒤) 실행은 AI 가 쓴 문장을 새 종가로 다시 쓰고,
//     세션이 쓴 시황·유동성·지수 대응도 '새 종가가 나온 뒤 아무도 고치지 않았으면' 다시 쓴다(Top Pick 은 세션 것 유지).
//   인자 없이 실행하면 네 항목을 모두 다시 쓴다(수동).
//   --reapply — API 를 부르지 않고 이번 실행의 결과(.ai-cache/daily.json)를 다시 얹는다(Action rebase 충돌 복구용).
//     이번 실행이 계획할 때 본 문장이 원격에서 바뀌었으면(그 사이 세션이 씀) 원격을 남긴다.
//
//   --who — API 를 부르지 않고 지금 화면 문장을 누가 썼는지(AI 작성분·세션 작성분·미작성)만 보인다(세션 점검용, 키 불필요).
//
// 사용법: ANTHROPIC_API_KEY=… node scripts/ai-daily.js [--if-stale] [--reapply] [--dry] | node scripts/ai-daily.js --who
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const L = require("./lib-claude");
const LP = require("./lib-picks");
const { isPersonalTheme, isBlockedSource, priceNumberIn } = require("./validate-reco");

const args = process.argv.slice(2);
const IF_STALE = args.includes("--if-stale"), REAPPLY = args.includes("--reapply"), DRY = args.includes("--dry"), WHO = args.includes("--who");
const today = new Date().toISOString().slice(0, 10);
const THEME_KO = { core: "우량", growth: "성장", value: "저평가", dividend: "배당", rising: "히든" };
const IDX_KEYS = ["nasdaq", "dow", "kospi", "kosdaq"];
const MACRO_KEYS = ["usdkrw", "dxy", "wti", "gold"];   // 환율·원자재(indices.js macro, 2026-10-23~) — 지수와 같은 형식의 분석을 index-notes.js 에 함께 쓴다
const ITEMS = ["market", "liquidity", "indexNotes", "topPicks"];

let IX_CACHE = null;
const macroOf = (k) => ((IX_CACHE && IX_CACHE.macro) || []).find((m) => m.key === k) || null;
function loadAll() {
  return {
    D: L.loadWin("recommendations.js", "STOCK_DATA"), IX: (IX_CACHE = L.loadWin("indices.js", "INDEX_TA")), IN: L.loadWin("index-notes.js", "INDEX_NOTES"),
    LQ: L.loadWin("liquidity.js", "LIQUIDITY_DATA"), A: L.loadWin("liquidity-auto.js", "LIQUIDITY_AUTO"), TA: L.loadWin("stock-ta.js", "STOCK_TA"),
    EV: (L.loadWin("events.js", "STOCK_EVENTS") || {}).items || {}, FU: (L.loadWin("fundamentals.js", "STOCK_FUND") || {}).items || {},
    Q: L.loadWin("quotes.js", "STOCK_QUOTES") || {}, CA: L.loadWin("candidates.js", "CANDIDATES") || { groups: {} },
    DC: L.loadWin("discovery-candidates.js", "DISCOVERY_CANDIDATES"), RV: (L.loadWin("revisions.js", "STOCK_REVISIONS") || {}).items || {},
  };
}
// 마지막으로 끝난 정규장 날짜(한국·미국) — 저녁 실행이 '새 종가가 생겼나'를 본다
function basisOf(Q) {
  const ix = Q.indices || {};
  return { kr: (ix.kospi && ix.kospi.closeDate) || null, us: (ix.sp500 && ix.sp500.closeDate) || null };
}
// 지금 보이는 문장이 AI 가 쓴 것인지 — 지난 실행이 남긴 지문과 비교(항목 화면 문장 전체 지문 — lib-claude aiSig)
function sigs(S) {
  const X = { D: S.D, LQ: S.LQ, IN: S.IN }, o = {};
  ITEMS.forEach((k) => { o[k] = L.aiSig(k, X); });
  return o;
}
// 세션이 쓴 문장도 '새 종가가 나온 뒤 아무도 고치지 않았으면' 저녁에 새 종가로 다시 쓰는 항목(Top Pick 은 세션 판단이라 제외).
// 왜: A 루틴(09:07 UTC)은 미국 장 시작 전에 쓰고, 예약 Action 은 몇 시간씩 늦게 돌아(아침 ~12:30·저녁 ~00:00 UTC)
//   세션이 쓴 날은 미국 마감 뒤에도 하루 묵은 시황이 다음 아침까지 남았다(2026-10-21 점검).
const REFRESH_SESSION = ["market", "liquidity", "indexNotes"];
const newer = (a, b) => !!(a && b && ((a.kr || "") > (b.kr || "") || (a.us || "") > (b.us || "")));
// seen = 실행마다 본 문장 지문과 '그 지문을 처음 본 때의 종가 기준' — 지문이 그대로면 처음 본 기준을 잇는다.
//   처음 보는 지문은 지금 기준으로 적는다(세션이 언제 썼는지 모르면 최신으로 본다 — 세션 작업을 덮지 않는 쪽).
function nextSeen(prevSeen, cur, basis) {
  const items = {}, p = (prevSeen && prevSeen.items) || {};
  ITEMS.forEach((k) => { items[k] = p[k] && L.sameSig(p[k].sig, cur[k]) ? { sig: cur[k], basis: p[k].basis } : { sig: cur[k], basis }; });
  return { at: new Date().toISOString(), items };
}
function plan(S, st) {
  const T = S.TA && S.TA.asOf, basis = basisOf(S.Q), prev = st.daily || {}, cur = sigs(S);
  const stale = {
    market: !(S.D.marketNoteAsOf >= T),
    liquidity: !(S.LQ && S.LQ.asOf >= T),
    indexNotes: !(S.IN && S.IX && S.IN.asOf === S.IX.asOf),
    topPicks: !(S.D.topPicks && S.D.topPicks.asOf >= T),
  };
  const newClose = !!(prev.basis && (prev.basis.kr !== basis.kr || prev.basis.us !== basis.us));
  const seenItems = (prev.seen && prev.seen.items) || {};
  const out = {};
  ITEMS.forEach((k) => {
    const mine = L.sameSig(prev.sig && prev.sig[k], cur[k]);
    const sn = seenItems[k];
    const outdated = !stale[k] && !mine && REFRESH_SESSION.includes(k) && !!(sn && L.sameSig(sn.sig, cur[k]) && newer(basis, sn.basis));
    out[k] = { stale: stale[k], mine, outdated, need: stale[k] || (mine && newClose) || outdated, write: !IF_STALE || stale[k] || mine || outdated };
  });
  return { T, basis, items: out, cur, run: !IF_STALE || ITEMS.some((k) => out[k].need) };
}
const planLine = (P) => "ai-daily: T " + P.T + " · 종가 한국 " + P.basis.kr + " 미국 " + P.basis.us + " · " +
  ITEMS.map((k) => k + (P.items[k].stale ? "(미작성)" : P.items[k].mine ? "(AI 작성분)" : P.items[k].outdated ? "(세션 작성분 — 새 종가로 갱신)" : "(세션 작성분)")).join(" ");

// ── 프롬프트 재료 ──
const n2 = (v) => (v == null || !isFinite(v) ? "–" : (Math.round(v * 100) / 100).toString());
const sgn = (v) => (v == null || !isFinite(v) ? "–" : (v > 0 ? "+" : "") + n2(v));
// 코스피·코스닥 수급 줄 — indices.js flows(한국거래소 집계 확정치, 억원 — lib-flows.js)
const flowSgn = (v) => (v > 0 ? "+" : "") + Math.round(v || 0).toLocaleString("en-US");
const flowPart = (o) => "외국인 " + flowSgn(o && o.f) + "·기관 " + flowSgn(o && o.o) + "·개인 " + flowSgn(o && o.p);
function flowLine(F) {
  if (!F || !F.last) return null;
  const sk = F.streak || {}, st = (v) => (v > 0 ? "순매수 " : "순매도 ") + Math.abs(v || 0) + "일";
  return "  수급(투자자별 순매수, 억원, " + F.asOf + "까지): 최근일 " + flowPart(F.last) + " | 5일 " + flowPart(F.s5) + " | 20일 " + flowPart(F.s20) +
    " | 60일 " + flowPart(F.s60) + " | 연속 외국인 " + st(sk.f) + "·기관 " + st(sk.o) + "·개인 " + st(sk.p);
}
function indexBlock(IX) {
  const per = { short: "단기(일봉)", mid: "중기(주봉)", long: "장기(월봉)" };
  return (IX.indices || []).map((i) => {
    const lines = ["short", "mid", "long"].map((k) => {
      const x = i[k] || {};
      return "  " + per[k] + ": 등급 " + (x.signal || "–") + " · 추세 " + (x.trend || "–") + " · " + (x.metrics || []).map((m) => m[0] + " " + m[1]).join(" | ");
    });
    const fl = flowLine(i.flows);
    if (fl) lines.push(fl);
    return "- " + i.key + " (" + i.name + "): " + i.level + " " + i.change + " (" + (i.period || "") + ")\n" + lines.join("\n");
  }).join("\n") + macroBlock(IX);
}
// 환율·원자재 — 엔진 등급(USD 는 달러 기준: 매수 쪽 = 원/달러 상승·원화 약세)과 관련 정보(사실 숫자)
function macroBlock(IX) {
  const per = { short: "단기(일봉)", mid: "중기(주봉)", long: "장기(월봉)" };
  const pc = (v) => (v == null ? "–" : (v > 0 ? "+" : "") + v + "%");
  return (IX.macro || []).map((m) => {
    const f = m.facts || {}, ch = f.chg || {}, rel = f.rel || {}, mk = rel.market || {};
    const lines = ["short", "mid", "long"].map((k) => {
      const x = m[k] || {};
      return "  " + per[k] + ": 등급 " + (x.signal || "–") + " · 추세 " + (x.trend || "–") + " · " + (x.metrics || []).map((q) => q[0] + " " + q[1]).join(" | ");
    });
    lines.push("  관련 정보: 1주 " + pc(ch.w1) + " · 1개월 " + pc(ch.m1) + " · 3개월 " + pc(ch.m3) + " · 올해 " + pc(ch.ytd) + " · 1년 " + pc(ch.y1) +
      " · 52주(종가) " + f.lo52 + "~" + f.hi52 + " 중 " + f.pos52 + "% 위치 · 50일선 대비 " + pc(f.ma50) + " · 200일선 대비 " + pc(f.ma200) + " · 60일 변동성 " + f.vol60 + "%(10년 중 " + f.volPct + "백분위)");
    const mkt = Object.keys(mk).map((k) => (k === "kospi" ? "코스피" : "나스닥") + " 상관 " + mk[k].corr + "(β " + mk[k].beta + ")").join(" · ");
    if (mkt) lines.push("  최근 " + rel.weeks + "주 주간 상관: " + mkt);
    const mv = (a) => (a || []).map((x) => x.name + "(" + x.th + " " + x.corr + ")").join(", ");
    if ((rel.pos || []).length) lines.push("  같이 움직인 편성·관심·보유 종목: " + mv(rel.pos));
    if ((rel.neg || []).length) lines.push("  반대로 움직인 종목: " + mv(rel.neg));
    return "\n- " + m.key + " (" + m.name + " · " + m.sub + "): " + m.level + m.unit + " " + m.change + " (" + m.asOf + " 마감" + (m.key === "usdkrw" ? ", 등급은 달러 기준" : "") + ")\n" + lines.join("\n");
  }).join("");
}
function liquidityBlock(A, LQ) {
  if (!A) return "(baseline 없음)";
  const g = (x) => x ? "단기 " + x.shortTerm + "(" + sgn(x.shortScore) + ") · 중기 " + x.midTerm + "(" + sgn(x.midScore) + ") · 근거 " + (x.drivers || []).join(", ") : "–";
  const inp = A.inputs || {};
  const out = [
    "자동 baseline(" + A.asOf + ") 미국: " + g(A.us),
    "자동 baseline 한국: " + g(A.korea),
    "지표: 미 10년물 " + inp.us10y + "% · 장단기 금리차 " + inp.curve + "%p · VIX " + inp.vix + " · HY 채권 20일 " + inp.hyg20 + "% · 달러지수 " + inp.dxy + " · 원/달러 " + inp.usdkrw,
  ];
  if (A.fed && A.fed.meetings) out.push("연준 금리 경로(연방기금금리 선물, " + A.fed.asOf + "): 현재 실효 " + n2(A.fed.current) + "% · " +
    A.fed.meetings.slice(0, 4).map((m) => m.date + " 기대 " + n2(m.rate) + "%(" + m.outcomes.map((o) => (o.n > 0 ? "+" : "") + o.n * 25 + "bp " + o.p + "%").join("/") + ")").join(" · "));
  if (A.bok) out.push("한국은행(" + A.bok.asOf + "): 기준금리 " + A.bok.base + "% · " + [A.bok.exp3m, A.bok.exp12m].filter(Boolean).map((e) => e.label + "(기대 " + e.rate + "%)").join(" · "));
  if (A.rateModel && A.rateModel.us) out.push("금리 예측 모델(표본 밖 검증 통과): 미국 3·6·12개월 " + A.rateModel.us.forecasts.map((f) => f.rate + "%").join("/") +
    (A.rateModel.us.taylor ? " · 테일러 준칙 참고 " + A.rateModel.us.taylor.rate + "%" : "") + " · 한국은 '변화 없음'이 시장 금리보다 나았다(유지 " + (A.rateModel.korea && A.rateModel.korea.policy) + "%)");
  if (LQ) {
    const p = (x) => x ? "단기 " + x.shortTerm + " · 중기 " + x.midTerm : "–";
    out.push("직전 판단(" + LQ.asOf + "): 미국 " + p(LQ.us) + " / 한국 " + p(LQ.korea) + " — " + (LQ.headline || ""));
    if (LQ.policyNews) out.push("직전 정책 판단(" + LQ.policyNews.asOf + "): 연준 " + ((LQ.policyNews.us || {}).stance || "–") + " — " + ((LQ.policyNews.us || {}).note || "") +
      " / 한은 " + ((LQ.policyNews.korea || {}).stance || "–") + " — " + ((LQ.policyNews.korea || {}).note || ""));
  }
  return out.join("\n");
}
// Top Pick — lib-picks 순위(건강 관문 + 상승 가능성 점수, 2026-10-27 사용자 요청 '건강하면서 상승 가능성이 가장 높은 종목')의 나라별 1~3위.
//   종목은 규칙이 고르고 AI 는 그 세 종목의 이유 문장만 쓴다 — 검사가 순서까지 강제한다.
function pickTable(S) {
  const R = LP.rankPicks({ D: S.D, TA: S.TA, EV: S.EV, CA: S.CA, DC: S.DC, FU: S.FU, RV: S.RV });
  const ta = (S.TA && S.TA.ta) || {}, rows = { korea: [], us: [] }, top = { korea: [], us: [] }, excluded = [];
  ["korea", "us"].forEach((c) => {
    const r = R[c];
    r.excluded.forEach((x) => excluded.push(c + ":" + x.ticker + " " + x.name + "(" + x.why + ")"));
    top[c] = r.top;
    r.top.map((t) => r.ranked.find((x) => x.ticker === t)).forEach((x, i) => {
      const s = ((S.D[c] || []).find((y) => y.ticker === x.ticker && y.theme === x.theme)) || {};
      const t = ta[x.ticker] || {}, sg = ["short", "mid", "long"].map((k) => (t[k] && t[k].signal) || "–");
      const ev = S.EV[x.ticker] || {}, fu = S.FU[x.ticker] || {}, q = fu.q || {};
      const parts = [(i + 1) + "위 " + x.ticker + " " + x.name + (x.rank !== i + 1 ? "(점수 " + x.rank + "위 — 앞 순위가 같은 업종이라 업종마다 한 종목)" : ""),
        THEME_KO[x.theme] + " T" + x.tier + (x.secKo ? " · " + x.secKo : ""), "점수 " + x.score + "(" + LP.partsLine(x, c) + ")", "신호 " + sg.join("/")];
      if (t.risk) parts.push("60일 변동성 " + t.risk.vol + "% · 1년 최대낙폭 " + t.risk.mdd + "%");
      const yo = (k, lab) => (q[k] && q[k].yoy != null ? lab + " " + sgn(q[k].yoy) + "%" : null);
      const qq = [yo("rev", "매출"), yo("op", q.opLabel === "EBIT" ? "EBIT" : "영업이익"), yo("np", "순이익")].filter(Boolean);
      if (qq.length) parts.push((q.period || "") + " 분기 전년 대비 " + qq.join(" "));
      if (q.next && q.next.op != null) parts.push("다음 분기(" + q.next.period + ") 영업이익 컨센서스 " + q.next.op);
      if (fu.rev4w) parts.push("최근 4주 EPS 추정 상향 " + fu.rev4w.up + "·하향 " + fu.rev4w.down);
      const nx = ev.next && ev.next.date;
      if (nx && nx >= today) parts.push("실적 발표 " + nx);
      if (s.thesis) parts.push("논거: " + String(s.thesis).slice(0, 160));
      rows[c].push("- " + parts.join(" | "));
    });
  });
  return { rows, top, excluded, counts: { korea: R.korea.ranked.length, us: R.us.ranked.length } };
}

// ── 출력 스키마(structured outputs — 모든 필드 필수, 추가 필드 없음) ──
const STR = { type: "string" };
const IDXS = { type: "array", items: { type: "integer" } };
const G5 = { type: "string", enum: ["매우 우호", "우호", "신중", "부정", "매우 부정"] };
const STANCE = { type: "string", enum: ["매파", "중립", "비둘기파"] };
const obj = (p) => ({ type: "object", properties: p, required: Object.keys(p), additionalProperties: false });
const region = obj({ shortTerm: G5, midTerm: G5, drivers: { type: "array", items: STR } });
const pick = obj({ ticker: STR, reason: STR });
// 모델 출력(indexNotes 배열) → 내부 형식(indexNotes 지도). 같은 key 가 두 번 오면 앞의 것을 쓴다.
function normIdx(data) {
  if (!data || !Array.isArray(data.indexNotes)) return data;
  const m = {};
  data.indexNotes.forEach((x) => { if (x && x.key && !m[x.key]) m[x.key] = { value: x.value, short: x.short, mid: x.mid, long: x.long }; });
  return Object.assign({}, data, { indexNotes: m });
}
const SCHEMA = obj({
  marketNote: STR, marketNoteUS: STR, marketNoteKR: STR,
  liquidity: obj({ headline: STR, headlineUS: STR, headlineKR: STR, us: region, korea: region, nextCheck: STR, sources: IDXS }),
  policyNews: obj({ us: obj({ stance: STANCE, note: STR, sources: IDXS }), korea: obj({ stance: STANCE, note: STR, sources: IDXS }) }),
  // 항목마다 같은 객체를 8번 펼치면 structured outputs 문법이 너무 커져 400 으로 거부된다(2026-10-23 23:16Z 실측 —
  //   환율·원자재 4개를 더한 뒤 "compiled grammar is too large"). key 가 든 배열 하나로 받고 normIdx 로 지도형으로 바꾼다.
  indexNotes: { type: "array", items: obj({ key: { type: "string", enum: IDX_KEYS.concat(MACRO_KEYS) }, value: STR, short: STR, mid: STR, long: STR }) },
  topPicks: obj({ note: STR, korea: { type: "array", items: pick }, us: { type: "array", items: pick } }),
});

const RESEARCH_SYSTEM = [
  "너는 한국어로 일하는 증시·거시경제 리서처다. 웹 검색으로 사실을 확인하고 확인한 것만 날짜와 함께 메모한다.",
  "- 추측·전망은 쓰지 않는다. 기사가 전한 해석은 '누가 그렇게 봤다'로 쓴다.",
  "- 숫자(지수 등락·금리·환율·수급)는 기사에 실제로 적힌 값만 쓴다.",
  "- 메모는 한국어 900단어 이내, 항목별 글머리표. 각 사실 끝에 날짜를 붙인다.",
].join("\n");

function researchPrompt(S, ctx) {
  return [
    "오늘(UTC) " + today + ". 마지막으로 끝난 정규장: 한국 " + ctx.basis.kr + " · 미국 " + ctx.basis.us + ".",
    "",
    "[참고 데이터 — 이미 알고 있는 숫자이니 다시 찾지 말 것]",
    indexBlock(S.IX),
    "",
    "[조사할 것]",
    "1. 미국 증시: " + ctx.basis.us + " 정규장에서 나스닥·다우·S&P500 이 움직인 원인(금리·실적·정책·지정학), 시장이 주목한 이슈.",
    "2. 한국 증시: " + ctx.basis.kr + " 정규장에서 코스피·코스닥이 움직인 원인, 외국인·기관 수급, 원/달러.",
    "3. 연준: 최근 7일 위원 발언·의사록·결정과 다음 FOMC 에 대한 시장 해석.",
    "4. 한국은행: 최근 7일 총재·위원 발언·금통위 결정·일정.",
    "5. 이번 주 남은 주요 일정: 미국·한국 거시 지표, 중앙은행 회의, 대형 실적 발표.",
    "6. 원/달러 환율·달러인덱스와 국제 유가(WTI)·금: 최근 며칠 움직임의 원인(달러 흐름·연준/한은·외국인 수급·당국 발언 / OPEC+·재고·지정학·수요 전망 / 실질금리·안전자산 수요·중앙은행 매입).",
    "",
    "검색은 꼭 필요한 만큼만 한다. 신뢰할 만한 언론·기관(로이터·블룸버그·CNBC·WSJ·연합뉴스·한국경제·매일경제·연준·한국은행 등)을 우선한다.",
  ].join("\n");
}

const COMPOSE_SYSTEM = [
  "너는 한국 개인 투자자용 주식 대시보드의 매일 시황·거시 판단을 쓰는 애널리스트다. 출력은 지정된 JSON 하나다.",
  "",
  "공통 규칙",
  "- 한국어. 첫 문장에 핵심을 둔다. 앱이 그대로 보여 주므로 처리 메모·작업 경위를 쓰지 않는다 — 확인하지 못한 수치·자료는 '확인되지 않았다'고 쓰지 말고 아예 언급하지 않는다.",
  "- 숫자는 [데이터]나 [조사 메모]에 있는 것만 쓴다. 없는 수치를 만들지 않는다.",
  "- 매매 지시를 쓰지 않는다('매수하라·비중 확대·추격 매수·손절' 금지). 무엇이 일어났고 어떻게 읽히는지만 쓴다.",
  "- 기술 신호 등급은 이미 일어난 움직임의 요약이지 예측이 아니다. 하락 추세면 반등은 '반등 시도'로만 쓴다.",
  "- 지지·저항은 '그 아래로 내려가면 단기 근거가 약해진다'처럼 조건으로만 쓴다. 매물대는 '거래가 몰린 가격'이라는 사실로만 쓴다.",
  "- sources 배열은 [출처 목록]의 번호만 넣는다(없으면 빈 배열).",
  "",
  "항목별",
  "- marketNote: 미국·한국 통합 시황 2~4문장. marketNoteUS·marketNoteKR: 각 나라 시황 2~4문장(지수 등락·원인·이번 주 일정).",
  "- liquidity: 미국·한국 거시 유동성 단기(1~3개월)·중기(6~12개월) 5단계(매우 우호/우호/신중/부정/매우 부정).",
  "  자동 baseline 을 출발점으로 하되 baseline 이 못 읽는 거시 이벤트(FOMC·금통위·지정학)·느린 거시(물가·M2·외국인 수급)·내러티브로 보정한다.",
  "  baseline 과 다른 등급을 주면 drivers 에 그 근거 수치를 쓴다. drivers 는 나라별 2~4개, 각 1문장.",
  "  headline(통합 1문장)·headlineUS·headlineKR(각 1~2문장). nextCheck: 다음에 확인할 가격·지표·일정 1문장.",
  "- policyNews: 연준·한국은행 각각 stance(매파·중립·비둘기파)와 note(누가·무엇을 말하거나 결정했는지 사실 1~2문장). 조사 메모에 근거가 없으면 note 에 직전 판단을 유지한다고 쓰지 말고 sources 를 빈 배열로 둔다.",
  "- indexNotes: 나스닥·다우·코스피·코스닥(+ 아래 환율·원자재) 각각",
  "  value = 지수 밸류(멀티플은 메모에 수치가 있을 때만 — 없으면 멀티플을 언급하지 않는다)와 그 지역 유동성 국면 1~2문장(미국=나스닥·다우, 한국=코스피·코스닥),",
  "  코스피·코스닥의 외국인·기관·개인 순매수 금액은 [데이터]의 수급 줄(한국거래소 집계 확정치)을 쓴다 — 기사의 장중·잠정 숫자와 다르면 데이터를 따른다.",
  "  short/mid/long = 일봉·주봉·월봉 등급과 그 근거(이평·구름·지지/저항·RSI 등 [데이터]의 사실) 1~2문장. 등급은 앱과 같은 추세 상태 이름으로 쓴다",
  "  (적극매수=강한 상승세, 매수=상승세, 중립=횡보, 매도=하락세, 적극매도=강한 하락세 — 2019~2026 995종목에서 다섯 상태의 이후 수익·낙폭이 같아 매수·매도로 부르지 않는다).",
  "  usdkrw(원/달러 환율)·dxy(달러인덱스)·wti(국제 유가)·gold(국제 금)도 같은 형식으로 쓴다 — value 는 '영향': 최근 움직임의 원인(조사 메모)과 그것이 한국·미국 주식에 주는 영향",
  "  (환율: 수출주·외국인 수급·미국 주식의 원화 환산 수익 / 유가: 물가·금리·에너지·운송) 1~2문장, [데이터]의 관련 정보(상관·같이 움직인 종목)를 근거로.",
  "  (달러인덱스: 원화·신흥국 자금·원자재 / 금: 실질금리·안전자산 수요)",
  "  usdkrw 상태는 달러 기준이다(상승세 = 원/달러 상승·원화 약세). 환율·원자재의 방향을 예측하지 않는다.",
  "- topPicks: 한국·미국 각 [Top Pick 순위]의 1·2·3위를 그 순서 그대로 쓴다 — 종목은 규칙(건강 관문 + 상승 가능성 점수, 미국은 업종마다 한 종목)이 이미 골랐다. 고르지도 바꾸지도 않는다.",
  "  reason 은 한국어 1문장 — 그 종목이 건강 조건(흑자·희석 없음·자산 급증·이익 변동 없음)을 통과하고 점수가 높은 이유를",
  "  [Top Pick 순위]의 사실(주식 수 감소·자사주 소각·배당·주주환원 계획·ROIC·최근 분기 실적·논거)로 쓴다. 점수 재료는 미국 = 주식 수 감소·주주환원·ROIC, 한국 = 주식 수 감소·배당이다",
  "  (한국은 주식 수를 줄인 사실 — 자사주 소각 등 — 과 배당 사실 — 배당 확대·주주환원 계획 — 을 쓰되 배당수익률 숫자는 쓰지 않는다). 앞에 주제·tier 를 붙이지 않는다('가치 주제 Tier1 —' 금지).",
  "  reason 에 상승여력 %, 목표가·적정가 금액, PER·PBR 배수, 배당수익률·주주환원 수익률 %, 'N만원' 같은 가격 의존 수치를 쓰지 않는다.",
  "  매출·이익 증가율·ROIC·주식 수 감소율 같은 회사 수치는 된다. '오른다·유망하다' 같은 예측 표현을 쓰지 않는다.",
  "  note: 선정 기준 1문장(앱은 정해진 기준 문구를 쓴다).",
].join("\n");

function composePrompt(S, ctx, memo, urls, picks) {
  const tp = S.D.topPicks || {};
  const prevPicks = ["korea", "us"].map((c) => (c === "korea" ? "한국" : "미국") + ": " + ((tp[c] || []).map((x) => x.ticker + " " + x.name).join(", ") || "–")).join(" / ");
  return [
    "오늘(UTC) " + today + " · 최신 거래일 T " + ctx.T + " · 마지막 정규장 한국 " + ctx.basis.kr + " · 미국 " + ctx.basis.us,
    "",
    "[데이터 — 지수(엔진 등급·사실 지표)]",
    indexBlock(S.IX),
    "",
    "[데이터 — 거시 유동성·금리]",
    liquidityBlock(S.A, S.LQ),
    "",
    "[조사 메모]",
    memo || "(조사 실패 — 데이터만으로 쓰고, 뉴스 사실은 쓰지 않는다)",
    "",
    "[출처 목록]",
    urls.length ? urls.map((u, i) => (i + 1) + ". " + u.url + (u.title ? " — " + u.title : "")).join("\n") : "(없음)",
    "",
    "[Top Pick 순위 — 건강 관문(강한 하락세·추세 붕괴·수급 과열·실질 결격·적자·희석·자산 급증·이익 변동 제외)을 통과한 정식 추천의 상승 가능성 점수(미국: 주식 수 감소·주주환원·ROIC, 한국: 주식 수 감소·배당) 1~3위 — 미국은 업종마다 한 종목]",
    "한국(통과 " + picks.counts.korea + "종목):", picks.rows.korea.join("\n") || "(없음)",
    "미국(통과 " + picks.counts.us + "종목):", picks.rows.us.join("\n") || "(없음)",
    "직전 Top Pick: " + prevPicks + (tp.asOf ? " (" + tp.asOf + ")" : ""),
  ].join("\n");
}

// ── 결과 검사 — 항목별 오류(있으면 그 항목은 반영하지 않는다) ──
// 조사 경위 문구 — 못 찾은 자료를 화면 문장에 적은 것(2026-10-26 지수 대응 4개가 '멀티플 수치는 확인되지 않았고,'로 시작했다).
//   '원인 보도는 확인되지 않았고'처럼 보도가 없었다는 사실은 읽는 사람에게 정보라 막지 않는다.
const PROCESS = /(?:수치|자료|데이터|멀티플|밸류에이션|PER|PBR|지표)\S{0,2}\s*(?:확인되지\s*않|확인하지\s*못|확인\s*못|찾지\s*못|파악되지\s*않|파악하지\s*못)|조사\s*메모|검색\s*결과|출처\s*목록/;
function check(out, picks) {
  const err = { market: [], liquidity: [], policy: [], indexNotes: [], topPicks: [] };
  const txt = (k, label, s) => {
    if (!s || !String(s).trim()) err[k].push(label + " 비어 있음");
    else if (L.DIRECTIVE.test(s)) err[k].push(label + " 매매 지시 문구('" + String(s).match(L.DIRECTIVE)[0] + "') — 사실과 해석만 쓸 것");
    else if (PROCESS.test(s)) err[k].push(label + " 조사 경위 문구('" + String(s).match(PROCESS)[0] + "') — 확인 못 한 자료는 언급하지 말 것");
  };
  txt("market", "marketNote", out.marketNote); txt("market", "marketNoteUS", out.marketNoteUS); txt("market", "marketNoteKR", out.marketNoteKR);
  const lq = out.liquidity || {};
  ["headline", "headlineUS", "headlineKR", "nextCheck"].forEach((f) => txt("liquidity", "liquidity." + f, lq[f]));
  ["us", "korea"].forEach((r) => {
    const x = lq[r] || {};
    if (!Array.isArray(x.drivers) || !x.drivers.length || x.drivers.length > 5) err.liquidity.push("liquidity." + r + ".drivers 는 1~5개");
    else x.drivers.forEach((d, i) => txt("liquidity", "liquidity." + r + ".drivers[" + i + "]", d));
  });
  const pn = out.policyNews || {};
  ["us", "korea"].forEach((r) => txt("policy", "policyNews." + r + ".note", (pn[r] || {}).note));
  IDX_KEYS.concat(MACRO_KEYS.filter((k) => macroOf(k))).forEach((k) => ["value", "short", "mid", "long"].forEach((f) => txt("indexNotes", "indexNotes." + k + "." + f, ((out.indexNotes || {})[k] || {})[f])));
  const tp = out.topPicks || {};
  ["korea", "us"].forEach((c) => {
    const arr = tp[c];
    if (picks.top[c].length < 3) { err.topPicks.push("topPicks." + c + " — 순위 종목이 3개 미만(" + picks.top[c].length + ") — 이번엔 쓰지 않는다"); return; }
    if (!Array.isArray(arr) || arr.length !== 3) { err.topPicks.push("topPicks." + c + " 는 정확히 3종목(현재 " + (Array.isArray(arr) ? arr.length : 0) + ")"); return; }
    const seen = new Set();
    arr.forEach((it, i) => {
      const tag = "topPicks." + c + "[" + i + "]";
      if (it.ticker !== picks.top[c][i]) err.topPicks.push(tag + " '" + it.ticker + "' — " + (i + 1) + "위는 '" + picks.top[c][i] + "'(순위 1~3위를 그 순서 그대로)");
      if (seen.has(it.ticker)) err.topPicks.push(tag + " '" + it.ticker + "' 중복");
      seen.add(it.ticker);
      if (!/[가-힣]/.test(it.reason || "")) err.topPicks.push(tag + " reason 한국어 아님");
      const hit = priceNumberIn(it.reason);
      if (hit) err.topPicks.push(tag + " reason 에 가격 의존 수치('" + hit + "') 금지");
      if (L.DIRECTIVE.test(it.reason || "")) err.topPicks.push(tag + " reason 매매 지시 문구");
      if (PROCESS.test(it.reason || "")) err.topPicks.push(tag + " reason 조사 경위 문구");
    });
  });
  return err;
}
const errCount = (e) => Object.values(e).reduce((a, x) => a + x.length, 0);

const cleanReason = (r) => String(r || "").replace(/^\s*(?:우량|성장|가치|저평가|배당|히든)(?:\s*주제)?\s*(?:Tier|T)\s*\d\s*[—\-–:]\s*/i, "").trim();
function srcList(idxs, urls) {
  const out = [];
  (idxs || []).forEach((i) => {
    const u = urls[i - 1];
    if (u && !isBlockedSource(u.url) && !out.includes(u.url)) out.push(u.url);
  });
  return out.slice(0, 4);
}

// ── 파일 쓰기 ──
function writeWin(file, key, obj, fallbackHead) {
  const p = path.join(L.DATA, file);
  let head = fallbackHead;
  if (fs.existsSync(p)) {
    const t = fs.readFileSync(p, "utf8"), i = t.indexOf("window." + key);
    if (i > 0) head = t.slice(0, i);
  }
  fs.writeFileSync(p, head + "window." + key + " = " + JSON.stringify(obj, null, 1) + ";\n");
}
function applyReco(patch) {
  fs.mkdirSync(L.CACHE_DIR, { recursive: true });
  const pp = path.join(L.CACHE_DIR, "daily-patch.json");
  fs.writeFileSync(pp, JSON.stringify(patch));
  const r = spawnSync(process.execPath, [path.join(__dirname, "update-reco.js"), pp], { encoding: "utf8" });
  if (r.status !== 0) throw new Error("update-reco 거부: " + String(r.stderr || r.stdout || "").trim().split("\n").slice(-4).join(" / "));
}
function buildOutputs(S, out, urls, ctx, ok) {
  const res = {};
  if (ok.market || ok.topPicks) {
    const patch = {};
    if (ok.market) Object.assign(patch, { marketNote: out.marketNote.trim(), marketNoteUS: out.marketNoteUS.trim(), marketNoteKR: out.marketNoteKR.trim(), marketNoteAsOf: today });
    if (ok.topPicks) {
      const by = {};
      ["korea", "us"].forEach((c) => (S.D[c] || []).forEach((s) => { if (!isPersonalTheme(s.theme) && !by[c + ":" + s.ticker]) by[c + ":" + s.ticker] = s; }));
      const tp = { asOf: today, note: LP.NOTE };
      ["korea", "us"].forEach((c) => {
        tp[c] = out.topPicks[c].map((it, i) => { const s = by[c + ":" + it.ticker]; return { rank: i + 1, ticker: it.ticker, market: s.market, name: s.name, reason: cleanReason(it.reason) }; });
      });
      patch.topPicks = tp;
    }
    res.patch = patch;
  }
  if (ok.liquidity) {
    const prev = S.LQ || {}, lq = out.liquidity;
    const L2 = Object.assign({}, prev, {
      asOf: today, headline: lq.headline.trim(), headlineUS: lq.headlineUS.trim(), headlineKR: lq.headlineKR.trim(),
      us: { shortTerm: lq.us.shortTerm, midTerm: lq.us.midTerm, drivers: lq.us.drivers.map((d) => d.trim()) },
      korea: { shortTerm: lq.korea.shortTerm, midTerm: lq.korea.midTerm, drivers: lq.korea.drivers.map((d) => d.trim()) },
      nextCheck: lq.nextCheck.trim(),
    });
    const ls = srcList(lq.sources, urls);
    if (ls.length) L2.sources = ls;
    // 정책 뉴스 — 출처가 하나라도 있는 쪽만 갱신(근거 없는 판단으로 덮지 않는다)
    if (ok.policy) {
      const pn = Object.assign({}, prev.policyNews || {});
      let touched = false;
      ["us", "korea"].forEach((r) => {
        const x = out.policyNews[r], s = srcList(x.sources, urls);
        if (s.length) { pn[r] = { stance: x.stance, note: x.note.trim(), sources: s }; touched = true; }
      });
      if (touched) { pn.asOf = today; L2.policyNews = pn; }
    }
    res.liquidity = L2;
  }
  if (ok.indexNotes) {
    const items = {};
    IDX_KEYS.forEach((k) => {
      const ix = (S.IX.indices || []).find((i) => i.key === k) || {}, n = out.indexNotes[k];
      items[k] = { value: n.value.trim(), short: n.short.trim(), mid: n.mid.trim(), long: n.long.trim(),
        sigShort: (ix.short && ix.short.signal) || "", sigMid: (ix.mid && ix.mid.signal) || "", sigLong: (ix.long && ix.long.signal) || "" };
    });
    MACRO_KEYS.forEach((k) => {
      const m = macroOf(k), n = out.indexNotes[k];
      if (!m || !n) return;
      items[k] = { value: n.value.trim(), short: n.short.trim(), mid: n.mid.trim(), long: n.long.trim(),
        sigShort: (m.short && m.short.signal) || "", sigMid: (m.mid && m.mid.signal) || "", sigLong: (m.long && m.long.signal) || "" };
    });
    res.indexNotes = { asOf: S.IX.asOf, items };
  }
  return res;
}
const LQ_HEAD = "// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.\n" +
  "// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.\n";
const IN_HEAD = "// 지수 기술+밸류 대응 — 지수별 밸류(유동성 포함) + 단기(일봉)/중기(주봉)/장기(월봉) 기술 대응 + 신호 등급(indices.js 기준).\n";
// 항목마다 따로 쓴다 — recommendations.js 패치가 가드레일에 막혀도 유동성·지수 대응은 남긴다
function writeOutputs(res, errors) {
  const wrote = [];
  if (res.liquidity) { writeWin("liquidity.js", "LIQUIDITY_DATA", res.liquidity, LQ_HEAD); wrote.push("liquidity"); }
  if (res.indexNotes) { writeWin("index-notes.js", "INDEX_NOTES", res.indexNotes, IN_HEAD); wrote.push("indexNotes"); }
  if (res.patch && Object.keys(res.patch).length) {
    try {
      applyReco(res.patch);
      if (res.patch.marketNote) wrote.push("market");
      if (res.patch.topPicks) wrote.push("topPicks");
    } catch (e) {
      if (errors) errors.push(e.message); else throw e;
      console.error("ai-daily: " + e.message);
    }
  }
  return wrote;
}

// --reapply: 원격 최신 위에 이번 실행 결과를 다시 얹는다 — 원격이 같은 날 이후로 쓴 항목은 원격을 남긴다
function reapply() {
  const c = L.readCache("daily.json");
  if (!c || !c.res) { console.log("ai-daily --reapply: 캐시 없음 — 건너뜀"); return; }
  const S = loadAll(), res = {};
  // 이번 실행이 계획할 때 본 문장(seenSig)이 원격에 그대로일 때만 다시 얹는다 — 그 사이 세션이 고쳤으면 원격을 남긴다.
  //   (예전 캐시엔 seenSig 가 없어 날짜로 판단)
  const now = sigs(S), untouched = (k, byDate) => (c.seenSig ? L.sameSig(c.seenSig[k], now[k]) : byDate);
  if (c.res.patch) {
    const p = {};
    if (c.res.patch.marketNote && untouched("market", !(S.D.marketNoteAsOf >= c.today))) Object.assign(p, { marketNote: c.res.patch.marketNote, marketNoteUS: c.res.patch.marketNoteUS, marketNoteKR: c.res.patch.marketNoteKR, marketNoteAsOf: c.res.patch.marketNoteAsOf });
    if (c.res.patch.topPicks && untouched("topPicks", !(S.D.topPicks && S.D.topPicks.asOf >= c.today))) p.topPicks = c.res.patch.topPicks;
    if (Object.keys(p).length) res.patch = p;
  }
  if (c.res.liquidity && untouched("liquidity", !(S.LQ && S.LQ.asOf >= c.today))) res.liquidity = c.res.liquidity;
  if (c.res.indexNotes && untouched("indexNotes", !(S.IN && S.IN.asOf >= c.res.indexNotes.asOf))) res.indexNotes = c.res.indexNotes;
  const errs = [];
  const wrote = writeOutputs(res, errs);
  console.log("ai-daily --reapply: " + (wrote.length ? wrote.join(", ") + " 다시 반영" : "원격이 최신 — 반영 없음") + (errs.length ? " · 오류 " + errs.join(" / ") : ""));
}

async function main() {
  if (REAPPLY) return reapply();
  if (WHO) { const S = loadAll(); if (S.D && S.IX && S.TA) console.log(planLine(plan(S, L.readStatus()))); return; }
  const cl = L.client();
  if (!cl) { console.log("ai-daily: ANTHROPIC_API_KEY 없음 — 건너뜀(그날 몫은 A 루틴 세션이 쓴다)"); return; }
  const S = loadAll();
  if (!S.D || !S.IX || !S.TA) { console.log("ai-daily: 데이터 파일 부족 — 건너뜀"); return; }
  const st = L.readStatus(), P = plan(S, st);
  const todo = ITEMS.filter((k) => P.items[k].write);
  console.log(planLine(P));
  const prevSeen = (st.daily || {}).seen;
  if (!P.run || !todo.length) {
    console.log("ai-daily: 쓸 항목 없음 — 오늘 몫이 이미 최신이거나 세션이 썼다");
    // 건너뛴 사실도 남긴다(앱 'AI 연결' 창) — 지난 성공의 지문·종가 기준은 그대로 두고, 본 문장 지문(seen)만 갱신
    const prev = st.daily || {};
    L.writeStatus("daily", Object.assign({}, prev, { checkedAt: new Date().toISOString(), seen: nextSeen(prevSeen, P.cur, P.basis),
      skipped: "오늘(" + P.T + ") 몫이 이미 최신 — " + (ITEMS.some((k) => P.items[k].mine) ? "AI 작성분 유지" : "루틴 세션이 작성") }));
    return;
  }

  const model = L.MODELS.daily, startedAt = new Date().toISOString();
  let usage = L.newUsage(), memo = "", urls = [], note = [];
  const status = { at: startedAt, T: P.T, basis: P.basis, model, ok: false, seen: nextSeen(prevSeen, P.cur, P.basis) };   // skipped·checkedAt 은 새 실행에서 지운다
  const refreshed = ITEMS.filter((k) => P.items[k].outdated);
  if (refreshed.length) note.push("새 종가로 세션 문장 갱신: " + refreshed.join(", "));
  try {
    try {
      const r = await L.research(cl, { model, system: RESEARCH_SYSTEM, prompt: researchPrompt(S, P), maxSearches: +(process.env.AI_DAILY_SEARCHES || 6), effort: "medium" });
      usage = L.mergeUsage(usage, r.usage); memo = r.text; urls = r.urls.slice(0, 40);
      if (r.searchErrors.length) note.push("검색 오류 " + r.searchErrors.join(","));
    } catch (e) {
      note.push("조사 실패 — " + L.describeError(e));
      console.log("ai-daily: 조사 단계 실패(데이터만으로 계속) — " + L.describeError(e));
    }
    const picks = pickTable(S);
    let prompt = composePrompt(S, P, memo, urls, picks);
    let c1 = await L.compose(cl, { model, system: COMPOSE_SYSTEM, prompt, schema: SCHEMA, effort: "high" });
    usage = L.mergeUsage(usage, c1.usage);
    let out = normIdx(c1.data), err = check(out, picks);
    if (errCount(err)) {
      const list = Object.values(err).flat();
      console.log("ai-daily: 검사 오류 " + list.length + "건 — 한 번 고쳐 쓰게 한다\n  - " + list.join("\n  - "));
      const fix = prompt + "\n\n[직전 출력]\n" + JSON.stringify(c1.data) + "\n\n[직전 출력의 문제 — 이것만 고쳐 같은 형식으로 다시 써라]\n- " + list.join("\n- ");
      const c2 = await L.compose(cl, { model, system: COMPOSE_SYSTEM, prompt: fix, schema: SCHEMA, effort: "high" });
      usage = L.mergeUsage(usage, c2.usage);
      out = normIdx(c2.data); err = check(out, picks);
    }
    const ok = {};
    ITEMS.forEach((k) => { ok[k] = todo.includes(k) && !err[k].length; });
    ok.policy = ok.liquidity && !err.policy.length;
    const skipped = ITEMS.filter((k) => todo.includes(k) && !ok[k]);
    if (skipped.length) note.push("검사 미통과로 유지: " + skipped.map((k) => k + "(" + err[k][0] + ")").join(" · "));
    const res = buildOutputs(S, out, urls, P, ok);
    if (DRY) { console.log(JSON.stringify(res, null, 1)); return; }
    L.writeCache("daily.json", { at: startedAt, today, T: P.T, res, seenSig: P.cur });
    const wErr = [];
    const wrote = writeOutputs(res, wErr);
    if (wErr.length) note.push(wErr.join(" · "));
    const after = loadAll(), afterSig = sigs(after);
    Object.assign(status, { ok: wrote.length > 0, wrote, sig: Object.assign({}, (st.daily && st.daily.sig) || {}, pickSig(afterSig, wrote)), sources: urls.length,
      seen: nextSeen(prevSeen, afterSig, P.basis) });
    console.log("ai-daily: 반영 " + (wrote.join(", ") || "없음") + " · 검색 결과 " + urls.length + "건");
  } catch (e) {
    status.error = L.describeError(e);
    console.error("ai-daily 실패: " + status.error);
    process.exitCode = 1;
  } finally {
    if (!DRY) {
      status.usage = L.roundUsage(usage);
      if (note.length) status.note = note.join(" · ");
      // 실패해도 지난 성공 기록(지문·종가 기준)은 남긴다 — 다음 실행이 'AI 작성분'을 알아보고 같은 종가로 다시 시도하게
      if (!status.ok && st.daily) {
        status.sig = st.daily.sig; status.basis = st.daily.basis || null;
        status.lastOk = st.daily.ok ? st.daily.at : st.daily.lastOk;
      }
      L.writeStatus("daily", status);
      console.log("ai-daily: 사용량 " + JSON.stringify(status.usage));
    }
  }
}
function pickSig(cur, wrote) { const o = {}; wrote.forEach((k) => { o[k] = cur[k]; }); return o; }

main().catch((e) => { console.error("ai-daily 오류: " + L.describeError(e)); process.exitCode = 1; });
