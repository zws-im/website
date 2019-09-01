import { apiURL } from "../constants";

/**
 * Get stats for a long URL.
 * @param {string} url Long URL to get stats for
 * @returns {Response} Fetch response from API endpoint
 */
export default url => fetch(`${apiURL}/getURLStats?url=${encodeURIComponent(url)}`);
