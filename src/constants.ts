import { StylesObj } from "./types";

export const stylesObject: StylesObj = {
  bgColor: "bg-bgColor",
  textColor: "text-textColor",
  playerColor: "bg-playerColor",
  coinColor: "bg-coinColor",
  enemyColor: "bg-enemyColor",
  heartColor: "bg-heartColor",
  gridColor: "bg-gridColor",
  gameOverTextColor: "text-playerColor",
  minusLifeFlashColor: "border-playerColor",
  plusScoreFlashColor: "border-coinColor",
  plusLifeFlashColor: "border-heartColor",
  borderColor: "",
};

export const gameParameters = {
  noPlayers: 1,
  noEnemies: 6,
  noLives: 3,
  noCoins: 1,
  noRows: 20,
  noColumns: 20,
  score: 0,
  gameStarted: false,
  gameOver: false,
};
