import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Bell, Heart, Zap } from 'lucide-react';
import { getSnapshot, onStatsChange } from '../lib/stats';

// The hearts / XP / bell cluster. Every chip is a real button with a real
// panel: hearts explain the daily pool, XP shows the level bar and the last
// few XP events, and the bell lists actual notifications from the stats feed.

type Panel = 'hearts' | 'xp' | 'bell' | null;

function useStats() {
  return useSyncExternalStore(onStatsChange, getSnapshot, getSnapshot);
}

const HeaderStats: React.FC = () => {
  const stats = useStats();
  const [open, setOpen] = useState<Panel>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const toggle = (p: Panel) => setOpen((cur) => (cur === p ? null : p));

  return (
    <div ref={rootRef} className="relative flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-panel dark:bg-neutral-dark">
      <button
        onClick={() => toggle('hearts')}
        aria-expanded={open === 'hearts'}
        className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-600 transition hover:brightness-95 dark:bg-orange-500/15"
      >
        <Heart className="h-4 w-4 fill-orange-500" />
        <span>{stats.hearts}/{stats.maxHearts}</span>
      </button>

      <button
        onClick={() => toggle('xp')}
        aria-expanded={open === 'xp'}
        className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition hover:brightness-95"
      >
        <Zap className="h-4 w-4" />
        <span>{stats.xp.toLocaleString()} XP</span>
      </button>

      <button
        onClick={() => toggle('bell')}
        aria-expanded={open === 'bell'}
        aria-label={`Notifications (${stats.notifications.length})`}
        className="relative rounded-full bg-white p-2 text-text-secondary shadow-panel transition hover:shadow-card-hover dark:bg-white/5"
      >
        <Bell className="h-4 w-4" />
        {stats.notifications.length > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-extrabold text-white">
            {Math.min(9, stats.notifications.length)}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-3xl bg-white p-4 shadow-overlay dark:bg-[#161b28]">
          {open === 'hearts' && (
            <>
              <p className="text-sm font-extrabold text-text-primary dark:text-white">Hearts</p>
              <div className="mt-2 flex gap-1.5">
                {Array.from({ length: stats.maxHearts }).map((_, i) => (
                  <Heart key={i} className={`h-7 w-7 ${i < stats.hearts ? 'fill-orange-500 text-orange-500' : 'text-text-light/40'}`} />
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-text-secondary dark:text-neutral-300">
                You get {stats.maxHearts} hearts a day. A wrong answer in a boss battle costs one —
                run out and the boss is safe until tomorrow. Lessons never cost hearts.
              </p>
            </>
          )}
          {open === 'xp' && (
            <>
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-extrabold text-text-primary dark:text-white">Level {stats.level}</p>
                <p className="text-xs font-semibold text-text-secondary dark:text-neutral-300">
                  {stats.into}/{stats.needed} XP to level {stats.level + 1}
                </p>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-dark/10 dark:bg-white/10">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(stats.into / stats.needed) * 100}%` }} />
              </div>
              <p className="mt-3 text-xs text-text-secondary dark:text-neutral-300">
                +20 per lesson · +60 per boss · +5 per correct answer.
              </p>
              {stats.notifications.filter((n) => n.text.startsWith('⚡')).length === 0 && (
                <p className="mt-2 text-xs font-semibold text-text-light">No XP yet — clear your first lesson!</p>
              )}
            </>
          )}
          {open === 'bell' && (
            <>
              <p className="text-sm font-extrabold text-text-primary dark:text-white">Notifications</p>
              {stats.notifications.length === 0 ? (
                <p className="mt-3 text-xs text-text-secondary dark:text-neutral-300">
                  Nothing yet. Finish a lesson and your XP, streaks and level-ups land here.
                </p>
              ) : (
                <ul className="mt-2 max-h-64 space-y-1.5 overflow-y-auto">
                  {stats.notifications.map((n, i) => (
                    <li key={i} className="rounded-xl bg-neutral px-3 py-2 text-xs font-semibold text-text-primary dark:bg-white/5 dark:text-neutral-200">
                      {n.text}
                      <span className="mt-0.5 block text-[10px] font-normal text-text-light">
                        {new Date(n.at).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderStats;
