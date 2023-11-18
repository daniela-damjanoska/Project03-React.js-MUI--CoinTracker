const CACHE_NAME = "first-app";
const urlsToCache = ["/", "/index.html", "/src/index.css", "/src/App.js"];

self.addEventListener("install", (event) => {
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     return cache.addAll(urlsToCache);
  //   })
  // );
  console.log("SERVICE WORKER installing......", event);
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
  event.respondWith(fetch(event.request));
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

//THIS CAN BE USED FOR CRITERIA EXPLANATION https://web.dev/articles/install-criteria   FOR CHROME, AND THAN i CAN MENTION THAT OTHER BROWSERS HAVE SIMILar criteria with some minor differences
//the above is from 2020 maybe I can check on microsoft page for something newer
