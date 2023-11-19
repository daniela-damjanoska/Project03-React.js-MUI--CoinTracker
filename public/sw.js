const CACHE_STATIC_NAME = "static2";
const CACHE_DYNAMIC_NAME = "dynamic2";

const staticUrlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/index.html",
  "/SignUp",
  "/src/index.css",
  "/src/App.js",
  "favicon-16x16.png",
  "/Images/bg-img.png",
  "/Images/logo.png",
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener("install", (event) => {
  console.log("SERVICE WORKER installing ...", event);
  event.waitUntil(
    caches
      .open(CACHE_STATIC_NAME)
      .then((cache) => cache.addAll(staticUrlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  console.log("SERVICE WORKER activating ...", event);
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then((res) => {
            return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch((err) => {});
      }
    })
  );
});

// //CACHE ONLY STRATEGY
// self.addEventListener("fetch", (event) =>
//   event.respondWith(caches.match(event.request))
// );

// //NETWORK ONLY STRATEGY
// self.addEventListener("fetch", (event) =>
//   event.respondWith(fetch(event.request))
// );

//NETWORK WITH CACHE FALLBACK STRATEGY (not the best solution in case of very slow internet, this is very bad UX)
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     fetch(event.request).catch((err) => caches.match(event.request))
//   );
// });

//CACHE THEN NETWORK STRATEGY
//THIS CODE SHOULD NOT BE HERE, BUT I WILL USE IT LATER (now the fetch for thus url is in the signIn and signUp pages)
// const URL = "https://randomuser.me/api";
// let networkDataReceived = false; //maybe I need useState here, I will check this later

// fetch(URL).then((response) =>
//   response.json().then((data) => (networkDataReceived = true))
// );

// if ("caches" in window) {
//   caches
//     .match(URL)
//     .then((response) => {
//       if (response) {
//         return response.json();
//       }
//     })
//     .then((data) => {
//       //only if I don't have response from the network I will use the cache date, because I don't want to override network response with cache response
//       !networkDataReceived && console.log(data);
//     });
// }

//THIS CAN BE USED FOR CRITERIA EXPLANATION https://web.dev/articles/install-criteria   FOR CHROME, AND THAN i CAN MENTION THAT OTHER BROWSERS HAVE SIMILar criteria with some minor differences
//the above is from 2020 maybe I can check on microsoft page for something newer
