import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  height?: 'sm' | 'md' | 'lg';
}

const colorStyles = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
};

const heightStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-4',
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  color = 'primary',
  height = 'md',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`
        w-full bg-neutral-dark rounded-full overflow-hidden
        ${heightStyles[height]} ${className}
      `}
    >
      <div
        className={`
          h-full ${colorStyles[color]} rounded-full
          transition-all duration-500 ease-out
        `}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
