export interface LeaderboardClass {
  id: string;
  name: string;
  members: string[];
}

export const leaderboardClasses: LeaderboardClass[] = [
  { id: 'class-a', name: 'AI Foundations', members: ['Alex M.', 'Sarah K.', 'Jordan T.', 'You'] },
  { id: 'class-b', name: 'Prompting Pros', members: ['Morgan L.', 'Casey R.', 'Taylor B.', 'You'] },
  { id: 'class-c', name: 'Data Ethics', members: ['Drew P.', 'Jamie W.', 'Riley N.', 'You'] },
];
