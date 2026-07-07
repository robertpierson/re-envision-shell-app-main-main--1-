import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  color?: 'primary' | 'secondary' | 'accent';
  subtext?: string;
}

const colorStyles = {
  primary: 'text-primary bg-primary/10',
  secondary: 'text-secondary bg-secondary/10',
  accent: 'text-accent bg-accent/10',
};

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  color = 'primary',
  subtext,
}) => {
  return (
    <div className="card flex items-center gap-4">
      <div className={`p-4 rounded-2xl ${colorStyles[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-text-secondary">{label}</p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        {subtext && (
          <p className="text-xs text-text-light">{subtext}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
