// 관심종목 검색용 사전 생성기 — 이름→코드.
//   ① 추천 편성(recommendations.js, 검증됨) + 한글 별칭 큐레이션(우선순위 앞)
//   ② KRX 전체 상장(KOSPI+KOSDAQ) — kind.krx.co.kr corpList (EUC-KR)
//   ③ 미국 보통주(Nasdaq/NYSE 등) — nasdaqtrader.com SymDir (nasdaqlisted + otherlisted)
// 사용법: node scripts/gen-tickers.js   (네트워크 필요; 실패 시 기존 tickers.js 유지)
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");

async function getText(url, enc) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" });
  if (!r.ok) throw new Error("HTTP " + r.status + " " + url);
  const buf = Buffer.from(await r.arrayBuffer());
  return new TextDecoder(enc || "utf-8").decode(buf);
}

// KRX corpList: 회사명(0)·시장(1)·종목코드(2) 테이블
function parseKrx(html) {
  const out = [];
  const rows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || [];
  rows.forEach((r) => {
    const cells = (r.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || []).map((c) => c.replace(/<[^>]+>/g, "").trim());
    if (cells.length < 3) return;
    const name = cells[0], code = cells[2];
    if (/^\d{6}$/.test(code) && name) out.push({ n: name, t: code, c: "korea" });
  });
  return out;
}

// nasdaqtrader SymDir: 파이프 구분. 보통주만(ETF·테스트·워런트/유닛 제외)
function parseUs(txt, symCol, nameCol, etfCol, testCol) {
  const out = [];
  const lines = txt.split(/\r?\n/);
  for (let i = 1; i < lines.length; i++) {
    const ln = lines[i];
    if (!ln || ln.startsWith("File Creation")) continue;
    const p = ln.split("|");
    if (p.length <= Math.max(symCol, nameCol, etfCol, testCol)) continue;
    const sym = (p[symCol] || "").trim(), name = (p[nameCol] || "").trim();
    if ((p[etfCol] || "").trim() === "Y") continue;
    if ((p[testCol] || "").trim() === "Y") continue;
    if (!/(Common Stock|Ordinary Shares|American Depositary)/.test(name)) continue;
    if (!/^[A-Z]{1,5}(\.[A-Z])?$/.test(sym)) continue;
    let nm = name
      .replace(/\s*-?\s*(Common Stock|Ordinary Shares|Class [A-Z] Common Stock|American Depositary Shares.*|Common Shares).*$/i, "")
      .trim().replace(/,$/, "")
      .replace(/,?\s*(Inc\.?|Corp\.?|Corporation|Ltd\.?|Company|Co\.?|plc|N\.V\.|S\.A\.|Holdings?)$/i, "")
      .trim().replace(/,$/, "");
    out.push({ n: nm || name, t: sym, c: "us" });
  }
  return out;
}

// 한글 별칭·정식명 큐레이션(전체 목록엔 영문명뿐이라 한글 검색 편의를 위해 유지)
const ALIASES = [
  ["레딧", "RDDT", "us"], ["구글", "GOOGL", "us"], ["알파벳", "GOOGL", "us"], ["애플", "AAPL", "us"],
  ["엔비디아", "NVDA", "us"], ["테슬라", "TSLA", "us"], ["아마존", "AMZN", "us"], ["마이크로소프트", "MSFT", "us"],
  ["메타", "META", "us"], ["넷플릭스", "NFLX", "us"], ["팔란티어", "PLTR", "us"], ["코인베이스", "COIN", "us"],
  ["버크셔", "BRK.B", "us"], ["TSMC", "TSM", "us"], ["브로드컴", "AVGO", "us"], ["일라이릴리", "LLY", "us"],
];

(async () => {
  global.window = {}; require(path.join(ROOT, "data/recommendations.js"));
  const D = global.window.STOCK_DATA || {};
  const seen = new Set(), list = [];
  const add = (e) => { const k = e.c + "|" + e.t + "|" + e.n; if (seen.has(k)) return; seen.add(k); list.push({ n: e.n, t: e.t, c: e.c }); };

  // ① 추천 편성 표시명 우선
  ["korea", "us"].forEach((c) => (D[c] || []).forEach((s) => { if (s && s.ticker) add({ n: s.name, t: s.ticker, c: c }); }));
  // ② 한글 별칭
  ALIASES.forEach(([n, t, c]) => add({ n, t, c }));

  // ③ 전체 상장 목록 fetch
  try {
    const [kospi, kosdaq, nas, oth] = await Promise.all([
      getText("https://kind.krx.co.kr/corpgeneral/corpList.do?method=download&marketType=stockMkt", "euc-kr"),
      getText("https://kind.krx.co.kr/corpgeneral/corpList.do?method=download&marketType=kosdaqMkt", "euc-kr"),
      getText("https://www.nasdaqtrader.com/dynamic/SymDir/nasdaqlisted.txt"),
      getText("https://www.nasdaqtrader.com/dynamic/SymDir/otherlisted.txt"),
    ]);
    parseKrx(kospi).forEach(add);
    parseKrx(kosdaq).forEach(add);
    parseUs(nas, 0, 1, 6, 3).forEach(add);   // Symbol|Security Name|…|Test|…|…|ETF
    parseUs(oth, 0, 1, 4, 6).forEach(add);   // ACT Symbol|Security Name|Exchange|CQS|ETF|Round|Test
  } catch (e) {
    console.error("전체 목록 fetch 실패 (" + e.message + ") — 기존 tickers.js 유지");
    process.exit(1);
  }

  const kr = list.filter((x) => x.c === "korea").length, us = list.filter((x) => x.c === "us").length;
  fs.writeFileSync(path.join(ROOT, "data/tickers.js"),
    "// 관심종목 검색 사전 — 이름→코드. KRX 전체 상장(KOSPI+KOSDAQ) + 미국 보통주(Nasdaq/NYSE) + 큐레이션 별칭.\n" +
    "// 재생성: node scripts/gen-tickers.js (KRX corpList + nasdaqtrader SymDir fetch·파싱).\n" +
    "window.TICKER_DICT = " + JSON.stringify(list) + ";\n");
  console.log("data/tickers.js 생성:", list.length, "종목 (한국 " + kr + " · 미국 " + us + ")");
})();
