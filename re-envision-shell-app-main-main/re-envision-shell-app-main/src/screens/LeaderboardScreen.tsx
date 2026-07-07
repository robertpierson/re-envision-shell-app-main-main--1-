import React, { useState } from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';
import { placeholderLeaderboard } from '../data/placeholders';
import { leaderboardClasses } from '../data/leaderboardClasses';

type LeaderboardTab = 'weekly' | 'monthly' | 'alltime';

const LeaderboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('weekly');
  const [selectedClassId, setSelectedClassId] = useState<string>(leaderboardClasses[0]?.id || '');
  const leaderboard = placeholderLeaderboard;

  const selectedClass = leaderboardClasses.find((item) => item.id === selectedClassId) ?? leaderboardClasses[0];
  const classMembers = new Set(selectedClass?.members ?? []);
  const filteredLeaderboard = leaderboard.filter((entry) => classMembers.has(entry.name));

  // Frontend-only placeholder leaderboard data

  const tabs: { key: LeaderboardTab; label: string }[] = [
    { key: 'weekly', label: 'This Week' },
    { key: 'monthly', label: 'This Month' },
    { key: 'alltime', label: 'All Time' },
  ];

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-400 text-yellow-900';
      case 2:
        return 'bg-gray-300 text-gray-700';
      case 3:
        return 'bg-amber-600 text-amber-100';
      default:
        return 'bg-neutral-dark text-text-light';
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      {/* Desktop header */}
      <div className="hidden lg:block mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Leaderboard</h1>
        <p className="text-text-secondary mt-1">See how you rank against other learners</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <input placeholder="Enter class code to join" className="rounded-2xl shadow-panel px-4 py-2 w-full bg-white dark:bg-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary/60" />
          <button className="px-4 py-2 rounded-2xl bg-primary text-white font-semibold">Join Class</button>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-text-secondary">Enrolled classes</div>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="rounded-2xl shadow-panel bg-white dark:bg-neutral-dark px-4 py-2 text-text-primary"
          >
            {leaderboardClasses.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-16 lg:pt-0 px-4 sm:px-6 lg:px-0">
        <div className="max-w-4xl mx-auto">
          {/* Top 3 podium - larger on desktop */}
          <div className="flex justify-center items-end gap-3 sm:gap-6 lg:gap-10 mb-8 lg:mb-12 mt-4 lg:mt-8">
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-gray-300 bg-white flex items-center justify-center text-3xl lg:text-4xl mb-2">
                {filteredLeaderboard[1]?.avatar}
              </div>
              <div className="w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 bg-gray-300 rounded-t-2xl flex flex-col items-center justify-center gap-1">
                <Medal className="w-6 h-6 lg:w-8 lg:h-8 text-gray-600" />
                <span className="text-xl lg:text-2xl font-bold text-gray-700">2</span>
              </div>
              <p className="text-sm lg:text-base font-bold text-text-primary mt-2">{filteredLeaderboard[1]?.name}</p>
              <p className="text-xs lg:text-sm text-text-light">{filteredLeaderboard[1]?.xp.toLocaleString()} XP</p>
            </div>

            {/* 1st place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-4 border-yellow-400 bg-white flex items-center justify-center text-4xl lg:text-5xl mb-2">
                  {filteredLeaderboard[0]?.avatar}
                </div>
                <div className="absolute -top-4 lg:-top-6 left-1/2 -translate-x-1/2">
                  <Crown className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400" />
                </div>
              </div>
              <div className="w-20 sm:w-24 lg:w-36 h-20 sm:h-24 lg:h-36 bg-yellow-400 rounded-t-2xl flex flex-col items-center justify-center gap-2">
                <Trophy className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-800" />
                <span className="text-2xl lg:text-3xl font-bold text-yellow-900">1</span>
              </div>
              <p className="text-sm lg:text-lg font-bold text-text-primary mt-2">{filteredLeaderboard[0]?.name}</p>
              <p className="text-xs lg:text-base text-text-light">{filteredLeaderboard[0]?.xp.toLocaleString()} XP</p>
            </div>

            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-amber-600 bg-white flex items-center justify-center text-3xl lg:text-4xl mb-2">
                {filteredLeaderboard[2]?.avatar}
              </div>
              <div className="w-16 sm:w-20 lg:w-28 h-12 sm:h-16 lg:h-20 bg-amber-600 rounded-t-2xl flex flex-col items-center justify-center gap-1">
                <Medal className="w-5 h-5 lg:w-6 lg:h-6 text-amber-100" />
                <span className="text-lg lg:text-xl font-bold text-amber-100">3</span>
              </div>
              <p className="text-sm lg:text-base font-bold text-text-primary mt-2">{filteredLeaderboard[2]?.name}</p>
              <p className="text-xs lg:text-sm text-text-light">{filteredLeaderboard[2]?.xp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white dark:bg-neutral-dark rounded-2xl p-1.5 lg:p-2 mb-4 lg:mb-6 shadow-panel max-w-md mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 lg:py-4 px-4 rounded-xl font-semibold text-sm lg:text-base transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-neutral-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop grid layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            {/* Left column - Your position */}
            <div className="bg-white dark:bg-neutral-dark rounded-2xl shadow-panel p-6">
              <h3 className="font-bold text-lg text-text-primary mb-4">Your Position</h3>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border-2 border-primary">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center font-bold text-lg text-white">
                  7
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg text-text-primary">You</p>
                  <p className="text-text-secondary">3,450 XP</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Rank</p>
                  <p className="text-2xl font-bold text-primary">#7</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">XP to next rank</span>
                  <span className="font-bold text-text-primary">300 XP</span>
                </div>
                <div className="w-full h-3 bg-neutral-dark rounded-full overflow-hidden">
                  <div className="w-[72%] h-full bg-secondary rounded-full" />
                </div>
                <p className="text-xs text-text-light text-center">720 XP behind #6 - Taylor B.</p>
              </div>
            </div>

            {/* Right column - Top performers this week */}
            <div className="bg-white dark:bg-neutral-dark rounded-2xl shadow-panel p-6">
              <h3 className="font-bold text-lg text-text-primary mb-4">Top Performers</h3>
              <div className="space-y-3">
                {filteredLeaderboard.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyle(entry.rank)}`}>
                      {entry.rank}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {entry.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary truncate">{entry.name}</p>
                    </div>
                    <p className="font-bold text-text-primary">{entry.xp.toLocaleString()} XP</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile list view */}
          <div className="lg:hidden bg-white dark:bg-neutral-dark rounded-2xl shadow-panel overflow-hidden">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className={`flex items-center gap-3 p-4 shadow-divider last:shadow-none ${
                  entry.isCurrentUser ? 'bg-primary/5' : ''
                }`}
              >
                {/* Rank badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankStyle(entry.rank)}`}>
                  {entry.rank <= 3 ? (
                    <Medal className="w-5 h-5" />
                  ) : (
                    <span className="font-bold text-sm">{entry.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {entry.avatar}
                  </div>
                  {entry.isCurrentUser && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className={`font-bold truncate ${entry.isCurrentUser ? 'text-primary' : 'text-text-primary'}`}>
                    {entry.name}
                    {entry.isCurrentUser && ' (You)'}
                  </p>
                </div>

                {/* XP */}
                <div className="text-right">
                  <p className="font-bold text-text-primary">{entry.xp.toLocaleString()}</p>
                  <p className="text-xs text-text-light">XP</p>
                </div>
              </div>
            ))}

            <div className="p-4 text-center text-xs text-text-light">
              Placeholder leaderboard data (frontend-only)
            </div>
          </div>

          {/* Desktop full leaderboard */}
          <div className="hidden lg:block mt-6">
            <div className="bg-white dark:bg-neutral-dark rounded-2xl shadow-panel overflow-hidden">
              <div className="p-4 shadow-divider">
                <h3 className="font-bold text-lg text-text-primary">Full Rankings</h3>
              </div>
              {filteredLeaderboard.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 p-4 shadow-divider last:shadow-none ${
                    entry.isCurrentUser ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankStyle(entry.rank)}`}>
                    {entry.rank <= 3 ? (
                      <Medal className="w-5 h-5" />
                    ) : (
                      <span className="font-bold text-sm">{entry.rank}</span>
                    )}
                  </div>

                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {entry.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-lg ${entry.isCurrentUser ? 'text-primary' : 'text-text-primary'}`}>
                      {entry.name}
                      {entry.isCurrentUser && ' (You)'}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl text-text-primary">{entry.xp.toLocaleString()}</p>
                    <p className="text-sm text-text-light">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
