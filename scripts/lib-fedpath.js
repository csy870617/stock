// 연준 정책금리 경로 — 연방기금금리 선물(CBOT ZQ, 야후)로 시장이 가격에 반영한 FOMC 회의별 인상·동결·인하 확률
// (CME FedWatch 와 같은 방식, LLM 토큰 0). update-liquidity-gauge.js 가 불러 data/liquidity-auto.js 의 fed 에 쓴다.
//
// 계산: 월물 가격 P → 그달 평균 실효 연방기금금리 기대값 = 100 − P.
//   회의가 있는 달의 평균 = (결정일까지 일수 × 회의 전 금리 + 나머지 일수 × 회의 후 금리) ÷ 그달 일수.
//   다음 달에 회의가 없으면 다음 달 평균을 '회의 후 금리'로 쓰고(가장 안정적), 있으면 그달 평균에서 거꾸로 푼다.
//   첫 회의의 '회의 전 금리'가 곧 현재 금리 기대값이고, 각 회의 후 금리 − 현재 = 누적 변화(bp)다.
//   확률: 누적 변화 ÷ 25bp 의 정수부·소수부를 이웃한 두 결과(예: 인상 1회 92% · 2회 8%)에 나눈다.
// 한계: 시장이 지금 가격에 반영한 기대이지 예측이 아니다 — 지표·발언 하나에 하루 만에 크게 바뀐다.
//
// FOMC 결정일(성명 발표일, 미 동부 14:00) — 연준 공표 일정. 해가 바뀌기 전에 다음 해 일정을 추가한다.
const FOMC = [
  "2026-10-28", "2026-12-09",
  "2027-01-27", "2027-03-17", "2027-04-28", "2027-06-09", "2027-07-28", "2027-09-15", "2027-10-27", "2027-12-08",
  "2028-01-26",
];
const MCODE = "FGHJKMNQUVXZ";   // 선물 월물 코드 1~12월
const MONTHS_AHEAD = 10;

const ym = (d) => d.slice(0, 7);
const daysIn = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
function addMonth(s, k) { const [y, m] = s.split("-").map(Number); const d = new Date(Date.UTC(y, m - 1 + k, 1)); return d.toISOString().slice(0, 7); }
function symOf(s) { const [y, m] = s.split("-").map(Number); return "ZQ" + MCODE[m - 1] + String(y).slice(2) + ".CBT"; }

async function lastClose(sym) {
  for (let i = 0; i < 3; i++) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 10000);
    try {
      const r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) + "?interval=1d&range=1mo",
        { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
      if (r.ok) {
        const j = await r.json();
        const res = j && j.chart && j.chart.result && j.chart.result[0];
        const q = res && res.indicators && res.indicators.quote && res.indicators.quote[0];
        const c = q && Array.isArray(q.close) ? q.close.filter((x) => x != null) : [];
        if (c.length) {
          const ts = res.timestamp || [];
          return { px: c[c.length - 1], date: ts.length ? new Date(ts[ts.length - 1] * 1000).toISOString().slice(0, 10) : null };
        }
      }
    } catch (_e) { /* 재시도 */ } finally { clearTimeout(to); }
    await new Promise((res) => setTimeout(res, 400 * Math.pow(2, i)));
  }
  return null;
}

// 누적 변화(bp) → 이웃한 두 결과의 확률. n>0 인상 n회(25bp 단위), 0 동결, n<0 인하.
function outcomes(bp) {
  const steps = bp / 25, lo = Math.floor(steps), pHi = steps - lo;
  return [{ n: lo, p: 1 - pHi }, { n: lo + 1, p: pHi }].filter((o) => o.p >= 0.005).map((o) => ({ n: o.n, p: Math.round(o.p * 100) }))
    .sort((a, b) => b.p - a.p);
}

async function fedPath(today) {
  today = today || new Date().toISOString().slice(0, 10);
  const meetings = FOMC.filter((d) => d >= today);
  if (!meetings.length) return null;
  const months = [];
  for (let k = 0; k <= MONTHS_AHEAD; k++) months.push(addMonth(ym(today), k));
  const quotes = {};
  for (const m of months) quotes[m] = await lastClose(symOf(m));
  const avg = (m) => (quotes[m] ? 100 - quotes[m].px : null);
  const meetIn = (m) => meetings.find((d) => ym(d) === m) || FOMC.find((d) => ym(d) === m) || null;

  const out = [];
  let rPre = null, current = null;
  for (const d of meetings) {
    const m = ym(d), a = avg(m);
    if (a == null) break;
    const [y, mo, dd] = d.split("-").map(Number);
    const N = daysIn(y, mo), pre = dd, post = N - dd;   // 결정 다음 날부터 새 금리
    const next = addMonth(m, 1), aNext = avg(next);
    if (rPre == null) {
      // 첫 회의 — 앞 달은 대개 만기라 가격이 없다: 다음 달(회의 없음)로 회의 후 금리를 잡고 회의 전 금리를 푼다
      const prev = addMonth(m, -1);
      if (!meetIn(prev) && avg(prev) != null) rPre = avg(prev);
      else if (!meetIn(next) && aNext != null) rPre = (a * N - post * aNext) / pre;
      else rPre = a;
      current = rPre;
    }
    let rPost;
    if (!meetIn(next) && aNext != null) rPost = aNext;
    else if (post >= 5) rPost = (a * N - pre * rPre) / post;
    else break;   // 회의가 월말이고 다음 달도 회의라 거꾸로 풀면 오차가 크다 — 여기서 멈춘다
    const cum = Math.round((rPost - current) * 1000) / 10;   // bp, 소수 첫째
    out.push({ date: d, rate: +rPost.toFixed(3), stepBp: Math.round((rPost - rPre) * 1000) / 10, cumBp: cum, outcomes: outcomes(cum) });
    rPre = rPost;
  }
  if (!out.length) return null;
  const first = quotes[ym(out[0].date)];
  return {
    asOf: first && first.date ? first.date : today,
    current: +current.toFixed(3),
    meetings: out,
    source: "CBOT 연방기금금리 선물(ZQ, 야후) — 월물 가격으로 회의별 기대 금리를 푼 값(CME FedWatch 방식)",
  };
}

module.exports = { fedPath, outcomes, FOMC };

if (require.main === module) fedPath().then((r) => console.log(JSON.stringify(r, null, 1)));
