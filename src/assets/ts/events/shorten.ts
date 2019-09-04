import shortenURL from "../api/shortenURL";
import { elements, hostnames } from "../constants";
import load from "../util/loadUntilPromiseSettled";
import validateURL from "../util/validateURL";

export default event => {
  event.preventDefault();

  const { value: url } = elements.inputs.shorten;
  const result = elements.outputs.shorten;

  if (!validateURL(url)) {
    return (result.value = "Invalid URL");
  }

  if (hostnames.includes(new URL(url).hostname)) {
    return (result.value = "Shortening a URL containing the URL shortener's hostname is disallowed");
  }

  if (!navigator.onLine) {
    return (result.value = "You are offline");
  }

  const request = shortenURL(url);

  // Make the button load until the request is finished
  load(elements.submitButtons.shorten, request);

  try {
    // eslint-disable-next-line camelcase
    gtag("event", "shorten", { event_category: "URLs" });
  } catch (error) {
    console.error("Error sending statistics to Google Analytics", error);
  }

  request
    .then(shortened => {
      elements.copyButton.disabled = false;
      return (result.value = shortened);
    })
    .catch(error => {
      console.error(error);
      return (result.value = `An error occurred: ${error}`);
    });
};
