import { courses, CourseUnit } from '../data/curriculum';

// Progress lives in localStorage until there's a backend to hold it.
// A "level" is one step inside a unit: its three lessons, then its quiz.
const STORAGE_KEY = 'reenvision:progress:v1';

export type LevelKind = 'lesson' | 'quiz';

export interface Level {
  /** e.g. "course-1-deep-learning/unit3#lesson-2" — unique across the app. */
  id: string;
  kind: LevelKind;
  /** 1-3 for lessons, 4 for the quiz. */
  index: number;
  title: string;
  /** Anchor inside the unit page. */
  hash: string;
}

export type LevelStatus = 'completed' | 'unlocked' | 'locked';
export type UnitStatus = 'completed' | 'active' | 'upcoming';

const read = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set<string>();
  }
};

const write = (done: Set<string>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...done]));
  } catch {
    // storage unavailable (private mode, quota) — progress just won't persist
  }
};

/** The four levels of a unit: lesson 1, 2, 3, then the quiz. */
export function levelsOf(unit: CourseUnit): Level[] {
  const lessons: Level[] = unit.lessons.map((title, i) => ({
    id: `${unit.lessonId}#lesson-${i + 1}`,
    kind: 'lesson' as const,
    index: i + 1,
    title,
    hash: `#lesson-${i + 1}`,
  }));
  return [
    ...lessons,
    {
      id: `${unit.lessonId}#quiz`,
      kind: 'quiz',
      index: lessons.length + 1,
      title: `Unit quiz · ${unit.quizCount} questions`,
      hash: '#quiz',
    },
  ];
}

export function isLevelComplete(levelId: string, done = read()): boolean {
  return done.has(levelId);
}

export function completeLevel(levelId: string): void {
  const done = read();
  done.add(levelId);
  write(done);
  void pushProgressToBackend(levelId);
}

// Backend seam — supabase.ts registers a sender when configured.
type ProgressSender = (levelId: string) => Promise<void>;
let progressSender: ProgressSender | null = null;

export function registerProgressBackend(fn: ProgressSender) {
  progressSender = fn;
}

async function pushProgressToBackend(levelId: string) {
  try {
    if (progressSender) await progressSender(levelId);
  } catch {
    // offline — the local record is what the UI uses
  }
}

export function resetProgress(): void {
  write(new Set<string>());
}

export function unitIsComplete(unit: CourseUnit, done = read()): boolean {
  return levelsOf(unit).every((l) => done.has(l.id));
}

/**
 * Levels unlock strictly in order: you cannot open lesson 2 before finishing
 * lesson 1, and the quiz only opens once all three lessons are done.
 */
export function levelStatuses(unit: CourseUnit, done = read()): LevelStatus[] {
  const levels = levelsOf(unit);
  let reachedLocked = false;
  return levels.map((level) => {
    if (done.has(level.id)) return 'completed';
    if (reachedLocked) return 'locked';
    reachedLocked = true; // the first unfinished level is the only open one
    return 'unlocked';
  });
}

/**
 * Units unlock strictly in order too. Unit 1 of a course is open from the
 * start; every later unit stays locked until the one before it is finished.
 */
export function unitStatuses(units: CourseUnit[], done = read()): UnitStatus[] {
  let previousComplete = true;
  return units.map((unit) => {
    const complete = unitIsComplete(unit, done);
    const status: UnitStatus = complete ? 'completed' : previousComplete ? 'active' : 'upcoming';
    previousComplete = complete;
    return status;
  });
}

/** How many levels of a unit are done, for the star row on its map. */
export function unitProgress(unit: CourseUnit, done = read()): { done: number; total: number } {
  const levels = levelsOf(unit);
  return { done: levels.filter((l) => done.has(l.id)).length, total: levels.length };
}

/** The unit a learner should be sent to when they open a course. */
export function currentUnit(courseId: string, done = read()): CourseUnit | undefined {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return undefined;
  const statuses = unitStatuses(course.units, done);
  const activeIndex = statuses.indexOf('active');
  return course.units[activeIndex === -1 ? course.units.length - 1 : activeIndex];
}

export function readProgress(): Set<string> {
  return read();
}
