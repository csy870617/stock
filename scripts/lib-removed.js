// 편성에서 빠진 종목 카드 보관 — data/removed.json (2026-11-06 사용자 '제외된 종목도 상세 화면 볼 수 있게')
//   update-reco.js 가 remove 할 때 지우기 직전 카드를 여기 남기고(upsertRemoved), 앱은 편성에 없는 종목을 열 때만
//   이 파일을 받아 '제외 당시 분석'(논거·리스크·실적·밸류·기술 대응·목표가)을 보인다. 지금 시세·차트는 앱이 시세 서버에서 받는다.
//   git 이력에서 지난 편출을 되살리는 도구는 scripts/backfill-removed.js.
"use strict";
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "data", "removed.json");
const KEEP_DAYS = 400;   // 편출 뒤 이만큼 지난 카드는 지운다(성과 탭 '최근 90일 편출'보다 넉넉히)
// 화면에 쓰는 필드만 — 회전 기록(verifiedAt·aiCheckedAt 등)과 매일 바뀌는 시세 보조 필드는 뺀다
const FIELDS = ["theme", "tier", "watchTag", "name", "ticker", "market", "price", "priceDate", "targetPrice", "tpSource", "tpAsOf", "tpHigh", "tpLow",
  "dividendYield", "earnings", "thesis", "risks", "valueNote", "techNote", "aiTarget", "aiBasis", "aiAsOf", "chartUrl", "sources"];

function trimCard(s) {
  const o = {};
  FIELDS.forEach((k) => { if (s[k] !== undefined && s[k] !== null && s[k] !== "") o[k] = s[k]; });
  if (Array.isArray(o.sources)) o.sources = o.sources.slice(0, 4);
  return o;
}
function load() {
  try { const j = JSON.parse(fs.readFileSync(FILE, "utf8")); if (j && j.items) return j; } catch (_e) { /* 없거나 깨짐 → 새로 */ }
  return { asOf: null, note: "", items: {} };
}
const NOTE = "편성에서 빠진 종목의 마지막 카드(제외 당시 분석) — update-reco.js 가 remove 할 때 남기고 앱이 편성에 없는 종목을 열 때 읽는다. 손으로 고치지 않는다.";
// present: 지금 편성에 있는 'c|t' 모음 — 다시 편입된 종목은 지금 카드가 있으므로 보관하지 않는다
function save(doc, today, present) {
  const cut = new Date(Date.parse(today + "T00:00:00Z") - KEEP_DAYS * 864e5).toISOString().slice(0, 10);
  const items = {};
  Object.keys(doc.items).sort().forEach((k) => {
    if ((doc.items[k].removedAt || "") >= cut && !(present && present.has(k))) items[k] = doc.items[k];
  });
  const out = { asOf: today, note: NOTE, items };
  fs.writeFileSync(FILE, JSON.stringify(out) + "\n");
  return Object.keys(items).length;
}
// recs: [{c, card, removedAt, reason}] — 같은 종목은 더 늦게 빠진 카드만 남긴다
function upsertRemoved(recs, today, present) {
  const doc = load();
  if (!recs.length && !(present && Object.keys(doc.items).some((k) => present.has(k)))) return null;
  recs.forEach((r) => {
    const key = r.c + "|" + r.card.ticker, prev = doc.items[key];
    if (prev && (prev.removedAt || "") > r.removedAt) return;
    doc.items[key] = { c: r.c, t: r.card.ticker, n: r.card.name, th: r.card.theme, tier: r.card.tier || null,
      removedAt: r.removedAt, reason: r.reason || null, card: trimCard(r.card) };
  });
  return save(doc, today, present);
}
// 지금 편성(recommendations STOCK_DATA)의 'c|t' 모음
function presentSet(D) {
  const s = new Set();
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((x) => s.add(c + "|" + x.ticker)));
  return s;
}
// 결격 판정 메모(candidate-notes.json defects[나라|주제][티커].note) — 편출 사유로 보인다
function defectNote(notes, c, th, t) {
  const g = notes && notes.defects && notes.defects[c + "|" + th], d = g && g[t];
  return d && d.note ? { verdict: d.verdict || null, note: d.note, asOf: d.asOf || null } : null;
}

// 결격 신호(candidates.js 의 편성 결격 줄) — 판정 메모가 없을 때 사유로 쓴다
function defectFlags(cands, c, th, t) {
  const g = cands && cands.groups && cands.groups[c + "|" + th], d = g && (g.defects || []).filter((x) => x.ticker === t)[0];
  if (!d) return null;
  const msg = d.note || (d.flags || []).map((f) => f.msg).filter(Boolean).join(" · ");
  return msg ? { verdict: d.verdict || d.state || null, note: msg, asOf: d.judged || null } : null;
}

module.exports = { FILE, trimCard, upsertRemoved, defectNote, defectFlags, presentSet, load, save };
