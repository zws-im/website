/* global gtag */

import { apiURL, hostnames } from "/assets/js/constants.js";

export default () => {
  const result = document.getElementById("result");
  const long = document.getElementById("long");

  if (hostnames.includes(new URL(long.value).hostname)) {
    return (result.innerText =
      "Shortening a URL containing the URL shortener's hostname is disallowed so there won't be any results");
  }

  if (!navigator.onLine) {
    return (result.innerText = "You are offline");
  }

  result.innerText = "Loading...";

  try {
    // eslint-disable-next-line camelcase
    gtag("event", "checkStats", { event_category: "URLs" });
  } catch (error) {
    console.error("Unable to log URL stats event to Google Analytics");
  }

  return fetch(`${apiURL}/getURLStats?url=${encodeURIComponent(long.value)}`);
};
