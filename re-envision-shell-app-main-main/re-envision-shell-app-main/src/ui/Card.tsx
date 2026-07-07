import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animated?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  animated = false,
}) => {
  const baseStyles = 'bg-white dark:bg-neutral-dark rounded-2xl shadow-panel p-6 transition-all duration-200';
  const interactiveStyles = onClick ? 'cursor-pointer hover:shadow-card-hover hover:scale-[1.02]' : '';
  const animationStyles = animated ? 'animate-fade-in' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${interactiveStyles} ${animationStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
