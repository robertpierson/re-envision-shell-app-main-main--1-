import React, { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Sparkles, Star } from 'lucide-react';
import { CourseUnit } from '../data/curriculum';
import { Level, isLevelComplete } from '../lib/progress';
import { lessonQuestions } from '../data/quizzes';
import { awardXp, XP_PER_CORRECT, XP_PER_LESSON } from '../lib/stats';
import QuestionCard from '../ui/QuestionCard';
import ProgressBar from '../ui/ProgressBar';

interface LessonScreenProps {
  unit: CourseUnit;
  level: Level;
  onComplete: () => void;
  onExit: () => void;
}

// A lesson level has two stages: READ the lesson (the real curriculum page,
// scrolled to this lesson), then ANSWER a short interactive quiz about it.
// Only clearing the questions finishes the level and unlocks the next stop.
const LessonScreen: React.FC<LessonScreenProps> = ({ unit, level, onComplete, onExit }) => {
  const questions = useMemo(() => lessonQuestions(unit.lessonId, level.index), [unit, level]);
  const [phase, setPhase] = useState<'read' | 'quiz' | 'done'>('read');
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const alreadyDone = isLevelComplete(level.id);

  const question = questions[qIndex];
  const totalSteps = 1 + questions.length;
  const step = phase === 'read' ? 0 : phase === 'done' ? totalSteps : 1 + qIndex;

  const pick = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === question.correct) {
      setCorrectCount((c) => c + 1);
      if (!alreadyDone) awardXp(XP_PER_CORRECT, 'Correct answer');
    }
  };

  const next = () => {
    if (qIndex < questions.length - 1) {
      setQIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      if (!alreadyDone) awardXp(XP_PER_LESSON, `Finished “${level.title}”`);
      setPhase('done');
    }
  };

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
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">
              Lesson {level.index} · {phase === 'read' ? 'Read' : phase === 'quiz' ? `Question ${qIndex + 1} of ${questions.length}` : 'Complete'}
            </p>
            <h1 className="truncate text-lg font-extrabold text-text-primary dark:text-white lg:text-xl">
              {level.title}
            </h1>
          </div>
        </div>
        <ProgressBar progress={(step / totalSteps) * 100} className="mt-3" height="sm" />
      </div>

      {phase === 'read' && (
        <>
          <div className="relative mx-auto mt-4 w-full max-w-4xl flex-1 px-4 lg:px-8">
            {!loaded && (
              <p className="absolute inset-x-0 top-8 text-center text-sm text-text-light">Loading…</p>
            )}
            <iframe
              src={`${unit.href}${level.hash}`}
              title={level.title}
              onLoad={() => setLoaded(true)}
              className="h-[calc(100vh-16.5rem)] w-full rounded-3xl border border-neutral-dark/15 dark:border-white/10"
            />
            <a
              href={`${unit.href}${level.hash}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              Open in a new tab <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="sticky bottom-0 border-t border-neutral-dark/10 bg-white/90 py-4 backdrop-blur dark:border-white/10 dark:bg-[#0b0d12]/90">
            <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 lg:px-8">
              <p className="hidden items-center gap-2 text-sm text-text-secondary dark:text-neutral-300 sm:flex">
                <BookOpen className="h-4 w-4" /> Read it properly — the questions come from this exact text.
              </p>
              <button
                onClick={() => (questions.length ? setPhase('quiz') : (awardXp(XP_PER_LESSON, `Finished “${level.title}”`), setPhase('done')))}
                className="ml-auto rounded-2xl bg-primary px-6 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                I've read it — quiz me
              </button>
            </div>
          </div>
        </>
      )}

      {phase === 'quiz' && question && (
        <div className="mx-auto mt-6 w-full max-w-2xl flex-1 px-4 pb-32 lg:px-8">
          <QuestionCard question={question} selected={selected} answered={answered} onSelect={pick} />
          {answered && (
            <button
              onClick={next}
              className="mt-5 w-full rounded-2xl bg-primary px-6 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              {qIndex < questions.length - 1 ? 'Next question' : 'Finish lesson'}
            </button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#58CC02]/15">
            <Sparkles className="h-12 w-12 text-[#58CC02]" />
          </div>
          <h2 className="mt-5 text-2xl font-extrabold text-text-primary dark:text-white">Lesson cleared!</h2>
          <p className="mt-2 text-sm text-text-secondary dark:text-neutral-300">
            {questions.length > 0
              ? `You got ${correctCount} of ${questions.length} right${alreadyDone ? ' (replay — no extra XP)' : ` and earned ${XP_PER_LESSON + correctCount * XP_PER_CORRECT} XP`}.`
              : alreadyDone ? 'Replayed.' : `+${XP_PER_LESSON} XP earned.`}
          </p>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: Math.max(1, questions.length) }).map((_, i) => (
              <Star key={i} className={`h-7 w-7 ${i < correctCount || questions.length === 0 ? 'fill-secondary text-secondary' : 'text-text-light/40'}`} />
            ))}
          </div>
          <button
            onClick={onComplete}
            className="mt-7 w-full rounded-2xl bg-primary px-6 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Back to the island
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonScreen;
