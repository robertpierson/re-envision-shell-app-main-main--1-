import React from 'react';
import { Check, Lock, Star, Trophy } from 'lucide-react';
import { CourseUnit } from '../data/curriculum';

interface RoadmapPathProps {
  units: CourseUnit[];
  activeUnitId: string;
  onSelect: (unitId: string) => void;
}

// Fixed design-time geometry so the squiggle math stays pixel-perfect
// regardless of viewport (the whole trail scales down via CSS, only capped
// by max-width — a horizontal scrollbar is the safety net on tiny screens).
const WIDTH = 380;
const CENTER_X = WIDTH / 2;
const AMPLITUDE = 46;
const CYCLES_PER_ROW = 0.6; // how tight the squiggle winds row-to-row
const NODE_SIZE = 76;
const QUIZ_SIZE = 84;
// Generous row height gives the hover tooltip and lesson chips of each unit
// room to breathe so nothing overlaps the row above or below it.
const ROW_H = 232;
// Reserved space above the first node for its "Start"/hover badges — baked
// into the geometry itself, since padding-top on an absolutely-positioned
// container doesn't shift where its "top: Npx" children anchor.
const TOP_PAD = 64;

// A distinct, vivid color per node so the path reads as playful and "gamified".
// Locked (upcoming) nodes stay neutral so "not yet available" is unambiguous.
const PALETTE = [
  { bg: '#58CC02', shadow: '#46A302' }, // green
  { bg: '#1CB0F6', shadow: '#1899D6' }, // blue
  { bg: '#CE82FF', shadow: '#A568CC' }, // purple
  { bg: '#FF9600', shadow: '#E68600' }, // orange
  { bg: '#FF4B4B', shadow: '#E63030' }, // red
  { bg: '#2EC4B6', shadow: '#219E92' }, // teal
];

type Row =
  | { kind: 'unit'; key: string; unit: CourseUnit; number: number }
  | { kind: 'quiz'; key: string; throughUnit: number };

const buildRows = (units: CourseUnit[]): Row[] => {
  const rows: Row[] = [];
  units.forEach((unit, i) => {
    const number = i + 1;
    rows.push({ kind: 'unit', key: unit.id, unit, number });
    if (number % 4 === 0) {
      rows.push({ kind: 'quiz', key: `quiz-${number}`, throughUnit: number });
    }
  });
  return rows;
};

// Catmull-Rom -> cubic bezier so the dotted trail follows a continuous
// curve through every node instead of straight, segmented lines.
const smoothPath = (points: { x: number; y: number }[]) => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
};

