// 미국 공매도 잔고(나스닥 short-interest, 반월 ~1년) + 기관 보유 요약(institutional-holdings) — 미국 '수급' 후보 검증용
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); const OUT = path.join(DIR, 'si-us'); fs.mkdirSync(OUT, { recursive: true });
const { execFile } = require('child_process');
const curl = (url) => new Promise((res) => execFile('curl', ['-s', '--max-time', '20', '-A', 'Mozilla/5.0', '-H', 'Accept: application/json', url], { maxBuffer: 16 << 20 }, (e, out) => { try { res(JSON.parse(out)); } catch (_e) { res(null); } }));
async function get(url) { for (let i = 0; i < 3; i++) { const j = await curl(url); if (j && j.data) return j; await new Promise((z) => setTimeout(z, 700 * (i + 1))); } return null; }
const num = (s) => { const v = parseFloat(String(s == null ? '' : s).replace(/[$,%]/g, '')); return isFinite(v) ? v : null; };
(async () => {
  const U = JSON.parse(fs.readFileSync(path.join(DIR, 'universe.json'))).filter((u) => u.c === 'us' && !u.bench);
  let i = 0, ok = 0, miss = 0; const t0 = Date.now();
  await Promise.all(Array.from({ length: 3 }, async () => { while (i < U.length) { const u = U[i++]; const f = path.join(OUT, u.sym + '.json'); if (fs.existsSync(f)) { ok++; continue; }
    const sym = encodeURIComponent(u.sym.replace('-', '.'));
    const [a, b] = await Promise.all([get('https://api.nasdaq.com/api/quote/' + sym + '/short-interest?assetClass=stocks'),
      get('https://api.nasdaq.com/api/company/' + sym + '/institutional-holdings?limit=1&type=TOTAL&sortColumn=marketValue')]);
    const rows = a && a.data && a.data.shortInterestTable && a.data.shortInterestTable.rows;
    if (!Array.isArray(rows) || !rows.length) { miss++; continue; }
    const si = rows.map((r) => { const m = String(r.settlementDate).match(/(\d\d)\/(\d\d)\/(\d{4})/); return m ? { d: m[3] + '-' + m[1] + '-' + m[2], si: num(r.interest), adv: num(r.avgDailyShareVolume), dtc: num(r.daysToCover) } : null; }).filter(Boolean).sort((x, y) => (x.d < y.d ? -1 : 1));
    const os = b && b.data && b.data.ownershipSummary; const ap = b && b.data && b.data.activePositions && b.data.activePositions.rows;
    const inst = os ? { pct: num(os.SharesOutstandingPCT && os.SharesOutstandingPCT.value), shOutM: num(os.ShareoutstandingTotal && os.ShareoutstandingTotal.value),
      inc: ap ? num((ap.find((r) => /Increased/.test(r.positions)) || {}).shares) : null, dec: ap ? num((ap.find((r) => /Decreased/.test(r.positions)) || {}).shares) : null } : null;
    fs.writeFileSync(f, JSON.stringify({ sym: u.sym, si, inst })); ok++;
    if ((ok + miss) % 100 === 0) console.log('…', ok + miss, '/', U.length, ((Date.now() - t0) / 1000 | 0) + 's'); } }));
  console.log('완료 ok', ok, 'miss', miss, ((Date.now() - t0) / 1000 | 0) + 's');
})();
