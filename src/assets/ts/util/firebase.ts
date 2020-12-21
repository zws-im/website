import * as firebase from "firebase/app";
import "firebase/performance";
import "firebase/analytics";
import { firebaseConfig } from "../constants";

// Initialize Firebase
export const app = firebase.apps?.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.apps[0];

import "firebase/performance";

// Initialize Performance Monitoring and get a reference to the service
export const perf = firebase.performance(app);

firebase.analytics.isSupported().then((supported) => {
  if (supported) {
    firebase.analytics(app);
  }
});
