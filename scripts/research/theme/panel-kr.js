#!/usr/bin/env node
// 주제 기준 연구 — 한국 월별 패널(2026-10-17). 사전 등록: README.md
// 사용: node scripts/research/theme/panel-kr.js <캐시 폴더>  → <캐시>/kr/panel.json
// 시점: FY(y) 재무(12월 결산 기준)는 y+1년 4월 말부터 쓴다(사업보고서 제출 기한 3월 말 + 여유).
// 금액 단위: 기업현황 억 원. 시총(t) = 분할 수정 종가(t) × FY 발행주식수(보통주) × (FY 말 이후 분할 비율).
// 배당·자사주 소각 같은 주당 값 왜곡을 피하려고 배당은 총액(DPS × 주식 수)으로 계산한다.
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("./lib");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const KR = path.join(DIR, "kr");
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const FIN_WICS = /(은행|증권|보험|다각화된금융|기타금융|부동산|창업투자|리츠)/;
const FIN_NAME = /(금융|은행|보험|증권|화재|생명|카드|캐피탈|리츠|REIT|스팩|SPAC)/i;

const uni = L.readJson(path.join(KR, "universe.json"), []);
const stocks = [];
for (const u of uni) {
  const w = L.readJson(path.join(KR, "wise", u.t + ".json"), null);
  const px = L.readJson(path.join(KR, "px", u.t + ".json"), null);
  if (!w || w.none || !px || px.none || !px.d || px.d.length < 24) continue;
  const A = w.cols.map((c, i) => (c.est ? -1 : i)).filter((i) => i >= 0);
  const g = (names) => { for (const n of names) if (w.rows[n]) return w.rows[n]; return w.cols.map(() => null); };
  const rev = g(["매출액", "영업수익", "순영업수익"]), op = g(["영업이익", "영업이익(발표기준)"]), np = g(["당기순이익(지배)", "당기순이익"]);
  const assets = g(["자산총계"]), liab = g(["부채총계"]), eq = g(["자본총계(지배)", "자본총계"]), ibd = g(["이자발생부채"]);
  const ocf = g(["영업활동현금흐름"]), capex = g(["CAPEX"]), fcf = g(["FCF"]), dps = g(["현금DPS(원)"]), payout = g(["현금배당성향(%)"]), sh = g(["발행주식수(보통주)"]);
  const fu = {};
  A.forEach((i) => {
    const y = Number(w.cols[i].title.slice(0, 4)), mo = Number(w.cols[i].title.slice(5, 7));
    if (mo !== 12) return;   // 12월 결산만(결산월이 다르면 시점 규칙이 달라 제외)
    fu[y] = { rev: rev[i], op: op[i], np: np[i], assets: assets[i], liab: liab[i], eq: eq[i], ibd: ibd[i], ocf: ocf[i], capex: capex[i], fcf: fcf[i],
      dps: dps[i], payout: payout[i], sh: sh[i], divTot: dps[i] != null && sh[i] ? dps[i] * sh[i] / 1e8 : null };
  });
  if (Object.keys(fu).length < 2) continue;
  stocks.push({ t: u.t, name: u.name, market: u.market, wics: w.wics, fin: FIN_WICS.test(w.wics || "") || FIN_NAME.test(u.name || ""), fu, px,
    idx: new Map(px.d.map((d, i) => [d, i])) });
}
log("종목 " + stocks.length);

const addM = (ym, k) => { let [y, m] = ym.split("-").map(Number); m += k; while (m > 12) { m -= 12; y++; } while (m < 1) { m += 12; y--; } return y + "-" + String(m).padStart(2, "0"); };
const months = []; for (let k = "2022-04"; k <= "2026-09"; k = addM(k, 1)) months.push(k);
const ratio = (a, b) => (a != null && b != null && b > 0 ? a / b : null);
const gr = (a, b) => (a != null && b != null && b > 0 ? a / b - 1 : null);
const sd = (a) => { const x = a.filter((v) => v != null && isFinite(v)); if (x.length < 3) return null; const m = x.reduce((p, v) => p + v, 0) / x.length; return Math.sqrt(x.reduce((p, v) => p + (v - m) ** 2, 0) / (x.length - 1)); };
for (const s of stocks) {
  s.ys = Object.keys(s.fu).map(Number).sort((a, b) => a - b);
  s.splitAfter = (date) => s.px.splits.filter((x) => x[0] > date).reduce((p, x) => p * x[1], 1);
}

const FIELDS = ["t", "ym", "mcap", "rank", "fin", "opPos", "niPos",
  "EP", "BP", "SP", "FCFP", "EBITEV", "DY",
  "ROE", "ROA", "OPA", "CFOA", "ROIC", "ACC", "LEV", "F", "SROA",
  "SG1", "SG3", "OPG", "DROA", "DGM", "AG", "ISS",
  "PAYOUT", "DGR", "DSTREAK", "COV", "MOM", "VOL",
  "r1", "r3", "r6", "r12", "dcut"];
