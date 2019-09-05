import { version } from "../../../../package.json";
import { sentryDSN } from "../constants";

// @ts-ignore
window.Sentry.init({
  dsn: sentryDSN,
  beforeSend: event => {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      // @ts-ignore
      window.Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },
  release: `website@${version}`
});

window.addEventListener("unhandledrejection", data => window.Sentry.captureException(data.reason));
