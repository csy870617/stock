#!/usr/bin/env node
"use strict";
//
// 기술 대응(techNote) 자동 생성 — 엔진 숫자로 문장을 직접 만든다 (LLM 토큰 0, refresh-quotes Action·A 회차 backbone 에서 실행)
//
//   node scripts/gen-technote.js           # 전 종목 techNote(v3)를 만들어 update-reco.js 로 적용
//   node scripts/gen-technote.js --dry     # 적용하지 않고 몇 종목 문장만 출력
//   node scripts/gen-technote.js --dry 005930 AAPL   # 지정 종목만 출력
//
// 왜(2026-10-16): 세션이 매일 113종목 문장을 손으로 옮겨 적으면서 ①엔진 내부 부분점수('이평(-0.72)')가 그대로 노출되고
//   ②숫자 전사 오류·하루 늦은 문장이 생겼다. 문장에 들어가는 사실(이평·구름·지지/저항·매물대·수급·예상 범위·실적 일정)은
//   전부 결정론 데이터라 스크립트가 쓰면 항상 같은 날 숫자와 일치한다. 판단(논거·리스크·밸류 해석)은 계속 세션 몫이다.
// 형식 v3: 기간마다 ①상태(이평·일목 → 등급과 어긋나면 상위 추세 설명) ②지지·저항과 다음 1·3개월 80% 범위의 관계
//   ③매물대(1년·5년 거래 분포)·수급(한국 외국인·기관, 미국 공매도). 예측·매매 지시는 쓰지 않는다(§4-2).
//   매물대는 '거래가 몰린 가격'이라는 사실로만 쓴다 — 지지·저항으로 더 잘 버틴다는 근거가 없었다(docs/HISTORY.md 2026-10-16).

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const TECHNOTE_V = 3;
const DRY = process.argv.includes("--dry");
const ONLY = process.argv.slice(2).filter((a) => !a.startsWith("--"));

function load(rel, key) {
  try {
    global.window = {};
    const f = path.join(ROOT, rel);
    delete require.cache[require.resolve(f)];
    require(f);
    return global.window[key] || null;
  } catch (_e) { return null; }
}

const GV = { "적극매도": -2, "매도": -1, "중립": 0, "매수": 1, "적극매수": 2 };
const isKr = (c) => c === "korea";
// 가격 표기 — 한국 원(정수, 천 단위 쉼표), 미국 달러(소수 2자리)
const P = (v, c) => (v == null || !isFinite(v) ? "–" : isKr(c) ? Math.round(v).toLocaleString("ko-KR") + "원" : "$" + v.toFixed(2));
// 거래 구간 경계는 유효숫자 3자리로 — '709,375~1,034,750원' 같은 계산 잔여 자릿수를 줄인다
function sig3(v) { if (!v || !isFinite(v)) return v; const k = Math.pow(10, Math.max(0, Math.floor(Math.log10(Math.abs(v))) - 2)); return Math.round(v / k) * k; }
const Z = (v, c) => (isKr(c) ? P(sig3(v), c) : "$" + (v >= 100 ? Math.round(v) : sig3(v)));
const pct = (v) => (v > 0 ? "+" : v < 0 ? "-" : "") + Math.abs(v).toFixed(1) + "%";
const dist = (lvl, base) => pct((lvl / base - 1) * 100);
const share = (v) => Math.round(v * 100) + "%";
const inR = (v, r) => r && v >= r[0] && v <= r[1];

