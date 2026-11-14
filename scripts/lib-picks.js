// Top Pick 순위 — '건강 + 상승 가능성'(2026-10-27 사용자 요청 "균형이 좋은 종목보다 건강하면서 상승 가능성이 가장 높은 종목으로")
//
// 규칙(결과를 보기 전에 적은 사전 등록과 검증: scripts/research/top-pick/ — PREREG.md·README.md):
//   ① 건강 관문 — 하나라도 걸리면 후보에서 뺀다(값이 없는 항목은 통과)
//      기존 제외(CLAUDE.md §4-6): 단기·중기 강한 하락세(엔진 적극매도) · 추세 붕괴(세 기간 모두 매도 이하) · 한국 수급 과열 · 실질 결격
//      재무(검증): 순이익 적자 · 주식 수 연 5% 넘게 증가(희석) · 자산 증가율 상위 10% · 이익 변동(5년 ROA 표준편차) 상위 10%
//        '상위 10%'는 시장 전체를 매일 다시 잴 수 없어 검증 표본의 월별 90백분위 중앙값을 고정 문턱으로 쓴다(CUTS).
//   ② 상승 가능성 점수 — 관문을 통과한 같은 나라 종목 안의 백분위(0~1, 높을수록 좋게) 평균, 값이 있는 것만(SCORE):
//      미국 = 주식 수 감소(−희석) · 주주환원 수익률(배당+자사주−증자 ÷ 시총) · ROIC — 2011~2026 시총 상위 500 에서 6개월 IC +0.043
//        (t 2.66, 전·후반 양). 3차 연구(PREREG-3 — 우량·저평가·배당 기둥 묶음 6개, 중소형 501~1,000위 확인)에서도 이 규칙이 가장 나았다.
//      한국 = 주식 수 감소 · 배당수익률(2026-10-27 3차 연구) — 미국 주주환원 수익률(배당+자사주)을 한국 자료로 옮긴 것과 같은 뜻이다
//        (한국 패널엔 자사주 매입액이 없어 자사주 소각은 주식 수 감소로, 배당은 배당수익률로 본다). 주식 수 감소만 본 순위보다 3개월 IC 가
//        개발(1~300위) +0.049(t 2.38, 전·후반 양)·확인용(301~600위) +0.057(t 2.2) 높았고 해마다(2023~2026)·비금융에서도 같은 방향,
//        후보 40종목 중 1~3위 흉내에서 3개월 뒤 시장보다 오른 비율 54%(주식 수만 49%, 무작위 43%)·12개월 −30% 폭락 2%(8%, 12%).
//        사전 기준(t ≥ 2.5)엔 조금 못 미쳤다 — 그 전 한국 규칙(주식 수만)도 사전 등록으로 고른 게 아니어서 같은 저울에서 앞선 쪽을 골랐다
//        (README 3차). 대신 평균 초과수익은 주식 수만 본 쪽이 컸다(소수의 큰 상승 — 그만큼 폭락도 많았다).
//   ③ 업종 분산(미국만 — 2026-10-27 4차 연구, 사용자 '금융주에 너무 유리하게 되어 있다'): 점수 순으로 고르되 같은 업종(나스닥 섹터)은 하나만.
//      미국 2011~2026 후보 40종목 중 1~3위 흉내에서 금융 비중이 29%→24%로 줄고 6개월 평균 초과는 같았다(개발 −0.09%p t −0.6, 확인용 +0.10%p).
//      한국은 적용하지 않는다 — 같은 방식으로 대형주(1~300위) 6개월 평균 초과가 1.3%p 낮았다(t −3.8, 2023~2025 해마다 — 밸류업 국면에서
//      금융주가 실제로 가장 많이 올랐다; 확인용 301~600위는 +0.2%p). 사전 등록 기준(뚜렷한 비용이 없을 때만 분산)에 걸렸다(PREREG-4·README 4차).
//   ④ 한국 목표가 급락 관문(2026-10-28 6차 연구, 사용자 '미래적 성장이 종목선정 기준에 포함되면 좋겠다'): 증권사 리포트 목표가 평균
//      (지난 180일 안 증권사마다 최신, 2곳 이상)이 3개월 새 10% 넘게 내린 종목을 뺀다 — data/revisions.js(update-revisions.js).
//      한국 2022~2026 후보 40종목 중 1~3위 흉내에서 6개월 평균 초과 +0.86%p(t 3.0, 전·후반·해마다 양), 확인용 301~600위 +0.14%p(t 1.1).
//      미국은 효과가 없어(−0.08%p) 쓰지 않는다. 앞날 기대를 점수에 더하는 후보(목표가 상향·성장 예측·상승여력)는 두 나라 모두 사전 기준 미달(PREREG-6).
//   나라별 1~3위(③ 적용) = 오늘의 Top Pick(rankPicks 의 top). ai-daily·세션은 이 순서 그대로 쓰고 이유 문장만 쓴다(pick-score.js 로 확인).
//   후보 = 정식 추천 4주제 + 주목(신고가·턴어라운드) + 관심 편성 종목(2026-10-30 사용자 요청 '관심 종목도 Top Pick 조건에 해당하면 빼지 마' —
//   검증 연구도 편성과 무관한 시총 상위 전체에서 했다). 보유 목록은 사용자가 이미 산 종목이라 넣지 않는다.
//   같은 종목이 여러 자리에 있으면 정식 → 주목 → 관심 순서의 자리를 대표로 쓴다.
//
// 재무 값은 발굴 스크린(discovery-candidates.js)이 편성 종목마다 남기는 fx(연간 재무 — lib-factors, 연구와 같은 정의, % 단위).
// 주목·관심 종목은 같은 스크린이 personal[나라][티커] 에 같은 잣대로 남긴 값을 쓴다.
// 재무 값이 하나도 없는 종목(외국 ADR·스크린 전 편입 등)은 순위에 넣지 않는다.
// 주식 수가 한 해 20% 넘게 준 값은 자사주 소각이 아니라 인적분할·주식 병합 같은 자본 거래로 보고 0(순발행·소각 없음)으로 둔다
//   (2026-10-27 삼성바이오로직스 인적분할 −35% 가 1위로 올라왔다 — 연구 패널에서도 이런 값은 0.6%뿐이고 대부분 분할·분사였다.
//   0 으로 두고 다시 잰 검증도 결론이 같았다 — research/top-pick/README.md '자료 정리').
// 배당수익률은 fundamentals.js dy(최근 결산 DPS ÷ 현재가 — 연구 패널과 같은 정의), 출처 값이 의심스러우면(dyFlag) 쓰지 않는다.
// 결산 뒤 자본 거래 점검(한국 — fundamentals.js sh.chg: 결산 연도 주식 수 → 지금): 결산 재무는 그 뒤의 합병·증자·분할을 못 본다
//   (2026-10-27 HD건설기계 — 2025년 −5.2%로 '주식 수 감소' 1위였지만 2026-01 합병으로 지금 주식 수가 결산 때의 2.7배).
//   지금이 20% 넘게 많으면 희석과 같게 관문에서 빼고, 20% 넘게 적으면(분할 등) 주식 수 변화를 0 으로 본다. 근사치라 ±20% 안은 보지 않는다.
// 업종은 fundamentals.js 의 ind(한국 WICS 산업)·sec(미국 나스닥 섹터) → lib-sectors.js 의 같은 분류표(연구와 공유). 업종을 모르면 제한하지 않는다.
const SEC = require("./lib-sectors");
const ISS_CA = -20, POST_CA = 20;
const DIVERSIFY = { us: true, korea: false };   // 위 ③
const REV = { korea: { months: 3, cutPct: -10 } };   // 위 ④ — 나라에 없으면 보지 않는다
const NOT_PICKABLE = new Set(["hold"]);   // 위 '후보' — 주목(spotlight)·관심(watch)은 후보, 보유(hold)는 아님
const canPick = (theme) => !!theme && !NOT_PICKABLE.has(theme);
const THEMES = ["core", "growth", "value", "dividend", "spotlight", "watch"];   // 같은 종목의 대표 자리 순서(정식 → 주목 → 관심)
const FORMAL = new Set(["core", "growth", "value", "dividend"]);
const PERSONAL_FX = new Set(["spotlight", "watch", "hold"]);   // 재무 값을 스크린 personal 에서 읽는 자리(보유는 건강 점검 표시용 — 순위 후보는 아니다)
// 고정 문턱(%) — research/top-pick/README.md '라이브 문턱'. 한국 금융은 검증 때도 값이 30개 미만이라 이익 변동 문턱이 없었다.
const CUTS = {
  us: { iss: 5, ag: 30.1, sroa: 7.6, sroaFin: 2.8 },
  korea: { iss: 5, ag: 36.7, sroa: 9.8, sroaFin: null },
};
// 점수 재료(나라별) — 위 ②
const SCORE = { us: ["iss", "shy", "roic"], korea: ["iss", "dy"] };
const NOTE = "건강 조건(흑자·희석·자산 급증·이익 변동·추세·수급·결격, 한국은 목표가 급락도)을 통과한 정식 추천·주목·관심 종목 중 상승 가능성 점수(미국: 주식 수 감소·주주환원·ROIC, 한국: 주식 수 감소·배당) 1~3위(미국은 업종마다 한 종목) — 확실한 예측이 아니라 확률을 조금 기울이는 기준";
// 앱 ⓘ·문서용 검증 요약(research/top-pick/README.md — 자본 거래 정리 뒤 값, 앱과 같은 처리)
const EVIDENCE = {
  us: "과거 검증(미국 2011~2026 시총 상위 500, 매월 후보 40종목 중 1~3위를 고르는 상황을 흉내): 3개월 뒤 시장보다 오른 경우 52.5%(무작위 49.8%), " +
    "12개월 안 −30% 폭락 4.2%(4.6%). 우량·저평가·배당 지표를 더한 묶음 6가지와 데이터가 고르는 방식은 이보다 못했다. " +
    "1~3위를 업종마다 한 종목으로 고르면 금융 비중이 29%에서 24%로 줄고 성적은 같았다. 차이는 작다 — 확실히 오르는 종목은 없다.",
  korea: "과거 검증(한국 2022~2026 시총 상위 300, 매월 후보 40종목 중 1~3위를 고르는 상황을 흉내): 3개월 뒤 시장보다 오른 경우 54%(무작위 43%), " +
    "12개월 안 −30% 폭락 2%(12%). 주식 수 감소만 볼 때(49%·8%)보다 나았고 확인용 중소형주(301~600위)에서도 같은 방향이었다. 평균 상승 폭은 주식 수만 볼 때가 컸다. " +
    "업종마다 한 종목으로 고르는 방식은 2023~2025년 금융주 강세 탓에 대형주에서 성적이 낮아 쓰지 않는다. " +
    "증권사 목표가 평균이 3개월 새 10% 넘게 내린 종목을 빼면 1~3위의 6개월 평균 초과가 대형주에서 0.9%p 높았다(해마다 같은 방향, 중소형은 +0.1%p) — 확실히 오르는 종목은 없다.",
};
const SCORE_KO = { iss: "주식 수", shy: "주주환원", roic: "ROIC", dy: "배당" };

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

