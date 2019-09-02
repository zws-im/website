import firebase from "firebase/app";
import "firebase/performance";
import { firebaseConfig } from "../constants";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Performance Monitoring and get a reference to the service
const perf = firebase.performance();

export default perf;
