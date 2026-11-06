#!/usr/bin/env node
// 화면 점검 — 저장소를 정적 서버로 띄워 index.html 을 헤드리스 크롬으로 열고 화면마다(홈·섹터 쪽·지수/돈의 흐름/시장 심리 상세·
// 추천 종목·종목 상세·내 종목·성과) ①가로 넘침 ②누르는 범위(24px 미만 = 실패, 36px 미만 = 주의) ③11px 미만 글자
// ④글자 대비(WCAG — 보통 글자 4.5:1, 큰 글자 3:1) ⑤말줄임으로 잘린 글자 ⑥화면보다 넓은 요소를 센다(2026-11-06 UI 점검에서 만듦).
// 배포 게이트가 아니다 — index.html 화면을 고친 뒤 숫자가 나빠지지 않았는지 보는 참고 도구다. 상승·하락 숫자의 빨강·파랑
// (--up·--down)은 국내 관례 색이라 대비가 4.5:1 에 조금 못 미쳐도 그대로 둔다(굵은 숫자).
// 외부 요청(시세 서버·야후·네이버·GitHub)은 막는다 — 저장소 파일만으로 그린 화면을 잰다.
// 사용: node scripts/ui-audit.js <출력 폴더> [너비=390] [dark] [--shots]
//   로컬: playwright(전역 설치면 NODE_PATH="$(npm root -g)")
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");

const ROOT = path.join(__dirname, "..");
const args = process.argv.slice(2);
const OUT = args[0];
if (!OUT) { console.log("사용: node scripts/ui-audit.js <출력 폴더> [너비=390] [dark] [--shots]"); process.exit(2); }
const W = +(args.find((a) => /^\d+$/.test(a)) || 390), DARK = args.includes("dark"), SHOTS = args.includes("--shots");
fs.mkdirSync(OUT, { recursive: true });
const TYPE = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json", ".css": "text/css" };

function serve() {
  return new Promise((ok) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      if (p.endsWith("/")) p += "index.html";
      const f = path.join(ROOT, p);
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { "Content-Type": TYPE[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
      res.end(fs.readFileSync(f));
    }).listen(0, "127.0.0.1", () => ok(srv));
  });
}

async function launch() {
  for (const m of ["playwright", "playwright-core"]) {
    let pw;
    try { pw = require(m); } catch (_e) { continue; }
    for (const o of process.env.CHROME_PATH ? [{ executablePath: process.env.CHROME_PATH }] : [{}, { channel: "chrome" }]) {
      try { return await pw.chromium.launch(o); } catch (_e) {}
    }
  }
  return null;
}

// 브라우저 안에서 도는 점검 — root 안(없으면 문서 전체)의 보이는 요소만
function auditIn(rootSel) {
  const root = rootSel ? document.querySelector(rootSel) : document.body;
  const vw = window.innerWidth;
  const out = { overflowX: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vw, small: [], tiny: [], lowC: [], cut: [], wide: [] };
  if (!root) return out;
  const vis = (el) => { const s = getComputedStyle(el); if (s.visibility === "hidden" || s.display === "none" || +s.opacity === 0) return false; const b = el.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  const desc = (el) => { const t = (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40); return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "") + (t ? " «" + t + "»" : ""); };
  root.querySelectorAll("a[href], button, [role=button], [role=tab], input, select, summary, label[for]").forEach((el) => {
    if (!vis(el)) return;
    if (el.tagName === "A" && getComputedStyle(el).display === "inline") return;   // 문장 속 링크는 제외
    const b = el.getBoundingClientRect(), m = Math.min(b.width, b.height);
    if (m < 36) out.small.push({ el: desc(el), w: Math.round(b.width), h: Math.round(b.height), lvl: m < 24 ? "fail" : "warn" });
  });
  const lum = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(",").map(parseFloat); const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return { L: 0.2126 * f(p[0]) + 0.7152 * f(p[1]) + 0.0722 * f(p[2]), a: p.length > 3 ? p[3] : 1 }; };
  const bgOf = (el) => { for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const l = lum(getComputedStyle(e).backgroundColor); if (l && l.a > 0.5) return l; } return lum(getComputedStyle(document.body).backgroundColor) || { L: 1 }; };
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), seen = new Set();
  let n;
  while ((n = walker.nextNode())) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement;
    if (!el || seen.has(el) || !vis(el) || el.closest("svg")) continue;
    seen.add(el);
    const s = getComputedStyle(el), fsz = parseFloat(s.fontSize), fw = +s.fontWeight || 400;
    if (fsz < 11) out.tiny.push({ el: desc(el), fs: fsz });
    const fg = lum(s.color), bg = bgOf(el);
    if (fg && bg) {
      const mix = fg.a < 1 ? fg.a * fg.L + (1 - fg.a) * bg.L : fg.L;   // 글자색 투명도는 배경과 섞어서
      const cr = (Math.max(mix, bg.L) + 0.05) / (Math.min(mix, bg.L) + 0.05);
      if (cr < (fsz >= 24 || (fsz >= 18.66 && fw >= 700) ? 3 : 4.5)) out.lowC.push({ el: desc(el), cr: Math.round(cr * 100) / 100, fs: fsz });
    }
    if (s.textOverflow === "ellipsis" && el.scrollWidth > el.clientWidth + 1) out.cut.push({ el: desc(el) });
  }
  root.querySelectorAll("*").forEach((el) => {
    if (!vis(el)) return;
    const b = el.getBoundingClientRect();
    if (b.right <= vw + 1 || getComputedStyle(el).position === "fixed") return;
    for (let p = el.parentElement; p; p = p.parentElement) { if (/hidden|auto|scroll/.test(getComputedStyle(p).overflowX)) return; }
    out.wide.push({ el: desc(el), right: Math.round(b.right) });
  });
  return out;
}

