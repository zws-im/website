import getURLStats from "../api/getURLStats";
import { update as updateChart } from "../chart";
import { apexCharts, elements, hostnames } from "../constants";
import load from "../util/loadUntilPromiseSettled";

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

  request
    .then(stats => {
      updateChart(apexCharts.chart, {
        get: stats.usage ? stats.usage.get : [],
        shorten: stats.usage ? stats.usage.shorten : []
      });

      return (result.innerText = `Shortened ${stats.shorten.toLocaleString()} times and visited ${stats.get.toLocaleString()} times.`);
    })
    .catch(response => {
      if (response.status === 404) {
        return (result.innerText = "That URL couldn't be found or you don't have access to it");
      } else {
        console.error(response);
        return (result.innerText = `An error occurred: ${response}`);
      }
    });
};