const RoadmapPath: React.FC<RoadmapPathProps> = ({ units, activeUnitId, onSelect }) => {
  const rows = buildRows(units);

  const points = rows.map((_, i) => ({
    x: CENTER_X + AMPLITUDE * Math.sin(2 * Math.PI * CYCLES_PER_ROW * i),
    y: i * ROW_H + NODE_SIZE / 2 + TOP_PAD,
  }));
  const totalHeight = points.length ? points[points.length - 1].y + ROW_H : 0;
  const trailD = smoothPath(points);

  return (
    <div className="mx-auto max-w-[380px] overflow-x-auto">
      <div
        className="relative mx-auto"
        style={{ width: WIDTH, height: totalHeight, overflow: 'visible' }}
      >
        {/* Dotted trail — just the dots, no solid connecting line */}
        <svg
          className="absolute inset-0 overflow-visible"
          width={WIDTH}
          height={totalHeight}
          viewBox={`0 0 ${WIDTH} ${totalHeight}`}
          fill="none"
        >
          <path
            d={trailD}
            stroke="currentColor"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray="0.1 22"
            className="text-neutral-300 dark:text-white/20"
          />
        </svg>

        {rows.map((row, i) => {
          const { x, y } = points[i];

          if (row.kind === 'quiz') {
            const isQuizCompleted = units.slice(0, row.throughUnit).every((u) => u.status === 'completed');

            return (
              <div
                key={row.key}
                className="group absolute flex flex-col items-center"
                style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
              >
                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 -translate-x-1/2 whitespace-nowrap rounded-lg bg-text-primary dark:bg-white px-3 py-1.5 text-xs font-bold text-white dark:text-text-primary opacity-0 shadow-overlay transition-opacity duration-150 group-hover:opacity-100">
                  FINAL QUIZ
                </div>
                <button
                  aria-label="Final quiz"
                  className="relative flex rotate-45 items-center justify-center rounded-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
                  style={{ width: QUIZ_SIZE, height: QUIZ_SIZE, backgroundColor: '#FFC800', boxShadow: '0 6px 0 0 #E6B400' }}
                >
                  <span className="-rotate-45 text-white">
                    <Trophy className="h-8 w-8" />
                  </span>

                  {isQuizCompleted && (
                    <span className="absolute -top-2 -right-2 z-10 -rotate-45 whitespace-nowrap rounded-full bg-secondary px-2 py-0.5 text-[10px] font-extrabold text-white shadow-panel animate-scale-in">
                      +100 XP
                    </span>
                  )}
                </button>
                <div className="mt-3 w-48 text-center">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Final Quiz</p>
                  <p className="text-[11px] text-text-secondary">Covers Units 1–{row.throughUnit}</p>
                  <p className="mt-1 text-[11px] font-bold text-secondary">Reward: +100 XP</p>
                </div>
              </div>
            );
          }

          const { unit, number } = row;
          const isSelected = unit.id === activeUnitId;
          const isLocked = unit.status === 'upcoming';
          const isCompleted = unit.status === 'completed';
          const color = PALETTE[(number - 1) % PALETTE.length];

          return (
            <div
              key={row.key}
              className="group absolute flex flex-col items-center"
              style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
            >
              {/* Hover tooltip required on every node */}
              <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 -translate-x-1/2 whitespace-nowrap rounded-lg bg-text-primary dark:bg-white px-3 py-1.5 text-xs font-bold text-white dark:text-text-primary opacity-0 shadow-overlay transition-opacity duration-150 group-hover:opacity-100">
                UNIT: {unit.title}
              </div>

              {unit.status === 'active' && !isSelected && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-panel animate-fade-in-up">
                  Start
                </div>
              )}

              <button
                onClick={() => onSelect(unit.id)}
                aria-label={unit.title}
                className={`
                  relative flex items-center justify-center rounded-full transition-all duration-200
                  hover:scale-110 active:scale-95
                  ${isSelected ? 'ring-4 ring-white dark:ring-neutral-dark ring-offset-4 ring-offset-neutral dark:ring-offset-[#0b0d12]' : ''}
                `}
                style={{
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                  backgroundColor: isLocked ? undefined : color.bg,
                  boxShadow: isLocked ? '0 4px 0 0 rgba(0,0,0,0.08)' : `0 5px 0 0 ${color.shadow}`,
                }}
              >
                <span className={`absolute inset-0 rounded-full ${isLocked ? 'bg-neutral-200 dark:bg-white/10' : ''}`} />
                <span className={`relative flex items-center justify-center ${isLocked ? 'text-text-light' : 'text-white'}`}>
                  {unit.status === 'completed' && <Check className="h-8 w-8" strokeWidth={3} />}
                  {unit.status === 'active' && <Star className="h-8 w-8 fill-white" />}
                  {isLocked && <Lock className="h-7 w-7" />}
                </span>

                {unit.status === 'active' && (
                  <span className="absolute inset-0 rounded-full animate-pulse" style={{ backgroundColor: `${color.bg}66` }} />
                )}

                <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-text-primary shadow-panel">
                  {number}
                </span>

                {isCompleted && (
                  <span className="absolute -top-2 -right-2 z-10 whitespace-nowrap rounded-full bg-secondary px-2 py-0.5 text-[10px] font-extrabold text-white shadow-panel animate-scale-in">
                    +50 XP
                  </span>
                )}
              </button>

              {/* Full lesson breakdown for this unit, always visible */}
              <div className="mt-3 flex w-64 flex-col items-center text-center">
                <p className="text-sm font-bold leading-snug text-text-primary dark:text-white">{unit.title}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {unit.lessons.map((lesson) => (
                    <span
                      key={lesson}
                      className="rounded-md bg-neutral dark:bg-white/10 px-2 py-1 text-[11px] font-semibold text-text-secondary dark:text-neutral-300"
                    >
                      {lesson}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapPath;
