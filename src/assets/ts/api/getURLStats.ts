import { apiURL } from "../constants";

/**
 * Get stats for a long URL.
 * @param Long URL to get stats for
 * @returns Fetch response from API endpoint
 */
export default (url: string): Promise<Response> => fetch(`${apiURL}/getURLStats?url=${encodeURIComponent(url)}`);
