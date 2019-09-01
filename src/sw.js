/* eslint-env serviceworker */

import workbox from "workbox-sw";

// Delete the old cache
caches.delete("zws");

if (workbox) {
  console.log("Workbox is loaded");

  const maxAgeSeconds = 60 * 60 * 24 * 14;

  // Cache pages
  workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "document",
    new workbox.strategies.NetworkFirst({
      cacheName: "pages",
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
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
          maxAgeSeconds: maxAgeSeconds
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
          maxAgeSeconds: maxAgeSeconds
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
          maxAgeSeconds: maxAgeSeconds
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
          maxAgeSeconds: maxAgeSeconds,
          maxEntries: 30
        })
      ]
    })
  );

  workbox.googleAnalytics.initialize();
} else {
  console.log("Workbox didn't load");
}
