import { apiURL } from "../constants";

/**
 * Get stats for a long URL.
 * @param short - Short ID to get stats for
 * @returns Fetch response from API endpoint
 */
export default (short: string): Promise<Response> => fetch(`${apiURL}/${short}/stats`);
