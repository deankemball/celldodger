// make a binding for the buttons
export const settingsButton = document.querySelector(
  "#settings-icon"
) as HTMLImageElement;
export const helpButton = document.querySelector(
  "#help-icon"
) as HTMLImageElement;
export const settingsBox = document.querySelector(
  "#settings-box"
) as HTMLImageElement;
export const helpBox = document.querySelector(
  "#instructions-box"
) as HTMLImageElement;
export const gridContainer = document.querySelector(
  "#grid-container"
) as HTMLElement;
// make bindings for the boxes
// then add event listeners
// change style of boxes on click

settingsButton.addEventListener("click", () => {
  // check if the icon file path includes the word "filled"
  // if not, change to filled icon, if yes, change to normal icon
  // basically a toggle
  settingsButton.src.includes("filled")
    ? (settingsButton.src = "./help.svg")
    : (settingsButton.src = "./help-filled.svg");
  // toggle the opacity of the box
  settingsBox.classList.toggle("opacity-0");
});

helpButton.addEventListener("click", () => {
  helpButton.src.includes("filled")
    ? (helpButton.src = "./help.svg")
    : (helpButton.src = "./help-filled.svg");
  helpBox.classList.toggle("opacity-0");
});
