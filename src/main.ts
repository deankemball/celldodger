import { cloneDeep } from "lodash";
import { defaultGameParams, playerInputs, stylesObj } from "./constants";
import {
  consoleDisplay,
  gameOverScreen,
  gameSpeedInput,
  grid,
  livesDisplay,
  noCoinsInput,
  noEnemiesInput,
  noLivesInput,
  restartButton,
  scoreDisplay,
} from "./listeners";
import { Coin, Enemy, GameParams, Heart, Player } from "./types";
import {
  colorEntity,
  flashGrid,
  generateGrid,
  generatePosition,
  minusLife,
  mod,
  removeChildren,
} from "./utils";

let gameParams: GameParams = cloneDeep(defaultGameParams);
let players: Player[] = [];
let enemies: Enemy[] = [];
let coins: Coin[] = [];
let hearts: Heart[] = [];

function updateInput(element: HTMLInputElement, gameParam: keyof GameParams) {
  element.addEventListener("input", () => {
    gameParams[gameParam] = element.value as never;
    console.log(gameParams[gameParam]);
    initGame();
  });
}

updateInput(noLivesInput, "noLives");
updateInput(noEnemiesInput, "noEnemies");
updateInput(gameSpeedInput, "gameSpeed");
updateInput(noCoinsInput, "noCoins");

// INITIALIZE
export function initGame() {
  gameOverScreen.classList.add("opacity-0");
  restartButton.classList.add("opacity-0");
  gameParams.score = 0;
  gameParams.gameOver = false;
  gameParams.gameStarted = false;
  gameParams.noLives = Number(noLivesInput.value);
  livesDisplay.innerHTML = gameParams.noLives.toString();
  scoreDisplay.innerHTML = gameParams.score.toString();
  consoleDisplay.innerText = "";

  players = [];
  coins = [];
  enemies = [];

  removeChildren(grid);
  generateGrid(gameParams.rows, gameParams.columns);

  generatePosition(
    gameParams.rows,
    gameParams.columns,
    players,
    gameParams.noPlayers
  );
  generatePosition(
    gameParams.rows,
    gameParams.columns,
    coins,
    gameParams.noCoins
  );
  generatePosition(
    gameParams.rows,
    gameParams.columns,
    enemies,
    gameParams.noEnemies
  );

  colorEntity(players, stylesObj.playerColor);
  colorEntity(coins, stylesObj.coinColor);
  colorEntity(enemies, stylesObj.enemyColor);

  document.addEventListener("keydown", () => {
    if (!gameParams.gameStarted) startGame();
  });
}

// START
export function startGame() {
  gameParams.gameStarted = true;
}

//  UPDATE
// entity collisions
function playerCoinCollision(players: Player[], coins: Coin[]) {
  if (
    coins.some(({ x, y }) => {
      return players[0].x === x && players[0].y === y;
    })
  ) {
    gameParams.score++;
    consoleDisplay.innerText = "you found a coin!";
    scoreDisplay.innerHTML = gameParams.score.toString();
    flashGrid("plusScoreFlashColor", gameParams);
    colorEntity(coins, stylesObj.coinColor);
    coins.pop();
    generatePosition(
      gameParams.rows,
      gameParams.columns,
      coins,
      gameParams.noCoins
    );
    colorEntity(coins, stylesObj.coinColor);
  }
}

function playerHeartCollision(players: Player[], coins: Coin[]) {
  if (
    hearts.some(({ x, y }) => {
      return players[0].x === x && players[0].y === y;
    })
  ) {
    gameParams.noLives++;
    consoleDisplay.innerText = "you gained a life!";
    livesDisplay.innerText = gameParams.noLives.toString();
    flashGrid("plusLifeFlashColor", gameParams);
    colorEntity(coins, stylesObj.heartColor);
    hearts.pop();
  }
}

