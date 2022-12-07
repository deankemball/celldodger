import { gameParameters, stylesObject } from "./constants";
import { Coin, Enemy, Player } from "./types";
import {
  colorEntityPosition,
  generateGrid,
  generateEntityPosition,
} from "./utils";

generateGrid(gameParameters.noRows, gameParameters.noColumns);

let players: Player[] = [];
let coins: Coin[] = [];
let enemies: Enemy[] = [];

players = generateEntityPosition(
  gameParameters.noRows,
  gameParameters.noColumns,
  gameParameters.noPlayers
);
coins = generateEntityPosition(
  gameParameters.noRows,
  gameParameters.noColumns,
  gameParameters.noCoins
);
enemies = generateEntityPosition(
  gameParameters.noRows,
  gameParameters.noColumns,
  gameParameters.noEnemies
);

colorEntityPosition(players, stylesObject.playerColor);
colorEntityPosition(coins, stylesObject.coinColor);
colorEntityPosition(enemies, stylesObject.enemyColor);
