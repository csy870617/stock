// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// 미국 유니버스 최근 4분기 실적 서프라이즈(나스닥 API) + 다음 실적 예정일 — PEAD 검증용
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const OUT = path.join(DIR, 'eps');
async function get(url) { for (let i = 0; i < 3; i++) { try { const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 15000);
  const r = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } }); clearTimeout(to);
  if (r.ok) return await r.json(); } catch (_e) {} await new Promise((z) => setTimeout(z, 700 * (i + 1))); } return null; }
(async () => {
  const U = JSON.parse(fs.readFileSync(path.join(DIR, 'universe.json'))).filter((u) => u.c === 'us' && !u.bench);
  let i = 0, ok = 0, miss = 0; const t0 = Date.now();
  await Promise.all(Array.from({ length: 6 }, async () => { while (i < U.length) { const u = U[i++]; const sym = u.sym.replace('-', '.');
    const f = path.join(OUT, u.sym + '.json'); if (fs.existsSync(f)) { ok++; continue; }
    const s = await get('https://api.nasdaq.com/api/company/' + encodeURIComponent(sym) + '/earnings-surprise');
    const e = await get('https://api.nasdaq.com/api/analyst/' + encodeURIComponent(sym) + '/earnings-date');
    const rows = s && s.data && s.data.earningsSurpriseTable && s.data.earningsSurpriseTable.rows;
    if (!rows || !rows.length) { miss++; continue; }
    fs.writeFileSync(f, JSON.stringify({ sym: u.sym, rows, next: e && e.data ? { text: e.data.reportText, ann: e.data.announcement } : null })); ok++;
    if ((ok + miss) % 100 === 0) console.log('…', ok + miss, '/', U.length, ((Date.now() - t0) / 1000 | 0) + 's'); } }));
  console.log('완료 ok', ok, 'miss', miss, ((Date.now() - t0) / 1000 | 0) + 's');
})();
