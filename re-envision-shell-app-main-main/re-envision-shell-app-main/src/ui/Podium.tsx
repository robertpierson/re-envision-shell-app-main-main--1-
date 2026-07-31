import React from 'react';
import { Crown } from 'lucide-react';
import { LeaderboardRow } from '../lib/supabase';

// The top three, on a podium. Bars grow in on mount, the winner wears a crown,
// and confetti falls behind first place — the payoff for a week of work should
// look like a payoff.

interface PodiumProps {
  top: LeaderboardRow[];
  metric: (r: LeaderboardRow) => number;
  meId: string | null;
}

const PLACES = [
  { idx: 1, h: 'h-20', ring: 'ring-slate-300', bg: 'from-slate-300 to-slate-400', label: '2' },
  { idx: 0, h: 'h-28', ring: 'ring-yellow-400', bg: 'from-yellow-300 to-amber-500', label: '1' },
  { idx: 2, h: 'h-14', ring: 'ring-amber-600', bg: 'from-amber-500 to-amber-700', label: '3' },
];

const Face: React.FC<{ row?: LeaderboardRow; size: string }> = ({ row, size }) =>
  row?.avatar_url ? (
    <img src={row.avatar_url} alt="" className={`${size} rounded-full object-cover`} />
  ) : (
    <span className={`${size} flex items-center justify-center rounded-full bg-white/80 text-2xl`}>
      {row?.avatar ?? '🌟'}
    </span>
  );

const Podium: React.FC<PodiumProps> = ({ top, metric, meId }) => {
  if (top.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-primary/15 via-transparent to-transparent p-4 pt-6">
      <style>{`
        @keyframes podium-rise { from { transform: scaleY(.15); opacity: 0 } to { transform: scaleY(1); opacity: 1 } }
        @keyframes crown-bob { 0%,100% { transform: translateY(0) rotate(-6deg) } 50% { transform: translateY(-5px) rotate(6deg) } }
        @keyframes confetti-fall { to { transform: translateY(150px) rotate(360deg); opacity: 0 } }
        .podium-rise { transform-origin: bottom; animation: podium-rise 620ms cubic-bezier(.22,1.3,.36,1) both }
        .crown-bob { animation: crown-bob 2.4s ease-in-out infinite }
        .confetti { animation: confetti-fall 2.6s linear infinite }
        @media (prefers-reduced-motion: reduce) { .podium-rise, .crown-bob, .confetti { animation: none } }
      `}</style>

      {/* confetti behind the winner */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="confetti absolute block h-2 w-1.5 rounded-[1px]"
            style={{
              left: `${8 + i * 6.4}%`,
              backgroundColor: ['#FFC800', '#1CB0F6', '#58CC02', '#FF4B4B', '#CE82FF'][i % 5],
              animationDelay: `${(i % 7) * 0.32}s`,
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      <div className="relative flex items-end justify-center gap-3">
        {PLACES.map(({ idx, h, ring, bg, label }, order) => {
          const row = top[idx];
          if (!row) return <div key={label} className="w-24" />;
          const isMe = row.user_id === meId;
          return (
            <div key={row.user_id} className="flex w-24 flex-col items-center sm:w-28">
              {idx === 0 && <Crown className="crown-bob mb-1 h-6 w-6 text-yellow-400" />}
              <div className={`rounded-full p-0.5 ring-4 ${ring}`}>
                <Face row={row} size={idx === 0 ? 'h-14 w-14' : 'h-11 w-11'} />
              </div>
              <p className="mt-1.5 w-full truncate text-center text-xs font-extrabold text-text-primary dark:text-white">
                {isMe ? 'You' : row.display_name}
              </p>
              <p className="text-[11px] font-bold text-primary">{metric(row).toLocaleString()} XP</p>
              <div
                className={`podium-rise mt-1.5 w-full rounded-t-xl bg-gradient-to-b ${bg} ${h} flex items-start justify-center pt-1.5`}
                style={{ animationDelay: `${order * 110}ms` }}
              >
                <span className="text-lg font-black text-white/90">{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Podium;
