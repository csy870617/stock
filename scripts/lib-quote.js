// Yahoo 시세 1건 — '현재가'와 '마지막으로 끝난 정규장 종가'를 함께 돌려준다(update-quotes·daily-maintenance 공용).
//
// 왜 둘을 나누나(2026-10-08 점검): refresh-quotes 예약 실행이 GitHub 지연으로 '21:00 UTC' 분이 다음날
// 00~01시 UTC(한국 장중), '07:00 UTC' 분이 13~15시 UTC(미국 장중)에 돈다. regularMarketPrice 만 쓰면
// 그 시각의 장중가가 스냅샷(history.js)에 들어가고, 세션이 지수 인자 없이 snapshot.js 를 다시 돌리면
// '종가로 바뀐 종목 가격 + 장중 지수'가 한 스냅샷에 섞였다(10/8 KOSPI 기록 6,763 vs 실제 종가 6,626).
// 화면용 현재가(price)는 장중가 그대로 두고, 성과 기록용 close/closeDate 는 끝난 장의 종가만 쓴다.
//
// 반환: { price, date, prevClose, changePct, close, closeDate, inSession }
//   price·date     — regularMarketPrice 와 그 시각의 거래소 현지 날짜(장중이면 장중가)
//   prevClose      — 직전 거래일 종가(등락률 기준)
//   close·closeDate — 마지막으로 '끝난' 정규장 종가와 그 날짜(장중이면 전 거래일 종가)
//   inSession      — 지금 정규장이 열려 있거나 마감 직후 정산 중이면 true
const STALE_QUOTE_DAYS = 7;          // 이보다 오래된 시세(거래정지·상장폐지 심볼)는 거부
const SETTLE_SEC = 40 * 60;          // 마감 후 이 시간까지는 장중으로 본다(KRX 는 야후 end 06:00Z 뒤 06:30Z 동시호가 마감)

function localDate(sec, off) { return new Date((sec + (off || 0)) * 1000).toISOString().slice(0, 10); }

// 지금 정규장이 열려 있으면(마감 후 정산 여유 포함) 그 장의 거래소 현지 날짜, 아니면 null
function openSessionDate(meta, nowMs) {
  const reg = meta && meta.currentTradingPeriod && meta.currentTradingPeriod.regular;
  if (!reg || typeof reg.start !== "number" || typeof reg.end !== "number") return null;
  const nowSec = (nowMs != null ? nowMs : Date.now()) / 1000;
  if (!(nowSec >= reg.start && nowSec < reg.end + SETTLE_SEC)) return null;
  return localDate(reg.start, meta.gmtoffset || 0);
}

// 차트 응답(result)에서 진행 중인 장의 미완성 일봉을 잘라낸다(제자리 수정, 잘라낸 봉 수 반환).
// 장중에 돈 실행이 미완성 봉으로 기술 신호·지표를 계산하면, 같은 asOf 아래 신호가 바뀌어 세션이 쓴
// techNote 와 어긋나고(2026-10-08 미국 18건) 2단계 이상이면 validate 가 커밋을 막는다.
function trimOpenBar(res, nowMs) {
  if (!res || !Array.isArray(res.timestamp) || !res.timestamp.length) return 0;
  const sd = openSessionDate(res.meta, nowMs);
  if (!sd) return 0;
  const off = (res.meta && res.meta.gmtoffset) || 0;
  let n = res.timestamp.length;
  while (n > 0 && localDate(res.timestamp[n - 1], off) >= sd) n--;
  const cut = res.timestamp.length - n;
  if (!cut) return 0;
  res.timestamp = res.timestamp.slice(0, n);
  const trimArrs = (o) => { if (o) Object.keys(o).forEach((k) => { if (Array.isArray(o[k])) o[k] = o[k].slice(0, n); }); };
  const ind = res.indicators || {};
  (ind.quote || []).forEach(trimArrs);
  (ind.adjclose || []).forEach(trimArrs);
  return cut;
}

