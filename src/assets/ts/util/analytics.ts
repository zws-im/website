import { analytics } from "firebase";

window.dataLayer = window.dataLayer || [];

window.gtag = function gtag(...args) {
  window.dataLayer.push(args);
};

analytics();

gtag("js", new Date());
