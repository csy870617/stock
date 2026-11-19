"use strict";
// 돈의 흐름(유동성) 월말 신호·z·흐름 점수 — 한 곳에서 정의한다.
//   update-liquidity-flow.js(매일 — 오늘 값·흐름 점수·신용 경고)와 build-liquidity-ind.js(앱 지표 상세의 긴 월별 추이)가 같은 식을 쓰게 하려고
//   2026-11-19 생성 스크립트에서 그대로 옮겼다(사용자 '자금 흐름의 하위 내용을 눌렀을 때 해당 주제의 상세 화면'). 식을 바꾸면 두 곳이 함께 바뀐다.
//   정의·검증: scripts/research/liquidity/(PREREG.md·README.md) — 흐름 점수 = 구성 '변화' 신호를 직전 60개월(최소 36개월) 평균·표준편차로
//   z 화해 우호 방향으로 맞춘 평균(3개 이상). 신용 경고 = 수준·3개월 변화가 직전 60개월의 나쁜 3분의 1 안인가.

const ok = (v) => v != null && isFinite(v);
const mean = (a) => { const x = a.filter(ok); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
const sd = (a) => { const x = a.filter(ok); if (x.length < 3) return null; const m = mean(x); return Math.sqrt(x.reduce((s, v) => s + (v - m) ** 2, 0) / (x.length - 1)); };
const rnd = (v, d) => (ok(v) ? Math.round(v * Math.pow(10, d)) / Math.pow(10, d) : null);
const addM = (ym, k) => { const [y, m] = ym.split("-").map(Number); return new Date(Date.UTC(y, m - 1 + k, 1)).toISOString().slice(0, 7); };

// 우호 방향(+1 = 늘면 돈이 들어오는 쪽, −1 = 늘면 빠지는 쪽)
const DIRN = { NL3: 1, CS3: -1, FCI3: -1, USD3: -1, M2R: 1, KDEP3: 1, KMRG3: 1, KCS3: -1, KRW3: -1, KFF3: 1, CS: -1, FCI: -1 };
// 흐름 점수 구성(신용융자 KMRG3 는 검증된 단독 신호로만 보이고 점수엔 넣지 않는다)
const COMP = { us: ["NL3", "CS3", "FCI3", "USD3", "M2R"], korea: ["KDEP3", "KCS3", "KRW3", "KFF3", "NL3"] };
// 신용 경고 신호별 과거 확률(S&P500 다음 3개월 −10% 하락 — 비우호 3분위 vs 나머지, research/liquidity/README.md)
const RISK_P = { CS: [30.0, 10.1], CS3: [26.9, 8.0], FCI: [28.6, 8.0], FCI3: [23.4, 9.9] };

// 월말 원자료(data/liquidity-hist.json 의 months) → 월말 신호·z·흐름 점수
function signals(H) {
  const MS = Object.keys(H.months).sort();
  const h = (ym, k) => { const o = H.months[ym]; return o && ok(o[k]) ? o[k] : null; };
  const pchg = (a, b) => (ok(a) && ok(b) && b !== 0 ? a / b - 1 : null);
  const dif = (a, b) => (ok(a) && ok(b) ? a - b : null);
  const SIG = {};
  Object.keys(DIRN).forEach((k) => { SIG[k] = {}; });
  MS.forEach((ym, i) => {
    const p3 = addM(ym, -3), p12 = addM(ym, -12);
    SIG.NL3[ym] = pchg(h(ym, "NL"), h(p3, "NL"));
    SIG.CS[ym] = h(ym, "CS"); SIG.CS3[ym] = dif(h(ym, "CS"), h(p3, "CS"));
    SIG.FCI[ym] = h(ym, "FCI"); SIG.FCI3[ym] = dif(h(ym, "FCI"), h(p3, "FCI"));
    SIG.USD3[ym] = pchg(h(ym, "DXY"), h(p3, "DXY"));
    const m2y = pchg(h(ym, "M2"), h(p12, "M2")), cpy = pchg(h(ym, "CPI"), h(p12, "CPI"));
    SIG.M2R[ym] = ok(m2y) && ok(cpy) ? m2y - cpy : null;
    SIG.KDEP3[ym] = pchg(h(ym, "DEP"), h(p3, "DEP")); SIG.KMRG3[ym] = pchg(h(ym, "MRG"), h(p3, "MRG"));
    SIG.KCS3[ym] = dif(h(ym, "KCS"), h(p3, "KCS")); SIG.KRW3[ym] = pchg(h(ym, "KRW"), h(p3, "KRW"));
    // 외국인 3개월 합 ÷ 직전 36개월(최소 24) 3개월 합 표준편차
    const s3 = (j) => { const a = [0, 1, 2].map((d) => (j - d >= 0 ? h(MS[j - d], "FF") : null)); return a.every(ok) ? a.reduce((x, y) => x + y, 0) : null; };
    const hist = []; for (let j = i - 36; j < i; j++) if (j >= 2) { const v = s3(j); if (ok(v)) hist.push(v); }
    const s = hist.length >= 24 ? sd(hist) : null, cur = s3(i);
    SIG.KFF3[ym] = ok(cur) && ok(s) && s > 0 ? cur / s : null;
  });
  // i 번째 달 앞 60개월(그달 제외)의 신호 — i = MS.length 면 '지금'(마지막 끝난 달까지)의 기준
  const histOf = (k, i) => { const a = []; for (let j = Math.max(0, i - 60); j < i; j++) { const v = SIG[k][MS[j]]; if (ok(v)) a.push(v); } return a; };
  const zOf = (k, v, hist) => { if (!ok(v) || hist.length < 36) return null; const s = sd(hist); return s > 0 ? DIRN[k] * (v - mean(hist)) / s : null; };
  const SCORE = { us: {}, korea: {} };
  MS.forEach((ym, i) => ["us", "korea"].forEach((c) => {
    const z = COMP[c].map((k) => zOf(k, SIG[k][ym], histOf(k, i))).filter(ok);
    SCORE[c][ym] = z.length >= 3 ? mean(z) : null;
  }));
  return { MS, h, pchg, dif, SIG, histOf, zOf, SCORE };
}

module.exports = { ok, mean, sd, rnd, addM, DIRN, COMP, RISK_P, signals };
