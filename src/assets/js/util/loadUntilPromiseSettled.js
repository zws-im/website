/**
 * Make an HTML element load until a promise is settled.
 * @param {HTMLElement} el Element to make load
 * @param {Promise} promise Promise to use for updating the element
 */
export default (el, promise) => {
  el.classList.add("is-loading");
  el.disabled = true;

  promise.finally(() => {
    el.classList.remove("is-loading");
    el.disabled = false;
  });
};
