import {
  defaultGameParameters,
  playerControls,
  stylesObject,
} from "./constants";
import { Coin, Enemy, GameParameters, Player } from "./types";
import {
  colorEntityPosition,
  generateGrid,
  generateEntityPosition,
} from "./utils";
import { cloneDeep } from "lodash";

let gameParams: GameParameters = cloneDeep(defaultGameParameters);
let players: Player[] = [];
let coins: Coin[] = [];
let enemies: Enemy[] = [];

function initGame() {
  gameParams.gameOver = false;
  gameParams.gameStarted = false;

  generateGrid(gameParams.noRows, gameParams.noColumns);

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

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.key === playerControls.left) {
    players[0].lastKeyPressed = playerControls.left;
  } else if (event.key === playerControls.right) {
    players[0].lastKeyPressed = playerControls.right;
  } else if (event.key === playerControls.up) {
    players[0].lastKeyPressed = playerControls.up;
  } else if (event.key === playerControls.down) {
    players[0].lastKeyPressed = playerControls.down;
  }
  gameParams.gameStarted = true;
});

function movePlayer() {
  colorEntityPosition(players, stylesObject.playerColor);
  if (players[0].lastKeyPressed === playerControls.left) {
    if (players[0].x !== 0) players[0].x -= 1;
  } else if (players[0].lastKeyPressed === playerControls.up) {
    if (players[0].y !== 0) players[0].y -= 1;
  } else if (players[0].lastKeyPressed === playerControls.right) {
    if (players[0].x !== gameParams.noRows - 1) players[0].x += 1;
  } else if (players[0].lastKeyPressed === playerControls.down) {
    if (players[0].y !== gameParams.noColumns - 1) players[0].y += 1;
  }
  players[0].id = `xy_x${players[0].x}-y${players[0].y}`;
  colorEntityPosition(players, stylesObject.playerColor);
}

function checkPlayerCoinCollisions(players: Player[], coins: Coin[]) {
  const collision = coins.some((coin) => {
    return coin.x === players[0].x && coin.y === players[0].y;
  });
  if (collision) {
    colorEntityPosition(coins, stylesObject.coinColor);
    coins = generateEntityPosition(gameParams.noRows, gameParams.noColumns, 1);
    colorEntityPosition(coins, stylesObject.coinColor);
  }
}

function updateGameState() {
  movePlayer();
  // check for coin collisions
  checkPlayerCoinCollisions(players, coins);
  // move enemies
}

function gameLoop() {
  if (!gameParams.gameOver) {
    if (gameParams.gameStarted) updateGameState();
    setTimeout(() => {
      window.requestAnimationFrame(gameLoop), gameParams.gameSpeed;
    });
  }
}

initGame();
gameLoop();
