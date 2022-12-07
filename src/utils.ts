import { gridContainer } from "./listeners";

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
