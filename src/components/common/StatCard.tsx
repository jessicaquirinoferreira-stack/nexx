import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: 'orange' | 'green' | 'blue' | 'yellow' | 'red' | 'stone';
  active?: boolean;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = 'stone',
  active = false,
  onClick,
}) => {
  const badgeStyles = {
    orange: 'bg-blue-950/80 text-blue-300 border-blue-700',
    green: 'bg-emerald-950/80 text-emerald-300 border-emerald-700',
    blue: 'bg-sky-950/80 text-sky-300 border-sky-700',
    yellow: 'bg-amber-950/80 text-amber-300 border-amber-700',
    red: 'bg-rose-950/80 text-rose-300 border-rose-700',
    stone: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-slate-900/80 border rounded-2xl p-4 sm:p-5 shadow-xs transition-all relative overflow-hidden ${
        onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''
      } ${
        active
          ? 'border-blue-500 ring-2 ring-blue-500/20'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
          {value}
        </span>
        {badge && (
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyles[badgeColor]}`}
          >
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-400 mt-1 truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
};
