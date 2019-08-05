/* eslint-env serviceworker */
/* global workbox */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Delete the old cache
caches.delete("zws");

if (workbox) {
  console.log("Workbox is loaded");

  const yearInSeconds = 60 * 60 * 24 * 365;

  // Cache pages
  workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "document",
    new workbox.strategies.NetworkFirst({
      cacheName: "pages",
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: yearInSeconds
        })
      ]
    })
  );

  // Cache CSS
  workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "style",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "css",
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: yearInSeconds
        })
      ]
    })
  );

  // Cache assets
  workbox.routing.registerRoute(
    /\/assets\//,
    new workbox.strategies.NetworkFirst({
      cacheName: "static-assets",
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: yearInSeconds
        })
      ]
    })
  );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: yearInSeconds
        })
      ]
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: yearInSeconds,
          maxEntries: 30
        })
      ]
    })
  );


  workbox.googleAnalytics.initialize();
} else {
  console.log("Workbox didn't load");
}
