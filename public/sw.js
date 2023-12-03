const STATIC_CACHE_NAME = "site-static-2";
const DYNAMIC_CACHE_NAME = "site-dynamic-2";

const staticUrlsToCache = [
  "/index.html",
  "/offline",
  "/overview",
  "/statistics",
  "/categories",
  "/src/index.css",
  "/src/App.js",
  "favicon-16x16.png",
  "/Images/bg-img.png",
  "/Images/logo.png",
  "/Images/LogoMenu.png",
  "/static/js/bundle.js",
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        //delete the oldest item and keep repeating this process until we reach the limit
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("install", (event) => {
  console.log("SERVICE WORKER installing ...", event);
  /* eslint-disable-next-line no-restricted-globals */
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(staticUrlsToCache))
  );
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("activate", (event) => {
  console.log("SERVICE WORKER activating ...", event);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map(
            (key) =>
              key !== STATIC_CACHE_NAME &&
              key !== DYNAMIC_CACHE_NAME &&
              caches.delete(key)
          )
        )
      )
  );
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("fetch", (event) => {
  console.log("SERVICE WORKER fetching ...");
  if (event.request.url.indexOf("firestore.googleapis.com" < 0)) {
    event.respondWith(
      caches
        .match(event.request)
        .then(
          (cacheRes) =>
            cacheRes ||
            fetch(event.request).then((fetchRes) =>
              caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(DYNAMIC_CACHE_NAME, 20);
                return fetchRes;
              })
            )
        )
        .catch(() => {})
    );
  }
});
