import Usage from "./usage";

export default interface Stats {
  /** Number of times that the shortened URL was visited */
  get: number;
  /** Number of times that this URL was shortened */
  shorten: number;
  usage: Usage;
}