async function yahooQuote(symbol, opts) {
  opts = opts || {};
  const nowSec = (opts.now != null ? opts.now : Date.now()) / 1000;
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(symbol) + "?interval=1d&range=5d";
  // 요청당 타임아웃 — 응답 지연으로 전체 갱신이 매달리지 않게(본문 수신까지 포함)
  const ctrl = new AbortController();
  const to = setTimeout(function () { ctrl.abort(); }, opts.timeoutMs || 8000);
  let j;
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
    if (!r.ok) throw new Error("HTTP " + r.status);
    j = await r.json();
  } finally {
    clearTimeout(to);
  }
  const res = j && j.chart && j.chart.result && j.chart.result[0];
  const m = res && res.meta;
  if (!m || typeof m.regularMarketPrice !== "number" || !isFinite(m.regularMarketPrice)) throw new Error("no price");
  // regularMarketTime 이 없으면 신선도를 판정할 수 없다 — 폐지·정지 심볼의 옛 시세가 필드 하나 빠졌다고 통과하지 않게 거부
  if (!m.regularMarketTime) throw new Error("no regularMarketTime (신선도 판정 불가)");
  const off = m.gmtoffset || 0;
  const date = localDate(m.regularMarketTime, off);
  const ageDays = (nowSec - m.regularMarketTime) / 86400;
  if (isFinite(ageDays) && ageDays > STALE_QUOTE_DAYS) throw new Error("stale quote (" + date + ", " + Math.round(ageDays) + "일 경과)");

  // 일봉(거래소 현지 날짜, 종가 있는 것만)
  const ts = res.timestamp || [];
  const cl = (res.indicators && res.indicators.quote && res.indicators.quote[0] && res.indicators.quote[0].close) || [];
  const bars = [];
  // 일봉 종가는 float32 잔여(336.6700134277344)가 붙어 오므로 소수 4자리로 정리
  ts.forEach(function (t, i) { const c = cl[i]; if (typeof c === "number" && isFinite(c)) bars.push({ d: localDate(t, off), c: Math.round(c * 10000) / 10000 }); });

  // 직전 거래일 종가 — price 날짜보다 앞선 마지막 일봉. 없으면 야후 previousClose
  let prevClose = null;
  for (let i = bars.length - 1; i >= 0; i--) { if (bars[i].d < date) { prevClose = bars[i].c; break; } }
  if (prevClose == null && typeof m.previousClose === "number" && isFinite(m.previousClose)) prevClose = m.previousClose;
  const changePct = prevClose && prevClose > 0 ? Math.round(((m.regularMarketPrice - prevClose) / prevClose) * 1000) / 10 : null;

  // 지금 정규장이 열려 있나 — currentTradingPeriod.regular 구간(+정산 여유) 안이면 장중
  const sessionDate = openSessionDate(m, nowSec * 1000);
  const inSession = !!sessionDate;
  let close = m.regularMarketPrice, closeDate = date;
  if (inSession) {
    // 진행 중인 장의 날짜보다 앞선 마지막 일봉 = 마지막으로 끝난 장
    close = null; closeDate = null;
    for (let i = bars.length - 1; i >= 0; i--) { if (bars[i].d < sessionDate) { close = bars[i].c; closeDate = bars[i].d; break; } }
  }
  return { price: m.regularMarketPrice, date: date, prevClose: prevClose, changePct: changePct,
    close: close, closeDate: closeDate, inSession: inSession };
}

// 끝난 장의 마지막 일봉 종가가 비어 있으면(null) meta 의 확정 시세로 채운다(제자리 수정, 채웠으면 true).
// 야후 장기(1y·10y) 일봉은 한국 종목의 당일 종가를 몇 시간씩 null 로 두곤 한다(2026-10-08 15시 UTC
// 005930·^KS11 등 — 5d 범위엔 값이 있음). 그대로 두면 그 봉이 건너뛰어져 기준일(asOf)이 하루 뒤로 밀리거나,
// 다른 시장 봉이 asOf 를 끌어올려 '날짜는 오늘·한국 신호는 어제'가 된다. 장이 끝났고(장중 아님) 그 봉의
// 날짜가 regularMarketTime 날짜와 같을 때만 채운다(장중 값으로 채우지 않는다).
function fillLastClose(res, nowMs) {
  if (!res || !Array.isArray(res.timestamp) || !res.timestamp.length) return false;
  const m = res.meta || {};
  if (openSessionDate(m, nowMs)) return false;
  if (typeof m.regularMarketPrice !== "number" || !isFinite(m.regularMarketPrice) || !m.regularMarketTime) return false;
  const q = res.indicators && res.indicators.quote && res.indicators.quote[0];
  if (!q || !Array.isArray(q.close)) return false;
  const i = res.timestamp.length - 1, off = m.gmtoffset || 0;
  if (q.close[i] != null || localDate(res.timestamp[i], off) !== localDate(m.regularMarketTime, off)) return false;
  const px = m.regularMarketPrice;
  q.close[i] = px;
  if (Array.isArray(q.high)) q.high[i] = typeof m.regularMarketDayHigh === "number" ? m.regularMarketDayHigh : px;
  if (Array.isArray(q.low)) q.low[i] = typeof m.regularMarketDayLow === "number" ? m.regularMarketDayLow : px;
  if (Array.isArray(q.open) && q.open[i] == null) q.open[i] = px;
  if (Array.isArray(q.volume) && q.volume[i] == null && typeof m.regularMarketVolume === "number") q.volume[i] = m.regularMarketVolume;
  const adj = res.indicators.adjclose && res.indicators.adjclose[0];
  if (adj && Array.isArray(adj.adjclose) && adj.adjclose[i] == null) adj.adjclose[i] = px;
  return true;
}

// 일봉을 '끝난 장' 기준으로 정리 — 진행 중인 장의 미완성 봉은 버리고, 끝난 장의 비어 있는 마지막 종가는 확정 시세로 채운다.
function settleDailyBars(res, nowMs) {
  const cut = trimOpenBar(res, nowMs);
  const filled = fillLastClose(res, nowMs);
  return { cut: cut, filled: filled };
}

module.exports = { yahooQuote, trimOpenBar, fillLastClose, settleDailyBars, openSessionDate, STALE_QUOTE_DAYS };
