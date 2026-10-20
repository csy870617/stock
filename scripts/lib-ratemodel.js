// 정책금리 예측 모델 — 2026-10-20 표본 밖 검증(scripts/research/rates/)을 통과한 방식만 쓴다(LLM 토큰 0).
// update-liquidity-gauge.js 가 불러 data/liquidity-auto.js 의 rateModel 에 쓴다.
//
// 검증(미국 2000~2026·한국 2006~2026, 확장 창 표본 밖, h개월 뒤 정책금리 변화의 RMSE %p):
//   미국  변화 없음 0.47/0.86/1.53 · 시장(국채 3·6·12개월 스프레드 회귀) 0.33/0.52/1.08 · 시장+경제지표 준칙 0.35/0.59/1.10(기각)
//   한국  변화 없음 0.34/0.43/0.94 · 시장(CD·KORIBOR 6개월·국고 1년 회귀) 0.35/0.50/0.98 · 시장+준칙 0.37/0.57/1.09(기각)
// → 미국 예측 = 시장 회귀(M1), 한국 예측 = 변화 없음(시장 금리가 과거에 이를 이기지 못했다). 테일러 준칙 금리는 참고선으로만.
//   준칙 = 0.5 + π + 0.5(π − 2) + 2(u* − u), π 근원물가 전년비(미국 근원 PCE, 한국 농산물·석유류 제외), u* 미국 CBO·한국 직전 10년 평균.
const { execFile } = require("child_process");

const VALID = {
  us: { 3: { rmse: 0.33, base: 0.47 }, 6: { rmse: 0.52, base: 0.86 }, 12: { rmse: 1.08, base: 1.53 } },
  korea: { 3: { rmse: 0.34 }, 6: { rmse: 0.43 }, 12: { rmse: 0.94 } },
  asOf: "2026-10-20",
};
const ECOS_KEY = process.env.ECOS_KEY || "sample";

// FRED 는 브라우저 흉내 User-Agent 에 빈 응답을 준다 — curl 기본값으로 받는다
function curl(url) {
  return new Promise((resolve) => {
    execFile("curl", ["-s", "--max-time", "60", url], { maxBuffer: 64 * 1024 * 1024 }, (err, out) => resolve(err ? null : String(out)));
  });
}
async function fred(id) {
  const t = await curl("https://fred.stlouisfed.org/graph/fredgraph.csv?id=" + id);
  if (!t || t.indexOf("observation_date") !== 0) return null;
  const m = {};
  t.trim().split("\n").slice(1).forEach((l) => { const [d, v] = l.split(","); const x = parseFloat(v); if (d && isFinite(x)) m[d] = x; });
  return m;
}
const lastKey = (m) => Object.keys(m).sort().pop();
const monthEnd = (daily) => { const o = {}; Object.keys(daily).sort().forEach((d) => { o[d.slice(0, 7)] = daily[d]; }); return o; };
const monthly = (m) => { const o = {}; Object.keys(m).forEach((d) => { o[d.slice(0, 7)] = m[d]; }); return o; };
const addM = (ym, k) => { const [y, m] = ym.split("-").map(Number); return new Date(Date.UTC(y, m - 1 + k, 1)).toISOString().slice(0, 7); };
const yoyLast = (idx) => { const k = lastKey(idx); const [y, m] = k.split("-"); const p = idx[(+y - 1) + "-" + m]; return p ? { v: (idx[k] / p - 1) * 100, at: k } : null; };
const taylor = (pi, u, us) => Math.max(0, 0.5 + pi + 0.5 * (pi - 2) + 2 * (us - u));
function ols2(xs, ys) {   // y = a + b x
  const n = xs.length, mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0; xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; });
  const b = sxx ? sxy / sxx : 0; return { a: my - b * mx, b };
}

