// 선행(예측) 신호 연구 — 2026-10-16 (결과·결정은 docs/HISTORY.md '뒷북 진단과 전망 도입').
// 사용: node scripts/research/leading/<이 파일> <캐시 폴더>   (캐시는 저장소 밖 — 세션 scratchpad 권장)
//   순서: fetch-universe → fetch-flow·fetch-eps → lag-diagnosis·factors·range-calib·range-sym·pead·flow-test
// 한국 유니버스 투자자별 순매수(외국인·기관·개인) 일별 이력 — 네이버 m.stock trend API, 60일씩 bizdate 로 역방향 페이징
// 출력: flow/<code>.json = {code, d:[YYYY-MM-DD], f:[외국인 순매수 수량], o:[기관], p:[개인], fr:[외국인 보유율 %], v:[거래량]} (오래된→최신)
const fs = require('fs'), path = require('path'), { execFile } = require('child_process');
const DIR = path.resolve(process.argv[2] || 'research-cache'); require('fs').mkdirSync(DIR, { recursive: true });
const OUT = path.join(DIR, 'flow');
const curl = (url) => new Promise((res) => execFile('curl', ['-s', '--max-time', '20', '-A', 'Mozilla/5.0', url], { maxBuffer: 16 << 20 }, (e, out) => { try { res(JSON.parse(out)); } catch (_e) { res(null); } }));
const num = (s) => { if (s == null) return null; const n = parseFloat(String(s).replace(/[,%+]/g, '')); return isFinite(n) ? n : null; };
async function one(code) {
  const f = path.join(OUT, code + '.json'); if (fs.existsSync(f)) return 'skip';
  const rows = new Map(); let biz = '20261017';
  for (let k = 0; k < 48; k++) {
    let j = null; for (let r = 0; r < 3 && !Array.isArray(j); r++) j = await curl('https://m.stock.naver.com/api/stock/' + code + '/trend?pageSize=60&bizdate=' + biz);
    if (!Array.isArray(j) || !j.length) break;
    let minD = null;
    for (const x of j) { const d = x.bizdate; if (!d) continue; rows.set(d, [num(x.foreignerPureBuyQuant), num(x.organPureBuyQuant), num(x.individualPureBuyQuant), num(x.foreignerHoldRatio), num(x.accumulatedTradingVolume)]); if (!minD || d < minD) minD = d; }
    if (!minD || minD <= '20160801') break;
    biz = minD;   // bizdate 이전 60일을 준다(같은 날 미포함 확인됨)
  }
  const ds = [...rows.keys()].sort(); if (ds.length < 120) return 'short';
  const o = { code, d: ds.map((d) => d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6)), f: [], o: [], p: [], fr: [], v: [] };
  ds.forEach((d) => { const r = rows.get(d); o.f.push(r[0]); o.o.push(r[1]); o.p.push(r[2]); o.fr.push(r[3]); o.v.push(r[4]); });
  fs.writeFileSync(f, JSON.stringify(o)); return 'ok';
}
(async () => {
  const U = JSON.parse(fs.readFileSync(path.join(DIR, 'universe.json'))).filter((u) => u.c === 'korea' && !u.bench).map((u) => u.sym.slice(0, 6));
  const codes = [...new Set(U)]; let i = 0, done = 0; const t0 = Date.now(); const cnt = {};
  await Promise.all(Array.from({ length: 12 }, async () => { while (i < codes.length) { const c = codes[i++]; const r = await one(c); cnt[r] = (cnt[r] || 0) + 1; done++; if (done % 25 === 0) console.log('…', done, '/', codes.length, ((Date.now() - t0) / 1000 | 0) + 's', JSON.stringify(cnt)); } }));
  console.log('완료', JSON.stringify(cnt), ((Date.now() - t0) / 1000 | 0) + 's');
})();
