const STATIC_CACHE_NAME = "site-static-5";
const DYNAMIC_CACHE_NAME = "site-dynamic-5";

const staticUrlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/index.html",
  "/offline",
  "/src/index.css",
  "/src/App.js",
  "favicon-16x16.png",
  "/Images/bg-img.png",
  "/Images/logo.png",
  "/Images/LogoMenu.png",
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        //we want to delete the oldest item and keep repeating this process till we reach the number/size that set as a limit
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (event) => {
  console.log("SERVICE WORKER installing ...", event);
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(staticUrlsToCache))
  );
});

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
  // return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.indexOf("firestore.googleapis.com" === -1)) {
    event.respondWith(
      caches
        .match(event.request)
        .then(
          (cacheRes) =>
            cacheRes ||
            fetch(event.request).then((fetchRes) =>
              caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(DYNAMIC_CACHE_NAME, 15);
                return fetchRes;
              })
            )
        )
        .catch(() => {
          //conditional rendering the offline page (TO DO https://www.youtube.com/watch?v=K9NXQZxKMko&list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7&index=20 )
          //we can also add another condition and render a dummy image if there is no image in the cache
          // console.log("EVENT TEST", event.request.url);
          return caches.match("/Images/bg-img.png");
        })
    );
  }
});
//CACHE WITH NETWORK FALLBACK
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       } else {
//         return fetch(event.request)
//           .then((res) => {
//             return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
//               cache.put(event.request.url, res.clone());
//               return res;
//             });
//           })
//           .catch((err) => {});
//       }
//     })
//   );
// });

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

//CACHE THEN NETWORK STRATEGY AND DYNAMIC CACHING  (works only Online, but not offline, )
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
//       return fetch(event.request).then((res) => {
//         cache.put(event.request, res.clone());
//         return res;
//       });
//     })
//   );
// });

// The improvement of the above strategy from line 102 is: CACHE THEN NETWORK STRATEGY AND DYNAMIC CACHING ONLY FOR THE GIVEN LINK
//Otherwise use CACHE WITH NETWORK FALLBACK
// self.addEventListener("fetch", function (event) {
//   var url = "https://randomuser.me/api";

//   if (event.request.url === URL) {
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
//         return fetch(event.request).then(function (res) {
//           cache.put(event.request, res.clone());
//           return res;
//         });
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then(function (response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function (res) {
//               return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
//                 cache.put(event.request.url, res.clone());
//                 return res;
//               });
//             })
//             .catch(function (err) {
//               return caches.open(CACHE_STATIC_NAME).then(function (cache) {
//                 if (event.request.url.indexOf("/statistics") > -1) {
//                   return cache.match("/offline");
//                 }
//               });
//             });
//         }
//       })
//     );
//   }
// });

//THIS CAN BE USED FOR CRITERIA EXPLANATION https://web.dev/articles/install-criteria   FOR CHROME, AND THAN i CAN MENTION THAT OTHER BROWSERS HAVE SIMILar criteria with some minor differences
//the above is from 2020 maybe I can check on microsoft page for something newer
