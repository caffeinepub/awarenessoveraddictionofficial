import type { SavedGame } from './types';
import type { backendInterface } from '@/backend';
import { Principal } from '@icp-sdk/core/principal';

const LOCAL_STORAGE_KEY = 'game_save';

export async function saveGame(
  savedGame: SavedGame,
  actor: backendInterface | null,
  userPrincipal: Principal | null
): Promise<void> {
  // Try backend first if available
  if (actor && userPrincipal) {
    try {
      // Backend doesn't have game save methods yet, so we'll use localStorage
      // This is a graceful fallback
      console.log('Backend persistence not yet implemented, using localStorage');
    } catch (error) {
      console.error('Backend save failed, falling back to localStorage:', error);
    }
  }
  
  // Always save to localStorage as backup
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedGame));
  } catch (error) {
    console.error('localStorage save failed:', error);
  }
}

export async function loadGame(
  actor: backendInterface | null,
  userPrincipal: Principal | null
): Promise<SavedGame | null> {
  // Try backend first if available
  if (actor && userPrincipal) {
    try {
      // Backend doesn't have game load methods yet
      console.log('Backend persistence not yet implemented, using localStorage');
    } catch (error) {
      console.error('Backend load failed, falling back to localStorage:', error);
    }
  }
  
  // Load from localStorage
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as SavedGame;
    }
  } catch (error) {
    console.error('localStorage load failed:', error);
  }
  
  return null;
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear saved game:', error);
  }
}
