import { sentryDSN } from "../constants";

Sentry.init({
  dsn: sentryDSN,
  beforeSend: event => {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  }
});
