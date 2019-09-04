/* eslint-env serviceworker */
/* global workbox */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Delete the old cache
caches.delete("zws");

// @ts-ignore
if (workbox) {
  console.log("Workbox is loaded");

  const maxAgeSeconds = 60 * 60 * 24 * 14;

  // Cache pages
  // @ts-ignore
  workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "document",
    // @ts-ignore
    new workbox.strategies.NetworkFirst({
      cacheName: "pages",
      plugins: [
        // @ts-ignore
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
        })
      ]
    })
  );

  // Cache CSS
  // @ts-ignore
  workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "style",
    // @ts-ignore
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "css",
      plugins: [
        // @ts-ignore
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
        })
      ]
    })
  );

  // Cache assets
  // @ts-ignore
  workbox.routing.registerRoute(
    /\/assets\//,
    // @ts-ignore
    new workbox.strategies.NetworkFirst({
      cacheName: "static-assets",
      plugins: [
        // @ts-ignore
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
        })
      ]
    })
  );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  // @ts-ignore
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    // @ts-ignore
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
      plugins: [
        // @ts-ignore
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
        })
      ]
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  // @ts-ignore
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    // @ts-ignore
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        // @ts-ignore
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        // @ts-ignore
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds,
          maxEntries: 30
        })
      ]
    })
  );

  // @ts-ignore
  workbox.googleAnalytics.initialize();
} else {
  console.log("Workbox didn't load");
}
