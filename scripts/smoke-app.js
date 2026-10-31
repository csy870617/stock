#!/usr/bin/env node
// 배포 전 연기 시험 — 저장소를 정적 서버로 띄워 index.html 을 헤드리스 크롬으로 열고, 홈 → 추천 종목(종목 상세 하나 열기) →
// 미국 → 내 종목 → 성과 → 과거 보기를 차례로 돈다. 앱 오류(잡히지 않은 예외·데이터 파일 문법 오류·우리 파일 404)가 하나라도 나면
// exit 1 → deploy-pages 가 배포하지 않는다(지난 정상 버전이 그대로 남는다). 2026-10-25 약점 점검: 그 전엔 validate-reco.js 만 봐서
// index.html 이나 다른 데이터 파일이 깨져도 빈 화면이 그대로 배포됐다.
// 외부 요청(시세 서버·야후·네이버·GitHub·CDN)은 막는다 — 네트워크 상태와 무관하게 저장소 파일만 시험한다.
// 브라우저를 띄우지 못하면(실행 환경 문제) 경고만 하고 exit 0 — 시험 장치 문제로 매일 데이터 배포가 멈추지 않게 한다.
// 사용: node scripts/smoke-app.js
//   로컬: playwright(전역 설치면 NODE_PATH="$(npm root -g)"), CI: playwright-core + 러너에 설치된 Chrome(channel chrome) 또는 CHROME_PATH
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");

const ROOT = path.join(__dirname, "..");
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
    const tries = process.env.CHROME_PATH ? [{ executablePath: process.env.CHROME_PATH }] : m === "playwright" ? [{}, { channel: "chrome" }] : [{ channel: "chrome" }, {}];
    for (const o of tries) {
      try { return await pw.chromium.launch(o); } catch (_e) {}
    }
  }
  return null;
}

async function run(browser, base) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("페이지 오류: " + String(e && e.message || e)));
  page.on("response", (r) => { const u = r.url(); if (u.startsWith(base) && r.status() >= 400) errors.push("파일 없음(" + r.status() + "): " + u.slice(base.length)); });
  await page.route((url) => !String(url).startsWith(base), (r) => r.abort());   // 외부 요청은 막는다
  const step = async (name, fn) => {
    try { await fn(); console.log("  ✓ " + name); } catch (e) { errors.push(name + " 실패: " + String(e && e.message || e).split("\n")[0]); }
  };
  const T = { timeout: 20000 };
  const tab = (t) => page.click('#tabbar [data-tab="' + t + '"]');

  await page.goto(base + "/index.html", { waitUntil: "load", timeout: 60000 });
  await step("홈(지수·Top Pick)", () => page.waitForFunction(() => document.querySelectorAll("#idxGrid > *").length > 0 || document.querySelectorAll("#picksList > *").length > 0, null, T));
  await step("추천 종목 목록", async () => { await tab("reco"); await page.waitForFunction(() => document.querySelectorAll("#recoList .row").length > 0, null, T); });
  await step("종목 상세 열기·닫기", async () => {
    await page.click("#recoList [data-open]");
    await page.waitForFunction(() => { const s = document.getElementById("sheet"); return s && !s.hidden && document.getElementById("shName").textContent && document.getElementById("shBody").children.length > 0; }, null, T);
    await page.waitForTimeout(1500);   // 차트·현재 추세(data/chart·data/trend)를 받아 그릴 시간
    await page.click("#shBack");
    await page.waitForFunction(() => document.getElementById("sheet").hidden, null, T);
  });
  await step("미국 목록", async () => {
    await page.click('#countrySeg button[data-c="us"]');
    await page.waitForFunction(() => document.querySelectorAll("#recoList .row").length > 0, null, T);
  });
  await step("내 종목", async () => { await tab("mine"); await page.waitForFunction(() => !document.getElementById("pg-mine").hidden, null, T); });
  await step("성과", async () => {
    await tab("perf");
    await page.waitForFunction(() => { const b = document.getElementById("perfBody"); return b && b.querySelector(".blk") && !/불러오는 중/.test(b.textContent); }, null, T);
    const fail = await page.evaluate(() => /불러오기 실패|불러오지 못했/.test(document.getElementById("perfBody").textContent));
    if (fail) throw new Error("perf.json 을 읽지 못했다");
  });
  await step("과거 보기", async () => {
    const n = await page.evaluate(() => { const s = document.getElementById("asofSel"); return s ? s.options.length : 0; });
    if (n < 2) return;   // 고를 과거가 없으면 건너뛴다
    await page.evaluate(() => { const s = document.getElementById("asofSel"); s.value = s.options[1].value; s.dispatchEvent(new Event("change")); });
    await page.waitForFunction(() => !document.getElementById("pastView").hidden && document.querySelectorAll("#pastView tr[data-pt]").length > 0, null, T);
    await page.click("#pastView .past-back");
  });
  await ctx.close();
  return errors;
}

(async () => {
  const browser = await launch();
  if (!browser) {
    console.log("::warning::연기 시험 건너뜀 — 브라우저를 띄우지 못했다(playwright·Chrome 확인). 앱 오류 검사는 하지 않았다.");
    process.exit(0);
  }
  const srv = await serve();
  const base = "http://127.0.0.1:" + srv.address().port;
  let errors = [];
  try {
    for (let k = 0; k < 2; k++) {   // 느린 러너의 일시적 시간 초과는 한 번 다시 해 본다(페이지 오류는 다시 해도 같다)
      console.log("연기 시험" + (k ? " (다시)" : "") + " — " + base);
      errors = await run(browser, base);
      if (!errors.length || errors.some((e) => /^페이지 오류|^파일 없음/.test(e))) break;
    }
  } finally {
    await browser.close();
    srv.close();
  }
  if (errors.length) {
    console.log("연기 시험 실패 — 배포하지 않는다:");
    errors.forEach((e) => console.log("  ✗ " + e));
    process.exit(1);
  }
  console.log("연기 시험 통과");
})();
