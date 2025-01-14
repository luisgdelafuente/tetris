import React from 'react';
import { GameState, Tetromino } from '../types';

type BoardProps = {
  gameState: GameState;
};

const Board: React.FC<BoardProps> = ({ gameState }) => {
  const { board, currentPiece } = gameState;

  const getDisplayBoard = () => {
    const displayBoard = board.map(row => [...row]);

    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (boardY >= 0 && boardY < board.length) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        });
      });
    }

    return displayBoard;
  };

  return (
    <div className="grid gap-px bg-gray-700 p-px">
      {getDisplayBoard().map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-[min(4vw,1.5rem)] h-[min(4vw,1.5rem)] ${cell || 'bg-gray-900'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;