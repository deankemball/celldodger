import { defaultGameParameters, stylesObject } from "./constants";
import { Coin, Enemy, Player } from "./types";
import {
  colorEntityPosition,
  generateGrid,
  generateEntityPosition,
} from "./utils";

generateGrid(defaultGameParameters.noRows, defaultGameParameters.noColumns);

let players: Player[] = [];
let coins: Coin[] = [];
let enemies: Enemy[] = [];

players = generateEntityPosition(
  defaultGameParameters.noRows,
  defaultGameParameters.noColumns,
  defaultGameParameters.noPlayers
);
coins = generateEntityPosition(
  defaultGameParameters.noRows,
  defaultGameParameters.noColumns,
  defaultGameParameters.noCoins
);
enemies = generateEntityPosition(
  defaultGameParameters.noRows,
  defaultGameParameters.noColumns,
  defaultGameParameters.noEnemies
);

colorEntityPosition(players, stylesObject.playerColor);
colorEntityPosition(coins, stylesObject.coinColor);
colorEntityPosition(enemies, stylesObject.enemyColor);