(async () => {
  const browser = await launch();
  if (!browser) { console.log("브라우저를 띄우지 못했다(playwright 확인)."); process.exit(1); }
  const srv = await serve();
  const base = "http://127.0.0.1:" + srv.address().port;
  const ctx = await browser.newContext({ viewport: { width: W, height: W < 600 ? 844 : 900 }, serviceWorkers: "block", deviceScaleFactor: 1,
    colorScheme: DARK ? "dark" : "light", hasTouch: W < 600, isMobile: W < 600 });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e && e.message || e)));
  await page.route((u) => !String(u).startsWith(base), (r) => r.abort());
  await page.goto(base + "/index.html", { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelectorAll("#idxGrid > *").length > 0, null, { timeout: 20000 });
  await page.waitForTimeout(600);
  const tag = W + (DARK ? "-dark" : ""), report = {};
  const audit = async (name, rootSel) => {
    const r = await page.evaluate(auditIn, rootSel || null);
    report[name] = { overflowX: r.overflowX, smallFail: r.small.filter((x) => x.lvl === "fail").length, smallWarn: r.small.filter((x) => x.lvl === "warn").length,
      tiny: r.tiny.length, lowC: r.lowC.length, cut: r.cut.length, wide: r.wide.length,
      samples: { smallFail: r.small.filter((x) => x.lvl === "fail").slice(0, 12), smallWarn: r.small.filter((x) => x.lvl === "warn").slice(0, 12), tiny: r.tiny.slice(0, 12),
        lowC: r.lowC.sort((a, b) => a.cr - b.cr).slice(0, 12), cut: r.cut.slice(0, 10), wide: r.wide.slice(0, 6) } };
    if (SHOTS) await page.screenshot({ path: path.join(OUT, tag + "-" + name + ".png"), fullPage: !rootSel });
  };
  const tab = async (t) => { await page.evaluate((t) => { const b = document.querySelector('#tabbar [data-tab="' + t + '"]'); if (b) b.click(); }, t); await page.waitForTimeout(500); };
  const openSheet = async (sel) => {
    await page.evaluate((sel) => { const e = document.querySelector(sel); if (e) { e.scrollIntoView({ block: "center" }); e.click(); } }, sel);
    await page.waitForFunction(() => { const s = document.getElementById("sheet"); return s && !s.hidden && document.getElementById("shBody").children.length > 0; }, null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1200);
  };
  const closeSheet = async () => { await page.evaluate(() => { const b = document.getElementById("shBack"); if (b && !document.getElementById("sheet").hidden) b.click(); }); await page.waitForTimeout(400); };

  await audit("home");
  await page.evaluate(() => { const b = document.querySelector('#mkTabs [data-mkp="1"]'); if (b) b.click(); });
  await page.waitForFunction(() => document.querySelectorAll("#secBody .sx").length > 0, null, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(400);
  await audit("home-sector", "#mkPager");
  await page.evaluate(() => { const b = document.querySelector('#mkTabs [data-mkp="0"]'); if (b) b.click(); });
  await openSheet("#idxGrid [data-open]"); await audit("idx-detail", "#sheet"); await closeSheet();
  await openSheet("[data-liq]"); await audit("flow-detail", "#sheet"); await closeSheet();
  await openSheet("[data-se]"); await audit("senti-detail", "#sheet"); await closeSheet();
  await tab("reco"); await audit("reco");
  await openSheet("#recoList [data-open]"); await audit("stock-detail", "#sheet"); await closeSheet();
  await tab("mine"); await audit("mine");
  await tab("perf"); await page.waitForTimeout(1200); await audit("perf");
  await browser.close(); srv.close();
  fs.writeFileSync(path.join(OUT, "ui-audit-" + tag + ".json"), JSON.stringify({ errs, report }, null, 1));
  console.log("화면별(" + tag + "): 넘침px · 누름<24 · 누름<36 · 글자<11 · 대비 미달 · 잘림 · 넓은 요소");
  Object.keys(report).forEach((k) => { const r = report[k]; console.log("  " + k.padEnd(13) + " " + [r.overflowX, r.smallFail, r.smallWarn, r.tiny, r.lowC, r.cut, r.wide].join(" · ")); });
  console.log("페이지 오류:", errs.length ? errs.slice(0, 5) : "없음", "· 자세한 목록:", path.join(OUT, "ui-audit-" + tag + ".json"));
})();
