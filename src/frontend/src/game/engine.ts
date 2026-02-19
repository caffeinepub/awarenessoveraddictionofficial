import type { GameState, Action, ActionType, TurnResult, GameLog } from './types';

export const INITIAL_STATE: GameState = {
  turn: 1,
  playerScore: 0,
  aiScore: 0,
  playerHealth: 100,
  aiHealth: 100,
  playerResources: 10,
  aiResources: 10,
  flags: {
    playerHasShield: false,
    playerHasWeapon: false,
    aiHasShield: false,
    aiHasWeapon: false,
    playerUsedDiplomacy: false,
    aiUsedDiplomacy: false,
    allianceFormed: false,
    warDeclared: false,
  },
  phase: 'player-turn',
  winner: null,
};

export const ACTIONS: Action[] = [
  {
    type: 'attack',
    label: 'Attack',
    description: 'Deal damage to opponent. More effective with weapon.',
    cost: 3,
    available: (state, isPlayer) => {
      const resources = isPlayer ? state.playerResources : state.aiResources;
      return resources >= 3 && !state.flags.allianceFormed;
    },
  },
  {
    type: 'defend',
    label: 'Defend',
    description: 'Reduce incoming damage this turn. More effective with shield.',
    cost: 2,
    available: (state, isPlayer) => {
      const resources = isPlayer ? state.playerResources : state.aiResources;
      return resources >= 2;
    },
  },
  {
    type: 'gather',
    label: 'Gather Resources',
    description: 'Collect resources for future actions.',
    cost: 0,
    available: () => true,
  },
  {
    type: 'build-shield',
    label: 'Build Shield',
    description: 'Permanently improve defense. Can only be built once.',
    cost: 8,
    available: (state, isPlayer) => {
      const resources = isPlayer ? state.playerResources : state.aiResources;
      const hasShield = isPlayer ? state.flags.playerHasShield : state.flags.aiHasShield;
      return resources >= 8 && !hasShield;
    },
  },
  {
    type: 'build-weapon',
    label: 'Build Weapon',
    description: 'Permanently improve attack. Can only be built once.',
    cost: 8,
    available: (state, isPlayer) => {
      const resources = isPlayer ? state.playerResources : state.aiResources;
      const hasWeapon = isPlayer ? state.flags.playerHasWeapon : state.flags.aiHasWeapon;
      return resources >= 8 && !hasWeapon;
    },
  },
  {
    type: 'diplomacy',
    label: 'Diplomacy',
    description: 'Attempt to form alliance. Prevents attacks but enables cooperation.',
    cost: 5,
    available: (state, isPlayer) => {
      const resources = isPlayer ? state.playerResources : state.aiResources;
      const usedDiplomacy = isPlayer ? state.flags.playerUsedDiplomacy : state.flags.aiUsedDiplomacy;
      return resources >= 5 && !usedDiplomacy && !state.flags.warDeclared;
    },
  },
  {
    type: 'sabotage',
    label: 'Sabotage',
    description: 'Reduce opponent resources. Declares war if alliance exists.',
    cost: 4,
    available: (state, isPlayer) => {
      const resources = isPlayer ? state.playerResources : state.aiResources;
      return resources >= 4;
    },
  },
  {
    type: 'heal',
    label: 'Heal',
    description: 'Restore health points.',
    cost: 4,
    available: (state, isPlayer) => {
      const resources = isPlayer ? state.playerResources : state.aiResources;
      const health = isPlayer ? state.playerHealth : state.aiHealth;
      return resources >= 4 && health < 100;
    },
  },
];

