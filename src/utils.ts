import { gameParameters } from "./constants";
import { gridContainer } from "./listeners";
import { Entity, Player } from "./types";

export function generateRandomInt(max: number) {
  return Math.round(Math.random() * max);
}

export function generateGrid(columns: number, rows: number) {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      const gridCell = document.createElement("div");
      gridCell.classList.add("border-[1px]", "border-bgColor", "flex-1");
      gridCell.id = `xy_x${j}-y${i}`;
      gridContainer.appendChild(gridCell);
    }
  }
}

export function generatePlayerPosition(
  rows: number,
  columns: number,
  entities: Player[]
) {
  const xInt = generateRandomInt(rows);
  const yInt = generateRandomInt(columns);
  const entity: Player = {
    x: xInt,
    y: yInt,
    id: `xy_x${xInt}-y${yInt}`,
    lastKeyPressed: "",
    lives: gameParameters.noLives,
  };
  entities.push(entity);
}

export function colorPlayerPosition(players: Player[], color: string) {
  const playerCell = document.querySelector(`#${players[0].id}`);
  playerCell?.classList.add(color);
}
