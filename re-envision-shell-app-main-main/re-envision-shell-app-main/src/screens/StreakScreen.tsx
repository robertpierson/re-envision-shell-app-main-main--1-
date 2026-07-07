import React from 'react';
import { Trophy, Target, Zap, Calendar, TrendingUp, Clock } from 'lucide-react';
import StatCard from '../ui/StatCard';
import { placeholderUserStats } from '../data/placeholders';

const StreakScreen: React.FC = () => {
  const stats = placeholderUserStats;
  const daysThisWeek = [true, true, true, true, true, false, false]; // Mon-Sun

  // Uses placeholder streak and progress data for the UI shell
  return (
    <div className="min-h-screen pb-20 lg:pb-8">

      {/* Desktop header */}
      <div className="hidden lg:block mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Your Progress</h1>
        <p className="text-text-secondary mt-1">Track your learning journey</p>
      </div>

      <div className="pt-16 lg:pt-0 px-4 sm:px-6 lg:px-0">
        <div className="max-w-4xl mx-auto">
          {/* Streak hero - wider on desktop */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Current streak card */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 lg:p-8 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/80 font-semibold">Current Streak</p>
                  <p className="text-5xl lg:text-6xl font-bold mt-2">{stats.streak} days</p>
                  <p className="text-white/80 text-base mt-2">Keep it going!</p>
                </div>
                <div className="text-6xl lg:text-7xl">🔥</div>
              </div>

              {/* Week progress */}
              <div className="mt-6 lg:mt-8">
                <p className="text-white/80 text-sm font-semibold mb-3">This Week</p>
                <div className="flex justify-between">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                          daysThisWeek[i]
                            ? 'bg-white text-orange-500'
                            : 'bg-white/20 text-white/60'
                        }`}
                      >
                        {daysThisWeek[i] ? '✓' : ''}
                      </div>
                      <span className="text-xs text-white/80 font-semibold">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level progress card */}
            <div className="bg-white dark:bg-neutral-dark rounded-3xl p-6 lg:p-8 shadow-panel">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-secondary/10">
                  <Trophy className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Current Level</p>
                  <p className="text-3xl font-bold text-text-primary">Level {stats.level}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">Progress to Level {stats.level + 1}</span>
                  <span className="font-bold text-primary">{stats.xp} / 2000 XP</span>
                </div>
                <div className="w-full h-4 bg-neutral-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-500"
                    style={{ width: `${(stats.xp / 2000) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 shadow-divider-top">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">{stats.totalXP.toLocaleString()}</p>
                  <p className="text-sm text-text-secondary">Total XP</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">{stats.lessonsCompleted}</p>
                  <p className="text-sm text-text-secondary">Lessons Done</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid - 2 columns on desktop */}
          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            <StatCard
              icon={TrendingUp}
              label="Weekly Goal Progress"
              value="125 XP"
              color="primary"
              subtext="Goal: 250 XP this week"
            />
            <StatCard
              icon={Clock}
              label="Time Spent Learning"
              value="4.5 hrs"
              color="secondary"
              subtext="This week"
            />
          </div>

          {/* Daily goal section */}
          <div className="card mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-text-primary">Daily Goal</p>
                <p className="text-sm text-text-secondary">1 lesson per day</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">1/1</p>
                <p className="text-xs text-text-light">Complete</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <h2 className="font-bold text-xl text-text-primary mb-6">Achievements</h2>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
              {[
                { emoji: '🌟', name: 'Rising Star', unlocked: true },
                { emoji: '🔥', name: '7 Day Streak', unlocked: true },
                { emoji: '📖', name: '10 Lessons', unlocked: true },
                { emoji: '⭐', name: 'Level 5', unlocked: true },
                { emoji: '🎯', name: 'Perfect Score', unlocked: false },
                { emoji: '🏆', name: 'Champion', unlocked: false },
                { emoji: '💎', name: '100 XP', unlocked: false },
                { emoji: '🚀', name: 'Speed Learner', unlocked: false },
              ].map((achievement, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl ${
                      achievement.unlocked
                        ? 'bg-secondary/20'
                        : 'bg-neutral-dark opacity-40 grayscale'
                    }`}
                  >
                    {achievement.emoji}
                  </div>
                  <p className="text-xs font-semibold text-text-secondary mt-2 text-center truncate w-full">
                    {achievement.name}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-text-light mt-6">Achievements are placeholders in this UI shell.</p>
          </div>

          {/* Additional stats section (desktop only) */}
          <div className="hidden lg:block mt-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white dark:bg-neutral-dark rounded-2xl p-6 text-center shadow-panel">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-text-primary">24</p>
                <p className="text-sm text-text-secondary">Lessons This Month</p>
              </div>
              <div className="bg-white dark:bg-neutral-dark rounded-2xl p-6 text-center shadow-panel">
                <Zap className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold text-text-primary">87%</p>
                <p className="text-sm text-text-secondary">Accuracy Rate</p>
              </div>
              <div className="bg-white dark:bg-neutral-dark rounded-2xl p-6 text-center shadow-panel">
                <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-text-primary">12.5h</p>
                <p className="text-sm text-text-secondary">Total Time</p>
              </div>
              <div className="bg-white dark:bg-neutral-dark rounded-2xl p-6 text-center shadow-panel">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-text-primary">4</p>
                <p className="text-sm text-text-secondary">Badges Earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakScreen;
