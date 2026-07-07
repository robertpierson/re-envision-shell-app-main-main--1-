import React from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { UnitStatus } from '../types';

interface UnitNodeProps {
  id: string;
  title: string;
  status: UnitStatus;
  position: number;
  onClick?: () => void;
}

const statusStyles: Record<UnitStatus, { bg: string; border: string; shadow: string }> = {
  locked: {
    bg: 'bg-locked',
    border: 'border-b-4 border-gray-300',
    shadow: 'shadow-none',
  },
  current: {
    bg: 'bg-secondary',
    border: 'border-b-4 border-secondary-dark',
    shadow: 'shadow-lg',
  },
  completed: {
    bg: 'bg-primary',
    border: 'border-b-4 border-primary-dark',
    shadow: 'shadow-md',
  },
};

const UnitNode: React.FC<UnitNodeProps> = ({
  title,
  status,
  position,
  onClick,
}) => {
  const canClick = status !== 'locked';
  const styles = statusStyles[status];

  return (
    <div className={`flex ${position % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}>
      {/* Connection line to previous unit */}
      {position > 1 && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-neutral-dark -z-10 hidden sm:block"
        />
      )}

      <button
        onClick={canClick ? onClick : undefined}
        disabled={!canClick}
        className={`
          w-20 h-20 sm:w-24 sm:h-24 rounded-full
          ${styles.bg} ${styles.border} ${styles.shadow}
          flex items-center justify-center
          transition-all duration-200 transform
          ${canClick ? 'hover:scale-110 active:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-70'}
          relative overflow-hidden
        `}
      >
        {/* Status icon */}
        {status === 'locked' && (
          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        )}
        {status === 'completed' && (
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        )}
        {status === 'current' && (
          <span className="text-2xl sm:text-3xl font-bold text-text-primary">
            {position}
          </span>
        )}

        {/* Highlight ring for current unit */}
        {status === 'current' && (
          <div className="absolute inset-0 rounded-full border-4 border-secondary animate-pulse opacity-50" />
        )}
      </button>

      {/* Title tooltip/badge */}
      <div
        className={`
          absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2
          text-xs sm:text-sm font-bold text-text-secondary whitespace-nowrap
          ${canClick ? '' : 'opacity-50'}
        `}
      >
        {title}
      </div>
    </div>
  );
};

export default UnitNode;
