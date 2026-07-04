#!/usr/bin/env node
// Yahoo Finance API 직접 호출로 현재가를 정확히 갱신한다.
//   전제: 환경 네트워크 정책에서 query1.finance.yahoo.com (가능하면 query2 도) 허용 필요.
//   호스트가 막혀 있으면(현재 기본값) 모든 조회가 실패 처리되어 "무동작 + 실패 보고"만 하고
//   기존 데이터는 절대 훼손하지 않는다.
//
// 하는 일:
//   - data/recommendations.js 의 각 종목 price · priceDate · upside 를 최신 종가로 갱신
//     (targetPrice·thesis·risks 등 논거/구조는 그대로 유지 — 숫자만 교체)
//   - KOSPI(^KS11), S&P 500(^GSPC) 종가도 조회해 마지막에 INDEX_* 로 출력 (snapshot.js 인자용)
//   - 조회 실패 종목은 기존 값을 그대로 두고 실패로 집계
//
// 전송은 curl 로 한다(이 환경의 프록시·CA 번들을 그대로 사용). Node fetch 는 프록시를 자동 사용하지 않음.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const RECO = path.join(ROOT, "data", "recommendations.js");

// Yahoo v8 chart — 공개 엔드포인트(크럼 불필요). 최근 종가와 거래일을 반환.
function yahoo(symbol) {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(symbol) + "?interval=1d&range=5d";
  var out;
  try {
    out = execFileSync("curl",
      ["-s", "--max-time", "20", "-A", "Mozilla/5.0", "-H", "Accept: application/json", url],
      { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
  } catch (e) { return null; }               // 403(호스트 미허용)·타임아웃 등 → null
  var j;
  try { j = JSON.parse(out); } catch (e) { return null; }
  var r = j && j.chart && j.chart.result && j.chart.result[0];
  var m = r && r.meta;
  if (!m || typeof m.regularMarketPrice !== "number" || !isFinite(m.regularMarketPrice)) return null;
  var date = null;
  if (m.regularMarketTime) {
    var off = (m.gmtoffset || 0) * 1000;     // 거래소 현지시각 기준 날짜
    date = new Date(m.regularMarketTime * 1000 + off).toISOString().slice(0, 10);
  }
  return { price: m.regularMarketPrice, date: date };
}

function usSymbol(t) { return t === "BRK.B" ? "BRK-B" : t; }
function fmtPrice(raw, country) {
  return country === "korea" ? Math.round(raw) : Math.round(raw * 100) / 100;
}

global.window = {};
require(RECO);
var D = global.window.STOCK_DATA;
if (!D) { console.error("recommendations.js 로드 실패"); process.exit(1); }

// 고유 티커 목록 (여러 주제 중복 티커는 한 번만 조회)
var uniq = {};
["korea", "us"].forEach(function (c) {
  (D[c] || []).forEach(function (s) {
    if (!uniq[s.ticker]) {
      uniq[s.ticker] = {
        ticker: s.ticker, country: c,
        symbol: c === "korea" ? s.ticker + ".KS" : usSymbol(s.ticker)
      };
    }
  });
});

// 조회 (실패 시 1회 재시도)
var priceMap = {}, ok = 0, fail = 0, failed = [];
Object.keys(uniq).forEach(function (t) {
  var u = uniq[t];
  var res = yahoo(u.symbol) || yahoo(u.symbol);
  if (res) {
    priceMap[t] = { price: fmtPrice(res.price, u.country), date: res.date, country: u.country };
    ok++;
  } else { fail++; failed.push(t); }
});

// 텍스트에 반영 — 각 종목 헤더가 한 줄에 있으므로 라인 단위로 안전하게 교체(구조·논거 보존)
var lines = fs.readFileSync(RECO, "utf8").split("\n");
var updated = 0;
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var tk = line.match(/ticker:\s*"([^"]+)"/);
  if (!tk || !/\bprice:\s*[\d.]+/.test(line)) continue;
  var pm = priceMap[tk[1]];
  if (!pm) continue;
  var newLine = line.replace(/\bprice:\s*[\d.]+/, "price: " + pm.price);
  if (pm.date) newLine = newLine.replace(/priceDate:\s*"[^"]*"/, 'priceDate: "' + pm.date + '"');
  var tp = line.match(/targetPrice:\s*([\d.]+)/);
  if (tp) {
    var up = (parseFloat(tp[1]) - pm.price) / pm.price * 100;
    newLine = newLine.replace(/\bupside:\s*-?[\d.]+/, "upside: " + (Math.round(up * 10) / 10));
  }
  if (newLine !== line) { lines[i] = newLine; updated++; }
}
if (updated > 0) fs.writeFileSync(RECO, lines.join("\n"));

// 벤치마크 지수
var kospi = yahoo("^KS11");
var sp500 = yahoo("^GSPC");

console.log("가격 갱신: 성공 " + ok + "종목 / 실패 " + fail + "종목" +
  (failed.length ? " [" + failed.join(", ") + "]" : ""));
console.log("반영된 종목 라인: " + updated + (ok === 0 ? "  (야후 호스트가 아직 허용되지 않았을 수 있음 — 기존 데이터는 그대로 유지됨)" : ""));
console.log("INDEX_KOSPI=" + (kospi ? kospi.price : ""));
console.log("INDEX_SP500=" + (sp500 ? sp500.price : ""));
