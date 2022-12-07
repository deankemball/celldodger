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
  clearGrid,
} from "./utils";
import { cloneDeep } from "lodash";
import {
  gameOverButton,
  gameOverScreen,
  livesDisplay,
  scoreDisplay,
} from "./listeners";

let gameParams: GameParameters = cloneDeep(defaultGameParameters);
let players: Player[] = [];
let coins: Coin[] = [];
let enemies: Enemy[] = [];

function initGame() {
  gameParams.gameOver = false;
  gameParams.gameStarted = false;
  gameParams.score = 0;
  gameParams.noLives = defaultGameParameters.noLives;
  scoreDisplay.innerText = gameParams.score.toString();
  livesDisplay.innerText = gameParams.noLives.toString();

  clearGrid();
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
  checkPlayerCoinCollisions(players, coins);
}

function checkPlayerCoinCollisions(playersArray: Player[], coinArray: Coin[]) {
  const collision = coinArray.some(({ x, y }) => {
    return x === playersArray[0].x && y === playersArray[0].y;
  });
  if (collision) {
    gameParams.score++;
    scoreDisplay.innerText = gameParams.score.toString();
    colorEntityPosition(coins, stylesObject.coinColor);
    coins = generateEntityPosition(gameParams.noRows, gameParams.noColumns, 1);
    colorEntityPosition(coins, stylesObject.coinColor);
  }
}

// move the enemies
function moveEnemies() {
  // remove color from previous enemy positions
  colorEntityPosition(enemies, stylesObject.enemyColor);
  // calculate x and y distance to player
  for (const enemy of enemies) {
    const [dx, dy] = [players[0].x - enemy.x, players[0].y - enemy.y];
    // 50% chance to stand still
    if (Math.round(Math.random()) >= 0.5) continue;
    // once player is within 1 cell, stand still
    if ((dx === 0 && Math.abs(dy) === 1) || (dy == 0 && Math.abs(dx))) continue;
    if (Math.abs(dx) > Math.abs(dy)) {
      enemy.x = enemy.x + Math.sign(dx) * 1;
    } else {
      enemy.y = enemy.y + Math.sign(dy) * 1;
    }
    enemy.id = `xy_x${enemy.x}-y${enemy.y}`;
  }
  // after enemies have been moved, if any of them are within 1 cell,
  // subtract a life with a 70% success rate
  const enemiesWithinReach = enemies.some(({ x, y }) => {
    return (
      (players[0].x === x && players[0].y === y + 1) ||
      (players[0].x === x && players[0].y === y - 1) ||
      (players[0].y === y && players[0].x === x + 1) ||
      (players[0].y === y && players[0].x === x - 1)
    );
  });
  if (enemiesWithinReach && Math.round(Math.random()) >= 0.7) {
    minusLife();
  }
  colorEntityPosition(enemies, stylesObject.enemyColor);
}

gameOverButton.addEventListener("click", (event) => {
  event.preventDefault();
  initGame();
  gameOverScreen.classList.toggle("opacity-0");
});

function minusLife() {
  if (gameParams.noLives > 0) {
    gameParams.noLives--;
    livesDisplay.innerText = gameParams.noLives.toString();
  } else {
    gameParams.gameOver = true;
    gameOverScreen.classList.toggle("opacity-0");
  }
}

function updateGameState() {
  movePlayer();
  moveEnemies();
}

function gameLoop() {
  //   if (gameParams.gameStarted)
  setTimeout(() => {
    window.requestAnimationFrame(() => {
      updateGameState();
      if (!gameParams.gameOver) {
        gameLoop();
      }
    });
  }, gameParams.gameSpeed);
}

initGame();
gameLoop();
