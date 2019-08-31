import { sentryDSN } from "../constants";

Sentry.init({ dsn: sentryDSN });
