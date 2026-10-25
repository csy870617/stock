// 추세추종 검증(PREREG.md) — 배당까지 수정한 종가(야후 adjclose)를 받아 둔다. 판정은 px/ 의 분할 수정 종가, 수익은 이 값으로 잰다.
// 사용: node fetch-adj.js <캐시 폴더>   (먼저 ../leading/fetch-universe.js <캐시> 로 px/ 를 받는다)
// 출력: <캐시>/adj/<px 와 같은 파일 이름> = {d:[날짜], ac:[수정 종가]}
const fs = require("fs"), path = require("path");
const DIR = path.resolve(process.argv[2] || "research-cache");
const PX = path.join(DIR, "px"), OUT = path.join(DIR, "adj");
fs.mkdirSync(OUT, { recursive: true });
const UA = "Mozilla/5.0";
async function adj(sym) {
  for (let i = 0; i < 4; i++) {
    try {
      const ctrl = new AbortController(), to = setTimeout(() => ctrl.abort(), 20000);
      const r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=10y", { signal: ctrl.signal, headers: { "User-Agent": UA } });
      clearTimeout(to);
      if (r.status === 404) return null;
      if (!r.ok) { await new Promise((z) => setTimeout(z, 1000 * (i + 1))); continue; }
      const j = await r.json(), res = j.chart && j.chart.result && j.chart.result[0];
      if (!res || !res.timestamp) return null;
      const ac = res.indicators.adjclose && res.indicators.adjclose[0] && res.indicators.adjclose[0].adjclose;
      if (!ac) return null;
      const off = (res.meta.gmtoffset || 0) * 1000, o = { d: [], ac: [] };
      res.timestamp.forEach((t, k) => { const v = ac[k]; if (v == null || !(v > 0)) return; o.d.push(new Date(t * 1000 + off).toISOString().slice(0, 10)); o.ac.push(+v.toPrecision(8)); });
      return o;
    } catch (_e) { await new Promise((z) => setTimeout(z, 1000 * (i + 1))); }
  }
  return null;
}
(async () => {
  const files = fs.readdirSync(PX).filter((f) => /\.json$/.test(f));
  let i = 0, ok = 0, fail = 0, skip = 0;
  const t0 = Date.now();
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (i < files.length) {
      const f = files[i++], dst = path.join(OUT, f);
      if (fs.existsSync(dst)) { skip++; continue; }
      const p = JSON.parse(fs.readFileSync(path.join(PX, f)));
      const o = await adj(p.s);
      if (!o || o.ac.length < 300) { fail++; continue; }
      fs.writeFileSync(dst, JSON.stringify(o));
      ok++;
      if ((ok + fail) % 100 === 0) console.log("  …", ok + fail + skip, "/", files.length, ((Date.now() - t0) / 1000 | 0) + "s");
    }
  }));
  console.log("adjclose 받기 완료 — 새로", ok, "· 이미 있음", skip, "· 실패", fail, ((Date.now() - t0) / 1000 | 0) + "s");
})();
