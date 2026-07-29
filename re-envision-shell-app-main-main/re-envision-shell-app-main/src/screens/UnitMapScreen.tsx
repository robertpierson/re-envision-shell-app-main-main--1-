import React, { useMemo, useState } from 'react';
import { ArrowLeft, Lock, Play, Star, Trophy } from 'lucide-react';
import { CourseUnit, courses } from '../data/curriculum';
import { Level, levelStatuses, levelsOf, unitProgress } from '../lib/progress';
import Scene3D from '../ui/Scene3D';
import WorldIsland, { ISLAND_PALETTES, NODE_POINTS, VIEW_H, VIEW_W } from '../ui/WorldIsland';

interface UnitMapScreenProps {
  unit: CourseUnit;
  onBack: () => void;
  onPlay: (unit: CourseUnit, level: Level) => void;
}

const LEVEL_COLORS = ['#58CC02', '#1CB0F6', '#CE82FF', '#FFC800'];

/**
 * The inside of a unit: a little world with four stops on it. Three lesson
 * levels along the trail, then the castle at the end for the quiz. Levels open
 * one at a time, so there is always exactly one obvious thing to tap next.
 */
const UnitMapScreen: React.FC<UnitMapScreenProps> = ({ unit, onBack, onPlay }) => {
  const levels = useMemo(() => levelsOf(unit), [unit]);
  const statuses = levelStatuses(unit);
  const { done, total } = unitProgress(unit);
  const [hovered, setHovered] = useState<number | null>(null);

  const courseIndex = Math.max(0, courses.findIndex((c) => c.units.some((u) => u.id === unit.id)));
  const palette = ISLAND_PALETTES[courseIndex % ISLAND_PALETTES.length];
  const unlockedThrough = statuses.findIndex((s) => s === 'locked');

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-4 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-panel transition-transform hover:scale-105 active:scale-95 dark:bg-white/10"
          aria-label="Back to the course map"
        >
          <ArrowLeft className="h-5 w-5 text-text-primary dark:text-white" />
        </button>
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">Unit world</p>
          <h1 className="truncate text-xl font-extrabold text-text-primary dark:text-white lg:text-2xl">
            {unit.title}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-2">
          {Array.from({ length: total }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < done ? 'fill-secondary text-secondary' : 'text-text-light/50'}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-2 text-sm text-text-secondary dark:text-neutral-300">
        Drag the island to look around. Tap a glowing stop to play it.
      </p>

      <Scene3D className="mt-3 outline-none">
        <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] dark:from-slate-700 dark:via-slate-800 dark:to-slate-900" />

          <WorldIsland
            palette={palette}
            unlockedThrough={unlockedThrough === -1 ? NODE_POINTS.length : unlockedThrough}
            className="absolute inset-0 h-full w-full [transform:translateZ(30px)]"
          />

          {levels.map((level, i) => {
            const point = NODE_POINTS[i];
            const status = statuses[i];
            const isQuiz = level.kind === 'quiz';
            const color = LEVEL_COLORS[i % LEVEL_COLORS.length];
            const open = status !== 'locked';

            return (
              <button
                key={level.id}
                type="button"
                disabled={!open}
                onClick={() => open && onPlay(unit, level)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                aria-label={`${isQuiz ? 'Quiz' : `Lesson ${level.index}`}: ${level.title}${open ? '' : ' (locked)'}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200
                  ${open ? 'hover:scale-110 active:scale-95 cursor-pointer' : 'cursor-not-allowed'}`}
                style={{
                  left: `${(point.x / VIEW_W) * 100}%`,
                  top: `${(point.y / VIEW_H) * 100}%`,
                  transform: `translate(-50%, -50%) translateZ(${open ? 74 : 50}px)`,
                }}
              >
                <span
                  className="relative flex items-center justify-center rounded-full"
                  style={{
                    width: isQuiz ? 74 : 64,
                    height: isQuiz ? 74 : 64,
                    backgroundColor: status === 'locked' ? '#B9BDC4' : color,
                    boxShadow: `0 9px 0 0 ${status === 'locked' ? '#8E939A' : 'rgba(0,0,0,0.28)'}, 0 18px 26px -8px rgba(0,0,0,0.45)`,
                  }}
                >
                  <span className="text-white drop-shadow">
                    {status === 'completed' && <Star className="h-8 w-8 fill-white" />}
                    {status === 'unlocked' && (isQuiz ? <Trophy className="h-8 w-8" /> : <Play className="h-8 w-8 fill-white" />)}
                    {status === 'locked' && <Lock className="h-7 w-7" />}
                  </span>

                  {status === 'unlocked' && (
                    <>
                      <span
                        className="absolute inset-0 animate-ping rounded-full opacity-60"
                        style={{ backgroundColor: color }}
                      />
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-panel">
                        Play
                      </span>
                    </>
                  )}

                  <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-extrabold text-text-primary shadow-panel">
                    {isQuiz ? '★' : level.index}
                  </span>
                </span>

                {hovered === i && (
                  <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-56 -translate-x-1/2 rounded-2xl bg-text-primary/95 px-3 py-2 text-center text-xs font-semibold text-white shadow-overlay dark:bg-white/95 dark:text-text-primary">
                    {isQuiz ? 'Unit quiz' : `Lesson ${level.index}`} · {level.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Scene3D>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {levels.map((level, i) => {
          const status = statuses[i];
          return (
            <button
              key={level.id}
              disabled={status === 'locked'}
              onClick={() => status !== 'locked' && onPlay(unit, level)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-transform
                ${status === 'locked'
                  ? 'cursor-not-allowed border-neutral-200 opacity-60 dark:border-white/10'
                  : 'border-transparent bg-white shadow-panel hover:-translate-y-0.5 dark:bg-white/10'}`}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: status === 'locked' ? '#B9BDC4' : LEVEL_COLORS[i % LEVEL_COLORS.length] }}
              >
                {status === 'completed' ? <Star className="h-5 w-5 fill-white" /> : status === 'locked' ? <Lock className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-extrabold uppercase tracking-widest text-text-light">
                  {level.kind === 'quiz' ? 'Quiz' : `Lesson ${level.index}`}
                </span>
                <span className="block truncate text-sm font-bold text-text-primary dark:text-white">
                  {level.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UnitMapScreen;
