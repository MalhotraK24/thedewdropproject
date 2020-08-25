const staticCacheName = "staticfiles";
const imageCacheName = "images";
const pagesCacheName = "pages";
const cacheList = [staticCacheName, imageCacheName, pagesCacheName];

// This is the offline content page
const offlinePageGlobal = "offline.html";

function updateStaticCache() {
  return caches.open(staticCacheName).then((staticCache) => {
    // These files don't block installation
    staticCache.addAll(["/assets/fonts/*.*"]);
    // These files must be cached for installation
    return staticCache.addAll([
      // Static assets to use offline...
      "/assets/css/main.css",
      "/assets/js/main.js",
      "/assets/js/plugins/slider.js",
      "/assets/js/plugins/simple-lightbox.js",
      "/assets/js/plugins/scroll-to-top.js",
      "/assets/images/Icons/TDP_Logo.png",
      "/assets/images/Icons/facebook.png",
      "/assets/images/Icons/instagram.png",
      "/assets/images/Icons/email.png",
      // Offline page document...
      offlinePageGlobal,
    ]);
  });
}

// Remove caches whose name is no longer valid
function deleteOldCaches() {
  return caches.keys().then((keys) => {
    return Promise.all(
      keys
        .filter((key) => !cacheList.includes(key))
        .map((key) => caches.delete(key))
    );
  });
}

// Limit the number of items in a specified cache.
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

// Install the service worker with the predefined cache items
self.addEventListener("install", function (event) {
  // Update static cache
  event.waitUntil(
    updateStaticCache().then(() => {
      self.skipWaiting();
    })
  );
});

// This method is used to activate a new service worker when the old one is terminated
self.addEventListener("activate", function (event) {
  // Delete old caches
  event.waitUntil(
    deleteOldCaches().then(() => {
      self.clients.claim();
    })
  );
});

addEventListener("message", (event) => {
  // Trim size of caches on page load
  if (event.data.command === "trimCaches") {
    trimCache(pagesCacheName, 25);
    trimCache(imageCacheName, 50);
  }
});

// Fetch the response for the request either from the cache or the network if it's a new request and clone the response
addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // For HTML requests, try the network first, fall back to the cache, finally the offline page
  if (request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((fetchResponse) => {
          // Add named offline pages to static cache
          // Add other pages to pages cache
          // Fetch page from network
          const copy = fetchResponse.clone();

          if (offlinePages.includes(url.pathname)) {
            try {
              event.waitUntil(
                caches.open(staticCacheName).then((staticCache) => {
                  staticCache.put(request, copy);
                })
              );
            } catch (error) {
              console.error(error);
            }
          } else {
            try {
              event.waitUntil(
                caches.open(pagesCacheName).then((pagesCache) => {
                  return pagesCache.put(request, copy);
                })
              );
            } catch (error) {
              console.error(error);
            }
          }
          return fetchResponse;
        })
        .catch((fetchError) => {
          console.error(fetchError);

          // If file is cached serve that, else show cached offline page
          return caches.match(request).then((cacheResponse) => {
            return cacheResponse || caches.match(offlinePageGlobal);
          });
        })
    );
    return;
  }

  // Other file requests (defer to cache)
  event.respondWith(
    // If file is cached, serve that
    caches.match(request).then((cacheResponse) => {
      return (
        cacheResponse ||
        fetch(request)
          .then((fetchResponse) => {
            // Add images to cache
            // Fetch file from network
            if (request.url.match(/\.(gif|jpe?g|png|svg|webp)/)) {
              const copy = fetchResponse.clone();
              try {
                event.waitUntil(
                  caches.open(imageCacheName).then((imageCache) => {
                    imageCache.put(request, copy);
                  })
                );
              } catch (error) {
                console.error(error);
              }
            }
            return fetchResponse;
          })
          .catch((fetchError) => {
            console.error(fetchError);
          })
      );
    })
  );
});
