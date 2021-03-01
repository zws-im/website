interface Window {
  /** Sentry error logging client */
  Sentry?: Record<string, any>;
  /** Workbox used in service worker */
  workbox: any;
}