export function applyAction(
  state: GameState,
  action: ActionType,
  isPlayer: boolean
): { newState: GameState; result: TurnResult } {
  const newState = { ...state, flags: { ...state.flags } };
  
  const actor = isPlayer ? 'player' : 'ai';
  const actionDef = ACTIONS.find(a => a.type === action);
  const cost = actionDef?.cost || 0;
  
  let description = '';
  let scoreChange = 0;
  let healthChange = 0;
  let resourceChange = -cost;
  
  // Apply resource cost
  if (isPlayer) {
    newState.playerResources -= cost;
  } else {
    newState.aiResources -= cost;
  }
  
  // Execute action effects
  switch (action) {
    case 'attack': {
      const hasWeapon = isPlayer ? state.flags.playerHasWeapon : state.flags.aiHasWeapon;
      const targetHasShield = isPlayer ? state.flags.aiHasShield : state.flags.playerHasShield;
      
      let damage = hasWeapon ? 25 : 15;
      if (targetHasShield) damage = Math.floor(damage * 0.6);
      
      if (isPlayer) {
        newState.aiHealth = Math.max(0, newState.aiHealth - damage);
        healthChange = -damage;
      } else {
        newState.playerHealth = Math.max(0, newState.playerHealth - damage);
        healthChange = -damage;
      }
      
      scoreChange = Math.floor(damage / 5);
      description = `${actor === 'player' ? 'You' : 'AI'} attacked for ${damage} damage${hasWeapon ? ' (weapon bonus)' : ''}${targetHasShield ? ' (reduced by shield)' : ''}`;
      
      if (state.flags.allianceFormed) {
        newState.flags.warDeclared = true;
        newState.flags.allianceFormed = false;
        description += '. Alliance broken - war declared!';
      }
      break;
    }
    
    case 'defend': {
      const hasShield = isPlayer ? state.flags.playerHasShield : state.flags.aiHasShield;
      scoreChange = hasShield ? 3 : 2;
      description = `${actor === 'player' ? 'You' : 'AI'} took a defensive stance${hasShield ? ' (shield bonus)' : ''}`;
      break;
    }
    
    case 'gather': {
      const gathered = 5;
      resourceChange += gathered;
      if (isPlayer) {
        newState.playerResources += gathered;
      } else {
        newState.aiResources += gathered;
      }
      scoreChange = 1;
      description = `${actor === 'player' ? 'You' : 'AI'} gathered ${gathered} resources`;
      break;
    }
    
    case 'build-shield': {
      if (isPlayer) {
        newState.flags.playerHasShield = true;
      } else {
        newState.flags.aiHasShield = true;
      }
      scoreChange = 5;
      description = `${actor === 'player' ? 'You' : 'AI'} built a shield! Defense permanently improved`;
      break;
    }
    
    case 'build-weapon': {
      if (isPlayer) {
        newState.flags.playerHasWeapon = true;
      } else {
        newState.flags.aiHasWeapon = true;
      }
      scoreChange = 5;
      description = `${actor === 'player' ? 'You' : 'AI'} built a weapon! Attack permanently improved`;
      break;
    }
    
    case 'diplomacy': {
      if (isPlayer) {
        newState.flags.playerUsedDiplomacy = true;
      } else {
        newState.flags.aiUsedDiplomacy = true;
      }
      
      if (state.flags.playerUsedDiplomacy && state.flags.aiUsedDiplomacy) {
        newState.flags.allianceFormed = true;
        scoreChange = 10;
        description = `${actor === 'player' ? 'You' : 'AI'} proposed diplomacy. Alliance formed! Attacks now disabled`;
      } else {
        scoreChange = 3;
        description = `${actor === 'player' ? 'You' : 'AI'} proposed diplomacy. Waiting for response...`;
      }
      break;
    }
    
    case 'sabotage': {
      const resourceLoss = 6;
      if (isPlayer) {
        newState.aiResources = Math.max(0, newState.aiResources - resourceLoss);
      } else {
        newState.playerResources = Math.max(0, newState.playerResources - resourceLoss);
      }
      scoreChange = 4;
      description = `${actor === 'player' ? 'You' : 'AI'} sabotaged opponent, reducing their resources by ${resourceLoss}`;
      
      if (state.flags.allianceFormed) {
        newState.flags.warDeclared = true;
        newState.flags.allianceFormed = false;
        description += '. Alliance broken - war declared!';
      }
      break;
    }
    
    case 'heal': {
      const healing = 20;
      if (isPlayer) {
        newState.playerHealth = Math.min(100, newState.playerHealth + healing);
        healthChange = healing;
      } else {
        newState.aiHealth = Math.min(100, newState.aiHealth + healing);
        healthChange = healing;
      }
      scoreChange = 2;
      description = `${actor === 'player' ? 'You' : 'AI'} healed for ${healing} health`;
      break;
    }
  }
  
  // Update score
  if (isPlayer) {
    newState.playerScore += scoreChange;
  } else {
    newState.aiScore += scoreChange;
  }
  
  return {
    newState,
    result: {
      action,
      actor,
      description,
      scoreChange,
      healthChange,
      resourceChange,
    },
  };
}

export function checkGameOver(state: GameState): GameState {
  if (state.playerHealth <= 0) {
    return { ...state, phase: 'game-over', winner: 'ai' };
  }
  if (state.aiHealth <= 0) {
    return { ...state, phase: 'game-over', winner: 'player' };
  }
  if (state.turn >= 20) {
    // Game ends after 20 turns - highest score wins
    const winner = state.playerScore > state.aiScore ? 'player' : 'ai';
    return { ...state, phase: 'game-over', winner };
  }
  return state;
}

export function getAvailableActions(state: GameState, isPlayer: boolean): Action[] {
  return ACTIONS.filter(action => action.available(state, isPlayer));
}
