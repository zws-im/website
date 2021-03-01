import firebase from "firebase/app";
import shortenURL from "../api/shortenURL";
import { elements, hostnames } from "../constants";
import { app } from "../util/firebase";
import load from "../util/loadUntilPromiseSettled";
import validateURL from "../util/validateURL";

let analytics: firebase.analytics.Analytics | null = null;

firebase.analytics.isSupported().then(() => {
  analytics = firebase.analytics(app);
});

export default (event: Event) => {
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

  window.Sentry?.addBreadcrumb({
    category: "urls.shorten",
    message: `Shortenened URL ${url}`,
    level: window.Sentry?.Severity.Info,
  });

  // Make the button load until the request is finished
  load(elements.submitButtons.shorten, request);

  try {
    analytics?.logEvent("shorten", { url });
  } catch (error) {
    console.error("Error sending statistics to Google Analytics", error);
  }

  request
    .then((shortened) => {
      elements.copyButton.disabled = false;
      return (result.value = shortened);
    })
    .catch((error) => {
      console.error(error);
      return (result.value = `An error occurred: ${error}`);
    });
};
