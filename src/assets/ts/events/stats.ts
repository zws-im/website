import getURLStats from "../api/getURLStats";
import { reset, update } from "../chart";
import { apexCharts, elements, hostnames } from "../constants";
import Stats from "../types/stats";
import load from "../util/loadUntilPromiseSettled";

export default event => {
  event.preventDefault();

  if (!elements.inputs.stats) {
    throw new Error("Could not find stats input element");
  }

  const { value: url } = elements.inputs.stats;
  const result = elements.outputs.stats;

  if (hostnames.includes(new URL(url).hostname)) {
    if (result) {
      return (result.innerText =
        "Shortening a URL containing the URL shortener's hostname is disallowed so there won't be any results");
    } else {
      throw new Error("Could not find result element");
    }
  }

  if (!navigator.onLine) {
    if (result) {
      return (result.innerText = "You are offline");
    } else {
      throw new Error("Could not find result element");
    }
  }

  const request = getURLStats(url);

  if (elements.submitButtons.stats) {
    // Make the button load until the request is finished
    load(elements.submitButtons.stats, request);
  } else {
    throw new Error("Could not find stats submit button");
  }

  try {
    // eslint-disable-next-line camelcase
    gtag("event", "checkStats", { event_category: "URLs" });
  } catch (error) {
    console.error("Unable to log URL stats event to Google Analytics");
  }

  request.then(async response => {
    if (response.ok) {
      const stats: Stats = await response.json();

      if (apexCharts.chart) {
        update(apexCharts.chart, {
          get: stats.usage ? stats.usage.get : [],
          shorten: stats.usage ? stats.usage.shorten : []
        });
      } else {
        throw new Error("Could not find chart");
      }

      if (result) {
        return (result.innerText = `Shortened ${(stats.shorten || 0).toLocaleString()} times and visited ${(
          stats.get || 0
        ).toLocaleString()} times.`);
      } else {
        throw new Error("Could not find result element");
      }
    } else {
      reset(apexCharts.chart);

      if (response.status === 404) {
        if (result) {
          return (result.innerText = "That URL couldn't be found or you don't have access to it");
        } else {
          throw new Error("Could not find result element");
        }
      } else {
        console.error(response);
        if (result) {
          return (result.innerText = `An error occurred: ${response.status}`);
        } else {
          throw new Error("Could not find result element");
        }
      }
    }
  });
};