async function usModel() {
  const [ff, dff, t3, t6, t12, pce, un, nrou] = await Promise.all(["FEDFUNDS", "DFF", "DTB3", "DTB6", "DGS1", "PCEPILFE", "UNRATE", "NROU"].map(fred));
  if (!ff || !dff || !t3 || !t6 || !t12) return null;
  const pol = monthly(ff), inst = { 3: monthEnd(t3), 6: monthEnd(t6), 12: monthEnd(t12) }, daily = { 3: t3, 6: t6, 12: t12 };
  const nowD = lastKey(dff), polNow = dff[nowD];
  const out = { asOf: nowD, policy: +polNow.toFixed(2), forecasts: [] };
  [3, 6, 12].forEach((h) => {
    const xs = [], ys = [];
    Object.keys(pol).sort().forEach((t) => {
      if (t < "1990-01") return;
      const mk = inst[h][t], fut = pol[addM(t, h)];
      if (mk == null || fut == null) return;
      xs.push(mk - pol[t]); ys.push(fut - pol[t]);
    });
    const { a, b } = ols2(xs, ys);
    const mkNow = daily[h][lastKey(daily[h])];
    const chg = a + b * (mkNow - polNow);
    out.forecasts.push({ h, rate: +(polNow + chg).toFixed(2), chg: +chg.toFixed(2), rmse: VALID.us[h].rmse, noChangeRmse: VALID.us[h].base, market: +mkNow.toFixed(2) });
  });
  if (pce && un && nrou) {
    const pi = yoyLast(monthly(pce)), u = un[lastKey(un)], q = monthly(nrou);
    const qk = Object.keys(q).sort().filter((k) => k <= nowD.slice(0, 7)).pop();
    if (pi && qk) out.taylor = { rate: +taylor(pi.v, u, q[qk]).toFixed(2), infl: +pi.v.toFixed(2), inflAt: pi.at, unemp: u, ustar: +q[qk].toFixed(2) };
  }
  return out;
}

async function ecosLast(stat, item, months) {
  const now = new Date(), to = now.toISOString().slice(0, 7).replace("-", "");
  const fromD = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - months, 1)).toISOString().slice(0, 7).replace("-", "");
  const o = {};
  const step = ECOS_KEY === "sample" ? 10 : 100;
  for (let s = 1; s <= months + 2; s += step) {
    const t = await curl("https://ecos.bok.or.kr/api/StatisticSearch/" + ECOS_KEY + "/json/kr/" + s + "/" + (s + step - 1) + "/" + stat + "/M/" + fromD + "/" + to + "/" + item);
    let j; try { j = JSON.parse(t); } catch (_e) { break; }
    const r = (j.StatisticSearch && j.StatisticSearch.row) || [];
    r.forEach((x) => { const v = parseFloat(x.DATA_VALUE); if (isFinite(v)) o[x.TIME.slice(0, 4) + "-" + x.TIME.slice(4, 6)] = v; });
    if (!r.length || r.length < step) break;
  }
  return o;
}

async function krModel(base) {
  if (base == null) return null;
  const out = { policy: base, forecasts: [3, 6, 12].map((h) => ({ h, rate: base, chg: 0, rmse: VALID.korea[h].rmse, method: "변화 없음" })) };
  const [cpi, un] = await Promise.all([ecosLast("901Y010", "QB", 14), fred("LRHUTTTTKRM156S")]);
  const pi = cpi && Object.keys(cpi).length >= 13 ? yoyLast(cpi) : null;
  if (pi && un) {
    const ks = Object.keys(un).sort(), w = ks.slice(-120).map((k) => un[k]), us = w.reduce((a, b) => a + b, 0) / w.length, u = un[ks[ks.length - 1]];
    out.taylor = { rate: +taylor(pi.v, u, us).toFixed(2), infl: +pi.v.toFixed(2), inflAt: pi.at, unemp: u, ustar: +us.toFixed(2) };
  }
  return out;
}

async function rateModel(bokBase) {
  const [us, korea] = await Promise.all([usModel().catch(() => null), krModel(bokBase).catch(() => null)]);
  if (!us && !korea) return null;
  return { validatedAt: VALID.asOf, us, korea };
}

module.exports = { rateModel, VALID };

if (require.main === module) rateModel(+process.argv[2] || 3).then((r) => console.log(JSON.stringify(r, null, 1)));
