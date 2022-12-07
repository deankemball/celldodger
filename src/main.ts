import { gameParameters, stylesObject } from "./constants";
import { Player } from "./types";
import {
  colorPlayerPosition,
  generateGrid,
  generatePlayerPosition,
} from "./utils";

generateGrid(gameParameters.noRows, gameParameters.noColumns);

let players: Player[] = [];
console.log(players);
generatePlayerPosition(
  gameParameters.noRows,
  gameParameters.noColumns,
  players
);

colorPlayerPosition(players, stylesObject.playerColor);
