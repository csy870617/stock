#!/usr/bin/env node
// 주제 기준 연구 — 미국 월별 패널(2026-10-17). 사전 등록: README.md · 팩터 정의: scripts/lib-factors.js(스크린과 공유)
// 사용: node scripts/research/theme/panel-us.js <캐시 폴더>  → <캐시>/us/panel.json (열 지향: {fields, rows:[…]})
// 시점: FY 재무는 회계연도 말 + 150일(≈ 5개월) 뒤 달부터 쓴다(10-K 제출 기한 60~90일 + 여유 — 룩어헤드 방지).
// 시총(t) = 분할 수정 종가(t) × 그 회계연도 희석 가중 주식 수 × (회계연도 말 이후 분할 비율) — 야후 종가는 현재까지의 분할로 수정돼 있다.
"use strict";
const fs = require("fs");
const path = require("path");
const L = require("./lib");
const LF = require("../../lib-factors");

const DIR = path.resolve(process.argv[2] || "theme-cache");
const US = path.join(DIR, "us");
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const YEARS = []; for (let y = 2009; y <= 2025; y++) YEARS.push(y);

const F = {};
for (const f of fs.readdirSync(path.join(US, "frames"))) {
  const [c, p] = f.replace(/\.json$/, "").split("__");
  F[c + "|" + p] = L.readJson(path.join(US, "frames", f), {});
}
const fv = (c, p, cik) => { const m = F[c + "|" + p]; const x = m && m[cik]; return x ? x[0] : null; };
const fe = (c, p, cik) => { const m = F[c + "|" + p]; const x = m && m[cik]; return x ? x[1] : null; };
log("frames " + Object.keys(F).length);

// 종목: CIK 당 하나(가장 긴 가격 이력, 같으면 최근 거래량)
const uni = L.readJson(path.join(US, "universe.json"), []);
const cikMap = L.readJson(path.join(US, "cik.json"), {});
const vol12 = (px) => px.v.slice(-12).reduce((s, x) => s + x, 0);
const byCik = {};
for (const u of uni) {
  const c = cikMap[u.t]; if (!c) continue;
  const f = path.join(US, "px", u.t + ".json");
  if (!fs.existsSync(f)) continue;
  const px = L.readJson(f, null);
  if (!px || px.none || !px.d || px.d.length < 24) continue;
  const b = byCik[c];
  if (!b || px.d.length > b.px.d.length || (px.d.length === b.px.d.length && vol12(px) > vol12(b.px))) byCik[c] = { u, px };
}
const FIN = /^Finance$|Real Estate/i, FIN_IND = /(REIT|Real Estate|Banks|Savings Institutions|Insurance|Finance|Investment|Trusts)/i;
const stocks = Object.keys(byCik).map((c) => {
  const { u, px } = byCik[c];
  const fu = LF.usFundamentals(Number(c), YEARS, fv, fe);
  return { cik: c, t: u.t, fin: FIN.test(u.sector || "") || FIN_IND.test(u.industry || ""), fu, px, idx: new Map(px.d.map((d, i) => [d, i])) };
}).filter((s) => Object.keys(s.fu).length >= 2);
log("종목 " + stocks.length);

const addM = (ym, k) => { let [y, m] = ym.split("-").map(Number); m += k; while (m > 12) { m -= 12; y++; } while (m < 1) { m += 12; y--; } return y + "-" + String(m).padStart(2, "0"); };
const months = []; for (let k = "2011-06"; k <= "2026-09"; k = addM(k, 1)) months.push(k);
const availYM = (end) => { if (!end) return null; const d = new Date(end + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + 150); return d.toISOString().slice(0, 7); };
const sd = (a) => { const x = a.filter((v) => v != null && isFinite(v)); if (x.length < 3) return null; const m = x.reduce((p, v) => p + v, 0) / x.length; return Math.sqrt(x.reduce((p, v) => p + (v - m) ** 2, 0) / (x.length - 1)); };
for (const s of stocks) {
  s.ys = Object.keys(s.fu).map(Number).sort((a, b) => a - b);
  s.avail = {}; s.ys.forEach((y) => { s.avail[y] = availYM(s.fu[y].end) || (y + 1) + "-06"; });
  s.divM = {}; s.px.divs.forEach(([d, a]) => { const k = d.slice(0, 7); s.divM[k] = (s.divM[k] || 0) + a; });
}
const splitAfter = (s, date) => s.px.splits.filter((x) => x[0] > date).reduce((p, x) => p * x[1], 1);
const divSum = (s, fromYM, toYM) => { let t = 0; for (let k = addM(fromYM, 1); k <= toYM; k = addM(k, 1)) t += s.divM[k] || 0; return t; };   // (from, to]

