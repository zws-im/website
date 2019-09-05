
interface Window {
  /** Used by Google Analytics */
  dataLayer: any[];
  /** Google Analytics client */
  gtag: Gtag.Gtag;
  /** Sentry error logging client */
  Sentry: any;
  /** Workbox used in service worker */
  workbox: any;
}