// 이평 위치 묘사 — 20·60 이평 대비(단위는 봉: 일/주/개월)
function maPhrase(c, f, u) {
  const a = f.ma.m20, b = f.ma.m60;
  if (a == null && b == null) return null;
  if (a != null && b != null) {
    const A = c >= a, B = c >= b;
    if (A && B) return "20" + u + "선·60" + u + "선 위";
    if (!A && !B) return "20" + u + "선·60" + u + "선 아래";
    return A ? "20" + u + "선 위·60" + u + "선 아래" : "20" + u + "선 아래·60" + u + "선 위";
  }
  return (a != null ? "20" + u + "선 " + (c >= a ? "위" : "아래") : "60" + u + "선 " + (c >= b ? "위" : "아래"));
}
// 그 기간 자체 모양(이평 2개 + 구름) → -3..+3
function shape(c, f) {
  let s = 0;
  if (f.ma.m20 != null) s += c >= f.ma.m20 ? 1 : -1;
  if (f.ma.m60 != null) s += c >= f.ma.m60 ? 1 : -1;
  if (f.ichi) s += f.ichi.where === "구름 위" ? 1 : f.ichi.where === "구름 아래" ? -1 : 0;
  return s;
}
// 등급이 그 기간 모양과 어긋날 때만 이유(상위 기간 추세)를 붙인다 — 단기는 일·주·월 5:3:2, 중기는 주·월 7:3 종합이라서다
function gradeWhy(sh, g, upper) {
  const v = GV[g];
  if (v == null || !upper) return "";
  if (sh <= -2 && v >= 0) return " — " + upper + " 상승 추세가 받쳐 종합 " + g;
  if (sh >= 2 && v <= 0) return " — " + upper + " 추세가 약해 종합 " + g;
  return "";
}
// 단기 지지·저항 — 가장 가까운 이평·최근 저/고점(엔진 sr). 등급 방향에 따라 어느 쪽이 '근거가 바뀌는 가격'인지만 덧붙인다.
function srSentence(c, f, g, range, cc) {
  const s = f.sr && f.sr.sup, r = f.sr && f.sr.res;
  const parts = [];
  if (s != null && s < c) parts.push("지지 " + P(s, cc) + "(" + dist(s, c) + ")");
  if (r != null && r > c) parts.push("저항 " + P(r, cc) + "(" + dist(r, c) + ")");
  if (!parts.length) return "";
  const sIn = s != null && s < c ? inR(s, range) : null, rIn = r != null && r > c ? inR(r, range) : null;
  let rg = "";
  if (range) {
    if (sIn != null && rIn != null) rg = sIn && rIn ? "둘 다 1개월 예상 범위 안" : !sIn && !rIn ? "둘 다 1개월 예상 범위 밖" : (sIn ? "지지만" : "저항만") + " 1개월 예상 범위 안";
    else rg = (sIn != null ? "지지" : "저항") + "는 1개월 예상 범위 " + ((sIn != null ? sIn : rIn) ? "안" : "밖");
  }
  const v = GV[g] || 0;
  const cond = v >= 1 && s != null && s < c ? "지지 이탈 시 상승 근거 약화" : v <= -1 && r != null && r > c ? "저항 회복 전까지 약세 흐름" : "";
  return parts.join("·") + (rg ? ", " + rg : "") + (cond ? " — " + cond : "") + ".";
}
// 추세선(20봉 이평) 거리 — 중기 20주선·장기 20개월선. 이 선 아래로 내려가면 그 기간 추세 판단이 바뀐다는 '조건'을 쓴다.
function trendLine(c, f, u, label, range, cc) {
  const m = f.ma && f.ma.m20;
  if (m == null) return "";
  const rg = range ? (inR(m, range) ? ", 3개월 예상 범위 안" : ", 3개월 예상 범위 밖") : "";
  return label + "(20" + u + "선) " + P(m, cc) + "(" + dist(m, c) + ") — 현재가 " + (c >= m ? "아래" : "위") + rg + ".";
}
function ichiTail(f) {
  if (!f.ichi) return "";
  return ", 구름 " + f.ichi.where.replace("구름 ", "") + (f.ichi.where !== "구름 안" && f.ichi.tenkan != null && f.ichi.kijun != null
    ? (Math.abs(f.ichi.tenkan / f.ichi.kijun - 1) < 0.003 ? "" : f.ichi.tenkan > f.ichi.kijun ? "(전환선>기준선)" : "(전환선<기준선)") : "");
}
const evDays = (iso, asOf) => Math.round((Date.parse(iso + "T00:00:00Z") - Date.parse(asOf + "T00:00:00Z")) / 86400000);