// 편성 종목의 재무 값 — {niPos, iss, shy, roic, ag, sroa, dy, fin, post}(%), 없으면 null. fu = fundamentals.js 항목(배당수익률·결산 뒤 주식 수 변화)
function finOf(DC, country, theme, ticker, fu) {
  const g = DC && DC.groups && DC.groups[country + "|" + theme];
  const inc = PERSONAL_FX.has(theme) ? ((DC && DC.personal && DC.personal[country]) || {})[ticker] : g && (g.incumbents || []).find((x) => x.ticker === ticker);
  if (!inc) return null;
  const sh = fu && fu.sh, dyKnown = fu && !fu.dyFlag && ok(fu.dy) ? fu.dy : null;
  const post = sh && ok(sh.chg) && Math.abs(sh.chg) > POST_CA ? sh : null;
  const iss = (v) => (!ok(v) ? null : v < ISS_CA || (post && post.chg < 0) ? 0 : v);
  const ca = (v) => (ok(v) && v < ISS_CA) || !!(post && post.chg < 0);
  const fx = inc.fx;
  if (!fx) return null;
  // 무배당은 '값 없음'이 아니라 0 이다(2026-11-14 버그 수정): 네이버는 현금배당이 없는 회사의 배당수익률을 비워 주는데(fundamentals dy null),
  //   검증 패널(lib-factors krFundamentals — 기업현황 현금DPS × 주식 수 ÷ 시총)에서는 무배당 회사가 배당수익률 0 으로 가장 낮은 순위였다.
  //   비운 채로 두면 '값이 있는 것만 평균'이라 무배당 회사가 주식 수 감소 하나로만 점수를 받는다 — 메리츠금융지주(2025 결산 현금배당성향 0)가
  //   점수 1.000 으로 한국 1위였다(0 으로 보면 0.5, 11위). 결산 현금배당성향이 0 으로 확인된 한국 종목만 0 으로 본다(자료가 없으면 그대로 비움).
  const dy = dyKnown != null ? dyKnown : country === "korea" && !(fu && fu.dyFlag) && fx.payoutFy === 0 ? 0 : null;
  return { niPos: fx.niPos == null ? null : fx.niPos, iss: iss(fx.iss), issCa: ca(fx.iss), shy: ok(fx.shy) ? fx.shy : null, roic: ok(fx.roic) ? fx.roic : null,
    ag: ok(fx.ag) ? fx.ag : null, sroa: ok(fx.sroa) ? fx.sroa : null, dy, fin: !!inc.fin, post, src: "fx" };
}

