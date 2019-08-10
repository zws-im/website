import { apiURL } from "../constants";

/**
 * Shorten a URL.
 * @param {string} url Long URL to shorten
 * @returns {string} Shortened URL
 */
export default url =>
  fetch(`${apiURL}/shortenURL?url=${encodeURIComponent(url)}`).then(async response => {
    const json = await response.json();
    if (json.error) {
      throw json.error;
    } else if (!response.ok) {
      throw `${response.status} ${response.statusText} and said ${await response.json()}`;
    }

    return `https://zws.im/${json.short}`;
  });
