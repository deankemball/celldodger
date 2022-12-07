import { stylesObj } from "./constants";
import {
  consoleDisplay,
  gameOverScreen,
  grid,
  livesDisplay,
  restartButton,
} from "./listeners";
import { gameLoop, initGame } from "./main";
import { Entity, GameParams, StylesObj } from "./types";

// utils
export function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
export function normalizeValue(val: number, min: number, max: number) {
  return ((val - min) / (max - min)) * 2 - 1;
}

// grid and entity init
export function generateGrid(rows: number, columns: number) {
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const gridCell = document.createElement("div");
      gridCell.id = `xy_${row}-${column}`;
      gridCell.classList.add("border-[1px]", "border-bgColor", "flex-1");
      grid.appendChild(gridCell);
    }
  }
}

export function removeChildren(element: HTMLElement) {
  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild);
  }
}

export function generatePosition<T extends Entity>(
  rows: number,
  columns: number,
  entities: T[],
  noEntities: number
) {
  let id = 0;
  while (entities.length < noEntities) {
    id++;
    let x, y;
    x = randomInt(rows);
    y = randomInt(columns);
    let entity = { x, y, id } as T;
    if (
      entities
        .filter((entity) => entity.id !== entity.id)
        .some(({ x, y }) => {
          return entity.x === x && entity.y === y;
        })
    ) {
      console.log("stopped duplicate entity");
      break;
    } else {
      entities.push(entity);
    }
  }
  return entities;
}

export function colorEntity<T extends Entity>(entities: T[], color: string) {
  entities.forEach((entity) => {
    const entityCell = document.getElementById(
      `xy_${entity.x}-${entity.y}`
    ) as HTMLElement;
    entityCell.classList.toggle(color);
  });
}

// updates
export function flashGrid(
  gridFlashColor: keyof StylesObj,
  gameParams: GameParams
) {
  grid.classList.toggle(stylesObj.borderColor);
  grid.classList.toggle(stylesObj[gridFlashColor]);
  setTimeout(() => {
    grid.classList.toggle(stylesObj.borderColor);
    grid.classList.toggle(stylesObj[gridFlashColor]);
  }, gameParams.gameSpeed / gameParams.noLives);
}

export function minusLife(gameParams: GameParams) {
  gameParams.noLives--;
  flashGrid("minusLifeFlashColor", gameParams);
  livesDisplay.innerHTML = gameParams.noLives.toString();
  if (gameParams.noLives === 0) {
    gameParams.gameOver = true;
    consoleDisplay.innerText = "you died!";
    restartButton.classList.toggle("invisible");
    setTimeout(() => {
      gameOverScreen.classList.toggle("opacity-0");
      setTimeout(() => {
        restartButton.classList.toggle("opacity-0");
      }, 1050);
    }, 50);
  }
}

// reset game
restartButton.addEventListener("click", () => {
  restartButton.classList.toggle("invisible");
  initGame();
  gameLoop();
});
