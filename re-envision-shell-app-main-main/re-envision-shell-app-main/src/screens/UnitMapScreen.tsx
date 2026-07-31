import React, { useMemo } from 'react';
import Sandy from '../ui/Sandy';
import { ArrowLeft, Lock, Play, Star } from 'lucide-react';
import { CourseUnit, courses } from '../data/curriculum';
import { Level, levelStatuses, levelsOf, unitProgress } from '../lib/progress';
import Scene3D from '../ui/Scene3D';
const Island3D = React.lazy(() => import('../ui/Island3D'));

/** '#58CC02' -> 0x58cc02, for three.js materials. */
const hex = (css: string) => parseInt(css.replace('#', ''), 16);
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

      {/* Sandy guides the island — and warns you what waits at the castle */}
      <div className="mt-2 flex items-center gap-3 rounded-3xl bg-white/70 p-3 shadow-panel backdrop-blur dark:bg-white/5">
        <Sandy pose={done >= total ? 'clipboard-done' : 'teach-map'} className="h-20 w-20 shrink-0 object-contain" />
        <p className="text-sm text-text-secondary dark:text-neutral-300">
          {done >= total
            ? "Every stop cleared. Sandy's already filed the paperwork — the next unit is open."
            : done === total - 1
              ? 'Only the castle left. Something in there does not look like the Sandy you know.'
              : 'Drag the island to look around, then tap a glowing stop to play it. Clear all three lessons and the castle opens.'}
        </p>
      </div>

      {/* Real 3D world. three.js is code-split, so it never blocks first paint;
          the CSS-3D island renders meanwhile and on machines without WebGL. */}
      <div
        className="relative mt-3 overflow-hidden rounded-[2rem] bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-50 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"
        style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      >
        <React.Suspense
          fallback={
            <Scene3D className="h-full w-full outline-none">
              <div className="relative h-full w-full">
                <WorldIsland
                  palette={palette}
                  unlockedThrough={unlockedThrough === -1 ? NODE_POINTS.length : unlockedThrough}
                  className="absolute inset-0 h-full w-full [transform:translateZ(30px)]"
                />
              </div>
            </Scene3D>
          }
        >
          <Island3D
            className="h-full w-full"
            palette={{
              grass: hex(palette.grass),
              grassDark: hex(palette.grassDark),
              soil: hex(palette.soil),
              soilDark: hex(palette.soilDark),
              water: hex(palette.water),
              accent: hex(palette.accent),
            }}
            nodes={levels.map((level, i) => ({
              index: i,
              label: level.kind === 'quiz' ? `Quiz · ${unit.quizCount} questions` : `Lesson ${level.index}: ${level.title}`,
              status: statuses[i],
              onSelect: () => statuses[i] !== 'locked' && onPlay(unit, level),
            }))}
          />
        </React.Suspense>
      </div>

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
