import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import {
  ArrowLeft, BookOpen, CheckCircle2, ExternalLink, Film, Heart, Lock, Sparkles, Star, Zap,
} from 'lucide-react';
import { CourseUnit } from '../data/curriculum';
import { Level, isLevelComplete } from '../lib/progress';
import { lessonBank, unitSummaries } from '../data/questionBank';
import { shuffleSet } from '../data/quizzes';
import { videoFor } from '../data/videos';
import { awardXp, getSnapshot, onStatsChange, XP_PER_CORRECT, XP_PER_LESSON } from '../lib/stats';
import QuestionCard from '../ui/QuestionCard';
import ProgressBar from '../ui/ProgressBar';

interface LessonScreenProps {
  unit: CourseUnit;
  level: Level;
  onComplete: () => void;
  onExit: () => void;
}

type Mode = 'summary' | 'full';
/** How far down the material counts as "read enough to be quizzed". */
const READ_THRESHOLD = 0.85;

const LessonScreen: React.FC<LessonScreenProps> = ({ unit, level, onComplete, onExit }) => {
  const levelKey = `${unit.lessonId}#lesson-${level.index}`;
  const questions = useMemo(() => shuffleSet(lessonBank[levelKey] ?? []), [levelKey]);
  const summary = unitSummaries[unit.lessonId]?.[level.index - 1];
  const video = videoFor(levelKey);
  const stats = useSyncExternalStore(onStatsChange, getSnapshot, getSnapshot);

  const [phase, setPhase] = useState<'learn' | 'quiz' | 'done'>('learn');
  const [mode, setMode] = useState<Mode>('summary');
  const [readProgress, setReadProgress] = useState(0); // 0..1, furthest reached
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const alreadyDone = isLevelComplete(level.id);

  const noteScroll = useCallback((top: number, client: number, total: number) => {
    if (total <= client + 4) {
      setReadProgress(1); // nothing to scroll — it all fits on screen
      return;
    }
    const frac = (top + client) / total;
    setReadProgress((prev) => (frac > prev ? Math.min(1, frac) : prev));
  }, []);

  // The full lesson lives in a same-origin iframe, so its scrolling is readable.
  useEffect(() => {
    if (mode !== 'full' || !loaded) return;
    const win = iframeRef.current?.contentWindow;
    const doc = win?.document;
    if (!win || !doc) return;
    const onScroll = () =>
      noteScroll(doc.documentElement.scrollTop || doc.body.scrollTop, win.innerHeight, doc.documentElement.scrollHeight);
    onScroll();
    win.addEventListener('scroll', onScroll, { passive: true });
    return () => win.removeEventListener('scroll', onScroll);
  }, [mode, loaded, noteScroll]);

  const unlocked = readProgress >= READ_THRESHOLD;
  const question = questions[qIndex];
  const totalSteps = 1 + questions.length;
  const step = phase === 'learn' ? 0 : phase === 'done' ? totalSteps : 1 + qIndex;

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

  const startQuiz = () => {
    if (!questions.length) {
      if (!alreadyDone) awardXp(XP_PER_LESSON, `Finished “${level.title}”`);
      setPhase('done');
      return;
    }
    setPhase('quiz');
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral dark:bg-[#0b0d12]">
      {/* Header: back, title, and the live hearts + XP readout */}
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
              Lesson {level.index} ·{' '}
              {phase === 'learn' ? 'Learn' : phase === 'quiz' ? `Question ${qIndex + 1} of ${questions.length}` : 'Complete'}
            </p>
            <h1 className="truncate text-base font-extrabold text-text-primary dark:text-white lg:text-xl">
              {level.title}
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1.5 text-sm font-bold text-orange-600 dark:bg-orange-500/15"
              title={`${stats.hearts} of ${stats.maxHearts} hearts left today`}
            >
              <Heart className="h-4 w-4 fill-orange-500" />
              {stats.hearts}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1.5 text-sm font-bold text-primary">
              <Zap className="h-4 w-4" />
              {stats.xp.toLocaleString()}
            </span>
          </div>
        </div>
        <ProgressBar progress={(step / totalSteps) * 100} className="mt-3" height="sm" />
      </div>

      {phase === 'learn' && (
        <>
          <div className="mx-auto mt-4 w-full max-w-4xl px-4 lg:px-8">
            {/* Summary or the whole thing — their choice */}
            <div className="flex gap-2" role="tablist" aria-label="How to learn this lesson">
              {(['summary', 'full'] as Mode[]).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => {
                    setMode(m);
                    setReadProgress(0); // re-read whichever version you switched to
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    mode === m
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-text-secondary shadow-panel dark:bg-white/10 dark:text-neutral-300'
                  }`}
                >
                  {m === 'summary' ? '⚡ Quick summary' : '📖 Full lesson'}
                </button>
              ))}
            </div>

            {/* Short-form video slot */}
            <div className="mt-3">
              {video ? (
                video.embed ? (
                  <iframe
                    src={video.src}
                    title={`${level.title} — short video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    className="aspect-video w-full rounded-3xl border border-neutral-dark/15 dark:border-white/10"
                  />
                ) : (
                  <video
                    src={video.src}
                    controls
                    playsInline
                    className="aspect-video w-full rounded-3xl bg-black"
                  />
                )
              ) : (
                <div className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-panel dark:bg-white/5">
                  <Film className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-text-secondary dark:text-neutral-300">
                    A 60–90 second video for this lesson is on the way. Until then, the summary below
                    covers the same ground.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* The material itself */}
          {mode === 'summary' ? (
            <div
              onScroll={(e) => {
                const el = e.currentTarget;
                noteScroll(el.scrollTop, el.clientHeight, el.scrollHeight);
              }}
              className="mx-auto mt-3 w-full max-w-4xl flex-1 overflow-y-auto px-4 lg:px-8"
              style={{ maxHeight: 'calc(100vh - 26rem)' }}
            >
              <div className="rounded-3xl bg-white p-5 shadow-panel dark:bg-white/5 lg:p-6">
                <h2 className="text-lg font-extrabold text-text-primary dark:text-white">
                  {summary?.title ?? level.title}
                </h2>
                {summary?.gist && (
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-neutral-300">
                    {summary.gist}
                  </p>
                )}
                <p className="mt-5 text-[11px] font-extrabold uppercase tracking-widest text-primary">
                  What you need to remember
                </p>
                <ul className="mt-2 space-y-2.5">
                  {(summary?.points ?? []).map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#58CC02]" />
                      <span className="text-sm font-semibold leading-relaxed text-text-primary dark:text-neutral-100">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-text-light">
                  Want the depth, the code and the worked examples? Switch to <strong>Full lesson</strong> above.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative mx-auto mt-3 w-full max-w-4xl flex-1 px-4 lg:px-8">
              {!loaded && <p className="absolute inset-x-0 top-8 text-center text-sm text-text-light">Loading…</p>}
              <iframe
                ref={iframeRef}
                src={`${unit.href}${level.hash}`}
                title={level.title}
                onLoad={() => setLoaded(true)}
                className="w-full rounded-3xl border border-neutral-dark/15 dark:border-white/10"
                style={{ height: 'calc(100vh - 26rem)' }}
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
          )}

          {/* Quiz gate: locked until they've actually reached the bottom */}
          <div className="sticky bottom-0 border-t border-neutral-dark/10 bg-white/90 py-4 backdrop-blur dark:border-white/10 dark:bg-[#0b0d12]/90">
            <div className="mx-auto w-full max-w-4xl px-4 lg:px-8">
              {!unlocked && (
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs font-bold text-text-secondary dark:text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" /> Scroll to the end to unlock the quiz
                    </span>
                    <span>{Math.round(readProgress * 100)}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-dark/10 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${Math.min(100, (readProgress / READ_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              <button
                onClick={startQuiz}
                disabled={!unlocked}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-extrabold transition-transform ${
                  unlocked
                    ? 'bg-primary text-white shadow-lg hover:scale-[1.02] active:scale-95'
                    : 'cursor-not-allowed bg-neutral-dark/10 text-text-light dark:bg-white/10'
                }`}
              >
                {unlocked ? (
                  <>Quiz me — {questions.length} question{questions.length === 1 ? '' : 's'}</>
                ) : (
                  <>
                    <Lock className="h-4 w-4" /> Keep reading to unlock the quiz
                  </>
                )}
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
              ? `You got ${correctCount} of ${questions.length} right${
                  alreadyDone ? ' (replay — no extra XP)' : ` and earned ${XP_PER_LESSON + correctCount * XP_PER_CORRECT} XP`
                }.`
              : alreadyDone
                ? 'Replayed.'
                : `+${XP_PER_LESSON} XP earned.`}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            {Array.from({ length: Math.max(1, questions.length) }).map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < correctCount || questions.length === 0 ? 'fill-secondary text-secondary' : 'text-text-light/40'
                }`}
              />
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
