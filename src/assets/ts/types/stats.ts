import Usage from "./usage";

export default interface Stats {
  error: string | undefined;
  get: number | undefined;
  shorten: number | undefined;
  usage: Usage | undefined;
}
