import React, { useState } from 'react';
import { Edit2, Award, Calendar, Target, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { placeholderUser } from '../data/placeholders';
import AchievementModal from '../ui/AchievementModal';
import ProfileEditModal from '../ui/ProfileEditModal';

const ProfileScreen: React.FC = () => {
  const user = placeholderUser;

  // Profile uses placeholder user data (frontend-only)

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
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/20 flex items-center justify-center text-5xl lg:text-6xl">
                  {user.avatar}
                </div>
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
                    <p className="text-3xl font-bold text-text-primary dark:text-white">20</p>
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
                    <span>Course completion</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-neutral-dark overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '68%' }} />
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
                      <p className="font-bold text-lg text-text-primary">Level {user.stats.level}</p>
                      <p className="text-sm text-text-secondary">{user.stats.xp} / 2000 XP</p>
                    </div>
                    <div className="w-full h-4 bg-neutral-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-500"
                        style={{ width: `${(user.stats.xp / 2000) * 100}%` }}
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
                  {[
                    { action: 'Completed lesson', detail: 'Foundations - Step 1', time: 'Today', xp: 15 },
                    { action: 'Earned achievement', detail: '7 Day Streak', time: 'Today', xp: 50 },
                    { action: 'Completed lesson', detail: 'Getting Started - Review', time: 'Yesterday', xp: 20 },
                    { action: 'Leveled up!', detail: 'Reached Level 5', time: 'Yesterday', xp: 100 },
                    { action: 'Completed lesson', detail: 'Getting Started - Basics', time: '2 days ago', xp: 15 },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 shadow-divider last:shadow-none last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✓</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary">{activity.action}</p>
                        <p className="text-sm text-text-secondary truncate">{activity.detail}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-primary">+{activity.xp} XP</p>
                        <p className="text-xs text-text-light">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-text-light mt-6 text-center">
                  Activity log is simulated in this UI shell
                </p>
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
                    { emoji: '🌟', name: 'Rising Star', unlocked: true, description: 'Completed first course' },
                    { emoji: '🔥', name: '7 Day Streak', unlocked: true, description: 'Kept a 7 day streak' },
                    { emoji: '📖', name: '10 Lessons', unlocked: true, description: 'Completed 10 lessons' },
                    { emoji: '⭐', name: 'Level 5', unlocked: true, description: 'Reached level 5' },
                    { emoji: '🎯', name: 'Perfect Score', unlocked: false, description: 'Get a perfect assessment score' },
                    { emoji: '🏆', name: 'Champion', unlocked: false, description: 'Top 3 in leaderboard' },
                    { emoji: '💎', name: '100 XP', unlocked: false, description: 'Earn 100 XP' },
                    { emoji: '🚀', name: 'Speed Learner', unlocked: false, description: 'Finish units quickly' },
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
          <ProfileEditModal
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            initialName={user.name}
            initialAvatar={user.avatar}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
