import { GameParams, PlayerInputs, StylesObj } from "./types";

export const stylesObj: StylesObj = {
  bgColor: "bg-bgColor",
  textColor: "text-textColor",
  playerColor: "bg-playerColor",
  coinColor: "bg-coinColor",
  enemyColor: "bg-enemyColor",
  heartColor: "bg-heartColor",
  gridColor: "bg-gridColor",
  borderColor: "border-bgColor",
  gameOverTextColor: "text-playerColor",
  minusLifeFlashColor: "border-playerColor",
  plusScoreFlashColor: "border-coinColor",
  plusLifeFlashColor: "border-heartColor",
};

export const defaultGameParams: GameParams = {
  noPlayers: 1,
  noEnemies: 4,
  noCoins: 1,
  noLives: 3,
  gameSpeed: 200,
  rows: 20,
  columns: 20,
  score: 0,
  gameStarted: false,
  gameOver: false,
};

export const playerInputs: PlayerInputs = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
};
