// 비교 기준 M0 — 2026-10-25 까지 운영한 추세 판정(scripts/lib-trend.js regime, 커밋 eee4bdf)을 그대로 옮겨 둔다.
// 운영은 이 비교 뒤 순수 지그재그(M0-zz)로 바뀌었으므로, eval.js 가 같은 결과를 다시 낼 수 있게 여기서 부른다.
// 지그재그·단계·띠(zigzag·phases·bandOf)는 운영 코드와 같다.
"use strict";
const path = require("path");
const TR = require(path.join(__dirname, "..", "..", "lib-trend.js"));
const { zigzag, phases, bandOf } = TR;
const WORD = (d) => (d > 0 ? "상승" : "하락");

// 지그재그의 마지막 다리를 시간 기준(새 극점 없이 stall 일)으로 다시 가른다 — 멈춤(보합·반대 추세)과 박스권 이후 재시작
function regime(y, H, stall, sigD) {
  const n = y.length, z = zigzag(y, H), last = n - 1;
  if (!z.dir) return { cls: "보합", s: 0, kind: "window", prev: null };
  const P = z.piv[z.piv.length - 1];
  const prev0 = z.piv.length >= 2 ? { cls: WORD(-z.dir), s: z.piv[z.piv.length - 2].i, e: P.i, kind: z.dir > 0 ? "high" : "low" }
    : { cls: WORD(-z.dir), s: 0, e: P.i, kind: "window" };
  return tail(P.i, z.dir, prev0, z.dir > 0 ? "low" : "high");

  function tail(start, d, prevCtx, kind0) {
    const better = (a, b) => (d > 0 ? y[a] > y[b] : y[a] < y[b]);
    const prog = [start];
    for (let t = start + 1; t < n; t++) if (better(t, prog[prog.length - 1])) prog.push(t);
    const ie = prog[prog.length - 1];
    let s = start, kind = kind0, prev = prevCtx;
    for (let j = prog.length - 2; j >= 0; j--) {
      if (prog[j + 1] - prog[j] >= 2 * stall) {
        const lo = Math.max(prog[j], prog[j + 1] - stall);
        let m = lo;
        for (let t = lo; t < prog[j + 1]; t++) if (d > 0 ? y[t] < y[m] : y[t] > y[m]) m = t;
        const bs = prog[j] - start <= 10 ? start : prog[j];
        const r = y[m] - y[bs];
        const one = !phases(y.slice(bs, m + 1), sigD).some((g) => g.cls === WORD(d)) && Math.abs(r) >= Math.log(1 + bandOf(sigD, m - bs, 0.05, 0.10));
        prev = { cls: one ? WORD(-d) : "보합", s: bs, e: m, kind: one ? (d > 0 ? "high" : "low") : "box" };
        s = m; kind = one ? (d > 0 ? "low" : "high") : d > 0 ? "boxLow" : "boxHigh";
        break;
      }
    }
    if (last - ie < stall) return { cls: WORD(d), s, kind, prev };
    const mine = { cls: WORD(d), s, e: ie, kind };
    const L = last - ie, r = y[last] - y[ie];
    const orderly = !phases(y.slice(ie), sigD).some((g) => g.cls === WORD(d));
    if (orderly && Math.abs(r) >= Math.log(1 + bandOf(sigD, L, 0.05, 0.10))) return tail(ie, -d, mine, d > 0 ? "high" : "low");
    return { cls: "보합", s: ie, kind: d > 0 ? "afterHigh" : "afterLow", prev: mine };
  }
}

module.exports = { regime };
