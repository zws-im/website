/* eslint-env serviceworker */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js", "https://browser.sentry-cdn.com/5.6.3/bundle.min.js");

// Delete the old cache
caches.delete("zws");

if (self.workbox) {
  console.log("Workbox is loaded");

  self.Sentry.addBreadcrumb({
    category: "sw.workbox.load",
    message: `Workbox is loaded`,
    level: (self).Sentry.Severity.Info
  });

  const maxAgeSeconds = 60 * 60 * 24 * 14;

  // Cache pages
  self.workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "document",
    new self.workbox.strategies.NetworkFirst({
      cacheName: "pages",
      plugins: [
        new self.workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
        })
      ]
    })
  );

  // Cache CSS
  self.workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "style",
    new self.workbox.strategies.StaleWhileRevalidate({
      cacheName: "css",
      plugins: [
        new self.workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
        })
      ]
    })
  );

  // Cache assets
  self.workbox.routing.registerRoute(
    /\/assets\//,
    new self.workbox.strategies.CacheFirst({
      cacheName: "static-assets",
      plugins: [
        new self.workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
        })
      ]
    })
  );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  self.workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new self.workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
      plugins: [
        new self.workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds
        })
      ]
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  self.workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new self.workbox.strategies.CacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new self.workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new self.workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeSeconds,
          maxEntries: 30
        })
      ]
    })
  );

  self.workbox.googleAnalytics.initialize();
} else {
  self.Sentry.addBreadcrumb({
    category: "sw.workbox.load",
    message: `Workbox didn't load`,
    level: self.Sentry.Severity.Error
  });
  console.error("Workbox didn't load");
}
