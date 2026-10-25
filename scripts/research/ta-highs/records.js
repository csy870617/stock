// '고점의 적극매수' 검증 기록(사전 등록: PREREG.md) — 넓은 유니버스에 운영 엔진(lib-ta mtf)을 룩어헤드 없이 주 1회 적용해
// 등급·고점 위치·RSI·σ60 과 이후 지수 대비 초과수익(ex21·ex63)·매수 뒤 최대 하락(dd21·dd63)을 한 줄씩 쓴다.
// 사용: node records.js <캐시 폴더> [i/n]   (캐시는 ../leading/fetch-universe.js 가 만든 px/ — 여러 프로세스로 나눠 돌린다)
// 출력: <캐시>/tah-records-<i>.jsonl → analyze.js
const fs = require("fs"), path = require("path");
const DIR = path.resolve(process.argv[2] || "research-cache");
const [PART, PARTS] = (process.argv[3] || "0/1").split("/").map(Number);
const TA = require(path.join(__dirname, "..", "..", "lib-ta.js"));
const PX = path.join(DIR, "px");
const WARM = 756, STEP = 5, H = [21, 63];
const bench = {};
for (const [c, f] of [["korea", "^KS11.json"], ["us", "^GSPC.json"]]) {
  const b = JSON.parse(fs.readFileSync(path.join(PX, f)));
  b.m = new Map(b.d.map((d, i) => [d, i]));
  const n = b.d.length;
  b.evalSet = new Set(b.d.filter((d, i) => (n - 1 - i) % STEP === 0));
  bench[c] = b;
}
const files = fs.readdirSync(PX).filter((f) => !f.startsWith("^")).sort().filter((f, i) => i % PARTS === PART);
const out = fs.openSync(path.join(DIR, "tah-records-" + PART + ".jsonl"), "w");
const r4 = (v) => (v == null || !isFinite(v) ? null : +v.toFixed(4));
let done = 0, evals = 0;
const t0 = Date.now();
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(path.join(PX, f)));
  if (o.cl.length < WARM + 70) { done++; continue; }
  const b = bench[o.c];
  const om = new Map(o.d.map((d, i) => [d, i]));
  const rows = o.d.map((d, i) => ({ t: Date.parse(d) / 1000, close: o.cl[i], high: o.h[i] != null ? o.h[i] : o.cl[i], low: o.l[i] != null ? o.l[i] : o.cl[i], vol: o.v[i] }));
  const lr = o.cl.map((c, i) => (i ? Math.log(c / o.cl[i - 1]) : 0));
  // 지수 날짜 j+h 에 해당하는 종목 인덱스(그날 거래가 없으면 그 전 마지막 거래일)
  const stockIdxAt = (j) => {
    const d = b.d[j];
    if (d == null) return null;
    if (om.has(d)) return om.get(d);
    for (let k = j - 1; k >= 0 && k > j - 6; k--) if (om.has(b.d[k])) return om.get(b.d[k]);
    return null;
  };
  for (let t = WARM; t < rows.length - 1; t++) {
    const d = o.d[t];
    if (!b.evalSet.has(d)) continue;
    const j = b.m.get(d);
    if (j == null) continue;
    const a = TA.analyzeTimeframes(rows.slice(0, t + 1), { dp: 2, srDp: 2 });
    if (!a) continue;
    let hi = 0;
    for (let k = Math.max(0, t - 251); k <= t; k++) if (o.cl[k] > hi) hi = o.cl[k];
    let s = 0, s2 = 0;
    for (let k = t - 59; k <= t; k++) { s += lr[k]; s2 += lr[k] * lr[k]; }
    const sig = Math.sqrt(Math.max(0, s2 / 60 - (s / 60) * (s / 60)));
    // 볼린저 %B(20, 2)
    let m20 = 0, v20 = 0;
    for (let k = t - 19; k <= t; k++) m20 += o.cl[k];
    m20 /= 20;
    for (let k = t - 19; k <= t; k++) v20 += (o.cl[k] - m20) * (o.cl[k] - m20);
    const sd20 = Math.sqrt(v20 / 20), pb = sd20 > 0 ? (o.cl[t] - (m20 - 2 * sd20)) / (4 * sd20) : null;
    const rec = { c: o.c, s: o.s, d, S: a.short.signal, M: a.mid.signal, L: a.long.signal,
      sS: r4(a.short.scoreMtf), sM: r4(a.mid.scoreMtf), sL: r4(a.long.scoreMtf),
      hi: r4(o.cl[t] / hi), rsi: a.short.facts && a.short.facts.rsi != null ? +a.short.facts.rsi.toFixed(1) : null, sig: r4(sig), pb: r4(pb), g20: r4(o.cl[t] / m20 - 1) };
    for (const h of H) {
      const k = j + h < b.d.length ? stockIdxAt(j + h) : null;
      if (k == null || k <= t) { rec["ex" + h] = null; rec["dd" + h] = null; continue; }
      rec["ex" + h] = r4((o.cl[k] / o.cl[t] - 1) - (b.cl[j + h] / b.cl[j] - 1));
      let mn = Infinity;
      for (let q = t + 1; q <= k; q++) if (o.cl[q] < mn) mn = o.cl[q];
      rec["dd" + h] = r4(Math.min(0, mn / o.cl[t] - 1));
    }
    fs.writeSync(out, JSON.stringify(rec) + "\n");
    evals++;
  }
  done++;
  if (done % 50 === 0) console.log("[" + PART + "] …", done, "/", files.length, "평가", evals, ((Date.now() - t0) / 1000 | 0) + "s");
}
fs.closeSync(out);
console.log("[" + PART + "] 완료", done, "평가", evals, ((Date.now() - t0) / 1000 | 0) + "s");
