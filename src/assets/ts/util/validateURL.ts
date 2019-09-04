/**
 * Validates a string using the URL class.
 * Returns `true` if the URL is valid, `false` if it's invalid.
 */
export default (urlString: string) => {
  try {
    new URL(urlString);

    return true;
  } catch (error) {
    return false;
  }
};
