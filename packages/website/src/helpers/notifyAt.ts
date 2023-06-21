export const notifyAt = (txt: string) => {
  const slot = document.querySelector("#notify-polite");

  if (slot) {
    slot.innerHTML = txt;
  }
};