// 건강 관문 — 걸린 사유(첫 번째 하나) 또는 null. rv = revisions.js 항목(목표가 3개월 변화)
function unhealthy(country, s, sig, ev, defState, f, rv) {
  if (sig[0] === "적극매도" || sig[1] === "적극매도") return "강한 하락세(단기·중기)";
  if (sig.every((v) => /매도/.test(v))) return "추세 붕괴";
  if (country === "korea" && ev && ev.flow && ev.flow.hot) return "수급 과열";
  if (REV[country] && rv && ok(rv.chg) && rv.chg <= REV[country].cutPct) return "목표가 급락(증권사 평균 " + REV[country].months + "개월 " + rv.chg + "%)";
  if (defState === "결격") return "실질 결격(교체 대기)";
  if (!f) return null;
  const C = CUTS[country];
  if (f.niPos === 0) return "순이익 적자";
  if (ok(f.iss) && f.iss > C.iss) return "희석(주식 수 연 " + r1(f.iss) + "% 증가)";
  if (f.post && f.post.chg > POST_CA) return "결산 뒤 주식 수 +" + Math.round(f.post.chg) + "%(합병·증자 등)";
  if (ok(f.ag) && f.ag >= C.ag) return "자산 급증(연 " + r1(f.ag) + "%)";
  const sc = f.fin ? C.sroaFin : C.sroa;
  if (sc != null && ok(f.sroa) && f.sroa >= sc) return "이익 변동 큼(ROA 5년 표준편차 " + r1(f.sroa) + "%p)";
  return null;
}

