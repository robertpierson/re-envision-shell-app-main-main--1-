import React, { useState } from 'react';
import { Edit2, Award, Calendar, Target, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { getSnapshot, onStatsChange } from '../lib/stats';
import { readProgress } from '../lib/progress';
import { getProfile, onProfileChange } from '../lib/profile';
import { courses } from '../data/curriculum';
import { levelsOf } from '../lib/progress';
import AchievementModal from '../ui/AchievementModal';
import ProfileEditModal from '../ui/ProfileEditModal';

const ProfileScreen: React.FC = () => {
  const stats = useSyncExternalStore(onStatsChange, getSnapshot, getSnapshot);
  const profile = useSyncExternalStore(onProfileChange, getProfile, getProfile);
  const done = readProgress();
  const allLevels = courses.flatMap((c) => c.units.flatMap((u) => levelsOf(u)));
  const lessonsCompleted = allLevels.filter((l) => done.has(l.id)).length;
  const completionPct = Math.round((lessonsCompleted / allLevels.length) * 100);
  const user = {
    name: profile.displayName,
    avatar: profile.avatar,
    joinedDate: 'today',
    stats: {
      streak: stats.streak,
      totalXP: stats.xp,
      level: stats.level,
      lessonsCompleted,
    },
  };

  const [selectedAchievement, setSelectedAchievement] = useState<null | { emoji: string; name: string; unlocked: boolean; description?: string }>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="min-h-screen pb-20 lg:pb-8">

      {/* Desktop header */}
      <div className="hidden lg:block mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Your Profile</h1>
        <p className="text-text-secondary mt-1">Manage your account and view your stats</p>
      </div>

      <div className="pt-16 lg:pt-0 px-4 sm:px-6 lg:px-0">
        <div className="max-w-4xl mx-auto">
          {/* Profile header - wider on desktop */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 lg:p-8 mb-6 text-white shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
              {/* Avatar */}
              <div className="relative self-center lg:self-start">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt=""
                    className="h-24 w-24 rounded-full object-cover lg:h-32 lg:w-32"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-5xl lg:h-32 lg:w-32 lg:text-6xl">
                    {user.avatar}
                  </div>
                )}
                <button
                  onClick={() => setShowEditModal(true)}
                  className="absolute bottom-1 right-1 p-3 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                  aria-label="Edit profile"
                >
                  <Edit2 className="w-4 h-4 text-primary" />
                </button>
              </div>
              {/* User info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-2xl lg:text-3xl font-bold">{user.name}</h1>
                <p className="text-white/80 text-base lg:text-lg flex items-center gap-2 mt-2 justify-center lg:justify-start">
                  <Calendar className="w-5 h-5" />
                  Joined {user.joinedDate}
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-8 mt-4 lg:mt-0">
                <div className="text-center bg-white/10 rounded-xl p-4">
                  <p className="text-3xl lg:text-4xl font-bold">{user.stats.streak}</p>
                  <p className="text-white/80 text-xs lg:text-sm">Day Streak</p>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4">
                  <p className="text-3xl lg:text-4xl font-bold">{user.stats.totalXP.toLocaleString()}</p>
                  <p className="text-white/80 text-xs lg:text-sm">Total XP</p>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4">
                  <p className="text-3xl lg:text-4xl font-bold">{user.stats.level}</p>
                  <p className="text-white/80 text-xs lg:text-sm">Level</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop two-column layout */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            {/* Left column - Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress overview */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">Progress Overview</p>
                    <h2 className="text-lg font-bold text-text-primary">Learning Progress</h2>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Updated
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-neutral dark:bg-white/5 p-4">
                    <p className="text-sm text-text-secondary dark:text-neutral-400">Hearts available</p>
                    <p className="text-3xl font-bold text-text-primary dark:text-white">{stats.hearts}/{stats.maxHearts}</p>
                  </div>
                  <div className="rounded-3xl bg-neutral dark:bg-white/5 p-4">
                    <p className="text-sm text-text-secondary dark:text-neutral-400">Current streak</p>
                    <p className="text-3xl font-bold text-text-primary dark:text-white">{user.stats.streak} days</p>
                  </div>
                  <div className="rounded-3xl bg-neutral dark:bg-white/5 p-4">
                    <p className="text-sm text-text-secondary dark:text-neutral-400">Total XP</p>
                    <p className="text-3xl font-bold text-text-primary dark:text-white">{user.stats.totalXP.toLocaleString()}</p>
                  </div>
                  <div className="rounded-3xl bg-neutral dark:bg-white/5 p-4">
                    <p className="text-sm text-text-secondary dark:text-neutral-400">Lessons completed</p>
                    <p className="text-3xl font-bold text-text-primary dark:text-white">{user.stats.lessonsCompleted}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                    <span>Curriculum completion</span>
                    <span>{completionPct}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-neutral-dark overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${completionPct}%` }} />
                  </div>
                </div>
              </div>

              {/* Current level progress */}
              <div className="card">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-secondary/10">
                    <Award className="w-8 h-8 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-lg text-text-primary">Level {stats.level}</p>
                      <p className="text-sm text-text-secondary">{stats.into} / {stats.needed} XP</p>
                    </div>
                    <div className="w-full h-4 bg-neutral-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-500"
                        style={{ width: `${(stats.into / stats.needed) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-text-light mt-3 text-center">
                  XP progress is simulated for the shell UI
                </p>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card text-center">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mx-auto mb-2">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-text-primary">{user.stats.lessonsCompleted}</p>
                  <p className="text-sm text-text-secondary">Lessons Done</p>
                </div>
                <div className="card text-center">
                  <div className="p-3 rounded-xl bg-accent/10 w-fit mx-auto mb-2">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-3xl font-bold text-text-primary">4</p>
                  <p className="text-sm text-text-secondary">Achievements</p>
                </div>
              </div>

              {/* removed manual show button; achievements are clickable in the sidebar */}

              {/* Additional desktop stats */}
              <div className="hidden lg:grid grid-cols-4 gap-4">
                <div className="card text-center">
                  <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-text-primary">24</p>
                  <p className="text-xs text-text-secondary">Lessons/Month</p>
                </div>
                <div className="card text-center">
                  <TrendingUp className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-xl font-bold text-text-primary">87%</p>
                  <p className="text-xs text-text-secondary">Accuracy</p>
                </div>
                <div className="card text-center">
                  <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xl font-bold text-text-primary">12.5h</p>
                  <p className="text-xs text-text-secondary">Total Time</p>
                </div>
                <div className="card text-center">
                  <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-text-primary">7</p>
                  <p className="text-xs text-text-secondary">Day Streak</p>
                </div>
              </div>

              {/* Recent activity */}
              <div className="card">
                <h2 className="font-bold text-xl text-text-primary mb-6">Recent Activity</h2>

                <div className="space-y-4">
                  {stats.notifications.slice(0, 6).map((n) => ({
                    action: n.text,
                    detail: '',
                    time: new Date(n.at).toLocaleDateString(),
                    xp: 0,
                  })).map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 shadow-divider last:shadow-none last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✓</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary">{activity.action}</p>
                        <p className="text-sm text-text-secondary truncate">{activity.detail}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-text-light">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {stats.notifications.length === 0 && (
                  <p className="text-xs text-text-light mt-2 text-center">
                    Nothing yet — your finished lessons, level-ups and streaks land here.
                  </p>
                )}
              </div>
            </div>

            {/* Right column - Sidebar */}
            <div className="hidden lg:block space-y-6">
              {/* Settings */}

              {/* Achievements preview */}
              <div className="card">
                <h3 className="font-bold text-lg text-text-primary mb-4">Achievements</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { emoji: '🌟', name: 'First Step', unlocked: lessonsCompleted >= 1, description: 'Finish your first level' },
                    { emoji: '💎', name: '100 XP', unlocked: stats.xp >= 100, description: 'Earn 100 XP' },
                    { emoji: '📖', name: '10 Levels', unlocked: lessonsCompleted >= 10, description: 'Complete 10 levels' },
                    { emoji: '🔥', name: '7 Day Streak', unlocked: stats.streak >= 7, description: 'Keep a 7 day streak' },
                    { emoji: '⭐', name: 'Level 5', unlocked: stats.level >= 5, description: 'Reach level 5' },
                    { emoji: '🏰', name: 'Boss Slayer', unlocked: Array.from(done).some((id) => id.endsWith('#quiz')), description: 'Beat your first unit boss' },
                    { emoji: '🎓', name: 'Course Champion', unlocked: courses.some((c) => c.units.every((u) => levelsOf(u).every((l) => done.has(l.id)))), description: 'Finish an entire course' },
                    { emoji: '🚀', name: 'Marathon', unlocked: lessonsCompleted >= 50, description: 'Complete 50 levels' },
                  ].map((achievement, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAchievement(achievement)}
                      className={`aspect-square rounded-xl flex items-center justify-center text-xl focus:outline-none ${
                        achievement.unlocked
                          ? 'bg-secondary/20'
                          : 'bg-neutral-dark opacity-40 grayscale'
                      }`}
                    >
                      {achievement.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-white/5 shadow-panel rounded-xl">
                <p className="text-sm font-semibold text-text-primary dark:text-white mb-2">About</p>
                <p className="text-xs text-text-secondary dark:text-neutral-400 leading-relaxed">Profile data shown is sample content for the UI shell.</p>
              </div>
            </div>
          </div>

          {/* Mobile support info */}
          <div className="lg:hidden mt-8 p-4 bg-white dark:bg-white/5 shadow-panel rounded-xl">
            <p className="text-sm font-semibold text-text-primary dark:text-white mb-2">About</p>
            <p className="text-xs text-text-secondary dark:text-neutral-400 leading-relaxed">Profile data shown is sample content for the UI shell.</p>
          </div>
          <AchievementModal
            open={!!selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
            emoji={selectedAchievement?.emoji}
            title={selectedAchievement?.name}
            description={selectedAchievement?.description}
          />
          <ProfileEditModal open={showEditModal} onClose={() => setShowEditModal(false)} />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
