import React from 'react';

// Button variants matching Duolingo style
type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'gray' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white border-b-4 border-primary-dark hover:bg-primary-light',
  secondary: 'bg-secondary text-text-primary border-b-4 border-secondary-dark hover:bg-secondary-light',
  accent: 'bg-accent text-white border-b-4 border-accent-dark hover:bg-accent-light',
  gray: 'bg-neutral-dark text-text-primary border-b-4 border-text-light hover:bg-neutral',
  ghost: 'bg-transparent text-text-primary hover:bg-neutral-dark',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  disabled = false,
  children,
  onClick,
  className = '',
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-bold transition-all duration-150 select-none';
  const shadowStyles = disabled
    ? 'shadow-none cursor-not-allowed opacity-60'
    : 'shadow-button active:shadow-button-active active:translate-y-0.5';
  const disabledStyles = disabled ? 'pointer-events-none' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${shadowStyles} ${disabledStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