const FAC = ["EP", "BP", "SP", "FCFP", "EBITEV", "DY", "SHY", "ROE", "ROA", "GPA", "OPA", "CFOA", "ROIC", "ACC", "LEV", "F", "SROA",
  "SG1", "SG3", "OPG", "DROA", "DGM", "AG", "ISS", "PAYOUT", "DGR", "DSTREAK", "COV"];
const FIELDS = ["t", "ym", "mcap", "rank", "fin", "opPos", "niPos"].concat(FAC, ["MOM", "VOL", "r1", "r3", "r6", "r12", "dcut"]);
const rows = [];
for (const ym of months) {
  const cs = [];
  for (const s of stocks) {
    const i = s.idx.get(ym); if (i == null) continue;
    let y = null; for (const yy of s.ys) if (s.avail[yy] <= ym) y = yy;
    if (y == null) continue;
    const f = s.fu[y];
    if (!f || f.sh == null || !(f.sh > 0)) continue;
    const mcap = s.px.c[i] * f.sh * splitAfter(s, f.end || (y + "-12-31"));
    if (!(mcap > 0)) continue;
    cs.push({ s, i, y, mcap });
  }
  cs.sort((a, b) => b.mcap - a.mcap);
  const top = cs.slice(0, 1000);
  top.forEach((x, k) => {
    const { s, i, y, mcap } = x, a = s.px.a, c = s.px.c[i];
    const dTTM = divSum(s, addM(ym, -12), ym), dNext = divSum(s, ym, addM(ym, 12)), d36 = divSum(s, addM(ym, -48), addM(ym, -36));
    let streak = 0;
    for (let yy = Number(ym.slice(0, 4)) - 1; yy > 2010; yy--) {
      const d0 = divSum(s, (yy - 1) + "-12", yy + "-12"), dp = divSum(s, (yy - 2) + "-12", (yy - 1) + "-12");
      if (d0 > 0 && d0 >= dp * 0.99) streak++; else break;
    }
    const fx = LF.usFactorsAt(s.fu, y, mcap, { dy: c > 0 ? dTTM / c : null, dgr: dTTM > 0 && d36 > 0 ? Math.pow(dTTM / d36, 1 / 3) - 1 : null, streak: dTTM > 0 ? streak : null });
    if (!fx) return;
    const fwd = (h) => { const j = s.idx.get(addM(ym, h)); return j != null ? a[j] / a[i] - 1 : null; };
    const mret = []; for (let k2 = 1; k2 <= 12; k2++) { const j0 = s.idx.get(addM(ym, -k2)), j1 = s.idx.get(addM(ym, -k2 + 1)); if (j0 != null && j1 != null) mret.push(a[j1] / a[j0] - 1); }
    const j12 = s.idx.get(addM(ym, -12)), j1m = s.idx.get(addM(ym, -1));
    const hasNext = s.idx.get(addM(ym, 12)) != null;
    rows.push([s.t, ym, Math.round(mcap / 1e6), k + 1, s.fin ? 1 : 0, fx.opPos, fx.niPos].concat(FAC.map((k3) => fx[k3]),
      [j12 != null && j1m != null ? a[j1m] / a[j12] - 1 : null, sd(mret), fwd(1), fwd(3), fwd(6), fwd(12), dTTM > 0 && hasNext ? (dNext < dTTM * 0.9 ? 1 : 0) : null]));
  });
  if (ym.endsWith("-12")) log(ym + " 종목 " + top.length);
}
const r6 = (v) => (typeof v === "number" && isFinite(v) ? +v.toPrecision(5) : v);
L.writeJson(path.join(US, "panel.json"), { fields: FIELDS, rows: rows.map((r) => r.map(r6)) });
log("패널 " + rows.length + "행 → " + path.join(US, "panel.json"));
