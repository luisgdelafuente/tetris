import { TetrominoType } from './types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const TICK_SPEED = 1000;

export const TETROMINOES: Record<TetrominoType, { shape: boolean[][], color: string }> = {
  I: {
    shape: [
      [true],
      [true],
      [true],
      [true]
    ],
    color: 'bg-cyan-500'
  },
  O: {
    shape: [
      [true, true],
      [true, true]
    ],
    color: 'bg-yellow-500'
  },
  T: {
    shape: [
      [false, true, false],
      [true, true, true]
    ],
    color: 'bg-purple-500'
  },
  S: {
    shape: [
      [false, true, true],
      [true, true, false]
    ],
    color: 'bg-green-500'
  },
  Z: {
    shape: [
      [true, true, false],
      [false, true, true]
    ],
    color: 'bg-red-500'
  },
  J: {
    shape: [
      [true, false],
      [true, false],
      [true, true]
    ],
    color: 'bg-blue-500'
  },
  L: {
    shape: [
      [false, false, true],
      [true, true, true]
    ],
    color: 'bg-orange-500'
  }
};