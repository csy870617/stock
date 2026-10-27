// Top Pick 순위 — '건강 + 상승 가능성'(2026-10-27 사용자 요청 "균형이 좋은 종목보다 건강하면서 상승 가능성이 가장 높은 종목으로")
//
// 규칙(결과를 보기 전에 적은 사전 등록과 검증: scripts/research/top-pick/ — PREREG.md·README.md):
//   ① 건강 관문 — 하나라도 걸리면 후보에서 뺀다(값이 없는 항목은 통과)
//      기존 제외(CLAUDE.md §4-6): 단기·중기 강한 하락세(엔진 적극매도) · 추세 붕괴(세 기간 모두 매도 이하) · 한국 수급 과열 · 실질 결격
//      재무(검증): 순이익 적자 · 주식 수 연 5% 넘게 증가(희석) · 자산 증가율 상위 10% · 이익 변동(5년 ROA 표준편차) 상위 10%
//        '상위 10%'는 시장 전체를 매일 다시 잴 수 없어 검증 표본의 월별 90백분위 중앙값을 고정 문턱으로 쓴다(CUTS).
//   ② 상승 가능성 점수 — 관문을 통과한 같은 나라 종목 안의 백분위(0~1, 높을수록 좋게) 평균, 값이 있는 것만:
//      주식 수 감소(−희석) · 주주환원 수익률(배당+자사주−증자 ÷ 시총 — 미국만, 한국 자료엔 없다) · ROIC
//      미국 2011~2026 시총 상위 500 에서 6개월 IC +0.043(t 2.66, 전·후반 양), 점수 상위 3종목이 6개월 뒤 시장보다 오른 경우 55%
//      (건강 통과 전체 49%). 한국 2022~2026 에서는 효과가 확인되지 않았다(IC +0.01) — 근거는 미국 기록이다.
//   나라별 점수 1~3위 = 오늘의 Top Pick. ai-daily·세션은 이 순서 그대로 쓰고 이유 문장만 쓴다(pick-score.js 로 확인).
//
// 재무 값은 발굴 스크린(discovery-candidates.js)이 편성 종목마다 남기는 fx(연간 재무 — lib-factors, 연구와 같은 정의, % 단위).
// 히든 주제 종목은 fx 가 없어 히든 스크린의 희석(주식 수 연 증가율)만 쓴다 — 히든 스크린의 ROIC 는 현금을 뺀 투하자본이라
// (100%로 잘린 값도 있다) 같은 백분위에 섞지 않는다. 재무 값이 하나도 없는 종목(외국 ADR·스크린 전 편입 등)은 순위에 넣지 않는다.
// 주식 수가 한 해 20% 넘게 준 값은 자사주 소각이 아니라 인적분할·주식 병합 같은 자본 거래로 보고 0(순발행·소각 없음)으로 둔다
//   (2026-10-27 삼성바이오로직스 인적분할 −35% 가 1위로 올라왔다 — 연구 패널에서도 이런 값은 0.6%뿐이고 대부분 분할·분사였다.
//   0 으로 두고 다시 잰 검증도 결론이 같았다 — research/top-pick/README.md '자료 정리').
const ISS_CA = -20;
const PERSONAL = new Set(["watch", "hold"]);
const THEMES = ["core", "growth", "value", "dividend", "rising"];
// 고정 문턱(%) — research/top-pick/README.md '라이브 문턱'. 한국 금융은 검증 때도 값이 30개 미만이라 이익 변동 문턱이 없었다.
const CUTS = {
  us: { iss: 5, ag: 30.1, sroa: 7.6, sroaFin: 2.8 },
  korea: { iss: 5, ag: 36.7, sroa: 9.8, sroaFin: null },
};
const NOTE = "건강 조건(흑자·희석·자산 급증·이익 변동·추세·수급·결격)을 통과한 정식 추천 중 상승 가능성 점수(주식 수 감소·주주환원·ROIC) 1~3위 — 확실한 예측이 아니라 확률을 조금 기울이는 기준";
// 앱 ⓘ·문서용 검증 요약(research/top-pick/README.md 결과 3)
const EVIDENCE = "과거 검증(미국 2011~2026 시총 상위 500, 매월 고른 점수 1~3위): 1개월 뒤 시장보다 오른 경우 55%(건강 조건 통과 전체 50%), " +
  "6개월 뒤 53%(49%)·평균 +2.8%p. 한국(2022~2026)에서는 점수 효과가 확인되지 않았다. 열에 넷 이상은 시장보다 못했다 — 확실히 오르는 종목은 없다.";

