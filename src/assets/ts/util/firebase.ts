import { analytics as initAnalytics, apps, initializeApp, performance } from "firebase";
import { firebaseConfig } from "../constants";

// Initialize Firebase
export const app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];

import "firebase/performance";

// Initialize Performance Monitoring and get a reference to the service
export const perf = performance(app);

export const analytics = initAnalytics(app);
