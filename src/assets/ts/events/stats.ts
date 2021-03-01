import firebase from "firebase/app";
import { Stats } from "../../../types/stats";
import getURLStats from "../api/getURLStats";
import { reset, update } from "../chart";
import { apexCharts, elements, hostnames } from "../constants";
import { app } from "../util/firebase";
import load from "../util/loadUntilPromiseSettled";
import validateURL from "../util/validateURL";

let analytics: firebase.analytics.Analytics | null = null;

firebase.analytics.isSupported().then(() => {
  analytics = firebase.analytics(app);
});

export default (event: Event) => {
  event.preventDefault();

  const { value: url } = elements.inputs.stats;
  const result = elements.outputs.stats;

  result.innerText = "";

  if (!validateURL(url)) {
    return (result.innerText = "Invalid URL");
  }

  const parsed = new URL(url);

  if (!hostnames.includes(parsed.hostname)) {
    result.innerText = "You need to enter a shortened URL";
    return;
  }

  if (!navigator.onLine) {
    return (result.innerText = "You are offline");
  }

  const request = getURLStats(parsed.pathname.slice(1));

  window.Sentry?.addBreadcrumb({
    category: "urls.stats",
    message: `Check statistics of URL ${url}`,
    level: window.Sentry?.Severity.Info,
  });

  // Make the button load until the request is finished
  load(elements.submitButtons.stats, request);

  try {
    analytics?.logEvent("checkStats", { url });
  } catch (error) {
    console.error("Unable to log URL stats event to Google Analytics");
  }

  request.then(async (response) => {
    if (response.ok) {
      const stats: Stats = await response.json();

      if (apexCharts.chart) {
        update(apexCharts.chart, stats);
      } else {
        throw new Error("Could not find chart");
      }

      return;
    } else {
      if (apexCharts.chart) {
        reset(apexCharts.chart);
      } else {
        throw new Error("Could not find chart");
      }

      if (response.status === 404) {
        return (result.innerText = "That URL couldn't be found");
      } else {
        console.error(response);
        return (result.innerText = `An error occurred: ${response.status}`);
      }
    }
  });
};
