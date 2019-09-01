import getURLStats from "../api/getURLStats";
import { update as updateChart } from "../chart";
import { apexCharts, elements, hostnames } from "../constants";
import load from "../util/loadUntilPromiseSettled";

/**
 * API stats response object.
 * @typedef {Object} Stats
 * @property {string} [error] String message of an error that occurred
 * @property {number} [get] Number of times the shortened URL was visited
 * @property {number} [shorten] Number of times the long URL was shortened
 * @property {Object} [usage] Usage info for the URL
 * @property {Array<number>} usage.get Array of timestamps (in milliseconds) when the shortened URL was visited
 * @property {Array<number>} usage.shorten Array of timestamps (in milliseconds) when the long URL was shortened
 */

export default () => {
  event.preventDefault();

  const { value: url } = elements.inputs.stats;
  const result = elements.outputs.stats;

  if (hostnames.includes(new URL(url).hostname)) {
    return (result.innerText =
      "Shortening a URL containing the URL shortener's hostname is disallowed so there won't be any results");
  }

  if (!navigator.onLine) {
    return (result.innerText = "You are offline");
  }

  const request = getURLStats(url);

  // Make the button load until the request is finished
  load(elements.submitButtons.stats, request);

  try {
    // eslint-disable-next-line camelcase
    gtag("event", "checkStats", { event_category: "URLs" });
  } catch (error) {
    console.error("Unable to log URL stats event to Google Analytics");
  }

  request.then(async response => {
    if (response.ok) {
      /**
       * @type {Stats}
       */
      const stats = await response.json();

      updateChart(apexCharts.chart, {
        get: stats.usage ? stats.usage. get : [],
        shorten: stats.usage ? stats.usage.shorten : []
      });

      return (result.innerText = `Shortened ${stats.shorten.toLocaleString()} times and visited ${stats.get.toLocaleString()} times.`);
    } else {
      if (response.status === 404) {
        return (result.innerText = "That URL couldn't be found or you don't have access to it");
      } else {
        console.error(response);
        return (result.innerText = `An error occurred: ${response.status}`);
      }
    }
  });
};
