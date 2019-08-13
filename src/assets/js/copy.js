export default str => {
  if (navigator && navigator.clipboard) {
    return navigator.clipboard.writeText(str);
  } else {
    const el = document.createElement("textarea");
    el.classList.add("clipboard");
    el.value = str;
    document.body.appendChild(el);

    el.select();
    document.execCommand("copy");

    document.body.removeChild(el);
    return;
  }
};
