#!/usr/bin/env node
// 주제 기준 연구 — 한국 월별 패널(2026-10-17). 사전 등록: README.md · 팩터 정의: scripts/lib-factors.js(스크린과 공유)
// 사용: node scripts/research/theme/panel-kr.js <캐시 폴더>  → <캐시>/kr/panel.json
// 시점: FY(y) 재무(12월 결산)는 y+1년 4월 말부터 쓴다(사업보고서 제출 기한 3월 말 + 여유).
// 금액 단위: 기업현황 억 원. 시총(t) = 분할 수정 종가(t) × FY 발행주식수(보통주) × (FY 말 이후 분할 비율).
"use strict";
const path = require("path");
const L = require("./lib");
const LF = require("../../lib-factors");

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
  const fu = LF.krFundamentals(w);
  if (Object.keys(fu).length < 2) continue;
  stocks.push({ t: u.t, name: u.name, market: u.market, wics: w.wics, fin: FIN_WICS.test(w.wics || "") || FIN_NAME.test(u.name || ""), fu, px,
    idx: new Map(px.d.map((d, i) => [d, i])), ys: Object.keys(fu).map(Number).sort((a, b) => a - b) });
}
log("종목 " + stocks.length);

const addM = (ym, k) => { let [y, m] = ym.split("-").map(Number); m += k; while (m > 12) { m -= 12; y++; } while (m < 1) { m += 12; y--; } return y + "-" + String(m).padStart(2, "0"); };
const months = []; for (let k = "2022-04"; k <= "2026-09"; k = addM(k, 1)) months.push(k);
const sd = (a) => { const x = a.filter((v) => v != null && isFinite(v)); if (x.length < 3) return null; const m = x.reduce((p, v) => p + v, 0) / x.length; return Math.sqrt(x.reduce((p, v) => p + (v - m) ** 2, 0) / (x.length - 1)); };
const splitAfter = (s, date) => s.px.splits.filter((x) => x[0] > date).reduce((p, x) => p * x[1], 1);

const FAC = ["EP", "BP", "SP", "FCFP", "EBITEV", "DY", "ROE", "ROA", "OPA", "CFOA", "ROIC", "ACC", "LEV", "F", "SROA",
  "SG1", "SG3", "OPG", "DROA", "DGM", "AG", "ISS", "PAYOUT", "DGR", "DSTREAK", "COV"];
const FIELDS = ["t", "ym", "mcap", "rank", "fin", "opPos", "niPos"].concat(FAC, ["MOM", "VOL", "r1", "r3", "r6", "r12", "dcut"]);
const rows = [];
for (const ym of months) {
  const cs = [];
  for (const s of stocks) {
    const i = s.idx.get(ym); if (i == null) continue;
    let y = null; for (const yy of s.ys) if ((yy + 1) + "-04" <= ym) y = yy;
    if (y == null) continue;
    const f = s.fu[y];
    if (!f || !(f.sh > 0)) continue;
    const mcap = s.px.c[i] * f.sh * splitAfter(s, y + "-12-31") / 1e8;   // 억 원
    if (!(mcap > 0)) continue;
    cs.push({ s, i, y, mcap });
  }
  cs.sort((a, b) => b.mcap - a.mcap);
  cs.slice(0, 600).forEach((x, k) => {
    const { s, i, y, mcap } = x, a = s.px.a, f = s.fu[y], fN = s.fu[y + 1];
    const fx = LF.krFactorsAt(s.fu, y, mcap);
    if (!fx) return;
    const fwd = (h) => { const j = s.idx.get(addM(ym, h)); return j != null ? a[j] / a[i] - 1 : null; };
    const mret = []; for (let k2 = 1; k2 <= 12; k2++) { const j0 = s.idx.get(addM(ym, -k2)), j1 = s.idx.get(addM(ym, -k2 + 1)); if (j0 != null && j1 != null) mret.push(a[j1] / a[j0] - 1); }
    const j12 = s.idx.get(addM(ym, -12)), j1m = s.idx.get(addM(ym, -1));
    // 배당 삭감(결과 변수): 다음 회계연도 배당 총액이 이번보다 10% 넘게 적음
    const dcut = f.divTot > 0 && fN && fN.divTot != null ? (fN.divTot < f.divTot * 0.9 ? 1 : 0) : null;
    rows.push([s.t, ym, Math.round(mcap), k + 1, s.fin ? 1 : 0, fx.opPos, fx.niPos].concat(FAC.map((k3) => fx[k3]),
      [j12 != null && j1m != null ? a[j1m] / a[j12] - 1 : null, sd(mret), fwd(1), fwd(3), fwd(6), fwd(12), dcut]));
  });
}
const r6 = (v) => (typeof v === "number" && isFinite(v) ? +v.toPrecision(5) : v);
L.writeJson(path.join(KR, "panel.json"), { fields: FIELDS, rows: rows.map((r) => r.map(r6)) });
log("패널 " + rows.length + "행 → " + path.join(KR, "panel.json"));