// 건강 점검 목록(화면용, 2026-11-14 — 종목 상세 '건강 점검') — unhealthy() 의 조건을 항목별로 풀어 쓴다. 판정은 unhealthy 가 하고 여기는 설명만 한다
//   (같은 입력으로 '걸린 항목이 있다 ⟺ unhealthy 가 사유를 낸다'를 scripts/test-picks.js 가 확인한다).
//   st: 1 통과 · 0 걸림 · null 판정 안 함(자료 없음·해당 없음). t = 사실 한 줄(화면 문장 — 평서체). formal = 정식 추천 자리(결격 항목은 정식 자리만).
const SIG_KO = { "적극매수": "강한 상승세", "매수": "상승세", "중립": "횡보", "매도": "하락세", "적극매도": "강한 하락세" };
const sgn = (v) => { const r = r1(v); return (r > 0 ? "+" : r < 0 ? "−" : "") + Math.abs(r); };   // 반올림한 값으로 부호를 정한다('−0%' 방지)
function healthChecks(country, sig, ev, defState, f, rv, formal) {
  const out = [], add = (k, st, t) => out.push({ k, st, t }), C = CUTS[country];
  const known = sig.some((v) => SIG_KO[v]), strong = sig[0] === "적극매도" || sig[1] === "적극매도", broken = sig.every((v) => /매도/.test(v));
  add("trend", strong || broken ? 0 : known ? 1 : null, !known ? "신호 자료 없음" : "단·중·장 " + sig.map((v) => SIG_KO[v] || "–").join(" · ") +
    (strong ? " — 단기·중기 강한 하락세면 제외" : broken ? " — 세 기간 모두 하락세 이하(추세 붕괴)" : ""));
  if (country === "korea") {
    const fl = ev && ev.flow, share = fl && ok(fl.fi20) ? "외국인+기관 20일 순매수 거래량의 " + sgn(fl.fi20 * 100) + "%" : null;
    add("flow", fl && fl.hot ? 0 : fl ? 1 : null, !fl ? "수급 자료 없음" : fl.hot ? "수급 과열 — " + (share || "외국인+기관 20일 순매수") + "(6.3% 이상)" : (share || "과열 아님") + (share ? "(6.3% 이상이면 과열)" : ""));
  }
  if (REV[country]) {
    const has = rv && ok(rv.chg), cut = REV[country].cutPct;
    add("tp", has ? (rv.chg <= cut ? 0 : 1) : null, has ? "증권사 목표가 평균 " + REV[country].months + "개월 " + sgn(rv.chg) + "%(" + sgn(cut) + "% 이하면 제외)" : "증권사 리포트 2곳 미만 — 판정 안 함");
  }
  if (formal) add("defect", defState === "결격" ? 0 : 1, defState === "결격" ? "실질 결격 — 교체 대기" : defState === "점검 필요" ? "결격 신호 점검 중(실질 판정 전)" : "실질 결격 없음");
  if (!f) { add("fin", null, "재무 자료 없음(스크린 유니버스 밖·외국 ADR 등) — 흑자·희석·자산 급증·이익 변동 판정 안 함"); return out; }
  add("ni", f.niPos === 0 ? 0 : f.niPos == null ? null : 1, f.niPos === 0 ? "최근 결산 순이익 적자" : f.niPos == null ? "순이익 자료 없음" : "최근 결산 순이익 흑자");
  const dilIss = ok(f.iss) && f.iss > C.iss, dilPost = !!(f.post && f.post.chg > POST_CA);
  add("dil", dilIss || dilPost ? 0 : ok(f.iss) ? 1 : null,
    dilPost && !dilIss ? "결산 뒤 주식 수 +" + Math.round(f.post.chg) + "%(합병·증자 등 — 20% 넘으면 제외)"
      : !ok(f.iss) ? "주식 수 자료 없음" : f.issCa ? "주식 수 변화 0 으로 봄(분할 등 자본 거래)" : "주식 수 연 " + sgn(f.iss) + "%(+" + C.iss + "% 넘으면 제외)");
  add("ag", ok(f.ag) ? (f.ag >= C.ag ? 0 : 1) : null, ok(f.ag) ? "자산 연 " + sgn(f.ag) + "%(" + C.ag + "% 이상이면 제외)" : "자산 증가율 자료 없음");
  const sc = f.fin ? C.sroaFin : C.sroa;
  add("sroa", sc != null && ok(f.sroa) ? (f.sroa >= sc ? 0 : 1) : null,
    sc == null ? "금융 업종 — 이익 변동 문턱 없음(판정 안 함)" : ok(f.sroa) ? "ROA 5년 표준편차 " + r1(f.sroa) + "%p(" + sc + "%p 이상이면 제외)" : "이익 변동 자료 없음");
  return out;
}

