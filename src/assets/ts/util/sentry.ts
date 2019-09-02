import { sentryDSN } from "../constants";

window.Sentry.init({
  dsn: sentryDSN,
  beforeSend: event => {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      window.Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  }
});

window.addEventListener("unhandledrejection", data => window.Sentry.captureException(data.reason));
