// Game state types for turn-based decision-making game

export type Difficulty = 'normal' | 'hard';

export interface GameState {
  turn: number;
  playerScore: number;
  aiScore: number;
  playerHealth: number;
  aiHealth: number;
  playerResources: number;
  aiResources: number;
  // Persistent flags that track branching consequences
  flags: {
    playerHasShield: boolean;
    playerHasWeapon: boolean;
    aiHasShield: boolean;
    aiHasWeapon: boolean;
    playerUsedDiplomacy: boolean;
    aiUsedDiplomacy: boolean;
    allianceFormed: boolean;
    warDeclared: boolean;
  };
  phase: 'player-turn' | 'ai-turn' | 'game-over';
  winner: 'player' | 'ai' | null;
}

export type ActionType = 
  | 'attack' 
  | 'defend' 
  | 'gather' 
  | 'build-shield' 
  | 'build-weapon' 
  | 'diplomacy' 
  | 'sabotage'
  | 'heal';

export interface Action {
  type: ActionType;
  label: string;
  description: string;
  cost: number;
  available: (state: GameState, isPlayer: boolean) => boolean;
}

export interface TurnResult {
  action: ActionType;
  actor: 'player' | 'ai';
  description: string;
  scoreChange: number;
  healthChange: number;
  resourceChange: number;
}

export interface GameLog {
  turn: number;
  playerAction: TurnResult | null;
  aiAction: TurnResult | null;
  timestamp: number;
}

export interface SavedGame {
  finalState: GameState;
  history: GameLog[];
  difficulty: Difficulty;
  completedAt: number;
}
