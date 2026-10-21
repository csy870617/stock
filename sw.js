// 서비스워커 — 앱 설치(PWA) 및 오프라인 대비 캐시
// 전략: 네트워크 우선(항상 최신 데이터를 먼저 시도), 실패 시에만 캐시 사용.
// 데이터 정확성이 최우선이므로 캐시가 최신 데이터를 가리는 일이 없도록 한다.
var CACHE = "mystock-v48";
// index.html 이 로드하는 스크립트 전부를 프리캐시해야 오프라인에서 앱이 온전히 뜬다
// (하나라도 빠지면 오프라인 첫 로드에서 그 데이터 레이어가 통째로 비어 보인다).
var SHELL = [
  "./",
  "./index.html",
  "./app.webmanifest",
  "./data/config.js",
  "./data/recommendations.js",
  "./data/coverage-status.js",
  "./data/candidates.js",
  "./data/quotes.js",
  "./data/liquidity.js",
  "./data/liquidity-auto.js",
  "./data/indices.js",
  "./data/index-notes.js",
  "./data/stock-ta.js",
  "./data/events.js",
  "./data/fundamentals.js",
  "./data/history.js",
  "./data/tickers.js",
  "./scripts/lib-ta.js",
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
  e.respondWith(
    fetch(e.request).then(function (res) {
      // 정상 응답(2xx, 기본 타입)만 캐시 — 404/500 등 오류 응답이 오프라인 캐시를 오염시키지 않도록
      if (res && res.ok && res.type === "basic") {
        var copy = res.clone();
        // 버전 꼬리표(?v=…)는 떼고 저장한다 — 종목 차트(data/chart/*.json?v=갱신시각)의 옛 버전이 기기에 쌓이지 않게.
        // 오프라인 폴백은 ignoreSearch 로 찾으므로 그대로 맞는다.
        var key = e.request.url.split("?")[0];
        caches.open(CACHE).then(function (c) { c.put(key, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
