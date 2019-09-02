/**
 * Make an HTML element load until a promise is settled.
 * @param el Element to make load
 * @param promise Promise to use for updating the element
 */
export default (el: HTMLElement, promise: Promise<any>) => {
  el.classList.add("is-loading");
  el.setAttribute("disabled", "true");

  promise.finally(() => {
    el.classList.remove("is-loading");
    el.removeAttribute("disabled");
  });
};