// 업종(분류표의 키 — 한국 WICS 섹터·미국 나스닥 섹터) — fundamentals.js 항목에서, 모르면 null
function sectorOf(country, fu) {
  if (!fu) return null;
  return country === "korea" ? SEC.krSector(fu.ind) || (SEC.KR_SECTORS[fu.sec] ? fu.sec : null) : SEC.usSector(fu.sec);
}
// 1~3위 — 점수 순, diversify 면 같은 업종은 하나만(업종 모름은 제한 없음). 뽑힌 종목에 pick(1~3), 업종이 겹쳐 건너뛴 종목에 skip(앞선 Top Pick 티커)
function pickTop(ranked, diversify, n) {
  const out = [], used = new Map();
  for (const x of ranked) {
    if (out.length >= (n || 3)) break;
    if (diversify && x.sec && used.has(x.sec)) { x.skip = used.get(x.sec); continue; }
    if (x.sec) used.set(x.sec, x.ticker);
    out.push(x);
  }
  out.forEach((x, i) => { x.pick = i + 1; });
  return out.map((x) => x.ticker);
}

// S = { D: STOCK_DATA, TA: STOCK_TA, EV: events items(티커별), CA: CANDIDATES, DC: DISCOVERY_CANDIDATES, FU: fundamentals items(티커별, 선택),
//       RV: revisions items(티커별, 선택 — 한국 목표가 3개월 변화) }
// → { korea: {ranked, excluded, unscored, top, diversify}, us: {…} } — ranked 는 점수 내림차순(1위가 첫째), top = 오늘의 Top Pick 티커 3개(③ 적용)
function rankPicks(S) {
  const ta = (S.TA && S.TA.ta) || {}, EV = S.EV || {}, defState = {}, dupSlot = new Set();
  // 결격 상태는 (국가|주제|티커)로 본다 — '중복' 자리는 회사 결격이 아니라 편성 구성 문제라 그 자리만 건너뛴다(check-defects 의 dup 판정)
  Object.keys((S.CA && S.CA.groups) || {}).forEach((g) => (S.CA.groups[g].defects || []).forEach((d) => {
    if (d.dup) dupSlot.add(g + "|" + d.ticker);
    else defState[g + "|" + d.ticker] = d.state;
  }));
  const out = {};
  ["korea", "us"].forEach((c) => {
    // 종목마다 대표 자리 하나 — 중복 자리를 빼고 티어가 높은 쪽, 같으면 주제 순서(관심 자리는 티어가 없어 정식 자리가 있으면 그쪽)
    const rep = new Map();
    ((S.D && S.D[c]) || []).forEach((s) => {
      if (!canPick(s.theme) || dupSlot.has(c + "|" + s.theme + "|" + s.ticker)) return;
      // 정식 밖 자리(주목·관심)는 tier 가 없다 — 예전 편성의 tier 가 카드에 남아 있어도 보지 않는다(2026-11-14: 관심 AAPL 에 남은 tier 1 이
      //   우량 T2 자리를 밀어내 결격 상태를 관심 자리로 찾고 있었다 — 정식 자리의 실질 결격이 Top Pick 제외로 이어지지 않는 길)
      const tierOf = (x) => (FORMAL.has(x.theme) ? x.tier || 9 : 9);
      const cur = rep.get(s.ticker);
      if (!cur || tierOf(s) < tierOf(cur) || (tierOf(s) === tierOf(cur) && THEMES.indexOf(s.theme) < THEMES.indexOf(cur.theme))) rep.set(s.ticker, s);
    });
    const healthy = [], excluded = [], unscored = [], health = {};
    rep.forEach((s) => {
      const x = ta[s.ticker] || {}, sig = ["short", "mid", "long"].map((k) => (x[k] && x[k].signal) || "–");
      const f = finOf(S.DC, c, s.theme, s.ticker, (S.FU || {})[s.ticker]);
      const rv = (S.RV || {})[s.ticker];
      const ds = defState[c + "|" + s.theme + "|" + s.ticker];
      const why = unhealthy(c, s, sig, EV[s.ticker], ds, f, rv);
      health[s.ticker] = { why: why || undefined, checks: healthChecks(c, sig, EV[s.ticker], ds, f, rv, FORMAL.has(s.theme)) };
      const base = { ticker: s.ticker, name: s.name, theme: s.theme, tier: FORMAL.has(s.theme) ? s.tier : undefined, tag: s.watchTag || undefined };   // 정식 밖 자리엔 tier 가 없다(카드에 남은 값은 싣지 않는다)
      if (why) excluded.push(Object.assign(base, { why }));
      else if (!f || !SCORE[c].some((k) => ok(f[k]))) unscored.push(Object.assign(base, { why: "점수 자료 없음(" + SCORE[c].map((k) => SCORE_KO[k]).join("·") + ")" }));
      else healthy.push({ s, f, base, sec: sectorOf(c, (S.FU || {})[s.ticker]), tp3: rv && ok(rv.chg) ? rv.chg : undefined });
    });
    // 재료마다 같은 나라 관문 통과 종목 안의 백분위 — 주식 수는 줄수록 좋다(1 − 백분위)
    const pr = {};
    SCORE[c].forEach((k) => { pr[k] = pctRank(healthy.map((h) => h.f[k])); });
    const ranked = healthy.map((h) => {
      const p = {};
      SCORE[c].forEach((k) => { const v = pr[k](h.f[k]); p[k] = v == null ? null : r3(k === "iss" ? 1 - v : v); });
      return Object.assign(h.base, { score: r3(mean(SCORE[c].map((k) => p[k]))), iss: r1(h.f.iss), shy: r1(h.f.shy), roic: r1(h.f.roic), dy: r1(h.f.dy),
        pct: p, src: h.f.src, issCa: h.f.issCa || undefined, sec: h.sec || undefined, secKo: SEC.sectorKo(c, h.sec) || undefined, tp3: h.tp3 });
    });
    ranked.sort((p, q) => (q.score - p.score) || ((p.tier || 9) - (q.tier || 9)) || (THEMES.indexOf(p.theme) - THEMES.indexOf(q.theme)) || String(p.name).localeCompare(String(q.name), "ko"));
    ranked.forEach((x, i) => { x.rank = i + 1; });
    const top = pickTop(ranked, DIVERSIFY[c]);
    // 보유만 있는 종목 — 순위 후보는 아니지만 건강 점검은 같은 조건으로 보인다(이미 산 종목의 건강이 더 궁금하다). hold: true
    ((S.D && S.D[c]) || []).forEach((s) => {
      if (canPick(s.theme) || health[s.ticker]) return;
      const x = ta[s.ticker] || {}, sig = ["short", "mid", "long"].map((k) => (x[k] && x[k].signal) || "–");
      const f = finOf(S.DC, c, s.theme, s.ticker, (S.FU || {})[s.ticker]), rv = (S.RV || {})[s.ticker];
      health[s.ticker] = { why: unhealthy(c, s, sig, EV[s.ticker], undefined, f, rv) || undefined, checks: healthChecks(c, sig, EV[s.ticker], undefined, f, rv, false), hold: true };
    });
    out[c] = { ranked, excluded, unscored, top, diversify: !!DIVERSIFY[c], health };
  });
  return out;
}

