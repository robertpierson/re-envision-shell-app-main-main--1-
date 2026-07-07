// Placeholder data for ReEnvision app Shell (frontend-only placeholder data)

import { Unit, UserStats, LeaderboardEntry, User, Lesson } from '../types';

// Placeholder units/lessons for the lesson path
export const placeholderUnits: Unit[] = [
  {
    id: 'unit-1',
    title: 'Getting Started',
    status: 'completed',
    position: 1,
    lessons: [
      { id: 'lesson-1', unitId: 'unit-1', title: 'Welcome', status: 'completed', progress: 100, position: 1 },
      { id: 'lesson-2', unitId: 'unit-1', title: 'Basics', status: 'completed', progress: 100, position: 2 },
      { id: 'lesson-3', unitId: 'unit-1', title: 'Intro Complete', status: 'completed', progress: 100, position: 3 },
    ],
  },
  {
    id: 'unit-2',
    title: 'Foundations',
    status: 'current',
    position: 2,
    lessons: [
      { id: 'lesson-4', unitId: 'unit-2', title: 'Step 1', status: 'completed', progress: 100, position: 1 },
      { id: 'lesson-5', unitId: 'unit-2', title: 'Step 2', status: 'current', progress: 45, position: 2 },
      { id: 'lesson-6', unitId: 'unit-2', title: 'Step 3', status: 'locked', progress: 0, position: 3 },
      { id: 'lesson-7', unitId: 'unit-2', title: 'Review', status: 'locked', progress: 0, position: 4 },
    ],
  },
  {
    id: 'unit-3',
    title: 'Building Up',
    status: 'locked',
    position: 3,
    lessons: [
      { id: 'lesson-8', unitId: 'unit-3', title: 'New Skills', status: 'locked', progress: 0, position: 1 },
      { id: 'lesson-9', unitId: 'unit-3', title: 'Practice', status: 'locked', progress: 0, position: 2 },
      { id: 'lesson-10', unitId: 'unit-3', title: 'Challenge', status: 'locked', progress: 0, position: 3 },
    ],
  },
  {
    id: 'unit-4',
    title: 'Advanced',
    status: 'locked',
    position: 4,
    lessons: [
      { id: 'lesson-11', unitId: 'unit-4', title: 'Level Up', status: 'locked', progress: 0, position: 1 },
      { id: 'lesson-12', unitId: 'unit-4', title: 'Mastery', status: 'locked', progress: 0, position: 2 },
    ],
  },
  {
    id: 'unit-5',
    title: 'Expert',
    status: 'locked',
    position: 5,
    lessons: [
      { id: 'lesson-13', unitId: 'unit-5', title: 'Expert Level', status: 'locked', progress: 0, position: 1 },
    ],
  },
];

// Placeholder user stats
export const placeholderUserStats: UserStats = {
  streak: 7,
  xp: 1250,
  level: 5,
  lessonsCompleted: 12,
  totalXP: 3450,
};

// Placeholder leaderboard data
export const placeholderLeaderboard: LeaderboardEntry[] = [
  { id: '1', rank: 1, name: 'Alex M.', avatar: '🦊', xp: 5430, isCurrentUser: false },
  { id: '2', rank: 2, name: 'Sarah K.', avatar: '🦋', xp: 4892, isCurrentUser: false },
  { id: '3', rank: 3, name: 'Jordan T.', avatar: '🐼', xp: 4521, isCurrentUser: false },
  { id: '4', rank: 4, name: 'Morgan L.', avatar: '🦜', xp: 4100, isCurrentUser: false },
  { id: '5', rank: 5, name: 'Casey R.', avatar: '🦄', xp: 3890, isCurrentUser: false },
  { id: '6', rank: 6, name: 'Taylor B.', avatar: '🐨', xp: 3750, isCurrentUser: false },
  { id: '7', rank: 7, name: 'You', avatar: '🌟', xp: 3450, isCurrentUser: true },
  { id: '8', rank: 8, name: 'Drew P.', avatar: '🦈', xp: 3210, isCurrentUser: false },
  { id: '9', rank: 9, name: 'Jamie W.', avatar: '🦁', xp: 2980, isCurrentUser: false },
  { id: '10', rank: 10, name: 'Riley N.', avatar: '🐬', xp: 2750, isCurrentUser: false },
];

// Placeholder user profile
export const placeholderUser: User = {
  id: 'user-1',
  name: 'New Learner',
  avatar: '🌟',
  joinedDate: 'January 2026',
  stats: placeholderUserStats,
};

// Helper to find current lesson
export const getCurrentLesson = (): Lesson | undefined => {
  for (const unit of placeholderUnits) {
    const currentLesson = unit.lessons.find(l => l.status === 'current');
    if (currentLesson) return currentLesson;
  }
  return undefined;
};