const rows = [];
for (const ym of months) {
  const cs = [];
  for (const s of stocks) {
    const i = s.idx.get(ym); if (i == null) continue;
    let y = null; for (const yy of s.ys) if ((yy + 1) + "-04" <= ym) y = yy;
    if (y == null) continue;
    const f = s.fu[y];
    if (!f || !(f.sh > 0)) continue;
    const mcap = s.px.c[i] * f.sh * s.splitAfter(y + "-12-31") / 1e8;   // 억 원
    if (!(mcap > 0)) continue;
    cs.push({ s, i, y, f, mcap });
  }
  cs.sort((a, b) => b.mcap - a.mcap);
  cs.slice(0, 600).forEach((x, k) => {
    const { s, i, y, f, mcap } = x, f1 = s.fu[y - 1], f3 = s.fu[y - 3], fN = s.fu[y + 1], a = s.px.a;
    const fwd = (h) => { const j = s.idx.get(addM(ym, h)); return j != null ? a[j] / a[i] - 1 : null; };
    const avgA = f1 && f1.assets > 0 && f.assets > 0 ? (f.assets + f1.assets) / 2 : f.assets;
    const roa = ratio(f.np, avgA), roa1 = f1 ? ratio(f1.np, f1.assets) : null;
    const lev = ratio(f.liab, f.assets), lev1 = f1 ? ratio(f1.liab, f1.assets) : null;
    const opm = ratio(f.op, f.rev), opm1 = f1 ? ratio(f1.op, f1.rev) : null;
    const ato = ratio(f.rev, f.assets), ato1 = f1 ? ratio(f1.rev, f1.assets) : null;
    const shG = f1 && f1.sh > 0 && f.sh > 0 ? f.sh / f1.sh : null;
    const iss = shG != null && shG < 1.8 && shG > 0.55 ? shG - 1 : null;   // 액면분할·무상증자 급변은 희석으로 보지 않는다
    // F-score(한국판 8신호 — 유동비율 없음, 매출총이익률 대신 영업이익률) → 9점 만점 환산
    const sig = [roa != null ? roa > 0 : null, f.ocf != null ? f.ocf > 0 : null, roa != null && roa1 != null ? roa > roa1 : null,
      f.ocf != null && f.np != null ? f.ocf > f.np : null, lev != null && lev1 != null ? lev <= lev1 : null, iss != null ? iss <= 0.005 : null,
      opm != null && opm1 != null ? opm > opm1 : null, ato != null && ato1 != null ? ato > ato1 : null];
    const nOk = sig.filter((v) => v != null).length;
    const F9 = nOk >= 6 ? Math.round(sig.filter((v) => v === true).length * 9 / nOk) : null;
    let streak = 0; for (let yy = y; s.fu[yy] && s.fu[yy - 1]; yy--) { const d0 = s.fu[yy].divTot, dp = s.fu[yy - 1].divTot; if (d0 > 0 && dp != null && d0 >= dp * 0.99) streak++; else break; }
    const mret = []; for (let k2 = 1; k2 <= 12; k2++) { const j0 = s.idx.get(addM(ym, -k2)), j1 = s.idx.get(addM(ym, -k2 + 1)); if (j0 != null && j1 != null) mret.push(a[j1] / a[j0] - 1); }
    const j12 = s.idx.get(addM(ym, -12)), j1m = s.idx.get(addM(ym, -1));
    const roas = [0, 1, 2, 3, 4].map((kk) => { const g2 = s.fu[y - kk]; return g2 ? ratio(g2.np, g2.assets) : null; });
    // 배당 삭감: 다음 회계연도 배당 총액이 이번보다 10% 넘게 적음(다음 해 재무가 공개된 이후 시점에서만 판정 가능 — 결과 변수)
    const dcut = f.divTot > 0 && fN && fN.divTot != null ? (fN.divTot < f.divTot * 0.9 ? 1 : 0) : null;
    rows.push([s.t, ym, Math.round(mcap), k + 1, s.fin ? 1 : 0, f.op != null ? (f.op > 0 ? 1 : 0) : null, f.np != null ? (f.np > 0 ? 1 : 0) : null,
      ratio(f.np, mcap), ratio(f.eq, mcap), ratio(f.rev, mcap), f.fcf != null ? f.fcf / mcap : null, f.op != null ? f.op / (mcap + (f.ibd || 0)) : null,
      f.divTot != null ? f.divTot / mcap : null,
      f.eq > 0 && f.np != null ? f.np / f.eq : null, roa, ratio(f.op, f.assets), ratio(f.ocf, f.assets),
      f.op != null && (f.eq || 0) + (f.ibd || 0) > 0 ? f.op * 0.78 / ((f.eq || 0) + (f.ibd || 0)) : null,
      f.np != null && f.ocf != null && avgA > 0 ? (f.np - f.ocf) / avgA : null, lev, F9, sd(roas),
      f1 ? gr(f.rev, f1.rev) : null, f3 && f3.rev > 0 && f.rev > 0 ? Math.pow(f.rev / f3.rev, 1 / 3) - 1 : null, f1 ? gr(f.op, f1.op) : null,
      roa != null && roa1 != null ? roa - roa1 : null, opm != null && opm1 != null ? opm - opm1 : null, f1 ? gr(f.assets, f1.assets) : null, iss,
      f.payout != null ? f.payout / 100 : null, f1 && f.divTot > 0 && f1.divTot > 0 ? f.divTot / f1.divTot - 1 : null, f.divTot > 0 ? streak : null,
      f.fcf != null && f.divTot > 0 ? f.fcf / f.divTot : null,
      j12 != null && j1m != null ? a[j1m] / a[j12] - 1 : null, sd(mret),
      fwd(1), fwd(3), fwd(6), fwd(12), dcut]);
  });
}
const r6 = (v) => (typeof v === "number" && isFinite(v) ? +v.toPrecision(5) : v);
L.writeJson(path.join(KR, "panel.json"), { fields: FIELDS, rows: rows.map((r) => r.map(r6)) });
log("패널 " + rows.length + "행 → " + path.join(KR, "panel.json"));
