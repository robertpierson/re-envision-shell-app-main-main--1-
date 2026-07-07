import React from 'react';
import { Home, Trophy, User, BadgeCheck, Settings2 } from 'lucide-react';
import { Screen } from '../types';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems: { screen: Screen; label: string; icon: React.FC<{ className?: string }> }[] = [
  { screen: 'home', label: 'Learn', icon: Home },
  { screen: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { screen: 'certification', label: 'Certification', icon: BadgeCheck },
  { screen: 'profile', label: 'Profile', icon: User },
  { screen: 'settings', label: 'Settings', icon: Settings2 },
];

const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const isActive = (screen: Screen) =>
    currentScreen === screen || (currentScreen === 'lesson' && screen === 'home');

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-white dark:bg-neutral-dark shadow-[4px_0_24px_rgba(0,0,0,0.06)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.4)] z-50">
        {/* Logo */}
        <div className="h-20 flex items-center gap-3 px-6 shadow-divider">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <img
              src="/icon.png"
              className="w-10 h-10 dark:brightness-0 dark:invert transition-[filter] duration-300"
              alt="Logo"
            />
          </div>
          <span className="text-xl font-bold text-text-primary dark:text-neutral-400">ReEnvision</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            {navItems.map(({ screen, label, icon: Icon }) => (
              <button
                key={screen}
                onClick={() => onNavigate(screen)}
                className={`
                  w-full flex items-center gap-4 px-4 py-4 rounded-xl
                  font-semibold text-base transition-all duration-200
                  ${isActive(screen)
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-text-primary'
                  }
                `}
              >
                <Icon className={`w-6 h-6 ${isActive(screen) ? 'stroke-[3]' : ''}`} />
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* User quick stats */}
        <div className="p-4 shadow-divider-top">
          <div className="bg-neutral dark:bg-white/5 rounded-xl p-4 shadow-panel dark:shadow-none">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                🌟
              </div>
              <div>
                <p className="font-bold text-text-primary">New Learner</p>
                <p className="text-xs text-text-secondary">Level 5</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1 text-text-secondary">
                <span>🔥</span>
                <span className="font-semibold">7</span>
              </div>
              <div className="flex items-center gap-1 text-text-secondary">
                <span>⚡</span>
                <span className="font-semibold">3,450 XP</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-dark shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] pb-safe-bottom z-50">
        <div className="max-w-lg mx-auto flex justify-around items-center h-16 sm:h-20">
          {navItems.map(({ screen, label, icon: Icon }) => {
            const active = isActive(screen);
            return (
              <button
                key={screen}
                onClick={() => onNavigate(screen)}
                className={`
                  flex flex-col items-center justify-center gap-1
                  w-full h-full px-4
                  transition-colors duration-200
                  ${active ? 'text-primary' : 'text-text-light hover:text-text-secondary'}
                `}
              >
                <Icon className={`w-6 h-6 ${active ? 'stroke-[3]' : ''}`} />
                <span className={`text-xs sm:text-sm font-semibold ${active ? 'font-bold' : ''}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
