#!/usr/bin/env node
// 금리 예측 연구 — 월별 패널 만들기(미국 FRED CSV · 한국 ECOS + FRED). 결과: <out>/panel.json
//
// 미국(FRED, 키 없는 CSV): FEDFUNDS(실효 연방기금금리 월평균 — 예측 대상), DTB3·DTB6·DGS1(국채 3·6·12개월 — 시장 기대),
//   PCEPILFE(근원 PCE → 전년비), UNRATE(실업률), NROU(CBO 자연실업률, 분기 → 월 보간)
// 한국(ECOS StatisticSearch — 키는 환경변수 ECOS_KEY, 없으면 'sample' 키로 10행씩 나눠 받는다):
//   722Y001/0101000 기준금리(예측 대상), 721Y001/2010000 CD 91일·1026000 KORIBOR 6개월·5030000 국고 1년(시장 기대),
//   901Y010/QB 농산물·석유류 제외 근원물가(→ 전년비) · 실업률은 FRED LRHUTTTTKRM156S(OECD, 계절조정)
//
// 사용법: node scripts/research/rates/fetch.js <out_dir>
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const OUT = process.argv[2] || path.join(__dirname, "out");
fs.mkdirSync(OUT, { recursive: true });
const KEY = process.env.ECOS_KEY || "sample";
const curl = (url) => execFileSync("curl", ["-s", "--max-time", "60", url], { maxBuffer: 64 * 1024 * 1024 }).toString();

function fred(id) {
  const t = curl("https://fred.stlouisfed.org/graph/fredgraph.csv?id=" + id).trim().split("\n").slice(1);
  const m = {};
  t.forEach((l) => { const [d, v] = l.split(","); const x = parseFloat(v); if (d && isFinite(x)) m[d] = x; });
  return m;
}
// 일별 → 월말 값(그달 마지막 관측)
function monthEnd(daily) {
  const m = {};
  Object.keys(daily).sort().forEach((d) => { m[d.slice(0, 7)] = daily[d]; });
  return m;
}
const monthly = (m) => { const o = {}; Object.keys(m).forEach((d) => { o[d.slice(0, 7)] = m[d]; }); return o; };
function ecos(stat, item, from, to) {
  const o = {};
  const step = KEY === "sample" ? 10 : 1000;
  for (let s = 1; s < 5000; s += step) {
    const j = JSON.parse(curl("https://ecos.bok.or.kr/api/StatisticSearch/" + KEY + "/json/kr/" + s + "/" + (s + step - 1) + "/" + stat + "/M/" + from + "/" + to + "/" + item));
    const r = (j.StatisticSearch && j.StatisticSearch.row) || [];
    r.forEach((x) => { const v = parseFloat(x.DATA_VALUE); if (isFinite(v)) o[x.TIME.slice(0, 4) + "-" + x.TIME.slice(4, 6)] = v; });
    const total = j.StatisticSearch ? j.StatisticSearch.list_total_count : 0;
    if (!r.length || s + step - 1 >= total) break;
  }
  return o;
}
const yoy = (idx) => { const o = {}; Object.keys(idx).forEach((k) => { const [y, mm] = k.split("-"); const p = idx[(+y - 1) + "-" + mm]; if (p) o[k] = (idx[k] / p - 1) * 100; }); return o; };
// 분기 시계열(YYYY-01/04/07/10) → 월 선형 보간
function interpQ(q) {
  const keys = Object.keys(q).sort(), o = {};
  for (let i = 0; i < keys.length - 1; i++) {
    const a = q[keys[i]], b = q[keys[i + 1]], [y, m] = keys[i].split("-").map(Number);
    for (let k = 0; k < 3; k++) { const d = new Date(Date.UTC(y, m - 1 + k, 1)).toISOString().slice(0, 7); o[d] = a + (b - a) * k / 3; }
  }
  return o;
}

console.log("미국 FRED …");
const US = {
  policy: monthly(fred("FEDFUNDS")),
  m3: monthEnd(fred("DTB3")), m6: monthEnd(fred("DTB6")), m12: monthEnd(fred("DGS1")),
  infl: yoy(monthly(fred("PCEPILFE"))), unemp: monthly(fred("UNRATE")), ustar: interpQ(monthly(fred("NROU"))),
};
console.log("한국 ECOS(" + (KEY === "sample" ? "sample 키 — 10행씩" : "키") + ") …");
const KR = {
  policy: ecos("722Y001", "0101000", "199901", "203012"),
  m3: ecos("721Y001", "2010000", "199901", "203012"),
  m6: ecos("721Y001", "1026000", "199901", "203012"),
  m12: ecos("721Y001", "5030000", "199901", "203012"),
  infl: yoy(ecos("901Y010", "QB", "199801", "203012")),
  unemp: monthly(fred("LRHUTTTTKRM156S")),
};
// 한국 자연실업률 대용: 직전 120개월 평균(그 시점까지의 자료만)
KR.ustar = (() => { const ks = Object.keys(KR.unemp).sort(), o = {}; ks.forEach((k, i) => { const w = ks.slice(Math.max(0, i - 119), i + 1).map((x) => KR.unemp[x]); if (w.length >= 36) o[k] = w.reduce((a, b) => a + b, 0) / w.length; }); return o; })();

const cover = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => { const ks = Object.keys(v).sort(); return [k, ks.length ? ks[0] + "~" + ks[ks.length - 1] + " (" + ks.length + ")" : "없음"]; }));
fs.writeFileSync(path.join(OUT, "panel.json"), JSON.stringify({ builtAt: new Date().toISOString(), us: US, korea: KR }));
console.log("미국", cover(US));
console.log("한국", cover(KR));
