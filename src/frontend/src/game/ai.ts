import type { GameState, ActionType, Difficulty } from './types';
import { getAvailableActions } from './engine';

interface ActionScore {
  action: ActionType;
  score: number;
}

export function selectAIAction(state: GameState, difficulty: Difficulty): ActionType {
  const availableActions = getAvailableActions(state, false);
  
  if (availableActions.length === 0) {
    return 'gather'; // Fallback
  }
  
  const scoredActions: ActionScore[] = availableActions.map(action => ({
    action: action.type,
    score: evaluateAction(state, action.type, difficulty),
  }));
  
  // Sort by score descending
  scoredActions.sort((a, b) => b.score - a.score);
  
  // On normal difficulty, sometimes pick suboptimal moves
  if (difficulty === 'normal' && Math.random() < 0.3) {
    const randomIndex = Math.floor(Math.random() * Math.min(3, scoredActions.length));
    return scoredActions[randomIndex].action;
  }
  
  // On hard difficulty, always pick best move
  return scoredActions[0].action;
}

function evaluateAction(state: GameState, action: ActionType, difficulty: Difficulty): number {
  let score = 0;
  
  const aiHealth = state.aiHealth;
  const playerHealth = state.playerHealth;
  const aiResources = state.aiResources;
  const healthDiff = aiHealth - playerHealth;
  
  // Depth multiplier for hard difficulty
  const depthMultiplier = difficulty === 'hard' ? 1.5 : 1.0;
  
  switch (action) {
    case 'attack':
      // Prioritize attack when player is low on health
      score = 50;
      if (playerHealth < 40) score += 30 * depthMultiplier;
      if (state.flags.aiHasWeapon) score += 20;
      if (state.flags.playerHasShield) score -= 15;
      if (aiHealth < 30) score -= 20; // Don't attack when vulnerable
      break;
      
    case 'defend':
      // Defend when low on health or expecting attack
      score = 20;
      if (aiHealth < 50) score += 30 * depthMultiplier;
      if (state.flags.playerHasWeapon) score += 25;
      if (state.flags.aiHasShield) score += 10;
      break;
      
    case 'gather':
      // Gather when low on resources
      score = 30;
      if (aiResources < 8) score += 40 * depthMultiplier;
      if (aiResources < 4) score += 30;
      break;
      
    case 'build-shield':
      // High priority if can afford and don't have one
      score = 60;
      if (playerHealth > aiHealth) score += 20 * depthMultiplier;
      if (state.flags.playerHasWeapon) score += 25;
      break;
      
    case 'build-weapon':
      // High priority if can afford and don't have one
      score = 65;
      if (aiHealth > playerHealth) score += 20 * depthMultiplier;
      if (state.flags.playerHasShield) score += 15;
      break;
      
    case 'diplomacy':
      // Consider diplomacy if player also used it or if losing
      score = 25;
      if (state.flags.playerUsedDiplomacy) score += 50 * depthMultiplier;
      if (healthDiff < -20) score += 30;
      if (state.turn > 15) score -= 20; // Less useful late game
      break;
      
    case 'sabotage':
      // Sabotage when player has high resources
      score = 35;
      if (state.playerResources > 10) score += 30 * depthMultiplier;
      if (state.flags.allianceFormed) score -= 40; // Don't break alliance easily
      break;
      
    case 'heal':
      // Heal when health is low
      score = 20;
      if (aiHealth < 50) score += 40 * depthMultiplier;
      if (aiHealth < 30) score += 50;
      break;
  }
  
  // Add some randomness to make AI less predictable
  score += Math.random() * 10;
  
  return score;
}
