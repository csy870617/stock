// 서비스워커 — 앱 설치(PWA) 및 오프라인 대비 캐시
// 전략: 네트워크 우선(항상 최신 데이터를 먼저 시도 — 브라우저 HTTP 캐시도 건너뛰고 서버에 확인), 실패 시에만 캐시 사용.
// 데이터 정확성이 최우선이므로 캐시가 최신 데이터를 가리는 일이 없도록 한다.
var CACHE = "mystock-v111";
// index.html 이 로드하는 스크립트 전부를 프리캐시해야 오프라인에서 앱이 온전히 뜬다
// (하나라도 빠지면 오프라인 첫 로드에서 그 데이터 레이어가 통째로 비어 보인다).
// 검색 사전(tickers.js)은 쓸 때 받지만 오프라인 검색을 위해 설치 때 미리 받아 둔다(첫 화면을 막지 않는다).
// 전체 스냅샷(history.js)은 계속 커지므로 프리캐시하지 않는다 — '과거 보기'를 열 때 받으면 그때 캐시된다.
var SHELL = [
  "./",
  "./index.html",
  "./app.webmanifest",
  "./data/config.js",
  "./data/recommendations.js",
  "./data/coverage-status.js",
  "./data/candidates.js",
  "./data/pick-scores.js",
  "./data/earn-risk.js",
  "./data/news.js",
  "./data/ai-status.js",
  "./data/quotes.js",
  "./data/liquidity.js",
  "./data/liquidity-auto.js", "./data/liquidity-flow.js", "./data/sentiment.js",
  "./data/indices.js", "./data/sectors.js", "./data/sector-notes.js",
  "./data/index-notes.js",
  "./data/stock-ta.js",
  "./data/events.js",
  "./data/fundamentals.js",
  "./data/history-index.js",
  "./data/trend-summary.js",
  "./data/tickers.js",
  "./scripts/lib-ta.js",
  "./icon2.png",
  "./icons/app-icon-192-v2.png",
  "./icons/app-icon-512-v2.png"
];

self.addEventListener("install", function (e) {
  // 개별 자원을 독립적으로 캐시한다. addAll 은 목록 중 하나만 실패해도 전체가 reject 되어
  // SW 설치 자체가 실패하므로(아이콘/데이터 파일 하나만 빠져도 PWA 캐시가 통째로 무산),
  // allSettled 로 일부 실패를 허용해 설치는 항상 성공하도록 한다.
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.allSettled(SHELL.map(function (u) { return c.add(u); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      // 같은 주소(csy870617.github.io)의 다른 앱들과 저장소를 함께 쓰므로 이 앱의 옛 캐시(mystock-…)만 지운다
      // (남의 캐시를 지우면 그 앱이 받아 둔 음성·자료가 사라진다)
      return Promise.all(keys.filter(function (k) { return k !== CACHE && k.indexOf("mystock-") === 0; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // 페이지가 캐시 방식을 따로 정하지 않은 요청(데이터 스크립트·차트 파일 등)은 브라우저 저장본을 그대로 쓰지 않고 서버에 바뀌었는지 묻는다
  // (cache: "no-cache" — 그대로면 304 로 몇 바이트만 오간다). GitHub Pages 가 파일을 10분(max-age=600) 재사용하게 보내서,
  // 분석·시세 파일이 막 올라온 뒤 새로고침해도 최대 10분 동안 옛 파일이 나왔다(2026-11-18 사용자 '새로고침 했을 때 최대한 최신으로').
  // 페이지 이동(화면 자체)은 그대로 둔다 — 새로고침이면 브라우저가 이미 서버에 묻고, 요청을 새로 만들면 주소 이동(리디렉트) 처리가 깨질 수 있다.
  var req = e.request.mode !== "navigate" && e.request.cache === "default" ? new Request(e.request, { cache: "no-cache" }) : e.request;
  e.respondWith(
    fetch(req).then(function (res) {
      // 정상 응답(2xx, 기본 타입)만 캐시 — 404/500 등 오류 응답이 오프라인 캐시를 오염시키지 않도록
      if (res && res.ok && res.type === "basic") {
        var copy = res.clone();
        // 버전 꼬리표(?v=…)는 떼고 저장한다 — 종목 차트·현재 추세(data/chart·data/trend/*.json?v=갱신시각)의 옛 버전이 기기에 쌓이지 않게.
        // 오프라인 폴백은 ignoreSearch 로 찾으므로 그대로 맞는다.
        var key = e.request.url.split("?")[0];
        caches.open(CACHE).then(function (c) { c.put(key, copy); });
        // 페이지에 넘기는 응답은 '매번 확인'(no-cache)으로 바꿔 단다 — 크롬은 새로고침 때 메모리에 남은 스크립트를 서비스워커에 묻지도 않고
        // 그대로 다시 쓰는데(GitHub Pages 의 max-age=600 동안), 이 표시가 있으면 다음 새로고침에 반드시 다시 묻는다(2026-11-18 시험으로 확인).
        if (req !== e.request) {
          var h = new Headers(res.headers);
          h.set("Cache-Control", "no-cache");
          return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
        }
      }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
