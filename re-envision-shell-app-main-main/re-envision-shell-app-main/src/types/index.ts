// Types for ReEnvision app (frontend-only schema placeholders)

export type Screen = 'home' | 'unitmap' | 'lesson' | 'leaderboard' | 'certification' | 'profile' | 'settings';

export type UnitStatus = 'locked' | 'current' | 'completed';

// Base unit interface
// Frontend placeholder for curriculum data
export interface Unit {
  id: string;
  title: string;
  status: UnitStatus;
  lessons: Lesson[];
  position: number;
}

// Lesson interface
// Frontend placeholder for lesson content
export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  status: UnitStatus;
  progress: number; // 0-100
  position: number;
}

// User progress stats (frontend placeholder)
export interface UserStats {
  streak: number;
  xp: number;
  level: number;
  lessonsCompleted: number;
  totalXP: number;
}

// Leaderboard entry (frontend placeholder)
export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
}

// User profile (frontend placeholder)
export interface User {
  id: string;
  name: string;
  avatar: string;
  joinedDate: string;
  stats: UserStats;
}
