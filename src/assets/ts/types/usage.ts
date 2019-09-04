export default interface Usage {
  /** Array of timestamps that the shortened URL was visited */
  get: number[];
  /** Array of timestamps that this URL was shortened */
  shorten: number[];
}
