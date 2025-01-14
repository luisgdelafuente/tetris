import { useState, useEffect, useCallback } from 'react';
import { GameState, Tetromino, TetrominoType } from '../types';
import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOES, TICK_SPEED } from '../constants';

const createEmptyBoard = () => 
  Array(BOARD_HEIGHT).fill(null).map(() => 
    Array(BOARD_WIDTH).fill(''));

const getRandomTetromino = (): Tetromino => {
  const types = Object.keys(TETROMINOES) as TetrominoType[];
  const type = types[Math.floor(Math.random() * types.length)];
  const { shape, color } = TETROMINOES[type];
  
  return {
    shape,
    color,
    position: {
      x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
      y: 0
    }
  };
};

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    score: 0,
    gameOver: false
  });

  const spawnNewPiece = useCallback(() => {
    const newPiece = getRandomTetromino();
    setGameState(prev => ({
      ...prev,
      currentPiece: newPiece
    }));
  }, []);

  const checkCollision = useCallback((piece: Tetromino, board: string[][]): boolean => {
    return piece.shape.some((row, dy) =>
      row.some((cell, dx) => {
        if (!cell) return false;
        const newY = piece.position.y + dy;
        const newX = piece.position.x + dx;
        return (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX] !== '')
        );
      })
    );
  }, []);

  const mergePieceToBoard = useCallback((piece: Tetromino, board: string[][]) => {
    const newBoard = board.map(row => [...row]);
    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = piece.position.y + y;
          const boardX = piece.position.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      });
    });
    return newBoard;
  }, []);

  const moveDown = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.gameOver) return prev;

      const newPosition = {
        ...prev.currentPiece.position,
        y: prev.currentPiece.position.y + 1
      };

      const movedPiece = {
        ...prev.currentPiece,
        position: newPosition
      };

      if (checkCollision(movedPiece, prev.board)) {
        const newBoard = mergePieceToBoard(prev.currentPiece, prev.board);
        
        if (prev.currentPiece.position.y <= 0) {
          return { ...prev, board: newBoard, gameOver: true };
        }

        let clearedLines = 0;
        const finalBoard = newBoard.filter(row => {
          if (row.every(cell => cell !== '')) {
            clearedLines++;
            return false;
          }
          return true;
        });

        while (finalBoard.length < BOARD_HEIGHT) {
          finalBoard.unshift(Array(BOARD_WIDTH).fill(''));
        }

        return {
          ...prev,
          board: finalBoard,
          currentPiece: null,
          score: prev.score + (clearedLines * 100)
        };
      }

      return {
        ...prev,
        currentPiece: movedPiece
      };
    });
  }, [checkCollision, mergePieceToBoard]);

  const moveHorizontally = useCallback((direction: -1 | 1) => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.gameOver) return prev;

      const newPosition = {
        ...prev.currentPiece.position,
        x: prev.currentPiece.position.x + direction
      };

      const movedPiece = {
        ...prev.currentPiece,
        position: newPosition
      };

      if (!checkCollision(movedPiece, prev.board)) {
        return {
          ...prev,
          currentPiece: movedPiece
        };
      }

      return prev;
    });
  }, [checkCollision]);

  const rotate = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.gameOver) return prev;

      const rotatedShape = prev.currentPiece.shape[0].map((_, index) =>
        prev.currentPiece!.shape.map(row => row[index]).reverse()
      );

      const rotatedPiece = {
        ...prev.currentPiece,
        shape: rotatedShape
      };

      if (!checkCollision(rotatedPiece, prev.board)) {
        return {
          ...prev,
          currentPiece: rotatedPiece
        };
      }

      return prev;
    });
  }, [checkCollision]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        moveHorizontally(-1);
        break;
      case 'ArrowRight':
        moveHorizontally(1);
        break;
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowUp':
        rotate();
        break;
    }
  }, [moveHorizontally, moveDown, rotate]);

  useEffect(() => {
    if (!gameState.currentPiece && !gameState.gameOver) {
      spawnNewPiece();
    }
  }, [gameState.currentPiece, gameState.gameOver, spawnNewPiece]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameState.gameOver) {
        moveDown();
      }
    }, TICK_SPEED);

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameState.gameOver, moveDown, handleKeyPress]);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: null,
      score: 0,
      gameOver: false
    });
  }, []);

  return {
    gameState,
    resetGame,
    moveHorizontally,
    moveDown,
    rotate
  };
};