// 화면·프롬프트용 한 줄 — 그 나라 점수 재료만: '주식 수 연 −1.2% · 주주환원 수익률 3.1% · ROIC 24%'(값이 있는 것만)
function partsLine(x, country) {
  const use = SCORE[country] || SCORE.us, a = [];
  if (use.includes("iss")) {
    if (x.issCa) a.push("주식 수 변화 0 으로 봄(분할 등 자본 거래)");
    else if (ok(x.iss)) a.push("주식 수 연 " + (x.iss > 0 ? "+" : "") + x.iss + "%");
  }
  if (use.includes("shy") && ok(x.shy)) a.push("주주환원 수익률 " + x.shy + "%");
  if (use.includes("roic") && ok(x.roic)) a.push("ROIC " + x.roic + "%");
  if (use.includes("dy") && ok(x.dy)) a.push("배당수익률 " + x.dy + "%");
  return a.join(" · ");
}

// 화면·프롬프트용 자리 이름 — '저평가 T1' · '주목(신고가)' · '관심'
const THEME_KO = { core: "우량", growth: "성장", value: "저평가", dividend: "배당", spotlight: "주목", watch: "관심" };
const slotKo = (x) => (x.theme === "spotlight" ? "주목" + (x.tag ? "(" + x.tag + ")" : "") : x.theme === "watch" ? "관심" : (THEME_KO[x.theme] || x.theme) + " T" + x.tier);

