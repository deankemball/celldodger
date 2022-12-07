export interface StylesObj {
  bgColor: string;
  textColor: string;
  playerColor: string;
  coinColor: string;
  enemyColor: string;
  heartColor: string;
  gridColor: string;
  borderColor: string;
  gameOverTextColor: string;
  minusLifeFlashColor: string;
  plusScoreFlashColor: string;
  plusLifeFlashColor: string;
}

export interface GameParams {
  noPlayers: number;
  noEnemies: number;
  noCoins: number;
  noLives: number;
  gameSpeed: number;
  rows: number;
  columns: number;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
}

export interface Entity {
  // [{x:1,y:1},{x:2,y:3}]
  x: number;
  y: number;
  id: number;
}

export interface Player extends Entity {
  lives: number;
  lastKeyPressed: string;
}

export interface Enemy extends Entity {}
export interface Coin extends Entity {}
export interface Heart extends Entity {}

export interface PlayerInputs {
  left: string;
  up: string;
  right: string;
  down: string;
}
