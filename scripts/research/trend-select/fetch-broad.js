// 추세추종 종목 선택 검증(PREREG.md) — 지금 상장된 전 종목의 10년 일봉으로 월말 판정·다음 달 수익을 만든다(일봉은 저장하지 않는다).
// 사용: node fetch-broad.js <캐시 폴더>   → <캐시>/tsel/list.json(종목·현재 주식 수), <캐시>/tsel/feat-<korea|us>.jsonl(종목별 월 자료), <캐시>/tsel/idx.json
//   월 자료 한 줄 = {s, c, mk, sh, cap0(현재 시총), m:[{d 판정일, x 매매일, cap 그때 시총≈종가×현재 주식 수, n 일봉 수, z 현재 추세 상승, ma 200일선 위,
//                    dch 신고가 돌파 보유 중, mom 12-1 수익, hi 종가/52주 최고, fr 다음 매매일까지 배당 포함 수익, end 그 뒤 자료 없음}],
//                    jd 자료 끊김 날짜들, pa 달력 매매일마다 배당 포함 수정 종가(그냥 보유 계산용)}
// 판정 규칙은 운영과 같다 — 현재 추세 = lib-trend.js 지그재그(최근 751개 일봉, h = clamp(10σ, 10~35%), σ = 직전 500일 일간 로그수익).
const fs = require("fs"), path = require("path"), { execFile } = require("child_process");
const TR = require(path.join(__dirname, "..", "..", "lib-trend.js"));
const DIR = path.resolve(process.argv[2] || "research-cache"), OUT = path.join(DIR, "tsel");
fs.mkdirSync(OUT, { recursive: true });
const UA = "Mozilla/5.0";
const MIN_CAP = { korea: 3e10, us: 3e8 };   // 지금 시총 하한(한국 300억 원·미국 3억 달러) — 그때 상위였다가 이보다 작아진 종목은 드물다
const num = (s) => (s == null ? NaN : +String(s).replace(/,/g, ""));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
async function getJson(url) {
  for (let i = 0; i < 4; i++) {
    try {
      const ctrl = new AbortController(), to = setTimeout(() => ctrl.abort(), 20000);
      const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": UA } });
      clearTimeout(to);
      if (r.status === 404) return null;
      if (r.ok) return await r.json();
    } catch (_e) {}
    await new Promise((z) => setTimeout(z, 800 * (i + 1)));
  }
  return null;
}
// 네이버 증권은 node fetch 가 막혀 curl 로 받는다(CLAUDE.md §8 과 같은 사정)
const curlJson = (url) => new Promise((res) => execFile("curl", ["-s", "--max-time", "20", "-A", UA, url], { maxBuffer: 64 << 20 }, (e, out) => { try { res(JSON.parse(out)); } catch (_e) { res(null); } }));
async function naver(url) { for (let i = 0; i < 3; i++) { const j = await curlJson(url); if (j) return j; } return null; }
async function listKR(market) {
  const out = [];
  for (let p = 1; p < 60; p++) {
    const j = await naver("https://m.stock.naver.com/api/stocks/marketValue/" + market + "?page=" + p + "&pageSize=100");
    const st = (j && j.stocks) || [];
    if (!st.length) break;
    st.forEach((s) => {
      if (s.stockEndType !== "stock" || !/0$/.test(s.itemCode) || /스팩|SPAC/i.test(s.stockName)) return;
      const px = num(s.closePrice), cap = num(s.marketValue) * 1e8;
      if (!(px > 0) || !(cap >= MIN_CAP.korea)) return;
      out.push({ c: "korea", sym: s.itemCode + (market === "KOSPI" ? ".KS" : ".KQ"), name: s.stockName, mk: market, cap0: cap, sh: cap / px });
    });
  }
  return out;
}
async function listUS(exch) {
  const out = [];
  for (let p = 1; p < 80; p++) {
    const j = await naver("https://api.stock.naver.com/stock/exchange/" + exch + "/marketValue?page=" + p + "&pageSize=100");
    const st = (j && j.stocks) || [];
    if (!st.length) break;
    st.forEach((s) => {
      if (s.stockEndType !== "stock" || !s.symbolCode) return;
      const px = num(s.closePrice), cap = num(s.marketValue) * 1000;
      if (!(px > 0) || !(cap >= MIN_CAP.us)) return;
      out.push({ c: "us", sym: String(s.symbolCode).replace(/\./g, "-"), name: s.stockNameEng || s.stockName, mk: exch, cap0: cap, sh: cap / px });
    });
  }
  return out;
}
async function yahoo(sym) {
  const j = await getJson("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=10y");
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  if (!res || !res.timestamp) return null;
  const q = res.indicators.quote[0], ac = res.indicators.adjclose && res.indicators.adjclose[0] && res.indicators.adjclose[0].adjclose;
  const off = (res.meta.gmtoffset || 0) * 1000, o = { d: [], c: [], a: [] };
  res.timestamp.forEach((t, k) => {
    const c = q.close[k];
    if (c == null || !(c > 0)) return;
    const a = ac && ac[k] > 0 ? ac[k] : c;
    o.d.push(new Date(t * 1000 + off).toISOString().slice(0, 10)); o.c.push(c); o.a.push(a);
  });
  return o;
}
// 시장 달력 — 월말 판정일과 다음 거래일(매매일)
function calendar(d) {
  const out = [];
  for (let i = 0; i + 1 < d.length; i++) if (d[i].slice(0, 7) !== d[i + 1].slice(0, 7)) out.push({ d: d[i], x: d[i + 1] });
  return out;
}
const lastLE = (arr, v) => { let lo = 0, hi = arr.length - 1, ans = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (arr[m] <= v) { ans = m; lo = m + 1; } else hi = m - 1; } return ans; };
// 자료 끊김 — 하루 변화가 정상 거래로는 나올 수 없는 크기(한국 가격 제한폭 ±30% 밖, 미국 +200%·−80% 밖): 분할·병합 미반영, 파산 전후 이어 붙임 등
const JUMP = { korea: [-0.32, 0.32], us: [-0.8, 2.0] };
function features(o, cal, sh, country) {
  const n = o.c.length, y = o.c.map(Math.log), lr = y.map((v, i) => (i ? v - y[i - 1] : 0));
  const J = JUMP[country], jumps = [];
  for (let t = 1; t < n; t++) { const r = o.c[t] / o.c[t - 1] - 1; if (r < J[0] || r > J[1]) jumps.push({ t, x: 1 + r }); }
  // 분할·병합처럼 주식 수가 크게 바뀐 끊김(배수 0.4 미만·2.5 초과) — 그 전 시총 환산이 틀어진다
  const splitLike = jumps.filter((j) => j.x < 0.4 || j.x > 2.5);
  const L1 = [0], L2 = [0], C = [0];
  for (let i = 0; i < n; i++) { L1.push(L1[i] + lr[i]); L2.push(L2[i] + lr[i] * lr[i]); C.push(C[i] + o.c[i]); }
  const sig = (t) => { const N = Math.min(500, t), a = t - N + 1, s1 = L1[t + 1] - L1[a], s2 = L2[t + 1] - L2[a]; return Math.sqrt(Math.max(0, (s2 - s1 * s1 / N) / (N - 1))); };
  // 신고가 돌파 보유 상태(일별로 굴린다)
  const dch = new Int8Array(n);
  let inD = 0, peak = 0;
  for (let t = 252; t < n; t++) {
    if (t >= 500) {
      const h = clamp(10 * sig(t), 0.10, 0.35);
      let mx = -Infinity;
      for (let k = t - 252; k < t; k++) if (o.c[k] > mx) mx = o.c[k];
      if (!inD) { if (o.c[t] >= mx) { inD = 1; peak = o.c[t]; } }
      else { if (o.c[t] > peak) peak = o.c[t]; if (o.c[t] < peak / (1 + h)) inD = 0; }
    }
    dch[t] = inD;
  }
  // 그냥 보유(BH)용 — 달력 매매일마다 배당 포함 수정 종가(그날 거래가 없으면 직전 거래일 값: 거래 정지 동안은 멈춰 있다가 재개 가격으로 이어진다)
  const pa = cal.map((ce) => { const j = lastLE(o.d, ce.x); return j < 0 ? null : +o.a[j].toPrecision(7); });
  const m = [];
  cal.forEach((ce, k) => {
    const t = lastLE(o.d, ce.d);
    if (t < 503) return;                                   // 일봉 504개 이상
    if (Date.parse(ce.d) - Date.parse(o.d[t]) > 10 * 864e5) return;   // 판정일 근처에 거래가 없었다(정지 등)
    const xi = o.d.indexOf(ce.x);
    if (xi < 0) return;                                    // 매매일에 거래가 없었다
    const nx = cal[k + 1];
    let fr = null, end = 0;
    if (nx) {
      const xj = lastLE(o.d, nx.x);
      fr = o.a[xj] / o.a[xi] - 1;
      if (o.d[xj] !== nx.x) end = 1;                       // 다음 매매일 전에 자료가 끝났다(그 뒤는 현금)
    }
    const w = y.slice(Math.max(0, t - 750), t + 1), sg = sig(t);
    const H = Math.log(1 + clamp(10 * sg, 0.10, 0.35));
    let hi = -Infinity;
    for (let q = t - 251; q <= t; q++) if (o.c[q] > hi) hi = o.c[q];
    // 판정 창(직전 750거래일)~다음 매매일 사이 끊김 → 판정·수익 오염, 그 뒤의 분할·병합형 끊김 → 시총 환산 오염: 그달은 쓰지 않는다
    const xEnd = nx ? lastLE(o.d, nx.x) : n - 1;
    const bad = jumps.some((j) => j.t > t - 750 && j.t <= xEnd) || splitLike.some((j) => j.t > t) ? 1 : 0;
    m.push({ d: ce.d, x: ce.x, cap: Math.round(o.c[t] * sh), n: t + 1, bad, z: TR.zigzag(w, H).dir > 0 ? 1 : 0,
      ma: o.c[t] > (C[t + 1] - C[t - 199]) / 200 ? 1 : 0, dch: dch[t], mom: +(o.c[t - 21] / o.c[t - 252] - 1).toFixed(4), hi: +(o.c[t] / hi).toFixed(4),
      fr: fr == null ? null : +fr.toFixed(5), end });
  });
  return { m, jumps: jumps.length, jd: jumps.map((j) => o.d[j.t]), pa };
}
(async () => {
  const t0 = Date.now();
  let list;
  const lf = path.join(OUT, "list.json");
  if (fs.existsSync(lf)) list = JSON.parse(fs.readFileSync(lf, "utf8"));
  else {
    list = [].concat(await listKR("KOSPI"), await listKR("KOSDAQ"), await listUS("NASDAQ"), await listUS("NYSE"));
    if (list.length < 1000) { console.log("종목 목록을 받지 못했다(" + list.length + ")"); process.exit(1); }
    const seen = new Set();
    list = list.filter((x) => (seen.has(x.sym) ? false : (seen.add(x.sym), true)));
    fs.writeFileSync(lf, JSON.stringify(list));
  }
  console.log("종목 목록:", list.length, "— 한국", list.filter((x) => x.c === "korea").length, "미국", list.filter((x) => x.c === "us").length, ((Date.now() - t0) / 1000 | 0) + "s");
  // 시장 달력·참고 지수
  const IDX = {};
  for (const [k, sym] of [["korea", "^KS11"], ["us", "^GSPC"], ["kospi", "^KS11"], ["sp500tr", "^SP500TR"], ["kosdaq", "^KQ11"]]) IDX[k] = await yahoo(sym);
  const CAL = { korea: calendar(IDX.korea.d), us: calendar(IDX.us.d) };
  fs.writeFileSync(path.join(OUT, "idx.json"), JSON.stringify({ cal: CAL, kospi: IDX.kospi, sp500tr: IDX.sp500tr, kosdaq: IDX.kosdaq }));
  const outs = { korea: fs.openSync(path.join(OUT, "feat-korea.jsonl"), "w"), us: fs.openSync(path.join(OUT, "feat-us.jsonl"), "w") };
  let i = 0, ok = 0, fail = 0, short = 0;
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (i < list.length) {
      const it = list[i++];
      const o = await yahoo(it.sym);
      if (!o || o.c.length < 520) { if (o) short++; else fail++; continue; }
      const fx = features(o, CAL[it.c], it.sh, it.c), m = fx.m;
      if (!m.length) { short++; continue; }
      fs.writeSync(outs[it.c], JSON.stringify({ s: it.sym, c: it.c, mk: it.mk, name: it.name, sh: it.sh, cap0: it.cap0, jumps: fx.jumps, jd: fx.jd, pa: fx.pa, m }) + "\n");
      ok++;
      if ((ok + fail + short) % 250 === 0) console.log("  …", ok + fail + short, "/", list.length, "· 자료", ok, ((Date.now() - t0) / 1000 | 0) + "s");
    }
  }));
  fs.closeSync(outs.korea); fs.closeSync(outs.us);
  console.log("완료 — 자료", ok, "· 이력 짧음", short, "· 실패", fail, ((Date.now() - t0) / 1000 | 0) + "s");
})();
