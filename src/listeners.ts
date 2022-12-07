// main elements
export const body = document.querySelector("body") as HTMLElement;
export const grid = document.querySelector("#grid-container") as HTMLElement;
export const settings = document.querySelector("#settings-box") as HTMLElement;
export const instructions = document.querySelector(
  "#instructions-box"
) as HTMLElement;

// game ui elements
export const settingsButton = document.querySelector(
  "#settings-icon"
) as HTMLImageElement;
export const helpButton = document.querySelector(
  "#help-icon"
) as HTMLImageElement;
export const scoreDisplay = document.querySelector("#score") as HTMLElement;
export const livesDisplay = document.querySelector("#lives") as HTMLElement;
export const consoleDisplay = document.querySelector("#console") as HTMLElement;

// game over screen
export const gameOverScreen = document.querySelector(
  "#game-over-screen"
) as HTMLElement;
export const restartButton = document.querySelector(
  "#game-over-button"
) as HTMLButtonElement;

// settings input elements
export const noLivesInput = document.querySelector(
  "#noLives"
) as HTMLInputElement;
export const noEnemiesInput = document.querySelector(
  "#noEnemies"
) as HTMLInputElement;
export const noCoinsInput = document.querySelector(
  "#noCoins"
) as HTMLInputElement;
export const gameSpeedInput = document.querySelector(
  "#gameSpeed"
) as HTMLInputElement;

// assign listeners for help and settings buttons
helpButton &&
  helpButton.addEventListener("click", () => {
    helpButton.src.includes("filled")
      ? (helpButton.src = "./help.svg")
      : (helpButton.src = "./help-filled.svg");
    instructions?.classList.toggle("opacity-0");
  });

settingsButton &&
  settingsButton.addEventListener("click", () => {
    settingsButton.src.includes("filled")
      ? (settingsButton.src = "./settings.svg")
      : (settingsButton.src = "./settings-filled.svg");
    settings?.classList.toggle("opacity-0");
  });
