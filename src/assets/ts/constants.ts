import Chart from "./types/chart";

/**
 * Base API URL to use for requests.
 */
export const apiURL = "https://us-central1-zero-width-shortener.cloudfunctions.net";
/**
 * Hostnames of ZWS instances.
 * Used in addition to server-side validation to prevent shortening an already short URL.
 */
export const hostnames = ["zws.im", "zws.jonahsnider.ninja"];
/**
 * HTML elements used across the project.
 */
export const elements = {
  submitButtons: {
    shorten: document.getElementById("shorten-submit") as HTMLButtonElement,
    stats: document.getElementById("stats-submit") as HTMLButtonElement
  },
  inputs: {
    shorten: document.getElementById("shorten-url") as HTMLInputElement,
    stats: document.getElementById("stats-url") as HTMLInputElement
  },
  outputs: {
    shorten: document.getElementById("shorten-result") as HTMLInputElement,
    stats: document.getElementById("stats-result") as HTMLParagraphElement
  },
  forms: {
    shorten: document.getElementById("shorten") as HTMLFormElement,
    stats: document.getElementById("stats") as HTMLFormElement
  },
  chart: document.getElementById("chart") as HTMLDivElement,
  copyButton: document.getElementById("copy") as HTMLButtonElement
};
export const apexCharts = {
  chart: undefined,
  options: {
    chart: {
      type: "area"
    },
    series: [],
    xaxis: {
      type: "datetime"
    }
  }
} as Chart;
/**
 * DSN used to log errors to Sentry.
 */
export const sentryDSN = "https://11bb1aafb0044731a257962791bed8f4@sentry.io/1547351";
/**
 * The config used for Firebase.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyCIqCPfiJBy520wr73EkZXXuNX-BBwCWm4",
  authDomain: "zero-width-shortener.firebaseapp.com",
  databaseURL: "https://zero-width-shortener.firebaseio.com",
  projectId: "zero-width-shortener",
  storageBucket: "zero-width-shortener.appspot.com",
  messagingSenderId: "1090998003190",
  appId: "1:1090998003190:web:c26f056545426aa4"
};
