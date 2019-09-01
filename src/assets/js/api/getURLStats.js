import { apiURL } from "../constants";

/**
 * API stats response object.
 * @typedef {Object} Stats
 * @property {string} [error] String message of an error that occurred
 * @property {number} [get] Number of times the shortened URL was visited
 * @property {number} [shorten] Number of times the long URL was shortened
 * @property {Object} [usage] Usage info for the URL
 * @property {Array<number>} usage.get Array of timestamps (in milliseconds) when the shortened URL was visited
 * @property {Array<number>} usage.shorten Array of timestamps (in milliseconds) when the long URL was shortened
 */

/**
 * Get stats for a long URL.
 * @param {string} url Long URL to get stats for
 * @returns {Response} Fetch response from API endpoint
 */
export default async url => {
  return fetch(`${apiURL}/getURLStats?url=${encodeURIComponent(url)}`);
};
