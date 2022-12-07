import { defaultGameParameters, stylesObject } from "./constants";
import { Coin, Enemy, GameParameters, Player } from "./types";
import {
  colorEntityPosition,
  generateGrid,
  generateEntityPosition,
} from "./utils";
import { cloneDeep } from "lodash";

let gameParams: GameParameters = cloneDeep(defaultGameParameters);

function initGame() {
  gameParams.gameOver = false;
  gameParams.gameStarted = false;

  generateGrid(gameParams.noRows, gameParams.noColumns);

  let players: Player[] = [];
  let coins: Coin[] = [];
  let enemies: Enemy[] = [];

  players = generateEntityPosition(
    gameParams.noRows,
    gameParams.noColumns,
    gameParams.noPlayers
  );
  coins = generateEntityPosition(
    gameParams.noRows,
    gameParams.noColumns,
    gameParams.noCoins
  );
  enemies = generateEntityPosition(
    gameParams.noRows,
    gameParams.noColumns,
    gameParams.noEnemies
  );

  colorEntityPosition(players, stylesObject.playerColor);
  colorEntityPosition(coins, stylesObject.coinColor);
  colorEntityPosition(enemies, stylesObject.enemyColor);
}

initGame();

function updateGameState() {
  // move players
  // move enemies
}

function gameLoop() {
  if (!gameParams.gameOver) {
    if (gameParams.gameStarted) {
      setTimeout(() => {
        updateGameState();
        window.requestAnimationFrame(gameLoop), gameParams.gameSpeed;
      });
    }
  }
}
