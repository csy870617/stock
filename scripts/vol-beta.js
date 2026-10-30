#!/usr/bin/env node
"use strict";
//
// 후보·편성 종목의 60일 실현변동성(연율화 %)과 1년 β(같은 나라 지수 대비, 일간·주간 수익률 두 가지) — 토큰 0
//
//   node scripts/vol-beta.js korea:005930 us:AAPL us:BRK.B ...   (한국은 .KS → 없으면 .KQ)
//
// 왜: C 모드(§3-6) 교체는 '국가 정식 편성 β 를 1 에서 더 멀어지게 하지 않는다'(§5 ⑤)를
//     지켜야 하는데, 새 후보는 stock-ta.js 에 없어 risk.vol 을 볼 수 없다. 편입 후보와 편출 대상을 한 번에 재서
//     교체 전후 방향을 확인한다. 주간 β 는 표본(약 50주)이 작아 흔들리므로 일간 β 와 함께 본다 — 2026 년처럼 유가
//     급등이 증시 하락과 겹친 해에는 에너지주 β 가 음수로 나온다(DVN 일간 -0.69·주간 -1.33, 2026-10-12 실측).
// 지수: 한국 ^KS11(코스피), 미국 ^GSPC(S&P500). 출력은 참고값이며 파일을 쓰지 않는다.

const args = process.argv.slice(2).filter((a) => a.includes(":"));
if (!args.length) {
  console.error("사용법: node scripts/vol-beta.js korea:<6자리> us:<티커> ...");
  process.exit(1);
}

async function closes(sym) {
  try {
    const r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=1y",
      { headers: { "User-Agent": "Mozilla/5.0" } });
    const j = await r.json();
    const res = j.chart && j.chart.result && j.chart.result[0];
    if (!res || !res.timestamp) return null;
    const off = res.meta.gmtoffset || 0, c = res.indicators.quote[0].close, m = {};
    res.timestamp.forEach((t, i) => { if (c[i] != null) m[new Date((t + off) * 1000).toISOString().slice(0, 10)] = c[i]; });
    return Object.keys(m).length > 60 ? m : null;
  } catch (_e) { return null; }
}

function vol60(m) {
  const cl = Object.keys(m).sort().map((d) => m[d]).slice(-61);
  const r = [];
  for (let i = 1; i < cl.length; i++) r.push(Math.log(cl[i] / cl[i - 1]));
  const mu = r.reduce((a, b) => a + b, 0) / r.length;
  return Math.sqrt(r.reduce((a, b) => a + (b - mu) ** 2, 0) / (r.length - 1)) * Math.sqrt(252) * 100;
}

// step=1 일간, step=5 주간(공통 거래일 5개 간격)
function beta(m, ix, step) {
  const k = Object.keys(m).filter((d) => ix[d] != null).sort();
  const s = [];
  for (let i = 0; i < k.length; i += step) s.push(k[i]);
  const a = [], b = [];
  for (let i = 1; i < s.length; i++) { a.push(m[s[i]] / m[s[i - 1]] - 1); b.push(ix[s[i]] / ix[s[i - 1]] - 1); }
  const ma = a.reduce((x, y) => x + y, 0) / a.length, mb = b.reduce((x, y) => x + y, 0) / b.length;
  let cv = 0, vb = 0;
  a.forEach((v, i) => { cv += (v - ma) * (b[i] - mb); vb += (b[i] - mb) ** 2; });
  return cv / vb;
}

(async () => {
  const ix = { korea: await closes("^KS11"), us: await closes("^GSPC") };
  for (const a of args) {
    const [c, t] = a.split(":");
    if (!ix[c]) { console.log(a.padEnd(16), "국가는 korea|us"); continue; }
    let m = null, used = null;
    for (const s of c === "korea" ? [t + ".KS", t + ".KQ"] : [t.replace(".", "-")]) {
      m = await closes(s);
      if (m) { used = s; break; }
    }
    if (!m) { console.log(a.padEnd(16), "시세 없음"); continue; }
    console.log(a.padEnd(16), used.padEnd(10), "vol60 " + vol60(m).toFixed(1) + "%",
      "| β 일간 " + beta(m, ix[c], 1).toFixed(2), "· 주간 " + beta(m, ix[c], 5).toFixed(2));
  }
})();
