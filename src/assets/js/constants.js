/**
 * Base API URL to use for requests.
 */
export const apiURL = "https://us-central1-zero-width-shortener.cloudfunctions.net";
/**
 * Hostnames of ZWS instances.
 * Used in addition to server-side validation to prevent shortening an already short URL.
 * @enum {string} Hostname of a ZWS instance
 */
export const hostnames = [
  "zws.im",
  "zws.jonahsnider.ninja"
];
/**
 * HTML elements used across the project.
 */
export const elements = {
  submitButtons: {
    shorten: document.getElementById("shorten-submit"),
    stats: document.getElementById("stats-submit")
  },
  inputs: {
    shorten: document.getElementById("shorten-url"),
    stats: document.getElementById("stats-url")
  },
  outputs: {
    shorten: document.getElementById("shorten-result"),
    stats: document.getElementById("stats-result")
  },
  forms: {
    shorten: document.getElementById("shorten"),
    stats: document.getElementById("stats")
  },
  chart: document.getElementById("chart"),
  copyButton: document.getElementById("copy")
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
};
export const sentryDSN = "https://11bb1aafb0044731a257962791bed8f4@sentry.io/1547351";
