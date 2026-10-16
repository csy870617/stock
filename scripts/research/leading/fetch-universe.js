// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// 넓은 유니버스(한국 KOSPI 250·KOSDAQ 150, 미국 NASDAQ 250·NYSE 350 + 편성 이력 전 종목) 10년 일봉 캐시
// 출력: px/<symbol>.json = {s, c, d:[...], o,h,l,cl,v}  (분할 수정 종가 — 기존 백테스트와 같은 기준)
const fs = require('fs'), path = require('path'), { execFile } = require('child_process');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const OUT = path.join(DIR, 'px');
const UA = 'Mozilla/5.0';
const curlJson = (url) => new Promise((res) => execFile('curl', ['-s', '--max-time', '20', '-A', UA, url], { maxBuffer: 64 << 20 }, (e, out) => { try { res(JSON.parse(out)); } catch (_e) { res(null); } }));
async function naver(url) { for (let i = 0; i < 3; i++) { const j = await curlJson(url); if (j) return j; } return null; }
async function rankKR(market, pages) { const out = []; for (let p = 1; p <= pages; p++) { const j = await naver('https://m.stock.naver.com/api/stocks/marketValue/' + market + '?page=' + p + '&pageSize=100'); (j && j.stocks || []).forEach((s) => out.push(s)); }
  return out.filter((s) => s.stockEndType === 'stock' && /0$/.test(s.itemCode) && !/스팩|SPAC/i.test(s.stockName)).map((s) => ({ c: 'korea', sym: s.itemCode + (market === 'KOSPI' ? '.KS' : '.KQ'), name: s.stockName, market })); }
async function rankUS(exch, pages) { const out = []; for (let p = 1; p <= pages; p++) { const j = await naver('https://api.stock.naver.com/stock/exchange/' + exch + '/marketValue?page=' + p + '&pageSize=100'); (j && j.stocks || []).forEach((s) => out.push(s)); }
  return out.filter((s) => s.stockEndType === 'stock' && s.symbolCode).map((s) => ({ c: 'us', sym: String(s.symbolCode).replace('.', '-'), name: s.stockNameEng || s.stockName, market: exch })); }
async function yahoo(sym) {
  for (let i = 0; i < 3; i++) {
    try {
      const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 20000);
      const r = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(sym) + '?interval=1d&range=10y', { signal: ctrl.signal, headers: { 'User-Agent': UA } });
      clearTimeout(to);
      if (r.status === 404) return null;
      if (!r.ok) { await new Promise((z) => setTimeout(z, 800 * (i + 1))); continue; }
      const j = await r.json(); const res = j.chart && j.chart.result && j.chart.result[0];
      if (!res || !res.timestamp) return null;
      const q = res.indicators.quote[0], off = (res.meta.gmtoffset || 0) * 1000, o = { d: [], o: [], h: [], l: [], cl: [], v: [] };
      res.timestamp.forEach((t, k) => { const c = q.close[k]; if (c == null || !(c > 0)) return;
        o.d.push(new Date(t * 1000 + off).toISOString().slice(0, 10)); o.cl.push(+c.toPrecision(6));
        o.o.push(q.open[k] != null ? +q.open[k].toPrecision(6) : null); o.h.push(q.high[k] != null ? +q.high[k].toPrecision(6) : null);
        o.l.push(q.low[k] != null ? +q.low[k].toPrecision(6) : null); o.v.push(q.volume[k] != null ? q.volume[k] : null); });
      return o;
    } catch (_e) { await new Promise((z) => setTimeout(z, 800 * (i + 1))); }
  }
  return null;
}
async function mapLimit(items, limit, fn) { let i = 0; const out = []; await Promise.all(Array.from({ length: limit }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]); } })); return out; }
(async () => {
  let U = [];
  U = U.concat((await rankKR('KOSPI', 4)).slice(0, 250), (await rankKR('KOSDAQ', 2)).slice(0, 150), (await rankUS('NASDAQ', 3)).slice(0, 250), (await rankUS('NYSE', 4)).slice(0, 350));
  // 편성 이력(history.js) 종목 — 지금 순위 밖으로 밀려난 종목도 포함해 생존편향을 조금 줄인다
  global.window = {}; require(path.join(__dirname, '..', '..', '..', 'data', 'history.js')); const H = window.STOCK_HISTORY;
  global.window = {}; require(path.join(__dirname, '..', '..', '..', 'data', 'recommendations.js')); const D = window.STOCK_DATA;
  const mk = {}; ['korea', 'us'].forEach((c) => D[c].forEach((s) => { mk[s.ticker] = s.market; }));
  const seen = new Set(U.map((u) => u.sym)); const roster = new Set();
  H.forEach((snap) => (snap.stocks || []).forEach((e) => { if (e.th === 'watch' || e.th === 'hold') return;
    const sym = e.c === 'korea' ? e.t + (mk[e.t] === 'KOSDAQ' ? '.KQ' : '.KS') : String(e.t).replace('.', '-'); roster.add(sym);
    if (!seen.has(sym)) { seen.add(sym); U.push({ c: e.c, sym, name: e.n, market: mk[e.t] || '?', rosterOnly: true }); } }));
  U.forEach((u) => { u.roster = roster.has(u.sym); });
  U.push({ c: 'korea', sym: '^KS11', bench: true }, { c: 'us', sym: '^GSPC', bench: true });
  console.log('유니버스', U.length, '— 한국', U.filter((u) => u.c === 'korea').length, '미국', U.filter((u) => u.c === 'us').length, '편성 이력', roster.size);
  let ok = 0, fail = 0, t0 = Date.now();
  await mapLimit(U, 8, async (u) => {
    const f = path.join(OUT, u.sym.replace(/[^A-Za-z0-9.^-]/g, '_') + '.json');
    if (fs.existsSync(f)) { ok++; return; }
    let o = await yahoo(u.sym);
    if (!o && u.c === 'korea' && /\.KS$/.test(u.sym)) { o = await yahoo(u.sym.replace('.KS', '.KQ')); if (o) u.sym = u.sym.replace('.KS', '.KQ'); }
    if (!o || o.cl.length < 300) { fail++; return; }
    fs.writeFileSync(f, JSON.stringify(Object.assign({ s: u.sym, c: u.c, name: u.name, market: u.market, roster: !!u.roster, bench: !!u.bench }, o)));
    ok++; if ((ok + fail) % 100 === 0) console.log('  …', ok + fail, '/', U.length, (Date.now() - t0) / 1000 | 0, 's');
  });
  fs.writeFileSync(path.join(DIR, 'universe.json'), JSON.stringify(U));
  console.log('완료 ok', ok, 'fail', fail, ((Date.now() - t0) / 1000 | 0) + 's');
})();
