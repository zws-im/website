import { version } from "../../../../package.json";
import { sentryDSN } from "../constants";
import { Event } from "@sentry/browser";

window.Sentry.init({
  dsn: sentryDSN,
  beforeSend: (event: Event) => {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      window.Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },
  release: `website@${version}`,
});

window.addEventListener("unhandledrejection", (data) => window.Sentry.captureException(data.reason));
