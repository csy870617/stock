// 서비스워커 — 앱 설치(PWA) 및 오프라인 대비 캐시
// 전략: 네트워크 우선(항상 최신 데이터를 먼저 시도), 실패 시에만 캐시 사용.
// 데이터 정확성이 최우선이므로 캐시가 최신 데이터를 가리는 일이 없도록 한다.
var CACHE = "mystock-v3";
var SHELL = [
  "./",
  "./index.html",
  "./data/recommendations.js",
  "./data/liquidity.js",
  "./data/history.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
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
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
