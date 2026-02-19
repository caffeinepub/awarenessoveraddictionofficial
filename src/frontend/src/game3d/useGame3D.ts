import { useState, useCallback, useRef } from 'react';
import { Game3DState, GameStatus } from './types';

export function useGame3D(): Game3DState {
  const [status, setStatus] = useState<GameStatus>('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 0.5, 0]);
  const gameOverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    setStatus('playing');
    setScore(0);
    setLives(3);
    setPlayerPosition([0, 0.5, 0]);
    if (gameOverTimeoutRef.current) {
      clearTimeout(gameOverTimeoutRef.current);
      gameOverTimeoutRef.current = null;
    }
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const addScore = useCallback((points: number) => {
    setScore((prev) => prev + points);
  }, []);

  const loseLife = useCallback(() => {
    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        if (gameOverTimeoutRef.current) {
          clearTimeout(gameOverTimeoutRef.current);
        }
        gameOverTimeoutRef.current = setTimeout(() => {
          setStatus('gameover');
        }, 100);
      }
      return Math.max(0, newLives);
    });
  }, []);

  const updatePlayerPosition = useCallback((position: [number, number, number]) => {
    setPlayerPosition(position);
  }, []);

  return {
    status,
    score,
    lives,
    startGame,
    restartGame,
    addScore,
    loseLife,
    playerPosition,
    updatePlayerPosition,
  };
}
