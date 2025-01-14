export type Position = {
  x: number;
  y: number;
};

export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type Tetromino = {
  shape: boolean[][];
  color: string;
  position: Position;
};

export type GameState = {
  board: string[][];
  currentPiece: Tetromino | null;
  score: number;
  gameOver: boolean;
};