const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const r1 = (v) => (ok(v) ? Math.round(v * 10) / 10 : null);
const r3 = (v) => (ok(v) ? Math.round(v * 1000) / 1000 : null);
// 같은 나라 안 백분위 — 연구(test-picks.js)와 같은 방식: 그 값보다 작은 값의 수 ÷ (n−1)
function pctRank(vals) {
  const xs = vals.filter(ok).sort((a, b) => a - b);
  return (v) => {
    if (!ok(v) || !xs.length) return null;
    let lo = 0, hi = xs.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (xs[m] < v) lo = m + 1; else hi = m; }
    return xs.length === 1 ? 0.5 : lo / (xs.length - 1);
  };
}

// 편성 종목의 재무 값 — {niPos, iss, shy, roic, ag, sroa, fin}(%), 없으면 null
function finOf(DC, country, theme, ticker) {
  const g = DC && DC.groups && DC.groups[country + "|" + theme];
  const inc = g && (g.incumbents || []).find((x) => x.ticker === ticker);
  if (!inc) return null;
  const iss = (v) => (!ok(v) ? null : v < ISS_CA ? 0 : v);
  if (theme === "rising") {
    const fails = (inc.fails || []).join(" ");
    return { niPos: /순이익 적자/.test(fails) ? 0 : null, iss: iss(inc.dilution), issCa: ok(inc.dilution) && inc.dilution < ISS_CA, shy: null, roic: null, ag: null, sroa: null, fin: false, src: "hidden" };
  }
  const fx = inc.fx;
  if (!fx) return null;
  return { niPos: fx.niPos == null ? null : fx.niPos, iss: iss(fx.iss), issCa: ok(fx.iss) && fx.iss < ISS_CA, shy: ok(fx.shy) ? fx.shy : null, roic: ok(fx.roic) ? fx.roic : null,
    ag: ok(fx.ag) ? fx.ag : null, sroa: ok(fx.sroa) ? fx.sroa : null, fin: !!inc.fin, src: "fx" };
}

// 건강 관문 — 걸린 사유(첫 번째 하나) 또는 null
function unhealthy(country, s, sig, ev, defState, f) {
  if (sig[0] === "적극매도" || sig[1] === "적극매도") return "강한 하락세(단기·중기)";
  if (sig.every((v) => /매도/.test(v))) return "추세 붕괴";
  if (country === "korea" && ev && ev.flow && ev.flow.hot) return "수급 과열";
  if (defState === "결격") return "실질 결격(교체 대기)";
  if (!f) return null;
  const C = CUTS[country];
  if (f.niPos === 0) return "순이익 적자";
  if (ok(f.iss) && f.iss > C.iss) return "희석(주식 수 연 " + r1(f.iss) + "% 증가)";
  if (ok(f.ag) && f.ag >= C.ag) return "자산 급증(연 " + r1(f.ag) + "%)";
  const sc = f.fin ? C.sroaFin : C.sroa;
  if (sc != null && ok(f.sroa) && f.sroa >= sc) return "이익 변동 큼(ROA 5년 표준편차 " + r1(f.sroa) + "%p)";
  return null;
}

