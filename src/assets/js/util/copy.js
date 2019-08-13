export default str => {
  if (navigator && navigator.clipboard) {
    return navigator.clipboard.writeText(str);
  } else {
    const el = document.createElement("textarea");
    const range = document.createRange();

    el.classList.add("clipboard");
    el.contentEditable = true;
    el.readOnly = false;
    el.value = str;

    document.body.appendChild(el);

    range.selectNodeContents(el);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    // In case our URLs become 9007199254740991 2^53 − 1 digits long
    el.setSelectionRange(0, Number.MAX_SAFE_INTEGER);

    document.execCommand("copy");

    document.body.removeChild(el);
    return;
  }
};
