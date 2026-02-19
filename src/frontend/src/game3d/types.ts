export type GameStatus = 'start' | 'playing' | 'gameover';

export interface Game3DState {
  status: GameStatus;
  score: number;
  lives: number;
  startGame: () => void;
  restartGame: () => void;
  addScore: (points: number) => void;
  loseLife: () => void;
  playerPosition: [number, number, number];
  updatePlayerPosition: (position: [number, number, number]) => void;
}

export interface PickupData {
  id: string;
  position: [number, number, number];
  collected: boolean;
}

export interface ObstacleData {
  id: string;
  position: [number, number, number];
  velocity: [number, number, number];
}