function build(s, cc, ta, ev, T) {
  const sh = ta.short, md = ta.mid, lg = ta.long, ol = ta.outlook;
  if (!sh || !md || !lg || !sh.f || !md.f || !lg.f) return null;
  const c = ol && ol.base ? ol.base : null;
  if (!c) return null;
  // ── 단기(일봉) — 상태 · 가장 가까운 지지/저항과 1개월 범위 · 수급/실적 ──
  const fS = sh.f;
  let short = (maPhrase(c, fS, "일") || "이평 산출 불가") + ichiTail(fS) + gradeWhy(shape(c, fS), sh.signal, "주·월봉") + ". " +
    srSentence(c, fS, sh.signal, ol && ol.m1, cc);
  const extra = [];
  const fl = ev && ev.flow;
  if (isKr(cc) && fl) {
    if (fl.hot) extra.push("수급 과열(외국인+기관 20일 순매수 = 거래량의 " + (fl.fi20 * 100).toFixed(1) + "%) — 과거 이 구간은 이후 1~3개월 지수보다 약했다");
    else if (Math.abs(fl.fStreak || 0) >= 5) extra.push("외국인 " + Math.abs(fl.fStreak) + "일 연속 순" + (fl.fStreak > 0 ? "매수" : "매도"));
  }
  const nx = ev && ev.next;
  if (nx && nx.date) { const dd = evDays(nx.date, T); if (dd >= 0 && dd <= 21) extra.push((+nx.date.slice(5, 7)) + "/" + (+nx.date.slice(8, 10)) + (nx.tentative ? "경" : "") + " 실적 발표 전후 변동 확대 가능"); }
  if (extra.length) short += " " + extra.join(" · ") + ".";
  // ── 중기(주봉) — 상태 · 20주선 · 1년 매물대 ──
  const fM = md.f, u = fM.unit || "주";
  let mid = (maPhrase(c, fM, u) || "이평 산출 불가") + ichiTail(fM) + gradeWhy(shape(c, fM), md.signal, "월봉") + ". " +
    trendLine(c, fM, u, "중기 추세선", ol && ol.m3, cc);
  const vp = ta.vp;
  if (vp && vp.above != null) {
    const zs = [];
    if (vp.below) zs.push("아래 " + Z(vp.below.lo, cc) + "~" + Z(vp.below.hi, cc) + "(" + share(vp.below.share) + ")");
    if (vp.upper) zs.push("위 " + Z(vp.upper.lo, cc) + "~" + Z(vp.upper.hi, cc) + "(" + share(vp.upper.share) + ")");
    mid += " 1년 거래의 " + share(vp.above) + "가 현재가 위" + (zs.length ? ", 거래 집중 구간은 " + zs.join("·") : "") + ".";
  }
  // ── 장기(월봉) — 상태 · 20개월선 · 5년 거래 분포 ──
  const fL = lg.f, uL = fL.unit || "개월";
  let long = (maPhrase(c, fL, uL) || "이평 산출 불가") + ichiTail(fL) +
    (fL.cross && fL.cross !== "–" ? ", 50/200일선 " + fL.cross.replace(/\(.*\)/, "") : "") + ". " +
    trendLine(c, fL, uL, "장기 추세선", ol && ol.m3, cc);
  if (fL.vpAbove != null) {
    const a = fL.vpAbove;
    long += a < 0.02 ? " 장기 거래 대부분이 현재가 아래라 보유 물량 거의 전부가 이익 구간이다."
      : " 장기 거래의 " + share(a) + "가 현재가 위" + (a <= 0.15 ? "로 보유 물량 대부분이 이익 구간이다." : a >= 0.6 ? "로 손실 구간 보유 물량이 많다." : "다.");
  }
  return { v: TECHNOTE_V, auto: true, asOf: T, short: short.trim(), mid: mid.trim(), long: long.trim(),
    sigShort: sh.signal, sigMid: md.signal, sigLong: lg.signal };
}

const D = load("data/recommendations.js", "STOCK_DATA");
const TA = load("data/stock-ta.js", "STOCK_TA");
const EV = (load("data/events.js", "STOCK_EVENTS") || {}).items || {};
const T = TA && TA.asOf;
if (!D || !T) { console.error("recommendations.js 또는 stock-ta.js asOf 없음 — update-stock-ta.js 먼저 실행"); process.exit(2); }

const patch = [], miss = [];
["korea", "us"].forEach((cc) => (D[cc] || []).forEach((s) => {
  if (ONLY.length && ONLY.indexOf(s.ticker) < 0) return;
  const ta = TA.ta && TA.ta[s.ticker];
  const n = ta ? build(s, cc, ta, EV[s.ticker], T) : null;
  if (!n) { miss.push(s.ticker); return; }
  patch.push({ country: cc, ticker: s.ticker, theme: s.theme, techNote: n });
}));

if (DRY) {
  patch.slice(0, ONLY.length ? patch.length : 6).forEach((p) => {
    console.log("■ " + p.ticker + " [" + p.techNote.sigShort + "/" + p.techNote.sigMid + "/" + p.techNote.sigLong + "]");
    console.log("  단기: " + p.techNote.short); console.log("  중기: " + p.techNote.mid); console.log("  장기: " + p.techNote.long);
  });
  const L = patch.map((p) => [p.techNote.short.length, p.techNote.mid.length, p.techNote.long.length]);
  console.log("길이(자) 최대 단/중/장: " + [0, 1, 2].map((k) => Math.max.apply(null, L.map((x) => x[k]))).join("/") + " · 생성 " + patch.length + " · 데이터 없음 " + miss.length + (miss.length ? " (" + miss.join(", ") + ")" : ""));
  process.exit(0);
}
if (!patch.length) { console.log("techNote 생성 대상 없음"); process.exit(0); }
const tmp = path.join(require("os").tmpdir(), "gen-technote-" + process.pid + ".json");
fs.writeFileSync(tmp, JSON.stringify({ stocks: patch }));
try {
  execFileSync(process.execPath, [path.join(__dirname, "update-reco.js"), tmp], { stdio: "inherit" });
} finally { fs.unlinkSync(tmp); }
console.log("techNote(v" + TECHNOTE_V + ") 자동 생성: " + patch.length + "건 (T " + T + ")" + (miss.length ? " · 데이터 없음 " + miss.length + ": " + miss.join(", ") : ""));
