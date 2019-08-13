import clipboard from "clipboard";

export default str => {
  const iOS = navigator.userAgent.match(/ipad|iphone/i);

  // Create text area
  const textArea = document.createElement("textArea");
  textArea.value = str;
  document.body.appendChild(textArea);

  // Select the text area. iOS needs a workaround.
  if (iOS) {
    const range = document.createRange();
    range.selectNodeContents(textArea);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }

  // Trigger copying
  document.execCommand("copy");
  document.body.removeChild(textArea);
};
