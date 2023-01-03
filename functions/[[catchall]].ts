/* eslint-disable require-await */

export type Env = Record<never, never>;

const REDIRECT_URL_BASE = "https://api.zws.im";

const SHORT_CHARS: readonly string[] = [
  "\u200c",
  "\u200d",
  "\udb40\udc61",
  "\udb40\udc62",
  "\udb40\udc63",
  "\udb40\udc64",
  "\udb40\udc65",
  "\udb40\udc66",
  "\udb40\udc67",
  "\udb40\udc68",
  "\udb40\udc69",
  "\udb40\udc6a",
  "\udb40\udc6b",
  "\udb40\udc6c",
  "\udb40\udc6d",
  "\udb40\udc6e",
  "\udb40\udc6f",
  "\udb40\udc70",
  "\udb40\udc71",
  "\udb40\udc72",
  "\udb40\udc73",
  "\udb40\udc74",
  "\udb40\udc75",
  "\udb40\udc76",
  "\udb40\udc77",
  "\udb40\udc78",
  "\udb40\udc79",
  "\udb40\udc7a",
  "\udb40\udc7f",
  "oomf",
];

const SHORTENED_URL_REGEXP = new RegExp(`/(?:${SHORT_CHARS.join("|")})+$`, "g");

function getRedirectUrl(request: Request): string | Request {
  const path = new URL(request.url).pathname;

  if (path.startsWith("/api")) {
    console.log("[i] redirecting", path, "to the API");
    const redirectUrl = new URL(REDIRECT_URL_BASE);
    redirectUrl.pathname = path.slice("/api".length);
    return redirectUrl.toString();
  }

  SHORTENED_URL_REGEXP.lastIndex = 0;

  if (SHORTENED_URL_REGEXP.test(path)) {
    console.log("[i] redirecting", path, "to a shortened URL");
    const redirectUrl = new URL(REDIRECT_URL_BASE);
    redirectUrl.pathname = path;
    const yay = redirectUrl.toString();
    console.log({ yay });
    return yay;
  }

  console.log("[i] redirecting", path, "to NOWHERE");

  return request;
}

export const onRequest: PagesFunction = async (context) => {
  console.log("context params:", context.params);
  console.log("url:", context.request.url);
  return fetch(getRedirectUrl(context.request));
};
