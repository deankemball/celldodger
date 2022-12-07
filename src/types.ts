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

export interface GameParameters {
  noPlayers: number;
  noEnemies: number;
  noCoins: number;
  noLives: number;
  gameSpeed: number;
  noRows: number;
  noColumns: number;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
}

export interface Entity {
  x: number;
  y: number;
  id: string;
}

export interface Enemy extends Entity {}
export interface Coin extends Entity {}
export interface Heart extends Entity {}

export interface Player extends Entity {
  lives?: number;
  lastKeyPressed?: string;
}
