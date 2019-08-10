import shortenURL from "../api/shortenURL";
import { elements, hostnames } from "../constants";
import copy from "../util/copy";
import load from "../util/loadUntilPromiseSettled";

export default event => {
  event.preventDefault();

  const { value: url } = elements.inputs.shorten;
  const result = elements.outputs.shorten;

  if (hostnames.includes(new URL(url).hostname)) {
    return (result.innerText = "Shortening a URL containing the URL shortener's hostname is disallowed");
  }

  if (!navigator.onLine) {
    return (result.innerText = "You are offline");
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
      copy(shortened);
      return (result.innerText = `Copied to clipboard: ${shortened}`);
    })
    .catch(error => {
      console.error(error);
      return (result.innerText = `An error occurred: ${error}`);
    });
};