// Top Pick 고장 수리(2026-11-14) — 지금 Top Pick 가운데 검증 오류가 되는 종목(편성에서 빠졌거나, 엔진 단·중·장기가 모두 매도 이하 —
//   validate-reco 가 오류로 막는다)이 있으면 그 나라 목록을 지금 순위 1~3위로 다시 세운다. 남는 종목의 이유는 그대로, 새로 들어온 종목은
//   순위 재료(주식 수 감소·ROIC — 회사 수치)로 만든 사실 한 줄(다음 AI·세션 회차가 이유를 다시 쓴다).
//   그 전엔 Top Pick 한 종목이 하루 사이 추세 붕괴가 되면 고칠 주체가 없었다: update-reco 의 전체 검증이 실패해 기술 대응 자동 생성(gen-technote)부터
//   저장이 막히고, Action 의 그날 커밋이 통째로 멈췄다(다음 세션이 손으로 고칠 때까지). gen-technote 가 신호가 바뀐 그 실행에서 함께 고친다.
//   R = rankPicks 결과, D = STOCK_DATA, TA = STOCK_TA. 고칠 것이 없으면 null, 있으면 { tp(새 topPicks), moved[설명] }.
function autoReason(row, c) {
  const iss = row && !row.issCa && row.iss != null && row.iss < 0 ? "주식 수가 연 " + Math.abs(row.iss) + "% 줄었" : null;
  const roic = row && c === "us" && row.roic != null ? "ROIC 는 " + row.roic + "%다" : null;
  return "건강 조건을 모두 통과했고 " + (iss && roic ? iss + "으며 " + roic : iss ? iss + "다" : roic || "상승 가능성 점수가 후보 가운데 " + (row ? row.rank : "상위") + "위다") + ".";
}
function repairTopPicks(tp, R, D, TA) {
  if (!tp || !R || !D) return null;
  const out = Object.assign({}, tp), moved = [], ta = (TA && TA.ta) || {};
  const broken = (t) => { const x = ta[t]; return !!x && ["short", "mid", "long"].every((k) => x[k] && /매도/.test(x[k].signal || "")); };
  ["korea", "us"].forEach((c) => {
    const cur = Array.isArray(tp[c]) ? tp[c] : [], want = (R[c] && R[c].top) || [];
    if (want.length !== 3 || !cur.length) return;
    const pickable = new Set((D[c] || []).filter((x) => canPick(x.theme)).map((x) => x.ticker));
    // 고를 수 없는 Top Pick = 편성 밖·추세 붕괴(검증 오류), 그리고 지금 건강 관문에 걸렸거나 점수 자료가 없어 순위에 없는 종목
    //   (수급 과열·실질 결격·목표가 급락 … — 순위 1~3위에 다시 들 수 없으므로 누가 썼든 그 나라 목록을 순위대로 다시 세운다)
    const out0 = new Set((R[c].excluded || []).concat(R[c].unscored || []).map((x) => x.ticker));
    const bad = cur.filter((x) => !x || !pickable.has(x.ticker) || broken(x.ticker) || out0.has(x.ticker));
    if (!bad.length) return;
    out[c] = want.map((t, i) => {
      const keep = cur.find((x) => x && x.ticker === t);
      if (keep) return Object.assign({}, keep, { rank: i + 1 });
      const row = (R[c].ranked || []).find((x) => x.ticker === t);
      const card = (D[c] || []).find((x) => x.ticker === t && row && x.theme === row.theme) || (D[c] || []).find((x) => x.ticker === t) || {};
      return { rank: i + 1, ticker: t, market: card.market, name: card.name, reason: autoReason(row, c) };
    });
    moved.push(c + " " + bad.map((x) => (x && x.ticker) || "?").join(",") + " 제외(편성 밖·건강 관문·추세 붕괴) → " + want.join(","));
  });
  return moved.length ? { tp: out, moved } : null;
}

module.exports = { CUTS, SCORE, NOTE, EVIDENCE, DIVERSIFY, REV, rankPicks, finOf, partsLine, pickTop, canPick, slotKo, unhealthy, healthChecks, repairTopPicks };
