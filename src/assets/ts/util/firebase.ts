import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/performance";
import { firebaseConfig } from "../constants";

// Initialize Firebase
export const app = firebase.apps?.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Initialize Performance Monitoring and get a reference to the service
export const perf = firebase.performance(app);
