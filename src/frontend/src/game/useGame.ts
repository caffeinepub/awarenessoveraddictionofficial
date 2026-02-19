import { useState, useCallback } from 'react';
import type { GameState, ActionType, GameLog, Difficulty, SavedGame } from './types';
import { INITIAL_STATE, applyAction, checkGameOver, getAvailableActions } from './engine';
import { selectAIAction } from './ai';

export function useGame(difficulty: Difficulty = 'normal') {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [history, setHistory] = useState<GameLog[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetGame = useCallback(() => {
    setState(INITIAL_STATE);
    setHistory([]);
    setIsProcessing(false);
  }, []);

  const executePlayerAction = useCallback(async (action: ActionType) => {
    if (state.phase !== 'player-turn' || isProcessing) return;
    
    setIsProcessing(true);
    
    // Apply player action
    const { newState: stateAfterPlayer, result: playerResult } = applyAction(state, action, true);
    
    // Check if game over after player action
    let finalState = checkGameOver(stateAfterPlayer);
    
    if (finalState.phase === 'game-over') {
      setState(finalState);
      setHistory(prev => [...prev, {
        turn: finalState.turn,
        playerAction: playerResult,
        aiAction: null,
        timestamp: Date.now(),
      }]);
      setIsProcessing(false);
      return;
    }
    
    // AI turn
    finalState = { ...finalState, phase: 'ai-turn' };
    setState(finalState);
    
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const aiAction = selectAIAction(finalState, difficulty);
    const { newState: stateAfterAI, result: aiResult } = applyAction(finalState, aiAction, false);
    
    // Check game over after AI action
    finalState = checkGameOver(stateAfterAI);
    
    // Advance turn if game continues
    if (finalState.phase !== 'game-over') {
      finalState = { ...finalState, turn: finalState.turn + 1, phase: 'player-turn' };
    }
    
    setState(finalState);
    setHistory(prev => [...prev, {
      turn: state.turn,
      playerAction: playerResult,
      aiAction: aiResult,
      timestamp: Date.now(),
    }]);
    
    setIsProcessing(false);
  }, [state, difficulty, isProcessing]);

  const availableActions = getAvailableActions(state, true);

  const getSavedGame = useCallback((): SavedGame => ({
    finalState: state,
    history,
    difficulty,
    completedAt: Date.now(),
  }), [state, history, difficulty]);

  const loadSavedGame = useCallback((saved: SavedGame) => {
    setState(saved.finalState);
    setHistory(saved.history);
  }, []);

  return {
    state,
    history,
    availableActions,
    isProcessing,
    executePlayerAction,
    resetGame,
    getSavedGame,
    loadSavedGame,
  };
}