// S = { D: STOCK_DATA, TA: STOCK_TA, EV: events items(티커별), CA: CANDIDATES, DC: DISCOVERY_CANDIDATES }
// → { korea: {ranked, excluded, unscored}, us: {…} } — ranked 는 점수 내림차순(1위가 첫째)
function rankPicks(S) {
  const ta = (S.TA && S.TA.ta) || {}, EV = S.EV || {}, defState = {}, dupSlot = new Set();
  // 결격 상태는 (국가|주제|티커)로 본다 — '중복' 자리는 회사 결격이 아니라 편성 구성 문제라 그 자리만 건너뛴다(check-defects 의 dup 판정)
  Object.keys((S.CA && S.CA.groups) || {}).forEach((g) => (S.CA.groups[g].defects || []).forEach((d) => {
    if (d.dup) dupSlot.add(g + "|" + d.ticker);
    else defState[g + "|" + d.ticker] = d.state;
  }));
  const out = {};
  ["korea", "us"].forEach((c) => {
    // 종목마다 대표 자리 하나 — 중복 자리를 빼고 티어가 높은 쪽, 같으면 주제 순서
    const rep = new Map();
    ((S.D && S.D[c]) || []).forEach((s) => {
      if (PERSONAL.has(s.theme) || dupSlot.has(c + "|" + s.theme + "|" + s.ticker)) return;
      const cur = rep.get(s.ticker);
      if (!cur || (s.tier || 9) < (cur.tier || 9) || ((s.tier || 9) === (cur.tier || 9) && THEMES.indexOf(s.theme) < THEMES.indexOf(cur.theme))) rep.set(s.ticker, s);
    });
    const healthy = [], excluded = [], unscored = [];
    rep.forEach((s) => {
      const x = ta[s.ticker] || {}, sig = ["short", "mid", "long"].map((k) => (x[k] && x[k].signal) || "–");
      const f = finOf(S.DC, c, s.theme, s.ticker);
      const why = unhealthy(c, s, sig, EV[s.ticker], defState[c + "|" + s.theme + "|" + s.ticker], f);
      const base = { ticker: s.ticker, name: s.name, theme: s.theme, tier: s.tier };
      if (why) excluded.push(Object.assign(base, { why }));
      else if (!f || ![f.iss, f.shy, f.roic].some(ok)) unscored.push(Object.assign(base, { why: "재무 자료 없음" }));
      else healthy.push({ s, f, base });
    });
    const pIss = pctRank(healthy.map((h) => h.f.iss)), pShy = pctRank(healthy.map((h) => h.f.shy)), pRoic = pctRank(healthy.map((h) => h.f.roic));
    const ranked = healthy.map((h) => {
      const a = pIss(h.f.iss), b = pShy(h.f.shy), r = pRoic(h.f.roic);
      return Object.assign(h.base, { score: r3(mean([a == null ? null : 1 - a, b, r])), iss: r1(h.f.iss), shy: r1(h.f.shy), roic: r1(h.f.roic),
        pct: { iss: a == null ? null : r3(1 - a), shy: r3(b), roic: r3(r) }, src: h.f.src, issCa: h.f.issCa || undefined });
    });
    ranked.sort((p, q) => (q.score - p.score) || ((p.tier || 9) - (q.tier || 9)) || (THEMES.indexOf(p.theme) - THEMES.indexOf(q.theme)) || String(p.name).localeCompare(String(q.name), "ko"));
    ranked.forEach((x, i) => { x.rank = i + 1; });
    out[c] = { ranked, excluded, unscored };
  });
  return out;
}

// 화면·프롬프트용 한 줄 — '주식 수 −1.2% · 주주환원 3.1% · ROIC 24%'(값이 있는 것만)
function partsLine(x) {
  const a = [];
  if (x.issCa) a.push("주식 수 변화 0 으로 봄(분할·병합 등 자본 거래)");
  else if (ok(x.iss)) a.push("주식 수 연 " + (x.iss > 0 ? "+" : "") + x.iss + "%");
  if (ok(x.shy)) a.push("주주환원 수익률 " + x.shy + "%");
  if (ok(x.roic)) a.push("ROIC " + x.roic + "%");
  return a.join(" · ");
}

module.exports = { CUTS, NOTE, EVIDENCE, rankPicks, finOf, partsLine };
