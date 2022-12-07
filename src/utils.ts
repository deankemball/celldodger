import { defaultGameParameters, playerControls } from "./constants";
import { gridContainer } from "./listeners";
import { Entity } from "./types";

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

export function generateEntityPosition(
  rows: number,
  columns: number,
  noEntities: number
) {
  let entities: Entity[] = [];
  let id = 0;
  while (entities.length < noEntities) {
    id++;
    const xInt = generateRandomInt(rows);
    const yInt = generateRandomInt(columns);
    const entity: Entity = {
      x: xInt,
      y: yInt,
      id: `xy_x${xInt}-y${yInt}`,
    };

    const match = entities.some((current) => {
      return current.id === entity.id;
    });

    if (match) {
      console.log("prevented duplicate entity");
      continue;
    } else {
      entities.push(entity);
    }
  }
  return entities;
}

export function colorEntityPosition(entity: Entity[], color: string) {
  for (let i = 0; i < entity.length; i++) {
    const playerCell = document.querySelector(`#${entity[i].id}`);
    playerCell?.classList.add(color);
  }
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code === playerControls.left) {
    console.log("move left");
  } else if (event.code === playerControls.right) {
    console.log("move right");
  } else if (event.code === playerControls.up) {
    console.log("move up");
  } else if (event.code === playerControls.down) {
    console.log("move down");
  }
});
