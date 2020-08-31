import { Stats } from "../../../types/stats";
import getURLStats from "../api/getURLStats";
import { reset, update } from "../chart";
import { apexCharts, elements, hostnames } from "../constants";
import load from "../util/loadUntilPromiseSettled";
import validateURL from "../util/validateURL";
import { analytics } from "firebase";

export default (event: Event) => {
  event.preventDefault();

  const { value: url } = elements.inputs.stats;
  const result = elements.outputs.stats;

  if (!validateURL(url)) {
    return (result.innerText = "Invalid URL");
  }

  if (hostnames.includes(new URL(url).hostname)) {
    return (result.innerText =
      "Shortening a URL containing the URL shortener's hostname is disallowed so there won't be any results");
  }

  if (!navigator.onLine) {
    return (result.innerText = "You are offline");
  }

  const request = getURLStats(url);

  window.Sentry.addBreadcrumb({
    category: "urls.stats",
    message: `Check statistics of URL ${url}`,
    level: window.Sentry.Severity.Info,
  });

  // Make the button load until the request is finished
  load(elements.submitButtons.stats, request);

  try {
    analytics().logEvent("checkStats", { url });
  } catch (error) {
    console.error("Unable to log URL stats event to Google Analytics");
  }

  request.then(async (response) => {
    if (response.ok) {
      const stats: Stats = await response.json();

      if (apexCharts.chart) {
        update(apexCharts.chart, {
          get: stats.usage ? stats.usage.get : [],
          shorten: stats.usage ? stats.usage.shorten : [],
        });
      } else {
        throw new Error("Could not find chart");
      }

      return (result.innerText = `Shortened ${(stats.shorten || 0).toLocaleString()} times and visited ${(
        stats.get || 0
      ).toLocaleString()} times.`);
    } else {
      if (apexCharts.chart) {
        reset(apexCharts.chart);
      } else {
        throw new Error("Could not find chart");
      }

      if (response.status === 404) {
        return (result.innerText = "That URL couldn't be found or you don't have access to it");
      } else {
        console.error(response);
        return (result.innerText = `An error occurred: ${response.status}`);
      }
    }
  });
};
