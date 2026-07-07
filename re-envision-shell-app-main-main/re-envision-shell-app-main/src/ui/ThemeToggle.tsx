import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', compact = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className={`
        group relative inline-flex items-center shrink-0 rounded-full
        transition-colors duration-300 ease-out focus:outline-none
        ${compact ? 'h-8 w-16' : 'h-9 w-[4.5rem]'}
        ${isDark ? 'bg-primary-dark' : 'bg-neutral-200'}
        shadow-inner
        ${className}
      `}
    >
      <span
        className={`
          absolute inset-y-1 left-1 flex items-center justify-center rounded-full bg-white
          shadow-[0_2px_6px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out
          ${compact ? 'h-6 w-6' : 'h-7 w-7'}
          ${isDark ? (compact ? 'translate-x-8' : 'translate-x-9') : 'translate-x-0'}
        `}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-primary-dark" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-secondary" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
