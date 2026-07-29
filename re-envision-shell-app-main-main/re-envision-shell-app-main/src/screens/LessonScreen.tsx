import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ExternalLink, Star, Trophy } from 'lucide-react';
import { CourseUnit } from '../data/curriculum';
import { Level, isLevelComplete } from '../lib/progress';

interface LessonScreenProps {
  unit: CourseUnit;
  level: Level;
  onComplete: () => void;
  onExit: () => void;
}

// Plays one level of a unit: the unit page opens scrolled to that lesson (or
// the quiz) via its anchor. The big button at the bottom is what advances the
// world map — finishing here is what unlocks the next stop on the island.
const LessonScreen: React.FC<LessonScreenProps> = ({ unit, level, onComplete, onExit }) => {
  const [loaded, setLoaded] = useState(false);
  const alreadyDone = isLevelComplete(level.id);
  const isQuiz = level.kind === 'quiz';

  return (
    <div className="flex min-h-screen flex-col bg-neutral dark:bg-[#0b0d12]">
      <div className="mx-auto w-full max-w-4xl px-4 pt-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            aria-label="Back to the unit map"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-panel transition-transform hover:scale-105 active:scale-95 dark:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5 text-text-primary dark:text-white" />
          </button>
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">
              {isQuiz ? 'Boss level · unit quiz' : `Level ${level.index} of ${unit.lessons.length + 1}`}
            </p>
            <h1 className="truncate text-lg font-extrabold text-text-primary dark:text-white lg:text-xl">
              {level.title}
            </h1>
          </div>
          {alreadyDone && (
            <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1.5 text-xs font-extrabold text-secondary">
              <Star className="h-4 w-4 fill-secondary" /> Done
            </span>
          )}
        </div>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-4xl flex-1 px-4 lg:px-8">
        {!loaded && (
          <p className="absolute inset-x-0 top-8 text-center text-sm text-text-light">Loading…</p>
        )}
        <iframe
          src={`${unit.href}${level.hash}`}
          title={level.title}
          onLoad={() => setLoaded(true)}
          className="h-[calc(100vh-15.5rem)] w-full rounded-3xl border border-neutral-dark/15 dark:border-white/10"
        />
        <a
          href={`${unit.href}${level.hash}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          Open in a new tab <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="sticky bottom-0 border-t border-neutral-dark/10 bg-white/90 py-4 backdrop-blur dark:border-white/10 dark:bg-[#0b0d12]/90">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 lg:px-8">
          <p className="hidden text-sm text-text-secondary dark:text-neutral-300 sm:block">
            {isQuiz
              ? 'Check your answers with the toggles, then claim the castle.'
              : 'Read the lesson, run the code in your head, then continue.'}
          </p>
          <button
            onClick={onComplete}
            className={`ml-auto flex items-center gap-2 rounded-2xl px-6 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
              isQuiz ? 'bg-secondary' : 'bg-primary'
            }`}
          >
            {isQuiz ? <Trophy className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            {alreadyDone ? 'Back to the island' : isQuiz ? 'I beat the quiz!' : 'I finished this lesson'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonScreen;
