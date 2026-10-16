// 한국 증권사 리포트별 목표가 이력(네이버 리서치 API) — 목표가 낙관 편향(상승여력 착시) 측정용
// 대상: 편성 이력 한국 종목 + KOSPI 시총 상위(유니버스 앞쪽) — 2019-01-01 이후, 종목당 최대 400건
// 출력: tgt-kr/<code>.json = [{id, d, broker, op, goal, px}]  (goal·px 는 작성 당시 수정 전 가격 단위)
const fs = require('fs'), path = require('path'), { execFile } = require('child_process');
const DIR = path.resolve(process.argv[2] || 'research-cache'); const OUT = path.join(DIR, 'tgt-kr'); fs.mkdirSync(OUT, { recursive: true });
const curl = (url) => new Promise((res) => execFile('curl', ['-s', '--max-time', '20', '-A', 'Mozilla/5.0', '-H', 'Accept: application/json', url], { maxBuffer: 16 << 20 }, (e, out) => { try { res(JSON.parse(out)); } catch (_e) { res(null); } }));
async function get(url) { for (let i = 0; i < 3; i++) { const j = await curl(url); if (j) return j; await new Promise((z) => setTimeout(z, 500 * (i + 1))); } return null; }
const num = (s) => { const v = parseFloat(String(s == null ? '' : s).replace(/,/g, '')); return isFinite(v) && v > 0 ? v : null; };
async function one(code) {
  const f = path.join(OUT, code + '.json'); if (fs.existsSync(f)) return 'skip';
  const items = [];
  for (let p = 1; p <= 25 && items.length < 400; p++) {
    const j = await get('https://m.stock.naver.com/api/research/stock/' + code + '?pageSize=20&page=' + p);
    if (!Array.isArray(j) || !j.length) break;
    let older = false;
    for (const x of j) { if (x.writeDate < '2019-01-01') { older = true; continue; } items.push({ id: x.researchId, d: x.writeDate, broker: x.brokerName }); }
    if (older || j.length < 20) break;
  }
  const out = [];
  let i = 0;
  await Promise.all(Array.from({ length: 4 }, async () => { while (i < items.length) { const it = items[i++];
    const j = await get('https://m.stock.naver.com/api/research/stock/' + code + '/' + it.id); const r = j && j.researchContent; if (!r) continue;
    out.push({ id: it.id, d: it.d, broker: it.broker, op: r.opinion || null, goal: num(r.goalPrice), px: num(r.priceAtWriteDate) }); } }));
  out.sort((a, b) => (a.d < b.d ? -1 : 1));
  fs.writeFileSync(f, JSON.stringify(out)); return 'ok:' + out.length;
}
(async () => {
  const U = JSON.parse(fs.readFileSync(path.join(DIR, 'universe.json'))).filter((u) => u.c === 'korea' && !u.bench);
  const roster = U.filter((u) => u.roster).map((u) => u.sym.slice(0, 6));
  const top = U.filter((u) => u.market === 'KOSPI').slice(0, 120).map((u) => u.sym.slice(0, 6));
  const codes = [...new Set(roster.concat(top))];
  console.log('대상', codes.length, '(편성 이력', roster.length, ')');
  let k = 0, done = 0; const t0 = Date.now(); let n = 0;
  await Promise.all(Array.from({ length: 4 }, async () => { while (k < codes.length) { const c = codes[k++]; const r = await one(c); done++; if (/^ok:/.test(r)) n += +r.slice(3);
    if (done % 10 === 0) console.log('…', done, '/', codes.length, '리포트', n, ((Date.now() - t0) / 1000 | 0) + 's'); } }));
  console.log('완료', done, '리포트', n, ((Date.now() - t0) / 1000 | 0) + 's');
})();