// track which key player pressed
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case playerInputs.left:
      players[0].lastKeyPressed = playerInputs.left;
      break;
    case playerInputs.up:
      players[0].lastKeyPressed = playerInputs.up;
      break;
    case playerInputs.right:
      players[0].lastKeyPressed = playerInputs.right;
      break;
    case playerInputs.down:
      players[0].lastKeyPressed = playerInputs.down;
      break;
  }
});

// move the player
export function movePlayer(player: Player) {
  if (player.lastKeyPressed === playerInputs.left) {
    if (players[0].x === 0) return;
    colorEntity([players[0]], stylesObj.playerColor);
    player.x -= 1;
    colorEntity([players[0]], stylesObj.playerColor);
  }
  if (player.lastKeyPressed === playerInputs.up) {
    if (players[0].y === 0) return;
    colorEntity([players[0]], stylesObj.playerColor);
    player.y -= 1;
    colorEntity([players[0]], stylesObj.playerColor);
  }
  if (player.lastKeyPressed === playerInputs.right) {
    if (players[0].x === gameParams.columns - 1) return;
    colorEntity([players[0]], stylesObj.playerColor);
    player.x += 1;
    colorEntity([players[0]], stylesObj.playerColor);
  }
  if (player.lastKeyPressed === playerInputs.down) {
    if (players[0].y === gameParams.rows - 1) return;
    colorEntity([players[0]], stylesObj.playerColor);
    player.y += 1;
    colorEntity([players[0]], stylesObj.playerColor);
  }
  playerCoinCollision(players, coins);
  playerHeartCollision(players, hearts);
}

// move the enemies
export function moveEnemies(enemies: Enemy[], player: Player) {
  // remove color from previous enemy positions
  colorEntity(enemies, stylesObj.enemyColor);
  for (const enemy of enemies) {
    // calculate x and y distance to player
    const [dx, dy] = [player.x - enemy.x, player.y - enemy.y];
    // 50% chance enemy stands still
    if (Math.round(Math.random()) >= 0.5) continue;
    // enemy stops when within 1 cell of player
    if ((dx === 0 && Math.abs(dy) === 1) || (dy === 0 && Math.abs(dx) === 1))
      continue;
    // enemy moves in direction shortest to player (even through walls)
    // future proofed for when player can travel through walls
    if (Math.abs(dy) >= Math.abs(dx)) {
      enemy.y = mod(enemy.y + Math.sign(dy) * 1, gameParams.rows);
    } else if (Math.abs(dx) >= Math.abs(dy)) {
      enemy.x = mod(enemy.x + Math.sign(dx) * 1, gameParams.columns);
    }
  }
  // after enemies have been moved, if any of them are within 1 cell,
  // subtract a life with a 70% success rate
  if (
    enemies.some(({ x, y }) => {
      return (
        (player.x === x && player.y === y + 1) ||
        (player.x === x && player.y === y - 1) ||
        (player.y === y && player.x === x + 1) ||
        (player.y === y && player.x === x - 1)
      );
    })
  ) {
    if (Math.round(Math.random()) > 0.7) {
      consoleDisplay.innerText = "you got hit!";
      minusLife(gameParams);
    } else {
      consoleDisplay.innerText = "enemy missed!";
    }
  }
  // add color to new enemy positions
  colorEntity(enemies, stylesObj.enemyColor);
}

// function to move players & enemies,
// check for hearts on field, 5% chance to drop new heart
export function updateGameState() {
  movePlayer(players[0]);
  moveEnemies(enemies, players[0]);
  if (hearts.length > 0) {
    return;
  } else if (Math.random() < 0.05) {
    generatePosition(gameParams.rows, gameParams.columns, hearts, 1);
    colorEntity(hearts, stylesObj.heartColor);
  }
}

// function called every frame as per game speed,
// until game over
export function gameLoop() {
  if (!gameParams.gameOver) {
    if (gameParams.gameStarted) updateGameState();
    setTimeout(() => {
      window.requestAnimationFrame(gameLoop);
    }, gameParams.gameSpeed);
  }
}

// on document load, init the game and begin game loop
initGame();
gameLoop();

export {};
