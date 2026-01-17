/**
 * Game entity
 */
export interface Game {
  id: string;
  name: string;
  slug: string;
  iconUrl?: string;
  description?: string;
}

/**
 * Achievement definition
 */
export interface Achievement {
  id: string;
  gameId: string;
  name: string;
  description: string;
  iconUrl: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  points: number;
  isUnlocked: boolean;
  progress?: number; // 0-100 percentage
  unlockDate?: string; // ISO date string
  // Detail view metadata
  platform?: string; // e.g., "Epic Games"
  nickname?: string; // e.g., "joivitt"
  event?: string; // e.g., "--" if none
  expirationDate?: string; // ISO date string, optional
  playerPercentage?: number; // e.g., 19 (percentage of players who have it)
  isWatched?: boolean; // "marcar como vendo" state
  isPinned?: boolean; // "fixar" state
}

export type AchievementCategory = 
  | 'combat'
  | 'exploration'
  | 'social'
  | 'collection'
  | 'progression'
  | 'special';

export type AchievementRarity = 
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary';

/**
 * Friend entity
 */
export interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
  username: string;
}

/**
 * User achievement progress
 */
export interface UserAchievement {
  achievementId: string;
  userId: string;
  isUnlocked: boolean;
  progress: number; // 0-100 percentage
  unlockDate?: string; // ISO date string
}

/**
 * Achievement with friend data
 */
export interface AchievementWithFriends extends Achievement {
  friendsWhoHaveIt: Friend[];
}

/**
 * Modal view type
 */
export type ModalView = 'compact' | 'list' | 'detail';

