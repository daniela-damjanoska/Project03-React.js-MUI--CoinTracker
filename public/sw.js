const CACHE_NAME = "first-app";
const urlsToCache = ["/", "/index.html", "/src/index.css", "/src/App.js"];

self.addEventListener("install", (event) => {
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     return cache.addAll(urlsToCache);
  //   })
  // );
  console.log("SERVICE WORKER instaling......", event);
});

self.addEventListener("activate", (event) => {
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     return cache.addAll(urlsToCache);
  //   })
  // );
  console.log("SERVICE WORKER activating......", event);
  // return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  console.log("SERVICE WORKER fetching ......", event);
  event.RespondWith(fetch(event.request));
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
